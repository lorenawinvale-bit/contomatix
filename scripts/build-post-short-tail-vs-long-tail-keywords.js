// node scripts/build-post-short-tail-vs-long-tail-keywords.js [--write]. Data: 6 readable ranking pages (Google US, 5 Nov 2026), 5 Google documentation pages read the same day (0 use the terms), our Search Console export of 28 Oct 2026 (top 1,000 queries split by word count, scripts/crawl-day18.js) and an Ahrefs matching-terms pull (US, KD 15 or less, volume 30 or more). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-short-tail-vs-long-tail-keywords-2026-11-05.json');
const QL = require('../../keyword-research/own-query-length-2026-11-05.json');
const GL = require('../../keyword-research/google-docs-longtail-2026-11-05.json');
if (Object.values(GL).some(d => d.longTail !== 0 || d.shortTail !== 0) || Object.keys(GL).length !== 5) throw new Error('google docs mention the terms now');
const ok = R.filter(o => o.status === 200 && o.words > 400); const c = k => ok.filter(o => o[k]).length; const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { listed: 7, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), definition: c('definition'), volume: c('volume'), intent: c('intent'), conversion: c('conversion'), example: c('example'), competition: c('competition'), local: c('local'), ecommerce: c('ecommerce'), ai: c('ai'), tool: c('tool'), percent: c('percent'), middle: c('middle'), head: c('head'), wordsRule: c('wordsRule') };
const exp = { listed: 7, ok: 6, median: 1682, definition: 2, volume: 5, intent: 5, conversion: 5, example: 4, competition: 6, local: 2, ecommerce: 3, ai: 5, tool: 6, percent: 2, middle: 0, head: 4, wordsRule: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const G = QL.groups; const g1 = G['1-2 words'], g3 = G['3 words'], g4 = G['4 words'], g5 = G['5+ words'];
if (QL.total !== 1000 || QL.totalImp !== 83560 || QL.totalClicks !== 5 || g1.queries !== 119 || g3.queries !== 367 || g4.queries !== 280 || g5.queries !== 234 || g1.imp !== 12783 || g3.imp !== 35445 || g4.imp !== 21270 || g5.imp !== 14062 || g1.avgPos !== 50 || g3.avgPos !== 46.4 || g4.avgPos !== 45.5 || g5.avgPos !== 44.8 || QL.avgWords !== 3.79) throw new Error('own data changed ' + JSON.stringify(QL).slice(0, 200));
const f = n => n.toLocaleString('en-US'); const pc = n => (100 * n / QL.totalImp).toFixed(1);
const S34 = pc(g3.imp + g4.imp), S5 = pc(g5.imp), S12 = pc(g1.imp); // 67.9, 16.8, 15.3
if (S34 !== '67.9' || S5 !== '16.8' || S12 !== '15.3') throw new Error('shares changed ' + S34 + ' ' + S5 + ' ' + S12);
console.log(JSON.stringify(D), S34, S5, S12);
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
build({
  slug: 'short-tail-vs-long-tail-keywords', category: 'Keyword Research', author: 'Muhammad Reyan Nizami', date: '2026-11-05',
  title: 'Short Tail vs Long Tail Keywords: Our 1,000-Query Data',
  excerpt: `Short tail vs long tail keywords with our own Search Console data: 1,000 queries split by word count, what ${D.ok} ranking guides say and what Google does not.`,
  donut: [['SHORT VS', 'LONG TAIL'], [['The Short', 'Answer'], 'Side by Side', ['What 6 Guides', 'Say'], 'Our 1,000 Queries', ['How to', 'Choose']]],
  cover: { badge: 'OUR OWN DATA', search: 'short tail vs long tail keywords', card: `Queries checked: ${f(QL.total)}`, lines: [`1-2 words: ${g1.queries} (pos ${g1.avgPos})`, `3 words: ${g3.queries} (pos ${g3.avgPos})`, `4 words: ${g4.queries} (pos ${g4.avgPos})`, `5+ words: ${g5.queries} (pos ${g5.avgPos})`, 'Google docs using the terms: 0 of 5'], last: 'Search Console, 28 Oct 2026', big: `${S34}%`, k1: 'of impressions: 3 to 4 words', k2: 'Longer queries sat 5 places higher', title: 'Short vs Long Tail', sub: 'What our 1,000 queries show' },
  info: { title: `Short vs Long Tail: ${D.ok} Guides Read`, sub: 'Organic results for "short tail vs long tail keywords", Google US, 5 November 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Mention competition', sub: 'or difficulty', n: D.competition }, { label: 'Mention search volume', sub: 'as the trade-off', n: D.volume }, { label: 'Mention conversion', sub: 'or intent', n: D.conversion }, { label: 'Describe by word count', sub: '3 or more words', n: D.wordsRule }, { label: 'Give a percentage', sub: 'as evidence', n: D.percent }],
    rightTitle: 'Our own queries', rightTag: 'Search Console, 28 Oct 2026', items: [{ t: `${g5.avgPos}`, s: `average position, 5+ word queries` }, { t: `${g1.avgPos}`, s: 'average position, 1 to 2 word queries' }, { t: '0 of 5', s: 'Google docs that use the terms' }],
    big: `${S34}%`, noteHtml: `of our impressions came from queries of <em>3 to 4 words</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for short tail vs long tail keywords say`, sub: `Organic results read on 5 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Mention competition or difficulty', `${D.competition} of ${D.ok}`], ['Mention a tool or generator', `${D.tool} of ${D.ok}`], ['Mention search volume', `${D.volume} of ${D.ok}`], ['Mention search intent', `${D.intent} of ${D.ok}`], ['Mention conversion', `${D.conversion} of ${D.ok}`], ['Mention AI', `${D.ai} of ${D.ok}`], ['Give examples', `${D.example} of ${D.ok}`], ['Describe the tails by word count', `${D.wordsRule} of ${D.ok}`], ['Mention head keywords', `${D.head} of ${D.ok}`], ['Mention online stores', `${D.ecommerce} of ${D.ok}`], ['Mention local search', `${D.local} of ${D.ok}`], ['Give a percentage', `${D.percent} of ${D.ok}`], ['Mention a middle or mid-tail group', `${D.middle} of ${D.ok}`]] },
    ours: { title: 'Our top 1,000 queries by number of words', sub: 'Search Console export of 28 October 2026: queries, impressions and impression-weighted average position, by the number of words in the query.', head: ['Query length', 'Queries', 'Impressions', 'Avg position'], lastBold: false,
      rows: [['1 to 2 words', String(g1.queries), f(g1.imp), String(g1.avgPos)], ['3 words', String(g3.queries), f(g3.imp), String(g3.avgPos)], ['4 words', String(g4.queries), f(g4.imp), String(g4.avgPos)], ['5 or more words', String(g5.queries), f(g5.imp), String(g5.avgPos)]] },
    compare: { title: 'Short tail vs long tail keywords side by side', sub: 'What the guides describe, and what we checked ourselves.', head: ['', 'Short tail', 'Long tail'], lastBold: false,
      rows: [['Typical length', '1 to 2 words', '3 or more words'], ['Search volume', 'High', 'Lower each, large in total'], ['Competition', 'High', 'Usually lower'], ['Intent', 'Broad, unclear', 'Specific, clearer'], ['Best for', 'Awareness', 'Pages that answer one need'], ['Example', 'canonical url', 'canonical url example']] }
  },
  content: h => `${h.updated}

<p><strong>Short tail keywords</strong> are broad searches of one or two words, such as "canonical url". <strong>Long tail keywords</strong> are longer and more specific, usually three or more words, such as "canonical url example". The short answer to which is better: neither on its own. Short tail terms bring more volume and more competition, and long tail terms bring less volume each, with clearer intent. We read ${D.ok} pages that rank for "short tail vs long tail keywords" on 5 November 2026: all ${D.ok} mention competition and a tool, but only ${D.percent} give a percentage as evidence. Then we split our own top 1,000 Search Console queries by length. <strong>${S34}% of our impressions come from queries of three or four words</strong>, and the longest queries sit about five places higher on average than the shortest.</p>

<p>This guide gives the short answer, a side-by-side table, what the ranking guides say and what Google does not, our own numbers, and a way to choose. For a method to find the low-competition ones, see our guide to <a href="/blog/long-tail-low-competition-keywords">long tail low competition keywords</a>.</p>

<h2>Short Tail vs Long Tail Keywords: The Short Answer</h2>
<p>Use short tail keywords to understand a topic and long tail keywords to build pages that answer one need. A short tail keyword shows what people look for in general, and a long tail keyword shows what they want to do. Most sites, new ones especially, win their first rankings with long tail terms, because there are fewer pages competing for each one. That is our approach, and the data below shows its limits as well as its logic.</p>

<h2>What Are Short Tail Keywords?</h2>
<p>Short tail keywords, also called head keywords, are broad terms of one or two words, such as "seo", "backlinks" or "canonical url". ${D.head} of ${D.ok} guides use the head label. They have high search volume and high competition, and the intent is often unclear: someone who searches "canonical url" could want a definition, a tool or a fix. Ranking for one takes a strong site.</p>

<h2>What Are Long Tail Keywords? (Long Tailed Keywords Definition)</h2>
<p>Long tail keywords are longer, more specific phrases, usually three or more words, such as "canonical url example", "check canonical url" or "non canonical url in sitemap". ${D.wordsRule} of ${D.ok} guides describe them by word count, and ${D.definition} spell out the definition in a question. Each one has lower volume, but the intent is clearer, and ${D.conversion} of ${D.ok} guides link them to conversion. Our keyword pull on 5 November 2026 shows the pattern: "canonical url" has about 2,100 searches a month in the US, and the next largest variants have 350 or fewer, each with a clear job.</p>

<h2>Long Tail vs Short Tail Keywords: A Side-by-Side Comparison</h2>
${h.fig('compare', 'Table comparing short tail and long tail keywords on length, search volume, competition, intent, best use and an example')}
<p>The table follows what the guides describe. Two cautions. First, "long" refers to specificity, not only length: some two-word phrases are very specific, and some long ones are searched by thousands. Second, volume, competition and conversion are general patterns, not rules, so check each keyword you plan to use.</p>

<h2>What ${D.ok} Ranking Guides Say About Short and Long Tail Keywords</h2>
${h.fig('serp', 'Table of what 6 pages on short tail vs long tail keywords say: competition and tools in all 6, volume, intent, conversion and AI in 5, a percentage in only 2, and a middle group in none')}
<p>The median guide has about ${h.f(D.median)} words. ${D.ecommerce} mention online stores and ${D.local} mention local search. ${D.ai} mention AI, which suggests the advice is shifting toward questions people ask in AI tools. We did not test that. None of the ${D.ok} mention a middle group between the two, and only ${D.percent} give a percentage as evidence. Most of the advice is argument, not data.</p>

<h2>What Google Says About Short Tail and Long Tail Keywords</h2>
<p>Nothing, as far as its documentation goes. We searched five Google Search Central pages on ${L('https://developers.google.com/search/docs/fundamentals/seo-starter-guide', 'the SEO starter guide')}, the ranking systems guide, how Search works, the spam policies and creating helpful content for "long tail", "long-tail" and "short tail". The terms appear <strong>0 times in all five</strong>. The pages were last updated between 10 December 2025 and 5 October 2026. These terms come from keyword research tools and SEO writing, not from Google. That does not make them useless, but it means the labels are a planning aid. Google ranks pages for queries, not for the length of the keyword.</p>

<h2>We Split Our Own Top 1,000 Queries by Length</h2>
<p>We used our Search Console export of 28 October 2026, which lists our top 1,000 queries. For each query we counted the words and grouped them: one to two words, three, four, and five or more. For each group we added up the impressions and worked out the average position, weighted by impressions.</p>
${h.fig('ours', 'Table of our top 1,000 queries by length: 119 queries of 1 to 2 words at position 50, 367 of 3 words at 46.4, 280 of 4 words at 45.5 and 234 of 5 or more words at 44.8')}
<p>The average query has ${QL.avgWords} words. Three- and four-word queries account for ${S34}% of impressions, five or more words for ${S5}% and one to two words for ${S12}%. The longer the query, the better our average position: ${g1.avgPos} for one to two words, ${g3.avgPos} for three, ${g4.avgPos} for four and ${g5.avgPos} for five or more. That is a gap of about five places between the shortest and longest groups.</p>
${h.info('Infographic of short tail vs long tail keywords: 6 of 6 ranking guides mention competition, only 2 give a percentage, 67.9 percent of our impressions come from 3 to 4 word queries, 5 or more word queries sat at position 44.8 against 50 for 1 to 2 words, and Google docs use the terms 0 times')}

<h2>What Our Data Does Not Show</h2>
<p>Be careful with this result. The gap is small, and every group sits on page five or lower, so none of it is strong ranking. Our top 1,000 queries brought only ${QL.totalClicks} clicks in total, so we cannot say anything about clicks or conversion. Many of our queries are local searches such as "seo company in" and a town name, which are naturally three or four words long. And average position is not a proof of cause: it may be that longer queries are simply less contested for a site like ours. What the data does support is modest: on our site, the very short queries are the hardest to rank for.</p>

<h2>Short Tail vs Long Tail Keywords Examples From Our Own Research</h2>
<p>In the last three days we pulled keyword lists from Ahrefs for the posts on this site (US, difficulty 15 or lower). The same pattern shows up each time: one head term with the most searches, then a spread of specific variants.</p>
<table><thead><tr><th>Topic</th><th>Head term (searches a month)</th><th>Examples of long tail variants</th></tr></thead><tbody>
<tr><td>Meta descriptions</td><td>seo meta description length (1,000)</td><td>ideal length for meta description (150), max meta description length (150), check meta description length (100)</td></tr>
<tr><td>Subdomains</td><td>subdomain seo (1,400)</td><td>subdomain vs subdirectory (800), subdomain vs subfolder (400), robots.txt disallow subdomain (100)</td></tr>
<tr><td>Canonical URLs</td><td>canonical url (2,100)</td><td>non-canonical url (350), canonical url example (250), check canonical url (100)</td></tr>
</tbody></table>
<p>Each variant has a fraction of the head term's volume, but each one is a question a single page can answer: a definition, a limit, a check, a comparison. That is why we turn the variants into headings and FAQ questions inside one guide, instead of writing a thin page for each. The numbers are the tool's estimates, not our traffic, so treat them as a guide to demand.</p>

<h2>Long Tail Keywords for Local Businesses</h2>
<p>Local searches are long tail by nature: a service, a town and sometimes a qualifier. ${D.local} of ${D.ok} guides mention local search, and our own list is full of examples. The caution from our data is that a long local query is only worth targeting if a page actually answers it. We found that many of our town queries were served by pages that did not name the town in the title, and fixing that took verified local pages, not more keywords. Our <a href="/blog/content-gap-analysis">content gap analysis</a> explains how we found them.</p>

<h2>How to Find Long Tail Keywords (Creating Long Tail Keywords)</h2>
<ol>
<li><strong>Start with your own Search Console queries.</strong> They show what you already appear for. Our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> shows where.</li>
<li><strong>Take a head term and expand it.</strong> A keyword tool's matching-terms report lists the longer phrases that contain it. We filter to a low difficulty score and a minimum volume.</li>
<li><strong>Add the question and modifier words:</strong> example, check, vs, template, for beginners, in a place name.</li>
<li><strong>Group the results.</strong> Many long phrases mean the same thing, and one page can answer several. Our free <a href="/tools/keyword-grouping-tool">keyword grouping tool</a> sorts a list into groups.</li>
<li><strong>Map each group to one page.</strong> Use our <a href="/tools/keyword-mapping-tool">keyword mapping tool</a>, and make sure no two pages target the same primary keyword.</li>
</ol>

<h2>Long Tail Keywords Generator: Do You Need One?</h2>
<p>${D.tool} of ${D.ok} guides mention a tool or generator, and "long tail keywords generator" is a search of its own, with about 900 searches a month in the US in our 5 November pull. A generator is a quick way to get ideas, but the ideas still need checking: is there demand, can you answer it better, and does your site already have a page for it? Our method needs only Search Console, a keyword tool's matching terms and a spreadsheet.</p>

<h2>Short Tail vs Long Tail Keywords and Search Intent</h2>
<p>${D.intent} of ${D.ok} guides tie the two groups to search intent, and this is the most useful way to use them. A short tail term such as "canonical url" is mixed: some searchers want a definition, some want an example, and some want a tool to check their own page. A long tail term removes the doubt. "Canonical url example" wants a code sample. "Check canonical url" wants a tool or a method. "Non-canonical url in sitemap" wants a fix. If you write one page for the head term, it has to serve all of those at once, which is why a head term is hard to satisfy and hard to rank for. If you write for the long tail variant, you can match the one job exactly. Before you commit, search the phrase and look at what ranks: guides, tools, product pages or forum threads. The format that already ranks is the clearest hint of what Google thinks the searcher wants.</p>

<h2>Which Should You Target First?</h2>
<ul>
<li><strong>New or low-authority site:</strong> long tail first. There is less competition for each phrase, and each page answers one need.</li>
<li><strong>Established site:</strong> build topic clusters, with a page for the head term and pages for its long tail variants, linked together. See our guide to <a href="/blog/topical-map-seo">topical maps</a>.</li>
<li><strong>Selling something:</strong> map long tail terms to the stage of the decision, with specific terms for buyers who are ready.</li>
<li><strong>Always:</strong> check what already ranks, because the type of page that ranks tells you the intent.</li>
</ul>

<h2>Short Tail and Long Tail Keywords in AI Search</h2>
<p>${D.ai} of ${D.ok} guides mention AI. The reasoning is that people type longer, more conversational questions into AI tools, so long tail phrasing may matter more. We have not measured that on our own data, so we treat it as an open question. What we can say is that a page that answers one specific question clearly is useful whichever way the question arrives.</p>

<h2>Common Mistakes With Short and Long Tail Keywords</h2>
<ul>
<li><strong>Chasing a head term too early.</strong> A new site rarely wins "seo" or "backlinks".</li>
<li><strong>Writing a page per phrase.</strong> Close phrases belong on one page, otherwise your pages compete with each other.</li>
<li><strong>Treating word count as the definition.</strong> A short phrase can be specific, and a long phrase can be vague.</li>
<li><strong>Ignoring intent.</strong> A long tail phrase is worthless if the page does not do what the searcher wants.</li>
<li><strong>Stuffing the phrases.</strong> Use them where they fit naturally, in headings and body.</li>
<li><strong>Assuming conversion.</strong> ${D.conversion} of ${D.ok} guides link long tail terms to conversion, and we found no click data to confirm it on our own site.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is the difference between short tail and long tail keywords?', `Short tail keywords are broad searches of one or two words with high volume and high competition. Long tail keywords are longer and more specific, usually three or more words, with lower volume each and clearer intent.`],
    ['Are long tail keywords better than short tail keywords?', `Not always. Long tail terms are easier to rank for and clearer in intent, but each brings fewer searches. Most sites use short tail terms to plan topics and long tail terms to build pages.`],
    ['How many words is a long tail keyword?', `Usually three or more. ${D.wordsRule} of the ${D.ok} guides we read describe them by word count, but specificity matters more than length.`],
    ['Does Google use the terms short tail and long tail?', `No. We searched five Google Search Central pages and the terms appear 0 times. They come from keyword research and SEO writing.`],
    ['What did your own data show about query length?', `In our top 1,000 queries, ${S34}% of impressions came from queries of three or four words, and average position improved with length, from ${g1.avgPos} for one to two words to ${g5.avgPos} for five or more. The gap is small and the clicks are too few to judge conversion.`],
    ['How do I find long tail keywords?', `Start with your Search Console queries, expand a head term with a keyword tool's matching terms, add question and modifier words, then group the results and map each group to one page.`],
    ['Do I need a long tail keywords generator?', `It helps with ideas, but you still need to check demand and whether you can answer the query better. Search Console and a matching-terms report are enough to start.`],
    ['Are long tail keywords good for local businesses?', `Yes, local searches are long tail by nature. They are only worth targeting if a page really answers them, ideally with the place named in the title and verified local details.`],
    ['Which should a new website target first?', `Long tail. There is less competition for each phrase, and a new site can win specific searches before it can win broad ones.`]
  ])}

<p>Want a keyword plan built from your own Search Console data? <a href="/contact">Talk to us</a> and we will map your queries to pages and show where the gaps are.</p>`
});
