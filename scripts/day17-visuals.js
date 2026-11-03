// Designed visuals for the Day-17 posts (no bottom note strip; logo on top; each image in a different layout). Hooked from post-day9-common.js by slug.
const D0 = require('./diagram-lib2.js');
const D = Object.fromEntries(Object.entries(D0).map(([k, fn]) => [k, typeof fn === 'function' && !['logoSvg', 'proofHtml', 'hero'].includes(k) ? (o => { const c = Object.assign({}, o); delete c.note; return fn(c); }) : fn]));
const num = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));
const ofN = s => { const m = /(\d+) of (\d+)/.exec(s); return { v: +m[1], max: +m[2] }; };
const TEAL = '#0EA5A0', AMBER = '#F5A623', RED = '#E5484D';

const R = require('../../keyword-research/serp-meta-description-length-2026-11-03.json');
module.exports = {
  'subdomain-vs-subdirectory': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows;
    return {
      hero: D.compare({ title: 'Subdomain or subdirectory?', left: { h: 'Subdomain: blog.example.com', items: ['A separate host', 'Can run on a different server or platform', 'Easy to separate from the main site', 'Needs its own robots.txt and sitemap'] }, right: { h: 'Subdirectory: example.com/blog/', items: ['Part of one host', 'One server, one set of settings', 'Low maintenance, same host', 'One robots.txt, one sitemap'] } }),
      tables: {
        serp: D.columns({ title: 'What 6 guides on subdomain vs subdirectory cover', max: 6, items: s.slice(0, 10).map(r => ({ t: r[0], v: ofN(r[1]).v, text: r[1].replace(' of ', '/'), color: ofN(r[1]).v >= 5 ? TEAL : (ofN(r[1]).v <= 2 ? RED : AMBER) })) }),
        google: D.cards({ w: 1200, h: 560, title: "Google's pros and cons for each structure", qLabel: 'Google lists as a con', items: [
          { big: 'Easy', t: 'Subdomain: setup', d: 'Easy to set up, different server locations', q: 'Geotargeting may be unclear' },
          { big: 'Apart', t: 'Subdomain: separation', d: 'Easy separation of sites, different servers', q: 'Geotargeting may be unclear' },
          { big: 'Easy', t: 'Subdirectory: setup', d: 'Easy to set up, low maintenance, same host', q: 'Geotargeting may be unclear' },
          { big: 'One', t: 'Subdirectory: server', d: 'One host, one server location', q: 'Separation of sites is harder' }] }),
        ours: D.stats({ title: 'Hosts of 377 ranking URLs we checked', cols: 3, items: [
          { big: o[0][1], t: 'unique ranking URLs read' }, { big: o[1][1], t: 'on the main domain or www' }, { big: o[2][1], t: 'on a subdomain', color: AMBER },
          { big: o[3][1], t: 'help, docs, forum or learning hosts', color: AMBER }, { big: o[4][1], t: 'blog subdomains', color: AMBER }, { big: '433/433', t: 'of our own pages on one host' }] })
      }
    };
  },
  'content-gap-analysis': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows, st = T.steps.rows;
    const n = r => parseInt(String(r[1]).replace(/,/g, ''), 10);
    return {
      hero: D.rings({ title: 'Where our own content gaps are', items: [
        { pct: n(o[2]) / n(o[0]), big: o[2][1] + '/' + o[0][1], t: 'top queries with no page holding all their words', c: 'Search Console, 28 October 2026', color: AMBER },
        { pct: n(o[4]) / n(o[3]), big: o[4][1] + '/' + o[3][1], t: 'near-page-1 queries already have a page', c: 'Improve it', color: TEAL },
        { pct: n(o[5]) / n(o[3]), big: o[5][1] + '/' + o[3][1], t: 'near-page-1 queries have none', c: 'Write one', color: RED }] }),
      tables: {
        serp: D.dots({ title: 'What 5 guides on content gap analysis cover', rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, max: ofN(r[1]).max, text: r[1].replace(' of ', '/') })) }),
        ours: D.split({ w: 1200, h: 440, title: 'Our top queries against our own pages', big: '56%', bigLabel: 'of 998 queries had no page with all their words', items: [{ v: o[1][1], t: 'queries with a matching page' }, { v: o[2][1], t: 'queries with no matching page' }, { v: o[4][1], t: 'near page 1, page exists: improve it' }, { v: o[5][1], t: 'near page 1, no page: write one' }] }),
        steps: D.timeline({ title: 'The six steps of a content gap analysis', items: st.map(r => ({ d: 'Step ' + r[0].split(' ')[0], t: r[0].replace(/^d+ /, ''), c: r[1] })) })
      }
    };
  },
  'meta-description-length': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows;
    const md = R.map(r => r.metaDescLen).filter(n => n != null);
    return {
      hero: D.lollipop({ title: 'Meta description length of 8 ranking pages', rows: md.map((n, i) => ({ t: 'Ranking page ' + (i + 1), v: n, text: n + ' characters', color: n > 160 ? RED : n < 120 ? AMBER : TEAL })), max: 420, limit: 160, limitLabel: 'the usual 160' }),
      tables: {
        serp: D.bars({ title: 'What 8 guides on meta description length cover', max: 8, rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, text: r[1].replace(' of ', '/'), color: ofN(r[1]).v >= 6 ? TEAL : (ofN(r[1]).v <= 3 ? AMBER : undefined) })) }),
        google: D.cards({ w: 1200, h: 520, title: 'What Google says about snippet length', qLabel: 'In practice', items: [
          { big: 'None', t: 'Limit', d: 'No limit on how long a meta description can be', q: 'Write what is useful' },
          { big: 'Width', t: 'Display', d: 'Truncated as needed to fit the device width', q: 'Key point first' },
          { big: 'Either', t: 'Source', d: 'Page content or the description, whichever fits the search', q: 'Make yours the better one' },
          { big: 'max-snippet', t: 'Control', d: 'A meta tag that sets a maximum snippet length', q: 'Only if you need a cap' }] }),
        ours: D.columns({ title: 'Meta description length of our 363 posts', max: 320, items: o.map((r, i) => ({ t: r[0], v: num(r[1]), text: r[1], color: i === 1 ? TEAL : (i === 3 ? RED : AMBER) })) })
      }
    };
  }
};
