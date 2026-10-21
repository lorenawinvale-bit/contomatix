// One-off: for pages found by a Google search for "contomatix" (21 Oct 2026), check whether the page mentions the brand and whether it links to contomatix.com.
const fs = require('fs'); const path = require('path');
const urls = ['https://clutch.co/profile/contomatix','https://themanifest.com/company/contomatix','https://www.sortlist.com/agency/contomatix-com','https://www.nicheloom.com/launches/45674/','https://piehost.com/status/contomatix.com','https://www.nicheloom.com/launches/49468/','https://www.nicheloom.com/launches/37281/','https://www.nicheloom.com/launches/17248/','https://www.nicheloom.com/launches/11681/','https://www.nicheloom.com/launches/52179/','https://www.nicheloom.com/launches/11787/','https://pk.linkedin.com/company/contomatix','https://www.facebook.com/p/Contomatix-61594091741317/','https://www.linkedin.com/posts/contomatix_seo-aiseo-answerengineoptimization-activity-7505913118288494592-8Mfb','https://www.linkedin.com/posts/slatehq-ai_agenticseo-aeo-aisearch-activity-7510219134194999296-JGfb','https://www.linkedin.com/posts/m2cip_aisearch-entityresolution-brandstrategy-activity-7500509357265043456-uJE8','https://www.linkedin.com/posts/scealed_seo-digitalmarketing-activity-7505928544909275136-W3_-','https://www.linkedin.com/posts/ali-nyausaru_seo-aisearch-digitalmarketing-activity-7504239040989368320-zWRS','https://www.linkedin.com/posts/mediatelawsuit_legalmarketing-geo-aivisibility-activity-7508868511692328960-AzRX','https://www.apollotechnical.com/what-are-white-label-seo-services-and-how-do-they-work/','https://raptorkit.com/ahrefs-vs-kwfinder/','https://aitoolcompass.net/tools/contomatix-llm-seo-checker','https://nav-ai.net/ai/contomatix-hreflang-sitemap-validator','https://www.goodfirms.co/company/contomatix','https://www.scamadviser.com/check-website/contomatix.com'];
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)' };
(async () => {
  const rows = [];
  for (const u of urls) {
    const o = { url: u }; try { const c = new AbortController(); const t = setTimeout(() => c.abort(), 20000); const r = await fetch(u, { redirect: 'follow', signal: c.signal, headers: UA }); clearTimeout(t); o.status = r.status; const h = await r.text();
      o.mention = /contomatix/i.test(h.replace(/<a\b[^>]*>/gi, ' ').replace(/https?:\/\/[^\s"']*contomatix[^\s"']*/gi, ' ')) || /contomatix/i.test(h);
      const a = [...h.matchAll(/<a\b([^>]*href=["'][^"']*contomatix\.com[^"']*["'][^>]*)>/gi)].map(m => (m[1].match(/rel=["']([^"']+)["']/i) || [])[1] || '');
      o.links = a.length; o.rel = a.slice(0, 3);
    } catch (e) { o.error = String(e.message).slice(0, 40); }
    rows.push(o); console.log(u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 58).padEnd(58), o.status || o.error, 'mention', o.mention, 'links', o.links, (o.rel || []).join('|'));
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'brand-mentions-2026-10-21.json'), JSON.stringify(rows, null, 1));
})();
