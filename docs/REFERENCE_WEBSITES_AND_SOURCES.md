# 深雨知路：参考网站、资料与服务来源总表

整理日期：2026-10-15（北京时间）  
适用基线：线上版本31；源码提交 `dcfbfc03eaecdbfe197f70b94839535710e59cfe`。  
Demo：https://shenyuzhilu.whiteknoll32.chatgpt.site/

本表根据当前源码、结构化数据、SOURCE_NOTES.md、LOCAL_RISK_NOTES.md及本次对关键原站的复核整理，不是完整浏览历史。凡仅在代码出现、只作外链入口、调研未接通或属于旧实现，均与已采用资料区分。没有把搜索引擎结果当成原始证据，也没有将网页其他友情链接列为项目参考。

**标题校正：**2026年官方通知及附件的正式标题是《深圳市气象灾害风险预警工作指引（2026年版）》。此前交接中使用的“公众应对积水内涝风险指引”等简称不宜作为正式书目标题；本项目使用的是该附件中的罗湖街道降雨阈值与易积水位置表。

## 一、可供项目说明直接使用的来源概述

深雨知路以深圳政府在线、深圳市气象局、深圳市水务局、深圳市交通运输局等公开公告及四个年份的街道防汛/气象风险指引为事实依据；以Open-Meteo提供的模型天气和集合降水为天气参考，以OpenStreetMap及FOSSGIS/OSRM提供的地图和正常条件下步行路网作为空间参考。壹基金公告只作历史公益行动背景，Microsoft Feedback Hub及Google Maps帮助文档只作软件反馈流程设计参考。示例反馈、互助任务、公益需求和AI物资图均不冒充真实记录。

注意：官方资料未必同时取得精确入口坐标、道路水深和实时运营状态。模型成员比例不是经实测验证的积水或个人遇险概率；本项目不能借用这些网站的名称宣称获得合作、授权、背书或独立效果验证。

## 二、2023年暴雨事件：直接采用的公开事实来源

下面五个网页对应应用内27条事件摘要。下方日期为项目保存的来源时间口径；事件发生时间与网页发布时间分别保存。不要把事后网页中的过去事件写成当时已公开的信息。

| 网站／发布单位 | 资料与用途 | 原始网页 | 对应记录 |
|---|---|---|---|
| 深圳市水务局 | 《深圳雨情最新进展！多部门紧急处置》；2023-09-08 00:17；早期降雨、预警与处置报道 | https://swj.sz.gov.cn/xxgk/zfxxgkml/yjgl/content/post_10824841.html | SZ-E001, SZ-E002, SZ-E003, SZ-E004, SZ-E023, SZ-E024 |
| 深圳政府在线／深圳市应急管理局 | 《深圳市防汛防旱防风指挥部办公室关于防御强降雨的公告》；2023-09-08 09:28；停课、地铁双方向暂停运营区段、出行建议及AI离线整理样本 | https://www.sz.gov.cn/szzt2010/zdlyzl/scaq/yf/content/post_10824929.html | SZ-E005, SZ-E006, SZ-E007, SZ-E008, SZ-E013, SZ-E014, SZ-E015, SZ-E019, SZ-E020, SZ-E021, SZ-E022 |
| 深圳市交通运输局 | 2023年暴雨交通信息网页（具体原题以原站为准）；历史交通运营与恢复信息；不能由恢复报道推断更早时刻已恢复 | https://jtys.sz.gov.cn/gkmlpt/content/10/10827/post_10827763.html | SZ-E009, SZ-E010, SZ-E011, SZ-E012 |
| 深圳市气象局 | 2023年“9·7”极端强降雨事后回顾（具体原题以原站为准）；2023-09-15 14:30:15；事后复盘来源，不在9月8日“当时可知”中提前展示 | https://weather.sz.gov.cn/mobile/xinxigongkai/gongzuodongtai/content/post_10837589.html | SZ-E016, SZ-E017, SZ-E018 |
| 深圳政府在线 | 2023-09-08雨情与处置报道（具体原题以原站为准）；2023-09-08 11:58；雨量统计及水库处置等；区级/站点记录不等于医院入口水深 | https://www.sz.gov.cn/cn/xxgk/zfxxgj/zwdt/content/post_10825070.html | SZ-E025, SZ-E026, SZ-E027 |

## 三、街道长期隐患与降雨阈值资料

应用保存2023、2024、2025、2026四个版本、各10个罗湖街道，共40条结构化指引记录。旧年份文件以下按“对应年份附件”描述，未凭文件地址猜测正式书名或发布机构；附件托管域名不一定就是文件联合发布单位。

| 版本 | 托管网站与原件 | 本项目用途／归档情况 |
|---|---|---|
| 2023 | https://stic.sz.gov.cn/attachment/1/1299/1299059/11130893.docx | 历史场景的长期易积水条款与雨量参考条件；是官网托管附件，不能称为实测水深。结构化记录和原件链接已保留，不承诺本交接包包含该年份所有原始下载。 |
| 2024 | https://yjgl.sz.gov.cn/attachment/1/1426/1426997/11191566.docx | 街道隐患与阈值的年度资料；当前应用保留版本差异。 |
| 2025 | https://weather.sz.gov.cn/attachment/1/1600/1600262/12253215.pdf | 街道隐患与阈值的年度资料；不能将后来的版本补入2023年当时可知判断。 |
| 2026 | https://weather.sz.gov.cn/attachment/1/1722/1722447/12840500.docx | 本轮实际下载并核对的《深圳市气象灾害风险预警工作指引（2026年版）》；罗湖10街道本地计算使用其1小时与3小时条件，半小时条件原样保留但不由小时数据拆算。 |

**2026通知原页：** https://weather.sz.gov.cn/xingxigongkai/zhengcefagui/zcfgson/content/post_12840500.html  
发布单位：深圳市气象局、深圳市应急管理局、深圳市水务局。原页更新时间2026-06-12 17:07:40；正文落款2026-05-11，二者不可混用。本次再次打开核对了正式标题、日期和阈值参考性质。

已归档原件：完整交接包 `project/data_sources/risk-guidance-2026.docx`；提取表 `local-thresholds-2026.json`。  
原件SHA256：`50f79fa240b9ad6a1089bcfadcc9d40cd53c6eb6e8a17cea7bf99e618bdc1ab8`。

举例：翠竹街道医院关联点为1小时40毫米或3小时70毫米；老街关联东门街道为40/65毫米。它们是降雨风险提示参考条件，不是入口淹水深度阈值。

## 四、气象解释、预警外链与科普参考

| 网站／页面 | 网址 | 用途及使用边界 |
|---|---|---|
| 深圳市气象局主页 | https://weather.sz.gov.cn/ | 官方气象入口；不是本站已自动拉取所有官方实况的证明。 |
| 深圳官方突发事件预警 | https://weather.sz.gov.cn/qixiangfuwu/yujingfuwu/tufashijianyujing/index.html | 页面中的官方预警外链；动态官方预警尚未自动接入。 |
| 预警防御措施与含义 | https://weather.sz.gov.cn/qixiangfuwu/yujingfuwu/fangyuzhiyin/index.html | 防御含义和资料说明参考，不等于本站发布官方预警。 |
| 湿度监测 | https://weather.sz.gov.cn/qixiangfuwu/qixiangjiance/shidujiance/index.html | 天气指标解释与官方入口；本站湿度数值来自模型天气，不是该网页监测站数据。 |
| 阵风监测 | https://weather.sz.gov.cn/qixiangfuwu/qixiangjiance/zhenfengjiance/index.html | 阵风指标解释与官方入口；不代表已接通监测站接口。 |
| 深圳气象业务知识库 | https://weather.sz.gov.cn/hudongjiaoliu/yewuzhishiku/qixiangfuwulei/content/post_8800285.html | 专业词解释的既有代码引用；链接存在不等于本轮逐条重新核验。 |
| 罗湖区政府知识库 | https://www.szlh.gov.cn/zmhd/wdzsk/content/post_12722512.html | 既有统一“3小时50毫米”强降雨参考；现在作为补充模型说明，与新街道阈值计算分开，不作为实际积水发生概率标定。 |
| 美国国家气象局洪水安全科普 | https://www.weather.gov/safety/flood-hazards | 既有资料中的公众涉水安全解释参考；不作为深圳当地积水实测或本地法定预警依据。 |
| 中央气象台台风入口 | https://typhoon.nmc.cn/ | 旧灾害资料中保留的官方外链入口；本轮已移除独立灾害导航，未接入实时台风路径和专属影响评估。 |

## 五、天气模型与接口服务（不是本地观测）

