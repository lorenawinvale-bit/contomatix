// One-off: open pages that link to contomatix.com (found via GSC Links + site: searches, 19 Oct 2026) and record link context and rel.
const fs = require('fs'); const path = require('path');
const urls = ['https://www.apollotechnical.com/what-are-white-label-seo-services-and-how-do-they-work/','https://recited.co.uk/marketing-agencies/truro/','https://raptorkit.com/ahrefs-vs-kwfinder/','https://aitoolcompass.net/tools/contomatix-llm-seo-checker','https://nav-ai.net/ai/contomatix-hreflang-sitemap-validator','https://www.producthunt.com/products/contomatix','https://www.scamadviser.com/check-website/contomatix.com','https://www.goodfirms.co/company/contomatix','https://www.designrush.com/agency/profile/contomatix','https://saasrankly.com/'];
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
(async () => {
  const out = [];
  for (const u of urls) {
    const o = { url: u };
    try { const r = await fetch(u, { redirect: 'follow', headers: UA }); o.status = r.status; const h = await r.text();
      const links = [...h.matchAll(/<a\b([^>]*href=["'][^"']*contomatix\.com[^"']*["'][^>]*)>([\s\S]{0,200}?)<\/a>/gi)].map(m => ({ rel: (m[1].match(/rel=["']([^"']+)["']/i) || [])[1] || '', text: m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60) }));
      o.links = links.slice(0, 6); o.count = links.length; o.words = h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
      const i = h.search(/contomatix\.com/i); o.ctx = i >= 0 ? h.slice(Math.max(0, i - 300), i + 200).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 280) : '';
    } catch (e) { o.error = String(e.message).slice(0, 50); }
    out.push(o); console.log(u.slice(8, 70), o.status || o.error, 'links', o.count, JSON.stringify((o.links || []).map(l => l.rel + '|' + l.text)).slice(0, 160));
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-backlinks-pages-2026-10-19.json'), JSON.stringify(out, null, 1));
})();
