// Image specs, set 7 (14 Nov 2026): how-is-ranking-different-ppc-vs-seo-2026 had one photo and no diagrams. Facts come from the post itself.
module.exports = D => [
  {
    slug: 'how-is-ranking-different-ppc-vs-seo-2026',
    images: [
      { name: 'ad-rank-inputs', afterH2: 'Ad Rank Thresholds: The Part Nobody Explains', alt: 'What Google Ad Rank is calculated from: bid, ad quality, thresholds, search context and asset impact',
        svg: D.cards({ w: 1200, h: 520, title: 'Ad Rank is more than your bid', qLabel: 'Effect', items: [
          { big: 'Bid', t: 'What you are willing to pay', d: 'One input among several', q: 'Cannot win alone' },
          { big: 'Quality', t: 'Click-through rate, ad relevance, landing page', d: 'Measured at auction time', q: 'Can beat a higher bid' },
          { big: 'Thresholds', t: 'Minimum quality bars', d: 'Set by Google', q: 'Fail one and no ad shows' }] }) },
      { name: 'stop-paying', afterH2: 'What Happens When You Stop Paying', alt: 'PPC visibility ends when spend stops while SEO rankings erode gradually',
        svg: D.compare({ w: 1200, h: 460, title: 'When the work or the budget stops', left: { h: 'PPC', items: ['Position was rented', 'Ends with the last impression', 'Gone the day you switch it off'] }, right: { h: 'SEO', items: ['Rankings erode gradually', 'Months to build, slow to fade', 'Not an overnight drop'] } }) }
    ]
  }
];
