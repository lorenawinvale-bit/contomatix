// One-off: count rel attributes on external links in the main content of the 7 pages ranking for "types of backlinks" (19 Oct 2026).
const fs = require('fs'); const path = require('path');
const urls = ['https://seranking.com/blog/types-of-backlinks/','https://dofollow.com/blog/backlink-types','https://owdt.com/article/what-are-backlinks/','https://www.safaridigital.com.au/blog/types-of-backlinks/','https://www.semrush.com/blog/types-of-backlinks/','https://userp.io/link-building/types-of-backlinks/','https://www.simplilearn.com/types-of-backlinks-in-seo-article'];
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
(async () => {
  const rows = [];
  for (const u of urls) {
    const o = { url: u }; try {
      const r = await fetch(u, { redirect: 'follow', headers: UA }); const h = await r.text(); const host = new URL(r.url).hostname.replace(/^www\./, '');
      let body = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<header[\s\S]*?<\/header>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<aside[\s\S]*?<\/aside>/gi, ' ');
      const a = [...body.matchAll(/<a\b([^>]*)>/gi)].map(m => ({ href: (m[1].match(/href=["']([^"']+)["']/i) || [])[1] || '', rel: ((m[1].match(/rel=["']([^"']+)["']/i) || [])[1] || '').toLowerCase() }));
      const ext = a.filter(x => /^https?:\/\//i.test(x.href)).filter(x => { try { return new URL(x.href).hostname.replace(/^www\./, '') !== host; } catch (e) { return false; } });
      o.ext = ext.length; o.nofollow = ext.filter(x => /nofollow/.test(x.rel)).length; o.sponsored = ext.filter(x => /sponsored/.test(x.rel)).length; o.ugc = ext.filter(x => /ugc/.test(x.rel)).length; o.followed = ext.length - ext.filter(x => /nofollow|sponsored|ugc/.test(x.rel)).length; o.status = r.status;
    } catch (e) { o.error = e.message; }
    rows.push(o); console.log(u.slice(8, 50).padEnd(42), JSON.stringify(o).slice(0, 160));
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'rel-census-types-of-backlinks-2026-10-19.json'), JSON.stringify(rows, null, 1));
  const ok = rows.filter(r => r.status === 200); console.log('ext', ok.reduce((a, r) => a + r.ext, 0), 'followed', ok.reduce((a, r) => a + r.followed, 0), 'nofollow', ok.reduce((a, r) => a + r.nofollow, 0), 'sponsored', ok.reduce((a, r) => a + r.sponsored, 0), 'ugc', ok.reduce((a, r) => a + r.ugc, 0));
})();
