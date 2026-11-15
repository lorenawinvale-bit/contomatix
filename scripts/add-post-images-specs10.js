// Image specs, set 10 (15 Nov 2026): ai-powered-seo-tools had two diagrams, needs 3 or more. Facts come from the post and Google's "AI features and your website" page (read 15 Nov 2026).
module.exports = D => [
  {
    slug: 'ai-powered-seo-tools',
    images: [
      { name: 'goal-picker', afterH2: 'Pick a Tool by Goal and Budget', alt: 'Pick an AI SEO tool by goal: clustering, briefs, audit triage, internal links or AI visibility',
        svg: D.cards({ w: 1200, h: 520, title: 'Start from the job, not the tool', qLabel: 'Free first step', items: [
          { big: 'Sort', t: 'A long keyword list', d: 'Clustering', q: 'Keyword grouping tool' },
          { big: 'Write', t: 'Less research time', d: 'Content briefs', q: 'Brief generator' },
          { big: 'Triage', t: 'A large site', d: 'Audit triage', q: 'Page indexing report' },
          { big: 'Mentions', t: 'Do AI assistants name you', d: 'Visibility tracking', q: 'A monthly prompt list' }] }) },
      { name: 'google-ai-mode', afterH2: 'What Google Says About Optimizing for AI Mode and AI Overviews', alt: 'Google on AI Mode and AI Overviews: no extra requirements, indexed page, Web search type reporting',
        svg: D.stats({ cols: 2, title: 'What Google says about AI features', items: [
          { big: '0', t: 'additional requirements to appear in AI Overviews or AI Mode' }, { big: 'Indexed', t: 'a page must be indexed and snippet-eligible', color: '#F5A623' },
          { big: 'Web', t: 'the Search Console search type that reports AI features' }, { big: 'No', t: 'special schema or AI text file is needed', color: '#F5A623' }] }) }
    ]
  }
];
