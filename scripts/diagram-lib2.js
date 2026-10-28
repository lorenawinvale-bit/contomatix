// More concept-diagram layouts (stats tiles, columns, dots, timeline, rings, split, ruler, lollipop). Merged into diagram-lib exports.
const D = require('./diagram-lib.js');
const { C, esc, wrap, lines, frame } = D._h;

function stats(o) {
  const w = o.w || 1200, cols = o.cols || 4, n = o.items.length, rows = Math.ceil(n / cols), gap = 14, tw = (w - 56 - gap * (cols - 1)) / cols, th = 112, top = 84, h = top + rows * (th + gap) + (o.note ? 100 : 30); let b = '';
  o.items.forEach((it, i) => {
    const x = 28 + (i % cols) * (tw + gap), y = top + Math.floor(i / cols) * (th + gap);
    b += `<rect x="${x}" y="${y}" width="${tw}" height="${th}" rx="14" fill="#fff" stroke="${C.line}" stroke-width="1.5"/><rect x="${x}" y="${y + 16}" width="5" height="40" rx="2" fill="${it.color || C.teal}"/>`
      + `<text x="${x + 20}" y="${y + 50}" font-size="34" font-weight="800" fill="${it.color || C.teal}">${esc(it.big)}</text>` + lines(x + 20, y + 78, wrap(it.t, Math.floor((tw - 30) / 7.2)).slice(0, 2), 13.5, C.ink, 600, 'start', 18);
  });
  return frame(w, h, o.title, b, o.note);
}
function columns(o) {
  const w = o.w || 1200, h = o.h || 560, n = o.items.length, top = 96, base = h - (o.note ? 200 : 140), cw = (w - 56) / n, bw = Math.min(54, cw - 18); let b = `<line x1="28" y1="${base}" x2="${w - 28}" y2="${base}" stroke="${C.line}" stroke-width="2"/>`;
  o.items.forEach((it, i) => {
    const cx = 28 + cw * i + cw / 2, bh = Math.max(5, (base - top - 24) * it.v / o.max);
    b += `<rect x="${cx - bw / 2}" y="${base - bh}" width="${bw}" height="${bh}" rx="7" fill="${it.color || C.teal}"/><text x="${cx}" y="${base - bh - 8}" font-size="15" font-weight="800" fill="${C.ink}" text-anchor="middle">${esc(it.text)}</text>`
      + lines(cx, base + 22, wrap(it.t, Math.floor(cw / 7.4)).slice(0, 4), 12.5, C.mute, 600, 'middle', 16);
  });
  return frame(w, h, o.title, b, o.note);
}
function dots(o) {
  const w = o.w || 1200, n = o.rows.length, rh = 46, top = 84, h = top + n * rh + (o.note ? 110 : 40), lw = Math.round(w * 0.42); let b = '';
  o.rows.forEach((r, i) => {
    const y = top + i * rh;
    b += lines(28, y + 28, [r.t], 15, C.ink, 700);
    for (let k = 0; k < r.max; k++) b += `<circle cx="${28 + lw + k * 38 + 14}" cy="${y + 22}" r="13" fill="${k < r.v ? (r.v === r.max ? C.teal : C.amber) : '#fff'}" stroke="${k < r.v ? 'none' : C.line}" stroke-width="2"/>`;
    b += lines(28 + lw + r.max * 38 + 14, y + 28, [r.text], 15, C.ink, 800) + `<line x1="28" y1="${y + rh - 3}" x2="${w - 28}" y2="${y + rh - 3}" stroke="${C.line}"/>`;
  });
  return frame(w, h, o.title, b, o.note);
}
function timeline(o) {
  const w = o.w || 1200, n = o.items.length, rh = 92, top = 90, h = top + n * rh + (o.note ? 100 : 30); let b = `<line x1="150" y1="${top + 10}" x2="150" y2="${top + (n - 1) * rh + 30}" stroke="${C.line}" stroke-width="4"/>`;
  o.items.forEach((it, i) => {
    const y = top + i * rh, last = i === n - 1;
    b += lines(28, y + 30, [it.d], 17, C.ink, 800) + `<circle cx="150" cy="${y + 24}" r="12" fill="${last ? C.teal : C.amber}" stroke="#fff" stroke-width="3"/>`
      + `<rect x="190" y="${y}" width="${w - 218}" height="${rh - 14}" rx="12" fill="#fff" stroke="${C.line}"/>` + lines(208, y + 28, [it.t], 16, C.ink, 800) + lines(208, y + 52, wrap(it.c, Math.floor((w - 250) / 7.2)).slice(0, 1), 13.5, C.mute);
  });
  return frame(w, h, o.title, b, o.note);
}
function rings(o) {
  const w = o.w || 760, h = o.h || 560, n = o.items.length, cw = (w - 56) / n, R = Math.min(78, cw / 2 - 16), cy = 220; let b = '';
  o.items.forEach((it, i) => {
    const cx = 28 + cw * i + cw / 2, f = Math.min(1, it.pct), a = f * 2 * Math.PI - Math.PI / 2, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    b += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.line}" stroke-width="16"/>`
      + (f >= 0.999 ? `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${it.color || C.teal}" stroke-width="16"/>` : `<path d="M ${cx} ${cy - R} A ${R} ${R} 0 ${f > 0.5 ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)}" fill="none" stroke="${it.color || C.teal}" stroke-width="16" stroke-linecap="round"/>`)
      + `<text x="${cx}" y="${cy + 10}" font-size="${n > 2 ? 26 : 30}" font-weight="800" fill="${C.ink}" text-anchor="middle">${esc(it.big)}</text>`
      + lines(cx, cy + R + 44, wrap(it.t, Math.floor(cw / 9)).slice(0, 2), 16, C.ink, 800, 'middle', 20) + lines(cx, cy + R + 90, wrap(it.c || '', Math.floor(cw / 7.4)).slice(0, 3), 13, C.mute, 400, 'middle', 18);
  });
  return frame(w, h, o.title, b, o.note);
}
// split: dark hero panel on the left, list of facts on the right. o {title, note, big, bigLabel, items:[{v, t}], w, h}
function split(o) {
  const w = o.w || 1200, h = o.h || 470, top = 80, ph = h - top - 100, pw = w * 0.34; let b = `<rect x="28" y="${top}" width="${pw}" height="${ph}" rx="16" fill="${C.navy}"/>`
    + `<text x="${28 + pw / 2}" y="${top + ph / 2 - 6}" font-size="72" font-weight="800" fill="#fff" text-anchor="middle">${esc(o.big)}</text>`
    + lines(28 + pw / 2, top + ph / 2 + 34, wrap(o.bigLabel, 28).slice(0, 3), 17, '#C9D3E6', 600, 'middle', 24);
  const n = o.items.length, rh = ph / n, x0 = 28 + pw + 22;
  o.items.forEach((it, i) => {
    const y = top + i * rh;
    b += `<rect x="${x0}" y="${y + 3}" width="${w - 28 - x0}" height="${rh - 8}" rx="12" fill="#fff" stroke="${C.line}"/><text x="${x0 + 20}" y="${y + rh / 2 + 9}" font-size="26" font-weight="800" fill="${i % 2 ? C.amber : C.teal}">${esc(it.v)}</text>` + lines(x0 + 150, y + rh / 2 + 7, [it.t], 16, C.ink, 600);
  });
  return frame(w, h, o.title, b, o.note);
}
// ruler: schematic track per metric with the Good zone marked (not to scale). o {title, note, rows:[{t, sub, text}], w}
function ruler(o) {
  const w = o.w || 1200, n = o.rows.length, rh = 108, top = 90, h = top + n * rh + (o.note ? 100 : 30), tx = 330, tw = w - tx - 60; let b = '';
  o.rows.forEach((r, i) => {
    const y = top + i * rh;
    b += lines(28, y + 36, [r.t], 26, C.ink, 800) + lines(28, y + 62, [r.sub], 14, C.mute) + `<rect x="${tx}" y="${y + 22}" width="${tw}" height="30" rx="15" fill="${C.line}"/><rect x="${tx}" y="${y + 22}" width="${tw * 0.45}" height="30" rx="15" fill="${C.teal}"/>`
      + `<line x1="${tx + tw * 0.45}" y1="${y + 12}" x2="${tx + tw * 0.45}" y2="${y + 62}" stroke="${C.ink}" stroke-width="3"/>` + lines(tx + tw * 0.45 + 10, y + 82, [r.text], 16, C.ink, 800)
      + lines(tx + 14, y + 43, ['Good'], 13, '#fff', 800) + lines(tx + tw * 0.45 + 14, y + 43, ['Above this needs work'], 12.5, C.mute, 600);
  });
  return frame(w, h, o.title, b, o.note);
}
// lollipop: thin line + dot per row with an optional limit marker. o {title, note, rows:[{t, v, text, color}], max, limit, limitLabel, w}
function lollipop(o) {
  const w = o.w || 1200, n = o.rows.length, rh = 44, top = 90, h = top + n * rh + (o.note ? 110 : 40), lw = Math.round(w * 0.3), bw = w - 56 - lw - 260; let b = '';
  if (o.limit) { const x = 28 + lw + bw * o.limit / o.max; b += `<line x1="${x}" y1="${top - 8}" x2="${x}" y2="${top + n * rh}" stroke="${C.red}" stroke-width="2" stroke-dasharray="5 4"/><text x="${x + 6}" y="${top - 12}" font-size="12" font-weight="800" fill="${C.red}">${esc(o.limitLabel || '')}</text>`; }
  o.rows.forEach((r, i) => {
    const y = top + i * rh, x = 28 + lw + Math.max(2, bw * r.v / o.max);
    b += lines(28, y + 26, [r.t], 14.5, C.ink, 700) + `<line x1="${28 + lw}" y1="${y + 22}" x2="${x}" y2="${y + 22}" stroke="${C.line}" stroke-width="3"/><circle cx="${x}" cy="${y + 22}" r="9" fill="${r.color || C.teal}"/>` + `<text x="${x + 18}" y="${y + 27}" font-size="13.5" font-weight="700" fill="${C.ink}" stroke="${C.bg}" stroke-width="5" paint-order="stroke">${esc(r.text)}</text>`;
  });
  return frame(w, h, o.title, b, o.note);
}
Object.assign(D, { stats, columns, dots, timeline, rings, split, ruler, lollipop });
module.exports = D;
