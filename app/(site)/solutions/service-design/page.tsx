import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/solutions/service-design", {
  title: "服务设计 · 智能体解决方案 | 启盟科技",
  description:
    "根据项目业态、面积、设备与需求,服务设计 Agent 自动建模,给出服务标准、人员编制和预算——每一笔都标着数据来源。约 30 分钟给出一版可讨论的方案底稿。",
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
    title: "项目基础信息",
    body: "业态、管理面积与楼栋、关键服务空间、主要设备清单；可选填现有人员合同与服务周期。",
  },
  {
    no: "02",
    lane: "处理 · AI",
    title: "约 30 分钟自动建模",
    body: "调用行业知识与项目数据，完成服务标准制定、人员编制测算与预算拆解。",
  },
  {
    no: "03",
    lane: "输出",
    title: "三份可执行方案",
    body: "服务标准体系、人员编制方案、预算明细表——每笔支出标注数据来源，可直接进入运营。",
  },
];

const loop = ["服务设计", "运营管理", "质量评估", "服务优化"];

export default function ServiceDesignPage() {
  return (
    <main className="solsd">
      {/* HERO */}
      <section className="sd-hero">
        <div className="sd-grid" aria-hidden="true" />
        <div className="wrap sd-hero-top">
          <span className="sd-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>服务设计
          </span>
          <h1 className="sd-h1">
            录入项目信息，<br /><span className="grad">输出一套可执行的服务方案</span>
          </h1>
          <p className="sd-lead">
            根据项目业态、面积、设备与需求，服务设计 Agent 自动建模，给出<b>服务标准、人员编制和预算</b>——每一笔都标着数据来源。
          </p>
          <div className="sd-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#flow" className="btn btn-ghost">看它怎么工作 <Arrow /></a>
          </div>
        </div>
        <div className="wrap">
          <div className="sd-proof">
            <span>服务<b>标准</b></span>
            <span className="sep" />
            <span>人员<b>编制</b></span>
            <span className="sep" />
            <span>预算<b>明细</b></span>
            <span className="sep" />
            <span>约 <b className="grad">30 分钟</b>出底稿</span>
          </div>
        </div>
      </section>

      {/* them vs us */}
      <section className="sd-band mist">
        <div className="wrap">
          <span className="sd-eyebrow">它解决什么</span>
          <h2 className="sd-h2">从顾问的几天，缩到自动建模的半小时</h2>
          <p className="sd-sub">
            服务标准制定、人员编制、预算测算，过去高度依赖<b>顾问经验</b>——一个项目要反复打磨很多天，做法还常常因人而异。
          </p>
          <div className="sd-versus">
            <div className="sd-vs them">
              <span className="sd-vs-tag">过去</span>
              <p className="sd-vs-line">顾问经验驱动</p>
              <p className="sd-vs-sub">一个项目反复打磨很多天，结论还常因人而异。</p>
            </div>
            <div className="sd-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="sd-vs us">
              <span className="sd-vs-tag">现在</span>
              <p className="sd-vs-line">真实数据建模</p>
              <p className="sd-vs-sub">基于真实数据建模，约 30 分钟给出一版可讨论的方案底稿。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 它怎么工作 · 流程梯（暗场签名段） */}
      <section className="sd-core" id="flow">
        <div className="sd-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="sd-eyebrow on-dark">它怎么工作</span>
          <h2 className="sd-h2 on-dark">输入项目信息，输出三份方案</h2>
          <p className="sd-sub on-dark">中间这段建模，过去是顾问的几天，现在交给 Agent。</p>

          <div className="sd-flow">
            {flow.map((s, i) => (
              <div className="sd-fstep" key={s.no} data-mid={s.no === "02"}>
                <span className="sd-fno grad">{s.no}</span>
                <span className="sd-flane">{s.lane}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < flow.length - 1 && <span className="sd-farr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>

          <p className="sd-verdict">过去依赖顾问经验的三件事，现在基于真实数据，<span className="grad">半小时给出一版可讨论的底稿</span></p>
        </div>
      </section>

      {/* 关联产品能力 */}
      <section className="sd-band">
        <div className="wrap">
          <span className="sd-eyebrow">它挂着哪些产品能力</span>
          <h2 className="sd-h2">背后是这些产品模块</h2>
          <div className="sd-mods">
            <Link className="sd-mod" href="/products/fmclaw">
              <span className="sd-mod-k" />
              <h3>空间管理系统</h3>
              <p>承载业态、面积、楼栋与服务空间的结构化底数。</p>
            </Link>
            <Link className="sd-mod" href="/products/fmclaw">
              <span className="sd-mod-k" />
              <h3>服务配置系统</h3>
              <p>服务标准与流程在此沉淀、复用与下发。</p>
            </Link>
            <Link className="sd-mod" href="/products/fmclaw">
              <span className="sd-mod-k" />
              <h3>API 开放平台</h3>
              <p>方案数据可对接外部系统，标准不被锁在一处。</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 放进闭环 */}
      <section className="sd-band mist">
        <div className="wrap">
          <span className="sd-eyebrow">放进闭环</span>
          <h2 className="sd-h2">服务设计是闭环的起点</h2>
          <p className="sd-sub">它输出的标准会被运营管理每天执行，也会在末端被服务优化回灌改写。</p>
          <div className="sd-loop">
            {loop.map((n, i) => (
              <span className="sd-node" data-on={i === 0} key={n}>
                <span className="d" />{n}
              </span>
            ))}
            <span className="sd-rt">↻ 回灌服务设计</span>
          </div>
          <p className="sd-foot">
            <Link href="/agents" className="sd-link">回到物业管理智能体矩阵 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 真实产品界面 */}
      <section className="sd-band">
        <div className="wrap">
          <span className="sd-eyebrow">真实产品界面</span>
          <h2 className="sd-h2">方案生成界面</h2>
          <figure className="sd-shot">
            <div className="sd-shot-frame">
              <Image
                src="/images/agent-service-design.png"
                alt="服务设计 Agent 界面"
                width={3334}
                height={1644}
                className="sd-shot-img"
              />
            </div>
            <figcaption>录入项目信息，自动生成一套可执行的服务方案。</figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个真实项目，跑一次服务设计</h2>
          <p className="reveal">带上你的项目信息来，当场看它出方案。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
