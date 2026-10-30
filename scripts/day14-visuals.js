// Designed visuals for the Day-14 posts (no bottom note strip; logo on top; each image in a different layout). Hooked from post-day9-common.js by slug.
const D0 = require('./diagram-lib2.js');
const D = Object.fromEntries(Object.entries(D0).map(([k, fn]) => [k, typeof fn === 'function' && !['logoSvg', 'proofHtml', 'hero'].includes(k) ? (o => { const c = Object.assign({}, o); delete c.note; return fn(c); }) : fn]));
const num = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));
const ofN = s => { const m = /(\d+) of (\d+)/.exec(s); return { v: +m[1], max: +m[2] }; };
const TEAL = '#0EA5A0', AMBER = '#F5A623', RED = '#E5484D';

module.exports = {
  'top-seo-companies-ramsgate-2026': cfg => {
    const T = cfg.tables;
    return {
      hero: D.rings({ title: 'Who is really in Ramsgate?', items: [
        { pct: 5 / 18, big: '5/18', t: 'results show a Ramsgate address', c: 'Read from each site, 30 October 2026', color: TEAL },
        { pct: 4 / 18, big: '4/18', t: 'also offer SEO', c: 'These four are on our list', color: TEAL },
        { pct: 13 / 18, big: '13/18', t: 'show no Ramsgate address', c: 'Another town, or no address at all', color: RED }] }),
      tables: {
        where: D.columns({ title: 'Where the 18 results say they are based', items: [
          { t: 'Ramsgate', v: 5, text: '5', color: TEAL }, { t: 'Chatham', v: 1, text: '1', color: AMBER }, { t: 'Gillingham', v: 1, text: '1', color: AMBER }, { t: 'London', v: 1, text: '1', color: AMBER }, { t: 'Maidstone or East Grinstead', v: 1, text: '1', color: AMBER }, { t: 'Essex', v: 1, text: '1', color: AMBER }, { t: 'Isle of Sheppey', v: 1, text: '1', color: AMBER }, { t: 'Margate (register)', v: 1, text: '1', color: AMBER }, { t: 'No address found', v: 6, text: '6', color: RED }], max: 6 }),
        check: D.cards({ w: 1200, h: 560, title: 'The four Ramsgate companies', qLabel: 'Address on site', items: [
          { big: '1', t: 'Esabi', d: 'SEO, local SEO, link building. Companies House match', q: '424 Margate Road, CT12 6SJ' },
          { big: '2', t: 'Busywebs', d: 'Web design with a local SEO guide for Thanet', q: '23 Pysons Road, CT12 6TS' },
          { big: '3', t: '9G Agency', d: 'SEO service page, three-month guarantee terms', q: 'Marlowe Innovation Centre, CT12 6FA' },
          { big: '4', t: 'Web Dandy', d: 'Web design with on-page SEO included', q: '128 Crescent Road, CT11 9RE' }] }),
        method: D.flow({ w: 1200, h: 420, title: 'How we checked each company', steps: [
          { t: 'Read results', s: 'Google UK', c: 'Sites ranking for Ramsgate SEO searches' }, { t: 'Open the site', s: 'home, contact, about', c: 'Pages where an address usually sits' },
          { t: 'Find the address', s: 'postcode', c: 'CT11 or CT12 means Ramsgate' }, { t: 'Companies House', s: 'name search', c: 'Registered office and incorporation date' }, { t: 'Keep confirmed', s: 'address and SEO', c: 'Four companies passed' }] })
      }
    };
  },
  'top-seo-companies-ashford-2026': cfg => {
    return {
      hero: D.split({ title: 'Who is really in Ashford?', big: '8/23', bigLabel: 'results show an Ashford-area address', h: 440, items: [
        { v: '5', t: 'offer SEO and are on our list' }, { v: '8', t: 'give an office in another town' }, { v: '7', t: 'show no address at all' }, { v: '£495', t: 'the only monthly SEO price published' }] }),
      tables: {
        where: D.bars({ title: 'Where the 23 results say they are based', max: 23, rows: [{ t: 'An Ashford-area address', v: 8, text: '8 of 23', color: TEAL }, { t: 'An address in another town', v: 8, text: '8 of 23', color: AMBER }, { t: 'No address on the pages we read', v: 7, text: '7 of 23', color: RED }] }),
        check: D.cards({ w: 1200, h: 560, title: 'The five Ashford companies', qLabel: 'Address on site', items: [
          { big: '1', t: 'Discoverable', d: 'SEO, PPC and analytics. Companies House match', q: 'Evegate Business Park, TN25 6SX' },
          { big: '2', t: 'Quad Web Design', d: 'SEO from £495 a month. Company since 2006', q: 'Church Lane, Hamstreet, TN26' },
          { big: '3', t: 'Smart Web Agency', d: 'Full SEO page. Registered office is in London', q: 'The Panorama, TN24 8DF' },
          { big: '4', t: 'Ashford Web Services', d: 'Web design and SEO, established 2010', q: '4 Stowell Close, TN23 5HS' },
          { big: '5', t: 'Lustre Digital', d: 'Website with on-page SEO. Company since March 2026', q: '15 Tritton Fields, TN24 9HG' }] }),
        method: D.compare({ w: 1200, h: 480, title: 'What we accepted and what we did not', left: { h: 'Not accepted', items: ['A page called SEO Ashford with no address', 'An office only in another town', 'Web design with no SEO mentioned', 'A company record that does not exist'] }, right: { h: 'Accepted', items: ['An Ashford-area address on its own site', 'A matching company, or a sole trader we flag', 'A readable SEO service on its pages', 'Caveats stated: registered office, new company'] } })
      }
    };
  },
  'blogger-outreach': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows, g = T.google.rows;
    const pick = n => s.find(r => r[0].startsWith(n));
    return {
      hero: D.stats({ w: 760, cols: 2, title: 'What 7 blogger outreach guides say', items: [
        { big: pick('Sell')[1].replace(' of ', '/'), t: 'sell a service or tool' }, { big: pick('Guest')[1].replace(' of ', '/'), t: 'cover guest posts', color: AMBER },
        { big: pick('Authority')[1].replace(' of ', '/'), t: 'rely on authority or traffic metrics' }, { big: pick('Spam')[1].replace(' of ', '/'), t: 'mention spam, nofollow or paid links', color: AMBER },
        { big: pick('Follow')[1].replace(' of ', '/'), t: 'mention follow-up emails' }, { big: pick('Link Google')[1].replace(' of ', '/'), t: "link Google's documentation", color: RED }] }),
      tables: {
        serp: D.columns({ title: 'What 7 guides on blogger outreach cover', max: 7, items: s.slice(0, 11).map(r => ({ t: r[0], v: ofN(r[1]).v, text: r[1].replace(' of ', '/'), color: ofN(r[1]).v === 7 ? TEAL : (ofN(r[1]).v === 0 ? RED : AMBER) })) }),
        google: D.cards({ w: 1200, h: 520, title: "What Google lists as link spam", qLabel: 'The rule', items: [
          { big: '$', t: 'Paid links', d: 'Money for links, or posts that contain links', q: 'Qualify with sponsored or nofollow' },
          { big: '+', t: 'Product for a link', d: 'Sending a product in exchange for a link', q: 'Qualify with sponsored or nofollow', },
          { big: 'Aa', t: 'Optimized anchors', d: 'Keyword-rich anchors in guest posts or press releases', q: 'Avoid keyword-rich anchors' },
          { big: '⇄', t: 'Link exchanges', d: 'Excessive "link to me and I\'ll link to you"', q: 'Avoid doing it at scale' }] }),
        ours: D.rings({ w: 1200, h: 520, title: 'Our own Search Console Links report', items: [
          { pct: 24 / 30, big: '24/30', t: 'links from the top 5 sites', c: 'Read on 29 October 2026', color: AMBER },
          { pct: 23 / 30, big: '23/30', t: 'links point at the homepage', c: 'Inner pages get few links', color: AMBER },
          { pct: 19 / 30, big: '19/30', t: 'links from two profile sites', c: 'Directory-type profile pages', color: RED }] })
      }
    };
  },
  'topical-map-seo': cfg => {
    const T = cfg.tables, o = T.ours.rows, s = T.serp.rows;
    return {
      hero: D.split({ title: 'Our own topical map', big: o[0][1], bigLabel: 'of our 353 posts were city listicles', h: 440, items: [
        { v: o[2][1], t: 'link building posts, the work we sell' }, { v: o[4][1], t: 'technical SEO posts' }, { v: o[5][1], t: 'AI search posts' }, { v: o[1][1], t: 'other posts' }] }),
      tables: {
        serp: D.bars({ title: 'What 7 guides on topical map SEO cover', rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, text: r[1].replace(' of ', '/'), color: ofN(r[1]).v === ofN(r[1]).max ? TEAL : (ofN(r[1]).v === 0 ? RED : undefined) })), max: 7 }),
        ours: D.lollipop({ title: 'Average Google position by cluster', rows: o.map(r => ({ t: r[0], v: num(r[4]), text: 'position ' + r[4] + '  ·  ' + r[1] + ' posts  ·  ' + r[3] + ' clicks', color: num(r[4]) > 60 ? RED : num(r[4]) > 40 ? AMBER : TEAL })).sort((a, b) => a.v - b.v), max: 80, limit: 10, limitLabel: 'page 1 ends at 10' }),
        steps: D.cards({ w: 1200, h: 520, title: 'Five steps to a topical map', qLabel: 'You end up with', items: [
          { big: '1', t: 'Core topic', d: 'What you want to be known for', q: 'One sentence' }, { big: '2', t: 'Subtopics', d: 'From keyword data and Search Console', q: 'A raw keyword list' },
          { big: '3', t: 'Keyword groups', d: 'One page can answer each group', q: 'Pages to build' }, { big: '4', t: 'Internal links', d: 'Pillar to cluster and back', q: 'A link plan' }, { big: '5', t: 'Measure', d: 'Per cluster, in Search Console', q: 'A map you can fix' }] })
      }
    };
  },
  'javascript-seo': cfg => {
    const T = cfg.tables, s = T.serp.rows, o = T.ours.rows;
    return {
      hero: D.flow({ title: 'How Google processes a JavaScript page', steps: [
        { t: 'Crawl', s: 'robots.txt first', c: 'Googlebot fetches the URL if you allow it' },
        { t: 'Queue', s: '200 status pages', c: 'Waits for rendering, seconds or longer' },
        { t: 'Render', s: 'headless Chromium', c: 'Runs your JavaScript' },
        { t: 'Find links', s: 'rendered HTML', c: 'Parsed again and queued for crawling' },
        { t: 'Index', s: 'rendered HTML', c: 'The rendered page is what gets indexed' }] }),
      tables: {
        serp: D.dots({ title: 'What 6 guides on JavaScript and SEO cover', rows: s.map(r => ({ t: r[0], v: ofN(r[1]).v, max: ofN(r[1]).max, text: r[1].replace(' of ', '/') })) }),
        google: D.compare({ w: 1200, h: 520, title: 'What Google says about JavaScript', left: { h: 'What Google says does not work', items: ['Links with javascript:goTo in the href', 'URL fragments to load different content', 'Blocked scripts: Google will not render them', 'JavaScript that changes the canonical URL', 'Dynamic rendering as a long-term fix'] },
          right: { h: 'What Google says works', items: ['Anchor elements with an href, even if injected by script', 'The History API for routing', 'Meaningful status codes, such as 404', 'Server-side rendering, static rendering or hydration', 'Testing with the URL Inspection Tool'] } }),
        ours: D.stats({ title: 'Raw HTML versus the rendered page: our 25 pages', cols: 3, items: [
          { big: o[0][1].replace(' of ', '/'), t: 'pages with every H2 in the raw HTML' },
          { big: o[1][1].replace(' of ', '/'), t: 'pages with every image in the raw HTML', color: AMBER },
          { big: o[2][1].replace(' of ', '/'), t: 'site and tool pages with identical links' },
          { big: o[3][1].replace(' of ', '/'), t: 'blog posts gained links after rendering', color: AMBER },
          { big: '+' + o[4][1].replace(' to ', ' to +'), t: 'extra links per post: the table of contents' },
          { big: o[5][1].replace(' of ', '/'), t: 'pages with JSON-LD in the raw HTML', color: AMBER }] })
      }
    };
  }
};
