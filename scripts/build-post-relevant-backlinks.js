// Builds the "relevant backlinks" post + assets. node scripts/build-post-relevant-backlinks.js [--write]
// Data: our own Search Console Links report (15 Oct 2026) + GoodFirms profile fetched 15 Oct 2026; relevance scores are our own assessment.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'relevant-backlinks';
const S = [ // site, links, topic fit, audience fit, link placement, attribute (verified only where we opened the page)
  { site: 'goodfirms.co', links: 7, topic: 'Close', audience: 'Agency buyers', place: 'Profile page button', attr: 'nofollow (both links, checked)', score: 3 },
  { site: 'designrush.com', links: 3, topic: 'Close', audience: 'Agency buyers', place: 'Directory profile', attr: 'not checked (page blocked our fetch)', score: 3 },
  { site: 'saasrankly.com', links: 2, topic: 'Very close', audience: 'SaaS marketers', place: 'Our own sister site', attr: 'not checked', score: 3 },
  { site: 'scamadviser.com', links: 1, topic: 'Different', audience: 'General visitors', place: 'Site trust report', attr: 'not checked (page blocked our fetch)', score: 1 }];
const total = S.reduce((s, x) => s + x.links, 0); const related = S.filter(x => x.topic !== 'Different').reduce((s, x) => s + x.links, 0);
if (total !== 13 || related !== 12) throw new Error('data changed');
console.log(JSON.stringify({ total, related, sites: S.length }));

// ---------- assets
L.donut(SLUG, ['RELEVANT', 'BACKLINKS'], [['Match the', 'Topic'], 'Match the Audience', ['Sit in Real', 'Context'], 'Check the Source Page', 'Score Before You Ask']);
L.cover(SLUG, { badge: 'OUR OWN LINKS REPORT', search: 'relevant backlinks', card: 'Our 13 external links, scored',
  lines: [`External links: ${total}`, `From topic-related sites: ${related}`, 'From unrelated sites: 1', 'Followed on the top site: 0 of 2', 'Anchors that are generic: 2 of 4'],
  last: 'Relevance beats raw count', big: `${related} of ${total}`, k1: 'links come from', k2: 'topic-related sites', title: 'Relevant Backlinks', sub: 'How to judge relevance, scored on our own links' });
fs.writeFileSync(path.join(__dirname, 'infographic-relevant-backlinks.html'), L.infographicHtml({
  title: 'Relevant Backlinks: Our 13 Links Scored', sub: 'Search Console Links report, read 15 October 2026',
  leftTitle: 'Links by topic fit of the linking site', leftTag: `Number of the ${total} external links`, max: total,
  bars: [{ label: 'Very close topic', sub: 'SaaS and SEO sister site', n: 2 }, { label: 'Close topic', sub: 'agency directories', n: 10 }, { label: 'Different topic', sub: 'site trust checker', n: 1 }, { label: 'Followed on top site', sub: 'of 2 links we opened', n: 0 }],
  rightTitle: 'Five relevance checks', rightTag: 'Before you ask for a link', items: [
    { t: 'Same topic as your page', s: 'not just the same industry' }, { t: 'Same audience', s: 'would their readers care?' },
    { t: 'Link sits in real content', s: 'not a footer or sidebar' }, { t: 'The page is indexed', s: 'and gets real readers' }],
  big: `${related} of ${total}`, noteHtml: `links come from <em>topic-related sites</em>, but most are directory profiles, so relevance is only half the story.` }));
fs.writeFileSync(path.join(__dirname, 'table-relevant-backlinks-scorecard.html'), L.tableHtml({ title: 'Relevance scorecard: our four linking sites', sub: 'Links from the Search Console Links report, 15 October 2026. Topic fit and audience fit are our own assessment; attributes only where we opened the page.',
  head: ['Linking site', 'Links', 'Topic fit', 'Placement', 'Attribute'], lastBold: false,
  rows: S.map(x => [x.site, x.links, x.topic, x.place, x.attr]) }));
