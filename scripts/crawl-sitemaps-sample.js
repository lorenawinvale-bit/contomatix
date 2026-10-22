// One-off: read the sitemaps of the sites behind the Denver electrician Maps listings and record which tags they use.
// node scripts/crawl-sitemaps-sample.js -> keyword-research/sitemaps-sample-2026-10-14.json
const fs = require('fs'); const path = require('path');
const src = require('../../keyword-research/maps-electrician-denver-2026-10-13.json').listings;
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
async function get(u) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20000);
  try { const r = await fetch(u, { headers: UA, redirect: 'follow', signal: ctl.signal }); const body = await r.text(); return { status: r.status, body, url: r.url }; }
  catch (e) { return { status: 0, body: '', error: String(e.message).slice(0, 60) }; }
  finally { clearTimeout(t); }
}
async function one(l) {
  const origin = new URL(l.u).origin; const o = { origin };
  let cand = [];
  const rb = await get(origin + '/robots.txt');
  if (rb.status === 200) cand = [...rb.body.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map(m => m[1]);
  o.inRobots = cand.length > 0;
  if (!cand.length) cand = [origin + '/sitemap.xml', origin + '/sitemap_index.xml'];
  let xml = null;
  for (const c of cand) { const r = await get(c); if (r.status === 200 && /<(urlset|sitemapindex)/i.test(r.body)) { xml = r.body; o.sitemap = c; break; } }
  if (!xml) { o.found = false; return o; }
  o.found = true;
  // follow one level of index to the first child that is a urlset
  if (/<sitemapindex/i.test(xml)) {
    o.index = true;
    const kids = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map(m => m[1]);
    o.childCount = kids.length;
    for (const k of kids.slice(0, 3)) { const r = await get(k); if (r.status === 200 && /<urlset/i.test(r.body)) { xml = r.body; o.child = k; break; } }
  }
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map(m => m[1]);
  o.urls = urls.length;
  const pri = urls.map(u => (/<priority>\s*([^<\s]+)/i.exec(u) || [])[1]).filter(Boolean);
  const cf = urls.map(u => (/<changefreq>\s*([^<\s]+)/i.exec(u) || [])[1]).filter(Boolean);
  const lm = urls.map(u => (/<lastmod>\s*([^<\s]+)/i.exec(u) || [])[1]).filter(Boolean);
  o.hasPriority = pri.length > 0; o.hasChangefreq = cf.length > 0; o.hasLastmod = lm.length > 0;
  o.priorityDistinct = [...new Set(pri)].length; o.priorityValues = [...new Set(pri)].slice(0, 6);
  o.changefreqValues = [...new Set(cf)].slice(0, 6);
  o.lastmodDistinct = [...new Set(lm.map(x => x.slice(0, 10)))].length;
  o.lastmodDates = lm.length;
  return o;
}
(async () => {
  const seen = new Set(); const list = src.filter(l => { const o = new URL(l.u).origin; if (seen.has(o)) return false; seen.add(o); return true; });
  const out = [];
  for (let i = 0; i < list.length; i += 4) out.push(...await Promise.all(list.slice(i, i + 4).map(one)));
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'sitemaps-sample-2026-10-14.json'), JSON.stringify(out, null, 1));
  const f = out.filter(o => o.found); const c = fn => f.filter(fn).length;
  console.log(JSON.stringify({ sites: out.length, found: f.length, inRobots: c(o => o.inRobots), index: c(o => o.index), priority: c(o => o.hasPriority), changefreq: c(o => o.hasChangefreq), lastmod: c(o => o.hasLastmod),
    priorityAllSame: c(o => o.hasPriority && o.priorityDistinct === 1), priorityVaried: c(o => o.priorityDistinct > 1), lastmodOneDate: c(o => o.hasLastmod && o.lastmodDistinct === 1 && o.lastmodDates > 5), lastmodMany: c(o => o.lastmodDistinct > 1) }, null, 1));
  out.forEach(o => console.log(o.origin.replace('https://', ''), o.found ? [o.urls, o.hasPriority ? 'P' + o.priorityValues.join('/') : '-', o.hasChangefreq ? 'C' + o.changefreqValues.join('/') : '-', o.hasLastmod ? 'L' + o.lastmodDistinct : '-'].join(' ') : 'no sitemap'));
})();
