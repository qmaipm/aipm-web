import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import "../products/fmclaw/capability.css";
import "./agents.css";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";
const UPDATED = "2026-07-20";

export const metadata: Metadata = pageMetadata("/agents", {
  title: "物业管理智能体矩阵｜Agentic AI 产品套件｜FMClaw",
  description:
    "FMClaw 物业管理智能体矩阵是一套面向物业与设施管理的行业级 Agentic AI 产品套件,由服务设计、运营管理、质量评估与服务优化智能体组成,在统一的数据、工作流、权限与审计体系下协同运行。",
  keywords:
    "物业管理智能体,物业管理AI,Agentic AI产品套件,物业AI智能体,设施管理AI,AI物业经理,多智能体协同,企业级AI智能体,物业管理Agent,物业智能体平台",
  openGraph: {
    title: "物业管理智能体矩阵｜FMClaw Agentic AI 产品套件",
    description:
      "四个行业智能体共享统一的数据、指标、工作流和组织权限,完成从服务设计、运营执行、质量评估到持续优化的管理闭环。",
  },
});

/* ---------- 四个行业智能体(输入 / 工作 / 输出) ---------- */
const AGENTS = [
  {
    name: "服务设计智能体",
    href: "/solutions/service-design",
    q: "如何根据项目条件、服务要求和成本目标,形成可执行的服务标准、人员编制与预算方案。",
    input: ["项目基础信息", "空间与业态信息", "服务需求与管理标准", "历史运营数据", "成本约束"],
    work: ["形成服务标准", "生成岗位与人员配置建议", "测算服务预算", "输出项目服务方案", "将设计结果交给运营管理流程"],
    output: ["服务标准", "人员编制", "预算方案", "项目服务配置"],
    cta: "查看服务设计智能体 →",
  },
  {
    name: "运营管理智能体",
    href: "/solutions/operations",
    q: "如何持续掌握多个项目的服务状态,并推动任务、人员、工单和异常按照管理要求执行。",
    input: ["服务计划与人员排班", "工单与巡检记录", "IoT 状态", "现场反馈", "管理指令"],
    work: ["监控计划执行", "识别服务异常", "创建和分派任务", "跟踪处理进度", "触发人工确认或升级", "形成运营记录"],
    output: ["任务与工单", "异常提醒", "运营状态", "管理层运营报告"],
    cta: "查看运营管理智能体 →",
  },
  {
    name: "质量评估智能体",
    href: "/solutions/assessment",
    q: "如何依据统一标准持续检验服务质量,并保留可以复核的事实与证据。",
    input: ["服务标准", "巡检与工单记录", "现场照片与视频", "IoT 数据", "客户反馈"],
    work: ["按统一标准评估质量", "识别不符合项", "归类问题与风险", "形成质量评分", "关联现场证据", "推动整改与复核"],
    output: ["质量评分", "问题清单", "证据记录", "整改任务", "质量分析报告"],
    cta: "查看质量评估智能体 →",
  },
  {
    name: "服务优化智能体",
    href: "/solutions/optimization",
    q: "如何利用持续积累的运营和质量数据,优化服务标准、人员配置、成本与供应商管理。",
    input: ["运营数据与质量结果", "人员工时", "薪酬与绩效数据", "供应商账单", "服务成本", "历史改进记录"],
    work: ["核算绩效和薪酬", "核对供应商账单", "分析成本与质量变化", "识别结构性问题", "生成改进建议", "为下一轮服务设计提供依据"],
    output: ["薪酬与绩效结果", "对账结果", "运营与成本分析", "服务优化建议"],
    cta: "查看服务优化智能体 →",
  },
];

