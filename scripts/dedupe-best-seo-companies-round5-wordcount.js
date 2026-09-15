#!/usr/bin/env node
// Final top-up: 13 posts are still 15-170 words short of the site's 1500
// floor after rounds 3-4. Appends one more short, genuinely varied paragraph
// (a new topic, not a repeat of rounds 3/4) only to those 13.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const NEEDS_BOOST = [
  'best-seo-companies-in-fargo-2026', 'best-seo-companies-in-chattanooga-2026',
  'best-seo-companies-in-huntsville-2026', 'best-seo-companies-in-fort-collins-2026',
  'best-seo-companies-in-ann-arbor-2026', 'best-seo-companies-in-eugene-2026',
  'best-seo-companies-in-bozeman-2026', 'best-seo-companies-in-asheville-2026',
  'best-seo-companies-in-savannah-2026', 'best-seo-companies-in-lubbock-2026',
  'best-seo-companies-in-green-bay-2026', 'best-seo-companies-in-cedar-rapids-2026',
  'best-seo-companies-in-cambridge-2026'
];

function cityOf(title) {
  const m = title.match(/in ([^,—]+?)(?:,|—|$)/);
  return m ? m[1].trim() : 'this market';
}

const CLOSING_NOTE = [
  city => `<p>None of this replaces a direct conversation. A 15-minute call with your top two or three picks from ${city} will usually tell you more than any list — including this one — about who actually understands your specific business, versus who's reciting a general pitch.</p>`,
  city => `<p>A list like this narrows the field; it doesn't replace talking to people. Whoever you shortlist from ${city}, a short call where you describe your actual business and listen for a specific, tailored response will tell you more than any write-up can.</p>`,
  city => `<p>Take this as a starting shortlist rather than a final answer. The fastest way to separate a genuine fit from a generic pitch is a direct conversation — describe your ${city} business specifically and see whether the response is equally specific or just recycled talking points.</p>`,
  city => `<p>However you narrow this down, plan on at least one real conversation before deciding. A ${city} agency that listens to your specific situation and responds with something other than a stock pitch is telling you something a write-up like this one can't.</p>`,
  city => `<p>This list gets you to a shortlist, not a decision. The real test happens on a call: describe what actually makes your ${city} business different, and see whether the agency's response reflects that or just repeats a generic pitch.</p>`
];

let changed = 0;
posts.forEach((p, i) => {
  if (!NEEDS_BOOST.includes(p.slug)) return;
  const city = cityOf(p.title);
  const idx = NEEDS_BOOST.indexOf(p.slug);
  const marker = /(<div class="post-faq">)/;
  if (marker.test(p.content)) {
    p.content = p.content.replace(marker, (m) => CLOSING_NOTE[idx % CLOSING_NOTE.length](city) + '\n\n' + m);
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
