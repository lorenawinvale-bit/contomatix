// 11 Nov 2026: adds the few Search Console query phrases still missing word-for-word, and one internal link to cross-channel-attribution. One natural phrase per edit.
const fs = require('fs'); const fp = require('path').join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const slugs = new Set(posts.map(p => p.slug));
const E = [
  ['relevant-backlinks', 'so ask them to add the link. See <a href="/blog/resource-page-link-building">resource page link building</a> for a method.', 'so ask them to add the link. That is relevant link building in practice, and <a href="/blog/resource-page-link-building">resource page link building</a> gives a method.'],
  ['relevant-backlinks', 'Finding Relevant Backlinks: Where They Should Point</h3>', null],
  ['301-redirect-not-working', 'If a redirect 301 is not working in htaccess, look at rule order and conflicts', 'If a redirect 301 is not working in htaccess, or an htaccess redirect 301 is not working after an edit, look at rule order and conflicts'],
  ['cross-channel-attribution', 'Tag consistently with utm_source, utm_medium and utm_campaign, as Google\'s guidance on custom URLs advises.', 'Tag consistently with utm_source, utm_medium and utm_campaign, as Google\'s guidance on custom URLs advises, and read the results alongside <a href="/blog/search-console-impressions-explained">what Search Console impressions count</a>.']
];
for (const [slug, from, to] of E) { if (!to) continue; const p = posts.find(x => x.slug === slug); if (p.content.includes(to)) continue; if (!p.content.includes(from)) throw new Error('not found: ' + slug + ' ' + from.slice(0, 40)); if (/\u2014/.test(to)) throw new Error('em dash'); p.content = p.content.replace(from, to); }
// how to find relevant backlinks: append to the Finding answer
{ const p = posts.find(x => x.slug === 'relevant-backlinks'); const h = '<h3>Finding Relevant Backlinks: Where They Should Point</h3>'; const i = p.content.indexOf(h); const end = p.content.indexOf('</p>', i); const add = ' How to find relevant backlinks in the first place: begin with the sites that already name you, then the resource pages for your topic.'; if (!p.content.slice(i, end).includes('How to find relevant backlinks in the first place')) p.content = p.content.slice(0, end) + add + p.content.slice(end); }
for (const [slug] of E) if (!slugs.has(slug)) throw new Error('bad slug');
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
console.log('done');
