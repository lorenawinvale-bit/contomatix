#!/usr/bin/env node
// Adds the missing heroDiagram to the 3 Week 3 posts (ai-seo-strategy,
// chatgpt-for-seo, ai-seo-agents) — they were published without one, the only
// 3 posts on the site missing this element, which is why their post pages
// looked visually inconsistent with every other post.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');
const { buildTopicDiagramSvg } = require('./generate-topic-diagram.js');

const BATCH = [
  { slug: 'ai-seo-strategy', style: 'wheel', topic: 'AI SEO Strategy', sections: ['The Four Layers', "This Quarter's Order", 'Where It Diverges', 'The Sequencing Mistake'] },
  { slug: 'chatgpt-for-seo', style: 'ring', topic: 'ChatGPT for SEO', sections: ['Keyword & Topic Research', 'Content Structuring', 'Technical Troubleshooting', 'Content-Gap Analysis', 'Internal Linking'] },
  { slug: 'ai-seo-agents', style: 'timeline', topic: 'AI SEO Agents', sections: ['Where They Perform Well', 'Where They Fail', 'The Risk Is Scale', 'Evaluating One First'] }
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
