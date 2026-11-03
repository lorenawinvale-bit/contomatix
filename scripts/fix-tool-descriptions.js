// One-off (3 Nov 2026): shorten tool meta descriptions to 155 characters or fewer. Asserts each old string is found once in server.js.
const fs = require('fs'); const path = require('path'); process.chdir(path.join(__dirname, '..'));
const M = [
  ['Build a geo-grid of Google Maps check points around your business, enter the ranks you see, and get an average, top-3 coverage and a heatmap. Free, no signup.', 'Build a geo-grid of Google Maps check points around your business, enter the ranks you see, and get an average, top-3 coverage and heatmap. Free.'],
  ['Build a structured SEO proposal with scope, timeline, reporting and terms. Uses only the fee and dates you enter. Copy, download or print to PDF. Free, no signup.', 'Build a structured SEO proposal with scope, timeline, reporting and terms. Uses only the fee and dates you enter. Copy, download or print. Free.'],
  ['Enter Search Console clicks, impressions and position for two periods and get a plain-language SEO report with CTR, changes, top pages and next steps. Free, no signup.', 'Enter Search Console clicks, impressions and position for two periods and get a plain-language SEO report with CTR, changes and next steps. Free.'],
  ['Run a free SEO page audit: paste a page HTML and check its title, meta description, headings, canonical, robots meta, hreflang, structured data, images and links.', 'Run a free SEO page audit: paste a page HTML and check title, meta description, headings, canonical, robots, hreflang, schema, images and links.'],
  ['Write a short link building outreach email, subject lines and a follow-up for resource pages, broken links, link insertions and guest pitches. Free, no signup.', 'Write a short link building outreach email, subject lines and a follow-up for resource pages, broken links, link insertions and guest pitches. Free.'],
  ['Enter a keyword, intent, audience and your research and get a structured content brief with outline, FAQ, sources, internal links and meta draft. Free, no signup.', 'Enter a keyword, intent, audience and research and get a structured content brief with outline, FAQ, sources, internal links and meta draft. Free.'],
  ['Paste JSON-LD or page HTML and validate syntax plus the required and recommended properties Google documents for FAQ, Breadcrumb, Article, Product and LocalBusiness markup. Free.', 'Paste JSON-LD or page HTML and validate syntax plus the required and recommended properties Google documents for FAQ, Breadcrumb and Article markup. Free.'],
  ['Paste or open an Apache or Nginx access log and see which URLs Googlebot and other crawlers request, with status codes and problem URLs. Free, in your browser.', 'Paste or open an Apache or Nginx access log and see which URLs Googlebot and other crawlers request, with status codes and problem URLs. Free.']
];
let s = fs.readFileSync('server.js', 'utf8');
for (const [o, n] of M) {
  if (n.length > 155) throw new Error('still long ' + n.length + ' ' + n);
  const c = s.split(o).length - 1; if (c !== 1) throw new Error('found ' + c + ': ' + o.slice(0, 50));
  s = s.replace(o, () => n);
}
fs.writeFileSync('server.js', s, 'utf8'); console.log('descriptions changed', M.length);
