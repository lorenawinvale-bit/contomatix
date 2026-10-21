// One-off: read the sitemaps of low-DR link building / SEO service competitors and list the pages they publish (21 Oct 2026).
const fs = require('fs'); const path = require('path');
const doms = ['guestpostforyou.com','seowithsenthil.com','orangeoutreach.com','guestpostingoutreach.com','netconnectdigital.com','linkbuildingservices.io','charlesfloate.com','linkbuilder.io','presswhizz.com','eseospace.com','brimcove.com','onelittleweb.com','non.agency','staydigitalmarketers.com','saasylinks.com','reputepost.com','backlinkmanager.io','thebusinessrover.com','editorial.link','linkrocket.ai','seovision.io','buildingbacklinks.io','dofollow.com','userp.io','lowfruits.io','distribb.io'];
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
const get = async u => { try { const c = new AbortController(); const t = setTimeout(() => c.abort(), 20000); const r = await fetch(u, { redirect: 'follow', signal: c.signal, headers: UA }); clearTimeout(t); return { s: r.status, x: await r.text() }; } catch (e) { return { s: 0, x: '' }; } };
const locs = x => [...x.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]);
(async () => {
  const out = {};
  for (const d of doms) {
    let urls = [];
    for (const p of ['/sitemap.xml', '/sitemap_index.xml', '/wp-sitemap.xml', '/sitemap-index.xml']) {
      const g = await get('https://' + d + p); if (g.s !== 200 || !/<(urlset|sitemapindex)/.test(g.x)) { const g2 = await get('https://www.' + d + p); if (g2.s !== 200 || !/<(urlset|sitemapindex)/.test(g2.x)) continue; urls = locs(g2.x); } else urls = locs(g.x);
      if (/<sitemapindex/.test(g.x)) { const kids = urls.filter(u => /post|blog|page|article|news|learn/i.test(u)).slice(0, 6); let all = []; for (const k of kids) { const kk = await get(k); if (kk.s === 200) all = all.concat(locs(kk.x)); } urls = all.length ? all : urls; }
      break;
    }
    out[d] = urls; console.log(d.padEnd(32), urls.length);
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'competitor-sitemaps-2026-10-21.json'), JSON.stringify(out));
})();
