// Content for scripts/tool-upgrade.js, batch 6 (14 Nov 2026): backlink-monitor-tool, llms-txt-generator, geo-grid-rank-planner.
// Queries come from Search Console (90 days to 12 Nov 2026), saved in keyword-research/gsc-queries-2026-11-14.md. One natural keyword per H3; statements describe what each tool does (read from its page) or Google guidance already cited on that page.
module.exports = {
  'backlink-monitor-tool': {
    howTitle: 'Monitor your backlinks in three steps',
    steps: [
      ['Add each link', 'Enter the linking page, your page, the anchor, how you got it (placed, earned or paid), the cost and the date.'],
      ['Check it is still live', 'Paste the linking page\'s source. The tool looks for a link to your page and reads its rel attribute. It never visits any URL.'],
      ['Read the summary', 'See live rate, referring domains and cost per live link, then download the CSV for your records.']
    ],
    rqTitle: 'Related Questions About Backlink Monitoring',
    questions: [
      ['Backlink Monitor: What This Tool Does', 'This <strong>backlink monitor</strong> is a log you keep. You add links you know about, check each one by pasting the linking page\'s HTML, and the tool tracks status, source, attribute, referring domains and cost per live link. It is stored in your browser and nothing is uploaded.'],
      ['Backlinks Monitor Tool: What It Does Not Do', 'It does not find backlinks for you, and it does not visit pages. It reads only the HTML you paste, so it cannot report on a page you have not pasted. Use it alongside Google\'s Links report, not as a replacement for a crawler.'],
      ['Backlink Monitor Tool: Reading the Summary', 'The summary shows how many links are live, how many referring domains you have (ten links from one site are one source), how many point to your home page and how many to inner pages, and your cost per live link, which is your total spend divided by links confirmed live.'],
      ['Monitor Backlink Status: Live, Lost or Not Checked', 'Each link is marked live, lost or not checked. A link counts as live only after you paste the page source and the tool finds it, so a link you have never checked stays not checked instead of being assumed live.'],
      ['Monitor Backlinks Free: How the Log Is Stored', 'The tool is free, needs no account and keeps the log in your browser\'s local storage on this device. Clearing site data removes it, so download the CSV as a backup, or to share with a client.'],
      ['Monitor Backlinks Tool or Tools: What Else You Need', 'A log answers where a link came from, what it cost and whether the page still carries it. To find new links, start with the <a href="/blog/check-backlinks-of-website">free ways to check backlinks</a>. To check a page\'s link attributes, use the <a href="/tools/dofollow-link-checker">dofollow link checker</a>.'],
      ['Backlink Monitor Software vs a Spreadsheet', 'A spreadsheet works for a few links. This tool adds the live check, the rel attribute reading and the totals, and exports to CSV, so you can still move to a spreadsheet. For a client report, our <a href="/blog/backlinks-report">backlinks report</a> guide shows what to include.']
    ],
    faqs: [
      ['Is there a free backlink monitor?', 'Yes. This one is free, needs no signup and runs in your browser. It works as a log you keep, not an automatic crawler.'],
      ['How often should I check my backlinks?', 'Check a new link after a few weeks to confirm it is live and see what the rel attribute says, then review the log monthly, looking at live rate and cost per live link.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/check-backlinks-of-website', kind: 'Guide', t: 'How to check backlinks', d: 'Four free ways to find the links you have' },
      { href: '/blog/backlinks-report', kind: 'Guide', t: 'Backlinks report', d: 'What to put in a link report' },
      { href: '/tools/dofollow-link-checker', kind: 'Tool', t: 'Dofollow link checker', d: 'Read link attributes on a page' }
    ]
  },
  'llms-txt-generator': {
    howTitle: 'Build an llms.txt file in three steps',
    steps: [
      ['Fill in the form', 'Add your site name, a short summary and your key pages, one per line as Label | URL | Description.'],
      ['Download the file', 'The tool writes a valid llms.txt in your browser. Nothing is uploaded.'],
      ['Upload it to your root', 'Put it where robots.txt lives, so it loads at yoursite.com/llms.txt.']
    ],
    rqTitle: 'Related Questions About llms.txt Files',
    questions: [
      ['LLMs.txt Generator: What This Tool Does', 'This <strong>llms.txt generator</strong> turns a short form into a valid file: a plain-language summary of your site and a list of key pages. It runs in your browser and the file is yours to edit. Google says llms.txt files are not needed for Google Search.'],
      ['LLMs Txt Generator Free and Without Signup', 'The tool is free, needs no account and does not send your text anywhere. Download the file, rename it to exactly llms.txt if your browser changed the name, and upload it to your site\'s root.'],
      ['Free llms.txt Creator: What Goes in the File', 'A short description of your site, then your most useful pages as one line each with a label, a URL and a short description. Pages that matter less can go in an Optional section.'],
      ['Generate llms.txt Free: Checking the File', 'After uploading, open yoursite.com/llms.txt in a browser to confirm it loads as plain text. Update it whenever your key pages or offerings change, as you would a sitemap.'],
      ['LLM Txt Generator: Does the File Do Anything?', 'It is a voluntary convention, and not every AI system reads it. Google says llms.txt files do not positively or negatively impact visibility or rankings in Google Search, though it is fine to keep one for other services that use them.'],
      ['Humans Txt Generator: Not the Same File', 'A humans.txt file is a different convention, usually a credits note about the people who built a site. llms.txt is a summary written for AI tools. This generator makes llms.txt only.'],
      ['LLMs Text Generator vs robots.txt and sitemap.xml', 'robots.txt sets which pages crawlers may access, and a sitemap lists URLs for search engines. llms.txt controls no access. Build the other two with our <a href="/tools/robots-txt-generator">robots.txt generator</a> and <a href="/tools/sitemap-generator">sitemap generator</a>.']
    ],
    faqs: [
      ['Do I need an llms.txt file for Google?', 'No. Google says llms.txt files are not needed for Google Search. Add one only if you want to give other tools a summary of your site.'],
      ['Where does the llms.txt file go?', 'In your site\'s root directory, the same place as robots.txt, so it loads at yoursite.com/llms.txt.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/what-is-llm-seo-2026', kind: 'Guide', t: 'What is LLM SEO?', d: 'What earns mentions in AI answers' },
      { href: '/tools/robots-txt-generator', kind: 'Tool', t: 'Robots.txt generator', d: 'Control what crawlers can access' },
      { href: '/tools/sitemap-generator', kind: 'Tool', t: 'Sitemap generator', d: 'List your URLs for search engines' }
    ]
  },
  'geo-grid-rank-planner': {
    howTitle: 'Plan a geo-grid check in three steps',
    steps: [
      ['Set the centre and grid', 'Enter your keyword and the coordinates of your business, then pick 3 x 3, 5 x 5 or 7 x 7.'],
      ['Check each point', 'Every cell opens Google Maps centred on that point. Type the organic rank you see.'],
      ['Read the heatmap', 'Get an average rank, top-3 and top-10 coverage and a heatmap to screenshot.']
    ],
    rqTitle: 'Related Questions About Geo-Grid Rank Checks',
    questions: [
      ['Geo Rank Checker: What This Planner Does', 'This <strong>geo rank checker</strong> builds the grid and the Google Maps links, then scores the ranks you type in. You do the checking and the tool does the layout and the maths. It is not an automatic tracker.'],
      ['GMB Ranking: Why It Differs Across Town', 'Google says local results are based mainly on relevance, distance and prominence. A business can rank first beside its own door and nowhere on the other side of town, which is what the grid is meant to show.'],
      ['Local SEO Grid Tool: How to Choose a Grid', '3 x 3 is a quick check, 5 x 5 suits most local businesses and 7 x 7 gives more detail but means 49 manual checks. A 5 x 5 grid with 1 mile between points covers about 4 miles in each direction.'],
      ['Geo Grid Rank Tracker: Compare Like With Like', 'The numbers are a snapshot, and your account, device, location and the time of day can change what you see. To track change, repeat the same keyword on the same grid before and after a real improvement.'],
      ['Grid Checker and Google Map Rank Checker: Count Organic Only', 'When you read a rank, count only organic listings. Paid listings are labelled Sponsored and sit above them, so skip those.'],
      ['Grid Rank Tracking and GMB Heat Map Tracker: Reading Colours', 'The heatmap colours each point by your rank, so strong areas and weak areas stand out. Screenshot it for a client report or a before-and-after comparison.'],
      ['Geo Grid Ranking Next Steps: Fixing Weak Areas', 'Google says there is no way to request or pay for a better local ranking, so use the grid to find weak areas and track the effect of real improvements. Our <a href="/blog/local-seo-for-small-business">local SEO guide</a> and <a href="/blog/local-seo-reporting">local SEO reporting</a> guide cover the next steps.']
    ],
    faqs: [
      ['Is there a free geo grid rank checker?', 'Yes. This planner is free and needs no signup. It builds the grid and Google Maps links, and you type in the ranks you see.'],
      ['How often should I repeat a grid check?', 'Repeat it with the same keyword and grid before and after a change you made, so the two snapshots can be compared fairly.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/local-seo-for-small-business', kind: 'Guide', t: 'Local SEO for small business', d: 'The basics of ranking locally' },
      { href: '/blog/local-seo-reporting', kind: 'Guide', t: 'Local SEO reporting', d: 'What to track and show' },
      { href: '/blog/local-keyword-research', kind: 'Guide', t: 'Local keyword research', d: 'Choose the terms to check' }
    ]
  }
};
