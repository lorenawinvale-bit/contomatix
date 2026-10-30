// One-off (30 Oct 2026): for candidate agencies from Google SERPs (UK, 30 Oct 2026), fetch the home/contact/about pages and list UK postcodes and town mentions. node scripts/verify-kent-agencies.js
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-GB,en;q=0.9' };
const sets = {
  ramsgate: ['boostonlineadvertising.co.uk', 'rubi.agency', 'knowltonmarketing.co.uk', 'esabi.co.uk', 'busywebs.co.uk', '9gagency.co.uk', 'webdandy.co.uk', 'detlingwebdesign.co.uk', 'webowsdesign.co.uk', 'codexwebdevelopment.co.uk'],
  ashford: []
};
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const PC = /\b([A-Z]{1,2}\d[A-Z\d]?)\s?(\d[A-Z]{2})\b/g;
(async () => {
  const out = {};
  for (const [town, hosts] of Object.entries(sets)) {
    out[town] = [];
    for (const h of hosts) {
      const o = { host: h, pages: [], postcodes: {}, townMentions: 0, addresses: [] };
      for (const p of ['/', '/contact', '/contact-us', '/about', '/about-us']) {
        try { const r = await fetch('https://' + h + p, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(20000) }); if (r.status !== 200) continue; const t = strip(await r.text()); o.pages.push(p);
          for (const m of t.matchAll(PC)) { const k = (m[1] + ' ' + m[2]); o.postcodes[k] = (o.postcodes[k] || 0) + 1; }
          o.townMentions += (t.match(new RegExp(town, 'gi')) || []).length;
          for (const m of t.matchAll(/.{0,70}\b[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}\b/g)) if (o.addresses.length < 4 && !o.addresses.includes(m[0].trim())) o.addresses.push(m[0].trim());
        } catch (e) { }
      }
      out[town].push(o); console.log(town, h, 'pages', o.pages.join(','), 'postcodes', JSON.stringify(o.postcodes), 'townMentions', o.townMentions); o.addresses.forEach(a => console.log('    addr:', a));
    }
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'kent-agency-verify-ramsgate2-2026-10-30.json'), JSON.stringify(out, null, 1));
})();
