// 14 Nov 2026: adds the main Search Console query phrases still missing word for word from the pages updated today. One short natural phrase per edit, appended to an existing answer.
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const P = [
  ['content-brief-template', 'Content Brief Template: What Goes in It', ' Content brief templates differ in length, but a content research brief template should always list the sources to read.'],
  ['content-brief-template', 'Blog Brief Template vs Website Content Brief', ' Content briefs for content optimization template work add a column for the existing page and what to change.'],
  ['content-brief-template', 'Content Brief Generator: What It Can and Cannot Do', ' Pair content brief templates for topical maps with the generator, one brief per page in the map, and look for a content brief generator with questions to answer built in.'],
  ['how-is-ranking-different-ppc-vs-seo-2026', 'Organic Ranking vs PPC: How SEO Ranking Works', ' In any organic ranking PPC comparison, that crawl, index and rank sequence is the difference.'],
  ['topical-map-seo', 'Topical Mapping: How to Plan Internal Links', ' Topical mapping SEO work stands or falls on these links.'],
  ['topical-map-seo', 'Topical Authority Map: What Google Says', ' The same caution applies to topical authority mapping as a service.'],
  ['content-gap-analysis', 'How to Do a Content Gap Analysis in Six Steps', ' This is how to do content gap analysis without a paid tool.'],
  ['content-gap-analysis', 'What Is a Content Gap Analysis?', ' The aim of content gap analysis is to fill what\'s missing, whether that is a new page or a better one.']
];
for (const [slug, h3, add] of P) {
  const p = posts.find(x => x.slug === slug); const i = p.content.indexOf(`<h3>${h3}</h3>`); if (i < 0) throw new Error('H3 missing: ' + slug + ' ' + h3);
  const end = p.content.indexOf('</p>', i); if (p.content.slice(i, end).includes(add.trim().slice(0, 30))) continue; if (/—/.test(add)) throw new Error('em dash'); p.content = p.content.slice(0, end) + add + p.content.slice(end);
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
const f = path.join(__dirname, '..', 'views', 'pages', 'llms-txt-generator.ejs'); let t = fs.readFileSync(f, 'utf8'); const h = '<h3>LLMs Txt Generator Free and Without Signup</h3>'; const i = t.indexOf(h); if (i < 0) throw new Error('tool H3'); const e = t.indexOf('</p>', i); const a = ' This LLMs generator makes one file at a time.'; if (!t.slice(i, e).includes('LLMs generator')) { t = t.slice(0, e) + a + t.slice(e); fs.writeFileSync(f, t, 'utf8'); }
console.log('done');
