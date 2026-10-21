// Builds the "linkable assets" post + assets. node scripts/build-post-linkable-assets.js [--write]
// Data: Search Console Links report for contomatix.com (24 external links; target pages and linking sites, 21 Oct 2026); our tools list (33 live tools) and 331 posts; 11 readable organic results for "linkable assets" and "link baiting" (Google US, 21 Oct 2026). Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'linkable-assets';
const R = require('../../keyword-research/serp-linkable-assets-2026-10-21.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], tool: c(o => o.tool), format: c(o => o.format), research: c(o => o.research), infographic: c(o => o.infographic), emotion: c(o => o.emotion), outreach: c(o => o.outreach), measure: c(o => o.measure), example: c(o => o.example), caseStudy: c(o => o.caseStudy), policy: c(o => o.googlePolicy), googleDoc: c(o => o.googleDoc), nofollow: c(o => o.nofollow), internal: c(o => o.internal) };
const exp = { ok: 11, median: 2725, tool: 11, format: 11, research: 10, infographic: 9, emotion: 9, outreach: 11, measure: 10, example: 10, caseStudy: 9, policy: 0, googleDoc: 0, nofollow: 2, internal: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// Search Console Links report, 21 Oct 2026: target pages of our 24 external links
const G = { total: 24, home: 17, tools: 6, toolPages: 4, services: 1, posts: 0, sites: 10, liveTools: 33, posts331: 331 };
if (G.home + G.tools + G.services + G.posts !== G.total) throw new Error('link split');
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['LINKABLE', 'ASSETS'], [['Pick a', 'Real Question'], 'Build It Simply', ['Make It', 'Citable'], 'Reach the Right People', ['Measure the', 'Links']]);
L.cover(SLUG, { badge: 'REAL LINK DATA', search: 'linkable assets', card: `Our ${G.total} external links`,
  lines: [`To the home page: ${G.home}`, `To free tool pages: ${G.tools}`, `To a service page: ${G.services}`, `To our ${G.posts331} posts: ${G.posts}`, `Tools with a link: ${G.toolPages} of ${G.liveTools}`],
  last: 'Tools earned, posts did not', big: `${G.tools} vs ${G.posts}`, k1: 'links to tools versus', k2: `links to ${G.posts331} posts`, title: 'Linkable Assets', sub: 'What earned our links, and what did not' });
fs.writeFileSync(path.join(__dirname, 'infographic-linkable-assets.html'), L.infographicHtml({
  title: 'What Our 24 External Links Point At', sub: 'Search Console Links report, contomatix.com, 21 October 2026',
  leftTitle: 'Target pages of our external links', leftTag: `Number of the ${G.total} links`, max: 20,
  bars: [{ label: 'Home page', sub: 'brand mentions and listings', n: G.home }, { label: 'Free tool pages', sub: `${G.toolPages} different tools`, n: G.tools }, { label: 'A service page', sub: 'link building service', n: G.services }, { label: 'Blog posts', sub: `none of ${G.posts331} posts`, n: G.posts }],
  rightTitle: 'Make an asset worth linking to', rightTag: 'Five checks before you build', items: [
    { t: 'Does it solve one job?', s: 'a tool, a number, a template' }, { t: 'Is it better than what exists?', s: 'check the top results' },
    { t: 'Can it be cited in a sentence?', s: 'clear title, clear method' }, { t: 'Does it have its own URL?', s: 'stable and crawlable' }],
  big: `${G.tools} vs ${G.posts}`, noteHtml: `links went to <em>free tool pages</em> versus blog posts. Useful, citable pages attract links, and ordinary articles often do not.` }));
fs.writeFileSync(path.join(__dirname, 'table-linkable-assets-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for linkable assets and link baiting say`, sub: `Organic results read on 21 October 2026 (${D.ok} readable of 12 listed for the two searches). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Free tools, calculators or generators', `${D.tool} of ${D.ok}`], ['Formats such as templates, checklists, guides', `${D.format} of ${D.ok}`], ['Outreach to promote the asset', `${D.outreach} of ${D.ok}`], ['Original research or data', `${D.research} of ${D.ok}`], ['Measuring links earned', `${D.measure} of ${D.ok}`], ['Examples', `${D.example} of ${D.ok}`], ['Infographics', `${D.infographic} of ${D.ok}`], ['Emotion, shareable or viral content', `${D.emotion} of ${D.ok}`], ['Case studies or results', `${D.caseStudy} of ${D.ok}`], ['Internal links', `${D.internal} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ['Google spam policy', `${D.policy} of ${D.ok}`], ['Citing Google documentation', `${D.googleDoc} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-linkable-assets-ours.html'), L.tableHtml({ title: 'Where our external links point, by type of page', sub: `Search Console Links report for contomatix.com on 21 October 2026: ${G.total} external links from ${G.sites} sites. We have ${G.liveTools} free tools and ${G.posts331} posts live.`,
  head: ['Target page type', 'External links', 'Pages with a link'], lastBold: true,
  rows: [['Home page', String(G.home), '1'], ['Free tool pages', String(G.tools), `${G.toolPages} of ${G.liveTools}`], ['Service page', String(G.services), '1'], ['Blog posts', String(G.posts), `0 of ${G.posts331}`], ['All external links', String(G.total), '']] }));
