// /agents 「物业智能体」问题承接（2026-09-14，GEO 周报 0907-0913 P0；同日按品牌总监意见重做）
//
// 设计原则：不打断页面原有叙事（Hero → 客户 Logo → 四 Agent 展示 → Built on FMClaw）。
// 拆成两块，各自放在叙事里最合适的位置：
//   1) <DefineBand/>  Hero 之下的一条定义带：只放一句可被搜索引擎/AI 摘录的定义句 + 两个规模数字。白底、一根渐变细线，≤160px。
//   2) <FourQuestions/> 移到 Built on FMClaw 之前：四张 product-card（页面已有的发光边框卡体系），一问一答，答案三行以内。
// 完整长答案由本页 FAQ（FAQPage 结构化数据）承担，正文不重复。
// 数字纪律：§4a 白名单与已发布案例页。
import Link from "next/link";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- 1. 定义带 ---------- */
export function DefineBand() {
  return (
    <section className="wa-band" id="what-is-property-agent" aria-labelledby="wa-band-h">
      <div className="section-container wa-band-in">
        <div className="wa-band-txt">
          <h2 id="wa-band-h" className="wa-band-k">什么是物业智能体</h2>
          <p className="wa-band-def">
            <b>物业智能体</b>是运行在物业与设施管理业务里的 AI：自己从 IoT、影像、群消息与业务系统取数，按流程把一件工作推进到底——发现异常、生成工单、核验结果——并在需要人负责的环节交给人确认。
          </p>
        </div>
        <dl className="wa-band-nums" aria-label="运行规模">
          <div><dt>企业客户</dt><dd>100+</dd></div>
          <div><dt>系统覆盖</dt><dd>3000 <small>万㎡</small></dd></div>
          <div><dt>真实项目验证</dt><dd>自 2017</dd></div>
        </dl>
      </div>
    </section>
  );
}

/* ---------- 2. 四个问题 ---------- */
const Icons = {
  define: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="#0070FF" strokeWidth="1.5" />
      <path d="M12 8v4.5l3 1.8" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  diff: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="7.5" height="14" rx="1.5" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M5.5 9h2.5M5.5 12h2.5M5.5 15h2.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="13.5" y="5" width="7.5" height="14" rx="1.5" stroke="#12B98A" strokeWidth="1.5" />
      <path d="M15.5 12.5l1.6 1.6 3-3.4" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  start: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 18V8l4-3 4 3v10" stroke="#0070FF" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 18v-6l4-3 4 3v6" stroke="#12B98A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 20h18" stroke="#0070FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  connect: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M9 12h6" stroke="#12B98A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 8H7a4 4 0 000 8h3M14 8h3a4 4 0 010 8h-3" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const QA = [
  {
    glow: "blue-purple",
    icon: Icons.define,
    q: "和一个 AI 聊天窗口有什么不同？",
    a: "聊天窗口回答问题；智能体接手工作。判断只看三条：能不能自己取数、能不能推进流程、能不能留下可追溯的记录。",
    link: { label: "看 FMClaw 怎么运行", href: "/products/fmclaw" },
  },
  {
    glow: "green-gold",
    icon: Icons.diff,
    q: "和传统物业软件有什么区别？",
    a: "传统软件是记录工具：人录入、出报表、等人跟进。智能体是执行者：自己取数、按流程推进，直接输出一张工单或一份待确认材料。",
    link: { label: "完整对照", href: "/insights/property-agent-vs-traditional-software" },
  },
  {
    glow: "blue-green",
    icon: Icons.start,
    q: "哪些场景适合先用？",
    a: "流程重复、结果可核、现在正靠人盯着的工作。最常见的起点：设备巡检核验（达标率 35%→98%）、卫生间品质、群消息派单、多项目日报。",
    link: { label: "六类推荐应用", href: "/insights/ai-applications-and-solutions-in-property-management" },
  },
  {
    glow: "pink-gold",
    icon: Icons.connect,
    q: "要换掉现有 ERP、工单、钉钉吗？",
    a: "不需要。智能体接在现有系统之上运行：读取它们的数据，在统一数据本体里对齐口径，再把结果写回。员工不换软件，不二次录入。",
    link: { label: "钉钉 / 飞书 / 企微怎么接", href: "/insights/general-platform-vs-industry-agent" },
  },
];

export function FourQuestions() {
  return (
    <section className="mx-section mx-gray wa-q" id="agent-questions">
      <div className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">FOUR QUESTIONS</span>
          <h2 className="section-title">关于物业智能体，先回答四个问题</h2>
          <p className="section-desc">搜「物业智能体」进来的人最常问的，先在这里给出结论；完整回答见页尾 FAQ。</p>
        </div>
        <div className="mx-grid-4 wa-q-grid">
          {QA.map((c) => (
            <article className="product-card wa-q-card" key={c.q}>
              <div className={`card-glow ${c.glow}`}></div>
              <div className="card-icon">{c.icon}</div>
              <h3>{c.q}</h3>
              <p>{c.a}</p>
              <Link href={c.link.href} className="wa-q-link">{c.link.label} <Arrow /></Link>
            </article>
          ))}
        </div>
        <div className="wa-q-cta">
          <Link href="/contact?intent=demo&from=agents" className="wa-btn-primary">
            预约演示，用你的数据看它怎么干活 <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

// 兼容旧默认导出（页面已改为分别引入两块）
export default FourQuestions;