/* ---------- 管理闭环五步 ---------- */
const LOOP_STEPS = [
  { n: "01", t: "服务设计", d: "根据项目条件和服务目标形成标准、编制与预算。" },
  { n: "02", t: "运营执行", d: "将服务标准转化为计划、任务、工单和现场行动。" },
  { n: "03", t: "质量评估", d: "依据统一标准检验执行结果,记录问题与证据。" },
  { n: "04", t: "服务优化", d: "复盘质量、成本与运营数据,形成改进建议。" },
  { n: "05", t: "进入下一轮设计", d: "经过确认的优化结果,成为下一轮服务设计与运营调整的依据。" },
];

/* ---------- FMClaw 平台四模块 ---------- */
const PLATFORM = [
  {
    rel: "数据来自",
    name: "行业数据本体与指标中心",
    href: "/products/fmclaw/ontology",
    d: "将项目、空间、设备、人员、工单、合同、供应商和账单等业务数据,映射为统一的行业对象、关系与指标。",
    cta: "了解行业数据本体与指标中心 →",
  },
  {
    rel: "流程运行在",
    name: "行业级智能体工作流引擎",
    href: "/products/fmclaw/workflow-engine",
    d: "将触发、取数、判断、审批、执行和反馈组织为可以持续运行和跨项目复用的业务工作流。",
    cta: "了解行业级智能体工作流引擎 →",
  },
  {
    rel: "动作通过",
    name: "行业工具与系统连接",
    href: "/products/fmclaw/connectors",
    d: "让智能体在获得授权后,查询、通知、派单、写回和调用企业现有业务系统。",
    cta: "了解行业工具与系统连接 →",
  },
  {
    rel: "运行受控于",
    name: "智能体运行与治理中心",
    href: "/products/fmclaw/agent-runtime",
    d: "统一管理智能体的组织身份、项目权限、运行状态、人工介入、工作日志和审计记录。",
    cta: "了解智能体运行与治理中心 →",
  },
];

/* ---------- 场景入口 ---------- */
const SCENARIOS = [
  { name: "供应商自动对账", href: "/scenarios/reconciliation", d: "核对合同、工作量、服务记录与账单,标记异常并准备确认材料。" },
  { name: "智能派单", href: "/scenarios/dispatch", d: "结合项目位置、任务等级、人员状态和工作负载,形成派单建议并跟踪执行。" },
  { name: "品质巡检", href: "/scenarios/inspection", d: "依据统一标准检查现场结果,关联问题、评分、证据与整改任务。" },
  { name: "管理层问询", href: "/scenarios/exec-query", d: "基于统一项目数据和指标口径,回答运营问题并提供可复核的数据来源。" },
  { name: "费用审批", href: "/scenarios/utility-bill", d: "汇总能耗、计量、合同与历史数据,识别异常并辅助负责人审批。" },
  { name: "报修客服", href: "/scenarios/repair-bot", d: "识别报修内容、创建工单、通知相关人员并持续跟踪处理结果。" },
];

