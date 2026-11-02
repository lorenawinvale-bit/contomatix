// One-off: read organic pages (Google US, 2 Nov 2026) for Day-16 keywords (google penalty, meta keywords, backlink strategy) + fresh Google docs. Sites are not named in the posts.
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-US,en;q=0.9' };
const sets = {
  'google-penalty': ['https://www.seo.com/basics/how-search-engines-work/google-penalties/', 'https://www.reddit.com/r/SEO/comments/1lcvlit/community_info_what_a_real_google_penalty_looks/', 'https://www.financialmarkets.media/blog/google-penalties/', 'https://rankmath.com/seo-glossary/google-penalty/', 'https://netpeak.us/blog/google-penalties-how-to-identify-avoid-and-recover-from-them-for-seo-success/', 'https://www.semrush.com/kb/624-what-is-a-google-penalty', 'https://seooptimizers.com/blog/what-is-a-google-seo-penalty/'],
  'meta-keywords': ['https://www.semrush.com/blog/meta-keywords/', 'https://www.wordstream.com/meta-keyword', 'https://developers.google.com/search/docs/crawling-indexing/special-tags', 'https://www.seobility.net/en/wiki/Meta_Keywords', 'https://www.reddit.com/r/SEO/comments/rpc66f/do_people_still_use_meta_keywords/', 'https://support.bigcommerce.com/s/question/0D51B000048Nn4ASAS/meta-keywords-and-search-keywords-use-or-not', 'https://ahrefs.com/blog/meta-keywords/', 'https://www.mailpro.com/definition/meta-keywords'],
  'backlink-strategy': ['https://www.semrush.com/blog/how-to-get-backlinks/', 'https://www.copy.ai/blog/backlink-strategy', 'https://alphametic.com/backlink-services', 'https://www.whatconverts.com/blog/guest-post-backlink-building/', 'https://www.reddit.com/r/content_marketing/comments/fiabmc/backlinking_strategy_where_to_even_begin/', 'https://www.dp1design.com/services/backlink-strategy/', 'https://www.paulbarrs.com/seo/design-backlink-strategy', 'https://welcometobora.com/glossary/backlink-strategy/', 'https://eucalyptmedia.com/blog/entry/build-a-better-backlink-strategy-6-ways-to-improve-your-seo-rankings-through-content-and-pr']
};
const GOOGLE = {
  manual: 'https://support.google.com/webmasters/answer/9044175?hl=en',
  reconsider: 'https://support.google.com/webmasters/answer/35843?hl=en',
  specialTags: 'https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=en',
  spam: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=en',
  links: 'https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links?hl=en'
};
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const SIG = {
  'google-penalty': { manual: /manual action/i, algo: /algorithm(ic)? (update|penalt|demotion)|core update/i, recovery: /recover(y|ing)?|remove a penalty|get (rid|out)/i, reconsider: /reconsideration|request a review/i, gsc: /search console/i, panda: /panda|penguin/i, links: /unnatural links?|link spam|toxic links?/i, thin: /thin content|duplicate content|keyword stuffing/i, disavow: /disavow/i, noPenalty: /not (technically )?a penalty|isn.t a penalty|no such thing|officially/i, checker: /checker|tool|software/i, google: /google (says|said|confirmed|documentation)|search central|mueller/i, sells: /get a quote|book a (call|demo)|free trial|sign up|our services|hire us|contact us|request a/i, steps: /step\s?\d|how to (check|recover|fix|identify)/i, example: /example|case study/i },
  'meta-keywords': { ignores: /ignore[sd]?|does not use|doesn.t use|don.t use|no longer (use|support)|not (a )?(ranking|used)|stopped using/i, bing: /\bbing\b/i, yandex: /yandex/i, spam: /spam|stuffing|abuse/i, wordpress: /wordpress|yoast|rank ?math|plugin/i, limit: /how many|limit|maximum|character/i, history: /2009|matt cutts|in the past|used to|history/i, desc: /meta description/i, title: /title tag|title element/i, example: /<meta|example/i, best: /best practice/i, competitors: /competitors?/i, google: /google (says|said|confirmed|documentation)|search central|mueller/i, sells: /get a quote|book a (call|demo)|free trial|sign up|our services|request a/i, tool: /tool|generator|checker/i },
  'backlink-strategy': { steps: /step\s?\d|how to (build|create|develop|plan)/i, guest: /guest post/i, digitalPr: /digital pr|press|journalist|haro|reporters?/i, broken: /broken link/i, content: /linkable|link ?bait|content assets?|original (research|data)|infographic/i, competitor: /competitor/i, anchor: /anchor text/i, nofollow: /nofollow|sponsored|ugc/i, spam: /spam|penalt|manipulat/i, template: /template/i, tools: /ahrefs|semrush|moz|majestic|tool/i, metrics: /domain (authority|rating)|\bDR\b|\bDA\b/i, quality: /quality over quantity|relevan/i, google: /google (says|said|confirmed|documentation)|search central|mueller/i, sells: /get a quote|book a (call|demo)|free trial|sign up|our services|hire|request a|pricing|packages?/i, example: /example|case study/i, goals: /goals?|objectives?|kpi/i }
};
async function one(u, sig) {
  const o = { url: u }; try {
    const r = await fetch(u, { redirect: 'follow', headers: UA, signal: AbortSignal.timeout(25000) }); o.status = r.status; const raw = await r.text(); const x = strip(raw); o.words = x.split(' ').length;
    for (const [k, re] of Object.entries(sig)) o[k] = re.test(x);
    const mk = raw.match(/<meta[^>]+name=["']keywords["'][^>]*>/i); o.metaKeywordsTag = !!mk; o.metaKeywordsCount = mk ? ((mk[0].match(/content=["']([^"']*)["']/i) || [])[1] || '').split(',').filter(s => s.trim()).length : 0;
    const host = new URL(u).hostname.replace(/^www\./, ''); o.pct = (x.match(/\d+(\.\d+)?\s?%/g) || []).length;
    const yrs = x.match(/\b(20[12]\d)\b/g) || []; o.years = [...new Set(yrs)].sort(); o.maxYear = o.years.length ? o.years[o.years.length - 1] : null;
    o.googleDoc = /developers\.google\.com|support\.google\.com/i.test(raw); o.date = (x.match(/(updated|published|last modified)[^.]{0,40}20\d\d/i) || [''])[0];
    o.extLinks = [...raw.matchAll(/<a\b[^>]*href=["'](https?:\/\/[^"']+)["']/gi)].map(m => { try { return new URL(m[1]).hostname.replace(/^www\./, ''); } catch (e) { return null; } }).filter(h => h && h !== host).length;
  } catch (e) { o.error = String(e.message || e).slice(0, 60); } return o;
}
(async () => {
  const kr = path.join(__dirname, '..', '..', 'keyword-research');
  for (const [k, us] of Object.entries(sets)) { const out = []; for (const u of us) out.push(await one(u, SIG[k])); fs.writeFileSync(path.join(kr, 'serp-' + k + '-2026-11-02.json'), JSON.stringify(out, null, 1)); console.log(k, out.filter(o => o.status === 200).length + '/' + out.length, 'readable', out.map(o => o.status + ':' + o.words).join(' ')); }
  const g = {}; for (const [k, u] of Object.entries(GOOGLE)) { try { const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(25000) }); const x = strip(await r.text()); g[k] = { url: u, status: r.status, len: x.length, text: x.slice(0, 16000) }; } catch (e) { g[k] = { url: u, error: String(e.message || e) }; } }
  fs.writeFileSync(path.join(kr, 'google-docs-day16-2026-11-02.json'), JSON.stringify(g, null, 1)); console.log('google docs', Object.entries(g).map(([k, v]) => k + ':' + (v.status || v.error) + ':' + (v.len || '')).join(' '));
})();
