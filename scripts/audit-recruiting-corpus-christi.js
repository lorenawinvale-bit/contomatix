/**
 * Audit script for the draft blog post:
 *   "Top 7 Verified Recruiting Companies in Corpus Christi, TX"
 *
 * Usage:
 *   node scripts/audit-recruiting-corpus-christi.js            -> dry run (default, safe)
 *   node scripts/audit-recruiting-corpus-christi.js --write    -> appends the draft to data/blog.json
 *
 * This mirrors the audit pattern used for prior posts in the
 * "Top Recruiting Companies in <city>" series.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BLOG_JSON_PATH = path.join(ROOT, 'data', 'blog.json');
const DRAFT_PATH = path.join(ROOT, 'scripts', 'drafts', 'top-recruiting-companies-corpus-christi-tx-2026.json');

const WRITE_MODE = process.argv.includes('--write');

const POWER_WORDS = [
  'top', 'best', 'verified', 'proven', 'ultimate', 'essential', 'trusted',
  'expert', 'complete', 'definitive', 'guide', 'checklist'
];

// Company domains that must appear as external, nofollow-noopener, target=_blank links.
const REQUIRED_COMPANY_DOMAINS = [
  'lkjordan.com',
  'alltempspersonnel.com',
  'laborfinders.com',
  'uniqueemployment.com',
  'remedystaffing.com',
  'atwork.com',
  'snelling.com'
];

const results = [];
function check(label, pass, detail) {
  results.push({ label, pass, detail });
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8212;|&mdash;/g, '-')
    .replace(/&#\d+;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

if (!fs.existsSync(BLOG_JSON_PATH)) {
  console.error('FATAL: could not find data/blog.json at', BLOG_JSON_PATH);
  process.exit(1);
}
if (!fs.existsSync(DRAFT_PATH)) {
  console.error('FATAL: could not find draft at', DRAFT_PATH);
  process.exit(1);
}

const blogData = JSON.parse(fs.readFileSync(BLOG_JSON_PATH, 'utf8'));
const draft = JSON.parse(fs.readFileSync(DRAFT_PATH, 'utf8'));

const { slug, title, excerpt, content, image } = draft;

// ---------------------------------------------------------------------------
// 1. Title: 55-60 chars, contains a power word
// ---------------------------------------------------------------------------
{
  const len = title.length;
  const lower = title.toLowerCase();
  const hasPowerWord = POWER_WORDS.some(w => new RegExp(`\\b${w}\\b`, 'i').test(lower));
  check(
    'Title length 55-60 chars',
    len >= 55 && len <= 60,
    `length=${len} :: "${title}"`
  );
  check(
    'Title contains a power word',
    hasPowerWord,
    hasPowerWord ? 'ok' : 'no recognized power word found'
  );
}

// ---------------------------------------------------------------------------
// 2. Excerpt <= 160 chars
// ---------------------------------------------------------------------------
{
  const len = excerpt.length;
  check('Excerpt <= 160 chars', len <= 160, `length=${len}`);
}

// ---------------------------------------------------------------------------
// 3. Focus keyword bolded in first 10% of content
// ---------------------------------------------------------------------------
{
  const tenPercentIdx = Math.floor(content.length * 0.10);
  const firstChunk = content.slice(0, Math.max(tenPercentIdx, 800)); // guarantee a reasonable window
  const strongMatches = [...firstChunk.matchAll(/<strong>([\s\S]*?)<\/strong>/gi)].map(m => m[1]);
  const focusRegex = /recruiting\s+companies?(\s+in)?\s+corpus\s+christi/i;
  const found = strongMatches.some(t => focusRegex.test(t));
  check(
    'Focus keyword ("recruiting companies ... Corpus Christi") bolded in first 10%',
    found,
    found ? `matched: "${strongMatches.find(t => focusRegex.test(t))}"` : `bolded phrases checked: ${JSON.stringify(strongMatches)}`
  );
}

// ---------------------------------------------------------------------------
// 4. H2 count >= 8
// ---------------------------------------------------------------------------
{
  const h2Count = (content.match(/<h2>/gi) || []).length;
  check('H2 count >= 8', h2Count >= 8, `count=${h2Count}`);
}

// ---------------------------------------------------------------------------
// 5. FAQ count between 8 and 12
// ---------------------------------------------------------------------------
{
  const faqCount = (content.match(/<summary>/gi) || []).length;
  check('FAQ count 8-12', faqCount >= 8 && faqCount <= 12, `count=${faqCount}`);
}

// ---------------------------------------------------------------------------
// 6. Word count >= 2200
// ---------------------------------------------------------------------------
{
  const text = stripTags(content);
  const wc = wordCount(text);
  check('Word count >= 2200', wc >= 2200, `count=${wc}`);
}

// ---------------------------------------------------------------------------
// 7. Internal links: 2-3 links to other /blog/ posts
// ---------------------------------------------------------------------------
{
  const internalLinks = [...content.matchAll(/href="\/blog\/([a-z0-9-]+)"/gi)].map(m => m[1]);
  const uniqueInternal = [...new Set(internalLinks)];
  check(
    'Internal links: 2-3 to other blog posts',
    uniqueInternal.length >= 2 && uniqueInternal.length <= 3,
    `count=${uniqueInternal.length} :: ${JSON.stringify(uniqueInternal)}`
  );

  // Bonus: verify those internal links actually exist in blog.json
  const existingSlugs = new Set(blogData.map(p => p.slug));
  const broken = uniqueInternal.filter(s => !existingSlugs.has(s));
  check(
    'Internal links point to slugs that exist in blog.json',
    broken.length === 0,
    broken.length === 0 ? 'ok' : `broken: ${JSON.stringify(broken)}`
  );
}

// ---------------------------------------------------------------------------
// 8. External company links: target=_blank rel="nofollow noopener"
// ---------------------------------------------------------------------------
{
  const anchorRegex = /<a\s+([^>]+)>/gi;
  const anchors = [...content.matchAll(anchorRegex)].map(m => m[1]);

  const missingAttrDomains = [];
  const foundDomains = new Set();

  for (const domain of REQUIRED_COMPANY_DOMAINS) {
    const matchingAnchor = anchors.find(a => a.includes(domain));
    if (!matchingAnchor) {
      missingAttrDomains.push(`${domain} (no link found)`);
      continue;
    }
    foundDomains.add(domain);
    const hasBlank = /target="_blank"/.test(matchingAnchor);
    const hasRel = /rel="nofollow noopener"/.test(matchingAnchor);
    if (!hasBlank || !hasRel) {
      missingAttrDomains.push(`${domain} (missing target/rel: ${matchingAnchor})`);
    }
  }

  check(
    `All ${REQUIRED_COMPANY_DOMAINS.length} company links present with target="_blank" rel="nofollow noopener"`,
    missingAttrDomains.length === 0,
    missingAttrDomains.length === 0 ? `ok: ${[...foundDomains].join(', ')}` : JSON.stringify(missingAttrDomains)
  );
}

// ---------------------------------------------------------------------------
// 9. Image exists + valid XML (for .svg)
// ---------------------------------------------------------------------------
{
  const imagePath = path.join(ROOT, 'public', image.replace(/^\//, ''));
  const exists = fs.existsSync(imagePath);
  check('Featured image file exists', exists, imagePath);

  if (exists && imagePath.toLowerCase().endsWith('.svg')) {
    const svg = fs.readFileSync(imagePath, 'utf8');

    // Basic well-formedness checks without an XML lib:
    const opens = (svg.match(/<[a-zA-Z][^>]*[^/]>/g) || []).length;
    const startsOk = svg.trim().startsWith('<svg');
    const endsOk = svg.trim().endsWith('</svg>');
    const hasDoubleHyphenInComment = /<!--[\s\S]*?--[\s\S]*?-->/.test(
      svg.replace(/<!--([\s\S]*?)-->/g, (m, inner) => (inner.includes('--') ? '<!--BAD--' + inner + '-->' : m))
    );
    // More precise double-hyphen-in-comment check: extract comments, check inner content for "--"
    const commentBodies = [...svg.matchAll(/<!--([\s\S]*?)-->/g)].map(m => m[1]);
    const badComment = commentBodies.some(c => c.includes('--'));

    check('SVG starts with <svg> and ends with </svg>', startsOk && endsOk, `startsOk=${startsOk} endsOk=${endsOk}`);
    check('SVG has no double-hyphen inside any <!-- comment -->', !badComment, badComment ? 'FOUND double-hyphen in a comment' : 'ok');

    // Tag balance check (rough, but catches unclosed tags)
    const openTags = [...svg.matchAll(/<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?(?<!\/)>/g)].map(m => m[1]);
    const selfClosing = new Set(['rect','circle','ellipse','line','path','polygon','polyline','stop','use','image']);
    const openStack = [];
    let balanced = true;
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*?(\/?)>/g;
    let m;
    while ((m = tagRegex.exec(svg)) !== null) {
      const [full, tagName, selfClose] = m;
      if (full.startsWith('</')) {
        const last = openStack.pop();
        if (last !== tagName) { balanced = false; }
      } else if (!selfClose && !full.endsWith('/>') && !selfClosing.has(tagName) && !full.startsWith('<!--')) {
        openStack.push(tagName);
      }
    }
    check('SVG tags appear balanced', balanced && openStack.length === 0, `balanced=${balanced}, unclosedStack=${JSON.stringify(openStack)}`);
  } else if (exists) {
    check('Image format check', true, 'non-SVG image, skipping XML validation');
  }
}

// ---------------------------------------------------------------------------
// 10. Slug / title uniqueness against existing blog.json
// ---------------------------------------------------------------------------
{
  const slugClash = blogData.some(p => p.slug === slug);
  const titleClash = blogData.some(p => p.title.trim().toLowerCase() === title.trim().toLowerCase());
  check('Slug is unique in blog.json', !slugClash, slugClash ? 'DUPLICATE SLUG' : `ok: "${slug}"`);
  check('Title is unique in blog.json', !titleClash, titleClash ? 'DUPLICATE TITLE' : 'ok');
}

// ---------------------------------------------------------------------------
// 11. Screenshot files referenced in content actually exist on disk
// ---------------------------------------------------------------------------
{
  const imgSrcs = [...content.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(m => m[1]);
  const missing = imgSrcs.filter(src => !fs.existsSync(path.join(ROOT, 'public', src.replace(/^\//, ''))));
  check('All <img> screenshots referenced in content exist on disk', missing.length === 0, missing.length === 0 ? `ok: ${imgSrcs.length} images` : JSON.stringify(missing));
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log('');
console.log('=== AUDIT: top-recruiting-companies-corpus-christi-tx-2026 ===');
console.log(WRITE_MODE ? 'MODE: WRITE' : 'MODE: DRY RUN (no changes will be made)');
console.log('');

let allPass = true;
for (const r of results) {
  const status = r.pass ? 'PASS' : 'FAIL';
  if (!r.pass) allPass = false;
  console.log(`[${status}] ${r.label}`);
  console.log(`       ${r.detail}`);
}

console.log('');
console.log(allPass ? '===== RESULT: PASSED =====' : '===== RESULT: FAILED =====');
console.log('');

if (!allPass) {
  process.exit(1);
}

if (WRITE_MODE) {
  blogData.push(draft);
  fs.writeFileSync(BLOG_JSON_PATH, JSON.stringify(blogData, null, 2));
  console.log('Draft appended to data/blog.json.');
} else {
  console.log('Dry run only - data/blog.json was NOT modified. Re-run with --write to publish.');
}
