// node scripts/build-post-pr-link-building.js [--write] — data: 8 readable ranking pages (Google US, 26 Oct 2026), Google spam policies read the same day, and our own measured link data (Oct 2026). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-pr-link-building-2026-10-26.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-2026-10-26.json')[0].linkSpam;
const D = { shown: 9, ok: ok.length, median: Math.round((w[3] + w[4]) / 2), journalist: c('journalist'), haro: c('haro'), data: c('data'), newsjack: c('newsjack'), pressRelease: c('pressRelease'), expert: c('expert'), cost: c('cost'), kpi: c('kpi'), risk: c('risk'), policy: c('policy'), nofollow: c('nofollow'), caseStudy: c('caseStudy'), pitch: c('pitch'), tools: c('tools'), timeline: c('timeline'), ai: c('ai'), define: c('define'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { shown: 9, ok: 8, median: 2248, journalist: 7, haro: 7, data: 7, newsjack: 5, pressRelease: 5, expert: 6, cost: 5, kpi: 7, risk: 6, policy: 2, nofollow: 1, caseStudy: 6, pitch: 8, tools: 8, timeline: 6, ai: 7, define: 6, gdoc: 2, dated: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
if (!G.includes('press releases distributed on other sites') || !G.includes('Advertorials or native advertising')) throw new Error('Google link spam text changed');
console.log(JSON.stringify(D));
build({
  slug: 'pr-link-building', category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-26',
  title: 'PR Link Building: What 8 Guides Say About Risk and Reporting',
  excerpt: `PR link building explained: ${D.ok} top guides read, only ${D.nofollow} mentions nofollow, and Google's rule on press releases with optimized anchors. A step-by-step plan.`,
  donut: [['PR LINK', 'BUILDING'], [['Find a', 'Real Story'], 'Back It With Data', ['Pitch the', 'Right Writer'], 'Measure Live Links', ['Respect', 'The Rules']]],
  cover: { badge: 'REAL SERP CHECK', search: 'pr link building', card: `Guides read: ${D.ok} of ${D.shown}`, lines: [`Mention journalists: ${D.journalist} of ${D.ok}`, `Mention original data: ${D.data} of ${D.ok}`, `Mention measuring results: ${D.kpi} of ${D.ok}`, `Mention nofollow: ${D.nofollow} of ${D.ok}`], last: 'Few explain how links are marked', big: `${D.nofollow} of ${D.ok}`, k1: 'guides mention', k2: 'nofollow or sponsored', title: 'PR Link Building', sub: 'What guides say about risk and reporting' },
  info: { title: `PR Link Building: ${D.ok} Guides Read`, sub: 'Organic results for "pr link building", Google US, 26 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Pitching and outreach', sub: 'covered', n: D.pitch }, { label: 'Journalists named', sub: 'as the audience', n: D.journalist }, { label: 'Original data or research', sub: 'as a hook', n: D.data }, { label: 'Measuring results', sub: 'kpis or tracking', n: D.kpi }, { label: 'Nofollow or sponsored', sub: 'explained', n: D.nofollow }],
    rightTitle: 'A clean PR link plan', rightTag: 'Four steps', items: [{ t: 'Start with a story', s: 'data or a clear opinion' }, { t: 'Pitch one writer', s: 'personal, specific' }, { t: 'Track live links', s: 'and their rel' }, { t: 'Avoid wire spam', s: 'no keyword anchors' }],
    big: `${D.nofollow} of ${D.ok}`, noteHtml: `guides explain <em>nofollow or sponsored</em> links while teaching PR link building.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for PR link building say`, sub: `Organic results for "pr link building" read on 26 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Pitching or outreach', `${D.pitch} of ${D.ok}`], ['Journalists, reporters or editors', `${D.journalist} of ${D.ok}`], ['Journalist request platforms', `${D.haro} of ${D.ok}`], ['Original data, research or studies', `${D.data} of ${D.ok}`], ['Measuring results (KPIs, tracking)', `${D.kpi} of ${D.ok}`], ['Expert commentary or thought leadership', `${D.expert} of ${D.ok}`], ['Newsjacking or reactive PR', `${D.newsjack} of ${D.ok}`], ['Press releases', `${D.pressRelease} of ${D.ok}`], ['Risk or penalties', `${D.risk} of ${D.ok}`], ["Name Google's policy", `${D.policy} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`]] },
    google: { title: "What Google says about press releases and paid articles", sub: 'Examples quoted from the link spam section of Google Search Central spam policies, read on 26 October 2026. The right column is our reading.', head: ["Google's example of link spam", 'What it means for PR'], lastBold: false,
      rows: [['Advertorials or native advertising where payment is received for articles with links that pass ranking credit', 'Paid coverage needs a sponsored or nofollow link'], ['Links with optimized anchor text in press releases distributed on other sites', 'Do not stuff keyword anchors into wire releases'], ['Buying or selling links for ranking purposes', 'Do not pay journalists or editors for links'], ['Sending someone a product in exchange for a link', 'Review copies should not be tied to a link']] },
    plan: { title: 'A step-by-step PR link plan', sub: 'Our working method for a small team. Times are estimates.', head: ['Step', 'What you do', 'Time'], lastBold: false,
      rows: [['1. Find a story', 'Pick data, a clear opinion or a timely angle', '1 week'], ['2. Build the proof', 'Run the study or write the piece, with sources', '1 to 3 weeks'], ['3. Build a media list', 'List writers who cover the topic, with recent articles', '2 days'], ['4. Pitch in small waves', 'Send 5 to 10 personal emails, then one follow-up', '1 week'], ['5. Track and record', 'Log live links, their rel and the coverage', 'Ongoing']] }
  },
  content: h => `${h.updated}

<p><strong>PR link building</strong> is earning links from news sites, blogs and trade publications by giving writers something worth covering, such as data, expert comment or a timely story. We read ${D.ok} pages that rank for the term on 26 October 2026. ${D.pitch} of ${D.ok} teach pitching and ${D.kpi} of ${D.ok} mention measuring results, but only ${D.nofollow} of ${D.ok} explain how nofollow or sponsored links work, and only ${D.policy} of ${D.ok} name Google's policy, although Google's spam policies list press releases with optimized anchors as link spam.</p>

<p>This guide gives you what the ${D.ok} pages cover and skip, what Google says about press releases and paid articles, a step-by-step plan, and how to track results. For the bigger picture of how links are obtained, see <a href="/blog/link-acquisition">link acquisition</a>, and for a rules-first view, <a href="/blog/white-hat-link-building">white hat link building</a>.</p>

<h2>What PR Link Building Means</h2>
<p>${D.define} of the ${D.ok} pages define it, and the definitions agree: you create or find a story, offer it to people who write for an audience, and a link to your site appears in what they publish because it helps the reader. The key phrase is "because it helps the reader". A link from a news story or industry article is an editorial link, the kind we describe in <a href="/blog/editorial-backlinks">editorial backlinks</a>. It is not the same as a link from a paid post or a press release distributed to many sites, which Google treats differently.</p>

<h2>What ${D.ok} Top Pages Cover, and Skip</h2>
${h.fig('serp', 'Table of what 8 PR link building guides cover: pitching in 8 of 8, journalists, journalist request platforms and original data in 7, measuring results in 7, risk in 6, Google policy in 2 and nofollow or sponsored in 1')}
<p>The pages cover the craft well. Pitching appears in ${D.pitch} of ${D.ok}, journalists in ${D.journalist}, request platforms in ${D.haro}, original data in ${D.data}, expert commentary in ${D.expert}, newsjacking in ${D.newsjack} and press releases in ${D.pressRelease}. ${D.caseStudy} of ${D.ok} give examples, ${D.tools} of ${D.ok} recommend tools, ${D.ai} of ${D.ok} mention AI, and ${D.timeline} of ${D.ok} talk about how long results take. They run a median of ${h.f(D.median)} words.</p>
<p>On rules and reporting, coverage thins. ${D.risk} of ${D.ok} mention risk, but ${D.policy} name Google's policy, ${D.gdoc} link to Google's documentation, ${D.dated} show a date, and ${D.nofollow} explain nofollow or sponsored. For a method whose output is a link, that is the gap that matters: a reader can learn how to pitch a journalist and still not learn that paid coverage should be qualified or that keyword anchors in distributed releases are on Google's list.</p>

<h2>What Google Says About PR and Paid Coverage</h2>
${h.fig('google', "Table of Google link spam examples relevant to PR: advertorials with links that pass ranking credit, optimized anchors in distributed press releases, buying or selling links for ranking, and sending a product in exchange for a link")}
<p>Google's spam policies define link spam as creating links to or from a site primarily to manipulate search rankings. Four of its examples touch PR directly, as quoted in our table: advertorials or native advertising where payment is received for articles that include links passing ranking credit; links with optimized anchor text in press releases distributed on other sites; buying or selling links for ranking purposes; and sending someone a product in exchange for them writing about it and including a link. The same policy page, in its site reputation section, says wire service or press release service sites are not considered inconsistent with that policy, so press releases are not banned. The concern is manipulation: keyword-rich anchors repeated across distributed releases, or payment for links that pass credit.</p>
<p>Google's separate guidance on qualifying outbound links tells publishers to mark advertisements and paid placements with <code>rel="sponsored"</code>. That is the right label for paid coverage, and a good publisher will apply it. If you want editorial value, earn the coverage; if you pay for exposure, expect the link to be qualified and judge it for the audience, not the ranking credit.</p>

<h2>A Step-by-Step PR Link Plan</h2>
${h.fig('plan', 'Table of a step-by-step PR link plan: find a story, build the proof, build a media list, pitch in small waves, and track and record live links, with time estimates')}
<ol>
<li><strong>Find a story.</strong> ${D.data} of ${D.ok} guides name original data as the best hook. If you cannot run a study, offer a clear, well-argued opinion or an expert quote on something in the news.</li>
<li><strong>Build the proof.</strong> Collect the numbers, name your sources and describe your method. Journalists check. See <a href="/blog/link-building-statistics">link building statistics</a> for an example of a page that dates and sources every figure.</li>
<li><strong>Build a media list.</strong> List writers who cover your topic and have written about it recently. Score each with the <a href="/tools/link-prospect-scorer">link prospect scorer</a> before you contact anyone.</li>
<li><strong>Pitch in small waves.</strong> Send five to ten personal emails with one specific detail from each writer's recent work, then one follow-up. The <a href="/tools/outreach-email-generator">outreach email generator</a> drafts them.</li>
<li><strong>Track everything.</strong> Use the <a href="/tools/link-building-management-tool">link building management tool</a> for the pipeline and the <a href="/tools/backlink-monitor-tool">backlink monitor tool</a> for live links and their rel attributes.</li>
</ol>

${h.info('Infographic of what 8 PR link building guides cover: pitching 8, journalists 7, original data 7, measuring results 7, and only 1 explaining nofollow or sponsored, plus a four-step clean PR link plan')}

<h2>What a Good Hook Looks Like</h2>
<ul>
<li><strong>A number a writer can quote.</strong> One clear finding with a sample size and a date, such as "6 of 13 resource pages had a dead link". Our own study of resource pages is described in <a href="/blog/resource-page-link-building">resource page link building</a>.</li>
<li><strong>A comparison.</strong> How things differ between two groups, places or years.</li>
<li><strong>A timely angle.</strong> A reaction to something in the news that your expertise can explain. ${D.newsjack} of ${D.ok} guides discuss this.</li>
<li><strong>A tool.</strong> A free calculator or checker that a writer can link to for readers. See <a href="/blog/linkable-assets">linkable assets</a>.</li>
</ul>

<h2>How to Build a Media List That Gets Replies</h2>
<p>A media list is a short, researched list of people, not a bought database. Quality matters because ${D.journalist} of ${D.ok} guides name journalists as the audience, yet a mass email to a bought list is the fastest way to be ignored.</p>
<ol>
<li><strong>Start from articles.</strong> Search your topic and note the writers who covered it in the last year, along with the site and the angle they took.</li>
<li><strong>Check each writer's recent work.</strong> Do they cover your angle now, or did they move on? A writer who published on the topic last month is far more likely to care.</li>
<li><strong>Look for a gap.</strong> Does their article use an old figure, a weak source or no source for a claim you can support? That is your opening.</li>
<li><strong>Find a real contact route.</strong> Use the site's author page, the writer's public profile or the contact details they publish. Do not guess personal email addresses.</li>
<li><strong>Score and rank.</strong> Use the six-factor test in <a href="/blog/high-authority-backlinks">high authority backlinks</a> to decide where to start. Relevance and real readers matter more than a score.</li>
</ol>
<p>A list of 20 well-chosen writers will usually do more than a list of 500 chosen by a tool. Log it in the <a href="/tools/link-building-management-tool">link building management tool</a> with the hook you will use for each person.</p>

<h2>Writing the Pitch</h2>
<ul>
<li><strong>Subject line.</strong> Say what it is: "New data on [topic]: [one number]". Avoid hype and avoid a request in the subject.</li>
<li><strong>First line.</strong> Show you read their work: "Your piece on [topic] cited [figure]; we have newer numbers."</li>
<li><strong>The offer.</strong> One or two sentences on what you have: the finding, the sample and the date.</li>
<li><strong>The proof.</strong> A link to the page with the method and the sources, so they can check it.</li>
<li><strong>The ask.</strong> Offer to answer questions or provide a quote. Do not ask for a link. If your page helps their readers, they can decide to link.</li>
<li><strong>The follow-up.</strong> One short reminder a few days later, with something new, and then stop.</li>
</ul>
<p>Keep a record of what each writer said, including polite refusals, because they show which angles to retire.</p>

<h2>When Press Releases Make Sense</h2>
<p>${D.pressRelease} of ${D.ok} guides cover press releases. A release is a way to announce real news in a standard format, and it can help a story reach writers. It is a poor way to build links, for two reasons. Google lists optimized anchor text in distributed press releases as link spam, and many distribution sites mark the links in a release as nofollow or add no editorial endorsement. Use a release when you have news: a launch, a study or an event. Write it for people, link to the page with the details using the page's name rather than a keyword, and treat any link that results as a bonus.</p>

<h2>Examples of PR Angles for a Link Builder</h2>
<ul>
<li><strong>Our own data.</strong> A scan of 13 curated resource pages found 6 with at least one dead link. That is a finding writers who cover link building can use, and we published the method.</li>
<li><strong>A pricing study.</strong> Entry prices on eight AI SEO pricing pages ran from $23 to $139 a month. Writers who cover marketing budgets can quote a range like that.</li>
<li><strong>A "what the guides miss" study.</strong> Only 1 of 8 guides to PR link building explains nofollow or sponsored. A comparison like this helps editors see a gap.</li>
<li><strong>A free tool.</strong> A calculator or checker gives readers something to use, which is a reason for a writer to link.</li>
</ul>
<p>Each of these started as a measurement we could repeat, with a sample size and a date. That is the standard to aim for with any hook, and it is why our guides state both.</p>

<h2>How to Measure PR Link Building</h2>
<p>${D.kpi} of ${D.ok} guides mention measuring, but few say what to measure. We suggest six numbers, all of which you can record by hand:</p>
<ul>
<li><strong>Pitches sent</strong> and how many were personal rather than templated.</li>
<li><strong>Reply rate:</strong> replies divided by pitches. The pipeline tool calculates it for you.</li>
<li><strong>Coverage:</strong> pieces published that mention you, with or without a link.</li>
<li><strong>Live links</strong> and the referring sites, counted once per site.</li>
<li><strong>Link attribute:</strong> followed, nofollow, sponsored or ugc, read from the page.</li>
<li><strong>Cost per live link:</strong> your time and any spend divided by live links. The <a href="/tools/link-building-cost-calculator">link building cost calculator</a> does the sum.</li>
</ul>
<p>Review these monthly. If coverage is high but links are few, you have a reclamation opportunity: ask the writers who mentioned you to add a link, as described in <a href="/blog/link-reclamation">link reclamation</a>. If replies are low, your hook or targeting needs work, not your volume.</p>

<h2>How Much PR Link Building Costs</h2>
<p>${D.cost} of ${D.ok} guides mention cost, but ranges differ a lot, and we did not find a source that explained how prices were set. Rather than quote a figure we cannot support, think in components: your own time or an agency retainer, the cost of producing the data or content, any tools, and the cost of design or distribution. Add them up per campaign, divide by the links that go live, and compare the result with other ways of earning links. For a provider, ask what the price covers and whether it depends on a number of placements, because paying per placement can push a provider toward paid links, which should be marked sponsored.</p>

<h2>Common PR Link Building Mistakes</h2>
<ul>
<li><strong>Sending the same pitch to everyone.</strong> Writers notice, and they ignore it.</li>
<li><strong>Using keyword anchors in distributed releases.</strong> Google lists optimized anchors in distributed press releases as link spam.</li>
<li><strong>Paying for coverage and reporting it as earned.</strong> Keep paid and earned apart and mark paid links sponsored.</li>
<li><strong>Promising a link in a pitch.</strong> Offer something useful and let the writer decide whether to link.</li>
<li><strong>Not tracking.</strong> Although ${D.kpi} of ${D.ok} guides mention measuring, few say what to measure, and without a record you cannot tell which angle worked.</li>
<li><strong>Skipping accuracy.</strong> A wrong number in a pitch can end a relationship.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "pr link building" on Google US, 26 October 2026. ${D.shown} were listed; ${D.ok} returned a readable page (one forum thread was excluded). A topic counts once per page when its term appears in the text.</li>
<li>Google statements come from its spam policies and its guidance on qualifying outbound links, read the same day. Quotations in the table are shortened.</li>
<li>The plan and time estimates are our own working method, not Google guidance.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>PR link building earns editorial links with stories writers want, and ${D.data} of ${D.ok} guides say data is the best hook.</li>
<li>Only ${D.nofollow} of ${D.ok} guides explain nofollow or sponsored, and ${D.policy} name Google's policy.</li>
<li>Google lists keyword anchors in distributed press releases and unqualified paid articles as link spam.</li>
<li>Pitch personally in small waves, and track live links and their attributes.</li>
<li>Keep paid and earned coverage separate.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is PR link building?', 'It is earning links from news sites, blogs and trade publications by giving writers something worth covering, such as data, expert comment or a timely story.'],
    ['Is PR link building the same as digital PR?', 'They overlap heavily. Digital PR usually means PR work done to earn online coverage and links, which is the aim of PR link building.'],
    ['Do press releases still work for links?', 'Google says wire and press release services are not inconsistent with its site reputation policy, but it lists optimized anchor text in distributed press releases as link spam. Use them for news, not for anchors.'],
    ['Are links from news sites nofollow?', 'Some are, some are not. Check the rel attribute of each link. Google asks publishers to mark paid placements sponsored.'],
    ['Can I pay a journalist for a link?', 'Buying or selling links for ranking purposes is on Google\'s link spam list. Paid coverage should be labelled and the link qualified.'],
    ['How long does PR link building take?', 'It varies. Building the story can take weeks and coverage depends on writers\' schedules. ' + D.timeline + ' of ' + D.ok + ' guides discuss timelines but none can promise a result.'],
    ['What makes a good PR hook for links?', 'A clear, sourced finding, a useful comparison, a timely expert view or a free tool a writer can point readers to.'],
    ['How do I measure PR link building?', 'Track pitches, replies, live links, their rel attribute and the referring sites. A pipeline tool and a link log keep it organised.'],
    ['How many links should a PR campaign get?', 'There is no standard number. A few strong editorial links from relevant sites are worth more than many weak ones. See <a href="/blog/high-authority-backlinks">high authority backlinks</a>.']
  ])}
`
});
