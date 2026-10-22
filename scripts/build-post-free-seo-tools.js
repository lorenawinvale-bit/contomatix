// Builds the "free seo tools" hub post + assets. node scripts/build-post-free-seo-tools.js [--write]
// Data: 8 organic pages for "free seo tools" (Google US, 16 Oct 2026; 6 readable) + our own tools.js inventory (28 tools). Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'free-seo-tools';
const R = require('../../keyword-research/serp-free-seo-tools-2026-10-16.json');
const TOOLS = require('../data/tools.js');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length; const t = n => ok.filter(o => o.tools.includes(n)).length;
const D = { shown: R.length, ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], free: c(o => o.freeTier), limits: c(o => o.limits), report: c(o => o.report), price: c(o => o.price), gsc: t('Google Search Console'), ga: t('Google Analytics'), sf: t('Screaming Frog'), ahrefs: t('Ahrefs'), uber: t('Ubersuggest'), kp: t('Google Keyword Planner'), atp: t('AnswerThePublic'), trends: t('Google Trends'), moz: t('Moz'), mine: TOOLS.length };
const exp = { shown: 8, ok: 6, median: 1526, free: 4, limits: 5, report: 5, price: 2, gsc: 3, ga: 2, sf: 2, ahrefs: 3, uber: 2, kp: 2, atp: 2, trends: 2, moz: 2, mine: 35 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');
const by = Object.fromEntries(TOOLS.map(x => [x.slug, x]));
const groups = [
  ['Technical SEO and crawling', ['technical-seo-audit-tool', 'robots-txt-tester', 'robots-txt-generator', 'canonical-tag-checker', 'redirect-mapper', 'heading-checker', 'internal-link-checker']],
  ['Sitemaps and international SEO', ['sitemap-generator', 'sitemap-validator', 'sitemap-url-extractor', 'sitemap-finder', 'html-sitemap-generator', 'hreflang-generator', 'hreflang-sitemap-validator']],
  ['Titles, snippets and structured data', ['meta-tag-generator', 'serp-snippet-preview', 'og-preview-generator', 'slug-generator', 'schema-markup-generator', 'schema-markup-validator']],
  ['Content and keywords', ['keyword-mapping-tool', 'readability-checker']],
  ['Links', ['dofollow-link-checker', 'outreach-email-generator', 'link-prospect-scorer', 'link-building-cost-calculator', 'anchor-text-checker']],
  ['AI SEO', ['llms-txt-generator', 'llm-seo-checker']],
  ['Reporting, proposals and tracking', ['seo-report-generator', 'content-marketing-roi-calculator', 'seo-proposal-generator', 'utm-builder', 'geo-grid-rank-planner', 'invoice-generator']]];
const listed = groups.flatMap(g => g[1]); if (listed.length !== D.mine || new Set(listed).size !== D.mine || listed.some(s => !by[s])) throw new Error('groups do not cover tools.js');

// ---------- assets
L.donut(SLUG, ['FREE SEO', 'TOOLS'], [['Start With', 'Google Data'], 'Check Limits', ['Audit One', 'Page at a Time'], 'Use Browser Tools', ['Report', 'Monthly']]);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'free seo tools', card: `Pages read: ${D.ok} of ${D.shown}`,
  lines: [`Median page length: ${f(D.median)} words`, `Name Search Console: ${D.gsc} of ${D.ok}`, `Mention a usage limit: ${D.limits} of ${D.ok}`, `Free tools of ours: ${D.mine}`, `Mention a free plan: ${D.free} of ${D.ok}`],
  last: 'Check the limit first', big: `${D.limits} of ${D.ok}`, k1: 'ranking pages mention', k2: 'a limit on free use', title: 'Free SEO Tools', sub: `What ${D.ok} ranking pages say, plus ${D.mine} tools tested` });
fs.writeFileSync(path.join(__dirname, 'infographic-free-seo-tools.html'), L.infographicHtml({
  title: `Free SEO Tools: ${D.ok} Pages Read`, sub: 'Organic results for "free seo tools", Google US, 16 October 2026',
  leftTitle: 'Tools the ranking pages name', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
  bars: [{ label: 'Search Console', sub: 'free, from Google', n: D.gsc }, { label: 'Ahrefs', sub: 'free tools and trial', n: D.ahrefs }, { label: 'Screaming Frog', sub: 'crawler, free to 500 URLs', n: D.sf }, { label: 'Ubersuggest', sub: 'keyword ideas', n: D.uber }, { label: 'Keyword Planner', sub: 'inside Google Ads', n: D.kp }],
  rightTitle: 'Use free tools in this order', rightTag: 'Check limits before you rely on one', items: [
    { t: '1. Google first-party data', s: 'Search Console and GA4' }, { t: '2. One-page audits', s: 'title, canonical, schema' },
    { t: '3. Crawl the whole site', s: 'free up to 500 URLs' }, { t: '4. Report monthly', s: 'same fields every time' }],
  big: `${D.limits} of ${D.ok}`, noteHtml: `pages mention <em>a usage limit</em> on their free tools. Check queries, URLs and exports first.` }));
