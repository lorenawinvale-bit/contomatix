// node scripts/build-post-subdomain-vs-subdirectory.js [--write], data: 6 readable ranking pages (Google US, 3 Nov 2026), Google's pages on multi-regional sites, localized versions and robots.txt read the same day, the host of 377 unique URLs from 50 of our saved SERP files, and the hosts of the 433 pages in our Search Console export of 28 Oct 2026. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-subdomain-vs-subdirectory-2026-11-03.json');
const SP = require('../../keyword-research/serp-subdomain-split-2026-11-03.json');
const GD = require('../../keyword-research/google-docs-subdomain-2026-11-03.json');
const q = s => s.replace(/[‘’]/g, "'");
for (const s of ['Subdomains with gTLD de.example.com Pros: Easy to set up Allows different server locations Easy separation of sites Cons: Users might not recognize geotargeting from the URL alone', 'Subdirectories with gTLD example.com/de/ Pros: Easy to set up Low maintenance (same host) Cons: Users might not recognize geotargeting from the URL alone Single server location Separation of sites harder', 'Last updated 2025-12-10 UTC']) if (!q(GD.multi.text).includes(s)) throw new Error('Google multi text changed: ' + s.slice(0, 40));
if (!q(GD.localized.text).includes('are not used by Google to determine the target audience for the page') || !GD.localized.text.includes('Last updated 2026-09-21 UTC')) throw new Error('Google localized text changed');
for (const s of ["It's not valid for other subdomains, protocols, or port numbers.", "It's valid for all files in all subdirectories on the same host, protocol, and port number.", 'Last updated 2026-10-23 UTC']) if (!q(GD.robots.text).includes(s)) throw new Error('Google robots text changed: ' + s.slice(0, 40));
const ok = R.filter(o => o.status === 200 && o.words > 400); const c = k => ok.filter(o => o[k]).length; const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { listed: 7, ok: ok.length, median: (w[2] + w[3]) / 2, google: c('googleSays'), caseStudy: c('caseStudy'), link: c('link'), crawl: c('crawl'), intl: c('international'), shop: c('ecommerce'), blog: c('blog'), cdn: c('cloudflare'), example: c('example'), cms: c('hubspot'), robots: c('robots'), gsc: c('gsc'), when: c('when') };
const exp = { listed: 7, ok: 6, median: 1637, google: 4, caseStudy: 2, link: 6, crawl: 3, intl: 5, shop: 4, blog: 6, cdn: 2, example: 4, cms: 3, robots: 1, gsc: 2, when: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const sub = Object.fromEntries(SP.subdomains); const help = SP.onSubdomain - sub.blog;
if (SP.urlsUnique !== 377 || SP.onSubdomain !== 18 || SP.pct !== 4.8 || sub.blog !== 4 || sub.developers !== 6 || help !== 14) throw new Error('subdomain split changed ' + JSON.stringify(SP.subdomains));
const OWN = { pages: 433, main: 431, www: 2, blog: 374, tools: 38, services: 10, team: 6 }; // Search Console export 28 Oct 2026 (Pages.csv), all on contomatix.com
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`; const f = n => n.toLocaleString('en-US');
console.log(JSON.stringify(D), SP.pct, help);
build({
  slug: 'subdomain-vs-subdirectory', category: 'Technical SEO', author: 'Hamza Siddiqui', date: '2026-11-03',
  title: 'Subdomain vs Subdirectory SEO: 377 Ranking URLs Checked',
  excerpt: `Subdomain vs subdirectory for SEO: what Google says, what ${D.ok} guides claim, and how many of ${SP.urlsUnique} ranking URLs we checked sit on a subdomain.`,
  donut: [['SUBDOMAIN VS', 'SUBDIRECTORY'], [['The Short', 'Answer'], 'What Google Says', ['What 6 Guides', 'Claim'], 'Our 377 URLs', ['When Each', 'Fits']]],
  cover: { badge: 'OUR OWN DATA', search: 'subdomain vs subdirectory', card: `Ranking URLs checked: ${SP.urlsUnique}`, lines: [`On a subdomain: ${SP.onSubdomain}`, `Share: ${SP.pct}%`, `Blog subdomains: ${sub.blog}`, `Our own pages: ${OWN.pages}, all one host`, `Guides quoting Google: ${D.google} of ${D.ok}`], last: 'URLs read 3 Nov 2026', big: `${SP.pct}%`, k1: 'of ranking URLs sit on a subdomain', k2: 'Google lists both as valid', title: 'Subdomain vs Subdirectory', sub: 'What 377 ranking URLs show' },
  info: { title: `Subdomain vs Subdirectory: ${D.ok} Guides Read`, sub: 'Organic results for "subdomain vs subdirectory seo", Google US, 3 November 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Talk about links', sub: 'authority or equity', n: D.link }, { label: 'Cover the blog case', sub: 'where to host it', n: D.blog }, { label: 'Cover international sites', sub: 'languages, countries', n: D.intl }, { label: 'Quote what Google says', sub: 'a statement', n: D.google }, { label: 'Give a case study', sub: 'a real move', n: D.caseStudy }],
    rightTitle: 'Our own scan', rightTag: 'URLs read 3 Nov 2026', items: [{ t: `${SP.onSubdomain} of ${SP.urlsUnique}`, s: 'ranking URLs on a subdomain' }, { t: `${sub.blog}`, s: 'of those are blog subdomains' }, { t: `${OWN.pages} of ${OWN.pages}`, s: 'of our pages on one host' }],
    big: `${SP.pct}%`, noteHtml: `of ${SP.urlsUnique} ranking URLs sit on a <em>subdomain</em>. Most are help, docs or forum sites.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for subdomain vs subdirectory SEO say`, sub: `Organic results read on 3 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Talk about links or authority', `${D.link} of ${D.ok}`], ['Cover the blog question', `${D.blog} of ${D.ok}`], ['Cover international sites', `${D.intl} of ${D.ok}`], ['Quote what Google says', `${D.google} of ${D.ok}`], ['Cover online stores', `${D.shop} of ${D.ok}`], ['Show an example', `${D.example} of ${D.ok}`], ['Mention crawling', `${D.crawl} of ${D.ok}`], ['Mention a CMS or website builder', `${D.cms} of ${D.ok}`], ['Mention a CDN or proxy', `${D.cdn} of ${D.ok}`], ['Give a real case study', `${D.caseStudy} of ${D.ok}`], ['Mention Search Console', `${D.gsc} of ${D.ok}`], ['Mention robots.txt', `${D.robots} of ${D.ok}`], ['Say when to use each', `${D.when} of ${D.ok}`]] },
    google: { title: "Google's own pros and cons for each structure", sub: "From Google's page on multi-regional sites, read on 3 November 2026 (page last updated 10 December 2025).", head: ['Structure', 'Google lists'], lastBold: false,
      rows: [['Subdomain (de.example.com)', 'Pros: easy to set up, different server locations, easy separation'], ['Subdomain: cons', 'Users may not recognise geotargeting from the URL alone'], ['Subdirectory (example.com/de/)', 'Pros: easy to set up, low maintenance, same host'], ['Subdirectory: cons', 'Single server location, separation of sites harder, geotargeting may be unclear']] },
    ours: { title: 'Which of 377 ranking URLs sit on a subdomain', sub: 'Unique URLs from 50 of our saved Google US result files, October and November 2026, grouped by host.', head: ['Group', 'URLs'], lastBold: false,
      rows: [['All unique ranking URLs', String(SP.urlsUnique)], ['On the main domain or www', String(SP.urlsUnique - SP.onSubdomain)], ['On a subdomain', String(SP.onSubdomain)], ['  help, docs, forum or learning sites', String(help)], ['  blog subdomains', String(sub.blog)]] }
  },
  content: h => `${h.updated}

<p>A <strong>subdomain</strong> is a prefix before your main domain, such as blog.example.com. A <strong>subdirectory</strong> (or subfolder) is a path after it, such as example.com/blog/. The SEO question is whether to put a section of your site, usually the blog, a shop or another language, on one or the other. <strong>Google does not say that one ranks better.</strong> Its own page on site structure lists both as valid options and gives pros and cons about setup, servers and separation, not ranking. We read ${D.ok} pages that rank for "subdomain vs subdirectory SEO" on 3 November 2026: all ${D.link} talk about links or authority, but only ${D.google} quote what Google says. Then we looked at the host of ${SP.urlsUnique} URLs that ranked in our own research: ${SP.onSubdomain} of them (${SP.pct}%) are on a subdomain.</p>

<p>This guide gives the short answer, shows what Google says, compares what the guides claim, and shares our own numbers. Then it covers when each structure fits and how to check or move one. If you are planning a move, read our <a href="/blog/seo-site-migration">site migration guide</a> first.</p>

<h2>Subdomain vs Subdirectory SEO: The Short Answer</h2>
<p>For most sites, a subdirectory is the simpler choice: it keeps everything on one host, so there is one site to manage and measure. A subdomain makes sense when a section is truly separate, such as a help centre on its own platform, an app, or a different team's site. We have no ranking test that proves one beats the other, so we do not claim one. What we can show is what Google documents and what we measured. Are subdomains bad for SEO? Google does not say so, and ${SP.onSubdomain} of the ${SP.urlsUnique} URLs we checked rank from one. But a subdomain is a separate host with its own setup, and that is where the extra work, and the risk of mistakes, lies.</p>

<h2>Subdomain vs Subfolder: What Each One Is</h2>
<p>The difference between a domain and a subdomain is where the name sits. In shop.example.com, "example.com" is the root domain and "shop" is the subdomain. In example.com/shop/, the same word is a subdirectory, a folder on the same host. People also say subfolder, and it means the same thing as subdirectory. A root domain vs subdomain comparison is a comparison of the main site with a prefix of it. Three practical facts follow:</p>
<ul>
<li>A subdomain is a different host, so it can be served by a different server, platform or team.</li>
<li>A subdirectory is part of one host, so it shares the same server, certificate and settings.</li>
<li>Rules set per host, such as robots.txt, apply to one but not the other.</li>
</ul>

<h2>What Google Says About Subdomains and Subdirectories</h2>
<p>Google's page on ${L('https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites', 'managing multi-regional and multilingual sites')} has a table of URL structure options. It lists subdomains (de.example.com) with these pros: easy to set up, allows different server locations, and easy separation of sites. The listed con is that users might not recognise geotargeting from the URL alone. It lists subdirectories (example.com/de/) with these pros: easy to set up and low maintenance because they share the same host. The cons are that users might not recognise geotargeting, that there is a single server location, and that separation of sites is harder. Nothing in that table says one ranks higher. The page was last updated on 10 December 2025.</p>
${h.fig('google', 'Table of Google\'s pros and cons: subdomains are easy to set up with different server locations and easy separation, subdirectories are easy to set up and low maintenance on the same host but have a single server location')}
<p>Another Google page, on localised versions, adds a useful note: language-specific subdomains such as en, en-gb, en-us and de "are not used by Google to determine the target audience for the page", so you must map the audience explicitly. That page was last updated on 21 September 2026, and the usual way to map it is hreflang. Our free <a href="/tools/hreflang-generator">hreflang generator</a> builds the tags for either structure.</p>

<h2>What ${D.ok} Ranking Guides Say About Subdomain vs Subdirectory</h2>
${h.fig('serp', 'Table of what 6 pages on subdomain vs subdirectory say: links or authority and the blog question in all 6, international sites in 5, a Google statement in 4 and a real case study in 2')}
<p>The median guide has about ${h.f(D.median)} words. All ${D.ok} talk about links or authority and all ${D.ok} cover the blog question: should the blog live at blog.example.com or example.com/blog/? ${D.intl} cover international sites and ${D.shop} cover online stores. Only ${D.google} quote something Google has said, and only ${D.caseStudy} give a case study from a real move. ${D.robots} mention robots.txt, ${D.gsc} mention Search Console and ${D.when} give a clear "when to use each" section. So the gap is evidence: the guides agree on the arguments, but most do not show data. That is why we measured something.</p>

<h2>We Checked ${SP.urlsUnique} Ranking URLs: How Many Are on a Subdomain?</h2>
<p>Our research for earlier guides saved Google US results for 47 searches, and today's three searches add three more files, 50 in all. We took every unique URL from those files and looked at its host. There are ${SP.urlsUnique} unique URLs. <strong>${SP.onSubdomain} of them (${SP.pct}%) are on a subdomain</strong> other than www, and ${SP.urlsUnique - SP.onSubdomain} are on a main domain or www.</p>
${h.fig('ours', 'Table of 377 ranking URLs: 359 on the main domain or www, 18 on a subdomain, of which 14 are help, docs, forum or learning sites and 4 are blog subdomains')}
<p>Of the ${SP.onSubdomain}, ${help} are help, documentation, forum or learning hosts, such as developers., support., community. and help. sites. ${sub.blog} are blog subdomains. We should be careful about what this shows. It is not a ranking test: the searches were about SEO topics, the sample is small, and ranking depends on much more than the host. It does show two things. Most ranking pages in our research sit on a main domain, and a subdomain can rank: blog subdomains did.</p>
${h.info('Infographic of subdomain vs subdirectory: 18 of 377 ranking URLs sit on a subdomain, 4 of them blog subdomains, all 6 guides talk about links, Google lists both structures as valid, and all 433 of our own pages sit on one host')}

<h2>Our Own Site: ${OWN.pages} Pages, One Host</h2>
<p>We use subdirectories. In our Search Console export of 28 October 2026, all ${OWN.pages} pages with impressions are on contomatix.com (${OWN.main} on the bare domain and ${OWN.www} on www). ${OWN.blog} are under /blog/, ${OWN.tools} under /tools/, ${OWN.services} under /services/ and ${OWN.team} under /team/. It suits us because one host means one set of settings, one sitemap and one robots.txt, and one set of Search Console data. We have not tested a subdomain on our own site, so we cannot say how it would rank, only that the single-host setup has been easy to run.</p>

<h2>When to Use a Subdomain</h2>
<ul>
<li><strong>A separate product or app.</strong> A login area or app at app.example.com is a different thing from your marketing pages.</li>
<li><strong>A different platform.</strong> If your help centre or shop runs on its own software, a subdomain lets you point it there without moving your main site.</li>
<li><strong>Different servers or teams.</strong> Google lists "allows different server locations" as a pro.</li>
<li><strong>Clear separation.</strong> A subdomain is easy to separate, which helps when one section may be sold or handed to another team.</li>
<li><strong>Language or country sites.</strong> Google lists it as an option, but you must still map the audience with hreflang.</li>
</ul>

<h2>When to Use a Subdirectory</h2>
<ul>
<li><strong>A blog that supports the main site.</strong> If the posts are meant to help the same brand rank, keeping them on one host is simpler.</li>
<li><strong>A small or medium site.</strong> One host, one sitemap, one robots.txt and one Search Console property are less to manage.</li>
<li><strong>When you have one team.</strong> The same people can run the whole site.</li>
<li><strong>When you want low maintenance.</strong> Google lists "low maintenance (same host)" as a pro.</li>
</ul>

<h2>Subdomain vs Subdirectory for a Blog</h2>
<p>All ${D.ok} guides cover the blog question, and it is the one most people ask. Our view, from running a blog of 363 posts: put it in a subdirectory unless your blog runs on separate software that cannot live under the main domain. A blog on the same host is a single site to maintain. If you already have a blog on a subdomain, do not move it only because of a guide. Moving has a cost, and we have no data that says the move pays off. If you do move, use 301 redirects from every old URL and follow our <a href="/blog/301-vs-302-redirect">301 vs 302 redirect guide</a>.</p>

<h2>Subdomain vs Subdirectory for International Sites</h2>
<p>${D.intl} of ${D.ok} guides cover this. Google's table lists country-specific domains, subdomains and subdirectories, and rates each on setup, servers, separation and clarity of geotargeting. Whichever you pick, map every version with hreflang, and make each page link to the others. Our <a href="/blog/canonical-hreflang">canonical and hreflang guide</a> covers the mistakes that break the setup, and our <a href="/tools/hreflang-sitemap-validator">hreflang sitemap validator</a> checks a sitemap for them.</p>

<h2>Robots.txt and Subdomains: Each Host Has Its Own</h2>
<p>A mistake that catches people is robots.txt. Google's page on robots.txt (last updated 23 October 2026) says the rules are valid for all files in all subdirectories on the same host, protocol and port number, and that they are not valid for other subdomains, protocols or port numbers. So a robots.txt on example.com does not control blog.example.com, and a "disallow" on the subdomain needs its own file there. With a subdirectory, one file covers the whole host. Our free <a href="/tools/robots-txt-tester">robots.txt tester</a> checks a file, and we explain more in our <a href="/blog/robots-txt-file">robots.txt guide</a>.</p>

<h2>How to Create a Subdomain</h2>
<ol>
<li><strong>Add a DNS record.</strong> At your DNS provider, add an A or CNAME record for the name, such as blog, pointing to the server or service that will host it.</li>
<li><strong>Set up the host.</strong> Tell the server or platform to accept the new name and add a certificate, so the site runs over https.</li>
<li><strong>Add it to Search Console.</strong> Verify the new host or use a domain-level property so you can see its data.</li>
<li><strong>Add robots.txt and a sitemap.</strong> The new host needs its own.</li>
<li><strong>Link between the two.</strong> Add clear links between the main site and the subdomain.</li>
</ol>

<h2>How to Check Whether a Page Is on a Subdomain</h2>
<p>Look at the address. If there is a name before the main domain, other than www, it is a subdomain. In a list of URLs, take the host and compare it with the registered domain. We did that for ${SP.urlsUnique} URLs with a short script. For a site, compare the hosts in your Search Console page report: ours showed one host. Our guide on <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> shows where the page report is.</p>

<h2>Moving From a Subdomain to a Subdirectory (or Back)</h2>
<p>A move is a migration. The checklist is the same either way: map every old URL to its new one, use 301 redirects, update internal links, canonical tags and sitemaps, and watch Search Console for errors. Expect rankings to move for a while as Google processes the change. We would not move without a clear reason, such as retiring a platform or merging two sites. Our <a href="/blog/seo-site-migration">site migration guide</a> has the steps.</p>

<h2>Common Subdomain vs Subdirectory Mistakes</h2>
<ul>
<li><strong>Moving because of a rule of thumb.</strong> Google does not say one ranks better, so do not move without a reason.</li>
<li><strong>Forgetting robots.txt on the new host.</strong> Each subdomain needs its own file.</li>
<li><strong>Leaving the sitemap on the old host.</strong> List URLs on the host they belong to.</li>
<li><strong>Skipping redirects.</strong> A move without 301s throws away the old pages' history.</li>
<li><strong>Assuming a language subdomain targets a country.</strong> Google says it is not used to determine the audience, so use hreflang.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['Are subdomains bad for SEO?', `Google does not say so. Its page on site structure lists subdomains as a valid option with pros and cons about setup and servers, and ${SP.onSubdomain} of the ${SP.urlsUnique} ranking URLs we checked sit on one. A subdomain is a separate host, though, so it needs its own setup.`],
    ['Is a subdomain or a subdirectory better for SEO?', `Google does not say one ranks better. For most sites a subdirectory is simpler to run because everything shares one host. A subdomain fits a truly separate section, such as an app or a help centre on another platform.`],
    ['What is the difference between a domain and a subdomain?', `The domain is the main name, such as example.com. A subdomain is a prefix on it, such as blog.example.com. A subdirectory is a path after it, such as example.com/blog/.`],
    ['What is the difference between a subdomain and a subfolder?', `A subdomain is a different host that can run on a different server. A subfolder, or subdirectory, is a folder on the same host. Subfolder and subdirectory mean the same thing.`],
    ['Should my blog be on a subdomain or a subdirectory?', `We would use a subdirectory unless the blog runs on separate software that cannot sit under the main domain. We have no data that says moving an existing blog pays off.`],
    ['Does robots.txt on my main domain cover my subdomain?', `No. Google says the rules are valid only for the host, protocol and port where the file sits, and are not valid for other subdomains. Each subdomain needs its own robots.txt.`],
    ['Which is better for an international site?', `Google lists country domains, subdomains and subdirectories with pros and cons. Whichever you choose, map each version with hreflang, because Google says language subdomains are not used to determine the audience.`],
    ['How do I create a subdomain?', `Add an A or CNAME record at your DNS provider, set up the host with a certificate, add it to Search Console, give it its own robots.txt and sitemap, and link it from the main site.`],
    ['Can I move from a subdomain to a subdirectory?', `Yes. It is a migration: map each old URL to the new one, use 301 redirects, update links, canonicals and sitemaps, and watch Search Console. Do it only for a clear reason.`]
  ])}

<p>Planning a migration or a new section and unsure where it should live? <a href="/contact">Talk to us</a> and we will check your setup before you move anything.</p>`
});
