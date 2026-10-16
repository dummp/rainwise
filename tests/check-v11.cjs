const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js','v9.js','reference-network.js','v10.js','v11.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

(async()=>{
run("v9Start('hospital',false,'2023-09-08T09:30')");
test('Return arrangements expand with independent transport and waypoints',()=>{const h=run('v8Form()');assert(h.includes('返程安排'));assert(h.includes('v11-return-transport'));assert(h.includes('v11-return-vias'));assert(h.includes('深圳人民医院'));});
await run('vAddPlan()');
test('Both legs generated and saved without replacing outbound inputs',()=>{assert(run('V2.plans.every(p=>p.scenario?.test)'));assert.equal(run('V2.plans.length'),2);assert.equal(run('V2.origin'),'罗湖');assert.equal(run('V2.destination'),'深圳人民医院');assert.equal(run("V2.plans[0].journeyId===V2.plans[1].journeyId"),true);assert.equal(run('V2.plans[1].leg'),'return');assert.equal(run('V2.plans[1].origin'),'深圳人民医院');assert.equal(run('V2.plans[1].planned'),'2023-09-08T11:30');assert.equal(run("stored('sy-v2-history').filter(p=>p.journeyId===V2.plans[0].journeyId).length"),2);});
test('Stopped metro never has usable arrival or duration for either leg',()=>{for(const p of run('V2.plans')){assert(p.blocked);assert.equal(p.duration,null);assert(p.arrivalText.includes('无法计算'));}});
test('One risk summary has named counts and separately assessed return',()=>{const h=run('v8Summary()');assert(h.includes('返程'));assert(h.includes('防汛指引：'));assert(h.includes('反馈线索：'));assert(h.includes('道路水深和实时交通仍需要对应观测'));assert(!h.includes('v5forecast'));assert(!h.includes('v10assessment'));assert(h.includes('当时官方建议'));});
test('Map selection and permanent labels reflect actual leg input coordinates',()=>{run("V11.leg='return'");assert.equal(run('v11MapPlans().length'),1);const p=run('v11MapPlans()[0]'),m=run('v11Markers(v11MapPlans()[0])');assert.equal(m[0].lat,p.coords[0].lat);assert(m[0].label.includes('返程 · 起点：深圳人民医院'));assert(m.some(x=>x.label.includes('下车')));assert(fs.readFileSync(root+'/dist/v8.js','utf8').includes('permanent:true'));});
test('Reopening a history record restores both legs',()=>{run("vRestore(V2.plans[0])");assert.equal(run('V2.plans.length'),2);assert.equal(run("V11.leg"),'all');});
test('Weather snapshot excludes journey feedback and later source data',()=>{const s=run('v11WeatherSnapshot()');assert.equal(s.scope,'weather');assert.equal(s.plans.length,0);assert(!('origin' in s));assert(s.facts.every(e=>new Date(e.available_at)<=new Date(s.at+':00+08:00')));assert(!s.facts.some(e=>e.record_id==='SZ-E025'));ctx.ws=s;const parts=run('v11WeatherParts(ws,{data:true,warning:true})');assert(parts.every(p=>!p.title.includes('行程')));assert(!parts.some(p=>p.title==='数据表'));});
test('Weather-only dialog offers four content types and no route selection',()=>{run("v10ExportDialog(null,'历史天气')");const h=elements['#source-dialog'].innerHTML;assert(h.includes('v11-weather-export'));assert(h.includes('name="trend"'));assert(!h.includes('name="plans"'));assert(!h.includes('name="feedback"'));});
run("V5.returnAt='';V2.plans=[];V2.selected=[]");await run('vAddPlan()');
test('No false return time inferred from stopped outbound',()=>{const p=run("V2.plans.find(p=>p.leg==='return')");assert(p.unavailable);assert.equal(p.planned,'');assert.equal(p.duration,null);});
run("V5.returnAt='2023-09-08T08:00';V2.plans=[];V2.selected=[]");await run('vAddPlan()');
test('Return earlier than outbound is rejected',()=>{assert.equal(run('V2.plans.length'),0);assert(run('V2.error').includes('晚于'));});
run("v9Exit();V2.departure='immediate';V2.origin='罗湖';V2.destination='黄贝岭';V2.transport='公共交通';V5.round=true;V5.returnAt='';V11.returnTransport='驾车';V2.plans=[];V2.selected=[];V2.focus=null");await run('vAddPlan()');
test('Current immediate departure works and return uses its own mode and endpoints',()=>{assert.equal(run('V2.plans.length'),2);assert.equal(run('V2.plans[0].transport'),'公共交通');assert.equal(run('V2.plans[1].transport'),'驾车');assert.equal(run('V2.plans[1].origin'),'黄贝岭');assert(run('V2.plans[1].planned'));});
run("V5.round=false;V2.origin='未收集的小区';V2.plans=[];V2.selected=[]");await run('vAddPlan()');
test('Unmatched new origin cannot reuse previous geometry',()=>{assert.equal(run('V2.plans.length'),1);assert.equal(run('V2.plans[0].geometry'),null);assert.equal(run('V2.plans[0].coords.length'),0);});
run("v9Start('hospital',false,'2023-09-08T09:30');V2.plans=[];V2.selected=[]");
// Different request invalidates an in-flight provider response.
run("V5.round=false;V2.transport='驾车';V2.origin='罗湖';V2.destination='黄贝岭';V2.loading=false");let resolve;ctx.fetch=()=>new Promise(r=>resolve=r);const pending=run('vAddPlan()');run('V2.requestSeq++;V2.loading=false');resolve({ok:true,json:async()=>({code:'Ok',routes:[{duration:90,distance:900,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]}}]})});await pending;
test('Stale asynchronous response does not append old plans',()=>assert.equal(run('V2.plans.length'),0));
console.log('CHECKS',checks,'V11 journey/report/state checks; browser visual QA unavailable.');
})().catch(e=>{console.error(e);process.exitCode=1});
