
# 2026 World Cup

一个基于 `Next.js 14 App Router` 构建的 2026 世界杯多语言资讯站点，覆盖赛程展示、积分榜、淘汰赛结构、比赛比分同步、广告与统计接入，以及面向生产环境的自动化部署与运维方案。

当前项目已经不再是单纯的 UI 设计稿工程，而是一个前后端一体化的在线站点，具备以下能力：

- 前端页面展示世界杯赛程、积分榜、淘汰赛结构、多语言内容
- 服务端 API 统一输出实时比赛数据
- 定时从 ESPN 非官方比分接口抓取最新比赛结果
- 使用 Vercel Blob 持久化历史比分
- 前端按分钟轮询获取最新比分与积分变化
- 使用 GitHub Actions 替代 Vercel 付费 Cron
- 已接入 Google Analytics、Google AdSense、Google Search Console 验证

## 1. 项目目标

这个项目的核心目标不是“做一个静态官网页面”，而是做一套可持续运行的世界杯数据展示系统，重点解决以下几个问题：

- 页面数据不能只依赖写死的静态 mock
- 比赛开始后，比分要自动更新到页面
- 即使外部抓取失败，前端仍要有可用兜底数据
- 免费部署方案下，仍然要具备定时同步能力
- SEO、广告、统计、国际化需要一起纳入生产架构

## 2. 技术栈

### 前端

- `Next.js 14`
- `React 18`
- `TypeScript`
- `App Router`
- `Tailwind CSS v4`
- `MUI` / `Radix UI` 作为部分组件基础能力

### 服务端与数据层

- `Next.js Route Handlers` 作为后端 API 层
- `@vercel/blob` 作为比分持久化存储
- ESPN 非官方比分接口作为外部数据源
- `GitHub Actions` 作为免费定时任务调度器

### 部署与平台

- `Vercel` 负责站点部署
- `GitHub` 负责源码托管和定时触发

## 3. 架构概览

整体架构是“前后端同仓、服务端聚合、前端轮询更新、Blob 持久化兜底”的方案。

```mermaid
flowchart TD
  A[用户浏览器] --> B[Next.js 页面]
  B --> C[/api/live-data]
  C --> D[比分服务层]
  D --> E[Vercel Blob 私有存储]
  D --> F[静态 fallback 数据]

  G[GitHub Actions 定时任务] --> H[/api/cron/sync-scores]
  H --> D
  D --> I[ESPN Scoreboard API]
  D --> E
```

### 核心思路

- 前端不直接依赖写死数据文件，而是优先请求 `/api/live-data`
- 服务端优先读取 Blob 中的最新持久化比分
- 如果 Blob 不可用或尚未初始化，则退回到本地静态 `fallback` 数据
- GitHub Actions 每 5 分钟请求一次同步接口
- 同步接口从 ESPN 拉取最近已开赛比赛日的数据，并覆盖写入 Blob
- 前端每 60 秒拉取一次 `/api/live-data`，让页面自动更新

## 4. 目录说明

以下目录和文件是当前项目中最关键的部分：

- `src/app/[lang]`
  多语言页面入口与布局
- `src/app/api/live-data/route.ts`
  前端实时数据统一出口
- `src/app/api/cron/sync-scores/route.ts`
  定时同步比分入口
- `src/app/hooks/useLiveTournamentData.ts`
  前端获取实时比分与积分数据的 Hook
- `src/lib/scores/espn.ts`
  ESPN 数据抓取与队名映射
- `src/lib/scores/service.ts`
  比分同步主流程
- `src/lib/scores/storage.ts`
  Vercel Blob 读写实现
- `src/lib/tournament/standings.ts`
  根据比分动态计算小组积分表
- `src/app/data/matches.ts`
  本地赛程主数据
- `src/app/data/matchScores.ts`
  静态 fallback 比分
- `src/app/data/teams.ts`
  静态小组与淘汰赛基础数据
