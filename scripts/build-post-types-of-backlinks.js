// Builds the "types of backlinks" post + assets. node scripts/build-post-types-of-backlinks.js [--write]
// Data: 7 organic results for "types of backlinks" (Google US, 19 Oct 2026) read for which link types they list + a rel-attribute census of their external links (64 links); Google Search Central link docs read 19 Oct 2026. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'types-of-backlinks';
const R = require('../../keyword-research/serp-types-of-backlinks-2026-10-19.json');
const C = require('../../keyword-research/rel-census-types-of-backlinks-2026-10-19.json').filter(r => r.status === 200);
const ok = R.filter(o => o.status === 200);
const tally = {}; ok.forEach(o => o.types.forEach(n => tally[n] = (tally[n] || 0) + 1));
const per = ok.map(o => o.types.length).sort((a, b) => a - b);
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], minTypes: per[0], maxTypes: per[per.length - 1], medTypes: per[Math.floor(per.length / 2)], onAll: Object.values(tally).filter(v => v === ok.length).length,
  dofollow: tally['dofollow'], nofollow: tally['nofollow'], sponsored: tally['sponsored'], ugc: tally['ugc'], editorial: tally['editorial'], pbn: tally['PBN'], paid: tally['paid'],
  ext: C.reduce((a, r) => a + r.ext, 0), followed: C.reduce((a, r) => a + r.followed, 0), nf: C.reduce((a, r) => a + r.nofollow, 0), sp: C.reduce((a, r) => a + r.sponsored, 0), ugcLinks: C.reduce((a, r) => a + r.ugc, 0), nfPages: C.filter(r => r.nofollow > 0).length };
const exp = { ok: 7, median: 3921, minTypes: 13, maxTypes: 19, medTypes: 16, onAll: 7, dofollow: 6, nofollow: 7, sponsored: 5, ugc: 5, editorial: 7, pbn: 4, paid: 5, ext: 64, followed: 55, nf: 9, sp: 0, ugcLinks: 0, nfPages: 2 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const followedPct = Math.round(D.followed / D.ext * 100), nfPct = Math.round(D.nf / D.ext * 100);
console.log(JSON.stringify(D), followedPct, nfPct);
const f = n => n.toLocaleString('en-US');
const top = Object.entries(tally).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

// ---------- assets
L.donut(SLUG, ['TYPES OF', 'BACKLINKS'], [['Sort by', 'Attribute'], 'Sort by Source', ['Sort by', 'Placement'], 'Sort by Risk', ['Build the', 'Right Mix']]);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'types of backlinks', card: `Pages read: ${D.ok} of ${D.ok}`,
  lines: [`Types listed per page: ${D.minTypes} to ${D.maxTypes}`, `Types on all ${D.ok} pages: ${D.onAll}`, `Links checked: ${D.ext}`, `Followed links: ${D.followed} of ${D.ext}`, `Using sponsored or ugc: ${D.sp + D.ugcLinks} of ${D.ext}`],
  last: 'Sort links four ways', big: `${D.minTypes}-${D.maxTypes}`, k1: 'types listed by each', k2: 'of 7 ranking pages', title: 'Types of Backlinks', sub: `${D.ok} pages disagree on the list` });
fs.writeFileSync(path.join(__dirname, 'infographic-types-of-backlinks.html'), L.infographicHtml({
  title: `Types of Backlinks: ${D.ok} Pages Read`, sub: 'Organic results for "types of backlinks", Google US, 19 October 2026',
  leftTitle: 'Types named by the ranking pages', leftTag: `Number of the ${D.ok} pages that mention each`, max: D.ok,
  bars: [{ label: 'Editorial links', sub: 'on all pages', n: D.editorial }, { label: 'Dofollow links', sub: 'followed by default', n: D.dofollow }, { label: 'Sponsored links', sub: 'a Google rel value', n: D.sponsored }, { label: 'UGC links', sub: 'a Google rel value', n: D.ugc }, { label: 'PBN links', sub: 'a risk pattern', n: D.pbn }],
  rightTitle: 'Sort any link four ways', rightTag: 'A framework that avoids long lists', items: [
    { t: 'Attribute', s: 'followed, nofollow, sponsored, ugc' }, { t: 'Source', s: 'earned, built, bought, self-made' },
    { t: 'Placement', s: 'article, profile, footer, comment' }, { t: 'Risk', s: 'natural, grey or spam pattern' }],
  big: `${D.followed} of ${D.ext}`, noteHtml: `external links on these pages are <em>followed</em>, and none use sponsored or ugc.` }));
