// One-off (3 Nov 2026): (1) shorten alt text over 100 characters in blog.json, (2) serve blog images over 100 kB as WebP (new .webp next to the .png/.jpg; the originals stay).
// node scripts/optimize-blog-media.js [--dry]
const fs = require('fs'); const path = require('path'); const sharp = require('sharp'); process.chdir(path.join(__dirname, '..'));
const dry = process.argv.includes('--dry');
const STOP = /\b(and|or|of|the|a|an|to|in|with|for|on|by|at|that|which|is|are)$/i;
const TRAIL = /[\s,;:\-]+$/;
function shorten(s) {
  if (s.length <= 100) return s;
  const m = s.match(/^(.*? homepage screenshot)\b/); if (m && m[1].length <= 100) return m[1];
  const re = /[:,;]| (?:with|showing|confirming|representing|where|which|that|against|in the|during|from|after|before|covering|including) /g; let best = '', x;
  while ((x = re.exec(s))) { const p = s.slice(0, x.index); if (p.length <= 100 && p.length >= 25 && p.length > best.length) best = p; }
  if (best) return best.replace(TRAIL, '');
  let cut = s.slice(0, 100); cut = cut.slice(0, cut.lastIndexOf(' ')).replace(TRAIL, ''); while (STOP.test(cut)) cut = cut.replace(STOP, '').replace(TRAIL, '');
  return cut;
}
(async () => {
  const a = JSON.parse(fs.readFileSync('data/blog.json', 'utf8')); let altN = 0, srcN = 0; const samples = []; const made = new Map(); let saved = 0, kept = 0;
  const webpFor = async (src) => {
    if (made.has(src)) return made.get(src);
    const f = path.join('public', src.replace(/^\//, '')); if (!/\.(png|jpe?g)$/i.test(f) || !fs.existsSync(f)) { made.set(src, null); return null; }
    const size = fs.statSync(f).size; if (size <= 100 * 1024) { made.set(src, null); return null; }
    const out = f.replace(/\.(png|jpe?g)$/i, '.webp'); let w = null;
    if (!dry) {
      const meta = await sharp(f).metadata(); let img = sharp(f); if (meta.width > 1600) img = img.resize({ width: 1280 });
      await img.webp({ quality: 80, effort: 5 }).toFile(out);
      const ns = fs.statSync(out).size; if (ns >= size) { fs.unlinkSync(out); made.set(src, null); kept++; return null; }
      saved += size - ns; w = { src: src.replace(/\.(png|jpe?g)$/i, '.webp'), resized: meta.width > 1600 ? Math.round(1280 * meta.height / meta.width) : 0 };
    } else w = { src: src.replace(/\.(png|jpe?g)$/i, '.webp'), resized: 0 };
    made.set(src, w); return w;
  };
  for (const p of a) {
    let c = p.content; const imgs = [...c.matchAll(/<img[^>]*>/g)].map(m => m[0]);
    for (const tag of imgs) {
      let t = tag; const alt = (t.match(/alt="([^"]*)"/) || [])[1];
      if (alt && alt.length > 100) { const n = shorten(alt); if (samples.length < 8 || n.length < 15) samples.push(alt.length + ' -> ' + n); t = t.replace('alt="' + alt + '"', 'alt="' + n + '"'); altN++; }
      const src = (t.match(/src="([^"]+)"/) || [])[1];
      if (src) { const w = await webpFor(src); if (w) { t = t.replace('src="' + src + '"', 'src="' + w.src + '"'); if (w.resized) t = t.replace(/height="\d+"/, 'height="' + w.resized + '"'); srcN++; } }
      if (t !== tag) c = c.split(tag).join(t);
    }
    p.content = c;
  }
  if (!dry) fs.writeFileSync('data/blog.json', JSON.stringify(a, null, 2), 'utf8');
  console.log('alts shortened', altN, 'img srcs switched to webp', srcN, 'unique webp made', [...made.values()].filter(Boolean).length, 'kept png (webp not smaller)', kept, 'saved MB', (saved / 1048576).toFixed(1));
  samples.forEach(s => console.log(' ', s));
  const left = a.reduce((n, p) => n + [...p.content.matchAll(/<img[^>]*alt="([^"]*)"/g)].filter(m => m[1].length > 100).length, 0); console.log('alts still over 100:', left);
})();
