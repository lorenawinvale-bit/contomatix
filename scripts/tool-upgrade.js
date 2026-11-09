// Upgrades a tool page (8 Nov 2026): "How it works" steps, a related-questions section built from Search Console queries, extra FAQs (HTML + FAQPage schema) and a related tools/guides block.
// Idempotent: a page that already has the marker <!-- tool-upgrade --> is skipped. Facts come only from what the tool does and from the linked guides.
// usage: node scripts/tool-upgrade.js [slug ...]
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..');
const blog = new Set(require('../data/blog.json').map(p => p.slug)); const tools = new Set(require('../data/tools.js').map(t => t.slug));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const SPECS = Object.assign({}, require('./tool-upgrade-specs.js'), require('./tool-upgrade-specs2.js'));
const only = process.argv.slice(2);
for (const [slug, s] of Object.entries(SPECS)) {
  if (only.length && !only.includes(slug)) continue;
  const fp = path.join(root, 'views', 'pages', slug + '.ejs'); let t = fs.readFileSync(fp, 'utf8');
  if (t.includes('<!-- tool-upgrade -->')) { console.log(slug + ': already upgraded'); continue; }
  const all = JSON.stringify(s); if (/\u2014/.test(all)) throw new Error('em dash in spec ' + slug);
  const links = [...s.related.map(r => r.href), ...[...all.matchAll(/href=\\"(\/[^"\\]+)\\"/g)].map(x => x[1])];
  for (const l of links) {
    if (l.startsWith('/blog/') && !blog.has(l.slice(6))) throw new Error('bad blog link ' + l); if (l.startsWith('/tools/') && !tools.has(l.slice(7))) throw new Error('bad tool link ' + l);
  }
  // 1. How it works: new section before the explainer section
  const steps = `<!-- tool-upgrade -->
<section class="tool-how">
  <div class="container">
    <div class="section-head centered">
      <span class="eyebrow">How it works</span>
      <h2>${s.howTitle}</h2>
    </div>
    <div class="tool-steps">
${s.steps.map((st, i) => `      <div class="process-step"><span class="step-num">0${i + 1}</span><h3>${st[0]}</h3><p>${st[1]}</p></div>`).join('\n')}
    </div>
  </div>
</section>
`;
  const ex = t.indexOf('<section>\n  <div class="container llms-explainer">'); if (ex < 0) throw new Error('explainer section not found in ' + slug);
  t = t.slice(0, ex) + steps + t.slice(ex);
  // 2. related questions before the FAQ heading
  const faqH = t.search(/<h2>[^<]*FAQs?<\/h2>/); if (faqH < 0) throw new Error('FAQ heading not found in ' + slug);
  const rq = `<h2>${s.rqTitle}</h2>\n${s.questions.map(q => `    <h3>${q[0]}</h3>\n    <p>${q[1]}</p>`).join('\n')}\n    `;
  t = t.slice(0, faqH) + rq + t.slice(faqH);
  // 3. extra FAQs (HTML)
  const listEnd = t.indexOf('</details>\n    </div>', t.indexOf('class="faq-list"')); if (listEnd < 0) throw new Error('faq list end not found in ' + slug);
  const extraHtml = s.faqs.map(f => `\n      <details>\n        <summary>${f[0]}<span class="faq-icon"></span></summary>\n        <p>${f[1]}</p>\n      </details>`).join('');
  const at = listEnd + '</details>'.length; t = t.slice(0, at) + extraHtml + t.slice(at);
  // 3b. extra FAQs (schema)
  const sm = t.indexOf("'@type': 'FAQPage'"); const me = t.indexOf('mainEntity: [', sm); const close = t.indexOf('\n    ]', me); if (me < 0 || close < 0) throw new Error('schema list not found in ' + slug);
  const plain = x => x.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/'/g, "\\'");
  const extraSchema = s.faqs.map(f => `,\n      { '@type': 'Question', name: '${plain(f[0])}', acceptedAnswer: { '@type': 'Answer', text: '${plain(f[1])}' } }`).join('');
  t = t.slice(0, close) + extraSchema + t.slice(close);
  // 4. related tools and guides before the CTA band
  const rel = `<h2>${s.relatedTitle}</h2>
    <div class="tool-related">
${s.related.map(r => `      <a href="${r.href}"><span>${r.kind}</span><strong>${r.t}</strong><em>${r.d}</em></a>`).join('\n')}
    </div>
    `;
  const cta = t.indexOf('<div class="cta-band"'); if (cta < 0) throw new Error('cta not found in ' + slug);
  t = t.slice(0, cta) + rel + t.slice(cta);
  fs.writeFileSync(fp, t, 'utf8'); console.log(slug + ': upgraded (' + s.questions.length + ' related questions, ' + s.faqs.length + ' new FAQs)');
}
