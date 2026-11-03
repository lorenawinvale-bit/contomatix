// node scripts/strip-em-dashes.js: removes em dashes from site-rendered sources and post builders (3 Nov 2026 rule: em dash = AI tell).
const fs = require('fs'), path = require('path');
const SP = / (?:—|&mdash;|&#8212;|&#x2014;) (\S)/g;
const ANY = /\s(?:—|&mdash;|&#8212;|&#x2014;)\s/g;
const fix = (s, head) => {
  let first = true;
  return s.replace(SP, (m, ch) => {
    if (head && first) { first = false; return ': ' + ch; }
    if (!head && /[A-Z]/.test(ch)) return '. ' + ch;
    return ', ' + ch;
  }).replace(ANY, ', ');
};
function doFile(f, kind) {
  let t = fs.readFileSync(f, 'utf8'); const o = t;
  if (kind === 'json') {
    const a = JSON.parse(t);
    for (const p of a) {
      p.title = fix(p.title, true); p.excerpt = fix(p.excerpt, false);
      p.content = p.content.replace(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, at, inner) => `<${tag}${at}>${fix(inner, true)}</${tag}>`);
      p.content = fix(p.content, false);
    }
    t = JSON.stringify(a, null, 2);
  } else {
    t = t.replace(/<(h[1-6]|title)([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, at, inner) => `<${tag}${at}>${fix(inner, true)}</${tag}>`);
    t = t.split('\n').map(l => (/&#8212;/.test(l) && /replace\(/.test(l)) ? l : (/\btitle\s*:|<title/.test(l) ? fix(l, true) : fix(l, false))).join('\n');
    t = t.replace(/'—'/g, "'n/a'");
  }
  if (t !== o) { fs.writeFileSync(f, t, 'utf8'); return true; }
  return false;
}
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? (e.name === 'node_modules' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]);
const root = path.join(__dirname, '..'); process.chdir(root);
const files = [];
for (const f of walk('views').filter(f => f.endsWith('.ejs'))) files.push([f, 'src']);
for (const f of fs.readdirSync('data').filter(f => f.endsWith('.js'))) files.push(['data/' + f, 'src']);
files.push(['server.js', 'src']);
for (const f of fs.readdirSync('lib')) files.push(['lib/' + f, 'src']);
for (const f of fs.readdirSync('scripts').filter(f => /^(build-post-|build-assets-|day\d+-visuals|diagram-lib|post-day9|post-assets)/.test(f) && f.endsWith('.js'))) files.push(['scripts/' + f, 'src']);
files.push(['data/blog.json', 'json']);
let n = 0; for (const [f, k] of files) if (doFile(f, k)) { n++; console.log('changed', f); }
console.log('files changed', n);
