# 第十九版：两轮浏览器问题修复（2026-10-14）

沿用同一项目、品牌、数据文件和原访问权限。

- 使用HTML属性读取所有表单标识，修复具名`id`字段覆盖表单`id`属性造成的默认GET导航。维护反馈、材料审核、任务审核、软件回复与任务完成可保存并保留身份；失败保留输入。
- 历史两组视角按钮共用单一状态。当前行程不携带2023截止时刻；新查询保存完整天气、集合概率、相关反馈及原查询时间。旧版未保存的数据明确说明，不能恢复或用新天气补写。
- 强降雨概率以出发所在整点为起始，使用随后3个小时端点的“前1小时累计降水”。主卡标注小时窗口、地点和保存时间；不把强降雨概率称为整条路线积水或事故概率。
- 用户演示提交进入“我的反馈”，内置样例独立。任务审核默认待办筛选，角色文案独立。公益体验单独页签，历史复盘只保留来源明确的真实行动资料。
- 完善英文UI与英文帮助检索，保护用户正文；长导航、报告预览、表单标签、地图返程标题、空状态、导览子页、时间格式、提醒关闭文案和通知阻止提示统一修正。
- PNG/PDF使用同一自包含canvas内容渲染，包含选中的文字、曲线、地图和反馈图片；生成过程中禁用重复导出，超时／失败有提示。HTML保持响应式，返回选项保留勾选与原快照。

验证：340项程序回归通过（含20项v19故障复现／流程检查），新增用INPUT对象覆盖表单`.id`的测试条件，并验证维护重载、用户回复、材料审批和任务完成／评价闭环。没有可用的`control-browser`技能，按当前Sites工作流未启动浏览器预览。视觉、实际PDF/PNG下载与成品渲染仍需实机验收；不将程序测试等同真实浏览器验收。现有记录仍为浏览器本地共享，未增加跨设备服务或真实权限认证。

# 第十四版：模块用途导览、双场景、灾情与软件反馈分离、任务流程整理

沿用既有项目与权限。首次入口可选现在/历史，导览改为9段简短用途介绍，不再强制进入医院历史演练。顶部始终保留实际当前时间或历史模拟时刻，原切换情景/导览入口保留并说明两种数据视角；旧mode/exit按钮共用切换逻辑。

灾情反馈统一为类型、地点、观测时间、自评、来源、原始链接、内容和图片。示例分类/自评/来源对齐表单，卡片和详情显示完整字段及链接。新提交记录生成编号、状态和核验时间线；维护回复与时间回退仍通过版本投影过滤。无客服/官方回执时不声称已受理。

任务页重排为大厅、发布、我的任务，个人信誉和历史草稿保留。接单后进入我的任务；草稿跨页保留。完成材料包含完成情况、交付结果、时间、用时、链接、图片与遗留问题，保存一次后等待确认。发布者先核对材料再确认，也可退回补充；审核拒绝须原因，接单者可退出并保留记录。任务历史保存状态快照，过去视角不泄漏未来材料/参与关系。修复重复操作、非法截止、区域坐标NaN和已退出接单者评价权限等问题；保存失败不返回成功。

帮助与软件反馈是独立导航页面，含可搜索FAQ、软件问题/建议表单、复现步骤、结果、截图、可选非行程诊断、记录与导出。独立localStorage键，使用真实提交时间；只本地保存，客服通道未接入。账户与设置按个人资料→阅读提醒→快捷地址→我的记录→项目说明组织。

197项程序检查通过（原172项＋25项），覆盖实际路由、捕获事件、双场景/短导览、反馈字段与维护回复、任务接单/提交/确认/退回/退出/评价/历史快照/草稿及软件记录隔离。当前无受支持浏览器控制技能，未进行浏览器视觉与实际文件上传/瓦片/PDF下载验收。
测试根目录改为相对项目位置，QA输出与日志忽略，不依赖原聊天绝对路径。

# 第十三版：一致状态、首次导览与事件地点地图

