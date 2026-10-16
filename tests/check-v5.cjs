const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

test('Navigation combines records with query and includes personal community',()=>{assert(!run("V2NAV.some(x=>x[0]==='history')"));assert(run("V2NAV.some(x=>x[0]==='personal')"));assert(run("V2NAV.some(x=>x[0]==='community')"))});
test('Weather supports independent place and trend state',()=>{assert(run('vWeather()').includes('v5-weather-place'));run("V5.weatherTab='trend'");assert(run('vWeather()').includes('逐小时模型趋势'))});
test('Trend uses provided hourly samples and no historical leakage',()=>{run("V2.weather={place:'罗湖',current:{time:'2026-10-12T12:00'},hourly:{time:['2026-10-12T12:00','2026-10-12T13:00'],temperature_2m:[28,27],precipitation:[2,4],precipitation_probability:[30,60]}};V2.mode='now'");assert(run('v5Trend()').includes('4mm'));run("V2.mode='history'");assert(!run('v5Trend()').includes('<svg'));run("V2.mode='now'")});
test('Round trip time includes travel and stay',()=>{run("V5.stay=60;V5.returnAt='';V2.departure='planned';V2.planned='2026-10-12T12:00'");assert.equal(run("v5RoundData({duration:1800,planned:'2026-10-12T12:00'}).returnTime"),'2026-10-12T05:30:00.000Z')});
test('Missing travel duration does not invent return time',()=>assert.equal(run('v5RoundData({duration:null}).returnTime'),null));
test('Free address shortcut can be saved',()=>{submit('v5-address-form',{label:'家',address:'某某小区'});assert.equal(JSON.parse(saved['sy-v5-addresses'])[0].address,'某某小区')});
test('Personal data saves and no reward inventory fabricated',()=>{submit('v5-profile',{name:'测试用户',account:'local',language:'中文'});assert(run('v5Personal()').includes('测试用户'));assert(run('v5Personal()').includes('积分发放与兑换未接通'))});
test('Community drafts remain local and no payment claim',()=>{submit('v5-help',{title:'代取物品',place:'罗湖',type:'积分',reward:'5',detail:'需要协助'});assert.equal(JSON.parse(saved['sy-v5-help'])[0].status,'本地草稿 · 未发布');assert(run('v5Community()').includes('暂不收款'))});
test('Place map contains no route polylines',()=>{const h=run('vMapPage()');assert(h.includes('地点全图'));assert(!h.includes('<polyline'))});
test('Query records can generate reports',()=>{run("V5.queryTab='records'");assert(run('vQueryPage()').includes('查询记录'))});
test('Feedback progress is not duplicated and details available',()=>{const h=run('vFeedbackPage()');assert(!h.includes('我的反馈与处理进度'));assert(h.includes('反馈记录'))});
test('Past events have timeline and current events lack invented scores',()=>{run("V2.eventTab='past'");assert(run('vEventsPage()').includes('时间线节点详情'));run("V2.eventTab='now'");assert(run('vEventsPage()').includes('无样本，不计算'))});
test('Dashboard sources and module export timestamps included',()=>{const h=run('vDashboard()');assert(h.includes('数据来源与适用范围'));assert(h.includes('生成本模块报告'));assert(h.includes('资料更新'))});
console.log('CHECKS',checks,'V5 semantic checks only; no browser visual QA.');
