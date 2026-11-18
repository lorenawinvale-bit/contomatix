// Round 2 gap fixes (18 Nov 2026): Google US SERP + AI Overview read in the user's Chrome, 13 competitor service pages read (headings, FAQs, word counts),
// and Ahrefs matching-terms volumes (US) for long tails. No competitor names, no prices, no guarantees.
module.exports = {
  'guest-posting': {
    moreFaqs: [
      { q: 'What is an authority guest posting service?', a: 'It places articles on publications with a real readership and a good reputation in their field, rather than on sites built for links. We judge authority by organic traffic, topical fit and editorial standards, not by a score alone.' },
      { q: 'Is a cheap guest posting service worth it?', a: 'Rarely. Very low prices usually mean placements on sites that accept anything, which send no readers and can carry risk. A real placement involves research, a pitch, writing and editing, and that takes time.' },
      { q: 'What should I look for in a guest posting service provider?', a: 'Look for relevant sites, original articles, a target list you approve, honest reporting and a clear answer on what happens if a publisher declines. Be wary of guaranteed acceptance and bulk packages.' }
    ]
  },
  'on-page-seo': {
    heroTitle: 'Expert on-page SEO services that fix the page, not just the report',
    moreFaqs: [
      { q: 'When do you need on-page SEO services?', a: 'When good pages do not rank, when you get impressions but few clicks, when pages feel unstructured, when internal links are not planned, or after a redesign or migration. Search Console usually shows these signs first.' },
      { q: 'Do you offer on-page SEO as a standalone service?', a: 'Yes. You can hire us for on-page work on a fixed set of pages without buying link building or any other service.' },
      { q: 'How do you decide what to change on a page?', a: 'We compare the page with the results that rank for its main query, noting what they cover, how they are structured and what they answer first. We then change what your page is missing, not what is already working.' },
      { q: 'What are advanced on-page SEO services?', a: 'Work beyond titles and headings: content gap analysis, internal link planning, schema markup, intent matching across a cluster of pages, and testing snippet changes in Search Console.' }
    ]
  },
  'off-page-seo': {
    moreFaqs: [
      { q: 'Can I do off-page SEO myself?', a: 'Yes, at a small scale. Creating good content, asking for mentions and reclaiming links are all possible without an agency. A service helps when you lack the time or contacts for steady, manual outreach.' },
      { q: 'Can off-page SEO help local businesses?', a: 'Yes. Citations with consistent business details, local mentions and relevant links all support local visibility. We choose these by how your customers find you.' },
      { q: 'Who does the work in your off-page SEO services?', a: 'People, not software. A specialist reviews each source, writes the outreach and secures the placement. You see the targets before they go live.' }
    ]
  },
  'white-label-seo': {
    heroTitle: 'White label SEO services for agencies, invisible to your clients',
    offers: [
      { h: 'White label AI SEO services', t: 'AI search work you can add to your packages, delivered and reported under your brand.' }
    ],
    moreFaqs: [
      { q: 'What are white label SEO services for agencies?', a: 'They let an agency sell SEO under its own name while a partner does the work in the background. The agency owns the client relationship, the partner delivers audits, links and reports, and the client sees only the agency.' },
      { q: 'What are white label AI SEO services?', a: 'Work that helps your clients appear in AI answers, such as restructuring pages into direct answers, schema and visibility testing, delivered under your brand. It is an add-on to classic SEO, not a replacement.' },
      { q: 'How do I choose among the best white label SEO services?', a: 'Compare how each vets links, whether you see targets first, what the reports look like, whether the partner contacts your clients and how pricing is agreed. A short pilot on one client tells you more than any sales page.' }
    ]
  },
  'keyword-research': {
    heroTitle: 'SEO keyword research service built around search intent',
    metaTitle: 'SEO Keyword Research Service | Contomatix',
    moreFaqs: [
      { q: 'What do you need from me to start keyword research?', a: 'Your website address, the country you target, your main products or services, and a few competitors if you know them. Access to Search Console helps, because it shows the queries you already appear for.' },
      { q: 'How does your keyword research process work?', a: 'We learn about your business and audience, collect candidate terms, check search intent and difficulty, look at what competitors rank for, and map each term to a page. You receive a plan you can act on.' },
      { q: 'Do you research AI prompts as well as keywords?', a: 'Yes, where it helps. Buyers now ask full questions in AI assistants, so we note the questions behind each keyword and include them in the plan.' }
    ]
  },
  'ai-seo': {
    offers: [
      { h: 'AI local SEO', t: 'Consistent local details and clear service descriptions, so AI answers for local queries describe you correctly.' }
    ],
    moreFaqs: [
      { q: 'What are AI-powered SEO services?', a: 'The term is used in two ways: SEO that uses AI tools to work faster, and SEO that helps you appear in AI answers. We do the second, and use AI tools only with a person checking every fact.' },
      { q: 'Can ChatGPT do SEO for me?', a: 'It can draft ideas and outlines, but it can also invent facts and get numbers wrong. In our blind test, an AI guessed search volumes within a factor of two for 8 of 21 keywords. A person must check its work against real data.' },
      { q: 'Is SEO dead or evolving in 2026?', a: 'It is evolving. Results now include AI answers, but they still draw on pages that search engines can crawl and trust. Clear content, a sound site and a recognised brand still matter, and AI search adds new ways to be seen.' },
      { q: 'What are generative AI SEO services?', a: 'Services that prepare your content for generative answers: direct answers near the top, consistent facts, schema, and a record of how AI describes you over time.' }
    ]
  },
  'technical-seo': {
    heroTitle: 'Technical SEO services and audits that find and fix the break',
    metaTitle: 'Technical SEO Audit Services and Fixes | Contomatix',
    moreFaqs: [
      { q: 'Why not use a crawler tool instead of technical SEO services?', a: 'A tool lists issues. It does not tell you which ones matter, why they happen on your site, or how to fix them without breaking something. A specialist ranks the findings and checks the result with a re-crawl.' },
      { q: 'How long does technical SEO take to have an effect?', a: 'Search engines must recrawl changed pages, which can take days to weeks. Fixing an indexing block can show quickly, while speed and structure improvements show more slowly. We do not promise a date.' },
      { q: 'What is the average cost of technical SEO services?', a: 'It depends on site size, platform, how many issues there are and whether fixes are included. Audit prices usually do not cover implementation. We set ours after the free audit.' }
    ]
  }
};
