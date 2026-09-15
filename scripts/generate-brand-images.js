#!/usr/bin/env node
/**
 * One-time raster asset generation for the SEO audit:
 * - favicon.ico (real ICO container, PNG-compressed 32x32 frame)
 * - apple-touch-icon.png (180x180) + favicon-512.png (Organization schema logo/image — needs PNG/JPG, not SVG)
 * - og-default.png (1200x630 branded fallback share image for pages with no cover)
 * - a PNG copy of every blog-post cover SVG referenced in data/blog.json, same basename
 *   (BlogPosting schema + og:image need a raster format; social platforms won't render SVG)
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const IMAGES = path.join(ROOT, 'public', 'images');
const BLOG_IMAGES = path.join(IMAGES, 'blog');

function buildIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  const faviconSvg = path.join(IMAGES, 'favicon.svg');

  const png32 = await sharp(faviconSvg).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, 'public', 'favicon.ico'), buildIco(png32, 32));
  console.log('wrote public/favicon.ico');

  await sharp(faviconSvg).resize(180, 180).flatten({ color: '#FAF5EF' }).png()
    .toFile(path.join(IMAGES, 'apple-touch-icon.png'));
  console.log('wrote apple-touch-icon.png');

  await sharp(faviconSvg).resize(512, 512).png()
    .toFile(path.join(IMAGES, 'favicon-512.png'));
  console.log('wrote favicon-512.png');

  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#16192A"/>
    <circle cx="1080" cy="90" r="220" fill="#0EA5A0" opacity="0.18"/>
    <circle cx="90" cy="560" r="180" fill="#FBBF24" opacity="0.12"/>
    <g transform="translate(90,230)">
      <rect width="76" height="76" rx="18" fill="#FAF5EF"/>
      <path d="M 54.6 23.3 A 22 22 0 1 0 54.6 52.7" transform="translate(0,0)"
            fill="none" stroke="#0EA5A0" stroke-width="8.5" stroke-linecap="round"/>
      <line x1="54.6" y1="23.3" x2="38" y2="38" stroke="#C9BBA9" stroke-width="2.2"/>
      <line x1="54.6" y1="52.7" x2="38" y2="38" stroke="#C9BBA9" stroke-width="2.2"/>
      <circle cx="54.6" cy="23.3" r="6.2" fill="#FBBF24"/>
      <circle cx="54.6" cy="52.7" r="6.2" fill="#14B8A6"/>
      <circle cx="38" cy="38" r="4.1" fill="#16192A"/>
    </g>
    <text x="90" y="360" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#FAF5EF">Contomatix</text>
    <text x="90" y="415" font-family="Arial, sans-serif" font-size="30" fill="#C9BBA9">White-hat link building &amp; SEO</text>
  </svg>`;
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(IMAGES, 'og-default.png'));
  console.log('wrote og-default.png');

  const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'blog.json'), 'utf8'));
  const svgCovers = [...new Set(posts.filter(p => p.image && p.image.endsWith('.svg')).map(p => p.image))];
  console.log(`\nConverting ${svgCovers.length} unique blog cover SVGs to PNG...`);
  for (const imgPath of svgCovers) {
    const srcFile = path.join(ROOT, 'public', imgPath.replace(/^\//, ''));
    if (!fs.existsSync(srcFile)) { console.log('  MISSING', imgPath); continue; }
    const destFile = srcFile.replace(/\.svg$/, '.png');
    await sharp(srcFile).resize(1200, 630, { fit: 'contain', background: '#FAF5EF' }).png().toFile(destFile);
  }
  console.log('done converting covers');

  let changed = 0;
  posts.forEach(p => {
    if (p.image && p.image.endsWith('.svg')) { p.image = p.image.replace(/\.svg$/, '.png'); changed++; }
  });
  fs.writeFileSync(path.join(ROOT, 'data', 'blog.json'), JSON.stringify(posts, null, 2));
  console.log(`updated ${changed} post image references in data/blog.json`);
}

main().catch(err => { console.error(err); process.exit(1); });
