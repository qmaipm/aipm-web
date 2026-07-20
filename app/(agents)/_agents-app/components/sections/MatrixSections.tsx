// /agents 内容补充区块(服务端渲染,无客户端逻辑)
// 视觉直接复用 _agents-app/globals.css 原版精致卡片体系:
// product-card + card-glow(渐变发光边框) + card-icon(渐变底图标) + card-arrow(悬停圆形箭头)
import Link from "next/link";

/* ---------- 内联 SVG 图标(与老代码 AgentShowcase 同语言:1.5 描边线性图标) ---------- */
const Icons = {
  ontology: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2.5" stroke="#0070FF" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2.5" stroke="#0070FF" strokeWidth="1.5" />
      <circle cx="6" cy="18" r="2.5" stroke="#0070FF" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.5" stroke="#0070FF" strokeWidth="1.5" />
      <path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  workflow: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="6" height="6" rx="1.5" stroke="#12B98A" strokeWidth="1.5" />
      <rect x="15" y="14" width="6" height="6" rx="1.5" stroke="#12B98A" strokeWidth="1.5" />
      <path d="M9 7h5a3 3 0 013 3v4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 12l2 2 2-2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  connect: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M9 12h6" stroke="#12B98A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 8H7a4 4 0 000 8h3M14 8h3a4 4 0 010 8h-3" stroke="#0070FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  governance: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="#EC4899" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  reconciliation: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="#0070FF" strokeWidth="1.5" />
      <path d="M8 8h8M8 12h8" stroke="#0070FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16h3" stroke="#12B98A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  dispatch: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s-6.5-5.5-6.5-10.5a6.5 6.5 0 1113 0C18.5 15.5 12 21 12 21z" stroke="#12B98A" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="10.5" r="2.2" stroke="#F59E0B" strokeWidth="1.5" />
    </svg>
  ),
  inspection: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="#0070FF" strokeWidth="1.5" />
      <path d="M16 16l4.5 4.5" stroke="#0070FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 11l1.8 1.8 3.2-3.6" stroke="#12B98A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  execQuery: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="#9333EA" strokeWidth="1.5" />
      <path d="M7 13l3-3 2.5 2.5L17 8" stroke="#12B98A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21h6" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  utilityBill: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L5 13h5l-1 9 8-11h-5l1-9z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  repairBot: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M14.5 6.5a4 4 0 00-5.6 4.8L4 16.2V20h3.8l4.9-4.9a4 4 0 004.8-5.6l-2.6 2.6-2.3-.6-.6-2.3 2.5-2.7z" stroke="#EC4899" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const PLATFORM = [
  {
    rel: "数据来自",
    name: "行业数据本体与指标中心",
    href: "/products/fmclaw/ontology",
    d: "项目、空间、设备、人员、工单与账单,映射为统一的行业对象与指标。",
    icon: Icons.ontology,
    glow: "blue-purple",
  },
  {
    rel: "流程运行在",
    name: "行业级智能体工作流引擎",
    href: "/products/fmclaw/workflow-engine",
    d: "触发、取数、判断、审批与反馈,组织为可持续运行的业务工作流。",
    icon: Icons.workflow,
    glow: "green-gold",
  },
  {
    rel: "动作通过",
    name: "行业工具与系统连接",
    href: "/products/fmclaw/connectors",
    d: "在获得授权后,查询、通知、派单、写回企业现有业务系统。",
    icon: Icons.connect,
    glow: "blue-green",
  },
  {
    rel: "运行受控于",
    name: "智能体运行与治理中心",
    href: "/products/fmclaw/agent-runtime",
    d: "统一管理组织身份、项目权限、人工介入与审计记录。",
    icon: Icons.governance,
    glow: "pink-gold",
  },
];

const SCENARIOS = [
  { name: "供应商自动对账", href: "/scenarios/reconciliation", d: "核对合同、工作量与账单,标记异常并准备确认材料。", icon: Icons.reconciliation, glow: "blue-purple" },
  { name: "智能派单", href: "/scenarios/dispatch", d: "结合位置、等级与负载形成派单建议并跟踪执行。", icon: Icons.dispatch, glow: "blue-green" },
  { name: "品质巡检", href: "/scenarios/inspection", d: "依据统一标准检查现场,关联问题、证据与整改任务。", icon: Icons.inspection, glow: "green-gold" },
  { name: "管理层问询", href: "/scenarios/exec-query", d: "基于统一口径回答运营问题,提供可复核的数据来源。", icon: Icons.execQuery, glow: "blue-purple" },
  { name: "费用审批", href: "/scenarios/utility-bill", d: "汇总能耗、合同与历史数据,识别异常并辅助审批。", icon: Icons.utilityBill, glow: "pink-gold" },
  { name: "报修客服", href: "/scenarios/repair-bot", d: "识别报修、创建工单、通知相关人员并跟踪处理结果。", icon: Icons.repairBot, glow: "blue-green" },
];

export const FAQ = [
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

export default function MatrixSections() {
  return (
    <>
      {/* BUILT ON FMCLAW —— 原版 product-card + card-glow 卡片体系 */}
      <section className="mx-section mx-white" id="built-on-fmclaw">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">BUILT ON FMCLAW</span>
            <h2 className="section-title">智能体负责工作，FMClaw 提供运行基础</h2>
            <p className="section-desc">
              四个智能体共享同一套行业数据、业务工作流、系统连接和组织权限，运行在{" "}
              <Link href="/products/fmclaw" className="mx-inline-link">FMClaw 平台</Link>之上。
            </p>
          </div>
          <div className="mx-grid-4">
            {PLATFORM.map((p) => (
              <Link className="product-card mx-card-link" href={p.href} key={p.href}>
                <div className={`card-glow ${p.glow}`}></div>
                <div className="card-icon">{p.icon}</div>
                <span className="mx-rel">{p.rel}</span>
                <h3>{p.name}</h3>
                <p>{p.d}</p>
                <span className="card-arrow">{Icons.arrow}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* START WITH A REAL OPERATION */}
      <section className="mx-section mx-gray" id="start-scenarios">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">START WITH A REAL OPERATION</span>
            <h2 className="section-title">从一个具体问题开始，而不是从一套抽象平台开始</h2>
          </div>
          <div className="mx-grid-3">
            {SCENARIOS.map((s) => (
              <Link className="product-card mx-card-link" href={s.href} key={s.href}>
                <div className={`card-glow ${s.glow}`}></div>
                <div className="card-icon">{s.icon}</div>
                <h3>{s.name}</h3>
                <p>{s.d}</p>
                <span className="card-arrow">{Icons.arrow}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-section mx-white" id="faq">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">关于物业管理智能体矩阵</h2>
          </div>
          <div className="mx-faq-list">
            {FAQ.map((f) => (
              <details className="mx-faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* GET STARTED —— 复用原 cta-section 渐变带,作为页面收尾 */}
      <section className="cta-section" id="start">
        <div className="cta-gradient">
          <div className="cta-blob cta-blob-1"></div>
          <div className="cta-blob cta-blob-2"></div>
        </div>
        <div className="section-container">
          <div className="cta-content">
            <span className="mx-cta-eyebrow">GET STARTED</span>
            <h2>带一个真实问题来，让它在你的数据上跑起来</h2>
            <p>选择一项正在发生的业务工作，用真实数据验证智能体如何形成结果并接受人工确认。</p>
            <div className="cta-actions">
              <Link href="/workshop" className="btn-cta-primary">
                从一个真实问题开始
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </Link>
              <Link href="/products/fmclaw" className="btn-cta-secondary">
                了解 FMClaw 平台
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
