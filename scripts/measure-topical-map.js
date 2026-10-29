// One-off (29 Oct 2026): sort our own blog posts into topic clusters (by slug/title rules) and join GSC per-page data (3-month export of 28 Oct).
// node scripts/measure-topical-map.js
const fs = require('fs'); const path = require('path');
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'blog.json'), 'utf8'));
const csv = fs.readFileSync(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-28', 'Pages.csv'), 'utf8').trim().split(/\r?\n/).slice(1);
const G = {}; for (const l of csv) { const m = l.match(/^(.*),(\d+),(\d+),([\d.]*)%?,?([\d.]*)$/); if (m) G[m[1].replace('https://contomatix.com', '')] = { c: +m[2], i: +m[3], p: +m[5] }; }
const RULES = [
  ['City and town listicles', p => /-2026$/.test(p.slug) && /(^|-)(top|best)-|seo-compan|seo-agenc|marketing-agenc|search-engine-optimi|local-seo|web-design|digital-marketing-agenc|link-building-agenc/.test(p.slug)],
  ['Industry SEO ("SEO for ...")', p => /^seo-for-|-seo$|^[a-z-]+-seo-?(agency|company)?$/.test(p.slug) && !/(technical|local|enterprise|schema|offpage|off-page|ai|saas|b2b)-seo$/.test(p.slug)],
  ['Link building and backlinks', p => /link|backlink|outreach|anchor|pbn|directory|offpage|off-page|guest-post|citation/.test(p.slug)],
  ['Technical SEO', p => /schema|redirect|core-web|robots|sitemap|migration|search-console|crawl|canonical|hreflang|log-file|indexing|technical|structured-data|noindex|page-speed/.test(p.slug)],
  ['AI search and AI SEO', p => /(^|-)(ai|geo|aeo|llm|generative|chatgpt|gemini|perplexity)(-|$)|answer-engine|ai-overview/.test(p.slug)],
  ['SEO tools and reporting', p => /tool|report|checker|generator|audit|template|software/.test(p.slug)]
];
const out = {}; const unsorted = [];
for (const p of posts) {
  const r = RULES.find(([, f]) => f(p)); const k = r ? r[0] : 'Everything else';
  (out[k] = out[k] || []).push(p.slug);
}
const rows = Object.entries(out).map(([k, slugs]) => {
  let i = 0, c = 0, pw = 0, ind = 0; for (const s of slugs) { const g = G['/blog/' + s]; if (g) { ind++; i += g.i; c += g.c; pw += g.p * g.i; } }
  return { cluster: k, posts: slugs.length, withImpressions: ind, impressions: i, clicks: c, avgPosition: i ? +(pw / i).toFixed(1) : null };
}).sort((a, b) => b.posts - a.posts);
console.log('total posts', posts.length); console.table(rows);
fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-topical-map-2026-10-29.json'), JSON.stringify({ total: posts.length, rows, sample: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.slice(0, 6)])) }, null, 1));
