const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

test('Weather location is a plain input with no suggestions',()=>{const h=run('vWeather()');assert(h.includes('id="v5-weather-place"'));assert(!h.includes('list="'));assert(!h.includes('<datalist'))});
test('Community has three sections and detailed task form',()=>{const h=run('v5Community()');for(const t of ['01 · 互助区','02 · 信誉与双方评价','03 · 我的任务记录','官方任务','私人任务'])assert(h.includes(t));const form=run('v7TaskForm()');for(const t of ['duration','difficulty','rewardType','place','coordinates'])assert(form.includes('name="'+t+'"'))});
test('Missing coordinates keep distance unknown',()=>{run("V7.location='未知小区'");assert.equal(run("v7Distance({place:'罗湖'})"),'距离未知');run("V7.location='罗湖'");assert(run("v7Distance({place:'黄贝岭'})").includes('直线'))});
run("V3.role='user';V5.profile.name='发布者'");
submit('v7-task-form',{title:'拍摄入口',category:'现场拍照与信息核实',duration:'20',difficulty:'简单',rewardType:'积分',reward:'10',place:'罗湖',coordinates:'',detail:'在安全开放区域观察',deadline:''});
const task=run('v7Rows()[0]'),owner=run('V7.uid');
test('Published task starts in local review and only private source',()=>{assert.equal(task.status,'审核中');assert.equal(task.source,'private')});
test('User cannot approve or accept unreviewed task',()=>{assert(!run(`v7SaveAction('${task.id}','approve')`));assert(!run(`v7SaveAction('${task.id}','accept')`))});
run("V3.role='maintainer'");
test('Maintenance review transitions to awaiting acceptance',()=>{assert(run(`v7SaveAction('${task.id}','approve')`));assert.equal(run('v7Rows()[0].status'),'待接单')});
run("V3.role='user'");
test('Publisher cannot accept own task',()=>assert(!run(`v7SaveAction('${task.id}','accept')`)));
run("V7.uid='second-local-test-person';V5.profile.name='协助者'");
test('Another local identity accepts once',()=>{assert(run(`v7SaveAction('${task.id}','accept')`));assert(!run(`v7SaveAction('${task.id}','accept')`));assert.equal(run('v7Rows()[0].worker'),'second-local-test-person')});
test('Completion requires note and publisher confirmation',()=>{assert(!run(`v7SaveAction('${task.id}','complete','')`));assert(run(`v7SaveAction('${task.id}','complete','已按标准交付')`));assert(!run(`v7SaveAction('${task.id}','confirm')`));assert(!run(`v7SaveReview('${task.id}',5,'满意')`))});
run(`V7.uid='${owner}'`);
test('Publisher confirms actual pending task and reviews once',()=>{assert(run(`v7SaveAction('${task.id}','confirm')`));assert(run(`v7SaveReview('${task.id}',5,'交付清楚')`));assert(!run(`v7SaveReview('${task.id}',5,'重复评价')`))});
run("V7.uid='second-local-test-person'");
test('Worker can independently review other side',()=>{assert(run(`v7SaveReview('${task.id}',4,'沟通清楚')`));assert.equal(run(`v7Reputation('${owner}').average`),'4.0')});
test('Profiles include real local counts and no default credit score',()=>{const h=run('v5Personal()');assert(h.includes('v7profilehero'));assert(h.includes('完成任务'));assert(h.includes('可兑换积分 · 未接入'));assert.equal(run("v7Reputation('new-person').average"),null)});
test('Task history retains transitions and demonstration is explicit',()=>{assert.equal(run('v7Rows()[0].history.length'),5);run('v7Seed()');assert(run('v7Rows().filter(t=>t.demo).length')===2);const h=run('v5Community()');assert(h.includes('官方任务 · 演示'));assert(h.includes('虚构演示身份'))});
console.log('CHECKS',checks,'Local task state machine and profile checks; no browser visual QA.');
