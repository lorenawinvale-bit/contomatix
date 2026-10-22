// Builds the "link building statistics" post + assets. node scripts/build-post-link-building-statistics.js [--write]
// Data: Contomatix's own studies published 14-22 Oct 2026 (each linked in the post) plus a read of 9 ranking "link building statistics" pages (Google US, 22 Oct 2026; 7 readable). Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'link-building-statistics';
const R = require('../../keyword-research/serp-link-building-statistics-2026-10-22.json');
const ok = R.filter(o => o.status === 200 && o.words > 500);
const M = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], pct: ok.reduce((a, o) => a + o.pct, 0), ext: ok.reduce((a, o) => a + o.extLinks, 0), latest2026: ok.filter(o => o.maxYear === '2026').length, survey: ok.filter(o => o.survey).length, googleDoc: ok.filter(o => o.googleDoc).length, policy: ok.filter(o => o.googlePolicy).length, maxPct: Math.max(...ok.map(o => o.pct)), minPct: Math.min(...ok.map(o => o.pct)) };
const expM = { ok: 7, median: 3999, pct: 659, ext: 498, latest2026: 5, survey: 7, googleDoc: 3, policy: 2, maxPct: 176, minPct: 24 };
for (const k of Object.keys(expM)) if (M[k] !== expM[k]) throw new Error('SERP data changed ' + k + ' ' + M[k]);
// Our own studies: [group, statistic, short, source slug, source label]
const G = [
  ['Our own link profile', [
    ['24', 'external links from 10 sites point at contomatix.com (Search Console, 21 October 2026)', 'what-is-link-building', 'What Is Link Building'],
    ['2 of 24', 'external links (8%) are editorial mentions inside articles; the other 22 are directory and listing pages', 'editorial-backlinks', 'Editorial Backlinks'],
    ['17 and 6', 'of the 24 external links point at the home page and at free tool pages respectively', 'linkable-assets', 'Linkable Assets'],
    ['0 of 331', 'posts have an external link, while the 6 tool-page links go to 4 free tools', 'linkable-assets', 'Linkable Assets'],
    ['408 to 1', 'internal links for each external link: 9,797 internal against 24 external', 'what-is-link-building', 'What Is Link Building'],
    ['8 of 14', 'third-party pages that name our brand do not link to us, and they sit on only 2 sites', 'link-reclamation', 'Link Reclamation']]],
  ['Anchor text and link attributes', [
    ['1,525', 'internal anchors across 331 posts, none of them generic, with 659 different anchor texts', 'anchor-text-seo', 'Anchor Text SEO'],
    ['16%', 'of our internal anchors are one repeated call-to-action wording', 'anchor-text-seo', 'Anchor Text SEO'],
    ['86%', 'of 64 external links on 7 pages about backlink types are followed, and none use sponsored or ugc', 'types-of-backlinks', 'Types of Backlinks'],
    ['13 to 19', 'of the 23 link types we tracked are named by each of 7 ranking pages, and only 7 types appear on all of them', 'types-of-backlinks', 'Types of Backlinks']]],
  ['Prospecting and outreach', [
    ['6 of 13', 'curated resource pages have at least one dead link, and 9 of 205 checked links (4.4%) return a 404', 'resource-page-link-building', 'Resource Page Link Building'],
    ['1 of 13', 'resource pages invites readers to suggest a resource', 'link-prospecting', 'Link Prospecting'],
    ['2 of 8', 'ranking link building campaign guides name a KPI, and none mention Google\'s link spam policy', 'link-building-campaign', 'Link Building Campaign']]],
  ['Providers and prices', [
    ['$100 to $300', 'is the cost per link that published SaaS link building prices work out to', 'saas-link-building-services', 'SaaS Link Building Services'],
    ['5 of 6', 'SaaS link building pages show a price, and only 1 of 6 mention Google\'s link rules', 'saas-link-building-services', 'SaaS Link Building Services'],
    ['2 of 7', 'white label link building pages show a price, and 3 of 7 offer a sample report', 'white-label-link-building', 'White Label Link Building']]],
  ['Risk and Google\'s rules', [
    ['7 of 8', 'backlink exchange pages admit the risk, yet only 2 mention nofollow or sponsored and 5 use guarantee wording', 'backlinks-exchange', 'Backlinks Exchange'],
    ['6 of 6', 'tiered link building guides describe three tiers, and none cite Google\'s own documentation', 'tiered-link-building', 'Tiered Link Building'],
    ['1 of 4', 'disavow guides says most sites do not need the tool, which is what Google\'s help page says', 'google-disavow-backlinks', 'Google Disavow Backlinks']]],
  ['Indexing and search data', [
    ['11 of 12', 'new pages we published on 15 to 17 October 2026 were in Google within one to three days', 'how-to-index-backlinks', 'How to Index Backlinks'],
    ['About 106,000', 'impressions and 77 clicks in 90 days, at an average position of 43', 'search-console-impressions-explained', 'Search Console Impressions Explained'],
    ['65%', 'of the impressions, and about 6.5% of the clicks, show in the top 1,000 query rows of the same report', 'search-console-impressions-explained', 'Search Console Impressions Explained']]]
];
const N = G.reduce((a, g) => a + g[1].length, 0); 
console.log(JSON.stringify(M), 'stats', N);
const f = n => n.toLocaleString('en-US');
const flat = G.flatMap(g => g[1]);

