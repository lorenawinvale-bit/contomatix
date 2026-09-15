#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'blog.json'), 'utf8'));
const services = require(path.join(ROOT, 'data', 'services'));
const locations = require(path.join(ROOT, 'data', 'locations'));

const pages = [];
posts.forEach(p => pages.push({ path: '/blog/' + p.slug, title: p.title, desc: p.excerpt, kind: 'post' }));
services.forEach(s => pages.push({ path: '/services/' + s.slug, title: `${s.title} Services — Contomatix`, desc: s.summary, kind: 'service' }));
locations.forEach(l => pages.push({ path: '/services/' + l.slug, title: `${l.title} — Contomatix`, desc: l.summary, kind: 'location' }));

// Static/tool page titles+descriptions, copied from server.js route handlers.
const serverSrc = fs.readFileSync(path.join(ROOT, 'server.js'), 'utf8');
const routeRe = /app\.get\('([^']+)',[\s\S]{0,20}?res\.render\('pages\/[^']+',\s*\{\s*title:\s*'([^']+)',\s*description:\s*'([^']+)'/g;
let m;
while ((m = routeRe.exec(serverSrc)) !== null) {
  pages.push({ path: m[1], title: m[2].replace(/\\'/g, "'"), desc: m[3].replace(/\\'/g, "'"), kind: 'static' });
}

console.log(`Checked ${pages.length} pages\n`);

console.log('=== TITLES > 60 chars ===');
pages.filter(p => p.title.length > 60).sort((a, b) => b.title.length - a.title.length)
  .forEach(p => console.log(`  ${p.title.length}  ${p.path}  "${p.title}"`));

console.log('\n=== TITLES < 30 chars ===');
pages.filter(p => p.title.length < 30).sort((a, b) => a.title.length - b.title.length)
  .forEach(p => console.log(`  ${p.title.length}  ${p.path}  "${p.title}"`));

console.log('\n=== META DESCRIPTIONS < 70 chars ===');
pages.filter(p => p.desc.length < 70).sort((a, b) => a.desc.length - b.desc.length)
  .forEach(p => console.log(`  ${p.desc.length}  ${p.path}  "${p.desc}"`));

console.log('\n=== META DESCRIPTIONS > 160 chars ===');
pages.filter(p => p.desc.length > 160).sort((a, b) => b.desc.length - a.desc.length)
  .forEach(p => console.log(`  ${p.desc.length}  ${p.path}  "${p.desc}"`));
