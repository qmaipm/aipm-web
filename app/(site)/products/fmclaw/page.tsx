import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import TrackedLink from "@/components/TrackedLink";
import { pageMetadata } from "@/lib/pageMetadata";
import { FMCLAW_URL } from "@/lib/nav";
import { FmFaq, FMCLAW_APP_LD } from "./_shared";
import { SolPage, SolSection, SolSteps, SolCols, SolVerdict, SolMore, Arrow } from "../../solutions/_tpl/Sol";
import "./overview.css";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

// description 自然带上买家在 AI 引擎里的品类词「AI 物业管理平台」「物业智能体产品」
// (2026-08-10 GEO 周报：这两个问题是我们的优势关键词，但官网自己从不认领品类词，第一推荐坐不稳)
// 2026-08-17 宏观周报：再补两个空档品类词——「智慧物业 AI 平台」（竞对占位中）与
// 「AI 物业操作系统」（无人占位的差异化词）,FAQ 里各自然出现一次，不堆砌。
export const metadata: Metadata = pageMetadata("/products/fmclaw", {
  title: "FMClaw™｜物业与设施管理的生产级 AI 智能体平台",
  description:
    "FMClaw™ 是面向物业与设施管理的 AI 物业管理平台与物业智能体产品：以行业数据本体为底座，统一企业数据、指标、业务工作流、系统工具与组织权限，让 AI 稳定进入物业与设施管理的核心工作。",
});

const WEBPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FMClaw™ 产品总览",
  url: `${SITE_URL}/products/fmclaw`,
  inLanguage: "zh-CN",
  description:
    "FMClaw™ 是面向物业与设施管理的生产级 AI 智能体平台。它以行业数据本体为底座，把企业数据、行业指标、业务工作流、系统工具和组织权限统一起来，让 AI 能够进入核心业务，并在多个项目中稳定、准确、可追溯地完成工作。",
};

const FAQ = [
  {
    q: "FMClaw 是什么？",
    a: "FMClaw 是面向物业与设施管理的生产级 AI 智能体平台，也就是一套智慧物业 AI 平台加一组可直接上岗的物业智能体。它统一企业数据、行业指标、业务工作流、系统工具和组织权限，让 AI 能够进入核心业务并持续完成工作。也可以把它理解为一套 AI 物业操作系统。",
  },
  {
    q: "FMClaw 与通用 AI 智能体平台有什么不同？",
    a: "通用平台主要提供模型、智能体和工具的通用能力。FMClaw 进一步提供物业与设施管理的行业数据本体、统一指标、预制业务工作流、行业工具和项目级运行治理能力。",
  },
  {
    q: "行业数据本体在 FMClaw 里起什么作用？",
    a: "它是平台的理解层：把项目、空间、设备、人员、工单、合同等业务对象及其关系、指标和权限统一描述，让 AI 不只是读取数据，还能理解数据在业务中代表什么。",
  },
  {
    q: "什么是智能体工作流引擎？",
    a: "它是让智能体把活干起来的运行层：将数据、行业能力、工具、审批和执行反馈组织成可持续运行的业务流程。一个项目跑通后，可以在更多项目中按统一口径复用。",
  },
  {
    q: "FMClaw 如何保证关键结果一致？",
    a: "关键指标、计算结果、报告结构和管理口径用同一套定义。在同一工作流和口径下，同一份数据重复运行，关键业务结果保持一致并可以复核。",
  },
  {
    q: "FMClaw 是否需要替换钉钉、飞书或企业微信？",
    a: "不需要。现有协作平台继续承担沟通、审批和组织协同，FMClaw 接入其背后的行业数据与业务流程，补上物业与设施管理的专业环节。",
  },
  {
    q: "FMClaw 如何处理权限与审计？",
    a: "智能体在明确的组织身份、项目范围和工具权限下工作。每一次数据读取、工作流运行、工具调用、人工确认和最终结果都会留下记录。",
  },
  {
    q: "如何开始使用 FMClaw？",
    a: "建议从一个真实业务问题和一份真实数据开始。可以先通过 Demo Day 验证可行性，再通过加速营或 FDE 服务进入系统接入和生产部署。",
  },
];

