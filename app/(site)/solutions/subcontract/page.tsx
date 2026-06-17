import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "服务分包管理 · 智能体解决方案 — 启盟科技",
  description:
    "分包结算依据月度工作量与考核,需要现场核实与多方确认。我们用同一套服务感知数据记录派工、出勤、工时与达标,结算与考核都指向同一份可核验的事实。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const chain = ["派工", "出勤", "工时", "达标", "多方确认"];

export default function Page() {
  return (
    <main className="solsc">
      {/* HERO */}
      <section className="sc-hero">
        <div className="sc-grid" aria-hidden="true" />
        <div className="wrap sc-hero-top">
          <span className="sc-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>服务分包管理
          </span>
          <h1 className="sc-h1">
            分包结算，指向<br /><span className="grad">同一份可核验的事实</span>
          </h1>
          <p className="sc-lead">
            物业公司常把保洁、保安、绿化再分包出去，结算依据的是<b>月度工作量与考核</b>。
          </p>
          <div className="sc-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#chain" className="btn btn-ghost">看结算链路 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* 链路 */}
      <section className="sc-band mist" id="chain">
        <div className="wrap">
          <span className="sc-eyebrow">服务分包管理</span>
          <h2 className="sc-h2">从派工到确认，一条链跑下来</h2>
          <p className="sc-sub">派了多少人、出了多少勤、达没达标，再据此核定服务费与扣减——这正是分歧最多、对账最慢的环节。</p>

          <div className="sc-chain" aria-hidden="false">
            {chain.map((n, i) => (
              <span className="sc-node-wrap" key={n}>
                <span className="sc-node">{n}</span>
                {i < chain.length - 1 && <span className="sc-arr" aria-hidden="true">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* them vs us */}
      <section className="sc-band">
        <div className="wrap">
          <span className="sc-eyebrow">同一口井</span>
          <h2 className="sc-h2">结算与考核，指向同一份事实</h2>
          <div className="sc-versus">
            <div className="sc-vs them">
              <span className="sc-vs-tag">过去</span>
              <p className="sc-vs-line">现场核实、多方确认</p>
              <p className="sc-vs-sub">派工、出勤、达标各在一处，需要经过现场核实与多方确认——分歧最多、对账最慢。</p>
            </div>
            <div className="sc-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="sc-vs us">
              <span className="sc-vs-tag">同一套服务感知数据</span>
              <p className="sc-vs-line">一份可核验的事实</p>
              <p className="sc-vs-sub">把派工、出勤、工时与达标情况实时记录下来。结算与考核都指向同一份可核验的事实，对账有据可依。</p>
            </div>
          </div>

          <p className="sc-verdict">这份数据，也是 <Link href="/solutions/quality">服务质量管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link> 共用的<span className="grad">同一口井</span></p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的分包对账，跑在同一份事实上</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
