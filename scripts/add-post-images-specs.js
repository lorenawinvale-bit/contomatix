// Image specs for add-post-images.js. Every diagram uses only facts that are already stated in the post it goes into.
module.exports = D => [
  {
    slug: 'why-is-duplicate-content-an-issue-for-seo-2026',
    images: [
      { name: 'mechanisms', afterH2: 'The Real Mechanisms', alt: 'Three costs of duplicate content: signal splitting, crawl budget waste and AI citation loss',
        svg: D.cards({ w: 1200, h: 520, title: 'Three ways duplicate content costs you', qLabel: 'The result', items: [
          { big: '1', t: 'Signal splitting', d: 'Links and engagement earned by each copy are scattered across several URLs', q: 'Authority is diluted' },
          { big: '2', t: 'Crawl budget waste', d: 'On larger sites, crawlers spend time on duplicate URLs', q: 'Slower discovery' },
          { big: '3', t: 'AI citation fragmentation', d: 'An AI answer credits one version of the content, or none', q: 'Fewer citations' }] }) },
      { name: 'ours', afterH2: 'What We Actually Found Fixing This on Our Own Site', alt: 'Our audit: 27 city posts shared boilerplate and two posts were over 27 percent identical',
        svg: D.stats({ title: 'What we found on our own site', cols: 3, items: [
          { big: '27', t: 'city-guide posts shared a large block of identical boilerplate' }, { big: '27%+', t: 'text overlap between two of our posts', color: '#F5A623' }, { big: '5', t: 'positions apart in our own list, for those two posts', color: '#F5A623' }] }) },
      { name: 'fixes', afterH2: 'How to Actually Fix It', alt: 'Which fix to use: a 301 redirect, a canonical tag or noindex, depending on why the duplicate exists',
        svg: D.timeline({ title: 'Which fix for which duplicate', items: [
          { d: 'Case 1', t: 'One URL should stop existing', c: '301 redirect: the strongest signal' },
          { d: 'Case 2', t: 'Both URLs must keep working', c: 'rel=canonical to the preferred version' },
          { d: 'Case 3', t: 'A section should not be indexed', c: 'noindex, not canonical' }] }) }
    ]
  },
  {
    slug: 'what-is-llm-seo-2026',
    images: [
      { name: 'difference', afterH2: 'How LLM SEO Differs From Traditional SEO', alt: 'Traditional SEO is a rankings game, LLM SEO is a citations game measured in mentions',
        svg: D.stats({ cols: 2, title: 'Rankings game or citations game?', items: [
          { big: 'Rank', t: 'Traditional SEO: optimize to rank on Google, judged on position and clicks' }, { big: 'Cite', t: 'LLM SEO: optimize to be quoted or paraphrased, judged on mentions and visibility', color: '#F5A623' }] }) },
      { name: 'check', afterH2: 'How to Check Your LLM Visibility', alt: 'Check LLM visibility in three steps: open three AI tools, ask real questions, log three things',
        svg: D.flow({ w: 1200, h: 400, title: 'A ten-minute LLM visibility check', steps: [
          { t: 'Open three AI tools', s: 'ChatGPT, Gemini and Perplexity', c: 'Run each one separately' },
          { t: 'Ask real customer questions', s: 'Not your brand name', c: 'What a prospect types before they know you' },
          { t: 'Log three things', s: 'Mentioned? Who else? Linked?', c: 'Brand mention, competitors named, source links' }] }) },
      { name: 'pillars', afterH2: 'A Practical Framework', alt: 'Four pillars of LLM visibility: extractability, authority, freshness and structured clarity',
        svg: D.cards({ w: 1200, h: 560, title: 'The four pillars of LLM visibility', qLabel: 'The question to ask', items: [
          { big: '1', t: 'Extractability', d: 'Short, direct paragraphs under clear headings', q: 'Can a model lift a clean answer?' },
          { big: '2', t: 'Authority', d: 'Consistent facts across your site, mentions, forums and comparisons', q: 'Do your sources agree?' },
          { big: '3', t: 'Freshness', d: 'Current content that says when it was last updated', q: 'Is it visibly up to date?' },
          { big: '4', t: 'Structured clarity', d: 'Headings, lists and question-and-answer formatting', q: 'Does it mirror how a model reads?' }] }) }
    ]
  },
  {
    slug: 'how-to-get-cited-by-chatgpt-2026',
    images: [
      { name: 'capsule', afterH2: 'Lead With a Direct Answer', alt: 'The answer capsule: a 40 to 60 word self-contained answer at the top of the page',
        svg: D.stats({ title: 'The answer capsule', cols: 3, items: [{ big: '40-60', t: 'words in the direct answer at the top of the page' }, { big: '1', t: 'core question answered by that block' }, { big: '0', t: 'throat-clearing intros before the answer', color: '#F5A623' }] }) },
      { name: 'crawlers', afterH2: "Don't Accidentally Block the Crawlers", alt: 'A public page can appear in ChatGPT search results unless robots.txt blocks OAI-SearchBot',
        svg: D.compare({ w: 1200, h: 440, title: 'Is the crawler allowed in?', left: { h: 'Blocked', items: ['robots.txt blocks OAI-SearchBot', 'The page is never seen', 'Check robots.txt before blaming the content'] }, right: { h: 'Open', items: ['Public page, OAI-SearchBot allowed', 'The page can appear in ChatGPT search results', 'Then the answer and structure decide'] } }) },
      { name: 'checklist', afterH2: 'A Practical Audit Checklist for Citability', alt: 'Six-step citability audit, from reading the first 60 words to confirming the page is reachable',
        svg: D.timeline({ title: 'The six-step citability audit', items: [
          { d: 'Step 1', t: 'Read the first 60 words', c: 'Would they satisfy the searcher?' }, { d: 'Step 2', t: 'Count the questions', c: 'One primary question per page' },
          { d: 'Step 3', t: 'Check the headings', c: 'Questions, not marketing labels' }, { d: 'Step 4', t: 'Find unattributed numbers', c: 'Add a visible source' },
          { d: 'Step 5', t: 'Validate the schema', c: 'Markup must match the page' }, { d: 'Step 6', t: 'Confirm it is reachable', c: 'Not noindexed or blocked' }] }) }
    ]
  }
];
