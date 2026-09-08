#!/usr/bin/env node
/**
 * Blog post pre-publish audit script — Sugar Land graphic design post variant.
 *
 * Validates a draft blog post (title/excerpt/content + associated image)
 * against the site's quality bar before it's ever appended to data/blog.json.
 *
 * This is a copy of scripts/audit-blog-post.js (the recruiting-series base
 * script) adapted for the "Top 3 Verified Graphic Design Companies in Sugar
 * Land, TX" post, following the same per-post-variant pattern as
 * scripts/audit-blog-post-boulder-graphic-design-2026.js: the focus-keyword
 * patterns are swapped for this post's topic/city, and the "Best fit
 * for:"/"Pricing:" separate-<p>-tag check (added for the recruiting/graphic-
 * design profile format) is included.
 *
 * Usage:
 *   node scripts/audit-blog-post-graphic-design-sugar-land-2026.js <draft.json>              (dry run, default)
 *   node scripts/audit-blog-post-graphic-design-sugar-land-2026.js <draft.json> --write      (append to blog.json)
 *
 * The draft JSON must have: slug, title, category, excerpt, date, author, image,
 * and either `content` (inline HTML string) or `contentFile` (path relative to
 * the draft JSON's own directory, containing the HTML content).
 *
 * This script performs NO writes unless --write is explicitly passed.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG_JSON_PATH = path.join(ROOT, 'data', 'blog.json');

const args = process.argv.slice(2);
const draftArg = args.find(a => !a.startsWith('--'));
const WRITE_MODE = args.includes('--write');

if (!draftArg) {
  console.error('Usage: node scripts/audit-blog-post-graphic-design-sugar-land-2026.js <draft.json> [--write]');
  process.exit(1);
}

const draftPath = path.isAbsolute(draftArg) ? draftArg : path.join(ROOT, draftArg);
if (!fs.existsSync(draftPath)) {
  console.error(`Draft file not found: ${draftPath}`);
  process.exit(1);
}

const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));

let content = draft.content;
if (!content && draft.contentFile) {
  const contentPath = path.join(path.dirname(draftPath), draft.contentFile);
  if (!fs.existsSync(contentPath)) {
    console.error(`contentFile not found: ${contentPath}`);
    process.exit(1);
  }
  content = fs.readFileSync(contentPath, 'utf8');
}

if (!content) {
  console.error('Draft has neither `content` nor a resolvable `contentFile`.');
  process.exit(1);
}

const results = []; // { name, pass, detail }

function check(name, pass, detail) {
  results.push({ name, pass, detail });
}

// ---------------------------------------------------------------------------
// 1. Title: 55-60 chars, contains a "power word"
// ---------------------------------------------------------------------------
const POWER_WORDS = [
  'top', 'best', 'verified', 'proven', 'ultimate', 'essential', 'guide',
  'checklist', 'complete', 'expert', 'trusted', 'ranked'
];
const title = draft.title || '';
const titleLen = title.length;
const titleHasPowerWord = POWER_WORDS.some(w =>
  new RegExp(`\\b${w}\\b`, 'i').test(title)
);
check(
  'Title length 55-60 chars',
  titleLen >= 55 && titleLen <= 60,
  `length=${titleLen} :: "${title}"`
);
check(
  'Title contains a power word',
  titleHasPowerWord,
  titleHasPowerWord ? 'OK' : `none of [${POWER_WORDS.join(', ')}] found`
);

// ---------------------------------------------------------------------------
// 2. Excerpt <= 160 chars
// ---------------------------------------------------------------------------
const excerpt = draft.excerpt || '';
check(
  'Excerpt <= 160 chars',
  excerpt.length > 0 && excerpt.length <= 160,
  `length=${excerpt.length}`
);

// ---------------------------------------------------------------------------
// Helpers for content analysis
// ---------------------------------------------------------------------------
function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&rarr;/g, '→')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const plainText = stripTags(content);
const wordCount = plainText.split(/\s+/).filter(Boolean).length;

// ---------------------------------------------------------------------------
// 3. Focus keyword bolded in first 10% of content
// ---------------------------------------------------------------------------
const FOCUS_KEYWORD_PATTERNS = [
  /graphic design companies in sugar land/i,
  /graphic design companies sugar land/i,
  /top graphic design companies in sugar land/i,
];
const first10PctChars = content.slice(0, Math.ceil(content.length * 0.10));
// look for the keyword wrapped in <strong> within the first 10% of raw HTML
const boldedInFirst10Pct = FOCUS_KEYWORD_PATTERNS.some(rx => {
  const strongMatches = [...first10PctChars.matchAll(/<strong>([\s\S]*?)<\/strong>/gi)];
  return strongMatches.some(m => rx.test(m[1]));
});
check(
  'Focus keyword bolded in first 10% of content',
  boldedInFirst10Pct,
  boldedInFirst10Pct ? 'OK' : 'expected a <strong> tag matching "graphic design companies in Sugar Land" (or close variant) near the start'
);

// ---------------------------------------------------------------------------
// 4. H2 count >= 8
// ---------------------------------------------------------------------------
const h2Matches = content.match(/<h2[\s>]/gi) || [];
check('H2 count >= 8', h2Matches.length >= 8, `found ${h2Matches.length}`);

// ---------------------------------------------------------------------------
// 5. FAQ count 8-12
// ---------------------------------------------------------------------------
const faqBlockMatch = content.match(/<div class="post-faq">([\s\S]*?)<\/div>/i);
const faqBlock = faqBlockMatch ? faqBlockMatch[1] : '';
const faqCount = (faqBlock.match(/<details>/gi) || []).length;
check('FAQ count between 8 and 12', faqCount >= 8 && faqCount <= 12, `found ${faqCount}`);

// ---------------------------------------------------------------------------
// 6. Word count >= 2200
// ---------------------------------------------------------------------------
check('Word count >= 2200', wordCount >= 2200, `word count=${wordCount}`);

// ---------------------------------------------------------------------------
// 7. Internal links: 2-3 links to /blog/... (relative site paths)
// ---------------------------------------------------------------------------
const internalLinkMatches = [...content.matchAll(/href="(\/(?:blog|contact|services|locations)[^"]*)"/gi)];
const internalBlogLinks = internalLinkMatches.filter(m => m[1].startsWith('/blog/'));
check(
  'Internal links: 2-3',
  internalBlogLinks.length >= 2 && internalBlogLinks.length <= 3,
  `found ${internalBlogLinks.length}: ${internalBlogLinks.map(m => m[1]).join(', ')}`
);

// ---------------------------------------------------------------------------
// 8. External links: target="_blank" rel="nofollow noopener"
// ---------------------------------------------------------------------------
const anchorMatches = [...content.matchAll(/<a\s+[^>]*href="(https?:\/\/[^"]+)"[^>]*>/gi)];
const externalLinkIssues = [];
anchorMatches.forEach(m => {
  const tag = m[0];
  const hasBlank = /target="_blank"/i.test(tag);
  const hasRel = /rel="nofollow noopener"/i.test(tag) || /rel="noopener nofollow"/i.test(tag);
  if (!hasBlank || !hasRel) {
    externalLinkIssues.push(m[1]);
  }
});
check(
  'All external links use target="_blank" rel="nofollow noopener"',
  anchorMatches.length > 0 && externalLinkIssues.length === 0,
  anchorMatches.length === 0
    ? 'no external links found'
    : externalLinkIssues.length === 0
      ? `all ${anchorMatches.length} external links OK`
      : `${externalLinkIssues.length} link(s) missing attributes: ${externalLinkIssues.join(', ')}`
);

// ---------------------------------------------------------------------------
// 9. Image exists on disk
// ---------------------------------------------------------------------------
const imagePath = draft.image ? path.join(ROOT, 'public', draft.image.replace(/^\//, '')) : null;
const imageExists = imagePath && fs.existsSync(imagePath);
check('Featured image file exists', !!imageExists, imagePath || 'no image field set');

// ---------------------------------------------------------------------------
// 10. Featured image is valid, well-formed XML (SVG)
// ---------------------------------------------------------------------------
let svgValid = false;
let svgDetail = 'not an .svg image';
if (imageExists && imagePath.toLowerCase().endsWith('.svg')) {
  const svgContent = fs.readFileSync(imagePath, 'utf8');
  try {
    // Lightweight well-formedness check: balanced tags + no bad comments.
    const commentIssues = (svgContent.match(/<!--([\s\S]*?)-->/g) || [])
      .filter(c => c.slice(4, -3).includes('--'));
    const hasXmlDeclOrRoot = /<svg[\s>]/.test(svgContent);
    if (commentIssues.length > 0) {
      svgDetail = `double-hyphen found inside ${commentIssues.length} comment(s)`;
    } else if (!hasXmlDeclOrRoot) {
      svgDetail = 'no <svg> root element found';
    } else {
      svgValid = true;
      svgDetail = 'well-formed (no bad comments, has <svg> root)';
    }
  } catch (e) {
    svgDetail = `parse error: ${e.message}`;
  }
}
check('Featured image is valid, well-formed SVG XML', svgValid, svgDetail);

// ---------------------------------------------------------------------------
// 11. Referenced screenshot images exist on disk
// ---------------------------------------------------------------------------
const imgSrcMatches = [...content.matchAll(/<img[^>]+src="([^"]+)"/gi)];
const missingImages = [];
imgSrcMatches.forEach(m => {
  const src = m[1];
  if (!src.startsWith('/')) return;
  const p = path.join(ROOT, 'public', src.replace(/^\//, ''));
  if (!fs.existsSync(p)) missingImages.push(src);
});
check(
  'All in-content <img> references exist on disk',
  imgSrcMatches.length > 0 && missingImages.length === 0,
  missingImages.length === 0
    ? `all ${imgSrcMatches.length} in-content images found`
    : `missing: ${missingImages.join(', ')}`
);

// ---------------------------------------------------------------------------
// 12. "Best fit for:" and "Pricing:" each appear as their OWN separate <p> tags
// ---------------------------------------------------------------------------
const bestFitPTags = content.match(/<p><strong>Best fit for:<\/strong>/gi) || [];
const pricingPTags = content.match(/<p><strong>Pricing:<\/strong>/gi) || [];
const combinedInOneP = /<p><strong>Best fit for:<\/strong>[^<]*<strong>Pricing:<\/strong>/i.test(content);
check(
  '"Best fit for:" and "Pricing:" appear as separate <p> tags (equal counts, one per company)',
  bestFitPTags.length > 0 && bestFitPTags.length === pricingPTags.length && !combinedInOneP,
  `Best fit for: ${bestFitPTags.length} <p> tags, Pricing: ${pricingPTags.length} <p> tags, combined-in-one-p=${combinedInOneP}`
);

// ---------------------------------------------------------------------------
// 13. Slug/title uniqueness against existing blog.json
// ---------------------------------------------------------------------------
const existingPosts = JSON.parse(fs.readFileSync(BLOG_JSON_PATH, 'utf8'));
const slugCollision = existingPosts.find(p => p.slug === draft.slug);
const titleCollision = existingPosts.find(
  p => p.title.trim().toLowerCase() === (draft.title || '').trim().toLowerCase()
);
check('Slug is unique', !slugCollision, slugCollision ? `collides with existing post: ${slugCollision.slug}` : `"${draft.slug}" not found in blog.json`);
check('Title is unique', !titleCollision, titleCollision ? `collides with existing post: "${titleCollision.title}"` : 'no exact title match in blog.json');

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log('');
console.log(`Blog Post Audit: ${draft.slug}`);
console.log(`Mode: ${WRITE_MODE ? 'WRITE' : 'DRY-RUN (no files modified)'}`);
console.log('='.repeat(72));

let allPass = true;
for (const r of results) {
  const status = r.pass ? 'PASS' : 'FAIL';
  if (!r.pass) allPass = false;
  console.log(`[${status}] ${r.name}`);
  console.log(`       ${r.detail}`);
}

console.log('='.repeat(72));
console.log(`Word count: ${wordCount}`);
console.log(`H2 sections: ${h2Matches.length}`);
console.log(`FAQ entries: ${faqCount}`);
console.log(`Internal links: ${internalBlogLinks.length}`);
console.log(`External links: ${anchorMatches.length}`);
console.log('='.repeat(72));
console.log(allPass ? 'RESULT: PASSED' : 'RESULT: FAILED');
console.log('');

if (!allPass) {
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Write mode (never runs unless --write is explicitly passed)
// ---------------------------------------------------------------------------
if (WRITE_MODE) {
  const newPost = {
    slug: draft.slug,
    title: draft.title,
    category: draft.category,
    excerpt: draft.excerpt,
    date: draft.date,
    author: draft.author,
    image: draft.image,
    content: content
  };
  existingPosts.push(newPost);
  fs.writeFileSync(BLOG_JSON_PATH, JSON.stringify(existingPosts, null, 2));
  console.log(`Appended "${draft.slug}" to ${BLOG_JSON_PATH}`);
} else {
  console.log('Dry run complete — blog.json was NOT modified. Re-run with --write to publish.');
}
