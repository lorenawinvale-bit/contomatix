// 16 Nov 2026: exact Search Console phrases still missing from the pages updated today. One short natural phrase per edit, appended to an existing answer.
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const P = [
  ['backlinks-example', 'Backlink Example: The One-Line Version', ' That one line is an example of a backlink in its simplest form.'],
  ['short-tail-vs-long-tail-keywords', 'How Many Words Are in Short Tail Keywords?', ' So how many words in short tail keywords: one or two, and three or more for long tail.'],
  ['improve-core-web-vitals', 'Improve Core Web Vitals for Ecommerce Sites', ' To improve core web vitals ecommerce teams can follow the same loop as any site.'],
  ['blogger-outreach', 'How to Do Blogger Outreach in Five Steps', ' Use this as a short blogger outreach guide to keep each campaign consistent.']
];
for (const [slug, h3, add] of P) {
  const p = posts.find(x => x.slug === slug); const i = p.content.indexOf(`<h3>${h3}</h3>`); if (i < 0) throw new Error('H3 missing: ' + slug + ' ' + h3);
  const end = p.content.indexOf('</p>', i); if (p.content.slice(i, end).includes(add.trim().slice(0, 30))) continue; p.content = p.content.slice(0, end) + add + p.content.slice(end);
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
console.log('done');
