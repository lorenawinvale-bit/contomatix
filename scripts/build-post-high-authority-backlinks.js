// node scripts/build-post-high-authority-backlinks.js [--write] — data: 6 readable ranking pages (Google US, 24 Oct 2026) + 5 Google Search Central docs searched the same day. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-high-authority-backlinks-2026-10-24.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-2026-10-24.json');
const D = { shown: 8, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), da: c('metricDA'), dr: c('metricDR'), as: c('metricAS'), googleNo: c('googleNo'), relevance: c('relevance'), traffic: c('traffic'), pr: c('pr'), buy: c('buy'), policy: c('policy'), threshold: c('threshold'), pagerank: c('pagerank'), gdoc: c('googleDoc'), dated: c('date'), gdocs: G.length, gAuth: G.reduce((a, g) => a + g.terms.domainAuthority + g.terms.domainRating + g.terms.authorityScore, 0), gPR: G.reduce((a, g) => a + g.terms.pageRank, 0) };
const exp = { shown: 8, ok: 6, median: 1531, da: 6, dr: 4, as: 3, googleNo: 2, relevance: 4, traffic: 4, pr: 4, buy: 3, policy: 2, threshold: 1, pagerank: 2, gdoc: 2, dated: 0, gdocs: 5, gAuth: 0, gPR: 7 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
if (!G[2].prSnip.includes('PageRank is just one of those') || !G[3].prSnip.includes('one of our core ranking systems')) throw new Error('Google PageRank text changed');
console.log(JSON.stringify(D));
build({
  slug: 'high-authority-backlinks', category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-24',
  title: "High Authority Backlinks: Why DA and DR Are Not Google's",
  excerpt: `High authority backlinks explained: ${D.da} of ${D.ok} top pages define them by DA, yet DA, DR and authority score appear 0 times in ${D.gdocs} Google docs. A six-factor test to judge any link.`,
  donut: [['HIGH AUTHORITY', 'BACKLINKS'], [['Know the', 'Metrics'], 'Read Google', ['Judge', 'Relevance'], 'Check the Audience', ['Verify Editorial', 'Placement']]],
  cover: { badge: 'REAL SERP CHECK', search: 'high authority backlinks', card: `Pages read: ${D.ok} of ${D.shown}`, lines: [`Define authority by DA: ${D.da} of ${D.ok}`, `Mention DR: ${D.dr} of ${D.ok}`, `Mention relevance: ${D.relevance} of ${D.ok}`, `Google docs using DA or DR: 0 of ${D.gdocs}`], last: "Metrics are third-party numbers", big: `0 of ${D.gdocs}`, k1: 'Google docs searched', k2: 'mention DA, DR or score', title: 'High Authority Backlinks', sub: "Why DA and DR are not Google's" },
  info: { title: `High Authority Backlinks: ${D.ok} Pages Read`, sub: 'Organic results for "high authority backlinks", Google US, 24 October 2026', leftTitle: 'What the pages lean on', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Domain Authority (DA)', sub: 'named', n: D.da }, { label: 'Domain Rating (DR)', sub: 'named', n: D.dr }, { label: 'Relevance', sub: 'mentioned', n: D.relevance }, { label: 'Traffic', sub: 'mentioned', n: D.traffic }, { label: 'Say Google ignores these metrics', sub: 'explicitly', n: D.googleNo }],
    rightTitle: 'Judge a link on six things', rightTag: 'Our test', items: [{ t: 'Relevance', s: 'same topic or audience' }, { t: 'Real readers', s: 'not just a metric' }, { t: 'Editorial choice', s: 'someone chose it' }, { t: 'Few neighbours', s: 'not a link crowd' }, { t: 'Indexed and live', s: 'Google can see it' }, { t: 'Honest attribute', s: 'paid is marked' }],
    big: `0 of ${D.gdocs}`, noteHtml: `Google docs we searched use <em>DA, DR or authority score</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for high authority backlinks say`, sub: `Organic results for "high authority backlinks" read on 24 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Domain Authority (DA)', `${D.da} of ${D.ok}`], ['Domain Rating (DR)', `${D.dr} of ${D.ok}`], ['Authority score, trust flow or similar', `${D.as} of ${D.ok}`], ['Relevance', `${D.relevance} of ${D.ok}`], ['Traffic', `${D.traffic} of ${D.ok}`], ['Digital PR or press', `${D.pr} of ${D.ok}`], ['Buying or paid links', `${D.buy} of ${D.ok}`], ['A numeric DA or DR threshold', `${D.threshold} of ${D.ok}`], ['Say Google does not use these metrics', `${D.googleNo} of ${D.ok}`], ["Name Google's policy", `${D.policy} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a publish or update date', `${D.dated} of ${D.ok}`]] },
    google: { title: 'What Google\'s own documents say', sub: 'Five Google Search Central documents searched on 24 October 2026 (spam policies, qualifying outbound links, SEO starter guide, ranking systems guide, how Search works).', head: ['Term', 'Mentions in 5 documents'], lastBold: false,
      rows: [['Domain authority', '0'], ['Domain rating', '0'], ['Authority score', '0'], ['PageRank', String(D.gPR)], ['PageRank described as', 'One of many ranking signals']] },
    test: { title: 'A six-factor test for any backlink', sub: 'Our own scoring prompts. Give each factor 0, 1 or 2 and total out of 12. These are not Google metrics.', head: ['Factor', 'Question to ask', 'Where to check'], lastBold: false,
      rows: [['Relevance', 'Is the page about my topic or for my audience?', 'Read the page'], ['Real readers', 'Does the site have an audience beyond a metric?', 'Search the brand name'], ['Editorial choice', 'Did a person choose to link?', 'Read the context'], ['Neighbours', 'How many other commercial links are on the page?', 'Outbound link checker'], ['Indexed and live', 'Is the page in Google?', 'site: search, Search Console'], ['Attribute', 'Is a paid link marked sponsored?', 'Dofollow link checker']] }
  },
  content: h => `${h.updated}

<p><strong>High authority backlinks</strong> are links from sites that the person using the phrase considers strong, trusted or well linked-to. The catch is in the "considers". We read ${D.ok} pages that rank for the term on 24 October 2026. All ${D.da} of ${D.ok} lean on Domain Authority, ${D.dr} on Domain Rating and ${D.as} on similar scores, but across the ${D.gdocs} Google Search Central documents we searched, Domain Authority, Domain Rating and authority score appear ${D.gAuth} times.</p>

<p>This guide shows what the ranking pages say, what Google says about links and PageRank, why a metric is a poor stand-in for value, and a six-factor test you can use on any link. For the basics, start with <a href="/blog/what-is-link-building">what link building is</a> and <a href="/blog/relevant-backlinks">relevant backlinks</a>.</p>

<h2>What "High Authority" Means to the Ranking Pages</h2>
${h.fig('serp', 'Table of what 6 pages ranking for high authority backlinks say: DA named by 6 of 6, DR by 4, relevance and traffic by 4, only 2 say Google does not use these metrics and 2 link Google documentation')}
<p>${D.da} of the ${D.ok} pages describe authority through Domain Authority, a score created by a third-party SEO company. ${D.dr} use Domain Rating from another, and ${D.as} name further scores such as trust or authority scores. Only ${D.threshold} gives a numeric threshold for what counts as high. Relevance and traffic appear in ${D.relevance} of ${D.ok} each, digital PR in ${D.pr}, and buying links in ${D.buy}. The pages run a median of ${h.f(D.median)} words, and none shows a publish or update date.</p>
<p>The weak points are worth noticing. Only ${D.googleNo} of ${D.ok} say outright that Google does not use these metrics, ${D.policy} name Google's policy, and ${D.gdoc} link to Google's documentation. A reader can leave believing that DA is a Google measure.</p>

<h2>What Google Says About Links and Authority</h2>
${h.fig('google', "Table of Google documents searched on 24 October 2026: domain authority, domain rating and authority score appear 0 times in 5 documents, while PageRank appears 7 times and is described as one of many ranking signals")}
<p>Google's SEO starter guide says that PageRank uses links and is one of the fundamental algorithms at Google, but that there is much more to Search than links: it has many ranking signals and PageRank is just one of them. Its ranking systems guide lists link analysis systems and PageRank among its core ranking systems, used since Google first launched, and says how PageRank works has evolved a lot. Neither document mentions Domain Authority, Domain Rating or authority score.</p>
<p>So where do DA and DR come from? From companies that crawl the web and build their own link databases, then model each site's link strength on their own scale. That is useful for comparing sites on the same scale and for spotting patterns, but the number is the company's estimate, not a Google signal. Treat it as a shortcut for prospecting, not as a promise about ranking.</p>

<h2>Why a Metric Is a Poor Stand-In for Value</h2>
<ul>
<li><strong>Metrics move with the data source.</strong> Different tools give the same site different numbers, so a threshold such as "DR 50 or higher" is tool-specific.</li>
<li><strong>High scores can be bought.</strong> Expired domains and networks can carry strong link histories without any real audience. See <a href="/blog/pbn-backlinks">PBN backlinks</a>.</li>
<li><strong>A strong site can still be the wrong place.</strong> A link from a large site on an unrelated topic may do little for a niche page.</li>
<li><strong>A weak-looking site can be ideal.</strong> A small, respected trade publication may have a low score and exactly the readers you want.</li>
<li><strong>The page matters, not just the domain.</strong> A link on a page that is not indexed, or buried among fifty other links, passes little.</li>
</ul>

<h2>A Six-Factor Test for Any Backlink</h2>
${h.fig('test', 'Table of a six-factor backlink test: relevance, real readers, editorial choice, neighbours, indexed and live, and honest attribute, with the question and where to check for each')}
<p>Instead of asking "how high is its DA?", ask six questions and score each 0, 1 or 2. A total of 9 or more out of 12 is a strong link by our rubric; 5 or fewer is weak. The numbers are our own scale, a prompt for judgement, not a Google measure.</p>
<ol>
<li><strong>Relevance.</strong> Is the page about your topic, or read by your audience? ${D.relevance} of ${D.ok} pages mention relevance, but it is rarely the first thing they ask.</li>
<li><strong>Real readers.</strong> Does the site have visitors, an author and a point of view? Search the brand name and look for signs of life.</li>
<li><strong>Editorial choice.</strong> Did a person decide to link because your page helped the reader? That is what <a href="/blog/editorial-backlinks">editorial backlinks</a> are.</li>
<li><strong>Neighbours.</strong> How many other commercial links are on the same page? Paste the page into the <a href="/tools/outbound-link-checker">outbound link checker</a> to see.</li>
<li><strong>Indexed and live.</strong> Is the page in Google, and is the link still there? See <a href="/blog/how-to-index-backlinks">how to index backlinks</a>.</li>
<li><strong>Attribute.</strong> If the link was paid for, is it marked sponsored or nofollow? Check with the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.</li>
</ol>
<p>For a fuller scoring of prospects before you contact them, use the <a href="/tools/link-prospect-scorer">link prospect scorer</a> and the <a href="/blog/link-prospecting">link prospecting guide</a>.</p>
<p>A practical way to use the scores is as a decision rule, not a verdict. Pursue links that score 9 or more even when their domain metric is modest. Hold links in the middle until you can improve the pitch or find more context. Skip links at 5 or below however attractive the metric, and never pay for them. Write the score in your sheet next to the link, so that months later you can see what you decided and why.</p>

${h.info('Infographic of what 6 pages ranking for high authority backlinks lean on: DA named by 6, DR by 4, relevance by 4, traffic by 4, and only 2 saying Google does not use these metrics, plus a six-factor test for judging a link')}

<h2>Scoring Three Example Links</h2>
<p>These are illustrative cases, not real sites. They show how the six factors can disagree with a metric.</p>
<ol>
<li><strong>A large general news site, unrelated topic, link buried in a list of 30.</strong> Relevance 0, real readers 2, editorial choice 1, neighbours 0, indexed 2, attribute 2. Total 7 of 12. The domain score would look excellent, but the page does little for your topic.</li>
<li><strong>A small trade publication, same topic, link inside a paragraph, two other links on the page.</strong> Relevance 2, real readers 2, editorial choice 2, neighbours 2, indexed 2, attribute 2. Total 12 of 12. Its domain score may look modest, yet this is the link you want.</li>
<li><strong>A "partner" page with 60 links to unrelated businesses.</strong> Relevance 0, real readers 0, editorial choice 0, neighbours 0, indexed 1, attribute 1. Total 2 of 12. Whatever the domain metric says, this is closer to the link spam examples in Google's policy than to an endorsement.</li>
</ol>
<p>The point is not the exact numbers. It is that a six-question check catches what a single score hides.</p>

<h2>When a Metric Is Still Useful</h2>
<p>None of this means DA, DR and similar scores are useless. They are fast, they let you sort a long prospect list, and they are reasonable for comparing sites inside one tool. Use them for these jobs:</p>
<ul>
<li><strong>Sorting a list</strong> so you read the most promising pages first.</li>
<li><strong>Spotting outliers</strong>, such as a site with a very high score and almost no traffic, which deserves a closer look.</li>
<li><strong>Tracking your own trend</strong> in a single tool over time.</li>
</ul>
<p>Do not use them to set a fixed rule such as "never accept a link below 40", to compare numbers across tools, or to promise a client a result. And never treat a high number as a substitute for opening the page.</p>

<h2>A 30-Day Plan to Raise the Quality of Your Links</h2>
<ol>
<li><strong>Week 1: audit.</strong> Export your links from Search Console and score the ten most important ones with the six-factor test. Note which are editorial, placed or paid.</li>
<li><strong>Week 2: reclaim.</strong> List pages that mention your brand without linking and ask for the link. Start with the most relevant ones.</li>
<li><strong>Week 3: build.</strong> Pick one page that deserves citations, such as a tool or a data-led guide, and improve it. Then list ten pages that already cite weaker sources.</li>
<li><strong>Week 4: pitch.</strong> Send personal emails to those ten, using the <a href="/tools/outreach-email-generator">outreach email generator</a> for a draft you then edit. Log replies.</li>
</ol>
<p>At the end of the month, rescore your top ten links and add the new ones. If the average score has gone up, you are improving link quality, whatever any third-party metric says.</p>

<h2>How to Get Strong Links Without Chasing a Score</h2>
<ul>
<li><strong>Make something worth citing.</strong> Tools, data and clear explanations earn links from sites of every size. See <a href="/blog/linkable-assets">linkable assets</a>.</li>
<li><strong>Reclaim your mentions.</strong> Sites that already name you are the easiest to convert. See <a href="/blog/link-reclamation">link reclamation</a>.</li>
<li><strong>Pitch pages that already cite similar sources.</strong> Then explain what yours adds.</li>
<li><strong>Use digital PR with real data.</strong> ${D.pr} of ${D.ok} pages mention it.</li>
<li><strong>Be open about paid placements.</strong> If you pay, mark the link sponsored. See <a href="/blog/white-hat-link-building">white hat link building</a>.</li>
<li><strong>Plan the mix.</strong> Our <a href="/blog/link-acquisition">link acquisition</a> guide scores methods on control, cost, speed and risk.</li>
</ul>

<h2>Our Own Profile Through the Six Factors</h2>
<p>We ran our own links through the test. In Search Console on 21 October 2026 we had 24 external links from 10 sites. Twenty-two sit on directory or listing pages and only 2 are editorial mentions inside articles, so on the third factor, editorial choice, most of our profile scores low. Seventeen of the 24 point to the home page, so deep pages get little. Eight of the 14 pages we found naming our brand do not link at all. The numbers are from <a href="/blog/what-is-link-building">what is link building</a> and <a href="/blog/link-reclamation">link reclamation</a>.</p>
<p>A domain metric would tell us little here. The six factors tell us exactly what to do next: ask for the unlinked mentions, build pages worth citing, and aim new links at inner pages. It is one young site, not a benchmark, but the test works on any profile.</p>

<h2>What Google Says About Paid and Qualified Links</h2>
<p>A strong link bought openly is different from a strong link bought quietly. Google's guidance on qualifying outbound links asks site owners to mark advertisements and paid placements with <code>rel="sponsored"</code>, user-generated content links with <code>rel="ugc"</code>, and other links they would rather not be associated with using <code>rel="nofollow"</code>. Its spam policies list buying or selling links for ranking purposes as link spam. If you pay for a placement because the audience is right, mark it and report it as paid. If you pay for a placement because the metric is high and want ranking credit to pass, you are in the territory the policy describes.</p>

<h2>Common Mistakes With "High Authority" Links</h2>
<ul>
<li><strong>Treating DA or DR as a Google score.</strong> Neither appears in the Google documents we searched.</li>
<li><strong>Buying links by metric alone.</strong> ${D.buy} of ${D.ok} pages mention buying links, and Google lists buying or selling links for ranking purposes as link spam unless qualified.</li>
<li><strong>Ignoring relevance.</strong> A relevant mid-sized site often beats an irrelevant large one.</li>
<li><strong>Ignoring the page.</strong> The domain may be strong while the specific page is thin, unindexed or crowded with links.</li>
<li><strong>Setting a fixed threshold.</strong> Scores differ between tools and change over time.</li>
<li><strong>Forgetting your own pages.</strong> Links help a page that deserves to rank. Check the basics with the <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a>.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "high authority backlinks" on Google US, 24 October 2026. ${D.shown} were listed; ${D.ok} were readable pages that we counted (forums and Q&A pages were not). A topic counts once per page when its term appears in the text, so a count shows presence, not quality of explanation.</li>
<li>Google data comes from searching five Search Central documents for the terms shown and reading the PageRank passages. It does not cover every Google page.</li>
<li>The six-factor test and its scoring are our own prompts. They are not a Google measure and not a prediction of rankings.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Every top page defines authority through DA, DR or a similar third-party score.</li>
<li>Domain Authority, Domain Rating and authority score appear 0 times in the ${D.gdocs} Google documents we searched; PageRank is described as one signal among many.</li>
<li>Relevance, real readers and editorial choice say more about a link than a number.</li>
<li>Score a link on six factors before you chase it or pay for it.</li>
<li>Mark paid links sponsored, and earn links with assets worth citing.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What are high authority backlinks?', 'They are links from sites considered strong or trusted, usually judged by third-party scores such as Domain Authority or Domain Rating rather than by anything Google publishes.'],
    ['Does Google use Domain Authority?', 'No Google document we searched mentions Domain Authority, Domain Rating or authority score. Google describes PageRank as one of many ranking signals.'],
    ['What is a good DA or DR for a backlink?', 'There is no Google threshold, and scores differ by tool. Judge relevance, readers, editorial choice and neighbours as well as the number.'],
    ['Are high DR backlinks always better?', 'No. A relevant link from a smaller site with the right audience can be worth more than an irrelevant link from a large one.'],
    ['Can I buy high authority backlinks?', "Buying or selling links for ranking purposes is on Google's link spam list. Paid placements should be marked sponsored or nofollow."],
    ['How do I check a site\'s authority?', 'Third-party tools give their own scores. Also check relevance, whether the site has real visitors, and whether the specific page is indexed.'],
    ['Are .edu and .gov links special?', 'None of the six ranking pages we read mentions them, and we found no statement in the Google documents we searched giving them special weight. Judge them like any other link.'],
    ['How many high authority backlinks do I need?', 'Google gives no number. See <a href="/blog/how-many-backlinks-do-i-need">how many backlinks do I need</a> for a method based on the pages you want to rank.'],
    ['What is the fastest way to earn strong links?', 'Reclaim existing mentions and publish something worth citing. Both are slower than buying and safer.']
  ])}
`
});
