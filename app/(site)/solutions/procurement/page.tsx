import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "采购管理 · 智能体解决方案 — 启盟科技",
  description:
    "物料何时补、补多少、从哪买更划算。我们让系统主动盘点库存、判断补货、走完审批,并在 1688、京东等渠道比价、生成采购申请直至下单。付款这一步,仍然留给人。",
};

export default function Page() {
  return (
    <main className="sol-page">
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/solutions">智能体解决方案</Link> / 采购管理</div>
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>补货比价自动跑完,<br />付款留给人。</h1>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">采购管理</span></div>
          <div className="prose reveal" style={{ marginTop: 32 }}>
            <p>物料什么时候该补、补多少、从哪里买更划算，过去依赖各点位上报和人工比价。</p>
            <p>我们让系统主动盘点库存、判断是否需要补货、走完审批，并在 1688、京东等渠道比对物料价格，生成采购申请直至下单。付款这一步，仍然留给人。</p>
          </div>
        </div>
      </section>

      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的补货,<br />让系统跑到下单前。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
