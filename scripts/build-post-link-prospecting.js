// Builds the "link prospecting" post + assets. node scripts/build-post-link-prospecting.js [--write]
// Data: 9 organic results for "link prospecting" (Google US, 22 Oct 2026; 6 readable), a scan of 13 curated resource pages found with Google operator searches (17 Oct 2026) and our own prospect scoring method. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'link-prospecting';
const R = require('../../keyword-research/serp-link-prospecting-2026-10-22.json');
const S = require('../../keyword-research/resource-pages-scan-2026-10-17.json').filter(r => r.status === 200);
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], scorecard: c(o => o.scorecard), tools: c(o => o.tools), email: c(o => o.email), relevance: c(o => o.relevance), operators: c(o => o.operators), policy: c(o => o.googlePolicy), risk: c(o => o.risk), example: c(o => o.example), steps: c(o => o.steps), price: c(o => o.price), survey: c(o => o.survey), googleDoc: c(o => o.googleDoc), ai: c(o => o.ai) };
const exp = { ok: 6, median: 2947, scorecard: 6, tools: 6, email: 6, relevance: 6, operators: 4, policy: 4, risk: 5, example: 5, steps: 5, price: 5, survey: 3, googleDoc: 0, ai: 5 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const dead = r => r.brokenList.filter(b => / (404|410)$/.test(b)).length;
const P = { pages: S.length, few: S.filter(r => r.external < 15).length, mid: S.filter(r => r.external >= 15 && r.external <= 50).length, many: S.filter(r => r.external > 50).length, deadPages: S.filter(r => dead(r) > 0).length, noDead: S.filter(r => dead(r) === 0).length, nf: S.filter(r => r.nofollow > 0).length, suggest: S.filter(r => r.suggest).length, deadLinks: S.reduce((a, r) => a + dead(r), 0), checked: S.reduce((a, r) => a + r.checked, 0) };
const expP = { pages: 13, few: 6, mid: 5, many: 2, deadPages: 6, noDead: 7, nf: 5, suggest: 1, deadLinks: 9, checked: 205 };
for (const k of Object.keys(expP)) if (P[k] !== expP[k]) throw new Error('scan changed ' + k + ' ' + P[k]);
console.log(JSON.stringify(D), JSON.stringify(P));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['LINK', 'PROSPECTING'], [['Find Relevant', 'Pages'], 'Score Each One', ['Drop the', 'Red Lines'], 'Build a Short List', ['Reach Out', 'With Context']]);
L.cover(SLUG, { badge: 'REAL PAGE SCAN', search: 'link prospecting', card: `Prospect pages scanned: ${P.pages}`,
  lines: [`Under 15 external links: ${P.few}`, `Over 50 external links: ${P.many}`, `Had a dead link: ${P.deadPages} of ${P.pages}`, `Invited suggestions: ${P.suggest} of ${P.pages}`, `Guides citing Google: ${D.googleDoc} of ${D.ok}`],
  last: 'Vet before you pitch', big: `${P.deadPages} of ${P.pages}`, k1: 'real prospect pages had', k2: 'at least one dead link', title: 'Link Prospecting', sub: `A real scan, plus what ${D.ok} guides say` });
fs.writeFileSync(path.join(__dirname, 'infographic-link-prospecting.html'), L.infographicHtml({
  title: `${P.pages} Real Prospect Pages Checked`, sub: 'Curated resource pages found with Google operator searches, 17 October 2026',
  leftTitle: 'What the scan found', leftTag: `Number of the ${P.pages} pages`, max: P.pages,
  bars: [{ label: 'Fewer than 15 links', sub: 'a focused list', n: P.few }, { label: '15 to 50 links', sub: 'a typical list', n: P.mid }, { label: 'More than 50 links', sub: 'a crowded list', n: P.many }, { label: 'At least one dead link', sub: 'a 404 or 410', n: P.deadPages }, { label: 'Invites suggestions', sub: 'asks for new links', n: P.suggest }],
  rightTitle: 'Score every prospect on', rightTag: 'Seven factors, 100 points', items: [
    { t: 'Relevance (30)', s: 'does it cover your topic?' }, { t: 'Audience (20)', s: 'do real readers visit?' },
    { t: 'Placement (15)', s: 'text, list or footer?' }, { t: 'Freshness, links, index (10 each)', s: 'and a named contact (5)' }],
  big: `${P.deadPages} of ${P.pages}`, noteHtml: `prospect pages had a <em>dead link</em>. Checking a page before you pitch finds these openings.` }));
