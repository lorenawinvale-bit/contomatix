// Builds the "how to index backlinks" post + assets. node scripts/build-post-how-to-index-backlinks.js [--write]
// Data: 7 organic results for "how to index backlinks" (Google US, 18 Oct 2026; 5 guides readable, 2 forum threads excluded), a site: check of 12 of our own pages (18 Oct 2026) and Google's recrawl documentation. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'how-to-index-backlinks';
const R = require('../../keyword-research/serp-how-to-index-backlinks-2026-10-18.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { guides: R.length, ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], urlInspection: c(o => o.urlInspection), indexingTool: c(o => o.indexingTool), social: c(o => o.social), ping: c(o => o.ping), internal: c(o => o.internalLinks), api: c(o => o.apiIndexing), sitemap: c(o => o.sitemap), guarantee: c(o => o.guarantee), policy: c(o => o.googlePolicy), noindex: c(o => o.noindexCheck), quality: c(o => o.quality), penalty: c(o => o.penalty) };
const exp = { guides: 5, ok: 5, median: 2085, urlInspection: 5, indexingTool: 4, social: 5, ping: 3, internal: 4, api: 2, sitemap: 2, guarantee: 2, policy: 0, noindex: 0, quality: 4, penalty: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// own check: site:contomatix.com/<path> searched in Google on 18 Oct 2026 (n results for the exact URL)
const own = [['15 Oct', 'Relevant Backlinks', 1], ['15 Oct', 'Check Backlinks of Website', 1], ['15 Oct', 'White Label Link Building', 1], ['15 Oct', 'Schema Markup Validator (tool)', 1],
  ['16 Oct', 'SaaS Link Building Services', 0], ['16 Oct', 'B2B SEO Tools', 1], ['16 Oct', 'Free SEO Tools', 1], ['16 Oct', 'SEO Report Generator (tool)', 1],
  ['17 Oct', 'Yoast SEO Sitemap', 1], ['17 Oct', 'Link Building Campaign', 1], ['17 Oct', 'Resource Page Link Building', 1], ['17 Oct', 'Outreach Email Generator (tool)', 1]];
const idx = own.filter(o => o[2]).length; if (own.length !== 12 || idx !== 11) throw new Error('own data');
console.log(JSON.stringify(D), 'own', idx, '/', own.length);
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['INDEX', 'BACKLINKS'], [['Check if It', 'Is Indexed'], 'Fix Blockers', ['Help Google', 'Find the Page'], 'Be Patient', ['Skip Index', 'Services']]);
L.cover(SLUG, { badge: 'REAL INDEX CHECK', search: 'how to index backlinks', card: `Guides read: ${D.ok} of ${D.guides}`,
  lines: [`Median page length: ${f(D.median)} words`, `Name URL Inspection: ${D.urlInspection} of ${D.ok}`, `Name indexing tools: ${D.indexingTool} of ${D.ok}`, `Our new pages indexed: ${idx} of ${own.length}`, `Mention Google policy: ${D.policy} of ${D.ok}`],
  last: 'You cannot request others', big: `${idx} of ${own.length}`, k1: 'of our new pages found', k2: 'by Google in 1 to 3 days', title: 'How to Index Backlinks', sub: `What ${D.ok} guides say, and what we measured` });
fs.writeFileSync(path.join(__dirname, 'infographic-how-to-index-backlinks.html'), L.infographicHtml({
  title: `Indexing Backlinks: ${D.ok} Guides Read`, sub: 'Organic results for "how to index backlinks", Google US, 18 October 2026',
  leftTitle: 'What the guides mention', leftTag: `Number of the ${D.ok} readable guides`, max: D.ok,
  bars: [{ label: 'URL Inspection', sub: 'request indexing', n: D.urlInspection }, { label: 'Social signals', sub: 'share the link', n: D.social }, { label: 'Indexing tools', sub: 'paid or free services', n: D.indexingTool }, { label: 'Internal links', sub: 'link to the page', n: D.internal }, { label: 'Google policy', sub: 'spam rules or guidelines', n: D.policy }],
  rightTitle: 'What actually helps', rightTag: 'Within what you control', items: [
    { t: 'Check for noindex first', s: 'robots meta, header, robots.txt' }, { t: 'Link to the page naturally', s: 'from pages Google already crawls' },
    { t: 'Ask the page owner', s: 'they can request indexing' }, { t: 'Wait days to weeks', s: 'Google says requests are not instant' }],
  big: `${D.policy} of ${D.ok}`, noteHtml: `guides mention <em>Google's spam policy</em>. Google says you cannot request indexing for URLs you do not manage.` }));
fs.writeFileSync(path.join(__dirname, 'table-how-to-index-backlinks-serp.html'), L.tableHtml({ title: `What ${D.ok} guides ranking for how to index backlinks say`, sub: `Organic results read on 18 October 2026 (7 listed, 2 were forum threads and are not counted). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Guides'], lastBold: false,
  rows: [['URL Inspection or request indexing', `${D.urlInspection} of ${D.ok}`], ['Social media or sharing', `${D.social} of ${D.ok}`], ['Indexing tools or services', `${D.indexingTool} of ${D.ok}`], ['Internal links', `${D.internal} of ${D.ok}`], ['Quality, helpful or original content', `${D.quality} of ${D.ok}`], ['Pinging', `${D.ping} of ${D.ok}`], ['Penalty or manual action', `${D.penalty} of ${D.ok}`], ['Sitemaps', `${D.sitemap} of ${D.ok}`], ['The Indexing API', `${D.api} of ${D.ok}`], ['Guarantee or 100 percent wording', `${D.guarantee} of ${D.ok}`], ['noindex or robots.txt checks', `${D.noindex} of ${D.ok}`], ['Google spam policy', `${D.policy} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-how-to-index-backlinks-own.html'), L.tableHtml({ title: `Were our new pages indexed? ${idx} of ${own.length} on 18 October 2026`, sub: 'Checked with a site: search for each exact URL in Google US. A proxy, not the Search Console report. Pages are ours, not backlinks.',
  head: ['Published', 'Page', 'Found'], lastBold: false,
  rows: own.map(o => [o[0], o[1], o[2] ? 'Yes' : 'No']) }));
fs.writeFileSync(path.join(__dirname, 'table-how-to-index-backlinks-options.html'), L.tableHtml({ title: 'Ways to get a page indexed, and who can use them', sub: 'Based on Google Search Central documentation read on 18 October 2026, plus our own reading of the options.',
  head: ['Method', 'Who can use it', 'Note'], lastBold: false,
  rows: [['URL Inspection, request indexing', 'Property owners', 'Google: you cannot request URLs you do not manage'], ['Submit a sitemap', 'Site owners', 'Best for many URLs on your own site'], ['Internal links to the page', 'Site owners', 'Helps Google find your own pages'], ['Ask the linking site to request indexing', 'You, by email', 'The owner can use their own tools'], ['Indexing API', 'Job and livestream pages only', 'Not a general method'], ['Third-party indexing services', 'Anyone', 'Results not guaranteed, vet carefully']] }));
fs.writeFileSync(path.join(__dirname, 'quote-how-to-index-backlinks-doc.html'), quote({ source: 'Google Search Central · Ask Google to recrawl your URLs', title: 'What Google says about requesting indexing',
  paras: ['You can\'t request indexing for URLs that you don\'t manage. Crawling can take anywhere from a few days to a few weeks. Requesting a crawl does not guarantee that inclusion in search results will happen instantly or even at all.',
    'Keep in mind that there\'s a quota for submitting individual URLs and requesting a recrawl multiple times for the same URL won\'t get it crawled any faster.'] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [900, 300]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const q = sz(path.join(pr, 'how-to-index-backlinks-doc.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>To <strong>index backlinks</strong> means to get the page that links to you into Google's index, because a link only counts once Google has found the page it sits on. We read the ${D.ok} guides that rank on Google US for the term and checked ${own.length} of our own new pages. ${D.urlInspection} of ${D.ok} guides recommend the URL Inspection tool, yet Google's documentation says you cannot request indexing for URLs you do not manage. And ${idx} of our ${own.length} new pages were already in Google within one to three days with no tricks at all.</p>

<p>Below you will find what indexing a backlink means, how to check whether a linking page is indexed, what the ranking guides recommend, what Google actually allows, the real reasons a backlink page may not be indexed, what you can do, and what to avoid. It follows on from our guide to <a href="/blog/check-backlinks-of-website">checking the backlinks of a website</a>.</p>

<h2>What It Means to Index Backlinks</h2>
<p>A backlink is a link from another site to yours. For Google to use that link, it must first crawl the page the link sits on, then decide to keep that page in its index. If the linking page is never crawled, or is crawled and dropped, the link is effectively invisible. That is why people search for indexing backlinks, a link indexing service or a free indexing tool: they want to make sure the pages that link to them are known to Google.</p>
<p>The key detail is who controls the page. You control your own pages and can ask Google to recrawl them. You do not control a page on someone else's site, so your options are indirect.</p>

<h2>How to Check Whether a Backlink Page Is Indexed</h2>
<ol>
<li><strong>Search for the exact URL.</strong> Type <code>site:</code> followed by the full URL into Google. If the page appears, it is in the index. It is a quick proxy, not the official report.</li>
<li><strong>Check the Links report.</strong> In Search Console, Links shows the sites and pages Google knows link to you. A link missing here may not be discovered yet.</li>
<li><strong>Confirm the link itself.</strong> Open the page and check that your link is there, and what attribute it carries. The <a href="/tools/dofollow-link-checker">dofollow link checker</a> shows it per link.</li>
<li><strong>Look for blockers.</strong> View the source for a <code>noindex</code> robots meta tag, check the robots.txt of the site and look for an X-Robots-Tag header.</li>
</ol>

<h2>What the Ranking Guides Recommend</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/how-to-index-backlinks-serp.png" alt="Table of what 5 guides ranking for how to index backlinks mention: URL Inspection 5, social sharing 5, indexing tools 4, internal links 4, quality content 4, pinging 3, penalty 3, sitemaps 2, Indexing API 2, guarantee wording 2, noindex checks 0, Google spam policy 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>URL Inspection is everywhere.</strong> ${D.urlInspection} of ${D.ok} mention URL Inspection or requesting indexing, which works for your own pages.</li>
<li><strong>Tools and services are common.</strong> ${D.indexingTool} of ${D.ok} name indexing tools or services, and ${D.guarantee} use guarantee-style wording.</li>
<li><strong>Older tactics persist.</strong> ${D.social} of ${D.ok} suggest sharing the link on social media and ${D.ping} mention pinging.</li>
<li><strong>The Indexing API appears.</strong> ${D.api} of ${D.ok} mention it, though Google documents it as limited to job posting and livestream video pages.</li>
<li><strong>The basics are missing.</strong> None of the guides tell you to check for <code>noindex</code> or robots.txt blocks first, and none mention Google's spam policy.</li>
</ul>

<h2>What Google Says You Can and Cannot Do</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/how-to-index-backlinks-doc.png" alt="Google Search Central excerpt: you cannot request indexing for URLs you do not manage, crawling can take a few days to a few weeks, a request does not guarantee inclusion and repeated requests for the same URL do not speed it up" width="${q[0]}" height="${q[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Google's documentation on recrawling is direct. You can request a crawl of individual URLs with the URL Inspection tool if you own or fully manage the Search Console property. You cannot request indexing for URLs you do not manage, which includes the page where your backlink lives. Crawling can take a few days to a few weeks, a request does not guarantee inclusion and repeating it for the same URL will not speed it up. For many URLs on your own site, submit a sitemap. The Indexing API is for pages with job postings or livestream videos.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/how-to-index-backlinks-options.png" alt="Table of ways to get a page indexed: URL Inspection for property owners, sitemaps for site owners, internal links, asking the linking site, the Indexing API for job and livestream pages, and third-party indexing services" width="1280" height="@@OPTH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>What We Measured on Our Own New Pages</h2>
<p>To get a sense of how fast a small site's new pages are found, we checked the ${own.length} pages we published between 15 and 17 October 2026 with a <code>site:</code> search for each exact URL on 18 October. ${idx} of ${own.length} were already in Google's index, including all four published on 17 October. One page, published on 16 October, was not found yet.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/how-to-index-backlinks-own.png" alt="Table of 12 new Contomatix pages published 15 to 17 October 2026 and whether each was found in Google on 18 October: 11 yes and 1 no" width="1280" height="@@OWNH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>This is a sample about our own pages, not backlinks, and a <code>site:</code> search is a proxy rather than the Search Console report. It still shows two useful things: a normal, crawlable page on a site Google already visits can be found within days, and a page can lag without anything being wrong. If a page is missing after a few weeks, then you diagnose.</p>

<h2>How Google Finds the Page a Backlink Sits On</h2>
<p>Google discovers pages mostly by following links from pages it already knows, and by reading sitemaps that site owners submit. A new article on a busy site is usually found quickly because the site's homepage, category pages and feeds link to it and are crawled often. A page on a small or rarely visited site may wait longer, and a page with no internal links at all may wait the longest. This is why a backlink from the middle of an established, regularly updated site tends to be seen sooner than a link on a stray page that nothing else points to.</p>
<p>It also explains why the best indexing "strategy" for backlinks is to choose good linking pages in the first place. Before you invest in a link, look at how the site is structured: is the page linked from a category or the homepage, is the site publishing regularly, and are other pages from the same section in Google's index? If the answer is yes, you rarely need to do anything more.</p>

<h2>A Realistic Timeline and a Simple Tracking Sheet</h2>
<p>Treat indexing as a process with checkpoints, not a switch. When a backlink goes live, record the date, the linking page, your target page and the link attribute. After one week, search for the exact page URL to see whether it is indexed. After two to four weeks, check again and look in the Links report in Search Console. If the page is still missing after a month, open it and check for blockers, then message the owner once with a specific request. Anything beyond that is time better spent earning another link.</p>
<p>Keep the sheet simple: link URL, target URL, date live, anchor, attribute, indexed at one week, indexed at four weeks, notes. Over a few months it shows you which kinds of sites get indexed fast and which do not, and that is knowledge you can use to choose better targets. It also gives you a record to show a client or a manager, which matters more than a long list of indexing attempts.</p>

<h2>Why a Backlink Page May Not Be Indexed</h2>
<ul>
<li><strong>It is blocked.</strong> A <code>noindex</code> tag, an X-Robots-Tag header or a robots.txt rule can keep it out.</li>
<li><strong>It is new or orphaned.</strong> A page that nothing links to may not be found quickly, especially on a site Google visits rarely.</li>
<li><strong>It is low value.</strong> Thin, duplicate or spammy pages may be crawled and not kept.</li>
<li><strong>Its canonical points elsewhere.</strong> Google may index the canonical version instead.</li>
<li><strong>It is deep in the site.</strong> Pages many clicks from the homepage get less attention.</li>
<li><strong>The site is untrusted.</strong> If the linking site itself is weak, its pages may be crawled less often, which is also a sign the link has little value.</li>
</ul>

<h2>What You Can Do to Help a Backlink Page Get Indexed</h2>
<ol>
<li><strong>Check the blockers first.</strong> If the page has <code>noindex</code>, no method will index it. Ask the owner to fix it or accept the link has no value.</li>
<li><strong>Ask the page owner.</strong> They can request indexing in their own Search Console, and may link to the page from a better-crawled page of theirs.</li>
<li><strong>Be patient.</strong> Google says crawling takes a few days to a few weeks. Check again after two to four weeks.</li>
<li><strong>Make your own side easy to find.</strong> Keep your site crawlable and submit a sitemap so Google reaches the destination page when it follows the link.</li>
<li><strong>Earn better links.</strong> Links on pages that are already indexed and visited, such as established articles, solve the problem for you. See our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a>.</li>
<li><strong>Track and decide.</strong> If a link has not been found after a month, ask whether it was worth having.</li>
</ol>

<h2>Link Indexing Services and Free Indexing Tools</h2>
<p>${D.indexingTool} of ${D.ok} guides name indexing services. Some use the Indexing API, some ping Google and some build extra links to the page. Google's documentation says the Indexing API is for job and livestream pages, that requests are not guaranteed and that automated programs that create links are a form of link spam. Before you pay for a service, ask what exactly it does, whether it creates new links and what happens if the page is still not indexed. No service can make Google keep a page it has decided is not valuable.</p>
<p>The cleanest free tools are the ones Google gives you: URL Inspection for your own pages and sitemaps for your own site. For a quick look at what is on a page, use our <a href="/tools/technical-seo-audit-tool">SEO page audit</a> and check its robots meta tag.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-how-to-index-backlinks.png" alt="Infographic of what 5 guides on how to index backlinks mention and what actually helps within what you control" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Mistakes to Avoid When Indexing Backlinks</h2>
<ul>
<li><strong>Building links to the linking page.</strong> Creating extra links to push a page into the index can become link spam.</li>
<li><strong>Resubmitting repeatedly.</strong> Google says repeat requests for the same URL do not speed things up.</li>
<li><strong>Paying for guarantees.</strong> ${D.guarantee} of ${D.ok} guides use guarantee wording, and no one can guarantee inclusion.</li>
<li><strong>Ignoring the blockers.</strong> A noindex tag makes every other step pointless.</li>
<li><strong>Chasing every link.</strong> Weak links are not worth the effort.</li>
</ul>

<h2>Indexed Does Not Mean Valuable</h2>
<p>Getting a backlink page indexed is a minimum, not a goal. A link on an indexed page that nobody reads, on a site with no topical connection to yours, still does very little. If you find yourself spending hours on indexing, step back and ask whether the link deserves the effort. A handful of links on relevant, established pages that Google already visits will do more for your pages than a long list of links that needed help to be found. Measure the outcome you care about, such as impressions and clicks for the target page in Search Console, and let that decide where to spend your time.</p>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the 7 organic results for one query on one day (Google US, 18 October 2026). Five were guides we could read, and two were forum threads that we did not count.</li>
<li>Counts show whether a page mentions a term, not how well it explains it.</li>
<li>The indexing check covers 12 of our own pages with a <code>site:</code> search on 18 October 2026. It is a small sample and a proxy.</li>
<li>Google's statements come from its Search Central recrawl and Indexing API documentation, read on 18 October 2026.</li>
<li>Results in other countries or at other times will differ, so check your own pages.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A backlink counts only once Google has crawled and kept the page it sits on.</li>
<li>Google says you cannot request indexing for URLs you do not manage, so help indirectly.</li>
<li>Check for <code>noindex</code> and robots.txt blocks first. None of the ${D.ok} guides do.</li>
<li>Crawling takes a few days to a few weeks. ${idx} of our ${own.length} new pages were found within one to three days.</li>
<li>Be cautious with indexing services and never build links just to get a page crawled.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>How do I index backlinks?</summary>
<p>Check that the linking page is not blocked, ask its owner to request indexing or link to it from a crawled page, and give Google days to weeks. You cannot request indexing for pages you do not manage.</p>
</details>
<details>
<summary>Can I use URL Inspection to index a backlink?</summary>
<p>Only for pages in your own Search Console property. Google says you cannot request indexing for URLs that you do not manage.</p>
</details>
<details>
<summary>How long does it take for a backlink to be indexed?</summary>
<p>Google says crawling can take anywhere from a few days to a few weeks. Inclusion is not guaranteed.</p>
</details>
<details>
<summary>How do I check if a backlink is indexed?</summary>
<p>Search for the exact page with a site: query, check the Links report in Search Console and open the page to confirm the link and its attribute.</p>
</details>
<details>
<summary>Do link indexing services work?</summary>
<p>Results vary and nothing is guaranteed. Ask what the service does, whether it creates extra links and what happens if the page is still not indexed.</p>
</details>
<details>
<summary>Is there a free indexing tool for backlinks?</summary>
<p>Google's own tools, URL Inspection and sitemaps, are free but only for your own site. For other people's pages you can only ask the owner.</p>
</details>
<details>
<summary>Why is my backlink not showing in Search Console?</summary>
<p>The page may not be crawled yet, may be blocked by noindex or robots.txt, or may be low value. Wait a few weeks and check the page for blockers.</p>
</details>
<details>
<summary>Does a backlink help if the page is not indexed?</summary>
<p>A link on a page Google has not crawled cannot be used. That is why indexed pages matter, and why links on established pages are worth more.</p>
</details>
<details>
<summary>Can the Indexing API index my backlinks?</summary>
<p>No. Google documents the Indexing API for job posting and livestream video pages only.</p>
</details>
</div>
`;
const title = 'How to Index Backlinks: What Google Allows, and What Works';
const excerpt = `How to index backlinks: Google says you cannot request indexing for URLs you do not manage. We read ${D.ok} guides and checked ${own.length} of our pages.`;
const out = content.replace('@@SERPH@@', hh('how-to-index-backlinks-serp.png')).replace('@@OPTH@@', hh('how-to-index-backlinks-options.png')).replace('@@OWNH@@', hh('how-to-index-backlinks-own.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-18', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
