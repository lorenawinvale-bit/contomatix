// One-off: read organic pages (Google US, 1 Nov 2026) for the monthly SEO report and 301 vs 302 posts + fresh Google docs. Sites are not named in the posts.
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-US,en;q=0.9' };
const sets = {
  'monthly-seo-report': ['https://searchengineland.com/guide/seo-report-template', 'https://www.semrush.com/my_reports/lp/report-templates/monthly-seo-report/', 'https://uppercutseo.com/monthly-seo-reports-guide/', 'https://www.reddit.com/r/DigitalMarketing/comments/1qs9ery/sample_seo_report_and_monthly_reporting/', 'https://88studio.io/products/seo-monthly-report-template', 'https://www.promodo.com/blog/seo-reports', 'https://www.straightnorth.com/blog/what-your-monthly-seo-report-should-look/', 'https://primediamarketing.com/monthly-seo-report/', 'https://www.swydo.com/blog/seo-reports-for-clients/'],
  '301-vs-302': ['https://www.conductor.com/academy/redirects/faq/301-vs-302/', 'https://stackoverflow.com/questions/1393280/http-redirect-301-permanent-vs-302-temporary', 'https://redirect.pizza/resources/redirects/301-vs-302-redirects', 'https://dub.co/blog/301-vs-302-redirect', 'https://www.namesilo.com/blog/en/websites-hosting/301-vs-302-redirect-whats-the-difference', 'https://www.seerinteractive.com/insights/301-vs-302-redirects-for-seo', 'https://www.seoclarity.net/resources/knowledgebase/use-301-redirect-vs-302-redirect-15683/']
};
const GOOGLE = {
  redirects: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects?hl=en',
  perf: 'https://support.google.com/webmasters/answer/7576553?hl=en',
  siteMove: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=en'
};
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const SIG = {
  'monthly-seo-report': { traffic: /organic traffic|sessions|clicks/i, rankings: /rankings?|keyword positions?|positions?/i, backlinks: /backlinks?|referring domains|link profile/i, conversions: /conversions?|leads?|revenue|goals?/i, technical: /technical|core web vitals|crawl|indexing|site health/i, insights: /insights?|recommendations?|next steps|action items?|takeaways?/i, summary: /executive summary|summary/i, kpi: /kpis?|key performance/i, template: /template/i, pdf: /\bpdf\b/i, tool: /dashboard|looker|data studio|looker studio|automate|software/i, gsc: /search console/i, ga: /google analytics|ga4/i, competitors: /competitors?/i, local: /google business profile|local seo|gbp/i, content: /content performance|top pages|blog posts?/i, sells: /get a quote|book a (call|demo)|free trial|sign up|pricing|request a/i, example: /example|sample/i },
  '301-vs-302': { permanent: /permanent/i, temporary: /temporary/i, s307: /\b307\b/, s308: /\b308\b/, equity: /link equity|link juice|pagerank|ranking signals?/i, google: /google (says|said|confirmed|documentation|has said)|mueller|search central/i, indexing: /index(ed|ing)? (the|which)|which url|canonical/i, htaccess: /htaccess|nginx|apache|redirect\(|rewriterule/i, tools: /redirect checker|httpstatus|screaming frog|curl|devtools/i, migration: /migration|site move|domain change|https/i, whenUse: /when to use|use a 301|use a 302/i, myth: /myth|misconception|no longer|used to/i, cache: /cache|cached|browser/i, sells: /get a quote|book a (call|demo)|free trial|sign up|pricing|request a/i, example: /example|for example/i }
};
async function one(u, sig) {
  const o = { url: u }; try {
    const r = await fetch(u, { redirect: 'follow', headers: UA, signal: AbortSignal.timeout(25000) }); o.status = r.status; const raw = await r.text(); const x = strip(raw); o.words = x.split(' ').length;
    for (const [k, re] of Object.entries(sig)) o[k] = re.test(x);
    const host = new URL(u).hostname.replace(/^www\./, ''); o.pct = (x.match(/\d+(\.\d+)?\s?%/g) || []).length;
    const yrs = x.match(/\b(20[12]\d)\b/g) || []; o.years = [...new Set(yrs)].sort(); o.maxYear = o.years.length ? o.years[o.years.length - 1] : null;
    o.googleDoc = /developers\.google\.com|support\.google\.com/i.test(raw); o.date = (x.match(/(updated|published|last modified)[^.]{0,40}20\d\d/i) || [''])[0];
    o.extLinks = [...raw.matchAll(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["']/gi)].map(m => { try { return new URL(m[1]).hostname.replace(/^www\./, ''); } catch (e) { return null; } }).filter(h => h && h !== host).length;
  } catch (e) { o.error = String(e.message || e).slice(0, 60); } return o;
}
(async () => {
  const kr = path.join(__dirname, '..', '..', 'keyword-research');
  for (const [k, us] of Object.entries(sets)) { const out = []; for (const u of us) out.push(await one(u, SIG[k])); fs.writeFileSync(path.join(kr, 'serp-' + k + '-2026-11-01.json'), JSON.stringify(out, null, 1)); console.log(k, out.filter(o => o.status === 200).length + '/' + out.length, 'readable', out.map(o => o.status + ':' + o.words).join(' ')); }
  const g = {}; for (const [k, u] of Object.entries(GOOGLE)) { try { const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(25000) }); const x = strip(await r.text()); g[k] = { url: u, status: r.status, len: x.length, text: x.slice(0, 14000) }; } catch (e) { g[k] = { url: u, error: String(e.message || e) }; } }
  fs.writeFileSync(path.join(kr, 'google-docs-day15-2026-11-01.json'), JSON.stringify(g, null, 1)); console.log('google docs', Object.entries(g).map(([k, v]) => k + ':' + (v.status || v.error) + ':' + (v.len || '')).join(' '));
})();
