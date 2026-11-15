// 15 Nov 2026 pilot: adds internal links to weakly linked pages by wrapping a phrase that is ALREADY in the source post's body text (no new sentences, no forced anchors).
// usage: node scripts/internal-links-2026-11-15.js [--apply]   (dry run prints the sentence each link would sit in)
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const slugs = new Set(posts.map(p => p.slug));
const PAIRS = [
  ['answer-engine-optimization-aeo-guide-2026', 'generative engine optimization', '/blog/generative-engine-optimization'],
  ['wordpress-seo-consultant-guide-2026', 'duplicate content', '/blog/why-is-duplicate-content-an-issue-for-seo-2026'],
  ['international-seo-consultant-guide-2026', 'duplicate content', '/blog/why-is-duplicate-content-an-issue-for-seo-2026'],
  ['technical-seo-agency-2026', 'duplicate content', '/blog/why-is-duplicate-content-an-issue-for-seo-2026'],
  ['llm-visibility-guide-2026', 'AI visibility', '/blog/what-is-ai-visibility-2026'],
  ['ai-seo-strategy', 'AI visibility', '/blog/what-is-ai-visibility-2026'],
  ['link-building-for-hvac-2026', 'Plumbers', '/blog/link-building-for-plumbers-2026']
];
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, c => '\\' + c);
const apply = process.argv.includes('--apply'); let n = 0;
for (const [slug, phrase, href] of PAIRS) {
  const p = posts.find(x => x.slug === slug); if (!p) throw new Error('missing ' + slug); if (!slugs.has(href.replace('/blog/', ''))) throw new Error('bad target ' + href);
  if (p.content.includes('href="' + href + '"')) { console.log('skip (already links): ' + slug); continue; }
  const re = new RegExp('(?<![\\w-])' + esc(phrase) + '(?![\\w-])');
  let done = false;
  p.content = p.content.replace(/<p[^>]*>[\s\S]*?<\/p>/g, para => {
    if (done) return para; const parts = para.split(/(<a [\s\S]*?<\/a>)/); let hit = false;
    const out = parts.map(part => { if (hit || part.startsWith('<a ')) return part; const m = part.match(re); if (!m) return part; hit = true; return part.slice(0, m.index) + '<a href="' + href + '">' + m[0] + '</a>' + part.slice(m.index + m[0].length); });
    if (!hit) return para; done = true; const txt = out.join('').replace(/<[^>]+>/g, ''); const i = txt.indexOf(phrase); console.log(slug + ' -> ' + href + '\n   ...' + txt.slice(Math.max(0, i - 70), i + phrase.length + 60).replace(/\s+/g, ' ') + '...'); return out.join('');
  });
  if (done) n++; else console.log('NOT FOUND: ' + slug + ' / ' + phrase);
}
console.log((apply ? 'applied ' : 'dry run, would add ') + n + ' links');
if (apply) { for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } } }
