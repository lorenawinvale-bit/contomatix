// Content for scripts/tool-upgrade.js, batch 7 (15 Nov 2026): keyword-grouping-tool, hreflang-generator, sitemap-finder.
// Queries come from Search Console (90 days to 13 Nov 2026), saved in keyword-research/gsc-queries-2026-11-15.md. One natural keyword per H3; statements describe what each tool does (read from its page) or Google guidance already cited on that page.
module.exports = {
  'keyword-grouping-tool': {
    howTitle: 'Group your keywords in three steps',
    steps: [
      ['Paste your keywords', 'One per line, with a search volume after each if you have it. A few thousand work fine.'],
      ['Read the groups', 'The tool builds groups around shared words, picks a primary keyword and tags intent.'],
      ['Copy or download', 'Copy the result or download a CSV with group, keyword, volume, intent and a primary flag.']
    ],
    rqTitle: 'Related Questions About Keyword Grouping',
    questions: [
      ['Keyword Grouping Tool: What This One Does', 'This <strong>keyword grouping tool</strong> finds the word or two-word phrase that the most ungrouped keywords share, builds a group around it and repeats. It picks a primary keyword for each group, tags intent, adds up volume and flags word-order duplicates. It runs in your browser and nothing is uploaded.'],
      ['Group Keywords: One Group, One Page', 'To group keywords well, treat each group as one page, with the primary keyword in the title and the rest as headings or FAQs. If a group mixes "how to" with "best" or "price" keywords, they may need separate pages. Check the ungrouped list too: leftovers are either one-offs worth a page or terms to drop.'],
      ['Keyword Grouper: How the Primary Keyword Is Chosen', 'With volumes, a keyword grouper like this one picks the highest-volume keyword in each group. Without volumes it picks the shortest keyword, and the tool still groups. It also adds up each group\'s volume so you can see which groups deserve a page first.'],
      ['Free Keyword Grouper: Limits to Know About', 'This free keyword grouper uses word overlap, not search results. It cannot tell that two keywords with no shared words are served by the same ranking pages, so treat the groups as a first draft and search each primary keyword to check whether the same pages rank for the others.'],
      ['Keyword Grouper Tool vs Semantic Clustering', 'A keyword grouper tool like this groups by shared words and phrases. Semantic or SERP-based clustering compares the pages that rank for each keyword, which needs search data that a browser tool does not have. Use this for a quick first pass.'],
      ['Keyword Grouping for SEO: What to Do Next', 'Match each group to a URL with the <a href="/tools/keyword-mapping-tool">keyword mapping tool</a>, check no existing page already targets the primary keyword, and read our guide to a <a href="/blog/topical-map-seo">topical map for SEO</a> for the bigger picture.'],
      ['Free Keyword Grouping Tool: Output and Privacy', 'The free keyword grouping tool gives a copyable result or a CSV, and everything is processed in your browser with JavaScript. Nothing is uploaded, logged or stored on any server, including ours.']
    ],
    faqs: [
      ['Is there a free keyword grouping tool?', 'Yes. This one is free, needs no signup and runs in your browser, so your keyword list never leaves your device.'],
      ['Can I group keywords without search volume?', 'Yes. Without volumes the tool still groups and picks the shortest keyword in each group as the primary one. With volumes it picks the highest-volume keyword.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/keyword-mapping-tool', kind: 'Tool', t: 'Keyword mapping tool', d: 'Match each group to one URL' },
      { href: '/blog/topical-map-seo', kind: 'Guide', t: 'Topical map SEO', d: 'Plan pillars, clusters and links' },
      { href: '/blog/content-gap-analysis', kind: 'Guide', t: 'Content gap analysis', d: 'Find what your site is missing' }
    ]
  },
  'hreflang-generator': {
    howTitle: 'Generate hreflang tags in three steps',
    steps: [
      ['List your versions', 'Add the URL of each language or regional version of the page.'],
      ['Set the codes', 'Choose a language code, plus a region code if you target a country, and an x-default fallback.'],
      ['Paste the full block', 'Copy the output and paste the same block on every version, self-reference included.']
    ],
    rqTitle: 'Related Questions About Hreflang Tags',
    questions: [
      ['Hreflang Generator: What This Tool Does', 'This <strong>hreflang generator</strong> writes the full set of annotations for every URL, so you do not hand-write them and miss a return link. It outputs every row for every page, so the self-reference is always included, and it flags common mistakes as you type.'],
      ['Hreflang Tag Generator: What a Tag Looks Like', 'A hreflang tag is a rel="alternate" hreflang="..." annotation that tells Google a page has equivalent versions in other languages or for other regions. A hreflang tag generator saves typing and catches typos. Hreflang is a hint, not a command, and it does not change rankings by itself.'],
      ['Hreflang Code Generator: Language and Region Codes', 'A language code such as en, fr or es targets all speakers of a language. Add a region such as en-GB or es-MX to target a country, language first. x-default marks the fallback page for visitors who match no listed version.'],
      ['Hreflang Tags Generator: Why Return Links Matter', 'Hreflang must be reciprocal. If your English page points to your French page, the French page must point back to English and to every other version. Google\'s documentation says non-reciprocal annotations may be ignored, which is the most common reason hreflang fails silently.'],
      ['Sitemap Hreflang Generator: HTML, Sitemap or Header', 'You can place hreflang in HTML link tags, in XML sitemap annotations or in an HTTP header. HTML tags suit small sites, sitemaps are easier at scale, and headers are the only option for PDFs. Pick one method per site, and check a sitemap version with our <a href="/tools/hreflang-sitemap-validator">hreflang sitemap validator</a>.'],
      ['Href Lang Generator: Mistakes It Flags', 'It flags wrong region codes (en-UK is invalid, the UK code is en-GB), a region without a language, relative URLs, duplicate language entries and underscores instead of hyphens. Always use fully qualified URLs starting with https://.'],
      ['Hreflang Tag Generator Tool: Canonical Tags and Spanish Sites', 'Each version should carry a canonical tag pointing to itself, not to another language, or the hreflang pair breaks. See our guides to <a href="/blog/canonical-hreflang">canonical and hreflang</a> together and <a href="/blog/hreflang-spanish">hreflang for Spanish</a> if you are mapping es, es-ES and es-MX.']
    ],
    faqs: [
      ['Is the hreflang generator free?', 'Yes. It is free, needs no signup and runs in your browser, so your URLs are not uploaded.'],
      ['Where do I put the generated hreflang tags?', 'Paste the full block unchanged on each version of the page, in the head for HTML tags. If you chose sitemap annotations or HTTP headers, use that format instead and do not mix methods.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/hreflang-sitemap-validator', kind: 'Tool', t: 'Hreflang sitemap validator', d: 'Check sitemap annotations' },
      { href: '/blog/canonical-hreflang', kind: 'Guide', t: 'Canonical vs hreflang', d: 'Two different jobs' },
      { href: '/blog/hreflang-spanish', kind: 'Guide', t: 'Hreflang for Spanish', d: 'es, es-ES and es-MX' }
    ]
  },
  'sitemap-finder': {
    howTitle: 'Find a sitemap in three steps',
    steps: [
      ['Enter the domain', 'Type the website address you want to check.'],
      ['Open the places to look', 'The tool lists robots.txt and the common sitemap paths, with links to open each one.'],
      ['Check what you found', 'Paste a robots.txt to extract its Sitemap lines, then validate the file.']
    ],
    rqTitle: 'Related Questions About Finding a Sitemap',
    questions: [
      ['Sitemap Finder: What This Tool Does', 'This <strong>sitemap finder</strong> lists where to look for a website\'s sitemap and gives you links to open. It does not fetch the sitemap for you, because browsers block one site from reading another\'s files. You can paste a robots.txt to have its Sitemap lines extracted and checked.'],
      ['How to Find the Sitemap of a Website', 'Open the robots.txt first, where a Sitemap line is the site\'s own statement. Then try /sitemap.xml, /sitemap_index.xml, /wp-sitemap.xml and /sitemap-index.xml, and run a site: search in Google. If it is your own site, open Sitemaps in Search Console.'],
      ['How to Find a Website\'s Sitemap: The Common Paths', 'Most often it is /sitemap.xml. Sites using Yoast SEO or Rank Math usually serve /sitemap_index.xml, and WordPress itself serves /wp-sitemap.xml. In our check of 66 business sites on 20 October 2026, 44 answered at /sitemap.xml.'],
      ['How to Find a Sitemap: What Our Check of 66 Sites Found', '47 of 66 sites (71 percent) had a working sitemap at one of the common places. 39 robots.txt files declared a sitemap, and 11 sites had a working sitemap that robots.txt never mentioned, so check both the robots.txt and the common paths.'],
      ['What Is My Sitemap URL? Check Your Own Property', 'If you cannot remember, open Sitemaps in Google Search Console to see what has been submitted, and open your robots.txt to see what you declared. The Sitemap line must be a full, absolute URL including https and the domain.'],
      ['Find Website Sitemap Online and Get Sitemap Files', 'Once you find the file, paste it into the <a href="/tools/sitemap-validator">sitemap validator</a>, then use the <a href="/tools/sitemap-url-extractor">sitemap URL extractor</a> to turn it into a clean list. Large sites use a sitemap index, and a single sitemap is limited to 50MB uncompressed or 50,000 URLs.'],
      ['Find a Sitemap for a Website That Has None', 'A site may have none, or one at an unusual address. Not having a sitemap does not stop a site being crawled, but it helps search engines find pages. To make one, use the <a href="/tools/sitemap-generator">sitemap generator</a> and read how to <a href="/blog/how-to-create-a-sitemap">create a sitemap</a>. Find sitemap of website questions end here.']
    ],
    faqs: [
      ['Where is a website\'s sitemap usually located?', 'Most often at /sitemap.xml. WordPress sites with Yoast SEO or Rank Math usually use /sitemap_index.xml, and WordPress itself serves /wp-sitemap.xml. The robots.txt file may also list it.'],
      ['Can a site have more than one sitemap?', 'Yes. Large sites use a sitemap index that lists several sitemap files, and a single sitemap is limited to 50MB uncompressed or 50,000 URLs.']
    ],
    relatedTitle: 'Keep Going: Related Tools and Guides',
    related: [
      { href: '/tools/sitemap-validator', kind: 'Tool', t: 'Sitemap validator', d: 'Check a sitemap is valid' },
      { href: '/tools/sitemap-url-extractor', kind: 'Tool', t: 'Sitemap URL extractor', d: 'Turn a sitemap into a URL list' },
      { href: '/blog/how-to-create-a-sitemap', kind: 'Guide', t: 'How to create a sitemap', d: 'Rules and steps' }
    ]
  }
};
