// Assets for the enterprise-seo-audit post: hero donut, cover illustration, infographic HTML, segment-table HTML. Local helper.
const fs = require('fs'); const path = require('path');
const img = path.join(__dirname, '..', 'public', 'images', 'blog'); const S = 'enterprise-seo-audit';

// ---- hero donut
let d = fs.readFileSync(path.join(img, 'diagram-blocked-by-robots-txt.svg'), 'utf8');
const rep = (a, b) => { if (!d.includes(a)) throw new Error('missing ' + a); d = d.replace(a, b); };
rep('<tspan x="380">BLOCKED BY</tspan><tspan x="380" dy="23">ROBOTS.TXT</tspan>', '<tspan x="380">ENTERPRISE</tspan><tspan x="380" dy="23">SEO AUDIT</tspan>');
rep('<tspan x="531.8">Two Statuses,</tspan><tspan x="531.8" dy="15">Two Meanings</tspan>', '<tspan x="531.8">Scope and</tspan><tspan x="531.8" dy="15">Owners</tspan>');
rep('<tspan x="575.0">Find the Rule</tspan>', '<tspan x="575.0">Segment by Template</tspan>');
rep('<tspan x="427.0">Common Causes</tspan>', '<tspan x="427.0">Compare Rates</tspan>');
rep('<tspan x="50.0">Fix, Then</tspan><tspan x="50.0" dy="15">Validate</tspan>', '<tspan x="50.0">Sample the</tspan><tspan x="50.0" dy="15">Deep Checks</tspan>');
rep('<tspan x="81.9">The noindex Trap</tspan>', '<tspan x="81.9">Ticket by Template</tspan>');
fs.writeFileSync(path.join(img, `diagram-${S}.svg`), d);

// ---- cover
let c = fs.readFileSync(path.join(img, 'illus-blocked-by-robots-txt.svg'), 'utf8');
const rc = (a, b) => { if (!c.includes(a)) throw new Error('missing ' + a); c = c.replace(a, b); };
rc('SEARCH CONSOLE GUIDE', 'SEGMENT-FIRST AUDIT');
rc('x="596" y="34" width="150"', 'x="577" y="34" width="169"');
rc('x="671" y="52"', 'x="661.5" y="52"');
rc('>blocked by robots.txt<', '>enterprise seo audit<');
rc('Page indexing report', 'Crawl export by template');
rc('Status: Blocked by robots.txt', 'URLs crawled: 419');
rc('Crawled: no', 'Thin pages flagged: 89');
rc('Indexed: can still happen', 'Thin blog posts: 0');
rc('Snippet: usually missing', 'Listing + team pages: 87');
rc('Fix: narrow the rule', 'Posts missing FAQ data: 25');
rc('Then: validate the fix', 'Audit by template, not URL');
rc('>No crawl<', '>89 to 0<');
rc('is not the same as no index', 'thin blog posts');
rc('noindex needs a crawl to work', 'once pages were segmented');
rc('>Blocked by Robots.txt<', '>Enterprise SEO Audit<');
rc('Diagnose and fix the two Search Console statuses', 'A segment-first method, tested on a real crawl');
fs.writeFileSync(path.join(img, `illus-${S}.svg`), c);

