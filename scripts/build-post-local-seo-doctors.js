// Builds the "local seo for doctors" post + assets. node scripts/build-post-local-seo-doctors.js [--write]
// Data: Google Maps "family doctor in Raleigh, NC" read 14 Oct 2026 + the pages behind 47 listing links, fetched the same day.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'local-seo-for-doctors';
const M = require('../../keyword-research/maps-family-doctor-raleigh-2026-10-14.json').stats;
const S = require('../../keyword-research/doctor-sites-raleigh-2026-10-14.json');
const ok = S.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { fetched: S.length, ok: ok.length, ld: c(o => o.ldPresent), med: c(o => o.medicalType), ldHours: c(o => o.ldHours), tel: c(o => o.telLink), newP: c(o => o.newPatients), ins: c(o => o.insurance), portal: c(o => o.portal), book: c(o => o.booking), tele: c(o => o.telehealth), hoursT: c(o => o.hoursText), titleCity: c(o => o.titleRaleigh), canon: c(o => o.canonical) };
const exp = { fetched: 47, ok: 36, ld: 27, med: 5, ldHours: 2, tel: 25, newP: 13, ins: 27, portal: 25, book: 24, tele: 11, hoursT: 25, titleCity: 19 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify({ M, D }));
const pc = (a, b) => Math.round(a / b * 100);

// ---------- assets
L.donut(SLUG, ['LOCAL SEO', 'FOR DOCTORS'], [['Set Up Practice and', 'Doctor Profiles'], 'Build Trust Pages', ['Show Insurance and', 'New Patients'], 'Add Medical Schema', 'Handle Reviews Safely']);
L.cover(SLUG, { badge: 'REAL MAPS CHECK', search: 'local seo for doctors', card: 'Maps: family doctor in Raleigh, NC',
  lines: [`Listings checked: ${M.listings}`, `From 3 health systems: ${M.top3Domains}`, `Doctor-named listings: ${M.practitionerNamed}`, `Median reviews: ${M.medianReviews}`, `Sites with a medical schema type: ${D.med} of ${D.ok}`],
  last: 'Trust pages beat templates', big: `${D.med} of ${D.ok}`, k1: 'practice sites use a', k2: 'medical schema type', title: 'Local SEO for Doctors', sub: `Checked against ${M.listings} real Maps listings` });
fs.writeFileSync(path.join(__dirname, 'infographic-local-seo-doctors.html'), L.infographicHtml({
  title: `Local SEO for Doctors: ${M.listings} Listings Compared`, sub: 'One Google Maps search, family doctor in Raleigh, NC, 14 October 2026',
  leftTitle: 'What the listings and sites show', leftTag: `Listings: ${M.listings} on Maps, ${D.ok} pages read`, max: M.listings,
  bars: [{ label: 'Rated 4.5 or higher', sub: 'ratings vary more than for trades', n: M.r45 }, { label: 'Fewer than 20 reviews', sub: 'many small practices', n: M.under20 }, { label: 'From 3 health systems', sub: `of ${M.domains} websites`, n: M.top3Domains }, { label: 'Named for one doctor', sub: 'practitioner listings', n: M.practitionerNamed }, { label: 'No website listed', sub: 'no website button', n: M.noSite }],
  rightTitle: 'Where practices can differ', rightTag: 'Things in your control', items: [
    { t: 'Practice and doctor profiles', s: 'follow the practitioner rules' }, { t: 'Insurance and new-patient info', s: 'on the page, kept current' },
    { t: 'Medical structured data', s: 'Physician or MedicalClinic' }, { t: 'Safe review replies', s: 'never confirm a patient' }],
  big: `${M.top3Domains} of ${M.listings}`, noteHtml: `listings came from just <em>three health systems</em>. An independent practice wins with profile, page and trust detail.` }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-doctors-maps.html'), L.tableHtml({ title: 'family doctor in Raleigh, NC: what the Maps listings showed', sub: 'Google Maps search captured 14 October 2026. Sponsored results excluded. Counts are listings, not practices ranked.',
  head: ['What we counted', 'Listings'], lastBold: false,
  rows: [['Organic listings captured', M.listings], ['Rated 4.5 or higher', M.r45], ['Rated below 4.0', M.below4], ['Lowest rating shown', M.minRating.toFixed(1)], ['Fewer than 20 reviews', M.under20], ['Median review count', M.medianReviews], ['Name is a doctor or practitioner', M.practitionerNamed], ['Websites behind the listings', M.domains], ['Listings from the 3 largest websites', M.top3Domains]] }));