- `.github/workflows/sync-scores.yml`
  GitHub Actions 定时任务配置

## 5. 前端技术方案

### 5.1 页面框架

项目使用 `Next.js App Router` 组织页面，按语言维度放在 `src/app/[lang]` 下，支持：

- 多语言页面路由
- SEO 元信息生成
- 服务端渲染与静态能力混合使用
- 布局层统一接入广告、统计与结构化数据

### 5.2 页面数据来源

前端的真实数据来源不是直接读取 `src/app/data/*`，而是通过 `useLiveTournamentData()` 请求：

- `/api/live-data`

该 Hook 的策略如下：

- 初次加载时请求服务端实时数据
- 若请求失败，保留本地 fallback 数据，保证页面不空白
- 每隔 `60_000ms` 再次拉取一次，保持比分和积分更新

这意味着前端有两层保障：

- 第一层：服务端动态数据
- 第二层：本地静态 fallback 数据

### 5.3 小组赛积分表方案

小组积分并不是手工维护，而是通过比分动态推导：

- 从 `groupStageMatches` 读取赛程
- 从最新 `scores` 读取比分
- 只对 `finished` 的比赛计入积分
- 自动计算：
  - 已赛
  - 胜
  - 平
  - 负
  - 进球
  - 失球
  - 净胜球
  - 积分
- 按 `积分 -> 净胜球 -> 进球 -> 英文队名` 排序

这样做的意义是：

- 不需要手工同步积分榜
- 比分一更新，积分表自动更新
- 页面逻辑和数据逻辑解耦

### 5.4 前端展示的降级策略

当比赛未开始或实时数据不可用时，前端遵循以下规则：

- 比赛未开始时，比分显示为 `0:0` 或对应未开赛态
- 积分表全部按 `0` 展示，不显示伪造数据
- 若服务端接口失败，退回本地 `matchScores.ts` 与 `teams.ts`

这保证了页面在任何时候都有可展示内容，但不会因为外部接口波动导致整站失效。

## 6. 后端技术方案

### 6.1 为什么这里的“后端”仍然放在 Next.js 内

这个项目的数据规模和写入频率并不高，本质上是一个“低写入、读多、以展示为主”的内容型站点。  
在这个前提下，单独拆一个 Node 服务、数据库、消息队列并不经济，反而会提高部署成本和维护复杂度。

因此当前采用的是：

- `Next.js Route Handlers` 直接承担 API 能力
- `Vercel Blob` 作为轻量持久化存储
- `GitHub Actions` 作为外部调度器

这是一种对当前业务规模更合适的低成本架构。

### 6.2 实时数据统一出口

接口：

- `GET /api/live-data`

职责：

- 读取当前比分存储
- 动态构建小组积分表
- 返回淘汰赛静态结构
- 禁止缓存，确保前端始终拿到最新值

返回内容主要包括：

- `updatedAt`
- `sync`
- `scores`
- `groups`
- `knockoutRounds`

这里的原则是：前端永远只认一个事实源，避免多个组件分别读不同的数据文件造成状态不一致。

### 6.3 比分同步接口

接口：

- `GET /api/cron/sync-scores`

职责：

- 校验 `Authorization: Bearer <CRON_SECRET>`
- 调用比分同步服务 `syncScores()`
- 返回本次同步状态和诊断信息

返回信息包括：

- `ok`
- `skipped`
- `dates`
- `scopeDates`
- `fetchedCount`
- `updatedAt`
- `hasBlobToken`
- `persisted`
- `persistedError`
- `errors`
- `attemptAt`
- `status`

这套诊断字段是生产排障时非常关键的设计，因为“抓取成功”和“持久化成功”是两件不同的事情，必须分别可观察。

## 7. 比分同步链路

### 7.1 同步流程

完整链路如下：

