import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "人员成本优化 · 智能体解决方案 — 启盟科技",
  description:
    "人力成本占一家物业公司总开支的四到六成。我们不靠简单裁人来降本,而是从源头、过程、长期三层一起优化,把人力成本降下来。",
};

export default function Page() {
  return (
    <main className="sol-page">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/solutions">智能体解决方案</Link> / 人员成本优化</div>
          <span className="eyebrow reveal">智能体解决方案</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>人力成本,<br />从源头、过程到长期一起降。</h1>
        </div>
      </section>

      {/* 正文 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">人员成本优化</span></div>
          <div className="prose reveal" style={{ marginTop: 32 }}>
            <p>人力成本占一家物业公司总开支的四到六成。我们不靠简单裁人来降本，而是从源头、过程、长期三层一起优化。</p>
            <p>源头降本，是把人员编制设计得更科学。每个点位实际要做多少事、什么时段忙，从一开始就对照真实的服务交付量来配人，而不是凭经验给编制。</p>
            <p>过程降本，是让每一份工时都真正用在服务上。到岗、在岗时长、达标情况都看得见，工时不再被无谓地消耗。</p>
            <p>持续优化，是让好的员工留下来。结合服务质量与薪酬的数据，长期看清谁在踏实交付，队伍越跑越精。</p>
          </div>
          <p className="sol-emph reveal">同一个项目，原来六个人的岗，可能是四个人加一台机器人。</p>
          <p className="sol-link reveal">同一套服务感知数据，也支撑 <Link href="/solutions/quality">服务质量管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你的一个真实项目,<br />跑一遍成本优化。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
