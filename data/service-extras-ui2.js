// UI extras for the other 7 service pages (18 Nov 2026), same shape as data/service-extras-ui.js.
// Proof cards use only numbers published in our own posts (each card links to the post). No prices, no guarantees, no case studies.
// Keyword wording comes from Google autosuggest on 18 Nov 2026 (Ahrefs was restricted), used as natural headings and questions.
module.exports = {
  'guest-posting': {
    metaTitle: 'Guest Posting Service: Original Articles | Contomatix',
    metaDescription: 'A guest posting service with original articles on relevant, vetted blogs. Manual outreach, editorial placement, no buying links. Free audit first.',
    widget: 'link-vet',
    heroTitle: 'Guest posting service, written for real editors',
    heroLead: 'Original guest articles placed on relevant blogs your customers read. We vet the site, pitch the angle, write the piece and handle the edits, and you approve the topic before drafting starts.',
    proofTitle: 'Receipts, not promises',
    proof: [
      { big: '7 of 7', text: 'blogger outreach guides we read also sell a service or tool, so we wrote our outreach advice from Google\'s own documentation.', href: '/blog/blogger-outreach' },
      { big: '6 of 13', text: 'real link prospect pages we scanned had at least one dead link, which is why every guest post target gets a human check first.', href: '/blog/link-prospecting' },
      { big: '74%', text: 'of our own 38 backlinks come from directory-type sites. We published it, and we explain why you should not copy that profile.', href: '/blog/backlinks-example' }
    ],
    problemsTitle: 'Problems this guest posting service fixes',
    problems: [
      { h: 'Guest posts on blogs that accept anything', t: 'Sites that publish any article for a fee send no readers and can carry risk. We pitch only publications with real organic traffic and an editorial history.' },
      { h: 'Generic pitches that never get a reply', t: 'Editors delete mass emails. Each pitch names a specific angle and a reason the article suits that site\'s readers.' },
      { h: 'Articles that read like adverts', t: 'An editor will not run a sales page. The article answers a real question and mentions your brand only where it helps the reader.' },
      { h: 'No say in what is published', t: 'You agree the topic and angle before we draft, and you see the article before it goes to the publisher.' }
    ],
    offersTitle: 'Guest posting services we offer',
    offers: [
      { h: 'Guest post service on relevant blogs', t: 'Placements chosen for topical fit with your business, not for whatever site happens to accept.' },
      { h: 'Guest blogging service with original writing', t: 'Every article is written for the host site\'s audience. Nothing is recycled across publishers.' },
      { h: 'Guest posting outreach', t: 'One personal pitch per publication, with an angle the editor can say yes to.' },
      { h: 'Guest post link building', t: 'A contextual link inside the article, where a reader would expect a reference, with no sidebar or footer links.' },
      { h: 'Niche guest posting', t: 'Sites read by your actual customers, matched to your topic and checked for real organic traffic.' },
      { h: 'Guest post vetting and site lists', t: 'You see each target with its metrics before outreach begins, so nothing goes live on a site you have not approved.' },
      { h: 'Guest post editing and revisions', t: 'We manage the back and forth with the publisher until the article is accepted.' },
      { h: 'Guest posting for agencies', t: 'Agencies can resell the work through our white-label SEO service.' }
    ],
    engagementTitle: 'How a guest posting engagement and pricing work',
    engagement: [
      'It starts with a free audit. We look at your content, your backlink gap against the sites outranking you, and the publications your customers already read, so you see the opportunity before you pay.',
      'Then we agree a scope: a monthly retainer for steady placements or a fixed project for a one-off push. The price depends on your niche, how competitive it is and how many articles the plan needs, so we do not publish a price list or promise a number of posts before seeing your site.',
      'You approve the target list and every topic, you see each article before it is submitted, and you receive a report of what went live. Your analytics and Search Console stay in accounts you own.'
    ],
    moreFaqs: [
      { q: 'What is a guest post service?', a: 'It is a service where the provider finds relevant blogs, pitches an article idea, writes the article and manages the edits until a publisher runs it with a link back to you. Quality depends on how relevant the blogs are and whether an editor actually chose the piece.' },
      { q: 'Should I buy guest posts online?', a: 'Be careful with sites that sell placements for a fixed fee and accept any topic. Google treats links bought to pass ranking signals as a spam violation, and a placement with no real readers helps nobody. We pitch on editorial merit and say plainly when a publisher uses a sponsored label.' },
      { q: 'Do guest posting sites still work in 2026?', a: 'Placements on real publications with real readers still send visitors and build trust. What stopped working is mass posting on thin blogs. We do not keep a list of sites to reuse; we choose targets per client.' },
      { q: 'Can you give me a guest posting sites list?', a: 'We do not hand out a generic list, because a site that suits one niche is wrong for another. After the free audit you receive a target list with metrics for your niche, and you approve it before any outreach.' },
      { q: 'What are some guest post examples?', a: 'A how-to article that teaches a specific skill to the host\'s readers, a data-led piece that shares your own research, or an expert answer to a question their audience keeps asking. Each mentions your brand only where it helps.' },
      { q: 'Is guest posting the same as a guest blogging service?', a: 'Yes, the two terms mean the same work. Some providers use guest blogging for the writing and guest posting for the placement, but both end with an article on someone else\'s site.' }
    ],
    related: [
      ['Guest posting guide', '/blog/guest-blogging-guide-2026'],
      ['Guest posts vs niche edits', '/blog/guest-posting-vs-niche-edits-2026'],
      ['Blogger outreach', '/blog/blogger-outreach'],
      ['Link prospecting', '/blog/link-prospecting'],
      ['Link building service', '/services/link-building'],
      ['Check a link\'s attributes', '/tools/dofollow-link-checker']
    ]
  },

  'on-page-seo': {
    metaTitle: 'On-Page SEO Service: Audit and Optimization | Contomatix',
    metaDescription: 'An on-page SEO service covering titles, content, internal links and schema, matched to search intent and implemented by us. Free audit first.',
    heroTitle: 'On-page SEO service that fixes the page, not just the report',
    heroLead: 'We audit your titles, headings, content, internal links and structured data against what searchers want, then implement the changes. Ideal before you spend on links.',
    proof: [
      { big: '84%', text: 'of our own 363 post descriptions sit between 120 and 155 characters. We counted them and published the whole distribution.', href: '/blog/meta-description-length' },
      { big: '9 of 195', text: 'ranking pages still use the meta keywords tag, so we do not spend client time on it.', href: '/blog/meta-keywords' },
      { big: '44 of 309', text: 'of our own posts had no internal link pointing to them when we audited, while one post collected links from 91.', href: '/blog/internal-link-building' }
    ],
    problemsTitle: 'Problems this on-page SEO service fixes',
    problems: [
      { h: 'Pages that do not match what people search', t: 'A page can be well written and still miss the search intent. We compare it with what ranks and fix the mismatch before anything else.' },
      { h: 'Titles and descriptions nobody clicks', t: 'Truncated or generic snippets cost clicks. We rewrite them for the query and keep the length within what Google displays.' },
      { h: 'Good pages nobody links to', t: 'Orphan pages get little crawl attention and share no authority. We add internal links where they help the reader.' },
      { h: 'Audits that stop at a spreadsheet', t: 'A list of problems does not rank. We make the changes and show you what moved.' }
    ],
    offersTitle: 'On-page SEO services we offer',
    offers: [
      { h: 'On page SEO audit', t: 'A page-by-page check of titles, headings, content, links, images and structured data, in priority order.' },
      { h: 'On page SEO optimization', t: 'We implement the fixes: rewrites, restructuring and markup, with your approval on the important pages.' },
      { h: 'On page SEO content optimization', t: 'Answer-first sections, clearer headings and added depth, matched to the intent of the query.' },
      { h: 'Title tag and meta description optimization', t: 'Unique, readable snippets for every important page, within the displayed length.' },
      { h: 'Internal linking', t: 'Relevant links between your own pages so crawlers and readers find what matters.' },
      { h: 'Schema markup', t: 'Structured data that matches the visible content, validated before it goes live.' },
      { h: 'Content gap analysis', t: 'Topics the sites outranking you cover that your page misses.' },
      { h: 'On page SEO for agencies', t: 'White-label delivery for agencies that need execution without a new hire.' }
    ],
    engagementTitle: 'How an on-page SEO engagement and pricing work',
    engagement: [
      'It starts with a free audit of your most important pages. We show what is holding them back and in what order to fix it, so you see the plan before you commit.',
      'We then agree a scope, either a fixed project for a set of pages or a monthly service for ongoing optimization. The price depends on how many pages and how competitive your niche is, so we do not publish a price list or promise rankings before seeing the site.',
      'We implement the changes, you approve the pages that matter most, and you receive a summary of what changed and what moved. Your accounts and your content stay yours.'
    ],
    moreFaqs: [
      { q: 'What is an on-page SEO service?', a: 'It is work done on the pages of your own site: titles, descriptions, headings, content, internal links, images and structured data, so search engines and readers understand what each page answers.' },
      { q: 'What is an on-page SEO audit?', a: 'A review of each important page against what searchers want and what search engines need. It lists issues in priority order, so the fixes that most affect visibility come first.' },
      { q: 'What on-page SEO techniques do you use?', a: 'Matching search intent, answer-first sections, clear headings, unique titles and descriptions, relevant internal links, descriptive image alt text and structured data that matches visible content.' },
      { q: 'How long does on-page SEO take to show results?', a: 'Search engines must recrawl and reassess changed pages, which can take days to weeks, and competition decides the rest. We do not promise a date, and we report what changed and what moved.' },
      { q: 'What is the difference between on-page SEO optimization and content writing?', a: 'Optimization improves pages that already exist so they match search intent. Writing creates new pages. We start with the first because existing pages are often the fastest gain.' },
      { q: 'Do I need an on-page SEO agency or can I do it myself?', a: 'You can start with a checklist, and our guide covers one. An agency helps when you have many pages, limited time or want the fixes implemented and checked for you.' }
    ],
    related: [
      ['On-page SEO checklist', '/blog/on-page-seo-checklist'],
      ['Meta tags best practices', '/blog/meta-tags-best-practices'],
      ['Meta description length', '/blog/meta-description-length'],
      ['Internal link building', '/blog/internal-link-building'],
      ['Keyword mapping tool', '/tools/keyword-mapping-tool'],
      ['Technical SEO service', '/services/technical-seo']
    ]
  },

  'off-page-seo': {
    metaTitle: 'Off-Page SEO Service: Links and Authority | Contomatix',
    metaDescription: 'An off-page SEO service built on relevant links, brand mentions and citations that earn authority. White-hat, manual, no PBNs. Free audit first.',
    widget: 'link-vet',
    heroTitle: 'Off-page SEO service that builds authority you can verify',
    heroLead: 'Relevant backlinks, brand mentions and citations earned by hand, planned from a gap analysis against the sites outranking you. No private blog networks, no link blasts.',
    proof: [
      { big: '74%', text: 'of our own 38 backlinks come from directory-type sites. We published the breakdown and why it is not a profile to copy.', href: '/blog/backlinks-example' },
      { big: '1 of 8', text: 'international link building guides link to the official Google documentation. We read it and published what it says.', href: '/blog/international-link-building' },
      { big: '6 of 13', text: 'real link prospect pages we scanned had at least one dead link, so each placement is checked by a person.', href: '/blog/link-prospecting' }
    ],
    problemsTitle: 'Problems this off-page SEO service fixes',
    problems: [
      { h: 'Authority that never arrives', t: 'Good pages still lose to sites with stronger backlink profiles. A gap analysis shows which referring domains are missing and which are worth earning.' },
      { h: 'Link counts instead of link quality', t: 'Volume reports hide weak placements. We judge each source on traffic, relevance, outbound-link history and context.' },
      { h: 'Brand mentions with no link', t: 'Sites that already name you but do not link are the easiest wins. We find and ask for those first.' },
      { h: 'Tactics that risk a penalty', t: 'Paid footer links and link networks break Google\'s spam policies. We avoid them and qualify sponsored placements.' }
    ],
    offersTitle: 'Off-page SEO services we offer',
    offers: [
      { h: 'Off page SEO strategy', t: 'A plan that picks target pages and link types from a backlink gap, before any outreach.' },
      { h: 'Off page SEO activities', t: 'Link building, unlinked mention outreach, citations and digital PR, chosen for your niche.' },
      { h: 'Backlink gap analysis', t: 'A comparison of your referring domains with the sites outranking you.' },
      { h: 'Brand mention outreach', t: 'Turning existing mentions of your brand into links.' },
      { h: 'Citations and listings', t: 'Consistent business details on relevant directories where they matter, mainly for local businesses.' },
      { h: 'Guest posts and link insertions', t: 'Contextual placements on relevant sites, through our link building and guest posting services.' },
      { h: 'Backlink reporting', t: 'A monthly report of what went live, to which page, and what changed.' },
      { h: 'Off page SEO for agencies', t: 'White-label delivery with reporting under your brand.' }
    ],
    engagementTitle: 'How an off-page SEO engagement and pricing work',
    engagement: [
      'It starts with a free backlink gap audit. We compare your referring domains with the sites already ranking for your target terms and show where the gap is.',
      'We then agree a scope, either a monthly retainer for ongoing work or a fixed project. The price depends on your niche and competition, so we do not publish a price list or promise a number of links before seeing your site.',
      'You see the target list before any placement goes live and receive a monthly report. Your analytics and Search Console stay in accounts you own.'
    ],
    moreFaqs: [
      { q: 'What are off page SEO activities?', a: 'Work done away from your own site that builds trust and visibility: earning backlinks, getting brand mentions, citations, digital PR and relevant guest content. Social and review activity can support it, but links remain the core.' },
      { q: 'What are some off page SEO techniques?', a: 'Backlink gap analysis, guest posts, link insertions, unlinked mention outreach, resource page links and citations. We choose from these based on your niche and the pages that need to rank.' },
      { q: 'What are some off page SEO examples?', a: 'A relevant blog linking to your guide in an article, a publication citing your research, a business directory listing with consistent details, or a brand mention that you ask to turn into a link.' },
      { q: 'What is an off page SEO checklist?', a: 'Check your backlink gap, review the quality of current links, find unlinked brand mentions, confirm citations are consistent, and pick target pages before building anything. We run these steps in the free audit.' },
      { q: 'Is an off page SEO agency worth it?', a: 'It can be when you lack the time or contacts for manual outreach. Judge any agency on how it vets sites, whether you see targets first and whether reporting shows the links and the pages they point to.' },
      { q: 'What does off page SEO cost?', a: 'It depends on your niche, competition and the size of the plan, so we set it after the free audit and agree a monthly retainer or a fixed project. A number before seeing your site would be a guess.' }
    ],
    related: [
      ['Link building service', '/services/link-building'],
      ['Guest posting service', '/services/guest-posting'],
      ['Backlinks report', '/blog/backlinks-report'],
      ['How many backlinks do you need?', '/blog/how-many-backlinks-do-i-need'],
      ['Do backlinks matter for AI search?', '/blog/do-backlinks-matter-for-ai-search-2026'],
      ['Find competitor backlinks', '/blog/how-to-find-competitor-backlinks-2026']
    ]
  },

  'white-label-seo': {
    metaTitle: 'White Label SEO Services for Agencies | Contomatix',
    metaDescription: 'White label SEO services for agencies and freelancers: link building, audits and reports under your brand. We never contact your clients. Free audit first.',
    heroTitle: 'White label SEO services your clients never see us in',
    heroLead: 'Delivery for agencies and consultants: link building, audits and reporting under your brand. We never contact your clients, and you keep the relationship.',
    proof: [
      { big: '5 of 7', text: 'ranking white label link building pages sell quality as a DR or DA score. A score is a starting point, not proof of relevance, so we vet by hand.', href: '/blog/white-label-link-building' },
      { big: '2 of 7', text: 'of those pages show a dollar figure at all, which is why we explain how our pricing works instead of hiding it.', href: '/blog/white-label-link-building' },
      { big: '3 of 7', text: 'offer a sample report. Our audit report template shows the structure your clients would receive.', href: '/blog/seo-audit-report-template' }
    ],
    problemsTitle: 'Problems this white label SEO service fixes',
    problems: [
      { h: 'More client demand than your team can deliver', t: 'We take overflow work or whole workstreams, so you can say yes to the next client without hiring.' },
      { h: 'Resold links that put clients at risk', t: 'Cheap resold links can break Google\'s spam policies. We place links by hand on real sites and qualify any sponsored placement.' },
      { h: 'Reports that look like another vendor\'s', t: 'Reporting is white-labeled, so your clients see your brand and your name.' },
      { h: 'Unclear pricing that kills your margin', t: 'You need to know the cost before you quote a client. We agree scope and pricing with you first.' }
    ],
    offersTitle: 'White label SEO services we offer',
    offers: [
      { h: 'White label SEO services for agencies', t: 'Delivery of the work behind your SEO packages, under your brand.' },
      { h: 'White label link building', t: 'Manual placements on relevant sites, with white-labeled reporting.' },
      { h: 'White label SEO audits', t: 'Technical and on-page audits you can present to your client as your own.' },
      { h: 'White label SEO reporting', t: 'Clear, branded reports of what was done and what changed.' },
      { h: 'White label SEO for freelancers and consultants', t: 'Capacity for solo operators who need extra hands on delivery.' },
      { h: 'White label SEO reseller support', t: 'A named point of contact and a repeatable process, so you can resell with confidence.' },
      { h: 'Overflow SEO work', t: 'Take on a single client or a single task first, with no minimum number of accounts.' },
      { h: 'White label SEO pricing', t: 'Scope and price agreed with you before you quote your client.' }
    ],
    engagementTitle: 'How a white label SEO partnership and pricing work',
    engagement: [
      'It starts with a conversation about the clients you serve and the work you want to hand over. We can begin with one client or one task, so you can judge the quality before committing more.',
      'Pricing depends on which services you resell and how much volume you send, so we do not publish a rate card. We agree it with you before you quote your own client, so your margin is clear.',
      'Reporting is white-labeled, we never contact your clients, and notice periods are short. Client accounts stay in accounts you or they own.'
    ],
    moreFaqs: [
      { q: 'What are white label SEO services?', a: 'Services where one company does the SEO work and another sells it under its own brand. The client deals only with the agency, and the delivery partner stays in the background.' },
      { q: 'How do white label SEO agencies work?', a: 'The agency sells the package and manages the client. The partner delivers the work, such as link building or audits, and hands back reports the agency presents as its own.' },
      { q: 'What is white label SEO pricing based on?', a: 'Usually the services you resell, the volume and how competitive the client\'s niche is. We agree pricing before you quote your client, so you know your margin.' },
      { q: 'What should I look for in a white label SEO company?', a: 'How it vets link sources, whether you see targets first, whether it follows Google\'s spam policies, what reporting looks like and whether it contacts your clients. Ask for a sample report.' },
      { q: 'Can I white label SEO as a freelancer?', a: 'Yes. Freelancers and consultants use it to add capacity without hiring. You can start with a single task and grow as needed.' },
      { q: 'Is white label SEO the same as reselling SEO?', a: 'They overlap. Reselling is selling someone else\'s work as your own service. White label means the work is delivered under your brand, including the reporting.' }
    ],
    related: [
      ['White label SEO guide', '/blog/white-label-seo'],
      ['White label link building', '/blog/white-label-link-building'],
      ['SEO audit report template', '/blog/seo-audit-report-template'],
      ['SEO proposal generator', '/tools/seo-proposal-generator'],
      ['Link building service', '/services/link-building'],
      ['Technical SEO service', '/services/technical-seo']
    ]
  },

  'keyword-research': {
    metaTitle: 'Keyword Research Service: Intent-Based Plans | Contomatix',
    metaDescription: 'An SEO keyword research service that maps real search intent, gaps and long-tail terms to your pages. Delivered as a plan you can use. Free audit first.',
    heroTitle: 'Keyword research service built around search intent',
    heroLead: 'We find the terms your customers actually search, check what ranks for them, and map each to a page. You get a plan you can act on, not a raw export.',
    proof: [
      { big: '8 of 21', text: 'monthly search volumes an AI model guessed blind were within a factor of two of our real export. Six were off by five times or more.', href: '/blog/ai-tools-for-seo-keyword-research' },
      { big: '195', text: 'ranking pages we read to learn how many still use the meta keywords tag. Only 9 did, so we skip it in plans.', href: '/blog/meta-keywords' },
      { big: '84%', text: 'of our own 363 post descriptions already sit in the length range we recommend. We count our own pages before advising yours.', href: '/blog/meta-description-length' }
    ],
    problemsTitle: 'Problems this keyword research service fixes',
    problems: [
      { h: 'Keywords with volume but no buyers', t: 'High-volume terms can attract readers who never convert. We weigh intent and difficulty, not just search volume.' },
      { h: 'Several pages chasing one term', t: 'Two pages competing for the same query split their ranking. We map one primary keyword to one page.' },
      { h: 'No idea what to write next', t: 'A competitor keyword gap shows topics that already bring traffic to others and that you do not cover.' },
      { h: 'Guessed numbers', t: 'We test AI guesses against real data. In our test they were often far off, so we use tool data and Google itself.' }
    ],
    offersTitle: 'Keyword research services we offer',
    offers: [
      { h: 'SEO keyword research service', t: 'A prioritized list of terms with intent, difficulty and the page each should target.' },
      { h: 'Keyword research agency work for ongoing sites', t: 'Monthly refreshes as your content and competitors change.' },
      { h: 'Long-tail keyword research', t: 'Specific, lower-competition phrases that are easier to rank for and closer to the buying decision.' },
      { h: 'Competitor keyword gap analysis', t: 'Terms the sites outranking you rank for and you do not.' },
      { h: 'Keyword mapping', t: 'One primary keyword per page, with supporting terms, to avoid cannibalization.' },
      { h: 'Search intent analysis', t: 'Whether searchers want a guide, a product, a comparison or a local result.' },
      { h: 'Keyword research for new sites', t: 'A launch plan that starts with terms you can realistically rank for.' },
      { h: 'Keyword research for AI search', t: 'The questions customers ask in chat assistants and AI answers, alongside classic search.' }
    ],
    engagementTitle: 'How a keyword research engagement and pricing work',
    engagement: [
      'It starts with a free audit of the pages you already have and the terms they appear for. We show where the gaps and overlaps are before any new research is bought.',
      'The deliverable is a keyword plan mapped to pages, as a fixed project or as a monthly service if you want refreshes. The price depends on the size of the site and the number of topic areas, so we do not publish a price list.',
      'You receive the plan in a format you keep, and you can hand it to your own writers. Your accounts stay yours.'
    ],
    moreFaqs: [
      { q: 'What is a keyword research service?', a: 'A service that finds the search terms your customers use, checks what currently ranks for them and tells you which pages to create or improve. The output is a plan, not a list of numbers.' },
      { q: 'What does keyword research for SEO involve?', a: 'Collecting candidate terms, checking search intent and difficulty, grouping them by topic, and mapping each group to a page. We also look for competitor gaps and cannibalization.' },
      { q: 'How much does keyword research cost?', a: 'It depends on the size of your site, how many topic areas you cover and whether you want a one-off plan or monthly refreshes. We set it after the free audit.' },
      { q: 'What does a keyword research agency do differently from a tool?', a: 'A tool gives you data. A person reads the results, judges intent, removes terms that will not convert and ties each keyword to a page. That is the part that takes time.' },
      { q: 'Can I find keywords for SEO for free?', a: 'Yes, partly. Google suggestions, People Also Ask and Search Console show real queries at no cost, and our keyword research tools guide covers a free stack. A service saves the time of sorting and mapping them.' },
      { q: 'How often should keyword research be updated?', a: 'Review it whenever you add a topic area, and refresh it regularly for competitive niches, because search behaviour and competitors change.' }
    ],
    related: [
      ['Keyword research tools', '/blog/keyword-research-tools'],
      ['AI tools for keyword research', '/blog/ai-tools-for-seo-keyword-research'],
      ['Keyword mapping tool', '/tools/keyword-mapping-tool'],
      ['Local keyword research', '/blog/local-keyword-research'],
      ['On-page SEO service', '/services/on-page-seo'],
      ['AI SEO service', '/services/ai-seo']
    ]
  },

  'ai-seo': {
    metaTitle: 'AI SEO Service: Google and AI Answers | Contomatix',
    metaDescription: 'An AI SEO service that structures your content for AI Overviews and chat answers while keeping classic SEO strong. Measured, not guaranteed. Free audit first.',
    heroTitle: 'AI SEO service for Google and AI answers',
    heroLead: 'We make your pages easy for AI Overviews and chat assistants to understand and cite, on top of strong classic SEO. We measure what changed and never promise a citation.',
    proof: [
      { big: '12', text: 'customer-style prompts make up the brand check we ran on ourselves, with the results published.', href: '/blog/brand-appears-in-chatgpt-ai-search-2026' },
      { big: '8 of 21', text: 'monthly search volumes an AI model guessed blind were within a factor of two of the real data, so we do not trust AI for numbers.', href: '/blog/ai-tools-for-seo-keyword-research' },
      { big: '370', text: 'posts get a full-site check before every push on our own blog. We read what the audit flags, not just the summary.', href: '/blog/website-seo-audit' }
    ],
    problemsTitle: 'Problems this AI SEO service fixes',
    problems: [
      { h: 'Ranking on Google but missing from AI answers', t: 'A page can rank and still not be cited. We restructure priority pages so the direct answer is clear and extractable.' },
      { h: 'Not knowing what AI says about your brand', t: 'We run a fixed set of customer prompts, log whether you are mentioned, named or linked, and repeat it so you can see change.' },
      { h: 'Vendors promising citations', t: 'No one controls what a chat assistant cites. We improve what you can control and report honestly on the rest.' },
      { h: 'AI tools that guess', t: 'AI can speed up work, but it can invent facts. A person checks every figure and claim before it goes on your site.' }
    ],
    offersTitle: 'AI SEO services we offer',
    offers: [
      { h: 'AI SEO service', t: 'Classic SEO plus the changes that help AI answers understand and cite your pages.' },
      { h: 'AI search optimization services', t: 'Answer-first structure, clear entities and consistent facts across your pages.' },
      { h: 'Generative engine optimization services', t: 'Content shaped so generative answers can quote it accurately.' },
      { h: 'AI visibility audit', t: 'A fixed prompt test across AI search and Google AI Overviews, repeated monthly.' },
      { h: 'Answer engine optimization', t: 'Question-shaped headings with direct answers in the first sentences.' },
      { h: 'Schema and entity work', t: 'Structured data that matches visible content and describes your business clearly.' },
      { h: 'Brand mention building', t: 'Earning relevant mentions and links that AI systems and search engines both notice.' },
      { h: 'AI SEO agency for existing SEO teams', t: 'White-label delivery for agencies adding AI search to their packages.' }
    ],
    engagementTitle: 'How an AI SEO engagement and pricing work',
    engagement: [
      'It starts with a free AI visibility check: we run a set of customer-style prompts, see where your brand appears and note the gaps in your pages.',
      'We then agree a scope, either a fixed project to restructure priority pages or a monthly service that includes re-checks. The price depends on the number of pages and your niche, so we do not publish a price list or promise citations.',
      'You receive the prompt results, a list of changes and a re-check after they are live. Your analytics and Search Console stay yours.'
    ],
    moreFaqs: [
      { q: 'What are AI SEO services?', a: 'Services that adapt your content and brand signals so AI Overviews and chat assistants can understand and cite you, alongside classic SEO. They include answer-first writing, schema, entity clarity and visibility testing.' },
      { q: 'What does an AI SEO agency do?', a: 'It tests how AI systems describe your brand, restructures key pages for direct answers, supports that with schema and mentions, and repeats the test to see what changed.' },
      { q: 'What are generative engine optimization services?', a: 'Another name for AI SEO. The aim is for generative answers to quote your pages accurately, which depends on clear structure, consistent facts and trusted sources.' },
      { q: 'Will AI replace SEO?', a: 'AI changes how results are shown, but it still draws on web pages, so clear, trustworthy content matters. We treat AI search as an addition to SEO, not a replacement.' },
      { q: 'Are AI SEO services worth it?', a: 'They are worth it when your classic SEO is already sound and your buyers use AI search. We start with a visibility check, so you see the gap before paying.' },
      { q: 'What does an AI SEO service cost?', a: 'It depends on how many pages are in scope and your niche, so we set it after the free check and agree a fixed project or a monthly service.' }
    ],
    related: [
      ['What is LLM SEO?', '/blog/what-is-llm-seo-2026'],
      ['AEO guide', '/blog/answer-engine-optimization-aeo-guide-2026'],
      ['AI SEO services guide', '/blog/ai-seo-services'],
      ['Check your brand in ChatGPT', '/blog/brand-appears-in-chatgpt-ai-search-2026'],
      ['LLM SEO checker', '/tools/llm-seo-checker'],
      ['Do backlinks matter for AI search?', '/blog/do-backlinks-matter-for-ai-search-2026']
    ]
  },

  'technical-seo': {
    metaTitle: 'Technical SEO Service: Audit and Fixes | Contomatix',
    metaDescription: 'A technical SEO service covering crawling, indexing, speed, redirects and structured data. We audit, fix and re-crawl. Free audit first.',
    heroTitle: 'Technical SEO service that finds the break and fixes it',
    heroLead: 'We audit crawling, indexing, speed, redirects and markup, fix what is blocking your pages, and re-crawl to confirm. A technical SEO audit you can act on.',
    proof: [
      { big: '12 of 13', text: 'of our own pages passed Core Web Vitals when we measured. The one failure was a layout shift of 0.425, caused by one wrong size in a template.', href: '/blog/improve-core-web-vitals' },
      { big: '239 of 347', text: 'of our own posts have a year in the URL, the risk we show before any migration. We plan URLs first.', href: '/blog/seo-site-migration' },
      { big: '370', text: 'posts get a full-site audit before every push on our own blog, and we read every warning it prints.', href: '/blog/website-seo-audit' }
    ],
    problemsTitle: 'Problems this technical SEO service fixes',
    problems: [
      { h: 'Good pages that never get indexed', t: 'Blocked by robots.txt, noindex tags or weak internal links, pages can sit unseen. We find the cause and fix it.' },
      { h: 'Slow or unstable pages', t: 'A layout shift or slow load can cost visitors. We measure real pages and trace the exact cause.' },
      { h: 'Redirect and canonical mistakes', t: 'Wrong redirects and canonicals split signals between URLs. We map and clean them up.' },
      { h: 'Audits that list hundreds of issues', t: 'Most flags do not matter. We rank issues by impact and fix the few that do.' }
    ],
    offersTitle: 'Technical SEO services we offer',
    offers: [
      { h: 'Technical SEO audit', t: 'A full check of crawling, indexing, speed, markup and security, in priority order.' },
      { h: 'Technical SEO services for fixes', t: 'We implement the changes, validate them and re-crawl, rather than handing over a list.' },
      { h: 'Core Web Vitals optimization', t: 'Real measurements, then fixes for loading, responsiveness and layout shift.' },
      { h: 'Crawl and indexation review', t: 'robots.txt, sitemaps, canonicals and noindex rules checked against Search Console.' },
      { h: 'Site migration support', t: 'A URL plan and redirect map before launch, and monitoring after.' },
      { h: 'Structured data implementation', t: 'Schema that matches visible content, validated before it goes live.' },
      { h: 'Log file analysis', t: 'What crawlers actually request, for larger sites where crawl budget matters.' },
      { h: 'Technical SEO for agencies', t: 'White-label audits and fixes for agency clients.' }
    ],
    engagementTitle: 'How a technical SEO engagement and pricing work',
    engagement: [
      'It starts with a free audit that shows the biggest blockers on your site, ranked by impact, so you see what is worth fixing before you pay.',
      'We then agree a scope, either a fixed project for the audit and fixes or a monthly service for ongoing monitoring. The price depends on the size and complexity of the site, so we do not publish a price list or promise rankings.',
      'We fix, validate and re-crawl, and you receive a summary of what changed. Your hosting, analytics and Search Console stay in accounts you own.'
    ],
    moreFaqs: [
      { q: 'What are technical SEO services?', a: 'Work on the parts of your site that affect whether search engines can crawl, index and render your pages: robots rules, sitemaps, speed, redirects, canonicals and structured data.' },
      { q: 'What does a technical SEO audit include?', a: 'Crawling and indexation, site speed and Core Web Vitals, redirects and canonicals, structured data, mobile usability and internal links, with each issue ranked by impact.' },
      { q: 'What is on a technical SEO checklist?', a: 'Check robots.txt and sitemaps, indexation in Search Console, redirects and canonicals, Core Web Vitals, structured data, mobile usability and broken links. Our audit tool covers the first checks.' },
      { q: 'How much does a technical SEO audit cost?', a: 'It depends on the size and complexity of your site, so we set it after the free audit and agree a fixed project or monthly service.' },
      { q: 'Do I need a technical SEO agency?', a: 'If your site is small and uses a well-maintained platform, you may handle the basics yourself. An agency helps with large sites, migrations, indexing problems and custom builds.' },
      { q: 'How is a technical SEO agency different from a developer?', a: 'A developer builds and fixes. A technical SEO knows what search engines need and can tell your developer what to change and how to verify it.' }
    ],
    related: [
      ['Technical SEO audit tool', '/tools/technical-seo-audit-tool'],
      ['Technical SEO agency guide', '/blog/technical-seo-agency-2026'],
      ['Improve Core Web Vitals', '/blog/improve-core-web-vitals'],
      ['SEO site migration', '/blog/seo-site-migration'],
      ['Robots.txt file', '/blog/robots-txt-file'],
      ['Website SEO audit', '/blog/website-seo-audit']
    ]
  }
};
