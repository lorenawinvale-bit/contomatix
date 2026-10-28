// node scripts/build-post-types-of-schema-markup.js [--write] — data: 8 readable ranking pages (Google US, 26 Oct 2026), Google's structured data docs and changelog read the same day, and a scan of the JSON-LD on our own 406 live URLs (26 Oct 2026). Sites are not named.
const build = require('./post-day9-common.js'); const fs = require('fs'); const path = require('path');
const R = require('../../keyword-research/serp-types-of-schema-markup-2026-10-26.json');
const ok = R.filter(o => o.status === 200 && o.words > 500); const c = k => ok.filter(o => o[k]).length;
const w = ok.map(o => o.words).sort((a, b) => a - b);
const GD = require('../../keyword-research/google-docs-day12-2026-10-26.json');
const CL = GD.howto.text; const INTRO = GD.intro.text;
for (const s of ['will no longer appear in Google Search starting May 7, 2026', 'Removed documentation for the FAQ rich result feature', 'course info', 'estimated salary', 'learning video', 'special announcement', 'vehicle listing', 'practice problem']) if (!CL.includes(s)) throw new Error('Google changelog text changed: ' + s);
if (!INTRO.includes('JSON-LD') || !INTRO.includes('(Recommended)')) throw new Error('Google intro changed');
const S = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'own-schema-types-2026-10-26.json'), 'utf8'));
const cnt = t => S.filter(r => r.t && r.t.includes(t)).length;
const O = { urls: S.length, org: cnt('Organization'), bc: cnt('BreadcrumbList'), faq: cnt('FAQPage'), person: cnt('Person'), post: cnt('BlogPosting'), app: cnt('WebApplication'), svc: cnt('Service'), howto: cnt('HowTo'), website: cnt('WebSite'), item: cnt('ItemList'), profile: cnt('ProfilePage'), microdata: S.filter(r => r.micro).length, blogFaq: S.filter(r => /\/blog\//.test(r.u) && r.t.includes('FAQPage')).length, blogs: S.filter(r => /\/blog\//.test(r.u)).length };
const expO = { urls: 406, org: 406, bc: 393, faq: 371, person: 351, post: 347, app: 39, svc: 11, howto: 1, website: 1, item: 3, profile: 3, microdata: 0, blogFaq: 322, blogs: 347 };
for (const k of Object.keys(expO)) if (O[k] !== expO[k]) throw new Error('own data changed ' + k + ' ' + O[k]);
const D = { shown: 8, ok: ok.length, median: Math.round((w[3] + w[4]) / 2), jsonld: c('jsonld'), microdata: c('microdata'), faq: c('faq'), howto: c('howto'), product: c('product'), review: c('review'), article: c('article'), localBusiness: c('localBusiness'), organization: c('organization'), breadcrumb: c('breadcrumb'), event: c('event'), recipe: c('recipe'), video: c('video'), person: c('person'), rich: c('rich'), validator: c('validator'), ranking: c('ranking'), deprecated: c('deprecated'), plugin: c('plugin'), policy: c('policy'), steps: c('steps'), gdoc: c('googleDoc'), dated: c('date') };
const exp = { shown: 8, ok: 8, median: 3239, jsonld: 7, microdata: 6, faq: 7, howto: 7, product: 8, review: 8, article: 7, localBusiness: 8, organization: 8, breadcrumb: 5, event: 8, recipe: 8, video: 6, person: 6, rich: 7, validator: 6, ranking: 4, deprecated: 7, plugin: 6, policy: 2, steps: 5, gdoc: 6, dated: 5 };
for (const k of Object.keys(exp)) if (D[k] !== exp[k]) throw new Error('data changed ' + k + ' ' + D[k]);
console.log(JSON.stringify(D), JSON.stringify(O));
const p = n => Math.round(n / O.urls * 100) + '%';
build({
  slug: 'types-of-schema-markup', category: 'Technical SEO', author: 'Umaira Liaquat', date: '2026-10-26',
  title: 'Types of Schema Markup: What 406 Pages on Our Site Use',
  excerpt: `Types of schema markup from our own scan of ${O.urls} pages, plus Google's May 2026 end of FAQ rich results and ${D.ok} guides compared. Which types still matter.`,
  donut: [['TYPES OF', 'SCHEMA MARKUP'], [['Pick the', 'Right Type'], 'Use JSON-LD', ['Match Visible', 'Content'], 'Validate It', ['Recheck Google', 'Support']]],
  cover: { badge: 'OUR OWN SCAN', search: 'types of schema markup', card: `Pages scanned: ${O.urls}`, lines: [`Organization: ${O.org} pages`, `BreadcrumbList: ${O.bc} pages`, `FAQPage: ${O.faq} pages`, `BlogPosting: ${O.post} pages`], last: 'FAQ rich results ended 7 May 2026', big: `${O.faq}`, k1: 'of our pages carry FAQPage', k2: 'that no longer gets a rich result', title: 'Types of Schema Markup', sub: 'What 406 pages on our site use' },
  info: { title: `Schema Markup: ${D.ok} Guides Read`, sub: 'Organic results for "types of schema markup", Google US, 26 October 2026', leftTitle: 'Types the guides name', leftTag: `Number of the ${D.ok} readable pages`, max: D.ok,
    bars: [{ label: 'Product, review, event, recipe', sub: 'named', n: D.product }, { label: 'Local business, organization', sub: 'named', n: D.localBusiness }, { label: 'FAQ', sub: 'named', n: D.faq }, { label: 'HowTo', sub: 'named', n: D.howto }, { label: 'Mention a type being removed', sub: 'or limited', n: D.deprecated }],
    rightTitle: 'A safe way to use schema', rightTag: 'Four habits', items: [{ t: 'Use JSON-LD', s: "Google's recommended format" }, { t: 'Describe what is visible', s: 'no hidden claims' }, { t: 'Validate every change', s: 'rich results test' }, { t: 'Recheck support', s: 'types get removed' }],
    big: `${O.faq}`, noteHtml: `of our ${O.urls} pages carry <em>FAQPage</em> markup, a rich result Google ended on 7 May 2026.` },
  tables: {
    serp: { title: `What ${D.ok} pages ranking for types of schema markup say`, sub: `Organic results read on 26 October 2026 (${D.shown} listed, all readable). Sites are not named. A topic counts once per page.`, head: ['Topic', 'Pages'], lastBold: false,
      rows: [['Name Product, Review, Event and Recipe types', `${D.product} of ${D.ok}`], ['Name LocalBusiness and Organization', `${D.localBusiness} of ${D.ok}`], ['Name Article or BlogPosting', `${D.article} of ${D.ok}`], ['Name FAQ', `${D.faq} of ${D.ok}`], ['Name HowTo', `${D.howto} of ${D.ok}`], ['Name BreadcrumbList', `${D.breadcrumb} of ${D.ok}`], ['Recommend JSON-LD', `${D.jsonld} of ${D.ok}`], ['Mention microdata or RDFa', `${D.microdata} of ${D.ok}`], ['Mention a validator or the Rich Results Test', `${D.validator} of ${D.ok}`], ['Say or imply schema boosts rankings', `${D.ranking} of ${D.ok}`], ['Mention a type removed or limited', `${D.deprecated} of ${D.ok}`], ["Link Google's documentation", `${D.gdoc} of ${D.ok}`], ['Show a date', `${D.dated} of ${D.ok}`]] },
    ours: { title: 'Schema types on our own site', sub: `JSON-LD found on ${O.urls} live URLs from our sitemap on 26 October 2026. A page can carry several types. No page uses microdata.`, head: ['Type', 'Pages', 'Share'], lastBold: false,
      rows: [['Organization', String(O.org), p(O.org)], ['BreadcrumbList', String(O.bc), p(O.bc)], ['FAQPage', String(O.faq), p(O.faq)], ['Person (author)', String(O.person), p(O.person)], ['BlogPosting', String(O.post), p(O.post)], ['WebApplication (our tools)', String(O.app), p(O.app)], ['Service', String(O.svc), p(O.svc)], ['ItemList', String(O.item), p(O.item)], ['HowTo', String(O.howto), p(O.howto)]] },
    google: { title: 'Structured data features Google ended or removed', sub: "From Google Search Central's documentation changelog, read on 26 October 2026.", head: ['When', 'What Google said'], lastBold: false,
      rows: [['9 Sep 2025', 'Removed docs for course info, estimated salary, learning video, special announcement and vehicle listing: no longer shown in results'], ['Jan 2026', 'Removed docs for the practice problem type: no longer shown in results'], ['8 May 2026', 'FAQ rich results deprecated: no longer appear from 7 May 2026'], ['12 Jun 2026', 'Documentation for the FAQ rich result removed']] }
  },
  content: h => `${h.updated}

<p><strong>Schema markup</strong> is structured data, usually written as JSON-LD, that labels the things on a page so search engines can understand them: an organization, an article, a product, a question and answer. To show you what real use looks like, we scanned the JSON-LD on all ${O.urls} URLs in our live sitemap on 26 October 2026. Every page carries Organization markup, ${O.bc} carry BreadcrumbList and ${O.faq} carry FAQPage. The last number needs a warning: Google's documentation says the FAQ rich result stopped appearing in Search from 7 May 2026.</p>

<p>This guide covers the main types of schema markup, what ${D.ok} top-ranking guides say, what we found on our own site, which types Google has dropped, and how to choose. To create and check markup, use our free <a href="/tools/schema-markup-generator">schema markup generator</a> and <a href="/tools/schema-markup-validator">schema markup validator</a>. For the wider technical picture, see our <a href="/blog/technical-seo-agency-2026">technical SEO guide</a>.</p>

<h2>What Is Schema Markup and How Google Reads It</h2>
<p>Google's introduction to structured data says it uses structured data to understand the content on a page and to show it in a richer appearance called a rich result. It says all three formats, JSON-LD, microdata and RDFa, are equally fine for Google as long as the markup is valid and implemented per the feature's documentation, and recommends the one that is easiest for you to implement and maintain, which in most cases is JSON-LD. ${D.jsonld} of ${D.ok} ranking pages recommend JSON-LD and ${D.microdata} mention microdata or RDFa. On our site, every page uses JSON-LD and none uses microdata.</p>

<h2>Types of Schema Markup: What ${D.ok} Top Guides Say</h2>
${h.fig('serp', 'Table of what 8 pages on types of schema markup say: Product, Review, Event, Recipe and LocalBusiness in all 8, FAQ and HowTo in 7, JSON-LD in 7, a validator in 6, a removed or limited type in 7 and a ranking boost in 4')}
<p>The guides name the same types: Product, Review, Event, Recipe, LocalBusiness and Organization in all ${D.ok}, Article or BlogPosting in ${D.article}, FAQ in ${D.faq} and HowTo in ${D.howto}. ${D.deprecated} of ${D.ok} mention that some types have been removed or limited, which shows how fast this area changes. ${D.validator} point to a validator or the Rich Results Test and ${D.gdoc} link to Google's documentation. Worth noting: ${D.ranking} of ${D.ok} say or imply that schema improves rankings. We found no support for that in the Google pages we read. Google describes structured data as a way to understand content and show rich results, which is not the same thing. They run a median of ${h.f(D.median)} words and ${D.dated} show a date.</p>

<h2>What We Found on Our Own ${O.urls} Pages</h2>
${h.fig('ours', 'Table of schema types on 406 Contomatix pages in October 2026: Organization 406, BreadcrumbList 393, FAQPage 371, Person 351, BlogPosting 347, WebApplication 39, Service 11, ItemList 3 and HowTo 1')}
<p>Our markup follows our page types. Every one of the ${O.urls} pages has Organization (our publisher information). ${O.post} blog posts carry BlogPosting with a Person author (${O.person} pages), ${O.bc} pages have a BreadcrumbList, our ${O.app} tool pages use WebApplication, ${O.svc} service pages use Service and the home page adds WebSite with a search action. ${O.faq} pages carry FAQPage: ${O.blogFaq} of our ${O.blogs} blog posts and every tool page. We also checked that every JSON-LD block parses. One page, our schema generator, only appeared to fail, because it contains the text of a script tag inside its own code, not a real block.</p>
<p>This is a small, specific picture of one site, not a benchmark. It does show the pattern most small sites will follow: a handful of types, matched to the kind of page.</p>

<h2>Schema Markup Types and When to Use Them</h2>
<ul>
<li><strong>Organization.</strong> Name, logo, URL and profiles for your business. Put it on every page or on your home and about pages. ${D.organization} of ${D.ok} guides cover it.</li>
<li><strong>LocalBusiness.</strong> For a business with a location or service area: address, hours, phone. ${D.localBusiness} of ${D.ok} cover it. It pairs with an accurate Business Profile.</li>
<li><strong>Article and BlogPosting.</strong> For posts and news: headline, author, dates, image. We use BlogPosting on all ${O.post} posts.</li>
<li><strong>Person.</strong> Authors and team members. We use it for every author.</li>
<li><strong>BreadcrumbList.</strong> The path to the page. ${D.breadcrumb} of ${D.ok} guides name it, and it helps show a clear site structure.</li>
<li><strong>Product and Review.</strong> For items for sale and genuine reviews. Only mark up what is visible on the page, and never invent ratings.</li>
<li><strong>Event and Recipe.</strong> For events and recipes, with the properties Google documents for each.</li>
<li><strong>VideoObject.</strong> For pages with an embedded video; ${D.video} of ${D.ok} guides cover it.</li>
<li><strong>WebApplication or SoftwareApplication.</strong> For tools and apps. We use WebApplication on our free tools.</li>
<li><strong>FAQPage and HowTo.</strong> See the next section before you add them.</li>
</ul>

<h2>Types Google Has Dropped</h2>
${h.fig('google', "Table of Google changelog entries on structured data: removed documentation for several types on 9 September 2025, practice problem in January 2026, FAQ rich results deprecated from 7 May 2026 and FAQ documentation removed on 12 June 2026")}
<p>Google's documentation changelog, which we read on 26 October 2026, records several structured data features ending. On 9 September 2025 it removed documentation for course info, estimated salary, learning video, special announcement and vehicle listing, saying these types are no longer shown in Search results. In January 2026 it removed the practice problem type for the same reason. On 8 May 2026 it added a deprecation notice saying the FAQ rich result would no longer appear in Google Search starting 7 May 2026, and on 12 June 2026 it removed the FAQ documentation, stating that the FAQ rich result is no longer shown.</p>
<p>What this means for you: FAQPage markup is still valid structured data, but the expected benefit, an expandable question list in the results, is gone. We did not find a Google statement that such markup now harms a page, and we have left ours in place for now. We no longer count on a rich result from it, and we write FAQs because readers want them. If you were adding FAQ markup only for the rich result, you can stop. We did not find a changelog entry for HowTo in the pages we read, so check Google's current documentation before relying on it.</p>

${h.info('Infographic of schema types named by 8 guides and our own scan: Organization on all 406 pages, BreadcrumbList 393, FAQPage 371 after Google ended FAQ rich results on 7 May 2026, plus four habits for using schema safely')}

<h2>Schema Markup SEO: How to Choose Types for Your Site</h2>
<ol>
<li><strong>Start from your page types.</strong> A blog needs Article and Person; a shop needs Product and Review; a local business needs LocalBusiness.</li>
<li><strong>Check Google's gallery.</strong> The structured data search gallery lists the features Google supports. If a type is not there, it will not produce a rich result.</li>
<li><strong>Use JSON-LD.</strong> It sits in one block, separate from your HTML, and is easiest to maintain.</li>
<li><strong>Match what is visible.</strong> Markup must describe content users can see. Do not mark up things that are not on the page.</li>
<li><strong>Generate and validate.</strong> Build the block with the <a href="/tools/schema-markup-generator">schema markup generator</a> and run it through the <a href="/tools/schema-markup-validator">schema markup validator</a>, then test with Google's Rich Results Test.</li>
<li><strong>Put it in the template.</strong> One template change covers every page of that type.</li>
<li><strong>Recheck every few months.</strong> Support changes, as the changelog shows.</li>
</ol>

<h2>Schema Markup Example: BlogPosting With an Author</h2>
<p>Here is the shape of the block we use on a blog post, simplified. Replace each value with your own and keep it matched to what is visible on the page.</p>
<pre><code>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Your post title",
  "datePublished": "2026-10-26",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": { "@type": "Organization", "name": "Your Brand" },
  "image": "https://example.com/images/cover.png"
}</code></pre>
<p>Notice what it contains: only facts a reader can see on the page, a clear type, and an author and publisher that match the byline and the site. That is the test for any markup you write: if a person visiting the page could not confirm it, leave it out.</p>

<h2>Schema Markup in WordPress: Plugins or Hand-Written Markup</h2>
<p>${D.plugin} of ${D.ok} guides mention plugins. For WordPress and similar systems, a reputable SEO plugin can output Organization, Article and Breadcrumb markup with little effort, and that is a good default. The risks are duplicates (two plugins writing the same type), wrong defaults (an author or logo that does not match your site) and types you do not need. Check the output of any plugin with a validator, and read the page source to see what is actually emitted. If you maintain your own templates, as we do, write the markup in one place so every page of a type gets the same, correct block. Our generator can produce a first version that you adapt.</p>

<h2>Website Schema Markup for Different Kinds of Sites</h2>
<ul>
<li><strong>Local business.</strong> LocalBusiness with address, phone and hours, matching your Google Business Profile exactly. Mismatches confuse people more than they help. See <a href="/blog/local-seo-for-small-business">local SEO for small business</a>.</li>
<li><strong>Online shop.</strong> Product with price, availability and genuine reviews, plus BreadcrumbList for categories.</li>
<li><strong>Publisher or blog.</strong> Article or BlogPosting with an author Person, and Organization for the site.</li>
<li><strong>Software or tools.</strong> WebApplication or SoftwareApplication with a name, category and offer. Our ${O.app} tool pages use WebApplication.</li>
<li><strong>Agency or service business.</strong> Organization, Service and BreadcrumbList, with profiles in the sameAs list.</li>
</ul>

<h2>A Maintenance Routine</h2>
<ol>
<li><strong>Quarterly:</strong> read Google's documentation changelog for structured data changes.</li>
<li><strong>After template changes:</strong> validate one page of each type.</li>
<li><strong>Monthly:</strong> check the Enhancements reports in Search Console for errors and warnings.</li>
<li><strong>Yearly:</strong> list the types you use and ask what each one does for you. If the answer is nothing, decide whether to keep it for other systems or remove it.</li>
</ol>
<p>The FAQ change is a good example of why. Our own site built FAQPage markup into 371 pages, and the rich result it was meant to produce stopped appearing on 7 May 2026. Markup that you maintain deliberately is easier to adjust than markup you added once and forgot.</p>

<h2>Questions to Ask Before You Add a New Type</h2>
<ul>
<li>Does Google list a feature for this type in its search gallery? If not, markup will not produce a rich result, though it may still describe the page for other systems.</li>
<li>Can a visitor see everything the markup claims? If not, remove the claim.</li>
<li>Will this markup need to change when the page changes, such as prices or dates? If so, generate it from the same data as the page.</li>
<li>Who will check it after the next template change? Assign an owner.</li>
<li>What would we do if Google stopped supporting it? For FAQ markup, we are keeping the visible questions and treating the markup as optional.</li>
</ul>
<p>These questions take five minutes and prevent the two most common problems: markup that says more than the page does, and markup nobody remembers to maintain. They also keep your effort focused on the types that matter for your kind of site, instead of adding every type a guide mentions. If you are unsure, start with the three that fit almost every site: Organization on your home page, BreadcrumbList on inner pages and Article or BlogPosting on posts, then add more only when a clear reason appears.</p>

<h2>Common Schema Markup Mistakes</h2>
<ul>
<li><strong>Expecting a ranking boost.</strong> ${D.ranking} of ${D.ok} guides imply one, but Google describes structured data as helping it understand content and show rich results.</li>
<li><strong>Marking up invisible content.</strong> Ratings or FAQs that users cannot see break Google's guidelines.</li>
<li><strong>Fake or self-serving reviews.</strong> Mark up only genuine reviews.</li>
<li><strong>Copying markup from another site.</strong> Wrong names, URLs and logos cause errors.</li>
<li><strong>Leaving removed types in place and counting on them.</strong> FAQ markup no longer brings a rich result.</li>
<li><strong>Never validating.</strong> A missing comma breaks a whole block. We parsed all ${O.urls} of ours to check.</li>
</ul>

<h2>How We Read the Data</h2>
<ul>
<li>Guide data comes from the organic results for "types of schema markup" on Google US, 26 October 2026. All ${D.shown} listed results returned a readable page. A topic counts once per page when its term appears in the text, which can include passing mentions.</li>
<li>Google statements come from its structured data introduction and its documentation changelog, read the same day.</li>
<li>Our counts come from fetching every URL in our live sitemap on 26 October 2026 and parsing each JSON-LD block. They describe one site.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>Use JSON-LD and match the types to your page types.</li>
<li>On our ${O.urls} pages, Organization appears on all, BreadcrumbList on ${O.bc}, FAQPage on ${O.faq} and BlogPosting on ${O.post}.</li>
<li>Google ended FAQ rich results from 7 May 2026 and removed several other structured data features.</li>
<li>Do not expect schema to boost rankings, and validate every change.</li>
<li>Recheck Google's documentation, because support changes.</li>
</ul>

<h2>Frequently Asked Questions</h2>
${h.faq([
    ['What are the main types of schema markup?', 'Common types include Organization, LocalBusiness, Article, Person, BreadcrumbList, Product, Review, Event, Recipe, VideoObject and WebApplication.'],
    ['Which schema format should I use?', "Google says JSON-LD, microdata and RDFa are all fine, and recommends the one easiest to implement and maintain, which is usually JSON-LD."],
    ['Why is schema markup important, and does it improve rankings?', 'It helps Google understand your content and can make pages eligible for rich results. We found no statement in the pages we read that it directly boosts rankings.'],
    ['Does FAQ schema still work?', 'Google says the FAQ rich result no longer appears in Search from 7 May 2026. The markup remains valid, but do not expect a rich result.'],
    ['Is FAQ schema harmful now?', 'We found no Google statement saying so. Keep the visible FAQ for readers and treat the markup as optional.'],
    ['How do I add schema markup?', 'Write a JSON-LD block, place it in the head or body, and test it. You can build one with our schema markup generator.'],
    ['How do I test schema markup?', 'Use a validator and Google\'s Rich Results Test, and check the Enhancements reports in Search Console for errors.'],
    ['Do I need schema on every page?', 'No. Use the types that fit each page. We put Organization on all pages and other types where they match the content.'],
    ['Which schema types did Google remove?', 'Its changelog lists course info, estimated salary, learning video, special announcement, vehicle listing, practice problem and the FAQ rich result.']
  ])}
`
});