1. GitHub Actions 定时触发
2. Workflow 调用线上 `/api/cron/sync-scores`
3. 服务端判断是否已有比赛开始
4. 读取当前 Blob 中的历史比分
5. 计算需要同步的比赛日期
6. 调 ESPN Scoreboard 接口拉取比分
7. 将结果映射到本地比赛 ID
8. 合并到比分存储中
9. 写回 Vercel Blob
10. 前端轮询 `/api/live-data` 后获得最新数据

### 7.2 为什么不是“每次全量抓所有日期”

因为世界杯赛程跨度长、请求频率高，如果每次全量抓，会带来两个问题：

- 无意义的外部请求过多
- 失败面扩大，排障成本上升

所以当前策略是：

- 只同步最近已开赛的比赛日
- 只针对尚未 `finished` 的比赛做重点刷新

这是在免费方案下更稳妥的折中。

### 7.3 为什么要同时考虑 `previousDate`、`match.date`、`utcDate`

这是为了解决跨天比赛和第三方接口归档日期不一致的问题。

真实场景里，有些比赛本地定义为：

- `2026-06-12 02:00 UTC`

但 ESPN 的 scoreboard 可能把它挂在：

- `20260611`

如果只按 `match.date` 抓，比分就会漏掉。  
因此同步逻辑会对每场比赛计算多个候选日期：

- 前一天 `previousDate`
- 原始赛程日 `match.date`
- 按 UTC 开球时间换算得到的 `utcDate`

这样才能覆盖第三方源的归档差异。

### 7.4 队名映射问题

外部源和本地赛程的队名不完全一致，例如：

- `Korea Republic` -> `South Korea`
- `USA` -> `United States`
- `Bosnia and Herzegovina` -> `Bosnia Herzegovina`
- `Türkiye` -> `Turkey`
- `IR Iran` -> `Iran`
- `Côte d'Ivoire` -> `Ivory Coast`

因此抓取层和积分计算层都做了统一的标准化处理：

- 转小写
- 去重音符号
- 去掉特殊字符
- 套用 alias 映射表

如果没有这一步，即使抓到比分，也可能无法正确映射到本地比赛和积分榜。

## 8. 存储方案

### 8.1 为什么使用 Vercel Blob

这个项目的比分数据有几个特点：

- 数据量小
- 写频率低
- 主要按 JSON 整体读写
- 不需要复杂查询

因此使用传统数据库并不划算。  
当前选择 `Vercel Blob` 的原因是：

- 与 Vercel 部署天然集成
- 适合存储 JSON 历史快照
- 成本低，接入简单

### 8.2 当前存储模型

比分统一存储在：

- `scores/history.json`

结构大致包含：

- `updatedAt`
- `scores`
- `sync`

其中：

- `scores` 是以 `matchId` 为 key 的比分字典
- `sync` 用于记录最近一次同步元信息

### 8.3 私有 Blob 的处理方式

当前 Blob Store 是 `private` 模式，因此读写时必须显式按私有方式处理。

关键点：

- 写入时使用 `access: 'private'`
- 读取时使用 `get(..., { access: 'private', useCache: false })`
- 不能把 private store 当作 public URL 来直接 `fetch`

此前线上 500 的根因，就是把 private store 误按 public blob 使用。

### 8.4 fallback 机制

如果没有配置 `BLOB_READ_WRITE_TOKEN`，系统仍然可以运行，但会退化为只读静态模式：

- 读取 `src/app/data/matchScores.ts`
- 读取 `src/app/data/teams.ts`
- 不做持久化写入

这让项目在本地开发、预览环境、或存储未初始化时仍能正常展示。

## 9. 定时任务方案

### 9.1 为什么不用 Vercel Cron

Vercel Cron 在免费版不可用，直接依赖它会导致部署或运行受限。  
因此当前采用免费替代方案：

- `GitHub Actions schedule + 线上同步接口`

### 9.2 当前调度配置

文件：