/* ---------- FAQ(可见正文 = FAQPage LD) ---------- */
const FAQ = [
  {
    q: "什么是物业管理智能体矩阵?",
    a: "物业管理智能体矩阵是运行在 FMClaw 平台上的行业级 Agentic AI 产品套件,由服务设计、运营管理、质量评估与服务优化智能体组成。四个智能体共享统一的数据、指标、业务工作流和组织权限,围绕同一管理闭环协同工作。",
  },
  {
    q: "什么是 Agentic AI 产品套件?",
    a: "Agentic AI 产品套件不仅生成内容,还能够在明确的目标、数据、工作流、权限和人工监督下持续推进业务任务。它可以读取数据、运行流程、调用获准使用的系统工具、处理执行反馈并留下工作记录。",
  },
  {
    q: "四个智能体是四个独立的聊天机器人吗?",
    a: "不是。四个智能体分别承担服务设计、运营管理、质量评估和服务优化工作,但共享同一套业务事实、指标口径、工作流和组织权限。上一阶段的结果会成为下一阶段的输入。",
  },
  {
    q: "物业管理智能体矩阵与 FMClaw 是什么关系?",
    a: "FMClaw 是物业与设施管理的生产级 AI 智能体平台,为智能体提供行业数据本体、业务工作流、系统连接、组织权限、运行监控和审计能力。物业管理智能体矩阵是运行在 FMClaw 上的行业应用。",
  },
  {
    q: "智能体是否会替代管理人员作出最终决定?",
    a: "不会。智能体可以准备事实、运行流程、识别异常、生成建议和执行获准操作。涉及责任、审批、付款和重要管理决策的环节,仍由具备相应权限的人员确认。",
  },
  {
    q: "智能体的工作是否可以追溯?",
    a: "可以。智能体的数据读取、工作流运行、系统调用、人工确认和最终结果都会形成记录,并可以根据组织和项目权限查询。",
  },
  {
    q: "FMClaw 是否需要替换现有物业管理系统?",
    a: "不需要。FMClaw 可以连接企业已有的物业 ERP、财务、人力、协同办公、IoT、视频安防和机器人系统,在现有系统之上组织行业数据与业务工作流。",
  },
  {
    q: "如何开始使用物业管理智能体?",
    a: "建议从一个真实业务问题和一份真实数据开始,例如供应商对账、品质巡检、智能派单、运营报告或人员薪酬核算。完成验证后,再进入系统连接、流程调整和生产部署。",
  },
];

/* ---------- JSON-LD ---------- */
const WEBPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "物业管理智能体矩阵",
  url: `${SITE_URL}/agents`,
  inLanguage: "zh-CN",
  description:
    "物业管理智能体矩阵,是一套面向物业与设施管理的行业级 Agentic AI 系统,通过多个专业智能体协作,持续完成服务设计、运营执行、质量评估与管理优化。",
  isPartOf: { "@type": "WebSite", name: "启盟科技 FMClaw™", url: SITE_URL },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "智能体解决方案", item: `${SITE_URL}/agents` },
    { "@type": "ListItem", position: 3, name: "物业管理智能体矩阵", item: `${SITE_URL}/agents` },
  ],
};

const ITEMLIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "物业管理智能体矩阵",
  description: "面向物业与设施管理的行业级 Agentic AI 产品套件中的四个专业智能体。",
  itemListElement: AGENTS.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.name,
    url: `${SITE_URL}${a.href}`,
  })),
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ---------- Hero 闭环示意(SSR 内联 SVG) ---------- */
function LoopArt() {
  const node = (x: number, y: number, label: string) => (
    <g>
      <rect x={x - 62} y={y - 22} width={124} height={44} rx={12} fill="#fff" stroke="#E6EAE8" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14.5" fontWeight="700" fill="#14201C">{label}</text>
    </g>
  );
  return (
    <figure className="agx-loop" aria-hidden="false">
      <svg viewBox="0 0 560 400" role="img" aria-label="四个智能体围绕同一管理闭环协作:服务设计、运营管理、质量评估、服务优化,共享数据、指标、工作流、权限与审计记录">
        <defs>
          <linearGradient id="agxg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0070FF" />
            <stop offset="1" stopColor="#12B98A" />
          </linearGradient>
          <marker id="agxa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="#12B98A" />
          </marker>
        </defs>
        {/* 闭环弧线(顺时针) */}
        <path d="M212 66 H348" fill="none" stroke="url(#agxg)" strokeWidth="2" markerEnd="url(#agxa)" />
        <path d="M478 96 V264" fill="none" stroke="url(#agxg)" strokeWidth="2" markerEnd="url(#agxa)" />
        <path d="M348 334 H212" fill="none" stroke="url(#agxg)" strokeWidth="2" markerEnd="url(#agxa)" />
        <path d="M82 264 V96" fill="none" stroke="url(#agxg)" strokeWidth="2" markerEnd="url(#agxa)" />
        {/* 中心:共享基础 */}
        <rect x="170" y="140" width="220" height="120" rx="16" fill="rgba(18,185,138,.06)" stroke="rgba(18,185,138,.3)" />
        <text x="280" y="172" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="2" fill="#0C8B82">FMCLAW 平台</text>
        <text x="280" y="198" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#14201C">共享数据本体 · 统一指标</text>
        <text x="280" y="220" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#14201C">业务工作流 · 组织权限</text>
        <text x="280" y="242" textAnchor="middle" fontSize="13.5" fontWeight="600" fill="#14201C">审计记录</text>
        {/* 中心连线 */}
        <path d="M140 88 L182 138" fill="none" stroke="#E6EAE8" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M420 88 L378 138" fill="none" stroke="#E6EAE8" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M420 312 L378 262" fill="none" stroke="#E6EAE8" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M140 312 L182 262" fill="none" stroke="#E6EAE8" strokeWidth="1.5" strokeDasharray="4 4" />
        {/* 四个智能体节点 */}
        {node(140, 66, "服务设计")}
        {node(420, 66, "运营管理")}
        {node(420, 334, "质量评估")}
        {node(140, 334, "服务优化")}
      </svg>
      <figcaption className="agx-loop-cap">上一阶段的结果,是下一阶段的输入</figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <main className="fmc">
      <JsonLd data={[WEBPAGE_LD, BREADCRUMB_LD, ITEMLIST_LD, FAQ_LD]} />

      {/* ============ 模块 1:Hero ============ */}
      <header className="fmc-hero">
        <span className="fmc-grid" aria-hidden="true" />
        <div className="wrap">
          <nav className="fmc-crumb" aria-label="面包屑">
            <Link href="/">首页</Link>
            <span className="fmc-crumb-sep">/</span>
            <span>智能体解决方案</span>
            <span className="fmc-crumb-sep">/</span>
            <span>物业管理智能体矩阵</span>
          </nav>
          <div className="fmc-hero-cols">
            <div>
              <p className="fmc-kicker">AGENTIC AI SUITE</p>
              <h1>物业管理<span className="grad">智能体矩阵</span></h1>
              <p className="agx-sub">
                四个行业智能体,完成从服务设计、运营执行、质量评估到持续优化的管理闭环。
              </p>
              <p className="fmc-def">
                这是面向物业与设施管理的<b>行业级 Agentic AI 产品套件</b>。服务设计、运营管理、质量评估与服务优化智能体,
                共享统一的行业数据本体、指标口径、业务工作流、组织权限与审计记录,在明确的管理边界内协同完成工作。
              </p>
              <div className="agx-cta">
                <a className="btn btn-primary" href="#agent-matrix">
                  了解四个智能体
                  <svg className="ar" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <Link className="btn btn-ghost" href="/workshop">从一个真实问题开始</Link>
              </div>
            </div>
            <LoopArt />
          </div>
        </div>
      </header>

      {/* ============ 模块 2:什么是物业管理智能体矩阵 ============ */}
      <section className="fmc-sec mist" id="what">
        <div className="wrap">
          <p className="fmc-num">PROPERTY MANAGEMENT AGENT MATRIX</p>
          <h2>不是四个聊天机器人,而是一套协同运行的管理体系</h2>
          <p className="fmc-p">
            物业管理智能体矩阵,是运行在 FMClaw 平台上的四个行业智能体。它们分别负责服务设计、运营管理、
            质量评估与服务优化,并围绕同一套业务事实、管理标准和组织权限协同工作。
          </p>
          <p className="fmc-p">
            服务设计智能体定义服务标准和资源方案;运营管理智能体推动现场执行;质量评估智能体依据统一标准检验结果;
            服务优化智能体复盘数据并提出下一轮调整建议。
          </p>
          <p className="fmc-p">
            四个智能体不是彼此隔离的功能模块。<b>上一阶段的结果会成为下一阶段的输入</b>,
            形成从设计、执行、评估到优化的持续管理闭环。
          </p>
          <div className="fmc-defbox">
            <p className="fmc-deflab">定义</p>
            <p>
              物业管理智能体矩阵,是一套面向物业与设施管理的行业级 Agentic AI 系统,
              通过多个专业智能体协作,持续完成服务设计、运营执行、质量评估与管理优化。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 模块 3:四个行业智能体 ============ */}
      <section className="fmc-sec" id="agent-matrix">
        <div className="wrap">
          <p className="fmc-num">FOUR INDUSTRY AGENTS</p>
          <h2>四个智能体,各自负责一段管理闭环</h2>
          <div className="agx-cards">
            {AGENTS.map((a, i) => (
              <article className="agx-card" key={a.href}>
                <h3><span className="n">{i + 1}</span>{a.name}</h3>
                <p className="agx-q"><b>负责的问题</b>{a.q}</p>
                <div className="agx-io">
                  <div>
                    <b>主要输入</b>
                    <ul>{a.input.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div>
                    <b>主要工作</b>
                    <ul>{a.work.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div>
                    <b>主要输出</b>
                    <ul>{a.output.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                </div>
                <Link href={a.href}>{a.cta}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 模块 4:管理闭环 ============ */}
      <section className="fmc-sec dark" id="loop">
        <div className="wrap">
          <p className="fmc-num">ONE MANAGEMENT LOOP</p>
          <h2>上一阶段的结果,是下一阶段的输入</h2>
          <p className="fmc-p">
            物业管理不是一次性任务,而是一套持续运行的管理过程。FMClaw 将四个智能体组织在同一个业务闭环中,
            使设计标准、执行记录、质量结果和优化建议可以连续传递。
          </p>
          <div className="fmc-steps">
            {LOOP_STEPS.map((s) => (
              <div className="fmc-step" key={s.n}>
                <span className="n">{s.n}</span>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
          <p className="agx-loop-note">
            需要组织负责人判断、审批或承担责任的环节,<b>由人完成确认</b>。
            智能体负责准备事实、执行流程、识别异常和形成建议,不替代企业的最终管理责任。
          </p>
        </div>
      </section>

      {/* ============ 模块 5:为什么它属于 Agentic AI ============ */}
      <section className="fmc-sec" id="why-agentic-ai">
        <div className="wrap">
          <p className="fmc-num">WHY AGENTIC AI</p>
          <h2>不只是生成内容,而是沿着业务流程持续完成工作</h2>
          <p className="fmc-p">
            传统生成式 AI 主要根据指令生成文本、图片或分析结果。Agentic AI 则进一步读取业务数据、理解当前状态、
            运行工作流、调用获准使用的系统工具,并根据执行结果继续推进任务。
          </p>
          <p className="fmc-p"><b>物业管理智能体矩阵具备以下业务特征:</b></p>
          <ul className="agx-feats">
            <li>围绕明确的管理目标运行</li>
            <li>读取持续更新的业务数据</li>
            <li>按预设工作流推进任务</li>
            <li>在权限范围内调用系统工具</li>
            <li>识别异常并触发人工介入</li>
            <li>将执行结果写回业务系统</li>
            <li>保留工作过程与确认记录</li>
            <li>由多个行业智能体协同完成跨阶段工作</li>
          </ul>
          <div className="fmc-defbox">
            <p className="fmc-deflab">定义</p>
            <p>
              Agentic AI 产品套件不是多个 AI 功能的简单集合,而是由数据、工作流、工具、权限和专业智能体
              共同组成的可运行体系。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 模块 6:与 FMClaw 平台的关系 ============ */}
      <section className="fmc-sec mist" id="built-on-fmclaw">
        <div className="wrap">
          <p className="fmc-num">BUILT ON FMCLAW</p>
          <h2>智能体负责工作,FMClaw 提供运行基础</h2>
          <p className="fmc-p">
            物业管理智能体矩阵运行在 <Link className="fmc-ln" href="/products/fmclaw">FMClaw 平台</Link>上。
            四个智能体共享同一套行业数据本体、指标口径、业务工作流、系统连接和组织权限,
            不需要分别建立相互隔离的数据与工具体系。
          </p>
          <div className="agx-plat">
            {PLATFORM.map((p) => (
              <article className="fmc-cell" key={p.href}>
                <span className="agx-rel">{p.rel}</span>
                <h3>{p.name}</h3>
                <p>{p.d}</p>
                <Link className="go" href={p.href}>{p.cta}</Link>
              </article>
            ))}
          </div>
          <div className="fmc-defbox">
            <p className="fmc-deflab">平台关系</p>
            <p>
              FMClaw 是智能体运行的平台;物业管理智能体矩阵是建立在平台上的行业级 Agentic AI 产品套件。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 模块 7:生产级运行要求 ============ */}
      <section className="fmc-sec" id="production">
        <div className="wrap">
          <p className="fmc-num">BUILT FOR OPERATIONS</p>
          <h2>进入业务系统之后,结果必须可以复核</h2>
          <div className="fmc-cols3">
            <div className="fmc-cell">
              <h3>准确</h3>
              <p>关键指标、业务对象和管理口径使用统一定义。报告中的事实、指标和计算结果可以回到来源进行复核。</p>
            </div>
            <div className="fmc-cell">
              <h3>一致</h3>
              <p>在同一业务工作流和管理口径下,关键指标、计算结果和报告结构保持一致,便于跨项目执行与比较。</p>
            </div>
            <div className="fmc-cell">
              <h3>可追溯</h3>
              <p>每个智能体的工作过程均有记录。数据读取、工作流运行、系统调用、人工确认和最终结果可以查询。</p>
            </div>
          </div>
          <div className="fmc-status" aria-label="治理能力">
            <span>组织身份</span><span>项目隔离</span><span>角色权限</span><span>人工确认</span>
            <span>异常升级</span><span>运行监控</span><span>工作日志</span><span>操作审计</span>
          </div>
        </div>
      </section>

      {/* ============ 模块 8:可以从哪些业务问题开始 ============ */}
      <section className="fmc-sec mist" id="start-scenarios">
        <div className="wrap">
          <p className="fmc-num">START WITH A REAL OPERATION</p>
          <h2>从一个具体问题开始,而不是从一套抽象平台开始</h2>
          <div className="agx-scn">
            {SCENARIOS.map((s) => (
              <Link className="agx-scn-card" href={s.href} key={s.href}>
                <b>{s.name}</b>
                <p>{s.d}</p>
                <span className="go">查看场景 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 模块 9:FAQ ============ */}
      <section className="fmc-faq" id="faq">
        <div className="wrap">
          <h2>关于物业管理智能体矩阵</h2>
          <div className="fmc-faq-list">
            {FAQ.map((f) => (
              <details className="fmc-faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 模块 10:结尾 CTA ============ */}
      <section className="fmc-sec dark" id="start">
        <div className="wrap">
          <p className="fmc-num">GET STARTED</p>
          <h2>带一个真实问题来,让它在你的数据上跑起来</h2>
          <p className="fmc-p">
            选择一项正在发生的业务工作,使用真实数据验证智能体如何读取事实、运行流程、形成结果并接受人工确认。
          </p>
          <div className="agx-cta">
            <Link className="btn btn-primary" href="/workshop">
              从一个真实问题开始
              <svg className="ar" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link className="btn btn-ghost" href="/products/fmclaw">了解 FMClaw 平台</Link>
          </div>
        </div>
      </section>

      {/* 返回链接 + 最后更新(此后无正文模块) */}
      <div className="agx-end">
        <div className="wrap">
          <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
          <p className="agx-updated">最后更新:{UPDATED}</p>
        </div>
      </div>
    </main>
  );
}
