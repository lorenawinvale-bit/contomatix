// node scripts/build-post-pbn-backlinks.js [--write] — data: 7 readable ranking pages (Google US, 24 Oct 2026) + 5 Google Search Central docs searched the same day. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-pbn-backlinks-2026-10-24.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-2026-10-24.json');
const D = { shown: 8, ok: ok.length, median: w[3], sell: 3, warn: 4, risk: c('risk'), policy: c('policy'), footprint: c('footprint'), expired: c('expired'), alt: c('alt'), metrics: c('metrics'), define: c('define'), nofollow: c('nofollow'), gdoc: c('googleDoc'), dated: c('date'), gdocs: G.length, gPbn: G.reduce((a, g) => a + g.terms.pbn, 0), gExpired: G[0].terms.expired };
const exp = { shown: 8, ok: 7, median: 2136, sell: 3, warn: 4, risk: 6, policy: 3, footprint: 6, expired: 5, alt: 5, metrics: 4, define: 4, nofollow: 2, gdoc: 2, dated: 1, gdocs: 5, gPbn: 0, gExpired: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
if (!G[0].expiredText.includes('purchased and repurposed primarily to manipulate search rankings')) throw new Error('Google expired-domain text changed');
console.log(JSON.stringify(D));
build({
  slug: 'pbn-backlinks', category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-24',
  title: 'PBN Backlinks: What Top Pages Say and What Google Says',
  excerpt: `PBN backlinks examined: of ${D.ok} top pages, ${D.warn} warn against them and ${D.sell} sell them, and the word PBN appears 0 times in ${D.gdocs} Google docs. A checklist to judge any link source.`,
  donut: [['PBN', 'BACKLINKS'], [['Know the', 'Definition'], 'Read Google', ['Spot the', 'Signals'], 'Weigh the Risk', ['Choose a', 'Cleaner Route']]],
  cover: { badge: 'REAL SERP CHECK', search: 'pbn backlinks', card: `Pages read: ${D.ok} of ${D.shown}`, lines: [`Pages that warn against PBNs: ${D.warn} of ${D.ok}`, `Pages that sell PBN links: ${D.sell} of ${D.ok}`, `Mention risk or penalties: ${D.risk} of ${D.ok}`, `Google docs naming PBN: 0 of ${D.gdocs}`], last: 'Sellers and warners share the page one', big: `${D.sell} of ${D.ok}`, k1: 'ranking pages', k2: 'sell PBN links', title: 'PBN Backlinks', sub: 'What pages say, what Google says' },
  info: { title: `PBN Backlinks: ${D.ok} Pages Read`, sub: 'Organic results for "pbn backlinks", Google US, 24 October 2026', leftTitle: 'What the pages do', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Mention risk or penalty', sub: 'in the text', n: D.risk }, { label: 'Discuss footprints', sub: 'or detection', n: D.footprint }, { label: 'Mention expired domains', sub: 'as the source', n: D.expired }, { label: 'Offer alternatives', sub: 'or white hat routes', n: D.alt }, { label: 'Sell PBN links', sub: 'sales or service pages', n: D.sell }],
    rightTitle: 'Judging any link source', rightTag: 'Four checks', items: [{ t: 'Is there a real audience?', s: 'visitors, not just posts' }, { t: 'Is the topic coherent?', s: 'not random niches' }, { t: 'Who chose the link?', s: 'editor or buyer' }, { t: 'Is it for sale?', s: 'pay-to-post signs' }],
    big: `0 of ${D.gdocs}`, noteHtml: `Google docs we searched name <em>PBN</em>, yet link spam is named in them.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for PBN backlinks say`, sub: `Organic results for "pbn backlinks" read on 24 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Measure', 'Pages'], lastBold: false,
      rows: [['Advise against using PBNs', `${D.warn} of ${D.ok}`], ['Sell or offer PBN links', `${D.sell} of ${D.ok}`], ['Mention risk, penalties or manual actions', `${D.risk} of ${D.ok}`], ['Discuss footprints or detection', `${D.footprint} of ${D.ok}`], ['Mention expired domains', `${D.expired} of ${D.ok}`], ['Offer alternatives or white hat routes', `${D.alt} of ${D.ok}`], ["Name Google's policy", `${D.policy} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Mention nofollow or sponsored', `${D.nofollow} of ${D.ok}`], ['Show a publish or update date', `${D.dated} of ${D.ok}`]] },
    google: { title: 'What Google\'s own documents say', sub: `Five Google Search Central documents searched on 24 October 2026 for the terms below (spam policies, qualifying outbound links, SEO starter guide, ranking systems guide, how Search works).`, head: ['Term', 'Mentions in 5 documents'], lastBold: false,
      rows: [['PBN or private blog network', String(D.gPbn)], ['Expired domain (in the spam policies)', String(D.gExpired)], ['Domain authority, domain rating or authority score', '0'], ['Link spam (a named policy section)', 'Yes'], ['Buying or selling links for ranking purposes', 'Listed as link spam']] },
    signals: { title: 'Signals that a link source may be a network', sub: 'Our checklist. Signals are prompts to look closer, not proof. Check several together.', head: ['Signal', 'How to check'], lastBold: false,
      rows: [['Many unrelated topics on one small site', 'Browse the category list'], ['No real author, about page or contact details', 'Open the About page'], ['Posts that link out to commercial pages with exact-match anchors', 'Run the outbound link checker'], ['A "write for us" or sponsored-post price page', 'Search the site for rates'], ['Domain that changed topic completely', 'Look at its older pages in an archive'], ['No sign of real visitors or social presence', 'Search the brand name']] }
  },
  content: h => `${h.updated}

<p><strong>PBN backlinks</strong> are links from a private blog network: a group of websites built or bought mainly to link to other sites and lift their rankings. We read ${D.ok} pages that rank for the term on 24 October 2026. ${D.warn} of ${D.ok} advise against PBNs, ${D.sell} of ${D.ok} sell them, and in the ${D.gdocs} Google Search Central documents we searched the term PBN appears ${D.gPbn} times, even though the documents describe link spam and expired domain abuse in detail.</p>

<p>This guide explains what the ranking pages say, what Google actually says, the signals that point to a network, why the risk is real, and cleaner routes to the same goal. It is about judging link sources, not building networks. If you are new to link types, start with <a href="/blog/types-of-backlinks">types of backlinks</a>.</p>

<h2>What PBN Backlinks Are</h2>
<p>${D.define} of the ${D.ok} pages define a PBN as a network of websites. The idea: you control many sites, put articles on them with links to your "money site", and hope that the links pass ranking credit. Networks are often built on expired domains that already have a link history, which is why ${D.expired} of ${D.ok} pages mention expired domains. The links are not given by a site that has an independent reason to cite you. They exist because someone arranged them, and that is the root of the problem.</p>

<h2>What ${D.ok} Ranking Pages Say</h2>
${h.fig('serp', 'Table of what 7 pages ranking for PBN backlinks say: 4 advise against PBNs, 3 sell them, 6 mention risk and footprints, 5 mention expired domains and alternatives, 3 name Google policy and 2 link Google documentation')}
<p>The results page for this term is split. ${D.warn} of the ${D.ok} pages are advice pages with titles that warn you off, and ${D.sell} are sales or service pages for PBN links. Both kinds rank together. Among the pages, ${D.risk} of ${D.ok} mention risk or penalties and ${D.footprint} discuss footprints or detection. ${D.alt} offer alternatives. But only ${D.policy} of ${D.ok} name Google's policy and ${D.gdoc} link to Google's documentation, and ${D.nofollow} mention nofollow or sponsored. Only ${D.dated} of ${D.ok} show a publish or update date. They run a median of ${h.f(D.median)} words.</p>
<p>Because sellers and critics sit side by side, a reader can finish a search with opposite impressions. The only way to settle it is to read what Google publishes.</p>

<h2>What Google Actually Says</h2>
${h.fig('google', 'Table of Google Search Central documents searched for PBN terms: PBN or private blog network 0 mentions, expired domain 4 mentions in the spam policies, domain authority terms 0, link spam a named section')}
<p>Google's spam policies do not use the word PBN. They do describe link spam as creating links to or from a site primarily to manipulate search rankings, and they list examples such as buying or selling links for ranking purposes, excessive link exchanges, automated link creation and low-quality directory or bookmark links. A network of sites linking to one another to lift rankings falls under the description, whatever it is called.</p>
<p>The policies also define expired domain abuse: an expired domain name that is purchased and repurposed primarily to manipulate search rankings by hosting content that provides little to no value to users. Many PBNs are built that way. So while Google does not name PBNs, two of its named policies describe how they are typically made. The words are Google's; the conclusion that PBNs are covered is our reading.</p>
<p>Google also separately explains how to qualify links. Paid or sponsored placements should carry <code>rel="sponsored"</code> and user-generated links <code>rel="ugc"</code>. A paid post on a network site with a plain followed link is the unqualified, ranking-credit-passing paid link the policies warn about.</p>

<h2>Signals That a Link Source May Be a Network</h2>
${h.fig('signals', 'Table of signals that a link source may be a private blog network: many unrelated topics, no real author or contact details, posts linking to commercial pages with exact-match anchors, a sponsored-post price page, a domain that changed topic, no sign of real visitors')}
<p>You cannot prove a network from outside, and these signals can also appear on honest sites. Use them as a reason to look closer, and weigh several at once.</p>
<ul>
<li><strong>Random topics.</strong> One small site that covers casinos, dentists and crypto has no audience in common with any of them.</li>
<li><strong>No people.</strong> Missing author names, no About page, no contact details.</li>
<li><strong>Commercial outbound links.</strong> Posts that exist to carry one or two links to commercial pages with keyword-rich anchors. Paste the page into the <a href="/tools/outbound-link-checker">outbound link checker</a> to list the external links and their attributes.</li>
<li><strong>Pay-to-post pages.</strong> A rate card for "guest posts" or "sponsored posts" suggests links are for sale. See <a href="/blog/saas-link-building-services">SaaS link building services</a> for how providers price them.</li>
<li><strong>A changed identity.</strong> A domain that once covered one subject and now covers another entirely.</li>
<li><strong>No real visitors.</strong> No social presence, no brand searches, no comments.</li>
</ul>

<h2>Why the Risk Is Real</h2>
<ul>
<li><strong>Google can ignore the links.</strong> Links created mainly to manipulate rankings may simply stop counting, so you pay for nothing.</li>
<li><strong>Manual actions exist.</strong> Google describes manual actions for violations of its spam policies, and ${D.risk} of ${D.ok} ranking pages mention penalties.</li>
<li><strong>You do not control the network.</strong> The owner can sell the domain, change the content or lose it, and your links disappear or turn into a problem.</li>
<li><strong>Cleaning up is slow.</strong> If you inherit PBN links, you may need to remove or disavow them. Google says most sites do not need the disavow tool, so read <a href="/blog/google-disavow-backlinks">Google disavow backlinks</a> first.</li>
</ul>

${h.info('Infographic of what 7 pages ranking for PBN backlinks do: 6 mention risk, 6 discuss footprints, 5 mention expired domains, 5 offer alternatives and 3 sell PBN links, plus four checks for judging any link source')}

<h2>PBNs Versus Things That Only Look Similar</h2>
<p>Not every group of connected sites is a PBN, and confusing them leads to bad decisions in both directions.</p>
<ul>
<li><strong>A real brand with several sites.</strong> A company that runs a main site, a blog and a store links between them for users. That is normal. The question is whether the sites exist for visitors or only to pass links.</li>
<li><strong>Guest-post marketplaces.</strong> A site that accepts paid guest posts from anyone is not necessarily a private network, but it may leave the same footprints: mixed topics, commercial anchors and a price list. Treat it with the same caution.</li>
<li><strong>Link exchange rings.</strong> A group of sites that agree to link to each other are doing what Google calls excessive link exchanges. See <a href="/blog/backlinks-exchange">backlinks exchange</a>.</li>
<li><strong>Web 2.0 and profile pages.</strong> Free pages on large platforms, filled with links, are low-effort placed links, not networks, and the platform may mark outbound links nofollow or ugc.</li>
<li><strong>Directory sprees.</strong> Bulk listings share the problem of scale and low quality. Google lists low-quality directory or bookmark links as an example of link spam.</li>
</ul>
<p>The line between these is intent and scale. A handful of relevant, useful placements is a normal marketing activity. A pattern built to manufacture ranking credit is what the policies describe.</p>

<h2>What to Check Before You Pay for Any Link</h2>
<ol>
<li><strong>Open the page, not just the domain.</strong> Is the article useful on its own? Would a reader miss it if the link were removed?</li>
<li><strong>Read the neighbours.</strong> If the page links to five unrelated commercial sites, yours is one of a crowd.</li>
<li><strong>Look at the attribute.</strong> If money is involved, the link should be marked sponsored or nofollow. Check it with the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.</li>
<li><strong>Check indexing.</strong> A page that Google has not indexed cannot pass anything. See <a href="/blog/how-to-index-backlinks">how to index backlinks</a>.</li>
<li><strong>Ask about removal.</strong> Who can take the link down, and what happens when the site changes hands?</li>
<li><strong>Write it down.</strong> Record the URL, date, price and attribute in a sheet. A <a href="/tools/link-building-cost-calculator">cost per live link</a> figure helps you compare against cleaner options.</li>
</ol>

<h2>If You Have Already Used PBN Links</h2>
<p>Many site owners inherit a profile built by a former agency or freelancer. If you suspect network links, work calmly and in order.</p>
<ol>
<li><strong>List your links.</strong> Export them from Search Console and note the referring sites. Search Console shows only a sample, so treat the list as a starting point.</li>
<li><strong>Classify them.</strong> Mark each source as editorial, placed, paid or suspected network, using the signals above.</li>
<li><strong>Stop adding new ones.</strong> Pause any provider whose method you cannot explain.</li>
<li><strong>Ask for removal.</strong> If you can contact the site owner or provider, request removal of the clearest cases.</li>
<li><strong>Use disavow only when it fits.</strong> Google says most sites do not need the tool. Read <a href="/blog/google-disavow-backlinks">Google disavow backlinks</a> before you submit a file.</li>
<li><strong>Replace with earned links.</strong> Over the next quarter, add clean links from real pages so the profile does not rest on a few weak sources.</li>
</ol>
<p>Recovery is rarely instant, because Google must recrawl the links and re-evaluate. Keep your records and measure progress in Search Console over months, not days.</p>

<h2>Questions to Ask Any Link Seller</h2>
<ul>
<li>Which sites will my link appear on, and can I see them before I pay?</li>
<li>Do these sites have real visitors, authors and a coherent topic?</li>
<li>Is the link marked sponsored or nofollow if it is paid?</li>
<li>Will the same sites also link to other customers in the same niche?</li>
<li>What happens if the domain is sold or the page is removed?</li>
</ul>
<p>A seller who will not name the sites is selling something you cannot evaluate. ${D.metrics} of ${D.ok} pages lean on authority metrics such as DA or DR to describe quality, but those are third-party numbers, not something Google uses. See <a href="/blog/high-authority-backlinks">high authority backlinks</a>.</p>

<h2>Cleaner Routes to the Same Goal</h2>
<p>${D.alt} of ${D.ok} pages offer alternatives. The routes below get links from real sites with real audiences:</p>
<ul>
<li><strong>Reclaim mentions.</strong> Ask sites that already name you to add a link. See <a href="/blog/link-reclamation">link reclamation</a>.</li>
<li><strong>Build something citable.</strong> A tool, dataset or clear guide. See <a href="/blog/linkable-assets">linkable assets</a>.</li>
<li><strong>Pitch editors.</strong> Use the <a href="/blog/link-prospecting">link prospecting guide</a> to find pages worth contacting.</li>
<li><strong>Buy openly.</strong> Where you pay for exposure, mark the link sponsored. See <a href="/blog/white-hat-link-building">white hat link building</a>.</li>
<li><strong>Plan the mix.</strong> Our <a href="/blog/link-acquisition">link acquisition</a> guide scores each method on control, cost, speed and risk.</li>
</ul>

<h2>Why Sellers Keep Pitching Them</h2>
<p>The business case for a seller is simple: a network is cheap to run once built, links can be sold repeatedly, and results are hard for a buyer to audit. For a buyer, the case is weaker. You pay for a link on a page you do not control, on a site with no independent audience, and you cannot see what happens to it next quarter. When ${D.sell} of ${D.ok} pages that rank for the term are sales pages, the lesson is that demand exists, not that the method is endorsed by Google. Compare any offer with the cost and control of the cleaner routes above before you decide.</p>

<h2>Common PBN Mistakes</h2>
<ul>
<li><strong>Believing "private" means "invisible".</strong> Footprints appear in hosting, content, outbound patterns and history, and ${D.footprint} of ${D.ok} pages discuss them.</li>
<li><strong>Judging a source by a metric.</strong> A high DA or DR on an expired domain says little about whether the site has a real audience.</li>
<li><strong>Unqualified paid links.</strong> Paid placements that pass credit are on Google's list.</li>
<li><strong>Putting all links on money pages.</strong> A pattern of exact-match anchors to one commercial page stands out.</li>
<li><strong>Not keeping records.</strong> You cannot clean up what you did not log.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "pbn backlinks" on Google US, 24 October 2026. ${D.shown} were listed; ${D.ok} returned a readable page (one was a forum thread we did not count). A topic counts once per page when its term appears in the text. Pages were classified as warning or selling by reading their titles and opening text.</li>
<li>Google data comes from searching five Search Central documents for the terms shown. It does not cover every Google page, and absence of a word does not mean Google has not discussed the idea.</li>
<li>The signals table is our checklist, not Google guidance, and none of the signals proves a network.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A PBN is a network of sites built mainly to pass links, and the ranking pages are split: ${D.warn} warn, ${D.sell} sell.</li>
<li>Google does not use the word PBN, but it names link spam and expired domain abuse.</li>
<li>Look for signals such as random topics, no real people, pay-to-post pages and no visitors.</li>
<li>The risks are ignored links, manual actions and losing the links when the network changes.</li>
<li>Reclamation, citable assets, outreach and openly sponsored placements are cleaner routes.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What are PBN backlinks?', 'They are links from a private blog network, a group of websites built or bought mainly to link to other sites and lift their rankings.'],
    ['Does Google penalize PBNs?', 'Google does not use the word PBN in the documents we searched, but its spam policies cover link spam and expired domain abuse, and manual actions exist for policy violations.'],
    ['Do PBN links work?', 'Some may pass credit for a while, but links created mainly to manipulate rankings can be ignored and carry risk. Most ranking pages we read advise against them.'],
    ['How can I tell if a link comes from a PBN?', 'Look for random topics, no real authors, commercial outbound links with exact-match anchors, pay-to-post pages and no sign of visitors. These are signals, not proof.'],
    ['Are expired domains always bad?', 'No. Google defines expired domain abuse as repurposing an expired domain primarily to manipulate rankings with content of little value. A real business reusing its own old domain is different.'],
    ['What should I do if I have PBN links?', 'Record them, stop adding more, try to have them removed and consider disavowing in serious cases. Google says most sites do not need the disavow tool.'],
    ['Is buying links the same as using a PBN?', 'Not exactly, but Google lists buying or selling links for ranking purposes as link spam. Paid placements should be marked sponsored or nofollow.'],
    ['What is a safer alternative to a PBN?', 'Link reclamation, citable assets such as tools and data, outreach to real editors and openly sponsored placements. See <a href="/blog/link-acquisition">link acquisition</a>.'],
    ['Why do PBN sellers still rank?', 'Pages that sell and pages that warn both rank for this term, as shown in our scan. Ranking does not mean the method is endorsed by Google.']
  ])}
`
});
