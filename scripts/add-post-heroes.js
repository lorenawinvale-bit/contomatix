// Replaces the old numbered-list hero diagram of older posts with a new concept diagram (new logo top-left, no note strip).
// Rule (user, 6 Nov 2026): every blog gets its own hero style and its content images use other layouts than its hero. Facts come only from the post itself.
// usage: node scripts/add-post-heroes.js [slug ...]
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..'); process.chdir(root);
const D0 = require('./diagram-lib2.js');
const D = Object.fromEntries(Object.entries(D0).map(([k, fn]) => [k, typeof fn === 'function' && !['logoSvg', 'proofHtml', 'hero'].includes(k) ? (o => { const c = Object.assign({}, o); delete c.note; return fn(c); }) : fn]));
const TEAL = '#0EA5A0', AMBER = '#F5A623';
const W = 760; // the hero sits in a 440 px column next to the title, so it is drawn at 760 px wide
const HEROES = {
  'content-brief-template': D.stats({ w: W, cols: 2, title: 'What a content brief fixes first', items: [
    { big: '12', t: 'fields in our content brief template' }, { big: '1', t: 'primary keyword per page', color: AMBER },
    { big: '6-10', t: 'related keywords mapped to headings' }, { big: '0', t: 'drafts started before sources are listed', color: AMBER }] }),
  'backlinks-exchange': D.cards({ w: W, title: 'Three shapes of a link exchange', qLabel: 'Looks like', items: [
    { big: 'Reciprocal', t: 'A links to B, B links to A', d: 'The plain swap', q: 'A trade' }, { big: 'Three-way', t: 'A to B, B to C, C to A', d: 'Hides the swap', q: 'Still a trade' }, { big: 'Credits', t: 'A platform counts links given and received', d: 'Swaps at scale', q: 'Automated' }] }),
  'pbn-backlinks': D.rings({ w: W, title: 'What 7 ranking PBN pages say', items: [
    { pct: 4 / 7, big: '4 of 7', t: 'lean on DA or DR to describe quality', c: 'Third-party scores', color: AMBER },
    { pct: 6 / 7, big: '6 of 7', t: 'discuss footprints', c: 'Hosting, content, history', color: TEAL }] }),
  'link-acquisition': D.timeline({ w: W, title: 'Three ways a link is acquired', items: [
    { d: 'Placed', t: 'You add it yourself', c: 'Fast, cheap, lowest weight' }, { d: 'Earned', t: 'Someone chose to cite you', c: 'Slow, most valuable' }, { d: 'Paid', t: 'Money changes hands', c: 'Mark it sponsored or nofollow' }] }),
  'how-is-ranking-different-ppc-vs-seo-2026': D.stats({ w: W, cols: 2, title: 'PPC and SEO ranking, side by side', items: [
    { big: 'Minutes', t: 'for PPC to take the top of the page' }, { big: 'Months', t: 'typical for SEO to earn a position', color: AMBER },
    { big: 'Auction', t: 'decides PPC position every search' }, { big: 'Algorithm', t: 'weighs your site against all others', color: AMBER }] }),
  'topical-map-seo': D.flow({ w: W, title: 'A topical map in three moves', steps: [
    { t: 'Core topic', s: 'What you want to be known for', c: 'One pillar' }, { t: 'Subtopics', s: 'Questions, tools, comparisons', c: 'Grouped into clusters' }, { t: 'Pages and links', s: 'Pillar to cluster and back', c: 'One keyword per page' }] }),
  'content-gap-analysis': D.columns({ w: W, title: 'Our own gap check, 28 October 2026', max: 998, items: [
    { t: 'Top queries', v: 998, text: '998', color: TEAL }, { t: 'No matching page', v: 555, text: '555', color: AMBER }] }),
  'check-backlinks-of-website': D.stats({ w: W, cols: 2, title: 'Four free ways to check backlinks', items: [
    { big: '1', t: 'Search Console Links report: free, from Google' }, { big: '2', t: 'Open the linking page and read the link', color: AMBER },
    { big: '3', t: 'Search your brand and domain for mentions' }, { big: '4', t: 'Use a backlink checker for a wider index', color: AMBER }] }),
  'how-many-backlinks-do-i-need': D.columns({ w: W, title: 'Our own backlinks, 6 November 2026', max: 40, items: [
    { t: 'External links', v: 38, text: '38', color: AMBER }, { t: 'Linking sites', v: 13, text: '13', color: TEAL }, { t: 'Links from two sites', v: 21, text: '21', color: AMBER }] }),
  'robots-txt-file': D.timeline({ w: W, title: 'The four lines that do all the work', items: [
    { d: 'Line 1', t: 'User-agent', c: 'Which crawler the rules apply to' }, { d: 'Line 2', t: 'Disallow', c: 'A path the crawler should not request' },
    { d: 'Line 3', t: 'Allow', c: 'An exception carved out of a Disallow' }, { d: 'Line 4', t: 'Sitemap', c: 'The full URL of your sitemap' }] }),
  'ai-powered-seo-tools': D.split({ w: W, h: 520, title: 'AI SEO tools: one label, five jobs', big: '5', bigLabel: 'different jobs share the "AI-powered" label', items: [
    { v: 'Clustering', t: 'Groups keywords by meaning' }, { v: 'Briefs', t: 'Summarizes what already ranks' }, { v: 'Audits', t: 'Triage across large crawls' }, { v: 'Linking', t: 'Suggests pages to link' }, { v: 'Visibility', t: 'Tracks AI mentions and citations' }] }),
  'how-duckduckgo-ai-search-works-2026': D.timeline({ w: W, title: 'DuckDuckGo AI: two products, one name', items: [
    { d: 'Product 1', t: 'Search Assist', c: 'An AI answer in the results, via DuckAssistBot' }, { d: 'Product 2', t: 'Duck.ai', c: 'A private chat that routes to third-party models' },
    { d: 'Not a product', t: 'Bing', c: 'Supplies most of the organic results' }] }),
    'hreflang-spanish': D.cards({ w: W, title: 'Spanish hreflang: use these, not es-419', qLabel: 'Targets', items: [
    { big: 'es', t: 'Catch-all', d: 'Language only', q: 'Any Spanish speaker' }, { big: 'es-MX', t: 'Country code', d: 'Language, then country', q: 'Mexico' }, { big: 'es-ES', t: 'Country code', d: 'Language, then country', q: 'Spain' }] }),
  'blocked-by-robots-txt': D.flow({ w: W, title: 'Fixing "blocked by robots.txt"', steps: [
    { t: 'Find the rule', s: 'Test the URL', c: 'Which Disallow line matches?' }, { t: 'Decide', s: 'Should it be in search?', c: 'Some blocks are intentional' }, { t: 'Fix and validate', s: 'Then recrawl', c: 'To remove a page, noindex it first' }] }),
  'image-sitemap': D.rings({ w: W, title: 'Our own image sitemap numbers', items: [
    { pct: 2 / 6, big: '2 of 6', t: 'image tags Google still reads', c: '4 tags were removed', color: TEAL },
    { pct: 13 / 1000, big: '13', t: 'images on our busiest page, limit 1,000', c: 'Per page URL', color: AMBER },
    { pct: 0, big: '0 of 1,220', t: 'image references were in a sitemap', c: 'Across 299 posts', color: AMBER }] }),
  'ai-seo-agents': D.cards({ w: W, title: 'Three jobs AI SEO agents get', qLabel: 'The rule', items: [
    { big: 'Audit', t: 'Rule-based checks', d: 'Crawl against a rule set', q: 'Safe to run alone' }, { big: 'Draft', t: 'Content drafting', d: 'Full pages from a brief', q: 'A human reviews' }, { big: 'Pitch', t: 'Outreach', d: 'Targets and pitch emails', q: 'Never unsupervised' }] }),
  'innovative-marketing-campaigns-2026': D.stats({ w: W, cols: 2, title: 'B2C and B2B innovation differ', items: [
    { big: 'B2C', t: 'Built to spread through millions of feeds in a week' }, { big: 'B2B', t: 'Built to survive a buying committee and a long sales cycle', color: AMBER }] }),
    'why-is-duplicate-content-an-issue-for-seo-2026': D.compare({ w: W, title: 'Duplicate content: myth and reality', left: { h: 'The myth', items: ['A separate penalty exists', 'Copies are punished', 'Google said no in 2008'] }, right: { h: 'What happens', items: ['One version is picked to show', 'Signals split across copies', 'AI may credit one source'] } }),
  'what-is-llm-seo-2026': D.split({ w: W, h: 520, title: 'LLM SEO: a citations game', big: '4', bigLabel: 'pillars of LLM visibility', items: [
    { v: 'Extractability', t: 'A model can lift a clean answer' }, { v: 'Authority', t: 'Consistent facts across sources' }, { v: 'Freshness', t: 'Current, and says so' }, { v: 'Clarity', t: 'Headings, lists, Q&A' }] }),
  'how-to-get-cited-by-chatgpt-2026': D.split({ w: W, h: 520, title: 'What gets a page cited by ChatGPT', big: '5', bigLabel: 'tactics that earn a citation', items: [
    { v: 'Answer', t: 'A 40 to 60 word answer first' }, { v: 'Sections', t: 'One sub-question each' }, { v: 'Data', t: 'Recent and attributed' }, { v: 'Authority', t: 'Signals beyond your site' }, { v: 'Crawlers', t: 'Do not block OAI-SearchBot' }] }),
  // ---- 7 Nov 2026 batch ----
  'ai-tools-for-seo-keyword-research': D.split({ w: W, h: 480, title: 'AI keyword research: ideas, not numbers', big: '21', bigLabel: 'real keywords guessed blind by an AI assistant', items: [
    { v: 'Brainstorm', t: 'AI does steps one and three' }, { v: 'Numbers', t: 'Data does step two' }, { v: 'Mapping', t: 'A mapping step keeps the list tidy' }] }),
  'seo-audit-report-template': D.stats({ w: W, cols: 2, title: 'Our own audit sample in numbers', items: [
    { big: '419', t: 'URLs crawled, every one returned 200' }, { big: '337', t: 'of them listed in the sitemap', color: AMBER }, { big: '7', t: 'things every audit report needs' }, { big: '2', t: 'false positives we caught by hand', color: AMBER }] }),
  'enterprise-seo-audit': D.columns({ w: W, title: 'Our 419-URL test crawl, grouped', max: 300, items: [
    { t: 'Blog posts', v: 296, text: '296', color: TEAL }, { t: 'Thin pages', v: 89, text: '89', color: AMBER }, { t: 'Posts without FAQ data', v: 25, text: '25', color: AMBER }] }),
  'wix-seo-specialist': D.flow({ w: W, title: 'Before you hire a Wix SEO specialist', steps: [
    { t: 'Ask for examples', s: 'Past work and a past client', c: 'Ideally including Wix sites' }, { t: 'Ask about the rules', s: 'Google Search Essentials', c: 'What it means for their tactics' }, { t: 'Check the quote', s: 'What Wix already does', c: 'Why are you paying for it?' }] }),
  'sitemap-priority': D.cards({ w: W, title: 'Sitemap tags: what Google uses', qLabel: 'Google', items: [
    { big: 'priority', t: 'Optional, 0.0 to 1.0', d: 'Default is 0.5', q: 'Ignored' }, { big: 'changefreq', t: 'Optional hint', d: 'How often a page changes', q: 'Ignored' }, { big: 'lastmod', t: 'Optional date', d: 'When the page last changed', q: 'Used only if accurate' }] }),
  'maritime-digital-marketing': D.timeline({ w: W, title: 'Five areas of maritime digital marketing', items: [
    { d: 'Area 1', t: 'SEO for maritime and shipping', c: 'Specific technical and commercial searches' }, { d: 'Area 2', t: 'A B2B website built for long cycles', c: 'Answers procurement questions' },
    { d: 'Area 3', t: 'Content and thought leadership', c: 'Explainers that large competitors skip' }, { d: 'Area 4', t: 'LinkedIn and B2B social', c: 'Where the industry lives online' }, { d: 'Area 5', t: 'Trade directories and press', c: 'Links from maritime sources' }] }),
  'google-disavow-backlinks': D.flow({ w: W, title: 'Google\'s two-part disavow test', steps: [
    { t: 'Test 1', s: 'Many bad links', c: 'Spammy or low quality, and a considerable number' }, { t: 'Test 2', s: 'Real harm', c: 'A manual action, or likely to get one' }, { t: 'Not a test', s: 'Toxicity score', c: 'A tool score alone does not qualify' }] }),
  'link-building-agencies-dubai-2026': D.stats({ w: W, cols: 2, title: 'Link building in Dubai, in numbers', items: [
    { big: '3', t: 'agencies passed our verification' }, { big: '3', t: 'checks each one had to clear', color: AMBER }, { big: '11.3M', t: 'UAE internet users at the end of 2025' }, { big: '3-6', t: 'months for link building to compound, at minimum', color: AMBER }] }),
  'how-to-find-competitor-backlinks-2026': D.flow({ w: W, title: 'Finding competitor backlinks, in three moves', steps: [
    { t: 'Pick competitors', s: 'SERP and business', c: 'Three to five of each' }, { t: 'Find their links', s: 'A gap report or by hand', c: 'Paid tools or free search' }, { t: 'Filter, then pitch', s: 'Relevance first', c: 'Real outreach follows' }] }),
  'best-crm-automation-tools-2026': D.stats({ w: W, cols: 2, title: 'CRM and automation tools, compared', items: [
    { big: '8', t: 'tools compared on price and fit' }, { big: 'Sep 2026', t: 'prices read from each vendor\'s own page', color: AMBER }, { big: '20.0%', t: 'Salesforce share of the global CRM market (IDC)' }, { big: '1', t: 'tool on the list is not actually a CRM', color: AMBER }] }),
  // ---- 8 Nov 2026 batch ----
  'outsource-link-building': D.cards({ w: W, title: 'Three ways to pay for outsourced link building', qLabel: 'Watch for', items: [
    { big: 'Retainer', t: 'A team\'s time and process', d: 'Suits ongoing campaigns', q: 'Activity without outcomes' }, { big: 'Per link', t: 'A price for each placement', d: 'Looks transparent', q: 'It rewards volume' }, { big: 'Project', t: 'A fixed price for defined work', d: 'Suits one-off campaigns', q: 'Scope must be precise' }] }),
  'gravitywrite-alternatives-2026': D.stats({ w: W, cols: 2, title: 'Choosing a GravityWrite alternative', items: [
    { big: '250+', t: 'features promised across blogs, video and social' }, { big: '4', t: 'criteria used to compare the alternatives', color: AMBER }, { big: '3', t: 'needs: output quality, SEO depth, workflow' }, { big: '0', t: 'AI writing tools replace real expertise', color: AMBER }] }),
  'international-seo-audit': D.rings({ w: W, title: 'Our own international data', items: [
    { pct: 0.921, big: '92.1%', t: 'of impressions from the US and UK', c: 'The target markets', color: TEAL },
    { pct: 8 / 48, big: '8 of 48', t: 'clicks came from those two countries', c: 'Average positions 41.5 and 46.43', color: AMBER },
    { pct: 30 / 48, big: '30 of 48', t: 'clicks came from one country', c: 'With 0.5% of impressions', color: AMBER }] }),
  'white-label-seo': D.columns({ w: W, title: 'Markup is not margin', max: 200, items: [
    { t: 'Markup', v: 100, text: '100%', color: AMBER }, { t: 'Margin', v: 50, text: '50%', color: TEAL }, { t: 'Markup', v: 200, text: '200%', color: AMBER }, { t: 'Margin', v: 66.7, text: '67%', color: TEAL }] }),
  'free-seo-tools': D.timeline({ w: W, title: 'A four-week free SEO routine', items: [
    { d: 'Week 1', t: 'Measure', c: 'Export clicks, impressions, CTR and position' }, { d: 'Week 2', t: 'Audit', c: 'Check your five most important pages' },
    { d: 'Week 3', t: 'Fix structure', c: 'Validate sitemap, robots.txt and markup' }, { d: 'Week 4', t: 'Report', c: 'One-page summary and next priorities' }] }),
  'instagram-search-optimization-2026': D.timeline({ w: W, title: 'How Instagram Search ranks results', items: [
    { d: '1st signal', t: 'Text', c: 'Usernames, bios, captions, hashtags, places' }, { d: '2nd signal', t: 'Activity', c: 'Follows, views and past interactions' }, { d: '3rd signal', t: 'Popularity', c: 'Mostly breaks ties between matches' }] }),
  'meta-tags-best-practices': D.cards({ w: W, title: 'Three meta tags, three jobs', qLabel: 'Rule', items: [
    { big: 'description', t: 'A pitch for the click', d: 'Google may rewrite it', q: 'Not a ranking lever' }, { big: 'robots', t: 'Control over the page', d: 'noindex, nosnippet, max-snippet', q: 'Set it on purpose' }, { big: 'keywords', t: 'The tag Google ignores', d: 'No effect on ranking', q: 'Stop maintaining it' }] }),
  // ---- 9 Nov 2026 batch ----
  'how-to-index-backlinks': D.timeline({ w: W, title: 'A realistic backlink indexing timeline', items: [
    { d: 'Day 0', t: 'Record the link', c: 'Date, linking page, target and attribute' }, { d: 'Week 1', t: 'Search the exact URL', c: 'site: followed by the full address' },
    { d: 'Weeks 2 to 4', t: 'Check again', c: 'Search and the Links report in Search Console' }, { d: 'Month 1', t: 'Look for blockers', c: 'Then message the owner once' }] }),
  'offpage-seo': D.rings({ w: W, title: 'Our own off-page snapshot, 21 October 2026', items: [
    { pct: 2 / 24, big: '2 of 24', t: 'external links are editorial mentions', c: 'The rest are listings', color: TEAL },
    { pct: 8 / 14, big: '8 of 14', t: 'pages naming our brand do not link', c: 'Links to ask for', color: AMBER },
    { pct: 17 / 24, big: '17 of 24', t: 'links point at the home page', c: 'Inner pages get few', color: AMBER }] }),
  'link-building-statistics': D.stats({ w: W, cols: 2, title: 'Link building statistics, our own data', items: [
    { big: '24', t: 'external links from 10 sites, 21 October 2026' }, { big: '8%', t: 'of them editorial mentions inside articles', color: AMBER }, { big: '4.4%', t: 'of 205 resource-page links returned a 404' }, { big: '$100-$300', t: 'cost per link in published SaaS link building prices', color: AMBER }] }),
  'editorial-backlinks': D.cards({ w: W, title: 'Three kinds of link, by who decides', qLabel: 'Who pays', items: [
    { big: 'Editorial', t: 'The author decides', d: 'Chosen inside the article', q: 'Nobody pays' }, { big: 'Guest post', t: 'You write, the host publishes', d: 'A negotiated placement', q: 'You, in effort' }, { big: 'Sponsored', t: 'The link is bought', d: 'Qualify it as sponsored', q: 'The buyer' }] }),
  'white-label-link-building': D.flow({ w: W, title: 'How white label link building works', steps: [
    { t: 'The provider', s: 'Does the work', c: 'Targets, outreach and placements' }, { t: 'You', s: 'Keep the client', c: 'The invoice and the branding' }, { t: 'The report', s: 'Carries your logo', c: 'URLs, anchors, attributes and dates' }] }),
  'high-authority-backlinks': D.stats({ w: W, cols: 3, title: 'Authority metrics versus Google', items: [
    { big: '6 of 6', t: 'ranking pages use Domain Authority' }, { big: '0', t: 'DA or DR mentions in two Google guides', color: AMBER }, { big: '9+', t: 'out of 12: a strong link on our test' }] }),
  'monthly-seo-report': D.columns({ w: W, title: 'Our impressions by month, 2026', max: 60000, items: [
    { t: 'August', v: 16492, text: '16.5K', color: TEAL }, { t: 'September', v: 52053, text: '52.1K', color: AMBER }, { t: 'Oct, to the 27th', v: 59549, text: '59.5K', color: TEAL }] }),
  // ---- 10 Nov 2026 batch ----
  'b2b-seo-tools': D.stats({ w: W, cols: 2, title: 'What we found reading B2B SEO tool pages', items: [
    { big: '7', t: 'readable pages ranking on Google US for the term' }, { big: '7 of 7', t: 'promote AI features', color: AMBER }, { big: '3,028', t: 'median words on those pages' }, { big: '500', t: 'URLs, where a free crawler stops', color: AMBER }] }),
  '301-vs-302-redirect': D.columns({ w: W, title: 'First redirect from http to https, 178 sites', max: 160, items: [
    { t: '301', v: 160, text: '160', color: TEAL }, { t: '308', v: 16, text: '16', color: AMBER }, { t: '302', v: 2, text: '2', color: AMBER }] }),
  'robots-txt-sitemap': D.timeline({ w: W, title: 'Five rules for a Sitemap line in robots.txt', items: [
    { d: 'Rule 1', t: 'A fully qualified URL', c: 'Protocol and host included' }, { d: 'Rule 2', t: 'The path is case-sensitive', c: '/Sitemap.xml is not /sitemap.xml' },
    { d: 'Rule 3', t: 'It can live on another host', c: 'The declared URL must resolve' }, { d: 'Rule 4', t: 'Several lines are fine', c: 'No limit on Sitemap lines' }, { d: 'Rule 5', t: 'Not blocked by a Disallow', c: 'Crawlers must be able to fetch it' }] }),
  'yoast-seo-sitemap': D.rings({ w: W, title: '15 real Yoast sitemaps, scanned 17 October 2026', items: [
    { pct: 1, big: '15 of 15', t: 'carry a last-modified date', c: 'On every URL', color: TEAL },
    { pct: 0, big: '0 of 15', t: 'use the priority tag', c: 'Google ignores it', color: AMBER },
    { pct: 14 / 15, big: '14 of 15', t: 'include image entries', c: 'For each page', color: TEAL }] }),
  'meta-keywords': D.cards({ w: W, title: 'Three tags, and what Google does with them', qLabel: 'Google', items: [
    { big: 'Title', t: 'Names the page in results', d: 'Helps explain its topic', q: 'Used' }, { big: 'Description', t: 'Can be the summary', d: 'Shown under the title', q: 'Supported' }, { big: 'Keywords', t: 'Does nothing', d: 'No effect on ranking', q: 'Ignored' }] }),
  'what-is-a-google-penalty': D.flow({ w: W, title: 'Do you have a manual action?', steps: [
    { t: 'Open the report', s: 'Search Console', c: 'Security and Manual Actions' }, { t: 'Read the result', s: 'A green check mark', c: 'Means no manual action' }, { t: 'No action?', s: 'It is not a manual penalty', c: 'Check indexing and content' }] }),
  'meta-description-length': D.split({ w: W, h: 480, title: 'Our 363 meta descriptions, by length', big: '84%', bigLabel: 'are between 120 and 155 characters', items: [
    { v: '19', t: 'are under 120 characters' }, { v: '33', t: 'are 156 to 160 characters' }, { v: '6', t: 'are over 160 characters' }] }),
  // ---- 11 Nov 2026 batch ----
  'do-backlinks-matter-for-ai-search-2026': D.stats({ w: W, cols: 2, title: 'Backlinks and AI Overviews: the Ahrefs study', items: [
    { big: '75,000', t: 'brands analysed, study published May 2025' }, { big: '0.664', t: 'correlation for brand web mentions', color: AMBER }, { big: '0.218', t: 'correlation for backlinks' }, { big: '3x', t: 'stronger for mentions than for backlinks', color: AMBER }] }),
  'relevant-backlinks': D.rings({ w: W, title: 'Scoring relevance: our own links and the scorecard', items: [
    { pct: 12 / 13, big: '12 of 13', t: 'external links from topic-related sites', c: 'Our Links report, October', color: TEAL },
    { pct: 0.8, big: '8 of 10', t: 'is the score worth asking for', c: 'Five checks, 0 to 2 each', color: AMBER },
    { pct: 0.4, big: '4 or less', t: 'is probably not worth your time', c: 'Whatever its metrics say', color: AMBER }] }),
  'cross-channel-attribution': D.columns({ w: W, title: 'GA4 default lookback windows, in days', max: 90, items: [
    { t: 'Acquisition, shortest', v: 7, text: '7', color: AMBER }, { t: 'Acquisition, default', v: 30, text: '30', color: TEAL }, { t: 'Other events, shortest', v: 30, text: '30', color: AMBER }, { t: 'Other events, default', v: 90, text: '90', color: TEAL }] }),
  'set-up-google-search-console': D.timeline({ w: W, title: 'Your first week in Search Console', items: [
    { d: 'Day 1', t: 'Verify and submit', c: 'Backup method, sitemap, users' }, { d: 'Days 2 to 3', t: 'Check the Sitemaps report', c: 'Google read the file without errors' },
    { d: 'Days 4 to 7', t: 'Note your baseline', c: 'Indexed pages and top queries' }, { d: 'End of week', t: 'Inspect key pages', c: 'Then set a monthly reminder' }] }),
  '301-redirect-not-working': D.stats({ w: W, cols: 2, title: 'What we saw testing 185 sites', items: [
    { big: '185', t: 'sites tested on 27 October 2026' }, { big: '178', t: 'redirected on the first request', color: AMBER }, { big: '58', t: 'needed two or more hops to reach the page' }, { big: '5 of 9', t: 'top results are forum or Q&A threads', color: AMBER }] }),
  'tiered-link-building': D.cards({ w: W, title: 'The tier pyramid, layer by layer', qLabel: 'Points at', items: [
    { big: 'Tier 1', t: 'The links you care about', d: 'On pages that link to you', q: 'Your site' }, { big: 'Tier 2', t: 'Links built to tier 1', d: 'To strengthen those pages', q: 'Tier 1 pages' }, { big: 'Tier 3', t: 'Links built to tier 2', d: 'Another layer below', q: 'Tier 2 pages' }] }),
  'keyword-research-tools': D.split({ w: W, h: 500, title: 'A free keyword research stack, in order', big: '4', bigLabel: 'free sources do the heavy lifting', items: [
    { v: 'Own data', t: 'Search Console, positions 5 to 20' }, { v: 'Planner', t: 'Google demand data and ideas' }, { v: 'Bing', t: 'Question keywords' }, { v: 'Trends', t: 'Seasonality and direction' }] }),
  // ---- 12 Nov 2026 batch ----
  'seo-packages-for-small-business': D.stats({ w: W, cols: 2, title: 'What the first page quotes for SEO packages', items: [
    { big: '9', t: 'organic snippets read on 10 October 2026' }, { big: '5', t: 'of them stated a price', color: AMBER }, { big: '$150', t: 'the lowest figure quoted' }, { big: '$2,000', t: 'the top of the highest range', color: AMBER }] }),
  'canonical-hreflang': D.cards({ w: W, title: 'Canonical and hreflang do different jobs', qLabel: 'Result', items: [
    { big: 'Canonical', t: 'Which URL is the real version', d: 'A deduplication signal', q: 'Index this one' }, { big: 'Hreflang', t: 'Which version for which searcher', d: 'A targeting signal', q: 'Between different pages' }, { big: 'Conflict', t: 'Canonical points elsewhere', d: 'Hreflang goes to waste', q: 'The canonical wins' }] }),
  'how-to-create-a-sitemap': D.flow({ w: W, title: 'Creating a sitemap in three moves', steps: [
    { t: 'List the URLs', s: 'Canonical pages only', c: 'Ones that return a 200' }, { t: 'Build the file', s: 'Generator or by hand', c: 'Valid XML, absolute URLs' }, { t: 'Tell Google', s: 'robots.txt and Search Console', c: 'Then read the Sitemaps report' }] }),
  'linkable-assets': D.rings({ w: W, title: 'What earned our links, October 2026', items: [
    { pct: 17 / 24, big: '17 of 24', t: 'external links point at the home page', c: 'Mostly directories', color: AMBER },
    { pct: 6 / 24, big: '6 of 24', t: 'point at free tool pages', c: 'Across four tools', color: TEAL },
    { pct: 0, big: '0 of 331', t: 'posts had an external link', c: 'Posts earned nothing yet', color: AMBER }] }),
  'link-reclamation': D.columns({ w: W, title: 'Our brand scan, 21 October 2026', max: 14, items: [
    { t: 'Pages naming us', v: 14, text: '14', color: TEAL }, { t: 'Link to us', v: 6, text: '6', color: TEAL }, { t: 'Do not link', v: 8, text: '8', color: AMBER }, { t: 'Sites holding those 8', v: 2, text: '2', color: AMBER }] }),
  'automated-link-building-2026': D.timeline({ w: W, title: 'Which stages are safe to automate', items: [
    { d: 'Research', t: 'Safe to automate', c: 'Public data, found faster' }, { d: 'Outreach', t: 'Safe with guardrails', c: 'Relevant, personalised pitches' }, { d: 'Placement', t: 'Keep a human', c: 'This stage carries the risk' }] }),
  'saas-link-building-services': D.cards({ w: W, title: 'Three ways to buy SaaS link building', qLabel: 'Suits', items: [
    { big: 'Per link', t: 'A price for each placement', d: 'Control over every link', q: 'Pages you already know' }, { big: 'Retainer', t: 'A monthly plan with a link count', d: 'One point of contact', q: 'Steady output' }, { big: 'Project', t: 'A fixed price for new work', d: 'A study, tool or campaign', q: 'Something new to cite' }] })
};
(async () => {
  const fp = path.join(root, 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const only = process.argv.slice(2); const out = [];
  for (const [slug, svg] of Object.entries(HEROES)) {
    if (only.length && !only.includes(slug)) continue; const p = posts.find(x => x.slug === slug); if (!p || !p.heroDiagram) throw new Error('no hero path for ' + slug);
    if (/—/.test(svg)) throw new Error('em dash in hero ' + slug);
    fs.writeFileSync(path.join(root, 'public', p.heroDiagram.replace(/^\//, '')), svg);
    const vb = svg.match(/viewBox="[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)"/); out.push(`${slug}: ${vb ? vb[1] + 'x' + vb[2] : '?'}, ${Math.round(svg.length / 1024)} kB`);
  }
  console.log(out.join('\n'));
})();
