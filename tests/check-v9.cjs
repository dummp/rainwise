const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js','v9.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

(async()=>{
test('Normal records are isolated from scenario records',()=>{saveLocal();function saveLocal(){run("save('sy-v2-feedback',[{id:'normal',submitted:'2026-10-12T00:00:00Z',place:'罗湖',content:'普通记录'}]);v9Start('commute',true)")}assert.equal(run("stored('sy-v2-feedback').length"),0);assert.equal(JSON.parse(saved['sy-v2-feedback'])[0].id,'normal')});
test('Simulation uses Beijing business time without changing real clock',()=>{assert.equal(run('businessNow().toISOString()'),'2023-09-08T01:30:00.000Z');assert(run("dateText('2023-09-08T01:30:00.000Z')").includes('09:30'));assert(new Date().getFullYear()>2023)});
test('Before publication red notice and commuter stops remain hidden',()=>{run("v9SetTime('2023-09-08T09:27')");assert(!run("vEvents().some(e=>e.record_id==='SZ-E006')"));assert(!run('v8Weather()').includes('09:28公告：红色预警仍生效'))});
test('Earlier timestamped report is usable and rain scope stays clear',()=>{assert(run("vEvents().some(e=>e.record_id==='SZ-E023')"));assert(run('v8Weather()').includes('盐田区正坑站'));assert(run('v8Weather()').includes('不是当前时刻雨强'))});
run("v9SetTime('2023-09-08T09:30')");
test('All official commuter stop sections are available at 09:30',()=>{for(const id of ['SZ-E006','SZ-E007','SZ-E013','SZ-E014','SZ-E015'])assert(run(`vEvents().some(e=>e.record_id==='${id}')`))});
test('Future rainfall and hindsight warnings are not visible',()=>{assert(!run("vEvents().some(e=>e.record_id==='SZ-E025')"));assert(!run("vEvents().some(e=>e.record_id==='SZ-E016')"))});
test('History has distinct as-of and full views',()=>{run("V2.eventTab='past';V9.perspective='asof'");assert(!run('vEventsPage()').includes('事后降雨背景曲线'));run("V9.perspective='full'");assert(run('vEventsPage()').includes('事后降雨背景曲线'));run("V9.perspective='asof'")});
test('Date-only charity record cannot appear early',()=>{assert(!run('v9Charity(false)').includes('99 人'));assert(run('v9Charity(true)').includes('99 人'));assert(run('v9Charity(true)').includes('不收款'))});
let apiCalls=0;ctx.fetch=async()=>{apiCalls++;throw Error('unexpected network')};await run('vFetchWeather()');test('Weather query in simulation performs no current API fetch',()=>assert.equal(apiCalls,0));
run("v9SeedFeedback();V2.page='feedback'");const f=run("stored('sy-v2-feedback')[0]");
test('Seeded news record is explicit and timestamped in simulation',()=>{assert(f.test_record);assert(f.content.includes('非用户实测'));assert.equal(f.submitted,'2023-09-08T01:30:00.000Z')});
run("v9SetTime('2023-09-08T09:40');V3.role='maintainer'");submit('v3-handle-form',{id:f.id,status:'已核验',conclusion:'部分属实',priority:'普通',note:'测试复核，不作为官方确认',evidence:'https://www.sz.gov.cn/szzt2010/zdlyzl/scaq/yf/content/post_10824929.html',resolution:'需要现场核验'});
test('Maintenance reply uses business time',()=>{assert.equal(run("stored('sy-v2-feedback')[0].handled_at"),'2023-09-08T01:40:00.000Z')});
run("v9SetTime('2023-09-08T09:30')");
test('Rewinding hides future reply but retains original pending record',()=>{const x=run("stored('sy-v2-feedback')[0]");assert.equal(x.status,'待核验');assert.equal(x.handling_note,undefined)});
run("v9SetTime('2023-09-08T09:27')");
test('Rewinding before submission hides simulated feedback',()=>assert.equal(run("stored('sy-v2-feedback').length"),0));
run("v9SetTime('2023-09-08T09:30');V3.role='user';v9SeedTask()");const task=run('v7Rows()[0]');
test('Private task can be accepted under business clock',()=>{assert(task.demo&&task.source==='private');assert(run(`v7SaveAction('${task.id}','accept')`));assert(run(`v7SaveAction('${task.id}','complete','已整理公告链接')`));assert(run(`v7SaveAction('${task.id}','demo-confirm')`));assert(run(`v7SaveReview('${task.id}',5,'仅测试流程')`))});

run("V2.transport='公共交通';V2.origin='罗湖';V2.destination='黄贝岭';V2.vias=[]");await run('vAddPlan()');
const timedTask={...task,id:'timed-task',status:'待接单',worker:null,workerName:null,deadline:'2023-09-08T10:00',created:'2023-09-08T01:30:00Z',updated:'2023-09-08T01:30:00Z',history:[]};ctx.timedTask=timedTask;run("save('sy-v7-tasks',[...v7Rows(),timedTask])");
test('Deadline uses 2023 simulated time rather than real date',()=>assert(run("v7SaveAction('timed-task','accept')")));
run("v9SetTime('2023-09-08T09:27')");
test('Task and review created later are absent when rewinding',()=>{assert.equal(run('v7Rows().length'),0);assert.equal(run('v7Reviews().length'),0)});
run("v9SetTime('2023-09-08T09:30');V2.transport='公共交通';V2.origin='罗湖';V2.destination='黄贝岭';V2.vias=[]");await run('vAddPlan()');
test('Round trip departure uses simulated historical time',()=>{assert.equal(run('v5RoundData(vFocus()).depart'),'2023-09-08T09:30')});
test('Historical plan snapshot carries scenario and no invented route',()=>{const p=run('V2.plans[0]');assert(p.scenario.test);assert.equal(p.duration,null);assert.equal(p.geometry,null)});
test('Export enforces original snapshot cutoff and labels test scope',()=>{const s=run('vSnapshot()');s.eventRefs.push('SZ-E016');ctx.exportTest=s;const parts=run('vExportParts(exportTest,{weather:"on",official:"on",feedback:"on"})');assert.equal(parts[0].title,'历史测试范围');assert(!parts.find(p=>p.title==='官方隐患与公告').text.includes('2023-09-15'));assert(!parts.find(p=>p.title==='用户反馈（待核验）').text.includes('已核验'))});
async function click9(a,v){const b={dataset:{v9:a,value:v}};for(const fn of listeners.click)await fn({target:{closest:q=>q==='[data-v9]'?b:null}})}
await click9('request-report',f.id);
test('Reporting application remains local and awaiting review',()=>{assert.equal(run("stored('sy-v9-reports')[0].status"),'待维护审核')});
let application=run("stored('sy-v9-reports')[0]");
await click9('approve-report',application.id);
test('User cannot approve material request',()=>assert.equal(run("stored('sy-v9-reports')[0].status"),'待维护审核'));
run("V3.role='maintainer'");await click9('approve-report',application.id);
test('Maintenance approves only exportability, no official receipt',()=>{assert.equal(run("stored('sy-v9-reports')[0].status"),'已审核，可导出');assert(run('v9Reports()').includes('无受理回执'))});
run("V3.role='user'");submit('v9-pledge',{amount:'10'});
test('Donation interaction stores intention without payment',()=>{assert.equal(run("stored('sy-v9-pledges')[0].status"),'演示意向，未付款')});
test('Guide includes scene, maintenance and no forced payment',()=>{run('V9.step=4');assert(run('v9Tour()').includes('进入维护端'));assert(run('v9Pick()')===undefined);assert(elements['#source-dialog'].innerHTML.includes('就医并返回'))});
test('Other historical event never borrows September case data',()=>{run("V9.active=false;V2.eventId='saola2023'");assert.equal(run('v9TimelineRows(true).length'),0);run("V9.active=true;V2.eventId='sep2023'")});
test('Invalid or out-of-range scenario times rejected',()=>{assert(!run("v9SetTime('2023-09-08T24:99')"));assert(!run("v9SetTime('2026-10-12T09:30')"))});
test('Exit restores normal feedback without mixing tests',()=>{run('v9Exit()');assert.equal(run("stored('sy-v2-feedback')[0].id"),'normal')});
console.log('CHECKS',checks,'Historical semantic integration tests; no browser visual QA.');
})().catch(e=>{console.error(e);process.exitCode=1});
