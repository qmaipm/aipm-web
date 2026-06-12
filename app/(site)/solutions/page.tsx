import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "智能体解决方案 · 一套套件,组合出多个方案 — 启盟科技",
  description:
    "上层是 Agentic 产品套件,下层是它能组合出的解决方案。围绕同一套服务感知数据,覆盖人员成本、服务质量、服务分包、人员薪酬,以及客户服务、设备巡检、采购管理。",
};

export default function Page() {
  return (
    <main className="sol-page">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>按问题来,<br />不按部门来。</h1>
          <p className="lead reveal">上层是 Agentic 产品套件，下层是它能组合出的解决方案——每一个，都从一件真实业务开始。</p>
        </div>
      </section>

      {/* 上层 · 产品套件 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">上层 · 引擎</span></div>
          <Link className="sol-suite reveal" href="/agents">
            <div className="meta">产品套件</div>
            <h2>Agentic 产品套件</h2>
            <p>服务设计 · 运营管理 · 质量评估 · 服务优化——四个专业 Agent 接力协同，是下面这些解决方案共同的引擎。</p>
            <span className="go">看一体化物业管理 AI 产品套件 →</span>
          </Link>
        </div>
      </section>

      {/* 下层 · 围绕同一套数据的四个方案 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">下层 · 解决方案</span>
            <h2 className="reveal">围绕同一套服务感知数据。</h2>
            <p className="sub reveal">服务质量、服务分包、人员薪酬、人员成本，本就源自同一口井。</p>
          </div>
          <div className="grid c2" style={{ marginTop: 44 }}>
            <Link className="card lk hover reveal" href="/solutions/cost">
              <div className="k" style={{ background: "var(--blue)" }} />
              <h3>人员成本优化<Ar /></h3>
              <p>从源头、过程到长期，三层一起把人力成本降下来。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/quality">
              <div className="k" style={{ background: "var(--green)" }} />
              <h3>服务质量管理<Ar /></h3>
              <p>从源头到评估，每一次服务都可核验。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/subcontract">
              <div className="k" style={{ background: "var(--gold)" }} />
              <h3>服务分包管理<Ar /></h3>
              <p>派工、出勤、达标，结算指向同一份事实。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/payroll">
              <div className="k" style={{ background: "var(--purple)" }} />
              <h3>人员薪酬管理<Ar /></h3>
              <p>让薪酬成为服务过程的直接结果。</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 下层 · 其它方案 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">下层 · 其它方案</span></div>
          <div className="grid c3" style={{ marginTop: 44 }}>
            <Link className="card lk hover reveal" href="/solutions/customer">
              <div className="k" style={{ background: "var(--green)" }} />
              <h3>客户服务<Ar /></h3>
              <p>群里的每一条诉求，即时接住、落成动作。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/inspection">
              <div className="k" style={{ background: "var(--blue)" }} />
              <h3>设备巡检管理<Ar /></h3>
              <p>巡到、巡实，留下百分之百的真数据。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/procurement">
              <div className="k" style={{ background: "var(--gold)" }} />
              <h3>采购管理<Ar /></h3>
              <p>补货比价自动跑完，付款留给人。</p>
            </Link>
          </div>
          <p className="calmline reveal">不确定属于哪一类？<Link href="/#tri">先看看你是业主、物业公司，还是开发者 →</Link></p>
        </div>
      </section>

      {/* END CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把这件事,<br />用一次加速营跑通。</h2>
          <p className="reveal">带上你的真实数据来。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Ar() {
  return (
    <svg className="ar" width="16" height="16" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}
