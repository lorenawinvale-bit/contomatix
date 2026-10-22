// Builds the "content audit seo" post + assets from the 2026-10-02 GSC export. Local helper.
// node scripts/build-post-content-audit-seo.js [--write]   (then run the capture/sharp commands noted at the bottom)
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..'); const img = path.join(root, 'public', 'images', 'blog'); const SLUG = 'content-audit-seo';
const blog = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blog.json'), 'utf8'));
const csvLine = l => (l.match(/("([^"]|"")*"|[^,]*)(,|$)/g) || []).map(x => x.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"'));
const gsc = fs.readFileSync(path.join(root, '..', 'gsc-exports', 'performance-2026-10-02', 'Pages.csv'), 'utf8').trim().split(/\r?\n/).slice(1).map(csvLine);
const G = {}; gsc.forEach(r => G[r[0]] = { clicks: +r[1], imp: +r[2], pos: +r[4] });
const EXPORT = new Date('2026-10-01');
const live = blog.filter(p => p.date <= '2026-10-01');
const rows = live.map(p => { const g = G['https://contomatix.com/blog/' + p.slug] || { clicks: 0, imp: 0, pos: null }; return { slug: p.slug, cat: p.category, age: (EXPORT - new Date(p.date)) / 864e5, ...g }; });
const KEYS = ['Too new (under 30 days old)', 'Keep (has clicks)', 'Fix the snippet (position 10 or better, 100+ impressions, no clicks)', 'Push up (position 11 to 30, 100+ impressions, no clicks)', 'Rework or merge (position beyond 30, 100+ impressions)', 'Low demand (under 100 impressions)'];
const bucket = p => p.age < 30 ? 0 : p.clicks > 0 ? 1 : p.imp < 100 ? 5 : p.pos <= 10 ? 2 : p.pos <= 30 ? 3 : 4;
const B = KEYS.map(() => ({ n: 0, clicks: 0, imp: 0, local: 0 }));
rows.forEach(p => { const b = B[bucket(p)]; b.n++; b.clicks += p.clicks; b.imp += p.imp; if (p.cat === 'Local SEO') b.local++; });
const T = B.reduce((t, b) => ({ n: t.n + b.n, clicks: t.clicks + b.clicks, imp: t.imp + b.imp }), { n: 0, clicks: 0, imp: 0 });
const f = n => n.toLocaleString('en-US');
const pct = (a, b) => Math.round(a / b * 100);
console.log(JSON.stringify({ T, B }));
const exp = [[125, 10, 23313], [10, 15, 4948], [0, 0, 0], [14, 0, 8040], [46, 0, 28318], [80, 0, 1739]];
B.forEach((b, i) => { if (b.n !== exp[i][0] || b.clicks !== exp[i][1] || b.imp !== exp[i][2]) throw new Error('data changed at bucket ' + i); });
if (T.n !== 275 || T.clicks !== 25 || T.imp !== 66358) throw new Error('totals changed');
const rework = B[4], push = B[3];
const share = pct(rework.imp, T.imp), shareP = pct(push.imp, T.imp), shareLow = (B[5].imp / T.imp * 100).toFixed(1);
const noRow = rows.filter(p => p.pos === null).length;

// ---------- assets
const trs = KEYS.map((k, i) => `<tr><td>${k}</td><td>${B[i].n}</td><td>${B[i].clicks}</td><td>${f(B[i].imp)}</td></tr>`).join('');
fs.writeFileSync(path.join(__dirname, 'bucket-table-content-audit-seo.html'), `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1280px;box-sizing:border-box;background:#fff;font-family:'Segoe UI',Arial,sans-serif;color:#16192A;padding:28px 32px}
h3{margin:0 0 4px;font-size:22px}p{margin:0 0 16px;color:#6b6459;font-size:15px}
table{width:100%;border-collapse:collapse;font-size:18px}th{background:#F1EDE3;text-align:right;padding:12px 14px;font-size:14px;color:#6b6459;text-transform:uppercase;letter-spacing:.3px}th:first-child,td:first-child{text-align:left}
td{padding:13px 14px;text-align:right;border-bottom:1px solid #EAE0D2;font-variant-numeric:tabular-nums}td:first-child{font-weight:600}tr:last-child td{font-weight:800;background:#FAF5EF;border-bottom:0}.z{color:#8A8371}
</style></head><body><h3>Every live post sorted into one bucket</h3><p>Search Console, Web, last 3 months to 1 October 2026, matched to our CMS publish dates. ${T.n} posts.</p>
<table><thead><tr><th>Bucket</th><th>Posts</th><th>Clicks</th><th>Impressions</th></tr></thead><tbody>${trs}<tr><td>All live posts</td><td>${T.n}</td><td>${T.clicks}</td><td>${f(T.imp)}</td></tr></tbody></table></body></html>`);

let d = fs.readFileSync(path.join(img, 'diagram-blocked-by-robots-txt.svg'), 'utf8');
const rep = (a, b) => { if (!d.includes(a)) throw new Error('missing ' + a); d = d.replace(a, b); };
rep('<tspan x="380">BLOCKED BY</tspan><tspan x="380" dy="23">ROBOTS.TXT</tspan>', '<tspan x="380">CONTENT</tspan><tspan x="380" dy="23">AUDIT SEO</tspan>');
rep('<tspan x="531.8">Two Statuses,</tspan><tspan x="531.8" dy="15">Two Meanings</tspan>', '<tspan x="531.8">Pull the</tspan><tspan x="531.8" dy="15">Real Data</tspan>');
rep('<tspan x="575.0">Find the Rule</tspan>', '<tspan x="575.0">Set Aside New Posts</tspan>');
rep('<tspan x="427.0">Common Causes</tspan>', '<tspan x="427.0">Sort Into Buckets</tspan>');
rep('<tspan x="50.0">Fix, Then</tspan><tspan x="50.0" dy="15">Validate</tspan>', '<tspan x="50.0">Decide Per</tspan><tspan x="50.0" dy="15">Bucket</tspan>');
rep('<tspan x="81.9">The noindex Trap</tspan>', '<tspan x="81.9">Re-Check in 90 Days</tspan>');
fs.writeFileSync(path.join(img, `diagram-${SLUG}.svg`), d);

let c = fs.readFileSync(path.join(img, 'illus-blocked-by-robots-txt.svg'), 'utf8');
const rc = (a, b) => { if (!c.includes(a)) throw new Error('missing ' + a); c = c.replace(a, b); };
rc('SEARCH CONSOLE GUIDE', 'REAL AUDIT, 275 POSTS'); rc('x="596" y="34" width="150"', 'x="571" y="34" width="175"'); rc('x="671" y="52"', 'x="658.5" y="52"');
rc('>blocked by robots.txt<', '>content audit seo<'); rc('Page indexing report', 'Audit buckets');
rc('Status: Blocked by robots.txt', `Posts audited: ${T.n}`); rc('Crawled: no', `Too new to judge: ${B[0].n}`); rc('Indexed: can still happen', `Has clicks: ${B[1].n}`);
rc('Snippet: usually missing', `Push up: ${push.n} posts`); rc('Fix: narrow the rule', `Rework or merge: ${rework.n} posts`); rc('Then: validate the fix', 'Decide per bucket, not per page');
rc('>No crawl<', `>${share}%<`.slice(0));  rc('is not the same as no index', 'of impressions sit beyond'); rc('noindex needs a crawl to work', 'position 30');
rc('>Blocked by Robots.txt<', '>Content Audit SEO<'); rc('Diagnose and fix the two Search Console statuses', 'A bucket method run on our own 275 posts');
fs.writeFileSync(path.join(img, `illus-${SLUG}.svg`), c);

const bar = (label, n, max, col, sub) => `<div class="row"><div class="lab">${label}<small>${sub}</small></div><div class="track"><div class="fill" style="width:${Math.max(n / max * 100, n ? 3 : 0)}%;background:${col}"></div></div><div class="num">${n}</div></div>`;
fs.writeFileSync(path.join(__dirname, 'infographic-content-audit-seo.html'), `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}body{width:1376px;height:790px;background:#FAF5EF;font-family:'Segoe UI',Arial,sans-serif;color:#16192A;position:relative;overflow:hidden}
.b1{position:absolute;right:-120px;top:-140px;width:440px;height:440px;border-radius:50%;background:rgba(20,184,166,.07)}.b2{position:absolute;left:-110px;bottom:-150px;width:420px;height:420px;border-radius:50%;background:rgba(249,115,22,.07)}
.logo{position:absolute;left:50px;top:36px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:21px;color:#16192A}.logo i{width:30px;height:30px;border-radius:50%;border:4px solid #0EA5A0;border-right-color:transparent;display:inline-block}
h1{position:absolute;left:0;right:0;top:46px;text-align:center;font-size:38px;font-weight:800;letter-spacing:-.5px}.sub{position:absolute;left:0;right:0;top:110px;text-align:center;font-size:22px;color:#6b6459}
.card{position:absolute;top:172px;height:440px;background:#fff;border-radius:22px;padding:28px 34px}.l{left:56px;width:780px;border:3px solid #0EA5A0}.r{right:56px;width:460px;border:3px solid #F5A623}
.card h2{font-size:26px;font-weight:800;margin-bottom:4px}.l h2{color:#0B807C}.r h2{color:#B5730E}.tag{font-size:16px;color:#6b6459;margin-bottom:22px}
.row{display:flex;align-items:center;gap:16px;margin-bottom:20px}.lab{width:270px;font-size:19px;font-weight:600;line-height:1.15}.lab small{display:block;font-size:14px;color:#6b6459;font-weight:400}.track{flex:1;height:30px;background:#F1EDE3;border-radius:15px;overflow:hidden}.fill{height:100%;border-radius:15px}.num{width:52px;font-size:26px;font-weight:800;text-align:right}
ul{list-style:none;padding:0}li{margin-bottom:18px;font-size:20px;font-weight:700;line-height:1.25}li small{display:block;font-size:16px;color:#6b6459;font-weight:400;margin-top:2px}li:before{content:'';display:inline-block;width:12px;height:12px;border-radius:50%;background:#F5A623;margin-right:12px}
.note{position:absolute;left:56px;right:56px;top:640px;height:100px;background:#16192A;color:#fff;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:22px;padding:0 30px}.note b{font-size:50px;color:#5EEAD4;font-weight:800;white-space:nowrap}.note p{font-size:23px;line-height:1.35}.note em{font-style:normal;color:#FBBF24;font-weight:700}
</style></head><body><div class="b1"></div><div class="b2"></div><div class="logo"><svg width="44" height="44" viewBox="0 0 44 44" style="flex:none"><circle cx="22" cy="22" r="21" fill="#fff" stroke="#EAE0D2"/><g transform="translate(-0,-0) scale(0.9167)"><path d="M 35.52 13.63 A 15.5 15.5 0 1 0 35.52 34.37" fill="none" stroke="#0EA5A0" stroke-width="4.2" stroke-linecap="round" transform="translate(0,0)"/><line x1="35.52" y1="13.63" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.2"/><line x1="35.52" y1="34.37" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.2"/><circle cx="35.52" cy="13.63" r="3.1" fill="#F5A623"/><circle cx="35.52" cy="13.63" r="1.1" fill="#fff"/><circle cx="35.52" cy="34.37" r="3.1" fill="#14B8A6"/><circle cx="35.52" cy="34.37" r="1.1" fill="#fff"/><circle cx="24" cy="24" r="2" fill="#16192A"/></g></svg>Contomatix</div>
<h1>Content Audit SEO: Sort Before You Decide</h1><div class="sub">${T.n} live posts, Search Console data to 1 October 2026</div>
<div class="card l"><h2>Where the posts landed</h2><div class="tag">Number of posts per bucket</div>
${bar('Too new to judge', B[0].n, 125, '#8A8371', 'under 30 days old')}${bar('Rework or merge', B[4].n, 125, '#0EA5A0', 'position beyond 30')}${bar('Low demand', B[5].n, 125, '#14B8A6', 'under 100 impressions')}${bar('Push up', B[3].n, 125, '#FBBF24', 'position 11 to 30')}${bar('Keep', B[1].n, 125, '#F5A623', 'already earning clicks')}</div>
<div class="card r"><h2>Decide per bucket</h2><div class="tag">What each one calls for</div><ul>
<li>Too new<small>wait, then re-check</small></li><li>Keep<small>leave alone, update when facts change</small></li><li>Push up<small>deepen, link, refresh sources</small></li><li>Rework or merge<small>match page one, or combine duplicates</small></li><li>Low demand<small>judge by usefulness to readers</small></li></ul></div>
<div class="note"><b>${share}%</b><p>of all impressions sat on ${rework.n} posts ranking <em>beyond position 30</em>, so rewriting titles would not have helped.</p></div></body></html>`);

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>A <strong>content audit SEO</strong> process should end with a decision for every page, and our own audit showed why it matters which order you make them in. We had ${T.n} live blog posts on 1 October 2026. In the previous three months they earned ${T.clicks} clicks and ${f(T.imp)} impressions. Treated as one pile, that looks like a site where almost everything needs rewriting. Sorted by age and ranking position, it told a much narrower story.</p>

<p>This guide walks through that audit on real Search Console data from our own site: the buckets we used, the counts that fell into each one, what Google says about removing and refreshing content, and the limits of the method. The site is young and the click numbers are small, so read the figures as an example of how the sorting works, not as a benchmark. If you want a wider technical review first, our <a href="/blog/website-seo-audit">website SEO audit checklist</a> covers that side.</p>

<h2>What a Content Audit for SEO Is For</h2>
<p>A content audit is a page-by-page review of what you have already published, done to decide what happens to each page. The usual choices are keep it, improve it, merge it with another page, or remove it. It is not a word-count exercise and it is not a hunt for old dates. Google's own guidance lists writing to a particular word count among the signs of search-engine-first content and says it has no preferred word count, so length alone should never be your verdict.</p>
<p>Two things make an audit worth doing. It points your effort at the pages where a change can plausibly move results, and it stops you from spending time on pages where the data cannot tell you anything yet. Most audits fail at the second part.</p>

<h2>The Data We Used</h2>
<p>We exported the Pages report from Search Console for the Web search type over the last three months, covering the period to 1 October 2026. For each page it gives clicks, impressions and average position. We matched every URL to our own CMS records to get the publish date and category, then set a cut-off at the export date.</p>
<p>One definition matters for everything that follows. Search Console counts the topmost position your page held for each query it appeared in, and the position figure is an average of those values. A page that sits at position 4 for one query and 40 for another will show an average between them, so treat it as a rough guide to where a page lives and not as a rank you can read off a results page.</p>

<h2>Step One: Set Aside the Pages That Are Too New</h2>
<p>The first rule we applied was age. Any post published fewer than 30 days before the export went into a "too new" bucket and was left alone. That removed ${B[0].n} of ${T.n} posts, which is ${pct(B[0].n, T.n)} percent of the site.</p>
<p>The cut-off is a judgement call, and 30 days is short. We chose it because these posts had existed for less than one month, which is not enough time to judge whether a page is failing. They were not empty either: together they already held ${B[0].clicks} clicks and ${f(B[0].imp)} impressions. An audit that had flagged them as underperformers would have been acting on a few weeks of data.</p>

<h2>Step Two: Sort the Rest Into Buckets by What the Numbers Say</h2>
<p>For every remaining post we asked two questions in order. Did it earn any clicks? If not, did it earn enough impressions, at least 100, for its average position to mean something? The answers put each post into one of five buckets, plus the "too new" one.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/content-audit-seo-buckets.png" alt="Table of 275 live posts sorted into audit buckets: too new, keep, fix the snippet, push up, rework or merge and low demand, with post, click and impression counts for each" width="1280" height="530" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>The rules, in order, were:</p>
<ol>
<li><strong>Too new:</strong> published fewer than 30 days before the export.</li>
<li><strong>Keep:</strong> at least one click in the period.</li>
<li><strong>Low demand:</strong> no clicks and fewer than 100 impressions.</li>
<li><strong>Fix the snippet:</strong> no clicks, 100 or more impressions, average position 10 or better. The page ranks but nobody clicks, which points at the title or description.</li>
<li><strong>Push up:</strong> no clicks, 100 or more impressions, average position 11 to 30. The page is close enough to reach page one with better content.</li>
<li><strong>Rework or merge:</strong> no clicks, 100 or more impressions, average position beyond 30. The page is being shown, but too far down to be seen.</li>
</ol>

<h2>What the Buckets Told Us</h2>
<p>Three results stood out.</p>
<p><strong>The snippet bucket was empty.</strong> Not one of the older posts ranked in the top ten on average, drew 100 or more impressions and still got no clicks. A common reaction to low clicks is to rewrite titles and descriptions. For us that would have been wasted effort, because the problem was position and not presentation.</p>
<p><strong>Most impressions were on pages nobody could see.</strong> The ${rework.n} posts in the "rework or merge" bucket carried ${f(rework.imp)} impressions, ${share} percent of the site's total, at an average position beyond 30 and with no clicks at all. ${rework.local} of them were in our Local SEO category. Impressions that far down are real but nearly worthless, and a dashboard that only shows impression totals hides that.</p>
<p><strong>A small group was within reach.</strong> The ${push.n} posts in "push up" held ${f(push.imp)} impressions, about ${shareP} percent of the total, at positions 11 to 30. These are the pages where adding depth, internal links and updated sources has the best chance of showing up in results.</p>
<p>At the other end, the ${B[5].n} "low demand" posts had ${f(B[5].imp)} impressions between them, around ${shareLow} percent of the total. ${noRow} of our live posts had no row in the report at all, which means Google had shown them no impressions during the period.</p>

<h2>Run the Same Sort in a Spreadsheet</h2>
<p>You do not need special software. A spreadsheet is enough for a site of a few hundred pages.</p>
<ol>
<li><strong>Export the Pages report.</strong> In Search Console, open Performance, choose Web search, set the date range to the last three months, switch to the Pages tab and export it. You get one row per URL with clicks, impressions, CTR and position.</li>
<li><strong>Add your own columns.</strong> List every live URL from your CMS or sitemap with its publish date and category, then look up each URL in the export. URLs that are missing from the export had no impressions, so give them zero.</li>
<li><strong>Work out each page's age.</strong> Subtract the publish date from the export date, in days.</li>
<li><strong>Apply the rules with one formula.</strong> With age in column D, clicks in E, impressions in F and position in G, a formula like this puts every page in a bucket:<br><code>=IF(D2&lt;30,"Too new",IF(E2&gt;0,"Keep",IF(F2&lt;100,"Low demand",IF(G2&lt;=10,"Fix the snippet",IF(G2&lt;=30,"Push up","Rework or merge")))))</code></li>
<li><strong>Count and total.</strong> Build a small summary table with the number of pages, clicks and impressions in each bucket. If the totals do not match your site totals, a lookup has gone wrong.</li>
<li><strong>Read the pages, not just the numbers.</strong> For the buckets you plan to act on, open the actual pages and the live results for their main keyword before you decide anything.</li>
</ol>
<p>The order of the tests matters. Putting age first stops new pages from being judged, and putting clicks second protects anything that is already working. The impression and position tests then apply only to pages that need a closer look.</p>

<h2>What Google Says About Removing and Refreshing Content</h2>
<p>An audit makes deletion tempting, so it is worth knowing where Google stands. In its page on <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="nofollow noopener">creating helpful, reliable, people-first content</a>, updated on 5 October 2026, Google lists questions that point to content made for search engines first. Two of them bear directly on an audit. One asks whether you are changing the date of pages to make them seem fresh when the content has not substantially changed. The other asks whether you are adding lots of new content or removing lots of older content primarily because you believe it will help your rankings by making the site seem fresh. For that second one Google's answer is that it will not.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-helpful-content-older-content-question.jpg" alt="Google Search Central list of questions about search engine-first content, including changing page dates to seem fresh and removing a lot of older content to help rankings, with the answer that it will not" width="867" height="408" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>That does not mean weak pages must stay forever. It means the reason for any change should be the reader. Update a page because its facts are stale, merge two posts because they answer the same question, and remove a page because it serves no one. Do not do any of these because a spreadsheet shows a low click count.</p>

<h2>A Decision for Each Bucket</h2>
<p>The infographic below sums up what each bucket calls for. Here is the reasoning behind each row.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-content-audit-seo.png" alt="Infographic of the content audit buckets and the number of posts in each, with the action for each bucket: wait, keep, push up, rework or merge, and judge by usefulness" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Too new:</strong> leave it, and put a date in your calendar to run the same sort again once the posts are old enough.</li>
<li><strong>Keep:</strong> do not touch it for the sake of activity. Update it when a fact, price or rule changes.</li>
<li><strong>Push up:</strong> compare the page with what is ranking on page one for its main keyword. Add what the leaders cover and you do not, link to it from related posts and refresh any dated sources.</li>
<li><strong>Rework or merge:</strong> first check whether two of your own posts target the same search. If so, combine the best material into one and redirect the other. If not, read page one and decide whether your page is even the right format for that query.</li>
<li><strong>Low demand:</strong> check whether the keyword has real search demand. If it does not, ask whether the page still helps the readers who land on it, and decide on that basis. Our <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> can show where several keywords point at one page.</li>
<li><strong>Fix the snippet:</strong> rewrite the title and description to match what searchers want. We had no pages here, but it is the cheapest change when you do.</li>
</ul>
<p>We have not yet applied these decisions to the site, so we cannot report what happened after them. The plan is to re-run the same sort after 90 days and compare each bucket's counts.</p>

<h2>What This Audit Cannot Tell You</h2>
<ul>
<li><strong>It reflects three months of one data source.</strong> We did not combine it with analytics, conversions or backlink data. A page with no clicks may still have links or readers from other channels.</li>
<li><strong>Average position is blunt.</strong> A page can rank well for one query and badly for another, and the average hides that. For the pages that matter most, open the queries behind them.</li>
<li><strong>The thresholds are ours.</strong> Thirty days and 100 impressions are practical cut-offs, not rules from Google. A larger or older site might choose different ones.</li>
<li><strong>The sample is small and young.</strong> ${T.clicks} clicks across ${T.n} posts is too few to draw conclusions about which kind of content works. The value here is in the sorting method.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Sort before you decide: set aside new pages, then bucket the rest by clicks, impressions and position.</li>
<li>In our audit, ${B[0].n} of ${T.n} posts were too new to judge, and no older post needed a snippet rewrite.</li>
<li>${share} percent of our impressions sat on ${rework.n} posts beyond position 30, so impression totals alone are misleading.</li>
<li>Google says removing older content or changing dates to look fresh will not help rankings, so change pages for readers.</li>
<li>Re-run the same sort on a schedule and compare bucket counts.</li>
</ul>
<p>If you would like this kind of audit run on your own site, with a clear action for every page, Contomatix can do it. <a href="/contact">Get in touch</a> and we will scope it.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is a content audit in SEO?</summary>
<p>It is a review of the pages you have already published, done to decide whether each one should be kept, improved, merged with another page or removed. The decisions are based on performance data and on whether the page is useful to readers.</p>
</details>
<details>
<summary>How often should I run a content audit?</summary>
<p>Run one at least once or twice a year, and sooner after a large traffic change. On a young site that is publishing quickly, a quarterly pass is more useful because new pages move through the buckets fast.</p>
</details>
<details>
<summary>What data do I need for a content audit?</summary>
<p>At minimum, the Pages report from Search Console with clicks, impressions and position, plus your publish dates. Adding analytics, conversions and backlink counts gives a fuller picture.</p>
</details>
<details>
<summary>Should I delete pages that get no traffic?</summary>
<p>Not automatically. Google's helpful content guidance says removing a lot of older content primarily to help rankings will not work. Remove a page when it is unhelpful or serves no one, and consider a merge or redirect when another page covers the same topic.</p>
</details>
<details>
<summary>How old should a page be before I judge it?</summary>
<p>There is no official figure. We set aside posts under 30 days old because that is too little time to judge them, and a longer window is safer for competitive topics.</p>
</details>
<details>
<summary>What does average position mean in Search Console?</summary>
<p>For each query, Search Console counts the topmost position your page held, then averages those values. Because it mixes many queries, it shows roughly where a page lives and not its exact rank.</p>
</details>
<details>
<summary>What is the difference between a content audit and a technical SEO audit?</summary>
<p>A technical audit checks crawling, indexing and site health. A content audit checks whether each page earns its place and what to do with it. They overlap, and many teams run the technical review first.</p>
</details>
<details>
<summary>Is word count a good audit signal?</summary>
<p>No. Google says it has no preferred word count. A short page can be exactly right for its query, so judge pages by usefulness and performance instead of length.</p>
</details>
<details>
<summary>What should I do with pages that have impressions but no clicks?</summary>
<p>Check their average position first. If it is 10 or better, test a new title and description. If it is between 11 and 30, improve the content and internal links. If it is beyond 30, rework the page or merge it with a related one.</p>
</details>
</div>
`;
const title = 'Content Audit SEO: A Verified Method Tested on 275 Posts';
const excerpt = 'Content audit SEO method tested on 275 real posts: set aside new pages, sort by clicks and position, and decide per bucket. See what Google says.';
const post = { slug: SLUG, title, category: 'Content Marketing', author: 'Muhammad Reyan Nizami', date: '2026-10-09', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt len', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'first ext', (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length, 'share', share, shareP, shareLow, 'noRow', noRow);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
