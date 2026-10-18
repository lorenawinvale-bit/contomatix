// Builds the "google disavow backlinks" post + assets. node scripts/build-post-google-disavow-backlinks.js [--write]
// Data: 5 organic results for "google disavow backlinks" (Google US, 18 Oct 2026; 4 guides readable, 1 forum thread excluded) + Google Search Console Help "Disavow links to your site" read 18 Oct 2026. Sites are not named.
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js'); const quote = require('./quote-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'google-disavow-backlinks';
const R = require('../../keyword-research/serp-google-disavow-backlinks-2026-10-18.json');
const ok = R.filter(o => o.status === 200); const c = fn => ok.filter(fn).length;
const D = { ok: ok.length, median: ok.map(o => o.words).sort((a, b) => a - b)[Math.floor(ok.length / 2)], penalty: c(o => o.penalty), toxic: c(o => o.toxic), fileFormat: c(o => o.fileFormat), rollback: c(o => o.rollback), consequence: c(o => o.consequence), risk: c(o => o.risk), dontNeed: c(o => o.dontNeed), manual: c(o => o.manualAction), policy: c(o => o.googlePolicy), tools: c(o => o.tools) };
const exp = { ok: 4, median: 1243, penalty: 4, toxic: 4, fileFormat: 3, rollback: 3, consequence: 3, risk: 3, dontNeed: 1, manual: 1, policy: 1, tools: 4 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
// Validate sample disavow lines with the format rules in Google's help page (read 18 Oct 2026)
function check(line) {
  if (line.trim() === '') return ['ok', 'Blank line (counts toward the 100,000-line limit)'];
  if (line.startsWith('#')) return ['ok', 'Comment, ignored by Google'];
  if (line.length > 2048) return ['bad', 'URL longer than 2,048 characters'];
  let m = line.match(/^domain:(.+)$/i);
  if (m) { const h = m[1]; if (/[\/:\s]/.test(h) || !/\./.test(h)) return ['bad', 'After domain: use a bare host name, not a URL']; return ['ok', 'Valid: disavows the whole domain or subdomain']; }
  if (/^https?:\/\/\S+$/i.test(line)) return ['ok', 'Valid: disavows one page URL'];
  return ['bad', 'Needs https:// for a page or domain: for a domain'];
}
const sample = ['# Pages we asked to remove, no reply', 'http://spam.example.com/stuff/comments.html', 'https://blog.example.net/post?id=7', '# Domain to disavow', 'domain:shady-seo-example.com', 'domain:blog.example.org', 'example.com/en/', 'www.example.net', 'domain:https://bad.example.com', 'domain:badhost'];
const verdicts = sample.map(l => check(l)); const nOk = verdicts.filter(v => v[0] === 'ok').length, nBad = verdicts.length - nOk;
if (nOk !== 6 || nBad !== 4) throw new Error('validator changed ' + nOk + '/' + nBad);
console.log(JSON.stringify(D), 'sample', nOk, nBad);
const f = n => n.toLocaleString('en-US');

// ---------- assets
L.donut(SLUG, ['GOOGLE', 'DISAVOW'], [['Check the', 'Two-Part Test'], 'Try Removal First', ['Write the', 'Text File'], 'Upload to the Tool', ['Wait and', 'Monitor']]);
L.cover(SLUG, { badge: 'REAL SERP CHECK', search: 'google disavow backlinks', card: `Guides read: ${D.ok} of 5`,
  lines: [`Median page length: ${f(D.median)} words`, `Use the word toxic: ${D.toxic} of ${D.ok}`, `Say most sites do not need it: ${D.dontNeed} of ${D.ok}`, `Mention manual actions: ${D.manual} of ${D.ok}`, `Give file format rules: ${D.fileFormat} of ${D.ok}`],
  last: 'Use Google\'s two-part test', big: `${D.dontNeed} of ${D.ok}`, k1: 'guides say most sites', k2: 'do not need to disavow', title: 'Google Disavow Backlinks', sub: `What ${D.ok} ranking guides say, and Google says` });
fs.writeFileSync(path.join(__dirname, 'infographic-google-disavow-backlinks.html'), L.infographicHtml({
  title: `Google Disavow: ${D.ok} Guides Read`, sub: 'Organic results for "google disavow backlinks", Google US, 18 October 2026',
  leftTitle: 'What the ranking guides mention', leftTag: `Number of the ${D.ok} readable guides`, max: D.ok,
  bars: [{ label: 'Penalties', sub: 'penalty or demotion', n: D.penalty }, { label: 'Toxic or spammy links', sub: 'the word toxic', n: D.toxic }, { label: 'File format', sub: 'upload or .txt rules', n: D.fileFormat }, { label: 'Undoing it', sub: 'remove or replace file', n: D.rollback }, { label: 'Manual actions', sub: "Google's real trigger", n: D.manual }],
  rightTitle: 'Disavow only if both are true', rightTag: "Google's two-part test", items: [
    { t: 'Many spammy or artificial links', s: 'a considerable number' }, { t: 'A manual action', s: 'caused or likely to be caused' },
    { t: 'You tried removal first', s: 'ask the sites to remove' }, { t: 'You use a URL-prefix property', s: 'Domain properties not supported' }],
  big: `${D.dontNeed} of ${D.ok}`, noteHtml: `guides tell you that <em>most sites do not need</em> the tool. Google says exactly that.` }));
fs.writeFileSync(path.join(__dirname, 'table-google-disavow-backlinks-serp.html'), L.tableHtml({ title: `What ${D.ok} guides ranking for google disavow backlinks say`, sub: `Organic results read on 18 October 2026 (5 listed, 1 was a forum thread and is not counted). Sites are not named. Counts show a term appears, not how well it is explained.`,
  head: ['Mentioned on the page', 'Guides'], lastBold: false,
  rows: [['Penalty or demotion', `${D.penalty} of ${D.ok}`], ['Toxic, spammy or harmful links', `${D.toxic} of ${D.ok}`], ['Named link tools or Search Console', `${D.tools} of ${D.ok}`], ['File format or upload steps', `${D.fileFormat} of ${D.ok}`], ['Undo, replace or remove the file', `${D.rollback} of ${D.ok}`], ['Risk or caution', `${D.risk} of ${D.ok}`], ['Can hurt or be a mistake', `${D.consequence} of ${D.ok}`], ['Most sites do not need to disavow', `${D.dontNeed} of ${D.ok}`], ['Manual action', `${D.manual} of ${D.ok}`], ['Google spam policy or link schemes', `${D.policy} of ${D.ok}`]] }));
fs.writeFileSync(path.join(__dirname, 'table-google-disavow-backlinks-file.html'), L.tableHtml({ title: `A sample disavow file checked line by line: ${nOk} valid, ${nBad} invalid`, sub: 'Lines checked against the format rules in Google\'s disavow help page, read 18 October 2026. Example domains only.',
  head: ['Line in the file', 'Result'], lastBold: false,
  rows: sample.map((l, i) => [l === '' ? '(blank)' : l, verdicts[i][1]]) }));
fs.writeFileSync(path.join(__dirname, 'quote-google-disavow-backlinks-doc.html'), quote({ source: 'Google Search Console Help · Disavow links to your site', title: 'Step 0: Decide if this is necessary',
  paras: ['In most cases, Google can assess which links to trust without additional guidance, so most sites will not need to use this tool. You should disavow backlinks only if you have a considerable number of spammy, artificial, or low-quality links pointing to your site, <strong>and</strong> the links have caused a manual action, or likely will cause a manual action, on your site.',
    'This is an advanced feature and should only be used with caution. If used incorrectly, this feature can potentially harm your site\'s performance in Google Search results.'] }));

// ---------- article
const sz = f => { if (!fs.existsSync(f)) return [880, 300]; const b = fs.readFileSync(f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
const pr = path.join(root, 'public', 'images', 'blog', 'proof'); const hh = n => sz(path.join(pr, n))[1]; const q = sz(path.join(pr, 'google-disavow-backlinks-doc.png'));
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>The <strong>Google disavow tool</strong> lets a site owner upload a text file telling Google to ignore specific links or whole domains that point to their site. Google calls it an advanced feature and says most sites will not need it. We read the ${D.ok} guides that rank on Google US for the term: all ${D.toxic} use the word "toxic" or "spammy", but only ${D.dontNeed} says most sites do not need the tool and only ${D.manual} mention manual actions, which is the condition Google actually sets. This guide follows Google's own help page.</p>

<p>Below you will find what the tool does, Google's two-part test for using it, what the ranking guides say, how to check your own links, how to build and check a disavow file, how to upload and undo it, and the mistakes that cause harm. If you are trying to prevent the problem, read our guide on <a href="/blog/backlinks-exchange">backlink exchanges</a> as well.</p>

<h2>What the Google Disavow Tool Does</h2>
<p>The tool, also called link disavow, is a way to tell Google not to take certain links into account when assessing your site. You upload a text file listing individual page URLs or whole domains. Google says the list applies only to the property you upload it to, you can have one list per property and a new upload replaces the old one. Disavowed links still appear in the Links report. It can take a few weeks for Google to reflect the list as it recrawls the web. Note that Google says the disavow tool does not support Domain properties, so it applies to URL-prefix properties.</p>

<h2>Google's Two-Part Test: When You Should Disavow</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-disavow-backlinks-doc.png" alt="Google Search Console Help excerpt: most sites will not need the disavow tool, and you should disavow only if you have a considerable number of spammy, artificial or low-quality links and the links have caused or likely will cause a manual action, and it can harm performance if used incorrectly" width="${q[0]}" height="${q[1]}" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Google's help page sets a two-part test, and both parts must be true. First, you have a considerable number of spammy, artificial or low-quality links pointing to your site. Second, those links have caused a manual action, or are likely to cause one. If you have a few odd links, or a tool shows a high "toxicity" score, that does not meet the test. Google adds that it works hard to make sure that actions on third-party sites do not negatively affect your site, and that it recommends removing as many spammy or low-quality links from the web as possible first.</p>

<h2>What the Ranking Guides Say, and Do Not Say</h2>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-disavow-backlinks-serp.png" alt="Table of what 4 guides ranking for google disavow backlinks mention: penalty 4, toxic links 4, link tools 4, file format 3, undo 3, risk 3, can hurt 3, most sites do not need it 1, manual action 1, Google spam policy 1" width="1280" height="@@SERPH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>Penalty is the headline.</strong> ${D.penalty} of ${D.ok} talk about penalties or demotion, while only ${D.manual} use Google's own term, manual action.</li>
<li><strong>"Toxic" dominates.</strong> ${D.toxic} of ${D.ok} use the word toxic or spammy. Google's page does not use a toxicity score, and it does not say a tool's rating decides anything.</li>
<li><strong>The practical steps are covered.</strong> ${D.fileFormat} of ${D.ok} explain the file and upload, and ${D.rollback} explain how to undo it.</li>
<li><strong>Warnings exist but are soft.</strong> ${D.risk} of ${D.ok} mention risk and ${D.consequence} say it can hurt, yet only ${D.dontNeed} says plainly that most sites do not need to do it.</li>
<li><strong>The rule is rarely linked.</strong> Only ${D.policy} of ${D.ok} mentions Google's spam policy or link schemes.</li>
</ul>

<h2>How to Decide Whether You Need to Disavow</h2>
<ol>
<li><strong>Check for a manual action.</strong> In Search Console, open Manual actions. If it says no issues, the second part of the test is not met today.</li>
<li><strong>Export your links.</strong> Download the Links report. For the method, see our guide to <a href="/blog/check-backlinks-of-website">checking the backlinks of a website</a>.</li>
<li><strong>Look for a pattern, not a score.</strong> Paid links, link exchanges, thousands of links from unrelated sites with the same anchor, or hacked pages are patterns. A tool's toxicity number alone is not.</li>
<li><strong>Remove what you can.</strong> If you built the links, ask the sites to take them down or add a nofollow or sponsored attribute. Keep a record of your attempts.</li>
<li><strong>Disavow what remains,</strong> only if the two-part test is met.</li>
</ol>
<p>We applied the test to ourselves. The Links report for contomatix.com showed 13 external links from 4 linking sites when we last checked. In our guide to <a href="/blog/relevant-backlinks">relevant backlinks</a> we scored all of them, and 12 were topic-related listings. There is no considerable number of spammy links and we have no manual action, so the test fails at the first step and we would not upload a file. For most sites with a small, ordinary profile, the honest answer is the same.</p>

<h2>How to Create a Disavow File</h2>
<p>Google's format rules are short. Put one URL or domain per line. To disavow a domain or subdomain, start the line with <code>domain:</code>, for example <code>domain:example.com</code>. You cannot disavow an entire subpath such as <code>example.com/en/</code>. The file must be a text file in UTF-8 or 7-bit ASCII with a name ending in <code>.txt</code>. The maximum URL length is 2,048 characters, and the maximum file size is 100,000 lines (including blank and comment lines) and 2MB. A line that begins with <code>#</code> is a comment and is ignored.</p>
<p>To test the rules, we wrote a sample file with ten lines and checked each against them. ${nOk} were valid and ${nBad} were not. The invalid lines show the usual mistakes: a bare host name with no <code>domain:</code>, a URL placed after <code>domain:</code>, and a path with no scheme.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-disavow-backlinks-file.png" alt="Table of a ten-line sample disavow file checked against Google's format rules: comments, page URLs and bare domain lines are valid, and lines such as example.com/en/, www.example.net, domain with a URL and domain with no dot are invalid" width="1280" height="@@FILEH@@" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>Prefer the <code>domain:</code> form when a whole site is the problem and page URLs when only a few pages are. Keep comments to remind yourself why each entry is there.</p>

<h2>A Disavow File You Can Adapt</h2>
<p>Here is the shape of a clean file, using example names. Replace the entries with your own, keep the comments so you remember the reason for each group, and save it as a plain <code>.txt</code> file.</p>
<pre><code># Paid links bought in 2024, owner did not reply to two requests
domain:paid-links-example.com
domain:article-network-example.net

# Single spam pages with keyword anchors
http://forum.example.org/thread/123
https://blog.example.com/best-links-page</code></pre>
<p>Keep a separate note outside the file with the date, the evidence and the removal requests you sent. If you ever need to explain the file to someone, that note is what they will want to see.</p>

<h2>How to Find Links Worth Reviewing in the Links Report</h2>
<p>Open the Links report and look at the top linking sites and the top linked pages, then export both. Sort the linking sites by the number of links and look at the biggest outliers first. A site that gives you thousands of links from a footer or sidebar, a network of similar sites with the same anchor text, pages in an unrelated language or topic and anything that looks hacked deserves a closer look. Open a few of the pages, check where your link sits and decide whether you or someone you hired created it. If you cannot say how the link came to exist, check whether it is a scraper or a normal citation, which Google can usually handle on its own.</p>
<p>Do not try to review every link. A short list of clear patterns is enough, and a patient review of a few dozen examples will tell you whether you have a problem or just a long tail of ordinary web noise.</p>

<h2>If You Do Have a Manual Action</h2>
<p>If Search Console shows a manual action for unnatural links to your site, Google's guidance is to remove the links where you can, disavow the rest and then submit a reconsideration request from the Manual actions report, explaining what you did. Keep the explanation factual: how the links were created, what you removed, what you disavowed and what you have changed so it does not happen again. A rushed or vague request is likely to be turned down, so take the time to document the work properly before you send it.</p>

<h2>How to Upload, Replace and Remove a Disavow File</h2>
<ol>
<li><strong>Open the disavow tool page</strong> and choose the property. Remember that Domain properties are not supported, so use the URL-prefix property for your site.</li>
<li><strong>Upload your text file.</strong> If the file has errors, Google shows them at once and keeps your old list.</li>
<li><strong>Wait.</strong> If the upload succeeds, it can take a few weeks for Google to incorporate the list as it recrawls.</li>
<li><strong>To replace the list,</strong> just upload a new file. You do not need to cancel the old one.</li>
<li><strong>To remove every disavowal,</strong> select the property and click Cancel disavowals. That also takes a few weeks to take effect.</li>
</ol>
<p>If your property exists in both http and https versions, upload a list for each, since the list applies to the property you chose and its child properties.</p>

<h2>What Not to Disavow</h2>
<ul>
<li><strong>Links just because a tool calls them toxic.</strong> A score is an estimate from a third party, not Google's view.</li>
<li><strong>Normal low-value links.</strong> Odd directory listings and scraper sites appear on most profiles. Google says it can generally assess which links to trust without help.</li>
<li><strong>Links you earned.</strong> Disavowing good links removes value you wanted.</li>
<li><strong>Nofollow links.</strong> They are already qualified, so there is little to gain.</li>
<li><strong>A guess at a penalty.</strong> A drop in rankings has many possible causes. Check for a manual action before you act.</li>
</ul>

<figure style="margin:20px 0;"><img src="/images/blog/infographic-google-disavow-backlinks.png" alt="Infographic of what 4 guides ranking for google disavow backlinks mention and Google's two-part test for when to use the disavow tool" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Disavowing Toxic Backlinks: A Safer Order of Operations</h2>
<ol>
<li>Stop creating the links that caused the problem. For exchanges and paid links, our guide to <a href="/blog/backlinks-exchange">backlink exchanges</a> explains what Google counts as link spam.</li>
<li>Ask the site owners to remove or qualify the links, and keep the emails. You can draft polite requests with the <a href="/tools/outreach-email-generator">outreach email generator</a>.</li>
<li>Use the <a href="/tools/dofollow-link-checker">dofollow link checker</a> to see which remaining links pass credit.</li>
<li>Disavow only the remainder, with comments, and only if the two-part test is met.</li>
<li>Record the date and the reason, then monitor Search Console for the manual action status and your impressions.</li>
</ol>

<h2>Prevention Beats Disavowing</h2>
<p>The best disavow file is the one you never need. Most problems come from a short list of habits: buying links, trading them in volume, letting an outside provider build links with no oversight and creating links with automated programs. Each of these is named in Google's link spam policy. If you hire help, ask for a list of every placement, check a sample yourself and insist that paid links carry a sponsored or nofollow attribute. If you run your own campaign, plan it with goals and review points, as in our <a href="/blog/link-building-campaign">link building campaign guide</a>. A clean, relevant profile is easier to defend than a large profile you have to clean up.</p>

<h2>How We Read the Pages</h2>
<ul>
<li>We read the 5 organic results for one query on one day (Google US, 18 October 2026). Four were guides we could read, and one was a forum thread that we did not count.</li>
<li>Counts show whether a page mentions a term, not how well it explains it.</li>
<li>The sample file was checked against the format rules on Google's disavow help page, read on 18 October 2026, using example domains only.</li>
<li>The statement about our own profile reflects our Links report on the last check and a review of all 13 links. It is not advice for your site.</li>
<li>Results in other countries or at other times will differ, so read Google's current page before you upload a file.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Google says most sites will not need the disavow tool.</li>
<li>Use it only if you have a considerable number of spammy, artificial or low-quality links and a manual action, actual or likely.</li>
<li>Try removing links first, then disavow the rest in a .txt file with <code>domain:</code> lines for whole sites.</li>
<li>The tool does not support Domain properties, and uploads take a few weeks to count.</li>
<li>Do not disavow because of a third-party toxicity score alone.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is the Google disavow tool?</summary>
<p>It is a Search Console tool where you upload a text file of URLs and domains you want Google to ignore when assessing links to your site. Google calls it an advanced feature to be used with caution.</p>
</details>
<details>
<summary>When should I use the disavow tool?</summary>
<p>Only if you have a considerable number of spammy, artificial or low-quality links and they have caused, or are likely to cause, a manual action. Most sites do not need it.</p>
</details>
<details>
<summary>What is a disavow file format?</summary>
<p>A UTF-8 or 7-bit ASCII text file ending in .txt, with one URL or domain per line. Use domain: before a domain, and start comment lines with #.</p>
</details>
<details>
<summary>How do I disavow toxic backlinks?</summary>
<p>First try to have them removed. Then list the remaining pages or domains in a text file and upload it to the disavow tool for the right property, if Google's two-part test is met.</p>
</details>
<details>
<summary>Does disavowing links remove them from the Links report?</summary>
<p>No. Google says disavowed links continue to be shown in the Links report.</p>
</details>
<details>
<summary>How long does a disavow file take to work?</summary>
<p>Google says it can take a few weeks to incorporate the list as it recrawls the web and reprocesses the pages.</p>
</details>
<details>
<summary>Can I disavow links in a Domain property?</summary>
<p>Google says the disavow tool does not support Domain properties. Use a URL-prefix property for your site.</p>
</details>
<details>
<summary>How do I undo a disavow?</summary>
<p>Upload a new file to replace the list, or select the property and click Cancel disavowals to remove all of them. Both take a few weeks to apply.</p>
</details>
<details>
<summary>Can disavowing hurt my site?</summary>
<p>Google says that if used incorrectly the feature can potentially harm your site's performance in Search. Disavowing good links or too many links is the main risk.</p>
</details>
</div>
`;
const title = 'Google Disavow Backlinks: When Google Says You Need It';
const excerpt = `Google disavow backlinks explained from Google's help page: most sites do not need it. ${D.ok} ranking guides read, a checked sample file and the two-part test.`;
const out = content.replace('@@SERPH@@', hh('google-disavow-backlinks-serp.png')).replace('@@FILEH@@', hh('google-disavow-backlinks-file.png'));
const post = { slug: SLUG, title, category: 'Link Building', author: 'Muhammad Reyan Nizami', date: '2026-10-18', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content: out };
const firstExt = out.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', out.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / out.length * 100).toFixed(1) + '%', 'faq', (out.match(/<details>/g) || []).length, 'h2', (out.match(/<h2>/g) || []).length, 'placeholders', (out.match(/@@/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const arr = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = arr.findIndex(p => p.slug === SLUG); if (i >= 0) arr[i] = post; else arr.push(post);
  fs.writeFileSync(fp, JSON.stringify(arr, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
