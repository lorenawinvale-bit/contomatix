// node scripts/build-post-content-brief-template.js [--write] — data: 5 readable ranking pages for "content brief template" (Google US, 27 Oct 2026) + a benchmark of 218 ranking pages from 32 of our own SERP reads (15-26 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const kr = path.join(__dirname, '..', '..', 'keyword-research');
const R = require('../../keyword-research/serp-content-brief-template-2026-10-27.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const D = { listed: 8, ok: ok.length, median: w[2], audience: c('audience'), goal: c('goal'), keyword: c('keyword'), intent: c('intent'), outline: c('outline'), wordCount: c('wordCount'), competitors: c('competitors'), sources: c('sources'), cta: c('cta'), tone: c('tone'), internalLinks: c('internalLinks'), meta: c('meta'), faq: c('faq'), tools: c('tools'), ai: c('ai'), example: c('example'), deadline: c('deadline'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 8, ok: 5, median: 3064, audience: 5, goal: 5, keyword: 5, intent: 4, outline: 5, wordCount: 4, competitors: 5, sources: 5, cta: 4, tone: 5, internalLinks: 4, meta: 3, faq: 4, tools: 5, ai: 4, example: 5, deadline: 5, gdoc: 0, dated: 2 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// benchmark across our own SERP reads, 15-26 Oct 2026 only (later files are excluded so the numbers stay fixed)
const all = []; const files = fs.readdirSync(kr).filter(f => /^serp-.*-2026-10-(1[5-9]|2[0-6])\.json$/.test(f));
for (const f of files) { let j; try { j = JSON.parse(fs.readFileSync(path.join(kr, f), 'utf8')); } catch (e) { continue; } if (!Array.isArray(j)) continue; j.filter(o => o && o.status === 200 && o.words > 500).forEach(o => all.push(o)); }
const ws = all.map(o => o.words).sort((a, b) => a - b); const q = p => ws[Math.floor(p * (ws.length - 1))];
const wd = all.filter(o => 'date' in o), wg = all.filter(o => 'googleDoc' in o);
const B = { sets: new Set(files.filter(f => { try { return Array.isArray(JSON.parse(fs.readFileSync(path.join(kr, f), 'utf8'))); } catch (e) { return false; } })).size, pages: all.length, median: Math.round((ws[Math.floor((ws.length - 1) / 2)] + ws[Math.ceil((ws.length - 1) / 2)]) / 2), p25: q(0.25), p75: q(0.75), under1500: ws.filter(x => x < 1500).length, over3000: ws.filter(x => x > 3000).length, dateN: wd.length, dated: wd.filter(o => o.date).length, docN: wg.length, docLink: wg.filter(o => o.googleDoc).length };
const expB = { sets: 32, pages: 218, median: 2421, p25: 1409, p75: 3267, under1500: 56, over3000: 72, dateN: 89, dated: 34, docN: 141, docLink: 35 };
for (const k of Object.keys(expB)) if (B[k] !== expB[k]) throw new Error('benchmark changed ' + k + ' ' + B[k]);
console.log(JSON.stringify(D), JSON.stringify(B));
const f = n => n.toLocaleString('en-US'); const pc = (a, b) => Math.round(a / b * 100) + '%';
build({
  slug: 'content-brief-template', category: 'Content Marketing', author: 'Umaira Liaquat', date: '2026-10-27',
  title: 'Content Brief Template: 12 Fields and What 218 Pages Show',
  excerpt: `Content brief template with the 12 fields we use, an example from our own work and a benchmark of ${B.pages} ranking pages: median ${f(B.median)} words, only ${pc(B.dated, B.dateN)} dated.`,
  donut: [['CONTENT BRIEF', 'TEMPLATE'], [['Name the', 'Keyword'], 'State the Intent', ['List the', 'Sources'], 'Outline the Page', ['Check Before', 'Publishing']]],
  cover: { badge: 'OUR OWN BENCHMARK', search: 'content brief template', card: `Ranking pages read: ${B.pages}`, lines: [`Median length: ${f(B.median)} words`, `Under 1,500 words: ${B.under1500} pages`, `Over 3,000 words: ${B.over3000} pages`, `Show a date: ${B.dated} of ${B.dateN}`], last: 'Briefs should state length and dates', big: f(B.median), k1: 'median words of ranking pages', k2: `across ${B.sets} searches`, title: 'Content Brief Template', sub: '12 fields and what 218 pages show' },
  info: { title: `Content Brief Template: ${D.ok} Pages Read`, sub: 'Organic results for "content brief template", Google US, 27 October 2026', leftTitle: 'Fields the pages include', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Audience', sub: 'named', n: D.audience }, { label: 'Outline or headings', sub: 'named', n: D.outline }, { label: 'Sources or references', sub: 'named', n: D.sources }, { label: 'Word count or length', sub: 'named', n: D.wordCount }, { label: 'Internal links', sub: 'named', n: D.internalLinks }],
    rightTitle: 'Twelve fields we use', rightTag: 'Short version', items: [{ t: 'Goal and audience', s: 'who, why' }, { t: 'Keyword and intent', s: 'one per page' }, { t: 'Outline and FAQ', s: 'from real queries' }, { t: 'Sources and links', s: 'checked, dated' }],
    big: f(B.median), noteHtml: `median <em>words</em> of the ${B.pages} ranking pages we read in October 2026.` },
  tables: {
    serp: { title: `What ${D.ok} content brief template pages include`, sub: `Organic results for "content brief template" read on 27 October 2026 (${D.listed} listed, ${D.ok} readable; two were template galleries we did not read and one returned an error). Sites are not named. A field counts once per page.`, head: ['Field or topic', 'Pages'], lastBold: false,
      rows: [['Audience or persona', `${D.audience} of ${D.ok}`], ['Goal or objective', `${D.goal} of ${D.ok}`], ['Target keyword', `${D.keyword} of ${D.ok}`], ['Search intent', `${D.intent} of ${D.ok}`], ['Outline or headings', `${D.outline} of ${D.ok}`], ['Word count or length', `${D.wordCount} of ${D.ok}`], ['Competitor or SERP analysis', `${D.competitors} of ${D.ok}`], ['Sources or references', `${D.sources} of ${D.ok}`], ['Internal links', `${D.internalLinks} of ${D.ok}`], ['Meta title or description', `${D.meta} of ${D.ok}`], ['Mention AI', `${D.ai} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a publish or update date', `${D.dated} of ${D.ok}`]] },
    data: { title: `What ${B.pages} ranking pages look like`, sub: `Pages from ${B.sets} of our own Google US SERP reads, 15 to 26 October 2026 (pages over 500 words). Sites are not named. Date and Google-link counts use only the pages where we recorded them.`, head: ['Measure', 'Value'], lastBold: false,
      rows: [['Ranking pages read', String(B.pages)], ['Median length', `${f(B.median)} words`], ['Middle half of pages', `${f(B.p25)} to ${f(B.p75)} words`], ['Under 1,500 words', `${B.under1500} (${pc(B.under1500, B.pages)})`], ['Over 3,000 words', `${B.over3000} (${pc(B.over3000, B.pages)})`], ['Show a publish or update date', `${B.dated} of ${B.dateN} (${pc(B.dated, B.dateN)})`], ["Link Google's documentation", `${B.docLink} of ${B.docN} (${pc(B.docLink, B.docN)})`]] },
    brief: { title: 'Our content brief, field by field', sub: 'The fields we fill before we write any post. Example values are from our own PR link building post, 26 October 2026.', head: ['Field', 'Example from our PR link building brief'], lastBold: false,
      rows: [['Primary keyword', 'pr link building (600 searches a month, KD 4)'], ['Intent', 'Informational: how it works, risks and a plan'], ['Cannibalization check', 'Search Console and our own posts: no page competes'], ['Pages to read', '8 ranking guides, read on the day'], ['Primary sources', "Google's spam policies and outbound link guidance"], ['Our own data', 'Counts from the 8 guides, plus our own link figures'], ['Headings from keywords', 'Six to ten low-volume terms from Ahrefs'], ['Length', 'At least 2,200 words'], ['Images', 'Cover, 3 tables as proof images, 1 infographic'], ['Internal links', 'Related posts and the matching free tool'], ['Quality rules', 'Nothing unsourced, no competitor named'], ['Pre-publish checks', 'Word count, FAQ count, image check, audit']] }
  },
  content: h => `${h.updated}

<p><strong>A content brief</strong> is a short document that tells a writer what a page must achieve and contain: the keyword, the reader's intent, the outline, the sources and the rules. We read ${D.ok} pages that rank for "content brief template" on 27 October 2026. All ${D.ok} list an audience, goal, target keyword, outline and sources, but ${D.wordCount} of ${D.ok} mention length, ${D.gdoc} link to Google's documentation and only ${D.dated} show a date. To give you a benchmark the templates do not, we also analysed ${B.pages} ranking pages from our own SERP reads in October 2026: the median is ${f(B.median)} words, and ${B.over3000} of them run past 3,000.</p>

<p>This guide gives you the 12 fields we fill in before we write any post, a worked example from our own work, what the data says about length and dates, and advice on blog briefs, AI and tools. To turn the fields into a document in a minute, use our free <a href="/tools/content-brief-generator">content brief generator</a>.</p>

<h2>What Is a Content Brief? (Content Brief Meaning)</h2>
<p>The content brief meaning is simple: it is the plan that sits between keyword research and a draft. Without one, a writer guesses the angle, the length and what to cover, and an editor finds the problems after the work is done. A good brief fixes those choices first. It is not a draft, and it is not a list of keywords to stuff in. It is a set of decisions: who the page is for, what question it answers, what evidence it will use and what a reviewer will check.</p>

<h2>Content Brief Template: The 12 Fields We Use</h2>
${h.fig('brief', 'Table of the 12 fields in our content brief: primary keyword, intent, cannibalization check, pages to read, primary sources, our own data, headings from keywords, length, images, internal links, quality rules and pre-publish checks, with an example from our PR link building post')}
<ol>
<li><strong>Primary keyword.</strong> One per page, with volume and difficulty so you know what you are targeting.</li>
<li><strong>Intent.</strong> What the searcher wants: to learn, compare, buy or find a page. It decides the format.</li>
<li><strong>Cannibalization check.</strong> Confirm that no other page on your site targets the same keyword. In Search Console, filter queries by the main word and see which pages appear.</li>
<li><strong>Pages to read.</strong> The results that already rank. Read them on the day, note what they cover and what they skip.</li>
<li><strong>Primary sources.</strong> The documents that settle facts, such as the search engine's own documentation.</li>
<li><strong>Your own data.</strong> Something only you can add: a measurement, a count, a screenshot, a test.</li>
<li><strong>Headings from keywords.</strong> Six to ten related low-volume terms that become the H2s and FAQ questions.</li>
<li><strong>Length.</strong> A target based on what ranks, not a guess.</li>
<li><strong>Images.</strong> What visuals the page needs, with alt text.</li>
<li><strong>Internal links.</strong> Related pages to link to, and which pages should link back.</li>
<li><strong>Quality rules.</strong> Nothing unsourced, dates stated, no claims you cannot back.</li>
<li><strong>Pre-publish checks.</strong> The checks a reviewer will run.</li>
</ol>

<h2>SEO Content Brief: What ${B.pages} Ranking Pages Show</h2>
${h.fig('data', 'Table of what 218 ranking pages from 32 Google searches look like in October 2026: median 2,421 words, 56 under 1,500 words, 72 over 3,000, 34 of 89 showing a date and 35 of 141 linking Google documentation')}
<p>Most briefs set a word count by habit. We set ours from data. Across ${B.sets} searches we read ${B.pages} ranking pages. The median is ${f(B.median)} words and the middle half run from ${f(B.p25)} to ${f(B.p75)}. ${B.under1500} pages (${pc(B.under1500, B.pages)}) are under 1,500 words and ${B.over3000} (${pc(B.over3000, B.pages)}) are over 3,000, so length varies a lot by topic. Use the SERP for your keyword, not an average, but it is a useful reminder that a thin page can rank and a long one is not a requirement.</p>
<p>Two other numbers matter for a brief. Of the ${B.dateN} pages where we recorded it, only ${B.dated} (${pc(B.dated, B.dateN)}) showed a publish or update date. And of ${B.docN} pages, only ${B.docLink} (${pc(B.docLink, B.docN)}) linked to Google's own documentation. Both are easy wins: put "state the date" and "link the primary source" in the brief, and your page will do something most of the pages it competes with do not.</p>

${h.info('Infographic of content brief template pages and our benchmark: audience, outline and sources in all 5 pages, word count in 4, and a median of 2,421 words across 218 ranking pages, plus the twelve brief fields in short')}

<h2>Content Brief Template Pages: What ${D.ok} Cover</h2>
${h.fig('serp', 'Table of what 5 content brief template pages include: audience, goal, keyword, outline and sources in all 5, intent, word count, CTA and internal links in 4, meta in 3, none linking Google documentation and 2 showing a date')}
<p>The ${D.ok} readable pages agree on the core fields. Audience, goal, keyword, outline, competitor analysis and sources appear in all ${D.ok}. ${D.intent} cover intent, ${D.wordCount} word count, ${D.internalLinks} internal links, ${D.faq} questions or an FAQ, and ${D.meta} a meta title or description. ${D.ai} mention AI, ${D.tools} name tools and ${D.deadline} mention a deadline or timeline. They run a median of ${f(D.median)} words. What is missing is evidence: none link Google's documentation, and only ${D.dated} show a date. A template is only as good as the research that fills it.</p>

<h2>How to Write a Content Brief, Step by Step</h2>
<ol>
<li><strong>Pick one keyword</strong> and check that nothing on your site already targets it.</li>
<li><strong>Read the results.</strong> Open the top pages. Note the headings, the length, the examples, the sources and what is missing.</li>
<li><strong>Find your angle.</strong> What can you add that is true and checkable: a count, a test, a first-hand step?</li>
<li><strong>List sources.</strong> Primary sources first, such as Google's documentation for anything about Google.</li>
<li><strong>Pull related keywords</strong> and map six to ten of them to headings and questions. Our guide to <a href="/blog/long-tail-low-competition-keywords">long-tail low-competition keywords</a> explains how.</li>
<li><strong>Write the outline</strong> and the FAQ questions as readers would ask them.</li>
<li><strong>Set the rules:</strong> length, tone, images, links, what to avoid.</li>
<li><strong>Add the checks</strong> a reviewer will run before publishing.</li>
</ol>

<h2>SEO Content Brief Example: Our PR Link Building Brief</h2>
<p>Here is the shape of a real brief, using the one for our <a href="/blog/pr-link-building">PR link building</a> post. The keyword was "pr link building" at 600 searches a month and KD 4. The intent was informational. We checked Search Console and found no page on our site competing for it. We read the 8 pages that ranked, and the primary sources were Google's spam policies and its guidance on qualifying outbound links. The data we added was a count of what the 8 guides covered and skipped. Headings came from related low-volume terms, the length target was 2,200 words or more, and the pre-publish checks covered word count, FAQs, images and our site audit. Written down, it takes one page.</p>

<h2>Blog Content Brief vs Website Content Brief Template</h2>
<ul>
<li><strong>Blog content brief.</strong> Focuses on one question and one keyword, an outline of H2s, sources, and internal links to related posts. Length follows the results.</li>
<li><strong>Website content brief template.</strong> For service, product and landing pages. Add the offer, the proof (reviews, results), the call to action and any legal or compliance notes. Length is usually shorter, and conversion matters as much as ranking.</li>
<li><strong>Content strategy brief.</strong> One level up: the topics, audiences and goals across many pages, which then become individual briefs.</li>
</ul>
<p>All three share the same discipline: one clear purpose per page, and evidence for claims. If you run a content programme, keep one master brief template and change the fields that differ.</p>

<h2>AI Content Brief: What to Automate and What Not To</h2>
<p>${D.ai} of the ${D.ok} pages mention AI. It can help with routine parts of a brief: collecting the headings of ranking pages, grouping keywords, drafting a first outline. Do not hand it the parts that need judgement and checking: which angle is true, which sources are authoritative, what your own data shows. Google's guidance on generative AI content says AI can be useful for research and structure, and that using it to produce many pages without adding value for users may violate its spam policy on scaled content abuse, so a brief should require human fact-checking of anything the tool produces. Our <a href="/blog/ai-seo-tools-for-small-business">AI SEO tools for small business</a> guide covers what such tools cost and limit.</p>

<h2>Content Creation Brief: Who Fills Each Field</h2>
<ul>
<li><strong>Strategist or editor:</strong> keyword, intent, cannibalization check, internal links.</li>
<li><strong>Researcher or writer:</strong> pages to read, sources, your own data.</li>
<li><strong>Writer:</strong> outline and headings, within the rules.</li>
<li><strong>Reviewer:</strong> pre-publish checks.</li>
</ul>
<p>On a small team one person does all four, but separating the roles in the brief makes it clear what has to be done before drafting can begin.</p>

<h2>Content Brief Software and Tools</h2>
<p>${D.tools} of ${D.ok} pages name tools, from document templates to dedicated platforms. You can do everything above in a document. If you want a faster start, our <a href="/tools/content-brief-generator">content brief generator</a> builds the structure from your inputs, and the <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> helps you give each keyword to one page. For measuring results after publishing, see <a href="/blog/search-console-impressions-explained">Search Console impressions explained</a>.</p>

<h2>A Blank Brief You Can Copy</h2>
<p>Paste this into a document and fill in each line. The free generator produces the same structure from your inputs.</p>
<pre><code>Primary keyword:
Volume and difficulty:
Intent (learn, compare, buy, find):
Audience:
Goal of the page:
Pages already on our site for this keyword: (none / list)
Pages to read: (the top results)
Primary sources:
Our own data or test:
Headings from keywords (6 to 10):
FAQ questions (as readers ask them):
Target length and why:
Images and alt text:
Internal links in and out:
Rules (tone, claims, dates):
Pre-publish checks: </code></pre>
<p>If you cannot fill in a line, that is a finding. "Our own data or test" left empty means the page will say what every other page says. "Pages already on our site" left unchecked means you may be about to compete with yourself.</p>

<h2>How to Review a Draft Against the Brief</h2>
<ol>
<li><strong>Check the promise.</strong> Does the first paragraph answer the main question and state what the page adds?</li>
<li><strong>Check the headings.</strong> Is each one a topic or question from the brief, in a sensible order?</li>
<li><strong>Check every figure.</strong> Does each number have a source and a date, and does it match the source?</li>
<li><strong>Check the extras.</strong> Are the images, internal links and FAQ in place?</li>
<li><strong>Check for overlap.</strong> Search your own site for the main phrase and confirm no other page is aimed at it.</li>
<li><strong>Record the result.</strong> Note what went wrong and change the template so it does not happen again.</li>
</ol>
<p>This review takes minutes if the brief is clear, and it is the main reason to write one. A brief is not a form to fill in for its own sake: it is the standard against which you judge the work. When the draft and the brief disagree, change whichever one is wrong, and note why, so the next brief is better than this one.</p>

<h2>Common Content Brief Mistakes</h2>
<ul>
<li><strong>Skipping the cannibalization check.</strong> Two pages for one keyword compete with each other.</li>
<li><strong>Setting length by habit.</strong> Look at the results for your keyword.</li>
<li><strong>Briefing from keywords alone.</strong> Keywords do not tell a writer what is true or useful.</li>
<li><strong>No sources.</strong> ${B.docN - B.docLink} of ${B.docN} pages we checked did not link Google's documentation. Do not copy that.</li>
<li><strong>No date.</strong> Only ${pc(B.dated, B.dateN)} of the pages we checked showed one. Readers cannot tell if a page is current.</li>
<li><strong>Too long a brief.</strong> If it needs five pages, nobody reads it.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Template page data comes from the organic results for "content brief template" on Google US, 27 October 2026. ${D.listed} were listed; ${D.ok} returned a readable page. A field counts once per page when its term appears in the text, so it shows presence, not quality.</li>
<li>The benchmark uses ${B.pages} readable pages (over 500 words) from ${B.sets} of our own SERP reads between 15 and 26 October 2026, for topics on link building, technical SEO and SEO tools. It describes those searches, not the web. Date and Google-documentation counts use only the ${B.dateN} and ${B.docN} pages where we recorded them.</li>
<li>Our example brief is the one we used for our PR link building post on 26 October 2026.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A content brief fixes the keyword, intent, sources and rules before drafting.</li>
<li>Our 12 fields are listed above, and the free generator builds them into a document.</li>
<li>Across ${B.pages} ranking pages the median is ${f(B.median)} words, but length varies by topic, so read your own SERP.</li>
<li>Only ${pc(B.dated, B.dateN)} of pages show a date and ${pc(B.docLink, B.docN)} link Google's documentation: put both in your brief.</li>
<li>Use AI for routine steps, and keep judgement and fact-checking human.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is a content brief?', 'It is a short document that tells a writer what a page must achieve and contain: the keyword, intent, audience, outline, sources and rules.'],
    ['What goes in a content brief template?', 'At least the audience, goal, primary keyword, intent, outline, sources, length, internal links and pre-publish checks. We use 12 fields.'],
    ['How long should a content brief be?', 'One or two pages. A brief nobody reads does not help the writer.'],
    ['How do I write an SEO content brief?', 'Pick one keyword, check that no page of yours competes, read the results, list sources, map related keywords to headings and set the rules.'],
    ['How long should the content be?', 'It depends on the topic. The median of 218 ranking pages we read was 2,421 words, and a quarter were under 1,500. Check the results for your keyword.'],
    ['Can AI write a content brief?', 'It can help with routine parts such as collecting headings. A person should decide the angle and check sources and claims.'],
    ['What is the difference between a blog brief and a website brief?', 'A blog brief centres on one question and keyword. A website brief adds the offer, proof and call to action for service or product pages.'],
    ['Is there a free content brief generator?', 'Yes. Our <a href="/tools/content-brief-generator">content brief generator</a> builds a structured brief in your browser from the inputs you enter.'],
    ['How do I avoid two pages competing for one keyword?', 'Assign each keyword to one page. Our <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> helps, and Search Console shows which pages appear for a query.']
  ])}
`
});