const sup = (a, b) => [a, `${b} of ${D.ok}`];
fs.writeFileSync(path.join(__dirname, 'table-free-seo-tools-mentions.html'), L.tableHtml({ title: `Tools named by ${D.ok} pages ranking for free seo tools`, sub: `Organic results read on 16 October 2026 (${D.shown} listed, ${D.ok} returned a readable page). Sites are not named. A tool counts once per page.`,
  head: ['Tool', 'Pages naming it'], lastBold: false,
  rows: [sup('Google Search Console', D.gsc), sup('Ahrefs', D.ahrefs), sup('Google Analytics', D.ga), sup('Screaming Frog', D.sf), sup('Ubersuggest', D.uber), sup('Google Keyword Planner', D.kp), sup('AnswerThePublic', D.atp), sup('Google Trends', D.trends), sup('Moz', D.moz)] }));
fs.writeFileSync(path.join(__dirname, 'table-free-seo-tools-ours.html'), L.tableHtml({ title: `The ${D.mine} free tools on contomatix.com, by job`, sub: 'Counted from our tools list on 16 October 2026. Every tool runs in your browser with no signup.',
  head: ['Job', 'Tools'], lastBold: true,
  rows: [...groups.map(g => [g[0], String(g[1].length)]), ['All free tools', String(D.mine)]] }));

// ---------- article
const li = s => `<li><a href="/tools/${s}"><strong>${by[s].title}</strong></a>: ${by[s].summary}</li>`;
const groupHtml = groups.map(g => `<h3>${g[0]}</h3>\n<ul>\n${g[1].map(li).join('\n')}\n</ul>`).join('\n');
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Free SEO tools</strong> are tools you can use without paying to check, plan and measure a site's search performance. Before writing this guide we read the ${D.ok} readable pages that rank on Google US for the term. They run a median of ${f(D.median)} words, only ${D.gsc} of ${D.ok} name Google Search Console, and ${D.limits} of ${D.ok} mention a limit on free use. This page puts everything in one place: the free Google tools, the limits to check, and all ${D.mine} free tools we have built, grouped by job.</p>

<p>Below you will find what the ranking pages recommend, a free stack to use in order, every tool on contomatix.com with a link, and the limits to check before you rely on any free tool.</p>

<h2>What the Ranking Pages Recommend</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/free-seo-tools-mentions.png" alt="Table of tools named by 6 pages ranking for free seo tools: Google Search Console 3, Ahrefs 3, Google Analytics 2, Screaming Frog 2, Ubersuggest 2, Google Keyword Planner 2, AnswerThePublic 2, Google Trends 2, Moz 2" width="1280" height="@@MH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>No single tool wins.</strong> The most-named tools appear on only ${D.gsc} of ${D.ok} pages, so every list is different. Build your own by job.</li>
<li><strong>Several "free" pages are vendor pages.</strong> Some results are a vendor's own tool hub, designed to lead to a paid plan. That is fine, but read the limit before you rely on one.</li>
<li><strong>Limits are common.</strong> ${D.limits} of ${D.ok} pages mention a usage limit or cap, such as a number of queries, URLs or reports. ${D.free} of ${D.ok} mention a free plan or trial.</li>
<li><strong>Prices are rare.</strong> Only ${D.price} of ${D.ok} show a dollar figure, so check the vendor's pricing page for what happens after the free tier.</li>
<li><strong>Reports are everywhere.</strong> ${D.report} of ${D.ok} mention reports, which is the step our tools help with too.</li>
</ul>

