// One-off: fetch the pages behind the Raleigh family doctor Maps listings and record on-page local SEO signals.
// node scripts/crawl-doctor-sites.js -> keyword-research/doctor-sites-raleigh-2026-10-14.json
const fs = require('fs'); const path = require('path');
const src = require('../../keyword-research/maps-family-doctor-raleigh-2026-10-14.json');
const strip = s => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&amp;/g, ' ').replace(/\s+/g, ' ');
async function one(u) {
  const o = { url: u };
  try {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 20000);
    const r = await fetch(u, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; ContomatixResearch/1.0; +https://contomatix.com)', accept: 'text/html' } });
    clearTimeout(t); o.status = r.status; o.final = r.url;
    const h = await r.text();
    const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(h) || [, ''])[1].replace(/\s+/g, ' ').trim();
    o.titleRaleigh = /raleigh/i.test(title);
    const types = new Set(); let tel = false, addr = false, hours = false, agg = false;
    [...h.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].forEach(m => { try { (function w(n) { if (!n || typeof n !== 'object') return; if (Array.isArray(n)) return n.forEach(w); if (n['@type']) [].concat(n['@type']).forEach(x => types.add(String(x))); if (n.telephone) tel = true; if (n.address) addr = true; if (n.openingHours || n.openingHoursSpecification) hours = true; if (n.aggregateRating) agg = true; Object.values(n).forEach(w); })(JSON.parse(m[1])); } catch (e) {} });
    o.ldPresent = types.size > 0; o.ldTypes = [...types];
    o.medicalType = [...types].some(x => /^(Physician|MedicalClinic|MedicalBusiness|MedicalOrganization|Hospital|IndividualPhysician|Dentist|MedicalPractice)$/i.test(x));
    o.ldHours = hours; o.ldAgg = agg;
    const text = strip(h);
    o.telLink = /href=["']tel:/i.test(h);
    o.newPatients = /(accepting|welcoming)\s+new\s+patients|new\s+patients?\s+(welcome|accepted)/i.test(text);
    o.insurance = /insurance/i.test(text);
    o.portal = /patient\s+portal|mychart|follow\s*my\s*health|athenahealth|healow/i.test(text) || /mychart|followmyhealth|healow|athena/i.test(h);
    o.booking = /book\s+(an?\s+)?(online|appointment|visit)|schedule\s+(an?\s+)?(online|appointment|visit)|request\s+an?\s+appointment/i.test(text);
    o.telehealth = /telehealth|telemedicine|virtual\s+visit|video\s+visit/i.test(text);
    o.hoursText = /\b(mon|monday)\b[\s\S]{0,60}\b\d{1,2}(:\d\d)?\s*(am|a\.m\.|pm|p\.m\.)/i.test(text);
    o.emergencyNote = /911|emergency/i.test(text);
    o.raleighInText = (text.match(/raleigh/gi) || []).length;
    o.canonical = /<link[^>]+rel=["']canonical["']/i.test(h);
    o.https = /^https:/.test(o.final);
    o.bytes = h.length;
  } catch (e) { o.error = String(e.message || e).slice(0, 60); }
  return o;
}
(async () => {
  const out = [];
  for (let i = 0; i < src.urls.length; i += 5) out.push(...await Promise.all(src.urls.slice(i, i + 5).map(one)));
  fs.writeFileSync(path.join(__dirname, '..', '..', 'keyword-research', 'doctor-sites-raleigh-2026-10-14.json'), JSON.stringify(out, null, 1));
  const ok = out.filter(o => o.status === 200); const c = f => ok.filter(f).length;
  console.log(JSON.stringify({ fetched: out.length, ok: ok.length, bad: out.filter(o => o.status !== 200).map(o => (o.status || o.error) + ' ' + o.url.slice(8, 50)),
    ld: c(o => o.ldPresent), medicalType: c(o => o.medicalType), ldHours: c(o => o.ldHours), tel: c(o => o.telLink), newPatients: c(o => o.newPatients), insurance: c(o => o.insurance), portal: c(o => o.portal), booking: c(o => o.booking), telehealth: c(o => o.telehealth), hoursText: c(o => o.hoursText), titleRaleigh: c(o => o.titleRaleigh), canonical: c(o => o.canonical), emergency: c(o => o.emergencyNote) }, null, 1));
})();
