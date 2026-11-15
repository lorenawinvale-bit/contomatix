// Dry run: for each weakly linked page, finds existing, unlinked mentions of its topic phrase inside other posts' body text. Relevance rule: the exact phrase must already be in the sentence.
// usage: node scripts/internal-link-candidates.js [maxPerTarget] [rowsToPrint]
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..');
const posts = require('../data/blog.json'); const tools = require('../data/tools.js');
const isLocal = p => /^top-/.test(p.slug) || /-(seo|digital-marketing|marketing-agencies|web-design|graphic-design|recruiting)-/.test(p.slug) && /-20\d\d$/.test(p.slug) && !/(^|-)(ai|link|local-seo-for|saas|b2b)(-|$)/.test(p.slug) && /(texas|tx|conroe|cypress|tomball|woodlands|sugar-land|league-city|deer-park|moses-lake|pasadena|manchester|edinburgh|dubai|medellin)/.test(p.slug);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, c => '\\' + c);
const inb = {}; const add = (to, from) => { (inb[to] = inb[to] || new Set()).add(from); };
for (const p of posts) for (const m of p.content.matchAll(/href="(\/(?:blog|tools)\/[a-z0-9-]+)/g)) if (m[1] !== '/blog/' + p.slug) add(m[1], p.slug);
for (const f of fs.readdirSync(path.join(root, 'views', 'pages'))) { const t = fs.readFileSync(path.join(root, 'views', 'pages', f), 'utf8'); for (const m of t.matchAll(/href="(\/(?:blog|tools)\/[a-z0-9-]+)/g)) add(m[1], 'page:' + f); }
const phraseOf = s => s.replace(/-20\d\d$/, '').replace(/-/g, ' ');
const targets = [];
for (const p of posts) { const k = '/blog/' + p.slug; const n = (inb[k] || new Set()).size; if (n <= 2 && !isLocal(p)) targets.push({ url: k, phrase: phraseOf(p.slug), n, title: p.title }); }
for (const t of tools) { const k = '/tools/' + t.slug; const n = (inb[k] || new Set()).size; if (n <= 2) targets.push({ url: k, phrase: t.title.toLowerCase(), n, title: t.title }); }
const max = +process.argv[2] || 3; const out = [];
for (const t of targets) {
  const re = new RegExp('(?<![\\w-])(' + esc(t.phrase) + ')(?![\\w-])', 'i'); const hits = [];
  for (const s of posts) {
    if ('/blog/' + s.slug === t.url) continue; if (isLocal(s)) continue;
    for (const m of s.content.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
      const stripped = m[1].replace(/<a [\s\S]*?<\/a>/g, ' ##### '); const mm = stripped.match(re);
      if (mm) { hits.push({ src: s.slug, text: stripped.replace(/<[^>]+>/g, '').slice(Math.max(0, mm.index - 50), mm.index + mm[0].length + 50) }); break; }
    }
    if (hits.length >= max) break;
  }
  out.push({ ...t, hits });
}
console.log('weak targets', targets.length, '| with at least 1 candidate', out.filter(o => o.hits.length >= 1).length, '| with 3', out.filter(o => o.hits.length >= 3).length);
for (const o of out.filter(o => o.hits.length >= max).slice(0, +process.argv[3] || 12)) { console.log('\n' + o.url + ' (' + o.n + ' inbound) phrase="' + o.phrase + '"'); for (const h of o.hits) console.log('   <- ' + h.src + ': ...' + h.text.replace(/\s+/g, ' ') + '...'); }
module.exports = { out };
