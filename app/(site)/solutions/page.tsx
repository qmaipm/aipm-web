import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "智能体解决方案 · 一套套件,组合出多个方案 — 启盟科技",
  description:
    "上层是 Agentic 产品套件,下层是它能组合出的解决方案。围绕同一套服务感知数据,覆盖人员成本、服务质量、服务分包、人员薪酬,以及客户服务、设备巡检、采购管理。",
};

const Ar = ({ s = 16 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AGENTS: [string, string][] = [
  ["服务设计", "把标准说清楚"],
  ["运营管理", "每天照着跑"],
  ["质量评估", "做得好不好"],
  ["服务优化", "下一轮更好"],
];

const CORE: [string, string, string, string][] = [
  ["成本", "人员成本优化", "从源头、过程到长期，三层一起把人力成本降下来", "/solutions/cost"],
  ["质量", "服务质量管理", "从源头到评估，每一次服务都可核验", "/solutions/quality"],
  ["分包", "服务分包管理", "派工、出勤、达标，结算指向同一份事实", "/solutions/subcontract"],
  ["薪酬", "人员薪酬管理", "让薪酬成为服务过程的直接结果", "/solutions/payroll"],
];

const MORE: [string, string, string, string][] = [
  ["客服", "客户服务", "群里的每一条诉求，即时接住、落成动作", "/solutions/customer"],
  ["巡检", "设备巡检管理", "巡到、巡实，留下百分之百的真数据", "/solutions/inspection"],
  ["采购", "采购管理", "补货比价自动跑完，付款留给人", "/solutions/procurement"],
];

export default function Page() {
  return (
    <main className="solhub">
      {/* ===== HERO ===== */}
      <section className="sh-hero">
        <div className="sh-grid" aria-hidden="true" />
        <div className="wrap sh-hero-top">
          <span className="sh-eyebrow">智能体解决方案</span>
          <h1 className="sh-h1">按问题来，<span className="grad">不按部门来</span></h1>
          <p className="sh-lead">上层是 Agentic 产品套件，下层是它能组合出的解决方案——每一个，都从一件真实业务开始。</p>
        </div>
      </section>

      {/* ===== 上层 · 引擎 ===== */}
      <section className="sh-band mist">
        <div className="wrap">
          <span className="sh-eyebrow">上层 · 引擎</span>
          <h2 className="sh-h2">一套套件，组合出下面所有方案</h2>
          <p className="sh-sub">每个解决方案看起来各自独立，背后却共用同一台引擎——四个专业 Agent 接力协同，把项目数据一路带到决策。</p>
          <div className="sh-relay">
            {AGENTS.map(([n, d], i, arr) => (
              <div className="sh-relay-step" key={n}>
                <span className="sh-relay-i">A{i + 1}</span>
                <span className="sh-relay-n">{n}</span>
                <span className="sh-relay-d">{d}</span>
                {i < arr.length - 1 && <span className="sh-relay-arr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
          <Link href="/agents" className="sh-link">看一体化物业管理 AI 产品套件 <Ar s={14} /></Link>
        </div>
      </section>

      {/* ===== 下层 · 核心方案 ===== */}
      <section className="sh-band">
        <div className="wrap">
          <span className="sh-eyebrow">下层 · 解决方案</span>
          <h2 className="sh-h2">围绕同一套服务感知数据</h2>
          <p className="sh-well">服务质量、服务分包、人员薪酬、人员成本，本就<span className="grad">源自同一口井</span></p>
          <div className="sh-cards c4">
            {CORE.map(([tag, title, desc, href]) => (
              <Link className="sh-card" href={href} key={href}>
                <span className="sh-card-tag">{tag}</span>
                <h3>{title}<Ar /></h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 下层 · 其它方案 ===== */}
      <section className="sh-band mist">
        <div className="wrap">
          <span className="sh-eyebrow">下层 · 其它方案</span>
          <h2 className="sh-h2">同一套数据，也覆盖这些日常</h2>
          <p className="sh-sub">客户诉求、设备巡检、采购补货——同样接在这套服务感知数据上，跑成可追溯的动作。</p>
          <div className="sh-cards c3">
            {MORE.map(([tag, title, desc, href]) => (
              <Link className="sh-card" href={href} key={href}>
                <span className="sh-card-tag">{tag}</span>
                <h3>{title}<Ar /></h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
          <p className="sh-calm">不确定属于哪一类？<Link href="/#tri">先看看你是业主、物业公司，还是开发者 <Ar s={13} /></Link></p>
        </div>
      </section>

      {/* ===== END CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把这件事，<br />用一次加速营跑通</h2>
          <p className="reveal">带上你的真实数据来。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Ar s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
