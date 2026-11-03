// Day-17: content signals on the readable ranking pages for "content gap analysis" and "subdomain vs subdirectory seo" (Google US, 3 Nov 2026).
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-US,en;q=0.9' };
const kr = path.join(__dirname, '..', '..', 'keyword-research');
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
const SIG = {
  'content-gap-analysis': { template: /template/i, steps: /step\s?\d|\d\.\s|how to (do|run|perform|conduct)/i, keywordGap: /keyword gap/i, competitor: /competitor/i, tools: /ahrefs|semrush|search console|surfer|clearscope/i, prioritize: /prioriti[sz]/i, intent: /search intent|intent/i, example: /example/i, audit: /content audit/i, cluster: /topic cluster|pillar/i, free: /\bfree\b/i, funnel: /funnel|buyer|customer journey/i, ai: /\bai\b|llm|chatgpt/i, cta: /book a demo|sign up|free trial|get started/i },
  'subdomain-vs-subdirectory': { subfolderBetter: /subfolder|subdirector/i, googleSays: /google (says|has said|stated|treats|can|doesn|confirmed)|john mueller|gary illyes|search advocate/i, caseStudy: /case study|we moved|migrated|after (moving|migrating)/i, link: /link equity|link juice|authority|backlink/i, crawl: /crawl/i, international: /international|language|country|locale/i, ecommerce: /shopify|ecommerce|e-commerce|store/i, blog: /\bblog\b/i, cloudflare: /cloudflare|cdn|workers|proxy/i, reverse: /reverse proxy|rewrite/i, example: /example/i, hubspot: /hubspot|wordpress|wix|squarespace/i, robots: /robots\.txt/i, gsc: /search console/i, when: /when to use|when should/i }
};
(async () => {
  for (const k of Object.keys(SIG)) {
    const f = path.join(kr, 'serp-' + k + '-2026-11-03.json'); const R = JSON.parse(fs.readFileSync(f));
    for (const o of R) { if (o.status !== 200) continue; try { const r = await fetch(o.url, { headers: UA, signal: AbortSignal.timeout(25000) }); const x = strip(await r.text()); for (const [n, re] of Object.entries(SIG[k])) o[n] = re.test(x); } catch (e) { o.err = String(e.message).slice(0, 40); } }
    fs.writeFileSync(f, JSON.stringify(R, null, 1));
    const ok = R.filter(o => o.status === 200 && o.words > 400); console.log(k, 'readable', ok.length, JSON.stringify(Object.fromEntries(Object.keys(SIG[k]).map(n => [n, ok.filter(o => o[n]).length]))), 'words', ok.map(o => o.words).join(','), 'ok-urls', ok.length);
  }
})();