fs.writeFileSync(path.join(__dirname, 'table-link-prospecting-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for link prospecting say`, sub: `Organic results read on 22 October 2026 (9 listed; ${D.ok} gave a readable guide, the others blocked or did not load). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Guides'], lastBold: false,
  rows: [['Scoring criteria or metrics (DR, DA, checklist)', `${D.scorecard} of ${D.ok}`], ['Named tools', `${D.tools} of ${D.ok}`], ['Outreach email or template', `${D.email} of ${D.ok}`], ['Relevance', `${D.relevance} of ${D.ok}`], ['Examples', `${D.example} of ${D.ok}`], ['Step-by-step instructions', `${D.steps} of ${D.ok}`], ['A price or paid plan', `${D.price} of ${D.ok}`], ['Search operators such as inurl or intitle', `${D.operators} of ${D.ok}`], ['Risk or caution', `${D.risk} of ${D.ok}`], ['Google spam policy or guidelines', `${D.policy} of ${D.ok}`], ['Original data or a survey', `${D.survey} of ${D.ok}`], ['Citing Google documentation', `${D.googleDoc} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-link-prospecting-scan.html'), L.tableHtml({ title: `What ${P.pages} real prospect pages looked like`, sub: `Curated resource pages found with Google operator searches and fetched on 17 October 2026. Up to 40 outbound links per page were checked; a dead link is a 404 or 410. Sites are not named.`,
  head: ['Measure', 'Pages'], lastBold: false,
  rows: [['Pages scanned', String(P.pages)], ['Fewer than 15 external links', String(P.few)], ['15 to 50 external links', String(P.mid)], ['More than 50 external links', String(P.many)], ['At least one dead link', `${P.deadPages} of ${P.pages}`], ['No dead link in the sample', `${P.noDead} of ${P.pages}`], ['Nofollow on some links', `${P.nf} of ${P.pages}`], ['Invite readers to suggest a resource', `${P.suggest} of ${P.pages}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-link-prospecting-score.html'), L.tableHtml({ title: 'A 100-point prospect scorecard', sub: 'Our working method, built into the free link prospect scorer. It is not a Google metric.',
  head: ['Factor', 'Points', 'Question to ask'], lastBold: true,
  rows: [['Relevance', '30', 'Does the page cover your topic?'], ['Audience', '20', 'Do real people read the site?'], ['Placement', '15', 'Text, resource list or footer?'], ['Freshness', '10', 'Updated in the last 6 months?'], ['Few other links', '10', 'Fewer than 15 external links?'], ['Indexed', '10', 'Found with a site: search?'], ['Named contact', '5', 'A person to write to?'], ['Total', '100', 'Pursue 70+, hold 45 to 69, skip below']] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [1280, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog'); const hh = n => sz(path.join(pr, 'proof', n))[1];
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Link prospecting</strong> is the step before outreach: finding sites that could link to you and checking whether each one is worth a message. We read the ${D.ok} guides that rank on Google US for the term and then checked ${P.pages} real prospect pages ourselves. ${P.deadPages} of the ${P.pages} had at least one dead link, ${P.many} carried more than 50 external links and only ${P.suggest} invited readers to suggest a resource. None of the ${D.ok} guides cite Google's documentation.</p>

<p>Below you will find what prospecting is, where prospects come from, what the ranking guides say and skip, what our scan of ${P.pages} pages found, a 100-point scorecard for vetting each prospect, how to build a short list and how to move from list to outreach. It fits into the plan in our <a href="/blog/link-building-campaign">link building campaign guide</a>.</p>

<h2>What Link Prospecting Is</h2>
<p>Prospecting turns "get links" into a list of specific pages. A prospect is a page or a site where a link to your content would make sense, with a reason a person would add it. The aim is a short list of relevant, live pages, not a long list of anything that accepts links. Good prospecting saves time later, because outreach to the wrong pages is the biggest waste in link building.</p>

<h2>Where Prospects Come From</h2>
<ul>
<li><strong>Resource and link pages</strong> in your topic. See <a href="/blog/resource-page-link-building">resource page link building</a>.</li>
<li><strong>Pages that cite similar content.</strong> If a page links to three guides like yours, it may link to a fourth.</li>
<li><strong>Unlinked mentions</strong> of your brand. See <a href="/blog/link-reclamation">link reclamation</a>, where our own scan found 8 of 14 mentions without a link.</li>
<li><strong>Pages with broken links</strong> that your content could replace. See <a href="/blog/find-broken-backlinks">finding broken backlinks</a>.</li>
<li><strong>Roundups and listings</strong> that name tools or providers in your category.</li>
<li><strong>Communities and associations</strong> in your industry that publish member or partner lists.</li>
</ul>

<h2>What the Ranking Guides Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-prospecting-serp.png" alt="Table of what 6 pages ranking for link prospecting mention: scoring criteria 6, tools 6, outreach emails 6, relevance 6, examples 5, steps 5, a price 5, risk 5, search operators 4, Google spam policy 4, original data 3 and Google documentation 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The method is shared.</strong> All ${D.ok} guides cover scoring criteria, tools, outreach emails and relevance.</li>
<li><strong>Operators are common.</strong> ${D.operators} of ${D.ok} explain search operators such as <code>inurl:</code> and <code>intitle:</code>.</li>
<li><strong>Many have a product.</strong> ${D.price} of ${D.ok} mention a price or paid plan, so several are selling prospecting software.</li>
<li><strong>Rules are missing.</strong> ${D.policy} of ${D.ok} mention Google's policy, and none cite its documentation.</li>
<li><strong>Few show their own data.</strong> Only ${D.survey} of ${D.ok} mention a survey or original data, and none show a real list of prospects checked, which is what we did.</li>
</ul>

<h2>What We Found on ${P.pages} Real Prospect Pages</h2>
<p>We ran Google operator searches for curated SEO resource and link pages and fetched ${P.pages} of the results. Our first search returned mostly tool roundups and blog lists, so true resource pages are rarer than the guides suggest, and every page needed a human check. For each page we counted external links and checked up to 40 of them for errors.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-prospecting-scan.png" alt="Table of what 13 real prospect pages looked like: 6 with fewer than 15 external links, 5 with 15 to 50, 2 with more than 50, 6 with at least one dead link, 7 with none in the sample, 5 with nofollow on some links and 1 inviting suggestions" width="1280" height="@@SCANH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Size varies.</strong> ${P.few} pages list fewer than 15 external links, ${P.mid} list 15 to 50 and ${P.many} list more than 50. A crowded list gives each new link less attention.</li>
<li><strong>Neglect is common.</strong> ${P.deadPages} of ${P.pages} pages had a dead link, ${P.deadLinks} of the ${P.checked} links we checked. A page with dead links may be abandoned, or it may welcome a working replacement.</li>
<li><strong>Some pages qualify links.</strong> ${P.nf} of ${P.pages} applied nofollow to at least some links, so check the attribute before you count on credit.</li>
<li><strong>Few invite suggestions.</strong> Only ${P.suggest} of ${P.pages} asked readers for resources, so most owners need an email.</li>
</ul>
<p>The lesson is that prospecting is a vetting job. The search finds candidates, and a person decides which are alive, relevant and worth the effort.</p>

<h2>How to Score a Prospect</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-prospecting-score.png" alt="Table of a 100-point prospect scorecard: relevance 30, audience 20, placement 15, freshness 10, few other links 10, indexed 10, named contact 5, with the question to ask for each and verdicts to pursue at 70 or above" width="1280" height="@@SCOREH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>A scorecard keeps you honest when a list is long. The one above is the method built into our free <a href="/tools/link-prospect-scorer">link prospect scorer</a>. Relevance carries the most weight, because an editor's first question is whether your page belongs. Audience comes next, since a link on a page nobody reads sends no one. Placement matters because a link in the body text or a curated list is stronger than one in a footer. Freshness, the number of other links, indexing and a named contact complete the picture. It is our own working method, not a Google metric, so adjust the weights to your own results.</p>
<p><strong>Red lines</strong> override the score. Skip a site that advertises paid links, paid guest posts or link swaps, an unrelated page and any footer or sitewide placement. Google lists buying or selling links for ranking purposes and excessive link exchanges as link spam, so a link from such a site carries risk whatever the score says.</p>

<h2>What to Check for Each Kind of Prospect</h2>
<ul>
<li><strong>Resource page:</strong> is the list on your exact topic, is it maintained and does it carry fewer than about 50 links? Look for dead links you could replace.</li>
<li><strong>Broken-link page:</strong> confirm the dead URL really returns an error, and make sure your page covers what the dead page did.</li>
<li><strong>Unlinked mention:</strong> check the page names you, find who runs it and decide which exact URL you would like linked.</li>
<li><strong>Article for a link insertion:</strong> find the passage where your page adds detail, and check the article is current and indexed.</li>
<li><strong>Roundup or listing:</strong> check it is a real editorial list with readers, not a page made to sell placements.</li>
<li><strong>Guest opportunity:</strong> check the site publishes original work from outside writers and that its audience matches yours.</li>
</ul>

<h2>A Worked Session From Our Own Brand</h2>
<p>To see how short a good list can be, consider our own reclamation scan. A Google search for our brand name returned 25 pages. After opening each, 14 third-party pages mention us, 6 already link and 8 do not. Those 8 sit on only 2 sites, so the prospect list is two sites. Scoring them, we would ask whether each page is relevant to our work, whether it has a named editor or owner and whether the placement is in running text or a list. A launch-listing page that names our tools is relevant and has readers, but may have no editor to ask. An agency profile page is a place where we can usually add the link ourselves. Two sites, two short messages, one afternoon: that is what prospecting looks like when you start from people who already know you.</p>

<h2>How Many Prospects You Really Need</h2>
<p>You need fewer than most guides imply. If a campaign aims at three target pages, twenty well-scored prospects per page is plenty, and many campaigns succeed with half that. What matters is how many of the list reply and agree, which you can only learn by sending. Start small, learn the rates and then widen the list. If replies are low, look first at the quality of the list and of the asset before you add volume. A bigger list of weak prospects only multiplies the number of messages that go unanswered.</p>

<h2>How to Build a Prospect Sheet</h2>
<ol>
<li><strong>Set the target.</strong> Choose the page you want to lift and the asset you will offer.</li>
<li><strong>Collect 40 to 60 candidates</strong> from the sources above, in one sheet.</li>
<li><strong>Add columns:</strong> site, page URL, type, topic fit, audience, placement, links on page, last updated, indexed, contact, score and notes.</li>
<li><strong>Check the basics</strong> with a quick pass: does the page load, is it indexed, does the link go somewhere useful?</li>
<li><strong>Score each prospect</strong> and keep the top 20. Group them by site so one message can cover several pages.</li>
<li><strong>Note the angle</strong> for each: a resource suggestion, a broken link replacement, an unlinked mention or a link insertion.</li>
</ol>

<h2>From List to Outreach</h2>
<p>Once the list is short and scored, write to each person with one specific detail from their page and one clear ask. Our free <a href="/tools/outreach-email-generator">outreach email generator</a> writes the email, subject lines and a single follow-up for five tactics. Send in waves of five to ten so you can learn from replies, and log each outcome. After a few weeks, check whether links went live, what attribute they carry and whether the pages are indexed, as described in <a href="/blog/how-to-index-backlinks">how to index backlinks</a>. Keep the notes from every reply, including the polite refusals, because they show which kinds of prospects are worth your time next month.</p>

<h2>Relevance in Practice: Three Examples</h2>
<ul>
<li><strong>Exact match.</strong> You have a guide to checking backlinks and the prospect is a page of backlink resources that lists three similar guides. Relevance is as high as it gets, so give it the full 30 points.</li>
<li><strong>Close but different.</strong> The prospect is a general marketing resources page that includes some SEO guides. The audience overlaps, but your page would be one of many, so score relevance lower and check how crowded the list is.</li>
<li><strong>Same industry, different topic.</strong> The prospect is a software review blog that never covers SEO. A link may be possible through a one-off article, but a resource-page pitch would feel out of place, so hold or skip.</li>
</ul>
<p>When in doubt, ask whether an editor would read your page and think it belongs where they plan to put it. If the honest answer is "maybe not", the prospect is a hold at best. Keep a note of why you held or skipped each one, so that when your asset improves or the page changes, you can revisit the list in a few months without starting from zero.</p>

<h2>Free Ways to Prospect</h2>
<ul>
<li><strong>Google operators.</strong> Combine your topic with words such as "resources", "useful links" or "recommended reading" and <code>intitle:</code> or <code>inurl:</code>.</li>
<li><strong>Your own Search Console.</strong> The Links report shows who already links to you, which hints at who else might.</li>
<li><strong>Exact-name searches.</strong> A search for your brand, minus your own site, finds unlinked mentions.</li>
<li><strong>Competitor pages.</strong> Look at which sites mention similar tools or guides.</li>
<li><strong>Our free tools.</strong> The <a href="/tools/dofollow-link-checker">dofollow link checker</a> reads link attributes and the <a href="/tools/link-prospect-scorer">link prospect scorer</a> ranks the list.</li>
</ul>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-link-prospecting.png" alt="Infographic of what a scan of 13 real prospect pages found and the seven factors of a 100-point prospect scorecard" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Common Link Prospecting Mistakes</h2>
<ul>
<li><strong>Collecting without vetting.</strong> A long list of unchecked pages wastes outreach time.</li>
<li><strong>Trusting a metric.</strong> An authority score is not relevance or readers.</li>
<li><strong>Ignoring the page itself.</strong> Open it: is it alive, updated and on your topic?</li>
<li><strong>Prospecting for links you cannot earn.</strong> If your asset is no better than what is listed, improve it first.</li>
<li><strong>Skipping the rules.</strong> Do not approach sites that sell links or swap them.</li>
<li><strong>Not logging outcomes.</strong> Without a log you cannot learn which prospects work.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>We read the 9 organic results for one query on one day (Google US, 22 October 2026). Six were guides we could read; the others blocked our request or did not load. Counts show a term appears, not how well it is explained.</li>
<li>The ${P.pages} prospect pages came from three Google operator searches on 17 October 2026. They are a convenience sample of curated lists, not a random sample of the web.</li>
<li>We checked up to 40 outbound links per page, excluding social profiles. A dead link means a 404 or 410 response.</li>
<li>The scorecard is our own working method and is not a Google metric.</li>
<li>Results in other topics or at other times will differ.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Prospecting is finding and vetting pages before outreach, so the list is short and relevant.</li>
<li>${P.deadPages} of ${P.pages} real prospect pages had a dead link, and only ${P.suggest} invited suggestions.</li>
<li>Score prospects on relevance, audience, placement, freshness, link count, indexing and contact.</li>
<li>Skip sites that sell links or swap them, whatever their score.</li>
<li>Log every outcome so each wave improves the next.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is link prospecting?</summary>
<p>It is finding and vetting pages that could link to your content before you contact them, so outreach goes only to relevant, live pages.</p>
</details>
<details>
<summary>How do I find link prospects?</summary>
<p>Use Google operators for resource pages, look at pages that cite similar content, search for unlinked brand mentions and check for pages with broken links your content could replace.</p>
</details>
<details>
<summary>How do I qualify a link prospect?</summary>
<p>Check relevance, real readers, placement, how recently the page was updated, how many other links it carries, whether it is indexed and whether a named contact exists.</p>
</details>
<details>
<summary>What is a good prospect score?</summary>
<p>In our 100-point method, 70 and above is worth pursuing, 45 to 69 deserves a second look and anything below is usually skipped. It is our own method, not a Google metric.</p>
</details>
<details>
<summary>How many prospects should I start with?</summary>
<p>Collect 40 to 60 candidates and keep the top 20 after scoring. Send in waves of five to ten so you can learn from replies.</p>
</details>
<details>
<summary>Is there a free link prospecting tool?</summary>
<p>Our free link prospect scorer scores a page out of 100 from your answers. Google operators and Search Console are free ways to find candidates.</p>
</details>
<details>
<summary>Should I prospect sites that sell links?</summary>
<p>No. Google lists buying or selling links for ranking purposes and excessive link exchanges as link spam, so treat such sites as a skip.</p>
</details>
<details>
<summary>Why check for dead links on a prospect page?</summary>
<p>A dead link shows neglect, and it may be an opening: a working replacement helps the owner. In our scan, 6 of 13 pages had one.</p>
</details>
<details>
<summary>How do I track prospects?</summary>
<p>Use a sheet with the site, page, score, contact, date emailed, reply and outcome, plus the live link and its attribute once it appears.</p>
</details>
</div>
`;
const title = 'Link Prospecting: What 13 Real Prospect Pages Showed Us';
const excerpt = `Link prospecting tested on ${P.pages} real pages: ${P.deadPages} had a dead link and ${P.suggest} invited suggestions. How to find, score and shortlist prospects before outreach.`;
const out = content.replace('@@SERPH@@', hh('link-prospecting-serp.png')).replace('@@SCANH@@', hh('link-prospecting-scan.png')).replace('@@SCOREH@@', hh('link-prospecting-score.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-22', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
