import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, FMCLAW_APP_LD } from "./_shared";
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
    "FMClaw™ 是面向物业与设施管理的生产级 AI 智能体平台。它以行业数据本体为底座,把企业数据、行业指标、业务工作流、系统工具和组织权限统一起来,让 AI 能够进入核心业务,并在多个项目中稳定、准确、可追溯地完成工作。",
};

const FAQ = [
  {
    q: "FMClaw 是什么?",
    a: "FMClaw 是面向物业与设施管理的生产级 AI 智能体平台。它统一企业数据、行业指标、业务工作流、系统工具和组织权限,让 AI 能够进入核心业务并持续完成工作。",
  },
  {
    q: "FMClaw 与通用 AI 智能体平台有什么不同?",
    a: "通用平台主要提供模型、智能体和工具的通用能力。FMClaw 进一步提供物业与设施管理的行业数据本体、统一指标、预制业务工作流、行业工具和项目级运行治理能力。",
  },
  {
    q: "什么是行业数据本体?",
    a: "行业数据本体是对项目、空间、设备、人员、工单、合同等业务对象,以及对象关系、指标和权限的统一描述。它让 AI 不只是读取数据,还能理解数据在业务中代表什么。",
  },
  {
    q: "什么是行业级智能体工作流引擎?",
    a: "它将数据、行业能力、工具、审批和执行反馈组织成可持续运行的业务流程。一个项目跑通后,可以在更多项目中按统一口径复用。",
  },
  {
    q: "FMClaw 如何保证关键结果一致?",
    a: "FMClaw 对关键指标、计算结果、报告结构和管理口径进行统一控制。在同一工作流和口径下,同一份数据重复运行,关键业务结果保持一致并可以复核。",
  },
  {
    q: "FMClaw 是否需要替换钉钉、飞书或企业微信?",
    a: "不需要。现有协作平台继续承担沟通、审批和组织协同,FMClaw 接入其背后的行业数据与业务流程,补上物业与设施管理的专业环节。",
  },
  {
    q: "FMClaw 如何处理权限与审计?",
    a: "智能体在明确的组织身份、项目范围和工具权限下工作。每一次数据读取、工作流运行、工具调用、人工确认和最终结果都会留下记录。",
  },
  {
    q: "如何开始使用 FMClaw?",
    a: "建议从一个真实业务问题和一份真实数据开始。可以先通过 Demo Day 验证可行性,再通过加速营或 FDE 服务进入系统接入和生产部署。",
  },
];

/* 平台能力地图:四层(展示层用短名,规范全称保留在各能力页与 JSON-LD) */
const LAYERS = [
  {
    no: "L1",
    name: "行业数据本体",
    en: "ONTOLOGY & METRICS",
    desc: "把 Excel、PDF、业务系统和 IoT 数据,映射为项目、空间、设备、工单、合同等行业对象,统一指标口径与数据权限。AI 不只是读到数据,还知道它在业务里代表什么。",
    tags: ["业务对象", "指标口径", "数据权限"],
    img: "/products/fmclaw/ontology-hero.png",
    alt: "行业数据本体插画:项目、空间、设备、工单等业务对象及其关系构成的行业数据底座",
    href: "/products/fmclaw/ontology",
  },
  {
    no: "L2",
    name: "工作流引擎",
    en: "AGENTIC WORKFLOW ENGINE",
    desc: "把一项工作从触发、取数、判断、审批到执行,组织成可持续运行的业务流程。一个项目跑通,更多项目按同一口径复用。",
    tags: ["预制流程", "事件触发", "人工审批"],
    img: "/products/fmclaw/workflow-engine-hero.png",
    alt: "智能体工作流引擎插画:触发、取数、判断、审批、执行组成的业务流程链",
    href: "/products/fmclaw/workflow-engine",
  },
  {
    no: "L3",
    name: "工具与系统连接",
    en: "TOOLS & CONNECTIVITY",
    desc: "通过 API、MCP 和现有系统接口,让智能体可以查询、写入、通知、派单和执行,而不是停在建议上。",
    tags: ["物业 ERP", "BA 与 IoT", "机器人"],
    img: "/products/fmclaw/connectors-hero.png",
    alt: "行业工具与系统连接插画:智能体通过接口连接 ERP、IoT、视频与机器人等系统",
    href: "/products/fmclaw/connectors",
  },
  {
    no: "L4",
    name: "运行与治理",
    en: "RUNTIME & GOVERNANCE",
    desc: "统一管理智能体的组织身份、项目权限、运行状态、人工介入和审计记录。每一步都有记录,可以复核。",
    tags: ["项目隔离", "运行监控", "审计追溯"],
    img: "/products/fmclaw/agent-runtime-hero.png",
    alt: "智能体运行与治理插画:身份、权限、监控与审计构成的治理面板",
    href: "/products/fmclaw/agent-runtime",
  },
];

