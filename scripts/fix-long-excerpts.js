// One-off (3 Nov 2026): shorten 36 blog excerpts (= meta descriptions) to 155 characters or fewer. Asserts each slug exists and each new text fits.
const fs = require('fs'); const path = require('path'); process.chdir(path.join(__dirname, '..'));
const N = {
  'why-is-duplicate-content-an-issue-for-seo-2026': "There's no Google 'penalty' for duplicate content, and Google has said so since 2008. Here's what actually happens instead, and why it's arguably worse.",
  'seo-company-new-orleans-2026': 'Choosing an SEO company in New Orleans means finding one that understands tourism seasonality and the thin local competition beneath the surface.',
  'leeds-digital-marketing': "Choosing between dozens of Leeds digital marketing agencies in 2026? Here's what separates the ones that deliver from the ones that just pitch well.",
  'seo-for-dentists-2026': 'SEO for dentists means winning the map pack against rival practices on the same street, using different levers than most local businesses.',
  'search-engine-optimization-in-santa-clarita-2026': 'SEO in Santa Clarita means competing 30 miles from Los Angeles in a valley of 294,000 people, where each community searches in its own way.',
  'search-engine-optimization-murfreesboro-2026': 'Search engine optimization Murfreesboro businesses need means real customers, not just rankings. See what works, and how to compete near Nashville.',
  'top-seo-companies-huntington-2026': 'Top 3 SEO companies truly based in Huntington, West Virginia, hand-verified for 2026: real addresses, homepage screenshots and no fake location pages.',
  'top-email-marketing-companies-bellingham-2026': 'Only 2 email marketing companies in Bellingham, Washington passed a genuine address and service-line check for 2026. An honest count, not a padded list.',
  'top-recruiting-companies-everett-2026': 'Four recruiting and staffing companies with a real, staffed office in Everett, WA, hand-verified for 2026, plus two offices that could not be verified.',
  'top-recruiting-companies-petaluma-2026': 'Six recruiting and staffing companies with a real, staffed office in Petaluma, CA, hand-verified for 2026, with local vs branch ownership disclosed.',
  'top-recruiting-companies-gaithersburg-2026': 'Four recruiting companies with a real, staffed Gaithersburg office for 2026, including three national brands sharing one building on Washingtonian Blvd.',
  'top-recruiting-companies-mckinney-2026': 'Seven recruiting and staffing companies with a real, staffed office in McKinney, TX, hand-verified for 2026, from executive search to light-industrial.',
  'top-graphic-design-companies-boulder-2026': 'Eleven graphic design companies in Boulder, CO, hand-verified for 2026, from two-person boutiques to outdoor-industry branding shops with track records.',
  'top-graphic-design-companies-sugar-land-2026': 'Three graphic design companies with a genuine, verified Sugar Land, TX office, hand-checked for 2026 out of 20+ candidates in this Fort Bend suburb.',
  'top-digital-marketing-agencies-sugar-land-2026': 'Four digital marketing agencies with a genuine, verified Sugar Land, TX office, hand-checked for 2026 out of 27 candidates in this Fort Bend suburb.',
  'top-2-marketing-agencies-moses-lake-2026': 'Only 2 marketing agencies in Moses Lake, WA passed independent verification for 2026, after 27 local candidates were checked for full-service scope.',
  'top-graphic-design-companies-league-city-2026': 'Two graphic design companies with a genuine, verified League City, TX address, hand-checked for 2026 out of a dozen candidates in Galveston County.',
  'google-discover-dive-deeper-ai-test': "Google is testing a Discover button that skips the publisher click and shows an AI-generated summary instead. Here's what's confirmed and what it means.",
  'keyword-research-tools': 'The free keyword research tools that actually work, what each one answers, where its numbers stop being reliable, and when a paid plan earns its money.',
  'digital-pr-services': 'What digital PR services deliver, what happened to HARO, realistic 2026 pricing, and how to tell real PR apart from link building in a press badge.',
  'white-label-seo': 'What white label SEO is, what Google’s spam policy restricts, 2026 wholesale pricing and margins, and how to vet a provider before reselling.',
  'seo-for-locksmiths': 'SEO for locksmiths without listing suspensions: Business Profile rules for the trade, why fake storefronts get filtered, and what to fix first.',
  'local-seo-for-restaurants': "How a restaurant gets found on Google Maps: category, menu, hours, reserve links, reviews, website basics and a weekly routine, from Google's own guidance.",
  'landing-page-ab-testing': 'Landing page A/B testing done right: what to test, how to set a hypothesis and duration, and the SEO-safe setup Google recommends, with examples.',
  'blocked-by-robots-txt': 'Fix the Search Console statuses Blocked by robots.txt and Indexed, though blocked: find the rule, fix it, avoid the noindex trap, and validate.',
  'free-seo-tools': 'Free SEO tools in one place: what 6 ranking pages recommend, a free stack to use in order, and all 41 free Contomatix tools grouped by job.',
  'search-console-impressions-explained': 'Search Console impressions explained with real numbers: about 106,000 impressions, 77 clicks, position 43, and why the table undercounts.',
  'tiered-link-building': "Tiered link building explained after reading 6 ranking guides: 6 admit the risk, none cite Google's documentation. The rules and safer alternatives.",
  'link-building-statistics': 'Link building statistics from our own October 2026 studies: 22 numbers on links, prospects, prices, risk and indexing, each with sample size and source.',
  'ai-seo-tools-for-small-business': "AI SEO tools for small business: we read 8 pricing pages (plans $23 to $139 a month) and 6 ranking pages, with Google's rules and a budget from $0.",
  'link-acquisition': "Link acquisition explained: what 6 top guides cover, what they skip (cost, time, Google's rules), and a plan built on how our own 24 links were acquired.",
  'white-hat-link-building': "White hat link building tested against Google's spam policy: 8 top guides read, 8 of 8 recommend guest posting, plus a six-question test for any tactic.",
  'offpage-seo': 'Off-page SEO explained with a free 30-minute audit: 8 top guides read, 0 of 4 Google docs use the term, and our own link and brand-mention numbers.',
  'pbn-backlinks': 'PBN backlinks examined: of 7 top pages, 4 warn against them and 3 sell them, and PBN appears 0 times in 5 Google docs. A checklist to judge any source.',
  'directory-links': "Directory links tested: 9 top pages read, Google's rule on low-quality directories, and our result: 22 of 24 links are listings, two nofollow.",
  'improve-core-web-vitals': "Core Web Vitals tested on our own site: 13 pages measured, 1 over the CLS limit, and the hero-image bug behind it, with Google's thresholds."
};
const a = JSON.parse(fs.readFileSync('data/blog.json', 'utf8')); let n = 0;
for (const [slug, ex] of Object.entries(N)) {
  if (ex.length > 155) throw new Error('too long ' + ex.length + ' ' + slug);
  const p = a.find(x => x.slug === slug); if (!p) throw new Error('missing ' + slug);
  p.excerpt = ex; n++;
}
fs.writeFileSync('data/blog.json', JSON.stringify(a, null, 2), 'utf8');
console.log('excerpts changed', n, 'still over 155:', a.filter(p => p.excerpt.length > 155).length);
