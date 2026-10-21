// Builds the "link reclamation" post + assets. node scripts/build-post-link-reclamation.js [--write]
// Data: Google search for "contomatix" -site:contomatix.com (21 Oct 2026), 25 result pages opened and checked; 8 organic results for "link reclamation" (Google US, 21 Oct 2026). Sites are described by type, not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'link-reclamation';
const R = require('../../keyword-research/serp-link-reclamation-2026-10-21.json');
const M = require('../../keyword-research/brand-mentions-visible-2026-10-21.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], tools: c(o => o.tools), outreach: c(o => o.outreach), broken: c(o => o.brokenOr404), brand: c(o => o.brand), alerts: c(o => o.alerts), measure: c(o => o.measure), steps: c(o => o.steps), example: c(o => o.example), template: c(o => o.template), policy: c(o => o.googlePolicy), googleDoc: c(o => o.googleDoc), nofollow: c(o => o.nofollow), relevance: c(o => o.relevance) };
const exp = { ok: 8, median: 3028, tools: 8, outreach: 8, broken: 8, brand: 7, alerts: 7, measure: 7, steps: 6, example: 5, template: 2, policy: 1, googleDoc: 0, nofollow: 2, relevance: 7 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const ready = M.filter(o => o.status === 200), blocked = M.length - ready.length;
const vis = ready.filter(o => o.textMentions > 0), social = vis.filter(o => /linkedin\.com|facebook\.com/.test(o.url)), third = vis.filter(o => !/linkedin\.com|facebook\.com/.test(o.url));
const linked = third.filter(o => o.links > 0), unlinked = third.filter(o => !o.links); const unlinkedSites = new Set(unlinked.map(o => new URL(o.url).hostname.replace(/^www\./, '')));
const S = { found: M.length, readable: ready.length, blocked, visible: vis.length, social: social.length, third: third.length, linked: linked.length, unlinked: unlinked.length, unlinkedSites: unlinkedSites.size };
const expS = { found: 25, readable: 22, blocked: 3, visible: 17, social: 3, third: 14, linked: 6, unlinked: 8, unlinkedSites: 2 };
for (const k of Object.keys(expS)) if (S[k] !== expS[k]) throw new Error('scan changed ' + k + ' ' + S[k]);
console.log(JSON.stringify(D), JSON.stringify(S));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['LINK', 'RECLAMATION'], [['Find Unlinked', 'Mentions'], 'Fix Broken Links', ['Spot Lost', 'Links'], 'Ask Politely', ['Verify and', 'Track']]);
L.cover(SLUG, { badge: 'REAL BRAND SCAN', search: 'link reclamation', card: `Pages found: ${S.found}`,
  lines: [`Readable pages: ${S.readable}`, `Mention our brand: ${S.visible} of ${S.readable}`, `Third-party pages: ${S.third}`, `Link to us: ${S.linked} of ${S.third}`, `Unlinked mentions: ${S.unlinked}`],
  last: 'Reclaim before you build', big: `${S.unlinked} of ${S.third}`, k1: 'third-party mentions', k2: 'have no link to us', title: 'Link Reclamation', sub: `A real scan of our own brand mentions` });
fs.writeFileSync(path.join(__dirname, 'infographic-link-reclamation.html'), L.infographicHtml({
  title: 'Our Brand Mentions: 8 of 14 Unlinked', sub: 'Google search for our brand name, 21 October 2026, result pages opened and checked',
  leftTitle: 'Third-party pages that mention us', leftTag: `Number of the ${S.third} pages`, max: S.third,
  bars: [{ label: 'Mention and link', sub: 'a link to our site', n: S.linked }, { label: 'Mention, no link', sub: 'reclamation targets', n: S.unlinked }, { label: 'Our own social pages', sub: 'not reclamation', n: S.social }, { label: 'Blocked or unread', sub: 'automated access refused', n: S.blocked }],
  rightTitle: 'Three kinds of reclamation', rightTag: 'Start with the easiest', items: [
    { t: 'Unlinked mentions', s: 'your name, no link' }, { t: 'Broken links to you', s: 'a 404 on your site' },
    { t: 'Lost links', s: 'a link that disappeared' }, { t: 'Ask, never pay', s: 'no swaps or fees' }],
  big: `${S.unlinked} of ${S.third}`, noteHtml: `third-party pages mention us <em>without a link</em>, and all ${S.unlinked} sit on just ${S.unlinkedSites} sites.` }));
fs.writeFileSync(path.join(__dirname, 'table-link-reclamation-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for link reclamation say`, sub: `Organic results read on 21 October 2026 (${D.ok} of 8 readable). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Outreach or emailing the site', `${D.outreach} of ${D.ok}`], ['Broken links, 404s or redirects', `${D.broken} of ${D.ok}`], ['Named tools such as Search Console', `${D.tools} of ${D.ok}`], ['Brand mentions or unlinked mentions', `${D.brand} of ${D.ok}`], ['Alerts or mention monitoring', `${D.alerts} of ${D.ok}`], ['Measuring results', `${D.measure} of ${D.ok}`], ['Relevance', `${D.relevance} of ${D.ok}`], ['Step-by-step instructions', `${D.steps} of ${D.ok}`], ['An email template', `${D.template} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ['Google spam policy', `${D.policy} of ${D.ok}`], ['Citing Google documentation', `${D.googleDoc} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-link-reclamation-ours.html'), L.tableHtml({ title: 'We searched for our own brand: what the 25 pages show', sub: 'Google search for "contomatix" excluding our own site, 21 October 2026. Each result page was opened and checked for the brand name in visible text and for a link to contomatix.com. Sites are not named.',
  head: ['Measure', 'Pages'], lastBold: false,
  rows: [['Result pages found and checked', String(S.found)], ['Opened successfully', String(S.readable)], ['Blocked automated access', String(S.blocked)], ['Mention our brand in visible text', String(S.visible)], ['Of those, our own social pages', String(S.social)], ['Of those, third-party pages', String(S.third)], ['Third-party pages that link to us', String(S.linked)], ['Third-party pages that mention us without a link', `${S.unlinked} (on ${S.unlinkedSites} sites)`]] }));
