// Builds the "tiered link building" post + assets. node scripts/build-post-tiered-link-building.js [--write]
// Data: 8 organic results for "tiered link building" (Google US, 22 Oct 2026; 6 readable guides, 2 forum threads excluded), our indexing check of 12 new pages (18 Oct 2026) and Google Search Central spam policies read 22 Oct 2026. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'tiered-link-building';
const R = require('../../keyword-research/serp-tiered-link-building-2026-10-22.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], tier1: c(o => o.tier1), tier2: c(o => o.tier2), tier3: c(o => o.tier3), penalty: c(o => o.penalty), risk: c(o => o.risk), policy: c(o => o.googlePolicy), pbn: c(o => o.pbn), indexing: c(o => o.indexing), price: c(o => o.price), guarantee: c(o => o.guarantee), googleDoc: c(o => o.googleDoc), relevance: c(o => o.relevance), steps: c(o => o.steps) };
const exp = { ok: 6, median: 2284, tier1: 6, tier2: 6, tier3: 6, penalty: 5, risk: 6, policy: 4, pbn: 3, indexing: 5, price: 3, guarantee: 1, googleDoc: 0, relevance: 5, steps: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['TIERED LINK', 'BUILDING'], [['Know the', 'Three Tiers'], 'Read Google\'s Rules', ['Weigh the', 'Real Risk'], 'Index Honestly', ['Earn Tier One', 'Links Instead']]);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'tiered link building', card: `Guides read: ${D.ok} of 8`,
  lines: [`Median page length: ${f(D.median)} words`, `Describe tiers 1 to 3: ${D.tier3} of ${D.ok}`, `Mention risk: ${D.risk} of ${D.ok}`, `Mention Google policy: ${D.policy} of ${D.ok}`, `Cite Google's documentation: ${D.googleDoc} of ${D.ok}`],
  last: 'Read the rules before you tier', big: `${D.googleDoc} of ${D.ok}`, k1: 'guides cite Google\'s', k2: 'own documentation', title: 'Tiered Link Building', sub: `What ${D.ok} ranking guides say, and skip` });
fs.writeFileSync(path.join(__dirname, 'infographic-tiered-link-building.html'), L.infographicHtml({
  title: `Tiered Link Building: ${D.ok} Guides Read`, sub: 'Organic results for "tiered link building", Google US, 22 October 2026',
  leftTitle: 'What the ranking guides mention', leftTag: `Number of the ${D.ok} readable guides`, max: D.ok,
  bars: [{ label: 'Risk or caution', sub: 'say tiers carry risk', n: D.risk }, { label: 'Penalties', sub: 'penalty or manual action', n: D.penalty }, { label: 'Indexing', sub: 'help links get indexed', n: D.indexing }, { label: 'Google policy', sub: 'spam rules mentioned', n: D.policy }, { label: 'Google documentation', sub: 'cited directly', n: D.googleDoc }],
  rightTitle: 'Before you build a lower tier', rightTag: 'Four questions', items: [
    { t: 'Is any of it automated?', s: 'Google lists automated links' }, { t: 'Would you show the pages?', s: 'to a reviewer, openly' },
    { t: 'Do they help readers?', s: 'or only exist to pass value' }, { t: 'Is tier one earned?', s: 'a weak base gains nothing' }],
  big: `${D.googleDoc} of ${D.ok}`, noteHtml: `guides cite <em>Google's own documentation</em>, which lists automated link creation as link spam.` }));
