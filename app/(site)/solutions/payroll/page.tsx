import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "人员薪酬管理 · 智能体解决方案 — 启盟科技",
  description:
    "一线员工的薪酬建立在考勤、工时、请假与达标数据之上。我们让这些数据在服务过程中自然产生并实时归集,薪酬成为它的直接结果,而不是月底重新拼凑的一笔账。",
};

export default function Page() {
  return (
    <main className="sol-page">
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/solutions">智能体解决方案</Link> / 人员薪酬管理</div>
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>让薪酬,<br />成为服务过程的直接结果。</h1>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">人员薪酬管理</span></div>

          <div className="sol-chips reveal">
            <span className="c">考勤</span><span className="c">工时</span><span className="c">请假</span><span className="c">达标</span>
          </div>

          <div className="sol-body reveal">
            <p>一线员工的薪酬，建立在考勤、工时、请假与达标数据之上。这些数据来自不同的人和环节，汇总、核对、计算是每个月都要重做一遍的工作。</p>
            <p>我们让这些数据在服务过程中自然产生并实时归集，薪酬成为它的直接结果，而不是月底重新拼凑的一笔账。</p>
          </div>

          <p className="sol-link reveal">它与 <Link href="/solutions/subcontract">服务分包管理</Link>，本就源自同一套记录。</p>
        </div>
      </section>

      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个月的薪酬核算,<br />跑成服务的直接结果。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
