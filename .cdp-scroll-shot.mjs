import { spawn } from 'child_process';
import fs from 'fs';
import WebSocket from 'ws';
const [width, height, scrollY, out, url] = process.argv.slice(2);
const port = 9400 + Number(width) % 100;
const chrome = spawn('/opt/google/chrome/chrome', [
  '--headless=new','--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-gl=swiftshader',
  `--user-data-dir=/tmp/cdp-scroll-${width}-${scrollY}`,'--no-first-run','--no-default-browser-check',
  '--disable-background-networking','--hide-scrollbars',`--window-size=${width},${height}`,
  `--remote-debugging-port=${port}`, url,
], { stdio: 'ignore' });
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
let targets;
for(let i=0;i<40;i++){try{targets=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if(targets.some(t=>t.type==='page'))break;}catch{} await sleep(300);}
const page=targets.find(t=>t.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl,{maxPayload:256*1024*1024});
await new Promise(r=>ws.on('open',r));
let id=0;const pending=new Map();
ws.on('message',(d)=>{const m=JSON.parse(d.toString()); if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}});
const send=(method,params={})=>new Promise(res=>{const i=++id;pending.set(i,res);ws.send(JSON.stringify({id:i,method,params}));});
await send('Runtime.enable');
const ev=async(e)=>{const r=await send('Runtime.evaluate',{expression:e,returnByValue:true});return r.result?.result?.value;};
for(let i=0;i<120;i++){await sleep(500);const s=await ev(`!!document.querySelector('#home canvas') && !/loading 3d burger/i.test(document.body.innerText)`);if(s)break;}
await ev(`window.scrollTo(0, ${Number(scrollY)}); 'ok'`);
await sleep(1500);
const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
fs.writeFileSync(out,Buffer.from(shot.result.data,'base64'));
console.log('saved',out);
ws.close();chrome.kill('SIGKILL');process.exit(0);
