// Builds the "sitemap priority" post + assets. node scripts/build-post-sitemap-priority.js [--write]
// Data: sitemaps of the 29 sites behind the 13 Oct 2026 Denver electrician Maps snapshot, read 14 Oct 2026 (scripts/crawl-sitemaps-sample.js).
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'sitemap-priority';
const S = require('../../keyword-research/sitemaps-sample-2026-10-14.json');
const f = S.filter(o => o.found); const c = fn => f.filter(fn).length;
const D = { sites: S.length, found: f.length, none: S.length - f.length, inRobots: c(o => o.inRobots), idx: c(o => o.index), pri: c(o => o.hasPriority), cf: c(o => o.hasChangefreq), lm: c(o => o.hasLastmod),
  priVaried: c(o => o.hasPriority && o.priorityDistinct > 1), lmSame: c(o => o.hasLastmod && o.lastmodDistinct === 1 && o.lastmodDates > 5), lmMany: c(o => o.lastmodDistinct > 1), all3: c(o => o.hasPriority && o.hasChangefreq && o.hasLastmod) };
const exp = { sites: 29, found: 20, pri: 7, cf: 6, lm: 19, priVaried: 6, lmSame: 5 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));

// ---------- assets
L.donut(SLUG, ['SITEMAP', 'PRIORITY'], [['What the Tag', 'Claims to Do'], 'What Google Says', ['What 20 Real', 'Sitemaps Show'], 'Keep lastmod Accurate', 'Clean Up and Submit']);
L.cover(SLUG, { badge: 'REAL SITEMAP CHECK', search: 'sitemap priority', card: `Sitemaps read: ${D.found} sites`,
  lines: [`Sites with a sitemap: ${D.found} of ${D.sites}`, `Using priority: ${D.pri} of ${D.found}`, `Using changefreq: ${D.cf} of ${D.found}`, `Using lastmod: ${D.lm} of ${D.found}`, 'Google ignores priority'],
  last: 'Keep lastmod honest', big: `${D.pri} of ${D.found}`, k1: 'sitemaps set priority,', k2: 'and Google ignores it', title: 'Sitemap Priority', sub: 'Does the tag do anything? What we found' });
fs.writeFileSync(path.join(__dirname, 'infographic-sitemap-priority.html'), L.infographicHtml({
  title: `Sitemap Priority: ${D.found} Real Sitemaps Compared`, sub: 'Sites behind a Google Maps electrician search, sitemaps read on 14 October 2026',
  leftTitle: 'Which tags the sitemaps use', leftTag: `Number of the ${D.found} sitemaps found`, max: D.found,
  bars: [{ label: 'Use lastmod', sub: 'the tag Google can use', n: D.lm }, { label: 'Use priority', sub: 'ignored by Google', n: D.pri }, { label: 'Use changefreq', sub: 'ignored by Google', n: D.cf }, { label: 'Same lastmod on every URL', sub: 'a sign it is auto-stamped', n: D.lmSame }],
  rightTitle: 'What to do with the tags', rightTag: 'A short checklist', items: [
    { t: 'Keep lastmod accurate', s: 'change it only on real updates' }, { t: 'Drop priority and changefreq', s: 'harmless, but no benefit' },
    { t: 'List only indexable URLs', s: 'canonical, 200 status' }, { t: 'Submit it in Search Console', s: 'and reference it in robots.txt' }],
  big: `${D.pri} of ${D.found}`, noteHtml: `sitemaps set a <em>priority</em> that Google says it ignores. The tag worth getting right is lastmod.` }));
