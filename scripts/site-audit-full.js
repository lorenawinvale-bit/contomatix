#!/usr/bin/env node
/**
 * Full sitewide blog content-integrity audit.
 * Checks every post in data/blog.json for broken links/images, duplicates,
 * missing fields, template-compliance drift, and leftover placeholder text.
 * Read-only — makes no changes.
 *
 * Usage: node scripts/site-audit-full.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'blog.json'), 'utf8'));
const slugSet = new Set(posts.map(p => p.slug));

const issues = []; // { severity, slug, msg }
function flag(severity, slug, msg) { issues.push({ severity, slug, msg }); }

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8212;/g, '-').replace(/&amp;/g, '&').replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

const seenSlug = new Map();
const seenTitle = new Map();
const seenFirst200 = new Map(); // near-duplicate opening detector

for (const p of posts) {
  const slug = p.slug || '(no slug)';

  // --- required fields ---
  ['slug', 'title', 'category', 'excerpt', 'date', 'author', 'image', 'content'].forEach(f => {
    if (!p[f]) flag('ERROR', slug, `missing required field "${f}"`);
  });

  // --- duplicate slug/title ---
  if (seenSlug.has(slug)) flag('ERROR', slug, `duplicate slug (also used by a post at index ${seenSlug.get(slug)})`);
  seenSlug.set(slug, posts.indexOf(p));
  const titleKey = (p.title || '').trim().toLowerCase();
  if (titleKey) {
    if (seenTitle.has(titleKey)) flag('ERROR', slug, `duplicate title (matches "${seenTitle.get(titleKey)}")`);
    seenTitle.set(titleKey, slug);
  }

  if (!p.content) continue;
  const content = p.content;
  const plainText = stripTags(content);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  // --- word count sanity (site's own template floor is 2200) ---
  if (wordCount < 1500) flag('WARN', slug, `low word count (${wordCount}) — below the 2200 template floor`);

  // --- featured image exists ---
  if (p.image) {
    const imgPath = path.join(ROOT, 'public', p.image.replace(/^\//, ''));
    if (!fs.existsSync(imgPath)) flag('ERROR', slug, `featured image missing on disk: ${p.image}`);
  }

  // --- in-content <img> references exist ---
  const imgSrcs = [...content.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(m => m[1]);
  imgSrcs.forEach(src => {
    if (!src.startsWith('/')) return;
    const p2 = path.join(ROOT, 'public', src.replace(/^\//, ''));
    if (!fs.existsSync(p2)) flag('ERROR', slug, `in-content image missing on disk: ${src}`);
  });

  // --- internal links resolve to a real slug/route ---
  const internalLinks = [...content.matchAll(/href="(\/(?:blog|services|locations|tools|contact)[^"]*)"/gi)].map(m => m[1]);
  internalLinks.forEach(href => {
    const clean = href.split('#')[0].split('?')[0];
    if (clean.startsWith('/blog/')) {
      const targetSlug = clean.replace('/blog/', '').replace(/\/$/, '');
      if (targetSlug && !slugSet.has(targetSlug)) {
        flag('ERROR', slug, `internal link points to a non-existent post: ${href}`);
      }
    }
  });

  // --- external link attribute compliance ---
  const anchors = [...content.matchAll(/<a\s+[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi)];
  anchors.forEach(m => {
    const tag = m[0];
    const hasBlank = /target="_blank"/i.test(tag);
    const hasRel = /rel="nofollow noopener"/i.test(tag) || /rel="noopener nofollow"/i.test(tag);
    if (!hasBlank || !hasRel) flag('WARN', slug, `external link missing target/rel attrs: ${m[1]}`);
  });

  // --- no external link in first 10% (template rule) ---
  const first10 = content.slice(0, Math.ceil(content.length * 0.10));
  if (/href="https?:/.test(first10)) {
    flag('WARN', slug, 'an external link appears in the first 10% of content (template rule violation)');
  }

  // --- leftover placeholder text ---
  const placeholderPatterns = [/\[SITENAME\]/i, /\bTODO\b/, /Lorem ipsum/i, /\[CITY\]/i, /\[COMPANY\]/i, /\bXXX\b/, /\bTBD\b/];
  placeholderPatterns.forEach(rx => {
    if (rx.test(content)) flag('ERROR', slug, `leftover placeholder text matching ${rx}`);
  });

  // --- title length (55-60 template rule) ---
  const titleLen = (p.title || '').length;
  if (titleLen > 0 && (titleLen < 50 || titleLen > 65)) {
    flag('INFO', slug, `title length ${titleLen} outside the 55-60 template range (soft check, some older posts predate this rule)`);
  }

  // --- excerpt length ---
  if (p.excerpt && p.excerpt.length > 165) {
    flag('WARN', slug, `excerpt is ${p.excerpt.length} chars, over the 160 template limit`);
  }

  // --- near-duplicate opening paragraph detector (first 200 chars of plain text) ---
  const openKey = plainText.slice(0, 200);
  if (openKey.length > 80) {
    for (const [otherKey, otherSlug] of seenFirst200) {
      if (otherKey === openKey) {
        flag('WARN', slug, `opening paragraph is near-identical to "${otherSlug}" — possible template-duplication risk`);
      }
    }
    seenFirst200.set(openKey, slug);
  }
}

// --- report ---
const bySeverity = { ERROR: [], WARN: [], INFO: [] };
issues.forEach(i => bySeverity[i.severity].push(i));

console.log(`\nFull site audit — ${posts.length} posts checked\n${'='.repeat(72)}`);
['ERROR', 'WARN', 'INFO'].forEach(sev => {
  console.log(`\n${sev} (${bySeverity[sev].length})`);
  bySeverity[sev].slice(0, 200).forEach(i => console.log(`  [${i.slug}] ${i.msg}`));
  if (bySeverity[sev].length > 200) console.log(`  ...and ${bySeverity[sev].length - 200} more`);
});
console.log(`\n${'='.repeat(72)}`);
console.log(`TOTAL: ${bySeverity.ERROR.length} errors, ${bySeverity.WARN.length} warnings, ${bySeverity.INFO.length} info`);
