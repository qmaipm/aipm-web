import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import SeoFaq from "@/components/SeoFaq";

export const metadata: Metadata = {
  title: "成本控制 · 智能体解决方案 — 启盟科技",
  description:
    "成本控制分源头、过程、持续三个递进阶段，分别由服务设计、运营管理、服务优化三个 Agent 承担。以「产品 + 顾问服务」的形式，帮你把降本真正落到项目里。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const stages = [
  {
    no: "01",
    phase: "源头降本",
    agent: "服务设计 Agent",
    href: "/solutions/service-design",
    title: "项目启动前，做好科学规划",
    body: "用全 AI 做科学测算，在项目启动前就规划好服务频次、最优的团队与机器人编制，以及物料、工具、设备的配比——确保项目从第一天起就跑在高效模型上。",
  },
  {
    no: "02",
    phase: "过程降本",
    agent: "运营管理 Agent",
    href: "/solutions/operations",
    title: "运营起来，用最精简的管理成本",
    body: "运营过程中，由 Agent 自动完成智能调度、质量评估、工薪结算与账单处理，把日常管理的损耗压到最低，以最精简的管理成本把项目跑起来。",
  },
  {
    no: "03",
    phase: "持续降本",
    agent: "服务优化 Agent",
    href: "/solutions/optimization",
    title: "每月每季复盘，持续往下抠",
    body: "通过月度或季度复盘，持续审视运营数据，主动寻找可以精简的人员、可以替换成更优性价比的物料——让成本越跑越紧凑。",
  },
];

const compare = [
  { dim: "思路", bad: "哪里贵砍哪里，按比例减人", good: "对着真实运营数据，分三段优化" },
  { dim: "结果", bad: "砍掉的常是服务质量，投诉、返工又把成本加回来", good: "该花的花对，能省的层层省下来" },
  { dim: "之后", bad: "砍完就见底，没有下一步", good: "月度、季度复盘，越跑越紧凑" },
];

const loop = ["服务设计", "运营管理", "服务优化"];

