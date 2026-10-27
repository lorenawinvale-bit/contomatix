// node scripts/build-post-301-redirect-not-working.js [--write] — data: the 9 results for "301 redirect not working" (Google US, 27 Oct 2026; 4 guides read, 5 forum/Q&A threads not readable), Google's redirect docs read the same day, and our own test of how 185 sites redirect http://host/ (27 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const kr = path.join(__dirname, '..', '..', 'keyword-research');
const J = require('../../keyword-research/serp-301-redirect-not-working-2026-10-27.json');
const ok = J.guides.filter(o => o.status === 200 && o.words > 300); const c = k => ok.filter(o => o[k]).length;
const doc = J.doc.text; const SM = fs.readFileSync(path.join(kr, 'google-sitemove-en-2026-10-26.txt'), 'utf8');
for (const s of ['Show the new redirect target in search results', 'Show the source page in search results', "Only use JavaScript redirects if you can't do server-side or meta refresh redirects", 'server side redirect has the highest chance of being interpreted correctly']) if (!doc.includes(s)) throw new Error('Google redirect doc changed: ' + s);
for (const s of ['follow up to 10 hops', "don't cause a loss in PageRank"]) if (!SM.includes(s)) throw new Error('Google site move text changed: ' + s);
const T = JSON.parse(fs.readFileSync(path.join(kr, 'redirect-chains-2026-10-27.json'), 'utf8')).filter(o => o.hops && o.hops.length);
const first = o => o.hops[0].s; const redirected = T.filter(o => first(o) >= 300 && first(o) < 400);
const hopN = o => o.hops.filter(h => h.s >= 300 && h.s < 400).length;
const R = { sites: T.length, redirected: redirected.length, perm301: redirected.filter(o => first(o) === 301).length, perm308: redirected.filter(o => first(o) === 308).length, temp: redirected.filter(o => [302, 303, 307].includes(first(o))).length, none: T.length - redirected.length, hop1: redirected.filter(o => hopN(o) === 1).length, hop2: redirected.filter(o => hopN(o) === 2).length, hop3: redirected.filter(o => hopN(o) >= 3).length, notHttps: T.filter(o => !/^https:/.test(o.hops[o.hops.length - 1].u)).length, httpPage: T.filter(o => !/^https:/.test(o.hops[o.hops.length - 1].u) && o.hops[o.hops.length - 1].s === 200).length, blocked: T.filter(o => !/^https:/.test(o.hops[o.hops.length - 1].u) && o.hops[o.hops.length - 1].s === 403).length };
const expR = { sites: 185, redirected: 178, perm301: 160, perm308: 16, temp: 2, none: 7, hop1: 120, hop2: 56, hop3: 2, notHttps: 8, httpPage: 3, blocked: 5 };
for (const k of Object.keys(expR)) if (R[k] !== expR[k]) throw new Error('redirect data changed ' + k + ' ' + R[k]);
const D = { listed: 9, guides: ok.length, forums: 5, median: Math.round((ok.map(o => o.words).sort((a, b) => a - b)[1] + ok.map(o => o.words).sort((a, b) => a - b)[2]) / 2), cache: c('cache'), browserCache: c('browserCache'), htaccess: c('htaccess'), loop: c('loop'), chain: c('chain'), vs302: c('vs302'), cdn: c('cdn'), wordpress: c('wordpress'), tools: c('tools'), order: c('order'), https: c('https'), canonical: c('canonical'), google: c('google'), steps: c('steps'), gdoc: c('googleDoc'), policy: c('policy'), dated: c('date') };
const expD = { listed: 9, guides: 4, forums: 5, median: 2196, cache: 4, browserCache: 4, htaccess: 3, loop: 4, chain: 4, vs302: 4, cdn: 3, wordpress: 3, tools: 4, order: 4, https: 4, canonical: 3, google: 3, steps: 4, gdoc: 0, policy: 0 };
for (const k of Object.keys(expD)) if (D[k] !== expD[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(R));
const pc = (a, b) => Math.round(a / b * 100) + '%';
build({
  slug: '301-redirect-not-working', category: 'Technical SEO', author: 'Muhammad Reyan Nizami', date: '2026-10-27',
  title: '301 Redirect Not Working: 185 Sites Tested and What Breaks',
  excerpt: `301 redirect not working? We tested how ${R.sites} sites redirect http: ${pc(R.hop1, R.redirected)} take one hop, ${R.hop2} take two. Causes, fixes and what Google says.`,
  donut: [['301 REDIRECT', 'NOT WORKING'], [['Clear the', 'Cache'], 'Test the Status', ['Check Rule', 'Order']  , 'Remove Chains', ['Confirm in', 'Search Console']]],
  cover: { badge: 'OUR OWN TEST', search: '301 redirect not working', card: `Sites tested: ${R.sites}`, lines: [`Redirect on first request: ${R.redirected}`, `Permanent (301 or 308): ${R.perm301 + R.perm308}`, `Temporary (302): ${R.temp}`, `Two or more hops: ${R.hop2 + R.hop3}`], last: 'Tested 27 October 2026', big: `${R.hop2 + R.hop3}`, k1: `of ${R.redirected} redirects take`, k2: 'two or more hops', title: '301 Redirect Not Working', sub: '185 sites tested and what breaks' },
  info: { title: `Redirects: ${R.sites} Sites Tested`, sub: 'How http://host/ is redirected, tested on 27 October 2026', leftTitle: 'What the sites do', leftTag: `Number of the ${R.sites} sites tested`, max: R.sites,
    bars: [{ label: 'Redirect on first request', sub: 'any type', n: R.redirected }, { label: 'Permanent (301 or 308)', sub: 'first hop', n: R.perm301 + R.perm308 }, { label: 'One hop to the final page', sub: 'no chain', n: R.hop1 }, { label: 'Two or more hops', sub: 'a chain', n: R.hop2 + R.hop3 }, { label: 'Temporary (302)', sub: 'first hop', n: R.temp }],
    rightTitle: 'When a redirect fails', rightTag: 'Check in this order', items: [{ t: 'Clear caches', s: 'browser, CDN, plugin' }, { t: 'Read the status', s: '301, not 200 or 302' }, { t: 'Check rule order', s: 'first match wins' }, { t: 'Remove chains', s: 'send to the final URL' }],
    big: `${R.hop2 + R.hop3}`, noteHtml: `of ${R.redirected} redirecting sites use <em>two or more hops</em> to reach the final page.` },
  tables: {
    serp: { title: 'What ranks for "301 redirect not working"', sub: `The ${D.listed} organic results read on 27 October 2026. Sites are not named.`, head: ['Measure', 'Value'], lastBold: false,
      rows: [['Results listed', String(D.listed)], ['Forum or Q&A threads', `${D.forums} of ${D.listed}`], ['Guides', `${D.guides} of ${D.listed}`], ['Guides that mention browser cache', `${D.browserCache} of ${D.guides}`], ['Guides that mention rule order or conflicts', `${D.order} of ${D.guides}`], ['Guides that mention redirect loops', `${D.loop} of ${D.guides}`], ['Guides that mention a CDN', `${D.cdn} of ${D.guides}`], ['Guides that mention .htaccess', `${D.htaccess} of ${D.guides}`], ['Guides that mention a status code checker or dev tools', `${D.tools} of ${D.guides}`], ["Guides that link Google's documentation", `${D.gdoc} of ${D.guides}`]] },
    data: { title: `How ${R.sites} sites redirect http://host/`, sub: `We requested http://host/ for the ${R.sites} sites that rank in our own SERP reads (15 to 27 October 2026) and followed each redirect by hand on 27 October 2026. Sites are not named.`, head: ['Measure', 'Sites'], lastBold: false,
      rows: [['Sites tested', String(R.sites)], ['Redirect on the first request', `${R.redirected} (${pc(R.redirected, R.sites)})`], ['First hop is 301', String(R.perm301)], ['First hop is 308', String(R.perm308)], ['First hop is temporary (302)', String(R.temp)], ['Reach the final page in one hop', `${R.hop1} (${pc(R.hop1, R.redirected)})`], ['Take two hops', `${R.hop2} (${pc(R.hop2, R.redirected)})`], ['Take three hops', String(R.hop3)], ['Do not end on https', `${R.notHttps} (${R.httpPage} served a page on http, ${R.blocked} returned 403)`]] },
    google: { title: 'What Google says about redirect types', sub: "From Google Search Central's redirects guide and site move guide, read on 27 October 2026.", head: ['Topic', 'What Google says'], lastBold: false,
      rows: [['Permanent redirects', 'Show the new redirect target in search results'], ['Temporary redirects', 'Show the source page in search results'], ['Best way to set them up', 'Server-side redirects have the highest chance of being interpreted correctly'], ['JavaScript redirects', 'Only if you cannot do server-side or meta refresh redirects'], ['Chains', 'Googlebot can follow up to 10 hops, but redirect to the final destination'], ['PageRank', "301 and other permanent redirects don't cause a loss in PageRank"]] }
  },
  content: h => `${h.updated}

<p><strong>A 301 redirect that is not working</strong> usually fails for a small number of reasons: a cached copy, a rule that never matches, a rule that is overridden, a loop or chain, or a redirect that returns the wrong status. Searchers clearly hit this often: of the ${D.listed} results for "301 redirect not working", ${D.forums} are forum or Q&A threads. To see what redirects look like in practice, we tested ${R.sites} sites on 27 October 2026. ${R.redirected} redirected on the first request, ${R.perm301 + R.perm308} of them with a permanent status, but ${R.hop2 + R.hop3} needed two or more hops to reach the final page.</p>

<p>This guide gives you the usual causes in the order to check them, the redirect types and what Google does with each, our test data, example rules and how to confirm the fix. For moving a whole site, see our <a href="/blog/seo-site-migration">SEO site migration checklist</a> and the <a href="/tools/redirect-mapper">redirect mapper</a>.</p>

<h2>301 Redirect Not Working: The Usual Causes</h2>
${h.fig('serp', 'Table of what ranks for 301 redirect not working: 9 results, 5 forum or Q&A threads and 4 guides, with all 4 guides mentioning browser cache, rule order, loops, and none linking Google documentation')}
<p>We read the ${D.guides} guides among the ${D.listed} results. They share a checklist. ${D.browserCache} of ${D.guides} say to clear the browser cache or test in a private window, because browsers cache 301 responses. ${D.order} of ${D.guides} point to rule order or conflicts. ${D.loop} cover redirect loops, ${D.chain} cover chains, ${D.vs302} cover 301 versus 302, ${D.https} cover http and https, ${D.cdn} mention a CDN, ${D.htaccess} mention .htaccess and ${D.wordpress} mention WordPress or plugins. ${D.tools} of ${D.guides} suggest a status code checker or developer tools. None link to Google's documentation, and the ${D.forums} forum threads are blocked to our crawler, so we have not counted them.</p>
<p>In the order we check them:</p>
<ol>
<li><strong>Caches.</strong> Clear the browser cache or use a private window. Then check any CDN, caching plugin or server cache in front of the site.</li>
<li><strong>The real status.</strong> Request the old URL and read the status code. If it is 200, the rule did not match; if 302, it is the wrong type; if 301 but the wrong destination, the target is wrong.</li>
<li><strong>Rule order.</strong> In Apache and Nginx, an earlier rule or a catch-all can override your rule. Put specific rules first.</li>
<li><strong>Loops and chains.</strong> Follow the redirect until it ends. If it never ends, there is a loop. If it takes several steps, there is a chain.</li>
<li><strong>Conflicts.</strong> A plugin, the host's own settings and your server config can all redirect the same URL. Disable one at a time.</li>
<li><strong>Exact URL.</strong> Trailing slashes, uppercase letters, http versus https and www versus non-www can all stop a rule from matching.</li>
</ol>

<h2>Redirect 301: What the Redirect Does and What Google Says</h2>
${h.fig('google', "Table of what Google says about redirects: permanent redirects show the new target in search results, temporary redirects show the source page, server-side redirects are most reliably interpreted, JavaScript only as a last resort, chains up to 10 hops but go to the final URL, and permanent redirects do not lose PageRank")}
<p>Google's redirects guide says that users generally cannot tell the types apart, but Google Search uses certain types as a signal about which URL should be canonical. A permanent redirect, such as 301 or 308, tells it to show the new target in search results. A temporary redirect, such as 302, 303 or 307, tells it to keep showing the source page. It lists server-side redirects first, because a server-side redirect has the highest chance of being interpreted correctly, and says to use JavaScript redirects only if you cannot do server-side or meta refresh redirects. Its site move guide adds that 301 and other permanent redirects don't cause a loss in PageRank.</p>

<h2>301 vs 302 Redirect: Which One to Use</h2>
<ul>
<li><strong>Use 301 or 308</strong> when the move is permanent: a new URL, a new domain, a merged page. Google then shows the new URL.</li>
<li><strong>Use 302, 303 or 307</strong> when the redirect is temporary: a page down for maintenance, a short promotion, a test. Google keeps the source page.</li>
<li><strong>Do not use a temporary redirect for a permanent move.</strong> The old URL may stay in results. Of the ${R.redirected} sites that redirected http on the first request, ${R.temp} used a 302.</li>
<li><strong>308 and 301 are both permanent.</strong> ${R.perm308} sites in our test used 308 and ${R.perm301} used 301.</li>
</ul>

<h2>What ${R.sites} Sites Do When You Visit the http Version</h2>
${h.fig('data', 'Table of how 185 sites redirect http: 178 redirect on the first request, 160 with a 301 and 16 with a 308, 2 with a 302, 120 reach the final page in one hop, 56 take two hops, 2 take three, and 8 do not end on https')}
<p>Here is the data. We requested http://host/ for the ${R.sites} sites behind the ranking pages in our own SERP reads and followed each redirect by hand. ${R.redirected} (${pc(R.redirected, R.sites)}) redirected immediately. Of those, ${R.perm301} used 301, ${R.perm308} used 308 and ${R.temp} used 302. A single hop reached the final page for ${R.hop1} (${pc(R.hop1, R.redirected)}), two hops for ${R.hop2} (${pc(R.hop2, R.redirected)}) and three for ${R.hop3}. The commonest two-hop pattern was http to https, then non-www to www: 50 sites did that, and 25 more did both changes in a single hop. Eight sites did not end on https: ${R.httpPage} served the home page over plain http, and ${R.blocked} returned a 403 to our request.</p>
<p>The lesson is that a redirect can be "working" and still be wasteful. Googlebot can follow up to ${10} hops, so a two-hop chain will not break, but Google advises redirecting to the final destination directly, and each hop adds latency for users. Our own site showed the same pattern: http://contomatix.com/ reaches https in one 301 hop, but http://www.contomatix.com/ takes two hops, first to https on www and then to the non-www address. That is not broken, but it is a chain we could shorten, and your own site may have one too.</p>

${h.info('Infographic of how 185 sites redirect http: 178 redirect on the first request, 176 with a permanent status, 120 in one hop and 58 in two or more, plus the order to check when a redirect fails')}

<h2>Check for 301 Redirect: How to Test One</h2>
<ol>
<li><strong>Use a status checker or curl.</strong> Request the old URL without following redirects and read the status and the Location header.</li>
<li><strong>Use browser developer tools.</strong> Open the Network tab, tick "preserve log" and load the old URL to see each hop.</li>
<li><strong>Test in a private window</strong> so cached redirects do not hide the real result.</li>
<li><strong>Test with and without www, with and without a trailing slash, and on http and https.</strong></li>
<li><strong>Use URL inspection in Search Console</strong> to see how Google sees the URL. See <a href="/blog/set-up-google-search-console">how to set up Google Search Console</a>.</li>
<li><strong>Crawl a list of old URLs</strong> after a move to find chains and wrong targets in bulk.</li>
</ol>

<h2>301 Redirect Example: Apache and Nginx</h2>
<p>These are common patterns. Replace the paths and domain with your own, and test before you rely on them. On Apache, one way is a simple directive in .htaccess:</p>
<pre><code>Redirect 301 /old-page https://example.com/new-page</code></pre>
<p>Or a rewrite rule, which gives you more control:</p>
<pre><code>RewriteEngine On
RewriteRule ^old-page/?$ https://example.com/new-page [R=301,L]</code></pre>
<p>On Nginx, inside a server block:</p>
<pre><code>location = /old-page {
  return 301 https://example.com/new-page;
}</code></pre>
<p>Point the redirect at the final URL, not at another redirect. If you have many redirects, generate the rules from a map with the <a href="/tools/redirect-mapper">redirect mapper</a>, which exports Apache and Nginx rules.</p>

<h2>WordPress 301 Redirect: Plugins and Conflicts</h2>
<p>${D.wordpress} of ${D.guides} guides cover WordPress. On WordPress, redirects can come from a redirect plugin, an SEO plugin, a caching plugin, the theme, the host and the server file, so the same URL can be handled in several places. If a redirect does not work, check which layer is answering: disable the redirect plugin, clear every cache, and test again. Keep one place for redirects, and record each redirect you add so the next person can find it.</p>

<h2>301 Redirect Backlink: Do Links Still Count?</h2>
<p>When other sites link to an old URL and you redirect it to a new one, the link is not lost. Google's site move guide says permanent redirects do not cause a loss in PageRank, and it asks you to keep redirects for as long as possible, generally at least one year, so that it can transfer signals to the new URLs, including reassigning links on other sites. For links you control, such as profiles and listings, update them to point at the new URL. To find which old URLs have links, use the Links report in Search Console, and to track new links use the <a href="/tools/backlink-monitor-tool">backlink monitor tool</a>.</p>

<h2>Redirect Loops and "Too Many Redirects"</h2>
<p>All ${D.loop} guides cover loops. A loop happens when A redirects to B and B redirects back to A, directly or through other URLs, and the browser gives up with a "too many redirects" error. Common sources are a force-https rule fighting a CDN setting, a www rule fighting a non-www rule, and a plugin and a server rule redirecting the same URL differently. To find one, follow the redirect step by step and note where it comes back to a URL you have already seen. Then decide which rule is correct and remove or fix the other. Do not add more redirects to escape a loop, because that only lengthens it.</p>

<h2>HTTPS and www Redirects: One Hop Is Enough</h2>
<p>The most common chain in our test combined two ordinary rules: http to https, then non-www to www (or the reverse). Each rule is correct on its own, but together they create two hops. The fix is to send each variant straight to the one canonical version. If your canonical address is https://example.com/, then http://example.com/, http://www.example.com/ and https://www.example.com/ should each redirect once to https://example.com/. In practice that means writing the www rule so that it sends to the final https address, not to an intermediate one. ${R.hop1} of the ${R.redirected} sites we tested already do this for the home page. The other ${R.hop2 + R.hop3} could shorten theirs, and so could we.</p>

<h2>How to Fix a Redirect Chain</h2>
<ol>
<li><strong>List the chain.</strong> Write down each URL and status code from the first request to the final page.</li>
<li><strong>Find the final URL.</strong> That is the address you want every earlier URL to go to.</li>
<li><strong>Edit the first rule</strong> so it points at the final URL, and remove any rule in the middle that is no longer needed.</li>
<li><strong>Update internal links</strong> so your own pages link to the final URL and users never meet the redirect.</li>
<li><strong>Test again</strong> in a private window, and check the sitemap lists final URLs only. Use the <a href="/tools/sitemap-validator">sitemap validator</a> for that.</li>
<li><strong>Record the change</strong> and the date, so you know which rules exist and why.</li>
</ol>
<p>Fixing a chain is a small job with a small benefit for each URL, but the benefit repeats for every visit and every crawl, and the habit of pointing redirects at final URLs prevents the loops and conflicts that cause "not working" in the first place.</p>

<h2>Common Redirect Mistakes</h2>
<ul>
<li><strong>Testing only in your own browser.</strong> A cached redirect can hide a problem, or hide a fix.</li>
<li><strong>Redirecting to a page that redirects again.</strong> ${pc(R.hop2 + R.hop3, R.redirected)} of the sites we tested used two or more hops for the home page.</li>
<li><strong>Using 302 for a permanent move.</strong></li>
<li><strong>Redirecting everything to the home page.</strong> Send each URL to its closest equivalent.</li>
<li><strong>Leaving the redirect plugin and a server rule both on.</strong> They can conflict.</li>
<li><strong>Removing redirects early.</strong> Google suggests keeping them at least a year.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>The result list comes from Google US for "301 redirect not working" on 27 October 2026. ${D.listed} results were listed; we read the ${D.guides} guides. The ${D.forums} forum or Q&A threads were blocked to our crawler or too short to read.</li>
<li>The redirect test requested http://host/ for the ${R.sites} sites behind the pages in our own SERP reads (excluding Google, reddit, LinkedIn, Quora and our own site), without following redirects automatically, and followed each Location header by hand up to 8 hops. It tests the home page only, from one location, and describes those sites, not the web.</li>
<li>Google statements come from its redirects guide and its site move guide, read on 26 and 27 October 2026.</li>
<li>Our own site was tested the same way on 27 October 2026.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Check caches, the real status code, rule order, loops and conflicts, in that order.</li>
<li>Use 301 or 308 for permanent moves. Google shows the new target for permanent redirects and the source page for temporary ones.</li>
<li>Of ${R.sites} sites tested, ${R.redirected} redirected http; ${R.hop2 + R.hop3} of them needed two or more hops.</li>
<li>Permanent redirects do not cause a loss in PageRank, according to Google, and should be kept at least a year.</li>
<li>Test in a private window and read the status code, not just what the browser shows.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['Why is my 301 redirect not working?', 'Common causes are a cached copy, a rule that does not match, a rule overridden by another, a loop or chain, or the wrong status code. Check them in that order.'],
    ['How do I check for a 301 redirect?', 'Request the old URL without following redirects and read the status code and Location header, or use browser developer tools with preserve log on.'],
    ['What is the difference between a 301 and a 302 redirect?', 'A 301 is permanent and Google shows the new target. A 302 is temporary and Google keeps showing the source page.'],
    ['Do 301 redirects lose PageRank?', "Google's site move guide says 301 and other permanent redirects don't cause a loss in PageRank."],
    ['How many redirects in a row are too many?', 'Googlebot can follow up to 10 hops, but Google advises redirecting to the final destination directly because chains add latency.'],
    ['How long should I keep a 301 redirect?', 'Google says as long as possible, generally at least one year.'],
    ['Why does my redirect work in one browser but not another?', 'A cached redirect or a plugin or CDN serving a stale response is the usual cause. Test in a private window and read the status code.'],
    ['Is a JavaScript redirect as good as a 301?', 'No. Google says to use JavaScript redirects only if you cannot use server-side or meta refresh redirects.'],
    ['How do I create many 301 redirects at once?', 'Build a map of old to new URLs and export rules for your server. Our <a href="/tools/redirect-mapper">redirect mapper</a> exports Apache and Nginx rules.']
  ])}
`
});
