// Builds and inserts the "ai tools for seo keyword research" post. Local helper, run: node scripts/build-post-ai-tools-keyword-research.js
const fs = require('fs'); const path = require('path');
const root = path.join(__dirname, '..');
const SLUG = 'ai-tools-for-seo-keyword-research';
const guesses = require('../../keyword-research/ai-guess-test-2026-10-09.json');
const tsv = fs.readFileSync(path.join(root, '..', 'keyword-research', 'master-keywords-us.tsv'), 'utf8').split(/\r?\n/).slice(1).map(l => l.split('\t'));
const num = s => { const m = String(s).trim().match(/^([\d.,]+)\s*([kK])?$/); let n = parseFloat(m[1].replace(/,/g, '')); return m[2] ? n * 1000 : n; };
const fmt = n => n >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0).replace(/\.0$/, '') + 'K' : String(n);
const fmtG = n => n.toLocaleString('en-US');

const rows = Object.entries(guesses).map(([k, g]) => { const r = tsv.find(x => x[0] === k); const a = num(r[2]); return { k, g, a, aTxt: r[2], kd: r[3], ratio: g / a }; });
const within = rows.filter(r => r.ratio >= 0.5 && r.ratio <= 2).length;
const far = rows.filter(r => r.ratio >= 5 || r.ratio <= 0.2).length;
const over = rows.filter(r => r.ratio > 1).length, under = rows.length - over;
const verdict = r => { const x = r.ratio; if (x >= 0.5 && x <= 2) return 'Within 2x'; return x > 1 ? x.toFixed(1) + 'x too high' : (1 / x).toFixed(1) + 'x too low'; };
if (rows.length !== 21 || within !== 8 || far !== 6) throw new Error('data changed: ' + rows.length + ' ' + within);
console.log({ within, far, over, under });

const tableRows = rows.map(r => `<tr><td>${r.k}</td><td style="text-align:right;">${fmtG(r.g)}</td><td style="text-align:right;">${r.aTxt}</td><td style="text-align:right;">${r.kd}</td><td>${verdict(r)}</td></tr>`).join('\n');

const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>We handed an AI model 21 real keywords from our own Ahrefs export, hid the numbers from it, and asked for a monthly US search volume for each. It landed within a factor of two on only ${within} of them. Six were off by five times or more. That result decides how we use <strong>AI tools for SEO keyword research</strong>: they are useful for finding and sorting ideas, and they should never be the source of a volume figure.</p>

<p>This guide shows the full test, explains where the misses came from, and lays out the five-step routine we now follow. It also covers where to get numbers you can trust, what Google says about AI-assisted content, and when a paid platform earns its price. If you are choosing software first, our <a href="/blog/keyword-research-tools">free keyword research stack</a> covers the data side in more detail.</p>

<h2>What AI Tools for SEO Keyword Research Can and Cannot Do</h2>
<p>A keyword tool with a database counts things. It records how often a phrase was searched, how hard the top results are to beat, and which pages already rank. A language model does something different. It predicts likely text from patterns it has seen, which makes it good at language tasks and unreliable as a counter.</p>
<p>In practice that splits the job in two. AI handles the work that is about meaning:</p>
<ul>
<li><strong>Brainstorming.</strong> Give it your service, your customer and a few problems they have, and it will produce the phrases those customers might type, including question-style searches you would not think of.</li>
<li><strong>Grouping.</strong> Paste a long list and ask which phrases belong on the same page. This is tedious by hand and quick for a model.</li>
<li><strong>Intent labelling.</strong> Marking each phrase as informational, commercial or transactional, so you pick the right kind of page.</li>
<li><strong>Gap spotting.</strong> Comparing your keyword list with your existing page titles and pointing at what has no page.</li>
</ul>
<p>The numbers belong to a data source. Volume, difficulty and the real list of pages ranking today have to come from something that measures them. The test below shows why we draw the line there.</p>