fs.writeFileSync(path.join(__dirname, 'table-types-of-backlinks-serp.html'), L.tableHtml({ title: `Link types named by ${D.ok} pages ranking for types of backlinks`, sub: `Organic results read on 19 October 2026. Each page mentions ${D.minTypes} to ${D.maxTypes} of the ${Object.keys(tally).length} types we looked for. Sites are not named. A type counts once per page.`,
  head: ['Backlink type', 'Pages naming it'], lastBold: false,
  rows: top.slice(0, 14).map(([n, v]) => [n.charAt(0).toUpperCase() + n.slice(1), `${v} of ${D.ok}`]) }));
fs.writeFileSync(path.join(__dirname, 'table-types-of-backlinks-axes.html'), L.tableHtml({ title: 'Four ways to sort any backlink', sub: 'A working framework from Contomatix, built on the attributes Google documents and the patterns in its spam policy.',
  head: ['Axis', 'Values', 'Question it answers'], lastBold: false,
  rows: [['Attribute', 'Followed, nofollow, sponsored, ugc', 'Is the link qualified?'], ['Source', 'Earned, outreach-built, self-submitted, bought', 'Who decided the link?'], ['Placement', 'Article text, resource list, profile, comment, footer', 'Where does it sit?'], ['Risk', 'Natural, grey area, spam pattern', 'Would you defend it to Google?']] }));
