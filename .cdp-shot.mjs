import { spawn } from 'child_process';
import fs from 'fs';
import WebSocket from 'ws';

const [width, height, out, url] = process.argv.slice(2);
const port = 9333;
const chrome = spawn('/opt/google/chrome/chrome', [
  '--headless=new', '--no-sandbox', '--disable-dev-shm-usage',
  '--enable-unsafe-swiftshader', '--use-gl=swiftshader',
  '--user-data-dir=/tmp/cdp-prof-' + port + '-' + width,
  '--no-first-run', '--no-default-browser-check', '--disable-background-networking',
  '--hide-scrollbars', `--window-size=${width},${height}`,
  `--remote-debugging-port=${port}`, url,
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/list`);
    targets = await res.json();
    if (targets.some((t) => t.type === 'page')) break;
  } catch {}
  await sleep(300);
}
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 256 * 1024 * 1024 });
await new Promise((r) => ws.on('open', r));
let id = 0;
const pending = new Map();
ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((resolve) => {
  const msgId = ++id;
  pending.set(msgId, resolve);
  ws.send(JSON.stringify({ id: msgId, method, params }));
});

await send('Runtime.enable');
const evalExpr = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  return r.result?.result?.value;
};

let ready = false;
for (let i = 0; i < 120; i++) {
  await sleep(500);
  const state = await evalExpr(`JSON.stringify({
    canvas: !!document.querySelector('#home canvas'),
    loading: /loading 3d burger/i.test(document.body.innerText),
    h: document.querySelector('#home')?.getBoundingClientRect().height || 0
  })`);
  if (state) {
    const s = JSON.parse(state);
    if (s.canvas && !s.loading) { ready = true; break; }
  }
}
console.log('ready=', ready);
await sleep(1200);
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log('saved', out);
ws.close();
chrome.kill('SIGKILL');
process.exit(0);
