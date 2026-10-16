const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f,c){f._capture=c===true;(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js','v9.js','reference-network.js','v10.js','v11.js','export-map-data.js','v12.js','event-regions.js','v13.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

async function dispatch(group,action){let stopped=false;const b={dataset:{[group]:action}};const ev={target:{closest:s=>s==='[data-'+group+']'?b:null},preventDefault(){},stopImmediatePropagation(){stopped=true}};for(const fn of [...listeners.click].sort((a,b)=>Number(!!b._capture)-Number(!!a._capture))){await fn(ev);if(stopped)break;}}
(async()=>{
test('First arrival automatically opens welcome with a persistent existing guide entry',()=>{assert(elements['#source-dialog'].open);assert(elements['#source-dialog'].innerHTML.includes('首次进入导览'));run('v9Pick()');assert(elements['#source-dialog'].innerHTML.includes('选择历史情景'));});
test('Weather wording has no ambiguous mostly-sunny translation',()=>{assert.equal(run('v12WeatherName(1)'),'以晴为主');});
await dispatch('v13','welcome-start');
test('Welcome starts the hospital guide and remembers completion of entry',()=>{assert(run("stored('sy-v13-onboarding').seen"));assert(run('V9.active'));assert.equal(run('V9.scene'),'hospital');assert.equal(run('V9.step'),0);assert.equal(run('V9STEPS.length'),12);});
test('Guide has actions and expected outcomes for all twelve steps',()=>{assert(run('V9STEPS.every(s=>s.steps.length>=3&&s.expected.length>0)'));assert(run('v9Tour()').includes('这一步应看到'));});
for(let i=0;i<8;i++)await dispatch('v9','next');assert.equal(run('V9.step'),8);assert.equal(run('V3.role'),'maintainer');assert.equal(run('V3.page'),'workspace');await dispatch('v9','next');assert.equal(run('V9.step'),9);for(let i=0;i<3;i++)await dispatch('v9','next');assert.equal(run('V9.step'),null);test('Guide advances beyond seven steps switches roles and finishes at twelve',()=>assert.equal(run('V9.step'),null));
run("V5.place='老街'");
test('Station service impact is consistent while water status remains unknown',()=>{const h=run('v5PlaceDetail()');assert(h.includes('地铁服务受限'));assert(h.includes('地铁运营影响'));assert(h.includes('暂无对应的现场观测数据'));assert(!h.includes('坐标未匹配'));assert.equal(run("v6Risk({name:'老街'}).text"),run("v13Service('老街').name"));assert.equal(run("v5Risk({origin:'老街',destination:'老街',vias:[]})"),'地铁服务受限');});
run("V2.mode='now'");
test('No-operation evidence never asserts normal service',()=>{const h=run("v13Service('老街').service");assert(h.includes('没有该地点对应的停运或恢复公告'));assert(!h.includes('正常运营'));});run("V2.mode='history'");
test('Examples populate feedback progress and task states with explicit fiction and sources',()=>{const fb=run("stored('sy-v2-feedback').filter(f=>f.id.startsWith('v13-'))"),ts=run("v7Rows().filter(t=>t.id.startsWith('v13-'))");assert.equal(fb.length,3);assert.equal(ts.length,6);assert(fb.every(f=>f.content.includes('根据当时情况编写')&&f.source_url));assert(ts.every(t=>t.detail.includes('根据当时情况编写')&&t.source_url));assert(ts.some(t=>t.status==='审核中'));assert(ts.some(t=>t.status==='已完成'));assert(ts.some(t=>t.source==='official'));assert.equal(run('v7Reputation(V7.uid).average'),'5.0');assert.equal(run("v9StoreBase('sy-v2-feedback').length"),0);});
test('Institution-format sample does not claim a real official commission',()=>{assert(run("v7TaskCard(v7Rows().find(t=>t.source==='official'))").includes('机构任务格式示例 · 虚构演示'));});
run("v9SetTime('2023-09-08T09:27')");
test('Historical samples and seeded replies cannot leak before their available time',()=>{assert.equal(run("stored('sy-v2-feedback').length"),0);assert.equal(run('v7Rows().length'),0);assert.equal(run('v7Reviews().length'),0);});
run("v9SetTime('2023-09-08T09:30');v13Seed();v13Seed()");
test('Repeated demo initialization does not duplicate examples',()=>assert.equal(run("v7Rows().filter(t=>t.id.startsWith('v13-')).length"),6));
run("V2.page='events';V2.eventTab='past';V5.timeline='SZ-E001'");
test('Event regions distinguish districts and unsupported water-body coordinates',()=>{const loc=run("v13EventLocations(D.events.find(e=>e.record_id==='SZ-E001'))");assert.equal(loc.regions.length,3);assert(loc.missing.includes('珠江口'));assert(loc.missing.includes('深圳湾'));assert.equal(loc.points.length,0);const h=run('vEventsPage()');assert(h.includes('v13-event-map'));assert(h.includes('v13-my-place'));});
test('Region distance reports containment rather than distance to invented flood point',()=>{run("V13.myPoint=vResolve('罗湖');V13.myPlace='罗湖'");const rows=run("v13LocationRows(v13EventLocations(D.events.find(e=>e.record_id==='SZ-E005')))");assert(rows[0].result.includes('在该行政区内'));assert(rows[0].note.includes('不是积水范围'));});
test('Point distances match input coordinates and remain explicitly straight-line',()=>{run("V13.myPoint=vResolve('罗湖')");const rows=run("v13LocationRows(v13EventLocations(D.events.find(e=>e.record_id==='SZ-E007')))");assert(rows.some(r=>r.name.includes('黄贝岭')&&r.result.includes('直线')));});
// A returning browser may have stored a guide step beyond the old seven steps.
const resumedSaved={'sy-v9-session':JSON.stringify({active:true,scene:'hospital',step:10,at:'2023-09-08T09:30'}),'sy-v13-onboarding':JSON.stringify({seen:true})};
const resume=vm.createContext({...ctx,localStorage:{getItem:k=>resumedSaved[k]||null,setItem:(k,v)=>resumedSaved[k]=v},window:{scrollTo(){},addEventListener(){}}});
for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js','v9.js','reference-network.js','v10.js','v11.js','export-map-data.js','v12.js','event-regions.js','v13.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),resume);
test('A returning browser resumes expanded guide without crashing earlier layers',()=>{assert.equal(vm.runInContext('V9.step',resume),10);assert.equal(vm.runInContext('V2.page',resume),'community');assert(vm.runInContext('v9Tour()',resume).includes('双方评价'));});
console.log('CHECKS',checks,'V13 onboarding state geographic context and fictional-sample checks; not browser QA.');
})().catch(e=>{console.error(e);process.exitCode=1});
