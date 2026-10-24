// node scripts/build-post-directory-links.js [--write] — data: 9 readable ranking pages (Google US, 24 Oct 2026), Google spam policies and outbound-link docs read the same day, and our own listing experience (Aug-Oct 2026). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-directory-links-2026-10-24.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-2026-10-24.json');
const D = { shown: 9, ok: ok.length, median: w[4], dofollow: c('dofollow'), nofollow: c('nofollow'), free: c('free'), local: c('local'), risk: c('risk'), policy: c('policy'), list: c('list'), steps: c('steps'), da: c('da'), define: c('define'), bulk: c('bulk'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { shown: 9, ok: 9, median: 2161, dofollow: 3, nofollow: 3, free: 4, local: 8, risk: 7, policy: 1, list: 7, steps: 5, da: 6, define: 6, bulk: 5, gdoc: 1, dated: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
if (!G[0].url.includes('spam-policies') || G[0].terms.directory < 1) throw new Error('Google doc check failed');
console.log(JSON.stringify(D));
build({
  slug: 'directory-links', category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-24',
  title: 'Directory Links: Do They Still Help? 9 Pages and Our Test',
  excerpt: `Directory links tested: ${D.ok} top pages read, Google's rule on low-quality directories, and our own result: 22 of our 24 links are listings and the two we could read were nofollow.`,
  donut: [['DIRECTORY', 'LINKS'], [['Pick Real', 'Directories'], 'Check the Link', ['Read Google', 'Rules'], 'Stay Selective', ['Track and', 'Review']]],
  cover: { badge: 'REAL SERP CHECK + OUR TEST', search: 'directory links', card: `Pages read: ${D.ok} of ${D.shown}`, lines: [`Mention risk or low quality: ${D.risk} of ${D.ok}`, `Name Google's policy: ${D.policy} of ${D.ok}`, 'Our links on listings: 22 of 24', 'Readable listings with nofollow: 2 of 2'], last: 'Few pages cite the rule', big: `${D.policy} of ${D.ok}`, k1: 'top pages name', k2: "Google's spam policy", title: 'Directory Links', sub: 'Do they still help?' },
  info: { title: `Directory Links: ${D.ok} Pages Read`, sub: 'Organic results for "directory links", Google US, 24 October 2026', leftTitle: 'What the pages cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Local or citation angle', sub: 'mentioned', n: D.local }, { label: 'Risk or low quality', sub: 'mentioned', n: D.risk }, { label: 'DA or DR as a measure', sub: 'mentioned', n: D.da }, { label: 'Bulk submission', sub: 'mentioned', n: D.bulk }, { label: "Google's spam policy", sub: 'named', n: D.policy }],
    rightTitle: 'Before you submit', rightTag: 'Four checks', items: [{ t: 'Is it a real directory?', s: 'editorial review, real users' }, { t: 'Is it relevant?', s: 'your niche or place' }, { t: 'What is the link?', s: 'follow, nofollow, sponsored' }, { t: 'Is it free of spam?', s: 'no link farm neighbours' }],
    big: `${D.policy} of ${D.ok}`, noteHtml: `top pages name <em>Google's spam policy</em>, which lists low-quality directory links.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for directory links say`, sub: `Organic results for "directory links" read on 24 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Define a directory link', `${D.define} of ${D.ok}`], ['Local, citation or business profile angle', `${D.local} of ${D.ok}`], ['Risk, spam or low quality', `${D.risk} of ${D.ok}`], ['A list of directories', `${D.list} of ${D.ok}`], ['Submission steps', `${D.steps} of ${D.ok}`], ['DA or DR as a measure', `${D.da} of ${D.ok}`], ['Bulk or mass submission', `${D.bulk} of ${D.ok}`], ['Mention dofollow', `${D.dofollow} of ${D.ok}`], ['Mention nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ["Name Google's spam policy", `${D.policy} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a publish or update date', `${D.dated} of ${D.ok}`]] },
    ours: { title: 'Our own directory experience, Aug to Oct 2026', sub: 'Search Console Links report (21 October) and our own submission log. Directories are not named; details of the profile are in the linked studies.', head: ['Measure', 'Result'], lastBold: false,
      rows: [['Agency directories we submitted to (22 Aug)', '4'], ['Sign-up blocked by an anti-bot challenge', '1'], ['External links to our site (21 Oct)', '24 from 10 sites'], ['Of those, directory or listing pages', '22'], ['Of those, editorial mentions', '2'], ['Readable listing pages with a rel on our link', '2, both nofollow'], ['Posts with an external link', '0 of 331']] },
    choose: { title: 'How to choose a directory', sub: 'Our own checklist. Give each a yes or no; submit only when most answers are yes.', head: ['Question', 'Why it matters', 'How to check'], lastBold: false,
      rows: [['Is there editorial review?', 'Open directories accept anything', 'Read the submission rules'], ['Is it relevant to my niche or place?', 'Relevance is the point', 'Browse the categories'], ['Does it have real users?', 'Visitors are the real benefit', 'Search its name, look for activity'], ['What is the link attribute?', 'Tells you what to expect', 'Dofollow link checker'], ['Is it free of link-farm neighbours?', 'Bad neighbours are a risk', 'Outbound link checker on a listing'], ['Is the page indexed?', 'An unindexed page passes nothing', 'Search the exact listing title']] }
  },
  content: h => `${h.updated}

<p><strong>Directory links</strong> are links from listing sites where businesses or websites are added to categories: agency directories, local business listings, niche catalogues and general web directories. They are cheap and quick, which is why so many people use them and why Google warns about them. We read ${D.ok} pages that rank for the term on 24 October 2026. ${D.risk} of ${D.ok} mention risk or low quality, but only ${D.policy} of ${D.ok} name Google's spam policy, which lists low-quality directory or bookmark site links among its examples of link spam.</p>

<p>This guide gives you what the ${D.ok} pages cover, what Google says, how to choose a directory, and our own results: 22 of our 24 external links sit on directory or listing pages, and the two listings we could read both marked our link nofollow. For where directories fit among other methods, see <a href="/blog/link-acquisition">link acquisition</a>.</p>

<h2>What Directory Links Are</h2>
<p>${D.define} of the ${D.ok} pages define a directory link as a link from a listing in a directory. The directory might be a general web directory, a niche catalogue such as a list of agencies or tools, or a local business listing. A listing usually includes your name, a description, contact details and a link to your site. Local listings are tied to citations, the mentions of your name, address and phone number across the web, and ${D.local} of ${D.ok} pages cover that angle.</p>
<p>In acquisition terms, a directory link is a link you place yourself. No editor chose to cite you; you submitted a profile. That is useful for being found and for consistency, and it is the reason the link carries less weight than an editorial one. See <a href="/blog/editorial-backlinks">editorial backlinks</a> for the contrast.</p>

<h2>What ${D.ok} Top Pages Cover</h2>
${h.fig('serp', 'Table of what 9 pages ranking for directory links say: 8 cover local or citation angle, 7 mention risk and give a list of directories, 6 use DA or DR, 5 mention bulk submission, 3 mention dofollow, 1 names Google spam policy and 1 links Google documentation')}
<p>The pages are practical. ${D.list} of ${D.ok} give a list of directories and ${D.steps} give submission steps. ${D.da} measure directories by DA or DR, and ${D.bulk} mention bulk or mass submission. On the link itself, ${D.dofollow} of ${D.ok} mention dofollow and ${D.nofollow} mention nofollow, sponsored or ugc. On the rules, the coverage thins out: ${D.policy} of ${D.ok} name Google's spam policy, ${D.gdoc} link to Google's documentation, and ${D.dated} show a date. They run a median of ${h.f(D.median)} words.</p>
<p>The result is a body of advice that tells you where to submit, how, and how many, and says much less about what Google says is spam. That is the gap the next section fills.</p>

<h2>What Google Says About Directory Links</h2>
<p>Google's spam policies define link spam as creating links to or from a site primarily to manipulate search rankings. Among its examples is "low-quality directory or bookmark site links". Notice what is not on the list: directories as such. A relevant, edited directory that people actually use is not described as spam. What is described is the low-quality kind, and the habit of creating links in bulk.</p>
<p>Google's separate guidance on qualifying outbound links matters too. If a directory charges for a listing that includes a link, that is a paid placement and, under Google's guidance, should carry <code>rel="sponsored"</code> (or nofollow). Many directories already mark their links that way, and that affects how much ranking credit a listing can pass. It does not remove the other benefits: being found by people who browse the directory.</p>

<h2>Our Own Directory Experience</h2>
${h.fig('ours', 'Table of the Contomatix directory experience from August to October 2026: 4 agency directory submissions, 1 sign-up blocked by an anti-bot challenge, 24 external links from 10 sites, 22 on directory or listing pages, 2 editorial, and 2 of 2 readable listings marked nofollow')}
<p>We tried directories ourselves. In August 2026 we submitted our agency profile to four agency directories, and a fifth sign-up was blocked by an anti-bot challenge. In early September we stopped, because we decided to focus on links from real articles. By 21 October, Search Console showed 24 external links from 10 sites, of which 22 are on directory or listing pages and 2 are editorial mentions inside articles. None of our 331 posts has an external link.</p>
<p>We could open two of the listing pages in October and check the attribute on our link: both were marked nofollow. That is a very small sample, and one listing we recorded in August as followed was not re-checked, so we do not claim a rule. It does illustrate what several of the ${D.ok} pages hint at: many directories mark outbound links nofollow, so the main value of a listing may be exposure rather than ranking credit. The details are in <a href="/blog/what-is-link-building">what is link building</a>, <a href="/blog/link-reclamation">link reclamation</a> and <a href="/blog/link-building-statistics">link building statistics</a>.</p>

<p>What we would do differently: choose fewer directories and pick them for the people who use them, not for a score; check the link attribute before counting a listing as a backlink; and start earning editorial links in parallel instead of waiting until after the listings. Directories gave us a presence, which is useful, but they did not give us links to our articles. That took a different kind of work, which is why we now put more effort into tools and data pages that other sites want to cite. See <a href="/blog/linkable-assets">linkable assets</a>.</p>

<h2>How to Choose a Directory</h2>
${h.fig('choose', 'Table of six questions for choosing a directory: editorial review, relevance to niche or place, real users, link attribute, link-farm neighbours and whether the page is indexed, each with why it matters and how to check')}
<p>Our checklist has six yes-or-no questions. Submit only when most answers are yes.</p>
<ol>
<li><strong>Is there editorial review?</strong> A directory that accepts anything also accepts spam, and your listing sits among it.</li>
<li><strong>Is it relevant to your niche or place?</strong> Relevance is why ${D.local} of ${D.ok} pages stress local and citation listings.</li>
<li><strong>Does it have real users?</strong> Search its name and look for signs of use. The best reason to be listed is to be found.</li>
<li><strong>What is the link attribute?</strong> Check an existing listing with the <a href="/tools/dofollow-link-checker">dofollow link checker</a> or <a href="/tools/outbound-link-checker">outbound link checker</a>.</li>
<li><strong>Are the neighbours clean?</strong> If the same page carries hundreds of unrelated commercial links, skip it.</li>
<li><strong>Is the listing page indexed?</strong> If Google cannot find the page, the link passes nothing. See <a href="/blog/how-to-index-backlinks">how to index backlinks</a>.</li>
</ol>

${h.info('Infographic of what 9 pages ranking for directory links cover: 8 cover local or citation angle, 7 mention risk, 6 use DA or DR, 5 mention bulk submission and only 1 names Google spam policy, plus four checks before you submit to a directory')}

<h2>Types of Directories</h2>
<ul>
<li><strong>General web directories.</strong> Broad lists with categories. Most are low value and some exist only to sell links, which is where Google's warning applies.</li>
<li><strong>Niche catalogues.</strong> Lists for one industry or tool type, such as agencies, software or suppliers. These are often the most useful, because readers browse them to choose.</li>
<li><strong>Local business listings.</strong> Maps, review platforms and city or chamber of commerce pages. They matter for local search and for customers.</li>
<li><strong>Review and comparison sites.</strong> They combine a listing with reviews. Their links are often marked nofollow or sponsored.</li>
<li><strong>Marketplaces and app stores.</strong> You may get a profile with a link, plus the chance to be found by buyers.</li>
<li><strong>Bookmarking and social bookmarking sites.</strong> Google lists low-quality bookmark site links alongside directories as spam examples. Be careful.</li>
</ul>

<h2>Directory Links Versus Other Link Types</h2>
<p>A directory link is placed by you, so it sits at the low-control-by-others end of the scale. An editorial link is chosen by the writer. A sponsored link is paid for and should be marked. When you report results to a client or your own team, keep the three apart. A profile with 22 listing links and 2 editorial mentions, as ours has, looks very different from one with the reverse, even if the total count is the same. The <a href="/blog/types-of-backlinks">types of backlinks</a> guide describes the categories, and the <a href="/blog/link-acquisition">link acquisition</a> guide scores each way of getting a link.</p>

<h2>A Directory Audit for an Existing Profile</h2>
<ol>
<li><strong>List your listing links.</strong> In Search Console, open Links and look at the top linking sites. Mark those that are directories or profiles.</li>
<li><strong>Open each one.</strong> Check the listing is live, the details are right and the link goes where you want.</li>
<li><strong>Read the attribute.</strong> Paste the page HTML into the <a href="/tools/outbound-link-checker">outbound link checker</a> and note whether your link is followed, nofollow, sponsored or ugc.</li>
<li><strong>Judge the neighbours.</strong> If a listing sits on a page with a long list of unrelated commercial links, consider asking for removal.</li>
<li><strong>Fix mismatches.</strong> Make the name, address, description and links consistent.</li>
<li><strong>Decide what to keep.</strong> Keep listings that bring readers or customers. Drop or ignore the rest.</li>
</ol>
<p>This takes an afternoon for a small profile, and it is more useful than adding ten more listings. If you find links that look like part of a bulk submission you did not make, record them and read <a href="/blog/google-disavow-backlinks">Google disavow backlinks</a> before taking any action.</p>

<h2>What a Directory Link Costs</h2>
<p>Many listings are free; ${D.free} of the ${D.ok} pages mention free directories. Paid listings range widely, and some cost more per year than a well-researched outreach email costs in time. Compare the price with the audience the directory actually has, and if you buy through a provider, compare quotes by cost per live link, with the <a href="/tools/link-building-cost-calculator">link building cost calculator</a>. Remember that a paid listing that includes a link should be marked sponsored or nofollow, and that the best reason to pay is to be found by buyers, not to move rankings.</p>

<h2>When Directory Links Make Sense</h2>
<ul>
<li><strong>Local businesses.</strong> Consistent name, address and phone details across a few reputable listings help people find you. See <a href="/blog/local-seo-for-small-business">local SEO for small business</a>.</li>
<li><strong>Agencies and software.</strong> Review and comparison directories are where buyers look, whatever the link attribute.</li>
<li><strong>A brand-new site.</strong> A few relevant listings establish that the business exists.</li>
<li><strong>Verification.</strong> Some directories, profiles and marketplaces confirm that you are who you say you are.</li>
</ul>
<h2>When to Skip Them</h2>
<ul>
<li>The directory lists every kind of site with no review.</li>
<li>The page is crowded with unrelated, commercial links.</li>
<li>The offer is a bundle of hundreds of submissions for a small fee. ${D.bulk} of ${D.ok} pages mention bulk submission, and Google lists low-quality directory links as a spam example.</li>
<li>You expect the link to be your main ranking lever.</li>
</ul>

<h2>How to Submit Well</h2>
<ol>
<li><strong>Prepare one standard profile.</strong> Name, short and long description, category, address if relevant, logo and links. Keep it consistent.</li>
<li><strong>Write a real description.</strong> Do not copy the same text everywhere. Duplicate descriptions add nothing.</li>
<li><strong>Use a brand or descriptive anchor.</strong> Use the <a href="/tools/anchor-text-checker">anchor text checker</a> to see whether too many of your links use the same keywords.</li>
<li><strong>Record each listing.</strong> Date, URL, whether it was free or paid, and the link attribute.</li>
<li><strong>Re-check in a month.</strong> Is the listing live and indexed? Has it been changed?</li>
</ol>

<h2>Common Directory Link Mistakes</h2>
<ul>
<li><strong>Submitting in bulk.</strong> Quantity is the pattern Google lists.</li>
<li><strong>Using a keyword-stuffed business name or description.</strong> That can misrepresent you and look manipulative.</li>
<li><strong>Treating a listing as an editorial link.</strong> Report it as a placed link.</li>
<li><strong>Ignoring the attribute.</strong> If most of your links are nofollow, judge them for exposure.</li>
<li><strong>Letting listings go stale.</strong> Out-of-date details frustrate customers.</li>
<li><strong>Leaving your profile as listings only.</strong> Add links from real articles. See <a href="/blog/high-authority-backlinks">high authority backlinks</a> for how to judge them.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "directory links" on Google US, 24 October 2026. All ${D.shown} listed results returned a readable page. A topic counts once per page when its term appears in the text, which shows presence, not quality of explanation.</li>
<li>Google statements come from its spam policies and its guidance on qualifying outbound links, read on 24 October 2026.</li>
<li>Our own figures come from Search Console on 21 October 2026, from our own submission records, and from opening two listing pages to check the attribute. They describe one young site.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A directory link is a link you place yourself, and quality varies widely.</li>
<li>Google lists low-quality directory or bookmark site links as link spam, yet only ${D.policy} of ${D.ok} top pages name the policy.</li>
<li>22 of our 24 links are listings, and the two we could read were nofollow.</li>
<li>Choose directories for relevance, real users and clean neighbours, not for a score.</li>
<li>Record each listing and add editorial links alongside.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What are directory links?', 'They are links from listings in web, niche or local directories, where you add your business or site to a category. You place them yourself.'],
    ['Do directory links help SEO?', 'Some may help people find you, and a few relevant ones are normal. Google lists low-quality directory or bookmark site links as link spam, and many directories mark links nofollow.'],
    ['Are directory links dofollow or nofollow?', 'It varies. In our small check, the two listing pages we could read both marked our link nofollow. Check any listing with the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.'],
    ['Does Google penalize directory submissions?', "Google's spam policies list low-quality directory links and bulk link creation as link spam. A few relevant, edited listings are not described that way."],
    ['How many directories should I submit to?', 'Google gives no number. A short list of relevant, reputable directories is safer than a bulk submission.'],
    ['Should I pay for a directory listing?', 'Only if the audience is right. A paid listing that includes a link should be qualified with sponsored or nofollow.'],
    ['What are local citations?', 'They are mentions of your name, address and phone number on other sites. Keep them consistent across listings.'],
    ['How do I know if a directory is good?', 'Look for editorial review, relevance, real users, clean neighbours and an indexed listing page. See our six-question checklist above.'],
    ['What is better than directory links?', 'Editorial links earned by content, reclaimed mentions and openly sponsored placements. See <a href="/blog/white-hat-link-building">white hat link building</a>.']
  ])}
`
});
