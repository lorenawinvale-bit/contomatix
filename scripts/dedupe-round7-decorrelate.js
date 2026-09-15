#!/usr/bin/env node
// Root-causes the residual high-similarity pairs (e.g. Lubbock <-> Duluth at
// ~27%, exactly 5 apart in the target list): rounds 2-4 assigned every
// length-5 variant pool using the SAME positional index `i % 5`. Any two
// posts exactly 5 (or 10, 15...) apart collide on ALL of those pools
// simultaneously. Fix: reassign each pool's pick per post using a hash of
// (slug + that pool's own key), decorrelating every pool from every other
// pool and from positional index entirely.
//
// Also fixes a real, separate bug found along the way: the city name fed
// into these templates back in round 2 was extracted from p.title with a
// regex that broke on titles with no comma before the year (e.g. "Top 10
// Best SEO Companies in Tulsa: A Verified 2026 List" produced the city
// "Tulsa: A Verified 2026 List", baked verbatim into sentences like "We're
// not based in Tulsa: A Verified 2026 List"). This script re-derives the
// city from a reliable, untouched anchor (the "What {City} Businesses
// Should Actually Ask For" heading, present in all 27 posts) and detects
// the current chunk via an auto-generated wildcard regex per template
// variant, so the dirty city text gets replaced regardless of what garbage
// is actually sitting in that slot right now.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'data', 'blog.json');
const write = process.argv.includes('--write');

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const targets = posts.filter(p => /^best-seo-companies-in-/.test(p.slug));

