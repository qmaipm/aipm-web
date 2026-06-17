import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "采购管理 · 智能体解决方案 — 启盟科技",
  description:
    "物料何时补、补多少、从哪买更划算。我们让系统主动盘点库存、判断补货、走完审批,并在 1688、京东等渠道比价、生成采购申请直至下单。付款这一步,仍然留给人。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const chain = [
  { label: "盘点" },
  { label: "判断补货" },
  { label: "审批" },
  { label: "比价" },
  { label: "下单" },
  { label: "付款 · 人工把关", human: true },
];

export default function Page() {
  return (
    <main className="solpro">
      {/* HERO */}
      <section className="pr-hero">
        <div className="pr-grid" aria-hidden="true" />
        <div className="wrap pr-hero-top">
          <span className="pr-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>采购管理
          </span>
          <h1 className="pr-h1">
            补货比价自动跑完，<br /><span className="grad">付款留给人</span>
          </h1>
          <p className="pr-lead">
            物料什么时候该补、补多少、<b>从哪里买更划算</b>，过去依赖各点位上报和人工比价。
          </p>
          <div className="pr-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#chain" className="btn btn-ghost">看整条链路 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* 链路 */}
      <section className="pr-band mist" id="chain">
        <div className="wrap">
          <span className="pr-eyebrow">采购管理</span>
          <h2 className="pr-h2">整条链路连续跑完，最后一步留给人</h2>
          <p className="pr-sub">系统主动盘点库存、判断是否需要补货、走完审批，并在 1688、京东等渠道比价、生成采购申请直至下单。</p>

          <div className="pr-chain">
            {chain.map((c, i) => (
              <span className="pr-node-wrap" key={c.label}>
                <span className={c.human ? "pr-node human" : "pr-node"}>{c.label}</span>
                {i < chain.length - 1 && <span className="pr-arr" aria-hidden="true">→</span>}
              </span>
            ))}
          </div>

          <div className="pr-notes">
            <p>整条链路连续跑完，不再卡在各点位上报的等待里。</p>
            <p className="pr-human-note"><span className="pr-dot" aria-hidden="true" />付款这一步，仍然留给人——金额、对象与时点的最终确认，由人来按下。</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的补货，让系统跑到下单前</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