<h2>The Test: 21 Real Keywords, Guessed Blind</h2>
<p>Our keyword bank is built from US Ahrefs exports pulled in September 2026, including a few competitor-research pulls. We took every 23rd row, which gave 21 keywords, and printed only the phrases with no numbers. Before looking at any figure, the assistant wrote down a monthly US volume for each one. Then we compared the guesses with the export. The assistant is Claude, the same model that helps with research on this site, and the guesses are saved with the date they were made.</p>
<p>The volumes in an export are estimates too, so read the "off by" column as distance from a reference figure rather than from the truth. Keyword difficulty (KD) is shown for context only. The assistant was not asked to guess it.</p>
<div style="overflow-x:auto;margin:18px 0;">
<table style="width:100%;border-collapse:collapse;font-size:0.92rem;">
<thead><tr><th style="text-align:left;">Keyword</th><th style="text-align:right;">AI guess</th><th style="text-align:right;">Export volume</th><th style="text-align:right;">KD</th><th style="text-align:left;">Result</th></tr></thead>
<tbody>
${tableRows}
</tbody>
</table>
</div>
<p>The scorecard: ${within} of 21 within a factor of two, ${over} guesses too high and ${under} too low, and ${far} of 21 off by five times or more. If you had planned a content calendar from those guesses, roughly three posts in ten would have been sized wrongly.</p>

<h2>What the Misses Have in Common</h2>
<p>Twenty-one keywords is a small sample, so treat these as observations rather than rules. Two patterns showed up.</p>
<p><strong>Newer phrasing was undercounted.</strong> The three worst underestimates were all about AI search: "easiest ai search optimization software to use" (guessed 30, export says 250), "generative ai seo software" (150 against 900) and "llm seo tool" (300 against 1.4K). A model trained on text that mostly predates this vocabulary has little sense of how often people now type these phrases.</p>
<p><strong>Famous or familiar topics were overcounted.</strong> "Will ai replace seo" was guessed at 1,500 and sits at 200. "Utm content" and "estimate invoice template" were each guessed at 1,000 and sit at 150. "Keyword research tools" was guessed at 12,000 and sits at 3.6K. These are topics that feel big because they are discussed a lot, which is not the same as being searched a lot.</p>
<p>That second pattern is the more dangerous one for a content plan, because it sends you toward crowded subjects that look valuable. It is also the reason we do not trust an AI-written list of "high volume keywords" even when the list looks sensible.</p>

<h2>Where the Real Numbers Come From</h2>
<p>You have three realistic sources, and each one answers a different question.</p>
<ul>
<li><strong>Your own Search Console data.</strong> The Performance report lists the queries your pages already appeared for, with impressions and position. It only covers searches where your site showed up, and Google leaves out some queries to protect privacy, so it will not reveal topics you have never ranked for.</li>
<li><strong>A keyword database.</strong> An export from an SEO platform gives volume and difficulty estimates for phrases you have never ranked for. This is where the table above got its numbers. Treat the figures as comparable to each other, not exact.</li>
<li><strong>The results page itself.</strong> Search the phrase and read page one. Who ranks, what format they use and how recent they are tells you whether you can compete. A simple check we also record is the allintitle count, the number of pages with the phrase in their title.</li>
</ul>
<p>None of these replace judgement, but all of them measure something. That is the property an AI guess lacks.</p>

<h2>A Five-Step Workflow That Uses AI Without Trusting It</h2>
<p>This is the order we follow when we build a keyword list. AI does steps one and three, data does step two, and a mapping step keeps the result tidy.</p>
<ol>
<li><strong>Brainstorm with specifics.</strong> Describe the business, the customer and the problem in two or three sentences, then ask for the phrases that customer would type and the questions they would ask. A vague request returns generic head terms, and a detailed one returns the long, awkward searches that real people use.</li>
<li><strong>Verify every phrase against data.</strong> Run the list through your keyword database or check it in Search Console. Delete anything with no measurable demand. Models sometimes produce plausible phrases that nobody searches, and this step removes them.</li>
<li><strong>Cluster and label intent.</strong> Paste the verified list back in and ask for groups, where each group is a set of phrases one page could answer, plus an intent label for each. Read the groups critically, because a model will sometimes merge two searches that need different pages.</li>
<li><strong>Map clusters to pages.</strong> Check each group against what you already have. Our free <a href="/tools/keyword-mapping-tool">keyword mapping tool</a> matches keywords to your URLs, flags the ones that need a new page and groups near-duplicate phrases so two posts do not chase the same search.</li>
<li><strong>Read the live results before you write.</strong> For each keyword you plan to target, open page one and note the format, the depth and what the pages leave out. A model that cannot see today's results cannot do this for you.</li>
</ol>
<figure style="margin:20px 0;"><img src="/images/blog/proof/keyword-mapping-tool-ai-keyword-list.png" alt="Contomatix keyword mapping tool with nine keywords and five page URLs entered, showing which keywords map to existing posts and which need a new page" width="1160" height="798" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>The screenshot shows a useful side effect. "Link building outsourcing" is flagged for review because it shares most of its words with "outsource link building". One page should cover both, and a model-generated list often contains several phrasings of the same search.</p>

