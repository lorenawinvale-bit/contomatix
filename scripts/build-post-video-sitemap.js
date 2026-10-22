// Builds the "video sitemap" post + assets. node scripts/build-post-video-sitemap.js [--write]
const fs = require('fs'); const path = require('path'); const cp = require('child_process');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'video-sitemap';
const all0 = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blog.json'), 'utf8'));
const live = all0.filter(p => p.date <= '2026-10-10');
const cnt = re => live.filter(p => re.test(p.content)).length;
const vids = parseInt(cp.execSync('git ls-files public | grep -i -E "\\.(mp4|webm|mov)$" | wc -l', { cwd: root }).toString().trim() || '0', 10);
const D = { posts: live.length, iframe: cnt(/<iframe/i), video: cnt(/<video/i), yt: cnt(/youtube\.com|youtu\.be|vimeo\.com/i), vo: cnt(/VideoObject/i), files: vids };
console.log(JSON.stringify(D));
if (D.posts !== 302 || D.iframe + D.video + D.yt + D.vo + D.files !== 0) throw new Error('data changed');

// ---------- assets
L.donut(SLUG, ['VIDEO', 'SITEMAP'], [['Check You Have', 'A Watch Page'], 'Add the Required Tags', 'Choose content_loc or player_loc', 'Validate the File', 'Submit and Monitor']);
L.cover(SLUG, { badge: 'REAL SITE CHECK', search: 'video sitemap', card: 'Do we need one? Our check',
  lines: [`Posts checked: ${D.posts}`, 'Posts with an iframe: 0', 'Posts with a video tag: 0', 'YouTube or Vimeo links: 0', 'Video files hosted: 0'],
  last: 'Verdict: not needed for us', big: `0 of ${D.posts}`, k1: 'posts contain a video,', k2: 'so we do not need one', title: 'Video Sitemap', sub: 'Do you need one? A test on our own site' });