“大部晴”改为“以晴为主”。地点详情拆为地铁运营影响、现场积水与长期隐患，地图/详情/点位状态共用判断；未取得停运/恢复资料不写成正常运营；参考坐标已取得时不再显示坐标未匹配。

首次进入自动弹出欢迎导览（可跳过、用户/维护两种起点），原历史情景/导览面板保留。12步介绍天气时钟、往返设置、地图比较、风险、地点、复盘地图、反馈、维护核验、材料申请、任务、评价、报告与设置；每步有操作清单和预期结果。进度可刷新恢复，旧七步层对新步数有防崩溃处理。

历史时间线节点附Leaflet/OSM地图、行政区轮廓和资料地点。自由输入我的位置或地图选点，不自动读取设备定位。点位提供直线参考距离；行政区判断是否位于区内或至区界近似距离。珠江口/深圳湾和完整线路未取得的定位明确标注，不把区域中心当灾害点。区界使用已保存DataV数据；不是淹没范围。

历史默认09:30自动载入3条反馈、6个任务、双方评价及一条材料申请。各项明确“根据当时情况编写（虚构演示，非真实居民反馈/委托）”并附背景公告与发布时间。机构格式示例不冒充实际官方委托。只写入历史沙盒，按09:29可用时间过滤，普通用户记录不变。反馈/任务覆盖待核验、处理中、关闭及审核、待接、已接、完成等流程。

172项程序检查通过（原157项＋15项）。尚未进行实际浏览器视觉、瓦片加载、悬停交互及PDF下载实机验收。

# 第十二版：分图、隐患解释与带背景地图的导出

根据用户五张截图修订：未来24小时气温与降水独立绘图，均带纵坐标单位和北京时间横坐标；气温图标注WMO天气代码对应状态，查询增加weather_code；缺测保持未知，零降水不画蓝色方块。

收紧长期隐患名称关联，站名不再仅凭相似名称推断街道风险。各方案可展开具体隐患、指引版本、来源和关联理由，明确入口/区段/路线重合未核验。危险概率说明支持鼠标悬停和键盘聚焦。暂停运营摘要按每条记录明确线路、区段及双向地铁客运；公共交通已生成区段只关联对应线路停运，避免拿终点其他线路的停运代替所选路线状态。

报告地图使用已保存OSM原始数据生成道路、建筑、水系、站名和端点背景，带方向与比例尺；HTML/PDF/PNG使用同一自包含地理图。灰色超出采集片区处保持缺失，既有轨迹为当前参考，不当作2023灾时路网。无路径只显示已匹配位置，不画虚构连线。

157项程序检查通过，新增13项覆盖图表、零值/缺测、天气代码、关联精度、概率解释、线路文字与导出地理背景。静态SVG几何已渲染检查；环境无中文字体和受支持浏览器，中文文字布局、实际浏览器与PDF下载仍未实机验收。

# 第十一版：天气报告与完整往返

沿用原项目。天气报告使用独立快照，可选数据、趋势、表格、气象预警；HTML/PDF/PNG包含所选趋势图，TXT保留数据与来源。历史不补造数值曲线。

返程设置展开交通方式、起终点、途经点、停留和时间；同一journeyId保留outbound/return两程，各自查询与记录。停运和历史驾车不以参考时长推算有效返程时间；未取得返程时间保留明确状态。重看记录恢复往返组，原本地数据不清空。

地图常驻起点/途经/终点与上下车换乘标签，支持两程切换或对比。编辑地点后提示重新查询；过期响应不覆盖新行程。风险与建议集中为一个往返模块，计数有名称单位，未知不写0。

144项程序检查通过（原131项、新增13项），未做实际浏览器视觉、瓦片加载与真实PDF下载验收。当前环境无受支持的浏览器控制技能，按Sites流程跳过浏览器预览。现有导航、数据和AI服务缺口仍保留。

# 第十版：先完善出行和地点两模块

