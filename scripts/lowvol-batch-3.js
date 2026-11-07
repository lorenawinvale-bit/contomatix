// Batch 3 (7 Nov 2026): low-volume keywords added to 10 older posts. Sources: Search Console page queries (90 days to 6 Nov 2026) and Ahrefs matching terms (US).
// Answers use only facts already in the post, Google pages read in November 2026, or our own data. No prices or new claims.
const { apply } = require('./lowvol-lib.js');
const S = 'Search Console page queries (90 days to 6 Nov 2026) and Ahrefs matching terms (US, KD 20-30 or lower)';
apply([
  {
    slug: 'ai-tools-for-seo-keyword-research', h2: 'Related Questions About AI Keyword Research', sources: S,
    keywords: ['ai keyword research tool', 'automated keyword research', 'ai keyword research', 'ai seo keyword research', 'ai for keyword research', 'ai seo keywords', 'keyword research for aeo'],
    items: [
      { h3: 'AI Keyword Research Tool: What It Can and Cannot Do', html: `A keyword database counts things: how often a phrase was searched, how hard the top results are to beat and which pages already rank. A language model predicts likely text from patterns, so it has no measurements. An AI keyword research tool is good at ideas and grouping, and it is not a source of search volume. Our test of 21 real keywords, guessed blind, is the evidence for that.` },
      { h3: 'Automated Keyword Research: What to Automate', html: `Automate the brainstorming and the grouping, not the numbers. In the five-step workflow above, AI does steps one and three, data does step two, and a mapping step keeps the result tidy. If you want to automate keyword research, sort the list with our free <a href="/tools/keyword-grouping-tool">keyword grouping tool</a> and take the volumes from a data source.` },
      { h3: 'AI Keyword Research vs Real Search Data', html: `Real numbers come from sources that record searches, such as your own Search Console data. A model's guess can be far off, and the worst misses in our test were newer phrases about AI search, where the guessed volume was well under the exported one. Use AI to widen the list and a data source to check each term before you build a page.` },
      { h3: 'AI for Keyword Research: Where It Helps', html: `It helps most at the start. Describe the business, the customer and the problem in two or three sentences, and ask for phrases a buyer might type, with specifics rather than a broad topic. Then check each one against data. This is the same order we follow when we build a keyword list ourselves.` },
      { h3: 'AI SEO Keywords: Why Newer Phrasing Gets Undercounted', html: `Two patterns showed up in our misses. Newer phrasing was undercounted, and the three biggest underestimates were all about AI search. A model learns from past text, so phrases people only started using recently are the ones it is least likely to size correctly. For AI SEO keywords in particular, treat any guessed number as a placeholder.` },
      { h3: 'Keyword Research for AEO: Which Tools to Use', html: `Start with the queries your own pages already appear for in Search Console, then add a keyword platform for terms you do not rank for yet, and use an AI assistant only for ideas and for sorting. Answer-engine questions are often long and conversational, so group close phrasings onto one page instead of publishing each one separately.` }
    ]
  },
  {
    slug: 'seo-audit-report-template', h2: 'Related Questions About SEO Audit Reports', sources: S,
    keywords: ['seo audit report sample', 'sample seo audit report', 'seo audit template', 'seo audit example', 'sample seo analysis report', 'seo audit sample reports'],
    items: [
      { h3: 'SEO Audit Report Sample: Our Own Crawl', html: `The sample above comes from our own site: a crawl of 419 URLs, every one of which returned a 200 status, with 337 of them listed in the sitemap. We judged each finding by impact first and effort second, and we show the findings table as it came out, including what passed.` },
      { h3: 'Sample SEO Audit Report: The One-Page Scorecard', html: `The scorecard is the page a busy reader will actually look at. Ours covers crawlability, indexing and the other checks we ran, with a pass or warning for each and a plain-language reason, such as all 419 URLs returning 200 and robots.txt allowing crawling except for the admin area. Only include checks you really ran.` },
      { h3: 'SEO Audit Template: Keep the Finding Table Strict', html: `Copy the skeleton into a document or spreadsheet, and keep the finding table strict, because it is what turns observations into work. Each row should name the issue, the URLs affected, the evidence, the fix and the priority. "Titles are too long" is not a finding, while a count of affected tool pages with their lengths is.` },
      { h3: 'SEO Audit Example: What Passed', html: `A good example report lists what passed as well as what failed, because a list of only problems makes a site look worse than it is and invites people to re-check things that were fine. Ours recorded these as passes: a 200 status on every URL, no image missing alt text or width and height attributes among 2,841, no mixed content, and article and breadcrumb structured data on all 296 posts.` },
      { h3: 'Sample SEO Analysis Report: Two False Positives We Caught', html: `Our crawler raised two findings that did not survive a second look. One was a "two H1 headings" flag on a tool page, caused by the text of an H1 tag inside an example snippet that a raw-HTML scan counted. Writing false positives down is part of a trustworthy sample, and it is why every finding needs evidence you can check by hand.` }
    ]
  },
  {
    slug: 'enterprise-seo-audit', h2: 'Related Questions About Enterprise SEO Audits', sources: S,
    keywords: ['enterprise seo audit', 'enterprise website seo audit report', 'how to do an enterprise seo audit', 'segment seo', 'enterprise seo audits'],
    items: [
      { h3: 'What Is an Enterprise SEO Audit?', html: `There is no official size at which a site becomes an enterprise. Agencies use the word for sites with thousands or millions of URLs, many contributors and several teams that each own part of the site. What makes an audit an enterprise audit is the situation, not only the size: findings have to be grouped and routed to the team that can fix them.` },
      { h3: 'Enterprise Website SEO Audit Report: Group by Template', html: `A report for a large site should group URLs by the template that produced them, not list totals. When we grouped our own 419 URLs by template, our 296 blog posts were clean on the checks that mattered, and the 89 thin pages sat almost entirely outside the blog. The totals alone would have hidden that.` },
      { h3: 'How to Do an Enterprise SEO Audit in Seven Steps', html: `Start by agreeing the scope and the owners: which teams control templates, content, redirects and infrastructure, and who receives each type of finding. Then crawl, group the URLs by template, read each group on its own, and turn shared causes into single tickets. The full seven steps are listed in the method section above.` },
      { h3: 'Segment SEO: Why Groups Beat Raw Counts', html: `Segment SEO simply means reading an audit by segment, such as template, section or publish date. Our group view caught something a URL-by-URL list could not: 25 of 296 blog posts had no FAQ structured data, and 24 of those 25 were published on consecutive days from 1 to 8 October, which pointed to one cause, a markup difference, rather than 25 separate faults.` },
      { h3: 'Enterprise SEO Audits: Plan the Data and Tools', html: `Plan for a crawler that can export one row per URL, Search Console for indexing and query data, an analytics source for traffic by segment, and server logs if you can get them. A spreadsheet or database to group and count the rows matters as much as the crawler.` }
    ]
  },
  {
    slug: 'wix-seo-specialist', h2: 'Related Questions About Hiring a Wix SEO Specialist', sources: S,
    keywords: ['wix seo expert', 'hire wix seo expert', 'wix seo services', 'wix seo cost', 'wix seo problems', 'wix seo keywords'],
    items: [
      { h3: 'Wix SEO Expert: What to Look For', html: `A good Wix SEO expert knows what Wix handles for you and spends the time on what stays manual: deciding which searches each page should win, writing page content, earning links and setting up the Business Profile. Google's own page on hiring an SEO suggests asking to see examples of previous work and whether the person follows the Google Search Essentials.` },
      { h3: 'Hire a Wix SEO Expert: Questions to Ask First', html: `Ask for examples of previous work, ideally including Wix sites, and speak to a past client. Ask whether they follow the Google Search Essentials and what that means for their tactics. Ask which items on the quote Wix already does automatically, and why you are paying for them.` },
      { h3: 'Wix SEO Services: What a Fair Scope Looks Like', html: `A sensible engagement has a clear first phase and an ongoing phase, and the proposal should say which is which. The first phase is an audit, with a Search Console review, page-by-page targeting and a list of content gaps. The output should be a prioritized list you can read, not a promise of a rank.` },
      { h3: 'Wix SEO Cost: What Should Be on the Quote', html: `We do not quote prices here, because they vary too much between providers. What matters more is what the price covers. Check that nothing on the quote is something Wix already does automatically, and ask what you receive each month.` },
      { h3: 'Wix SEO Problems: Where Sites Lose Ground', html: `Because the platform covers the technical foundations, the problems on small-business Wix sites are almost always about what was put on the pages. Typical examples are generic page titles such as "Home", thin page content and no clear search target for each page. Those are fixed by content and targeting, not by plugins.` },
      { h3: 'Wix SEO Keywords: Targeting Comes First', html: `Search targeting is a manual job on every platform. Decide which searches each page should win, based on what customers actually type, then set the title, description and headings to match. Our <a href="/blog/short-tail-vs-long-tail-keywords">short tail vs long tail keywords</a> guide helps you choose between broad and specific phrases.` }
    ]
  },
  {
    slug: 'sitemap-priority', h2: 'Related Questions About Sitemap Priority', sources: S,
    keywords: ['sitemap update frequency', 'sitemap priority seo', 'sitemap priority google', 'priority in sitemap', 'sitemap xml priority', 'sitemap priority values'],
    items: [
      { h3: 'Sitemap Update Frequency: How Often Should You Update It?', html: `Update the sitemap whenever pages are added, removed or really changed, and let your CMS do it automatically if it can. Google ignores the changefreq value, so you cannot influence crawl frequency with it. The tag that counts is lastmod, and Google uses it only if it is consistently accurate, so change it only when the page itself changes.` },
      { h3: 'Sitemap Priority SEO: Does It Help Rankings?', html: `No. Google says it ignores the priority value, so setting it will not make a page crawl more often or rank higher. Time spent tuning priority values is better spent on the content and the internal links.` },
      { h3: 'Sitemap Priority Google: What the Documentation Says', html: `Google's sitemap documentation is direct: priority and changefreq are ignored, and lastmod is used only when it proves reliable. That is why a minimal entry needs only the location of the page, as the example above shows.` },
      { h3: 'Priority in Sitemap: What the Protocol Defines', html: `The sitemaps protocol defines an optional priority tag with a value from 0.0 to 1.0, and a default of 0.5. It was designed to tell crawlers how important one URL is compared with other URLs on the same site. A tag that owners set themselves is easy to abuse, which is one reason Google does not use it.` },
      { h3: 'Sitemap XML Priority and Priority Values: Can You Leave Them Out?', html: `Yes. A valid sitemap entry needs only the loc tag. If your plugin writes priority and changefreq for you, it does no harm, but it carries no weight with Google. Our <a href="/tools/sitemap-validator">sitemap validator</a> checks the file for real problems, such as redirecting or non-canonical URLs.` }
    ]
  },
  {
    slug: 'maritime-digital-marketing', h2: 'Related Questions About Maritime Marketing', sources: S,
    keywords: ['maritime b2b marketing', 'b2b maritime marketing', 'maritime online marketing', 'digital advertising maritime', 'maritime paid search', 'maritime digital marketing firm'],
    items: [
      { h3: 'Maritime B2B Marketing: What Makes It Different', html: `Maritime buyers are technical decision-makers and procurement teams who research for weeks or months, so the sales cycle is long and involves several people. B2B maritime marketing therefore has to answer technical and commercial questions, not just attract clicks.` },
      { h3: 'B2B Maritime Marketing: The Website Has to Do the Selling', html: `A maritime buyer rarely fills out a contact form on a first visit. The website has to answer a procurement team's questions and provide documentation before a conversation ever happens, which is why the site is built to convert a long cycle and not a quick sale.` },
      { h3: 'Maritime Online Marketing: Why LinkedIn Matters', html: `LinkedIn is where this industry actually lives online. Superintendents, procurement managers, brokers and executives use it to research vendors and follow the industry, so it matters more than consumer social networks for a bunker supplier or a port agent.` },
      { h3: 'Digital Advertising and Maritime Paid Search', html: `Google Ads can work for maritime companies, but narrowly. It fits urgent, high-intent searches such as emergency ship repair, port agency services in an unfamiliar port or time-sensitive charter availability, where a buyer needs an answer now.` },
      { h3: 'Maritime Digital Marketing Firm: What to Ask For', html: `Ask for direct experience in maritime, shipping, freight or adjacent B2B industrial sectors, not just a portfolio of consumer brands. Ask how the firm handles technical terminology and regulatory content, because getting those details wrong costs credibility with expert buyers.` }
    ]
  },
  {
    slug: 'google-disavow-backlinks', h2: 'Related Questions About Google Disavow', sources: S,
    keywords: ['disavow means', 'how to disavow backlinks', 'google disavow tool', 'disavow backlinks google search console', 'google disavow file', 'backlink disavow tool', 'google disavow links generator'],
    items: [
      { h3: 'What Does Disavow Mean?', html: `To disavow a link is to tell Google not to take it into account when assessing your site. You upload a text file listing individual page URLs or whole domains, and Google says the list applies only to the property you upload it for. It is a request about how links are counted, not a way to remove a link from the web.` },
      { h3: 'How to Disavow Backlinks in Google Search Console', html: `Open the disavow tool page and choose the property, then upload your text file. Domain properties are not supported, so use the URL-prefix property for your site. If the file has errors, Google shows them at once and keeps your old list. If the upload succeeds, it can take a few weeks for Google to incorporate it as it recrawls. Before you do any of this, read the two-part test above.` },
      { h3: 'Google Disavow Tool: When You Should Use It', html: `Google's help page sets a two-part test and both parts must be true: you have a considerable number of spammy, artificial or low-quality links, and those links have caused a manual action or are likely to cause one. A few odd links or a high toxicity score from a tool does not meet the test.` },
      { h3: 'Google Disavow File: The Format Rules', html: `Put one URL or domain per line. To disavow a whole domain or subdomain, start the line with domain: followed by the name. You cannot disavow a subpath such as a folder of a site. The file must be plain text, and comments are allowed, so keep notes on why each group is listed.` },
      { h3: 'Backlink Disavow Tool and Google Disavow Links Generator', html: `A generator can format the file for you, but formatting is the easy part. The real work is deciding which links belong in it, and a tool's toxicity score is an estimate from a third party, not Google's view. Review each link by hand, as our guide to <a href="/blog/check-backlinks-of-website">checking backlinks</a> explains.` },
      { h3: 'If You Have a Manual Action', html: `If Search Console shows a manual action for unnatural links, Google's guidance is to remove the links where you can, disavow the rest and then submit a reconsideration request from the Manual actions report, explaining what you did.` }
    ]
  },
  {
    slug: 'link-building-agencies-dubai-2026', h2: 'Related Questions About Link Building in Dubai', sources: S,
    keywords: ['link building services dubai', 'link building agency uae', 'link building company dubai', 'link building services uae', 'link building agency', 'backlinks dubai'],
    items: [
      { h3: 'Link Building Services Dubai: What to Check First', html: `Ask exactly how links are earned. Outreach, guest content and digital PR are legitimate, while a guaranteed link count for a flat fee usually signals a private network or a paid placement scheme. Then ask how many placements per month the quoted price covers.` },
      { h3: 'Link Building Agency UAE: The Market in Brief', html: `The UAE had 11.3 million internet users at the end of 2025, a 99.0% online penetration, which is one of the highest rates anywhere. That is why many agencies compete for the same buyers, and why checking a track record matters more than reading a pitch.` },
      { h3: 'Link Building Company Dubai: How We Chose', html: `Every agency we listed had to clear three checks: independently collected client reviews on Clutch, a working website that names real services and, where available, real team members, and a specific mention of link building as its own service. Several names were set aside for lacking any of them.` },
      { h3: 'Link Building Services UAE: Read the Retainer', html: `Confirm which services are included in a bundled SEO retainer, and ask how many linking placements per month the price covers. Check that you keep ownership of your website, analytics and Search Console, because none of it should be held hostage to keep you on a contract.` },
      { h3: 'Backlinks Dubai: Check the Sites Where Links Are Placed', html: `Look at the sites an agency has placed links on. They should have real, relevant content and real traffic, not just a domain rating number, which can be manipulated. Be realistic about timing too: link building compounds over three to six months at minimum.` }
    ]
  },
  {
    slug: 'how-to-find-competitor-backlinks-2026', h2: 'Related Questions About Finding Competitor Backlinks', sources: S,
    keywords: ['how to find competitors backlinks', 'find competitor backlinks', 'how to find backlinks of competitors', 'competitor backlinks checker', 'how to get competitor backlinks', 'seo competitor backlinks'],
    items: [
      { h3: 'How to Find Competitors Backlinks for Free', html: `You can start with nothing but Google and a spreadsheet. Search for the competitor's name while excluding their own site to surface mentions and links across the web, and use a free backlink checker for quick looks: the one in our comparison table shows up to 100 links per domain.` },
      { h3: 'Find Competitor Backlinks With a Gap Tool', html: `The fastest method is a backlink gap or link intersect report, which every major platform has in some form. It lists sites that link to your competitors but not to you, which is exactly the prospect list you want.` },
      { h3: 'How to Find Backlinks of Competitors: Pick the Right Ones', html: `There are two kinds of competitor. SERP competitors are sites ranking for the keywords you target, even if they sell something else. Business competitors are the companies you compete with for customers. Analyze three to five of each, because a single profile can be an outlier.` },
      { h3: 'Competitor Backlinks Checker: What to Filter For', html: `A raw report can return hundreds of rows, so filter before you do any outreach. Favor relevance over authority score, links you can actually replicate, linking pages with real traffic and dofollow links where you want ranking value.` },
      { h3: 'How to Get Competitor Backlinks: Outreach Comes Next', html: `Finding the list is the easy half. The sites that see ranking movement are the ones that follow through with real outreach to a filtered prospect list, not the ones that save a spreadsheet. Our <a href="/blog/backlinks-example">backlinks example</a> guide shows how we sort links by type before judging them.` }
    ]
  },
  {
    slug: 'best-crm-automation-tools-2026', h2: 'Related Questions About CRM and Automation Tools', sources: S,
    keywords: ['what are the best crm tools for b2b sales', 'global crm pricing comparison', 'best crm software', 'crm platform with marketing automation', 'crm marketing automation', 'what is crm automation'],
    items: [
      { h3: 'What Is CRM Automation?', html: `CRM automation means letting software handle repeated steps around customer records, such as routing a new lead, sending a follow-up email or moving a deal to the next stage. It is separate from marketing automation, which is why several tools in this comparison are strong at one and weak at the other.` },
      { h3: 'What Are the Best CRM Tools for B2B Sales?', html: `It depends on team size and stage. A solo founder can start with HubSpot's free CRM or Zoho's free plan, a small marketing team may prefer ActiveCampaign or HubSpot Marketing Hub Starter, a sales-led team with reps may prefer Pipedrive or monday CRM, and large or regulated companies look at Salesforce or HubSpot Enterprise.` },
      { h3: 'CRM Platform With Marketing Automation: Which Comes First?', html: `Decide whether the CRM or the automation is the daily job. HubSpot's CRM records are free but its marketing automation is where the cost sits, while ActiveCampaign is built around automation with the CRM added on. Pick the tool that matches the job your team does every day.` },
      { h3: 'Global CRM Pricing Comparison: How We Checked', html: `Every price in the comparison came from the vendor's own pricing page, visited directly in September 2026, not from a comparison site. Figures are per user per month billed annually unless marked, and "custom" means the vendor does not publish a price. Prices change, so check the vendor page before you buy.` },
      { h3: 'Best CRM Software: Check Security Before You Sign', html: `A CRM holds every customer's contact details and deal history, so get three answers in writing before you sign: whether the actual SOC 2 Type II report is available, a signed GDPR Data Processing Agreement if you hold EU contacts, and where the data is hosted and which company jurisdiction it falls under. A badge on a marketing page is not an answer.` }
    ]
  }
], { date: '2026-11-07' });
