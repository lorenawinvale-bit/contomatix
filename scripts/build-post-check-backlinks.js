// Builds the "check backlinks of website" post + assets. node scripts/build-post-check-backlinks.js [--write]
// Data: our own Search Console Links report (read 15 Oct 2026) + the GoodFirms profile page fetched 15 Oct 2026.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'check-backlinks-of-website';
const G = { total: 13, homepage: 11, tool: 2, sites: 4, top: 7, second: 3, third: 2, fourth: 1, internal: 4866, gfLinks: 2, gfNofollow: 2 };
const gf = JSON.parse(fs.readFileSync(path.join(root, '..', 'keyword-research', 'goodfirms-profile-links-2026-10-15.json'), 'utf8'));
if (gf.links.length !== G.gfLinks || !gf.links.every(l => /rel="[^"]*nofollow/.test(l))) throw new Error('goodfirms data changed');
console.log(JSON.stringify(G));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['CHECK', 'BACKLINKS'], [['Use the Search', 'Console Links Report'], 'Inspect a Linking Page', ['Read Attributes', 'and Anchors'], 'Cross-Check With Referrals', 'Repeat Every Month']);
L.cover(SLUG, { badge: 'OUR OWN LINKS REPORT', search: 'check backlinks of website', card: 'Search Console: Links report',
  lines: [`External links listed: ${G.total}`, `Linking sites: ${G.sites}`, `From the largest site: ${G.top}`, `Followed on that site: 0 of ${G.gfLinks}`, `Internal links: ${f(G.internal)}`],
  last: 'Count links, then read them', big: `${G.total} links`, k1: `from ${G.sites} sites,`, k2: 'and 0 were followed on the top one', title: 'Check Backlinks of a Website', sub: 'Four free methods, run on our own site' });
fs.writeFileSync(path.join(__dirname, 'infographic-check-backlinks-of-website.html'), L.infographicHtml({
  title: 'Check Backlinks: Our Own Site as the Test', sub: 'Search Console Links report and one profile page, 15 October 2026',
  leftTitle: 'What our Links report shows', leftTag: `Links listed by linking site (total ${G.total})`, max: G.top,
  bars: [{ label: 'goodfirms.co', sub: 'profile page, both links nofollow', n: G.top }, { label: 'designrush.com', sub: 'directory profile', n: G.second }, { label: 'saasrankly.com', sub: 'our sister site', n: G.third }, { label: 'scamadviser.com', sub: 'site trust checker', n: G.fourth }],
  rightTitle: 'Four ways to check', rightTag: 'Start free, go deeper later', items: [
    { t: 'Search Console Links report', s: 'sample of links, no attributes' }, { t: 'Open the linking page', s: 'read the exact anchor and rel' },
    { t: 'Search for brand mentions', s: 'find links and unlinked mentions' }, { t: 'A backlink tool export', s: 'for a wider index and history' }],
  big: `${G.total} links`, noteHtml: `listed in Search Console, yet the <em>7 from the top site are nofollow</em>. Count first, then read.` }));
fs.writeFileSync(path.join(__dirname, 'table-check-backlinks-gsc.html'), L.tableHtml({ title: 'contomatix.com: external links in Search Console', sub: 'Links report, read 15 October 2026. Values are trimmed to root domain and grouped by Google.',
  head: ['Top linking site', 'Links'], lastBold: true,
  rows: [['goodfirms.co', G.top], ['designrush.com', G.second], ['saasrankly.com', G.third], ['scamadviser.com', G.fourth], ['Total external links', G.total]] }));
