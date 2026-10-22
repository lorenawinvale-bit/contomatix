// One-off: fetch the homepages/landing pages behind the Denver electrician Maps listings and record on-page local SEO signals.
// node scripts/crawl-electrician-sites.js  -> writes keyword-research/electrician-sites-denver-2026-10-13.json
const fs = require('fs'); const path = require('path');
const src = require('../../keyword-research/maps-electrician-denver-2026-10-13.json');
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&amp;/g, ' ').replace(/\s+/g, ' ');
async function one(l) {
  const o = { url: l.u };
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20000);
    const r = await fetch(l.u, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)', accept: 'text/html' } });
    clearTimeout(t);
    o.status = r.status; o.final = r.url;
    const h = await r.text(); o.bytes = h.length;
    const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(h) || [, ''])[1].replace(/\s+/g, ' ').trim();
    o.title = title; o.titleDenver = /denver/i.test(title);
    const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => strip(m[1]).trim());
    o.h1Count = h1s.length; o.h1 = h1s[0] || ''; o.h1Electric = /electric/i.test(o.h1);
    const types = new Set(); let areaServed = false, hasPhone = false, hasAddr = false, agg = false;
    [...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].forEach(m => {
      try {
        const walk = n => { if (!n || typeof n !== 'object') return; if (Array.isArray(n)) return n.forEach(walk);
          if (n['@type']) [].concat(n['@type']).forEach(x => types.add(String(x)));
          if (n.areaServed) areaServed = true; if (n.telephone) hasPhone = true; if (n.address) hasAddr = true; if (n.aggregateRating) agg = true;
          Object.values(n).forEach(walk); };
        walk(JSON.parse(m[1]));
      } catch (e) { o.ldError = true; }
    });
    o.ldTypes = [...types]; o.ldPresent = types.size > 0;
    o.electricianType = [...types].some(x => /^Electrician$/i.test(x));
    o.localBusinessAny = [...types].some(x => /LocalBusiness|Electrician|HomeAndConstructionBusiness|ProfessionalService|Organization/i.test(x));
    o.areaServed = areaServed; o.ldPhone = hasPhone; o.ldAddress = hasAddr; o.ldAggRating = agg;
    const text = strip(h);
    o.telLink = /href=["']tel:/i.test(h);
    o.license = /licens/i.test(text);
    o.insured = /insured|bonded/i.test(text);
    o.emergency = /24\s*\/\s*7|24[- ]hour|emergency/i.test(text);
    o.denverInText = (text.match(/denver/gi) || []).length;
    o.canonical = /<link[^>]+rel=["']canonical["']/i.test(h);
    o.viewport = /<meta[^>]+name=["']viewport["']/i.test(h);
    o.https = /^https:/.test(o.final);
    o.metaDesc = /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+/i.test(h);
    o.areaPageLinks = new Set([...h.matchAll(/href=["']([^"'#]+)["']/gi)].map(m => m[1]).filter(x => /service-area|areas-we-serve|locations?\b|\/(aurora|lakewood|arvada|littleton|centennial|westminster|englewood|thornton|golden|boulder|parker)/i.test(x))).size;
  } catch (e) { o.error = String(e.message || e).slice(0, 80); }
  return o;
}
(async () => {
  const out = [];
  for (let i = 0; i < src.listings.length; i += 5) out.push(...await Promise.all(src.listings.slice(i, i + 5).map(one)));
  const fp = path.join(__dirname, '..', '..', 'keyword-research', 'electrician-sites-denver-2026-10-13.json');
  fs.writeFileSync(fp, JSON.stringify(out, null, 1));
  const ok = out.filter(o => o.status === 200);
  console.log('fetched', out.length, 'ok', ok.length, 'errors', out.filter(o => o.error).length, 'non200', out.filter(o => o.status && o.status !== 200).map(o => o.status + ' ' + o.url));
  const c = f => ok.filter(f).length;
  console.log(JSON.stringify({ ok: ok.length, ldPresent: c(o => o.ldPresent), electricianType: c(o => o.electricianType), localBusinessAny: c(o => o.localBusinessAny), areaServed: c(o => o.areaServed), ldPhone: c(o => o.ldPhone), ldAddress: c(o => o.ldAddress), ldAgg: c(o => o.ldAggRating), titleDenver: c(o => o.titleDenver), h1Electric: c(o => o.h1Electric), h1None: c(o => o.h1Count === 0), h1Multi: c(o => o.h1Count > 1), telLink: c(o => o.telLink), license: c(o => o.license), insured: c(o => o.insured), emergency: c(o => o.emergency), canonical: c(o => o.canonical), metaDesc: c(o => o.metaDesc), areaLinks: c(o => o.areaPageLinks > 0), https: c(o => o.https) }, null, 1));
})();