export default function Page() {
  return (
    <main className="solco">
      {/* HERO */}
      <section className="co-hero">
        <div className="co-grid" aria-hidden="true" />
        <div className="wrap co-hero-top">
          <span className="co-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>成本控制
          </span>
          <h1 className="co-h1">
            成本控制，分三个阶段<br /><span className="grad">层层递进地降</span>
          </h1>
          <p className="co-lead">
            源头、过程、持续——三个递进的阶段，各交给一个专职 Agent。我们以<b>「产品 + 顾问服务」</b>的形式，陪你把它真正落到项目里。
          </p>
          <div className="co-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#stages" className="btn btn-ghost">看三个阶段 <Arrow /></a>
          </div>
          <div className="co-proof">
            <span>三个<b>递进阶段</b></span>
            <span className="sep" />
            <span>三个<b>专职 Agent</b></span>
            <span className="sep" />
            <span><b className="grad">产品 + 顾问服务</b>落地</span>
          </div>
        </div>
      </section>

      {/* 它解决什么 */}
      <section className="co-band mist">
        <div className="wrap">
          <span className="co-eyebrow">它解决什么</span>
          <h2 className="co-h2">降本不是裁人，是把成本拆成三个阶段</h2>
          <p className="co-sub">同样是降本，方式不同，结果差很远。</p>
          <div className="co-vs">
            <div className="co-vs-card bad">
              <div className="co-vs-hd"><span className="co-vs-badge" aria-hidden="true">✕</span>一刀切裁人</div>
              {compare.map((c) => (
                <div className="co-vs-row" key={c.dim}>
                  <span className="co-vs-dim">{c.dim}</span>
                  <span className="co-vs-tx">{c.bad}</span>
                </div>
              ))}
            </div>
            <div className="co-vs-card good">
              <div className="co-vs-hd"><span className="co-vs-badge" aria-hidden="true">✓</span>三阶段降本</div>
              {compare.map((c) => (
                <div className="co-vs-row" key={c.dim}>
                  <span className="co-vs-dim">{c.dim}</span>
                  <span className="co-vs-tx">{c.good}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 三个阶段 · 暗场签名段 */}
      <section className="co-core" id="stages">
        <div className="co-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="co-eyebrow on-dark">三个递进阶段</span>
          <h2 className="co-h2 on-dark">源头、过程、持续，每一段都有一个 Agent 盯着成本</h2>
          <p className="co-sub on-dark">三个阶段层层递进，分别由服务设计、运营管理、服务优化三个 Agent 承担。</p>

          <div className="co-stages">
            {stages.map((s, i) => (
              <div className="co-stage" key={s.no} data-end={s.no === "03"}>
                <div className="co-shead">
                  <span className="co-sno grad">{s.no}</span>
                  <span className="co-sphase">{s.phase}</span>
                </div>
                <span className="co-sagent">{s.agent}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <Link className="co-slink" href={s.href}>了解 {s.agent} <Arrow s={13} /></Link>
                {i < stages.length - 1 && <span className="co-sarr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>

          <p className="co-verdict">从第一天的编制，到每个月的复盘，<span className="grad">成本一直被盯着</span></p>
        </div>
      </section>

      {/* 怎么交付:产品 + 顾问服务 */}
      <section className="co-band">
        <div className="wrap">
          <span className="co-eyebrow">怎么交付</span>
          <h2 className="co-h2">不是给你一套软件就走</h2>
          <p className="co-sub">这套方案以<b>「产品 + 顾问服务」</b>的形式提供——产品承载能力，顾问服务负责把它落到你的项目里。</p>
          <div className="co-deliver">
            <div className="co-dcard">
              <div className="co-prod-icons">
                <span className="co-pi">
                  <span className="co-pi-ic">
                    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18" cy="6" r="3" fill="#fff" /></svg>
                  </span>
                  服务设计
                </span>
                <span className="co-pi">
                  <span className="co-pi-ic">
                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" fill="currentColor" /><path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                  运营管理
                </span>
                <span className="co-pi">
                  <span className="co-pi-ic">
                    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7" cy="14" r="1.5" fill="currentColor" /><circle cx="10" cy="11" r="1.5" fill="currentColor" /><circle cx="13" cy="14" r="1.5" fill="currentColor" /><circle cx="17" cy="10" r="1.5" fill="currentColor" /></svg>
                  </span>
                  服务优化
                </span>
              </div>
              <h3>产品</h3>
              <p>三个阶段背后的测算、调度、结算与复盘能力，都由 FMClaw™ Agent 套件承载，可调用、可追溯。</p>
            </div>
            <div className="co-dcard">
              <div className="co-expert">
                <span className="co-expert-fig" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5c0-4.2 3.4-6.8 7.5-6.8s7.5 2.6 7.5 6.8" /></svg>
                </span>
                <span className="co-expert-cap">FDE 工程师<br />到现场陪你跑通</span>
              </div>
              <h3>顾问服务</h3>
              <p>FDE 工程师到现场，带着产品对着你的真实项目把方案调通、跑顺，直到它真正在你的运营里发挥作用。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 落地前先说清楚:需要决心 */}
      <section className="co-band mist">
        <div className="wrap">
          <span className="co-eyebrow">落地前先说清楚</span>
          <h2 className="co-h2">这套方案，需要你有极大的决心，去推动这场变革</h2>
          <p className="co-sub">把这三个阶段真正落地，会改变你<b>原有的运营方法和组织架构</b>。它不是装一套系统那么简单——需要你有<b>极大的决心</b>，去推动这场变革。</p>

          <div className="co-loop">
            {loop.map((n) => (
              <span className="co-node" data-on key={n}><span className="d" />{n}</span>
            ))}
            <Link href="/agents" className="co-rt">看四 Agent 闭环总览 <Arrow s={12} /></Link>
          </div>
        </div>
      </section>

      <SeoFaq
        heading="物业降本增效,你可能想问"
        serviceName="人员成本优化"
        serviceDesc="以 AI 提升物业与设施管理的人效,从减人头转向提人效。"
        items={[
          { q: "物业怎么用 AI 做降本增效?", a: "不是简单减人,而是把工时、排班、到岗与服务结果数据化,识别低效与冗余,把人配到真正需要的地方;再用数字员工/智能体接管重复性工作,从“减人头”转向“提人效”。" },
          { q: "AI 降本会不会只是减员?", a: "不是。核心是提升人均产出,把一线从重复劳动中释放出来,转向更有价值的服务;减少的是无效工时与管理损耗,而非简单裁人。" },
          { q: "降本方案需要替换现有系统吗?", a: "不需要整体替换。可在现有考勤、工单、IoT 等数据之上接入,先用一个真实业务跑通,再逐步扩展。" },
        ]}
      />

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你的一个真实项目，<br />跑一遍三阶段降本</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
