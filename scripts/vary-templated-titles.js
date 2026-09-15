#!/usr/bin/env node
// Retitles the 3 heavily-templated title patterns flagged repeatedly as a
// "scaled content" signal. Only the `title` field changes — slugs (URLs)
// are untouched, so nothing indexed breaks. Templates are rotated
// deterministically (by index within each group) so the same wording never
// repeats more than ~1/6th of the time instead of ~30/32 times.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));

function pick(arr, i) { return arr[i % arr.length]; }

// --- Group 1: "Top N SEO Companies in [City] — Verified ..." ---
const SEO_RX = /^Top (\d+) SEO Companies in (.+?) — Verified(?: for)? (\d{4})$/i;
const SEO_TEMPLATES = [
  (n, city, year) => `Top ${n} SEO Companies in ${city} — Verified ${year}`,
  (n, city, year) => `Top ${n} Verified SEO Companies in ${city} (${year})`,
  (n, city, year) => `The Top ${n} SEO Companies in ${city}, ${year} Edition`,
  (n, city, year) => `${n} SEO Companies in ${city} Worth Hiring in ${year}`,
  (n, city, year) => `Top ${n} SEO Companies in ${city}: Hand-Checked for ${year}`,
  (n, city, year) => `Top ${n} SEO Companies Serving ${city} in ${year}`
];

// --- Group 2: "Top N Recruiting Companies in [City] — Verified ..." ---
const RECRUIT_RX = /^Top (\d+) Recruiting Companies in (.+?)(?: — Verified(?: for)? (\d{4}))?$/i;
const RECRUIT_TEMPLATES = [
  (n, city, year) => `Top ${n} Recruiting Companies in ${city} — Verified ${year}`,
  (n, city, year) => `${n} Recruiting Companies in ${city} Worth Contacting (${year})`,
  (n, city, year) => `Top ${n} Recruiting Agencies in ${city}: ${year} Guide`,
  (n, city, year) => `Top ${n} Verified Recruiting Companies in ${city} (${year})`,
  (n, city, year) => `Top ${n} Recruiting Firms in ${city} for ${year}`
];

// --- Group 3: "Top N Best SEO Companies in [City]: ..." ---
const BEST_RX = /^Top (\d+) Best SEO Companies in (.+?)(?:[:,]| —).*$/i;
const BEST_TEMPLATES = [
  (n, city, year) => `Top ${n} Best SEO Companies in ${city}: ${year} Guide`,
  (n, city, year) => `The ${n} Best SEO Companies in ${city} (${year})`,
  (n, city, year) => `Top ${n} Best SEO Companies in ${city} — Verified ${year}`,
  (n, city, year) => `Best SEO Companies in ${city}: Top ${n}, ${year} Edition`,
  (n, city, year) => `Top ${n} Best-Rated SEO Companies in ${city} (${year})`
];

const DEFAULT_YEAR = '2026';
// A clean city group is just a place name — letters, spaces, commas,
// periods, apostrophes. If it contains digits, parens, or leftover suffix
// words, the regex mis-captured a title that already has a varied (non-
// templated) ending — skip those rather than corrupt them.
function isCleanCity(city) {
  return /^[A-Za-z.,'\- ]+$/.test(city) && !/\b(guide|ranked|breakdown|verified|edition)\b/i.test(city);
}

// Rotate templates for variety, but never publish a title over 60 chars —
// if the rotated pick runs long (usually a longer city name), fall back to
// whichever template comes out shortest for that specific city.
function pickWithLengthCap(templates, idx, args) {
  const rotated = templates[idx % templates.length](...args);
  if (rotated.length <= 60) return rotated;
  return templates.map(t => t(...args)).sort((a, b) => a.length - b.length)[0];
}

let seoCount = 0, recruitCount = 0, bestCount = 0;
let seoIdx = 0, recruitIdx = 0, bestIdx = 0;

posts.forEach(p => {
  let m;
  if ((m = p.title.match(SEO_RX)) && isCleanCity(m[2])) {
    const [, n, city, year] = m;
    const newTitle = pickWithLengthCap(SEO_TEMPLATES, seoIdx++, [n, city, year || DEFAULT_YEAR]);
    if (newTitle !== p.title) { p.title = newTitle; seoCount++; }
    return;
  }
  if ((m = p.title.match(RECRUIT_RX)) && isCleanCity(m[2])) {
    const [, n, city, year] = m;
    const newTitle = pickWithLengthCap(RECRUIT_TEMPLATES, recruitIdx++, [n, city, year || DEFAULT_YEAR]);
    if (newTitle !== p.title) { p.title = newTitle; recruitCount++; }
    return;
  }
  if ((m = p.title.match(BEST_RX)) && isCleanCity(m[2])) {
    const [, n, city] = m;
    const newTitle = pickWithLengthCap(BEST_TEMPLATES, bestIdx++, [n, city, DEFAULT_YEAR]);
    if (newTitle !== p.title) { p.title = newTitle; bestCount++; }
    return;
  }
});

console.log(`SEO group retitled: ${seoCount}`);
console.log(`Recruiting group retitled: ${recruitCount}`);
console.log(`Best-SEO group retitled: ${bestCount}`);

if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
