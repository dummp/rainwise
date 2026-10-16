'use strict';
const V17EX={now:new Date().toISOString(),guideScroll:false};
const GUIDE17=[
 ['dashboard','现在与历史','上方选择的是资料场景，真实现在时间始终独立显示。','.v14scenebar',['现在：看当前模型天气和当前道路参考。','历史：调整模拟时刻；“当时可知”按发布时间筛选，“事后复盘”可看后续记录。','切换场景保留当前模块，普通与历史测试记录分开。']],
 ['dashboard','天气、趋势与数据时间','天气卡先说明地点和数据时刻，再展示数值与小时趋势。','.v8weather',['地点可独立修改，点击刷新后更新天气。','展开趋势看气温、天气、降水图和数据表；每个数值保留单位。','当前模型天气不是现场实测。历史资料的专业词汇可点击解释。']],
 ['dashboard','填写一趟完整行程','出发时间、起终点与返程安排在这里填写。','.v8journey',['选择现在出发或计划出发，填写起点、途经点和目的地。','分别选择两程交通方式；需要返回时填写停留和返程出发时刻。','查询后保留两程方案。修改输入后重新查询，地图才对应新方案。']],
 ['dashboard','地图与方案比较','地图帮助确认路线在哪里，方案卡帮助重看与比较。','.v8mapsection',['点击方案卡切换当前方案；去程、返程和往返对比按实际方案启用。','地图标注原始起终点；步行会说明道路接入点与参考时长。','多方案可勾选比较，也可导出带底图的报告。参考路线不证明洪涝期间可通行。']],
 ['dashboard','行程影响与安排建议','这里按两程列出运营影响、具体隐患与来源。','.v11risk',['运营公告、地点隐患和安排建议分别展示。','“长期隐患”是指引中的地点提示，不能当作当前积水。','强降雨概率按集合天气预报估算，计算说明可展开查看。道路积水还受地形、汇水和排水能力影响，雨量与水深是不同指标。']],
 ['map','查看一个地点及周边','地点地图用于了解地点资料，和行程路线地图分别使用。','#v6-place-detail',['选地点查看地铁运营、现场线索与长期隐患，三类信息分别说明。','周边距离是直线参考；站点或建筑代表坐标不等于精确入口。','已匹配位置可设为起点或目的地，再回出行看板查询。']],
 ['events','沿时间线理解事件','选一个事件节点，阅读地点、发布时间与原始依据。','.v9historycontrols',['当时视角只看此前公开资料，完整复盘可阅读后来记录。','节点地图可标注自己的位置，查看直线距离或是否在所述行政区内。','地区范围不等于积水范围；统计雨量和当前雨强分开理解。']],
 ['query','查询资料与保存的记录','这里查询已有资料，重看保存过的方案和报告快照。','.heading',['输入地点或问题，查看已有依据。','保存记录可恢复行程、加入比较、分享或导出。','历史快照保留当时资料截止时间，不能用后来的信息补成当时已知。']],
 ['feedback','提交自己的反馈，或先体验演示','反馈表包含地点、观测时刻、来源、自评和情况说明。','#v2-feedback',['预填演示可直接提交；想报告自己的情况，请先清空演示内容。','公开新闻来源必须附原文，现场图片可选。','提交后查看记录编号和核验进度；演示内容始终保留虚构标识。']],
 ['feedback','核验进度、结论与回复','我的反馈和演示样例分开，时间线显示当前阶段。','.v14feedbackprogress',['等待核验、正在核实、核验结论和回复分别展示。','维护端处理同一浏览器里的记录，用户端可重看依据与回复。','历史时间回退会隐藏后来处理结果。本地保存不等于官方受理。']],
 ['community','任务大厅：找需要的帮助','查看任务内容、地点、交付要求和当前阶段。','.v14taskfilters',['筛选任务类型；输入位置可算直线距离。','可接单任务与我的任务分开。接受后进入自己的任务记录。','虚构任务根据当时情况编写，没有真实机构委托或支付。']],
 ['community','发布任务：说明需求与完成标准','演示任务已填完整，方便体验提交与审核。','#v7-task-form',['可直接提交演示，或清空后填写自己的任务。','标题、地点、截止时间、预计用时与交付标准要清楚。','发布后进入维护审核；通过后才成为待接任务。'],'publish'],
 ['community','我的任务：提交成果与确认','任务的下一步操作取决于你的身份和当前阶段。','.v14taskgrid',['接单者填写完成内容、材料、时间和遗留问题。','发布者核对材料，可确认完成或说明原因退回补充。','完成后双方可各评价一次；退出或取消会保留历史记录。'],'mine'],
 ['community','公益项目与模拟支持','这些项目和金额用途均为虚构体验，配图为AI生成插画。','#v16-giving',['项目预算说明金额用途；选择模拟金额可体验支持流程，不发生付款。','我的模拟捐赠显示计划分配、已模拟使用和剩余金额。','手动推进采购、送达与回访，查看各阶段图片和用途反馈。'],'giving'],
 ['about','账户、阅读偏好与提醒','个人资料、快捷地址、阅读和提醒集中在这里。','.v14preferences',['语言与字体属于阅读偏好；提醒可关闭或选择内容与方式。','浏览器通知需要你主动授权；免打扰按北京时间设置。','关闭页面后的自动推送尚未接入，记录也没有跨设备同步。']],
 ['help','帮助与软件反馈','软件使用问题在这里提交，灾情线索使用灾情反馈页。','.v14tabs',['可搜索使用帮助，或填写故障描述、复现步骤和截图。','我的软件反馈可查看维护回复和导出材料。','此页面使用真实时间，不跟随历史灾情时钟。']]
];
const MAINTGUIDE17=[
 ['workspace','维护总览','总览显示各类待办数量，处理动作在对应队列完成。','.maintstats',['灾情核验、任务审核、材料申请和软件维护各有独立入口。','顶部可切换灾情场景与资料时刻，不会自动更换身份。']],
 ['feedback','灾情核验：先查原始线索','这里查看用户反馈的地点、观测时刻、图片和来源。','.maintfilters',['按状态、优先级或内容筛选。','打开一条记录，核对原文和用户自评，避免把自评当作核验结论。']],
 ['feedback','核验结论与用户回复','处理阶段、核验结论和回复分别保存。','.maintfilters',['填写核对了什么、依据链接、结论和处理意见。','已核验必须有结论；保存后用户端显示时间线与回复。','历史回退不提前显示后来的回复，角色与维护页面会保留。']],
 ['tasks','任务审核','检查需求范围和交付标准，记录审核意见。','.content>.card',['通过后进入待接单，退回时说明需要修改的内容。','虚构演示的身份与标签始终保留，不作为真实机构授权。']],
 ['materials','材料申请','审核反馈整理申请，让用户导出可追溯材料。','.content>.card',['查看地点、原始内容及来源。','审核可导出材料不等于已提交官方，也不会生成官方受理回执。']],
 ['software','软件维护','软件故障与建议独立使用实际时间。','.content>.card',['读取复现步骤、预期和实际结果，记录处理阶段与回复。','用户可在帮助页面查看回复，软件记录不受历史时间回退影响。']],
 ['hazards','隐患资料','官方指引原文只读，维护补充独立标注。','.content>.card',['查看街道资料和原件来源。','维护草稿不能直接冒充官方确认，也不覆盖原始指引。']],
 ['logs','操作记录','查看处理动作、时间、编号和说明。','.content>.card',['可导出本浏览器维护操作记录。','游客体验没有真实权限隔离，记录也不是不可修改的正式审计。']]
];
const V17TERMS=[
 {id:'sliding3',words:['3小时最大滑动雨量'],body:'把连续3小时作为一个统计窗口，再随时间向前移动，例如07:00—10:00、07:01—10:01。把报道统计范围内这些窗口的累计雨量比较，取最大值。它不是发布时刻正在下多大雨，也不能当作当地积水深度。',source:'https://weather.sz.gov.cn/hudongjiaoliu/yewuzhishiku/qixiangfuwulei/content/post_8800285.html'},
 {id:'sliding',words:['最大24小时滑动雨量','最大滑动雨量','滑动雨量'],body:'滑动雨量是每个时刻往前一段固定时长的累计降水；窗口移动后，早先的降雨会移出，所以数值可以上升或下降。“最大”表示在所述统计范围内，取各个窗口中最大的累计值。',source:'https://weather.sz.gov.cn/hudongjiaoliu/yewuzhishiku/qixiangfuwulei/content/post_8800285.html'},
 {id:'maxhour',words:['本轮最大1小时雨量','最大1小时雨量'],body:'报道统计范围里，降水最多的一段连续1小时所记录的雨量。它不是整轮降雨的累计总量，也不是当前这一分钟的雨强；数值对应的地点和统计范围在这条记录中单独标注。'},
 {id:'intensity',words:['小时雨强','雨强'],body:'雨强描述一段时间内降雨的强弱，常用毫米/小时。某小时累计雨量或整轮过程中的最大值，并不说明当前这一分钟的降雨强度。'},
 {id:'accumulated',words:['小时累计降水','累计雨量'],body:'在明确的统计时段里，把降水加起来得到的总量，通常用毫米表示。1毫米降水约相当于每平方米收到1升水，不是地面的积水深度。'},
 {id:'train',words:['列车效应'],body:'多个降雨云团先后经过同一片地区，像列车车厢依次经过同一段铁轨，使降雨持续较久。这是解释降雨过程的词，不是对你所在地点雨量或积水的测量。'},
 {id:'waterlogging',words:['内涝'],body:'降水和汇水超过当地排水能力，雨水在城市低洼等区域积聚。发生积水的位置、深度和通行影响仍需要对应的现场数据。'},
 {id:'model',words:['数值预报'],body:'计算机利用天气观测和物理模型推算未来天气。模型网格的结果是参考预报，不等于某个街角或入口的实测情况。'},
 {id:'reanalysis',words:['再分析'],body:'把事后收集到的观测和模型结合，重建过去的天气。适合复盘，但不能当作当时已经知道的预报。'},
 {id:'threshold',words:['雨量阈值'],body:'指引中用于提示可能出现影响的参考降水条件。超过参考条件不等于每处都会积水，也不能直接算出危险概率。'},
 {id:'straight',words:['直线距离'],body:'两个位置之间的地理距离参考，不考虑街道、围墙、跨河、绕行或出入口。步行路径的长度可能更长。'}
];
function v17NowText(){return dateText(V17EX.now)}
function v17RefreshClocks(time=new Date()){V17EX.now=time.toISOString();const text=v17NowText();for(const el of document.querySelectorAll('[data-live-clock]'))el.textContent=text;for(const id of ['v14-live-clock','v10-current-clock']){const el=document.getElementById(id);if(el)el.textContent=text}return text}
function v17ExplainText(text){const words=V17TERMS.flatMap(t=>t.words).sort((a,b)=>b.length-a.length),re=new RegExp('('+words.join('|')+')','g');return String(text??'').split(re).map(part=>{const t=V17TERMS.find(t=>t.words.includes(part));return t?`<button type="button" class="v17term" data-v17="term" data-value="${t.id}" title="${esc(t.body)}" aria-label="解释${esc(part)}">${esc(part)} ⓘ</button>`:esc(part)}).join('')}
function v17ExplainBlock(text){return `<span class="v17explained">${v17ExplainText(text)}</span>`}
function v17MountGuide(){if(V14.guideIndex===null||!V3.role)return;const g=v16GuideList()[V14.guideIndex],c=document.querySelector('.content');if(!g||!c)return;const target=document.querySelector(g[3]||'.heading')||c.firstElementChild||c;target.setAttribute?.('data-v17-guided','true');const position=target===c?'afterbegin':['.v14scenebar','.heading'].includes(g[3])?'afterend':'beforebegin';target.insertAdjacentHTML?.(position,v14GuidePanel());if(V17EX.guideScroll){const panel=document.querySelector('.v17guide')||target;panel.scrollIntoView?.({behavior:'smooth',block:'start'});V17EX.guideScroll=false}}
const V17GIVING_PHOTOS=[{stage:1,src:'assets/giving-procurement.png',title:'采购与物资整理',caption:'AI演示插画：清点并整理假设采购的用品。'},{stage:2,src:'assets/giving-delivery.png',title:'物资送达与接收',caption:'AI演示插画：模拟交接与收到物资，不是真实签收证明。'},{stage:3,src:'assets/giving-followup.png',title:'用途反馈与回访',caption:'AI演示插画：模拟展示用品使用和回访，不是真实受助者资料。'}];
function v17GivingPictures(stage){const rows=V17GIVING_PHOTOS.filter(p=>p.stage<=stage);return rows.length?`<section class="v17givingphotos"><div class="row"><h4>公益进展图片</h4><small>AI生成 · 根据当时情况编写的虚构演示</small></div><div class="v17photogrid">${rows.map(p=>`<figure><button data-v17="picture" data-value="${p.stage}" aria-label="放大${p.title}演示插画"><img src="${p.src}" alt="${p.caption}" loading="lazy" width="1536" height="1024"></button><figcaption><b>${p.title}</b><span>${p.caption}</span></figcaption></figure>`).join('')}</div></section>`:''}
document.addEventListener('click',e=>{const b=e.target.closest('[data-v17]');if(!b)return;if(b.dataset.v17==='term'){const t=V17TERMS.find(t=>t.id===b.dataset.value);if(t)vDialog('术语解释 · '+t.words[0],`<p class="v17termdefinition">${esc(t.body)}</p>${t.source?`<a href="${t.source}" target="_blank" rel="noopener">深圳气象业务知识库 ↗</a>`:''}`)}if(b.dataset.v17==='picture'){const p=V17GIVING_PHOTOS.find(p=>p.stage===Number(b.dataset.value));if(p)vDialog(p.title+' · AI演示插画',`<img class="v17largephoto" src="${p.src}" alt="${p.caption}"><p>${p.caption}</p><p class="notice">虚构公益进展插画，不能作为实际采购、发放或签收证明。</p>`)}});
document.addEventListener('visibilitychange',()=>v17RefreshClocks());
if(typeof setInterval==='function')setInterval(()=>v17RefreshClocks(),1000);

document.addEventListener('click',e=>{const b=e.target.closest('[data-v2="transport"]');if(b&&V2.loading){V2.requestSeq++;V2.loading=false}},true);
document.addEventListener('change',e=>{if(V2.loading&&['v11-return-transport','v5-round'].includes(vFormId(e.target))){V2.requestSeq++;V2.loading=false}},true);