fs.writeFileSync(path.join(__dirname, 'quote-check-backlinks.html'), quote({ source: 'Google Search Central · Link best practices and qualifying outbound links', title: 'How Google reads links',
  paras: ['Generally, Google can only crawl your link if it\'s an <code>&lt;a&gt;</code> HTML element with an <code>href</code> attribute.',
    'Mark links that are advertisements or paid placements with the <code>sponsored</code> value. If users can insert links on your site, add <code>ugc</code> or <code>nofollow</code> to those links.'] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>To <strong>check backlinks of a website</strong> you open the links report in Search Console, read the linking pages and then confirm how each link is marked. We did exactly that on our own site. Search Console lists ${G.total} external links from ${G.sites} sites, and ${G.top} of them come from one directory. When we opened that profile page, both links to us were nofollow. The headline number says one thing, the page says another.</p>

<p>This guide shows four free ways to find backlinks to a website, how to read what you find and a monthly routine that takes about twenty minutes. It uses the same data we used for our own site, so you can see the numbers behind each step. If you want the report layout afterwards, our <a href="/blog/backlinks-report">backlinks report guide</a> covers it.</p>

<h2>Method 1: Search Console Links Report</h2>
<p>Search Console is the only source that comes straight from Google, and it is free. This is how to find backlinks for a website you own. Open Links in the left menu. The report has four lists for external links and four for internal links: top linked pages, top linking sites, top linking text and, for internal links, the same by page.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/check-backlinks-gsc-table.png" alt="Table of our Search Console Links report: goodfirms.co 7 links, designrush.com 3, saasrankly.com 2, scamadviser.com 1, total 13 external links" width="1280" height="420" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Total external links:</strong> ${G.total}. This is the count of links from outside the property that Google knows about.</li>
<li><strong>Top linked pages:</strong> the homepage with ${G.homepage} links and one tool page with ${G.tool}. Most sites find the homepage collects most links, which is normal.</li>
<li><strong>Top linking sites:</strong> goodfirms.co with ${G.top}, designrush.com with ${G.second}, saasrankly.com with ${G.third} and scamadviser.com with ${G.fourth}. Google trims values to the root domain and groups them.</li>
<li><strong>Top linking text:</strong> "visit website", "contomatix", "llms txt generator" and "visit". Two of the four are generic button text from directory profiles.</li>
</ul>
<p>Two limits matter. First, Google describes the report as a sample, not a complete list, so treat your total as at least this many. Second, the report does not show whether a link is nofollow, sponsored or ugc, so a high count does not tell you how much each link is worth.</p>

<h2>Method 2: Open the Linking Page and Read the Link</h2>
<p>Search Console tells you which site links to you. The page itself tells you how. Open a linking page, find your link and view its HTML. You are looking for the anchor text, the destination and the <code>rel</code> attribute.</p>
<p>We did this for the largest linking site. The GoodFirms profile page contains two links to our homepage. Both carry <code>rel="nofollow noopener"</code> and open in a new tab. They were pasted into our <a href="/tools/dofollow-link-checker">dofollow link checker</a>, which reports the result below.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/dofollow-checker-goodfirms-profile.png" alt="Dofollow link checker output for the GoodFirms profile page: 2 web links, 0 followed, 2 nofollow, both external with the anchor Visit website" width="534" height="391" style="width:100%;max-width:534px;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>That changes how we read the report. The 7 links from the top site do not pass what a followed editorial link would. They still have value as a listing that people can click, but the real count of followed links from that site is zero. The same check works for any linking page, which is the practical answer to how to check if my website has backlinks that count: open the linking page and read the link.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/check-backlinks-google-quote.png" alt="Google Search Central excerpt: Google can only crawl a link that is an a element with an href attribute, and paid links should use sponsored while user-generated links use ugc or nofollow" width="880" height="201" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Method 3: Search for Your Brand and Domain</h2>
<p>Here is how to search for backlinks without any tool. The old <code>link:</code> search operator no longer returns backlinks, so a plain search is the way to discover mentions. Search for your domain and your brand name and exclude your own site with <code>-site:yourdomain.com</code>. Results show pages that mention you, with or without a link.</p>
<ul>
<li>A result that links to you confirms a backlink you may not know about.</li>
<li>A result that names you without a link is an unlinked mention, which is one of the easiest links to earn by asking the publisher.</li>
<li>Searching for your brand on forums and Q&A sites finds user-generated links, which are normally nofollow or ugc.</li>
</ul>

<h2>Method 4: Use a Backlink Checker for a Wider Index</h2>
<p>Third-party backlink tools crawl their own index of the web, so they often list links that Search Console has not. Free tiers show a limited number of links, and paid plans show history and new or lost links. Two cautions apply: their totals differ from each other and from Google's, and none of them is Google's own view. Use a tool to widen the list, not to settle an argument about the exact number. A backlink profile checker or a backlinks finder is only as good as its index, and a backlinks counter shows that index, not the web. Our <a href="/blog/backlink-analysis-tools-2026">backlink analysis tools guide</a> compares the options.</p>

<h2>Free Versus Paid Backlink Checkers</h2>
<p>A free checker is enough for a small site that wants to know who links to it and whether links are lost. Paid plans earn their price when you need history, alerts when a link disappears, competitor comparisons and exports for reporting. Before paying, run the free methods above for a month. If you already know your top linking sites, your attributes and your unlinked mentions, you will know exactly what a paid tool would add. Many small sites find that Search Console plus a monthly page check answers every question they actually have.</p>

<h2>What About Google Analytics?</h2>
<p>A common question is how to check backlinks in Google Analytics. Analytics does not list backlinks. Its acquisition reports show referral traffic, which is visits that arrived from another site. That is useful as a cross-check: a backlink that sends clicks appears as a referral, while a backlink nobody clicks does not. Use it to find your most valuable links, not to find all of them.</p>

<h2>How to Read What You Find</h2>
<ul>
<li><strong>Count domains, not only links.</strong> We have ${G.total} links, but ${G.sites} linking sites. One site sending seven links is one relationship.</li>
<li><strong>Check the attribute.</strong> Followed, nofollow, sponsored and ugc are all normal. Google treats them as hints, so a healthy profile has a mix.</li>
<li><strong>Read the anchor.</strong> Descriptive anchors help readers and search engines. Generic button text such as "visit website" is common on directories and says little.</li>
<li><strong>Look at the linking page.</strong> Is it relevant to your topic, indexed and a page a person would read? A link buried in a footer of thousands of pages is weaker than one in an article.</li>
<li><strong>Look at the destination.</strong> Our links point mostly at the homepage. That leaves our guides and services without external links, which is a content and outreach gap, not a technical one.</li>
</ul>

<h2>Quality Signals You Can Check by Hand</h2>
<p>When you open a linking page, five quick questions tell you more than a tool score. Is the page about a topic close to yours? Is the page itself indexed, which you can test with a search for a sentence from it in quotes? Does the link sit inside the body text, where a reader would see it, or in a footer or sidebar shared by every page? How many other outbound links does the page carry, because a page with hundreds of them is a list, not an endorsement? And does the site look like something a person would use, with real articles and a recent update? A link that passes all five is the kind worth asking for more of. A link that fails most of them is probably harmless, but it is not worth your time.</p>

<h2>A 20-Minute Monthly Routine</h2>
<p>Think of this routine as a simple backlinks health check you can repeat.</p>
<ol>
<li>Open the Links report and note the total, the top linking sites and any new site.</li>
<li>Open each new linking page and check the attribute and anchor.</li>
<li>Search your brand with <code>-site:</code> and list new mentions.</li>
<li>Check the status of your top linked pages. A linked page that now returns 404 loses the link's value, which our <a href="/blog/find-broken-backlinks">broken backlinks guide</a> explains how to fix.</li>
<li>Record the numbers in a sheet and compare with last month.</li>
</ol>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-check-backlinks-of-website.png" alt="Infographic of our Search Console Links report by linking site and four ways to check backlinks" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Which Method Answers Which Question</h2>
<ul>
<li><strong>"Does Google know about this link?"</strong> Search Console. If a link is not there, it may be new, blocked or not yet processed.</li>
<li><strong>"Is this link followed?"</strong> The linking page's HTML, or a checker that reads it.</li>
<li><strong>"Who mentions us without linking?"</strong> A brand search with the <code>-site:</code> operator.</li>
<li><strong>"Which links actually send visitors?"</strong> Referral traffic in Analytics.</li>
<li><strong>"How did our profile change over time?"</strong> A backlink tool with history, or your own monthly log.</li>
</ul>

<h2>How to Find Backlinks to Website Pages One at a Time</h2>
<p>For a single page, use the Links report in a different way. Open Top linked pages, select the page and Search Console shows the sites that link to it. In our report, the homepage collects ${G.homepage} of ${G.total} links, while the other linked page, a free tool, has ${G.tool}. None of our guides appears in the list, which tells us where outreach should focus next. If a page you care about is missing from Top linked pages, it has no external links that Google has processed yet.</p>

<h2>Reading Anchor Text Across Your Links</h2>
<p>Look at the top linking text as a set. Ours is "visit website", our brand name, the name of one tool and "visit". That is a very natural profile for a young site: brand and button text, with no keyword-stuffed anchors. If most of your anchors were exact-match commercial phrases, Google's link spam guidance on links with optimized anchor text would be the thing to review. A healthy mix is mostly brand, URL and descriptive text, with only an occasional keyword-based anchor placed by an editor.</p>

<h2>What to Do With What You Find</h2>
<ol>
<li><strong>Reclaim unlinked mentions.</strong> Write a short, polite note to the publisher with the exact URL you would like linked.</li>
<li><strong>Fix dead destinations.</strong> If a link points to a URL that now errors, redirect it to the closest working page.</li>
<li><strong>Point links where they help.</strong> If every link lands on the homepage, add internal links from the homepage to the pages you want to rank, so the authority is shared.</li>
<li><strong>Note generic anchors.</strong> When you have a say in the wording, ask for a descriptive anchor.</li>
<li><strong>Do not chase every nofollow link away.</strong> They send visitors and build recognition, and they are a normal part of a profile.</li>
</ol>

<h2>Checking Backlinks for Clients or Several Sites</h2>
<p>If you check links for clients, give every site the same monthly routine so the numbers are comparable. Record the total, the number of linking sites, new and lost sites, and the three most important linked pages. Keep the source consistent: use Search Console for one column and one tool for another, and never mix them in one number. Our <a href="/blog/how-many-backlinks-do-i-need">backlinks benchmark guide</a> explains how to judge whether the number is enough for your niche.</p>

<h2>Common Mistakes When You Check Backlinks</h2>
<ul>
<li><strong>Treating the total as a score.</strong> A big number of low-value or nofollow links is not the same as authority.</li>
<li><strong>Comparing totals across tools.</strong> Each tool has its own crawl, so numbers will not match.</li>
<li><strong>Ignoring broken targets.</strong> A backlink to a page that no longer works helps nobody.</li>
<li><strong>Panic about every odd link.</strong> Google says it works to ignore spam links. Disavowing is for serious, specific cases.</li>
<li><strong>Checking once.</strong> Links are gained and lost every month.</li>
</ul>

<h2>Limits of This Check</h2>
<ul>
<li>Search Console's Links report is a sample, so our ${G.total} is a minimum.</li>
<li>We opened one linking page in full. The other linking sites blocked our fetch or were not opened, so their attributes are not stated.</li>
<li>One site, one day. Your numbers will differ.</li>
<li>Attributes can change if a publisher edits a page.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Start with the Search Console Links report, then open the linking pages.</li>
<li>Always read the rel attribute and the anchor text, because the count alone says little.</li>
<li>Search for brand mentions to find links and unlinked mentions.</li>
<li>Use Analytics referrals to see which links send visits.</li>
<li>Repeat monthly and compare.</li>
</ul>
<p>Need a backlink profile reviewed by a person? <a href="/contact">Get in touch</a> and we will audit it and suggest next steps.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>How do I check backlinks of a website for free?</summary>
<p>Open the Links report in Search Console for your own site, then open the linking pages to read each link. Add brand searches with -site: and, for a wider list, a free backlink checker.</p>
</details>
<details>
<summary>How can I check my backlinks on google?</summary>
<p>Use Search Console. It lists total external links, top linking sites, top linked pages and top linking text, taken from Google's own data. It is a sample, not a full list.</p>
</details>
<details>
<summary>Can I check backlinks in Google Analytics?</summary>
<p>Not directly. Analytics shows referral traffic, which tells you which sites send visits. It does not list every backlink.</p>
</details>
<details>
<summary>How do I find backlinks of a competitor's website?</summary>
<p>You cannot use Search Console for sites you do not own. Backlink tools with their own index can show a competitor's links. Our guide on finding competitor backlinks explains the process.</p>
</details>
<details>
<summary>How do I check how many backlinks a website has?</summary>
<p>There is no single true number. Search Console gives a sample, and every tool has its own index. Use one source consistently and track change over time.</p>
</details>
<details>
<summary>How do I know if a backlink is dofollow?</summary>
<p>Open the linking page and check the link's rel attribute. A link with no nofollow, sponsored or ugc value is followed. Our dofollow link checker works as a do follow backlink checker for pasted HTML and lists this for every link.</p>
</details>
<details>
<summary>How do I check if my site has backlinks from a specific website?</summary>
<p>Open the Links report, choose Top linking sites and look for the domain. If it is not listed, search that site for your brand name with a site: search.</p>
</details>
<details>
<summary>Why does my backlink checker show different numbers from Search Console?</summary>
<p>Each tool crawls the web differently and keeps its own index. Search Console reflects what Google knows and shows a sample, so totals rarely match.</p>
</details>
<details>
<summary>How often should I check my backlinks?</summary>
<p>Monthly is a good rhythm for most sites. Check more often after a campaign, a migration or a URL change.</p>
</details>
</div>
`;
const title = 'Check Backlinks of Website: 4 Free Methods, Real Data';
const excerpt = `How to check backlinks of a website for free. We ran four methods on our own site: ${G.total} links in Search Console, and the top site's links were nofollow.`;
const post = { slug: SLUG, title, category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-15', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
