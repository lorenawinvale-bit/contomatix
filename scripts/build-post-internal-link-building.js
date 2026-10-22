// Builds the "internal link building" post + assets. node scripts/build-post-internal-link-building.js [--write]
// Data: this site's own data/blog.json body links, computed at build time (first-hand).
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'internal-link-building';
const fp = path.join(root, 'data', 'blog.json');
const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
const b = all.filter(p => p.slug !== SLUG && p.slug !== 'local-seo-reporting'); // exclude this post so numbers do not shift when it is added
const slugs = new Set(b.map(p => p.slug)); const inb = {}; b.forEach(p => inb[p.slug] = new Set());
let total = 0, generic = 0, toTools = 0, toService = 0; const out = [];
b.forEach(p => {
  const links = [...p.content.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({ h: m[1].split('#')[0].split('?')[0].replace(/\/$/, '').replace('https://contomatix.com', ''), t: m[2].replace(/<[^>]+>/g, '').trim() }));
  const internal = links.filter(l => l.h.startsWith('/'));
  const toPosts = new Set();
  internal.forEach(l => {
    total++; if (/^(click here|here|read more|this|this article|this post|learn more|more)$/i.test(l.t)) generic++;
    if (l.h.startsWith('/blog/')) { const s = l.h.slice(6); if (slugs.has(s) && s !== p.slug) { inb[s].add(p.slug); toPosts.add(s); } }
    else if (l.h.startsWith('/tools/')) toTools++; else toService++;
  });
  out.push({ s: p.slug, posts: toPosts.size, internal: internal.length });
});
const n = b.length; const counts = Object.entries(inb).map(([s, v]) => [s, v.size]).sort((a, c) => c[1] - a[1]);
const vals = counts.map(x => x[1]).sort((a, c) => a - c);
const D = { n, total, zero: vals.filter(v => v === 0).length, one2: vals.filter(v => v >= 1 && v <= 2).length, three9: vals.filter(v => v >= 3 && v <= 9).length, ten: vals.filter(v => v >= 10).length,
  median: vals[Math.floor(n / 2)], top: counts[0][1], topShare: Math.round(counts[0][1] / n * 100), under3: out.filter(o => o.internal < 3).length, noPostLinks: out.filter(o => o.posts === 0).length,
  avg: (total / n).toFixed(1), generic, toTools, toService };
console.log(JSON.stringify(D));
const pc = (a, c) => Math.round(a / c * 100);

// ---------- assets
L.donut(SLUG, ['INTERNAL', 'LINK BUILDING'], [['Find Pages With', 'No Inbound Links'], 'Pick Hub Pages', ['Write Descriptive', 'Anchors'], 'Link From Body Text', 'Recheck After Publishing']);
L.cover(SLUG, { badge: 'OUR OWN SITE DATA', search: 'internal link building', card: `Link audit: ${D.n} posts`,
  lines: [`Posts audited: ${D.n}`, `No inbound body links: ${D.zero}`, `Median inbound links: ${D.median}`, `Posts with under 3 internal links: ${D.under3}`, `Links with generic anchors: ${D.generic}`],
  last: 'Fix the gaps, then link', big: `${D.zero} of ${D.n}`, k1: 'posts have no inbound', k2: 'links from other posts', title: 'Internal Link Building', sub: `What a ${D.n}-post audit of our own site shows` });
fs.writeFileSync(path.join(__dirname, 'infographic-internal-link-building.html'), L.infographicHtml({
  title: `Internal Link Building: Our ${D.n}-Post Audit`, sub: 'Links inside post body text, computed from our own content on 13 October 2026',
  leftTitle: 'Posts by inbound links from other posts', leftTag: `Number of the ${D.n} posts`, max: D.n,
  bars: [{ label: 'No inbound links', sub: 'nothing links to them', n: D.zero }, { label: '1 to 2 inbound links', sub: 'thin support', n: D.one2 }, { label: '3 to 9 inbound links', sub: 'reasonably supported', n: D.three9 }, { label: '10 or more', sub: 'heavily linked hubs', n: D.ten }],
  rightTitle: 'The internal link routine', rightTag: 'Run it after every post', items: [
    { t: 'List pages nothing links to', s: 'start with the zero-inbound set' }, { t: 'Pick a relevant source page', s: 'same topic, already indexed' },
    { t: 'Use descriptive anchor text', s: 'say what the page is about' }, { t: 'Link from body copy', s: 'where a reader would click' }],
  big: `${D.zero} of ${D.n}`, noteHtml: `posts have <em>no inbound link</em> from another post. The audit finds them. The routine fixes them.` }));
