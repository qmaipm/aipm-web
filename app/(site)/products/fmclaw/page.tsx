import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, FMCLAW_APP_LD, Arrow, IC, LinkCards } from "./_shared";
import "./capability.css";
import "./page.css";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/products/fmclaw", {
  title: "FMClaw™｜物业与设施管理的生产级 AI 智能体平台",
  description:
    "FMClaw™ 以行业数据本体为底座，统一企业数据、指标、业务工作流、系统工具与组织权限，让 AI 稳定进入物业与设施管理的核心工作。",
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
    a: "FMClaw 是面向物业与设施管理的生产级 AI 智能体平台。它统一企业数据、行业指标、业务工作流、系统工具和组织权限，让 AI 能够进入核心业务并持续完成工作。",
  },
  {
    q: "FMClaw 与通用 AI 智能体平台有什么不同？",
    a: "通用平台主要提供模型、智能体和工具的通用能力。FMClaw 进一步提供物业与设施管理的行业数据本体、统一指标、预制业务工作流、行业工具和项目级运行治理能力。",
  },
  {
    q: "什么是行业数据本体？",
    a: "行业数据本体是对项目、空间、设备、人员、工单、合同等业务对象，以及对象关系、指标和权限的统一描述。它让 AI 不只是读取数据，还能理解数据在业务中代表什么。",
  },
  {
    q: "什么是行业级智能体工作流引擎？",
    a: "它将数据、行业能力、工具、审批和执行反馈组织成可持续运行的业务流程。一个项目跑通后，可以在更多项目中按统一口径复用。",
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
    img: "/products/fmclaw/workflow-engine-hero.png",
    alt: "智能体工作流引擎插画：触发、取数、判断、审批、执行组成的业务流程链",
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

/* 如何完成一项工作（供应商对账）。who: 该环节的承担者 */
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

export default function Page() {
  return (
    <main className="fmc fmo">
      <JsonLd data={[WEBPAGE_LD, FMCLAW_APP_LD]} />
      <div className="wrap">
        <FmBreadcrumb trail={[{ name: "FMClaw™ 产品总览", href: "/products/fmclaw" }]} />
      </div>

      {/* ===== 01 HERO ===== */}
      <header className="fmo-hero">
        <span className="fmc-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="fmc-hero-cols">
            <div>
              <p className="fmc-kicker">FMClaw™ · 物业与设施管理的生产级 AI 智能体平台</p>
              <h1>让 AI 进入物业与设施管理的<span className="grad">核心工作</span></h1>
              <p className="fmo-sub">
                FMClaw 以<b>行业数据本体</b>为底座，统一数据、工作流、工具和权限，
                让 AI <b>稳定接手真实业务</b>。
              </p>
              <div className="fmo-cta">
                <a href="#how-it-works" className="btn btn-primary">查看 FMClaw 如何工作 <Arrow /></a>
                <Link href="/workshop" className="btn btn-ghost">从一个真实问题开始 <Arrow /></Link>
              </div>
              <ul className="fmo-facts">
                <li><b>100+</b>&nbsp;条预制业务工作流</li>
                <li><b>500</b> 个项目同一平台运行</li>
                <li>自 <b>2017</b> 年持续在真实现场验证</li>
              </ul>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/overview-hero.png"
                alt="FMClaw 平台四层架构插画：行业数据本体、智能体工作流引擎、工具箱、控制台"
                width={1376}
                height={768}
              />
            </div>
          </div>

          {/* 真实产品界面：物理感知与数据接入面板第一眼可见 */}
          <figure className="fmo-console fmo-app">
            <div className="fmo-console-bar">
              <span className="fmo-dot" /><span className="fmo-dot" /><span className="fmo-dot" />
              <span className="fmo-console-title">FMClaw™ 智能物业空间 · 真实产品界面（beta 1.0.1）</span>
            </div>
            <img
              src="/products/fmclaw/app-screenshot.jpg"
              alt="FMClaw 智能物业空间真实界面：AI 对话入口与 AI 员工，下方为服务感知、设备感知、环境感知、视觉感知、机器人与数据接入六个物理感知面板及实时事件流"
              width={1024}
              height={506}
              fetchPriority="high"
            />
            <figcaption className="fmo-app-anchors" aria-label="界面关键区域">
              <span><i aria-hidden="true" />物理感知 ×6 面板</span>
              <span><i aria-hidden="true" />数据接入</span>
              <span><i aria-hidden="true" />AI 员工</span>
              <span><i aria-hidden="true" />实时事件流</span>
            </figcaption>
          </figure>
        </div>
      </header>

      {/* ===== 02 产品差异 ===== */}
      <section className="fmc-sec mist fmo-after-console" id="why-fmclaw">
        <div className="wrap">
          {/* 定义带：正文中可独立引用的一句话定义（GEO），横向大字版式 */}
          <div className="fmo-defband">
            <p className="fmo-defband-lab">WHAT IS FMCLAW</p>
            <p className="fmo-defband-p">
              FMClaw™ 是面向物业与设施管理的<b>生产级 AI 智能体平台</b>，以行业数据本体为底座，
              统一企业数据、指标、工作流、工具与权限，让 AI 进入核心业务并稳定运行。
            </p>
          </div>

          <p className="fmc-num">FROM PERSONAL AI TO OPERATIONAL AI</p>
          <h2>从一个人使用 AI，到一个组织把工作交给 AI</h2>
          <p className="fmc-p">
            个人 AI 工具擅长帮人完成一次任务。企业把工作交给 AI，需要的不止这些。
          </p>

          {/* 双面板对峙：灰调旧世界 vs 高亮 FMClaw */}
          <div className="fmo-vs">
            <div className="fmo-vs-col old">
              <p className="fmo-vs-name">通用 AI 工作台</p>
              <p className="fmo-vs-sub">帮一个人，完成一次任务</p>
              <ul>
                <li><span className="fmo-vs-k">服务对象</span><span className="fmo-vs-v">个人的一次任务</span></li>
                <li><span className="fmo-vs-k">数据来源</span><span className="fmo-vs-v">用户手动上传文件</span></li>
                <li><span className="fmo-vs-k">运行方式</span><span className="fmo-vs-v">一次会话，一次结果</span></li>
                <li><span className="fmo-vs-k">解决的问题</span><span className="fmo-vs-v">人如何用好 AI</span></li>
              </ul>
            </div>
            <div className="fmo-vs-mid" aria-hidden="true"><span>VS</span></div>
            <div className="fmo-vs-col now">
              <p className="fmo-vs-name">FMClaw</p>
              <p className="fmo-vs-sub">替一个组织，把工作长期干下去</p>
              <ul>
                <li><span className="fmo-vs-k">服务对象</span><span className="fmo-vs-v"><b>组织的业务流程</b></span></li>
                <li><span className="fmo-vs-k">数据来源</span><span className="fmo-vs-v">持续连接<b>业务系统与现场数据</b></span></li>
                <li><span className="fmo-vs-k">运行方式</span><span className="fmo-vs-v">多项目、<b>统一口径</b>、长期运行</span></li>
                <li><span className="fmo-vs-k">解决的问题</span><span className="fmo-vs-v"><b>企业如何把工作交给 AI</b></span></li>
              </ul>
            </div>
          </div>

          <p className="fmo-verdict">
            通用平台解决「人如何使用 AI」；FMClaw 解决「企业如何把核心工作交给 AI」。
          </p>
          <LinkCards items={[
            { href: "/insights/demo-vs-system", lab: "延伸阅读", t: "一个 Demo 和生产系统之间，隔着什么", d: "从演示到生产系统，需要补上哪些环节。", icon: IC.doc },
          ]} />
        </div>
      </section>

      {/* ===== 03 平台能力地图（图文交替） ===== */}
      <section className="fmc-sec" id="platform">
        <div className="wrap">
          <p className="fmc-num">ALL IN ONE OPERATING LAYER</p>
          <h2>一套平台，统一 AI 工作所需的一切</h2>
          <p className="fmc-p">
            业务不能靠人在多个 AI 工具之间搬运数据。FMClaw 把数据、工作流、工具和治理，
            放进同一个运行体系。
          </p>
          <div className="fmo-lrows">
            {LAYERS.map((l, i) => (
              <div className={`fmo-lrow${i % 2 === 1 ? " flip" : ""}`} key={l.no}>
                <Link className="fmo-limg" href={l.href} aria-label={l.name}>
                  <img src={l.img} alt={l.alt} width={1376} height={768} loading="lazy" />
                </Link>
                <div className="fmo-lbody">
                  <div className="fmo-lhead">
                    <span className="fmo-lno">{l.no}</span>
                    <span className="fmo-len">{l.en}</span>
                  </div>
                  <h3>{l.name}</h3>
                  <p className="fmo-ldesc">{l.desc}</p>
                  <div className="fmo-ltags">
                    {l.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <Link className="fmo-lgo" href={l.href}>了解{l.name} <Arrow s={13} /></Link>
                </div>
              </div>
            ))}
          </div>
          <p className="fmo-verdict">
            数据本体提供业务事实，工作流引擎组织工作，工具箱完成动作，控制台管理权限和记录。
          </p>

          {/* 生态兼容带：第三方协作平台属于工具箱（L3）的连接范围，不单设产品板块 */}
          <Link className="fmo-ecoband" href="/products/collaboration">
            <div className="fmo-ecoband-main">
              <span className="fmo-ecoband-en">WORKS WITH WHAT YOU ALREADY USE</span>
              <h3>不替换现有平台，只接入专业业务</h3>
              <p>钉钉、飞书和企业微信继续作为协作入口，FMClaw 在底层补上物业与设施管理的专业环节。</p>
              <span className="fmo-ecoband-go">了解第三方平台 AI 协同 <Arrow s={13} /></span>
            </div>
            <div className="fmo-ecoband-side">
              <img
                src="/products/fmclaw/ecosystem-band.webp"
                alt="第三方协作平台接入插画：三个协作应用窗口的数据流汇入同一个平台底座"
                width={1376}
                height={1027}
                loading="lazy"
              />
              <div className="fmo-ecochips" aria-label="已支持的协作平台">
                <span>钉钉</span><span>飞书</span><span>企业微信</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== 04 如何完成一项工作 ===== */}
      <section className="fmc-sec mist" id="how-it-works">
        <div className="wrap">
          <p className="fmc-num">ONE PROCESS, END TO END</p>
          <h2>不是回答一个问题，而是把一件事接着干完</h2>
          <div className="fmo-howgrid">
            <div className="fmo-howside">
              <p className="fmo-howcase">以一次真实的<b>供应商对账</b>为例。</p>
              <p className="fmo-verdict">
                AI 接手核量、比对和起草；付款决定仍由人作出。
              </p>
              <p className="fmo-hownote">每一步都在同一个运行体系内完成，不需要人在工具之间搬运数据。</p>
            </div>
            <div className="fmo-flow">
              {HOW_STEPS.map((s) => (
                <div className={`fmo-fstep${s.human ? " human" : ""}`} key={s.n}>
                  <span className="fmo-fno">{s.n}</span>
                  <div className="fmo-fbody">
                    <div className="fmo-fhead">
                      <h3>{s.t}</h3>
                      <span className="fmo-fwho">{s.who}</span>
                    </div>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <LinkCards items={[
            { href: "/scenarios/reconciliation", lab: "场景", t: "供应商自动对账", d: "核量、比对、找异常、起草账单的完整场景。", icon: IC.reconcile },
          ]} />
        </div>
      </section>

      {/* ===== 05 生产级信任：主张 + 可核对清单 ===== */}
      <section className="fmc-sec" id="production">
        <div className="wrap">
          <p className="fmc-num">BUILT FOR PRODUCTION</p>
          <h2>进入核心业务的前提：准确、一致、安全</h2>
          <p className="fmc-p">
            生产系统面对的不是一份挑选过的数据，而是不同项目、不同来源、持续变化的真实业务。
            FMClaw 把这三件事做成<b>平台能力</b>，而不是对使用者的要求。
          </p>
          <div className="fmo-trust">
            <div className="fmo-trust-claims">
              {TRUST_CLAIMS.map((c) => (
                <div className="fmo-claim" key={c.en}>
                  <span className="fmo-claim-en">{c.en}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
              <figure className="fmo-trust-art">
                <img
                  src="/products/fmclaw/production-trust.webp"
                  alt="生产级信任插画：隔离的项目数据、统一的指标口径、授权范围与人工审批，汇入同一条可追溯的运行记录"
                  width={1376}
                  height={768}
                  loading="lazy"
                />
              </figure>
            </div>
            <aside className="fmo-trust-panel" aria-label="可在控制台核对的能力清单">
              <p className="fmo-trust-panel-lab">VERIFIABLE IN CONSOLE</p>
              <p className="fmo-trust-panel-t">这些能力，都可以在控制台里当场核对</p>
              <ul className="fmo-trust-list">
                {TRUST_CHECKS.map((c) => (
                  <li key={c.b}>
                    <span className="fmo-trust-ck" aria-hidden="true">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6.2 4.8 9 10 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="fmo-trust-txt"><b>{c.b}</b><i>{c.d}</i></span>
                  </li>
                ))}
              </ul>
              <Link className="fmo-trust-foot" href="/products/fmclaw/agent-runtime">
                <img
                  src="/products/fmclaw/console-identity.jpg"
                  alt="FMClaw 控制台真实界面：智能体身份、项目范围与工具授权的管理面板"
                  width={1800}
                  height={1005}
                  loading="lazy"
                />
                <span className="fmo-trust-foot-txt">
                  <b>在控制台里看它们怎么被管理</b>
                  <span>智能体的身份、权限、运行和记录 <Arrow s={12} /></span>
                </span>
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== 06 证据：生产案例 + 100+ 预制工作流 ===== */}
      <section className="fmc-sec mist" id="cases">
        <div className="wrap">
          <p className="fmc-num">RUNNING IN PRODUCTION</p>
          <h2>不是演示。已经在真实项目中运行。</h2>
          <div className="fmc-cols3">
            {CASES.map((c) => (
              <Link className="fmc-cell fmo-case" key={c.href} href={c.href}>
                <span className="fmo-case-media">
                  <img src={c.img} alt={c.alt} width={1100} height={614} loading="lazy" />
                  <span className="fmo-case-no">CASE {c.no}</span>
                  <span className="fmo-case-tag">{c.tag}</span>
                </span>
                <span className="fmo-case-body">
                  <h3>{c.t}</h3>
                  <dl className="fmo-case-facts">
                    {c.facts.map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                  <span className="fmo-wf-go">查看案例 →</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="fmo-more">
            <Link href="/cases">查看全部客户案例 <Arrow s={13} /></Link>
          </p>

          {/* 100+ 预制工作流：一条横向证据带，入口指向工作流引擎子页 */}
          <div className="fmo-wfband">
            <div className="fmo-wfband-body">
              <p className="fmo-wfband-lab">100+ PREBUILT WORKFLOWS</p>
              <h3>高频工作已做成预制流程，不必从空白画布开始</h3>
              <p className="fmo-wfband-d">
                上面的案例都来自同一个工作流库：100 多条物业与设施管理的预制业务工作流，
                在真实项目中跑通后沉淀下来，接上你的数据就能用。
              </p>
              <div className="fmo-wfchips">
                {WORKFLOWS.map((w) => (
                  <Link key={w.t} href={w.href}>{w.t}</Link>
                ))}
              </div>
              <Link className="fmo-lgo" href="/products/fmclaw/workflow-engine">了解工作流引擎 <Arrow s={13} /></Link>
            </div>
            <div className="fmo-wfband-art">
              <img
                src="/products/fmclaw/workflow-library.webp"
                alt="预制工作流库插画：成排的流程蓝图中取出一张，接入一个真实项目开始运行"
                width={1376}
                height={768}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== 07 开始方式（暗场签名段，只讲一件事） ===== */}
      <section className="fmc-sec dark" id="start">
        <div className="wrap">
          <p className="fmc-num">START WITH ONE REAL PROCESS</p>
          <h2>从一个真实问题开始</h2>
          <p className="fmc-p">
            先用真实数据验证一项业务工作流。确认值得做，再进入数据治理、系统接入和生产部署。
          </p>
          <div className="fmo-paths">
            {PATHS.map((p) => (
              <Link className="fmo-path" key={p.href} href={p.href}>
                <span className="fmo-path-head">
                  <span className="fmo-path-no">{p.n}</span>
                  <span className="fmo-path-time">{p.time}</span>
                </span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <span className="fmo-path-go">了解 <Arrow s={13} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 08 FAQ ===== */}
      <FmFaq items={FAQ} heading="关于 FMClaw" />

      <div className="fmo-upd">
        <div className="wrap">
          <p className="fmc-updated">最后更新：2026-07-20</p>
        </div>
      </div>

      {/* ===== 09 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>把一件真实的工作，交给 AI 试试</h2>
          <p>从你这个月最头疼的那个流程开始。</p>
          <div className="cta-row">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <p className="alt">或先看看<Link href="/cases">已经在生产中运行的案例</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
