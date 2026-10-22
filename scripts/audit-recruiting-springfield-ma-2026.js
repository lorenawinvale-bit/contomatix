#!/usr/bin/env node
/**
 * Audit script for the new "Top 3 Recruiting Companies in Springfield, MA — Verified 2026" post.
 *
 * DRY-RUN BY DEFAULT: reads the draft post JSON and data/blog.json, validates the post against
 * this site's SEO/content checklist, and prints a PASS/FAIL report. It never modifies
 * data/blog.json unless invoked with --write (which appends the draft post to blog.json).
 *
 * Usage:
 *   node scripts/audit-recruiting-springfield-ma-2026.js                (dry run, default)
 *   node scripts/audit-recruiting-springfield-ma-2026.js --write        (writes to data/blog.json)
 */

const fs = require('fs');
const path = require('path');

const WRITE = process.argv.includes('--write');

const ROOT = path.resolve(__dirname, '..');
const BLOG_JSON_PATH = path.join(ROOT, 'data', 'blog.json');
const DRAFT_PATH = process.env.DRAFT_POST_PATH ||
  path.join(ROOT, '..', '..', '..', 'scratch-drafts', 'springfield-ma-draft-post.json');

// Resolve draft path: allow override via env var (used here since draft lives in the
// session scratchpad), otherwise fall back to a local draft file next to this script.
function resolveDraftPath() {
  const candidates = [
    process.env.DRAFT_POST_PATH,
    path.join(__dirname, 'drafts', 'top-recruiting-companies-springfield-ma-2026.json'),
  ].filter(Boolean);
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error(
    'Could not find draft post JSON. Set DRAFT_POST_PATH env var to its location.'
  );
}

const draftPath = resolveDraftPath();
const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
const blogData = JSON.parse(fs.readFileSync(BLOG_JSON_PATH, 'utf8'));
const posts = Array.isArray(blogData) ? blogData : blogData.posts;

const results = [];
function check(name, pass, detail) {
  results.push({ name, pass: !!pass, detail: detail || '' });
}

// ---- Title checks ----
const title = draft.title || '';
check('Title length 55-60 chars', title.length >= 55 && title.length <= 60, `length=${title.length} ("${title}")`);
const powerWords = ['Verified', 'Proven', 'Complete', 'Real', 'Honest', 'Essential', 'Ultimate'];
const hasPowerWord = powerWords.some((w) => title.includes(w));
check('Title contains a power word', hasPowerWord, `checked: ${powerWords.join(', ')}`);

// ---- Excerpt ----
const excerpt = draft.excerpt || '';
check('Excerpt <= 160 chars', excerpt.length <= 160, `length=${excerpt.length}`);

// ---- Focus keyword in first 10% of content, bolded ----
const content = draft.content || '';
const focusKeywordRegexes = [
  /recruiting companies in Springfield/i,
  /recruiting companies Springfield/i,
];
const first10PercentEnd = Math.floor(content.length * 0.10);
const first10Percent = content.slice(0, first10PercentEnd);
const boldedFocusInFirst10 = /<strong>[^<]*recruiting companies in Springfield,?\s*MA[^<]*<\/strong>/i.test(
  first10Percent
);
check(
  'Focus keyword "recruiting companies in Springfield" bolded in first 10% of content',
  boldedFocusInFirst10,
  `first10% length=${first10PercentEnd} chars`
);

// ---- H2 count ----
const h2Matches = content.match(/<h2[ >]/gi) || [];
check('H2 count >= 8', h2Matches.length >= 8, `found ${h2Matches.length} H2s`);

// ---- FAQ count ----
const faqBlockMatch = content.match(/<div class="post-faq">([\s\S]*?)<\/div>/);
const faqBlock = faqBlockMatch ? faqBlockMatch[1] : '';
const faqCount = (faqBlock.match(/<details>/gi) || []).length;
check('FAQ count between 8 and 12', faqCount >= 8 && faqCount <= 12, `found ${faqCount} FAQs`);

