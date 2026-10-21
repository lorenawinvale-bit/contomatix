// Builds the "anchor text seo" post + assets. node scripts/build-post-anchor-text-seo.js [--write]
// Data: every in-content link in our 331 posts dated before 21 Oct 2026 (FAQ blocks excluded); Search Console Links report top linking text (21 Oct 2026); 6 readable organic results for "anchor text seo" (Google US, 21 Oct 2026); Google Search Central link best practices read 21 Oct 2026. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'anchor-text-seo';
const R = require('../../keyword-research/serp-anchor-text-seo-2026-10-21.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], types: c(o => o.anchorTypes), overopt: c(o => o.overopt), pct: c(o => o.percentRule), internal: c(o => o.internal), access: c(o => o.accessibility), example: c(o => o.example), stat: c(o => o.stat), policy: c(o => o.googlePolicy), googleDoc: c(o => o.googleDoc), nofollow: c(o => o.nofollow), relevance: c(o => o.relevance) };
const exp = { ok: 6, median: 2399, types: 6, overopt: 4, pct: 3, internal: 6, access: 6, example: 6, stat: 4, policy: 2, googleDoc: 0, nofollow: 1, relevance: 5 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// our own anchors
const posts = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blog.json'), 'utf8')).filter(p => p.date < '2026-10-21');
const re = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi; const internal = [], external = [];
for (const p of posts) { let m; re.lastIndex = 0; const cc = p.content.replace(/<div class="post-faq">[\s\S]*?<\/div>/, ''); while ((m = re.exec(cc))) { const t = m[2].replace(/<[^>]+>/g, ' ').replace(/&rarr;/g, '→').replace(/\s+/g, ' ').trim(); const h = m[1]; if (!t) continue; if (h.startsWith('/') || /contomatix\.com/.test(h)) internal.push({ t, h, slug: p.slug }); else if (/^https?:/.test(h)) external.push({ t, h }); } }
const w = s => s.split(/\s+/).length; const cat = t => w(t) === 1 ? '1' : w(t) <= 3 ? '2-3' : w(t) <= 6 ? '4-6' : '7+';
const B = { '1': 0, '2-3': 0, '4-6': 0, '7+': 0 }; internal.forEach(x => B[cat(x.t)]++);
const generic = internal.filter(x => /^(click here|here|read more|learn more|website|article|link|page|this|more|this guide|this post|this article|our website|our guide)$/i.test(x.t)).length;
const cta = internal.filter(x => /get a free|get in touch|free seo review|free audit/i.test(x.t)).length;
const uniq = new Set(internal.map(x => x.t.toLowerCase())).size;
const long10 = internal.filter(x => w(x.t) >= 10).length;
const S = { posts: posts.length, n: internal.length, uniq, generic, cta, long10, b1: B['1'], b23: B['2-3'], b46: B['4-6'], b7: B['7+'], ext: external.length };
const expS = { posts: 331, n: 1525, uniq: 659, generic: 0, cta: 244 - 0, long10: 90, b1: 23, b23: 460, b46: 779, b7: 263, ext: 1133 };
console.log(JSON.stringify(D), JSON.stringify(S));
for (const k of Object.keys(expS)) if (S[k] !== expS[k]) console.log('NOTE scan value', k, S[k], 'expected', expS[k]);
if (process.env.STRICT) for (const k of Object.keys(expS)) if (S[k] !== expS[k]) throw new Error('scan changed ' + k);
const pct = n => Math.round(n / S.n * 1000) / 10; const f = n => n.toLocaleString('en-US');
const ctaPct = pct(S.cta);

// ---------- assets
L.donut(SLUG, ['ANCHOR', 'TEXT SEO'], [['Be', 'Descriptive'], 'Stay Concise', ['Skip Keyword', 'Stuffing'], 'Add Context', ['Audit Your', 'Own Anchors']]);
L.cover(SLUG, { badge: 'REAL LINK AUDIT', search: 'anchor text seo', card: `Our posts: ${S.posts}`,
  lines: [`Internal anchors: ${f(S.n)}`, `Unique anchor texts: ${f(S.uniq)}`, `Generic anchors: ${S.generic}`, `4 to 6 words: ${pct(S.b46)}%`, `Repeated CTA anchors: ${ctaPct}%`],
  last: 'Descriptive beats generic', big: `${S.generic}`, k1: `generic anchors in`, k2: `${f(S.n)} internal links`, title: 'Anchor Text SEO', sub: `What ${f(S.n)} of our own anchors show` });
fs.writeFileSync(path.join(__dirname, 'infographic-anchor-text-seo.html'), L.infographicHtml({
  title: `Our ${f(S.n)} Internal Anchors`, sub: `Every in-content link across ${S.posts} posts, counted on 21 October 2026`,
  leftTitle: 'Share of anchors by length', leftTag: `Percent of ${f(S.n)} internal anchors`, max: 60,
  bars: [{ label: '1 word', sub: `${S.b1} anchors`, n: pct(S.b1) }, { label: '2 to 3 words', sub: `${S.b23} anchors`, n: pct(S.b23) }, { label: '4 to 6 words', sub: `${S.b46} anchors`, n: pct(S.b46) }, { label: '7 or more words', sub: `${S.b7} anchors`, n: pct(S.b7) }, { label: 'Repeated CTA text', sub: `${S.cta} anchors`, n: ctaPct }],
  rightTitle: 'Write anchors like this', rightTag: "Google's own guidance", items: [
    { t: 'Descriptive', s: 'makes sense read alone' }, { t: 'Reasonably concise', s: 'not a whole sentence' },
    { t: 'Natural, not stuffed', s: 'no forced keywords' }, { t: 'Spaced out', s: 'do not chain links' }],
  big: `${S.generic}`, noteHtml: `generic anchors such as <em>click here</em> across ${f(S.n)} internal links. ${ctaPct}% are one repeated call to action.` }));
fs.writeFileSync(path.join(__dirname, 'table-anchor-text-seo-ours.html'), L.tableHtml({ title: `Our internal anchors by length (${f(S.n)} links)`, sub: `Every in-content link in our ${S.posts} posts dated before 21 October 2026, FAQ blocks excluded. ${f(S.uniq)} different anchor texts.`,
  head: ['Anchor length', 'Links', 'Share'], lastBold: true,
  rows: [['1 word', String(S.b1), pct(S.b1) + '%'], ['2 to 3 words', String(S.b23), pct(S.b23) + '%'], ['4 to 6 words', String(S.b46), pct(S.b46) + '%'], ['7 or more words', String(S.b7), pct(S.b7) + '%'], ['All internal anchors', f(S.n), '100%']] }));
fs.writeFileSync(path.join(__dirname, 'table-anchor-text-seo-serp.html'), L.tableHtml({ title: `What ${D.ok} pages ranking for anchor text seo say`, sub: `Organic results read on 21 October 2026 (7 listed; ${D.ok} gave a readable guide, one was a forum thread and one blocked our request). Sites are not named.`,
  head: ['Mentioned on the page', 'Pages'], lastBold: false,
  rows: [['Anchor text types (exact, partial, branded, generic)', `${D.types} of ${D.ok}`], ['Internal links', `${D.internal} of ${D.ok}`], ['Accessibility, alt text or "click here"', `${D.access} of ${D.ok}`], ['Examples', `${D.example} of ${D.ok}`], ['Relevance', `${D.relevance} of ${D.ok}`], ['Over-optimisation or penalties', `${D.overopt} of ${D.ok}`], ['Percentages or ratios', `${D.stat} of ${D.ok}`], ['A specific percentage rule for anchors', `${D.pct} of ${D.ok}`], ['Google spam policy', `${D.policy} of ${D.ok}`], ['Nofollow, sponsored or ugc', `${D.nofollow} of ${D.ok}`], ['Citing Google documentation', `${D.googleDoc} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'quote-anchor-text-seo-doc.html'), quote({ source: 'Google Search Central · Link best practices for Google', title: 'Write good anchor text',
  paras: ['Good anchor text is descriptive, reasonably concise, and relevant to the page that it\'s on and to the page it links to. It provides context for the link, and sets the expectation for your readers.',
    'Write as naturally as possible, and resist the urge to cram every keyword that\'s related to the page that you\'re linking to (remember, keyword stuffing is a violation of our spam policies). Don\'t chain up links next to each other.'] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [880, 300]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const q = sz(path.join(pr, 'anchor-text-seo-doc.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p><strong>Anchor text</strong> is the visible, clickable text of a link. Google's documentation says it tells people and Google something about the page you are linking to, and that good anchor text is descriptive, reasonably concise and relevant. We counted every in-content link across our ${S.posts} posts: ${f(S.n)} internal anchors, ${S.generic} of them generic, and ${f(S.uniq)} different anchor texts. We also found a habit we did not expect: ${ctaPct}% of our internal anchors are the same call to action repeated.</p>

<p>Below you will find what Google says about anchor text, what ${D.ok} ranking guides say, what our own anchors look like, how the main anchor types differ, how to write good anchors, how to audit yours and the mistakes to avoid. It builds on our guide to <a href="/blog/internal-link-building">internal link building</a>.</p>

<h2>What Google Says About Anchor Text</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/anchor-text-seo-doc.png" alt="Google Search Central link best practices excerpt: good anchor text is descriptive, reasonably concise and relevant to both pages, write as naturally as possible, resist cramming keywords because keyword stuffing violates spam policies, and do not chain links next to each other" width="${q[0]}" height="${q[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Google's link best practices page is short and specific. Good anchor text is descriptive, reasonably concise and relevant to the page it sits on and the page it links to. It gives context and sets the reader's expectation. The page shows what to avoid: generic anchors such as "click here", "read more", "website" and "article", anchors that are weirdly long, links chained next to each other, and anchor text stuffed with keywords, which the page calls a violation of Google's spam policies. It also offers a simple test: read only the anchor text out of context and check that it makes sense by itself. Google gives no ideal percentage for each anchor type, and none of the pages we read cite its documentation.</p>

<h2>What the Ranking Guides Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/anchor-text-seo-serp.png" alt="Table of what 6 pages ranking for anchor text seo mention: anchor types 6, internal links 6, accessibility or click here 6, examples 6, relevance 5, over-optimisation 4, percentages 4, a specific percentage rule 3, Google spam policy 2, nofollow or sponsored 1 and Google documentation 0" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>They agree on the types.</strong> All ${D.ok} describe anchor types such as exact match, partial match, branded and generic, and all ${D.ok} cover internal links and accessibility.</li>
<li><strong>Over-optimisation is the warning.</strong> ${D.overopt} of ${D.ok} warn about it, which fits Google's note on keyword stuffing.</li>
<li><strong>Some give percentage rules.</strong> ${D.pct} of ${D.ok} state a target mix for anchors. Google's documentation gives no such ratio, so treat these as one author's opinion.</li>
<li><strong>Google is not cited.</strong> None of the ${D.ok} cite Google's own guidance, and only ${D.policy} mention its spam policy.</li>
<li><strong>Real data is missing.</strong> None show the anchors of a real site, which is what we show next.</li>
</ul>

<h2>What Our ${f(S.n)} Internal Anchors Look Like</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/anchor-text-seo-ours.png" alt="Table of Contomatix's internal anchors by length across 331 posts: 1 word 23, 2 to 3 words 460, 4 to 6 words 779, 7 or more words 263, 1,525 internal anchors in total" width="1280" height="@@OURSH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Almost none are generic.</strong> We found ${S.generic} anchors such as "click here" or "read more" among ${f(S.n)} links.</li>
<li><strong>Most are four to six words.</strong> ${pct(S.b46)}% of anchors are four to six words, ${pct(S.b23)}% are two or three and only ${pct(S.b1)}% are a single word.</li>
<li><strong>Some are long.</strong> ${S.long10} anchors run ten words or more, and the longest is seventeen. Google's example of a "weirdly long" anchor is a whole sentence, so ours are within what reads naturally, but they are worth trimming where a shorter phrase says the same thing.</li>
<li><strong>Variety is high.</strong> ${f(S.uniq)} different anchor texts across ${f(S.n)} links shows that we write anchors for context, not from a template.</li>
<li><strong>The repeats are calls to action.</strong> The three most used anchors are "get a free SEO review", "get a free audit" and "get in touch". With similar wording, call-to-action anchors make up ${ctaPct}% of the total. They lead to a contact page, not another article, and they are useful as buttons, but they say little about the page they point to.</li>
</ul>
<p>Our descriptive anchors point at the right pages. The repeated call-to-action anchors are the ones we would rewrite if the goal were stronger context. For most sites the lesson runs the other way: many pages overuse one or two anchors for their money pages. Check your own mix before you change anything.</p>

<h2>What Our External Anchors Look Like</h2>
<p>Search Console's Links report shows the text other sites use when they link to us. The top five anchors, in order, are "visit website", "contomatix", "llms txt generator", an empty anchor (usually an image) and "contomatix com". That is a profile of brand names, a tool name and a generic label, with no keyword-rich commercial anchors at all. It reflects how we got those links: directory profiles that use a generic "visit website" button, listings that name the brand, and tool mentions. Natural link profiles often look like this, with brand and generic anchors dominating. Our guide to <a href="/blog/editorial-backlinks">editorial backlinks</a> shows that the two editorial links we have both use the brand name as the anchor.</p>

<h2>The Main Types of Anchor Text</h2>
<ul>
<li><strong>Branded:</strong> the name of your company or product. Natural, safe and common in earned links.</li>
<li><strong>Exact match:</strong> the keyword you want to rank for. Fine in moderation inside your own site, risky if repeated across links you built, since Google lists keyword-stuffed anchors in its spam examples.</li>
<li><strong>Partial match:</strong> a phrase that includes the keyword with other words. The usual form of a good descriptive anchor.</li>
<li><strong>Naked URL:</strong> the address itself. Common on external links, and in our own outbound links 132 of ${f(S.ext)} are naked URLs.</li>
<li><strong>Generic:</strong> "click here", "read more", "website". Weak for context and accessibility, as Google's page says.</li>
<li><strong>Image:</strong> an image link uses the alt text as its anchor, so write alt text that describes the destination.</li>
</ul>

<h2>How to Write Good Anchor Text</h2>
<ol>
<li><strong>Read it alone.</strong> If the anchor does not make sense without the sentence around it, rewrite it.</li>
<li><strong>Describe the page.</strong> "Resource page link building" tells a reader and Google what they will find. "This guide" does not.</li>
<li><strong>Keep it short enough to scan.</strong> Two to six words is where most of ours sit, but let meaning decide the length.</li>
<li><strong>Write naturally.</strong> If you are forcing a keyword in, you have probably gone too far.</li>
<li><strong>Use the sentence.</strong> The words before and after the link add context, so link a phrase that belongs there.</li>
<li><strong>Space links out.</strong> Do not put several links next to each other.</li>
<li><strong>Vary where it is natural.</strong> Different pages may call for different wording, but never vary just to hit a ratio.</li>
</ol>

<h2>Internal Versus External Anchors</h2>
<p>You control internal anchors, so use them to tell Google and readers what each page is. When several pages link to one target, descriptive anchors that fit each context help more than the same phrase pasted everywhere. For external links you do not control the anchor. Earned links usually use a brand name or a natural phrase, and attempts to dictate exact-match anchors on links you ask for can look manufactured. If you ask for a link, give the URL and let the author choose the wording. The free <a href="/tools/internal-link-checker">internal link checker</a> lists the anchors on a page and flags empty, generic and nofollowed ones.</p>

<h2>Weak and Better Anchors: Examples</h2>
<ul>
<li><strong>Weak:</strong> "For more detail, <a>click here</a>." <strong>Better:</strong> "For more detail, see our guide to <a>checking the backlinks of a website</a>."</li>
<li><strong>Weak:</strong> "We wrote an <a>article</a> about it." <strong>Better:</strong> "We wrote about <a>what makes a link editorial</a>."</li>
<li><strong>Weak:</strong> "Visit our <a>website</a>." <strong>Better:</strong> "Try the free <a>sitemap finder</a>."</li>
<li><strong>Too long:</strong> a full sentence as the anchor. <strong>Better:</strong> link only the phrase that names the destination.</li>
<li><strong>Chained:</strong> several words linked separately in a row. <strong>Better:</strong> one link with the sentence around it.</li>
</ul>
<p>Each better version passes Google's test: read alone, the anchor still tells you what the page is about.</p>

<h2>A Real Rewrite From Our Own Site</h2>
<p>One descriptive anchor on our site, "agency vs. freelancer SEO", appears 34 times in the exact same wording, and two close variants add another 37, all pointing to a single comparison guide. That is a healthy sign that we link to it where it fits, but the repetition also means every one of those links sends the same signal. If we were rewriting, we would keep the phrase where the sentence is about the choice between the two, and use different wording where the context differs, such as "how to compare quotes from agencies and freelancers" or "when a freelancer is enough". The aim is not to avoid repetition for its own sake. It is to make each anchor say what that particular sentence needs, so that the set of anchors describes the page from several angles instead of one.</p>

<h2>Anchor Text for Buttons, Images and Accessibility</h2>
<p>Buttons and image links count as links, and they need anchors too. A button that says "Learn more" is generic, and a screen reader that lists the links on a page will read out ten identical "Learn more" entries with nothing to tell them apart. A button that says "See the SEO audit checklist" works for everyone. For images used as links, the alt text is the anchor, so write it to describe the destination, not the picture. This is why every ranking guide we read mentions accessibility: good anchors help people who use assistive technology and people who skim a page by its links, and what helps those readers is also what Google's guidance describes.</p>

<h2>How to Audit Your Anchors</h2>
<ol>
<li><strong>Collect them.</strong> Export your top linking text from the Links report in Search Console for external anchors and use a crawler or checker for internal ones.</li>
<li><strong>Group them.</strong> Count branded, generic, descriptive, exact-match and naked URL anchors.</li>
<li><strong>Look for repeats.</strong> If one phrase accounts for most links to a page, ask whether it fits every context.</li>
<li><strong>Look for generic labels.</strong> Rewrite "click here" and "read more" into descriptive phrases.</li>
<li><strong>Check image links.</strong> Make sure the alt text describes the destination.</li>
<li><strong>Fix the worst first.</strong> Prioritise pages that matter most to your business.</li>
</ol>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-anchor-text-seo.png" alt="Infographic of the share of Contomatix's 1,525 internal anchors by length and four rules from Google's guidance for writing good anchor text" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Common Anchor Text Mistakes</h2>
<ul>
<li><strong>Using generic anchors.</strong> "Click here" tells nobody anything.</li>
<li><strong>Repeating one exact-match anchor.</strong> Across many links it can read as manipulation.</li>
<li><strong>Making anchors too long.</strong> A whole sentence is hard to scan.</li>
<li><strong>Chaining links.</strong> Adjacent links lose their surrounding context.</li>
<li><strong>Following a ratio rule.</strong> Google gives no percentages, so do not chase one.</li>
<li><strong>Ignoring image alt text.</strong> An image link is only as good as its alt.</li>
</ul>

<h2>How Anchor Text Fits With the Rest of Link Work</h2>
<p>Anchor text is one small part of a link, and it works together with relevance, placement and the page it sits on. A perfect anchor on an irrelevant page does little, and a plain brand-name anchor on a relevant editorial page can be worth far more. So set your priorities in order. First make sure the link is earned or placed for a reason a reader would understand. Then check where it sits and what attribute it carries. Only then worry about the wording. When you plan outreach, think about what you want the author to write and keep your ask short. If you are building a campaign around a handful of target pages, our guide to a <a href="/blog/link-building-campaign">link building campaign</a> shows how to set goals, and our look at <a href="/blog/types-of-backlinks">types of backlinks</a> explains the attribute and placement choices that sit alongside anchor text.</p>
<p>For your own pages, treat anchors as a habit, not a project. When you write a new post, link to two or three related pages with phrases that describe them, and when you update an old post, check that its anchors still make sense read alone. A site that does this consistently ends up with a link graph that explains itself, and that is the outcome Google's guidance is steering towards.</p>

<h2>How We Read the Data</h2>
<ul>
<li>Internal and external anchors come from every in-content link in our ${S.posts} posts dated before 21 October 2026, counted from the post HTML with FAQ blocks excluded. Navigation and footer links are not included.</li>
<li>External anchors for our site come from the top linking text in the Search Console Links report on 21 October 2026, which lists the five most common. Counts for each are not shown there.</li>
<li>We read ${D.ok} ranking guides on one day (Google US). Counts show a term appears, not how well it is explained.</li>
<li>Google's statements come from its Search Central link best practices page, read on 21 October 2026.</li>
<li>Our own anchors are one site's habits, not a benchmark.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Google says good anchor text is descriptive, reasonably concise and relevant, and warns against generic anchors and keyword stuffing.</li>
<li>Across ${f(S.n)} internal anchors we found ${S.generic} generic ones, and ${pct(S.b46)}% are four to six words.</li>
<li>${ctaPct}% of our internal anchors are one repeated call to action, which is useful as a button but weak as context.</li>
<li>Google gives no ideal anchor percentages, so do not chase a ratio.</li>
<li>Audit your own anchors and fix the generic and repeated ones on your most important pages first.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is anchor text in SEO?</summary>
<p>It is the visible, clickable text of a link. Google says it tells people and Google something about the page you link to.</p>
</details>
<details>
<summary>What makes good anchor text?</summary>
<p>According to Google, it is descriptive, reasonably concise and relevant to the page it sits on and the page it links to, and it reads naturally.</p>
</details>
<details>
<summary>Should I use exact match anchors?</summary>
<p>In moderation on your own site, yes. Repeating exact-match anchors across links you build can look manipulative, and Google calls keyword stuffing a violation of its spam policies.</p>
</details>
<details>
<summary>What is the ideal anchor text ratio?</summary>
<p>Google gives no ideal ratio. Some guides state one, but treat it as opinion. Write natural anchors and review your mix for repetition.</p>
</details>
<details>
<summary>Is "click here" bad for SEO?</summary>
<p>Google lists "click here" and "read more" as too generic. They give no context to readers or search engines, so use a descriptive phrase instead.</p>
</details>
<details>
<summary>How long should anchor text be?</summary>
<p>Short enough to scan, usually a few words. Google calls an anchor that is a whole sentence "weirdly long". Most of ours are four to six words.</p>
</details>
<details>
<summary>How do I check my anchor text?</summary>
<p>Use the top linking text in Search Console for external anchors and a link checker or crawler for internal ones, then group them by type.</p>
</details>
<details>
<summary>Does anchor text matter for internal links?</summary>
<p>Yes. Internal anchors are fully in your control and help readers and Google understand what each page is about.</p>
</details>
<details>
<summary>What anchor text should I ask for in outreach?</summary>
<p>Give the URL and let the author choose the words. Earned links usually use a brand name or a natural phrase.</p>
</details>
</div>
`;
const title = 'Anchor Text SEO: What 1,525 of Our Own Internal Links Show';
const excerpt = `Anchor text SEO from Google's guidance and our own data: ${f(S.n)} internal anchors, ${S.generic} generic, and one habit worth fixing. How to write and audit anchors.`;
const out = content.replace('@@SERPH@@', hh('anchor-text-seo-serp.png')).replace('@@OURSH@@', hh('anchor-text-seo-ours.png'));
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Muhammad Reyan Nizami', date: '2026-10-21', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
