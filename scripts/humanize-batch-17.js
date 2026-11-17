// 17 Nov 2026: first "humanized" update (user rule: add what only we can say, vary the format, avoid the same 7-H3 block everywhere).
// Each post gets one section built from our own data or a test run on 16/17 Nov 2026, an answer-first short answer where the intro was research-first, and a SHORT, differently shaped Q&A block (4 to 5 questions, first-person where honest).
// Data sources: Search Console export performance-2026-11-16 (90 days to 13 Nov), curl on our own domain, scripts/site-audit-full.js, Google AI Overview for our brand name on 17 Nov. No competitor names.
const fs = require('fs'); const path = require('path');
const { apply } = require('./lowvol-lib.js');
const fp = path.join(__dirname, '..', 'data', 'blog.json');
const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const T = '<!-- human-2026-11-17 -->';
const find = s => { const p = posts.find(x => x.slug === s); if (!p) throw new Error('missing ' + s); return p; };
const before = (p, marker, html) => { const i = p.content.indexOf(marker); if (i < 0) throw new Error('marker missing ' + marker); p.content = p.content.slice(0, i) + html + '\n' + p.content.slice(i); };
const short = (p, text) => { const h = p.content.indexOf('<h2>'); p.content = p.content.slice(0, h) + '<p><strong>Short answer:</strong> ' + text + '</p>\n' + p.content.slice(h); };
const upd = (p, m) => { p.content = p.content.replace(/Last updated: [A-Za-z]+ \d{4}/, 'Last updated: ' + m); };
{
  const p = find('search-console-impressions-explained');
  if (!p.content.includes(T)) {
    short(p, 'an impression is counted when a link to your page appears in the results a person sees, whether or not they scroll to it or click. It is a measure of being seen, not of being read, so a rising impression count only helps if queries are also moving toward page one.');
    before(p, '<h2>Why the Chart and the Table Disagree</h2>', `${T}
<h2>Our Numbers Again, 16 November 2026</h2>
<p>The section above used 90 days to October. We pulled the same report on 16 November, with data up to 13 November, and the picture is sharper. Across the 469 pages that had at least one impression we recorded 213,857 impressions and 146 clicks. Only 67 of those pages (14%) got a click, and 402 were shown and never clicked. The ten biggest pages hold 32% of all impressions.</p>
<p>Search Console lets you export the top 1,000 queries, and in that list there are 134,084 impressions and 48 clicks. Just 23 of the 1,000 queries earned a click, so 977 were seen and ignored. The clicks sit in an odd place:</p>
<ul>
<li><strong>Positions 1 to 3:</strong> 2 queries, 213 impressions, 0 clicks.</li>
<li><strong>Positions 4 to 10:</strong> 34 queries, 4,195 impressions, 2 clicks.</li>
<li><strong>Positions 11 to 20:</strong> 124 queries, 14,480 impressions, 27 clicks, a click-through rate of 0.19%.</li>
<li><strong>Positions 21 to 50:</strong> 303 queries, 41,829 impressions, 6 clicks (0.01%).</li>
<li><strong>Positions 51 to 200:</strong> 537 queries, 73,367 impressions, 13 clicks (0.02%).</li>
</ul>
<p>Our reading is that most of our impressions are people seeing us at the bottom of long result lists, which is why 213,857 sounds impressive and 146 clicks does not. The numbers worth watching are the 124 queries sitting at positions 11 to 20, where a small move onto page one would convert the most impressions into clicks. Treat the top-1,000 limit as a sample, not the full total. See our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> if you need to export the same report.</p>
`);
    upd(p, 'November 2026');
    fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8');
  }
}
{
  const p = find('seo-site-migration');
  if (!p.content.includes(T)) {
    short(p, 'an SEO site migration is any move that changes the URLs search engines use, such as a new domain, HTTP to HTTPS or a new platform. Map every old URL to its new one, use server-side 301 or 308 redirects, avoid chains, change one thing at a time, and keep the redirects for at least a year.');
    before(p, '<h2>How to Build the URL Map for a Site Migration</h2>', `${T}
<h2>A Redirect Check on Our Own Domain, 17 November 2026</h2>
<p>Before telling anyone to avoid redirect chains, we ran the check on ourselves with <code>curl</code>, following each redirect to the end:</p>
<ul>
<li><code>http://contomatix.com/</code>: one 301 straight to <code>https://contomatix.com/</code>, final status 200.</li>
<li><code>https://www.contomatix.com/</code>: one 301 to <code>https://contomatix.com/</code>, final status 200.</li>
<li><code>https://contomatix.com/blog/</code> (trailing slash): one 301 to <code>https://contomatix.com/blog</code>, final status 200.</li>
<li><code>http://www.contomatix.com/</code>: two hops. It first redirects to <code>https://www.contomatix.com/</code>, and then to <code>https://contomatix.com/</code>.</li>
</ul>
<p>The last one is a small chain, exactly what Google's site-move guidance tells you to avoid. It still lands on the right page, so it is not an emergency, and Search Console lists these variants under Page with redirect, which is the normal status for a redirect and not an error. Our view is that a chain on a rarely used address is worth fixing at the next hosting change, but it should not stop a launch. The test takes a minute per URL and finds problems before Google does, so run it on your own variants and keep the results in your migration sheet. For the full method see <a href="/blog/301-redirect-not-working">our redirect testing guide</a>.</p>
`);
    upd(p, 'November 2026');
    fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8');
  }
}
{
  const p = find('website-seo-audit');
  if (!p.content.includes(T)) {
    short(p, 'a website SEO audit works in order: first check that Google can reach and index the pages that matter, then the crawl layer, Core Web Vitals, on-page intent, and only then content and links. End with a short list ranked by what costs you money, not a 60-page PDF of every issue.');
    before(p, '<h2>The One-Page Audit Checklist</h2>', `${T}
<h2>What Our Own Audit Flags Today, 17 November 2026</h2>
<p>We run a full-site check on our own blog before every push. On 17 November it covered 370 posts and reported 0 errors, 7 warnings and 47 notes. That sounds clean, so here is what is actually in those 54 lines:</p>
<ul>
<li><strong>47 notes are title lengths</strong> outside the 55 to 60 character range our own template asks for. It is a soft rule of ours, not a Google rule, and most are older city posts.</li>
<li><strong>5 warnings are thin pages</strong> between 1,481 and 1,498 words, under our 2,200 word floor. We left them alone on purpose while we focus on pages that already get impressions.</li>
<li><strong>2 warnings are external links</strong> without the target and rel attributes we normally add. One of them is a followed link we kept deliberately.</li>
</ul>
<p>Our view is that this is how a useful audit should read: every line has a reason and an owner, and the short list at the top is the list that matters. A 340-issue export would have buried the 5 thin pages under title-length noise. Run the same layers in order, decide what you will not fix, and write that down too. Our <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a> gives you a first pass if you do not have a crawler.</p>
`);
    upd(p, 'November 2026');
    fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8');
  }
}
{
  const p = find('brand-appears-in-chatgpt-ai-search-2026');
  if (!p.content.includes(T)) {
    short(p, 'to check whether your brand appears in ChatGPT and other AI search, run a fixed list of about 12 customer-style prompts, run each more than once, and log whether you were mentioned, named or linked. Searching only your own brand name tells you little, because customers ask about their problem, not your company.');
    before(p, '<h2>Why "Brand Appears in ChatGPT" Is Worth Tracking at All</h2>', `${T}
<h2>What Google's AI Said About Us, 17 November 2026</h2>
<p>We ran our own advice on ourselves. We searched our brand name in Google and read the AI Overview. It described us as a white-hat SEO and link building agency, listed manual outreach, link insertions, on-page and technical SEO and AI search optimization, and cited our own website and a business directory listing as its sources. Those were accurate.</p>
<p>We then searched "is contomatix worth it", which is the kind of question a buyer asks. That answer was more cautious. It said value depends on scope, mentioned our free audit, and also pointed to an article from a competitor that compares itself with us. We did not write that article, and it still shaped what a stranger would read about us. Two lessons follow: your own site is only one of the sources an AI answer uses, and a comparison page written by someone else can end up in it. The fix is not to argue with that page. It is to publish clear facts about your services on your own pages so the answer has something accurate to draw from. These are single checks on one day, so repeat them, as the section above says, before you trust a pattern.</p>
`);
    upd(p, 'November 2026');
    fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8');
  }
}
// short, differently shaped Q&A blocks (4 to 5 questions each)
apply([
  { slug: 'search-console-impressions-explained', h2: 'Questions We Get About Impressions', sources: 'Search Console page queries (90 days to 13 Nov 2026)',
    keywords: ['google search console impressions definition', 'search impressions', 'impressions google search console', 'what is impression in google search console', 'search console impressions meaning'],
    items: [
      { h3: 'What Is an Impression in Google Search Console?', html: `It is one appearance of your link in the results a person sees. You do not need a click, and the person does not need to scroll to it. In our data that is why 213,857 impressions produced only 146 clicks.` },
      { h3: 'Google Search Console Impressions Definition in One Line', html: `Google's definition: an impression is counted when a link to your site appears in the current page of results. The search impressions you see in the report are therefore a measure of visibility, not interest.` },
      { h3: 'Search Console Impressions Meaning: Good or Bad?', html: `Neither on its own. Rising impressions with flat clicks usually means you are showing at the bottom of long result lists. Watch whether queries move toward positions 11 to 20 and then page one.` },
      { h3: 'Why Impressions Google Search Console Shows Differ From the Table', html: `The chart counts every impression, while the query table hides rare queries for privacy, so it can show fewer. Our own table showed about 65% of the chart. Read the chart for totals and the table for patterns.` }
    ] },
  { slug: 'seo-site-migration', h2: 'Quick Questions About Site Migrations', sources: 'Search Console page queries (90 days to 13 Nov 2026)',
    keywords: ['site migration seo', 'seo migration guide', 'seo site migration', 'seo migration', 'seo migration help', 'site migration seo plan'],
    items: [
      { h3: 'Site Migration SEO: Where Do I Start?', html: `Start with a list of every URL and its new address. Everything else, redirects, testing and Search Console, depends on that map. Change one thing at a time and do not mix a redesign with a domain move.` },
      { h3: 'SEO Migration Guide: How Long Do Redirects Stay?', html: `Google's guidance says to keep redirects for as long as possible, generally at least one year. Medium sites can take a few weeks for Google to notice the change, and larger sites longer.` },
      { h3: 'SEO Migration Help: What to Test First', html: `Test the old URLs with a tool that follows redirects and reports every hop, as we did for our own domain above. Look for chains, loops and anything that does not end in a 200.` },
      { h3: 'Site Migration SEO Plan: What Goes in It', html: `The URL map, the redirect rules, a test list, a launch date that avoids your busiest week, and a check after launch in Search Console. Our <a href="/blog/website-seo-audit">website SEO audit</a> checklist covers the after-launch checks.` }
    ] },
  { slug: 'website-seo-audit', h2: 'Questions About Running an Audit Yourself', sources: 'Search Console page queries (90 days to 13 Nov 2026)',
    keywords: ['website seo audit', 'seo audit', 'website redesign seo audit'],
    items: [
      { h3: 'How Long Does a Website SEO Audit Take?', html: `On a small site it takes an afternoon with free tools. A website SEO audit that takes weeks is usually a crawler export that was never ranked, which is the 60-page PDF problem described above.` },
      { h3: 'What Should an SEO Audit Include First?', html: `Indexing. Nothing else counts until Google can reach and index the pages that matter. After that come the crawl layer, Core Web Vitals, on-page intent and content, in that order.` },
      { h3: 'Website Redesign SEO Audit: When to Run One', html: `Run it before the redesign goes live, so you can list URLs, titles and links worth keeping, and again after launch. See our <a href="/blog/seo-site-migration">SEO site migration checklist</a> for the URL map.` }
    ] },
  { slug: 'brand-appears-in-chatgpt-ai-search-2026', h2: 'Common Questions About Tracking Your Brand in AI Answers', sources: 'Search Console page queries (90 days to 13 Nov 2026)',
    keywords: ['track brand in chatgpt', 'how do i check if my brand appears in chatgpt', 'why does my brand appear on perplexity but not chatgpt', 'how do i track whether my brand is mentioned in ai answers'],
    items: [
      { h3: 'How Do I Track My Brand in ChatGPT?', html: `Write about 12 prompts a customer would type, run each more than once, and log whether you were mentioned, named or linked. A simple sheet is enough. To track brand in ChatGPT over time, repeat the same prompts monthly.` },
      { h3: 'How Do I Check If My Brand Appears in ChatGPT Without a Tool?', html: `Open the assistant, ask the question a customer would ask about your problem, and read the answer for your name and link. Searching only your company name tells you little, as the first section explains.` },
      { h3: 'Why Does My Brand Appear on Perplexity but Not ChatGPT?', html: `Different assistants draw on different sources and answer differently each time, so a gap between them is common. Check each one separately and more than once before you conclude anything.` },
      { h3: 'How Do I Track Whether My Brand Is Mentioned in AI Answers?', html: `Log each result in a sheet with the prompt, the assistant, the date and whether you were mentioned, named or linked. Our guide to <a href="/blog/what-is-ai-visibility-2026">what AI visibility is</a> explains the metrics.` }
    ] }
], { date: '2026-11-17' });
console.log('humanized');
