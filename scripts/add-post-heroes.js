// Replaces the old numbered-list hero diagram of older posts with a new concept diagram (new logo top-left, no note strip).
// Rule (user, 6 Nov 2026): every blog gets its own hero style and its content images use other layouts than its hero. Facts come only from the post itself.
// usage: node scripts/add-post-heroes.js [slug ...]
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..'); process.chdir(root);
const D0 = require('./diagram-lib2.js');
const D = Object.fromEntries(Object.entries(D0).map(([k, fn]) => [k, typeof fn === 'function' && !['logoSvg', 'proofHtml', 'hero'].includes(k) ? (o => { const c = Object.assign({}, o); delete c.note; return fn(c); }) : fn]));
const TEAL = '#0EA5A0', AMBER = '#F5A623';
const W = 760; // the hero sits in a 440 px column next to the title, so it is drawn at 760 px wide
const HEROES = {
  'check-backlinks-of-website': D.stats({ w: W, cols: 2, title: 'Four free ways to check backlinks', items: [
    { big: '1', t: 'Search Console Links report: free, from Google' }, { big: '2', t: 'Open the linking page and read the link', color: AMBER },
    { big: '3', t: 'Search your brand and domain for mentions' }, { big: '4', t: 'Use a backlink checker for a wider index', color: AMBER }] }),
  'how-many-backlinks-do-i-need': D.columns({ w: W, title: 'Our own backlinks, 6 November 2026', max: 40, items: [
    { t: 'External links', v: 38, text: '38', color: AMBER }, { t: 'Linking sites', v: 13, text: '13', color: TEAL }, { t: 'Links from two sites', v: 21, text: '21', color: AMBER }] }),
  'robots-txt-file': D.timeline({ w: W, title: 'The four lines that do all the work', items: [
    { d: 'Line 1', t: 'User-agent', c: 'Which crawler the rules apply to' }, { d: 'Line 2', t: 'Disallow', c: 'A path the crawler should not request' },
    { d: 'Line 3', t: 'Allow', c: 'An exception carved out of a Disallow' }, { d: 'Line 4', t: 'Sitemap', c: 'The full URL of your sitemap' }] }),
  'ai-powered-seo-tools': D.split({ w: W, h: 520, title: 'AI SEO tools: one label, five jobs', big: '5', bigLabel: 'different jobs share the "AI-powered" label', items: [
    { v: 'Clustering', t: 'Groups keywords by meaning' }, { v: 'Briefs', t: 'Summarizes what already ranks' }, { v: 'Audits', t: 'Triage across large crawls' }, { v: 'Linking', t: 'Suggests pages to link' }, { v: 'Visibility', t: 'Tracks AI mentions and citations' }] }),
  'how-duckduckgo-ai-search-works-2026': D.timeline({ w: W, title: 'DuckDuckGo AI: two products, one name', items: [
    { d: 'Product 1', t: 'Search Assist', c: 'An AI answer in the results, via DuckAssistBot' }, { d: 'Product 2', t: 'Duck.ai', c: 'A private chat that routes to third-party models' },
    { d: 'Not a product', t: 'Bing', c: 'Supplies most of the organic results' }] }),
    'hreflang-spanish': D.cards({ w: W, title: 'Spanish hreflang: use these, not es-419', qLabel: 'Targets', items: [
    { big: 'es', t: 'Catch-all', d: 'Language only', q: 'Any Spanish speaker' }, { big: 'es-MX', t: 'Country code', d: 'Language, then country', q: 'Mexico' }, { big: 'es-ES', t: 'Country code', d: 'Language, then country', q: 'Spain' }] }),
  'blocked-by-robots-txt': D.flow({ w: W, title: 'Fixing "blocked by robots.txt"', steps: [
    { t: 'Find the rule', s: 'Test the URL', c: 'Which Disallow line matches?' }, { t: 'Decide', s: 'Should it be in search?', c: 'Some blocks are intentional' }, { t: 'Fix and validate', s: 'Then recrawl', c: 'To remove a page, noindex it first' }] }),
  'image-sitemap': D.rings({ w: W, title: 'Our own image sitemap numbers', items: [
    { pct: 2 / 6, big: '2 of 6', t: 'image tags Google still reads', c: '4 tags were removed', color: TEAL },
    { pct: 13 / 1000, big: '13', t: 'images on our busiest page, limit 1,000', c: 'Per page URL', color: AMBER },
    { pct: 0, big: '0 of 1,220', t: 'image references were in a sitemap', c: 'Across 299 posts', color: AMBER }] }),
  'ai-seo-agents': D.cards({ w: W, title: 'Three jobs AI SEO agents get', qLabel: 'The rule', items: [
    { big: 'Audit', t: 'Rule-based checks', d: 'Crawl against a rule set', q: 'Safe to run alone' }, { big: 'Draft', t: 'Content drafting', d: 'Full pages from a brief', q: 'A human reviews' }, { big: 'Pitch', t: 'Outreach', d: 'Targets and pitch emails', q: 'Never unsupervised' }] }),
  'innovative-marketing-campaigns-2026': D.stats({ w: W, cols: 2, title: 'B2C and B2B innovation differ', items: [
    { big: 'B2C', t: 'Built to spread through millions of feeds in a week' }, { big: 'B2B', t: 'Built to survive a buying committee and a long sales cycle', color: AMBER }] }),
    'why-is-duplicate-content-an-issue-for-seo-2026': D.compare({ w: W, title: 'Duplicate content: myth and reality', left: { h: 'The myth', items: ['A separate penalty exists', 'Copies are punished', 'Google said no in 2008'] }, right: { h: 'What happens', items: ['One version is picked to show', 'Signals split across copies', 'AI may credit one source'] } }),
  'what-is-llm-seo-2026': D.split({ w: W, h: 520, title: 'LLM SEO: a citations game', big: '4', bigLabel: 'pillars of LLM visibility', items: [
    { v: 'Extractability', t: 'A model can lift a clean answer' }, { v: 'Authority', t: 'Consistent facts across sources' }, { v: 'Freshness', t: 'Current, and says so' }, { v: 'Clarity', t: 'Headings, lists, Q&A' }] }),
  'how-to-get-cited-by-chatgpt-2026': D.split({ w: W, h: 520, title: 'What gets a page cited by ChatGPT', big: '5', bigLabel: 'tactics that earn a citation', items: [
    { v: 'Answer', t: 'A 40 to 60 word answer first' }, { v: 'Sections', t: 'One sub-question each' }, { v: 'Data', t: 'Recent and attributed' }, { v: 'Authority', t: 'Signals beyond your site' }, { v: 'Crawlers', t: 'Do not block OAI-SearchBot' }] }),
  // ---- 7 Nov 2026 batch ----
  'ai-tools-for-seo-keyword-research': D.split({ w: W, h: 480, title: 'AI keyword research: ideas, not numbers', big: '21', bigLabel: 'real keywords guessed blind by an AI assistant', items: [
    { v: 'Brainstorm', t: 'AI does steps one and three' }, { v: 'Numbers', t: 'Data does step two' }, { v: 'Mapping', t: 'A mapping step keeps the list tidy' }] }),
  'seo-audit-report-template': D.stats({ w: W, cols: 2, title: 'Our own audit sample in numbers', items: [
    { big: '419', t: 'URLs crawled, every one returned 200' }, { big: '337', t: 'of them listed in the sitemap', color: AMBER }, { big: '7', t: 'things every audit report needs' }, { big: '2', t: 'false positives we caught by hand', color: AMBER }] }),
  'enterprise-seo-audit': D.columns({ w: W, title: 'Our 419-URL test crawl, grouped', max: 300, items: [
    { t: 'Blog posts', v: 296, text: '296', color: TEAL }, { t: 'Thin pages', v: 89, text: '89', color: AMBER }, { t: 'Posts without FAQ data', v: 25, text: '25', color: AMBER }] }),
  'wix-seo-specialist': D.flow({ w: W, title: 'Before you hire a Wix SEO specialist', steps: [
    { t: 'Ask for examples', s: 'Past work and a past client', c: 'Ideally including Wix sites' }, { t: 'Ask about the rules', s: 'Google Search Essentials', c: 'What it means for their tactics' }, { t: 'Check the quote', s: 'What Wix already does', c: 'Why are you paying for it?' }] }),
  'sitemap-priority': D.cards({ w: W, title: 'Sitemap tags: what Google uses', qLabel: 'Google', items: [
    { big: 'priority', t: 'Optional, 0.0 to 1.0', d: 'Default is 0.5', q: 'Ignored' }, { big: 'changefreq', t: 'Optional hint', d: 'How often a page changes', q: 'Ignored' }, { big: 'lastmod', t: 'Optional date', d: 'When the page last changed', q: 'Used only if accurate' }] }),
  'maritime-digital-marketing': D.timeline({ w: W, title: 'Five areas of maritime digital marketing', items: [
    { d: 'Area 1', t: 'SEO for maritime and shipping', c: 'Specific technical and commercial searches' }, { d: 'Area 2', t: 'A B2B website built for long cycles', c: 'Answers procurement questions' },
    { d: 'Area 3', t: 'Content and thought leadership', c: 'Explainers that large competitors skip' }, { d: 'Area 4', t: 'LinkedIn and B2B social', c: 'Where the industry lives online' }, { d: 'Area 5', t: 'Trade directories and press', c: 'Links from maritime sources' }] }),
  'google-disavow-backlinks': D.flow({ w: W, title: 'Google\'s two-part disavow test', steps: [
    { t: 'Test 1', s: 'Many bad links', c: 'Spammy or low quality, and a considerable number' }, { t: 'Test 2', s: 'Real harm', c: 'A manual action, or likely to get one' }, { t: 'Not a test', s: 'Toxicity score', c: 'A tool score alone does not qualify' }] }),
  'link-building-agencies-dubai-2026': D.stats({ w: W, cols: 2, title: 'Link building in Dubai, in numbers', items: [
    { big: '3', t: 'agencies passed our verification' }, { big: '3', t: 'checks each one had to clear', color: AMBER }, { big: '11.3M', t: 'UAE internet users at the end of 2025' }, { big: '3-6', t: 'months for link building to compound, at minimum', color: AMBER }] }),
  'how-to-find-competitor-backlinks-2026': D.flow({ w: W, title: 'Finding competitor backlinks, in three moves', steps: [
    { t: 'Pick competitors', s: 'SERP and business', c: 'Three to five of each' }, { t: 'Find their links', s: 'A gap report or by hand', c: 'Paid tools or free search' }, { t: 'Filter, then pitch', s: 'Relevance first', c: 'Real outreach follows' }] }),
  'best-crm-automation-tools-2026': D.stats({ w: W, cols: 2, title: 'CRM and automation tools, compared', items: [
    { big: '8', t: 'tools compared on price and fit' }, { big: 'Sep 2026', t: 'prices read from each vendor\'s own page', color: AMBER }, { big: '20.0%', t: 'Salesforce share of the global CRM market (IDC)' }, { big: '1', t: 'tool on the list is not actually a CRM', color: AMBER }] })
};
(async () => {
  const fp = path.join(root, 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8')); const only = process.argv.slice(2); const out = [];
  for (const [slug, svg] of Object.entries(HEROES)) {
    if (only.length && !only.includes(slug)) continue; const p = posts.find(x => x.slug === slug); if (!p || !p.heroDiagram) throw new Error('no hero path for ' + slug);
    if (/—/.test(svg)) throw new Error('em dash in hero ' + slug);
    fs.writeFileSync(path.join(root, 'public', p.heroDiagram.replace(/^\//, '')), svg);
    const vb = svg.match(/viewBox="[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)"/); out.push(`${slug}: ${vb ? vb[1] + 'x' + vb[2] : '?'}, ${Math.round(svg.length / 1024)} kB`);
  }
  console.log(out.join('\n'));
})();
