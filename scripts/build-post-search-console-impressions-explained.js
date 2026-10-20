// Builds the "search console impressions explained" post + assets. node scripts/build-post-search-console-impressions-explained.js [--write]
// Data: Search Console Performance report for contomatix.com (chart totals and top-1,000 query table, 90 days to 17 Oct 2026, read 20 Oct 2026; daily chart export to 29 Sep 2026); Google Search Console Help pages on performance data and "About performance report data" read 20 Oct 2026; 4 readable organic results for "search console impressions explained" (Google US, 20 Oct 2026). Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'search-console-impressions-explained';
const R = require('../../keyword-research/serp-search-console-impressions-2026-10-20.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], definition: c(o => o.definition), scroll: c(o => o.scroll), discrepancy: c(o => o.discrepancy), analytics: c(o => o.analytics), bot: c(o => o.bot), googleDoc: c(o => o.googleDoc), position: c(o => o.position), ctr: c(o => o.ctr), limits: c(o => o.limits), anonymized: c(o => o.anonymized), searchConsole: c(o => o.searchConsole) };
const exp = { ok: 4, median: 1541, definition: 4, scroll: 3, discrepancy: 4, analytics: 2, bot: 2, googleDoc: 2, position: 3, ctr: 3, limits: 1, anonymized: 0, searchConsole: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// our numbers
const chart = { clicks: 77, imp: 106000, ctr: 0.1, pos: 43 };           // 90-day chart totals to 17 Oct 2026 (impressions shown rounded as 106K)
const table = { rows: 1000, imp: 69197, clicks: 5 };                     // top-1,000 query table, same range
const impShare = Math.round(table.imp / chart.imp * 100), clickShare = Math.round(table.clicks / chart.clicks * 1000) / 10;
const bands = [['Position 1 to 10', 41, 3858, 2], ['Position 10 to 20', 155, 11684, 2], ['Position 20 to 50', 352, 28082, 1], ['Position 50 or worse', 452, 25573, 0]];
const bandImp = bands.reduce((a, b) => a + b[2], 0); if (bandImp !== table.imp) throw new Error('bands ' + bandImp);
const far = Math.round((bands[2][2] + bands[3][2]) / table.imp * 100);
const per = [['20 Jul to 16 Aug', 14, 5578], ['17 Aug to 13 Sep', 21, 34739], ['14 to 29 Sep (16 days)', 13, 27302]];
console.log(JSON.stringify(D), 'imp share', impShare, 'click share', clickShare, 'far', far);
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['SEARCH CONSOLE', 'IMPRESSIONS'], [['Know What', 'Counts'], 'Read Position Right', ['Compare Chart', 'and Table'], 'Group by Position', ['Act on Page', 'Two Queries']]);
L.cover(SLUG, { badge: 'REAL SEARCH DATA', search: 'search console impressions', card: 'Our site, 90 days to 17 Oct 2026',
  lines: ['Impressions: about 106,000', `Clicks: ${chart.clicks}`, `CTR: ${chart.ctr}%`, `Average position: ${chart.pos}`, `Table shows ${impShare}% of impressions`],
  last: 'Impressions are not visits', big: `${chart.clicks} clicks`, k1: 'from 106,000 impressions', k2: 'at average position 43', title: 'Search Console Impressions', sub: 'What they count, and what they do not' });
fs.writeFileSync(path.join(__dirname, 'infographic-search-console-impressions-explained.html'), L.infographicHtml({
  title: 'Where Our Impressions Sit', sub: 'Top 1,000 queries, Search Console, contomatix.com, 90 days to 17 October 2026',
  leftTitle: 'Impressions by average position', leftTag: `Thousands of the ${f(table.imp)} impressions in the table`, max: 30,
  bars: bands.map(b => ({ label: b[0].replace('Position ', 'Pos. '), sub: `${b[1]} queries, ${b[3]} click${b[3] === 1 ? '' : 's'}`, n: Math.round(b[2] / 100) / 10 })),
  rightTitle: 'Read impressions like this', rightTag: 'Four habits', items: [
    { t: 'Check position first', s: 'page 5 rarely gets clicks' }, { t: 'Compare chart and table', s: 'the table hides rare queries' },
    { t: 'Work positions 10 to 20', s: 'closest to page one' }, { t: 'Track clicks and CTR', s: 'not impressions alone' }],
  big: `${far}%`, noteHtml: `of our table impressions come from queries <em>averaging position 20 or worse</em>.` }));
fs.writeFileSync(path.join(__dirname, 'table-search-console-impressions-explained-ours.html'), L.tableHtml({ title: 'Chart totals versus the query table, same 90 days', sub: 'Search Console Performance report for contomatix.com, 90 days to 17 October 2026, read on 20 October 2026. The chart shows impressions rounded.',
  head: ['Measure', 'Chart total', 'Top 1,000 rows', 'Table share'], lastBold: false,
  rows: [['Impressions', 'about 106,000', f(table.imp), `about ${impShare}%`], ['Clicks', String(chart.clicks), String(table.clicks), `about ${clickShare}%`], ['Average CTR', `${chart.ctr}%`, `${(table.clicks / table.imp * 100).toFixed(3)}%`, 'not comparable'], ['Average position', String(chart.pos), '43 (weighted by impressions)', 'matches']] }));
fs.writeFileSync(path.join(__dirname, 'table-search-console-impressions-explained-bands.html'), L.tableHtml({ title: 'Impressions and clicks by average position', sub: 'The 1,000 queries in the table, grouped by each query\'s average position. Search Console, 90 days to 17 October 2026.',
  head: ['Position band', 'Queries', 'Impressions', 'Clicks'], lastBold: true,
  rows: [...bands.map(b => [b[0], String(b[1]), f(b[2]), String(b[3])]), ['All 1,000 queries', '1,000', f(table.imp), String(table.clicks)]] }));
fs.writeFileSync(path.join(__dirname, 'table-search-console-impressions-explained-serp.html'), L.tableHtml({ title: `What ${D.ok} guides ranking for search console impressions say`, sub: `Organic results read on 20 October 2026 (6 listed; ${D.ok} gave a readable guide, one blocked our request and one returned an error). Sites are not named.`,
  head: ['Mentioned on the page', 'Guides'], lastBold: false,
  rows: [['A definition of an impression', `${D.definition} of ${D.ok}`], ['Search Console by name', `${D.searchConsole} of ${D.ok}`], ['Differences from other data', `${D.discrepancy} of ${D.ok}`], ['Scrolling or visibility', `${D.scroll} of ${D.ok}`], ['Average position', `${D.position} of ${D.ok}`], ['CTR', `${D.ctr} of ${D.ok}`], ['Google Analytics', `${D.analytics} of ${D.ok}`], ['Bots or rank trackers', `${D.bot} of ${D.ok}`], ['Quoting or citing Google', `${D.googleDoc} of ${D.ok}`], ['Data limits such as the 1,000-row table', `${D.limits} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'quote-search-console-impressions-explained-doc.html'), quote({ source: 'Google Search Console Help · Performance report and About performance report data', title: 'What counts as an impression',
  paras: ['In general, an impression is counted whenever an item appears in the current page of results, whether or not the item is scrolled into view, as long as the user need not click to see more results.',
    'The position value shown is the topmost position occupied by a link to your property or page in search results, averaged across all queries in which your property appeared. Chart totals can be higher than the sum of table rows: tables show a maximum of 1,000 rows and omit rare queries to protect user privacy.'] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [880, 300]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const q = sz(path.join(pr, 'search-console-impressions-explained-doc.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>A <strong>Search Console impression</strong> is counted whenever a link to your site appears in the current page of Google results, whether or not the person scrolled to it. Over the last 90 days our own property recorded about 106,000 impressions and ${chart.clicks} clicks, a click-through rate of ${chart.ctr}% at an average position of ${chart.pos}. That gap is the reason people ask what impressions actually mean. This guide explains the definition from Google's documentation and shows what our own numbers reveal, including why the table of queries shows only ${impShare}% of the impressions in the chart.</p>

<p>Below you will find Google's definition, what ${D.ok} ranking guides say, how average position works, what our own impressions and clicks look like by position, why the chart and the table disagree and what to do with the data. It is a companion to our guide to <a href="/blog/long-tail-low-competition-keywords">long tail low competition keywords</a>.</p>

<h2>What Google Says an Impression Is</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/search-console-impressions-explained-doc.png" alt="Google Search Console Help excerpt: an impression is counted whenever an item appears in the current page of results whether or not it is scrolled into view, position is the topmost position averaged across queries, and chart totals can be higher than the sum of table rows because tables show at most 1,000 rows and omit rare queries" width="${q[0]}" height="${q[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>According to Google's help pages, in general an impression is counted whenever an item appears in the current page of results, whether or not it is scrolled into view, as long as the user does not need to click to see more results. Inside widgets that scroll or expand independently, such as a carousel or an expanding section, the item must typically be scrolled or expanded into view. Google also says the performance reports include appearances in AI Mode, where standard impression rules apply. This is the definition people search for as the Google Search Console impressions definition, and the key point is that an impression means your link was <em>eligible to be seen</em> on a results page, not that a person read it.</p>

<h2>What the Ranking Guides Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/search-console-impressions-explained-serp.png" alt="Table of what 4 guides ranking for search console impressions mention: a definition 4, Search Console 4, differences from other data 4, scrolling 3, average position 3, CTR 3, Google Analytics 2, bots 2, citing Google 2, data limits 1" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>All ${D.ok} define it.</strong> Every guide gives a definition and mentions that impressions differ from other data sources.</li>
<li><strong>Scrolling comes up.</strong> ${D.scroll} of ${D.ok} discuss whether a result must be seen, which is where Google's wording on scrolled and expanded results matters.</li>
<li><strong>Google is rarely quoted.</strong> Only ${D.googleDoc} of ${D.ok} cite Google's own documentation.</li>
<li><strong>Data limits are barely covered.</strong> Only ${D.limits} of ${D.ok} mention the limits on what the reports show, which is why many readers are surprised when the numbers do not add up.</li>
<li><strong>Few show real numbers.</strong> None show a real site's impressions alongside its clicks, which is what we do next.</li>
</ul>

<h2>Our Own Numbers: 106,000 Impressions and ${chart.clicks} Clicks</h2>
<p>Our site is young, with mostly new pages, so its profile is a useful picture of what a new site's impressions look like. In the 90 days to 17 October 2026, the Performance chart shows about 106,000 impressions, ${chart.clicks} clicks, an average CTR of ${chart.ctr}% and an average position of ${chart.pos}.</p>
<ul>
<li><strong>Impressions grew fast.</strong> In an earlier export covering 20 July to 29 September, the first four weeks had ${f(per[0][2])} impressions and ${per[0][1]} clicks. The next four weeks had ${f(per[1][2])} impressions and ${per[1][1]} clicks. The following 16 days had ${f(per[2][2])} and ${per[2][1]}. Impressions rose about six times while clicks barely rose, because new pages appeared in results far back.</li>
<li><strong>Position explains it.</strong> An average position of ${chart.pos} sits around page five. Results there are counted as impressions but rarely clicked.</li>
<li><strong>CTR is simple arithmetic.</strong> Clicks divided by impressions is ${chart.clicks} ÷ 106,000, about ${chart.ctr}%.</li>
</ul>

<h2>Why the Chart and the Table Disagree</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/search-console-impressions-explained-ours.png" alt="Table comparing Search Console chart totals with the top 1,000 query table for the same 90 days: about 106,000 impressions in the chart against 69,197 in the table, and 77 clicks in the chart against 5 in the table" width="1280" height="@@OURSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>When we added up the 1,000 rows in the query table, they came to ${f(table.imp)} impressions and ${table.clicks} clicks. The chart said about 106,000 and ${chart.clicks}. The table covers about ${impShare}% of the impressions but only about ${clickShare}% of the clicks. This is not an error. Google explains that chart totals can be higher than the sum of table rows because tables show a maximum of 1,000 rows and omit rare queries to protect privacy. For a site like ours, whose traffic is spread over thousands of rare queries, most clicks come from queries the table hides. If you build a report from the table alone, you will undercount clicks. Always report the chart totals for totals, and use the table for patterns.</p>

<h2>How Average Position Really Works</h2>
<p>Google's help page describes the position shown in the Performance report as the topmost position occupied by a link to your property in the results, averaged across queries. If your site appears at positions 2, 4 and 6 for one query, that query counts as position 2. If it appears at 3, 5 and 9 for another, that counts as 3, and the average across the two is 2.5. Three practical consequences follow. A new batch of low-ranking queries can drag your average down even when your best pages improve. An average of 43 tells you little by itself because it mixes page-one and page-ten queries. And position is only shown for Google Search results, so it is best read by query or by page, not site-wide.</p>

<h2>Impressions and Clicks by Position</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/search-console-impressions-explained-bands.png" alt="Table of the 1,000 queries grouped by average position: 41 queries at position 1 to 10 with 3,858 impressions and 2 clicks, 155 at 10 to 20 with 11,684 and 2, 352 at 20 to 50 with 28,082 and 1, and 452 at 50 or worse with 25,573 and 0, totalling 69,197 impressions and 5 clicks" width="1280" height="@@BANDSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Most impressions are far back.</strong> ${far}% of the table's impressions come from queries whose average position is 20 or worse, and ${bands[3][3]} clicks came from those at position 50 or worse.</li>
<li><strong>Page one is small.</strong> Only ${bands[0][1]} queries average in the top ten, with ${f(bands[0][2])} impressions.</li>
<li><strong>The opportunity is in the middle.</strong> ${bands[1][1]} queries average between positions 10 and 20, with ${f(bands[1][2])} impressions. Moving some of these onto page one is the most realistic gain.</li>
</ul>

<h2>Impressions Versus Clicks, Sessions and Rankings</h2>
<p>Impressions, clicks and sessions measure different moments. An impression is a result shown. A click is a visit started from Google, counted by Search Console. A session is a visit measured by your analytics tool after the page loads. They will not match exactly, because of differences in how each is counted, such as visitors who leave before the page loads or who block analytics scripts. ${D.discrepancy} of ${D.ok} guides make the same point. Treat Search Console as the source for how you appear in Google and your analytics tool as the source for what visitors do on the site. Impressions are also not rankings: a high-impression query can be one you rank poorly for.</p>

<h2>A Worked Example: Reading One Query</h2>
<p>Take a real query from our own table: "moses lake search engine optimisation". It shows 294 impressions, 1 click and an average position of 6.6, which is one of the few queries on our property that has a click. Read it in order. The position is on page one, so the impressions are genuine exposure. One click from 294 impressions is a CTR of about 0.3%, which is low for a position in the top ten, and that points at the title and snippet, not the ranking. Compare that with a query such as "fort collins seo", which shows 429 impressions at an average position of 72. Its impressions are a result of appearing far back, and no title change would turn them into clicks. The same number of impressions can call for completely different actions, which is why position and CTR belong next to every impression count.</p>

<h2>What a Healthy Pattern Looks Like for a New Site</h2>
<p>New sites typically see impressions grow first, as Google discovers and tests pages, then positions improve slowly, then clicks follow. A healthy pattern has impressions rising month over month, the share of queries on page two and page one slowly growing and clicks starting to appear on queries with stable positions. An unhealthy pattern is impressions flat or falling while position worsens, which can point to pages being dropped from the index, or to new competing pages. Use a monthly snapshot of the numbers in this guide, rather than daily swings, to tell the difference. Daily charts can be noisy, and recent days are often incomplete while Google finishes processing.</p>

<h2>A Monthly Impressions Checklist</h2>
<ul>
<li>Record the chart totals: clicks, impressions, CTR and average position for the month and the one before.</li>
<li>Count the queries in each position band: page one, 10 to 20, 20 to 50, 50 or worse.</li>
<li>List the five queries between 10 and 20 with the most impressions, and the page that ranks for each.</li>
<li>Note any page-one query with a CTR well below the rest, and rewrite its title.</li>
<li>Write down what you changed, so the next month's numbers can be read against it.</li>
</ul>

<h2>What to Do With Impressions Data</h2>
<ol>
<li><strong>Sort by position, not just impressions.</strong> Add the position column and look at queries between 10 and 20 first.</li>
<li><strong>Improve the page that ranks.</strong> Check the title, the headings and the answer against the query, and add internal links from related pages.</li>
<li><strong>Watch CTR on page-one queries.</strong> A low CTR at a good position points to a weak title or snippet.</li>
<li><strong>Ignore noise at position 50 or worse.</strong> Those impressions are real, but they rarely turn into visits until the page moves.</li>
<li><strong>Report the chart totals.</strong> Use our <a href="/tools/seo-report-generator">SEO report generator</a> to turn clicks, impressions, CTR and position into a monthly summary.</li>
</ol>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-search-console-impressions-explained.png" alt="Infographic of Contomatix's impressions by average position band and four habits for reading Search Console impressions" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Impressions for Different Kinds of Results</h2>
<p>Not every impression is a plain blue link. Google's documentation describes how impressions are counted for different result types, such as carousels, AMP pages, app install links, images and rich features. In many of these, the position and the impression are counted for the containing element, not for each item inside it. That matters if you track a page that appears in a carousel or an expanding section: the impression may require the item to be scrolled or expanded into view. You do not need to memorise the rules. The practical advice is to filter the Performance report by Search appearance when you want to see how a particular result type behaves, and to remember that a count for a rich result is not directly comparable with a count for a standard listing.</p>
<p>It also helps to compare like with like over time. If you add structured data or start to appear in a new result type, impressions can change for reasons unrelated to rankings. Note the date of any such change in your monthly record so that you do not mistake a change in how you appear for a change in how well you rank.</p>

<h2>Common Impressions Mistakes</h2>
<ul>
<li><strong>Treating impressions as traffic.</strong> They show eligibility to be seen, not visits.</li>
<li><strong>Summing the table.</strong> The table omits rare queries and caps at 1,000 rows.</li>
<li><strong>Reading average position site-wide.</strong> It mixes strong and weak queries.</li>
<li><strong>Celebrating a spike.</strong> New pages can surge in impressions at poor positions and yield no clicks.</li>
<li><strong>Ignoring CTR at good positions.</strong> A page on page one with few clicks may need a better title.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Our chart totals and the 1,000-row query table are from the Search Console Performance report for contomatix.com, 90 days to 17 October 2026, read on 20 October 2026. The chart shows impressions rounded to about 106,000.</li>
<li>The weekly breakdown comes from a daily chart export covering 20 July to 29 September 2026.</li>
<li>Position bands group each query by its average position, as reported. Percentages are our arithmetic.</li>
<li>Google's definitions come from its Search Console Help pages, read on 20 October 2026.</li>
<li>We read ${D.ok} readable guides on one day (Google US). Counts show a term appears, not how well it is explained.</li>
<li>Our site is young, so its numbers should not be read as typical.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>An impression means your link appeared in the current page of results, whether or not it was scrolled into view.</li>
<li>Our site had about 106,000 impressions and ${chart.clicks} clicks in 90 days, at average position ${chart.pos}.</li>
<li>The query table showed ${impShare}% of impressions and about ${clickShare}% of clicks, so use chart totals for totals.</li>
<li>${far}% of our table impressions are from queries averaging position 20 or worse.</li>
<li>Work the queries at positions 10 to 20, and read clicks and CTR next to impressions.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is an impression in Google Search Console?</summary>
<p>An impression is counted when a link to your site appears in the current page of results, whether or not the user scrolled to it, as long as no click is needed to see it.</p>
</details>
<details>
<summary>Does an impression mean someone saw my result?</summary>
<p>Not necessarily. It means the result appeared on the page. Inside carousels and expanding sections, the item must typically be scrolled or expanded into view.</p>
</details>
<details>
<summary>Why do I have many impressions but few clicks?</summary>
<p>Usually because of position. Our average position was 43, around page five, where results are counted but rarely clicked. Low CTR at a good position points to a weak title or snippet instead.</p>
</details>
<details>
<summary>What does average position mean in Search Console?</summary>
<p>It is the topmost position of your link for each query, averaged across queries. A query where you appear at 3, 5 and 9 counts as position 3.</p>
</details>
<details>
<summary>Why do the chart and table totals differ?</summary>
<p>Google says tables show a maximum of 1,000 rows and omit rare queries to protect privacy, so chart totals can be higher than the sum of table rows.</p>
</details>
<details>
<summary>Do impressions affect SEO rankings?</summary>
<p>No. Impressions report how often you appeared. They do not cause rankings, but they show where you appear and for which queries.</p>
</details>
<details>
<summary>Are Search Console impressions the same as Google Analytics sessions?</summary>
<p>No. An impression is a result shown and a session is a visit measured after the page loads. They count different things and will not match.</p>
</details>
<details>
<summary>Do AI Mode appearances count as impressions?</summary>
<p>Google's help pages say impressions in AI Mode follow standard impression rules and are included in the performance data.</p>
</details>
<details>
<summary>How can I increase impressions that turn into clicks?</summary>
<p>Improve pages ranking between positions 10 and 20, strengthen titles on page-one queries and add internal links, then track clicks and CTR alongside impressions.</p>
</details>
</div>
`;
const title = 'Search Console Impressions Explained: 106K Views, 77 Clicks';
const excerpt = `Search Console impressions explained with real numbers: about 106,000 impressions, ${chart.clicks} clicks, position ${chart.pos}. Google's definition and why the table undercounts.`;
const out = content.replace('@@SERPH@@', hh('search-console-impressions-explained-serp.png')).replace('@@OURSH@@', hh('search-console-impressions-explained-ours.png')).replace('@@BANDSH@@', hh('search-console-impressions-explained-bands.png'));
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-10-20', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
