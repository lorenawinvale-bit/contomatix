// Builds the "b2b saas seo agency" post + assets. node scripts/build-post-b2b-saas-seo-agency.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'b2b-saas-seo-agency';
// One Google search, google.com gl=us hl=en, 11 Oct 2026, read via the user's Chrome. Classified by hand from title + snippet + URL; sites are not named.
const S = { organic: 9, agencyPages: 5, listicles: 3, forum: 1, sponsored: 1, outcome: 7, ai: 3 };
console.log(JSON.stringify(S));
if (S.agencyPages + S.listicles + S.forum !== S.organic) throw new Error('counts do not add up');

// ---------- assets
L.donut(SLUG, ['B2B SAAS', 'SEO AGENCY'], [['Know What It', 'Should Cover'], 'Check the SaaS Technical Basics', 'Vet the Link Building', ['Ask for Pipeline,', 'Not Traffic'], 'Spot the Red Flags']);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'b2b saas seo agency', card: 'First page, 11 Oct 2026',
  lines: ['Organic results read: 9', 'Agency service pages: 5', '"Best agencies" lists: 3', 'Forum threads: 1', 'Snippets naming demos or leads: 7'],
  last: 'Judge the work, not the list', big: '3 of 9', k1: 'results are ranked lists', k2: 'published by agencies', title: 'B2B SaaS SEO Agency', sub: 'What the first page shows and what to ask' });
fs.writeFileSync(path.join(__dirname, 'infographic-b2b-saas-seo-agency.html'), L.infographicHtml({
  title: 'B2B SaaS SEO Agency: What the First Page Shows', sub: 'Nine organic Google results, classified by hand, 11 October 2026',
  leftTitle: 'What the nine results are', leftTag: 'Number of organic results by type', max: 9,
  bars: [{ label: 'Agency service pages', sub: 'an agency selling its own service', n: S.agencyPages }, { label: 'Ranked "best agencies" lists', sub: 'published on agency or marketing sites', n: S.listicles }, { label: 'Forum threads', sub: 'a buyer asking for advice', n: S.forum }, { label: 'Snippets naming demos, leads or revenue', sub: 'outcome beyond traffic', n: S.outcome }, { label: 'Snippets mentioning AI search', sub: 'AEO or AI visibility', n: S.ai }],
  rightTitle: 'Ask every agency', rightTag: 'SaaS-specific questions', items: [
    { t: 'Which pages will you build?', s: 'integrations, use cases, comparisons' }, { t: 'How is JavaScript handled?', s: 'rendering, crawlable links, status codes' },
    { t: 'Where will links come from?', s: 'earned, or paid and marked sponsored' }, { t: 'What counts as success?', s: 'demos and trials, not only traffic' }],
  big: '3 of 9', noteHtml: `first-page results are ranked lists written by agencies. Treat a <em>"best agencies" list</em> as marketing, and check the work yourself.` }));
