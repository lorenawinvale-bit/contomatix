// Builds the "backlinks exchange" post + assets. node scripts/build-post-backlinks-exchange.js [--write]
// Data: the 9 organic results for "backlinks exchange" (Google US, read 18 Oct 2026; 8 readable) + Google Search Central spam policy. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'backlinks-exchange';
const R = require('../../keyword-research/serp-backlinks-exchange-2026-10-18.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { shown: R.length, ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], policy: c(o => o.googlePolicy), penalty: c(o => o.penalty), nofollow: c(o => o.nofollow), risk: c(o => o.risk), reciprocal: c(o => o.reciprocal), threeWay: c(o => o.threeWay), guarantee: c(o => o.guarantee), relevance: c(o => o.relevance), automated: c(o => o.automated), price: c(o => o.price), cases: c(o => o.caseStudy) };
const exp = { shown: 9, ok: 8, median: 1617, policy: 5, penalty: 4, nofollow: 2, risk: 7, reciprocal: 5, threeWay: 5, guarantee: 5, relevance: 7, automated: 6, price: 7, cases: 0 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['BACKLINKS', 'EXCHANGE'], [['Know the', 'Four Types'], 'Read Google\'s Rules', ['Check the', 'Offer'], 'Say No Politely', ['Earn Links', 'Instead']]);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'backlinks exchange', card: `Pages read: ${D.ok} of ${D.shown}`,
  lines: [`Median page length: ${f(D.median)} words`, `Mention risk: ${D.risk} of ${D.ok}`, `Mention Google policy: ${D.policy} of ${D.ok}`, `Mention nofollow: ${D.nofollow} of ${D.ok}`, `Use guarantee wording: ${D.guarantee} of ${D.ok}`],
  last: 'Weigh the risk first', big: `${D.nofollow} of ${D.ok}`, k1: 'ranking pages mention', k2: 'nofollow or sponsored', title: 'Backlinks Exchange', sub: `What ${D.ok} ranking pages say, and skip` });
fs.writeFileSync(path.join(__dirname, 'infographic-backlinks-exchange.html'), L.infographicHtml({
  title: `Backlinks Exchange: ${D.ok} Pages Read`, sub: 'Organic results for "backlinks exchange", Google US, 18 October 2026',
  leftTitle: 'What the ranking pages mention', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
  bars: [{ label: 'Risk', sub: 'say exchanges carry risk', n: D.risk }, { label: 'Relevance', sub: 'topical fit of sites', n: D.relevance }, { label: 'Google policy', sub: 'spam rules or guidelines', n: D.policy }, { label: 'Guarantee wording', sub: 'guarantee or 100 percent', n: D.guarantee }, { label: 'Nofollow or sponsored', sub: 'qualifying a link', n: D.nofollow }],
  rightTitle: 'Before you accept an exchange', rightTag: 'Four questions', items: [
    { t: 'Is the link editorial?', s: 'would you link without the swap' }, { t: 'Is the site relevant?', s: 'topic, readers, real traffic' },
    { t: 'Is it a pattern?', s: 'many swaps look manufactured' }, { t: 'Is anything automated?', s: 'platforms and bots are a flag' }],
  big: `${D.nofollow} of ${D.ok}`, noteHtml: `pages mention <em>nofollow or sponsored</em>. Google names excessive link exchanges as link spam, so read its rule first.` }));
