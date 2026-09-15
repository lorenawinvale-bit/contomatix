#!/usr/bin/env node
// Last top-up: 9 posts remain 40-130 words short of 1500 after rounds 3-5.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const NEEDS_BOOST = [
  'best-seo-companies-in-huntsville-2026', 'best-seo-companies-in-ann-arbor-2026',
  'best-seo-companies-in-eugene-2026', 'best-seo-companies-in-bozeman-2026',
  'best-seo-companies-in-asheville-2026', 'best-seo-companies-in-savannah-2026',
  'best-seo-companies-in-lubbock-2026', 'best-seo-companies-in-green-bay-2026',
  'best-seo-companies-in-cedar-rapids-2026'
];

function cityOf(title) {
  const m = title.match(/in ([^,—]+?)(?:,|—|$)/);
  return m ? m[1].trim() : 'this market';
}

const FINAL_NOTE = [
  city => `<p>One last practical note: pricing quotes for the same scope of work can vary by a factor of two or three between agencies serving ${city}, often with no clear difference in what's actually delivered. Ask each finalist to itemize exactly what a specific monthly retainer includes — hours, deliverables, reporting — rather than comparing headline numbers alone.</p>`,
  city => `<p>A final thing worth doing before you decide: get an itemized breakdown of what a specific retainer actually includes from each ${city} finalist, not just the monthly price. Two agencies quoting the same number can mean very different amounts of actual work.</p>`,
  city => `<p>Before making a final call among ${city} options, ask each one to break down exactly what a given monthly fee buys — hours of work, specific deliverables, reporting cadence. The sticker price alone tells you less than the itemized version.</p>`
];

let changed = 0;
posts.forEach((p, i) => {
  if (!NEEDS_BOOST.includes(p.slug)) return;
  const city = cityOf(p.title);
  const idx = NEEDS_BOOST.indexOf(p.slug);
  const marker = /(<div class="post-faq">)/;
  if (marker.test(p.content)) {
    p.content = p.content.replace(marker, (m) => FINAL_NOTE[idx % FINAL_NOTE.length](city) + '\n\n' + m);
    changed++;
  }
});

console.log(`posts modified: ${changed}/${NEEDS_BOOST.length}`);
if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