<h2>A Free SEO Stack, in Order</h2>
<p>Search for "free SEO tools" and you will find hundreds of names. A short list covers most needs, and it should be used in this order.</p>
<ol>
<li><strong>Google Search Console.</strong> It shows the queries and pages that bring impressions and clicks to your site. It is the only source of your own search data, so open it first.</li>
<li><strong>Google Analytics 4.</strong> It shows what visitors do after they arrive and, with key events set up, which pages lead to enquiries or sales.</li>
<li><strong>PageSpeed Insights.</strong> It reports real-user speed data where enough is available. In Google's documentation a page is rated good when Largest Contentful Paint is 2.5 seconds or less, Interaction to Next Paint is 200 milliseconds or less and Cumulative Layout Shift is 0.1 or less.</li>
<li><strong>Google's Rich Results Test.</strong> It previews whether a page is eligible for rich result features, although Google notes that structured data enables a feature but does not guarantee it will appear.</li>
<li><strong>A free crawler.</strong> The Screaming Frog SEO Spider is free to crawl up to 500 URLs, according to its pricing page, which is enough for most small sites.</li>
<li><strong>Keyword ideas.</strong> Google Trends and the Keyword Planner inside Google Ads show demand, and the Performance report in Search Console shows the queries you already rank for.</li>
<li><strong>Single-page checkers.</strong> The tools below run in your browser, take your own input and need no account.</li>
</ol>

<h2>All ${D.mine} Free SEO Tools on Contomatix, by Job</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/free-seo-tools-ours.png" alt="Table of the 35 free tools on contomatix.com by job: technical SEO and crawling 7, sitemaps and international 7, titles snippets and structured data 6, content and keywords 2, links 5, AI SEO 2, reporting proposals and tracking 6" width="1280" height="@@OH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Every tool below runs in your browser. Nothing you paste is uploaded or stored, and there is no signup, usage cap or watermark. You can also browse them together on our <a href="/tools">free tools page</a>.</p>
${groupHtml}

<h2>Limits to Check Before You Rely on a Free Tool</h2>
<p>A free tool can still cost you time if it hides a limit. Before you build a process around one, check these points.</p>
<ul>
<li><strong>Volume.</strong> How many URLs, keywords or checks do you get? A crawler that stops at 500 URLs is fine for a 200-page site and not for a 20,000-page one.</li>
<li><strong>Data source.</strong> Does it use your own data, the vendor's index or a sample? Search Console is first-party. Third-party volume and difficulty figures are estimates.</li>
<li><strong>Export.</strong> Can you take the results out as a file or text? A report you cannot copy is hard to use.</li>
<li><strong>Account.</strong> Does it need a login, and what does it do with your email? Browser-based tools that never upload your input avoid the question.</li>
<li><strong>Freshness.</strong> When was the tool last updated? Google changes its guidance, and checks built on old rules mislead.</li>
</ul>

<h2>Free Versus Paid: Where Free Tools Stop</h2>
<p>Free tools are excellent for checking your own site and weak for competitor research. They tell you what is wrong with a page, which queries bring you impressions and how a change performed. They rarely give you a competitor's keywords, a full backlink index or rank tracking across thousands of terms. If your question is "what is broken on my page", free tools answer it. If it is "what do my rivals rank for", you will need data from a paid source. Our guide to <a href="/blog/best-seo-tools-2026">the best SEO tools in 2026</a> compares paid options once you reach that point, and our <a href="/blog/b2b-seo-tools">B2B SEO tools</a> guide builds a stack for software companies.</p>

<h2>Which Free Tool Answers Which Question</h2>
<ul>
<li><strong>"Why is this page not showing a good snippet?"</strong> Preview it with the <a href="/tools/serp-snippet-preview">SERP snippet checker</a> and compare the title and description with the queries in Search Console.</li>
<li><strong>"Is this page blocked or duplicated?"</strong> Test the URL in the <a href="/tools/robots-txt-tester">robots.txt tester</a> and check the tag with the <a href="/tools/canonical-tag-checker">canonical tag checker</a>.</li>
<li><strong>"Are my links passing credit?"</strong> Paste the page HTML into the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.</li>
<li><strong>"Which page should target this keyword?"</strong> Use the <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> so two pages do not compete.</li>
<li><strong>"Are we ready for AI search?"</strong> Run the <a href="/tools/llm-seo-checker">LLM SEO checker</a> and create an <a href="/tools/llms-txt-generator">llms.txt file</a> if you want one.</li>
<li><strong>"What do I send the client?"</strong> Use the <a href="/tools/seo-report-generator">SEO report generator</a> each month and the <a href="/tools/seo-proposal-generator">SEO proposal generator</a> for new work.</li>
</ul>
<p>Each of these questions has a cheap, fast answer. If a question needs data you cannot get from your own site, that is the moment to consider a paid tool, not before.</p>