新增离线OSM地点与轨道索引、明确匹配范围、地铁参考方案的上车/换乘/下车/正常条件估算和停运影响、真实道路几何、有限缓存回退、红橙黄灰影响图层、独立当时可知/历史重建状态、只读规划时钟、官方附件直链、选择内容后PDF/HTML/TXT/PNG导出。
131项程序检查通过，未浏览器视觉/PDF实机验收。当前公共交通支持有限地铁走廊，不代表完整公交服务；参考轨迹/规则时长不代表历史灾时通行或ETA。详见MODULES_1_2_NOTES.md。

# 第九版：历史情景、导览与独立测试区

顶部“历史情景/导览”提供通勤、医院往返、社区观察和自由探索。默认2023-09-08 09:30；当时视角按发布时间过滤，完整复盘可显示后来资料。7步导览支持跳过、返回及维护游客切换。测试记录与普通记录独立，退出后恢复普通区。
新增并核对27条历史资料摘要（原18条加9条），公开雨量标注地点/统计范围与精度，不提前用ERA5或当前天气。历史查询有总览、双视角、时间线、专业预测表、事后背景曲线和公益公开行动资料。
反馈可按新闻创建明确测试线索、维护审核、申请生成上报材料、审核后导出。私人演示任务与模拟捐赠意向不构成真实委托、支付或募捐。没有真实官方任务/募捐明细时不填造。
统一模拟业务时钟；真实审计时间保留。反馈处理状态有时间版本，快照导出再次过滤截止。115项程序检查通过；未浏览器视觉验收。
SOURCE_NOTES.md记录核对来源，TEST_REPORT.md列出本轮修复和未验证项目。医院入口定位、完整路由、AI和共享后端等仍待接入。

# 第八版：统一视觉与地图工作台

本轮不新增演示数据。出行页重设计为天气摘要与按需趋势、左侧行程/方案、右侧真实地图/风险依据；比较按需展开，资料与详细限制折叠保留。地图使用既有Leaflet与OSM，驾车绘制已取得的实际服务几何，未规划地点与历史模式使用虚线。没有路径时保留真实底图，不虚构通行路线。
新增redesign.css统一深蓝/青绿配色、字体层级、留白、卡片、按钮、移动端排布；反馈页双栏，事件页时间线/详情双栏，个人资料与设置顺序整理。既有表单、源链接、往返设置、分享与报告功能保留。隐藏主动加载演示任务入口，不删除此前用户已保存记录。

88项程序检查通过，其中10项针对新界面结构、输入、折叠、地图绘制和生命周期。受当前环境限制，未做浏览器视觉和真实底图加载验收。真实AI、完整地址/公交、共享后端及奖励交易仍未接通。

# 第七版：互助任务、双方评价与个人主页

天气地点移除datalist，改为纯文本输入。互助页分为互助区（接受/发布）、信誉与双方评价、我的任务记录。官方/私人任务筛选及拍照核实、物资运送、代取、陪伴、设备协助等分类已加入。
私人任务可填写时长、难度、拟定奖励、地点、坐标、截止时刻、完成标准。距离根据手工输入位置和已匹配坐标计算为直线距离；无坐标保持未知。私人任务状态为审核中→待接单→已接单→待确认完成→已完成；维护游客工作台可本地审核。发布者不可接自己任务；重复接单、未经确认评价、重复评价被拦截。
任务确认后双方可各评价一次，信誉主页展示实际本地评价平均分与数量。评分不是认证信用分；游客角色与本地身份没有真实账号认证。页面可显式载入两条虚构演示任务，官方样例不是官方委托，示例身份及评价均标记演示。奖励不支付、不发放积分。真实跨用户任务、机构授权、资金托管与争议申诉待接入。
个人中心仍在关于与设置，重设计为蓝色资料头图、真实本地数量统计、快捷入口和折叠编辑。旧版互助草稿保留。

78项程序检查通过，包括任务流转、角色限制和双方评价。尚未浏览器视觉验收。

# 第六版：真实地点底图与导航整理

