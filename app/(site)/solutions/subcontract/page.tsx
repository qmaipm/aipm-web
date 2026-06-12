import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务分包管理 · 智能体解决方案 — 启盟科技",
  description:
    "分包结算依据月度工作量与考核,需要现场核实与多方确认。我们用同一套服务感知数据记录派工、出勤、工时与达标,结算与考核都指向同一份可核验的事实。",
};

export default function Page() {
  return (
    <main className="sol-page">
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/solutions">智能体解决方案</Link> / 服务分包管理</div>
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>分包结算,<br />指向同一份可核验的事实。</h1>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">服务分包管理</span></div>
          <div className="prose reveal" style={{ marginTop: 32 }}>
            <p>物业公司常把保洁、保安、绿化等服务再分包出去。这类结算依据的是月度的工作量与考核——派了多少人、出了多少勤、达没达标，再据此核定服务费与扣减，需要经过现场核实与多方确认。</p>
            <p>我们用同一套服务感知数据，把派工、出勤、工时与达标情况实时记录下来。结算与考核都指向同一份可核验的事实，对账有据可依。</p>
          </div>
          <p className="sol-link reveal">这份数据，也是 <Link href="/solutions/quality">服务质量管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link> 共用的同一口井。</p>
        </div>
      </section>

      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的分包对账,<br />跑在同一份事实上。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