/* 如何完成一项工作(供应商对账)。who: 该环节的承担者 */
const HOW_STEPS = [
  { n: "01", t: "数据进入", d: "合同、工作量、服务记录和历史账单进入行业数据本体。", who: "数据本体" },
  { n: "02", t: "口径统一", d: "使用同一套项目对象、合同字段和指标口径。", who: "数据本体" },
  { n: "03", t: "工作流运行", d: "自动核量、对比历史、识别异常并生成账单草稿。", who: "AI" },
  { n: "04", t: "工具执行", d: "查询原有业务系统,发送确认通知,准备写回结果。", who: "AI · 系统" },
  { n: "05", t: "人工确认", d: "负责人确认、驳回或要求重新核对。", who: "人", human: true },
  { n: "06", t: "留痕与写回", d: "结果写回原系统,数据来源、处理过程和确认记录均可追溯。", who: "系统" },
];

/* 从一个真实问题开始:三段式路径(时长为 workshop 页已确认口径) */
const PATHS = [
  { n: "01", t: "Demo Day", time: "半天 – 1 天", d: "用一份真实数据,当场跑出一个能用的 demo,确认这条路走得通。", href: "/workshop/demo-day" },
  { n: "02", t: "加速营", time: "2 – 3 天", d: "带一个真问题闭门几天,把一条业务工作流现场跑通,跑通的留给你。", href: "/workshop/bootcamp" },
  { n: "03", t: "FDE 服务", time: "按阶段", d: "工程师进到业务现场:数据治理、系统接入、试运行与生产验收。", href: "/workshop/fde" },
];

/* 预制业务工作流(六条) */
const WORKFLOWS = [
  { t: "运营日报与周报", d: "统一项目指标,定时生成结构一致的运营报告。", href: "/cases/property-group-auto-operation-report" },
  { t: "投诉报事与自动派单", d: "识别报修、创建工单、派发、跟踪并双向通知。", href: "/cases/property-group-chat-ai-service" },
  { t: "员工绩效与薪酬", d: "连接排班、考勤、在场工时和薪酬规则,生成可复核结果。", href: "/solutions/payroll" },
  { t: "供应商账单", d: "核对合同、工作量与服务结果,标出异常并生成账单草稿。", href: "/scenarios/reconciliation" },
  { t: "水电费核算", d: "归集读数、完成环比同比、识别异常并生成审批依据。", href: "/scenarios/utility-bill" },
  { t: "现场巡检与质量评估", d: "按统一标准识别问题、评分、建单并保留证据。", href: "/cases/fmclaw-equipment-inspection" },
];

