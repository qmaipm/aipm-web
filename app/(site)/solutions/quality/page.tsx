import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "服务质量管理 · 智能体解决方案 — 启盟科技",
  description:
    "服务质量不是靠事后打分打出来的,而是从源头到过程、再到长期,环环保障出来的。我们把它拆成三件事:源头到岗、过程达标、评估公平。",
};

export default function Page() {
  return (
    <main className="sol-page">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/solutions">智能体解决方案</Link> / 服务质量管理</div>
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>服务质量,<br />从源头到评估,环环可核验。</h1>
        </div>
      </section>

      {/* 正文 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">服务质量管理</span></div>
          <div className="prose reveal" style={{ marginTop: 32 }}>
            <p>服务质量不是靠事后打分打出来的，而是从源头到过程、再到长期，环环保障出来的。我们把它拆成三件事。</p>
            <p>源头上，先保证人要到。该到岗的人、该到的时段、该到的点位，都对照现场的真实情况来核验，而不是看排班表。</p>
            <p>过程中，保证每一次交付都达标。每一次服务都留下可核验的记录，覆盖到全员、全程，而不是抽样里碰运气。</p>
            <p>评估上，保证抽查公平公正。采样跟着现场数据的变化做智能调度，谁该被查、什么时候查，由事实决定，避免人为的松紧。</p>
          </div>
          <p className="sol-emph reveal">三件事合起来，才是全方位的质量保障。</p>
          <p className="sol-link reveal">这套数据也支撑 <Link href="/solutions/subcontract">服务分包管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的服务,<br />从源头到评估都看清。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
