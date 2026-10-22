import { spawn } from 'child_process';
import WebSocket from 'ws';
const url = process.argv[2];
const port = 9334;
const chrome = spawn('/opt/google/chrome/chrome', [
  '--headless=new','--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-gl=swiftshader',
  '--user-data-dir=/tmp/cdp-diag','--no-first-run','--no-default-browser-check','--disable-background-networking',
  '--hide-scrollbars','--window-size=1440,900',`--remote-debugging-port=${port}`,url
], { stdio: 'ignore' });
const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
let targets;
for (let i=0;i<40;i++){ try{ targets=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if(targets.some(t=>t.type==='page')) break;}catch{} await sleep(300); }
const page = targets.find(t=>t.type==='page');
const ws = new WebSocket(page.webSocketDebuggerUrl,{maxPayload:256*1024*1024});
await new Promise(r=>ws.on('open',r));
let id=0; const pending=new Map();
ws.on('message',(d)=>{const m=JSON.parse(d.toString());
  if(m.method==='Runtime.consoleAPICalled'){ const args=(m.params.args||[]).map(a=>a.value??a.description).join(' '); if(/error|fail|warn/i.test(args)||m.params.type==='error') console.log('CONSOLE',m.params.type,args.slice(0,300)); }
  if(m.method==='Runtime.exceptionThrown'){ console.log('EXC', m.params.exceptionDetails?.exception?.description?.slice(0,500)); }
  if(m.method==='Log.entryAdded'){ const e=m.params.entry; if(e.level==='error') console.log('LOG', e.text.slice(0,300)); }
  if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);} });
const send=(method,params={})=>new Promise(res=>{const i=++id;pending.set(i,res);ws.send(JSON.stringify({id:i,method,params}));});
await send('Runtime.enable'); await send('Log.enable');
for (let t=1; t<=12; t++) {
  await sleep(5000);
  const r = await send('Runtime.evaluate',{expression:`(()=>{
    const c=document.querySelector('#home canvas');
    const gl=c? (c.getContext('webgl2')||c.getContext('webgl')):null;
    return JSON.stringify({t:${t},canvas:!!c,cw:c?.width,ch:c?.height,gl:!!gl,glErr:gl?gl.getError():null,
      loadingText:/loading 3d burger/i.test(document.body.innerText),
      canvasOpacity:c?getComputedStyle(c).opacity:null});
  })()`,returnByValue:true});
  console.log(r.result?.result?.value, r.result?.exceptionDetails?.text||'');
  const s = JSON.parse(r.result?.result?.value||'{}');
  if (s.canvas && !s.loadingText) break;
}
ws.close(); chrome.kill('SIGKILL'); process.exit(0);
