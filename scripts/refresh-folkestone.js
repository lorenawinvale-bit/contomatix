// One-off (1 Nov 2026): refresh data/blog.json entry top-seo-companies-folkestone-2026 without rebuilding it. node scripts/refresh-folkestone.js
// Data: 11 sites ranking in Google UK for Folkestone SEO searches (1 Nov 2026), their addresses read from their own pages, Companies House name searches the same day,
// our own Search Console queries (3 months to 28 Oct 2026). Sites outside our list are not named. The six listed companies keep their existing write-ups; we add re-check notes.
const fs = require('fs'); const path = require('path'); const { execFileSync } = require('child_process');
const root = path.join(__dirname, '..'); const D0 = require('./diagram-lib2.js');
const D = Object.fromEntries(Object.entries(D0).map(([k, fn]) => [k, typeof fn === 'function' && !['logoSvg', 'proofHtml', 'hero', '_h'].includes(k) ? (o => { const c = Object.assign({}, o); delete c.note; return fn(c); }) : fn]));
const SLUG = 'top-seo-companies-folkestone-2026'; const TEAL = '#0EA5A0', AMBER = '#F5A623', RED = '#E5484D';
const V = require('../../keyword-research/kent-agency-verify-folkestone-2026-11-01.json').folkestone;
const SERP = ['digitalmediapartner.co.uk', 'geniecrawl.com', 'sdgwebdesign.com', 'promoteuk.co.uk', 'whitefishmarketing.co.uk', 'boostonlineadvertising.co.uk', 'samphire.agency', 'webowsdesign.co.uk', 'hbwebdevelopment.co.uk', 'bamboofolkestone.uk', 'smart-websites.com'];
const G = { here: ['whitefishmarketing.co.uk', 'bamboofolkestone.uk'], elsewhere: ['digitalmediapartner.co.uk', 'geniecrawl.com', 'promoteuk.co.uk', 'boostonlineadvertising.co.uk', 'smart-websites.com', 'webowsdesign.co.uk'], none: ['sdgwebdesign.com', 'samphire.agency', 'hbwebdevelopment.co.uk'] };
if (SERP.length !== 11 || [...G.here, ...G.elsewhere, ...G.none].sort().join() !== SERP.slice().sort().join()) throw new Error('groups do not cover the 11 sites');
const pc = h => Object.keys(V.find(o => o.host === h).postcodes);
for (const h of G.here) if (!pc(h).some(p => /^CT20 /.test(p))) throw new Error('no Folkestone postcode for ' + h);
for (const h of ['sleepinggiantmedia.co.uk', 'kitandcaboodlemedia.com', 'seadragon.digital']) if (!pc(h).some(p => /^CT20 /.test(p))) throw new Error('no Folkestone postcode for ' + h);
// Folkestone queries from our own Search Console export (28 Oct 2026)
const csv = fs.readFileSync(path.join(__dirname, '..', '..', 'gsc-exports', 'performance-2026-10-28', 'Queries.csv'), 'utf8').trim().split(/\r?\n/).slice(1).map(l => { const m = l.match(/^(.*),(\d+),(\d+),([\d.]*)%?,?([\d.]*)$/); return m ? { q: m[1], c: +m[2], i: +m[3], p: +m[5] } : null; }).filter(x => x && /folkestone/i.test(x.q));
const QI = csv.reduce((s, x) => s + x.i, 0), QC = csv.reduce((s, x) => s + x.c, 0);
if (csv.length !== 12 || QI !== 1325 || QC !== 0) throw new Error('query data changed ' + csv.length + ' ' + QI + ' ' + QC);
// ---- images
const css = '<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;width:1280px;background:#FAF5EF}svg{display:block;width:1280px;height:auto}</style></head><body>';
const proofDir = path.join(root, 'public', 'images', 'blog', 'proof'); const imgDir = path.join(root, 'public', 'images', 'blog');
const render = (name, svg) => { const html = path.join(__dirname, `table-${SLUG}-${name}.html`); fs.writeFileSync(html, css + svg + '</body></html>'); const out = path.join(proofDir, `${SLUG}-${name}.png`); execFileSync(process.execPath, [path.join(__dirname, 'capture-page.js'), 'file:///' + html.replace(/\\/g, '/').replace(/ /g, '%20'), out, '--w=1280', '--h=1500', '--sel=body'], { stdio: 'pipe' }); return fs.readFileSync(out).readUInt32BE(20); };
const hero = D.cards({ title: 'Who is really in Folkestone?', h: 560, qLabel: 'What we found', items: [
  { big: '2/11', t: 'results show a Folkestone address', d: 'Sites ranking for Folkestone SEO searches', q: 'Read 1 November 2026' },
  { big: '6/6', t: 'listed companies re-checked', d: 'Address and Companies House, with notes', q: 'Three caveats added' },
  { big: String(QI).replace(/\B(?=(\d{3})+$)/g, ','), t: 'Folkestone impressions, 0 clicks', d: 'Our own searches in 3 months', q: 'Mostly via our Kent page' }] });