fs.writeFileSync(path.join(__dirname, 'table-internal-link-building-bands.html'), L.tableHtml({ title: `Inbound internal links per post, ${D.n} posts`, sub: 'Counted from links inside post body text, one count per linking post. Navigation, footer and index pages are excluded.',
  head: ['Inbound links from other posts', 'Posts'], lastBold: true,
  rows: [['None', D.zero], ['1 to 2', D.one2], ['3 to 9', D.three9], ['10 or more', D.ten], ['All posts', D.n]] }));
fs.writeFileSync(path.join(__dirname, 'table-internal-link-building-summary.html'), L.tableHtml({ title: 'What the body links look like', sub: `Computed from the ${D.n} posts on 13 October 2026.`,
  head: ['Measure', 'Value'], lastBold: false,
  rows: [['Internal links in post body text', D.total], ['Average per post', D.avg], ['Posts with fewer than 3 internal links', D.under3], ['Posts that link to no other post', D.noPostLinks], ['Links to a service or other page', D.toService], ['Links to a free tool', D.toTools], ['Links with a generic anchor (here, read more)', D.generic], ['Median inbound links per post', D.median], ['Most inbound links to one post', D.top]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>We audited the internal links across our own ${D.n} blog posts and found that ${D.zero} of them have no link pointing to them from any other post, while one post collects links from ${D.top}. That uneven spread is what <strong>internal link building</strong> is meant to fix: deliberately adding links between your own pages so that search engines and readers can find the pages that matter.</p>

<p>This guide shows how the audit works, what the numbers mean and the routine we now run after each post. It also links to our <a href="/tools/internal-link-checker">internal link checker</a> if you want to test a page of your own.</p>

<h2>What Internal Link Building Is</h2>
<p>Internal link building is the practice of linking from one page on your site to another, on purpose, with a clear reason. Google's documentation says it uses links to discover new pages and as a signal when judging relevance. Links in the body of a page also tell readers where to go next. A page with no links pointing to it can be hard for a crawler to find and gives a reader no route to it.</p>

<h2>How We Audited It</h2>
<p>We took the body text of every post on this site, ${D.n} in total, extracted each link and counted, for every post, how many other posts link to it. We counted links inside the article body only. Navigation menus, the footer and the blog index are excluded, because those are the same for every page and say nothing about relevance. Counts are one per linking post, so five links from the same article count once.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/internal-link-building-bands.png" alt="Table of inbound internal links per post across 309 posts: none, 1 to 2, 3 to 9, and 10 or more" width="1280" height="420" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>What the Numbers Show</h2>
<ul>
<li><strong>${D.zero} posts have no inbound link</strong> from another post, which is ${pc(D.zero, D.n)} percent of the site. They are still in the sitemap and the blog index, but no article points to them.</li>
<li><strong>The median post has ${D.median} inbound links.</strong> A typical post is supported, but only thinly.</li>
<li><strong>One post receives links from ${D.top} others,</strong> which is ${D.topShare} percent of all posts. It is a hub we link to again and again. That is not wrong, but it means the other posts are competing for the remainder.</li>
<li><strong>${D.under3} posts contain fewer than 3 internal links</strong> in their body, and ${D.noPostLinks} link to no other post at all.</li>
<li><strong>Anchors are descriptive.</strong> ${D.generic} of ${D.total} internal links use a generic anchor such as here or read more.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/proof/internal-link-building-summary.png" alt="Table of internal link measures for 309 posts: total body links, average per post, posts with under 3 internal links, links to tools and generic anchors" width="1280" height="620" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Why Pages With No Inbound Links Matter</h2>
<p>A page without an internal link can still be indexed if it is in your sitemap, so this is not a guarantee of exclusion. The cost is quieter. Crawlers have fewer paths to it, readers have no contextual route to it, and you give search engines no signal about how it relates to your other pages. For a site that publishes often, new posts tend to link back to older ones and rarely the other way round, which is how older pages end up unsupported.</p>

<h2>Step 1: Find the Pages Nothing Links To</h2>
<p>Build the list from your own content or a crawl. For each page, count the pages that link to it from their body text. Sort ascending and start at zero. A crawler will list this as pages with no or few inlinks. Exclude pages you do not want found, such as thank-you pages and filtered views.</p>

<h2>Step 2: Choose Relevant Source Pages</h2>
<p>For each unsupported page, find two or three existing pages on the same topic that are already indexed and read. Linking from a closely related page is better than linking from a high-traffic page on an unrelated subject. Our <a href="/blog/content-audit-seo">content audit guide</a> explains how to group pages by topic, which makes this step quick.</p>

<h2>Step 3: Write Descriptive Anchor Text</h2>
<p>Google's link best practices ask for anchor text that is descriptive and concise, saying what the destination is about. Use a short phrase that fits the sentence, such as the topic name, not here or this page. Vary the wording naturally and do not stuff the same exact phrase every time.</p>

<h2>Step 4: Link From Body Copy and Use Real Links</h2>
<p>Place the link where a reader would want to click, inside the paragraph that discusses the subject. Use a real anchor element with an href. Google says it can only reliably crawl links that are <code>a</code> elements with an <code>href</code> attribute, so a clickable element built with script alone may not be followed. Our <a href="/blog/is-sitemap-important-for-seo-2026">guide to sitemaps</a> covers what the sitemap does in addition.</p>

<h2>Step 5: Add the Link When You Publish</h2>
<p>The cheapest moment to build internal links is at publication. Before a post goes live, list the two or three older posts it should link to and the two or three older posts that should link to it, and add both. This is the routine that stops the zero-inbound set from growing.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-internal-link-building.png" alt="Infographic of our internal link audit: posts by inbound links from other posts, and a four-step routine to run after every post" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Common Internal Linking Mistakes</h2>
<ul>
<li><strong>Linking only to the hub.</strong> Every post points to one big guide, and the rest go unsupported.</li>
<li><strong>Generic anchors.</strong> Here and read more tell search engines nothing.</li>
<li><strong>Links hidden in navigation only.</strong> Menu links are the same everywhere and carry little context.</li>
<li><strong>Linking to unrelated pages.</strong> Relevance matters more than the count.</li>
<li><strong>Never going back.</strong> New posts link out, and old posts are never updated.</li>
</ul>

<h2>Anchor Text: Weak and Strong Examples</h2>
<p>Anchor text is the one part of an internal link you fully control. Compare the following pairs for a link to a guide on checking a sitemap.</p>
<ul>
<li><strong>Weak:</strong> "To learn more, click here." The anchor says nothing about the destination.</li>
<li><strong>Better:</strong> "Our guide to sitemaps explains what each tag does." The anchor names the topic and fits the sentence.</li>
<li><strong>Weak:</strong> "Read more about SEO." Too broad to describe anything.</li>
<li><strong>Better:</strong> "Check your robots.txt rules before you submit the sitemap." Specific and natural.</li>
</ul>
<p>Avoid repeating one exact-match phrase for every link to the same page. Natural variation, such as the full topic name in one place and a shorter form in another, reads better and carries the same meaning.</p>

<h2>How to Prioritise Which Pages to Fix First</h2>
<p>With ${D.zero} unsupported posts, you cannot fix everything at once. Score each page on three simple questions and work down the list.</p>
<ul>
<li><strong>Business value.</strong> Does the page lead to a service, a tool or a conversion? Fix those first.</li>
<li><strong>Existing visibility.</strong> Does it already earn impressions in Search Console? A page at position 11 to 20 with a link or two added is the cheapest improvement you can make.</li>
<li><strong>Topical fit.</strong> Is there an obvious related page to link from? If not, the page may be better merged or retired.</li>
</ul>

<h2>Hub Pages and Topic Clusters</h2>
<p>A hub page, or pillar, covers a broad topic and links to detailed pages on its sub-topics, and each of those links back to the hub. This is the structure behind the one post in our audit that receives links from ${D.top} others. A hub works when the detail pages also link to each other where it helps the reader. If every spoke only points at the hub, you get a star with no connections between the points, and the spokes remain thinly supported. Plan the cluster so that each page has at least one link in from a sibling and one link out to a sibling.</p>

<h2>Worked Example: Fixing One Unsupported Post</h2>
<p>Take a post with no inbound links on a narrow topic. First, list three posts that mention the same subject, which a site search or a keyword search of your content will find. Second, read each and choose the paragraph where the topic comes up naturally. Third, add one sentence with a descriptive link, rather than appending a "related posts" list at the end. Fourth, open the unsupported post and add two links out to related pages if it has none. Fifth, record the change and recount inbound links after the next publish. This takes about ten minutes per post, so a batch of ten is a morning's work.</p>

<h2>Internal Links Versus External Links</h2>
<p>Internal links connect your own pages and are fully in your control. External links, or backlinks, come from other sites and are earned. They serve different purposes, so do not treat one as a replacement for the other. Strong internal linking helps search engines and readers use the pages you already have, and it can make the value of the links you do earn flow to the pages that matter. Our <a href="/blog/how-many-backlinks-do-i-need">backlinks guide</a> covers the external side.</p>

<h2>A Quarterly Maintenance Checklist</h2>
<ul>
<li>Recount inbound links for every post and list those with none.</li>
<li>Check that links in important pages still point to live URLs, not redirects or removed pages.</li>
<li>Look for pages that link to the hub but not to each other.</li>
<li>Review the anchor text on your ten most important pages.</li>
<li>Add links from the newest posts to relevant older posts, and from older posts to the new ones.</li>
<li>Confirm that links are real anchor elements with an href, not script-driven buttons.</li>
</ul>

<h2>Click Depth and Why It Matters</h2>
<p>Click depth is the number of clicks it takes to reach a page from the homepage. A page one or two clicks deep is easy for a visitor and a crawler to reach. A page buried six clicks down, reachable only through paginated archives, is slow to be found and tends to be crawled less often. On a site with hundreds of posts, a flat structure helps: link the important pages from the homepage or a hub, and link new posts from a category or topic page as well as from the blog index. If your blog index is paginated, make sure older posts have a second route in through contextual links.</p>

<h2>How Many Links Is Too Many?</h2>
<p>Google does not set a fixed limit on internal links per page. The practical limit is the reader: a paragraph that is more link than text is hard to read, and a page with hundreds of links dilutes each one. As a working rule, add a link where it helps a reader take a useful next step, and stop there. In our audit the average post carries ${D.avg} internal links in its body, which for articles of this length is comfortable.</p>

<h2>Who Should Own Internal Linking?</h2>
<p>Internal links are easiest to maintain when someone owns them. On a small team, give the job to the person who publishes: the publishing checklist includes adding links in and out, and a monthly recount catches what slipped through. On larger sites, assign each topic cluster an editor who keeps its links healthy and signs off new pages that join it. Without an owner, new content links backwards and old content is never updated, which is exactly the pattern our audit found.</p>

<h2>Limits of This Audit</h2>
<ul>
<li>We counted links in post body text, not links produced by templates or the blog index.</li>
<li>It covers posts only. Service pages and tools have their own link patterns.</li>
<li>Inbound link count measures support, not quality, and a page with many links can still be a weak page.</li>
<li>The numbers are a snapshot on 13 October 2026 and change with every publish.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Audit for pages with no inbound body links first, then add relevant links from related pages.</li>
<li>Use descriptive anchors and real href links in the body copy.</li>
<li>Do not funnel every link to one hub page.</li>
<li>Add inbound and outbound links at publication, so the gap does not return.</li>
<li>Recount after each batch of posts.</li>
</ul>
<p>Need a link audit for your own site? <a href="/contact">Get in touch</a> and we will map your pages and gaps.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is internal link building?</summary>
<p>It is the practice of adding links between pages on your own site, on purpose, so that crawlers and readers can find your important pages and understand how they relate.</p>
</details>
<details>
<summary>How many internal links should a page have?</summary>
<p>There is no fixed number. Link where it helps the reader. On our site, ${D.under3} of ${D.n} posts had fewer than 3 internal links in the body, which we treat as a prompt to review them.</p>
</details>
<details>
<summary>What is an orphan page?</summary>
<p>A page that no other page on the site links to. It may still be in the sitemap, but crawlers and readers have no path to it from your content.</p>
</details>
<details>
<summary>Does internal linking help SEO?</summary>
<p>Google says it uses links to discover pages and to understand relevance, so clear internal links help it find and interpret your content. They are one signal among many.</p>
</details>
<details>
<summary>What is good anchor text for an internal link?</summary>
<p>A short, descriptive phrase that says what the destination page is about, written to fit the sentence. Avoid here, click here and read more.</p>
</details>
<details>
<summary>Should every post link to the same pillar page?</summary>
<p>Linking to a pillar page is useful, but if every post links only there, the rest of your content gets little support. Add links between related posts as well.</p>
</details>
<details>
<summary>Do nofollow internal links matter?</summary>
<p>Internal links are normally left followed. Marking your own pages nofollow gives a signal that you do not want them treated as links, which is rarely what you intend.</p>
</details>
<details>
<summary>How do I find pages with no internal links?</summary>
<p>Crawl the site, or extract links from your content, and count the inbound links to each page. Sort the list from zero upward.</p>
</details>
<details>
<summary>How often should I audit internal links?</summary>
<p>Run a quick count after each batch of new posts, and a full review each quarter on a site that publishes often.</p>
</details>
</div>
`;
const title = 'Internal Link Building: What Our 309-Post Audit Revealed';
const excerpt = `Internal link building, explained with a real audit of ${D.n} posts: ${D.zero} have no inbound links. Find the gaps and fix them with a simple routine.`;
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-10-13', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (D.n !== 309) throw new Error('post count changed: ' + D.n + ' (title/alt text mention 309)');
if (process.argv.includes('--write')) {
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
