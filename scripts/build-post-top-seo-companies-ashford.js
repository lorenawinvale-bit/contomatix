// node scripts/build-post-top-seo-companies-ashford.js [--write] — data: 23 sites that ranked for Ashford (Kent) SEO searches (Google UK, 30 Oct 2026), each site's address read from its own pages, Companies House name searches the same day, and Google's Business Profile and SEO starter guide pages.
const build = require('./post-day9-common.js');
const V1 = require('../../keyword-research/kent-agency-verify-2026-10-30.json').ashford, V3 = require('../../keyword-research/kent-agency-verify-ashford2-2026-10-30.json').ashford;
const GL = require('../../keyword-research/google-docs-local-2026-10-30.json');
for (const [k, s] of [['local', 'Relevance is how well a Business Profile matches what someone is searching for'], ['local', 'Distance refers to how far each business is from the customer'], ['local', 'Prominence means how well-known a business is'], ['local', 'Your full address, if your business has a location that customers can visit'], ['starter', "no secrets here that'll automatically rank your site first in Google"]]) if (!GL[k].text.includes(s)) throw new Error('Google text changed: ' + s);
const GROUPS = {
  ashford: ['discoverable.co.uk', 'quadweb.uk', 'smartwebagency.co.uk', 'ashfordwebservices.co.uk', 'lustredigital.co.uk', 'visarc.uk', 'willcreatemedia.co.uk', 'itseeze-ashford.co.uk'],
  elsewhere: ['spiderwebservices.co.uk', 'ink-digital.co.uk', 'prgltd.co.uk', 'gravityglobal.com', 'finsburymedia.com', 'digitalmediapartner.co.uk', 'szymaniakdigital.co.uk', 'grassmedia.co.uk'],
  none: ['flairrepublic.co.uk', 'nettl.com', 'zatheo.co.uk', 'onimo.co.uk', 'onlinepresencespecialist.co.uk', 'rebelliousdigital.co.uk', 'sdgwebdesign.com']
};
const all = Object.values(GROUPS).flat(); const read = new Set([...V1, ...V3].map(o => o.host));
if (all.length !== 23 || new Set(all).size !== 23 || GROUPS.ashford.length !== 8 || GROUPS.elsewhere.length !== 8 || GROUPS.none.length !== 7) throw new Error('group counts changed');
for (const h of all) if (!read.has(h)) throw new Error('site not in verification files: ' + h);
const pcs = h => Object.keys([...V1, ...V3].find(o => o.host === h).postcodes);
for (const [h, re] of [['discoverable.co.uk', /^TN25 /], ['quadweb.uk', /^TN26 /], ['smartwebagency.co.uk', /^TN24 /], ['ashfordwebservices.co.uk', /^TN23 /], ['lustredigital.co.uk', /^TN24 /]]) if (!pcs(h).some(p => re.test(p))) throw new Error('postcode changed for ' + h);
const N = 23, A8 = 8, TOP = 5, EL = 8, NONE = 7;
build({
  slug: 'top-seo-companies-ashford-2026', category: 'Local SEO', author: 'Umaira Liaquat', date: '2026-10-30',
  title: 'Top 5 SEO Companies in Ashford, Kent: Verified for 2026',
  excerpt: `We checked ${N} sites that rank for Ashford SEO. ${A8} show an Ashford-area address and ${TOP} offer SEO with a company we could verify. See who, and what to ask.`,
  donut: [['SEO COMPANIES', 'IN ASHFORD'], [['Check the', 'Address'], 'Companies House', ['Read the', 'Services'], 'Compare Prices', ['Ask About', 'Reporting']]],
  cover: { badge: 'CHECKED 30 OCT 2026', search: 'seo company in ashford', card: `Results checked: ${N}`, lines: [`Ashford-area address: ${A8}`, `Offer SEO and verified: ${TOP}`, `Address in another town: ${EL}`, `No address found: ${NONE}`], last: 'Addresses read from each site', big: `${A8} of ${N}`, k1: 'results show an Ashford-area address', k2: `${TOP} are on our list`, title: 'SEO Companies in Ashford', sub: 'Verified for 2026' },
  info: { title: 'Ashford SEO: 23 Results Checked', sub: 'Sites ranking for Ashford SEO searches, Google UK, 30 October 2026', leftTitle: 'Where the 23 sites say they are', leftTag: 'Address read from each site', max: N,
    bars: [{ label: 'An Ashford-area address', sub: 'on the site', n: A8 }, { label: 'Another town', sub: 'on the site', n: EL }, { label: 'No address found', sub: 'on the pages we read', n: NONE }, { label: 'Offer SEO and verified', sub: 'on our list', n: TOP }],
    rightTitle: 'Our four checks', rightTag: 'For every company', items: [{ t: 'Address on the site', s: 'a real postcode' }, { t: 'Companies House', s: 'matching company' }, { t: 'SEO service page', s: 'what they offer' }, { t: 'Caveats', s: 'registered office, new company' }],
    big: `${A8} of ${N}`, noteHtml: `of the sites ranking for Ashford SEO <em>show an Ashford-area address</em>.` },
  tables: {
    where: { title: 'Where the 23 results say they are based', sub: 'Address read from each site, 30 October 2026.', head: ['Where', 'Sites'], lastBold: false, rows: [['An Ashford-area address', String(A8)], ['An address in another town', String(EL)], ['No address on the pages we read', String(NONE)]] },
    check: { title: 'The five companies', sub: 'Ashford-area address and SEO services confirmed.', head: ['Company', 'Address'], lastBold: false, rows: [['Discoverable', 'Unit 5 Hembrow, Smeeth, TN25 6SX'], ['Quad Web Design', 'Church Lane, Hamstreet, TN26'], ['Smart Web Agency', 'The Panorama, Park St, TN24 8DF'], ['Ashford Web Services', '4 Stowell Close, TN23 5HS'], ['Lustre Digital', '15 Tritton Fields, TN24 9HG']] },
    method: { title: 'What we accepted and what we did not', sub: 'Our rules.', head: ['Accepted', 'Not accepted'], lastBold: false, rows: [['An address on the site', 'A page called SEO Ashford with no address'], ['A matching company record', 'An office only in another town'], ['An SEO service page', 'Web design with no SEO mentioned']] }
  },
  content: h => `${h.updated}

<p><strong>Searching for an SEO company in Ashford, Kent?</strong> We read the pages of ${N} sites that rank in Google UK for searches such as "seo company ashford", "seo agency ashford" and "web design ashford kent seo" on 30 October 2026. ${A8} of them gave an address in or near Ashford on their own pages, ${EL} gave an office in another town and ${NONE} showed no postal address at all. Of the ${A8} local ones, ${TOP} offer SEO and match a company or trading record we could check.</p>

<p>This guide lists those ${TOP} companies with the address, services and company-register facts we found, plus the caveats, and explains how to choose. It reflects what we could verify on 30 October 2026, and where a record did not match we say so. We wrote it because of our own Search Console: searches such as "seo company in ashford" and "seo companies ashford" already reach us, but only through our Canterbury and Kent pages, because we had no page about Ashford.</p>

<h2>SEO Company in Ashford: What We Found Checking ${N} Results</h2>
${h.fig('where', 'Chart of where 23 sites that rank for Ashford SEO say they are based: 8 show an Ashford-area address, 8 an address in another town and 7 no address on the pages we read')}
<p>We opened each site and looked for a postal address and postcode on the home, contact and about pages. Ashford-area postcodes start TN23 to TN27. The ${A8} sites with an address nearby included two in the borough's villages: Hamstreet and Smeeth both use "Ashford" as the postal town. The ${EL} with offices elsewhere gave addresses in places such as Tonbridge, Brentwood, Eastbourne, Liverpool, Nottingham, Sheffield, Chester, Romsey and Herne Bay. Some of those are national agencies that sell local pages. That is not a fault, but it is different from an Ashford office.</p>

<h2>Top 5 SEO Companies in Ashford, Kent</h2>
<p>These five have an Ashford-area address on their own site and offer SEO. They are in no ranking order. Three other local businesses we found, an integrated marketing agency, a digital marketing agency in a nearby village and a franchise web design office, did not show SEO as a service on the pages we read, so they are not on the list.</p>

<h3>1. Discoverable</h3>
<p><strong>Address on site:</strong> Unit 5 Hembrow, Evegate Business Park, Smeeth, Ashford, TN25 6SX. <strong>Companies House:</strong> Discoverable Limited, number 03507996, incorporated 11 February 1998, same registered office. <strong>SEO:</strong> the site describes a digital marketing agency in Kent specialising in SEO, PPC and data analytics, and says it is a Google partner. <strong>Caveat:</strong> the site says "founded in 1997" while the company was incorporated in 1998, which may simply reflect earlier trading.</p>

<h3>2. Quad Web Design</h3>
<p><strong>Address on site:</strong> Orlestone Grange, Hamstreet, Ashford, Kent. <strong>Companies House:</strong> Quad Web Design Ltd, number 05819897, incorporated 17 May 2006, registered at Orlestone Grange, Church Lane, Hamstreet, Ashford. The postcode on the site (TN26 2EW) differs by one letter from the register (TN26 2EN), so ask which is right. <strong>SEO:</strong> its Ashford SEO page is titled "SEO services from £495 a month" and mentions Google and AI search optimisation. It is one of the few in our check that states a price. Its own blog says most UK small businesses spend between £500 and £2,000 a month on SEO, which is a useful yardstick, though it comes from an agency that sells the service.</p>

<h3>3. Smart Web Agency</h3>
<p><strong>Address on site:</strong> "Kent Office: The Panorama, Park St, Ashford TN24 8DF". <strong>Companies House:</strong> Smart Web Agency Limited, number 11893218, incorporated 20 March 2019, but the registered office is in London (SE3). <strong>SEO:</strong> a dedicated "SEO Services in Ashford" page lists on-page, off-page, local, ecommerce, content and technical SEO, plus audits. <strong>Caveat:</strong> the Ashford office is a working office on the site, not the registered address, so ask who staffs it.</p>

<h3>4. Ashford Web Services</h3>
<p><strong>Address on site:</strong> 4 Stowell Close, Ashford, Kent, TN23 5HS. <strong>SEO:</strong> the site offers web design and SEO for Ashford, says "Est. 2010" and describes SEO and AI-assistant visibility. <strong>Companies House:</strong> we found no matching company, which is normal for a sole trader. Ask who you would contract with.</p>

<h3>5. Lustre Digital</h3>
<p><strong>Address on site:</strong> 15 Tritton Fields, Ashford, Kent, TN24 9HG. <strong>Companies House:</strong> Lustre Digital Ltd, number 17124175, incorporated 30 March 2026, so the company is only a few months old. <strong>SEO:</strong> a fixed-price seven-page website for £849 includes copywriting and on-page SEO, and the site has an SEO section. <strong>Caveat:</strong> it is a new company with a short track record, so ask to see completed work.</p>

<h2>How We Checked Each Ashford SEO Company</h2>
${h.fig('method', 'Comparison of what we accepted and did not accept for the Ashford list: an address on the site, a matching company record and an SEO page were accepted, while pages called SEO Ashford with no address, an office only elsewhere and web design with no SEO were not')}
<p>A company is on the list only if its own site shows an Ashford-area address, we could read an SEO service on its pages, and a company-register search returned either a matching company or a clear reason it might not (a sole trader). Where the register and the site disagreed, we say so. A registered office can be an accountant's address, so a mismatch is a question to ask, not proof of a problem.</p>

${h.info('Infographic of where 23 sites that rank for Ashford SEO say they are based: 8 show an Ashford-area address, 8 an address in another town and 7 no address, with 5 offering SEO and verified, plus our four checks of address, Companies House, services and caveats')}

<h2>SEO Companies Ashford: How to Choose</h2>
<ul>
<li><strong>Match the service to your need.</strong> A web design company that includes on-page SEO suits a new site. A dedicated SEO agency suits an existing site that needs growth.</li>
<li><strong>Ask for written scope and price.</strong> Only one of our five publishes a monthly figure.</li>
<li><strong>Ask how links are earned.</strong> Buying links at scale can break Google's rules.</li>
<li><strong>Ask for reporting you can read,</strong> such as impressions, clicks and enquiries.</li>
<li><strong>Check track record.</strong> A new company can be good, but ask for examples.</li>
</ul>

<h2>Local SEO in Ashford: What Google Says Matters</h2>
<p>Google's <a href="https://support.google.com/business/answer/7091" target="_blank" rel="nofollow noopener">Business Profile help</a> explains local results with three factors. <strong>Relevance</strong> is how well a Business Profile matches what someone is searching for. <strong>Distance</strong> refers to how far each business is from the customer who is searching. <strong>Prominence</strong> means how well-known a business is. Google also tells businesses to give their full address if customers can visit. For an Ashford business, that means a consistent address across your website, profile and directories, and it is another reason to choose an agency that is open about its own.</p>

<h2>SEO Ashford Prices and What You Get</h2>
<p>The only monthly figure on the pages we read was £495 a month from Quad Web Design, with the company's own blog suggesting small businesses spend £500 to £2,000 a month. Lustre Digital's £849 is a one-off website build with on-page SEO, not an ongoing SEO fee. The others did not publish a price. That does not make them expensive or cheap: it means you must ask for a quote. Google's <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="nofollow noopener">SEO starter guide</a> says there are "no secrets here that'll automatically rank your site first in Google", so be wary of anyone who promises a position.</p>

<h2>How to Compare Quotes</h2>
<p>Put each quote in the same four boxes: what will be done in the first month, what will be done every month after, how results will be reported, and how long the contract runs. A cheaper quote that leaves out reporting or content can cost more in the end than a dearer one that includes them. Ask each company to say in one sentence what you will see after three months, and keep the answers. Vague answers are easy to compare: they all sound the same.</p>

<h2>Red Flags When Hiring an SEO Agency in Ashford</h2>
<ul>
<li><strong>No address on the site</strong>, true of ${NONE} of the ${N} results we read.</li>
<li><strong>Guaranteed rankings</strong> or a promised position.</li>
<li><strong>Reports that list activity, not results.</strong></li>
<li><strong>Bulk bought links</strong> with no explanation of where they come from.</li>
<li><strong>Refusal to name the legal entity</strong> you would contract with.</li>
</ul>

<h2>Not in Ashford? Nearby Options</h2>
<p>For businesses elsewhere in Kent, see our checked guides to <a href="/blog/top-seo-companies-maidstone-2026">SEO companies in Maidstone</a>, <a href="/blog/top-seo-companies-canterbury-2026">Canterbury</a>, <a href="/blog/top-seo-companies-folkestone-2026">Folkestone</a> and <a href="/blog/top-seo-companies-ramsgate-2026">Ramsgate</a>, and our roundup of the <a href="/blog/best-seo-companies-kent-2026">best SEO companies in Kent</a>. If you would rather learn the basics first, our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a> shows how to see your own search data.</p>

<h2>What People in Ashford Search For</h2>
<p>In the three months to 28 October 2026, our Search Console shows three Ashford searches that displayed our site: "seo company in ashford" (129 impressions, average position 6.2), "seo companies in ashford" (107, position 6.1) and "seo companies ashford" (98, position 7.0). All three are company searches, not "how to" searches, so the person is ready to choose someone. Those impressions came through our Canterbury and Kent pages, which do not cover Ashford. This page exists to give those searchers an answer that does.</p>

<h2>Web Design With SEO or a Dedicated SEO Agency?</h2>
<p>The five on this list are not the same kind of business, and that matters more than any ranking.</p>
<ul>
<li><strong>Dedicated SEO pages:</strong> Quad Web Design and Smart Web Agency both have an SEO page for Ashford. Quad publishes a monthly price, and Smart Web Agency lists a wider range of SEO services.</li>
<li><strong>A digital marketing agency:</strong> Discoverable describes SEO, PPC and analytics together, which suits a business that wants search and ads managed in one place.</li>
<li><strong>Web design with SEO built in:</strong> Ashford Web Services and Lustre Digital sell websites with SEO included, which suits a business that needs a new site first.</li>
</ul>
<p>If your website is fine and you want more enquiries from it, start with the first two groups. If your website is old or hard to edit, a rebuild with on-page SEO may do more than a monthly SEO retainer.</p>

<h2>A First-Month Checklist for an Ashford Business</h2>
<ul>
<li>Claim and verify your Google Business Profile, and enter your full address if customers can visit you.</li>
<li>Check your name, address and phone number match on your website and every listing.</li>
<li>Give every service its own page with a clear title, and name Ashford and nearby places you cover, where it is true.</li>
<li>Reply to every review and add current photos, as Google's help page advises.</li>
<li>Set up Search Console and look at which searches already show your site.</li>
</ul>

<h2>Questions to Ask Each of the Five</h2>
<ul>
<li><strong>Discoverable:</strong> which services would you run for a business my size, and who manages the account?</li>
<li><strong>Quad Web Design:</strong> what does the £495 package include, and which postcode is correct?</li>
<li><strong>Smart Web Agency:</strong> who works in the Ashford office, and which company would I contract with?</li>
<li><strong>Ashford Web Services:</strong> is this a sole trader or a company, and what is covered in a monthly plan?</li>
<li><strong>Lustre Digital:</strong> can I see completed Ashford projects, since the company is new?</li>
</ul>
<p>A good company answers these without fuss. If you get a vague reply, that is useful information too.</p>

<h2>How to Verify an SEO Company Yourself</h2>
<ol>
<li>Open the contact page and write down the address and postcode.</li>
<li>Search the company name on the <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="nofollow noopener">Companies House service</a> and open the company page. Check the registered office, the date it was incorporated and whether it is active.</li>
<li>Compare the two. A difference is a question to ask, such as a new office, a shared building or an accountant's registered address.</li>
</ol>
<p>It takes about five minutes per company and removes most of the guesswork.</p>

<h2>What We Did Not Check</h2>
<p>We did not judge the quality of anyone's work, test their rankings, read their reviews or speak to their clients. We checked addresses and company records, which you can confirm yourself in a few minutes. A Companies House name search can return a different company with a similar name, so confirm the company number before you rely on it. Sites also change, so if an address or service has changed, tell us and we will update this page.</p>

<h2>Key Takeaways</h2>
<ul>
<li>${A8} of ${N} sites that rank for Ashford SEO show an Ashford-area address, and ${TOP} offer SEO with a company we could verify.</li>
<li>The five are Discoverable, Quad Web Design, Smart Web Agency, Ashford Web Services and Lustre Digital.</li>
<li>Only one published a monthly SEO price: £495 a month.</li>
<li>Check the address, the legal entity and the scope before you sign.</li>
<li>Google says local results depend on relevance, distance and prominence, and that no secret guarantees first place.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['Who are the top SEO companies in Ashford, Kent?', 'We could verify five with an Ashford-area address and an SEO offer: Discoverable, Quad Web Design, Smart Web Agency, Ashford Web Services and Lustre Digital. They are in no ranking order.'],
    ['How did you check them?', 'We read each site\'s pages for an address and postcode and searched Companies House for the company name.'],
    ['How much does SEO cost in Ashford?', 'One company we checked publishes SEO from £495 a month, and its own blog says small businesses often spend £500 to £2,000. Ask others for a written quote.'],
    ['Do I need an SEO company based in Ashford?', 'No, but a local one is easier to meet and knows the area. Check the address either way.'],
    ['Are Hamstreet and Smeeth in Ashford?', 'Their postal address uses Ashford as the town, and both are in the Ashford area, which is why Quad Web Design and Discoverable are on the list.'],
    ['What does local SEO involve?', 'Improving your website and your Google Business Profile so nearby customers find you.'],
    ['What are the local ranking factors?', 'Google names relevance, distance and prominence.'],
    ['Can anyone guarantee first place on Google?', 'No. Google\'s SEO starter guide says there are no secrets that automatically rank your site first.'],
    ['How often is this list updated?', 'We checked on 30 October 2026 and will recheck as agencies change.']
  ])}
`
});
