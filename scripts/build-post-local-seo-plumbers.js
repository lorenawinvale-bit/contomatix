// Builds the "local seo for plumbers" post + assets. node scripts/build-post-local-seo-plumbers.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'local-seo-for-plumbers';
const A = require('../../keyword-research/maps-plumber-kent-wa-agg.json');
const exp = { organic: 45, sponsored: 2, rated: 45, avg: 4.8, min: 3.9, max: 5, five: 14, below45: 3, open24: 33, website: 42, noWebsite: 3, book: 16, plumbName: 41, kentName: 7, cat: 45, home: 37, deeper: 5, utm: 16, noAddr: 7 };
for (const k of Object.keys(exp)) if (A[k] !== exp[k]) throw new Error('data changed: ' + k + ' ' + A[k]);
const pc = (a, b) => Math.round(a / b * 100);
const ge45 = A.organic - A.below45;
console.log(JSON.stringify(A));

// ---------- assets
L.donut(SLUG, ['LOCAL SEO', 'FOR PLUMBERS'], [['Set Up the', 'Service Area'], 'Get the Profile Basics Right', 'Point to Local Pages', ['Earn and Answer', 'Reviews'], 'Track Calls and Clicks']);
L.cover(SLUG, { badge: 'REAL MAPS CHECK', search: 'local seo for plumbers', card: 'Maps: plumber in Kent, WA',
  lines: [`Listings checked: ${A.organic}`, `Category Plumber: ${A.cat} of ${A.organic}`, `Open 24 hours shown: ${A.open24}`, `Site link is homepage: ${A.home} of ${A.website}`, `Average rating: ${A.avg}`],
  last: 'Rank on more than the category', big: `${A.cat} of ${A.organic}`, k1: 'share the same category,', k2: 'so it cannot set you apart', title: 'Local SEO for Plumbers', sub: 'Checked against 45 real Maps listings' });