出发行程的起点/途经点/终点为纯文本输入框，移除datalist候选；自建快捷地址仍可填入输入框。个人中心并入关于与设置。事件追踪与复盘导航位于用户反馈前。
地点风险采用本地Leaflet 1.9.4与OpenStreetMap实时瓦片。支持拖动缩放、11个站点证据状态标记、点击地图坐标、1.5公里周边范围、全图复位和底图失败提示。地图仅按用户当前视口请求，不预取或离线下载；保留OSM署名。非谷歌/高德服务；地图本身不提供实时洪涝风险或完整地址搜索。
65项程序检查通过，包括模拟Leaflet生命周期、失败提示与导航。未进行浏览器视觉验收或真实瓦片加载验收。底图依赖浏览器网络及第三方服务。

# 第五版：天气趋势、往返场景与模块报告

新增独立天气地点、24小时真实模型趋势与数据表、自由地址及本地快捷地址、出行目的/停留/返程时间、反向返程查询、风险证据表。风险标签描述证据状态，不冒充经过验证的危险百分比或AI预测。
快捷查询合并查询记录；地点页为纯地点坐标图和周边站点；反馈详情与处理进度分离；新增本地个人资料、语言偏好、互助草稿。积分兑换、支付、捐赠项目和跨用户接单未接通，不执行真实交易。语言偏好可存，英文全站翻译未实现。
各模块报告支持HTML（浏览器打印PDF），保留图表、来源、时间与未知项；原查询的选择内容导出依旧可用。天气有真实数据刷新时间，其他未确认更新日期保持未知，页面生成时间不冒充数据更新时间。
历史事件有可点击时间线；当前事件没有已确认实时记录，预测验证表不虚构样本与准确率。

原45项检查及新增13项V5语义检查通过。尚未做浏览器视觉验收。公开地址地理编码、公交路由、校准风险模型、共享后端仍未接通。

# 第四版：按一次出行重排看板

天气与出发时间 → 行程选择 → 出行方案及当前路径图 → 当前方案关联隐患 → 多方案比较。
行程区只保留出发点、途经点、目的地；交通方式和生成按钮属于方案区。单方案地图仅显示当前查看的路径，比较地图显示所勾选的多条路径。青绿色表示所选方案中参考时长较短，不代表安全推荐或已接通AI推荐。官方资料、用户线索和未知状态分开呈现；历史地图排除截止时刻之后的本地反馈。

27项基础/布局程序检查及18项角色/维护检查通过。未做受支持的浏览器视觉验收。静态坐标示意图尚非完整地图底图；公共交通/步行路由、真实AI、共享后端仍待接入。

# 第三版：用户与维护人员游客入口

进入页面只有“用户”“维护人员”两种选项，都无需手机号、邮箱或密码。游客与用户的功能内容相同。体验身份存在本浏览器，不是已接通的账号认证或正式权限隔离。

维护端包含工作台、反馈处理、隐患资料与操作记录。显示同一浏览器里用户提交的文字和图片；可以筛选、标记优先级、记录依据与处理说明、修改进度、导出摘要。用户端展示同一条记录的最新处理状态与意见。关闭记录不再参与活跃隐患匹配。官方资料只读，补充草稿独立保存。

维护更新没有自动官方上报，核验声明不自动成为官方确认。跨设备、多用户共享、真实认证仍待接通。18项新增角色/维护流程检查与原21项检查通过。未做受支持的浏览器视觉验收。

# 深雨知路 · 第二版交互Demo

已发布项目ID保持不变。左侧七个面板：出行看板、地点风险、快捷查询、查询记录、用户反馈、关于与设置、事件追踪与复盘。

