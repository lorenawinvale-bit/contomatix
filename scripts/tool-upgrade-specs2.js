// Content for scripts/tool-upgrade.js, batch 2 (9 Nov 2026): utm-builder, sitemap-validator, schema-markup-generator.
// Queries come from Search Console (90 days to 8 Nov 2026), saved in keyword-research/gsc-queries-2026-11-09.md. Statements describe what each tool does (read from its page) or Google documentation read on 9 Nov 2026.
module.exports = {
  'utm-builder': {
    howTitle: 'Build a tagged campaign URL in three steps',
    steps: [
      ['Enter the page URL', 'Paste the landing page address you want visitors to reach.'],
      ['Fill the three required tags', 'Add the campaign source, medium and name. Term and content are optional.'],
      ['Copy the tagged URL', 'Copy the finished link into your email, ad or social post.']
    ],
    rqTitle: 'Related Questions About UTM Tag Generators',
    questions: [
      ['UTM Tag Generator: What It Builds', 'This <strong>UTM tag generator</strong> adds the five UTM parameters to your link, utm_source, utm_medium, utm_campaign, utm_term and utm_content, and gives you one tagged URL to copy. It runs in your browser, so nothing is uploaded or stored.'],
      ['UTM Tags: What They Tell Google Analytics', 'UTM tags are small additions to the end of a URL that tell Google Analytics where a visitor came from. Without them, Analytics can only guess from referrer data, which breaks down for email, social apps and offline campaigns such as QR codes and print ads that pass no referrer at all.'],
      ['UTM Tag Maker and UTM Tags Builder: Which Fields to Fill', 'Source, medium and campaign are the three Analytics needs to attribute traffic. Source is the site or platform that sent the visitor, such as newsletter or facebook, medium is the type of traffic, such as email, cpc or social, and campaign names the promotion, such as spring_sale_2026. Term and content are optional and mainly useful for paid search keywords and A/B tests of ad variations.'],
      ['UTM Tag Builder and Custom Tag Builder: Keep Names Consistent', 'Capital letters and spelling matter: Facebook, facebook and FB show up as three separate sources in your reports. Use underscores or hyphens instead of spaces, which are encoded as %20, and agree a naming standard before a team starts tagging links.'],
      ['URL Tag Builder: Where Not to Use Tags', 'Use UTM links only for links coming from outside your site, such as ads, emails and social posts. Adding them to links between your own pages can overwrite the visitor\'s original traffic source in Analytics.'],
      ['UTM Tags Generator and SEO: Do Tagged URLs Affect Rankings?', 'No. UTM-tagged URLs are for analytics and have no effect on search rankings. Make sure your page has a proper canonical tag, so search engines do not treat the tagged URL as a separate page from the clean one. You can check it with our <a href="/tools/canonical-tag-checker">canonical tag checker</a>.']
    ],
    faqs: [
      ['Is there a free UTM tag generator with no signup?', 'Yes. This one is free, needs no account and builds the tagged URL in your browser.'],
      ['What is the difference between utm_source and utm_medium?', 'utm_source says which site or platform sent the traffic, such as newsletter, facebook or google. utm_medium says what type of traffic it is, such as email, cpc, social or referral.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/cross-channel-attribution', kind: 'Guide', t: 'Cross-channel attribution', d: 'How to credit traffic across channels.' },
      { href: '/tools/canonical-tag-checker', kind: 'Tool', t: 'Canonical tag checker', d: 'Check that tagged URLs point to the clean page.' },
      { href: '/tools/seo-report-generator', kind: 'Tool', t: 'SEO report generator', d: 'Turn your numbers into a monthly report.' }
    ]
  },

  'sitemap-validator': {
    howTitle: 'Validate a sitemap in three steps',
    steps: [
      ['Copy your sitemap.xml', 'Open yourdomain.com/sitemap.xml and copy the whole file.'],
      ['Paste it in', 'Paste it into the box. The check runs in your browser and nothing is uploaded.'],
      ['Fix what is flagged', 'Each problem is listed so you can correct the file before you submit it.']
    ],
    rqTitle: 'Related Questions About Sitemap Validators',
    questions: [
      ['Sitemap XML Checker: What the Validator Checks', 'This <strong>sitemap XML checker</strong> tests that the file is valid XML, has the correct urlset or sitemapindex root element, gives every url a loc, uses absolute URLs, lists one consistent host, has no duplicate URLs, stays within 50,000 URLs and 50MB uncompressed, and uses real W3C datetime values in lastmod.'],
      ['Sitemap Validator and XML Sitemap Validator: Paste the File, Nothing Is Uploaded', 'Paste your sitemap.xml and the result appears at once. The validator works entirely in your browser, with no account, so you can check a sitemap before it goes anywhere near Search Console.'],
      ['Sitemap Errors: Why a Broken Sitemap Fails Silently', 'Google does not usually reject an invalid sitemap outright. It logs the error in the Sitemaps report in Search Console and skips the broken entries, so a typo or a relative URL can sit unnoticed for weeks while those pages never get crawled through that path.'],
      ['Check Sitemap Validity Before You Submit It', 'Run the raw file through a check like this before you submit it. It catches the structural problems that a quick visual scan misses, such as a relative URL, a duplicate entry or a placeholder lastmod date.'],
      ['Verify Sitemap and Sitemap Tester: What This Check Does Not Cover', 'The validator checks the structure of the file, not whether each page is indexable. Test whether a URL is blocked with the <a href="/tools/robots-txt-tester">robots.txt tester</a>, list every URL in a sitemap with the <a href="/tools/sitemap-url-extractor">sitemap URL extractor</a>, and check hreflang annotations in a sitemap with the <a href="/tools/hreflang-sitemap-validator">hreflang sitemap validator</a>.'],
      ['Check Sitemap Tags: What Google Uses', 'Google ignores the priority and changefreq tags and uses lastmod only when it is consistently accurate. Our guide to <a href="/blog/sitemap-priority">sitemap priority</a> explains which tags are worth your time.']
    ],
    faqs: [
      ['Is there a free sitemap validator?', 'Yes. This one is free, needs no signup and checks your sitemap.xml in your browser.'],
      ['Does the validator tell me whether my pages are indexed?', 'No. It checks the structure of the sitemap file only. For indexing, use the Page indexing report in Search Console.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/sitemap-priority', kind: 'Guide', t: 'Sitemap priority', d: 'Which sitemap tags Google uses and ignores.' },
      { href: '/tools/robots-txt-tester', kind: 'Tool', t: 'Robots.txt tester', d: 'Test whether a URL is blocked.' },
      { href: '/blog/image-sitemap', kind: 'Guide', t: 'Image sitemap', d: 'What an image sitemap can and cannot do.' }
    ]
  },

  'schema-markup-generator': {
    howTitle: 'Generate schema markup in three steps',
    steps: [
      ['Pick a schema type', 'Choose FAQ, HowTo, LocalBusiness or Article.'],
      ['Fill in the real details', 'Enter what the page actually says. Markup must match content a visitor can see.'],
      ['Copy, paste and test', 'Paste the code into your page and test it with Google\'s Rich Results Test.']
    ],
    rqTitle: 'Related Questions About Schema Markup Generators',
    questions: [
      ['Schema Markup Generator: The Four Types It Builds', 'This <strong>schema markup generator</strong> builds JSON-LD for four types: FAQPage, HowTo, LocalBusiness and Article. You fill in the details, then copy the code or download it as an HTML snippet. Our <a href="/blog/types-of-schema-markup">types of schema markup</a> guide explains the wider list.'],
      ['Schema Generator and Schema Code Generator: Where the Code Goes', 'Paste the generated code into the head of your page, or anywhere in the body, since search engines read JSON-LD from anywhere in the document. Test it, and update the markup whenever the page content changes.'],
      ['Free Schema Markup Generator and Schema Markup Online: Nothing Leaves Your Browser', 'The code is generated in your browser with JavaScript. Nothing is uploaded, logged or stored on any server, and you do not need an account or any coding knowledge. Use this as your free schema markup generator when you want a fast, private result.'],
      ['FAQ Schema Generator: What Google Shows Today', 'Google says the FAQ rich result is no longer shown in Search, starting 7 May 2026, and it has removed the documentation. A <strong>FAQ schema markup generator</strong> still produces valid markup, but you should not expect the dropdown in Google. If you add it, only mark up genuine questions and answers that are visible on the page. Check <a href="https://developers.google.com/search/updates" target="_blank" rel="nofollow noopener">Google\'s documentation updates</a> for the current position.'],
      ['Website Schema Generator and Review Schema: What This Tool Covers', 'This generator covers FAQPage, HowTo, LocalBusiness and Article. It does not build WebSite or review markup. For a blog post, Article markup helps Google show better title text, images and dates, and for a business with a physical location, LocalBusiness markup can feed a knowledge panel with details such as hours.'],
      ['How to Schema Generator: Check Your Markup Is Valid', 'Paste your page URL or the code into Google\'s Rich Results Test. It flags syntax errors and shows which rich results your page qualifies for. For a deeper structural check of existing markup, use our <a href="/tools/schema-markup-validator">schema markup validator</a>.']
    ],
    faqs: [
      ['Does Google still show FAQ rich results?', 'No. Google says the FAQ rich result is no longer shown in Search results, starting 7 May 2026. FAQ markup from this tool is still valid, but it will not produce the dropdown in Google.'],
      ['Does the generator support review or website schema?', 'No. It builds FAQPage, HowTo, LocalBusiness and Article markup.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/types-of-schema-markup', kind: 'Guide', t: 'Types of schema markup', d: 'The main schema types and what each is for.' },
      { href: '/tools/schema-markup-validator', kind: 'Tool', t: 'Schema markup validator', d: 'Check JSON-LD syntax and required properties.' },
      { href: '/tools/technical-seo-audit-tool', kind: 'Tool', t: 'Technical SEO audit tool', d: 'Check a page\'s title, headings, canonical and links.' }
    ]
  }
};
