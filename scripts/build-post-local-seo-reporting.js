// Builds the "local seo reporting" post + assets. node scripts/build-post-local-seo-reporting.js [--write]
// Data: our own Search Console export (Chart.csv + Devices.csv, performance-2026-10-02), first-hand.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'local-seo-reporting';
const dir = path.join(root, '..', 'gsc-exports', 'performance-2026-10-02');
const rows = f => fs.readFileSync(path.join(dir, f), 'utf8').trim().split(/\r?\n/).slice(1).map(l => l.split(','));
const mon = {}; rows('Chart.csv').forEach(r => { const m = r[0].slice(0, 7); (mon[m] = mon[m] || [0, 0]); mon[m][0] += +r[1]; mon[m][1] += +r[2]; });
const dev = Object.fromEntries(rows('Devices.csv').map(r => [r[0], { c: +r[1], i: +r[2], ctr: r[3], pos: r[4] }]));
const M = ['2026-07', '2026-08', '2026-09'].map(k => ({ k, c: mon[k][0], i: mon[k][1] }));
const exp = [[5, 1182], [19, 16492], [24, 49945]]; M.forEach((m, j) => { if (m.c !== exp[j][0] || m.i !== exp[j][1]) throw new Error('data changed ' + m.k); });
if (dev.Desktop.c !== 33 || dev.Mobile.c !== 15 || dev.Mobile.i !== 15980 || dev.Desktop.i !== 51495) throw new Error('device data changed');
const f = n => n.toLocaleString('en-US'); const ctr = (c, i) => (c / i * 100).toFixed(2) + '%';
const impX = Math.round(M[2].i / M[0].i), clkX = (M[2].c / M[0].c).toFixed(1);
console.log(JSON.stringify({ M, dev, impX, clkX }));

// ---------- assets
L.donut(SLUG, ['LOCAL SEO', 'REPORTING'], [['Pick Metrics', 'That Drive Decisions'], 'Profile Performance', ['Local Rankings', 'and Website'], 'Calls and Leads', 'Explain and Plan Next']);
L.cover(SLUG, { badge: 'REAL REPORT DATA', search: 'local seo reporting', card: 'Search Console: monthly trend',
  lines: ['Sep impressions: ' + f(M[2].i), 'Sep clicks: ' + M[2].c, 'Sep CTR: ' + ctr(M[2].c, M[2].i), `Mobile CTR: ${dev.Mobile.ctr}`, `Desktop CTR: ${dev.Desktop.ctr}`],
  last: 'Report meaning, not totals', big: `${impX}x`, k1: 'more impressions in 2 months,', k2: `but only ${clkX}x the clicks`, title: 'Local SEO Reporting', sub: 'What a monthly report should really show' });
fs.writeFileSync(path.join(__dirname, 'infographic-local-seo-reporting.html'), L.infographicHtml({
  title: 'Local SEO Reporting: Our Monthly Data', sub: 'Our own Search Console data, Web search, from 20 July to 1 October 2026',
  leftTitle: 'Clicks and impressions by month', leftTag: 'Impressions in thousands', max: Math.ceil(M[2].i / 1000),
  bars: M.map((m, j) => ({ label: ['July (from 20th)', 'August', 'September'][j], sub: `${m.c} clicks, CTR ${ctr(m.c, m.i)}`, n: Math.round(m.i / 1000) || 1, v: m.i / 1000 })),
  rightTitle: 'A report that gets read', rightTag: 'Six blocks, one page', items: [
    { t: 'Profile performance', s: 'calls, directions, website clicks' }, { t: 'Local rankings', s: 'by area, not one number' },
    { t: 'Website search data', s: 'segmented by device and page' }, { t: 'Leads and what you did', s: 'then the plan for next month' }],
  big: `${impX}x`, noteHtml: `impressions in two months, with <em>${clkX}x the clicks</em>. A total alone hides that. Segment it.` }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-reporting-months.html'), L.tableHtml({ title: 'Search Console, Web search, by month', sub: 'contomatix.com. Data starts on 20 July 2026, so July covers 12 days. Month totals are summed from the daily export.',
  head: ['Month', 'Clicks', 'Impressions', 'CTR'], lastBold: false,
  rows: M.map((m, j) => [['July (from 20th)', 'August', 'September'][j], m.c, f(m.i), ctr(m.c, m.i)]) }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-reporting-devices.html'), L.tableHtml({ title: 'Search Console, Web search, by device', sub: 'contomatix.com, 20 July to 1 October 2026.',
  head: ['Device', 'Clicks', 'Impressions', 'CTR', 'Avg position'], lastBold: false,
  rows: ['Desktop', 'Mobile', 'Tablet'].map(d => [d, dev[d].c, f(dev[d].i), dev[d].ctr, dev[d].pos]) }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>Between August and September our own Search Console impressions rose from ${f(M[1].i)} to ${f(M[2].i)}, while clicks went from ${M[1].c} to ${M[2].c}. A report that stops at the totals would call that growth. A better one shows what changed underneath. That difference is the heart of <strong>local SEO reporting</strong>: choosing the numbers that explain what happened and what to do next, not the numbers that merely look big.</p>

