// Content for scripts/tool-upgrade.js, batch 3 (10 Nov 2026): technical-seo-audit-tool, internal-link-checker, serp-snippet-preview.
// Queries come from Search Console (90 days to 9 Nov 2026) and Ahrefs matching terms, saved in keyword-research/gsc-queries-2026-11-10.md. Statements describe what each tool does (read from its page) or our own guides.
module.exports = {
  'technical-seo-audit-tool': {
    howTitle: 'Audit a page in three steps',
    steps: [
      ['Copy the page HTML', 'View the page source and copy the HTML. If your content is built in the browser, copy the rendered HTML from the element inspector instead.'],
      ['Paste it in', 'Paste the HTML and, if you want the canonical and hreflang checks, enter the page URL. Nothing is uploaded.'],
      ['Read the findings', 'Each finding says what was found and why it matters, from the title to images and links.']
    ],
    rqTitle: 'Related Questions About Technical SEO Audit Tools',
    questions: [
      ['Technical SEO Audit Tool: What It Checks', 'This <strong>technical SEO audit tool</strong> checks one page for its title and meta description, headings, canonical and robots meta tag, language and hreflang, social tags, structured data, and images and links. It reports missing alt attributes, missing dimensions, empty anchors, nofollow counts and broken JSON-LD.'],
      ['Technical SEO Checker and HTML SEO Checker: Paste the Page HTML', 'The tool does not fetch your page. You paste its HTML, which is why it works on a staging page or a template that no crawler can reach. For a page built in the browser, copy the rendered HTML from the element inspector, not the page source.'],
      ['Technical SEO Audit Free and Online Free: No Signup', 'Use it as a free technical SEO audit with no account and no install. The check runs in your browser with JavaScript, so the HTML you paste is never sent to a server, including ours.'],
      ['Technical SEO Check: Why It Asks for the Page URL', 'With the URL, the tool can check that the canonical points to the same page and that an hreflang set includes the page itself, which are common technical faults.'],
      ['Check Technical SEO: What a Single-Page Audit Cannot See', 'It reads only the HTML you paste, so it cannot see HTTP status codes or headers such as X-Robots-Tag, how the page renders after JavaScript, page speed, redirects, whether the URL is indexed or how other pages link to it. Confirm those with Search Console\'s URL Inspection and a crawler.'],
      ['Technical SEO Audit Checklist and Template: Use This as a First Pass', 'Use the tool as a fast first pass on a template or a single URL, then write the findings up with our <a href="/blog/seo-audit-report-template">SEO audit report template</a>. For the whole-site picture, see our guide to a <a href="/blog/website-seo-audit">website SEO audit</a>.'],
      ['What Is a Technical SEO Audit? How to Run One Site-Wide', 'A technical SEO audit checks how a site is built and crawled. This tool covers the page-level part. For a site-wide audit, check key templates with it, then use URL Inspection for indexing and a crawler for status codes, redirects and links across the whole site.']
    ],
    faqs: [
      ['Is there a free technical SEO audit tool?', 'Yes. This one is free, needs no signup and audits the HTML you paste in your browser.'],
      ['Can I audit my whole site with this technical SEO checker?', 'No. It audits one page at a time. Use it on templates and key pages, then confirm with Search Console and a crawler for the whole site.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/seo-audit-report-template', kind: 'Guide', t: 'SEO audit report template', d: 'Write your findings up for a client.' },
      { href: '/blog/website-seo-audit', kind: 'Guide', t: 'Website SEO audit', d: 'The whole-site picture around a single-page check.' },
      { href: '/tools/internal-link-checker', kind: 'Tool', t: 'Internal link checker', d: 'Check the links on a page in detail.' }
    ]
  },

  'internal-link-checker': {
    howTitle: 'Check a page\'s links in three steps',
    steps: [
      ['Copy the page HTML', 'View the page source and copy the HTML of the page you want to check.'],
      ['Paste it with the page URL', 'Enter the page URL so the tool can tell internal links from external ones. Nothing is uploaded.'],
      ['Read the link list', 'Links are sorted into internal, external and non-crawlable, with flags for empty, generic and nofollowed anchors.']
    ],
    rqTitle: 'Related Questions About Internal Link Checkers',
    questions: [
      ['Internal Link Checker: What It Sorts', 'This <strong>internal link checker</strong> sorts every link into internal, external and non-crawlable, lists empty anchors, image links with no alt text and generic phrases such as click here, shows repeated links with every anchor used, finds self-links, and reports rel attributes such as nofollow, sponsored and ugc.'],
      ['Internal Link Analysis Tool and Internal Link Tool: One Page at a Time', 'The tool checks the single page whose HTML you paste. It does not crawl your site, because crawling needs a server and pasting keeps your pages off every server. Use it on the pages that matter most, such as your home page, service pages and top posts.'],
      ['Check Internal Links and Internal Link Check: What Makes a Link Crawlable', 'Google says it can only crawl a link that is an a element with an href attribute. javascript: links, bare # links and anchors with no href are listed separately, because a menu built from script-only links can look fine to a visitor and still lead Google nowhere.'],
      ['Internal Linking Checker: Fix Weak Anchor Text', 'Google recommends anchor text that is descriptive, reasonably concise and relevant to the page it points to. Generic text such as read more tells neither people nor search engines what is on the other side, so rewrite vague anchors with a short descriptive phrase. To sort anchors by type, use the <a href="/tools/anchor-text-checker">anchor text checker</a>.'],
      ['Find Internal Links to a Page and Check Internal Links to a Page: What This Tool Cannot Do', 'It reads the links on a page, not the links pointing to it. To see which pages link to a page, use the Links report in Search Console, which lists your top linked pages, or a crawler. Our <a href="/blog/internal-link-building">internal link building</a> guide explains how to plan them.'],
      ['Website Internal Link Checker and Internal Link Checker Tool: Nofollow on Internal Links', 'Usually internal links should not be nofollow. Google advises using nofollow selectively, for links you do not trust, and the tool flags nofollow on links to your own pages so you can check it was intentional. To read the rel value of every link, use the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.']
    ],
    faqs: [
      ['Is there a free internal link checker?', 'Yes. This one is free, needs no signup and checks the page whose HTML you paste, in your browser.'],
      ['Can this internal link analysis tool show which pages link to mine?', 'No. It shows the links on the page you paste. Use the Links report in Search Console for the pages that link to a page.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/internal-link-building', kind: 'Guide', t: 'Internal link building', d: 'How to plan links between your own pages.' },
      { href: '/tools/anchor-text-checker', kind: 'Tool', t: 'Anchor text checker', d: 'Sort anchors by type and spot repeats.' },
      { href: '/tools/technical-seo-audit-tool', kind: 'Tool', t: 'Technical SEO audit tool', d: 'Audit the whole page, not only its links.' }
    ]
  },

  'serp-snippet-preview': {
    howTitle: 'Preview a search result in three steps',
    steps: [
      ['Enter your title and description', 'Type or paste the title tag and meta description you plan to publish.'],
      ['Watch the preview', 'See the result as it may look in Google, with live character counts and warnings.'],
      ['Adjust before you publish', 'Shorten or reword until the important words sit at the start and nothing is cut off.']
    ],
    rqTitle: 'Related Questions About SERP Snippet Previews',
    questions: [
      ['SERP Snippet Checker: What It Shows', 'This <strong>SERP snippet checker</strong> shows how your title and meta description may look in Google search results, with live character-count warnings, before you publish. It runs in your browser, so nothing you type is sent anywhere.'],
      ['SERP Preview and Google SERP Preview: How Close Is It to Google?', 'It is a close approximation, not a guarantee. Google truncates by pixel width rather than character count and can rewrite your title or description if it decides something else better matches the search, so use the preview to catch obvious cut-offs.'],
      ['SERP Snippet and SEO SERP Snippet: What Google Might Rewrite', 'Google may rewrite titles that do not match the page content, duplicate or templated titles, keyword-stuffed titles, and meta descriptions that do not answer the query. A title that reads naturally for a person survives rewriting better than a keyword list.'],
      ['Free SERP Preview Tool and SERP Preview Tool: No Signup', 'Use it as a free SERP preview tool with no account and nothing to install. Your title and description stay in your browser.'],
      ['Snippet Preview and Google Snippet Preview: What Length to Aim For', 'Google says there is no limit on meta description length, but the snippet is truncated as needed, typically to fit the device width. We aim for titles of 60 characters or fewer and descriptions of about 120 to 155. See our guide to <a href="/blog/meta-description-length">meta description length</a> for the data behind it.'],
      ['SERP Snippet Preview Tool: Write a Title That Will Not Get Cut Off', 'Put your main keyword and most important word near the start, keep the title under about 60 characters where you can, and avoid stacking keywords with pipes just to fit more in. Check the live preview before publishing, and write for a person first.']
    ],
    faqs: [
      ['Is there a free SERP snippet preview tool?', 'Yes. This one is free, needs no signup and previews your title and description in your browser.'],
      ['What length should my meta description be?', 'Google says there is no limit on meta description length, but it truncates the snippet to fit the device width. A target of about 120 to 155 characters keeps most descriptions fully visible.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/meta-description-length', kind: 'Guide', t: 'Meta description length', d: 'What Google says and what 363 real descriptions look like.' },
      { href: '/tools/meta-description-checker', kind: 'Tool', t: 'Meta description checker', d: 'Check length, pixel width and bulk lists.' },
      { href: '/tools/meta-tag-generator', kind: 'Tool', t: 'Meta tag generator', d: 'Write title and description tags with counts.' }
    ]
  }
};
