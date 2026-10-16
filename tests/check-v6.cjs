const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const elements={'#app':{innerHTML:''},'#toast':{textContent:'',classList:{add(){},remove(){}}},'#source-dialog':{innerHTML:'',open:false,showModal(){this.open=true},close(){this.open=false}}},listeners={},saved={};
const document={querySelector:s=>elements[s]||null,getElementById:id=>elements['#'+id]||null,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}},addEventListener(t,f){(listeners[t]||=[]).push(f)},createElement(){return {click(){}}}};
const ctx=vm.createContext({window:{scrollTo(){},addEventListener(){}},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},location:{origin:'https://example.test',pathname:'/',hash:''},navigator:{},setTimeout:()=>{},console,URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob,crypto:require('node:crypto').webcrypto,AbortSignal,fetch:async()=>({ok:true,json:async()=>({code:'Ok',routes:[{distance:1234,duration:333,geometry:{type:'LineString',coordinates:[[114.11,22.53],[114.13,22.55]]},legs:[{steps:[{name:'沿河南路'}]}]}]})}),FormData:class{constructor(f){return Object.entries(f.values)}},MouseEvent:class{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary')});
const root=require('node:path').resolve(__dirname,'..');for(const n of ['data.js','app.js','v2.js','v3.js','v5.js','v6.js'])vm.runInContext(fs.readFileSync(root+'/dist/'+n,'utf8'),ctx);

const run=s=>vm.runInContext(s,ctx);let checks=0;
function test(name,f){f();checks++;console.log('PASS',name)}
async function click(action,value){const b={dataset:{v3:action,value}};for(const f of listeners.click)await f({target:{closest:s=>s==='[data-v3]'?b:null}})}
function submit(id,values){for(const f of listeners.submit)f({preventDefault(){},target:{id,values}})}

test('Journey inputs have no datalist or select',()=>{const h=run('vForm()');assert(!h.includes('list="'));assert(!h.includes('<datalist'));assert(h.includes('name="origin"'));assert(h.includes('name="destination"'));run("V2.vias=['某小区']");assert(run('vForm()').includes('输入途经地点'))});
test('Personal center is nested within settings',()=>{assert(!run("V2NAV.some(x=>x[0]==='personal')"));assert(run('vAbout()').includes('个人中心与账号资料'));assert(run('vAbout()').includes('v5-profile'))});
test('Events navigation precedes user feedback',()=>assert(run("V2NAV.findIndex(x=>x[0]==='events')<V2NAV.findIndex(x=>x[0]==='feedback')")));
test('Place risk uses geographic map container without route sketch',()=>{const h=run('vMapPage()');assert(h.includes('v6-geographic-map'));assert(!h.includes('<svg'));assert(!h.includes('<polyline'));assert(h.includes('OpenStreetMap'))});
test('Historical marker status respects cutoff',()=>{run("V2.mode='history';V2.at='2023-09-07T00:00'");assert(!run("v6Risk({name:'老街'})").text.includes('历史公告'));run("V2.mode='now'")});
// Leaflet adapter test: initialization, selection layers, loading errors, teardown.
const events={},calls=[];const map={setView(p,z){calls.push(['view',p,z]);return this},getCenter(){return {lat:22.555,lng:114.135}},getZoom(){return 13},remove(){calls.push(['remove'])},on(e,f){events['map-'+e]=f;return this},invalidateSize(){}};
const layer=()=>({on(e,f){events['tile-'+e]=f;return this},addTo(){return this},bindTooltip(){return this}});
ctx.window.L={map:()=>map,tileLayer:(url,opt)=>{assert(url.startsWith('https://tile.openstreetmap.org/'));assert(opt.attribution.includes('OpenStreetMap'));return layer()},circleMarker:()=>layer(),circle:()=>layer()};
elements['#v6-geographic-map']={};elements['#v6-map-status']={textContent:''};
run("V3.role='user';V2.page='map';V5.place='';v6MountMap()");
test('Map mounts at overview and reports unavailable tiles',()=>{assert.equal(calls[0][2],13);events['tile-tileerror']();assert(elements['#v6-map-status'].textContent.includes('加载失败'));events['tile-tileload']();assert(elements['#v6-map-status'].textContent.includes('可拖动'))});
test('Map removes previous instance before remount',()=>{run('v6DropMap()');assert(calls.some(c=>c[0]==='remove'));assert.equal(run('v6Map'),null)});
console.log('CHECKS',checks,'Leaflet integration mocked; browser visual/tile verification not performed.');
