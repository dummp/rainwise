const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

test('Dashboard uses weather strip, planner and real geographic canvas',()=>{const h=run('vDashboard()');for(const s of ['v8weather','v8planner','v8-route-map','风险与出行判断'])assert(h.includes(s));assert(!h.includes('<svg viewBox="0 0 720 340"'))});
test('Journey retains all required input fields and waypoint order',()=>{run("V2.vias=['途经地点'];V5.round=true");const h=run('v8Form()');assert(h.indexOf('name="origin"')<h.indexOf('name="via-0"'));assert(h.indexOf('name="via-0"')<h.indexOf('name="destination"'));assert(h.includes('id="v5-return"'));assert(h.includes('id="v2-journey"'));assert(!h.includes('list="'))});
test('Comparison is collapsed by default and appears on request',()=>{run('V8.compare=false');assert(!run('vDashboard()').includes('class="v8comparison"'));run('V8.compare=true');assert(run('vDashboard()').includes('class="v8comparison"'));run('V8.compare=false')});
test('No new measurements or demonstration tasks are populated',()=>{assert.equal(run('v7Rows().length'),0);assert(!run('v5Community()').includes('data-v7="seed"'));assert(run('v8Weather()').includes('尚无可用时段数据'))});
test('Sources and advice remain available in disclosure panels',()=>{const h=run('vDashboard()');assert(h.includes('v8sourcefold'));assert(h.includes('查看完整关联资料与预测状态'));assert(h.includes('危险概率未取得校准模型'))});
test('Feedback preserves form, file upload and record actions',()=>{const h=run('vFeedbackPage()');assert(h.includes('id="v2-feedback"'));assert(h.includes('type="file"'));assert(h.includes('v8feedbackgrid'));assert(!h.includes('我的反馈与处理进度'))});
test('About retains editable profile and preferences',()=>{const h=run('vAbout()');assert(h.includes('id="v5-profile"'));assert(h.includes('v2-font'));assert(h.includes('v7profilehero'))});
test('Events wrap timeline and details into coherent page',()=>{run("V2.eventTab='past'");const h=run('vEventsPage()');assert(h.includes('v8eventpage'));assert(h.includes('v5timeline'));assert(h.includes('时间线节点详情'))});
const calls=[],events={};const map={setView(p,z){calls.push(['view',p,z]);return this},getCenter(){return {lat:22.555,lng:114.135}},getZoom(){return 13},remove(){calls.push(['remove'])},fitBounds(x){calls.push(['bounds',x])},invalidateSize(){}};
const layer=()=>({addTo(){return this},bindTooltip(){return this},on(e,f){events[e]=f;return this}});
ctx.window.L={map:()=>map,tileLayer:()=>layer(),circleMarker:()=>layer(),polyline:(coords,opt)=>{calls.push(['route',coords,opt]);return layer()}};
elements['#v8-route-map']={};elements['#v8-map-status']={textContent:''};
run("V3.role='user';V2.page='dashboard';V2.mode='now';V2.plans=[{id:'one',origin:'罗湖',destination:'黄贝岭',vias:[],coords:[{lat:22.53,lon:114.11},{lat:22.55,lon:114.13}],duration:100,geometry:{coordinates:[[114.11,22.53],[114.13,22.55]]}}];V2.selected=['one'];V2.focus='one';v8MountRouteMap()");
test('Route canvas uses actual geometry and reference styling',()=>{assert.equal(calls.filter(x=>x[0]==='route').length,1);assert.equal(calls.find(x=>x[0]==='route')[2].dashArray,undefined);assert(calls.some(x=>x[0]==='bounds'))});
test('Map instance is cleaned before next render',()=>{run('v8DropMap()');assert(calls.some(x=>x[0]==='remove'));assert.equal(run('V8.map'),null)});
console.log('CHECKS',checks,'Redesign structural and map adapter checks, no browser visual QA.');
