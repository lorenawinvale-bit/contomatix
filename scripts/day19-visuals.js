// Designed visuals for the Day-19 posts (no bottom note strip; logo on top; each image in a different layout). Hooked from post-day9-common.js by slug.
const D0 = require('./diagram-lib2.js');
const D = Object.fromEntries(Object.entries(D0).map(([k, fn]) => [k, typeof fn === 'function' && !['logoSvg', 'proofHtml', 'hero'].includes(k) ? (o => { const c = Object.assign({}, o); delete c.note; return fn(c); }) : fn]));
const num = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));
const ofN = s => { const m = /(\d+) of (\d+)/.exec(s); return { v: +m[1], max: +m[2] }; };
const TEAL = '#0EA5A0', AMBER = '#F5A623', RED = '#E5484D';
module.exports = {
  'backlinks-example': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows, g = T.google.rows;
    const n = r => parseInt(r[1], 10);
    return {
      hero: D.columns({ title: 'Our 38 backlinks by type of site', max: 16, items: o.slice(0, 7).map((r, i) => ({ t: r[0], v: n(r), text: r[1], color: i < 5 ? AMBER : TEAL })) }),
      tables: {
        serp: D.dots({ title: 'What 6 guides on backlinks example cover', rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, max: ofN(r[1]).max, text: r[1].replace(' of ', '/') })) }),
        google: D.cards({ w: 1200, h: 540, title: 'What Google lists as link spam', qLabel: 'Allowed if', items: [
          { big: 'Buy', t: 'Buying or selling links', d: 'For ranking purposes', q: 'Qualified with nofollow or sponsored' },
          { big: 'Swap', t: 'Excessive link exchanges', d: 'Link to me and I will link to you', q: 'Not exclusively for cross-linking' },
          { big: 'Auto', t: 'Automated link creation', d: 'Programs or services that create links', q: 'Never' },
          { big: 'Low', t: 'Low-quality directories', d: 'Directory and bookmark site links', q: 'Only if the listing is real and useful' }] }),
        ours: D.lollipop({ title: 'Links to us by type of site', rows: o.map(r => ({ t: r[0], v: n(r), text: r[1] + (n(r) === 1 ? ' link' : ' links'), color: n(r) >= 7 ? RED : (n(r) >= 3 ? AMBER : TEAL) })), max: 16 })
      }
    };
  }
};
