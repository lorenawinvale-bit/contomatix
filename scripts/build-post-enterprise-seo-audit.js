// Builds and inserts the "enterprise seo audit" post. Local helper: node scripts/build-post-enterprise-seo-audit.js [--write]
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..');
const SLUG = 'enterprise-seo-audit';
const crawl = require('../../contomatix-audit/onpage-results.json');
const blog = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blog.json'), 'utf8'));
const P = crawl.pages;

const seg = u => { const x = new URL(u); const p = x.pathname;
  if (p === '/blog' ) return 'Blog listing and paginated URLs';
  if (/^\/blog\/./.test(p)) return 'Blog posts';
  if (/^\/team/.test(p)) return 'Team and author pages';
  if (/^\/tools/.test(p)) return 'Tools';
  if (/^\/services/.test(p)) return 'Services';
  return 'Other (home, about, contact, legal)'; };
const order = ['Blog posts', 'Blog listing and paginated URLs', 'Team and author pages', 'Tools', 'Services', 'Other (home, about, contact, legal)'];
const med = a => { a = a.slice().sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };
const excluded = p => /noindex/.test(p.robots || '') || (p.canonical && p.canonical.replace(/\/$/, '') !== p.url.replace(/\/$/, ''));
const groups = {}; P.forEach(p => (groups[seg(p.url)] = groups[seg(p.url)] || []).push(p));
const stats = order.map(k => { const a = groups[k]; return { k, n: a.length, sm: a.filter(p => p.inSitemap).length, ex: a.filter(excluded).length, thin: a.filter(p => p.words < 400).length, ds: a.filter(p => p.descLen < 110).length, ms: med(a.map(p => p.ms)) }; });
const tot = stats.reduce((t, s) => ({ n: t.n + s.n, sm: t.sm + s.sm, ex: t.ex + s.ex, thin: t.thin + s.thin, ds: t.ds + s.ds }), { n: 0, sm: 0, ex: 0, thin: 0, ds: 0 });
const S = Object.fromEntries(stats.map(s => [s.k, s]));
const date = {}; blog.forEach(p => date[p.slug] = p.date);
const noFaq = P.filter(p => p.isPost && !p.faqCount);
const faqDates = noFaq.map(p => date[p.url.split('/blog/')[1]]).sort();
const postsN = P.filter(p => p.isPost).length;
console.log(JSON.stringify({ tot, stats, noFaq: noFaq.length, postsN, first: faqDates[0], cohort: faqDates.filter(d => d >= '2026-10-01').length, crawledAt: crawl.crawledAt }));
if (tot.n !== 419 || tot.thin !== 89 || S['Blog posts'].thin !== 0 || S['Blog listing and paginated URLs'].n !== 60 || S['Blog listing and paginated URLs'].ex !== 35 || noFaq.length !== 25 || postsN !== 296 || faqDates.filter(d => d >= '2026-10-01').length !== 24) throw new Error('data changed');
const thinNonPost = tot.thin - S['Blog posts'].thin;

const tr = stats.map(s => `<tr><td>${s.k}</td><td style="text-align:right;">${s.n}</td><td style="text-align:right;">${s.sm}</td><td style="text-align:right;">${s.ex}</td><td style="text-align:right;">${s.thin}</td><td style="text-align:right;">${s.ds}</td><td style="text-align:right;">${s.ms}</td></tr>`).join('\n');
const totRow = `<tr style="font-weight:700;"><td>All URLs</td><td style="text-align:right;">${tot.n}</td><td style="text-align:right;">${tot.sm}</td><td style="text-align:right;">${tot.ex}</td><td style="text-align:right;">${tot.thin}</td><td style="text-align:right;">${tot.ds}</td><td style="text-align:right;">&nbsp;</td></tr>`;

const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>Our crawl flagged ${tot.thin} thin pages. Not one of them was a blog post. That single fact is the best argument for how an <strong>enterprise SEO audit</strong> should work: before you count problems, split the site into the groups of pages that share a template, and judge each group on its own.</p>

<p>Contomatix is not an enterprise. The site we crawled has ${tot.n} URLs, which is small by any standard, so treat the numbers below as a worked example and the method as the part that scales. This guide explains what makes an enterprise audit different, shows the segment-first approach on real crawl data, describes a defect that only a group-level view caught, and lists the steps we would follow on a much larger site. If you run a smaller site, our <a href="/blog/website-seo-audit">website SEO audit checklist</a> is the better starting point.</p>

