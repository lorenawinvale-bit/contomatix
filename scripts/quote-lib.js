// Builds a small HTML "source excerpt" card used as a proof image (screenshot with scripts/capture-page.js --sel=.box).
// o: {source, title, paras:[html strings]}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
module.exports = function quoteHtml(o) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:880px;background:#fff;font-family:Roboto,'Segoe UI',Arial,sans-serif;color:#202124}
.box{border:1px solid #dadce0;padding:20px 26px}
.src{font-size:13px;color:#5f6368;font-weight:600;margin-bottom:8px}
h3{margin:0 0 10px;font-size:19px}
p{margin:0 0 12px;font-size:16px;line-height:1.55}
code{background:#f1f3f4;padding:1px 5px;border-radius:4px;font-size:14px}
</style></head><body><div class="box">
<div class="src">${esc(o.source)}</div>
<h3>${esc(o.title)}</h3>
${o.paras.map(p => '<p>' + p + '</p>').join('\n')}
</div></body></html>`;
};
