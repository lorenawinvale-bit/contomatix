// Builds the "how many backlinks do i need" post + assets. node scripts/build-post-how-many-backlinks.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'how-many-backlinks-do-i-need';
// Search Console Links report for sc-domain:contomatix.com, read 12 Oct 2026 via the user's Chrome. Performance: Pages.csv 3 months to 1 Oct 2026.
const G = { external: 13, sites: 4, topSite: 7, pages: 2, homeLinks: 11, internal: 4866, impressions: 68254, clicks: 50 };
console.log(JSON.stringify(G));

// ---------- assets
L.donut(SLUG, ['HOW MANY', 'BACKLINKS'], [['Know Google', 'Gives No Number'], 'Count Domains, Not Links', 'Benchmark the Top Ten', ['Close the Gap', 'Honestly'], 'Avoid Link Schemes']);
L.cover(SLUG, { badge: 'REAL LINKS REPORT', search: 'how many backlinks do i need', card: 'Our Search Console Links report',
  lines: [`External links: ${G.external}`, `Linking sites: ${G.sites}`, `Links from one site: ${G.topSite}`, `Pages with an external link: ${G.pages}`, `Impressions in 3 months: 68,254`],
  last: 'No number, only a benchmark', big: `${G.external} links`, k1: `from ${G.sites} sites, and`, k2: '68,254 impressions', title: 'How Many Backlinks Do I Need?', sub: 'What a real site’s link report shows' });
