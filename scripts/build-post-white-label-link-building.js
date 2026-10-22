// Builds the "white label link building" post + assets. node scripts/build-post-white-label-link-building.js [--write]
// Data: the 7 readable organic pages for "white label link building" (Google US, read 15 Oct 2026), fetched 15 Oct 2026. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'white-label-link-building';
const R = require('../../keyword-research/serp-white-label-link-building-2026-10-15.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { shown: R.length, ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], price: c(o => o.price), report: c(o => o.report), dr: c(o => o.dr), guarantee: c(o => o.guarantee), turnaround: c(o => o.turnaround), contract: c(o => o.contract), sample: c(o => o.sample), cases: c(o => o.cases), policy: c(o => o.googlePolicy), faq: c(o => o.faq), dofollow: c(o => o.dofollow) };
const exp = { shown: 8, ok: 7, median: 2674, price: 2, report: 6, dr: 5, guarantee: 3, turnaround: 5, contract: 4, sample: 3, cases: 3, policy: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['WHITE LABEL', 'LINK BUILDING'], [['Define What', 'You Resell'], 'Vet the Provider', ['Agree Pricing', 'and Reporting'], 'Run Your Own QA', 'Protect the Client']);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'white label link building', card: `Pages read: ${D.ok} of ${D.shown}`,
  lines: [`Median page length: ${f(D.median)} words`, `Show a dollar figure: ${D.price} of ${D.ok}`, `Mention reports: ${D.report} of ${D.ok}`, `Offer a sample report: ${D.sample} of ${D.ok}`, `Mention Google policy: ${D.policy} of ${D.ok}`],
  last: 'Ask for what pages hide', big: `${D.price} of ${D.ok}`, k1: 'ranking pages show', k2: 'any dollar figure', title: 'White Label Link Building', sub: `What ${D.ok} ranking pages say, and do not` });
fs.writeFileSync(path.join(__dirname, 'infographic-white-label-link-building.html'), L.infographicHtml({
  title: `White Label Link Building: ${D.ok} Pages Read`, sub: 'Organic results for "white label link building", Google US, 15 October 2026',
  leftTitle: 'What the ranking pages mention', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
  bars: [{ label: 'Reports', sub: 'say clients get reports', n: D.report }, { label: 'DR or DA metrics', sub: 'quality shown as a score', n: D.dr }, { label: 'Turnaround times', sub: 'delivery speed', n: D.turnaround }, { label: 'Sample report', sub: 'shows an example', n: D.sample }, { label: 'A dollar figure', sub: 'any price on the page', n: D.price }],
  rightTitle: 'Ask any provider for', rightTag: 'What most pages leave out', items: [
    { t: 'A real sample report', s: 'in your own branding' }, { t: 'The site list and metrics', s: 'before placements go live' },
    { t: 'Pricing and minimums', s: 'in writing, with cancellation' }, { t: 'How sponsored links are marked', s: 'per Google guidance' }],
  big: `${D.price} of ${D.ok}`, noteHtml: `pages show <em>any price</em>, and only ${D.sample} offer a sample report. Ask for both before you resell.` }));