// ---- infographic
const bar = (label, n, max, col) => `<div class="row"><div class="lab">${label}</div><div class="track"><div class="fill" style="width:${Math.max(n / max * 100, n ? 3 : 0)}%;background:${col}"></div></div><div class="num">${n}</div></div>`;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}body{width:1376px;height:790px;background:#FAF5EF;font-family:'Segoe UI',Arial,sans-serif;color:#16192A;position:relative;overflow:hidden}
.b1{position:absolute;right:-120px;top:-140px;width:440px;height:440px;border-radius:50%;background:rgba(20,184,166,.07)}.b2{position:absolute;left:-110px;bottom:-150px;width:420px;height:420px;border-radius:50%;background:rgba(249,115,22,.07)}
.logo{position:absolute;left:50px;top:36px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:21px;color:#16192A}.logo i{width:30px;height:30px;border-width:4px!important;border-radius:50%;border:5px solid #0EA5A0;border-right-color:transparent;display:inline-block}
h1{position:absolute;left:0;right:0;top:46px;text-align:center;font-size:38px;font-weight:800;letter-spacing:-.5px}
.sub{position:absolute;left:0;right:0;top:110px;text-align:center;font-size:22px;color:#6b6459}
.card{position:absolute;top:172px;height:440px;background:#fff;border-radius:22px;padding:28px 34px}
.l{left:56px;width:780px;border:3px solid #0EA5A0}.r{right:56px;width:460px;border:3px solid #F5A623}
.card h2{font-size:26px;font-weight:800;margin-bottom:4px}.l h2{color:#0B807C}.r h2{color:#B5730E}.tag{font-size:16px;color:#6b6459;margin-bottom:24px}
.row{display:flex;align-items:center;gap:16px;margin-bottom:22px}.lab{width:250px;font-size:20px;font-weight:600}.track{flex:1;height:34px;background:#F1EDE3;border-radius:17px;overflow:hidden}.fill{height:100%;border-radius:17px}.num{width:44px;font-size:26px;font-weight:800;text-align:right}
ol{list-style:none;padding:0;counter-reset:s}li{counter-increment:s;display:flex;gap:14px;align-items:flex-start;margin-bottom:20px;font-size:21px;font-weight:600;line-height:1.25}
li:before{content:counter(s);flex:none;width:34px;height:34px;border-radius:50%;background:#F5A623;color:#fff;font-weight:800;text-align:center;line-height:34px;font-size:18px}
li small{display:block;font-size:16px;color:#6b6459;font-weight:400;margin-top:2px}
.note{position:absolute;left:56px;right:56px;top:640px;height:100px;background:#16192A;color:#fff;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:22px;padding:0 30px}
.note b{font-size:50px;color:#5EEAD4;font-weight:800;white-space:nowrap}.note p{font-size:23px;line-height:1.35}.note em{font-style:normal;color:#FBBF24;font-weight:700}
</style></head><body><div class="b1"></div><div class="b2"></div>
<div class="logo"><svg width="44" height="44" viewBox="0 0 44 44" style="flex:none"><circle cx="22" cy="22" r="21" fill="#fff" stroke="#EAE0D2"/><g transform="translate(-0,-0) scale(0.9167)"><path d="M 35.52 13.63 A 15.5 15.5 0 1 0 35.52 34.37" fill="none" stroke="#0EA5A0" stroke-width="4.2" stroke-linecap="round" transform="translate(0,0)"/><line x1="35.52" y1="13.63" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.2"/><line x1="35.52" y1="34.37" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.2"/><circle cx="35.52" cy="13.63" r="3.1" fill="#F5A623"/><circle cx="35.52" cy="13.63" r="1.1" fill="#fff"/><circle cx="35.52" cy="34.37" r="3.1" fill="#14B8A6"/><circle cx="35.52" cy="34.37" r="1.1" fill="#fff"/><circle cx="24" cy="24" r="2" fill="#16192A"/></g></svg>Contomatix</div>
<h1>Segment First: Where 89 Thin Pages Really Were</h1>
<div class="sub">Enterprise SEO audit method applied to a 419-URL crawl, 9 October 2026</div>
<div class="card l"><h2>Thin pages by segment</h2><div class="tag">Pages under 400 words, grouped by template</div>
${bar('Blog listing URLs', 60, 60, '#0EA5A0')}${bar('Team and author pages', 27, 60, '#14B8A6')}${bar('Contact and legal', 2, 60, '#FBBF24')}${bar('Blog posts (296)', 0, 60, '#F5A623')}${bar('Tools and services', 0, 60, '#F5A623')}</div>
<div class="card r"><h2>The method</h2><div class="tag">Seven steps, shortened</div><ol>
<li><div>Define segments from templates<small>and a second cut by publish date</small></div></li>
<li><div>Compare rates, not totals<small>find the group that differs</small></div></li>
<li><div>Drop deliberate noindex pages<small>then check the rules themselves</small></div></li>
<li><div>Ticket by template<small>URL count and an owner on each</small></div></li></ol></div>
<div class="note"><b>89 to 0</b><p>thin blog posts once pages were grouped. A cohort check also found <em>25 posts missing FAQ data</em>.</p></div>
</body></html>`;
fs.writeFileSync(path.join(__dirname, 'infographic-enterprise-seo-audit.html'), html);

// ---- real crawl export, regrouped (screenshot source)
const crawl = require('../../contomatix-audit/onpage-results.json'); const P = crawl.pages;
const seg = u => { const p = new URL(u).pathname; if (p === '/blog') return 'Blog listing and paginated URLs'; if (/^\/blog\/./.test(p)) return 'Blog posts'; if (/^\/team/.test(p)) return 'Team and author pages'; if (/^\/tools/.test(p)) return 'Tools'; if (/^\/services/.test(p)) return 'Services'; return 'Other (home, about, contact, legal)'; };
const order = ['Blog posts', 'Blog listing and paginated URLs', 'Team and author pages', 'Tools', 'Services', 'Other (home, about, contact, legal)'];
const med = a => { a = a.slice().sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };
const ex = p => /noindex/.test(p.robots || '') || (p.canonical && p.canonical.replace(/\/$/, '') !== p.url.replace(/\/$/, ''));
const rows = order.map(k => { const a = P.filter(p => seg(p.url) === k); return `<tr><td>${k}</td><td>${a.length}</td><td>${a.filter(p => p.inSitemap).length}</td><td>${a.filter(ex).length}</td><td class="${a.filter(p => p.words < 400).length ? 'hot' : ''}">${a.filter(p => p.words < 400).length}</td><td>${a.filter(p => p.descLen < 110).length}</td><td>${a.filter(p => p.isPost && !p.faqCount).length}</td><td>${med(a.map(p => p.words))}</td></tr>`; }).join('');
const th = `<tr><td>All URLs</td><td>${P.length}</td><td>${P.filter(p => p.inSitemap).length}</td><td>${P.filter(ex).length}</td><td class="hot">${P.filter(p => p.words < 400).length}</td><td>${P.filter(p => p.descLen < 110).length}</td><td>${P.filter(p => p.isPost && !p.faqCount).length}</td><td></td></tr>`;
fs.writeFileSync(path.join(__dirname, 'segment-table-enterprise-seo-audit.html'), `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1280px;box-sizing:border-box;background:#fff;font-family:'Segoe UI',Arial,sans-serif;color:#16192A;padding:28px 32px}
h3{margin:0 0 4px;font-size:22px}p{margin:0 0 16px;color:#6b6459;font-size:15px}
table{width:100%;border-collapse:collapse;font-size:17px}th{background:#F1EDE3;text-align:right;padding:12px 14px;font-size:14px;color:#6b6459;text-transform:uppercase;letter-spacing:.3px}th:first-child,td:first-child{text-align:left}
td{padding:13px 14px;text-align:right;border-bottom:1px solid #EAE0D2;font-variant-numeric:tabular-nums}td:first-child{font-weight:600}tr:last-child td{font-weight:800;background:#FAF5EF;border-bottom:0}.hot{color:#B5730E;font-weight:800}
</style></head><body><h3>Crawl export grouped by template</h3><p>contomatix.com, crawled ${crawl.crawledAt.slice(0, 10)}. One row per segment, rates compared side by side.</p>
<table><thead><tr><th>Segment</th><th>URLs</th><th>In sitemap</th><th>Noindex / canonical elsewhere</th><th>Under 400 words</th><th>Description under 110</th><th>Posts without FAQ data</th><th>Median words</th></tr></thead><tbody>${rows}${th}</tbody></table></body></html>`);
console.log('assets written');
