// Checks that the Search Console queries and the keywords added by scripts/lowvol-batch-*.js appear word for word on each page. usage: node scripts/query-coverage-check.js (tool pages are read from %TEMP%/p_<slug>.html, fetched from the local server)
const fs = require('fs'); const path = require('path'); const posts = require('../data/blog.json');
const norm = s => s.toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ');
const want = {}; const add = (k, qs) => { (want[k] = want[k] || new Set()); qs.forEach(q => q.trim() && want[k].add(q.trim())); };
for (const f of fs.readdirSync(__dirname).filter(f => /^lowvol-batch-[5-8]\.js$/.test(f))) { const t = fs.readFileSync(path.join(__dirname, f), 'utf8'); for (const m of t.matchAll(/slug: '([^']+)'[\s\S]*?keywords: \[([^\]]*)\]/g)) add('post ' + m[1], [...m[2].matchAll(/'([^']+)'/g)].map(x => x[1])); }
for (const f of ['gsc-tool-queries-2026-11-08.md', 'gsc-queries-2026-11-09.md', 'gsc-queries-2026-11-10.md']) { const fp = path.join(__dirname, '..', '..', 'keyword-research', f); if (!fs.existsSync(fp)) continue; for (const l of fs.readFileSync(fp, 'utf8').split(/\r?\n/)) { const m = l.match(/^(tools\/)?([a-z0-9-]+): (.+)$/); if (!m || / \| /.test(l)) continue; add((m[1] ? 'tool ' : 'post ') + m[2], m[3].split(';').map(s => s.replace(/\s+\d+( \(\d+ click\))?$/, ''))); } }
let tot = 0, hit = 0;
for (const [k, set] of Object.entries(want)) {
  const [kind, slug] = k.split(' '); let text;
  if (kind === 'tool') { const f = path.join(process.env.TEMP, 'p_' + slug + '.html'); if (!fs.existsSync(f)) continue; text = norm(fs.readFileSync(f, 'utf8').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')); }
  else { const p = posts.find(x => x.slug === slug); if (!p) continue; text = norm(p.content); }
  const miss = [...set].filter(q => !text.includes(norm(q).trim())); tot += set.size; hit += set.size - miss.length;
  if (miss.length) console.log(k + ': ' + miss.join(' | '));
}
console.log('exact-phrase coverage', hit + '/' + tot);
