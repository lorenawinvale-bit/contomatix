// node scripts/build-post-what-is-a-google-penalty.js [--write], data: 5 readable ranking pages (Google US, 2 Nov 2026), Google's Manual actions report help page, reconsideration help page and spam policies read the same day (full-text word counts in google-docs-penalty-fullcount-2026-11-02.json), our own Search Console Manual actions and Security issues reports (2 Nov 2026) and our own 28 Oct 2026 Search Console export by position. Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-google-penalty-2026-11-02.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-day16-2026-11-02.json'); const F = require('../../keyword-research/google-docs-penalty-fullcount-2026-11-02.json');
for (const [k, s] of [['manual', "Google issues a manual action against a site when a human reviewer at Google has determined that pages on the site are not compliant with Google's spam policies"], ['manual', 'If a site has a manual action, some or all of that site will not be shown in Google search results.'], ['manual', 'we will notify you in the Manual actions report and in the Search Console message center'], ['manual', 'Our algorithms are extremely good at detecting spam, and in most cases we automatically discover it and remove it from our search results.'], ['manual', "you'll see a green check mark"], ['manual', 'Fixing the issue on just some pages will not earn you a partial return to search results.'], ['manual', 'Describes the steps you\'ve taken to fix the issue.'], ['manual', 'Most reconsideration reviews can take several days or weeks'], ['manual', "don't resubmit your request before you get a final decision"], ['reconsider', 'A reconsideration request is a request to have Google review your site after you fix problems identified in a manual action or security issues notification.'], ['spam', 'Sites that violate our policies may rank lower in results or not appear in results at all.'], ['spam', 'automated systems and, as needed, human review that can result in a manual action'], ['spam', 'Scaled content abuse'], ['spam', 'Link spam is the practice of creating links to or from a site primarily for the purpose of manipulating search rankings.']]) if (!G[k].text.includes(s)) throw new Error('Google text changed: ' + s);
if (F.manual.penalty !== 0 || F.manual.manualActionMentions !== 110 || F.spam.penalty !== 1 || F.reconsider.penalty !== 0 || F.manual.panda || F.manual.penguin || F.manual.types.length !== 12) throw new Error('Google word counts changed');
// our own export by position (28 Oct 2026)
const rows = fs.readFileSync(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-28', 'Pages.csv'), 'utf8').trim().split(/\r?\n/).slice(1).map(l => { const m = l.match(/^(.*),(\d+),(\d+),([\d.]*)%?,?([\d.]*)$/); return m ? { c: +m[2], i: +m[3], p: +m[5] } : null; }).filter(Boolean);
const tot = rows.reduce((s, x) => s + x.i, 0), band = (lo, hi) => rows.filter(x => x.p >= lo && x.p < hi).reduce((s, x) => s + x.i, 0);
const B = { total: tot, top10: band(0, 11), p11: band(11, 21), p21: band(21, 51), p51: band(51, 999), pages: rows.length, clicks: rows.reduce((s, x) => s + x.c, 0) };
if (B.total !== 130114 || B.top10 !== 5209 || B.p11 !== 11745 || B.p21 !== 68544 || B.p51 !== 44616 || B.pages !== 433 || B.clicks !== 80) throw new Error('own export changed ' + JSON.stringify(B));
const pct = n => Math.round(n / B.total * 100); const LOW = pct(B.p21 + B.p51);
const D = { listed: 7, ok: ok.length, median: Math.round(w[2]), manual: c('manual'), algo: c('algo'), recovery: c('recovery'), reconsider: c('reconsider'), gsc: c('gsc'), panda: c('panda'), links: c('links'), thin: c('thin'), disavow: c('disavow'), noPenalty: c('noPenalty'), checker: c('checker'), google: c('google'), sells: c('sells'), steps: c('steps'), example: c('example'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 7, ok: 5, median: 2650, manual: 5, algo: 4, recovery: 4, reconsider: 5, gsc: 5, panda: 3, links: 5, thin: 4, disavow: 4, noPenalty: 0, checker: 3, google: 1, sells: 5, steps: 5, example: 4, gdoc: 4, dated: 1 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(B), LOW);
const f = n => n.toLocaleString('en-US');
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
build({
  slug: 'what-is-a-google-penalty', category: 'Technical SEO', author: 'Umaira Liaquat', date: '2026-11-02',
  title: 'What Is a Google Penalty? What Google Says and How to Check',
  excerpt: `What is a Google penalty? Google's own page says manual action ${F.manual.manualActionMentions} times, penalty 0. How to check yours, and why low rankings are not one.`,
  donut: [['GOOGLE', 'PENALTY'], [['Manual', 'Action'], 'Algorithm Changes', ['Check Search', 'Console'], 'Fix and Document', ['Request a', 'Review']]],
  cover: { badge: 'GOOGLE\'S OWN WORDS', search: 'what is a google penalty', card: 'Google\'s manual actions page', lines: [`"manual action": ${F.manual.manualActionMentions} times`, '"penalty": 0 times', `Types of manual action: ${F.manual.types.length}`, 'Our manual actions: none'], last: 'Read 2 November 2026', big: '0', k1: 'times Google\'s manual actions page', k2: 'uses the word penalty', title: 'What Is a Google Penalty?', sub: 'What Google says, how to check' },
  info: { title: `Google Penalties: ${D.ok} Guides Read`, sub: 'Organic results for "what is a google penalty", Google US, 2 November 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Manual actions', sub: 'covered', n: D.manual }, { label: 'Search Console', sub: 'named', n: D.gsc }, { label: 'Recovery steps', sub: 'covered', n: D.recovery }, { label: 'Algorithm updates', sub: 'covered', n: D.algo }, { label: 'Note Google avoids the word', sub: 'penalty', n: D.noPenalty }],
    rightTitle: "Google's own pages", rightTag: 'Read 2 November 2026', items: [{ t: 'Manual action: 110', s: 'mentions on the report page' }, { t: 'Penalty: 0', s: 'mentions on the same page' }, { t: 'Request Review', s: 'after fixing every page' }],
    big: '0', noteHtml: 'times Google\'s manual actions page uses the word <em>penalty</em>, against 110 for manual action.' },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for what is a Google penalty cover`, sub: `Organic results read on 2 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Manual actions', `${D.manual} of ${D.ok}`], ['Reconsideration or review requests', `${D.reconsider} of ${D.ok}`], ['Search Console', `${D.gsc} of ${D.ok}`], ['Unnatural or spam links', `${D.links} of ${D.ok}`], ['Sell a service or tool', `${D.sells} of ${D.ok}`], ['Steps or how-to', `${D.steps} of ${D.ok}`], ['Recovery', `${D.recovery} of ${D.ok}`], ['Disavow', `${D.disavow} of ${D.ok}`], ['Algorithm updates', `${D.algo} of ${D.ok}`], ['Thin or duplicate content', `${D.thin} of ${D.ok}`], ['Examples', `${D.example} of ${D.ok}`], ['Link Google documentation', `${D.gdoc} of ${D.ok}`], ['Panda or Penguin', `${D.panda} of ${D.ok}`], ['A checker tool', `${D.checker} of ${D.ok}`], ['Quote Google', `${D.google} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`]] },
    flow: { title: 'Is my traffic drop a penalty? Five checks', sub: 'Our order.', head: ['Step', 'Check'], lastBold: false, rows: [['1', 'Manual actions report'], ['2', 'Security issues report'], ['3', 'Indexing and robots'], ['4', 'Timing of the drop'], ['5', 'Content and links']] },
    ours: { title: 'Our own Search Console on 2 November 2026', sub: 'Manual actions and Security issues reports, plus impressions by position from the 28 October export.', head: ['Check', 'Result'], lastBold: false,
      rows: [['Manual actions report', 'No issues detected'], ['Security issues report', 'No issues detected'], ['Impressions at position 10 or better', `${f(B.top10)} (${pct(B.top10)}%)`], ['Impressions at position 21 or lower', `${f(B.p21 + B.p51)} (${LOW}%)`], ['Pages with impressions', String(B.pages)], ['Clicks in 3 months', String(B.clicks)]] }
  },
  content: h => `${h.updated}

<p><strong>A Google penalty</strong> is the common name for a situation where Google has lowered a site's visibility or removed it from search results for breaking its rules. Google itself does not use that word much. Its manual actions help page mentions "manual action" ${F.manual.manualActionMentions} times and the word "penalty" not once, and its page on reconsideration requests does not use it either. We read ${D.ok} pages that rank for "what is a Google penalty" on 2 November 2026: all ${D.manual} explain manual actions and ${D.recovery} cover recovery, but none points out that Google's own help pages avoid the word, and only ${D.google} quotes Google.</p>

<p>This guide explains what Google says, how to check whether you have a manual action, why a drop in traffic is usually not a penalty, what Google's spam policies say can trigger action and how to recover. It uses our own Search Console as the example: we have no manual action, and we also have 87% of our impressions at position 21 or lower, which shows the difference.</p>

<h2>What Is a Google Penalty? (What Google Calls It)</h2>
<p>Two different things get called a "Google penalty". The first is a <strong>manual action</strong>: Google's page says it issues one when a human reviewer at Google has determined that pages on the site are not compliant with Google's spam policies. The second is an <strong>algorithmic</strong> change, where Google's automated systems rank a page lower. Google's spam policies page describes both in one sentence: it detects policy-violating practices "through automated systems and, as needed, human review that can result in a manual action", and sites that violate the policies "may rank lower in results or not appear in results at all". Only the first kind is shown to you in a report.</p>

<h2>What ${D.ok} Ranking Guides Say About Google Penalties</h2>
${h.fig('serp', 'Table of what 5 pages on Google penalties cover: manual actions, reconsideration requests and Search Console in all 5, unnatural links in 5, recovery in 4, Panda or Penguin in 3 and only 1 quoting Google')}
<p>The median guide has about ${f(D.median)} words. ${D.sells} of ${D.ok} also sell a service or a tool, ${D.checker} mention a penalty checker and ${D.panda} still talk about Panda or Penguin, the older names for algorithm changes. We did not see any of the ${D.ok} note that Google's own pages avoid the word, and only ${D.google} quotes Google. ${D.dated} shows a date.</p>

<h2>Manual Action vs Algorithm Update: What Google Says</h2>
<p>On its ${L('https://support.google.com/webmasters/answer/9044175', 'Manual actions report')} page, Google explains why manual actions exist: its algorithms are "extremely good at detecting spam", and in most cases it automatically discovers it and removes it from results. To protect the quality of the index, it is also willing to take manual action. If a site has one, "some or all of that site will not be shown in Google search results". Google notifies you in the Manual actions report and in the Search Console message center.</p>
<p>That gives a practical rule. If there is a message and an entry in the report, you have a manual action. If there is none, a fall in traffic is not a manual action: it may come from an algorithmic change, from your own site, or from competitors. The page lists ${F.manual.types.length} types of manual action, including unnatural links to your site, unnatural links from your site, thin content with little or no added value, user-generated spam, cloaking and sneaky redirects, hidden text or keyword stuffing, structured data issues and spammy free hosts.</p>

<h2>Google Manual Penalty: How to Check Your Site</h2>
<ol>
<li><strong>Open Search Console</strong> for your property and choose Security and Manual Actions, then Manual actions.</li>
<li><strong>Read the result.</strong> Google says that if your site has no manual actions, you will see a green check mark and an appropriate message.</li>
<li><strong>Check the message center</strong> for any notice from Google.</li>
<li><strong>Open the Security issues report</strong> too: Google's page on reconsideration requests treats a manual action and a security issues notification as the two kinds of problem you can ask Google to review.</li>
</ol>
<p>We did this for contomatix.com on 2 November 2026. The Manual actions report said "No issues detected". So did the Security issues report. If your report shows an action, expand it to see which pages are affected: Google says some entries affect the entire site, and others a pattern of pages.</p>

<h2>Google Penalty Checker: Is Your Traffic Drop a Penalty?</h2>
${h.fig('flow', 'Flow of five checks to tell whether a traffic drop is a penalty: Manual actions report, Security issues report, indexing and robots, timing of the drop, and content and links')}
<p>Paid "Google penalty checker" tools, which ${D.checker} of ${D.ok} guides mention, compare your traffic drop against dates of known updates. That can suggest a cause, but it cannot tell you what Google did. The reliable check is the order above. Start with the two reports. Then confirm the pages are still indexed and not blocked: a robots.txt or noindex mistake can look exactly like a penalty, and our <a href="/tools/robots-txt-tester">robots.txt tester</a> and guide to <a href="/blog/set-up-google-search-console">setting up Search Console</a> help. Then look at when the fall started and which pages and queries moved. Finally review what changed on your side: content, links and redirects.</p>

<h2>Low Rankings Are Not a Penalty: Our Own Numbers</h2>
${h.fig('ours', 'Table of our own Search Console on 2 November 2026: no manual actions and no security issues, 87 percent of impressions at position 21 or lower, 433 pages with impressions and 80 clicks in 3 months')}
<p>Our site is a useful example because it ranks poorly and is not penalised. In the three months to 28 October 2026 our pages earned ${f(B.total)} impressions, but only ${f(B.top10)} (${pct(B.top10)}%) were at position 10 or better, and ${f(B.p21 + B.p51)} (${LOW}%) were at position 21 or lower. We earned ${B.clicks} clicks across ${B.pages} pages. A person reading those numbers might think Google is punishing us. The Manual actions report says otherwise. Our problem is that most pages are new and have few links, which our <a href="/blog/monthly-seo-report">monthly SEO report</a> and <a href="/blog/topical-map-seo">topical map</a> work looks at. A penalty is a cause you can find in a report. Low rankings are a result of weak signals.</p>

${h.info('Infographic of Google penalties: all 5 ranking guides cover manual actions, only 1 quotes Google, Google uses the word manual action 110 times and penalty 0 times on its report page, and our own site has no manual actions but 87 percent of impressions at position 21 or lower')}

<h2>What Google's Spam Policies Say Can Lead to Action</h2>
<p>Google's ${L('https://developers.google.com/search/docs/essentials/spam-policies', 'spam policies')} page says the policies protect users and improve the quality of results, and that Google may act against any type of spam practice it detects. The page lists practices including cloaking, expired domain abuse, hacked content, keyword stuffing, link spam, machine-generated traffic, misleading functionality, scaled content abuse and scraping. Two are worth reading in full. <strong>Link spam</strong> is defined as creating links to or from a site primarily for the purpose of manipulating search rankings. <strong>Keyword stuffing</strong> is filling a page with keywords or numbers to manipulate rankings, often in unnatural lists. If you have used link schemes, bulk bought links or hidden text, check those first.</p>

<h2>Google Unnatural Links Penalty and the Disavow Question</h2>
<p>Two of the manual action types are about links: unnatural links to your site and unnatural links from your site. ${D.links} of ${D.ok} guides cover them and ${D.disavow} discuss the disavow tool. The safe approach is the one in Google's own link guidance, which we cover in our guide to <a href="/blog/blogger-outreach">blogger outreach</a>: earn links, qualify paid links with rel="sponsored" or rel="nofollow" and avoid exchanging links at scale. If a report says you have unnatural links, remove or disavow the links you can identify, then document what you did.</p>

<h2>Duplicate Content and Thin Content: What We Can and Cannot Say</h2>
<p>${D.thin} of ${D.ok} guides link thin or duplicate content to penalties. Google's list of manual actions includes "thin content with little or no added value", and its spam policies include scraping and scaled content abuse. We did not find the phrase "duplicate content" on the manual actions, spam policies or reconsideration pages we read, so we cannot say that duplicate content alone causes a manual action. If your pages are copied from elsewhere or generated in bulk with little value, the risk is real. If you simply have two similar pages, fix it as a quality issue and choose one canonical page.</p>

<h2>Google Penalty Recovery: Steps From Google's Own Page</h2>
<ol>
<li><strong>Read the action's description</strong> and the pages it affects.</li>
<li><strong>Fix the issue on all affected pages.</strong> Google says fixing only some pages will not earn a partial return to search results.</li>
<li><strong>Make sure Google can reach the pages</strong>: not behind a login, not blocked by robots.txt, no noindex.</li>
<li><strong>Select Request Review</strong> in the report and describe your fixes. Google says a good request explains the exact quality issue, describes the steps you took and documents the outcome.</li>
<li><strong>Wait.</strong> Google says most reconsideration reviews take several days or weeks, and link-related ones can take longer. Do not resubmit before you get a decision.</li>
</ol>
<p>Google defines a reconsideration request as a request to have Google review your site after you fix problems identified in a manual action or security issues notification. If there is no manual action, there is nothing to request: you improve the site and wait for Google's systems to reassess it.</p>

<h2>Panda, Penguin and Other Old Names</h2>
<p>${D.panda} of ${D.ok} guides still use the names of older algorithm updates. None of the three Google pages we read uses them, and they talk only about spam policies, manual actions and algorithms. If an article says you have been hit by an update with an old name, ask what evidence it has. Our guidance is to check the reports, then the site, and treat any other claim as a guess.</p>

<h2>Common Mistakes When You Think You Have a Penalty</h2>
<ul>
<li><strong>Assuming a drop is a penalty without checking the report.</strong></li>
<li><strong>Paying for a recovery service before reading Google's page.</strong> Google's page says what a request needs, and the fix is yours to make.</li>
<li><strong>Fixing some pages.</strong> Google says partial fixes do not earn a partial return.</li>
<li><strong>Mass disavowing without a reason.</strong> Disavow what you have identified as unnatural, not everything.</li>
<li><strong>Resubmitting too soon.</strong> Google says not to resubmit before a decision.</li>
</ul>

<h2>Reading the Manual Actions Report: What You Would See</h2>
<p>At the top of the report is a count of manual actions against your site. If there are any, each one has a type, a short description and a list of affected pages. Google's page explains that the list shows patterns of pages, such as everything under a folder like real-estate, and that not every page matching the pattern is necessarily affected. Each entry has a "Learn more" link to detailed steps for that type, and a Request Review button once you have finished fixing. If you manage a site for someone else, take a screenshot of the report each month, including when it is clear, so there is a record of when an action appeared.</p>

<h2>What a Good Reconsideration Request Contains</h2>
<p>Google says a good request does three things: it explains the exact quality issue on your site, describes the steps you have taken to fix it and documents the outcome of your efforts. A useful structure is three short paragraphs. First, name the issue as Google described it, for example unnatural links to your site. Second, list what you did, with numbers, such as how many links you removed, how many you asked other sites to remove and how many you disavowed, with a link to a shared sheet. Third, show the result: which pages are fixed, and how you will avoid the problem again. Keep the tone plain and factual. The reviewer is checking that the problem is fixed, not that you are sorry.</p>

<h2>If It Is Not a Penalty: What to Do After a Drop</h2>
<ul>
<li><strong>Do not make large changes in a panic.</strong> Change one thing at a time so you can tell what helped.</li>
<li><strong>Look at which pages and queries fell.</strong> A drop on a handful of pages points to those pages, while a site-wide drop points to something broader such as a technical fault.</li>
<li><strong>Compare your pages with the ones now ranking above you.</strong> Read them as a visitor would.</li>
<li><strong>Improve the pages that matter most</strong> and earn links to them, as we describe in our guide to a <a href="/blog/backlink-strategy">backlink strategy</a>.</li>
<li><strong>Give it time.</strong> Google's automated systems reassess sites over time, not on request.</li>
</ul>

<h2>A Monthly Check That Catches Problems Early</h2>
<p>Add two lines to your monthly report: "Manual actions: none" and "Security issues: none", with the date you checked. It takes under a minute, and it means you find a problem the month it appears instead of after weeks of lost traffic. Our <a href="/blog/monthly-seo-report">monthly SEO report</a> format has a technical section where it fits, next to indexing and speed. Pair it with a quick look at the Page indexing report, so you see pages dropping out of the index at the same time.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Google's manual actions page says "manual action" ${F.manual.manualActionMentions} times and "penalty" 0 times.</li>
<li>A manual action is shown to you in Search Console. If you have none, a drop is not a manual action.</li>
<li>Check manual actions, security issues, indexing, timing and content, in that order.</li>
<li>Our site has no manual action, yet ${LOW}% of its impressions are at position 21 or lower: weak rankings are not a penalty.</li>
<li>To recover, fix every affected page, request a review and wait.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a Google penalty?', 'A common name for Google lowering or removing a site from results for breaking its rules. Google\'s own term for the reported kind is manual action.'],
    ['How do I know if I have a Google penalty?', 'Open the Manual actions report in Search Console. If there is an action, it is listed there and in the message center. If not, you will see a green check mark.'],
    ['Is a traffic drop a penalty?', 'Not necessarily. It can come from an algorithm change, a technical problem such as robots.txt or noindex, or competitors.'],
    ['What is the difference between a manual action and an algorithmic change?', 'A manual action is issued when a human reviewer at Google decides pages break the spam policies. Algorithmic changes are automatic and are not shown in a report.'],
    ['How long does it take to recover from a Google penalty?', 'Google says most reconsideration reviews take several days or weeks, and link-related ones can take longer.'],
    ['Do I need a penalty recovery service?', 'Google\'s page describes what a request must contain. A service can help with the work, but it cannot do more than fix the issue and request a review.'],
    ['Does duplicate content cause a Google penalty?', 'We did not find that statement in the Google pages we read. Thin content with little added value and scraping are covered.'],
    ['What is the unnatural links penalty?', 'A manual action type for links to or from a site that manipulate rankings. Fix or remove the links, then request a review.'],
    ['Did you check your own site?', 'Yes. On 2 November 2026 our Manual actions and Security issues reports both said no issues detected.']
  ])}
`
});
