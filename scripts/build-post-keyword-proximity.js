// node scripts/build-post-keyword-proximity.js [--write]. Data: 6 readable ranking pages for "keyword proximity" (Google US, 5 Nov 2026), 5 Google documentation pages read the same day (the word proximity appears 0 times), Google's spam policies page (updated 2026-08-28), and a scan of 40 pages that rank for 6 of our research searches (scripts/crawl-day18.js). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-keyword-proximity-2026-11-05.json');
const GP = require('../../keyword-research/google-docs-proximity-2026-11-05.json');
const PS = require('../../keyword-research/proximity-scan-2026-11-05.json'); const P = PS.summary;
const five = ['starter', 'ranking', 'howsearch', 'spam', 'helpful'];
for (const k of five) if (GP[k].status !== 200 || GP[k].proximity !== 0 || GP[k].keywordProximity !== 0) throw new Error('google doc mentions proximity: ' + k);
const dates = five.map(k => GP[k].updated).join('|'); if (dates !== 'Last updated 2025-12-10 UTC|Last updated 2025-12-10 UTC|Last updated 2025-12-18 UTC|Last updated 2026-08-28 UTC|Last updated 2026-10-05 UTC') throw new Error('google dates changed ' + dates);
if (!GP.spamText.snippet.includes('Keyword stuffing refers to the practice of filling a web page with keywords or numbers in an attempt to manipulate rankings in Google Search results.') || !GP.spamText.snippet.includes('Repeating the same words or phrases so often that it sounds unnatural.')) throw new Error('spam text changed');
const ok = R.filter(o => o.status === 200 && o.words > 400); const c = k => ok.filter(o => o[k]).length; const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { listed: 7, ok: ok.length, median: Math.round((w[2] + w[3]) / 2), definition: c('definition'), rankingFactor: c('rankingFactor'), google: c('google'), density: c('density'), prominence: c('prominence'), exactMatch: c('exactMatch'), stuffing: c('stuffing'), natural: c('natural'), example: c('example'), tool: c('tool'), myth: c('myth'), bing: c('bing'), semantic: c('semantic') };
const exp = { listed: 7, ok: 6, median: 1341, definition: 6, rankingFactor: 3, google: 4, density: 6, prominence: 4, exactMatch: 1, stuffing: 6, natural: 6, example: 5, tool: 5, myth: 1, bing: 0, semantic: 3 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
const by = {}; for (const r of PS.rows) { const o = by[r.q] = by[r.q] || { pages: 0, exact: 0 }; o.pages++; if (r.exactBody) o.exact++; }
const info = Object.entries(by).filter(([q]) => q !== 'meta description checker'); const infoPages = info.reduce((a, [, o]) => a + o.pages, 0), infoExact = info.reduce((a, [, o]) => a + o.exact, 0);
if (P.pages !== 40 || P.queries !== 6 || P.exactBody !== 32 || P.inTitle !== 19 || P.inH1 !== 22 || P.first100 !== 24 || P.allWordsPresent !== 38 || P.noExactButWords !== 6 || P.medianExtra !== 0 || infoPages !== 32 || infoExact !== 30 || by['meta description checker'].exact !== 2 || by['meta description checker'].pages !== 8) throw new Error('scan changed ' + JSON.stringify(P));
const PCT = Math.round(P.exactBody / P.pages * 100), IP = Math.round(infoExact / infoPages * 100); // 80, 94
console.log(JSON.stringify(D), PCT, IP);
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
build({
  slug: 'keyword-proximity', category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-11-05',
  title: 'Keyword Proximity: Does It Matter? We Checked 40 Pages',
  excerpt: `Keyword proximity: Google's docs never mention it, ${D.rankingFactor} of ${D.ok} guides call it a ranking factor, and ${infoExact} of ${infoPages} pages for 5 of our searches use the exact phrase.`,
  donut: [['KEYWORD', 'PROXIMITY'], [['What It', 'Means'], 'What Google Says', ['What 6 Guides', 'Claim'], 'Our 40-Page Scan', ['How to', 'Use It']]],
  cover: { badge: 'OUR OWN SCAN', search: 'keyword proximity', card: `Ranking pages read: ${P.pages}`, lines: [`Exact phrase in body: ${P.exactBody}`, `In the title: ${P.inTitle}`, `In the H1: ${P.inH1}`, `In the first 100 words: ${P.first100}`, 'Google docs using the term: 0 of 5'], last: 'Pages read 5 Nov 2026', big: `${IP}%`, k1: 'of ranking pages use the phrase', k2: 'Google docs never mention proximity', title: 'Keyword Proximity', sub: 'What 40 ranking pages show' },
  info: { title: `Keyword Proximity: ${D.ok} Guides Read`, sub: 'Organic results for "keyword proximity", Google US, 5 November 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Mention stuffing', sub: 'as the risk', n: D.stuffing }, { label: 'Cover density', sub: 'alongside it', n: D.density }, { label: 'Call it a ranking factor', sub: 'on the page', n: D.rankingFactor }, { label: 'Cover semantic search', sub: 'synonyms, NLP', n: D.semantic }, { label: 'Say it is a myth', sub: 'or outdated', n: D.myth }],
    rightTitle: 'Our own scan', rightTag: 'Pages read 5 Nov 2026', items: [{ t: `${P.exactBody} of ${P.pages}`, s: 'ranking pages use the exact phrase' }, { t: `${infoExact} of ${infoPages}`, s: 'for the five informational searches' }, { t: '0 of 5', s: 'Google docs that mention proximity' }],
    big: `${IP}%`, noteHtml: `of pages ranking for 5 of our searches contain the <em>exact phrase</em>, as a phrase.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for keyword proximity say`, sub: `Organic results read on 5 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Define keyword proximity', `${D.definition} of ${D.ok}`], ['Mention keyword density', `${D.density} of ${D.ok}`], ['Mention keyword stuffing', `${D.stuffing} of ${D.ok}`], ['Say to write naturally', `${D.natural} of ${D.ok}`], ['Give an example', `${D.example} of ${D.ok}`], ['Mention a tool or checker', `${D.tool} of ${D.ok}`], ['Mention prominence', `${D.prominence} of ${D.ok}`], ['Mention Google', `${D.google} of ${D.ok}`], ['Call it a ranking factor', `${D.rankingFactor} of ${D.ok}`], ['Mention semantic search or synonyms', `${D.semantic} of ${D.ok}`], ['Mention exact match', `${D.exactMatch} of ${D.ok}`], ['Say it is a myth or outdated', `${D.myth} of ${D.ok}`], ['Mention Bing', `${D.bing} of ${D.ok}`]] },
    ours: { title: 'How 40 ranking pages use the words of the search', sub: 'Pages ranking in Google US for 6 searches we researched (canonical url, short tail vs long tail keywords, keyword proximity, meta description checker, meta description length, content gap analysis), read 5 November 2026.', head: ['Check', 'Pages'], lastBold: false,
      rows: [['Pages read', String(P.pages)], ['All words of the search present', String(P.allWordsPresent)], ['Exact phrase in the body', String(P.exactBody)], ['Exact phrase in the title', String(P.inTitle)], ['Exact phrase in the H1', String(P.inH1)], ['Exact phrase in the first 100 words', String(P.first100)], ['All words present, not as an exact phrase', String(P.noExactButWords)]] },
    google: { title: 'Does Google mention keyword proximity?', sub: 'Google Search Central pages searched for the word proximity on 5 November 2026.', head: ['Page', 'Last updated', 'Uses the word proximity'], lastBold: false,
      rows: [['SEO starter guide', '10 Dec 2025', '0 times'], ['Ranking systems guide', '10 Dec 2025', '0 times'], ['How Search works', '18 Dec 2025', '0 times'], ['Spam policies', '28 Aug 2026', '0 times'], ['Creating helpful content', '5 Oct 2026', '0 times']] }
  },
  content: h => `${h.updated}

<p><strong>Keyword proximity</strong> is how close together the words of a search phrase sit on a page. If you want to rank for "keyword proximity", the words next to each other have the closest proximity, and the same words in separate paragraphs have the weakest. The question that matters is whether Google uses it. <strong>Google's documentation never mentions it.</strong> We searched five Google Search Central pages for the word and found it 0 times. We then read ${D.ok} pages that rank for "keyword proximity" on 5 November 2026: ${D.rankingFactor} of ${D.ok} call it a ranking factor and ${D.myth} calls it outdated. Finally we read 40 pages that rank for six of our own research searches. <strong>${infoExact} of the ${infoPages} that rank for five informational searches (${IP}%) contain the exact phrase.</strong></p>

<p>This guide explains what proximity is, what Google says, what the guides claim, what our scan found and how to use it without stuffing. If you are planning a page, our free <a href="/tools/content-brief-generator">content brief generator</a> sets out the outline and the terms to cover.</p>

<h2>What Is Keyword Proximity?</h2>
<p>${D.definition} of ${D.ok} guides define it the same way: the distance between two or more keywords in a piece of text. For the phrase "meta description length", the best proximity is those three words in a row. If a page says "length of the description in the meta tag", the same words are present, but far apart. In practice the term is used for a phrase in a title, a heading or a sentence. In local SEO "proximity" has a different meaning, the distance between a searcher and a business, which is unrelated to this guide.</p>

<h2>Keyword Proximity Example</h2>
<ul>
<li><strong>Close:</strong> "Our guide to canonical url tags explains the basics."</li>
<li><strong>Looser:</strong> "Our guide to the canonical tag explains how a url is chosen."</li>
<li><strong>Far:</strong> "A canonical tag is added to the head. Later, in a different section, we look at how each url is handled."</li>
</ul>
<p>${D.example} of ${D.ok} guides give an example of this kind. Notice that the close version is also the most natural way to write the sentence. That is the point we come back to: good writing already keeps related words together.</p>

<h2>Keyword Prominence and Proximity: What Is the Difference?</h2>
<p>Prominence is where on the page a keyword appears, such as in the title, the first heading or the first paragraph. Proximity is how close the words are to each other. ${D.prominence} of ${D.ok} guides mention prominence, usually together with density, which is how often the word appears. Our scan looked at prominence too. Of the 40 pages, ${P.inTitle} have the exact phrase in the title, ${P.inH1} in the H1 and ${P.first100} in the first 100 words.</p>

<h2>Does Google Use Keyword Proximity?</h2>
<p>Google's own documentation does not say so. We read the ${L('https://developers.google.com/search/docs/fundamentals/seo-starter-guide', 'SEO starter guide')}, the ranking systems guide, the how Search works page, the spam policies and the creating helpful content page, and the word proximity appears <strong>0 times in all five</strong>. Their last updates run from 10 December 2025 to 5 October 2026.</p>
${h.fig('google', 'Table of five Google Search Central pages, the SEO starter guide, ranking systems guide, how Search works, spam policies and creating helpful content, each using the word proximity 0 times')}
<p>This does not prove Google ignores word distance. Its systems read language, and a page where the words of a query sit together reads more clearly for people and for software. It means no Google source we found describes proximity as a signal, so any claim that it is one comes from somewhere else. That is a useful test for the guides.</p>

<h2>What ${D.ok} Ranking Guides Say About Keyword Proximity</h2>
${h.fig('serp', 'Table of what 6 pages on keyword proximity say: a definition, density and stuffing in all 6, an example in 5, a ranking factor claim in 3, and a myth or outdated warning in 1')}
<p>The median guide has about ${h.f(D.median)} words. All ${D.ok} define it, mention density and mention keyword stuffing, and all ${D.natural} tell you to write naturally. ${D.rankingFactor} call it a ranking factor, ${D.myth} calls it a myth or outdated, and ${D.semantic} bring in semantic search, synonyms or language models. ${D.google} mention Google, but we found none that cite Google documentation on proximity, which fits what we found. ${D.bing} mention Bing.</p>

<h2>We Checked 40 Ranking Pages: Do They Keep the Words Together?</h2>
<p>To see how ranking pages treat proximity, we took the pages that rank in Google US for six searches we researched in the last three days: canonical url, short tail vs long tail keywords, keyword proximity, meta description checker, meta description length and content gap analysis. We read the text of each page and checked three things: whether all the words of the search appear, whether they appear together as an exact phrase, and how many other words sit between them in the closest group.</p>
${h.fig('ours', 'Table of 40 ranking pages: 38 contain all the words of the search, 32 contain the exact phrase, 19 in the title, 22 in the H1, 24 in the first 100 words, and 6 have all the words without the exact phrase')}
<p>Of the 40 pages, ${P.allWordsPresent} contain every word of the search and <strong>${P.exactBody} (${PCT}%) contain the exact phrase.</strong> The median number of extra words in the closest group is ${P.medianExtra}, which means the words are usually side by side. The exact phrase is in the title on ${P.inTitle} pages, in the H1 on ${P.inH1} and in the first 100 words on ${P.first100}.</p>
${h.info('Infographic of keyword proximity: Google documentation uses the word proximity 0 times in 5 pages, 3 of 6 guides call it a ranking factor, and 30 of 32 pages ranking for five informational searches contain the exact phrase')}

<h2>The Exceptions Are the Interesting Part</h2>
<p>The 8 pages for "meta description checker" behave differently: only 2 contain the exact phrase, and 2 do not contain all three words in the text we read. Those are free tools, and they call the same thing a "meta tag analyzer", a "title and description checker" or a "meta description test". The searcher's words and the page's words do not have to match exactly. Two more pages, for "short tail vs long tail keywords", have all the words side by side but in another order: "long tail vs short tail keywords". So proximity is real in how people write, but it is not a rule that an exact phrase must appear. Search engines handle word order and synonyms.</p>
<p>The limits of this scan are plain. These are pages that already rank, so having the phrase may be a result of ranking for it, not a cause. Six searches is a small sample, and we cannot see what Google weighs. What the scan does show is how ranking pages write: they say the thing the searcher typed, in plain words, in the places a reader looks first.</p>

<h2>Same Intent, Different Word Order: Our Own Queries</h2>
<p>Search Console shows how people reorder the same words. In our export of 28 October 2026, the searches for an SEO company in Kent came in many forms. "Seo company kent" had 454 impressions at an average position of 48.6, "seo company in kent" had 335 at 37.3, "kent seo agency" had 303 at 62.1 and "seo agency kent" had 355 at 84.3. These are the same need, written four ways, and our average position ranged from 37 to 84. We cannot tell whether the order caused the difference, because different pages and different words (company or agency) are involved. What it does show is that searchers do not use one fixed phrase, and a page that only matches one of them will miss the others. That is an argument for covering the natural variants in headings and body, rather than counting the distance between two words.</p>

<h2>Keyword Density, Prominence and Proximity: The Old Trio</h2>
<p>The three terms usually come together in older SEO writing: how often (density), where (prominence) and how close (proximity). ${D.density} of ${D.ok} guides mention density. None of the three is in the Google documents we searched, and one, density, has a known trap: repeating a phrase to hit a number. Google defines keyword stuffing as the practice of filling a page with keywords or numbers in an attempt to manipulate rankings, and its ${L('https://developers.google.com/search/docs/essentials/spam-policies', 'spam policies')} (updated 28 August 2026) list repeating the same words or phrases so often that it sounds unnatural. Counting words to hit a target is the wrong job. Our guide to <a href="/blog/meta-keywords">meta keywords</a> shows the same lesson on an older tag.</p>

<h2>A Five-Minute Proximity Check You Can Do Yourself</h2>
<ol>
<li><strong>Search your target phrase</strong> and open the top three results.</li>
<li><strong>Press Ctrl+F on each page</strong> and search for the exact phrase. Note how many times it appears and where: title, heading, first paragraph.</li>
<li><strong>Search for the individual words</strong> to see whether the page uses another wording, such as "analyzer" for "checker".</li>
<li><strong>Do the same on your own page.</strong> If the phrase is missing from your title, H1 and opening paragraph, that is easy to fix.</li>
<li><strong>Read the sentences aloud.</strong> If one sounds like it was written for a search engine, rewrite it.</li>
</ol>
<p>This takes the same approach as our scan, on a small scale, and it tells you more about your own page than any distance counter.</p>

<h2>How to Use Keyword Proximity Without Stuffing</h2>
<ol>
<li><strong>Write the phrase the way a person says it.</strong> If it fits, keep the words together. If it does not, rewrite the sentence rather than force the phrase in.</li>
<li><strong>Put the phrase in the places a reader looks first:</strong> the title, the H1, and the opening paragraph. ${P.inTitle}, ${P.inH1} and ${P.first100} of our 40 pages did.</li>
<li><strong>Use variants in the headings.</strong> A long tail phrase makes a natural H2. See our guide to <a href="/blog/short-tail-vs-long-tail-keywords">short tail vs long tail keywords</a>.</li>
<li><strong>Answer the question directly.</strong> A sentence that states the answer with the phrase in it is the clearest form.</li>
<li><strong>Do not repeat it for its own sake.</strong> If a paragraph reads as if it was written for a tool, cut it.</li>
</ol>

<h2>Keyword Proximity in Titles, Headings and Meta Descriptions</h2>
<p>Titles and descriptions are short, so the words nearly always sit together. Our meta description guide covers <a href="/blog/meta-description-length">meta description length</a>, and keeping the main phrase in the first part of the description matters because the end may be cut. For headings, use the phrase as a person would ask it: "What is keyword proximity?" is both a natural heading and a close match.</p>

<h2>Keyword Proximity Checker: Do You Need One?</h2>
<p>${D.tool} of ${D.ok} guides mention a tool or checker. A tool can count how far apart words are, but that is a measure of text, not of ranking, so we would not use it to decide anything. Reading the sentence aloud tells you more. If you want to see how the top results for a search handle it, do what we did: open them, search the page for the phrase, and note where it appears. Our <a href="/blog/content-gap-analysis">content gap analysis</a> shows how to compare your page with theirs.</p>

<h2>Keyword Proximity, Synonyms and Semantic Search</h2>
<p>${D.semantic} of ${D.ok} guides say proximity matters less now because search engines understand meaning, not just matching words. We cannot test how Google's systems work, but our scan fits the idea: the tool pages that rank for "meta description checker" mostly do not use that phrase, and they rank anyway. A page about checking a meta description can say "analyzer", "tester" or "counter" and still be the right result. For you, the lesson is to cover the topic and its natural words, not to arrange one phrase perfectly. Use the exact phrase where it reads well, use the common alternatives where they fit, and spend the saved effort on answering the question better than the pages already ranking.</p>

<h2>Common Keyword Proximity Mistakes</h2>
<ul>
<li><strong>Counting words between keywords.</strong> Nobody has shown that a number is a target.</li>
<li><strong>Forcing an awkward exact match.</strong> The ranking pages that do not use an exact phrase still rank.</li>
<li><strong>Repeating the phrase to look relevant.</strong> Google's spam policy names this as keyword stuffing.</li>
<li><strong>Ignoring synonyms.</strong> ${D.semantic} of ${D.ok} guides mention semantic search, and our scan found pages ranking without the exact words.</li>
<li><strong>Ignoring the searcher.</strong> A page that matches the words and not the need will not satisfy anyone.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is keyword proximity?', `The distance between the words of a keyword phrase on a page. The closest proximity is when the words sit side by side, as in the phrase itself.`],
    ['Does Google use keyword proximity as a ranking factor?', `Google's documentation does not say so. The word proximity appears 0 times in the five Search Central pages we searched. ${D.rankingFactor} of the ${D.ok} guides we read call it a ranking factor without citing Google.`],
    ['What is the difference between keyword proximity and keyword prominence?', `Proximity is how close the words are to each other. Prominence is where on the page they appear, such as the title, the H1 or the first paragraph.`],
    ['Do ranking pages keep the exact phrase together?', `Mostly. ${P.exactBody} of the 40 pages we read use the exact phrase, and ${infoExact} of ${infoPages} for the five informational searches. The exceptions were tool pages that use other words for the same thing.`],
    ['Is word order important?', `Not strictly. Two ranking pages for "short tail vs long tail keywords" used the same words side by side in another order. Search engines handle word order and synonyms.`],
    ['How close should keywords be?', `There is no documented number. In our scan the median number of extra words in the closest group was ${P.medianExtra}. The practical rule is to write naturally and keep the phrase together when it fits.`],
    ['Is keyword proximity the same as keyword density?', `No. Density is how often a word appears. Proximity is how close words are. Neither is described in the Google pages we read, and repeating a phrase to raise density can become keyword stuffing.`],
    ['Does proximity mean something different in local SEO?', `Yes. In local search, proximity usually means the distance between the searcher and the business, which has nothing to do with the distance between words.`],
    ['Do I need a keyword proximity checker?', `Not to make decisions. A checker measures text, not ranking. Reading the sentence aloud and looking at how the top results write the phrase is more useful.`]
  ])}

<p>Want a review of how your titles, headings and opening paragraphs use the words people search for? <a href="/contact">Talk to us</a> and we will check your key pages against your Search Console data.</p>`
});
