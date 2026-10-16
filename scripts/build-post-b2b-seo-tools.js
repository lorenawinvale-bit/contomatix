// Builds the "b2b seo tools" post + assets. node scripts/build-post-b2b-seo-tools.js [--write]
// Data: 8 organic pages for "b2b seo tools" (Google US, 16 Oct 2026; 7 readable) + Screaming Frog pricing page and Google PSI docs read 16 Oct 2026. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'b2b-seo-tools';
const R = require('../../keyword-research/serp-b2b-seo-tools-2026-10-16.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length; const t = n => ok.filter(o => o.tools.includes(n)).length;
const D = { shown: R.length, ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], ai: c(o => o.ai), free: c(o => o.freeTier), price: c(o => o.price), limits: c(o => o.limits), report: c(o => o.report), saas: c(o => o.saas), ahrefs: t('Ahrefs'), semrush: t('Semrush'), gsc: t('Google Search Console'), ga: t('Google Analytics'), surfer: t('Surfer'), sf: t('Screaming Frog'), looker: t('Looker Studio'), monthly: c(o => (o.priceExamples || []).some(p => /mo/.test(p))) };
const exp = { shown: 8, ok: 7, median: 3028, ai: 7, free: 5, price: 5, limits: 6, report: 5, saas: 5, ahrefs: 7, semrush: 6, gsc: 6, ga: 4, surfer: 3, sf: 2, looker: 2, monthly: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['B2B SEO', 'TOOLS'], [['Start With', 'Free Data'], 'Add a Crawler', ['Pick One', 'Research Suite'], 'Report Monthly', ['Test the', 'AI Claims']]);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'b2b seo tools', card: `Pages read: ${D.ok} of ${D.shown}`,
  lines: [`Median page length: ${f(D.median)} words`, `Recommend Ahrefs: ${D.ahrefs} of ${D.ok}`, `Recommend Semrush: ${D.semrush} of ${D.ok}`, `Name Search Console: ${D.gsc} of ${D.ok}`, `Mention AI features: ${D.ai} of ${D.ok}`],
  last: 'Build the stack by job', big: `${D.ahrefs} of ${D.ok}`, k1: 'ranking pages name', k2: 'the same research suite', title: 'B2B SEO Tools', sub: `What ${D.ok} ranking pages recommend` });
fs.writeFileSync(path.join(__dirname, 'infographic-b2b-seo-tools.html'), L.infographicHtml({
  title: `B2B SEO Tools: ${D.ok} Pages Read`, sub: 'Organic results for "b2b seo tools", Google US, 16 October 2026',
  leftTitle: 'Tools the ranking pages name', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
  bars: [{ label: 'Ahrefs', sub: 'research and backlinks', n: D.ahrefs }, { label: 'Semrush', sub: 'research and tracking', n: D.semrush }, { label: 'Search Console', sub: 'free, from Google', n: D.gsc }, { label: 'Google Analytics', sub: 'free, from Google', n: D.ga }, { label: 'Screaming Frog', sub: 'crawler, free to 500 URLs', n: D.sf }],
  rightTitle: 'Build your stack in this order', rightTag: 'Pay only when a free tool runs out', items: [
    { t: '1. Search Console and GA4', s: 'free first-party data' }, { t: '2. A crawler', s: 'free up to 500 URLs' },
    { t: '3. One research suite', s: 'keywords and backlinks' }, { t: '4. A monthly report', s: 'one page, same fields' }],
  big: `${D.ai} of ${D.ok}`, noteHtml: `pages promote <em>AI features</em>. Test each claim on your own site before you pay for it.` }));
