// Day-17: which character counts the 8 ranking guides on "meta description length" recommend (Google US, 3 Nov 2026).
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-US,en;q=0.9' };
const kr = path.join(__dirname, '..', '..', 'keyword-research');
const R = JSON.parse(fs.readFileSync(path.join(kr, 'serp-meta-description-length-2026-11-03.json')));
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
(async () => {
  for (const o of R) { try { const r = await fetch(o.url, { headers: UA, signal: AbortSignal.timeout(25000) }); const x = strip(await r.text());
    o.chars = [...new Set([...x.matchAll(/\b(\d{2,3})(?:\s?-\s?(\d{2,3}))?\s*characters/gi)].flatMap(m => [+m[1], m[2] ? +m[2] : null]).filter(n => n && n >= 50 && n <= 320))].sort((a, b) => a - b);
    o.px = [...new Set([...x.matchAll(/\b(\d{3,4})\s*(?:px|pixels)/gi)].map(m => +m[1]))].sort((a, b) => a - b);
    o.mobile = /mobile/i.test(x); o.rewrite = /rewrit|re-writ|replace|changes? your|instead of your|google (may|might|can|will|often|sometimes)/i.test(x); o.truncat = /truncat|cut off|cuts off/i.test(x); o.pixel = /pixel/i.test(x); o.ctr = /click-through|\bctr\b/i.test(x); o.example = /example/i.test(x); o.tool = /checker|counter|tool/i.test(x);
  } catch (e) { o.err = String(e.message).slice(0, 50); } }
  fs.writeFileSync(path.join(kr, 'serp-meta-description-length-2026-11-03.json'), JSON.stringify(R, null, 1));
  R.forEach(o => console.log(o.url.slice(8, 40), 'chars', JSON.stringify(o.chars), 'px', JSON.stringify(o.px), o.mobile ? 'M' : '', o.rewrite ? 'R' : '', o.truncat ? 'T' : '', o.pixel ? 'P' : '', o.ctr ? 'C' : '', o.example ? 'E' : ''));
})();
