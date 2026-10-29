// One-off (29 Oct 2026): compare raw HTML vs rendered DOM on our own pages. node scripts/measure-js-render.js
// Raw = server response text (what a crawler sees before running JS). Rendered = headless Chrome DOM after load (scripts/capture-page.js --js).
const fs = require('fs'); const path = require('path'); const os = require('os'); const { execFileSync } = require('child_process');
const base = 'https://contomatix.com';
const pages = ['/', '/services', '/tools', '/blog', '/tools/schema-markup-generator', '/tools/robots-txt-tester', '/tools/redirect-mapper', '/tools/log-file-analyzer', '/tools/content-brief-generator', '/tools/anchor-text-checker', '/tools/sitemap-generator', '/tools/seo-report-generator', '/tools/utm-builder', '/tools/keyword-mapping-tool', '/blog/improve-core-web-vitals', '/blog/seo-site-migration', '/blog/types-of-schema-markup', '/blog/set-up-google-search-console', '/blog/301-redirect-not-working', '/blog/content-brief-template', '/blog/pr-link-building', '/blog/link-acquisition', '/blog/directory-links', '/blog/offpage-seo', '/blog/check-backlinks-of-website'];
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const jsFile = path.join(os.tmpdir(), 'js-render-probe.js');
fs.writeFileSync(jsFile, "JSON.stringify({ w: document.documentElement.innerText.split(/\\s+/).filter(Boolean).length, a: document.querySelectorAll('a[href]').length, h2: document.querySelectorAll('h2').length, img: document.querySelectorAll('img').length })");
(async () => {
  const out = [];
  for (const p of pages) {
    const o = { path: p };
    try {
      const r = await fetch(base + p, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/130' } }); const raw = await r.text(); o.status = r.status;
      o.rawWords = strip(raw).split(' ').filter(Boolean).length; o.rawLinks = (raw.match(/<a\s[^>]*href=/gi) || []).length; o.rawH2 = (raw.match(/<h2[\s>]/gi) || []).length; o.rawImg = (raw.match(/<img\s/gi) || []).length; o.rawBytes = raw.length;
      o.scriptTags = (raw.match(/<script[\s>]/gi) || []).length; o.inlineJsonLd = (raw.match(/application\/ld\+json/gi) || []).length;
      const so = execFileSync(process.execPath, [path.join(__dirname, 'capture-page.js'), base + p, path.join(os.tmpdir(), 'js-probe.png'), '--w=1280', '--h=900', '--js=' + jsFile.split(path.sep).join('/'), '--wait=6000'], { stdio: 'pipe', timeout: 60000 }).toString();
      const m = /js: (.*)/.exec(so); const j = JSON.parse(m[1].trim());
      o.renWords = j.w; o.renLinks = j.a; o.renH2 = j.h2; o.renImg = j.img;
    } catch (e) { o.error = String(e.message || e).slice(0, 80); }
    out.push(o); console.log(JSON.stringify(o));
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-js-render-2026-10-29.json'), JSON.stringify(out, null, 1));
})();
