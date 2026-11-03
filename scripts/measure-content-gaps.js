// Day-17: own content-gap check. GSC export 28 Oct 2026 (top 1,000 queries) vs titles + slugs of our 363 posts + 44 tools.
const fs = require('fs'); const path = require('path');
const posts = require('../data/blog.json'); const tools = require('../data/tools.js');
const parse = f => fs.readFileSync(f, 'utf8').split(/\r?\n/).slice(1).filter(Boolean).map(l => { const m = l.match(/^(.*),(\d+),(\d+),([\d.]+)%,([\d.]+)$/); return m ? { q: m[1].replace(/^"|"$/g, ''), clicks: +m[2], imp: +m[3], pos: +m[5] } : null; }).filter(Boolean);
const Q = parse(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-28', 'Queries.csv'));
const stop = new Set('a an the of for to in on and or how what is are with your you our best top 2026 2025 near me'.split(' ')); const stem = w => w.replace(/ies$/, 'y').replace(/(ing|es|s)$/, '');
const toks = s => new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w && !stop.has(w)).map(stem));
const docs = posts.map(p => toks(p.slug.replace(/-/g, ' ') + ' ' + p.title)).concat(tools.map(t => toks(t.slug.replace(/-/g, ' ') + ' ' + t.title)));
const covered = q => { const t = toks(q); if (!t.size) return true; return docs.some(d => [...t].every(x => d.has(x))); };
const rows = Q.filter(r => r.imp >= 20).map(r => ({ ...r, covered: covered(r.q) }));
const gap = rows.filter(r => !r.covered); const strike = rows.filter(r => r.pos > 10 && r.pos <= 30);
const out = { queries: Q.length, withImp20: rows.length, covered: rows.length - gap.length, gaps: gap.length, gapImp: gap.reduce((a, r) => a + r.imp, 0), totalImp: rows.reduce((a, r) => a + r.imp, 0), strikeDistance: strike.length, strikeCovered: strike.filter(r => r.covered).length, topGaps: gap.sort((a, b) => b.imp - a.imp).slice(0, 25).map(r => `${r.q} (${r.imp} imp, pos ${r.pos})`) };
fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-content-gaps-2026-11-03.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
