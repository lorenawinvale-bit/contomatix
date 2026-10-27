// One-off: test how the sites behind our ranking-page crawls redirect http://host/ (27 Oct 2026). Follows redirects manually, never sends credentials.
const fs = require('fs'); const path = require('path');
const kr = path.join(__dirname, '..', '..', 'keyword-research');
const hosts = new Set();
for (const f of fs.readdirSync(kr).filter(f => /^serp-.*-2026-10-(1[5-9]|2[0-7])\.json$/.test(f))) { try { for (const o of JSON.parse(fs.readFileSync(path.join(kr, f), 'utf8'))) if (o && o.url) hosts.add(new URL(o.url).hostname.replace(/^www\./, '')); } catch (e) {} }
const list = [...hosts].filter(h => !/google\.com|web\.dev|reddit\.com|schema\.org|contomatix\.com|linkedin\.com|quora\.com/.test(h));
async function chain(host) {
  const hops = []; let url = 'http://' + host + '/';
  for (let i = 0; i < 8; i++) {
    let r; try { r = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36' }, signal: AbortSignal.timeout(12000) }); } catch (e) { return { host, err: String(e.message || e).slice(0, 40), hops }; }
    hops.push({ s: r.status, u: url }); const loc = r.headers.get('location');
    if (r.status >= 300 && r.status < 400 && loc) { try { url = new URL(loc, url).href; } catch (e) { break; } } else break;
  }
  return { host, hops };
}
(async () => {
  const out = []; let idx = 0;
  async function w() { while (idx < list.length) { const h = list[idx++]; out.push(await chain(h)); } }
  await Promise.all(Array.from({ length: 8 }, w));
  fs.writeFileSync(path.join(kr, 'redirect-chains-2026-10-27.json'), JSON.stringify(out));
  const ok = out.filter(o => !o.err && o.hops.length); const first = o => o.hops[0].s;
  const redirected = ok.filter(o => first(o) >= 300 && first(o) < 400);
  const perm = redirected.filter(o => [301, 308].includes(first(o))).length, temp = redirected.filter(o => [302, 303, 307].includes(first(o))).length;
  const hopCounts = redirected.map(o => o.hops.filter(h => h.s >= 300 && h.s < 400).length);
  const finalHttps = ok.filter(o => /^https:/.test(o.hops[o.hops.length - 1].u)).length;
  console.log('hosts', list.length, 'readable', ok.length, 'errors', out.length - ok.length, 'redirect on first request', redirected.length, 'perm', perm, 'temp', temp, 'no redirect', ok.length - redirected.length);
  console.log('hop distribution', JSON.stringify(hopCounts.reduce((a, n) => (a[n] = (a[n] || 0) + 1, a), {})), 'ending on https', finalHttps);
  console.log('with 3+ redirect hops', hopCounts.filter(n => n >= 3).length, 'first hop statuses', JSON.stringify(redirected.reduce((a, o) => (a[first(o)] = (a[first(o)] || 0) + 1, a), {})));
})();
