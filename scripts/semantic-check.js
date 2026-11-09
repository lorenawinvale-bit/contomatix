// Semantic optimization check for a blog post (daily format, 8 Nov 2026). Every post updated in the daily batch must pass all lines.
// usage: node scripts/semantic-check.js <slug> [slug ...]    or    node scripts/semantic-check.js --queue   (checks every row marked done-local or done in docs/update-queue.csv)
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..'); const posts = require('../data/blog.json'); const slugs = new Set(posts.map(p => p.slug));
let list = process.argv.slice(2);
if (list[0] === '--queue') list = fs.readFileSync(path.join(root, 'docs', 'update-queue.csv'), 'utf8').split(/\r?\n/).filter(l => /,done(-local)?,/.test(l)).map(l => l.split(',')[1]);
const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
let failed = 0;
for (const slug of list) {
  const p = posts.find(x => x.slug === slug); if (!p) { console.log(slug + ': NOT FOUND'); failed++; continue; }
  const c = p.content; const text = strip(c); const words = text.split(' ').length;
  const h2 = (c.match(/<h2>[\s\S]*?<\/h2>/g) || []).map(strip); const h3 = (c.match(/<h3>[\s\S]*?<\/h3>/g) || []).map(strip);
  const internal = [...c.matchAll(/href="\/(blog|tools)\/([^"#?]+)/g)]; const uniqueInternal = new Set(internal.map(m => m[0])).size;
  const broken = internal.filter(m => m[1] === 'blog' && !slugs.has(m[2]));
  const imgs = (c.match(/<img /g) || []).length; const firstP = strip((c.match(/<p>[\s\S]*?<\/p>/) || [''])[0]);
  const checks = [
    ['related-questions section with 5+ H3', h2.some(x => /^Related Questions/.test(x)) && h3.length >= 5],
    ['2,200+ words', words >= 2200],
    ['FAQ section present', h2.some(x => /Frequently Asked Questions/.test(x))],
    ['5+ unique internal links', uniqueInternal >= 5],
    ['no broken internal links', broken.length === 0],
    ['3+ content images', imgs >= 3],
    ['no figcaption', !/<figcaption/.test(c)],
    ['no em dash', !/—/.test(c)],
    ['answer-first intro (first paragraph 25+ words)', firstP.split(' ').length >= 25],
    ['6+ H2 sections', h2.length >= 6]
  ];
  const bad = checks.filter(x => !x[1]);
  console.log(`${slug}: ${checks.length - bad.length}/${checks.length}` + (bad.length ? '  FAIL: ' + bad.map(x => x[0]).join('; ') : '  ok') + `  (${words} words, ${h2.length} H2, ${h3.length} H3, ${uniqueInternal} internal, ${imgs} images)`);
  if (bad.length) failed++;
}
console.log(failed ? `\n${failed} post(s) need work` : '\nall posts pass');
