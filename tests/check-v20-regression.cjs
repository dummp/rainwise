const {makeFixture}=require('./fixture-v20.cjs');
const assert=require('node:assert/strict');
const f=makeFixture(),{run,ctx,saved,elements,listeners}=f;
let checks=0;
function test(name,fn){fn();checks++;console.log('PASS',name)}
// Faithfully models the observed named-property collision: .id is INPUT, attribute is string.
function form(id,values){return {id:{tagName:'INPUT',value:values.id||''},getAttribute(k){return k==='id'?id:null},values}}
async function submit(id,values){let prevented=false,stopped=false;const e={target:form(id,values),preventDefault(){prevented=true},stopImmediatePropagation(){stopped=true}};for(const fn of [...listeners.submit].sort((a,b)=>Number(!!b._capture)-Number(!!a._capture))){await fn(e);if(stopped)break}assert(prevented,'default GET navigation must be prevented');return e}
(async()=>{
run("v3SaveIdentity('user');V14.guideIndex=null;V2.page='feedback';V9.active=false;V2.mode='now'");
const observed=new Date(Date.now()-60000).toISOString();ctx.input={demo:'1',place:'罗湖',type:'交通受限',severity:'一般影响',basis:'本人观察',observed,content:'【虚构演示】仅测试反馈所有者与维护处理流程'};
const fb=await run('v14SaveFeedback(input)');ctx.fbId=fb.id;
test('User-submitted fictional feedback belongs to My observations, not seeded examples',()=>{const html=run('vFeedbackPage()');assert(html.includes('我的反馈 · 1条'));assert(run('v19IsSeed(stored(\'sy-v2-feedback\').find(x=>x.id===fbId))')===false)});
run("v3SaveIdentity('maintainer');V3.page='feedback'");
await submit('v3-handle-form',{id:fb.id,status:'已核验',priority:'普通',conclusion:'属实（核对范围内）',note:'核对虚构测试内容，仅验证保存机制',resolution:'续测回复内容，保留原始中文',evidence:'https://www.sz.gov.cn/'});
test('Feedback form with INPUT-valued .id saves, retains identity and revision',()=>{assert.equal(run('V3.role'),'maintainer');assert.equal(run('stored(\'sy-v2-feedback\').find(x=>x.id===fbId).resolution'),'续测回复内容，保留原始中文');assert.equal(run('stored(\'sy-v2-feedback\').find(x=>x.id===fbId).revision'),1)});
run("v3SaveIdentity('user')");const material=run("v18CreateMaterial({feedbackId:fbId,purpose:'测试材料闭环',sections:'原始反馈、来源与核验进度'})");ctx.materialId=material.id;
run("v3SaveIdentity('maintainer');V3.page='materials'");await submit('v18-material-review',{id:material.id,action:'approve',note:'反馈字段与来源完整，仅用于演示验收'});
test('Clobbered material review persists approval and enables download',()=>{assert.equal(run('v18Materials().find(x=>x.id===materialId).status'),'已审核，可导出');run('v18MaterialDetail(materialId)');assert(elements['#source-dialog'].innerHTML.includes('下载材料'))});
run("v3SaveIdentity('user')");ctx.newTask=run("v14CreateTask({title:'虚构审核任务',place:'罗湖',detail:'室内整理公开公告，交付原文链接与发布时间清单',category:'其他',duration:20,reward:0,rewardType:'无偿互助',difficulty:'简单'})");
run("v3SaveIdentity('maintainer');V3.page='tasks'");await submit('v18-task-review',{id:ctx.newTask.id,action:'approve',note:'任务范围与交付标准明确，只验证演示审核'});
test('Task audit with named id field is persisted without resetting role',()=>{assert.equal(run('v7Rows().find(x=>x.id===newTask.id).status'),'待接单');assert.equal(run('V3.role'),'maintainer')});
run("v3SaveIdentity('user')");const software=await run("v14SaveSoftware({title:'软件保存测试',kind:'功能故障',module:'软件维护',detail:'【演示】核验结论这个用户词语不应被翻译替换',steps:'打开维护页面保存回复',expected:'保留身份',actual:'检查处理结果'})");ctx.softwareId=software.id;
run("v3SaveIdentity('maintainer');V3.page='software'");await submit('v15-software-handle',{id:software.id,status:'处理中',reply:'【续测演示】原文回复已经保存'});
test('Software reply with clobbered form ID reaches user and survives reload',()=>{const reloaded=makeFixture({...saved});assert.equal(reloaded.run('V3.role'),'maintainer');assert.equal(reloaded.run('stored(\'sy-v14-software-feedback\').find(x=>x.id===\''+software.id+'\').reply'),'【续测演示】原文回复已经保存');run("v3SaveIdentity('user');v14SoftwareDetail(softwareId)");assert(elements['#source-dialog'].innerHTML.includes('【续测演示】原文回复已经保存'));assert(elements['#source-dialog'].innerHTML.includes('data-original'))});
run("v3SaveIdentity('maintainer');V3.page='software'");await submit('v15-software-handle',{id:software.id,status:'已解决',reply:'【续测演示】第二次回复保留第一条'});
test('Two software submissions create exactly two history items, with no duplicate legacy handler',()=>{const r=run("stored('sy-v14-software-feedback').find(x=>x.id===softwareId)");assert.equal(r.history.length,2);assert.equal(r.history[0].reply,'【续测演示】原文回复已经保存');assert.equal(r.history[1].reply,'【续测演示】第二次回复保留第一条');});run("v3SaveIdentity('user')");
ctx.work=run("v7Rows().find(x=>x.status==='待接单'&&!v7Owner(x))");run("v7SaveAction(work.id,'accept')");await submit('v14-complete-form',{id:ctx.work.id,summary:'【演示】已经完成清单整理',deliverable:'清单包含公告标题、地点、发布时间与原文链接',completedAt:new Date().toISOString(),actualMinutes:'15',link:'https://www.sz.gov.cn/',issue:'仅演示，非真实任务'});
test('Task completion with clobbered ID enters pending confirmation',()=>assert.equal(run('v7Rows().find(x=>x.id===work.id).status'),'待确认完成'));
run("v7SaveAction(work.id,'demo-confirm')");await submit('v7-review-form',{id:ctx.work.id,rating:'5',text:'【演示】原始来源完整，任务流程清楚'});
test('Completion confirmation and rating finish the previously blocked demo lifecycle',()=>{assert.equal(run('v7Rows().find(x=>x.id===work.id).status'),'已完成');assert(run('v7Reviews().some(r=>r.taskId===work.id&&r.from===V7.uid)'))});
run("v14Mode('history');V2.page='events';v19SetPerspective('full')");test('Full review synchronizes both perspective controls',()=>{assert.equal(run('V10.view'),'rebuild');assert.equal(run('V9.perspective'),'full');assert(run('v14SceneBar()').includes('事后复盘'));assert(run('vEventsPage()').includes('27 条'))});
run("v19SetPerspective('asof')");test('As-of perspective is a single shared state',()=>{assert.equal(run('V10.view'),'asof');assert.equal(run('V9.perspective'),'asof')});
run("v14Mode('now');v3SaveIdentity('user');V14.guideIndex=null");
ctx.departure=new Date(Date.now()+60000).toISOString();ctx.window=run('v18RainWindow(departure)');ctx.rain={hourly_units:{precipitation:'mm'},hourly:{time:ctx.window.times}};for(let i=0;i<20;i++)ctx.rain.hourly['precipitation_member'+i]=[20,20,20];
run("V2.weather={place:'罗湖',current:{time:'2026-10-14T09:00',temperature_2m:24,precipitation:0},hourly:{time:['2026-10-14T09:00'],precipitation:[0]},fetchedAt:new Date().toISOString()};V2.plans=[{id:'saved-query',journeyId:'trip-v19',snapshotVersion:19,queryWeather:v19Clone(V2.weather),origin:'罗湖',destination:'深圳人民医院',vias:[],transport:'步行',mode:'now',at:null,planned:departure,created:new Date().toISOString(),coords:[],duration:3000,label:'步行参考',leg:'outbound'}];V2.focus='saved-query';V2.selected=['saved-query'];save('sy-v2-history',V2.plans);const point=v18RainLocation(V2.plans[0]);V18RAIN.cache.set(v18RainKey(point),{data:rain,fetched:new Date().toISOString()});v19CaptureJourneys()");
test('Departure hour is included and retained even after departure has passed',()=>{assert(ctx.window.start<=Date.parse(ctx.departure));assert(ctx.window.end>ctx.window.start);assert.equal(run('v18RainResult(V2.plans[0],new Date(Date.now()+2*3600000)).percent'),100)});
const record=run('stored(\'sy-v2-history\').find(x=>x.id===\'saved-query\')');ctx.record=record;
run("V2.weather=null;V2.at='2023-09-08T10:00';V18RAIN.cache.clear()");const snapshot=run('vSnapshot(record)');ctx.snap=snapshot;
test('Saved export keeps original weather, probability and query time without current cache',()=>{assert.equal(snapshot.weather.place,'罗湖');assert.equal(snapshot.rainProbabilities[0].result.percent,100);assert.equal(snapshot.created,record.created);assert.equal(snapshot.at,null);assert.equal(snapshot.scenario,null);assert.equal(snapshot.plans[0].at,null)});
test('Current report never uses the obsolete historical cutoff',()=>{const parts=run('vExportParts(snap,{journey:true,plans:true,weather:true})');assert(!JSON.stringify(parts).includes('2023-09-08 10:00'));assert(JSON.stringify(parts).includes('100.0%'))});
test('English help searches translated title and content',()=>assert(run("v19HelpMatches(HELP14[3],'map')")));
test('Date text has exactly one time zone and no ISO T separator',()=>{const text=run("dateText('2026-10-14T09:00:00+08:00')");assert.equal((text.match(/北京时间/g)||[]).length,1);assert(!text.includes('T'))});
run("V14.taskTab='hall'");test('Task hall no longer duplicates giving projects',()=>{assert(!run('v5Community()').includes('v16givingcard'));run("V14.taskTab='giving'");assert.equal((run('v5Community()').match(/class=\"v16givingcard\"/g)||[]).length,3)});
run("V14.taskTab='mine';V14.guideIndex=10;V2.page='community';vRender()");test('Inline guide follows task subpages',()=>assert.equal(run('V14.guideIndex'),12));
run("V3.role='maintainer';V19.taskReviewFilter='审核中'");test('Task review defaults to actionable pending work',()=>{const html=run('v14TaskReview()');assert(!html.includes('接受任务'));assert(html.includes('任务状态'))});
run("V3.role='user';V2.page='feedback';V5.profile.language='English';v14SoftwareDetail(softwareId)");test('Software title and user prose are protected from interface translation',()=>{const html=elements['#source-dialog'].innerHTML;assert(html.includes('<h3 data-original>'));assert(html.includes('核验结论这个用户词语'));assert(html.includes('<p data-original'))});
test('Export uses saved endpoints and retains all explicitly selected comparisons',()=>{run("V2.plans=[record,{...record,id:'second-plan',journeyId:'other-journey'}];V2.selected=['saved-query','second-plan'];V2.focus='saved-query';V2.origin='输入已编辑';V2.destination='未查询的新地点'");const s=run('vSnapshot()');assert.equal(s.plans.length,2);assert.equal(s.origin,'罗湖');assert.equal(s.destination,'深圳人民医院')});
test('Direct legacy perspective assignments cannot split the two controls',()=>{run("V9.perspective='full'");assert.equal(run('V10.view'),'rebuild');run("V10.view='asof'");assert.equal(run('V9.perspective'),'asof')});
console.log('CHECKS',checks,'V19 named form-property collision, persistence/reload, blocked task lifecycle, immutable weather/probability snapshots and UX regressions. No real-browser visual/file-rendering verification.');
})().catch(e=>{console.error(e);process.exitCode=1});