fs.writeFileSync(path.join(__dirname, 'table-b2b-seo-tools-mentions.html'), L.tableHtml({ title: `Tools named by ${D.ok} pages ranking for b2b seo tools`, sub: `Organic results read on 16 October 2026 (${D.shown} listed, ${D.ok} returned a readable page). Sites are not named. A tool counts once per page.`,
  head: ['Tool', 'Pages naming it'], lastBold: false,
  rows: [['Ahrefs', `${D.ahrefs} of ${D.ok}`], ['Semrush', `${D.semrush} of ${D.ok}`], ['Google Search Console', `${D.gsc} of ${D.ok}`], ['Google Analytics', `${D.ga} of ${D.ok}`], ['Surfer', `${D.surfer} of ${D.ok}`], ['Screaming Frog', `${D.sf} of ${D.ok}`], ['Looker Studio', `${D.looker} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-b2b-seo-tools-stack.html'), L.tableHtml({ title: 'A B2B SEO tool stack by job', sub: 'Free options first. Limits are as documented by each provider on 16 October 2026.',
  head: ['Job', 'Free option', 'Pay when'], lastBold: false,
  rows: [['Search performance', 'Google Search Console', 'You need history or rank tracking beyond it'], ['Traffic and conversions', 'Google Analytics 4', 'You need CRM-level attribution'], ['Page speed', 'PageSpeed Insights', 'You need continuous monitoring'], ['Crawling and audits', 'Screaming Frog, up to 500 URLs', 'Your site is over 500 URLs'], ['Keywords and backlinks', 'Search Console queries', 'You need competitor data'], ['Reporting', 'Looker Studio or our report tool', 'You need many client dashboards']] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>B2B SEO tools</strong> are the software a business-to-business company uses to find keywords, check its site, track search performance and analyse backlinks. Before writing this guide we read the ${D.ok} readable pages that rank on Google US for the term. They run a median of ${f(D.median)} words, ${D.ahrefs} of ${D.ok} name the same research suite, and all ${D.ai} promote AI features. This guide turns that into a stack you can build by job, starting with what costs nothing.</p>

<p>Below you will find what the ranking pages recommend, why B2B and SaaS teams need a different stack from a local shop, a table of free options with their documented limits, how to decide when to pay, and how to judge AI claims. If you are comparing paid suites in depth, our <a href="/blog/best-seo-tools-2026">best SEO tools comparison</a> goes further.</p>

<h2>What the Ranking Pages Recommend</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/b2b-seo-tools-mentions.png" alt="Table of tools named by 7 pages ranking for b2b seo tools: Ahrefs 7, Semrush 6, Google Search Console 6, Google Analytics 4, Surfer 3, Screaming Frog 2, Looker Studio 2" width="1280" height="@@MH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The large research suites dominate.</strong> ${D.ahrefs} of ${D.ok} pages name Ahrefs and ${D.semrush} of ${D.ok} name Semrush. These cover keyword research, backlinks and competitor data in one login.</li>
<li><strong>Google's free tools are named less than you would expect.</strong> Search Console appears on ${D.gsc} of ${D.ok} pages and Google Analytics on ${D.ga}, even though they are the only source of your own search and visit data.</li>
<li><strong>Crawlers and reporting tools are an afterthought.</strong> Screaming Frog appears on ${D.sf} pages and Looker Studio on ${D.looker}, yet audits and monthly reporting are where most teams lose time.</li>
<li><strong>Prices are inconsistent.</strong> ${D.price} of ${D.ok} pages show a dollar figure; ${D.monthly} show monthly prices for the smaller tools they list, in a range from $21 to $129 a month. Plans and limits change, so check the vendor's own pricing page.</li>
<li><strong>Everyone promotes AI.</strong> All ${D.ai} pages mention AI features, and ${D.limits} of ${D.ok} also mention a usage limit or cap, which is where the real cost sits.</li>
</ul>

<h2>Why B2B and SaaS Teams Need a Different Stack</h2>
<p>A B2B or SaaS site has fewer pages, longer buying cycles and a smaller, more specific audience than a consumer site. That changes what the tools must do. You rarely need to track thousands of keywords. You need to track the dozens that map to a product, a use case or a comparison, and to connect search visits to demos and signups. You also need competitor data, because in software the competing pages are named, indexed and constantly updated. A <strong>SaaS SEO platform</strong> is therefore less about volume and more about three jobs: knowing which topics buyers search, seeing who already ranks, and proving that organic visits turn into pipeline.</p>
<p>People look for the same thing under many names: SaaS SEO tools, an SEO tool for SaaS, a top SEO tool for B2B, the best platform for SEO for B2B or SEO SaaS software. They all point at the same stack, covered below.</p>

<h2>The B2B SEO Tool Stack by Job</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/b2b-seo-tools-stack.png" alt="Table of a B2B SEO tool stack by job: Search Console for performance, Google Analytics 4 for conversions, PageSpeed Insights for speed, Screaming Frog free up to 500 URLs for crawling, Search Console queries for keywords, Looker Studio for reporting" width="1280" height="@@SH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Start with tools that cost nothing, because they hold your own first-party data. <strong>Google Search Console</strong> shows the queries and pages that already bring impressions and clicks. <strong>Google Analytics 4</strong> connects visits to key events such as demo requests. <strong>PageSpeed Insights</strong> reports real-user data where enough is available, and classes a page as good when its Largest Contentful Paint is 2.5 seconds or less, its Interaction to Next Paint is 200 milliseconds or less and its Cumulative Layout Shift is 0.1 or less, according to Google's documentation read on 16 October 2026. For crawling, the Screaming Frog SEO Spider is free for up to 500 URLs and its pricing page says a licence is needed to crawl more, which is enough for most early-stage SaaS sites.</p>
<p>Only then add a paid research suite. You need one, not three. Choose by the job you cannot do for free: competitor keywords, backlink data or rank tracking at the scale you need. Our guides to <a href="/blog/backlink-analysis-tools-2026">backlink analysis tools</a> and <a href="/blog/keyword-research-tools">keyword research tools</a> compare options for those two jobs.</p>

<h2>Free Tools From Contomatix for the Same Jobs</h2>
<p>Several jobs in the stack can be done in the browser without an account. These run on your own data and nothing leaves your browser:</p>
<ul>
<li><a href="/tools/technical-seo-audit-tool">SEO page audit</a> for the title, headings, canonical, robots meta and structured data of one page.</li>
<li><a href="/tools/schema-markup-validator">Schema markup validator</a> to check JSON-LD against the properties Google documents.</li>
<li><a href="/tools/seo-report-generator">SEO report generator</a> to turn Search Console numbers into a monthly report.</li>
<li><a href="/tools/keyword-mapping-tool">Keyword mapping tool</a> to assign each keyword to a page and spot cannibalisation.</li>
<li><a href="/tools/dofollow-link-checker">Dofollow link checker</a> to see whether a link passes credit.</li>
</ul>

<h2>When to Pay for a B2B SEO Tool</h2>
<p>Pay when a free tool stops answering a question you actually have. Use this list.</p>
<ol>
<li><strong>You need competitor data.</strong> Search Console only shows your own queries. A research suite shows what rivals rank for and who links to them.</li>
<li><strong>Your site outgrows the free crawler.</strong> Past 500 URLs you either license the crawler or use a cloud one.</li>
<li><strong>You manage several sites or clients.</strong> Dashboards and white-label reports start to save real time.</li>
<li><strong>You need history.</strong> Search Console data is limited in what it keeps, so a rank tracker helps you compare over long periods.</li>
<li><strong>You want content scoring.</strong> Only ${D.surfer} of ${D.ok} pages name a content optimisation tool, so test it on three pages before you commit.</li>
</ol>

<p>A practical way to decide is to run a two-week trial with a written question. For example: "Which five competitor pages rank for our top comparison query, and which sites link to them?" If the trial answers it and you would act on the answer, the tool earns a place in the budget. If you finish the trial with a long export and no decision, it does not. Cancel before the renewal date, and put that date in your calendar when you start.</p>

<h2>How to Judge AI Features in SEO Tools</h2>
<p>All ${D.ai} pages we read promote AI. Test the claim, not the label. Pick one task you already know the answer to, such as a keyword cluster you have mapped by hand or a technical issue you have already fixed, and see whether the AI feature reaches the same result and shows its reasoning. Ask what data the feature uses, whether it saves time on a real job and whether the output is something you would publish or send to a client. Features that only reword a brief are not a reason to pay. Our guide to <a href="/blog/ai-powered-seo-tools">AI-powered SEO tools</a> shows how to compare them.</p>

<h2>How B2B Keyword Research Differs</h2>
<p>Consumer keyword research chases volume. B2B keyword research chases fit. A term with 50 monthly searches that is typed by the person who signs the contract can be worth more than a term with 5,000 searches typed by students. So when you use a research suite, filter for intent first: problem phrases (how to reconcile invoices), solution phrases (invoice reconciliation software), comparison phrases (this tool vs that tool) and integration phrases (a tool plus the platform it connects to). Then check who ranks. If the first page is full of large publishers and review sites, plan content that adds something they lack, such as original data or a free tool, rather than another list.</p>
<p>Search Console is the best place to begin because it shows the long, specific queries you already appear for. Sort by impressions, find queries where you rank between positions 8 and 20, and map each to a page using our <a href="/tools/keyword-mapping-tool">keyword mapping tool</a>. Those are often faster wins than a new article for a head term.</p>

<h2>Technical Checks a B2B Site Needs From Its Tools</h2>
<p>A software site is usually built on a JavaScript framework, has a separate app subdomain and ships changes weekly. That creates a short list of checks worth automating. Confirm that important pages return a 200 status and are not blocked in robots.txt, using a tester such as our <a href="/tools/robots-txt-tester">robots.txt tester</a>. Check that each page has one canonical and that the canonical points to the version you want indexed. Validate the structured data you actually use, for example with the <a href="/tools/schema-markup-validator">schema markup validator</a>. Review rendered HTML, not only the source, because content injected by scripts may not appear in a basic crawl. And watch the sitemap: pricing, integration and comparison pages should be in it, while login and app URLs should not.</p>
<p>None of this needs an expensive suite. A free crawler under 500 URLs, Search Console's indexing reports and a few single-page checkers cover the checks above for a typical early-stage SaaS site.</p>

<h2>Comparison and Integration Pages: Where B2B Tools Earn Their Keep</h2>
<p>Two page types decide most B2B search results: comparison pages ("us versus them" and "alternatives") and integration pages ("our product with that platform"). Use your tools to answer three questions about each. Who ranks today, and what do they cover that you do not? Which queries bring impressions to your existing page, and does the title match them? And which sites link to the pages that rank, because that shows where links can come from. Write down the answers in the keyword map before you create or rewrite the page, so each page has a clear job.</p>

<h2>Common Mistakes When Choosing B2B SEO Tools</h2>
<ul>
<li><strong>Paying for three suites that overlap.</strong> Keep one research suite and use free tools for the rest.</li>
<li><strong>Tracking too many keywords.</strong> A short list tied to products and use cases is easier to act on than thousands of terms.</li>
<li><strong>Trusting a single score.</strong> Difficulty and authority metrics are estimates from each vendor and differ between tools.</li>
<li><strong>Ignoring first-party data.</strong> Search Console and GA4 show what your own audience does, so open them before any paid dashboard.</li>
<li><strong>Buying before you have a process.</strong> A tool does not decide which page to improve. Write the process, then choose software to support it.</li>
</ul>

<h2>Reporting: The Step Most Stacks Skip</h2>
<p>A stack without a report is a set of logins. Decide on one page per month: Search Console clicks, impressions and position for this period against the last, the top pages, work done and next priorities. It is the same format whether you are a founder or an agency. Use the <a href="/tools/seo-report-generator">free SEO report generator</a> to produce the first version and refine it. Add a business result next to traffic, such as demo requests, so the report speaks the language of the buyers who read it.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-b2b-seo-tools.png" alt="Infographic of the tools named by 7 pages ranking for b2b seo tools and the order in which to build a B2B SEO stack" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the ${D.shown} organic results for one query on one day (Google US, 16 October 2026); ${D.ok} returned a readable page and one blocked our request.</li>
<li>A tool counts once per page, whether the page recommends it or only mentions it. Counts are a reading aid, not a ranking of tools.</li>
<li>Prices are as shown on the pages that day and change often.</li>
<li>Free limits come from the vendors' own pages on 16 October 2026 and may change.</li>
<li>Results in other countries or at other times will differ, so rerun the check on your own market.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Build the stack by job and start with free first-party data: Search Console and GA4.</li>
<li>Add a crawler next, free up to 500 URLs, then one paid research suite for competitor data.</li>
<li>Test AI claims on a task you already know the answer to.</li>
<li>Publish one monthly report with the same fields every time.</li>
<li>Pay only when a free tool stops answering a question you have.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are the best B2B SEO tools?</summary>
<p>The pages we read most often name one large research suite plus Google Search Console and Google Analytics. A sensible stack adds a crawler and a reporting step, and pays only for what free tools cannot do.</p>
</details>
<details>
<summary>What is a SaaS SEO platform?</summary>
<p>It is a tool or suite used to research keywords, audit the site and track search performance for a software company. For most teams it is one paid research suite plus Google's free tools.</p>
</details>
<details>
<summary>Which SEO tool is best for SaaS?</summary>
<p>No single tool wins on every job. Choose the one that answers the question you cannot answer free, usually competitor keywords and backlinks, and test it on your own site first.</p>
</details>
<details>
<summary>Can I do B2B SEO with only free tools?</summary>
<p>Yes, for your own site. Search Console, GA4, PageSpeed Insights and a free crawler cover performance, conversions, speed and audits. You need a paid tool mainly for competitor data.</p>
</details>
<details>
<summary>How much do B2B SEO tools cost?</summary>
<p>The smaller tools on the pages we read show monthly prices from $21 to $129. The large suites cost more and change plans often, so check the vendor's pricing page.</p>
</details>
<details>
<summary>Is there a free SEO tool for crawling a website?</summary>
<p>The Screaming Frog SEO Spider is free for up to 500 URLs, according to its pricing page. Our free SEO page audit checks one page at a time in your browser.</p>
</details>
<details>
<summary>What is a good SEO tool for B2B reporting?</summary>
<p>Looker Studio works for live dashboards. For a monthly written summary, our free SEO report generator turns Search Console numbers into a report.</p>
</details>
<details>
<summary>Do I need an AI SEO tool?</summary>
<p>Only if it saves time on a real job. Test it on a task you already know the answer to before paying for it.</p>
</details>
<details>
<summary>How many SEO tools does a B2B company need?</summary>
<p>Usually one paid research suite plus the free Google tools and a crawler. More logins rarely create more insight.</p>
</details>
</div>
`;
const title = 'B2B SEO Tools: The Stack 7 Ranking Pages Recommend';
const excerpt = `B2B SEO tools after reading ${D.ok} ranking pages: ${D.ahrefs} of ${D.ok} name the same suite. Build a SaaS SEO stack by job, free tools first, with documented limits.`;
const pngSize = f => { const b = fs.readFileSync(f); return b.readUInt32BE(20); };
const proof = path.join(root, 'public', 'images', 'blog', 'proof'); const hOf = n => fs.existsSync(path.join(proof, n)) ? pngSize(path.join(proof, n)) : 600;
const out = content.replace('@@MH@@', hOf('b2b-seo-tools-mentions.png')).replace('@@SH@@', hOf('b2b-seo-tools-stack.png'));
const post = { slug: SLUG, title, category: 'B2B SEO', author: 'Muhammad Reyan Nizami', date: '2026-10-16', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
