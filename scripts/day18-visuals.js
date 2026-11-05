// Designed visuals for the Day-18 posts (no bottom note strip; logo on top; each image in a different layout). Hooked from post-day9-common.js by slug.
const D0 = require('./diagram-lib2.js');
const D = Object.fromEntries(Object.entries(D0).map(([k, fn]) => [k, typeof fn === 'function' && !['logoSvg', 'proofHtml', 'hero'].includes(k) ? (o => { const c = Object.assign({}, o); delete c.note; return fn(c); }) : fn]));
const num = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));
const ofN = s => { const m = /(\d+) of (\d+)/.exec(s); return { v: +m[1], max: +m[2] }; };
const TEAL = '#0EA5A0', AMBER = '#F5A623', RED = '#E5484D';

module.exports = {
  'canonical-url': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows;
    return {
      hero: D.compare({ title: 'Canonical URL: relative or absolute?', left: { h: 'Relative: /dresses/green-dress', items: ['Only a path, no domain', 'Supported, but Google advises against it', 'A crawlable test site can claim itself', 'Found on 2 of 353 canonical tags'] }, right: { h: 'Absolute: https://www.example.com/...', items: ['Protocol and domain included', 'What Google says to use', 'Always points at your real domain', 'Found on 351 of 353 canonical tags'] } }),
      tables: {
        serp: D.dots({ title: 'What 5 guides on canonical url cover', rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, max: ofN(r[1]).max, text: r[1].replace(' of ', '/') })) }),
        google: D.cards({ w: 1200, h: 520, title: 'How strongly each method signals the canonical', qLabel: 'Google says', items: [
          { big: 'Strong', t: 'Redirect', d: 'The target should become canonical', q: 'Old URL is retired' },
          { big: 'Strong', t: 'rel="canonical" link', d: 'The specified URL should become canonical', q: 'Both URLs stay live' },
          { big: 'Weak', t: 'Sitemap inclusion', d: 'Helps listed URLs become canonical', q: 'List canonicals only' },
          { big: 'Hint', t: 'Overall', d: 'A preference, not a rule', q: 'Google makes the choice' }] }),
        ours: D.split({ w: 1200, h: 470, title: 'Canonical tags on 369 ranking pages', big: '99.4%', bigLabel: 'of canonical tags are absolute URLs', items: [{ v: o[1][1], t: 'pages carry a canonical tag' }, { v: o[2][1], t: 'use an absolute URL' }, { v: o[4][1], t: 'point to the page itself' }, { v: o[5][1], t: 'point to another URL' }, { v: o[6][1], t: 'have no canonical tag' }] })
      }
    };
  },
  'short-tail-vs-long-tail-keywords': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows;
    const imp = r => parseInt(String(r[2]).replace(/,/g, ''), 10);
    return {
      hero: D.columns({ title: 'Our impressions by query length', max: 40000, items: o.map((r, i) => ({ t: r[0] + ', ' + r[1] + ' queries', v: imp(r), text: r[2], color: i === 1 || i === 2 ? TEAL : AMBER })) }),
      tables: {
        serp: D.bars({ title: 'What 6 guides on short vs long tail keywords cover', max: 6, rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, text: r[1].replace(' of ', '/'), color: ofN(r[1]).v >= 5 ? TEAL : (ofN(r[1]).v <= 1 ? RED : undefined) })) }),
        ours: D.lollipop({ title: 'Average Google position by query length', rows: o.map(r => ({ t: r[0] + ' (' + r[1] + ' queries)', v: num(r[3]), text: 'position ' + r[3], color: num(r[3]) > 48 ? RED : AMBER })), max: 60, limit: 10, limitLabel: 'page 1 ends at 10' }),
        compare: D.compare({ w: 1200, h: 480, title: 'Short tail vs long tail keywords', left: { h: 'Short tail: 1 to 2 words', items: ['Broad, for example canonical url', 'High volume, high competition', 'Intent often unclear', 'Good for planning topics'] }, right: { h: 'Long tail: 3 or more words', items: ['Specific, for example canonical url example', 'Lower volume each, usually less competition', 'Intent clearer', 'Good for pages that answer one need'] } })
      }
    };
  },
  'keyword-proximity': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows, g = T.google.rows;
    return {
      hero: D.rings({ title: 'Do ranking pages keep the words together?', items: [
        { pct: 32 / 40, big: '32/40', t: 'ranking pages use the exact phrase', c: 'Pages read, 5 November 2026', color: TEAL },
        { pct: 30 / 32, big: '30/32', t: 'for the five informational searches', c: 'Tool pages are the exception', color: TEAL },
        { pct: 0, big: '0/5', t: 'Google docs that mention proximity', c: 'Searched for the word', color: AMBER }] }),
      tables: {
        serp: D.columns({ title: 'What 6 guides on keyword proximity cover', max: 6, items: s.slice(0, 11).map(r => ({ t: r[0], v: ofN(r[1]).v, text: r[1].replace(' of ', '/'), color: ofN(r[1]).v >= 5 ? TEAL : (ofN(r[1]).v <= 1 ? RED : AMBER) })) }),
        ours: D.stats({ title: 'How 40 ranking pages use the words of the search', cols: 3, items: [
          { big: o[0][1], t: 'ranking pages read' }, { big: o[1][1], t: 'contain every word of the search' }, { big: o[2][1], t: 'contain the exact phrase' },
          { big: o[3][1], t: 'exact phrase in the title', color: AMBER }, { big: o[4][1], t: 'exact phrase in the H1', color: AMBER }, { big: o[5][1], t: 'exact phrase in the first 100 words', color: AMBER }] }),
        google: D.timeline({ title: 'Google Search Central pages searched for proximity', items: g.map(r => ({ d: r[1], t: r[0], c: r[2] })) })
      }
    };
  }
};
