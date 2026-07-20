# aipm-site — 启盟科技 / FMClaw™ 官网建设 Skill

> 在 aipm.cn(仓库 qmaipm/aipm-web)上新建或改版任何页面时,照本文执行。
> 本文沉淀自 2026-06 至 2026-07 的多轮改版实践(fmclaw 产品页 / workshop / capability 四页 / 控制台)。
> 根目录 `DESIGN.md`(全站基线)与 `REDESIGN-GUIDE.md`(改版手法细则)是老标准、是本文的依据;
> 本文只做对齐与补充,**如有冲突,以老标准为准**,并回来修正本文。
> 全站对齐的三个参照页:首页 `/`、`/workshop`、`/partners/agent-park`。新页面的色板、hero、wording 一律向这三页看齐。

---

## 大原则(优先级高于一切细则)

### 原则一:先当专家,再当执行者
用户提出任何要求,**先分析这是什么种类的问题**(品牌/SEO/交互/文案/工程/定位…),
然后站在该领域世界顶尖专家的角度,**先给出专业建议、和用户商量,再动手**。
禁止退化成"用户说什么就做什么":该你拍板的专业问题(如 title 后缀、命名、排版),
直接给方案和理由,不要把选择题丢回给用户;方向性问题才需要用户确认。

### 原则二:设计任何页面前,先查再做
动手设计之前,必须先完成两项调研:
1. **SEO/GEO 策略**:这类页面的搜索意图、目标关键词、结构化数据(JSON-LD)、
   以及面向 AI 引擎(GEO)的可引用性——直接回答式段落、FAQ、清晰的定义句。
2. **同类 AI 企业对标**:其他 AI 公司做不做这个页面?做的话怎么做?
   **尤其是 Anthropic、Palantir、OpenAI** 三家:看它们的页面结构、命名、信息密度、CTA 设计。
最后落地时,wording 一律是**务实克制、陈述事实的 Anthropic 风格,加一点 Palantir 的留白与不啰嗦**。

**已完成的调研结论(2026-07,后续直接复用,不必重查):**
- GEO 有效手段(Google 官方指南 + Princeton 研究):非同质化内容(独家已验证数字、第一手案例)、
  每节首句直接给答案(passage 检索按段取)、FAQ 问答对、干净标题层级、
  正文中可独立引用的定义块(`.fmc-defbox`)、「最后更新」时间戳、robots 显式放行 AI 爬虫
  (GPTBot/OAI-SearchBot/ClaudeBot/anthropic-ai/PerplexityBot/Google-Extended,已入 app/robots.ts)。
- GEO 伪需求(Google 官方辟谣,不要做):llms.txt、为 AI 拆碎内容(chunking)、
  为 AI 改写文案、堆长尾变体页、刻意刷外部 mentions。
- 对标实证:Palantir Foundry 产品页 = 4 组「判断短句标题 + 两句解释」零形容词;
  OpenAI Business = 客户案例前置首屏、卖点配真实产品截图、全页单一 CTA 反复出现。
- 数字纪律的 GEO 理由:独家数字最招 AI 引用;未核实数字被引用后是负资产;
  同一数字全站口径必须逐字一致(AI 会跨页交叉核对)。

---

## 0. 调性(一切判断的根)

**70% Anthropic + 30% Palantir**:克制、留白、平静陈述事实;"已部署"的真实感、短句即笃定。

- **说人话**。每个词都要过一遍:采购总监、项目经理能不能一眼读懂?
  判断标准:"在 Anthropic 或 Palantir 的官网上,会出现这个词吗?"
- **禁用词**(黑话,出现即改):留痕、管控、门控、流程门控、控制层、收口、赋能、抓手、闭环、拉通。
  替换示例:留痕→有记录 / 管控→管理、管住 / 门控→先经人批准 / 收口→统一在一个地方。
- **禁用**:感叹号、夸大词(最/第一/颠覆/领先/革命性)、emoji、全大写英文大标题+中文副标的 PPT 结构。
- **数字纪律**:只用已核实的数字。当前可用:**500 项目**、**100+ 预制工作流**。任何新数字先问用户。
- 命名对齐行业惯例,不自造大词。先查 Anthropic / Palantir / OpenAI 同类功能怎么叫
  (例:治理页叫 控制台/Console,对齐 Anthropic Console、Palantir Control Panel;
  反例:指挥中心/Command Center——Salesforce 自己都改名了)。