<h2>What an Enterprise SEO Audit Is, and What It Is Not</h2>
<p>There is no official size at which a site becomes an enterprise. Agencies tend to use it for sites with thousands or millions of URLs, many contributors and several teams that each own part of the site. The size matters less than the situation: when no one person can look at every page, the audit stops being a checklist and becomes a sampling and prioritisation exercise.</p>
<p>That changes three things compared with a standard audit.</p>
<ul>
<li><strong>The unit of analysis is the template, not the URL.</strong> Ten thousand product pages built from one template share one set of strengths and faults. You audit the template and measure how many URLs it affects.</li>
<li><strong>Ownership becomes part of the output.</strong> A fix to a page template belongs to a developer, a fix to editorial guidelines belongs to a content lead and a fix to a redirect map belongs to infrastructure. A finding without an owner rarely gets done.</li>
<li><strong>You cannot see everything, so you sample on purpose.</strong> Some checks, such as rendering a page and reading its field performance data, cost too much to run on every URL.</li>
</ul>

<h2>Why Raw Issue Counts Mislead at Scale</h2>
<p>A crawler gives you totals: so many missing descriptions, so many short pages, so many titles under a certain length. On a large site those totals are huge and almost meaningless, because they mix pages that matter with pages that were never meant to rank.</p>
<p>Our own crawl shows the effect in miniature. Across all ${tot.n} URLs the raw totals read ${tot.thin} pages under 400 words and ${tot.ds} meta descriptions under 110 characters. Read as a to-do list, that looks like a content problem. It is not one, and the next section shows why.</p>

<h2>Our Test Crawl: ${tot.n} URLs Grouped by Template</h2>
<p>We crawled the live site on 9 October 2026 with our own audit script, following the sitemap and every internal link it found. Every one of the ${tot.n} URLs returned a 200 status. Then, instead of reading the totals, we grouped each URL by the template that produced it and compared the groups.</p>
<div style="overflow-x:auto;margin:18px 0;">
<table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
<thead><tr><th style="text-align:left;">Segment</th><th style="text-align:right;">URLs</th><th style="text-align:right;">In sitemap</th><th style="text-align:right;">Noindex or canonical elsewhere</th><th style="text-align:right;">Under 400 words</th><th style="text-align:right;">Description under 110 chars</th><th style="text-align:right;">Median fetch (ms)</th></tr></thead>
<tbody>
${tr}
${totRow}
</tbody>
</table>
</div>
<p>"Noindex or canonical elsewhere" counts URLs that tell search engines to skip them or to treat another URL as the main version. Median fetch time is how long our crawler took to download the page, so it reflects our connection as well as the server and is only useful for comparing segments with each other.</p>

<h2>What Segmenting Changed in Our Findings</h2>
<p>With the groups side by side, the picture is very different from the totals.</p>
<ul>
<li><strong>The ${S['Blog posts'].n} blog posts are clean on those two checks.</strong> None is under 400 words and none has a short description. The ${tot.thin} thin pages are all elsewhere.</li>
<li><strong>${S['Blog listing and paginated URLs'].n} of the ${thinNonPost} non-post thin pages are blog listing URLs,</strong> the filtered and paginated versions of the blog index. Of those, ${S['Blog listing and paginated URLs'].ex} are marked noindex or point their canonical at another URL on purpose. A listing page is a list of links, so a low word count is how it is supposed to look.</li>
<li><strong>${S['Team and author pages'].thin} of the thin pages are team and author pages,</strong> including their paginated archives. They are short because they list posts.</li>
<li><strong>Blog listing URLs supply ${S['Blog listing and paginated URLs'].ds} of the ${tot.ds} short descriptions,</strong> because the listing template reuses one description. The other ${tot.ds - S['Blog listing and paginated URLs'].ds} are on tool, service and other pages.</li>
</ul>
<p>Without grouping, the audit would have produced a long list of "thin content" tickets and sent someone off to expand pages that should stay short. With grouping, the content team had nothing to do and the useful question became different: is the listing template doing what we intend with its canonical and noindex rules?</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/enterprise-seo-audit-segment-crawl.png" alt="Table of the Contomatix crawl grouped by template: blog posts, blog listing URLs, team pages, tools, services and other pages, with counts for sitemap, noindex, thin content and short descriptions" width="1280" height="590" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>A Defect Only a Group View Caught</h2>
<p>The same crawl turned up something real. ${noFaq.length} of our ${postsN} blog posts had no FAQ structured data, while the other ${postsN - noFaq.length} did. Looked at one URL at a time, that is ${noFaq.length} separate items on a list. Looked at by publish date, it is one event: ${faqDates.filter(d => d >= '2026-10-01').length} of the ${noFaq.length} were published on consecutive days from 1 to 8 October, three a day, and the other was published on 21 September.</p>
<p>The cause turned out to be a markup difference. The site generates FAQ structured data by reading the FAQ block from each post, and those posts wrapped their questions in a differently named container, so the code never found them. The questions are visible on the page for readers, which is why a visual review would never have caught it. At the time of the crawl the problem was still open.</p>
<p>This is the kind of defect that grows quietly at scale. A change in a publishing workflow, a CMS update or a new template variant affects everything produced afterwards, and the only way to see it is to compare cohorts: pages by template, by publish period or by author.</p>

