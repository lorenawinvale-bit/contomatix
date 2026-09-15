#!/usr/bin/env node
// Round 2 of de-duplicating the "best-seo-companies-in-[city]" series: after
// round 1 removed the fully city-agnostic H2 sections, several more chunks
// were still ~90-100% identical across all 27 posts even though they read as
// "city-specific" (the FAQ *question* has the city name, but the *answer*
// text was pasted verbatim). This rewrites each of those chunks into 5
// distinct variants, assigned per post the same way as round 1, so no chunk
// is repeated more than ~5-6 times instead of 27.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const targets = posts.filter(p => /^best-seo-companies-in-/.test(p.slug));

function cityOf(title) {
  const m = title.match(/in ([^,—]+?)(?:,|—|$)/);
  return m ? m[1].trim() : 'this market';
}

const DISCLOSURE = [
  city => `One disclosure up front: we're an SEO agency ourselves. We're not based in ${city}, we don't appear on this list, and no company below paid for a placement.`,
  city => `Full disclosure before you read further: we run an SEO agency. We have no office in ${city}, no entry on this list, and took no payment from anyone featured here.`,
  city => `Worth stating plainly: we're an SEO agency too. None of that is ${city}-based work of ours, we're not a candidate for our own list, and nobody here paid to be included.`,
  city => `A disclosure that applies to every list like this one: we're in the SEO business ourselves. We don't operate in ${city}, we're not eligible to appear here, and placement below was never for sale.`,
  city => `Up front: this is written by an SEO agency (us). We have no ${city} presence, we're excluded from our own list on principle, and every entry below got there without paying.`
];

const LIST_BUILT = [
  () => `<p>Four checks, applied to every entry:</p>
<ul>
<li><strong>The website actually loads and has real content</strong> — verified by hand, not by an automated status code, since a parked domain can still return a healthy-looking response</li>
<li><strong>SEO is a genuine, standalone service</strong>, not one line buried on a web design page</li>
<li><strong>A traceable connection to the local market</strong> — and if a company has since expanded elsewhere, that's noted rather than glossed over</li>
<li><strong>A clear specialism</strong>, so the entry actually tells you something rather than reading as generic "full-service digital marketing"</li>
</ul>
<p>What this list is <em>not</em>: a ranking by client results. No outsider can verify another agency's outcomes, and any list presenting a strict "best to worst" order is inventing that part. Read the numbering as a grouping, not a scoreboard.</p>`,
  () => `<p>Every entry had to clear the same four bars:</p>
<ul>
<li><strong>A working site with substance behind it</strong> — opened and read manually, because a technically "live" domain can still be an empty shell</li>
<li><strong>SEO as an actual service line</strong>, not a bullet point tacked onto a web design page</li>
<li><strong>A confirmed local footprint</strong>, with any later expansion into other markets stated rather than hidden</li>
<li><strong>A real specialism</strong> rather than a catch-all "full-service digital marketing" pitch that says nothing specific</li>
</ul>
<p>One thing this list deliberately avoids: ranking by results. Nobody outside an agency's own client roster can verify its outcomes, so a confident "best to worst" order is a claim someone invented. The order below is a grouping, not a leaderboard.</p>`,
  () => `<p>Inclusion required passing all four of these:</p>
<ul>
<li><strong>A functioning website with real content on it</strong>, confirmed manually rather than trusting a status code, since a parked domain can still look "up"</li>
<li><strong>SEO offered as its own service</strong>, not a single mention on a broader design page</li>
<li><strong>A verifiable local tie</strong>, with later expansion beyond the area disclosed rather than quietly dropped</li>
<li><strong>A specific angle worth naming</strong>, instead of a vague "full-service digital marketing" catch-all</li>
</ul>
<p>What's deliberately missing here: a results-based ranking. No one outside an agency's client list can actually verify its outcomes, so any numbered "best to worst" claim is invented. Treat the order as a grouping rather than a scoreboard.</p>`,
  () => `<p>To make this list, an agency had to clear four separate checks:</p>
<ul>
<li><strong>An actual working website</strong> — opened by hand and read, not just pinged for a status code, since a dormant domain can still respond fine</li>
<li><strong>SEO as a real, dedicated offering</strong>, not a single line item under web design</li>
<li><strong>A genuine local connection</strong>, with any expansion into new markets since noted openly</li>
<li><strong>A specialism that says something</strong>, rather than a generic "full-service digital marketing" label</li>
</ul>
<p>Deliberately absent: any ranking by outcomes. Client results aren't independently verifiable by an outsider, so a strict "best to worst" order would be a fabrication. What follows is a grouping, not a leaderboard.</p>`,
  () => `<p>Four filters decided who made this list:</p>
<ul>
<li><strong>A live site with genuine content</strong>, checked manually rather than via an automated crawl, because a parked domain can pass a basic check and still be empty</li>
<li><strong>SEO as its own service</strong>, not a passing mention on a design-focused page</li>
<li><strong>A real, checkable local presence</strong>, with expansion into other areas disclosed rather than buried</li>
<li><strong>A defined specialism</strong>, so the write-up says something concrete instead of "full-service digital marketing"</li>
</ul>
<p>This is not a results-based ranking, and doesn't pretend to be one — no outsider can verify another agency's client outcomes, so a numbered "best to worst" claim would be made up. Read the order as grouped categories, not a scoreboard.</p>`
];

