// Content for scripts/tool-upgrade.js, batch 9 (17 Nov 2026): sitemap-url-extractor, content-brief-generator, schema-markup-validator.
// Humanized format: five short answers each, one of them "what we found when we ran it on ourselves" using our own sitemap (17 Nov 2026), our process, or our own schema scan (26 Oct 2026, 406 pages).
// Queries come from Search Console (90 days to 13 Nov 2026), saved in keyword-research/gsc-queries-2026-11-16.md and the 17 Nov notes in the batch script.
module.exports = {
  'sitemap-url-extractor': {
    howTitle: 'Pull the URLs out of a sitemap in three steps',
    steps: [
      ['Paste the sitemap', 'Open the sitemap.xml in your browser, copy everything and paste it in.'],
      ['Filter if you want', 'Keep only URLs that contain a path such as /blog/, and remove duplicates.'],
      ['Copy or export', 'Copy the plain list, or take the CSV with lastmod to sort by the date each page changed.']
    ],
    rqTitle: 'Quick Answers About Extracting URLs From a Sitemap',
    questions: [
      ['Sitemap URL Extractor: What You Get', 'This <strong>sitemap URL extractor</strong> pulls every address out of a sitemap into a plain list. It reads sitemap index files too, so you know which child files to paste next. It runs in your browser and nothing is uploaded.'],
      ['What We Found Running It on Our Own Sitemap', 'On 17 November 2026 our own sitemap listed 433 URLs: 371 under /blog/, 43 under /tools/, 10 under /services/ and a few pages such as team and terms. Seeing that split in a spreadsheet took a minute, and it showed that 86% of the URLs we ask Google to look at are blog posts.'],
      ['Extract URLs From a Sitemap Into a Spreadsheet', 'Paste the list into a sheet, add a column for the folder and count pages by folder. Compare it with a crawl to find pages that are in the sitemap but not linked internally.'],
      ['Get Sitemap From URL: Why the Tool Asks You to Paste', 'Browsers block most cross-site requests to other people\'s files, so the tool cannot fetch a sitemap from a URL. Open the file, copy it and paste it. To find where a sitemap lives, use our <a href="/tools/sitemap-finder">sitemap finder</a>.'],
      ['Sitemap to CSV for a Redirect Map', 'The CSV keeps lastmod, so you can sort by last change. Before a migration, the list becomes the first column of your redirect map. See our <a href="/blog/seo-site-migration">SEO site migration checklist</a>.']
    ],
    faqs: [
      ['Is there a free sitemap URL extractor?', 'Yes. This one is free, needs no signup and runs in your browser, so your sitemap is not uploaded.'],
      ['Does it work on a sitemap index?', 'Yes. It detects a sitemapindex root and lists the child sitemap addresses. Open each child file, paste it and extract from there.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/sitemap-finder', kind: 'Tool', t: 'Sitemap finder', d: 'Find where a site keeps its sitemap' },
      { href: '/tools/sitemap-validator', kind: 'Tool', t: 'Sitemap validator', d: 'Check the file is valid' },
      { href: '/blog/seo-site-migration', kind: 'Guide', t: 'SEO site migration', d: 'Use the list as a redirect map' }
    ]
  },
  'content-brief-generator': {
    howTitle: 'Build a content brief in three steps',
    steps: [
      ['Enter your research', 'Add the goal, audience, primary keyword, intent, secondary keywords and the questions to answer.'],
      ['Add sources and links', 'List the data the writer must cite and the pages to link to.'],
      ['Copy the brief', 'Copy the outline, meta draft and checklist, and keep the brief to one or two pages.']
    ],
    rqTitle: 'Quick Answers About Content Brief Tools',
    questions: [
      ['Content Brief Generator: What It Builds', 'This <strong>content brief generator</strong> arranges what you give it into goal and audience, keyword and intent, an outline, sources, internal links, a meta draft and a pre-publish checklist. It does not look at search results or invent data.'],
      ['How We Use a Brief Before We Update a Page', 'Before we update a page we collect three things: the queries it already gets in Search Console, related terms from a keyword tool, and what Google\'s AI answer and the top results say for the main query. Those go into the brief first, and only then does anyone write.'],
      ['Content Brief Tool With Questions to Answer', 'The questions you enter become an FAQ block in the outline. Write them as people ask them, in the words you saw in Search Console, not as a marketing line.'],
      ['Content Brief Tools: What They Cannot Do', 'A content brief tool cannot research for you. Read the pages that rank, note what they cover and what they miss, and collect your own data, then turn that into a brief. See our <a href="/blog/content-brief-template">content brief template</a> for the fields.'],
      ['Citation Based Content Brief: List Sources First', 'Add the sources a writer must cite before drafting. It is much cheaper to fix a wrong claim in a brief than in a published page. Use the <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> so each keyword belongs to one page.']
    ],
    faqs: [
      ['Is there a free content brief generator?', 'Yes. This one is free, needs no signup and runs in your browser, so your brief is not uploaded.'],
      ['How long should a content brief be?', 'One or two pages. A brief a writer will not read is not a brief, so keep it specific about the angle and the sources.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/content-brief-template', kind: 'Guide', t: 'Content brief template', d: 'The fields, an example and what ranking pages look like' },
      { href: '/tools/keyword-mapping-tool', kind: 'Tool', t: 'Keyword mapping tool', d: 'One keyword, one page' },
      { href: '/blog/content-gap-analysis', kind: 'Guide', t: 'Content gap analysis', d: 'Find what to write next' }
    ]
  },
  'schema-markup-validator': {
    howTitle: 'Validate your schema markup in three steps',
    steps: [
      ['Paste your markup', 'Paste the JSON-LD, or the HTML of the page, into the box.'],
      ['Read the report', 'See syntax errors, missing context or type, and missing required or recommended properties.'],
      ['Confirm in Google\'s tools', 'Fix what is flagged, then check important pages with the Rich Results Test and URL Inspection.']
    ],
    rqTitle: 'Quick Answers About Schema Markup Checking',
    questions: [
      ['Schema Markup Validator: What It Checks', 'This <strong>schema markup validator</strong> parses every JSON-LD block, checks for @context and @type, and applies the required and recommended properties from Google\'s documentation for common types. It runs in your browser and nothing is uploaded.'],
      ['What We Found Scanning Our Own Site', 'On 26 October 2026 we scanned 406 of our own pages. Every one carried Organization markup, 371 carried FAQPage, 347 carried BlogPosting and 393 carried BreadcrumbList. One page had a block flagged as bad, and none used microdata. A scan like this takes minutes and tells you what you are actually shipping.'],
      ['Schema Markup Checker vs Google\'s Rich Results Test', 'This is not Google\'s Rich Results Test and cannot confirm a rich result. Eligibility also depends on the markup matching visible content and the page being indexed. Google says FAQ rich results are only shown for well-known, authoritative government and health websites, so valid FAQ markup may not show anything.'],
      ['Check Schema Markup Online: Why You Paste It In', 'Browsers block most cross-site requests, so the tool cannot fetch a live page. Paste the JSON-LD or the HTML. For the types worth adding, see our guide to <a href="/blog/types-of-schema-markup">types of schema markup</a>.'],
      ['JSON-LD Checker and Schema Org Validator Limits', 'Types without Google-specific rules are checked for syntax and basic shape only. Use the <a href="/tools/schema-markup-generator">schema markup generator</a> to build clean markup, then validate it here.']
    ],
    faqs: [
      ['Is there a free schema markup validator?', 'Yes. This one is free, needs no signup and runs in your browser, so your markup is not uploaded.'],
      ['Does valid schema guarantee a rich result?', 'No. Google decides what to show, and eligibility depends on the markup matching the visible page, the page being indexed and, for some features, the site itself.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/schema-markup-generator', kind: 'Tool', t: 'Schema markup generator', d: 'Build clean JSON-LD' },
      { href: '/blog/types-of-schema-markup', kind: 'Guide', t: 'Types of schema markup', d: 'Which types are worth adding' },
      { href: '/tools/technical-seo-audit-tool', kind: 'Tool', t: 'Technical SEO audit tool', d: 'A first pass at the rest' }
    ]
  }
};
