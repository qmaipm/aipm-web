import type { Metadata } from "next";
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

/* 平台能力地图:四层 */
const LAYERS = [
  {
    no: "L1",
    name: "行业数据本体与指标中心",
    en: "INDUSTRY ONTOLOGY & METRICS",
    desc: "将 Excel、PDF、业务系统和 IoT 数据映射为项目、空间、设备、人员、工单、合同、供应商和账单等行业对象,并统一指标口径与访问权限。",
    tags: ["业务对象", "对象关系", "指标口径", "数据权限", "数据集市", "Data Agent"],
    href: "/products/fmclaw/ontology",
    link: "查看行业数据本体与指标中心",
  },
  {
    no: "L2",
    name: "行业级智能体工作流引擎",
    en: "AGENTIC WORKFLOW ENGINE",
    desc: "将一项工作从触发、取数、判断、审批到执行,组织成可以持续运行和跨项目复用的业务工作流。",
    tags: ["预制流程", "流程编排", "事件触发", "人工审批", "异常处理", "跨项目复用"],
    href: "/products/fmclaw/workflow-engine",
    link: "查看行业级智能体工作流引擎",
  },
  {
    no: "L3",
    name: "行业工具与系统连接",
    en: "INDUSTRY TOOLS & CONNECTIVITY",
    desc: "通过 API、MCP、CLI 和现有系统接口,让智能体可以查询、写入、通知、派单、控制和执行。",
    tags: ["物业 ERP", "财务与人力", "协同平台", "BA 与 IoT", "视频安防", "机器人"],
    href: "/products/fmclaw/connectors",
    link: "查看行业工具与系统连接",
  },
  {
    no: "L4",
    name: "智能体运行与治理中心",
    en: "AGENT RUNTIME & GOVERNANCE",
    desc: "统一管理智能体的组织身份、项目权限、运行状态、人工介入、工作日志和审计记录。",
    tags: ["组织身份", "项目隔离", "角色权限", "运行监控", "人工介入", "审计追溯"],
    href: "/products/fmclaw/agent-runtime",
    link: "查看智能体运行与治理中心",
  },
];

