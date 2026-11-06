// Image specs, set 2 (the four posts without in-content images that got new keywords on 6 Nov 2026). Facts come from the posts themselves.
module.exports = D => [
  {
    slug: 'ai-powered-seo-tools',
    images: [
      { name: 'tracking', afterH2: 'AI Visibility and Citation Tracking', alt: 'How AI citation tracking works: a fixed question set, several AI systems, and a logged result',
        svg: D.flow({ w: 1200, h: 400, title: 'How AI visibility tracking works', steps: [
          { t: 'A fixed question set', s: 'Representative questions', c: 'The same list every run' },
          { t: 'Several AI systems', s: 'Each question is asked', c: 'On a recurring schedule' },
          { t: 'Log the result', s: 'Mentioned or cited?', c: 'Track the change over time' }] }) },
      { name: 'choosing', afterH2: 'Choosing Without Getting Locked Into One Category', alt: 'All-in-one platform versus one tool per job when buying AI SEO tools',
        svg: D.compare({ w: 1200, h: 460, title: 'Platform or tool per job?', left: { h: 'One all-in-one platform', items: ['Claims to cover every category', 'Often does two jobs well', 'The rest is an afterthought'] }, right: { h: 'A tool for each job', items: ['Each category has its own mechanism', 'Pick the one job you need done', 'Test on pages you know well first'] } }) }
    ]
  },
  {
    slug: 'how-duckduckgo-ai-search-works-2026',
    images: [
      { name: 'bots', afterH2: 'How Search Assist Actually Finds and Cites Sources', alt: 'Who feeds DuckDuckGo: DuckAssistBot for AI answers, DuckDuckBot and Bing for organic results',
        svg: D.cards({ w: 1200, h: 520, title: 'Who supplies what at DuckDuckGo', qLabel: 'Feeds', items: [
          { big: 'DuckAssistBot', t: 'The Search Assist bot', d: 'A dedicated crawler, separate from the regular one', q: 'AI answers with source links' },
          { big: 'DuckDuckBot', t: "DuckDuckGo's own crawler", d: 'Supplementary results alongside the main index', q: 'Part of the organic layer' },
          { big: 'Bing', t: "Microsoft's index", d: 'Supplies most of the traditional link results', q: 'Most of the ten blue links' }] }) },
      { name: 'duckai', afterH2: "Duck.ai Doesn't Work Like That", alt: 'How Duck.ai works: you ask, the question is anonymized, and a third-party model answers',
        svg: D.flow({ w: 1200, h: 400, title: 'How a Duck.ai question travels', steps: [
          { t: 'You ask Duck.ai', s: 'A private chat interface', c: 'Not a search engine query' },
          { t: 'It is anonymized', s: 'Your identity is hidden', c: 'The model provider does not see who you are' },
          { t: 'The active model answers', s: 'GPT, Claude, Llama or others', c: 'DuckDuckGo does not build the model' }] }) },
      { name: 'cited', afterH2: 'What This Means If You Want to Get Cited There', alt: 'Three jobs for DuckDuckGo AI visibility: Bing indexing, writing for Search Assist, Duck.ai inherited',
        svg: D.stats({ cols: 3, title: 'Getting cited at DuckDuckGo: three jobs, not one', items: [
          { big: '1', t: 'Get indexed in Bing first, since it supplies the organic layer' }, { big: '2', t: 'Write for Search Assist: direct answers, DuckAssistBot not blocked', color: '#F5A623' }, { big: '3', t: 'Treat Duck.ai as inherited: no tactic of its own' }] }) }
    ]
  },
  {
    slug: 'ai-seo-agents',images: [
      { name: 'evaluate', afterH2: 'Evaluating an Agent Before You Turn It Loose', alt: 'Four questions to ask before trusting an AI SEO agent, from what it checks against to blast radius',
        svg: D.cards({ w: 1200, h: 560, title: 'Four questions before you turn an agent loose', qLabel: 'A warning sign', items: [
          { big: '1', t: 'What does it check against?', d: 'A documented rule, or its own rubric?', q: 'Grading its own homework' },
          { big: '2', t: 'What if it is uncertain?', d: 'Does it flag low-confidence findings?', q: 'An agent that never doubts' },
          { big: '3', t: 'How current is its data?', d: 'A crawl that is weeks old goes stale', q: 'Acting on outdated pages' },
          { big: '4', t: 'What is the blast radius?', d: 'One bad decision, repeated at scale', q: 'No human approval step' }] }) },
      { name: 'safe', afterH2: 'How to Use Them Without the Failure Mode', alt: 'Which AI SEO agent tasks are safe to run alone and which need a human in the loop',
        svg: D.compare({ w: 1200, h: 480, title: 'Run alone, or keep a human in the loop?', left: { h: 'Keep a human in the loop', items: ['Publishing agent-drafted content', 'Sending outreach emails', 'Large publish batches before review'] }, right: { h: 'Safe to run unsupervised', items: ['Technical audits', 'Broken-link detection', 'Schema validation'] } }) }
    ]
  },
  {
    slug: 'innovative-marketing-campaigns-2026',
    images: [
      { name: 'measure', afterH2: 'How to Measure Whether a Campaign Actually Worked', alt: 'Five layers for measuring a campaign, from reach and attention to retention and repeat behavior',
        svg: D.timeline({ title: 'Five layers, each closer to revenue', items: [
          { d: 'Layer 1', t: 'Reach and attention', c: 'Impressions, views, engagement rate' }, { d: 'Layer 2', t: 'Brand lift', c: 'Recall and purchase intent' },
          { d: 'Layer 3', t: 'Search and direct traffic lift', c: 'Branded search against a control period' }, { d: 'Layer 4', t: 'Cost per acquisition and revenue', c: 'UTMs, promo codes, incrementality' },
          { d: 'Layer 5', t: 'Retention and repeat behavior', c: 'Do customers come back?' }] }) },
      { name: 'smb', afterH2: 'What Small and Mid-Size Businesses Can Actually Take From This', alt: 'Three lessons for a small business: one platform, a real voice and two tracked numbers',
        svg: D.cards({ w: 1200, h: 520, title: 'What transfers down to a small business', qLabel: 'Cost', items: [
          { big: '1', t: 'One platform, posted consistently', d: 'Where your customers already spend time', q: 'Time, not a stunt budget' },
          { big: '2', t: 'A real person carries the voice', d: 'A mascot or a founder talking to camera', q: 'A phone and time' },
          { big: '3', t: 'Track two numbers', d: 'Branded search in Search Console and repeat-customer rate', q: 'Free' }] }) }
    ]
  }
];