fs.writeFileSync(path.join(__dirname, 'infographic-video-sitemap.html'), L.infographicHtml({
  title: 'Video Sitemap: Do You Need One?', sub: `We checked our own ${D.posts} live posts for videos, 10 October 2026`,
  leftTitle: 'What our site contains', leftTag: 'Number of posts or files found', max: D.posts,
  bars: [{ label: 'Posts checked', sub: 'live blog posts', n: D.posts }, { label: 'Posts with an iframe', sub: 'embedded players', n: D.iframe }, { label: 'Posts with a video tag', sub: 'hosted video', n: D.video }, { label: 'YouTube or Vimeo links', sub: 'linked or embedded', n: D.yt }, { label: 'Video files in the site', sub: 'mp4, webm, mov', n: D.files }],
  rightTitle: 'Required video tags', rightTag: 'Per Google’s documentation', items: [
    { t: 'video:thumbnail_loc', s: 'a stable thumbnail image URL' }, { t: 'video:title and video:description', s: 'description up to 2,048 characters' },
    { t: 'video:content_loc', s: 'the media file, recommended' }, { t: 'or video:player_loc', s: 'the player, for YouTube and Vimeo' }],
  big: `0 of ${D.posts}`, noteHtml: `of our posts contain a video, so a <em>video sitemap</em> would be an empty file. Check for a watch page first.` }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>We scanned our ${D.posts} live posts for videos and found none: no embedded players, no video tags, no YouTube or Vimeo links and no video files. For us a <strong>video sitemap</strong> would be an empty file, and that is the most useful way to start this guide. A video sitemap is only worth building when you have videos on pages that Google can treat as watch pages. If you do, this page covers the tags, the limits, the choice between content and player URLs, and a sample file we validated.</p>

<p>If you came here for the image version, see our guide to the <a href="/blog/image-sitemap">image sitemap</a>. The file basics are the same for both.</p>

<h2>What a Video Sitemap Is</h2>
<p>A video sitemap is a sitemap file, or a section of one, that gives Google extra information about the videos on your pages: where the thumbnail is, what the video is called, what it covers and where the media file or player lives. It does not replace the page itself. Google's documentation says it recommends video sitemaps and also supports mRSS feeds as an alternative, and it does not say that either is required.</p>

<h2>Do You Need a Video Sitemap?</h2>
<p>Ask four questions before you build anything.</p>
<ol>
<li><strong>Do you have videos at all?</strong> Our site fails this test, so the rest does not apply to us.</li>
<li><strong>Is each video embedded on a watch page?</strong> Google's video guidance says a watch page's main purpose is to show a single video, and that a blog post which embeds a video reviewing it is not a watch page. That matters, because many sites only embed videos inside articles.</li>
<li><strong>Is that watch page indexed and performing?</strong> Google says the watch page must be indexed and performing well in Search before its video can be considered for indexing, and that being indexed alone does not guarantee the video is.</li>
<li><strong>Does Google already find the video?</strong> A video in a standard embed on an indexed page may be found without a sitemap. A sitemap helps most for large libraries and for videos that are otherwise hard to discover.</li>
</ol>
<p>If you answered no to any of the first three, fix that first. A sitemap cannot turn an ordinary article into a watch page.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-video-sitemap.png" alt="Infographic of what a scan of 302 Contomatix posts found: zero iframes, video tags, YouTube or Vimeo links and video files, with the four required video sitemap tags" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Required Video Sitemap Tags</h2>
<p>Google's video sitemap reference lists the tags that must be present for each video. You also use the standard sitemap <code>loc</code> tag for the page the video sits on.</p>
<ul>
<li><strong><code>&lt;video:video&gt;</code></strong> wraps everything for one video. You can nest several inside one page's <code>loc</code>, one for each video on that page.</li>
<li><strong><code>&lt;video:thumbnail_loc&gt;</code></strong> is a URL for the thumbnail image.</li>
<li><strong><code>&lt;video:title&gt;</code></strong> is the title, with HTML entities escaped or wrapped in CDATA. Google recommends it matches the title shown on the page.</li>
<li><strong><code>&lt;video:description&gt;</code></strong> is the description, up to 2,048 characters. It must match the description on the page, though not word for word.</li>
<li><strong><code>&lt;video:content_loc&gt;</code> or <code>&lt;video:player_loc&gt;</code></strong>: you must give one of them.</li>
</ul>
<p>The optional tags include duration, publication date, expiration date, rating, view count, family friendly, restriction, platform, requires subscription, uploader, live and tag. Their limits are worth knowing: duration runs from 1 to 28,800 seconds, which is eight hours; rating is 0.0 to 5.0; and a video can have up to 32 tags. Several older tags, including <code>video:category</code>, <code>video:price</code> and <code>video:tvshow</code>, are deprecated and should be left out.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-video-sitemap-required-tags.jpg" alt="Google Search Central video sitemap reference table of required tags: video thumbnail_loc, title, description, content_loc and player_loc with their guidelines" width="1283" height="1112" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>content_loc or player_loc?</h2>
<p>These two tags answer different questions. <code>content_loc</code> points at the actual media file, such as an MP4. <code>player_loc</code> points at a player for a specific video, which is how embeds from YouTube, Vimeo and similar platforms work. Google recommends <code>content_loc</code> when you have it, because it is the most effective way for Google to fetch the video file, and says to use <code>player_loc</code> otherwise.</p>
<p>Two rules apply to both. Neither value may be the same as the page's own <code>loc</code>, and HTML or Flash files are not supported media formats. If you host a video behind access controls, Google's guidance is to make sure Googlebot can still reach it, using Googlebot verification.</p>

<h2>A Video Sitemap Example You Can Copy</h2>
<p>This file lists two watch pages. The first points at a hosted MP4. The second uses a YouTube-style player URL with a placeholder ID. Replace the example addresses with your own.</p>
<pre style="background:#F1EDE3;padding:14px 16px;border-radius:8px;overflow-x:auto;font-size:0.85rem;line-height:1.5;"><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://example.com/videos/redirect-mapping-walkthrough&lt;/loc&gt;
    &lt;video:video&gt;
      &lt;video:thumbnail_loc&gt;https://example.com/thumbs/redirect-mapping.jpg&lt;/video:thumbnail_loc&gt;
      &lt;video:title&gt;Redirect mapping walkthrough&lt;/video:title&gt;
      &lt;video:description&gt;A five-minute walkthrough of matching old URLs to new ones.&lt;/video:description&gt;
      &lt;video:content_loc&gt;https://example.com/media/redirect-mapping.mp4&lt;/video:content_loc&gt;
      &lt;video:duration&gt;312&lt;/video:duration&gt;
    &lt;/video:video&gt;
  &lt;/url&gt;
  &lt;url&gt;
    &lt;loc&gt;https://example.com/videos/sitemap-basics&lt;/loc&gt;
    &lt;video:video&gt;
      &lt;video:thumbnail_loc&gt;https://example.com/thumbs/sitemap-basics.jpg&lt;/video:thumbnail_loc&gt;
      &lt;video:title&gt;Sitemap basics in three minutes&lt;/video:title&gt;
      &lt;video:description&gt;What belongs in a sitemap and how to submit it.&lt;/video:description&gt;
      &lt;video:player_loc&gt;https://www.youtube.com/embed/EXAMPLE_ID&lt;/video:player_loc&gt;
      &lt;video:duration&gt;187&lt;/video:duration&gt;
    &lt;/video:video&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</code></pre>

<h2>We Ran the Sample Through Our Tools</h2>
<p>We pasted this file into our own tools. The <a href="/tools/sitemap-validator">sitemap validator</a> reported no errors and found two unique URLs on one host. It checks the structure, URL rules and limits of the sitemap, and does not inspect the video tags themselves, so a typo inside a <code>video:video</code> block would not be caught. The <a href="/tools/sitemap-url-extractor">sitemap URL extractor</a> listed the two watch-page addresses, which is a quick way to check that every page in your video sitemap is one you want indexed.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/video-sitemap-extractor-output.png" alt="Contomatix sitemap URL extractor with the sample video sitemap pasted in and the two watch page URLs listed as output" width="1160" height="496" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>YouTube Video Sitemap: What to Do With Embeds</h2>
<p>If your videos live on YouTube and you embed them, the embedded player URL goes in <code>player_loc</code>, and the page you embed it on is the <code>loc</code>. The video still has to be on a page whose main job is to show it. Google's guidance also suggests describing the video with VideoObject structured data and keeping the thumbnail, name and description unique for each video, so use a different title and description for each page.</p>
<p>You can read the details in Google's documentation on <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps" target="_blank" rel="nofollow noopener">video sitemaps and alternatives</a>.</p>

<h2>Video Sitemap or mRSS?</h2>
<p>Google supports mRSS feeds as an alternative that can be submitted and tested like a sitemap. A platform that already produces an mRSS feed can submit it directly. For most sites, a video sitemap is simpler to write and check by hand. Choose whichever you can keep accurate, because a feed that drifts out of date is worse than none.</p>

<h2>What Makes a Video Eligible in the First Place</h2>
<p>A sitemap entry does not fix a page that fails the basics. Google's video guidance lists what a video needs: it must be embedded on an indexed watch page, it needs a valid thumbnail at a stable URL, it must be in a supported file type such as MP4, WebM or MOV, and it cannot be hidden behind other elements on the page. Data URLs are not supported, and a paywalled video needs paywall structured data. Check these before you spend time on the XML.</p>

<h2>Video Sitemap or VideoObject Structured Data?</h2>
<p>They are complementary, not rivals. Google recommends describing each video with VideoObject structured data on the watch page, using properties such as name, description, thumbnail URL, content URL and embed URL. The sitemap then tells Google where those pages and files are. Keep the two consistent: the title and description in the sitemap should match what the page and its markup say. If you can only do one, the structured data on the page is the more direct signal, and the sitemap is the way to hand over a large library in one file.</p>

<h2>A 30-Minute Plan to Add One</h2>
<ol>
<li><strong>List your watch pages.</strong> One page per video, each with its own title and description. Drop any page that is really an article.</li>
<li><strong>Collect the assets.</strong> For each video: thumbnail URL, media file or player URL, duration and publication date.</li>
<li><strong>Write the file.</strong> Use the template above, one <code>url</code> block per page with one <code>video:video</code> inside it.</li>
<li><strong>Validate.</strong> Run it through a validator and extract the page URLs to confirm each is indexable.</li>
<li><strong>Submit and watch.</strong> Add it in Search Console, check the Sitemaps report for processing errors and the video indexing report for indexed videos.</li>
</ol>

<h2>What to Do If You Have No Videos Yet</h2>
<p>Do not create an empty or placeholder video sitemap. It adds a file to maintain and tells Google nothing. If you plan to add videos, design the pages first: one URL per video, a clear title and description, a good thumbnail and the player placed prominently. Add the sitemap when there is something real to list. That is where we stand: no videos, so no file, and a checklist ready for the day we publish one.</p>

<h2>Common Video Sitemap Mistakes</h2>
<ul>
<li><strong>Listing pages that are not watch pages.</strong> Embedding a video in an article does not turn the article into a watch page.</li>
<li><strong>Reusing one title and description.</strong> Google asks for unique values for each video.</li>
<li><strong>An unstable thumbnail URL.</strong> If the thumbnail moves or disappears, the entry loses its image.</li>
<li><strong>Pointing content_loc at the page.</strong> It must be the media file, not the same URL as the page's <code>loc</code>.</li>
<li><strong>Using deprecated tags.</strong> They carry no weight, so leave them out.</li>
<li><strong>Letting the file go stale.</strong> Remove videos you have deleted and keep expiry dates accurate.</li>
</ul>

<h2>The Limits of This Test</h2>
<ul>
<li>The scan covers our live blog posts on 10 October 2026, not every page of the site. Tool pages are built from templates that contain no video.</li>
<li>The sample file uses example.com addresses and a placeholder video ID. It shows structure and was not submitted to Search Console.</li>
<li>The validator confirms file structure only. Whether Google indexes a video depends on the watch page and the video itself.</li>
</ul>

<h2>Key Takeaways</h2>
<ul>
<li>A video sitemap is optional and only useful when you have videos on watch pages.</li>
<li>Our own ${D.posts} posts contain no videos, so we do not need one.</li>
<li>The required tags are video, thumbnail_loc, title, description and either content_loc or player_loc.</li>
<li>Descriptions can run to 2,048 characters, durations to 28,800 seconds, and each video can have up to 32 tags.</li>
<li>Use player_loc for YouTube and Vimeo embeds, and content_loc for hosted files.</li>
<li>Validate the file, and check that every listed page is one you want indexed.</li>
</ul>
<p>If you are planning a video library and want it set up so Google can find it, Contomatix can help with the page structure and the sitemap. <a href="/contact">Get in touch</a> and we will take a look.</p>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is a video sitemap?</summary>
<p>It is a sitemap, or a section of one, that gives Google details about the videos on your pages, such as the title, description, thumbnail and where the file or player is.</p>
</details>
<details>
<summary>Do I need a video sitemap?</summary>
<p>Not always. Google recommends video sitemaps and supports mRSS feeds as an alternative, but does not say either is required. You mainly need one when you have videos on indexed watch pages and want to help Google find them.</p>
</details>
<details>
<summary>What are the required tags in a video sitemap?</summary>
<p>video:video, video:thumbnail_loc, video:title and video:description, plus either video:content_loc or video:player_loc.</p>
</details>
<details>
<summary>What is the difference between content_loc and player_loc?</summary>
<p>content_loc points at the video media file. player_loc points at a player for a specific video, as with YouTube or Vimeo embeds. Google recommends content_loc when you can provide it.</p>
</details>
<details>
<summary>How long can a video description be?</summary>
<p>Up to 2,048 characters. It should match the description shown on the page, though not word for word.</p>
</details>
<details>
<summary>Can I make a YouTube video sitemap?</summary>
<p>Yes. For videos embedded from YouTube, put the embed player URL in player_loc, and list the page where the video is embedded as the loc.</p>
</details>
<details>
<summary>Is a blog post with an embedded video a watch page?</summary>
<p>No. Google says a watch page's main purpose is showing a single video, and a blog post that embeds a video reviewing it is not a watch page.</p>
</details>
<details>
<summary>Which video sitemap tags are deprecated?</summary>
<p>Google lists video:category, video:gallery_loc, video:price and video:tvshow, along with the autoplay and allow_embed attributes of player_loc, as deprecated.</p>
</details>
<details>
<summary>How do I check my video sitemap for errors?</summary>
<p>Validate the XML structure and URLs with a sitemap validator, then submit it in Search Console and check the Sitemaps report for processing errors.</p>
</details>
</div>
`;
const title = 'Video Sitemap: Do You Need One? The Verified 2026 Guide';
const excerpt = 'Video sitemap guide with a real test on our 302 posts: when you need one, required tags, content_loc vs player_loc, YouTube embeds and an example.';
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Umaira Liaquat', date: '2026-10-11', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all.findIndex(p => p.slug === SLUG); if (i >= 0) all[i] = post; else all.push(post);
  fs.writeFileSync(fp, JSON.stringify(all, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
