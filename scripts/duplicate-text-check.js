// Text-overlap check: shares of 8-word shingles that also appear in another post. node scripts/duplicate-text-check.js [dateFrom]
const posts = require('../data/blog.json'); const from = process.argv[2] || '2026-10-15';
const clean = h => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
const sh = w => { const s = new Set(); for (let i = 0; i + 8 <= w.length; i++) s.add(w.slice(i, i + 8).join(' ')); return s; };
const all = posts.map(p => ({ slug: p.slug, date: p.date, s: sh(clean(p.content)) }));
const idx = new Map(); all.forEach((p, i) => p.s.forEach(x => { if (!idx.has(x)) idx.set(x, []); idx.get(x).push(i); }));
const rows = [];
all.forEach((p, i) => { if (p.date < from) return; const hit = {}; let shared = 0; p.s.forEach(x => { const o = idx.get(x).filter(j => j !== i); if (o.length) { shared++; o.forEach(j => hit[all[j].slug] = (hit[all[j].slug] || 0) + 1); } });
  const top = Object.entries(hit).sort((a, b) => b[1] - a[1])[0]; rows.push([+(shared / p.s.size * 100).toFixed(1), p.slug, top ? top[0] + ' (' + top[1] + ')' : '-']); });
rows.sort((a, b) => b[0] - a[0]); console.log(rows.length, 'posts since', from); rows.forEach(r => console.log(String(r[0]).padStart(5) + '%', r[1].padEnd(36), r[2]));
