// Builds the "image sitemap" post + assets. node scripts/build-post-image-sitemap.js [--write]
const fs = require('fs'); const path = require('path');
const L = require('./post-assets-lib.js');
const root = path.join(__dirname, '..'); const SLUG = 'image-sitemap';
const blog = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blog.json'), 'utf8'));
const live = blog.filter(p => p.date <= '2026-10-09');
const per = live.map(p => { const im = []; if (p.heroDiagram) im.push(p.heroDiagram); if (p.image) im.push(p.image); for (const m of p.content.matchAll(/<img[^>]+src="([^"]+)"/g)) im.push(m[1]); return [...new Set(im)]; });
const all = per.flat(); const uniq = new Set(all);
const ext = {}; all.forEach(u => { const e = (u.split('?')[0].match(/\.([a-z0-9]+)$/i) || [, 'none'])[1].toLowerCase(); ext[e] = (ext[e] || 0) + 1; });
const maxPer = Math.max(...per.map(a => a.length));
const shared = [...uniq].filter(u => per.filter(a => a.includes(u)).length > 1).length;
const D = { posts: live.length, refs: all.length, uniq: uniq.size, svg: ext.svg, png: ext.png, jpg: ext.jpg, webp: ext.webp, maxPer, shared };
console.log(JSON.stringify(D));
if (D.posts !== 299 || D.refs !== 1220 || D.uniq !== 1163 || D.svg !== 327 || D.png !== 682 || D.jpg !== 209 || D.webp !== 2 || D.maxPer !== 13 || D.shared !== 33) throw new Error('data changed');
const f = n => n.toLocaleString('en-US');
const pctSvg = Math.round(D.svg / D.refs * 100);

// ---------- assets
L.donut(SLUG, ['IMAGE', 'SITEMAP'], [['Know the Two', 'Required Tags'], 'Check If You Need One', 'Build From Your CMS', ['Keep It', 'Accurate'], 'Validate and Submit']);
L.cover(SLUG, { badge: 'IMAGE SITEMAP TEST', search: 'image sitemap', card: 'Our image sitemap build',
  lines: [`Posts covered: ${D.posts}`, `Image references: ${f(D.refs)}`, `Unique images: ${f(D.uniq)}`, `Most on one URL: ${D.maxPer} (limit 1,000)`, 'Image tags live today: 0'],
  last: 'Rule: list the real <img> URLs', big: f(D.refs), k1: 'image references found', k2: `across ${D.posts} of our posts`, title: 'Image Sitemap', sub: 'Generated from our own 299 posts' });
fs.writeFileSync(path.join(__dirname, 'infographic-image-sitemap.html'), L.infographicHtml({
  title: 'Image Sitemap: What Our 299 Posts Contain', sub: `${f(D.refs)} image references, grouped by file format`,
  leftTitle: 'Images by format', leftTag: 'References found in post content, covers and diagrams', max: D.png,
  bars: [{ label: 'PNG', sub: 'covers, screenshots, infographics', n: D.png }, { label: 'SVG', sub: 'hero diagrams', n: D.svg }, { label: 'JPG', sub: 'photos and proof captures', n: D.jpg }, { label: 'WebP', sub: 'referenced directly', n: D.webp }],
  rightTitle: 'Before you build one', rightTag: 'The checks that matter', items: [
    { t: 'Is it needed?', s: 'Images in img tags are found without it' }, { t: 'Use real URLs', s: 'absolute, matching the img src' },
    { t: 'Stay under 1,000', s: 'image entries per page URL' }, { t: 'Keep lastmod honest', s: 'Google ignores values it cannot trust' }],
  big: f(D.maxPer), noteHtml: `was the most images on any one of our pages, far below the <em>1,000-per-URL limit</em>. Our sitemap carries no image tags yet.` }));
fs.writeFileSync(path.join(__dirname, 'table-image-sitemap.html'), L.tableHtml({ title: 'Image references in our 299 live posts', sub: 'Counted from heroDiagram, cover image and every img tag in each post, duplicates within a post removed.',
  head: ['Measure', 'Count'], lastBold: false,
  rows: [['Posts scanned', D.posts], ['Image references', f(D.refs)], ['Unique image files', f(D.uniq)], ['PNG references', D.png], ['SVG references', D.svg], ['JPG references', D.jpg], ['WebP references', D.webp], ['Most images on one post', D.maxPer], ['Images used by more than one post', D.shared], ['Image tags in our sitemap today', 0]] }));

// ---------- article
const content = `<p class="article-updated" style="color: #6b6459; font-size: 0.85rem; font-style: italic; margin: -8px 0 20px;">Last updated: October 2026</p>

<p>We counted ${f(D.refs)} image references across ${D.posts} blog posts on this site, and our sitemap contains none of them. That gap is common. An <strong>image sitemap</strong> is an optional extra that tells Google about images it might not find on its own, and for a lot of sites it is less necessary than the guides suggest.</p>

<p>This guide explains which tags Google still reads, which it dropped, how to decide whether you need one, and how to build and maintain it. It uses a real file we generated from our own posts, and it covers the long-tail questions that trip people up: how to update a sitemap, what sitemap update frequency means, and why URLs that redirect or are not canonical do not belong in the file. If you are starting from the basics, read <a href="/blog/how-to-create-a-sitemap">how to create a sitemap</a> first.</p>

<h2>What an Image Sitemap Is</h2>
<p>A sitemap is a file that lists the URLs you want search engines to know about. An image sitemap adds the images that belong to each page, using extra tags from Google's image extension. You can put those tags in a separate file or add them to the sitemap you already have, and Google's documentation treats both options as equally fine.</p>
<p>The purpose is discovery. Google can already find an image that sits in the <code>src</code> attribute of an <code>img</code> element, including one inside a <code>picture</code> element. What it can miss are images that are loaded by scripts or otherwise hard to reach. The sitemap hands it a direct list.</p>

<h2>The Tags Google Still Uses</h2>
<p>The extension needs only two tags. Everything else you may have seen in older tutorials is gone.</p>
<ul>
<li><strong><code>&lt;image:image&gt;</code></strong> wraps the information for one image.</li>
<li><strong><code>&lt;image:loc&gt;</code></strong> holds the image URL.</li>
</ul>
<p><a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps" target="_blank" rel="nofollow noopener">Google's image sitemap documentation</a> lists <code>image:caption</code>, <code>image:title</code>, <code>image:geo_location</code> and <code>image:license</code> as removed. If a plugin still writes them it does no harm, but they carry no weight, so put the effort into the page's alt text and surrounding copy instead. Each page URL can contain up to 1,000 image entries, and images may live on another domain such as a CDN as long as that domain is verified in Search Console.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/google-image-sitemaps-documentation.jpg" alt="Google Search Central documentation page on image sitemaps showing the image sitemap extension and the list of supported and removed tags" width="947" height="420" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Do You Actually Need an Image Sitemap?</h2>
<p>Often not. Google states that an image sitemap is a way to surface images it might otherwise miss, which means it is not a requirement for appearing in image results. The things that matter more are plain: the image is in an <code>img</code> tag and not a CSS background, the file type is supported, and the alt text describes what is in the picture.</p>
<p><a href="https://developers.google.com/search/docs/appearance/google-images" target="_blank" rel="nofollow noopener">Google's image guidance</a> supports BMP, GIF, JPEG, PNG, WebP, SVG and AVIF in the <code>src</code> attribute of an <code>img</code> element, and it says CSS images are not indexed. For our site that is reassuring, because every one of our images is a normal <code>img</code> reference. An image sitemap is most useful when your images are hard to discover, for example when a gallery loads from JavaScript, when images sit behind a script-driven carousel, or when they come from a CDN domain you want reported on.</p>

<h2>We Built One for ${D.posts} Posts</h2>
<p>To see what a real file looks like, we generated one from our own post data. For each post we listed the page URL, then every image it uses: the hero diagram, the cover and each image inside the content. Duplicates within a post were removed, and every image URL was written as an absolute address, which the sitemap format requires.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/image-sitemap-counts-our-posts.png" alt="Table of image counts across 299 Contomatix posts: 1,220 image references, 1,163 unique files, 327 SVG, 682 PNG, 209 JPG, 2 WebP and a maximum of 13 images on one post" width="1280" height="650" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<p>A few things stand out. The busiest page has ${D.maxPer} images, which is nowhere near the 1,000-per-URL limit, so a cap is not a concern for a blog. ${D.shared} image files are used by more than one post. Google's guidance for that case is to reference the same image with the same URL everywhere, which lets it cache and reuse the file. Roughly ${pctSvg} percent of our references are SVG diagrams, a format Google supports.</p>
<p>The complete file came to about 4,500 lines, so it is a sizable but ordinary document. Our live sitemap does not contain it. We have not submitted the file, and given the section above, we do not expect it to change much for us.</p>

<h2>An Image Sitemap Template You Can Copy</h2>
<p>This is the whole structure for one page with two images. Add the <code>image</code> namespace to the root element, then repeat the <code>url</code> block for each page.</p>
<pre style="background:#F1EDE3;padding:14px 16px;border-radius:8px;overflow-x:auto;font-size:0.85rem;line-height:1.5;"><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://example.com/blog/my-post&lt;/loc&gt;
    &lt;image:image&gt;
      &lt;image:loc&gt;https://example.com/images/cover.png&lt;/image:loc&gt;
    &lt;/image:image&gt;
    &lt;image:image&gt;
      &lt;image:loc&gt;https://example.com/images/chart.jpg&lt;/image:loc&gt;
    &lt;/image:image&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</code></pre>
<p>Three rules from <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" target="_blank" rel="nofollow noopener">Google's sitemap guidance</a> apply to every line: use fully qualified absolute URLs, encode the file as UTF-8, and escape special characters such as the ampersand like any other XML.</p>

<h2>Image Sitemap for Ecommerce Sites</h2>
<p>An ecommerce sitemap is where image tags tend to pay off. Product pages often load galleries, zoom views and colour variants with scripts, which is exactly the situation where an image can be missed. Listing each product page with its main images gives Google a direct path to them.</p>
<ul>
<li>List the product page URL and its primary product images, not every thumbnail.</li>
<li>Use the image URL that is actually served, which is often a CDN address. Verify that domain in Search Console.</li>
<li>Keep variants that share the same image from being listed under several unrelated pages.</li>
<li>Make sure each product page URL is the canonical one, because the sitemap should list the URLs you want in results.</li>
</ul>

<h2>How to Update a Sitemap When Images Change</h2>
<p>The simplest way to keep an image sitemap right is to never edit it by hand. A dynamic sitemap is generated from your CMS or database each time it is requested, or on a schedule, so a new post or a replaced image appears without anyone touching the file. Most platforms and plugins offer this, and a short script can do the same for a custom site.</p>
<p>Whichever method you use, the update has to follow the real change. When an image is swapped, the file name and URL change with it, and the old URL should leave the sitemap. If it stays, you are pointing Google at a file that may no longer exist.</p>

<h2>Sitemap Update Frequency and the lastmod Trap</h2>
<p>Many people ask how often a sitemap should be updated, and whether to set <code>changefreq</code> and <code>priority</code>. Google ignores both of those values, so there is no benefit in tuning them. The tag that counts is <code>lastmod</code>, and Google says it uses it only if it is consistently and verifiably accurate, meaning it should reflect a significant change to the page and not, for instance, a copyright-date edit.</p>
<p>We found a real example of getting this wrong while writing this guide. Our own sitemap has ${'341'} URLs. ${'299'} of them are blog posts, which carry the post's publish date. The other 42, such as service, team and tool pages, are stamped with the date of the request by the code that builds the file, so they show a new date every day whether the page changed or not. That is the pattern Google says it will not trust. The fix is to use a real modified date or to leave the tag out for those pages. At the time of writing we had not yet changed it.</p>

<h2>Errors to Check: Non-Canonical URLs, 3xx Redirects and "Sitemap Could Not Be Read"</h2>
<p>These three problems account for most sitemap trouble.</p>
<ul>
<li><strong>Non-canonical URL in the sitemap.</strong> Google says sitemaps should contain the URLs you want to appear in results, and that it generally shows canonical URLs. If a page has a canonical pointing elsewhere, list the canonical, not the duplicate. Our <a href="/tools/canonical-tag-checker">canonical tag checker</a> shows what a page declares.</li>
<li><strong>3xx redirect in the sitemap.</strong> A URL that redirects is not the page you want indexed, so the sitemap should hold the final destination. After a site move or a slug change, regenerate the file so the old addresses disappear.</li>
<li><strong>Sitemap could not be read.</strong> Search Console's Sitemaps report lists processing errors, and submitting a file is only a hint to Google. Check that the file is valid XML, saved as UTF-8, uses absolute URLs, has its ampersands escaped and can be fetched without being blocked.</li>
</ul>
<p>Before you submit, run the file through a validator. Our <a href="/tools/sitemap-validator">sitemap validator</a> checks structure, URL rules and the 50,000-URL and 50 MB limits. We ran a two-page sample of our generated image sitemap through it and it reported no errors. It does not inspect the image entries themselves, so a typo in an image URL would still pass.</p>
<figure style="margin:20px 0;"><img src="/images/blog/proof/sitemap-validator-image-sitemap-sample.png" alt="Contomatix sitemap validator showing a pasted image sitemap sample with two page URLs and the result No errors found" width="1160" height="315" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>

<h2>Where an Image Sitemap Sits in Your Sitemap Setup</h2>
<p>You have three layouts to choose from. Add image tags to your main sitemap, keep a separate image sitemap file, or split by section and list the files in a sitemap index. A single file is easiest for a small site, and a separate file keeps a large catalogue manageable. Whichever you choose, mention the file in your robots.txt, as our guide to the <a href="/blog/robots-txt-sitemap">robots.txt sitemap field</a> explains.</p>

<h2>Image Sitemap Checklist</h2>
<p>The infographic shows what our own posts contain and the checks that matter most. The full checklist follows it.</p>
<figure style="margin:20px 0;"><img src="/images/blog/infographic-image-sitemap.png" alt="Infographic of image references in 299 Contomatix posts by file format, with four checks before building an image sitemap: is it needed, use real URLs, stay under 1,000 images per URL and keep lastmod honest" width="1376" height="790" style="width:100%;height:auto;border-radius:8px;border:1px solid #EAE0D2;" loading="lazy"></figure>
<ul>
<li>Confirm your images are in <code>img</code> tags with alt text before building anything.</li>
<li>Use absolute image URLs that match what the page serves.</li>
<li>Stay under 1,000 image entries per page URL.</li>
<li>Drop removed tags such as <code>image:caption</code> and <code>image:title</code>.</li>
<li>List only canonical, non-redirecting page URLs.</li>
<li>Generate the file from your CMS so it updates itself.</li>
<li>Keep <code>lastmod</code> truthful or leave it out.</li>
<li>Validate, submit in Search Console and check the Sitemaps report.</li>
</ul>
<p>If you would like help auditing your sitemaps and image setup, Contomatix can review them as part of a technical check. <a href="/contact">Get in touch</a> and we will take a look.</p>

<h2>Key Takeaways</h2>
<ul>
<li>An image sitemap is optional. Google supports it to surface images it might otherwise miss.</li>
<li>Only <code>image:image</code> and <code>image:loc</code> are needed. Caption, title, geo location and license tags are removed.</li>
<li>Our ${D.posts} posts hold ${f(D.refs)} image references, the busiest page has ${D.maxPer}, and the limit is 1,000 per URL.</li>
<li>Google ignores <code>changefreq</code> and <code>priority</code>, and trusts <code>lastmod</code> only when it is accurate.</li>
<li>List canonical, non-redirecting URLs and validate before you submit.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<div class="post-faq">
<details>
<summary>What is an image sitemap?</summary>
<p>It is a sitemap, or a section of one, that lists the images on each page using Google's image extension tags. It helps Google discover images it might not find through normal crawling.</p>
</details>
<details>
<summary>Do I need an image sitemap?</summary>
<p>Not usually. Google describes it as a way to surface images it might otherwise miss. If your images are in standard img tags, Google can already find them. It helps most for images loaded by scripts or served from a CDN.</p>
</details>
<details>
<summary>Which image sitemap tags does Google still support?</summary>
<p>image:image and image:loc. Google lists image:caption, image:title, image:geo_location and image:license as removed from its documentation.</p>
</details>
<details>
<summary>How many images can one URL have in an image sitemap?</summary>
<p>Up to 1,000 image entries per page URL, according to Google's image sitemap documentation.</p>
</details>
<details>
<summary>Can the images be on a different domain?</summary>
<p>Yes. Google allows image URLs from other domains, such as a CDN, and recommends verifying those domains in Search Console to see crawl errors for them.</p>
</details>
<details>
<summary>How do I update a sitemap when I add or replace images?</summary>
<p>Generate it from your CMS or database so it changes with your content, which is what people mean by a dynamic sitemap. Remove old image URLs when files are replaced and keep lastmod accurate.</p>
</details>
<details>
<summary>What is the right sitemap update frequency?</summary>
<p>There is no fixed schedule to set. Google ignores changefreq and priority, and it uses lastmod only if it is consistently accurate, so the file should simply reflect real changes when they happen.</p>
</details>
<details>
<summary>Should redirecting or non-canonical URLs be in a sitemap?</summary>
<p>No. List the final, canonical URLs you want in results. A 3xx redirect in the sitemap points Google at a page that is not the destination, and a non-canonical URL lists a duplicate.</p>
</details>
<details>
<summary>Why does Search Console say my sitemap could not be read?</summary>
<p>Check the basics: valid XML, UTF-8 encoding, absolute URLs, escaped ampersands and a file that is reachable and not blocked. The Sitemaps report in Search Console lists the processing errors it found.</p>
</details>
</div>
`;
const title = 'Image Sitemap: The Complete 2026 Guide With Real Examples';
const excerpt = 'Image sitemap guide built from our own 299 posts: the tags Google still uses, whether you need one, ecommerce setup, lastmod, and common errors.';
const post = { slug: SLUG, title, category: 'On-Page SEO', author: 'Hamza Siddiqui', date: '2026-10-10', excerpt,
  heroDiagram: `/images/blog/diagram-${SLUG}.svg`, image: `/images/blog/illus-${SLUG}.png`, content };
const firstExt = content.search(/href="https?:/);
console.log('title len', title.length, 'excerpt', excerpt.length, 'words', content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'firstExt', firstExt < 0 ? 'none' : (firstExt / content.length * 100).toFixed(1) + '%', 'faq', (content.match(/<details>/g) || []).length, 'h2', (content.match(/<h2>/g) || []).length);
if (process.argv.includes('--write')) {
  const fp = path.join(root, 'data', 'blog.json'); const all2 = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const i = all2.findIndex(p => p.slug === SLUG); if (i >= 0) all2[i] = post; else all2.push(post);
  fs.writeFileSync(fp, JSON.stringify(all2, null, 2), 'utf8'); console.log('written', i >= 0 ? '(replaced)' : '(new)');
}