fs.writeFileSync(path.join(__dirname, 'table-types-of-backlinks-census.html'), L.tableHtml({ title: `How the ${D.ok} pages mark their own external links`, sub: `External links in the main content of each page, counted on 19 October 2026 (menus, headers, footers and sidebars excluded). Sites are not named.`,
  head: ['Link attribute', 'Links'], lastBold: true,
  rows: [['Followed (no nofollow, sponsored or ugc)', `${D.followed} (${followedPct}%)`], ['nofollow', `${D.nf} (${nfPct}%), on ${D.nfPages} pages`], ['sponsored', String(D.sp)], ['ugc', String(D.ugcLinks)], ['All external links counted', String(D.ext)]] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [900, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const g = sz(path.join(pr, 'google-qualify-outbound-links-rel-values.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>There is no single list of the <strong>types of backlinks</strong>. We read the ${D.ok} pages that rank on Google US for the term, and each one mentions between ${D.minTypes} and ${D.maxTypes} of the 23 link types we tracked, with a median of ${D.medTypes}. Only ${D.onAll} types appear on all ${D.ok} pages. We also counted the external links on those pages: ${D.followed} of ${D.ext} (${followedPct}%) are followed, and none use the sponsored or ugc values that most of the pages describe. This guide replaces the long list with four ways to sort any link.</p>

<p>Below you will find what the ranking pages list, a four-axis framework, the link attributes Google documents, the common groupings by source, the classic three types, what to build and what to avoid, and a checklist. Detailed guides sit behind each type, so this page links to them and does not repeat them, starting with <a href="/blog/editorial-backlinks">editorial backlinks</a>.</p>

<h2>What the Ranking Pages List as Types of Backlinks</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/types-of-backlinks-serp.png" alt="Table of the link types named by 7 pages ranking for types of backlinks: nofollow, editorial, guest post, directory, forum, social and press release on all 7, dofollow on 6, sponsored, ugc, profile, blog comment and paid on 5, and broken link, image, footer or sidebar, PBN and contextual on 4" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The lists disagree.</strong> Pages mention ${D.minTypes} to ${D.maxTypes} of the 23 types we tracked, and they mix four different things: attributes (nofollow, ugc), sources (guest post, press release), placements (footer, image) and risk patterns (PBN, paid).</li>
<li><strong>Seven types are universal.</strong> Nofollow, editorial, guest post, directory, forum, social and press release appear on every page.</li>
<li><strong>Some are common but not universal.</strong> Dofollow appears on ${D.dofollow} of ${D.ok}, sponsored and ugc on ${D.sponsored} of ${D.ok} and PBN on ${D.pbn} of ${D.ok}.</li>
<li><strong>Few mention newer rules.</strong> ${D.ugc} of ${D.ok} mention ugc, the value Google recommends for comments and forum links.</li>
</ul>
<p>The disagreement is not a problem you need to solve. It is a sign that the question "how many types are there" is the wrong one. A link has an attribute, a source, a placement and a risk level all at once, so a single list will always overlap.</p>

<h2>Four Ways to Sort Any Backlink</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/types-of-backlinks-axes.png" alt="Table of four ways to sort a backlink: attribute (followed, nofollow, sponsored, ugc), source (earned, outreach-built, self-submitted, bought), placement (article text, resource list, profile, comment, footer) and risk (natural, grey area, spam pattern)" width="1280" height="@@AXESH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Using four axes turns a list of 16 types into a short set of questions. For any link, ask what attribute it carries, who decided it, where it sits and whether you could defend it. The answers describe the link better than a label like "forum backlink" or "article backlink". A forum link on a relevant thread, marked <code>ugc</code>, left by a real member sharing a useful page is a very different thing from a forum link posted in bulk with exact-match anchors.</p>

<h2>Axis One: Attribute (Dofollow, Nofollow, Sponsored, UGC)</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-qualify-outbound-links-rel-values.png" alt="Google Search Central excerpt on rel values: sponsored for advertisements and paid placements, ugc for user-generated content such as comments and forum posts, and nofollow when other values do not apply" width="${g[0]}" height="${g[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>This is the only axis Google defines in its documentation. A link with no rel value is followed by default, which most people call a dofollow backlink. Google documents three values to qualify a link: <code>sponsored</code> for advertisements and paid placements, <code>ugc</code> for user-generated content such as comments and forum posts, and <code>nofollow</code> when the other values do not apply and you would rather Google not associate your site with the linked page. Google adds that <code>nofollow</code> was previously recommended for paid links and is still acceptable, though <code>sponsored</code> is preferred.</p>
<p>Dofollow is not a special attribute you can add. It is what a link is when none of those values are present, so a checker that reports "dofollow" is really reporting "not qualified". Our guide to <a href="/blog/do-nofollow-links-help-seo-2026">whether nofollow links help SEO</a> covers what each is worth, and the free <a href="/tools/dofollow-link-checker">dofollow link checker</a> reads the attribute of every link on a page.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/types-of-backlinks-census.png" alt="Table of the rel attributes on 64 external links in the main content of 7 pages ranking for types of backlinks: 55 followed (86 percent), 9 nofollow (14 percent) on 2 pages, 0 sponsored and 0 ugc" width="1280" height="@@CENSUSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>In the wild, followed links dominate. Across the ${D.ok} pages, ${D.followed} of the ${D.ext} external links in the main content (${followedPct}%) are followed and ${D.nf} are nofollow, and the nofollow links sit on just ${D.nfPages} pages. None carry sponsored or ugc, even though ${D.sponsored} pages describe them. Real link profiles are mostly followed links with a minority of qualified ones, so do not expect a "balanced" mix by design.</p>

<h2>Axis Two: Source (Who Decided the Link)</h2>
<p>Source is the axis that matters most for risk. These are the main groups, each with a guide that goes deeper.</p>
<ul>
<li><strong>Earned or editorial links.</strong> The author chose to link. See <a href="/blog/editorial-backlinks">editorial backlinks</a>, where we show that only 2 of our own 24 links are of this kind.</li>
<li><strong>Outreach-built links.</strong> You ask, and the owner agrees on merit: resource pages, broken link replacement, link insertions. See <a href="/blog/resource-page-link-building">resource page link building</a> and <a href="/blog/find-broken-backlinks">finding broken backlinks</a>.</li>
<li><strong>Guest posts.</strong> You write the content and a host publishes it. See <a href="/blog/guest-posting-vs-niche-edits-2026">guest posting versus niche edits</a>.</li>
<li><strong>Self-submitted links.</strong> Directory listings, profiles and social profiles you create. Some call profile and directory links foundation backlinks, because they set up a brand's basic presence. They can help visibility but are weak as endorsements.</li>
<li><strong>Bought or exchanged links.</strong> Money, goods or swaps. See <a href="/blog/backlinks-exchange">backlink exchanges</a> and our guide to <a href="/blog/saas-link-building-services">SaaS link building services</a> for how paid placements should be marked.</li>
<li><strong>Forum and comment links.</strong> Links left in discussions. See <a href="/blog/forum-backlinks-seo-2026">forum backlinks</a>.</li>
</ul>

<h2>Axis Three: Placement (Where the Link Sits)</h2>
<p>Placement describes the context around the link. A <strong>contextual link</strong> sits inside the body of an article, in a sentence that makes sense without it. Links can also sit in resource lists, author bios, profile fields, comment sections, image captions and templates such as footers and sidebars. Google's spam policy names widely distributed links in footers or templates of various sites, and keyword-rich links in widgets distributed across sites, as examples of link spam, while links inside relevant content are the normal case. The practical rule is that a link in the content, for readers, is what you want. A link repeated on every page of a site is the weakest type of placement.</p>

<h2>Axis Four: Risk (Would You Defend It)</h2>
<p>Risk is the judgement that ties the other axes together. Natural links need no defence. Grey-area links, such as a directory listing or a guest post with a clear byline, are fine in moderation and for real reasons. Spam patterns are the ones Google lists: buying or selling links for ranking purposes, excessive link exchanges, links created by automated programs and low-quality directory or bookmark site links. ${D.pbn} of ${D.ok} ranking pages also name PBN links, a network of sites built to pass links. If you would not be comfortable explaining a link to a reviewer, treat it as a spam pattern, whatever name it goes by.</p>

<h2>The Classic Three Types of Backlinks</h2>
<p>Many guides group links into three types by source: <strong>natural links</strong> that others give without being asked, <strong>manually built links</strong> that you earn through outreach and relationships, and <strong>self-created links</strong> such as directory entries, profiles and comments. That grouping maps neatly onto the source axis above and is a useful shorthand for beginners. Its weakness is that it says nothing about attribute, placement or risk, so use it to start the conversation and the four axes to judge a link.</p>

<h2>Which Types of Backlinks to Build, and Which to Avoid</h2>
<ul>
<li><strong>Build:</strong> editorial and earned links, resource page and broken-link placements, expert mentions and links from partners. Aim for relevance and readers.</li>
<li><strong>Keep modest:</strong> directory and profile links. A few relevant listings are useful, and you do not need dozens.</li>
<li><strong>Handle with care:</strong> guest posts, link insertions and anything paid. Keep anchors natural and mark paid placements as sponsored or nofollow.</li>
<li><strong>Avoid:</strong> exchanges at scale, bulk comment and forum links, link networks and automated link creation.</li>
</ul>
<p>Looking for the best backlinks for SEO is not a matter of finding one best type. A mixed profile with mostly relevant, followed, editorial or outreach-built links and a small share of listings is easier to defend than a profile built from any one tactic. Our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a> explains how to score fit, and the <a href="/blog/link-building-campaign">link building campaign guide</a> turns the mix into a plan.</p>

<h2>Matching Link Types to Your Goal</h2>
<p>Different goals call for different mixes. If you want <strong>referral visitors</strong>, favour links inside content that people read, such as editorial mentions, resource lists and partner pages, because readers click those. If you want <strong>ranking support</strong> for a particular page, favour relevant, followed links pointing at that page or at pages that link to it, and keep the anchors natural. If you want <strong>brand visibility</strong>, directory and profile links, expert quotes and mentions all help people find you, even when they are nofollow. And if you want a <strong>safe baseline</strong> for a new site, start with a small number of relevant listings and one or two pieces worth citing, then build outward. Writing the goal down first stops you from collecting every type and keeps the effort aimed at the pages that matter.</p>

<h2>Common Misreadings of Link Types</h2>
<ul>
<li><strong>"Nofollow links are useless."</strong> Qualified links can still send visitors and build awareness, and a natural profile contains some. Google also says nofollow is an acceptable way to flag paid links.</li>
<li><strong>"Dofollow means good."</strong> It only means the link is not qualified. A followed link from an irrelevant or spammy page is not a good link.</li>
<li><strong>"Directory links are bad."</strong> Low-quality directory and bookmark site links are on Google's spam list, but a few relevant, genuine listings are normal. The line is volume and quality.</li>
<li><strong>"More types means a healthier profile."</strong> Variety is a by-product of real marketing, not a target. Do not build a type just to fill a chart.</li>
<li><strong>"Guest posts are always risky."</strong> They are risky at scale with optimised anchors. A careful, useful contribution to a relevant site is a normal marketing activity.</li>
</ul>

<h2>Free Ways to Create Backlinks, and Their Limits</h2>
<p>People often search for how to create backlinks free. The free options are real but limited: submit your site to a few relevant directories, complete profiles on platforms your customers use, publish something worth citing and tell people who would find it useful. These are self-submitted or outreach-built links, so expect modest value and keep the volume low. What you should not do is use free tools that create links automatically, since Google lists automated link creation as link spam.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-types-of-backlinks.png" alt="Infographic of the link types named by 7 pages ranking for types of backlinks and four ways to sort any backlink: attribute, source, placement and risk" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>A Quick Checklist for Any Backlink</h2>
<ol>
<li><strong>Attribute:</strong> open the page source or use the checker. Is it followed, nofollow, sponsored or ugc?</li>
<li><strong>Source:</strong> who decided to place it: an author, you, a directory or a buyer?</li>
<li><strong>Placement:</strong> is it inside relevant content or in a footer, sidebar or profile?</li>
<li><strong>Risk:</strong> could you explain it to Google without mentioning rankings?</li>
<li><strong>Value:</strong> is the page indexed and read by people in your topic? See <a href="/blog/how-to-index-backlinks">how to index backlinks</a>.</li>
</ol>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the ${D.ok} organic results for one query on one day (Google US, 19 October 2026). All ${D.ok} returned a readable page.</li>
<li>A link type counts once per page when its name appears in the text. We looked for ${Object.keys(tally).length} types, so a page can list more types than we tracked.</li>
<li>The attribute census counts external links in the main content of each page, excluding menus, headers, footers and sidebars, on the same day.</li>
<li>The four-axis framework is our own working method, built on the rel values and spam examples in Google's documentation, read on 19 October 2026.</li>
<li>Results for other queries or dates will differ.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>No agreed list exists: the ${D.ok} ranking pages mention ${D.minTypes} to ${D.maxTypes} of 23 types and only ${D.onAll} appear on every page.</li>
<li>Sort any link by attribute, source, placement and risk instead of memorising a list.</li>
<li>Google documents only three qualifying values: sponsored, ugc and nofollow. A link with none is followed.</li>
<li>Source drives risk: earned and outreach-built links are the safest, bought and exchanged links the riskiest.</li>
<li>Build a mix led by relevant, earned or outreach-built links, with listings kept modest.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are the types of backlinks?</summary>
<p>Ranking guides mention 13 to 19 types, from editorial and guest post links to directory, forum and paid links. A simpler way is to sort links by attribute, source, placement and risk.</p>
</details>
<details>
<summary>What are the 3 types of backlinks?</summary>
<p>A common grouping is natural links that others give, manually built links earned through outreach, and self-created links such as directory entries and profiles.</p>
</details>
<details>
<summary>What are the different types of backlinks by attribute?</summary>
<p>Followed links with no rel value, and links qualified with nofollow, sponsored or ugc. Google documents those three values.</p>
</details>
<details>
<summary>What are dofollow backlinks?</summary>
<p>They are links with no nofollow, sponsored or ugc value. "Dofollow" is not an attribute you add, it is the default state of a link.</p>
</details>
<details>
<summary>What are the best backlinks for SEO?</summary>
<p>Relevant, earned or outreach-built links inside content that people read. No single type is best, and a mixed profile is easier to defend.</p>
</details>
<details>
<summary>What are article backlinks and profile backlinks?</summary>
<p>An article backlink sits inside the body of an article. A profile backlink comes from a profile page you create on a site. The first is a placement, the second a source.</p>
</details>
<details>
<summary>What are foundation backlinks?</summary>
<p>The term refers to basic links such as directory entries and social profiles that establish a brand's presence. They are self-submitted and carry modest value.</p>
</details>
<details>
<summary>How can I create backlinks for free?</summary>
<p>Submit to a few relevant directories, complete profiles where your customers are, publish something worth citing and tell the right people. Avoid tools that create links automatically.</p>
</details>
<details>
<summary>Which types of backlinks are risky?</summary>
<p>Bought or exchanged links at scale, bulk comment and forum links, link networks and automated link creation are named in Google's link spam policy.</p>
</details>
</div>
`;
const title = 'Types of Backlinks: 4 Ways to Sort Any Link, Not a Long List';
const excerpt = `Types of backlinks: ${D.ok} ranking pages list ${D.minTypes} to ${D.maxTypes} types and disagree. Sort any link by attribute, source, placement and risk instead.`;
const out = content.replace('@@SERPH@@', hh('types-of-backlinks-serp.png')).replace('@@AXESH@@', hh('types-of-backlinks-axes.png')).replace('@@CENSUSH@@', hh('types-of-backlinks-census.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-19', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
