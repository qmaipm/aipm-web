// /agents 内容补充区块（服务端渲染，无客户端逻辑）
// 视觉直接复用 _agents-app/globals.css 原版精致卡片体系：
// product-card + card-glow(渐变发光边框) + card-icon(渐变底图标) + card-arrow(悬停圆形箭头)
import Link from "next/link";

/* ---------- 内联 SVG 图标（与老代码 AgentShowcase 同语言：1.5 描边线性图标） ---------- */
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
    name: "行业数据本体",
    href: "/products/fmclaw/ontology",
    d: "项目、空间、设备、人员、工单与账单，映射为统一的行业对象与指标。",
    icon: Icons.ontology,
    glow: "blue-purple",
  },
  {
    rel: "流程运行在",
    name: "工作流引擎",
    href: "/products/fmclaw/workflow-engine",
    d: "触发、取数、判断、审批与反馈，组织为可持续运行的业务工作流。",
    icon: Icons.workflow,
    glow: "green-gold",
  },
  {
    rel: "动作通过",
    name: "工具箱",
    href: "/products/fmclaw/connectors",
    d: "在获得授权后，发通知、建工单、调收费，写回企业现有业务系统。",
    icon: Icons.connect,
    glow: "blue-green",
  },
  {
    rel: "运行受控于",
    name: "控制台",
    href: "/products/fmclaw/agent-runtime",
    d: "智能体的身份、权限、运行和记录，都在一个地方管理。",
    icon: Icons.governance,
    glow: "pink-gold",
  },
];

const SCENARIOS = [
  { name: "供应商自动对账", href: "/scenarios/reconciliation", d: "核对合同、工作量与账单，标记异常并准备确认材料。", icon: Icons.reconciliation, glow: "blue-purple" },
  { name: "智能派单", href: "/scenarios/dispatch", d: "结合位置、等级与负载形成派单建议并跟踪执行。", icon: Icons.dispatch, glow: "blue-green" },
  { name: "品质巡检", href: "/scenarios/inspection", d: "依据统一标准检查现场，关联问题、证据与整改任务。", icon: Icons.inspection, glow: "green-gold" },
  { name: "管理层问询", href: "/scenarios/exec-query", d: "基于统一口径回答运营问题，提供可复核的数据来源。", icon: Icons.execQuery, glow: "blue-purple" },
  { name: "费用审批", href: "/scenarios/utility-bill", d: "汇总能耗、合同与历史数据，识别异常并辅助审批。", icon: Icons.utilityBill, glow: "pink-gold" },
  { name: "报修客服", href: "/scenarios/repair-bot", d: "识别报修、创建工单、通知相关人员并跟踪处理结果。", icon: Icons.repairBot, glow: "blue-green" },
];

export const FAQ = [
  {
    q: "什么是物业智能体?",
    a: "物业智能体（物业管理智能体）是运行在物业与设施管理业务里的 AI 程序：它读取项目、空间、设备、人员、工单与账单数据，按既定业务流程推进一项工作——发现异常、生成工单、核验结果、准备待确认材料——并在需要人负责的环节交给人确认。判断标准有三条：能不能自己取数、能不能推进流程、能不能留下可追溯的工作记录。它不是一个回答问题的聊天窗口，也不是又一套需要人录数据的管理软件。",
  },
  {
    q: "物业智能体和传统物业管理软件有什么区别?",
    a: "传统物业管理软件是记录工具：人把现场情况录进去，系统生成报表，再由人去解读、派人、跟进。物业智能体是执行者：它从 IoT、影像、群消息与业务系统里自己取数，按流程推进，把结果直接变成一张工单、一条通知或一份待确认材料，异常由它识别并跟到关闭。两者不是替代关系，智能体通常接在现有软件之上运行，用它们的数据，把它们里面的流程跑起来。",
  },
  {
    q: "哪些物业场景适合先用智能体?",
    a: "适合先上智能体的场景有三个共同点：流程重复、结果可以被数据核验、现在正靠人盯着。按这个标准最常见的四个起点是：设备巡检核验（某互联网大厂总部案例，运行班组达标率从 35% 到 98%）、卫生间品质追踪（某通信设备龙头案例，2000 多个卫生间达标率稳定 95% 以上）、群消息报事派单（某企业总部案例，从群消息到派单不到 1 分钟）、多项目运营报告（某百强物业集团案例，500 多个项目每天自动送达）。",
  },
  {
    q: "上智能体需不需要替换现有 ERP、工单系统、钉钉、飞书、企业微信?",
    a: "不需要。物业智能体接在企业现有系统之上运行：ERP 与财务系统继续做账，工单系统继续流转，钉钉、飞书、企业微信继续做员工入口。智能体通过官方接口读取这些系统的数据，在 FMClaw 行业数据本体里统一口径，按工作流推进，再把结果写回原系统。员工不需要换软件，也不需要第二次录入。",
  },
  {
    q: "什么是物业管理智能体矩阵?",
    a: "物业管理智能体矩阵是运行在 FMClaw 平台上的行业级 Agentic AI 产品套件，由服务设计、运营管理、质量评估与服务优化智能体组成。四个智能体共享统一的数据、指标、业务工作流和组织权限，围绕同一管理闭环协同工作。",
  },
  {
    q: "四个智能体是四个独立的聊天机器人吗?",
    a: "不是。四个智能体分别承担服务设计、运营管理、质量评估和服务优化工作，但共享同一套业务事实、指标口径、工作流和组织权限。上一阶段的结果会成为下一阶段的输入。",
  },
  {
    q: "物业管理智能体矩阵与 FMClaw 是什么关系?",
    a: "FMClaw 是物业与设施管理的生产级 AI 智能体平台，为智能体提供行业数据本体、业务工作流、系统连接、组织权限、运行监控和审计能力。物业管理智能体矩阵是运行在 FMClaw 上的行业应用。",
  },
  {
    q: "智能体是否会替代管理人员作出最终决定?",
    a: "不会。智能体可以准备事实、运行流程、识别异常、生成建议和执行获准操作。涉及责任、审批、付款和重要管理决策的环节，仍由具备相应权限的人员确认。",
  },
  {
    q: "智能体的工作是否可以追溯?",
    a: "可以。智能体的数据读取、工作流运行、系统调用、人工确认和最终结果都会形成记录，并可以根据组织和项目权限查询。",
  },
  {
    q: "如何开始使用物业管理智能体?",
    a: "建议从一个真实业务问题和一份真实数据开始，例如设备巡检、卫生间品质、群消息派单、供应商对账或运营报告。完成验证后，再进入系统连接、流程调整和生产部署。也可以直接预约演示，在你的数据上看智能体如何形成结果。",
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
            <h2 className="section-title">关于物业智能体，问得最多的</h2>
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

      {/* GET STARTED —— 复用原 cta-section 渐变带，作为页面收尾 */}
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
