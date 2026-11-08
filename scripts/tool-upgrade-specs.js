// Content for scripts/tool-upgrade.js. Queries come from Search Console (90 days to 6 Nov 2026), saved in keyword-research/gsc-tool-queries-2026-11-08.md.
// Every statement describes what the tool does (read from its page and code) or points to our own guides. No competitor names, no invented numbers.
module.exports = {
  'seo-report-generator': {
    howTitle: 'Three steps from Search Console to a finished report',
    steps: [
      ['Copy your numbers', 'In Search Console, open Performance, set the month and note clicks, impressions and average position. Do the same for the previous month.'],
      ['Type them in', 'Enter both periods, then add top pages, the work you did and next priorities. Leave anything you do not have blank.'],
      ['Copy, download or print', 'The report writes itself on the right. Copy it, download a .txt file, or print it and save as PDF.']
    ],
    rqTitle: 'Related Questions About SEO Report Generators',
    questions: [
      ['Free SEO Report Generator: What You Get Without Signing Up', 'This <strong>free SEO report generator</strong> needs no account and no login. You type your Search Console figures into the form, and the report is written in your browser, so nothing is uploaded or stored. You can copy the text, download it as a .txt file or print it to PDF.'],
      ['Website SEO Report Generator: Why You Enter the Numbers Yourself', 'A website SEO report generator can mean two things. This one writes a <em>performance</em> report from Search Console figures you type in, so it does not crawl your site or connect to your account. If you want to check a page\'s title, headings, canonical and links instead, use our <a href="/tools/technical-seo-audit-tool">technical SEO audit tool</a>, and see the <a href="/blog/seo-audit-report-template">SEO audit report template</a> for how to write the findings up.'],
      ['SEO Analysis Report Generator: What Gets Analysed', 'The analysis is simple and visible. The generator works out the change in clicks, impressions and position against the previous period, calculates click-through rate from clicks and impressions, sorts your top pages by clicks and writes a short "what stood out" section from those numbers only. It does not guess at causes, so add your own explanation before you send it.'],
      ['Generate an SEO Report Online: Step by Step', 'Open Search Console and choose Performance, then Search results. Set the date range to the month you are reporting on and note the four totals, then change the range to the previous month and note them again. Enter both sets above, add your top pages and the work done, and the report is ready to copy. The <a href="/blog/monthly-seo-report">monthly SEO report guide</a> explains what each section should say.'],
      ['SEO Report Creator for Clients: What to Add by Hand', 'The numbers are the easy part. What a client reads is the work you completed and what you plan next, so fill in "work completed" and "next priorities" in plain words, and add the business result you track, such as enquiries or sales. A report that links traffic to a result is easier to defend than one that shows traffic alone.']
    ],
    faqs: [
      ['Is there a free SEO report generator with no signup?', 'Yes. This one is free, needs no account and runs in your browser. You enter the figures yourself, so it never asks for access to Search Console.'],
      ['Does this website SEO report generator crawl my site?', 'No. It writes a performance report from the Search Console numbers you type in. To check a page\'s on-page SEO, use the technical SEO audit tool linked below.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/monthly-seo-report', kind: 'Guide', t: 'Monthly SEO report', d: 'What each section of a monthly report should say.' },
      { href: '/tools/technical-seo-audit-tool', kind: 'Tool', t: 'Technical SEO audit tool', d: 'Check a page\'s title, headings, canonical and links.' },
      { href: '/blog/search-console-impressions-explained', kind: 'Guide', t: 'Search Console impressions explained', d: 'What the impressions figure in your report counts.' }
    ]
  },

  'dofollow-link-checker': {
    howTitle: 'Check every link on a page in three steps',
    steps: [
      ['Copy the page HTML', 'Open the page, view its source and copy the HTML. You can also paste just the part of the page that holds the links.'],
      ['Paste it in', 'Paste the HTML into the box. The check runs in your browser, so nothing is uploaded.'],
      ['Read the link list', 'Each link is marked followed, nofollow, sponsored or ugc, and internal or external. A page-level robots nofollow is flagged too.']
    ],
    rqTitle: 'Related Questions About Dofollow and Nofollow Checkers',
    questions: [
      ['Nofollow Link Checker: How Each Link Is Marked', 'The checker reads the rel attribute of every link in the HTML you paste. Links with nofollow, sponsored or ugc are marked as such, and a link without any of those values is shown as followed. It also checks the robots meta tag, because a page-level nofollow changes every link on the page.'],
      ['Dofollow Link Checker Online: Paste the HTML, No Install', 'This <strong>dofollow link checker online</strong> needs no extension and no account. Paste the page HTML and the report appears instantly, with each link\'s URL, anchor, rel value and whether it is internal or external.'],
      ['Check Nofollow Backlinks: What This Tool Can and Cannot See', 'To check how a backlink to your site is marked, open the page that links to you, copy its HTML and paste it here, then find your link in the list. The tool cannot discover backlinks by itself, because it only reads the HTML you give it. Our guide on how to <a href="/blog/check-backlinks-of-website">check backlinks of a website</a> shows where to find the linking pages first.'],
      ['Dofollow vs Nofollow Checker: Do the Labels Matter?', '"Dofollow" is not an HTML value. A link is followed by default and only changes when the rel attribute says nofollow, sponsored or ugc, the values Google documents. Whether a nofollow link still helps your SEO is a separate question, covered in <a href="/blog/do-nofollow-links-help-seo-2026">do nofollow links help SEO</a>.'],
      ['Do Follow Checker for a Whole Page, Not One Link at a Time', 'Instead of inspecting one link in the browser, paste the full page and see every link in one list. That makes it quick to spot paid placements without a sponsored value, or a footer full of followed links. For a view grouped by domain, use the <a href="/tools/outbound-link-checker">outbound link checker</a>.']
    ],
    faqs: [
      ['Can I use this as a free nofollow links checker?', 'Yes. It lists every link on the page you paste with its rel value, so nofollow, sponsored and ugc links are easy to pick out. It is free and runs in your browser.'],
      ['How do I check if a backlink is dofollow or nofollow?', 'Open the page that links to you, copy its HTML and paste it into this tool. Find your link in the list: if it shows nofollow, sponsored or ugc it is marked that way, and otherwise it is followed.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/do-nofollow-links-help-seo-2026', kind: 'Guide', t: 'Do nofollow links help SEO?', d: 'What nofollow, sponsored and ugc mean for rankings.' },
      { href: '/tools/outbound-link-checker', kind: 'Tool', t: 'Outbound link checker', d: 'Group a page\'s external links by domain.' },
      { href: '/blog/check-backlinks-of-website', kind: 'Guide', t: 'Check backlinks of a website', d: 'Four free ways to find who links to you.' }
    ]
  },

  'llm-seo-checker': {
    howTitle: 'Run an AI crawler check in three steps',
    steps: [
      ['Copy your robots.txt', 'Open yourdomain.com/robots.txt in a browser and copy the whole file.'],
      ['Paste it in', 'Paste it into the box. The tool does not fetch your file for you, and nothing leaves your browser.'],
      ['Read the verdicts', 'Each of the 11 AI crawlers is marked allowed or blocked, with a count such as "9 of 11 AI crawlers allowed".']
    ],
    rqTitle: 'Related Questions About LLM SEO Checkers',
    questions: [
      ['LLM SEO Checker: What It Checks', 'This <strong>LLM SEO checker</strong> checks one thing precisely: whether your robots.txt lets the main AI crawlers read your site. It covers 11 of them, from OpenAI, Anthropic, Perplexity, Google, Apple and Common Crawl, and shows which are allowed and which are blocked.'],
      ['LLM SEO Check: What a Robots.txt Check Cannot Tell You', 'Access is the first condition for being cited, not a guarantee of it. A robots.txt check cannot tell you whether an AI assistant mentions your brand, or how your pages are written. For that side of the work, read <a href="/blog/what-is-llm-seo-2026">what is LLM SEO</a> and <a href="/blog/how-to-get-cited-by-chatgpt-2026">how to get cited by ChatGPT</a>.'],
      ['LLM SEO Checking Tool: How to Run the Check', 'Copy your robots.txt from yourdomain.com/robots.txt and paste it into the box. The report lists every crawler with its company and purpose, such as model training, search citations or live user requests, so you can see which parts of your access are open and which are closed.'],
      ['LLM SEO Checkers: Why One Crawler Can Be Blocked While Another Is Not', 'The crawlers do different jobs, so a site can allow search citations and still block training. Blocking GPTBot is not the same as blocking ChatGPT-User, and Google-Extended works differently from the rest, as the sections above explain.'],
      ['LLM SEO Analysis Tool: Where This Fits in Your Workflow', 'Use this check after you edit robots.txt, and test individual URLs with the <a href="/tools/robots-txt-tester">robots.txt tester</a>. If you want to give AI assistants a plain-language map of your site, build one with the <a href="/tools/llms-txt-generator">llms.txt generator</a>.']
    ],
    faqs: [
      ['Is there a free LLM SEO checker?', 'Yes. This one is free, needs no signup and runs in your browser. You paste your robots.txt and it shows which AI crawlers can read your site.'],
      ['Does an LLM SEO check tell me if ChatGPT cites my site?', 'No. It checks whether your robots.txt allows AI crawlers to read your pages, which is only the first step. Whether you are cited depends on your content and your authority.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/what-is-llm-seo-2026', kind: 'Guide', t: 'What is LLM SEO?', d: 'The four pillars of LLM visibility.' },
      { href: '/tools/robots-txt-tester', kind: 'Tool', t: 'Robots.txt tester', d: 'Test individual URLs against your rules.' },
      { href: '/tools/llms-txt-generator', kind: 'Tool', t: 'llms.txt generator', d: 'Build a plain-language map of your site for AI.' }
    ]
  }
};
