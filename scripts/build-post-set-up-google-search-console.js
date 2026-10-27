// node scripts/build-post-set-up-google-search-console.js [--write] — data: 6 readable ranking pages (Google US, 27 Oct 2026), Google's Search Console help pages read the same day, and our own Search Console numbers (27 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-set-up-google-search-console-2026-10-27.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-day13-2026-10-27.json');
for (const [k, s] of [['start', 'There is no need to sign in to the tool every day'], ['start', 'around once every month'], ['start', 'submitting a sitemap using Search Console might speed up your site'], ['verify', 'You can add multiple verification methods'], ['verify', 'This is required only for Domain property'], ['property', 'Includes only URLs with the specified prefix, including the protocol'], ['property', 'Includes all subdomains (m, www, and so on) and multiple protocols'], ['property', 'DNS record verification only'], ['verify', 'Verification lasts as long as Search Console can confirm']]) if (!G[k].text.includes(s)) throw new Error('Google text changed: ' + s);
const O = { sitemapSubmitted: 'Oct 9, 2026', sitemapRead: 'Oct 25, 2026', sitemapPages: 402, indexed: 452, notIndexed: 36, reasons: 5, noindex: 19, crawledNot: 6, altCanon: 5, discovNot: 5, redirect: 1, links: 24, linkSites: 10 };
if (O.noindex + O.crawledNot + O.altCanon + O.discovNot + O.redirect !== O.notIndexed) throw new Error('reasons do not sum');
const D = { listed: 8, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), domain: c('domain'), urlPrefix: c('urlPrefix'), dns: c('dns'), htmlFile: c('htmlFile'), htmlTag: c('htmlTag'), ga: c('ga'), sitemap: c('sitemap'), users: c('users'), performance: c('performance'), indexing: c('indexing'), timeline: c('timeline'), free: c('free'), bing: c('bing'), backlinks: c('backlinks'), mistakes: c('mistakes'), policy: c('policy'), steps: c('steps'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 8, ok: 6, median: 2676, domain: 4, urlPrefix: 3, dns: 4, htmlFile: 4, htmlTag: 5, ga: 4, sitemap: 5, users: 6, performance: 6, indexing: 6, timeline: 5, free: 3, bing: 1, backlinks: 3, mistakes: 4, policy: 2, steps: 1, gdoc: 6, dated: 2 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(O));
const f = n => n.toLocaleString('en-US');
build({
  slug: 'set-up-google-search-console', category: 'Technical SEO', author: 'Hamza Siddiqui', date: '2026-10-27',
  title: 'How to Set Up Google Search Console: Steps and Real Numbers',
  excerpt: `How to set up Google Search Console: property type, verification, sitemap and users, with our own real numbers: ${O.indexed} pages indexed, ${O.notIndexed} not, and why.`,
  donut: [['SET UP', 'SEARCH CONSOLE'], [['Choose the', 'Property'], 'Verify Ownership', ['Submit the', 'Sitemap'], 'Add Users', ['Check Reports', 'Monthly']]],
  cover: { badge: 'OUR OWN SEARCH CONSOLE', search: 'how to set up google search console', card: `Pages indexed: ${O.indexed}`, lines: [`Pages not indexed: ${O.notIndexed} (5 reasons)`, `Sitemap URLs discovered: ${O.sitemapPages}`, `Sitemap submitted: ${O.sitemapSubmitted}`, `Linking sites in the report: ${O.linkSites}`], last: 'Numbers from our own account', big: String(O.indexed), k1: 'of our pages are indexed', k2: `${O.notIndexed} are not, and we know why`, title: 'Set Up Google Search Console', sub: 'Steps and real numbers' },
  info: { title: `Search Console Setup: ${D.ok} Guides Read`, sub: 'Organic results for "how to set up google search console", Google US, 27 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Users and permissions', sub: 'covered', n: D.users }, { label: 'Performance and indexing', sub: 'reports covered', n: D.indexing }, { label: 'Sitemaps', sub: 'covered', n: D.sitemap }, { label: 'Domain property', sub: 'explained', n: D.domain }, { label: 'URL-prefix property', sub: 'explained', n: D.urlPrefix }],
    rightTitle: 'The four setup steps', rightTag: 'Google\'s order', items: [{ t: 'Add a property', s: 'domain or URL prefix' }, { t: 'Verify ownership', s: 'DNS, file, tag' }, { t: 'Submit a sitemap', s: 'speeds up discovery' }, { t: 'Check monthly', s: 'no daily need' }],
    big: String(O.indexed), noteHtml: `pages indexed in our own account, <em>${O.notIndexed} not</em>, each with a reason.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for Search Console setup cover`, sub: `Organic results for "how to set up google search console" read on 27 October 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Users and permissions', `${D.users} of ${D.ok}`], ['Performance report', `${D.performance} of ${D.ok}`], ['Indexing or URL inspection', `${D.indexing} of ${D.ok}`], ['Sitemaps', `${D.sitemap} of ${D.ok}`], ['HTML tag verification', `${D.htmlTag} of ${D.ok}`], ['Domain property', `${D.domain} of ${D.ok}`], ['DNS verification', `${D.dns} of ${D.ok}`], ['HTML file verification', `${D.htmlFile} of ${D.ok}`], ['Google Analytics or Tag Manager', `${D.ga} of ${D.ok}`], ['URL-prefix property', `${D.urlPrefix} of ${D.ok}`], ['Backlinks or Links report', `${D.backlinks} of ${D.ok}`], ['Mention Bing', `${D.bing} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a publish or update date', `${D.dated} of ${D.ok}`]] },
    google: { title: 'Domain property or URL-prefix property', sub: "From Google's help page on adding a property, read on 27 October 2026.", head: ['', 'URL-prefix', 'Domain'], lastBold: false,
      rows: [['What it includes', 'Only URLs with the exact prefix, including http or https', 'All subdomains and multiple protocols'], ['Verification', 'Many methods', 'DNS record only'], ['Use it when', 'You need data by path or protocol', 'You want every version of the site in one place']] },
    ours: { title: 'Our own Search Console numbers', sub: 'Our property is a URL-prefix property for https://contomatix.com/. Numbers read from the Sitemaps and Page indexing reports on 27 October 2026 (indexing data last updated 23 October).', head: ['Measure', 'Value'], lastBold: false,
      rows: [['Sitemap', `/sitemap.xml, submitted ${O.sitemapSubmitted}, last read ${O.sitemapRead}, status Success`], ['URLs the sitemap report discovered', String(O.sitemapPages)], ['Indexed pages', String(O.indexed)], ['Not indexed pages', `${O.notIndexed} in ${O.reasons} reasons`], ['Excluded by noindex tag', String(O.noindex)], ['Crawled, currently not indexed', String(O.crawledNot)], ['Alternate page with proper canonical', String(O.altCanon)], ['Discovered, currently not indexed', String(O.discovNot)], ['Page with redirect', String(O.redirect)]] }
  },
  content: h => `${h.updated}

<p><strong>To set up Google Search Console</strong> you add a property for your site, prove you own it, submit a sitemap and add anyone who needs access. Google's getting-started guide lists the same order and adds two useful points: there is no need to sign in every day, and checking about once a month, or when you change content, is enough. We read ${D.ok} pages that rank for the question on 27 October 2026. All ${D.ok} cover users, the Performance report and indexing, but ${D.free} of ${D.ok} say it is free, ${D.steps} give numbered steps and only ${D.dated} show a date.</p>

<p>This guide walks through each step with Google's own wording, shows our real numbers from our own account (${O.indexed} pages indexed, ${O.notIndexed} not, and the reason for each), and tells you which reports to open first. For what the Performance numbers mean, read <a href="/blog/search-console-impressions-explained">Search Console impressions explained</a>.</p>

<h2>What Is Google Search Console? (Search Console Google)</h2>
<p>Google describes Search Console as a tool that helps anyone with a website understand how they perform on Google Search and what they can do to improve their appearance in search. It reports on how Google crawls, indexes and serves your site. It is free, it does not replace analytics, and it shows data from Google's side: which queries showed your pages, how often people clicked, which pages are indexed and which are not, and what Google found wrong.</p>

<h2>How to Set Up Google Search Console: Step by Step</h2>
${h.fig('serp', 'Table of what 6 pages on setting up Google Search Console cover: users, Performance and indexing in all 6, sitemaps and HTML tag verification in 5, domain property in 4, URL prefix in 3, all 6 linking Google documentation and 2 showing a date')}
<ol>
<li><strong>Sign in with a Google account</strong> you will keep. Use a shared or business account if more than one person needs access.</li>
<li><strong>Add a property.</strong> Choose Domain or URL prefix (see the next section).</li>
<li><strong>Verify ownership</strong> with one of the methods Google lists.</li>
<li><strong>Submit your sitemap</strong> so Google can find your pages faster.</li>
<li><strong>Add users</strong> with the right permission level.</li>
<li><strong>Wait for data.</strong> Reports fill in over time, so check back after a few days.</li>
<li><strong>Check monthly.</strong> Google says there is no need to sign in every day, because it emails you when it finds new issues.</li>
</ol>

<h2>Domain Property or URL-Prefix Property?</h2>
${h.fig('google', "Table comparing Search Console property types from Google's help page: a URL-prefix property includes only URLs with the exact prefix and can use many verification methods, while a domain property includes all subdomains and protocols and needs DNS verification")}
<p>Google's help page explains the two website property types. A URL-prefix property includes only URLs with the specified prefix, including the protocol, so http and https are separate, and so are www and non-www. A domain property includes all subdomains and multiple protocols. Verification differs: a URL-prefix property can use many methods, and a domain property can only be verified with a DNS record. ${D.domain} of ${D.ok} guides explain domain properties and ${D.urlPrefix} explain URL prefix.</p>
<p>Which should you choose? A domain property gives the full picture and suits most sites, if you can add a DNS record. A URL-prefix property is simpler when you cannot edit DNS, or when you want data for one path, such as a language folder. Ours is a URL-prefix property for https://contomatix.com/, because it is the version we use. If you have several versions of a site, Google's site move guidance asks you to verify each variant, so a domain property can save effort.</p>

<h2>How to Verify Ownership: DNS, HTML File and HTML Tag</h2>
<ul>
<li><strong>DNS record.</strong> Add a record at your domain provider. ${D.dns} of ${D.ok} guides cover it. Google says this method is required only for a domain property, and that using it on a URL-prefix property also verifies the domain property.</li>
<li><strong>HTML file.</strong> Upload a file to your site's root (${D.htmlFile} of ${D.ok} cover it). Keep the file after verifying.</li>
<li><strong>HTML tag.</strong> Add a meta tag to your home page's head (${D.htmlTag} of ${D.ok} cover it).</li>
<li><strong>Google Analytics or Tag Manager.</strong> If you already use them, ${D.ga} of ${D.ok} guides note you can verify through them, as long as the code stays on the site.</li>
</ul>
<p>Google also says you can add multiple verification methods in the property's settings, in case one stops working, for example if a template change removes a tag. Verification lasts as long as Search Console can confirm that the token is present and valid, and you are notified if it cannot.</p>

${h.info('Infographic of Search Console setup: users 6, Performance and indexing 6, sitemaps 5, domain property 4, URL prefix 3, plus the four setup steps and our own 452 indexed and 36 not indexed pages')}

<h2>Google Search Console Sitemap: How to Submit It</h2>
<p>${D.sitemap} of ${D.ok} guides cover sitemaps. Google says submitting a sitemap through Search Console might speed up your site's discovery, and that the Sitemaps report shows how many of the submitted URLs have been indexed. To submit one, open Sitemaps, enter the path, such as sitemap.xml, and select Submit. You can check it first with our <a href="/tools/sitemap-validator">sitemap validator</a>.</p>
<p>Here is ours. We submitted /sitemap.xml on ${O.sitemapSubmitted}, Google read it on ${O.sitemapRead}, the status is Success, and the report shows ${O.sitemapPages} discovered pages. For more on sitemaps, see <a href="/blog/how-to-create-a-sitemap">how to create a sitemap</a>.</p>

<h2>Add User to Google Search Console</h2>
<p>All ${D.users} of ${D.ok} guides cover users and permissions. In Settings, open Users and permissions and add the person's Google account email. Search Console has several permission levels, so give the lowest one that lets the person do their job and check Google's help page for what each level can do. Give owner access only to people you trust, and remove people who leave. Remember that multiple people can verify ownership of the same property.</p>

<h2>SEO Google Search Console: The Reports to Check First</h2>
${h.fig('ours', 'Table of our own Search Console numbers on 27 October 2026: sitemap submitted 9 October and read 25 October with 402 discovered pages, 452 indexed pages, 36 not indexed in 5 reasons including 19 excluded by noindex and 6 crawled but not indexed')}
<p>${D.performance} of ${D.ok} guides cover the Performance report and ${D.indexing} cover indexing. Open these first:</p>
<ul>
<li><strong>Page indexing.</strong> It shows which pages are indexed and why others are not. Ours showed ${O.indexed} indexed and ${O.notIndexed} not, split into five reasons: ${O.noindex} excluded by a noindex tag (we put it there on purpose), ${O.crawledNot} crawled but not indexed, ${O.altCanon} alternate pages with a proper canonical tag, ${O.discovNot} discovered but not indexed and ${O.redirect} page that redirects. Not every "not indexed" is a problem, and the reason tells you which to act on.</li>
<li><strong>Performance.</strong> Queries, pages, countries, devices, clicks and impressions.</li>
<li><strong>Sitemaps.</strong> Whether Google can read your sitemap and how many URLs it found.</li>
<li><strong>Core Web Vitals and Enhancements.</strong> Real-user page experience and structured data status. See <a href="/blog/improve-core-web-vitals">how to improve Core Web Vitals</a>.</li>
<li><strong>Manual actions and Security.</strong> Check these occasionally for problems.</li>
</ul>

<h2>Google Search Console Keywords: Using the Performance Report</h2>
<p>The Performance report is a free source of keyword ideas, because it shows the queries your pages already appear for. To use it for keyword research: filter by a page, sort by impressions, and look for queries with many impressions and few clicks, which are chances to improve a title or add a section. Also look for queries that fit a different page. Our guide to <a href="/blog/long-tail-low-competition-keywords">long-tail low-competition keywords</a> explains how to choose terms, and the Performance data also helps you spot two pages competing for one query. A word of caution: the table shows a limited number of rows and omits rare queries, so do not treat it as a complete list.</p>

<h2>How to Check Backlinks in Google Search Console</h2>
<p>${D.backlinks} of ${D.ok} guides cover the Links report. It shows external links, top linked pages, top linking sites and top linking text. In our own report on 21 October 2026 we found ${O.links} external links from ${O.linkSites} sites. The report is a sample, not a full list, so treat it as a starting point. To check the attribute of a link, paste the linking page's HTML into the <a href="/tools/dofollow-link-checker">dofollow link checker</a>. For what the numbers meant for us, see <a href="/blog/what-is-link-building">what is link building</a>.</p>

<h2>Google Search Console vs Google Analytics</h2>
<p>They answer different questions. Search Console shows what happens before the click: queries, impressions, position and indexing. Google Analytics shows what happens after: sessions, behaviour and conversions. Use both. Search Console tells you whether Google can find and show your pages; analytics tells you what visitors do next. Neither replaces the other.</p>

<h2>How to Read the Page Indexing Report</h2>
<p>The report splits pages into indexed and not indexed, then lists the reasons for the second group. Each of the five reasons in our account means something different, and only some need action:</p>
<ul>
<li><strong>Excluded by noindex tag (${O.noindex} for us).</strong> The page tells Google not to index it. That is fine if it is deliberate, such as a thank-you or internal page. Check that no important page carries the tag by mistake.</li>
<li><strong>Crawled, currently not indexed (${O.crawledNot}).</strong> Google fetched the page but has not added it to the index. Improve the page's content, make sure it is not a near-duplicate, link to it from other pages and wait.</li>
<li><strong>Alternate page with proper canonical tag (${O.altCanon}).</strong> The page points to another URL as the preferred version. That is normal for duplicates and parameter URLs.</li>
<li><strong>Discovered, currently not indexed (${O.discovNot}).</strong> Google knows the URL but has not crawled it yet. Internal links and a sitemap help.</li>
<li><strong>Page with redirect (${O.redirect}).</strong> The URL redirects elsewhere, so the destination is what gets indexed. Make sure the redirect is permanent and the destination is correct. See <a href="/blog/seo-site-migration">SEO site migration</a>.</li>
</ul>
<p>Our own ${O.notIndexed} not-indexed pages are about half deliberate noindex pages and half pages that need time or improvement. Seeing it broken down like this tells you what to fix first. If you fix something, Search Console lets you validate the fix and then re-checks the pages over time.</p>

<h2>What to Do in the First Week After Setup</h2>
<ol>
<li><strong>Day 1:</strong> verify ownership, add a backup verification method, submit the sitemap, and add the people who need access.</li>
<li><strong>Day 2 to 3:</strong> open the Sitemaps report and check that Google read the file without errors.</li>
<li><strong>Day 4 to 7:</strong> open Page indexing and Performance as data arrives. Note the number of indexed pages and the top queries as your baseline.</li>
<li><strong>End of week:</strong> use URL inspection on your most important pages to see whether Google has indexed them and how it renders them.</li>
<li><strong>Then:</strong> set a monthly reminder to check reports, and write down the numbers so you can compare them later.</li>
</ol>
<p>Writing the baseline down matters. In a few months you will want to know whether the number of indexed pages and impressions has gone up, and without a starting point you cannot say.</p>

<h2>Common Search Console Setup Mistakes</h2>
<ul>
<li><strong>Verifying the wrong version.</strong> A URL-prefix property for http will not show https data.</li>
<li><strong>Removing the verification token.</strong> Keep the file, tag or DNS record in place.</li>
<li><strong>Never submitting a sitemap.</strong> Google says it might speed up discovery.</li>
<li><strong>Giving everyone owner access.</strong> Use the lowest permission needed.</li>
<li><strong>Panicking about every not-indexed page.</strong> Read the reason first. Ours include deliberate noindex pages.</li>
<li><strong>Checking daily.</strong> Google says monthly is enough, with email alerts for new issues.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "how to set up google search console" on Google US, 27 October 2026. ${D.listed} were listed; ${D.ok} returned a readable page (one listed page was Google's own product page, which we did not read, and one was too short). A topic counts once per page when its term appears in the text.</li>
<li>Google statements come from its Search Console getting-started guide and its help pages on verifying and adding a property, read on the same day.</li>
<li>Our numbers come from the Sitemaps and Page indexing reports in our own Search Console on 27 October 2026 (indexing data last updated 23 October), and from the Links report on 21 October 2026.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Add a property, verify, submit a sitemap, add users and check about once a month.</li>
<li>A domain property covers all subdomains and protocols and needs DNS verification. A URL-prefix property covers one prefix and has many verification methods.</li>
<li>Google says a sitemap might speed up discovery.</li>
<li>Our account shows ${O.indexed} indexed pages and ${O.notIndexed} not indexed, each with a reason.</li>
<li>Use Performance for keyword ideas and the Links report as a sample of backlinks.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['How do I set up Google Search Console?', 'Add a property, verify ownership with DNS, an HTML file, an HTML tag or Google Analytics, submit your sitemap and add users.'],
    ['Is Google Search Console free?', 'Yes. Google describes it as a tool to help anyone with a website understand their performance in Google Search.'],
    ['Should I use a domain property or a URL-prefix property?', 'A domain property covers all subdomains and protocols and needs DNS verification. A URL-prefix property covers one exact prefix and allows other methods.'],
    ['How long does it take for data to appear?', 'Reports fill in over time, so check back after a few days. Google does not give a fixed time.'],
    ['How often should I check Search Console?', 'Google says around once every month, or when you change content. It emails you if it finds new issues.'],
    ['Do I have to submit a sitemap?', 'No, but Google says submitting one through Search Console might speed up discovery of your pages.'],
    ['How do I add a user to Google Search Console?', 'Open Settings, then Users and permissions, and add the person\'s Google account email with the lowest permission they need.'],
    ['What is the difference between Search Console and Google Analytics?', 'Search Console shows what happens before the click, such as queries and indexing. Analytics shows what visitors do on your site.'],
    ['Is there a Google Search Console alternative?', 'Other search engines offer their own webmaster tools, such as Bing Webmaster Tools. None replaces Google\'s data about how Google crawls and shows your site.']
  ])}
`
});
