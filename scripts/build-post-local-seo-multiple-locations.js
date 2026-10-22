// Builds the "local seo for multiple locations" post + assets. node scripts/build-post-local-seo-multiple-locations.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'local-seo-for-multiple-locations';
// One Google Maps search, "urgent care in Seattle, WA", organic listings only, read 12 Oct 2026 07:00 UTC. Brands are not named.
const raw = fs.readFileSync(path.join(root, '..', 'keyword-research', 'maps-urgent-care-seattle-2026-10-12.txt'), 'utf8');
const j = JSON.parse(raw.split('js: ')[1].split('\nsaved')[0]);
const seen = new Set(); const org = j.cards.filter(c => !c.sp && !seen.has(c.n) && seen.add(c.n));
const dom = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
const by = {}; org.forEach(c => { const d = dom(c.w); if (d) (by[d] = by[d] || []).push(c); });
const multi = Object.values(by).filter(a => a.length > 1);
const D = { listings: org.length, domains: Object.keys(by).length, multiDomains: multi.length, multiListings: multi.reduce((s, a) => s + a.length, 0),
  distinct: multi.reduce((s, a) => s + new Set(a.map(c => c.w.split('?')[0].replace(/\/+$/, ''))).size, 0), single: Object.values(by).filter(a => a.length === 1).length, biggest: Math.max(...multi.map(a => a.length)) };
console.log(JSON.stringify(D));
const exp = { listings: 38, domains: 15, multiDomains: 8, multiListings: 31, distinct: 30, single: 7, biggest: 12 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k);
const share = Math.round(D.multiListings / D.listings * 100);

// ---------- assets
L.donut(SLUG, ['LOCAL SEO', 'MULTIPLE LOCATIONS'], [['One Profile', 'Per Location'], 'A Page Per Location', ['Consistent Name,', 'Local Phone'], 'Reviews and Reporting', 'Scale With Bulk Tools']);
L.cover(SLUG, { badge: 'REAL MAPS CHECK', search: 'local seo for multiple locations', card: 'Maps: urgent care in Seattle, WA',
  lines: [`Organic listings read: ${D.listings}`, `Sites with 2+ locations: ${D.multiDomains} of ${D.domains}`, `Listings from those sites: ${D.multiListings}`, `With their own page: ${D.distinct} of ${D.multiListings}`, `Largest single brand: ${D.biggest} listings`],
  last: 'One page per location', big: `${D.distinct} of ${D.multiListings}`, k1: 'multi-location listings', k2: 'link to their own page', title: 'Local SEO for Multiple Locations', sub: 'What 38 real Maps listings show' });