<h2>The Segment-First Method in Seven Steps</h2>
<p>The infographic shows where our ${tot.thin} thin pages sat and the core of the method. The full seven steps follow it.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-enterprise-seo-audit.png" alt="Infographic of the thin pages in the Contomatix crawl by segment: 60 blog listing URLs, 27 team and author pages, 2 contact and legal pages and 0 blog posts, with four steps of the segment-first method" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ol>
<li><strong>Agree scope and owners.</strong> List which teams control templates, content, redirects and infrastructure. Decide up front who receives each type of finding.</li>
<li><strong>Define segments from URL patterns.</strong> Folders, parameters and page types usually map to templates. Add a second cut by publish date or release, which is how we found the missing FAQ data.</li>
<li><strong>Crawl as much as you can.</strong> Export the results with one row per URL and a segment column, so every later step can filter by group.</li>
<li><strong>Compare rates, not totals.</strong> A defect on 3 percent of a segment is a different problem from one on 80 percent. Look for segments that differ sharply from their siblings.</li>
<li><strong>Remove deliberate exclusions first.</strong> Pages that are noindexed or canonicalised on purpose should not be counted as problems. Check that the rules themselves are right instead.</li>
<li><strong>Sample the expensive checks.</strong> Pick a fixed number of URLs per template to test for rendering, structured data and performance, and say how many you tested.</li>
<li><strong>Ticket by template and report per segment.</strong> Each ticket states the template, the number of URLs affected and the owner. After the fix, re-crawl and show the segment before and after.</li>
</ol>

<h2>What Google Says About Large Sites and Crawling</h2>
<p>Google publishes a guide for owners of large sites, and its audience gives a rough sense of scale. The guide is aimed at sites with a million or more unique pages whose content changes about weekly, sites with ten thousand or more pages that change daily, and sites where a large share of URLs sit in the "Discovered, currently not indexed" status. Google calls these figures rough estimates rather than exact thresholds.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-large-site-crawl-budget-guide.jpg" alt="Google crawling infrastructure guide Optimize your crawl budget, listing who the guide is for: sites with a million or more pages, sites with 10,000 or more pages that change daily, and sites with many URLs not indexed" width="947" height="455" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Several of Google's own limits explain why segmenting is necessary and not just convenient. The guide, <a href="https://developers.google.com/crawling/docs/crawl-budget" target="_blank" rel="nofollow noopener">Optimize your crawl budget</a>, defines crawl capacity as the server time Google will spend on your site and crawl demand as how much it wants to crawl, which depends on size, update frequency, quality and relevance.</p>
<ul>
<li><strong>Sitemaps have size limits.</strong> A single sitemap file is capped at 50,000 URLs or 50 MB uncompressed, so large sites split them and list the parts in a sitemap index. Splitting by segment is also useful for diagnosis.</li>
<li><strong>Search Console can filter by sitemap.</strong> The Page indexing report has a dropdown to filter results by a specific sitemap, which gives you an indexing view per segment if each segment has its own sitemap.</li>
<li><strong>The report cannot show everything.</strong> Example URL lists in the Page indexing report are limited to 1,000 rows, so on a large site you work from samples and segments, not complete lists.</li>
<li><strong>The Crawl Stats report is for advanced users.</strong> It shows total requests, download size, average response time and host status, and Google says sites with fewer than a thousand pages usually do not need it.</li>
</ul>