fs.writeFileSync(path.join(__dirname, 'table-local-seo-doctors-sites.html'), L.tableHtml({ title: `What the ${D.ok} readable practice pages showed`, sub: `Pages behind the Maps website button, ${D.fetched} fetched on 14 October 2026. ${D.fetched - D.ok} did not return a readable page and are left out.`,
  head: ['On-page signal', 'Pages'], lastBold: false,
  rows: [['Mentions insurance', `${D.ins} of ${D.ok}`], ['Phone link (click to call)', `${D.tel} of ${D.ok}`], ['Opening hours in the page text', `${D.hoursT} of ${D.ok}`], ['Patient portal or booking system mentioned', `${D.portal} of ${D.ok}`], ['Online appointment option', `${D.book} of ${D.ok}`], ['Title mentions Raleigh', `${D.titleCity} of ${D.ok}`], ['Says it accepts new patients', `${D.newP} of ${D.ok}`], ['Telehealth mentioned', `${D.tele} of ${D.ok}`], ['Structured data present', `${D.ld} of ${D.ok}`], ['A medical schema type', `${D.med} of ${D.ok}`], ['Opening hours in structured data', `${D.ldHours} of ${D.ok}`]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>In one Google Maps search for a family doctor in Raleigh, ${M.top3Domains} of the ${M.listings} organic listings came from just three health-system websites, and only ${D.med} of the ${D.ok} practice pages we could read used a medical schema type. That is the picture behind <strong>local SEO for doctors</strong>: big systems fill the map pack, independent practices have fewer reviews, and the difference is made by profile set-up, trust pages and a clear route to an appointment.</p>

<p>We captured the listings, then fetched the pages behind them to see what each practice actually puts in front of a patient. This guide shares the findings, adds Google's rules for practitioner profiles and ends with a checklist. For a neighbouring vertical, see our guide on <a href="/blog/seo-for-dentists-2026">SEO for dentists</a>.</p>

<h2>What We Checked</h2>
<p>We searched Google Maps for family doctor in Raleigh, NC, scrolled until no more results loaded and kept the ${M.listings} organic listings after removing duplicates and one sponsored result. For each we read the rating, review count, category, name and website. We then fetched ${D.fetched} of the linked pages, ${D.ok} of which returned a readable page, and checked for signals patients look for: insurance information, phone links, hours, booking, new-patient status and structured data. We do not name practices. Health systems with many listings share one site, so we fetched each site's main location or home page once.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/local-seo-doctors-maps-counts.png" alt="Table of Google Maps results for family doctor in Raleigh NC: 93 listings, 52 rated 4.5 or higher, 19 rated below 4.0, median 26 reviews, 27 practitioner-named listings and 38 from the three largest websites" width="1280" height="620" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>What the Maps Listings Show</h2>
<ul>
<li><strong>Health systems dominate.</strong> ${M.top3Domains} of ${M.listings} listings, ${pc(M.top3Domains, M.listings)} percent, came from the three largest websites, and the biggest single site accounted for ${M.biggestDomain}. Another ${M.singleDomains} sites each had just one listing.</li>
<li><strong>Ratings spread more than for trades.</strong> ${M.r45} listings are rated 4.5 or higher, but ${M.below4} are below 4.0 and the lowest is ${M.minRating.toFixed(1)}. A good rating does stand out here.</li>
<li><strong>Review counts are small.</strong> The median is ${M.medianReviews} reviews, and ${M.under20} listings have fewer than 20. Only ${M.over500} have 500 or more.</li>
<li><strong>Many listings are individual doctors.</strong> ${M.practitionerNamed} are named for a person, such as a doctor with a credential, which follows Google's practitioner rules.</li>
<li><strong>No listing shows 24-hour opening.</strong> Unlike trades, a family practice is a scheduled service, so hours and appointment access matter more than being open all day.</li>
</ul>

<h2>What the Practice Websites Show</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/local-seo-doctors-site-signals.png" alt="Table of on-page signals across 36 readable family doctor websites in Raleigh: insurance mentioned 27, phone link 25, hours in text 25, patient portal 25, online appointment 24, title mentions Raleigh 19, new patients 13, telehealth 11, medical schema type 5" width="1280" height="735" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>The basics are common.</strong> ${D.ins} of ${D.ok} mention insurance, ${D.tel} have a click-to-call phone link and ${D.hoursT} show hours in the text.</li>
<li><strong>Booking is common, new-patient status is not.</strong> ${D.book} of ${D.ok} offer an online appointment, but only ${D.newP} say they are accepting new patients. A patient searching for a new doctor often needs exactly that answer.</li>
<li><strong>Structured data is present but generic.</strong> ${D.ld} of ${D.ok} use structured data, and only ${D.med} use a medical type such as Physician or MedicalClinic. Only ${D.ldHours} include opening hours in the markup.</li>
<li><strong>Telehealth is mentioned by ${D.tele} of ${D.ok}.</strong> Where offered, it deserves its own clear mention.</li>
</ul>

<h2>Step 1: Set Up the Practice and Doctor Profiles Correctly</h2>
<p>Google's Business Profile guidelines treat an individual practitioner as a public-facing professional with their own customer base, and doctors are named in that definition.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-business-profile-individual-practitioners.png" alt="Google Business Profile Help guidelines on individual practitioners: doctors are individual practitioners, the organization creates a profile for the location separate from the practitioner, and the practitioner profile title includes only the practitioner name" width="880" height="250" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Several doctors at one address.</strong> The organisation has a profile for the location, and each public-facing doctor can have their own. The doctor's profile title includes only the doctor's name, not the organisation's.</li>
<li><strong>A solo doctor in a branded organisation.</strong> Google's guidance is generally to share one profile with the organisation, so do not duplicate it.</li>
<li><strong>One profile per doctor.</strong> A practitioner should not have multiple profiles to cover specialisations.</li>
<li><strong>Staff do not get profiles.</strong> Support staff should not create their own.</li>
</ul>
<p>Our guide to <a href="/blog/local-seo-for-multiple-locations">local SEO for multiple locations</a> covers how to keep the location, practice and practitioner records consistent.</p>

<h2>Step 2: Build Pages Patients Can Trust</h2>
<p>A medical site needs more than a homepage. Build four page types and link them to each other.</p>
<ul>
<li><strong>A practice page for each location.</strong> Address, hours, parking, phone and a map, with the services offered there.</li>
<li><strong>A page for each doctor.</strong> Photo, credentials, training, languages, special interests and which locations they see patients at. Several listings in our sample landed on a doctor's own page, which matches the doctor-named profile.</li>
<li><strong>A page for each major service.</strong> Annual physicals, chronic care, vaccinations and sports exams, written in plain language by or reviewed by a clinician, with the reviewer named.</li>
<li><strong>A patient information page.</strong> Insurance accepted, new-patient steps, forms, portal login and what to bring.</li>
</ul>

<h2>Step 3: Say Plainly Who You Are Accepting and How They Pay</h2>
<p>Patients choose on practical questions. State whether you accept new patients, which insurance plans you take and how to check, whether you offer same-day visits and whether telehealth is available. Keep it current, because a wrong statement costs trust and phone time. Only ${D.newP} of ${D.ok} pages in our sample state new-patient status, so the practice that does is easy to choose.</p>

<h2>Step 4: Use Medical Structured Data</h2>
<p>Schema.org has types for this sector, including Physician and MedicalClinic. Mark up the practice or doctor name, address, phone, hours, website and the medical specialty where it applies, and keep every value the same as the Business Profile. Only ${D.med} of ${D.ok} sites in our sample used one of these types, which makes it a small, low-risk way to be clearer to search engines. Do not mark up reviews you cannot show on the page.</p>

<h2>Step 5: Make Booking and Hours Obvious</h2>
<p>Put the phone number and the booking route at the top of every page. Show real hours, including lunch closures and holidays, in the page text and in the profile. If you use a booking or portal system, link to it directly. ${D.book} of ${D.ok} pages in our sample offer an online appointment, so this is the expected standard, not a differentiator.</p>

<h2>Step 6: Handle Reviews and Privacy Carefully</h2>
<p>Ask satisfied patients for reviews, in line with the platform's rules and without offering incentives. When you reply, avoid confirming that the reviewer was a patient or sharing anything about their care, since that can disclose protected health information. A safe reply thanks the person, states your general standards and invites them to contact the practice. Have your compliance lead approve a template.</p>

<h2>Step 7: Report What Matters</h2>
<p>Track calls, direction requests, appointment requests, new-patient inquiries and the pages that produced them, compared with the same period last year. Our <a href="/blog/local-seo-reporting">local SEO reporting guide</a> gives a six-block report to adapt, and the earlier <a href="/blog/local-seo-for-electricians">local SEO for electricians</a> study shows the same method on a trade.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-local-seo-for-doctors.png" alt="Infographic: local SEO for doctors, comparing 93 Raleigh Maps listings and the profile, page, schema and review steps a practice can control" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>A Doctor Page Template</h2>
<p>A doctor page is often the first page a patient reads, and it is also the landing page for a profile named for that doctor. Use the same structure for every clinician so the pages are complete and easy to compare.</p>
<ul>
<li><strong>Name and credentials</strong> in the heading, such as the full name followed by MD, DO or NP.</li>
<li><strong>A recent photo</strong> and a short, human introduction in the first person or a calm third person.</li>
<li><strong>Specialties and interests,</strong> written as the patient would describe them, such as diabetes care, women's health or sports injuries.</li>
<li><strong>Training and board certification,</strong> with the licensing or certifying body named so that a patient can check.</li>
<li><strong>Locations and days</strong> where the doctor sees patients, linked to each location page.</li>
<li><strong>Languages</strong> spoken and whether the doctor is accepting new patients.</li>
<li><strong>A booking link</strong> for this doctor, and the phone number for the location.</li>
</ul>

<h2>Service Page Outline and Medical Review</h2>
<p>Health content is held to a high bar. For each service page, say what it is, who it is for, what happens at a visit, what to prepare and when to seek urgent care instead. Add a short note stating who reviewed the page and when, and link to the clinician's page. Cite primary sources such as public health agencies where you use figures, and keep the language plain. Avoid promises of outcomes, and do not publish claims that you cannot support.</p>

<h2>Local Searches Practices Can Target</h2>
<p>Head terms such as family doctor near me are crowded, with the map pack dominated by large systems. Smaller, specific searches are more winnable and show clearer intent: new patient family doctor, same day appointment primary care, annual physical near me, sports physical for school, DOT physical, pediatric and adult primary care, primary care that accepts a specific insurance plan, Saturday primary care, Spanish-speaking family doctor and telehealth visit for a refill. Check each against your own Search Console queries and the search terms shown in your Business Profile performance data, then give the best ones their own page or section. Our <a href="/blog/local-keyword-research">local keyword research guide</a> shows how to do this without a paid tool.</p>

<h2>Telehealth, Walk-In and Urgent Care Overlap</h2>
<p>Patients do not always know which kind of visit they need, and search results mix primary care, walk-in clinics and urgent care in the same results. Be clear on each page about what you offer, such as scheduled primary care, same-day sick visits or telehealth, and what you do not, such as emergencies. A short line explaining when to call emergency services avoids a poor patient experience and shows care. If you offer telehealth, give it a page of its own that explains who can use it, what to prepare and which states you can serve.</p>

<h2>A 90-Day Plan for a Small Practice</h2>
<ul>
<li><strong>Days 1 to 30.</strong> Audit the practice and doctor profiles against the practitioner rules, then fix names, categories, hours and services. Make sure insurance, new-patient status and booking are on the website and the profile and that the details agree.</li>
<li><strong>Days 31 to 60.</strong> Build or rewrite a page for each doctor and for the three highest-volume services, with named review. Add medical structured data and click-to-call to every page.</li>
<li><strong>Days 61 to 90.</strong> Set up a compliant review request after visits, write reply templates and start a monthly report on calls, direction requests and appointment requests against the same period last year.</li>
</ul>

<h2>Common Mistakes</h2>
<ul>
<li><strong>Duplicate practitioner profiles.</strong> One doctor, several profiles, breaks the guidelines.</li>
<li><strong>Organisation name in the doctor's profile title.</strong> Use only the practitioner's name where the practice has its own profile.</li>
<li><strong>Out-of-date insurance lists.</strong> They send patients to the phone line with the wrong expectations.</li>
<li><strong>Medical claims with no reviewer.</strong> Name the clinician who reviewed the page.</li>
<li><strong>Replying to reviews with patient details.</strong> It can breach privacy rules.</li>
</ul>

<h2>Limits of This Snapshot</h2>
<ul>
<li>One search in one city on one day. Maps results change by location and device.</li>
<li>We read ${D.ok} of ${D.fetched} pages, one page per website, and health-system sites have many location pages we did not read.</li>
<li>A text mention of insurance or a portal shows presence, not accuracy.</li>
<li>Practitioner-named listings were identified by a title or credential in the name, so a few may be missed.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Health systems fill much of the map pack, so independent practices win on detail and trust.</li>
<li>Follow Google's practitioner rules: a profile per location and per public-facing doctor, with the doctor's name only.</li>
<li>State new-patient status, insurance and booking clearly, and keep them current.</li>
<li>Use medical structured data that matches the profile.</li>
<li>Reply to reviews without confirming patient status.</li>
</ul>
<p>Want local SEO for a medical practice? <a href="/contact">Get in touch</a> and we will review your profiles and pages.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is local SEO for doctors?</summary>
<p>It is the work of making a medical practice or individual doctor visible for local searches such as family doctor near me, through Business Profiles, location and doctor pages, structured data, reviews and accurate practical information.</p>
</details>
<details>
<summary>Can each doctor have their own Google Business Profile?</summary>
<p>Public-facing doctors can, and where several practise at one location the organisation has a separate profile for the location. A doctor should have only one profile, not one per specialisation.</p>
</details>
<details>
<summary>What should a doctor's profile name be?</summary>
<p>For a practitioner who has a profile separate from the organisation, Google's guidance is that the title includes only the practitioner's name, and may include a credential such as Dr. or MD, not the organisation's name.</p>
</details>
<details>
<summary>Should a solo doctor share the practice profile?</summary>
<p>Google says a practitioner who is the only public-facing practitioner at a location and represents a branded organisation is best off sharing a profile with that organisation.</p>
</details>
<details>
<summary>What schema type should a doctor use?</summary>
<p>Schema.org has Physician for an individual doctor and MedicalClinic for a clinic. Use the one that matches and keep values consistent with your Business Profile.</p>
</details>
<details>
<summary>How many reviews does a doctor need?</summary>
<p>There is no fixed number. In the Raleigh listings we read, the median was ${M.medianReviews} and ${M.under20} listings had fewer than 20, so steady, genuine reviews matter more than a target.</p>
</details>
<details>
<summary>Is it safe to reply to patient reviews?</summary>
<p>Yes, if you do not confirm the reviewer is a patient or mention any care details. Use an approved template that thanks them and invites contact.</p>
</details>
<details>
<summary>What should a doctor's website include?</summary>
<p>Location pages, a page for each doctor, service pages, insurance and new-patient information, hours, a phone link, a booking route and the clinician who reviewed medical content.</p>
</details>
<details>
<summary>How do I track results from local SEO for a practice?</summary>
<p>Use calls and direction requests from the profile, appointment requests and calls from the website, and compare them with the same period last year.</p>
</details>
</div>
`;
const title = 'Local SEO for Doctors: What 93 Real Raleigh Listings Reveal';
const excerpt = `Local SEO for doctors, checked against ${M.listings} real Raleigh Maps listings and the practice sites behind them: profiles, pages, schema and reviews.`;
const post = { slug: SLUG, title, category: 'Local SEO', author: 'Umaira Liaquat', date: '2026-10-14', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
