// 10 Nov 2026: adds the Search Console query phrases that were missing word-for-word from the pages updated today. Each edit is one natural phrase in an existing answer or heading.
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const POST = [
  ['b2b-seo-tools', 'No single tool is best for every team, so choose by the question you cannot answer today.', 'Looking for the best rated SEO tool for B2B, or the best tools for SEO B2B teams rely on? No single tool is best for every team, so choose by the question you cannot answer today.'],
  ['301-vs-302-redirect', 'The difference is how long the move is meant to last. A 301 says', 'The difference is how long the move is meant to last, whether you are comparing a 301 redirect 302 pair or looking at how 301 pages behave in search. A 301 says'],
  ['robots-txt-sitemap', 'A Sitemap line in robots.txt is not a crawling rule like Allow or Disallow.', 'The sitemap robots txt line, written as Sitemap:, is not a crawling rule like Allow or Disallow.'],
  ['robots-txt-sitemap', 'Write the full address, including the protocol and host, such as Sitemap: https://example.com/sitemap.xml.', 'Write the full address, including the protocol and host. A sitemap.xml in robots.txt looks like this: Sitemap: https://example.com/sitemap.xml.'],
  ['yoast-seo-sitemap', '<h3>Does Yoast SEO Create a Sitemap?</h3>', '<h3>Does Yoast SEO Create Sitemap Files Automatically?</h3>'],
  ['yoast-seo-sitemap', '<h3>WordPress Sitemap Yoast: Where to Find It</h3>', '<h3>WordPress Sitemap Yoast: Where to Find the Yoast SEO Sitemap Link</h3>'],
  ['yoast-seo-sitemap', 'You do not need to regenerate it by hand, because it updates', 'There is no Yoast regenerate sitemap step to run by hand, because it updates'],
  ['meta-keywords', '<h3>Meta Keywords Google: Does Google Still Use Meta Keywords?</h3>', '<h3>Meta Keywords Google and Google Meta Keywords: Does Google Still Use Meta Keywords?</h3>'],
  ['meta-keywords', 'Meta keywords are a list of words placed in a page\'s HTML in a tag named keywords', 'If you are asking what is meta keywords, it is a list of words placed in a page\'s HTML in a tag named keywords'],
  ['meta-description-length', '<h3>Meta Description Character Limit and Character Count: Why Pixels Matter</h3>', '<h3>Meta Description Character Limit and Meta Description Character Count: Why Pixels Matter</h3>'],
  ['meta-description-length', 'Google says there is no limit on how long a meta description can be, but the snippet is truncated as needed, typically to fit the device width. So the maximum depends on the screen, not a fixed number.', 'Google says there is no limit on how long a meta description can be, but the snippet is truncated as needed, typically to fit the device width. So the Google meta description max length, or meta description maximum length, depends on the screen, not a fixed number.'],
  ['meta-description-length', 'Both are cut by width.', 'Both are cut by width, so meta length matters for the title as well as the description.']
];
for (const [slug, from, to] of POST) {
  const p = posts.find(x => x.slug === slug); if (p.content.includes(to)) { console.log(slug + ': already'); continue; }
  if (!p.content.includes(from)) throw new Error('not found in ' + slug + ': ' + from.slice(0, 60)); if (/—/.test(to)) throw new Error('em dash');
  p.content = p.content.replace(from, to);
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
// tool page
const tp = path.join(__dirname, '..', 'views', 'pages', 'technical-seo-audit-tool.ejs'); let t = fs.readFileSync(tp, 'utf8');
const TOOL = [
  ['<h3>Technical SEO Audit Free and Online Free: No Signup</h3>', '<h3>Technical SEO Audit Online Free: No Signup</h3>'],
  ['Use it as a free technical SEO audit with no account and no install.', 'Use this technical SEO auditing tool as a free technical SEO audit online, with no account and no install.']
];
for (const [from, to] of TOOL) { if (t.includes(to)) continue; if (!t.includes(from)) throw new Error('tool text not found: ' + from.slice(0, 50)); t = t.replace(from, to); }
fs.writeFileSync(tp, t, 'utf8'); console.log('done');