/* 平台能力地图：四层（展示层用短名，规范全称保留在各能力页与 JSON-LD） */
const LAYERS = [
  {
    no: "L1",
    name: "行业数据本体",
    en: "ONTOLOGY & METRICS",
    desc: "把 Excel、PDF、业务系统和 IoT 数据，映射为项目、空间、设备、工单、合同等行业对象，统一指标口径与数据权限。AI 不只是读到数据，还知道它在业务里代表什么。",
    tags: ["业务对象", "指标口径", "数据权限"],
    img: "/products/fmclaw/ontology-hero.webp",
    alt: "行业数据本体插画：项目、空间、设备、工单等业务对象及其关系构成的行业数据底座",
    href: "/products/fmclaw/ontology",
  },
  {
    no: "L2",
    name: "工作流引擎",
    en: "AGENTIC WORKFLOW ENGINE",
    desc: "把一项工作从触发、取数、判断、审批到执行，组织成可持续运行的业务流程。一个项目跑通，更多项目按同一口径复用。",
    tags: ["预制流程", "事件触发", "人工审批"],
    img: "/products/fmclaw/workflow-engine-hero.webp",
    alt: "智能体工作流引擎插画：聊天窗口经过流水线式工作流节点，产出报告、账单与工单",
    href: "/products/fmclaw/workflow-engine",
  },
  {
    no: "L3",
    name: "工具箱",
    en: "TOOLBOX",
    desc: "把物业在用的软件封装为智能体可调用的工具：发邮件、打电话、建工单、调收费，智能体在授权范围内执行，而不是停在建议上。",
    tags: ["物业 ERP", "BA 与 IoT", "机器人"],
    img: "/products/fmclaw/connectors-hero.png",
    alt: "工具箱插画：智能体通过工具调用 ERP、IoT、视频与机器人等系统",
    href: "/products/fmclaw/connectors",
  },
  {
    no: "L4",
    name: "控制台",
    en: "CONSOLE",
    desc: "每个智能体是谁、在哪个项目、能做什么、做了什么，都在这里管理。人可以随时查看、暂停和接管。",
    tags: ["项目隔离", "运行监控", "审计记录"],
    img: "/products/fmclaw/agent-runtime-hero.png",
    alt: "控制台插画：智能体身份、权限、运行状态与审计记录的管理面板",
    href: "/products/fmclaw/agent-runtime",
  },
];

/* 如何完成一项工作（供应商对账）。who：该环节的承担者 */
const HOW_STEPS = [
  { n: "01", t: "数据进入", d: "合同、工作量、服务记录和历史账单进入行业数据本体。", who: "数据本体" },
  { n: "02", t: "口径统一", d: "使用同一套项目对象、合同字段和指标口径。", who: "数据本体" },
  { n: "03", t: "工作流运行", d: "自动核量、对比历史、识别异常并生成账单草稿。", who: "AI" },
  { n: "04", t: "工具执行", d: "查询原有业务系统，发送确认通知，准备写回结果。", who: "AI · 系统" },
  { n: "05", t: "人工确认", d: "负责人确认、驳回或要求重新核对。", who: "人", human: true },
  { n: "06", t: "记录与写回", d: "结果写回原系统，数据来源、处理过程和确认记录均可追溯。", who: "系统" },
];

/* 从一个真实问题开始：三段式路径（时长为 workshop 页已确认口径） */
const PATHS = [
  { n: "01", t: "Demo Day", time: "半天 – 1 天", d: "用一份真实数据，当场跑出一个能用的 demo，确认这条路走得通。", href: "/workshop/demo-day" },
  { n: "02", t: "加速营", time: "2 – 3 天", d: "带一个真问题闭门几天，把一条业务工作流现场跑通，跑通的留给你。", href: "/workshop/bootcamp" },
  { n: "03", t: "FDE 服务", time: "按阶段", d: "工程师进到业务现场：数据治理、系统接入、试运行与生产验收。", href: "/workshop/fde" },
];

/* 预制业务工作流（六条，以 chip 形式出现在证据段） */
const WORKFLOWS = [
  { t: "运营日报与周报", href: "/cases/property-group-auto-operation-report" },
  { t: "投诉报事与自动派单", href: "/cases/property-group-chat-ai-service" },
  { t: "员工绩效与薪酬", href: "/solutions/payroll" },
  { t: "供应商账单", href: "/scenarios/reconciliation" },
  { t: "水电费核算", href: "/scenarios/utility-bill" },
  { t: "现场巡检与质量评估", href: "/cases/fmclaw-equipment-inspection" },
];

