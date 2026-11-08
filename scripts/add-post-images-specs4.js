// Image specs, set 4 (8 Nov 2026): posts with fewer than three content images. Facts come from the posts themselves.
module.exports = D => [
  {
    slug: 'gravitywrite-alternatives-2026',
    images: [
      { name: 'criteria', afterH2: 'How These Alternatives Were Evaluated', alt: 'Four criteria for comparing GravityWrite alternatives: draft quality, SEO depth, workflow, pricing',
        svg: D.cards({ w: 1200, h: 520, title: 'Four criteria for every tool', qLabel: 'Question', items: [
          { big: '1', t: 'Draft quality', d: 'How close the first draft gets to publishable', q: 'Heavy editing needed?' },
          { big: '2', t: 'SEO and GEO depth', d: 'Real optimization, not keyword stuffing', q: 'Is it more than surface level?' },
          { big: '3', t: 'Workflow coverage', d: 'Research through final publishing', q: 'Or drafting alone?' },
          { big: '4', t: 'Verified pricing', d: 'Current 2026 prices, independently checked', q: 'Is the figure stale?' }] }) },
      { name: 'needs', afterH2: 'How to Choose Based on Your Actual Need', alt: 'Which kind of AI writing tool fits which need, from publish-ready drafts to bulk content clusters',
        svg: D.timeline({ title: 'Match the tool to your need', items: [
          { d: 'Quality', t: 'Strong SEO depth', c: 'Publish-ready drafts, not fast ones that need rewriting' }, { d: 'Budget', t: 'Lowest-priced options', c: 'Solo operation: price matters more than extras' },
          { d: 'Team', t: 'Brand voice consistency', c: 'Worth a higher per-seat cost' }, { d: 'Refresh', t: 'SERP research first', c: 'Before any drafting' }, { d: 'Bulk', t: 'Built for scale', c: 'Rather than one polished piece' }] }) },
      { name: 'edit-signs', afterH2: 'Signs an AI Content Tool', alt: 'Three signs an AI draft needs more editing: repeated phrases, unsourced claims and generic openings',
        svg: D.split({ w: 1200, h: 460, title: 'Signs a draft needs more editing', big: '3', bigLabel: 'signs to look for', items: [
          { v: 'Repeats', t: 'The same connector phrases in every paragraph' }, { v: 'No cite', t: 'Confident claims with no source' }, { v: 'Generic', t: 'Openings that fit any topic' }] }) }
    ]
  },
  {
    slug: 'instagram-search-optimization-2026',
    images: [
      { name: 'signals', afterH2: 'How Instagram Search Actually Ranks Results', alt: 'Instagram Search signals in order of weight: text, activity and popularity',
        svg: D.cards({ w: 1200, h: 500, title: 'Instagram Search: three signals, in order', qLabel: 'Weight', items: [
          { big: 'Text', t: 'What someone types', d: 'Usernames, bios, captions, hashtags', q: 'The most important signal' },
          { big: 'Activity', t: 'Your own behaviour', d: 'Follows, views, past interactions', q: 'Second' },
          { big: 'Popularity', t: 'How well liked', d: 'Mostly breaks ties between matching accounts', q: 'Third' }] }) },
      { name: 'profile-flow', afterH2: 'Profile, Username, and Bio Optimization', alt: 'Where to put keywords on Instagram: handle, bio and captions with two or three hashtags',
        svg: D.flow({ title: 'Where the keywords go', steps: [
          { t: 'Handle', s: 'A name related to your content', c: 'Meta\'s best bet for relevant searches' }, { t: 'Bio', s: 'Searchable nouns', c: 'The service, niche or city' }, { t: 'Captions', s: 'Keywords and 2 to 3 hashtags', c: 'Inside the caption, not a comment' }] }) },
      { name: 'timeframe', afterH2: 'Realistic Benchmarks and Timeframes', alt: 'Instagram SEO timing: no published weeks, four to eight weeks as a realistic first checkpoint',
        svg: D.stats({ cols: 3, title: 'How long before it works', items: [
          { big: '0', t: 'exact number of weeks published by Meta' }, { big: '4 to 8', t: 'weeks of steady posting as a realistic first checkpoint', color: '#F5A623' }, { big: '3 s', t: 'the window where a viewer decides whether to keep watching a Reel' }] }) }
    ]
  },
  {
    slug: 'white-label-seo',
    images: [
      { name: 'policy', afterH2: 'What Google\'s Policy Actually Says', alt: 'What Google\'s site reputation policy targets in white label SEO and what it does not',
        svg: D.compare({ w: 1200, h: 480, title: 'Google\'s third-party content policy, in practice', left: { h: 'What the policy targets', items: ['Content placed on an unrelated site mainly to borrow its ranking signals', 'Near-identical content mass-produced for placement'] }, right: { h: 'What it does not target', items: ['Third-party content on its own', 'An agency reselling work on sites it genuinely manages'] } }) },
      { name: 'build-or-buy', afterH2: 'Build In-House or White Label', alt: 'Safest SEO work to white label: content easiest, technical in between, link building riskiest',
        svg: D.cards({ w: 1200, h: 500, title: 'Build or white label, by discipline', qLabel: 'Verdict', items: [
          { big: 'Content', t: 'Easiest to white label well', d: 'You can read the draft before it ships', q: 'Quality is checkable' },
          { big: 'Technical', t: 'Sits in between', d: 'The audit helps, the fixes need more', q: 'Audit helps, fixes need more' },
          { big: 'Links', t: 'Riskiest without close vetting', d: 'Methods are hard to verify', q: 'Vet the methods' }] }) }
    ]
  }
];
