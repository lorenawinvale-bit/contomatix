#!/usr/bin/env node
/**
 * Generates a blog post hero diagram: a short topic label plus short labels
 * for each main section, in one of three distinct visual styles so posts
 * don't all look like copies of each other — the general concept (a topic
 * overview graphic) was referenced from a competitor's blog hero (never
 * named in any published content), reskinned to Contomatix's own brand
 * colors and mark. Used only for posts that opt in via a `heroDiagram`
 * field in data/blog.json — existing posts are untouched.
 *
 * Usage: node scripts/generate-topic-diagram.js <output-path> <style> '<topic>' '<label1>' '<label2>' ...
 *   style: wheel | timeline | ring
 * Or require() it directly: buildTopicDiagramSvg({ style, topic, sections })
 */
const fs = require('fs');

const PALETTE = ['#0EA5A0', '#14B8A6', '#FBBF24', '#F5A623', '#5EEAD4'];

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function brandMark(x, y) {
  return `<g transform="translate(${x}, ${y})">
    <rect width="120" height="30" rx="8" fill="#FFFFFF" stroke="#EAE0D2"/>
    <circle cx="18" cy="15" r="9" fill="none" stroke="#0EA5A0" stroke-width="3"/>
    <circle cx="18" cy="15" r="3" fill="#FBBF24"/>
    <text x="34" y="20" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#16192A">Contomatix</text>
  </g>`;
}

// Truncates a single-line label to fit a pixel width at a given font size,
// adding an ellipsis — a safety net for real post headings that run longer
// than the short hand-picked demo labels the layouts were tuned against.
function truncateToFit(text, maxWidth, fontSize, charWidthFactor) {
  charWidthFactor = charWidthFactor || 0.58;
  const maxChars = Math.floor(maxWidth / (charWidthFactor * fontSize));
  const s = String(text);
  if (s.length <= maxChars) return s;
  const cut = s.slice(0, Math.max(1, maxChars - 1));
  // Always break on a whole word — "Build Local…" reads fine, "Build Local
  // Sponso…" (mid-word) reads as broken. Falls back to the raw cut only if
  // there's no space at all (a single very long word).
  const lastSpace = cut.lastIndexOf(' ');
  const wordSafe = lastSpace > Math.floor(maxChars * 0.4) ? cut.slice(0, lastSpace) : cut;
  return wordSafe.trimEnd() + '…';
}

// Wraps a section label into up to 2 lines at a given font size (word-
// boundary safe via the same greedy logic as wrapToFit), then ellipsis-
// truncates only the second line if a genuinely long heading still doesn't
// fit — real post H2s run much longer than short hand-picked demo labels,
// so 2 lines handles the vast majority without needing to shrink meaning
// down to 2-3 words.
function wrapLabelLines(text, maxWidth, fontSize, charWidthFactor) {
  // wrapToFit upper-cases internally (built for the center-circle use case);
  // section labels should keep their original casing, so wrap manually here.
  const words = String(text).split(' ');
  const maxChars = maxWidth / ((charWidthFactor || 0.72) * fontSize);
  const wrapped = [];
  let current = '';
  words.forEach(w => {
    const candidate = current ? current + ' ' + w : w;
    if (candidate.length > maxChars && current) { wrapped.push(current); current = w; }
    else current = candidate;
  });
  if (current) wrapped.push(current);
  if (wrapped.length <= 2) return wrapped;
  return [wrapped[0], truncateToFit(wrapped.slice(1).join(' '), maxWidth, fontSize, charWidthFactor)];
}

// Greedily wraps text to fit a given pixel width, picking the largest font
// size (within a range) that keeps the result to maxLines.
function wrapToFit(text, { maxWidth, maxSize, minSize, maxLines, charWidthFactor }) {
  charWidthFactor = charWidthFactor || 0.72;
  const words = String(text).toUpperCase().split(' ');
  function linesAt(size) {
    const maxChars = maxWidth / (charWidthFactor * size);
    const lines = [];
    let current = '';
    words.forEach(w => {
      const candidate = current ? current + ' ' + w : w;
      if (candidate.length > maxChars && current) { lines.push(current); current = w; }
      else current = candidate;
    });
    if (current) lines.push(current);
    return lines;
  }
  for (let size = maxSize; size >= minSize; size -= 1) {
    const lines = linesAt(size);
    if (lines.length <= maxLines) return { size, lines };
  }
  return { size: minSize, lines: linesAt(minSize) };
}

