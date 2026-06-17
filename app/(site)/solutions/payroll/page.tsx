import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "人员薪酬管理 · 智能体解决方案 — 启盟科技",
  description:
    "一线员工的薪酬建立在考勤、工时、请假与达标数据之上。我们让这些数据在服务过程中自然产生并实时归集,薪酬成为它的直接结果,而不是月底重新拼凑的一笔账。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="solpay">
      {/* HERO */}
      <section className="pay-hero">
        <div className="pay-grid" aria-hidden="true" />
        <div className="wrap pay-hero-top">
          <span className="pay-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>人员薪酬管理
          </span>
          <h1 className="pay-h1">
            让薪酬，成为服务过程的<br /><span className="grad">直接结果</span>
          </h1>
          <p className="pay-lead">
            一线员工的薪酬，建立在<b>考勤、工时、请假与达标</b>数据之上——而这些数据，来自不同的人和环节。
          </p>
          <div className="pay-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#shift" className="btn btn-ghost">看前后对比 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* them vs us */}
      <section className="pay-band mist" id="shift">
        <div className="wrap">
          <span className="pay-eyebrow">人员薪酬管理</span>
          <h2 className="pay-h2">从月底拼账，到过程即结果</h2>
          <div className="pay-versus">
            <div className="pay-vs them">
              <span className="pay-vs-tag">过去 · 月底拼账</span>
              <p className="pay-vs-line">对得上是运气</p>
              <p className="pay-vs-sub">考勤在班长手里、工时在排班表里、请假在另一个本子上、达标靠抽查印象。每个月底，汇总、核对、计算要从头再做一遍，对得上是运气，对不上是争议。</p>
            </div>
            <div className="pay-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="pay-vs us">
              <span className="pay-vs-tag">现在 · 过程即结果</span>
              <p className="pay-vs-line">记录当场落定</p>
              <p className="pay-vs-sub">让这些数据在服务过程中自然产生并实时归集。人到了、工时够了、达标了，记录当场落定，薪酬成为它的直接结果，而不是月底重新拼凑的一笔账。</p>
            </div>
          </div>

          <p className="pay-verdict">薪酬不再是月底的一笔账，而是<span className="grad">服务过程留下的直接结果</span></p>
          <p className="pay-link">它与 <Link href="/solutions/subcontract">服务分包管理</Link>，本就源自同一套记录。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个月的薪酬核算，跑成服务的直接结果</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
