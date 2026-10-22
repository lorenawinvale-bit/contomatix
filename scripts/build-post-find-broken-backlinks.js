// Builds the "find broken backlinks" post + assets. node scripts/build-post-find-broken-backlinks.js [--write]
// Data: status check of every unique external link in this site's posts, 14 Oct 2026 (scripts/crawl-outbound-links.js).
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'find-broken-backlinks';
const O = require('../../keyword-research/outbound-links-2026-10-14.json');
const g = fn => O.filter(fn).length;
const D = { total: O.length, ok: g(o => o.status >= 200 && o.status < 300), redirected: g(o => o.redirected && o.status < 400), gone: g(o => o.status === 404 || o.status === 410),
  placeholder: g(o => (o.status === 404 || o.status === 410) && /^https?:\/\/example\.com/.test(o.url)), blocked: g(o => [401, 403, 429, 999].includes(o.status)), serverErr: g(o => o.status >= 500), failed: g(o => o.error && !o.status) };
D.real = D.gone - D.placeholder;
const exp = { total: 927, ok: 823, redirected: 153, gone: 7, placeholder: 5, real: 2, blocked: 90, serverErr: 2, failed: 5 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['FIND BROKEN', 'BACKLINKS'], [['Export Your', 'Linked Pages'], 'Check Each Status', ['Match to the', 'Best Page'], 'Redirect With a 301', 'Recheck and Monitor']);
L.cover(SLUG, { badge: 'REAL LINK CHECK', search: 'find broken backlinks', card: `Links checked: ${f(D.total)}`,
  lines: [`Unique links checked: ${f(D.total)}`, `Returned OK: ${D.ok}`, `Redirected: ${D.redirected}`, `Real 404s found: ${D.real}`, `Could not verify: ${D.blocked + D.serverErr + D.failed}`],
  last: 'Fix the page, keep the link', big: `${D.real} of ${f(D.total)}`, k1: 'links were truly', k2: 'broken, both fixed', title: 'Find Broken Backlinks', sub: 'A real status check of 927 links' });
fs.writeFileSync(path.join(__dirname, 'infographic-find-broken-backlinks.html'), L.infographicHtml({
  title: `Broken Links: ${f(D.total)} Real Links Checked`, sub: 'Every unique external link in our posts, status-checked on 14 October 2026',
  leftTitle: 'What the status check returned', leftTag: `Number of the ${f(D.total)} unique links`, max: D.total,
  bars: [{ label: 'Returned OK', sub: 'status 200 range after redirects', n: D.ok }, { label: 'Redirected first', sub: 'followed to a live page', n: D.redirected }, { label: 'Blocked or unclear', sub: 'bot checks, 401, 403, 429', n: D.blocked + D.serverErr + D.failed }, { label: 'Not found (404)', sub: `${D.placeholder} were example.com placeholders`, n: D.gone }],
  rightTitle: 'The broken backlink routine', rightTag: 'Run it each quarter', items: [
    { t: 'List pages that earn links', s: 'from Search Console Links' }, { t: 'Check each status code', s: '404 and 410 are the targets' },
    { t: 'Redirect to the best match', s: 'a 301 to the real replacement' }, { t: 'Recheck after changes', s: 'confirm 200 at the new URL' }],
  big: `${D.real} real`, noteHtml: `broken links in <em>${f(D.total)}</em> checked. Both were fixed the same day. The routine is quick, so make it regular.` }));