fs.writeFileSync(path.join(__dirname, 'quote-relevant-backlinks.html'), quote({ source: 'Google Search Central · Spam policies, link spam', title: 'What Google calls link spam',
  paras: ['Link spam is the practice of creating links to or from a site primarily for the purpose of manipulating search rankings.',
    'Examples include buying or selling links for ranking purposes, excessive link exchanges, and low-quality directory or bookmark site links.'] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Relevant backlinks</strong> are links from pages and sites that share a topic and an audience with the page they point to. We scored our own links against that definition. Of the ${total} external links in our Search Console Links report, ${related} come from sites close to our subject, and 1 comes from a site on a different topic. That sounds good until you look closer: most of those are directory profiles, and the largest source marks both of its links nofollow. Relevance is a real signal, but it is only one of several you need to read together.</p>

<p>This guide explains what makes a backlink relevant, how to score a link before you ask for it, how relevance differs from authority, and how to get backlinks that are relevant on purpose. It uses the same scorecard we applied to our own links. For how many links you need in total, see <a href="/blog/how-many-backlinks-do-i-need">how many backlinks you need</a>.</p>

<h2>What Makes a Backlink Relevant</h2>
<p>A relevant backlink connects two pages a reader would plausibly move between. A guide on technical SEO linked from an article about site speed is relevant. The same guide linked from a recipe blog is not, however strong that blog is. Five things decide it.</p>
<ul>
<li><strong>Topic.</strong> The linking page and your page cover the same or adjacent subject, not just the same broad industry.</li>
<li><strong>Audience.</strong> The people reading the linking page are the people who would want your page.</li>
<li><strong>Context.</strong> The link sits inside content that explains why it is there, not in a footer, a sidebar or a list of unrelated links.</li>
<li><strong>Source quality.</strong> The page is indexed, has real readers and does not exist to sell links.</li>
<li><strong>Anchor.</strong> The linking text describes the destination in plain words.</li>
</ul>

<h2>Relevant Backlinks Versus High Quality Backlinks</h2>
<p>The two ideas overlap, but they are not the same. A high authority site can link to you from a page about something else, which is high authority and low relevance. A small niche blog can link from an on-topic article, which is high relevance and modest authority. For most sites, the second is the better bet, because it sends readers who care and gives search engines a clear topical signal.</p>
<p>Good backlinks, the top backlinks you can earn, are usually both: an on-topic page on a site with real readers. When you must choose, relevance and real readership are easier to defend than a metric from a tool.</p>

<h2>Our Own Links, Scored</h2>
<p>We applied the checks above to the four sites in our Links report.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/relevant-backlinks-scorecard.png" alt="Relevance scorecard for our four linking sites: goodfirms.co 7 links close topic nofollow, designrush.com 3 links close topic, saasrankly.com 2 links very close topic, scamadviser.com 1 link different topic" width="1280" height="365" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>${related} of ${total} links are from topic-related sites.</strong> Two agency directories and a SaaS and SEO sister site fit our subject.</li>
<li><strong>Relevance is not editorial.</strong> Directory profiles are listings we created, not links someone chose to give. The one we opened marks both links nofollow.</li>
<li><strong>One link is off-topic.</strong> A site trust report links to us, which is accurate but has little to do with our subject matter.</li>
<li><strong>Anchors are generic.</strong> "Visit website" and "visit" appear in the top linking text, so the anchors carry no descriptive signal.</li>
</ul>
<p>The honest reading is that our profile is relevant but thin and mostly listing-based. That is a useful result, because it says exactly what to build next: editorial links from on-topic articles that point at our guides, not more profiles.</p>

<h2>What Google Says About Links Made for Ranking</h2>
<p>Relevance also helps you stay on the right side of Google's rules. The spam policies define link spam as links created primarily to manipulate rankings.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/relevant-backlinks-google-quote.png" alt="Google spam policies excerpt: link spam is creating links to or from a site primarily to manipulate search rankings, including buying or selling links, excessive link exchanges and low-quality directory links" width="880" height="201" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>A link that exists because it helps a reader is the opposite of that. When you ask yourself whether a link would exist if search engines did not, relevance is usually the answer.</p>

<h2>How to Get Backlinks That Are Relevant</h2>
<p>To get backlinks that match your topic, start where relevance already exists.</p>
<ol>
<li><strong>Unlinked mentions.</strong> Sites that already name you are on-topic by definition. Ask them to add a link.</li>
<li><strong>Resource pages.</strong> Topic-specific lists of useful pages are built to link out. See our guide to <a href="/blog/find-broken-backlinks">fixing and reclaiming links</a> for the first steps.</li>
<li><strong>Guest articles on niche sites.</strong> Original content for a publication your customers read. Our <a href="/services/guest-posting">guest posting service</a> works this way.</li>
<li><strong>Tools and data.</strong> A free tool or a small original study gives other sites a reason to cite you.</li>
<li><strong>Partners and suppliers.</strong> Businesses you work with often have a page where a link is natural.</li>
</ol>

<h2>A Simple Relevance Scorecard</h2>
<p>Before you invest time in a target, give it a score from 0 to 2 on each of the five checks. A page that scores 8 or more is worth asking. A page that scores 4 or less is probably not worth your time, whatever its metrics say.</p>
<ul>
<li><strong>Topic:</strong> 2 = same subject, 1 = adjacent, 0 = unrelated.</li>
<li><strong>Audience:</strong> 2 = your customers, 1 = partly, 0 = no.</li>
<li><strong>Context:</strong> 2 = inside article text, 1 = list or resource page, 0 = footer or sidebar.</li>
<li><strong>Source:</strong> 2 = indexed with real readers, 1 = indexed but thin, 0 = unindexed or link-selling.</li>
<li><strong>Anchor:</strong> 2 = descriptive, 1 = brand or URL, 0 = generic or forced.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-relevant-backlinks.png" alt="Infographic: our 13 external links scored by topic fit and the five relevance checks to use before asking for a link" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Relevance and Attributes Work Together</h2>
<p>A relevant link can still be nofollow, sponsored or ugc, and Google treats those as hints. Do not discard a nofollow link from a relevant site. It sends visitors and builds recognition. Do worry when a paid placement is not marked as sponsored, which is the case Google's guidance is aimed at. Our guide on <a href="/blog/do-nofollow-links-help-seo-2026">nofollow links</a> goes through when each attribute is used.</p>

<h2>An Illustrated Scoring Example</h2>
<p>Imagine you publish a guide to robots.txt rules and you are choosing between two pages that might link to it. The first is an article on how crawlers read site files, published on a site that writes about technical SEO. It scores 2 on topic, 2 on audience, 2 on context, 2 on source and 1 on anchor, a total of 9. The second is a "useful links" page on a general business blog, with eighty links under unrelated headings. It scores 1 on topic, 0 on audience, 1 on context, 1 on source and 0 on anchor, a total of 3. The second link would be easy to get and almost worthless. The first is worth a personalised email and a better pitch. This example is an illustration, not data from a real campaign, but the pattern is the one we see in practice.</p>

<h2>Relevance by Link Type</h2>
<ul>
<li><strong>Guest articles.</strong> Relevant when the publication serves your customers and the article answers a question its readers ask. The link should support a claim, not advertise.</li>
<li><strong>Resource pages.</strong> Relevant when the page collects tools or guides on your exact topic. Generic "best sites" lists are weaker.</li>
<li><strong>Directory profiles.</strong> Relevant when the directory is specific to your industry. Treat them as listings and keep the count in proportion.</li>
<li><strong>Forum and Q&A answers.</strong> Relevant when the answer is genuinely helpful. These links are typically marked nofollow or ugc, and they work as visibility, not as a ranking lever.</li>
<li><strong>Press and digital PR.</strong> Relevant when a journalist who covers your subject cites your data or tool.</li>
</ul>

<h2>Anchor Text for Relevant Links</h2>
<p>When a link is genuinely relevant, the anchor tends to be natural. A writer links the words that describe the destination: "this guide to robots.txt rules" or "free sitemap validator". You will not usually need to ask for an exact phrase, and you should avoid it. If you do suggest wording to a publisher, offer a short descriptive phrase and let them adapt it. In our own report, the top linking text is brand and button text. The next step is earning a few descriptive anchors from articles, which is a sign that someone wrote a sentence around the link instead of copying a profile field.</p>

<h2>Where a Relevant Link Should Point</h2>
<p>Relevance applies to the destination as well as the source. Our external links point at the homepage (11) and one tool page (2). That means the guides we want to rank have no external links at all. Where you control the choice, send a relevant link to the specific page that matches the linking article, because that is the page whose topic the link supports. Then use internal links to pass visitors on. Our Links report counts 4,866 internal links, so the structure to share that value is already in place.</p>

<h2>Relevance Across Topic Clusters</h2>
<p>Few sites have a single topic. Most have clusters: a group of pages around a theme, such as link building, technical SEO or tools. Think of relevance per cluster. A link from a technical SEO article is relevant to every page in your technical cluster and mildly relevant to your link-building pages. When you plan outreach, pick the cluster first, then the target, then the page you want linked. This keeps the profile coherent, with each topic supported by links that fit it.</p>

<h2>Relevance for Readers and for Search Engines</h2>
<p>It helps to think of relevance as two questions that usually have the same answer. For a reader: "Would I click this link and be glad I did?" For a search engine: "Does the linking page and its surroundings support what the destination is about?" When both answers are yes, the link is doing its job. When the reader answer is no, the link is probably there for the wrong reason, and that is exactly the kind of link that spam policies are written about. Writing for the reader first is the simplest way to build a profile you never have to defend.</p>

<h2>Keeping Relevance Over Time</h2>
<p>Relevance can drift. A site changes its focus, a page is rewritten or a directory fills with unrelated listings. Review your top linking sites twice a year. If a once-relevant source has changed, do not panic. Move your effort to building newer on-topic links, and keep a note of what you have so you can see the trend. A profile that gets steadily more relevant over time is a healthy one.</p>

<h2>Common Mistakes</h2>
<ul>
<li><strong>Chasing metrics over topic.</strong> A high score on an unrelated site adds little.</li>
<li><strong>Counting directories as editorial links.</strong> They are fine as listings but should not be most of your profile.</li>
<li><strong>Forcing exact-match anchors.</strong> Natural, descriptive anchors are enough.</li>
<li><strong>Ignoring the linking page.</strong> The site may be relevant while the specific page is not.</li>
<li><strong>Leaving every link on the homepage.</strong> Point relevant links at the page that matches the topic.</li>
</ul>

<h2>Limits of This Check</h2>
<ul>
<li>Topic and audience fit are our judgement, not a metric from a tool.</li>
<li>We opened one linking page in full. Two sites blocked our fetch and one is our own, so their attributes are not stated.</li>
<li>Search Console's Links report is a sample of links, so ${total} is a minimum.</li>
<li>One site on one day. Your profile will differ, and so will the mix of directory and editorial links.</li><li>Scores are a judgement aid for choosing where to spend time, not a prediction of ranking.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A relevant backlink shares topic, audience and context with your page.</li>
<li>Relevance and authority are different, and relevance is easier to judge by hand.</li>
<li>Score targets on five checks before you ask for a link.</li>
<li>Directory profiles are relevant but not editorial, so do not let them be the whole profile.</li>
<li>Build links from on-topic articles that point at the page they match.</li>
</ul>
<p>Want a relevance review of your backlink profile? <a href="/contact">Get in touch</a> and we will score it and plan next steps.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are relevant backlinks?</summary>
<p>Links from pages and sites that share a topic and an audience with the page they point to, and that sit inside content where a reader would expect them.</p>
</details>
<details>
<summary>Are relevant backlinks better than high authority backlinks?</summary>
<p>Often, yes, but you want both. A relevant link from a small niche site usually serves readers better than an unrelated link from a large one.</p>
</details>
<details>
<summary>What are good backlinks for SEO?</summary>
<p>Links that come from on-topic pages with real readers, placed in editorial content, with a descriptive anchor. They are links that would exist even if search engines did not.</p>
</details>
<details>
<summary>How do I get backlinks that are relevant?</summary>
<p>Start with unlinked mentions, topic resource pages, guest articles on niche sites, useful tools or data, and partners that already work with you.</p>
</details>
<details>
<summary>Do nofollow backlinks count if they are relevant?</summary>
<p>Google treats nofollow as a hint, and such links still send visitors and build recognition. A relevant nofollow link is worth having.</p>
</details>
<details>
<summary>Is a directory listing a relevant backlink?</summary>
<p>It can be topically relevant, but it is a listing rather than an editorial endorsement. Treat it as a small part of a profile, not as the strategy.</p>
</details>
<details>
<summary>How many relevant backlinks do I need?</summary>
<p>There is no fixed number. Compare with the top pages for your target term and aim to match their mix of relevant referring sites over time.</p>
</details>
<details>
<summary>Can irrelevant backlinks hurt my site?</summary>
<p>A few unrelated links rarely do. Google says it works to ignore spam links, and systematic link schemes are what its spam policies target.</p>
</details>
<details>
<summary>How can I check whether a backlink is relevant?</summary>
<p>Open the linking page and check topic, audience, context, indexing and anchor. Score each from 0 to 2 and ask only for links that score highly.</p>
</details>
</div>
`;
const title = 'Relevant Backlinks: How to Score Them, With Our Own Data';
const excerpt = `Relevant backlinks explained with our own Search Console data: ${related} of ${total} links are on-topic, but most are listings. Score yours in five checks.`;
const post = { slug: SLUG, title, category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-15', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
