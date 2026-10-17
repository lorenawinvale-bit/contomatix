// One-off: for the Yoast-generated sitemaps found on 17 Oct 2026, check /sitemap.xml redirect and the x-robots-tag header.
const fs = require('fs'), path = require('path'); const kr = path.join(__dirname, '..', '..', 'keyword-research');
const rows = JSON.parse(fs.readFileSync(path.join(kr, 'wp-sitemap-plugins-2026-10-17.json'), 'utf8')); const seen = new Set();
const y = rows.filter(x => x.plugin === 'Yoast').filter(x => { const h = new URL(x.origin).hostname.replace(/^www\./, ''); if (seen.has(h)) return false; seen.add(h); return true; });
(async () => {
  const out = [];
  for (const r of y) {
    const o = { origin: r.origin };
    try { const a = await fetch(r.origin + '/sitemap.xml', { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0)' } }); o.sitemapXmlStatus = a.status; o.loc = a.headers.get('location') || ''; } catch (e) { o.sitemapXmlStatus = 0; }
    try { const b = await fetch(r.origin + '/sitemap_index.xml', { headers: { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0)' } }); o.xrobots = b.headers.get('x-robots-tag') || ''; } catch (e) { o.xrobots = 'ERR'; }
    out.push(o);
  }
  fs.writeFileSync(path.join(kr, 'yoast-headers-2026-10-17.json'), JSON.stringify(out, null, 1));
  console.log('n', out.length, 'redirectToIndex', out.filter(o => [301, 302, 307, 308].includes(o.sitemapXmlStatus) && /sitemap_index/.test(o.loc)).length, 'xrobotsNoindex', out.filter(o => /noindex/i.test(o.xrobots)).length);
  out.forEach(o => console.log(o.origin, o.sitemapXmlStatus, o.loc.slice(-30), o.xrobots));
})();