<p>This guide gives a six-block report structure for local businesses and agencies, shows what each block should answer and uses a real month-by-month view from our own data as the worked example. Related reading: our <a href="/blog/seo-audit-report-template">SEO audit report template</a> covers one-off audits, and this is the recurring version.</p>

<h2>What a Local SEO Report Is For</h2>
<p>A local SEO report has three jobs: show whether more of the right people found and contacted the business, explain why, and say what happens next. If a section does not support one of those three, it is clutter. A plumber or electrician wants calls and booked jobs. A multi-location brand wants to know which locations improved and which fell. The report should be built backwards from those questions.</p>

<h2>Block 1: Business Profile Performance</h2>
<p>Business Profile reports show how people interact with the listing, including calls, direction requests, website clicks and, where enabled, messages and bookings. They also show how people found the profile, from Search or Maps, and the search terms behind it. Report these as monthly counts with the change from the previous month and the same month a year earlier, because local demand is seasonal. For multi-location businesses, show each location in its own row. Our <a href="/blog/local-seo-for-multiple-locations">multi-location local SEO guide</a> covers how to structure that.</p>

<h2>Block 2: Local Rankings by Area</h2>
<p>A single ranking number for a local keyword is misleading, because what a searcher sees depends on where they stand. Track positions across a grid of points around the business and report the share of points where you appear in the top three, not one average. Our <a href="/tools/geo-grid-rank-planner">geo-grid rank planner</a> helps plan the grid. Pick keywords from real demand, as our <a href="/blog/local-keyword-research">local keyword research guide</a> explains.</p>

<h2>Block 3: Website Search Data</h2>
<p>Search Console shows clicks, impressions, click-through rate and average position for the website. This is where the headline numbers can mislead, so segment them. Here is our own data by month.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/local-seo-reporting-months.png" alt="Table of our Search Console data by month: July from the 20th 5 clicks and 1,182 impressions, August 19 clicks and 16,492 impressions, September 24 clicks and 49,945 impressions" width="1280" height="340" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Impressions grew about ${impX} times,</strong> from ${f(M[0].i)} in the first, partial month to ${f(M[2].i)} in September.</li>
<li><strong>Clicks grew about ${clkX} times,</strong> from ${M[0].c} to ${M[2].c}.</li>
<li><strong>CTR fell,</strong> from ${ctr(M[0].c, M[0].i)} to ${ctr(M[2].c, M[2].i)}, because most new impressions came from queries where we sit well beyond page one.</li>
</ul>
<p>A client reading only impressions would feel good. A client reading only CTR would panic. The report should explain that new impressions at low positions are early visibility, not lost clicks, and show the position distribution behind them.</p>

<h2>Segment by Device and by Page Group</h2>
<p>Local searches are often on phones, so device is the first split to show.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/local-seo-reporting-devices.png" alt="Table of our Search Console data by device: desktop 33 clicks and 51,495 impressions, mobile 15 clicks and 15,980 impressions, tablet 0 clicks and 144 impressions" width="1280" height="320" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>In our data, desktop produced most impressions, but mobile had the higher click-through rate, ${dev.Mobile.ctr} against ${dev.Desktop.ctr}, and a better average position, ${dev.Mobile.pos} against ${dev.Desktop.pos}. For a local business, a similar split tells you where to look first. Also split by page group, such as service pages, location pages and blog, so the report shows which kind of page earns the clicks.</p>

<h2>Block 4: Leads, Calls and Conversions</h2>
<p>Rankings are a means, so close the loop. Report calls from the profile and from tracked numbers on the site, form submissions, booked jobs and, if the business can supply it, revenue from those leads. Mark which leads came from search and which came from other channels. If the business cannot share lead data, say so on the page and give the best proxy you have. Do not invent attribution.</p>

