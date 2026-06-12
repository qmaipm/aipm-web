import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "客户服务 · 智能体解决方案 — 启盟科技",
  description:
    "业主和租户的诉求往往散落在各个微信群里。我们在群里配一个随时应答的助手,即时答复并直接发起工单、报修、查账、派保养,把对话变成动作。",
};

export default function Page() {
  return (
    <main className="sol-page">
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/solutions">智能体解决方案</Link> / 客户服务</div>
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>每一条诉求,<br />即时接住,落成动作。</h1>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">客户服务</span></div>
          <p className="sol-lead reveal">业主和租户的诉求，往往<span className="em">散落在各个微信群里</span>——一句话的报修、一个账单的疑问、一次催办的提醒。</p>

          <div className="sol-body reveal">
            <p>我们在群里配一个随时应答的助手，为每位用户保留各自的服务上下文。它能即时答复，也能直接发起工单、报修、查账、派保养，把对话变成动作，把反馈沉淀成数据。</p>
          </div>

          <div className="sol-chips reveal">
            <span className="c">发起工单</span><span className="c">报修</span><span className="c">查账</span><span className="c">派保养</span>
          </div>

          <p className="sol-emph reveal">每位用户，都有一个属于自己的服务入口。</p>
        </div>
      </section>

      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你的一个真实群,<br />接上随时应答的助手。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