## 第二版交付
- 自由地点文本、可增删途经点、经纬度输入；旧输入切换面板/交通方式时保留。
- 多方案管理、删除、重新查看、并排比较；查询记录保留快照。
- 公开OSRM驾车参考路线与时长（服务可用且匹配坐标时）；不包含洪涝、封路与实时拥堵。历史模式不使用当前路网重建历史路线。
- 公共交通/步行目前只保存待规划地点方案，不虚构班次、步行路线、距离或时长。
- 隐患按明确地名与已取得道路名称自动关联；删除手动街道选择和全罗湖记录兜底；不能声称覆盖完整沿线。
- Open-Meteo模型天气查询及计划时段预报（非本地站点实测和官方预警）；历史再分析不提前进入严格看板。
- 天气与隐患上排，路线方案+位置图下排；规则建议整合看板。
- 官方资料和用户线索分开；图片上传、重编码缩放、悬停预览、点击放大；用户自评与核验状态分开。
- 现场反馈进度只显示本地保存、待核验；严重反馈加急标记不等于官方已上报。
- 查询分享：URL片段快照，站点保持私有，接收者仍需权限。默认不含私人反馈图片，不自动开放站点。
- 导出勾选内容，提供HTML预览/纯文本/PNG信息卡；HTML和PNG可包含地图及用户选择的本地图片，始终保留依据和适用范围。
- 字体设置、浏览器语音试播、提前提醒偏好。推送/后台提醒未接通。
- 历史事件选择和日期范围；当前专业事件不将用户报告当预测真值；专家解释没有取得时保持待补。

## 未接通
真实生成式AI、完整地理编码、完整风险点定位、公共交通/步行路由、动态官方预警与水位、商场实时营业/拥挤、共享反馈、后台通知、正式官方上报。未以假数据填充。

## 检查与运行
无构建步骤，dist为完整静态站点。入口index.html加载data.js、app.js（基础工具）和v2.js（第二版逻辑）。

检查：`node --check dist/v2.js`、`node tests/check-v2.cjs`。21项程序检查涵盖数据模式、发布时间、行程状态、删除与恢复、比较、选项导出和分享范围。真实公共驾车服务与天气接口已在开发环境查询；未做受支持的浏览器视觉QA。测试用网络响应不代表真实路况验证。

## 继续工作
优先核验地点与沿线风险位置，接通正式路线/地理编码服务、AI检索后端与共享反馈。浏览器验收后修正视觉或实际交互问题。source.zip包含当前代码与说明。准备数据脚本中的旧scratch路径仅用于重新制作资料，dist运行不依赖它。

## 来源
官方罗湖街道风险指引2023—2026（40条版本记录）、18条历史事实、11个OSM公开坐标、ERA5事后背景。OSM需署名ODbL；Open-Meteo按其条款署名和使用。OSRM公共服务器适合演示，稳定性与配额需另核验，不作为已签约路线服务。资料收集2026-10-11。


## v15 consolidated update (2026-10-13)

Existing Site identity and owner-private audience retained. Context controls merged into one toolbar with current clock or editable historic clock and as-of/reconstruction view. Help/account do not inherit historical context controls. Scene switching retains the active module, isolates and persists text drafts, preserves round-trip controls, and does not reset weather for an already selected mode.

Map leg controls are compact, aligned, and availability-aware. Weather export location derives from the fetched weather snapshot. Risk detail appears before long-term hazard explanation and concrete suggestions. Original official stop sections and named professional attribution reviewed against published sources; this is document checking, not live field verification.

Feedback supports a complete prefilled fictional exercise, separate personal/example lists, a vertical current-stage timeline, separate conclusion/reply, and source URL validation for public-news records. Current scenes have explicit historical-context exercise cases; fictional feedback is excluded from route evidence. Samples are not resurrected after deletion. Tasks retain existing role/state guards, structured completion and two-sided review. Maintenance overview routes to distinct disaster, task, material and software queues. Software timestamps and replies are independent of historical clock.

Reading preferences contain language and an explicit no-reminder choice. Automatic notifications, shared server storage, formal accounts and real support delivery remain outside this browser-local Demo.

Validation: legacy suites and full-module check-v15.cjs cover transitions, drafts, weather snapshots, two-leg map controls, feedback verification/time projection, independent software handling and task/material queues. No real browser visual/tile/file-upload or PDF rendering QA was available.


## v16 task publication, giving and reminders (2026-10-13)

