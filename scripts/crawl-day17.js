// One-off: Day-17 data (3 Nov 2026): meta description / title lengths on the Google US top results for three keywords,
// our own excerpt (meta description) length spread, subdomain-vs-subfolder split across our saved SERP files, Google snippet doc text.
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-US,en;q=0.9' };
const kr = path.join(__dirname, '..', '..', 'keyword-research');
const sets = {
  'meta-description-length': ['https://mrs.digital/tools/meta-length-checker/', 'https://www.webyurt.com/tools/meta-title-counter', 'https://ahrefs.com/blog/meta-description/', 'https://www.tripledart.com/tools/meta-length-checker', 'https://www.collaborada.com/blog/meta-description-length', 'https://www.conductor.com/academy/meta-description/', 'https://spotibo.com/meta-description-length/', 'https://www.semrush.com/blog/meta-description/'],
  'content-gap-analysis': ['https://searchengineland.com/guide/content-gap', 'https://ahrefs.com/content-gap', 'https://www.semrush.com/blog/content-gap-analysis/', 'https://www.heretto.com/blog/content-gap-analysis', 'https://www.yotpo.com/blog/modern-content-gap-analysis/', 'https://wgcontent.com/blog/why-a-content-gap-analysis-is-a-must-for-any-content-strategy/', 'https://manus.im/solutions/seo/content-gap-analysis'],
  'subdomain-vs-subdirectory': ['https://www.semrush.com/blog/subdomain-vs-subdirectory/', 'https://searchengineland.com/guide/subdirectory-vs-subdomain', 'https://blog.cloudflare.com/subdomains-vs-subdirectories-best-practices-workers-part-1', 'https://namefi.io/r/en/blog/subdomain-vs-subdirectory', 'https://massivegrid.com/blog/subdomain-vs-subdirectory-seo-hosting/', 'https://www.impactplus.com/blog/subdomains-vs-subfolders', 'https://www.obilityb2b.com/blog/seo-best-practices-subdomain-vs-subdirectory/']
};
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
async function one(u) {
  const o = { url: u }; try {
    const r = await fetch(u, { redirect: 'follow', headers: UA, signal: AbortSignal.timeout(25000) }); o.status = r.status; const raw = await r.text(); const x = strip(raw);
    o.words = x.split(' ').length;
    const t = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i); o.title = t ? t[1].replace(/\s+/g, ' ').trim() : ''; o.titleLen = o.title.length;
    const m = raw.match(/<meta[^>]+name=["']description["'][^>]*>/i); const c = m ? (m[0].match(/content=["']([^"']*)["']/i) || [])[1] || '' : null;
    o.metaDesc = c; o.metaDescLen = c == null ? null : c.length; o.h2 = (raw.match(/<h2\b/gi) || []).length; o.faq = /FAQPage/.test(raw);
    o.date = (x.match(/(updated|published|last modified)[^.]{0,40}20\d\d/i) || [''])[0];
  } catch (e) { o.error = String(e.message || e).slice(0, 60); } return o;
}
(async () => {
  for (const [k, us] of Object.entries(sets)) { const out = []; for (const u of us) out.push(await one(u)); fs.writeFileSync(path.join(kr, 'serp-' + k + '-2026-11-03.json'), JSON.stringify(out, null, 1)); console.log(k, out.map(o => (o.status || o.error) + ':' + o.words + ':md' + o.metaDescLen).join(' ')); }
  // own excerpt lengths
  const posts = require('../data/blog.json'); const L = posts.map(p => (p.excerpt || '').length);
  const own = { posts: posts.length, over160: L.filter(n => n > 160).length, over155: L.filter(n => n > 155).length, between120_155: L.filter(n => n >= 120 && n <= 155).length, under120: L.filter(n => n < 120).length, empty: L.filter(n => n === 0).length, median: L.slice().sort((a, b) => a - b)[Math.floor(L.length / 2)], max: Math.max(...L), min: Math.min(...L) };
  const T = posts.map(p => p.title.length); own.titleOver60 = T.filter(n => n > 60).length; own.titleMedian = T.slice().sort((a, b) => a - b)[Math.floor(T.length / 2)];
  fs.writeFileSync(path.join(kr, 'own-meta-lengths-2026-11-03.json'), JSON.stringify(own, null, 1)); console.log('own', JSON.stringify(own));
  // subdomain vs subfolder across saved SERP files
  let all = []; for (const f of fs.readdirSync(kr).filter(f => /^serp-.*\.json$/.test(f))) { try { const j = JSON.parse(fs.readFileSync(path.join(kr, f))); const arr = Array.isArray(j) ? j : Object.values(j).flat(); for (const o of arr) if (o && o.url) all.push({ f, url: o.url }); } catch (e) {} }
  const seen = new Set(); const rows = []; for (const a of all) { if (seen.has(a.url)) continue; seen.add(a.url); let h; try { h = new URL(a.url).hostname; } catch (e) { continue; } const parts = h.split('.'); const base = /\.(co|com|org|net|gov|ac)\.[a-z]{2}$/.test(h) ? 3 : 2; const sub = parts.length > base ? parts.slice(0, parts.length - base).join('.') : ''; rows.push({ url: a.url, host: h, sub: sub && sub !== 'www' ? sub : '' }); }
  const subs = rows.filter(r => r.sub); const sd = { urlsUnique: rows.length, onSubdomain: subs.length, pct: +(100 * subs.length / rows.length).toFixed(1), subdomains: Object.entries(subs.reduce((m, r) => (m[r.sub] = (m[r.sub] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]).slice(0, 15), examples: subs.slice(0, 20).map(r => r.url) };
  fs.writeFileSync(path.join(kr, 'serp-subdomain-split-2026-11-03.json'), JSON.stringify(sd, null, 1)); console.log('subdomain split', sd.urlsUnique, sd.onSubdomain, sd.pct + '%', JSON.stringify(sd.subdomains.slice(0, 8)));
  // Google snippet doc
  const g = {}; const u = 'https://developers.google.com/search/docs/appearance/snippet?hl=en'; try { const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(25000) }); const x = strip(await r.text()); g.snippet = { url: u, status: r.status, len: x.length, hits: [...x.matchAll(/[^.]{0,160}(meta description|characters|length|longer)[^.]{0,200}\./gi)].slice(0, 14).map(m => m[0].trim()), updated: (x.match(/Last updated[^.]{0,40}/i) || [''])[0] }; } catch (e) { g.snippet = { error: String(e.message) }; }
  fs.writeFileSync(path.join(kr, 'google-docs-day17-2026-11-03.json'), JSON.stringify(g, null, 1)); console.log('google doc', g.snippet.status || g.snippet.error, g.snippet.updated, (g.snippet.hits || []).length);
})();
