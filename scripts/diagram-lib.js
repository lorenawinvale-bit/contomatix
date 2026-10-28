// Concept-diagram generators (numbered cards, process flow, scorecard, compare) in a clean testlify-like layout with our palette.
// Each returns an SVG string. hero(slug, svg) writes public/images/blog/diagram-<slug>.svg (760x560); proofHtml(svg) wraps one for finish-assets (table-<slug>-<name>.html).
const fs = require('fs'); const path = require('path');
const img = path.join(__dirname, '..', 'public', 'images', 'blog');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const C = { bg: '#FAF5EF', ink: '#16192A', mute: '#6b6459', line: '#EAE0D2', teal: '#0EA5A0', tealBg: '#E6F6F4', amber: '#F5A623', amberBg: '#FEF3DC', navy: '#1B2A4A', red: '#E5484D', redBg: '#FDECEC' };
const FONT = "font-family=\"'Segoe UI',Arial,sans-serif\"";
// wrap text into lines of at most n chars
function wrap(s, n) { const out = []; let cur = ''; for (const w of String(s).split(' ')) { if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); } if (cur) out.push(cur); return out; }
function lines(x, y, arr, size, fill, weight, anchor, lh) { return arr.map((t, i) => `<text x="${x}" y="${y + i * (lh || size * 1.35)}" font-size="${size}" fill="${fill}" font-weight="${weight || 400}" text-anchor="${anchor || 'start'}">${esc(t)}</text>`).join(''); }
function logoSvg(w, h) { return `<defs><linearGradient id="lgr" x1="10" y1="8" x2="38" y2="42" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2DD4BF"/><stop offset="0.55" stop-color="#0EA5A0"/><stop offset="1" stop-color="#0B807C"/></linearGradient><linearGradient id="lgn" x1="30" y1="9" x2="41" y2="19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FBBF24"/><stop offset="1" stop-color="#F5A623"/></linearGradient><linearGradient id="lgt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14B8A6"/><stop offset="0.55" stop-color="#0EA5A0"/><stop offset="1" stop-color="#0B807C"/></linearGradient></defs><g transform="translate(${w - 160} 16)"><g transform="scale(0.8)"><path d="M 35.52 13.63 A 15.5 15.5 0 1 0 35.52 34.37" fill="none" stroke="url(#lgr)" stroke-width="6" stroke-linecap="round"/><line x1="35.52" y1="13.63" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.7"/><line x1="35.52" y1="34.37" x2="24" y2="24" stroke="#C9BBA9" stroke-width="1.7"/><circle cx="35.52" cy="13.63" r="4.2" fill="url(#lgn)"/><circle cx="35.52" cy="13.63" r="1.5" fill="#fff"/><circle cx="35.52" cy="34.37" r="4.2" fill="#14B8A6"/><circle cx="35.52" cy="34.37" r="1.5" fill="#fff"/><circle cx="24" cy="24" r="2.4" fill="#16192A"/></g><text x="44" y="26" font-size="20" font-weight="700" font-family="'Segoe UI',Arial,sans-serif" letter-spacing="-0.3"><tspan fill="#16192A">Conto</tspan><tspan fill="url(#lgt)">matix</tspan></text></g>`; }
const mark = (w, h) => logoSvg(w, h);
function frame(w, h, title, body, note) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" ${FONT}><rect width="${w}" height="${h}" fill="${C.bg}"/>`
    + `<text x="28" y="48" font-size="${w > 900 ? 24 : 21}" font-weight="800" fill="${C.ink}">${esc(title)}</text>${body}`
    + (note ? `<rect x="28" y="${h - 76}" width="${w - 56}" height="42" rx="10" fill="#fff" stroke="${C.line}"/>${lines(44, h - 50, wrap(note, Math.floor((w - 100) / 7.2)).slice(0, 1), 14, C.mute)}` : '') + mark(w, h) + '</svg>';
}
// o: {title, note, items:[{t, d, q}] (3-5), qLabel, w, h}
function cards(o) {
  const w = o.w || 760, h = o.h || 560, n = o.items.length, gap = 14, cw = (w - 56 - gap * (n - 1)) / n, top = 80, ch = Math.min(h - top - 100, 330);
  const cpl = Math.floor(cw / 7.4); let b = ''; const ch0 = ch;
  o.items.forEach((it, i) => {
    const x = 28 + i * (cw + gap), cx = x + cw / 2;
    b += `<rect x="${x}" y="${top}" width="${cw}" height="${ch}" rx="14" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>`
      + (it.big ? `<text x="${cx}" y="${top + 52}" font-size="34" font-weight="800" fill="${i % 2 ? C.amber : C.teal}" text-anchor="middle">${esc(it.big)}</text>` : `<circle cx="${cx}" cy="${top + 42}" r="22" fill="${i % 2 ? C.amber : C.teal}"/><text x="${cx}" y="${top + 49}" font-size="20" font-weight="800" fill="#fff" text-anchor="middle">${i + 1}</text>`)
      + lines(cx, top + 92, wrap(it.t, cpl - 2).slice(0, 2), 16, C.ink, 800, 'middle')
      + lines(cx, top + 92 + (wrap(it.t, cpl - 2).length > 1 ? 44 : 24), wrap(it.d, cpl).slice(0, 4), 13, C.mute, 400, 'middle', 18);
    if (it.q) b += `<rect x="${x + 10}" y="${top + ch - 112}" width="${cw - 20}" height="102" rx="10" fill="${C.tealBg}"/>`
      + `<text x="${cx}" y="${top + ch - 90}" font-size="11" font-weight="800" fill="${C.teal}" text-anchor="middle">${esc((o.qLabel || 'Example').toUpperCase())}</text>`
      + lines(cx, top + ch - 68, wrap(it.q, cpl - 2).slice(0, 4), 12.5, C.ink, 500, 'middle', 17);
  });
  return frame(w, h, o.title, b, o.note);
}
// o: {title, note, steps:[{t, s, c}] (3-5; c = caption under box)}; last step filled
function flow(o) {
  const w = o.w || 760, h = o.h || 560, n = o.steps.length, gap = 30, bw = (w - 56 - gap * (n - 1)) / n, y = 140, bh = 96, cpl = Math.floor(bw / 7.2); let b = '';
  o.steps.forEach((s, i) => {
    const x = 28 + i * (bw + gap), cx = x + bw / 2, last = i === n - 1;
    b += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="14" fill="${last ? C.teal : '#fff'}" stroke="${last ? C.teal : C.line}" stroke-width="2"/>`
      + lines(cx, y + 40, wrap(s.t, Math.floor(bw / 10)).slice(0, 2), 16, last ? '#fff' : C.ink, 800, 'middle', 19)
      + lines(cx, y + bh - 20, wrap(s.s || '', cpl + 2).slice(0, 1), 12.5, last ? '#E6F6F4' : C.mute, 400, 'middle')
      + lines(cx, y + bh + 44, wrap(s.c || '', cpl + 2).slice(0, 5), 13, C.mute, 400, 'middle', 18);
    if (!last) b += `<path d="M ${x + bw + 6} ${y + bh / 2} L ${x + bw + gap - 6} ${y + bh / 2}" stroke="${C.amber}" stroke-width="3" fill="none"/><path d="M ${x + bw + gap - 12} ${y + bh / 2 - 6} L ${x + bw + gap - 4} ${y + bh / 2} L ${x + bw + gap - 12} ${y + bh / 2 + 6} Z" fill="${C.amber}"/>`;
  });
  return frame(w, h, o.title, b, o.note);
}
// o: {title, note, rows:[{t, d, v (1-5), tag}], scaleLabels:[lo, hi]}
function scale(o) {
  const w = o.w || 760, h = o.h || 560, n = o.rows.length, top = 84, rh = Math.min(104, (h - top - 100) / n), lw = 210, segw = (w - 56 - lw - 90) / 5; let b = '';
  b += `<text x="${28 + lw}" y="${top - 4}" font-size="11" font-weight="800" fill="${C.mute}">${esc((o.scaleLabels || ['LOW', 'HIGH'])[0]).toUpperCase()}</text><text x="${28 + lw + segw * 5}" y="${top - 4}" font-size="11" font-weight="800" fill="${C.mute}" text-anchor="end">${esc((o.scaleLabels || ['LOW', 'HIGH'])[1]).toUpperCase()}</text>`;
  o.rows.forEach((r, i) => {
    const y = top + 8 + i * rh;
    b += `<rect x="28" y="${y}" width="${w - 56}" height="${rh - 8}" rx="10" fill="#fff" stroke="${C.line}"/>`
      + lines(44, y + 24, [r.t], 15, C.ink, 800) + lines(44, y + 44, wrap(r.d || '', 32).slice(0, 1), 12, C.mute);
    for (let k = 0; k < 5; k++) b += `<rect x="${28 + lw + k * segw + 2}" y="${y + 16}" height="${rh - 40}" width="${segw - 4}" rx="6" fill="${k < r.v ? (r.v >= 4 ? C.teal : r.v >= 3 ? C.amber : C.red) : C.line}"/>`;
    b += `<text x="${w - 40}" y="${y + rh / 2 + 3}" font-size="16" font-weight="800" fill="${C.ink}" text-anchor="end">${esc(r.tag || r.v + '/5')}</text>`;
  });
  return frame(w, h, o.title, b, o.note);
}
// o: {title, note, left:{h, items:[]}, right:{h, items:[]}}  left = bad/before (red), right = good/after (teal)
function compare(o) {
  const w = o.w || 760, h = o.h || 560, top = 84, colw = (w - 56 - 20) / 2, ch = h - top - 100; let b = '';
  [[o.left, 28, C.red, C.redBg, '✕'], [o.right, 28 + colw + 20, C.teal, C.tealBg, '✓']].forEach(([c, x, col, bg, sym]) => {
    b += `<rect x="${x}" y="${top}" width="${colw}" height="${ch}" rx="14" fill="#fff" stroke="${C.line}" stroke-width="1.5"/><rect x="${x}" y="${top}" width="${colw}" height="46" rx="14" fill="${bg}"/><rect x="${x}" y="${top + 30}" width="${colw}" height="16" fill="${bg}"/>`
      + `<text x="${x + 18}" y="${top + 30}" font-size="16" font-weight="800" fill="${col}">${esc(c.h)}</text>`;
    const step = Math.min(96, (ch - 62) / c.items.length);
    c.items.forEach((t, i) => { const y = top + 78 + i * step; b += `<circle cx="${x + 28}" cy="${y - 5}" r="11" fill="${bg}"/><text x="${x + 28}" y="${y}" font-size="13" font-weight="800" fill="${col}" text-anchor="middle">${sym}</text>` + lines(x + 50, y, wrap(t, Math.floor((colw - 66) / 7.2)).slice(0, 2), 14, C.ink, 500, 'start', 19); });
  });
  return frame(w, h, o.title, b, o.note);
}
const hero = (slug, svg) => fs.writeFileSync(path.join(img, `diagram-${slug}.svg`), svg);
// proof-image page for finish-assets (captured via body selector at 1280 wide)
const proofHtml = svg => `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;width:1280px;background:#FAF5EF}svg{display:block;width:1280px;height:auto}</style></head><body>${svg}</body></html>`;
module.exports = { logoSvg, cards, flow, scale, compare, hero, proofHtml };

// bars: o {title, note, rows:[{t, v, text, color}], max, limit (optional vertical marker value), limitLabel, w}  height is derived from the row count
function bars(o) {
  const w = o.w || 1200, n = o.rows.length, rh = 44, top = 84, h = top + n * rh + (o.note ? 110 : 40), lw = Math.round(w * 0.36), bw = w - 56 - lw - 150; let b = '';
  o.rows.forEach((r, i) => {
    const y = top + i * rh, len = Math.max(6, bw * r.v / o.max);
    b += `<rect x="28" y="${y}" width="${w - 56}" height="${rh - 6}" rx="9" fill="${i % 2 ? C.bg : '#fff'}" stroke="${C.line}"/>` + lines(42, y + 25, [r.t], 15, C.ink, 700)
      + `<rect x="${28 + lw}" y="${y + 9}" width="${len}" height="${rh - 24}" rx="6" fill="${r.color || C.teal}"/>` + lines(28 + lw + len + 10, y + 25, [r.text], 14, C.ink, 800);
  });
  if (o.limit) { const x = 28 + lw + bw * o.limit / o.max; b += `<line x1="${x}" y1="${top - 6}" x2="${x}" y2="${top + n * rh}" stroke="${C.red}" stroke-width="2" stroke-dasharray="5 4"/><text x="${x + 6}" y="${top - 10}" font-size="12" font-weight="800" fill="${C.red}">${esc(o.limitLabel || '')}</text>`; }
  return frame(w, h, o.title, b, o.note);
}
// pairs: before/after bars per row. o {title, note, rows:[{t, a, b, at, bt}], max, limit, limitLabel, labels:[before, after]}
function pairs(o) {
  const w = o.w || 1200, n = o.rows.length, rh = 66, top = 96, h = top + n * rh + (o.note ? 110 : 40), lw = Math.round(w * 0.3), bw = w - 56 - lw - 120; let b = '';
  b += `<rect x="${28 + lw}" y="62" width="14" height="14" rx="3" fill="${C.amber}"/><text x="${48 + lw}" y="74" font-size="13" fill="${C.mute}" font-weight="700">${esc((o.labels || ['Before', 'After'])[0])}</text><rect x="${150 + lw}" y="62" width="14" height="14" rx="3" fill="${C.teal}"/><text x="${170 + lw}" y="74" font-size="13" fill="${C.mute}" font-weight="700">${esc((o.labels || ['Before', 'After'])[1])}</text>`;
  o.rows.forEach((r, i) => {
    const y = top + i * rh, la = Math.max(4, bw * r.a / o.max), lb = Math.max(4, bw * r.b / o.max);
    b += `<rect x="28" y="${y}" width="${w - 56}" height="${rh - 6}" rx="9" fill="#fff" stroke="${C.line}"/>` + lines(42, y + 36, [r.t], 15, C.ink, 700)
      + `<rect x="${28 + lw}" y="${y + 9}" width="${la}" height="16" rx="5" fill="${C.amber}"/>` + lines(28 + lw + la + 8, y + 22, [r.at], 13, C.ink, 800)
      + `<rect x="${28 + lw}" y="${y + 31}" width="${lb}" height="16" rx="5" fill="${C.teal}"/>` + lines(28 + lw + lb + 8, y + 44, [r.bt], 13, C.ink, 800);
  });
  if (o.limit) { const x = 28 + lw + bw * o.limit / o.max; b += `<line x1="${x}" y1="${top - 4}" x2="${x}" y2="${top + n * rh - 6}" stroke="${C.red}" stroke-width="2" stroke-dasharray="5 4"/><text x="${x + 6}" y="${top + n * rh + 10}" font-size="12" font-weight="800" fill="${C.red}">${esc(o.limitLabel || '')}</text>`; }
  return frame(w, h, o.title, b, o.note);
}
module.exports.bars = bars; module.exports.pairs = pairs; module.exports._h = { C, esc, wrap, lines, frame };