fs.writeFileSync(path.join(__dirname, 'table-link-reclamation-types.html'), L.tableHtml({ title: 'Three kinds of link reclamation', sub: 'A working framework from Contomatix. Methods use free tools only.',
  head: ['Kind', 'What you find', 'Free way to find it'], lastBold: false,
  rows: [['Unlinked mentions', 'Your name or product named with no link', 'Google search for the exact name, minus your own site'], ['Broken links to you', 'A link that lands on a 404 on your site', 'Search Console Page indexing and Links reports'], ['Lost links', 'A link that existed and was removed', 'Compare your Links report export over time']] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [1280, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1];
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Link reclamation</strong> is the work of turning links you already deserve into links you actually have: unlinked mentions of your brand, broken links that point at your site, and links that used to exist and disappeared. To see how much is on the table for a young site, we searched Google for our own brand name and opened every result. Of ${S.third} third-party pages that mention Contomatix, ${S.linked} link to us and ${S.unlinked} do not, and all ${S.unlinked} unlinked mentions sit on just ${S.unlinkedSites} sites.</p>

<p>Below you will find the three kinds of reclamation, what ${D.ok} ranking guides say, the results of our own brand scan, how to find each kind for free, how to ask without breaking Google's rules, what to leave alone and how to measure the result. It pairs with our guides to <a href="/blog/editorial-backlinks">editorial backlinks</a> and <a href="/blog/find-broken-backlinks">finding broken backlinks</a>.</p>

<h2>What Link Reclamation Is</h2>
<p>Most link building is about winning links you do not have. Reclamation starts from links you are already close to having. The three situations are different, but share one advantage: the other site already knows you. An <strong>unlinked mention</strong> is a page that names your brand, product or tool without linking to you. A <strong>broken link to your site</strong> is a link that exists but lands on an error page on your domain, often after a page was moved or deleted. A <strong>lost link</strong> is a link that used to point at you and has been removed or changed. People searching for unlinked mentions, brand mentions for SEO or link recovery are all describing a version of this work.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-reclamation-types.png" alt="Table of three kinds of link reclamation: unlinked mentions found with a Google search for the exact name, broken links to you found in Search Console reports, and lost links found by comparing Links report exports" width="1280" height="@@TYPESH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>What the Ranking Pages Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-reclamation-serp.png" alt="Table of what 8 pages ranking for link reclamation mention: outreach 8, broken links 8, tools 8, brand mentions 7, alerts 7, measuring results 7, relevance 7, steps 6, an email template 2, nofollow or sponsored 2, Google spam policy 1 and Google documentation 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The method is shared.</strong> All ${D.ok} pages cover outreach, broken links and tools, and ${D.brand} of ${D.ok} cover brand mentions.</li>
<li><strong>Monitoring is standard.</strong> ${D.alerts} of ${D.ok} mention alerts or mention-monitoring tools, and ${D.measure} of ${D.ok} discuss measuring results.</li>
<li><strong>Templates are scarce.</strong> Only ${D.template} of ${D.ok} give an email template, even though outreach is the step that wins the link.</li>
<li><strong>The rules are missing.</strong> ${D.policy} of ${D.ok} mention Google's spam policy, ${D.nofollow} mention nofollow or sponsored, and none cite Google's documentation.</li>
<li><strong>Real numbers are absent.</strong> None show what a scan of their own brand returned, which is what we do next.</li>
</ul>

<h2>We Scanned Our Own Brand: What We Found</h2>
<p>On 21 October 2026 we searched Google for our brand name, excluding our own site, and opened every result page. For each page we checked whether the brand appears in the visible text and whether the page links to contomatix.com.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-reclamation-ours.png" alt="Table of the brand scan: 25 result pages found, 22 opened, 3 blocked, 17 mention the brand in visible text, 3 of those are our own social pages and 14 are third-party pages, 6 of which link to us and 8 of which mention us without a link on 2 sites" width="1280" height="@@OURSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>${S.visible} of ${S.readable} readable pages name the brand.</strong> The other ${S.readable - S.visible} matched the search for other reasons.</li>
<li><strong>${S.social} of the ${S.visible} are our own social pages,</strong> which are not reclamation targets because we control them.</li>
<li><strong>${S.linked} of the ${S.third} third-party pages link to us.</strong> They are directory profiles, tool listings, a site-status page and two articles that mention us in running text.</li>
<li><strong>${S.unlinked} third-party pages name us and do not link.</strong> Seven of them are launch-listing pages on one directory site that list our free tools, and one is an agency profile page.</li>
<li><strong>${S.blocked} pages refused automated access,</strong> so the true count of mentions may be higher.</li>
</ul>
<p>Two things stand out. First, reclamation targets are concentrated: ${S.unlinked} pages but only ${S.unlinkedSites} sites, so one polite message can cover several pages. Second, the best candidates are not the biggest sites but the ones that already describe what we do. Our two editorial mentions in articles already link, so the work lies in the listing and profile pages.</p>

<h2>How to Find Unlinked Mentions for Free</h2>
<ol>
<li><strong>Search for the exact name.</strong> Use quotation marks and exclude your own site, for example <code>"your brand" -site:yourdomain.com</code>. Repeat for product names and the names of your founders or tools.</li>
<li><strong>Add a second query without quotes.</strong> Searching the domain name alone can surface pages that mention your address in text.</li>
<li><strong>Open each result.</strong> Check the visible text for the name and the source for a link to your domain.</li>
<li><strong>Set up alerts.</strong> Free alert tools can email you when new pages mention your name. Check the settings so they do not miss misspellings.</li>
<li><strong>Record each page</strong> with the site, the URL, whether a contact is listed and whether the mention is in a sentence or a list.</li>
</ol>

<h2>How to Find Broken Links and Lost Links</h2>
<p>For <strong>broken links to your site</strong>, open Search Console and look at the Page indexing report for pages marked Not found (404), then compare them with the Links report. Any 404 that other sites link to is worth fixing with a redirect to the closest live page, which restores the value of the link without any outreach. Our guide to <a href="/blog/find-broken-backlinks">finding broken backlinks</a> shows the method. For <strong>lost links</strong>, export the Links report now and again next month, and compare the two lists. A linking page that has vanished from the second export is a candidate to investigate: it may have been deleted, redirected, or edited to remove the link.</p>

<h2>How to Ask for a Link Without Breaking the Rules</h2>
<p>Keep the email short, name the page, say what you do and give the exact URL you would like linked. Thank the author, make it easy to say no and do not offer anything in return. Google's spam policy lists buying or selling links for ranking purposes and excessive link exchanges as link spam, and says paid links should be qualified with <code>nofollow</code> or <code>sponsored</code>. A reclamation request is a favour between editors, not a trade. Our free <a href="/tools/outreach-email-generator">outreach email generator</a> has an unlinked-mention template, and you can score each page with the <a href="/tools/link-prospect-scorer">link prospect scorer</a> before you write.</p>
<p>A request can be as simple as this, with your own details in place: "Thank you for including Acme in your guide to analytics tools. It would help readers find us if the name linked to acme.com/tools. No problem if you prefer to leave it as it is."</p>

<h2>What Not to Reclaim</h2>
<ul>
<li><strong>Your own profiles.</strong> Social pages, directory listings you manage and accounts you control are yours to edit. Add the link yourself.</li>
<li><strong>Pages with no editor.</strong> Auto-generated listings, scraped pages and trust-report pages have nobody to ask.</li>
<li><strong>Irrelevant or spammy sites.</strong> A link from a site you would not want to be associated with is not worth reclaiming.</li>
<li><strong>Mentions that are not about you.</strong> Check that the page refers to your brand, not another business with a similar name.</li>
</ul>

<h2>A Reclamation Workflow You Can Run in an Afternoon</h2>
<ol>
<li><strong>Hour one: collect.</strong> Run three exact-name searches (brand, main product, domain) and copy every result URL into a sheet.</li>
<li><strong>Hour two: check.</strong> Open each page, mark whether the name appears in visible text and whether a link to your domain exists, and note the attribute if there is one.</li>
<li><strong>Hour three: sort.</strong> Remove your own pages and any site you would not want a link from. Group the rest by site so one message covers several pages.</li>
<li><strong>Hour four: ask.</strong> Find a named contact for each remaining site and send a short email that gives the exact URL you would like linked.</li>
<li><strong>A week later: follow up once,</strong> then log the outcome and move on.</li>
</ol>
<p>In our scan, that process leaves a very short list: two sites. That is the point. Reclamation is quick because the list is small and the relationship already exists, and the same afternoon can be repeated every quarter as new mentions appear.</p>

<h2>Reclaiming Links for Tools and Free Assets</h2>
<p>If you publish free tools, directories and launch lists often name them without linking. Ask for the link to point at the specific tool page, not the home page. A link to a tool page carries more context for readers and gives that page a stronger signal than a link to the home page does. Of the ${S.third} third-party pages we found, several describe individual tools. In Search Console, at least 5 of our 24 external links point at tool pages, which shows how much inner pages can gain from precise links. When you reply to a directory, include the tool's exact URL and a one-sentence description of what it does.</p>

<h2>How to Prioritise Targets</h2>
<p>Not every mention is worth an email. Score each site on four questions. Is the page relevant to your topic? Do real people read the site? Is there a named person to write to? Would the link sit in running text or a list that readers use? Our <a href="/tools/link-prospect-scorer">link prospect scorer</a> turns those questions into a score. Pages that score high should be asked first, and pages that score low can be left alone without guilt. A short, well-chosen list of requests usually does better than a long one, because each email can be specific and personal.</p>

<h2>What a Reclaimed Link Is Worth</h2>
<p>Google says it uses links as a signal when determining the relevancy of pages and to find new pages to crawl. Its documentation describes links, not unlinked mentions, as that signal, so treat a mention as an opportunity to earn a link and not as a ranking factor in itself. A reclaimed link also helps visitors who read the mention and want to find you. Value depends on the page, so rank targets by relevance and audience, as in our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a>, and do the easy wins first.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-link-reclamation.png" alt="Infographic of Contomatix's brand scan, where 8 of 14 third-party pages mention the brand without a link, and three kinds of link reclamation" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How to Measure Reclamation</h2>
<p>Log each request with the date, the contact and the outcome. After a few weeks, check whether each link went live, what attribute it carries and whether the page is indexed. Use the <a href="/tools/dofollow-link-checker">dofollow link checker</a> to read the attribute, and see <a href="/blog/how-to-index-backlinks">how to index backlinks</a> for pages that do not appear. In Search Console, compare the number of linking pages and the impressions of the target page before and after. Plan the work inside a <a href="/blog/link-building-campaign">link building campaign</a>, so reclamation sits next to your other tactics.</p>

<h2>Common Link Reclamation Mistakes</h2>
<ul>
<li><strong>Skipping the check.</strong> Confirm a mention is really unlinked before you write.</li>
<li><strong>Emailing everyone.</strong> Prioritise relevant pages with a named contact.</li>
<li><strong>Offering something back.</strong> That turns a favour into a trade.</li>
<li><strong>Forgetting redirects.</strong> A 301 to the right page recovers a broken link without anyone's help.</li>
<li><strong>Not following up once.</strong> One polite reminder after about a week is enough.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>We searched Google (US) for the brand name excluding our own site on 21 October 2026 and checked all ${S.found} result pages we could collect from the first two result pages.</li>
<li>A page counts as mentioning us when the brand name appears in its visible text. A page counts as linking to us when its HTML contains a link to contomatix.com.</li>
<li>${S.blocked} pages refused automated access and are not counted. The scan finds pages Google returned for the query, so it will miss mentions Google does not show.</li>
<li>We read ${D.ok} ranking pages for the term on the same day. Counts show a term appears, not how well it is explained.</li>
<li>Google's statements come from its Search Central link best practices and spam policies.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Link reclamation recovers links you are close to having: unlinked mentions, broken links to you and lost links.</li>
<li>Our brand scan found ${S.third} third-party mentions: ${S.linked} linked and ${S.unlinked} not, on only ${S.unlinkedSites} sites.</li>
<li>Find mentions with an exact-name Google search, and broken links in Search Console.</li>
<li>Ask politely, offer nothing in return and keep the email short.</li>
<li>Verify each link's attribute and whether the page is indexed.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is link reclamation?</summary>
<p>It is turning existing mentions and links into links you hold: unlinked brand mentions, broken links to your site and links that were lost.</p>
</details>
<details>
<summary>What are unlinked mentions?</summary>
<p>They are pages that name your brand, product or tool in text without linking to your site. They are reclamation opportunities because the author already knows you.</p>
</details>
<details>
<summary>How do I find unlinked brand mentions?</summary>
<p>Search Google for the exact brand name in quotation marks, excluding your own site, then open each result and check for a link. Free alerts can catch new mentions.</p>
</details>
<details>
<summary>Do brand mentions help SEO without a link?</summary>
<p>Google's documentation describes links as the signal it uses for relevance and discovery. It does not say unlinked mentions pass ranking credit, so treat a mention as a chance to earn a link.</p>
</details>
<details>
<summary>How do I recover broken backlinks?</summary>
<p>Find 404 pages that other sites link to, then redirect each to the closest live page. This restores the link's value without outreach.</p>
</details>
<details>
<summary>How do I ask for a link on a mention?</summary>
<p>Thank the author, give the exact URL and make it easy to say no. Do not offer payment or a link in return, because that can fall under Google's link spam policy.</p>
</details>
<details>
<summary>How many unlinked mentions should I expect?</summary>
<p>It varies. Our young site had ${S.unlinked} unlinked third-party pages among ${S.third} that mention it, on ${S.unlinkedSites} sites.</p>
</details>
<details>
<summary>Is link reclamation worth the time?</summary>
<p>It is usually quicker than winning a new link because the site already knows you, but the value depends on the page's relevance and audience.</p>
</details>
<details>
<summary>How do I know a reclaimed link worked?</summary>
<p>Open the page and confirm the link, check its attribute and indexing, then compare linking pages and target-page impressions in Search Console.</p>
</details>
</div>
`;
const title = 'Link Reclamation: 8 of Our 14 Brand Mentions Had No Link';
const excerpt = `Link reclamation tested on our own brand: ${S.unlinked} of ${S.third} third-party mentions had no link. How to find unlinked mentions and broken links and ask for the link.`;
const out = content.replace('@@TYPESH@@', hh('link-reclamation-types.png')).replace('@@SERPH@@', hh('link-reclamation-serp.png')).replace('@@OURSH@@', hh('link-reclamation-ours.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-21', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