<h2>Data and Tools You Will Need</h2>
<p>An enterprise audit rarely uses one tool. Plan for a crawler that can export one row per URL, Search Console for indexing and query data, an analytics source for traffic by segment, and server logs if you can get them. You will also need a spreadsheet or database where the segment column lives, because that column is what turns a crawl into an audit. A free <a href="/tools/sitemap-validator">sitemap validator</a> helps when you split sitemaps by segment, since a malformed file in a sitemap index is easy to miss.</p>

<h2>The Limits of This Example</h2>
<p>Our crawl is a worked example, not a case study of an enterprise audit. It covers ${tot.n} URLs on one site, run from one machine, by our own script, and it checks on-page and indexability signals rather than rendering, performance or backlinks. We did not use server logs. The segment rules are our own and a different split might group some pages differently. What we can say is that the method changed what we concluded from the same data, and that it found a real defect the totals hid.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Audit templates, not URLs. Group pages by what produced them before you count issues.</li>
<li>In our crawl, ${tot.thin} thin pages shrank to zero blog posts once the pages were segmented.</li>
<li>Remove deliberate noindex and canonical pages from the issue list, then check the rules.</li>
<li>Compare cohorts by template and by publish date to catch workflow defects.</li>
<li>Google's large-site guidance uses rough thresholds of 10,000 and 1,000,000 pages, and its reports cap example lists, so sampling is built in.</li>
<li>Write tickets per template with the URL count and an owner.</li>
</ul>
<p>If your site is large enough that nobody can review it page by page, Contomatix can run this kind of segmented audit and turn the findings into owner-ready tickets. <a href="/contact">Get in touch</a> and we will scope it.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is an enterprise SEO audit?</summary>
<p>It is an SEO review of a very large or organisationally complex site, built around templates, sampling and ownership because the site is too big to check page by page. The main outputs are prioritised fixes tied to the templates and teams responsible.</p>
</details>
<details>
<summary>How many pages does a site need to be "enterprise"?</summary>
<p>There is no official number. Agencies use the term for sites with thousands to millions of URLs. Google's crawl budget guide uses rough estimates of 10,000 or more pages changing daily and 1 million or more changing weekly, and says they are not exact thresholds.</p>
</details>
<details>
<summary>How is it different from a regular SEO audit?</summary>
<p>A regular audit can inspect most pages directly. An enterprise audit groups pages by template, compares issue rates between groups, samples costly checks and assigns each finding to the team that owns the fix.</p>
</details>
<details>
<summary>How long does an enterprise SEO audit take?</summary>
<p>It depends on the size of the site, the access you have and how many teams are involved. The crawl itself can run in hours, while setting segments, validating findings and agreeing owners usually takes far longer than the crawl.</p>
</details>
<details>
<summary>What tools do I need?</summary>
<p>A crawler that exports one row per URL, Search Console, an analytics source and, where available, server logs. A spreadsheet or database with a segment column ties them together.</p>
</details>
<details>
<summary>Does my site need to worry about crawl budget?</summary>
<p>Probably not if it is small. Google's guide is aimed at very large sites and sites with many URLs stuck at "Discovered, currently not indexed". Google also says sites with fewer than about a thousand pages usually do not need the Crawl Stats report.</p>
</details>
<details>
<summary>Why segment by template instead of fixing page by page?</summary>
<p>Pages built from one template share their defects. Fixing the template repairs every page at once and stops the problem from returning, while page-by-page fixes leave the cause in place.</p>
</details>
<details>
<summary>Should noindexed pages be counted as errors?</summary>
<p>Not if the noindex is deliberate. Separate pages that are excluded on purpose from pages that should be indexed, then verify that the exclusion rules are correct.</p>
</details>
<details>
<summary>How do I find defects that affect many pages at once?</summary>
<p>Compare cohorts. Group pages by template, publish date, author or release and look for a group whose behaviour differs from its neighbours. In our crawl, grouping by publish date showed that every post from one run of days lacked FAQ structured data.</p>
</details>
</div>
`;

const title = 'Enterprise SEO Audit: A Complete Segment-by-Segment Guide';
const excerpt = 'Enterprise SEO audit method tested on a real 419-URL crawl: group pages by template first, and 89 thin pages turned into zero blog posts to fix.';
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-10-09', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt len', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'first ext', (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const f = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(f, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(f, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
