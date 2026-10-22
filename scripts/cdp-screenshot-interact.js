// Usage: node cdp-screenshot-interact.js <url> <outputPngPath> <fillSelector> <fillValue> <clickSelector> <waitMs>
// Navigates to <url>, sets the value of the element matching <fillSelector> (a simple
// CSS selector) to <fillValue> and dispatches an input event, clicks the element
// matching <clickSelector>, waits <waitMs>, then screenshots the page.
// fillSelector/fillValue/clickSelector may be passed as the literal string "-" to skip that step.
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const [,, targetUrl, outPath, fillSelector, fillValue, clickSelector, waitMsArg] = process.argv;
if (!targetUrl || !outPath) { console.error('Usage: node cdp-screenshot-interact.js <url> <outputPngPath> <fillSelector|-> <fillValue|-> <clickSelector|-> <waitMs>'); process.exit(1); }
const waitMs = parseInt(waitMsArg, 10) || 5000;

const userDataDir = path.join(require('os').tmpdir(), 'cdp-interact-' + Date.now());
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9333 + Math.floor(Math.random() * 500);

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--window-size=1400,900',
  '--autoplay-policy=no-user-gesture-required',
  '--enable-gpu-rasterization',
  '--ignore-gpu-blocklist',
  '--ignore-certificate-errors',
  '--ignore-ssl-errors',
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

    await new Promise((resolve) => {
      const handler = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Page.loadEventFired') { ws.removeEventListener('message', handler); resolve(); }
      };
      ws.addEventListener('message', handler);
      setTimeout(resolve, 8000);
    });

    await new Promise(r => setTimeout(r, 2000));

    if (fillSelector && fillSelector !== '-') {
      const fillScript = `
        (function() {
          const el = document.querySelector(${JSON.stringify(fillSelector)});
          if (!el) return 'fill: not found';
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeSetter.call(el, ${JSON.stringify(fillValue)});
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          return 'fill: ok';
        })();
      `;
      const fillResult = await cdpSend(ws, id++, 'Runtime.evaluate', { expression: fillScript, returnByValue: true });
      console.error('Fill result:', fillResult.result && fillResult.result.value);
    }

    if (clickSelector && clickSelector !== '-') {
      const isTextMatch = clickSelector.startsWith('text:');
      const clickScript = isTextMatch
        ? `
          (function() {
            const wanted = ${JSON.stringify(clickSelector.slice(5).toLowerCase())};
            const candidates = Array.from(document.querySelectorAll('button, a, [role="button"]'));
            const el = candidates.find(function(c) { return (c.innerText || c.textContent || '').trim().toLowerCase() === wanted; });
            if (!el) return 'click: text not found';
            el.click();
            return 'click: ok (text)';
          })();
        `
        : `
          (function() {
            const el = document.querySelector(${JSON.stringify(clickSelector)});
            if (!el) return 'click: not found';
            el.click();
            return 'click: ok';
          })();
        `;
      const clickResult = await cdpSend(ws, id++, 'Runtime.evaluate', { expression: clickScript, returnByValue: true });
      console.error('Click result:', clickResult.result && clickResult.result.value);
    }

    await new Promise(r => setTimeout(r, waitMs));

    const shot = await cdpSend(ws, id++, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    console.log('Saved screenshot to', outPath);

    ws.close();
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exitCode = 1;
  } finally {
    chrome.kill();
  }
})();
