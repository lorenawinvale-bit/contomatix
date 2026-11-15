// 15 Nov 2026: expands why-hire-a-forensic-seo-consultant-2026 and how-to-vet-a-local-seo-company-2026 (both were under the 2,200-word floor, no images).
// Facts come from Google pages read on 15 Nov 2026: "Debugging drops in Google Search traffic", "Manual actions report", "Do you need an SEO?", Business Profile help "Tips to improve your local ranking" and "Tips for working with third parties".
// The unsourced price and duration claims in the forensic post are replaced with scoping advice. Idempotent (marker comments).
const fs = require('fs'); const path = require('path');
const fp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const slugs = new Set(posts.map(p => p.slug));
const ext = (u, t) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
function insertBefore(p, marker, html, tag) { if (p.content.includes(tag)) return false; const i = p.content.indexOf(marker); if (i < 0) throw new Error('marker missing: ' + marker); p.content = p.content.slice(0, i) + html + '\n' + p.content.slice(i); return true; }

// ---------------- forensic ----------------
{
  const p = posts.find(x => x.slug === 'why-hire-a-forensic-seo-consultant-2026'); const T = '<!-- exp-2026-11-15 -->';
  if (!p.content.includes(T)) {
    const secA = `${T}
<h2>Start With Google's Own Traffic-Drop Checklist</h2>
<p>Before paying anyone, read Google's guide to ${ext('https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops', 'debugging drops in Google Search traffic')}. It lists the main causes of a drop: an algorithmic update, technical issues, security issues, spam issues, seasonality and changing interests, and site moves or migrations. Most real investigations end up in one of those six buckets, so the first job of a forensic consultant is to rule the others out one by one, with dates instead of guesses.</p>
<p>Google also separates drops by size. A small shift, such as moving from position 2 to 4, can happen at any time and may reverse on its own, and Google recommends avoiding radical changes if the page is already performing well. A large fall, such as from the top 10 to position 29 across a wide range of terms, calls for a self-assessment of the whole website to check that it is helpful, reliable and people-first. Google adds that some changes take effect in days while others take several months.</p>
<p>The pattern of clicks and impressions points somewhere too. If both dropped, work through the six causes above. If impressions held steady but clicks fell, the page title and snippet may not give users a reason to click, or other sites may have had a more appealing rich result. Our guide to <a href="/blog/search-console-impressions-explained">Search Console impressions</a> explains how to read that difference.</p>

<h2>A Forensic Timeline You Can Build in One Afternoon</h2>
<p>A lot of the early work is free and sits in Search Console. Use this order, which follows Google's own guidance:</p>
<ol>
<li><strong>Set the date range to 16 months.</strong> This stops a yearly pattern, such as a festival or a season, being mistaken for a crash.</li>
<li><strong>Compare periods.</strong> Compare the last 3 months with the previous period, or year over year, and check queries, pages, countries, devices and search appearance to see where the change sits.</li>
<li><strong>Check each search type.</strong> Web, images, video and news can behave differently, so find which one dropped.</li>
<li><strong>Look at the Pages table.</strong> Is it the whole site, a group of pages or one important page?</li>
<li><strong>Read the diagnostic reports.</strong> The Crawl stats and Page indexing reports show a spike in technical issues, and the Security Issues and Manual Actions reports cover the rest.</li>
<li><strong>Match the date.</strong> Compare the day of the drop with Google's ranking updates page, and check Google Trends for your top queries to see whether demand fell across the web.</li>
<li><strong>Rule out a reporting glitch.</strong> Check the Search Console Data Anomalies page.</li>
</ol>
<p>That list is the part you can do yourself, and it is worth doing before you hire anyone, because it tells you what to ask for. If you have not set the property up yet, start with our guide to <a href="/blog/set-up-google-search-console">setting up Google Search Console</a>. What a forensic consultant adds is the evidence Search Console does not hold: server logs, dated backlink data and archived copies of the site.</p>
`;
    insertBefore(p, '<h2>How This Differs From a Standard SEO Audit</h2>', secA, T);
    // manual actions: add Google's own description before the negative SEO section
    const secC = `
<p>Google describes a manual action as the result of a human reviewer deciding that pages do not comply with its spam policies. The Manual actions report lists types such as unnatural links to your site, unnatural links from your site, thin content with little or no added value, cloaking and sneaky redirects, hidden text and keyword stuffing, user-generated spam and major spam problems. Fixing the issue on only some pages earns no partial return to search, and if you have several manual actions you must fix all of them.</p>
<p>When everything is fixed, you select Request Review and describe your fixes. Google says a good request does three things: it explains the exact quality issue, describes the steps you took to fix it and documents the outcome. Reviews can take several days or weeks, and link-related requests may take longer, so do not resubmit before you get a decision. If you recently bought the site, say so in the request. Our guides to <a href="/blog/what-is-a-google-penalty">what a Google penalty is</a> and <a href="/blog/google-disavow-backlinks">Google disavow backlinks</a> cover the link side.</p>
`;
    insertBefore(p, '<h2>Negative SEO and Proving It</h2>', secC, '<!-- exp-ma -->');
    p.content = p.content.replace('<h2>Negative SEO and Proving It</h2>', '<!-- exp-ma -->\n<h2>Negative SEO and Proving It</h2>'.replace('<!-- exp-ma -->\n', ''));
    // cost and time: replace unsourced figures
    const cs = p.content.indexOf('<h2>What This Costs and How Long It Takes</h2>'); const ce = p.content.indexOf('<h2>', cs + 10);
    if (cs < 0 || ce < 0) throw new Error('cost section missing');
    p.content = p.content.slice(0, cs) + `<h2>What This Costs and How Long It Takes</h2>
<p>We do not quote a typical price for forensic SEO here, because the scope depends on the size of the site, how much history exists and which kind of problem you have, and a figure without that context would be a guess. A better question for any consultant is what a fixed-scope diagnostic phase includes: which data they will examine, what the written report will contain and when you will receive it. It is usually scoped as a defined investigation rather than a monthly retainer.</p>
<p>Timing has two parts. The investigation depends on how quickly the data arrives, since server logs and historical exports can take time to obtain. Remediation depends on the cause: for a manual action, Google says reconsideration reviews can take several days or weeks, and link-related requests may take longer. Ask for dates in writing for each phase.</p>

` + p.content.slice(ce);
    // FAQ answers
    const rep = (q, a) => { const i = p.content.indexOf('<summary>' + q + '</summary>'); if (i < 0) throw new Error('faq missing ' + q); const s = p.content.indexOf('<p>', i); const e = p.content.indexOf('</p>', s); p.content = p.content.slice(0, s + 3) + a + p.content.slice(e); };
    rep('How much does forensic SEO cost?', 'It is usually scoped as a fixed diagnostic phase rather than a monthly retainer, and the price depends on site size, available history and the kind of problem. Ask what data will be examined and what the report will contain before you agree a figure.');
    rep('How long does it take?', 'It depends on how quickly logs and historical data can be obtained. For manual actions, Google says reconsideration reviews can take several days or weeks, and link-related ones may take longer.');
    if (p.content.includes('few thousand') || p.content.includes('one to three weeks')) throw new Error('unsourced figure remains');
    if (!p.content.includes(T)) p.content = p.content; // marker lives in secA
  }
}

