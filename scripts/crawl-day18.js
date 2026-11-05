// One-off: Day-18 data (5 Nov 2026). Ranking-page signals for canonical url / short tail vs long tail keywords / keyword proximity / meta description checker,
// canonical-tag scan of the pages in our saved SERP files, Google canonicalization docs, our own query-length split (GSC 28 Oct export), keyword-proximity scan.
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-US,en;q=0.9' };
const kr = path.join(__dirname, '..', '..', 'keyword-research');
const sets = {
  'canonical-url': ['https://developers.google.com/search/docs/crawling-indexing/canonicalization', 'https://ahrefs.com/seo/glossary/canonical-url', 'https://www.semrush.com/blog/canonical-url-guide/', 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', 'https://en.wikipedia.org/wiki/Canonical_link_element', 'https://www.zaginteractive.com/insights/articles/january-2023/what-is-a-canonical-url-why-is-it-important'],
  'short-tail-vs-long-tail-keywords': ['https://ahrefs.com/blog/long-tail-vs-short-tail-keywords/', 'https://www.lcn.com/blog/short-tail-vs-long-tail-keywords/', 'https://linkpanda.com/short-tail-vs-long-tail-keywords/', 'https://www.geeksforgeeks.org/techtips/short-tail-vs-long-tail-keywords/', 'https://www.okoone.com/spark/marketing-growth/long-tail-vs-short-tail-keywords-which-one-is-better-for-conversions/', 'https://www.seoptimer.com/blog/long-tail-vs-short-tail-keywords/', 'https://seopressor.com/blog/short-tail-or-long-tail-keywords/'],
  'keyword-proximity': ['https://www.simpletiger.com/resources/glossary/keyword-proximity', 'https://sitechecker.pro/what-is-keyword-proximity/', 'https://www.seo.com/blog/keyword-density-prominence-and-proximity/', 'https://www.conductor.com/academy/glossary/keyword-proximity/', 'https://mohitsseotraining.com/blog/seo/keyword-proximity-in-seo/', 'https://www.clickrank.ai/seo-glossary/k/what-is-keyword-proximity/', 'https://stratigia.com/glossary/keyword-proximity/'],
  'meta-description-checker': ['https://www.seoptimer.com/meta-description-checker', 'https://mrs.digital/tools/meta-length-checker/', 'https://seranking.com/free-tools/title-description-checker.html', 'https://rankmath.com/tools/meta-tag-analyzer/', 'https://seositecheckup.com/tools/meta-description-test', 'https://www.webyurt.com/tools/meta-title-counter', 'https://searchvector.io/tools/title-meta-checker', 'https://tinyseo.com/tools/meta-title-meta-description/', 'https://www.airanklab.com/tools/meta-title-description-checker']
};
const SIG = {
  'canonical-url': { absolute: /absolute/i, relative: /relative/i, selfRef: /self-referenc|self referenc/i, hint: /\bhint\b|not a directive|may ignore|might ignore|can ignore/i, sitemap: /sitemap/i, redirect: /301|redirect/i, header: /http header|link header/i, hreflang: /hreflang/i, pagination: /paginat/i, params: /parameter|utm|query string/i, crossDomain: /cross-domain|syndicat/i, example: /example/i, plugin: /yoast|rank math|wordpress/i, trailing: /trailing slash/i, duplicate: /duplicate/i },
  'short-tail-vs-long-tail-keywords': { definition: /what (are|is) (short|long)/i, volume: /search volume/i, intent: /intent/i, conversion: /convert|conversion/i, example: /example/i, competition: /competition|difficult/i, local: /\blocal\b/i, ecommerce: /ecommerce|e-commerce|product page/i, ai: /\bai\b|llm|chatgpt/i, tool: /generator|tool/i, percent: /\d+(\.\d+)?\s?%/, middle: /chunky middle|mid-tail|middle tail|body keyword/i, head: /head (term|keyword)|head keyword/i, wordsRule: /(\d)\s*(or more|\+)?\s*words|three or more words|4\+ words/i },
  'keyword-proximity': { definition: /what is keyword proximity|proximity (is|refers)/i, rankingFactor: /ranking factor/i, google: /\bgoogle\b/i, density: /density/i, prominence: /prominence/i, exactMatch: /exact match|exact phrase/i, stuffing: /stuffing/i, natural: /natural/i, example: /example/i, tool: /tool|checker/i, myth: /myth|no evidence|not confirmed|no longer|outdated/i, bing: /\bbing\b/i, semantic: /semantic|nlp|bert|synonym/i },
  'meta-description-checker': { chars: /character/i, pixel: /pixel/i, preview: /preview|snippet/i, title: /title/i, mobile: /mobile/i, bulk: /bulk|multiple pages|whole site|entire site/i, free: /\bfree\b/i, signup: /sign up|sign-up|create an account|log in|login/i, url: /enter (a |your )?url|page url|website url/i, ai: /\bai\b|generate/i, keyword: /keyword/i }
};
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const dec = s => s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;|&#34;/g, '"');
async function one(u, sig) {
  const o = { url: u }; try {
    const r = await fetch(u, { redirect: 'follow', headers: UA, signal: AbortSignal.timeout(25000) }); o.status = r.status; const raw = await r.text(); const x = strip(raw);
    o.words = x.split(' ').length; const t = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i); o.title = t ? dec(t[1].replace(/\s+/g, ' ').trim()) : '';
    const h1 = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i); o.h1 = h1 ? strip(h1[1]) : ''; o.text = x.slice(0, 60000);
    for (const [k, re] of Object.entries(sig)) o[k] = re.test(x);
    o.date = (x.match(/(updated|published|last modified)[^.]{0,40}20\d\d/i) || [''])[0];
  } catch (e) { o.error = String(e.message || e).slice(0, 60); } return o;
}
const pool = async (items, n, fn) => { const out = new Array(items.length); let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } })); return out; };
(async () => {
  const proxData = {};
  for (const [k, us] of Object.entries(sets)) {
    const out = await pool(us, 4, u => one(u, SIG[k])); proxData[k] = out.map(o => ({ url: o.url, status: o.status, title: o.title, h1: o.h1, text: o.text }));
    out.forEach(o => delete o.text); fs.writeFileSync(path.join(kr, 'serp-' + k + '-2026-11-05.json'), JSON.stringify(out, null, 1));
    const ok = out.filter(o => o.status === 200 && o.words > 400); console.log(k, 'readable', ok.length, JSON.stringify(Object.fromEntries(Object.keys(SIG[k]).map(n => [n, ok.filter(o => o[n]).length]))), 'words', ok.map(o => o.words).join(','));
  }
  // Google docs on canonicalization
  const GD = { canon: 'https://developers.google.com/search/docs/crawling-indexing/canonicalization?hl=en', consolidate: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls?hl=en' };
  const g = {}; for (const [k, u] of Object.entries(GD)) { try { const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(25000) }); const x = strip(await r.text()); g[k] = { url: u, status: r.status, text: x, updated: (x.match(/Last updated[^.]{0,30}/i) || [''])[0] }; } catch (e) { g[k] = { error: String(e.message) }; } }
  fs.writeFileSync(path.join(kr, 'google-docs-day18-2026-11-05.json'), JSON.stringify(g, null, 1)); console.log('google docs', Object.entries(g).map(([k, v]) => k + ':' + (v.status || v.error) + ':' + (v.updated || '')).join(' '));
  // canonical scan across all saved SERP files
  const files = fs.readdirSync(kr).filter(f => /^serp-.*\.json$/.test(f) && !/split|2026-11-05/.test(f)); const urls = new Set();
  for (const f of files) { try { const j = JSON.parse(fs.readFileSync(path.join(kr, f))); const arr = Array.isArray(j) ? j : Object.values(j).flat(); for (const o of arr) if (o && o.url && /^https?:/.test(o.url)) urls.add(o.url); } catch (e) {} }
  for (const k of Object.values(sets)) k.forEach(u => urls.add(u));
  const list = [...urls]; console.log('canonical scan urls', list.length);
  const rows = await pool(list, 8, async u => { try { const r = await fetch(u, { redirect: 'follow', headers: UA, signal: AbortSignal.timeout(20000) }); if (r.status !== 200) return { u, status: r.status }; const raw = (await r.text()).slice(0, 400000);
    const tags = [...raw.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]).filter(t => /rel=["']?canonical["']?/i.test(t)); const hrefs = tags.map(t => (t.match(/href=["']([^"']*)["']/i) || [])[1]).filter(h => h != null);
    const hdr = /rel=["']?canonical/i.test(r.headers.get('link') || ''); const final = r.url;
    const norm = s => { try { const x = new URL(s, final); return x.hostname.replace(/^www\./, '') + x.pathname.replace(/\/$/, '') + x.search; } catch (e) { return s; } };
    return { u, status: 200, tags: tags.length, href: hrefs[0] || '', absolute: hrefs.length ? /^https?:\/\//i.test(hrefs[0]) : null, relative: hrefs.length ? !/^https?:\/\//i.test(hrefs[0]) : null, self: hrefs.length ? norm(hrefs[0]) === norm(final) : null, header: hdr, noindex: /<meta[^>]+robots[^>]*noindex/i.test(raw) }; } catch (e) { return { u, err: 1 }; } });
  const rd = rows.filter(r => r.status === 200); const withTag = rd.filter(r => r.tags > 0);
  const cs = { urls: list.length, readable: rd.length, withTag: withTag.length, noTag: rd.length - withTag.length, absolute: withTag.filter(r => r.absolute).length, relative: withTag.filter(r => r.relative).length, selfRef: withTag.filter(r => r.self).length, differs: withTag.filter(r => r.self === false).length, multiple: withTag.filter(r => r.tags > 1).length, headerCanon: rd.filter(r => r.header).length, relExamples: withTag.filter(r => r.relative).slice(0, 8).map(r => r.u + ' -> ' + r.href) };
  fs.writeFileSync(path.join(kr, 'canonical-scan-2026-11-05.json'), JSON.stringify({ summary: cs, rows }, null, 1)); console.log('canonical scan', JSON.stringify(cs));
  // own query length split
  const q = fs.readFileSync(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-28', 'Queries.csv'), 'utf8').split(/\r?\n/).slice(1).filter(Boolean).map(l => { const m = l.match(/^(.*),(\d+),(\d+),([\d.]+)%,([\d.]+)$/); return m ? { q: m[1].replace(/^"|"$/g, ''), c: +m[2], i: +m[3], p: +m[5] } : null; }).filter(Boolean);
  const g2 = n => n <= 2 ? '1-2 words' : n === 3 ? '3 words' : n === 4 ? '4 words' : '5+ words'; const grp = {};
  for (const r of q) { const n = r.q.trim().split(/\s+/).length; const k = g2(n); const o = grp[k] = grp[k] || { queries: 0, imp: 0, clicks: 0, posSum: 0 }; o.queries++; o.imp += r.i; o.clicks += r.c; o.posSum += r.p * r.i; }
  const ql = { total: q.length, totalImp: q.reduce((a, r) => a + r.i, 0), totalClicks: q.reduce((a, r) => a + r.c, 0), groups: Object.fromEntries(Object.entries(grp).map(([k, o]) => [k, { queries: o.queries, imp: o.imp, clicks: o.clicks, avgPos: +(o.posSum / o.imp).toFixed(1) }])), avgWords: +(q.reduce((a, r) => a + r.q.trim().split(/\s+/).length, 0) / q.length).toFixed(2) };
  fs.writeFileSync(path.join(kr, 'own-query-length-2026-11-05.json'), JSON.stringify(ql, null, 1)); console.log('query length', JSON.stringify(ql));
  // proximity scan across the ranking pages of six queries
  const prox = [['canonical url', proxData['canonical-url']], ['short tail vs long tail keywords', proxData['short-tail-vs-long-tail-keywords']], ['keyword proximity', proxData['keyword-proximity']], ['meta description checker', proxData['meta-description-checker']]];
  for (const [qq, f] of [['meta description length', 'serp-meta-description-length-2026-11-03.json'], ['content gap analysis', 'serp-content-gap-analysis-2026-11-03.json']]) { const R = JSON.parse(fs.readFileSync(path.join(kr, f))).filter(o => o.status === 200); const pages = await pool(R, 4, async o => { try { const r = await fetch(o.url, { headers: UA, signal: AbortSignal.timeout(25000) }); const raw = await r.text(); const t = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i); const h1 = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i); return { url: o.url, status: r.status, title: t ? dec(t[1]) : '', h1: h1 ? strip(h1[1]) : '', text: strip(raw).slice(0, 60000) }; } catch (e) { return { url: o.url, status: 0 }; } }); prox.push([qq, pages]); }
  const words = s => String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  const res = []; for (const [qq, pages] of prox) for (const p of pages.filter(p => p.status === 200 && p.text)) {
    const qw = words(qq), tw = words(p.text); const phrase = qw.join(' '); const body = tw.join(' '); const exactBody = body.includes(phrase); const inTitle = words(p.title).join(' ').includes(phrase); const inH1 = words(p.h1).join(' ').includes(phrase); const first100 = tw.slice(0, 100).join(' ').includes(phrase);
    // smallest window containing all query words
    const pos = qw.map(w => tw.reduce((a, x, i) => (x === w ? (a.push(i), a) : a), [])); let span = null; if (pos.every(a => a.length)) { span = Infinity; const all = pos.flatMap((a, k) => a.map(i => [i, k])).sort((a, b) => a[0] - b[0]); const cnt = new Array(qw.length).fill(0); let have = 0, l = 0; for (let r = 0; r < all.length; r++) { if (cnt[all[r][1]]++ === 0) have++; while (have === qw.length) { span = Math.min(span, all[r][0] - all[l][0] + 1); if (--cnt[all[l][1]] === 0) have--; l++; } } }
    res.push({ q: qq, url: p.url, exactBody, inTitle, inH1, first100, span, extra: span == null ? null : span - qw.length });
  }
  const ps = { pages: res.length, queries: prox.length, exactBody: res.filter(r => r.exactBody).length, inTitle: res.filter(r => r.inTitle).length, inH1: res.filter(r => r.inH1).length, first100: res.filter(r => r.first100).length, allWordsPresent: res.filter(r => r.span != null).length, noExactButWords: res.filter(r => !r.exactBody && r.span != null).length, medianExtra: (() => { const e = res.filter(r => r.extra != null).map(r => r.extra).sort((a, b) => a - b); return e.length ? e[Math.floor(e.length / 2)] : null; })() };
  fs.writeFileSync(path.join(kr, 'proximity-scan-2026-11-05.json'), JSON.stringify({ summary: ps, rows: res }, null, 1)); console.log('proximity', JSON.stringify(ps));
})();