## 1. Wording 细则

- **全角标点**:中文文案一律用全角 ，：（）(参照页统计:首页 56:0、workshop 65:0、agent-park 47:0,全角:半角)。
  半角 ,:() 只出现在代码、纯英文句和 CSS 里。批量转换时正则的 lookbehind 只认汉字类,**不要把引号并入字符类**(会误伤代码里字符串后的逗号,曾造成 16 个 TS1127)。
- **标题**:句子当标题、平实中文。h2 尽量一行(`white-space:nowrap` + 窄屏兜底)。
  句号规则:名词短语式 h2 不带句号;**判断句式双短句 h2 可带句号**,但只适用于
  **陈述产品属性的判断句**(Palantir Foundry 实证:"No Duplication." "Collaboration, Supercharged."
  ——宾语是产品的能力与事实;本站实例:「不是演示。已经在真实项目中运行。」)。
  **禁止作者腔格言当 h2**:议论世事难易、択情、金句体都不行——Anthropic 从不用
  格言当标题,标题只说产品能做什么、为谁做(反例,已下线:「跑通一次不难。难的是每天稳定地跑。」
  ——这是作者在议论,不是产品在陈述)。
- **正文**:中文行高 ≥1.7,正文 ≥16px,每行 ≤66 字符。`<b>` 只加在真正的结论句上。
- **FAQ 写法**:用买家的真实问题当 q(出了错谁负责?怎么防越权?能查到哪一步?数据会不会串?能不能随时叫停?),
  a 第一句先给直接答案(人负责。/能。/不会。/可以。),再展开一两句。
- **权限/安全类叙述**:学 OpenAI 的三档式人话——"直接执行 / 先经人批准 / 全程有记录",每档配一个"例:"。
- **页面 title 后缀规范**(全站已统一,新页照执行):
  - 公司/内容/服务/解决方案类页 → `… | 启盟科技`(半角竖线+空格)
  - 产品与能力类页 → `…｜FMClaw™ + 一句定位`(全角竖线,例:`控制台（Console）｜FMClaw™ 智能体安全、权限与审计`)
  - 不叠加双后缀(❌ `… — FMClaw™ 加速营 | 启盟科技`),不用 `— 启盟科技` / `- FMClaw` 等变体
  - description 自然嵌入 SEO 词(智能体治理、AI 权限管理、审计日志等),不堆砌。
- 结尾 CTA 用一句有态度的短句(例:"让智能体进核心业务之前,先看看它怎么被管")。

## 2. VI(硬约束)

- **品牌渐变**:`linear-gradient(115deg,#0070FF,#12B98A)` 蓝→绿。主按钮永远用它(`--brand-grad`),内页主题不得覆盖。
- **单一字族**:Noto Sans SC / 系统栈。页面 CSS 里**禁止任何 `font-family` 声明**。性格靠字号/字重/字距。
- **强调色只蓝绿**。不得出现金/紫/粉等暖色(唯一例外:首页 `--human` 琥珀 = "人做最后决定"语义)。
- **现行标准是冷调平台色板,不是暖米纸底**。三个参照页均如此:首页 `.solhome`、workshop `.solws`、agent-park `.solbd`,
  都是 白纸 `#FFFFFF` / 雾灰 `#ECF3F1` / 深墨绿 `#0B1714` + 蓝绿渐变。
  `globals.css` 里的暖米纸底(`--ivory:#F4F1E8` body 底)是历史遗留,被每个改版页的 scoped wrapper 覆盖;
  **新页面不用暖米纸底**,DESIGN.md 中暖纸时代的描述按历史文档看待。
- **冷调平台色板**(所有新页,scoped 在页面 wrapper 上):
  ```css
  --ink:#14201C; --ink-2:#46524D; --mut:#7C857F;
  --line:#E6EAE8; --mist:#ECF3F1; --paper:#FFF; --core:#0B1714;
  --grad:linear-gradient(115deg,#0070FF,#12B98A); --deep:#0C8B82;
  /* 暗场上的强调绿 */ #3fd9b8;  /* 暗场浅绿链接 */ #9fded0;
  /* 暗场正文 */ #AEBAB5;  /* 暗场 lead */ #D7E2DD;
  ```
- 渐变文字统一 `.grad`(background-clip:text + `@supports` 回退色)。

## 3. 页面结构原则