D0.hero(SLUG, hero);
const hWhere = render('where', D.bars({ w: 1200, title: 'Where the 11 results say they are based', max: 11, rows: [{ t: 'A Folkestone address', v: 2, text: '2 of 11', color: TEAL }, { t: 'An address in another town', v: 6, text: '6 of 11', color: AMBER }, { t: 'No address, or the page would not load', v: 3, text: '3 of 11', color: RED }] }));
const hRecheck = render('recheck', D.timeline({ lw: 230, title: 'The six companies, re-checked on 1 November 2026', items: [
  { d: 'Sleeping Giant', t: 'Company 06705616, incorporated 2008', c: 'Registered office and site address both in Folkestone' },
  { d: 'Whitefish', t: 'Same address as Whitefish Investments Ltd', c: 'Name search found no company called Whitefish Marketing' },
  { d: 'Kit and Caboodle', t: 'Company 08649895, incorporated 2013', c: 'The Workshop, Tontine Street, matches the site' },
  { d: 'Dzines Digital', t: 'Company 10051032, incorporated 2016', c: 'Registered at The Workshop, Tontine Street' },
  { d: 'Sea Dragon', t: 'Site address in Folkestone, CT20 3WR', c: 'A company of that name is registered in Ashford' },
  { d: 'Bamboo Folkestone', t: 'Site address The Workshop, CT20 1JU', c: 'No company found under that name' }] }));
const hQ = render('queries', D.lollipop({ w: 1200, title: 'Our Folkestone searches: average position', max: 70, limit: 10, limitLabel: 'page 1 ends at 10', rows: csv.sort((a, b) => a.p - b.p).map(x => ({ t: x.q, v: x.p, text: 'position ' + x.p + '  ·  ' + x.i + ' impressions', color: x.p <= 10 ? TEAL : x.p <= 20 ? AMBER : RED })) }));
const L0 = require('./post-assets-lib.js');
fs.writeFileSync(path.join(__dirname, `infographic-${SLUG}.html`), L0.infographicHtml({ title: 'Folkestone SEO: 11 Results Checked', sub: 'Sites ranking for Folkestone SEO searches, Google UK, 1 November 2026', leftTitle: 'Where the 11 sites say they are', leftTag: 'Address read from each site', max: 11,
  bars: [{ label: 'A Folkestone address', sub: 'on the site', n: 2 }, { label: 'Another town', sub: 'on the site', n: 6 }, { label: 'No address or unreadable', sub: 'on the pages we read', n: 3 }, { label: 'Our six, re-checked', sub: 'address and register', n: 6 }],
  rightTitle: 'Our four checks', rightTag: 'For every company', items: [{ t: 'Address on the site', s: 'a real postcode' }, { t: 'Companies House', s: 'matching company' }, { t: 'Services page', s: 'what they offer' }, { t: 'Caveats', s: 'name or office mismatch' }], big: '2 of 11', noteHtml: 'of the sites ranking for Folkestone SEO <em>show a Folkestone address</em>.' }));
