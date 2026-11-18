// Parity additions for the 7 service pages (18 Nov 2026): per-service interactive checker, a 4th proof card, 2 more offers, 2 more FAQs.
// Merged by data/service-extras-ui.js (arrays are appended, checker is set). Proof numbers come from our own posts; the AI study card is third-party and labelled as such.
module.exports = {
  'guest-posting': {
    proof: [{ big: '4 of 7', text: 'ranking white label link pages mention Google\'s rules at all, though those rules decide whether a resold link is safe. We read the policy before we pitch.', href: '/blog/white-label-link-building' }],
    offers: [
      { h: 'Guest post pitching and editor follow-up', t: 'We send the pitch, answer the editor\'s questions and keep the thread moving until a decision.' },
      { h: 'Guest post topic and angle planning', t: 'Angles come from keyword gaps and what the host\'s readers already ask, agreed with you first.' }
    ],
    moreFaqs: [
      { q: 'What are guest posting sites for SEO?', a: 'They are real publications and blogs that accept outside contributors and rank or get readers in their own right. A site is only useful if its readers overlap with your customers, so we judge fit before any pitch.' },
      { q: 'Can I get guest posts for free?', a: 'Yes, if you pitch editors yourself with a strong, relevant article, and many publications accept outside writers without payment. A service saves the time of finding, vetting and pitching them. We do not pay for placements to pass ranking signals.' }
    ]
  },
  'on-page-seo': {
    checker: {
      kicker: 'Try our on-page quick check',
      sub: 'Think of one of your pages. Tick what is true. These are the first four things we look at in an on-page audit.',
      items: [
        { h: 'Title names the topic', e: 'Unique, and short enough to show in full', on: true },
        { h: 'Answer in the first paragraph', e: 'A reader gets the point at once', on: true },
        { h: 'One H1, clear H2s', e: 'Headings read as a real outline', on: false },
        { h: 'Linked to related pages', e: 'Pages link in and out', on: false }
      ],
      verdicts: [
        ['Start with the basics', 'None of the four are in place. An audit would start here, before any links.'],
        ['One in place', 'One basic is right. We would fix the other three first, they are the cheapest gains.'],
        ['Half way there', 'Two basics pass. We would check intent next, to see if the page matches the query.'],
        ['Close', 'Three pass. We would fix the last one, then compare the page with what ranks.'],
        ['Solid basics', 'All four pass. We would move on to intent, content gaps and structured data.']
      ]
    },
    proof: [{ big: '257 of 347', text: 'of our own hero images declared the wrong size in one template, causing a layout shift. One fix cleared it, which is the kind of cause we trace.', href: '/blog/improve-core-web-vitals' }],
    offers: [
      { h: 'Heading structure and outline fixes', t: 'One H1, a logical set of H2s and H3s, written so a reader can scan the page.' },
      { h: 'Image alt text and file names', t: 'Descriptive alt text for every image that carries meaning, kept short and accurate.' }
    ],
    moreFaqs: [
      { q: 'What does on-page SEO optimization include?', a: 'Titles, meta descriptions, headings, body content, internal links, image alt text and structured data, each matched to what the page should answer and to what ranks today.' },
      { q: 'What is an on-page SEO audit checklist?', a: 'Check the title and description, the H1 and headings, whether the first paragraph answers the query, internal links, image alt text, structured data and mobile display. Our on-page checklist guide lists them in priority order.' }
    ]
  },
  'off-page-seo': {
    proof: [{ big: '7 of 7', text: 'blogger outreach guides we read also sell a service or tool, so we wrote our outreach approach from Google\'s documentation instead.', href: '/blog/blogger-outreach' }],
    offers: [
      { h: 'Digital PR and data-led pitches', t: 'Research and data from your business, pitched to publications that cover your topic.' },
      { h: 'Link profile review', t: 'A check of the links you already have, so weak or risky ones are known before you add more.' }
    ],
    moreFaqs: [
      { q: 'What are off page SEO factors?', a: 'The signals from outside your site that search engines consider: the quality and relevance of backlinks, brand mentions, and how trusted publications refer to you. We focus on the ones you can earn by hand.' },
      { q: 'What is an off page SEO audit?', a: 'A review of your backlinks, referring domains, anchor text and brand mentions, compared with the sites outranking you. It shows the gap and the risks before any outreach begins.' }
    ]
  },
  'white-label-seo': {
    checker: {
      kicker: 'Is this partner safe to resell?',
      sub: 'Think of a white label SEO provider you are considering. Tick what is true. These are the four standards we hold ourselves to.',
      items: [
        { h: 'Never contacts your clients', e: 'You keep the relationship', on: true },
        { h: 'Links placed by hand', e: 'Real sites, no networks', on: true },
        { h: 'Reports under your brand', e: 'No other logo on the PDF', on: false },
        { h: 'Pricing agreed before you quote', e: 'Your margin is clear', on: false }
      ],
      verdicts: [
        ['We would not resell it', 'None of the four hold. Reselling this would put your client and your name at risk.'],
        ['Too many gaps', 'One standard holds. We would ask the provider about the other three before any quote.'],
        ['Ask more questions', 'Two hold. We would test with a single task before sending a client.'],
        ['Nearly there', 'Three hold. We would get the fourth in writing before you quote.'],
        ['Safe to resell', 'All four hold: invisible to your client, hand-placed, branded and priced before you quote.']
      ]
    },
    proof: [{ big: 'Only 4 of 7', text: 'ranking pages mention Google\'s policy, even though those rules decide whether a resold link is safe. We read the policy, not just the sales pages.', href: '/blog/white-label-link-building' }],
    offers: [
      { h: 'White label SEO packages for resale', t: 'Packages you can put your own name and price on, with scope we agree first.' },
      { h: 'White label SEO onboarding', t: 'A short intake so we deliver in your tone, your reporting style and your timelines.' }
    ],
    moreFaqs: [
      { q: 'What is the best white label SEO company for agencies?', a: 'The right one depends on your clients, so judge any provider on how it vets link sources, whether you see targets first, what its reports look like and whether it ever contacts your clients. Ask for all four in writing.' },
      { q: 'What is white label SEO pricing for agencies?', a: 'It depends on which services you resell and in what volume. We agree it with you before you quote your own client, so you know your margin, and we do not publish a rate card.' }
    ]
  },
  'keyword-research': {
    checker: {
      kicker: 'Try our keyword fit check',
      sub: 'Think of one keyword you want to rank for. Tick what is true. These are the four checks we run before a term goes in a plan.',
      items: [
        { h: 'Intent matches your page', e: 'Searchers want what the page is', on: true },
        { h: 'Difficulty is realistic', e: 'Similar sites already rank', on: true },
        { h: 'One page owns it', e: 'No second page competing', on: false },
        { h: 'Searchers could buy', e: 'Or take another useful step', on: false }
      ],
      verdicts: [
        ['Skip this keyword', 'None of the four hold. This term would cost you effort for little return.'],
        ['Weak fit', 'One check holds. We would look for a nearby term that fits better.'],
        ['Maybe', 'Two hold. We would check what ranks and whether your page can match it.'],
        ['Promising', 'Three hold. We would fix the last one, usually by mapping the term to one page.'],
        ['Keep it in the plan', 'All four hold. This keyword goes in the plan, mapped to a page.']
      ]
    },
    proof: [{ big: '46', text: 'saved Google results files from October and November 2026 underpin our research posts, so the advice rests on what actually ranks.', href: '/blog/meta-keywords' }],
    offers: [
      { h: 'Keyword research for content calendars', t: 'Terms grouped into topics your writers can brief straight from.' },
      { h: 'Keyword difficulty and priority scoring', t: 'Each term ranked by how winnable it is for your site, not by volume alone.' }
    ],
    moreFaqs: [
      { q: 'What is SEO keyword research?', a: 'It is finding the words and questions people type into search engines, checking what ranks for them, and choosing which to target with which page.' },
      { q: 'What does a keyword research agency charge?', a: 'It varies with the size of the site, the number of topic areas and whether you want a one-off plan or regular refreshes. We set it after the free audit.' }
    ]
  },
  'ai-seo': {
    checker: {
      kicker: 'Try our AI answer check',
      sub: 'Think of one important page. Tick what is true. These are the first things we look at to see if an AI answer could use it.',
      items: [
        { h: 'Direct answer in the first 60 words', e: 'Stated plainly, near the top', on: true },
        { h: 'Question-shaped headings', e: 'Headings match real questions', on: true },
        { h: 'Facts match across pages', e: 'Same details everywhere', on: false },
        { h: 'Mentioned on trusted sites', e: 'Others name your brand', on: false }
      ],
      verdicts: [
        ['AI would skip it', 'None of the four hold. We would start with the answer and the headings.'],
        ['Hard to extract', 'One holds. We would restructure the page first.'],
        ['Partly ready', 'Two hold. We would add the missing structure and check your facts match.'],
        ['Close', 'Three hold. The last gap is usually third-party mentions, which take time.'],
        ['Ready to test', 'All four hold. We would run the prompt test and see if you are cited.']
      ]
    },
    proof: [{ big: '0.664', text: 'was the correlation between brand mentions and AI Overview visibility in a published study of 75,000 brands, against 0.218 for backlinks. We cite it and explain its limits.', href: '/blog/do-backlinks-matter-for-ai-search-2026' }],
    offers: [
      { h: 'AI Overview optimization', t: 'Pages restructured so Google\'s AI Overviews can lift an accurate answer.' },
      { h: 'ChatGPT and AI search brand tracking', t: 'The same set of prompts, re-run monthly, so you can see what changed.' }
    ],
    moreFaqs: [
      { q: 'What is an AI search optimization service?', a: 'A service that prepares your pages and brand signals for AI answers: clear direct answers, consistent facts, structured data and relevant mentions, plus testing to see if you are cited.' },
      { q: 'Does AI SEO work without good classic SEO?', a: 'Rarely. AI answers draw on pages that search engines can crawl and trust, so crawling, indexing and content quality come first. We check those before anything AI-specific.' }
    ]
  },
  'technical-seo': {
    checker: {
      kicker: 'Try our quick technical check',
      sub: 'Think of one page that should rank. Tick what is true. These are the first four things we check in a technical audit.',
      items: [
        { h: 'Indexable', e: 'Not blocked by robots.txt or noindex', on: true },
        { h: 'Loads fast', e: 'Largest content in 2.5 s or less', on: true },
        { h: 'One clean URL', e: 'Canonical set, no redirect chain', on: false },
        { h: 'Valid structured data', e: 'Matches what the page shows', on: false }
      ],
      verdicts: [
        ['Fix this first', 'None of the four hold. Until the page can be crawled and indexed, nothing else matters.'],
        ['Serious gaps', 'One check holds. We would start with indexing, then speed.'],
        ['Half sorted', 'Two hold. We would check Search Console for what Google sees.'],
        ['Nearly clean', 'Three hold. We would fix the last one and re-crawl to confirm.'],
        ['Healthy page', 'All four hold. We would move to site-wide patterns and crawl budget.']
      ]
    },
    proof: [{ big: '0 of 5', text: 'ranking migration pages we read mention hreflang, and only 2 link to Google\'s guidance. We build migration plans from the guidance itself.', href: '/blog/seo-site-migration' }],
    offers: [
      { h: 'Redirect and canonical clean-up', t: 'A map of old and new URLs, with chains and conflicts removed.' },
      { h: 'Technical SEO monitoring', t: 'Regular checks so a new template or plugin does not quietly break indexing.' }
    ],
    moreFaqs: [
      { q: 'What does a technical SEO agency do?', a: 'It finds the issues that stop search engines crawling, indexing or rendering your pages, ranks them by impact, helps fix them and checks the result with a re-crawl.' },
      { q: 'What is a free technical SEO audit tool?', a: 'A tool that scans a page or site for common issues. Ours is free, and covers the first checks. A service goes further by reading the results, ranking them and fixing what matters.' }
    ]
  }
};
