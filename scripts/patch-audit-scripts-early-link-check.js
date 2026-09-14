#!/usr/bin/env node
/**
 * One-off patcher: adds a "no external link in first 10% of content" check
 * to every scripts/audit-blog-post*.js file that doesn't already have one.
 * Finds the existing "All external links use target=_blank rel=..." check
 * call and inserts the new check immediately after its closing `);`.
 *
 * Usage:
 *   node scripts/patch-audit-scripts-early-link-check.js          (dry run)
 *   node scripts/patch-audit-scripts-early-link-check.js --write
 */
const fs = require('fs');
const path = require('path');
const glob = require('fs').readdirSync;

const SCRIPTS_DIR = path.resolve(__dirname);
const WRITE_MODE = process.argv.includes('--write');

const ANCHOR = `'All external links use target="_blank" rel="nofollow noopener"'`;
const NEW_CHECK = `
// ---------------------------------------------------------------------------
// 8b. No external link within the first 10% of content
// ---------------------------------------------------------------------------
const first10PctForExternalCheck = content.slice(0, Math.ceil(content.length * 0.10));
const hasEarlyExternalLink = /href="https?:/.test(first10PctForExternalCheck);
check(
  'No external link in first 10% of content',
  !hasEarlyExternalLink,
  hasEarlyExternalLink
    ? 'an external link appears before the 10% mark — move it later, or strip the tag and add a "Source:" citation line near the end instead'
    : 'OK'
);
`;

const files = glob(SCRIPTS_DIR).filter(f => /^audit-blog-post.*\.js$/.test(f) && !/patch-audit-scripts/.test(f));

let patched = 0, skipped = 0, notFound = 0;
const report = [];

for (const file of files) {
  const fullPath = path.join(SCRIPTS_DIR, file);
  let src = fs.readFileSync(fullPath, 'utf8');

  if (src.includes('No external link in first 10% of content')) {
    report.push(`[${file}] already patched — skipped`);
    skipped++;
    continue;
  }

  const anchorIdx = src.indexOf(ANCHOR);
  if (anchorIdx === -1) {
    report.push(`[${file}] ANCHOR NOT FOUND — needs manual review`);
    notFound++;
    continue;
  }

  // Find the closing `);` of that check(...) call, starting search from the anchor.
  const closeIdx = src.indexOf(');', anchorIdx);
  if (closeIdx === -1) {
    report.push(`[${file}] closing ");" not found after anchor — needs manual review`);
    notFound++;
    continue;
  }
  const insertAt = closeIdx + 2; // right after the `);`

  src = src.slice(0, insertAt) + '\n' + NEW_CHECK + src.slice(insertAt);
  fs.writeFileSync(fullPath + (WRITE_MODE ? '' : '.dryrun'), src);
  if (WRITE_MODE) {
    report.push(`[${file}] patched`);
    patched++;
  } else {
    fs.unlinkSync(fullPath + '.dryrun'); // dry run: don't leave stray files, just count
    report.push(`[${file}] would patch (dry run)`);
    patched++;
  }
}

console.log(report.join('\n'));
console.log(`\n${patched} patched, ${skipped} already patched, ${notFound} need manual review (of ${files.length} files).`);
if (!WRITE_MODE) console.log('\nDry run — no files modified. Re-run with --write to apply.');
