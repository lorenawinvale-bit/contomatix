// node scripts/build-post-white-hat-link-building.js [--write] — data: 8 ranking pages (Google US, 23 Oct 2026) + Google spam policies and outbound-link docs read the same day. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-white-hat-link-building-2026-10-23.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { shown: R.length, ok: ok.length, median: Math.round((w[3] + w[4]) / 2), guest: c('guest'), broken: c('broken'), pr: c('pr'), resource: c('resource'), directory: c('directory'), exchange: c('exchange'), mentions: c('mentions'), research: c('research'), infographic: c('infographic'), skyscraper: c('skyscraper'), blackhat: c('blackhat'), policy: c('policy'), penalty: c('penalty'), nofollow: c('nofollow'), paid: c('paid'), gdoc: c('googleDoc') };
const exp = { shown: 8, ok: 8, median: 2355, guest: 8, broken: 8, pr: 8, resource: 3, directory: 1, exchange: 3, mentions: 6, research: 6, infographic: 2, skyscraper: 2, blackhat: 7, policy: 6, penalty: 6, nofollow: 3, paid: 3, gdoc: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const G = require('../../keyword-research/google-docs-2026-10-23.json')[0].linkSpam;
for (const s of ['Buying or selling links for ranking purposes', 'Excessive link exchanges', 'Using automated programs or services to create links', 'Low-quality directory or bookmark site links', 'press releases distributed on other sites', 'Widely distributed links in the footers']) if (!G.includes(s)) throw new Error('Google text changed: ' + s);
console.log(JSON.stringify(D));
build({
  slug: 'white-hat-link-building', category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-23',
  title: "White Hat Link Building: A Test Using Google's Own Rules",
  excerpt: `White hat link building tested against Google's spam policy: ${D.ok} top guides read, 8 of 8 recommend guest posting, and a six-question test to judge any tactic yourself.`,
  donut: [['WHITE HAT', 'LINK BUILDING'], [['Read', "Google's List"], 'Ask Why', ['Check Who', 'Chose the Link'], 'Qualify Paid Links', ['Keep a', 'Written Record']]],
  cover: { badge: 'REAL SERP CHECK', search: 'white hat link building', card: `Guides read: ${D.ok} of ${D.shown}`, lines: [`Recommend guest posting: ${D.guest} of ${D.ok}`, `Use the term black hat: ${D.blackhat} of ${D.ok}`, `Link Google's own docs: ${D.gdoc} of ${D.ok}`, `Mention nofollow or sponsored: ${D.nofollow} of ${D.ok}`], last: 'Guides cite the rulebook rarely', big: `${D.gdoc} of ${D.ok}`, k1: 'guides link', k2: "Google's documentation", title: 'White Hat Link Building', sub: "Tested against Google's rules" },
  info: { title: `White Hat Link Building: ${D.ok} Guides Read`, sub: 'Organic results for "white hat link building", Google US, 23 October 2026', leftTitle: 'What the guides recommend', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Guest posting', sub: 'as a tactic', n: D.guest }, { label: 'Broken link building', sub: 'as a tactic', n: D.broken }, { label: 'Digital PR', sub: 'or press outreach', n: D.pr }, { label: 'Unlinked mentions', sub: 'or reclamation', n: D.mentions }, { label: 'Link Google documentation', sub: 'for the rules', n: D.gdoc }],
    rightTitle: 'The six-question test', rightTag: 'Ask of any tactic', items: [{ t: 'Would you do it anyway?', s: 'if links did not count' }, { t: 'Did they choose?', s: 'editorial decision' }, { t: 'Is anything traded?', s: 'money, goods, links' }, { t: 'Is it automated?', s: 'at scale' }, { t: 'Is the anchor natural?', s: 'not keyword-stuffed' }, { t: 'Is paid qualified?', s: 'sponsored or nofollow' }],
    big: `${D.gdoc} of ${D.ok}`, noteHtml: `top guides link to <em>Google's own documentation</em> on what is allowed.` },
  tables: {
    serp: { title: `What ${D.ok} white hat link building guides say`, sub: `Organic results for "white hat link building" read on 23 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Guest posting', `${D.guest} of ${D.ok}`], ['Broken link building', `${D.broken} of ${D.ok}`], ['Digital PR or press outreach', `${D.pr} of ${D.ok}`], ['Unlinked mentions or reclamation', `${D.mentions} of ${D.ok}`], ['Original research or surveys', `${D.research} of ${D.ok}`], ['Resource pages', `${D.resource} of ${D.ok}`], ['Link exchanges or reciprocal links', `${D.exchange} of ${D.ok}`], ['Black hat or gray hat contrast', `${D.blackhat} of ${D.ok}`], ["Google's policy named", `${D.policy} of ${D.ok}`], ['Penalties or manual actions', `${D.penalty} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ["Link Google's own documentation", `${D.gdoc} of ${D.ok}`]] },
    google: { title: "Google's link spam examples, and the white hat answer", sub: 'Examples quoted from the link spam section of Google Search Central spam policies, read on 23 October 2026. The right column is our reading.', head: ["Google's example of link spam", 'White hat answer'], lastBold: false,
      rows: [['Buying or selling links for ranking purposes', 'Do not; qualify paid placements as sponsored'], ['Excessive link exchanges and cross-link partner pages', 'Link only where it helps readers'], ['Automated programs or services creating links', 'Avoid completely'], ['Low-quality directory or bookmark site links', 'Use few, relevant listings'], ['Optimized anchors in guest posts or press releases', 'Use natural, brand or descriptive anchors'], ['Widely distributed footer or widget links', 'Do not distribute keyword links']] },
    tactics: { title: 'Common tactics, tested against Google\'s list', sub: 'Pages = how many of the 8 guides mention the tactic. Verdict is our reading of Google\'s published rules, not an official ruling.', head: ['Tactic', 'Pages', 'Our verdict'], lastBold: false,
      rows: [['Guest posts for a real audience', `${D.guest} of ${D.ok}`, 'Fine, with natural anchors'], ['Broken link building', `${D.broken} of ${D.ok}`, 'Fine; the page benefits too'], ['Digital PR with real data', `${D.pr} of ${D.ok}`, 'Fine'], ['Reclaiming unlinked mentions', `${D.mentions} of ${D.ok}`, 'Fine'], ['Link exchanges at scale', `${D.exchange} of ${D.ok}`, 'Avoid; on Google\'s list'], ['Directory submissions', `${D.directory} of ${D.ok}`, 'Few and relevant only'], ['Paid posts', `${D.paid} of ${D.ok}`, 'Only with sponsored or nofollow']] }
  },
  content: h => `${h.updated}

<p><strong>White hat link building</strong> means getting links in ways that follow Google's published rules and that you would be comfortable explaining to the site that gave the link. Every guide agrees with that in spirit. What they differ on is where the line sits, and most do not show you Google's wording. We read ${D.ok} top-ranking guides on 23 October 2026: ${D.guest} of ${D.ok} recommend guest posting, ${D.blackhat} of ${D.ok} contrast white hat with black hat, and only ${D.gdoc} of ${D.ok} link to Google's own documentation.</p>

<p>This guide puts Google's link spam examples next to the tactics the guides recommend, gives you a six-question test you can run on any tactic, and shows where white hat methods turn grey. If you are new to the basics, start with <a href="/blog/what-is-link-building">what link building is</a> and <a href="/blog/types-of-backlinks">types of backlinks</a>.</p>

<h2>What White Hat Link Building Actually Means</h2>
<p>Google does not use the labels white hat or black hat. Its documentation says link spam is the practice of creating links to or from a site primarily for the purpose of manipulating search rankings. White hat, in practice, means the opposite: links that exist because a person decided your page was worth citing, or because a placement is openly marked for what it is. The label is useful shorthand, but the rule that counts is Google's list, so that is where we start.</p>

<h2>What ${D.ok} Top Guides Recommend</h2>
${h.fig('serp', 'Table of what 8 white hat link building guides say: guest posting, broken link building and digital PR in 8 of 8, unlinked mentions and original research in 6 of 8, Google policy in 6 of 8 and links to Google documentation in 3 of 8')}
<p>The guides agree on a core set of tactics. Guest posting, broken link building and digital PR each appear in ${D.guest} of ${D.ok}. Unlinked mentions or reclamation appears in ${D.mentions} and original research or surveys in ${D.research}. Resource pages show up in only ${D.resource} of ${D.ok}, and directories in ${D.directory}. The pages run a median of ${h.f(D.median)} words.</p>
<p>On rules, the picture is thinner. ${D.policy} of ${D.ok} name Google's policy in general terms and ${D.penalty} mention penalties or manual actions, but only ${D.gdoc} link to Google's documentation, and ${D.nofollow} mention nofollow, sponsored or ugc. So a reader can learn which tactics to try and still not learn exactly what Google lists as link spam, or how to mark a paid link.</p>

<h2>What Google Lists as Link Spam</h2>
${h.fig('google', "Table of Google's link spam examples and the white hat answer: buying or selling links, excessive link exchanges, automated links, low-quality directories, optimized anchors in guest posts and press releases, and widely distributed footer or widget links")}
<p>Google's spam policies list these among the examples of link spam, quoted here from the documentation we read on 23 October 2026: buying or selling links for ranking purposes; excessive link exchanges and partner pages exclusively for cross-linking; using automated programs or services to create links; low-quality directory or bookmark site links; links with optimized anchor text in articles, guest posts or press releases distributed on other sites; and widely distributed links in the footers or templates of various sites.</p>
<p>Two points stand out. First, the list is about intent and scale, not about a tactic name. A guest post written for a real audience is not the same as a campaign of articles with keyword-rich anchors placed for rankings. Second, Google separately explains how to qualify links: <code>rel="sponsored"</code> for advertisements and paid placements, <code>rel="ugc"</code> for user-generated content and <code>rel="nofollow"</code> when other values do not apply. Paid links are therefore not forbidden; unmarked paid links that pass ranking credit are the problem.</p>

<h2>Common Tactics, Tested Against Google's List</h2>
${h.fig('tactics', "Table of common link building tactics with how many of 8 guides mention them and a verdict: guest posts, broken link building, digital PR and reclamation are fine, link exchanges at scale should be avoided, directories need care and paid posts need sponsored or nofollow")}
<p>Our table gives a verdict for each tactic, based on Google's wording. It is our reading, not an official ruling, and context changes it.</p>
<ul>
<li><strong>Guest posting</strong> is fine when you have something to say and the host site wants it. It drifts toward link spam when the point is anchor text and volume. See <a href="/blog/guest-posting-vs-niche-edits-2026">guest posting versus niche edits</a>.</li>
<li><strong>Broken link building</strong> helps the page owner by fixing a dead link, so the exchange is honest. It works only when your page really replaces what was lost.</li>
<li><strong>Digital PR</strong> with real data earns editorial links. See <a href="/blog/editorial-backlinks">editorial backlinks</a>.</li>
<li><strong>Reclaiming mentions</strong> asks for a link where you are already named. See <a href="/blog/link-reclamation">link reclamation</a>.</li>
<li><strong>Link exchanges</strong> are fine in small, natural amounts and are on Google's list when excessive. See <a href="/blog/backlinks-exchange">backlinks exchange</a>.</li>
<li><strong>Directories</strong> belong on the list only when the directory is real and relevant. ${D.directory} of ${D.ok} guides mention them.</li>
<li><strong>Paid posts</strong> need a sponsored or nofollow attribute.</li>
</ul>

<h2>The Six-Question White Hat Test</h2>
<p>When a tactic is not on any list, ask these six questions. If you answer no to more than one, rethink it.</p>
<ol>
<li><strong>Would we do this if links did not count?</strong> If the activity has no value without the link, it is probably manipulation.</li>
<li><strong>Did the other site choose to link?</strong> An editor's choice is the strongest sign of a clean link.</li>
<li><strong>Is anything being traded for the link?</strong> Money, goods, services or reciprocal links are on Google's list unless qualified or small and natural.</li>
<li><strong>Is it automated or repeatable at scale?</strong> Automated links appear in Google's examples.</li>
<li><strong>Is the anchor natural?</strong> Keyword-rich anchors repeated across many sites look engineered. Check yours with the <a href="/tools/anchor-text-checker">anchor text checker</a>.</li>
<li><strong>Is a paid link qualified?</strong> If money is involved, mark it sponsored or nofollow.</li>
</ol>

${h.info("Infographic of what 8 white hat link building guides recommend: guest posting 8, broken link building 8, digital PR 8, unlinked mentions 6, and only 3 linking Google documentation, plus the six-question white hat test")}

<h2>Three Worked Examples of the Test</h2>
<p>These are illustrative cases, not client stories. They show how the six questions sort a clean tactic from a risky one.</p>
<ol>
<li><strong>A guest article for an industry blog.</strong> You pitched a topic the editor wanted, wrote it for the blog's readers, and the author bio links to your site with your brand name. Would you do it if links did not count? Yes, because the audience is real. Did they choose? Yes. Is anything traded? No. Verdict: passes. Change one thing, a pitch that offers the article only if the host site places a keyword-rich anchor, and questions 2 and 5 turn into a no.</li>
<li><strong>A "partner" page of 40 sites that all link to each other.</strong> Would you do it without links? No. Did each site choose editorially? No, it was agreed in advance. Is something traded? Yes, reciprocal links. Verdict: fails three questions, and it matches Google's example of excessive link exchanges and partner pages exclusively for cross-linking.</li>
<li><strong>A sponsored review on a niche site.</strong> You pay for the review, the site discloses it, and the link carries <code>rel="sponsored"</code>. Money is traded, but the link is qualified, which is what Google asks for. Verdict: passes, as advertising. It is not a way to earn ranking credit, and you should not report it as an earned link.</li>
</ol>

<h2>White Hat, Gray Hat and Black Hat</h2>
<p>Seven of the ${D.ok} guides use the black hat or gray hat contrast, which makes it worth defining the three terms in plain language, bearing in mind they are industry labels, not Google's.</p>
<ul>
<li><strong>White hat:</strong> tactics that follow Google's rules and are open about money, such as editorial links, reclamation, original data, and sponsored placements marked as sponsored.</li>
<li><strong>Gray hat:</strong> tactics that are not clearly forbidden but depend on scale or intent, such as guest posts with fixed anchors, unmarked "sponsored" content or large exchanges. Many guides disagree about where gray ends.</li>
<li><strong>Black hat:</strong> tactics Google lists as link spam, such as automated links, buying links that pass ranking credit without a qualifier, or hidden and widget links. They can lead to links being ignored or, in serious cases, to a manual action.</li>
</ul>
<p>The practical lesson is that the labels describe tactics less well than they describe how a tactic is used. Judge the use.</p>

<h2>A 90-Day White Hat Plan for a Small Site</h2>
<ol>
<li><strong>Days 1 to 15: audit and clean.</strong> Export your links from Search Console, tag each one by how it was acquired, and check the anchors. Fix anything you control, such as unmarked paid placements on your own pages.</li>
<li><strong>Days 16 to 30: claim what is yours.</strong> List pages that mention your brand without linking, and ask for the link. This is the lowest-risk acquisition there is.</li>
<li><strong>Days 31 to 60: build one citable thing.</strong> A tool, a dataset or a clear guide. Then contact ten pages that already cite weaker sources. Use the <a href="/blog/link-prospecting">link prospecting guide</a> to score them first.</li>
<li><strong>Days 61 to 90: widen carefully.</strong> Add a small number of relevant guest posts or interviews, and a sponsored placement if it fits the budget, marked as sponsored. Record every link as you go.</li>
</ol>
<p>At the end of 90 days, compare your sheet with Search Console. Look at how many links are live, how many sites they come from, which pages they point to and whether any are qualified. If most are editorial or openly sponsored, you are on the right side of the line.</p>

<h2>How to Keep a White Hat Record</h2>
<p>Whatever you do, write it down. A sheet with the linking URL, the date, how you got the link, whether money changed hands, the anchor and the rel attribute lets you answer questions later, from a client, a provider or yourself. Check each page with the <a href="/tools/outbound-link-checker">outbound link checker</a> or <a href="/tools/dofollow-link-checker">dofollow link checker</a> and record what you find. If you inherit a profile that looks risky, our guide to <a href="/blog/google-disavow-backlinks">Google disavow backlinks</a> explains when disavowing is appropriate. Google's help page says most sites do not need the tool.</p>

<h2>Where White Hat Turns Grey</h2>
<ul>
<li><strong>Guest posting with a fixed anchor.</strong> The same keyword-rich anchor in every post turns a content tactic into a pattern.</li>
<li><strong>Niche edits and paid placements.</strong> These can be legitimate sponsorship when marked and priced honestly, and spam when the link is meant to pass credit unmarked.</li>
<li><strong>Directory sprees.</strong> A few relevant listings are fine. Hundreds are on Google's list.</li>
<li><strong>Press release distribution.</strong> Optimized anchors in distributed releases are listed as link spam.</li>
<li><strong>Providers.</strong> A provider that guarantees a number of links by a date is selling output, not outcomes. See <a href="/blog/saas-link-building-services">SaaS link building services</a> for what the pricing pages show.</li>
</ul>

<h2>Questions to Ask a Provider Who Says "White Hat"</h2>
<p>Many agencies and services describe themselves as white hat, and ${D.ok} of ${D.ok} guides use the term, so the phrase alone tells you little. Ask for specifics before you pay.</p>
<ul>
<li>Which sites will the links come from, and how do you choose them?</li>
<li>Do any of the placements involve money, and how are those links marked?</li>
<li>What anchor texts will you use, and who decides them?</li>
<li>Will I see a live URL for every link, with its rel attribute?</li>
<li>What happens if a link is removed?</li>
<li>Do you follow Google's spam policies, and which parts do you consider most relevant to your method?</li>
</ul>
<p>A provider that answers clearly, shows live URLs and does not guarantee a fixed number of links by a date is easier to trust than one that repeats the label.</p>

<h2>Common White Hat Mistakes</h2>
<ul>
<li><strong>Assuming a tactic name is safe.</strong> What counts is how you do it.</li>
<li><strong>Trusting a guide's list of safe tactics without reading Google's.</strong> Only ${D.gdoc} of ${D.ok} guides link to it.</li>
<li><strong>Leaving paid links unmarked.</strong> Qualify them.</li>
<li><strong>Chasing volume.</strong> A handful of relevant, editorial links beats a hundred weak ones.</li>
<li><strong>Not keeping records.</strong> You cannot clean up what you did not log.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Guide data comes from the organic results for "white hat link building" on Google US on 23 October 2026. All ${D.shown} listed results returned a readable page. A tactic counts once per page when its term appears in the text, which shows presence, not quality of explanation.</li>
<li>Google's examples and qualifying guidance come from its spam policies and outbound-link documentation, read the same day. Quotations in the table are shortened.</li>
<li>Verdicts and the six-question test are our reading and may not match how Google treats a particular site.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>White hat means following Google's published rules; Google lists the link spam examples.</li>
<li>All ${D.ok} top guides recommend guest posting, broken link building and digital PR, yet only ${D.gdoc} link to Google's documentation.</li>
<li>Paid links are fine when marked sponsored or nofollow.</li>
<li>Judge any tactic by intent, scale, anchors and who chose the link.</li>
<li>Keep a written record of every link you acquire.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is white hat link building?', "It is acquiring links in ways that follow Google's published rules, such as links an editor chose to give or placements that are openly marked as sponsored."],
    ['Is guest posting white hat?', "It can be. Google lists links with optimized anchor text in guest posts distributed on other sites as link spam, so write for a real audience and use natural anchors."],
    ['Are paid links against Google rules?', "Buying or selling links for ranking purposes is on Google's link spam list. Paid placements are acceptable when qualified with rel=sponsored or nofollow."],
    ['What is the difference between white hat and black hat link building?', "Black hat tries to manipulate rankings with tactics such as automated links or unmarked paid links. White hat follows the rules and earns or openly marks links."],
    ['Are directory links white hat?', "A few relevant, real directories are fine. Google lists low-quality directory or bookmark links as examples of link spam."],
    ['Is link exchange allowed?', 'Small, natural exchanges are normal. Google lists excessive link exchanges as link spam.'],
    ['How do I know a link is clean?', 'Ask who chose it, whether anything was traded, whether the anchor is natural and whether paid links are qualified. Check the rel attribute with the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.'],
    ['Does white hat link building work slowly?', 'Often yes. Earned links take weeks or months. Indexing alone can take days to weeks according to Google.'],
    ['Should I disavow bad links?', 'Only in specific cases. Google says most sites do not need the disavow tool. See <a href="/blog/google-disavow-backlinks">Google disavow backlinks</a>.']
  ])}
`
});
