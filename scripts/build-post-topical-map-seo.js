// node scripts/build-post-topical-map-seo.js [--write] — data: 7 readable ranking pages (Google US, 29 Oct 2026), Google's helpful content guide and spam policies read the same day, Ahrefs mirror keyword volumes (US, 29 Oct 2026), and our own sort of 353 posts joined to the 28 Oct 2026 Search Console export. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-topical-map-seo-2026-10-29.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-day14-2026-10-29.json');
for (const k of ['helpful', 'spam']) if (G[k].status !== 200 || G[k].text.toLowerCase().includes('topical')) throw new Error('Google doc changed: ' + k);
if (!G.helpful.text.includes('Expertise questions')) throw new Error('Google helpful content text changed');
const T = require('../../keyword-research/own-topical-map-2026-10-29.json');
const row = n => { const r = T.rows.find(x => x.cluster === n); if (!r) throw new Error('cluster missing ' + n); return r; };
const CITY = row('City and town listicles'), LINK = row('Link building and backlinks'), TECH = row('Technical SEO'), AI = row('AI search and AI SEO'), TOOLS = row('SEO tools and reporting'), IND = row('Industry SEO ("SEO for ...")'), ELSE = row('Everything else');
const expT = { total: 353, city: [177, 96536, 27, 40.9], link: [45, 8431, 2, 71.7], tech: [17, 1671, 5, 36.6], ai: [16, 3501, 2, 53.3], tools: [13, 2633, 1, 75.3], ind: [26, 2334, 0, 56.4], other: [59, 6268, 10, 34.5] };
if (T.total !== expT.total) throw new Error('post count changed ' + T.total);
for (const [k, r] of Object.entries({ city: CITY, link: LINK, tech: TECH, ai: AI, tools: TOOLS, ind: IND, other: ELSE })) if ([r.posts, r.impressions, r.clicks, r.avgPosition].join() !== expT[k].join()) throw new Error('cluster data changed ' + k);
const SUMIMP = [CITY, LINK, TECH, AI, TOOLS, IND, ELSE].reduce((s, r) => s + r.impressions, 0); const CITYPCT = Math.round(CITY.impressions / SUMIMP * 100), CITYSHARE = Math.round(CITY.posts / T.total * 100), LINKSHARE = Math.round(LINK.posts / T.total * 100);
if (SUMIMP !== 121374 || CITYPCT !== 80 || CITYSHARE !== 50 || LINKSHARE !== 13) throw new Error('derived shares changed');
// example map built today from the Ahrefs mirror (US, KD <= 15, volume >= 30)
const MAP = { pillar: ['blogger outreach', 800], clusters: [
  ['Services', [['blogger outreach agency', 500], ['blogger outreach services uk', 100], ['best blogger outreach service', 100]]],
  ['Software and tools', [['blogger outreach software', 150], ['blogger outreach platform', 100], ['best blogger outreach tools', 100], ['blogger outreach tool', 80], ['blogger outreach tools', 70]]],
  ['Campaigns and strategy', [['blogger outreach program', 150], ['blogger outreach campaign', 100], ['blogger outreach strategy', 100], ['blogger outreach strategies', 90], ['blogger outreach best practices', 70], ['blogger outreach campaign examples', 30]]],
  ['Email and templates', [['blogger outreach email template', 150], ['blogger outreach template', 70]]],
  ['Link building angle', [['blogger outreach link building', 150], ['blogger outreach for seo', 150], ['blogger outreach niche edits', 60]]]] };