- **约 30% 留白**。段落 padding 104px(移动 76px),不密排。
- **斑马纹**:相邻段落背景必不同(白 `--paper` / 雾灰 `--mist` 交替),在 markup 手动交替,不用 nth-of-type。
- **全页只留一处暗场**(`--core` 深墨绿),给最有分量的一段(签名段)。
- 章节走 编号 eyebrow(01/02/…,渐变短杠)→ h2 → 正文/组件 的节奏。
- 组件优先复用 `capability.css` 共享件(见 §5),没有再新造。

### 3a. 总览页专则(2026-07 对标 Claude Enterprise / Palantir Foundry 后确立,严格执行)

总览页是**编排层,不是内容层**:它的职责是 论点→地图→证据→入口,内容本体留在子页。

1. **子页正文禁止复制到总览页**。同一张产品截图、同一段详情叙述,全站只在一个页面作主视觉;
   总览页只给一句定位 + 入口(反例,已修:工作流编辑器截图曾同时出现在总览页与 workflow-engine 子页)。
2. **同构卡片网格全页 ≤2 次**。每个主段落要有专属版式(对标 Claude Enterprise:logo 墙→三列→checklist
   面板→引言+指标→暗场视频→代码演示,无一重复);同一套卡片模板连用 3 次 = 设计失败。
3. **信任主张必须用 checklist 面板 + 具体能力清单**(Anthropic "Made to pass security review" 范式:
   独立面板 + 逐项 ✓ 可核对能力,本站实现:总览页 `.fmo-trust` 面板)。准确/一致/安全这类主张
   禁止用三张小字卡打发——大 B 买家要的是可逐项验证的清单,不是形容词。
4. **h2 禁作者腔格言**(见 §1 句号规则:句号只给产品属性判断句,不给议论难易的金句)。
5. **LinkCards 每页 ≤2 组**。入口优先融进段落本体(卡片本身可点、段尾一行箭头链接、chip 带),
   不靠末尾追加链接卡堆叠(反例,已修:总览页曾有 6 组 LinkCards)。