// ---------- Style 1: radial wheel (arc + pills branching right) ----------
function buildWheelSvg({ topic, sections }) {
  const W = 700, H = 620;
  const cx = 170, cy = H / 2;
  const rArc = 150;
  const pillW = 400, pillH = 74, pillGap = 20;
  const totalPillsHeight = sections.length * pillH + (sections.length - 1) * pillGap;
  const startY = cy - totalPillsHeight / 2 + pillH / 2;
  const pillX = 260;

  const arcSpan = Math.min(220, sections.length * 40 + 40);
  const arcStartDeg = -arcSpan / 2 - 90;
  const arcEndDeg = arcSpan / 2 - 90;
  const toXY = (deg, r) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [ax1, ay1] = toXY(arcStartDeg, rArc);
  const [ax2, ay2] = toXY(arcEndDeg, rArc);
  const largeArc = arcSpan > 180 ? 1 : 0;

  let pills = '', connectors = '';
  sections.forEach((label, i) => {
    const py = startY + i * (pillH + pillGap);
    const color = PALETTE[i % PALETTE.length];
    const deg = arcStartDeg + (arcSpan / (sections.length - 1 || 1)) * i;
    const [dotX, dotY] = toXY(deg, rArc);
    const [tickX, tickY] = toXY(deg, rArc + 26);
    connectors += `
      <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="5" fill="${color}"/>
      <line x1="${dotX.toFixed(1)}" y1="${dotY.toFixed(1)}" x2="${tickX.toFixed(1)}" y2="${tickY.toFixed(1)}" stroke="${color}" stroke-width="2"/>
      <line x1="${tickX.toFixed(1)}" y1="${tickY.toFixed(1)}" x2="${pillX}" y2="${py.toFixed(1)}" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.6"/>
    `;
    const wheelLabelLines = wrapLabelLines(label, pillW - 90, 20);
    const wheelLineHeight = 23;
    const wheelTextStartY = py + 7 - ((wheelLabelLines.length - 1) * wheelLineHeight) / 2;
    const wheelLabelTspans = wheelLabelLines.map((l, li) => `<tspan x="${pillX + 70}"${li > 0 ? ` dy="${wheelLineHeight}"` : ''}>${escapeXml(l)}</tspan>`).join('');

    pills += `
      <g>
        <rect x="${pillX}" y="${(py - pillH / 2).toFixed(1)}" width="${pillW}" height="${pillH}" rx="30" fill="${color}"/>
        <circle cx="${pillX + 38}" cy="${py.toFixed(1)}" r="20" fill="#FAF5EF"/>
        <path d="M ${pillX + 30} ${py.toFixed(1)} l 5 5 l 10 -11" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="${pillX + 70}" y="${wheelTextStartY.toFixed(1)}" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#16192A">${wheelLabelTspans}</text>
      </g>
    `;
  });

  const { size, lines } = wrapToFit(topic, { maxWidth: 190, maxSize: 22, minSize: 13, maxLines: 3 });
  const lineHeight = size * 1.15;
  const centerText = lines.map((l, i) => `<tspan x="${cx}"${i > 0 ? ` dy="${lineHeight.toFixed(0)}"` : ''}>${escapeXml(l)}</tspan>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FAF5EF"/>
  <circle cx="${cx}" cy="${cy}" r="${rArc + 40}" fill="#F3ECE1" opacity="0.5"/>
  <path d="M ${ax1.toFixed(1)} ${ay1.toFixed(1)} A ${rArc} ${rArc} 0 ${largeArc} 1 ${ax2.toFixed(1)} ${ay2.toFixed(1)}"
        fill="none" stroke="#5EEAD4" stroke-width="14" stroke-linecap="round" opacity="0.85"/>
  <path d="M ${ax1.toFixed(1)} ${ay1.toFixed(1)} A ${rArc} ${rArc} 0 0 1 ${cx} ${cy - rArc}"
        fill="none" stroke="#0B807C" stroke-width="14" stroke-linecap="round"/>
  ${connectors}
  <text x="${cx}" y="${cy - 34}" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-style="italic" font-weight="700" fill="#8A8371">WHAT IS</text>
  <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" font-weight="800" fill="#16192A">${centerText}</text>
  ${brandMark(cx - 60, cy + 46)}
  ${pills}
</svg>`;
}

// ---------- Style 2: vertical timeline (alternating left/right cards) ----------
function buildTimelineSvg({ topic, sections }) {
  const W = 620;
  const rowH = 108;
  const lineX = W / 2;
  const cardW = 260;
  const badgeR = 24;

  const { size: titleSize, lines: titleLines } = wrapToFit(topic, { maxWidth: 460, maxSize: 26, minSize: 16, maxLines: 2 });
  const titleLineHeight = titleSize * 1.2;
  const titleText = titleLines.map((l, i) => `<tspan x="${lineX}"${i > 0 ? ` dy="${titleLineHeight.toFixed(0)}"` : ''}>${escapeXml(l)}</tspan>`).join('');
  const titleFirstBaseline = 70 + titleSize;
  const titleLastBaseline = titleFirstBaseline + (titleLines.length - 1) * titleLineHeight;
  const brandMarkY = titleLastBaseline + 20;
  const topPad = brandMarkY + 30 + 40;
  const H = topPad + sections.length * rowH + 40;

  let rows = '';
  sections.forEach((label, i) => {
    const cy = topPad + i * rowH + rowH / 2;
    const color = PALETTE[i % PALETTE.length];
    const onLeft = i % 2 === 0;
    const cardX = onLeft ? lineX - 40 - cardW : lineX + 40;
    const stubX2 = onLeft ? lineX - 40 : lineX + 40;
    const stubX1 = onLeft ? lineX - badgeR : lineX + badgeR;
    const textAnchor = onLeft ? 'end' : 'start';
    const textX = onLeft ? cardX + cardW - 20 : cardX + 20;

    const labelLines = wrapLabelLines(label, cardW - 40, 18);
    const lineHeight = 21;
    const textStartY = cy + 6 - ((labelLines.length - 1) * lineHeight) / 2;
    const labelTspans = labelLines.map((l, li) => `<tspan x="${textX}"${li > 0 ? ` dy="${lineHeight}"` : ''}>${escapeXml(l)}</tspan>`).join('');

    rows += `
      <line x1="${stubX1}" y1="${cy}" x2="${stubX2}" y2="${cy}" stroke="${color}" stroke-width="3"/>
      <rect x="${cardX}" y="${(cy - 30).toFixed(1)}" width="${cardW}" height="60" rx="14" fill="#FFFFFF" stroke="${color}" stroke-width="2"/>
      <text x="${textX}" y="${textStartY.toFixed(1)}" text-anchor="${textAnchor}" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#16192A">${labelTspans}</text>
      <circle cx="${lineX}" cy="${cy}" r="${badgeR}" fill="${color}"/>
      <text x="${lineX}" y="${(cy + 6).toFixed(1)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#FAF5EF">${i + 1}</text>
    `;
  });

  const lineTop = topPad - 10;
  const lineBottom = topPad + sections.length * rowH - rowH / 2 + 10;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FAF5EF"/>
  <text x="${lineX}" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-style="italic" font-weight="700" fill="#8A8371">A QUICK OVERVIEW OF</text>
  <text x="${lineX}" y="${titleFirstBaseline.toFixed(0)}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="800" fill="#16192A">${titleText}</text>
  ${brandMark(lineX - 60, brandMarkY)}
  <line x1="${lineX}" y1="${lineTop}" x2="${lineX}" y2="${lineBottom}" stroke="#D6C5AA" stroke-width="3" stroke-dasharray="2 6"/>
  ${rows}
</svg>`;
}

// ---------- Style 3: full ring / donut with two-sided callouts ----------
function buildRingSvg({ topic, sections }) {
  const W = 760, H = 560;
  const cx = W / 2, cy = H / 2;
  const rOuter = 130, rInner = 86;
  const n = sections.length;
  const gapDeg = 4;
  const segDeg = 360 / n - gapDeg;

  function arcPath(startDeg, endDeg, r1, r2) {
    const toXY = (deg, r) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
    };
    const large = endDeg - startDeg > 180 ? 1 : 0;
    const [x1, y1] = toXY(startDeg, r2);
    const [x2, y2] = toXY(endDeg, r2);
    const [x3, y3] = toXY(endDeg, r1);
    const [x4, y4] = toXY(startDeg, r1);
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r2} ${r2} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} A ${r1} ${r1} 0 ${large} 0 ${x4.toFixed(1)} ${y4.toFixed(1)} Z`;
  }
  const midXY = (deg, r) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  let segments = '', callouts = '';
  sections.forEach((label, i) => {
    const start = i * (segDeg + gapDeg);
    const end = start + segDeg;
    const mid = (start + end) / 2;
    const color = PALETTE[i % PALETTE.length];
    segments += `<path d="${arcPath(start, end, rInner, rOuter)}" fill="${color}"/>`;

    const [dotX, dotY] = midXY(mid, rOuter + 4);
    const onRight = Math.cos(((mid - 90) * Math.PI) / 180) >= 0;
    const labelR = rOuter + 70;
    const [labelAnchorX] = midXY(mid, labelR);
    const boxW = 215, boxH = 54;
    const boxX = onRight ? Math.min(labelAnchorX, W - boxW - 10) : Math.max(10, labelAnchorX - boxW);
    const [midX, midY] = midXY(mid, labelR);
    const boxY = Math.min(Math.max(midY - boxH / 2, 10), H - boxH - 10);

    const ringLabelLines = wrapLabelLines(label, boxW - 50, 13);
    const ringLineHeight = 15;
    const ringTextStartY = boxY + boxH / 2 + 5 - ((ringLabelLines.length - 1) * ringLineHeight) / 2;
    const ringLabelTspans = ringLabelLines.map((l, li) => `<tspan x="${(boxX + 40).toFixed(1)}"${li > 0 ? ` dy="${ringLineHeight}"` : ''}>${escapeXml(l)}</tspan>`).join('');

    callouts += `
      <line x1="${dotX.toFixed(1)}" y1="${dotY.toFixed(1)}" x2="${(onRight ? boxX : boxX + boxW).toFixed(1)}" y2="${(boxY + boxH / 2).toFixed(1)}" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.7"/>
      <rect x="${boxX.toFixed(1)}" y="${boxY.toFixed(1)}" width="${boxW}" height="${boxH}" rx="10" fill="#FFFFFF" stroke="${color}" stroke-width="2"/>
      <circle cx="${(boxX + 22).toFixed(1)}" cy="${(boxY + boxH / 2).toFixed(1)}" r="8" fill="${color}"/>
      <text x="${(boxX + 40).toFixed(1)}" y="${ringTextStartY.toFixed(1)}" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#16192A">${ringLabelTspans}</text>
    `;
  });

  const { size, lines } = wrapToFit(topic, { maxWidth: rInner * 1.7, maxSize: 20, minSize: 12, maxLines: 3 });
  const lineHeight = size * 1.15;
  const centerText = lines.map((l, i) => `<tspan x="${cx}"${i > 0 ? ` dy="${lineHeight.toFixed(0)}"` : ''}>${escapeXml(l)}</tspan>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FAF5EF"/>
  ${segments}
  <circle cx="${cx}" cy="${cy}" r="${rInner - 6}" fill="#FAF5EF"/>
  <text x="${cx}" y="${cy - lineHeight * (lines.length - 1) / 2 - 6}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-style="italic" font-weight="700" fill="#8A8371">OVERVIEW</text>
  <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" font-weight="800" fill="#16192A">${centerText}</text>
  ${callouts}
</svg>`;
}

function buildTopicDiagramSvg({ style, topic, sections }) {
  if (style === 'timeline') return buildTimelineSvg({ topic, sections });
  if (style === 'ring') return buildRingSvg({ topic, sections });
  return buildWheelSvg({ topic, sections });
}

if (require.main === module) {
  const [, , outPath, style, topic, ...sections] = process.argv;
  if (!outPath || !['wheel', 'timeline', 'ring'].includes(style) || !topic || sections.length < 2) {
    console.error("Usage: node generate-topic-diagram.js <output.svg> <wheel|timeline|ring> '<topic>' '<label1>' '<label2>' ...");
    process.exit(1);
  }
  fs.writeFileSync(outPath, buildTopicDiagramSvg({ style, topic, sections }));
  console.log('wrote', outPath);
}

module.exports = { buildTopicDiagramSvg, buildWheelSvg, buildTimelineSvg, buildRingSvg };
