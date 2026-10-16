const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js','v7.js','v8.js','v9.js','reference-network.js','v10.js','v11.js','export-map-data.js','v12.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

(async()=>{
run("V2.mode='now';V9.active=false;V2.origin='罗湖';V2.destination='黄贝岭'");
ctx.fixture={place:'罗湖',current:{time:'2026-10-13T10:00'},hourly:{time:Array.from({length:24},(_,i)=>'2026-10-'+(i<14?'13':'14')+'T'+String((10+i)%24).padStart(2,'0')+':00'),temperature_2m:Array.from({length:24},(_,i)=>23+Math.sin(i/4)*4),precipitation:Array.from({length:24},(_,i)=>i===6?0.1:i>12?2.2:0),precipitation_probability:Array(24).fill(40),weather_code:Array.from({length:24},(_,i)=>i<5?2:i<12?3:61)}};
run('V2.weather=fixture');
test('Temperature and precipitation are two distinct charts with units and axes',()=>{const h=run('v5Trend()');assert.equal((h.match(/<svg /g)||[]).length,2);assert(h.includes('气温（°C）'));assert(h.includes('小时降水量（mm）'));assert(h.includes('时间（北京时间）'));assert(h.includes('局部多云'));assert(h.includes('小雨'));});
test('Zero rainfall draws no rounded blue square and positive small values retain magnitude',()=>{assert(!run("v12Chart(v12Hours(fixture).map(r=>({...r,rain:0})),'rain')").includes('fill="#4d82ed"'));const h=run("v12Chart(v12Hours(fixture),'rain')");assert(!h.includes('rx='));assert(h.includes('0.1mm'));});
test('Missing temperature is a gap rather than a zero reading',()=>{const h=run("v12Chart([{t:'2026-10-13T10:00',temp:20},{t:'2026-10-13T11:00',temp:null},{t:'2026-10-13T12:00',temp:21}],'temp')");assert.equal((h.match(/<circle /g)||[]).length,2);});
test('Missing weather code stays unknown instead of being called clear',()=>assert.equal(run('v12WeatherName(null)'),'天气未取得'));
test('Weather API requests condition code alongside hourly values',()=>assert(fs.readFileSync(root+'/dist/v5.js','utf8').includes('precipitation_probability,weather_code')));
test('Station name does not infer all hazards in similarly named street',()=>{const rs=run("vRisks({origin:'罗湖',destination:'黄贝岭',vias:[],mode:'now'})");assert.equal(rs.length,1);assert.equal(rs[0].street,'南湖街道');assert(run("v12RiskMatches({origin:'罗湖',destination:'黄贝岭',vias:[]},D.risks.find(r=>r.street==='南湖街道'&&r.guide_year===2026))[0].hit").includes('罗湖火车站'));});
test('Named road match has an explicit segment-verification qualification',()=>{const rs=run("vRisks({origin:'未知小区',destination:'未知医院',vias:[],roadNames:['沿河南路'],mode:'now'})");assert.equal(rs.length,1);ctx.rs=rs;assert(run("v12RiskMatches({origin:'未知小区',destination:'未知医院',vias:[],roadNames:['沿河南路']},rs[0])[0].type").includes('区段'));});
run("v9Start('hospital',false,'2023-09-08T09:30');V5.returnAt='2023-09-08T11:30'");await run('vAddPlan()');
test('Risk probability has hover keyboard-focus explanation and does not invent percentage',()=>{const h=run('v8Summary()');assert(h.includes('危险概率：暂无可靠数值'));assert(h.includes('role="tooltip"'));assert(h.includes('tabindex="0"'));assert(h.includes('未训练、校准和验证'));assert(h.includes('名称关联表示资料提及该地点或道路'));});
test('Both directions suspension includes named line and section',()=>{const h=run('v8Summary()');assert(h.includes('岗厦至罗湖'));assert(h.includes('地铁客运服务'));assert(h.includes('往返两个方向'));assert(h.includes('福保至水贝'));assert(h.includes('地铁1号线岗厦至罗湖，'));assert(h.includes('地铁3号线福保至水贝，'));});
test('Historical hazard evidence uses historical guide even with current global mode',()=>{const p=run('V2.plans[0]');ctx.hp=p;run("V2.mode='now'");assert(run('vRisks(hp).every(r=>r.guide_year===2023)'));run("V2.mode='history'");});
const svg=run('vMapSvgSnapshot(vSnapshot())');
test('Export map has real OSM features place labels endpoints north and distance scale',()=>{assert(svg.includes('地理背景'));assert(svg.includes('罗湖'));assert(svg.includes('起点'));assert(svg.includes('1 km'));assert(svg.includes('北'));assert(svg.includes('<polygon'));assert(svg.includes('ODbL'));assert(svg.includes('虚线：返程'));});
test('Missing route uses positioned places on map without fabricated path',()=>{const h=run("vMapSvgSnapshot({plans:[{origin:'罗湖',destination:'黄贝岭',vias:[],coords:[vResolve('罗湖'),vResolve('黄贝岭')],geometry:null}]})");assert(h.includes('路径未取得，仅显示已匹配地点'));});
test('No unrelated map is substituted when coordinates are unavailable',()=>{assert(run("vMapSvgSnapshot({plans:[{origin:'未知',destination:'未知',coords:[]}]})").includes('地图无法定位'));});
fs.mkdirSync(require('node:path').join(root,'.qa'),{recursive:true});fs.writeFileSync(root+'/.qa/map.svg',svg);fs.writeFileSync(root+'/.qa/temp.svg',run("v12Chart(v12Hours(fixture),'temp')"));fs.writeFileSync(root+'/.qa/rain.svg',run("v12Chart(v12Hours(fixture),'rain')"));
console.log('CHECKS',checks,'V12 chart evidence and geographic-export checks; not browser QA.');
})().catch(e=>{console.error(e);process.exitCode=1});