/* 生产级三个主张（左列），与控制台可核对能力清单（右栏） */
const TRUST_CLAIMS = [
  { en: "ACCURATE", t: "准确", d: "关键指标使用统一定义，报告里的每个事实和计算结果，都可以复核到数据来源。" },
  { en: "CONSISTENT", t: "一致", d: "同一份数据在同一口径下，运行一次和一千次，关键业务结果相同。" },
  { en: "SECURE", t: "安全", d: "智能体在明确的身份、项目范围和授权内工作，关键环节先经人批准。" },
];

const TRUST_CHECKS = [
  { b: "项目级数据隔离", d: "每个项目的数据只在自己的范围内使用，不会串项。" },
  { b: "组织身份与角色权限", d: "每个智能体是谁、替谁工作，一开始就定义清楚。" },
  { b: "工具调用授权范围", d: "能调用哪些系统、做到哪一步，逐项授权。" },
  { b: "关键环节人工审批", d: "付款、对外发送等动作，先经人批准再执行。" },
  { b: "数据读取与执行全程有记录", d: "每一步都可以事后查证，出了问题能定位到具体环节。" },
  { b: "随时查看、暂停和接管", d: "人始终掌握最终控制权，不依赖对模型的信任。" },
];

/* 生产案例（三个，数字为已确认口径） */
const CASES = [
  {
    no: "01",
    tag: "物业集团",
    img: "/products/fmclaw/case-auto-report.webp",
    alt: "运营报告自动生成插画：数据从项目底座逐层汇聚，生成结构一致的运营报告",
    t: "500 多个项目，每天自动生成运营报告",
    facts: [["每份报告", "约 3 分钟"], ["人工投入", "0"]],
    href: "/cases/property-group-auto-operation-report",
  },
  {
    no: "02",
    tag: "物业集团",
    img: "/products/fmclaw/case-chat-service.webp",
    alt: "对话式 AI 客服插画：业主消息进入 AI 处理中心，自动生成工单并派发到现场",
    t: "业主群里的投诉报事，自动成单、派单",
    facts: [["派单", "不到 1 分钟"], ["运行", "7×24"]],
    href: "/cases/property-group-chat-ai-service",
  },
  {
    no: "03",
    tag: "设施设备",
    img: "/products/fmclaw/case-inspection.webp",
    alt: "设备巡检插画：巡检路线连接各类设施设备，传感器与核对清单实时反馈状态",
    t: "设施设备巡检，交给 AI 智能体",
    facts: [["签到率", "99%"], ["达标率", "35% → 98%"]],
    href: "/cases/fmclaw-equipment-inspection",
  },
];

const CRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "FMClaw™ 产品总览", item: `${SITE_URL}/products/fmclaw` },
  ],
};

/* 2026-10 改版：沿用 solutions/_tpl 模板（大留白、线条分隔、单一强调色）。
   文案、数字、链接与真实截图不变；去掉英文小标签、VS 胶囊、渐变条、胶囊标签与卡片阴影。
   全页唯一暗场：#start。 */