fs.writeFileSync(path.join(__dirname, 'table-backlinks-exchange-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for backlinks exchange say`, sub: `Organic results read on 18 October 2026 (${D.shown} listed, ${D.ok} returned a readable page; one blocked our request). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Risk or caution', `${D.risk} of ${D.ok}`], ['Relevance', `${D.relevance} of ${D.ok}`], ['A price, credits or free plan', `${D.price} of ${D.ok}`], ['Automation or software', `${D.automated} of ${D.ok}`], ['Reciprocal or swap wording', `${D.reciprocal} of ${D.ok}`], ['Three-way exchanges', `${D.threeWay} of ${D.ok}`], ['Guarantee or 100 percent wording', `${D.guarantee} of ${D.ok}`], ['Google policy or guidelines', `${D.policy} of ${D.ok}`], ['Penalty or manual action', `${D.penalty} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ['Case studies', `${D.cases} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-backlinks-exchange-types.html'), L.tableHtml({ title: 'Four kinds of link exchange, compared', sub: 'Our reading of how each type works and what stands out to a reviewer. Not a guarantee of how Google treats any single link.',
  head: ['Type', 'How it works', 'Pattern to watch'], lastBold: false,
  rows: [['Reciprocal', 'Site A links to B and B links to A', 'Many swaps with strangers'], ['Three-way', 'A links to B, B to C, C to A', 'Chains built to hide the swap'], ['Platform or credit', 'A tool matches sites and tracks credits', 'Automation and volume'], ['Partner page', 'A page of "partners" for cross-linking', 'No real business link']] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [900, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const g = sz(path.join(pr, 'google-link-spam-policy-examples.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>A <strong>backlinks exchange</strong> is an agreement where two sites link to each other, or a group of sites trade links, so each one gets a backlink without earning it editorially. Before writing this guide we read the ${D.ok} readable pages that rank on Google US for the term. ${D.risk} of ${D.ok} admit the risk, yet only ${D.nofollow} mention nofollow or sponsored links, and ${D.guarantee} of ${D.ok} use guarantee-style wording. Google lists "excessive link exchanges" as an example of link spam, so the details matter.</p>

<p>Below you will find what a backlink exchange is, the four types, what the ranking pages say, what Google's rules actually cover, how to evaluate an exchange offer, how to reply when someone asks, and safer ways to earn links. It sits alongside our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a>.</p>

<h2>What a Backlinks Exchange Is</h2>
<p>People use several names for the same idea: backlink exchange, SEO link exchange, link exchanges or reciprocal backlinks. In every case, the link is given in return for another link, not because the author thought readers would find it useful. That is the difference between an exchange and a normal editorial mention. A natural link says "this is worth reading". An exchanged link says "I will link to you if you link to me".</p>
<p>Not every two-way link is an exchange. Two businesses that really work together, such as a supplier and a customer, may each mention the other on their sites. A speaker may link to the event, and the event may link back to the speaker. What makes it an exchange in the problematic sense is the arrangement: linking as a trade, in volume, with sites that have nothing in common.</p>

<h2>The Four Kinds of Link Exchange</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/backlinks-exchange-types.png" alt="Table comparing four kinds of link exchange: reciprocal, three-way, platform or credit, and partner page, with how each works and the pattern to watch" width="1280" height="@@TYPESH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Reciprocal:</strong> A links to B and B links to A. It is the simplest and the easiest for a reviewer to notice.</li>
<li><strong>Three-way:</strong> A links to B, B links to C and C links to A. ${D.threeWay} of ${D.ok} ranking pages describe it, because it hides the swap. Hiding the pattern does not change what it is.</li>
<li><strong>Platform or credit systems:</strong> a tool matches sites and tracks credits for links given and received. ${D.automated} of ${D.ok} pages mention software or automation, and automated link creation is a separate item on Google's list.</li>
<li><strong>Partner pages:</strong> a page of "partners" created mostly to cross-link. Google names partner pages exclusively for the sake of cross-linking.</li>
</ul>

<h2>What the Ranking Pages Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/backlinks-exchange-serp.png" alt="Table of what 8 pages ranking for backlinks exchange mention: risk 7, relevance 7, price or credits 7, automation 6, reciprocal wording 5, three-way 5, guarantee wording 5, Google policy 5, penalty 4, nofollow or sponsored 2, case studies 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Everyone mentions risk, many still sell it.</strong> ${D.risk} of ${D.ok} mention risk, and ${D.price} of ${D.ok} show a price, credits or a free plan, so many of the pages are offering the exchange, not only explaining it.</li>
<li><strong>Relevance is the selling point.</strong> ${D.relevance} of ${D.ok} stress relevant sites. Relevance helps readers, but it does not make an exchange acceptable on its own.</li>
<li><strong>Guarantees appear.</strong> ${D.guarantee} of ${D.ok} use guarantee or 100 percent wording. Nobody can guarantee how Google will treat a link.</li>
<li><strong>Proof is absent.</strong> None of the ${D.ok} pages show a case study with results.</li>
<li><strong>Qualifying links is rare.</strong> Only ${D.nofollow} of ${D.ok} mention nofollow, sponsored or ugc, which are the attributes Google documents for qualifying links.</li>
</ul>

<h2>What Google's Rules Say About Link Exchanges</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-link-spam-policy-examples.png" alt="Google Search Central link spam policy excerpt listing buying or selling links, excessive link exchanges, partner pages exclusively for cross-linking, automated link creation, and the note that links are acceptable when qualified with nofollow or sponsored" width="${g[0]}" height="${g[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Google's spam policies define link spam as creating links to or from a site primarily to manipulate search rankings. The examples include excessive link exchanges ("Link to me and I'll link to you") or partner pages exclusively for the sake of cross-linking, exchanging goods or services for links, and using automated programs or services to create links. Two words do the work: <em>excessive</em> and <em>primarily</em>. One link between two businesses that genuinely work together is not the target. A pattern of swaps made for rankings is.</p>
<p>${D.policy} of ${D.ok} ranking pages mention Google's policy, and ${D.penalty} mention penalties or manual actions. The consequences can include a manual action or links being ignored, so the safe assumption is that exchanges you would not do in public are not worth doing.</p>

<h2>Why Exchanges Appeal, and Why Their Value Is Weak</h2>
<p>The appeal is obvious: links help pages rank, earning them is slow, and a swap feels fast and free. The weakness is built in. A link that exists only because of a trade tells search engines nothing about whether your page is good, since the author did not choose it on merit. Sites that join exchanges also tend to be sites with little audience, so the links rarely send visitors either. Meanwhile the cost is real: your time, your editorial standards and, at scale, a footprint that looks manufactured. A single link from a respected publication that chose to cite you will usually outweigh dozens of swapped ones.</p>

<h2>Natural Two-Way Links That Are Fine</h2>
<p>Some two-way links are simply how the web works. A conference links to its speakers, and speakers link to the conference. A software company lists integration partners, and the partners list the software. A local association lists its members, and members mention the association. In each case the link exists for readers, the relationship is real and no one agreed to swap links as a deal. If you could explain the link to a visitor in one sentence without mentioning rankings, it is probably the natural kind.</p>

<h2>How to Spot Exchanges in Your Own Backlink Profile</h2>
<p>Open the Links report in Search Console and export the top linking sites. Look for sites you link to as well, pages titled "partners" or "links", clusters of links from unrelated sites with similar anchor text and sites that appeared suddenly in a batch. Then open a few of the linking pages to see where the link sits and whether the page has any readers. Our guide to <a href="/blog/check-backlinks-of-website">checking the backlinks of a website</a> shows the free method. If you find a swap you made in the past, the simplest fix is often to remove your side of the link and ask the other site to remove theirs.</p>

<h2>What to Do If You Already Did Exchanges</h2>
<p>Do not panic. Google says that in most cases it can work out which links to trust without help, and it reserves the disavow tool for sites with a considerable number of spammy or artificial links that caused, or are likely to cause, a manual action. Start by removing the exchange links you control and stop making new ones. Check Search Console for a manual action message. If there is none and the links are few, keep your effort on earning better ones. If you do have a large pattern and a manual action, read our guide to the <a href="/blog/google-disavow-backlinks">Google disavow tool</a> before you upload anything.</p>

<h2>How to Evaluate a Link Exchange Offer</h2>
<ol>
<li><strong>Would you link to them anyway?</strong> If their page would help your readers without the swap, the link has an editorial reason.</li>
<li><strong>Is the site relevant and real?</strong> Check the topic, recent posts, traffic and whether the site has real readers.</li>
<li><strong>Is it a one-off or a pattern?</strong> A single natural mention is different from a trade offered to dozens of sites.</li>
<li><strong>Is anything automated?</strong> Platforms, bots and credit systems are flags.</li>
<li><strong>Where would the link sit?</strong> Footers, sidebars and "partner" pages created for swaps are weaker and riskier than a link inside useful content.</li>
<li><strong>How would you explain it to Google?</strong> If your honest answer is "we traded links for rankings", skip it.</li>
</ol>

<h2>How to Reply to a Link Exchange Request</h2>
<p>Many site owners get emails proposing a swap. A short, polite reply is enough: "Thanks for getting in touch. We do not exchange links, but if you have a page that would help our readers, send it and we will consider it on its merits." That keeps the door open for a genuine editorial link without agreeing to a trade. Do not engage with offers that mention credits, networks or guaranteed placements.</p>

<h2>Exchange Link Versus Editorial Link: A Quick Comparison</h2>
<ul>
<li><strong>Reason:</strong> an exchange link exists because of a deal. An editorial link exists because the author thought the page was useful.</li>
<li><strong>Placement:</strong> exchange links often sit in footers, sidebars or lists of partners. Editorial links sit inside the content they support.</li>
<li><strong>Anchor text:</strong> exchange anchors are often chosen by the receiver. Editorial anchors describe the page in the author's words.</li>
<li><strong>Audience:</strong> exchange sites are often built for links. Editorial sites have readers who might click.</li>
<li><strong>Durability:</strong> exchange links vanish when the deal ends or the pattern is found. Editorial links tend to stay while the page is useful.</li>
</ul>
<p>When you evaluate any link you have or are offered, ask which column it falls into. The answer is usually clear within a minute.</p>

<h2>How to Get Reciprocal Links the Right Way</h2>
<p>If you want links that point both ways, the honest route is to build real relationships. Suppliers, customers, associations, event organisers and partners often link to each other because it is useful to readers. List your genuine partners on a page that explains the relationship, and link to partners only when readers benefit. Mark any link that has a commercial arrangement as <code>sponsored</code> or <code>nofollow</code>. Do not create a "partners" page just to hold swaps.</p>

<h2>Safer Ways to Earn Backlinks</h2>
<ul>
<li><strong>Resource pages.</strong> Suggest a useful page to a curated list. See our guide to <a href="/blog/resource-page-link-building">resource page link building</a>.</li>
<li><strong>Broken link replacement.</strong> Report a dead link and offer a working page, as in <a href="/blog/find-broken-backlinks">finding broken backlinks</a>.</li>
<li><strong>Original data and tools.</strong> Publish something people want to cite, such as a free tool or a study.</li>
<li><strong>Guest contributions and digital PR.</strong> Offer real expertise, not a link trade.</li>
<li><strong>A planned campaign.</strong> Set goals and KPIs, as described in our <a href="/blog/link-building-campaign">link building campaign guide</a>.</li>
</ul>
<p>Draft the outreach with our free <a href="/tools/outreach-email-generator">link building outreach email generator</a>, which never writes an offer of payment or a link swap.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-backlinks-exchange.png" alt="Infographic of what 8 pages ranking for backlinks exchange mention and four questions to ask before accepting a link exchange" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Common Link Exchange Mistakes</h2>
<ul>
<li><strong>Treating relevance as permission.</strong> A relevant swap is still a swap.</li>
<li><strong>Joining a platform.</strong> Credit systems create patterns at scale.</li>
<li><strong>Building a partners page for swaps.</strong> It is on Google's list of examples.</li>
<li><strong>Believing a guarantee.</strong> Nobody can promise how a link will be treated.</li>
<li><strong>Skipping the check.</strong> Review who links to you with the <a href="/tools/dofollow-link-checker">dofollow link checker</a> and the Links report in Search Console.</li>
</ul>

<p>The pattern across all of these mistakes is the same: they treat a link as a number to collect instead of a recommendation to earn. If you keep your attention on pages worth citing and people worth working with, the exchange offers in your inbox stop looking attractive, and your link profile ends up easier to defend if anyone ever asks about it.</p>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the ${D.shown} organic results for one query on one day (Google US, 18 October 2026); ${D.ok} returned a readable page and one blocked our request.</li>
<li>Counts show whether a page mentions a term, not how well it explains it. Some results are platforms that offer exchanges, not guides.</li>
<li>The comparison of exchange types is our reading of common patterns, not a measurement.</li>
<li>Google's policy wording comes from its Search Central spam policies, read on 18 October 2026.</li>
<li>Results in other countries or at other times will differ, so rerun the check on your own market.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A backlinks exchange trades links instead of earning them, and Google names excessive link exchanges as link spam.</li>
<li>Only ${D.nofollow} of ${D.ok} ranking pages mention nofollow or sponsored, and ${D.guarantee} of ${D.ok} use guarantee wording. Be sceptical of both.</li>
<li>Ask four questions: editorial, relevant, a pattern, automated.</li>
<li>Decline swap requests politely and offer to consider useful pages on merit.</li>
<li>Earn links through resource pages, broken links, data and a planned campaign.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is a backlinks exchange?</summary>
<p>It is an arrangement where sites link to each other, or trade links in a group, so that each gets a backlink in return for giving one.</p>
</details>
<details>
<summary>Is a backlink exchange against Google's rules?</summary>
<p>Google lists excessive link exchanges, and partner pages made exclusively for cross-linking, as link spam. Occasional natural mutual links between genuinely related sites are a different matter.</p>
</details>
<details>
<summary>What are reciprocal backlinks?</summary>
<p>They are links where two sites link to each other. A few between real partners are normal. Many arranged for rankings are what Google's policy targets.</p>
</details>
<details>
<summary>How do I get reciprocal links safely?</summary>
<p>Build real relationships with suppliers, customers, associations and partners, link only when it helps readers, and mark any commercial arrangement as sponsored or nofollow.</p>
</details>
<details>
<summary>What is a three-way link exchange?</summary>
<p>It is a trade where A links to B, B links to C and C links to A. It tries to hide the swap, but it is still an arrangement made for links.</p>
</details>
<details>
<summary>Are link exchange platforms safe?</summary>
<p>Platforms that automate matching and track credits create patterns at scale, and automated link creation is on Google's list of link spam. Avoid them.</p>
</details>
<details>
<summary>How should I respond to a link exchange email?</summary>
<p>Decline politely and offer to consider useful pages on their merits. Do not agree to trades, credits or guaranteed placements.</p>
</details>
<details>
<summary>Do nofollow links make an exchange safe?</summary>
<p>Qualifying links with nofollow or sponsored is how Google says paid or commercial links should be marked. It does not turn a manufactured exchange into a natural one, so focus on whether the link helps readers.</p>
</details>
<details>
<summary>What should I do instead of exchanging links?</summary>
<p>Pitch resource pages, replace broken links, publish original data or tools, and run a planned campaign with clear KPIs.</p>
</details>
</div>
`;
const title = 'Backlinks Exchange: What 8 Ranking Pages Say About Risk';
const excerpt = `Backlinks exchange explained after reading ${D.ok} ranking pages: ${D.risk} admit the risk, only ${D.nofollow} mention nofollow. What Google's link spam rules say and safer options.`;
const out = content.replace('@@SERPH@@', sz(path.join(pr, 'backlinks-exchange-serp.png'))[1]).replace('@@TYPESH@@', sz(path.join(pr, 'backlinks-exchange-types.png'))[1]);
const post = { slug: SLUG, title, category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-18', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
