// Ranks topics (from competitor URL slugs) by how many competitors publish them, minus topics we already cover. 21 Oct 2026.
const fs = require('fs'); const path = require('path'); const kr = path.join(__dirname, '..', '..', 'keyword-research');
const S = JSON.parse(fs.readFileSync(path.join(kr, 'competitor-sitemaps-2026-10-21.json'), 'utf8'));
const posts = require('../data/blog.json'); const tools = require('../data/tools.js');
function parse(l) { const o = []; let c = '', q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === ',' && !q) { o.push(c); c = ''; } else c += ch; } o.push(c); return o; }
const pool = fs.readFileSync(path.join(kr, 'niche-pool-2026-10-14.csv'), 'utf8').split(/\r?\n/).filter(Boolean).slice(1).map(parse).map(r => r[1]);
const built = fs.readFileSync(path.join(kr, 'niche-built-log.md'), 'utf8');
const stop = new Set('a an the of for to in on and or how what is are with your you our guide best top free 2026 2025 2024 complete vs why when do does can should i we it this that from by at as be get way ways tips tip step steps ultimate'.split(' '));
const stem = w => w.replace(/(ing|es|s|ed)$/, '');
const toks = s => [...new Set(s.toLowerCase().replace(/[^a-z0-9 -]/g, ' ').split(/[\s-]+/).filter(w => w && !stop.has(w) && !/^\d+$/.test(w) && w.length > 2).map(stem))];
const niche = /link|backlink|outreach|guest|seo|serp|keyword|sitemap|schema|robots|canonical|redirect|index|crawl|audit|anchor|nofollow|dofollow|domain authority|pagerank|digital pr|press|brand mention|skyscraper|content|ai search|llm|geo\b|aeo|search console|analytics|rank/i;
const ours = [...posts.map(p => toks(p.slug + ' ' + p.title)), ...tools.map(t => toks(t.slug + ' ' + t.title)), ...pool.map(k => toks(k)), ...built.split('\n').map(l => toks(l.split('|').slice(2, 3).join(' ') + ' ' + (l.split('|')[4] || '')))];
const covered = t => ours.some(o => o.length && t.filter(x => o.includes(x)).length / t.length >= 0.75 && t.length >= 2);
const topics = {};
for (const [d, urls] of Object.entries(S)) for (const u of urls) {
  let seg; try { seg = new URL(u).pathname.split('/').filter(Boolean).pop() || ''; } catch (e) { continue; }
  if (!seg || seg.length < 8 || /^(page|category|tag|author)$/.test(seg)) continue; const t = toks(seg); if (t.length < 2 || t.length > 7 || !niche.test(seg)) continue;
  const key = t.slice().sort().join(' '); (topics[key] = topics[key] || { t, doms: new Set(), ex: seg }).doms.add(d);
}
const rows = Object.values(topics).map(x => ({ k: x.ex.replace(/-/g, ' '), n: x.doms.size, doms: [...x.doms], cov: covered(x.t) }));
const free = rows.filter(r => !r.cov).sort((a, b) => b.n - a.n || a.k.length - b.k.length);
console.log('topics', rows.length, 'not covered', free.length, 'covered', rows.length - free.length);
fs.writeFileSync(path.join(kr, 'competitor-topics-uncovered-2026-10-21.json'), JSON.stringify(free));
free.slice(0, 90).forEach(r => console.log(String(r.n).padStart(2), r.k));
