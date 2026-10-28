// node scripts/build-post-seo-site-migration.js [--write] — data: 5 readable ranking pages (Google US, 26 Oct 2026), Google's site-move guidance (English) read the same day, and our own URL data (26 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-seo-site-migration-2026-10-26.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = fs.readFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'google-sitemove-en-2026-10-26.txt'), 'utf8');
for (const s of ['generally at least 1 year', 'Avoid chaining redirects', 'follow up to 10 hops', "don't cause a loss in PageRank", 'Small or medium sites: We recommend moving all URLs', 'do them one at a time']) if (!G.includes(s)) throw new Error('Google text changed: ' + s);
const blog = require('../data/blog.json').filter(p => !['improve-core-web-vitals', 'seo-site-migration', 'types-of-schema-markup'].includes(p.slug)); /* counts as measured on 26 Oct 2026, before these posts existed */
const ys = new Set(blog.filter(p => /2026|2025/.test(p.slug)).map(p => p.slug)); let totL = 0, toY = 0; const tg = new Set();
for (const p of blog) for (const m of p.content.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)) { totL++; if (ys.has(m[1])) { toY++; tg.add(m[1]); } }
// Counts measured on 26 Oct 2026 before today's inbound-link patches were added (the live numbers have since moved by a few links).
const O = { posts: 347, yearSlugs: 239, links: 1285, toYear: 785, targets: 239, urls: 406, redirectRules: Object.keys(require('../data/redirects.json')).length };
if (O.redirectRules !== 1) throw new Error('redirect rules changed');
const D = { listed: 8, ok: ok.length, median: w[2], checklist: c('checklist'), redirects: c('redirects'), staging: c('staging'), crawl: c('crawl'), sitemap: c('sitemap'), gsc: c('gsc'), monitor: c('monitor'), trafficDrop: c('trafficDrop'), timeline: c('timeline'), domain: c('domain'), urlMap: c('urlMap'), backlinks: c('backlinks'), benchmark: c('benchmark'), hreflang: c('hreflang'), tools: c('tools'), risk: c('risk'), cost: c('cost'), policy: c('policy'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 8, ok: 5, median: 3924, checklist: 4, redirects: 5, staging: 2, crawl: 5, sitemap: 5, gsc: 5, monitor: 5, trafficDrop: 4, timeline: 4, domain: 4, urlMap: 4, backlinks: 4, benchmark: 4, hreflang: 0, tools: 5, risk: 4, cost: 4, policy: 0, gdoc: 2, dated: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(O));
const pct = Math.round(O.toYear / O.links * 100);
build({
  slug: 'seo-site-migration', category: 'Technical SEO', author: 'Hamza Siddiqui', date: '2026-10-26',
  title: "SEO Site Migration Checklist: Built on Google's Own Guidance",
  excerpt: `SEO site migration checklist from Google's guidance: 301 or 308, no chains, keep redirects a year. ${D.ok} guides read and our own URL data.`,
  donut: [['SEO SITE', 'MIGRATION'], [['Map Every', 'URL'], 'Redirect Once', ['Move In', 'One Step'], 'Watch Search Console', ['Keep Redirects', 'A Year']]],
  cover: { badge: "GOOGLE'S GUIDANCE + OUR DATA", search: 'seo site migration', card: `Guides read: ${D.ok} of ${D.listed}`, lines: ['Redirect type: 301 or 308', 'Avoid redirect chains', 'Keep redirects: at least 1 year', `Our posts with a year in the URL: ${O.yearSlugs} of ${O.posts}`], last: 'Plan the map before the move', big: `${O.toYear}`, k1: 'internal links on our site', k2: 'point at year-in-URL posts', title: 'SEO Site Migration', sub: 'A checklist built on Google\'s guidance' },
  info: { title: `Site Migration: ${D.ok} Guides Read`, sub: 'Organic results for "seo site migration", Google US, 26 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Redirects', sub: 'covered', n: D.redirects }, { label: 'Search Console', sub: 'or change of address', n: D.gsc }, { label: 'Monitoring after launch', sub: 'covered', n: D.monitor }, { label: 'A URL map', sub: 'covered', n: D.urlMap }, { label: 'Staging or a test site', sub: 'covered', n: D.staging }],
    rightTitle: 'Google: three rules', rightTag: 'From its site move guide', items: [{ t: '301 or 308', s: 'permanent redirects' }, { t: 'No chains', s: 'redirect to the final URL' }, { t: 'Keep a year', s: 'redirects, at least' }],
    big: `${pct}%`, noteHtml: `of our internal links point at posts with a <em>year in the URL</em>, a future migration cost.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for SEO site migration say`, sub: `Organic results read on 26 October 2026 (${D.listed} listed, ${D.ok} readable; 2 blocked our request, 1 was a forum thread). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Redirects', `${D.redirects} of ${D.ok}`], ['Crawling the old and new site', `${D.crawl} of ${D.ok}`], ['Sitemaps', `${D.sitemap} of ${D.ok}`], ['Search Console or change of address', `${D.gsc} of ${D.ok}`], ['Monitoring after launch', `${D.monitor} of ${D.ok}`], ['A checklist', `${D.checklist} of ${D.ok}`], ['A URL map', `${D.urlMap} of ${D.ok}`], ['Benchmarking before the move', `${D.benchmark} of ${D.ok}`], ['A traffic dip or fluctuation', `${D.trafficDrop} of ${D.ok}`], ['A staging or test site', `${D.staging} of ${D.ok}`], ['hreflang', `${D.hreflang} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`]] },
    google: { title: "Google's site move rules, in short", sub: 'From the site move with URL changes guide in Google Search Central, read in English on 26 October 2026.', head: ['Topic', 'What Google says'], lastBold: false,
      rows: [['Redirect type', 'Server-side permanent redirects such as 301 and 308'], ['Chains', 'Avoid chaining. Googlebot can follow up to 10 hops, but redirect to the final destination'], ['PageRank', "301 and other permanent redirects don't cause a loss in PageRank"], ['Small or medium sites', 'Move all URLs at once'], ['Large sites', 'May move one section at a time'], ['Several changes', 'Do them one at a time, such as domain first and layout later'], ['How long to keep redirects', 'As long as possible, generally at least 1 year']] },
    ours: { title: 'What a rename would cost our own site', sub: 'Counts from our own data, 26 October 2026: 347 blog posts, 406 URLs in the sitemap, and the internal links in post bodies.', head: ['Measure', 'Count'], lastBold: false,
      rows: [['URLs in our sitemap', String(O.urls)], ['Blog posts', String(O.posts)], ['Posts with a year in the URL', `${O.yearSlugs} (${Math.round(O.yearSlugs / O.posts * 100)}%)`], ['Internal links in post bodies', h => h], ['Internal links pointing at year-in-URL posts', `${O.toYear} (${pct}%)`], ['Year-in-URL posts that are linked from another post', `${O.targets} of ${O.yearSlugs}`], ['Redirect rules we maintain today', String(O.redirectRules)]].map(r => [r[0], typeof r[1] === 'function' ? String(O.links) : r[1]]) }
  },
  content: h => `${h.updated}

<p><strong>An SEO site migration</strong> is any move that changes how search engines reach your content: a new domain, HTTP to HTTPS, a new URL structure or a new platform. Google's own guidance on site moves with URL changes gives clear rules: use server-side permanent redirects such as 301 or 308, avoid redirect chains, move small and medium sites all at once, change one thing at a time, and keep the redirects for as long as possible, generally at least one year. We read ${D.ok} ranking pages for the topic on 26 October 2026, and all ${D.ok} cover redirects, but ${D.hreflang} mention hreflang and only ${D.gdoc} link to Google's guidance.</p>

<p>This guide turns Google's rules into a before, during and after checklist, compares them with what the ranking pages say, and shows from our own data why a URL plan matters: ${O.yearSlugs} of our ${O.posts} posts have a year in the URL, and ${O.toYear} of our ${O.links} internal blog links point at them. For the tools, see the <a href="/tools/redirect-mapper">redirect mapper</a>, the <a href="/tools/sitemap-url-extractor">sitemap URL extractor</a> and our guide to <a href="/blog/how-to-create-a-sitemap">creating a sitemap</a>.</p>

<h2>What Is Site Migration in SEO?</h2>
<p>Google's guide lists examples of site moves with URL changes: a change from HTTP to HTTPS, a domain name change, and changes to the URL structure. Moves without URL changes, such as switching hosts, are simpler because the addresses stay the same. The rules below apply when URLs change, which is where most ranking losses happen. ${D.domain} of ${D.ok} ranking pages also treat a domain change as the main case.</p>

<h2>SEO Site Migration: What ${D.ok} Ranking Pages Cover</h2>
${h.fig('serp', 'Table of what 5 SEO site migration pages cover: redirects, crawling, sitemaps, Search Console and monitoring in 5 of 5, checklist and URL map in 4, a traffic dip in 4, staging in 2, hreflang in 0 and Google documentation in 2')}
<p>The pages agree on the core: redirects, crawling both versions, sitemaps, Search Console and monitoring each appear in ${D.redirects} of ${D.ok}. ${D.urlMap} of ${D.ok} explain a URL map, ${D.benchmark} say to benchmark before the move and ${D.trafficDrop} warn of a temporary traffic dip. ${D.staging} of ${D.ok} mention a staging site, ${D.backlinks} cover backlinks and ${D.tools} name tools. Two of the eight listed pages blocked our request and one was a forum thread, so we do not count them. The ${D.ok} readable pages run a median of ${h.f(D.median)} words, and ${D.dated} shows a date.</p>
<p>What is thin is the primary source: ${D.gdoc} of ${D.ok} link to Google's documentation and ${D.policy} name its policies. That matters because Google's guide has specific, checkable rules, which we set out next.</p>

<h2>Site Migration Guide: Google's Site Move Rules</h2>
${h.fig('google', "Table of Google's site move rules: use 301 or 308 permanent redirects, avoid chains, permanent redirects do not cause PageRank loss, move small and medium sites at once, change one thing at a time, and keep redirects at least one year")}
<p>The rules in the table are quotations and close paraphrases from Google's guide. Three deserve emphasis. First, Google recommends server-side permanent redirects, and says that 301 and other permanent redirects do not cause a loss in PageRank, so a correct redirect is not a ranking cost. Second, it says to avoid chaining redirects: Googlebot can follow up to 10 hops, but you should redirect straight to the final destination, because chains add latency and not every browser supports long ones. Third, it asks you to keep the redirects for as long as possible, generally at least one year, so that Google can transfer signals to the new URLs, including reassigning links on other sites. A redirect that you remove after a few weeks undoes the benefit.</p>

<h2>SEO Site Migration Checklist: Before, During and After</h2>
<h3>Before the move</h3>
<ol>
<li><strong>Benchmark.</strong> Record organic traffic, top pages, indexed pages and rankings for your main keywords. ${D.benchmark} of ${D.ok} guides recommend it.</li>
<li><strong>List every URL.</strong> Use your CMS, your sitemap and Search Console's list of linked pages. The <a href="/tools/sitemap-url-extractor">sitemap URL extractor</a> pulls a clean list from your current sitemap.</li>
<li><strong>Map old to new.</strong> Decide where each old URL redirects. Google suggests tools such as a database or URL rewrite rules for common patterns. The <a href="/tools/redirect-mapper">redirect mapper</a> matches URLs, flags weak matches and exports Apache or Nginx rules.</li>
<li><strong>Build on staging.</strong> Test redirects, canonical tags and robots rules before launch. Check canonicals with the <a href="/tools/canonical-tag-checker">canonical tag checker</a> and robots rules with the <a href="/tools/robots-txt-tester">robots.txt tester</a>.</li>
<li><strong>Set up Search Console.</strong> Verify both the old and the new site, including HTTP and HTTPS and www variants where relevant, and make sure verification survives the move.</li>
<li><strong>Prepare the new sitemap.</strong> It should list only the new URLs. Validate it with the <a href="/tools/sitemap-validator">sitemap validator</a>.</li>
</ol>
<h3>During the move</h3>
<ol>
<li><strong>Change one thing at a time.</strong> Google's example: move to a new domain, then change the layout, not both at once.</li>
<li><strong>Turn on server-side 301 or 308 redirects</strong> from each old URL to its mapped new URL, straight to the final destination.</li>
<li><strong>Move small and medium sites all at once;</strong> large sites can move in sections.</li>
<li><strong>Update internal links and canonicals</strong> so each new URL has a self-referencing canonical and links point to new URLs, not through redirects.</li>
<li><strong>Submit the new sitemap.</strong></li>
</ol>
<h3>After the move</h3>
<ol>
<li><strong>Monitor both sites.</strong> Watch traffic, crawl errors and the Sitemaps report in Search Console for both.</li>
<li><strong>Crawl the old URLs.</strong> Check that each one reaches its target in one hop with a permanent status. See our guide to <a href="/blog/blocked-by-robots-txt">robots.txt blocks</a> if crawling is blocked.</li>
<li><strong>Update external links and profiles</strong> you control, such as social profiles, directories and citations. See <a href="/blog/directory-links">directory links</a>.</li>
<li><strong>Re-upload any disavow file</strong> for the new site, if you had one. Our <a href="/blog/google-disavow-backlinks">disavow guide</a> explains when to use it.</li>
<li><strong>Keep the redirects at least one year,</strong> and longer if old URLs still get links or visits.</li>
</ol>

<h2>What Our Own URLs Say About Migration Risk</h2>
${h.fig('ours', 'Table of what a URL rename would cost Contomatix: 406 sitemap URLs, 347 posts, 239 posts with a year in the URL, 1,285 internal links in post bodies, 785 pointing at year-in-URL posts, and 1 redirect rule maintained today')}
<p>We checked our own data on 26 October 2026. ${O.yearSlugs} of our ${O.posts} blog posts (${Math.round(O.yearSlugs / O.posts * 100)}%) have a year in the URL, such as 2026. Of the ${O.links} internal links inside post bodies, ${O.toYear} (${pct}%) point at those posts, and all ${O.yearSlugs} of them are linked from at least one other post. We maintain ${O.redirectRules} redirect rule today. If we renamed those URLs to remove the year, we would need ${O.yearSlugs} redirects, we would need to update up to ${O.toYear} internal links so they do not pass through redirects, and we would need to keep all of it for a year or more.</p>
<p>The lesson is not that years in URLs are wrong, but that URL choices are migration debt. Every URL that other pages link to becomes an item on a future redirect map, so choose URLs you can live with, and do not rename without a reason. We have no plan to rename ours.</p>

${h.info('Infographic of what 5 SEO site migration pages cover: redirects 5, Search Console 5, monitoring 5, URL map 4, staging 2, plus three Google rules: use 301 or 308, avoid chains and keep redirects at least a year')}

<h2>How to Build the URL Map for a Site Migration</h2>
<p>${D.urlMap} of ${D.ok} guides mention a URL map, and Google's guide gives the method. Start with a full list of old URLs, then decide where each should redirect. Google's guide suggests getting URLs from several sources: the URLs that get the most traffic, the pages with internal and external links shown in Search Console, and a listing from your content management system. Together they cover pages that rank, pages that earn links and pages nobody checks.</p>
<ol>
<li><strong>Group by pattern.</strong> If the move is a clean rule, such as a domain change that keeps paths, one wildcard server-side redirect handles it, as Google's guide notes.</li>
<li><strong>Handle exceptions by hand.</strong> Pages that merge, split or disappear need individual decisions. A page with no equivalent should redirect to the closest relevant page, not to the home page.</li>
<li><strong>Prioritise by value.</strong> Check your top pages by traffic and by links first. Losing a redirect on a page that earns links costs more than on a page nobody visits.</li>
<li><strong>Review the weak matches.</strong> The redirect mapper flags low-confidence matches so you can check them.</li>
<li><strong>Keep the map.</strong> It is your audit trail after launch and your to-do list for cleaning up chains later.</li>
</ol>

<h2>How to Test Redirects After a Site Migration</h2>
<ul>
<li><strong>Sample before launch.</strong> Test a few URLs from every pattern on staging and confirm that each reaches the right page in a single hop with a permanent status.</li>
<li><strong>Crawl the full list after launch.</strong> A crawler that follows redirects shows chains, loops and wrong targets. ${D.tools} of ${D.ok} guides name tools for this.</li>
<li><strong>Check the status code.</strong> Use 301 or 308. Temporary redirects tell search engines the old URL may return.</li>
<li><strong>Check internal links.</strong> Links inside your site should point straight to the new URLs so users and crawlers do not pass through redirects every time.</li>
<li><strong>Check canonical tags and sitemaps.</strong> Each new page should have a self-referencing canonical, and the sitemap should list new URLs only.</li>
<li><strong>Read the Search Console reports</strong> for both properties, including the Sitemaps report that shows how many submitted URLs are indexed.</li>
</ul>

<h2>Special Cases</h2>
<ul>
<li><strong>HTTP to HTTPS.</strong> Google's guide lists it as a site move. Get the certificate configured first, redirect HTTP URLs to the HTTPS versions and verify the HTTPS variants in Search Console.</li>
<li><strong>Domain change.</strong> ${D.domain} of ${D.ok} guides discuss it. Move one thing at a time, redirect old URLs to the same paths on the new domain where possible, and update links and profiles you control.</li>
<li><strong>New platform with the same URLs.</strong> If addresses do not change, the risk is lower, but check canonicals, robots rules, redirects, structured data and page speed on the new platform before launch.</li>
<li><strong>Merging sites.</strong> Map each old page to the most relevant new page and expect a longer review period, because you are changing content as well as URLs.</li>
</ul>

<h2>Site Migration Checklist: An Example Timeline</h2>
<p>Google gives no fixed schedule, so this is our own planning template, not a promise of results.</p>
<ol>
<li><strong>Weeks 1 to 2:</strong> benchmark, list URLs, decide scope.</li>
<li><strong>Weeks 3 to 4:</strong> build the URL map, prepare staging, set up Search Console.</li>
<li><strong>Week 5:</strong> test redirects and canonicals, validate the new sitemap, brief everyone on the launch plan.</li>
<li><strong>Launch day:</strong> switch on redirects, submit the sitemap, crawl the old URLs, check key pages by hand.</li>
<li><strong>Weeks 1 to 4 after:</strong> monitor daily at first, fix errors, update links you control.</li>
<li><strong>Months 2 to 12:</strong> review monthly and keep the redirects in place for at least a year.</li>
</ol>

<h2>Common Site Migration Mistakes</h2>
<ul>
<li><strong>Redirecting everything to the home page.</strong> Map each old URL to its closest new page. Google's guide asks for a mapping of old to new URLs.</li>
<li><strong>Redirect chains.</strong> Redirect old URLs straight to the final URL, and fix internal links so they skip redirects.</li>
<li><strong>Changing too much at once.</strong> Domain, platform and design together make problems hard to trace.</li>
<li><strong>Blocking the new site by mistake.</strong> Staging noindex tags or robots rules sometimes reach production. Test before and after launch.</li>
<li><strong>Removing redirects early.</strong> Keep them at least a year.</li>
<li><strong>Not watching Search Console.</strong> A spike in not-found errors after a move is a sign of a missing redirect.</li>
<li><strong>Forgetting hreflang.</strong> ${D.hreflang} of ${D.ok} guides mention it. If you have language or country versions, update the annotations to the new URLs. See our <a href="/tools/hreflang-generator">hreflang generator</a>.</li>
</ul>

<h2>What to Expect After a Move</h2>
<p>${D.trafficDrop} of ${D.ok} guides warn of a temporary dip or fluctuation. Google's guide says that for small and medium sites, moving all URLs at once helps its algorithms detect the move and update its index faster. We found no promise of a timeline in the guide, so do not trust a fixed number of weeks from any source. Measure against your benchmark, look at the Sitemaps report and the indexing reports for both versions, and investigate any page that does not appear in the new location.</p>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "seo site migration" on Google US, 26 October 2026. ${D.listed} were listed; ${D.ok} returned a readable page (two blocked our request and one was a forum thread). A topic counts once per page when its term appears in the text.</li>
<li>Google's rules come from its guide on site moves with URL changes, read in English on the same day.</li>
<li>Our own counts come from our blog data, the redirect rules in our site config and our sitemap on 26 October 2026.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Use server-side 301 or 308 redirects to the final URL, with no chains, and keep them at least a year.</li>
<li>Permanent redirects do not cause a loss in PageRank, according to Google.</li>
<li>Map every URL, change one thing at a time and watch Search Console on both sites.</li>
<li>Only ${D.gdoc} of ${D.ok} ranking pages link Google's guide, so read it yourself.</li>
<li>URLs that other pages link to are migration debt: ${pct}% of our internal links point at year-in-URL posts.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is site migration in SEO?', 'It is a move that changes how search engines reach your content, such as a domain change, HTTP to HTTPS, a new URL structure or a platform change.'],
    ['Which redirect should I use in a site migration?', 'Google recommends server-side permanent redirects such as 301 and 308 from each old URL to its new URL.'],
    ['Do 301 redirects lose PageRank?', "Google's site move guide says 301 and other permanent redirects don't cause a loss in PageRank."],
    ['How long should I keep redirects after a migration?', 'Google says to keep them for as long as possible, generally at least 1 year, so it can transfer signals to the new URLs.'],
    ['Should I avoid redirect chains?', 'Yes. Googlebot can follow up to 10 hops, but Google advises redirecting to the final destination directly.'],
    ['Should I move my site all at once?', 'Google recommends moving all URLs at once for small or medium sites. Large sites can move one section at a time.'],
    ['Will my traffic drop after a migration?', 'It can dip temporarily. Four of the five guides we read warn of this. Benchmark first and compare against it.'],
    ['What tools help with a site migration?', 'A redirect mapper, a sitemap URL extractor, a sitemap validator, a robots.txt tester and a canonical tag checker, plus Search Console for monitoring.'],
    ['Do I need a staging site?', 'It is wise to test redirects, canonicals and robots rules before launch. Two of the five guides mention staging.']
  ])}
`
});
