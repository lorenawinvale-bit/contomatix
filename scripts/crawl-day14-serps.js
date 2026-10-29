// One-off: read organic pages (Google US, 29 Oct 2026) for Day-14 keywords + fresh Google docs. Sites are not named in the posts.
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-US,en;q=0.9' };
const sets = {
  'javascript-seo': ['https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', 'https://www.seobility.net/en/blog/javascript-and-seo/', 'https://www.semrush.com/blog/javascript-seo/', 'https://sitebulb.com/javascript-seo/', 'https://ahrefs.com/blog/javascript-seo/', 'https://www.brightedge.com/blog/javascript-seo', 'https://www.contentful.com/blog/javascript-seo-best-practices/'],
  'topical-map-seo': ['https://ahrefs.com/blog/seo-topical-map/', 'https://eseospace.com/topical-maps-seo/', 'https://hallam.agency/blog/a-step-by-step-guide-to-creating-topical-maps-for-seo/', 'https://vettted.com/seo-services/seo-topical-map/', 'https://searchatlas.com/seo-topical-maps/', 'https://bettermarketing.pub/how-i-create-seo-topical-maps-for-websites-f5d3df8190d5', 'https://rankstar.io/topical-map-service/', 'https://searchengineland.com/seo-social-topical-map-484018', 'https://topicalmap.com/'],
  'blogger-outreach': ['https://www.bloggeroutreach.io/', 'https://prbloggeroutreach.com/', 'https://www.brafton.com/blog/strategy/blogger-outreach-campaigns/', 'https://searchengineland.com/guide/blogger-outreach', 'https://fatjoe.com/blogger-outreach/', 'https://onelittleweb.com/blogger-outreach-service/', 'https://www.serplogic.com/what-is-blogger-outreach/', 'https://learn.g2.com/blog-outreach'],
  'keyword-grouping': ['https://elementor.com/blog/keyword-grouping/', 'https://rush-analytics.com/learn-seo/keyword-grouping', 'https://keyworduniverse.co.uk/tools/ai-keyword-grouping', 'https://www.americaneagle.com/insights/blog/post/semantic-seo-keyword-and-topical-grouping', 'https://www.keysearch.co/blog/how-to-group-keywords/', 'https://wpseoai.com/blog/what-is-an-example-of-keyword-grouping/', 'https://optiwing.com/blog/keyword-grouping', 'https://www.elegantthemes.com/blog/marketing/keyword-grouping', 'https://www.webtonic.io/blog/keyword-grouping']
};
const GOOGLE = {
  jsbasics: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?hl=en',
  dynamic: 'https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering?hl=en',
  fixjs: 'https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript?hl=en',
  links: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=en',
  helpful: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=en',
  spam: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=en'
};
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const SIG = {
  'javascript-seo': { rendering: /render/i, ssr: /server[- ]side render|ssr/i, csr: /client[- ]side render|csr/i, dynamic: /dynamic rendering/i, deprecated: /deprecated|workaround/i, googlebot: /googlebot/i, wrs: /web rendering service|chromium|evergreen/i, links: /<a href|anchor|crawlable link/i, inspect: /url inspection|mobile-friendly test|rich results test/i, robots: /robots\.txt/i, lazy: /lazy[- ]load/i, hash: /#!|hash|fragment/i, frameworks: /react|angular|vue|next\.?js|nuxt/i, audit: /audit|checklist/i, sells: /get a quote|book a demo|request a demo|pricing|free trial|our services/i, queue: /render queue|queue/i },
  'topical-map-seo': { pillar: /pillar/i, cluster: /cluster/i, entity: /entit(y|ies)/i, semantic: /semantic/i, internal: /internal link/i, research: /keyword research/i, gap: /content gap|gap analysis/i, authority: /topical authority/i, steps: /step\s?\d|step-by-step|how to (create|build|make)/i, tool: /tool|software|template/i, sells: /get a quote|book a (call|demo)|pricing|order|buy|our services|get started|packages?/i, google: /google (says|said|confirmed|documentation)|search central|mueller/i, example: /example/i, spreadsheet: /spreadsheet|excel|google sheets|csv/i },
  'blogger-outreach': { sells: /get a quote|order now|pricing|packages?|from \$|buy|our services|book a call|get started/i, guide: /how to|step\s?\d|what is|guide/i, emailTemplate: /email template|subject line|template/i, tool: /software|platform|tool/i, spam: /spam|nofollow|sponsored|paid links?/i, personalize: /personali[sz]/i, followup: /follow[- ]?up/i, metrics: /domain authority|DR\b|domain rating|traffic/i, guest: /guest post/i, linkInsert: /niche edit|link insertion/i },
  'keyword-grouping': { semantic: /semantic/i, serp: /serp/i, intent: /intent/i, tool: /tool|software/i, free: /free/i, python: /python/i, excel: /excel|spreadsheet|google sheets/i, cluster: /cluster/i, steps: /step\s?\d|how to/i, sells: /get a quote|book a demo|pricing|sign up|free trial|get started/i, topicalMap: /topical map|topic cluster|pillar/i, volume: /search volume/i, ai: /\bAI\b|machine learning|nlp/i }
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
  for (const [k, us] of Object.entries(sets)) { const out = []; for (const u of us) out.push(await one(u, SIG[k])); fs.writeFileSync(path.join(kr, 'serp-' + k + '-2026-10-29.json'), JSON.stringify(out, null, 1)); console.log(k, out.filter(o => o.status === 200).length + '/' + out.length, 'readable'); }
  const g = {}; for (const [k, u] of Object.entries(GOOGLE)) { try { const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(25000) }); const x = strip(await r.text()); g[k] = { url: u, status: r.status, len: x.length, text: x.slice(0, 12000) }; } catch (e) { g[k] = { url: u, error: String(e.message || e) }; } }
  fs.writeFileSync(path.join(kr, 'google-docs-day14-2026-10-29.json'), JSON.stringify(g, null, 1)); console.log('google docs', Object.entries(g).map(([k, v]) => k + ':' + (v.status || v.error)).join(' '));
})();
