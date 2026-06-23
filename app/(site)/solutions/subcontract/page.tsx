import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "服务分包管理 · 智能体解决方案 — 启盟科技",
  description:
    "出勤、服务、质量考核不再靠人一项项算。系统在多维度上自动考核,支持飞书、钉钉、企微与原有业务系统的自定义数据源,AI 结合所有数据按你的规则,通过 FMClaw 工作流自动输出服务账单。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 考核指标图标(Lucide 风格内联 SVG,白色描边置于渐变方块上)
const sIco = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconClock = () => (<svg viewBox="0 0 24 24" {...sIco}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>);
const IconPin = () => (<svg viewBox="0 0 24 24" {...sIco}><path d="M12 21s-6-5.4-6-10a6 6 0 0 1 12 0c0 4.6-6 10-6 10z" /><circle cx="12" cy="11" r="2.2" /></svg>);
const IconCheck = () => (<svg viewBox="0 0 24 24" {...sIco}><circle cx="12" cy="12" r="9" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>);
const IconClipboard = () => (<svg viewBox="0 0 24 24" {...sIco}><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M9 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3" /><path d="M9 14l2 2 4-4" /></svg>);
const IconZap = () => (<svg viewBox="0 0 24 24" {...sIco}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>);
const IconStar = () => (<svg viewBox="0 0 24 24" {...sIco}><path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21.8l1.1-6.5L2.6 10.7l6.5-.9L12 3z" /></svg>);

const metrics = [
  { t: "出勤工时", v: "182 h", icon: <IconClock /> },
  { t: "在场工时", v: "176 h", icon: <IconPin /> },
  { t: "服务签到率", v: "98.6%", icon: <IconCheck /> },
  { t: "工单及时结单率", v: "95.2%", icon: <IconClipboard /> },
  { t: "及时接单率", v: "97.4%", icon: <IconZap /> },
  { t: "服务质量评分", v: "4.6 / 5", icon: <IconStar /> },
];
const sources = ["飞书", "钉钉", "企微", "原有业务系统"];

const flow = [
  { no: "01", lane: "账单规则", title: "理清账单规则", body: "梳理现有合同的内容——合同总额、人数要求、工时要求、考核项、考核规则等，把账单规则说清楚。" },
  { no: "02", lane: "数据", title: "汇总所有数据", body: "多维度考核指标，加上飞书、钉钉、企微与原有业务系统的自定义数据源，全部汇总到一处。" },
  { no: "03", lane: "输出", title: "自动出账单", body: "AI 按规则结合所有数据计算，通过 FMClaw 的工作流自动输出对应的服务账单。" },
];

export default function Page() {
  return (
    <main className="solsc">
      {/* HERO */}
      <section className="sc-hero">
        <div className="sc-grid" aria-hidden="true" />
        <div className="wrap sc-hero-top">
          <span className="sc-kicker">
            <Link href="/solutions">智能体解决方案</Link>
            <i>/</i>服务分包管理
          </span>
          <h1 className="sc-h1">
            考核规则说清楚，<br /><span className="grad">账单 AI 自动出</span>
          </h1>
          <p className="sc-lead">
            出勤、服务、质量考核不再靠人一项项算，自动计算考核结果数据，通过 FMClaw 工作流<b>自动输出服务账单</b>。
          </p>
          <div className="sc-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#flow" className="btn btn-ghost">看它怎么算 <Arrow /></a>
          </div>
          <div className="sc-proof">
            <span>多维度<b>考核</b></span>
            <span className="sep" />
            <span>自定义<b>数据源</b></span>
            <span className="sep" />
            <span>账单<b className="grad">自动输出</b></span>
          </div>
        </div>
      </section>

      {/* 它解决什么:过去 vs 现在 */}
      <section className="sc-band mist">
        <div className="wrap">
          <span className="sc-eyebrow">它解决什么</span>
          <h2 className="sc-h2">考核与账单，从一堆人手算到系统自动出</h2>
          <div className="sc-versus">
            <div className="sc-vs them">
              <span className="sc-vs-tag">过去</span>
              <p className="sc-vs-line">考核全靠人算</p>
              <p className="sc-vs-sub">出勤数据、服务数据、质量考核都要人来做，统计周期长、易出错，得 5–6 个岗位的人协同才干得下来。</p>
            </div>
            <div className="sc-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="sc-vs us">
              <span className="sc-vs-tag">现在 · 系统 + AI</span>
              <p className="sc-vs-line">系统算，AI 出账单</p>
              <p className="sc-vs-sub">系统在多维度上自动考核，AI 结合所有数据按你的规则计算，通过 FMClaw 工作流自动输出服务账单。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 多维度考核 + 自定义数据源 */}
      <section className="sc-band">
        <div className="wrap">
          <span className="sc-eyebrow">多维度考核</span>
          <h2 className="sc-h2">考核维度，系统自动算</h2>
          <p className="sc-sub">系统内置多维度考核指标，覆盖出勤、在场、签到、接单、结单到质量评分。</p>
          <div className="sc-metrics">
            {metrics.map((m) => (
              <div className="sc-metric" key={m.t}>
                <span className="sc-metric-ic">{m.icon}</span>
                <div className="sc-metric-c">
                  <span className="sc-metric-t">{m.t}</span>
                  <span className="sc-metric-v grad">{m.v}</span>
                </div>
              </div>
            ))}
          </div>

          <Link className="sc-sources" href="/products/collaboration">
            <div className="sc-sources-h">
              <h3>嵌入自定义数据源</h3>
              <p>需要更多维度？接入自定义数据源补充考核内容，覆盖到这些渠道：</p>
              <span className="sc-source-link">第三方平台 AI 协同，了解更多 <Arrow s={13} /></span>
            </div>
            <div className="sc-source-chips">
              {sources.map((s) => (
                <span className="sc-source" key={s}>{s}</span>
              ))}
            </div>
          </Link>

          <p className="sc-link">同一套考核数据，也支撑 <Link href="/solutions/quality">服务质量管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</p>
        </div>
      </section>

      {/* FMClaw 工作流 · 暗场签名段 */}
      <section className="sc-core" id="flow">
        <div className="sc-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="sc-eyebrow on-dark">FMClaw 工作流</span>
          <h2 className="sc-h2 on-dark">描述好规则，账单 AI 来出</h2>
          <p className="sc-sub on-dark">AI 结合所有数据与考核，通过 FMClaw 的工作流，高效自动化地输出服务账单。</p>
          <div className="sc-flow">
            {flow.map((s, i) => (
              <div className="sc-fstep" key={s.no} data-end={s.no === "03"}>
                <span className="sc-fno grad">{s.no}</span>
                <span className="sc-flane">{s.lane}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < flow.length - 1 && <span className="sc-farr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
          <p className="sc-verdict on-dark">你只需把考核规则说清楚，<span className="grad">账单 AI 自动出</span></p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的分包考核，<br />交给 AI 出账单</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
