import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "人员成本优化 · 智能体解决方案 — 启盟科技",
  description:
    "人力成本占一家物业公司总开支的四到六成。我们不靠简单裁人来降本,而是从源头、过程、长期三层一起优化,把人力成本降下来。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const layers = [
  {
    no: "01",
    tag: "源头降本",
    title: "把人员编制设计得更科学",
    body: "每个点位实际要做多少事、什么时段忙，从一开始就对照真实的服务交付量来配人，而不是凭经验给编制。",
  },
  {
    no: "02",
    tag: "过程降本",
    title: "让每一份工时都用在服务上",
    body: "到岗、在岗时长、达标情况都看得见，工时不再被无谓地消耗。",
  },
  {
    no: "03",
    tag: "持续优化",
    title: "让好的员工留下来",
    body: "结合服务质量与薪酬的数据，长期看清谁在踏实交付，队伍越跑越精。",
  },
];

export default function Page() {
  return (
    <main className="solco">
      {/* HERO */}
      <section className="co-hero">
        <div className="co-grid" aria-hidden="true" />
        <div className="wrap co-hero-top">
          <span className="co-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>人员成本优化
          </span>
          <h1 className="co-h1">
            人力成本，从源头、过程到<br /><span className="grad">长期一起降</span>
          </h1>
          <p className="co-lead">
            人力成本占一家物业公司总开支的<b>四到六成</b>。我们不靠简单裁人来降本，而是从源头、过程、长期三层一起优化。
          </p>
          <div className="co-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#layers" className="btn btn-ghost">看三层降本 <Arrow /></a>
          </div>
          <div className="co-proof">
            <span>人力成本占总开支<b className="grad">四到六成</b></span>
            <span className="sep" />
            <span>不靠简单<b>裁人</b>降本</span>
            <span className="sep" />
            <span>源头 · 过程 · 长期<b>三层一起</b></span>
          </div>
        </div>
      </section>

      {/* 三层降本 · 能力梯 */}
      <section className="co-band mist" id="layers">
        <div className="wrap">
          <span className="co-eyebrow">人员成本优化</span>
          <h2 className="co-h2">从源头、过程到长期，三层一起降</h2>
          <p className="co-sub">不靠简单裁人，而是把人力成本拆成三层，每一层都对着真实的服务交付量来优化。</p>

          <div className="co-ladder">
            {layers.map((l) => (
              <div className="co-step" key={l.no}>
                <div className="co-step-k">
                  <span className="co-no grad">{l.no}</span>
                  <span className="co-step-tag">{l.tag}</span>
                </div>
                <div className="co-step-c">
                  <h3>{l.title}</h3>
                  <p>{l.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="co-verdict">同一个项目，原来六个人的岗，可能是<span className="grad">四个人加一台机器人</span></p>
          <p className="co-link">同一套服务感知数据，也支撑 <Link href="/solutions/quality">服务质量管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你的一个真实项目，跑一遍成本优化</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