const CHECKED_BY_HAND = [
  city => `This list works differently: every agency below had its website opened and read by hand, not scraped or auto-generated. ${city} is a small enough market for dedicated SEO firms that this list runs shorter than a padded top-ten — every name here is a real, currently operating business.`,
  city => `The approach here is manual, not automated: someone actually opened and read every site below before it was included. Given how few dedicated SEO firms operate specifically in ${city}, this list stays honest about its length rather than padding it out to round ten.`,
  city => `Unlike a scraped directory, every entry below was checked by a person, not a script. ${city}'s market for dedicated SEO firms is genuinely limited, so the count here reflects that reality instead of stretching to hit a round number.</p>`,
  city => `What makes this different from a typical listicle: a human actually visited and read each site below. Because ${city} doesn't support an unlimited number of dedicated SEO firms, this list is only as long as the real, currently operating options warrant.`,
  city => `Every business on this list was manually verified — someone opened the actual website and read it, rather than trusting an automated crawl. ${city}'s pool of dedicated SEO firms is small enough that padding this out to a round number would mean including agencies that don't actually qualify.`
];

const CHECK_ANY_LIST_OPENER = [
  city => `Plenty of "best SEO companies" lists, including ones ranking for ${city} specifically, are directory pages where placement can be bought, sponsored, or sold as a premium slot. That's not inherently dishonest as a business model, but it does mean the ordering reflects ad spend more than assessed quality.`,
  city => `A fair number of the highest-ranking "SEO company" lists for ${city} are pay-to-play directories where a placement can be purchased or sponsored. That's a legitimate way to run a directory business, but it means the order tracks marketing budgets, not quality.`,
  city => `Many "top SEO agency" rankings that surface for ${city} searches are directory sites monetized through paid placement or sponsored slots. Nothing wrong with that as a model, but it means rank order tells you about ad budget, not agency quality.`,
  city => `A lot of what ranks for "best SEO companies in ${city}" is directory content where a listing can be bought or sponsored. That's a viable business model for the directory itself, but the resulting order says more about who paid than who's actually good.`,
  city => `Search for "best SEO companies in ${city}" and several results will be directory pages monetized by paid or sponsored placement. That's fine as a directory's business model, but it means the ranking reflects budget, not necessarily competence.`
];

const CHECK_ANY_LIST_SAFEGUARDS = [
  () => `Two checks work on any such list: see whether it explains its own methodology, and click through to two or three of the named sites yourself.`,
  () => `Two safeguards apply no matter which list you're reading: check if it discloses how it was put together, and actually visit two or three of the sites yourself.`,
  () => `Two things are worth doing before trusting any such list: look for a stated methodology, and click through to a few of the named sites in person.`,
  () => `Two habits protect you regardless of the source: check for a disclosed methodology, and visit a handful of the named sites directly instead of trusting the summary.`,
  () => `Two quick checks apply to any list like that: does it say how entries were chosen, and have you actually opened a few of the sites yourself?`
];

const HIRE_LOCAL_ANSWER = [
  city => `Local helps mainly for face-to-face contact and market familiarity, especially if your customers are concentrated around ${city}. The underlying technical work doesn't depend on geography, so if you serve customers beyond the immediate area, ruling out non-local agencies costs you options without a real technical upside.`,
  city => `Being local mostly matters for in-person meetings and knowing the ${city} market firsthand. The technical side of SEO is identical no matter where an agency sits, so if your customer base extends past ${city}, limiting yourself to local-only options trades away choice for no functional gain.`,
  city => `The case for local comes down to face time and local knowledge — genuinely useful if virtually all your customers are around ${city}. But the technical execution is the same regardless of an agency's address, so a business serving a wider area gains little by excluding non-local firms.`
];

