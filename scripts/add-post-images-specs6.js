// Image specs, set 6 (12 Nov 2026): automated-link-building-2026 had no content images, how-to-create-a-sitemap had two. Facts come from the posts themselves (which cite Google's documentation).
module.exports = D => [
  {
    slug: 'automated-link-building-2026',
    images: [
      { name: 'three-meanings', afterH2: 'What "Automated Link Building" Actually Means', alt: 'Three things called automated link building: research, outreach and link placement automation',
        svg: D.cards({ w: 1200, h: 520, title: 'Three things people call automated link building', qLabel: 'Risk', items: [
          { big: 'Research', t: 'Tools that crawl and surface public data', d: 'Competitor links, lost links, ranking pages', q: 'Does not manipulate rankings' },
          { big: 'Outreach', t: 'Software that finds contacts and sends pitches', d: 'Templated or personalised', q: 'Safe with guardrails' },
          { big: 'Placement', t: 'Systems that create links outright', d: 'No person reviews where they land', q: 'The risky part' }] }) },
      { name: 'safe-or-not', afterH2: 'Safe to Automate vs. Not Safe to Automate', alt: 'Which link building stages are safe to automate and which are not',
        svg: D.compare({ w: 1200, h: 480, title: 'Which stages to automate', left: { h: 'Keep a human', items: ['Placing the links themselves', 'Mass identical pitches that burn reputation'] }, right: { h: 'Safe to automate', items: ['Backlink and competitor research', 'Prospect list building', 'Contact discovery', 'Outreach sending, with relevant pitches'] } }) },
      { name: 'eighty-twenty', afterH2: 'The Hybrid Approach', alt: 'Hybrid approach: automate the repetitive 80 percent, keep a person for the 20 percent',
        svg: D.stats({ cols: 2, title: 'The hybrid approach', items: [
          { big: '80%', t: 'the repetitive work to automate: research and logistics' }, { big: '20%', t: 'stays with a person: what decides if a link helps or hurts', color: '#F5A623' }] }) }
    ]
  },
  {
    slug: 'how-to-create-a-sitemap',
    images: [
      { name: 'formats', afterH2: 'The Three Formats Google Accepts', alt: 'Three sitemap formats Google accepts: XML sitemap, RSS or Atom feed and text sitemap',
        svg: D.cards({ w: 1200, h: 500, title: 'Three formats Google treats as equivalent', qLabel: 'Best for', items: [
          { big: 'XML', t: 'The standard format', d: 'Extensible for images, video and news', q: 'Most sites' },
          { big: 'RSS / Atom', t: 'A feed your CMS already makes', d: 'List only new or updated URLs', q: 'Sites with a feed' },
          { big: 'Text', t: 'One absolute URL per line', d: 'No markup at all', q: 'Very simple sites' }] }) }
    ]
  }
];