| 服务 | 官方页面／接口 | 本项目使用方式 |
|---|---|---|
| Open-Meteo Forecast | https://open-meteo.com/en/docs | 当前、逐小时、七日天气及WMO天气状态等字段说明；当前天气接口为 https://api.open-meteo.com/v1/forecast ，具体坐标和字段由页面查询生成。 |
| Open-Meteo Ensemble | https://open-meteo.com/en/docs/ensemble-api | 集合降水成员资料；当前代码使用icon_global，计算当地雨量参考条件的成员比例。接口 https://ensemble-api.open-meteo.com/v1/ensemble ，不把成员比例称为事故概率。 |
| Open-Meteo官方接口定义仓库 | https://github.com/open-meteo/open-meteo/blob/main/openapi/ensemble.yml | 既有资料中的接口定义参考；不代表源码仓库参与本项目或提供背书。 |
| 历史背景资料 | Open-Meteo／ERA5 G03，来源说明见项目SOURCE_NOTES.md | 应用包含2023事件期72小时背景降雨。现有交接材料不足以复原最初完整下载请求，故不杜撰其精确API查询URL；不冒充罗湖入口雨量传感器实测。 |

模型成功/失败、获取时刻和预测覆盖都要在界面保留。上次测试取得40成员，不保证每次请求恒有40个有效成员。0%只表示当前模型集合没有成员达到所示条件，不能证明无积水。

## 六、地图、交通空间资料与路线服务

| 服务／网站 | 网址 | 用途与限制 |
|---|---|---|
| OpenStreetMap | https://www.openstreetmap.org/ | 公开站点、轨道与有限道路/建筑/水系背景。原数据和派生文件在data_sources、reference-network.js和export-map-data.js。当前地理背景不代表2023灾时路网或通行情况。 |
| OSM版权与署名 | https://www.openstreetmap.org/copyright | 保留© OpenStreetMap contributors与ODbL来源说明；不把采集地图改称自有独立测绘。 |
| OSM在线底图瓦片 | https://tile.openstreetmap.org/ | 在线地图背景。源码使用z/x/y瓦片模板；这是地图服务，不是灾情数据接口。 |
| 地图纠错入口 | https://www.openstreetmap.org/fixthemap | 报告底图问题的外链，不是本站灾情反馈接收后台。 |
| FOSSGIS公共路由服务 | https://routing.openstreetmap.de/about.html | 已实现步行路线请求与有限缓存；本次再次打开了服务说明。正常步行条件参考，不含实时积水/封路。 |
| 步行接口 | https://routing.openstreetmap.de/routed-foot/route/v1/foot/ | 实际代码追加坐标、geometry与steps参数；路径接入偏移和失败须明确，不用驾车或直线伪装步行。 |
| OSRM项目 | https://project-osrm.org/ | 既有驾车/路由实现的技术来源；接口文档 https://project-osrm.org/docs/v5.24.0/api/ 。 |
| OSRM公共驾车接口 | https://router.project-osrm.org/route/v1/driving/ | 代码存在的驾车路线请求。服务返回路径不等于灾时可通行路线，也不是实时封路预报。 |
| 深圳地铁乘车指引 | https://www.szmc.net/shentieyunying/yunyingfuwu/chengchezhiyin/ | 既有站点/线路服务参考；历史停运结论仍依据对应日期公告，不依据今日乘车页推断。 |
| 港铁深圳站点页 | https://www.mtrsz.com.cn/ | 既有参考网络文件中的站点资料链接；具体站点URL见文末“代码来源索引”。不代表已对接实时班次。 |

行政区轮廓复用现有districts.geojson。源码标记为已收集DataV区界参考，但当前证据中没有可可靠恢复的完整DataV原始下载URL，因此不补造链接。区界不是洪水淹没面，直线距离不是导航距离。

## 七、公益背景与软件交互设计参考

| 网站／资料 | 原始网址 | 用途及不能推断的内容 |
|---|---|---|
| 壹基金历史救援公告 | https://onefoundation.cn/news/64fa08da7c558f6a51/ | 历史公益行动背景；来源说明记载2023-09-08、99人备勤与救援行动。不是本项目专属募捐、机构任务委托或到账收据。模拟需求、用途分配及AI物资图另行标为虚构。 |
| Microsoft Feedback Hub帮助 | https://support.microsoft.com/en-us/windows/apps/send-feedback-to-microsoft-with-the-feedback-hub-app | 参考问题/建议分类、复现步骤与附件等产品反馈结构；不等于微软参与开发或接收本站软件反馈。 |
| Google Maps帮助／反馈 | https://support.google.com/maps/answer/3094045 | 参考帮助与产品反馈分离的交互；不是灾情事实或深圳地图数据来源。 |

## 八、调研过但未作为已接入能力的数据

