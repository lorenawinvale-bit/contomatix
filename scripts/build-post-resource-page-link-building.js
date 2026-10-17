// Builds the "resource page link building" post + assets. node scripts/build-post-resource-page-link-building.js [--write]
// Data: 5 readable of 8 organic pages for "resource page link building" (Google US, 17 Oct 2026) + a scan of 13 curated resource pages found with Google operator searches, 17 Oct 2026. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'resource-page-link-building';
const R = require('../../keyword-research/serp-resource-page-link-building-2026-10-17.json');
const S = require('../../keyword-research/resource-pages-scan-2026-10-17.json').filter(r => r.status === 200);
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const dead = r => r.brokenList.filter(b => / (404|410)$/.test(b)).length;
const D = { shown: R.length, ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], goal: c(o => o.goal), kpi: c(o => o.kpi), template: c(o => o.template), followUp: c(o => o.followUp), searchOps: c(o => o.searchOps), broken: c(o => o.broken), relevance: c(o => o.relevance), policy: c(o => o.googlePolicy), nofollow: c(o => o.nofollow), timeline: c(o => o.timeline),
  pages: S.length, ext: S.reduce((a, r) => a + r.external, 0), checked: S.reduce((a, r) => a + r.checked, 0), dead: S.reduce((a, r) => a + dead(r), 0), deadPages: S.filter(r => dead(r) > 0).length, nfPages: S.filter(r => r.nofollow > 0).length, suggest: S.filter(r => r.suggest).length };
