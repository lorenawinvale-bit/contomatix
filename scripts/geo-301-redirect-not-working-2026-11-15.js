// 15 Nov 2026: 301-redirect-not-working updated with the GEO step (daily-format step 3b).
// Google AI Overview for "301 redirect not working" leads with: caching, server configuration conflicts, DNS routing; quick test with curl -I or a status checker (200 means the rule never ran, a proper 301 means the browser replays a cache);
// bypass browser cache (private window, DevTools Disable cache); proxied DNS for Cloudflare redirects; plugin conflicts; loops and chains. Top 3 results: a WordPress plugin troubleshooting guide, a host's "7 fixes" guide and a Q&A thread.
// Facts used here come from Google's "Redirects and Google Search" and "Debugging drops in Google Search traffic" pages and Cloudflare's Redirects docs (read 15 Nov 2026), and the BlogVault-style generic checks. No competitor or brand names in our text except Google and Cloudflare as the sources of documentation.
const fs = require('fs'); const path = require('path');
const { apply } = require('./lowvol-lib.js');
const fp = path.join(__dirname, '..', 'data', 'blog.json');
const posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
const p = posts.find(x => x.slug === '301-redirect-not-working'); const T = '<!-- geo-2026-11-15 -->';
if (!p.content.includes(T)) {
  const h = p.content.indexOf('<h2>');
  const short = `${T}
<p><strong>Short answer:</strong> run <code>curl -I</code> on the old URL. If it returns 200, your server never ran the redirect rule, so look at rule order, the plugin or the platform. If it returns a 301 with the right Location header, the server is fine and your browser or CDN is replaying a cached answer, so test in a private window or purge the cache. Then check for a loop, a chain or the wrong status code.</p>
`;
  p.content = p.content.slice(0, h) + short + p.content.slice(h);
  p.content = p.content.replace('Last updated: October 2026', 'Last updated: November 2026');
  const test = `<h2>A Five-Minute Test Before You Change Anything</h2>
<p>Most redirect problems are diagnosed in the first five minutes, and guessing at server files before testing is how a small problem becomes a bigger one. Test in this order:</p>
<ol>
<li><strong>Ask the server directly.</strong> In a terminal, run <code>curl -I http://example.com/old-page</code>. Read the status line and the Location header. A 200 means no redirect ran. A 301 with the right Location means the server is working.</li>
<li><strong>Bypass your browser cache.</strong> Open the URL in a private window, or open Developer Tools, go to the Network tab and tick Disable cache while you reload. A browser or CDN can hold onto an old redirect and keep showing it after you have fixed the rule.</li>
<li><strong>Use an independent redirect checker.</strong> An outside tool shows the real status code and every hop, which your browser hides. Our <a href="/tools/redirect-mapper">redirect mapper</a> helps you plan the rules and check each old URL against its new one.</li>
<li><strong>Test with a temporary redirect first.</strong> A 302 is not treated as a permanent move, so a mistake is easier to undo. Switch to a 301 once the target is right. Our guide to <a href="/blog/301-vs-302-redirect">301 vs 302 redirects</a> explains the difference.</li>
</ol>
<p>Google's redirect documentation explains why the status matters: permanent redirects (301 or 308) tell Google that the target should be canonical and show the new URL in results, while temporary redirects (302, 303, 307) show the source page.</p>

`;
  const at = p.content.indexOf('<h2>301 vs 302 Redirect: Which One to Use</h2>'); if (at < 0) throw new Error('301 vs 302 H2 missing');
  p.content = p.content.slice(0, at) + test + p.content.slice(at);
  const cf = `<h2>When the Redirect Sits Behind Cloudflare or Another Proxy</h2>
<p>If your site is behind a CDN or proxy, the redirect may be set there and not in your server files, and the order of the layers matters. Cloudflare's documentation says its Single Redirects and Bulk Redirects require that you proxy the DNS records of your domain or subdomain through Cloudflare. If the record is not proxied, the rule never sees the request, so the redirect appears not to work. The same page says Single Redirects run first in its rule order, and that these newer Rules products take precedence over older Page Rules when both match, so an old Page Rule can silently lose to a newer redirect rule.</p>
<p>Check three things when a proxy is involved: the DNS record is proxied, only one layer owns the redirect, and the CDN cache has been purged after any change. If you use a platform such as Blogger or Shopify, Google notes that the platform may already have built-in redirect tools, so use those before editing files. Read the full pages for ${'<a href="https://developers.cloudflare.com/rules/url-forwarding/" target="_blank" rel="nofollow noopener">Cloudflare redirects</a>'} and ${'<a href="https://developers.google.com/search/docs/crawling-indexing/301-redirects" target="_blank" rel="nofollow noopener">Google redirects</a>'}.</p>

`;
  const at2 = p.content.indexOf('<h2>301 Redirect Backlink: Do Links Still Count?</h2>'); if (at2 < 0) throw new Error('backlink H2 missing');
  p.content = p.content.slice(0, at2) + cf + p.content.slice(at2);
  fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8');
}
apply([{ slug: '301-redirect-not-working', h2: 'Related Questions About 301 Redirects That Fail', sources: 'Google AI Overview, People also ask and top results for "301 redirect not working" read 15 Nov 2026; Search Console page queries (28 days to 13 Nov 2026)',
  keywords: ['why is my 301 redirect not working', '301 errors', 'simple 301 redirects not working', '301 moved permanently how to fix', 'how to resolve 301 moved permanently error', 'redirect 301 not working', 'how long does a 301 redirect take to work'],
  items: [
    { h3: 'Why Is My 301 Redirect Not Working in the Browser but Fine in curl?', html: `Because the browser is replaying a cached answer. If <code>curl -I</code> shows a 301 with the right Location header, the server rule works. Test in a private window, or tick Disable cache in Developer Tools, and purge any CDN cache. Why is my 301 redirect not working for you and not for someone else is almost always this.` },
    { h3: 'How Long Does a 301 Redirect Take to Work?', html: `For visitors it works as soon as the server returns it, and a stale result is usually a cache. For Google it takes longer: Google's guidance on site moves says a medium-sized website can take a few weeks for Google to notice URL changes, and larger sites longer. Do not keep changing the rule while you wait.` },
    { h3: 'How to Fix 301 Errors: Start With the Status Code', html: `A 301 is not an error by itself, because it means the page moved permanently. The 301 errors people report are usually a loop, a long chain or a redirect that points to the wrong page. Run <code>curl -I</code> on each hop, then fix the rule that sends the request to the wrong place. See our section on redirect loops above.` },
    { h3: 'Simple 301 Redirects Not Working: WordPress Plugin Checks', html: `When Simple 301 Redirects is not working, check for typos in the source and destination, a trailing slash that differs between them, and that the WordPress Address and Site Address under Settings, General match. Then clear caches, disable other plugins one at a time, and as a last step rename .htaccess and re-save the permalinks to generate a clean one.` },
    { h3: '301 Moved Permanently: How to Fix and Resolve the Error', html: `If a page shows 301 Moved Permanently instead of loading, the client is not following the redirect, or the Location header is wrong. Check that the Location header is a full URL on the right host, that it does not point back to the same URL, and that no other rule sends it on again. To resolve a 301 Moved Permanently error in a browser, clear the cache and test again.` },
    { h3: 'Redirect 301 Not Working Behind Cloudflare', html: `Check that the DNS record is proxied, because Cloudflare says its Single Redirects and Bulk Redirects require proxied records. Make sure only one layer owns the redirect, and purge the CDN cache after any change. See the section above on proxies for the order in which Cloudflare applies its rules.` }
  ] }], { date: '2026-11-15' });
