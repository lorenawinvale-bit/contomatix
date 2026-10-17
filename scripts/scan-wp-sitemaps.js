// One-off: detect which plugin generates each site's sitemap and what a Yoast sitemap contains (read 17 Oct 2026).
const fs = require('fs'); const path = require('path'); const kr = path.join(__dirname, '..', '..', 'keyword-research');
const origins = new Set();
for (const o of JSON.parse(fs.readFileSync(path.join(kr, 'sitemaps-sample-2026-10-14.json'), 'utf8'))) origins.add(new URL(o.origin).origin);
for (const o of JSON.parse(fs.readFileSync(path.join(kr, 'doctor-sites-raleigh-2026-10-14.json'), 'utf8'))) { try { origins.add(new URL(o.final || o.url).origin); } catch (e) {} }
for (const o of JSON.parse(fs.readFileSync(path.join(kr, 'electrician-sites-denver-2026-10-13.json'), 'utf8'))) { try { origins.add(new URL(o.final || o.url).origin); } catch (e) {} }
const get = async (u) => { try { const c = new AbortController(); const t = setTimeout(() => c.abort(), 15000); const r = await fetch(u, { redirect: 'follow', signal: c.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' } }); clearTimeout(t); const x = await r.text(); return { s: r.status, x, final: r.url }; } catch (e) { return { s: 0, x: '' }; } };
const sig = x => /Yoast SEO/i.test(x) || /yoast-sitemap\.xsl/i.test(x) ? 'Yoast' : /Rank Math/i.test(x) ? 'Rank Math' : /All in One SEO|aioseo/i.test(x) ? 'AIOSEO' : /wp-sitemap/i.test(x) ? 'WordPress core' : /Google XML Sitemaps|Arne Brachhold/i.test(x) ? 'Google XML Sitemaps' : /<urlset|<sitemapindex/i.test(x) ? 'Other' : null;
(async () => {
  const rows = [];
  for (const o of origins) {
    const r = { origin: o, plugin: null, url: null };
    for (const p of ['/sitemap_index.xml', '/sitemap.xml', '/wp-sitemap.xml', '/sitemap-index.xml']) {
      const g = await get(o + p); if (g.s === 200 && /<(urlset|sitemapindex)/i.test(g.x)) { r.plugin = sig(g.x); r.url = p; r.xml = g.x; break; }
    }
    if (r.plugin === 'Yoast') {
      const kids = [...r.xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]); r.kids = kids.map(k => k.replace(/^.*\//, ''));
      r.kidsLastmod = /<lastmod>/.test(r.xml);
      const post = kids.find(k => /post-sitemap|page-sitemap/.test(k)); if (post) { const g = await get(post); r.hasPriority = /<priority>/.test(g.x); r.hasChangefreq = /<changefreq>/.test(g.x); r.hasLastmod = /<lastmod>/.test(g.x); r.hasImages = /<image:image>/.test(g.x); r.urls = (g.x.match(/<url>/g) || []).length; }
      const rb = await get(o + '/robots.txt'); r.robotsListsSitemap = /sitemap:.*sitemap_index\.xml/i.test(rb.x);
    }
    delete r.xml; rows.push(r); process.stdout.write(r.plugin ? r.plugin[0] : '.');
  }
  fs.writeFileSync(path.join(kr, 'wp-sitemap-plugins-2026-10-17.json'), JSON.stringify(rows, null, 1));
  const t = {}; rows.forEach(r => { const k = r.plugin || 'none found'; t[k] = (t[k] || 0) + 1; });
  console.log('\n', rows.length, JSON.stringify(t)); const y = rows.filter(r => r.plugin === 'Yoast'); console.log('yoast', y.length, 'priority', y.filter(r => r.hasPriority).length, 'changefreq', y.filter(r => r.hasChangefreq).length, 'lastmod', y.filter(r => r.hasLastmod).length, 'images', y.filter(r => r.hasImages).length, 'robots', y.filter(r => r.robotsListsSitemap).length);
  y.forEach(r => console.log(r.origin, r.kids.join(','), r.urls));
})();
