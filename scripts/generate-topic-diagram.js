#!/usr/bin/env node
/**
 * Generates a "topic wheel" hero diagram for a blog post: a central topic
 * label with a colored arc and short pill labels branching off to the side
 * for each main section — the style referenced from a competitor's blog
 * hero (never named in any published content), reskinned to Contomatix's
 * own brand colors and mark. Used only for posts that opt in via a
 * `heroDiagram` field in data/blog.json — existing posts are untouched.
 *
 * Usage: node scripts/generate-topic-diagram.js <output-path> '<topic>' '<label1>' '<label2>' ...
 * Or require() it directly: buildTopicDiagramSvg({ topic, sections })
 */
const fs = require('fs');
const path = require('path');

const PALETTE = ['#0EA5A0', '#14B8A6', '#FBBF24', '#F5A623', '#5EEAD4'];

function buildTopicDiagramSvg({ topic, sections }) {
  const W = 700, H = 620;
  const cx = 170, cy = H / 2;
  const rArc = 150;
  const pillW = 400, pillH = 64, pillGap = 20;
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

  let pills = '';
  let connectors = '';
  sections.forEach((label, i) => {
    const py = startY + i * (pillH + pillGap);
    const color = PALETTE[i % PALETTE.length];
    const deg = arcStartDeg + (arcSpan / (sections.length - 1 || 1)) * i;
    const [dotX, dotY] = toXY(deg, rArc);
    const [tickX, tickY] = toXY(deg, rArc + 26);

    connectors += `
      <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="5" fill="${color}"/>
      <line x1="${dotX.toFixed(1)}" y1="${dotY.toFixed(1)}" x2="${tickX.toFixed(1)}" y2="${tickY.toFixed(1)}" stroke="${color}" stroke-width="2"/>
      <line x1="${tickX.toFixed(1)}" y1="${tickY.toFixed(1)}" x2="${pillX}" y2="${(py).toFixed(1)}" stroke="${color}" stroke-width="1.5" stroke-dasharray="3 4" opacity="0.6"/>
    `;

    pills += `
      <g>
        <rect x="${pillX}" y="${(py - pillH / 2).toFixed(1)}" width="${pillW}" height="${pillH}" rx="${pillH / 2}" fill="${color}"/>
        <circle cx="${pillX + 38}" cy="${py.toFixed(1)}" r="20" fill="#FAF5EF"/>
        <path d="M ${pillX + 30} ${py.toFixed(1)} l 5 5 l 10 -11" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="${pillX + 70}" y="${(py + 7).toFixed(1)}" font-family="Arial, sans-serif" font-size="21" font-weight="700" fill="#16192A">${escapeXml(label)}</text>
      </g>
    `;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FAF5EF"/>
  <circle cx="${cx}" cy="${cy}" r="${rArc + 40}" fill="#F3ECE1" opacity="0.5"/>
  <path d="M ${ax1.toFixed(1)} ${ay1.toFixed(1)} A ${rArc} ${rArc} 0 ${largeArc} 1 ${ax2.toFixed(1)} ${ay2.toFixed(1)}"
        fill="none" stroke="#5EEAD4" stroke-width="14" stroke-linecap="round" opacity="0.85"/>
  <path d="M ${ax1.toFixed(1)} ${ay1.toFixed(1)} A ${rArc} ${rArc} 0 0 1 ${cx} ${cy - rArc}"
        fill="none" stroke="#0B807C" stroke-width="14" stroke-linecap="round"/>
  ${connectors}
  <text x="${cx}" y="${cy - 34}" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-style="italic" font-weight="700" fill="#8A8371">WHAT IS</text>
  <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${centerFontSize(topic)}" font-weight="800" fill="#16192A">${wrapCenterText(topic)}</text>
  <g transform="translate(${cx - 60}, ${cy + 46})">
    <rect width="120" height="30" rx="8" fill="#FFFFFF" stroke="#EAE0D2"/>
    <circle cx="18" cy="15" r="9" fill="none" stroke="#0EA5A0" stroke-width="3"/>
    <circle cx="18" cy="15" r="3" fill="#FBBF24"/>
    <text x="34" y="20" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#16192A">Contomatix</text>
  </g>
  ${pills}
</svg>`;
}

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Greedily wraps a topic phrase to fit a ~230px-wide circle, picking the
// largest font size (down to a floor) that fits within 3 lines.
const MAX_WIDTH = 190;
function wrapLines(words, fontSize) {
  const maxChars = MAX_WIDTH / (0.72 * fontSize);
  const lines = [];
  let current = '';
  words.forEach(w => {
    const candidate = current ? current + ' ' + w : w;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = w;
    } else {
      current = candidate;
    }
  });
  if (current) lines.push(current);
  return lines;
}
function centerFontSize(topic) {
  const words = String(topic).toUpperCase().split(' ');
  for (let size = 22; size >= 13; size -= 1) {
    if (wrapLines(words, size).length <= 3) return size;
  }
  return 15;
}
function wrapCenterText(topic) {
  const words = String(topic).toUpperCase().split(' ');
  const size = centerFontSize(topic);
  const lines = wrapLines(words, size);
  const lineHeight = size * 1.15;
  return lines.map((line, i) => `<tspan x="170"${i > 0 ? ` dy="${lineHeight.toFixed(0)}"` : ''}>${escapeXml(line)}</tspan>`).join('');
}

if (require.main === module) {
  const [, , outPath, topic, ...sections] = process.argv;
  if (!outPath || !topic || sections.length < 2) {
    console.error("Usage: node generate-topic-diagram.js <output.svg> '<topic>' '<label1>' '<label2>' ...");
    process.exit(1);
  }
  const svg = buildTopicDiagramSvg({ topic, sections });
  fs.writeFileSync(outPath, svg);
  console.log('wrote', outPath);
}

module.exports = { buildTopicDiagramSvg };
