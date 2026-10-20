// Builds the "long tail low competition keywords" post + assets. node scripts/build-post-long-tail-low-competition-keywords.js [--write]
// Data: Search Console Performance report for contomatix.com (top 1,000 queries, 90 days to 17 Oct 2026, read 20 Oct 2026); our keyword pool (156 topics, Ahrefs pull of 14 Oct 2026); 4 readable organic results for "long tail low competition keywords" (Google US, 20 Oct 2026). Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'long-tail-low-competition-keywords';
const R = require('../../keyword-research/serp-long-tail-low-competition-keywords-2026-10-20.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], intent: c(o => o.intent), conversion: c(o => o.conversion), difficulty: c(o => o.difficulty), volume: c(o => o.volume), headTerm: c(o => o.headTerm), searchConsole: c(o => o.searchConsole), paa: c(o => o.paa), threeWords: c(o => o.threeWords), stat: c(o => o.statClaim), ctr: c(o => o.ctr), position: c(o => o.position) };
const exp = { ok: 4, median: 3480, intent: 4, conversion: 4, difficulty: 4, volume: 4, headTerm: 4, searchConsole: 3, paa: 3, threeWords: 2, stat: 1, ctr: 2, position: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// Search Console, top 1,000 queries, 90 days to 17 Oct 2026
const G = { queries: 1000, imp: 69197, clicks: 5,
  b: { '1-2': { n: 116, i: 10873, share: 15.7, pos: 49.0 }, '3-4': { n: 658, i: 47333, share: 68.4, pos: 42.9 }, '5+': { n: 226, i: 10991, share: 15.9, pos: 39.0 } },
  top10: 4.5, striking: { n: 155, i: 11684 }, page1: { n: 41, i: 3858 }, niche: { n: 97, i: 4335, pos: 70.1, clicks: 1 } };
// keyword pool (Ahrefs, 14 Oct 2026)
const P = { topics: 156, median: 200, max: 3600, min: 100, kd0: 96, threePlus: 138, medWords: 4 };
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['LONG TAIL', 'KEYWORDS'], [['Pick by', 'Specific Intent'], 'Check the SERP', ['Merge Near', 'Duplicates'], 'Map to One Page', ['Track the', 'Position']]);
L.cover(SLUG, { badge: 'REAL SEARCH DATA', search: 'long tail low competition keywords', card: `Our top ${f(G.queries)} queries, 90 days`,
  lines: [`Impressions: ${f(G.imp)}`, `Clicks: ${G.clicks}`, `3 to 4 word queries: ${G.b['3-4'].share}% of impressions`, `5+ word queries: ${G.b['5+'].share}%`, `Top 10 queries: ${G.top10}% of impressions`],
  last: 'Specific does not mean ranked', big: `${G.clicks} clicks`, k1: `from ${f(G.imp)} impressions`, k2: 'on a long-tail-only site', title: 'Long Tail Low Competition Keywords', sub: 'What 1,000 real queries show' });
fs.writeFileSync(path.join(__dirname, 'infographic-long-tail-low-competition-keywords.html'), L.infographicHtml({
  title: `Our ${f(G.queries)} Queries: All Long Tail`, sub: 'Search Console, contomatix.com, 90 days to 17 October 2026',
  leftTitle: 'Share of impressions by query length', leftTag: 'Percent of 69,197 impressions', max: 70,
  bars: [{ label: '1 to 2 words', sub: `${G.b['1-2'].n} queries, avg position ${G.b['1-2'].pos}`, n: G.b['1-2'].share }, { label: '3 to 4 words', sub: `${G.b['3-4'].n} queries, avg position ${G.b['3-4'].pos}`, n: G.b['3-4'].share }, { label: '5 or more words', sub: `${G.b['5+'].n} queries, avg position ${G.b['5+'].pos}`, n: G.b['5+'].share }, { label: 'Top 10 queries', sub: 'no head terms at all', n: G.top10 }],
  rightTitle: 'How to use long tail well', rightTag: 'Specific only pays on page one', items: [
    { t: 'Start with positions 11 to 20', s: `${G.striking.n} of our queries sit here` }, { t: 'One page per intent', s: 'merge near-duplicate phrases' },
    { t: 'Check who ranks', s: 'weak pages mean real room' }, { t: 'Add support from links', s: 'internal first, then outreach' }],
  big: `${G.clicks} clicks`, noteHtml: `from <em>${f(G.imp)} impressions</em>. Low competition gets you seen only if you reach the top of page one.` }));
fs.writeFileSync(path.join(__dirname, 'table-long-tail-low-competition-keywords-ours.html'), L.tableHtml({ title: 'Our queries by length: impressions come from long tail, clicks do not', sub: 'Search Console top 1,000 queries, 90 days to 17 October 2026, read on 20 October 2026. Average position is weighted by impressions.',
  head: ['Query length', 'Queries', 'Impressions', 'Share', 'Avg position'], lastBold: true,
  rows: [['1 to 2 words', String(G.b['1-2'].n), f(G.b['1-2'].i), G.b['1-2'].share + '%', String(G.b['1-2'].pos)], ['3 to 4 words', String(G.b['3-4'].n), f(G.b['3-4'].i), G.b['3-4'].share + '%', String(G.b['3-4'].pos)], ['5 or more words', String(G.b['5+'].n), f(G.b['5+'].i), G.b['5+'].share + '%', String(G.b['5+'].pos)], ['All 1,000 queries', f(G.queries), f(G.imp), '100%', `${G.clicks} clicks in total`]] }));
fs.writeFileSync(path.join(__dirname, 'table-long-tail-low-competition-keywords-serp.html'), L.tableHtml({ title: `What ${D.ok} guides ranking for long tail low competition keywords say`, sub: `Organic results read on 20 October 2026 (8 listed; ${D.ok} gave a readable guide, the others were a forum thread, a tool page and pages that blocked or did not load). Sites are not named.`,
  head: ['Mentioned on the page', 'Guides'], lastBold: false,
  rows: [['Search intent', `${D.intent} of ${D.ok}`], ['Conversion, higher than head terms', `${D.conversion} of ${D.ok}`], ['Keyword difficulty or competition', `${D.difficulty} of ${D.ok}`], ['Search volume', `${D.volume} of ${D.ok}`], ['Contrast with head terms', `${D.headTerm} of ${D.ok}`], ['Search Console', `${D.searchConsole} of ${D.ok}`], ['Autocomplete or People Also Ask', `${D.paa} of ${D.ok}`], ['A word-count definition', `${D.threeWords} of ${D.ok}`], ['CTR', `${D.ctr} of ${D.ok}`], ['A percent-of-searches statistic', `${D.stat} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-long-tail-low-competition-keywords-pool.html'), L.tableHtml({ title: 'Our own low-competition keyword pool', sub: 'Pulled from Ahrefs on 14 October 2026 with volume of at least 10, difficulty of at most 15 and low-authority pages in the top five. Counts are from the pool file.',
  head: ['Measure', 'Value'], lastBold: false,
  rows: [['Topics in the pool', String(P.topics)], ['Median monthly search volume', String(P.median)], ['Range of volume', `${P.min} to ${f(P.max)}`], ['Topics with difficulty 0', String(P.kd0)], ['Topics with 3 or more words', `${P.threePlus} of ${P.topics}`], ['Median words per topic', String(P.medWords)]] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [1280, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1];
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Long tail low competition keywords</strong> are specific search phrases that few people search for and few strong pages target. We have built a content plan on them since 14 October, so we looked at what our own Search Console data says about long tail. Over 90 days, our top ${f(G.queries)} queries produced ${f(G.imp)} impressions and just ${G.clicks} clicks. Long tail brought us visibility, but not traffic, because our average position was 43. Low competition lowers the bar to rank. It does not rank you.</p>

<p>Below you will find what long tail really means, what ${D.ok} ranking guides say, what our own queries show, how we chose a pool of ${P.topics} low-competition keywords, how to find yours in Search Console, how to use several related phrases in one page and the mistakes that waste them. It sits alongside our guides to <a href="/blog/keyword-research-tools">keyword research tools</a> and <a href="/blog/ai-tools-for-seo-keyword-research">AI tools for SEO keyword research</a>.</p>

<h2>What Long Tail Keywords Really Are</h2>
<p>A long tail keyword is defined by specificity and low individual volume, not strictly by length. "Link building" is a head term. "Resource page link building" is more specific. "How to ask a resource page owner to add a link" is long tail. Most guides describe them as phrases of three or more words, which is a useful rule of thumb. Each phrase is searched rarely, but there are so many of them that, together, they make up a large share of all searches. That is why people also call keyword research for long tail the practice of looking for many small opportunities instead of one big one.</p>
<p>The same phrase can be low competition or not depending on who already ranks. A long tail phrase can still be hard if strong pages target it, and a short phrase can be easy if the results are weak. Competition is a property of the results page, which is why checking it matters.</p>

<h2>What the Ranking Guides Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/long-tail-low-competition-keywords-serp.png" alt="Table of what 4 guides ranking for long tail low competition keywords mention: search intent 4, conversion 4, difficulty 4, volume 4, contrast with head terms 4, Search Console 3, autocomplete or People Also Ask 3, a word-count definition 2, CTR 2 and a percent-of-searches statistic 1" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The case for long tail is consistent.</strong> All ${D.ok} guides cover intent, conversion, difficulty, volume and the contrast with head terms. The argument is that long tail phrases are easier to rank for and convert better.</li>
<li><strong>Few show their own numbers.</strong> Only ${D.searchConsole} of ${D.ok} mention Search Console, and only ${D.stat} cites a percent-of-searches statistic. None show how long tail performed on a real site.</li>
<li><strong>Position is underplayed.</strong> ${D.position} of ${D.ok} mention position and ${D.ctr} mention CTR, but rarely as the limiting factor that our data suggests it is.</li>
</ul>
<p>We read the guides on one day in one market, so treat the counts as a snapshot. They tell you what the advice says. The next section tells you what happened when we followed it.</p>

<h2>What Our ${f(G.queries)} Real Queries Show</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/long-tail-low-competition-keywords-ours.png" alt="Table of Contomatix's top 1,000 Search Console queries by length over 90 days: 1 to 2 words 116 queries and 15.7 percent of impressions at average position 49, 3 to 4 words 658 queries and 68.4 percent at position 42.9, 5 or more words 226 queries and 15.9 percent at position 39, with 69,197 impressions and 5 clicks in total" width="1280" height="@@OURSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Our site is almost entirely long tail.</strong> Our ten biggest queries are only ${G.top10}% of impressions. There are no head terms to lean on.</li>
<li><strong>Three- and four-word phrases do the heavy lifting.</strong> They are ${G.b['3-4'].share}% of impressions across ${G.b['3-4'].n} queries.</li>
<li><strong>Longer phrases rank slightly better.</strong> Queries of five or more words average position ${G.b['5+'].pos}, against ${G.b['3-4'].pos} for three to four words and ${G.b['1-2'].pos} for one to two. That fits the idea that specific phrases face less competition.</li>
<li><strong>But the average is still page four or five.</strong> At those positions, almost nobody clicks. We got ${G.clicks} clicks from ${f(G.imp)} impressions.</li>
<li><strong>The newest content is furthest back.</strong> The ${G.niche.n} queries in our link building, sitemap, schema and SEO tool topics have an average position of ${G.niche.pos} and produced ${G.niche.clicks} click.</li>
</ul>
<p>Impressions are not visits. Google counts an impression when your result appears in the current page of results, and a position of 43 or 70 is a page most people never open. Our guide to <a href="/blog/search-console-impressions-explained">Search Console impressions</a> explains how the number is counted and why it can mislead.</p>

<h2>Why Low Competition Is Not the Same as Easy Traffic</h2>
<p>The guides are right that long tail phrases face less competition. What they sometimes skip is that "less competition" is relative to a starting point. A brand-new page on a young site starts far behind established pages, even on a phrase few people target. Three things decide whether a long tail phrase turns into visits. The page must be <strong>indexed and understood</strong> for that phrase. It must <strong>earn enough trust</strong> to move from the back pages to page one, which usually means relevant links and good internal linking. And it must <strong>match the intent</strong> better than the pages already there. Low competition shortens the climb. It does not remove it.</p>
<p>That is why we pair our long tail plan with link building and internal linking. See <a href="/blog/internal-link-building">internal link building</a> and our <a href="/blog/link-building-campaign">link building campaign guide</a> for how.</p>

<h2>How We Chose ${P.topics} Low-Competition Keywords</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/long-tail-low-competition-keywords-pool.png" alt="Table of Contomatix's keyword pool: 156 topics, median monthly volume 200, volume range 100 to 3,600, 96 topics with difficulty 0, 138 topics with 3 or more words and a median of 4 words per topic" width="1280" height="@@POOLH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>On 14 October 2026 we pulled a pool of topics with three filters: a monthly search volume of at least 10, a keyword difficulty of at most 15 and low-authority pages already ranking in the top five. That left ${P.topics} topics. The median volume is ${P.median} searches a month, the largest is ${f(P.max)} and ${P.kd0} have a difficulty of 0. ${P.threePlus} of them have three or more words, with a median of ${P.medWords}.</p>
<p>Volume numbers from keyword tools are estimates, and difficulty scores differ between tools, so we treated them as a filter and not a promise. The third filter, weak pages in the top five, is the one that tells you the most, because it is a fact about the actual results.</p>

<h2>How to Check Competition Yourself</h2>
<ol>
<li><strong>Search the phrase.</strong> Look at the first page. Are the results focused pages that match the intent, or loosely related pages and forum threads?</li>
<li><strong>Check who ranks.</strong> Are they established sites with many links to that page, or small sites? Authority checkers show the strength of the site, and a backlink report shows the strength of the page.</li>
<li><strong>Judge the content.</strong> Is it thin, outdated or off-topic? Weak content on the first page is the best sign of room.</li>
<li><strong>Look for a gap in your own site.</strong> If you already rank on page two for a close phrase, you are nearer than a new topic would be.</li>
<li><strong>Decide if you can beat it with something new.</strong> Original data, a free tool or a clearer guide gives you a reason to rank above older pages.</li>
</ol>

<h2>How to Find Long Tail Keywords in Your Own Search Console</h2>
<p>Search Console is the best free source because it shows queries you already appear for. Open Performance, choose Queries and set a three- or twelve-month range. Sort by impressions and add the position column. Then look at three groups. Queries between positions 11 and 20 are your closest opportunities: ${G.striking.n} of our ${f(G.queries)} queries sit there, with ${f(G.striking.i)} impressions between them. Queries already on page one (${G.page1.n} of ours) show what is working and can be reinforced. Queries far back with real impressions show topics Google associates you with but not yet trusts you for. Export the list, group near-duplicate phrases and map each group to one page using the <a href="/tools/keyword-mapping-tool">keyword mapping tool</a>.</p>

<h2>Using Several Long Tail Phrases in One Page</h2>
<p>Because long tail phrases are so specific, one page can often serve five or six of them without competing with itself. Choose one primary phrase for the title and the opening, then work close variants into headings, the FAQ and the body, each answering a slightly different question. We do this for every post, and we merge near-duplicate phrases, such as two ways of saying the same thing, into a single page instead of writing two. Writing two pages for one intent makes them compete. Our <a href="/blog/local-keyword-research">local keyword research guide</a> shows the same method for location phrases.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-long-tail-low-competition-keywords.png" alt="Infographic of the share of Contomatix's 69,197 impressions by query length and how to use long tail keywords well" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Examples From Our Own Plan</h2>
<p>To make this concrete, here are phrases from our pool and what we did with them. "Check backlinks of website" has around 1,750 monthly searches and became one guide on the free Search Console method, with close variants such as how to find backlinks for a website and backlink profile checker worked into headings and the FAQ. "White label link building" has around 2,050 searches and became a guide on what to ask a provider, with white label backlinks and private label link building as supporting phrases. "Schema markup validator" became a free tool, because the results for that phrase are tools, not articles. The pattern is consistent: look at what the results page rewards, make that asset and cover the close variants inside it. The same logic led us to build a <a href="/tools/sitemap-finder">sitemap finder</a> as a tool, since every result for that phrase was a tool.</p>

<h2>What to Do With a Phrase You Cannot Rank For Yet</h2>
<p>If a page sits on page four, do not rewrite it every week. Check that it is indexed, that its title and headings match the phrase, that it has internal links from related pages and that it answers the question better than the pages above it. Then give it time and, where it makes sense, earn a few relevant external links to it. Look again after a month. If the position has not moved at all after several months, ask whether the intent was wrong, and whether a tool, a template or a shorter page would suit the phrase better.</p>

<h2>Common Long Tail Keyword Mistakes</h2>
<ul>
<li><strong>Treating impressions as traffic.</strong> Impressions at position 40 or worse rarely produce clicks.</li>
<li><strong>Writing one page per phrase.</strong> Near-duplicate phrases belong on one page.</li>
<li><strong>Trusting volume alone.</strong> A phrase with 100 monthly searches can still be hard if strong pages rank.</li>
<li><strong>Ignoring intent.</strong> A phrase that suits a tool or a template will not rank with a long essay.</li>
<li><strong>Stopping at publish.</strong> New pages need internal links, relevant external links and time.</li>
</ul>

<h2>A Simple Monthly Routine for Long Tail Work</h2>
<p>Keep the routine small enough to repeat. At the start of the month, export the queries report and note how many queries sit on page one, on page two and beyond. Pick the five queries on page two with the most impressions and check the page that ranks for each. Improve the title, the headings and the answer where the page falls short, and add two or three internal links from related pages. At the end of the month, compare the same five queries. This takes an hour or two and tells you far more than a long list of keywords you never act on, because it ties effort to a measured result.</p>

<h2>How We Read the Data</h2>
<ul>
<li>Search Console data is the top ${f(G.queries)} queries for contomatix.com over 90 days to 17 October 2026, as shown in the Performance report on 20 October 2026. Search Console shows up to 1,000 rows, so rarer queries are not included.</li>
<li>Average position is weighted by impressions. Position buckets and query length are our grouping.</li>
<li>The keyword pool is our own selection from an Ahrefs pull on 14 October 2026. Volume and difficulty figures are estimates from that tool.</li>
<li>We read ${D.ok} guides from one Google US search on 20 October 2026. Counts show a term appears, not how well it is explained.</li>
<li>Our site is young and its content is new, so its position data should not be read as typical.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Long tail means specific, low-volume phrases. Low competition is a property of the results page.</li>
<li>On our own site, ${G.b['3-4'].share}% of impressions come from three- and four-word queries, and the average position is still 43.</li>
<li>${f(G.imp)} impressions produced ${G.clicks} clicks, so visibility is not traffic until you reach page one.</li>
<li>Start from queries at positions 11 to 20 in Search Console, and merge near-duplicate phrases onto one page.</li>
<li>Pair long tail content with internal links and relevant external links.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are long tail keywords?</summary>
<p>They are specific search phrases with low individual search volume, usually three or more words. Together they make up a large share of all searches.</p>
</details>
<details>
<summary>What is keyword research for long tail keywords?</summary>
<p>It is finding specific phrases your audience uses, checking how strong the pages that rank for them are, and mapping each phrase to one page on your site.</p>
</details>
<details>
<summary>How do I find low competition keywords?</summary>
<p>Search each phrase and check who ranks, how strong those pages are and how well they match the intent. A first page of thin or off-topic results is the best sign.</p>
</details>
<details>
<summary>Are long tail keywords easier to rank for?</summary>
<p>They usually face less competition, but a new page on a young site still starts far back. On our site the average position for five-word queries was 39, which is page four.</p>
</details>
<details>
<summary>How many words is a long tail keyword?</summary>
<p>Guides often use three or more words as a rule of thumb. Specificity and low volume matter more than the exact length.</p>
</details>
<details>
<summary>Do long tail keywords bring more traffic?</summary>
<p>Each one brings little, but together they can bring a lot if you rank near the top. Impressions alone are not traffic: ours produced 5 clicks from 69,197 impressions.</p>
</details>
<details>
<summary>Can one page target several long tail keywords?</summary>
<p>Yes, if they share an intent. Use one primary phrase and work close variants into headings, the FAQ and the text. Do not write separate pages for near-duplicates.</p>
</details>
<details>
<summary>Where do I find long tail keywords for free?</summary>
<p>Google Search Console shows queries you already appear for. Autocomplete and People Also Ask suggest related phrases.</p>
</details>
<details>
<summary>How long do long tail keywords take to rank?</summary>
<p>It varies with the site, the page and the links it earns. New pages often sit on later pages for weeks, so track position monthly rather than expecting a quick jump.</p>
</details>
</div>
`;
const title = 'Long Tail Low Competition Keywords: What 1,000 Queries Show';
const excerpt = `Long tail low competition keywords tested on our own data: ${f(G.imp)} impressions, ${G.clicks} clicks, average position 43. How to find them and when they pay.`;
const out = content.replace('@@SERPH@@', hh('long-tail-low-competition-keywords-serp.png')).replace('@@OURSH@@', hh('long-tail-low-competition-keywords-ours.png')).replace('@@POOLH@@', hh('long-tail-low-competition-keywords-pool.png'));
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Hamza Siddiqui', date: '2026-10-20', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
