// node scripts/crawl-own-issues.js [base]: crawls every sitemap URL of the live site and lists on-page issues (Screaming Frog style counts) with the URLs.
const fs = require('fs'); const path = require('path');
const base = process.argv[2] || 'https://contomatix.com';
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36' };
const dec = s => s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const strip = s => dec(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
(async () => {
  const sm = await (await fetch(base + '/sitemap.xml', { headers: UA })).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace('https://contomatix.com', base));
  const rows = []; let i = 0;
  const work = async () => { while (i < urls.length) { const u = urls[i++]; try {
    const r = await fetch(u, { headers: UA, redirect: 'manual', signal: AbortSignal.timeout(25000) }); const h = await r.text();
    const g = re => { const m = h.match(re); return m ? m[1] : ''; };
    const title = strip(g(/<title[^>]*>([\s\S]*?)<\/title>/i)); const mdm = h.match(/<meta[^>]+name=["']description["'][^>]*>/i); const md = mdm ? dec((mdm[0].match(/content=["']([^"']*)["']/i) || [])[1] || '') : '';
    const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => strip(m[1])); const h2s = [...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => strip(m[1]));
    const robots = (h.match(/<meta[^>]+name=["']robots["'][^>]*>/i) || [''])[0]; const canon = g(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || g(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    const alts = [...h.matchAll(/<img[^>]+alt=["']([^"']*)["']/gi)].map(m => dec(m[1]));
    rows.push({ u, status: r.status, title, md, h1: h1s[0] || '', h1n: h1s.length, h2: h2s, noindex: /noindex/i.test(robots) || /noindex/i.test(r.headers.get('x-robots-tag') || ''), canon, canonDiff: canon && canon.replace(/\/$/, '') !== u.replace(/\/$/, ''), longAlt: alts.filter(a => a.length > 100).length, imgs: alts.length });
  } catch (e) { rows.push({ u, err: String(e.message).slice(0, 40) }); } } };
  await Promise.all(Array.from({ length: 8 }, work));
  const ok = rows.filter(r => r.status === 200); const L = (f) => ok.filter(f).map(r => r.u);
  const dup = (k) => { const m = {}; ok.forEach(r => { if (r[k]) (m[r[k]] = m[r[k]] || []).push(r.u); }); return Object.values(m).filter(a => a.length > 1).flat(); };
  const out = { base, urls: urls.length, ok: ok.length, nonOk: rows.filter(r => r.status !== 200).map(r => r.u + ' ' + (r.status || r.err)),
    noindex: L(r => r.noindex), canonicalised: L(r => r.canonDiff), titleOver60: L(r => r.title.length > 60), titleUnder30: L(r => r.title.length < 30), mdOver155: L(r => r.md.length > 155), mdMissing: L(r => !r.md),
    mdDuplicate: dup('md'), h1Duplicate: dup('h1'), h1Missing: L(r => !r.h1), h1Over70: L(r => r.h1.length > 70), titleSameAsH1: L(r => r.title === r.h1), altOver100: L(r => r.longAlt > 0), h2Duplicate: ok.filter(r => new Set(r.h2).size < r.h2.length).map(r => r.u) };
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-crawl-rows-2026-11-03.json'), JSON.stringify(rows)); fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-crawl-issues-2026-11-03.json'), JSON.stringify(out, null, 1));
  for (const [k, v] of Object.entries(out)) console.log(k.padEnd(14), Array.isArray(v) ? v.length : v);
})();
