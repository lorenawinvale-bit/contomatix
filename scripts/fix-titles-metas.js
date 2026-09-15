#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'blog.json'), 'utf8'));

const titleFixes = {
  'innovative-marketing-campaigns-2026': 'Innovative Marketing Campaigns That Worked in 2026',
  'top-graphic-design-companies-wichita-2026': 'Top 5 Graphic Design Companies in Wichita, KS (2026)',
  'top-recruiting-companies-gaithersburg-2026': 'Top 4 Recruiting Companies in Gaithersburg, MD (2026)',
  'top-recruiting-companies-beaumont-2026': 'Top 8 Recruiting Companies in Beaumont, TX (2026)',
  'top-digital-marketing-agencies-sydney-2026': 'Top 11 Digital Marketing Agencies in Sydney (2026)',
  'top-seo-companies-long-island-2026': 'Top 8 SEO Companies on Long Island, NY — Verified 2026',
  'top-marketing-agencies-wichita-2026': 'Top 6 Marketing Agencies in Wichita, KS (2026)',
  'top-web-design-companies-wichita-2026': 'Top 6 Web Design Companies in Wichita, KS (2026)',
  'top-recruiting-companies-redmond-2026': 'Top 4 Recruiting Companies in Redmond, WA (2026)',
  'seo-for-dentists-2026': 'SEO for Dentists: The Complete 2026 Guide'
};

const excerptFixes = {
  'guest-blogging-guide-2026': "Most guest blogging advice stops at the pitch. Here's what actually gets a post accepted and ranking in 2026.",
  'is-seo-dead-2026': "Is SEO dead now that AI Overviews sit above the results? Here's what the actual traffic data shows.",
  'digital-marketing-agency-mexico-2026': "Looking for a digital marketing agency in Mexico in 2026? Here's how to vet one before signing a contract.",
  'b2b-telemarketing': "Is B2B telemarketing dead in 2026, or just misunderstood? We break down when it still works and when it wastes budget.",
  'hvac-seo-boise-2026': 'HVAC SEO Boise work has to serve two different customers: emergency searchers and homeowners planning ahead.',
  'seo-for-gyms-2026': "Gyms lose 30-40% of their members every year to churn alone. Here's the SEO strategy that keeps new leads coming anyway.",
  'seo-expert-springfield-ma-2026': 'Looking for an SEO expert Springfield MA businesses can trust? Here\'s how to tell a real one from a reseller.',
  'seo-content-writing-guide-2026': "SEO content writing is not writing with keywords sprinkled in — here's what actually ranks in 2026.",
  'do-nofollow-links-help-seo-2026': 'Do nofollow links help SEO, or are they a waste of outreach time? Here\'s what the data actually shows.',
  'search-engine-optimization-rapid-city-2026': 'Search engine optimization Rapid City businesses can actually use — not generic advice copied from a bigger market.',
  'search-engine-optimization-grand-island-2026': 'Search engine optimization Grand Island businesses can actually use — not generic advice copied from a bigger market.'
};

let titleChanged = 0, excerptChanged = 0;
posts.forEach(p => {
  if (titleFixes[p.slug] && p.title !== titleFixes[p.slug]) { p.title = titleFixes[p.slug]; titleChanged++; }
  if (excerptFixes[p.slug] && p.excerpt !== excerptFixes[p.slug]) { p.excerpt = excerptFixes[p.slug]; excerptChanged++; }
});

console.log(`titles changed: ${titleChanged}/${Object.keys(titleFixes).length}`);
console.log(`excerpts changed: ${excerptChanged}/${Object.keys(excerptFixes).length}`);

if (write) {
  fs.writeFileSync(path.join(ROOT, 'data', 'blog.json'), JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
