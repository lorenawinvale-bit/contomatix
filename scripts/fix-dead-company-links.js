#!/usr/bin/env node
// Fixes for the 9 "verified company" links whose sites are down.
// Verified via independent research (WebFetch on Crunchbase/BBB/Yelp/social/etc):
// - 7 are real, still-operating businesses whose OWN site just happens to be down
//   right now (host outage, bad SSL cert) with no reliable official replacement
//   URL found — de-link (drop the <a>, keep the visible company name as plain
//   text) rather than link to a third-party directory profile that isn't theirs.
// - 2 have genuinely moved to a new domain — update the href.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const delink = [
  'zero8studios.com', 'iteratemarketing.com', 'besthumanresources.com',
  'malonemediagroup.com', 'mantyweb.com', 'pristinegraphicsdesign.com', 'esistaffing.net'
];
const relink = {
  'allstarrecruiting.com': 'https://allstarhealthcaresolutions.com',
  'bubbleup.com': 'https://bubbleup.net'
};

let delinkCount = 0, relinkCount = 0;
posts.forEach(p => {
  delink.forEach(d => {
    const re = new RegExp(`<a href="https?://[^"]*${d.replace(/\./g, '\\.')}[^"]*" target="_blank" rel="nofollow noopener">([^<]*)</a>`, 'gi');
    p.content = p.content.replace(re, (m, text) => { delinkCount++; return text; });
  });
  Object.entries(relink).forEach(([oldDomain, newUrl]) => {
    const re = new RegExp(`(<a href=")https?://[^"]*${oldDomain.replace(/\./g, '\\.')}[^"]*(" target="_blank" rel="nofollow noopener">)`, 'gi');
    p.content = p.content.replace(re, (m, pre, post) => { relinkCount++; return pre + newUrl + post; });
  });
});

console.log(`de-linked: ${delinkCount}, re-linked: ${relinkCount}`);
if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
