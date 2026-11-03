// node scripts/build-post-content-gap-analysis.js [--write], data: 5 readable ranking pages (Google US, 3 Nov 2026) and a check of our own Search Console export of 28 Oct 2026 (top 1,000 queries) against the titles and slugs of our 363 posts and 44 tools (scripts/measure-content-gaps.js). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-content-gap-analysis-2026-11-03.json');
const OWN = require('../../keyword-research/own-content-gaps-2026-11-03.json');
const ok = R.filter(o => o.status === 200 && o.words > 400); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { listed: 7, ok: ok.length, median: w[2], steps: c('steps'), keywordGap: c('keywordGap'), competitor: c('competitor'), tools: c('tools'), prioritize: c('prioritize'), intent: c('intent'), example: c('example'), cluster: c('cluster'), free: c('free'), funnel: c('funnel'), ai: c('ai'), cta: c('cta'), template: c('template'), audit: c('audit') };
const exp = { listed: 7, ok: 5, median: 3005, steps: 5, keywordGap: 4, competitor: 5, tools: 2, prioritize: 4, intent: 2, example: 4, cluster: 2, free: 2, funnel: 3, ai: 5, cta: 3, template: 0, audit: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
if (OWN.queries !== 1000 || OWN.withImp20 !== 998 || OWN.covered !== 443 || OWN.gaps !== 555 || OWN.gapImp !== 37190 || OWN.totalImp !== 83558 || OWN.strikeDistance !== 274 || OWN.strikeCovered !== 142) throw new Error('own data changed ' + JSON.stringify(OWN).slice(0, 200));
const GP = Math.round(OWN.gaps / OWN.withImp20 * 100), IP = (OWN.gapImp / OWN.totalImp * 100).toFixed(1), SD = OWN.strikeDistance, SC = OWN.strikeCovered, SN = SD - SC; // 56, 44.5, 274, 142, 132
const f = n => n.toLocaleString('en-US'); const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
console.log(JSON.stringify(D), GP, IP, SN);
build({
  slug: 'content-gap-analysis', category: 'Content Strategy', author: 'Muhammad Reyan Nizami', date: '2026-11-03',
  title: 'Content Gap Analysis: How to Run One With Our Own Data',
  excerpt: `How to do a content gap analysis in 6 steps, with a template. On our own Search Console, ${OWN.gaps} of ${OWN.withImp20} queries had no page matching all their words.`,
  donut: [['CONTENT', 'GAP'], [['What a Gap', 'Is'], 'Our Own Check', ['What 5 Guides', 'Say'], 'Six Steps', ['The Free', 'Template']]],
  cover: { badge: 'OUR OWN DATA', search: 'content gap analysis', card: `Queries checked: ${f(OWN.withImp20)}`, lines: [`With a matching page: ${OWN.covered}`, `Without one: ${OWN.gaps}`, `Impressions on those: ${f(OWN.gapImp)}`, `Near page 1 (pos 11-30): ${SD}`, `Guides with a template: ${D.template} of ${D.ok}`], last: 'Search Console, 28 Oct 2026', big: `${GP}%`, k1: 'of our queries had no page built for them', k2: 'Checked against 363 posts and 44 tools', title: 'Content Gap Analysis', sub: 'Six steps, with a template' },
  info: { title: `Content Gap Analysis: ${D.ok} Guides Read`, sub: 'Organic results for "content gap analysis", Google US, 3 November 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Give steps', sub: 'how to run it', n: D.steps }, { label: 'Name competitors', sub: 'as the source', n: D.competitor }, { label: 'Cover keyword gaps', sub: 'by name', n: D.keywordGap }, { label: 'Talk about priorities', sub: 'what to fix first', n: D.prioritize }, { label: 'Offer a template', sub: 'to copy', n: D.template }],
    rightTitle: 'Our own Search Console', rightTag: '28 Oct 2026 export', items: [{ t: `${OWN.gaps} of ${f(OWN.withImp20)}`, s: 'queries with no matching page' }, { t: f(OWN.gapImp), s: `impressions on them (${IP}%)` }, { t: `${SN} of ${SD}`, s: 'near-page-1 queries with no page' }],
    big: `${GP}%`, noteHtml: `of our top queries had <em>no page</em> whose title or slug held all their words.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for content gap analysis say`, sub: `Organic results read on 3 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Mention competitors', `${D.competitor} of ${D.ok}`], ['Give steps to follow', `${D.steps} of ${D.ok}`], ['Mention AI', `${D.ai} of ${D.ok}`], ['Cover the keyword gap', `${D.keywordGap} of ${D.ok}`], ['Show an example', `${D.example} of ${D.ok}`], ['Talk about prioritising', `${D.prioritize} of ${D.ok}`], ['Mention the funnel or buyer journey', `${D.funnel} of ${D.ok}`], ['End with a sign-up or demo prompt', `${D.cta} of ${D.ok}`], ['Name a tool', `${D.tools} of ${D.ok}`], ['Cover search intent', `${D.intent} of ${D.ok}`], ['Cover topic clusters', `${D.cluster} of ${D.ok}`], ['Offer a template', `${D.template} of ${D.ok}`]] },
    ours: { title: 'Our top queries against our own pages', sub: `Top ${f(OWN.withImp20)} queries in Search Console on 28 October 2026 (20 or more impressions), matched to the titles and slugs of our 363 posts and 44 tools.`, head: ['Group', 'Queries'], lastBold: false,
      rows: [['Queries checked', f(OWN.withImp20)], ['A page title or slug holds all the words', String(OWN.covered)], ['No page holds all the words', String(OWN.gaps)], ['Near page 1 (position 11 to 30)', String(SD)], ['  with a matching page: improve it', String(SC)], ['  with no matching page: write one', String(SN)]] },
    steps: { title: 'Six steps of a content gap analysis', sub: 'The method we used on our own site.', head: ['Step', 'What you do'], lastBold: false,
      rows: [['1 List what you rank for', 'Export queries from Search Console'], ['2 Map each query to a page', 'Match the words to titles and URLs'], ['3 Mark the gaps', 'No page, or a weak page'], ['4 Add competitor topics', 'What they cover that you do not'], ['5 Prioritise', 'Impressions, position, fit and effort'], ['6 Act and re-check', 'Write, improve, then measure again']] }
  },
  content: h => `${h.updated}

<p>A <strong>content gap analysis</strong> is a check of which topics your audience searches for that your site does not yet answer well. A content gap is the difference between what people look for and what you have published. We read ${D.ok} pages that rank for "content gap analysis" on 3 November 2026: all ${D.ok} give steps and all ${D.ok} talk about competitors, but none of them gives a template you can copy. So we ran the method on ourselves. We matched our top ${f(OWN.withImp20)} Search Console queries against the titles and URLs of our 363 posts and 44 tools, and found that <strong>${OWN.gaps} of them (${GP}%) have no page whose title or slug holds all their words.</strong></p>

<p>This guide explains the meaning of a content gap, shows what the ranking guides cover and miss, gives the six steps we followed and a free template, and then shows how to prioritise the results. If you are planning the next batch of posts, our guide to <a href="/blog/topical-map-seo">topical maps</a> shows how to organise them.</p>

<h2>What Is a Content Gap? (Content Gap Meaning)</h2>
<p>The content gap meaning is simple: a topic your audience wants and your site does not cover, or covers badly. There are two kinds. A <strong>missing page</strong> means you have nothing on the topic. A <strong>weak page</strong> means you have a page, but it does not answer the search well enough to rank, for example because it is thin, out of date, or built for a different intent. They need different fixes, and a good analysis separates them. In our data, the near-page-1 queries (position 11 to 30) split almost evenly: ${SC} of ${SD} have a page that matches, so the job is to improve it, and ${SN} do not, so the job is to write one.</p>

<h2>Content Gap vs Keyword Gap</h2>
<p>${D.keywordGap} of the ${D.ok} guides cover the keyword gap by name. A keyword gap is a list of terms your competitors rank for and you do not. A content gap is broader: it includes topics, formats and questions, not only keywords. The two overlap, and a keyword gap report is one of the best sources for the content gap, but a keyword list alone can mislead. A query might have no exact page and still be answered well by a page with a different title. That is why we match each query to a page before we call it a gap.</p>

<h2>What ${D.ok} Ranking Guides Say About Content Gap Analysis</h2>
${h.fig('serp', 'Table of what 5 pages on content gap analysis say: competitors and steps in all 5, AI in all 5, keyword gaps in 4, and no page offering a template')}
<p>The median guide has about ${h.f(D.median)} words. They agree on the shape: pick competitors, find what they cover, and fill the holes. ${D.prioritize} of ${D.ok} talk about prioritising, ${D.funnel} link the gap to the buyer journey, and ${D.cta} end with a sign-up or demo prompt. Only ${D.intent} cover search intent and ${D.cluster} cover topic clusters, which is where we think gap analysis goes wrong: a topic can be a gap because it does not fit your site's focus. And <strong>${D.template} of ${D.ok} give a template</strong>, even though "content gap analysis template" is a search of its own. We give one below.</p>

<h2>Our Own Check: ${OWN.gaps} of ${f(OWN.withImp20)} Queries Had No Matching Page</h2>
<p>We used our Search Console export of 28 October 2026. It lists our top 1,000 queries, and ${f(OWN.withImp20)} of them have 20 or more impressions. For each one we asked: does any post or tool have a title or URL slug that contains all the words of the query? We counted a word as matching when its stem matched, so "companies" matches "company". This is a rough test, so a query it marks as a gap may still be partly answered, and a match does not mean the page is good. Still, it is a fast way to see where to look.</p>
${h.fig('ours', 'Table of our own content gap check: 998 queries, 443 with a page holding all the words, 555 without, 274 near page 1 of which 142 have a page and 132 do not')}
<p>The result: <strong>${OWN.covered} queries have a matching page and ${OWN.gaps} do not.</strong> The ${OWN.gaps} unmatched queries account for ${f(OWN.gapImp)} of our ${f(OWN.totalImp)} impressions, ${IP}%. Most of the largest are local searches, for example for towns where no page title or URL holds both the town and the service. Some are different wording of a topic we do cover, such as "sitemap update frequency" and "llm seo check", which have no page with those words in the title or URL. We would not write a page for every one. We would read each cluster, check the intent, and decide.</p>
${h.info('Infographic of content gap analysis: all 5 ranking guides give steps and name competitors, none gives a template, and on our own Search Console 555 of 998 queries had no page whose title or slug held all their words')}

<h2>How to Do a Content Gap Analysis: Six Steps</h2>
<ol>
<li><strong>List what you already rank for.</strong> Export your queries from Search Console, with clicks, impressions and position. Google's help page on the ${L('https://support.google.com/webmasters/answer/7576553', 'Performance report')} explains each column, and our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> shows where to find it. Start with the last three months.</li>
<li><strong>Map each query to a page.</strong> For every query, find the page that should answer it. A spreadsheet with one row per query and one column for the page works. Our <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> can do the matching for a list.</li>
<li><strong>Mark the gaps.</strong> A row with no page is a missing page. A row with a page at position 11 to 30 is a weak page. A row with a page on page one is covered.</li>
<li><strong>Add competitor topics.</strong> Now look outward. List three to five sites that rank for your topics and note the subjects they cover that you do not. A keyword tool with a gap report speeds this up, and so does reading their category pages.</li>
<li><strong>Prioritise.</strong> Rank each gap by demand, how close you are, how well it fits your site and how much work it needs.</li>
<li><strong>Act and re-check.</strong> Write or improve the pages, then compare Search Console in four to six weeks.</li>
</ol>
${h.fig('steps', 'Table of the six steps of a content gap analysis: list what you rank for, map each query to a page, mark the gaps, add competitor topics, prioritise, and act and re-check')}

<h2>A Worked Example: One Gap Cluster From Our Own Data</h2>
<p>Take the queries in our 28 October export that contain the word "kent". There are 24 of them, with 3,622 impressions between them, <strong>0 clicks</strong> and an average position of about 61 (weighted by impressions). The biggest are "seo company kent" (454 impressions, position 48.6), "seo kent" (395, position 82.8) and "seo agency kent" (355, position 84.3). Step 2 shows we had no page with Kent in the title or URL, only general city listicles. Step 3 marks it as a missing page. Step 4, a look at the pages that rank, showed us that the useful answer is a list of real, checkable agencies with addresses. That told us what to build: a verified local page, not another generic list. It is also why we built our Ramsgate, Ashford and Folkestone posts from addresses we could check. Without the analysis we would have kept adding the same kind of page and wondering why it did not rank.</p>

<h2>Content Gap Analysis for a Small Site</h2>
<p>You do not need a big tool budget. If your site is new or small, start with the pages you already have: list the queries Search Console shows, even if they are few, and look for ones with impressions and no clicks. Those are your first gaps, because Google already thinks you are relevant. Then look at three competitors, not ten, and note one topic each that you can cover better. A short, honest list that you finish beats a long one that you never use.</p>

<h2>Competitive Content Gap Analysis: What to Look For</h2>
<p>A competitive content gap analysis asks what your competitors cover that you do not. All ${D.ok} guides recommend it. Choose competitors who rank for your topics, not just businesses in your industry: a site that ranks for your search terms is your competitor in search even if it does not sell what you sell. For each, note the topics, the formats (guide, tool, template, comparison) and the angle. Then ask what they miss. A gap is most useful when you can say something they do not: our own data, a clearer method, or a tool. We ask this before every post.</p>

<h2>Content Gap Analysis Template (Free to Copy)</h2>
<p>Copy this table into a spreadsheet and fill one row per query or topic. The columns do the work of steps 2 to 5.</p>
<table><thead><tr><th>Query or topic</th><th>Monthly demand</th><th>Our page</th><th>Position</th><th>Gap type</th><th>Competitor angle</th><th>Action</th><th>Priority</th></tr></thead><tbody>
<tr><td>sitemap update frequency</td><td>209 impressions</td><td>None with these words</td><td>58.5</td><td>Missing page</td><td>Short answer, how often to resubmit</td><td>Write a post</td><td>High</td></tr>
<tr><td>seo company kent</td><td>288 impressions</td><td>None with these words in the title or URL</td><td>41.9</td><td>Weak page</td><td>Local proof and addresses</td><td>Improve or add a verified post</td><td>High</td></tr>
<tr><td>(your query)</td><td>from Search Console</td><td>URL or none</td><td>average</td><td>Missing, weak or covered</td><td>What they do better</td><td>Write, improve or skip</td><td>High, medium or low</td></tr>
</tbody></table>
<p>The first two rows use real numbers from our own export. Fill in your own, and add a date so you can see how the list changes.</p>

<h2>How to Prioritise Content Gaps</h2>
<ul>
<li><strong>Demand.</strong> Impressions in Search Console show what people already see you for. Search volume from a keyword tool shows what you do not rank for yet.</li>
<li><strong>Distance.</strong> A page at position 11 to 20 needs a push. A page at position 80 needs a rethink. Our near-page-1 group has ${SD} queries.</li>
<li><strong>Fit.</strong> A gap is only worth filling if it matches what you want to be known for. Check it against your topical map.</li>
<li><strong>Effort.</strong> Updating a page takes less than writing a new one. Improve the weak pages first.</li>
<li><strong>Difficulty.</strong> Low-competition keywords give new pages a chance. See our guide to <a href="/blog/long-tail-low-competition-keywords">long-tail low-competition keywords</a>.</li>
</ul>

<h2>Advanced Content Gap Analysis</h2>
<p>An advanced content gap analysis goes past the keyword list in four ways. First, <strong>intent</strong>: check what the top results actually are (guides, tools, product pages) before you decide the format. Second, <strong>depth</strong>: compare your page's sections with the ones that rank and note what is missing, not just the word count. Third, <strong>freshness</strong>: a page can be a gap simply because the facts are out of date. Fourth, <strong>AI search</strong>: ${D.ai} of ${D.ok} guides mention AI, which suggests gaps now include questions that people ask AI tools. We have not measured whether filling those gaps changes citations, so we treat that as a hypothesis. Our <a href="/blog/topical-map-seo">topical map guide</a> shows how to tie the pieces together.</p>

<h2>Content Gap Analysis Tips</h2>
<ul>
<li><strong>Use your own data first.</strong> Search Console shows real demand for your site, and it is free.</li>
<li><strong>Separate missing from weak.</strong> They need different work.</li>
<li><strong>Do not copy competitors.</strong> A gap is a chance to add something, not repeat their page.</li>
<li><strong>Cluster before you write.</strong> One page can answer many close queries. Our <a href="/tools/keyword-grouping-tool">keyword grouping tool</a> groups them.</li>
<li><strong>Check for cannibalisation.</strong> Before writing a page for a gap, make sure another page does not already target the same keyword.</li>
<li><strong>Re-run it every quarter.</strong> Gaps move as you publish and as search changes.</li>
</ul>

<h2>Content Gap Analysis for a Content Audit</h2>
<p>A gap analysis looks at what is missing, and a content audit looks at what you have. ${D.audit} of ${D.ok} guides link the two. They fit together: the audit tells you which pages to keep, improve or remove, and the gap analysis tells you what to add. Our guide to <a href="/blog/content-audit-seo">content audits</a> covers the first half.</p>

<h2>Common Content Gap Analysis Mistakes</h2>
<ul>
<li><strong>Treating every gap as a to-do.</strong> Most lists are too long. Fill the ones that fit your focus.</li>
<li><strong>Judging by title alone.</strong> A page may answer a query without naming it. Our own check is only a first filter.</li>
<li><strong>Ignoring weak pages.</strong> ${SC} of our ${SD} near-page-1 queries already have a page. The fix is an update.</li>
<li><strong>Relying on one tool.</strong> Tool data is an estimate. Compare it with Search Console.</li>
<li><strong>Not measuring.</strong> If you do not re-check, you cannot tell which gaps paid off.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a content gap analysis?', `A check of which topics your audience searches for that your site does not yet answer well. It compares what people look for with what you have published, then lists the missing and weak pages.`],
    ['What is a content gap?', `A topic your audience wants that your site does not cover, or covers badly. It can be a missing page or a weak page, and the two need different fixes.`],
    ['How do you do a content gap analysis?', `List the queries you rank for, map each to a page, mark the gaps, add competitor topics, prioritise and then act and re-check. We follow those six steps on our own Search Console data.`],
    ['What is the difference between a content gap and a keyword gap?', `A keyword gap is a list of terms competitors rank for and you do not. A content gap is broader and includes topics, formats and questions. Keyword gap reports are a good input.`],
    ['What is a competitive content gap analysis?', `It looks at what competitors who rank for your topics cover that you do not. Choose competitors by search results, not just by industry.`],
    ['Is there a content gap analysis template?', `Yes, the table above. It has one row per query with demand, your page, position, gap type, competitor angle, action and priority. None of the ${D.ok} guides we read offered one.`],
    ['How often should I run a content gap analysis?', `Every quarter is a reasonable start. Gaps change as you publish and as search changes, and Search Console data is free to re-check.`],
    ['What tools do I need for a content gap analysis?', `Search Console for your own queries and a spreadsheet are enough to begin. A keyword tool with a gap report helps with the competitor step, though ${D.tools} of ${D.ok} guides name one.`],
    ['How do I know which gaps to fill first?', `Rank them by demand, how close you are to page one, fit with your focus and effort. Improving weak pages usually comes before writing new ones.`]
  ])}

<p>Want a content gap analysis built from your own Search Console data? <a href="/contact">Talk to us</a> and we will show you what is missing and what to fix first.</p>`
});
