// node scripts/build-post-link-acquisition.js [--write]  — data: 6 readable ranking pages (Google US, 23 Oct 2026) + our own earlier measured link ledger. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-link-acquisition-2026-10-23.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { shown: R.length, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), guest: c('guest'), broken: c('broken'), resource: c('resource'), pr: c('pr'), directory: c('directory'), content: c('content'), mentions: c('mentions'), partner: c('partner'), cost: c('cost'), timeline: c('timeline'), metric: c('metric'), policy: c('policy'), risk: c('risk'), define: c('define'), vs: c('vs'), gdoc: c('googleDoc') };
const exp = { shown: 8, ok: 6, median: 2431, guest: 5, broken: 3, resource: 3, pr: 4, directory: 4, content: 3, mentions: 4, partner: 5, cost: 5, timeline: 4, metric: 6, policy: 1, risk: 5, define: 6, vs: 2, gdoc: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const SLUG = 'link-acquisition';
build({
  slug: SLUG, category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-23',
  title: 'Link Acquisition: 6 Top Guides Compared on Cost and Risk',
  excerpt: `Link acquisition explained: what ${D.ok} top guides cover, which they skip (cost, time, Google's rules), and a plan built on how our own 24 links were really acquired.`,
  donut: [['LINK', 'ACQUISITION'], [['Place', 'It Yourself'], 'Earn It', ['Pay and', 'Qualify It'], 'Score Each Method', ['Track Live', 'Links']]],
  cover: { badge: 'REAL SERP CHECK', search: 'link acquisition', card: `Guides read: ${D.ok} of ${D.shown}`, lines: [`Mention a metric: ${D.metric} of ${D.ok}`, `Mention cost: ${D.cost} of ${D.ok}`, `Mention a timeline: ${D.timeline} of ${D.ok}`, `Mention Google's rules: ${D.policy} of ${D.ok}`], last: 'Most skip the rulebook', big: `${D.policy} of ${D.ok}`, k1: 'guides mention', k2: "Google's rules", title: 'Link Acquisition', sub: 'Cost, time and risk compared' },
  info: { title: `Link Acquisition: ${D.ok} Guides Read`, sub: 'Organic results for "link acquisition", Google US, 23 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'A way to measure', sub: 'metrics or tracking', n: D.metric }, { label: 'Cost or budget', sub: 'mentioned', n: D.cost }, { label: 'Guest posting', sub: 'as a method', n: D.guest }, { label: 'Risk or penalties', sub: 'mentioned', n: D.risk }, { label: "Google's spam rules", sub: 'mentioned', n: D.policy }],
    rightTitle: 'Three ways a link is acquired', rightTag: 'Our model', items: [{ t: 'Placed by you', s: 'profiles, listings' }, { t: 'Earned by content', s: 'the site chooses' }, { t: 'Paid for', s: 'must be qualified' }, { t: 'Score each one', s: 'control, cost, time, risk' }],
    big: `${D.policy} of ${D.ok}`, noteHtml: `guides mention <em>Google's spam rules</em> while explaining how to acquire links.` },
  tables: {
    serp: { title: `What ${D.ok} link acquisition guides cover`, sub: `Organic results for "link acquisition" read on 23 October 2026 (${D.shown} listed, ${D.ok} returned a readable page). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Define link acquisition', `${D.define} of ${D.ok}`], ['A way to measure or track links', `${D.metric} of ${D.ok}`], ['Cost, price or budget', `${D.cost} of ${D.ok}`], ['Guest posting', `${D.guest} of ${D.ok}`], ['Partnerships, sponsorship or interviews', `${D.partner} of ${D.ok}`], ['Digital PR or press', `${D.pr} of ${D.ok}`], ['Directories or citations', `${D.directory} of ${D.ok}`], ['Unlinked mentions or reclamation', `${D.mentions} of ${D.ok}`], ['Broken link building', `${D.broken} of ${D.ok}`], ['A timeline for results', `${D.timeline} of ${D.ok}`], ['Risk or penalties', `${D.risk} of ${D.ok}`], ["Google's spam policy named", `${D.policy} of ${D.ok}`]] },
    ours: { title: 'How our own 24 links were acquired', sub: 'Search Console Links report for contomatix.com on 21 October 2026, with the linking pages opened and classified. Details in the linked studies.', head: ['Measure', 'Count'], lastBold: false,
      rows: [['External links', '24'], ['Linking sites', '10'], ['Directory or listing pages', '22'], ['Editorial mentions inside articles', '2'], ['Links to the home page', '17'], ['Links to free tool pages', '6'], ['Links to the 331 posts', '0'], ['Brand mentions with no link (14 found)', '8']] },
    score: { title: 'Scoring each way to acquire a link', sub: 'Our own judgement from the guides and from Google\'s documentation. 3 is highest control, lowest cost, fastest or lowest risk.', head: ['Method', 'Control', 'Cost', 'Speed', 'Risk'], lastBold: false,
      rows: [['Listings and profiles you place', '3', '3', '3', '2'], ['Link reclamation (unlinked mentions)', '2', '3', '2', '3'], ['Linkable assets such as tools and data', '1', '2', '1', '3'], ['Digital PR', '1', '1', '2', '3'], ['Guest posts', '2', '2', '2', '2'], ['Sponsored placements, qualified', '3', '1', '3', '3'], ['Exchanges and automated links', '3', '3', '3', '1']] }
  },
  content: h => `${h.updated}

<p><strong>Link acquisition</strong> is the process of getting other sites to link to yours, and the word that matters is process: it covers where each link comes from, what it costs, how long it takes and what could go wrong. All ${D.define} of the ${D.ok} guides we read define it, ${D.cost} of ${D.ok} mention cost, and yet just ${D.policy} of ${D.ok} mention Google's spam rules, which are the main limit on how you may acquire links.</p>

<p>This guide gives you the three ways a link is acquired, what ${D.ok} top-ranking guides cover and skip, how our own 24 links were really acquired, a scorecard for choosing between methods, and a monthly plan. For the basics, start with <a href="/blog/what-is-link-building">what link building is</a>.</p>

<h2>What Link Acquisition Means</h2>
<p>In everyday use, link acquisition and link building mean nearly the same thing. A useful way to separate them: link building is the activity (writing, pitching, listing), and link acquisition is the result and the pipeline behind it, from the first prospect to a live link you can count. Thinking in terms of acquisition makes you ask better questions. Where did this link come from? Did the other site choose to give it? What did it cost? Is it still live?</p>
<p>Those questions matter because not every link is equal in how it was obtained. Google's spam policies describe link spam as creating links to or from a site primarily to manipulate search rankings, and the way a link was acquired decides whether it is ordinary marketing or spam.</p>

<h2>The Three Ways a Link Is Acquired</h2>
<ul>
<li><strong>Placed by you.</strong> You create the link yourself on a profile, listing, business directory or property you control. It is fast and cheap, but the other site did not choose to endorse you, so it carries the least weight. Low-quality directory or bookmark links are on Google's list of link spam examples.</li>
<li><strong>Earned by content.</strong> The linking site chooses to link because you gave it something worth citing: data, a tool, an explanation, a quote. This is slow and hard to predict, and it is the model behind <a href="/blog/editorial-backlinks">editorial backlinks</a> and <a href="/blog/linkable-assets">linkable assets</a>.</li>
<li><strong>Paid for.</strong> Money, goods or services change hands. Google says buying or selling links for ranking purposes is link spam, but it also says paid placements are acceptable when marked <code>rel="sponsored"</code> or <code>rel="nofollow"</code>. See <a href="/blog/saas-link-building-services">SaaS link building services</a> for what providers charge.</li>
</ul>
<p>Most real plans use all three, in different proportions. The mistake is pretending that a placed link or a paid link is an earned one, in your reporting or in your anchor text.</p>

<h2>What ${D.ok} Top Guides Cover, and What They Skip</h2>
${h.fig('serp', `Table of what 6 link acquisition guides cover: all 6 define it and mention a metric, 5 mention cost and guest posting, 4 mention PR and a timeline, and only 1 of 6 names Google's spam policy`)}
<p>We read the ${D.ok} readable pages out of the ${D.shown} organic results for "link acquisition" on Google US on 23 October 2026. They run a median of ${h.f(D.median)} words. The pattern is clear. Every guide gives a way to measure results (${D.metric} of ${D.ok}), most mention cost (${D.cost} of ${D.ok}) and risk (${D.risk} of ${D.ok}), and ${D.guest} of ${D.ok} list guest posting. But only ${D.policy} of ${D.ok} name Google's spam policy and ${D.gdoc} of ${D.ok} link to Google's own documentation.</p>
<p>Methods are covered unevenly. Partnerships, sponsorships or interviews appear in ${D.partner} of ${D.ok}, digital PR in ${D.pr}, directories in ${D.directory}, unlinked mentions in ${D.mentions}, and broken link building, linkable assets and resource pages in only ${D.broken} of ${D.ok} each. Because a guide that mentions a risk is not necessarily explaining it, the numbers show what is on the page, not how well it is explained.</p>
<p>The gap to fill is the one between "risk" and "rule". A guide can warn about penalties and still never tell you which acquisition methods Google lists as link spam. That is what the next section does.</p>

<h2>Where Google Draws the Line</h2>
<p>Google's spam policies list examples of link spam. Several describe acquisition methods directly:</p>
<ul>
<li>Buying or selling links for ranking purposes, including exchanging money, goods or services for links.</li>
<li>Excessive link exchanges and partner pages exclusively for cross-linking.</li>
<li>Using automated programs or services to create links to your site.</li>
<li>Low-quality directory or bookmark site links.</li>
<li>Advertorials, and links with optimized anchor text in articles, guest posts or press releases distributed on other sites.</li>
</ul>
<p>Read as an acquisition plan, this tells you where to be careful: placed links on weak directories, automated links, mass exchanges and paid posts that pass ranking credit. Google's separate guidance on qualifying outbound links explains how to mark paid links (<code>sponsored</code>), user-generated links (<code>ugc</code>) and others (<code>nofollow</code>). If you are unsure whether a link you received is qualified, the <a href="/tools/outbound-link-checker">outbound link checker</a> and <a href="/tools/dofollow-link-checker">dofollow link checker</a> list the rel attribute for each link on a page.</p>

<h2>How Our Own 24 Links Were Acquired</h2>
${h.fig('ours', 'Table of how contomatix.com links were acquired in October 2026: 24 external links from 10 sites, 22 directory or listing pages, 2 editorial mentions, 17 to the home page, 6 to tools and 0 to the 331 posts')}
<p>We checked our own link profile in Search Console on 21 October 2026 and opened every linking page. We have 24 external links from 10 sites. Twenty-two sit on directory or listing pages and only 2 are editorial mentions inside articles. Seventeen point to the home page and 6 to free tool pages, while none of our 331 posts has an external link. We also found 14 pages that mention our brand, and 8 of those do not link to us. The details are in <a href="/blog/what-is-link-building">what is link building</a>, <a href="/blog/editorial-backlinks">editorial backlinks</a> and <a href="/blog/link-reclamation">link reclamation</a>.</p>
<p>In acquisition terms, our profile is mostly placed links, a few earned ones, and a pile of unclaimed mentions. That tells us what to do next: stop adding listings, turn the 8 unlinked mentions into links, and build more tools and data pages that others want to cite. It is one young site, not a benchmark, but the method of asking "how was each link acquired?" works on any profile.</p>

<h2>How to Score Each Acquisition Method</h2>
${h.fig('score', 'Table scoring seven ways to acquire a link on control, cost, speed and risk, from listings you place to exchanges and automated links, where 3 is the best score')}
<p>Our scorecard rates seven methods from 1 to 3 on four things: how much control you have, how low the cost is, how fast it works and how low the risk is. Read it as a prompt, not a verdict. Exchanges and automated links score high on control, cost and speed and the lowest on risk, which is why they are on Google's list. Linkable assets score low on speed and control but high on risk, because a link earned by a tool or a data page is the hardest kind to attribute to manipulation.</p>
<p>Use the scorecard to balance a plan. If everything you do sits in the top rows, you will have a fast, cheap and weak profile. If everything sits in the lower rows, you will wait a long time. A mix works: a few placed links for the basics, steady reclamation, and one asset worth citing each quarter.</p>

${h.info('Infographic of what 6 link acquisition guides cover: 6 of 6 give a way to measure, 5 mention cost and guest posting, 5 mention risk, only 1 mentions Google spam rules, plus three ways a link is acquired')}

<h2>A Monthly Link Acquisition Plan</h2>
<ol>
<li><strong>Audit what you have.</strong> Export your links from Search Console and tag each one placed, earned or paid. Check the anchors with the <a href="/tools/anchor-text-checker">anchor text checker</a>.</li>
<li><strong>Claim what is already yours.</strong> Find unlinked brand mentions and ask for the link. This is the cheapest acquisition there is. See <a href="/blog/link-reclamation">link reclamation</a>.</li>
<li><strong>Build a prospect list.</strong> Score each target before you contact it. Our guide to <a href="/blog/link-prospecting">link prospecting</a> and the <a href="/tools/link-prospect-scorer">link prospect scorer</a> help.</li>
<li><strong>Pitch in small waves.</strong> Send 5 to 10 emails, log replies and adjust. The <a href="/tools/outreach-email-generator">outreach email generator</a> drafts them.</li>
<li><strong>Create one asset.</strong> A tool, a dataset or a clear explainer gives people a reason to link.</li>
<li><strong>Qualify anything paid.</strong> Mark sponsored placements <code>rel="sponsored"</code>.</li>
<li><strong>Track live links.</strong> A link counts only when it is live and indexed. Our check on <a href="/blog/how-to-index-backlinks">how to index backlinks</a> found 11 of 12 new pages in Google within three days, but do not assume that for every page.</li>
<li><strong>Work out cost per live link.</strong> The <a href="/tools/link-building-cost-calculator">link building cost calculator</a> turns quotes into a cost per live link.</li>
</ol>

<h2>What to Track</h2>
<ul>
<li><strong>Live links acquired,</strong> split into placed, earned and paid.</li>
<li><strong>Referring domains,</strong> not only links, because ten links from one site are one source.</li>
<li><strong>Link destination.</strong> If all links go to the home page, your inner pages stay uncited.</li>
<li><strong>Time to live,</strong> from first contact to a live link.</li>
<li><strong>Cost per live link,</strong> including your own time.</li>
<li><strong>Rel attribute,</strong> so you know which links pass credit.</li>
</ul>

<h2>Which Method to Use First</h2>
<p>The right starting point depends on what you already have, so match the method to your situation instead of copying a list of tactics.</p>
<ul>
<li><strong>A new site with no links.</strong> Start with a small number of relevant listings and profiles, because they establish that the business exists. Then move quickly to a first asset worth citing. Do not build dozens of directory links: Google lists low-quality directory links as link spam examples.</li>
<li><strong>A site with mentions but few links.</strong> Start with reclamation. Our brand check found 8 unlinked mentions on 2 sites, which is a short, polite list of emails that costs nothing.</li>
<li><strong>A site with good content and no outreach.</strong> Build a prospect list of pages that already link to similar sources. A page that cites weaker material than yours is a better target than a random site in your niche.</li>
<li><strong>An agency or business with a budget.</strong> Compare quotes by cost per live link, not by the number promised. Ask each provider how links are marked and whether they follow Google's rules on paid placements.</li>
<li><strong>A site that has already used shortcuts.</strong> Review the profile first. If you inherited exchanges, automated links or paid posts without qualifiers, see <a href="/blog/google-disavow-backlinks">Google disavow backlinks</a> before acquiring more.</li>
</ul>

<h2>Examples of Acquisition Routes</h2>
<p>To make the three ways concrete, here is how the same business might acquire three links in a month.</p>
<ol>
<li><strong>Placed:</strong> the business adds a profile to an industry association page it belongs to. It takes an hour, the page is relevant, and the link is useful to visitors. The link was not chosen by an editor, so it is scored as placed.</li>
<li><strong>Earned:</strong> a journalist cites the business's free calculator in an article about costs. The business spent months building the calculator and a few minutes replying to a question. The link was chosen by the writer, so it is scored as earned.</li>
<li><strong>Paid:</strong> the business buys a sponsored post on a trade site. The post is labelled and the link carries <code>rel="sponsored"</code>. It sends readers and awareness, and Google is told that money was involved.</li>
</ol>
<p>Each route is legitimate when handled honestly. Trouble starts when a placed link is made to look earned, or when a paid link is left unmarked. Keeping the three categories separate in your sheet makes that hard to do by accident.</p>

<h2>Common Link Acquisition Mistakes</h2>
<ul>
<li><strong>Counting links, not sources.</strong> Many links from one site add little.</li>
<li><strong>Calling everything earned.</strong> A listing you created is placed, and your report should say so.</li>
<li><strong>Ignoring mentions you already have.</strong> Unlinked mentions are the cheapest links available.</li>
<li><strong>Skipping Google's rules.</strong> Only ${D.policy} of ${D.ok} top guides mention them, so do not rely on a guide to warn you.</li>
<li><strong>Putting every link on the home page.</strong> Deep links help inner pages rank.</li>
<li><strong>Paying without qualifying.</strong> Paid links should carry sponsored or nofollow.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Guide data comes from the organic results for "link acquisition" on Google US, 23 October 2026. ${D.shown} were listed and ${D.ok} returned a readable page. A topic counts once per page when its term appears in the text, so a count shows presence, not quality.</li>
<li>Our own link figures come from Search Console on 21 October 2026, with each linking page opened and classified by us.</li>
<li>Google statements come from its spam policies and its guidance on qualifying outbound links, read on 23 October 2026.</li>
<li>The scorecard is our judgement, not measured data.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Link acquisition is the process behind each link: where it came from, what it cost and whether it is live.</li>
<li>A link is placed by you, earned by content or paid for, and paid links must be qualified.</li>
<li>${D.policy} of ${D.ok} top guides name Google's spam policy, so check it yourself.</li>
<li>22 of our 24 links are listings and 2 are editorial, which shows where to invest next.</li>
<li>Score methods on control, cost, speed and risk, and track live links monthly.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is link acquisition?', 'It is the process of getting other sites to link to yours, covering where each link comes from, what it costs, how long it takes and whether it is live.'],
    ['What is the difference between link acquisition and link building?', 'They are close. Link building usually means the activities, such as outreach and content. Link acquisition emphasises the result and the pipeline: each live link and how it was obtained.'],
    ['What are the main link acquisition methods?', 'Placing links yourself on profiles and listings, earning them with content, tools and PR, and paying for placements. Paid links should be marked sponsored or nofollow.'],
    ['Is buying links allowed by Google?', "Google lists buying or selling links for ranking purposes as link spam. Paid placements are fine when qualified with rel=sponsored or nofollow."],
    ['How long does link acquisition take?', 'It varies by method. Listings can be live in days, earned links often take weeks or months, and indexing can take days to weeks.'],
    ['How many links should I acquire a month?', 'Google gives no number. Aim for a steady flow of relevant links and measure live links and referring domains rather than a target count.'],
    ['What is the cheapest way to acquire links?', 'Link reclamation: asking sites that already mention your brand without a link to add one. See <a href="/blog/link-reclamation">link reclamation</a>.'],
    ['How do I know if a link passes credit?', 'Check its rel attribute. Links marked nofollow, sponsored or ugc are qualified. Use the <a href="/tools/dofollow-link-checker">dofollow link checker</a> on the linking page.'],
    ['Do directory links count as link acquisition?', 'Yes, as placed links. Google lists low-quality directory or bookmark links as link spam examples, so use few, relevant listings.']
  ])}
`
});
