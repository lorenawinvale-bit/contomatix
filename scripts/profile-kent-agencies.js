// One-off (30 Oct 2026): read each verified-address candidate's SEO page and look up the company on Companies House. node scripts/profile-kent-agencies.js
const fs = require('fs'); const path = require('path');
const UA = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 Safari/537.36', 'accept-language': 'en-GB,en;q=0.9' };
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&#039;|&#x27;/g, "'").replace(/\s+/g, ' ').trim();
const A = {
  ramsgate: [['Knowlton Marketing', 'https://knowltonmarketing.co.uk/', 'Knowlton Marketing'], ['Esabi', 'https://esabi.co.uk/seo-ramsgate/', 'Rocket Multimedia Group'], ['Busywebs', 'https://www.busywebs.co.uk/learn-about-seo-in-thanet/', 'Busywebs'], ['9G Agency', 'https://9gagency.co.uk/seo-services/', '9G Agency'], ['Web Dandy', 'https://www.webdandy.co.uk/', 'Web Dandy']],
  ashford: [['Smart Web Agency', 'https://www.smartwebagency.co.uk/seo-services-in-ashford/', 'Smart Web Agency'], ['Quad Web Design', 'https://quadweb.uk/services/seo-ashford/', 'Quad Web Design'], ['Visarc', 'https://visarc.uk/', 'Visarc'], ['Discoverable', 'https://www.discoverable.co.uk/', 'Discoverable'], ['Will Create Media', 'https://willcreatemedia.co.uk/', 'Will Create Media'], ['Ashford Web Services', 'https://ashfordwebservices.co.uk/', 'Ashford Web Services'], ['Lustre Digital', 'https://lustredigital.co.uk/', 'Lustre Digital'], ["it'seeze Ashford", 'https://www.itseeze-ashford.co.uk/', 'itseeze']]
};
(async () => {
  const out = {};
  for (const [town, list] of Object.entries(A)) {
    out[town] = [];
    for (const [name, url, q] of list) {
      const o = { name, url };
      try { const r = await fetch(url, { headers: UA, redirect: 'follow', signal: AbortSignal.timeout(25000) }); o.status = r.status; const raw = await r.text(); const t = strip(raw); o.words = t.split(' ').length;
        o.title = (raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || ''; o.h1 = ((raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        o.seo = (t.match(/.{0,80}\bSEO\b.{0,140}/g) || []).slice(0, 3); o.prices = [...new Set(t.match(/£\s?\d[\d,]*(?:\s?(?:per month|a month|\/month|pm|\+ ?VAT))?/gi) || [])].slice(0, 6);
        o.years = (t.match(/(since|established|founded|over|more than)\s(in\s)?(\d{4}|\d+\s+years)/gi) || []).slice(0, 2); o.reviews = (t.match(/\b\d\.\d\/5|\b5[- ]star|google reviews?|trustpilot/gi) || []).slice(0, 2);
      } catch (e) { o.error = String(e.message).slice(0, 50); }
      try { const r = await fetch('https://find-and-update.company-information.service.gov.uk/search/companies?q=' + encodeURIComponent(q), { headers: UA, signal: AbortSignal.timeout(25000) }); const t = strip(await r.text()); o.ch = [...t.matchAll(/([A-Z0-9&\-\.'() ]{4,70}?)\s+((?:SC|NI|OC)?\d{6,8}) - (Incorporated on [\d]+ \w+ \d{4}|Dissolved on [\d]+ \w+ \d{4})\s+(.{10,130}?[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})/g)].slice(0, 3).map(m => `${m[1].trim()} | ${m[2]} | ${m[3]} | ${m[4]}`); } catch (e) { o.ch = ['ERR']; }
      out[town].push(o); console.log('\n##', town, name, o.status || o.error, '| H1:', (o.h1 || '').slice(0, 90), '| prices:', (o.prices || []).join(', '), '| years:', (o.years || []).join(', '), '| reviews:', (o.reviews || []).join(', ')); (o.seo || []).forEach(s => console.log('   seo>', s.trim().slice(0, 200))); (o.ch || []).forEach(s => console.log('   CH>', s));
    }
  }
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'kent-agency-profiles-2026-10-30.json'), JSON.stringify(out, null, 1));
})();
