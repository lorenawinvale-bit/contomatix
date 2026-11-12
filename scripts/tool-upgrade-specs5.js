// Content for scripts/tool-upgrade.js, batch 5 (12 Nov 2026): seo-proposal-generator, outbound-link-checker, sitemap-generator.
// Queries come from Search Console (90 days to 10 Nov 2026) and Ahrefs matching terms, saved in keyword-research/gsc-queries-2026-11-12.md. One natural keyword per H3; statements describe what each tool does (read from its page) or Google guidance already cited on that page.
module.exports = {
  'seo-proposal-generator': {
    howTitle: 'Build an SEO proposal in three steps',
    steps: [
      ['Fill in the details', 'Add your client, the services you will deliver, the timeline and your fee.'],
      ['Read the draft', 'The proposal writes itself from your answers. Every price and date is the one you typed.'],
      ['Copy, download or print', 'Copy the text, download it, or print it and save as PDF.']
    ],
    rqTitle: 'Related Questions About SEO Proposals',
    questions: [
      ['SEO Proposal Software: What This Generator Does', 'This <strong>SEO proposal software</strong> takes your client, scope, timeline and fees and writes a clean, structured proposal you can copy, download or print to PDF. It never invents numbers, and it runs in your browser, so nothing is uploaded.'],
      ['SEO Proposal Generator: What the Proposal Includes', 'It includes an executive summary in the client\'s own terms, a scope section with the deliverables for each service you tick, a phased timeline that starts with an audit and setup, reporting and communication, investment and terms using your fee and start date, and an honest results section that explains how progress is measured.'],
      ['SEO Template Generator and a Free SEO Proposal Template', 'Treat the output as a strong first draft, not a locked template. Copy it into your document editor, add the client\'s specifics and change anything you like. This SEO template generator is free and needs no signup.'],
      ['Free SEO Quote: The Tool Does Not Suggest Prices', 'It uses only the fee text you type. SEO pricing depends on scope, competition and your costs, so the figure has to be yours. For a view of how packages are priced, read our guide to <a href="/blog/seo-packages-for-small-business">SEO packages for small business</a>.'],
      ['SEO Proposal Tool: Why Not to Promise Rankings', 'Google\'s guidance for people hiring an SEO is blunt: no one can guarantee a number-one ranking. A better proposal promises the work, such as the audit, the fixes, the content and the reports, and defines how results will be measured, for example impressions, clicks, enquiries and the pages that move.'],
      ['SEO Quotation vs Contract: What the Proposal Is', 'The proposal is a business document, not a legal contract. Once the client agrees, put the terms into a proper contract or statement of work and have it reviewed where needed. To report on the work afterwards, use the <a href="/tools/seo-report-generator">SEO report generator</a>.']
    ],
    faqs: [
      ['Is there a free SEO proposal generator?', 'Yes. This one is free, needs no signup and writes the proposal in your browser, with a PDF option through your print dialog.'],
      ['Can I use the SEO proposal as a template for new clients?', 'Yes. Copy the text into your editor and adapt it. The generator is a starting point, and the fee, dates and scope come from you each time.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/seo-packages-for-small-business', kind: 'Guide', t: 'SEO packages for small business', d: 'What a package should include and how to compare two.' },
      { href: '/tools/seo-report-generator', kind: 'Tool', t: 'SEO report generator', d: 'Turn Search Console numbers into a monthly report.' },
      { href: '/blog/seo-audit-report-template', kind: 'Guide', t: 'SEO audit report template', d: 'Write your audit findings up for a client.' }
    ]
  },

  'outbound-link-checker': {
    howTitle: 'Check a page\'s outbound links in three steps',
    steps: [
      ['Copy the page HTML', 'View the page source and copy the HTML of the page you want to check.'],
      ['Paste it in', 'Paste the HTML into the box. The check runs in your browser and nothing is uploaded.'],
      ['Read the report', 'External links appear grouped by domain, with their rel status and flags for risky patterns.']
    ],
    rqTitle: 'Related Questions About Outbound Link Checkers',
    questions: [
      ['Outbound Link Checker: What It Looks For', 'This <strong>outbound link checker</strong> lists every external link and groups them by domain. It shows which links are followed, nofollow, sponsored or ugc, and flags insecure http links, shortened links, affiliate-looking links, repeated links and links with no visible text.'],
      ['Outbound Link Check: Paste the HTML, Nothing Is Uploaded', 'Paste a page\'s HTML and the report appears at once. The tool reads only what you paste and never fetches any URL, so your page stays in your browser. It is also a free outbound link checker tool with no signup.'],
      ['External Link Checker: Grouped by Domain', 'Every link that points to a different domain is counted and grouped, so you can see who you link to most. Links to other pages on your own domain are internal links and are not listed here, so use the <a href="/tools/internal-link-checker">internal link checker</a> for those.'],
      ['Find Outbound Links: Followed, Nofollow, Sponsored or UGC', 'Each link\'s status is read from its rel attribute, and a page-level robots nofollow is reported if the page has one. Google says regular links you expect it to follow need no rel attribute, while paid placements should carry sponsored and user-generated links should carry ugc.'],
      ['Check External Links to My Site: What This Tool Cannot Do', 'It reads the links on a page, not the links pointing to your site, and it does not visit links to see whether they work. To find who links to you, use the Links report in Search Console, as explained in our guide to <a href="/blog/check-backlinks-of-website">checking backlinks of a website</a>.'],
      ['Outgoing Link Checker: Use It Before You Publish Sponsored Posts', 'Before publishing a sponsored post, paste the page and confirm every paid link is marked sponsored. When auditing an old article, look for http links, shortened links and domains that no longer match the topic. For the rel value of every link, including internal ones, use the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.']
    ],
    faqs: [
      ['Is there a free outbound link checker tool?', 'Yes. This one is free, needs no signup and checks the HTML you paste, in your browser.'],
      ['Does the outbound link checker find broken links?', 'No. It never fetches any URL, so it cannot tell whether a link is broken. Use it to list and review links, then test the important ones yourself.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/dofollow-link-checker', kind: 'Tool', t: 'Dofollow link checker', d: 'Read the rel value of every link on a page.' },
      { href: '/tools/anchor-text-checker', kind: 'Tool', t: 'Anchor text checker', d: 'Sort link text by type and spot repeats.' },
      { href: '/blog/link-reclamation', kind: 'Guide', t: 'Link reclamation', d: 'Win back the links you already deserve.' }
    ]
  },

  'sitemap-generator': {
    howTitle: 'Generate a sitemap in three steps',
    steps: [
      ['Paste your URLs', 'Add the page addresses you want in the sitemap, one per line.'],
      ['Generate the file', 'The tool turns the list into a valid sitemap.xml with the required structure.'],
      ['Upload and submit', 'Upload it to your site\'s root, then submit it in Search Console or reference it in robots.txt.']
    ],
    rqTitle: 'Related Questions About Sitemap Generators',
    questions: [
      ['Free Sitemap Generator: What It Does', 'This <strong>free sitemap generator</strong> turns a plain list of URLs into a valid sitemap.xml in seconds. It needs no crawler and no install, and it runs in your browser, so nothing is uploaded.'],
      ['Sitemap Generator From URL: Paste a List, Not One Address', 'The tool does not crawl a site from a single address. You paste the URLs you want listed, which keeps you in control of what goes in. If you need to see what a site already lists, our <a href="/tools/sitemap-url-extractor">sitemap URL extractor</a> pulls the URLs out of an existing sitemap.'],
      ['Generate Sitemap From URL List: What Belongs in It', 'Include canonical, indexable pages only: leave out redirect targets, noindexed pages and duplicate URL parameters. Use absolute https:// addresses, never relative paths, and list only pages you actually want ranked, because thin or low-value pages dilute crawl attention.'],
      ['XML Sitemap Generator Unlimited: The 50,000 URL Limit', 'The sitemap protocol caps a single file at 50,000 URLs or 50MB uncompressed. Larger sites use a sitemap index file that links to several smaller sitemaps, so "unlimited" really means splitting into more files.'],
      ['Sitemap URL Generator: Do Priority and Changefreq Matter?', 'Google has stated it largely ignores priority and changefreq, treating them as unreliable. They remain valid protocol fields, but lastmod is the one worth keeping accurate. See our guide to <a href="/blog/sitemap-priority">sitemap priority</a>.'],
      ['Create a Sitemap From a Website: Submit It Properly', 'Upload the file to your site\'s root, then submit the URL under Sitemaps in Google Search Console, or reference it in robots.txt. Check the result with our <a href="/tools/sitemap-validator">sitemap validator</a>, and read <a href="/blog/how-to-create-a-sitemap">how to create a sitemap</a> for the full process.']
    ],
    faqs: [
      ['Is there a free sitemap generator from a URL list?', 'Yes. This one is free, needs no signup and builds the sitemap.xml from the list of URLs you paste, in your browser.'],
      ['Can this tool crawl my website to build a sitemap?', 'No. It generates the file from the URLs you provide. It does not crawl, so you choose exactly which pages are included.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/how-to-create-a-sitemap', kind: 'Guide', t: 'How to create a sitemap', d: 'Formats, limits and mistakes to avoid.' },
      { href: '/tools/sitemap-validator', kind: 'Tool', t: 'Sitemap validator', d: 'Check a finished sitemap for errors.' },
      { href: '/blog/robots-txt-sitemap', kind: 'Guide', t: 'Sitemap in robots.txt', d: 'The Sitemap line and the ways it fails.' }
    ]
  }
};
