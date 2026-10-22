// Builds the "check backlinks of website" post + assets. node scripts/build-post-check-backlinks-of-website.js [--assets] [--write]
// Data: GSC Queries.csv export (3 months to 2 Oct 2026); GSC Links report snapshot of 12 Oct 2026 (proof image in how-many-backlinks post); Google help page read 15 Oct 2026.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const { finish } = require('./post-build-common.js');
const SLUG = 'check-backlinks-of-website';
const csv = fs.readFileSync(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-02', 'Queries.csv'), 'utf8');
const rows = csv.split(/\r?\n/).slice(1).filter(Boolean).map(l => { const m = l.match(/^(.*),(\d+),(\d+),([\d.]+)%,([\d.]+)$/); return m && { q: m[1].replace(/"/g, ''), c: +m[2], i: +m[3], p: +m[5] }; }).filter(Boolean);
const bq = rows.filter(r => r.q.includes('backlink'));
const sum = (a, k) => a.reduce((x, r) => x + r[k], 0);
const comp = bq.filter(r => /competitor/.test(r.q)); const ai = bq.filter(r => /\bai\b/.test(r.q)); const other = bq.filter(r => !comp.includes(r) && !ai.includes(r));
const D = { n: bq.length, imp: sum(bq, 'i'), clicks: sum(bq, 'c'), pos: (bq.reduce((a, r) => a + r.p * r.i, 0) / sum(bq, 'i')).toFixed(1), comp: comp.length, compImp: sum(comp, 'i'), ai: ai.length, aiImp: sum(ai, 'i'), other: other.length, otherImp: sum(other, 'i'), all: rows.length, allImp: sum(rows, 'i') };
const exp = { n: 12, imp: 335, clicks: 0, pos: '79.2', comp: 8, compImp: 219, ai: 3, aiImp: 101, other: 1, otherImp: 15, all: 1000 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const own = { total: 13, home: 11, tool: 2, sites: 4 }; // GSC Links report snapshot, 12 Oct 2026 (see how-many-backlinks-do-i-need)
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

L.donut(SLUG, ['CHECK', 'BACKLINKS'], [['Search', 'Console'], ['Bing', 'Webmaster'], ['Analytics', 'Referrals'], ['Verify', 'Each Link'], ['Save a', 'Dated Copy']]);
L.cover(SLUG, { badge: 'FREE METHOD', search: 'check backlinks of website', card: 'Links report: 13 links',
  lines: ['External links: 13', 'To home page: 11', 'To a tool page: 2', 'Linking sites: 4', 'Export: CSV or Sheets'],
  last: 'Free, first-party, sampled', big: '13 links', k1: 'in our own report,', k2: '11 to the home page', title: 'Check Backlinks Free', sub: 'The Search Console method with real data' });
fs.writeFileSync(path.join(__dirname, `infographic-${SLUG}.html`), L.infographicHtml({
  title: `${D.n} Backlink Searches, ${D.clicks} Clicks`, sub: 'Our Search Console export for queries containing "backlink", 3 months to 2 October 2026',
  leftTitle: 'What people searched for', leftTag: `Impressions of ${D.imp} total`, max: D.imp,
  bars: [{ label: 'Competitor backlinks', sub: `${D.comp} queries`, n: D.compImp }, { label: 'AI and backlinks', sub: `${D.ai} queries`, n: D.aiImp }, { label: 'Other backlink queries', sub: `${D.other} query`, n: D.otherImp }],
  rightTitle: 'The free check', rightTag: 'Four steps, any site you own', items: [
    { t: 'Open the Links report', s: 'in Search Console' }, { t: 'Export linked pages and sites', s: 'up to 1,000 rows per table' },
    { t: 'Verify each link', s: 'status, rel attribute, context' }, { t: 'Save a dated copy', s: 'compare it next month' }],
  big: `${D.pos}`, noteHtml: `was our average position for those <em>${D.n}</em> searches. Backlink topics are crowded, so be patient and keep your own link data clean.` }));
fs.writeFileSync(path.join(__dirname, `table-${SLUG}.html`), L.tableHtml({ title: `${D.n} backlink queries our site appeared for`, sub: 'Search Console Queries export, last 3 months to 2 October 2026. Every query containing "backlink". All had 0 clicks.',
  head: ['Query', 'Impressions', 'Average position'], lastBold: true,
  rows: [...bq.map(r => [r.q, r.i, r.p.toFixed(1)]), [`${D.n} queries`, D.imp, D.pos]] }));

const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>To <strong>check backlinks of a website</strong> you own, open the Links report in Google Search Console, export the linked pages and linking sites, and verify each link yourself. That is the free, first-party method, and it is the one this guide walks through. It has a catch you should know up front: Google describes the report as a sample, so you are seeing a minimum, not a full count. Our own report lists ${own.total} external links, ${own.home} of them pointing to the home page, and we will use it as the worked example. We also looked at what people actually search for in this area, using our own Search Console export of ${f(D.all)} queries, and it changes how you should approach the job.</p>

<h2>What It Means to Check Backlinks</h2>
<p>When people ask how to <em>check my backlinks</em>, they usually want one of three answers: how many links point to the site, which pages receive them, and who is linking. Each answer comes from the same raw material, a list of linking pages, but the work after that differs.</p>
<ul>
<li><strong>How many.</strong> A count of links or, more usefully, of linking sites (root domains). One site linking 40 times is one source, not forty.</li>
<li><strong>Which pages.</strong> The target URLs that earn links. This is where you find your link magnets, and also pages that moved and lost their links.</li>
<li><strong>Who and how.</strong> The linking sites, the anchor text and the context. This is the quality check.</li>
</ul>
<p>Free tools answer all three for a site you own. For a site you do not own, free answers are thin, and we say so later in the guide.</p>

<h2>Method 1: The Search Console Links Report</h2>
<p>This is the most reliable free source because it comes from Google itself. In Search Console, open Links from the left menu. External links show three tables: top linked pages, top linking sites and top linking text. You can drill into a linked page to see the sites and pages that link to it, and export from the report.</p>
<p>Google's <a href="https://support.google.com/webmasters/answer/9049606" target="_blank" rel="nofollow noopener">Search Console Help page for the Links report</a> lists the caveats you need to read before trusting the numbers. We read it on 15 October 2026.</p>
<img src="/images/blog/proof/search-console-links-report-data-notes.png" alt="Search Console Help page for the Links report listing notes about the data: pages grouped by canonical URL, duplicate links combined, tables limited to 1,000 rows, a sample of links not a comprehensive list, and nofollow not specified" width="740" height="850" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy">
<ul>
<li><strong>It is a sample.</strong> The page states that the report is not a comprehensive list of every link and that some URLs may be omitted, such as non-indexed pages or deduplicated URLs.</li>
<li><strong>Tables stop at 1,000 rows.</strong> Larger sites see truncated tables.</li>
<li><strong>Sites are grouped by root domain.</strong> Protocol, subdomain and subdirectory are stripped, so a link from a subdomain counts under the main domain.</li>
<li><strong>Links persist.</strong> The report includes links Google has found over time, which may since have been removed.</li>
<li><strong>Nofollow is not shown.</strong> The report does not specify whether a link is marked nofollow, so you must check that separately.</li>
</ul>
<p>The last point is the one most people miss. A backlink count from Search Console tells you who links, not whether the link passes signals. Our <a href="/tools/dofollow-link-checker">dofollow link checker</a> reads a linking page and reports the rel attribute of the link to you.</p>

<h2>Our Own Report as a Worked Example</h2>
<p>On 12 October 2026 our Links report showed ${own.total} external links in total. ${own.home} pointed to the home page and ${own.tool} to a single tool page, from ${own.sites} linking sites. We published the full snapshot in our guide on <a href="/blog/how-many-backlinks-do-i-need">how many backlinks you need</a>.</p>
<p>The lesson from a small profile like this is that the export takes two minutes, and every link can be opened by hand. At that size you can verify every link by hand: open the linking page, find the link, note the anchor and the rel attribute, and record whether the page is still live. On a site with thousands of links you would filter first, starting with the top linked pages and the linking sites that appear most.</p>

<h2>Method 2: Bing Webmaster Tools</h2>
<p>Bing Webmaster Tools offers its own backlinks report for verified sites, and it is worth the five minutes because it uses a different index from Google. You verify the site, open the backlinks report and review the linking domains, pages and anchors, with an export to CSV. Bing's coverage is also a sample of what its index holds, and menu names change over time, so follow the current interface. The practical value is the second opinion: a link that appears in Bing but not in Search Console is a link Google may not have reported, not a link that does not exist.</p>

<h2>Method 3: Check Backlinks in Google Analytics</h2>
<p>If you want to <em>check backlinks in Google Analytics</em>, understand what it can and cannot do. Analytics does not list backlinks. It shows visits that arrived from other sites. In the traffic acquisition reports, look at session source and medium, and filter for referral traffic. Each referring source that sent a real visitor is a backlink that works as a path for readers.</p>
<p>That is a useful lens because it ranks your links by the only measure that does not depend on an index: someone clicked. Links that never appear here may still help search visibility, but links that do appear are proven relevant to a real reader. Compare this list with your Search Console export, and you will often find that a handful of sources produce most of the visits.</p>

<h2>Method 4: Verify a Single Link by Hand</h2>
<p>To check if my website has backlinks from a specific page, open that page, view the source, and search for your domain. Look at the anchor tag and note four things: the destination URL, the anchor text, the rel attribute and whether the link sits in the main content or in a template area. You can also use the tool above to do this without reading the source.</p>
<p>This is slow, so reserve it for links that matter: a link you paid for, a link you were promised, or a link a report flagged as new and unfamiliar. A paid link should carry a sponsored or nofollow attribute, as Google's <a href="https://developers.google.com/search/docs/essentials/spam-policies#link-spam" target="_blank" rel="nofollow noopener">spam policies</a> explain, which is why the manual check is also an honesty check.</p>

<h2>How to Search for Backlinks to Other Websites</h2>
<p>People also type how to <em>search for backlinks</em> of a competitor or any website they do not own. The free first-party reports above only work for sites where you can verify ownership. For other sites you need a third-party crawler's index. That is exactly what the tools in our <a href="/blog/backlink-analysis-tools-2026">backlink analysis tools guide</a> do, and our walkthrough on <a href="/blog/how-to-find-competitor-backlinks-2026">how to find competitor backlinks</a> covers the process step by step. A free tier of those tools usually shows a limited top list. It answers whether a site has backlinks and roughly where from, but it is not a complete count.</p>
<p>The same limit applies to the question of how to check how many backlinks a website has. For your own site, Search Console gives a sampled count by linking domain. For another site, any figure is an estimate from one tool's index, and two tools will disagree. Quote the tool and date when you report it.</p>

<h2>What People Actually Search For</h2>
<p>Our own Search Console data shows how the search side behaves. Over the three months to 2 October 2026, our site appeared for ${D.n} queries containing "backlink", with ${f(D.imp)} impressions, ${D.clicks} clicks and an average position of ${D.pos}.</p>
<img src="/images/blog/proof/check-backlinks-gsc-backlink-queries.png" alt="Table of 12 backlink queries our site appeared for in Search Console with impressions and average position, 335 impressions in total and zero clicks" width="1280" height="820" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy">
<ul>
<li><strong>${D.comp} of ${D.n} queries were about competitor backlinks</strong> (${D.compImp} impressions). People mostly want to see another site's links.</li>
<li><strong>${D.ai} queries mixed backlinks with AI</strong> (${D.aiImp} impressions), such as backlinks and AI overviews or AI models.</li>
<li><strong>None asked how to check their own backlinks.</strong> The own-site question is answered by the Links report, so it is searched less than the competitor question.</li>
</ul>
<p>Two things follow. First, if your goal is to write about backlinks, the competitor question has the most search interest, and a free first-party method does not answer it. Second, at an average position near ${D.pos}, none of this produced a click for us, which is a sober reminder that a topic with many results is slow to move.</p>

<h2>A Simple Backlink Health Check</h2>
<p>Once you have the export, run a short health check. It takes an afternoon the first time and an hour each quarter.</p>
<ol>
<li><strong>Group by linking site.</strong> Count unique root domains, not links.</li>
<li><strong>Check where the links land.</strong> A link to a page that returns an error is a broken backlink. See <a href="/blog/find-broken-backlinks">how to find broken backlinks</a> and fix the redirect.</li>
<li><strong>Read the anchors.</strong> Mostly brand names and natural phrases is healthy. A wall of one exact keyword is not.</li>
<li><strong>Judge relevance.</strong> Do the linking pages share your topic? Our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a> gives a four-question test.</li>
<li><strong>Look for links you did not expect.</strong> Open any unfamiliar site and decide whether it is a normal mention or a pattern to watch.</li>
<li><strong>Save a dated export.</strong> A report only means something compared with the last one. Our <a href="/blog/backlinks-report">backlinks report template</a> gives you the layout.</li>
</ol>

<h2>Combine the Sources Into One Sheet</h2>
<p>Each source sees a different slice, so merge them. Create one spreadsheet with four columns: linking domain, linked page on your site, source of the finding (Search Console, Bing, Analytics or manual) and a status note. Paste in each export, remove duplicate domains and add a column for the date you checked. A domain that appears in two sources is more certain than one that appears in one. A domain that appears in Analytics but not in either report is a good reminder that every index is incomplete.</p>
<p>Keep the sheet. Next quarter, paste the new exports below the old ones and mark which domains are new and which have gone. Gains and losses between two dated exports tell you more than any single total.</p>

<h2>Reading Anchor Text Without Over-Reading It</h2>
<p>The top linking text table is the part of the report people misread most. A list dominated by your brand name, your domain and phrases like "click here" or "this article" is normal. A few descriptive phrases are normal too. What deserves attention is one commercial phrase repeating across many unrelated domains, because that pattern looks arranged. Compare it with the linking sites table first: if the same phrase comes from ten different publishers who all cover your topic, it may just be how your page is described.</p>

<h2>Common Mistakes When Checking Backlinks</h2>
<ul>
<li><strong>Treating a sampled count as a total.</strong> Report it as "at least".</li>
<li><strong>Counting links instead of domains.</strong> Fifty sitewide footer links are one source.</li>
<li><strong>Ignoring the rel attribute.</strong> Search Console does not show it.</li>
<li><strong>Comparing different tools' numbers.</strong> Each has its own index, so compare within one tool over time.</li>
<li><strong>Disavowing without cause.</strong> An odd-looking link is not automatically harmful, and most are simply ignored.</li>
</ul>
<img src="/images/blog/infographic-check-backlinks-of-website.png" alt="Infographic of 12 backlink queries split into competitor, AI and other, plus a four-step free routine for checking the backlinks of a website" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy">

<h2>Limits of This Guide</h2>
<ul>
<li>The Search Console Links report is a sample, capped at 1,000 rows per table, and does not show nofollow.</li>
<li>Our report is small (${own.total} external links), so the worked example shows a method, not a benchmark.</li>
<li>The query data is one site's Search Console export for three months, with low impressions and no clicks, so treat it as a sketch of search interest.</li>
<li>Free methods cover your own site. For other sites you need a third-party index, and its figures are estimates.</li>
<li>The Bing and Analytics menu paths change, so follow the current interface.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>The free way to check backlinks of a website you own is the Search Console Links report, exported and verified by hand.</li>
<li>Google calls the report a sample capped at 1,000 rows, so treat counts as a minimum.</li>
<li>Search Console does not show nofollow. Check the rel attribute separately.</li>
<li>Bing Webmaster Tools gives a second opinion, and Analytics shows which links send real visits.</li>
<li>Save a dated export every quarter and group by linking site, not by link.</li>
</ul>
<p>Want a backlink profile reviewed by a person? <a href="/contact">Get in touch</a> and we will audit it and fix what we find.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>How do I check backlinks of my website for free?</summary>
<p>Verify your site in Google Search Console, open the Links report, and export top linked pages, linking sites and anchor text. Add Bing Webmaster Tools for a second index.</p>
</details>
<details>
<summary>How do I check how many backlinks a website has?</summary>
<p>For your own site, use the linking sites count in Search Console, remembering it is a sample. For another site, use a third-party crawler and quote the tool and date, because each index differs.</p>
</details>
<details>
<summary>Can I check backlinks in Google Analytics?</summary>
<p>Not directly. Analytics shows visits from referring sources, so it reveals the backlinks that sent real visitors. Look at session source and medium for referral traffic.</p>
</details>
<details>
<summary>How do I check if my website has backlinks?</summary>
<p>Open the Links report in Search Console. If the external links tables are empty, Google has not reported any links yet. New sites often take time to appear.</p>
</details>
<details>
<summary>How do I search for backlinks of a competitor?</summary>
<p>You need a third-party backlink index, since you cannot verify ownership of their site. See our guide on how to find competitor backlinks for the process.</p>
</details>
<details>
<summary>Why does Search Console show fewer backlinks than other tools?</summary>
<p>It reports a sample, groups links by canonical URL and root domain, and omits some URLs. Other tools use their own crawlers, so totals differ.</p>
</details>
<details>
<summary>Does Search Console show if a backlink is nofollow?</summary>
<p>No. Google's help page says the report does not specify if a link is marked as nofollow, so check the linking page's rel attribute separately.</p>
</details>
<details>
<summary>What is a backlink profile checker?</summary>
<p>A tool or report that lists the sites and pages linking to a website and summarises anchors and targets. Search Console's Links report is the free first-party version.</p>
</details>
<details>
<summary>How often should I check my backlinks?</summary>
<p>Quarterly is enough for most sites, plus after a migration or redesign when links most often break.</p>
</details>
</div>
`;
const title = 'Check Backlinks of a Website: Free Method With Real Data';
const excerpt = `Check backlinks of a website for free with Search Console, Bing and Analytics. Real data from our own report and ${D.n} backlink searches, plus a quick health check.`;
finish({ slug: SLUG, title, excerpt, category: 'Link Building', author: 'Hamza Siddiqui', content, table: { html: `table-${SLUG}.html`, out: 'check-backlinks-gsc-backlink-queries.png' } });
