// Shared asset builders for blog posts (hero donut, cover illustration, approved-style infographic). Local helper.
const fs = require('fs'); const path = require('path');
const img = path.join(__dirname, '..', 'public', 'images', 'blog');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// center: [line1, line2]; labels: 5 entries, each a string or [line1, line2] in order: top-right, right, bottom, left, top-left
function donut(slug, center, labels) {
  let d = fs.readFileSync(path.join(img, 'diagram-blocked-by-robots-txt.svg'), 'utf8');
  const rep = (a, b) => { if (!d.includes(a)) throw new Error('donut missing ' + a); d = d.replace(a, () => b); };
  rep('<tspan x="380">BLOCKED BY</tspan><tspan x="380" dy="23">ROBOTS.TXT</tspan>', `<tspan x="380">${esc(center[0])}</tspan><tspan x="380" dy="23">${esc(center[1])}</tspan>`);
  const slots = [
    ['<tspan x="531.8">Two Statuses,</tspan><tspan x="531.8" dy="15">Two Meanings</tspan>', 531.8],
    ['<tspan x="575.0">Find the Rule</tspan>', 575.0],
    ['<tspan x="427.0">Common Causes</tspan>', 427.0],
    ['<tspan x="50.0">Fix, Then</tspan><tspan x="50.0" dy="15">Validate</tspan>', 50.0],
    ['<tspan x="81.9">The noindex Trap</tspan>', 81.9]];
  slots.forEach(([old, x], i) => {
    const L = Array.isArray(labels[i]) ? labels[i] : [labels[i]];
    rep(old, L.map((t, j) => `<tspan x="${x}"${j ? ' dy="15"' : ''}>${esc(t)}</tspan>`).join(''));
  });
  fs.writeFileSync(path.join(img, `diagram-${slug}.svg`), d);
}

// o: {badge, search, card, lines:[5 strings], last, big, k1, k2, title, sub}
function cover(slug, o) {
  let c = fs.readFileSync(path.join(img, 'illus-blocked-by-robots-txt.svg'), 'utf8');
  const rc = (a, b) => { if (!c.includes(a)) throw new Error('cover missing ' + a); c = c.replace(a, () => b); };
  const bw = Math.max(150, Math.round(o.badge.length * 7.4 + 30));
  rc('SEARCH CONSOLE GUIDE', esc(o.badge));
  rc('x="596" y="34" width="150"', `x="${746 - bw}" y="34" width="${bw}"`);
  rc('x="671" y="52"', `x="${746 - bw / 2}" y="52"`);
  rc('>blocked by robots.txt<', `>${esc(o.search)}<`);
  rc('Page indexing report', esc(o.card));
  ['Status: Blocked by robots.txt', 'Crawled: no', 'Indexed: can still happen', 'Snippet: usually missing', 'Fix: narrow the rule'].forEach((t, i) => rc(t, esc(o.lines[i])));
  rc('Then: validate the fix', esc(o.last));
  rc('>No crawl<', `>${esc(o.big)}<`);
  rc('is not the same as no index', esc(o.k1));
  rc('noindex needs a crawl to work', esc(o.k2));
  rc('>Blocked by Robots.txt<', `>${esc(o.title)}<`);
  rc('Diagnose and fix the two Search Console statuses', esc(o.sub));
  fs.writeFileSync(path.join(img, `illus-${slug}.svg`), c);
}

const MARK = `<svg width="44" height="44" viewBox="0 0 44 44" style="flex:none"><circle cx="22" cy="22" r="21" fill="#fff" stroke="#EAE0D2"/><g transform="scale(0.9167)"><path d="M 35.52 13.63 A 15.5 15.5 0 1 0 35.52 34.37" fill="none" stroke="#0EA5A0" stroke-width="4.2" stroke-linecap="round"/><line x1="35.52" y1="13.63" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.2"/><line x1="35.52" y1="34.37" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.2"/><circle cx="35.52" cy="13.63" r="3.1" fill="#F5A623"/><circle cx="35.52" cy="13.63" r="1.1" fill="#fff"/><circle cx="35.52" cy="34.37" r="3.1" fill="#14B8A6"/><circle cx="35.52" cy="34.37" r="1.1" fill="#fff"/><circle cx="24" cy="24" r="2" fill="#16192A"/></g></svg>`;

