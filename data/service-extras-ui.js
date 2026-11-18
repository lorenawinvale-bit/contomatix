// UI-oriented extras for service pages (17 Nov 2026). Merged over data/service-extras.js by server.js.
// problems : "problems we fix" cards, drawn from what our About page says we kept seeing (no invented figures, no case studies, no prices)
// engagement : how scope and pricing work, consistent with the rest of the site (free audit first, per-project or retainer, short notice periods, you own your accounts)
// moreFaqs : appended after the existing FAQs; low-volume service keywords from Ahrefs matching terms (17 Nov 2026) used as natural question wording
module.exports = {
  'link-building': {
    metaTitle: 'SEO Link Building Service: Manual, White-Hat | Contomatix',
    widget: 'link-vet',
    heroTitle: 'SEO link building service, vetted link by link',
    heroLead: 'A manual, white-hat link building SEO service: relevant editorial links, link insertions and guest posts, checked by hand. No PBNs, no automation, and you see every target before it goes live.',
    proof: [
      { big: '74%', text: 'of our own 38 backlinks come from directory-type sites. We published it and explain why it is not a profile to copy.', href: '/blog/backlinks-example' },
      { big: '6 of 13', text: 'real link prospect pages we scanned had at least one dead link, which is why every target needs a human check.', href: '/blog/link-prospecting' },
      { big: '7 of 7', text: 'blogger outreach guides we read also sell a service or tool, so we wrote the advice from the official Google documentation.', href: '/blog/blogger-outreach' },
      { big: '1 of 8', text: 'international link building guides link to the official Google documentation. We read it and published what it says.', href: '/blog/international-link-building' }
    ],
    offersTitle: 'Link building services we offer',
    offers: [
      { h: 'Manual link building service', t: 'People, not software, choose each target site, write the outreach and secure the placement.' },
      { h: 'Contextual link building service', t: 'Links sit inside a relevant paragraph where a reader expects a reference, as guest posts or link insertions.' },
      { h: 'Outreach link building service', t: 'One personal pitch per site, with a specific reason the page deserves the link.' },
      { h: 'White hat link building service', t: 'Every placement is on an independently owned site. No private blog networks, no link farms, no link blasts.' },
      { h: 'High quality link building service', t: 'Real organic traffic, topical relevance, a clean outbound-link history and an editorial placement, checked by hand.' },
      { h: 'Strategic link building service', t: 'Target pages are chosen first, from a backlink gap against the sites outranking you.' },
      { h: 'Niche link building service', t: 'Placements on sites your customers actually read, matched to your topic, not to whatever is available.' },
      { h: 'Monthly link building service', t: 'A retainer for ongoing campaigns, with a monthly link report of what went live and what changed.' },
      { h: 'White label link building service', t: 'Agencies can resell it under their own brand with white-labeled reporting.' },
      { h: 'Professional link building service', t: 'A short notice period, a free audit first and reporting tied to outcomes, so confidence in the work is why you stay.' }
    ],
    metaDescription: 'A manual, white-hat SEO link building service: relevant editorial links, link insertions and guest posts, vetted by hand. No PBNs. Free audit first.',
    problemsTitle: 'Problems this link building service fixes',
    problems: [
      { h: 'Links from sites nobody reads', t: 'Private blog networks and link farms look fine in a report and do little for rankings, or put the domain at risk. We place links only on real sites with genuine organic traffic.' },
      { h: 'Reports full of rankings, empty of results', t: 'Position tracking for keywords nobody searches does not show whether the work paid off. We report the links that went live and what happened to the pages that received them.' },
      { h: 'Long contracts before any proof', t: 'You should see deliverables before you commit for a year. We keep notice periods short, so confidence in the work is the reason you stay.' },
      { h: 'Links that never reach the pages that matter', t: 'If every new link points at the homepage, the pages that need to rank earn nothing. We choose target pages first, from a backlink gap against the sites outranking you.' }
    ],
    engagementTitle: 'How a link building engagement and pricing work',
    engagement: [
      'It starts with a free backlink gap audit. We compare your referring domains with the sites already ranking for your target terms and show where the gap is, so you see what is worth doing before you pay for anything.',
      'After the audit we agree a scope, either as a monthly link building service on a retainer or as a fixed project. The price depends on your niche, how competitive it is and how many placements the plan needs, so we do not publish a price list or promise a number of links before we have seen your site.',
      'You see the target list with site metrics before any placement goes live, you receive a monthly link report, and your analytics and Search Console stay in accounts you own.'
    ],
    moreFaqs: [
      { q: 'Is this a white hat link building service?', a: 'Yes. Every placement is on an independently owned site we reach through manual outreach, in content written for readers. We do not use private blog networks, link farms, automated link blasts or paid sidebar and footer links.' },
      { q: 'What makes a high quality link building service?', a: 'Real organic traffic on the linking site, topical relevance to your niche, a clean outbound-link history and an editorial placement inside content. We check all four by hand before outreach starts, and you see the target list with metrics first.' },
      { q: 'Do you offer a monthly link building service?', a: 'Yes. A monthly retainer suits ongoing campaigns, and a fixed project suits a one-off push. We agree which after the free audit, and notice periods stay short.' },
      { q: 'Is your link building automated?', a: 'No. People choose the target sites, write the outreach and secure each placement. Software does not place links for us.' },
      { q: 'What is a contextual link building service?', a: 'Contextual links sit inside a relevant paragraph of an article, where a reader would expect a reference, instead of in a sidebar, footer or author box. Our guest posts and link insertions are contextual by design.' },
      { q: 'What is an outreach link building service?', a: 'It is a service where the provider contacts site owners and editors by email, one site at a time, to earn a placement. The quality depends on how relevant the target sites are and how personal each pitch is.' },
      { q: 'Do you provide white label link building?', a: 'Yes. Agencies can use our white-label SEO service, with fully white-labeled reporting, and we never contact your clients directly.' },
      { q: 'How much do link building services cost?', a: 'It depends on your niche, competition and the scope of the plan, so we set it after the free audit and agree a monthly retainer or a fixed project. We do not quote a price before seeing your site, because a number without that context would be a guess.' }
    ]
  }
};

Object.assign(module.exports, require('./service-extras-ui2'));

// parity additions (checker widget, extra proof/offers/faqs)
(function () {
  ['./service-extras-ui3','./service-extras-ui4','./service-extras-ui5'].forEach(function (f) { var more = require(f);
  Object.keys(more).forEach(function (k) {
    var m = more[k], t = module.exports[k]; if (!t) return;
    if (m.checker) { t.checker = m.checker; t.widget = 'check'; }
    ['heroTitle', 'metaTitle'].forEach(function (p) { if (m[p]) t[p] = m[p]; });
    ['proof', 'offers', 'moreFaqs'].forEach(function (p) { if (m[p]) t[p] = (t[p] || []).concat(m[p]); });
  });
  });
})();
