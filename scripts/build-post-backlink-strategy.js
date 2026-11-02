// node scripts/build-post-backlink-strategy.js [--write] — data: 7 readable ranking pages (Google US, 2 Nov 2026), Google's spam policies and "qualify your outbound links" pages (read 29 Oct and 2 Nov 2026), our own Search Console Links report (29 Oct 2026) and our own 28 Oct 2026 Search Console export by page. Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-backlink-strategy-2026-11-02.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const GL = require('../../keyword-research/google-docs-links-2026-10-29.json'); const G2 = require('../../keyword-research/google-docs-day16-2026-11-02.json');
for (const [k, s] of [['spam', 'Link spam is the practice of creating links to or from a site primarily for the purpose of manipulating search rankings.'], ['spam', 'links with optimized anchor text in articles, guest posts, or press releases distributed on other sites'], ['spam', 'Excessive link exchanges'], ['qualify', 'Mark links that are advertisements or paid placements'], ['qualify', 'though sponsored is preferred']]) if (!GL[k].text.includes(s)) throw new Error('Google text changed: ' + s);
if (!G2.links.text.includes('Mark links that are advertisements or paid placements')) throw new Error('qualify page changed');
const L0 = require('../../keyword-research/own-gsc-links-2026-10-29.json');
const O = { total: L0.externalLinksTotal, home: L0.topLinkedPages['https://contomatix.com/'], top5: Object.values(L0.topLinkingSites).reduce((a, b) => a + b, 0), prof: L0.topLinkingSites['goodfirms.co'] + L0.topLinkingSites['designrush.com'], internal: L0.internalLinksTotal, texts: L0.topLinkText };
if (O.total !== 30 || O.home !== 23 || O.top5 !== 24 || O.prof !== 19 || O.internal !== 10704 || O.texts.join('|') !== 'visit website|contomatix|llms txt generator|(empty)|contomatix com') throw new Error('own links data changed ' + JSON.stringify(O));
const rows = fs.readFileSync(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-28', 'Pages.csv'), 'utf8').trim().split(/\r?\n/).slice(1).map(l => { const m = l.match(/^(.*),(\d+),(\d+),([\d.]*)%?,?([\d.]*)$/); return m ? { u: m[1].replace('https://contomatix.com', ''), c: +m[2], i: +m[3], p: +m[5] } : null; }).filter(Boolean);
const CAND = rows.filter(x => (/^\/blog\//.test(x.u) || /^\/tools\//.test(x.u)) && !/-2026$/.test(x.u) && x.p > 30).sort((a, b) => b.i - a.i).slice(0, 5);
const expC = ['/blog/check-backlinks-of-website', '/tools/seo-report-generator', '/blog/ai-tools-for-seo-keyword-research', '/tools/dofollow-link-checker', '/blog/ai-powered-seo-tools'];
if (CAND.map(x => x.u).join() !== expC.join()) throw new Error('candidates changed ' + CAND.map(x => x.u).join());
const D = { listed: 9, ok: ok.length, median: Math.round(w[3]), steps: c('steps'), guest: c('guest'), digitalPr: c('digitalPr'), broken: c('broken'), content: c('content'), competitor: c('competitor'), anchor: c('anchor'), nofollow: c('nofollow'), spam: c('spam'), template: c('template'), tools: c('tools'), metrics: c('metrics'), quality: c('quality'), google: c('google'), sells: c('sells'), example: c('example'), goals: c('goals'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 9, ok: 7, median: 3066, steps: 1, guest: 6, digitalPr: 6, broken: 3, content: 6, competitor: 6, anchor: 4, nofollow: 4, spam: 5, template: 1, tools: 7, metrics: 7, quality: 7, google: 2, sells: 6, example: 3, goals: 4, gdoc: 0, dated: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(O), CAND.map(x => x.u + ':' + x.i + ':' + x.p).join(' '));
const f = n => n.toLocaleString('en-US'); const pc = n => Math.round(n / O.total * 100);
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
build({
  slug: 'backlink-strategy', category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-11-02',
  title: 'Backlink Strategy: A 7-Step Plan, Tested on Our Own 30 Links',
  excerpt: `A backlink strategy in 7 steps, using our own ${O.total} external links as the test: ${O.home} point at the homepage. Goals, pages, methods, anchors and a template.`,
  donut: [['BACKLINK', 'STRATEGY'], [['Set a', 'Goal'], 'Audit Links', ['Choose the', 'Pages'], 'Pick Methods', ['Measure', 'Monthly']]],
  cover: { badge: 'OUR OWN LINKS', search: 'backlink strategy', card: 'Our Links report', lines: [`External links: ${O.total}`, `To the homepage: ${O.home}`, `From the top 5 sites: ${O.top5}`, `Internal links: ${f(O.internal)}`], last: 'Search Console, 29 Oct 2026', big: String(O.total), k1: 'external links to our site', k2: `${O.home} point at the homepage`, title: 'Backlink Strategy', sub: 'A 7-step plan, tested on our site' },
  info: { title: `Backlink Strategy: ${D.ok} Guides Read`, sub: 'Organic results for "backlink strategy", Google US, 2 November 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Quality and relevance', sub: 'covered', n: D.quality }, { label: 'DA or DR metrics', sub: 'named', n: D.metrics }, { label: 'Guest posts', sub: 'covered', n: D.guest }, { label: 'Spam or penalty risk', sub: 'mentioned', n: D.spam }, { label: 'Link to Google documentation', sub: 'on the page', n: D.gdoc }],
    rightTitle: 'Our seven steps', rightTag: 'From goal to review', items: [{ t: 'Goal and pages', s: 'what and where' }, { t: 'Audit and methods', s: 'what we have, what fits' }, { t: 'Anchors and outreach', s: 'natural, qualified' }, { t: 'Monthly review', s: 'in the SEO report' }],
    big: String(O.total), noteHtml: `external links in our Links report, <em>${O.home} to the homepage</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for backlink strategy cover`, sub: `Organic results read on 2 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Quality or relevance', `${D.quality} of ${D.ok}`], ['DA or DR metrics', `${D.metrics} of ${D.ok}`], ['Tools such as Ahrefs or Semrush', `${D.tools} of ${D.ok}`], ['Guest posts', `${D.guest} of ${D.ok}`], ['Digital PR', `${D.digitalPr} of ${D.ok}`], ['Linkable content', `${D.content} of ${D.ok}`], ['Competitor research', `${D.competitor} of ${D.ok}`], ['Sell a service or tool', `${D.sells} of ${D.ok}`], ['Spam or penalty risk', `${D.spam} of ${D.ok}`], ['Anchor text', `${D.anchor} of ${D.ok}`], ['Nofollow or sponsored', `${D.nofollow} of ${D.ok}`], ['Goals or KPIs', `${D.goals} of ${D.ok}`], ['Broken link building', `${D.broken} of ${D.ok}`], ['Quote Google', `${D.google} of ${D.ok}`], ['A template', `${D.template} of ${D.ok}`]] },
    ours: { title: 'Our own link inventory', sub: 'Search Console Links report, 29 October 2026.', head: ['Measure', 'Value'], lastBold: false,
      rows: [['External links', String(O.total)], ['Pointing at the homepage', `${O.home} (${pc(O.home)}%)`], ['From the top 5 sites', `${O.top5} (${pc(O.top5)}%)`], ['From two profile sites', `${O.prof} (${pc(O.prof)}%)`], ['Internal links', f(O.internal)], ['Top link texts', O.texts.join(', ')]] },
    steps: { title: 'The seven steps of our backlink strategy', sub: 'Our plan.', head: ['Step', 'What you do'], lastBold: false,
      rows: [['1 Goal', 'Pick pages and a measure'], ['2 Audit', 'Read your Links report'], ['3 Pages', 'Choose pages worth linking to'], ['4 Methods', 'Pick ways that fit those pages'], ['5 Anchors', 'Plan natural anchors and qualify paid links'], ['6 Outreach', 'Ask a short list well'], ['7 Review', 'Check monthly against a baseline']] }
  },
  content: h => `${h.updated}

<p>A <strong>backlink strategy</strong> is a written plan for which pages you want links to, who might link to them and how you will ask, with a way to measure whether it worked. We read ${D.ok} pages that rank for "backlink strategy" on 2 November 2026. All ${D.ok} talk about quality or relevance and ${D.metrics} about DA or DR metrics, ${D.guest} cover guest posts and ${D.content} cover linkable content, but only ${D.steps} gives numbered steps, ${D.template} gives a template and none links to Google's documentation.</p>

<p>This guide gives seven steps and a template, with our own Links report as the test: ${O.total} external links to our site, ${O.home} of them to the homepage. It also covers what Google's rules say about how links may be built. For the outreach side, see our guides to <a href="/blog/blogger-outreach">blogger outreach</a>, <a href="/blog/white-hat-link-building">white hat link building</a> and <a href="/blog/pr-link-building">PR link building</a>.</p>

<h2>What Is a Backlink Strategy? (And What It Is Not)</h2>
<p>A backlink strategy answers four questions: which pages need links, why those pages, how you will earn links to them and how you will know it worked. It is not a list of sites to get listed on, and it is not a promise of a number of links per month. The best strategies in the guides we read start from the pages and the goal, not from the tactics, but only ${D.goals} of ${D.ok} mention goals or KPIs.</p>

<h2>Backlink Strategy: What ${D.ok} Ranking Guides Say</h2>
${h.fig('serp', 'Table of what 7 pages on backlink strategy cover: quality, DA or DR metrics and tools in all 7, guest posts, digital PR, linkable content and competitor research in 6, spam risk in 5 and none linking Google documentation')}
<p>The median guide has about ${f(D.median)} words, and ${D.sells} of ${D.ok} also sell a service. ${D.competitor} of ${D.ok} recommend competitor research, ${D.broken} broken link building, ${D.anchor} discuss anchor text and ${D.nofollow} mention nofollow or sponsored links. ${D.spam} touch on spam or penalty risk, but none of them link to Google's documentation, which is where the actual rules are. Only ${D.dated} shows a date, and ${D.metrics} lean on third-party metrics such as DA or DR: useful for comparing sites, but Google does not use them.</p>

<h2>Our Starting Point: ${O.total} Links, ${O.home} to the Homepage</h2>
${h.fig('ours', 'Split showing our own link inventory on 29 October 2026: 30 external links, 23 pointing at the homepage, 24 from the top 5 sites, 19 from two profile sites and 10,704 internal links')}
<p>The first step of any strategy is knowing what you have. On 29 October 2026, our Search Console Links report listed ${O.total} external links. ${O.home} (${pc(O.home)}%) point at the homepage. ${O.top5} (${pc(O.top5)}%) come from just five sites, and ${O.prof} (${pc(O.prof)}%) come from two profile pages on directories. The most common link texts are "${O.texts[0]}", "${O.texts[1]}", "${O.texts[2]}", "${O.texts[3]}" and "${O.texts[4]}": brand names, generic words and a tool name. That is a natural-looking set, with no commercial keywords, but it is thin. Our site also has ${f(O.internal)} internal links, so the structure is there; the outside votes are not.</p>

<h2>Step 1: Set a Goal and a Measure</h2>
<p>Write one sentence: "Get links to these pages so they rank for these searches, and measure it by this number." The number can be linking sites to the page, impressions at positions 1 to 10, or clicks. Avoid "more backlinks" as a goal: it counts links, not results. Our goal is to move pages that sit far down the results toward page one, and our measure is the position and click data in Search Console, in the monthly report.</p>

<h2>Step 2: Audit the Links You Already Have</h2>
<p>Open the Links report in Search Console and read three lists: top linked pages, top linking sites and top linking text. Note how many links go to the homepage and how many to inner pages, which sites account for most links, and whether any anchors look forced. Open a few linking pages and check the link is still there and which rel attribute it carries. This is the audit we describe in our guide to <a href="/blog/check-backlinks-of-website">checking backlinks of a website</a>.</p>

<h2>Step 3: Choose the Pages Worth Linking To</h2>
<p>Links help most where a page already has the content to rank. From our own 28 October 2026 export, these are the five non-local pages with the most impressions that sit below position 30:</p>
<table><thead><tr><th>Page</th><th>Impressions</th><th>Average position</th></tr></thead><tbody>
${CAND.map(x => `<tr><td>${x.u}</td><td>${f(x.i)}</td><td>${x.p}</td></tr>`).join('\n')}
</tbody></table>
<p>Google shows these pages to many searchers, but far down the results. A few relevant links could be worth more here than links to a page nobody sees. Pick five to ten pages like this, not your whole site.</p>

<h2>Step 4: Pick Methods That Fit Those Pages</h2>
<ul>
<li><strong>Linkable assets.</strong> ${D.content} of ${D.ok} guides recommend content others want to cite, such as original data. Every post of ours includes data from our own site for this reason.</li>
<li><strong>Digital PR.</strong> ${D.digitalPr} of ${D.ok} cover it: a data story or expert quote pitched to journalists. See our <a href="/blog/pr-link-building">PR link building guide</a>.</li>
<li><strong>Guest posts and outreach.</strong> ${D.guest} of ${D.ok} cover guest posts. Do them for relevant sites with real readers. See <a href="/blog/blogger-outreach">blogger outreach</a>.</li>
<li><strong>Broken link building.</strong> ${D.broken} of ${D.ok} mention it: find a dead link on a relevant page and offer a replacement.</li>
<li><strong>Competitor gaps.</strong> ${D.competitor} of ${D.ok} suggest finding sites that link to competitors but not to you. Use it as a source of ideas, not a list to copy.</li>
</ul>

<h2>Step 5: Plan Anchor Text and Link Qualification</h2>
<p>Keep anchors natural: your brand, the page's name or a descriptive phrase. Google's ${L('https://developers.google.com/search/docs/essentials/spam-policies', 'spam policies')} define link spam as creating links to or from a site primarily to manipulate search rankings, and give as an example links with optimized anchor text in articles, guest posts or press releases distributed on other sites. They also list excessive link exchanges and buying or selling links for ranking purposes. Google says such links are acceptable when qualified: its page on ${L('https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links', 'qualifying outbound links')} says to mark advertisements and paid placements with the sponsored value, and that nofollow is still acceptable although sponsored is preferred. ${D.nofollow} of ${D.ok} ranking guides mention these attributes.</p>

${h.info('Infographic of backlink strategy: 7 ranking guides cover quality, metrics and tools, 6 cover guest posts and digital PR, none link Google documentation, and our own site has 30 external links with 23 pointing at the homepage')}

<h2>Step 6: Do the Outreach</h2>
<p>Choose a short list for each page, write a specific offer for each site and follow up once or twice. The details, including an email template, are in our <a href="/blog/blogger-outreach">blogger outreach guide</a>. Track each contact in a sheet with the site, the page you want linked, the date, the reply and the link URL when it goes live.</p>

<h2>Step 7: Measure and Review Monthly</h2>
<p>Take a baseline before you start and compare monthly: external links, linking sites, links to inner pages, and the impressions, clicks and position of the pages you targeted. Our own baseline is the ${O.total} links above and the position data in our <a href="/blog/monthly-seo-report">monthly SEO report</a>. Links take time to show an effect, so review after at least a few weeks and avoid judging on a single month. If a page you targeted does not move, look at the page before you build more links to it.</p>

<h2>Backlink Strategy Template</h2>
<table><thead><tr><th>Field</th><th>What to write</th></tr></thead><tbody>
<tr><td>Goal</td><td>The searches and the measure</td></tr>
<tr><td>Target page</td><td>The URL and why it deserves links</td></tr>
<tr><td>Link asset</td><td>The data, tool or guide others would cite</td></tr>
<tr><td>Method</td><td>Outreach, digital PR, guest post, broken link</td></tr>
<tr><td>Prospects</td><td>Sites, with the reason each is relevant</td></tr>
<tr><td>Anchor and rel</td><td>Planned anchor, and whether the link is paid</td></tr>
<tr><td>Status and date</td><td>Asked, replied, live, with dates</td></tr>
<tr><td>Result</td><td>Position and clicks next month</td></tr>
</tbody></table>
<p>Use our <a href="/tools/link-prospect-scorer">link prospect scorer</a> to rank prospects, and the <a href="/tools/backlink-monitor-tool">backlink monitor</a> to track whether links stay live.</p>

<h2>Backlink Strategy Example: How We Would Run It</h2>
<p>This is an illustration of how we would apply the steps to our own site, not a result. Goal: lift the five pages in the table above toward page one. Audit: the ${O.total} links above, with ${O.home} on the homepage. Method: pitch the data in each page to relevant sites and offer a replacement for broken links where we find them. Anchors: brand or page name. Measure: the position and clicks of those five pages in each monthly report, compared with the 28 October baseline. We will report what happens in our reports rather than promise it here.</p>

<h2>Backlink Strategy for an Ecommerce Site</h2>
<p>The steps are the same, but the target pages differ. Category pages and a few product guides usually earn links more easily than individual product pages, so start by asking which pages already earn impressions and could convert. Do not send every link to the home page, and be careful with free products offered in exchange for links: Google lists sending someone a product in exchange for them writing about it and including a link as an example of buying or selling links for ranking purposes, and says such links should be qualified with sponsored or nofollow.</p>

<h2>Finding Linkable Assets on Your Own Site</h2>
<p>A linkable asset is something another site has a reason to cite. Look through your own pages for three kinds: original numbers, free tools and clear explanations that save a reader time. Our own examples are the data in each post, such as the scans and tests we run on our own pages, and our free tools, like the <a href="/tools/dofollow-link-checker">dofollow link checker</a>, which sits on the list of pages above. When you pitch a page, lead with the asset, not with the request: "we measured this, you might want it for your article on that" is easier to say yes to than "please link to us".</p>

<h2>How Many Links Per Month? Why We Do Not Set a Number</h2>
<p>Many plans start with a target such as ten links a month. The trouble is that a number of links says nothing about whether the right pages are earning them from the right sites, and a target can push you toward easy, low-value links. We set the target on pages and positions instead: which pages should move, and by when we will review them. If the review shows a page has gained relevant links but has not moved, the next step is to improve the page, not to chase more links.</p>

<h2>What to Do With the Links You Earn</h2>
<ul>
<li><strong>Check each link once it is live:</strong> the page loads, the link is in the body and the rel attribute is what you agreed.</li>
<li><strong>Note it in your sheet,</strong> with the date, the page and the anchor.</li>
<li><strong>Link to the target page from your own pages,</strong> so visitors from the new link have somewhere to go.</li>
<li><strong>Update the target page</strong> if it is out of date, since a link to a stale page wastes the visit.</li>
<li><strong>Thank the person,</strong> and keep the relationship: a good contact can lead to the next piece.</li>
</ul>

<h2>Backlink Strategy Consulting: When to Hire Help</h2>
<p>Hire help when you have the pages and the goal but not the time to run outreach, or when you want a second opinion on a plan. Before you sign, ask what the first month will produce, which sites the links will come from and whether you can see them before they go live, how paid placements are marked and how results will be reported. These are the same questions we list for blogger outreach agencies. We offer <a href="/services/link-building">link building</a> ourselves, so judge us by them as well.</p>

<h2>A Backlink Strategy Checklist Before You Start</h2>
<ol>
<li>I have a written goal and a measure.</li>
<li>I have read my Links report and know where my links point.</li>
<li>I have chosen five to ten target pages and checked each one is worth linking to.</li>
<li>I know which method fits each page.</li>
<li>I know which links might be paid and how I will qualify them.</li>
<li>I have a baseline in my monthly report to compare against.</li>
</ol>

<h2>Common Backlink Strategy Mistakes</h2>
<ul>
<li><strong>Starting with tactics instead of pages.</strong></li>
<li><strong>Sending every link to the homepage,</strong> as our own report shows: ${O.home} of ${O.total}.</li>
<li><strong>Chasing DA or DR.</strong> They are third-party scores, not Google's.</li>
<li><strong>Buying links without qualifying them.</strong> Google asks for sponsored or nofollow.</li>
<li><strong>Judging after one month.</strong> Review after a few weeks, with a baseline.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A backlink strategy is a plan for which pages need links, how you will earn them and how you will measure the result.</li>
<li>All ${D.ok} ranking guides discuss quality, but only ${D.template} gives a template and none links to Google.</li>
<li>Our own report shows ${O.total} external links, ${O.home} on the homepage and ${O.prof} from two profile pages.</li>
<li>Choose pages that already have impressions but sit far down the results.</li>
<li>Keep anchors natural, qualify paid links and review monthly against a baseline.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a backlink strategy?', 'A written plan for which pages need links, who might link to them, how you will ask and how you will measure the result.'],
    ['What is a good backlink strategy?', 'One that starts from pages and goals, earns relevant links with content others want to cite, keeps anchors natural and is reviewed monthly.'],
    ['How many backlinks do I need?', 'There is no fixed number. What matters is that the pages you want to rank have links from relevant sites, and that you measure results.'],
    ['Should I send all backlinks to my homepage?', 'No. Send links to the pages you want to rank. In our report, 23 of 30 links point at the homepage, which we want to change.'],
    ['Are DA and DR important for a backlink strategy?', 'They help compare sites, but they are third-party scores. Google does not use them.'],
    ['Is it safe to buy backlinks?', 'Google lists buying or selling links for ranking purposes as link spam, unless they are qualified with sponsored or nofollow.'],
    ['What is the best way to get backlinks?', 'It depends on the page. Guides most often recommend linkable content, digital PR, guest posts and outreach.'],
    ['How long does a backlink strategy take to work?', 'Weeks to months. Review monthly against a baseline and avoid judging on one month.'],
    ['Do you have a backlink strategy template?', 'Yes. The table above lists the fields: goal, target page, link asset, method, prospects, anchor, status and result.']
  ])}
`
});
