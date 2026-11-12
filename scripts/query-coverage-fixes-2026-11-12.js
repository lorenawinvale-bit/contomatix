// 12 Nov 2026: adds the main Search Console query phrases that were still missing word-for-word from the pages updated today. One short natural phrase per edit, appended to an existing answer.
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const P = [
  ['seo-packages-for-small-business', 'SEO Package for Small Business: What It Is', ' Searching for an SEO small business package mostly returns prices, not scopes.'],
  ['seo-packages-for-small-business', 'Small Business SEO Package Prices: What Results Quote', ' Small business SEO packages on that page rarely listed what the fee included.'],
  ['canonical-hreflang', 'Canonical vs Hreflang: Two Different Jobs', ' In a canonical vs hreflang tag comparison, the two are never interchangeable.'],
  ['how-to-create-a-sitemap', 'How to Make a Sitemap Without Writing XML', ' That is how to make sitemap files in minutes: paste, generate, upload.'],
  ['how-to-create-a-sitemap', 'How to Create a Sitemap for a Website: Size Limits', ' How to create sitemap for website sections beyond those limits: split them into several files under one index.'],
  ['how-to-create-a-sitemap', 'How to Add a Sitemap to Google', ' That is how to add sitemap files so Google knows they exist.'],
  ['linkable-assets', 'How to Find Linkable Assets in Analytics', ' This is how to find linkable assets analytics can show: the pages that already attract links.'],
  ['301-redirect-not-working', 'Htaccess 301 Redirect Not Working: Rule Order and Conflicts', ' Searches for redirect 301 not working in htaccess lead to the same two checks, rule order and conflicts.']
];
for (const [slug, h3, add] of P) {
  const p = posts.find(x => x.slug === slug); const i = p.content.indexOf(`<h3>${h3}</h3>`); if (i < 0) throw new Error('H3 missing: ' + slug + ' ' + h3);
  const end = p.content.indexOf('</p>', i); if (p.content.slice(i, end).includes(add.trim().slice(0, 30))) continue; if (/—/.test(add)) throw new Error('em dash'); p.content = p.content.slice(0, end) + add + p.content.slice(end);
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
const T = [
  ['outbound-link-checker', 'Outbound Link Checker: What It Looks For', ' People also search for it as an outbound links checker, and it works as a way to check outbound links on any page.'],
  ['outbound-link-checker', 'Outbound Link Check: Paste the HTML, Nothing Is Uploaded', ' It is an outbound link checker tool free of charge and with no account.'],
  ['sitemap-generator', 'XML Sitemap Generator Unlimited: The 50,000 URL Limit', ' If you want an unlimited sitemap generator, plan for several files under one index.']
];
for (const [slug, h3, add] of T) {
  const f = path.join(__dirname, '..', 'views', 'pages', slug + '.ejs'); let t = fs.readFileSync(f, 'utf8'); const i = t.indexOf(`<h3>${h3}</h3>`); if (i < 0) throw new Error('tool H3 missing: ' + slug + ' ' + h3);
  const end = t.indexOf('</p>', i); if (t.slice(i, end).includes(add.trim().slice(0, 30))) continue; t = t.slice(0, end) + add + t.slice(end); fs.writeFileSync(f, t, 'utf8');
}
console.log('done');
