// 14 Nov 2026: corrects the llms.txt generator page so it matches Google's own statement (read in Google's Search Central documentation updates on 9 Nov 2026):
// llms.txt files are not needed for Google Search and do not positively or negatively impact visibility or rankings, and it is fine to maintain one for other services or systems that use them.
// Removed: unsourced adoption claims, "no downside", and "helps ChatGPT, Claude and Perplexity understand and cite your business".
const fs = require('fs'); const path = require('path');
const G = 'Google says llms.txt files are not needed for Google Search and do not positively or negatively impact your visibility or rankings, though it is fine to maintain one for other services or systems that use them.';
function rewriteLine(t, startsWith, newLine) { const lines = t.split('\n'); const i = lines.findIndex(l => l.includes(startsWith)); if (i < 0) throw new Error('line not found: ' + startsWith.slice(0, 40)); lines[i] = newLine; return lines.join('\n'); }
const f = path.join(__dirname, '..', 'views', 'pages', 'llms-txt-generator.ejs'); let t = fs.readFileSync(f, 'utf8');
if (t.includes('not needed for Google Search')) { console.log('already corrected'); process.exit(0); }
t = rewriteLine(t, 'This <strong>free llms.txt generator</strong> creates', `    <p>This <strong>free llms.txt generator</strong> creates a valid <code>llms.txt</code> file in seconds, a plain-language map of your site that some AI tools may choose to read. ${G} No signup, no email required, nothing leaves your browser.</p>`);
t = t.replace('it\'s a hand-written cheat sheet that helps an AI model describe your business accurately instead of guessing from whatever page it happens to land on.', 'it\'s a hand-written cheat sheet that an AI model could use to describe your business instead of guessing from whatever page it happens to land on.');
t = rewriteLine(t, 'The format was proposed in 2024 by Jeremy Howard', `    <p style="color: var(--text-dim);">The format was proposed in 2024 by Jeremy Howard (Answer.AI) as a lightweight standard. It is voluntary and no search engine or AI vendor requires it. ${G} Whether a particular AI assistant reads the file varies, so treat it as optional.</p>`);
t = t.replace('<h2>Why It Matters for AI Search</h2>', '<h2>Does llms.txt Matter for Search?</h2>');
t = rewriteLine(t, 'As more people ask ChatGPT, Claude, and Perplexity', `    <p style="color: var(--text-dim);">${G} It is a small, optional file, not a ranking lever. For what actually earns mentions in AI answers, see our guide to <a href="/blog/what-is-llm-seo-2026">LLM SEO</a> and <a href="/blog/how-to-get-cited-by-chatgpt-2026">how to get cited by ChatGPT</a>.</p>`);
t = rewriteLine(t, 'No tool can guarantee that. llms.txt is still an emerging', `        <p>No tool can guarantee that. llms.txt is a voluntary convention that not every AI system reads, and Google says it is not needed for Google Search. It costs nothing to add, but do not expect it to change who mentions you.</p>`);
t = rewriteLine(t, 'Not universally, adoption varies by vendor', `        <p>Not universally. Adoption varies by vendor, and Google says llms.txt files are not needed for Google Search. Treat the file as optional.</p>`);
// JSON-LD FAQ answers
t = t.replace(/(name: 'Will this guarantee ChatGPT or Claude mentions my business\?', acceptedAnswer: \{ '@type': 'Answer', text: ')[^']*(' \} \})/, "$1No tool can guarantee that. llms.txt is a voluntary convention that not every AI system reads, and Google says it is not needed for Google Search. It costs nothing to add, but do not expect it to change who mentions you.$2");
t = t.replace(/(name: 'Does every AI assistant actually read llms\.txt today\?', acceptedAnswer: \{ '@type': 'Answer', text: ')[^']*(' \} \})/, "$1Not universally. Adoption varies by vendor, and Google says llms.txt files are not needed for Google Search. Treat the file as optional.$2");
fs.writeFileSync(f, t, 'utf8');
// server meta description and tools summary
const sp = path.join(__dirname, '..', 'server.js'); let s = fs.readFileSync(sp, 'utf8');
s = s.replace("description: 'Generate a valid llms.txt file for free in seconds, a plain-language site summary that helps AI assistants understand and cite your business.'", "description: 'Generate a valid llms.txt file for free in seconds, a plain-language site summary some AI tools may read. Google Search does not need it.'");
fs.writeFileSync(sp, s, 'utf8');
const tp = path.join(__dirname, '..', 'data', 'tools.js'); let d = fs.readFileSync(tp, 'utf8');
d = d.replace("summary: 'Build a valid llms.txt file in seconds, a plain-language map of your site for ChatGPT, Claude, and other AI assistants.'", "summary: 'Build a valid llms.txt file in seconds, a plain-language map of your site that some AI tools may read. Google Search does not need it.'");
fs.writeFileSync(tp, d, 'utf8');
// the free-seo-tools post quotes the old summary
const bp = path.join(__dirname, '..', 'data', 'blog.json'); const posts = JSON.parse(fs.readFileSync(bp, 'utf8')); const p = posts.find(x => x.slug === 'free-seo-tools');
const oldS = 'a plain-language map of your site for ChatGPT, Claude, and other AI assistants.'; if (p.content.includes(oldS)) p.content = p.content.replace(oldS, 'a plain-language map of your site that some AI tools may read. Google Search does not need it.');
for (let k = 0; k < 5; k++) { try { fs.writeFileSync(bp, JSON.stringify(posts, null, 2), 'utf8'); break; } catch (e) { if (k === 4) throw e; } }
console.log('llms.txt claims corrected');