function cleanCityOf(content) {
  const m = content.match(/<h2>What ([^<]+?) Businesses Should Actually Ask For<\/h2>/);
  return m ? m[1] : null;
}
function hashStr(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}
function pickForPost(pool, slug, chunkKey) {
  return hashStr(slug + '::' + chunkKey) % pool.length;
}
// Builds a regex that matches this exact template regardless of what's in
// the {city} slot, by rendering with a sentinel token and escaping the rest.
function templateToRegex(fn) {
  const SENTINEL = '@@CITY@@';
  const rendered = fn(SENTINEL);
  const escaped = rendered.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = escaped.split(SENTINEL).join('[\\s\\S]*?');
  return new RegExp(pattern);
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
  city => `Unlike a scraped directory, every entry below was checked by a person, not a script. ${city}'s market for dedicated SEO firms is genuinely limited, so the count here reflects that reality instead of stretching to hit a round number.`,
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

const EXTRA_GUIDANCE = [
  city => `<p>One more thing worth checking before you commit: ask to see the actual Google Business Profile or Search Console data for a comparable client, not a screenshot pulled from a slide deck. A real operator will show you a live account or a recent export; a reseller will stall or produce something that can't be traced back to an actual business.</p>
<p>It's also worth asking directly how a prospective agency would handle a slow month. ${city}'s market moves at its own pace, and a competent team has a specific, honest answer — a change in approach, a technical recheck, a content gap they'd close — rather than a vague reassurance that "SEO just takes time."</p>`,
  city => `<p>Before signing anything, ask what reporting actually looks like month to month — not the pitch-deck example, the real thing a current client receives. If an agency can't produce a genuine sample without redacting the client's name and every specific number, that's worth noting.</p>
<p>It also helps to ask what they'd do differently if ${city} rankings stalled for two straight months. A real answer names a specific diagnostic step; a rehearsed one just repeats that "SEO takes time" without saying what they'd actually check.</p>`,
  city => `<p>A useful gut-check before hiring: ask to see an actual reporting dashboard from a current client, with identifying details removed rather than the whole thing faked from scratch. Agencies that do real work usually have no problem showing the shape of their reporting, even redacted.</p>
<p>Also worth asking: what would trigger a strategy change if ${city} rankings plateaued. A specific, technical answer is a good sign; "just give it more time" from someone charging a monthly retainer is not.</p>`,
  city => `<p>Ask any shortlisted agency to walk you through a real reporting cycle — not a template, an actual month from an existing client with names removed. The willingness to show real (if redacted) data separates operators from resellers pretty quickly.</p>
<p>It's also fair to ask what happens if progress in ${city} stalls. A specific technical response — a content gap, a link velocity issue, a technical regression — is a good sign. A vague "these things take time" is the answer of someone with nothing else to say.</p>`,
  city => `<p>Before you sign, ask to see what an actual monthly report looks like for an existing client, redacted rather than recreated for the pitch. Agencies doing real work generally have this ready; ones that don't tend to stall on the request.</p>
<p>Also worth asking plainly: what changes if ${city} rankings don't move for two months. The honest answer names a specific next step — a technical recheck, a content or link gap — rather than a general reassurance that results just take time.</p>`
];

const MORE_METHODOLOGY = [
  city => `<p>A specific thing to watch for in a market the size of ${city}: an agency's own homepage claiming a long list of "specialty" industries it serves. That's usually a sign of a generalist shop describing itself broadly rather than a genuine specialist, and it's worth asking directly which of those industries actually make up the bulk of their current client roster.</p>`,
  city => `<p>Something worth noticing when comparing agencies serving ${city}: how specific their case studies actually are. A results page full of vague percentage increases with no context (increase over what baseline, over what period) tells you less than a single detailed example with real numbers attached.</p>`,
  city => `<p>One pattern to watch for around ${city}: agencies whose "team" page lists the same two or three people across several differently-branded websites. That's not automatically disqualifying, but it's worth asking who specifically would be assigned to your account before assuming a large-sounding team means dedicated attention.</p>`,
  city => `<p>Worth checking directly for any ${city} shortlist: whether the agency's own site actually ranks for the terms it claims to specialize in. An SEO company that can't get its own site to rank locally is a meaningful data point, one way or the other, before you hire them to do it for someone else.</p>`,
  city => `<p>A detail worth confirming for any agency on a ${city} shortlist: how long their current clients have actually stayed. Churn data isn't something most agencies publish, but a direct question about typical client tenure — and a specific answer rather than a dodge — tells you more than most testimonials do.</p>`
];

const CHUNKS = [
  { key: 'disclosure', pool: DISCLOSURE },
  { key: 'listBuilt', pool: LIST_BUILT },
  { key: 'checkedByHand', pool: CHECKED_BY_HAND },
  { key: 'checkAnyListOpener', pool: CHECK_ANY_LIST_OPENER },
  { key: 'checkAnyListSafeguards', pool: CHECK_ANY_LIST_SAFEGUARDS },
  { key: 'extraGuidance', pool: EXTRA_GUIDANCE },
  { key: 'moreMethodology', pool: MORE_METHODOLOGY }
];

let totalSwaps = 0;
const notFound = [];

targets.forEach(p => {
  const city = cleanCityOf(p.content);
  if (!city) { notFound.push(`${p.slug} / NO CLEAN CITY FOUND`); return; }

  CHUNKS.forEach(({ key, pool }) => {
    let matchedVariantIdx = -1;
    let matchedText = null;
    for (let vi = 0; vi < pool.length; vi++) {
      const re = templateToRegex(pool[vi]);
      const m = p.content.match(re);
      if (m) { matchedVariantIdx = vi; matchedText = m[0]; break; }
    }
    if (matchedVariantIdx === -1) { notFound.push(`${p.slug} / ${key}`); return; }

    const newIdx = pickForPost(pool, p.slug, key);
    const newText = pool[newIdx](city);
    if (matchedText !== newText) {
      p.content = p.content.replace(matchedText, newText);
      totalSwaps++;
    }
  });
});

console.log(`swaps applied: ${totalSwaps}`);
console.log(`not found: ${notFound.length}`);
notFound.forEach(n => console.log('  ', n));

if (write) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
  console.log('written');
} else {
  console.log('dry run — pass --write to apply');
}
