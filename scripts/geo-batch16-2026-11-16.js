// 16 Nov 2026: GEO step for batch 16. Google's AI Overviews for these head queries open with a one-line definition and a short list or example, so we add an answer-first "Short answer" under the intro where the intro was research-first.
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const T = '<!-- geo-2026-11-16 -->';
const SHORT = {
  'backlinks-example': 'a backlink example is one anchor tag on another website\'s page that points to a page on yours, such as the words "LLM SEO checker" linked to our tool in an article. Good examples are editorial, relevant and unpaid. Risky ones are bought, swapped or made by a program, and paid links should be marked sponsored or nofollow.',
  'international-link-building': 'international link building means earning links from sites in the countries and languages you want to reach, with a pitch and a page in that audience\'s language. Start with one market, choose local sources your readers trust, and treat links from other local sites as one signal Google lists among several.',
  'improve-core-web-vitals': 'measure your real pages, find the one metric that fails, fix its cause and measure again. Google asks for LCP within 2.5 seconds, INP under 200 milliseconds and CLS under 0.1. On our own pages the one failure was a layout shift caused by a wrong size on a hero image.',
  'blogger-outreach': 'blogger outreach is contacting bloggers and site owners to earn a mention, link or guest post. Find relevant blogs, qualify them, send a short personal pitch that offers something useful, follow up once or twice and track the result. Do not buy links or send mass identical emails.',
  'backlinks-report': 'a good backlinks report fits on one page and has five rows: referring domains, new and lost referring domains, which pages earned links, the anchor text spread and what it changed in clicks or rankings. Send it monthly, and drop total link counts and vendor scores.'
};
let n = 0;
for (const [slug, text] of Object.entries(SHORT)) {
  const p = posts.find(x => x.slug === slug); if (!p) throw new Error('missing ' + slug); if (p.content.includes(T)) continue;
  const h = p.content.indexOf('<h2>'); if (h < 0) throw new Error('no h2 ' + slug);
  p.content = p.content.slice(0, h) + T + '\n<p><strong>Short answer:</strong> ' + text + '</p>\n' + p.content.slice(h); n++;
}
// exact hyphenated query phrase for the short tail post
const s = posts.find(x => x.slug === 'short-tail-vs-long-tail-keywords'); const h3 = '<h3>How Many Words Are in Short Tail Keywords?</h3>'; const i = s.content.indexOf(h3);
if (i >= 0) { const e = s.content.indexOf('</p>', i); if (!s.content.slice(i, e).includes('short-tail keywords')) { s.content = s.content.slice(0, e) + ' Both short-tail keywords and long-tail keywords are defined by words, but judged by intent.' + s.content.slice(e); n++; } }
fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); console.log('geo edits', n);
