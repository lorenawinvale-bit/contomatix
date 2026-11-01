// node scripts/build-post-301-vs-302-redirect.js [--write] — data: 6 readable ranking pages (Google US, 1 Nov 2026), Google's "Redirects and Google Search" and site move pages read the same day, our own redirect scan of 185 SEO-related sites (27 Oct 2026, see scripts/scan-redirect-chains.js) and a test of our own redirects (1 Nov 2026). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-301-vs-302-2026-11-01.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-day15-2026-11-01.json');
for (const [k, s] of [['redirects', 'Permanent redirects : Show the new redirect target in search results.'], ['redirects', 'Temporary redirects : Show the source page in search results.'], ['redirects', 'Use permanent redirects when you\'re sure that the redirect won\'t be reverted.'], ['redirects', 'HTTP 301 (moved permanently)'], ['redirects', 'HTTP 308 (moved permanently)'], ['redirects', 'HTTP 302 (found)'], ['redirects', 'HTTP 307 (temporary redirect)'], ['redirects', 'The 301 and 308 status codes mean that a page has permanently moved to a new location.'], ['redirects', 'The target page might still be indexed if other canonicalization signals are present.'], ['redirects', 'send users to a page that explains what\'s happening'], ['siteMove', 'permanent redirects don\'t cause a loss in PageRank']]) if (!G[k].text.includes(s)) throw new Error('Google text changed: ' + s);
// our own scan of 185 sites (27 Oct 2026) and our own site test (1 Nov 2026)
const A = require('../../keyword-research/redirect-chains-2026-10-27.json');
const hops = r => (r.hops || []).filter(x => x.s >= 300 && x.s < 400);
const first = {}, all = {}; let redirecting = 0;
for (const r of A) { const h = hops(r); if (!h.length) continue; redirecting++; first[h[0].s] = (first[h[0].s] || 0) + 1; h.forEach(x => all[x.s] = (all[x.s] || 0) + 1); }
const temp = A.filter(r => hops(r).some(x => x.s === 302 || x.s === 307)); const tempFirst = A.filter(r => hops(r).length && (hops(r)[0].s === 302 || hops(r)[0].s === 307));
const expA = { sites: 185, redirecting: 178, f301: 160, f308: 16, f302: 2, h301: 211, h308: 21, h302: 4, h307: 2, temp: 6, tempFirst: 2 };
const gotA = { sites: A.length, redirecting, f301: first[301], f308: first[308], f302: first[302], h301: all[301], h308: all[308], h302: all[302], h307: all[307], temp: temp.length, tempFirst: tempFirst.length };
for (const k of Object.keys(expA)) if (expA[k] !== gotA[k]) throw new Error('scan data changed ' + k + ' ' + gotA[k]);
const OWN = require('../../keyword-research/own-redirects-2026-11-01.json'); const ownCodes = [...new Set(OWN.flatMap(o => o.hops.map(h => h.s)))].sort().join();
if (ownCodes !== '200,301' || OWN[1].hops.map(h => h.s).join('>') !== '301>301>200') throw new Error('own redirects changed');
const D = { listed: 7, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), permanent: c('permanent'), temporary: c('temporary'), s307: c('s307'), s308: c('s308'), equity: c('equity'), google: c('google'), indexing: c('indexing'), htaccess: c('htaccess'), tools: c('tools'), migration: c('migration'), whenUse: c('whenUse'), myth: c('myth'), cache: c('cache'), sells: c('sells'), example: c('example'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 7, ok: 6, median: 1046, permanent: 6, temporary: 6, s307: 2, s308: 2, equity: 5, google: 3, indexing: 2, htaccess: 1, tools: 2, migration: 4, whenUse: 6, myth: 2, cache: 5, sells: 4, example: 4, gdoc: 3, dated: 2 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(gotA));
const pc = n => Math.round(n / redirecting * 100);
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
build({
  slug: '301-vs-302-redirect', category: 'Technical SEO', author: 'Umaira Liaquat', date: '2026-11-01',
  title: '301 vs 302 Redirect: What Google Says and What 185 Sites Use',
  excerpt: `301 vs 302 redirect explained with Google's own page and a scan of 185 sites: ${first[301]} use 301, ${first[308]} use 308 and ${first[302]} use 302. When to use each.`,
  donut: [['301 VS 302', 'REDIRECT'], [['Permanent', 'or Temporary'], 'What Google Shows', ['What Sites', 'Really Use'], 'Pick the Code', ['Check Your', 'Own Site']]],
  cover: { badge: 'OUR OWN SCAN', search: '301 vs 302 redirect', card: `Sites scanned: ${A.length}`, lines: [`Redirect with 301: ${first[301]}`, `Redirect with 308: ${first[308]}`, `Redirect with 302: ${first[302]}`, `No redirect at all: ${A.length - redirecting}`], last: 'First redirect code, http to https', big: `${pc(first[301])}%`, k1: 'of redirecting sites use a 301', k2: `only ${first[302]} use a 302`, title: '301 vs 302 Redirect', sub: 'What Google says, what sites use' },
  info: { title: `301 vs 302: ${D.ok} Guides Read`, sub: 'Organic results for "301 vs 302 redirect", Google US, 1 November 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Permanent and temporary', sub: 'explained', n: D.permanent }, { label: 'Link equity or PageRank', sub: 'discussed', n: D.equity }, { label: 'Quote Google', sub: 'on the page', n: D.google }, { label: '307 or 308', sub: 'named', n: D.s307 }, { label: 'Server config examples', sub: 'shown', n: D.htaccess }],
    rightTitle: 'What Google says', rightTag: 'Redirects and Google Search', items: [{ t: '301 and 308', s: 'permanent: show the new URL' }, { t: '302, 303 and 307', s: 'temporary: show the old URL' }, { t: 'Be sure first', s: 'use permanent only if not reverted' }],
    big: `${pc(first[301])}%`, noteHtml: `of the ${redirecting} sites that redirect use a <em>301</em> for their first hop.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for 301 vs 302 cover`, sub: `Organic results read on 1 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Permanent redirects', `${D.permanent} of ${D.ok}`], ['Temporary redirects', `${D.temporary} of ${D.ok}`], ['When to use each', `${D.whenUse} of ${D.ok}`], ['Link equity or PageRank', `${D.equity} of ${D.ok}`], ['Caching', `${D.cache} of ${D.ok}`], ['Site migrations or https', `${D.migration} of ${D.ok}`], ['Examples', `${D.example} of ${D.ok}`], ['Sell a service or tool', `${D.sells} of ${D.ok}`], ['Quote Google', `${D.google} of ${D.ok}`], ['307 status', `${D.s307} of ${D.ok}`], ['308 status', `${D.s308} of ${D.ok}`], ['Redirect testing tools', `${D.tools} of ${D.ok}`], ['Server config examples', `${D.htaccess} of ${D.ok}`], ['Link Google documentation', `${D.gdoc} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`]] },
    google: { title: 'How Google treats each redirect code', sub: "From Google's Redirects and Google Search page, read on 1 November 2026.", head: ['Code', 'Type', 'What Google does'], lastBold: false,
      rows: [['301', 'Permanent', 'Shows the new target in search results'], ['308', 'Permanent', 'Shows the new target in search results'], ['302', 'Temporary', 'Shows the source page in search results'], ['307', 'Temporary', 'Shows the source page in search results']] },
    ours: { title: 'First redirect code on 178 sites, http to https', sub: `Our scan of ${A.length} SEO-related sites on 27 October 2026. ${A.length - redirecting} did not redirect at all.`, head: ['Code', 'Sites', 'Share'], lastBold: false,
      rows: [['301', String(first[301]), pc(first[301]) + '%'], ['308', String(first[308]), pc(first[308]) + '%'], ['302', String(first[302]), pc(first[302]) + '%']] }
  },
  content: h => `${h.updated}

<p><strong>The difference between a 301 and a 302 redirect</strong> is how long the move is meant to last. A 301 says a page has moved permanently, and a 302 says it has moved temporarily. Google's page on redirects says permanent redirects show the new target in search results and temporary redirects show the source page. We read ${D.ok} pages that rank for "301 vs 302 redirect" on 1 November 2026: all ${D.ok} explain permanent and temporary, ${D.equity} discuss link equity or PageRank and only ${D.google} quote Google. Then we looked at what 185 real sites do.</p>

<p>This guide covers the codes, what Google says in its own words, our scan of ${A.length} sites, when to use each one, simple examples and how to check yours. If a redirect is not behaving, see our guide to <a href="/blog/301-redirect-not-working">301 redirects not working</a>, and for a full move see our <a href="/blog/seo-site-migration">SEO site migration guide</a>.</p>

<h2>301 vs 302 Redirect: The Short Answer</h2>
<p>Use a <strong>301</strong> (or its newer twin <strong>308</strong>) when the old URL is gone for good, such as after a site move, a rename or a switch from http to https. Use a <strong>302</strong> (or <strong>307</strong>) when the old URL will come back, such as a temporary offer page or a short maintenance notice. Google's own wording is that you should use permanent redirects when you are sure the redirect will not be reverted. If you are not sure, a temporary redirect keeps the original URL in search results.</p>

<h2>301 vs 302 vs 307 vs 308: What Each Code Means</h2>
${h.fig('google', 'Cards of how Google treats redirect codes: 301 and 308 are permanent and show the new target in search results, 302 and 307 are temporary and show the source page')}
<table><thead><tr><th>Code</th><th>Name</th><th>Meaning</th></tr></thead><tbody>
<tr><td>301</td><td>Moved permanently</td><td>Permanent. Show the new URL.</td></tr>
<tr><td>308</td><td>Moved permanently</td><td>Permanent, the newer equivalent of 301.</td></tr>
<tr><td>302</td><td>Found</td><td>Temporary. Keep the old URL.</td></tr>
<tr><td>303</td><td>See other</td><td>Temporary, usually after a form submission.</td></tr>
<tr><td>307</td><td>Temporary redirect</td><td>Temporary, the newer equivalent of 302.</td></tr>
</tbody></table>
<p>Only ${D.s307} of ${D.ok} ranking guides name 307 and ${D.s308} name 308, so "301 vs 302" misses half the picture. Google's table lists 301 and 308 as permanent and 302, 303 and 307 as temporary, and notes that visitors usually cannot tell the difference. The difference is for search engines, and for browsers that cache permanent redirects: ${D.cache} of ${D.ok} guides mention caching.</p>

<h2>What Google Says About Permanent and Temporary Redirects</h2>
<p>On its page <a href="https://developers.google.com/search/docs/crawling-indexing/301-redirects" target="_blank" rel="nofollow noopener">Redirects and Google Search</a>, Google explains that the choice depends on how long you expect the redirect to stay and which page you want Google Search to show. For <strong>permanent redirects</strong>, Googlebot follows the redirect and the indexing pipeline uses it as a signal that the target should be canonical. For <strong>temporary redirects</strong>, Googlebot follows the redirect but the indexing pipeline does not use it as a signal that the target should be canonical, although the target might still be indexed if other canonicalization signals are present.</p>
<p>Google adds a practical example: if a service is temporarily unavailable, set up a temporary redirect to send users to a page that explains what is happening, without changing the original URL in search results. And its site move guidance states that 301 and other permanent redirects do not cause a loss in PageRank. That settles a common worry about 301s. It does not say anything about whether a 302 passes ranking signals, so treat claims about that with caution. ${D.equity} of ${D.ok} ranking guides discuss link equity, but only ${D.google} quote Google.</p>

<h2>What ${D.ok} Ranking Guides Say About 301 vs 302</h2>
${h.fig('serp', 'Table of what 6 pages on 301 vs 302 cover: permanent and temporary redirects and when to use each in all 6, link equity in 5, caching in 5, and only 3 quoting Google')}
<p>The median guide has about ${h.f(D.median)} words and ${D.dated} of ${D.ok} show a date. ${D.sells} of ${D.ok} also sell a service or a tool. ${D.migration} of ${D.ok} mention site migrations or https, which matches the most common real-world use, and ${D.myth} use words such as myth, misconception or "no longer". ${D.htaccess} show server configuration, which is why we include examples below.</p>

<h2>What 185 Sites Actually Use: Our Redirect Scan</h2>
${h.fig('ours', 'Rings showing the first redirect code on 178 SEO-related sites that redirect http to https: 160 use a 301, 16 use a 308 and 2 use a 302')}
<p>On 27 October 2026 we checked how ${A.length} SEO-related sites redirect from http to https. ${A.length - redirecting} did not redirect at all. Of the ${redirecting} that did, the first redirect was a <strong>301</strong> on ${first[301]} (${pc(first[301])}%), a <strong>308</strong> on ${first[308]} (${pc(first[308])}%) and a <strong>302</strong> on ${first[302]}. Counting every redirect in every chain, there were ${all[301]} 301s, ${all[308]} 308s, ${all[302]} 302s and ${all[307]} 307s.</p>
<p>${temp.length} sites used a temporary redirect (302 or 307) somewhere. Two of them used one as the very first hop from http to https, which is unusual for a move that is meant to be permanent. In the other four, a temporary redirect came after a permanent one, which can be intentional, for example to send visitors to a language or region version. We do not name the sites. The pattern is the useful part: almost everyone uses a permanent redirect for http to https, and the exceptions are worth checking for mistakes. Run the same check on your own site before you assume it is set up correctly.</p>

${h.info('Infographic of what 6 guides on 301 vs 302 cover and what 185 sites use: permanent and temporary redirects in all 6, link equity in 5, 3 quoting Google, and 160 sites using a 301, 16 a 308 and 2 a 302 as their first redirect')}

<h2>When to Use a 301 and When to Use a 302</h2>
<ul>
<li><strong>Use a 301 or 308</strong> for a domain change, a moved or renamed page, a merge of two pages, a switch to https and a choice between www and non-www.</li>
<li><strong>Use a 302 or 307</strong> for a short promotion, a maintenance page, a test of a new page, or sending a visitor to a login or a region page.</li>
<li><strong>Use neither</strong> for a deleted page with no replacement. Return a 404 or 410 instead.</li>
<li><strong>Do not leave a 302 in place for years.</strong> If the move turns out to be permanent, change it to a 301 or 308.</li>
</ul>

<h2>301 vs 302 Redirect Example: How to Set Them Up</h2>
<p>The code depends on your server. On Apache, in the .htaccess file:</p>
<pre>Redirect 301 /old-page https://example.com/new-page
Redirect 302 /offer https://example.com/summer-offer</pre>
<p>On nginx, in the server block:</p>
<pre>return 301 https://example.com$request_uri;</pre>
<p>In PHP, Google's page shows the same idea with headers: a permanent redirect sends 'HTTP/1.1 301 Moved Permanently' and a Location header, and a temporary one sends 'HTTP/1.1 302 Found'. If you use a platform such as WordPress or Shopify, use its redirect settings, because the platform may already have a built-in solution, as Google notes.</p>

<h2>Our Own Redirects: A Test on 1 November 2026</h2>
<p>We tested our own site the same way. http://contomatix.com/ redirects once with a 301 to https. https://www.contomatix.com/ also redirects once with a 301. A trailing-slash URL such as /blog/ redirects with a 301 to /blog. The one weak spot is http://www.contomatix.com/, which takes two 301 hops to reach the final address. Every redirect on our site is permanent, but the two-hop path is exactly the kind of chain our guide to <a href="/blog/301-redirect-not-working">301 redirects not working</a> warns about, and fixing it is on our list.</p>

<h2>How to Check Which Redirect You Have</h2>
<ol>
<li><strong>Use a header checker or curl.</strong> The command curl -I followed by a URL shows the status code and the Location header.</li>
<li><strong>Use your browser's developer tools.</strong> Open the Network tab and reload the page.</li>
<li><strong>Test a list.</strong> Our free <a href="/tools/redirect-mapper">redirect mapper</a> helps you plan a set of old-to-new redirects before you set them up.</li>
<li><strong>Check Search Console.</strong> The URL Inspection tool shows which URL Google considers canonical.</li>
</ol>

<h2>302 vs 301 Redirect for SEO: Common Mistakes</h2>
<ul>
<li><strong>A 302 used for a permanent move.</strong> Google then keeps showing the source page.</li>
<li><strong>A 301 used for something temporary.</strong> If you later revert it, the permanent signal is already out there, and browsers may have cached it.</li>
<li><strong>Chains.</strong> A permanent redirect followed by a temporary one, or several hops in a row, adds delay and confusion.</li>
<li><strong>JavaScript or meta refresh redirects</strong> where a server redirect is possible. Google lists server-side redirects as most likely to be interpreted correctly.</li>
<li><strong>Redirecting everything to the home page.</strong> Send each old URL to its closest match.</li>
</ul>

<h2>301 vs 302 in Common Situations</h2>
<table><thead><tr><th>Situation</th><th>Code</th><th>Why</th></tr></thead><tbody>
<tr><td>Http to https</td><td>301 or 308</td><td>The https address is the one to keep</td></tr>
<tr><td>www to non-www, or the reverse</td><td>301 or 308</td><td>One preferred version, the other redirects</td></tr>
<tr><td>New domain</td><td>301 or 308</td><td>Google's site move guidance asks for permanent redirects</td></tr>
<tr><td>Two posts merged into one</td><td>301 or 308</td><td>The old URL will not return</td></tr>
<tr><td>Short promotion page</td><td>302 or 307</td><td>The original URL stays the main one</td></tr>
<tr><td>Maintenance or outage notice</td><td>302 or 307</td><td>Google's own example of a temporary redirect</td></tr>
<tr><td>Visitors sent to a region version</td><td>302 or 307</td><td>The same URL serves different visitors</td></tr>
<tr><td>Deleted page, no replacement</td><td>Neither</td><td>Return 404 or 410</td></tr>
</tbody></table>

<h2>307 and 308 in Practice</h2>
<p>307 and 308 are the newer versions of 302 and 301. Under the HTTP standard they differ from the older codes in one technical way: they tell the browser to repeat the request with the same method, so a form sent with POST is not turned into a GET. For ordinary page redirects that makes no difference to visitors, and Google's table treats 308 as permanent like 301 and 307 as temporary like 302. In our scan, ${all[308]} of ${all[301] + all[308] + all[302] + all[307]} redirects were 308s, so the newer permanent code is already in everyday use, mostly on the first step from http to https.</p>

<h2>What to Check After You Change a Redirect</h2>
<ol>
<li><strong>Test the old URL</strong> and confirm the status code and the final address, with no extra hops.</li>
<li><strong>Test the new URL</strong> to be sure it returns 200 and not another redirect.</li>
<li><strong>Update internal links</strong> to point straight to the final URL, so visitors and crawlers skip the redirect.</li>
<li><strong>Watch Search Console.</strong> The Page indexing report lists "Page with redirect" among the pages that are not indexed: on 27 October 2026 we had one such page, which is expected for a redirecting URL.</li>
<li><strong>Keep the redirect.</strong> Google's site move advice is to keep permanent redirects for as long as possible, generally at least a year.</li>
</ol>

<h2>Fixing a Two-Hop Redirect: Our Plan</h2>
<p>Our own http://www.contomatix.com/ path takes two 301 hops: first to the https www address and then to the final non-www address. The fix is a single rule that sends every variation straight to https://contomatix.com/ in one step. It is a hosting setting, so it needs a change in the server or domain configuration rather than in our pages. After we change it we will repeat the test above and report the result in this guide.</p>

<h2>Is a 302 Ever the Better Choice?</h2>
<p>Yes, when you want the original URL to keep its place. A temporary redirect leaves Google showing the source page, so if a product is out of stock for a week and you send visitors to a related page, a 302 keeps the product URL in results. The risk is forgetting it. A good habit is to write the date you expect to remove each temporary redirect and review the list monthly. Our <a href="/blog/monthly-seo-report">monthly SEO report</a> format has a technical section where that check fits. If you manage many redirects, keep them in one sheet with four columns: old URL, new URL, code and the date you will review it. A permanent redirect needs no end date, but a temporary one always should, and a sheet makes the difference visible to anyone who inherits the site.</p>

<h2>Key Takeaways</h2>
<ul>
<li>301 and 308 are permanent and 302, 303 and 307 are temporary, according to Google's own table.</li>
<li>Permanent redirects show the new URL in search results, and temporary ones show the old URL.</li>
<li>Google says permanent redirects do not cause a loss in PageRank. It does not say the same about temporary ones.</li>
<li>In our scan, ${pc(first[301])}% of redirecting sites use a 301 for http to https, ${pc(first[308])}% use a 308 and ${first[302]} use a 302.</li>
<li>Pick the code by how long the move will last, and check your own site for chains.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is the difference between a 301 and a 302 redirect?', 'A 301 means the page has moved permanently and a 302 means it has moved temporarily. Google shows the new URL for a permanent redirect and the old URL for a temporary one.'],
    ['Does a 301 redirect lose PageRank?', 'Google says 301 and other permanent redirects do not cause a loss in PageRank.'],
    ['Is a 302 bad for SEO?', 'Not if the move really is temporary. It is a mistake when used for a permanent move, because Google keeps the source page in results.'],
    ['What is a 307 redirect?', 'A temporary redirect, treated by Google like a 302. A 308 is the permanent equivalent of a 301.'],
    ['Which redirect should I use for http to https?', 'A permanent one. In our scan of 185 sites, 160 used a 301 and 16 used a 308 as the first redirect.'],
    ['Can I change a 302 to a 301 later?', 'Yes. If a temporary move becomes permanent, change the code so Google can treat the target as canonical.'],
    ['How do I check a redirect code?', 'Use curl -I, your browser developer tools or a redirect checker, and look at the status line and the Location header.'],
    ['Do browsers cache 301 redirects?', 'The HTTP standard makes a 301 cacheable by default, and ${D.cache} of ${D.ok} ranking guides mention caching, which is one reason to be sure before you use one.'],
    ['Should I redirect a deleted page?', 'Only if there is a close replacement. Otherwise return a 404 or 410.']
  ])}
`
});
