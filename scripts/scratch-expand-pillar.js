const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'data', 'blog.json');
const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const p = posts.find(x => x.slug === 'how-to-vet-a-local-seo-company-2026');

const insert = `
<h2>Red Flags That Should End the Conversation</h2>
<p>Some signals are worth treating as disqualifying rather than merely concerning, regardless of how good the rest of the pitch sounds.</p>
<p><strong>A guaranteed ranking or a guaranteed timeline.</strong> Nobody controls Google's algorithm, and a specific promise — page one in 90 days, a specific position for a specific term — means either the person doesn't understand how search ranking actually works, or they're comfortable promising something they know they can't reliably deliver. Neither is a good sign about what else they might be willing to promise.</p>
<p><strong>Reluctance to name past or current clients.</strong> A reasonable agency will show you something — a redacted report, a named client willing to take a reference call, a case study with real numbers. An agency that treats its entire client list as confidential, with no exceptions at all, is often hiding a thin track record rather than protecting genuine confidentiality.</p>
<p><strong>Pressure to sign quickly.</strong> SEO is a slow-moving field by nature — a contract signed this week versus next week makes no practical difference to results. Artificial urgency ("this rate expires today") is a sales tactic borrowed from industries where speed actually matters, and it doesn't belong in this one.</p>
<p><strong>A technical audit that reads like a template.</strong> If the "custom audit" you receive could have been generated for any website in any industry — generic recommendations with your domain name swapped in — that's a preview of what ongoing "strategy" will look like too.</p>
`;

p.content = p.content.replace('<h2>How to Tell If a', insert + '\n<h2>How to Tell If a');
fs.writeFileSync(FILE, JSON.stringify(posts, null, 2));
const text = p.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(text.split(' ').length, 'words');
