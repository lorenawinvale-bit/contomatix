#!/usr/bin/env node
const blogStore = require('../lib/blogStore');
const posts = blogStore.getAll();
const incoming = {};
posts.forEach(p => { incoming[p.slug] = 0; });
posts.forEach(p => {
  blogStore.getRelated(p.slug, 3).forEach(r => { incoming[r.slug]++; });
});
const zero = Object.entries(incoming).filter(([, c]) => c === 0);
const one = Object.entries(incoming).filter(([, c]) => c === 1);
console.log(`0 incoming (from related-guides widget alone): ${zero.length}`);
zero.forEach(([s]) => console.log('  ', s));
console.log(`1 incoming: ${one.length}`);
