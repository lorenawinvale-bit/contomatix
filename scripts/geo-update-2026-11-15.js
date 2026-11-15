// 15 Nov 2026: first posts updated with the new GEO step (see docs/daily-format.md step 2b).
// For each post we read Google's AI Overview and the top results for the head query on 15 Nov 2026, and added what they cover and the post did not.
// No competitor names. Facts only from Google pages read on 15 Nov 2026 (Search Console manual actions help, Business Profile review tips) or from the posts.
const fs = require('fs'); const path = require('path');
const { apply } = require('./lowvol-lib.js');
const fp = path.join(__dirname, '..', 'data', 'blog.json');
let posts = JSON.parse(fs.readFileSync(fp, 'utf8'));
{
  const p = posts.find(x => x.slug === 'why-hire-a-forensic-seo-consultant-2026'); const T = '<!-- geo-2026-11-15 -->';
  if (!p.content.includes(T)) {
    // 1. answer-first short answer before the first H2
    const h = p.content.indexOf('<h2>'); const first = '<p><strong>Short answer:</strong> a forensic SEO consultant investigates why a site\'s search performance collapsed, whether that is a traffic drop, a manual action or a suspicious link profile, and proves the cause with dated evidence before any fix begins.</p>\n';
    p.content = p.content.slice(0, h) + T + '\n' + first + p.content.slice(h);
    // 2. due diligence paragraph at the end of "When You Actually Need One"
    const s = p.content.indexOf('<h2>When You Actually Need One</h2>'); const e = p.content.indexOf('<h2>', s + 10);
    const add = '<p>One more case is due diligence before you buy a website or domain. Google\'s Manual actions report shows manual actions against a site and its manual action history, and the Security Issues report shows whether it was hacked, so ask the seller for screenshots of both before you pay. Google also says that if you buy a site that broke its spam policies, you must fix the issues and mention the purchase in your reconsideration request.</p>\n\n';
    p.content = p.content.slice(0, e) + add + p.content.slice(e);
    fs.writeFileSync(fp, JSON.stringify(posts, null, 2), 'utf8');
  }
}
apply([
  { slug: 'why-hire-a-forensic-seo-consultant-2026', h2: 'Related Questions About Forensic SEO', sources: 'Google AI Overview and top results for "forensic seo consultant" read 15 Nov 2026',
    keywords: ['forensic seo consultant'],
    items: [
      { h3: 'Three Questions a Forensic SEO Consultant Asks First', html: `Expect three: when exactly did the drop start, how much traffic or visibility was lost, and did it line up with a known Google update or a change to the site. Having the dates, a Search Console export and a list of site changes ready shortens the first call and the diagnostic phase.` },
      { h3: 'Does Forensic SEO Cover Content Quality as Well?', html: `Yes, where the evidence points there. Google says that after a large drop in position you should assess the whole website to check that it is helpful, reliable and people-first, and that changes can take from days to several months to show. A good investigation separates content-quality causes from technical, link and algorithm causes.` },
      { h3: 'Can a Forensic Consultant Review Your Previous Agency?', html: `They can. Reviewing a previous agency means dating the links it built, the pages it changed and the redirects it set, to see whether any tactic broke Google's spam policies. Do this before changing more, and keep read-only access to your own accounts for them at the start.` }
    ] },
  { slug: 'how-to-vet-a-local-seo-company-2026', h2: 'Related Questions About Choosing a Local SEO Company', sources: 'Google AI Overview and top results for "how to vet a local seo company" read 15 Nov 2026',
    keywords: ['how to vet a local seo company'],
    items: [
      { h3: 'What Should a Local SEO Company Report On?', html: `Calls, enquiries and form fills tied to real work, not only rankings, plus how your Business Profile is performing, which you can see in your own account. A local SEO company that cannot show you that data, or will not give you access to your own Analytics, Search Console and Business Profile, is making it hard for you to judge the work.` },
      { h3: 'How Should a Local SEO Company Earn You Reviews?', html: `By helping you ask real customers. Google's review tips say customers can be asked to leave a review through a Google link or QR code, and that offering incentives such as free or discounted goods or services for reviews is prohibited. Ask any provider to describe their review method, and walk away from anyone who buys, filters or rewards reviews.` },
      { h3: 'Is Very Cheap Local SEO a Red Flag?', html: `Be careful, but judge it by scope, not by a price number, because we cannot give a safe threshold. Ask what is delivered each month, how many hours of senior time are included and what is automated. If the answer is vague, or comes with a ranking guarantee, which Google says no one can honestly give, treat it as a red flag.` }
    ] }
], { date: '2026-11-15' });
