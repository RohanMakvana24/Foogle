/**
 * Performance smoke test for the Foogle site.
 *
 * Usage:
 *   npm run build && npx vite preview --port 4173 &
 *   node scripts/perf-check.mjs http://localhost:4173 [width] [height]
 *
 * Reports idle frame timing, long tasks, canvas count, image failures and
 * whether the lazily mounted map / lanyard sections actually come alive.
 */
import { spawn } from 'child_process';
import WebSocket from 'ws';

const url = process.argv[2] || 'http://localhost:4173';
const width = Number(process.argv[3] || 390);
const height = Number(process.argv[4] || 844);
const port = 9500 + Math.floor(Math.random() * 400);

const chrome = spawn(
  '/opt/google/chrome/chrome',
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--enable-unsafe-swiftshader',
    '--use-gl=swiftshader',
    `--user-data-dir=/tmp/perf-check-${port}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--hide-scrollbars',
    `--window-size=${width},${height}`,
    `--remote-debugging-port=${port}`,
    url,
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let targets;
for (let i = 0; i < 60; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/list`);
    targets = await res.json();
    if (targets.some((t) => t.type === 'page')) break;
  } catch {}
  await sleep(400);
}

const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl, { maxPayload: 256 * 1024 * 1024 });
await new Promise((r) => ws.on('open', r));

let id = 0;
const pending = new Map();
ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

const evaluate = async (expression) => {
  const res = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
    timeout: 30000,
  });
  return res.result?.result?.value;
};

await send('Runtime.enable');
await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 2,
  mobile: width < 768,
});

const failedRequests = [];
ws.on('message', (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) {
    failedRequests.push(`${msg.params.response.status} ${msg.params.response.url}`);
  }
});

await sleep(3500);

const idleFrame = await evaluate(`new Promise((resolve) => {
  const frames = [];
  let last = performance.now();
  const tick = () => {
    const now = performance.now();
    frames.push(now - last);
    last = now;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  setTimeout(() => {
    const sorted = frames.slice().sort((a, b) => a - b);
    resolve(JSON.stringify({
      frames: frames.length,
      fps: Math.round((frames.length / 2000) * 1000),
      p50: Math.round(sorted[Math.floor(sorted.length * 0.5)] || 0),
      p95: Math.round(sorted[Math.floor(sorted.length * 0.95)] || 0),
      over50: frames.filter((f) => f > 50).length,
      canvases: document.querySelectorAll('canvas').length,
      nodes: document.getElementsByTagName('*').length
    }));
  }, 2000);
})`);

const longTasks = await evaluate(`new Promise((resolve) => {
  const tasks = [];
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) tasks.push(Math.round(entry.duration));
    }).observe({ type: 'longtask', buffered: true });
  } catch {}
  setTimeout(() => resolve(JSON.stringify({
    count: tasks.length,
    totalMs: tasks.reduce((a, b) => a + b, 0),
    worst: tasks.sort((a, b) => b - a).slice(0, 5)
  })), 1500);
})`);

// Scroll to the reviews (lanyard 3D) and location (map) sections.
const lazySections = await evaluate(`(async () => {
  const scrollTo = async (sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    el.scrollIntoView({ block: 'center' });
    await new Promise((r) => setTimeout(r, 2500));
    return true;
  };
  const reviews = await scrollTo('#reviews') || await scrollTo('[aria-labelledby*="review"]');
  const reviewsCanvas = document.querySelectorAll('canvas').length;
  const location = await scrollTo('#location');
  await new Promise((r) => setTimeout(r, 3000));
  const mapCanvas = [...document.querySelectorAll('#location canvas')].length;
  return JSON.stringify({ reviews, location, reviewsCanvas, mapCanvas, canvases: document.querySelectorAll('canvas').length });
})()`);

const images = await evaluate(`JSON.stringify({
  total: document.images.length,
  broken: [...document.images].filter((i) => i.currentSrc && i.complete && i.naturalWidth === 0).map((i) => i.currentSrc),
  remote: [...document.images].map((i) => i.currentSrc).filter((s) => s && !s.startsWith(location.origin) && !s.startsWith('data:'))
})`);

const transfer = await evaluate(`JSON.stringify(
  performance.getEntriesByType('resource')
    .reduce((acc, r) => {
      const kb = Math.round(r.transferSize / 1024);
      if (/\\.(js|css)/.test(r.name)) return { ...acc, code: acc.code + kb };
      if (/\\.(jpg|jpeg|png|webp|avif)/.test(r.name)) return { ...acc, images: acc.images + kb };
      return acc;
    }, { code: 0, images: 0 })
)`);

const report = {
  viewport: `${width}x${height}`,
  idle: JSON.parse(idleFrame || '{}'),
  longTasks: JSON.parse(longTasks || '{}'),
  lazySections: JSON.parse(lazySections || '{}'),
  images: JSON.parse(images || '{}'),
  transferKB: JSON.parse(transfer || '{}'),
  failedImageRequests: failedRequests.filter((f) => /\.(jpg|jpeg|png|webp|avif)/i.test(f)),
};

console.log(JSON.stringify(report, null, 2));

ws.close();
chrome.kill();
process.exit(0);
