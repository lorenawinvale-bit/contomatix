// Builds the "seo audit report template" post + assets. node scripts/build-post-seo-audit-report-template.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'seo-audit-report-template';
const crawl = require('../../contomatix-audit/onpage-results.json'); const P = crawl.pages;
const posts = P.filter(p => p.isPost);
const c = f => P.filter(f).length;
const D = {
  pages: P.length, posts: posts.length, ok200: c(p => p.status === 200), inSitemap: c(p => p.inSitemap),
  imgs: P.reduce((s, p) => s + (p.images || 0), 0), noAlt: c(p => (p.imgNoAlt || []).length), noDims: c(p => (p.imgNoDims || []).length),
  noFaq: posts.filter(p => !(p.schemaTypes || []).includes('FAQPage')).length,
  bp: posts.filter(p => (p.schemaTypes || []).includes('BlogPosting')).length, bc: posts.filter(p => (p.schemaTypes || []).includes('BreadcrumbList')).length,
  tLong: c(p => p.titleLen > 60), tLongTools: c(p => p.titleLen > 60 && /\/tools\//.test(p.url)), tShort: c(p => p.titleLen < 35),
  dLong: c(p => p.descLen > 160), noOg: c(p => !(p.og && p.og.image)), mixed: c(p => p.mixed && p.mixed.length),
  medMs: P.map(p => p.ms).sort((a, b) => a - b)[Math.floor(P.length / 2)], maxMs: Math.max(...P.map(p => p.ms))
};
console.log(JSON.stringify(D));
const exp = { pages: 419, posts: 296, ok200: 419, inSitemap: 337, imgs: 2841, noAlt: 0, noDims: 0, noFaq: 25, bp: 296, bc: 296, tLong: 8, tLongTools: 8, tShort: 51, dLong: 2, noOg: 0, mixed: 0, medMs: 512, maxMs: 6598 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed: ' + k + ' ' + D[k]);
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['SEO AUDIT', 'REPORT'], [['Summary and', 'Scope'], 'Scorecard of Checks', 'Findings With Evidence', ['Priority and', 'Owner'], 'What Passed']);
L.cover(SLUG, { badge: 'REAL AUDIT SAMPLE', search: 'seo audit report template', card: 'Our own audit, 9 Oct 2026',
  lines: [`URLs crawled: ${D.pages}`, `Returned 200: ${D.ok200}`, `Real findings: 5`, `False positives caught: 2`, `Images missing alt: ${D.noAlt} of ${f(D.imgs)}`],
  last: 'Verify before you ticket', big: '5 + 2', k1: 'real findings and', k2: 'false positives', title: 'SEO Audit Report Template', sub: 'A filled-in sample from a real crawl' });
fs.writeFileSync(path.join(__dirname, 'infographic-seo-audit-report-template.html'), L.infographicHtml({
  title: 'SEO Audit Report: What Our Crawl Found', sub: `${D.pages} URLs crawled on 9 October 2026, findings by priority`,
  leftTitle: 'Findings by priority', leftTag: 'Number of affected pages or URLs per finding', max: 51,
  bars: [{ label: 'Sitemap lastmod = request date', sub: 'high: URLs affected', n: 42 }, { label: 'Posts without FAQ data', sub: 'high: of 296 posts', n: D.noFaq }, { label: 'Titles under 35 chars', sub: 'medium: mostly list pages', n: D.tShort }, { label: 'Tool titles over 60 chars', sub: 'medium: truncation risk', n: D.tLongTools }, { label: 'Descriptions over 160', sub: 'low', n: D.dLong }],
  rightTitle: 'Report sections', rightTag: 'The skeleton to reuse', items: [
    { t: 'Summary and scope', s: 'what was checked, and how' }, { t: 'Scorecard', s: 'pass, warn or fail for each check' },
    { t: 'Findings with evidence', s: 'URL list, impact, effort, owner' }, { t: 'What passed', s: 'so nobody re-checks it' }],
  big: '2 of 8', noteHtml: `crawler flags were <em>false positives</em> once checked in the rendered page. Verify every finding before it becomes a ticket.` }));
const rows = [
  ['1', 'High', 'Sitemap lastmod stamped with the request date', '42 of 341 sitemap URLs', 'Use a real modified date or leave lastmod out'],
  ['2', 'High', 'Posts with no FAQ structured data', `${D.noFaq} of ${D.posts} posts`, 'Wrap the FAQ block in the container the schema code reads'],
  ['3', 'Medium', 'Titles under 35 characters', `${D.tShort} pages`, 'Rewrite on money pages, ignore noindexed list pages'],
  ['4', 'Medium', 'Tool page titles over 60 characters', `${D.tLongTools} pages`, 'Shorten the brand suffix so the keyword stays visible'],
  ['5', 'Low', 'Meta descriptions over 160 characters', `${D.dLong} pages`, 'Trim to about 155 characters'],
  ['6', 'Info', 'One slow fetch, 6.6 s against a 0.5 s median', '1 page', 'Re-test, it is a single measurement']];
const trs = rows.map(r => `<tr><td>${r[0]}</td><td class="p ${r[1]}">${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('');
fs.writeFileSync(path.join(__dirname, 'table-seo-audit-report-template.html'), `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1280px;box-sizing:border-box;background:#fff;font-family:'Segoe UI',Arial,sans-serif;color:#16192A;padding:28px 32px}
h3{margin:0 0 4px;font-size:22px}p.s{margin:0 0 16px;color:#6b6459;font-size:15px}
table{width:100%;border-collapse:collapse;font-size:17px}th{background:#F1EDE3;text-align:left;padding:12px 14px;font-size:13px;color:#6b6459;text-transform:uppercase;letter-spacing:.3px}
td{padding:13px 14px;border-bottom:1px solid #EAE0D2;vertical-align:top}td:first-child{font-weight:700;width:34px}.p{font-weight:800;width:90px}.High{color:#B42318}.Medium{color:#B5730E}.Low{color:#0B807C}.Info{color:#6b6459}
</style></head><body><h3>Findings, ordered by priority</h3><p class="s">contomatix.com, crawl of 9 October 2026 (419 URLs) plus the sitemap file as fetched on 10 October. Priority = impact first, effort second.</p>
<table><thead><tr><th>#</th><th>Priority</th><th>Finding</th><th>Evidence</th><th>Suggested fix</th></tr></thead><tbody>${trs}</tbody></table></body></html>`);

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>A good <strong>SEO audit report template</strong> does one job: it turns a pile of crawler output into a short list of decisions, each with evidence, a priority and an owner. Most templates stop at the empty headings. This one comes with a filled-in sample, because the sample is where the judgement shows. We ran a crawl of our own site on 9 October 2026, wrote up what it found and, along the way, caught two findings that turned out to be false alarms.</p>

<p>Below you will find the report skeleton to copy, our real findings in that format, how to prioritise them, which checks Google's own documentation gives numbers for, and where reports usually go wrong. If you are still deciding how much work an audit needs, our guide to the <a href="/blog/seo-audit-cost">cost of an SEO audit</a> covers scope and price.</p>

<h2>What an SEO Audit Report Should Contain</h2>
<p>Whether you call it an SEO website audit report or a technical review, the readers are the same: someone who has to approve work and someone who has to do it. Both need the same seven things.</p>
<ol>
<li><strong>Summary.</strong> Three to five sentences: what was checked, the headline result and the first thing to fix.</li>
<li><strong>Scope and method.</strong> The date, the URLs or sections covered, the tools and the limits of what was tested.</li>
<li><strong>Scorecard.</strong> One line per check with a pass, warning or fail so the reader sees the shape of the site at a glance.</li>
<li><strong>Findings.</strong> Each with evidence, affected URLs, impact, effort, suggested fix and owner.</li>
<li><strong>What passed.</strong> The checks that were clean, so nobody repeats them.</li>
<li><strong>Action plan.</strong> The findings in order, grouped into things to do now, next and later.</li>
<li><strong>Appendix.</strong> URL lists, raw exports and anything too long for the body.</li>
</ol>

<h2>The SEO Audit Report Template</h2>
<p>Copy this skeleton into a document or spreadsheet. The finding table is the part to keep strict, because it is what turns observations into work.</p>
<pre style="background:#F1EDE3;padding:14px 16px;border-radius:8px;overflow-x:auto;font-size:0.85rem;line-height:1.5;"><code>SEO AUDIT REPORT: [site name]
Date: [crawl date]   Prepared by: [name]   Scope: [URLs / sections]

1. SUMMARY
   [What was checked. Headline result. First fix.]

2. SCOPE AND METHOD
   Crawl: [tool, number of URLs, date]
   Data: [Search Console range, analytics, other]
   Not covered: [what this audit did not test]

3. SCORECARD
   Crawlability   [pass / warn / fail]
   Indexing       [pass / warn / fail]
   On-page        [pass / warn / fail]
   Structured data[pass / warn / fail]
   Performance    [pass / warn / fail]

4. FINDINGS
   # | Priority | Finding | Evidence (URLs, counts) | Impact | Effort | Fix | Owner

5. WHAT PASSED
   [Checks with no issues]

6. ACTION PLAN
   Now / Next / Later

7. APPENDIX
   [URL lists, exports]</code></pre>

<h2>SEO Audit Report Sample: Our Own Site</h2>
<p>To show the template in use, here is the findings table from our own crawl. The crawl covered ${D.pages} URLs and every one returned a 200 status. The sitemap lists ${D.inSitemap} of them. We judged findings by impact first and effort second.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/seo-audit-report-sample-findings.png" alt="Findings table from a Contomatix crawl of 419 URLs on 9 October 2026, with six findings ordered by priority: sitemap lastmod, missing FAQ structured data, short titles, long tool titles, long descriptions and one slow fetch" width="1280" height="560" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>A few notes on how to read it.</p>
<ul>
<li><strong>The two high items are about trust signals.</strong> Google says it uses a sitemap's <code>lastmod</code> only if it is consistently and verifiably accurate. On our site, 42 of 341 sitemap URLs (the static, service, location and team pages) were stamped with the date of the request, so the value changes daily whether or not a page changed.</li>
<li><strong>Structured data is a template problem.</strong> ${D.noFaq} of ${D.posts} posts had no FAQ structured data, against ${D.posts - D.noFaq} that did. They were mostly posts published on consecutive days, which pointed to one cause and not to ${D.noFaq} separate faults.</li>
<li><strong>The medium items need judgement.</strong> Of the ${D.tShort} short titles, most sit on blog list pages that are marked noindex, so they are not worth rewriting. The ${D.tLongTools} tool-page titles over 60 characters run to between 61 and 68 and risk being cut off in results.</li>
<li><strong>Low and info items stay on the list.</strong> They cost little to fix or re-test and they show the reader that the whole site was looked at.</li>
</ul>

<h2>A Scorecard Example</h2>
<p>The scorecard is the one-page view a busy reader will actually look at. Here is ours for the same crawl, using only checks we ran.</p>
<ul>
<li><strong>Crawlability: pass.</strong> All ${D.pages} URLs returned 200, and robots.txt allows crawling except for the admin area and points to the sitemap.</li>
<li><strong>Indexing: warning.</strong> Blog list URLs are noindexed or canonicalised on purpose, but the sitemap's <code>lastmod</code> values for 42 non-post URLs are not trustworthy.</li>
<li><strong>On-page: warning.</strong> ${D.tShort} short titles, ${D.tLongTools} long tool-page titles and ${D.dLong} long descriptions.</li>
<li><strong>Structured data: warning.</strong> ${D.noFaq} posts have no FAQ markup while every post has article and breadcrumb markup.</li>
<li><strong>Performance: not measured.</strong> Field data was outside this crawl, so the scorecard says so instead of guessing.</li>
</ul>
<p>Writing "not measured" is deliberate. A blank cell invites the reader to assume the best, and an honest gap tells them where the next audit should look.</p>

<h2>Client Report or Internal Ticket List?</h2>
<p>The same findings serve two readers. A client or manager wants the summary, the scorecard and the priorities in plain language, with the effect on the business stated. A developer or editor wants each finding as a ticket with the URL list, the fix and an acceptance test. Keep both from one source: the findings table. Send the summary to the first reader and export the rows as tickets for the second, so the numbers never drift apart.</p>

<h2>What Passed</h2>
<p>A report that lists only problems makes a site look worse than it is and invites people to re-check things that were fine. Ours recorded these as passes:</p>
<ul>
<li>All ${D.pages} URLs returned a 200 status, so there were no broken internal pages.</li>
<li>None of the ${f(D.imgs)} images found was missing alt text or width and height attributes.</li>
<li>No page loaded mixed content, and every page had a viewport tag, a language attribute and a social preview image.</li>
<li>Every one of the ${D.posts} posts carried article and breadcrumb structured data.</li>
</ul>

<h2>Two False Positives We Caught</h2>
<p>Our crawler raised two findings that did not survive a second look, and both are worth writing down because they are common.</p>
<ul>
<li><strong>"Two H1 headings" on a tool page.</strong> The page contained the text of an H1 tag inside an example snippet, which a raw-HTML scan counted. In the rendered page there was exactly one H1.</li>
<li><strong>"Invalid JSON-LD" on another tool page.</strong> A script string in the page's own JavaScript contained the opening tag for a JSON-LD block, and the crawler tried to parse it. The page had four valid blocks.</li>
</ul>
<p>The fix to the process is simple. Before a finding becomes a ticket, check it in the rendered page or in the relevant Google test, and mark it confirmed. Nothing else wastes a developer's goodwill faster than a ticket that turns out to be wrong.</p>

<h2>How to Prioritise Findings</h2>
<p>Use two questions in this order: how many pages or users does this affect, and how costly is it to fix. Then add a third that people forget: is there a single cause? Several findings that share one cause become one ticket.</p>
<ul>
<li><strong>High:</strong> affects indexing, crawling or many pages and is cheap or moderate to fix.</li>
<li><strong>Medium:</strong> affects a meaningful slice of pages or a page type that earns traffic.</li>
<li><strong>Low:</strong> cosmetic or isolated, fix when you are in the file anyway.</li>
<li><strong>Info:</strong> a single measurement or a note to re-test.</li>
</ul>

<h2>Checks Google Gives Numbers For</h2>
<p>Most audit checks are judgement calls, but a few have published thresholds worth putting in the scorecard. Google's Core Web Vitals guidance sets the "good" values as a Largest Contentful Paint of 2.5 seconds or less, an Interaction to Next Paint of 200 milliseconds or less and a Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile of page loads and assessed separately for mobile and desktop. Our own crawl did not measure these, because they come from field data. Take them from Search Console's Core Web Vitals report or PageSpeed Insights and record the source.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/web-dev-core-web-vitals-thresholds.jpg" alt="web.dev article on Core Web Vitals showing the good thresholds for Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift" width="1520" height="610" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>For indexing, use the reason names that Search Console reports so that your findings match what the team will see. The ones that usually matter in an audit are <em>Discovered - currently not indexed</em>, <em>Crawled - currently not indexed</em>, <em>Duplicate without user-selected canonical</em>, <em>Soft 404</em> and <em>Page with redirect</em>. Google's <a href="https://web.dev/articles/vitals" target="_blank" rel="nofollow noopener">Core Web Vitals article</a> has the metric definitions in full.</p>

<h2>SEO Audit Report PDF: Format and Delivery</h2>
<p>Most clients want a PDF, and the format matters less than the habits around it. Write the report in a document or spreadsheet, keep the findings table to one page where you can, and export to PDF at the end. Keep the editable version too, because the action plan changes as work is done. Number every finding so that tickets, emails and the next report can refer to it without ambiguity.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-seo-audit-report-template.png" alt="Infographic of findings from a Contomatix crawl of 419 URLs ordered by priority, with the four sections of an SEO audit report to reuse and a note that 2 of 8 crawler flags were false positives" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Common Mistakes in Audit Reports</h2>
<ul>
<li><strong>Counting without segmenting.</strong> A raw total of thin pages or short titles means little until you split it by page type. Our <a href="/blog/enterprise-seo-audit">segment-first audit method</a> shows how.</li>
<li><strong>No evidence.</strong> "Titles are too long" is not a finding. "8 tool pages have titles of 61 to 68 characters" is.</li>
<li><strong>No owner.</strong> A fix that belongs to no one does not happen.</li>
<li><strong>Skipping what passed.</strong> It makes the site look worse and invites repeat work.</li>
<li><strong>Untested claims.</strong> Verify each flag before it leaves your desk.</li>
</ul>

<h2>Limits of This Sample</h2>
<ul>
<li>It reflects one crawl on one day, run with our own script from one machine, so it is a snapshot and not a monitoring system.</li>
<li>It covers on-page and indexability signals and the sitemap file. It does not include Core Web Vitals field data, backlinks or log files.</li>
<li>We have not fixed every item in the table, and we do not claim any ranking effect from fixing them.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A report is a list of decisions, each with evidence, a priority and an owner.</li>
<li>Use seven sections: summary, scope, scorecard, findings, what passed, action plan and appendix.</li>
<li>Our sample crawl of ${D.pages} URLs produced five real findings, one informational note and two false positives.</li>
<li>Group findings that share a cause into one ticket, and record what passed.</li>
<li>Use Google's Core Web Vitals thresholds and Search Console's reason names so your wording matches the tools.</li>
<li>Verify every flag in the rendered page before it becomes a ticket.</li>
</ul>
<p>If you would like an audit report like this for your own site, with a clear owner and priority on every finding, Contomatix can produce it. <a href="/contact">Get in touch</a> and we will scope it.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What should an SEO audit report include?</summary>
<p>A summary, the scope and method, a scorecard, findings with evidence, priority and owner, a list of what passed, an action plan and an appendix with URL lists and exports.</p>
</details>
<details>
<summary>Is there a free SEO audit report template?</summary>
<p>Yes. The skeleton on this page can be copied into a document or spreadsheet. The part to keep strict is the findings table, with evidence, impact, effort, fix and owner for every item.</p>
</details>
<details>
<summary>What does an SEO audit report sample look like?</summary>
<p>A short summary followed by a table of findings ordered by priority. Our sample covers a crawl of 419 URLs and lists six items, from high-priority structured data and sitemap issues to a low-priority description length note.</p>
</details>
<details>
<summary>How long should an SEO website audit report be?</summary>
<p>As long as it needs to be to make the decisions clear, and no longer. A short summary and a findings table that fits one or two pages is more useful than a long export of every check.</p>
</details>
<details>
<summary>How do I prioritise audit findings?</summary>
<p>Rank by impact first, effort second, and group findings that share a single cause into one ticket. A fix that affects indexing or many pages and is cheap to do goes first.</p>
</details>
<details>
<summary>What are the Core Web Vitals thresholds for a pass?</summary>
<p>Google's guidance gives good values of 2.5 seconds or less for Largest Contentful Paint, 200 milliseconds or less for Interaction to Next Paint and 0.1 or less for Cumulative Layout Shift, at the 75th percentile and separately for mobile and desktop.</p>
</details>
<details>
<summary>Can I give a client the audit as a PDF?</summary>
<p>Yes. Write it in a document, export it to PDF and keep the editable version for the action plan. Number the findings so later reports can refer back to them.</p>
</details>
<details>
<summary>Why did my crawler report errors that turned out to be wrong?</summary>
<p>Crawlers that scan raw HTML can mistake example code or script strings for real elements. Confirm each flag in the rendered page, or in Google's own testing tools, before logging it as a finding.</p>
</details>
<details>
<summary>How often should I run an SEO audit?</summary>
<p>At least once or twice a year, and after a redesign, a migration or a large traffic change. On a site that publishes often, a lighter monthly crawl with the same checks catches regressions early.</p>
</details>
</div>
`;
const title = 'SEO Audit Report Template: A Verified, Filled-In Sample';
const excerpt = 'SEO audit report template with a filled-in sample from a real 419-URL crawl: the sections, how to prioritise findings, and two false positives caught.';
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Hamza Siddiqui', date: '2026-10-11', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