Complete task-publishing exercise: fields, valid deadline and explicit completion criteria; user drafts preserved; fictional marker retained in submitted/reviewed tasks.

`community-giving.js`: three AI-illustrated fictional projects, target budgets, cent-exact allocations, idempotent simulated submission, per-record procurement/delivery/follow-up and spent/unspent accounting. No payment endpoint or real receipt. Historical records and later stages remain subject to cutoff; rewinding cannot overwrite future changes.

`reminders.js`: explicit off, departure lead, selectable in-app/browser/sound channels, topic preferences, Beijing quiet hours, manual test and local message history. Browser permission is requested only on an explicit user click. Current eligible planned departures poll while the page is open and deduplicate reminders. Feedback/task/giving/software changes create selected local messages. Background push, email and SMS remain disconnected.

Maintainer identity persists across scene entry/exit, changing clocks/views/scenarios, guide use and reload. Maintenance guide explains maintenance modules. Software maintenance remains independent of historical controls.

Images: generated with built-in imagegen; local assets and full prompts recorded in ASSET_PROMPTS.md.

Validation: legacy tests plus 34 integration checks. Browser visual/tile, actual notification permissions, autoplay and exported-file rendering QA unavailable. Existing Site and owner-private audience retained.


## v17 identity entry, contextual guide, time glossary, walking and progress pictures

- New tab openings require an explicit user/maintainer choice even when old localStorage contains a role. The current tab session preserves the chosen identity on refresh and retains the maintainer queue. No implicit guest entry from the welcome dialog. Entering either role starts a guide beside the relevant module.
- Sixteen user topics and eight maintainer topics explain purpose, relevant controls and interpretation boundaries. Guides are inline near their module target, before long forms/cards so users can read instructions before acting; context/heading guides follow the header. They are not fixed at the bottom-right corner.
- `experience.js` owns one 1-second real-clock update for every live clock. Historical cutoff is separately editable. Clock changes do not re-render forms/maps. Visibility resume refreshes immediately.
- Clickable glossary covers sliding rainfall windows, rain intensity, accumulation, train effect, waterlogging, reanalysis, thresholds and straight-line distance. Sliding window definitions reference Shenzhen Meteorological Bureau's knowledge base. Underlying source summaries and measurements are not altered.
- `walking-route.js` uses the dedicated FOSSGIS foot graph, validates geometry/distance/duration, walking modes and snap offsets, rate-limits requests to at most one per second per page, and memoizes exact-coordinate queries. No driving/straight-line substitution. Foot instructions and source survive export.
- Real API checks on 2026-10-13 returned walking-only routes and permissive CORS. Verified reference distances: 罗湖→深圳人民医院 4012.2 m, reverse 4012.2 m, 罗湖→黄贝岭 3193.9 m. These are current network references, not 2023 flood-state observations. Exact cached samples remain usable when online service fails. Unknown uncached pairs remain unavailable.
- Historical walking time is labelled normal-conditions reference and cannot infer disaster arrival/return; explicit return time is required. Changing transport cancels pending old-route writes.
- Three new AI progress illustrations appear only when simulated procurement, delivery and follow-up stages are visible. Images are labelled fictional concepts, never receipts or actual distribution proof. Full prompts and paths are in ASSET_PROMPTS.md.
- Validation: legacy regressions and 34 v17 integration checks. A fresh bootstrap fixture uses the actual entry-gate flag and session behavior. Real browser visual/map/file/notification checks remain unavailable.
# 第20版比赛收敛说明（2026-10-14）

当前入口明确深圳罗湖居民的暴雨往返决策，保留全部现有模块。重点流程：选择身份→2023公告情境／现在往返→两程影响等级→具体依据→报告→反馈核验。

AI展示采用本次制作助手辅助抽取并对照官方公告的离线样本，不冒充实时AI或独立用户研究；样本和本地体验回答可导出。强降雨概率与综合出行影响分开。详见 `FIXES_V20.md` 和 `tests/check-v20.cjs`。