// o: {title, sub, leftTitle, leftTag, bars:[{label,sub,n}], max, rightTitle, rightTag, items:[{t,s}], big, noteHtml}
function infographicHtml(o) {
  const cols = ['#0EA5A0', '#14B8A6', '#FBBF24', '#F5A623', '#8A8371'];
  const bars = o.bars.map((b, i) => `<div class="row"><div class="lab">${esc(b.label)}<small>${esc(b.sub || '')}</small></div><div class="track"><div class="fill" style="width:${Math.max((b.v !== undefined ? b.v : b.n) / o.max * 100, (b.v !== undefined ? b.v : b.n) ? 3 : 0)}%;background:${b.color || cols[i % cols.length]}"></div></div><div class="num">${esc(b.n)}</div></div>`).join('');
  const items = o.items.map(i => `<li>${esc(i.t)}<small>${esc(i.s)}</small></li>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}body{width:1376px;height:790px;background:#FAF5EF;font-family:'Segoe UI',Arial,sans-serif;color:#16192A;position:relative;overflow:hidden}
.b1{position:absolute;right:-120px;top:-140px;width:440px;height:440px;border-radius:50%;background:rgba(20,184,166,.07)}.b2{position:absolute;left:-110px;bottom:-150px;width:420px;height:420px;border-radius:50%;background:rgba(249,115,22,.07)}
.logo{position:absolute;left:50px;top:36px;display:flex;align-items:center;gap:10px;font-weight:700;font-size:21px;color:#16192A}
h1{position:absolute;left:0;right:0;top:46px;text-align:center;font-size:38px;font-weight:800;letter-spacing:-.5px;padding:0 230px}.sub{position:absolute;left:0;right:0;top:110px;text-align:center;font-size:22px;color:#6b6459}
.card{position:absolute;top:172px;height:440px;background:#fff;border-radius:22px;padding:28px 34px}.l{left:56px;width:780px;border:3px solid #0EA5A0}.r{right:56px;width:460px;border:3px solid #F5A623}
.card h2{font-size:26px;font-weight:800;margin-bottom:4px}.l h2{color:#0B807C}.r h2{color:#B5730E}.tag{font-size:16px;color:#6b6459;margin-bottom:22px}
.row{display:flex;align-items:center;gap:16px;margin-bottom:20px}.lab{width:270px;font-size:19px;font-weight:600;line-height:1.15}.lab small{display:block;font-size:14px;color:#6b6459;font-weight:400}.track{flex:1;height:30px;background:#F1EDE3;border-radius:15px;overflow:hidden}.fill{height:100%;border-radius:15px}.num{width:62px;font-size:26px;font-weight:800;text-align:right}
ul{list-style:none;padding:0}li{margin-bottom:18px;font-size:20px;font-weight:700;line-height:1.25}li small{display:block;font-size:16px;color:#6b6459;font-weight:400;margin-top:2px}li:before{content:'';display:inline-block;width:12px;height:12px;border-radius:50%;background:#F5A623;margin-right:12px}
.note{position:absolute;left:56px;right:56px;top:640px;height:100px;background:#16192A;color:#fff;border-radius:18px;display:flex;align-items:center;justify-content:center;gap:22px;padding:0 30px}.note b{font-size:50px;color:#5EEAD4;font-weight:800;white-space:nowrap}.note p{font-size:23px;line-height:1.35}.note em{font-style:normal;color:#FBBF24;font-weight:700}
</style></head><body><div class="b1"></div><div class="b2"></div><div class="logo">${MARK}Contomatix</div>
<h1>${esc(o.title)}</h1><div class="sub">${esc(o.sub)}</div>
<div class="card l"><h2>${esc(o.leftTitle)}</h2><div class="tag">${esc(o.leftTag)}</div>${bars}</div>
<div class="card r"><h2>${esc(o.rightTitle)}</h2><div class="tag">${esc(o.rightTag)}</div><ul>${items}</ul></div>
<div class="note"><b>${esc(o.big)}</b><p>${o.noteHtml}</p></div></body></html>`;
}

// simple table image source: {title, sub, head:[...], rows:[[...]], lastBold:true, width}
function tableHtml(o) {
  const th = o.head.map(h => `<th>${esc(h)}</th>`).join('');
  const tr = o.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1280px;box-sizing:border-box;background:#fff;font-family:'Segoe UI',Arial,sans-serif;color:#16192A;padding:28px 32px}
h3{margin:0 0 4px;font-size:22px}p{margin:0 0 16px;color:#6b6459;font-size:15px}
table{width:100%;border-collapse:collapse;font-size:18px}th{background:#F1EDE3;text-align:right;padding:12px 14px;font-size:14px;color:#6b6459;text-transform:uppercase;letter-spacing:.3px}th:first-child,td:first-child{text-align:left}
td{padding:13px 14px;text-align:right;border-bottom:1px solid #EAE0D2;font-variant-numeric:tabular-nums}td:first-child{font-weight:600}${o.lastBold ? 'tr:last-child td{font-weight:800;background:#FAF5EF;border-bottom:0}' : ''}
</style></head><body><h3>${esc(o.title)}</h3><p>${esc(o.sub)}</p><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></body></html>`;
}

module.exports = { donut, cover, infographicHtml, tableHtml, img, esc };
