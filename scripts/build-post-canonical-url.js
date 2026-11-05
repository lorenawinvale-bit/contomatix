// node scripts/build-post-canonical-url.js [--write]. Data: 5 readable ranking pages (Google US, 5 Nov 2026), Google's canonicalization pages read the same day (updated 2026-08-20 and 2026-07-10), a scan of the canonical tag on 369 readable pages that ranked in our October to November 2026 research (50 SERP files + today's), and a scan of our own 427 pages. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-canonical-url-2026-11-05.json');
const G = require('../../keyword-research/google-docs-day18-2026-11-05.json');
const CS = require('../../keyword-research/canonical-scan-2026-11-05.json').summary;
const q = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&ndash;/g, '-').replace(/[‘’]/g, "'");
const GT = q(G.consolidate.text), CT = q(G.canon.text);
for (const s of ['Use absolute paths rather than relative paths with the rel="canonical" link element.', 'Even though relative paths are supported by Google, they can cause problems in the long run', 'Redirects : A strong signal that the target of the redirect should become canonical.', 'rel="canonical" link annotations : A strong signal that the specified URL should become canonical.', 'Sitemap inclusion : A weak signal that helps the URLs that are included in a sitemap become canonical.', "Don't use the robots.txt file for canonicalization purposes.", 'Do include a rel="canonical" link on the canonical page itself (also known as a self-referential canonical).', 'is only accepted if it appears in the <head> section of the HTML', 'Last updated 2026-07-10 UTC']) if (!GT.includes(s)) throw new Error('Google consolidate text changed: ' + s.slice(0, 50));
for (const s of ['indicating a canonical preference is a hint, not a rule', 'Last updated 2026-08-20 UTC', 'whether the page is served over HTTP or HTTPS, redirects, presence of the URL in a sitemap, and rel="canonical" link annotations']) if (!CT.includes(s)) throw new Error('Google canon text changed: ' + s.slice(0, 50));
const ok = R.filter(o => o.status === 200 && o.words > 400); const c = k => ok.filter(o => o[k]).length; const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { listed: 6, ok: ok.length, median: w[2], absolute: c('absolute'), relative: c('relative'), selfRef: c('selfRef'), hint: c('hint'), sitemap: c('sitemap'), redirect: c('redirect'), header: c('header'), hreflang: c('hreflang'), pagination: c('pagination'), params: c('params'), crossDomain: c('crossDomain'), example: c('example'), plugin: c('plugin'), trailing: c('trailing'), duplicate: c('duplicate') };
const exp = { listed: 6, ok: 5, median: 1221, absolute: 2, relative: 2, selfRef: 2, hint: 2, sitemap: 5, redirect: 4, header: 3, hreflang: 3, pagination: 2, params: 3, crossDomain: 1, example: 5, plugin: 2, trailing: 1, duplicate: 5 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
if (CS.readable !== 369 || CS.withTag !== 353 || CS.noTag !== 16 || CS.absolute !== 351 || CS.relative !== 2 || CS.selfRef !== 350 || CS.differs !== 3 || CS.multiple !== 5 || CS.headerCanon !== 6 || CS.urls !== 404) throw new Error('scan changed ' + JSON.stringify(CS).slice(0, 200));
const OWN = { pages: 427, canonical: 427, absolute: 427, self: 427 };
const ABS = (CS.absolute / CS.withTag * 100).toFixed(1), TAG = (CS.withTag / CS.readable * 100).toFixed(1); // 99.4, 95.7
if (ABS !== '99.4' || TAG !== '95.7') throw new Error('pct changed ' + ABS + ' ' + TAG);
console.log(JSON.stringify(D), ABS, TAG);
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
build({
  slug: 'canonical-url', category: 'Technical SEO', author: 'Hamza Siddiqui', date: '2026-11-05',
  title: 'Canonical URL: Relative or Absolute? 369 Pages Checked',
  excerpt: `What a canonical URL is, why Google says use absolute paths, and what we found on ${CS.readable} ranking pages: ${CS.absolute} of ${CS.withTag} canonical tags are absolute.`,
  donut: [['CANONICAL', 'URL'], [['What It', 'Means'], 'What Google Says', ['Relative or', 'Absolute'], 'Our 369-Page Scan', ['How to', 'Check It']]],
  cover: { badge: 'OUR OWN SCAN', search: 'canonical url', card: `Pages scanned: ${CS.readable}`, lines: [`With a canonical tag: ${CS.withTag}`, `Absolute URL: ${CS.absolute}`, `Relative or empty: ${CS.relative}`, `Our own pages: ${OWN.pages}, all absolute`, 'Google: use absolute paths'], last: 'HTML read 5 Nov 2026', big: `${ABS}%`, k1: 'of canonical tags are absolute', k2: 'Google advises against relative ones', title: 'Canonical URL', sub: 'Relative or absolute?' },
  info: { title: `Canonical URL: ${D.ok} Guides Read`, sub: 'Organic results for "canonical url", Google US, 5 November 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Give an example', sub: 'of the tag', n: D.example }, { label: 'Mention sitemaps', sub: 'as a signal', n: D.sitemap }, { label: 'Mention redirects', sub: '301 or similar', n: D.redirect }, { label: 'Mention hreflang', sub: 'language versions', n: D.hreflang }, { label: 'Say it is a hint', sub: 'not a rule', n: D.hint }],
    rightTitle: 'Our own scan', rightTag: 'HTML read 5 Nov 2026', items: [{ t: `${CS.absolute} of ${CS.withTag}`, s: 'canonical tags are absolute' }, { t: `${CS.relative} of ${CS.withTag}`, s: 'are relative or empty' }, { t: `${OWN.pages} of ${OWN.pages}`, s: 'of our own pages are absolute' }],
    big: `${ABS}%`, noteHtml: `of the canonical tags we found use an <em>absolute URL</em>, as Google advises.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for canonical url say`, sub: `Organic results read on 5 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Explain duplicate content', `${D.duplicate} of ${D.ok}`], ['Give an example', `${D.example} of ${D.ok}`], ['Mention sitemaps', `${D.sitemap} of ${D.ok}`], ['Mention redirects', `${D.redirect} of ${D.ok}`], ['Mention hreflang', `${D.hreflang} of ${D.ok}`], ['Mention URL parameters', `${D.params} of ${D.ok}`], ['Mention the HTTP header method', `${D.header} of ${D.ok}`], ['Say it is a hint, not a rule', `${D.hint} of ${D.ok}`], ['Discuss self-referencing tags', `${D.selfRef} of ${D.ok}`], ['Mention absolute URLs', `${D.absolute} of ${D.ok}`], ['Mention relative URLs', `${D.relative} of ${D.ok}`], ['Mention pagination', `${D.pagination} of ${D.ok}`], ['Mention WordPress or a plugin', `${D.plugin} of ${D.ok}`]] },
    google: { title: 'How strongly each method signals the canonical', sub: "From Google's page on specifying a canonical URL, read on 5 November 2026 (page last updated 10 July 2026).", head: ['Method', 'Signal strength'], lastBold: false,
      rows: [['Redirect', 'Strong signal that the target should be canonical'], ['rel="canonical" link', 'Strong signal that the specified URL should be canonical'], ['Sitemap inclusion', 'Weak signal that helps listed URLs become canonical'], ['robots.txt', 'Do not use it for canonicalization'], ['Overall', 'A hint, not a rule']] },
    ours: { title: 'Canonical tags on 369 ranking pages', sub: `HTML of ${CS.urls} pages that ranked in Google US for our research searches, read in October and November 2026 (${CS.readable} readable).`, head: ['Group', 'Pages'], lastBold: false,
      rows: [['Readable pages', String(CS.readable)], ['With a canonical tag', String(CS.withTag)], ['  absolute URL', String(CS.absolute)], ['  relative or empty value', String(CS.relative)], ['  points to the page itself', String(CS.selfRef)], ['  points to another URL', String(CS.differs)], ['No canonical tag', String(CS.noTag)]] }
  },
  content: h => `${h.updated}

<p>A <strong>canonical URL</strong> is the address of the version of a page that Google treats as the main one when several URLs show the same or very similar content. You can suggest it with a <code>rel="canonical"</code> tag, and the next question is whether that tag should hold a relative or an absolute URL. <strong>Google says to use absolute paths.</strong> Its page on specifying a canonical URL says that, even though relative paths are supported, they can cause problems in the long run. We read ${D.ok} pages that rank for "canonical url" on 5 November 2026: all ${D.ok} explain duplicate content and give an example, but only ${D.absolute} mention absolute URLs. Then we checked the HTML of ${CS.readable} pages that rank in Google US. ${CS.withTag} carry a canonical tag, and <strong>${CS.absolute} of those ${CS.withTag} (${ABS}%) are absolute.</strong></p>

<p>This guide covers what a canonical URL means, what a non-canonical URL is, what Google says in its own words, relative versus absolute, our scan, and how to check yours. If you work on international sites, our guide to <a href="/blog/canonical-hreflang">canonical and hreflang tags</a> goes further, and our free <a href="/tools/canonical-tag-checker">canonical tag checker</a> tests a page.</p>

<h2>What Is a Canonical URL? (What Does Canonical URL Mean)</h2>
<p>Google's page on canonicalization defines it this way: canonicalization is the process of selecting the representative, or canonical, URL of a piece of content, and a canonical URL is the URL Google chose as the most representative from a set of duplicate pages. In plain words, if the same page can be reached at more than one address, Google picks one to show in results. Your job is to tell it which one you prefer. ${D.duplicate} of ${D.ok} guides start from duplicate content, and so does Google.</p>
<p>Google lists several reasons duplicates appear: region variants, device variants, protocol variants (HTTP and HTTPS), site functions such as sorting and filtering, and accidental variants such as a demo site left open to crawlers. It adds that some duplicate content on a site is normal and is not a violation of its spam policies.</p>

<h2>What Is a Non-Canonical URL?</h2>
<p>A non-canonical URL is any other version of a page that is not the one chosen as the main one. If example.com/shoes and example.com/shoes?sort=price show the same list, one is the canonical URL and the other is non-canonical. Google groups the pages into a cluster and picks one. The non-canonical versions are not penalised, but they are usually left out of results in favour of the canonical one. ${D.params} of ${D.ok} guides mention URL parameters as a common source.</p>

<h2>What Google Says About Canonical URLs</h2>
<p>Google has two pages on this, and the facts below come from them. The first, ${L('https://developers.google.com/search/docs/crawling-indexing/canonicalization', 'What is URL canonicalization')}, was last updated on 20 August 2026. The second, ${L('https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', 'How to specify a canonical URL')}, was last updated on 10 July 2026.</p>
<ul>
<li><strong>It is a hint, not a rule.</strong> Google says indicating a canonical preference is a hint, and the URL it picks can differ from your choice.</li>
<li><strong>Several factors count.</strong> The page lists whether the page is served over HTTP or HTTPS, redirects, the presence of the URL in a sitemap, and rel="canonical" link annotations.</li>
<li><strong>Redirects are a strong signal</strong> that the target should become canonical.</li>
<li><strong>The rel="canonical" link is also a strong signal</strong> that the specified URL should become canonical.</li>
<li><strong>A sitemap is a weak signal</strong> that helps the listed URLs become canonical.</li>
<li><strong>Do not use robots.txt</strong> for canonicalization.</li>
<li><strong>Do add a self-referential canonical</strong> on the canonical page itself.</li>
<li><strong>Do not send mixed signals:</strong> do not give one URL in a sitemap and a different one in a rel="canonical" tag for the same page.</li>
</ul>
${h.fig('google', 'Table of how strongly each method signals the canonical URL to Google: redirects and rel canonical links are strong signals, sitemap inclusion is weak, robots.txt should not be used, and the whole is a hint, not a rule')}

<h2>Canonical URL Example</h2>
<p>This is the standard form. It sits in the head of the page, and the URL is complete, with the protocol and domain:</p>
<pre>&lt;link rel="canonical" href="https://www.example.com/dresses/green-dresses"&gt;</pre>
<p>${D.example} of ${D.ok} guides show an example, and it looks the same each time. Google's own example puts the tag on the duplicate pages and recommends adding the same self-referential tag to the canonical page itself. Google also says the tag is only accepted if it appears in the head section of the HTML, so make sure at least the head is valid HTML.</p>

<h2>Relative or Absolute Canonical URL?</h2>
<p>Use <strong>absolute</strong>. An absolute URL includes the protocol and domain: <code>https://www.example.com/page</code>. A relative URL is only a path: <code>/page</code>. Google's page says: "Use absolute paths rather than relative paths with the rel="canonical" link element." It then explains: even though relative paths are supported by Google, they can cause problems in the long run, for example if you unintentionally allow your testing site to be crawled, and so Google does not recommend them. The picture is easy to follow. If a test copy of your site is reachable and its pages carry relative canonicals, each test page ends up pointing to itself on the test domain, which tells Google that the test page is its own canonical. An absolute canonical keeps pointing to your real domain.</p>
<p>${D.absolute} of ${D.ok} guides mention absolute URLs and ${D.relative} mention relative ones, so the advice is thin in the top results. Our scan, below, shows how almost everyone behaves.</p>

<h2>What ${D.ok} Ranking Guides Say About Canonical URLs</h2>
${h.fig('serp', 'Table of what 5 pages on canonical url say: duplicate content, examples and sitemaps in all 5, redirects in 4, hreflang, parameters and the HTTP header in 3, and absolute URLs in only 2')}
<p>The median guide has about ${h.f(D.median)} words. ${D.sitemap} mention sitemaps, ${D.redirect} mention redirects, and ${D.hreflang} mention hreflang. Only ${D.hint} say outright that it is a hint, even though that is the first thing Google says. ${D.selfRef} discuss self-referencing tags, ${D.trailing} mention the trailing slash and ${D.pagination} mention pagination. The guides agree on what a canonical URL is, and they split on the details.</p>

<h2>We Scanned ${CS.readable} Ranking Pages: How Many Use Absolute Canonicals?</h2>
<p>Our research for earlier guides saved Google US results for 50 searches. We took every unique URL, added today's, and read the HTML of each, looking for a canonical link tag. We reached ${CS.readable} pages out of ${CS.urls}. <strong>${CS.withTag} of them (${TAG}%) carry a canonical tag.</strong></p>
${h.fig('ours', 'Table of canonical tags on 369 ranking pages: 353 with a tag, 351 absolute, 2 relative or empty, 350 pointing to the page itself, 3 pointing elsewhere and 16 with no tag')}
<p>Of the ${CS.withTag} with a tag, <strong>${CS.absolute} (${ABS}%) use an absolute URL.</strong> The other ${CS.relative} are not: one has an empty value and one has a path only. ${CS.selfRef} point to the page itself, which is the self-referential form Google recommends, and ${CS.differs} point to a different URL. ${CS.multiple} pages have more than one canonical tag, which can send mixed signals. ${CS.headerCanon} send a canonical in the HTTP header as well or instead, and ${CS.noTag} have no canonical tag at all.</p>
<p>That is a scan of pages that rank for SEO topics, so it is not a sample of the whole web, and it does not show that absolute canonicals rank better. It shows what sites that care about search do: they use the absolute form.</p>
${h.info('Infographic of canonical URL: 351 of 353 canonical tags on ranking pages are absolute, 2 are relative or empty, all 427 of our own pages use an absolute self-referencing canonical, and Google says canonicalization is a hint, not a rule')}

<h2>Our Own Site: ${OWN.pages} Pages, All Absolute and Self-Referencing</h2>
<p>We checked our own site on 3 November 2026 by reading the sitemap and every page in it. All ${OWN.pages} pages that returned a normal response have a canonical tag, all ${OWN.absolute} are absolute, and all ${OWN.self} point to the page itself. The one place we point a canonical at another URL is on purpose: filtered blog lists, such as a category view, carry a canonical to the main blog page and a noindex tag. Our site audits flagged those, and they are intentional.</p>

<h2>Canonical URL and SEO: When to Use One</h2>
<ul>
<li><strong>URL parameters.</strong> Sorting, filtering and tracking parameters make many addresses for one page. ${D.params} of ${D.ok} guides mention them.</li>
<li><strong>HTTP and HTTPS, or www and non-www.</strong> Google lists protocol variants among the causes of duplicates. A redirect is the stronger fix here.</li>
<li><strong>The same content on several URLs</strong> in a shop or blog, such as a product in more than one category.</li>
<li><strong>Syndicated content.</strong> ${D.crossDomain} of ${D.ok} guides mention cross-domain use. We did not test it, and like every canonical signal it is only a hint.</li>
<li><strong>Every indexable page.</strong> A self-referential tag on each page is the default we use.</li>
</ul>

<h2>Self-Referencing Canonical Tags</h2>
<p>A self-referencing canonical points to the page's own URL. Google recommends adding one to the canonical page itself. It protects you when someone links to your page with a tracking parameter, because the parameter version then points back to the clean URL. ${CS.selfRef} of the ${CS.withTag} pages we scanned do this, and so do all ${OWN.pages} of ours.</p>

<h2>Non-Canonical URL in a Sitemap</h2>
<p>List only canonical URLs in your sitemap. Google says sitemap inclusion is a weak signal that helps the listed URLs become canonical, and warns against specifying one URL in a sitemap and a different one in a rel="canonical" tag for the same page. If your sitemap lists a non-canonical URL, you are sending two answers. Our free <a href="/tools/sitemap-validator">sitemap validator</a> checks the file for problems, and ${D.sitemap} of ${D.ok} guides mention sitemaps as a signal.</p>

<h2>Canonical URL vs 301 Redirect</h2>
<p>Both are strong signals, but they do different jobs. A redirect sends visitors and crawlers to another URL, so the old one stops being used. A canonical tag keeps both URLs reachable and suggests which one to show. Use a redirect when the old URL should disappear, for example after a move, and a canonical when both need to stay live, for example a filtered list. Google says to use permanent redirects to tell it that a redirected URL is a worse version than the target. Our <a href="/blog/301-vs-302-redirect">301 vs 302 redirect guide</a> explains which code to use.</p>

<h2>Canonical URL and Hreflang</h2>
<p>${D.hreflang} of ${D.ok} guides mention hreflang. Google's page says that rel="canonical" annotations with hreflang, lang, media and type attributes are not used for canonicalization. In practice, each language version should carry a canonical to itself, and the versions are linked with hreflang. Do not point the French page's canonical at the English page. Our <a href="/tools/hreflang-generator">hreflang generator</a> builds the tags, and the <a href="/blog/canonical-hreflang">canonical and hreflang guide</a> covers the traps.</p>

<h2>HTML Tag or HTTP Header?</h2>
<p>Google supports both. The HTML link element goes in the head. The HTTP header is a Link header with rel="canonical", and it works for non-HTML files such as PDFs. Google recommends choosing one: using both at the same time is more error prone, because you might give one URL in the header and a different one in the element. ${D.header} of ${D.ok} guides mention the header, and in our scan ${CS.headerCanon} of ${CS.readable} pages send one.</p>

<h2>Canonical URL Check: How to Check Yours</h2>
<ol>
<li><strong>View the source.</strong> Press Ctrl+U on the page and search for canonical. The href is your declared canonical. Check that it is absolute and that it matches the page.</li>
<li><strong>Use a checker.</strong> Our <a href="/tools/canonical-tag-checker">canonical tag checker</a> reads the tag from pasted HTML and flags problems such as several tags or a missing value.</li>
<li><strong>Inspect the URL in Search Console.</strong> Google's help page tells you to inspect the indexed version and look at the Google-selected canonical field. It also shows a user-declared canonical if your page declares one. If the two differ, Google chose another page. Our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> covers the tool.</li>
<li><strong>Compare the sitemap.</strong> Make sure the URL in the sitemap matches the canonical.</li>
<li><strong>Crawl the site.</strong> A crawl lists canonicals for every page, so you can spot empty, relative and conflicting ones. We did that for our 427 pages.</li>
</ol>

<h2>Canonical URL in WordPress</h2>
<p>${D.plugin} of ${D.ok} guides mention WordPress or a plugin such as Yoast or Rank Math. Many themes and plugins add a self-referencing canonical automatically. We did not test individual plugins, so view the source of your own pages and check that the tag is present once, absolute and correct. A duplicate tag from a theme and a plugin is one cause of the multiple-tag cases we found: ${CS.multiple} of ${CS.withTag}.</p>

<h2>Common Canonical URL Mistakes</h2>
<ul>
<li><strong>Using a relative URL.</strong> Google recommends against it.</li>
<li><strong>Several canonical tags on one page.</strong> We found ${CS.multiple} such pages in our scan.</li>
<li><strong>Different signals for the same page.</strong> A sitemap URL that disagrees with the canonical tag.</li>
<li><strong>Using robots.txt to manage duplicates.</strong> Google says not to. Use our <a href="/tools/robots-txt-tester">robots.txt tester</a> only for what it is for: crawl control.</li>
<li><strong>Pointing every page to the home page.</strong> That asks Google to treat different pages as one.</li>
<li><strong>Putting the tag outside the head.</strong> Google only accepts it in the head section.</li>
<li><strong>Using noindex to pick a canonical.</strong> Google does not recommend it within a single site, because it blocks the page from search completely.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a canonical URL?', `The URL of the version of a page that Google treats as the main one when several URLs show the same or very similar content. You suggest it with a rel="canonical" tag, a redirect or a sitemap, and Google makes the final choice.`],
    ['Should a canonical URL be relative or absolute?', `Absolute. Google says to use absolute paths with the rel="canonical" link element, because relative paths can cause problems in the long run. In our scan, ${CS.absolute} of ${CS.withTag} canonical tags are absolute.`],
    ['What is a non-canonical URL?', `Any other version of a page that is not the chosen main one, such as the same page with a tracking or sorting parameter. Google clusters the duplicates and picks one to show.`],
    ['Is a canonical tag a directive?', `No. Google says indicating a canonical preference is a hint, not a rule, and the URL it picks can differ from your choice.`],
    ['Should every page have a canonical tag?', `Google recommends a self-referential canonical on the canonical page itself. ${CS.withTag} of the ${CS.readable} ranking pages we scanned have one, and so do all ${OWN.pages} of our own.`],
    ['Should non-canonical URLs be in my sitemap?', `No. List only the URLs you want as canonical. Google says sitemap inclusion is a weak signal, and the sitemap and the tag should never name different URLs for the same page.`],
    ['What is the difference between a canonical tag and a 301 redirect?', `A redirect sends users and crawlers to another URL, so the old one stops being used. A canonical tag keeps both reachable and suggests which one to show. Google calls both strong signals.`],
    ['How do I check the canonical URL of a page?', `View the page source and search for canonical, use a canonical tag checker, or inspect the URL in Search Console and compare the Google-selected canonical with the user-declared one.`],
    ['Can I use a canonical tag across different domains?', `${D.crossDomain} of the ${D.ok} guides we read mention it for syndicated content. We did not test it, and Google says every canonical signal is only a hint.`]
  ])}

<p>Want your canonical tags, sitemap and redirects checked together? <a href="/contact">Talk to us</a> and we will review them against your Search Console data.</p>`
});
