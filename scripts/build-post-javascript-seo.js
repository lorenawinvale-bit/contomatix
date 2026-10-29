// node scripts/build-post-javascript-seo.js [--write] — data: 6 readable ranking pages (Google US, 29 Oct 2026), Google's JavaScript SEO docs read the same day, and our own raw-vs-rendered test of 25 live pages (29 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-javascript-seo-2026-10-29.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-day14-2026-10-29.json');
for (const [k, s] of [['jsbasics', 'Googlebot queues pages for both crawling and rendering'], ['jsbasics', 'Google Search won\'t render JavaScript from blocked files or on blocked pages'], ['jsbasics', 'It\'s fine to use JavaScript to inject links into the DOM'], ['jsbasics', 'a headless Chromium renders the page and executes the JavaScript'], ['jsbasics', 'Googlebot queues all pages with a 200 HTTP status code for rendering'], ['jsbasics', 'it can take longer than that'], ['jsbasics', 'server-side or pre-rendering is still a great idea'], ['jsbasics', 'not all bots can run JavaScript'], ['jsbasics', 'shouldn\'t use JavaScript to change the canonical URL'], ['jsbasics', 'only discover your links if they are'], ['dynamic', 'Dynamic rendering was a workaround and not a long-term solution'], ['dynamic', 'server-side rendering'], ['dynamic', 'Other search engines may choose to ignore JavaScript'], ['fixjs', 'deprecated since 2015'], ['fixjs', 'URL Inspection Tool'], ['fixjs', 'crawl stats report'], ['links', 'javascript:goTo']]) if (!G[k].text.includes(s)) throw new Error('Google text changed: ' + s);
const A = require('../../keyword-research/own-js-render-2026-10-29.json');
const posts = A.filter(o => /^\/blog\/./.test(o.path)), rest = A.filter(o => !/^\/blog\/./.test(o.path)); const diff = posts.map(o => o.renLinks - o.rawLinks);
const O = { pages: A.length, ok: A.filter(o => !o.error).length, h2: A.filter(o => o.rawH2 === o.renH2).length, img: A.filter(o => o.rawImg === o.renImg).length, noPost: rest.length, noPostSame: rest.filter(o => o.rawLinks === o.renLinks).length, posts: posts.length, postsDiff: posts.filter(o => o.renLinks !== o.rawLinks).length, min: Math.min(...diff), max: Math.max(...diff), ld: A.filter(o => o.inlineJsonLd >= 1).length, bytesMin: Math.min(...A.map(o => o.rawBytes)), bytesMax: Math.max(...A.map(o => o.rawBytes)) };
const expO = { pages: 25, ok: 25, h2: 25, img: 25, noPost: 14, noPostSame: 14, posts: 11, postsDiff: 11, min: 14, max: 18, ld: 25, bytesMin: 30029, bytesMax: 52679 };
for (const k of Object.keys(expO)) if (O[k] !== expO[k]) throw new Error('own data changed ' + k + ' ' + O[k]);
const D = { listed: 7, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), rendering: c('rendering'), ssr: c('ssr'), csr: c('csr'), dynamic: c('dynamic'), deprecated: c('deprecated'), googlebot: c('googlebot'), wrs: c('wrs'), inspect: c('inspect'), robots: c('robots'), lazy: c('lazy'), hash: c('hash'), frameworks: c('frameworks'), audit: c('audit'), sells: c('sells'), queue: c('queue'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 7, ok: 6, median: 2240, rendering: 6, ssr: 5, csr: 6, dynamic: 5, deprecated: 2, googlebot: 6, wrs: 4, inspect: 4, robots: 4, lazy: 4, hash: 4, frameworks: 3, audit: 5, sells: 3, queue: 4, gdoc: 6, dated: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(O));
build({
  slug: 'javascript-seo', category: 'Technical SEO', author: 'Muhammad Reyan Nizami', date: '2026-10-29',
  title: 'JavaScript and SEO: What Google Sees on 25 Real Pages',
  excerpt: `JavaScript and SEO explained with Google's own docs and a test of 25 live pages: raw HTML versus the rendered page, links, dynamic content and an audit.`,
  donut: [['JAVASCRIPT', 'AND SEO'], [['Crawl and', 'Queue'], 'Render', ['Find the', 'Links'], 'Index', ['Audit', 'It']]],
  cover: { badge: 'OUR OWN TEST', search: 'javascript and seo', card: `Pages tested: ${O.pages}`, lines: [`Headings in raw HTML: ${O.h2} of ${O.pages}`, `Images in raw HTML: ${O.img} of ${O.pages}`, `Links added by script: ${O.posts} posts`, `Rendered extra links: ${O.min} to ${O.max}`], last: 'Raw HTML versus rendered page', big: String(O.h2), k1: `of ${O.pages} pages show every heading in raw HTML`, k2: 'only the table of contents needs script', title: 'JavaScript and SEO', sub: 'What Google sees on 25 pages' },
  info: { title: `JavaScript SEO: ${D.ok} Guides Read`, sub: 'Organic results for "javascript and seo", Google US, 29 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Rendering', sub: 'covered', n: D.rendering }, { label: 'Googlebot', sub: 'named', n: D.googlebot }, { label: 'Server-side rendering', sub: 'covered', n: D.ssr }, { label: 'Dynamic rendering', sub: 'named', n: D.dynamic }, { label: 'Call it deprecated or a workaround', sub: 'on the page', n: D.deprecated }],
    rightTitle: 'Google: three rules', rightTag: 'From its JavaScript docs', items: [{ t: 'Use real links', s: 'a elements with an href' }, { t: 'No URL fragments', s: 'for different content' }, { t: 'Prefer server rendering', s: 'dynamic rendering is a workaround' }],
    big: String(O.h2), noteHtml: `of ${O.pages} of our pages carry every heading in the raw HTML, <em>before any script runs</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for JavaScript and SEO cover`, sub: `Organic results read on 29 October 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Rendering', `${D.rendering} of ${D.ok}`], ['Googlebot', `${D.googlebot} of ${D.ok}`], ['Client-side rendering', `${D.csr} of ${D.ok}`], ['Server-side rendering', `${D.ssr} of ${D.ok}`], ['Dynamic rendering', `${D.dynamic} of ${D.ok}`], ['An audit or checklist', `${D.audit} of ${D.ok}`], ['Rendering queue', `${D.queue} of ${D.ok}`], ['robots.txt', `${D.robots} of ${D.ok}`], ['URL Inspection or testing tools', `${D.inspect} of ${D.ok}`], ['Lazy loading', `${D.lazy} of ${D.ok}`], ['URL fragments or hashes', `${D.hash} of ${D.ok}`], ['Web Rendering Service or Chromium', `${D.wrs} of ${D.ok}`], ['Name a framework', `${D.frameworks} of ${D.ok}`], ['Call dynamic rendering deprecated or a workaround', `${D.deprecated} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`]] },
    google: { title: 'What Google says about JavaScript', sub: "From Google's JavaScript SEO documentation, read on 29 October 2026.", head: ['Say', 'What Google says'], lastBold: false,
      rows: [['Links', 'Use a elements with an href; javascript:goTo links are not crawlable'], ['URLs', "Do not use fragments to load different page content"], ['robots.txt', "Google won't render JavaScript from blocked files or on blocked pages"], ['Canonical', 'Do not use JavaScript to change the canonical URL to something else'], ['Status codes', 'Use a meaningful code, such as 404 for a page that could not be found'], ['Dynamic rendering', 'A workaround, not a long-term solution'], ['Best fix', 'Server-side rendering, static rendering or hydration']] },
    ours: { title: 'Raw HTML versus the rendered page, on our own site', sub: `${O.pages} live pages fetched as raw HTML and rendered in headless Chrome on 29 October 2026: ${O.noPost} site and tool pages and ${O.posts} blog posts.`, head: ['Measure', 'Result'], lastBold: false,
      rows: [['Pages with every H2 in the raw HTML', `${O.h2} of ${O.pages}`], ['Pages with every image in the raw HTML', `${O.img} of ${O.pages}`], ['Site and tool pages with identical links, raw and rendered', `${O.noPostSame} of ${O.noPost}`], ['Blog posts with extra links after rendering', `${O.postsDiff} of ${O.posts}`], ['Extra links per post', `${O.min} to ${O.max}`], ['Pages with JSON-LD in the raw HTML', `${O.ld} of ${O.pages}`]] }
  },
  content: h => `${h.updated}

<p><strong>JavaScript and SEO</strong> come down to one question: does Google see your content and links after your scripts run, and does it see them quickly? Google's documentation says it does run JavaScript with an evergreen version of Chromium, but with limits, and that server-side or pre-rendering is still a great idea. We read ${D.ok} pages that rank for the topic on 29 October 2026. All ${D.ok} cover rendering and Googlebot, ${D.ssr} cover server-side rendering and ${D.dynamic} name dynamic rendering, but only ${D.deprecated} say it is deprecated or a workaround, which is how Google describes it.</p>

<p>This guide explains how Google processes JavaScript, what links and content it can use, which fixes Google recommends and how to audit a page. It also shows a test we ran on ${O.pages} of our own pages, comparing the raw HTML with the rendered page. For related technical checks, see our guides to <a href="/blog/improve-core-web-vitals">improving Core Web Vitals</a> and <a href="/blog/types-of-schema-markup">types of schema markup</a>.</p>

<h2>JavaScript and SEO: How Google Processes Your Pages</h2>
<p>Google's JavaScript SEO basics page says Google processes JavaScript web apps in three phases: crawling, rendering and indexing. Googlebot queues pages for both crawling and rendering. When it fetches a URL, it first checks whether you allow crawling by reading robots.txt. Then it parses the response for links in the href attribute of HTML links and adds them to the crawl queue.</p>
<p>Rendering is the step that matters for JavaScript. Googlebot queues all pages with a 200 HTTP status code for rendering, unless a robots meta tag or header tells Google not to index the page. The page may stay in that queue for a few seconds, but Google says it can take longer. When resources allow, a headless Chromium renders the page and runs the JavaScript. Googlebot then parses the rendered HTML for links again and also uses the rendered HTML to index the page. If the status code is not 200, such as a 404, rendering might be skipped.</p>
<p>${D.queue} of ${D.ok} guides mention the rendering queue and ${D.wrs} name the Web Rendering Service or Chromium. The practical point is that content which exists only after JavaScript runs is indexed later than content in the HTML, and a bot that does not run JavaScript will never see it.</p>

<h2>What Ranking Guides Cover on JavaScript SEO</h2>
${h.fig('serp', 'Table of what 6 pages on JavaScript and SEO cover: rendering and Googlebot in all 6, client-side rendering in 6, server-side rendering in 5, dynamic rendering in 5, an audit in 5 and only 2 calling dynamic rendering deprecated or a workaround')}
<p>The median guide has about ${h.f(D.median)} words. ${D.audit} of ${D.ok} include an audit or checklist, ${D.inspect} mention a testing tool such as URL Inspection and ${D.frameworks} name a framework. Only ${D.dated} show a date, which matters in this topic because the advice has changed: Google now describes dynamic rendering as a workaround, not a long-term solution.</p>

<h2>SEO JavaScript Links: What Google Can Follow</h2>
<p>Google says it can discover your links only if they are <em>a</em> HTML elements with an href attribute. Its page on <a href="https://developers.google.com/search/docs/crawling-indexing/links-crawlable" target="_blank" rel="nofollow noopener">crawlable links</a> shows a link that uses javascript:goTo in the href as an example that does not work, next to a normal anchor with a real path that does. A button with an onclick handler, a span that acts like a link and a link whose destination is built only when clicked are all invisible to link discovery.</p>
<p>JavaScript is allowed to create links. The <a href="https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics" target="_blank" rel="nofollow noopener">JavaScript SEO basics</a> page says it is fine to use JavaScript to inject links into the DOM, as long as they follow the crawlable-link practices. So the question is never "does this link come from JavaScript", it is "is the finished markup an anchor with an href". If you build a single-page app, Google's guidance is to use the History API instead of URL fragments, and to avoid fragments for loading different page content. The troubleshooting page adds that the old fragment scheme has been deprecated since 2015, so you cannot rely on URL fragments to work with Googlebot. ${D.hash} of ${D.ok} guides discuss hashes or fragments.</p>
<p>Internal linking matters here too: a page that no crawlable link reaches is hard for Google to find. Our guide to <a href="/blog/seo-site-migration">SEO site migration</a> shows why mapping every URL, and the links between them, comes first.</p>

<h2>SEO Content in JavaScript: Dynamic Content and Lazy Loading</h2>
<p>Content that is added after load, such as product lists, reviews or tabs, is "dynamic content". Google can index it if the rendered page contains it, but there are three common ways it goes missing. First, the script is blocked: Google says it will not render JavaScript from blocked files or on blocked pages, and ${D.robots} of ${D.ok} guides mention robots.txt. Test your rules with our <a href="/tools/robots-txt-tester">robots.txt tester</a>. Second, the content loads only after a user action, such as a click or a scroll, that Googlebot does not perform. Third, the content depends on a browser feature that is missing. Google recommends feature detection with polyfills or differential serving.</p>
<p>Lazy loading is fine when the content is in the page once it renders. ${D.lazy} of ${D.ok} guides cover it. The safe rule is to put anything that should rank in the HTML or in content that loads on its own, not behind an interaction.</p>

<h2>Dynamic Rendering: Why Google Calls It a Workaround</h2>
<p>Dynamic rendering means serving a server-rendered version to bots and the client-side version to people. Google's <a href="https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering" target="_blank" rel="nofollow noopener">page on it</a> begins: dynamic rendering was a workaround and not a long-term solution for problems with JavaScript-generated content in search engines. It recommends server-side rendering, static rendering or hydration instead. It also notes that other search engines may choose to ignore JavaScript and will not see JavaScript-generated content. ${D.dynamic} of ${D.ok} guides name dynamic rendering, but ${D.deprecated} use the word deprecated or workaround, so a reader of the others could think it is still the standard answer.</p>

<h2>SEO-Friendly JavaScript Framework: Server-Side Rendering, Static or Hydration</h2>
<table><thead><tr><th>Approach</th><th>What the bot gets</th><th>Use it when</th></tr></thead><tbody>
<tr><td>Server-side rendering</td><td>Full HTML on each request</td><td>Content changes often or per user</td></tr>
<tr><td>Static rendering</td><td>Full HTML built ahead of time</td><td>Content changes rarely</td></tr>
<tr><td>Hydration</td><td>HTML first, script then makes it interactive</td><td>You need an app feel and crawlable content</td></tr>
<tr><td>Client-side only</td><td>An empty shell until script runs</td><td>Behind a login, where search does not matter</td></tr>
</tbody></table>
<p>${D.csr} of ${D.ok} guides explain client-side rendering and ${D.ssr} explain server-side rendering. Which framework you pick matters less than whether it can send finished HTML for the pages that should rank. ${D.frameworks} of ${D.ok} guides name a framework; the useful question for any of them is "what is in the HTML response before scripts run?".</p>

${h.info('Infographic of what 6 JavaScript SEO guides cover: rendering 6, Googlebot 6, server-side rendering 5, dynamic rendering 5 and only 2 calling it deprecated or a workaround, plus three Google rules and our own test of 25 pages')}

<h2>What We Found Testing 25 of Our Own Pages</h2>
${h.fig('ours', 'Table of our raw HTML versus rendered page test on 25 live pages: every H2 and image present in the raw HTML on 25 of 25, identical links on 14 of 14 site and tool pages, and 14 to 18 extra links on all 11 blog posts')}
<p>Our site is server-rendered, so we expected the raw HTML to hold everything. We fetched ${O.pages} live pages two ways on 29 October 2026: as raw HTML, which is what a crawler sees before running any script, and as a rendered page in headless Chrome. Headings, images and links count the same either way, so we compared those. Word counts differ because one counts all text in the HTML and the other counts text a visitor can see, so we did not use them.</p>
<ul>
<li><strong>Headings and images:</strong> every H2 and every image was in the raw HTML on ${O.h2} of ${O.pages} pages.</li>
<li><strong>Links on site and tool pages:</strong> identical raw and rendered on ${O.noPostSame} of ${O.noPost} pages.</li>
<li><strong>Links on blog posts:</strong> all ${O.posts} posts had ${O.min} to ${O.max} more links after rendering. We traced one post: the extra links were all the anchors in the table of contents, which a small script builds from the headings.</li>
<li><strong>Structured data:</strong> JSON-LD was in the raw HTML on ${O.ld} of ${O.pages} pages, between ${h.f(O.bytesMin)} and ${h.f(O.bytesMax)} characters of HTML.</li>
</ul>
<p>The finding: the only thing script adds on our pages is navigation within the page. Everything that should rank is in the HTML. A table of contents built by script is harmless, but the same pattern for body text or product links would be a risk.</p>

<h2>Google SEO JavaScript: What Googlebot Does Not Do</h2>
<p>Google's troubleshooting guide, <a href="https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript" target="_blank" rel="nofollow noopener">Fix Search-related JavaScript problems</a>, makes two points that explain many surprises. First, Googlebot and its Web Rendering Service continuously identify resources that do not contribute to essential page content and may not fetch them. Reporting and error requests are the example it gives. Second, client-side analytics may not give a full or accurate picture of Googlebot and rendering activity, so a script-based tracker is a poor way to check whether Google saw your page. Use the crawl stats report in Search Console and the URL Inspection Tool instead.</p>
<p>The same page says Google does run JavaScript but has differences and limitations you need to design around. That is why the safest pages do not depend on the rendering step for their main content.</p>

<h2>JavaScript SEO Guide: Which Fix to Make First</h2>
<ol>
<li><strong>Is the main content in the raw HTML?</strong> If yes, you are in good shape. If not, ask for server-side rendering, static rendering or hydration for the pages that should rank.</li>
<li><strong>Are the links real anchors?</strong> Fix navigation and pagination that rely on clicks only.</li>
<li><strong>Are scripts and data files crawlable?</strong> Remove robots.txt rules that block them.</li>
<li><strong>Do missing pages return 404?</strong> Fix soft 404s in client-side routing.</li>
<li><strong>Is the canonical set in the HTML?</strong> Make the rendered value match.</li>
</ol>
<p>Work through them in that order: the first fix changes what every crawler sees, the last only tidies the details.</p>

<h2>JavaScript SEO Audit: How to Check a Page</h2>
<ol>
<li><strong>View the raw HTML.</strong> Use view-source or fetch the URL without scripts. Is the main content, the title and the links there?</li>
<li><strong>Compare with the rendered page.</strong> Google says to test how it crawls and renders a URL with the URL Inspection Tool in Search Console or the Rich Results Test. ${D.inspect} of ${D.ok} guides mention such tools.</li>
<li><strong>Check links.</strong> Every navigation link should be an anchor with an href.</li>
<li><strong>Check robots.txt.</strong> Make sure scripts, styles and data the page needs are not blocked.</li>
<li><strong>Check status codes.</strong> A missing page should return a real 404, not a 200 page that says "not found". Google calls this a soft 404 in single-page apps.</li>
<li><strong>Monitor crawling.</strong> Google points to the crawl stats report in Search Console to watch Googlebot and Web Rendering Service activity. See our guide to <a href="/blog/set-up-google-search-console">setting up Search Console</a>.</li>
</ol>
<p>Our <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a> covers the HTML-level checks.</p>

<h2>JavaScript SEO Best Practices</h2>
<ul>
<li><strong>Send the important content in the HTML.</strong> Titles, headings, body text and main links should not depend on a script.</li>
<li><strong>Use anchors with hrefs</strong> for every link you want crawled.</li>
<li><strong>Use the History API,</strong> not URL fragments, for routing.</li>
<li><strong>Keep the canonical consistent.</strong> Google says not to use JavaScript to change the canonical to something other than the one in the original HTML, and that HTML is the best place to set it.</li>
<li><strong>Return honest status codes.</strong> Use 404 for missing pages and 401 for pages behind a login.</li>
<li><strong>Do not block needed files</strong> in robots.txt.</li>
<li><strong>Keep scripts light.</strong> Heavy scripts also hurt user experience, which our <a href="/blog/improve-core-web-vitals">Core Web Vitals guide</a> covers.</li>
</ul>

<h2>How to Make Your JavaScript SEO Friendly: Common Mistakes</h2>
<ul>
<li><strong>Treating "Google runs JavaScript" as "no problem".</strong> It does, but later and with limits, and other bots may not.</li>
<li><strong>Click-only navigation.</strong> Menus and filters built from buttons leave pages with no crawlable path.</li>
<li><strong>Soft 404s.</strong> A client-side router that shows an error message with a 200 status.</li>
<li><strong>Blocked resources.</strong> A rule that hides the very script that builds the page.</li>
<li><strong>Relying on dynamic rendering for the long term.</strong> Google calls it a workaround.</li>
<li><strong>Changing key tags after load.</strong> JavaScript can set a title and meta description, but conflicting values between the raw and rendered page make it harder to know which one counts.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Google processes JavaScript in three phases, and rendering can happen after crawling, sometimes later than a few seconds.</li>
<li>Links must be anchors with an href. Injecting them with script is fine, using onclick or javascript: links is not.</li>
<li>Google calls dynamic rendering a workaround and recommends server-side rendering, static rendering or hydration.</li>
<li>Only ${D.deprecated} of ${D.ok} ranking guides say that, so check the date and Google's own page before copying advice.</li>
<li>On ${O.pages} of our own pages, every heading and image was in the raw HTML. Only a table of contents was built by script.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['Does Google run JavaScript?', 'Yes. Google says it processes JavaScript with an evergreen version of Chromium, but it can happen after the first crawl and has some limits.'],
    ['What is JavaScript SEO?', 'It is making sure content and links created or changed by JavaScript can be crawled, rendered and indexed by search engines.'],
    ['Is it bad to use JavaScript for SEO content?', 'Not by itself. Content that appears in the rendered page can be indexed, but content in the HTML is found sooner and by more bots.'],
    ['Can Google follow JavaScript links?', 'Only if the finished markup is an anchor element with an href attribute. Links that use onclick or javascript: in the href are not crawlable.'],
    ['What is dynamic rendering?', 'Serving a server-rendered page to bots and a client-side page to people. Google calls it a workaround, not a long-term solution.'],
    ['How do I check what Google sees?', 'Use the URL Inspection Tool in Search Console or the Rich Results Test to see the rendered page, and compare it with the raw HTML.'],
    ['Should I use server-side rendering?', 'Google recommends server-side rendering, static rendering or hydration for content that should rank, because the HTML arrives complete.'],
    ['Are URL fragments okay for SPA routing?', 'No. Google says not to use fragments to load different page content and recommends the History API.'],
    ['Does a script-built table of contents hurt SEO?', 'No. On our pages it only adds links within the page and the headings are already in the HTML.']
  ])}
`
});
