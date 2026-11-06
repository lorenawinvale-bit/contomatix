// Adds a "related questions" section (H2 + H3 answers) to an existing post, before its FAQ heading (or before Related Reading, or at the end).
// If the H2 already exists, only the H3 items that are not there yet are appended to the end of that section (idempotent per H3).
// usage: const { apply } = require('./lowvol-lib.js'); apply([{ slug, h2, items: [{ h3, html }], keywords: ['...'], sources: 'GSC and Ahrefs' }], { date });
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..');
const wordCount = c => c.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
function apply(batch, opts = {}) {
  const fp = path.join(root, 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const slugs = new Set(posts.map(p => p.slug)); const tools = require('../data/tools.js').map(t => t.slug);
  const report = [];
  for (const b of batch) {
    const p = posts.find(x => x.slug === b.slug); if (!p) throw new Error('missing post ' + b.slug);
    const tag = `<h2>${b.h2}</h2>`; const before = wordCount(p.content);
    const fresh = b.items.filter(i => !p.content.includes(`<h3>${i.h3}</h3>`)); if (!fresh.length) { report.push(b.slug + ': already applied'); continue; }
    const block = fresh.map(i => `<h3>${i.h3}</h3>\n<p>${i.html}</p>`).join('\n') + '\n\n';
    if (/—/.test(block)) throw new Error('em dash in ' + b.slug);
    for (const m of block.matchAll(/href="(\/[^"#]+)"/g)) { const u = m[1]; if (u.startsWith('/blog/') ? !slugs.has(u.slice(6)) : u.startsWith('/tools/') ? !tools.includes(u.slice(7)) : false) throw new Error('bad link ' + u + ' in ' + b.slug); }
    const at = p.content.indexOf(tag);
    if (at >= 0) {
      let end = p.content.indexOf('<h2>', at + tag.length); if (end < 0) end = p.content.length;
      p.content = p.content.slice(0, end) + block + p.content.slice(end);
    } else {
      let i = p.content.indexOf('<h2>Frequently Asked Questions</h2>'); if (i < 0) i = p.content.indexOf('<h2>Related Reading</h2>'); if (i < 0) i = p.content.length;
      p.content = p.content.slice(0, i) + tag + '\n' + block + p.content.slice(i);
    }
    const after = wordCount(p.content);
    const text = p.content.toLowerCase().replace(/<[^>]+>/g, ' '); const has = k => k.toLowerCase().split(' ').every(w => text.includes(w.replace(/s$/, ''))); const used = (b.keywords || []).filter(has);
    report.push(`${b.slug}: +${after - before} words (${before} -> ${after}), ${fresh.length} new H3, keywords found ${used.length}/${(b.keywords || []).length}` + (used.length < (b.keywords || []).length ? ' MISSING: ' + (b.keywords || []).filter(k => !used.includes(k)).join(', ') : ''));
    if (b.keywords) { const kf = path.join(root, '..', 'keyword-research', 'lowvol-keywords-' + b.slug + '.md'); const prev = fs.existsSync(kf) ? fs.readFileSync(kf, 'utf8').split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2)) : []; const all = [...new Set([...prev, ...b.keywords])]; fs.writeFileSync(kf, `# Low-volume keywords added to ${b.slug} (${opts.date || ''})\nSources: ${b.sources || 'Ahrefs matching terms, US'}\n${all.map(k => '- ' + k).join('\n')}\n`); }
  }
  if (!opts.dry) fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8');
  console.log(report.join('\n'));
}
module.exports = { apply };
