// node scripts/build-post-meta-keywords.js [--write] — data: 5 readable ranking pages (Google US, 2 Nov 2026), Google's "Meta tags that Google supports" page read the same day (page says last updated 2025-12-10), a scan of the HTML of 195 pages that ranked in Google US in our October to November 2026 research (46 SERP files), and a scan of 25 of our own pages. Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-meta-keywords-2026-11-02.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-day16-2026-11-02.json');
for (const s of ['The meta-keyword tag is not used by Google Search, and it has no effect on indexing and ranking at all.', 'Google will ignore meta tags that it doesn\'t support.', 'we used to support them', 'Last updated 2025-12-10 UTC', 'description` for page summaries', 'google-site-verification` for site ownership']) if (!G.specialTags.text.includes(s)) throw new Error('Google text changed: ' + s);
const SPAM = G.spam.text; if (!SPAM.includes('Keyword stuffing refers to the practice of filling a web page with keywords or numbers in an attempt to manipulate rankings in Google Search results.')) throw new Error('keyword stuffing text changed');
const S = require('../../keyword-research/meta-keywords-scan-2026-11-02.json'); const OWN = require('../../keyword-research/own-meta-keywords-2026-11-02.json');
const expS = { files: 46, read: 195, withTag: 9, counts: '12,8,3,1,1,8,9,8,6' };
if (S.files !== expS.files || S.read !== expS.read || S.withTag !== expS.withTag || S.counts.join() !== expS.counts) throw new Error('scan data changed');
if (OWN.read !== 25 || OWN.withTag !== 0 || !OWN.metas.includes('description')) throw new Error('own scan changed');
const PCT = (S.withTag / S.read * 100).toFixed(1); const SHARE = Math.round(S.withTag / S.read * 100);
if (PCT !== '4.6') throw new Error('share changed ' + PCT);
const D = { listed: 8, ok: ok.length, median: Math.round(w[2]), ignores: c('ignores'), bing: c('bing'), yandex: c('yandex'), spam: c('spam'), wordpress: c('wordpress'), limit: c('limit'), history: c('history'), desc: c('desc'), title: c('title'), example: c('example'), best: c('best'), competitors: c('competitors'), google: c('google'), sells: c('sells'), tool: c('tool'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 8, ok: 5, median: 902, ignores: 4, bing: 3, yandex: 3, spam: 4, wordpress: 2, limit: 2, history: 5, desc: 2, title: 2, example: 4, best: 1, competitors: 4, google: 2, sells: 2, tool: 5, gdoc: 3, dated: 2 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify({ S, PCT }), OWN.metas.join());
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
build({
  slug: 'meta-keywords', category: 'On-Page SEO', author: 'Hamza Siddiqui', date: '2026-11-02',
  title: 'Meta Keywords: Does Google Use Them? We Checked 195 Pages',
  excerpt: `Does Google use meta keywords? Google says no effect at all. We checked ${S.read} ranking pages: only ${S.withTag} still carry the tag. Plus what to use instead.`,
  donut: [['META', 'KEYWORDS'], [['What the', 'Tag Is'], 'What Google Says', ['Who Still', 'Uses It'], 'Our Own Pages', ['What to Use', 'Instead']]],
  cover: { badge: 'OUR OWN SCAN', search: 'meta keywords', card: `Pages scanned: ${S.read}`, lines: [`With a keywords tag: ${S.withTag}`, `Share: ${PCT}%`, `Our own pages: ${OWN.read}, with the tag: ${OWN.withTag}`, 'Google: no effect at all'], last: 'HTML checked 2 Nov 2026', big: `${PCT}%`, k1: 'of ranking pages carry the tag', k2: 'Google says it has no effect', title: 'Meta Keywords', sub: 'Does Google use them?' },
  info: { title: `Meta Keywords: ${D.ok} Guides Read`, sub: 'Organic results for "meta keywords", Google US, 2 November 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Say Google ignores it', sub: 'on the page', n: D.ignores }, { label: 'Explain the history', sub: 'of the tag', n: D.history }, { label: 'Mention Bing', sub: 'named', n: D.bing }, { label: 'Mention competitors', sub: 'seeing your keywords', n: D.competitors }, { label: 'Mention WordPress', sub: 'or SEO plugins', n: D.wordpress }],
    rightTitle: 'Our own scan', rightTag: 'HTML read 2 Nov 2026', items: [{ t: `${S.withTag} of ${S.read}`, s: 'ranking pages carry the tag' }, { t: `${OWN.withTag} of ${OWN.read}`, s: 'of our own pages do' }, { t: 'No effect', s: "Google's own words" }],
    big: `${PCT}%`, noteHtml: `of ${S.read} ranking pages still carry a <em>meta keywords tag</em>, which Google ignores.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for meta keywords say`, sub: `Organic results read on 2 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Explain the history of the tag', `${D.history} of ${D.ok}`], ['Say Google ignores it', `${D.ignores} of ${D.ok}`], ['Show an example', `${D.example} of ${D.ok}`], ['Mention keyword stuffing or spam', `${D.spam} of ${D.ok}`], ['Mention competitors', `${D.competitors} of ${D.ok}`], ['Mention a tool or generator', `${D.tool} of ${D.ok}`], ['Mention Bing', `${D.bing} of ${D.ok}`], ['Mention Yandex', `${D.yandex} of ${D.ok}`], ['Link Google documentation', `${D.gdoc} of ${D.ok}`], ['Mention WordPress or a plugin', `${D.wordpress} of ${D.ok}`], ['Discuss length or limits', `${D.limit} of ${D.ok}`], ['Compare the meta description', `${D.desc} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`], ['Call something best practice', `${D.best} of ${D.ok}`]] },
    google: { title: 'What Google supports and ignores', sub: "From Google's page on meta tags, read on 2 November 2026 (page last updated 10 December 2025).", head: ['Tag', 'Google Search'], lastBold: false,
      rows: [['description', 'Supported: page summaries'], ['robots, googlebot', 'Supported: indexing control'], ['google-site-verification', 'Supported: site ownership'], ['meta keywords', 'Not used: no effect on indexing and ranking at all'], ['lang attributes', 'Not relied on: language is detected from content'], ['rel next and prev', 'Not used: no effect on indexing']] },
    ours: { title: 'How many ranking pages still use a meta keywords tag', sub: `HTML of ${S.read} pages that ranked in Google US for our research searches, read in October and November 2026.`, head: ['Group', 'Pages', 'With the tag'], lastBold: false,
      rows: [['Ranking pages', String(S.read), `${S.withTag} (${PCT}%)`], ['Our own pages', String(OWN.read), '0 (0%)']] }
  },
  content: h => `${h.updated}

<p><strong>Meta keywords</strong> are a list of words placed in a page's HTML in a tag named "keywords", once meant to tell search engines what a page is about. <strong>Google does not use them.</strong> Google's page on supported meta tags says the meta-keyword tag is not used by Google Search and has no effect on indexing and ranking at all. We read ${D.ok} pages that rank for "meta keywords" on 2 November 2026: ${D.ignores} of ${D.ok} say Google ignores it, but ${D.gdoc} link to Google's own page. Then we checked the HTML of ${S.read} pages that rank in Google US, to see whether anyone still uses it. Only ${S.withTag} do, which is ${PCT}%.</p>

<p>This guide shows what the tag is, what Google says in its own words, what our scan found, how many keywords to use if you add one, and what to spend the time on instead. For the tags that do matter, see our <a href="/blog/meta-tags-best-practices">meta tags best practices guide</a> and our free <a href="/tools/meta-tag-generator">meta tag generator</a>.</p>

<h2>Meta Keywords: The Short Answer</h2>
<p>Does Google use meta keywords? No. Google says the tag has no effect on indexing and ranking at all. Should you add one? There is no reason to for Google, and "meta keywords best practices" mostly means leaving it out. The tag is harmless to leave if a theme adds it, but it takes time to write and it can show your target keywords to anyone who views the page source: ${D.competitors} of ${D.ok} guides make that point.</p>

<h2>What Is the Meta Keywords Tag? (A Meta Keywords Example)</h2>
<p>The tag sits inside the head of a page and holds a comma-separated list. Here is a meta keywords example:</p>
<pre>&lt;meta name="keywords" content="blue widgets, buy widgets, widget shop"&gt;</pre>
<p>It was a simple idea: the page tells search engines its topics. The trouble is that anyone can write anything in it, so it was easy to abuse. ${D.history} of ${D.ok} guides explain this history, and ${D.spam} link the tag to keyword stuffing or spam.</p>

<h2>What Google Says About the Meta Keywords Tag</h2>
<p>Google lists its supported tags on a page called ${L('https://developers.google.com/search/docs/crawling-indexing/special-tags', 'Meta tags that Google supports')}, which says it was last updated on 10 December 2025. It supports, among others, <em>description</em> for page summaries, <em>robots</em> and <em>googlebot</em> for indexing control, and <em>google-site-verification</em> for site ownership. Further down is a section on unsupported tags: "The following tags and attributes aren't supported by Google Search and are ignored. We're including them here because they're either very common in HTML or we used to support them." The first item is the meta-keyword tag, with this wording: "The meta-keyword tag is not used by Google Search, and it has no effect on indexing and ranking at all." The same page also says Google will ignore meta tags that it does not support.</p>
${h.fig('google', "Table of what Google supports and ignores: description, robots, googlebot and google-site-verification are supported, while the meta keywords tag, lang attributes and rel next and prev are not used, with Google saying the keywords tag has no effect on indexing and ranking at all")}

<h2>What ${D.ok} Ranking Guides Say About Meta Keywords</h2>
${h.fig('serp', 'Table of what 5 pages on meta keywords say: the history of the tag in all 5, Google ignoring it in 4, examples, spam and competitors in 4 and only 3 linking to Google documentation')}
<p>The median guide has about ${h.f(D.median)} words, and ${D.dated} of ${D.ok} show a date. ${D.bing} mention Bing and ${D.yandex} mention Yandex, which is where the tag is still said to matter: we did not test other search engines, so we cannot confirm that. ${D.tool} mention a tool or generator, ${D.wordpress} mention WordPress or a plugin and ${D.limit} discuss length. The pattern is consistent: the guides agree Google ignores the tag, then spend most of the page on history and workarounds.</p>

<h2>We Checked ${S.read} Ranking Pages: Who Still Uses Meta Keywords?</h2>
${h.fig('ours', 'Split showing 9 of 195 ranking pages carry a meta keywords tag, 4.6 percent, and none of our own 25 pages')}
<p>To see whether the tag still has a place on the web, we took the pages that ranked in Google US for the searches in our research on 46 SERP files from October and November 2026, one page per site, and read the HTML. We found ${S.read} readable pages. <strong>${S.withTag} of them (${PCT}%) carry a meta keywords tag.</strong> The tags held between 1 and 12 keywords each. The other ${S.read - S.withTag} do not use it at all, even though these are SEO-related sites that publish a lot about search.</p>
<p>That is not proof the tag does nothing for other engines, but it shows how the people who rank treat it: the tag is not part of what ranking pages do. It is not a ranking factor Google uses and almost no ranking page bothers to add it.</p>

<h2>Our Own Pages: ${OWN.read} Checked, None Use the Tag</h2>
<p>We checked ${OWN.read} of our own pages on 2 November 2026: the home page, the services, tools and blog index pages, six tool pages and 15 blog posts. None has a meta keywords tag. The meta tags we do use are ${OWN.metas.map(m => '<em>' + m + '</em>').join(', ')}. Of those, the description is supported by Google and the verification tags prove ownership of our accounts, and the rest control how the page is shown in browsers and social previews.</p>

${h.info('Infographic of meta keywords: 4 of 5 ranking guides say Google ignores the tag, 9 of 195 ranking pages carry it, none of our 25 pages use it, and Google says it has no effect on indexing and ranking at all')}

<h2>Meta Keywords Length: How Many Keywords Should You Use?</h2>
<p>Searchers ask "how many meta keywords" and "meta keywords length", and ${D.limit} of ${D.ok} guides give a number. Because Google ignores the tag, no number helps your Google rankings: there is nothing to optimise. If you add the tag for a system you control, such as an internal site search or a CMS that reads it, the length is a matter for that system. The ${S.withTag} ranking pages that still use it list between 1 and 12 keywords, which tells you there is no common practice.</p>

<h2>Meta Keywords Best Practices (and Why There Are Few)</h2>
<ul>
<li><strong>Do not rely on the tag for Google.</strong> Google says it has no effect at all.</li>
<li><strong>Do not stuff it.</strong> Google defines keyword stuffing as filling a page with keywords or numbers to manipulate rankings, so do not pad any part of a page with lists of terms.</li>
<li><strong>Leave it empty or remove it</strong> if your theme or plugin adds a field for it. The time is better spent elsewhere.</li>
<li><strong>Keep a list of target keywords in a spreadsheet,</strong> where it is useful to you and invisible to competitors. Our <a href="/tools/keyword-grouping-tool">keyword grouping tool</a> and <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> are built for that.</li>
</ul>

<h2>Meta Keywords vs Meta Description vs Title Tag</h2>
<table><thead><tr><th>Tag</th><th>Used by Google?</th><th>What it does</th></tr></thead><tbody>
<tr><td>Title</td><td>Yes</td><td>Names the page in results and helps explain its topic</td></tr>
<tr><td>Meta description</td><td>Supported</td><td>Can be used as the summary shown under the title</td></tr>
<tr><td>Meta keywords</td><td>No</td><td>Nothing, according to Google</td></tr>
</tbody></table>
<p>${D.desc} of ${D.ok} guides compare the keywords tag with the description and ${D.title} with the title. Google's page confirms the description tag is supported for page summaries. Write one for every important page. Our guide to <a href="/blog/meta-tags-best-practices">meta tags best practices</a> covers lengths and examples.</p>

<h2>Meta Keywords in WordPress and SEO Plugins</h2>
<p>${D.wordpress} of ${D.ok} guides mention WordPress or a plugin. Some themes and plugins have a keywords field. If you see one, you can leave it empty. We did not test individual plugins, so check yours before relying on this, and check the page source of your own site if you want to know whether a tag is being added: open the page, view the source and search for the word keywords.</p>

<h2>What to Optimise Instead of Meta Keywords</h2>
<ol>
<li><strong>Title tag.</strong> One clear title per page that says what it is about.</li>
<li><strong>Meta description.</strong> A short summary that makes a searcher want to click.</li>
<li><strong>Headings and body.</strong> Use the words people search for, where they fit naturally.</li>
<li><strong>Internal links.</strong> Link related pages with clear anchor text.</li>
<li><strong>Structured data.</strong> Describe the page type: see our guide to <a href="/blog/types-of-schema-markup">types of schema markup</a>.</li>
</ol>

<h2>How to Check Whether Your Pages Use a Meta Keywords Tag</h2>
<ol>
<li><strong>Open the page and view its source.</strong> In most browsers, press Ctrl+U.</li>
<li><strong>Search for the word keywords.</strong> A match inside a meta tag, such as name="keywords", means the tag is present.</li>
<li><strong>Check a template page, not every page.</strong> Most themes add the same tags to every page, so one blog post, one service page and the home page tell you most of what you need.</li>
<li><strong>Remove or empty it</strong> in your theme or plugin settings, and view the source again to confirm.</li>
</ol>
<p>For a larger site, that is how we did our own scan: we fetched the HTML of each page and looked for a meta tag named keywords. It took a few minutes for 25 of our pages and a little longer for 195 other sites.</p>

<h2>Why Search Engines Stopped Using the Tag</h2>
<p>Google's page does not give reasons. It says the tag is listed among unsupported tags because it is very common in HTML or because Google used to support it. Four of the five guides we read link the tag to keyword stuffing or spam, and that is the obvious problem: a tag that the page owner writes, and that no visitor sees, is easy to fill with words that have nothing to do with the page. A signal like that is only useful if it cannot be gamed. Search engines look at what visitors can see, such as the title, the headings and the body text, and at signals the page owner does not control, such as links.</p>

<h2>Meta Keywords for Other Search Engines: What We Do Not Know</h2>
<p>Three of the five guides mention Bing and three mention Yandex, and some suggest the tag may still be read there. We did not test either, and we did not find a statement about it in the pages we read, so we cannot confirm or deny it. If your audience uses another search engine heavily, check that engine's webmaster documentation. Even then, a tag that only helps one engine is a small gain next to a good title, clear headings and useful content that help every engine.</p>

<h2>A Five-Minute Meta Tags Audit</h2>
<table><thead><tr><th>Tag</th><th>Check</th><th>Why</th></tr></thead><tbody>
<tr><td>title (an element, not a meta tag)</td><td>One per page, clear and unique</td><td>Names the page in results</td></tr>
<tr><td>description</td><td>Present on important pages and unique</td><td>Can be used as the summary</td></tr>
<tr><td>robots</td><td>Not set to noindex by mistake</td><td>Controls indexing</td></tr>
<tr><td>viewport</td><td>Present</td><td>Makes the page display properly on phones</td></tr>
<tr><td>keywords</td><td>Not needed</td><td>No effect on Google Search</td></tr>
</tbody></table>
<p>The one that causes real damage is the robots tag. A noindex left on after a site launch can keep pages out of results, and it takes seconds to check. Our free <a href="/tools/robots-txt-tester">robots.txt tester</a> and <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a> help with the technical side.</p>

<h2>Common Meta Keywords Mistakes</h2>
<ul>
<li><strong>Spending an hour on the tag per page.</strong> The time buys nothing for Google.</li>
<li><strong>Copying a competitor's list.</strong> It is not a research method, and if the tag is ignored, their list tells you nothing.</li>
<li><strong>Treating a plugin's keywords field as a to-do.</strong> A green light for a filled-in field is not a ranking signal.</li>
<li><strong>Using the tag as a keyword plan.</strong> Plan keywords in a sheet, then use them in titles, headings and body text.</li>
<li><strong>Ignoring the robots tag while worrying about the keywords tag.</strong> The robots tag can hide a page from search, which a keywords tag cannot do.</li>
</ul>

<h2>What the 195-Page Scan Tells You About Priorities</h2>
<p>If 186 of 195 ranking pages do not use the tag, the ranking pages are not winning because of it. They are winning on content, links and technical quality, which are the things we measure in our own reports: our <a href="/blog/monthly-seo-report">monthly SEO report</a> tracks impressions, clicks, indexing, links and speed, and none of those needs a meta keywords tag. If you have a short list of SEO tasks and meta keywords is on it, cross it off and move on to something that can change your results.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Google says the meta-keyword tag is not used and has no effect on indexing and ranking at all.</li>
<li>Only ${S.withTag} of ${S.read} ranking pages we checked (${PCT}%) carry it, and none of our ${OWN.read} pages does.</li>
<li>${D.ignores} of ${D.ok} guides agree, but only ${D.gdoc} link to Google's page.</li>
<li>No length or number of keywords improves anything for Google.</li>
<li>Spend the time on the title, the description, the headings and the links.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['Does Google use meta keywords?', 'No. Google says the meta-keyword tag is not used by Google Search and has no effect on indexing and ranking at all.'],
    ['What are meta keywords?', 'A comma-separated list of words in a tag named keywords inside a page\'s head, once meant to tell search engines what the page was about.'],
    ['How many meta keywords should I use?', 'For Google, none: it ignores the tag. If another system you control reads it, follow that system\'s rules.'],
    ['Should I remove meta keywords from my site?', 'You can. It is harmless to leave, but it gives you nothing for Google and may show your target keywords to competitors.'],
    ['Do other search engines use meta keywords?', 'Some guides say Bing and Yandex may, but we did not test them, so check their own documentation.'],
    ['Is a meta keywords tag keyword stuffing?', 'Google defines keyword stuffing as filling a page with keywords to manipulate rankings. Avoid long lists anywhere on a page.'],
    ['What is the difference between meta keywords and meta description?', 'Google ignores the keywords tag and supports the description tag, which can be used as the summary in results.'],
    ['Do WordPress SEO plugins add meta keywords?', 'Some may offer a field. We did not test them, so check your plugin and your page source.'],
    ['How did you check how many pages use the tag?', 'We fetched the HTML of 195 pages that ranked in Google US for our research searches and looked for a meta tag named keywords.']
  ])}
`
});
