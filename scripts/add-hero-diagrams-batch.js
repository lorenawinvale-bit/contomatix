#!/usr/bin/env node
// 20-post test batch for the hero-diagram feature. Topics and section labels
// are hand-curated (not regex-extracted) since a fully automated cleanup of
// every real title/heading pattern on the site produced dangling suffixes
// and generic labels ("Quick Comparison") not worth publishing — 20 posts
// is small enough to just do this properly.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');
const { buildTopicDiagramSvg } = require('./generate-topic-diagram.js');

const BATCH = [
  { slug: 'best-local-seo-companies-usa-2026', style: 'wheel', topic: 'Best Local SEO Companies in the USA', sections: ['How We Verified', 'BrightLocal', 'Whitespark', 'Sterling Sky', 'Picks by State'] },
  { slug: 'top-seo-companies-novato-2026', style: 'timeline', topic: 'SEO Companies in Novato, CA', sections: ["Novato's Market", 'Alaniz Marketing', 'Kiosk', 'Big Cat Advertising'] },
  { slug: 'top-seo-companies-milpitas-2026', style: 'ring', topic: 'SEO Companies in Milpitas, CA', sections: ["Milpitas's Market", 'Website For Business', 'Prologic Web Design', '8ty6'] },
  { slug: 'top-seo-companies-pleasanton-2026', style: 'wheel', topic: 'SEO Companies in Pleasanton, CA', sections: ["Pleasanton's Market", 'Local SEO Guide', 'iWorks Media', 'Creatability'] },
  { slug: 'top-seo-companies-truro-2026', style: 'timeline', topic: 'SEO Companies in Truro, Cornwall', sections: ["Truro's Market", 'SEO Chaps', 'HookedOnMedia', 'How We Chose'] },
  { slug: 'top-seo-companies-cotswolds-2026', style: 'ring', topic: 'SEO Companies in the Cotswolds', sections: ['Market Overview', 'Stroud Valley SEO', 'SEO Service Pros', 'Nettl of Cirencester'] },
  { slug: 'top-recruiting-companies-yakima-2026', style: 'wheel', topic: 'Recruiting Companies in Yakima, WA', sections: ["Yakima's Market", 'Personna Employment', 'Atlas Staffing', 'BBSI Yakima'] },
  { slug: 'top-recruiting-companies-issaquah-2026', style: 'timeline', topic: 'Recruiting Firms in Issaquah, WA', sections: ["Issaquah's Market", 'Prothman Company', 'Mastor Recruiting'] },
  { slug: 'top-recruiting-companies-everett-2026', style: 'ring', topic: 'Recruiting Agencies in Everett, WA', sections: ["Everett's Market", 'Verstela', 'PeopleReady', 'Kelly Services'] },
  { slug: 'top-recruiting-companies-olympia-2026', style: 'wheel', topic: 'Recruiting Companies in Olympia, WA', sections: ["Olympia's Market", 'American Workforce', 'Kelly Services'] },
  { slug: 'meta-ad-library-guide-2026', style: 'timeline', topic: 'Using Meta Ad Library', sections: ['What It Actually Is', 'How to Access It', 'Ways to Search It', 'What You Can Learn', "What It Won't Show"] },
  { slug: 'scope-of-digital-marketing-in-mexico-2026', style: 'ring', topic: 'Digital Marketing in Mexico', sections: ['The Short Answer', 'Market in Numbers', 'Internet Access', 'E-Commerce Demand', 'Where Jobs Are'] },
  { slug: 'where-to-learn-digital-marketing-in-lagos-2026', style: 'wheel', topic: 'Learning Digital Marketing in Lagos', sections: ['Why Now Is Good', 'Free Certifications', 'Paid Institutes', 'What to Check First', 'Building a Portfolio'] },
  { slug: 'link-building-agencies-edinburgh-2026', style: 'timeline', topic: 'Link Building Agencies in Edinburgh', sections: ["Edinburgh's Market", 'LinkBuilder.io', 'Clear Click', 'Alba SEO Services'] },
  { slug: 'link-building-agencies-dubai-2026', style: 'ring', topic: 'Link Building Agencies in Dubai', sections: ["Dubai's Market", 'Bird Marketing', 'Blue Beetle', 'Dot IT'] },
  { slug: 'seo-agency-vs-freelancer-2026', style: 'wheel', topic: 'SEO Agency vs Freelancer', sections: ['The Short Answer', 'What Each Costs', 'The Premium', 'Month to Month', 'When Freelancer Wins'] },
  { slug: 'wordpress-seo-consultant-guide-2026', style: 'timeline', topic: 'WordPress SEO Consulting', sections: ['Why It Needs This', '2026 Changes', 'What It Involves', 'The Plugin Stack', 'Content & Structure'] },
  { slug: 'shopify-seo-consultant-guide-2026', style: 'ring', topic: 'Shopify SEO Consulting', sections: ['Why It Needs This', '2026 Changes', 'What It Involves', 'App Bloat Problem', 'Product Pages'] },
  { slug: 'answer-engine-optimization-aeo-guide-2026', style: 'wheel', topic: 'Answer Engine Optimization', sections: ['What AEO Means', 'AEO vs SEO', "What's Actually New", 'Answer First', 'Question Headings'] },
  { slug: 'how-is-ranking-different-ppc-vs-seo-2026', style: 'timeline', topic: 'PPC vs SEO Ranking', sections: ['The Core Difference', 'PPC Ranking', 'Ad Rank Thresholds', 'SEO Ranking', 'Minutes vs. Months'] }
];

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
let generated = 0;

BATCH.forEach(({ slug, style, topic, sections }) => {
  const p = posts.find(x => x.slug === slug);
  if (!p) { console.log('MISSING:', slug); return; }
  const svg = buildTopicDiagramSvg({ style, topic, sections });
  const fileName = `diagram-${slug}.svg`;
  console.log(`[${style}] ${slug} — "${topic}" — ${sections.length} sections`);
  if (write) {
    fs.writeFileSync(path.join(ROOT, 'public', 'images', 'blog', fileName), svg);
    p.heroDiagram = `/images/blog/${fileName}`;
    generated++;
  }
});

if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log(`\nGenerated ${generated}/${BATCH.length}, blog.json written`);
} else {
  console.log(`\nWould generate ${BATCH.length} — dry run, pass --write to apply`);
}
