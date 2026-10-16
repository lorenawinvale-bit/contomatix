// node scripts/finish-assets.js <slug> [table1 table2 ...]   (table names = html files scripts/table-<slug>-<name>.html -> public/images/blog/proof/<slug>-<name>.png)
// Renders cover svg -> png (+webp for that slug only), infographic html -> png, and table html -> cropped proof png. Local helper.
const { execFileSync } = require('child_process'); const fs = require('fs'); const path = require('path'); const sharp = require('sharp');
const [slug, ...tables] = process.argv.slice(2); const sc = __dirname; const img = path.join(sc, '..', 'public', 'images', 'blog');
const url = f => 'file:///' + f.replace(/\\/g, '/').replace(/ /g, '%20');
const cap = (html, out, w, h, sel) => execFileSync(process.execPath, [path.join(sc, 'capture-page.js'), url(html), out, `--w=${w}`, `--h=${h}`, ...(sel ? ['--sel=' + sel] : [])], { stdio: 'pipe' });
(async () => {
  await sharp(path.join(img, `illus-${slug}.svg`), { density: 96 }).resize(760, 475).png().toFile(path.join(img, `illus-${slug}.png`));
  await sharp(path.join(img, `illus-${slug}.png`)).webp({ quality: 80, effort: 5 }).toFile(path.join(img, `illus-${slug}.webp`));
  await sharp(path.join(img, `diagram-${slug}.svg`)).metadata().catch(() => 0);
  cap(path.join(sc, `infographic-${slug}.html`), path.join(img, `infographic-${slug}.png`), 1376, 790);
  const m = await sharp(path.join(img, `infographic-${slug}.png`)).metadata(); console.log('infographic', m.width, m.height);
  for (const t of tables) {
    const out = path.join(img, 'proof', `${slug}-${t}.png`);
    cap(path.join(sc, `table-${slug}-${t}.html`), out, 1280, 1500, 'body');
    const tm = await sharp(out).metadata(); console.log('table', t, tm.width, tm.height);
  }
})();
