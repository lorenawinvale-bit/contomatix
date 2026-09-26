// Generates the WebP sibling for every blog cover image.
//
// The blog templates serve covers through <picture>:
//   <source srcset="/images/blog/illus-<slug>.webp" type="image/webp">
//   <img src="/images/blog/illus-<slug>.png" ...>
// so any new illus-*.png needs a .webp next to it or the browser silently
// falls back to the much larger PNG.
//
// Usage: node scripts/make-cover-webp.js          (only missing/outdated files)
//        node scripts/make-cover-webp.js --all    (rebuild every WebP)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '..', 'public', 'images', 'blog');
const all = process.argv.includes('--all');

(async () => {
  const pngs = fs.readdirSync(dir).filter(f => /^illus-.*\.png$/.test(f));
  let built = 0, skipped = 0, before = 0, after = 0;

  for (const file of pngs) {
    const src = path.join(dir, file);
    const out = src.replace(/\.png$/, '.webp');
    if (!all && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) {
      skipped++;
      continue;
    }
    await sharp(src).webp({ quality: 80, effort: 5 }).toFile(out);
    before += fs.statSync(src).size;
    after += fs.statSync(out).size;
    built++;
    console.log('  built', path.basename(out));
  }

  console.log(`covers: ${pngs.length} | built ${built} | up to date ${skipped}`);
  if (built) {
    console.log(`  ${(before / 1024).toFixed(0)}KB PNG -> ${(after / 1024).toFixed(0)}KB WebP ` +
      `(${Math.round(100 - (after / before) * 100)}% smaller)`);
  }
})().catch(err => { console.error(err); process.exit(1); });