<h2>AI Assistant, SEO Platform or Spreadsheet: Which to Use</h2>
<p>Most people end up using more than one. The question is which job each one gets, and the infographic below sums up the split we use.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-ai-tools-for-seo-keyword-research.png" alt="Infographic comparing what an AI assistant does well in keyword research, such as brainstorming, clustering and intent labels, with what a data tool must supply, such as volume, difficulty and live results" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li><strong>A general AI assistant</strong> costs little, handles messy lists and is good for steps one and three. It has no measured data of its own, so pair it with a source from the previous section. Our post on <a href="/blog/chatgpt-for-seo">prompts we use for SEO</a> has examples of how to phrase these requests.</li>
<li><strong>An SEO platform with AI features</strong> adds suggestions and clustering on top of a real database. That is the better fit when you research often, because the grouping happens next to the volume and difficulty numbers.</li>
<li><strong>A spreadsheet and Search Console</strong> is the free route, and it is enough for a small site. You get your own query data and a place to record volume, difficulty and allintitle counts by hand.</li>
</ul>
<p>Whichever you pick, check what the AI feature actually reads. If it is working from a database, the numbers can be trusted as far as that database can. If it is a chat window with no data connected, assume every figure it gives you is a guess.</p>

<h2>What Google Says About AI in Your Content</h2>
<p>Using AI for research does not conflict with Google's guidance. Google's page on generative AI content says the technology can be particularly useful when researching a topic and when adding structure to original content. The warning is about volume without value: generating many pages that add nothing for users may fall under the scaled content abuse spam policy.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-using-generative-ai-content-guidance.jpg" alt="Google Search Central page titled Google Search's guidance on using generative AI content on your website, with the section Focus on accuracy, quality, and relevance" width="947" height="530" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>The same page makes the point our test illustrates. Generative models do not retrieve facts; they predict a likely sequence of words, so their output may contain inaccuracies. Google says it is critical to manually fact-check and review AI-generated content before publishing, and that this review also applies to metadata such as title elements, meta descriptions, structured data and image alt text. Read it in full at <a href="https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" target="_blank" rel="nofollow noopener">Google Search Central</a>.</p>
<p>For keyword work, the lesson is simple. A wrong volume in a spreadsheet is a planning mistake. A wrong claim in a published page is a trust problem, so the checking habit that protects your content plan should also protect your pages.</p>

<h2>Mistakes to Avoid</h2>
<ul>
<li><strong>Treating a guessed volume as data.</strong> The table above is the cautionary example.</li>
<li><strong>Publishing every cluster as its own page.</strong> Several phrasings of one search belong on one page. Mass-producing near-identical pages is the pattern Google's spam policy describes.</li>
<li><strong>Skipping the live results.</strong> A phrase can have healthy volume and a results page full of formats you cannot match, such as a forum thread or a calculator.</li>
<li><strong>Chasing familiar topics.</strong> The overestimates in our test were all subjects that feel important. Check the number before you commit a week of writing to one.</li>
<li><strong>Trusting an AI summary of a competitor.</strong> If the model is not reading the page live, it is describing a likely page, not the real one.</li>
</ul>

<h2>The Limits of This Test</h2>
<p>We should be clear about what the test does not show. It used 21 keywords from one niche, SEO and adjacent topics, and one model. Different models or a different industry could produce different misses. The export volumes are themselves estimates from one vendor, and the sample was chosen by taking every 23rd row rather than at random, which is repeatable but not statistically rigorous. The assistant also had no web access during the guessing step, which is how many people use a chat window but not the only way.</p>
<p>What the test does show is the size of the risk. If a capable model can be off by five times or more on nearly three phrases in ten, a plan built on its figures is not safe, and the fix costs only a few minutes of checking.</p>

