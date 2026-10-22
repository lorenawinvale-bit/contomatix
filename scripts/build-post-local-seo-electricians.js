// Builds the "local seo for electricians" post + assets. node scripts/build-post-local-seo-electricians.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'local-seo-for-electricians';
const M = require('../../keyword-research/maps-electrician-denver-2026-10-13.json').listings;
const S = require('../../keyword-research/electrician-sites-denver-2026-10-13.json');
const ok = S.filter(o => o.status === 200);
const c = f => ok.filter(f).length;
const rev = M.map(m => m.n).sort((a, b) => a - b);
const med = rev[Math.floor(rev.length / 2)];
const D = { listings: M.length, h24: M.filter(m => m.h24).length, r5: M.filter(m => m.r === 5).length, r45: M.filter(m => m.r >= 4.5).length, min: Math.min(...M.map(m => m.r)), med, under50: rev.filter(n => n < 50).length, over300: rev.filter(n => n >= 300).length,
  fetched: ok.length, blocked: S.length - ok.length, ld: c(o => o.ldPresent), elec: c(o => o.electricianType), area: c(o => o.areaServed), titleCity: c(o => o.titleDenver), h1: c(o => o.h1Electric), tel: c(o => o.telLink), lic: c(o => o.license), ins: c(o => o.insured), emerg: c(o => o.emergency), agg: c(o => o.ldAggRating), areaLinks: c(o => o.areaPageLinks > 0), canon: c(o => o.canonical), noH1: c(o => o.h1Count === 0) };
console.log(JSON.stringify(D));
const pc = (a, b) => Math.round(a / b * 100);

// ---------- assets
L.donut(SLUG, ['LOCAL SEO', 'FOR ELECTRICIANS'], [['Set Up the', 'Business Profile'], 'Build Service Pages', ['Add Area Pages', 'and Schema'], 'Show Licence and Cover', 'Earn Reviews, Track Calls']);
L.cover(SLUG, { badge: 'REAL MAPS CHECK', search: 'local seo for electricians', card: 'Maps: electrician in Denver, CO',
  lines: [`Listings checked: ${D.listings}`, `Rated 4.5 or higher: ${D.r45}`, `Shows Open 24 hours: ${D.h24}`, `Median reviews: ${D.med}`, `Sites using Electrician schema: ${D.elec} of ${D.fetched}`],
  last: 'Win on pages and proof', big: `${D.elec} of ${D.fetched}`, k1: 'sites use Electrician', k2: 'structured data', title: 'Local SEO for Electricians', sub: `Checked against ${D.listings} real Maps listings` });