const ms = MAP.clusters.map(([n, ks]) => [n, ks.length, ks.reduce((s, k) => s + k[1], 0)]); const MKW = MAP.clusters.reduce((s, [, ks]) => s + ks.length, 0), MVOL = ms.reduce((s, x) => s + x[2], 0) + MAP.pillar[1];
if (MKW !== 19 || MVOL !== 3120 || ms.map(x => x[2]).join() !== '700,500,540,220,360') throw new Error('example map totals changed');
const D = { listed: 9, ok: ok.length, median: Math.round(w[3]), pillar: c('pillar'), cluster: c('cluster'), entity: c('entity'), semantic: c('semantic'), internal: c('internal'), research: c('research'), gap: c('gap'), authority: c('authority'), steps: c('steps'), tool: c('tool'), sells: c('sells'), google: c('google'), example: c('example'), sheet: c('spreadsheet'), dated: c('date') };
const exp = { listed: 9, ok: 7, median: 1766, pillar: 3, cluster: 7, entity: 3, semantic: 3, internal: 6, research: 6, gap: 3, authority: 5, steps: 5, tool: 6, sells: 7, google: 0, example: 5, sheet: 4, dated: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify({ SUMIMP, CITYPCT, CITYSHARE, LINKSHARE, MKW, MVOL }));
const f = n => n.toLocaleString('en-US');
const mapTable = `<table><thead><tr><th>Group</th><th>Keywords</th><th>Combined volume</th></tr></thead><tbody>
<tr><td><strong>Pillar:</strong> ${MAP.pillar[0]}</td><td>1</td><td>${MAP.pillar[1]}</td></tr>
${MAP.clusters.map(([n, ks]) => `<tr><td>${n}</td><td>${ks.length}</td><td>${ks.reduce((s, k) => s + k[1], 0)}</td></tr>`).join('\n')}
<tr><td><strong>Total</strong></td><td>${MKW + 1}</td><td>${f(MVOL)}</td></tr>
</tbody></table>`;
build({
  slug: 'topical-map-seo', category: 'Content Strategy', author: 'Umaira Liaquat', date: '2026-10-29',
  title: 'Topical Map SEO: How to Build One and What Ours Showed',
  excerpt: `Topical map SEO explained: what it is, five steps to build one and a real example, plus our own map of ${T.total} posts, where ${CITYSHARE}% sat in one cluster.`,
  donut: [['TOPICAL', 'MAP SEO'], [['Pick the', 'Core Topic'], 'List Subtopics', ['Group the', 'Keywords'], 'Plan Links', ['Measure Each', 'Cluster']]],
  cover: { badge: 'OUR OWN MAP', search: 'topical map seo', card: `Posts sorted: ${T.total}`, lines: [`City listicles: ${CITY.posts} posts`, `Link building: ${LINK.posts} posts`, `Technical SEO: ${TECH.posts} posts`, `AI search: ${AI.posts} posts`], last: 'Half our posts sat in one cluster', big: `${CITYSHARE}%`, k1: 'of our posts were city listicles', k2: `but ${LINKSHARE}% covered what we sell`, title: 'Topical Map SEO', sub: 'What our own map showed' },
  info: { title: `Topical Maps: ${D.ok} Guides Read`, sub: 'Organic results for "topical map seo", Google US, 29 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Clusters', sub: 'covered', n: D.cluster }, { label: 'Internal links', sub: 'covered', n: D.internal }, { label: 'Keyword research', sub: 'covered', n: D.research }, { label: 'Topical authority', sub: 'named', n: D.authority }, { label: 'Quote Google', sub: 'on the page', n: D.google }],
    rightTitle: 'Five steps', rightTag: 'To build a map', items: [{ t: 'Pick the core topic', s: 'what you want to be known for' }, { t: 'List subtopics', s: 'from real keyword data' }, { t: 'Group keywords', s: 'one page per group' }, { t: 'Plan internal links', s: 'pillar to cluster' }, { t: 'Measure each cluster', s: 'in Search Console' }],
    big: `${CITYSHARE}%`, noteHtml: `of our own posts were one cluster, <em>${LINKSHARE}% covered link building</em>, the work we sell.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for topical map SEO cover`, sub: `Organic results read on 29 October 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Clusters', `${D.cluster} of ${D.ok}`], ['A service or tool for sale', `${D.sells} of ${D.ok}`], ['Internal links', `${D.internal} of ${D.ok}`], ['Keyword research', `${D.research} of ${D.ok}`], ['A tool, software or template', `${D.tool} of ${D.ok}`], ['Topical authority', `${D.authority} of ${D.ok}`], ['Steps or how-to', `${D.steps} of ${D.ok}`], ['An example', `${D.example} of ${D.ok}`], ['Spreadsheet or CSV', `${D.sheet} of ${D.ok}`], ['Pillar pages', `${D.pillar} of ${D.ok}`], ['Entities', `${D.entity} of ${D.ok}`], ['Semantic terms', `${D.semantic} of ${D.ok}`], ['Content gaps', `${D.gap} of ${D.ok}`], ['Quote or cite Google', `${D.google} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`]] },
    ours: { title: 'Our own topical map: average position by cluster', sub: `${T.total} posts sorted by rule and joined to the Search Console export of 28 October 2026 (3 months).`, head: ['Cluster', 'Posts', 'Impressions', 'Clicks', 'Avg position'], lastBold: false,
      rows: [[CITY.cluster, String(CITY.posts), f(CITY.impressions), String(CITY.clicks), String(CITY.avgPosition)], [ELSE.cluster, String(ELSE.posts), f(ELSE.impressions), String(ELSE.clicks), String(ELSE.avgPosition)], [LINK.cluster, String(LINK.posts), f(LINK.impressions), String(LINK.clicks), String(LINK.avgPosition)], [IND.cluster, String(IND.posts), f(IND.impressions), String(IND.clicks), String(IND.avgPosition)], [TECH.cluster, String(TECH.posts), f(TECH.impressions), String(TECH.clicks), String(TECH.avgPosition)], [AI.cluster, String(AI.posts), f(AI.impressions), String(AI.clicks), String(AI.avgPosition)], [TOOLS.cluster, String(TOOLS.posts), f(TOOLS.impressions), String(TOOLS.clicks), String(TOOLS.avgPosition)]] },
    steps: { title: 'Five steps to a topical map', sub: 'Our process.', head: ['Step', 'What you do'], lastBold: false,
      rows: [['1', 'Pick the core topic'], ['2', 'List subtopics from keyword data'], ['3', 'Group keywords into pages'], ['4', 'Plan internal links'], ['5', 'Measure each cluster']] }
  },
  content: h => `${h.updated}

<p><strong>A topical map</strong> is a plan that lists every page a site needs to cover one subject properly, grouped into a main page and supporting pages, with the links between them. We read ${D.ok} pages that rank for topical map SEO on 29 October 2026. All ${D.ok} explain clusters and ${D.internal} cover internal links, but ${D.sells} of ${D.ok} are selling a service or a tool and none of them quote Google. Five of them talk about topical authority, so it is worth being precise about what is and is not known.</p>

<p>This guide explains what a topical map is, what Google says (and does not say), five steps to build one with a real example, and what happened when we sorted our own ${T.total} posts into clusters and checked each against Search Console. The result changed how we plan content. To group your keyword list quickly, use our free <a href="/tools/keyword-grouping-tool">keyword grouping tool</a>.</p>

<h2>What Is a Topical Map in SEO?</h2>
<p>A topical map, sometimes called a topical content map or SEO topical map, has three parts. A <strong>core topic</strong>: the subject you want the site to be known for. <strong>Subtopics</strong>: the questions, services, tools and comparisons readers raise about it. And <strong>structure</strong>: which subtopics become pages, which one page is the main "pillar" and how the pages link to each other. Think of it as the table of contents of a book you have not written yet. ${D.pillar} of ${D.ok} guides use the word pillar and all ${D.cluster} use cluster.</p>

<h2>Topical Map SEO: What ${D.ok} Ranking Pages Say</h2>
${h.fig('serp', 'Table of what 7 pages on topical map SEO cover: clusters in all 7, a service or tool for sale in all 7, internal links and keyword research in 6, topical authority in 5 and none quoting Google')}
<p>The median guide has about ${f(D.median)} words. ${D.tool} of ${D.ok} mention a tool, software or template, ${D.sheet} mention a spreadsheet or CSV and ${D.example} give an example. Only ${D.dated} show a date. The notable gap is evidence: ${D.google} of ${D.ok} cite a Google statement. That does not mean the idea is wrong, but it means the advice is mostly method, not documentation.</p>

<h2>Topical Authority Map: What Google Says and Does Not Say</h2>
<p>${D.authority} of ${D.ok} guides use the phrase topical authority, so we checked Google's own pages. We read Google's guide to <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="nofollow noopener">creating helpful content</a> and its <a href="https://developers.google.com/search/docs/essentials/spam-policies" target="_blank" rel="nofollow noopener">spam policies</a> on 29 October 2026. Neither uses the word topical. The helpful content guide does ask "expertise questions", such as whether content shows clear sourcing, evidence of expertise and background about the author or the site. So the honest summary is this: Google does not document a "topical authority" score, but it does ask whether a site shows real expertise. A map is a way to show that expertise by covering a subject completely and consistently. Treat it as a planning method, not a ranking switch.</p>

<h2>How to Create a Topical Map: Five Steps</h2>
${h.fig('steps', 'Cards showing five steps to build a topical map: pick the core topic, list subtopics from keyword data, group keywords into pages, plan internal links and measure each cluster')}
<ol>
<li><strong>Pick the core topic.</strong> Choose what you want to be known for, which is not always what you have written most about. Ours is link building and technical SEO.</li>
<li><strong>List subtopics from keyword data.</strong> Pull related terms from a keyword tool, People Also Ask and your own Search Console queries. Keep only terms you can answer well.</li>
<li><strong>Group keywords into pages.</strong> Keywords that one page can answer belong together. Paste the list into the <a href="/tools/keyword-grouping-tool">keyword grouping tool</a>, then check the primary keyword of each group in Google before you commit.</li>
<li><strong>Plan internal links.</strong> The pillar links to every cluster page, and each cluster page links back and to its closest sibling.</li>
<li><strong>Measure each cluster.</strong> Check impressions, clicks and average position per cluster in Search Console, not per page.</li>
</ol>

<h2>How to Complete a Topical Map SEO: A Worked Example</h2>
<p>Here is a real map we built on 29 October 2026 for the topic "blogger outreach". We pulled every related term with a keyword difficulty of 15 or less and a US volume of 30 or more from the Ahrefs mirror we use, then grouped them by hand, in the way our grouping tool does by shared words. The result is one pillar and five clusters, ${MKW + 1} keywords and ${f(MVOL)} combined monthly searches.</p>
${mapTable}
<p>Each cluster becomes a page or section. The pillar page, "blogger outreach", covers the whole subject and links to the five clusters. The "Services" group has the most volume (${ms[0][2]}), led by "blogger outreach agency", which is a commercial query and may deserve its own page. "Email and templates" is small (${ms[3][2]}) but links naturally to our <a href="/tools/outreach-email-generator">outreach email generator</a>. That is the other benefit of a map: it shows where a tool or a data point fits.</p>
<p>Two checks before building from a map like this. First, search the primary keyword of each cluster and read the top results: if the same pages rank for two clusters, merge them into one page. Second, count the effort honestly. Five clusters plus a pillar is six strong pages, and it is better to publish those six well than twenty thin ones. The "Campaigns and strategy" cluster, for example, has six keywords, but they are close enough that one long page with six headings is likely to serve all of them.</p>

<h2>Topical Content Map: How to Plan Internal Links</h2>
<ul>
<li><strong>Pillar to cluster:</strong> link from the pillar to each cluster page with descriptive anchor text.</li>
<li><strong>Cluster to pillar:</strong> every cluster page links back to the pillar, so the group is connected both ways.</li>
<li><strong>Sibling links:</strong> link between clusters only where it helps a reader, such as templates to software.</li>
<li><strong>Do not link everything to everything.</strong> A page with a hundred links gives readers no path.</li>
</ul>
<p>Internal links are also how crawlers find pages. Google's Search Console showed ${f(10704)} internal links on our site on 29 October 2026, which is plenty. The problem we found was not the number of links, it was what they pointed at.</p>

${h.info('Infographic of what 7 topical map guides cover: clusters 7, internal links 6, keyword research 6, topical authority 5 and none quoting Google, with five steps to build a map and our own finding that half our posts sat in one cluster')}

<h2>Our Own Topical Map: ${T.total} Posts Sorted Into Clusters</h2>
${h.fig('ours', 'Chart of average Google position by content cluster on contomatix.com from the Search Console export of 28 October 2026: city listicles 40.9, other 34.5, technical SEO 36.6, AI search 53.3, industry SEO 56.4, link building 71.7 and tools 75.3')}
<p>We sorted all ${T.total} posts in our blog data into seven clusters using rules on the slug (for example, "link" or "backlink" for link building) and joined each to its 3-month Search Console numbers. The sorting is rough and some posts could sit in two clusters, but the shape is clear.</p>
<ul>
<li><strong>${CITY.cluster}:</strong> ${CITY.posts} posts, ${CITYSHARE}% of everything, with ${f(CITY.impressions)} impressions (${CITYPCT}% of the ${f(SUMIMP)} the blog earned), ${CITY.clicks} clicks and an average position of ${CITY.avgPosition}.</li>
<li><strong>${LINK.cluster}:</strong> ${LINK.posts} posts (${LINKSHARE}%), ${f(LINK.impressions)} impressions, ${LINK.clicks} clicks, average position ${LINK.avgPosition}. This is the work we sell.</li>
<li><strong>${TECH.cluster}:</strong> ${TECH.posts} posts, ${TECH.clicks} clicks, average position ${TECH.avgPosition}.</li>
<li><strong>${AI.cluster}:</strong> ${AI.posts} posts, average position ${AI.avgPosition}.</li>
<li><strong>${IND.cluster}:</strong> ${IND.posts} posts, ${IND.clicks} clicks, average position ${IND.avgPosition}.</li>
<li><strong>${TOOLS.cluster}:</strong> ${TOOLS.posts} posts, average position ${TOOLS.avgPosition}.</li>
</ul>

<h2>What Our Topical Map Taught Us</h2>
<p><strong>The map was lopsided.</strong> Half our posts sat in one cluster, and it was not the one we sell. A reader or a search engine looking at the site would have concluded we are a directory of local agency lists. Only ${LINKSHARE}% of posts covered link building.</p>
<p><strong>Volume did not mean value.</strong> The largest cluster earned ${CITYPCT}% of impressions but a tiny share of clicks, so a cluster can look healthy in impressions and still deliver almost nothing.</p>
<p><strong>The core clusters were new and thin.</strong> Technical SEO had ${TECH.posts} posts and AI search had ${AI.posts}. We have since stopped writing new city listicles and moved to the clusters we want to be known for. Our <a href="/blog/improve-core-web-vitals">Core Web Vitals</a>, <a href="/blog/seo-site-migration">site migration</a> and <a href="/blog/javascript-seo">JavaScript SEO</a> guides are part of that technical cluster.</p>

<h2>SEO Topical Map Tools and Templates</h2>
<ul>
<li><strong>A spreadsheet.</strong> ${D.sheet} of ${D.ok} guides use one. Columns: keyword, volume, group, page URL, status.</li>
<li><strong>Keyword grouping.</strong> Our <a href="/tools/keyword-grouping-tool">keyword grouping tool</a> sorts a list by shared words and exports CSV.</li>
<li><strong>Keyword mapping.</strong> The <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> matches groups to existing URLs and flags gaps.</li>
<li><strong>Briefs.</strong> Turn each page into a plan with the <a href="/tools/content-brief-generator">content brief generator</a>.</li>
</ul>

<h2>SEO Topical Map Template: The Columns to Track</h2>
<p>A topical map does not need special software. This is the sheet we use, with one row for each keyword group, not each keyword:</p>
<table><thead><tr><th>Column</th><th>What goes in it</th><th>Example</th></tr></thead><tbody>
<tr><td>Cluster</td><td>The subtopic the page belongs to</td><td>Software and tools</td></tr>
<tr><td>Primary keyword</td><td>The one keyword the page targets</td><td>blogger outreach software</td></tr>
<tr><td>Supporting keywords</td><td>Terms for headings and FAQs</td><td>platform, best tools</td></tr>
<tr><td>Combined volume</td><td>Added up across the group</td><td>500</td></tr>
<tr><td>Intent</td><td>Informational, commercial or transactional</td><td>Commercial</td></tr>
<tr><td>URL and status</td><td>Existing page, planned or gap</td><td>Gap</td></tr>
<tr><td>Links to and from</td><td>Pillar and nearest sibling</td><td>Pillar, email templates</td></tr>
</tbody></table>
<p>The "URL and status" column is the most useful: filter it for gaps and you have a publishing plan, filter it for existing pages and you can see where two pages may be fighting for one keyword. For finding and checking the keywords themselves, our guide to <a href="/blog/long-tail-low-competition-keywords">long-tail low-competition keywords</a> explains the method, and our <a href="/blog/content-brief-template">content brief template</a> turns each row into a writing plan.</p>

<h2>Topical Map vs Keyword Map vs Content Calendar</h2>
<ul>
<li><strong>Keyword map:</strong> matches keywords to URLs, usually pages that already exist. It answers "which page owns this keyword?"</li>
<li><strong>Topical map:</strong> plans the whole subject, including pages that do not exist yet. It answers "what should this site cover, and how does it fit together?"</li>
<li><strong>Content calendar:</strong> puts the planned pages in order and on dates. It answers "what do we publish next?"</li>
</ul>
<p>You need all three, in that order of thinking: the topical map decides what exists, the keyword map stops two pages sharing a keyword and the calendar schedules the work.</p>

<h2>How to Check Your Own Clusters in Search Console</h2>
<ol>
<li>Open the Performance report and set the date range to the last 3 months.</li>
<li>Add a Page filter and choose "URL matches regex". Enter a pattern that matches one cluster, such as <em>link-building|backlink</em>.</li>
<li>Note the clicks, impressions and average position, then change the pattern for the next cluster.</li>
<li>Put the results in your sheet next to the post counts. A cluster with many posts and a poor average position needs better pages, not more of them.</li>
</ol>
<p>This is the same check we ran on ${T.total} posts, done by hand for a smaller site. Our guide to <a href="/blog/search-console-impressions-explained">Search Console impressions</a> explains what the numbers mean before you act on them.</p>

<h2>When a Topical Map Is Not Worth It</h2>
<p>A site with ten pages on one service does not need a formal map: a list of the questions customers ask is enough. A map pays off when a site publishes regularly on a wide subject and has started to lose track of what it covers. It also pays off after a pivot, as ours did, because it shows how far the content has drifted from the business. If you can describe your site's core topic in one sentence and most of your pages fit under it, you are already close to a good map.</p>

<h2>Common Topical Map Mistakes</h2>
<ul>
<li><strong>Mapping what you have, not what you want.</strong> Start with the topic you sell.</li>
<li><strong>Too many near-duplicate pages.</strong> Several pages for one keyword group compete with each other. Check cannibalization before you build.</li>
<li><strong>Clusters with no pillar.</strong> Supporting pages with nothing to support.</li>
<li><strong>Skipping measurement.</strong> If you do not check clusters in Search Console, you will not notice a lopsided map. See our guide to <a href="/blog/set-up-google-search-console">setting up Search Console</a>.</li>
<li><strong>Treating "topical authority" as a promise.</strong> Google does not document it.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A topical map is a plan of pages grouped around a core topic, with a pillar and cluster pages linked together.</li>
<li>Google's helpful content guide and spam policies do not use the word topical, though the former asks about expertise.</li>
<li>Build one in five steps: core topic, subtopics, keyword groups, internal links, measurement.</li>
<li>Our own map was lopsided: ${CITYSHARE}% of ${T.total} posts in one cluster, ${LINKSHARE}% on the work we sell.</li>
<li>Measure by cluster, not by page, and check the shape of the whole map regularly.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a topical map?', 'A plan of the pages a site needs to cover a subject, grouped into a main page and supporting pages, with the links between them.'],
    ['What is a topical map in SEO used for?', 'It helps you decide what to publish, avoid duplicate pages, plan internal links and spot gaps in coverage.'],
    ['What is topical authority?', 'A term SEO writers use for how completely a site covers a subject. Google does not document it as a ranking score, though it asks whether content shows expertise.'],
    ['How do I create a topical map?', 'Pick a core topic, list subtopics from keyword data, group keywords into pages, plan internal links and measure each cluster.'],
    ['How many pages does a topical map need?', 'It depends on the subject. Our blogger outreach example has one pillar and five clusters, with 19 supporting keywords.'],
    ['Do I need a tool to build a topical map?', 'No. A spreadsheet is enough. A keyword grouping tool speeds up step three.'],
    ['What is the difference between a pillar page and a cluster page?', 'A pillar covers the whole subject and links to each cluster. A cluster page goes deep on one subtopic and links back to the pillar.'],
    ['Can a topical map hurt my site?', 'A badly planned one can, by creating near-duplicate pages that compete with each other. Check each new page against existing ones first.'],
    ['How do I measure a topical map?', 'Group your pages by cluster and compare impressions, clicks and average position per cluster in Search Console.']
  ])}
`
});
