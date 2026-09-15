#!/usr/bin/env node
// Full-site rollout of the hero diagram feature. Auto-extracts a topic +
// up to 5 section labels per post from its real title/H2 headings (no hand-
// curation — not feasible at 200+ posts), with heuristics tuned from the
// issues found in the earlier 20-post manual batch:
//  - strip known templated title suffixes to get a clean topic
//  - prefer real company names ("1. Acme SEO" -> "Acme SEO") as section
//    labels when a post is a listicle — they're more useful than generic
//    headers and inherently short
//  - drop purely structural/generic headings (FAQ, Related Reading, Quick
//    Comparison, etc.) that add no value as a diagram label
//  - the generator's own truncateToFit is the final safety net for any
//    label heuristics still miss
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');
const limitArg = process.argv.find(a => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : Infinity;
const startArg = process.argv.find(a => a.startsWith('--start='));
const start = startArg ? parseInt(startArg.split('=')[1], 10) : 0;
const { buildTopicDiagramSvg } = require('./generate-topic-diagram.js');

const GENERIC_HEADINGS = [
  /^Frequently Asked Questions$/i, /^Related Reading$/i, /^Quick Comparison$/i,
  /^Quick Look at the Two Firms/i, /^The Bottom Line$/i, /^How This List Was (Built|Verified)$/i,
  /^How These? .*(Were|Was) (Chosen|Verified|Compared)$/i, /^How This Pick (Was Verified|Compares)$/i,
  /^How These \d+ Companies (Compare|Were Chosen)$/i, /^What to Check Before/i,
  /^Out-of-Market Traps/i, /^Candidates We Reviewed/i, /^Our Verified Pick:/i,
  /^What .* Businesses Should Actually Ask For$/i, /^How to (Check|Tell If)/i,
  /^Should You Hire Local/i, /^Questions to Ask Before/i, /^What a Good First \d+ Days/i,
  /^Red Flags That Should End/i
];

const STOP_SUFFIXES = [
  / — Verified(?: for)? \d{4}$/i, / \(\d{4}\)$/, /: \d{4} Guide$/i,
  /: A Verified \d{4} List$/i, /: The Unbiased \d{4} List$/i, /, \d{4} Edition$/i,
  / for \d{4}$/i, / Worth (Hiring|Contacting) in \d{4}$/i, / Worth (Hiring|Contacting) \(\d{4}\)$/i,
  /: The Complete \d{4}(?:\s.*)?$/i, /: The Honest \d{4} Answer$/i, / \d{4} Guide$/i,
  /: A Proven(?: \d{4})? Guide$/i, /, Ranked for \d{4}$/i, /: Full Breakdown$/i,
  /: Questions and Red Flags$/i, /: The Complete Guide$/i, /: The Complete Guide for \d{4}(?:\s.*)?$/i,
  / — A Proven \d{4} Guide$/i, /: A Proven( \d{4})?(?:\s.*)?$/i,
  / — \d{4} Guide$/i, / —$/, /:$/
];

function cleanTopic(title) {
  let t = title;
  let prev;
  do { prev = t; STOP_SUFFIXES.forEach(rx => { t = t.replace(rx, ''); }); } while (t !== prev);
  t = t.replace(/^Top \d+ /i, '').replace(/^The \d+ /i, '').replace(/^\d+ /, '');
  return t.trim();
}

const ENTITY_MAP = { '&amp;': '&', '&#8212;': '—', '&#8211;': '-', '&trade;': '™', '&reg;': '®', '&copy;': '©', '&#39;': "'", '&quot;': '"', '&nbsp;': ' ', '&#8217;': '’', '&#8216;': '‘' };
function decodeEntities(s) {
  return s.replace(/&[a-z#0-9]+;/gi, m => ENTITY_MAP[m] || m);
}
function cleanSection(h2) {
  let s = decodeEntities(h2.replace(/<[^>]+>/g, '')).trim();
  s = s.replace(/^\d+\.\s*/, '');
  s = s.replace(/\s+[—–]\s+.*$/, ''); // drop " — Galveston County"-style trailing qualifiers (em/en dash only, real word-hyphens like "Non-Competing" have no surrounding spaces so are untouched)
  s = s.replace(/\s*\(now [^)]+\)\s*$/i, ''); // drop "(now Openwork)"-style asides
  return s.trim();
}

function extractSections(content) {
  const h2s = [...content.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(m => m[1]);
  const cleaned = h2s
    .map(cleanSection)
    .filter(s => s.length > 0 && s.length < 60)
    .filter(s => !GENERIC_HEADINGS.some(rx => rx.test(s)));
  return cleaned.slice(0, 5);
}

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const targets = posts.filter(p => !p.heroDiagram).slice(start, start + limit);
const STYLES = ['wheel', 'timeline', 'ring'];

let generated = 0, skipped = 0;
const samples = [];

targets.forEach((p, idx) => {
  const globalIdx = start + idx;
  const sections = extractSections(p.content);
  if (sections.length < 3) { skipped++; return; }

  const topic = cleanTopic(p.title);
  if (!topic || topic.length < 3) { skipped++; return; }

  const style = STYLES[globalIdx % STYLES.length];
  const svg = buildTopicDiagramSvg({ style, topic, sections });
  const fileName = `diagram-${p.slug}.svg`;

  if (samples.length < 25) samples.push({ slug: p.slug, style, topic, sections });

  if (write) {
    fs.writeFileSync(path.join(ROOT, 'public', 'images', 'blog', fileName), svg);
    p.heroDiagram = `/images/blog/${fileName}`;
    generated++;
  }
});

console.log(`Targets in this run: ${targets.length}, skipped (too few sections/no topic): ${skipped}\n`);
targets.forEach(p => {
  const sections = extractSections(p.content);
  const topic = cleanTopic(p.title);
  if (sections.length < 3 || !topic || topic.length < 3) console.log('SKIPPED:', p.slug, '| topic:', JSON.stringify(topic), '| sections:', sections.length);
});
console.log('=== Sample of what would be generated (first 25) ===');
samples.forEach(s => console.log(`[${s.style}] ${s.slug}\n  topic: "${s.topic}"\n  sections: ${JSON.stringify(s.sections)}\n`));

if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log(`\nGenerated ${generated}, blog.json written`);
} else {
  console.log(`\nWould generate ${targets.length - skipped} — dry run, pass --write to apply`);
}
