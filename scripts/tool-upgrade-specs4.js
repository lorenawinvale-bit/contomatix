// Content for scripts/tool-upgrade.js, batch 4 (11 Nov 2026): heading-checker, redirect-mapper, keyword-mapping-tool.
// Queries come from Search Console (90 days to 9 Nov 2026) and Ahrefs matching terms, saved in keyword-research/gsc-queries-2026-11-11.md. One natural keyword per H3; statements describe what each tool does (read from its page) or Google/W3C guidance already cited on that page.
module.exports = {
  'heading-checker': {
    howTitle: 'Check a page\'s headings in three steps',
    steps: [
      ['Copy the page HTML', 'View the page source and copy the HTML. If headings are added by scripts, copy the rendered HTML from the developer tools instead.'],
      ['Paste it in', 'Paste the HTML into the box. The check runs in your browser and nothing is uploaded.'],
      ['Read the outline', 'Every H1 to H6 appears as an indented outline, with flags for skipped levels, empty headings and repeated text.']
    ],
    rqTitle: 'Related Questions About Heading Checkers',
    questions: [
      ['H1 Checker: What This Tool Finds', 'This <strong>H1 checker</strong> pulls out every H1 to H6 heading in page order and shows them as an indented outline. It flags skipped levels, a missing H1 or a first heading that is not top-level, empty headings, repeated heading text and very long headings over 70 characters.'],
      ['H1 Tag Checker: Is More Than One H1 Allowed?', 'Yes. Google does not prescribe a number of headings, and a second H1 does not break anything for Search. Many teams still use one H1 per page so the main topic is obvious, which is why the tool reports extra H1s as a note rather than an error.'],
      ['Check H1 H2 Tags: Why You Paste HTML', 'Browsers block most cross-site requests to other people\'s pages, and pasting also keeps your page off every server. Use View Page Source, copy the HTML and paste it. Headings built later by scripts only appear if you copy the rendered HTML from the developer tools.'],
      ['Headings Checker: Skipped Levels and Accessibility', 'A skipped level is an H2 followed directly by an H4. The W3C advises avoiding skipped ranks because it can confuse people who navigate by headings, while Google says it does not matter for Search if headings are used out of order. The tool labels each finding as an accessibility issue or a style note, not a ranking error.'],
      ['Heading Checker: Do Headings Matter for SEO?', 'Less than most checklists suggest. Google\'s SEO Starter Guide says there is no ideal number of headings a page should have, and the case for tidy headings is mostly about people: headings in semantic order help screen readers, and a clear outline makes a long page easier to scan.'],
      ['Heading Tag Checker: Write Headings That Describe the Section', 'Use words that describe the section honestly. A heading that reads naturally and tells the reader what follows will usually contain the relevant terms without forcing them in. For a wider on-page review, use our <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a> and the <a href="/blog/on-page-seo-checklist">on-page SEO checklist</a>.']
    ],
    faqs: [
      ['Is there a free H1 checker?', 'Yes. This one is free, needs no signup and checks the HTML you paste in your browser.'],
      ['Can I check the headings of a live page by URL?', 'Not by URL. Copy the page\'s HTML with View Page Source and paste it, because browsers block most cross-site requests and pasting keeps your page private.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/on-page-seo-checklist', kind: 'Guide', t: 'On-page SEO checklist', d: 'The page-level checks that go beyond headings.' },
      { href: '/tools/technical-seo-audit-tool', kind: 'Tool', t: 'Technical SEO audit tool', d: 'Check title, canonical, structured data and links.' },
      { href: '/tools/internal-link-checker', kind: 'Tool', t: 'Internal link checker', d: 'Audit the links and anchors on a page.' }
    ]
  },

  'redirect-mapper': {
    howTitle: 'Map old URLs to new URLs in three steps',
    steps: [
      ['Paste your old URLs', 'Add the list of old addresses, one per line, from your crawl or sitemap.'],
      ['Paste your new URLs', 'Add the new addresses. The tool matches each old page to its closest new one.'],
      ['Review and copy the rules', 'Check the Review and No match rows, then copy the 301 rules for Apache or Nginx, or download the CSV.']
    ],
    rqTitle: 'Related Questions About Redirect Mapping',
    questions: [
      ['URL Redirect Mapper: What It Does', 'This <strong>URL redirect mapper</strong> matches each old page to its closest new page, flags weak matches and chains, and gives you ready-to-paste 301 rules for Apache or Nginx plus a CSV. It runs in your browser, so your URLs are never uploaded.'],
      ['Redirect Mapping Tool: How the Matching Works', 'Each URL is reduced to its path, ignoring the domain, query string, fragment, letter case, trailing slash and extensions such as .html and .php. An old path that appears unchanged in the new list is an exact match. Otherwise the tool compares the words in the two paths and picks the new URL with the highest overlap.'],
      ['Redirect Match: Match, Review or No Match', 'A strong match is marked Match, a partial one is marked Review, and anything weaker is marked No match, so you decide it by hand instead of sending visitors to something irrelevant. The matching uses words in the URL only and does not read your pages, so check the weaker matches against the actual content.'],
      ['Redirect Mapper: Why Some Old URLs Stay Unmatched', 'No new URL shared enough words with them. Google\'s site move guidance says not to send many old URLs to one irrelevant destination such as the new homepage, which can be treated as a soft 404, so unmatched URLs are listed for you to map by hand or retire.'],
      ['Redirect Mapping for a Site Move', 'A redirect map says which new page each old page should send visitors and search engines to. For a site move Google recommends permanent server-side redirects where possible and keeping them for as long as possible, generally at least a year. See our <a href="/blog/seo-site-migration">site migration guide</a>.'],
      ['Redirect Map Generator: Chains and Merges', 'The tool flags a target that is itself an old URL, which would create a redirect chain, and counts how many old pages point at the same new page so you can confirm a merge was intended. If a redirect misbehaves later, see <a href="/blog/301-redirect-not-working">301 redirect not working</a>.']
    ],
    faqs: [
      ['Is there a free redirect map generator?', 'Yes. This one is free, needs no signup and builds the map and the Apache or Nginx rules in your browser.'],
      ['Does the redirect mapper use 301 or 302 rules?', 'It writes 301 rules, a permanent redirect, which is what Google recommends for a permanent move. Change the code yourself if you need a temporary redirect, and see our <a href="/blog/301-vs-302-redirect">301 vs 302 guide</a>.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/seo-site-migration', kind: 'Guide', t: 'SEO site migration', d: 'Plan a move without losing search traffic.' },
      { href: '/blog/301-redirect-not-working', kind: 'Guide', t: '301 redirect not working', d: 'The usual causes, in the order to check them.' },
      { href: '/tools/sitemap-validator', kind: 'Tool', t: 'Sitemap validator', d: 'Check the new sitemap lists final URLs.' }
    ]
  },

  'keyword-mapping-tool': {
    howTitle: 'Map keywords to pages in three steps',
    steps: [
      ['Paste your keywords', 'Add one keyword per line. Add a comma and a number after a keyword if you want to include search volume.'],
      ['Paste your page URLs', 'Add your page URLs, with an optional title for each, so the tool has more words to match.'],
      ['Read the map and export it', 'See which keyword fits which page, which need a new page, and download the result as a CSV.']
    ],
    rqTitle: 'Related Questions About Keyword Mapping',
    questions: [
      ['Keyword Mapping Tool: What It Does', 'This <strong>keyword mapping tool</strong> matches each keyword to the page it fits best, flags keywords that need a new page, and warns about near-duplicate keywords that could compete. People also search for it as keywordmapping or keyword mapping software. It runs in your browser with no signup.'],
      ['Keyword Mapping Generator: How the Matching Works', 'Each keyword is compared word by word with the words in a page\'s URL and its title, if you add one. Stop words are ignored and simple plurals count as the same word. A strong match is mapped, a partial match is marked for review, and no match means the keyword probably needs a new page, for which the tool proposes a clean slug.'],
      ['Keyword Map Tool: Near-Duplicate Keywords', 'Keywords made of the same words in a different order, such as seo for restaurants and restaurant seo, are grouped so you can target them with one page. Any URL that no keyword matched is listed too, which often points to thin pages or pages that could be merged.'],
      ['Keyword Mapper: What a Keyword Map Is For', 'A keyword map links each search term you want to win to one page that should answer it. It prevents two problems: leaving good keywords without a page, and publishing several pages that chase the same search. Neither is a Google rule, it is a planning habit that is easiest before you write.'],
      ['SEO Keyword Mapping Tool: What It Cannot Judge', 'It matches on words alone, so it cannot judge search intent. A keyword like plumber salary shares a word with plumber near me but needs a different kind of page. Treat the result as a draft and check anything marked for review against what the page says. See <a href="/blog/content-gap-analysis">content gap analysis</a> for the next step.'],
      ['Keyword Mapping Tool Free: Add Volume and Export', 'It is a free keyword mapping tool with no limit of its own, and a few hundred keywords and pages work comfortably. Add search volume after a comma and it appears in the table and the CSV, with the biggest keywords first inside each group. Group related terms first with the <a href="/tools/keyword-grouping-tool">keyword grouping tool</a>, or choose research sources in our <a href="/blog/keyword-research-tools">keyword research tools</a> guide.']
    ],
    faqs: [
      ['Is there a free keyword mapping tool?', 'Yes. This one is free, needs no signup and maps your keywords to your pages in your browser, with a CSV export.'],
      ['Does keyword mapping check search intent?', 'No. This tool matches keywords to the words in your URLs and titles only, so check intent yourself before you create or merge a page.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/keyword-grouping-tool', kind: 'Tool', t: 'Keyword grouping tool', d: 'Group related keywords before you map them.' },
      { href: '/blog/keyword-research-tools', kind: 'Guide', t: 'Keyword research tools', d: 'Where to find the keywords worth mapping.' },
      { href: '/blog/topical-map-seo', kind: 'Guide', t: 'Topical map SEO', d: 'Plan a full set of pages around one topic.' }
    ]
  }
};
