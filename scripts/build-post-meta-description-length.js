// node scripts/build-post-meta-description-length.js [--write] — data: 8 readable ranking pages (Google US, 3 Nov 2026), Google's "Control your snippets in search results" page read the same day (page says last updated 2026-04-20), and the meta description (excerpt) length of all 363 of our own posts. Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-meta-description-length-2026-11-03.json');
const G = require('../../keyword-research/google-docs-day17-2026-11-03.json').snippet;
const OWN = require('../../keyword-research/own-meta-lengths-2026-11-03.json');
const posts = require('../data/blog.json').filter(p => !['meta-description-length', 'content-gap-analysis', 'subdomain-vs-subdirectory'].includes(p.slug)); const EX = posts.map(p => (p.excerpt || '').length);
const ok = R.filter(o => o.status === 200 && o.words > 400); const c = f => ok.filter(f).length;
const md = ok.map(o => o.metaDescLen).filter(n => n != null).sort((a, b) => a - b);
for (const s of ["There's no limit on how long a meta description can be, but the snippet is truncated in Google Search results as needed, typically to fit the device width.", 'Google sometimes uses the meta description HTML element if it might give users a more accurate description of the page than content taken directly from the page.', 'To specify the maximum length for your snippets, use the max-snippet: [number] meta tag.', 'meta descriptions comprised of long strings of keywords don\'t give users a clear idea of the page\'s content, and are less likely to be displayed as a snippet.'].map(x => x.replace(/'/g, '\'')))
  if (!G.hits.some(h => h.replace(/&#39;|&amp;/g, '\'').includes(s.slice(0, 60)))) throw new Error('Google text changed: ' + s.slice(0, 50));
if (G.updated !== 'Last updated 2026-04-20 UTC') throw new Error('Google page date changed ' + G.updated);
const D = { listed: 8, ok: ok.length, c160: c(o => o.chars.includes(160)), c155: c(o => o.chars.includes(155)), c158: c(o => o.chars.includes(158)), c150: c(o => o.chars.includes(150)), c120: c(o => o.chars.includes(120)), px920: c(o => o.px.includes(920)), mobile: c(o => o.mobile), rewrite: c(o => o.rewrite), truncat: c(o => o.truncat), pixel: c(o => o.pixel), ctr: c(o => o.ctr), example: c(o => o.example), over160: md.filter(n => n > 160).length, within: md.filter(n => n >= 120 && n <= 160).length, under120: md.filter(n => n < 120).length, medianMd: (md[3] + md[4]) / 2, tool: c(o => o.tool) };
const exp = { listed: 8, ok: 8, c160: 6, c155: 3, c158: 2, c150: 3, c120: 4, px920: 4, mobile: 6, rewrite: 6, truncat: 7, pixel: 3, ctr: 5, example: 4, over160: 2, within: 4, under120: 2, medianMd: 138, tool: 8 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error("data changed " + k + " " + D[k]);
const O = { posts: EX.length, under120: EX.filter(n => n < 120).length, mid: EX.filter(n => n >= 120 && n <= 155).length, s156: EX.filter(n => n > 155 && n <= 160).length, over160: EX.filter(n => n > 160).length };
if (O.posts !== 363 || O.under120 !== 19 || O.mid !== 305 || O.s156 !== 33 || O.over160 !== 6 || OWN.median !== 145 || OWN.titleOver60 !== 0 || OWN.titleMedian !== 56) throw new Error('own data changed ' + JSON.stringify(O));
const PCT = Math.round(O.mid / O.posts * 100); // 84
console.log(JSON.stringify(D), JSON.stringify(O), PCT);
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
const A = 'Learn how long a meta description should be, what Google cuts off and how to write one that fits. Based on 8 guides and 363 of our own posts.';
const B = 'This guide to meta description length covers meta description length, ideal meta description length, the maximum meta description length, a meta description length checker and meta description length best practices for SEO in 2026 and beyond for every site.';
const C = 'Meta description length guide.';
build({
  slug: 'meta-description-length', category: 'On-Page SEO', author: 'Muhammad Reyan Nizami', date: '2026-11-03',
  title: 'Meta Description Length: What Google Says vs 8 Guides',
  excerpt: `Meta description length: Google sets no limit, but cuts snippets to fit the screen. We compared ${D.ok} guides and the length of all ${O.posts} of our own posts.`,
  donut: [['META', 'DESCRIPTION'], [['The Short', 'Answer'], 'What Google Says', ['What 8 Guides', 'Recommend'], 'Our 363 Posts', ['How to', 'Write One']]],
  cover: { badge: 'OUR OWN DATA', search: 'meta description length', card: `Posts checked: ${O.posts}`, lines: [`Between 120 and 155: ${O.mid}`, `Median length: ${OWN.median}`, `Over 160: ${O.over160}`, `Guides saying 160: ${D.c160} of ${D.ok}`, 'Google limit: none stated'], last: 'Measured 3 Nov 2026', big: `${PCT}%`, k1: 'of our descriptions are 120 to 155 characters', k2: 'Google sets no limit', title: 'Meta Description Length', sub: 'What Google says vs 8 guides' },
  info: { title: `Meta Description Length: ${D.ok} Guides Read`, sub: 'Organic results for "meta description length", Google US, 3 November 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Quote 160 characters', sub: 'as the limit', n: D.c160 }, { label: 'Mention truncation', sub: 'cut-off text', n: D.truncat }, { label: 'Mention mobile', sub: 'shorter on phones', n: D.mobile }, { label: 'Say Google may rewrite', sub: 'your text', n: D.rewrite }, { label: 'Quote a pixel width', sub: 'as well', n: D.pixel }],
    rightTitle: 'Our own posts', rightTag: 'Measured 3 Nov 2026', items: [{ t: `${O.mid} of ${O.posts}`, s: 'descriptions are 120 to 155 characters' }, { t: `${OWN.median}`, s: 'median characters' }, { t: 'No limit', s: "Google's own words" }],
    big: `${PCT}%`, noteHtml: `of our ${O.posts} meta descriptions sit inside the range the guides call safe.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for meta description length say`, sub: `Organic results read on 3 November 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Mention truncation or cut-off text', `${D.truncat} of ${D.ok}`], ['Quote 160 characters', `${D.c160} of ${D.ok}`], ['Mention mobile', `${D.mobile} of ${D.ok}`], ['Say Google may rewrite the text', `${D.rewrite} of ${D.ok}`], ['Quote 120 characters for mobile', `${D.c120} of ${D.ok}`], ['Quote a 920 pixel desktop width', `${D.px920} of ${D.ok}`], ['Mention click-through rate', `${D.ctr} of ${D.ok}`], ['Quote 155 characters', `${D.c155} of ${D.ok}`], ['Quote 150 characters', `${D.c150} of ${D.ok}`], ['Quote 158 characters', `${D.c158} of ${D.ok}`], ['Show an example', `${D.example} of ${D.ok}`]] },
    google: { title: 'What Google says about snippet length', sub: "From Google's page on snippets, read on 3 November 2026 (page last updated 20 April 2026).", head: ['Topic', 'Google says'], lastBold: false,
      rows: [['Limit', 'No limit on how long a meta description can be'], ['Display', 'Truncated as needed, typically to fit the device width'], ['Source', 'Page content or the meta description, whichever describes the page better'], ['Control', 'max-snippet meta tag sets a maximum snippet length'], ['Keyword lists', 'Less likely to be displayed as a snippet']] },
    ours: { title: 'Meta description length across our posts', sub: `Meta description (excerpt) length of all ${O.posts} posts on contomatix.com, counted on 3 November 2026.`, head: ['Length', 'Posts'], lastBold: false,
      rows: [['Under 120 characters', String(O.under120)], ['120 to 155 characters', String(O.mid)], ['156 to 160 characters', String(O.s156)], ['Over 160 characters', String(O.over160)]] }
  },
  content: h => `${h.updated}

<p><strong>Meta description length</strong> is how many characters you write in a page's description tag. <strong>Google sets no limit.</strong> Its own page on snippets says there is no limit on how long a meta description can be, but the snippet is truncated in search results as needed, typically to fit the device width. In practice that means a long description gets cut off, so most guides give a safe range. We read ${D.ok} pages that rank for "meta description length" on 3 November 2026: ${D.c160} of ${D.ok} quote 160 characters as the limit, and ${D.mobile} mention mobile. Then we counted the descriptions of all ${O.posts} posts on our own site. ${O.mid} of them, ${PCT}%, sit between 120 and 155 characters.</p>

<p>This guide gives the short answer, shows what Google says in its own words, compares what the ranking guides recommend, shares our own numbers, and then shows how to check and write descriptions that fit. If you want to see how a snippet will look before you publish, try our free <a href="/tools/serp-snippet-preview">SERP snippet preview</a>, and for the full set of tags see our <a href="/blog/meta-tags-best-practices">meta tags best practices guide</a>.</p>

<h2>Meta Description Length: The Short Answer</h2>
<p>The ideal length of a meta description is <strong>about 120 to 155 characters</strong>. That range is a safe target, not a rule from Google. It keeps the whole text visible on most screens and leaves room for a short sentence that makes a searcher want to click. The maximum meta description length that most guides quote is 160 characters, and ${D.c155} of ${D.ok} use 155 as the safer figure. For SEO, the practical rule is simple: put the most important words first, so that if the end is cut off, nothing important is lost.</p>

<h2>What Google Says About Meta Description Length</h2>
<p>Google's page ${L('https://developers.google.com/search/docs/appearance/snippet', 'Control your snippets in search results')} says it was last updated on 20 April 2026. On length, it says: "There's no limit on how long a meta description can be, but the snippet is truncated in Google Search results as needed, typically to fit the device width." So the limit depends on the screen, not on a fixed number. The page also says Google "sometimes uses the meta description HTML element if it might give users a more accurate description of the page than content taken directly from the page". That means your description is a candidate for the snippet, not a guarantee.</p>
<p>Two more points matter for writing. First, Google warns that meta descriptions made of long strings of keywords do not give users a clear idea of the page's content and are less likely to be displayed as a snippet. Second, if you want to set a maximum, Google points to the <em>max-snippet</em> meta tag, which sets the maximum length of the snippet in characters. That tag limits how much text Google may show, which is a different job from writing a description.</p>
${h.fig('google', 'Table of what Google says about snippet length: no limit on a meta description, truncation to fit the device width, page content or the description as the source, the max-snippet tag as control and keyword lists less likely to be shown')}

<h2>What ${D.ok} Ranking Guides Say About Meta Description Length</h2>
${h.fig('serp', 'Table of what 8 pages on meta description length say: truncation in 7, 160 characters in 6, mobile in 6, Google rewriting in 6 and a 920 pixel width in 4')}
<p>The guides agree on the broad idea and differ on the number. ${D.truncat} of ${D.ok} talk about text being cut off. ${D.c160} quote 160 characters, ${D.c155} quote 155, ${D.c158} quote 158 and ${D.c150} quote 150. The spread is small but real, and it comes from the same cause: Google cuts by width, so the exact number of characters depends on which letters you use. A description full of narrow letters such as i and l fits more characters than one full of wide letters such as m and w. ${D.pixel} guides explain this with a pixel width, and ${D.px920} give 920 pixels as the desktop limit. We did not test that figure, so treat it as the guides' claim.</p>
<p>${D.mobile} guides add that phones show less. ${D.c120} give 120 characters as the mobile figure. Again this is what the guides say, not a number from Google, and Google's page only says "device width". The safest reading is that the first 120 characters carry the message and the rest is a bonus.</p>

<h2>Why the Guides Say 155 to 160 and Where Pixels Come In</h2>
<p>Search results are drawn in a fixed-width box, so a limit set in characters is always an estimate. Writers started quoting 155 or 160 because most descriptions of that length fit on a desktop screen. If you write 158 characters of wide letters, the end may be cut. If you write 158 characters of narrow letters, it may fit with space to spare. This is why a counter that only counts characters is a rough guide, and why a preview tool that shows the real width is more useful. It is also why we suggest 120 to 155 and not 160: the lower end keeps you safe on phones and the upper end leaves a margin on desktop.</p>

<h2>Our Own Data: The Meta Description Length of ${O.posts} Posts</h2>
<p>On 3 November 2026 we counted the meta description of every post on contomatix.com. On our site the description is the post's summary, and it is the text we put in the description tag. We checked the same range the guides recommend.</p>
${h.fig('ours', 'Split showing the meta description length of 363 posts: 19 under 120 characters, 305 between 120 and 155, 33 between 156 and 160 and 6 over 160')}
<p>Of ${O.posts} posts, <strong>${O.mid} (${PCT}%) are between 120 and 155 characters</strong>, ${O.under120} are under 120, ${O.s156} are between 156 and 160, and ${O.over160} are over 160. The median is ${OWN.median} characters, the shortest is ${OWN.min} and the longest is ${OWN.max}. Our build script prints the length of every new description, so a long one is easy to spot before it goes live. The ${O.over160} that are over 160 are the first ones we will shorten. Our post titles are in range too: none of the ${O.posts} is over 60 characters, and the median is ${OWN.titleMedian}.</p>
${h.info('Infographic of meta description length: 6 of 8 ranking guides quote 160 characters, 7 mention truncation, 6 mention mobile, 305 of our 363 descriptions are 120 to 155 characters, and Google sets no limit')}

<h2>Meta Description Length for SEO: Does the Number Affect Rankings?</h2>
<p>Nothing in Google's page says description length is a ranking factor, and the guides we read do not claim it is. ${D.ctr} of ${D.ok} mention click-through rate instead. The logic is that a description that fits, reads well and matches the search gets more clicks. We have no data of our own on clicks by description length, so we do not claim a measured effect. What the length does control is what the searcher sees: a cut-off sentence looks careless, and a very short description wastes space you could use to explain the page.</p>

<h2>Title Tag and Meta Description Length</h2>
<p>People often search for "title tag and meta description length" together, because both are cut by width. Google's page on titles has its own guidance, and we did not re-read it for this guide, so we only give our own practice: we keep titles to 60 characters or fewer and descriptions to 155 or fewer. Titles come first in the result, so a long one pushes the whole result down the page on a phone. If you are writing both, write the title to name the page and the description to give the reason to click. Our <a href="/tools/meta-tag-generator">meta tag generator</a> counts both as you type.</p>

<h2>Meta Description Minimum Length</h2>
<p>There is no minimum either. Short descriptions are allowed, and ${D.under120} of the ${D.ok} guides' own pages have descriptions under 120 characters. The problem with a very short description is that it wastes the space. A line such as "${C}" is ${C.length} characters, it names the page and says nothing about why to read it. We treat anything under 120 characters as a prompt to add a benefit, a number or a detail, and ${O.under120} of our ${O.posts} posts are in that group today.</p>

<h2>Meta Description Length Examples With Character Counts</h2>
<table><thead><tr><th>Example</th><th>Length</th><th>Verdict</th></tr></thead><tbody>
<tr><td>${A}</td><td>${A.length}</td><td>In range: names the topic, the promise and the proof</td></tr>
<tr><td>${B}</td><td>${B.length}</td><td>Too long and stuffed with the same phrase, so it will be cut and reads badly</td></tr>
<tr><td>${C}</td><td>${C.length}</td><td>Too short: gives no reason to click</td></tr>
</tbody></table>
<p>Notice what the first one does: it opens with the topic, uses the numbers that matter, and still reads like a sentence. The second repeats the key phrase and also runs past the usual limit. Google says keyword lists are less likely to be shown, so the stuffed one is likely to be replaced as well as cut.</p>

<h2>How to Check Your Meta Description Length</h2>
<ol>
<li><strong>Find the description.</strong> View the page source (Ctrl+U) and search for name="description". The text in content is your description.</li>
<li><strong>Count the characters.</strong> Paste it into a counter or use the length of the string in a spreadsheet with LEN. Count spaces too.</li>
<li><strong>Preview it.</strong> Our <a href="/tools/serp-snippet-preview">SERP snippet preview</a> shows how the title and description look in a result, so you can see where the cut falls.</li>
<li><strong>Fix the long ones first.</strong> Sort your pages by length and shorten anything over 155. Put the key point in the first 120.</li>
<li><strong>Check again after publishing.</strong> Search for the page and see what Google shows. It may differ from your text.</li>
</ol>
<p>For a whole site, export your titles and descriptions from a crawl and sort by length. We did the same for our ${O.posts} posts using the data we already hold in our own files. A crawl takes minutes, and it also finds missing and duplicate descriptions, which matter more than a few characters over the line.</p>

<h2>Meta Description Length Checker: What to Look For</h2>
<p>All ${D.tool} of the ${D.ok} pages we read mention a checker, counter or tool, and several of the pages are tools themselves. A good meta description length checker should do three things: count characters including spaces, show a preview with a realistic width, and check the title as well. A counter that gives only a number can say 158 is fine when the text is cut at 150. Use the number as a guide and the preview as the check.</p>

<h2>When Google Rewrites Your Meta Description</h2>
<p>${D.rewrite} of ${D.ok} guides say Google may rewrite the text. Google's page agrees: it uses the description only when that gives a more accurate summary than the page content. You cannot force the snippet, but you can make your description the better choice. Describe what the page actually contains, match the wording of the searches you want, and keep it specific. If Google replaces the text for a query, that is a sign the description did not match what the searcher wanted, so rewrite it around that search. Our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> shows where to find the queries.</p>

<h2>Meta Description Length Best Practices</h2>
<ul>
<li><strong>Aim for 120 to 155 characters.</strong> It is safe on desktop and mostly safe on phones.</li>
<li><strong>Front-load the point.</strong> Put the main words in the first 120 characters.</li>
<li><strong>Write for the person, not for a count.</strong> A natural sentence beats a padded one.</li>
<li><strong>Make each description unique.</strong> Duplicates give Google no reason to prefer yours.</li>
<li><strong>Do not stuff keywords.</strong> Google says keyword lists are less likely to be shown.</li>
<li><strong>Do not rely on the tag for rankings.</strong> It supports clicks, not a known ranking signal.</li>
<li><strong>Use max-snippet only if you need a limit.</strong> It restricts how much text Google may show.</li>
</ul>

<h2>Common Meta Description Length Mistakes</h2>
<ul>
<li><strong>Trusting a character count alone.</strong> Width decides the cut, so preview the result.</li>
<li><strong>Copying one description to many pages.</strong> Each page needs its own summary.</li>
<li><strong>Leaving it empty and hoping.</strong> Google will pick text from the page, which may not be the best part.</li>
<li><strong>Ending on the key point.</strong> If the end is cut, you lose it.</li>
<li><strong>Writing to a limit you never checked.</strong> We found ${O.over160} of ${O.posts} of our own over 160 until we measured.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is the ideal meta description length?', `About 120 to 155 characters. Google sets no limit, but snippets are cut to fit the device width, and ${D.c160} of ${D.ok} guides we read quote 160 characters as the top. A range of 120 to 155 is a safe target.`],
    ['What is the maximum meta description length?', `Google says there is no limit, only truncation as needed to fit the device width. Most guides give 155 to 160 characters as the practical maximum, so keep to that range.`],
    ['Does meta description length affect SEO?', `Google does not say length is a ranking factor. Length affects how the snippet looks and whether it is cut off, which can affect clicks. We have no click data by length, so we do not claim a measured effect.`],
    ['What is the meta description minimum length?', `There is no minimum. We treat anything under 120 characters as a chance to add a benefit or detail, because a very short description wastes the space.`],
    ['How do I check my meta description length?', `View the page source, copy the text in the description tag, and count the characters, including spaces. A snippet preview shows where the text is cut, which a plain counter cannot.`],
    ['Is the length shorter on mobile?', `Guides say so, and ${D.c120} of ${D.ok} give 120 characters for mobile. Google only says the snippet fits the device width, so put the key point in the first 120 characters.`],
    ['Does Google always use my meta description?', `No. Google says it sometimes uses the description when it gives a more accurate summary than the page content. ${D.rewrite} of ${D.ok} guides also say it may rewrite the text.`],
    ['What is the title tag and meta description length?', `We keep titles to 60 characters or fewer and descriptions to 155 or fewer. Google gives no fixed number for either, and both are cut by width.`],
    ['What is a meta description length checker?', `A tool that counts the characters in a description and, in a good one, previews the snippet at a realistic width. Use the number as a guide and the preview as the check.`]
  ])}

<p>Want your site's titles, descriptions and snippets reviewed against your Search Console data? <a href="/contact">Talk to us</a> and we will tell you where the quick wins are.</p>`
});