fs.writeFileSync(path.join(__dirname, 'table-linkable-assets-types.html'), L.tableHtml({ title: 'Types of linkable assets compared', sub: 'A working comparison from Contomatix. Effort is relative to a small team.',
  head: ['Asset type', 'Why people cite it', 'Effort'], lastBold: false,
  rows: [['Free tool or calculator', 'Does a job; easy to link as a reference', 'High, then low'], ['Original data or study', 'A fact others can quote with a source', 'High'], ['Template or checklist', 'Saves readers time', 'Medium'], ['Glossary or definition page', 'A clear, neutral reference', 'Medium'], ['Infographic or chart', 'Makes data visual; needs an article beside it', 'Medium'], ['Resource hub', 'One place for a topic', 'High']] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [900, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const g = sz(path.join(pr, 'google-link-spam-policy-examples.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>A <strong>linkable asset</strong> is a page built to be worth linking to: a free tool, a data study, a template, a clear reference or anything else people cite because it helps them. Older guides call a more attention-seeking version of the same idea link baiting. We checked what our own ${G.total} external links point at in Search Console. ${G.home} go to the home page and ${G.tools} go to free tool pages, spread over ${G.toolPages} different tools. None go to any of our ${G.posts331} blog posts.</p>

<p>Below you will find what a linkable asset is, how it differs from link bait, what ${D.ok} ranking guides say, what our own links show about which pages earned them, the main asset types, how to build and promote one without breaking Google's rules, and how to measure the result. It sits inside the broader plan in our <a href="/blog/link-building-campaign">link building campaign guide</a>.</p>

<h2>What a Linkable Asset Is, and How Link Baiting Differs</h2>
<p>A linkable asset gives someone a reason to link without being asked: a tool they can send to a colleague, a number they can quote, a template they can use. <strong>Link baiting</strong> is the older term for content created mainly to attract links, and it often implies sensational or controversial angles meant to get attention. The line between the two is usefulness. A linkable asset keeps earning links because people still need it, while bait tends to spike and fade. This guide treats both under one question: what would make an author, writing about your topic, decide to cite your page?</p>

<h2>What the Ranking Guides Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/linkable-assets-serp.png" alt="Table of what 11 pages ranking for linkable assets and link baiting mention: free tools 11, formats such as templates 11, outreach 11, original research 10, measuring links 10, examples 10, infographics 9, emotion or viral content 9, case studies 9, internal links 4, nofollow 2, Google spam policy 0, Google documentation 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Tools and formats lead.</strong> All ${D.ok} pages mention free tools or calculators and formats such as templates and checklists.</li>
<li><strong>Research and visuals follow.</strong> ${D.research} of ${D.ok} cover original research or data, and ${D.infographic} of ${D.ok} mention infographics.</li>
<li><strong>Promotion is assumed.</strong> All ${D.ok} mention outreach, and ${D.measure} of ${D.ok} talk about measuring the links earned.</li>
<li><strong>The older angle persists.</strong> ${D.emotion} of ${D.ok} mention emotion, shareable or viral content.</li>
<li><strong>Google is absent.</strong> None mention Google's spam policy or cite its documentation, which matters for widgets and embeds.</li>
<li><strong>Few show their own links.</strong> ${D.caseStudy} of ${D.ok} refer to a case study or results, but none show which pages on a small site earned links, which we do next.</li>
</ul>

<h2>What Earned Our Links, and What Did Not</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/linkable-assets-ours.png" alt="Table of where Contomatix's 24 external links point: home page 17, free tool pages 6 across 4 of 33 tools, a service page 1 and blog posts 0 of 331" width="1280" height="@@OURSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The home page takes most links.</strong> ${G.home} of ${G.total} point at the home page, typically from directory profiles and brand mentions.</li>
<li><strong>Tools take most of the rest.</strong> ${G.tools} links point at free tool pages, and the four pages involved are our <a href="/tools/llm-seo-checker">LLM SEO checker</a>, our <a href="/tools/llms-txt-generator">llms.txt generator</a>, our <a href="/tools/hreflang-sitemap-validator">hreflang sitemap validator</a> and our <a href="/tools/sitemap-validator">sitemap validator</a>.</li>
<li><strong>Posts earned nothing yet.</strong> ${G.posts} of ${G.posts331} posts have an external link, even though they hold most of our content.</li>
<li><strong>Few tools earned links.</strong> Only ${G.toolPages} of ${G.liveTools} tools have one, so a tool is a better bet than a post but no guarantee.</li>
</ul>
<p>We should be careful about what this proves. Most links to our tools came through listings and launch lists that name each tool and link to it, not from authors choosing to cite a tool in an article. Even so, the pattern is informative: a tool has a name, a purpose and a stable page, so it is easy for any site to list or reference, in a way a general article is not. Our link profile is small and young, so read it as an observation about one site, not a rule.</p>

<h2>Types of Linkable Assets</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/linkable-assets-types.png" alt="Table comparing types of linkable assets: free tools, original data, templates and checklists, glossary pages, infographics and resource hubs, with why people cite each and the effort involved" width="1280" height="@@TYPESH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Free tools and calculators.</strong> They do a job and are easy to link as a reference. Our <a href="/tools">free tools</a> follow this pattern.</li>
<li><strong>Original data and studies.</strong> A number that others can quote with a source. Every study in our recent guides, such as the one in <a href="/blog/editorial-backlinks">editorial backlinks</a>, is built to be citable.</li>
<li><strong>Templates and checklists.</strong> Resources people copy and use.</li>
<li><strong>Glossary and definition pages.</strong> A clear, neutral reference for a term.</li>
<li><strong>Infographics and charts.</strong> Useful when they present real data, but they need a page of explanation beside them, and a lone image is hard to cite.</li>
<li><strong>Resource hubs.</strong> A well-organised collection for one topic.</li>
</ul>

<h2>Linkable Asset Ideas for Different Kinds of Sites</h2>
<ul>
<li><strong>A software or tool company</strong> can publish free versions of its core calculation, benchmarks from its own usage data and integration guides that partners will link.</li>
<li><strong>A service business</strong> can publish a pricing guide built from real quotes, a checklist its clients use or a short study of what it sees across its projects.</li>
<li><strong>An ecommerce store</strong> can build a size or compatibility finder, a buying guide that compares products honestly or data on how customers use what it sells.</li>
<li><strong>A publisher or blog</strong> can run a small survey, maintain a glossary or keep a regularly updated statistics page that others cite.</li>
<li><strong>A local or specialist organisation</strong> can publish a directory of resources for its community, with real, vetted entries.</li>
</ul>
<p>In every case the asset comes from something you already know or do. That is why it is hard for others to copy and easy for them to cite. Our own recent guides follow this rule: each is built around a small study we ran on real pages, such as reading what ranking pages say or counting what our own links show, because a clear, sourced number is easier for an author to quote than an opinion.</p>

<h2>How Tools Earn Links Over Time</h2>
<p>A tool behaves differently from an article. It has a name, one job and a stable address, so it can be listed in directories, mentioned in roundups and recommended in forums without anyone summarising it. It also gets updated, which gives people a reason to come back. In our case, tool pages were picked up by directories that list new free tools, which is where most of our tool links came from. Tools in newer topics, such as the AI-search ones, may face fewer established alternatives, though we cannot say that is why they were listed. If you build a tool, give it a descriptive name, a short plain-language description, a clear page and an update date, so that any site listing it can do so in a sentence.</p>

<h2>A Short Pre-Build Checklist</h2>
<ol>
<li>Write the one-sentence description a curator would use. If you cannot, the idea is too vague.</li>
<li>Name three pages that already answer the question, and write down what yours does better.</li>
<li>Decide how someone will cite it: by URL, by a number or by an embed.</li>
<li>Decide who will link and why: a list of ten real sites that would find it useful.</li>
<li>Decide how you will measure it, using the baseline in the section below.</li>
</ol>
<p>If any answer is weak, improve the idea before you build. It is far cheaper to change a plan than a published asset.</p>

<h2>How to Build a Linkable Asset</h2>
<ol>
<li><strong>Start from a question you can answer better than anyone.</strong> Use your own data, product or experience.</li>
<li><strong>Check what exists.</strong> If the top results already answer it well, find an angle they miss.</li>
<li><strong>Build the simplest useful version.</strong> A small tool that works beats a large one that does not.</li>
<li><strong>Make it citable.</strong> Give it a clear title, a stated method and the date, so an author can describe it in a sentence.</li>
<li><strong>Give it its own stable URL</strong> and link to it from related pages on your site. See <a href="/blog/internal-link-building">internal link building</a>.</li>
<li><strong>Tell the right people.</strong> Suggest it to authors and curators where it genuinely helps, as in <a href="/blog/resource-page-link-building">resource page link building</a>, using the <a href="/tools/outreach-email-generator">outreach email generator</a> for the message.</li>
</ol>

<h2>Staying Within Google's Rules</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-link-spam-policy-examples.png" alt="Google Search Central link spam policy excerpt listing buying or selling links, excessive link exchanges, automated link creation, widgets with keyword-rich or hidden links distributed across sites, and widely distributed footer or template links, with the note that links are acceptable when qualified with nofollow or sponsored" width="${g[0]}" height="${g[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Linkable assets are one of the safest ways to attract links, because the links are chosen by the people who cite them. The risk comes from how you promote them. Google's spam policy lists keyword-rich, hidden or low-quality links embedded in widgets that are distributed across various sites, and widely distributed links in the footers or templates of various sites, as link spam. So if you offer an embed code for a tool or a chart, keep any attribution link visible, honest and not stuffed with keywords. Do not offer payment or a link swap for citations, since exchanging money or goods for links is on the same list. Mark any commercial placement as <code>sponsored</code> or <code>nofollow</code>.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-linkable-assets.png" alt="Infographic of where Contomatix's 24 external links point, with 6 to free tool pages and 0 to blog posts, and five checks before building a linkable asset" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>How to Measure a Linkable Asset</h2>
<p>Give each asset a baseline. Record the date it was published and, each month, the linking pages to it, the sites they sit on, the link attributes and the impressions and clicks of the asset in Search Console. Check whether the links came from your promotion or arrived unprompted, because the second kind tells you the asset is working on its own. Our guide to <a href="/blog/check-backlinks-of-website">checking the backlinks of a website</a> shows the free method, and the <a href="/tools/seo-report-generator">SEO report generator</a> turns the numbers into a monthly summary. If an asset earns no links after a few months of honest promotion, ask whether the idea, the build or the audience was wrong, and learn from it before you build the next one.</p>

<h2>Linkable Assets and Your Own Site Structure</h2>
<p>An asset only earns links if people can find it and if the page makes sense on its own. Link to it from the pages where readers would need it, put it in your navigation or a clear tools or resources section, and give it a descriptive title. Make sure the page works without the rest of your site: a visitor who lands on it from a link should understand what it does and what to do next. Keep the address stable, because every external link will point to it, and if you ever move it, use a redirect so the links keep working. Good structure also helps the asset support the rest of your site, since pages that link to it pass visitors and context along. Our work on <a href="/blog/internal-link-building">internal link building</a> explains how to connect assets to the pages you want to lift, and our look at <a href="/blog/what-is-link-building">what link building is</a> shows why that starts with the part you control.</p>

<h2>Common Linkable Asset Mistakes</h2>
<ul>
<li><strong>Building for links, not for readers.</strong> If it is not useful, it will not be cited.</li>
<li><strong>Skipping the check.</strong> Make sure nothing better already exists for the same question.</li>
<li><strong>Hiding the asset.</strong> A tool buried in a menu is hard to find or link to.</li>
<li><strong>Stuffing embed links.</strong> Keyword-rich hidden links in widgets are on Google's spam list.</li>
<li><strong>Chasing virality.</strong> Sensational angles spike and fade. Useful assets keep earning.</li>
<li><strong>Never promoting it.</strong> Even a good asset needs people to know it exists.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Our link counts come from the Search Console Links report for contomatix.com on 21 October 2026: ${G.total} external links from ${G.sites} sites, with the target pages listed in the report. The home page figure is the number of links the report assigns to it.</li>
<li>We have ${G.liveTools} free tools and ${G.posts331} posts live. A tool or post "has a link" when it appears as a target page in the report.</li>
<li>We did not classify each link as editorial or listing here. For that breakdown, see our guide to editorial backlinks.</li>
<li>We read ${D.ok} readable ranking pages for two related searches on the same day (Google US). Counts show a term appears, not how well it is explained.</li>
<li>Our site is young, so these numbers describe one site, not a benchmark.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A linkable asset is a page that gives people a reason to cite it: a tool, a number, a template or a clear reference.</li>
<li>On our site, ${G.tools} of ${G.total} external links go to free tool pages and ${G.posts} go to any of ${G.posts331} posts.</li>
<li>Build the simplest useful version, make it citable and give it a stable URL.</li>
<li>Promote it honestly and offer nothing in return for a link.</li>
<li>Keep embed and widget links visible and honest, since hidden keyword-rich widget links are on Google's spam list.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are linkable assets?</summary>
<p>They are pages built to be worth linking to, such as free tools, original data, templates and references that people cite because they help.</p>
</details>
<details>
<summary>What is link baiting?</summary>
<p>It is the older term for content created mainly to attract links, often with a sensational angle. Linkable assets aim for lasting usefulness instead.</p>
</details>
<details>
<summary>What is the best type of linkable asset?</summary>
<p>No single type is best. Free tools, original data and templates are the most common. In our own links, tool pages earned most links to inner pages.</p>
</details>
<details>
<summary>Do infographics still earn links?</summary>
<p>They can, when they present real data and sit beside an article that explains them. A lone image is hard to cite.</p>
</details>
<details>
<summary>How do I promote a linkable asset?</summary>
<p>Suggest it to authors and curators where it genuinely helps, with a short, specific email and one follow-up. Offer nothing in return for a link.</p>
</details>
<details>
<summary>Is link bait against Google's rules?</summary>
<p>Creating something worth linking to is fine. Google's spam policy targets buying or exchanging links, automated link creation and keyword-rich or hidden links in widgets.</p>
</details>
<details>
<summary>Can I offer an embed code for my tool or chart?</summary>
<p>Yes, but keep any attribution link visible and honest. Google lists keyword-rich or hidden links embedded in widgets distributed across sites as link spam.</p>
</details>
<details>
<summary>Why did our blog posts earn no links?</summary>
<p>General articles are harder to cite than a tool or a data point. On our site, none of 331 posts have an external link yet, while tools do.</p>
</details>
<details>
<summary>How do I know if a linkable asset worked?</summary>
<p>Track the linking pages, sites and attributes for the asset over time, and check whether links arrived unprompted or only after outreach.</p>
</details>
</div>
`;
const title = 'Linkable Assets: Why Our Tools Earned Links, Posts Did Not';
const excerpt = `Linkable assets and link baiting tested on our own data: ${G.tools} of ${G.total} external links go to free tools and none to ${G.posts331} posts. How to build one.`;
const out = content.replace('@@SERPH@@', hh('linkable-assets-serp.png')).replace('@@OURSH@@', hh('linkable-assets-ours.png')).replace('@@TYPESH@@', hh('linkable-assets-types.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-21', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
