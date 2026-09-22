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
  // Light cream background + soft teal/orange accent circles, matching the
  // brand style used by every other illus-*/diagram-*.svg on the site
  // (dark navy cards read as off-brand next to those).
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{background:#FDFAF5;font-family:"Segoe UI",Arial,sans-serif;color:#16192A;position:relative}
.band{position:absolute;right:-200px;top:-160px;width:520px;height:520px;border-radius:50%;background:rgba(20,184,166,0.10)}
.band2{position:absolute;left:-160px;bottom:-200px;width:420px;height:420px;border-radius:50%;background:rgba(249,115,22,0.08)}
.logo{position:absolute;left:80px;top:64px;display:flex;align-items:center;gap:14px}
.logo .mark{width:44px;height:44px;border-radius:50%;background:#FFFFFF;border:1px solid #EAE0D2;display:flex;align-items:center;justify-content:center}
.logo .name{font-size:26px;font-weight:700}.logo .name span{color:#0EA5A0}
.wrap{position:absolute;left:80px;top:170px;width:640px}
.chip{display:inline-block;background:#0EA5A0;color:#fff;font-weight:700;font-size:20px;letter-spacing:2px;padding:9px 16px;border-radius:6px;text-transform:uppercase}
h1{font-size:60px;line-height:1.08;margin:28px 0 18px;font-weight:800;color:#16192A}
p{font-size:28px;line-height:1.35;margin:0;color:#565E6E}
.brand{position:absolute;left:80px;bottom:56px;font-size:22px;font-weight:700;color:#8A8371}.brand strong{color:#16192A}
</style></head><body>
<div class="band"></div><div class="band2"></div>
<div class="logo"><div class="mark"><svg width="26" height="26" viewBox="0 0 48 48"><path d="M 35.52 13.63 A 15.5 15.5 0 1 0 35.52 34.37" fill="none" stroke="#0EA5A0" stroke-width="4.6" stroke-linecap="round"/><circle cx="35.52" cy="13.63" r="3.4" fill="#F5A623"/><circle cx="35.52" cy="34.37" r="3.4" fill="#14B8A6"/><circle cx="24" cy="24" r="2.2" fill="#16192A"/></svg></div><div class="name">Conto<span>matix</span></div></div>
<div class="wrap"><div class="chip">${esc(post.category || 'SEO')} guide</div><h1>${esc(main)}</h1><p>${esc(rest.join(': '))}</p></div>
<div class="brand"><strong>contomatix</strong>.com</div>
</body></html>`;
  const tmp = path.join(os.tmpdir(), 'card-' + slug + '.html');
  fs.writeFileSync(tmp, html);
  const out = path.join(root, 'public', 'images', 'blog', 'card-' + slug + '.png');
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630', '--screenshot=' + out, 'file:///' + tmp.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log('Saved ' + out + ' (' + fs.statSync(out).size + ' bytes)');
}
