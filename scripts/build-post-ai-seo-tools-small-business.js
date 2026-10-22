// Builds the "ai seo tools for small business" post + assets. node scripts/build-post-ai-seo-tools-small-business.js [--write]
// Data: public pricing pages of 8 AI SEO tools + 6 readable ranking pages + 3 Google docs, all read 22 Oct 2026. Tools are described by type, never named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'ai-seo-tools-for-small-business';
const R = require('../../keyword-research/serp-ai-seo-small-business-2026-10-22.json');
const T = R.tools; const S = R.serp.filter(o => o.status === 200 && o.words > 500);
if (T.length !== 8 || T.some(t => t.status !== 200 || !t.confirmed.every(Boolean))) throw new Error('pricing facts not confirmed');
const entries = T.map(t => t.entry).sort((a, b) => a - b);
const D = { tools: T.length, min: entries[0], max: entries[7], over100: T.filter(t => t.entry >= 100).length, ai: T.filter(t => t.aiPrompts).length, pages: S.length, priceHeavy: S.filter(o => o.price >= 50).length, gdoc: S.filter(o => o.googleDoc).length, dated: S.filter(o => o.date).length, budget: S.filter(o => o.budget).length, median: (() => { const w = S.map(o => o.words).sort((a, b) => a - b); return Math.round((w[2] + w[3]) / 2); })() };
const exp = { tools: 8, min: 23, max: 139, over100: 4, ai: 8, pages: 6, priceHeavy: 3, gdoc: 0, dated: 2, budget: 5, median: 5595 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const f = n => n.toLocaleString('en-US');
console.log(JSON.stringify(D));
// trial wording read on each pricing page (see crawl-day9-ai-small-business.js and the 22 Oct reading)
const rows = [
  ['All-in-one research suite', '$139', 'Monthly', 'Free trial offered', '500 keywords tracked daily'],
  ['Backlink and research suite', '$129', 'Monthly', 'Free tier for your own site', '750 tracked keywords'],
  ['Content editor', '$82', 'Billed yearly', 'Free start offered', '50 AI prompts tracked'],
  ['Content brief tool', '$49', 'Monthly', '7-day trial, no card', '10 articles a month'],
  ['NLP content optimizer', '$23', 'Monthly', 'Free trial offered', '25 documents'],
  ['Enterprise content grader', '$129', 'Monthly', '14-day trial', '50 pages'],
  ['Content production platform', '$59', 'Monthly', 'None shown', '10 prompts tracked'],
  ['Budget all-in-one platform', '$129', 'Monthly', '14-day trial, no card', '2,000 keywords']];

// ---------- assets
L.donut(SLUG, ['AI SEO TOOLS', 'SMALL BUSINESS'], [['Start With', 'Free Data'], 'Pick One Job', ['Check the', 'Limit First'], 'Test for 30 Days', ['Keep or', 'Cancel']]);
L.cover(SLUG, { badge: 'PRICING PAGES READ', search: 'ai seo tools for small business', card: `Entry plans: ${D.min} to ${D.max} dollars`,
  lines: ['Entry plans over $100 a month: 4 of 8', 'Plans that state a usage limit: 8 of 8', 'Pages offering a free trial: 6 of 8', 'Ranking pages linking Google docs: 0 of 6'],
  last: 'Pay for one job at a time', big: '$23 to $139', k1: 'entry price a month', k2: 'across 8 pricing pages', title: 'AI SEO Tools for Small Business', sub: 'What a budget really buys' });
fs.writeFileSync(path.join(__dirname, 'infographic-ai-seo-tools-for-small-business.html'), L.infographicHtml({
  title: 'What 8 AI SEO pricing pages show', sub: 'Public pricing pages, read on 22 October 2026',
  leftTitle: 'Out of 8 pricing pages', leftTag: 'Number of pages', max: 8,
  bars: [{ label: 'State a usage limit', sub: 'keywords, pages or prompts', n: 8 }, { label: 'Sell AI visibility tracking', sub: 'prompts or AI answers', n: 8 }, { label: 'Offer a free trial', sub: 'on the pricing page', n: 6 }, { label: 'Entry plan over $100', sub: 'a month', n: 4 }, { label: 'Free tier for own site', sub: 'verified-site data', n: 1 }],
  rightTitle: 'Before you pay', rightTag: 'Four steps we use', items: [
    { t: 'Start with free data', s: 'Search Console first' }, { t: 'Pick one job', s: 'not a whole suite' },
    { t: 'Read the limit', s: 'keywords, pages, prompts' }, { t: 'Judge after 30 days', s: 'by Search Console' }],
  big: '8', noteHtml: `pricing pages read, <em>every one</em> states a usage limit.` }));
fs.writeFileSync(path.join(__dirname, 'table-ai-seo-tools-for-small-business-tools.html'), L.tableHtml({ title: 'What 8 AI SEO tools show on their pricing pages', sub: 'Public pricing pages read on 22 October 2026 (US). Tools are described by type, not named. Entry price is the lowest paid plan shown; billing basis differs, so compare with care.',
  head: ['Type of tool', 'Entry price a month', 'Billing basis', 'Free trial', 'Limit shown'], lastBold: false, rows }));
fs.writeFileSync(path.join(__dirname, 'table-ai-seo-tools-for-small-business-serp.html'), L.tableHtml({ title: `What ${D.pages} ranking pages show`, sub: `Organic results for "ai seo tools for small business" read on 22 October 2026 (8 listed, ${D.pages} readable). Sites are not named.`,
  head: ['Measure', 'Value'], lastBold: false,
  rows: [['Pages read', String(D.pages)], ['Median page length', `${f(D.median)} words`], ['Pages that mention budget or price limits', `${D.budget} of ${D.pages}`], ['Pages that list many prices (50+ dollar figures)', `${D.priceHeavy} of ${D.pages}`], ['Pages that link Google\'s own documentation', `${D.gdoc} of ${D.pages}`], ['Pages that show a publish or update date', `${D.dated} of ${D.pages}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-ai-seo-tools-for-small-business-budget.html'), L.tableHtml({ title: 'A budget ladder for a small site', sub: 'Our suggestion, based on the entry prices above. Not a ranking of tools.',
  head: ['Monthly budget', 'What to use', 'What it cannot do'], lastBold: false,
  rows: [['$0', 'Search Console, Google Analytics and free browser tools', 'No keyword volume, no backlink data'], ['$23 to $50', 'One content or brief tool', 'No rank tracking or site-wide audits'], ['$129 to $139', 'One research suite', 'No done-for-you writing or fixes']] }));
fs.writeFileSync(path.join(__dirname, 'quote-ai-seo-tools-for-small-business-doc.html'), quote({ source: 'Google Search Central · AI features and your website', title: 'What Google says about AI Overviews and AI content',
  paras: ['There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary.',
    'Generative AI can be particularly useful when researching a topic, and to add structure to original content. However, using generative AI tools to generate many pages without adding value for users may violate Google\'s spam policy on scaled content abuse.',
    'It is critical to manually factcheck and review all AI-generated content for accuracy and trustworthiness before publishing.'] }));

// ---------- article
const sz = fn => { if (!fs.existsSync(fn)) return [1280, 600]; const b = fs.readFileSync(fn); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1];
const fig = (n, alt) => `<figure style="margin:20px 0;"><img src="/images/blog/proof/${SLUG}-${n}.png" alt="${alt}" width="${n === 'doc' ? 880 : 1280}" height="${hh(SLUG + '-' + n + '.png')}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>`;
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>AI SEO tools for a small business</strong> are paid or free programs that use AI to help a small team find keywords, improve pages, check technical problems or track visibility in AI answers. The hard part is not finding a list of them. It is deciding which single job is worth paying for, and what the plan actually includes. To answer that, we read the public pricing pages of ${D.tools} AI SEO tools on 22 October 2026. Entry plans ran from $${D.min} to $${D.max} a month, ${D.over100} of the ${D.tools} cost over $100, and every one states a usage limit.</p>

<p>This guide gives you those numbers, what ${D.pages} ranking pages for this search leave out, what Google says about AI and AI Overviews, a budget ladder for a small site, and a 30-day test to run before you commit. If you want a comparison of tool categories instead, see <a href="/blog/ai-powered-seo-tools">AI-powered SEO tools compared</a>. This page is about budget and fit.</p>

<h2>What a Small Business Actually Needs From AI SEO Tools</h2>
<p>A small site usually needs three things, in this order. First, to know what is working: which pages get impressions and clicks, and which queries bring them. Second, to fix what is broken: missing titles, broken links, a missing sitemap, no structured data. Third, to decide what to write or update next. AI tools can speed up the second and third jobs. None of them can replace the first, because that data comes from your own site, and Google gives it away free in Search Console.</p>
<p>That matters because a tool that sells "AI-powered insights" is usually rearranging data you could already see. Before paying, write down the single job you want help with, such as finding questions to answer, grading a draft or tracking mentions in AI answers. A tool that does that one job for $25 is a better first purchase than a suite that does ten jobs for $130.</p>

<h2>What We Found on ${D.tools} AI SEO Pricing Pages</h2>
${fig('tools', `Table of eight AI SEO tools by type showing entry price from $23 to $139 a month, billing basis, free trial wording and the usage limit each pricing page states`)}
<ul>
<li><strong>Entry plans span $${D.min} to $${D.max} a month.</strong> The lowest is a content optimizer at $23 and the highest an all-in-one research suite at $139. The gap is six to one.</li>
<li><strong>${D.over100} of ${D.tools} entry plans cost over $100 a month.</strong> Four cost $129 to $139, which is $1,548 to $1,668 a year for a starting plan.</li>
<li><strong>All ${D.tools} state a usage limit.</strong> The limit is counted in tracked keywords, documents, pages, articles or AI prompts, so "unlimited" is rare at the entry level.</li>
<li><strong>${D.ai} of ${D.tools} sell AI visibility tracking.</strong> Each pricing page now mentions prompts, AI answers or AI search.</li>
<li><strong>6 of ${D.tools} offer a free trial</strong> on the pricing page. One more gives free data for a site you own, and one shows none.</li>
</ul>
<p>One caution about reading prices. The billing basis is not the same across pages. Most entry prices above are monthly, one is the price when billed yearly, and some pages show a larger discount for annual payment or a limited-time sale. A lower annual price is only a saving if you still want the tool in month twelve. For a small business, the monthly price is the honest number, because it is what you pay if you cancel early.</p>

<h2>What ${D.pages} Ranking Pages Leave Out</h2>
${fig('serp', `Table of what 6 ranking pages for AI SEO tools for small business show: median 5,595 words, 5 of 6 mention budget, 3 list many prices, 0 of 6 link Google documentation and 2 of 6 show a date`)}
<p>We also read the ${D.pages} readable pages that rank for this search on Google US on the same day (${8 - D.pages === 2 ? 'two of the 8 results did not return a readable page' : 'the others did not return a readable page'}). They run a median of ${f(D.median)} words. ${D.budget} of ${D.pages} talk about budget, and ${D.priceHeavy} list many prices. None of the ${D.pages} link to Google's own documentation on AI content or AI Overviews, and only ${D.dated} show a publish or update date. For a topic where prices change monthly, a missing date means you cannot tell whether a number is current.</p>
<p>That is the gap this page tries to fill: a dated reading of the pricing pages, a budget ladder that starts at zero, and Google's own statements next to the sales claims.</p>

<h2>What Google Says About AI SEO and AI Content</h2>
${fig('doc', `Excerpt from Google Search Central: no additional requirements for AI Overviews or AI Mode, generative AI is useful for research and structure, scaled content abuse may violate spam policy, and AI content must be fact-checked`)}
<p>Three statements from Google's documentation, read on 22 October 2026, change how you should shop:</p>
<ul>
<li><strong>There is no special optimization for AI Overviews.</strong> Google says there are no additional requirements to appear in AI Overviews or AI Mode, and that regular SEO best practices still apply. So a tool that promises a secret AI Overview formula is promising something Google says does not exist.</li>
<li><strong>AI is fine for research and structure.</strong> Google describes generative AI as useful for researching a topic and adding structure to original content.</li>
<li><strong>Mass AI pages can be spam.</strong> Using AI to generate many pages without adding value for users may violate the spam policy on scaled content abuse. A small business that buys a "content at scale" plan and publishes unreviewed drafts is taking that risk.</li>
</ul>
<p>Google also says AI output can contain inaccuracies and that you should fact-check and review it before publishing. In practice, that means the tool's draft is the start of your work, not the end. We follow the same rule: every number in this guide was read from a page on the date shown. For the wider strategy, see <a href="/blog/ai-seo-strategy">AI SEO strategy</a> and the <a href="/blog/llm-visibility-guide-2026">LLM visibility guide</a>.</p>

<h2>The $0 Stack: What Free Data and Free Tools Already Cover</h2>
<p>Before you pay anything, use what is free. Search Console shows your queries, pages, impressions and clicks. Our guide to <a href="/blog/search-console-impressions-explained">Search Console impressions</a> explains how to read the numbers without being misled by averages. Google Analytics shows what visitors do after they arrive. And a set of browser-based tools can do many of the checks a paid suite advertises, without sending your data anywhere:</p>
<ul>
<li>The <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a> checks a page for common problems.</li>
<li>The <a href="/tools/meta-tag-generator">meta tag generator</a> and <a href="/tools/schema-markup-generator">schema markup generator</a> write titles, descriptions and structured data.</li>
<li>The <a href="/tools/sitemap-generator">sitemap generator</a> and <a href="/tools/robots-txt-generator">robots.txt generator</a> cover crawling basics.</li>
<li>The <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> helps you give each page one main keyword so your own pages do not compete.</li>
<li>The <a href="/tools/llm-seo-checker">LLM SEO checker</a> and <a href="/tools/llms-txt-generator">llms.txt generator</a> cover the AI-visibility basics.</li>
<li>The <a href="/tools/seo-report-generator">SEO report generator</a> turns your numbers into a monthly report.</li>
</ul>
<p>The full list is in <a href="/blog/free-seo-tools">free SEO tools</a>. They do not pull keyword volume or backlink databases, which is the real reason people pay for suites. But they cover most of what a small site needs in its first months.</p>

<h2>A Budget Ladder for a Small Site</h2>
${fig('budget', `Table of a budget ladder for a small site: $0 for Search Console and free tools, $23 to $50 for one content or brief tool, $129 to $139 for one research suite, with what each cannot do`)}
<p>This is our suggestion, built from the entry prices we read. It is a ladder, not a stack: climb one rung when a clear limit holds you back.</p>
<ol>
<li><strong>$0.</strong> Use Search Console, Analytics and the free tools above. Do this for at least a month so you know your baseline.</li>
<li><strong>$23 to $50.</strong> If drafting and grading content is your bottleneck, add one content or brief tool. At the entry level you get tens of documents or articles a month, which is plenty for a small site publishing a few pieces.</li>
<li><strong>$129 to $139.</strong> If you need keyword volume, competitor data or backlinks, add one research suite. This is where most of the $100-plus plans sit. Pay monthly until you are sure.</li>
</ol>
<p>If you outsource instead, compare against a service quote. Our <a href="/blog/seo-packages-for-small-business">SEO packages for small business</a> guide shows what monthly packages include, and <a href="/blog/local-seo-for-small-business">local SEO for small business</a> covers a business that sells to one area.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-${SLUG}.png" alt="Infographic of what 8 AI SEO pricing pages show: all 8 state a usage limit, 8 sell AI visibility tracking, 6 offer a free trial, 4 have an entry plan over $100, plus four steps to follow before paying" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How to Test a Paid Tool for 30 Days</h2>
<ol>
<li><strong>Write the job down.</strong> For example: "find 20 questions customers ask that our pages do not answer".</li>
<li><strong>Record your baseline.</strong> Note your clicks, impressions and the pages you will change from Search Console before you start.</li>
<li><strong>Use the free trial or pay monthly.</strong> Avoid annual billing until the tool has proved itself.</li>
<li><strong>Change a few pages, not all.</strong> Pick five to ten pages so you can see the effect.</li>
<li><strong>Review at day 30.</strong> Look at impressions, clicks and average position for those pages, allowing for the fact that Google can take days to weeks to recrawl.</li>
<li><strong>Decide with a rule.</strong> Keep the tool only if it saved real hours or moved a number you care about. Otherwise cancel before the next bill.</li>
</ol>
<p>Be fair to the test. A month is short for rankings, so also count time saved. If a tool turns a three-hour brief into twenty minutes, that is a result even when rankings have not moved yet.</p>

<h2>Questions to Ask Before You Pay</h2>
<ul>
<li><strong>What is the limit?</strong> Check keywords, pages, documents or prompts. A small limit that you hit in week two means the real price is the next plan up.</li>
<li><strong>Is the price monthly or billed yearly?</strong> Ask for the month-to-month price and for the refund terms.</li>
<li><strong>Where does the data come from?</strong> Keyword volumes and AI-answer tracking are estimates. Ask how often they refresh.</li>
<li><strong>Can I export my data?</strong> If you cancel, you should keep your lists and reports.</li>
<li><strong>Does it publish for me?</strong> If a tool can publish pages on its own, set a review step. Unreviewed bulk pages are what Google's scaled content abuse policy targets.</li>
<li><strong>Does it promise AI Overview placement?</strong> Google says there is no special optimization for it, so treat such promises with caution.</li>
</ul>

<h2>Common Mistakes Small Businesses Make With AI SEO Tools</h2>
<ul>
<li><strong>Buying a suite to do one job.</strong> If you only need to grade drafts, a $23 tool is enough.</li>
<li><strong>Paying yearly on day one.</strong> The discount is real, but so is a year of paying for something you stopped using.</li>
<li><strong>Chasing AI visibility before the basics.</strong> If your pages are not indexed and have no clear title, tracking prompts will only show you a blank result.</li>
<li><strong>Publishing drafts unchecked.</strong> Google asks you to fact-check AI output. Wrong numbers hurt trust faster than slow publishing.</li>
<li><strong>Judging by rankings in week one.</strong> Rankings lag. Use time saved and Search Console trends.</li>
<li><strong>Stacking overlapping tools.</strong> Two content tools usually do the same job. Keep one.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Pricing facts come from each tool's public pricing page, fetched on 22 October 2026 for the US. Each recorded price, billing basis and limit was matched against the page text before use.</li>
<li>Entry price means the lowest paid plan shown. Some pages show promotions or annual discounts; we used the standard price on the basis shown in the table.</li>
<li>"Free trial" counts only wording on the pricing page itself. A tool may offer a trial elsewhere.</li>
<li>Ranking pages are the organic results for "ai seo tools for small business" on Google US on the same day. Eight were listed; ${D.pages} returned a readable page. Prices counted are dollar figures in the page text.</li>
<li>Google statements come from its Search Central documentation on AI features, generative AI content and spam policies.</li>
<li>Tools are described by type. We do not rank or rate them, and prices change often, so check the page before you buy.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Entry plans on ${D.tools} AI SEO pricing pages ran from $${D.min} to $${D.max} a month, and ${D.over100} cost over $100.</li>
<li>All ${D.tools} state a usage limit, so read it before the price.</li>
<li>Google says AI Overviews need no special optimization, and that mass AI pages may be spam.</li>
<li>Start at $0 with Search Console and free tools, then add one paid tool for one job.</li>
<li>Pay monthly, test for 30 days, and cancel if it does not save time or move a number.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are the best AI SEO tools for a small business?</summary>
<p>It depends on the job. For drafting and grading content, a $23 to $50 content tool is enough. For keyword and competitor data, an entry research suite at $129 to $139 is more typical. Start with free tools and Search Console.</p>
</details>
<details>
<summary>How much do AI SEO tools cost?</summary>
<p>On eight pricing pages we read on 22 October 2026, entry plans ran from $23 to $139 a month, and four of eight cost over $100. Check the billing basis, because some prices are for annual payment.</p>
</details>
<details>
<summary>Are there free AI SEO tools?</summary>
<p>Yes. Search Console and Analytics are free, and so are browser-based tools such as our <a href="/blog/free-seo-tools">free SEO tools</a>. Many paid tools also offer a free trial, which 6 of the 8 we read state on the pricing page.</p>
</details>
<details>
<summary>Do I need an AI SEO tool to appear in AI Overviews?</summary>
<p>No. Google says there are no additional requirements to appear in AI Overviews or AI Mode and no special optimizations are needed. Regular SEO best practices still apply.</p>
</details>
<details>
<summary>Does Google penalize AI-written content?</summary>
<p>Google says AI can be useful for research and structure, but generating many pages without adding value for users may violate its spam policy on scaled content abuse. Review and fact-check what you publish.</p>
</details>
<details>
<summary>Should I pay monthly or yearly?</summary>
<p>Pay monthly until a tool has proved itself in a 30-day test. Annual prices are lower but cost more if you stop using the tool.</p>
</details>
<details>
<summary>Can one tool replace an SEO agency?</summary>
<p>Tools help you do the work faster, but someone still has to act on the results. If you do not have the time, compare with an agency package. See <a href="/blog/seo-packages-for-small-business">SEO packages for small business</a>.</p>
</details>
<details>
<summary>How do I know if an AI SEO tool is working?</summary>
<p>Record your clicks, impressions and positions from Search Console before you start, change a small set of pages, and review after 30 days. Count time saved too.</p>
</details>
<details>
<summary>What is the first thing a small site should fix?</summary>
<p>Make sure your key pages are indexed, have clear titles and descriptions, and are in your sitemap. Our <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a> checks the basics for free.</p>
</details>
</div>
`;
const title = 'AI SEO Tools for Small Business: What a Budget Really Buys';
const excerpt = `AI SEO tools for small business: we read 8 pricing pages (entry plans $${D.min} to $${D.max} a month) and 6 ranking pages, with Google's rules and a budget ladder from $0.`;
const out = content;
const post = { slug: SLUG, title, category: 'AI SEO', author: 'Umaira Liaquat', date: '2026-10-22', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
