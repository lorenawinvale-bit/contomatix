// One-off: status-check every unique external link in data/blog.json post bodies.
// node scripts/crawl-outbound-links.js -> keyword-research/outbound-links-2026-10-14.json
const fs = require('fs'); const path = require('path');
const blog = require('../data/blog.json');
const set = new Map(); // url -> posts count
blog.forEach(p => { [...p.content.matchAll(/href="(https?:\/\/[^"]+)"/gi)].forEach(m => { const u = m[1].replace(/&amp;/g, '&'); if (/^https?:\/\/(www\.)?contomatix\.com/i.test(u)) return; set.set(u, (set.get(u) || new Set()).add(p.slug)); }); });
const urls = [...set.keys()];
console.log('unique external urls', urls.length);
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixLinkCheck/1.0; +https://contomatix.com)', accept: 'text/html,*/*' };
async function check(u) {
  const o = { url: u, posts: [...set.get(u)] };
  for (const method of ['HEAD', 'GET']) {
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 15000);
      const r = await fetch(u, { method, headers: UA, redirect: 'follow', signal: ctl.signal }); clearTimeout(t);
      o.status = r.status; o.final = r.url; o.redirected = r.redirected; o.method = method;
      if (r.status < 400) return o;
      if (method === 'GET') return o;
    } catch (e) { o.error = String(e.cause && e.cause.code || e.message).slice(0, 40); if (method === 'GET') return o; }
  }
  return o;
}
(async () => {
  const out = []; let i = 0;
  async function worker() { while (i < urls.length) { const u = urls[i++]; out.push(await check(u)); if (out.length % 50 === 0) console.log(out.length); } }
  await Promise.all(Array.from({ length: 8 }, worker));
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'outbound-links-2026-10-14.json'), JSON.stringify(out, null, 1));
  const g = fn => out.filter(fn).length;
  const gone = out.filter(o => o.status === 404 || o.status === 410);
  console.log(JSON.stringify({ total: out.length, ok: g(o => o.status >= 200 && o.status < 300), redirected: g(o => o.redirected && o.status < 400), gone: gone.length, blocked: g(o => [401, 403, 429, 999].includes(o.status)), serverErr: g(o => o.status >= 500), failed: g(o => o.error && !o.status) }));
  gone.forEach(o => console.log('GONE', o.status, o.url, o.posts.length));
  out.filter(o => o.error && !o.status).forEach(o => console.log('ERR', o.error, o.url));
})();
