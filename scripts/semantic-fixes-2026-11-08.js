// 8 Nov 2026: brings the four posts that failed scripts/semantic-check.js up to 10/10 (internal links, one word-count gap). Appends a sentence to an existing related-questions answer.
const fs = require('fs'); const fp = require('path').join(__dirname, '..', 'data', 'blog.json');
const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const slugs = new Set(posts.map(p => p.slug));
const L = (s, t) => { if (!slugs.has(s)) throw new Error('bad slug ' + s); return `<a href="/blog/${s}">${t}</a>`; };
const EDITS = [
  ['gravitywrite-alternatives-2026', 'What No AI Writing Tool Replaces', ` For what AI tools can and cannot do across SEO work, see our guide to ${L('ai-powered-seo-tools', 'AI-powered SEO tools')}, and for the research step see ${L('ai-tools-for-seo-keyword-research', 'AI tools for SEO keyword research')}. If your goal is to be cited by AI assistants, read ${L('what-is-llm-seo-2026', 'what is LLM SEO')}.`],
  ['white-label-seo', 'White Label SEO Services: What Is Worth Reselling', ` If link building is the part you plan to resell, read our guide to ${L('white-label-link-building', 'white label link building')}, and see ${L('outsource-link-building', 'how to outsource link building')} for the vetting questions to ask a provider.`],
  ['instagram-search-optimization-2026', 'How to Use SEO on Instagram: Start With the Profile', ` A local business such as a restaurant can pair this with its Google presence, which our guide to ${L('local-seo-for-restaurants', 'local SEO for restaurants')} covers.`],
  ['instagram-search-optimization-2026', 'Instagram SEO Keywords: Say Them, Not Only Write Them', ` To choose which terms are worth targeting, the same thinking applies as on Google: see our overview of ${L('keyword-research-tools', 'keyword research tools')}.`],
  ['instagram-search-optimization-2026', 'Instagram SEO Tips: How Long Before It Works?', ` Links from social profiles to your website are a separate topic, covered in ${L('social-backlinks', 'social backlinks')}.`],
  ['international-seo-audit', 'International SEO Audit Tools: What to Use at Each Step', ` Google lets you place hreflang in the page head, in an HTTP header or in the sitemap, treats the three as equivalent and sees no benefit in using all three, so pick one method and audit that. For how canonical and hreflang tags work together, see ${L('canonical-hreflang', 'canonical and hreflang')}, and for links to localised pages see ${L('international-link-building', 'international link building')}.`]
];
for (const [slug, h3, add] of EDITS) {
  const p = posts.find(x => x.slug === slug); const i = p.content.indexOf(`<h3>${h3}</h3>`); if (i < 0) throw new Error('H3 missing: ' + h3);
  const end = p.content.indexOf('</p>', i); const para = p.content.slice(i, end); if (para.includes(add.slice(0, 40))) { console.log(slug + ': already'); continue; }
  if (/\u2014/.test(add)) throw new Error('em dash');
  p.content = p.content.slice(0, end) + add + p.content.slice(end);
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
console.log('done');
