// Usage: node scripts/make-cover-card.js <slug> [<slug> ...]
// Renders public/images/blog/card-<slug>.png (1200x630) from the post's title and
// category in data/blog.json, using local headless Chrome. Sets nothing in blog.json.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const root = path.join(__dirname, '..');
const posts = require(path.join(root, 'data', 'blog.json'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (const slug of process.argv.slice(2)) {
  const post = posts.find(p => p.slug === slug);
  if (!post) { console.error('No post with slug ' + slug); process.exitCode = 1; continue; }
  const [main, ...rest] = post.title.split(/:\s*/);
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:#16192A;font-family:"Segoe UI",Arial,sans-serif;color:#FAF5EF;position:relative}
.band{position:absolute;right:-260px;top:-140px;width:560px;height:560px;border-radius:50%;border:70px solid #0EA5A0;opacity:.9}
.band2{position:absolute;right:40px;bottom:-220px;width:360px;height:360px;border-radius:50%;background:#F5A623;opacity:.95}
.wrap{position:absolute;left:80px;top:90px;width:620px}
.chip{display:inline-block;background:#0EA5A0;color:#fff;font-weight:700;font-size:22px;letter-spacing:2px;padding:10px 18px;border-radius:6px;text-transform:uppercase}
h1{font-size:66px;line-height:1.02;margin:34px 0 22px;font-weight:800}
p{font-size:32px;line-height:1.3;margin:0;color:#D9D2C5}
.brand{position:absolute;left:80px;bottom:56px;font-size:26px;font-weight:700}.brand span{color:#0EA5A0}
</style></head><body><div class="band"></div><div class="band2"></div><div class="wrap"><div class="chip">${esc(post.category || 'SEO')} guide</div><h1>${esc(main)}</h1><p>${esc(rest.join(': '))}</p></div><div class="brand">contomatix<span>.com</span></div></body></html>`;
  const tmp = path.join(os.tmpdir(), 'card-' + slug + '.html');
  fs.writeFileSync(tmp, html);
  const out = path.join(root, 'public', 'images', 'blog', 'card-' + slug + '.png');
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630', '--screenshot=' + out, 'file:///' + tmp.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log('Saved ' + out + ' (' + fs.statSync(out).size + ' bytes)');
}
