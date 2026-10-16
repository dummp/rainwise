const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js','v9.js','reference-network.js','v10.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

(async()=>{
test('Offline lookup resolves street and hospital without generic geocoding service',()=>{assert(run("vResolve('深圳市罗湖区东门街道')").regionOnly);assert(Number.isFinite(run("vResolve('深圳人民医院')").lat));assert.equal(run("vResolve('未收集的新小区')"),null)});
test('Tracks are actual curved OSM geometry and old network excludes 2025 extension',()=>{assert(run("R10.edges.some(e=>e.geometry.coordinates.length>20)"));assert(!run("R10.edges.some(e=>e.line==='5'&&e.from==='湖贝')"))});
run("V3.role='user';v9Start('commute',false);V2.at='2023-09-08T09:30';V2.transport='公共交通'");await run('vAddPlan()');
test('Metro plan identifies boarding transfer and alighting',()=>{const p=run('V2.plans[0]');assert.equal(p.boarding,'罗湖');assert.equal(p.alighting,'黄贝岭');assert.deepEqual(Array.from(p.segments,g=>g.line),['1','2']);assert(p.segments[0].to==='大剧院');assert(p.geometry.coordinates.length>40)});
test('Closure forbids misleading actual duration or ETA',()=>{const p=run('V2.plans[0]');assert(p.blocked);assert.equal(p.duration,null);assert(p.arrivalText.includes('无法计算'));assert(run('v8Plan(V2.plans[0],0)').includes('下一站方向'))});
test('Point risk and regional impact are separated',()=>{assert.equal(run("v10Assess('罗湖').level"),'red');assert(run('v10DistrictImpact()'));run("V5.place='深圳人民医院'");const h=run('v5PlaceDetail()');assert(h.includes('地点本身'));assert(h.includes('所在区域'));assert(h.includes('查看时刻'));assert(h.includes('入口'))});
test('Hospital naming alias matches original historical risk wording',()=>{assert(run("vRisks({origin:'深圳市人民医院',destination:'深圳市人民医院',vias:[]}).some(r=>r.street==='翠竹街道')"))});
test('Planner current time is readonly while global replay clock remains selectable',()=>{const h=run('vTimeControls()');assert(h.includes('不在行程中修改'));assert(!h.includes('id="v9-clock"'));assert.equal(run('v9Banner()'),'')});
run("V2.origin='东门街道';V2.destination='黄贝岭'");await run('vAddPlan()');test('Unknown street coordinate is rejected rather than substituting false entrance',()=>assert(run('V2.error').includes('不把街道代表点')));
test('Historical reconstruction separately identifies hindsight news',()=>{run("V10.view='asof'");assert.equal(run('v10NewsIntersections().length'),0);run("V10.view='rebuild'");assert(run('v10NewsIntersections().length')>0);assert(run('v5PlaceDetail()').includes('事后'));run("V10.view='asof'")});
run("V5.weatherPlace='东门街道'");let weatherRequests=0;ctx.fetch=async()=>{weatherRequests++;throw Error('unexpected')};await run('vFetchWeather()');
test('Weather mismatch explains coverage and historic mode does not query today',()=>{assert(run('v10WeatherMatch()').includes('区域查询'));assert.equal(weatherRequests,0)});

run("V2.origin='罗湖';V2.destination='黄贝岭';V2.transport='驾车';V2.plans=[];V2.selected=[]");ctx.fetch=async()=>({ok:true,json:async()=>({code:'Ok',routes:[{duration:300,distance:3500,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.115,22.535],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})});await run('vAddPlan()');
test('Historical driving uses current road reference geometry, not straight endpoint connection',()=>{const p=run('V2.plans[0]');assert(p.geometry.coordinates.length===3);assert.equal(p.geometryBasis,'current-reference');assert(p.label.includes('非历史灾时'));assert(run('v8Plan(V2.plans[0],0)').includes('参考5分钟'))});
ctx.fetch=async()=>{throw Error('offline')};run("V2.plans=[];V2.selected=[]");await run('vAddPlan()');
test('Exact sample falls back to labelled real cached geometry without fabricated alternatives',()=>{const count=run("R10.driving_samples[0].routes.length");assert.equal(run('V2.plans.length'),count);assert(run('V2.plans[0].label').includes('已缓存'));assert(run('V2.plans[0].geometry.coordinates.length')>50)});
test('Attachments expose direct link and true publication separate from collection',()=>{run("vSourceDialog('risk','翠竹街道')");const h=elements['#source-dialog'].innerHTML;assert(h.includes('2023-05-19'));assert(!h.includes('发布时间：2026-10-12'))});
run('v10ExportDialog(null,"出行报告")');
test('Export requires selection and supports PDF plus editable event label',()=>{const h=elements['#source-dialog'].innerHTML;assert(h.includes('id="v10-export"'));assert(h.includes('value="pdf"'));assert(h.includes('name="event"'));assert(h.includes('type="checkbox"'))});
const report={event:'深圳暴雨报告',s:run('vSnapshot()'),parts:[{title:'天气',text:'已选择部分'}],chosen:{weather:'on'},exported:'2026-10-12T10:00:00Z'};ctx.report=report;
test('Preview preserves four meanings of time and brand',()=>{const h=run('v10ReportHtml(report)');assert(h.includes('查询／回放时刻'));assert(h.includes('导出时间'));assert(h.includes('深雨知路'));assert(h.includes('已选择部分'))});
// Adapter test for multipage PDF, watermark and cleanup. Actual browser visual QA still required.
let pages=1,images=0,removed=false,savedPdf='';const imageCanvas={width:1230,height:5000,toDataURL:()=> 'data:image/png;base64,iVBORw0KGgo='};
const context={translate(){},rotate(){},fillText(){},drawImage(){}};
ctx.window.jspdf={jsPDF:class{addPage(){pages++}addImage(){images++}setFontSize(){}setTextColor(){}text(){}save(n){savedPdf=n}}};ctx.window.html2canvas=async()=>imageCanvas;
document.body={appendChild(){}};document.createElement=tag=>tag==='canvas'?{width:0,height:0,getContext:()=>context,toDataURL:()=>imageCanvas.toDataURL()}:{style:{},innerHTML:'',firstElementChild:{},remove(){removed=true}};
await run('v10Pdf(report)');
test('PDF adapter paginates, watermarks every page and cleans hidden DOM',()=>{assert(pages>1);assert.equal(images,pages*2);assert(savedPdf.endsWith('.pdf'));assert(removed)});
console.log('CHECKS',checks,'Reference geometry and export logic checked; no browser visual PDF QA.');
})().catch(e=>{console.error(e);process.exitCode=1});