// ---- Word count ----
function stripTags(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#\d+;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
const plainText = stripTags(content);
const wordCount = plainText.length ? plainText.split(' ').filter(Boolean).length : 0;
check('Word count >= 2200', wordCount >= 2200, `word count=${wordCount}`);

// ---- Internal links (2-3) ----
// Exclude the standard boilerplate CTA block's /contact link — every post in this series
// (see top-recruiting-companies-beaumont-2026, -mansfield-tx-2026) carries that fixed CTA
// link in addition to its 2-3 editorial internal links, so it isn't counted against this rule.
const contentWithoutCta = content.replace(/<div class="post-cta">[\s\S]*?<\/div>/, '');
const internalLinkMatches = contentWithoutCta.match(/href="\/(?!images)[^"]*"/g) || [];
const uniqueInternalLinks = [...new Set(internalLinkMatches)];
check(
  'Internal links: 2-3 (excluding standard CTA link)',
  uniqueInternalLinks.length >= 2 && uniqueInternalLinks.length <= 3,
  `found ${uniqueInternalLinks.length}: ${uniqueInternalLinks.join(', ')}`
);

// ---- External links have target=_blank rel=nofollow noopener ----
const externalLinkTags = content.match(/<a\s+href="https?:\/\/[^"]*"[^>]*>/gi) || [];
const badExternalLinks = externalLinkTags.filter(
  (tag) => !/target="_blank"/.test(tag) || !/rel="nofollow noopener"/.test(tag)
);
check(
  'All external links have target="_blank" rel="nofollow noopener"',
  externalLinkTags.length > 0 && badExternalLinks.length === 0,
  `checked ${externalLinkTags.length} external links, ${badExternalLinks.length} non-compliant`
);

// ---- No external link in first 10% of content ----
const firstExternalLinkIdx = content.search(/href="https?:\/\//);
check(
  'No external link in first 10% of content',
  firstExternalLinkIdx === -1 || firstExternalLinkIdx >= first10PercentEnd,
  `first external link at char ${firstExternalLinkIdx}, first10%=${first10PercentEnd}`
);

// ---- Image existence ----
const imagePath = draft.image ? path.join(ROOT, 'public', draft.image.replace(/^\//, '')) : null;
check('Cover image file exists', imagePath && fs.existsSync(imagePath), imagePath || 'no image field');

// ---- Inline screenshot images exist ----
const imgSrcMatches = [...content.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
const missingImgs = imgSrcMatches.filter((src) => {
  const p = path.join(ROOT, 'public', src.replace(/^\//, ''));
  return !fs.existsSync(p);
});
check(
  'All inline <img> files exist on disk',
  imgSrcMatches.length > 0 && missingImgs.length === 0,
  `checked ${imgSrcMatches.length} images, missing: ${missingImgs.join(', ') || 'none'}`
);

// ---- SVG well-formed XML check (no double-hyphen inside comments; balanced tags) ----
let svgValid = false;
let svgDetail = '';
if (imagePath && imagePath.endsWith('.svg') && fs.existsSync(imagePath)) {
  const svgContent = fs.readFileSync(imagePath, 'utf8');
  const comments = svgContent.match(/<!--[\s\S]*?-->/g) || [];
  const badComment = comments.some((c) => c.slice(4, -3).includes('--'));
  const opens = (svgContent.match(/<svg[ >]/g) || []).length;
  const closes = (svgContent.match(/<\/svg>/g) || []).length;
  svgValid = !badComment && opens === 1 && closes === 1;
  svgDetail = `comments=${comments.length}, badComment=${badComment}, svgOpen=${opens}, svgClose=${closes}`;
} else {
  svgDetail = 'not an svg or file missing';
}
check('SVG well-formed (no -- in comments, single root)', svgValid, svgDetail);

// ---- Slug uniqueness ----
const slugExists = posts.some((p) => p.slug === draft.slug);
check('Slug is unique (not already in blog.json)', !slugExists, `slug="${draft.slug}"`);

// ---- Title uniqueness ----
const titleExists = posts.some((p) => p.title === draft.title);
check('Title is unique (not already in blog.json)', !titleExists, `title="${draft.title}"`);

// ---- "Best fit for" / "Pricing" as separate <p> tags ----
const bestFitSeparate = /<p><strong>Best fit for:<\/strong>[^<]*<\/p>\s*<p><strong>Pricing:<\/strong>/g.test(
  content
);
const bestFitCount = (content.match(/<strong>Best fit for:<\/strong>/g) || []).length;
check(
  '"Best fit for" and "Pricing" are separate <p> tags for each profile',
  bestFitSeparate && bestFitCount === 3,
  `bestFitCount=${bestFitCount}, separatePattern=${bestFitSeparate}`
);

// ---- Report ----
console.log('\n=== Audit: Top 3 Recruiting Companies in Springfield, MA ===');
console.log(`Mode: ${WRITE ? 'WRITE' : 'DRY RUN (no files modified)'}\n`);

let allPass = true;
for (const r of results) {
  const status = r.pass ? 'PASS' : 'FAIL';
  if (!r.pass) allPass = false;
  console.log(`[${status}] ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
}

console.log('\n' + (allPass ? '✅ ALL CHECKS PASSED' : '❌ SOME CHECKS FAILED'));

if (WRITE) {
  if (!allPass) {
    console.error('\nRefusing to write: not all checks passed.');
    process.exit(1);
  }
  posts.push(draft);
  const out = Array.isArray(blogData) ? posts : { ...blogData, posts };
  fs.writeFileSync(BLOG_JSON_PATH, JSON.stringify(out, null, 2));
  console.log(`\nWrote new post to ${BLOG_JSON_PATH}`);
} else {
  console.log('\nDry run only — data/blog.json was NOT modified. Re-run with --write to publish.');
}

process.exit(allPass ? 0 : 1);