| 来源 | 网址 | 本轮结论 |
|---|---|---|
| 深圳政府公开答复 | https://www.sz.gov.cn/hdjlpt/detail?pid=3403292&via=pc | 用于寻找水位/监测目录的线索，不能当作本站已有道路实测水深。 |
| 深圳开放数据水位目录 | https://opendata.sz.gov.cn/data/dataSet/toDataDetails/29200_01403147 | 上轮访问目录时没有取得可用记录表，不宣称已接通。 |
| 深圳开放数据站点目录 | https://opendata.sz.gov.cn/data/dataSet/toDataDetails/29200_01400987 | 同上；站点目录不自动构成位置连续、实时可用的积水观测。 |

也考察过用河流洪水模型代替城市积水的可能性，但没有把河流流量当作道路水深接入。未保存可可靠追溯的具体调研网址时，不在此编造书目。

## 九、使用和交接时的引用原则

1. 事实结论引用对应原始网页/附件，不只写“来自互联网”。原文名称、发布时间、事件时间、取用范围分别保留。
2. 参赛材料可以说“采用公开资料并按地点和时刻关联”，不能说已获得部门/机构合作授权。
3. 10/30/60%的提示档位是本项目Demo规则，非官方预警分级；尚无本地概率校准和独立用户效果研究。
4. 真实新闻只作示例背景；虚构反馈/任务/公益和AI图不能列作真实用户验证或实拍救援证据。
5. 本清单不是开源依赖许可证清单。Leaflet、jsPDF、html2canvas等第三方软件在project/dist/vendor中，应保留各自文件许可信息；不能把代码库名称算成气候事件证据。
6. 本次未逐个重新打开所有旧附件/站点页；下方索引只证明当前文件中存在该URL。对于旧页失效、标题变更或不可访问，保留原始记录并进一步核实，不猜一个新链接替换事实来源。

## 附录：当前代码和说明中的静态来源URL索引

以下自动从当前已交付源码提取，去除了SVG命名空间和动态模板。数字站点页不猜具体站名。查询示例/旧接口路径只是既有记录，不代表最终运行时调用或已逐条重新验证。精确到每条事件的出处以data/application-data.json中source_url与record_id为准。

