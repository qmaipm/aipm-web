import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/solutions/operations", {
  title: "运营管理 · 智能体解决方案 — 启盟科技",
  description:
    "运营管理 Agent 把服务标准转成每天可执行的工作流,实时调度、自动响应异常;管理者只在交互界面里审批与确认。把每天的调度与派单,变成可追溯的实时运营。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const feats = [
  {
    no: "01",
    title: "实时调度",
    body: "巡检、保洁、维修、安防四类任务统一编排，按技能与负载实时派单。",
  },
  {
    no: "02",
    title: "异常自动升级",
    body: "超时、漏检、投诉等异常被识别后自动升级，不靠人记着去催。",
  },
  {
    no: "03",
    title: "指令可追溯",
    body: "每一条派单、每一次响应都留痕，谁去、为什么、结果如何，事后可查。",
  },
];

const flow = [
  {
    no: "01",
    lane: "输入",
    title: "服务标准 + 实时信号",
    body: "来自服务设计的标准，叠加巡检、保洁、维修、安防的实时工单与 IoT 信号。",
  },
  {
    no: "02",
    lane: "处理 · AI",
    title: "转成每日工作流并实时调度",
    body: "把标准拆成可执行可追踪的任务，按技能与负载派单，异常自动响应与升级。",
  },
  {
    no: "03",
    lane: "输出 · 人做决定",
    title: "人机管理交互界面",
    body: "管理者审批 AI 建议、查看实时数据、发出权限内指令——决定权始终在人手里。",
  },
];

const mods = [
  ["SSR 服务记录", "每一次服务都留痕，运营有据可查。"],
  ["工单调度系统", "定位、定级、派单与升级的执行底座。"],
  ["人机协同引擎", "AI 给建议、人做决定的协同机制。"],
  ["小智帮手", "一线随手可用的对话式运营助手。"],
];

const loop = ["服务设计", "运营管理", "质量评估", "服务优化"];

export default function OperationsPage() {
  return (
    <main className="solops">
      {/* HERO */}
      <section className="op-hero">
        <div className="op-grid" aria-hidden="true" />
        <div className="wrap op-hero-top">
          <span className="op-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>运营管理
          </span>
          <h1 className="op-h1">
            把每天的调度与派单，<br /><span className="grad">变成可追溯的实时运营</span>
          </h1>
          <p className="op-lead">
            运营管理 Agent 把服务标准转成每天可执行的工作流，<b>实时调度、自动响应异常</b>；管理者只在交互界面里审批与确认。
          </p>
          <div className="op-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#flow" className="btn btn-ghost">看它怎么工作 <Arrow /></a>
          </div>
        </div>
        <div className="wrap">
          <div className="op-proof">
            <span>实时<b>调度</b></span>
            <span className="sep" />
            <span>异常<b>自动升级</b></span>
            <span className="sep" />
            <span>指令<b>可追溯</b></span>
          </div>
        </div>
      </section>

      {/* 它解决什么 · 三件事 */}
      <section className="op-band mist">
        <div className="wrap">
          <span className="op-eyebrow">它解决什么</span>
          <h2 className="op-h2">把散在很多人脑子里的运营判断，变成系统</h2>
          <p className="op-sub">
            调度、派单、异常响应每天大量发生，过去靠人盯、靠电话、靠经验，运营判断<b>散在很多人脑子里</b>——出了岔子，往往事后才知道。
          </p>
          <div className="op-ladder">
            {feats.map((f) => (
              <div className="op-step" key={f.no}>
                <div className="op-step-k"><span className="op-no grad">{f.no}</span></div>
                <div className="op-step-c">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 它怎么工作 · 流程梯（暗场签名段） */}
      <section className="op-core" id="flow">
        <div className="op-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="op-eyebrow on-dark">它怎么工作</span>
          <h2 className="op-h2 on-dark">标准进来，工作流出去，人只做最后那个决定</h2>
          <p className="op-sub on-dark">对接 IoT 与工单系统，把服务标准转成每日可执行、可追踪的运营。</p>

          <div className="op-flow">
            {flow.map((s, i) => (
              <div className="op-fstep" key={s.no} data-end={s.no === "03"}>
                <span className="op-fno grad">{s.no}</span>
                <span className="op-flane">{s.lane}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < flow.length - 1 && <span className="op-farr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>

          <p className="op-verdict">派单那一刻，谁去、为什么是他、超时怎么办，<span className="grad">AI 都安排好了</span></p>
        </div>
      </section>

      {/* 关联产品能力 */}
      <section className="op-band">
        <div className="wrap">
          <span className="op-eyebrow">它挂着哪些产品能力</span>
          <h2 className="op-h2">背后是这些产品模块</h2>
          <div className="op-mods">
            {mods.map(([t, d]) => (
              <Link className="op-mod" href="/products/fmclaw" key={t}>
                <span className="op-mod-k" />
                <h3>{t}</h3>
                <p>{d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 放进闭环 */}
      <section className="op-band mist">
        <div className="wrap">
          <span className="op-eyebrow">放进闭环</span>
          <h2 className="op-h2">执行设计的标准，交给评估去打分</h2>
          <p className="op-sub">运营管理执行服务设计输出的标准，又把过程里产生的工单、照片与数据，<b>交给质量评估</b>去独立打分。</p>
          <div className="op-loop">
            {loop.map((n, i) => (
              <span className="op-node" data-on={i === 1} key={n}>
                <span className="d" />{n}
              </span>
            ))}
            <span className="op-rt">↻ 回灌服务设计</span>
          </div>
          <p className="op-foot">
            <Link href="/agents" className="op-link">回到四 Agent 闭环总览 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 真实产品界面 */}
      <section className="op-band">
        <div className="wrap">
          <span className="op-eyebrow">真实产品界面</span>
          <h2 className="op-h2">管理者的人机交互界面</h2>
          <figure className="op-shot">
            <div className="op-shot-frame">
              <Image
                src="/images/agent-operations.png"
                alt="运营管理 Agent 界面"
                width={3338}
                height={1644}
                className="op-shot-img"
              />
            </div>
            <figcaption>把每天的调度、派单、异常响应，变成可审批、可追溯的实时运营。</figcaption>
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一天的真实工单，跑一次实时运营</h2>
          <p className="reveal">带上你的运营场景来，看 Agent 怎么调度。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