- `.github/workflows/sync-scores.yml`

当前配置为每 `5` 分钟触发一次：

```yml
on:
  schedule:
    - cron: '*/5 * * * *'
  workflow_dispatch:
```

说明：

- 免费方案下无法稳定做到真正“每 1 分钟”
- 当前以 5 分钟为粒度，是成本与可用性的平衡
- 同时支持 `workflow_dispatch` 手动触发，便于排障和验证

### 9.3 GitHub Actions 做了什么

Workflow 本身不处理业务逻辑，它只做一件事：

- 用 `curl` 请求线上 `/api/cron/sync-scores`

好处是：

- 把业务逻辑留在应用内，避免双份实现
- 本地调试、线上调试、手动触发都走同一个接口
- 调度器只负责“唤醒”，而不是承担业务状态

## 10. 环境变量

生产环境至少需要以下变量：

### Vercel

| 变量名 | 是否必须 | 用途 |
| --- | --- | --- |
| `CRON_SECRET` | 必须 | 保护 `/api/cron/sync-scores`，防止未授权调用 |
| `BLOB_READ_WRITE_TOKEN` | 建议必须 | 读写 Vercel Blob，持久化比分历史 |

### GitHub Actions Secrets

| 变量名 | 是否必须 | 用途 |
| --- | --- | --- |
| `SCORE_SYNC_URL` | 必须 | 线上同步接口地址，例如 `https://your-domain/api/cron/sync-scores` |
| `CRON_SECRET` | 必须 | 与 Vercel 中保持一致，用于请求鉴权 |

### 已直接写入代码的配置

以下配置当前是直接写死在项目里的，不依赖环境变量：

- Google Analytics ID：`G-H0MFTF8LDE`
- Google AdSense client：`ca-pub-3737000364381871`
- Google Search Console verification meta

如果后续需要多环境复用，建议将它们也迁移为环境变量。

## 11. 本地开发

### 11.1 安装依赖

推荐使用 `pnpm`：

```bash
pnpm install
```

### 11.2 启动开发环境

```bash
pnpm dev
```

默认会启动 Next.js 本地开发服务器。

### 11.3 生产构建

```bash
pnpm build
pnpm start
```

### 11.4 本地开发的现实说明

如果你本地没有配置 `BLOB_READ_WRITE_TOKEN`，项目依旧可以跑，但会进入 fallback 模式：

- 页面可以正常打开
- 积分和比分读取本地静态文件
- 自动抓取无法真正持久化到 Blob

这对页面开发是足够的，对数据链路联调则不够。

## 12. 部署方案

### 12.1 推荐部署方式

当前推荐的生产部署方案是：

- 代码托管在 GitHub
- 站点部署到 Vercel
- Blob 存储也使用 Vercel
- 定时任务使用 GitHub Actions

### 12.2 部署步骤