const COST_ANSWER = [
  () => `In line with typical US figures — agencies run roughly $99/hour or about $3,200/month, and independent freelancers closer to $72/hour or $1,350/month. Actual quotes vary with scope, so treat these as a starting reference rather than a fixed number.`,
  () => `Roughly matching national averages: agencies around $99 an hour or near $3,200 monthly, freelancers closer to $72 an hour or about $1,350 monthly. Get a written quote either way, since scope changes the number quickly.`,
  () => `Close to the broader US norm — think $99/hour and roughly $3,200/month for an agency, versus about $72/hour and $1,350/month for a freelancer. Use these as a sanity check against any quote you receive, not a guaranteed price.`
];

const FOCUS_FIRST_ANSWER = [
  city => `Google Business Profile accuracy, consistent name-address-phone details across directories, an active review pipeline, and a handful of genuinely well-written local pages. In a market the size of ${city}, these fundamentals typically outperform a broad, national-style campaign.`,
  city => `Start with Google Business Profile hygiene, matching business details across every directory, an ongoing review-collection habit, and a few solidly written local pages. For a market like ${city}, that groundwork usually beats a broad, nationally-styled SEO push.`,
  city => `Get the basics right first: Google Business Profile details, consistent citations everywhere the business is listed, real reviews coming in regularly, and a small set of well-written local pages. In a ${city}-sized market, that typically outperforms a wide, national-style campaign.`
];

const TIMELINE_ANSWER = [
  () => `Local fixes — Google Business Profile corrections, citation cleanup — can show movement within weeks. Broader organic rankings are slower, typically three to six months before they're meaningfully different.`,
  () => `Expect local signals like Google Business Profile changes to shift within a few weeks. Organic rankings take longer to move, usually somewhere in the three-to-six-month range.`,
  () => `Google Business Profile and citation fixes tend to show up fast, often within weeks. Organic rankings move on a slower clock — plan on three to six months before real change is visible.`
];

function pick(arr, i) { return arr[i % arr.length]; }

const counts = { disclosure: 0, listBuilt: 0, checkedByHand: 0, checkAnyListOpener: 0, checkAnyListSafeguards: 0, hireLocal: 0, cost: 0, focusFirst: 0, timeline: 0 };
let changed = 0;
targets.forEach((p, i) => {
  const city = cityOf(p.title);
  const before = p.content;

  const tryReplace = (key, re, replacement) => {
    const had = re.test(p.content);
    p.content = p.content.replace(re, replacement);
    if (had) counts[key]++;
  };

  tryReplace('disclosure', /One disclosure up front:[\s\S]*?paid to be here\./, pick(DISCLOSURE, i)(city));
  tryReplace('listBuilt', /<p>Four checks, applied to every entry:<\/p>[\s\S]*?Treat the numbering as a list, not a league table\.<\/p>/, pick(LIST_BUILT, i)());
  tryReplace('checkedByHand', /This list works differently\. Every agency below had its website opened and checked by hand in \w+ 2026\.[^<]*/, pick(CHECKED_BY_HAND, i)(city));
  tryReplace('checkAnyListOpener', /Several of the highest-ranking [^ ]+ SEO lists are directory sites where agencies can pay for placement, sponsored positions or premium profiles\. That's a legitimate business model, but it means the order reflects marketing spend rather than assessed quality\./, pick(CHECK_ANY_LIST_OPENER, i)(city));
  tryReplace('checkAnyListSafeguards', /Two practical safeguards when reading any such list: check whether the page discloses how it was compiled, and click through to two or three of the listed sites\./, pick(CHECK_ANY_LIST_SAFEGUARDS, i)());
  tryReplace('hireLocal', /Local helps for face-to-face contact and local market knowledge, particularly if all your customers are in the area\. The technical work itself doesn't depend on location, so if you serve customers beyond \w[\w .]*?, restricting to local agencies narrows your options without a technical benefit\./, pick(HIRE_LOCAL_ANSWER, i)(city));
  tryReplace('cost', /Broadly in line with US averages — agencies around \$99 an hour and roughly \$3,200 monthly, freelancers around \$72 an hour and \$1,350 monthly\.[^<]*/, pick(COST_ANSWER, i)());
  tryReplace('focusFirst', /Google Business Profile optimization, consistent name-address-phone details across directories, a genuine review pipeline, and a few well-written local pages\. In a[^.]*market these fundamentals typically outperform a broader national-style campaign\./, pick(FOCUS_FIRST_ANSWER, i)(city));
  tryReplace('timeline', /Local SEO improvements such as Google Business Profile fixes can show within weeks\. Broader organic rankings typically take three to six months\./, pick(TIMELINE_ANSWER, i)());

  if (p.content !== before) changed++;
});

console.log(`posts modified: ${changed}/${targets.length}`);
console.log(counts);
if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
