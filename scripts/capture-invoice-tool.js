// node scripts/capture-invoice-tool.js <currency> <outPrefix> [baseUrl]; env LOGO=<png> PDFH=<px>  -> <outPrefix>-form.png, <outPrefix>-pdf.png, <outPrefix>.pdf
const { spawn } = require('child_process'); const fs = require('fs'); const os = require('os'); const path = require('path');
const [,, cur, outPrefix, base] = process.argv;
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--disable-gpu','--hide-scrollbars','--window-size=1280,1000','--user-data-dir=' + path.join(os.tmpdir(), 'invt-' + Date.now()),'--remote-debugging-port=' + port,'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let ws; for (let i = 0; i < 60; i++) { try { const t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const pg = t.find(x => x.type === 'page'); if (pg) { ws = new WebSocket(pg.webSocketDebuggerUrl); break; } } catch (e) {} await sleep(250); }
  await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {}; ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) { pend[d.id](d); delete pend[d.id]; } };
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async expr => { const d = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); return d.result.exceptionDetails ? 'EXC ' + JSON.stringify(d.result.exceptionDetails).slice(0, 300) : d.result.result.value; };
  await send('Page.enable');
  await send('Page.navigate', { url: (base || 'https://contomatix.com') + '/tools/invoice-generator' });
  for (let i = 0; i < 40; i++) { await sleep(500); if (await ev('!!document.getElementById("inv-number") && !!window.jspdf')) break; }
  console.log('loaded', await ev('location.href'));
  console.log(await ev(`(() => {
    const set = (id, v) => { const e = document.getElementById(id); e.value = v; e.dispatchEvent(new Event('input', {bubbles:true})); e.dispatchEvent(new Event('change', {bubbles:true})); };
    set('inv-from-name', 'Sample Studio'); set('inv-from-address', '12 Example Road, Lahore'); set('inv-from-email', 'billing@example.com');
    set('inv-to-name', 'Example Client Ltd'); set('inv-to-address', '45 Sample Street, London'); set('inv-number', 'INV-0042');
    set('inv-currency', '${cur}'); set('inv-issue-date', '2026-09-22'); set('inv-due-date', '2026-10-06');
    set('inv-discount', '10'); set('inv-tax', '5');
    const items = [['Website audit and fix list', 1, 450], ['Blog post, 2,000 words', 3, 120]];
    while (document.querySelectorAll('#inv-items .invoice-line-item').length < items.length) document.getElementById('inv-add-item').click();
    document.querySelectorAll('#inv-items .invoice-line-item').forEach((row, i) => { if (!items[i]) return;
      const [d, q, r] = items[i]; const s = (sel, v) => { const e = row.querySelector(sel); e.value = v; e.dispatchEvent(new Event('input', {bubbles:true})); };
      s('.inv-item-desc', d); s('.inv-item-qty', q); s('.inv-item-rate', r); });
    return 'total=' + document.getElementById('inv-prev-total').textContent + ' sub=' + document.getElementById('inv-prev-subtotal').textContent + ' disc=' + document.getElementById('inv-prev-discount').textContent + ' tax=' + document.getElementById('inv-prev-tax').textContent;
  })()`));
  await ev(`[...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Decline')?.click(); 1`); await sleep(500);
  if (process.env.LOGO) {
    await send('DOM.enable'); const docN = await send('DOM.getDocument'); const q = await send('DOM.querySelector', { nodeId: docN.result.root.nodeId, selector: '#inv-logo' });
    await send('DOM.setFileInputFiles', { nodeId: q.result.nodeId, files: [process.env.LOGO] }); await sleep(1500);
    console.log('logo shown in preview:', await ev(`!document.getElementById('inv-prev-logo-wrap').hidden`));
  }
  await ev(`document.getElementById('inv-form').scrollIntoView(); window.scrollBy(0, -20); 1`); await sleep(800);
  let shot = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(outPrefix + '-form.png', Buffer.from(shot.result.data, 'base64'));
  const b64 = await ev(`new Promise(res => { const O = window.jspdf.jsPDF; window.jspdf.jsPDF = function (o) { const d = new O(o); d.save = function () { res(d.output('datauristring')); }; return d; }; window.onerror = m => res('ERR ' + m); document.getElementById('inv-download').click(); setTimeout(() => res('TIMEOUT'), 8000); })`);
  if (!b64.startsWith('data:')) { console.log('pdf fail', b64); ws.close(); chrome.kill(); return; }
  fs.writeFileSync(outPrefix + '.pdf', Buffer.from(b64.split(',')[1], 'base64'));
  fs.writeFileSync(outPrefix + '-view.html', `<!doctype html><body style="margin:0;background:#888"><canvas id=c></canvas><script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script><script>
    pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pdfjsLib.getDocument({data: atob('${b64.split(',')[1]}')}).promise.then(d=>d.getPage(1)).then(p=>{const v=p.getViewport({scale:1.6});const c=document.getElementById('c');c.width=v.width;c.height=v.height;return p.render({canvasContext:c.getContext('2d'),viewport:v}).promise}).then(()=>document.title='DONE');</script></body>`);
  await send('Emulation.setDeviceMetricsOverride', { width: 952, height: +(process.env.PDFH || 1348), deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'file:///' + (outPrefix + '-view.html').split(String.fromCharCode(92)).join('/') });
  for (let i = 0; i < 40; i++) { await sleep(500); if (await ev('document.title') === 'DONE') break; }
  shot = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(outPrefix + '-pdf.png', Buffer.from(shot.result.data, 'base64'));
  console.log('pdf title', await ev('document.title'));
  ws.close(); chrome.kill();
})().catch(e => { console.error(e); chrome.kill(); });
