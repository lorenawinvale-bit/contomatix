# Contomatix daily format (from 6 Nov 2026)

Replaces the old routine (3 new posts and 1 new tool a day). No new posts and no new tools. Every day has two jobs: **update 10 old posts** and **move backlinks forward**.

Say "aaj ka kaam shuru" and this is what happens, in this order.

## 0. Rules that never change
- No new posts, no new tools, unless the founder asks.
- Show everything locally first. Push only after "hn". Always `git fetch` first.
- Facts: every figure, rule and date comes from a primary source read that day (Google pages, our own Search Console, our own scans). No invented numbers. No competitor names.
- No em dashes. No captions under images. Alt text 100 characters or less. First external link after the first 10% of a page.
- Every post: its own hero layout, and a different layout for each content image (the layout rule: stats, timeline, cards, flow, split, compare, columns, rings; avoid `compare` for neutral comparisons).

## 1. Morning check (10 minutes)
1. Search Console, domain property, last 28 days: clicks, impressions, average position. Exclude Pakistan when counting real clicks.
2. Links report: external links total and linking sites. Write the two numbers in the day's report.
3. Pick today's 10 posts: the next 10 rows with `status = todo` in `docs/update-queue.csv` (sorted by priority: A informational with impressions, then B, then C local lists last).

## 2. Update 10 posts (the main job)
For each post, in this order:

| Step | What | How |
|---|---|---|
| 1 | Search Console queries of the post | Performance, last 3 months, page filter, Queries tab. Keep real queries with impressions, skip junk and long pasted text |
| 2 | Ahrefs low-volume terms | Keywords Explorer, matching terms, US, KD 15 or lower, volume 20 to 500. One seed per post. Wait 10 seconds after loading |
| 3 | Pick 5 to 10 keywords | Only ones the post can answer honestly. Check cannibalization (`scripts/cannibal-plan-check.js`) |
| 4 | Add a "related questions" section | One H3 per keyword with a 2 to 4 sentence real answer, before the FAQ. Use `scripts/lowvol-lib.js` in a new `scripts/lowvol-batch-N.js`. Facts only from the post, Google pages read today, or our own data |
| 5 | New hero diagram | `scripts/add-post-heroes.js`, 760 px wide, layout different from the post's images |
| 6 | Content images | If the post has fewer than 3, add diagrams with `scripts/add-post-images.js` and a spec file, each in a different layout, built only from facts in the post |
| 7 | Check | Page returns 200, `node scripts/site-audit-full.js` stays at 19 errors, 10 warnings, 47 info, no em dash, first external link past 10% |
| 8 | Record | Fill `keywords_added`, `images_added`, `status` in `docs/update-queue.csv`, save the keywords in `keyword-research\lowvol-keywords-<slug>.md` |

## 3. Backlinks (every day, 45 minutes)
1. Take 3 targets from `docs/link-targets-2026-11-06.csv` (start with the ones that have the fewest links).
2. Find 5 relevant sites per target: resource pages, roundups, articles on the same topic. Relevance first, no networks, no exchanges.
3. Pitch each with a two-sentence reason, no demand for an anchor.
4. Log every pitch and every live link in `docs/link-log-2026-11-06.csv`: date, target page, anchor, source site, link type, followed or not, status, relevance 1 to 5.
5. Qualify paid links with `rel="sponsored"` or `rel="nofollow"`.
6. Goal: 20 new referring domains to inner pages in 60 days (about 1 new live link every 3 days).

## 4. Push and index
1. Show the day's 10 posts locally. Wait for "hn".
2. `git fetch`, commit, `git push origin deploy-day12:main`.
3. Check each page live (200, new hero, new images, section present). Hostinger sometimes needs a few minutes or a manual redeploy.
4. Give the founder the list of URLs to request in Search Console (URL Inspection, Request indexing). About 10 a day is the practical limit.

## 5. End-of-day report (copy this)
```
Date:
Search Console (28 days): clicks __ (real, excl. Pakistan __), impressions __, position __
Links report: __ external links from __ sites (yesterday __ / __)
Posts updated (10): slugs ...
Keywords added: __ total, e.g. ...
Heroes and images added: __ heroes, __ diagrams
Backlinks: pitched __, live today __, total live this week __
Checks: audit 19/10/47 yes/no, pushed yes/no, indexing URLs given yes/no
Problems / decisions needed:
Tomorrow: next 10 from the queue
```

## 6. Every Monday (30 minutes)
- Export the last 3 months from Search Console into `gsc-exports\performance-<date>` and rerun `node scripts/build-update-queue.js` (it re-ranks the queue).
- Compare with the baseline of 28 Oct (about 130K impressions, 80 clicks, 30 external links) and the 6 Nov numbers (63 clicks in 28 days, 38 links from 13 sites).
- For the posts updated 3 to 4 weeks ago, check the position and impressions of the queries added to them, not total clicks.
- Decide what to double down on and what to drop.

## Quick reference: files and commands
- Queue: `docs/update-queue.csv` (rebuild with `scripts/build-update-queue.js`)
- Links: `docs/link-targets-2026-11-06.csv`, `docs/link-log-2026-11-06.csv`
- Strategy: `docs/traffic-strategy-2026-11-06.md`, head terms: `docs/head-term-targets-2026-11-06.md`
- Portable Node: `export PATH="/d/Contomatix Data/tools/node-v22.17.0-win-x64:$PATH"`
- Audit: `node scripts/site-audit-full.js`
