// 15 Nov 2026: adds the main Search Console query phrases still missing word for word from the pages updated today. One short natural phrase per edit, appended to an existing answer.
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const P = [
  ['b2b-telemarketing', 'B2B Telemarketing Companies and Services: What to Ask', ' Quotes for B2B telemarketing services often hide the list-building cost, so ask for it separately.'],
  ['b2b-telemarketing', 'B2B Telemarketing Calls: What a Good One Sounds Like', ' Any telemarketing blog that only gives a word-for-word script is missing this point.'],
  ['guest-posting-vs-niche-edits-2026', 'Niche Edits vs Guest Post: The Short Answer', ' In niche edits vs guest posts, neither wins on every count.'],
  ['seo-audit-cost', 'SEO Audit Price: One-Off, Day Rate or Retainer', ' SEO audit prices follow the model as much as the scope.'],
  ['seo-audit-cost', 'SEO Audit Pricing 2026: Red Flags in a Proposal', ' Pricing for SEO audit 2026 proposals should always list the deliverables.']
];
for (const [slug, h3, add] of P) {
  const p = posts.find(x => x.slug === slug); const i = p.content.indexOf(`<h3>${h3}</h3>`); if (i < 0) throw new Error('H3 missing: ' + slug + ' ' + h3);
  const end = p.content.indexOf('</p>', i); if (p.content.slice(i, end).includes(add.trim().slice(0, 30))) continue; if (/—/.test(add)) throw new Error('em dash'); p.content = p.content.slice(0, end) + add + p.content.slice(end);
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
const T = [
  ['hreflang-generator', '<h3>Sitemap Hreflang Generator: HTML, Sitemap or Header</h3>', ' A hreflang sitemap generator writes the same annotations in XML form.'],
  ['sitemap-finder', '<h3>How to Find the Sitemap of a Website</h3>', ' That is how to find sitemap of a website without any software.']
];
for (const [slug, h, add] of T) {
  const f = path.join(__dirname, '..', 'views', 'pages', slug + '.ejs'); let t = fs.readFileSync(f, 'utf8'); const i = t.indexOf(h); if (i < 0) throw new Error('tool H3 missing: ' + slug);
  const end = t.indexOf('</p>', i); if (t.slice(i, end).includes(add.trim().slice(0, 25))) continue; t = t.slice(0, end) + add + t.slice(end); fs.writeFileSync(f, t, 'utf8');
}
console.log('done');
