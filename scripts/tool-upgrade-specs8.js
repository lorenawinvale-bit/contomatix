// Content for scripts/tool-upgrade.js, batch 8 (16 Nov 2026): anchor-text-checker, content-marketing-roi-calculator, meta-description-checker.
// Queries come from Search Console (90 days to 13 Nov 2026) and Ahrefs matching terms, saved in keyword-research/gsc-queries-2026-11-16.md. One natural keyword per H3; statements describe what each tool does (read from its page) or Google guidance already cited on that page.
module.exports = {
  'anchor-text-checker': {
    howTitle: 'Check your anchor text in three steps',
    steps: [
      ['Get the anchors', 'Copy the Top linking text from the Links report in Search Console, or paste the HTML of a page.'],
      ['Add your keywords', 'Enter your brand and target keywords so the tool can tell branded and exact match from the rest.'],
      ['Read the sort', 'See counts for branded, exact match, partial match, naked URL, generic, too long and descriptive anchors.']
    ],
    rqTitle: 'Related Questions About Anchor Text Checking',
    questions: [
      ['Anchor Text Checker: What This Tool Does', 'This <strong>anchor text checker</strong> sorts every link text you give it into branded, exact match, partial match, naked URL, generic, too long and descriptive. It reports counts and flags patterns, and it runs in your browser, so nothing is sent anywhere.'],
      ['Anchor Text Backlink Checker: Where to Get the Anchors', 'For backlinks, open the Links report in Google Search Console and copy Top linking text, or paste the HTML of a page that links to you. For a competitor page, view the source and paste it in. The tool reads every link text it finds.'],
      ['Anchor Text Checker Tool: What Counts as Generic or Too Long', 'Generic means "click here", "read more", "website", "article" and similar, which Google lists as too generic. Too long means ten or more words, which is a working limit of ours, and Google\'s example of a "weirdly long" anchor is a whole sentence.'],
      ['Anchor Text Analysis Tool: What Google Says Good Anchors Are', 'Google says good anchor text is descriptive, reasonably concise and relevant to the page it sits on and the page it links to. It warns against cramming keywords into anchors, noting that keyword stuffing violates its spam policies.'],
      ['Anchor Text Analyzer: Why There Is No Ideal Percentage', 'Google gives no ideal percentage for each anchor type, so this anchor text analyzer reports counts and flags patterns instead of grading you against a ratio. A sudden run of exact-match commercial anchors is the pattern to look at. See <a href="/blog/backlinks-example">backlink examples</a> for what real anchors look like.'],
      ['Anchor Text Tool for Internal Links: Check Your Own Pages', 'Paste the HTML of a page on your own site to check internal anchors, then use the <a href="/tools/internal-link-checker">internal link checker</a> to look at that page\'s links in more detail. Read each anchor out of context: if it makes sense alone, it is a good one.'],
      ['Check Anchor Text and Link Attributes Together', 'To check anchor text on a page and see which links are qualified, use this tool with the <a href="/tools/dofollow-link-checker">dofollow link checker</a>. The tool checks anchors, it does not generate them, so writing a good anchor still starts with describing the page you link to.']
    ],
    faqs: [
      ['Is there a free anchor text checker?', 'Yes. This one is free, needs no signup and runs in your browser, so your links and HTML are not uploaded.'],
      ['Can this tool generate anchor text for me?', 'No. It checks and sorts the anchors you give it. A good anchor is descriptive, reasonably concise and relevant to both pages, and you write it by describing the page you link to.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/internal-link-checker', kind: 'Tool', t: 'Internal link checker', d: 'Check a page\'s links in detail' },
      { href: '/tools/dofollow-link-checker', kind: 'Tool', t: 'Dofollow link checker', d: 'See which links are qualified' },
      { href: '/blog/backlinks-example', kind: 'Guide', t: 'Backlink examples', d: 'What real links and anchors look like' }
    ]
  },
  'content-marketing-roi-calculator': {
    howTitle: 'Work out content marketing ROI in three steps',
    steps: [
      ['Add your costs', 'Enter creation, promotion, tools and the time of your own team.'],
      ['Add your return', 'Enter leads, your close rate and revenue per customer, plus any revenue you can attribute directly.'],
      ['Read the result', 'See ROI as a percentage, whether the content has paid back, cost per lead and customer, and break-even.']
    ],
    rqTitle: 'Related Questions About Content Marketing ROI',
    questions: [
      ['Content Marketing ROI Calculator: What This One Does', 'This <strong>content marketing ROI calculator</strong> adds the cost lines you enter, works out return from leads, close rate and revenue per customer, and shows ROI, cost per lead and customer, and break-even. It runs in your browser and nothing is uploaded.'],
      ['Content Marketing Calculator: The Formula Behind It', 'ROI is (return minus cost) divided by cost, shown as a percentage. If content cost 5,000 and produced 8,000 of revenue, ROI is (8,000 minus 5,000) divided by 5,000, which is 60%. The calculator applies the same formula to your numbers.'],
      ['What Is the ROI of Content Marketing? Why It Is Hard to Pin Down', 'Three things make it slippery: attribution (a customer may read several pages before buying), timing (content often pays back over many months) and cost (people forget their own time, tools and promotion). State your assumptions and re-run it as content ages.'],
      ['How to Measure Content Marketing ROI: Getting the Inputs', 'Count conversions from organic search and the pages you want to measure in Google Analytics, and check lead source in your CRM if you use one. Use your own close rate, not an industry average, and a consistent revenue window, such as first-year revenue.'],
      ['Measuring Content Marketing ROI With Break-Even and Cost per Lead', 'Cost per lead and cost per customer are easier to compare between channels than ROI. Break-even shows how many leads you would have needed at your close rate to cover the cost, which is a useful sanity check before you scale.'],
      ['Content Marketing ROI Over Time: Use a Longer Window', 'Counting years of benefit against one quarter of cost overstates ROI, and a very short window understates it. Re-run the calculator with a longer window as content ages. Our guide to <a href="/blog/cross-channel-attribution">cross channel attribution</a> explains why credit is a choice.'],
      ['Report Content Marketing ROI to a Client or Boss', 'Show the inputs, the formula and your assumptions, not just the percentage. Our <a href="/tools/seo-report-generator">SEO report generator</a> and the <a href="/blog/monthly-seo-report">monthly SEO report</a> guide show how to present results.']
    ],
    faqs: [
      ['Is there a free content marketing ROI calculator?', 'Yes. This one is free, needs no signup and runs in your browser, so your numbers are not uploaded.'],
      ['Should I count my own time as a content cost?', 'Yes. People often count writer fees and forget their own time, tools and promotion, which makes the ROI look better than it is.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/seo-report-generator', kind: 'Tool', t: 'SEO report generator', d: 'Present results to a client' },
      { href: '/blog/monthly-seo-report', kind: 'Guide', t: 'Monthly SEO report', d: 'What to include each month' },
      { href: '/blog/cross-channel-attribution', kind: 'Guide', t: 'Cross channel attribution', d: 'Why credit is a choice' }
    ]
  },
  'meta-description-checker': {
    howTitle: 'Check your meta descriptions in three steps',
    steps: [
      ['Paste your descriptions', 'One per line, or one title | description pair per line.'],
      ['Read the status', 'See length, estimated width, and whether each is short, in range, borderline or too long.'],
      ['Fix and export', 'Fix the flagged ones, check the preview, and download the results as CSV.']
    ],
    rqTitle: 'Related Questions About Meta Description Length',
    questions: [
      ['Meta Description Length Checker: What This Tool Does', 'This <strong>meta description length checker</strong> measures characters including spaces and an estimated pixel width, gives a status for each description, flags duplicates and shows a desktop and mobile preview. It runs in your browser, and nothing is uploaded.'],
      ['Meta Desc Checker: The Status Labels', 'A description is short under 120 characters, in range from 120 to 155, borderline from 156 to 160 and too long over 160. These are working zones from most guides, not Google rules.'],
      ['Meta Length: Characters vs Pixels', 'Search results are cut by width, not by character count, so the tool measures your text in 14px Arial in your browser and shows pixels. Tools and guides quote different limits, from about 920 to 985 pixels for desktop, so treat the number as an estimate.'],
      ['What Google Says About Meta Description Length', 'Google sets no limit. Its page on snippets says there is no limit on how long a meta description can be, but the snippet is truncated as needed, typically to fit the device width. Most guides give 155 to 160 characters as the practical maximum and about 120 for mobile.'],
      ['Check Meta Description Length Along With the Title', 'The tool checks title length against a 60 character target, which is a safe guide and not a Google rule. It also checks that your keyword appears in the title, in the description and in its first 120 characters.'],
      ['Meta Title Length Checker and Common Problems', 'It flags line breaks, HTML tags, double spaces, a description that repeats the title and a word repeated four or more times. Use the <a href="/tools/meta-tag-generator">meta tag generator</a> to write a clean set.'],
      ['Meta Counter and Bulk Check: Many Pages at Once', 'Paste many lines to check them all, sort the duplicates and download a CSV. Our guide to <a href="/blog/meta-description-length">meta description length</a> compares the numbers from eight ranking guides with data from 363 of our posts.']
    ],
    faqs: [
      ['What is the best length for a meta description?', 'Google sets no limit, and the snippet is cut to fit the device width. A working range is 120 to 155 characters, with the key message first, because mobile shows less.'],
      ['Does a short meta description hurt rankings?', 'A short description is not an error, because Google sets no length limit. A clear one gives people a reason to click your result, so use the status labels as guides, not rules.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/blog/meta-description-length', kind: 'Guide', t: 'Meta description length', d: 'Data from 8 guides and 363 posts' },
      { href: '/tools/meta-tag-generator', kind: 'Tool', t: 'Meta tag generator', d: 'Write a clean title and description' },
      { href: '/blog/meta-tags-best-practices', kind: 'Guide', t: 'Meta tags best practices', d: 'What to set and what to skip' }
    ]
  }
};
