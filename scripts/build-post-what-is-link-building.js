// Builds the "what is link building" post + assets. node scripts/build-post-what-is-link-building.js [--write]
// Data: 7 organic results for "what is link building and why it matters" (Google US, 19 Oct 2026) + Search Console Links report for contomatix.com (19 Oct 2026) + Google Search Central link best practices. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'what-is-link-building';
const R = require('../../keyword-research/serp-what-is-link-building-2026-10-19.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], relevance: c(o => o.relevance), authority: c(o => o.authority), traffic: c(o => o.traffic), natural: c(o => o.natural), pr: c(o => o.pr), risk: c(o => o.risk), tools: c(o => o.toolsM), internal: c(o => o.internal), cost: c(o => o.cost), policy: c(o => o.googlePolicy), nofollow: c(o => o.nofollowM), study: c(o => o.study), price: c(o => o.price), roi: c(o => o.roi), pagerank: c(o => o.pagerank), ai: c(o => o.ai) };
const exp = { ok: 7, median: 1318, relevance: 7, authority: 7, traffic: 7, natural: 7, pr: 7, risk: 6, tools: 6, internal: 5, cost: 4, policy: 3, nofollow: 3, study: 3, price: 0, roi: 0, pagerank: 2, ai: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// Search Console Links report, contomatix.com, 19 Oct 2026
const G = { ext: 24, sites: 10, internal: 9797, home: 17, tools: 5, editorial: 2, urls: 340 };
const ratio = Math.round(G.internal / G.ext);
console.log(JSON.stringify(D), 'ratio', ratio);
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['WHAT IS', 'LINK BUILDING'], [['Earn Links', 'to Your Pages'], 'Know the Types', ['Follow Google\'s', 'Rules'], 'Start With a Plan', ['Measure', 'Each Month']]);
L.cover(SLUG, { badge: 'REAL LINK COUNTS', search: 'what is link building', card: `Our site on 19 Oct 2026`,
  lines: [`Internal links: ${f(G.internal)}`, `External links: ${G.ext}`, `Linking sites: ${G.sites}`, `Links to the home page: ${G.home} of ${G.ext}`, `Ranking pages read: ${D.ok}`],
  last: 'Links come from pages worth citing', big: `${ratio} to 1`, k1: 'internal links for each', k2: 'external link we have', title: 'What Is Link Building', sub: `Real numbers and what ${D.ok} pages say` });
fs.writeFileSync(path.join(__dirname, 'infographic-what-is-link-building.html'), L.infographicHtml({
  title: `Link Building: ${D.ok} Pages Read`, sub: 'Organic results for "what is link building and why it matters", Google US, 19 October 2026',
  leftTitle: 'What the ranking pages mention', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
  bars: [{ label: 'Relevance', sub: 'topical fit of sites', n: D.relevance }, { label: 'Authority', sub: 'DR, DA or trust', n: D.authority }, { label: 'Tools', sub: 'named link tools', n: D.tools }, { label: 'Internal links', sub: 'your own site', n: D.internal }, { label: 'Google policy', sub: 'spam rules', n: D.policy }],
  rightTitle: 'Link building in four steps', rightTag: 'Start small, measure monthly', items: [
    { t: '1. Pick pages to lift', s: 'and set a KPI' }, { t: '2. Build something citable', s: 'data, tool or guide' },
    { t: '3. Reach the right sites', s: 'relevant, with context' }, { t: '4. Verify and report', s: 'each live link' }],
  big: `${D.price} of ${D.ok}`, noteHtml: `ranking pages show <em>any price</em> for link building, and none discuss return on investment.` }));
fs.writeFileSync(path.join(__dirname, 'table-what-is-link-building-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for what is link building say`, sub: `Organic results read on 19 October 2026 (${D.ok} of ${D.ok} readable). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Relevance', `${D.relevance} of ${D.ok}`], ['Authority, DR or DA', `${D.authority} of ${D.ok}`], ['Natural or earned links', `${D.natural} of ${D.ok}`], ['Digital PR or press', `${D.pr} of ${D.ok}`], ['Named link tools or Search Console', `${D.tools} of ${D.ok}`], ['Risk, penalty or manual action', `${D.risk} of ${D.ok}`], ['Internal links', `${D.internal} of ${D.ok}`], ['Cost, price or budget words', `${D.cost} of ${D.ok}`], ['Google policy or guidelines', `${D.policy} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ['A dollar figure', `${D.price} of ${D.ok}`], ['Return on investment', `${D.roi} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-what-is-link-building-ours.html'), L.tableHtml({ title: 'Link building in numbers: our own site', sub: 'Search Console Links report for contomatix.com on 19 October 2026. A site with roughly 340 live URLs.',
  head: ['Measure', 'Value'], lastBold: false,
  rows: [['Internal links (from our pages to our pages)', f(G.internal)], ['External links (from other sites to us)', String(G.ext)], ['Linking sites', String(G.sites)], ['External links pointing at the home page', `${G.home} of ${G.ext}`], ['External links pointing at free tool pages', `at least ${G.tools}`], ['Editorial mentions inside articles', `${G.editorial} of ${G.ext}`], ['Internal links for each external link', `about ${ratio} to 1`]] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [1262, 904]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const g = sz(path.join(pr, 'google-link-best-practices-anchor-text.jpg'));
const gj = (() => { const b = fs.readFileSync(path.join(pr, 'google-link-best-practices-anchor-text.jpg')); let i = 2; while (i < b.length) { if (b[i] !== 0xFF) { i++; continue; } const m = b[i + 1]; if (m >= 0xC0 && m <= 0xC3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + b.readUInt16BE(i + 2); } return [1262, 904]; })();
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Link building</strong> is the work of getting other websites to link to your pages, and of linking well between your own pages, so that people and search engines can find your content and judge its value. Google says it uses links as a signal when determining the relevancy of pages and to find new pages to crawl. We read the ${D.ok} pages that rank on Google US for the topic, and we pulled the real numbers from our own site: ${f(G.internal)} internal links and ${G.ext} external links, about ${ratio} internal links for every external one.</p>

<p>Below you will find a plain definition, why it matters, what the ranking pages say and skip, what link building looks like in real numbers, the benefits and limits, what Google's rules mean, how to start and how to measure it. Each type of link and tactic has its own guide, and this page links to them, beginning with the <a href="/blog/types-of-backlinks">types of backlinks</a>.</p>

<h2>What Link Building Is</h2>
<p>A backlink is a link from another site to yours. Link building is the set of activities that earn or create those links, and it has two halves. <strong>External link building</strong> aims at links from other sites, through outreach, content people want to cite, partnerships and digital PR. <strong>Internal link building</strong> connects your own pages so visitors and crawlers move through the site, which is covered in our guide to <a href="/blog/internal-link-building">internal link building</a>. Most people mean the external half when they say link building, and the word building can mislead: the links that count most are earned, because an author chose to include them.</p>

<h2>Why Link Building Matters</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-link-best-practices-anchor-text.jpg" alt="Google Search Central Link best practices for Google page: Google uses links as a signal when determining the relevancy of pages and to find new pages to crawl, with guidance on crawlable links, anchor text, internal links and external links" width="${gj[0]}" height="${gj[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Google's own documentation gives two reasons. Links help it find new pages to crawl, and links are a signal when it works out how relevant a page is. That is why a new page that nobody links to can sit unseen, and why a page that relevant sites cite tends to be found faster and understood better. For a business, links also bring something Google cannot see: visitors who follow them, and the credibility of being mentioned by sites readers trust. People often ask why backlinks are important. These three reasons are the answer, and none of them guarantee a ranking.</p>

<h2>What the Ranking Pages Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/what-is-link-building-serp.png" alt="Table of what 7 pages ranking for what is link building mention: relevance 7, authority 7, natural or earned links 7, digital PR 7, tools 6, risk 6, internal links 5, cost words 4, Google policy 3, nofollow or sponsored 3, a dollar figure 0, return on investment 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The core ideas are shared.</strong> All ${D.ok} pages stress relevance, authority, natural or earned links and digital PR.</li>
<li><strong>Risk is acknowledged.</strong> ${D.risk} of ${D.ok} mention risk or penalties, yet only ${D.policy} mention Google's policy and ${D.nofollow} mention nofollow or sponsored links.</li>
<li><strong>Internal links are half the story.</strong> ${D.internal} of ${D.ok} mention internal links, which are the part you fully control.</li>
<li><strong>Money is missing.</strong> No page shows a dollar figure and none discuss return on investment, even though ${D.cost} of ${D.ok} use words about cost. If you want to work out your own, use the <a href="/tools/link-building-cost-calculator">link building cost calculator</a>.</li>
<li><strong>Proof is rare.</strong> Only ${D.study} of ${D.ok} refer to a study or data, and none show a real site's link profile.</li>
</ul>

<h2>Link Building in Real Numbers: Our Own Site</h2>
<p>To show what the activity looks like on a real, young site, here are our own figures from Search Console on 19 October 2026.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/what-is-link-building-ours.png" alt="Table of Contomatix link numbers on 19 October 2026: 9,797 internal links, 24 external links, 10 linking sites, 17 of 24 external links pointing at the home page, at least 5 pointing at free tool pages, 2 editorial mentions and about 408 internal links for each external link" width="1280" height="@@OURSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Internal links vastly outnumber external ones.</strong> We have ${f(G.internal)} internal links across roughly ${G.urls} live URLs, and ${G.ext} external links from ${G.sites} sites. The part we control is large, and the part others control is small.</li>
<li><strong>External links cluster on the home page.</strong> ${G.home} of ${G.ext} point at the home page, which is typical of directory listings and brand mentions.</li>
<li><strong>Tools attract links to inner pages.</strong> At least ${G.tools} of the external links point at our free tool pages, which is how an inner page earns links when a service page rarely does.</li>
<li><strong>Few are editorial.</strong> ${G.editorial} of ${G.ext} are mentions inside articles. We break that down in our guide to <a href="/blog/editorial-backlinks">editorial backlinks</a>.</li>
</ul>
<p>The lesson is practical: link building for a new site starts with what you control. Fix your internal links first, then build something worth citing, then work on reaching the sites that would cite it.</p>

<h2>The Benefits of Link Building, and Their Limits</h2>
<ul>
<li><strong>Discovery.</strong> Links from crawled pages help Google find your pages sooner.</li>
<li><strong>Relevance signals.</strong> Links, with their anchor text and context, help Google understand what a page is about and how others see it.</li>
<li><strong>Referral traffic.</strong> Visitors who follow a link are already interested in the topic.</li>
<li><strong>Trust and brand.</strong> Being cited by relevant sites builds recognition.</li>
<li><strong>Relationships.</strong> Outreach and partnerships create contacts that last longer than one link.</li>
</ul>
<p>The limits matter as much. Nobody can guarantee that a link will move a page, links work alongside content quality and technical health, and low-quality links can do harm. Be sceptical of anyone who promises results by a date.</p>

<h2>What Google's Rules Mean for Link Building</h2>
<p>Google treats links made mainly to influence rankings as spam. Its list of examples covers paying for links, swapping them in bulk, generating them with software and posting them on low-quality directories. Advertising is a separate case: Google accepts sponsored placements when the link is flagged with <code>sponsored</code> or <code>nofollow</code>. The working rules follow from that: earn links on merit, flag anything paid and stay away from patterns built only for rankings. Our guides on <a href="/blog/backlinks-exchange">backlink exchanges</a> and the <a href="/blog/google-disavow-backlinks">Google disavow tool</a> go deeper on what happens when those rules are broken.</p>

<h2>Link Building and Content Marketing</h2>
<p>People ask about the relationship between SEO and content marketing, and link building sits where they meet. Content is what earns links: a guide that answers a question better than the existing pages, a free tool, a data study or a template. Link building is the work of making sure the right people see that content. Without good content, outreach has nothing to offer. Without outreach, good content can wait a long time to be found. Treat them as one process: create something worth citing, then reach the sites that would cite it.</p>

<h2>Nofollow and Dofollow Links in Brief</h2>
<p>A link with no rel value is followed by default, and links can be qualified with nofollow, sponsored or ugc. You do not need to chase only followed links, because a natural profile contains both. For the detail, read our guide to <a href="/blog/do-nofollow-links-help-seo-2026">whether nofollow links help SEO</a>, and use the <a href="/tools/dofollow-link-checker">dofollow link checker</a> to see the attribute of any link.</p>

<h2>How to Start Link Building</h2>
<ol>
<li><strong>Choose the pages to lift and one KPI.</strong> A plan with a goal beats a general wish for more links. See our <a href="/blog/link-building-campaign">link building campaign guide</a>.</li>
<li><strong>Fix your internal links.</strong> Make sure each important page is linked from relevant pages on your own site.</li>
<li><strong>Build something worth citing.</strong> Original data, a free tool or a clear guide.</li>
<li><strong>Find relevant sites.</strong> Resource pages, articles that mention the topic and sites with dead links. See <a href="/blog/resource-page-link-building">resource page link building</a>.</li>
<li><strong>Reach out with context.</strong> Write short, specific emails with the free <a href="/tools/outreach-email-generator">outreach email generator</a>.</li>
<li><strong>Verify and report.</strong> Check each live link, its attribute and whether the page is indexed. See <a href="/blog/how-to-index-backlinks">how to index backlinks</a>.</li>
</ol>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-what-is-link-building.png" alt="Infographic of what 7 pages ranking for what is link building mention and four steps to start link building" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>What Makes a Good Link</h2>
<p>All ${D.ok} ranking pages talk about relevance and authority, and the two ideas are easy to over-simplify. A good link has four qualities. It is <strong>relevant</strong>: the linking page covers a topic close to yours. It has <strong>readers</strong>: real people visit the page, so the link can send visitors. It has <strong>context</strong>: it sits in a sentence that explains why it is there. And it is <strong>honest</strong>: it was earned or properly marked, not traded or hidden. Authority scores such as DR or DA are a quick filter, since a score is a third-party estimate, but they are not the same as relevance. A modest site that serves your exact audience can be a better source than a famous site with no connection to your topic. Our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a> shows how to score fit.</p>

<h2>Link Building for Different Kinds of Sites</h2>
<p>The same principles apply, but the mix differs. A <strong>software or tool site</strong> can earn links to free tools and data, as ours has, and benefits from integration and comparison pages. A <strong>service business</strong> usually earns links through case studies, expert mentions and local or industry associations. A <strong>publisher or blog</strong> earns links by being the clearest source on a topic. An <strong>ecommerce store</strong> can earn links through useful buying guides, supplier and partner pages and original product data. In each case, the first question is the same: what would someone writing about this topic want to cite, and do we have it?</p>

<h2>A Beginner's First Month</h2>
<p>You do not need a large budget to start. In the first week, export your links from Search Console and note your current numbers. In the second, fix internal links to your most important pages and pick one asset worth citing. In the third, build a list of twenty relevant sites that already link to similar content, and check each for relevance and real readers. In the fourth, send a first wave of short, specific emails and log every reply. At the end of the month, count live links, replies and any change in impressions for the target page. The first month is mainly about learning what your audience and your assets can earn, and setting a baseline that makes the next month easier.</p>

<h2>How to Measure Link Building</h2>
<p>Measure outcomes, not just counts. Each month, record the new live links and their referring pages, the impressions and clicks for the target pages in Search Console and the conversions from those pages. Compare each month with the baseline you set at the start. Rising impressions on a target page are the first honest sign. Use the <a href="/tools/seo-report-generator">SEO report generator</a> to turn those numbers into a one-page summary, and our guide to <a href="/blog/check-backlinks-of-website">checking the backlinks of a website</a> for the free method of pulling the data.</p>

<h2>Common Link Building Mistakes</h2>
<ul>
<li><strong>Starting with tactics, not a goal.</strong> Decide which pages and which outcome first.</li>
<li><strong>Buying links without marking them.</strong> Paid links should be sponsored or nofollow.</li>
<li><strong>Ignoring internal links.</strong> They are the part you control.</li>
<li><strong>Measuring only link counts.</strong> Measure referring pages, impressions and conversions.</li>
<li><strong>Expecting speed.</strong> Links take weeks to be found and months to show in results.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>We read the ${D.ok} organic results for one query on one day (Google US, 19 October 2026). All ${D.ok} returned a readable page.</li>
<li>Counts show whether a page mentions a term, not how well it explains it.</li>
<li>Our link numbers come from the Search Console Links report for contomatix.com on 19 October 2026. Counts of tool-page links are a floor, based on the top linked pages shown.</li>
<li>Google's statements come from its Search Central link best practices and spam policies, read on 19 October 2026.</li>
<li>Results for other sites and dates will differ.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Link building is earning links from other sites, and connecting your own pages, so content is found and trusted.</li>
<li>Google uses links to discover pages and as a relevance signal. No one can guarantee a ranking from a link.</li>
<li>On our own site, internal links outnumber external ones about ${ratio} to 1, so start with what you control.</li>
<li>Earn links on merit, mark paid ones as sponsored or nofollow and avoid patterns built for rankings.</li>
<li>Plan with a goal, a baseline and a monthly report.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is link building?</summary>
<p>It is the work of getting other sites to link to your pages and linking well between your own pages, so people and search engines can find and judge your content.</p>
</details>
<details>
<summary>Why is link building important for SEO?</summary>
<p>Google says it uses links to find new pages and as a signal of relevance. Links also bring referral visitors and build trust, though none of this guarantees a ranking.</p>
</details>
<details>
<summary>What are the benefits of link building?</summary>
<p>Faster discovery of pages, stronger relevance signals, referral traffic, brand recognition and lasting relationships with relevant sites.</p>
</details>
<details>
<summary>What is the difference between internal and external link building?</summary>
<p>Internal link building connects your own pages. External link building earns links from other sites. Internal links are fully under your control.</p>
</details>
<details>
<summary>Is link building safe?</summary>
<p>It is safe when links are earned on merit and paid placements are marked as sponsored or nofollow. Buying, exchanging at scale or automating links breaks Google's link spam policy.</p>
</details>
<details>
<summary>What is the relationship between SEO and content marketing?</summary>
<p>Content marketing creates the pages worth citing, and link building makes sure the right people see them. Both support search visibility.</p>
</details>
<details>
<summary>Do nofollow links matter?</summary>
<p>They can still send visitors and build awareness, and a natural profile contains some. Followed links are simply links with no qualifying value.</p>
</details>
<details>
<summary>How long does link building take to work?</summary>
<p>Links take weeks to be found and often months to show in results. Track target pages monthly against a baseline instead of expecting a quick jump.</p>
</details>
<details>
<summary>How much does link building cost?</summary>
<p>The answer changes with who does the work and which sites you target. Enter your own quotes or hours in the cost calculator and read the cost per live link it returns.</p>
</details>
</div>
`;
const title = 'What Is Link Building? Real Numbers From Our Own Site';
const excerpt = `What is link building and why it matters: Google's view, ${D.ok} ranking pages and our real numbers (${f(G.internal)} internal vs ${G.ext} external links). How to start.`;
const out = content.replace('@@SERPH@@', hh('what-is-link-building-serp.png')).replace('@@OURSH@@', hh('what-is-link-building-ours.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-19', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