fs.writeFileSync(path.join(__dirname, 'infographic-local-seo-electricians.html'), L.infographicHtml({
  title: `Local SEO for Electricians: ${D.listings} Listings Compared`, sub: 'One Google Maps search, electrician in Denver, CO, 13 October 2026',
  leftTitle: 'What the listings and sites show', leftTag: `Listings: ${D.listings} on Maps, ${D.fetched} sites fetched`, max: D.listings,
  bars: [{ label: 'Rated 4.5 or higher', sub: 'ratings barely separate them', n: D.r45 }, { label: 'Shows Open 24 hours', sub: 'as displayed by Google', n: D.h24 }, { label: 'Fewer than 50 reviews', sub: 'many strong profiles are small', n: D.under50 },
    { label: 'Site uses Electrician schema', sub: `of ${D.fetched} sites fetched`, n: D.elec }, { label: 'Page mentions a licence', sub: `of ${D.fetched} sites fetched`, n: D.lic }],
  rightTitle: 'Where electricians can differ', rightTag: 'Things in your control', items: [
    { t: 'A real service-area set-up', s: 'address hidden if you visit customers' }, { t: 'A page per service and area', s: 'not one page for everything' },
    { t: 'Electrician structured data', s: 'name, phone, address, area served' }, { t: 'Licence and cover on the page', s: 'proof people look for' }],
  big: `${D.r45} of ${D.listings}`, noteHtml: `listings are rated <em>4.5 or higher</em>, so rating cannot set you apart. Your pages, profile and proof can.` }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-electricians-maps.html'), L.tableHtml({ title: 'electrician in Denver, CO: what the Maps listings showed', sub: 'Google Maps search captured 13 October 2026. Sponsored results excluded. Counts are listings, not businesses ranked.',
  head: ['What we counted', 'Listings'], lastBold: false,
  rows: [['Organic listings captured', D.listings], ['Rated 4.5 or higher', D.r45], ['Rated exactly 5.0', D.r5], ['Lowest rating shown', D.min.toFixed(1)], ['Shows "Open 24 hours"', D.h24], ['Fewer than 50 reviews', D.under50], ['300 or more reviews', D.over300], ['Median review count', D.med]] }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-electricians-sites.html'), L.tableHtml({ title: `What the ${D.fetched} fetched websites showed`, sub: `Pages behind the Maps website button, read 13 October 2026. ${D.blocked} of ${D.listings} did not return a readable page, so they are left out.`,
  head: ['On-page signal', 'Sites'], lastBold: false,
  rows: [['Page title mentions Denver', `${D.titleCity} of ${D.fetched}`], ['First H1 mentions electric', `${D.h1} of ${D.fetched}`], ['Click-to-call phone link', `${D.tel} of ${D.fetched}`], ['Structured data present', `${D.ld} of ${D.fetched}`], ['Electrician schema type', `${D.elec} of ${D.fetched}`], ['areaServed in structured data', `${D.area} of ${D.fetched}`], ['Mentions a licence', `${D.lic} of ${D.fetched}`], ['Mentions insured or bonded', `${D.ins} of ${D.fetched}`], ['Mentions emergency or 24/7', `${D.emerg} of ${D.fetched}`], ['Links to a service-area or city page', `${D.areaLinks} of ${D.fetched}`]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>In one Google Maps search for electricians in Denver, ${D.r45} of the ${D.listings} organic listings were rated 4.5 or higher and ${D.h24} showed Open 24 hours. That is the starting point for <strong>local SEO for electricians</strong>: when ratings and hours look the same, the work that separates one electrician from another is the profile set-up, the pages behind the website button and the proof a homeowner can see.</p>

<p>We captured the listings, then fetched the sites behind them to see what each actually does on the page. This guide shares what we found, adds the Google rules that matter for a trade business, and ends with a checklist. Related reading: our <a href="/blog/local-seo-for-plumbers">local SEO for plumbers</a> and <a href="/blog/local-seo-for-contractors">local SEO for contractors</a> guides cover the neighbouring trades.</p>

<h2>What We Checked</h2>
<p>We searched Google Maps for electrician in Denver, CO, scrolled the results until no more loaded and kept the organic listings. After removing duplicates and one sponsored copy, ${D.listings} businesses remained. For each, we read the rating, review count and whether the card shows Open 24 hours. We then fetched the page behind each website button and recorded on-page signals such as the title, the first H1, structured data and whether a licence is mentioned. ${D.fetched} pages returned a readable response, and ${D.blocked} did not, so the site figures use ${D.fetched}. We do not name businesses.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/local-seo-electricians-maps-counts.png" alt="Table of Google Maps results for electrician in Denver CO: listings captured, rated 4.5 or higher, rated 5.0, shows Open 24 hours, review count bands and median" width="1280" height="575" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>What the Maps Listings Show</h2>
<ul>
<li><strong>Ratings do not separate them.</strong> ${D.r45} of ${D.listings} listings are rated 4.5 or higher, and ${D.r5} show a perfect 5.0. The lowest rating we saw was ${D.min.toFixed(1)}.</li>
<li><strong>Review counts vary widely.</strong> The median is ${D.med} reviews. ${D.under50} listings have fewer than 50, and ${D.over300} have 300 or more. A small profile can sit among large ones.</li>
<li><strong>Open 24 hours is common.</strong> ${D.h24} of ${D.listings} cards show it. If you work emergency calls, say so truthfully, because the hours must match what a customer gets when they ring.</li>
</ul>

<h2>What the Websites Do</h2>
<p>The sites tell a more useful story, because this is where an electrician has control.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/local-seo-electricians-site-signals.png" alt="Table of on-page signals across the fetched electrician websites in Denver: page title mentions Denver, Electrician schema type, areaServed, licence mention and links to service-area pages" width="1280" height="680" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Most put the city in the title.</strong> ${D.titleCity} of ${D.fetched} page titles mention Denver, so doing the same earns you no edge. Leaving it out would be a gap.</li>
<li><strong>Structured data is common, but the right type is not.</strong> ${D.ld} of ${D.fetched} use structured data and ${D.elec} use the Electrician type. ${D.area} include an areaServed value.</li>
<li><strong>Proof is mostly present.</strong> ${D.lic} of ${D.fetched} mention a licence and ${D.ins} mention being insured or bonded, so a visitor expects to see it.</li>
<li><strong>Area pages are the gap.</strong> Fewer than half, ${D.areaLinks} of ${D.fetched}, link to a service-area or city page from the page we fetched. That is where a service-area business can add depth.</li>
</ul>

<h2>Step 1: Set Up the Business Profile Correctly</h2>
<p>Google's Business Profile guidelines ask you to use your real-world business name, without added keywords or taglines. If you travel to customers and do not serve them at your address, you can set up as a service-area business, add the areas you serve and hide your address. Pick the most accurate primary category and add services that match what you do, such as panel upgrades, EV charger installation or rewiring. Keep hours accurate and mark special hours for holidays. Our <a href="/blog/local-seo-for-small-business">local SEO for small business</a> guide walks through the full profile set-up.</p>

<h2>Step 2: Build a Page for Each Service</h2>
<p>One page that lists every service rarely ranks for any of them. Give each core service its own page, with the job explained, the typical process, what affects price and photos of real work. Use plain terms people search, such as EV charger installation, electrical panel upgrade, ceiling fan installation and whole-home rewiring. Link each service page from the homepage and from related pages.</p>

<h2>Step 3: Add Service-Area Pages That Are Not Doorway Pages</h2>
<p>A page for each area you serve can help, but only if it carries something specific to the area. Mention real neighbourhoods, local housing stock and common issues, such as older wiring in historic homes, and show jobs you completed there. A page that repeats the same text with a different town name adds little. If you cannot write something true and different for an area, serve it from the main service page instead.</p>

<h2>Step 4: Use Electrician Structured Data</h2>
<p>Schema.org has an Electrician type for this kind of business. Mark up your name, phone number, address, opening hours, website and service areas, and keep every value identical to your Business Profile. Only mark up reviews that are visible on the page and that you are allowed to show. Structured data helps search engines understand the page. It is not a ranking switch, so treat it as hygiene, not a tactic.</p>

<h2>Step 5: Show Licence, Insurance and Real Work</h2>
<p>Customers let electricians into their homes and panels, so proof matters. State your licence number and issuing authority, your insurance, and any manufacturer or trade accreditations you hold. Add named staff, vehicle and job photos, and before-and-after examples. This also matches how Google describes helpful content: first-hand experience, shown.</p>

<h2>Step 6: Reviews, Calls and Tracking</h2>
<p>Ask for reviews after each completed job and reply to all of them. Reviews that mention the service and the area carry useful context for readers. Track calls, direction requests and website clicks from the profile, then compare them with calls from the website. Put click-to-call on every page, because the ${D.tel} of ${D.fetched} sites that already have it set the baseline.</p>

<h2>Common Mistakes</h2>
<ul>
<li><strong>Keyword-stuffed business name.</strong> It breaks the profile guidelines and can lead to suspension.</li>
<li><strong>Claiming 24 hours when you do not answer.</strong> Hours must match reality.</li>
<li><strong>One page for every service and town.</strong> It dilutes the topic of each page.</li>
<li><strong>Structured data that disagrees with the profile.</strong> Keep name, phone and address the same everywhere.</li>
<li><strong>No licence on the site.</strong> Homeowners look for it first.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-local-seo-for-electricians.png" alt="Infographic: local SEO for electricians, comparing ${D.listings} Denver Maps listings and what to do about it" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>A Service Page Outline for Electricians</h2>
<p>A service page that earns calls is more than a heading and a phone number. Use the same outline for each core service so that no page is missing something a customer needs before they ring.</p>
<ul>
<li><strong>The job in plain words.</strong> One short paragraph on what the service is and when a homeowner needs it, such as replacing an old fuse box or adding a dedicated circuit for an EV charger.</li>
<li><strong>Signs you need it.</strong> A short list of symptoms, such as tripping breakers, flickering lights or warm outlets, written the way customers describe them.</li>
<li><strong>How the job works.</strong> The steps from first call to finished work, including inspection, permits where they apply and testing at the end.</li>
<li><strong>What affects the price.</strong> Factors, not a fixed quote: the age of the wiring, access, the size of the panel and the distance of the run. Say whether you give free estimates.</li>
<li><strong>Proof.</strong> Your licence number, insurance, a named electrician and two or three real job photos.</li>
<li><strong>Areas served.</strong> The towns you cover, linked to their area pages where you have written them.</li>
<li><strong>Questions and answers.</strong> Three to five real questions customers ask, with direct answers.</li>
<li><strong>A clear next step.</strong> Click-to-call and a short form, visible without scrolling on a phone.</li>
</ul>

<h2>Long-Tail Searches Electricians Can Target</h2>
<p>Head terms such as electrician near me are crowded and hard to win. Smaller searches carry clearer intent and are easier to rank for. Examples worth a section or a page when you offer the service include emergency electrician after hours, electrical panel upgrade cost, EV charger installation for a home, whole-home surge protector installation, GFCI outlet installation, ceiling fan wiring, aluminium wiring repair, knob and tube rewiring, electrical inspection for home buyers and landlord electrical safety checks. Check each against your own Search Console queries and your Business Profile search terms, then build pages for the ones that match work you want more of. Our <a href="/blog/local-keyword-research">local keyword research guide</a> shows how to find them without a paid tool.</p>

<h2>Handling Emergency and 24-Hour Work</h2>
<p>Emergency calls are the highest-value local searches for an electrician, and they are also where trust is lost fastest. If you show Open 24 hours, a person must be able to reach someone at any hour. Put the emergency number at the top of every page, explain what counts as an emergency, and say what to do before you arrive, such as switching off the main breaker if it is safe to do so. If you do not offer a true 24-hour service, set normal hours and list a separate emergency line only when you answer it. Honest hours also protect your reviews, because the most common complaint about emergency trades is that nobody picked up.</p>

<h2>A 90-Day Plan</h2>
<ul>
<li><strong>Days 1 to 30.</strong> Fix the foundation: confirm name, address or service areas, phone, hours, primary category and services on the profile, then make the same details match on the website and in structured data. Add the licence and insurance block to every page.</li>
<li><strong>Days 31 to 60.</strong> Write or rewrite the three service pages that earn the most revenue using the outline above, and add two real job write-ups with photos. Start a simple review request after each job.</li>
<li><strong>Days 61 to 90.</strong> Add area pages for the two or three areas where you do most work, each with something true and specific. Review calls and direction requests from the profile, compare them with the previous quarter and decide where to go next.</li>
</ul>

<h2>How Seasonality Changes the Work</h2>
<p>Electrical demand moves through the year. Heating and cooling loads, storms, holiday lighting, home sales and new appliances all create peaks. Plan content around them: a page about generator inlet installation before storm season, a guide to pre-sale inspections in spring and one on panel capacity before a heat pump or EV purchase. Keep service pages evergreen, and use dated posts for the seasonal angle. When you report results, compare the same month last year, because comparing a storm month with a quiet one will mislead you.</p>

<h2>Answering Reviews and Using Photos</h2>
<p>Reply to every review in plain language, thank the customer by first name where they gave it, and mention the work when it helps, such as a panel upgrade or a repair. Answer a negative review calmly, state what you will do and move the detail offline. For photos, use real pictures of finished work, your van and your team, taken on a phone in good light. Avoid stock images of generic tradespeople, since visitors and Google both see through them. A handful of fresh photos every month is more useful than a large batch once a year.</p>

<h2>Limits of This Snapshot</h2>
<ul>
<li>One search in one city on one day. Maps results vary by location and device.</li>
<li>${D.blocked} of ${D.listings} sites did not return a readable page to our fetch, so site figures cover ${D.fetched}.</li>
<li>We read the page behind the website button, which is often a homepage or a city page, not the whole site.</li>
<li>A tick on a signal shows presence, not quality.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Ratings and 24-hour labels look alike across electricians, so they will not set you apart.</li>
<li>Set up the profile as a service-area business if you travel to customers, with your real name.</li>
<li>Build a page per service, and add area pages only with local, true detail.</li>
<li>Use Electrician structured data that matches your profile.</li>
<li>Show licence, insurance and real work on the page.</li>
</ul>
<p>Want a local SEO plan for an electrical business? <a href="/contact">Get in touch</a> and we will review your profile and pages.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is local SEO for electricians?</summary>
<p>It is the work of making an electrical business visible for local searches such as electrician near me, through the Google Business Profile, service and area pages, structured data, reviews and citations.</p>
</details>
<details>
<summary>How do electricians rank in Google Maps?</summary>
<p>Google says local results depend on relevance, distance and prominence. Complete and accurate profile information, reviews and the strength of your website all feed those factors.</p>
</details>
<details>
<summary>Should an electrician use a service-area business set-up?</summary>
<p>If you travel to customers and do not serve them at your address, yes. You can list the areas you serve and hide your address, but your profile must still reflect a real business.</p>
</details>
<details>
<summary>Do electricians need a separate page for each town?</summary>
<p>Only when you can say something true and specific about that area. Pages that repeat the same text with a different town name add little.</p>
</details>
<details>
<summary>What schema type should an electrician use?</summary>
<p>Schema.org has an Electrician type. Use it with your name, phone, address, hours and service areas, and keep the values identical to your Business Profile.</p>
</details>
<details>
<summary>Is it fine to show Open 24 hours?</summary>
<p>Only if you really answer and attend calls at any hour. Hours on the profile should match what a customer experiences.</p>
</details>
<details>
<summary>How many reviews does an electrician need?</summary>
<p>There is no fixed number. In the Denver listings we read, the median was ${D.med}, and some small profiles with under 50 reviews sat among much larger ones, so steady, genuine reviews matter more than a target.</p>
</details>
<details>
<summary>Should I show my licence number on my website?</summary>
<p>Yes. Show the number and the issuing authority, since it is the proof visitors check first.</p>
</details>
<details>
<summary>How do I track calls from local SEO?</summary>
<p>Use the call and direction data in your Business Profile, a call-tracking number or event tracking on click-to-call links, and compare them over several months.</p>
</details>
</div>
`;
const title = 'Local SEO for Electricians: What 29 Real Listings Reveal';
const excerpt = `Local SEO for electricians, checked against ${D.listings} real Denver Maps listings and the sites behind them: profile, pages, schema and proof.`;
const post = { slug: SLUG, title, category: 'Local SEO', author: 'Umaira Liaquat', date: '2026-10-13', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
