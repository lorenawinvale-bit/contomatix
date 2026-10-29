// node scripts/build-post-blogger-outreach.js [--write] — data: 7 readable ranking pages (Google US, 29 Oct 2026), Google's spam policies and "qualify outbound links" pages read the same day, Ahrefs mirror volumes (US, 29 Oct 2026) and our own Search Console Links report (29 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-blogger-outreach-2026-10-29.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const GL = require('../../keyword-research/google-docs-links-2026-10-29.json');
for (const [k, s] of [['spam', 'Buying or selling links for ranking purposes'], ['spam', 'Exchanging money for links, or posts that contain links'], ['spam', 'Sending someone a product in exchange for them writing about it and including a link'], ['spam', 'Excessive link exchanges'], ['spam', 'links with optimized anchor text in articles, guest posts, or press releases distributed on other sites'], ['spam', 'Using automated programs or services to create links to your site'], ['spam', 'normal part of the economy of the web for advertising and sponsorship purposes'], ['spam', 'rel="nofollow" or rel="sponsored"'], ['qualify', 'Mark links that are advertisements or paid placements'], ['qualify', 'though sponsored is preferred']]) if (!GL[k].text.includes(s)) throw new Error('Google text changed: ' + s);
const L = require('../../keyword-research/own-gsc-links-2026-10-29.json');
const sites = Object.values(L.topLinkingSites); const top5 = sites.reduce((a, b) => a + b, 0);
const O = { total: L.externalLinksTotal, home: L.topLinkedPages['https://contomatix.com/'], top5, gf: L.topLinkingSites['goodfirms.co'], dr: L.topLinkingSites['designrush.com'], internal: L.internalLinksTotal };
const expO = { total: 30, home: 23, top5: 24, gf: 13, dr: 6, internal: 10704 };
for (const k of Object.keys(expO)) if (O[k] !== expO[k]) throw new Error('own data changed ' + k + ' ' + O[k]);
const PROFILE = O.gf + O.dr; const pc = n => Math.round(n / O.total * 100);
const D = { listed: 8, ok: ok.length, median: Math.round(w[3]), sells: c('sells'), guide: c('guide'), email: c('emailTemplate'), tool: c('tool'), spam: c('spam'), personal: c('personalize'), followup: c('followup'), metrics: c('metrics'), guest: c('guest'), niche: c('linkInsert'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { listed: 8, ok: 7, median: 1997, sells: 7, guide: 7, email: 4, tool: 5, spam: 5, personal: 5, followup: 3, metrics: 7, guest: 7, niche: 4, gdoc: 0, dated: 0 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(O), PROFILE, pc(PROFILE), pc(O.home), pc(O.top5));
const f = n => n.toLocaleString('en-US');
build({
  slug: 'blogger-outreach', category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-29',
  title: "Blogger Outreach: Steps, Email Template and Google's Rules",
  excerpt: `Blogger outreach for SEO in five steps, with an email template and Google's link spam rules, checked against ${D.ok} ranking guides and our own ${O.total} backlinks.`,
  donut: [['BLOGGER', 'OUTREACH'], [['Find the', 'Right Blogs'], 'Qualify Them', ['Send a Real', 'Pitch'], 'Follow Up', ['Track the', 'Result']]],
  cover: { badge: 'OUR OWN LINKS', search: 'blogger outreach', card: `External links: ${O.total}`, lines: [`To the homepage: ${O.home}`, `From two profile sites: ${PROFILE}`, `Top 5 sites: ${O.top5} links`, `Internal links: ${f(O.internal)}`], last: "Google's link spam rules checked", big: String(O.total), k1: 'external links in Search Console', k2: `${pc(O.home)}% point at the homepage`, title: 'Blogger Outreach', sub: 'Steps, template and Google rules' },
  info: { title: `Blogger Outreach: ${D.ok} Guides Read`, sub: 'Organic results for "blogger outreach", Google US, 29 October 2026', leftTitle: 'What the guides cover', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Sell a service', sub: 'on the page', n: D.sells }, { label: 'Guest posts', sub: 'named', n: D.guest }, { label: 'Authority or traffic metrics', sub: 'named', n: D.metrics }, { label: 'Spam, nofollow or paid links', sub: 'mentioned', n: D.spam }, { label: 'Link to Google documentation', sub: 'on the page', n: D.gdoc }],
    rightTitle: "Google's link rules", rightTag: 'From its spam policies', items: [{ t: 'Paid or free-product links', s: 'qualify them' }, { t: 'Link exchanges', s: 'avoid excessive ones' }, { t: 'Optimized anchors', s: 'in guest posts: avoid' }],
    big: String(O.total), noteHtml: `external links in our Search Console, <em>${pc(PROFILE)}% from two profile sites</em>.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for blogger outreach cover`, sub: `Organic results read on 29 October 2026 (${D.listed} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Sell a service or tool', `${D.sells} of ${D.ok}`], ['Guest posts', `${D.guest} of ${D.ok}`], ['Authority or traffic metrics', `${D.metrics} of ${D.ok}`], ['How-to or guide wording', `${D.guide} of ${D.ok}`], ['Software, platform or tool', `${D.tool} of ${D.ok}`], ['Personalisation', `${D.personal} of ${D.ok}`], ['Spam, nofollow, sponsored or paid links', `${D.spam} of ${D.ok}`], ['An email template', `${D.email} of ${D.ok}`], ['Niche edits or link insertion', `${D.niche} of ${D.ok}`], ['Follow-up emails', `${D.followup} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`]] },
    google: { title: "What Google lists as link spam", sub: "From Google's spam policies, read on 29 October 2026.", head: ['Practice', "Google's wording", 'Rule'], lastBold: false,
      rows: [['Paid links', 'Exchanging money for links, or posts that contain links', 'Qualify with sponsored or nofollow'], ['Free product for a link', 'Sending someone a product in exchange for them writing about it and including a link', 'Qualify with sponsored or nofollow'], ['Optimized anchors in guest posts', 'Links with optimized anchor text in articles, guest posts or press releases on other sites', 'Avoid keyword-rich anchors'], ['Link exchanges', 'Excessive "link to me and I\'ll link to you"', 'Avoid doing it at scale']] },
    ours: { title: 'Our own Search Console Links report', sub: 'Read on 29 October 2026 for the contomatix.com domain property.', head: ['Measure', 'Value'], lastBold: false,
      rows: [['External links', String(O.total)], ['Pointing at the homepage', `${O.home} (${pc(O.home)}%)`], ['From the top 5 sites', `${O.top5} (${pc(O.top5)}%)`], ['From two profile sites', `${PROFILE} (${pc(PROFILE)}%)`], ['Internal links', f(O.internal)]] }
  },
  content: h => `${h.updated}

<p><strong>Blogger outreach</strong> is contacting bloggers and site owners to earn a mention, link or guest post, usually by email. We read ${D.ok} pages that rank for it on 29 October 2026. All ${D.ok} use guide-style wording, but all ${D.sells} also sell a service or tool, all ${D.metrics} talk about authority or traffic metrics and ${D.guest} cover guest posts. ${D.spam} mention spam, nofollow, sponsored or paid links, yet ${D.gdoc} link to Google's own documentation on the subject.</p>

<p>This guide gives a five-step process, an email template, what to track and what Google's link spam policy says, quoted from its own pages. It also shows our own Search Console Links report: ${O.total} external links, ${pc(PROFILE)}% of them from two profile pages. That is why we care about doing outreach properly. For the wider picture, see our guides to <a href="/blog/white-hat-link-building">white hat link building</a> and <a href="/blog/link-acquisition">link acquisition</a>.</p>

<h2>What Is Blogger Outreach? (And What It Is Not)</h2>
<p>Blogger outreach means starting a conversation with people who run blogs or content sites in your field. The goal can be a guest post, a mention in an existing article, a link added to a relevant page, a product review or an expert quote. It is different from buying links, from automated mass email and from posting comments with links. Most of the value comes from relevance: a single link from a site your customers read is worth more than ten from sites no one visits. The monthly US searches around the topic, from the Ahrefs mirror we use on 29 October 2026, show how people word it: "blogger outreach" 800, "blogger outreach agency" 500, "blogger outreach program" 150, "blogger outreach software" 150 and "blogger outreach email template" 150.</p>

<h2>Blogger Outreach Link Building: What ${D.ok} Ranking Guides Say</h2>
${h.fig('serp', 'Table of what 7 pages on blogger outreach cover: all 7 sell a service or tool, mention guest posts and discuss authority or traffic metrics, 5 mention spam or paid links, 4 give an email template and none link to Google documentation')}
<p>The median guide has about ${f(D.median)} words and none shows a date. ${D.tool} of ${D.ok} mention software or a platform, ${D.personal} mention personalisation and ${D.email} include an email template. Only ${D.followup} mention follow-ups, which is where many campaigns are won. The gap that matters most is the last row: no guide links to what Google says, and that is the part that can get a link, or a site, into trouble.</p>

<h2>What Google Says About Links You Ask For</h2>
${h.fig('google', "Cards of what Google's spam policies list as link spam: paid links, a free product for a link, optimized anchors in guest posts and excessive link exchanges, with the rule that paid or sponsored links should be qualified")}
<p>Google's <a href="https://developers.google.com/search/docs/essentials/spam-policies" target="_blank" rel="nofollow noopener">spam policies</a> define link spam as creating links to or from a site primarily to manipulate search rankings. The examples include buying or selling links for ranking purposes: exchanging money for links or for posts that contain links, exchanging goods or services for links, and sending someone a product in exchange for them writing about it and including a link. They also include excessive link exchanges, using automated programs or services to create links, and advertorials or native advertising where payment is received for articles that include links that pass ranking credit, or links with optimized anchor text in articles, guest posts or press releases distributed on other sites.</p>
<p>Google also says it understands that buying and selling links is a normal part of the web's economy for advertising and sponsorship. It is not a violation as long as such links are qualified with rel="nofollow" or rel="sponsored". On its page about <a href="https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links" target="_blank" rel="nofollow noopener">qualifying outbound links</a>, Google says to mark advertisements and paid placements with the sponsored value, and that nofollow is still acceptable although sponsored is preferred. In practice: if you pay, send free products or require a link in a contract, ask for a qualified link or expect none. If you want a link that counts, earn it with something the blogger wants to share.</p>

<h2>Blogger Outreach for SEO: Five Steps</h2>
<ol>
<li><strong>Find the right blogs.</strong> Search the topic, look at who is linked in the top results and at who writes about your subject. Use our <a href="/tools/link-prospect-scorer">link prospect scorer</a> to rank candidates.</li>
<li><strong>Qualify them.</strong> Check that the site is real, covers your topic, is updated and is read. ${D.metrics} of ${D.ok} guides rely on authority or traffic metrics. Use them as a filter, not a goal.</li>
<li><strong>Send a real pitch.</strong> One specific idea, for one specific site, in a short email.</li>
<li><strong>Follow up once or twice.</strong> A short, polite reminder after about a week. Stop if there is no reply.</li>
<li><strong>Track the result.</strong> Record who replied, who linked and which anchor text was used. Our <a href="/tools/backlink-monitor-tool">backlink monitor</a> and <a href="/tools/link-building-management-tool">link building management tool</a> help.</li>
</ol>

<h2>Blogger Outreach Email Template</h2>
<p>A template saves time, but only if you change what matters. This one is under 120 words and has one clear ask:</p>
<blockquote><p>Subject: A data point for your post on [topic]<br>Hi [name],<br>I read your post "[title]", especially the part about [specific detail]. We recently [ran a test or collected data] on [related topic] and found [one-line result]. If it is useful, you are welcome to use it in that post, and I can send the full numbers.<br>Thanks for the useful article,<br>[Your name], [role]</p></blockquote>
<p>Why it works: it refers to a real detail, offers something rather than asking for a link and makes a reply easy. ${D.personal} of ${D.ok} guides say to personalise, and the template shows what that means in practice. Use our <a href="/tools/outreach-email-generator">outreach email generator</a> to draft versions, and always rewrite the opening line by hand.</p>

${h.info('Infographic of what 7 blogger outreach guides cover: service pages 7, guest posts 7, authority metrics 7, spam or paid links 5 and zero linking Google documentation, plus three of Google link spam rules and our own 30 external links')}

<h2>Blogger Outreach Campaign: Follow-Up and Tracking</h2>
<p>A campaign is a batch of emails with a goal, a list and a deadline. Keep each batch small enough to personalise, such as 20 sites. Send, wait about a week, send one follow-up, then stop. Record each contact in a sheet with columns for site, contact, date sent, reply, outcome and link URL. When a link goes live, check it: the page should load, the link should be in the body, the anchor should read naturally and the rel attribute should match what you agreed. Our <a href="/tools/anchor-text-checker">anchor text checker</a> and <a href="/tools/outbound-link-checker">outbound link checker</a> help with those checks.</p>

<h2>Blogger Outreach Program, Platform and Software: Do You Need One?</h2>
<p>${D.tool} of ${D.ok} guides mention software or a platform. For a first campaign you do not need one: a spreadsheet and an email account are enough. Software becomes useful when you send enough emails that tracking replies by hand is error-prone. Whatever you choose, keep control of the message: tools that send the same text to hundreds of sites are risky, because Google's examples of link spam include using automated programs or services to create links. If you run a regular outreach program, plan it as part of a content map; our guide to <a href="/blog/topical-map-seo">topical map SEO</a> shows how to decide what each outreach piece should link to.</p>

<h2>Blogger Outreach Agency: What to Ask Before You Hire</h2>
<p>"Blogger outreach agency" is the second most searched term in this topic, with about 500 US searches a month. Since all ${D.ok} ranking pages sell something, ask direct questions:</p>
<ul>
<li>Which sites will the links come from, and can you see them before they are placed?</li>
<li>Is the content written for a real audience, or only to hold a link?</li>
<li>How are paid placements marked, and do the links carry sponsored or nofollow?</li>
<li>What happens if a link is removed?</li>
<li>Will you report outcomes (clicks, referrals, rankings), not only link counts?</li>
</ul>
<p>We offer <a href="/services/guest-posting">guest posting</a> and <a href="/services/link-building">link building</a> ourselves, so judge us by the same questions.</p>

<h2>Blogger Outreach Niche Edits and Guest Posts</h2>
<p>${D.guest} of ${D.ok} guides cover guest posts and ${D.niche} cover niche edits, which means adding a link to an existing article. Both can be done properly and both can be abused. A guest post should teach the blog's readers something, and a niche edit should add a source or example that improves the existing page. Google's list names links with optimized anchor text in guest posts distributed on other sites, so use natural, descriptive anchors and keep the number of links low. Our guides to <a href="/blog/pr-link-building">PR link building</a> and <a href="/blog/directory-links">directory links</a> cover related methods.</p>

<h2>Blogger Outreach Strategy: What to Offer</h2>
<p>The strategy question is not "how do we get a link" but "what does this blogger gain by linking to us?". Offers that tend to work are the ones that save the blogger effort or improve their post:</p>
<ul>
<li><strong>Original data.</strong> A number the blogger can quote that they cannot get elsewhere. This is why every post we publish carries data from our own site.</li>
<li><strong>A correction or update.</strong> A broken source, an out-of-date figure or a changed rule, with the fix attached.</li>
<li><strong>An expert quote.</strong> A short, usable answer to a question the post raises.</li>
<li><strong>A free tool or template</strong> that fits the post, such as one of our <a href="/tools">free SEO tools</a>.</li>
<li><strong>A guest article</strong> written for their readers, if they accept them.</li>
</ul>
<p>Choose the offer first, then the sites. If you cannot say in one sentence why a blogger's readers would care, change the offer before you send anything.</p>

<h2>How to Build a Blogger Outreach List</h2>
<ol>
<li>Search the exact topic and list every site on the first two pages that publishes articles, not only stores or directories.</li>
<li>Open the "related" and "resources" sections of those articles and note who they link to.</li>
<li>For each site, check the basics: recent posts, a real author, a contact method and a topic match.</li>
<li>Remove sites that sell links openly, run only sponsored posts or have no readers.</li>
<li>Score what is left. Our <a href="/tools/link-prospect-scorer">link prospect scorer</a> helps you rank them.</li>
</ol>
<p>A list of 20 good sites beats a list of 500 weak ones, because it is the only size at which you can still write a real first line to each person.</p>

<h2>A Worked Example of One Pitch (Illustrative)</h2>
<p>This is an illustration of the method, not a real result. Suppose we want to be cited by a blog that has published "How to set up Google Search Console". We read the post and notice it says nothing about how many pages end up not indexed. We have our own numbers on that. The email gives the blogger one line of data, offers the full figures and links to our guide, <a href="/blog/set-up-google-search-console">how to set up Google Search Console</a>. We do not ask for a link, we offer a fact for their post. If they use it, they decide how to credit it. That is the pattern behind every step above: start from the blogger's page, bring something that improves it and let the link follow from the usefulness.</p>

<h2>Blogger Outreach Campaign Examples: What to Measure</h2>
<ul>
<li><strong>Emails sent</strong> and <strong>replies received</strong>, so you can see whether the pitch gets read.</li>
<li><strong>Links live</strong> and their anchor text and rel attribute.</li>
<li><strong>Referral clicks</strong> from the linking page, to see if real readers follow it.</li>
<li><strong>Rankings and impressions</strong> for the linked page in Search Console over the following weeks.</li>
</ul>
<p>Do not copy another site's reply rate as a target. Results depend on the offer, the list and the niche. Compare your own campaigns with each other and change one thing at a time.</p>

<h2>What Our Own Links Report Shows</h2>
${h.fig('ours', 'Rings showing our Search Console Links report on 29 October 2026: 24 of 30 external links come from the top 5 sites, 23 of 30 point at the homepage and 19 of 30 come from two profile sites')}
<p>On 29 October 2026 the Links report for contomatix.com showed ${O.total} external links. ${O.home} of them point at the homepage and ${O.top5} come from just five sites. The two largest linking sites, ${O.gf} and ${O.dr} links, are profile pages on directories, together ${PROFILE} of ${O.total} links. That is useful to know: those links exist, but they say little about whether bloggers in our field read and cite us. That is consistent with our best guides sitting far down the results. Outreach is how we change the mix, and the rules above are how we plan to do it.</p>

<h2>Blogger Outreach Best Practices and Mistakes</h2>
<ul>
<li><strong>Offer something useful:</strong> data, an example, a correction or a quote.</li>
<li><strong>Write each opening line by hand,</strong> and keep emails short.</li>
<li><strong>Do not send hundreds of identical emails.</strong></li>
<li><strong>Qualify paid or free-product links</strong> with sponsored or nofollow, as Google asks.</li>
<li><strong>Vary anchor text,</strong> and use descriptive, not keyword-stuffed, anchors.</li>
<li><strong>Do not promise results</strong> to the person you contact, such as a link back.</li>
<li><strong>Check every live link</strong> and keep a record.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Blogger outreach is a conversation with relevant site owners, not a mass mailing.</li>
<li>All ${D.ok} ranking guides sell something and none link to Google's documentation.</li>
<li>Google lists paid links, free-product-for-link deals, excessive exchanges and optimized anchors in guest posts as link spam examples, and says paid or sponsored links should be qualified.</li>
<li>Use five steps: find, qualify, pitch, follow up, track.</li>
<li>Our own Links report shows ${O.total} external links, ${pc(PROFILE)}% from two profile pages: a reason to earn links properly.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What is blogger outreach?', 'Contacting bloggers and site owners, usually by email, to earn a mention, link, guest post or review.'],
    ['Is blogger outreach good for SEO?', 'It can be, when it earns relevant links from real sites. Links that are bought or exchanged at scale break Google\'s link spam policy unless they are qualified.'],
    ['How do I write a blogger outreach email?', 'Refer to a specific detail in their post, offer something useful, keep it short and make one clear ask. See the template above.'],
    ['How many follow-ups should I send?', 'One or two, about a week apart. Stop if there is no reply.'],
    ['Do I need blogger outreach software?', 'Not for a first campaign. A spreadsheet works. Software helps once tracking replies by hand becomes error-prone.'],
    ['Does Google allow paid links?', 'Google says buying and selling links for advertising and sponsorship is not a violation if the links are qualified with rel="nofollow" or rel="sponsored".'],
    ['What is a niche edit?', 'Adding a link to an existing article rather than a new post. It should improve the page, not only carry a link.'],
    ['Should I hire a blogger outreach agency?', 'Only if they show you the sites, explain how paid links are marked and report results beyond link counts.'],
    ['How do I know if outreach worked?', 'Track replies, live links, referral clicks and rankings, and check the Links report in Search Console.']
  ])}
`
});
