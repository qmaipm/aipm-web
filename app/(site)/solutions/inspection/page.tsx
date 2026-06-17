import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "设备巡检管理 · 智能体解决方案 — 启盟科技",
  description:
    "设备巡检的关键,是巡到、巡实、留下真数据,这也是预测性维护的前提。我们要求人确实到达感知范围内才能填写,每一条巡检记录都真实发生。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const steps = [
  {
    no: "01",
    tag: "巡到",
    title: "人确实到达",
    body: "自动生成点位与巡检表、派发任务，并要求人确实到达感知范围内才能填写，杜绝隔空补录。",
  },
  {
    no: "02",
    tag: "巡实",
    title: "现场即时取证",
    body: "现场支持拍照评估环境、自动抄读仪表，把肉眼判断换成可回看、可比对的客观证据。",
  },
  {
    no: "03",
    tag: "真数据",
    title: "底座可信",
    body: "每一条巡检记录都真实发生，汇成一份可信的设备台账，为预测性维护提供可靠底座。",
  },
];

export default function Page() {
  return (
    <main className="solin">
      {/* HERO */}
      <section className="in-hero">
        <div className="in-grid" aria-hidden="true" />
        <div className="wrap in-hero-top">
          <span className="in-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>设备巡检管理
          </span>
          <h1 className="in-h1">
            巡到、巡实，留下<br /><span className="grad">百分之百的真数据</span>
          </h1>
          <p className="in-lead">
            设备巡检的关键，是<b>巡到、巡实、留下真数据</b>——这恰恰是人工巡检最难保证的地方。漏检和补录，会让后续的预测性维护失去基础；一条不真实的记录，比没有记录更危险。
          </p>
          <div className="in-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#ladder" className="btn btn-ghost">看三步 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* 能力梯 */}
      <section className="in-band mist" id="ladder">
        <div className="wrap">
          <span className="in-eyebrow">设备巡检管理</span>
          <h2 className="in-h2">巡到、巡实、真数据，逐级可信</h2>
          <p className="in-sub">从人到点位，到现场取证，再到一份可信的设备台账——每一步都把记录钉在真实发生上。</p>

          <div className="in-ladder">
            {steps.map((s) => (
              <div className="in-step" key={s.no}>
                <div className="in-step-k">
                  <span className="in-no grad">{s.no}</span>
                  <span className="in-step-tag">{s.tag}</span>
                </div>
                <div className="in-step-c">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 暗场签名:判词 */}
      <section className="in-core">
        <div className="in-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="in-eyebrow on-dark">为什么是真数据</span>
          <h2 className="in-h2 on-dark">一条假记录，比没有记录<span className="grad">更危险</span></h2>
          <p className="in-core-lead">漏检和补录，会让后续的预测性维护失去基础。底座一旦不可信，上面的判断、预警与维护就全是错的。</p>
          <p className="in-verdict"><span className="grad">百分之百的真实数据</span>，是一切预防的前提</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一条真实的巡检线，跑出真数据</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