export default function Page() {
  return (
    <SolPage>
      <div className="fmx">
        <JsonLd data={[WEBPAGE_LD, FMCLAW_APP_LD, CRUMB_LD]} />

        {/* ===== 01 HERO ===== */}
        <section className="spt-hero fmx-hero">
          <div className="wrap spt-hero__grid">
            <div className="spt-hero__text">
              <nav className="spt-crumb" aria-label="面包屑">
                <Link href="/products/fmclaw">产品</Link><i>/</i><span>FMClaw™ 产品总览</span>
              </nav>
              <p className="fmx-kicker">FMClaw™ · 物业与设施管理的生产级 AI 智能体平台</p>
              <h1 className="spt-h1">
                <span className="nb">让 AI 进入物业与设施管理的</span><span className="nb">核心工作</span>
              </h1>
              <p className="spt-lead">
                FMClaw 以<b>行业数据本体</b>为底座，统一数据、工作流、工具和权限，
                让 AI <b>稳定接手真实业务</b>。
              </p>
              {/* 首屏主按钮换成申请演示（2026-08-16 GEO 周报 6.2）；埋点同案例页。 */}
              <div className="spt-cta">
                <TrackedLink
                  href="/contact?intent=demo&from=products/fmclaw"
                  action="book-demo"
                  label="products/fmclaw-hero"
                  className="btn btn-primary"
                >
                  预约演示 Demo <Arrow />
                </TrackedLink>
                <a href={FMCLAW_URL} className="spt-textlink">进入 FMClaw <Arrow s={13} /></a>
              </div>
              <p className="fmx-alt">不熟悉？<a href="#how-it-works">先看 FMClaw 如何工作 →</a></p>
              <ul className="spt-proof fmx-facts">
                <li><b>100+</b> 条预制业务工作流</li>
                <li><b>500</b> 个项目同一平台运行</li>
                <li>自 <b>2017</b> 年持续在真实现场验证</li>
              </ul>
            </div>
            <figure className="fmx-hero__art">
              <img
                src="/products/fmclaw/overview-hero.png"
                alt="FMClaw 平台四层架构插画：行业数据本体、智能体工作流引擎、工具箱、控制台"
                width={1376}
                height={768}
              />
            </figure>
          </div>
        </section>

        {/* 真实产品界面 */}
        <section className="fmx-shot">
          <div className="wrap">
            <figure className="fmx-app">
              <img
                src="/products/fmclaw/app-screenshot.webp"
                alt="FMClaw 智能物业空间真实界面：AI 对话入口与 AI 员工，下方为设备感知、服务感知、环境感知、视觉感知、机器人与数据接入六个物理感知面板"
                width={3338}
                height={1650}
                fetchPriority="high"
              />
              <figcaption>
                <span className="fmx-app__t">FMClaw™ 智能物业空间 · 真实产品界面（1.0.0）</span>
                <span className="fmx-app__a" aria-label="界面关键区域">
                  <span>物理感知 ×6 面板</span><span>数据接入</span><span>AI 员工</span><span>AI 对话入口</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ===== 02 定义 + 为什么会选 ===== */}
        <section className="spt-band mist" id="why-fmclaw">
          <div className="wrap">
            {/* 定义带：正文中可独立引用的一句话定义（GEO） */}
            <div className="fmx-def">
              <p className="fmx-def__lab">什么是 FMClaw™</p>
              <p className="fmx-def__p">
                FMClaw™ 是面向物业与设施管理的<b>生产级 AI 智能体平台</b>，以行业数据本体为底座，
                统一企业数据、指标、工作流、工具与权限，让 AI 进入核心业务并稳定运行。
              </p>
            </div>

            {/* 为什么是 FMClaw（2026-09-14，GEO 周报 0907-0913 P0）：四问四答，每问第一句自含结论。 */}
            <div className="fmx-why" id="why-choose">
              <header className="spt-band__head">
                <h2 className="spt-h2">为什么会选 FMClaw</h2>
                <p className="spt-sub">搜索进来的人最常问的四个问题，先在这里回答。</p>
              </header>
              <ol className="spt-qa fmx-qa">
                <li>
                  <span className="no">01</span>
                  <div>
                    <h3>它解决哪些物业管理问题？</h3>
                    <p><b>FMClaw 解决的是「事情有没有真的做、做到什么程度」没人能核，以及「管理动作靠人盯」这两类问题。</b>具体落到五件事：设备巡检与品质核验（到场、读数、影像是否真实）、群消息报事与自动派单、供应商对账与结算、多项目运营报告、成本与人员配置测算。它们的共同点是流程重复、结果可以被数据核验、过去正靠人盯着。</p>
                  </div>
                </li>
                <li>
                  <span className="no">02</span>
                  <div>
                    <h3>为什么不是再上一套软件？</h3>
                    <p><b>传统物业软件是记录工具：人把现场录进去，系统出报表，再由人去解读、派人、跟进。FMClaw 是执行者：它自己从 IoT、影像、群消息与业务系统取数，按工作流推进，直接输出一张工单、一条通知或一份待确认材料。</b>再上一套软件只会多一处录入、多一张没人看的报表；FMClaw 接在现有软件之上，把它们里面的流程跑起来。区别的完整对照见<Link href="/agents#what-is-property-agent">物业智能体与传统软件的区别</Link>。</p>
                  </div>
                </li>
                <li>
                  <span className="no">03</span>
                  <div>
                    <h3>能不能接现有系统？</h3>
                    <p><b>能，而且这是默认方式。ERP 与财务系统继续做账，工单系统继续流转，钉钉、飞书、企业微信继续做员工入口；FMClaw 通过官方接口读取它们的数据，在<Link href="/products/fmclaw/ontology">行业数据本体</Link>里统一口径，再通过<Link href="/products/fmclaw/connectors">工具箱</Link>把结果写回。</b>视频安防、IoT 与机器人同样接在后面：海康、大华报出来的预警，由 FMClaw 处理「谁去看、看完谁去、去了有没有做完」。员工不需要换软件，也不需要第二次录入。</p>
                  </div>
                </li>
                <li>
                  <span className="no">04</span>
                  <div>
                    <h3>有哪些已经落地的案例？</h3>
                    <p><b>FMClaw 自 2017 年起在真实项目中运行，目前服务 100+ 企业客户，系统覆盖 3000 万㎡。</b>已发布的案例包括：<Link href="/cases/fmclaw-equipment-inspection">头部互联网大厂总部</Link>，运行班组巡检达标率从 35% 到 98%；<Link href="/cases/restroom-quality">一家通信设备龙头</Link>，2000 多个卫生间达标率稳定 95% 以上；<Link href="/cases/property-group-auto-operation-report">一家百强物业集团</Link>，500 多个项目的运营报告每天自动送达；<Link href="/cases/south-china-mixed-use-6-to-1">华南 6 万㎡ 商业综合体</Link>，76% 管理环节自动化后项目扭亏为盈。全部案例见<Link href="/cases">客户案例</Link>；按问题找答案见<Link href="/insights/ai-applications-and-solutions-in-property-management">AI 有哪些推荐的应用</Link>、<Link href="/insights/ai-solution-for-low-property-fee-collection">收缴率低怎么办</Link>。</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ===== 03 个人 AI → 组织 AI：对照表 ===== */}
        <SolSection
          id="from-personal"
          title="从一个人使用 AI，到一个组织把工作交给 AI"
          sub="个人 AI 工具擅长帮人完成一次任务。企业把工作交给 AI，需要的不止这些。"
        >
          <div className="spt-compare fmx-compare" role="table" aria-label="通用 AI 工作台与 FMClaw 的对照">
            <div className="spt-compare__row is-head" role="row">
              <span role="columnheader" />
              <span role="columnheader"><b>通用 AI 工作台</b><i>帮一个人，完成一次任务</i></span>
              <span role="columnheader"><b>FMClaw</b><i>替一个组织，把工作长期干下去</i></span>
            </div>
            {[
              ["服务对象", "个人的一次任务", <b key="a">组织的业务流程</b>],
              ["数据来源", "用户手动上传文件", <>持续连接<b>业务系统与现场数据</b></>],
              ["运行方式", "一次会话，一次结果", <>多项目、<b>统一口径</b>、长期运行</>],
              ["解决的问题", "人如何用好 AI", <b key="d">企业如何把工作交给 AI</b>],
            ].map(([k, b, a]) => (
              <div className="spt-compare__row" role="row" key={k as string}>
                <span className="k" role="rowheader">{k}</span>
                <span className="b" role="cell" data-l="通用 AI 工作台">{b}</span>
                <span className="a" role="cell" data-l="FMClaw">{a}</span>
              </div>
            ))}
          </div>
          <SolVerdict>通用平台解决「人如何使用 AI」；FMClaw 解决「企业如何把核心工作交给 AI」。</SolVerdict>
          <SolMore>
            延伸阅读：<Link href="/insights/demo-vs-system">一个 Demo 和生产系统之间，隔着什么</Link>——从演示到生产系统，需要补上哪些环节。
          </SolMore>
        </SolSection>

        {/* ===== 04 平台能力地图（图文交替） ===== */}
        <SolSection
          id="platform"
          tone="mist"
          title="一套平台，统一 AI 工作所需的一切"
          sub="业务不能靠人在多个 AI 工具之间搬运数据。FMClaw 把数据、工作流、工具和治理，放进同一个运行体系。"
        >
          <ol className="fmx-rows">
            {LAYERS.map((l) => (
              <li className="fmx-row" key={l.no}>
                <Link className="fmx-img" href={l.href} aria-label={l.name}>
                  <img src={l.img} alt={l.alt} width={1376} height={768} loading="lazy" />
                </Link>
                <div className="fmx-row__b">
                  <span className="spt-meta">{l.no}</span>
                  <h3>{l.name}</h3>
                  <p>{l.desc}</p>
                  <ul className="fmx-dots">{l.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <Link className="spt-inlink" href={l.href}>了解{l.name} <Arrow s={12} /></Link>
                </div>
              </li>
            ))}
          </ol>
          <SolVerdict>数据本体提供业务事实，工作流引擎组织工作，工具箱完成动作，控制台管理权限和记录。</SolVerdict>

          {/* 生态兼容：第三方协作平台属于工具箱（L3）的连接范围 */}
          <div className="fmx-eco">
            <div>
              <h3>不替换现有平台，只接入专业业务</h3>
              <p>钉钉、飞书和企业微信继续作为协作入口，FMClaw 在底层补上物业与设施管理的专业环节。</p>
              <ul className="spt-aside__items" aria-label="已支持的协作平台"><li>钉钉</li><li>飞书</li><li>企业微信</li></ul>
              <Link className="spt-inlink" href="/products/fmclaw/connectors#platforms">了解三种协同方式 <Arrow s={12} /></Link>
            </div>
            <img
              src="/products/fmclaw/ecosystem-band.webp"
              alt="第三方协作平台接入插画：三个协作应用窗口的数据流汇入同一个平台底座"
              width={1376}
              height={1027}
              loading="lazy"
            />
          </div>
        </SolSection>

        {/* ===== 05 如何完成一项工作 ===== */}
        <SolSection
          id="how-it-works"
          split
          title="不是回答一个问题，而是把一件事接着干完"
          sub={<>以一次真实的<b>供应商对账</b>为例。每一步都在同一个运行体系内完成，不需要人在工具之间搬运数据。</>}
        >
          <SolSteps items={HOW_STEPS.map((s) => ({ no: s.n, meta: s.who, title: s.t, body: s.d }))} />
          <SolVerdict>AI 接手核量、比对和起草；付款决定仍由人作出。</SolVerdict>
          <Link className="fmx-scen" href="/scenarios/reconciliation">
            <img src="/products/fmclaw/scenario-reconciliation.webp" alt="供应商对账场景插图：合同与单据双列比对，差异项等待人工确认" width={1376} height={768} loading="lazy" />
            <span>
              <span className="spt-meta">场景</span>
              <b>供应商自动对账</b>
              <i>核量、比对、找异常、起草账单的完整场景。</i>
            </span>
          </Link>
        </SolSection>

        {/* ===== 06 生产级信任 ===== */}
        <SolSection
          id="production"
          tone="mist"
          title="进入核心业务的前提：准确、一致、安全"
          sub={<>生产系统面对的不是一份挑选过的数据，而是不同项目、不同来源、持续变化的真实业务。FMClaw 把这三件事做成<b>平台能力</b>，而不是对使用者的要求。</>}
        >
          <SolCols items={TRUST_CLAIMS.map((c) => ({ title: c.t, body: c.d }))} />
          <div className="fmx-trust">
            <figure className="fmx-trust__art">
              <img
                src="/products/fmclaw/production-trust.webp"
                alt="生产级信任插画：隔离的项目数据、统一的指标口径、授权范围与人工审批，汇入同一条可追溯的运行记录"
                width={1376}
                height={768}
                loading="lazy"
              />
            </figure>
            <div aria-label="可在控制台核对的能力清单">
              <h3 className="fmx-trust__t">这些能力，都可以在控制台里当场核对</h3>
              <ul className="fmx-checks">
                {TRUST_CHECKS.map((c) => (
                  <li key={c.b}><b>{c.b}</b><span>{c.d}</span></li>
                ))}
              </ul>
              <Link className="fmx-console" href="/products/fmclaw/agent-runtime">
                <img
                  src="/products/fmclaw/console-identity.jpg"
                  alt="FMClaw 控制台真实界面：智能体身份、项目范围与工具授权的管理面板"
                  width={1800}
                  height={1005}
                  loading="lazy"
                />
                <span>
                  <b>在控制台里看它们怎么被管理</b>
                  <i>智能体的身份、权限、运行和记录 <Arrow s={12} /></i>
                </span>
              </Link>
            </div>
          </div>
        </SolSection>

        {/* ===== 07 证据：生产案例 + 100+ 预制工作流 ===== */}
        <SolSection id="cases" title="不是演示。已经在真实项目中运行。">
          <ul className="fmx-cases">
            {CASES.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>
                  <span className="fmx-cases__img">
                    <img src={c.img} alt={c.alt} width={1100} height={614} loading="lazy" />
                  </span>
                  <span className="spt-meta">案例 {c.no} · {c.tag}</span>
                  <h3>{c.t}</h3>
                  <dl>
                    {c.facts.map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                  <span className="spt-inlink">查看案例 <Arrow s={12} /></span>
                </Link>
              </li>
            ))}
          </ul>
          <SolMore><Link href="/cases">查看全部客户案例 →</Link></SolMore>

          {/* 100+ 预制工作流：入口指向工作流引擎子页 */}
          <div className="fmx-wf">
            <div>
              <span className="spt-meta">100+ 预制业务工作流</span>
              <h3>高频工作已做成预制流程，不必从空白画布开始</h3>
              <p>
                上面的案例都来自同一个工作流库：100 多条物业与设施管理的预制业务工作流，
                在真实项目中跑通后沉淀下来，接上你的数据就能用。
              </p>
              <ul className="fmx-wf__list">
                {WORKFLOWS.map((w) => (
                  <li key={w.t}><Link href={w.href}>{w.t}</Link></li>
                ))}
              </ul>
              <Link className="spt-inlink" href="/products/fmclaw/workflow-engine">了解工作流引擎 <Arrow s={12} /></Link>
            </div>
            <img
              src="/products/fmclaw/workflow-library.webp"
              alt="预制工作流库插画：成排的流程蓝图中取出一张，接入一个真实项目开始运行"
              width={1376}
              height={768}
              loading="lazy"
            />
          </div>
        </SolSection>

        {/* ===== 08 开始方式（全页唯一暗场） ===== */}
        <section className="fmx-start" id="start">
          <div className="wrap">
            <h2 className="spt-h2">从一个真实问题开始</h2>
            <p className="fmx-start__p">
              先用真实数据验证一项业务工作流。确认值得做，再进入数据治理、系统接入和生产部署。
            </p>
            <p className="fmx-start__mp">让智能体参与管理，是<Link href="/company/master-plan">启盟秘密蓝图</Link>的第三步，已经完成。</p>
            <ol className="fmx-paths">
              {PATHS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>
                    <span className="fmx-paths__m">{p.n} · {p.time}</span>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                    <span className="fmx-paths__go">了解 <Arrow s={12} /></span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== 09 FAQ ===== */}
        <FmFaq items={FAQ} heading="关于 FMClaw" />

        <div className="fmx-upd">
          <div className="wrap">
            <p>最后更新：2026-07-20</p>
          </div>
        </div>

        {/* ===== 10 收束 CTA ===== */}
        <section className="endcta">
          <div className="wrap">
            <h2><span className="nb">把一件真实的工作，</span><br /><span className="nb">交给 AI 试试</span></h2>
            <p>从你这个月最头疼的那个流程开始。</p>
            <div className="cta-row">
              <div className="cta-btns">
                <TrackedLink
                  href="/contact?intent=demo&from=products/fmclaw"
                  action="book-demo"
                  label="products/fmclaw-end"
                  className="btn btn-primary"
                >
                  预约演示 Demo <Arrow s={16} />
                </TrackedLink>
                <a href={FMCLAW_URL} className="btn btn-ghost">
                  进入 FMClaw <Arrow s={16} />
                </a>
              </div>
              <p className="alt">或先看看<Link href="/cases">已经在生产中运行的案例</Link>，或<Link href="/workshop">预约 FMClaw™ 加速营</Link></p>
            </div>
          </div>
        </section>
      </div>
    </SolPage>
  );
}
