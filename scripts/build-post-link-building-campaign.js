// Builds the "link building campaign" post + assets. node scripts/build-post-link-building-campaign.js [--write]
// Data: the 8 organic pages for "link building campaign" (Google US, read 17 Oct 2026). Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'link-building-campaign';
const R = require('../../keyword-research/serp-link-building-campaign-2026-10-17.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { shown: R.length, ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], goal: c(o => o.goal), kpi: c(o => o.kpi), budget: c(o => o.budget), timeline: c(o => o.timeline), template: c(o => o.template), followUp: c(o => o.followUp), tools: c(o => o.tools), cases: c(o => o.caseStudy), report: c(o => o.report), nofollow: c(o => o.nofollow), policy: c(o => o.googlePolicy), relevance: c(o => o.relevance), broken: c(o => o.broken) };
const exp = { shown: 8, ok: 8, median: 1935, goal: 7, kpi: 2, budget: 3, timeline: 3, template: 5, followUp: 3, tools: 7, cases: 3, report: 5, nofollow: 4, policy: 0, relevance: 7, broken: 6 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['LINK BUILDING', 'CAMPAIGN'], [['Set Goals', 'and KPIs'], 'Baseline Your Links', ['Pick Pages', 'to Lift'], 'Run Outreach', ['Report and', 'Review']]);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'link building campaign', card: `Pages read: ${D.ok} of ${D.shown}`,
  lines: [`Median page length: ${f(D.median)} words`, `Mention goals: ${D.goal} of ${D.ok}`, `Name KPIs or metrics: ${D.kpi} of ${D.ok}`, `Give a timeline: ${D.timeline} of ${D.ok}`, `Mention Google policy: ${D.policy} of ${D.ok}`],
  last: 'Set KPIs before outreach', big: `${D.kpi} of ${D.ok}`, k1: 'ranking pages name', k2: 'KPIs for a campaign', title: 'Link Building Campaign', sub: `What ${D.ok} ranking pages say, and skip` });
fs.writeFileSync(path.join(__dirname, 'infographic-link-building-campaign.html'), L.infographicHtml({
  title: `Link Building Campaign: ${D.ok} Pages Read`, sub: 'Organic results for "link building campaign", Google US, 17 October 2026',
  leftTitle: 'What the ranking pages mention', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
  bars: [{ label: 'Goals', sub: 'say to set a goal', n: D.goal }, { label: 'Relevance', sub: 'topical fit of sites', n: D.relevance }, { label: 'Outreach templates', sub: 'email examples', n: D.template }, { label: 'A timeline', sub: 'weeks or months', n: D.timeline }, { label: 'KPIs or metrics', sub: 'how to measure it', n: D.kpi }],
  rightTitle: 'Add before you start', rightTag: 'What most pages leave out', items: [
    { t: 'Two or three KPIs', s: 'target pages, not link counts' }, { t: 'A baseline export', s: 'links and Search Console' },
    { t: 'A 90-day plan', s: 'research, outreach, review' }, { t: 'Google link rules', s: 'sponsored and nofollow' }],
  big: `${D.policy} of ${D.ok}`, noteHtml: `pages mention <em>Google's link spam policy</em>, and only ${D.kpi} name a KPI. Set both before outreach.` }));