// ---------- assets
L.donut(SLUG, ['LINK BUILDING', 'STATISTICS'], [['Cite the', 'Source'], 'Know the Sample', ['Date Every', 'Number'], 'Check the Method', ['Add Your', 'Own Data']]);
L.cover(SLUG, { badge: 'OUR OWN STUDIES', search: 'link building statistics', card: `Numbers collected: ${N}`,
  lines: ['External links to us: 24', 'Editorial mentions: 2 of 24', 'Resource pages with a dead link: 6 of 13', 'Brand mentions unlinked: 8 of 14', 'New pages indexed in 3 days: 11 of 12'],
  last: 'Every number has a source', big: `${N}`, k1: 'link building numbers', k2: 'from our own studies', title: 'Link Building Statistics', sub: 'Real samples, dated and sourced' });
fs.writeFileSync(path.join(__dirname, 'infographic-link-building-statistics.html'), L.infographicHtml({
  title: `${N} Link Building Numbers, Each Sourced`, sub: 'From our own studies, 14 to 22 October 2026',
  leftTitle: 'Five numbers to remember', leftTag: 'Out of the sample size shown', max: 24,
  bars: [{ label: 'Editorial links', sub: '2 of our 24 external links', n: 2 }, { label: 'Dead links', sub: '6 of 13 prospect pages', n: 6 }, { label: 'Unlinked mentions', sub: '8 of 14 brand mentions', n: 8 }, { label: 'Pages indexed', sub: '11 of 12 new pages in 3 days', n: 11 }, { label: 'External links', sub: 'all points to our site', n: 24 }],
  rightTitle: 'How to cite a statistic', rightTag: 'Four rules we follow', items: [
    { t: 'Name the sample', s: '13 pages, 7 guides, 24 links' }, { t: 'Give the date', s: 'October 2026' },
    { t: 'Link the method', s: 'to the study behind it' }, { t: 'Never generalise', s: 'one site is not the web' }],
  big: `${N}`, noteHtml: `numbers here, each with a <em>sample size, a date and a link</em> to the study behind it.` }));
fs.writeFileSync(path.join(__dirname, 'table-link-building-statistics-ours.html'), L.tableHtml({ title: 'Our link profile in numbers', sub: 'Search Console Links report for contomatix.com, 21 October 2026, with pages opened and classified. Details in the linked studies.',
  head: ['Measure', 'Value'], lastBold: false,
  rows: [['External links', '24'], ['Linking sites', '10'], ['Editorial mentions inside articles', '2 of 24'], ['Links to the home page', '17 of 24'], ['Links to free tool pages', '6 of 24'], ['Posts with an external link', '0 of 331'], ['Third-party brand mentions without a link', '8 of 14']] }));
