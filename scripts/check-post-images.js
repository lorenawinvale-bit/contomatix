// Pre-push image-set check: node scripts/check-post-images.js <slug> [<slug>...]
// Enforces the standard set: heroDiagram + cover (png+webp) + exactly the in-content set
// (>=2 real screenshots under /proof/ AND 1 infographic-<slug>.png), every file exists, every figure has alt text.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), pub = path.join(root, 'public');
const posts = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blog.json'), 'utf8'));
let bad = 0;
for (const slug of process.argv.slice(2)) {
  const p = posts.find(x => x.slug === slug); const errs = [];
  if (!p) { console.log('FAIL', slug, 'not in blog.json'); bad++; continue; }
  const ex = f => f && fs.existsSync(path.join(pub, f));
  if (!ex(p.heroDiagram)) errs.push('heroDiagram missing/file absent');
  if (!ex(p.image)) errs.push('cover image missing/file absent');
  else if (!ex(p.image.replace(/\.png$/, '.webp'))) errs.push('cover .webp sibling missing');
  const imgs = [...p.content.matchAll(/<img\s+src="([^"]+)"[^>]*?alt="([^"]*)"/g)];
  const srcs = imgs.map(m => m[1]);
  if (imgs.length < 3) errs.push('only ' + imgs.length + ' in-content images (need 2 real + 1 infographic)');
  if (srcs.filter(s => s.includes('/proof/')).length < 2) errs.push('fewer than 2 real screenshots under /proof/');
  if (!srcs.includes(`/images/blog/infographic-${slug}.png`)) errs.push('infographic-' + slug + '.png is NOT embedded in the content');
  for (const m of imgs) { if (!ex(m[1])) errs.push('file missing on disk: ' + m[1]); if (!m[2].trim()) errs.push('empty alt: ' + m[1]); }
  if (/<figcaption/i.test(p.content)) errs.push('contains <figcaption>: never put visible captions under images');
  if (!/class="post-faq"/.test(p.content)) errs.push('FAQ not wrapped in <div class="post-faq"> (no FAQPage schema)');
  console.log(errs.length ? 'FAIL ' + slug + '\n  - ' + errs.join('\n  - ') : 'PASS ' + slug + ' (' + imgs.length + ' images)');
  bad += errs.length ? 1 : 0;
}
process.exit(bad ? 1 : 0);
