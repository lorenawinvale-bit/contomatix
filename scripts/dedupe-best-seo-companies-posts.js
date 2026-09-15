#!/usr/bin/env node
// Fixes the "scaled content" duplication finding: all 27 "best-seo-companies-
// in-[city]" posts shared ~30-40% byte-identical boilerplate (a generic
// "questions to ask / hire local / first 90 days" section, plus 4 generic
// FAQ answers). The unique per-city company list and city-specific advice
// sections are untouched — this only removes the fully-generic chunks and
// replaces them with a short, per-post-varied pointer to a new standalone
// guide (how-to-vet-a-local-seo-company-2026) that now holds that content
// once instead of 27 times.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');
const pillar = require('./scratch-pillar-post.js');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const targets = posts.filter(p => /^best-seo-companies-in-/.test(p.slug));

// Several differently-worded short pointers, assigned deterministically by
// post index so no two posts (and few pairs at all) share identical wording.
const VARIANTS = [
  city => `<p>Before you sign with anyone on this list, it's worth reading our full breakdown of <a href="/blog/${pillar.slug}">what to ask, whether local matters, and what a legitimate agency's first 90 days should look like</a> — the questions apply the same way in ${city} as anywhere else.</p>`,
  city => `<p>Picking a name off this list is step one. For the actual vetting — contract terms, red flags, and what month one should look like — see our separate guide to <a href="/blog/${pillar.slug}">hiring a local SEO company</a>.</p>`,
  city => `<p>We cover the general hiring questions, the local-vs-national debate, and what a proper first 90 days looks like in a dedicated guide rather than repeating it here — see <a href="/blog/${pillar.slug}">how to vet a local SEO company</a> before you commit to anyone in ${city}.</p>`,
  city => `<p>Once you've narrowed this down, the next step is vetting whoever you're considering. Our <a href="/blog/${pillar.slug}">guide to vetting a local SEO company</a> covers the specific questions to ask and what a legitimate first quarter of work looks like.</p>`,
  city => `<p>The questions worth asking before signing anything, and what a real first 90 days looks like, don't change city to city — we've put the full version in one place: <a href="/blog/${pillar.slug}">how to vet a local SEO company</a>.</p>`
];

let fixed = 0;
targets.forEach((p, i) => {
  const cityMatch = p.title.match(/in ([^,—]+?)(?:,|—|$)/);
  const city = cityMatch ? cityMatch[1].trim() : 'this market';
  const variant = VARIANTS[i % VARIANTS.length](city);

  const before = p.content;

  // Remove the 3 fully-generic H2 sections in one contiguous cut, replacing
  // with the varied pointer paragraph.
  p.content = p.content.replace(
    /<h2>Questions to Ask Before You Sign<\/h2>[\s\S]*?(?=<h2>How to Check Any List)/,
    variant + '\n\n'
  );

  // Remove the 4 fully-generic FAQ entries from the post-faq block (the
  // city-specific FAQs in the same block are untouched).
  const genericFaqSummaries = [
    'How do I check if an SEO company is legitimate?',
    'Are &quot;top SEO company&quot; lists trustworthy?',
    'Are "top SEO company" lists trustworthy?',
    'Do I need an SEO agency or can I do it myself?',
    'How was this list ordered?'
  ];
  genericFaqSummaries.forEach(summary => {
    const escaped = summary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\s*<details>\\s*<summary>${escaped}</summary>[\\s\\S]*?</details>`, 'g');
    p.content = p.content.replace(re, '');
  });

  if (p.content !== before) fixed++;
});

console.log(`posts modified: ${fixed}/${targets.length}`);

// Add the new pillar post if it doesn't already exist.
if (!posts.some(p => p.slug === pillar.slug)) {
  posts.unshift(pillar);
  console.log('pillar post added');
} else {
  console.log('pillar post already exists, skipped');
}

if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
