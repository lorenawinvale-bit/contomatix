// Adds designed concept diagrams to older posts that have no images inside their content (6 Nov 2026).
// Each diagram is built from facts already stated in the post, rendered as a proof-style PNG, and inserted after the first paragraph under a named H2 (no caption, alt text only).
// usage: node scripts/add-post-images.js [slug ...]   (no args = all specs below). Idempotent: a diagram already in the content is skipped.
const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process'); const sharp = require('sharp');
const root = path.join(__dirname, '..'); process.chdir(root);
const D = require('./diagram-lib2.js'); // diagram-lib generators plus the extra layouts
const SPECS = require('./add-post-images-specs.js')(D).concat(require('./add-post-images-specs2.js')(D));
const only = process.argv.slice(2); const img = path.join(root, 'public', 'images', 'blog', 'proof');
const url = f => 'file:///' + f.replace(/\\/g, '/').replace(/ /g, '%20');
const plain = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;|’/g, "'").replace(/&quot;|“|”/g, '"').replace(/\s+/g, ' ').trim();
(async () => {
  const fp = path.join(root, 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const report = [];
  for (const spec of SPECS) {
    if (only.length && !only.includes(spec.slug)) continue;
    const p = posts.find(x => x.slug === spec.slug); if (!p) throw new Error('missing post ' + spec.slug);
    let added = 0;
    for (const im of spec.images) {
      const src = `/images/blog/proof/${spec.slug}-${im.name}.png`; if (p.content.includes(src)) continue;
      if (im.alt.length > 100) throw new Error('alt too long (' + im.alt.length + ') ' + spec.slug + ' ' + im.name);
      if (/—/.test(im.alt)) throw new Error('em dash in alt');
      const hf = path.join(__dirname, `table-${spec.slug}-${im.name}.html`); fs.writeFileSync(hf, D.proofHtml(im.svg));
      const out = path.join(img, `${spec.slug}-${im.name}.png`);
      execFileSync(process.execPath, [path.join(__dirname, 'capture-page.js'), url(hf), out, '--w=1280', '--h=1500', '--sel=body'], { stdio: 'pipe' });
      const buf = await sharp(out).png({ palette: true, quality: 85, effort: 7, compressionLevel: 9 }).toBuffer(); fs.writeFileSync(out, buf);
      const meta = await sharp(out).metadata();
      // find the H2 and insert after its first paragraph
      const re = /<h2>([\s\S]*?)<\/h2>/g; let m, at = -1; while ((m = re.exec(p.content))) { if (plain(m[1]).startsWith(im.afterH2)) { at = m.index + m[0].length; break; } }
      if (at < 0) throw new Error('H2 not found: ' + im.afterH2 + ' in ' + spec.slug);
      let end = p.content.indexOf('</p>', at); if (end < 0) throw new Error('no paragraph after H2 in ' + spec.slug); end += 4;
      const fig = `\n<figure style="margin:20px 0;"><img src="${src}" alt="${im.alt}" width="1280" height="${meta.height}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>`;
      p.content = p.content.slice(0, end) + fig + p.content.slice(end); added++;
      report.push(`${spec.slug}/${im.name}: ${meta.width}x${meta.height}, ${Math.round(buf.length / 1024)} kB`);
    }
    if (!added) report.push(spec.slug + ': already has these images');
  }
  fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); console.log(report.join('\n'));
})();
