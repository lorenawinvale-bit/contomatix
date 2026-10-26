// node scripts/build-post-social-backlinks.js [--write] — data: 8 readable ranking pages (Google US, 26 Oct 2026), 5 Google Search Central docs searched the same day, and our own Google Business Profile setup (24 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js');
const R = require('../../keyword-research/serp-social-backlinks-2026-10-26.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const G = require('../../keyword-research/google-docs-2026-10-26.json').filter(g => g.status === 200);
const D = { shown: 9, ok: ok.length, median: Math.round((w[3] + w[4]) / 2), dofollow: c('dofollow'), nofollow: c('nofollow'), ugc: c('ugc'), socialSignals: c('socialSignals'), googleNo: c('googleNo'), platforms: c('platforms'), bio: c('bio'), traffic: c('traffic'), brand: c('brand'), steps: c('steps'), policy: c('policy'), spam: c('spam'), tools: c('tools'), gdoc: c('googleDoc'), dated: c('date'), gdocs: G.length, gSocial: G.reduce((a, g) => a + g.terms.social, 0) };
const exp = { shown: 9, ok: 8, median: 3055, dofollow: 6, nofollow: 8, ugc: 5, socialSignals: 7, googleNo: 1, platforms: 7, bio: 5, traffic: 8, brand: 5, steps: 4, policy: 0, spam: 8, tools: 8, gdoc: 2, dated: 2, gdocs: 5, gSocial: 0 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D));
build({
  slug: 'social-backlinks', category: 'Link Building', author: 'Hamza Siddiqui', date: '2026-10-26',
  title: 'Social Backlinks: What 8 Guides Claim and Google Never Says',
  excerpt: `Social backlinks examined: ${D.nofollow} of ${D.ok} guides mention nofollow, ${D.dofollow} say dofollow, and the term social appears 0 times in ${D.gdocs} Google docs. What to do instead.`,
  donut: [['SOCIAL', 'BACKLINKS'], [['Check the', 'Attribute'], 'Value the Traffic', ['Build the', 'Brand Profile'], 'Skip Automation', ['Earn Real', 'Mentions']]],
  cover: { badge: 'REAL SERP CHECK', search: 'social backlinks', card: `Guides read: ${D.ok} of ${D.shown}`, lines: [`Mention nofollow: ${D.nofollow} of ${D.ok}`, `Claim dofollow somewhere: ${D.dofollow} of ${D.ok}`, `Mention social signals: ${D.socialSignals} of ${D.ok}`, `Name Google's spam policy: ${D.policy} of ${D.ok}`], last: `Google docs using the term: 0 of ${D.gdocs}`, big: `0 of ${D.gdocs}`, k1: 'Google docs searched', k2: 'mention social signals', title: 'Social Backlinks', sub: 'What guides claim, what Google says' },
  info: { title: `Social Backlinks: ${D.ok} Guides Read`, sub: 'Organic results for "social backlinks", Google US, 26 October 2026', leftTitle: 'What the guides say', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Nofollow mentioned', sub: 'for social links', n: D.nofollow }, { label: 'Referral traffic', sub: 'as a benefit', n: D.traffic }, { label: 'Social signals', sub: 'discussed', n: D.socialSignals }, { label: 'Dofollow mentioned', sub: 'for some platforms', n: D.dofollow }, { label: "Google's spam policy", sub: 'named', n: D.policy }],
    rightTitle: 'A safer way to use social', rightTag: 'Four habits', items: [{ t: 'Fill every profile', s: 'name, bio, one link' }, { t: 'Judge by traffic', s: 'not by link credit' }, { t: 'Share what earns links', s: 'tools, data, guides' }, { t: 'Skip bulk posting', s: 'no automation' }],
    big: `0 of ${D.gdocs}`, noteHtml: `Google docs we searched use <em>social signals</em> as a ranking term.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for social backlinks say`, sub: `Organic results for "social backlinks" read on 26 October 2026 (${D.shown} listed, ${D.ok} readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Mention nofollow', `${D.nofollow} of ${D.ok}`], ['Mention referral traffic', `${D.traffic} of ${D.ok}`], ['Discuss social signals', `${D.socialSignals} of ${D.ok}`], ['Name specific platforms', `${D.platforms} of ${D.ok}`], ['Mention dofollow', `${D.dofollow} of ${D.ok}`], ['Mention ugc or user-generated links', `${D.ugc} of ${D.ok}`], ['Cover profile or bio links', `${D.bio} of ${D.ok}`], ['Warn about spam or automation', `${D.spam} of ${D.ok}`], ['Recommend tools or software', `${D.tools} of ${D.ok}`], ["Name Google's spam policy", `${D.policy} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a publish or update date', `${D.dated} of ${D.ok}`]] },
    google: { title: "What Google's own documents say", sub: 'Five Google Search Central documents searched on 26 October 2026 (spam policies, qualifying outbound links, SEO starter guide, multi-regional sites, localized versions).', head: ['Term', 'Mentions in 5 documents'], lastBold: false,
      rows: [['Social media, social network or social signal', String(D.gSocial)], ['ugc (the rel value for user-generated links)', String(G.reduce((a, g) => a + g.terms.ugc, 0))], ['nofollow as the fallback value', 'Named in qualifying outbound links'], ['Forum comments with optimized links', 'Listed as link spam']] },
    plan: { title: 'A realistic plan for social profiles', sub: 'Our suggestion. Check each platform\'s link attribute yourself before you count it as a backlink.', head: ['What to do', 'Why', 'Effort'], lastBold: false,
      rows: [['Complete each profile and add your site link', 'People find you and the profile can rank for your brand', 'One hour'], ['Add your social profiles to your Google Business Profile', 'Google lists the networks it accepts', '10 minutes'], ['Share posts that have earned links', 'More eyes means more chances to be cited', 'Weekly'], ['Reply with value on forums and groups', 'Real conversation, not link drops', 'Ongoing'], ['Never use bulk or automated posting', 'Automation is on Google\'s spam list', 'None']] }
  },
  content: h => `${h.updated}

<p><strong>Social backlinks</strong> are links to your site that appear on social networks: profile and bio links, posts, comments, and shared content. We read ${D.ok} pages that rank for the term on 26 October 2026. All ${D.nofollow} of ${D.ok} mention nofollow, ${D.dofollow} of ${D.ok} mention dofollow, and ${D.socialSignals} of ${D.ok} talk about social signals, yet in the ${D.gdocs} Google Search Central documents we searched, the words social media, social network and social signal appear ${D.gSocial} times.</p>

<p>This guide puts the guides' claims next to what Google publishes, shows how our own Google Business Profile treats social profiles, and gives a realistic plan. For the wider picture, see <a href="/blog/link-acquisition">link acquisition</a> and <a href="/blog/offpage-seo">off-page SEO</a>.</p>

<h2>What Social Backlinks Are</h2>
<p>A social backlink is any link to your site that lives on a social platform. The usual forms are a profile or bio link, a link inside a post or video description, a link in a comment, and a link that other people share. Because most platforms control how outbound links are marked, the attribute is the first thing to check: a link marked nofollow, ugc or sponsored is qualified, and Google's guidance on qualifying outbound links describes those values. That guidance names ugc for user-generated content such as comments and forum posts and nofollow as the fallback when other values do not apply.</p>

<h2>What ${D.ok} Top Guides Claim</h2>
${h.fig('serp', 'Table of what 8 social backlinks guides say: all 8 mention nofollow and referral traffic, 7 discuss social signals and name platforms, 6 mention dofollow, none name Google spam policy and 2 link Google documentation')}
<p>The pages agree on one point: ${D.nofollow} of ${D.ok} mention nofollow, and ${D.traffic} of ${D.ok} say the main benefit is referral traffic. They disagree on the rest. ${D.dofollow} of ${D.ok} call some social links dofollow, ${D.socialSignals} discuss social signals as a possible factor, and only ${D.googleNo} says outright that Google does not treat them as a ranking factor. ${D.spam} of ${D.ok} warn about spam or automation, and ${D.tools} of ${D.ok} recommend tools or software. They run a median of ${h.f(D.median)} words.</p>
<p>The gap is the same one we found elsewhere in link building. None of the ${D.ok} name Google's spam policy, ${D.gdoc} link to Google's documentation, and only ${D.dated} show a date. Platforms change their link attributes over time, so an undated claim that a platform gives dofollow links cannot be trusted without checking.</p>

<h2>What Google's Documents Say</h2>
${h.fig('google', 'Table of Google documents searched on 26 October 2026: social media, social network or social signal appears 0 times in 5 documents, while ugc and nofollow appear in the qualifying outbound links guidance')}
<p>We searched five Google Search Central documents for social media, social network and social signal. The terms appear ${D.gSocial} times. That does not prove social activity never helps, since people who see a post may visit, share or link to it. It does mean the claim "social signals are a ranking factor" has no support in the documents we read. What Google does publish is relevant in two places: its spam policies list forum comments with optimized links in the post or signature as link spam, and its guidance on qualifying outbound links gives ugc and nofollow as the values for user-generated and other links. So treat comment and post links as qualified by default, and treat bulk or automated posting as a risk.</p>

<h2>Our Own Check: Social Profiles in Google Business Profile</h2>
<p>We set up our own social profiles on 24 October 2026. Google Business Profile has a "social profiles" field that accepts a short list of networks: TikTok, X, YouTube, Facebook, Instagram, LinkedIn and Pinterest. We added LinkedIn and Facebook and saved them. This is a different kind of link from a social backlink, because it is Google's own field for telling it which profiles belong to the business, which helps it understand your brand. We also tried to check the attribute that LinkedIn gives the website link on our company page, but a logged-out visitor sees a sign-up wall, so we could not read it, and we do not claim to know it. If you need to know, view the source of the public page while signed in and check the link's rel.</p>

<h2>A Realistic Plan for Social Profiles</h2>
${h.fig('plan', 'Table of a realistic plan for social profiles: complete each profile with a site link, add profiles to Google Business Profile, share posts that earned links, reply with value on forums, and never use bulk or automated posting')}
<ol>
<li><strong>Complete every profile.</strong> Use the same name, description and one link to your site. A consistent profile helps people find you and often ranks for your brand name.</li>
<li><strong>List your profiles where Google asks.</strong> Add them to your Business Profile and to your site's Organization markup.</li>
<li><strong>Share what earns links.</strong> A free tool, a data study or a clear explainer is more likely to be cited than a promotional post. See <a href="/blog/linkable-assets">linkable assets</a>.</li>
<li><strong>Join conversations.</strong> Answer questions on forums and in groups. Add a link only when it genuinely helps, and expect it to be marked ugc or nofollow.</li>
<li><strong>Track what happens.</strong> Log social links in the <a href="/tools/backlink-monitor-tool">backlink monitor tool</a> and check each page's attribute with the <a href="/tools/outbound-link-checker">outbound link checker</a>.</li>
<li><strong>Skip bulk posting.</strong> Google lists using automated programs or services to create links as link spam.</li>
</ol>

${h.info('Infographic of what 8 social backlinks guides say: nofollow mentioned by 8, referral traffic by 8, social signals by 7, dofollow by 6 and Google spam policy by 0, plus four habits for using social safely')}

<h2>Where Social Links Can Help Without Passing Credit</h2>
<ul>
<li><strong>Referral traffic.</strong> ${D.traffic} of ${D.ok} guides name it as the main benefit, and a click is worth something even when the link is qualified.</li>
<li><strong>Brand discovery.</strong> ${D.brand} of ${D.ok} mention brand awareness. People who see you on a platform may search your name or link to you elsewhere.</li>
<li><strong>Profile results.</strong> A complete profile can appear when someone searches your brand. Our own brand search shows a company profile page among the results.</li>
<li><strong>Source material for editors.</strong> Journalists and bloggers check profiles before they quote or link. A clear profile makes that easier. See <a href="/blog/pr-link-building">PR link building</a>.</li>
</ul>

<h2>How to Treat Each Kind of Social Link</h2>
<p>We do not list the attribute each platform uses, because platforms change them and ${D.dated === 2 ? 'only 2 of the 8 guides show a date' : 'few guides show a date'}. Instead, treat each kind of link by how it is made and check the attribute yourself.</p>
<ul>
<li><strong>Profile and bio links.</strong> You control the text and the destination. Use your homepage or a page that explains what you do. The main benefit is that visitors can find your site, and the profile itself can appear for your brand name.</li>
<li><strong>Links in your own posts and video descriptions.</strong> You choose the page. Link to something worth reading, such as a guide or tool, and use a tracked URL so you can see the visits.</li>
<li><strong>Links in comments and replies.</strong> Other people may see them, but they are user-generated and Google asks that such links be marked ugc or nofollow. Post only when you add something useful, and do not repeat the same link across threads.</li>
<li><strong>Links other people share.</strong> These are the most useful, because someone chose to share your page. You cannot control them, but you can make them more likely by publishing things worth sharing.</li>
<li><strong>Links in paid or promoted posts.</strong> These are advertising. Mark them as paid on the platform and expect them to carry the platform's ad attribute.</li>
</ul>

<h2>How to Measure What Social Links Do for You</h2>
<p>If the benefit is traffic and brand, measure those. The steps are simple and free:</p>
<ol>
<li><strong>Tag your links.</strong> Build a tracked URL for each campaign with the <a href="/tools/utm-builder">UTM builder</a> so visits appear by source in Google Analytics.</li>
<li><strong>Watch branded search.</strong> In Search Console, look at queries that include your brand name. A rise after a campaign suggests more people looking for you. Our guide to <a href="/blog/search-console-impressions-explained">Search Console impressions</a> explains how to read the numbers carefully.</li>
<li><strong>Look for new mentions.</strong> Search your brand name a few weeks after a campaign and see whether new pages mention you. Turn the unlinked ones into links with <a href="/blog/link-reclamation">link reclamation</a>.</li>
<li><strong>Record links you earn.</strong> Log any link that results in the <a href="/tools/backlink-monitor-tool">backlink monitor tool</a>, with how it was acquired.</li>
</ol>
<p>A month of this tells you more than any claim in a guide, because it uses your own audience and platforms.</p>

<h2>Social Links Compared With Other Link Types</h2>
<p>Social links sit among the placed and user-generated links in a profile. They are quick to create and give you control over the text, which is why they are popular, and they are usually qualified, which is why they rarely pass ranking credit. Editorial links from articles are slower and harder, and they are the ones that tend to matter most for rankings. Our own profile shows the contrast: of 24 external links in Search Console on 21 October 2026, only 2 were editorial mentions inside articles. That is a reminder to spend most of your effort on content worth citing, and to use social as the channel that helps people find it. For the full comparison, see <a href="/blog/types-of-backlinks">types of backlinks</a> and <a href="/blog/high-authority-backlinks">high authority backlinks</a>.</p>

<h2>Questions to Ask Before Buying Social Backlinks</h2>
<ul>
<li>Which accounts will post my link, and do they have real followers and a clear topic?</li>
<li>Is the post marked as sponsored or paid on the platform?</li>
<li>Will the link be posted once, or repeated across many accounts? Repetition looks like the bulk pattern Google lists.</li>
<li>What is the attribute on the link, and can you show me a live example?</li>
<li>What happens to the post if the account is removed?</li>
</ul>
<p>A provider that sells hundreds of social backlinks for a small fee is selling the pattern Google describes as link spam. A provider that offers to share your content with a real audience, clearly labelled, is selling exposure, which is a different thing. Compare either with the cost and risk of earning links, using the <a href="/tools/link-building-cost-calculator">link building cost calculator</a>.</p>

<h2>Common Social Backlink Mistakes</h2>
<ul>
<li><strong>Counting every social link as a backlink.</strong> Most are qualified, so report them as profile and traffic assets.</li>
<li><strong>Using automation.</strong> ${D.tools} of ${D.ok} guides recommend tools, and ${D.spam} warn about spam. Do not create links in bulk.</li>
<li><strong>Dropping links in comments.</strong> Google lists forum comments with optimized links as link spam.</li>
<li><strong>Believing social signals are a confirmed ranking factor.</strong> We found no support in the Google documents we searched.</li>
<li><strong>Ignoring profile consistency.</strong> Different names and descriptions confuse people and search engines.</li>
</ul>

<h2>Matching Social Effort to Your Goal</h2>
<ul>
<li><strong>You want to be found by name.</strong> Complete a profile on the networks where your customers are, link them from your site and your Business Profile, and keep the details consistent.</li>
<li><strong>You want visits from a post.</strong> Publish something useful, link to it with a tracked URL and measure the sessions. Repeat what works.</li>
<li><strong>You want editorial links.</strong> Use social to put your best asset in front of writers, then contact them directly with a personal email. The link will come from their article, not from the post.</li>
<li><strong>You are tempted by a bulk service.</strong> Pause. If the result depends on many links created quickly, you are describing the pattern Google lists as link spam.</li>
</ul>
<p>Whichever goal you pick, write it down before you start, and decide what number would tell you it worked. That keeps social from becoming an activity you cannot justify, and it gives you a clear point at which to stop an approach that is not working.</p>

<h2>How We Read the Data</h2>
<ul>
<li>Page data comes from the organic results for "social backlinks" on Google US, 26 October 2026. ${D.shown} were listed; ${D.ok} returned a readable page (one product page was excluded). A topic counts once per page when its term appears in the text.</li>
<li>Google data comes from searching five Search Central documents for the terms shown. It does not cover every Google page.</li>
<li>Our own figures come from setting up our Google Business Profile on 24 October 2026 and from one attempt to read a company page as a logged-out visitor.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Most social links are qualified, and ${D.nofollow} of ${D.ok} guides mention nofollow.</li>
<li>Social signals appear 0 times in the ${D.gdocs} Google documents we searched.</li>
<li>Value social for traffic, brand and profile results, not for link credit.</li>
<li>Complete your profiles, share what earns links and skip automation.</li>
<li>Check each platform's link attribute yourself.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What are social backlinks?', 'They are links to your site that appear on social networks, such as profile links, bio links, post links and comment links.'],
    ['Are social backlinks dofollow or nofollow?', 'It depends on the platform and can change. All 8 guides we read mention nofollow, and 6 mention dofollow. Check the rel attribute of the specific link.'],
    ['Do social signals help SEO?', 'We found no mention of social signals as a ranking term in the 5 Google documents we searched. Social activity can bring traffic and mentions that lead to links.'],
    ['Do social links pass link credit?', 'Google asks that user-generated and other links be qualified with ugc or nofollow, so many social links will not pass ranking credit. They can still bring visitors.'],
    ['Should I add my social profiles to Google Business Profile?', 'Yes. The field accepts TikTok, X, YouTube, Facebook, Instagram, LinkedIn and Pinterest, and it tells Google which profiles belong to your business.'],
    ['Is automated social posting safe?', 'Google lists using automated programs or services to create links as link spam. Avoid bulk or automated link posting.'],
    ['Are comment and forum links worth it?', 'Only when they genuinely help the reader. Google lists forum comments with optimized links in the post or signature as link spam.'],
    ['What is the best social platform for backlinks?', 'There is no confirmed best one. Use the platforms your audience uses and judge them by traffic and mentions, not by link credit.'],
    ['How do I earn real links from social activity?', 'Share content that others want to cite, such as tools and data, and reach out to people who engage with it. See <a href="/blog/link-prospecting">link prospecting</a>.']
  ])}
`
});
