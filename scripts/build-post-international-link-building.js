// node scripts/build-post-international-link-building.js [--write] — data: 8 readable ranking pages (Google US, 26 Oct 2026) + 2 Google Search Central international docs read the same day. Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-international-link-building-2026-10-26.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const GD = require('../../keyword-research/google-docs-2026-10-26.json'); const multi = GD.find(g => g.url.includes('managing-multi-regional-sites')); const loc = GD.find(g => g.url.includes('localized-versions'));
const D = { shown: 9, ok: ok.length, median: Math.round((w[3] + w[4]) / 2), hreflang: c('hreflang'), ccTLD: c('ccTLD'), translate: c('translate'), localPR: c('localPR'), language: c('language'), directories: c('directories'), anchor: c('anchor'), tools: c('tools'), cost: c('cost'), risk: c('risk'), policy: c('policy'), culture: c('culture'), relevance: c('relevance'), steps: c('steps'), partners: c('partners'), define: c('define'), nofollow: c('nofollow'), gdoc: c('googleDoc'), dated: c('date'), gHreflangMulti: multi.terms.hreflang, gCcTLDMulti: multi.terms.ccTLD, gHreflangLoc: loc.terms.hreflang };
const exp = { shown: 9, ok: 8, median: 2613, hreflang: 4, ccTLD: 4, translate: 7, localPR: 6, language: 8, directories: 6, anchor: 1, tools: 8, cost: 5, risk: 7, policy: 4, culture: 7, relevance: 8, steps: 8, partners: 7, define: 7, nofollow: 2, gdoc: 1, dated: 5, gHreflangMulti: 9, gCcTLDMulti: 13, gHreflangLoc: 53 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
build({
  slug: 'international-link-building', category: 'Link Building', author: 'Umaira Liaquat', date: '2026-10-26',
  title: 'International Link Building: 8 Guides and What Google Says',
  excerpt: `International link building: ${D.ok} guides read, Google lists links from other local sites as an audience signal, and a plan for one market.`,
  donut: [['INTERNATIONAL', 'LINK BUILDING'], [['Pick the', 'Market'], 'Localize the Pitch', ['Earn Local', 'Coverage']  , 'Match the Site Setup', ['Track by', 'Country']]],
  cover: { badge: 'REAL SERP CHECK', search: 'international seo link building', card: `Guides read: ${D.ok} of ${D.shown}`, lines: [`Stress relevance: ${D.relevance} of ${D.ok}`, `Mention translation or localization: ${D.translate} of ${D.ok}`, `Mention local PR or media: ${D.localPR} of ${D.ok}`, `Link Google's documentation: ${D.gdoc} of ${D.ok}`], last: 'Google names local links as a signal', big: `${D.gdoc} of ${D.ok}`, k1: 'guides link', k2: "Google's own documentation", title: 'International Link Building', sub: '8 guides and what Google says' },
  info: { title: `International Link Building: ${D.ok} Guides Read`, sub: 'Organic results for "international seo link building", Google US, 26 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Relevance', sub: 'stressed', n: D.relevance }, { label: 'Language', sub: 'native speakers or text', n: D.language }, { label: 'Translation or localization', sub: 'mentioned', n: D.translate }, { label: 'Local media or PR', sub: 'as a source', n: D.localPR }, { label: 'hreflang', sub: 'mentioned', n: D.hreflang }],
    rightTitle: 'A country-by-country plan', rightTag: 'Four steps', items: [{ t: 'Pick one market', s: 'language and country' }, { t: 'Use local sources', s: 'media, associations' }, { t: 'Write natively', s: 'not machine translated' }, { t: 'Set up the site', s: 'URLs and hreflang' }],
    big: `${D.gdoc} of ${D.ok}`, noteHtml: `guides link to <em>Google's international documentation</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for international SEO link building say`, sub: `Organic results for "international seo link building" read on 26 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Relevance', `${D.relevance} of ${D.ok}`], ['Native language or language fit', `${D.language} of ${D.ok}`], ['Steps or how-to', `${D.steps} of ${D.ok}`], ['Translation or localization', `${D.translate} of ${D.ok}`], ['Culture or local context', `${D.culture} of ${D.ok}`], ['Risk or low quality', `${D.risk} of ${D.ok}`], ['Local PR, media or journalists', `${D.localPR} of ${D.ok}`], ['Directories or citations', `${D.directories} of ${D.ok}`], ['hreflang', `${D.hreflang} of ${D.ok}`], ['Country domains (ccTLD)', `${D.ccTLD} of ${D.ok}`], ['Anchor text', `${D.anchor} of ${D.ok}`], ["Name Google's policy", `${D.policy} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`]] },
    google: { title: 'What Google says about reaching a country', sub: 'Two Google Search Central documents on international sites, read on 26 October 2026 (managing multi-regional and multilingual sites; localized versions).', head: ['Point', 'What the document says'], lastBold: false,
      rows: [['Signals of your intended audience', 'Local addresses and phone numbers, local language and currency, links from other local sites, Business Profile signals'], ['Country-specific domain (ccTLD)', 'Clear geotargeting; can only target one country and can be expensive'], ['Subdomains and subdirectories', 'Easier to set up; users may not recognise geotargeting from the URL'], ['hreflang', 'Used to tell Google about localized versions of a page']] },
    plan: { title: 'A plan for one new market', sub: 'Our working method. Times are estimates for a small site.', head: ['Step', 'What to do', 'Time'], lastBold: false,
      rows: [['1. Choose the market', 'One country and language, with real demand and a reason to be there', '1 week'], ['2. Set up the pages', 'Localized pages with a clear URL structure and hreflang where needed', '2 to 4 weeks'], ['3. Build a local list', 'Local media, associations, suppliers and resource pages', '1 week'], ['4. Pitch in the language', 'Native-quality emails and pages, in waves of 5 to 10', 'Ongoing'], ['5. Track by country', 'Live links, their sites and their rel, per market', 'Monthly']] }
  },
  content: h => `${h.updated}

<p><strong>International link building</strong> means earning links from sites in the countries and languages you want to reach. We read ${D.ok} pages that rank for the search on 26 October 2026. All ${D.relevance} of ${D.ok} stress relevance, ${D.translate} of ${D.ok} mention translation or localization, and ${D.localPR} of ${D.ok} point to local media, yet only ${D.gdoc} of ${D.ok} link to Google's own documentation. That documentation, on managing multi-regional sites, lists links from other local sites among the signals that can help identify the audience your site is meant for.</p>

<p>This guide covers what the ${D.ok} pages say, what Google's two international documents say, a plan for one new market, and mistakes to avoid. For the site-setup side, see our guides to <a href="/blog/international-seo-audit">international SEO audits</a> and <a href="/blog/international-seo-consultant-guide-2026">international SEO consultants</a>. For links in general, start with <a href="/blog/what-is-link-building">what link building is</a>.</p>

<h2>What International Link Building Is</h2>
<p>${D.define} of the ${D.ok} pages define it as building links from sites outside your home market, or from sites in other languages. In practice it is link building with two extra constraints. The link has to come from a site your target audience actually reads, and the pitch and the page have to work in that audience's language and context. A link from a large English site to a Spanish page for Spanish readers does less for the Spanish market than a link from a Spanish publication your readers trust.</p>

<h2>What ${D.ok} Top Guides Cover</h2>
${h.fig('serp', 'Table of what 8 international SEO link building guides cover: relevance and language in 8 of 8, steps 8, translation and culture 7, risk 7, local media 6, directories 6, hreflang 4, country domains 4, anchor text 1 and Google documentation 1')}
<p>The pages agree on the basics. Relevance appears in ${D.relevance} of ${D.ok}, language in ${D.language}, steps in ${D.steps}, translation or localization in ${D.translate}, culture in ${D.culture} and risk in ${D.risk}. ${D.localPR} of ${D.ok} point to local media, ${D.directories} to directories or citations, and ${D.partners} to partners or agencies. ${D.tools} of ${D.ok} recommend tools, and ${D.cost} mention cost. They run a median of ${h.f(D.median)} words.</p>
<p>The gaps are in sources. ${D.policy} of ${D.ok} name Google's policy, ${D.gdoc} link to Google's documentation, ${D.dated} show a date, and only ${D.anchor} says anything about anchor text. A link built in another language is still a link, so the same rules apply: do not buy links for ranking purposes, do not use automation, and mark paid placements sponsored (${D.nofollow} of ${D.ok} mention nofollow, sponsored or ugc).</p>

<h2>What Google Says About Reaching a Country</h2>
${h.fig('google', "Table of what Google international documents say: signals of intended audience include local addresses, local language and currency, links from other local sites and Business Profile signals, and URL structure options with country domains, subdomains and subdirectories")}
<p>Google's guidance on managing multi-regional and multilingual sites says other signals to identify the intended audience of your site can include local addresses and phone numbers on the pages, the use of local language and currency, links from other local sites, or signals from your Business Profile where available. That is the clearest statement we found tying links to international targeting, and it explains why local links matter: they are one of several signals, and they work alongside the language and the setup of your pages.</p>
<p>The same documents cover the setup. Country-specific domains give clear geotargeting but can only target one country and can be expensive; subdomains and subdirectories are easier to set up. The words hreflang appear ${D.gHreflangMulti} times in the multi-regional document and ${D.gHreflangLoc} times in the localized versions document, and ccTLD or country-code terms ${D.gCcTLDMulti} times in the first. Only ${D.hreflang} of ${D.ok} link-building guides mention hreflang, which is reasonable, because hreflang is about how you tell Google which page is for which audience, not about how you earn links. Use our <a href="/tools/hreflang-generator">hreflang generator</a> and <a href="/tools/hreflang-sitemap-validator">hreflang sitemap validator</a> for that side.</p>

<h2>A Plan for One New Market</h2>
${h.fig('plan', 'Table of a plan for one new market: choose the market, set up the pages, build a local list, pitch in the language and track by country, with time estimates')}
<ol>
<li><strong>Choose one market.</strong> A country and a language, with real demand. Do not start five at once.</li>
<li><strong>Set up the pages.</strong> Localized, human-quality pages on a clear URL structure. Add hreflang where you have language or country versions.</li>
<li><strong>Build a local list.</strong> Local media, trade bodies, universities, suppliers and resource pages in that country. Use the <a href="/blog/link-prospecting">link prospecting guide</a> and score each target with the <a href="/tools/link-prospect-scorer">link prospect scorer</a>.</li>
<li><strong>Pitch in the language.</strong> ${D.language} of ${D.ok} guides stress language fit. Write natively, or work with a native speaker, and avoid raw machine translation. Local readers notice.</li>
<li><strong>Track by country.</strong> Log each link, its site and its attribute in the <a href="/tools/backlink-monitor-tool">backlink monitor tool</a> and the pipeline in the <a href="/tools/link-building-management-tool">link building management tool</a>.</li>
</ol>

${h.info('Infographic of what 8 international SEO link building guides cover: relevance 8, language 8, translation or localization 7, local media or PR 6, hreflang 4, plus a four-step country-by-country plan')}

<h2>Sources of Local Links</h2>
<ul>
<li><strong>Local media and trade publications.</strong> ${D.localPR} of ${D.ok} guides point here. A data point about the local market is the best hook.</li>
<li><strong>Associations and chambers.</strong> Member and partner pages are often relevant and local.</li>
<li><strong>Universities and research groups.</strong> If you publish useful data, they may cite it.</li>
<li><strong>Local directories and citations.</strong> ${D.directories} of ${D.ok} mention them. Use few and relevant ones, since Google lists low-quality directory links as spam. See <a href="/blog/directory-links">directory links</a>.</li>
<li><strong>Resource pages.</strong> Local resource lists often have dead links you can offer to replace. See <a href="/blog/resource-page-link-building">resource page link building</a>.</li>
<li><strong>Partners and customers.</strong> Local suppliers or clients that mention you can link when they have a reason.</li>
</ul>

<h2>Localizing the Pitch and the Page</h2>
<p>${D.culture} of ${D.ok} guides mention culture or local context. Practical points: use the local spelling, units and currency; refer to examples a local reader knows; check holidays and news cycles before you send; and address the writer the way a local professional would. On the page, make sure the content is useful in that market, not a word-for-word copy. A writer will link to a page that helps their readers, and a page written for another country often does not.</p>

<h2>Choosing Which Market to Start With</h2>
<p>Most guides list steps (${D.steps} of ${D.ok}) but few help you choose the first market. Use evidence you already have rather than a guess:</p>
<ul>
<li><strong>Search Console.</strong> Open Performance, filter by country and see where you already get impressions without trying. A country with growing impressions and few clicks is a good candidate.</li>
<li><strong>Customers and enquiries.</strong> Where do your leads come from? A market that already sends you business needs less convincing.</li>
<li><strong>Language you can support.</strong> Pick a language where you can write, reply to emails and run a call. A link earned in a language you cannot follow turns into a problem the first time someone replies.</li>
<li><strong>Competition for links.</strong> Look at who is linked in the local results for your topic. If the pages that rank cite weak or outdated sources, you have an opening.</li>
</ul>
<p>Write the choice down with the reason, so you can judge it later. Our guide to <a href="/blog/search-console-impressions-explained">Search Console impressions</a> shows how to read country numbers without being fooled by averages.</p>

<h2>Anchor Text and Link Attributes in Other Languages</h2>
<p>Only ${D.anchor} of the ${D.ok} guides says anything about anchor text, and the advice that applies at home applies abroad. Google's link best practices describe good anchor text as descriptive, reasonably concise and relevant, and they list generic anchors such as "click here" as poor. In another language, that means a natural phrase a local writer would use, not a translated keyword. Check your anchors with the <a href="/tools/anchor-text-checker">anchor text checker</a>, which sorts anchors into branded, descriptive, generic and other groups, and look at the rel attribute of each new link with the <a href="/tools/outbound-link-checker">outbound link checker</a>. Paid placements in any country should be marked sponsored, as Google's guidance on qualifying outbound links asks.</p>

<h2>Working With Local Partners and Agencies</h2>
<p>${D.partners} of ${D.ok} guides recommend partners or agencies, and for markets where you do not speak the language this is often sensible. Treat it as you would any provider. Ask which sites the links will come from and whether you can see them before you pay. Ask whether any placement involves money and how it is marked. Ask who writes the pitches and in what language. Ask for a live URL for every link, with its attribute. And be wary of anyone who promises a number of links by a date: that is output, not outcome. The questions in <a href="/blog/white-hat-link-building">white hat link building</a> apply in every country.</p>

<h2>Measuring International Link Building</h2>
<ul>
<li><strong>Live links per country,</strong> counted by referring site, not by link.</li>
<li><strong>Link source type,</strong> separating earned, placed and paid links, as in <a href="/blog/link-acquisition">link acquisition</a>.</li>
<li><strong>Country impressions and clicks</strong> in Search Console for the pages you built links to.</li>
<li><strong>Reply rate</strong> to local pitches, from your pipeline tool.</li>
<li><strong>Cost per live link</strong> in each market, which differs by country and by method.</li>
</ul>
<p>Give each market at least a quarter before you judge it, because Google can take days to weeks to recrawl pages and links, and local writers work to their own schedules.</p>

<h2>Examples of Local Hooks</h2>
<p>A good hook is specific to the market. These are illustrative ideas, not client results:</p>
<ul>
<li><strong>A local data point.</strong> A comparison of prices, regulations or habits in one country, with a sample size and date, that local writers can quote.</li>
<li><strong>A localized tool.</strong> A calculator that uses local currency, tax rates or units. A writer can link to it for readers.</li>
<li><strong>A translated explainer.</strong> A clear guide written natively that fills a gap in local-language resources.</li>
<li><strong>A fix for a dead link.</strong> If a local resource page links to a page that no longer exists, offer yours as the replacement, as described in <a href="/blog/resource-page-link-building">resource page link building</a>.</li>
</ul>

<h2>Checklist Before You Start a Market</h2>
<ol>
<li>I have a reason for this country and this language, written down.</li>
<li>My pages for this market are written for it, with a clear URL structure.</li>
<li>I know which local sites my audience reads and have at least 20 on a list.</li>
<li>I can write and reply in the language, or have someone who can.</li>
<li>I know how I will record each link, its attribute and its cost.</li>
<li>I will not buy or automate links, and I will mark paid placements sponsored.</li>
</ol>
<p>If you can tick all six, you are ready to send your first wave of pitches. If not, fix the gaps first, because they are cheaper to fix than a campaign that does not land. Remember too that a single market done well teaches you what works, such as which hooks local writers reply to and which sources link readily, and you can reuse those lessons when you add the next country. Keep your notes in one place so that the second market starts from what you learned in the first, not from nothing.</p>

<h2>Common International Link Building Mistakes</h2>
<ul>
<li><strong>Chasing global scores.</strong> A strong English-language site may not influence a local market. Relevance came first in all ${D.relevance} of ${D.ok} guides.</li>
<li><strong>Machine-translated pitches and pages.</strong> They read badly and signal low effort.</li>
<li><strong>Buying bulk packages.</strong> ${D.risk} of ${D.ok} guides mention risk. Google lists buying links for ranking purposes and automated links as link spam.</li>
<li><strong>Ignoring the site setup.</strong> Links do not fix unclear URLs or missing localized pages.</li>
<li><strong>Starting too many markets.</strong> Resources spread thinly give weak results everywhere.</li>
<li><strong>Not tracking by country.</strong> Without it you cannot tell which market is working.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "international seo link building" on Google US, 26 October 2026. ${D.shown} were listed; ${D.ok} returned a readable page (one service page was excluded). A topic counts once per page when its term appears in the text.</li>
<li>Google data comes from two Search Central documents on international sites, read the same day. Term counts are exact for those pages and do not cover every Google page.</li>
<li>The plan and time estimates are our own working method, not Google guidance.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>International link building earns links from sites your target country reads, in its language.</li>
<li>Google lists links from other local sites among the signals that can identify your intended audience.</li>
<li>All ${D.ok} guides stress relevance; only ${D.gdoc} links to Google's documentation.</li>
<li>Work one market at a time and set up the pages properly.</li>
<li>Write natively, avoid bulk packages and track links by country.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is international link building?', 'It is earning links from sites in the countries and languages you want to reach, using local sources and local-language pitches.'],
    ['Do local links help international SEO?', 'Google lists links from other local sites among the signals that can help identify the intended audience of your site, alongside local language, currency and addresses.'],
    ['Do I need a country domain to rank in another country?', 'No. Google describes country domains, subdomains and subdirectories as options with different trade-offs. A country domain gives clear geotargeting but can target only one country.'],
    ['Does hreflang help with link building?', 'No. hreflang tells Google which page is for which language or country. It does not earn links, but it helps the right page show for the right audience.'],
    ['Should I translate my pitch emails?', 'Write them natively in the target language, or use a native speaker. Raw machine translation tends to read badly.'],
    ['Are international directories worth it?', 'A few relevant local directories can help people find you. Google lists low-quality directory links as link spam, so avoid bulk submissions.'],
    ['How many links do I need in each country?', 'Google gives no number. Aim for relevant local links and judge them by relevance and audience, not by a global score.'],
    ['Can I buy links for another country?', 'Buying links for ranking purposes is on Google\'s link spam list in any language. Paid placements should be marked sponsored or nofollow.'],
    ['How do I track international links?', 'Log each link with its country, site and attribute. See the <a href="/tools/backlink-monitor-tool">backlink monitor tool</a>.']
  ])}
`
});