execFileSync(process.execPath, [path.join(__dirname, 'capture-page.js'), 'file:///' + path.join(__dirname, `infographic-${SLUG}.html`).split(path.sep).join('/').replace(/ /g, '%20'), path.join(imgDir, `infographic-${SLUG}.png`), '--w=1376', '--h=790'], { stdio: 'pipe' });
const infoFig = `<figure style="margin:20px 0;"><img src="/images/blog/infographic-${SLUG}.png" alt="Infographic of where 11 sites that rank for Folkestone SEO say they are based: 2 show a Folkestone address, 6 an address in another town and 3 none, with our six listed companies re-checked and our four checks" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>`;
const fig = (n, h, alt) => `<figure style="margin:20px 0;"><img src="/images/blog/proof/${SLUG}-${n}.png" alt="${alt}" width="1280" height="${h}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>`;
const L = (u, t) => `<a href="${u}" target="_blank" rel="nofollow noopener">${t}</a>`;
// ---- content
const newTop = `
<h2>What We Found Checking 11 Folkestone SEO Results (November 2026 Update)</h2>
${fig('where', hWhere, 'Chart of where 11 sites that rank for Folkestone SEO say they are based: 2 show a Folkestone address, 6 an address in another town and 3 no address or an unreadable page')}
<p>We re-checked this guide on 1 November 2026. First we read the pages of the ${SERP.length} sites that rank in Google UK for "seo agency folkestone", "seo services folkestone" and "local seo folkestone". Only ${G.here.length} showed a Folkestone address on their own pages. ${G.elsewhere.length} showed an office in another town, such as Sheffield, Chester, Twickenham, Dorking, Maidstone, Southampton or Gillingham, and ${G.none.length} showed no address or would not load. A page called "SEO Folkestone" does not make a company a Folkestone company.</p>
<p>The six companies below are different. We checked each again on 1 November: five still show a Folkestone address on their own site, and the sixth is registered at a Folkestone address, with the notes below on three names that did not match the register exactly.</p>
${fig('recheck', hRecheck, 'Timeline of the six Folkestone SEO companies re-checked on 1 November 2026 with Companies House notes: three match a registered company at a Folkestone address, one shares an address with a differently named company, one is registered in Ashford and one has no company under its name')}
<h2>What People in Folkestone Search For</h2>
${fig('queries', hQ, 'Chart of our own Folkestone search queries by average Google position in the three months to 28 October 2026, led by folkestone seo agency and seo agency folkestone at 4.6, with 1,325 impressions and no clicks')}
<p>In the three months to 28 October 2026, our own Search Console shows ${csv.length} Folkestone searches that displayed our site, ${QI.toLocaleString('en-US')} impressions in total and no clicks. The best positions were "folkestone seo agency" and "seo agency folkestone" (both about 4.6), "folkestone seo services" (6.2) and "seo services folkestone" (8.6). Most of those impressions came through our roundup of Kent companies, not this page, which is why we updated this guide to answer them directly. People search for an agency, a company, a consultant, a specialist or an expert, and they mean one thing: someone local who can show real work. Google's help page on ${L('https://support.google.com/business/answer/7091', 'local ranking')} says local results depend on relevance, distance and prominence, so a business with a Folkestone address is closer to the searcher than one in another county.</p>
${infoFig}
`;
const note = {
  'Sleeping Giant Media': 'Companies House lists Sleeping Giant Media Limited, number 06705616, incorporated 23 September 2008, with a registered office at the Civic Centre in Folkestone, which matches the address on its own site.',
  'Whitefish Marketing': 'Its site gives The Workshop, 32-40 Tontine Street as its registered office. A name search returned Whitefish Investments Ltd, number 06404639, at the same address, but no company called Whitefish Marketing, so ask which legal entity you would contract with.',
  'Kit and Caboodle Media': 'Companies House lists Kit and Caboodle Media Ltd, number 08649895, incorporated 14 August 2013, at The Workshop, 32-40 Tontine Street, matching its site.',
  'Dzines Digital': 'Companies House lists Dzines Digital Ltd, number 10051032, incorporated 8 March 2016, on the third floor of The Workshop, 32-40 Tontine Street. The pages we read did not show a postal address, so the register is the proof here.',
  'Sea Dragon Web Design': 'Its site gives 4 Major Close, Folkestone, CT20 3WR. A name search returned Sea Dragon Ltd, number 10550099, registered in Ashford, which may or may not be the same business, so confirm the legal entity and where the work is done.',
  'Bamboo Folkestone': 'Its site gives The Workshop, 32-40 Tontine Street, CT20 1JU. A name search found no company called Bamboo Folkestone, so it may trade under another name: ask for the legal entity on your quote.'
};
// ---- patch blog.json
const f = path.join(root, 'data', 'blog.json'); const b = JSON.parse(fs.readFileSync(f, 'utf8')); const p = b.find(x => x.slug === SLUG); if (!p) throw new Error('post missing');
if (p.content.includes('Folkestone SEO Results (November 2026 Update)')) throw new Error('already refreshed');
let c = p.content;
const firstH2 = c.search(/<h2[^>]*>\s*Why Folkestone/i); if (firstH2 < 0) throw new Error('first h2 not found');
c = c.slice(0, firstH2) + newTop + '\n' + c.slice(firstH2);
for (const [name, text] of Object.entries(note)) { const re = new RegExp(`(<h[23][^>]*>\\s*\\d+\\.\\s*${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*<\\/h[23]>)`); if (!re.test(c)) { console.log('heading not found for', name); continue; } c = c.replace(re, (m) => m + `\n<p><strong>Re-checked 1 November 2026:</strong> ${text}</p>`); }
c = c.replace(/Last updated: September 2026/, 'Last updated: November 2026');
p.content = c; p.title = 'Top 6 SEO Companies in Folkestone, Kent: Verified for 2026';
p.excerpt = 'We checked 11 sites ranking for Folkestone SEO: only 2 show a Folkestone address. Six local companies re-checked on 1 Nov 2026 with Companies House notes.';
p.date = '2026-11-01'; p.heroDiagram = `/images/blog/diagram-${SLUG}.svg`;
fs.writeFileSync(f, JSON.stringify(b, null, 2), 'utf8'); console.log('refreshed', SLUG, 'title', p.title.length, 'excerpt', p.excerpt.length, 'words', p.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
