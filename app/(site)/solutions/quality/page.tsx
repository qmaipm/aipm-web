import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "服务质量管理 · 智能体解决方案 — 启盟科技",
  description:
    "服务质量不是靠事后打分打出来的,而是从源头到过程、再到长期,环环保障出来的。我们把它拆成三件事:源头到岗、过程达标、评估公平。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const steps = [
  {
    no: "01",
    tag: "源头",
    title: "先保证人要到",
    body: "源头上，先保证人要到。该到岗的人、该到的时段、该到的点位，都对照现场的真实情况来核验，而不是看排班表。",
  },
  {
    no: "02",
    tag: "过程",
    title: "每一次交付都达标",
    body: "过程中，保证每一次交付都达标。每一次服务都留下可核验的记录，覆盖到全员、全程，而不是抽样里碰运气。",
  },
  {
    no: "03",
    tag: "评估",
    title: "抽查公平公正",
    body: "评估上，保证抽查公平公正。采样跟着现场数据的变化做智能调度，谁该被查、什么时候查，由事实决定，避免人为的松紧。",
  },
];

export default function Page() {
  return (
    <main className="solq">
      {/* HERO */}
      <section className="sq-hero">
        <div className="sq-grid" aria-hidden="true" />
        <div className="wrap sq-hero-top">
          <span className="sq-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>服务质量管理
          </span>
          <h1 className="sq-h1">
            服务质量，<br /><span className="grad">环环可核验</span>
          </h1>
          <p className="sq-lead">
            质量不是事后打分打出来的，而是从人到岗、过程留痕，再到公平抽查，<b>一环扣一环</b>保障出来的。
          </p>
          <div className="sq-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#ladder" className="btn btn-ghost">看三件事 <Arrow /></a>
          </div>
        </div>
        <div className="wrap">
          <div className="sq-proof">
            <span>源头<b>到岗</b></span>
            <span className="sep" />
            <span>过程<b>留痕</b></span>
            <span className="sep" />
            <span>评估<b>公平</b></span>
          </div>
        </div>
      </section>

      {/* 拆成三件事 · 能力梯 */}
      <section className="sq-band mist" id="ladder">
        <div className="wrap">
          <span className="sq-eyebrow">服务质量管理</span>
          <h2 className="sq-h2">把质量拆成三件能管的事</h2>
          <p className="sq-sub">服务质量不是靠事后打分打出来的，而是<b>从源头到过程、再到长期</b>，环环保障出来的。我们把它拆成三件事。</p>

          <div className="sq-ladder">
            {steps.map((s) => (
              <div className="sq-step" key={s.no}>
                <div className="sq-step-k">
                  <span className="sq-no grad">{s.no}</span>
                  <span className="sq-step-tag">{s.tag}</span>
                </div>
                <div className="sq-step-c">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 判词 + 使命时刻 */}
      <section className="sq-mission-band">
        <div className="sq-grid" aria-hidden="true" />
        <span className="sq-mission-glow" aria-hidden="true" />
        <div className="wrap">
          <p className="sq-mission-en">Source · Process · Review</p>
          <p className="sq-mission-zh">三件事合起来，<br />才是全方位的质量保障</p>
          <p className="sq-mission-sub">这套数据也支撑 <Link href="/solutions/subcontract">服务分包管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的服务，从源头到评估都看清</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