// ---------------- vet ----------------
{
  const p = posts.find(x => x.slug === 'how-to-vet-a-local-seo-company-2026'); const T = '<!-- exp-2026-11-15 -->';
  if (!p.content.includes(T)) {
    const sec = `${T}
<h2>What Google Itself Tells You to Ask an SEO</h2>
<p>Google publishes its own advice for people hiring an SEO, in ${ext('https://developers.google.com/search/docs/fundamentals/do-i-need-seo', 'Do you need an SEO?')}. It suggests asking: can you show me examples of your previous work and success stories; do you follow the Google Search Essentials; what results do you expect, in what timeframe, and how do you measure success; what is your experience in my industry and in my country or city; how long have you been in business; and how will we communicate, including whether you will share every change you make and the reasoning behind your recommendations.</p>
<p>The same page lists warning signs. No one can guarantee a number one ranking, so be wary of anyone who claims a guarantee, a "special relationship" with Google or a "priority submit". Be careful if a company is secretive or will not explain what it intends to do. Google says you should never have to link to an SEO, and to avoid anyone who talks about link popularity schemes or submitting your site to thousands of search engines. Treat unsolicited emails about search engines with the same suspicion. And remember where responsibility sits: Google says you are ultimately responsible for the actions of any company you hire.</p>
<p>Two more checks are worth adding. If an agency offers an audit, Google advises granting only read access to Search Console at that stage, not write access, and an audit should give you realistic estimates of improvement and of the work involved (see our <a href="/blog/website-seo-audit">website SEO audit</a> checklist for what a real one covers). And ask whether the agency cites official Google documentation as evidence for its recommendations. If it sells AEO or GEO services, ask whether its advice matches Google's own guidance on generative AI features. Google also says that a small local business can probably do much of the work itself, which is worth remembering when a quote seems large.</p>

<h2>Extra Checks When the Work Is Google Business Profile</h2>
<p>For local work, Google has a second page that matters: ${ext('https://support.google.com/business/answer/7163406', 'tips for working with third parties to manage your Business Profile')}. It suggests learning how Business Profile works first, because it does not take long and you can then judge a provider better. When selecting one, ask whether they have managed Business Profiles before, and whether they have worked with businesses with similar budgets and audiences. Work with one third party at a time, since your business can only appear once on Google and testing two at once makes results impossible to separate. Then review your profile's performance every month in your own account.</p>
<p>Its warning signs line up with the red flags above: a lack of transparency about how many people view and click your profile, guaranteed placement on Google, claims to work for Google (ask for an email from a google.com address), and threats about removing your business, which no third party can do. The ranking page adds the key fact: local results are mainly based on relevance, distance and prominence, and Google says there is no way to request or pay for a better local ranking. That is why a promise of map pack position is a red flag, and why a neutral check, such as our <a href="/tools/geo-grid-rank-planner">geo-grid rank planner</a>, is more useful than a ranking screenshot. Our guides to <a href="/blog/local-seo-for-small-business">local SEO for small business</a> and <a href="/blog/local-keyword-research">local keyword research</a> show what the work itself should look like.</p>

<h2>A One-Page Scorecard for Comparing Two Agencies</h2>
<p>When two agencies both sound good, score each on the same short list. Answer yes or no, and write down the evidence.</p>
<ul>
<li>I know the name of the person who will do the work each day.</li>
<li>Analytics, Search Console and Business Profile stay in accounts I own.</li>
<li>The notice period for a first engagement is short, and nothing locks me in for a year.</li>
<li>They gave a case study at my budget level, or a client who will take a reference call.</li>
<li>They told me at least one thing not to spend money on.</li>
<li>They explained how they measure success in calls, enquiries or sales, not only rankings.</li>
<li>They cite Google's documentation, and they follow the Search Essentials.</li>
<li>They asked about my business and my competitors before quoting.</li>
<li>Any audit needed only read access, and the report was not a template.</li>
<li>They made no guarantee about rankings, a timeline or a special relationship with Google.</li>
</ul>
<p>Count the yeses, but treat the last line as a gate: a "no" there ends the conversation whatever the total says.</p>
`;
    insertBefore(p, '<h2>How to Tell If a "Best SEO Companies" List Is Trustworthy</h2>', sec, T);
  }
}
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
console.log('expanded');
