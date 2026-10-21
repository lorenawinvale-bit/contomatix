// Visible-text mention count vs links to contomatix.com for each page found (21 Oct 2026).
const fs = require('fs'); const path = require('path'); const kr = path.join(__dirname, '..', '..', 'keyword-research');
const rows = JSON.parse(fs.readFileSync(path.join(kr, 'brand-mentions-2026-10-21.json'), 'utf8'));
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
(async () => {
  const out = [];
  for (const r of rows) {
    const o = { url: r.url, status: r.status }; if (r.status !== 200) { out.push(o); continue; }
    try { const h = await (await fetch(r.url, { headers: UA, redirect: 'follow' })).text();
      const vis = h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
      o.textMentions = (vis.match(/contomatix/gi) || []).length;
      const a = [...h.matchAll(/<a\b([^>]*)>/gi)].filter(m => /href=["'][^"']*contomatix\.com/i.test(m[1])); o.links = a.length; o.nofollow = a.filter(m => /nofollow|sponsored|ugc/i.test(m[1])).length;
    } catch (e) { o.err = 1; }
    out.push(o); console.log(o.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 56).padEnd(56), o.status, 'text', o.textMentions, 'links', o.links, 'nofollow', o.nofollow);
  }
  fs.writeFileSync(path.join(kr, 'brand-mentions-visible-2026-10-21.json'), JSON.stringify(out, null, 1));
  const ok = out.filter(o => o.status === 200 && o.textMentions > 0); console.log('pages with visible mention', ok.length, 'with link', ok.filter(o => o.links > 0).length, 'unlinked', ok.filter(o => o.links === 0).length);
})();
