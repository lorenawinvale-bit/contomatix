// One-off: fetch the 8 organic pages ranking for "white label link building" (Google US, 15 Oct 2026) and record on-page signals.
const fs = require('fs'); const path = require('path');
const urls = ['https://www.thebusinessrover.com/white-label-link-building', 'https://eseospace.com/blog/white-label-link-building/', 'https://linkbuilder.io/white-label-link-building/', 'https://saasylinks.com/blog/best-white-label-link-building-services/', 'https://www.viralchilly.com/white-label-link-building', 'https://cuttingedgepr.com/articles/best-white-label-link-building-services-for-agencies-in-2026/', 'https://www.clickx.io/white-label-link-building/', 'https://www.zelst.io/search-engine-optimization/white-label-link-building/'];
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&amp;/g, ' ').replace(/\s+/g, ' ');
async function one(u) {
  const o = { url: u };
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 25000);
    const r = await fetch(u, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)', accept: 'text/html' } });
    clearTimeout(t); o.status = r.status;
    const h = await r.text(); const x = strip(h);
    o.words = x.split(' ').filter(Boolean).length;
    o.price = /(\$\s?\d[\d,]*(\.\d+)?|\d[\d,]*\s?(usd|dollars))/i.test(x);
    o.priceExamples = (x.match(/\$\s?\d[\d,]*(\.\d+)?/g) || []).slice(0, 4);
    o.report = /report/i.test(x);
    o.dofollow = /dofollow|do-follow|do follow/i.test(x);
    o.dr = /\bDR\s?\d|domain rating|domain authority|\bDA\s?\d/i.test(x);
    o.guarantee = /guarantee/i.test(x);
    o.turnaround = /turnaround|delivery time|within \d+ (days|business)|\d+\s?-\s?\d+ (days|weeks)/i.test(x);
    o.contract = /contract|minimum (order|commitment)|retainer|cancel/i.test(x);
    o.ndaOrPrivacy = /\bNDA\b|confidential|white-?label(ed)? (report|dashboard)|your (logo|brand)/i.test(x);
    o.sample = /sample report|example report|report template/i.test(x);
    o.faq = /frequently asked|\bFAQ/i.test(x);
    o.cases = /case stud/i.test(x);
    o.cta = /(book|schedule|get).{0,20}(call|demo|quote|started)/i.test(x);
    o.sponsoredMention = /sponsored|paid link|guest post/i.test(x);
    o.googlePolicy = /spam polic|link scheme|google('s)? (guidelines|policy)/i.test(x);
  } catch (e) { o.error = String(e.message || e).slice(0, 60); }
  return o;
}
(async () => {
  const out = []; for (const u of urls) out.push(await one(u));
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'serp-white-label-link-building-2026-10-15.json'), JSON.stringify(out, null, 1));
  const ok = out.filter(o => o.status === 200); const c = f => ok.filter(f).length;
  console.log(JSON.stringify({ fetched: out.length, ok: ok.length, bad: out.filter(o => o.status !== 200).map(o => o.status || o.error), medianWords: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], price: c(o => o.price), report: c(o => o.report), dofollow: c(o => o.dofollow), dr: c(o => o.dr), guarantee: c(o => o.guarantee), turnaround: c(o => o.turnaround), contract: c(o => o.contract), brand: c(o => o.ndaOrPrivacy), sample: c(o => o.sample), faq: c(o => o.faq), cases: c(o => o.cases), cta: c(o => o.cta), sponsored: c(o => o.sponsoredMention), googlePolicy: c(o => o.googlePolicy) }, null, 1));
  out.forEach(o => console.log((o.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]).padEnd(24), o.status, o.words, o.price ? o.priceExamples.join(' ') : '-'));
})();
