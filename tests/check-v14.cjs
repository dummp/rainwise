const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f,c){f._capture=c===true;(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js','v9.js','reference-network.js','v10.js','foot-route-cache.js','walking-route.js','v11.js','export-map-data.js','v12.js','event-regions.js','v13.js','community-giving.js','reminders.js','experience.js','v14.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

async function dispatch(group,action,value){let stopped=false;const b={dataset:{[group]:action,value}};const e={target:{closest:s=>s==='[data-'+group+']'||s.includes('[data-'+group+'="'+action+'"]')?b:null},preventDefault(){},stopImmediatePropagation(){stopped=true}};for(const fn of [...listeners.click].sort((a,b)=>Number(!!b._capture)-Number(!!a._capture))){await fn(e);if(stopped)break}}
(async()=>{
test('Intro offers present and historical scenes without forcing past hospital tour',()=>{const h=elements['#source-dialog'].innerHTML;assert(h.includes('welcome-now'));assert(h.includes('welcome-history'));assert(!h.includes('0 / 12'));});
await dispatch('v14','welcome-now');
test('Current scene retains actual clock and opens a short module-purpose guide',()=>{assert.equal(run('V9.active'),false);assert.equal(run('V2.mode'),'now');assert(run('v14SceneBar()').includes('现在时刻'));assert(run('v14GuidePanel()').includes('了解模块'));assert(!run('v14GuidePanel()').includes('这一步应看到'));});
await dispatch('v14','mode-history');
test('Scene switch preserves the guide while exposing historic clock and examples',()=>{assert(run('V9.active'));assert.equal(run('V2.mode'),'history');assert(run('v14SceneBar()').includes('历史模拟时刻'));assert.equal(run('V14.guideIndex'),0);});
run('v9Pick()');
test('Scene selector has an explanation of both modes and the reusable guide',()=>{const h=elements['#source-dialog'].innerHTML;assert(h.includes('现在：'));assert(h.includes('历史：'));assert(h.includes('guide-start'));});
test('Disaster samples use form-compatible fields and links visible in my records',()=>{const rs=run("stored('sy-v2-feedback').filter(f=>f.id.startsWith('v13-'))");assert(rs.every(f=>f.place&&f.observed&&f.source_url&&f.severity==='一般影响'));const h=run('vFeedbackPage()');assert(h.includes('反馈地点'));assert(h.includes('观测时间'));assert(h.includes('打开反馈来源原文'));assert(h.includes('当前阶段'));assert(h.includes('查看时间线与回复'));});
ctx.feedbackInput={type:'交通受限',place:'罗湖',observed:'2023-09-08T09:30',basis:'公开新闻／公告（非本人观测）',severity:'一般影响',content:'测试核对公告内容和运营状态',source_url:'https://www.sz.gov.cn/'};
const record=await run('v14SaveFeedback(feedbackInput)');ctx.fid=record.id;
test('New disaster feedback is saved with identity and timeline and no fake processing stage',()=>{const f=run("stored('sy-v2-feedback').find(x=>x.id===fid)");assert.equal(f.status,'待核验');assert(run('v3FeedbackProgress(stored("sy-v2-feedback").find(x=>x.id===fid))').includes('等待维护人员核验'));assert.equal(run("v9StoreBase('sy-v2-feedback').filter(f=>!f.demo).length"),0);});
await assert.rejects(()=>run("v14SaveFeedback({...feedbackInput,observed:'2023-09-08T11:00'})"));
test('Future observation and unsafe source URL are rejected',()=>{assert.throws(()=>run("v14FeedbackValidate({...feedbackInput,source_url:'javascript:alert(1)'})"));});
run("V7.location='东门街道'");
test('Region without numeric coordinates never returns NaN distance',()=>{assert.equal(run("v7Distance({place:'罗湖'})"),'距离未知');});
run("V14.taskTab='hall'");
test('Tasks have one coherent hall publish and my-task navigation',()=>{const h=run('v5Community()');assert(h.includes('任务大厅'));assert(h.includes('发布任务'));assert(h.includes('我的任务'));assert(!h.includes('03 · 我的任务记录'));});
test('Cannot accept own task or the same task twice',()=>{assert.equal(run("v7SaveAction('v13-task-2','accept')"),false);assert(run("v7SaveAction('v13-task-0','accept')"));assert.equal(run("v7SaveAction('v13-task-0','accept')"),false);});
ctx.completionInput={id:'v13-task-0',summary:'测试完成了公开运营公告的逐条核对',deliverable:'整理了线路、区段和原始来源链接',completedAt:'2023-09-08T09:30',actualMinutes:'10',link:'https://www.sz.gov.cn/',issue:'演示材料，不构成实际运营确认'};
await run('v14SubmitCompletion(completionInput)');
test('Structured completion enters confirmation stage with materials and prevents repeat submission',()=>{const t=run("v7Rows().find(x=>x.id==='v13-task-0')");assert.equal(t.status,'待确认完成');assert(t.completionPacket.deliverable.includes('线路'));assert(run('v14CompletionSummary(v7Rows().find(x=>x.id==="v13-task-0"))').includes('交付内容'));});
await assert.rejects(()=>run('v14SubmitCompletion(completionInput)'));
test('Worker cannot confirm as owner but can use explicitly labelled demo confirmation',()=>{assert.equal(run("v7SaveAction('v13-task-0','confirm')"),false);assert(run("v7SaveAction('v13-task-0','demo-confirm')"));assert.equal(run("v7Rows().find(x=>x.id==='v13-task-0').status"),'已完成');});
test('Reviews require completion and cannot be repeated',()=>{assert(run("v7SaveReview('v13-task-0',5,'演示材料保留了来源')"));assert.equal(run("v7SaveReview('v13-task-0',5,'重复评价')"),false);assert.equal(run("v7SaveReview('v13-task-1',5,'未完成')"),false);});
run("V14.taskTab='mine';V7.filter='all'");
test('Withdrawal reopens availability without losing the participant record',()=>{assert(run("v7SaveAction('v13-task-1','accept')"));assert(run("v7SaveAction('v13-task-1','withdraw')"));const t=run("v7Rows().find(x=>x.id==='v13-task-1')");assert.equal(t.status,'待接单');assert(!t.worker);assert(run("v7Mine(v7Rows().find(x=>x.id==='v13-task-1'))"));});
ctx.taskInput={title:'测试材料校对',place:'罗湖',detail:'请校对公开材料并保留原始来源与区段',category:'其他',duration:'15',rewardType:'无偿互助',reward:'0',difficulty:'简单'};
const own=run('v14CreateTask(taskInput)');ctx.ownId=own.id;
run("V3.role='maintainer'");assert(run("v7SaveAction(ownId,'approve')"));run("V3.role='user';var originalUid=V7.uid;V7.uid='test-worker'");assert(run("v7SaveAction(ownId,'accept')"));
ctx.workerCompletion={...ctx.completionInput,id:own.id};await run('v14SubmitCompletion(workerCompletion)');run('V7.uid=originalUid');
test('Publisher can return with a reason but cannot return without one',()=>{assert.equal(run("v7SaveAction(ownId,'return-work','')"),false);assert(run("v7SaveAction(ownId,'return-work','请补充材料中的原始公告链接')"));assert.equal(run('v7Rows().find(x=>x.id===ownId).status'),'已接单');assert(!run('v7Rows().find(x=>x.id===ownId).completionPacket'));});
run("v9SetTime('2023-09-08T09:29')");
test('Earlier historical view cannot reveal future completion materials or claim later worker participation',()=>{const t=run("v7Rows().find(x=>x.id==='v13-task-0')");assert.equal(t.status,'待接单');assert(!t.completionPacket);assert(!run("v7Mine(v7Rows().find(x=>x.id==='v13-task-0'))"));assert.equal(run("v7SaveAction('v13-task-0','accept')"),false);});
run("v9SetTime('2023-09-08T09:30')");
test('Invalid deadline is rejected rather than allowing indefinite acceptance',()=>assert.throws(()=>run("v14CreateTask({...taskInput,deadline:'bad-date'})")));
ctx.softwareInput={kind:'功能故障',module:'互助与任务',title:'测试按钮行为',detail:'按钮点击后没有显示预期的界面内容',steps:'进入任务页，点击查看材料',expected:'显示材料',actual:'没有显示'};
const report=await run('v14SaveSoftware(softwareInput)');ctx.softwareId=report.id;
test('Software feedback is independent of disaster records with reproduction steps and no fake support receipt',()=>{assert.equal(run("stored('sy-v14-software-feedback').length"),1);assert(!run("stored('sy-v2-feedback').some(f=>f.id===softwareId)"));assert.equal(run("stored('sy-v14-software-feedback')[0].diagnostics"),null);assert.equal(run("stored('sy-v14-software-feedback')[0].status"),'已在本浏览器保存');const h=run("V14.helpTab='send';vHelpPage()");assert(h.includes('如何重现'));assert(h.includes('截图'));});
test('Account settings order puts preferences after profile and help has its own page',()=>{const h=run('vAbout()');assert(h.indexOf('阅读与提醒偏好')<h.indexOf('我的快捷地址'));assert(h.includes('data-v14="help"'));assert(run("V2NAV.some(x=>x[0]==='help')"));});
run("V14.taskTab='publish';V14.taskDraft={}");elements['#v7-task-form']={values:{...ctx.taskInput,title:'未提交的测试草稿'}};run('v14Draft()');delete elements['#v7-task-form'];
test('Task drafts survive tab renders instead of losing entered fields',()=>{run("V14.taskTab='mine';vRender();V14.taskTab='publish'");assert(run('v7TaskForm()').includes('未提交的测试草稿'));});
run("V14.helpTab='send';V2.page='help';V3.role='user';vRender()");
test('Dedicated help route is actually rendered by the app router',()=>assert(elements['#app'].innerHTML.includes('v14-software-form')));
run("v7SaveAction('v13-task-1','accept');V7.uid='another-worker';v7SaveAction('v13-task-1','complete','由另一个接单者完成的测试说明');v7SaveAction('v13-task-1','demo-confirm');V7.uid=originalUid");
test('A previous worker cannot review a job completed by a different worker',()=>assert.equal(run("v7SaveReview('v13-task-1',5,'退出后不应允许评价')"),false));
// Update a real submitted local report through the retained maintenance form.
run("v9SetTime('2023-09-08T09:31');V3.role='maintainer'");const handle={id:'v3-handle-form',values:{id:ctx.fid,status:'已核验',conclusion:'部分属实',priority:'普通',note:'测试核对了原始公开公告，具体现场状态仍未知',evidence:'https://www.sz.gov.cn/',resolution:'已回复用户核验范围'}};
for(const fn of listeners.submit){await fn({preventDefault(){},stopImmediatePropagation(){},target:handle});}
test('Maintenance reply produces a new timeline event with its evidence link',()=>{const f=run("stored('sy-v2-feedback').find(x=>x.id===fid)");assert.equal(f.status,'已核验');assert(run('v3FeedbackProgress(stored("sy-v2-feedback").find(x=>x.id===fid))').includes('维护核验依据'));});
run("v9SetTime('2023-09-08T09:30')");
test('Rewinding history hides the later maintenance reply but keeps original submission',()=>{const f=run("stored('sy-v2-feedback').find(x=>x.id===fid)");assert.equal(f.status,'待核验');assert(!f.handling_note);});
run("V3.role='user';V14.taskTab='hall'");await dispatch('v7','accept','v13-task-5');
test('Taking a task routes directly to my accepted tasks with completion action',()=>{assert.equal(run('V14.taskTab'),'mine');assert.equal(run('V7.filter'),'accepted');assert(run('v5Community()').includes('提交完成材料'));});
console.log('CHECKS',checks,'V14 guide task-state report-schema and help isolation checks; no browser visual QA.');
})().catch(e=>{console.error(e);process.exitCode=1});
