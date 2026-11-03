// One-off (3 Nov 2026): shorten tool-page titles to 60 characters and H1s to 70 (Screaming Frog crawl). Asserts every old string is found once.
const fs = require('fs'); const path = require('path'); process.chdir(path.join(__dirname, '..'));
const T = {
  'Free Sitemap Validator: Check a sitemap.xml for Errors': 'Free Sitemap Validator: Check Sitemap Errors',
  'Free Hreflang Sitemap Validator: Check Annotations': 'Free Hreflang Sitemap Validator: Find Errors',
  'Free GMB Rank Checker Grid: Local Geo-Grid Planner': 'Free GMB Rank Checker Grid: Geo-Grid Planner',
  'Free SEO Proposal Generator: Client-Ready Template': 'Free SEO Proposal Generator: Client Template',
  'Free Keyword Mapping Tool: Match Keywords to Pages': 'Free Keyword Mapping Tool: Match to Pages',
  'Free Internal Link Checker: Anchors and Crawlability': 'Free Internal Link Checker: Audit Page Links',
  'Free Canonical Tag Checker: Find Canonical Errors': 'Free Canonical Tag Checker: Find Errors',
  'Free SEO Report Generator: Monthly Report Template': 'Free SEO Report Generator: Monthly Template',
  'Free Redirect Mapper: Match Old URLs to New URLs': 'Free Redirect Mapper: Match Old to New URLs',
  'Free Sitemap URL Extractor: List Every URL in a Sitemap': 'Free Sitemap URL Extractor: List All URLs',
  'Free Robots.txt Tester: Check If a URL Is Blocked': 'Free Robots.txt Tester: Is a URL Blocked?',
  'Free Link Building Cost Calculator: Cost per Live Link': 'Free Link Building Cost Calculator: Per Link',
  'Free Outbound Link Checker: List External Links by Domain': 'Free Outbound Link Checker: List External Links',
  'Free Backlink Monitor Tool: Log and Check Your Links': 'Free Backlink Monitor Tool: Log and Check',
  'Free Link Building Management Tool: Track Outreach': 'Free Link Building Management Tool',
  'Free Keyword Grouping Tool: Group Keywords by Topic': 'Free Keyword Grouping Tool: Group by Topic',
  'Free Content Brief Generator: Writer-Ready Briefs': 'Free Content Brief Generator: Writer Briefs',
  'Free Log File Analyzer: See What Googlebot Crawls': 'Free Log File Analyzer: What Googlebot Crawls',
  'Free Invoice Generator & Freelance Invoice Template': 'Free Invoice Generator & Invoice Template'
};
const H = {
  'internal-link-checker': ["Free Internal Link Checker: Audit a Page's Links, Anchors and Crawlability", "Free Internal Link Checker: Audit a Page's Links and Anchors"],
  'seo-report-generator': ['Free SEO Report Generator: Turn Search Console Numbers Into a Client Report', 'Free SEO Report Generator: Turn Search Console Data Into a Report'],
  'html-sitemap-generator': ['Free HTML Sitemap Generator: Turn a URL List or XML Sitemap Into a Visitor Sitemap Page', 'Free HTML Sitemap Generator: Turn a URL List Into a Sitemap Page'],
  'dofollow-link-checker': ['Free Dofollow Link Checker: Find Nofollow, Sponsored and UGC Links in Any HTML', 'Free Dofollow Link Checker: Find Nofollow, Sponsored and UGC Links'],
  'outreach-email-generator': ['Free Link Building Outreach Email Generator: Short Emails That Name Something Real', 'Free Link Building Outreach Email Generator: Short, Specific Emails'],
  'link-building-cost-calculator': ['Free Link Building Cost Calculator: Work Out What Each Live Backlink Really Costs', 'Free Link Building Cost Calculator: What Each Live Link Costs'],
  'link-prospect-scorer': ['Free Link Prospect Scorer: Decide Whether a Site Is Worth Pitching Before You Email It', 'Free Link Prospect Scorer: Is a Site Worth Pitching?'],
  'content-marketing-roi-calculator': ['Free Content Marketing ROI Calculator: Measure Whether Your Content Pays Back', 'Free Content Marketing ROI Calculator: Does Your Content Pay Back?'],
  'anchor-text-checker': ['Free Anchor Text Checker: See Whether Your Link Text Is Descriptive, Generic or Over-Optimised', 'Free Anchor Text Checker: Is Your Link Text Descriptive or Generic?'],
  'outbound-link-checker': ['Free Outbound Link Checker: List Every External Link on a Page, Grouped by Domain', 'Free Outbound Link Checker: List External Links by Domain'],
  'backlink-monitor-tool': ['Free Backlink Monitor Tool: Log Your Links, Check They Are Still Live and See Cost Per Live Link', 'Free Backlink Monitor Tool: Log Links and Check They Are Live'],
  'link-building-management-tool': ['Free Link Building Management Tool: Track Every Prospect From First Email to Live Link', 'Free Link Building Management Tool: Track Prospects to Live Links'],
  'keyword-grouping-tool': ['Free Keyword Grouping Tool: Sort a Keyword List Into Groups and Page Targets', 'Free Keyword Grouping Tool: Sort Keywords Into Groups and Pages'],
  'content-brief-generator': ['Free Content Brief Generator: Turn a Keyword and Your Research Into a Writer-Ready Brief', 'Free Content Brief Generator: Turn Research Into a Writer-Ready Brief'],
  'schema-markup-validator': ['Free Schema Markup Validator: Check JSON-LD Syntax and Required Properties', 'Free Schema Markup Validator: Check JSON-LD and Required Properties'],
  'log-file-analyzer': ['Free Log File Analyzer: See Which URLs Googlebot Crawls and What Status It Gets', 'Free Log File Analyzer: See Which URLs Googlebot Crawls']
};
let s = fs.readFileSync('server.js', 'utf8'); let n = 0;
for (const [o, nw] of Object.entries(T)) {
  const oldS = o + ' | Contomatix', newS = nw + ' | Contomatix';
  if (newS.length > 60) throw new Error('title too long ' + newS.length + ' ' + newS);
  const c = s.split(oldS).length - 1; if (c !== 1) throw new Error('title found ' + c + ' times: ' + o);
  s = s.replace(oldS, () => newS); n++;
}
fs.writeFileSync('server.js', s, 'utf8'); console.log('titles changed', n);
let h = 0;
for (const [slug, [o, nw]] of Object.entries(H)) {
  if (nw.length > 70) throw new Error('h1 too long ' + nw.length + ' ' + nw);
  const f = path.join('views', 'pages', slug + '.ejs'); let t = fs.readFileSync(f, 'utf8');
  const c = t.split(o).length - 1; if (c < 1) throw new Error('h1 not found in ' + slug);
  t = t.split(o).join(nw); fs.writeFileSync(f, t, 'utf8'); h += c;
}
console.log('h1 replacements', h);
