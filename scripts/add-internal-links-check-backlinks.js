// 8 Nov 2026: adds one contextual internal link each from 7 related posts to /blog/check-backlinks-of-website (page has 5K+ impressions at position 78 and few inbound links).
// Sentences are appended to a paragraph that already talks about checking or reading links. Idempotent per post.
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const T = '/blog/check-backlinks-of-website';
const A = (txt) => `<a href="${T}">${txt}</a>`;
const EDITS = [
  ['backlink-analysis-tools-2026', 'give you Google\'s own view of which sites link to you', ` To see how to check backlinks of a website for free, our guide walks through four methods, starting with Search Console.`.replace('check backlinks of a website', A('check backlinks of a website'))],
  ['how-to-find-competitor-backlinks-2026', 'Use Ahrefs\' free Backlink Checker', ` Before you study a competitor, find out who links to your own site with this guide on how to ${A('find backlinks to a website')}.`],
  ['backlinks-report', 'Google Search Console</strong> is free and comes straight from Google', ` For a full walkthrough of finding and reading these links, see ${A('how to check backlinks of a website')}.`],
  ['do-nofollow-links-help-seo-2026', 'Right-click the link and select', ` To see which of your own backlinks carry one of these values, ${A('check the backlinks of your website')} first, then inspect each linking page.`],
  ['types-of-backlinks', 'For a real-world look at one site', ` To find out which types you already have, use the four free methods in our guide to ${A('checking backlinks of a website')}.`],
  ['find-broken-backlinks', 'In Search Console, open the Links report', ` Our guide to ${A('checking backlinks of a website')} shows how to read that report step by step.`],
  ['high-authority-backlinks', 'We ran our own links through the test', ` The guide on how to ${A('view backlinks to your website')} shows the same Links report step by step.`]
];
const out = [];
for (const [slug, needle, add] of EDITS) {
  const p = posts.find(x => x.slug === slug); if (!p) throw new Error('missing ' + slug);
  if (p.content.includes('href="' + T + '"')) { out.push(slug + ': already linked'); continue; }
  const ps = p.content.match(/<p>[\s\S]*?<\/p>/g) || []; const para = ps.find(x => x.includes(needle)); if (!para) throw new Error('paragraph not found in ' + slug + ': ' + needle);
  if (/—/.test(add)) throw new Error('em dash');
  const np = para.replace(/<\/p>$/, add + '</p>'); p.content = p.content.replace(para, np); out.push(slug + ': linked');
}
for (let i = 0; i < 5; i++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (i === 4) throw e; } }
console.log(out.join('\n'));
