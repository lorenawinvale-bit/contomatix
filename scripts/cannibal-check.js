// Flags pairs of blog posts whose titles/slugs target the same words. node scripts/cannibal-check.js [filterRegex]
const posts = require('../data/blog.json'); const f = process.argv[2] ? new RegExp(process.argv[2], 'i') : null;
const stop = new Set('a an the of for to in on and or how what is are with your you our guide best top 2026 2025 complete verified real data tested'.split(' '));
const stem = w => w.replace(/(ing|es|s)$/, '');
const toks = p => new Set((p.slug + ' ' + p.title).toLowerCase().replace(/[^a-z0-9 -]/g, ' ').split(/[\s-]+/).filter(w => w && !stop.has(w) && !/^\d+$/.test(w)).map(stem));
const list = posts.filter(p => !f || f.test(p.slug + ' ' + p.title)).map(p => ({ p, t: toks(p) }));
const out = [];
for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
  const a = list[i].t, b = list[j].t; const inter = [...a].filter(x => b.has(x)); const j2 = inter.length / new Set([...a, ...b]).size;
  if (inter.length >= 2 && j2 >= 0.4) out.push([j2, list[i].p.slug, list[j].p.slug, inter.join(',')]);
}
out.sort((x, y) => y[0] - x[0]); console.log(list.length, 'posts checked,', out.length, 'overlapping pairs'); out.slice(0, 60).forEach(o => console.log(o[0].toFixed(2), o[1], '<>', o[2], '[' + o[3] + ']'));
