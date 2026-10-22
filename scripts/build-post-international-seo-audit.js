// Builds the "international seo audit" post + assets. node scripts/build-post-international-seo-audit.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'international-seo-audit';
// Search Console Performance > Countries, Web, last 3 months to 1 Oct 2026 (gsc-exports/performance-2026-10-02/Countries.csv)
const csv = fs.readFileSync(path.join(root, '..', 'gsc-exports', 'performance-2026-10-02', 'Countries.csv'), 'utf8').trim().split(/\r?\n/).slice(1).map(l => l.split(','));
const C = csv.map(r => ({ c: r[0], clicks: +r[1], imp: +r[2], pos: r[4] }));
const totClicks = C.reduce((s, x) => s + x.clicks, 0), totImp = C.reduce((s, x) => s + x.imp, 0);
const get = n => C.find(x => x.c === n);
const us = get('United States'), uk = get('United Kingdom'), pk = get('Pakistan');
const D = { countries: C.length, totClicks, totImp, usukImp: us.imp + uk.imp, usukClicks: us.clicks + uk.clicks, pkClicks: pk.clicks, pkImp: pk.imp };
console.log(JSON.stringify(D));
if (D.totClicks !== 48 || D.totImp !== 67619 || D.usukImp !== 62245 || D.usukClicks !== 8 || D.pkClicks !== 30 || D.pkImp !== 359) throw new Error('data changed');
const pct = (a, b) => (a / b * 100).toFixed(1);
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['INTERNATIONAL', 'SEO AUDIT'], [['Check Targeting', 'and Structure'], 'Audit Hreflang', 'Check Content Language', 'Test Crawling and Redirects', 'Read the Country Data']);
L.cover(SLUG, { badge: 'REAL COUNTRY DATA', search: 'international seo audit', card: 'Our own audit, Oct 2026',
  lines: ['Countries in our report: ' + D.countries, 'Hreflang annotations: 0', 'HTML lang attribute: en', `US + UK share of impressions: ${Math.round(D.usukImp / D.totImp * 100)}%`, `Pakistan share of clicks: ${Math.round(D.pkClicks / D.totClicks * 100)}%`],
  last: 'Audit the mix, not just tags', big: `${Math.round(D.usukImp / D.totImp * 100)}%`, k1: 'of impressions from US + UK', k2: 'but 8 of 48 clicks', title: 'International SEO Audit', sub: 'A checklist, run on our own site' });
fs.writeFileSync(path.join(__dirname, 'infographic-international-seo-audit.html'), L.infographicHtml({
  title: 'International SEO Audit: Our Own Country Mix', sub: 'Search Console, Web search, three months to 1 October 2026',
  leftTitle: 'Where impressions and clicks come from', leftTag: 'Share of impressions by country (percent)', max: 100,
  bars: [{ label: 'United States', sub: `${f(us.imp)} impressions, ${us.clicks} clicks`, n: Math.round(us.imp / D.totImp * 100), v: us.imp / D.totImp * 100 }, { label: 'United Kingdom', sub: `${f(uk.imp)} impressions, ${uk.clicks} click`, n: Math.round(uk.imp / D.totImp * 100), v: uk.imp / D.totImp * 100 }, { label: 'Pakistan', sub: `${pk.imp} impressions, ${pk.clicks} clicks`, n: 1, v: pk.imp / D.totImp * 100 }, { label: 'All other countries', sub: `${D.countries - 3} countries`, n: Math.round((D.totImp - us.imp - uk.imp - pk.imp) / D.totImp * 100) || 1, v: (D.totImp - us.imp - uk.imp - pk.imp) / D.totImp * 100 }],
  rightTitle: 'Audit checklist', rightTag: 'Core checks, in order', items: [
    { t: 'Structure and targeting', s: 'folders, subdomains or country domains' }, { t: 'Hreflang', s: 'reciprocal, fully qualified, valid codes' },
    { t: 'Content', s: 'each page fully in one language' }, { t: 'Crawling', s: 'no redirects based on perceived language' }],
  big: `${Math.round(D.usukImp / D.totImp * 100)}%`, noteHtml: `of our impressions came from the US and UK, yet <em>8 of 48 clicks</em> did. Compare where you are shown with where you are clicked.` }));