fs.writeFileSync(path.join(__dirname, 'infographic-local-seo-multiple-locations.html'), L.infographicHtml({
  title: 'Multiple Locations: What 38 Listings Show', sub: 'One Google Maps search, urgent care in Seattle, WA, 12 October 2026',
  leftTitle: 'How the listings break down', leftTag: 'Number of organic listings', max: D.listings,
  bars: [{ label: 'Organic listings read', sub: 'all with a website button', n: D.listings }, { label: 'From multi-location brands', sub: `${D.multiDomains} sites with 2 or more`, n: D.multiListings }, { label: 'Linking to their own page', sub: 'a distinct URL per location', n: D.distinct }, { label: 'From single-location sites', sub: 'one listing per site', n: D.single }, { label: 'Most from one brand', sub: 'largest set of locations', n: D.biggest }],
  rightTitle: 'The multi-location basics', rightTag: 'From Google’s guidelines', items: [
    { t: 'One profile per location', s: 'never duplicate a location' }, { t: 'A real, staffed location', s: 'virtual offices are not eligible' },
    { t: 'A local number and page', s: 'not a central line or the homepage' }, { t: 'Bulk tools at 10 or more', s: 'upload, then request verification' }],
  big: `${D.distinct} of ${D.multiListings}`, noteHtml: `listings from multi-location brands sent visitors to <em>their own location page</em>. The homepage was the exception.` }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-multiple-locations.html'), L.tableHtml({ title: 'urgent care in Seattle, WA: how the organic listings are built', sub: 'Google Maps search read on 12 October 2026. Sponsored results excluded. Brands are not named.',
  head: ['What we counted', 'Count'], lastBold: false,
  rows: [['Organic listings read', D.listings], ['Distinct websites behind them', D.domains], ['Websites with two or more listings', D.multiDomains], ['Listings from those multi-location websites', `${D.multiListings} (${share}%)`], ['Of those, listings with a distinct page of their own', `${D.distinct} of ${D.multiListings}`], ['Websites with a single listing', D.single], ['Most listings from one website', D.biggest]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>In one Google Maps search for urgent care in Seattle, ${D.multiListings} of the ${D.listings} organic listings came from brands with more than one location, and ${D.distinct} of those ${D.multiListings} sent the visitor to a page built for that specific clinic. That is the pattern behind <strong>local SEO for multiple locations</strong>: one profile and one page per location, kept consistent under a single brand, and managed at scale.</p>

<p>This guide uses that real snapshot and Google's own rules for chains to show how the setup works, what to put on a location page, when bulk tools become available and how to report on many locations without drowning in numbers. If you run a single location, start with our guide to <a href="/blog/local-seo-for-small-business">local SEO for small business</a>.</p>

<h2>What Multi-Location SEO Is</h2>
<p>Multi-location SEO is the work of making each branch of a business visible for the searches near it, while keeping the brand coherent. It sits on three layers: a Google Business Profile for every location, a page on your site for every location, and consistent details such as name, phone number and categories across both. Get one layer wrong and the others cannot compensate.</p>

<h2>What 38 Real Listings Look Like</h2>
<p>We ran one Maps search, "urgent care in Seattle, WA", scrolled the full list and recorded every organic listing, without naming any brand.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/local-seo-multiple-locations-maps-counts.png" alt="Table counting 38 organic Google Maps listings for urgent care in Seattle: 15 websites, 8 with two or more locations, 31 listings from them and 30 with their own page" width="1280" height="520" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Most listings belong to chains.</strong> ${share} percent of the listings came from the ${D.multiDomains} websites that appeared more than once, and one brand alone accounted for ${D.biggest}.</li>
<li><strong>Each location tends to have its own page.</strong> ${D.distinct} of ${D.multiListings} multi-location listings pointed at a distinct URL. In one case two listings shared the same page.</li>
<li><strong>The names carry the place.</strong> Listings often end in a neighbourhood or street, which helps people tell branches apart.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-maps-urgent-care-seattle-results.jpg" alt="Google Maps results list for urgent care in Seattle WA showing separate listings for different branches of the same clinic brands, each with its own rating, address, hours and Book online button" width="806" height="1375" style="max-width:440px;width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>One Profile Per Location</h2>
<p>Google's guidelines say each physical location gets its own profile, and that you should not create more than one profile for a location, in one account or several. A location has to be real and operational: a virtual office is not eligible, and a co-working space must have signage, receive customers and be staffed during business hours by your own staff.</p>
<p>For chains, locations in the same country should share one name, with exceptions for consistently used sub-brands, and they should share the category that best represents the business. Use a local phone number where you can, under the direct control of the business, and a website address that represents the individual location, not one that redirects somewhere else.</p>
<p>Read the full text in Google's <a href="https://support.google.com/business/answer/3038177" target="_blank" rel="nofollow noopener">Business Profile guidelines</a>, including the section for chains, departments and practitioners.</p>

<h2>A Page for Every Location</h2>
<p>The Business Profile points to your site, and the page it points to decides how useful the visit is. A strong location page contains information that is true only of that branch:</p>
<ul>
<li>The address, a map link, directions and parking or transit notes.</li>
<li>Hours, including holiday exceptions, and a local phone number.</li>
<li>The services actually offered there, and the people who work there.</li>
<li>Photos of that location and, where you have them, reviews from its customers.</li>
<li>Links to related locations and back to your location hub.</li>
</ul>
<p>Make each page genuinely different. Google's spam policies describe doorway abuse as pages made to rank for similar queries that lead users to a less useful destination, including multiple pages aimed at cities that funnel to one place. A page that is the same template with the town name swapped is exactly that risk. If a branch has nothing distinct to say, it may not need a page of its own.</p>

<h2>Local SEO for Franchises and Chains</h2>
<p>Franchises add an ownership layer. The brand owns the standard, and each franchisee runs a location, so decide who controls what: who answers reviews, who edits the profile, who owns the page. Without that, you get inconsistent hours, abandoned profiles and duplicates. Write the rules down, keep a single list of locations with their store codes, and review it on a schedule.</p>

<h2>Bulk Management at 10 or More Locations</h2>
<p>Google's help pages describe bulk verification for larger businesses. The eligibility line is that the spreadsheet has 10 or more profiles from the same business, that it lists every profile you manage, and that the business is not a service-area business. Duplicate, suspended or disabled profiles do not count towards the ten.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-bulk-verification-10-locations.jpg" alt="Google Business Profile Help page Verify Business Profiles in bulk, Step 1, saying the spreadsheet must have 10 or more profiles from the same business and must include every profile you manage" width="1181" height="520" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Under ten locations, add and verify them one at a time. Over ten, the upload route saves time, but it makes accuracy more important, because an error repeated across a spreadsheet is repeated across every profile.</p>

<h2>Reviews, Reporting and Local SEO Metrics</h2>
<p>Many locations produce many numbers. Decide which few matter and report them per location and in total.</p>
<ul>
<li><strong>Visibility:</strong> where each location appears for its main search, checked from points around the branch. Our <a href="/tools/geo-grid-rank-planner">geo-grid rank planner</a> builds those check points.</li>
<li><strong>Engagement:</strong> calls, direction requests and website clicks from each profile.</li>
<li><strong>Reviews:</strong> count, average rating and response time per location.</li>
<li><strong>Page performance:</strong> impressions, clicks and conversions for each location page in Search Console and analytics.</li>
</ul>
<p>Review the weakest locations first, because a shared template or a missing detail often explains several at once. For help finding which pages to improve, see our guide to a <a href="/blog/content-audit-seo">content audit for SEO</a>.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-local-seo-for-multiple-locations.png" alt="Infographic of 38 organic Google Maps listings for urgent care in Seattle: 31 from multi-location brands, 30 linking to their own location page, with four multi-location basics from Google's guidelines" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Site Structure for Many Locations</h2>
<p>Give the locations a home. A hub page at a stable address lists all branches, grouped by region, and links to each location page. Each location page links back to the hub and to its nearest neighbours. Keep the hierarchy shallow so that every location is a couple of clicks from the homepage, and list location pages in your sitemap. If you have many, splitting them into their own sitemap lets you see their indexing separately in Search Console.</p>

<h2>A Location Page Outline You Can Reuse</h2>
<p>A template saves time, as long as the content inside it is real for each branch. This outline works for most multi-location businesses.</p>
<ol>
<li><strong>Heading and intro.</strong> The service and the place, with one sentence that only fits this branch.</li>
<li><strong>Key details block.</strong> Address, phone, hours, directions and an embedded map, kept in plain text so it can be read and copied.</li>
<li><strong>Services here.</strong> The services this branch offers, linked to the main service pages, with differences from other branches stated.</li>
<li><strong>People and proof.</strong> The team, local photos and reviews from this location's customers.</li>
<li><strong>Getting here.</strong> Parking, transit and landmarks, written by someone who knows the area.</li>
<li><strong>Questions.</strong> Three or four questions that patients or customers of this branch actually ask.</li>
<li><strong>Nearby locations.</strong> Links to the closest branches and back to the hub.</li>
</ol>
<p>Add structured data for the location only if it matches what is visible on the page, and keep the address and phone in the markup identical to the page and the profile.</p>

<h2>A 90-Day Rollout</h2>
<p>Do not try to fix every location at once. Sequence the work so that each stage unblocks the next.</p>
<ul>
<li><strong>Days 1 to 30: clean the foundation.</strong> Build the master list of locations, find and merge duplicate profiles, and confirm name, categories, hours and phone numbers for each.</li>
<li><strong>Days 31 to 60: build the pages.</strong> Create the hub and the location pages, point every profile's website link at its own page and add tracking tags to those links.</li>
<li><strong>Days 61 to 90: operate and measure.</strong> Set up review replies, start per-location reporting and review the weakest branches.</li>
</ul>

<h2>When a Location Closes or Moves</h2>
<p>Locations change, and the web should follow. If a branch closes, mark its profile as closed so searchers are not sent to an empty address, and point its page to the nearest open location with a permanent redirect so visitors and links are not lost. If a branch moves, update the profile, the page and the markup together, and keep the old address in the page history if customers might still go there. Left alone, stale locations are the commonest source of poor reviews at chains.</p>

<h2>Common Mistakes</h2>
<ul>
<li><strong>Duplicate profiles.</strong> Two profiles for one location, often created by different people at different times.</li>
<li><strong>Every profile pointing at the homepage.</strong> Visitors then have to find their branch themselves.</li>
<li><strong>Copied location pages.</strong> The same text with a different town name adds nothing and invites the doorway problem.</li>
<li><strong>A central call centre number.</strong> Google asks for a local number under the business's direct control where possible.</li>
<li><strong>No owner for reviews.</strong> Unanswered reviews at a branch reflect on the whole brand.</li>
</ul>

<h2>Limits of This Snapshot</h2>
<ul>
<li>It is one search, in one city, in one category, on one day. Another category may look different.</li>
<li>We matched listings to websites by domain, so two sites run by one owner would count as separate brands.</li>
<li>The snapshot shows what is visible. It does not show why any listing ranks where it does.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>In our Maps check, ${share} percent of listings came from multi-location brands, and ${D.distinct} of ${D.multiListings} of those linked to a page of their own.</li>
<li>Google wants one profile per real, staffed location, with a consistent name and a local number.</li>
<li>Give every location a distinct page with details only that branch has, and avoid template clones.</li>
<li>Bulk verification applies at 10 or more profiles and excludes service-area businesses.</li>
<li>Report a few metrics per location and look at the weakest ones first.</li>
</ul>
<p>If you manage several locations and want a setup that scales, Contomatix can audit your profiles and pages. <a href="/contact">Get in touch</a> and we will take a look.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>How do I do local SEO for multiple locations?</summary>
<p>Create one Business Profile per real location, build a distinct page for each on your site, keep the name, categories and contact details consistent, and manage reviews and reporting per location.</p>
</details>
<details>
<summary>Should every location have its own page?</summary>
<p>Yes, when the location has details that are specific to it, such as address, hours, services and staff. In our Maps snapshot, 30 of 31 multi-location listings pointed to a distinct page.</p>
</details>
<details>
<summary>Can I use one Google Business Profile for several locations?</summary>
<p>Google's guidelines say each physical location gets its own profile and that you should not create more than one profile for a location. Service-area businesses follow separate rules.</p>
</details>
<details>
<summary>Do all locations need the same business name?</summary>
<p>Locations in the same country should share one name, except for consistently used sub-brands or storefront names, according to Google's guidelines for chains.</p>
</details>
<details>
<summary>Can I use a central phone number for every location?</summary>
<p>Google advises a local number under the business's direct control wherever possible, not a central call centre line.</p>
</details>
<details>
<summary>When can I bulk verify locations?</summary>
<p>Google's bulk verification page says the spreadsheet must have 10 or more profiles from the same business and must include every profile you manage. Service-area businesses are not eligible.</p>
</details>
<details>
<summary>How do I avoid duplicate content across location pages?</summary>
<p>Put details that are true only of that branch on each page: address, hours, services, staff, photos and local reviews. If a location has nothing distinct, link to a regional page instead of cloning one.</p>
</details>
<details>
<summary>What is the difference between local SEO for franchises and for a single business?</summary>
<p>Franchises add an ownership layer. You need clear rules on who controls each profile, page and review reply, plus a single list of locations to prevent duplicates and inconsistent details.</p>
</details>
<details>
<summary>What should I measure for local SEO across many locations?</summary>
<p>Map visibility per location, calls and direction requests from each profile, review count and rating, and the performance of each location page. Look at the weakest locations first.</p>
</details>
</div>
`;
const title = 'Local SEO for Multiple Locations: A Verified 2026 Playbook';
const excerpt = 'Local SEO for multiple locations checked on 38 real Maps listings: one profile and page per location, Google rules for chains, bulk tools and reporting.';
const post = { slug: SLUG, title, category: 'Local SEO', author: 'Hamza Siddiqui', date: '2026-10-12', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
