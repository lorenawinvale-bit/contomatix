#!/usr/bin/env node
/**
 * GSC keyword-mining loop for Contomatix.
 *
 * Reads a Google Search Console "Performance" CSV export (Queries.csv + Pages.csv),
 * cross-references against data/blog.json, and prints a prioritized list of
 * content opportunities:
 *
 *   1. STRIKING DISTANCE  – queries ranking pos 11–30 with impressions. A content
 *                           refresh / internal links can push these to page 1.
 *   2. CONTENT GAPS       – queries getting impressions that NO existing post
 *                           targets. Write a new post.
 *   3. ZERO-CLICK PAGES   – existing pages with impressions but 0 clicks
 *                           (title/meta rewrite candidates).
 *
 * Usage:
 *   node scripts/gsc-mine.js                       # uses newest gsc-exports/performance-* folder
 *   node scripts/gsc-mine.js <path-to-export-dir>  # explicit folder
 *   node scripts/gsc-mine.js --md                  # also write a markdown report
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXPORTS_DIR = path.resolve(ROOT, '..', 'gsc-exports');
const BLOG_JSON = path.join(ROOT, 'data', 'blog.json');

// ---------- args ----------
const args = process.argv.slice(2);
const wantMd = args.includes('--md');
const explicitDir = args.find(a => !a.startsWith('--'));

// ---------- locate export ----------
function newestExportDir() {
  const dirs = fs.readdirSync(EXPORTS_DIR)
    .filter(d => d.startsWith('performance-'))
    .map(d => path.join(EXPORTS_DIR, d))
    .filter(p => fs.statSync(p).isDirectory())
    .sort();
  if (!dirs.length) throw new Error(`No performance-* folders in ${EXPORTS_DIR}`);
  return dirs[dirs.length - 1];
}
const exportDir = explicitDir ? path.resolve(explicitDir) : newestExportDir();
const exportLabel = path.basename(exportDir);

// ---------- csv ----------
function parseCsv(file) {
  const raw = fs.readFileSync(file, 'utf-8').replace(/^﻿/, '');
  const lines = raw.split(/\r?\n/).filter(l => l.trim());
  const header = splitCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const cells = splitCsvLine(line);
    const row = {};
    header.forEach((h, i) => { row[h.trim()] = (cells[i] ?? '').trim(); });
    return row;
  });
}
function splitCsvLine(line) {
  const out = []; let cur = ''; let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (c === ',' && !q) { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}
const num = v => parseFloat(String(v).replace(/[%,]/g, '')) || 0;

const queries = parseCsv(path.join(exportDir, 'Queries.csv')).map(r => ({
  query: r['Top queries'],
  clicks: num(r['Clicks']),
  impressions: num(r['Impressions']),
  ctr: num(r['CTR']),
  position: num(r['Position']),
}));
const pages = parseCsv(path.join(exportDir, 'Pages.csv')).map(r => ({
  url: r['Top pages'],
  clicks: num(r['Clicks']),
  impressions: num(r['Impressions']),
  ctr: num(r['CTR']),
  position: num(r['Position']),
}));

// ---------- blog index ----------
const blog = JSON.parse(fs.readFileSync(BLOG_JSON, 'utf-8'));
const STOP = new Set(['the','a','an','of','in','for','to','and','or','vs','is','what','how','near','me','my','your','2026','2025','guide','no','1']);
// Words that appear across most posts on this site and therefore say nothing about WHICH post a query belongs to.
// They still count, but only as a tie-breaker; a match must share at least one DISTINCTIVE token (usually the city/niche).
const GENERIC = new Set(['search','engine','optimization','optimisation','seo','local','digital','marketing','link','building','linkbuilding','expert','experts','consultant','consulting','firm','firms','specialist','specialists','services','service','company','companies','agency','agencies','best','top','professional','rated','ranking','google','online','web','website']);
const tokens = s => String(s).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/).filter(t => t && !STOP.has(t));

const postIndex = blog.map(p => ({
  slug: p.slug,
  title: p.title,
  tokens: new Set([...tokens(p.title), ...tokens(p.slug)]),
}));

// A query is "covered" by the post that shares the most DISTINCTIVE tokens with it (e.g. the city name).
// Generic tokens only break ties. Purely-generic queries ("seo company") fall back to needing >=2 total hits.
function coveringPost(query) {
  const qt = tokens(query);
  if (!qt.length) return null;
  const distinctive = qt.filter(t => !GENERIC.has(t));
  let best = null, bestScore = 0;
  for (const p of postIndex) {
    const dHits = distinctive.filter(t => p.tokens.has(t)).length;
    const gHits = qt.filter(t => GENERIC.has(t) && p.tokens.has(t)).length;
    if (distinctive.length ? dHits === 0 : (dHits + gHits) < 2) continue;
    const score = dHits * 10 + gHits;
    if (score > bestScore) { best = p; bestScore = score; }
  }
  return best;
}

// ---------- buckets ----------
const striking = queries
  .filter(q => q.position >= 11 && q.position <= 30 && q.impressions >= 3)
  .sort((a, b) => b.impressions - a.impressions);

const gaps = queries
  .filter(q => q.impressions >= 3)
  .map(q => ({ ...q, post: coveringPost(q.query) }))
  .filter(q => !q.post)
  .sort((a, b) => b.impressions - a.impressions);

const zeroClickPages = pages
  .filter(p => p.impressions >= 10 && p.clicks === 0)
  .sort((a, b) => b.impressions - a.impressions);

const pageOneNoClicks = queries
  .filter(q => q.position <= 10 && q.clicks === 0 && q.impressions >= 5)
  .sort((a, b) => b.impressions - a.impressions);

// ---------- output ----------
const totals = {
  queries: queries.length,
  clicks: queries.reduce((s, q) => s + q.clicks, 0),
  impressions: queries.reduce((s, q) => s + q.impressions, 0),
};

const lines = [];
const H = s => lines.push('', `## ${s}`, '');
lines.push(`# GSC keyword mining — ${exportLabel}`);
lines.push('');
lines.push(`Queries: ${totals.queries} · Clicks: ${totals.clicks} · Impressions: ${totals.impressions}`);

H(`1. Striking distance (pos 11–30, ≥3 impressions) — ${striking.length}`);
lines.push('| Query | Impr | Clicks | Pos | Covered by |');
lines.push('|---|---:|---:|---:|---|');
striking.slice(0, 40).forEach(q => {
  const p = coveringPost(q.query);
  lines.push(`| ${q.query} | ${q.impressions} | ${q.clicks} | ${q.position.toFixed(1)} | ${p ? p.slug : '— (gap)'} |`);
});

H(`2. Content gaps (impressions, no matching post) — ${gaps.length}`);
lines.push('| Query | Impr | Pos |');
lines.push('|---|---:|---:|');
gaps.slice(0, 40).forEach(q => lines.push(`| ${q.query} | ${q.impressions} | ${q.position.toFixed(1)} |`));

H(`3. Page-1 queries with 0 clicks (title/meta rewrite) — ${pageOneNoClicks.length}`);
lines.push('| Query | Impr | Pos |');
lines.push('|---|---:|---:|');
pageOneNoClicks.slice(0, 20).forEach(q => lines.push(`| ${q.query} | ${q.impressions} | ${q.position.toFixed(1)} |`));

H(`4. Pages with ≥10 impressions and 0 clicks — ${zeroClickPages.length}`);
lines.push('| Page | Impr | Pos |');
lines.push('|---|---:|---:|');
zeroClickPages.slice(0, 25).forEach(p => lines.push(`| ${p.url.replace('https://contomatix.com', '')} | ${p.impressions} | ${p.position.toFixed(1)} |`));

const report = lines.join('\n');
console.log(report);

if (wantMd) {
  const outDir = path.join(EXPORTS_DIR, 'reports');
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `mining-${exportLabel.replace('performance-', '')}.md`);
  fs.writeFileSync(out, report + '\n');
  console.log(`\nReport written: ${out}`);
}
