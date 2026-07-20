import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/solutions/optimization", {
  title: "服务优化 · 智能体解决方案 | 启盟科技",
  description:
    "服务优化 Agent 汇总质检与运营数据,做聚类分析定位高频问题,给出改进建议,并回灌服务设计——这是闭环的收尾,也是下一轮的起点。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const flow = [
  {
    no: "01",
    lane: "输入",
    title: "全量质检与评估数据",
    body: "多模态质检照片 + AI 评估标签，来自质量评估的全量产出。",
  },
  {
    no: "02",
    lane: "处理 · AI",
    title: "AI 聚类分析",
    body: "高频问题 Top5、问题环节定位、根因关联——把零散问题归并成可改进的几条。",
  },
  {
    no: "03",
    lane: "输出",
    title: "复盘报告 + 回灌",
    body: "月度复盘报告与优化建议，回灌服务设计 Agent，形成自动进化闭环。",
  },
];

const mods = [
  ["计薪系统", "把质量结论与人效挂钩，优化落到激励上。"],
  ["数据大屏", "高频问题与趋势集中呈现，复盘有据。"],
  ["API 开放平台", "优化建议可对接外部系统，回灌不被锁死。"],
];

const loop = ["服务设计", "运营管理", "质量评估", "服务优化"];

export default function OptimizationPage() {
  return (
    <main className="solopt">
      {/* HERO */}
      <section className="ot-hero">
        <div className="ot-grid" aria-hidden="true" />
        <div className="wrap ot-hero-top">
          <span className="ot-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>服务优化
          </span>
          <h1 className="ot-h1">
            找出反复出现的问题，<br /><span className="grad">把改进写回服务标准</span>
          </h1>
          <p className="ot-lead">
            服务优化 Agent 汇总质检与运营数据，做聚类分析定位高频问题，给出改进建议，并<b>回灌服务设计</b>——这是闭环的收尾，也是下一轮的起点。
          </p>
          <div className="ot-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#flow" className="btn btn-ghost">看它怎么工作 <Arrow /></a>
          </div>
        </div>
        <div className="wrap">
          <div className="ot-proof">
            <span>聚类<b>复盘</b></span>
            <span className="sep" />
            <span>高频问题<b>定位</b></span>
            <span className="sep" />
            <span>改进<b>回灌标准</b></span>
          </div>
        </div>
      </section>

      {/* them vs us */}
      <section className="ot-band mist">
        <div className="wrap">
          <span className="ot-eyebrow">它解决什么</span>
          <h2 className="ot-h2">从凭印象复盘，到基于数据复盘</h2>
          <p className="ot-sub">
            复盘过去多<b>凭印象与个人经验</b>，反复出现的问题不易被系统性定位，改进也难沉淀成标准——现在基于数千条客观数据，复盘不再凭感觉。
          </p>
          <div className="ot-versus">
            <div className="ot-vs them">
              <span className="ot-vs-tag">过去</span>
              <p className="ot-vs-line">凭印象与经验</p>
              <p className="ot-vs-sub">凭印象与个人经验复盘，反复出现的问题难被系统定位，改进也难沉淀。</p>
            </div>
            <div className="ot-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="ot-vs us">
              <span className="ot-vs-tag">现在</span>
              <p className="ot-vs-line">基于客观数据</p>
              <p className="ot-vs-sub">基于数千条客观数据聚类复盘，优化结论自动写成新的服务标准。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 它怎么工作 · 流程梯 + 回灌（暗场签名段） */}
      <section className="ot-core" id="flow">
        <div className="ot-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ot-eyebrow on-dark">它怎么工作</span>
          <h2 className="ot-h2 on-dark">全量数据进来，复盘与回灌出去</h2>
          <p className="ot-sub on-dark">聚类分析把零散问题归并成可改进的几条。</p>

          <div className="ot-flow">
            {flow.map((s, i) => (
              <div className="ot-fstep" key={s.no} data-mid={s.no === "02"}>
                <span className="ot-fno grad">{s.no}</span>
                <span className="ot-flane">{s.lane}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < flow.length - 1 && <span className="ot-farr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>

          <div className="ot-feed">
            <span className="ot-feed-lane">↻ 回灌服务设计</span>
            <h3>验证过的改进，写回标准</h3>
            <p>服务优化的结论不停在报告里——它会被写回服务设计的基线，让下一轮设计从更好的起点开始。系统自动把优化变成新的服务标准。</p>
          </div>
        </div>
      </section>

      {/* 关联产品能力 */}
      <section className="ot-band">
        <div className="wrap">
          <span className="ot-eyebrow">它挂着哪些产品能力</span>
          <h2 className="ot-h2">背后是这些产品模块</h2>
          <div className="ot-mods">
            {mods.map(([t, d]) => (
              <Link className="ot-mod" href="/products/fmclaw" key={t}>
                <span className="ot-mod-k" />
                <h3>{t}</h3>
                <p>{d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 放进闭环 */}
      <section className="ot-band mist">
        <div className="wrap">
          <span className="ot-eyebrow">放进闭环</span>
          <h2 className="ot-h2">服务优化是收尾，也是新一轮的起点</h2>
          <p className="ot-sub">它把验证过的改进回灌服务设计，标准就此持续进化。</p>
          <div className="ot-loop">
            {loop.map((n, i) => (
              <span className="ot-node" data-on={i === 3} key={n}>
                <span className="d" />{n}
              </span>
            ))}
            <span className="ot-rt">↻ 回灌服务设计</span>
          </div>
          <p className="ot-foot">
            <Link href="/agents" className="ot-link">了解 FMClaw 的 Agentic AI 产品套件 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 真实产品界面 */}
      <section className="ot-band">
        <div className="wrap">
          <span className="ot-eyebrow">真实产品界面</span>
          <h2 className="ot-h2">月度复盘报告界面</h2>
          <figure className="ot-shot">
            <div className="ot-shot-frame">
              <Image
                src="/images/agent-optimization.png"
                alt="服务优化 Agent 界面"
                width={3328}
                height={1638}
                className="ot-shot-img"
              />
            </div>
            <figcaption>汇总质检与运营数据，找出反复出现的问题，把改进写回服务标准。</figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个月的真实数据，跑一次服务优化</h2>
          <p className="reveal">带上你的质检数据来，看 AI 怎么找出高频问题。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
