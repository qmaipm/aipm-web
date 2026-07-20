# aipm-site — 启盟科技 / FMClaw™ 官网建设 Skill

> 在 aipm.cn(仓库 qmaipm/aipm-web)上新建或改版任何页面时,照本文执行。
> 本文沉淀自 2026-06 至 2026-07 的多轮改版实践(fmclaw 产品页 / workshop / capability 四页 / 控制台)。
> 配合根目录 `DESIGN.md`(全站 Token 基线)与 `REDESIGN-GUIDE.md`(改版手法细则)使用;三者冲突时,以本文为准。

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

- **标题**:句子当标题、平实中文、不带句号。h2 尽量一行(`white-space:nowrap` + 窄屏兜底)。
- **正文**:中文行高 ≥1.7,正文 ≥16px,每行 ≤66 字符。`<b>` 只加在真正的结论句上。
- **FAQ 写法**:用买家的真实问题当 q(出了错谁负责?怎么防越权?能查到哪一步?数据会不会串?能不能随时叫停?),
  a 第一句先给直接答案(人负责。/能。/不会。/可以。),再展开一两句。
- **权限/安全类叙述**:学 OpenAI 的三档式人话——"直接执行 / 先经人批准 / 全程有记录",每档配一个"例:"。
- **页面 title 格式**:`中文名(English)｜FMClaw™ + 一句定位`,description 自然嵌入 SEO 词(智能体治理、AI 权限管理、审计日志等),不堆砌。
- 结尾 CTA 用一句有态度的短句(例:"让智能体进核心业务之前,先看看它怎么被管")。

## 2. VI(硬约束)

- **品牌渐变**:`linear-gradient(115deg,#0070FF,#12B98A)` 蓝→绿。主按钮永远用它(`--brand-grad`),内页主题不得覆盖。
- **单一字族**:Noto Sans SC / 系统栈。页面 CSS 里**禁止任何 `font-family` 声明**。性格靠字号/字重/字距。
- **强调色只蓝绿**。不得出现金/紫/粉等暖色(唯一例外:首页 `--human` 琥珀 = "人做最后决定"语义)。
- **冷调平台色板**(产品/平台/服务页,scoped 在页面 wrapper 上):
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

## 4. Hero 两种规格(二选一,不许混出第三种)

### 4a. 照片暗场 hero(样板:`/workshop` 的 `.ws-hero`;控制台 `.fmc-phero` 已对齐)
适用:有分量、要"真实感"的页面(服务、治理、案例)。**五要素齐全,一个都不能省:**
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

### 4b. 左文右插画 hero(样板:`/products/fmclaw/*` 的 `.fmc-hero`)
适用:平台能力页(白底)。左列 面包屑→kicker→H1(≤52px)→def 定义句,右列插画。

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
- [ ] 无黑话禁用词 / 无感叹号夸大词 / 标题无句号 / 数字全部已核实
- [ ] 斑马纹交替 / ≤1 处暗场 / 留白 ~30%
- [ ] hero 严格走 4a 或 4b 规格(照片 hero 五要素齐 + DARK_HERO 名单)
- [ ] 样式 scoped / 共享组件优先 / FmFaq 不重复 JSON-LD
- [ ] §6 全站联动清单逐条过 / grep 零残留
- [ ] build 通过 / 截图验收 / commit+push+PR#12 comment