fs.writeFileSync(path.join(__dirname, 'table-b2b-saas-seo-agency.html'), L.tableHtml({ title: 'First page for "b2b saas seo agency", read on 11 October 2026', sub: 'Google, US English. Nine organic results plus one sponsored result and one forum thread inside the nine. Sites are not named.',
  head: ['What we counted', 'Results'], lastBold: false,
  rows: [['Organic results read', S.organic], ['Agency service pages', S.agencyPages], ['Ranked "best agencies" lists', S.listicles], ['Forum threads', S.forum], ['Snippets naming demos, leads, revenue, pipeline, signups or trials', `${S.outcome} of ${S.organic}`], ['Snippets mentioning AI search, AEO or AI visibility', `${S.ai} of ${S.organic}`], ['Sponsored results above the organic list', S.sponsored]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>When we read the first page of Google for <strong>B2B SaaS SEO agency</strong> on 11 October 2026, only five of the nine organic results were agencies describing their own service. Three were ranked "best agencies" lists, and one was a forum thread where a founder was asking for advice. If you are shopping for one, that mix tells you something: much of what you will read is written by the people selling the service. This guide gives you the other half, the checks you can run yourself.</p>

<p>It covers what SaaS SEO involves that ordinary SEO does not, what the search results look like, the technical points Google documents for JavaScript-heavy sites, how to judge SaaS link building, and the questions to put to any agency. For generic hiring advice, such as contracts and package scope, see our <a href="/blog/seo-packages-for-small-business">guide to SEO packages</a>.</p>

<h2>What Is Different About SaaS SEO</h2>
<p>A software product is sold differently from a local service, and the search work follows. Four things change.</p>
<ul>
<li><strong>The buyer is a team, and the cycle is long.</strong> The person who finds you is often not the person who signs. Content has to serve a researcher, a user and a budget holder at different moments.</li>
<li><strong>The money pages are product pages.</strong> Integrations, use cases, comparisons and alternatives pages often carry more buying intent than a general blog post.</li>
<li><strong>The site is usually a web app.</strong> Marketing pages, documentation and the product itself may live on different technology, which creates crawling and rendering questions that an ordinary brochure site never faces.</li>
<li><strong>Success is measured in trials and demos.</strong> Traffic that never reaches a signup is not the goal, so reporting has to follow the funnel.</li>
</ul>

<h2>What the First Page Looks Like</h2>
<p>We read the nine organic results and classified each by hand from its title, snippet and address. We name no sites, because a snippet is a sales claim and we have not tested anyone's service.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/b2b-saas-seo-agency-serp-counts.png" alt="Table counting the nine organic Google results for b2b saas seo agency: five agency service pages, three ranked best agencies lists, one forum thread, seven snippets naming demos or leads, and three mentioning AI search" width="1280" height="510" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Outcomes are the headline.</strong> ${S.outcome} of the ${S.organic} snippets talk about demos, leads, revenue, pipeline, signups or trials. That is the right language, and it is also easy to write, so ask for proof.</li>
<li><strong>AI search is entering the pitch.</strong> ${S.ai} of the ${S.organic} snippets mention AI search, AEO or AI visibility, and the one sponsored result was built around it. Google's own documentation on AI features says there are no additional requirements to appear in AI Overviews or AI Mode, so treat any promise of a special formula with care.</li>
<li><strong>Ranked lists are advertising.</strong> The three lists were published on agency or marketing sites. Read them as one company's opinion and not as an independent ranking.</li>
</ul>

<h2>The Technical Basics a SaaS Agency Must Get Right</h2>
<p>Google documents several points that matter more on a JavaScript-driven SaaS site than on a plain one. Ask the agency to explain each in your context.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-javascript-seo-basics.jpg" alt="Google Search Central page Understand the JavaScript SEO basics, with the introduction explaining that Google Search runs JavaScript with an evergreen version of Chromium" width="752" height="600" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Rendering.</strong> Google processes JavaScript apps in three phases: crawling, rendering and indexing. Pages that return a 200 status are queued for rendering, and the rendered HTML is what gets indexed. Google also says server-side or pre-rendering is still a great idea, because it speeds up the site for users and crawlers, and not all bots run JavaScript.</li>
<li><strong>Links.</strong> Google can discover links only when they are anchor elements with an href attribute. Navigation built from click handlers can hide pages from crawlers.</li>
<li><strong>Status codes.</strong> With client-side routing, meaningful HTTP status codes can be hard to return. Google suggests redirecting to a URL that gives a 404 or adding a noindex tag to error pages, so that soft 404s do not pile up.</li>
<li><strong>Titles and descriptions.</strong> JavaScript can set the title and meta description, but each page still needs unique ones.</li>
</ul>
<p>Read Google's <a href="https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics" target="_blank" rel="nofollow noopener">JavaScript SEO basics</a> before the first call, so you can tell whether the answers you get are specific or generic.</p>

<h2>What the Work Should Include</h2>
<ol>
<li><strong>Keyword and page mapping.</strong> A list of the searches that precede a trial or demo, matched to the pages that should answer them. You can try the idea yourself with our <a href="/tools/keyword-mapping-tool">keyword mapping tool</a>.</li>
<li><strong>Product-led pages.</strong> Integrations, use cases, templates and comparison pages, each written for a real search and not for a keyword.</li>
<li><strong>Content with a point of view.</strong> Original data, product usage insight or expert input. Generic explainers are what everyone else is already publishing.</li>
<li><strong>Technical care.</strong> Crawlable links, rendering that works, a clean sitemap and sensible handling of docs, app and marketing areas.</li>
<li><strong>Authority work.</strong> Links and mentions earned honestly, covered in the next section.</li>
<li><strong>Reporting tied to the funnel.</strong> Organic sessions, signups, demos and, where possible, pipeline, shown by page group.</li>
</ol>
<figure style="margin:20px 0;"><img src="/images/blog/proof/keyword-mapping-tool-saas-keywords.png" alt="Contomatix keyword mapping tool with SaaS keywords such as b2b saas seo agency and saas link building and four existing pages entered, showing which keywords map to a page and which need a new page" width="1160" height="717" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>The screenshot shows the first step in practice. Seven keywords, from "b2b saas seo agency" down to "saas seo consultant", are matched against four of our own pages. Two have no page and need a new one, and several only partly match and need a decision. That kind of gap list is what a good agency should hand you in the first month.</p>

<h2>Which Pages Tend to Matter Most</h2>
<p>Most SaaS sites have more potential pages than they realise, because the product itself generates search demand. Here are the types worth a map entry before you commission anything.</p>
<ul>
<li><strong>Integration pages.</strong> One page per integration, written around what the connection lets a user do, not a logo grid.</li>
<li><strong>Use case and role pages.</strong> The same product described for the job a specific team is trying to get done.</li>
<li><strong>Comparison and alternative pages.</strong> Searches that include another product's name show a buyer who is already deciding. These pages need to be fair and factual, and they should never mislead about a competitor.</li>
<li><strong>Template and tool pages.</strong> Free resources that earn links and answer a task directly.</li>
<li><strong>Documentation and help content.</strong> Often the largest body of text on a SaaS site, and frequently on another subdomain or platform, so check that it is crawlable and linked from the marketing pages.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-b2b-saas-seo-agency.png" alt="Infographic of the nine organic Google results for b2b saas seo agency by type, five agency pages, three ranked lists and one forum thread, with four questions to ask every SaaS SEO agency" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>A Sensible First 90 Days</h2>
<p>You can judge a proposal by whether it looks something like this. The exact tasks will differ, but the order should not.</p>
<ol>
<li><strong>Days 1 to 30: foundation.</strong> Access to Search Console and analytics, a technical review with rendering and crawlable links checked, a keyword and page map with the gaps listed, and a baseline for signups from organic.</li>
<li><strong>Days 31 to 60: build.</strong> The first product-led pages shipped, fixes from the review prioritised and started, and the content plan agreed with someone who knows the product.</li>
<li><strong>Days 61 to 90: measure and adjust.</strong> Early indicators reviewed, such as indexed pages, queries gained and sessions to the new pages, and the plan updated. Rankings and pipeline take longer, so say so.</li>
</ol>
<p>Be sceptical of any plan whose first month is only a report, or whose last month promises a result with a date attached.</p>

<h2>Agency, Consultant, Freelancer or In-House?</h2>
<p>There is no single right answer, only trade-offs. An in-house hire knows the product best but is one person with one set of skills. A consultant gives you strategy and review and expects your team to execute. A freelancer can deliver specific content or technical work cheaply if you can brief them. An agency can cover several disciplines at once, at the cost of less product immersion. Many SaaS teams end up with a blend: someone in-house who owns the product knowledge, and an outside partner for the parts that need extra hands.</p>

<h2>SaaS Link Building, Agencies and Pricing</h2>
<p>Searches such as "saas link building", "link building for saas" and "saas link building agency" show how much of this market is about links. They are also where the risk sits. Google's spam policies describe link spam as links created mainly to manipulate rankings, and the examples include buying or selling links for ranking, automated link creation and paid guest posts that pass ranking credit. Paid placements are acceptable when the links are marked sponsored or nofollow.</p>
<p>So when you look at a SaaS link building agency or a monthly link building service, put these questions to them:</p>
<ul>
<li>Where will the links appear, and can I see examples from other SaaS clients?</li>
<li>Which are earned through data, tools or outreach, and which are paid?</li>
<li>Will paid placements carry the sponsored attribute?</li>
<li>What is the plan if a placement is removed or a site is penalised?</li>
</ul>
<p>Our guide to <a href="/blog/outsource-link-building">outsourcing link building</a> goes deeper on contracts and safeguards.</p>

<h2>Measuring a SaaS SEO Engagement</h2>
<p>Agree the scoreboard before work starts. Traffic and rankings are inputs. The outputs are trial signups, demo requests and, where your analytics allow, pipeline from organic. Be wary of a report that stops at impressions. Ask how the agency will separate branded searches, which often come from people who already know you, from non-branded ones, which are the new demand. Ask what happens to reporting when a visitor researches on one device and signs up on another.</p>

<h2>Red Flags</h2>
<ul>
<li><strong>A guaranteed ranking or traffic number.</strong> Google says no one can guarantee a number one ranking.</li>
<li><strong>No SaaS examples they can discuss.</strong> Case studies without numbers, dates or a named scope tell you little.</li>
<li><strong>A fixed number of links a month.</strong> It suggests volume over fit.</li>
<li><strong>No view on JavaScript or rendering.</strong> For a SaaS site that is a gap in the basics.</li>
<li><strong>A deck that is all traffic.</strong> If trials and demos never appear, the work may not be aimed at them.</li>
</ul>

<h2>Limits of This Snapshot</h2>
<ul>
<li>It is one query, on one day, from one location, so the mix of results will change.</li>
<li>We classified results from titles and snippets, not from the full pages, and we did not test any service.</li>
<li>Snippet claims are the sellers' own and were not verified.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Three of nine first-page results for this query were ranked lists written by agencies, and five were agency pages.</li>
<li>SaaS SEO centres on product-led pages, JavaScript-aware technical work and funnel reporting.</li>
<li>Google documents rendering, link discovery and status code points that apply to JavaScript apps.</li>
<li>Paid links should be marked sponsored or nofollow, and earned links should be explainable.</li>
<li>Ask for pages, proof and a funnel scoreboard before you sign.</li>
</ul>
<p>If you are comparing SaaS SEO options and want a second opinion on a proposal or a shortlist, Contomatix can review it with you. <a href="/contact">Get in touch</a> and we will take a look.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What does a B2B SaaS SEO agency do?</summary>
<p>It plans and runs organic search work for software companies: mapping searches to pages, building product-led and educational content, handling technical SEO on JavaScript-heavy sites, earning links and reporting on trials and demos.</p>
</details>
<details>
<summary>How is SaaS SEO different from regular SEO?</summary>
<p>The buying cycle is longer, several people take part in the decision, the money pages are often integrations and comparison pages, and the site is frequently a web app that raises rendering and crawling questions.</p>
</details>
<details>
<summary>How do I choose a SaaS SEO agency?</summary>
<p>Ask which pages they will build, how they handle JavaScript, where links will come from and how success is measured. Check the answers against Google's own documentation, and ask for examples you can verify.</p>
</details>
<details>
<summary>Is SaaS link building safe?</summary>
<p>It can be, if links are earned or clearly marked. Google's spam policies treat buying or selling links that pass ranking credit as link spam unless they are marked sponsored or nofollow.</p>
</details>
<details>
<summary>Do I need a SaaS SEO consultant or an agency?</summary>
<p>A consultant suits strategy and guidance when your team will do the work. An agency suits ongoing delivery across content, technical and links. Judge either on relevant examples and clear scope.</p>
</details>
<details>
<summary>Can an SEO agency guarantee rankings for a SaaS product?</summary>
<p>No. Google states that no one can guarantee a number one ranking, and advises finding someone else if a provider guarantees first place.</p>
</details>
<details>
<summary>Does Google need special optimisation to show my SaaS in AI Overviews?</summary>
<p>Google's documentation says there are no additional requirements to appear in AI Overviews or AI Mode, and no special markup is needed. The page must be indexed and eligible to show a snippet.</p>
</details>
<details>
<summary>Why does JavaScript matter for SaaS SEO?</summary>
<p>Google processes JavaScript apps in crawling, rendering and indexing phases, so links, titles and content that only appear after scripts run need to render properly. Server-side or pre-rendering is still recommended.</p>
</details>
<details>
<summary>What should I ask for in the first month?</summary>
<p>A keyword and page map with gaps, a technical review focused on rendering and crawlable links, a plan for product-led pages, and a reporting setup that tracks signups and demos.</p>
</details>
</div>
`;
const title = 'B2B SaaS SEO Agency: A Verified 2026 Guide to Choosing One';
const excerpt = 'B2B SaaS SEO agency guide built on a real first-page check: what SaaS SEO involves, JavaScript basics, link building risks and questions to ask.';
const post = { slug: SLUG, title, category: 'B2B SEO', author: 'Muhammad Reyan Nizami', date: '2026-10-11', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
