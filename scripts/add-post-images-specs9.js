// Image specs, set 9 (15 Nov 2026): why-hire-a-forensic-seo-consultant-2026 and how-to-vet-a-local-seo-company-2026 had no content images. Facts come from the posts and the Google pages they cite.
module.exports = D => [
  {
    slug: 'why-hire-a-forensic-seo-consultant-2026',
    images: [
      { name: 'when-needed', afterH2: 'When You Actually Need One', alt: 'Four situations for forensic SEO: traffic drop, manual action, inherited site, negative SEO',
        svg: D.cards({ w: 1200, h: 520, title: 'When a standard audit is not enough', qLabel: 'Starts with', items: [
          { big: 'Drop', t: 'Traffic or rankings fell with no site change', d: 'The checklist finds nothing', q: 'A dated timeline' },
          { big: 'Manual action', t: 'A notice in Search Console', d: 'Often vague about which links', q: 'The affected pages' },
          { big: 'Inherited', t: 'A site from an agency you cannot account for', d: 'Unclear past work', q: 'A change history' },
          { big: 'Attack', t: 'Suspected negative SEO', d: 'Spammy links from a rival', q: 'Dated link evidence' }] }) },
      { name: 'afternoon-timeline', afterH2: 'A Forensic Timeline You Can Build in One Afternoon', alt: 'Four steps to build a traffic drop timeline in Search Console: range, compare, reports, update dates',
        svg: D.flow({ w: 1200, h: 440, title: 'Build the timeline in four moves', steps: [
          { t: 'Set 16 months', s: 'Rule out a yearly pattern', c: 'Performance report' }, { t: 'Compare', s: 'Previous period or year over year', c: 'Queries, pages, devices' }, { t: 'Read reports', s: 'Crawl, indexing, security, manual actions', c: 'Look for a spike' }, { t: 'Match the date', s: 'Google ranking updates page', c: 'And Google Trends' }] }) },
      { name: 'reconsideration', afterH2: 'Manual Actions Specifically', alt: 'A good reconsideration request: explain the issue, describe the fixes, document the outcome',
        svg: D.timeline({ w: 1200, h: 400, title: 'What a good reconsideration request does', items: [
          { d: 'Explain', t: 'The exact quality issue', c: 'Which pages and why' }, { d: 'Describe', t: 'The steps you took to fix it', c: 'On all affected pages' }, { d: 'Document', t: 'The outcome of your efforts', c: 'Then wait for a decision' }] }) }
    ]
  },
  {
    slug: 'how-to-vet-a-local-seo-company-2026',
    images: [
      { name: 'questions', afterH2: 'How to Vet a Local SEO Company: Questions to Ask Before You Sign', alt: 'Three questions to ask a local SEO company: who works on it, who owns accounts, what not to buy',
        svg: D.cards({ w: 1200, h: 520, title: 'Three questions that sort real from resold', qLabel: 'Good answer', items: [
          { big: 'Who?', t: 'Who works on my account every day', d: 'Not just who pitches', q: 'A name and background' },
          { big: 'Whose?', t: 'Who owns Analytics, Search Console and the profile', d: 'Accounts in your name', q: 'You, with access for them' },
          { big: 'Not?', t: 'What would you tell me not to spend on', d: 'Advice, not just selling', q: 'A real example' }] }) },
      { name: 'first-90-days', afterH2: 'What a Good First 90 Days Looks Like', alt: 'First 90 days of a local SEO engagement: access and audit, easy fixes, then content and links',
        svg: D.timeline({ w: 1200, h: 420, title: 'The shape of a good first quarter', items: [
          { d: 'Weeks 1-2', t: 'Access and baseline', c: 'Your accounts, audit, written baseline' }, { d: 'Weeks 3-6', t: 'Fixes with no debate', c: 'Titles, profile, citations, speed' }, { d: 'Weeks 7-12', t: 'Content and links begin', c: 'Slow to register, then compound' }] }) },
      { name: 'google-signals', afterH2: 'What Google Itself Tells You to Ask an SEO', alt: 'Warning signs and good signs when hiring an SEO, from Google guidance',
        svg: D.compare({ w: 1200, h: 480, title: 'Signals from Google\'s hiring advice', left: { h: 'Walk away', items: ['Guarantees a number one ranking', 'Claims a special relationship with Google', 'Is secretive about the work', 'Wants you to link to them'] }, right: { h: 'Good signs', items: ['Shares every change and its reasoning', 'Cites Google documentation', 'Asks about your business first', 'Names real past work'] } }) }
    ]
  }
];
