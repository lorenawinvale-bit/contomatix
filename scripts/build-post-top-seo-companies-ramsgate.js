// node scripts/build-post-top-seo-companies-ramsgate.js [--write] — data: 18 sites that ranked for Ramsgate SEO searches (Google UK, 30 Oct 2026), each site's address read from its own pages, Companies House name searches the same day, and Google's Business Profile and SEO starter guide pages. Our own Search Console queries: 3 months to 28 Oct 2026.
const build = require('./post-day9-common.js');
const fs = require('fs'); const path = require('path');
const V1 = require('../../keyword-research/kent-agency-verify-2026-10-30.json').ramsgate, V2 = require('../../keyword-research/kent-agency-verify-ramsgate2-2026-10-30.json').ramsgate;
const GL = require('../../keyword-research/google-docs-local-2026-10-30.json');
for (const [k, s] of [['local', 'Relevance is how well a Business Profile matches what someone is searching for'], ['local', 'Distance refers to how far each business is from the customer'], ['local', 'Prominence means how well-known a business is'], ['local', 'Businesses with complete and accurate info are more likely to show up in local search results'], ['starter', "no secrets here that'll automatically rank your site first in Google"]]) if (!GL[k].text.includes(s)) throw new Error('Google text changed: ' + s);
// every site read, grouped by where its pages put its address (30 Oct 2026)
const GROUPS = {
  ramsgate: ['esabi.co.uk', 'busywebs.co.uk', '9gagency.co.uk', 'webdandy.co.uk', 'knowltonmarketing.co.uk'],
  elsewhere: ['nu-digital.co.uk', 'egnetixdigital.co.uk', 'cloudswitched.com', 'boostonlineadvertising.co.uk', 'rubi.agency', 'detlingwebdesign.co.uk', 'johnston-marketing.co.uk'],
  none: ['masswebdesign.co.uk', 'kentsmallbusiness.co.uk', 'gotopseo.co.uk', 'jetbug.co.uk', 'webowsdesign.co.uk', 'codexwebdevelopment.co.uk']
};
const all = Object.values(GROUPS).flat(); const read = new Set([...V1, ...V2].map(o => o.host));
if (all.length !== 18 || new Set(all).size !== 18 || GROUPS.ramsgate.length !== 5 || GROUPS.elsewhere.length !== 7 || GROUPS.none.length !== 6) throw new Error('group counts changed');
for (const h of all) if (!read.has(h)) throw new Error('site not in verification files: ' + h);
const pc = h => Object.keys([...V1, ...V2].find(o => o.host === h).postcodes);
for (const h of GROUPS.ramsgate) if (!pc(h).some(p => /^CT1[12] /.test(p))) throw new Error('no Ramsgate postcode for ' + h);
const N = 18, R5 = 5, SEO4 = 4, EL = 7, NONE = 6;
const f = n => n.toLocaleString('en-US');
build({
  slug: 'top-seo-companies-ramsgate-2026', category: 'Local SEO', author: 'Hamza Siddiqui', date: '2026-10-30',
  title: 'Top 4 SEO Companies in Ramsgate, Kent: Verified for 2026',
  excerpt: `We checked ${N} sites that rank for Ramsgate SEO. Only ${R5} show a Ramsgate address, and ${SEO4} of those offer SEO. Here they are, with what we could verify.`,
  donut: [['SEO COMPANIES', 'IN RAMSGATE'], [['Check the', 'Address'], 'Companies House', ['Read the', 'Services'], 'Ask About Reporting', ['Avoid Red', 'Flags']]],
  cover: { badge: 'CHECKED 30 OCT 2026', search: 'seo company ramsgate', card: `Results checked: ${N}`, lines: [`Show a Ramsgate address: ${R5}`, `Offer SEO: ${SEO4}`, `Address in another town: ${EL}`, `No address found: ${NONE}`], last: 'Addresses read from each site', big: `${R5} of ${N}`, k1: 'results show a Ramsgate address', k2: `${SEO4} of those offer SEO`, title: 'SEO Companies in Ramsgate', sub: 'Verified for 2026' },
  info: { title: 'Ramsgate SEO: 18 Results Checked', sub: 'Sites ranking for Ramsgate SEO searches, Google UK, 30 October 2026', leftTitle: 'Where the 18 sites say they are', leftTag: 'Address read from each site', max: N,
    bars: [{ label: 'A Ramsgate address', sub: 'on the site', n: R5 }, { label: 'Another town', sub: 'on the site or Companies House', n: EL }, { label: 'No address found', sub: 'on the pages we read', n: NONE }, { label: 'Ramsgate and SEO', sub: 'both confirmed', n: SEO4 }],
    rightTitle: 'Our four checks', rightTag: 'For every company', items: [{ t: 'Address on the site', s: 'a real postcode' }, { t: 'Companies House', s: 'matching company' }, { t: 'SEO service page', s: 'what they offer' }, { t: 'Caveats', s: 'shared offices, old claims' }],
    big: `${R5} of ${N}`, noteHtml: `of the sites ranking for Ramsgate SEO <em>show a Ramsgate address</em>.` },
  tables: {
    where: { title: 'Where the 18 results say they are based', sub: 'Address read from each site, 30 October 2026.', head: ['Where', 'Sites'], lastBold: false, rows: [['A Ramsgate address', String(R5)], ['An address in another town', String(EL)], ['No address on the pages we read', String(NONE)]] },
    check: { title: 'The four companies', sub: 'Ramsgate address and SEO services confirmed.', head: ['Company', 'Address'], lastBold: false, rows: [['Esabi (Rocket Multimedia Group Ltd)', '424 Margate Road, Westwood, CT12 6SJ'], ['Busywebs', '23 Pysons Road, CT12 6TS'], ['9G Agency', 'Marlowe Innovation Centre, Marlowe Way, CT12 6FA'], ['Web Dandy', '128 Crescent Road, CT11 9RE']] },
    method: { title: 'How we checked', sub: 'Five steps.', head: ['Step', 'What'], lastBold: false, rows: [['1', 'Read Google UK results'], ['2', 'Open each site'], ['3', 'Find the address'], ['4', 'Search Companies House'], ['5', 'Keep the confirmed ones']] }
  },
  content: h => `${h.updated}

<p><strong>Looking for an SEO company in Ramsgate?</strong> Before you pick one, check where it actually is. On 30 October 2026 we read the pages of ${N} sites that rank in Google UK for searches such as "seo company ramsgate", "digital marketing agency ramsgate" and "web design and seo ramsgate". Only ${R5} of them showed a Ramsgate address on their own pages, and ${SEO4} of those ${R5} offer SEO. The other ${N - R5} either list an office in another town (${EL}) or show no postal address at all (${NONE}).</p>

<p>We wrote it because of our own Search Console: in the three months to 28 October 2026, searches containing "ramsgate" showed our site 1,133 times at an average position of 4.5, with no clicks, and every one of those impressions came through our Canterbury page, because we had no page about Ramsgate. This guide lists the ${SEO4} Ramsgate companies we could verify, shows how we checked each one, and explains what to ask before you sign. It is based on what the sites and Companies House showed on the day, with caveats where something did not match. Last checked: 30 October 2026.</p>

<h2>SEO Ramsgate: What We Found When We Checked ${N} Results</h2>
${h.fig('where', 'Cards of where 18 sites that rank for Ramsgate SEO say they are based: 5 show a Ramsgate address, 7 an address in another town and 6 no address on the pages we read')}
<p>Searches for "seo ramsgate" and similar are full of pages titled "SEO Services in Ramsgate". A page title tells you which town the page targets, not where the company is. We opened each site, looked for a postal address on the home, contact and about pages, and noted the postcode. Ramsgate postcodes begin CT11 and CT12. The result: ${R5} sites showed one, ${EL} showed an office elsewhere, and ${NONE} showed none.</p>

<h2>Top 4 SEO Companies in Ramsgate, Kent</h2>
<p>These four show a Ramsgate address on their own site and offer search engine optimisation. They are listed in no ranking order. A fifth Ramsgate business we found, a video and social media agency, did not mention SEO on the pages we read, so it is not on the list.</p>

<h3>1. Esabi</h3>
<p><strong>Address on site:</strong> 424 Margate Road, Westwood, Ramsgate, CT12 6SJ. <strong>Companies House:</strong> Rocket Multimedia Group Ltd, company number 07195326, incorporated 19 March 2010, with the same registered office. <strong>SEO:</strong> Esabi has a dedicated "SEO Ramsgate" page. Its services menu lists search engine optimisation, technical SEO, local SEO, on-page optimisation, content marketing, blogger outreach and link building, as well as pay-per-click and conversion rate optimisation. <strong>Caveat:</strong> the site says the team has "over 25 years" of experience, while the company was incorporated in 2010, so ask what that figure covers. The phone number on the site is a 01227 (Canterbury) number.</p>

<h3>2. Busywebs</h3>
<p><strong>Address on site:</strong> 23 Pysons Road, Ramsgate, Kent, CT12 6TS. <strong>SEO:</strong> Busywebs describes itself as a web design business trading since 1998 and publishes a plain-English guide to local SEO for Margate, Ramsgate, Broadstairs and the rest of Thanet. It offers a free mock-up of a website. <strong>Companies House:</strong> we searched the company register for the name and found no match, which is normal for a sole trader or a different legal name. Ask for the legal entity on your quote.</p>

<h3>3. 9G Agency</h3>
<p><strong>Address on site:</strong> Marlowe Innovation Centre, Marlowe Way, Ramsgate, Kent, CT12 6FA. <strong>SEO:</strong> the trading name on the site is 9G Marketing and Business Systems, with a dedicated SEO services page. It describes a free initial consultation and a guarantee tied to the first three months of a monthly plan; read those terms in full before relying on them. <strong>Caveat:</strong> an innovation centre is a shared building, and a company-register search for the name did not return a Ramsgate company, so ask which legal entity you would contract with.</p>

<h3>4. Web Dandy</h3>
<p><strong>Address on site:</strong> 128 Crescent Road, Ramsgate, Kent, CT11 9RE. <strong>SEO:</strong> Web Dandy is a web design company based in Ramsgate. Its web design package includes on-page search engine optimisation and SEO copy, so it suits a business that wants a new site with a search-friendly foundation more than a long monthly SEO programme. <strong>Companies House:</strong> our name search did not return a matching Ramsgate company; ask for the legal entity name.</p>

<h2>How We Checked Each SEO Company in Ramsgate</h2>
${h.fig('method', 'Flow of five steps used to check each Ramsgate SEO result: read Google UK results, open each site, find the address, search Companies House and keep the confirmed ones')}
<ol>
<li><strong>Read the results.</strong> We collected the sites that ranked for several Ramsgate SEO and digital marketing searches in Google UK on 30 October 2026.</li>
<li><strong>Open each site</strong> and read the home, contact and about pages.</li>
<li><strong>Find the address.</strong> We recorded any UK postcode and the town written next to it.</li>
<li><strong>Search Companies House</strong> for the company name, to see the registered office and when the company was incorporated.</li>
<li><strong>Keep what is confirmed.</strong> A company is on the list only if its own site shows a Ramsgate address and it offers SEO.</li>
</ol>
<p>Where Companies House and the website disagree, we say so. A registered office can be an accountant's address, and an office on a website can be a shared one, so a mismatch is a question to ask, not proof of a problem.</p>

<h2>Where the Other ${N - R5} Ramsgate SEO Results Are Based</h2>
<p>Of the ${EL} sites that list an office in another town, the addresses we read were in Chatham, Gillingham, London, Maidstone, East Grinstead, Shenfield in Essex and Minster on the Isle of Sheppey, and one company's registered office is in Margate. These are not necessarily bad choices. A good agency can serve Ramsgate from elsewhere. The point is that a page called "SEO Ramsgate" does not mean a Ramsgate office, so judge each on its work. The ${NONE} sites with no address included directories and pages built for several towns at once. If a business will not tell you where it is, treat that as a reason to ask.</p>

${h.info('Infographic of where 18 sites that rank for Ramsgate SEO say they are based: 5 show a Ramsgate address, 7 an address in another town and 6 no address, with 4 offering SEO, plus our four checks of address, Companies House, services and caveats')}

<h2>SEO Services Ramsgate: What to Expect From a Local Company</h2>
<ul>
<li><strong>A plan for your Business Profile</strong>, if customers find you by searching on a map.</li>
<li><strong>Fixes to your own pages:</strong> titles, headings, speed and mobile layout.</li>
<li><strong>Content that answers local questions</strong>, such as the services and areas you cover.</li>
<li><strong>Links from relevant local sites</strong>, earned rather than bought in bulk.</li>
<li><strong>Reporting you can read:</strong> impressions, clicks and calls, not only rankings.</li>
</ul>
<p>Google's own <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="nofollow noopener">SEO starter guide</a> says there are "no secrets here that'll automatically rank your site first in Google". Treat any promise of a number-one position with caution.</p>

<h2>Local SEO in Ramsgate: What Google Says Matters</h2>
<p>Google's Business Profile help explains local results in three words. <strong>Relevance</strong> is how well a Business Profile matches what someone is searching for. <strong>Distance</strong> refers to how far each business is from the customer who is searching. <strong>Prominence</strong> means how well-known a business is. You cannot change distance, but you can improve the other two. Google also says businesses with complete and accurate information are more likely to show up in local search results, and that you should add your full address if customers can visit you. That is one reason a real, consistent address matters when you choose an agency to manage your profile.</p>

<h2>Website SEO Ramsgate: Questions to Ask Before You Sign</h2>
<ul>
<li>Which company will I contract with, and what is its registered address?</li>
<li>Who will do the work, and is any of it outsourced?</li>
<li>What will you change on my site in the first month?</li>
<li>How will you report, and what counts as success for my business?</li>
<li>How do you get links, and will any be paid or exchanged?</li>
<li>What happens if I want to stop after three months?</li>
</ul>

<h2>Red Flags When Choosing a Ramsgate SEO Company</h2>
<ul>
<li><strong>No address anywhere on the site</strong>, which was the case for ${NONE} of the ${N} results we read.</li>
<li><strong>A guaranteed first-page or number-one result.</strong> Google says no secrets will automatically rank you first.</li>
<li><strong>Vague reports</strong> that list activity but not results.</li>
<li><strong>Pressure to sign a long contract</strong> before you have seen a plan.</li>
</ul>

<h2>SEO Ramsgate and the Rest of Thanet</h2>
<p>Ramsgate sits in Thanet with Margate and Broadstairs, and some of the sites we read cover all three. Busywebs, for example, publishes one guide for Margate, Ramsgate, Broadstairs and the wider area, and one of the other companies we found has its registered office in Margate. If you are a short drive away, a Ramsgate address is not essential. What matters is that the company can show you work for businesses like yours and tells you who it is.</p>

<h2>Not in Ramsgate? Nearby Options</h2>
<p>If your business is in east Kent but outside Ramsgate, see our checked guides to <a href="/blog/top-seo-companies-canterbury-2026">SEO companies in Canterbury</a> and <a href="/blog/top-seo-companies-folkestone-2026">SEO companies in Folkestone</a>, and our wider roundup of the <a href="/blog/best-seo-companies-kent-2026">best SEO companies in Kent</a>. For a plan you can run yourself, our guide to <a href="/blog/white-hat-link-building">white hat link building</a> shows how links are earned.</p>

<h2>What Ramsgate Businesses Search For</h2>
<p>These are the Ramsgate searches that showed our site in the three months to 28 October 2026, from our own Search Console, with impressions and average position: "seo ramsgate" (177, position 3.7), "seo in ramsgate" (153, 2.3), "ramsgate seo" (152, 3.4), "ramsgate seo company" (148, 3.2), "website seo ramsgate" (123, 6.7), "seo company in ramsgate" (121, 5.1), "ramsgate seo services" (96, 4.4), "seo companies in ramsgate" (91, 4.1) and "seo agency ramsgate" (58, 8.3). They show how people word the need: short and local, often with "company" or "services". Almost none says "agency", which is a useful hint if you are writing a page for your own business: use the words your customers use.</p>

<h2>A 90-Day Starting Plan for a Ramsgate Business</h2>
<ol>
<li><strong>Days 1 to 30: fix the basics.</strong> Claim and verify your Google Business Profile, make your address, phone number and hours identical everywhere, and check every page has a clear title and heading that names what you do and where.</li>
<li><strong>Days 31 to 60: write for your customers.</strong> Add a page for each main service and each area you cover, in the words people search. Answer the questions customers ask on the phone.</li>
<li><strong>Days 61 to 90: build proof.</strong> Ask happy customers for reviews, add photos, and earn a few relevant local links, such as a supplier, a partner or a local news mention.</li>
</ol>
<p>Then look at your own numbers. Our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> shows how to see which searches already show your site.</p>

<h2>Google Business Profile Checklist for Ramsgate</h2>
<p>Google's help page on <a href="https://support.google.com/business/answer/7091" target="_blank" rel="nofollow noopener">improving your local ranking</a> gives a short list. Verify your business, so Google knows you are authorised to represent it. Keep your information up to date, because businesses with complete and accurate info are more likely to show up in local search results. Include your full address if customers can visit, your hours and your business category. Reply to reviews, and add photos and videos. None of it needs an agency, but an agency that does it should be able to show you what changed.</p>

<h2>How to Verify an SEO Company Yourself</h2>
<ol>
<li>Open the contact page and write down the address and postcode.</li>
<li>Search the company name on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="nofollow noopener">Companies House service</a> and open the company page. Check the registered office, the date it was incorporated and whether it is active.</li>
<li>Compare the two. A difference is a question to ask, such as a new office, a shared building or an accountant's registered address.</li>
</ol>
<p>It takes about five minutes per company and removes most of the guesswork.</p>

<h2>What We Did Not Check</h2>
<p>We did not judge the quality of anyone's work, test their rankings, read their reviews or speak to their clients. We checked addresses and company records, which are facts you can confirm yourself in a few minutes. A Companies House name search can return a different company with a similar name, so confirm the number before you rely on it. Sites also change: if you find an address has moved or a service has been dropped, tell us and we will update this page.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Only ${R5} of ${N} sites that rank for Ramsgate SEO show a Ramsgate address, and ${SEO4} of those offer SEO.</li>
<li>The four we could verify are Esabi, Busywebs, 9G Agency and Web Dandy.</li>
<li>Check the address and the legal entity before you sign.</li>
<li>Google's local ranking comes from relevance, distance and prominence.</li>
<li>No company can guarantee a first-place ranking.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['Who are the top SEO companies in Ramsgate?', 'We could verify four that show a Ramsgate address and offer SEO: Esabi, Busywebs, 9G Agency and Web Dandy. They are in no ranking order.'],
    ['How did you check the companies?', 'We read each site\'s home, contact and about pages for an address and postcode, then searched Companies House for the company name.'],
    ['Do I need an SEO company based in Ramsgate?', 'No. A company elsewhere can do good work, but a local one knows the area and is easier to meet. Check the address either way.'],
    ['How much does SEO in Ramsgate cost?', 'We did not find a single clear monthly price on the pages we read, so ask for a written quote that lists what is included.'],
    ['What does local SEO mean?', 'It means helping customers near you find you, mainly through your website and your Google Business Profile.'],
    ['What are the three local ranking factors?', 'Google says relevance, distance and prominence.'],
    ['Can an SEO company guarantee first place?', 'No. Google\'s own SEO starter guide says there are no secrets that automatically rank your site first.'],
    ['Why did some results show no address?', 'Some were directories or pages written for many towns. We cannot say why, so it is worth asking.'],
    ['How often do you update this list?', 'We checked on 30 October 2026 and will recheck as agencies change.']
  ])}
`
});
