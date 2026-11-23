// 23 Nov 2026: lengthen meta descriptions under 120 characters (Ahrefs "meta description too short"). Exact-string replacement, nothing else touched.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const P = [
 ["The terms governing use of contomatix.com and Contomatix's link building and SEO services.", "The terms that govern use of contomatix.com and Contomatix's link building and SEO services. Read them before you start a project with us."],
 ["How Contomatix collects, uses, and protects your information across our website and services.", "How Contomatix collects, uses and protects your information across our website and services, and the choices you have over your data."],
 ["SEO strategy, link building tactics, and content marketing insights from Contomatix.", "Read the Contomatix blog for SEO strategy, link building tactics and content marketing insights, backed by data from our own site and tests."],
 ["Meet the SEO strategists and link building specialists behind Contomatix, the people who plan and run every campaign.", "Meet the SEO strategists and link building specialists behind Contomatix, the people who plan and run every campaign for our clients."],
 ["Learn what Contomatix does, how the team works, and how we help brands rank higher through white-hat SEO.", "Learn what Contomatix does, how the team works, and how we help brands rank higher through white-hat SEO and manual link building."],
 ["Build properly tagged UTM campaign URLs for Google Analytics in seconds, for free, no more guessing parameter names.", "Build properly tagged UTM campaign URLs for Google Analytics in seconds, for free, with no more guessing parameter names or values."],
 ["Get in touch with Contomatix for link building and SEO services, free audit, reply within 24 hours.", "Get in touch with Contomatix for link building and SEO services. Ask for a free audit by form, email or WhatsApp and expect a reply within 24 hours."],
 ["Turn a plain list of URLs into a valid sitemap.xml file in seconds, for free, no crawler or software needed.", "Turn a plain list of URLs into a valid sitemap.xml file in seconds, for free, with no crawler or software to install, then upload it to your site."],
 ["See how your link looks on Facebook, LinkedIn, and X, and generate the Open Graph tags to fix it, for free.", "See how your link looks on Facebook, LinkedIn and X, and generate the Open Graph tags to fix it, for free, before you publish the page."],
 ["Check a sitemap.xml file for structural errors, invalid URLs, duplicates, and limit violations, for free, in seconds.", "Check a sitemap.xml file for structural errors, invalid URLs, duplicates and limit violations, for free, in seconds, before you submit it."],
 ["How to vet a local SEO company: the questions to ask, whether local matters, and what month one should look like.", "How to vet a local SEO company: the questions to ask, whether local experience matters, and what month one should look like when you hire."],
 ["Ten Tulsa SEO companies, with every website checked by hand in August 2026. Real addresses only, no padded listings.", "Ten Tulsa SEO companies in one list, with every website checked by hand in August 2026. Real addresses only, with no padded listings."],
 ["Six Wichita SEO companies, with every website checked by hand in August 2026. Real addresses only, no padded listings.", "Six Wichita SEO companies in one list, with every website checked by hand in August 2026. Real addresses only, with no padded listings."],
 ["Five Fargo SEO companies, with every website checked by hand in August 2026. Real addresses only, no padded listings.", "Five Fargo SEO companies in one list, with every website checked by hand in August 2026. Real addresses only, with no padded listings."],
 ["Five Reno SEO companies, with every website checked by hand in August 2026. Real addresses only, no padded listings.", "Five Reno SEO companies in one list, with every website checked by hand in August 2026. Real addresses only, with no padded listings."],
 ["Search engine optimization in Boise, ID means competing in one of the fastest-growing tech hubs in the country.", "Search engine optimization in Boise, ID means competing in one of the fastest-growing tech hubs in the country. Here is what that takes."],
 ["Faceless digital marketing is how creators and businesses build real reach in 2026 without ever being on camera.", "Faceless digital marketing is how creators and businesses build real reach in 2026 without ever being on camera. Here is how it works."],
 ["Is B2B telemarketing dead in 2026, or just misunderstood? We break down when it still works and when it wastes budget.", "Is B2B telemarketing dead in 2026, or just misunderstood? We break down when it still works and when it only wastes your budget."],
 ["A forensic SEO consultant is who you call when traffic crashes and nobody knows why, to diagnose the real cause fast.", "A forensic SEO consultant is who you call when traffic crashes and nobody knows why, to diagnose the real cause fast and plan the fix."],
 ["SEO for dentists in Tulsa means winning a map pack where several practices sit within a few miles of each other.", "SEO for dentists in Tulsa means winning a map pack where several practices sit within a few miles of each other. Here is how to compete."],
 ["HVAC SEO Boise work has to serve two different customers: emergency searchers and homeowners planning ahead months out.", "HVAC SEO Boise work has to serve two different customers: emergency searchers and homeowners planning ahead months out, in one plan."],
 ["Roofing SEO Wichita campaigns are shaped by storm season, demand spikes overnight and out-of-state chasers flood in.", "Roofing SEO Wichita campaigns are shaped by storm season, when demand spikes overnight and out-of-state chasers flood in. Here is how to plan."],
 ["Search engine optimization Grand Island businesses can actually use, not generic advice copied from a bigger market.", "Search engine optimization Grand Island businesses can actually use, not generic advice copied from a bigger market. Built for a smaller local market."],
 ["Search engine optimization Rapid City businesses can actually use, not generic advice copied from a bigger market.", "Search engine optimization Rapid City businesses can actually use, not generic advice copied from a bigger market. Built for a smaller local market."],
 ["Search engine optimization Eugene businesses need has to work in a market that is barely growing, just 0.03% a year.", "Search engine optimization Eugene businesses need has to work in a market that is barely growing, just 0.03% a year. Here is the plan."],
 ["How to get SEO clients without burning months on cold outreach that goes nowhere, using channels that actually convert.", "How to get SEO clients without burning months on cold outreach that goes nowhere, using channels that actually convert for agencies."],
 ["Do nofollow links help SEO, or are they a waste of outreach time? Here's what the real ranking data actually shows.", "Do nofollow links help SEO, or are they a waste of outreach time? Here's what the real ranking data actually shows, and what to do."],
 ["Web design pricing Raleigh businesses actually pay ranges from $299 landing pages to $75,000 enterprise builds.", "Web design pricing Raleigh businesses actually pay ranges from $299 landing pages to $75,000 enterprise builds. See what drives the cost."],
 ["Funeral home SEO has to serve an urgent at-need search and a calm pre-need search at once, with care at every step.", "Funeral home SEO has to serve an urgent at-need search and a calm pre-need search at once, with care at every step. Here is how to do it."]
];
let bad = 0;
P.forEach(([o, n]) => { if (n.length < 120 || n.length > 155) { bad++; console.log('LENGTH', n.length, n.slice(0, 60)); } if (/—/.test(n)) console.log('EMDASH', n); });
if (bad) { console.log('fix lengths first'); process.exit(1); }
for (const f of ['server.js', 'data/tools.js', 'data/blog.json']) {
  const fp = path.join(root, f); let s = fs.readFileSync(fp, 'utf8'); let c = 0;
  P.forEach(([o, n]) => {
    const variants = [[o, n]];
    if (/'/.test(o)) variants.push([o.replace(/'/g, "\\'"), n.replace(/'/g, "\\'")]);
    variants.forEach(([a, b]) => { const parts = s.split(a); if (parts.length > 1) { c += parts.length - 1; s = parts.join(b); } });
  });
  fs.writeFileSync(fp, s); console.log(f, 'replacements', c);
}
