// Shared builder for the Day-9 posts: writes assets (donut, cover, infographic, tables) and the blog.json entry.
// usage: require('./post-day9-common.js')(cfg) where cfg = {slug,title,category,author,date,excerpt,donut,cover,info,tables:{name:tableOpts},content:(h)=>html}
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
module.exports = function build(cfg) {
  const root = path.join(__dirname, '..'); const SLUG = cfg.slug;
  L.donut(SLUG, cfg.donut[0], cfg.donut[1]);
  L.cover(SLUG, cfg.cover);
  fs.writeFileSync(path.join(__dirname, 'infographic-' + SLUG + '.html'), L.infographicHtml(cfg.info));
  for (const [n, t] of Object.entries(cfg.tables)) fs.writeFileSync(path.join(__dirname, 'table-' + SLUG + '-' + n + '.html'), L.tableHtml(t));
  const pr = path.join(root, 'public', 'images', 'blog', 'proof');
  const hh = n => { const f = path.join(pr, SLUG + '-' + n + '.png'); if (!fs.existsSync(f)) return 600; return fs.readFileSync(f).readUInt32BE(20); };
  const h = {
    f: n => n.toLocaleString('en-US'),
    fig: (n, alt) => `<figure style="margin:20px 0;"><img src="/images/blog/proof/${SLUG}-${n}.png" alt="${alt}" width="1280" height="${hh(n)}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>`,
    info: alt => `<figure style="margin:20px 0;"><img src="/images/blog/infographic-${SLUG}.png" alt="${alt}" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>`,
    faq: items => `<div class="post-faq">\n${items.map(([q, a]) => `<details>\n<summary>${q}</summary>\n<p>${a}</p>\n</details>`).join('\n')}\n</div>`,
    updated: '<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>'
  };
  const out = cfg.content(h);
  const post = { slug: SLUG, title: cfg.title, category: cfg.category, author: cfg.author, date: cfg.date, excerpt: cfg.excerpt, heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
  const firstExt = out.search(/href="https?:/);
  console.log('title len', cfg.title.length, 'excerpt', cfg.excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length);
  if (process.argv.includes('--write')) {
    const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
    fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
  }
};