fs.writeFileSync(path.join(__dirname, 'infographic-local-seo-plumbers.html'), L.infographicHtml({
  title: 'Local SEO for Plumbers: 45 Listings Compared', sub: 'One Google Maps search, plumber in Kent, WA, on 10 October 2026',
  leftTitle: 'What the listings show', leftTag: `Number of the ${A.organic} organic listings`, max: A.organic,
  bars: [{ label: 'Same primary category', sub: 'Plumber', n: A.cat }, { label: 'Rated 4.5 or higher', sub: 'rating barely separates them', n: ge45 }, { label: 'Open 24 hours shown', sub: 'as displayed by Google', n: A.open24 }, { label: 'Website link is homepage', sub: `of ${A.website} with a website`, n: A.home }, { label: 'No street address', sub: 'service-area style', n: A.noAddr }],
  rightTitle: 'Where plumbers can differ', rightTag: 'Things in your control', items: [
    { t: 'Service areas set up properly', s: 'up to 20, address hidden if you visit customers' }, { t: 'Real-world business name', s: 'no extra keywords or taglines' },
    { t: 'Link to a page for the area', s: 'not just the homepage' }, { t: 'Reviews and honest hours', s: 'ratings and reviews feed prominence' }],
  big: `${A.cat} of ${A.organic}`, noteHtml: `listings use the same <em>primary category</em>, so your category cannot separate you. Name, links, reviews and distance do the work.` }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-plumbers.html'), L.tableHtml({ title: 'plumber in Kent, WA: what 45 organic Maps listings showed', sub: 'Google Maps search captured 10 October 2026, 07:50 UTC. Sponsored results excluded. Counts are listings, not businesses ranked.',
  head: ['What we counted', 'Listings'], lastBold: false,
  rows: [['Organic listings captured', A.organic], ['Primary category shown as Plumber', A.cat], ['Name contains "plumb"', A.plumbName], ['Name contains "Kent"', A.kentName], ['Rated 4.5 or higher', ge45], ['Rated exactly 5.0', A.five], ['Shows "Open 24 hours"', A.open24], ['Has a Website button', A.website], ['Website link goes to the homepage', A.home], ['Website link goes to an inner page', A.deeper], ['Website link carries UTM tags', A.utm], ['Has a Book online button', A.book], ['Shows no street address', A.noAddr]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>We searched Google Maps for "plumber in Kent, WA" and counted the ${A.organic} organic listings that came back. All ${A.cat} of them used the same primary category, Plumber. That one fact explains why <strong>local SEO for plumbers</strong> cannot be won on setup alone: everyone has ticked the same box, so the listings that rank are separated by other things.</p>

<p>This guide uses that real snapshot to show what plumbers' Google Business Profiles actually look like, what Google says drives local ranking, and how a plumbing company can set up its profile, website and reviews. It also covers how home service companies, which share the same service-area setup, can use the same method. If you want the wider trades view, our guide to <a href="/blog/local-seo-for-contractors">local SEO for contractors</a> goes into the surrounding topics.</p>

<h2>How Google Decides Which Plumbers Appear</h2>
<p>Google names three factors for local results: relevance, distance and prominence. Relevance is how well a profile matches what someone searched for. Distance is how far the business is from the searcher, or from the location Google believes they are in. Prominence is how well known a business is, which Google ties to how many websites link to it and how many reviews it has.</p>
<p>Google also says, in the same help article, that there is no way to request or pay for a better local ranking. Distance is not something you can change. Relevance and prominence are where the work is, and they are exactly where a plumber's profile, site and reviews matter.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-business-profile-local-ranking-factors.jpg" alt="Google Business Profile Help section Understand factors that determine local ranking, describing relevance, distance and prominence and noting that you cannot pay for a better local ranking" width="1608" height="1048" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>What 45 Real Plumber Listings Look Like</h2>
<p>On 10 October 2026 we ran one Maps search, "plumber in Kent, WA", scrolled through the whole results list and recorded every organic listing. We left out the sponsored ones. Here is what the ${A.organic} listings showed.</p>
<p>Some patterns are worth reading closely.</p>
<ul>
<li><strong>The category does not separate anyone.</strong> All ${A.cat} listings show Plumber as the primary category. Choosing it is necessary, but it gives you no edge.</li>
<li><strong>Ratings are tightly bunched.</strong> The average was ${A.avg}, the range ran from ${A.min} to ${A.max}, and ${ge45} of ${A.organic} were rated 4.5 or higher. ${A.five} of them were rated exactly 5.0. A rating alone will not set you apart, so review volume and recency matter more than the star figure.</li>
<li><strong>Most advertise round-the-clock hours.</strong> ${A.open24} of ${A.organic} display Open 24 hours. That is what Google showed, and we did not verify any of it.</li>
<li><strong>Most website buttons go to the homepage.</strong> Of the ${A.website} listings with a website, ${A.home} link to the homepage and only ${A.deeper} to an inner page.</li>
<li><strong>Few tag their profile link.</strong> ${A.utm} of ${A.website} website links carried UTM parameters, which is how a business can see profile visits as their own source in analytics.</li>
<li><strong>Some skip the address.</strong> ${A.noAddr} of the ${A.organic} listings showed no street address, which fits a service-area setup.</li>
</ul>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-maps-plumber-kent-wa-results.jpg" alt="Google Maps results list for the search plumber in Kent WA showing two sponsored plumbers followed by organic listings with ratings, categories, hours and website and directions buttons" width="806" height="1330" style="max-width:440px;width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Set Up Your Profile as a Service Area Business</h2>
<p>Most plumbers go to the customer, which Google calls a service-area business. In its help pages it uses plumbers as its example: a business that visits or delivers to customers directly and does not serve them at its own address. For these businesses Google advises keeping a single profile for the central location with a designated service area, and hiding the address from customers.</p>
<p>You can set up to 20 service areas, based on cities, postal codes or other areas, and Google guidelines say a service area should not stretch beyond about two hours of driving from your base. A radius around the business cannot be used. Pick the places you genuinely serve and can reach, and add them honestly. Home service companies such as HVAC, electricians and cleaners work the same way, so this setup applies across the trade.</p>

<h2>The Business Profile Basics to Get Right</h2>
<p>Google's guidelines are specific about several fields where trades commonly slip. The infographic below compares what the listings show with what is in your control.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-local-seo-for-plumbers.png" alt="Infographic of 45 plumber listings from one Google Maps search: all 45 share the Plumber category, 42 rated 4.5 or higher, 33 show Open 24 hours, and 37 website links go to the homepage, with four things plumbers control" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Name.</strong> Use your real-world name as it appears on your storefront, website and stationery. Do not add taglines, hours, phone numbers or service descriptions. A name that contains the word plumbing is normal, since ${A.plumbName} of ${A.organic} listings have one. We did not check anyone's registered name, so we draw no conclusion about those listings.</li>
<li><strong>Categories.</strong> Use as few as possible, choosing ones that complete the sentence "this business is a". Do not use categories as a place to add keywords.</li>
<li><strong>Hours.</strong> Give your regular customer-facing hours. If you do take emergency calls at all hours, listing 24 hours is accurate. If you do not, do not copy the pattern from the results above.</li>
<li><strong>Website and phone.</strong> Provide a website and a local number that represent your location. Avoid links or numbers that redirect elsewhere.</li>
</ul>
<p>Read Google's <a href="https://support.google.com/business/answer/3038177" target="_blank" rel="nofollow noopener">Business Profile guidelines</a> in full before you edit your name or categories.</p>

<h2>Point Your Profile Link at a Page That Fits</h2>
<p>Only ${A.deeper} of the ${A.website} linked websites sent the profile visitor to an inner page. For a plumber that is a missed chance. A visitor who finds you for "emergency plumber" lands better on a page that covers emergency calls and the areas you serve than on a homepage that has to cover everything. If you cover several service areas, one honest page per area that gives real local detail can help. Create pages that differ in substance, not a set of near-copies. Google's <a href="https://developers.google.com/search/docs/essentials/spam-policies" target="_blank" rel="nofollow noopener">spam policies</a> describe doorway abuse as pages made to rank for similar queries that lead visitors to a less useful destination, including multiple pages for particular cities that funnel to one page.</p>
<p>Add UTM parameters to the profile's website link, such as a source of google and a medium of organic with a campaign named for the profile. That makes calls and visits from the profile visible in your analytics, and ${A.utm} of ${A.website} in our sample already do it.</p>

<h2>Reviews: What Matters More Than the Star Rating</h2>
<p>Google states that more reviews and positive ratings can help local ranking. Since our sample shows ratings bunched near the top, the useful differences are how many reviews you have, how recent they are and whether you reply. Ask every satisfied customer at the point of completion, make the link easy, and answer both praise and complaints in plain language. We could not capture review counts from the list view, so we make no claim about how many the listings had.</p>

<h2>Photos and Fresh Information</h2>
<p>Google tells businesses to keep their profile complete and accurate and says complete, accurate information makes a profile more likely to appear in local results. For a plumber that means more than the phone number. Add photos of real work and of your vehicles and team, so a customer can tell who is arriving at the door. Keep services, hours and service areas current. If you stop offering a service or change your area, update the profile the same day, because a wrong detail costs you the call and the review that would have followed.</p>

<h2>A 30-Day Plan for a Plumbing Company</h2>
<p>If you are starting from a rough profile, this order gets the foundations right before you spend time on anything else.</p>
<ol>
<li><strong>Week 1: audit the profile.</strong> Check the name against your real-world name, trim the categories, confirm hours and phone number, set your service areas and hide the address if you do not serve customers there.</li>
<li><strong>Week 2: fix the link and the page.</strong> Point the website button at the page that best matches the service, add UTM tags, and make sure that page states your services, areas and a clear way to call or book.</li>
<li><strong>Week 3: start a review routine.</strong> Decide who asks, when and how. Send the link by text at the end of every job, and reply to every review you already have.</li>
<li><strong>Week 4: set up tracking.</strong> Record calls, direction requests and website clicks from the profile each week, and check map position from a grid of points in your service area so you have a baseline.</li>
</ol>
<p>After the first month, repeat the audit quarterly and compare against the baseline. Local rankings move slowly, so look for direction over several weeks and not for a result in a few days.</p>

<h2>Mistakes to Avoid</h2>
<ul>
<li><strong>Adding keywords to the business name.</strong> Google's guidelines say extra information in the name is not permitted. Keep the real name.</li>
<li><strong>Listing areas you cannot reach.</strong> Service areas are meant for places you genuinely serve, and Google caps them and advises against stretching beyond about two hours of driving.</li>
<li><strong>Claiming 24-hour service you do not offer.</strong> Callers who find nobody answering at 2 a.m. leave the review you do not want.</li>
<li><strong>Leaving the website button on the homepage.</strong> It makes the visitor do the work of finding the right page.</li>
<li><strong>Ignoring reviews.</strong> A reply is visible to every future customer, and Google says helpful replies can help your business stand out.</li>
<li><strong>Cloning city pages.</strong> Near-identical pages for each town are the pattern Google's doorway abuse policy describes.</li>
</ul>

<h2>Track Calls, Clicks and Map Position</h2>
<p>Local results change with the searcher's position, so a single check tells you little. Use the profile's own performance data for calls, direction requests and website clicks, and track map position across a grid of points around your service area. Our free <a href="/tools/geo-grid-rank-planner">geo-grid rank planner</a> builds those check points so you can record where you appear from different spots.</p>

<h2>Limits of This Snapshot</h2>
<ul>
<li>It is one search, in one city, at one moment. Local results differ by searcher location, time and device.</li>
<li>We captured the list view only, so review counts and photos are not included.</li>
<li>We counted what Google displayed. We did not verify hours, addresses or registered business names.</li>
<li>Counts describe listings in one result set. They do not show which factor made any listing rank where it did.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>In our Maps check, all ${A.cat} of ${A.organic} plumber listings used the same primary category, so it cannot differentiate you.</li>
<li>Google ranks local results on relevance, distance and prominence, and says you cannot pay for a better position.</li>
<li>Set up as a service-area business with up to 20 service areas and a hidden address if you visit customers.</li>
<li>Use your real name, a few accurate categories and honest hours.</li>
<li>Link your profile to a page that fits the service or area, and tag the link so you can measure it.</li>
<li>Reviews, their volume and your replies carry more weight than a 4.8 against a 4.9.</li>
</ul>
<p>If you want a plumber's profile and site reviewed against this checklist, Contomatix can do it. <a href="/contact">Get in touch</a> and we will take a look.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is local SEO for plumbers?</summary>
<p>It is the work of making a plumbing business show up in Google Maps and local search results for people nearby. It centres on the Google Business Profile, the website pages that support it and customer reviews.</p>
</details>
<details>
<summary>How do plumbers rank in the Google local pack?</summary>
<p>Google bases local results on relevance, distance and prominence. Relevance comes from complete, accurate profile information, distance is how far you are from the searcher, and prominence reflects how many websites link to you and how many reviews you have.</p>
</details>
<details>
<summary>Can I pay Google to rank higher in Maps organically?</summary>
<p>No. Google says there is no way to request or pay for a better local ranking. Paid placements appear separately as sponsored results.</p>
</details>
<details>
<summary>Should a plumber hide their address on Google?</summary>
<p>If you visit customers and do not serve them at your address, Google's guidelines say a service-area business should hide the address and set service areas instead.</p>
</details>
<details>
<summary>How many service areas can I add to my profile?</summary>
<p>Up to 20, based on cities, postal codes or other areas you serve. A radius around your business cannot be used.</p>
</details>
<details>
<summary>Is it okay to put "plumbing" in my business name?</summary>
<p>Yes, if it is part of your real-world name as used on your storefront, website and stationery. Google does not allow adding extra keywords, taglines or service descriptions that are not part of the name.</p>
</details>
<details>
<summary>Should I list 24-hour hours?</summary>
<p>Only if you genuinely take calls at all hours. Google asks for your regular customer-facing hours, so match the profile to what you actually offer.</p>
</details>
<details>
<summary>Do I need a separate page for each city I serve?</summary>
<p>Not necessarily. Create a page for an area only when you have real, useful detail for it. Near-identical pages created to rank for similar queries fall under Google's doorway abuse policy.</p>
</details>
<details>
<summary>What local SEO steps work for home service companies in general?</summary>
<p>The same setup applies to HVAC, electricians and cleaners: a service-area profile with an honest name and categories, pages that fit the services and areas, and a steady flow of reviews.</p>
</details>
</div>
`;
const title = 'Local SEO for Plumbers: A Verified 2026 Playbook (Real Data)';
const excerpt = 'Local SEO for plumbers checked against 45 real Google Maps listings: how rankings work, service-area setup, profile basics, links and reviews.';
const post = { slug: SLUG, title, category: 'Local SEO', author: 'Umaira Liaquat', date: '2026-10-10', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