fs.writeFileSync(path.join(__dirname, 'table-white-label-link-building-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for white label link building say`, sub: `Organic results read on 15 October 2026 (${D.shown} listed, ${D.ok} returned a readable page). Sites are not named. Counts are pages mentioning the term anywhere in the visible text.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Reports for clients', `${D.report} of ${D.ok}`], ['Domain rating or authority scores', `${D.dr} of ${D.ok}`], ['Turnaround or delivery times', `${D.turnaround} of ${D.ok}`], ['Contract, minimum or cancellation terms', `${D.contract} of ${D.ok}`], ['Case studies', `${D.cases} of ${D.ok}`], ['A guarantee', `${D.guarantee} of ${D.ok}`], ['A sample or example report', `${D.sample} of ${D.ok}`], ['Google policy or guidelines', `${D.policy} of ${D.ok}`], ['A dollar figure', `${D.price} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'quote-white-label-link-building.html'), quote({ source: 'Google Search Central · Spam policies and qualifying outbound links', title: 'The rules that sit under every resold link',
  paras: ['Buying or selling links for ranking purposes is link spam. This includes exchanging money for links, or posts that contain links.',
    'Mark links that are advertisements or paid placements with the <code>sponsored</code> value. The <code>nofollow</code> attribute is still an acceptable way to flag them, though <code>sponsored</code> is preferred.'] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>White label link building</strong> is link building done by a specialist partner and sold to the end client under your agency's name. Before writing this guide we read the ${D.ok} readable pages that rank for the term on Google US. They run a median of ${f(D.median)} words, yet only ${D.price} show any dollar figure and only ${D.sample} offer a sample report. That gap is the reason this guide exists: the details an agency most needs before reselling are the details the pages leave out.</p>

<p>Below you will find what you actually resell, what to ask any white label link building agency, how pricing works, which risks sit under the label, and how to protect the client relationship. It builds on our overview of <a href="/blog/white-label-seo">white label SEO</a>.</p>

<h2>What White Label Link Building Is</h2>
<p>In a white label arrangement, the provider produces the work and you present it as yours. In link building that usually means the partner researches targets, runs outreach, secures placements and reports on them, while you keep the client, the invoice and the branding. People also call it white label backlinks, white label SEO link building or whitelabel link building, and some use private label link building for the same idea.</p>
<p>It is different from a plain list of links bought in bulk. A real white label link building solution includes strategy, vetting, outreach and reporting, and it protects your brand because the partner is invisible to your client.</p>

<h2>What the Ranking Pages Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/white-label-link-building-serp.png" alt="Table of what 7 pages ranking for white label link building mention: reports 6, DR or DA scores 5, turnaround 5, contract terms 4, case studies 3, guarantee 3, sample report 3, Google policy 4 and a dollar figure 2" width="1280" height="610" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Reports are standard.</strong> ${D.report} of ${D.ok} pages mention client reports, so you can expect them.</li>
<li><strong>Quality is sold as a score.</strong> ${D.dr} of ${D.ok} mention DR or DA. A score is a starting point, not proof of relevance or real traffic.</li>
<li><strong>Price is rarely shown.</strong> Only ${D.price} of ${D.ok} show a dollar figure, so you will have to ask.</li>
<li><strong>Proof is thin.</strong> ${D.sample} offer a sample report and ${D.cases} mention case studies.</li>
<li><strong>Google's rules are underplayed.</strong> ${D.policy} of ${D.ok} mention Google policy or guidelines. Those rules decide whether a resold link is safe.</li>
</ul>

<h2>What You Resell: Deliverables Worth Defining</h2>
<p>Write the deliverable down before you quote a client. A white label link building campaign usually contains these parts.</p>
<ol>
<li><strong>A backlink gap or opportunity analysis</strong> that shows the client where competitors are linked and they are not.</li>
<li><strong>A target list with metrics</strong> shared before placements go live, so you can check relevance and traffic.</li>
<li><strong>Outreach and content,</strong> such as guest articles, link insertions or editorial mentions.</li>
<li><strong>A monthly report</strong> with live URLs, anchors, link attributes and dates, in your branding.</li>
<li><strong>A replacement or removal policy</strong> for links that disappear or fail your checks.</li>
</ol>

<h2>How to Choose a White Label Link Building Agency</h2>
<p>Use the gaps in the table above as your checklist.</p>
<ul>
<li><strong>Ask for a sample report</strong> with your logo and a real placement, not a template screenshot.</li>
<li><strong>Ask how targets are chosen.</strong> Look for manual review of relevance, real traffic and outbound-link history, not only a metric threshold.</li>
<li><strong>Ask to see the list first.</strong> You should be able to approve or reject sites before a link goes live.</li>
<li><strong>Ask how sponsored placements are handled.</strong> They should be marked, per Google's guidance.</li>
<li><strong>Ask about minimums and cancellation.</strong> Know what happens if a client leaves.</li>
<li><strong>Ask who talks to your client.</strong> The answer should be nobody but you.</li>
</ul>

<h2>The Google Rules Under Every Resold Link</h2>
<p>You are responsible for the links you sell. Google's spam policies treat buying or selling links for ranking purposes as link spam, and its guidance asks for paid placements to be qualified.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/white-label-link-building-google-quote.png" alt="Google Search Central excerpt: buying or selling links for ranking purposes is link spam, and paid or advertisement links should use the sponsored value, with nofollow also acceptable" width="880" height="226" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>That does not make white label link building risky in itself. Earned editorial links are consistent with those rules. The risk is a provider that sells links as a product, builds them on networks, or hides that placements were paid for. Put the method in your contract and review samples before you promise results.</p>

<h2>Pricing Models and Margin</h2>
<p>Providers usually price in one of three ways: per link or placement, a monthly package with a set number of placements, or a custom retainer that includes strategy and reporting. Per-link pricing is simple to resell but encourages volume. Packages are easier to forecast. A retainer fits long campaigns but requires trust.</p>
<p>Your margin is a simple calculation: the client's monthly fee minus the provider's cost minus your account-management time. Do the arithmetic before you quote, and keep a buffer for replacements and reporting time. If the margin only works at the lowest possible link quality, the offer will not survive its first review.</p>

<h2>White Label Reports That Clients Read</h2>
<p>A good white label SEO link report is short. It lists new links with URL, anchor text, attribute and date, shows the referring domain count over time and says what happens next month. It uses your logo and your language. Add a line explaining what a nofollow or sponsored link is, because clients often ask. Our <a href="/blog/check-backlinks-of-website">guide to checking backlinks</a> shows how to verify each entry yourself.</p>

<h2>Quality Control You Should Run Yourself</h2>
<ul>
<li>Open a sample of live links each month and check the attribute and anchor.</li>
<li>Check that the linking page is indexed and has readers.</li>
<li>Compare the placements with the approved target list.</li>
<li>Track the destination pages, since a link to a broken URL loses its value, as covered in our <a href="/blog/find-broken-backlinks">broken backlinks guide</a>.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-white-label-link-building.png" alt="Infographic of what 7 pages ranking for white label link building mention and what to ask any provider for" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>White Label Link Building Versus Doing It In-House</h2>
<p>In-house gives you control and context but needs outreach staff, tools and time. White label gives capacity and a repeatable process without hiring. Many agencies mix both: they keep strategy and client relationships in-house and hand the placement work to a partner. The decision is mostly about volume and about how much of the process you want to own.</p>

<h2>How Contomatix Handles It</h2>
<p>Our <a href="/services/white-label-seo">white label SEO service</a> and <a href="/services/link-building">link building service</a> follow the same principles described above: manual vetting of each site, a target list with metrics shared before placements go live, no PBNs, and reporting that carries your branding with no Contomatix mentions. We never contact your clients directly. If you want to start with one client or overflow work, <a href="/contact">get in touch</a>.</p>

<h2>Onboarding a Client Into a White Label Campaign</h2>
<ol>
<li><strong>Collect the basics.</strong> Priority pages, target terms, the client's competitors and any link history, including past penalties or disavow files.</li>
<li><strong>Run the gap analysis.</strong> Compare referring domains with the sites outranking the client, so the first placements target what is missing.</li>
<li><strong>Agree the targets.</strong> Share the shortlist with metrics and approve or reject sites before outreach starts.</li>
<li><strong>Set the reporting.</strong> Fix the date, the fields and the branding for the monthly report.</li>
<li><strong>Review the first placements.</strong> Open the live links and check anchors, attributes and relevance before you send the first report.</li>
</ol>

<h2>Anchor Text and Link Attributes in Resold Campaigns</h2>
<p>The two details that most often go wrong are anchors and attributes. Agree an anchor policy up front: mostly brand, URL and descriptive phrases, with an occasional keyword-based anchor placed where it reads naturally. Agree also how paid or sponsored placements are marked. Your report should state the attribute of every link, so a client who reads a competitor's pitch about "dofollow only" understands that a healthy profile contains followed, nofollow, sponsored and ugc links, and that Google treats the attributes as hints.</p>

<h2>What Happens When a Link Disappears</h2>
<p>Links are lost. A publisher edits an article, a site is redesigned or a page is removed. Decide the policy in writing: how long a link must stay live, how you will detect removal and whether the provider replaces it. A monthly spot check catches most losses, and a quarterly check of every placement catches the rest. When you replace a link, replace it with one of equal or better relevance, not simply the cheapest available.</p>

<h2>Contracts, Confidentiality and Ownership</h2>
<p>Put four things in the agreement: the deliverables and standards, the confidentiality of your client list, who owns the content written for placements and what happens at termination. The partner should not use your client's name in case studies without permission, and should not contact the client or the publishers on the client's behalf in a way that exposes your agency. Clear terms protect both sides and make a later change of partner much easier.</p>

<h2>Who White Label Link Building Suits</h2>
<p>It suits agencies that sell SEO, web design or content and want to add link building without building a team; consultants who need capacity for a few clients; and in-house teams that need extra hands on a campaign. It suits less well an agency that wants to buy a handful of links with no strategy, or one that cannot spend time reviewing samples. The model works best when the agency treats the partner as part of the team and reviews its work.</p>

<h2>Reporting Cadence and Communication</h2>
<p>Set a rhythm: one monthly report, one short call or message thread for questions and a quarterly review of strategy. Keep the channel between you and the partner direct and documented. When a client asks something you cannot answer, you should be able to get a clear answer from the partner within a working day. That responsiveness is something to test during the trial, before you move more clients across.</p>

<h2>Red Flags When Comparing Providers</h2>
<ul>
<li>Promises of a guaranteed domain rating or a fixed ranking outcome.</li>
<li>A price so low that no manual work could be happening.</li>
<li>No way to see the sites before they go live.</li>
<li>Reports that show only a total, with no URLs, anchors or attributes.</li>
<li>Reluctance to explain the method, or answers that reduce it to "high DA".</li>
</ul>

<h2>What to Tell Your Clients</h2>
<p>Clients usually ask three things: how many links, how fast and what will it do for rankings. Answer honestly. Link building is gradual, because Google has to find and process each link, and results depend on competition and on the quality of the pages being linked. Explain that you review every placement, that links come in different attributes and that the aim is a relevant, natural profile rather than a high count. That honesty is also what keeps a client for years.</p>

<h2>Common Mistakes</h2>
<ul>
<li><strong>Reselling without seeing a sample.</strong> Never promise a client what you have not reviewed.</li>
<li><strong>Buying on metric alone.</strong> A score does not show relevance or traffic.</li>
<li><strong>Skipping the attribute.</strong> Sponsored placements need to be marked.</li>
<li><strong>No exit terms.</strong> Know the cancellation rules before the first client.</li>
<li><strong>Letting the partner talk to the client.</strong> It breaks the white label model.</li>
</ul>

<h2>Limits of This Research</h2>
<ul>
<li>We read the ${D.shown} organic results for one query on one day; ${D.ok} returned a readable page.</li>
<li>Counts show whether a page mentions a term, not how well it explains it.</li>
<li>A page without a price may still give one on request.</li>
<li>Results in other countries or at other times will differ, so rerun the check on your own market before you rely on it.</li><li>The page counts are a reading aid for what to ask providers, not a ranking of the providers themselves.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Define the deliverable and the report before you quote a client.</li>
<li>Ask for what ranking pages leave out: a sample report, the site list, pricing and Google policy handling.</li>
<li>Check a sample of live links yourself every month.</li>
<li>Mark paid placements as sponsored or nofollow.</li>
<li>Work out your margin before you sign.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is white label link building?</summary>
<p>It is link building done by a partner and delivered under your agency's brand. You keep the client relationship and the margin, and the partner does the research, outreach and reporting.</p>
</details>
<details>
<summary>How is white label link building different from buying backlinks?</summary>
<p>Buying backlinks means paying for a placement where the link is the product. White label link building is a service: strategy, vetting, outreach and reporting, delivered in your name.</p>
</details>
<details>
<summary>What should a white label link building agency provide?</summary>
<p>An opportunity analysis, a target list with metrics, outreach and content, a branded monthly report and a policy for lost or failed links.</p>
</details>
<details>
<summary>Is white label link building safe for my clients?</summary>
<p>It can be, if links are earned editorially on relevant sites and paid placements are marked. Link networks and undisclosed paid links carry risk, whoever sells them.</p>
</details>
<details>
<summary>How much does white label link building cost?</summary>
<p>It varies by provider and model: per link, per package or a retainer. Few providers publish prices, so ask for written terms including minimums and cancellation.</p>
</details>
<details>
<summary>What are white label backlinks?</summary>
<p>They are backlinks placed by a partner and reported to the end client as your agency's work. The partner remains invisible to your client.</p>
</details>
<details>
<summary>What is the difference between white label and private label link building?</summary>
<p>The terms are used interchangeably. Both describe service delivered by a third party under another company's brand.</p>
</details>
<details>
<summary>Can I try white label link building on one client first?</summary>
<p>Yes. A single client or a piece of overflow work lets you review the sample reports, the target lists and the quality before you scale.</p>
</details>
<details>
<summary>How do I check the links a white label provider builds?</summary>
<p>Open a sample of live links each month, check the link attribute, anchor text and whether the page is indexed, and compare them with the approved target list.</p>
</details>
</div>
`;
const title = 'White Label Link Building: What 7 Ranking Pages Leave Out';
const excerpt = `White label link building explained after reading ${D.ok} ranking pages: only ${D.price} show a price and ${D.sample} a sample report. What to ask before you resell.`;
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-15', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