/* 生产案例(三个,数字为已确认口径) */
const CASES = [
  {
    no: "01",
    tag: "物业集团",
    img: "/products/fmclaw/case-auto-report.webp",
    alt: "运营报告自动生成插画:数据从项目底座逐层汇聚,生成结构一致的运营报告",
    t: "500 多个项目,每天自动生成运营报告",
    facts: [["每份报告", "约 3 分钟"], ["人工投入", "0"]],
    href: "/cases/property-group-auto-operation-report",
  },
  {
    no: "02",
    tag: "物业集团",
    img: "/products/fmclaw/case-chat-service.webp",
    alt: "对话式 AI 客服插画:业主消息进入 AI 处理中心,自动生成工单并派发到现场",
    t: "业主群里的投诉报事,自动成单、派单",
    facts: [["派单", "少于 1 分钟"], ["运行", "7×24"]],
    href: "/cases/property-group-chat-ai-service",
  },
  {
    no: "03",
    tag: "设施设备",
    img: "/products/fmclaw/case-inspection.webp",
    alt: "设备巡检插画:巡检路线连接各类设施设备,传感器与核对清单实时反馈状态",
    t: "设施设备巡检,交给 AI 智能体",
    facts: [["签到率", "99%"], ["达标率", "35% → 98%"]],
    href: "/cases/fmclaw-equipment-inspection",
  },
];

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* 链接卡图标(1.5-stroke,与站内插画语言一致) */
const ic = (d: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const IC = {
  doc: ic(<><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4" /><path d="M10 12h6M10 16h6" /></>),
  reconcile: ic(<><rect x="3" y="5" width="8" height="14" rx="2" /><rect x="13" y="5" width="8" height="14" rx="2" /><path d="M5.3 12.2l1.4 1.4 2.4-2.9" /><path d="M15.3 12.2l1.4 1.4 2.4-2.9" /></>),
  vendor: ic(<><path d="M4 21V5a2 2 0 0 1 2-2h7v18" /><path d="M13 9h5a2 2 0 0 1 2 2v10" /><path d="M4 21h17" /><path d="M7.5 7h2M7.5 11h2M7.5 15h2M16.5 13h1M16.5 17h1" /></>),
  folder: ic(<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 13.5l2 2 4-4" /></>),
  shield: ic(<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 11.5l2 2 4-4" /></>),
  flow: ic(<><rect x="3" y="4" width="6" height="5" rx="1.5" /><rect x="15" y="4" width="6" height="5" rx="1.5" /><rect x="9" y="15" width="6" height="5" rx="1.5" /><path d="M6 9v3h12V9M12 12v3" /></>),
  grid: ic(<><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>),
  layers: ic(<><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13.5l9 5 9-5" /></>),
};

type Lc = { href: string; lab: string; t: string; d: string; icon: ReactNode };
const LinkCards = ({ items }: { items: Lc[] }) => (
  <div className={`fmo-linkcards${items.length === 1 ? " one" : items.length === 2 ? " two" : ""}`}>
    {items.map((it) => (
      <Link className="fmo-linkcard" key={it.href + it.t} href={it.href}>
        <span className="fmo-lc-icon" aria-hidden="true">{it.icon}</span>
        <span className="fmo-lc-body">
          <span className="fmo-lc-lab">{it.lab}</span>
          <b>{it.t}</b>
          <span className="fmo-lc-d">{it.d}</span>
        </span>
        <span className="fmo-lc-arrow" aria-hidden="true"><Arrow s={13} /></span>
      </Link>
    ))}
  </div>
);

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
                FMClaw 以<b>行业数据本体</b>为底座,统一数据、工作流、工具和权限,
                让 AI <b>稳定接手真实业务</b>。
              </p>
              <div className="fmo-cta">
                <a href="#how-it-works" className="btn btn-primary">查看 FMClaw 如何工作 <Arrow /></a>
                <Link href="/workshop" className="btn btn-ghost">从一个真实问题开始 <Arrow /></Link>
              </div>
              <ul className="fmo-facts">
                <li><b>100+</b>&nbsp;条预制业务工作流</li>
                <li>覆盖<b>几十个</b>物业与设施管理岗位</li>
                <li>自 <b>2017</b> 年持续在真实现场验证</li>
              </ul>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/overview-hero.png"
                alt="FMClaw 平台四层架构插画:行业数据本体、智能体工作流引擎、行业工具与系统连接、智能体运行与治理"
                width={1376}
                height={768}
              />
            </div>
          </div>

          {/* 真实产品界面:物理感知与数据接入面板第一眼可见 */}
          <figure className="fmo-console fmo-app">
            <div className="fmo-console-bar">
              <span className="fmo-dot" /><span className="fmo-dot" /><span className="fmo-dot" />
              <span className="fmo-console-title">FMClaw™ 智能物业空间 · 真实产品界面(beta 1.0.1)</span>
            </div>
            <img
              src="/products/fmclaw/app-screenshot.jpg"
              alt="FMClaw 智能物业空间真实界面:AI 对话入口与 AI 员工,下方为服务感知、设备感知、环境感知、视觉感知、机器人与数据接入六个物理感知面板及实时事件流"
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
          <p className="fmc-num">FROM PERSONAL AI TO OPERATIONAL AI</p>
          <h2>从一个人使用 AI,到一个组织把工作交给 AI</h2>
          <p className="fmc-p">
            个人 AI 工具擅长帮人完成一次任务。企业把工作交给 AI,需要的不止这些。
          </p>
          <div className="fmo-cmp" role="table" aria-label="通用 AI 工作台与 FMClaw 的差异">
            <div className="fmo-cmp-row fmo-cmp-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">通用 AI 工作台</div>
              <div role="columnheader" className="now">FMClaw</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">服务对象</div>
              <div className="fmo-cmp-old" role="cell">个人的一次任务</div>
              <div className="fmo-cmp-new" role="cell"><b>组织的业务流程</b></div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">数据来源</div>
              <div className="fmo-cmp-old" role="cell">用户手动上传文件</div>
              <div className="fmo-cmp-new" role="cell">持续连接<b>业务系统与现场数据</b></div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">运行方式</div>
              <div className="fmo-cmp-old" role="cell">一次会话,一次结果</div>
              <div className="fmo-cmp-new" role="cell">多项目、<b>统一口径</b>、长期运行</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">解决的问题</div>
              <div className="fmo-cmp-old" role="cell">人如何用好 AI</div>
              <div className="fmo-cmp-new" role="cell"><b>企业如何把工作交给 AI</b></div>
            </div>
          </div>
          <p className="fmo-verdict">
            通用平台解决「人如何使用 AI」;FMClaw 解决「企业如何把核心工作交给 AI」。
          </p>
          <LinkCards items={[
            { href: "/insights/demo-vs-system", lab: "延伸阅读", t: "一个 Demo 和生产系统之间,隔着什么", d: "从演示到生产系统,需要补上哪些环节。", icon: IC.doc },
          ]} />
        </div>
      </section>

      {/* ===== 03 平台能力地图(图文交替) ===== */}
      <section className="fmc-sec" id="platform">
        <div className="wrap">
          <p className="fmc-num">ALL IN ONE OPERATING LAYER</p>
          <h2>一套平台,统一 AI 工作所需的一切</h2>
          <p className="fmc-p">
            业务不能靠人在多个 AI 工具之间搬运数据。FMClaw 把数据、工作流、工具和治理,
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
            数据本体提供业务事实,工作流引擎组织工作,系统连接完成动作,运行与治理控制权限和审计。
          </p>
        </div>
      </section>

      {/* ===== 04 如何完成一项工作 ===== */}
      <section className="fmc-sec mist" id="how-it-works">
        <div className="wrap">
          <p className="fmc-num">ONE PROCESS, END TO END</p>
          <h2>不是回答一个问题,而是把一件事接着干完</h2>
          <div className="fmo-howgrid">
            <div className="fmo-howside">
              <p className="fmo-howcase">以一次真实的<b>供应商对账</b>为例。</p>
              <p className="fmo-verdict">
                AI 接手核量、比对和起草;付款决定仍由人作出。
              </p>
              <p className="fmo-hownote">每一步都在同一个运行体系内完成,不需要人在工具之间搬运数据。</p>
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
            { href: "/solutions/vendor", lab: "解决方案", t: "供应商管理", d: "从合同、服务记录到结算的全链路管理。", icon: IC.vendor },
            { href: "/cases/coworking-supplier-reconciliation", lab: "客户案例", t: "真实供应商对账案例", d: "联合办公项目中的真实对账运行记录。", icon: IC.folder },
          ]} />
        </div>
      </section>

      {/* ===== 05 生产级能力 ===== */}
      <section className="fmc-sec" id="production">
        <div className="wrap">
          <p className="fmc-num">BUILT FOR REPEATED OPERATIONS</p>
          <h2>跑通一次不难。难的是每天稳定地跑。</h2>
          <p className="fmc-p">
            生产系统面对的不是一份挑选过的数据,而是不同项目、不同来源、持续变化的真实业务。
          </p>
          <div className="fmc-cols3">
            <div className="fmc-cell">
              <span className="fmc-cell-en">ACCURATE</span>
              <h3>准确</h3>
              <p>关键指标使用统一定义,报告中的事实和计算结果可以复核。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">CONSISTENT</span>
              <h3>一致</h3>
              <p>同一份数据在同一口径下,运行一次和一千次,结果相同。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">TRACEABLE</span>
              <h3>可追溯</h3>
              <p>数据读取、流程执行、工具调用和人工确认,每一步都有记录。</p>
            </div>
          </div>
          <LinkCards items={[
            { href: "/products/fmclaw/agent-runtime", lab: "平台能力", t: "运行与治理", d: "身份、权限、监控、人工介入与审计的统一管理。", icon: IC.shield },
            { href: "/insights/demo-vs-system", lab: "洞察", t: "为什么 Demo 跑通了,离生产还很远", d: "生产系统面对的是持续变化的真实业务。", icon: IC.doc },
          ]} />
        </div>
      </section>

      {/* ===== 06 预制业务工作流 ===== */}
      <section className="fmc-sec mist" id="workflows">
        <div className="wrap">
          <p className="fmc-num">PREBUILT INDUSTRY WORKFLOWS</p>
          <h2>已经跑通的业务工作流,从这里开始</h2>
          <p className="fmc-p">
            物业与设施管理中的高频工作,FMClaw 已做成预制流程。不必从空白画布开始。
          </p>

          {/* 真实产品界面:工作流编辑器 */}
          <figure className="fmo-shot">
            <img
              src="/products/fmclaw-workflow.png"
              alt="FMClaw 工作流编辑器真实界面:左侧为物业业务分类,右侧为一条「现场品质巡检」业务工作流——定时触发、拉取并分类风险点、人工审批、批量创建工单"
              width={2600}
              height={1284}
              loading="lazy"
            />
            <figcaption>FMClaw 工作流编辑器(真实产品界面)</figcaption>
          </figure>

          <div className="fmc-cols3">
            {WORKFLOWS.map((w) => (
              <Link className="fmc-cell fmo-wf" key={w.t} href={w.href}>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
                <span className="fmo-wf-go">查看 →</span>
              </Link>
            ))}
          </div>
          <LinkCards items={[
            { href: "/products/fmclaw/workflow-engine", lab: "平台能力", t: "工作流引擎", d: "把一项工作组织成可持续运行的业务流程。", icon: IC.flow },
            { href: "/agents", lab: "产品套件", t: "物业管理智能体矩阵", d: "对账、派单、巡检等岗位智能体的全景。", icon: IC.grid },
          ]} />
        </div>
      </section>

      {/* ===== 07 生产案例 ===== */}
      <section className="fmc-sec" id="cases">
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
          <LinkCards items={[
            { href: "/cases", lab: "案例库", t: "查看全部客户案例", d: "更多真实项目的运行记录与口径。", icon: IC.folder },
          ]} />
        </div>
      </section>

      {/* ===== 08 开始方式(暗场收束,含生态连接) ===== */}
      <section className="fmc-sec dark" id="start">
        <div className="wrap">
          <p className="fmc-num">WORKS WITH WHAT YOU ALREADY USE</p>
          <h2>不替换现有平台,只接入专业业务</h2>
          <p className="fmc-p">
            钉钉、飞书和企业微信继续作为协作入口。FMClaw 在底层连接行业数据、业务工作流与系统工具,
            完成物业与设施管理的专业闭环。
          </p>
          <div className="fmc-cols3">
            <Link className="fmc-cell fmo-wf" href="/products/collaboration">
              <h3>第三方平台 AI 协同</h3>
              <p>钉钉、飞书和企业微信继续承载消息、审批与日常协作。</p>
              <span className="fmo-wf-go">查看 →</span>
            </Link>
            <Link className="fmc-cell fmo-wf" href="/products/iot">
              <h3>IoT 物理世界感知</h3>
              <p>IoT、BA、视频和现场设备持续提供真实世界的数据。</p>
              <span className="fmo-wf-go">查看 →</span>
            </Link>
            <Link className="fmc-cell fmo-wf" href="/products/robots">
              <h3>机器人与智能装备</h3>
              <p>机器人和智能装备承担清洁、巡检等标准化工作。</p>
              <span className="fmo-wf-go">查看 →</span>
            </Link>
          </div>

          <div className="fmo-start-divide" id="ecosystem" aria-hidden="true" />
          <p className="fmc-num">START WITH ONE REAL PROCESS</p>
          <h2>从一个真实问题开始</h2>
          <p className="fmc-p">
            先用真实数据验证一项业务工作流。确认值得做,再进入数据治理、系统接入和生产部署。
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

      {/* ===== 09 FAQ ===== */}
      <FmFaq items={FAQ} heading="关于 FMClaw" />

      <div className="fmo-upd">
        <div className="wrap">
          <p className="fmc-updated">最后更新:2026-07-20</p>
        </div>
      </div>

      {/* ===== 10 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>把一件真实的工作,交给 AI 试试</h2>
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
