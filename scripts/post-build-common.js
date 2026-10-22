// Shared finisher for post builders: renders html assets to png, converts the cover, prints checks, writes data/blog.json.
const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const root = path.join(__dirname, '..'); const img = path.join(root, 'public', 'images', 'blog');
const cap = (htmlFile, out, extra = []) => execFileSync(process.execPath, [path.join(__dirname, 'capture-page.js'), 'file:///' + htmlFile.replace(/\\/g, '/'), out, ...extra], { stdio: 'inherit' });

// o: {slug, title, excerpt, category, author, content, table:{html, out}, infographic:{html}}
async function finish(o) {
  const { slug } = o;
  if (process.argv.includes('--assets')) {
    const sharp = require('sharp');
    await sharp(fs.readFileSync(path.join(img, `illus-${slug}.svg`))).resize(760, 475).png().toFile(path.join(img, `illus-${slug}.png`));
    execFileSync(process.execPath, [path.join(__dirname, 'make-cover-webp.js')], { stdio: 'inherit' });
    cap(path.join(__dirname, `infographic-${slug}.html`), path.join(img, `infographic-${slug}.png`), ['--w=1376', '--h=790']);
    if (o.table) cap(path.join(__dirname, o.table.html), path.join(img, 'proof', o.table.out), ['--w=1280', '--h=900', '--sel=body']);
    console.log('assets done');
  }
  const f = o.content.replace(/<[^>]+>/g, ' ');
  const firstExt = o.content.search(/href="https?:/);
  console.log('title', o.title.length, 'excerpt', o.excerpt.length, 'words', f.split(/\s+/).filter(Boolean).length,
    'firstExt', firstExt < 0 ? 'none' : (firstExt / o.content.length * 100).toFixed(1) + '%', 'faq', (o.content.match(/<details>/g) || []).length,
    'h2', (o.content.match(/<h2>/g) || []).length, 'figcaption', /figcaption/.test(o.content));
  const post = { slug, title: o.title, category: o.category, author: o.author, date: '2026-10-15', excerpt: o.excerpt,
    heroDiagram: `/images/blog/diagram-${slug}.svg`, image: `/images/blog/illus-${slug}.png`, content: o.content };
  if (process.argv.includes('--write')) {
    const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const i = all.findIndex(p => p.slug === slug); if (i >= 0) all[i] = post; else all.push(post);
    fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
  }
}
module.exports = { finish };