6. **配图铁律**:证据用真实产品界面,不用摆拍照片;概念用统一风格的等距 3D 插画
   (蓝绿渐变 #0070FF→#12B98A、浅薄荷底、无文字);重磅页面不吝恾插图,但每张图必须有信息职责,
   装饰性配图一张都不要。

## 4. Hero 两种规格(二选一,不许混出第三种)

**分工(用户裁定,照此执行):照片更多用在偏重场景的页面;产品和技术页面,适度使用现在的插图。**

### 4a. 照片暗场 hero(样板:`/workshop` 的 `.ws-hero`;控制台 `.fmc-phero` 已对齐)
适用:**偏重场景的页面**(加速营、服务、案例等有真实现场感的页面)。**五要素齐全,一个都不能省:**
1. **kicker/面包屑**:12px 大写宽字距,浅绿 `#9fded0`,hover 白
2. **H1**:`clamp(38px,6vw,72px)/1.06/800/-.035em`,max-width 18ch,白字 + `text-shadow:0 2px 60px rgba(0,112,255,.22)`,**尾句用 `.grad` 渐变**
3. **lead**:`#D7E2DD`,54ch,**结尾一句加粗白字结论**
4. **双 CTA**:`.btn-primary`(页内锚点+下箭头)+ `.btn-ghost`(白描边,`rgba(255,255,255,.45)` 边 / `.05` 底)
5. **proof 横条**:margin-top 52px,`#AEBAB5`,白字 `<b>` 重点 × 3,圆点 `.sep` 分隔,最后一项 `b.grad` 渐变收尾

容器:`padding:186px 0 76px; min-height:640px; align-items:flex-end`(移动 `150px 0 56px; min-height:0`)。
底图:`center/cover` + **双层渐变遮罩**
`linear-gradient(180deg,rgba(7,17,14,.46),rgba(7,17,14,.24) 42%,rgba(7,17,14,.88))` +
`linear-gradient(100deg,rgba(7,17,14,.56),rgba(7,17,14,.16) 55%,transparent 80%)`,
再叠一层**蓝图网格**(暗场版 `rgba(63,217,184,.09)`)。

**⚠️ 必做**:页面路由加进 `components/Navbar.tsx` 的 `DARK_HERO` 名单(顶部导航转白字);
面包屑用 `<FmBreadcrumb onDark …/>`。

### 4b. 左文右插画 hero(样板:`/partners/agent-park` 的 `.bd-hero`、`/products/fmclaw/*` 的 `.fmc-hero`)
适用:**产品和技术页面**(白底,适度使用插图)。grid 约 1.1fr/.9fr,左列 面包屑/kicker→H1(≤54px,尾句 `.grad`)→lead→CTA(可加 chips),右列插画。

## 5. CSS 工程约定与共享组件

- **页面样式全部 scoped** 在 wrapper 类内(如 `.fmc` / `.solws`)。禁止碰 `:root` / `body` / 通用类。
- capability 系页面(`/products/fmclaw/*`)共用 `capability.css`,已有组件**先用后造**:
  `.fmc-sec(.mist/.dark)` 段落 / `.fmc-defbox` 定义框 / `.fmc-tags` 标签 / `.fmo-lrow` 图文行(+`.fmo-lsub`)
  `.fmo-verdict` 判词 / `.fmo-linkcards` 链接卡(亮/mist/dark 三态) / `.fmo-howgrid/howcase/hownote`
  `.fmo-tiers/.fmo-tier` 暗场分档卡(带 `.fmo-tier-tag` 和 `.ex` 例句) / `.fmc-cols3/.fmc-cell` 三列
  `.fmc-phero` 照片 hero / `.fmc-crumb(.on-dark)` 面包屑 / `.fmo-upd` 更新时间 / `.fmc-grid` 蓝图网格
- `_shared.tsx` 公共件:`FmBreadcrumb`(自带 BreadcrumbList JSON-LD,支持 `onDark`)、
  `FmFaq`(**自动输出 FAQPage JSON-LD,不要再手写一份**)、`techArticleLd`、`Arrow`、`IC` 图标集、`LinkCards`。
- 每页质量底线:`prefers-reduced-motion` 降级、`:focus-visible`、≤600px 无横向溢出、触摸目标 ≥44px。
- 图片:真人摄影插图用 AI 生成(photorealistic editorial corporate、亚洲面孔、无 logo/可读文字),
  1800px 宽 JPEG q86 progressive,存 `public/` 对应目录;`<img>` 带宽高与 alt(alt 写场景不写"插画感受")。

## 6. 全站联动(改名/新页必查清单)

任何页面改名或新增,以下位置**必须一起改**,漏一处都算没完成:
1. `lib/nav.ts` — 顶部导航下拉(label + small)**和** `FOOTER_COLS` footer 链接
2. `app/(site)/products/fmclaw/page.tsx` 总览页 — LAYERS 卡、架构图 alt、verdict 句、底部 linkcard
3. 兄弟能力页的 `LinkCards` 互链(connectors / workflow-engine / ontology / agent-runtime)
4. `app/(agents)/_agents-app/components/sections/MatrixSections.tsx`
5. insights 文章内链
6. 深色 hero 页 → `Navbar.tsx` 的 `DARK_HERO` 名单
7. 改完 `grep -rn "旧名" app lib` 确认零残留

## 7. 工作流(每次改动)

1. **PLAN → 用户确认 → 再动手**。方案里写清楚:改哪些文件、命名依据(引用行业先例)、页面结构。
2. 读代码理解现状,不凭截图猜;**截图只用于最终验收**。
3. 改完:`npx next build` → 重启服务 → Playwright 全页+分段截图,肉眼核验(暗场对比度、导航两态、footer)。
4. **每次改动必须**:commit(conventional 格式,中文正文)→ push `genspark_ai_developer` →
   在 **PR #12**(https://github.com/qmaipm/aipm-web/pull/12)发 comment 说明改动与验收结果。
5. 服务重启:`kill 3000端口进程 → npx next start -p 3000 后台运行`。

## 8. 每页完成前检查清单

- [ ] 无 font-family / 无暖色 / 强调只蓝绿 / 主按钮 `--brand-grad`
- [ ] 无黑话禁用词 / 无感叹号夸大词 / 标题无句号 / 数字全部已核实 / 中文全角标点
- [ ] 斑马纹交替 / ≤1 处暗场 / 留白 ~30%
- [ ] hero 严格走 4a 或 4b 规格(照片 hero 五要素齐 + DARK_HERO 名单)
- [ ] 样式 scoped / 共享组件优先 / FmFaq 不重复 JSON-LD
- [ ] §6 全站联动清单逐条过 / grep 零残留
- [ ] build 通过 / 截图验收 / commit+push+PR#12 comment