fs.writeFileSync(path.join(__dirname, 'table-sitemap-priority.html'), L.tableHtml({ title: `Sitemap tags across ${D.found} real sitemaps`, sub: `${D.sites} sites checked on 14 October 2026. ${D.none} had no sitemap at the robots.txt or default locations. Sites are not named.`,
  head: ['What we counted', 'Sitemaps'], lastBold: false,
  rows: [['Sites checked', D.sites], ['Sitemap found', D.found], ['Declared in robots.txt', `${D.inRobots} of ${D.found}`], ['Use a sitemap index', `${D.idx} of ${D.found}`], ['Use lastmod', `${D.lm} of ${D.found}`], ['Use priority', `${D.pri} of ${D.found}`], ['Use changefreq', `${D.cf} of ${D.found}`], ['Set different priorities per URL', `${D.priVaried} of ${D.pri}`], ['Same lastmod date on every URL', `${D.lmSame} of ${D.lm}`]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>We read the sitemaps of ${D.sites} real business websites and found that ${D.pri} of the ${D.found} sitemaps set a <code>priority</code> value, and ${D.cf} set <code>changefreq</code>. Google's documentation says it ignores both. That is the short answer to <strong>sitemap priority</strong>: it is a legitimate part of the sitemap format, it does no harm, and it does not change how Google crawls or ranks your pages.</p>

<p>The tag that can matter is <code>lastmod</code>, and the same sample shows how often it is set badly. This guide explains all three tags, what Google actually says, what we found and what to put in a sitemap in practice. If you are still building one, start with our <a href="/blog/how-to-create-a-sitemap">guide to creating a sitemap</a>.</p>

<h2>What the Priority Tag Is Meant to Do</h2>
<p>The sitemaps protocol defines an optional <code>priority</code> tag with a value from 0.0 to 1.0, with a default of 0.5. It was designed to tell crawlers how important one URL is compared with other URLs on the same site. The idea was that a site owner could mark the homepage at 1.0 and an archive page at 0.2. The protocol also says the value only describes pages relative to one another within a single site and does not affect how a site ranks against other sites.</p>
<p>A companion tag, <code>changefreq</code>, is meant to hint at how often a page changes, using values such as always, hourly, daily, weekly, monthly, yearly and never. The third optional tag, <code>lastmod</code>, gives the date a page was last modified.</p>

<h2>What Google Says About Priority and Changefreq</h2>
<p>Google's documentation for building a sitemap is direct about the first two tags and conditional about the third.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-sitemap-ignores-priority-changefreq.png" alt="Google Search Central build and submit a sitemap page: Google ignores priority and changefreq values, and uses the lastmod value if it is consistently and verifiably accurate" width="867" height="240" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Priority and changefreq are ignored.</strong> Google says it ignores both values. Setting them will not make a page crawl more often or rank higher.</li>
<li><strong>Lastmod is used when it is reliable.</strong> Google says it uses the lastmod value if it is consistently and verifiably accurate, for example by comparing it with the last modification of the page.</li>
<li><strong>Only significant updates count.</strong> The value should reflect the last significant update to the page, such as a change to the main content, not a footer tweak.</li>
</ul>
<p>The same page sets the size limits that still apply: a single sitemap can hold up to 50MB uncompressed or 50,000 URLs, and larger sites should split into several sitemaps and list them in a sitemap index file.</p>

<h2>What ${D.found} Real Sitemaps Show</h2>
<p>To see how the tags are used in practice, we took the websites behind ${D.sites} local businesses from a Google Maps search, looked for each site's sitemap through robots.txt and the common default addresses and read the first sitemap file that listed pages. ${D.found} had one we could read, and ${D.none} did not return a sitemap at those locations.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/sitemap-priority-tag-counts.png" alt="Table of sitemap tag use across 20 real sitemaps: lastmod 19, priority 7, changefreq 6, with 6 of 7 priority sitemaps using different values per URL and 5 of 19 using the same lastmod date on every URL" width="1280" height="560" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Lastmod is nearly universal.</strong> ${D.lm} of ${D.found} sitemaps include it, mostly because the CMS or plugin writes it automatically.</li>
<li><strong>Priority is used by about a third.</strong> ${D.pri} of ${D.found} set it, and ${D.priVaried} of those ${D.pri} give different pages different values, so someone deliberately ranked their pages, to no effect on Google.</li>
<li><strong>Changefreq follows the same pattern.</strong> ${D.cf} of ${D.found} include it, typically as weekly or monthly.</li>
<li><strong>Some lastmod values look auto-stamped.</strong> In ${D.lmSame} of the ${D.lm} sitemaps with lastmod, every URL carries the same date. When every page claims to have changed on the same day, the value says nothing about which pages did.</li>
</ul>

<h2>Why Priority Does Nothing for Google</h2>
<p>A tag that site owners set themselves is easy to abuse. If everyone marks every page at 1.0, the value stops carrying information, and a search engine that wants to know what to crawl needs better signals. Crawlers learn from the site itself: how pages link to each other, how often they actually change, how popular they are and how fast the server responds. For that reason a sitemap is best seen as a discovery list, a way of making sure URLs are known, not a ranking instruction.</p>

<h2>Lastmod: The Tag Worth Getting Right</h2>
<p>Lastmod is the only optional tag Google says it uses, and only when it proves reliable. That means three things in practice.</p>
<ul>
<li><strong>Change it only when the page really changes.</strong> If your plugin stamps today's date on every URL each time the sitemap is generated, the value is noise, and Google can learn to ignore it.</li>
<li><strong>Use the content's date, not the build date.</strong> A page's lastmod should come from the content record, such as the date of the last edit, not from the time the file was written.</li>
<li><strong>Format it properly.</strong> Use W3C date format, a full date such as 2026-10-14, or a date and time with a time zone.</li>
</ul>
<p>An easy check is to open the sitemap and look at the distribution of dates. If every URL shows the same day, or the date matches the day you looked, the value is not telling anyone anything. Our <a href="/tools/sitemap-url-extractor">sitemap URL extractor</a> pulls every URL and its lastmod into a list so you can sort them.</p>

<h2>What to Put in a Sitemap</h2>
<ul>
<li><strong>Only canonical, indexable URLs.</strong> Pages that return 200, are not blocked by robots.txt, carry no noindex and are the canonical version of their content. Redirects, errors and duplicates do not belong.</li>
<li><strong>Absolute URLs.</strong> Use the full address, with protocol and host, exactly as it should be indexed.</li>
<li><strong>A true lastmod, or none.</strong> It is better to omit the tag than to publish a wrong one.</li>
<li><strong>Specialist sitemaps where they help.</strong> Images and videos have their own extensions. See our <a href="/blog/image-sitemap">image sitemap</a> and <a href="/blog/video-sitemap">video sitemap</a> guides.</li>
</ul>
<p>You can leave priority and changefreq in if your generator writes them, since they do no harm. If you control the template, removing them makes the file smaller and the intent clearer.</p>

<h2>A Clean Minimal Example</h2>
<p>A minimal valid entry needs only the location. Add lastmod only if you can keep it accurate.</p>
<pre><code>&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://example.com/services/panel-upgrade&lt;/loc&gt;
    &lt;lastmod&gt;2026-10-14&lt;/lastmod&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</code></pre>

<h2>Submit and Monitor the Sitemap</h2>
<p>Reference the sitemap in your robots.txt file with a Sitemap line, and submit it in Search Console's Sitemaps report. The report shows when it was last read, how many URLs were discovered and any errors. If you use both a sitemap and robots.txt, check that your rules do not block pages you list, which our guide on <a href="/blog/robots-txt-sitemap">robots.txt and sitemaps</a> covers, and validate the file with our <a href="/tools/sitemap-validator">sitemap validator</a>. For the wider question of whether you need one at all, see <a href="/blog/is-sitemap-important-for-seo-2026">is a sitemap important for SEO</a>.</p>

<h2>Sitemap Choices by Type of Site</h2>
<ul>
<li><strong>A small business site of 10 to 50 pages.</strong> One file, a clean list of canonical URLs and an honest lastmod or none. The pages are usually all linked from the navigation, so the sitemap is mainly a safety net.</li>
<li><strong>A blog or publisher.</strong> The sitemap should pick up new posts quickly, and lastmod should change when a post is edited in a meaningful way. Do not bump the date for typo fixes.</li>
<li><strong>An ecommerce store.</strong> Split by type, for example products, categories and content, using an index file. Remove out-of-stock products only if the page is gone, and leave out faceted and filtered URLs that you do not want indexed.</li>
<li><strong>A site with many locations or services.</strong> List every location and service page, because these are often thin on internal links. Our <a href="/blog/local-seo-for-multiple-locations">multi-location guide</a> covers how those pages should be built.</li>
</ul>

<h2>How Lastmod Gets Set in a CMS</h2>
<p>Most sitemap files are written by a CMS or a plugin, so the lastmod you publish depends on what that software reads. A good setup takes the date from the content record's modified field and updates it only when the content is saved with changes. A poor setup uses the current time when the file is generated. You can tell which you have by loading the sitemap on two different days: if every date moves forward without any edits, the generator is stamping the request or build time. Fix it in the plugin settings or the template, and if you cannot make it accurate, omit the tag for those URLs.</p>

<h2>A 15-Minute Sitemap Audit</h2>
<ol>
<li>Open the sitemap in a browser and confirm it loads with a 200 status and valid XML.</li>
<li>Count the URLs and compare with the number of indexable pages you expect.</li>
<li>Sample ten URLs. Each should return 200, be indexable and be canonical to itself.</li>
<li>Sort lastmod values and check they differ and match real edits.</li>
<li>Confirm the file is referenced in robots.txt and submitted in Search Console.</li>
<li>Check the Sitemaps report for errors and the gap between submitted and indexed URLs.</li>
</ol>

<h2>Sitemaps and Internal Links Work Together</h2>
<p>A sitemap helps a crawler discover a URL, but it does not tell the crawler how the page relates to the rest of the site. Internal links do that. A page listed in the sitemap but linked from nowhere is known, but unsupported. Use the sitemap as a complete list and internal links as the structure, and check both when a page is slow to be indexed.</p>

<h2>When to Use a Sitemap Index</h2>
<p>A sitemap index is a file that lists other sitemap files. Use one when you pass the 50,000 URL or 50MB limit, or when splitting by section makes the reports easier to read. In Search Console you can submit just the index and still see each child file's status. A practical split is one file for pages, one for posts, one for products and one for images or video. When you read a sitemap index in our sample, we followed only the first child file, which is why we describe the data as a sample, not a full census of each site.</p>
<p>Keep each child file consistent: the same host, the same protocol and no URL repeated across files. Duplicated or mixed-host entries make the reports harder to trust and can hide real coverage problems. If you rename a file, update the index and the robots.txt reference together, so crawlers never follow a stale address.</p>

<h2>Common Sitemap Mistakes</h2>
<ul>
<li><strong>Spending time on priority values.</strong> The effort has no effect on Google, so spend it on the content and links.</li>
<li><strong>The same lastmod everywhere.</strong> It drains the value of the tag.</li>
<li><strong>Listing URLs that redirect or error.</strong> It wastes crawling and hides real problems.</li>
<li><strong>Listing noindex or non-canonical URLs.</strong> The sitemap and the page then disagree.</li>
<li><strong>Forgetting to update the file.</strong> A static sitemap that never changes will not list new pages.</li>
<li><strong>No sitemap reference.</strong> Without a robots.txt line or a submission, the file may never be found.</li>
</ul>

<p>In short, treat the sitemap as a clean, accurate list of the URLs you want found, and spend your effort on keeping that list true rather than on tags the search engine has told you it does not read.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-sitemap-priority.png" alt="Infographic of sitemap tag use across 20 real sitemaps: lastmod 19, priority 7, changefreq 6, and a short checklist of what to do with each tag" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Limits of This Sample</h2>
<ul>
<li>The sites are ${D.sites} local service businesses from one search, so the figures describe small business sites, not the whole web.</li>
<li>For sitemap indexes, we read only the first child sitemap that listed pages.</li>
<li>${D.none} sites returned no sitemap at the locations we tried, which may mean a custom address was in use.</li>
<li>A match on lastmod date shows a pattern, not intent, and some single-date sitemaps may be correct for small, static sites.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Google ignores priority and changefreq, so you can leave them out.</li>
<li>Lastmod is used only when it is consistently and verifiably accurate.</li>
<li>List only canonical, indexable URLs that return 200.</li>
<li>Stay under 50MB or 50,000 URLs per file, and use an index for more.</li>
<li>Reference the sitemap in robots.txt and submit it in Search Console.</li>
</ul>
<p>Not sure your sitemap is helping? <a href="/contact">Get in touch</a> and we will review it as part of a technical audit.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>Does sitemap priority affect rankings?</summary>
<p>No. Google's documentation says it ignores priority values, so setting them does not change how a page ranks or how often it is crawled.</p>
</details>
<details>
<summary>What does changefreq do in a sitemap?</summary>
<p>It hints at how often a page changes. Google says it ignores the value, so it has no effect on crawling.</p>
</details>
<details>
<summary>Does Google use lastmod?</summary>
<p>Yes, if the value is consistently and verifiably accurate, for example when it matches the page's real last modification. A value that is always the current date is not reliable.</p>
</details>
<details>
<summary>Should I remove priority and changefreq from my sitemap?</summary>
<p>You can. They do no harm, but removing them makes the file smaller and avoids implying a signal that does not exist.</p>
</details>
<details>
<summary>What is the default priority value?</summary>
<p>0.5 on a scale from 0.0 to 1.0, according to the sitemaps protocol. It is relative to other pages on the same site.</p>
</details>
<details>
<summary>How many URLs can a sitemap hold?</summary>
<p>Up to 50,000 URLs or 50MB uncompressed. Larger sites must split into several sitemaps and can list them in a sitemap index.</p>
</details>
<details>
<summary>Should every page be in the sitemap?</summary>
<p>Only the canonical, indexable pages you want in search. Leave out redirects, error pages, duplicates and anything with noindex.</p>
</details>
<details>
<summary>How do I tell Google where my sitemap is?</summary>
<p>Add a Sitemap line to robots.txt and submit the file in the Sitemaps report in Search Console.</p>
</details>
<details>
<summary>Do other search engines use priority?</summary>
<p>Support varies and is not documented the same way. Do not rely on it, and focus on accurate URLs and lastmod.</p>
</details>
</div>
`;
const title = 'Sitemap Priority: Does It Matter? What 20 Sitemaps Show';
const excerpt = `Sitemap priority explained with real data: ${D.pri} of ${D.found} sitemaps set it and Google ignores it. See what to do with priority, changefreq and lastmod.`;
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-10-14', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
