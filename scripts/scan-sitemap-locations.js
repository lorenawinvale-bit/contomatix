// One-off: for the 66 business sites, find where the sitemap lives: robots.txt Sitemap lines and 5 common paths (20 Oct 2026).
const fs = require('fs'); const path = require('path'); const kr = path.join(__dirname, '..', '..', 'keyword-research');
const base = JSON.parse(fs.readFileSync(path.join(kr, 'wp-sitemap-plugins-2026-10-17.json'), 'utf8')); const seen = new Set();
const sites = base.filter(x => { const h = new URL(x.origin).hostname.replace(/^www\./, ''); if (seen.has(h)) return false; seen.add(h); return true; });
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
const get = async (u) => { try { const c = new AbortController(); const t = setTimeout(() => c.abort(), 15000); const r = await fetch(u, { redirect: 'follow', signal: c.signal, headers: UA }); clearTimeout(t); return { s: r.status, x: await r.text(), final: r.url }; } catch (e) { return { s: 0, x: '' }; } };
const isXml = x => /<(urlset|sitemapindex)[\s>]/i.test(x);
const PATHS = ['/sitemap.xml', '/sitemap_index.xml', '/sitemap-index.xml', '/wp-sitemap.xml', '/sitemap.xml.gz'];
(async () => {
  const rows = [];
  for (const s of sites) {
    const o = { origin: s.origin, robots: false, robotsSitemaps: [], found: [] };
    const rb = await get(s.origin + '/robots.txt');
    if (rb.s === 200 && !/<html/i.test(rb.x.slice(0, 300))) { o.robots = true; o.robotsSitemaps = [...rb.x.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map(m => m[1]); }
    for (const p of PATHS) { if (p.endsWith('.gz')) continue; const g = await get(s.origin + p); if (g.s === 200 && isXml(g.x)) o.found.push(p); }
    // validate robots-listed sitemaps
    o.robotsOk = 0; for (const u of o.robotsSitemaps.slice(0, 3)) { const g = await get(u); if (g.s === 200 && isXml(g.x)) o.robotsOk++; }
    rows.push(o); process.stdout.write(o.found.length || o.robotsOk ? '+' : '.');
  }
  fs.writeFileSync(path.join(kr, 'sitemap-locations-2026-10-20.json'), JSON.stringify(rows, null, 1));
  const n = rows.length, any = rows.filter(r => r.found.length || r.robotsOk).length, listed = rows.filter(r => r.robotsSitemaps.length).length;
  const atSm = rows.filter(r => r.found.includes('/sitemap.xml')).length, atIdx = rows.filter(r => r.found.includes('/sitemap_index.xml')).length, atWp = rows.filter(r => r.found.includes('/wp-sitemap.xml')).length, atDash = rows.filter(r => r.found.includes('/sitemap-index.xml')).length;
  const onlyRobots = rows.filter(r => !r.found.length && r.robotsOk).length, onlyPaths = rows.filter(r => r.found.length && !r.robotsOk).length, both = rows.filter(r => r.found.length && r.robotsOk).length;
  console.log('\nsites', n, 'any', any, 'robots.txt present', rows.filter(r => r.robots).length, 'robots lists sitemap', listed, 'valid via robots', rows.filter(r => r.robotsOk).length, 'at /sitemap.xml', atSm, '/sitemap_index.xml', atIdx, '/wp-sitemap.xml', atWp, '/sitemap-index.xml', atDash, 'onlyRobots', onlyRobots, 'onlyPaths', onlyPaths, 'both', both, 'none', n - any);
})();
