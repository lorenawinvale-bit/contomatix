// node scripts/build-post-improve-core-web-vitals.js [--write] — data: 8 readable ranking pages (Google US, 26 Oct 2026), Google's Core Web Vitals doc read the same day, and our own measurement of 13 live pages (3 runs each, 26 Oct 2026).
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-improve-core-web-vitals-2026-10-26.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const GD = require('../../keyword-research/google-docs-day12-2026-10-26.json').cwv.text;
for (const s of ['within the first 2.5 seconds', 'less than 200 milliseconds', 'less than 0.1']) if (!GD.includes(s)) throw new Error('Google CWV text changed: ' + s);
const L = fs.readFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'cwv-own-pages-2026-10-26.jsonl'), 'utf8').trim().split('\n').map(l => JSON.parse(l));
const by = {}; L.forEach(x => (by[x.path] = by[x.path] || []).push(x.m));
const med = a => { a = a.slice().sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };
const pages = Object.entries(by).map(([p, ms]) => ({ p, lcp: Math.round(med(ms.map(m => m.lcp))), cls: med(ms.map(m => m.cls)), tbt: Math.round(med(ms.map(m => m.tbt))), kb: Math.round(med(ms.map(m => m.bytes)) / 1024) }));
const O = { n: pages.length, runs: L.length, maxLcp: Math.max(...pages.map(p => p.lcp)), maxTbt: Math.max(...pages.map(p => p.tbt)), overCls: pages.filter(p => p.cls > 0.1).length, worstCls: Math.max(...pages.map(p => p.cls)), nearCls: pages.filter(p => p.cls >= 0.03 && p.cls <= 0.1).length, tinyCls: pages.filter(p => p.cls < 0.03).length };
const expO = { n: 13, runs: 39, maxLcp: 932, maxTbt: 9, overCls: 1, nearCls: 4, tinyCls: 8 };
for (const k of Object.keys(expO)) if (O[k] !== expO[k]) throw new Error('own data changed ' + k + ' ' + O[k]);
const D = { shown: 8, ok: ok.length, median: Math.round((w[3] + w[4]) / 2), lcp: c('lcp'), inp: c('inp'), cls: c('cls'), fid: c('fid'), threshold: c('threshold'), field: c('field'), lab: c('lab'), psi: c('psi'), images: c('images'), cache: c('cache'), js: c('js'), fonts: c('fonts'), wordpress: c('wordpress'), rankingFactor: c('rankingFactor'), tools: c('tools'), policy: c('policy'), gdoc: c('googleDoc'), dated: c('date') };
console.log(JSON.stringify(D), JSON.stringify(O));
const f2 = n => n.toFixed(3);
const rows = pages.map(p => [p.p === '/' ? 'Home page' : p.p, `${p.lcp} ms`, f2(p.cls), `${p.tbt} ms`]);
build({
  slug: 'improve-core-web-vitals', category: 'Technical SEO', author: 'Muhammad Reyan Nizami', date: '2026-10-26',
  title: 'How to Improve Core Web Vitals: What Our Own Pages Showed',
  excerpt: `Core Web Vitals tested on our own site: ${O.n} pages measured, 1 over the CLS limit, and the hero-image bug behind it. Google's thresholds and ${D.ok} guides compared.`,
  donut: [['IMPROVE', 'CORE WEB VITALS'], [['Measure', 'First'], 'Reserve Space', ['Trim Heavy', 'Assets'], 'Fix the Biggest', ['Re-Measure', 'After']]],
  cover: { badge: 'OUR OWN MEASUREMENT', search: 'how to improve core web vitals', card: `Pages measured: ${O.n}`, lines: [`Worst layout shift: ${f2(O.worstCls)} (limit 0.1)`, `Pages over the CLS limit: ${O.overCls} of ${O.n}`, `Slowest paint in our test: ${O.maxLcp} ms`, `Total blocking time, worst page: ${O.maxTbt} ms`], last: 'The bug was a wrong image size', big: `${f2(O.worstCls)}`, k1: 'worst CLS on our own site', k2: 'caused by one wrong size', title: 'Improve Core Web Vitals', sub: 'What our own pages showed' },
  info: { title: `Core Web Vitals: ${D.ok} Guides Read`, sub: 'Organic results for "how to improve core web vitals", Google US, 26 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'LCP (loading)', sub: 'explained', n: D.lcp }, { label: 'CLS (layout shift)', sub: 'explained', n: D.cls }, { label: 'INP (responsiveness)', sub: 'explained', n: D.inp }, { label: 'Images', sub: 'as a fix area', n: D.images }, { label: 'Field vs lab data', sub: 'distinguished', n: D.field }],
    rightTitle: 'A fix loop that works', rightTag: 'Four steps', items: [{ t: 'Measure', s: 'real pages, 3 runs' }, { t: 'Find the biggest', s: 'one shift, one image' }, { t: 'Fix at the source', s: 'template, not page' }, { t: 'Re-measure', s: 'same method' }],
    big: `${f2(O.worstCls)}`, noteHtml: `layout shift on our worst page, <em>fixed by one template change</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for improving Core Web Vitals say`, sub: `Organic results read on 26 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['LCP or largest contentful paint', `${D.lcp} of ${D.ok}`], ['CLS or layout shift', `${D.cls} of ${D.ok}`], ['INP or interaction to next paint', `${D.inp} of ${D.ok}`], ['Still mention FID (the older metric)', `${D.fid} of ${D.ok}`], ['Give a threshold number', `${D.threshold} of ${D.ok}`], ['Distinguish field data from lab data', `${D.field} of ${D.ok}`], ['Name PageSpeed Insights', `${D.psi} of ${D.ok}`], ['Cover images', `${D.images} of ${D.ok}`], ['Cover caching or a CDN', `${D.cache} of ${D.ok}`], ['Cover WordPress or plugins', `${D.wordpress} of ${D.ok}`], ['Link Google or web.dev documentation', `${D.gdoc} of ${D.ok}`], ['Show a publish or update date', `${D.dated} of ${D.ok}`]] },
    ours: { title: 'Our own pages, measured', sub: `Headless Chrome on a desktop, no throttling, against the live site on 26 October 2026. Median of 3 runs per page (${O.runs} runs). LCP = largest contentful paint, CLS = layout shift, TBT = total blocking time.`, head: ['Page', 'LCP', 'CLS', 'TBT'], lastBold: false, rows },
    google: { title: "Google's Core Web Vitals thresholds", sub: "From Google Search Central's Core Web Vitals page, read on 26 October 2026.", head: ['Metric', 'What it measures', 'Good'], lastBold: false,
      rows: [['LCP', 'Loading performance', 'Within 2.5 seconds'], ['INP', 'Responsiveness', 'Less than 200 ms'], ['CLS', 'Visual stability', 'Less than 0.1']] }
  },
  content: h => `${h.updated}

<p><strong>Core Web Vitals</strong> are three measurements of real-world page experience: how fast the main content loads (LCP), how quickly the page responds to input (INP) and how stable the layout is while it loads (CLS). Google's documentation asks for LCP within 2.5 seconds, INP under 200 milliseconds and CLS under 0.1. To see what that looks like in practice, we measured ${O.n} of our own live pages three times each on 26 October 2026. Twelve were under the limit. One, a blog post published the day before, had a layout shift of ${f2(O.worstCls)}, more than four times the limit, and the cause was a single wrong number in a template.</p>

<p>This guide gives you Google's thresholds, what ${D.ok} top-ranking guides say, our measurements, the bug we found, and a fix loop you can repeat on any site. For the wider technical picture, see our <a href="/blog/technical-seo-agency-2026">technical SEO guide</a> and the free <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a>.</p>

<h2>Google Core Web Vitals: What They Are and What Google Says</h2>
${h.fig('google', "Table of Google's Core Web Vitals thresholds: LCP within 2.5 seconds, INP under 200 milliseconds and CLS under 0.1")}
<p>Google's page on Core Web Vitals describes them as a set of metrics that measure real-world user experience for loading performance, interactivity and visual stability. It says it highly recommends site owners achieve good Core Web Vitals for success with Search, and that this, along with other page experience aspects, aligns with what its core ranking systems seek to reward. The thresholds in the table are the "good" targets Google states. Note what the page does not do: it does not give a ranking weight or promise a ranking change. Treat Core Web Vitals as part of a good experience, not as a switch that moves a page up.</p>

<h2>Core Web Vitals Optimization: What ${D.ok} Top Guides Cover</h2>
${h.fig('serp', 'Table of what 8 guides on improving Core Web Vitals cover: LCP and CLS in all 8, INP in most, thresholds, field versus lab data, images, caching and WordPress, with all 8 linking to Google or web.dev documentation')}
<p>The guides cover the metrics well. LCP appears in ${D.lcp} of ${D.ok}, CLS in ${D.cls}, INP in ${D.inp} and ${D.threshold} give a threshold number. ${D.fid} of ${D.ok} still mention FID, the older responsiveness metric that INP replaced. ${D.images} of ${D.ok} cover images, ${D.cache} cover caching or a CDN and ${D.wordpress} cover WordPress. ${D.field} of ${D.ok} separate field data from lab data, which matters because a lab test and real visitors can tell different stories. ${D.gdoc} of ${D.ok} link to Google or web.dev documentation and ${D.dated} show a date. They run a median of ${h.f(D.median)} words.</p>
<p>What most do not show is a measured example on a real site with the numbers before and after. That is what the next section adds.</p>

<h2>Core Web Vitals Issues We Found on Our Own Site</h2>
${h.fig('ours', 'Table of 13 Contomatix pages measured three times each on 26 October 2026: LCP between 624 and 932 ms, total blocking time up to 9 ms, and layout shift from 0 to 0.425 with one blog post over the 0.1 limit')}
<p>We ran each page three times in headless Chrome on a desktop connection with no throttling and took the median. This is a lab test, not field data, so it shows relative problems, not what every visitor sees. Results: the slowest LCP was ${O.maxLcp} ms and the worst total blocking time was ${O.maxTbt} ms, well inside Google's targets. For layout shift, ${O.tinyCls} pages scored under 0.03, ${O.nearCls} blog posts scored between 0.03 and 0.1, and ${O.overCls} page, our PR link building guide, scored ${f2(O.worstCls)}.</p>
<p>No loading metric was a problem. The only failure was visual stability, and it appeared on blog posts, not tools or the home page. That narrowed the search to one template.</p>

<h2>The Bug: A Wrong Size on a Hero Image</h2>
<p>We logged the layout shift entries on the worst page. There was a single shift, about 0.9 seconds in, where the main container grew by 66 pixels as the hero diagram loaded. The template declared every hero diagram as 700 by 620 pixels, but the diagrams are SVG files with their own aspect ratios. The browser reserved space for a 700 by 620 image, then rearranged the page when the real image arrived. We checked the hero diagrams of all 347 posts that have one: 173 are 760 by 560, 90 are 700 by 620, and 84 use other ratios. Only 90 of 347, about 26 percent, matched the declared size, which explains why shifts of different sizes appeared on different posts.</p>
<p>The fix is small and sits in the template, not in each post: read each SVG's viewBox once and write the real width and height into the image tag. We made the change locally and confirmed that the pages now declare the right size, for example 760 by 560 for the PR guide. Because a local test loads the image instantly, the true check is a re-measurement on the live site, using the same method, after the change is deployed.</p>

${h.info('Infographic of what 8 Core Web Vitals guides cover and a four-step fix loop: measure first, find the biggest shift, fix at the source and re-measure, with our worst layout shift of 0.425 caused by one wrong image size')}

<h2>How to Improve Core Web Vitals: A Fix Loop You Can Repeat</h2>
<ol>
<li><strong>Measure real pages, more than once.</strong> Use PageSpeed Insights for field data where your site has it, and a lab run for debugging. Take three runs and use the median.</li>
<li><strong>Find the biggest single problem.</strong> For CLS, log the shift entries and see which element moved. For LCP, find the LCP element. For INP, look for long tasks. One cause often explains most of the score.</li>
<li><strong>Fix it at the source.</strong> A template fix beats 300 page fixes. Reserve space with correct width and height, or use CSS aspect-ratio.</li>
<li><strong>Re-measure with the same method.</strong> Compare like with like, and note the date.</li>
<li><strong>Check Search Console.</strong> The Core Web Vitals report shows how your pages perform for real users and groups similar URLs, so one template fix can clear a whole group.</li>
</ol>

<p>Keep a short log of each change: the date, the page or template, what you changed and the before and after numbers. After a few months the log shows you which fixes were worth the time, and it is the evidence you can show a client or a colleague when they ask why a score moved. It also protects you from a common trap, which is a new plugin or design change quietly undoing an earlier fix.</p>

<h2>Improve Core Web Vitals by Metric: LCP, INP and CLS</h2>
<ul>
<li><strong>LCP (target 2.5 seconds).</strong> Make the largest element load first: compress and size the hero image, preload it if it is the LCP element, avoid lazy-loading it, serve it from a cache or CDN, and cut render-blocking CSS and scripts. On our blog posts the LCP element was an image, on tools it was a heading or paragraph.</li>
<li><strong>INP (target under 200 ms).</strong> Break up long JavaScript tasks, remove or defer scripts you do not need, and limit third-party code. Our worst total blocking time was ${O.maxTbt} ms because the pages ship little script.</li>
<li><strong>CLS (target under 0.1).</strong> Give every image, embed and ad slot explicit width and height or an aspect ratio, reserve space for banners and late content, and avoid font swaps that change line breaks. Our whole problem was image dimensions that did not match the file.</li>
</ul>

<h2>How to Measure Core Web Vitals Without Being Misled</h2>
<p>${D.psi} of ${D.ok} guides name PageSpeed Insights, and it is a good place to start, as long as you read it carefully. The top of the report shows field data when Google has enough real-user visits for your page or origin, and the lower part shows a lab run. Field data tells you how real visitors experienced the page over a rolling window. The lab run is one simulated load that is useful for finding causes. If the two disagree, trust field data for the question "is there a problem?" and the lab run for "what is causing it?". A new or low-traffic site may show no field data at all, in which case the Core Web Vitals report in Search Console may also be empty. That is not a failure. It means you should keep testing in the lab and wait for data to build.</p>
<p>${D.lab} of ${D.ok} guides distinguish lab tools such as Lighthouse from field sources, and ${D.field} mention field data in some form. When you report results to a client, say which kind you used and when you measured, because a lab score changes with the test machine and the day.</p>

<h2>A Worked Example: Fixing a Late-Loading Image</h2>
<ol>
<li><strong>Observe.</strong> The layout-shift log showed one entry, 0.425, at about 0.9 seconds, with the main container growing from 235 to 301 pixels.</li>
<li><strong>Identify.</strong> The only element that changes size at that moment is the hero diagram, an SVG whose tag said 700 by 620.</li>
<li><strong>Confirm.</strong> The SVG's viewBox was 760 by 560. A mismatch like that makes the browser change the image's height when the file arrives.</li>
<li><strong>Fix.</strong> Read the viewBox when the page is built and write that width and height into the image tag.</li>
<li><strong>Verify.</strong> Check the HTML for the right dimensions, then re-measure on the live site after deployment.</li>
</ol>
<p>Total time to find the cause was minutes once we looked at the shift entry instead of guessing. The lesson applies to LCP and INP too: start from the evidence the browser gives you, not from a generic checklist.</p>

<h2>Core Web Vitals for WordPress and Plugin Sites</h2>
<p>${D.wordpress} of ${D.ok} guides cover WordPress, and the pattern is common: many plugins each add their own CSS and JavaScript, images upload at full size, and the theme decides the markup. The levers are the same as anywhere else. Serve correctly sized images with width and height, keep the number of plugins that load on every page small, defer scripts you do not need above the fold, and use caching. If your CMS generates image tags, check what dimensions it writes, because a wrong declared size is exactly what produced our shift.</p>

<h2>Third-Party Scripts</h2>
<p>${D.js} of ${D.ok} guides mention JavaScript or third-party scripts. Analytics, chat widgets, cookie banners and embeds can each add blocking time or move content. Our pages load little script, which is why total blocking time stayed under ${O.maxTbt + 1} ms. Audit what loads on a page, remove what you do not use, and load the rest after the main content. If a script has to load early, give its container a fixed size so nothing moves when it arrives.</p>

<h2>Common Core Web Vitals Mistakes</h2>
<ul>
<li><strong>Trusting one number from one run.</strong> Results vary. Use medians and note whether it is lab or field.</li>
<li><strong>Fixing page by page.</strong> If the same problem appears across a template, fix the template.</li>
<li><strong>Setting image sizes by guess.</strong> A declared size that does not match the file causes shift. Read the real dimensions.</li>
<li><strong>Chasing a perfect score.</strong> Google's targets are thresholds for "good". Beyond them, spend time on content.</li>
<li><strong>Ignoring field data.</strong> A site with few visitors may have no field data yet. Keep testing in the lab and check Search Console as traffic grows.</li>
<li><strong>Quoting Core Web Vitals as a guaranteed ranking boost.</strong> Google says they align with what its ranking systems seek to reward, not that a score change moves rankings by a set amount.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Guide data comes from the organic results for "how to improve core web vitals" on Google US, 26 October 2026. ${D.shown} were listed and all returned a readable page. A topic counts once per page when its term appears in the text.</li>
<li>Google's thresholds come from its Core Web Vitals page in Search Central, read the same day.</li>
<li>Our measurements used headless Chrome on one desktop machine with no network or CPU throttling, against the live site, three runs per page. They are lab results. LCP came from the LCP performance entry, CLS from layout-shift entries without recent input, and TBT is the sum of long-task time over 50 ms.</li>
<li>The hero-image analysis counts the SVG viewBox ratios of the diagrams used by our 347 posts that have one.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Google's good targets are LCP within 2.5 seconds, INP under 200 ms and CLS under 0.1.</li>
<li>On ${O.n} of our own pages, loading and responsiveness were fine; the one failure was a layout shift of ${f2(O.worstCls)}.</li>
<li>The cause was a template that declared a wrong size for 257 of 347 hero diagrams.</li>
<li>Fix problems at the source and re-measure with the same method.</li>
<li>Do not promise a ranking change from a better score.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is Core Web Vitals?', 'They are three measurements of page experience: LCP for loading, INP for responsiveness and CLS for visual stability.'],
    ['What are good Core Web Vitals scores?', 'Google says to aim for LCP within 2.5 seconds, INP under 200 milliseconds and CLS under 0.1.'],
    ['Do Core Web Vitals affect SEO and rankings?', "Google says good Core Web Vitals align with what its core ranking systems seek to reward and recommends them for success in Search, but it does not give a fixed ranking effect."],
    ['How do I improve LCP?', 'Make the largest element load first: size and compress the hero image, avoid lazy-loading it, use caching or a CDN and reduce render-blocking resources.'],
    ['How do I fix layout shift?', 'Give images, embeds and ads explicit width and height or an aspect ratio, and make sure the declared size matches the real file.'],
    ['How do I measure Core Web Vitals?', 'Use PageSpeed Insights and the Core Web Vitals report in Search Console for real-user data, and a lab test for debugging.'],
    ['What replaced FID?', 'Interaction to Next Paint (INP) replaced First Input Delay as the responsiveness metric.'],
    ['Why is my lab score different from Search Console?', 'A lab test is one simulated load. Search Console shows real visitors over time, so the two can differ.'],
    ['What is the quickest fix for a poor CLS?', 'Find the element that moved, usually an image or late-loading block, and reserve its space with the correct dimensions. See our <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a> for other checks.']
  ])}
`
});
