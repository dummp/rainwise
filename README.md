# 深雨知路 RAINWISE

面向居民的暴雨往返出行信息助手。首个应用区域为深圳罗湖，主演示为罗湖 → 深圳人民医院 → 罗湖。

## 在线体验

部署完成后，在这里补充本仓库对应的正式展示网址。

## 当前能力

- 分别设置去程与返程，查看运营限制、地点隐患和天气参考。
- 保留公开资料来源与时间，区分现在、当时可知和历史复盘。
- 按已匹配地点计算超过当地降雨参考条件的集合成员比例。
- 保存查询快照，支持行程分享和分模块报告。
- 提供本地反馈、维护及任务流程演示。

## 使用边界

模型成员比例未经本地概率校准，不是实际积水、事故或个人遇险概率。未接入道路实测水深和动态官方预警；地图及路线不证明灾时可通行。官方停运、封闭与避险要求优先。

AI用于离线辅助整理公开公告；运行时主要采用显式规则与外部模型数据计算，未接入实时生成式AI服务。

业务记录主要存于同一浏览器、同一域名的localStorage，换域名不会自动迁移。用户和维护人员为演示身份，不构成正式认证。内置反馈、互助及公益案例为虚构演示，不实际收款。

## 本地运行

安装Python 3后，在仓库根目录运行：

```bash
python3 -m http.server 8000 --directory dist
```

然后打开 http://localhost:8000 。无需npm构建；外部天气、地图和路由仍需要网络。

## Vercel部署

从GitHub导入本仓库，Root Directory保持仓库根目录，Framework Preset选Other。仓库中的vercel.json指定跳过构建并发布dist目录。首次部署后应检查匿名访问、地图、往返、地点计算、历史切换、分享与PDF导出。

## 代码结构

- dist/：实际运行的HTML、CSS、JavaScript、图片和第三方资源。
- tests/：现有检查脚本。
- data_sources/：已保存的来源资料及地理文件。
- SOURCE_NOTES.md：资料出处与使用限制。
- LOCAL_RISK_NOTES.md：本地降雨条件计算说明；2026官方文件正式标题以来源总表校正为准。
- docs/PROJECT_HISTORY.md：原有开发沿革，仅供追溯。
- docs/REFERENCE_WEBSITES_AND_SOURCES.md：来源分类与正式标题校正。

## 检查

需要Node.js。依次运行：

```bash
node tests/check-local-risk.cjs
node tests/check-v20.cjs
node tests/check-v20-regression.cjs
node tests/check-task-sync.cjs
node tests/check-visual-weather.cjs
node tests/check-evidence-guide.cjs
```

代码检查不能代替真实浏览器和独立用户研究。

## 数据和依赖

采用政府公开公告及指引、Open-Meteo模型天气、OpenStreetMap数据与FOSSGIS/OSRM路径参考。具体出处、覆盖和限制见来源说明。保留OpenStreetMap contributors / ODbL署名和vendor文件的原许可信息。

仓库公开不等于第三方数据和全部代码获得统一开源许可。本包未自动授予MIT等整体许可，使用及再分发应核对各项权利。

## 未来方向

在本地验证基础上探索其他城市暴雨与洪水信息服务；地震为长期探索，拟接入权威预警和速报，不开展自行地震预测。

## 迁移基线

本仓库准备包来自用户提供的已发布版本31交接快照，源码提交dcfbfc03eaecdbfe197f70b94839535710e59cfe。它不是原托管站点的实时拉取；正式迁移前应确认原站是否有后续改动。
