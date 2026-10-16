const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}
(async()=>{
test('Entry has exactly user and maintainer guest options',()=>{assert(elements['#app'].innerHTML.includes('用户'));assert(elements['#app'].innerHTML.includes('维护人员'));assert.equal((elements['#app'].innerHTML.match(/class="rolechoice/g)||[]).length,2);assert(!elements['#app'].innerHTML.includes('type="password"'))});
await click('enter');test('User guest receives existing app without registration',()=>{assert.equal(run('V3.role'),'user');assert(elements['#app'].innerHTML.includes('行程选择'));});
run("save('sy-v2-feedback',[{id:'record-one',place:'黄贝岭',content:'观察到道路积水线索',severity:'疑似紧急危险',type:'现场情况',basis:'本人观察',observed:'2026-10-12T09:00',submitted:'2026-10-12T09:01',status:'待核验'}])");
await click('switch');await click('choose','maintainer');await click('enter');
test('Maintenance guest has separate workbench',()=>{assert.equal(run('V3.role'),'maintainer');assert(elements['#app'].innerHTML.includes('维护总览'));assert(elements['#app'].innerHTML.includes('观察到道路积水线索'))});
test('Urgent queue derived from actual local feedback',()=>{assert.equal(run('v3Feedback().length'),1);assert(run('v3Urgent(v3Feedback()[0])'))});
for(const page of ['workspace','feedback','hazards','logs']){await click('page',page);test('Maintenance '+page+' renders',()=>assert(elements['#app'].innerHTML.length>1000))}
await click('handle','record-one');test('Handling opens original feedback and status form',()=>{assert(elements['#source-dialog'].innerHTML.includes('v3-handle-form'));assert(elements['#source-dialog'].innerHTML.includes('观察到道路积水线索'))});
submit('v3-handle-form',{id:'record-one',status:'核验中',priority:'加急',note:'已安排核对现场资料，仍待确认',evidence:'',resolution:'等待复核'});
test('Handler persists status, note and timestamp',()=>{const f=JSON.parse(saved['sy-v2-feedback'])[0];assert.equal(f.status,'核验中');assert(f.handled_at);assert.equal(f.priority,'加急')});
test('Actual operation written to local log',()=>assert.equal(JSON.parse(saved['sy-v3-logs']).length,1));
submit('v3-handle-form',{id:'record-one',status:'已核验',priority:'普通',note:'',evidence:'',resolution:''});test('Cannot claim verification without handling note',()=>assert.equal(JSON.parse(saved['sy-v2-feedback'])[0].status,'核验中'));
submit('v3-handle-form',{id:'record-one',status:'已核验',priority:'普通',note:'检查记录',evidence:'javascript:alert(1)',resolution:''});test('Unsafe evidence protocol rejected',()=>assert.equal(JSON.parse(saved['sy-v2-feedback'])[0].status,'核验中'));
await click('switch');await click('choose','user');await click('enter');run("V2.page='feedback';vRender()");
test('User sees same feedback updated by maintenance side',()=>{assert(elements['#app'].innerHTML.includes('核验中'));assert(elements['#app'].innerHTML.includes('已安排核对现场资料'));});
submit('v3-handle-form',{id:'record-one',status:'已关闭',priority:'普通',note:'不能在用户界面处理',evidence:'',resolution:''});test('User experience cannot invoke maintenance handler',()=>assert.equal(JSON.parse(saved['sy-v2-feedback'])[0].status,'核验中'));
await click('switch');await click('choose','maintainer');await click('enter');
submit('v3-handle-form',{id:'record-one',status:'已关闭',priority:'普通',note:'本地测试完成，关闭处理记录',evidence:'',resolution:'复核结束'});
test('Closing record removes it from active matching',()=>{assert.equal(JSON.parse(saved['sy-v2-feedback'])[0].status,'已关闭');assert.equal(run('vFeedback().length'),0)});
submit('v3-hazard-form',{place:'测试地点',source:'https://example.test/evidence',content:'维护草稿，尚未核验'});
test('Supplemental hazard stored separately, original official data unchanged',()=>{assert.equal(JSON.parse(saved['sy-v3-hazards']).length,1);assert.equal(run('D.risks.length'),40)});
test('No invented official submission or cloud sharing status',()=>{run("V3.page='workspace';vRender()");assert(elements['#app'].innerHTML.includes('未获得回执'));assert(elements['#app'].innerHTML.includes('跨设备'))});
console.log('CHECKS',checks,'Guest identities are local experience roles, not server authentication. Browser visual QA not performed.');
})().catch(e=>{console.error(e);process.exitCode=1});
