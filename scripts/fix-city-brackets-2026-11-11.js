// 11 Nov 2026: replaces the literal "[city]" / "[City]" / "[town]" example patterns in 18 posts with natural wording, so no post looks like it has an unfilled template placeholder.
// These were never leftover placeholders (they are quoted example searches or URL patterns), but the site audit flags them and a reviewer could read them as unfinished.
const fs = require('fs'); const fp = require('path').join(__dirname, '..', 'data', 'blog.json');
const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const SPECIAL = {
  'seo-for-airbnb-listings-2026': [['"cabin rental near [town]" or "[city] pet-friendly Airbnb."', '"cabin rental near a small town" or "pet-friendly Airbnb in a named city."']],
  'best-seo-companies-in-coeur-dalene-2026': [['"SEO Company in [City]."', '"SEO Company in Your City."']],
  'best-seo-companies-in-lubbock-2026': [['any "[City] SEO Company" page', 'any page titled with a city name and "SEO Company"']],
  'seo-companies-lynnwood-wa-2026': [['generic "we serve [city]" language', 'generic "we serve" language']],
  'top-seo-companies-cypress-2026': [['"web-designer-[city]" URL pattern', '"web-designer-cityname" URL pattern']]
};
let n = 0; const left = [];
for (const p of posts) {
  if (!/\[(city|town)\]/i.test(p.content)) continue;
  for (const [from, to] of (SPECIAL[p.slug] || [])) { if (!p.content.includes(from)) { /* entity or quote variant: handled by the generic pass */ continue; } p.content = p.content.split(from).join(to); n++; }
  const before = p.content; p.content = p.content.replace(/\[city\]/gi, 'your city').replace(/\[town\]/gi, 'your town'); if (p.content !== before) n++;
  if (/\[(city|town)\]/i.test(p.content)) left.push(p.slug);
  if (/—/.test(p.content.slice(0, 0))) throw new Error('em dash');
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
console.log('edits:', n, left.length ? 'still has brackets: ' + left.join(', ') : 'no brackets left');
