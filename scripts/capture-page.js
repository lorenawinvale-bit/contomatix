// node scripts/capture-page.js <url> <out.png> [--w=1280] [--h=900] [--js=file.js] [--clip=x,y,w,h] [--sel=cssSelector] [--wait=ms]
// Loads a page in headless Chrome, declines cookie banners, optionally runs a JS file in the page, then captures
// the viewport, a clip rectangle, or the bounding box of a selector. Local-only helper (not deployed).
const { spawn } = require('child_process'); const fs = require('fs'); const os = require('os'); const path = require('path');
const args = process.argv.slice(2); const pos = args.filter(a => !a.startsWith('--'));
const opt = Object.fromEntries(args.filter(a => a.startsWith('--')).map(a => { const [k, ...v] = a.slice(2).split('='); return [k, v.join('=')]; }));
const [url, out] = pos; const W = +(opt.w || 1280), H = +(opt.h || 900);
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${W},${H}`, '--user-data-dir=' + path.join(os.tmpdir(), 'cap-' + Date.now()), '--remote-debugging-port=' + port, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let ws; for (let i = 0; i < 60; i++) { try { const t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const pg = t.find(x => x.type === 'page'); if (pg) { ws = new WebSocket(pg.webSocketDebuggerUrl); break; } } catch (e) {} await sleep(250); }
  await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async expr => { const d = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); return d.result.exceptionDetails ? 'EXC ' + JSON.stringify(d.result.exceptionDetails).slice(0, 400) : d.result.result.value; };
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  await sleep(+(opt.wait || 3500));
  await ev(`[...document.querySelectorAll('button')].filter(b => /^(decline|reject all|reject|no thanks|accept all|accept)$/i.test(b.textContent.trim())).sort((a,b)=>/decline|reject/i.test(b.textContent)?-1:1)[0]?.click(); 1`);
  await sleep(600);
  if (opt.js) { console.log('js:', await ev(fs.readFileSync(opt.js, 'utf8'))); await sleep(900); }
  let params = { format: 'png' };
  if (opt.sel) {
    const r = await ev(`(() => { const e = document.querySelector(${JSON.stringify(opt.sel)}); if (!e) return null; e.scrollIntoView({block:'start'}); window.scrollBy(0,-16); const b = e.getBoundingClientRect(); return JSON.stringify({x:b.x,y:b.y,w:b.width,h:b.height}); })()`);
    if (!r) { console.log('selector not found'); } else { await sleep(500); const b = JSON.parse(await ev(`JSON.stringify((()=>{const b=document.querySelector(${JSON.stringify(opt.sel)}).getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,w:b.width,h:b.height}})())`)); params.clip = { x: b.x, y: b.y, width: b.w, height: b.h, scale: +(opt.scale || 1) }; params.captureBeyondViewport = true; }
  } else if (opt.clip) { const [x, y, w, h] = opt.clip.split(',').map(Number); params.clip = { x, y, width: w, height: h, scale: +(opt.scale || 1) }; }
  const shot = await send('Page.captureScreenshot', params);
  fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log('saved', out, fs.statSync(out).size, 'bytes');
  ws.close(); chrome.kill();
})().catch(e => { console.error(e); chrome.kill(); });
