// Usage: node cdp-screenshot-clean.js <url> <outputPngPath>
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const [,, targetUrl, outPath] = process.argv;
if (!targetUrl || !outPath) { console.error('Usage: node cdp-screenshot-clean.js <url> <outputPngPath>'); process.exit(1); }

const userDataDir = path.join(require('os').tmpdir(), 'cdp-clean-' + Date.now());
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9333 + Math.floor(Math.random() * 500);

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--window-size=1280,900',
  '--autoplay-policy=no-user-gesture-required',
  '--enable-gpu-rasterization',
  '--ignore-gpu-blocklist',
  `--user-data-dir=${userDataDir}`,
  `--remote-debugging-port=${port}`,
  'about:blank'
], { stdio: 'ignore' });

async function waitForDevTools() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return;
    } catch (e) {}
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('DevTools did not become ready');
}

function cdpSend(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

(async () => {
  try {
    await waitForDevTools();
    const listRes = await fetch(`http://127.0.0.1:${port}/json`);
    const targets = await listRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.addEventListener('open', resolve); ws.addEventListener('error', reject); });

    let id = 1;
    await cdpSend(ws, id++, 'Page.enable');
    await cdpSend(ws, id++, 'Network.enable');
    await cdpSend(ws, id++, 'Page.navigate', { url: targetUrl });

    // wait for load
    await new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Page.loadEventFired') { ws.removeEventListener('message', handler); resolve(); }
      };
      ws.addEventListener('message', handler);
      setTimeout(resolve, 8000); // fallback timeout
    });

    // give scripts/cookie banners time to render
    await new Promise(r => setTimeout(r, 2000));

    // try to dismiss common cookie/consent banners generically
    const dismissScript = `
      (function() {
        const texts = ['accept & close','accept all','accept cookies','i accept','accept','agree','got it','allow all','ok'];
        const candidates = Array.from(document.querySelectorAll('button, a, [role="button"]'));
        for (const el of candidates) {
          const t = (el.innerText || el.textContent || '').trim().toLowerCase();
          if (texts.some(x => t === x || t.includes(x))) {
            el.click();
            return 'clicked: ' + t;
          }
        }
        return 'no button found';
      })();
    `;
    const evalResult = await cdpSend(ws, id++, 'Runtime.evaluate', { expression: dismissScript, returnByValue: true });
    console.error('Dismiss attempt result:', evalResult.result && evalResult.result.value);

    // poll up to ~25s, retaking the screenshot every 2.5s, until no obvious spinner/loader element remains
    let finalShotData = null;
    for (let attempt = 0; attempt < 10; attempt++) {
      await new Promise(r => setTimeout(r, 2500));
      const checkScript = `
        (function() {
          const all = Array.from(document.querySelectorAll('*'));
          const spinner = all.find(el => {
            const cls = (el.className || '').toString().toLowerCase();
            const style = window.getComputedStyle(el);
            const looksLikeSpinner = cls.includes('load') || cls.includes('spin') || cls.includes('preload');
            const visible = style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0;
            return looksLikeSpinner && visible && el.offsetWidth > 10 && el.offsetWidth < 200;
          });
          return spinner ? 'spinner-present' : 'clear';
        })();
      `;
      const checkResult = await cdpSend(ws, id++, 'Runtime.evaluate', { expression: checkScript, returnByValue: true });
      const state = checkResult.result && checkResult.result.value;
      console.error('Attempt ' + (attempt + 1) + ': ' + state);
      const shotAttempt = await cdpSend(ws, id++, 'Page.captureScreenshot', { format: 'png' });
      finalShotData = shotAttempt.data;
      if (state === 'clear') break;
    }
    fs.writeFileSync(outPath, Buffer.from(finalShotData, 'base64'));
    console.log('Saved screenshot to', outPath);

    ws.close();
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exitCode = 1;
  } finally {
    chrome.kill();
  }
})();
