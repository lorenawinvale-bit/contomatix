// Extra, semantically structured content for each service page (rendered by views/pages/service.ejs).
// Rules: no invented numbers, prices, guarantees or case studies. Every statement must stay consistent with data/services.js.
// answer       - direct 40-60 word definition shown first (extractable by search and AI answer engines)
// facts        - "At a glance" definition list
// sections     - extra H2 sections with short paragraphs / lists
// moreFaqs     - long-tail questions, merged after the main FAQs (also in FAQPage schema)
// related      - internal links (blog posts, tools, sibling services)
module.exports = {
  'link-building': {
    metaTitle: 'Link Building Services: Manual, White-Hat | Contomatix',
    metaDescription: 'Manual white-hat link building: guest posts, link insertions, resource pages and editorial mentions from relevant sites. Vetted by hand, no PBNs.',
    answer: 'Link building is the practice of earning backlinks from other relevant websites to yours. Contomatix runs it as a manual, white-hat service: we research a gap against the sites outranking you, vet each publisher for traffic and relevance, secure placements through outreach, and report every live link.',
    facts: [
      ['Best for', 'Sites with solid content and technical foundations that need more authority to compete for competitive terms.'],
      ['Link types', 'Guest posts, link insertions (niche edits), resource page links, editorial mentions, digital PR links.'],
      ['Vetting', 'Real organic traffic, topical relevance, clean outbound-link history and editorial placement, checked by hand.'],
      ['What is not used', 'PBNs, link farms, automated link blasts or paid sidebar and footer links.'],
      ['Reporting', 'Monthly link velocity report with the live placements and anchor text diversity.'],
      ['Start point', 'A free backlink gap audit against the sites already ranking for your target terms.']
    ],
    sections: [
      { h: 'What link building is, and what it is not', p: [
        'A backlink is a link from another website to yours. Search engines use links to discover pages and as one signal of how a page is regarded, which is why a link from a relevant, trusted site is worth more than many links from irrelevant ones.',
        'Link building is therefore a quality exercise, not a counting exercise. A manual link building service focuses on relevance, real traffic and editorial context. It does not mean directory submissions in bulk, comment spam, or paying for placements that pass ranking signals without being marked as sponsored.' ] },
      { h: 'How white-hat link building differs from risky tactics', p: [
        'Google\'s spam policies treat buying or selling links that pass ranking signals as a violation, and ask that paid or sponsored links be qualified with rel="sponsored". White-hat link building avoids that risk by earning links through outreach, useful content and genuine editorial decisions.',
        'In practice that means a person reviews every target site, the content on it is original, and the link sits inside a relevant paragraph where a reader would expect a reference.' ] },
      { h: 'When link building is the right next step', p: [
        'Link building pays off when your pages already deserve to rank. If a page sits on page two for a term and the page itself is thin or mismatched to the search intent, fix that first with on-page SEO. If the content is strong and competitors with similar content have more referring domains, links are usually the gap.',
        'A backlink gap analysis tells you which. It compares the referring domains of the sites outranking you with yours, and shows the link types doing the work in your niche.' ] },
      { h: 'Link types, matched to the goal', p: [
        'Guest posts and editorial mentions build topical authority and referral traffic. Link insertions in existing, already-ranking articles pass authority faster because the page is already indexed and trusted. Resource page links suit informational and tool pages. Digital PR suits brands with a story or data worth citing.' ] }
    ],
    moreFaqs: [
      { q: 'What is a manual link building service?', a: 'It is a service where people, not software, select the target sites, write the outreach and secure each placement. It trades speed for control: every link is reviewed for relevance and traffic before it goes live.' },
      { q: 'What is the difference between link building and digital PR?', a: 'Link building usually targets specific placements for specific pages. Digital PR creates a newsworthy asset or story and earns coverage and links from journalists and publishers as a result. Both can feed the same backlink profile.' },
      { q: 'Should every link be dofollow?', a: 'No. A natural profile contains followed, nofollow, sponsored and ugc links. Google treats those attributes as hints, and a mix is normal. Focus on relevance and editorial placement, not on the attribute.' },
      { q: 'How do you choose anchor text?', a: 'We vary it. Branded, naked URL, partial match and generic anchors are mixed to look natural, and the anchor must fit the sentence it sits in. Exact-match anchors are used sparingly.' },
      { q: 'Can link building work for a new website?', a: 'Yes, but the order matters. A new site needs indexable pages, a clear structure and some real content first. Links to pages that are not ready to rank waste placements.' },
      { q: 'How do I know if a link is toxic?', a: 'Signs include a site built for selling links, irrelevant topics, no real traffic, hacked content or a network footprint. A few poor links rarely hurt a site, and Google\'s documentation says it works to ignore spam links. Disavowal is a tool for specific, serious cases.' }
    ],
    related: [
      ['How many backlinks do you need?', '/blog/how-many-backlinks-do-i-need'],
      ['Find and fix broken backlinks', '/blog/find-broken-backlinks'],
      ['Do nofollow links help SEO?', '/blog/do-nofollow-links-help-seo-2026'],
      ['Outsourcing link building', '/blog/outsource-link-building'],
      ['Free dofollow link checker', '/tools/dofollow-link-checker'],
      ['Guest posting service', '/services/guest-posting']
    ]
  },

  'guest-posting': {
    metaTitle: 'Guest Posting Services: Original Articles | Contomatix',
    metaDescription: 'Guest posting services with original articles on relevant, vetted publications. Outreach, writing and editorial placement with a natural link back.',
    answer: 'Guest posting is publishing an original article on another website in your field, with a relevant link back to yours. Contomatix finds and vets the publishers, agrees the angle with you, writes the article and handles the outreach, so the placement earns readers as well as a backlink.',
    facts: [
      ['Best for', 'Brands that want authority, referral traffic and topical relevance from respected publications in their niche.'],
      ['Who writes', 'Contomatix writes original articles for each site; nothing is recycled across publishers.'],
      ['Publisher vetting', 'Real organic traffic and an engaged readership are checked before outreach starts.'],
      ['Your input', 'Topic and angle are agreed with you before drafting begins.'],
      ['Output', 'A live article on a real publication, with a link and a brand mention where appropriate.'],
      ['Related service', 'Guest posts are one of the link types inside our link building service.']
    ],
    sections: [
      { h: 'What guest posting services include', p: [
        'A guest posting service covers the whole chain: finding publications that fit your niche, pitching an angle their editors want, writing the article to their standard and managing the revisions through to publication.',
        'Guest blogging outreach is the slowest part to do well, because editors receive many generic pitches. Personalised pitches with a clear angle and a genuine reason the article suits their audience are what get replies.' ] },
      { h: 'How we choose publishers for guest posts', p: [
        'We look at whether the site has real organic traffic, an active readership, topical relevance to your business and a clean history of outbound links. A site that publishes anything for anyone is excluded, even if it looks strong on a metric.',
        'The reason is simple: a placement on a respected site in your niche sends visitors and trust, while a placement on a link-selling blog sends neither and can carry risk.' ] },
      { h: 'Guest posting versus paid or sponsored posts', p: [
        'A guest post is editorial content: the publisher chooses to run it because it is useful to their readers. A sponsored post is a paid placement, and Google asks that paid links be marked with rel="sponsored". We do not sell or buy sponsored placements as a way to pass ranking signals.' ] },
      { h: 'What a good guest article looks like', p: [
        'It answers a real question for the publisher\'s audience, shows evidence, teaches something specific and references your brand or resource only where it helps the reader. It is not an advertisement with a link in the last line.' ] }
    ],
    moreFaqs: [
      { q: 'What is guest blogging outreach?', a: 'It is the process of finding relevant blogs and publications and pitching them an article idea. Good outreach is personalised, names a specific angle and shows why the article suits that site\'s readers.' },
      { q: 'How long does a guest post take to go live?', a: 'It depends on the publisher\'s editorial queue. Vetting, pitching, agreeing the angle, drafting and editing all take time, and some publishers schedule posts weeks ahead.' },
      { q: 'Do you offer guest posts on any topic?', a: 'No. We work within your niche and adjacent topics where the publication has a relevant audience. An article that does not fit the site would not be accepted and would not help you.' },
      { q: 'Will the guest post link be dofollow?', a: 'We aim for editorial links without a sponsored attribute, but the publisher decides how links are marked. A nofollow link from a relevant, respected site can still send visitors and build visibility.' },
      { q: 'Can I review the article before it goes live?', a: 'Yes. The topic and angle are agreed first, and you see the article before it is submitted to the publisher.' },
      { q: 'What makes a guest posting service different from buying links?', a: 'A guest posting service produces original content that an editor decides to publish. Buying links means paying for a placement or an insertion where the link is the product. The first is editorial; the second is covered by link spam policies.' }
    ],
    related: [
      ['Guest posting guide', '/blog/guest-blogging-guide-2026'],
      ['Guest posts vs niche edits', '/blog/guest-posting-vs-niche-edits-2026'],
      ['Link building service', '/services/link-building'],
      ['How many backlinks do you need?', '/blog/how-many-backlinks-do-i-need'],
      ['Check a link\'s attributes', '/tools/dofollow-link-checker']
    ]
  },

  'on-page-seo': {
    metaTitle: 'On-Page SEO Services: Titles, Content, Links | Contomatix',
    metaDescription: 'On-page SEO services: title tags, headings, content gaps, internal links and schema, fixed page by page so search engines understand your content.',
    answer: 'On-page SEO is optimising the content and HTML of your own pages so search engines understand them and match them to the right searches. It covers title tags, headings, content, internal links and structured data. Contomatix audits these, finds gaps against pages that outrank you and fixes or hands over the list.',
    facts: [
      ['Best for', 'Sites whose pages rank on page two or below despite decent authority, or whose pages target the wrong terms.'],
      ['Covers', 'Title tags, meta descriptions, headings, content, internal linking, schema markup, image alt text.'],
      ['Method', 'Content gap analysis against the pages currently outranking you, then a prioritised fix list or direct implementation.'],
      ['Not included', 'Backlink acquisition (see link building) and server-level technical fixes (see technical SEO).'],
      ['Output', 'A fix list or direct implementation, plus keyword-to-page mapping.'],
      ['Start point', 'A title, meta and header audit of your priority pages.']
    ],
    sections: [
      { h: 'What on-page SEO covers', p: [
        'On-page SEO is everything you control on the page itself: what the page says, how it is structured and how it connects to other pages. The main elements are the title tag, meta description, headings, body content, internal links, images with alt text and structured data.',
        'Search engines read these signals to decide what a page is about and which searches it should appear for. A page that mixes several topics, or never states its main topic clearly, is harder to match.' ] },
      { h: 'Title tags, headings and content that match search intent', p: [
        'A title tag should state the page\'s main topic clearly and use the words people actually search. Headings should break the content into the questions a reader has, and the opening paragraph should answer the main question directly.',
        'Search intent decides the format. A query that wants a definition needs a clear explanation, a query that wants options needs a comparison, and a query that wants a service needs proof, process and next steps.' ] },
      { h: 'Internal linking and structured data', p: [
        'Internal links tell search engines which pages matter and how they relate. Strong internal linking uses descriptive anchor text, links from relevant body copy and reaches pages that no other page currently links to.',
        'Structured data, such as FAQ, Article and Breadcrumb markup, helps search engines read the page. It should describe content that is visible on the page and does not guarantee a rich result.' ] },
      { h: 'When on-page work comes before links', p: [
        'Pages that rank on page two despite decent authority usually have a fixable gap, such as an unclear topic, thin coverage or weak internal links. Closing that gap is faster and cheaper than adding more backlinks, which is why on-page SEO is often the first step.' ] }
    ],
    moreFaqs: [
      { q: 'What is the difference between on-page SEO and technical SEO?', a: 'On-page SEO concerns the content and HTML elements of individual pages. Technical SEO concerns how the whole site is crawled, rendered and indexed, such as speed, redirects and site architecture. They overlap at schema and internal linking.' },
      { q: 'Is there an ideal title tag length?', a: 'Google does not set a fixed limit and may rewrite titles. Keep titles concise, put the main topic first and avoid stuffing so the full meaning stays visible when truncated.' },
      { q: 'How many internal links should a page have?', a: 'There is no fixed number. Add links where they help a reader take the next step, use descriptive anchors and make sure important pages receive links from relevant content.' },
      { q: 'Do meta descriptions affect rankings?', a: 'Not directly. They can influence whether a person clicks, and Google may use them as the snippet, so they should describe the page honestly and clearly.' },
      { q: 'What is a content gap analysis?', a: 'It compares your page with the pages that outrank it and lists the subtopics, questions and formats they cover that you do not. The result is a prioritised list of additions.' },
      { q: 'Does schema markup improve rankings?', a: 'Schema is not a ranking switch. It helps search engines understand the page and can make it eligible for certain rich results where Google supports them.' }
    ],
    related: [
      ['On-page SEO checklist', '/blog/on-page-seo-checklist'],
      ['Meta tags best practices', '/blog/meta-tags-best-practices'],
      ['Internal link building', '/blog/internal-link-building'],
      ['Technical SEO audit tool', '/tools/technical-seo-audit-tool'],
      ['Keyword mapping tool', '/tools/keyword-mapping-tool'],
      ['Technical SEO service', '/services/technical-seo']
    ]
  },

  'off-page-seo': {
    metaTitle: 'Off-Page SEO Services: Authority & Mentions | Contomatix',
    metaDescription: 'Off-page SEO services that build authority beyond your site: backlink strategy, brand mentions, citations and digital PR around your target terms.',
    answer: 'Off-page SEO is the work done outside your own website that influences how search engines and AI systems judge it: backlinks, brand mentions, citations and PR coverage. Contomatix sets the authority strategy, then coordinates link building, mentions and citations toward the same target keywords.',
    facts: [
      ['Best for', 'Brands that want a single authority plan instead of unconnected link and PR activity.'],
      ['Covers', 'Backlink strategy, competitor gap analysis, brand mentions and unlinked mention recovery, citations, digital PR.'],
      ['Strategy layer', 'Decides which signals matter in your niche, then directs link building and PR to the same targets.'],
      ['Monitoring', 'Ongoing tracking of referring domains, mentions and authority signals.'],
      ['Not the same as', 'A set of one-off links. Off-page SEO is the plan above individual placements.'],
      ['Related service', 'Link building delivers the individual placements.']
    ],
    sections: [
      { h: 'What off-page SEO means', p: [
        'Off-page SEO covers signals that originate away from your site. The most familiar is the backlink, but brand mentions in articles, listings in relevant directories, citations, reviews and press coverage also shape how a brand is recognised.',
        'Search engines use these signals to assess whether a site is credible and relevant to a topic. AI answer systems also draw on pages that mention and describe a brand, so off-page work supports visibility there too.' ] },
      { h: 'Off-page SEO strategy: where the effort goes', p: [
        'A strategy starts with a competitor backlink gap analysis: which referring domains and link types do the sites outranking you have that you do not. From that, we pick the signals worth building first.',
        'The plan then coordinates link building, citations and digital PR so they point at the same target pages and topics, rather than each channel working in isolation.' ] },
      { h: 'Brand mentions and unlinked mentions', p: [
        'A brand mention is any reference to your company on another site. An unlinked mention is one that does not link back. Recovering those by asking the publisher to add a link is among the easiest links to earn, because the publisher already knows and cites you.' ] },
      { h: 'Citations and when they matter', p: [
        'Citations list your business name, address and phone number on directories and platforms. They matter most for location-based businesses. For online-only businesses, relevant industry directories and profiles are still useful as part of a consistent brand presence, but they are not the main lever.' ] }
    ],
    moreFaqs: [
      { q: 'What is an off-page SEO strategy?', a: 'It is a plan for building authority signals outside your site, based on what the top-ranking competitors have and what your niche rewards. It sets priorities across links, mentions, citations and PR.' },
      { q: 'What are brand mentions in SEO?', a: 'They are references to your brand name on other sites, with or without a link. Search engines and AI systems can use them as context about your brand and its topics.' },
      { q: 'How is off-page SEO different from link building?', a: 'Link building is the activity of earning individual links. Off-page SEO is the wider strategy that decides which links, mentions and citations are worth earning and coordinates them.' },
      { q: 'How long does off-page SEO take to show results?', a: 'Authority builds gradually. Google has to find and process new links and mentions, and the effect accumulates across a sustained campaign. Expect movement over months, not days.' },
      { q: 'Are social signals part of off-page SEO?', a: 'Social profiles help with brand recognition and can drive visits and mentions. Google has said that social shares are not a direct ranking factor, so treat social as visibility and discovery support.' },
      { q: 'Can off-page SEO hurt my site?', a: 'Poor tactics can, such as paid link schemes or networks built to pass ranking signals. A manual, editorial approach avoids that risk.' }
    ],
    related: [
      ['Link building service', '/services/link-building'],
      ['Backlinks report guide', '/blog/backlinks-report'],
      ['Do backlinks matter for AI search?', '/blog/do-backlinks-matter-for-ai-search-2026'],
      ['Find competitor backlinks', '/blog/how-to-find-competitor-backlinks-2026'],
      ['How many backlinks do you need?', '/blog/how-many-backlinks-do-i-need']
    ]
  },

  'white-label-seo': {
    metaTitle: 'White Label SEO Services for Agencies | Contomatix',
    metaDescription: 'White label SEO for agencies: audits, link building, content and reporting under your brand. No co-branding, no client contact, flexible retainers.',
    answer: 'White label SEO is SEO work delivered by a partner and sold under your agency\'s name. Contomatix acts as your behind-the-scenes SEO team: we run audits, on-page fixes, content and link building and send reports with your branding. We never contact your clients or appear in deliverables.',
    facts: [
      ['Best for', 'Agencies, freelancers and consultancies that sell SEO but do not want to hire an in-house team.'],
      ['What you keep', 'The client relationship, the branding and the margin.'],
      ['What we deliver', 'Technical audits, on-page fixes, content and link building, plus branded reports.'],
      ['Branding', 'Your logo and agency name; no Contomatix branding in any deliverable.'],
      ['Client contact', 'None. All communication stays with you.'],
      ['Pricing', 'Flexible retainer or per-project, built around your resale margin.']
    ],
    sections: [
      { h: 'What white label SEO services are', p: [
        'White label means the work is produced by one company and sold by another under its own name. In SEO, an agency that does not want to build an in-house team can resell audits, link building, content and reporting that a specialist partner delivers.',
        'The reseller owns the relationship and the pricing. The partner owns the execution quality, the timelines and the consistency of the work.' ] },
      { h: 'White label link building and white label SEO reports', p: [
        'The two most requested white label deliverables are link building and reporting. White label link building means the placements are made by us and presented to your client as your work, with the site list and metrics available to you. White label SEO reports use your logo and agency name, so your client sees one consistent brand.' ] },
      { h: 'How the partnership works day to day', p: [
        'You brief us on a client, we run the audit and set a strategy, we execute, and you receive the reporting to forward. You can start with a single client or overflow work and scale as your roster grows.',
        'If a deliverable needs a conversation, it happens between you and us. Your clients never see Contomatix.' ] },
      { h: 'Who white label SEO is not for', p: [
        'It is not a fit if you want a partner who talks to your client directly, or if you only need a one-off list of links with no strategy. It works best for agencies that want a dependable delivery team behind a consistent standard of work.' ] }
    ],
    moreFaqs: [
      { q: 'What is a white label SEO reseller?', a: 'A white label SEO reseller is an agency or consultant that sells SEO services produced by a third party under its own brand, keeping the client relationship and the margin.' },
      { q: 'What are white label SEO reports?', a: 'They are SEO reports prepared by a partner but presented with the reseller\'s logo and name, so the client sees a single brand.' },
      { q: 'Is white label link building safe?', a: 'It is as safe as the method behind it. Placements that are earned manually on relevant, vetted sites are consistent with Google\'s guidance. Link networks or paid link schemes carry risk regardless of who sells them.' },
      { q: 'Can I try white label SEO on one client first?', a: 'Yes. Many agencies start with a single client or a piece of overflow work before moving more of their roster across.' },
      { q: 'Do you work with freelancers and consultants?', a: 'Yes. The arrangement suits any seller of SEO that wants dependable delivery without hiring.' },
      { q: 'Who is responsible if a campaign underperforms?', a: 'We report openly, explain what moved and what did not and propose the next steps. SEO results depend on many factors, so no partner can promise a ranking outcome.' }
    ],
    related: [
      ['White label SEO guide', '/blog/white-label-seo'],
      ['SEO proposal generator', '/tools/seo-proposal-generator'],
      ['SEO audit report template', '/blog/seo-audit-report-template'],
      ['Link building service', '/services/link-building'],
      ['Technical SEO service', '/services/technical-seo']
    ]
  },

  'keyword-research': {
    metaTitle: 'SEO Keyword Research Service: Mapped to Pages | Contomatix',
    metaDescription: 'SEO keyword research service: search intent, competitor keyword gaps and a prioritised roadmap, with every keyword mapped to a page and a reason.',
    answer: 'Keyword research is finding the words and questions your customers use to search, and deciding which ones to target. Contomatix classifies search intent, finds competitor keyword gaps, checks for cannibalisation and delivers a prioritised roadmap where every keyword is mapped to a specific page and reason.',
    facts: [
      ['Best for', 'Teams planning a content calendar, a site structure or a link-target list.'],
      ['Includes', 'Intent classification, competitor keyword gap research, cannibalisation check, prioritised roadmap.'],
      ['Output', 'A keyword-to-page map with a reason for each priority, ready for a content calendar.'],
      ['Intent types', 'Informational, commercial and transactional.'],
      ['Also covers', 'Questions people ask AI assistants, alongside classic search terms.'],
      ['Delivery', 'One-time roadmap or ongoing tracking and refinement.']
    ],
    sections: [
      { h: 'What an SEO keyword research service delivers', p: [
        'The output is a plan, not a list. Each keyword is assigned to a page, tagged with its intent and given a reason for its priority. That makes it directly usable in a content calendar, a site structure or a link-building target list.',
        'A raw export of volumes tells you what exists. A research service decides what you should actually target, given your site\'s authority, competitors and goals.' ] },
      { h: 'Search intent: the filter that matters most', p: [
        'The same words can imply different needs. Informational searches want an explanation, commercial searches compare options and transactional searches are ready to act. A page that does not match the intent of the keyword rarely ranks, however well it is optimised.',
        'We classify intent by looking at the results already shown for the term, then choose the page type that fits.' ] },
      { h: 'Competitor keyword gap and long-tail terms', p: [
        'A gap analysis lists terms that competitors rank for and you do not. Long-tail terms, which are longer and more specific phrases, usually have lower volume but clearer intent and less competition, so they are often the fastest wins for a growing site.' ] },
      { h: 'Cannibalisation and keyword mapping', p: [
        'Keyword cannibalisation happens when several of your pages target the same term and compete. We check existing pages before adding targets, then map one primary term to one page, with related terms as supporting sections.' ] }
    ],
    moreFaqs: [
      { q: 'What is keyword mapping?', a: 'Keyword mapping assigns each target keyword to a specific page, so every page has one clear topic and no two pages compete for the same term.' },
      { q: 'What is a long-tail keyword?', a: 'It is a longer, more specific search phrase. Long-tail terms usually have lower search volume, but they show clearer intent and are easier to rank for.' },
      { q: 'How do you judge keyword difficulty?', a: 'Difficulty scores from tools are a starting point. We also look at who ranks, their authority and whether the results match the intent, because a low score does not always mean the term is easy.' },
      { q: 'Do you include keyword volume data?', a: 'Yes, as an estimate. Volumes from tools are modelled, so we use them to compare terms, not as exact forecasts.' },
      { q: 'How many keywords will I receive?', a: 'It depends on the site\'s size and goals. We aim for a roadmap you can act on, not the largest possible list.' },
      { q: 'Can keyword research be done for a new site?', a: 'Yes, and it is a good time to do it. It shapes the site structure and the first pages before anything is built.' }
    ],
    related: [
      ['Keyword research tools', '/blog/keyword-research-tools'],
      ['Keyword mapping tool', '/tools/keyword-mapping-tool'],
      ['On-page SEO service', '/services/on-page-seo'],
      ['AI SEO service', '/services/ai-seo'],
      ['Content audit guide', '/blog/content-audit-seo']
    ]
  },

  'ai-seo': {
    metaTitle: 'AI SEO Services: Get Cited in ChatGPT & AI | Contomatix',
    metaDescription: 'AI SEO services to make your brand visible and citable in ChatGPT, Gemini, Perplexity and Google AI Overviews: audit, structure and mentions.',
    answer: 'AI SEO is optimising your content and brand so AI search systems, such as ChatGPT, Gemini, Perplexity and Google AI Overviews, can find, understand and cite you. Contomatix audits where you appear, restructures content for direct-answer extraction and builds the mentions these systems draw on.',
    facts: [
      ['Best for', 'Brands that want to appear in AI-generated answers as well as classic search results.'],
      ['Platforms', 'ChatGPT, Gemini, Perplexity and Google AI Overviews.'],
      ['Includes', 'AI visibility audit, content restructuring, brand mention and citation building, schema where useful, monthly re-checks.'],
      ['Related terms', 'Answer engine optimisation (AEO), generative engine optimisation (GEO), LLM SEO.'],
      ['Does not promise', 'A guaranteed citation. These systems are probabilistic and change often.'],
      ['Measured', 'Alongside classic rankings, not instead of them.']
    ],
    sections: [
      { h: 'What AI SEO is', p: [
        'AI SEO is the practice of making a brand and its content easy for AI systems to retrieve, understand and quote. These systems answer questions by combining a model with sources they find, so the pages and mentions they can find about you determine how you appear.',
        'It builds on classic SEO. Content that is clear, factual and well structured tends to perform in both traditional results and generated answers.' ] },
      { h: 'AEO, GEO and LLM SEO: the terms explained', p: [
        'Answer engine optimisation focuses on being the direct answer to a question. Generative engine optimisation focuses on being cited inside a generated response. LLM SEO is a common name for optimising for large language model assistants. In practice the work overlaps: clear answers, structured pages, trusted mentions and measurable visibility.' ] },
      { h: 'How content is structured for extraction', p: [
        'Pages are organised around the questions people ask, with the direct answer placed first, followed by supporting detail. Headings state the question or topic, lists and tables hold comparisons and FAQs answer follow-ups in plain language.',
        'This helps both people and machines. A passage that stands on its own, with the entity named and a clear claim, is easier to lift into an answer.' ] },
      { h: 'Brand mentions and citation signals', p: [
        'AI systems weigh how and where a brand is described across the web. Consistent, accurate descriptions on relevant and trusted sources help models associate your brand with its topics. We build mentions and citations on sources these systems actually draw from.' ] }
    ],
    moreFaqs: [
      { q: 'What is generative engine optimisation (GEO)?', a: 'GEO is optimising content so it is included and cited in answers generated by AI systems. It overlaps with AEO and with classic SEO, and relies on clear, well-sourced content and a trusted brand presence.' },
      { q: 'What is LLM SEO?', a: 'It is optimising your content and brand for large language model assistants, so that they can retrieve, understand and mention you when users ask related questions.' },
      { q: 'How do I check if ChatGPT mentions my brand?', a: 'Ask the assistant the questions your customers ask, in several wordings, and record whether your brand appears and how it is described. Repeat on a schedule because answers vary.' },
      { q: 'Does schema markup help AI search?', a: 'Structured data can help machines parse a page, so it is useful where it describes visible content. It is not a guarantee of citation.' },
      { q: 'Does AI SEO replace link building?', a: 'No. Links and mentions remain part of how a brand is recognised. AI SEO adds content structure and visibility measurement on top.' },
      { q: 'How often should AI visibility be re-checked?', a: 'Monthly is a sensible cadence, because AI answers change as models and sources change. Compare against the previous month and note shifts.' }
    ],
    related: [
      ['What is LLM SEO?', '/blog/what-is-llm-seo-2026'],
      ['Answer engine optimization guide', '/blog/answer-engine-optimization-aeo-guide-2026'],
      ['What is AI visibility?', '/blog/what-is-ai-visibility-2026'],
      ['How to get cited by ChatGPT', '/blog/how-to-get-cited-by-chatgpt-2026'],
      ['Do backlinks matter for AI search?', '/blog/do-backlinks-matter-for-ai-search-2026'],
      ['LLM SEO checker tool', '/tools/llm-seo-checker']
    ]
  },

  'technical-seo': {
    metaTitle: 'Technical SEO Services: Audit, Crawl, Indexing | Contomatix',
    metaDescription: 'Technical SEO services: full crawl and indexation audit, Core Web Vitals, schema, redirects and site architecture, prioritised and fixed or handed over.',
    answer: 'Technical SEO is making sure search engines can crawl, render and index your site efficiently. Contomatix runs a full-site audit covering crawl paths, indexation gaps, Core Web Vitals, schema, redirects, canonicals and architecture, prioritises the issues and then fixes them or hands over a clear list.',
    facts: [
      ['Best for', 'New engagements, migrations, large sites and any site with indexing or speed problems.'],
      ['Audit covers', 'Crawl and indexation, Core Web Vitals, schema, canonicals, redirects, internal architecture.'],
      ['Larger sites', 'Log file analysis to see how search engines actually crawl.'],
      ['Output', 'A prioritised issue list, then fixes shipped and a clean re-crawl.'],
      ['Different from', 'On-page SEO, which concerns page content and HTML elements.'],
      ['Start point', 'A full-site crawl.']
    ],
    sections: [
      { h: 'What technical SEO covers', p: [
        'Technical SEO is the layer that decides whether search engines can reach, render and understand your pages. It includes crawl access, indexing signals, site speed and user experience metrics, structured data and the way URLs and internal links are organised.',
        'Content and links cannot compensate for pages that search engines cannot crawl or index properly, which is why technical work usually comes first on a new engagement.' ] },
      { h: 'The technical SEO audit: what we check', p: [
        'A technical SEO audit starts with a crawl of the site and a review of Search Console. We look at which pages are indexed and which are excluded and why, how robots.txt and noindex rules are applied, how canonical tags and redirects behave and how the internal link structure distributes importance.',
        'We then check structured data for errors and measure Core Web Vitals so that speed and stability problems are tied to specific templates.' ] },
      { h: 'Crawl budget, indexation and log files', p: [
        'Crawl budget matters mainly for large sites, where search engines may not crawl every URL as often as you would like. Wasteful URLs, such as faceted filters and duplicates, use crawl capacity. Log file analysis shows which URLs search engines actually request, so decisions rest on evidence.' ] },
      { h: 'Fix, validate, re-crawl', p: [
        'The audit ends with a prioritised list: fixes that affect indexing first, then performance and then polish. After the fixes ship, a clean re-crawl confirms that the issues are gone and that nothing else broke.' ] }
    ],
    moreFaqs: [
      { q: 'What is crawl budget?', a: 'It is the number of URLs a search engine is willing and able to crawl on your site in a given period. It matters mostly for large sites with many URLs.' },
      { q: 'What are Core Web Vitals?', a: 'They are Google\'s page experience metrics for loading, interactivity and visual stability: Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift.' },
      { q: 'What is the difference between noindex and robots.txt?', a: 'Robots.txt controls whether a crawler may fetch a URL. A noindex rule tells search engines not to include a crawlable page in results. A blocked URL can still appear if other pages link to it.' },
      { q: 'What does a canonical tag do?', a: 'It tells search engines which URL is the preferred version when several URLs show the same or very similar content. Google treats it as a strong hint, not a command.' },
      { q: 'How often should a site have a technical audit?', a: 'Once a year at minimum, and after any migration, redesign or platform change. Large or frequently changing sites benefit from ongoing monitoring.' },
      { q: 'Can technical SEO fix a ranking drop?', a: 'If the drop was caused by crawling, indexing or speed problems, yes. If it came from content quality or competition, technical fixes alone will not recover it.' }
    ],
    related: [
      ['Free technical SEO audit tool', '/tools/technical-seo-audit-tool'],
      ['Robots.txt tester', '/tools/robots-txt-tester'],
      ['Robots.txt file guide', '/blog/robots-txt-file'],
      ['Is a sitemap important?', '/blog/is-sitemap-important-for-seo-2026'],
      ['Canonical and hreflang', '/blog/canonical-hreflang'],
      ['Sitemap priority', '/blog/sitemap-priority']
    ]
  }
};
