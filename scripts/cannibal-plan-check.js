// Compares upcoming primary keywords (Content Plan v2) with existing posts. node scripts/cannibal-plan-check.js
const posts = require('../data/blog.json');
const plan = ['keyword proximity','canonical url relative or absolute','short tail vs long tail keywords','social seo marketing','branding and seo','online seo certification','ai in marketing statistics','how much do seo services cost','what is domain seo','search engine facts statistics','seo with social media','ai generated content seo','keyword by industry','find backlinks of a site','meta description checker','schema implementation seo'];
const stop = new Set('a an the of for to in on and or how what is are with your you our guide best top 2026 2025 complete verified real data tested why'.split(' '));
const stem = w => w.replace(/(ing|es|s)$/, '');
const toks = s => new Set(s.toLowerCase().replace(/[^a-z0-9 -]/g, ' ').split(/[\s-]+/).filter(w => w && !stop.has(w) && !/^\d+$/.test(w)).map(stem));
for (const k of plan) {
  const t = toks(k); const hits = posts.map(p => { const pt = toks(p.slug + ' ' + p.title); const inter = [...t].filter(x => pt.has(x)); return { slug: p.slug, n: inter.length, cov: inter.length / t.size }; }).filter(h => h.cov >= 0.66 && h.n >= 2).sort((a, b) => b.cov - a.cov).slice(0, 4);
  console.log((hits.length ? 'RISK ' : 'ok   ') + k.padEnd(44) + hits.map(h => h.slug + '(' + h.cov.toFixed(2) + ')').join(', '));
}
