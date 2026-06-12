import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "设备巡检管理 · 智能体解决方案 — 启盟科技",
  description:
    "设备巡检的关键,是巡到、巡实、留下真数据,这也是预测性维护的前提。我们要求人确实到达感知范围内才能填写,每一条巡检记录都真实发生。",
};

export default function Page() {
  return (
    <main className="sol-page">
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/solutions">智能体解决方案</Link> / 设备巡检管理</div>
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>巡到、巡实,<br />留下百分之百的真数据。</h1>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">设备巡检管理</span></div>

          <div className="sol-chips reveal">
            <span className="c">巡到</span><span className="c">巡实</span><span className="c">留下真数据</span>
          </div>

          <div className="sol-body reveal">
            <p>设备设施的巡检，关键在于巡到、巡实、留下真数据——这恰恰是人工巡检最难保证的地方，漏检和补录会让后续的预测性维护失去基础。</p>
            <p>我们自动生成点位与巡检表、派发任务，并要求人确实到达感知范围内才能填写；现场支持拍照评估环境、自动抄读仪表。每一条巡检记录都是真实发生的，为预测性维护提供可信的底座。</p>
          </div>

          <p className="sol-emph reveal">百分之百的真实数据，是一切预防的前提。</p>
        </div>
      </section>

      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一条真实的巡检线,<br />跑出真数据。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
