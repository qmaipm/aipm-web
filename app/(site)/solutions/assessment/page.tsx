import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

export const metadata: Metadata = {
  title: "质量评估 Agent · 智能体解决方案 — 启盟科技",
  description:
    "质量评估 Agent 用 AI 替代人工审图质检:一线只需拍照,AI 自动识别问题、客观评分,严重问题自动调度整改,评估结果留存为数据标签助力复盘。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const feats = [
  { no: "01", title: "AI 自动审图", body: "AI 替代人工审图，审图成本大幅下降，质检不再靠人海堆。" },
  { no: "02", title: "客观评分", body: "统一标准客观打分，消除甲乙方在质量评价上的分歧。" },
  { no: "03", title: "数据可复盘", body: "每次评估留下数据标签，问题可追溯、可复盘，沉淀成资产。" },
];

const flow = [
  { no: "01", lane: "输入", title: "一线只需拍照", body: "主管按 AI 指引到风险点位，拍照上传——不用填表、不用判断。" },
  { no: "02", lane: "处理 · AI", title: "识别问题并客观评分", body: "AI 自动识别问题、按统一标准客观评分；问题严重时，自动调度人员整改。" },
  { no: "03", lane: "输出 · 留痕", title: "结果回灌复盘", body: "评分与问题留存为数据标签，回灌质量复盘与考核，过程可追溯。" },
];

const mods: [string, string][] = [
  ["设备管理系统", "人单合一的拍照抄表，现场数据随手留痕。"],
  ["多模态巡检", "AI 视觉 + IoT 联合巡检，风险点位自动识别。"],
  ["小智帮手", "一线移动端智能助手，拍照即评。"],
];

export default function Page() {
  return (
    <main className="solqa">
      {/* HERO */}
      <section className="qa-hero">
        <div className="qa-grid" aria-hidden="true" />
        <div className="wrap qa-hero-top">
          <span className="qa-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>质量评估 Agent
          </span>
          <h1 className="qa-h1">
            质检这件事，<br /><span className="grad">交给 AI 来审</span>
          </h1>
          <p className="qa-lead">
            质量评估 Agent 用 AI 替代人工审图：一线只需拍照，<b>AI 客观评分、自动整改</b>，把质检从人海战术变成可追溯的数据。
          </p>
          <div className="qa-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#flow" className="btn btn-ghost">看它怎么工作 <Arrow /></a>
          </div>
          <div className="qa-proof">
            <span>AI <b>自动审图</b></span>
            <span className="sep" />
            <span>客观<b>评分</b></span>
            <span className="sep" />
            <span>数据<b>可复盘</b></span>
          </div>
        </div>
      </section>

      {/* 它解决什么 */}
      <section className="qa-band mist">
        <div className="wrap">
          <span className="qa-eyebrow">它解决什么</span>
          <h2 className="qa-h2">让质检不再靠人海，也不再各执一词</h2>
          <p className="qa-sub">人工审图慢、成本高，甲乙方还常常在评价上扯皮。质量评估 Agent 用 AI 替代人工审图，<b>客观评分、留痕复盘</b>，把质检做成一件标准、可信的事。</p>
          <div className="qa-ladder">
            {feats.map((f) => (
              <div className="qa-step" key={f.no}>
                <span className="qa-no grad">{f.no}</span>
                <div className="qa-step-c">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 它怎么工作 · 暗场流程梯 */}
      <section className="qa-core" id="flow">
        <div className="qa-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="qa-eyebrow on-dark">它怎么工作</span>
          <h2 className="qa-h2 on-dark">拍张照进来，评分和整改出去</h2>
          <p className="qa-sub on-dark">一线只管拍照，识别、评分、整改调度都由 AI 接手。</p>
          <div className="qa-flow">
            {flow.map((s, i) => (
              <div className="qa-fstep" key={s.no} data-end={s.no === "03"}>
                <span className="qa-fno grad">{s.no}</span>
                <span className="qa-flane">{s.lane}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < flow.length - 1 && <span className="qa-farr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
          <p className="qa-verdict">一线只管拍照，<span className="grad">识别、评分、整改 AI 接手</span></p>
        </div>
      </section>

      {/* 系统图 */}
      <section className="qa-band">
        <div className="wrap">
          <span className="qa-eyebrow">系统总览</span>
          <h2 className="qa-h2">质量评估 Agent 的系统图</h2>
          <div className="qa-shots">
            <figure className="qa-shot">
              <div className="qa-shot-frame">
                <Image
                  src="/images/qa-app.jpg"
                  alt="AI 巡查助理 · 一线拍照打分"
                  width={1080}
                  height={2373}
                  quality={92}
                  sizes="320px"
                  className="qa-shot-img"
                />
              </div>
              <figcaption>一线现场端：拍照即打分，巡检无压力。</figcaption>
            </figure>
            <figure className="qa-shot">
              <div className="qa-shot-frame">
                <Image
                  src="/images/qa-system.png"
                  alt="质量评估 Agent 系统图"
                  width={1345}
                  height={1640}
                  quality={92}
                  sizes="480px"
                  className="qa-shot-img"
                />
              </div>
              <figcaption>从拍照采集到 AI 识别评分、自动整改与数据留存的完整链路。</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 关联产品 */}
      <section className="qa-band mist">
        <div className="wrap">
          <span className="qa-eyebrow">它挂着哪些产品能力</span>
          <h2 className="qa-h2">背后是这些产品模块</h2>
          <div className="qa-mods">
            {mods.map(([t, d]) => (
              <Link className="qa-mod" href="/products/fmclaw" key={t}>
                <span className="qa-mod-k" />
                <h3>{t}</h3>
                <p>{d}</p>
              </Link>
            ))}
          </div>
          <p className="qa-foot">
            <Link href="/agents" className="qa-link">回到四 Agent 闭环总览 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的质检，交给 AI 审一遍</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