fs.writeFileSync(path.join(__dirname, 'table-tiered-link-building-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for tiered link building say`, sub: `Organic results read on 22 October 2026 (8 listed; ${D.ok} gave a readable guide and 2 were forum threads). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Guides'], lastBold: false,
  rows: [['Tier 1, tier 2 and tier 3 described', `${D.tier3} of ${D.ok}`], ['Risk or caution', `${D.risk} of ${D.ok}`], ['Penalty, manual action or demotion', `${D.penalty} of ${D.ok}`], ['Indexing of the lower-tier links', `${D.indexing} of ${D.ok}`], ['Relevance', `${D.relevance} of ${D.ok}`], ['Step-by-step instructions', `${D.steps} of ${D.ok}`], ['Google spam policy or guidelines', `${D.policy} of ${D.ok}`], ['PBNs', `${D.pbn} of ${D.ok}`], ['A price', `${D.price} of ${D.ok}`], ['Guarantee or 100 percent wording', `${D.guarantee} of ${D.ok}`], ['Citing Google documentation', `${D.googleDoc} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-tiered-link-building-tiers.html'), L.tableHtml({ title: 'The three tiers, and what each is meant to do', sub: 'Our reading of how the ranking guides describe tiered link building. Not an endorsement.',
  head: ['Tier', 'Links point to', 'What it is meant to do'], lastBold: false,
  rows: [['Tier 1', 'Your site', 'Pass ranking credit directly'], ['Tier 2', 'The tier 1 pages', 'Strengthen and get tier 1 pages indexed'], ['Tier 3', 'The tier 2 pages', 'Strengthen the tier 2 pages']] }));
fs.writeFileSync(path.join(__dirname, 'quote-tiered-link-building-doc.html'), quote({ source: 'Google Search Central · Spam policies, link spam', title: 'The examples that sit under every link tier',
  paras: ['Link spam is the practice of creating links to or from a site primarily for the purpose of manipulating search rankings. Examples include using automated programs or services to create links to your site, low-quality directory or bookmark site links, and keyword-rich, hidden, or low-quality links embedded in widgets that are distributed across various sites.',
    'Google does understand that buying and selling links is a normal part of the economy of the web for advertising and sponsorship purposes, as long as they are qualified with <code>rel="nofollow"</code> or <code>rel="sponsored"</code>.'] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [880, 300]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const q = sz(path.join(pr, 'tiered-link-building-doc.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Tiered link building</strong> is the practice of building links to the pages that link to your site, and then links to those pages, in layers called tiers. Tier 1 links point at your site, tier 2 links point at your tier 1 pages and tier 3 links point at tier 2. We read the ${D.ok} guides that rank on Google US for the term. All ${D.ok} describe three tiers and ${D.risk} of ${D.ok} admit the risk, yet none cite Google's own documentation, which lists using automated programs or services to create links as link spam.</p>

<p>Below you will find what tiers are, why people use them, what the ranking guides say and leave out, what Google's rules cover, what we measured about how new pages get found without any tiers, and the safer ways to get the same benefits. It sits alongside our guides to <a href="/blog/how-to-index-backlinks">how to index backlinks</a> and <a href="/blog/backlinks-exchange">backlink exchanges</a>.</p>

<h2>What Tiered Link Building Is</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/tiered-link-building-tiers.png" alt="Table of three link tiers: tier 1 links point to your site and pass ranking credit, tier 2 links point to the tier 1 pages to strengthen them and get them indexed, tier 3 links point to the tier 2 pages" width="1280" height="@@TIERSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>The idea is a pyramid. At the top sit the links you care about, on pages that link to your site. Underneath you build more links to those pages, in the belief that the extra links make each tier 1 page stronger and so pass more value to you. Some people call it a link pyramid or tier 2 backlinks. The tiers are not a measure of quality. A tier is simply how far a link is from your site.</p>

<h2>Why People Use Tiers</h2>
<ul>
<li><strong>To get links indexed.</strong> ${D.indexing} of ${D.ok} guides mention indexing. A link on a page that Google has not crawled counts for nothing, so lower tiers are sold as a way to get the tier 1 page found.</li>
<li><strong>To pass more authority.</strong> The belief is that a stronger tier 1 page passes more value to your site.</li>
</ul>

<h2>What the Ranking Guides Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/tiered-link-building-serp.png" alt="Table of what 6 pages ranking for tiered link building mention: tiers 1 to 3 in 6, risk 6, penalty 5, indexing 5, relevance 5, steps 4, Google spam policy 4, PBNs 3, a price 3, guarantee wording 1 and Google documentation 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The model is agreed.</strong> All ${D.ok} guides describe tiers 1, 2 and 3, and ${D.steps} of ${D.ok} give steps for building them.</li>
<li><strong>The risk is acknowledged.</strong> ${D.risk} of ${D.ok} mention risk and ${D.penalty} of ${D.ok} mention penalties or manual actions.</li>
<li><strong>Indexing is the selling point.</strong> ${D.indexing} of ${D.ok} say lower tiers help links get indexed.</li>
<li><strong>PBNs appear.</strong> ${D.pbn} of ${D.ok} mention private blog networks, which are sites built to pass links.</li>
<li><strong>Google is not cited.</strong> ${D.policy} of ${D.ok} mention Google's policy in general terms, but none quote or link its documentation.</li>
</ul>

<h2>What Google's Rules Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/tiered-link-building-doc.png" alt="Google Search Central spam policy excerpt: link spam is creating links to or from a site primarily to manipulate rankings, with examples of automated programs creating links, low-quality directory links and keyword-rich widget links, and the note that paid links are acceptable when qualified with nofollow or sponsored" width="${q[0]}" height="${q[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Google does not mention tiered link building by name in its spam policies, but its definition covers the practice. Link spam is creating links to or from a site primarily to manipulate search rankings, and the examples include using automated programs or services to create links, low-quality directory or bookmark site links and keyword-rich or hidden widget links. Lower tiers are, almost by definition, links created to strengthen other links, which is the stated purpose in every guide. Google also says buying and selling links is normal for advertising and sponsorship when the links are qualified with <code>nofollow</code> or <code>sponsored</code>. A paid tier 1 placement can be acceptable if it is marked. A lower tier built to pass ranking credit is not an advertisement, and no attribute turns it into one.</p>

<h2>What We Measured: Pages Get Found Without Tiers</h2>
<p>The main practical argument for a lower tier is indexing: Google must find the tier 1 page. We checked how fast our own new pages were found with no lower tiers at all. In our <a href="/blog/how-to-index-backlinks">indexing check</a>, 11 of 12 pages we published between 15 and 17 October 2026 were already in Google's index within one to three days, including all four published the day before. The pages sat on a site Google already visits and were linked from other pages Google crawls. Google's documentation says crawling takes from a few days to a few weeks and that requests are not guaranteed. That is a sample about our own pages, not backlinks, but it shows what drives discovery: links from crawled pages on the same site, a sitemap and a crawlable page. A tier 2 network adds none of those.</p>

<h2>The Real Risks of Tiering</h2>
<ul>
<li><strong>Policy risk.</strong> Automated and manipulative links are named examples of link spam, and a lower tier is usually built with tools or networks.</li>
<li><strong>Cost with no proof.</strong> ${D.price} of ${D.ok} guides show a price, but none show a result for a real site, and none cite a test of tiers.</li>
<li><strong>A weak base.</strong> If the tier 1 page is thin or unrelated, extra links to it do not make it a good link.</li>
<li><strong>Wasted effort.</strong> The same time spent earning one editorial link on a relevant page usually does more.</li>
<li><strong>Hard to undo.</strong> A pile of low-quality lower-tier links is easy to build and hard to clean up, as our guide to the <a href="/blog/google-disavow-backlinks">Google disavow tool</a> explains.</li>
</ul>

<h2>Why the Tier 1 Page Matters More Than Anything Below It</h2>
<p>Every explanation of tiers hides an assumption: that the tier 1 page is worth strengthening. If a page links to you from a site with no readers, from an unrelated topic or from a list of hundreds of links, adding more links to it does not change what the page is. A strong tier 1 link, by contrast, is a page that already attracts readers and links of its own, such as an editorial article or a well-kept resource page. Those pages do not need a layer of artificial links beneath them, and putting one there can damage the very asset you wanted to protect. So spend the effort at the top of the pyramid: choose better tier 1 pages, make sure each is relevant, indexed and followed where it should be, and measure what it brings.</p>

<h2>How to Judge a Tiered Link Building Service</h2>
<p>If a provider offers tiers, ask questions that separate marketing from method. Which sites will the lower tiers sit on, and will you see the list? Is any part automated, and if so which tools are used? What happens to the lower-tier links if Google changes its policy? Can the provider show a case with real pages, real dates and Search Console data, not screenshots of a rank tracker? How are paid placements marked? And what is the exit plan if you decide to stop? A provider who will not answer these in writing is asking you to carry the risk. Divide the price by the number of live links and use our <a href="/tools/link-building-cost-calculator">link building cost calculator</a> to see what you are really paying for, then compare it with the cost of earning one relevant tier 1 link.</p>

<h2>If You Have Already Built Lower Tiers</h2>
<p>Do not panic and do not add more. Check Search Console for a manual action. If there is none, stop building lower tiers and concentrate on earning relevant links. If you control any of the lower-tier pages, remove the links or add the right attribute. Google says that in most cases it can work out which links to trust without help and keeps its disavow tool for sites with a considerable number of spammy or artificial links that have caused, or are likely to cause, a manual action. Our guide to the <a href="/blog/google-disavow-backlinks">Google disavow tool</a> explains the two-part test and how to build a clean file if you meet it. Keep a record of what you built, when and with which provider, because you will need it if you ever have to explain or clean it up.</p>

<h2>Safer Ways to Get What Tiers Promise</h2>
<ul>
<li><strong>Get the page indexed honestly.</strong> Link to your tier 1 pages from your own crawled pages, share them where people will really read them and, if you own the page, request indexing in Search Console.</li>
<li><strong>Make the tier 1 page worth linking to.</strong> A useful page earns its own links, as we show in <a href="/blog/linkable-assets">linkable assets</a>.</li>
<li><strong>Build links where readers are.</strong> Resource pages, broken links and editorial mentions, as in <a href="/blog/resource-page-link-building">resource page link building</a> and <a href="/blog/editorial-backlinks">editorial backlinks</a>.</li>
<li><strong>Support content you control.</strong> Link to your own guest posts and articles from your site and share them, which is ordinary promotion, not a network.</li>
<li><strong>Plan with goals.</strong> Put the work in a <a href="/blog/link-building-campaign">link building campaign</a> with KPIs.</li>
</ul>

<h2>Tiered Link Building and Guest Posts</h2>
<p>The question often arises with guest posts and contributed articles. You publish an article on another site with a link to yours, and then you want to push that article with extra links. There is an honest version of this and a risky one. The honest version is promotion: share the article with your audience, link to it from your own site where it genuinely helps readers, mention it in a newsletter and send it to people who would find it useful. That brings readers, and a page that readers visit is a page Google is more likely to keep. The risky version is creating links to the article from sites made only to pass value, which is a lower tier by another name. Google's policy also lists links with optimised anchor text in guest posts and articles distributed on other sites among its examples, so keep guest post links natural and limited. Our guide to <a href="/blog/guest-posting-vs-niche-edits-2026">guest posting versus niche edits</a> goes deeper on how to do this well.</p>

<h2>Why "It Worked for Someone" Is Not Evidence</h2>
<p>Many guides on this topic lean on stories: someone built tiers and saw a ranking rise. A single ranking move tells you little, because rankings change for many reasons at once, including new content, other links, seasonality and updates to Google's systems. To show that a lower tier helped, you would need a controlled comparison, with similar pages, one with tiers and one without, measured over time. None of the ${D.ok} guides we read offer one. Until you see that evidence, treat claims about tiers as marketing, and weigh them against the clear statement in Google's own documentation about the kinds of link creation it treats as spam.</p>

<h2>A Quick Test Before You Build Any Lower Tier</h2>
<ol>
<li><strong>Is anything automated?</strong> If software creates the links, it is on Google's list.</li>
<li><strong>Would you show a reviewer every page?</strong> If you would hide the network, do not build it.</li>
<li><strong>Would the page exist without the link?</strong> Pages made only to pass value are the problem.</li>
<li><strong>Do real readers use the page?</strong> A link on a page nobody reads sends no one.</li>
<li><strong>Is tier 1 earned?</strong> Fix the base before you add layers.</li>
</ol>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-tiered-link-building.png" alt="Infographic of what 6 pages ranking for tiered link building mention and four questions to ask before building a lower tier of links" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the 8 organic results for one query on one day (Google US, 22 October 2026). Six were guides we could read and two were forum threads that we did not count.</li>
<li>Counts show whether a page mentions a term, not how well it explains it. The tier descriptions are our summary of how the guides describe them.</li>
<li>The indexing figures come from our own check of 12 new pages on 18 October 2026 and are not a test of tiers.</li>
<li>Google's statements come from its Search Central spam policies, read on 22 October 2026. Google does not name tiered link building in them, so our link to that practice is our reading of its definition of link spam.</li>
<li>Results in other countries or at other times will differ.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Tiered link building builds links to the pages that link to you, in layers. All ${D.ok} guides we read describe three tiers.</li>
<li>Google's spam policies list automated link creation and low-quality or widget links as link spam, which describes most lower tiers.</li>
<li>None of the guides cite Google's documentation or show a real result.</li>
<li>Our new pages were found within one to three days without any tiers.</li>
<li>Earn tier 1 links on relevant pages and promote them honestly instead.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is tiered link building?</summary>
<p>It is building links to the pages that link to your site, and then links to those pages, in layers called tiers. Tier 1 points at your site, tier 2 at tier 1 and tier 3 at tier 2.</p>
</details>
<details>
<summary>Is tiered link building safe?</summary>
<p>Google lists automated link creation and low-quality or widget links as link spam. Most lower tiers are built that way, so the practice carries risk and Google does not endorse it.</p>
</details>
<details>
<summary>What are tier 2 backlinks?</summary>
<p>They are links that point to the pages linking to you, not to your own site, meant to strengthen those pages and help get them indexed.</p>
</details>
<details>
<summary>Does Google penalise tiered links?</summary>
<p>Google does not name tiered links, but its policy targets links created primarily to manipulate rankings. The consequence of breaking it can be a manual action or the links being ignored.</p>
</details>
<details>
<summary>Do I need tier 2 links to get a backlink indexed?</summary>
<p>No. In our check, 11 of 12 new pages were indexed within one to three days with no lower tiers, because they were linked from crawled pages and a sitemap.</p>
</details>
<details>
<summary>What is a link pyramid?</summary>
<p>It is another name for tiered link building, drawn as a pyramid with your site at the top and more links in each layer below.</p>
</details>
<details>
<summary>Are paid tier 1 links allowed?</summary>
<p>Google says buying and selling links is normal for advertising when the links are qualified with nofollow or sponsored. Paid links without that qualification can break its link spam policy.</p>
</details>
<details>
<summary>What should I do instead of tiering?</summary>
<p>Earn links on relevant pages through resources, broken links and editorial mentions, link to your own pages from crawled pages and promote them honestly.</p>
</details>
<details>
<summary>How can I check what links point to my pages?</summary>
<p>Use the Links report in Search Console and the free method in our guide to checking the backlinks of a website.</p>
</details>
</div>
`;
const title = 'Tiered Link Building: What 6 Top Guides Skip About Google';
const excerpt = `Tiered link building explained after reading ${D.ok} ranking guides: ${D.risk} admit the risk, none cite Google's documentation. What the rules say and safer alternatives.`;
const out = content.replace('@@TIERSH@@', hh('tiered-link-building-tiers.png')).replace('@@SERPH@@', hh('tiered-link-building-serp.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-22', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