fs.writeFileSync(path.join(__dirname, 'table-link-building-campaign-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for link building campaign say`, sub: `Organic results read on 17 October 2026 (${D.shown} listed, ${D.ok} returned a readable page). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Goals or objectives', `${D.goal} of ${D.ok}`], ['Relevance, niche or topical fit', `${D.relevance} of ${D.ok}`], ['Named link building tools', `${D.tools} of ${D.ok}`], ['Outreach templates or subject lines', `${D.template} of ${D.ok}`], ['Reporting', `${D.report} of ${D.ok}`], ['Nofollow or sponsored', `${D.nofollow} of ${D.ok}`], ['Budget or cost', `${D.budget} of ${D.ok}`], ['A timeline', `${D.timeline} of ${D.ok}`], ['Follow-up emails', `${D.followUp} of ${D.ok}`], ['KPIs or metrics to track', `${D.kpi} of ${D.ok}`], ['Google spam policy or link schemes', `${D.policy} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-link-building-campaign-plan.html'), L.tableHtml({ title: 'A 90-day link building campaign plan', sub: 'A planning template, not a result. Adjust the weeks to your team size and the pages you want to lift.',
  head: ['Weeks', 'Phase', 'Output'], lastBold: false,
  rows: [['1', 'Goals and baseline', 'KPIs agreed, links and Search Console exported'], ['2', 'Pages and assets', 'Target pages chosen, linkable asset ready'], ['3 to 4', 'Prospecting', 'Relevant sites listed and checked'], ['5 to 8', 'Outreach wave 1', 'Emails sent, replies logged, follow-up once'], ['9 to 10', 'Outreach wave 2', 'Second tactic or new angle'], ['11', 'Verification', 'Live links checked: URL, anchor, attribute'], ['12 to 13', 'Report and review', 'Results against KPIs, next campaign decided']] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [900, 600]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const g = sz(path.join(pr, 'google-link-spam-policy-examples.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>A <strong>link building campaign</strong> is a planned, time-boxed effort to earn backlinks to specific pages, with a goal, a target list, an outreach method and a report at the end. Before writing this guide we read the ${D.ok} pages that rank on Google US for the term. ${D.goal} of ${D.ok} tell you to set a goal, but only ${D.kpi} name a KPI, only ${D.timeline} give a timeline and none mention Google's link spam policy. This guide fills those gaps with a plan you can run in 90 days.</p>

<p>Below you will find what a campaign is and is not, what the ranking pages say, a step-by-step method, a 90-day plan, how to choose link building tactics, what it costs, how to report and the mistakes that sink most campaigns. If you want the overview of strategy first, start with our guide to <a href="/blog/automated-link-building-2026">automated link building</a> to understand what to avoid.</p>

<h2>What a Link Building Campaign Is, and Is Not</h2>
<p>A campaign has a start and an end. It answers a question such as "get our three service pages cited by relevant industry sites in the next quarter". That separates it from a link building strategy, which is the broad approach, and from link building plan documents that list ideas without dates. A campaign is also not a count of links bought. It is a set of actions (research, outreach, content, follow-up) aimed at specific pages, followed by a check of what changed. People search for it as link building campaigns, a link building plan, SEO link building strategy or link building tactics, and the same structure answers all of them.</p>

<h2>What the Ranking Pages Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-building-campaign-serp.png" alt="Table of what 8 pages ranking for link building campaign mention: goals 7, relevance 7, tools 7, outreach templates 5, reporting 5, nofollow or sponsored 4, budget 3, timeline 3, follow-up emails 3, KPIs 2, Google spam policy 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Goals are standard, measurement is not.</strong> ${D.goal} of ${D.ok} say to set goals, yet only ${D.kpi} mention KPIs or how to measure success.</li>
<li><strong>Relevance is the common thread.</strong> ${D.relevance} of ${D.ok} stress relevant sites, which agrees with the guidance in our piece on <a href="/blog/relevant-backlinks">relevant backlinks</a>.</li>
<li><strong>Tools and templates are plentiful.</strong> ${D.tools} of ${D.ok} name tools and ${D.template} include outreach templates or subject lines.</li>
<li><strong>Few give a schedule or a price.</strong> ${D.timeline} of ${D.ok} give a timeline and ${D.budget} mention budget or cost.</li>
<li><strong>Google's rules are missing.</strong> ${D.policy} of ${D.ok} mention Google's spam policy, and ${D.nofollow} mention nofollow or sponsored links.</li>
</ul>

<h2>Step 1: Set the Goal and Two or Three KPIs</h2>
<p>Write one sentence that names the pages and the outcome: "Lift our pricing guide and two comparison pages in Google over the next quarter." Then choose two or three KPIs you can read from free data. Good ones are the number of new referring pages that link to those target pages, impressions and clicks for the target pages in Search Console, and conversions from those pages. Avoid a KPI that is only a total link count, because it rewards low-value links.</p>

<h2>Step 2: Export a Baseline</h2>
<p>You cannot show progress without a starting point. In Search Console, open Links and export the top linked pages and the top linking sites. Note impressions and clicks for each target page over the last three months. Our own Links report showed 13 external links from 4 linking sites when we checked it, which tells us exactly how small our starting point is, and how any new link will show up. Our guide to <a href="/blog/check-backlinks-of-website">checking the backlinks of a website</a> shows the free method.</p>

<h2>Step 3: Choose the Pages to Lift and the Asset That Earns Links</h2>
<p>Commercial pages rarely attract links on their own. Choose a helpful asset that supports each target page: original data, a free tool, a clear template or a guide that answers a question better than the pages that exist. The asset is what you pitch. Link to it from the target page so authority flows inward. Our work on <a href="/blog/internal-link-building">internal link building</a> explains how to move that value around the site.</p>

<h2>Step 4: Build and Vet the Prospect List</h2>
<p>List 30 to 50 sites that already link to similar pages, or that publish lists and articles where your asset fits. Check each for topic match, recent posts and real readers. Remove sites that sell links or have no audience. Record the contact, the page you would like a link on and the reason it fits. The ${D.relevance} of ${D.ok} pages that stress relevance are right: a short, relevant list beats a long, loose one.</p>

<h2>Step 5: Run Outreach in Waves</h2>
<p>Send in waves so you can learn from replies. Start with the tactic with the clearest fit, such as a <a href="/blog/resource-page-link-building">resource page suggestion</a> or a <a href="/blog/find-broken-backlinks">broken link replacement</a>. Keep emails short, name something specific from the page and ask for one thing. You can draft them with the free <a href="/tools/outreach-email-generator">link building outreach email generator</a>. Send one follow-up after about a week. ${D.followUp} of ${D.ok} ranking pages mention follow-ups, and they are where many replies come from.</p>

<h2>A 90-Day Link Building Campaign Plan</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/link-building-campaign-plan.png" alt="Table of a 90-day link building campaign plan: weeks 1 goals and baseline, week 2 pages and assets, weeks 3 to 4 prospecting, weeks 5 to 8 outreach wave 1, weeks 9 to 10 wave 2, week 11 verification, weeks 12 to 13 report and review" width="1280" height="@@PLANH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>This is a template, not a result. A small team may stretch it to 120 days, and a campaign built around a new asset needs extra time for creation. What matters is that every week has an output, and that verification and review are scheduled, not left for later.</p>

<h2>A Simple Tracking Sheet for the Campaign</h2>
<p>You do not need special software to run a campaign. A spreadsheet with one row per prospect covers it. Use these columns: site, contact, page you want a link on, tactic, date emailed, reply, follow-up date, outcome, live URL, anchor text, link attribute and target page. Add a second tab for the baseline numbers and a third for the monthly KPI readout. The discipline is in keeping it current: log every reply the same day, and mark a prospect closed after one follow-up, so you never chase the same person twice.</p>
<p>At the end of each wave, count three numbers: how many emails you sent, how many replies you received and how many links went live. Those ratios are your own data, and they are more useful than anyone else's average, because they reflect your niche, your asset and your emails. If replies are high but links are low, the asset or the ask is the problem. If replies are low, look at the list and the subject lines.</p>

<h2>Small Site or Large Site: How the Campaign Changes</h2>
<p>A small site with a few dozen pages should run a narrow campaign: one target page, one asset, 20 to 30 well-chosen prospects and one tactic. The baseline is small, so even a few links are visible in Search Console. A larger site can run several campaigns in parallel, one per target page or topic, each with its own KPIs, but should keep the sheets separate so results do not blur. In both cases the asset matters more than the number of emails. A page that already answers a question better than the existing results gives the recipient a reason to link, and it keeps working after the campaign ends.</p>

<h2>Do It Yourself, Hire a Freelancer or Use an Agency</h2>
<p>Run the first campaign yourself if you can, even on a small scale. It teaches you what replies look like and what a link costs in time. Hire a freelancer when you know the process and need capacity. Use an agency when you want strategy, outreach and reporting handled together. Whichever you choose, ask for the same things you would set yourself: the goal, the KPIs, a sample of target sites before outreach, a report that lists every live link and a policy for links that disappear. If you resell the work, our guide to <a href="/blog/white-label-link-building">white label link building</a> covers the extra checks.</p>

<h2>Which Link Building Tactics Fit Which Campaign</h2>
<ul>
<li><strong>Resource page suggestions</strong> suit a useful reference asset and a niche with curated lists.</li>
<li><strong>Broken link replacement</strong> suits when you have a close match for a dead page on a relevant site.</li>
<li><strong>Link insertions</strong> suit an asset that adds detail to an existing article.</li>
<li><strong>Guest articles</strong> suit when you can offer real expertise to an audience you want to reach, with the link as context, not the point.</li>
<li><strong>Digital PR and data</strong> suit original research that journalists and bloggers can cite.</li>
<li><strong>Unlinked mentions</strong> suit when your brand is already named without a link.</li>
</ul>
<p>Pick one or two tactics per campaign. Doing six at once spreads effort and makes results impossible to read.</p>

<h2>Link Building Cost: What a Campaign Takes</h2>
<p>A campaign costs time, plus tools and sometimes freelancers or an agency. If you buy services, divide the price by live links to compare. In our reading of SaaS link building pages, published prices worked out to about $100 to $300 per link, which we cover in our guide to <a href="/blog/saas-link-building-services">SaaS link building services</a>. Do not budget only for links. Budget for the asset, the outreach time and the reporting.</p>

<h2>What Google's Link Spam Policy Means for Your Campaign</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-link-spam-policy-examples.png" alt="Google Search Central link spam policy excerpt listing buying or selling links for ranking, excessive link exchanges, automated link creation, and the note that links are acceptable when qualified with nofollow or sponsored" width="${g[0]}" height="${g[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Google's spam policy defines link spam as creating links to or from a site primarily to manipulate rankings. Its examples include exchanging money, goods or services for links, excessive link exchanges, using automated programs to create links, and advertorials where payment is received for articles with links that pass ranking credit. It also says buying and selling links is a normal part of the web as long as the links are qualified with <code>nofollow</code> or <code>sponsored</code>. For a campaign, that means two rules: earn links on merit, and mark any paid placement.</p>

<h2>Link Building Reporting: What to Track</h2>
<p>Report monthly during the campaign and once at the end. List each new live link with its URL, anchor, link attribute and target page. Add the KPIs you set at the start: referring pages for the target pages, impressions and clicks from Search Console, and conversions. Note what you did in the same period, because content or site changes also move results. Our <a href="/tools/seo-report-generator">SEO report generator</a> turns the Search Console numbers into a one-page summary, and the <a href="/tools/dofollow-link-checker">dofollow link checker</a> confirms each link's attribute.</p>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-link-building-campaign.png" alt="Infographic of what 8 pages ranking for link building campaign mention and what to add before you start a campaign" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Common Link Building Campaign Mistakes</h2>
<ul>
<li><strong>No KPI.</strong> Without one you cannot tell whether the campaign worked.</li>
<li><strong>Chasing volume.</strong> A few relevant links to target pages beat dozens of unrelated ones.</li>
<li><strong>Skipping the asset.</strong> Pitching a plain service page earns few links. Give people something worth citing.</li>
<li><strong>Ignoring verification.</strong> Links fail to appear or are removed. Check each live link.</li>
<li><strong>Changing too much at once.</strong> If you also rewrite pages, results are hard to attribute.</li>
<li><strong>Forgetting Google's rules.</strong> Paid and exchanged links need care and marking.</li>
</ul>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the ${D.shown} organic results for one query on one day (Google US, 17 October 2026); all ${D.ok} returned a readable page.</li>
<li>Counts show whether a page mentions a term, not how well it explains it.</li>
<li>The 90-day plan is a template based on common practice, not a measured result.</li>
<li>Google's policy wording comes from its Search Central spam policies, read on 17 October 2026.</li>
<li>Results in other countries or at other times will differ, so rerun the check on your own market.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A campaign has a goal, two or three KPIs, a baseline, a target list and an end date.</li>
<li>Only ${D.kpi} of ${D.ok} ranking pages name KPIs, and none mention Google's link rules. Add both.</li>
<li>Run outreach in waves with one or two tactics and one follow-up.</li>
<li>Verify every live link and report against your KPIs.</li>
<li>Earn links on merit and mark any paid placement as sponsored or nofollow.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is a link building campaign?</summary>
<p>It is a planned, time-boxed effort to earn backlinks to specific pages, with a goal, KPIs, a target list, outreach and a final report.</p>
</details>
<details>
<summary>How long should a link building campaign run?</summary>
<p>A 90-day campaign is a practical length: a few weeks to plan, several weeks of outreach, then verification and review. Campaigns that need a new asset usually take longer.</p>
</details>
<details>
<summary>How do I make a link building plan?</summary>
<p>Set a goal for named pages, choose KPIs, export a baseline, pick an asset, build a vetted list, schedule outreach in waves and decide when you will report.</p>
</details>
<details>
<summary>What KPIs should I use for link building?</summary>
<p>New referring pages to the target pages, impressions and clicks for those pages, and conversions. Avoid using only the total number of links.</p>
</details>
<details>
<summary>What is the best SEO link building strategy?</summary>
<p>The best one earns relevant links to pages that support your business. Pick one or two tactics, such as resource pages or broken link replacement, and build a useful asset to pitch.</p>
</details>
<details>
<summary>What are common link building tactics?</summary>
<p>Resource page suggestions, broken link replacement, link insertions, guest articles, digital PR with original data and asking for links on unlinked mentions.</p>
</details>
<details>
<summary>How much does link building cost?</summary>
<p>It depends on whether you do it yourself or buy services. Providers in our reading of SaaS pages publish roughly $100 to $300 per link, so divide any price by live links.</p>
</details>
<details>
<summary>How do I report on a link building campaign?</summary>
<p>List each live link with its URL, anchor, attribute and target page, then show your KPIs against the baseline, with the other changes you made in the same period.</p>
</details>
<details>
<summary>Is buying links part of a campaign?</summary>
<p>Google treats links bought or sold for ranking purposes as link spam unless they are qualified with nofollow or sponsored. Plan around earned links and mark any paid placement.</p>
</details>
</div>
`;
const title = 'Link Building Campaign: A 90-Day Plan With KPIs That Work';
const excerpt = `Link building campaign guide after reading ${D.ok} ranking pages: only ${D.kpi} name a KPI and none mention Google's link rules. A 90-day plan, tactics and reporting.`;
const out = content.replace('@@SERPH@@', sz(path.join(pr, 'link-building-campaign-serp.png'))[1]).replace('@@PLANH@@', sz(path.join(pr, 'link-building-campaign-plan.png'))[1]);
const post = { slug: SLUG, title, category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-17', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
