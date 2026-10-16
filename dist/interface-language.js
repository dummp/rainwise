'use strict';
// Interface translation never changes stored enum values or user-entered fields.
const V18EN=Object.fromEntries(`
深雨知路|RAINWISE
现在与历史|Now and history
现在|Now
历史|History
用户|User
维护人员|Maintainer
游客|Guest
选择你的入口|Choose your role
选择身份|Choose a role
体验入口 · 无需创建账号|Demo access · No account required
请先选择身份。用户和维护人员都可直接体验。|Choose a role to explore the user or maintenance workspace.
请选择身份后进入|Choose a role to continue
进入用户体验|Explore as a user
进入维护人员体验|Explore as a maintainer
查行程、比较方案、提交反馈|Plan trips, compare routes and submit observations
查看反馈、优先核验、更新处理进度|Review observations and update progress
无需注册|No registration required
官方资料可追溯|Linked public sources
反馈进度可查看|Track observation progress
切换入口|Change role
切换身份|Change role
用户 · 游客体验 ⇄|User · Demo role ⇄
用户 · 游客体验|User · Demo role
维护人员 · 游客体验|Maintainer · Demo role
游客 · 维护人员|Guest · Maintainer
不是正式权限认证|Demo role, without production authentication
同一浏览器内处理用户反馈|Shared observation records within this browser
反馈与处理记录：本浏览器共享|Observation and review records are shared in this browser
维护端 /|Maintenance /
维护工作台|Maintenance workspace
维护总览|Maintenance overview
灾情核验|Observation review
任务审核|Task review
材料申请|Document requests
软件维护|Software maintenance
隐患资料|Hazard records
操作记录|Activity log
查看待办数量，进入对应队列处理。|View pending work and open the relevant queue.
灾情待核验|Observations awaiting review
任务待审核|Tasks awaiting review
材料待审核|Documents awaiting review
软件待处理|Software issues awaiting review
工作范围|Workspace responsibilities
灾情核验处理地点、时间和依据；任务审核处理需求与交付标准；软件维护处理功能故障、界面建议与维护回复。|Review observations and evidence, check task requirements and deliverables, and respond to software issues.
游客演示身份在本浏览器内共享记录。历史灾情按模拟时刻显示；软件记录始终使用实际时间。|Demo roles share records in this browser. Historical observations follow the selected cutoff; software records use real time.
刷新反馈|Refresh records
打开处理队列 →|Open queue →
用户自评、维护核验和官方确认分别保留|User assessment, maintenance review and official confirmation remain separate
出行看板|Travel dashboard
地点风险|Place information
事件追踪与复盘|Events and retrospective
快捷查询|Quick search
灾情反馈|Disaster observations
互助与任务|Community help and tasks
查询记录|Saved queries
账户与设置|Account and settings
帮助与软件反馈|Help and software feedback
真实现在时刻（自动更新，不可编辑）|Current time (updates automatically)
模型天气参考 · 非官方预警|Model weather · Not an official warning
场景与导览|Scene and guide
了解模块用途|Explore the modules
了解各模块用途|Explore the modules
现在场景|Current scene
历史场景|Historical scene
当时可知|Known at the time
事后复盘|Retrospective
当时视角|As-of view
完整复盘|Full retrospective
当时公开资料|Published at the cutoff
当前参考资料|Current reference data
真实当前时间|Actual current time
资料截止|Information cutoff
模拟时刻|Simulated time
模拟当前时刻（北京时间）|Simulated time (Beijing)
现在与历史场景|Now and historical scenes
现在场景展示当前模型天气与道路参考；历史场景按选定时刻过滤已公开资料。顶部随时切换，历史示例与普通记录分开。|Now shows current model weather and reference roads. History filters public information by the selected cutoff. Records for the two scenes are kept separate.
上方选择的是资料场景，真实现在时间始终独立显示。|The scene controls the information shown. Actual current time is displayed separately.
现在：看当前模型天气和当前道路参考。|Now: current model weather and reference roads.
历史：调整模拟时刻；“当时可知”按发布时间筛选，“事后复盘”可看后续记录。|History: choose a cutoff. As-of view filters by publication time; retrospective view includes later records.
切换场景保留当前模块，普通与历史测试记录分开。|Changing the scene keeps the current module. Current and historical demo records stay separate.
规划行程|Plan a journey
你的行程，多一份依据|More context for your journey
你的下一趟行程|Your next journey
填行程、看路径、核对风险，再决定如何出发。|Plan a journey and compare its route, evidence and travel advice.
天气与出行安排|Weather and travel plans
天气、趋势与数据时间|Weather, trends and timestamps
天气与趋势|Weather and trends
天气地点|Weather location
气温|Temperature
气温与天气|Temperature and weather
降水趋势|Precipitation trend
降水量|Precipitation
风速|Wind speed
刷新天气|Refresh weather
导出天气报告|Export weather report
展开24小时趋势与数据表|Show 24-hour trends and data table
查询天气后显示未来24小时气温、天气与降水。|Query weather to view the next 24 hours of temperature and precipitation.
有坐标时查询该代表点模型天气；模型数据不是本地站点实测。|Weather is queried at the reference coordinates. Model data is not a local station observation.
气温与降水分图展示，时间和单位分别标注。|Temperature and precipitation use separate charts with timestamps and units.
模型天气不是现场观测或官方预警。|Model weather is separate from field observations and official warnings.
查询时间、数据时间和刷新时间分别保留。|Query, data and refresh timestamps are shown separately.
出发点|Origin
目的地|Destination
途经点|Via point
需要返回|Include a return trip
去程|Outbound
返程|Return
完整往返|Round trip
往返|Round trip
现在出发|Depart now
计划出发|Planned departure
立即出发|Depart now
计划时段|Planned time
出行目的|Journey purpose
出行目的与地点说明|Purpose and location notes
日常出行|Everyday travel
就医|Medical visit
上班|Work
上学|School
其他|Other
公共交通|Public transport
步行|Walking
驾车|Driving
＋途经点|＋ Via point
＋快捷地址|＋ Saved address
查询并添加出行方案|Find and add a travel option
出行方案|Travel options
行程与时间|Journey and time
运营与路线|Service and route
已关联依据|Related evidence
天气参考|Weather reference
小时降水|Hourly precipitation
目的地停留|Stay at destination
预计用时|Estimated duration
返程出发时刻|Return departure
返程交通方式|Return transport
时间与交通方式|Time and transport
往返对比|Round-trip comparison
行程风险与安排|Journey risk and advice
往返风险与安排|Round-trip risk and advice
具体隐患与运营影响|Hazards and service impacts
长期隐患是什么？|What are long-term hazards?
长期隐患资料|Long-term hazard records
安排建议|Travel advice
数据范围与判断方式|Data coverage and method
运营公告、地点隐患和安排建议分别展示。|Service notices, place hazards and travel advice are shown separately.
强降雨概率按集合天气预报估算，计算说明可展开查看。道路积水还受地形、汇水和排水能力影响，雨量与水深是不同指标。|Heavy-rain probability is estimated from ensemble forecasts. Expand the method for details. Terrain, runoff and drainage affect standing water, so rainfall and water depth are different measures.
查询行程后，这里分别展示两程的运营影响、具体隐患和安排建议。|Query a journey to see service impacts, hazards and advice for each leg.
等待关联你的行程。|Journey information will appear after a query.
填写起终点和出发时间后即可查询；返程可独立选择交通方式。|Enter an origin, destination and departure time. Return transport can be selected independently.
现有防汛指引中暂无该地点或道路的专项记录。|The collected flood guides contain no dedicated record for this location or road.
深圳罗湖 · 出行地图|Luohu, Shenzhen · Journey map
深圳罗湖 · 地点地图|Luohu, Shenzhen · Place map
深圳 / 罗湖区|Shenzhen / Luohu
深圳 · 罗湖|Shenzhen · Luohu
深圳罗湖区 · 出行信息Demo|Luohu, Shenzhen · Travel information demo
深圳气象官方发布|Shenzhen official weather information
深圳人民医院|Shenzhen People's Hospital
罗湖|Luohu
黄贝岭|Huangbeiling
老街|Laojie
天气|Weather
出行地图|Journey map
地点地图|Place map
地图与比较|Map and comparison
地点与周边详情|Place and surroundings
填写行程并查询，地图会同步更新。|Query a journey to update the map.
查询后显示路线与起终点|A query shows the route, origin and destination
回到罗湖全图|Show all of Luohu
拖动地图、缩放，点击地点标记或地图位置查看资料|Pan, zoom or select a marker to view place information
状态未知|No current status data
地点|Location
查看地点|View location
在OpenStreetMap打开此区域 ↗|Open area in OpenStreetMap ↗
↑ 北|↑ North
红：确认服务受限|Red: confirmed service restriction
黄：长期隐患关注|Yellow: long-term hazard record
橙：区域影响提示|Orange: reported regional impact
灰：暂无现场观测|Gray: no field observations
曲线：道路／轨道参考 · 未取得路径时不连线|Lines: road or rail references; no line is drawn without a route
官方资料与用户线索分开呈现|Public sources and user observations are shown separately
行政区范围仅用于地理定位，不是积水范围|District boundaries indicate location, not flooded areas
当前方案位置|Current travel option
路线参考|Reference route
比较多个方案|Compare options
分享查询|Share query
导出行程报告|Export journey report
生成报告|Generate report
生成本模块报告 ↗|Export this module ↗
资料截止与两程出发时刻分别保留。|The information cutoff and each departure time are retained separately.
生成天气专属报告|Export a weather-only report
历史查询与复盘|Historical query and retrospective
选时刻看当时，选完整复盘看全程；两种视角共享同一资料库。|Choose a cutoff for an as-of view, or a full retrospective for the complete archive.
过去事件|Past events
正在发生|Ongoing events
事件时间线|Event timeline
节点详情与依据|Event details and evidence
选择情景导览|Choose a historical scenario
查看时刻（北京时间）|Viewing time (Beijing)
用此时刻查询出行|Query travel at this cutoff
真实事件 · 深圳|Real event · Shenzhen
2023年9月深圳极端强降雨|Extreme rainfall in Shenzhen, September 2023
当前视角已可见|Records visible in this view
隐患指引|Hazard guides
预测验证|Forecast evaluation
定性资料|Qualitative records
按公开时刻查询出行 →|Query travel at publication time →
专业预测与实际 · 验证范围|Professional forecasts and outcomes · Evaluation scope
发布与来源|Publication and source
预测内容|Forecast content
后来实际|Subsequent outcomes
可计算误差|Quantifiable error
不计算：范围或时段未完全匹配|Not calculated: location or time windows do not match
后来的观测不提前展示|Later observations are hidden in the as-of view
这条记录提到哪里？|Where does this record refer to?
资料地点|Locations in the record
资料地名|Place names in the record
标注并计算距离|Mark a location and calculate distance
清除我的标记|Clear my marker
先标注我的位置|Mark my location
行政区轮廓不是积水面 · 点位为公开参考坐标 · 区界来源：已收集DataV地理数据|District outlines are not flooded areas. Points are public reference coordinates; boundaries use collected DataV data.
也可点击地图标注我的位置；不会自动读取设备定位。距离为直线／区界距离，不是步行或驾车路程。|You can mark a location on the map. Device location is not read automatically. Distance is straight-line or to a district boundary, not a walking or driving route.
查询|Search
查询资料|Search records
自动使用当前关注方案和查询时间。|Uses the currently selected journey and query time.
这趟行程有哪些注意事项？ ↗|What should I consider for this journey? ↗
哪些停运公告与行程有关？ ↗|Which service notices apply to this journey? ↗
降雨量和积水深度怎么理解？ ↗|How do rainfall and water depth differ? ↗
当前还缺什么信息？ ↗|Which information is unavailable? ↗
资料检索可用，生成式AI尚未接通。|Record search is available; generative AI is not connected.
提交灾情反馈|Submit an observation
记录现场线索，查看核验结论与回复。|Submit observations and track review conclusions and replies.
反馈类型|Observation type
反馈地点|Observation location
观测时间|Observation time
观测时间（北京时间）|Observation time (Beijing)
提交时间|Submission time
用户自评|User assessment
信息来源|Information source
积水与内涝|Standing water and flooding
交通受限|Transport restriction
设施受损|Damaged facilities
其他现场情况|Other field conditions
一般影响|Minor impact
明显影响|Significant impact
疑似紧急危险|Potential immediate danger
本人观察|First-hand observation
转述，尚未核实|Second-hand information, not verified
公开新闻／公告（非本人观测）|Published news or notice (not first-hand)
原始依据链接（新闻来源必填）|Source URL (required for news)
情况描述|Description
情况描述：|Description:
现场图片（可选）|Photo (optional)
填入演示内容|Fill demo example
提交演示反馈并查看进度|Submit demo and track progress
提交并查看进度|Submit and track progress
清空，填写自己的反馈|Clear and write your observation
文本草稿自动保存；离开页面后图片需要重新选择。|Text drafts save automatically. Select photos again after leaving the page.
软件使用问题请到|For software issues, visit
完整记录与回复|Full record and replies
删除记录|Delete record
申请整理材料|Request a document
查看时间线与回复|Show timeline and replies
打开反馈来源原文 ↗|Open original source ↗
原始依据：|Original source:
记录编号：|Record ID:
演示进度根据当时情况编写。|Demo stages were written from the historical context.
根据当时情况编写 · 虚构演示|Fictional demo based on the historical context
根据当时情况编写 · 虚构示例|Fictional example based on the historical context
根据2023年暴雨当时情况编写。身份、反馈和回复均为虚构，用于测试本地流程。|Roles, observations and replies are fictional examples based on the 2023 rainfall event, for testing this local workflow.
根据2023年暴雨当时情况编写 · 虚构演示。已填好假设内容，可直接提交测试；不是当前实况。|A complete fictional example based on the 2023 event is ready to submit. It is not a current observation.
用户反馈处理|Observation processing
用户上传的文字和图片在这里显示；自评严重程度与核验结果独立保留。|View submitted text and photos. User assessments remain separate from review results.
导出待核验摘要|Export observation summary
处理状态|Review status
严重程度／优先级|Severity / Priority
全部|All
加急|Urgent
普通|Normal
筛选|Filter
查看与处理 →|View and review →
最近处理说明|Latest review note
反馈详情与处理|Observation details and review
处理优先级|Review priority
核验结论|Review conclusion
尚未形成结论|No conclusion yet
属实（核对范围内）|Confirmed within reviewed scope
部分属实|Partially confirmed
不属实|Not confirmed
资料不足|Insufficient evidence
核验依据／处理意见|Evidence / Review note
依据链接 · 可选|Evidence URL (optional)
处理结果／下一步 · 可选|Outcome / Next step (optional)
保存处理进度|Save review progress
待核验|Awaiting review
核验中|Under review
正在核实|Under review
已核验|Reviewed
已更新|Updated
已关闭|Closed
已提交|Submitted
处理结束|Closed
核验结论与回复|Conclusion and reply
维护人员正在核对来源与反馈内容。|A maintainer is checking the source and observation.
流程已结束，记录仍可查看。|This workflow is closed. The record remains available.
我的材料申请|My document requests
提交申请后由维护人员审核，可查看意见、补充内容及下载材料。|Track maintenance review, read comments, add information and download approved documents.
在反馈记录中点击“申请整理材料”即可开始。|Choose Request a document on an observation to begin.
申请整理材料|Request a document
申请编号|Request ID
关联反馈|Linked observation
申请时间|Request time
申请用途|Intended use
希望包含的内容|Requested contents
原始反馈、来源与核验进度|Original observation, source and review progress
完整记录与图片（如有）|Complete record and photos, if available
补充说明|Additional notes
审核意见|Review comments
申请状态|Request status
待维护审核|Awaiting maintenance review
已审核，可导出|Approved for export
退回补充|Returned for more information
查看申请进度|View request progress
查看申请与审核|View request and review
材料申请详情与进度|Document request details and progress
审核结果|Review outcome
审核通过，可导出|Approve for export
保存审核意见|Save review comments
补充后重新提交|Update and resubmit
下载材料|Download document
材料用于自行留存或沟通。不会自动提交官方，也不生成官方受理回执。|Documents are for your records or communication. They are not sent to authorities and are not official acknowledgements.
查看用户填写的申请、原始反馈与来源，记录审核意见。|Review the complete request, original observation and sources, then record your decision.
暂无此状态的申请。用户提交后会同步到这里。|No requests with this status. New submissions appear here.
任务标题|Task title
任务分类|Task category
任务地点|Task location
地点坐标（可选）|Coordinates (optional)
预计用时（分钟）|Estimated time (minutes)
接单截止时间（可选）|Acceptance deadline (optional)
难度（发布者自评）|Difficulty (publisher assessment)
拟定奖励|Proposed reward
无偿互助|Volunteer help
积分|Points
金额（元）|Amount (CNY)
任务内容与完成标准|Requirements and completion criteria
我的位置（仅用于直线距离，可选）|My location (optional, for straight-line distance)
预览距离|Preview distance
没有具体坐标时不估算距离。|Distance requires specific coordinates.
发布任务|Publish a task
我的任务|My tasks
互助大厅|Task hall
填入完整演示任务|Fill a complete demo task
清空，填写自己的任务|Clear and write your task
提交任务，等待审核|Submit for review
清空草稿|Clear draft
文本草稿自动保存。|Text drafts save automatically.
发布私人任务后进入维护审核。不要安排涉水、进入封闭区域等危险行为。|Private tasks go to maintenance review. Tasks must not involve wading or entering closed areas.
下一步：维护人员审核|Next: maintenance review
下一步：等待接单者提交材料|Next: awaiting the worker's completion evidence
下一步：等待发布者确认|Next: awaiting publisher confirmation
下一步：完成任务并提交材料|Next: finish the task and submit evidence
可查看要求后接单|Read requirements and accept
等待其他人接单|Awaiting another person to accept
接受任务|Accept task
提交完成材料|Submit completion evidence
退出接单|Withdraw from task
核对并确认完成|Review and confirm completion
退回补充材料|Request more evidence
模拟发布者确认（演示）|Simulate publisher confirmation
评价对方|Rate the other participant
取消任务|Cancel task
查看材料与时间线|View evidence and timeline
审核中|Awaiting approval
审核未通过|Not approved
待接单|Open for acceptance
已接单|Accepted
待确认完成|Awaiting completion confirmation
已完成|Completed
已取消|Cancelled
已完成，已评价|Completed and rated
任务详情与时间线|Task details and timeline
任务时间线|Task timeline
查看并审核任务|View and review task
维护人员可审核任务，查看全部进度与历史意见。|Maintainers can review tasks and view all stages and review comments.
任务分类|Task category
地点坐标|Coordinates
接单截止时间|Acceptance deadline
审核通过|Approve
审核未通过，修改后重新提交|Return for changes and resubmission
保存任务审核|Save task review
此记录无审核意见|No review comments on this record
暂无任务。用户发布后会同步到这里。|No tasks yet. User submissions appear here.
距我的位置|Distance from my location
距离未知|Distance unavailable
发布者：|Publisher:
背景来源：|Background source:
原始公告 ↗|Original notice ↗
（虚构身份／演示流程）|(Fictional role / Demo workflow)
现场拍照与信息核实|Photos and information checking
物资运送|Supply delivery
代取物品|Item pickup
出行陪伴|Travel assistance
设备协助|Device assistance
简单|Easy
一般|Moderate
较复杂|Complex
公益项目|Community projects
我的模拟捐赠|My simulated donations
公益进展图片|Project progress images
全程模拟 · 不收款|Simulation only · No payments
一份支持，去向可见|See how your support is allocated
虚构项目 · 模拟支持|Fictional project · Simulated support
AI生成插画 · 不是救灾现场照片|AI illustration · Not an actual relief photo
模拟支持|Simulate support
模拟元|Simulated CNY
预算与用途|Budget and allocation
模拟公益用途反馈|Simulated use of funds
以下项目根据2023年暴雨当时的生活与社区协作情境编写。项目、预算、进展与回访均为虚构演示，不属于任何真实机构的募捐。|These fictional projects, budgets and progress updates are based on community needs during the 2023 event. They are not real fundraising campaigns.
选择项目与模拟金额 → 查看计划用途 → 手动推进采购、送达和回访 → 查看已模拟使用与剩余金额。|Choose a project and simulated amount, view allocations, advance procurement and delivery stages, then review use and remaining funds.
初始进度是虚构示例；你的模拟金额会计入本浏览器进度。|Initial progress is fictional. Your simulated support updates progress in this browser.
为家庭准备应急生活包|Emergency supplies for households
让临时安置多一份温暖|Essential supplies for temporary shelter
支持社区恢复与清理|Community cleanup and recovery
真实历史公益行动资料（与上述虚构项目分开）|Archived real relief actions (separate from fictional projects)
行动公告不等于募捐项目、到账金额或捐款收据。|An action notice is not a fundraiser, an account balance or a donation receipt.
个人资料、使用偏好与自己的记录。|Your profile, preferences and records.
编辑个人资料|Edit profile
显示名称|Display name
自定义账号标识|Demo account label
保存资料|Save profile
阅读与提醒偏好|Reading and reminder preferences
语言偏好|Language
字体大小|Text size
标准|Standard
较大|Larger
大字|Large
启用语音播报|Enable speech
试播当前概要|Read current summary
提醒设置|Reminder settings
提醒偏好|Reminder preferences
不提醒|No reminders
开启提醒 · 出发前15分钟|Remind 15 minutes before departure
开启提醒 · 出发前30分钟|Remind 30 minutes before departure
开启提醒 · 出发前60分钟|Remind 60 minutes before departure
提醒方式 · 可多选|Reminder channels · Select multiple
站内消息|In-app message
浏览器通知|Browser notification
提示音|Sound
保存到下方消息记录|Save to the message list below
需要授权；页面打开时发送|Requires permission; only while the page is open
短提示音，浏览器可能限制播放|Short sound; playback may be restricted by the browser
提醒内容|Reminder topics
计划出发提醒|Departure reminders
灾情核验与回复|Observation reviews and replies
任务进度|Task progress
模拟捐赠用途反馈|Simulated donation updates
软件维护回复|Software replies
非出发类消息在操作更新后提醒。|Other topics notify you after a related update.
开启免打扰|Enable quiet hours
开始|Start
结束|End
北京时间；免打扰期间只保留消息记录。|Beijing time. Quiet hours save messages without alerts.
申请浏览器通知授权|Request notification permission
测试已选提醒方式|Test selected channels
将消息标为已读|Mark messages as read
浏览器通知：浏览器不支持|Browser notifications: not supported
开启提醒后可测试，消息记录会保留在这里。|Enable reminders to test them. Messages are kept here.
提醒在页面打开时运行。关闭页面后的自动推送尚未接入；历史场景不自动触发真实出发提醒。|Reminders run while the page is open. Background push is not connected; historical scenes do not trigger real departure reminders.
短信、邮件与手机推送暂未接入，不显示为已发送。|SMS, email and mobile push are not connected.
我的快捷地址|My saved addresses
添加家／公司／学校|Add home, work or school
我的记录|My records
灾情反馈记录|My observations
软件反馈记录|Software feedback records
信誉与评价|Reputation and ratings
关于深雨知路与数据说明|About RAINWISE and its data
记录保存在本浏览器；普通与历史测试记录隔离。积分、支付、真实客服和后台推送未接入。|Records are stored in this browser. Current and historical demo records stay separate. Points, payments, live support and background push are not connected.
使用帮助|Help
我的软件反馈|My software feedback
提交软件反馈|Submit software feedback
使用帮助、功能问题和改进建议。灾情线索请使用灾情反馈页。|Help, software issues and improvement ideas. Use the observations page for disaster information.
可以体验什么？|What can I try?
地图与报告|Maps and reports
数据与风险|Data and risk
反馈与任务|Observations and tasks
账户与数据|Account and data
查找帮助|Search help
开始使用|Getting started
现在与历史有什么区别？|How do Now and History differ?
怎样重新打开导览？|How can I reopen the guide?
地图没有显示怎么办？|What if the map does not load?
导出报告包含哪些内容？|What can I include in an export?
为什么风险或雨量显示未知？|Why is risk or rainfall unavailable?
灾情反馈的进度在哪里？|Where can I track my observation?
完成任务后为什么还没结束？|Why is a finished task still pending?
换设备为什么看不到记录？|Why are records missing on another device?
提前提醒会自动推送吗？|Are departure reminders pushed automatically?
功能问题与软件建议，使用实际时间记录处理。|Track software issues and suggestions using actual current time.
暂无软件反馈。用户可在独立的帮助页面提交软件问题。|No software feedback yet. Users can submit issues on the help page.
维护记录原则|Review principles
说明复现结果、处理动作与建议；未修复的问题保持处理中，不能用灾情核验状态代替软件处理状态。|Record reproduction results, actions and advice. Keep unresolved software issues in progress, using their own status workflow.
官方原始资料只读保留；维护补充记录独立标注。|Official source records remain read-only; maintenance additions are labelled separately.
官方指引目录 · 罗湖区|Official guide directory · Luohu
街道|Subdistrict
原始风险描述|Original hazard description
来源|Source
原件 ↗|Original document ↗
新增维护补充记录|Add a maintenance note
信息来源链接 · 可选|Source URL (optional)
隐患描述与待核实事项|Hazard description and review notes
保存维护草稿|Save maintenance draft
独立记录，不覆盖官方原文|Separate record; does not overwrite official sources
维护补充记录|Maintenance notes
尚无维护草稿。|No maintenance drafts yet.
本地补充不是官方确认，当前不会自动作为出行推荐依据。|Maintenance drafts are not official confirmation and are not used automatically for route advice.
保留处理动作、时间与说明；本地记录不作为不可篡改审计。|Keeps actions, timestamps and notes. Local records are not a tamper-proof audit.
导出记录|Export log
时间|Time
体验身份|Demo role
操作|Action
记录|Record
说明|Notes
没有预填操作记录，实际处理后显示。|No prefilled audit entries. Actions appear after processing.
未取得|Unavailable
未填写|Not provided
旧记录未填写|Not provided in the legacy record
当前|Current
已回复|Replied
语音|Speech
关闭|Close
上一步|Previous
下一步|Next
完成导览|Finish guide
关闭导览|Close guide
返回|Back
未设置|Not set
查看概率计算、等级与数据来源|Probability method, levels and sources
刷新概率|Refresh probability
强降雨概率（模型估算）|Heavy-rain probability (model estimate)
需关注|Attention advised
较低|Lower
较高|Elevated
高|High
模型估算|Model estimate
模型概率|Model probability
提示等级|Advisory level
强降雨模型信号较少，保留雨具并避开已有封闭或积水区段。|Few model members show heavy rain. Carry rain protection and avoid closed or flooded areas.
预留调整行程的时间，减少经过低洼路段。|Allow time to change plans and reduce travel through low-lying areas.
非必要户外行程建议延后，必要事项优先远程办理。|Postpone non-essential outdoor travel; handle essential matters remotely where possible.
建议延后非必要出行，选择室内安全场所，遵从官方管制。|Postpone non-essential travel, stay in a safe indoor location and follow official restrictions.
2023年当时的集合预报成员未归档，历史概率不补算。|The 2023 ensemble members were not archived; no historical probability is fabricated.
集合天气预报正在加载…|Loading ensemble forecast…
查询行程或刷新概率后显示。|Query a journey or refresh the probability.
该地点缺少具体坐标，无法计算地点天气概率。|This location needs specific coordinates for a weather probability.
集合天气查询未成功，当前不显示概率。|The ensemble request failed; no probability is shown.
出发时段超出预报范围，或完整预报成员不足。|The departure window is outside forecast coverage, or too few members are complete.
降雨量描述一段时间内落下的雨水；道路积水还受地形、汇水和排水能力影响，因此不能由雨量直接推算水深。|Rainfall measures precipitation over time. Terrain, runoff and drainage also affect standing water, so rainfall alone cannot determine water depth.
`.trim().split('\n').map(line=>{const i=line.indexOf('|');return [line.slice(0,i),line.slice(i+1)]}));
function v18English(text){const trimmed=String(text).trim();if(V18EN[trimmed])return text.replace(trimmed,V18EN[trimmed]);let t=String(text);const tokens=['强降雨危险概率','已核实','观测时间','申请时间','申请编号','用户自评','核验结论','发布者','已回复','待核验','正在核实','当前阶段','记录编号','消息记录','条未读','我的反馈','我的模拟捐赠','演示反馈与阶段示例','拟定奖励','距我的位置','北京时间','当时视角','当前参考资料','现在模式','历史模式','模型估算','去程','返程'];const supplement={'已核实':'Reviewed','当前阶段':'Current stage','消息记录':'Messages','条未读':'unread','我的反馈':'My observations','演示反馈与阶段示例':'Demo observations and stages','记录编号':'Record ID','北京时间':'Beijing time','现在模式':'Now scene','历史模式':'Historical scene','发布者':'Publisher'};for(const k of tokens)t=t.split(k).join(V18EN[k]||supplement[k]||k);t=t.replace(/(\d+)分钟/g,'$1 min').replace(/(\d+)条/g,'$1 records').replace(/(\d+)个方案/g,'$1 options').replace(/([\d.]+)模拟元/g,'$1 simulated CNY').replace(/· 发布 /g,'· Published ').replace(/^发布 /,'Published ').replace(/ · 原文 ↗/g,' · Original source ↗').replace(/核验中/g,'Under review').replace(/属实（核对范围内）/g,'Confirmed within reviewed scope').replace(/未设置/g,'Not set').replace(/尚未形成结论/g,'No conclusion yet');return t}
function v18Localize(root=document){if(V5.profile.language!=='English'||!document.createTreeWalker)return;for(const option of root.querySelectorAll('option'))if(!option.hasAttribute('value'))option.setAttribute('value',option.textContent);const walker=document.createTreeWalker(root,4);let node;while((node=walker.nextNode())){if(node.parentElement?.closest('script,style,textarea,[data-original],.sourceoriginal,.leaflet-pane'))continue;const translated=v18English(node.nodeValue);if(translated!==node.nodeValue)node.nodeValue=translated}for(const el of root.querySelectorAll('[placeholder],[title],[aria-label]'))for(const key of ['placeholder','title','aria-label']){const value=el.getAttribute(key);if(value)el.setAttribute(key,v18English(value))}}
const v18LanguageRender=vRender;vRender=function(){v18LanguageRender();if(V5.profile.language==='English'){const footer=document.querySelector('.sidefoot');footer?.insertAdjacentHTML?.('beforeend','<p class="muted" style="font-size:11px">English interface. Source documents and submitted text retain their original language.</p>')}if(document.documentElement?.setAttribute)document.documentElement.setAttribute('lang',V5.profile.language==='English'?'en':'zh-CN');v18Localize(document.getElementById('app')||document)};
const v18LanguageDialog=vDialog;vDialog=function(title,body){v18LanguageDialog(title,body);v18Localize(document.getElementById('source-dialog')||document)};
const v18LanguageToast=toast;toast=function(text){v18LanguageToast(V5.profile.language==='English'?v18English(text):text)};
document.addEventListener('change',e=>{if(vFormId(e.target)!=='v15-language')return;e.stopImmediatePropagation();if(!['中文','English'].includes(e.target.value))return;V5.profile.language=e.target.value;if(save('sy-v5-profile',V5.profile)){vRender();toast(e.target.value==='English'?'Interface language changed to English. Source documents and submitted content retain their original language.':'界面已切换为中文。')}},true);
if(typeof MutationObserver!=='undefined'){let translating=false;const observer=new MutationObserver(()=>{if(translating||V5.profile.language!=='English')return;translating=true;v18Localize(document);observer.takeRecords();translating=false});observer.observe(document.body,{childList:true,subtree:true,characterData:true})}
// Contextual guides are translated as complete sentences.
const V18GUIDE_EN=[
['Now and history','The selected scene controls the information shown. Actual time remains separate.',['Now shows current model weather and reference roads.','History offers an as-of cutoff and a retrospective with later records.','Switching scenes keeps the module and separates current and historical demo records.']],
['Weather, trends and timestamps','View the weather location, timestamps, values and hourly trends.',['Change the weather location and refresh its forecast.','Expand temperature and precipitation charts or view the hourly table.','Current model data is not a field observation. Select technical terms for definitions.']],
['Plan a complete journey','Set departure time, locations and return arrangements here.',['Choose an immediate or planned departure, then enter the route locations.','Choose transport separately for each leg and set the return departure.','Query again after changing inputs to update the saved options and map.']],
['Map and option comparison','Locate reference routes and compare travel options.',['Select an option card and choose outbound, return or round-trip views.','Map markers retain the input locations; walking routes show road access points.','Compare selected options or export a report with a basemap. Routes do not confirm flood-time access.']],
['Journey impacts and advice','Review service impacts, place hazards and sources for each leg.',['Notices, specific hazards and travel advice are shown separately.','Long-term guides describe known locations, not current standing water.','Expand the ensemble probability method. Rainfall, runoff and drainage determine different aspects of risk.']],
['Place and surrounding area','Use this map for location information, alongside the journey map.',['Service notices, field observations and long-term hazards are separate.','Nearby distances are straight-line references; building coordinates may not mark an entrance.','Set a mapped location as the origin or destination and query a journey.']],
['Understand an event timeline','Select a node to read its location, publication time and sources.',['As-of view hides later publications; retrospective view includes them.','Mark your location to compare straight-line distance or district coverage.','District boundaries are not flooded areas. Rainfall totals and intensity differ.']],
['Search records and saved queries','Find collected evidence or revisit saved journey snapshots.',['Search for a location or question.','Restore, compare, share or export saved queries.','Historical snapshots retain their cutoff and do not include later information as known evidence.']],
['Submit an observation or try an example','The form includes location, observation time, source, impact and description.',['Submit the prefilled demo or clear it to report your own observation.','Published news requires an original source link; photos are optional.','Submission shows a record ID and review progress. Demo labels are retained.']],
['Review progress, conclusions and replies','Your observations and fictional examples have separate lists.',['Track submission, review, conclusion and reply stages.','Maintenance reviews share records with users in this browser.','Rewinding history hides later results. Local saving is not official acceptance.']],
['Task hall','Read requirements, location, deliverables and progress.',['Filter task types or enter a location for straight-line distance.','Accepted tasks appear in My tasks.','Fictional tasks have no real institution commission or payment.']],
['Publish a task','A complete example lets you try submission and review.',['Submit the example or clear it to write your own task.','State the title, location, deadline, duration and completion criteria.','Maintenance approval is required before acceptance.']],
['My tasks: evidence and confirmation','Available actions depend on your role and the task stage.',['Workers submit the result, evidence, completion time and remaining issues.','Publishers confirm completion or request more evidence with reasons.','Each participant can rate once after confirmation; withdrawals retain history.']],
['Projects and simulated support','Projects, budgets and images are fictional demonstrations.',['Read allocations and choose a simulated amount without making a payment.','Your records show planned, used and remaining simulated funds.','Advance procurement, delivery and follow-up to view stage illustrations.']],
['Account, reading and reminders','Manage profile, saved addresses, reading and reminders here.',['Set language and font size; choose reminder topics and channels or disable reminders.','Browser notifications require explicit permission; quiet hours use Beijing time.','Background push and cross-device record sharing are not connected.']],
['Help and software feedback','Report software issues here; disaster observations use their own page.',['Search help or submit reproduction steps and a screenshot.','Track maintenance replies and export your software issue record.','This module uses actual time, independent of the historical scene.']]
];
const V18MAINT_GUIDE_EN=[
['Maintenance overview','View pending work and open the relevant queue.',['Observations, tasks, documents and software have separate queues.','Changing the scene or cutoff retains your maintenance role.']],
['Observation review: original evidence','Read observation location, time, photos and source.',['Filter by status, priority or text.','User impact assessments remain separate from maintenance conclusions.']],
['Review conclusions and replies','Review stages, conclusions and replies save separately.',['Record evidence, links, conclusions and comments.','Reviewed records require a conclusion; users see the saved timeline and reply.','Rewinding history hides later replies and retains your role and module.']],
['Task review','Check requirements and completion criteria and record a decision.',['Approve for acceptance or return with specific changes.','Fictional tasks retain their labels and do not imply institution authorization.']],
['Document requests','Review requests for traceable observation documents.',['View all request fields, original observations and sources.','Export approval is not official submission and produces no official acknowledgement.']],
['Software maintenance','Software issues use actual current time.',['Read reproduction steps and expected and actual results, then reply.','Replies appear on the user help page and are unaffected by a historical cutoff.']],
['Hazard records','Official guides are read-only; additional notes stay separate.',['View subdistrict guides and original documents.','Maintenance drafts do not imply official confirmation or replace sources.']],
['Activity log','Review processing actions and comments.',['Each saved action records a timestamp and note.','Local logs are not a production audit system.']]
];
for(const [guides,translations] of [[GUIDE17,V18GUIDE_EN],[MAINTGUIDE17,V18MAINT_GUIDE_EN]])guides.forEach((g,i)=>{const en=translations[i];if(!en)return;V18EN[g[1]]=en[0];V18EN[g[2]]=en[1];g[4].forEach((p,n)=>{if(en[2][n])V18EN[p]=en[2][n]})});
Object.assign(V18EN,{
'长期隐患是官方街道防汛指引中列出的低洼、易积水地点或路段，是长期资料提示，不是当前实测积水。本站按地点或道路名称关联；地点名称关联到指引内容，详情列出原文中的位置与原因。':'Long-term hazards are low-lying or flood-prone locations listed in public subdistrict guides, not current field measurements. Location and road names are matched to the guide; details retain the original scope.',
'在顶部“场景与导览”中选择“了解各模块用途”。导览只解释模块用途，可以随时关闭。':'Choose Explore the modules under Scene and guide. You can close the guide at any time.',
'底图依赖网络。先检查网络或刷新；仍失败时可使用页面地图链接。地址未匹配时输入纬度,经度或地图选点。':'The basemap requires network access. Refresh or use the map link if loading fails. Enter coordinates or mark the map when an address has no match.',
'天气入口只导出天气。出行报告可选择行程、方案、依据和地图；选择后先预览。PDF由浏览器生成。':'Weather exports contain weather only. Journey reports can include options, evidence and maps. Preview before exporting; PDFs are generated in the browser.',
'没有对应地点、时刻的观测或验证模型时保持未知。长期易积水资料、停运公告和现场积水是不同信息。':'Current standing-water status needs a matching observation. Long-term hazards, service notices and field observations are distinct. Heavy-rain probability uses separate ensemble forecasts.',
'在灾情反馈的“我的反馈”查看当前阶段、时间线与维护意见。维护端目前只处理同一浏览器记录，不等于官方受理。':'View the current stage, timeline and replies under My observations. This demo shares records within one browser and does not submit them to authorities.',
'提交完成材料后等待发布者确认。发布者可确认或退回补充；双方在确认完成后各评价一次。':'After evidence is submitted, the publisher confirms completion or requests more information. Each participant can then submit one rating.',
'当前记录保存在本浏览器，尚无跨设备同步。需要保留内容时导出相应材料；清除浏览器数据可能丢失本地记录。':'Records are stored in this browser without cross-device sharing. Export records to retain a copy; clearing browser data removes local records.',
'页面打开时可按所选方式提醒，关闭页面后不会自动推送。账户与设置中可选择站内消息、浏览器通知、提示音或不提醒。':'Reminders run while this page is open. Select in-app messages, browser notifications, sounds or no reminders in Account and settings.',
'查找地点或反馈内容':'Search location or observation text',
'小区、街道或详细地址':'Neighborhood, road or address',
'医院、公司或详细地址':'Hospital, workplace or address',
'纬度,经度':'Latitude,longitude',
'查找地点或反馈内容':'Search location or observation text'
});

