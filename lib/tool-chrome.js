// Shared page furniture for the free tool pages, applied to the rendered HTML so every tool gets it:
// breadcrumb, sister-tool tabs, a title bar on the workspace, a service prompt, related tool cards
// and an "On this page" list beside the guide.
const tools = require('../data/tools');
const { categoryOf } = require('../data/tool-categories');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().replace(/&[a-z]+;/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const bySlug = (s) => tools.find((t) => t.slug === s);
const icon = (c, size) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${c.icon}</svg>`;

// Up to n tools from the same category, starting after the current one so every page links to a different set.
function sisters(slug, cat, n) {
  const list = cat.slugs.filter(bySlug);
  const at = list.indexOf(slug);
  return list.slice(at + 1).concat(list.slice(0, Math.max(at, 0))).slice(0, n).map(bySlug);
}

module.exports = function toolChrome(body, path) {
  const slug = String(path || '').replace(/\/+$/, '').split('/').pop();
  const tool = bySlug(slug);
  if (!tool) return body;
  const name = esc(tool.title);
  const cat = categoryOf(slug);
  const near = sisters(slug, cat, 4);
  const style = `style="--c:${cat.c};--bg:${cat.bg}"`;
  let html = body;

  const crumb = `<nav class="tx-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/tools">Free tools</a><span>/</span><b>${name}</b></nav>`;
  html = html.replace(/<span class="eyebrow">Free [Tt]ool<\/span>/, () => crumb);

  const tabs = near.length ? `<nav class="tx-tabs" aria-label="${esc(cat.name)} tools" ${style}><a class="a" href="/tools/${slug}" aria-current="page">${name}</a>${near.slice(0, 3).map((t) => `<a href="/tools/${t.slug}">${esc(t.title)}</a>`).join('')}<a class="all" href="/tools">All ${tools.length} tools &rarr;</a></nav>` : '';
  html = html.replace(/(<div class="container page-hero-inner">[\s\S]*?<\/p>)/, (m) => `${m}\n    ${tabs}`);

  html = html.replace('<div class="container contact-grid llms-tool-grid">', () => `<div class="container contact-grid llms-tool-grid"><div class="tw-bar" aria-hidden="true"><i></i><i></i><i></i><span>${name}</span><em>Free, no signup</em></div>`);

  // service prompt straight after the workspace
  const prompt = `<aside class="container tx-help"><span class="tx-help-ic">${icon(cat, 22)}</span><div><strong>Need this done for you?</strong><p>The tool is free to use. If you would rather hand the work over, our team does it by hand and shows you what changed.</p></div><a class="btn btn-primary" href="/contact">Get a free audit &rarr;</a></aside>`;
  html = html.replace(/(<section[^>]*>\s*<div class="container contact-grid llms-tool-grid">[\s\S]*?<\/section>)/, (m) => `${m}\n<section class="tx-help-sec">${prompt}</section>`);

  const used = new Set();
  html = html.replace(/<div class="container llms-explainer">([\s\S]*?)<\/section>/g, (whole, inner) => {
    const items = [];
    const withIds = inner.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (h, attrs, text) => {
      const label = text.replace(/<[^>]+>/g, '').trim();
      const found = attrs.match(/\sid="([^"]+)"/);
      let id = found ? found[1] : slugify(label) || 'section';
      while (!found && used.has(id)) id += '-2';
      used.add(id);
      items.push(`<a href="#${id}">${label}</a>`);
      return found ? h : `<h2 id="${id}"${attrs}>${text}</h2>`;
    });
    if (items.length < 3) return whole;
    return `<div class="container tx-wrap"><aside class="tx-toc"><b>On this page</b><nav aria-label="On this page">${items.join('')}</nav></aside><div class="llms-explainer">${withIds}</div></section>`;
  });

  // related tool cards at the end of the page
  if (near.length) {
    const cards = near.map((t) => `<a class="tl-card" href="/tools/${t.slug}"><span class="tl-ic">${icon(cat, 22)}</span><h3>${esc(t.title)}</h3><p>${esc(t.summary)}</p><span class="tl-go">Use tool <b>&rarr;</b></span></a>`).join('');
    html += `\n<section class="tx-more" ${style}><div class="container"><div class="tx-more-head"><span class="eyebrow">${esc(cat.name)}</span><h2>More free ${esc(cat.name.toLowerCase())} tools</h2></div><div class="tl-grid four">${cards}</div></div></section>`;
  }

  return html;
};
