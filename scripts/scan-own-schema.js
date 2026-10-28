// One-off: count JSON-LD @type values across all URLs in our live sitemap (26 Oct 2026).
const fs = require('fs'); const path = require('path');
(async () => {
  const sm = await (await fetch('https://contomatix.com/sitemap.xml')).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const res = []; let idx = 0;
  const types = (n, out) => { if (!n || typeof n !== 'object') return; if (Array.isArray(n)) return n.forEach(x => types(x, out)); const t = n['@type']; if (t) (Array.isArray(t) ? t : [t]).forEach(x => out.add(x)); if (n['@graph']) types(n['@graph'], out); for (const k of Object.keys(n)) if (k !== '@context' && k !== '@graph' && typeof n[k] === 'object') types(n[k], out); };
  async function worker() { while (idx < urls.length) { const u = urls[idx++]; try { const h = await (await fetch(u, { signal: AbortSignal.timeout(20000) })).text(); const set = new Set(); let bad = 0; for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { types(JSON.parse(m[1]), set); } catch (e) { bad++; } } res.push({ u, t: [...set], bad, micro: /itemtype=["']https?:\/\/schema\.org/i.test(h) }); } catch (e) { res.push({ u, err: e.message }); } } }
  await Promise.all(Array.from({ length: 6 }, worker));
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-schema-types-2026-10-26.json'), JSON.stringify(res));
  const ok = res.filter(r => !r.err); const c = {}; ok.forEach(r => r.t.forEach(t => c[t] = (c[t] || 0) + 1));
  console.log('urls', urls.length, 'ok', ok.length, 'err', res.length - ok.length, 'bad json', ok.filter(r => r.bad).length, 'microdata', ok.filter(r => r.micro).length);
  console.log(Object.entries(c).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ':' + v).join('  '));
  const sec = p => /\/blog\//.test(p) ? 'blog' : /\/tools\//.test(p) ? 'tools' : 'other'; const s = {}; ok.forEach(r => { const k = sec(r.u); s[k] = s[k] || { n: 0, faq: 0 }; s[k].n++; if (r.t.includes('FAQPage')) s[k].faq++; }); console.log(JSON.stringify(s));
})();