fs.writeFileSync(path.join(__dirname, 'infographic-how-many-backlinks.html'), L.infographicHtml({
  title: 'How Many Backlinks? Our Own Report', sub: 'Google Search Console Links report for contomatix.com, 12 October 2026',
  leftTitle: 'Our external links', leftTag: 'As listed in the Links report (a sample)', max: G.external,
  bars: [{ label: 'External links listed', sub: 'the headline count', n: G.external }, { label: 'From the biggest site', sub: 'one directory profile', n: G.topSite }, { label: 'Distinct linking sites', sub: 'the referring domains', n: G.sites }, { label: 'Pages with an external link', sub: `of ${337} live URLs`, n: G.pages }],
  rightTitle: 'Size your own gap', rightTag: 'A benchmark, not a number', items: [
    { t: 'Count referring domains', s: 'not total links' }, { t: 'List the top ten for your keyword', s: 'and their referring domains' },
    { t: 'Look at the weakest page that ranks', s: 'that is your realistic target' }, { t: 'Earn, do not buy', s: 'paid links need sponsored or nofollow' }],
  big: `${G.external} links`, noteHtml: `from <em>${G.sites} sites</em> sat behind a site that still earned 68,254 impressions in three months. There is no magic number to hit.` }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>Our own Search Console shows ${G.external} external links, from ${G.sites} different sites, pointing at a website with 337 live URLs. Only ${G.pages} of those URLs have a single external link. Yet the same site earned ${f(G.impressions)} impressions in three months. That is the honest starting point for the question <strong>how many backlinks do I need</strong>: nobody can give you a number, and the useful answer is a method for working out your own gap.</p>

<p>This guide shows what a real, small site's link report looks like, what Google says on the subject, how to count links the right way and how to benchmark yourself against the pages you want to beat. For the data side of backlink research, see our <a href="/blog/backlinks-report">backlinks report</a> guide.</p>

<h2>The Short Answer</h2>
<p>There is no fixed number of backlinks that a site or page needs. What you need is enough links, from enough different and relevant sites, to compete with the specific pages you are trying to outrank. That target moves with each keyword. For a search where the top results have a handful of referring sites, a handful may be enough. For a crowded commercial search, it may be far more.</p>

<h2>What Google Says About Link Numbers</h2>
<p>Google does not publish a target. Its link best-practice page says there is no magical ideal number of links a given page should contain, but that statement is about links on a page, not links to it, so do not read it as a backlink figure.</p>
<p>The most direct official comment we found is from a Google Search Central office hours session in November 2022. A Google representative said backlinks as a signal have a lot less significant impact than when Google Search first started, that Google has hundreds of ranking signals, and that full link building campaigns are essentially link spam under its spam policy. In short: links still count, they are one input among many, and manufacturing them is a risk.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-office-hours-backlinks-answer.jpg" alt="Google Search Central office hours transcript from November 2022 answering why Google keeps using backlinks, saying backlinks as a signal have a lot less impact than when Google started and that link building campaigns are essentially link spam" width="1176" height="422" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>That matches how Google describes its own systems: you cannot hit a threshold, because there is no threshold to hit.</p>

<h2>Our Own Numbers</h2>
<p>We opened the Links report for our domain property on 12 October 2026. Here is what it listed under external links.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/gsc-links-report-contomatix.png" alt="Google Search Console Links report for contomatix.com showing 13 external links, top linked pages with the homepage at 11 and the llms.txt generator at 2, and four top linking sites" width="460" height="595" style="max-width:460px;width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>${G.external} external links in total,</strong> of which ${G.homeLinks} point at the homepage and 2 at one tool page.</li>
<li><strong>${G.sites} linking sites.</strong> One of them accounts for ${G.topSite} of the ${G.external} links, which is a good illustration of why link count and referring domain count are different things.</li>
<li><strong>${G.pages} pages out of 337 live URLs</strong> have any external link listed. None of our 305 posts appears in that list.</li>
<li><strong>${f(G.internal)} internal links,</strong> far more than our external ones, which says something about where a small site's link equity actually sits.</li>
</ul>
<p>Over the same three months, the whole site recorded ${f(G.impressions)} impressions and ${G.clicks} clicks in Search Console. That does not prove that links do not matter. It shows that a site can be shown a great deal without much external linking, and also that being shown is not the same as being clicked. In our own content audit, about 43 percent of post impressions sat beyond position 30, where links may well be part of the story.</p>
<p>One caution before you copy any of this: Google says the Links report is a sample and not a comprehensive list, and that it does not show whether links are nofollow. Treat our ${G.external} as "at least this many that Google lists".</p>

<h2>Backlinks vs Referring Domains</h2>
<p>A backlink is one link from one page. A referring domain is a distinct site that links to you at least once. Our report is the example: ${G.external} links, ${G.sites} sites. If one directory profile links to you from seven places, you have seven backlinks and one referring domain, and the second number is the one that tells you how widely you are cited.</p>
<p>Because of that, count and compare referring domains first, and use total links only as a secondary measure. A hundred links from one site is a weaker position than ten links from ten sites.</p>

<h2>How to Work Out How Many You Need</h2>
<ol>
<li><strong>Pick the page and keyword.</strong> You need a gap for a specific page, not for the whole site.</li>
<li><strong>List the top ten results.</strong> Use any backlink tool to read the number of referring domains pointing at each ranking page, not at the whole site.</li>
<li><strong>Find the weakest page that ranks.</strong> That is your realistic floor. If a page with eight referring domains ranks fifth, eight is a sensible first target.</li>
<li><strong>Compare content first.</strong> A page that ranks with few links is usually one that answers the search very well. You may be able to match it without links.</li>
<li><strong>Check relevance.</strong> A few links from sites in your field are worth more than many from unrelated places.</li>
<li><strong>Set a target in domains and revisit it.</strong> Review it as the results move, rather than treating it as fixed.</li>
</ol>
<p>Our guide on how to <a href="/blog/how-to-find-competitor-backlinks-2026">find competitor backlinks</a> walks through the tool side of steps two and three.</p>

<h2>Relevant, High-Authority and Dofollow Backlinks</h2>
<p>People often ask for relevant backlinks, high-authority backlinks and dofollow backlinks as if they were separate shopping lists. In practice they are overlapping ways of asking whether a link is worth having.</p>
<ul>
<li><strong>Relevant:</strong> the linking page is about something related to yours, and a reader could plausibly follow the link.</li>
<li><strong>Authority:</strong> the linking site is well established and trusted in its field. Tools give each site a score, but those scores are the tool's estimate, not Google's.</li>
<li><strong>Dofollow:</strong> a link without a nofollow, sponsored or ugc value in its rel attribute. Google treats the three qualifying values as signals about how to treat a link. Our post on <a href="/blog/do-nofollow-links-help-seo-2026">whether nofollow links help SEO</a> covers it.</li>
</ul>

<h2>What to Do If You Have Few Backlinks</h2>
<ul>
<li><strong>Make the page worth citing.</strong> Original data, a free tool, a clear definition or a useful template give others a reason to link.</li>
<li><strong>Claim the obvious listings.</strong> Relevant directories and profiles are legitimate, as the four sites in our own report show, though they are a small part of a profile.</li>
<li><strong>Link internally with care.</strong> A site can pass attention between its own pages, which is where most of our own links are.</li>
<li><strong>Pitch real stories.</strong> Digital PR that gives a journalist something new can earn links that no tactic can imitate. Digital PR services exist for exactly this.</li>
</ul>

<h2>Mistakes People Make When Counting Backlinks</h2>
<ul>
<li><strong>Comparing whole sites instead of pages.</strong> A site-wide link total says little about the single page you want to rank.</li>
<li><strong>Counting total links.</strong> Ten links from one site are one vote of confidence, not ten.</li>
<li><strong>Trusting one tool's authority score.</strong> Each tool estimates its own score from its own crawl. Use them to compare, not to judge.</li>
<li><strong>Ignoring internal links.</strong> For a small site most links are internal, and where they point decides which pages get attention.</li>
<li><strong>Forgetting that links are not the only lever.</strong> A weak page with many links can still lose to a strong page with few.</li>
</ul>

<h2>A 30-Day Plan for a Site With Few Links</h2>
<ol>
<li><strong>Week 1: baseline.</strong> Export your external links and referring domains and write down the number for your priority pages.</li>
<li><strong>Week 2: benchmark.</strong> For three target keywords, record the referring domains of each top-ten page and note the weakest.</li>
<li><strong>Week 3: strengthen the page.</strong> Improve the content and add internal links from your strongest pages before you chase anything external.</li>
<li><strong>Week 4: earn the first links.</strong> Publish one genuinely citable asset, such as data, a template or a tool, and share it with the people who write about the topic.</li>
</ol>
<p>Then repeat the baseline and look for movement in referring domains, not total links.</p>

<h2>The Risk of Chasing a Number</h2>
<p>Once you set a number, the temptation is to buy it. Google's spam policies list buying or selling links for ranking, automated link creation and paid guest posts that pass ranking credit as link spam. Paid placements are acceptable when the links are marked sponsored or nofollow. Read the full list in Google's <a href="https://developers.google.com/search/docs/essentials/spam-policies" target="_blank" rel="nofollow noopener">spam policies</a>, and the <a href="https://developers.google.com/search/help/office-hours/2022/november" target="_blank" rel="nofollow noopener">office hours transcript</a> for the context of the comment above.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-how-many-backlinks-do-i-need.png" alt="Infographic of Contomatix's Search Console link report: 13 external links, 7 from the largest site, 4 linking sites and 2 pages with an external link, with four steps to size your own backlink gap" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Limits of This Example</h2>
<ul>
<li>It is one small, young site, and the Links report is a sample, so the numbers are indicative only.</li>
<li>Impressions and clicks come from three months of Search Console data and say nothing about the cause of any ranking.</li>
<li>We did not compare against competitors' link counts, because tool figures differ and are estimates.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>There is no official number of backlinks a site needs, and Google has said links matter less than they once did.</li>
<li>Count referring domains, not total links. Our ${G.external} links came from ${G.sites} sites.</li>
<li>Benchmark against the weakest page that ranks for your keyword, and compare content before links.</li>
<li>Relevance beats volume, and earned links beat anything you can buy.</li>
<li>Paid links need sponsored or nofollow marking, and link building campaigns can fall under link spam.</li>
</ul>
<p>If you want help sizing a link gap and earning links you can stand behind, Contomatix can review it with you. <a href="/contact">Get in touch</a> and we will take a look.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>How many backlinks do I need to rank?</summary>
<p>There is no fixed number. Compare the referring domains of the pages that rank for your keyword and use the weakest ranking page as your first target, while making sure your content answers the search at least as well.</p>
</details>
<details>
<summary>Does Google say how many backlinks a site needs?</summary>
<p>No. Google has not published a target. A Google representative said in November 2022 that backlinks have a lot less impact than when Google started and that there are hundreds of ranking signals.</p>
</details>
<details>
<summary>What is the difference between backlinks and referring domains?</summary>
<p>A backlink is one link from one page. A referring domain is a distinct site linking to you. A site that links to you from ten pages counts as ten backlinks and one referring domain.</p>
</details>
<details>
<summary>Is it better to have many backlinks or a few good ones?</summary>
<p>A few relevant links from different, trusted sites usually say more than many from one source. Count referring domains and judge relevance before volume.</p>
</details>
<details>
<summary>Can I rank with no backlinks?</summary>
<p>Pages can be shown and can rank with few or no external links, especially for less competitive searches. Our own site earned tens of thousands of impressions with a small number of links, though clicks stayed low.</p>
</details>
<details>
<summary>Are dofollow backlinks better than nofollow?</summary>
<p>Links without a rel qualifier are the ones you expect search engines to follow. Google also uses nofollow, sponsored and ugc as signals, and it expects paid links to be marked. Judge a link on relevance and source, not only on the attribute.</p>
</details>
<details>
<summary>How do I check how many backlinks I have?</summary>
<p>Use the Links report in Search Console for a free sample, and a backlink tool for a fuller estimate. Numbers differ between tools, so compare like with like.</p>
</details>
<details>
<summary>Is buying backlinks safe?</summary>
<p>Google's spam policies treat buying or selling links that pass ranking credit as link spam unless the links are marked sponsored or nofollow. Earned links carry less risk.</p>
</details>
<details>
<summary>How long does it take for backlinks to help?</summary>
<p>Google gives no timeframe. Links need to be found and processed, and the effect depends on the competition, so measure changes in referring domains and in rankings over weeks, not days.</p>
</details>
</div>
`.replace(/\$\{f\(([^)]+)\)\}/g, (m, a) => m);
function f(n) { return Number(n).toLocaleString('en-US'); }
const title = 'How Many Backlinks Do I Need? A Verified, Data-Backed Answer';
const excerpt = 'How many backlinks do I need? No official number exists. A real Search Console link report shows how to count referring domains and benchmark your gap.';
const post = { slug: SLUG, title, category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-12', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
