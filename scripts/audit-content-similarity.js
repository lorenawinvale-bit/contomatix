#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'blog.json'), 'utf8'));
const targets = posts.filter(p => /^best-seo-companies-in-/.test(p.slug));

function sentences(html) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&#\d+;/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 25);
}
// Normalize away the one thing that's SUPPOSED to differ (city/state names) so
// we're only counting genuinely copy-pasted boilerplate, not "the same city
// name appears in both" false positives.
function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
}

const data = targets.map(p => ({ slug: p.slug, sents: sentences(p.content) }));

const results = [];
for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const a = data[i], b = data[j];
    const bSet = new Set(b.sents.map(normalize));
    const shared = a.sents.filter(s => bSet.has(normalize(s)));
    const pct = Math.round((shared.length / Math.min(a.sents.length, b.sents.length)) * 100);
    if (pct >= 12) results.push({ a: a.slug, b: b.slug, pct, shared });
  }
}
results.sort((x, y) => y.pct - x.pct);
console.log(`Pairs >=20%: ${results.filter(r => r.pct >= 20).length}`);
console.log(`Pairs >=12%: ${results.length}\n`);
results.slice(0, 10).forEach(r => {
  console.log(`${r.pct}%  ${r.a} <-> ${r.b}`);
});

console.log('\n=== Top pair shared sentences ===');
if (results[0]) results[0].shared.forEach(s => console.log('- ' + s));

// Find sentences shared across the MOST posts (the actual reusable boilerplate)
const freq = {};
data.forEach(p => {
  new Set(p.sents.map(normalize)).forEach(ns => { freq[ns] = (freq[ns] || 0) + 1; });
});
const common = Object.entries(freq).filter(([, c]) => c >= 5).sort((a, b) => b[1] - a[1]);
console.log(`\n=== Sentences appearing in >=5 of ${data.length} posts (the real boilerplate) ===`);
common.slice(0, 20).forEach(([ns, c]) => console.log(`${c}x  ${ns}`));
