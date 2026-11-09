// 9 Nov 2026: adds the few Search Console query phrases that were missing word-for-word from the pages updated today. Wording stays natural; each edit is one phrase in an existing answer.
const fs = require('fs'); const fp = require('path').join(__dirname, '..', 'data', 'blog.json');
const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const EDITS = [
  ['how-to-index-backlinks', 'A normal Google search is not a backlink report.', 'A normal Google backlinks search is not a backlink report.'],
  ['editorial-backlinks', '<h3>Editorial Backlinks for a Legal Niche: The Same Rules Apply</h3>', '<h3>Editorial Backlinks Legal Niche: The Same Rules Apply</h3>'],
  ['monthly-seo-report', '<h3>Monthly SEO Report Example and SEO Monthly Report Sample: Our August to October</h3>', '<h3>Monthly SEO Report Examples and SEO Monthly Report Sample: Our August to October</h3>'],
  ['monthly-seo-report', 'Tools save time collecting numbers, but they cannot write the "what it means" column.', 'Tools save time collecting numbers, but they cannot write the "what it means" column. For monthly SEO and analytic reports, put your analytics figures beside the Search Console numbers.']
];
for (const [slug, from, to] of EDITS) {
  const p = posts.find(x => x.slug === slug); if (p.content.includes(to)) { console.log(slug + ': already'); continue; }
  if (!p.content.includes(from)) throw new Error('not found in ' + slug + ': ' + from.slice(0, 50)); if (/—/.test(to)) throw new Error('em dash');
  p.content = p.content.replace(from, to);
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
console.log('done');