| 原始URL | 出现位置 |
|---|---|
| https://github.com/open-meteo/open-meteo/blob/main/openapi/ensemble.yml | `V18_CHANGELOG.md` |
| https://jtys.sz.gov.cn/gkmlpt/content/10/10510/post_10510982.html | `MODULES_1_2_NOTES.md` |
| https://jtys.sz.gov.cn/gkmlpt/content/10/10827/post_10827763.html | `dist/data.js` |
| https://onefoundation.cn/news/64fa08da7c558f6a51/ | `SOURCE_NOTES.md`, `dist/v9.js` |
| https://open-meteo.com/ | `dist/v5.js` |
| https://open-meteo.com/en/docs | `SOURCE_NOTES.md`, `UPDATE_VISUAL_WEATHER.md`, `dist/evidence-guide.js` |
| https://open-meteo.com/en/docs/ensemble-api | `V18_CHANGELOG.md`, `dist/rain-probability.js` |
| https://project-osrm.org/ | `dist/v5.js` |
| https://project-osrm.org/docs/v5.24.0/api/ | `dist/v2.js` |
| https://routing.openstreetmap.de/about.html | `dist/final-reports.js`, `dist/v11.js`, `dist/walking-route.js` |
| https://routing.openstreetmap.de/routed-foot/route/v1/driving/114.113179,22.533312;114.123148,22.559888?overview=full&geometries=geojson&steps=true&generate_hints=false | `dist/foot-route-cache.js` |
| https://routing.openstreetmap.de/routed-foot/route/v1/driving/114.113179,22.533312;114.131383,22.548804?overview=full&geometries=geojson&steps=true&generate_hints=false | `dist/foot-route-cache.js` |
| https://routing.openstreetmap.de/routed-foot/route/v1/driving/114.123148,22.559888;114.113179,22.533312?overview=full&geometries=geojson&steps=true&generate_hints=false | `dist/foot-route-cache.js` |
| https://stic.sz.gov.cn/attachment/1/1299/1299059/11130893.docx | `dist/data.js` |
| https://support.google.com/maps/answer/3094045 | `SOURCE_NOTES.md` |
| https://support.microsoft.com/en-us/windows/apps/send-feedback-to-microsoft-with-the-feedback-hub-app | `SOURCE_NOTES.md` |
| https://swj.sz.gov.cn/ | `dist/v2.js` |
| https://swj.sz.gov.cn/xxgk/zfxxgkml/yjgl/content/post_10824841.html | `SOURCE_NOTES.md`, `dist/data.js` |
| https://typhoon.nmc.cn/ | `dist/visual-weather.js` |
| https://weather.sz.gov.cn/ | `dist/competition.js`, `dist/v11.js`, `dist/v2.js`, `dist/v5.js`, `dist/v8.js`, `dist/visual-weather.js` |
| https://weather.sz.gov.cn/attachment/1/1600/1600262/12253215.pdf | `dist/data.js` |
| https://weather.sz.gov.cn/attachment/1/1722/1722447/12840500.docx | `LOCAL_RISK_NOTES.md`, `data_sources/local-thresholds-2026.json`, `dist/data.js`, `dist/local-risk-data.js` |
| https://weather.sz.gov.cn/gkmlpt/content/12/12840/post_12840500.html | `dist/data.js` |
| https://weather.sz.gov.cn/hudongjiaoliu/yewuzhishiku/qixiangfuwulei/content/post_8800285.html | `dist/experience.js` |
| https://weather.sz.gov.cn/mobile/xinxigongkai/gongzuodongtai/content/post_10837589.html | `SOURCE_NOTES.md`, `dist/data.js` |
| https://weather.sz.gov.cn/qixiangfuwu/qixiangjiance/shidujiance/index.html | `dist/evidence-guide.js` |
| https://weather.sz.gov.cn/qixiangfuwu/qixiangjiance/zhenfengjiance/index.html | `dist/evidence-guide.js` |
| https://weather.sz.gov.cn/qixiangfuwu/yujingfuwu/fangyuzhiyin/index.html | `UPDATE_VISUAL_WEATHER.md`, `dist/evidence-guide.js` |
| https://weather.sz.gov.cn/qixiangfuwu/yujingfuwu/tufashijianyujing/index.html | `UPDATE_VISUAL_WEATHER.md`, `dist/evidence-guide.js` |
| https://weather.sz.gov.cn/xingxigongkai/zhengcefagui/zcfgson/content/post_12840500.html | `LOCAL_RISK_NOTES.md`, `data_sources/local-thresholds-2026.json`, `dist/local-risk-data.js` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=12001 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=12002 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=12006 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=12007 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13123 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13124 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13125 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13126 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13127 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13128 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13129 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13130 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13508 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13510 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13512 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13513 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13514 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13515 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13516 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13517 | `data_sources/stations.json` |
| https://www.mtrsz.com.cn/frontend/default/src/channel/site_detail.html?id=13518 | `data_sources/stations.json` |
| https://www.openstreetmap.org/ | `build_reference_network.py`, `dist/reference-network.js` |
| https://www.openstreetmap.org/#map=13/22.555/114.135 | `dist/v8.js` |
| https://www.openstreetmap.org/#map=14/22.555/114.135 | `dist/v6.js` |
| https://www.openstreetmap.org/copyright | `dist/v13.js`, `dist/v2.js`, `dist/v5.js`, `dist/v6.js`, `dist/v8.js` |
| https://www.openstreetmap.org/fixthemap | `dist/v6.js`, `dist/walking-route.js` |
| https://www.sz.gov.cn/cn/xxgk/zfxxgj/zwdt/content/post_10825070.html | `SOURCE_NOTES.md`, `dist/data.js` |
| https://www.sz.gov.cn/gkmlpt/content/7/7786/post_7786694.html | `V18_CHANGELOG.md` |
| https://www.sz.gov.cn/szzt2010/zdlyzl/scaq/yf/content/post_10824929.html | `SOURCE_NOTES.md`, `UPDATE_VISUAL_WEATHER.md`, `dist/competition.js`, `dist/data.js`, `dist/v9.js` |
| https://www.szlh.gov.cn/zmhd/wdzsk/content/post_12722512.html | `UPDATE_VISUAL_WEATHER.md`, `dist/evidence-guide.js`, `dist/rain-probability.js` |
| https://www.szmc.net/page/en/stations.html?xl=1&code=0107 | `data_sources/stations.json` |
| https://www.szmc.net/page/en/stations.html?xl=1&code=0109 | `data_sources/stations.json` |
| https://www.szmc.net/shentieyunying/yunyingfuwu/chengchezhiyin/ | `MODULES_1_2_NOTES.md` |
| https://www.weather.gov/safety/flood-hazards | `V18_CHANGELOG.md` |
| https://yjgl.sz.gov.cn/attachment/1/1426/1426997/11191566.docx | `dist/data.js` |

## 与此前交接包的关系

本文件是独立补充，可与RAINWISE_00_START_HERE.md及RAINWISE_01_COMPLETE_HANDOFF_v31.zip一起交给新聊天。没有修改Demo，也没有把此前压缩包原地替换为新版本。正式引用2026指引时，以本表校正后的正式标题为准。
