// 10 Nov 2026: after shortening the H3 headings, the dropped keyword variants are restored as one natural sentence at the end of the matching answer (only where the phrase has real search demand).
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const P = [
  ['outsource-link-building', 'Outsource Link Building for an Agency: Check the Methods First', ' If you outsource link building for agency clients, the same checks apply before you promise anything.'],
  ['outsource-link-building', 'Best Way to Outsource Backlinks: Start With a Small Project', ' That is the best way to outsource link building: test the work before you commit.'],
  ['white-label-seo', 'White Label SEO Reports and Audits: Test the Output', ' Ask to see a real white label SEO audit, not only a sample report.'],
  ['meta-tags-best-practices', 'Meta Description Best Practices: A Pitch, Not a Ranking Lever', ' Those are the Google meta description best practices for 2026 in one line: write for the click, not for a ranking.'],
  ['meta-tags-best-practices', 'The Robots Meta Tag: Use It Deliberately', ' That is one of the SEO meta tags best practices for 2026: use robots directives on purpose.'],
  ['meta-tags-best-practices', 'Keyword Meta Tag Best Practices for Plugins', ' The same goes for SEO meta keywords best practices in general: do not maintain the tag. In short, meta tag keywords best practices come down to not relying on it.'],
  ['how-to-index-backlinks', 'Is a site: Search a Backlink Report?', ' A Google backlink search with the site: operator shows pages, not links. For site backlinks Google reports, use the Links report, because a search is only ever a sample.'],
  ['offpage-seo', 'Off Page SEO Factors, Ranked by Control', ' Off site SEO is the same list seen from the other side: what other people and sites say and do about you.'],
  ['white-label-link-building', 'Whitelabel Linkbuilding: Same Service, Different Spelling', ' Whether it is written as white label linkbuilding or white label link building, the service is the same.'],
  ['white-label-link-building', 'White Label Reports Clients Actually Read', ' Good white label link building solutions include a report like this as standard.'],
  ['high-authority-backlinks', 'A High Authority Backlinks List Without Chasing a Score', ' Treat any high authority domain on that list as a starting point, not a verdict.'],
  ['monthly-seo-report', 'Monthly SEO Report Examples: Our August to October', ' Use it as an SEO monthly report sample for the layout, not as a benchmark.'],
  ['301-vs-302-redirect', '301 vs 302: The Short Answer', ' You will also see it written as 301 v 302 redirect, and the answer is the same.'],
  ['301-vs-302-redirect', '302 vs 301: What Google Does With Each', ' In a 302 redirect vs 301 comparison, that canonical signal is the difference that matters.'],
  ['yoast-seo-sitemap', 'Where to Find Your Yoast SEO Sitemap Link', ' For a WordPress sitemap Yoast builds, that index is the only link you need to submit.'],
  ['yoast-seo-sitemap', 'Yoast XML Sitemap: It Updates Itself', ' Treat it as a Yoast sitemap generator that you set up once.'],
  ['yoast-seo-sitemap', 'Yoast Sitemap Not Working or 404: What to Check', ' If you see a Yoast SEO sitemap 404, start with those checks.'],
  ['meta-keywords', 'Does Google Still Use Meta Keywords?', ' For meta keywords Google gives one answer, and it is the same for any Google meta keywords field in a theme or plugin.'],
  ['meta-keywords', 'How to Check Whether Your Pages Use Meta Keywords', ' That also answers whether Google uses the keywords meta tag on your site: it ignores it either way.'],
  ['what-is-a-google-penalty', 'How to Check for a Google Penalty in Search Console', ' How to check Google penalty status in short: open the Manual actions report and read the result.'],
  ['what-is-a-google-penalty', 'Google Penalty Checker Tools: What They Can Tell You', ' A penalty Google checker can suggest a cause, but only the Manual actions report is authoritative.'],
  ['what-is-a-google-penalty', 'Google Penalty Recovery: Steps From Google\'s Own Page', ' That is the Google penalty advice that matches Google\'s own help page.'],
  ['meta-description-length', 'Meta Description Character Count: Why Pixels Matter', ' The meta description character limit is therefore an estimate, not a fixed rule.'],
  ['meta-description-length', 'Meta Description Max Length: What Google Says', ' That is the Google meta description length rule in one sentence.'],
  ['meta-description-length', 'The Ideal Length for a Meta Description', ' The ideal length for meta description text and the best length for meta description writing are the same: about 120 to 155 characters.']
];
const T = [
  ['utm-builder', 'UTM Tag Generator: What It Builds', ' Whether you call it a UTM tags generator or a UTM tags builder, it does the same job: it turns your page URL into one tagged link.'],
  ['utm-builder', 'UTM Tag Builder: Keep Names Consistent', ' A custom tag builder like this one does not enforce naming, so consistency is up to you.'],
  ['sitemap-validator', 'Check Sitemap Validity Before You Submit It', ' Use it to verify sitemap structure first.'],
  ['schema-markup-generator', 'Free Schema Markup Generator: Nothing Leaves Your Browser', ' You can use schema markup online this way without an account.'],
  ['schema-markup-generator', 'What This Schema Generator Covers', ' If you are looking for a website schema generator, note that it does not build WebSite markup.'],
  ['internal-link-checker', 'Find Internal Links to a Page: What This Tool Cannot Do', ' The same goes if you want to check internal links to a page from the pages that link to it.'],
  ['internal-link-checker', 'Internal Link Analysis Tool: One Page at a Time', ' As an internal link tool it is built for single pages, not whole-site crawls.']
];
let n = 0; const bad = [];
for (const [slug, h3, add] of P) {
  const p = posts.find(x => x.slug === slug); const i = p.content.indexOf(`<h3>${h3}</h3>`); if (i < 0) { bad.push(slug + ': ' + h3); continue; }
  const end = p.content.indexOf('</p>', i); const para = p.content.slice(i, end); if (para.includes(add.trim().slice(0, 40))) continue;
  if (/—/.test(add)) throw new Error('em dash'); p.content = p.content.slice(0, end) + add + p.content.slice(end); n++;
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
for (const [slug, h3, add] of T) {
  const f = path.join(__dirname, '..', 'views', 'pages', slug + '.ejs'); let t = fs.readFileSync(f, 'utf8'); const i = t.indexOf(`<h3>${h3}</h3>`); if (i < 0) { bad.push('tool ' + slug + ': ' + h3); continue; }
  const end = t.indexOf('</p>', i); if (t.slice(i, end).includes(add.trim().slice(0, 40))) continue; t = t.slice(0, end) + add + t.slice(end); fs.writeFileSync(f, t, 'utf8'); n++;
}
console.log('answers patched:', n); if (bad.length) console.log('NOT FOUND:\n' + bad.join('\n'));
