#!/usr/bin/env node
// Fixes for 9 dead citation/source links, each independently verified to load
// (curl 200, or browser-confirmed where curl hit bot-blocking) before use.
// #9 (Texas Comptroller) has no verifiable replacement from this environment
// (the whole comptroller.texas.gov domain fails to resolve here) — de-linked
// rather than publishing an unverified URL.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const replacements = [
  { old: 'https://www.highervisibility.com/pricing/', new: 'https://www.highervisibility.com/seo/learn/seo-pricing/' },
  { old: 'https://www.dw.com/en/fact-check-hey-grok-is-this-true/a-72576419', new: 'https://www.france24.com/en/live-news/20250624-grok-shows-flaws-in-fact-checking-israel-iran-war-study' },
  { old: 'https://csa-research.com/Insights/ArticleID/42/CSA-Research-Reveals-2026-Trends', new: 'https://csa-research.com/l/blog/article/ai-and-global-content-predictions-for-2026' },
  { old: 'https://weglot.com/blog/multilingual-seo/', new: 'https://www.weglot.com/guides/multilingual-seo-tips' },
  { old: 'https://www.sos.wa.gov/corporations-charities/registered-corporations-charities', new: 'https://ccfs.sos.wa.gov/' },
  { old: 'https://www.chevron.com/what-we-do/refining', new: 'https://www.chevron.com/what-we-do/energy/refining' },
  { old: 'https://www.houston.org/news/greater-houston-partnership-forecasts-over-30000-new-jobs-in-2026/', new: 'https://houston.org/news/job-growth-forecasted-for-houston-region-in-2026/' },
  { old: 'https://www.corpuschristichamber.org/', new: 'https://unitedcorpuschristi.org/' }
];

let replaced = 0;
posts.forEach(p => {
  replacements.forEach(r => {
    if (p.content.includes(r.old)) {
      p.content = p.content.split(r.old).join(r.new);
      replaced++;
    }
  });
  // De-link the Texas Comptroller reference (no verifiable replacement).
  const before = p.content;
  p.content = p.content.replace(
    /<a href="https:\/\/mycpa\.cpa\.state\.tx\.us\/coa\/" target="_blank" rel="nofollow noopener">([^<]*)<\/a>/g,
    '$1'
  );
  if (p.content !== before) replaced++;
});

console.log(`replacements applied: ${replaced}/9`);
if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
