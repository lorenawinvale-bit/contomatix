// One-off: fetch curated "resources" pages found by Google operator searches on 17 Oct 2026; count outbound links, nofollow share and broken external links (sample of up to 40 links each).
const fs = require('fs'); const path = require('path');
const urls = ['https://websupportcrew.com/useful-links-and-tools/','https://upgrowth.in/a-compilation-of-seo-resources-find-the-best-relevant-latest-seo-growth-tools/','https://www.simpleeffectiveness.com/seo-audio-resources/','https://www.bluelinks.agency/resources/listicles/off-page-seo-tools/','https://onwardsandup.co.uk/top-5-website-seo-tools/','https://bwebsites.co.uk/news/useful-seo-resources/','https://primaryposition.com/blog/seo-resources-reddit/','https://upgrowth.in/seo-resources/','https://gfseoexpert.com/resources/','https://bluehands.com.au/category/seo-resources/','https://myseoresourcess.blogspot.com/','https://seoagencyinessex.co.uk/free-seo-resource/','https://inkhive.com/2019/04/15/7-local-seo-resources-boost-rankings/','https://sharprocket.com.ph/page_category/resources/'];
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
const to = async (u, opt = {}) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), 12000); try { return await fetch(u, { redirect: 'follow', signal: c.signal, headers: UA, ...opt }); } finally { clearTimeout(t); } };
(async () => {
  const rows = [];
  for (const u of urls) {
    const o = { url: u }; try {
      const r = await to(u); o.status = r.status; if (r.status !== 200) { rows.push(o); continue; }
      const h = await r.text(); const host = new URL(r.url).hostname.replace(/^www\./, '');
      const links = [...h.matchAll(/<a\b([^>]*)>/gi)].map(m => { const a = m[1]; const href = (a.match(/href=["']([^"']+)["']/i) || [])[1]; return { href, rel: (a.match(/rel=["']([^"']+)["']/i) || [])[1] || '' }; }).filter(l => l.href && /^https?:/i.test(l.href));
      const ext = links.filter(l => { try { return new URL(l.href).hostname.replace(/^www\./, '') !== host; } catch (e) { return false; } });
      o.external = ext.length; o.nofollow = ext.filter(l => /nofollow|sponsored|ugc/i.test(l.rel)).length;
      const uniq = [...new Set(ext.map(l => l.href.split('#')[0]))].filter(x => !/facebook\.com|twitter\.com|x\.com|linkedin\.com|instagram\.com|youtube\.com|pinterest\.com|wa\.me|google\.com\/maps/i.test(x)).slice(0, 40);
      o.checked = uniq.length; o.broken = 0; o.brokenList = [];
      for (const x of uniq) { let s = 0; try { let rr = await to(x, { method: 'HEAD' }); s = rr.status; if (s === 405 || s === 403 || s === 400 || s >= 500) { rr = await to(x); s = rr.status; } } catch (e) { s = 0; } if (s === 404 || s === 410 || s === 0) { o.broken++; o.brokenList.push(x + ' ' + s); } }
      const txt = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
      o.years = [...new Set((txt.match(/\b(20[12]\d)\b/g) || []))].sort().slice(-3);
      o.words = txt.split(/\s+/).filter(Boolean).length;
      o.suggest = /suggest (a|your) (resource|link|tool)|submit (a|your) (resource|link|tool)|add your (link|tool|resource)|got a resource/i.test(txt);
    } catch (e) { o.error = String(e.message).slice(0, 50); }
    rows.push(o); console.log(u.slice(8, 50).padEnd(42), o.status || o.error, o.external, o.nofollow, o.checked, o.broken);
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'resource-pages-scan-2026-10-17.json'), JSON.stringify(rows, null, 1));
  const ok = rows.filter(r => r.status === 200); console.log('ok', ok.length, 'ext total', ok.reduce((a, r) => a + r.external, 0), 'checked', ok.reduce((a, r) => a + r.checked, 0), 'broken', ok.reduce((a, r) => a + r.broken, 0), 'pagesWithBroken', ok.filter(r => r.broken).length, 'nofollow', ok.reduce((a, r) => a + r.nofollow, 0), 'suggest', ok.filter(r => r.suggest).length);
})();
