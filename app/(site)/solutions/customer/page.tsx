import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "客户服务 · 智能体解决方案 — 启盟科技",
  description:
    "业主和租户的诉求往往散落在各个微信群里。我们在群里配一个随时应答的助手,即时答复并直接发起工单、报修、查账、派保养,把对话变成动作。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const steps = [
  {
    no: "01",
    tag: "受理",
    title: "发起工单",
    body: "一句模糊的描述，自动归类、定位点位、派给对应的人，从群里直接生成可追踪的工单。",
  },
  {
    no: "02",
    tag: "报修",
    title: "报修与派保养",
    body: "设备故障即时报修、保养计划按时触发，业主不必记得流程，助手替他把单子开到位。",
  },
  {
    no: "03",
    tag: "查账",
    title: "查账与催办",
    body: "账单疑问当场说清、催办进度随时可问，省去层层转述，对话本身就是服务入口。",
  },
];

export default function Page() {
  return (
    <main className="solcu">
      {/* HERO */}
      <section className="cu-hero">
        <div className="cu-grid" aria-hidden="true" />
        <div className="wrap cu-hero-top">
          <span className="cu-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>客户服务
          </span>
          <h1 className="cu-h1">
            每一条诉求，即时接住，<br /><span className="grad">落成动作</span>
          </h1>
          <p className="cu-lead">
            业主和租户的诉求，往往<b>散落在各个微信群里</b>——一句话的报修、一个账单的疑问、一次催办的提醒。
          </p>
          <div className="cu-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#acts" className="btn btn-ghost">看四类动作 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* them vs us */}
      <section className="cu-band mist">
        <div className="wrap">
          <span className="cu-eyebrow">客户服务</span>
          <h2 className="cu-h2">把散在群里的诉求，接成系统里的动作</h2>
          <div className="cu-versus">
            <div className="cu-vs them">
              <span className="cu-vs-tag">过去</span>
              <p className="cu-vs-line">诉求散在群里</p>
              <p className="cu-vs-sub">一句话的报修、一个账单的疑问、一次催办，散落在各个微信群里，层层转述，容易漏。</p>
            </div>
            <div className="cu-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="cu-vs us">
              <span className="cu-vs-tag">群里的助手</span>
              <p className="cu-vs-line">对话直接变成动作</p>
              <p className="cu-vs-sub">为每位用户保留各自的服务上下文，不止于答复，更把一句话的诉求接成系统里的动作，把反馈沉淀成数据。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 一次对话能做四类事 · 能力梯 */}
      <section className="cu-band" id="acts">
        <div className="wrap">
          <span className="cu-eyebrow">一次对话</span>
          <h2 className="cu-h2">一次对话里，它能做四类事</h2>
          <p className="cu-sub">在群里配一个随时应答的助手，即时答复，并把对话直接接成可追踪的动作。</p>

          <div className="cu-ladder">
            {steps.map((s) => (
              <div className="cu-step" key={s.no}>
                <div className="cu-step-k">
                  <span className="cu-no grad">{s.no}</span>
                  <span className="cu-step-tag">{s.tag}</span>
                </div>
                <div className="cu-step-c">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="cu-verdict">每位用户，都有一个属于自己的服务入口，把<span className="grad">对话直接变成动作</span></p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你的一个真实群，接上随时应答的助手</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