fs.writeFileSync(path.join(__dirname, 'table-link-building-statistics-guides.html'), L.tableHtml({ title: 'What ranking guides and provider pages say, in counts', sub: 'Organic results read on the dates shown in each linked study (Google US, October 2026). Sites are not named.',
  head: ['Topic', 'Pages read', 'Finding'], lastBold: false,
  rows: [['Link building campaigns', '8', '2 name a KPI'], ['SaaS link building services', '6', '5 show a price, 1 cite Google\'s rules'], ['White label link building', '7', '2 show a price'], ['Backlink exchanges', '8', '7 admit risk, 2 mention nofollow'], ['Tiered link building', '6', '0 cite Google\'s documentation'], ['Google disavow tool', '4', '1 says most sites do not need it']] }));
fs.writeFileSync(path.join(__dirname, 'table-link-building-statistics-serp.html'), L.tableHtml({ title: `What ${M.ok} ranking statistics pages show`, sub: `Organic results for "link building statistics" read on 22 October 2026 (9 listed; ${M.ok} gave a readable page). Sites are not named. External links include all links on the page.`,
  head: ['Measure', 'Value'], lastBold: false,
  rows: [['Pages read', String(M.ok)], ['Median page length', `${f(M.median)} words`], ['Percentages quoted, all pages', f(M.pct)], ['Range per page', `${M.minPct} to ${M.maxPct}`], ['External links, all pages', f(M.ext)], ['Pages whose latest year is 2026', `${M.latest2026} of ${M.ok}`], ['Pages citing Google documentation', `${M.googleDoc} of ${M.ok}`], ['Pages mentioning Google\'s spam policy', `${M.policy} of ${M.ok}`]] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [1280, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1];
const fig = (n, alt) => `\n<figure style="margin:20px 0;"><img src="/images/blog/proof/link-building-statistics-${n}.png" alt="${alt}" width="1280" height="${hh('link-building-statistics-' + n + '.png')}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>`;
const extra = {
  'Our own link profile': fig('ours', 'Table of the Contomatix link profile in October 2026: 24 external links from 10 sites, 2 of 24 editorial, 17 to the home page, 6 to free tools, 0 of 331 posts with an external link and 8 of 14 brand mentions unlinked'),
  'Risk and Google\'s rules': fig('guides', 'Table of what ranking guides and provider pages say, in counts, across campaigns, SaaS, white label, exchanges, tiered link building and the disavow tool')
};
const groupsHtml =G.map(g => `<h2>${g[0]}</h2>\n<ul>\n${g[1].map(s => `<li><strong>${s[0]}</strong> ${s[1]}. Source: <a href="/blog/${s[2]}">${s[3]}</a>.</li>`).join('\n')}\n</ul>${extra[g[0]] || ''}`).join('\n\n');
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Link building statistics</strong> are numbers that describe how links are earned, priced, checked and discovered. Most statistics pages quote other pages. We read ${M.ok} of them and found ${f(M.pct)} percentages and ${f(M.ext)} outbound links across the set. This page does something different: it collects ${N} numbers from our own studies, each with a sample size, a date and a link to the study behind it. The samples are small and specific to October 2026, and we say so beside every figure.</p>

<p>Below you will find how to read and cite these numbers, what we found grouped by topic, what ${M.ok} ranking statistics pages look like, and how to add your own data. If you want the method behind any figure, follow the link next to it. For the big picture, start with <a href="/blog/what-is-link-building">what link building is</a>.</p>

<h2>How to Read and Cite These Numbers</h2>
<ul>
<li><strong>They describe samples, not the web.</strong> A figure from 13 pages is about those 13 pages. We state the sample each time, and you should too.</li>
<li><strong>They are dated.</strong> All measurements are from 14 to 22 October 2026. Search results, prices and our own profile change, so check the date before you quote.</li>
<li><strong>They are sourced.</strong> Each number links to the study that explains how it was collected, what was counted and what was left out.</li>
<li><strong>They are ours.</strong> Where a figure comes from Google, we say so and cite its documentation.</li>
</ul>
<p>If you cite a number, give the figure, the sample and the date, and link to the study. For example: "In a scan of 13 curated resource pages, 6 had at least one dead link (Contomatix, October 2026)". Do not turn it into a general claim about all resource pages.</p>

${groupsHtml}

<h2>What the Ranking Statistics Pages Look Like</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-building-statistics-serp.png" alt="Table of what 7 ranking link building statistics pages show: median length 3,999 words, 659 percentages quoted, 498 external links, 5 of 7 with 2026 as the latest year, 3 of 7 citing Google documentation and 2 of 7 mentioning Google's spam policy" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>For comparison, we read the ${M.ok} readable pages that rank for the term on Google US on 22 October 2026. They run a median of ${f(M.median)} words and quote between ${M.minPct} and ${M.maxPct} percentages each, ${f(M.pct)} in total, and link out ${f(M.ext)} times, counting every link on the page. ${M.latest2026} of ${M.ok} have 2026 as the latest year they mention, ${M.googleDoc} of ${M.ok} cite Google's documentation and only ${M.policy} of ${M.ok} mention Google's spam policy. We cannot say how many of those percentages link to a primary source, because a link count includes navigation and other links, but the gap between the number of percentages and the number of links suggests that many figures are repeated without a visible source. That is why we date and link every figure here.</p>

<h2>How These Numbers Fit Together</h2>
<p>Read as a set, the figures tell a consistent story. Our own link profile is small and mostly made of listings, with two editorial mentions and tool pages earning the links that reach inner pages. Prospect pages are often neglected and rarely invite suggestions, which is why personal outreach matters. Providers and guides talk about prices, tools and tactics far more than about Google's rules, and when they discuss risk they rarely cite the documentation. New pages on a site Google already visits are found quickly without special tricks. And impressions are far more common than clicks for a young site, so link building has to be judged by what it moves in Search Console and in the business, not by link counts. The following guides turn the numbers into action: <a href="/blog/link-prospecting">link prospecting</a>, <a href="/blog/link-reclamation">link reclamation</a> and the <a href="/blog/link-building-campaign">link building campaign guide</a>.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-link-building-statistics.png" alt="Infographic of five link building numbers from Contomatix's own studies, with 2 of 24 editorial links, 6 of 13 prospect pages with a dead link, 8 of 14 unlinked brand mentions and 11 of 12 new pages indexed in three days, and four rules for citing a statistic" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How to Collect Your Own Link Building Statistics</h2>
<ol>
<li><strong>Pick one question.</strong> For example: how many of my links are editorial?</li>
<li><strong>Define the sample.</strong> Name the pages, sites or links you will count and the date.</li>
<li><strong>Count with a rule.</strong> Write down what counts as editorial, dead or unlinked before you start, so the count can be repeated.</li>
<li><strong>Keep the raw list.</strong> A sheet with the URLs lets you recheck later.</li>
<li><strong>Publish the method.</strong> A number with a method is far more useful than a number alone, and a page that explains one is itself a good <a href="/blog/linkable-assets">linkable asset</a>.</li>
<li><strong>Repeat it.</strong> Run the same count next quarter and compare.</li>
</ol>
<p>Free tools help: the <a href="/tools/dofollow-link-checker">dofollow link checker</a> reads link attributes, the <a href="/tools/anchor-text-checker">anchor text checker</a> sorts anchors and the <a href="/tools/link-building-cost-calculator">link building cost calculator</a> works out cost per live link from your own quotes.</p>

<h2>Which Numbers Matter Most When You Plan</h2>
<p>Not every figure deserves the same weight. If you are deciding where to spend a month of link building, three groups of numbers are worth more than the rest. First, the shape of your own profile: if most of your links point at the home page and almost none at articles, new links to inner pages will do more than another listing. Second, the cost per live link, because a provider that hides its price makes the comparison impossible. Third, the share of editorial links, since those are the ones that come from pages written for readers.</p>
<p>The prospecting figures help with a different decision, which is who to contact. A resource page with dead links and no invitation to suggest a link will not answer a mass email, but a personal note that points out the broken link and offers a replacement often fits. That is the logic behind the <a href="/tools/link-prospect-scorer">link prospect scorer</a>.</p>

<p>A practical way to use the set is to pick the three figures closest to your own situation and measure the same thing on your site. If you sell link building, compare your price per live link with the range above. If you run outreach, count how many of your prospect pages have dead links before you write the first email. If you publish articles, open Search Console and see how many of your links point at posts rather than the home page. Each of these checks takes under an hour and gives you a number that belongs to you, which is worth more than any figure borrowed from us.</p>

<h2>Common Mistakes When Quoting Statistics</h2>
<ul>
<li><strong>Dropping the sample.</strong> "Most resource pages have dead links" is not what 6 of 13 pages tell you. Say "6 of 13 pages we checked".</li>
<li><strong>Mixing dates.</strong> A price from 2022 and a ranking from 2026 do not belong in the same sentence without saying so.</li>
<li><strong>Treating a count of mentions as proof.</strong> A page that mentions a topic has not necessarily explained it.</li>
<li><strong>Copying a figure without opening its source.</strong> This is how one unsourced number ends up on dozens of pages.</li>
<li><strong>Comparing different methods.</strong> Our counts of links include only what Search Console reported on the date shown, so do not compare them with a crawler's totals.</li>
</ul>

<h2>Limits of These Numbers</h2>
<ul>
<li><strong>Small samples.</strong> Most figures rest on 4 to 14 pages or on one young site. They show patterns worth checking, not industry norms.</li>
<li><strong>One search, one day.</strong> Ranking pages change. A different query, country or date will give different counts.</li>
<li><strong>Counts of terms are not quality.</strong> When we say a guide mentions a topic, that means the term appears, not that it is explained well.</li>
<li><strong>Our site is young.</strong> Our link profile and search data are not a benchmark for older or larger sites.</li>
</ul>

<h2>How We Compiled This Page</h2>
<ul>
<li>Each figure is taken from the study linked beside it, published on this site between 14 and 22 October 2026, and was not changed here.</li>
<li>The count of ranking statistics pages comes from reading the 9 organic results for "link building statistics" on Google US on 22 October 2026. Seven were readable, one blocked our request and one returned a short page. Percentages are counted as numbers followed by a percent sign in the page text.</li>
<li>External link counts include all outbound links in the page HTML and therefore include navigation and related links.</li>
<li>Google's statements come from its Search Central documentation and Search Console Help, read on the dates given in the linked studies.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>These ${N} numbers each come with a sample, a date and a source study.</li>
<li>Only 2 of our 24 external links are editorial, and tool pages earn more links than our 331 posts.</li>
<li>Prospect pages are often neglected: 6 of 13 had a dead link.</li>
<li>Guides and providers talk about price and tactics far more than Google's rules.</li>
<li>Cite a statistic with its sample and date, and collect your own with a clear method.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are link building statistics?</summary>
<p>They are numbers that describe how links are earned, priced, checked and discovered. This page collects ${N} from our own October 2026 studies, each with a sample size, a date and a source.</p>
</details>
<details>
<summary>Where do these link building statistics come from?</summary>
<p>From studies we ran on our own link profile, on ranking guides and provider pages, on real resource pages and on our own Search Console data. Each figure links to the study.</p>
</details>
<details>
<summary>Can I cite these statistics?</summary>
<p>Yes. Give the figure, the sample and the date, and link to the study. Do not turn a figure about a small sample into a claim about all sites.</p>
</details>
<details>
<summary>Are these figures industry averages?</summary>
<p>No. They describe specific samples in October 2026. Most rest on a handful of pages or on one young site.</p>
</details>
<details>
<summary>How many links does a website need?</summary>
<p>No fixed number applies. See our guide to how many backlinks you need for a method based on the pages you want to rank.</p>
</details>
<details>
<summary>What share of backlinks are editorial?</summary>
<p>On our site, 2 of 24 external links are editorial mentions inside articles. That is one young site, not a norm.</p>
</details>
<details>
<summary>How much does link building cost?</summary>
<p>Published SaaS link building prices we read worked out to about $100 to $300 per link. Prices change, so use your own quotes in the cost calculator.</p>
</details>
<details>
<summary>How long does it take for a new page to be indexed?</summary>
<p>Google says crawling can take from a few days to a few weeks. In our check, 11 of 12 new pages were indexed within one to three days.</p>
</details>
<details>
<summary>How can I collect my own link building statistics?</summary>
<p>Pick one question, define the sample and date, count with a written rule, keep the raw list, publish the method and repeat it next quarter.</p>
</details>
</div>
`;
const title = `Link Building Statistics: ${N} Numbers From Our Own Studies`;
const excerpt = `Link building statistics from our own October 2026 studies: ${N} numbers on links, prospects, prices, risk and indexing, each with a sample size, a date and a source.`;
const out = content.replace('@@SERPH@@', hh('link-building-statistics-serp.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-22', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