<h2>Block 5: Reviews and Reputation</h2>
<p>Show the number of new reviews, the average rating for the month and the response rate. Add one or two representative review quotes, with permission, that mention a service or area. Flag any review that needs action, such as a negative review unanswered for several days.</p>

<h2>Block 6: What We Did and What Is Next</h2>
<p>List the work completed in the month, such as profile updates, new service pages, citations fixed and reviews requested, and tie each to a metric it should move. Then list the plan for next month in priority order, with an owner. A report with no plan is a statement of fact, and a plan with no report is a promise.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-local-seo-reporting.png" alt="Infographic: our Search Console data by month showing impressions growing faster than clicks, and the four-part structure of a local SEO report" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How Often to Report</h2>
<p>Send a short monthly report and review it in a call. Look at weekly data inside the team, but avoid sending it to the client, because local numbers swing from week to week. Compare against the previous month and the same month last year, and allow several months before judging the effect of a change.</p>

<h2>Common Reporting Mistakes</h2>
<ul>
<li><strong>Leading with impressions.</strong> They are the easiest number to grow and the weakest proof of results.</li>
<li><strong>One average ranking.</strong> It hides the areas where the business is invisible.</li>
<li><strong>No comparison.</strong> A number without last month or last year is trivia.</li>
<li><strong>No plan.</strong> The report should end with what happens next.</li>
<li><strong>Too many metrics.</strong> If nobody can act on a number, remove it.</li>
</ul>

<h2>Adapting the Report to the Business</h2>
<ul>
<li><strong>A single-location service business.</strong> Lead with calls and booked jobs, then rankings in the service area and the three or four pages that earn the most. Keep it to one page.</li>
<li><strong>A multi-location brand.</strong> Add one row per location for calls, directions and rankings, then a short list of the locations that rose and fell most. Roll the totals up only after the locations.</li>
<li><strong>An agency reporting to many clients.</strong> Use the same six blocks in the same order for every client, so the reader learns where to look, and change only the commentary.</li>
</ul>

<h2>Writing the Commentary</h2>
<p>Numbers do not speak for themselves, and most clients will not read a table unaided. For each block, write two or three sentences: what changed, why you think it changed and what you will do about it. A good commentary example from our data reads like this: "Impressions grew about ${impX} times between July and September, while clicks grew about ${clkX} times. Most new impressions came from queries where we rank beyond page two, which is why click-through rate fell. Next month we will improve titles and add links to the pages with the most impressions." That is three sentences, each linked to a decision.</p>

<h2>Set a Baseline and Goals Before You Report</h2>
<p>A report is only useful against something. Before the first report, record the starting values for calls, direction requests, website clicks, rankings and leads, and write down what you expect to improve and by roughly how much. Goals should relate to the business, such as more calls from the nearest suburb, not to a tool score. Revisit the goals each quarter and drop any that no longer matter.</p>

<h2>Access and Data Sources Checklist</h2>
<ul>
<li>Owner or manager access to the Business Profile, so performance data is available.</li>
<li>Search Console access for the website property.</li>
<li>An analytics tool with conversions set up for calls, forms and bookings.</li>
<li>A call-tracking number or call events on click-to-call links.</li>
<li>A rank tracker that reports across a grid of local points.</li>
<li>A way to receive lead outcomes from the business, such as a shared sheet.</li>
</ul>

<h2>What Not to Put in a Local SEO Report</h2>
<p>Leave out vanity numbers that nobody acts on: raw domain scores, total keyword counts, the number of citations built and similar activity counts with no outcome attached. Do not show sampled or estimated traffic from third-party tools as if it were measured. If a number cannot be tied to a decision, it does not belong on the page.</p>

<h2>A One-Page Report Layout</h2>
<p>The best monthly report fits on one page, with detail available behind it. A layout that works for most local businesses uses a top strip with three headline numbers, such as calls from search, direction requests and booked jobs, each with the change from last month. Below that sit the six blocks in order, each with a small table or chart and two or three sentences of commentary. The page ends with next month's plan in priority order. Keep the same layout every month, so the reader finds each number in the same place, and keep older reports so that year-on-year comparisons are easy.</p>

