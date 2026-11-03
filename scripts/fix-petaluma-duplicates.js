// One-off (3 Nov 2026): petaluma-local-seo-2026 had two near-identical "proposal" sections and a stray <div class="post-faq"> wrapping the prose. Merge the two and move the wrapper to the real FAQ.
const fs = require('fs'); const path = require('path'); process.chdir(path.join(__dirname, '..'));
const a = JSON.parse(fs.readFileSync('data/blog.json', 'utf8')); const p = a.find(x => x.slug === 'petaluma-local-seo-2026'); let c = p.content;
const once = (s) => { const n = c.split(s).length - 1; if (n !== 1) throw new Error('found ' + n + ': ' + s.slice(0, 60)); };
const open = '<div class="post-faq">\n  <h2>How to Read a Local SEO Proposal Before Signing</h2>'; once(open);
c = c.replace(open, '<h2>How to Read a Local SEO Proposal Before Signing</h2>');
const secB = /<h2>What to Ask a Provider About Scope and Reporting<\/h2>\n<p>[\s\S]*?<\/p>\n<p>[\s\S]*?<\/p>\n\n/; if (!secB.test(c)) throw new Error('section B not found');
c = c.replace(secB, '');
const tail = 'ask how the two connect before you sign, not after the first invoice arrives.</p>'; once(tail);
c = c.replace(tail, 'ask how the two connect before you sign, not after the first invoice arrives. A report that only shows ranking positions, without connecting them to traffic or enquiries, tells you the provider is tracking activity, not outcomes, so ask to see a redacted sample report first.</p>');
const faq = '<h2>Frequently Asked Questions</h2>\n  <details>'; once(faq);
c = c.replace(faq, '<h2>Frequently Asked Questions</h2>\n<div class="post-faq">\n  <details>');
p.content = c; fs.writeFileSync('data/blog.json', JSON.stringify(a, null, 2), 'utf8');
const h2 = [...c.matchAll(/<h2>([^<]*)<\/h2>/g)].map(m => m[1]); console.log('h2 unique', new Set(h2).size === h2.length, 'opens', (c.match(/<div class="post-faq">/g) || []).length, 'closes', (c.match(/<\/div>/g) || []).length, 'words', c.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
