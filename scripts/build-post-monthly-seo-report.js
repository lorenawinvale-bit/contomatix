// node scripts/build-post-monthly-seo-report.js [--write] — data: 7 readable ranking pages (Google US, 1 Nov 2026), Google's Search Console performance report help page read the same day, and our own numbers: Search Console export of 28 Oct 2026 (daily chart aggregated by month), Page indexing report (27 Oct), Links report (15 Oct and 29 Oct), CWV measurements (26 and 28 Oct) and our blog data. Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-monthly-seo-report-2026-11-01.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-day15-2026-11-01.json');
for (const s of ['Clicks : The number of times a user clicked your site from Google Search results.', 'Impressions: How many times your site appeared in Search results.', 'Average position: The average position of the topmost result from your site.', 'CTR (click-through rate): The click count divided by the impression count.']) if (!G.perf.text.includes(s)) throw new Error('Google text changed: ' + s);
// our own monthly numbers from the daily chart of the 28 Oct export
const rows = fs.readFileSync(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-28', 'Chart.csv'), 'utf8').trim().split(/\r?\n/).slice(1).map(l => l.split(','));
const M = {}; for (const [d, cl, im, , p] of rows) { const k = d.slice(0, 7); M[k] = M[k] || { c: 0, i: 0, pw: 0 }; M[k].c += +cl; M[k].i += +im; if (+im > 0) M[k].pw += (+p || 0) * (+im); }
const mo = k => ({ c: M[k].c, i: M[k].i, ctr: +(M[k].c / M[k].i * 100).toFixed(2), pos: +(M[k].pw / M[k].i).toFixed(1) });
const AUG = mo('2026-08'), SEP = mo('2026-09'), OCT = mo('2026-10');
const expM = { aug: [19, 16492, 0.12, 64.6], sep: [24, 52053, 0.05, 34.5], oct: [34, 59549, 0.06, 49.5] };
for (const [k, v] of Object.entries({ aug: AUG, sep: SEP, oct: OCT })) if ([v.c, v.i, v.ctr, v.pos].join() !== expM[k].join()) throw new Error('monthly data changed ' + k + ' ' + [v.c, v.i, v.ctr, v.pos]);
const OWN = { indexed: 452, notIndexed: 36, linksOct15: 13, linksOct29: 30, clsBefore: '0.425', clsAfter: '0.060', posts: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'blog.json'), 'utf8')).filter(p => /^2026-10/.test(p.date) && p.date <= '2026-10-29').length, tools: 41 };
if (OWN.posts !== 86 && OWN.posts !== 84) throw new Error('post count changed ' + OWN.posts);
const D = { listed: 9, ok: ok.length, median: Math.round(w[3]), traffic: c('traffic'), rankings: c('rankings'), backlinks: c('backlinks'), conversions: c('conversions'), technical: c('technical'), insights: c('insights'), summary: c('summary'), kpi: c('kpi'), template: c('template'), pdf: c('pdf'), tool: c('tool'), gsc: c('gsc'), ga: c('ga'), competitors: c('competitors'), local: c('local'), content: c('content'), sells: c('sells'), example: c('example'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 9, ok: 7, median: 1786, traffic: 7, rankings: 7, backlinks: 5, conversions: 7, technical: 5, insights: 5, summary: 5, kpi: 3, template: 4, pdf: 2, tool: 5, gsc: 5, ga: 6, competitors: 3, local: 2, content: 2, sells: 3, example: 4, gdoc: 0, dated: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify({ AUG, SEP, OCT, OWN }));
const f = n => n.toLocaleString('en-US');
build({
  slug: 'monthly-seo-report', category: 'SEO Reporting', author: 'Muhammad Reyan Nizami', date: '2026-11-01',
  title: 'Monthly SEO Report: 7 Sections With Our Own Real Numbers',
  excerpt: `A monthly SEO report in seven sections, with our own August to October numbers: ${f(OCT.i)} impressions, ${OCT.c} clicks, ${f(OWN.indexed)} pages indexed. Format and template.`,
  donut: [['MONTHLY', 'SEO REPORT'], [['Search', 'Performance'], 'Indexing', ['Links and', 'Authority'], 'Technical', ['Actions for', 'Next Month']]],
  cover: { badge: 'OUR OWN REPORT', search: 'monthly seo report', card: 'Our October numbers', lines: [`Impressions: ${f(OCT.i)}`, `Clicks: ${OCT.c}`, `Pages indexed: ${OWN.indexed}`, `External links: ${OWN.linksOct29}`], last: 'Search Console, 28 Oct 2026', big: f(OCT.i), k1: 'impressions in October so far', k2: `but only ${OCT.c} clicks`, title: 'Monthly SEO Report', sub: 'Seven sections, real numbers' },
  info: { title: `Monthly SEO Reports: ${D.ok} Guides Read`, sub: 'Organic results for "monthly seo report", Google US, 1 November 2026', leftTitle: 'What the guides include', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Traffic', sub: 'covered', n: D.traffic }, { label: 'Rankings', sub: 'covered', n: D.rankings }, { label: 'Conversions or leads', sub: 'covered', n: D.conversions }, { label: 'Backlinks', sub: 'covered', n: D.backlinks }, { label: 'Quote Google', sub: 'on the page', n: D.gdoc }],
    rightTitle: 'Our own month', rightTag: 'August to October 2026', items: [{ t: 'Impressions', s: `${f(AUG.i)} to ${f(OCT.i)}` }, { t: 'Clicks', s: `${AUG.c} to ${OCT.c}` }, { t: 'Click rate', s: `${AUG.ctr}% to ${OCT.ctr}%` }],
    big: f(OCT.i), noteHtml: `impressions in October, but <em>only ${OCT.c} clicks</em>: the number a report must explain.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for monthly SEO report include`, sub: `Organic results read on 1 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Traffic', `${D.traffic} of ${D.ok}`], ['Rankings', `${D.rankings} of ${D.ok}`], ['Conversions or leads', `${D.conversions} of ${D.ok}`], ['Google Analytics', `${D.ga} of ${D.ok}`], ['Backlinks', `${D.backlinks} of ${D.ok}`], ['Technical health', `${D.technical} of ${D.ok}`], ['Insights or next steps', `${D.insights} of ${D.ok}`], ['A summary', `${D.summary} of ${D.ok}`], ['Search Console', `${D.gsc} of ${D.ok}`], ['A dashboard or tool', `${D.tool} of ${D.ok}`], ['A template', `${D.template} of ${D.ok}`], ['An example or sample', `${D.example} of ${D.ok}`], ['Competitors', `${D.competitors} of ${D.ok}`], ['Quote Google', `${D.gdoc} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`]] },
    ours: { title: 'Our own search numbers by month', sub: 'Daily chart of the 28 October 2026 Search Console export, added up by month. October runs to the 27th.', head: ['Month', 'Impressions', 'Clicks', 'Click rate', 'Avg position'], lastBold: false,
      rows: [['August', f(AUG.i), String(AUG.c), AUG.ctr + '%', String(AUG.pos)], ['September', f(SEP.i), String(SEP.c), SEP.ctr + '%', String(SEP.pos)], ['October (to the 27th)', f(OCT.i), String(OCT.c), OCT.ctr + '%', String(OCT.pos)]] },
    sections: { title: 'The seven sections', sub: 'Our report format.', head: ['Section', 'Question it answers'], lastBold: false,
      rows: [['1 Summary', 'What changed, in three lines'], ['2 Search performance', 'Are more people finding and clicking us?'], ['3 Indexing', 'Can Google see our pages?'], ['4 Links', 'Who now links to us?'], ['5 Technical', 'Is the site fast and stable?'], ['6 Content', 'What did we publish and does it work?'], ['7 Next actions', 'What will we do next month?']] }
  },
  content: h => `${h.updated}

<p>A <strong>monthly SEO report</strong> is a short document that shows what changed in a site's search performance over the last month, why it changed and what to do next. We read ${D.ok} pages that rank for it on 1 November 2026. All ${D.ok} cover traffic, rankings and conversions or leads, ${D.backlinks} cover backlinks and ${D.insights} include insights or next steps. Only ${D.template} of ${D.ok} give a template and ${D.example} an example, and none quotes Google about what the numbers mean.</p>

<p>This guide gives a seven-section format, shows our own report for August to October 2026 with real numbers, and explains what a report must do to be useful: turn numbers into a decision. If you want to build one automatically, use our free <a href="/tools/seo-report-generator">SEO report generator</a>. For reports focused on one area, see our guides to the <a href="/blog/seo-audit-report-template">SEO audit report template</a>, the <a href="/blog/backlinks-report">backlinks report</a> and <a href="/blog/local-seo-reporting">local SEO reporting</a>.</p>

<h2>What Goes in a Monthly SEO Report? (What ${D.ok} Guides Say)</h2>
${h.fig('serp', 'Table of what 7 pages on monthly SEO reports include: traffic, rankings and conversions in all 7, Google Analytics in 6, backlinks, technical health, insights, summaries and dashboards in 5 and none quoting Google')}
<p>The median guide has about ${f(D.median)} words. ${D.ga} of ${D.ok} mention Google Analytics and ${D.gsc} mention Search Console, ${D.tool} mention a dashboard or reporting tool and ${D.competitors} mention competitors. Only ${D.pdf} mention a PDF. Reading across them, the gap is not the list of metrics, which is nearly the same everywhere. It is the step after the numbers: ${D.insights} of ${D.ok} include insights or next steps, and the ones that do treat it as one section at the end. In our format it is the reason the report exists.</p>

<h2>Monthly SEO Report Format: The Seven Sections</h2>
${h.fig('sections', 'Timeline of the seven sections of our monthly SEO report format: summary, search performance, indexing, links, technical, content and next actions, each with the question it answers')}
<ol>
<li><strong>Summary.</strong> Three lines: what changed, the biggest cause and the main action. Write it last, put it first.</li>
<li><strong>Search performance.</strong> Clicks, impressions, click rate and average position from Search Console, this month against last month.</li>
<li><strong>Indexing.</strong> How many pages are indexed and how many are not, and why.</li>
<li><strong>Links.</strong> New linking sites and where they point.</li>
<li><strong>Technical.</strong> Speed, layout stability and anything that broke.</li>
<li><strong>Content.</strong> What you published or updated, and how it performed.</li>
<li><strong>Next actions.</strong> Three to five tasks for next month, each tied to a number above.</li>
</ol>
<p>A client report adds goals and conversions from analytics. An internal report can be shorter. Keep to one or two pages: a report nobody finishes reading changes nothing.</p>

<h2>Where the Numbers Come From: What Google's Definitions Say</h2>
<p>Most of section two comes from the Performance report in Search Console, so know what its terms mean. Google's <a href="https://support.google.com/webmasters/answer/7576553" target="_blank" rel="nofollow noopener">Performance report help page</a> defines <strong>clicks</strong> as the number of times a user clicked your site from Google Search results, <strong>impressions</strong> as how many times your site appeared in Search results, <strong>CTR</strong> as the click count divided by the impression count and <strong>average position</strong> as the average position of the topmost result from your site. That last definition matters: if two of your pages appear on one results page, only the higher one counts, and a page that appears at position 90 for many rare searches pulls the average down without telling you anything about your best pages. Read position as a trend, not a score.</p>

<h2>Monthly SEO Report Example: Our Own August to October</h2>
${h.fig('ours', 'Chart of our own Search Console numbers by month: impressions rose from 16,492 in August to 52,053 in September and 59,549 in October to the 27th, while clicks rose from 19 to 24 and 34')}
<p>This is section two of our own report, built from the daily chart of the Search Console export of 28 October 2026, added up by month. October runs to the 27th.</p>
<ul>
<li><strong>Impressions:</strong> ${f(AUG.i)} in August, ${f(SEP.i)} in September and ${f(OCT.i)} in October.</li>
<li><strong>Clicks:</strong> ${AUG.c}, ${SEP.c} and ${OCT.c}.</li>
<li><strong>Click rate:</strong> ${AUG.ctr}%, ${SEP.ctr}% and ${OCT.ctr}%.</li>
<li><strong>Average position</strong> (our weighted calculation from the daily chart, which can differ from Search Console's own figure): ${AUG.pos}, ${SEP.pos} and ${OCT.pos}.</li>
</ul>
<p>The other sections, on 27 to 29 October 2026: <strong>indexing</strong>, ${OWN.indexed} pages indexed and ${OWN.notIndexed} not, each with a reason in the Page indexing report. <strong>Links</strong>, ${OWN.linksOct15} external links on 15 October and ${OWN.linksOct29} on 29 October. <strong>Technical</strong>, the worst layout shift on a blog post fell from ${OWN.clsBefore} to ${OWN.clsAfter} after we fixed one wrong image size, which we describe in our <a href="/blog/improve-core-web-vitals">Core Web Vitals guide</a>. <strong>Content</strong>, ${OWN.posts} posts dated October 2026 and ${OWN.tools} free tools on the site.</p>

${h.info('Infographic of what 7 monthly SEO report guides include: traffic 7, rankings 7, conversions 7, backlinks 5, insights 5 and none quoting Google, plus our own August to October numbers: impressions 16,492 to 59,549 and clicks 19 to 34')}

<h2>What the Numbers Hid: Reading the Report</h2>
<p>A summary of those figures would say "impressions are up 261%". That is true and nearly useless. Impressions went from ${f(AUG.i)} to ${f(OCT.i)}, a rise of about 3.6 times, while clicks went from ${AUG.c} to ${OCT.c}, a rise of about 1.8 times, and the click rate fell from ${AUG.ctr}% to ${OCT.ctr}%. Our pages were being shown far more often, mostly at positions far down the results where almost no one clicks. The decision that followed was not "publish more", it was "build links and fix the pages already close to page one", which is why we changed our plan in late October. A report that only said impressions rose would have led to the opposite decision.</p>
<p>This is the test of any monthly report: after reading it, can someone say what to do differently next month?</p>

<h2>Monthly SEO Report Template: The Fields to Copy</h2>
<table><thead><tr><th>Field</th><th>This month</th><th>Last month</th><th>Change</th><th>What it means</th></tr></thead><tbody>
<tr><td>Clicks</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Impressions</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Click rate</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Pages on page one</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Pages indexed</td><td></td><td></td><td></td><td></td></tr>
<tr><td>External links</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Worst layout shift</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Pages published</td><td></td><td></td><td></td><td></td></tr>
</tbody></table>
<p>The last column is the one most templates leave out. Fill it in with one short sentence per row. ${D.template} of ${D.ok} guides offer a template and ${D.pdf} offer a PDF; a simple table like this one does the job in a spreadsheet.</p>

<h2>SEO Monthly Report Generator, Dashboards and Tools</h2>
<p>${D.tool} of ${D.ok} guides mention a dashboard or reporting tool. Tools save time on collecting numbers, and they cannot write the "what it means" column for you. Connect Search Console and analytics to a dashboard if you report to many clients, or use our free <a href="/tools/seo-report-generator">SEO report generator</a> to turn your numbers into a formatted report in the browser. Whatever you use, check the first report by hand against Search Console so you know the figures match.</p>

<h2>Client Report or Internal Report?</h2>
<ul>
<li><strong>Client report:</strong> start with the summary, use plain language, show business results (leads, sales) next to search numbers and end with next actions. ${D.conversions} of ${D.ok} guides cover conversions or leads.</li>
<li><strong>Internal report:</strong> keep it short and technical, list every issue found and who owns the fix.</li>
<li><strong>Agency report:</strong> add the work done last month, so clients see effort and results together.</li>
</ul>

<h2>Common Monthly SEO Report Mistakes</h2>
<ul>
<li><strong>Reporting only the good numbers.</strong> A flat or falling number with an explanation builds more trust than a hidden one.</li>
<li><strong>Using rankings as the headline.</strong> Position is an average and moves with how many rare searches you appear for.</li>
<li><strong>Comparing partial months.</strong> Compare like with like, such as the same number of days.</li>
<li><strong>No next actions.</strong> A report without actions is a log, not a report.</li>
<li><strong>Too many pages.</strong> If it takes more than ten minutes to read, shorten it.</li>
</ul>

<h2>How to Write the Summary and Next Actions</h2>
<p>The summary is three sentences: what changed, the likely reason and the one decision. Here is the summary for our own numbers, written the way we would send it: "Impressions rose from ${f(AUG.i)} in August to ${f(OCT.i)} in October, but clicks rose only from ${AUG.c} to ${OCT.c}. Most impressions sit far down the results, so more posts will not help. Next month we focus on links to our best pages and on pages already near page one." Then list three to five actions, each starting with a verb and naming the page or number it touches, such as "Add internal links to the five pages at position 8 to 20" or "Fix the one layout shift above 0.1". If an action cannot be tied to a number in the report, it probably does not belong there.</p>

<h2>How We Built This Report in Search Console</h2>
<ol>
<li>Open the Performance report for the Search results and set the date range to the last 3 months.</li>
<li>Click Export and download the CSV. The file includes a daily chart, pages and queries.</li>
<li>Add the daily chart up by month in a spreadsheet: clicks and impressions are sums, and the click rate is clicks divided by impressions.</li>
<li>Open the Page indexing report for the indexed and not-indexed counts, and the Links report for the external link total.</li>
<li>Paste each number into the template next to last month's, and write the "what it means" sentence.</li>
</ol>
<p>The whole job takes about thirty minutes once the sheet exists. Our guide to <a href="/blog/search-console-impressions-explained">Search Console impressions</a> explains why a number such as impressions can rise without more visitors, and our guide to <a href="/blog/set-up-google-search-console">setting up Search Console</a> covers getting the data in the first place.</p>

<h2>Month on Month or Year on Year?</h2>
<p>Compare with last month to see what your actions did, and with the same month last year to separate your work from the season. A site with less than a year of data cannot do the second, so say so in the report instead of guessing. Whichever you use, compare the same number of days: our October figures run to the 27th, so we compare them to rates and ratios, not to a full month's total.</p>

<h2>Metrics to Leave Out of the Report</h2>
<ul>
<li><strong>Total keywords tracked.</strong> It rises when you track more, whether or not you gained anything.</li>
<li><strong>Third-party authority scores.</strong> They are estimates from tools, not numbers Google gives you.</li>
<li><strong>Impressions on their own.</strong> As our own months show, they can climb while clicks barely move.</li>
<li><strong>Every query.</strong> Show the ten that matter and link to the rest.</li>
</ul>

<h2>Weekly Checks Between Reports</h2>
<p>A monthly report is for decisions, not for watching. Between reports, look at Search Console once a week for new errors, a sudden fall in clicks or a drop in indexed pages. If something looks wrong, fix it then; do not wait for the report. Keep a simple log of what you changed and on which date, so next month's report can connect each change to a result instead of guessing.</p>

<h2>What to Do When the Numbers Fall</h2>
<p>A drop is not a failure of the report, it is the reason for it. Check three things in order. First, whether the drop is real: compare the same number of days and look at the daily chart for one bad day. Second, whether it is limited to one page or one group of searches, which points to a change on those pages. Third, whether something broke, such as pages dropping out of the index or a redirect rule. Write what you found, even if the answer is "we do not know yet", and say when you will look again.</p>

<h2>Monthly SEO Report Format for a Local Business</h2>
<p>A local business can keep the same seven sections and swap in local numbers: calls, direction requests and reviews from the Google Business Profile in place of some link metrics. Our guide to <a href="/blog/local-seo-reporting">local SEO reporting</a> covers those blocks in detail, so use this page for the general structure and that one for the local extras.</p>

<h2>A Checklist Before You Send the Report</h2>
<ul>
<li>Every number comes from the same date range as last month's, or the difference is stated.</li>
<li>The summary is three sentences and says what to do.</li>
<li>Each next action names a page or a number.</li>
<li>Anything that fell has a sentence of explanation.</li>
<li>The report is short enough to read in ten minutes.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A monthly SEO report shows what changed, why and what to do next, in seven short sections.</li>
<li>All ${D.ok} ranking guides cover traffic, rankings and conversions, but only ${D.insights} include next steps and none quotes Google.</li>
<li>Our own impressions rose about 3.6 times from August to October while clicks rose about 1.8 times, so the report pointed to links and pages near page one, not more posts.</li>
<li>Read average position as a trend, because Google counts only the topmost result per search.</li>
<li>Always fill in the "what it means" column.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a monthly SEO report?', 'A short document that shows what changed in a site\'s search performance over the month, why, and what to do next.'],
    ['What should a monthly SEO report include?', 'A summary, search performance, indexing, links, technical health, content and next actions.'],
    ['How long should a monthly SEO report be?', 'One or two pages. If it takes more than about ten minutes to read, shorten it.'],
    ['Where do I get the numbers?', 'Mostly from Search Console, plus analytics for conversions and a links report for backlinks.'],
    ['What does average position mean in Search Console?', 'Google defines it as the average position of the topmost result from your site, so it is a trend measure, not a rank for one page.'],
    ['Do I need a monthly SEO report template or PDF?', 'No. A simple table in a spreadsheet works. Add a column that explains what each number means.'],
    ['Can I generate a monthly SEO report automatically?', 'You can collect the numbers automatically with a dashboard or our report generator, but someone should still write the explanation.'],
    ['How is a client report different from an internal one?', 'A client report is shorter and starts with the summary and business results. An internal report lists every issue and its owner.'],
    ['Why did your impressions rise but clicks barely move?', 'Our pages were shown more often, mostly at positions far down the results, where few people click. We responded by working on links and on pages near page one.']
  ])}
`
});