Object.assign(V18EN,{
'修改并重新提交':'Edit and resubmit',
'已保存，两端记录同步更新':'Saved. Both roles can view the updated record.',
'查看任务内容、地点、交付要求和当前阶段。':'View task requirements, location, deliverables and progress.',
'保留雨具，避开已封闭区段':'Carry rain protection and avoid closed areas',
'预留调整时间，避开低洼路段':'Allow changes and avoid low-lying roads',
'延后非必要户外行程':'Postpone non-essential outdoor travel',
'优先室内安排，遵从官方管制':'Prefer indoor plans and follow official restrictions',
'纳入未核验的用户线索':'Include unverified observations',
'提交材料申请':'Submit document request',
'核对任务内容、地点、完成标准和可行条件':'Check task scope, location, completion criteria and feasibility',
'说明材料是否完整，以及需要补充的字段':'Describe completeness and any fields that need more information',
'个人参赛Demo，将深圳公开天气、历史公告和地点资料整理为可追溯的出行信息。当前生成式AI、完整导航、共享后端与交易尚未接入。':'A personal competition demo combining public weather, archived notices and place records. Generative AI, full navigation, shared server storage and transactions are not connected.',
'当前资料含27条历史摘要、四版街道指引和有限公开地图数据。长期隐患与现场实况分开，规则关联不是危险概率。':'The collection contains 27 historical summaries, four editions of subdistrict guides and limited public map data. Long-term hazards are separate from field conditions; name matching is not a probability model.',
'事实有出处 · 未知不冒充安全':'Traceable evidence · Unknown is not a safety guarantee',
'官方长期隐患关联':'Related long-term hazard guides',
'站点或输入坐标，未经实地核验。':'Station reference or entered coordinates; not a surveyed entrance.',
'尚无可用时段数据 · 现场水深未知':'No matching time-window data · No measured water depth',
'数据来源与适用范围':'Sources and scope',
'精准雨量未取得':'Exact rainfall data unavailable',
'用户待核验线索':'Observations awaiting review',
'真实AI与共享反馈待接入':'AI and cross-device records are not connected',
'每一趟出行，多一份依据。':'More context for every journey.',
'深雨知路 · 与地点、时间和行程有关的信息':'RAINWISE · Location, time and journey information',
'查看原始依据':'View original source',
'申请已保存':'Request saved',
'暂无已公开资料':'No published records at this cutoff',
'立即查询':'Query now',
'计算任务地点距离':'Calculate task distance',
'记录截止时刻':'Record cutoff',
'接单情况':'Acceptance status',
'未履约':'Not fulfilled',
'待用户补充':'Awaiting user information',
'处理中':'In progress',
'已解决':'Resolved',
'查看与回复':'View and reply',
'保存状态与回复':'Save status and reply',
'问题描述':'Issue description',
'复现步骤':'Reproduction steps',
'预期结果':'Expected result',
'实际结果':'Actual result',
'软件反馈处理':'Software feedback review',
'软件处理状态':'Software status',
'维护回复':'Maintainer reply',
'已在本浏览器保存':'Saved in this browser',
'使用真实当前时间；回复仅在本浏览器内显示。':'Uses real current time. Replies are stored in this browser.',
'查找地点或反馈内容':'Search place or observation text',
'查找地点或反馈内容':'Search place or observation text'
});