<h2>Key Takeaways</h2>
<ul>
<li>In our blind test, an AI model got ${within} of 21 search volumes within a factor of two, and six were off by five times or more.</li>
<li>Newer AI-search phrasing was undercounted and familiar topics were overcounted.</li>
<li>Use AI for brainstorming, clustering, intent labels and gap spotting.</li>
<li>Get volume and difficulty from Search Console or a keyword database, and read the live results before writing.</li>
<li>Google supports AI for research but expects people to check the facts before publishing.</li>
<li>Map clusters to pages before you write, so two posts never chase one search.</li>
</ul>
<p>If you would rather have the research done and the pages planned for you, Contomatix builds keyword maps and content plans around verified data. You can <a href="/contact">get in touch</a> to talk it through.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What are the best AI tools for SEO keyword research?</summary>
<p>There is no single best one, because the useful tools do different jobs. A general AI assistant is good for brainstorming and clustering. An SEO platform with AI features adds those abilities on top of real volume and difficulty data. Pick based on whether the tool is connected to a measured database.</p>
</details>
<details>
<summary>Can ChatGPT or Claude give me accurate search volume?</summary>
<p>Not reliably. In our blind test of 21 keywords, an AI model landed within a factor of two on ${within}. Without a connected data source, any volume a chat assistant gives you is an estimate from its training, so confirm it in a keyword database or Search Console.</p>
</details>
<details>
<summary>Is it safe to use AI for keyword research?</summary>
<p>Yes, for research and structure. Google's guidance says generative AI can be useful when researching a topic. The risks come from publishing unchecked output or generating many low-value pages, not from using AI to find and group ideas.</p>
</details>
<details>
<summary>What should I use AI for in keyword research?</summary>
<p>Brainstorming phrases and questions, grouping a long list into page-sized clusters, labelling search intent and spotting topics you have no page for. These are language tasks, where a model is strong.</p>
</details>
<details>
<summary>What should I not use AI for?</summary>
<p>Search volume, keyword difficulty, current rankings and claims about what competitors have published. All of these need measured or live data.</p>
</details>
<details>
<summary>Why did the AI guess so many volumes wrong?</summary>
<p>A language model predicts likely text and does not hold a table of search counts. In our sample it undercounted newer AI-search phrasing and overcounted familiar topics. With only 21 keywords this is an observation, not a law.</p>
</details>
<details>
<summary>Do I need special keywords to appear in Google's AI Overviews?</summary>
<p>Google's documentation on AI features says there are no additional requirements to appear in AI Overviews or AI Mode, and no special optimizations or structured data are needed. A page needs to be indexed and eligible to show a snippet in regular Search.</p>
</details>
<details>
<summary>How do I avoid keyword cannibalization when using AI clusters?</summary>
<p>Match every cluster to one page before you write. Compare the keywords with your existing URLs and titles, give each search a single owner page, and merge phrases that are just different wordings of the same search.</p>
</details>
<details>
<summary>Can I do keyword research for free with AI?</summary>
<p>You can do a good first pass. Use an AI assistant for ideas and grouping, Search Console for the queries you already earn, and manual checks of the live results. You will not get volume and difficulty estimates for new topics without some kind of keyword database.</p>
</details>
</div>
`;

const title = 'AI Tools for SEO Keyword Research: The Tested 2026 Guide';
const excerpt = 'AI tools for SEO keyword research tested blind on 21 real keywords: where an AI model helps, where its volume guesses fail, and a five-step workflow.';
const post = {
  slug: SLUG, title,
  category: 'AI SEO', author: 'Hamza Siddiqui', date: '2026-10-09',
  excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`,
  image: `/images/blog/illus-${SLUG}.png`,
  content
};
console.log('title len', title.length, 'excerpt len', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length);
const firstExt = content.search(/href="https?:/);
console.log('first external link at', firstExt, 'of', content.length, '=>', (firstExt / content.length * 100).toFixed(1) + '%');

if (process.argv.includes('--write')) {
  const f = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(f, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(f, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
