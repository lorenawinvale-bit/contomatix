// Compares per-day clicks and impressions of updated pages vs untouched pages between two Search Console page exports.
// usage: node scripts/compare-updated-vs-untouched.js <beforeDir> <beforeDays> <afterDir> <afterDays>
const fs = require('fs'); const path = require('path');
const [bd, bn, ad, an] = process.argv.slice(2); const root = path.join(__dirname, '..');
const rd = d => Object.fromEntries(fs.readFileSync(path.join(d, 'Pages.csv'), 'utf8').split(/\r?\n/).slice(1).filter(Boolean).map(l => { const m = l.match(/^(.*),(\d+),(\d+),([\d.]+)%,([\d.]+)$/); return m ? [m[1].replace('https://contomatix.com', '') || '/', { c: +m[2], i: +m[3], p: +m[5] }] : null; }).filter(Boolean));
const B = rd(bd), A = rd(ad);
// updated slugs: every slug named in a lowvol batch, tool upgrade spec, geo or expand script since 6 Nov + build-update-queue sets
const updated = new Set();
for (const f of fs.readdirSync(__dirname)) { if (!/^(lowvol-batch|tool-upgrade-specs|geo-|expand-|query-coverage-fixes|add-post-images-specs|add-post-heroes)/.test(f)) continue; const t = fs.readFileSync(path.join(__dirname, f), 'utf8'); for (const m of t.matchAll(/(?:slug: |^\s*|')'?([a-z0-9][a-z0-9-]{8,})'?(?:: \{|:| ,|,|'\s*,)/gm)) updated.add(m[1]); for (const m of t.matchAll(/slug: '([a-z0-9-]+)'/g)) updated.add(m[1]); for (const m of t.matchAll(/^  '([a-z0-9-]+)': /gm)) updated.add(m[1]); }
const q = fs.readFileSync(path.join(__dirname, 'build-update-queue.js'), 'utf8'); for (const m of q.matchAll(/'([a-z0-9][a-z0-9-]+)'/g)) updated.add(m[1]);
const posts = new Set(require('../data/blog.json').map(p => p.slug)); const tools = new Set(require('../data/tools.js').map(t => t.slug));
const kind = u => u.startsWith('/blog/') ? 'post' : u.startsWith('/tools/') ? 'tool' : 'other';
const isUpd = u => updated.has(u.split('/').pop());
const urls = new Set([...Object.keys(B), ...Object.keys(A)]);
const agg = {}; const add = (g, b, a) => { agg[g] = agg[g] || { n: 0, bc: 0, bi: 0, ac: 0, ai: 0 }; const x = agg[g]; x.n++; x.bc += b.c; x.bi += b.i; x.ac += a.c; x.ai += a.i; };
for (const u of urls) { const k = kind(u); if (k === 'other') continue; const b = B[u] || { c: 0, i: 0 }, a = A[u] || { c: 0, i: 0 }; add((isUpd(u) ? 'updated ' : 'untouched ') + k + 's', b, a); }
const fmt = (v, d) => (v / d).toFixed(1);
console.log('group | pages | before clicks/day | after clicks/day | before impr/day | after impr/day | impr change');
for (const [g, x] of Object.entries(agg).sort()) console.log(g, '|', x.n, '|', fmt(x.bc, bn), '|', fmt(x.ac, an), '|', fmt(x.bi, bn), '|', fmt(x.ai, an), '|', ((x.ai / an) / (x.bi / bn) * 100 - 100).toFixed(0) + '%');
console.log('updated slug count', updated.size);
// top movers among updated pages (per-day impressions change)
const rows = [...urls].filter(u => kind(u) !== 'other' && isUpd(u)).map(u => { const b = B[u] || { c: 0, i: 0, p: 0 }, a = A[u] || { c: 0, i: 0, p: 0 }; return { u, bi: b.i / bn, ai: a.i / an, d: a.i / an - b.i / bn, bp: b.p, ap: a.p }; }).sort((x, y) => y.d - x.d);
console.log('\nupdated pages that gained most impressions per day:'); rows.slice(0, 8).forEach(r => console.log(' ', r.u.replace('/blog/', '').slice(0, 48), '|', r.bi.toFixed(0), '->', r.ai.toFixed(0), '| pos', r.bp, '->', r.ap));
console.log('top 8 gainers share of the total gain:', (rows.slice(0, 8).reduce((s, r) => s + r.d, 0) / rows.reduce((s, r) => s + Math.max(r.d, 0), 0) * 100).toFixed(0) + '%');
const better = rows.filter(r => r.ap && r.bp && r.ap < r.bp - 3).length, worse = rows.filter(r => r.ap && r.bp && r.ap > r.bp + 3).length; console.log('updated pages with avg position better by 3+:', better, '| worse by 3+:', worse, '| of', rows.length);
