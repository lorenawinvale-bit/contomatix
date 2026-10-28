// Designed visuals for the three Day-12 posts. All 13 images use a different layout: cards, stats tiles, bars, timeline, flow, columns,
// compare, split, rings, ruler, dots, lollipop, pairs. Called by post-day9-common.js; numbers come from the builder's own table rows.
const D = require('./diagram-lib2.js');
const num = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));
const ofN = s => { const m = /(\d+) of (\d+)/.exec(s); return { v: +m[1], max: +m[2] }; };
const TEAL = '#0EA5A0', AMBER = '#F5A623', RED = '#E5484D';

module.exports = {
  'types-of-schema-markup': cfg => {
    const T = cfg.tables, own = T.ours.rows, g = T.google.rows, s = T.serp.rows;
    const pick = n => own.find(r => r[0].startsWith(n));
    return {
      hero: D.cards({ title: 'Types of schema markup we use', note: 'Our own scan of ' + pick('Organization')[1] + ' live pages, 26 October 2026.', qLabel: 'Pages', items: [
        { big: pick('Organization')[1], t: 'Organization', d: 'Names the business', q: 'on every page' },
        { big: pick('BreadcrumbList')[1], t: 'BreadcrumbList', d: 'Shows the page path', q: pick('BreadcrumbList')[2] + ' of pages' },
        { big: pick('FAQPage')[1], t: 'FAQPage', d: 'Rich result ended 7 May 2026', q: pick('FAQPage')[2] + ' of pages' },
        { big: pick('BlogPosting')[1], t: 'BlogPosting', d: 'Marks each article', q: pick('BlogPosting')[2] + ' of pages' }] }),
      tables: {
        serp: D.stats({ title: 'What 8 ranking guides say about schema types', note: 'Pages out of 8 readable results. Teal means all 8 agree, amber means fewer.', cols: 4, items: s.map(r => ({ big: r[1].replace(' of ', '/'), t: r[0], color: ofN(r[1]).v === ofN(r[1]).max ? TEAL : AMBER })) }),
        ours: D.bars({ title: 'Schema types on our own site', note: 'JSON-LD found on ' + own[0][1] + ' live URLs. One page can carry several types.', rows: own.map(r => ({ t: r[0], v: num(r[1]), text: r[1] + ' pages (' + r[2] + ')', color: r[0] === 'FAQPage' ? AMBER : undefined })), max: num(own[0][1]) }),
        google: D.timeline({ title: 'Structured data Google ended or removed', note: 'From the Google Search Central changelog, read on 26 October 2026.', items: [
          { d: g[0][0], t: 'Several types removed', c: 'Course info, estimated salary, learning video, special announcement, vehicle listing' },
          { d: g[1][0], t: 'Practice problem removed', c: 'Docs removed: no longer shown in results' },
          { d: g[2][0], t: 'FAQ rich results deprecated', c: 'They no longer appear from 7 May 2026' },
          { d: g[3][0], t: 'FAQ documentation removed', c: 'Google removed the FAQ rich result docs' }] })
      }
    };
  },
  'seo-site-migration': cfg => {
    const T = cfg.tables, o = T.ours.rows, s = T.serp.rows;
    return {
      hero: D.flow({ title: 'An SEO site migration, in five moves', note: 'Google: keep redirects as long as possible, generally at least 1 year.', steps: [
        { t: 'Map every URL', s: 'old to new', c: 'One target for each old page' },
        { t: 'Redirect once', s: '301 or 308', c: 'No chains, straight to the final URL' },
        { t: 'Move in one step', s: 'launch', c: 'Small and medium sites move all URLs at once' },
        { t: 'Watch Search Console', s: 'after launch', c: 'Check crawl errors and coverage' },
        { t: 'Keep redirects', s: 'a year', c: 'Leave them live for at least 1 year' }] }),
      tables: {
        serp: D.columns({ title: 'What 5 ranking migration guides cover', note: 'Pages out of 5 readable results. Teal columns mean all 5 cover it.', max: 5, items: s.map(r => ({ t: r[0], v: ofN(r[1]).v, text: r[1].replace(' of ', '/'), color: ofN(r[1]).v === 5 ? TEAL : AMBER })) }),
        google: D.compare({ w: 1200, h: 480, title: "Google's site move rules, in short", note: 'From Google Search Central documentation on site moves with URL changes.',
          left: { h: 'What Google says to avoid', items: ['Chaining redirects: go straight to the final destination', 'Making several changes at once: do them one at a time', 'Dropping redirects early: keep them at least 1 year'] },
          right: { h: 'What Google says to do', items: ['Use server-side permanent redirects such as 301 and 308', 'Small and medium sites: move all URLs at once', 'Large sites: one section at a time is fine', 'Permanent redirects do not cause a loss in PageRank'] } }),
        ours: D.split({ title: 'What a URL rename would cost our own site', note: 'All 239 year-in-URL posts are linked from another post, and we maintain 1 redirect rule today.', big: o[2][1].split(' ')[0], bigLabel: 'posts carry a year in the URL, ' + /\((\d+%)\)/.exec(o[2][1])[1] + ' of our ' + o[1][1] + ' posts', items: [
          { v: o[0][1], t: 'URLs in our sitemap' }, { v: o[1][1], t: 'blog posts' }, { v: Number(o[3][1]).toLocaleString('en-US'), t: 'internal links in post bodies' }, { v: o[4][1].split(' ')[0], t: 'of those links point at year-in-URL posts (' + /\((\d+%)\)/.exec(o[4][1])[1] + ')' }] })
      }
    };
  },
  'improve-core-web-vitals': cfg => {
    const T = cfg.tables, af = T.after.rows, oursR = T.ours.rows, s = T.serp.rows, g = T.google.rows;
    const pr = af.find(r => r[0] === '/blog/pr-link-building');
    const worstOther = Math.max(...af.filter(r => r !== pr).map(r => num(r[2])));
    return {
      hero: D.rings({ title: 'One wrong image size, fixed', note: 'Ring = share of the 0.1 limit used. Measured live in October 2026.', items: [
        { pct: num(pr[1]) / 0.1, big: pr[1], t: 'PR link building guide before', c: 'Hero image declared at the wrong size', color: RED },
        { pct: num(pr[2]) / 0.1, big: pr[2], t: 'Same page after the fix', c: 'Under the 0.1 limit', color: TEAL },
        { pct: worstOther / 0.1, big: worstOther.toFixed(3), t: 'Worst of the other four posts', c: 'After the same fix', color: TEAL }] }),
      tables: {
        google: D.ruler({ title: "Google's Core Web Vitals thresholds", note: 'Schematic track, not to scale. A page is good when its 75th percentile meets all three.', rows: g.map(r => ({ t: r[0], sub: r[1], text: r[2] })) }),
        serp: D.dots({ title: 'What 8 guides on improving Core Web Vitals cover', note: 'Each dot is one of the 8 readable results. Teal rows mean all 8 cover it.', rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, max: 8, text: r[1].replace(' of ', '/') })) }),
        ours: D.lollipop({ title: 'Layout shift on 13 of our pages', note: 'Median of three runs each, 26 October 2026. The red line is Google’s 0.1 limit.', rows: oursR.map(r => ({ t: r[0], v: num(r[2]), text: 'CLS ' + r[2] + '  ·  LCP ' + r[1], color: num(r[2]) >= 0.1 ? RED : num(r[2]) >= 0.05 ? AMBER : TEAL })), max: 0.45, limit: 0.1, limitLabel: 'limit 0.1' }),
        after: D.pairs({ title: 'Layout shift before and after the fix', note: 'Five blog posts, measured live on 26 and 28 October 2026.', rows: af.map(r => ({ t: r[0], a: num(r[1]), b: num(r[2]), at: r[1], bt: r[2] })), max: 0.45, limit: 0.1, limitLabel: 'limit 0.1', labels: ['Before', 'After'] })
      }
    };
  }
};
