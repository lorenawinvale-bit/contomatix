#!/usr/bin/env node
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const services = require(path.join(ROOT, 'data', 'services'));

services.forEach(s => {
  const parts = [
    s.title, s.summary, s.description,
    ...(s.points || []),
    ...(s.faqs || []).flatMap(f => [f.q, f.a]),
    `Interested in ${s.title}? Get in touch and we'll walk you through how it fits your site.`
  ];
  const text = parts.join(' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  console.log(`${s.slug}: ${words} words`);
});
