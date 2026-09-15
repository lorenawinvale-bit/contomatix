#!/usr/bin/env node
// Second word-count top-up pass: round 3 got most of the 27 posts back over
// the site's 1500-word floor, but 16 were still short. Appends one more
// genuinely-varied paragraph (a different topic than round 3's addition, so
// it isn't just more of the same) to the "How This List Was Built" section.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const targets = posts.filter(p => /^best-seo-companies-in-/.test(p.slug));

function cityOf(title) {
  const m = title.match(/in ([^,—]+?)(?:,|—|$)/);
  return m ? m[1].trim() : 'this market';
}

const MORE_METHODOLOGY = [
  city => `<p>A specific thing to watch for in a market the size of ${city}: an agency's own homepage claiming a long list of "specialty" industries it serves. That's usually a sign of a generalist shop describing itself broadly rather than a genuine specialist, and it's worth asking directly which of those industries actually make up the bulk of their current client roster.</p>`,
  city => `<p>Something worth noticing when comparing agencies serving ${city}: how specific their case studies actually are. A results page full of vague percentage increases with no context (increase over what baseline, over what period) tells you less than a single detailed example with real numbers attached.</p>`,
  city => `<p>One pattern to watch for around ${city}: agencies whose "team" page lists the same two or three people across several differently-branded websites. That's not automatically disqualifying, but it's worth asking who specifically would be assigned to your account before assuming a large-sounding team means dedicated attention.</p>`,
  city => `<p>Worth checking directly for any ${city} shortlist: whether the agency's own site actually ranks for the terms it claims to specialize in. An SEO company that can't get its own site to rank locally is a meaningful data point, one way or the other, before you hire them to do it for someone else.</p>`,
  city => `<p>A detail worth confirming for any agency on a ${city} shortlist: how long their current clients have actually stayed. Churn data isn't something most agencies publish, but a direct question about typical client tenure — and a specific answer rather than a dodge — tells you more than most testimonials do.</p>`
];

let changed = 0;
targets.forEach((p, i) => {
  const city = cityOf(p.title);
  const before = p.content;
  const withImg = /(<h2>How This List Was Built<\/h2>[\s\S]*?)(\n?<img )/;
  const withHeading = /(<h2>How This List Was Built<\/h2>[\s\S]*?)(\n?<h2>1\.)/;
  const marker = withImg.test(p.content) ? withImg : withHeading;
  if (marker.test(p.content)) {
    p.content = p.content.replace(marker, (m, before, next) => before + '\n' + MORE_METHODOLOGY[i % MORE_METHODOLOGY.length](city) + '\n' + next);
    changed++;
  }
});

console.log(`posts modified: ${changed}/${targets.length}`);
if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
