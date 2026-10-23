// node scripts/build-post-offpage-seo.js [--write] — data: 8 readable ranking pages (Google US, 23 Oct 2026), 4 Google Search Central docs searched for the term, and our own earlier measured link/brand data. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-offpage-seo-2026-10-23.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-2026-10-23.json');
const D = { shown: R.length, ok: ok.length, median: Math.round((w[3] + w[4]) / 2), links: c('links'), brand: c('brand'), social: c('social'), reviews: c('reviews'), gbp: c('gbp'), pr: c('pr'), guest: c('guest'), influencer: c('influencer'), forums: c('forums'), podcast: c('podcast'), directories: c('directories'), eeat: c('eeat'), ai: c('ai'), onpage: c('onpage'), policy: c('policy'), signal: c('signal'), define: c('define'), gdoc: c('googleDoc'), gdocs: G.length, gTerm: G.reduce((a, g) => a + g.offpage, 0) };
const exp = { shown: 9, ok: 8, median: 1942, links: 8, brand: 6, social: 7, reviews: 7, gbp: 7, pr: 7, guest: 6, influencer: 6, forums: 5, podcast: 4, directories: 7, eeat: 8, ai: 3, onpage: 7, policy: 1, signal: 5, define: 7, gdoc: 0, gdocs: 4, gTerm: 0 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
build({
  slug: 'offpage-seo', category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-10-23',
  title: 'Off-Page SEO: A Free 30-Minute Audit Built on Real Data',
  excerpt: `Off-page SEO explained with a free 30-minute audit: ${D.ok} top guides read, 0 of ${D.gdocs} Google docs use the term, and our own link and brand-mention numbers as the example.`,
  donut: [['OFF-PAGE', 'SEO'], [['List Your', 'Links'], 'Find Mentions', ['Check Reviews', 'and Profiles'], 'Fix What You Own', ['Repeat', 'Quarterly']]],
  cover: { badge: 'REAL SERP CHECK', search: 'offpage seo', card: `Guides read: ${D.ok} of ${D.shown}`, lines: [`Mention backlinks: ${D.links} of ${D.ok}`, `Mention reviews: ${D.reviews} of ${D.ok}`, `Mention social media: ${D.social} of ${D.ok}`, `Link Google's docs: ${D.gdoc} of ${D.ok}`], last: `Google docs using the term: 0 of ${D.gdocs}`, big: `0 of ${D.gdocs}`, k1: 'Google docs we searched', k2: 'use the word off-page', title: 'Off-Page SEO', sub: 'A free 30-minute audit' },
  info: { title: `Off-Page SEO: ${D.ok} Guides Read`, sub: 'Organic results for "offpage seo", Google US, 23 October 2026', leftTitle: 'What the guides list', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Backlinks', sub: 'or link building', n: D.links }, { label: 'E-E-A-T or trust', sub: 'as an off-page theme', n: D.eeat }, { label: 'Social media', sub: 'as a factor', n: D.social }, { label: 'Reviews', sub: 'and testimonials', n: D.reviews }, { label: 'AI answers or LLMs', sub: 'mentioned', n: D.ai }],
    rightTitle: 'The 30-minute audit', rightTag: 'Four steps', items: [{ t: 'List your links', s: 'Search Console' }, { t: 'Find your mentions', s: 'linked or not' }, { t: 'Check your profiles', s: 'reviews, listings' }, { t: 'Fix what you own', s: 'then repeat' }],
    big: `0 of ${D.gdocs}`, noteHtml: `Google docs we searched use the term <em>off-page</em>.` },
  tables: {
    serp: { title: `What ${D.ok} off-page SEO guides list`, sub: `Organic results for "offpage seo" read on 23 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Backlinks or link building', `${D.links} of ${D.ok}`], ['E-E-A-T, expertise or trust', `${D.eeat} of ${D.ok}`], ['Social media', `${D.social} of ${D.ok}`], ['Reviews or testimonials', `${D.reviews} of ${D.ok}`], ['Google Business Profile or citations', `${D.gbp} of ${D.ok}`], ['Digital PR or press', `${D.pr} of ${D.ok}`], ['Directories', `${D.directories} of ${D.ok}`], ['Guest posting', `${D.guest} of ${D.ok}`], ['Influencers', `${D.influencer} of ${D.ok}`], ['Forums, Reddit or communities', `${D.forums} of ${D.ok}`], ['AI answers or LLMs', `${D.ai} of ${D.ok}`], ["Google's spam policy named", `${D.policy} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`]] },
    ours: { title: 'Our own off-page snapshot, October 2026', sub: 'Search Console Links report (21 October) and a brand-mention scan (21 October) for contomatix.com, with each page opened and classified. Details in the linked studies.', head: ['Measure', 'Value'], lastBold: false,
      rows: [['External links', '24 from 10 sites'], ['Editorial mentions inside articles', '2 of 24'], ['Links pointing to the home page', '17 of 24'], ['Posts with an external link', '0 of 331'], ['Pages that name our brand (found)', '14'], ['Brand mentions with no link', '8, on 2 sites'], ['Search impressions, 90 days', 'about 106,000'], ['Search clicks, 90 days', '77']] },
    steps: { title: 'A 30-minute off-page audit', sub: 'Free sources and tools only. Times are our estimates for a small site.', head: ['Step', 'Where', 'Time'], lastBold: false,
      rows: [['List your links, sites and target pages', 'Search Console, Links report', '5 min'], ['Sort your anchors', 'Anchor text checker', '5 min'], ['Check the rel attribute on key links', 'Dofollow link checker', '5 min'], ['Search your brand name for unlinked mentions', 'Google, then link reclamation', '10 min'], ['Check profiles and reviews are complete', 'Your listings and review sites', '5 min']] }
  },
  content: h => `${h.updated}

<p><strong>Off-page SEO</strong> is everything that influences how your site is found and trusted that happens away from your own pages: links from other sites, mentions of your brand, reviews, profiles and listings. We read ${D.ok} top-ranking guides on 23 October 2026. ${D.links} of ${D.ok} start with backlinks, ${D.eeat} of ${D.ok} bring in trust or E-E-A-T, and ${D.social} of ${D.ok} include social media. None of them link to Google's own documentation, and in the four Google Search Central pages we searched, the word off-page does not appear at all.</p>

<p>That last point matters. Off-page SEO is an industry term, not a Google one, so a checklist of "off-page factors" is a list of opinions about what might help. This guide gives you the opinions, what Google actually says, a free 30-minute audit you can run today, and our own numbers as a worked example. For link basics, see <a href="/blog/what-is-link-building">what link building is</a>.</p>

<h2>What Off-Page SEO Means</h2>
<p>${D.define} of the ${D.ok} guides define it as actions or signals outside your own website. That is a fair working definition. On-page work is what you control on a page: titles, content, internal links, structure. Technical work is how the site is built and crawled. Off-page is what other people and other sites say and do about you. The difference is control: you can edit your own page tonight, but you can only influence whether someone links to it.</p>
<p>${D.onpage} of ${D.ok} guides contrast off-page SEO with on-page or technical SEO. If you want the on-page side first, our <a href="/blog/on-page-seo-checklist">on-page SEO checklist</a> covers it.</p>

<h2>What ${D.ok} Top Guides List as Off-Page Factors</h2>
${h.fig('serp', 'Table of what 8 off-page SEO guides list: backlinks and E-E-A-T in 8 of 8, social media, reviews, Google Business Profile, digital PR and directories in 7 of 8, and no links to Google documentation in any')}
<p>The lists overlap heavily. Backlinks appear in ${D.links} of ${D.ok}, E-E-A-T in ${D.eeat}, and social media, reviews, Google Business Profile or citations, digital PR and directories each in ${D.social} or ${D.directories} of ${D.ok}. Guest posting and influencers appear in ${D.guest} each, forums and communities in ${D.forums}, podcasts or speaking in ${D.podcast}, and AI answers or LLM visibility in only ${D.ai}. The pages run a median of ${h.f(D.median)} words.</p>
<p>Two gaps stand out. Only ${D.policy} of ${D.ok} name Google's spam policy, even though several of the listed tactics, such as directories, guest posts and paid placements, appear in it. And ${D.ai} of ${D.ok} mention AI answers, although visibility in AI answers is now a common concern. For that side, see our <a href="/blog/llm-visibility-guide-2026">LLM visibility guide</a>.</p>

<h2>What Google Says (and Does Not Say)</h2>
<p>We searched four Google Search Central documents for the terms off-page and off-site: the spam policies, the guidance on qualifying outbound links, the SEO starter guide and the ranking systems guide. The term appears ${D.gTerm} times across all of them. That does not mean off-page signals do not matter. Google's documentation does talk about links, and it describes systems that use links and other signals. It means Google does not organise its guidance under that label, so claims that "off-page SEO is X percent of ranking" cannot come from Google.</p>
<p>What Google does give you is rules for the parts of off-page work that can go wrong. Its spam policies list link spam: buying or selling links for ranking purposes, excessive link exchanges, automated link creation and low-quality directory or bookmark links, among others. And its guidance on qualifying outbound links explains <code>rel="sponsored"</code>, <code>rel="ugc"</code> and <code>rel="nofollow"</code>. Build your off-page plan inside those lines. Our guide on <a href="/blog/white-hat-link-building">white hat link building</a> puts the two lists side by side.</p>

<h2>Our Own Off-Page Snapshot</h2>
${h.fig('ours', 'Table of the Contomatix off-page snapshot in October 2026: 24 external links from 10 sites, 2 of 24 editorial, 17 to the home page, 0 of 331 posts with an external link, 14 brand mentions found of which 8 unlinked, 106,000 impressions and 77 clicks in 90 days')}
<p>To show the audit in action, here is ours. In Search Console we have 24 external links from 10 sites; 2 are editorial mentions and the rest are directory or listing pages. Seventeen point to the home page and none of our 331 posts has an external link. A scan on 21 October found 14 pages that name our brand, 8 of them without a link, on 2 sites. Over 90 days the site had about 106,000 impressions and 77 clicks. The details are in <a href="/blog/link-reclamation">link reclamation</a>, <a href="/blog/editorial-backlinks">editorial backlinks</a> and <a href="/blog/search-console-impressions-explained">Search Console impressions explained</a>.</p>
<p>The audit points to three jobs: ask the 8 unlinked mentions for links, build pages and tools that others want to cite, and stop adding weak listings. It is one young site and not a benchmark, but the same method works on any site.</p>

<h2>A Free 30-Minute Off-Page Audit</h2>
${h.fig('steps', 'Table of a 30-minute off-page audit: list links in Search Console, sort anchors, check rel attributes, search for unlinked brand mentions and check profiles and reviews, with free tools and time for each')}
<ol>
<li><strong>List your links (5 minutes).</strong> In Search Console, open Links and note the top linking sites, the top linked pages and the top linking text. Write down how many sites link to you, not just how many links.</li>
<li><strong>Sort your anchors (5 minutes).</strong> Paste the anchors into the <a href="/tools/anchor-text-checker">anchor text checker</a> to see how many are branded, descriptive, generic or heavily repeated.</li>
<li><strong>Check key links (5 minutes).</strong> Paste the HTML of the pages that link to you into the <a href="/tools/dofollow-link-checker">dofollow link checker</a> or <a href="/tools/outbound-link-checker">outbound link checker</a> to see the rel attribute.</li>
<li><strong>Find unlinked mentions (10 minutes).</strong> Search your brand name in Google, open the results that mention you and note which do not link. Ask for the link politely. See <a href="/blog/link-reclamation">link reclamation</a>.</li>
<li><strong>Check profiles and reviews (5 minutes).</strong> Make sure your listings, business profile and review pages show the same name, address, description and links.</li>
</ol>
<p>Record the numbers in a sheet and repeat every quarter. Changes in your own sheet tell you more than any average from a guide.</p>
<p>When you read the results, look for three patterns. Links concentrated on one page suggest your inner pages are not giving anyone a reason to cite them. Many unlinked mentions suggest a quick win through polite outreach. And a profile that looks very different from site to site suggests tidy-up work that costs only time. None of these needs a paid tool, and each gives you a concrete task for the next month.</p>

${h.info('Infographic of what 8 off-page SEO guides list: backlinks 8, E-E-A-T 8, social media 7, reviews 7, AI answers 3, and the four steps of a 30-minute off-page audit')}

<h2>The Main Off-Page Activities, Ranked by Control</h2>
<ul>
<li><strong>Profiles and listings (high control).</strong> You create and edit these. Keep them accurate and few.</li>
<li><strong>Reviews (medium control).</strong> You can ask customers to leave one, but you cannot choose what they write. Never buy or fake reviews.</li>
<li><strong>Reclaiming mentions (medium).</strong> You ask; the site decides.</li>
<li><strong>Guest posts and interviews (medium).</strong> You pitch; the host decides. Use natural anchors.</li>
<li><strong>Digital PR and data (low control, high value).</strong> Journalists and bloggers choose whether to cite you.</li>
<li><strong>Communities and social (low control).</strong> Take part honestly; links in most of these are qualified or have little ranking value.</li>
<li><strong>Linkable assets (low control, long term).</strong> A tool or data page that others cite. See <a href="/blog/linkable-assets">linkable assets</a>.</li>
</ul>

<h2>Where to Spend the Next Hour</h2>
<p>Off-page work is the slowest of the three kinds of SEO, so it should not come first on a new site. A simple order works for most small sites:</p>
<ol>
<li><strong>Make sure the site can be crawled and indexed.</strong> A page that Google cannot index cannot benefit from anyone linking to it. Check your sitemap and robots.txt with the free tools in <a href="/blog/free-seo-tools">free SEO tools</a>.</li>
<li><strong>Make each important page worth citing.</strong> One clear purpose, one main keyword, real information that others lack. Our <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> helps you avoid two pages competing for the same term.</li>
<li><strong>Then work off-page.</strong> Claim mentions, fix profiles, pitch the pages most likely to be cited.</li>
</ol>
<p>If your pages are already in good shape, the audit above is the right next step, and the numbers it produces tell you which of the off-page activities to pick.</p>

<h2>Off-Page SEO for a Small or Local Business</h2>
<p>A small business has a short list of off-page jobs that matter more than the rest. Keep your business profile complete and consistent. Ask happy customers for honest reviews, and reply to them. Make sure your name, address and phone number match everywhere you are listed. Look for local organisations, suppliers and associations that publish member or partner pages, and ask for an accurate listing. Check whether local news or blogs have mentioned you without a link.</p>
<p>${D.gbp} of ${D.ok} guides include business profile or citations, which is a good reminder that off-page SEO is not only about backlinks. For a business that sells to one area, see <a href="/blog/local-seo-for-small-business">local SEO for small business</a>. Do not buy reviews or bulk listings. They are cheap, they are easy to spot, and Google lists low-quality directory links among its link spam examples.</p>

<h2>How Long Does Off-Page SEO Take?</h2>
<p>There is no standard answer, and any guide that gives a fixed number of months is guessing. What we can say from the sources we read: Google says crawling and indexing a new page can take from a few days to a few weeks, and a link only helps once the linking page is itself found. In our own check, 11 of 12 new pages were in Google within one to three days, which is one small sample (see <a href="/blog/how-to-index-backlinks">how to index backlinks</a>). Earned links, by definition, depend on other people's schedules. Plan in quarters, measure monthly, and judge each step by whether it produced a live link, a mention or a review, not by rankings alone.</p>

<h2>Questions to Ask Before You Outsource Off-Page Work</h2>
<ul>
<li>Which activities are included: links, reviews, listings, PR?</li>
<li>How are links acquired, and are any paid? How are paid links marked?</li>
<li>Will you show me the live URL for each result?</li>
<li>What will you report each month, and from which source?</li>
<li>How do you stay inside Google's spam policies?</li>
</ul>
<p>Compare answers with the costs in <a href="/blog/seo-packages-for-small-business">SEO packages for small business</a>. A provider that cannot answer the second and fifth questions clearly is a risk, whatever it calls its method.</p>

<h2>Common Off-Page SEO Mistakes</h2>
<ul>
<li><strong>Treating it as link building only.</strong> ${D.links} of ${D.ok} guides start with links, but mentions, reviews and profiles also shape how people find and trust you.</li>
<li><strong>Chasing a checklist of factors.</strong> Google does not publish one under this name.</li>
<li><strong>Ignoring Google's rules.</strong> Only ${D.policy} of ${D.ok} guides name the spam policy.</li>
<li><strong>Adding weak listings in bulk.</strong> Google lists low-quality directory links as link spam examples.</li>
<li><strong>Not tracking.</strong> Without a quarterly sheet you cannot tell what changed.</li>
<li><strong>Neglecting your own pages.</strong> No off-page effort helps a page that is not indexed, or has no clear title or purpose. Start with the <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a>.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Guide data comes from the organic results for "offpage seo" on Google US on 23 October 2026. ${D.shown} were listed and ${D.ok} returned a readable page. A topic counts once per page when its term appears in the text, so it shows presence, not depth.</li>
<li>The Google search covered four Search Central documents (spam policies, qualifying outbound links, SEO starter guide, ranking systems guide) for the terms off-page and off-site. It does not cover every Google page.</li>
<li>Our link and brand figures come from Search Console and a page scan on 21 October 2026, with each page opened and classified by us.</li>
<li>The audit steps and time estimates are our own working method.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Off-page SEO is an industry term for what happens away from your pages: links, mentions, reviews and profiles.</li>
<li>${D.links} of ${D.ok} guides start with links, and none link to Google's documentation.</li>
<li>The word off-page appears in 0 of the ${D.gdocs} Google documents we searched.</li>
<li>A 30-minute audit with Search Console and free tools shows where you stand.</li>
<li>Work inside Google's spam policy, and repeat the audit every quarter.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is off-page SEO?', 'It is the work and signals outside your own site that affect how you are found and trusted, mainly links from other sites, brand mentions, reviews, profiles and listings.'],
    ['What is the difference between on-page and off-page SEO?', 'On-page SEO is what you control on your pages, such as content and titles. Off-page SEO is what other sites and people do about you, so you can influence it but not edit it.'],
    ['Is off-page SEO more important than on-page SEO?', 'Google does not publish a split, and the term does not appear in the Google documents we searched. Fix your pages first, then earn links and mentions.'],
    ['What are examples of off-page SEO?', 'Earning backlinks, reclaiming unlinked brand mentions, collecting genuine reviews, keeping business profiles accurate, digital PR, guest posts and being cited by communities and AI answers.'],
    ['Do social media signals help SEO?', 'Seven of eight guides list social media. We did not find a statement in the Google documents we searched that treats social shares as a ranking factor, but social activity can bring visibility and sometimes links.'],
    ['How do I do an off-page SEO audit for free?', 'List your links in Search Console, sort your anchors, check the rel attribute on key links, search for unlinked mentions and check your profiles. The steps take about 30 minutes.'],
    ['Are directory links good for off-page SEO?', 'A few relevant, real directories are fine. Google lists low-quality directory or bookmark links as link spam examples, so avoid bulk submissions.'],
    ['Can I buy off-page SEO?', 'You can pay for services, but buying links for ranking purposes is on Google\'s link spam list. Paid placements must be marked sponsored or nofollow. See <a href="/blog/saas-link-building-services">SaaS link building services</a>.'],
    ['How often should I audit off-page SEO?', 'Quarterly is enough for most small sites. Record the same numbers each time so you can compare.']
  ])}
`
});
