// Compares upcoming primary keywords (Content Plan v2) with existing posts. node scripts/cannibal-plan-check.js
const posts = require('../data/blog.json');
const plan = ['editorial backlinks','high authority backlinks','types of backlinks','what is link building and why it matters','link building strategies','link building mistakes','guest post opportunities','link building for ecommerce','example of keyword research','ppc keyword research tools','yoast seo keyword research','keyword volume research','long tail low competition keywords','ecommerce sitemap','mobile sitemap','ux seo audit','seo audit for saas','top content marketing tools','content marketing strategy checklist','how to read seo report','how to report negative seo','search console impressions explained','google analytics vs search console','cluster ai seo'];
const stop = new Set('a an the of for to in on and or how what is are with your you our guide best top 2026 2025 complete verified real data tested why'.split(' '));
const stem = w => w.replace(/(ing|es|s)$/, '');
const toks = s => new Set(s.toLowerCase().replace(/[^a-z0-9 -]/g, ' ').split(/[\s-]+/).filter(w => w && !stop.has(w) && !/^\d+$/.test(w)).map(stem));
for (const k of plan) {
  const t = toks(k); const hits = posts.map(p => { const pt = toks(p.slug + ' ' + p.title); const inter = [...t].filter(x => pt.has(x)); return { slug: p.slug, n: inter.length, cov: inter.length / t.size }; }).filter(h => h.cov >= 0.66 && h.n >= 2).sort((a, b) => b.cov - a.cov).slice(0, 4);
  console.log((hits.length ? 'RISK ' : 'ok   ') + k.padEnd(44) + hits.map(h => h.slug + '(' + h.cov.toFixed(2) + ')').join(', '));
}
