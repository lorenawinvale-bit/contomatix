// Builds the "editorial backlinks" post + assets. node scripts/build-post-editorial-backlinks.js [--write]
// Data: Search Console Links report for contomatix.com (24 external links, 10 linking sites, 19 Oct 2026) with the linking pages opened and classified; 7 organic results for "editorial backlinks" (Google US, 19 Oct 2026). Linking sites are described by type, not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'editorial-backlinks';
const R = require('../../keyword-research/serp-editorial-backlinks-2026-10-19.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], natural: c(o => o.natural), pr: c(o => o.pr), relevance: c(o => o.relevance), price: c(o => o.price), cost: c(o => o.cost), policy: c(o => o.googlePolicy), nofollow: c(o => o.nofollowM), guarantee: c(o => o.guarantee), risk: c(o => o.risk), study: c(o => o.study), example: c(o => o.example), steps: c(o => o.steps) };
const exp = { ok: 7, median: 1825, natural: 7, pr: 7, relevance: 6, price: 5, cost: 6, policy: 3, nofollow: 3, guarantee: 2, risk: 5, study: 2, example: 2, steps: 2 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// our own 24 links by source type (GSC Links report; linking pages opened 19 Oct 2026)
const own = [['Agency directory pages', 14], ['Product and tool directory listings', 6], ['Editorial mentions inside articles', 2], ['Website-trust report page', 1], ['Local marketing-agency listing pages', 1]];
const total = own.reduce((a, r) => a + r[1], 0); if (total !== 24) throw new Error('own total ' + total);
const edit = 2, listing = total - edit; const editPct = Math.round(edit / total * 100);
console.log(JSON.stringify(D), 'own', total, 'editorial', edit, editPct + '%');
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['EDITORIAL', 'BACKLINKS'], [['Know What', 'Counts'], 'Audit Your Links', ['Build Something', 'Worth Citing'], 'Pitch With Context', ['Verify Each', 'Live Link']]);
L.cover(SLUG, { badge: 'REAL LINK AUDIT', search: 'editorial backlinks', card: `Our external links: ${total}`,
  lines: [`Linking sites: 10`, `Editorial mentions: ${edit} of ${total}`, `Directory or listing links: ${listing} of ${total}`, `Editorial links followed: ${edit} of ${edit}`, `Ranking pages read: ${D.ok}`],
  last: 'Earn, do not trade', big: `${edit} of ${total}`, k1: 'of our own links', k2: 'are editorial mentions', title: 'Editorial Backlinks', sub: `What our ${total} links show, and ${D.ok} ranking pages say` });
fs.writeFileSync(path.join(__dirname, 'infographic-editorial-backlinks.html'), L.infographicHtml({
  title: `Our ${total} Links: Only ${edit} Are Editorial`, sub: 'Search Console Links report, contomatix.com, 19 October 2026, linking pages opened and classified',
  leftTitle: 'Where our links come from', leftTag: `Number of the ${total} external links`, max: 14,
  bars: [{ label: 'Agency directories', sub: 'directory profile pages', n: own[0][1] }, { label: 'Tool listings', sub: 'product or tool listings', n: own[1][1] }, { label: 'Editorial mentions', sub: 'a link inside an article', n: own[2][1] }, { label: 'Trust report', sub: 'automated site report', n: own[3][1] }, { label: 'Local listings', sub: 'agency listing pages', n: own[4][1] }],
  rightTitle: 'What makes a link editorial', rightTag: 'Four signs to look for', items: [
    { t: 'Inside the article text', s: 'in a sentence, not a list' }, { t: 'Nobody paid or swapped', s: 'the author chose to link' },
    { t: 'Relevant to the topic', s: 'readers would click it' }, { t: 'Followed by default', s: 'no sponsored or nofollow' }],
  big: `${edit} of ${total}`, noteHtml: `of our own links are <em>editorial mentions</em>. The other ${listing} are directory and listing pages.` }));
fs.writeFileSync(path.join(__dirname, 'table-editorial-backlinks-own.html'), L.tableHtml({ title: `Our ${total} external links by source type`, sub: 'Search Console Links report for contomatix.com on 19 October 2026: 10 linking sites. Linking pages were opened and classified by us. Sites are not named.',
  head: ['Source type', 'Links'], lastBold: true,
  rows: [...own.map(r => [r[0], String(r[1])]), ['All external links', String(total)]] }));
fs.writeFileSync(path.join(__dirname, 'table-editorial-backlinks-two.html'), L.tableHtml({ title: 'The two editorial links, compared', sub: 'Read directly from the linking pages on 19 October 2026. Sites are not named.',
  head: ['Feature', 'Link A', 'Link B'], lastBold: false,
  rows: [['Page type', 'Article on white-label SEO services', 'Comparison article on keyword tools'], ['Length of page', '4,267 words', '5,772 words'], ['Where the link sits', 'Inside a sentence about agencies', 'Inside a sentence about agencies'], ['Anchor text', 'Contomatix (brand name)', 'Contomatix (brand name)'], ['rel attribute', 'None, so followed', 'noreferrer noopener, so followed'], ['Our page linked to', 'Home page', 'Home page']] }));
fs.writeFileSync(path.join(__dirname, 'table-editorial-backlinks-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for editorial backlinks say`, sub: `Organic results read on 19 October 2026 (${D.ok} of ${D.ok} readable). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Natural or earned links', `${D.natural} of ${D.ok}`], ['Digital PR or press', `${D.pr} of ${D.ok}`], ['Relevance', `${D.relevance} of ${D.ok}`], ['Cost, price or budget', `${D.cost} of ${D.ok}`], ['Risk, penalty or manual action', `${D.risk} of ${D.ok}`], ['Google policy or guidelines', `${D.policy} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ['Guarantee or 100 percent wording', `${D.guarantee} of ${D.ok}`], ['A study or original data', `${D.study} of ${D.ok}`], ['A worked example', `${D.example} of ${D.ok}`]] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [1280, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1];
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>An <strong>editorial backlink</strong> is a link that a writer or editor places in their own content because they think it helps readers, with no payment, trade or request that shaped the decision. To see what that looks like in practice, we opened every page that links to contomatix.com in Search Console on 19 October 2026. Of our ${total} external links from 10 sites, only ${edit} (${editPct}%) are editorial mentions inside articles. The other ${listing} come from directory and listing pages.</p>

<p>Below you will find what an editorial link is and is not, what our own ${total} links show, what the two editorial ones look like, what ${D.ok} ranking pages say about editorial links, how to earn them, what editorial link building services should provide and how to check a link. It builds on our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a>, which covers topical fit.</p>

<h2>An Editorial Link Is: A Plain Definition</h2>
<p>An editorial link is chosen by the person who publishes it. Nobody paid for it, nobody exchanged a link for it and the author could have left it out. It usually sits inside the body of an article, in a sentence where the reference helps the reader. People also call it an editorial link in SEO terms, editorial links SEO or simply an earned link. The word editorial matters because it describes who made the decision, not the type of site: a personal blog can give an editorial link and a large publication can sell a link that is not editorial at all.</p>
<p>That is why Google's spam policy lists buying or selling links for ranking purposes, excessive link exchanges and advertorials with paid links that pass ranking credit as link spam. Those arrangements replace the editor's judgement with a deal. An editorial link is the opposite: it exists because of the content.</p>

<h2>What Our Own ${total} Links Show</h2>
<p>We believed our profile was mostly editorial until we opened the pages. Search Console's Links report shows ${total} external links from 10 sites. For each linking site we found the actual page, read the sentence or block around the link and checked the link attribute where the page allowed it.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/editorial-backlinks-own.png" alt="Table of Contomatix's 24 external links by source type: agency directory pages 14, product and tool directory listings 6, editorial mentions inside articles 2, website-trust report page 1 and local marketing-agency listing pages 1" width="1280" height="@@OWNH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Most links are listings.</strong> ${own[0][1]} come from agency directory pages and ${own[1][1]} from product and tool directories. Whether we submitted the listing or the directory added us, a listing is not an editorial choice.</li>
<li><strong>Two links are editorial.</strong> Two articles, written by people we never contacted for those pieces, mention us by name and link to the home page.</li>
<li><strong>Attributes differ.</strong> The directory profile link and the tool listing link we could read are marked <code>nofollow</code>. Both editorial links are followed.</li>
<li><strong>Counts hide the weight.</strong> One agency directory site accounts for 9 of our ${total} links, across 9 of its pages. Ten linking sites are a much smaller picture than ${total} links suggest.</li>
</ul>
<p>The honest conclusion is that our profile is thin on editorial links, which is normal for a young site. It is also why we treat the two editorial mentions as the benchmark for what to earn more of.</p>

<h2>What the Two Editorial Links Look Like</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/editorial-backlinks-two.png" alt="Table comparing the two editorial links: an article on white-label SEO services and a comparison article on keyword tools, both inside a sentence about agencies, with the brand name as anchor text, no nofollow, linking to the home page" width="1280" height="@@TWOH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Both share the same features. They sit in long articles of more than 4,000 words, inside a sentence that lists agencies or providers, with the brand name as the anchor and no attribute that qualifies the link. Both articles are on topics close to ours. Neither was bought and neither was a swap. That combination is what an editorial link looks like in the wild: unremarkable, brief and surrounded by content about the same subject.</p>

<h2>What the Ranking Pages Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/editorial-backlinks-serp.png" alt="Table of what 7 pages ranking for editorial backlinks mention: natural or earned links 7, digital PR 7, relevance 6, cost 6, risk 5, Google policy 3, nofollow or sponsored 3, guarantee wording 2, a study 2, a worked example 2" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Everyone agrees on earning.</strong> All ${D.ok} pages talk about natural or earned links and digital PR.</li>
<li><strong>Price appears often.</strong> ${D.price} of ${D.ok} mention a price, and ${D.cost} of ${D.ok} discuss cost, because several are selling editorial link building services.</li>
<li><strong>Guarantees are rare but present.</strong> ${D.guarantee} of ${D.ok} use guarantee-style wording. An editor's decision cannot be guaranteed, so treat that as a warning.</li>
<li><strong>Google's rules are underused.</strong> ${D.policy} of ${D.ok} mention Google policy, and ${D.nofollow} mention nofollow or sponsored.</li>
<li><strong>Proof is thin.</strong> Only ${D.study} of ${D.ok} cite a study or data and ${D.example} give a worked example. None of them show a real link profile the way we did above.</li>
</ul>

<h2>Why Editorial Links Are Worth More Than Listings</h2>
<p>Google says it uses links as a signal when determining the relevancy of pages and to find new pages to crawl. A link chosen by an author inside relevant content is a stronger statement than a profile you filled in yourself, because someone with no stake decided your page was worth mentioning. Editorial links also tend to bring readers, since they sit in text people actually read. Directory listings are not worthless: they can send some visitors and help a new brand appear in more places. But if every link you have comes from a profile you created, you have no independent endorsement yet.</p>

<h2>How to Earn Editorial Backlinks</h2>
<p>You cannot ask for an editorial link and still call it editorial, but you can make it easy and likely. These approaches work because they give an author a reason to link.</p>
<ol>
<li><strong>Publish something worth citing.</strong> Original data, a free tool, a clear template or a first-hand test. Our own two editorial mentions came from guides on topics where we had a clear point of view.</li>
<li><strong>Be easy to find for the right topics.</strong> Authors link to pages they can find. Cover a topic fully and keep it accurate.</li>
<li><strong>Suggest, do not demand.</strong> A short note that offers a useful page for a specific passage, as in <a href="/blog/resource-page-link-building">resource page link building</a>, can lead to a link the author chooses to add.</li>
<li><strong>Fix a problem for them.</strong> Reporting a dead link and offering a replacement, as in <a href="/blog/find-broken-backlinks">finding broken backlinks</a>, helps the author.</li>
<li><strong>Give expert input.</strong> Journalists and bloggers often include a quote and a link to the source.</li>
<li><strong>Plan it.</strong> Treat editorial outreach as a campaign with goals and KPIs, as described in our <a href="/blog/link-building-campaign">link building campaign guide</a>.</li>
</ol>
<p>Draft your messages with the free <a href="/tools/outreach-email-generator">link building outreach email generator</a>.</p>

<h2>What Editorial Link Building Services Should Provide</h2>
<p>Some agencies sell editorial link building services. A trustworthy one should be able to show real examples of links it has earned, with the page, the sentence and the link attribute. It should explain how it reaches editors, how it separates earned links from paid placements and what it does when a link is removed. It should not promise a number of links by a date, because an editor decides, and it should mark any paid placement as sponsored or nofollow. Divide the price by the number of live links to compare offers, and use our <a href="/tools/link-building-cost-calculator">link building cost calculator</a> to work out the real cost per live link. For a deeper checklist, see our guide to <a href="/blog/saas-link-building-services">SaaS link building services</a>.</p>

<h2>How to Check Whether a Link Is Editorial</h2>
<ol>
<li><strong>Open the linking page.</strong> Find your link and read the paragraph around it.</li>
<li><strong>Look at the placement.</strong> Inside the article body is a good sign. Footers, sidebars and lists of partners are not.</li>
<li><strong>Check the attribute.</strong> A sponsored, ugc or nofollow value means the link is qualified. The <a href="/tools/dofollow-link-checker">dofollow link checker</a> shows it for every link on a page.</li>
<li><strong>Ask where it came from.</strong> If you paid, swapped or submitted a profile, it is not editorial, even on a respected site. See our guide to <a href="/blog/backlinks-exchange">backlink exchanges</a>.</li>
<li><strong>Judge the context.</strong> Is the page on your topic, written for readers and not mainly to sell links?</li>
</ol>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-editorial-backlinks.png" alt="Infographic of where Contomatix's 24 external links come from, with 2 editorial mentions, and four signs of an editorial link" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Editorial Links Versus Guest Posts and Sponsored Links</h2>
<p>These three are often confused, so it helps to separate them by who decides and who pays. In an <strong>editorial link</strong>, the author decides and nobody pays. In a <strong>guest post</strong>, you write the content and the host site agrees to publish it, usually with a link in the text or the author bio. The host chose to publish, but you pitched the link, so it is closer to a negotiated placement than an editorial mention. Google's policy flags guest posts and press releases distributed on other sites when they carry links with optimised anchor text, which is why the quality of the content and the anchor matter. In a <strong>sponsored link</strong>, money or goods change hands, and Google asks for the link to be marked with <code>sponsored</code> or <code>nofollow</code>. Our comparison in <a href="/blog/guest-posting-vs-niche-edits-2026">guest posting versus niche edits</a> goes deeper on the middle category.</p>

<h2>Where Editorial Links Come From in Practice</h2>
<p>Both of our editorial links appeared in long comparison and explainer articles where an author listed examples of providers or tools. That is a common pattern. Authors writing a roundup look for names that are easy to verify, so a clear home page, an accurate description of what you do and consistent branding across the web make it more likely that you are included. Other typical sources are resource lists maintained by associations, journalists quoting a source, bloggers citing a data point and partners explaining an integration. In every case, the link is a by-product of the content being useful. If you want more of them, work backwards from the question: what would an author writing about this topic need to cite, and does a page like that exist on your site?</p>
<p>Editorial links also compound slowly. Our two came from articles that were already published and ranking, which means other writers may find us in the same way. That is the long-run benefit of building pages that are worth citing and of keeping them accurate as facts change.</p>

<h2>Common Editorial Link Mistakes</h2>
<ul>
<li><strong>Calling every link editorial.</strong> A profile you submitted is not an editorial link, whatever the site's reputation.</li>
<li><strong>Paying for editorial.</strong> If money changes hands, the link is an advertisement and should be marked as one.</li>
<li><strong>Over-optimising the anchor.</strong> Both of our editorial links use the brand name. Authors choose natural anchors.</li>
<li><strong>Pitching without a reason to link.</strong> Without a useful page, there is nothing for an author to cite.</li>
<li><strong>Ignoring measurement.</strong> Track new referring pages and the impressions of the target page.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>The count of 24 external links and 10 linking sites comes from the Search Console Links report for contomatix.com on 19 October 2026.</li>
<li>We found the linking pages with Google site: searches and by opening the profile pages, then classified each link by type. Some listing sites blocked automated access, so for those the type comes from the page type and not a full read of the link attribute.</li>
<li>Attributes are reported only where we could read the page: the directory profile and tool listing links we read are nofollow and the two editorial links are followed.</li>
<li>We read the ${D.ok} organic results for one query on one day (Google US, 19 October 2026). Counts show whether a page mentions a term, not how well it explains it.</li>
<li>Results for other sites and dates will differ. Check your own Links report.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>An editorial backlink is chosen by the author, unpaid and unexchanged, and usually sits inside the article text.</li>
<li>Only ${edit} of our own ${total} links are editorial. The rest are directory and listing pages.</li>
<li>Earn more by publishing something worth citing and making it easy to find.</li>
<li>Be wary of anyone who guarantees editorial links, and mark paid placements as sponsored or nofollow.</li>
<li>Check each link's placement, attribute and origin.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is an editorial backlink?</summary>
<p>It is a link an author or editor places in their own content because they think it helps readers, with no payment or exchange behind it.</p>
</details>
<details>
<summary>What is an editorial link in SEO?</summary>
<p>It is the kind of link search engines treat as an independent recommendation. It sits in the body of relevant content and was chosen by the publisher.</p>
</details>
<details>
<summary>How do I get editorial backlinks?</summary>
<p>Publish pages worth citing, such as original data or free tools, make them easy to find, and suggest them where they genuinely help. You cannot force an editor to link.</p>
</details>
<details>
<summary>Are directory listings editorial links?</summary>
<p>No. A profile you submitted, or a listing the directory added, is a listing. It can help visibility, but it is not an independent endorsement.</p>
</details>
<details>
<summary>Are editorial links always dofollow?</summary>
<p>They are usually followed by default, as our two were, but an editor can choose any attribute. Check the rel value on the page.</p>
</details>
<details>
<summary>Do editorial link building services work?</summary>
<p>Good ones show real examples of earned links and explain how they reach editors. Avoid any that guarantee a number of links by a date or sell paid placements as editorial.</p>
</details>
<details>
<summary>Can I pay for an editorial link?</summary>
<p>If you pay, the link is an advertisement. Google says paid links that pass ranking credit should be qualified with sponsored or nofollow.</p>
</details>
<details>
<summary>How do I know if a backlink is editorial?</summary>
<p>Check that it sits inside article content, that nobody paid or swapped for it, that the page is relevant and that the link has no sponsored or nofollow value.</p>
</details>
<details>
<summary>How many editorial backlinks do I need?</summary>
<p>No fixed number applies. Compare your profile with the pages you want to rank, and see our guide to how many backlinks you need for a method.</p>
</details>
</div>
`;
const title = 'Editorial Backlinks: What Our 24 Links Show and How to Earn';
const excerpt = `Editorial backlinks explained with real data: only ${edit} of our ${total} links are editorial. How to spot, earn and verify them, plus what ${D.ok} ranking pages say.`;
const out = content.replace('@@OWNH@@', hh('editorial-backlinks-own.png')).replace('@@TWOH@@', hh('editorial-backlinks-two.png')).replace('@@SERPH@@', hh('editorial-backlinks-serp.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-19', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