<h2>How to Use Free SEO Tools in a Monthly Routine</h2>
<ol>
<li><strong>Week 1: measure.</strong> Export the month's clicks, impressions, CTR and position from Search Console and note the top pages.</li>
<li><strong>Week 2: audit.</strong> Run the <a href="/tools/technical-seo-audit-tool">SEO page audit</a> on your five most important pages and fix titles, canonicals and headings.</li>
<li><strong>Week 3: fix structure.</strong> Validate your <a href="/tools/sitemap-validator">sitemap</a> and your <a href="/tools/robots-txt-tester">robots.txt</a>, and check <a href="/tools/schema-markup-validator">structured data</a> on templates you changed.</li>
<li><strong>Week 4: report.</strong> Turn the numbers into a one-page summary with the <a href="/tools/seo-report-generator">SEO report generator</a> and list next month's priorities.</li>
</ol>
<p>Keep the same four weeks each month and you will see what moved and why. That habit matters more than any single tool.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-free-seo-tools.png" alt="Infographic of the tools named by 6 pages ranking for free seo tools and the order in which to use free SEO tools" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the ${D.shown} organic results for one query on one day (Google US, 16 October 2026); ${D.ok} returned a readable page and two blocked our request.</li>
<li>A tool counts once per page, whether the page recommends it or only mentions it. Counts are a reading aid, not a ranking of tools.</li>
<li>The tool counts for contomatix.com come from our own tools list on the same date.</li>
<li>Free limits come from each vendor's own pages and may change.</li>
<li>Results in other countries or at other times will differ, so rerun the check on your own market.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Start with Google's free tools: Search Console, Analytics and PageSpeed Insights.</li>
<li>Check the limit on any free tool before you build a process around it.</li>
<li>Use one-page checkers for titles, canonicals, sitemaps and structured data.</li>
<li>Report monthly with the same fields every time.</li>
<li>Pay only when you need competitor data or scale the free tools do not give.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are the best free SEO tools?</summary>
<p>Start with Google Search Console, Google Analytics 4 and PageSpeed Insights, then add a free crawler and single-page checkers. No single tool covers every job.</p>
</details>
<details>
<summary>Are there free SEO tools with no signup?</summary>
<p>Yes. All ${D.mine} tools on contomatix.com run in your browser with no account, and nothing you paste is uploaded.</p>
</details>
<details>
<summary>Is there a free SEO audit tool?</summary>
<p>Our free SEO page audit checks one page's title, meta description, headings, canonical, robots meta, structured data, images and links. The Screaming Frog SEO Spider crawls up to 500 URLs for free.</p>
</details>
<details>
<summary>What is the best free keyword research tool?</summary>
<p>Search Console shows the queries you already rank for. Google Trends and the Keyword Planner show demand. Third-party free tools usually limit how many searches you can run.</p>
</details>
<details>
<summary>Can I do SEO with only free tools?</summary>
<p>Yes for your own site: performance, speed, audits, structured data and reporting. Competitor research and large-scale rank tracking usually need a paid tool.</p>
</details>
<details>
<summary>Are free SEO tools accurate?</summary>
<p>First-party tools such as Search Console report your own data. Third-party volume and difficulty numbers are estimates, so treat them as guides, not facts.</p>
</details>
<details>
<summary>What is a good free SEO report template?</summary>
<p>A one-page monthly summary with clicks, impressions, CTR and position against the previous month, top pages, work done and next steps. Our free SEO report generator builds one from your numbers.</p>
</details>
<details>
<summary>How do I check my site's technical SEO for free?</summary>
<p>Run a single-page audit on key pages, validate your sitemap and robots.txt, check structured data and use Search Console's indexing reports for site-wide problems.</p>
</details>
<details>
<summary>Do free SEO tools have limits?</summary>
<p>Many do. ${D.limits} of the ${D.ok} pages we read mention a limit on queries, URLs or reports, so check the limit before you depend on a tool.</p>
</details>
</div>
`;
const title = 'Free SEO Tools: 35 Tools by Job, and What 6 Pages Say';
const excerpt = `Free SEO tools in one place: what ${D.ok} ranking pages recommend, a free stack to use in order, and all ${D.mine} free Contomatix tools grouped by job. Check limits first.`;
const pngSize = f => { const b = fs.readFileSync(f); return b.readUInt32BE(20); };
const proof = path.join(root, 'public', 'images', 'blog', 'proof'); const hOf = n => fs.existsSync(path.join(proof, n)) ? pngSize(path.join(proof, n)) : 600;
const out = content.replace('@@MH@@', hOf('free-seo-tools-mentions.png')).replace('@@OH@@', hOf('free-seo-tools-ours.png'));
const post = { slug: SLUG, title, category: 'Free Tools', author: 'Umaira Liaquat', date: '2026-10-16', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
