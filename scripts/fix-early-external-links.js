#!/usr/bin/env node
/**
 * One-off remediation script: for each slug in TARGET_SLUGS, finds the first
 * external <a> tag that falls within the first 10% of the post's content,
 * strips it down to plain text at that location (removing the early link
 * without deleting the citation), and re-adds the same link as a small
 * "Source:" line immediately before the FAQ block (or at the end of the
 * content if no FAQ block exists) — so the citation is preserved, the
 * external-link count is unchanged, and it now falls well past the 10% mark.
 *
 * Usage:
 *   node scripts/fix-early-external-links.js            (dry run, prints diffs)
 *   node scripts/fix-early-external-links.js --write     (writes data/blog.json)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_JSON_PATH = path.join(ROOT, 'data', 'blog.json');
const WRITE_MODE = process.argv.includes('--write');

const TARGET_SLUGS = [
  'top-seo-companies-pleasanton-2026',
  'top-recruiting-companies-corpus-christi-tx-2026',
  'top-recruiting-companies-pleasanton-2026',
  'top-graphic-design-companies-reno-2026',
  'top-graphic-design-companies-boulder-2026',
  'top-seo-companies-sugar-land-2026',
  'top-seo-companies-the-woodlands-2026',
  'top-graphic-design-companies-sugar-land-2026',
  'top-graphic-design-companies-moses-lake-2026',
  'top-digital-marketing-agencies-sugar-land-2026',
  'top-marketing-agencies-the-woodlands-2026',
  'top-seo-companies-conroe-2026',
];

const posts = JSON.parse(fs.readFileSync(BLOG_JSON_PATH, 'utf8'));

let fixedCount = 0;
const report = [];

for (const slug of TARGET_SLUGS) {
  const post = posts.find(p => p.slug === slug);
  if (!post) { report.push(`[${slug}] NOT FOUND in blog.json`); continue; }

  let content = post.content;
  const movedLinks = [];
  const anchorRegex = /<a\s+[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;

  // Loop: repeatedly find-and-remove the first early external link until
  // none remain within the (recomputed each pass) first-10% threshold.
  // Capped at 5 passes as a safety limit against any unexpected loop.
  for (let pass = 0; pass < 5; pass++) {
    const threshold = Math.ceil(content.length * 0.10);
    anchorRegex.lastIndex = 0;
    let match;
    let target = null;
    while ((match = anchorRegex.exec(content)) !== null) {
      if (match.index < threshold) { target = match; }
      break; // only need the very first anchor in the doc each pass
    }
    if (!target || target.index >= threshold) break; // no (more) early links

    const fullTag = target[0];
    const href = target[1];
    const innerText = target[2];
    content = content.slice(0, target.index) + innerText + content.slice(target.index + fullTag.length);
    movedLinks.push({ href, innerText });
  }

  if (movedLinks.length === 0) { report.push(`[${slug}] no early external link found (already fixed or false positive) — skipped`); continue; }

  // Build "Source:" citation lines for every link removed, using the same
  // href/text/attrs, and insert them immediately before the FAQ block (or
  // before the closing disclaimer, or at the very end as a last resort).
  const sourceLines = movedLinks
    .map(({ href, innerText }) => `<p style="color: #8A8371; font-size: 0.85rem;">Source: <a href="${href}" target="_blank" rel="nofollow noopener">${innerText}</a></p>`)
    .join('\n') + '\n\n';

  const faqIdx = content.indexOf('<h2>Frequently Asked Questions</h2>');
  const disclaimerIdx = content.indexOf('<p style="color: #8A8371; font-size: 0.85rem; font-style: italic;">Disclaimer:');
  let insertAt;
  if (faqIdx !== -1) insertAt = faqIdx;
  else if (disclaimerIdx !== -1) insertAt = disclaimerIdx;
  else insertAt = content.length;

  content = content.slice(0, insertAt) + sourceLines + content.slice(insertAt);

  // Verify the fix: recompute position of first external link.
  const newFirstIdx = content.search(/href="https?:/);
  const newThreshold = Math.ceil(content.length * 0.10);
  const ok = newFirstIdx >= newThreshold;

  report.push(`[${slug}] moved ${movedLinks.length} link(s) to Source lines at char ~${insertAt} — new first-link position ${newFirstIdx}/${newThreshold} threshold: ${ok ? 'FIXED' : 'STILL FAILING'}`);

  if (ok) {
    post.content = content;
    fixedCount++;
  } else {
    report.push(`  -> NOT APPLIED (safety check failed), left post.content unchanged for ${slug}`);
  }
}

console.log(report.join('\n'));
console.log(`\n${fixedCount}/${TARGET_SLUGS.length} posts fixed.`);

if (WRITE_MODE) {
  fs.writeFileSync(BLOG_JSON_PATH, JSON.stringify(posts, null, 2));
  console.log(`\nWrote changes to ${BLOG_JSON_PATH}`);
} else {
  console.log('\nDry run — blog.json NOT modified. Re-run with --write to apply.');
}