1. 将仓库导入 Vercel
2. 在 Vercel 中配置环境变量：
   - `CRON_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
3. 完成首次部署
4. 在 GitHub 仓库 Secrets 中配置：
   - `SCORE_SYNC_URL`
   - `CRON_SECRET`
5. 启用 `.github/workflows/sync-scores.yml`
6. 手动执行一次 `workflow_dispatch`
7. 检查 `/api/cron/sync-scores` 返回是否正常
8. 检查 `/api/live-data` 是否返回最新比分

### 12.3 为什么 GitHub 也要配置 `CRON_SECRET`

因为 GitHub Actions 是同步请求的发起方，Vercel API 是被调用方。  
它们必须共享同一个密钥，才能让：

- GitHub 发请求时带上正确 Bearer Token
- Vercel 在接口层验证来源是否合法

## 13. 调试与排障

### 13.1 验证实时接口

访问：

- `/api/live-data`

重点检查：

- 是否返回 `scores`
- `groups` 是否已按最新比分重算
- `updatedAt` 是否变化
- `sync.lastStatus` 是否合理

### 13.2 验证同步接口

访问：

- `/api/cron/sync-scores`

请求时需要带：

```http
Authorization: Bearer <CRON_SECRET>
```

重点检查返回字段：

- `ok`
- `persisted`
- `persistedError`
- `errors`
- `dates`
- `scopeDates`
- `fetchedCount`

### 13.3 常见问题

#### 1. `persisted: false`

优先排查：

- 是否缺少 `BLOB_READ_WRITE_TOKEN`
- Blob store 是否是 private，但代码按 public 方式读写

#### 2. `/api/cron/sync-scores` 返回 401

优先排查：

- `Authorization` 请求头是否正确
- GitHub Secrets 里的 `CRON_SECRET` 是否与 Vercel 中一致

#### 3. 接口返回成功，但页面比分没更新

优先排查：

- `/api/live-data` 是否已经返回新数据
- 该比赛是否被 ESPN 归档到前一天日期
- 队名是否存在 alias 不一致问题
- 前端轮询是否已经触发下一次刷新

#### 4. 某场比赛 ESPN 明明有数据，本地却没映射到

优先排查：

- `matches.ts` 中的队名是否与外部源一致
- `TEAM_NAME_ALIASES` 是否缺失映射
- 比赛日期是否存在跨天归档偏移

## 14. 多语言、统计与广告方案

### 14.1 多语言

项目采用按语言路由组织页面，配合字典文件管理多语言文案。  
多语言不仅用于页面展示，也影响：

- SEO metadata
- 页面结构化数据
- disclaimer 文案

### 14.2 Google Analytics

GA 已在布局层接入，并通过客户端组件监听路由变化，确保单页路由跳转也会上报页面浏览。

当前实现包含：

- `gtag` 基础脚本注入
- 首屏页面路径上报
- 客户端路由切换上报

### 14.3 Google AdSense

AdSense 脚本已直接输出在布局的 `head` 中，而不是完全依赖 hydration 后注入。  
这样做的原因是：

- 更有利于 Google 抓取验证
- 避免脚本只在客户端注入导致验证失败

### 14.4 Google Search Console

站点首页布局已加入 `google-site-verification` meta，用于 Search Console 归属验证。

## 15. 当前数据设计原则

本项目的数据设计遵循以下原则：

- `matches.ts` 是赛程主数据源
- `matchScores.ts` 是静态比分 fallback
- `teams.ts` 提供小组与淘汰赛基础模板
- `Blob` 中的 `history.json` 是生产环境的实时比分状态
- `standings.ts` 根据比分推导积分，而不是手工维护排名

这意味着：

- 赛程是“事实框架”
- 比分是“动态状态”
- 积分榜是“计算结果”

这样分层后，数据职责更清晰，也更容易维护。

## 16. 适合继续演进的方向

如果后续要继续升级，可以优先考虑以下方向：

### 短期优化

- 将 GA / AdSense / Search Console 配置迁移到环境变量
- 给比分同步增加更明确的日志上报
- 在 README 外再补一份运维手册

### 中期优化

- 给 Blob 中的比分结构增加版本号
- 增加人工修正比分的后台入口
- 增加更多比赛状态，如 `scheduled / live / finished / postponed`

### 长期优化

- 如果后续数据规模扩大，再考虑引入数据库
- 如需更高频同步，再考虑独立任务服务或队列系统
- 如果需要更强可观测性，可接入日志平台与告警

## 17. 项目运行结论

当前项目已经形成完整闭环：

- 页面层可以展示真实赛程与比分
- 服务端可以统一输出实时数据
- 定时任务可以自动触发抓取
- Blob 可以持久化历史比分
- 前端可以按分钟级刷新页面
- 站点已具备 SEO、统计、广告的生产能力

换句话说，这不是一个“设计稿还原项目”，而是一套可以持续运转的世界杯信息站点。
  
