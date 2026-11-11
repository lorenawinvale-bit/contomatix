// Image specs, set 5 (11 Nov 2026): do-backlinks-matter-for-ai-search-2026 had no images. Facts: the Ahrefs study (re-read from ahrefs.com on 11 Nov 2026, published 26 May 2025) and the post's own text.
module.exports = D => [
  {
    slug: 'do-backlinks-matter-for-ai-search-2026',
    images: [
      { name: 'correlations', afterH2: 'What the Ahrefs Study Measured', alt: 'AI Overview correlation: brand mentions 0.664, anchors 0.527, search volume 0.392, backlinks 0.218',
        svg: D.columns({ w: 1200, title: 'Correlation with AI Overview visibility (Ahrefs, 75,000 brands)', max: 700, items: [
          { t: 'Brand web mentions', v: 664, text: '0.664', color: '#0EA5A0' }, { t: 'Brand anchors', v: 527, text: '0.527', color: '#0EA5A0' }, { t: 'Brand search volume', v: 392, text: '0.392', color: '#0EA5A0' }, { t: 'Backlinks', v: 218, text: '0.218', color: '#F5A623' }] }) },
      { name: 'engines', afterH2: 'How Different AI Engines Actually Pick Their Sources', alt: 'How three AI answer engines pick sources: Google AI Overviews, ChatGPT and Perplexity',
        svg: D.cards({ w: 1200, h: 520, title: 'Three engines, three ways of picking sources', qLabel: 'Leans toward', items: [
          { big: 'AI Overviews', t: 'Google\'s own index', d: 'Favours strong E-E-A-T signals', q: 'High-authority and community sites' },
          { big: 'ChatGPT', t: 'Training data plus live search', d: 'When browsing is active', q: 'Expert blogs and industry publications' },
          { big: 'Perplexity', t: 'Specialist sources', d: 'Over generic marketing pages', q: 'Review platforms and industry reports' }] }) },
      { name: 'layers', afterH2: 'Why This Changes How You Should Build Links in 2026', alt: 'Three link layers for AI search: editorial backlinks, unlinked mentions and consistency',
        svg: D.flow({ title: 'Three layers that work together', steps: [
          { t: 'Editorial backlinks', s: 'Relevant, expert-adjacent sites', c: 'Placed inside real articles' }, { t: 'Unlinked mentions', s: 'Comparisons, reports and forums', c: 'Weight even without a link' }, { t: 'Consistency', s: 'Keep appearing', c: 'Across the same industry conversations' }] }) }
    ]
  }
];