/* 如何完成一项工作(供应商对账) */
const HOW_STEPS = [
  { n: "01", t: "数据进入", d: "合同、工作量、服务记录和历史账单进入行业数据本体。" },
  { n: "02", t: "口径统一", d: "使用同一套项目对象、合同字段和指标口径。" },
  { n: "03", t: "工作流运行", d: "自动核量、对比历史、识别异常并生成账单草稿。" },
  { n: "04", t: "工具执行", d: "查询原有业务系统,发送确认通知,准备写回结果。" },
  { n: "05", t: "人工确认", d: "负责人确认、驳回或要求重新核对。" },
  { n: "06", t: "留痕与写回", d: "结果写回原系统,数据来源、处理过程和确认记录均可追溯。" },
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
    t: "500 多个项目,每天自动生成运营报告",
    facts: [["每份报告", "约 3 分钟"], ["人工投入", "0"]],
    href: "/cases/property-group-auto-operation-report",
  },
  {
    t: "业主群里的投诉报事,自动成单、派单",
    facts: [["派单", "少于 1 分钟"], ["运行", "7×24"]],
    href: "/cases/property-group-chat-ai-service",
  },
  {
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

export default function Page() {
  return (
    <main className="fmc fmo">
      <JsonLd data={[WEBPAGE_LD, FMCLAW_APP_LD]} />
      <div className="wrap">
        <FmBreadcrumb trail={[{ name: "FMClaw™ 产品总览", href: "/products/fmclaw" }]} />
      </div>

      {/* ===== 01 HERO ===== */}
      <header className="fmo-hero">
        <div className="wrap">
          <p className="fmc-kicker">FMClaw™ · 物业与设施管理的生产级 AI 智能体平台</p>
          <h1>让 AI 进入物业与设施管理的核心工作</h1>
          <p className="fmo-sub">
            FMClaw 以行业数据本体为底座,将企业数据、行业指标、业务工作流、系统工具和组织权限统一起来,
            让智能体能够稳定、准确、可追溯地完成工作。
          </p>
          <div className="fmo-cta">
            <a href="#how-it-works" className="fmo-btn fmo-btn-pri">查看 FMClaw 如何工作 <Arrow /></a>
            <Link href="/workshop" className="fmo-btn fmo-btn-sec">从一个真实问题开始 <Arrow /></Link>
          </div>
          <ul className="fmo-facts">
            <li>100+ 条预制业务工作流</li>
            <li>覆盖几十个物业与设施管理岗位</li>
            <li>自 2017 年持续在真实现场验证</li>
          </ul>

          {/* 拟真产品操作台:输入框 + 运行路径 + 状态标签 */}
          <div className="fmo-console" role="img" aria-label="FMClaw 操作台:输入业务需求,平台读取项目数据、使用统一指标、运行业务工作流、调用业务系统、人工确认、写回与留痕">
            <div className="fmo-console-bar">
              <span className="fmo-dot" /><span className="fmo-dot" /><span className="fmo-dot" />
              <span className="fmo-console-title">FMClaw™ Console</span>
            </div>
            <div className="fmo-console-body">
              <p className="fmo-console-slogan">搭建任何流程,升级所有服务</p>
              <div className="fmo-input">
                <span className="fmo-input-caret" aria-hidden="true" />
                <span className="fmo-input-ph">描述你要完成的一项业务……</span>
              </div>
              <div className="fmo-examples">
                <span>生成 500 个项目的本周运营报告</span>
                <span>核算本月员工绩效与薪酬</span>
                <span>核对供应商账单并标出异常</span>
              </div>
              <div className="fmo-runpath">
                <span>读取项目数据</span><i>→</i>
                <span>使用统一指标</span><i>→</i>
                <span>运行业务工作流</span><i>→</i>
                <span>调用业务系统</span><i>→</i>
                <span>人工确认</span><i>→</i>
                <span>写回与留痕</span>
              </div>
              <div className="fmc-status fmo-console-status">
                <span>SYSTEM READY</span>
                <span>DATA CONNECTED</span>
                <span>WORKFLOW CONTROLLED</span>
                <span>AUDIT ON</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== 02 产品差异 ===== */}
      <section className="fmc-sec fmo-sec" id="why-fmclaw">
        <div className="wrap">
          <p className="fmc-num">FROM PERSONAL AI TO OPERATIONAL AI</p>
          <h2>从一个人使用 AI,到一个组织把工作交给 AI</h2>
          <p className="fmc-p">
            个人 AI 工具擅长帮助人完成一次任务。企业把工作交给 AI,还需要持续的数据、统一的管理口径、
            明确的权限,以及可以长期运行的业务工作流。
          </p>
          <div className="fmc-cols">
            <div className="fmc-cell">
              <span className="fmc-cell-en">GENERAL AI WORKSPACE</span>
              <h3>通用 AI 工作台</h3>
              <ul className="fmo-list">
                <li>围绕个人任务</li>
                <li>由用户提供文件和指令</li>
                <li>适合调研、写作、演示和知识工作</li>
                <li>重点是帮助每个人更好地使用 AI</li>
              </ul>
            </div>
            <div className="fmc-cell fmo-cell-hl">
              <span className="fmc-cell-en">FMCLAW</span>
              <h3>FMClaw</h3>
              <ul className="fmo-list">
                <li>围绕组织业务流程</li>
                <li>持续连接业务系统与现场数据</li>
                <li>在多个项目中按统一口径运行</li>
                <li>重点是让 AI 稳定承担业务工作</li>
              </ul>
            </div>
          </div>
          <p className="fmo-verdict">
            通用平台解决「人如何使用 AI」;FMClaw 解决「企业如何把核心工作稳定地交给 AI」。
          </p>
          <p className="fmo-more">
            延伸阅读:<Link className="fmc-ln" href="/insights/demo-vs-system">一个 Demo 和生产系统之间,隔着什么 →</Link>
          </p>
        </div>
      </section>

      {/* ===== 03 平台能力地图 ===== */}
      <section className="fmc-sec fmo-sec" id="platform">
        <div className="wrap">
          <p className="fmc-num">ALL IN ONE OPERATING LAYER</p>
          <h2>一套平台,统一 AI 工作所需的一切</h2>
          <p className="fmc-p">
            业务流程不能靠人在多个 AI 工具之间搬运数据。FMClaw 将数据、指标、工作流、
            系统工具与组织治理放在同一个运行体系中。
          </p>
          <div className="fmo-layers">
            {LAYERS.map((l) => (
              <div className="fmo-layer" key={l.no}>
                <div className="fmo-layer-head">
                  <span className="fmo-layer-no">{l.no}</span>
                  <div>
                    <span className="fmc-cell-en">{l.en}</span>
                    <h3>{l.name}</h3>
                  </div>
                </div>
                <p>{l.desc}</p>
                <div className="fmc-tags fmo-layer-tags">
                  {l.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <Link className="fmc-ln fmo-layer-link" href={l.href}>{l.link} →</Link>
              </div>
            ))}
          </div>
          <p className="fmo-relation">
            行业数据本体提供业务事实;工作流引擎组织工作;系统连接完成动作;
            运行与治理中心控制身份、权限、监控和审计。
          </p>
        </div>
      </section>

      {/* ===== 04 如何完成一项工作 ===== */}
      <section className="fmc-sec fmo-sec" id="how-it-works">
        <div className="wrap">
          <p className="fmc-num">ONE PROCESS, END TO END</p>
          <h2>不是回答一个问题,而是把一件事接着干完</h2>
          <p className="fmc-p">以供应商对账为例:</p>
          <div className="fmc-steps">
            {HOW_STEPS.map((s) => (
              <div className="fmc-step" key={s.n}>
                <span className="n">{s.n}</span>
                <div><b>{s.t}</b><p>{s.d}</p></div>
              </div>
            ))}
          </div>
          <p className="fmo-verdict">
            AI 接手核量、比对、找异常和起草;最终付款决定仍然由人作出。
          </p>
          <ul className="fmo-links">
            <li><Link className="fmc-ln" href="/scenarios/reconciliation">查看供应商自动对账场景 →</Link></li>
            <li><Link className="fmc-ln" href="/solutions/vendor">查看供应商管理解决方案 →</Link></li>
            <li><Link className="fmc-ln" href="/cases/coworking-supplier-reconciliation">查看真实供应商对账案例 →</Link></li>
          </ul>
        </div>
      </section>

      {/* ===== 05 生产级能力 ===== */}
      <section className="fmc-sec fmo-sec" id="production">
        <div className="wrap">
          <p className="fmc-num">BUILT FOR REPEATED OPERATIONS</p>
          <h2>跑通一次不难。难的是每天稳定地跑。</h2>
          <p className="fmc-p">
            生产系统面对的不是一份挑选过的数据,而是不同项目、不同来源和持续变化的真实业务。
          </p>
          <div className="fmc-cols3">
            <div className="fmc-cell">
              <span className="fmc-cell-en">ACCURATE</span>
              <h3>准确</h3>
              <p>关键指标和业务结果使用统一定义。报告中的事实、指标和计算结果可以复核。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">CONSISTENT</span>
              <h3>一致</h3>
              <p>在同一工作流和管理口径下,同一份数据无论运行一次还是一千次,关键指标、计算结果和管理口径保持一致。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">TRACEABLE</span>
              <h3>可追溯</h3>
              <p>每个智能体的工作日程和运行日志都可以查看。数据读取、流程执行、工具调用、人工确认和最终结果均有记录。</p>
            </div>
          </div>
          <div className="fmc-tags" style={{ marginTop: 22 }}>
            {["批量运行", "跨项目复用", "统一模板", "异常处理", "人工介入", "版本管理", "运行监控", "操作审计"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <ul className="fmo-links">
            <li><Link className="fmc-ln" href="/products/fmclaw/agent-runtime">了解智能体如何稳定运行和接受治理 →</Link></li>
            <li><Link className="fmc-ln" href="/insights/demo-vs-system">为什么 Demo 跑通了,离生产系统仍然很远 →</Link></li>
          </ul>
        </div>
      </section>

      {/* ===== 06 预制业务工作流 ===== */}
      <section className="fmc-sec fmo-sec" id="workflows">
        <div className="wrap">
          <p className="fmc-num">PREBUILT INDUSTRY WORKFLOWS</p>
          <h2>已经跑通的业务工作流,从这里开始</h2>
          <p className="fmc-p">
            FMClaw 已将物业与设施管理中的高频工作组织为预制流程。客户不必从空白画布开始,
            也可以根据自己的管理要求调整。
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
          <ul className="fmo-links">
            <li><Link className="fmc-ln" href="/products/fmclaw/workflow-engine">查看行业级智能体工作流引擎 →</Link></li>
            <li><Link className="fmc-ln" href="/agents">查看物业管理智能体矩阵 →</Link></li>
          </ul>
        </div>
      </section>

      {/* ===== 07 生产案例 ===== */}
      <section className="fmc-sec fmo-sec" id="cases">
        <div className="wrap">
          <p className="fmc-num">RUNNING IN PRODUCTION</p>
          <h2>不是演示。已经在真实项目中运行。</h2>
          <div className="fmc-cols3">
            {CASES.map((c) => (
              <Link className="fmc-cell fmo-case" key={c.href} href={c.href}>
                <h3>{c.t}</h3>
                <dl className="fmo-case-facts">
                  {c.facts.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
                <span className="fmo-wf-go">查看案例 →</span>
              </Link>
            ))}
          </div>
          <p className="fmo-more">
            <Link className="fmc-ln" href="/cases">查看全部客户案例 →</Link>
          </p>
        </div>
      </section>

      {/* ===== 08 生态连接 ===== */}
      <section className="fmc-sec fmo-sec" id="ecosystem">
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
          <p className="fmo-verdict">
            协作平台负责人与组织的连接;FMClaw 负责行业业务的理解与执行。
          </p>
        </div>
      </section>

      {/* ===== 09 开始方式 ===== */}
      <section className="fmc-sec fmo-sec" id="start">
        <div className="wrap">
          <p className="fmc-num">START WITH ONE REAL PROCESS</p>
          <h2>从一个真实问题开始</h2>
          <p className="fmc-p">
            先用真实数据验证一项业务工作流。确认值得做,再进入数据治理、系统接入和生产部署。
          </p>
          <div className="fmc-cols3">
            <Link className="fmc-cell fmo-wf" href="/workshop/demo-day">
              <h3>Demo Day</h3>
              <p>用一份真实数据,确认这条路是否走得通。</p>
              <span className="fmo-wf-go">了解 →</span>
            </Link>
            <Link className="fmc-cell fmo-wf" href="/workshop/bootcamp">
              <h3>加速营</h3>
              <p>带一个真实问题,把一条业务工作流现场跑通。</p>
              <span className="fmo-wf-go">了解 →</span>
            </Link>
            <Link className="fmc-cell fmo-wf" href="/workshop/fde">
              <h3>FDE 服务</h3>
              <p>完成数据治理、系统接入、试运行与生产验收。</p>
              <span className="fmo-wf-go">了解 →</span>
            </Link>
          </div>
          <div className="fmo-cta" style={{ marginTop: 30 }}>
            <Link href="/workshop" className="fmo-btn fmo-btn-pri">预约 FMClaw™ 加速营 <Arrow /></Link>
            <Link href="/cases" className="fmo-btn fmo-btn-sec">查看客户案例 <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ===== 10 FAQ ===== */}
      <FmFaq items={FAQ} heading="关于 FMClaw" />

      <section className="fmc-rel">
        <div className="wrap">
          <p className="fmc-updated">最后更新:2026-07-20</p>
        </div>
      </section>
    </main>
  );
}
