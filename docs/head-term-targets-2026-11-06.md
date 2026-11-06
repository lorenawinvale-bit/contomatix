# Head-term targets v1 (6 Nov 2026)

Source: Ahrefs Keywords Explorer matching terms, US, KD 10 or lower (KD 15 or lower for the first pulls), volume 500 or more, pulled 3 to 6 Nov 2026. Cannibalization checked with `scripts/cannibal-plan-check.js` against our 366 posts and 42 tools. Volumes are Ahrefs estimates, not our traffic.

Why this list exists: our 74 top-10 pages sit on queries with almost no demand (2,195 impressions in 3 months). One page that ranks in the top 5 for a 1,000+ search term is worth more than 20 pages on 20-search terms.

## Ready to build (no overlap with an existing page)

| Priority | Primary keyword | US volume | KD | Related terms for H2 and FAQ | Our first-hand data to use |
|---|---|---|---|---|---|
| 1 | backlinks example | 1.3K | 5 | good backlinks (1.3K, KD 0), top backlinks (1.2K), high quality backlinks (1.2K, KD 7), backlinks search (1.2K) | Our own Links report: 38 links, anchors, which are followed, where they point; what each source type looked like |
| 2 | backlinks management | 1.1K | 2 | backlink management tool, track backlinks | Our backlink monitor tool plus our own tracking sheet and results |
| 3 | build backlinks | 1.1K | 5 | how to get backlinks (1.0K), how do i find backlinks to my website (1.0K) | Our own 30 Oct baseline vs now: 30 to 38 links, what we did |
| 4 | artificial intelligence in seo | 700 | 7 | ai powered seo, best ai for seo (400) | Our AI search study (robots.txt AI crawler scan) if we run it |
| 5 | wordpress sitemap | 700 | 7 | xml sitemap format (700, KD 5), sitemaps xml | A scan of sitemap formats on 300 sites |
| 6 | keyword backlinks | 1.7K | 8 | (ambiguous intent, check the SERP first) | Check before building |
| 7 | buying backlinks | 1.0K | 7 | buying links (policy risk: write against Google's link spam rules, no selling angle) | Google's link spam policy, our client experience in aggregate only |

## Overlaps an existing page: upgrade or retarget instead of a new page

| Keyword | US volume | KD | Existing page | Action |
|---|---|---|---|---|
| robots txt | 1.6K | 0 | `robots-txt-file`, `robots-txt-sitemap`, `blocked-by-robots-txt`, tool `robots-txt-tester` | Pick one page as the head page (`robots-txt-file`), rewrite it around "robots txt", point the other two at it |
| long tail keywords | 3.7K | 0 | `long-tail-low-competition-keywords` (12 impressions, position 42), new `short-tail-vs-long-tail-keywords` | Rewrite the old page around "long tail keywords" as the head page, keep the new one for the comparison keyword |
| what is a subdomain | 3.3K | 8 | new `subdomain-vs-subdirectory` | Wait 4 weeks for the new post, then add a definition-led section or a separate page if it does not rank |
| subdomain seo | 1.4K | 5 | new `subdomain-vs-subdirectory` | Covered, track it |
| canonical url | 2.1K | 1 | new `canonical-url` | Covered, track it |
| seo meta description length | 1.0K | 0 | new `meta-description-length` | Covered, track it |
| what is ai seo | 800 | 0 | `what-is-llm-seo-2026`, `ai-seo-strategy`, `ai-seo-agents`, `is-ai-content-bad-for-seo` | Build one AI SEO pillar page (Move 4) and merge the overlap into it |
| ai seo services | 5.3K | 6 | `ai-seo-services` (2 impressions, position 5.5) | Commercial intent: check the SERP for what ranks, then rewrite the page as a service page |
| ai seo audit | 500 | 0 | `ai-seo-strategy`, others | Fold into the pillar |
| ai powered seo | 500 | 10 | `ai-powered-seo-tools` (770 impressions, position 65.7) | Link-poor page: part of the Move 1 link targets |
| video sitemap | 500 | 0 | `video-sitemap` | Check its position first |

## Do not build

- "sitemap generator spellmistake" and similar (a misspelled brand, 12K): branded to another site.
- Anything under about 100 searches a month, unless it is an H2 or FAQ inside a bigger page.

## How to use this list

1. Take one row a day (or fewer): check the SERP, check cannibalization again, pull H2 keywords, build the page with our own data, publish and track.
2. Every page gets 5+ internal links from related posts and goes on the link tracker (`docs/link-tracker-2026-11-06.csv`) as a link target.
3. Do not judge a page for 4 to 8 weeks.
