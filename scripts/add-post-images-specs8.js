// Image specs, set 8 (15 Nov 2026): what-is-ai-visibility-2026 and guest-posting-vs-niche-edits-2026 had no content images, hr-technology-consulting-2026 had two. Facts come from the posts themselves.
module.exports = D => [
  {
    slug: 'what-is-ai-visibility-2026',
    images: [
      { name: 'core-metrics', afterH2: 'The Core Metrics Worth Tracking', alt: 'Three AI visibility metrics: visibility score, share of voice and citation share',
        svg: D.cards({ w: 1200, h: 520, title: 'Three numbers that describe AI visibility', qLabel: 'Answers', items: [
          { big: 'Score', t: 'Share of tested answers that mention you', d: 'Mentions divided by answers tested', q: 'Is your brand named?' },
          { big: 'Share of voice', t: 'Your mentions against named competitors', d: 'Same questions, same set', q: 'How do you compare?' },
          { big: 'Citations', t: 'How often you are the linked source', d: 'Mentioned versus attributed', q: 'Do you get the link?' }] }) },
      { name: 'score-example', afterH2: 'How a Visibility Score Actually Gets Calculated', alt: 'Example AI visibility score: 20 questions tested and 5 brand mentions gives 25 percent',
        svg: D.stats({ cols: 2, title: 'A simple visibility score', items: [
          { big: '20', t: 'realistic category questions tested' }, { big: '5', t: 'answers that mention your brand', color: '#F5A623' },
          { big: '25%', t: 'visibility score: mentions divided by answers' }, { big: 'Monthly', t: 'repeat the same prompt list on a schedule', color: '#F5A623' }] }) },
      { name: 'manual-check', afterH2: 'Setting Up a Manual AI Visibility Check', alt: 'Manual AI visibility check in four steps: write prompts, run them, log results, repeat monthly',
        svg: D.flow({ w: 1200, h: 440, title: 'A manual check in four moves', steps: [
          { t: 'Write prompts', s: '15 to 20 realistic questions', c: 'Wording stays identical' }, { t: 'Run them', s: 'ChatGPT, Gemini, Perplexity, AI Overviews', c: 'Same list on each' }, { t: 'Log results', s: 'Named, described, linked', c: 'Plus who appeared with you' }, { t: 'Repeat', s: 'Monthly at minimum', c: 'Same prompts every time' }] }) }
    ]
  },
  {
    slug: 'guest-posting-vs-niche-edits-2026',
    images: [
      { name: 'average-cost', afterH2: 'What They Actually Cost in 2026', alt: 'Average cost per placement: guest post about 459 dollars, niche edit about 225 dollars',
        svg: D.columns({ w: 1200, h: 460, title: 'Average cost per placement, 2026', max: 500, items: [
          { t: 'Guest post', v: 459, text: '$459', color: '#F5A623' }, { t: 'Niche edit', v: 225, text: '$225', color: '#0EA5A0' }] }) },
      { name: 'compliance', afterH2: 'The Compliance Difference Most Comparisons Skip', alt: 'Compliance risk of niche edits and guest posts under Google spam policies',
        svg: D.cards({ w: 1200, h: 520, title: 'Where each method meets Google\'s rules', qLabel: 'Rule', items: [
          { big: 'Niche edit', t: 'A paid link added to an existing article', d: 'Treated like buying a link', q: 'Tag it sponsored or nofollow' },
          { big: 'Guest post', t: 'A new article that carries a link', d: 'A lighter version of the same risk', q: 'Must help the host\'s readers' },
          { big: 'Volume', t: 'One or two a month versus fifty', d: 'Risk scales with how many', q: 'Keep it relevant' }] }) },
      { name: 'framework', afterH2: 'A Practical Framework for Choosing', alt: 'Which method to pick: niche edits for tight budgets, guest posts for authority, both when mature',
        svg: D.timeline({ w: 1200, h: 420, title: 'Choose by situation', items: [
          { d: 'Tight budget', t: 'Niche edits', c: 'Cheaper and faster, keep volume low' }, { d: 'Topical authority', t: 'Guest posts', c: 'The content has value beyond the link' }, { d: 'Thin profile', t: 'Guest posts', c: 'Relevant, well-trafficked sites' }, { d: 'Mature program', t: 'Use both', c: 'Each does a different job' }] }) }
    ]
  },
  {
    slug: 'hr-technology-consulting-2026',
    images: [
      { name: 'failure-rates', afterH2: 'The Uncomfortable Truth About HR Tech Failure Rates', alt: 'HR tech rollout failures: 25 to 60 percent fall short and 32 percent of employees use the HRIS',
        svg: D.rings({ w: 1200, h: 460, title: 'What the surveys say about HR tech', items: [
          { pct: 0.6, big: '25-60%', t: 'of rollouts fall short of expectations', c: 'Timelines, cost, adoption, data', color: '#F5A623' },
          { pct: 0.32, big: '32%', t: 'of employees use the average HRIS', c: 'Gartner survey', color: '#0EA5A0' }] }) }
    ]
  }
];