fs.writeFileSync(path.join(__dirname, 'table-international-seo-audit.html'), L.tableHtml({ title: 'Search Console country report for contomatix.com', sub: 'Performance, Web search, last three months to 1 October 2026. Top countries by impressions.',
  head: ['Country', 'Clicks', 'Impressions'], lastBold: true,
  rows: C.slice().sort((a, b) => b.imp - a.imp).slice(0, 6).map(x => [x.c, x.clicks, f(x.imp)]).concat([[`All ${D.countries} countries`, D.totClicks, f(D.totImp)]]) }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>Our own Search Console shows that ${pct(D.usukImp, D.totImp)} percent of this site's impressions came from the United States and United Kingdom, while ${D.pkClicks} of its ${D.totClicks} clicks came from Pakistan. Neither number is a problem by itself, but together they show why an <strong>international SEO audit</strong> starts with data, not with tags: where are you shown, where are you clicked, and does your set-up match the markets you want?</p>

<p>This guide gives a five-part checklist, based on Google's documentation for multilingual and multi-regional sites, and runs it on our own site as an example. It names the tools to use at each step, including our <a href="/tools/hreflang-sitemap-validator">hreflang sitemap validator</a>, and it shows what we found, including the reasons a single-language site should not add hreflang at all.</p>

<h2>What an International SEO Audit Covers</h2>
<p>An international audit asks whether search engines and users in each target market can find, understand and reach the right version of your content. That splits into five questions: how the versions are structured, how they are connected, whether the content is truly localised, whether crawlers can reach every version, and whether the data shows the markets responding. Our general method for turning findings into a report is in our <a href="/blog/seo-audit-report-template">SEO audit report template</a>.</p>

<h2>Check 1: Structure and Targeting</h2>
<p>Google describes three common ways to organise country or language versions, each with trade-offs.</p>
<ul>
<li><strong>Country-code domains</strong> such as example.de give clear geotargeting and easy separation but cost more, can be hard to get and target one country each.</li>
<li><strong>Subdomains</strong> such as de.example.com are simple to set up and can use different server locations, though users may not know whether the prefix means a language or a country.</li>
<li><strong>Subdirectories</strong> such as example.com/de/ are low maintenance on one host, with a single server location and less separation.</li>
</ul>
<p>Google also says server location is not a definitive signal. Content language and currency, local addresses and phone numbers, and links from local sites are among the other signals it lists. For the audit, note which structure you use and whether the local signals match each market.</p>

<h2>Check 2: Hreflang</h2>
<p>Hreflang tells Google that pages are localised variations of the same content. Google lets you use it in the page head, in an HTTP header or in the sitemap, treats the three as equivalent and says there is no benefit in using all three. The guidelines are strict, so this is where audits find most faults.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-hreflang-guidelines-all-methods.jpg" alt="Google Search Central localized versions page: hreflang tells Google about variations of content, Google does not use hreflang or the HTML lang attribute to detect language, and each language version must list itself and all others" width="1144" height="346" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Return links.</strong> Each version must list itself and all the others. If two pages do not point to each other, Google ignores the annotations.</li>
<li><strong>Fully qualified URLs.</strong> Include the protocol. Relative or protocol-relative addresses are not valid.</li>
<li><strong>Valid codes.</strong> Language codes come from ISO 639-1 and region codes from ISO 3166-1 alpha-2. A region alone is not valid.</li>
<li><strong>A fallback.</strong> The reserved x-default value covers visitors whose language does not match any version, such as a language selector page.</li>
<li><strong>One method.</strong> Pick the page head, header or sitemap, not all three.</li>
</ul>
<p>An important detail that surprises many people: Google does not use hreflang or the HTML lang attribute to detect the language of a page. It uses algorithms on the visible content. Fixing the lang attribute is good for accessibility, but it will not change which language Google thinks a page is in. Our guide to <a href="/blog/canonical-hreflang">canonical and hreflang together</a> covers the interaction with canonical tags.</p>

<h2>Check 3: Content and Language</h2>
<p>Google recommends using a single language for the content and navigation on each page and avoiding side-by-side translations. Translating only the template while leaving the main content in one language can create a poor experience, and such pages can be seen as duplicates. The audit should sample pages in each market and check that the main content, titles, descriptions, images with text and structured data are translated, not just the menu.</p>

<h2>Check 4: Crawling and Redirects</h2>
<p>Google advises against redirecting users automatically based on a guess about their language, because it can stop users and search engines from reaching all versions. Googlebot usually crawls from the United States and does not send an Accept-Language header, so content that changes dynamically by language may never be seen. The audit should confirm that every version has a stable, crawlable URL, that versions link to each other in visible links, and that they are listed in the sitemap. A robots.txt block on a language folder is a classic fault, and our <a href="/tools/robots-txt-tester">robots.txt tester</a> shows it quickly.</p>

<h2>Check 5: Read the Country Data</h2>
<p>The last check is the one most checklists skip: what does the data say? In Search Console, open Performance, choose the Countries tab and compare impressions with clicks. Ours looked like this.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/international-seo-audit-country-table.png" alt="Search Console country report for contomatix.com: United States 45,450 impressions and 7 clicks, United Kingdom 16,795 impressions and 1 click, Pakistan 359 impressions and 30 clicks" width="1280" height="500" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Impressions follow the target market.</strong> The United States and United Kingdom account for ${pct(D.usukImp, D.totImp)} percent of impressions, which matches the English-language, US and UK audience the content is written for.</li>
<li><strong>Clicks do not.</strong> Those two countries produced ${D.usukClicks} of ${D.totClicks} clicks, at average positions of ${us.pos} and ${uk.pos}, while ${D.pkClicks} clicks came from a country with ${pct(D.pkImp, D.totImp)} percent of impressions, at an average position of ${pk.pos}.</li>
<li><strong>Nothing suggests a language problem.</strong> The visible gap is ranking position in the target markets, which no hreflang change would fix.</li>
</ul>

<h2>Our Own Audit Result</h2>
<p>We checked the homepage, a service page and a tool page for the three signals above. All three declare <code>lang="en"</code> and a canonical URL, and none has an hreflang annotation. Our sitemap has no hreflang entries either. That is correct, not a fault: the site has a single English version, so there is nothing for hreflang to connect. Adding it would create annotations that point only at themselves and would add maintenance for no benefit. The audit conclusion for us is therefore "no international set-up needed", with the market-mix finding above as the one item to watch.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-international-seo-audit.png" alt="Infographic of Contomatix's Search Console country mix, 67 percent of impressions from the US, 25 percent from the UK, and a five-step international SEO audit checklist" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>International SEO Audit Checklist You Can Copy</h2>
<p>Use this as a working list. Each line should end as pass, fail or not applicable, with a URL as evidence.</p>
<ol>
<li><strong>Markets.</strong> List the countries and languages you want to win, and the countries Search Console says you appear in today.</li>
<li><strong>Structure.</strong> Record whether each market uses a country domain, a subdomain or a subdirectory, and confirm the choice is applied consistently.</li>
<li><strong>Hreflang source.</strong> Identify whether annotations live in the page head, in HTTP headers or in the sitemap, and confirm only one method is used.</li>
<li><strong>Return links.</strong> Pick five page groups and confirm every version points at every other version and at itself.</li>
<li><strong>Codes.</strong> Validate each language and region code, and confirm an x-default exists where there is a selector or fallback page.</li>
<li><strong>Canonicals.</strong> Confirm each localised page canonicalises to itself, not to the primary-language version.</li>
<li><strong>Content.</strong> Sample titles, headings, body copy, images with text and structured data in each language.</li>
<li><strong>Local signals.</strong> Check currency, address, phone number, shipping and legal pages for each market.</li>
<li><strong>Crawling.</strong> Test each version with a fresh session, with no cookies and no language header, and test robots.txt rules per folder.</li>
<li><strong>Sitemaps.</strong> Confirm every version is listed with the right URL, and that hreflang entries, if used there, validate.</li>
<li><strong>Data.</strong> Compare impressions, clicks and average position per country, and flag markets with high impressions and low clicks.</li>
<li><strong>Report.</strong> Write each failure as a finding with the evidence, the fix and who owns it.</li>
</ol>
<p>Step 6 deserves a note. Pointing a localised page's canonical at the primary version tells Google to treat the localised page as a duplicate, which works against hreflang. The two signals must agree, and our <a href="/blog/canonical-hreflang">canonical and hreflang guide</a> shows what that looks like.</p>

<h2>Common International SEO Mistakes</h2>
<ul>
<li><strong>Hreflang without return links.</strong> One-way annotations are ignored.</li>
<li><strong>Language-only content with region codes.</strong> Using region codes that do not exist, such as a region with no language.</li>
<li><strong>Auto-redirecting by IP or browser language.</strong> It hides versions from users and crawlers.</li>
<li><strong>Machine-translated pages left raw.</strong> They are the weakest pages on the site and can drag its quality.</li>
<li><strong>Mixed signals.</strong> A German page with English currency, a UK address and a US phone number.</li>
</ul>

<h2>Limits of This Example</h2>
<ul>
<li>Our site is single-language, so the hreflang checks are shown against Google's rules, not against a broken set-up.</li>
<li>Search Console's country data is a sample of three months and says nothing about causes.</li>
<li>We checked three page templates, not every page.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Start an international audit with country data, then check structure, hreflang, content, crawling and local signals.</li>
<li>Hreflang needs return links, fully qualified URLs, valid codes and one method, and Google does not use it to detect language.</li>
<li>Do not redirect users automatically by language, and keep every version crawlable and linked.</li>
<li>A single-language site does not need hreflang.</li>
<li>Compare impressions with clicks by country before you change anything.</li>
</ul>
<p>If you run a multilingual or multi-regional site and want an audit with owner-ready findings, Contomatix can do it. <a href="/contact">Get in touch</a> and we will scope it.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is an international SEO audit?</summary>
<p>A review of whether search engines and users in each target market can find and reach the right version of your content, covering structure, hreflang, content language, crawlability and country data.</p>
</details>
<details>
<summary>What should an international SEO audit checklist include?</summary>
<p>URL structure and targeting, hreflang annotations, translated content, crawling and redirect behaviour, local signals such as currency and addresses, and performance by country in Search Console.</p>
</details>
<details>
<summary>Do I need hreflang if my site has one language?</summary>
<p>No. Hreflang connects localised variations of the same content. A single-language site has nothing to connect, and adding annotations only creates maintenance.</p>
</details>
<details>
<summary>Does Google use the HTML lang attribute to detect page language?</summary>
<p>No. Google says it does not use hreflang or the HTML lang attribute to detect the language of a page. It uses algorithms on the visible content.</p>
</details>
<details>
<summary>Which is better: ccTLDs, subdomains or subdirectories?</summary>
<p>Each has trade-offs. Country domains give the clearest geotargeting but cost more and cover one country. Subdomains and subdirectories are simpler to run but give less separation. Choose based on how much you can maintain.</p>
</details>
<details>
<summary>What is x-default in hreflang?</summary>
<p>A reserved value used when no other language or region matches the visitor, such as a language selector or a default version.</p>
</details>
<details>
<summary>Should I redirect visitors to a version based on their language?</summary>
<p>Google advises against automatic redirection based on perceived language, because it can stop users and search engines from reaching all versions. Link to the other versions instead.</p>
</details>
<details>
<summary>Why does hreflang get ignored?</summary>
<p>The most common cause is missing return links. Each version must list itself and all the others, and the URLs must be fully qualified with valid language and region codes.</p>
</details>
<details>
<summary>How do I check which countries my site performs in?</summary>
<p>Open the Performance report in Search Console and use the Countries tab to compare impressions, clicks and average position by country.</p>
</details>
</div>
`;
const title = 'International SEO Audit: A Verified Checklist With Real Data';
const excerpt = 'International SEO audit checklist run on our own site: structure, hreflang, content language, crawling and country data, with Google’s rules for each.';
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-10-12', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
