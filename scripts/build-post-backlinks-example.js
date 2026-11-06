// node scripts/build-post-backlinks-example.js [--write]. Data: 6 readable ranking pages for "backlinks example" (Google US, 6 Nov 2026), Google's spam policies (updated 2026-08-28) and qualify-outbound-links page (2025-12-10) read the same day, and our own Search Console Links report of 6 Nov 2026 (38 external links, 13 sites; homepage titles read the same day to label each site's type). Linking sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-backlinks-example-2026-11-06.json');
const OWNF = require('../../keyword-research/own-linking-sites-2026-11-06.json');
const G = require('../../keyword-research/google-docs-day19-2026-11-06.json');
const q = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/[‘’]/g, "'");
const SP = q(G.spam.text), QU = q(G.qualify.text);
for (const s of ['Link spam is the practice of creating links to or from a site primarily for the purpose of manipulating search rankings.', 'Buying or selling links for ranking purposes.', 'Excessive link exchanges ("Link to me and I\'ll link to you") or partner pages exclusively for the sake of cross-linking', 'Using automated programs or services to create links to your site', 'Low-quality directory or bookmark site links', 'Forum comments with optimized links in the post or signature', 'It\'s not a violation of our policies to have such links as long as they are qualified with a rel="nofollow" or rel="sponsored" attribute value', 'Last updated 2026-08-28 UTC']) if (!SP.includes(s)) throw new Error('Google spam text changed: ' + s.slice(0, 50));
for (const s of ['rel="sponsored" Mark links that are advertisements or paid placements (commonly called paid links ) with the sponsored value.', 'We recommend marking user-generated content (UGC) links, such as comments and forum posts, with the ugc value.', 'Use the nofollow value when other values don\'t apply', 'Last updated 2025-12-10 UTC']) if (!QU.includes(s)) throw new Error('Google qualify text changed: ' + s.slice(0, 50));
const ok = R.filter(o => o.status === 200 && o.words > 400); const c = k => ok.filter(o => o[k]).length; const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { listed: 7, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), htmlCode: c('htmlCode'), goodVsBad: c('goodVsBad'), nofollow: c('nofollow'), sponsored: c('sponsored'), anchor: c('anchor'), spam: c('spam'), realExamples: c('realExamples'), caseStudy: c('caseStudy'), tools: c('tools'), authority: c('authority'), relevance: c('relevance'), editorial: c('editorial'), guest: c('guest'), directory: c('directory'), forum: c('forum'), resource: c('resource'), brokenLink: c('brokenLink'), press: c('press'), googleDoc: c('googleDoc'), steps: c('steps') };
const exp = { listed: 7, ok: 6, median: 3043, htmlCode: 6, goodVsBad: 4, nofollow: 6, sponsored: 3, anchor: 5, spam: 6, realExamples: 6, caseStudy: 3, tools: 4, authority: 5, relevance: 6, editorial: 6, guest: 6, directory: 5, forum: 6, resource: 3, brokenLink: 3, press: 6, googleDoc: 0, steps: 6 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const cnt = OWNF.counts; const TYPE = { 'goodfirms.co': 'B2B review directory', 'designrush.com': 'Agency directory', 'yahoo.co.jp': 'Large web portal', 'deepnlp.org': 'AI agent and tool platform', 'likebookmark.com': 'Bookmark site', 'nav-ai.net': 'AI tools directory', 'saasrankly.com': 'SaaS ranking site', 'aitoolcompass.net': 'AI tool finder', 'apollotechnical.com': 'Recruiting company', 'raptorkit.com': 'SEO and marketing site', 'recited.co.uk': 'AI visibility site', 'scamadviser.com': 'Website trust checker', 'simpalm.com': 'Product development company' };
const DIR = ['goodfirms.co', 'designrush.com', 'likebookmark.com', 'nav-ai.net', 'saasrankly.com', 'aitoolcompass.net'];
const total = Object.values(cnt).reduce((a, b) => a + b, 0); const dirLinks = DIR.reduce((a, d) => a + cnt[d], 0); const sites = Object.keys(cnt).length;
if (total !== 38 || sites !== 13 || dirLinks !== 28 || OWNF.targets['https://contomatix.com/'] !== 25 || OWNF.anchors.length !== 11) throw new Error('own links changed');
const top2 = cnt['goodfirms.co'] + cnt['designrush.com']; const DP = Math.round(dirLinks / total * 100), HP = Math.round(25 / total * 100), T2 = Math.round(top2 / total * 100); // 79, 66, 55
if (DP !== 74 || HP !== 66 || T2 !== 55) throw new Error('pct changed ' + DP + ' ' + HP + ' ' + T2);
console.log(JSON.stringify(D), DP, HP, T2);
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
const rowsSites = Object.entries(cnt).map(([d, n]) => [TYPE[d], n]); const byType = {}; for (const [t, n] of rowsSites) byType[t] = (byType[t] || 0) + n;
build({
  slug: 'backlinks-example', category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-11-06',
  title: 'Backlinks Example: Our Own 38 Links, 74% From Directories',
  excerpt: `Backlinks example guide: the HTML, ${D.ok} guides compared, Google's link spam rules, and our own ${total} backlinks from ${sites} sites. ${DP}% come from directories.`,
  donut: [['BACKLINKS', 'EXAMPLE'], [['What One', 'Looks Like'], 'Types of Backlinks', ['Good or', 'Bad'], 'Our Own 38 Links', ['How to Get', 'Better Ones']]],
  cover: { badge: 'OUR OWN LINKS', search: 'backlinks example', card: `External links: ${total}`, lines: [`Linking sites: ${sites}`, `From directories: ${dirLinks} (${DP}%)`, `To the home page: 25 (${HP}%)`, `Distinct anchor texts: ${OWNF.anchors.length}`, 'Search Console, 6 Nov 2026'], last: 'Links report read 6 Nov 2026', big: `${DP}%`, k1: 'of our links come from directories', k2: 'Google lists low-quality ones as spam', title: 'Backlinks Example', sub: 'Our own 38 links, shown honestly' },
  info: { title: `Backlinks Example: ${D.ok} Guides Read`, sub: 'Organic results for "backlinks example", Google US, 6 November 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Show HTML code', sub: 'of a link', n: D.htmlCode }, { label: 'Cover guest posts', sub: 'and editorial links', n: D.guest }, { label: 'Mention nofollow', sub: 'link attributes', n: D.nofollow }, { label: 'Compare good and bad', sub: 'links', n: D.goodVsBad }, { label: 'Link Google documentation', sub: 'on link spam', n: D.googleDoc }],
    rightTitle: 'Our own Links report', rightTag: 'Search Console, 6 Nov 2026', items: [{ t: `${dirLinks} of ${total}`, s: 'links from directories' }, { t: `${top2} of ${total}`, s: 'from just two sites' }, { t: `25 of ${total}`, s: 'point to the home page' }],
    big: `${DP}%`, noteHtml: `of our ${total} backlinks come from <em>directory-type sites</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for backlinks example say`, sub: `Organic results read on 6 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Show the HTML of a link', `${D.htmlCode} of ${D.ok}`], ['Cover guest posts', `${D.guest} of ${D.ok}`], ['Cover editorial links', `${D.editorial} of ${D.ok}`], ['Mention nofollow', `${D.nofollow} of ${D.ok}`], ['Talk about relevance', `${D.relevance} of ${D.ok}`], ['Mention spam or penalties', `${D.spam} of ${D.ok}`], ['Cover directories', `${D.directory} of ${D.ok}`], ['Cover forums or comments', `${D.forum} of ${D.ok}`], ['Mention domain authority or rating', `${D.authority} of ${D.ok}`], ['Compare good and bad links', `${D.goodVsBad} of ${D.ok}`], ['Mention a link tool', `${D.tools} of ${D.ok}`], ['Give a case study', `${D.caseStudy} of ${D.ok}`], ['Cover resource pages', `${D.resource} of ${D.ok}`], ['Link Google documentation', `${D.googleDoc} of ${D.ok}`]] },
    google: { title: 'What Google lists as link spam', sub: "From Google's spam policies page, read on 6 November 2026 (page last updated 28 August 2026).", head: ['Practice', 'Google says'], lastBold: false,
      rows: [['Buying or selling links', 'For ranking purposes, link spam'], ['Excessive link exchanges', 'Link to me and I will link to you, link spam'], ['Automated link creation', 'Using automated programs or services, link spam'], ['Directory and bookmark links', 'Low-quality ones are link spam'], ['Forum comments', 'With optimized links in the post or signature, link spam'], ['Paid links as advertising', 'Not a violation if qualified with nofollow or sponsored']] },
    ours: { title: 'Who links to us, by type of site', sub: `Search Console Links report of 6 November 2026: ${total} external links from ${sites} sites. Site type is read from each site's homepage title. Sites are not named.`, head: ['Type of site', 'Links'], lastBold: false,
      rows: Object.entries(byType).sort((a, b) => b[1] - a[1]).map(([t, n]) => [t, String(n)]) }
  },
  content: h => `${h.updated}

<p>A <strong>backlink example</strong> is any link from another website to yours, and the simplest one is a single line of HTML: an anchor tag on their page that points to a page on yours. The harder question is what a good example looks like. We read ${D.ok} pages that rank for "backlinks example" on 6 November 2026: all ${D.ok} show how links are made and which types exist, but <strong>${D.googleDoc} of ${D.ok} link to Google's own documentation</strong> on what counts as link spam. So we read it ourselves, then did something the guides do not: we opened our own Search Console Links report and looked at every one of our backlinks. We have <strong>${total} external links from ${sites} sites, and ${dirLinks} of them (${DP}%) come from directory-type sites.</strong> That is not a profile to copy, and we explain why.</p>

<p>This guide shows what a backlink looks like in code, the main types with an example of each, what Google says about good and bad links, our own profile with the numbers, and how to build better ones. For a deeper look at the types, see our guide to <a href="/blog/types-of-backlinks">types of backlinks</a>.</p>

<h2>Backlink Example: What One Looks Like in HTML</h2>
<p>A backlink is an anchor tag on someone else's page. Here is a plain example, written the way an editor would link to one of our tools in an article:</p>
<pre>&lt;p&gt;You can test your file with a free &lt;a href=&quot;https://contomatix.com/tools/llm-seo-checker&quot;&gt;LLM SEO checker&lt;/a&gt;.&lt;/p&gt;</pre>
<p>Three parts matter. The <strong>URL</strong> in the href is the page being linked to, our backlink target. The <strong>anchor text</strong> is the visible words, here "LLM SEO checker". And the <strong>surrounding sentence</strong> gives context. ${D.htmlCode} of ${D.ok} guides show code like this, and ${D.anchor} explain anchor text. A link like this one, placed by an editor because it helps the reader, is the standard good example.</p>

<h2>Backlink Examples With rel Attributes: Nofollow, Sponsored and UGC</h2>
<p>Google's page on qualifying outbound links (last updated 10 December 2025) lists three values you can add to tell Google how a link relates to the page. Here is each one, with the meaning Google gives it:</p>
<ul>
<li><code>&lt;a rel="sponsored" href="..."&gt;</code> marks advertisements or paid placements, commonly called paid links.</li>
<li><code>&lt;a rel="ugc" href="..."&gt;</code> marks user-generated content such as comments and forum posts, which Google recommends.</li>
<li><code>&lt;a rel="nofollow" href="..."&gt;</code> is for when the other values do not apply and you would rather Google did not associate your site with the linked page.</li>
</ul>
<p>A link with none of these is a regular link. ${D.nofollow} of ${D.ok} guides mention nofollow and ${D.sponsored} mention sponsored. Our <a href="/tools/dofollow-link-checker">dofollow link checker</a> shows which links on a page carry each value.</p>

<h2>Types of Backlinks: An Example of Each</h2>
<table><thead><tr><th>Type</th><th>Example</th><th>What to know</th></tr></thead><tbody>
<tr><td>Editorial link</td><td>A writer links to your study inside an article</td><td>The standard good example. Earned, relevant, natural anchor. ${D.editorial} of ${D.ok} guides cover it</td></tr>
<tr><td>Guest post link</td><td>An author bio or a link inside a post you wrote for another site</td><td>Fine when the post is useful. Google lists optimized anchors in guest posts as link spam. ${D.guest} of ${D.ok} cover it</td></tr>
<tr><td>Resource page link</td><td>A "useful tools" page that lists your free tool</td><td>Works for tools and data. ${D.resource} of ${D.ok} cover it</td></tr>
<tr><td>Broken link replacement</td><td>You tell a site its link is dead and offer your page</td><td>Needs a page that really fits. ${D.brokenLink} of ${D.ok} cover it</td></tr>
<tr><td>Press or digital PR mention</td><td>A news site quotes your data and links to it</td><td>Strong, hard to get. ${D.press} of ${D.ok} cover it</td></tr>
<tr><td>Directory or listing</td><td>Your profile on a review or tools directory</td><td>Common and easy. Google lists low-quality directory links as spam. ${D.directory} of ${D.ok} cover it</td></tr>
<tr><td>Forum or comment link</td><td>A link in a forum reply or signature</td><td>Should carry ugc or nofollow. Optimized links in comments are listed as spam. ${D.forum} of ${D.ok} cover it</td></tr>
<tr><td>Paid or sponsored link</td><td>An advertorial or sponsored post</td><td>Allowed if qualified with nofollow or sponsored</td></tr>
</tbody></table>
<p>The guides agree on the list. They differ on how much weight each type gets, and few say what Google actually allows.</p>

<h2>What ${D.ok} Ranking Guides Say About Backlink Examples</h2>
${h.fig('serp', 'Table of what 6 pages on backlinks example say: HTML code, guest posts, editorial links, nofollow, relevance and spam in all 6, directories in 5, good and bad in 4, a case study in 3, and Google documentation in none')}
<p>The median guide has about ${h.f(D.median)} words. All ${D.ok} show HTML, cover guest posts and editorial links, and mention spam. ${D.relevance} stress relevance and ${D.authority} mention domain authority or rating. Only ${D.caseStudy} give a case study of real links, and <strong>none link to Google's documentation.</strong> The advice is easy to find. Evidence, from the sites that publish it, is thin.</p>

<h2>What Google Says: Good Backlinks and Link Spam</h2>
<p>Google's ${L('https://developers.google.com/search/docs/essentials/spam-policies', 'spam policies')} (last updated 28 August 2026) define link spam as "the practice of creating links to or from a site primarily for the purpose of manipulating search rankings." Its examples include buying or selling links for ranking purposes, excessive link exchanges, using automated programs or services to create links, text links that do not block ranking credit, optimized anchor text in guest posts, articles or press releases, low-quality directory or bookmark site links, and forum comments with optimized links in the post or signature. The page adds that buying and selling links is a normal part of the web for advertising and sponsorship, and that it is not a violation as long as such links are qualified with a rel="nofollow" or rel="sponsored" attribute, as described on its ${L('https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links', 'page on qualifying outbound links')}.</p>
${h.fig('google', 'Table of what Google lists as link spam: buying or selling links for ranking, excessive link exchanges, automated link creation, low-quality directory and bookmark links, forum comments with optimized links, with paid links allowed if qualified with nofollow or sponsored')}
<p>Read as a test, a good backlink is one you would be happy to have even if search engines did not exist: placed by a person, on a relevant page, with a natural description of what it points to, and not exchanged for money or favours. A bad one is made for the ranking.</p>

<h2>Good Backlinks Examples and Bad Backlinks Examples</h2>
<ul>
<li><strong>Good:</strong> a journalist quotes your original data and links to the study, using your brand or the topic as the anchor.</li>
<li><strong>Good:</strong> a blogger lists your free tool on a resource page about the same subject.</li>
<li><strong>Good:</strong> a site you partner with credits you in a case study, as a one-way mention with a followed link.</li>
<li><strong>Bad:</strong> an automated program posts your link on hundreds of unrelated sites.</li>
<li><strong>Bad:</strong> a forum signature with a keyword-rich link repeated in every reply.</li>
<li><strong>Bad:</strong> a paid post with a followed, keyword-anchor link and no sponsored attribute.</li>
<li><strong>Bad:</strong> a "link to me and I will link to you" arrangement made only for the ranking.</li>
</ul>
<p>${D.goodVsBad} of ${D.ok} guides compare good and bad links. The examples above follow Google's own list, not our opinion.</p>

<h2>Our Own Backlinks: ${total} Links, ${sites} Sites</h2>
<p>On 6 November 2026 we opened the Links report in our Search Console (domain property). It shows ${total} external links, up from 30 on 29 October. We then read each linking site's homepage title to label its type. We have not named the sites, because the point is the pattern, not the sources.</p>
${h.fig('ours', 'Table of the 13 sites that link to us by type: 6 directory or listing type sites with 28 of the 38 links, plus an AI platform, a web portal, recruiting, marketing, trust checker and development company sites with 1 to 3 links each')}
<p>What the report shows:</p>
<ul>
<li><strong>${dirLinks} of ${total} links (${DP}%) come from ${DIR.length} directory-type sites:</strong> review and agency directories, AI tool directories, a SaaS ranking site and a bookmark site.</li>
<li><strong>Two sites supply ${top2} links (${T2}%).</strong> One of them gives us 14 links on its own.</li>
<li><strong>25 of ${total} links (${HP}%) point to the home page.</strong> The other 13 go to 7 inner pages, mostly free tools.</li>
<li><strong>The anchor texts are tame:</strong> ${OWNF.anchors.length} different ones, such as "visit website", the brand name, an empty anchor, "llms txt generator" and bare URLs. None is a keyword-rich commercial phrase.</li>
<li><strong>Only 4 links come from ordinary company sites</strong>, one link each: a recruiting company, a marketing site, an AI visibility site and a product development company.</li>
</ul>
${h.info('Infographic of our own backlinks: 38 external links from 13 sites, 28 of them (74 percent) from 6 directory-type sites, two sites supplying 21 links, 25 links pointing to the home page, and 11 different anchor texts')}

<h2>Is Our Backlink Profile a Good Example?</h2>
<p>Honestly, it is a starting profile and not a model. The strengths: the anchors are natural, the links sit on pages Google has found, and some point to useful tools. The weaknesses are the ones Google's list hints at. A profile that is ${DP}% directories and ${T2}% two sites is narrow. Google lists low-quality directory or bookmark links as spam, and we cannot tell from here which of ours it would call low quality. We judge them by three questions: would a person find us there, is the site relevant, and does the listing say something real about us. By that test the review and agency directories are reasonable listings, and the bookmark site and the AI tool listings are the ones we expect to count for least. We plan to add links of a different kind, and this is why. Our guide to <a href="/blog/check-backlinks-of-website">checking the backlinks of a website</a> shows how to run the same review on yours.</p>

<h2>Backlink Profile Example: What a Healthier Mix Looks Like</h2>
<p>There is no published ideal ratio, and we will not invent one. Instead, compare against the list. A healthier profile would have links from many different sites, more editorial and resource-page links, links to the pages that deserve them, and anchors that read like normal sentences. For us that means links to our data posts and free tools from sites that cover SEO, which is what the free tools and studies are for. Our <a href="/blog/high-authority-backlinks">high authority backlinks guide</a> and <a href="/blog/relevant-backlinks">relevant backlinks guide</a> cover how to judge sources.</p>

<h2>How to Build Backlinks Like the Good Examples</h2>
<ol>
<li><strong>Make something worth linking to.</strong> A free tool, a data study, a template. ${D.steps} of ${D.ok} guides give steps, and the first is always content people want.</li>
<li><strong>Find sites that already cover the topic.</strong> Search for resource pages, roundups and articles that link to similar pages.</li>
<li><strong>Pitch with a reason.</strong> Say what your page adds, in two sentences, and do not ask for a specific anchor.</li>
<li><strong>Use guest posts for ideas, not anchors.</strong> Google lists optimized anchor text in guest posts as link spam, so link naturally.</li>
<li><strong>Qualify paid links.</strong> If a link is an advertisement or paid placement, it should carry sponsored or nofollow.</li>
<li><strong>Track each link.</strong> Record the date, source, target page and anchor, and check it again later. Our <a href="/tools/backlink-monitor-tool">backlink monitor tool</a> logs and rechecks links.</li>
</ol>
<p>Our guides to <a href="/blog/link-acquisition">link acquisition</a> and <a href="/blog/white-hat-link-building">white hat link building</a> go through the methods in more detail.</p>

<h2>Backlinks Search: How to Find the Backlinks of Any Site</h2>
<p>You can see your own links for free in Search Console: the Links report lists external links, top linked pages, top linking sites and top linking text, as we used above. To see another site's links you need a backlink tool, and ${D.tools} of ${D.ok} guides name one. Whichever you use, look at the same four things we did: how many sites, which types, where the links point and what the anchors say. Our <a href="/tools/anchor-text-checker">anchor text checker</a> helps with the last one.</p>

<h2>Common Backlink Mistakes</h2>
<ul>
<li><strong>Counting links instead of sites.</strong> We have ${total} links from ${sites} sites. The second number tells you more.</li>
<li><strong>Sending every link to the home page.</strong> ${HP}% of ours do, and the pages that need links get none.</li>
<li><strong>Treating directories as a plan.</strong> They are easy, and they are what Google calls spam when they are low quality.</li>
<li><strong>Chasing anchors.</strong> Natural anchors are safer than keyword-rich ones.</li>
<li><strong>Paying without qualifying.</strong> A paid link with no sponsored or nofollow attribute is what Google's page warns against.</li>
<li><strong>Judging by domain authority alone.</strong> ${D.authority} of ${D.ok} guides mention it, but relevance and real editorial placement matter more.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a backlink example?', `A link from another site to yours, written as an anchor tag in the other site's HTML. A typical good example is an editor linking to your tool inside an article because it helps the reader.`],
    ['What does a backlink look like in HTML?', `An anchor tag with the target URL in the href and the visible words as the anchor text, for example a link to a tool page with the anchor "LLM SEO checker". It can carry rel values such as sponsored, ugc or nofollow.`],
    ['What are good backlinks examples?', `Editorial links from relevant pages, resource-page links to a useful tool, and press mentions of your original data. They are placed by a person, relevant and described naturally.`],
    ['What are bad backlinks examples?', `Links made by automated programs, keyword-rich forum signatures, paid links with no sponsored attribute and link exchanges made only for ranking. Google lists these among its link spam examples.`],
    ['Are directory links good or bad?', `It depends. Google lists low-quality directory or bookmark site links as link spam. Reputable review directories can be reasonable listings, but a profile made mostly of them is narrow. Ours is ${DP}% directory-type.`],
    ['What is nofollow, sponsored and ugc?', `Rel values that tell Google how a link relates to the page. Sponsored marks paid placements, ugc marks user-generated content and nofollow is for links you would rather Google did not associate with your site.`],
    ['How many backlinks do I need?', `There is no fixed number. Our own site has ${total} external links from ${sites} sites, which is a small profile, and we treat the number of different sites and the relevance of each as more useful than the total.`],
    ['How do I check my own backlinks?', `Open the Links report in Google Search Console. It lists external links, top linked pages, top linking sites and top linking text. A backlink tool can show more.`],
    ['Do all backlinks help rankings?', `No. Links made primarily to manipulate rankings are link spam under Google's policies, and we have no data on how much any single link helps. Quality and relevance matter more than count.`]
  ])}

<p>Want your backlink profile reviewed the way we reviewed ours? <a href="/contact">Talk to us</a> and we will check the sources, anchors and targets, and suggest where to look for better links.</p>`
});
