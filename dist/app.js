'use strict';
// Shared repair state is initialized before any legacy renderer runs.
const V19={taskReviewFilter:'审核中',exportBusy:false,labelSeq:0,exportChoices:null,exportScope:null};
function v19IsSeed(f){return !!f.demo&&/^v(?:13|15)-feedback-/.test(String(f.id))}
function v19MaintTaskNext(t){return ({'审核中':'待审核：查看需求与完成标准','待接单':'已通过审核，等待接单','已接单':'查看交付进度','待确认完成':'完成材料已提交，等待发布者确认','已完成':'任务已完成，可查看记录','审核未通过':'已退回，等待发布者修改','已取消':'任务已取消'})[t.status]||'查看任务记录'}
function v19HelpMatches(row,query){if(!query.trim())return true;const q=query.trim().toLowerCase();return row.some(s=>String(s).toLowerCase().includes(q)||(typeof v18English==='function'&&v18English(s).toLowerCase().includes(q)))}
function v19MapTitle(focus){const ps=typeof v11MapPlans==='function'?v11MapPlans():[focus],p=ps[0]||focus;if(!p)return '深圳罗湖 · 出行地图';return esc(p.origin)+(ps.some(x=>x.leg==='return')&&ps.some(x=>x.leg!=='return')?' ↔ ':' → ')+esc(p.destination)}
function vFormId(form){return form?.getAttribute?String(form.getAttribute('id')||''):typeof form?.id==='string'?form.id:''}
'use strict';
const D=window.APP_DATA;
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={route:'M4 5h6m-3-3 3 3-3 3M20 19h-6m3-3-3 3 3 3M5 10v4a5 5 0 0 0 5 5m9-9V6a5 5 0 0 0-5-5',map:'m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5m6-2v16m6-14v16',shield:'m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6l8-3m-4 9 3 3 5-6',clock:'M12 8v5l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',search:'M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16m6-2 6 6',message:'M4 4h16v12H9l-5 4V4m4 5h8m-8 3h5',layers:'m12 3 10 5-10 5L2 8l10-5M2 12l10 5 10-5M2 16l10 5 10-5',rain:'M7 15a5 5 0 0 1 0-10 6 6 0 0 1 11 3 4 4 0 0 1 0 8M8 18l-1 3m6-3-1 3m6-3-1 3'};
const icon=(name,size=20)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.layers}"/></svg>`;
function stored(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
function save(key,v){try{localStorage.setItem(key,JSON.stringify(v));return true}catch{toast('浏览器未允许本地存储，请导出记录保存');return false}}
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),3000)}
function pageHeading(kicker,title,subtitle,actions=''){return `<div class="heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${subtitle}</p></div>${actions}</div>`}
function download(name,text,type='text/plain;charset=utf-8'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function dateText(v){if(typeof v==='string'&&/Z$/.test(v)&&Number.isFinite(Date.parse(v)))return new Date(Date.parse(v)+8*3600000).toISOString().slice(0,19).replace('T',' ')+'（北京时间）';return (v||'时间未核实').replace('T',' ').replace(/\+08:00$/,'');}

function businessNow(){return typeof v9Now==='function'?v9Now():new Date()}