<h2>Questions Clients Ask and How to Answer Them</h2>
<ul>
<li><strong>"Why are we not number one?"</strong> Show rankings by area, and explain that results depend on where the searcher is. Report the share of points where the business appears in the top three, and say where you are strong and weak.</li>
<li><strong>"Why did calls drop this month?"</strong> Compare against the same month last year first, since local demand is seasonal. Then check profile views, hours and any change to the listing.</li>
<li><strong>"Are the leads from SEO?"</strong> Show what you can measure, such as tracked calls and form fills from organic and from the profile, and say what you cannot, such as untracked calls.</li>
<li><strong>"Where should the budget go?"</strong> Point to the block with the clearest gap, such as location pages with impressions but few clicks, and propose one change with an expected effect.</li>
</ul>

<h2>Turning the Report Into Action</h2>
<p>At the end of each report meeting, agree no more than three actions with owners and dates. At the start of the next one, review them first. This habit turns the report from a record into a loop, which is what clients are paying for. If an action had no effect, say so and drop it. If one worked, explain why and look for the same pattern elsewhere, for example on another location or another service page.</p>

<h2>How to Report a Bad Month</h2>
<p>Every local campaign has a bad month: a ranking drop after a competitor opens, a listing edit that was reviewed and held back, or a seasonal lull. Report it plainly. State what fell, give the most likely cause backed by data, such as a change in impressions for a specific query group or a drop in profile views, and say what you will do about it. Clients forgive a dip that is explained and acted on. They do not forgive a report that hides the dip in a total or leaves it out. A short note on what you checked and ruled out also shows that the work continues even when the numbers do not move.</p>

<h2>Limits of This Example</h2>
<ul>
<li>Our site is an agency site, not a local business, so there are no calls or direction requests to show.</li>
<li>The first month in our export is partial, so the growth multiples compare a short month with full ones.</li>
<li>Search Console figures can differ slightly from other tools, and sampled or anonymised queries are not included in all views.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Build the report backwards from the questions the business owner asks.</li>
<li>Use six blocks: profile, rankings, website, leads, reviews and plan.</li>
<li>Segment search data by device and page group, because totals hide change.</li>
<li>Always compare with the previous period and the same period last year.</li>
<li>End every report with next month's plan.</li>
</ul>
<p>Want a clear monthly report for your local business? <a href="/contact">Get in touch</a> and we will show you a sample.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What should a local SEO report include?</summary>
<p>Business Profile performance, local rankings by area, website search data, leads and conversions, reviews, and a list of work done with the plan for next month.</p>
</details>
<details>
<summary>What are the most important local SEO metrics?</summary>
<p>Calls, direction requests, website clicks from the profile, leads from search and the share of local grid points where you rank in the top three. Impressions are useful context, but not proof.</p>
</details>
<details>
<summary>How often should I send a local SEO report?</summary>
<p>Monthly is the usual cadence for clients, with weekly checks inside the team. Local numbers move too much week to week to be useful in a client report.</p>
</details>
<details>
<summary>Which tools are used for local SEO reporting?</summary>
<p>Business Profile performance data, Search Console, an analytics tool, a call-tracking number and a local rank tracker that checks positions across a grid.</p>
</details>
<details>
<summary>Why did my impressions rise while clicks stayed low?</summary>
<p>Often the new impressions come from queries where you rank far down the results. In our data, impressions grew about ${impX} times and clicks about ${clkX} times, so click-through rate fell.</p>
</details>
<details>
<summary>How do I report on multiple locations?</summary>
<p>Show one row per location for calls, directions and rankings, and add a short note on the best and weakest. A single combined number hides locations that need attention.</p>
</details>
<details>
<summary>Should a report show revenue?</summary>
<p>Yes, if the business can supply it. If it cannot, show leads and booked jobs, and be clear about what you could not measure.</p>
</details>
<details>
<summary>What is a geo-grid ranking report?</summary>
<p>A report of the positions a business holds for a keyword at several points in a grid around its location, which shows how visibility changes with distance.</p>
</details>
<details>
<summary>How long before a local SEO report shows results?</summary>
<p>Expect to compare several months. Early reports show leading indicators such as profile views and rankings, and leads follow.</p>
</details>
</div>
`;
const title = 'Local SEO Reporting: A Monthly Template With Real Data';
const excerpt = 'Local SEO reporting made simple: six report blocks, a real month-by-month Search Console example and what the totals hide.';
const post = { slug: SLUG, title, category: 'Local SEO', author: 'Umaira Liaquat', date: '2026-10-13', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