Object.assign(V18EN,{
'以晴为主':'Mainly clear','局部多云':'Partly cloudy','天气未取得':'Weather unavailable','小雨':'Light rain','中雨':'Moderate rain','大雨':'Heavy rain','冻雨':'Freezing rain','阵雪':'Snow showers','雷暴':'Thunderstorm','气温（°C）':'Temperature (°C)','小时降水量（mm）':'Hourly precipitation (mm)','时间（北京时间）':'Time (Beijing)','晴':'Clear','晴间少云':'Mainly clear','晴间多云':'Partly cloudy','多云':'Cloudy','阴':'Overcast','雾':'Fog','毛毛雨':'Drizzle','雨':'Rain','阵雨':'Rain showers','雪':'Snow','雷雨':'Thunderstorm','未取得天气状况':'Weather unavailable',
'Open-Meteo模型天气':'Open-Meteo model weather',
'地点、时段与来源':'Location, time window and sources',
'天气数据':'Weather data','趋势图':'Trend charts','数据表':'Data table','气象预警与专业判断':'Warnings and professional forecasts',
'此操作需要维护人员身份':'This action requires the maintenance role.',
'请选择处理状态':'Select a review status.',
'请填写核验依据或处理意见':'Enter evidence or a review comment.',
'依据链接需以http或https开头':'Evidence URLs must start with http or https.',
'请选择核验结论':'Select a review conclusion.',
'这条反馈已被删除，未保存修改':'This observation was deleted. Changes were not saved.',
'这条反馈刚被更新，请重新打开详情后保存。':'This observation was just updated. Reopen its details before saving.',
'该记录已有后续处理。请切换到最新处理时刻后修改。':'This record has later review actions. Move to the latest review time before editing.',
'保存失败，请保留当前输入后重试':'Saving failed. Keep your current input and try again.',
'请从用户端提交材料申请':'Submit document requests from the user workspace.',
'关联反馈已不存在':'The linked observation no longer exists.',
'请填写申请用途':'Enter the intended use of this document.',
'请选择材料内容':'Select the document contents.',
'此反馈已有后续材料申请，请查看最新申请时刻。':'This observation has a later request. Move to its latest request time.',
'这条反馈已有申请，请查看进度':'This observation already has a request. View its progress.',
'材料申请保存失败':'The document request could not be saved.',
'请选择审核结果并填写至少5字的意见':'Select an outcome and enter at least five characters of review comments.',
'申请状态已变化，请刷新后查看':'The request status changed. Refresh to view it.',
'该申请已有后续处理，请查看最新时刻':'This request has later actions. Move to the latest time.',
'审核未能保存':'The review could not be saved.',
'这条任务当前无需审核':'This task is not awaiting review.',
'接单截止时间已过，请退回修改后重新提交':'The deadline is invalid or has passed. Return the task for changes.',
'状态已变化或审核意见不完整，未保存':'The status changed or comments are incomplete. The review was not saved.',
'材料尚未审核通过':'This document has not been approved.',
'只有发布者可修改未通过的任务':'Only the publisher can revise a rejected task.',
'任务状态已变化，无法重新提交':'The task status changed. It cannot be resubmitted.',
'请完整填写任务与有效用时、奖励':'Complete the task requirements and valid duration and reward.',
'接单截止时间需晚于当前时刻':'The acceptance deadline must be in the future.',
'请填写有效的地点坐标':'Enter valid location coordinates.',
'重新提交未能保存':'Resubmission could not be saved.'
});

vRender();