const exp = { shown: 8, ok: 5, median: 2874, goal: 4, kpi: 0, template: 4, followUp: 1, searchOps: 4, broken: 5, relevance: 5, policy: 0, nofollow: 0, timeline: 1, pages: 13, ext: 496, checked: 205, dead: 9, deadPages: 6, nfPages: 5, suggest: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US'); const deadPct = (D.dead / D.checked * 100).toFixed(1);

// ---------- assets
L.donut(SLUG, ['RESOURCE PAGE', 'LINK BUILDING'], [['Find the', 'Right Pages'], 'Vet for Relevance', ['Match Your', 'Best Asset'], 'Write a Short Email', ['Track and', 'Follow Up Once']]);
L.cover(SLUG, { badge: 'REAL PAGE SCAN', search: 'resource page link building', card: `Resource pages scanned: ${D.pages}`,
  lines: [`Outbound links found: ${D.ext}`, `Links checked: ${D.checked}`, `Dead links (404): ${D.dead}`, `Pages with a dead link: ${D.deadPages} of ${D.pages}`, `Invite suggestions: ${D.suggest} of ${D.pages}`],
  last: 'Pair it with broken links', big: `${D.deadPages} of ${D.pages}`, k1: 'resource pages had', k2: 'at least one dead link', title: 'Resource Page Link Building', sub: `What ${D.pages} real resource pages show` });
fs.writeFileSync(path.join(__dirname, 'infographic-resource-page-link-building.html'), L.infographicHtml({
  title: `Resource Pages: ${D.pages} Scanned`, sub: `Curated resource pages found with Google operator searches, 17 October 2026`,
  leftTitle: 'What we found on the pages', leftTag: `Number of the ${D.pages} resource pages`, max: D.pages,
  bars: [{ label: 'Had outbound links', sub: 'all pages listed links', n: D.pages }, { label: 'Had a dead link', sub: 'a 404 in our sample', n: D.deadPages }, { label: 'Nofollowed some links', sub: 'rel nofollow on a link', n: D.nfPages }, { label: 'Invited suggestions', sub: 'asked for new resources', n: D.suggest }],
  rightTitle: 'Pitch a resource page', rightTag: 'Five steps, one follow-up', items: [
    { t: '1. Find real resource lists', s: 'operators plus topic pages' }, { t: '2. Check relevance', s: 'topic, readers, recent posts' },
    { t: '3. Match your best asset', s: 'better than what is listed' }, { t: '4. Offer a dead-link fix', s: 'if you find a 404' }],
  big: `${D.deadPages} of ${D.pages}`, noteHtml: `resource pages had at least one <em>dead link</em>. A working replacement is the most useful thing you can send.` }));
fs.writeFileSync(path.join(__dirname, 'table-resource-page-link-building-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for resource page link building say`, sub: `Organic results read on 17 October 2026 (${D.shown} listed, ${D.ok} returned a readable page; the others blocked our request). Sites are not named.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Broken link tactic', `${D.broken} of ${D.ok}`], ['Relevance or topic fit', `${D.relevance} of ${D.ok}`], ['Search operators such as inurl or intitle', `${D.searchOps} of ${D.ok}`], ['Outreach template or subject line', `${D.template} of ${D.ok}`], ['Goals', `${D.goal} of ${D.ok}`], ['A timeline', `${D.timeline} of ${D.ok}`], ['Follow-up emails', `${D.followUp} of ${D.ok}`], ['KPIs or metrics to track', `${D.kpi} of ${D.ok}`], ['Google spam policy, nofollow or sponsored', `${D.policy} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-resource-page-link-building-scan.html'), L.tableHtml({ title: `What we found on ${D.pages} real resource pages`, sub: `Pages found with Google operator searches and fetched on 17 October 2026. Up to 40 outbound links per page were checked. A dead link is a 404 or 410. Sites are not named.`,
  head: ['Measure', 'Result'], lastBold: false,
  rows: [['Resource pages fetched', String(D.pages)], ['Outbound links found', f(D.ext)], ['Outbound links checked', String(D.checked)], ['Dead links (404 or 410)', `${D.dead} (${deadPct}%)`], ['Pages with at least one dead link', `${D.deadPages} of ${D.pages}`], ['Pages that nofollow some links', `${D.nfPages} of ${D.pages}`], ['Pages that invite suggestions', `${D.suggest} of ${D.pages}`]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Resource page link building</strong> is the tactic of finding web pages that curate useful links on a topic and asking the owner to add your page if it genuinely belongs. To see how it works in practice, we read the ${D.ok} readable pages that rank on Google US for the term and fetched ${D.pages} real curated resource pages found with search operators. Of those pages, ${D.deadPages} had at least one dead link in our sample, which makes a working replacement the most useful thing you can offer.</p>

<p>Below you will find what a resource page is, how to find them, what the ranking guides say and skip, what ${D.pages} real pages showed, how to vet a page, what to pitch, how to write the outreach email, and the mistakes that waste effort. It fits inside a wider <a href="/blog/link-building-campaign">link building campaign</a>.</p>

<h2>What a Resource Page Is and Why It Links Out</h2>
<p>A resource page is a page whose job is to point readers to other useful pages: a list of tools, guides, templates, courses or references on one subject. Because its whole purpose is to link out, a relevant new addition is a normal request. It differs from a guest post (you write something new) and from a link insertion (you ask for a mention inside an article). The ask is small, which is why the tactic is popular, and also why owners get many requests and ignore weak ones. Resource page link building works only if the page you suggest is better than, or different from, what is already listed.</p>

<h2>What the Ranking Pages Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/resource-page-link-building-serp.png" alt="Table of what 5 pages ranking for resource page link building mention: broken link tactic 5, relevance 5, search operators 4, outreach templates 4, goals 4, timeline 1, follow-up emails 1, KPIs 0, Google policy or nofollow 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The broken link tactic is paired with it everywhere.</strong> ${D.broken} of ${D.ok} pages mention broken links, and our scan shows why.</li>
<li><strong>Finding pages means search operators.</strong> ${D.searchOps} of ${D.ok} explain operators such as <code>inurl:</code> and <code>intitle:</code>, and ${D.relevance} of ${D.ok} stress relevance.</li>
<li><strong>Templates are common, process is not.</strong> ${D.template} of ${D.ok} give an outreach template, but only ${D.followUp} mention follow-up and ${D.timeline} give a timeline.</li>
<li><strong>Measurement and rules are missing.</strong> No page names a KPI, and none mention Google's spam policy or marking links as nofollow or sponsored.</li>
</ul>
<p>Three more organic results blocked our request, so these counts cover the ${D.ok} we could read. Search results change, so treat them as a snapshot.</p>

<h2>What ${D.pages} Real Resource Pages Show</h2>
<p>To go beyond the guides, we ran Google operator searches for curated "SEO resources" and "useful links" pages, fetched ${D.pages} of them and checked up to 40 outbound links on each. Our first operator search returned mostly tool roundups and blog lists, so true resource pages are less common than the guides imply. Treat any list of this kind as something to read before you pitch.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/resource-page-link-building-scan.png" alt="Table of what 13 resource pages showed: 496 outbound links found, 205 checked, 9 dead (4.4 percent), 6 of 13 pages with a dead link, 5 of 13 nofollowing some links, 1 of 13 inviting suggestions" width="1280" height="@@SCANH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Dead links are common.</strong> ${D.dead} of ${D.checked} checked links (${deadPct}%) returned a 404, and ${D.deadPages} of ${D.pages} pages had at least one.</li>
<li><strong>Few pages ask for suggestions.</strong> Only ${D.suggest} of ${D.pages} invited readers to submit a resource, so most owners must be approached by email.</li>
<li><strong>Some pages qualify links.</strong> ${D.nfPages} of ${D.pages} applied nofollow to at least some links, so check the attribute before you count on a link passing credit. The free <a href="/tools/dofollow-link-checker">dofollow link checker</a> shows it per link.</li>
<li><strong>Size varies a lot.</strong> Some pages list a handful of links and one listed over 100, so the owner's effort per page differs, and so does the odds of being added.</li>
</ul>

<h2>How to Find Resource Pages</h2>
<p>Start from your topic and look for pages built to list other pages. Useful search patterns include a topic word plus <code>"resources"</code>, <code>"useful links"</code>, <code>"recommended reading"</code> or <code>"further reading"</code>, combined with <code>intitle:</code> or <code>inurl:</code>. Another way is to look at who links to your competitors' guides: a page that links to three similar guides will often link to a fourth. Use the Links report in Search Console to see which sites already link to you, and our guide to <a href="/blog/check-backlinks-of-website">checking backlinks of a website</a> for the free method. Search for the same terms with your niche added, because a topical list from a university department, association or specialist site is worth more than a generic roundup.</p>

<h2>How to Vet a Resource Page Before You Pitch</h2>
<ol>
<li><strong>Is it relevant?</strong> Your page must fit the topic of the list, not just the industry. Our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a> gives a scoring method.</li>
<li><strong>Is it maintained?</strong> Look for a recent update date, working links and active site news. A page with many dead links may be abandoned, or a good place for a broken-link fix.</li>
<li><strong>Does the site have readers?</strong> Check that it publishes real content and attracts an audience in your area.</li>
<li><strong>Is it a link farm?</strong> If the page lists hundreds of unrelated links, skip it.</li>
<li><strong>Is there a contact?</strong> Find the editor or owner by name. A named contact beats a generic address.</li>
<li><strong>Does your asset belong?</strong> If it is no better than what is listed, improve it first.</li>
</ol>

<h2>What to Pitch: The Asset That Earns the Link</h2>
<p>The best asset for a resource page is useful on its own: a free tool, a template, a data study or a guide that answers a question clearly. A plain service page is rarely added. Match the asset to the list. A page of checklists suits a template; a list of tools suits a free tool. If your asset is new, say what it does in one sentence in the email. Our <a href="/blog/internal-link-building">internal link building</a> work shows how to connect the asset to the pages you want to lift once a link arrives.</p>

<h2>The Broken Link Version of the Pitch</h2>
<p>When you find a dead link on a relevant resource page, the pitch changes from a request to a favour. You tell the owner something they did not know, you name the broken URL and you offer a working replacement. This works because it saves the owner time. Check that your page truly covers what the dead page did, or the replacement will look forced. Our guide to <a href="/blog/find-broken-backlinks">finding broken backlinks</a> shows how to confirm the error status.</p>

<h2>Outreach Link Building Email: A Short Example</h2>
<p>Keep the email short, specific and easy to decline. Here is a simple structure with example details:</p>
<blockquote>
<p>Hi Priya,<br><br>I was reading your SEO resources page. The section on log file analysis was the clearest I have read.<br><br>I wrote a guide to sitemap priority (contomatix.com/blog/sitemap-priority). It shows how 20 real sitemaps use the tag. It might fit your list of technical SEO references.<br><br>If it is useful, feel free to add it. If it is not a fit, no problem at all.<br><br>Thanks,<br>Sam</p>
</blockquote>
<p>You can write this kind of email for any tactic with the free <a href="/tools/outreach-email-generator">link building outreach email generator</a>, which also writes three subject lines and one follow-up, and flags filler phrases. Send one follow-up after about a week and then stop.</p>

<h2>A Workable Routine for Your First 20 Prospects</h2>
<p>Do not start with hundreds of pages. Pick 20, and run them in a single week of focused work. On day one, build the list with search operators and note each page's topic, last update and contact. On day two, vet each page against the checklist above and drop any that fail. On day three, open every outbound link on the pages that remain, using the free <a href="/tools/internal-link-checker">internal link checker</a> to sort links and a quick status check to find 404s, and note which pages have dead links you can offer to replace. On day four, write the emails, personalising the first line. On day five, send them. Follow up once the next week, log the outcomes and compare the reply rate with your expectations. Twenty good prospects will teach you more than two hundred weak ones, and the replies show you what to change in the asset or the email.</p>

<h2>How Resource Pages Compare With Other Tactics</h2>
<p>Resource page outreach is one of the lower-effort tactics, because the ask is small and the owner already links out. The trade-off is that the best pages receive many requests, and a link in a long list may carry less weight than a link inside an article that discusses your topic. It works best alongside other tactics: use a resource page for a reference asset, a link insertion for a detailed guide and a guest article when you can add expertise. Pick the tactic by the asset and the page, not by habit, and review results after each wave.</p>

<h2>Staying Within Google's Link Rules</h2>
<p>None of the ranking pages we read discuss Google's spam policy, but it applies. Google defines link spam as creating links primarily to manipulate rankings, and lists exchanging money, goods or services for links, excessive link exchanges, and using automated programs to create links as examples. It also says that buying and selling links is acceptable when they are qualified with <code>nofollow</code> or <code>sponsored</code>. For resource page outreach, that means: do not offer payment or a link swap, do not use tools that mass-create links and be transparent if anything of value changes hands. Our look at <a href="/blog/automated-link-building-2026">automated link building</a> explains why automation is risky.</p>

<h2>Tracking Results</h2>
<p>Log every page in a sheet: URL, contact, date emailed, reply, follow-up, outcome and live link. For each link that goes live, check the URL, the anchor, the link attribute and that the page is indexed. Compare referring pages and the impressions of the target page in Search Console before and after. If you run resource outreach as part of a larger effort, report the results with the other tactics using the <a href="/tools/seo-report-generator">SEO report generator</a>.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-resource-page-link-building.png" alt="Infographic of what 13 real resource pages showed and five steps to pitch a resource page" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Resource Page Link Building Mistakes</h2>
<ul>
<li><strong>Pitching an unrelated page.</strong> Relevance is the first thing an owner checks.</li>
<li><strong>Sending a generic email.</strong> Name something specific from their page.</li>
<li><strong>Asking for a link, not offering value.</strong> Explain what your page adds to the list.</li>
<li><strong>Offering a swap or payment.</strong> That moves you into Google's link spam territory.</li>
<li><strong>Following up repeatedly.</strong> One follow-up is enough.</li>
<li><strong>Ignoring results.</strong> Check whether the link went live and how it is marked.</li>
</ul>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the ${D.shown} organic results for one query on one day (Google US, 17 October 2026); ${D.ok} returned a readable page and three blocked our request.</li>
<li>The ${D.pages} resource pages came from three Google operator searches on the same day. They are a convenience sample of curated lists, not a random sample of the web.</li>
<li>We checked up to 40 outbound links per page, excluding social profiles. A dead link means a 404 or 410 response; links that timed out or blocked our request are not counted as dead.</li>
<li>Counts show whether a page mentions a term, not how well it explains it.</li>
<li>Results in other countries, topics or dates will differ, so run the check in your own niche.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Resource page link building asks a curator to add a genuinely relevant page. Keep the ask small and the asset strong.</li>
<li>${D.deadPages} of ${D.pages} resource pages we scanned had a dead link, so pair the tactic with broken link replacement.</li>
<li>Vet every page for relevance, upkeep and real readers before you email.</li>
<li>Send a short email, one follow-up and never offer a swap or payment.</li>
<li>Track each reply and verify each live link and its attribute.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is resource page link building?</summary>
<p>It is asking the owner of a curated resource page to add your page to their list of useful links because it genuinely fits the topic.</p>
</details>
<details>
<summary>How do I find resource pages for link building?</summary>
<p>Search your topic with words such as resources, useful links or recommended reading, combine them with intitle or inurl, and look at which pages link to similar guides.</p>
</details>
<details>
<summary>Does resource page link building still work?</summary>
<p>It can, when the page you suggest is relevant and useful. Many owners ignore weak requests, so the asset and the email matter more than the volume you send.</p>
</details>
<details>
<summary>What should I put in an outreach email to a resource page?</summary>
<p>A specific detail from their page, a one-sentence description of your page, why it fits and an easy way to say no. Keep it short.</p>
</details>
<details>
<summary>How do broken links help resource page outreach?</summary>
<p>A dead link on a resource page is a favour to report. In our scan, ${D.deadPages} of ${D.pages} pages had one, so a working replacement gives the owner a reason to reply.</p>
</details>
<details>
<summary>Is link building outreach by email allowed by Google?</summary>
<p>Asking for a link editorially is fine. Exchanging money, goods or services for links, or creating links with automated programs, is link spam under Google's policy unless qualified with nofollow or sponsored.</p>
</details>
<details>
<summary>Can I automate resource page outreach?</summary>
<p>You can use tools to organise a list and draft emails, but each message should be personal. Automated programs that create links are listed by Google as link spam.</p>
</details>
<details>
<summary>How many follow-ups should I send?</summary>
<p>One, after about a week, that adds a reason and lets the owner say no.</p>
</details>
<details>
<summary>How do I know if the link passes ranking credit?</summary>
<p>Check the link's rel attribute. Nofollow, sponsored and ugc values qualify a link. The free dofollow link checker shows the attribute for every link on a page.</p>
</details>
</div>
`;
const title = 'Resource Page Link Building: What 13 Real Pages Show';
const excerpt = `Resource page link building guide: we scanned ${D.pages} real resource pages and ${D.deadPages} had a dead link. How to find, vet and pitch pages, with a short email.`;
const sz = f => { if (!fs.existsSync(f)) return [1280, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof');
const out = content.replace('@@SERPH@@', sz(path.join(pr, 'resource-page-link-building-serp.png'))[1]).replace('@@SCANH@@', sz(path.join(pr, 'resource-page-link-building-scan.png'))[1]);
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-17', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
