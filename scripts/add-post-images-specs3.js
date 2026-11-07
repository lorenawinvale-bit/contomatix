// Image specs, set 3 (7 Nov 2026): the three posts that had no images inside their content. Facts come from the posts themselves.
module.exports = D => [
  {
    slug: 'link-building-agencies-dubai-2026',
    images: [
      { name: 'checks', afterH2: 'How These Agencies Were Chosen', alt: 'Three checks each Dubai agency cleared: Clutch reviews, a real website, link building as a service',
        svg: D.cards({ w: 1200, h: 520, title: 'Three checks every agency had to clear', qLabel: 'Why', items: [
          { big: '1', t: 'Independent client reviews', d: 'Collected on Clutch, not only testimonials on its own site', q: 'Third-party proof' },
          { big: '2', t: 'A working website', d: 'Names real services and, where available, real team members', q: 'Something to verify' },
          { big: '3', t: 'Link building as its own service', d: 'Not a single bullet inside a generic SEO package', q: 'A real methodology' }] }) },
      { name: 'signing', afterH2: 'What to Check Before Signing', alt: 'Five checks before signing with a link building agency, from how links are earned to timeline',
        svg: D.timeline({ title: 'Five checks before you sign', items: [
          { d: 'Check 1', t: 'How are links earned?', c: 'Outreach, guest content and PR are legitimate' }, { d: 'Check 2', t: 'Where are links placed?', c: 'Real content and traffic, not just a rating' },
          { d: 'Check 3', t: 'What does the retainer include?', c: 'How many placements per month' }, { d: 'Check 4', t: 'Who owns your accounts?', c: 'Website, analytics and Search Console' }, { d: 'Check 5', t: 'Is the timeline realistic?', c: 'Three to six months at minimum' }] }) }
    ]
  },
  {
    slug: 'how-to-find-competitor-backlinks-2026',
    images: [
      { name: 'competitors', afterH2: 'Pick the Right Competitors', alt: 'Two kinds of competitor: SERP competitors and business competitors, three to five of each',
        svg: D.split({ w: 1200, h: 440, title: 'Two kinds of competitor', big: '3-5', bigLabel: 'competitors to analyze from each kind', items: [
          { v: 'SERP', t: 'Sites ranking for your exact keywords' }, { v: 'Business', t: 'Companies you compete with for customers' }] }) },
      { name: 'filter', afterH2: 'Filtering the List', alt: 'Four filters for a competitor backlink report: relevance, replicability, real traffic and link type',
        svg: D.cards({ w: 1200, h: 520, title: 'Four filters before any outreach', qLabel: 'Ask', items: [
          { big: '1', t: 'Relevance over authority', d: 'On-topic beats a high score with no connection', q: 'Is it about your topic?' },
          { big: '2', t: 'Replicability', d: 'A guest post can be repeated, a press mention cannot', q: 'Can you recreate it?' },
          { big: '3', t: 'Real traffic', d: 'A score can hide a page nobody visits', q: 'Does the page get visitors?' },
          { big: '4', t: 'Link type', d: 'Dofollow does ranking work, nofollow mostly visibility', q: 'Is it followed?' }] }) }
    ]
  },
  {
    slug: 'best-crm-automation-tools-2026',
    images: [
      { name: 'fit', afterH2: 'Which Tool Fits Your Team Size and Stage', alt: 'Which CRM fits which stage, from a solo founder to an enterprise with compliance requirements',
        svg: D.timeline({ title: 'Which CRM fits your stage', items: [
          { d: 'Solo founder', t: 'Start free', c: 'HubSpot free CRM or Zoho free plan' }, { d: '3 to 10 people', t: 'A marketing team', c: 'ActiveCampaign or HubSpot Marketing Hub Starter' },
          { d: '10 to 50 people', t: 'A sales-led scaleup', c: 'Pipedrive or monday CRM' }, { d: 'Enterprise', t: 'Several units, heavy compliance', c: 'Salesforce or HubSpot Enterprise' }] }) },
      { name: 'security', afterH2: 'Security and Compliance', alt: 'Three CRM security answers to get in writing: SOC 2 Type II, a GDPR DPA and data residency',
        svg: D.cards({ w: 1200, h: 500, title: 'Three answers to get in writing', qLabel: 'Do not accept', items: [
          { big: 'SOC 2', t: 'The Type II report', d: 'Controls shown to work over months, not one day', q: 'A badge on a trust page' },
          { big: 'DPA', t: 'GDPR terms', d: 'A signed Data Processing Agreement for EU contacts', q: 'Only a privacy policy' },
          { big: 'Where', t: 'Data residency', d: 'Where data is hosted and the vendor\'s jurisdiction', q: 'No answer on hosting' }] }) }
    ]
  },
  {
    slug: 'seo-audit-report-template',
    images: [
      { name: 'cwv', afterH2: 'Checks Google Gives Numbers For', alt: 'Good Core Web Vitals thresholds: LCP 2.5 s, INP 200 ms, CLS 0.1, at the 75th percentile',
        svg: D.cards({ w: 1200, h: 520, title: 'Core Web Vitals: the "good" thresholds, at the 75th percentile', qLabel: 'Good', items: [
          { big: '2.5 s', t: 'Largest Contentful Paint', d: 'Loading performance', q: '2.5 seconds or less' },
          { big: '200 ms', t: 'Interaction to Next Paint', d: 'Interactivity', q: '200 milliseconds or less' },
          { big: '0.1', t: 'Cumulative Layout Shift', d: 'Visual stability', q: '0.1 or less' }] }) }
    ]
  },
  {
    slug: 'sitemap-priority',
    images: [
      { name: 'google-rule', afterH2: 'What Google Says About Priority and Changefreq', alt: 'Google ignores priority and changefreq and uses lastmod only if consistently and verifiably accurate',
        svg: D.stats({ cols: 3, title: 'What Google does with the three optional tags', items: [
          { big: 'priority', t: 'Ignored by Google' }, { big: 'changefreq', t: 'Ignored by Google', color: '#F5A623' }, { big: 'lastmod', t: 'Used only if consistently and verifiably accurate' }] }) },
      { name: 'lastmod-rule', afterH2: 'Lastmod: The Tag Worth Getting Right', alt: 'Lastmod updates that count: content, structured data, links. The copyright date does not',
        svg: D.compare({ w: 1200, h: 460, title: 'What counts as a significant update for lastmod', left: { h: 'Not significant', items: ['An update to the copyright date'] }, right: { h: 'Significant', items: ['An update to the main content', 'An update to the structured data', 'An update to links on the page'] } }) }
    ]
  }
];
