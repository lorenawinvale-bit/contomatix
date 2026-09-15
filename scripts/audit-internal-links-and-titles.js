#!/usr/bin/env node
/**
 * Verifies three specific findings:
 * 1. Internal link count INTO each blog post (how many other posts link to it)
 * 2. Duplicate title-pattern counts (e.g. "Top N SEO Companies in [City] — Verified")
 * 3. Word counts for the 6 static service pages
 * Read-only.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'blog.json'), 'utf8'));

// --- 1. Incoming internal link count per post ---
const incoming = {};
posts.forEach(p => { incoming[p.slug] = 0; });
posts.forEach(p => {
  const links = [...p.content.matchAll(/href="\/blog\/([a-z0-9-]+)"/gi)].map(m => m[1]);
  links.forEach(slug => {
    if (incoming.hasOwnProperty(slug) && slug !== p.slug) incoming[slug]++;
  });
});
const zeroLinks = Object.entries(incoming).filter(([, c]) => c === 0);
const oneLinks = Object.entries(incoming).filter(([, c]) => c === 1);
console.log(`\n=== INCOMING INTERNAL LINKS (${posts.length} posts) ===`);
console.log(`0 incoming links: ${zeroLinks.length}`);
zeroLinks.forEach(([slug]) => console.log('  ', slug));
console.log(`1 incoming link: ${oneLinks.length}`);

// --- 2. Title pattern duplication ---
const patterns = {
  'Top N SEO Companies in [City] — Verified': /^Top \d+ SEO Companies in .+ — Verified/i,
  'Top N Recruiting Companies in [City]': /^Top \d+ Recruiting Companies in /i,
  'Top N Best SEO Companies in [City]': /^Top \d+ Best SEO Companies in /i,
};
console.log(`\n=== TITLE PATTERN DUPLICATION ===`);
Object.entries(patterns).forEach(([label, rx]) => {
  const matches = posts.filter(p => rx.test(p.title));
  console.log(`"${label}": ${matches.length} posts`);
});

// --- 3. Service page word counts ---
const servicesPath = path.join(ROOT, 'data', 'services.js');
if (fs.existsSync(servicesPath)) {
  delete require.cache[require.resolve(servicesPath)];
  const services = require(servicesPath);
  console.log(`\n=== SERVICE PAGE WORD COUNTS (${services.length} services) ===`);
  services.forEach(s => {
    const text = (s.content || s.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').filter(Boolean).length;
    console.log(`  ${s.slug}: ${words} words`);
  });
}