fs.writeFileSync(path.join(__dirname, 'table-find-broken-backlinks.html'), L.tableHtml({ title: `Status of ${f(D.total)} unique external links`, sub: 'Links taken from the body of every post on this site and checked with a HEAD then GET request on 14 October 2026.',
  head: ['What the check returned', 'Links'], lastBold: true,
  rows: [['Returned a success status', D.ok], ['Redirected before success (counted in the row above)', D.redirected], ['404 not found', D.gone], ['  of which example.com placeholders', D.placeholder], ['Blocked or refused the check (401, 403, 429)', D.blocked], ['Server error (5xx)', D.serverErr], ['Could not connect (timeout or certificate)', D.failed], ['Unique links checked', D.total]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>A broken backlink is a link from another website that points to a page on your site which no longer works. To <strong>find broken backlinks</strong> you list the pages that earn links, check each one's status code and fix the ones that return an error. We ran the same status check on our own side of the web: of ${f(D.total)} unique external links in our posts, ${D.real} were really broken. That small, real result is a useful lens, and this guide covers both directions: links pointing to you that land on a dead page, and your own links that point to dead pages elsewhere.</p>

<p>The method is simple enough to repeat each quarter. It uses Search Console, a status check and a redirect map. If you want to build the redirect map in bulk, our <a href="/tools/redirect-mapper">redirect mapper</a> does it in the browser.</p>

<h2>What a Broken Backlink Is, and Why It Costs You</h2>
<p>Someone links to a page on your site. Later you delete the page, change its URL or break it during a migration. The link now leads visitors to an error page, and the link's value does not reach any live page. The visitor is lost, and the effort of earning the link is wasted.</p>
<p>Google's crawling documentation explains what happens on its side. All 4xx errors, apart from 429, are treated the same way: crawlers tell the next system that the content does not exist, and a previously indexed URL is removed from the index. Newly encountered 404 pages are not processed, and crawl frequency gradually decreases.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-404-newly-encountered-not-processed.png" alt="Google crawling documentation on 4xx errors: the indexing pipeline removes the URL from the index if it was previously indexed, newly encountered 404 pages are not processed and crawling frequency gradually decreases" width="860" height="296" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>For the same documentation, a 301 redirect is the other half of the answer: Google follows it and uses it as a strong signal that the redirect target should be processed. A broken backlink with a correct 301 behind it sends visitors and signals to a live page.</p>

<h2>Step 1: List the Pages That Earn Links</h2>
<p>In Search Console, open the Links report. It lists your top linked pages, top linking sites and top linking text. Export the linked pages. Google describes the report as a sample, not a full list, so treat it as the minimum. If you also use a backlink tool, export its list of target URLs and add them. Our <a href="/blog/backlinks-report">backlinks report guide</a> explains how to read the data you get. On our own site, 11 of the 13 external links listed in the Links report point at the homepage, as covered in <a href="/blog/how-many-backlinks-do-i-need">how many backlinks you need</a>, which is a quick check: a homepage is rarely broken.</p>

<h2>Step 2: Check the Status of Every Linked Page</h2>
<p>For each linked URL, request the page and read the final status code. You are looking for 404 (not found) and 410 (gone), plus 5xx errors and soft 404s, where a page returns 200 but shows an error or an empty template. Search Console's Page indexing report lists pages it found as not found, which is a second source. Do not forget URL variants. A link to the version without a trailing slash, or with a tracking parameter, may fail even if the clean URL works.</p>

<h2>Step 3: Match Each Broken URL to Its Best Replacement</h2>
<p>For every broken URL, ask what a visitor wanted when they clicked. If the page was moved, the replacement is its new address. If it was merged into a broader guide, point it there. If it was removed and nothing replaces it, return a 404 or 410 and consider whether the link is worth asking the linking site to remove or update. Avoid sending every dead URL to the homepage. A redirect should lead to the page that actually continues the topic. Our <a href="/blog/canonical-hreflang">canonical and hreflang guide</a> covers how redirect targets and canonicals should agree.</p>

<h2>Step 4: Redirect With a 301 and Fix Internal Links</h2>
<p>Add a 301 redirect from each broken URL to its match. Use a permanent redirect because the move is permanent. Keep redirects to a single hop, because chains waste crawling and slow users. Then update your own internal links so they point straight at the final URL and do not rely on the redirect. Finally, if the linking site is friendly and the link is valuable, you can ask them to update it, but do not depend on this.</p>

<h2>Step 5: Recheck and Monitor</h2>
<p>After the change, request the old URL again and confirm it returns a 301 to a 200 page. Add the fixed URLs to a running log. Repeat the whole process each quarter, and after every migration, redesign or URL change. Many broken backlinks appear during exactly those events.</p>

<h2>The Other Direction: Broken Links Pointing Out</h2>
<p>The same status check works for outbound links, and it is worth running because broken outbound links hurt readers. We checked every unique external link in the body of all our posts, ${f(D.total)} in total.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/find-broken-backlinks-status-check.png" alt="Table of the status of 927 unique external links in our posts: 823 success, 153 redirected, 7 not found of which 5 were example.com placeholders, 90 blocked and 2 server errors" width="1280" height="575" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>${D.ok} of ${f(D.total)} returned a success status,</strong> and ${D.redirected} of the links redirected before they did, which is normal for http to https and www changes.</li>
<li><strong>${D.gone} returned 404,</strong> but ${D.placeholder} of those were example.com addresses used as placeholders in hreflang examples, not real links. That leaves ${D.real} genuinely broken links, a government rule page that had moved and the home page of a business site that no longer served pages.</li>
<li><strong>${D.blocked} refused the check</strong> with a 401, 403 or 429, which is how many sites treat automated requests. These are unverified, not broken.</li>
<li><strong>${D.serverErr + D.failed} could not be reached</strong> because of server errors, timeouts or certificate problems, and are worth a manual look.</li>
</ul>
<p>We repaired both real ones the same day: one pointed to the replacement page on the same government site, and the other had its link removed. Two broken links in ${f(D.total)} is a healthy result, but only a check could tell us so.</p>

<h2>Which Broken Backlinks to Fix First</h2>
<p>If the list is long, rank the broken URLs by what they are worth. Start with pages that have the most linking sites, because each fix restores the most value. Then take links from relevant, trusted sites over links from directories and scrapers. Finally, weigh the traffic: a link that sent visitors in the past is more worth saving than one nobody has clicked. Ten well-chosen redirects usually recover most of the benefit, and the long tail of low-value links can wait for the next review.</p>

<h2>A Worked Redirect Map</h2>
<p>A redirect map is a two-column list of old URL and new URL. Keep it in a spreadsheet and review it before it goes live. A small example for a service business might look like this.</p>
<ul>
<li><code>/services/ac-repair-denver</code> to <code>/services/air-conditioning-repair</code>, because the two pages were merged.</li>
<li><code>/blog/2019-hvac-tips</code> to <code>/blog/hvac-maintenance-checklist</code>, because the guide was rewritten under a new address.</li>
<li><code>/about-us.html</code> to <code>/about</code>, because the site changed its URL pattern.</li>
</ul>
<p>Each row is a deliberate match, not a catch-all. Check the final column for pages that are themselves redirects, and fix the chain so the old URL points straight at the live page.</p>

<h2>When a Page Is Really Gone</h2>
<p>Not every broken backlink should be redirected. If a page was removed because the product, service or topic no longer exists, and no page on your site continues it, a 404 or 410 is the honest answer. Forcing a redirect to an unrelated page can confuse readers and gives search engines a poor signal. In that case, make the 404 page useful: explain that the page has gone, offer search and link to your main sections. If the backlink is from a valuable site, consider recreating a short page on the topic, so the link has something relevant to land on.</p>

<h2>Preventing Broken Backlinks in the First Place</h2>
<ul>
<li><strong>Keep URLs stable.</strong> Choose clean, permanent URLs and avoid dates and file extensions that you may want to change.</li>
<li><strong>Plan redirects before a migration.</strong> Export all indexed and linked URLs, map them and test the redirects on a staging copy.</li>
<li><strong>Check before you delete.</strong> Before removing a page, look for links and traffic. If it has either, redirect or keep it.</li>
<li><strong>Review after launch.</strong> Watch the Page indexing report and server logs for new 404s in the first weeks.</li>
</ul>

<h2>Reporting the Result</h2>
<p>Record the number of broken URLs found, how many had external links, how many were redirected and how many were left as a 404 with the reason. Add the date of the check and the date of the next one. A simple log like this shows the work and makes the next review fast, and it fits neatly into the monthly report described in our <a href="/blog/local-seo-reporting">local SEO reporting guide</a>.</p>

<h2>Soft 404s: The Broken Pages That Return 200</h2>
<p>A soft 404 is a page that looks like an error to a visitor but returns a success status to a crawler. Typical causes are an empty template after a product is removed, a search results page with no results and a redirect that lands on an unrelated page. Google's documentation says Search Console shows a soft 404 when the content suggests an error, such as an empty page or an error message. To find them, open the Page indexing report and look for the soft 404 reason, and sample linked pages by eye as well as by status code. A broken backlink can hide behind a 200 for months, because the usual status check says everything is fine.</p>
<p>When you find one, decide the same way as for a normal 404: redirect it to the true replacement, restore the content or return a proper 404 or 410 status so that crawlers and visitors get a clear answer.</p>

<h2>Tools and Data Sources</h2>
<ul>
<li><strong>Search Console Links report.</strong> Top linked pages, linking sites and anchor text, free and first-party.</li>
<li><strong>Search Console Page indexing report.</strong> URLs Google found that returned not found.</li>
<li><strong>A crawler.</strong> Finds broken internal and outbound links across a site and exports status codes.</li>
<li><strong>Server logs.</strong> Show real requests to URLs that return 404, including those from external referrers.</li>
<li><strong>A backlink tool export.</strong> Lists target URLs from a wider index, which you can check in bulk.</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
<li><strong>Redirecting everything to the homepage.</strong> It loses the match between the link and the content.</li>
<li><strong>Using a 302 for a permanent move.</strong> Use a 301 so the signal is clear.</li>
<li><strong>Creating redirect chains.</strong> Each hop adds delay and risk.</li>
<li><strong>Ignoring soft 404s.</strong> A 200 page that says not found still fails the visitor.</li>
<li><strong>Only checking once.</strong> URLs change with every migration and redesign.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-find-broken-backlinks.png" alt="Infographic of a status check of 927 external links and a four-step routine for finding and fixing broken backlinks" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Limits of This Check</h2>
<ul>
<li>It covers links in our own post bodies, not every link on the site.</li>
<li>A page that returns 200 may still be wrong or empty, and the check cannot read meaning.</li>
<li>${D.blocked + D.serverErr + D.failed} links could not be verified automatically.</li>
<li>Search Console's Links report is a sample, so the list of linked pages you export is a minimum.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>List the pages that earn links, check each status code and fix any that return an error.</li>
<li>Use a single-hop 301 to the page that actually replaces the old one.</li>
<li>Update your internal links so they do not rely on the redirect.</li>
<li>Run the same check on your outbound links, and treat blocked results as unverified.</li>
<li>Repeat each quarter and after any URL change.</li>
</ul>
<p>Need broken backlinks and redirects mapped for a migration or an old site? <a href="/contact">Get in touch</a> and we will audit it.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is a broken backlink?</summary>
<p>A link from another website that points to a page on your site which now returns an error such as 404, so the visitor and the link's value are lost.</p>
</details>
<details>
<summary>How do I find broken backlinks for free?</summary>
<p>Export your top linked pages from the Search Console Links report, then check each URL's status code. Pages returning 404 or 410 are broken backlinks to fix.</p>
</details>
<details>
<summary>Should I redirect broken backlink URLs to the homepage?</summary>
<p>No. Redirect to the page that replaces the old one. A redirect to an unrelated page does not continue the topic the link was written for.</p>
</details>
<details>
<summary>Is a 301 redirect better than a 302 for this?</summary>
<p>Yes, when the move is permanent. Google follows a 301 and uses it as a strong signal that the target should be processed, while a 302 is a weaker signal.</p>
</details>
<details>
<summary>What does Google do with a 404 page?</summary>
<p>Google treats 4xx errors as content that does not exist. A previously indexed URL is removed from the index, newly found 404 pages are not processed and crawling frequency decreases.</p>
</details>
<details>
<summary>How often should I check for broken backlinks?</summary>
<p>Once a quarter, and after any migration, redesign or URL change, which are when most backlinks break.</p>
</details>
<details>
<summary>What is the difference between a broken backlink and a broken outbound link?</summary>
<p>A broken backlink is another site's link to a dead page on your site. A broken outbound link is your link to a dead page elsewhere. Both are worth fixing, for different reasons.</p>
</details>
<details>
<summary>Why do some links return 403 in a link checker?</summary>
<p>Many sites refuse automated requests, so a checker sees 403 or 429 even though the page works in a browser. Check those manually before calling them broken.</p>
</details>
<details>
<summary>Can I ask the linking site to update a broken link?</summary>
<p>You can, and for valuable links it is worth a short, polite email with the new URL. Do not rely on it, and set up the redirect regardless.</p>
</details>
</div>
`;
const title = 'Find Broken Backlinks: A Proven Method With Real Link Data';
const excerpt = `Find broken backlinks with Search Console and a status check. We tested ${f(D.total)} real links: ${D.real} were broken and both were fixed. Steps, redirects and mistakes.`;
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-14', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
