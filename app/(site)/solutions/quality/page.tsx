import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import SeoFaq from "@/components/SeoFaq";

export const metadata: Metadata = {
  title: "服务质量管理 · 智能体解决方案 — 启盟科技",
  description:
    "服务质量靠一套体系管出来:过程管控、智能调度、质量评估、考核机制四个维度,由运营管理 Agent 与质量评估 Agent 两大 Agent 协作,把质量从事后打分变成全程在管。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 运营管理 Agent / 质量评估 Agent 图标(取自 /agents 的 AgentShowcase)
const IconOps = () => (
  <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" fill="currentColor" /><path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);
const IconQuality = () => (
  <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.5 12L10.5 14L15.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
// 考核(管理手段)图标:带勾的考核单
const IconAssess = () => (
  <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M9 3.5h6V6H9z" fill="currentColor" /><path d="M8.5 13l2 2 4-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// 要求卡图标:传感器信号 / 管理滑块 / 指标柱状图(Lucide 风格内联 SVG)
const IconSensor = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" /></svg>
);
const IconSliders = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="7" rx="1" /><rect x="12" y="7" width="3" height="11" rx="1" /><rect x="17" y="4" width="3" height="14" rx="1" /></svg>
);

const reqs = [
  { tag: "传感器到位", body: "空间传感器 + 智能工牌,在场与服务执行情况自动采集,不靠人工填报。", icon: <IconSensor />, href: "/products/iot", linkText: "查看 IoT 平台" },
  { tag: "管理动作跟上", body: "主管按 AI 指引去现场检查、拍照,严重问题进整改闭环——动作要真的做。", icon: <IconSliders />, href: undefined, linkText: undefined },
  { tag: "指标与考核挂钩", body: "工作量与工作质量都进考核,落到外包与员工头上,方案才推得动。", icon: <IconChart />, href: undefined, linkText: undefined },
];

export default function Page() {
  return (
    <main className="solq">
      {/* HERO */}
      <section className="sq-hero">
        <div className="sq-grid" aria-hidden="true" />
        <div className="wrap sq-hero-top">
          <span className="sq-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>服务质量管理
          </span>
          <h1 className="sq-h1">
            服务质量，靠体系<br /><span className="grad">管出来</span>
          </h1>
          <p className="sq-lead">
            质量不是靠事后抽查打分打出来的。我们用<b>过程管控、智能调度、质量评估、考核机制</b>四个维度，两个 Agent 协作，把它系统地管起来。
          </p>
          <div className="sq-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#system" className="btn btn-ghost">看四个维度 <Arrow /></a>
          </div>
          <div className="sq-proof">
            <span>四个<b>维度</b></span>
            <span className="sep" />
            <span>两个 Agent<b>协作</b></span>
            <span className="sep" />
            <span><b className="grad">传感器 + 考核</b>挂钩</span>
          </div>
        </div>
      </section>

      {/* 它解决什么 */}
      <section className="sq-band mist">
        <div className="wrap">
          <span className="sq-eyebrow">它解决什么</span>
          <h2 className="sq-h2">质量不是抽查出来的，是管出来的</h2>
          <p className="sq-sub sq-sub-1">抽查只能发现问题，而且发现时往往已经发生。质量不该是事后打分，而该是一件<b>全程在管</b>的事。</p>
          <div className="sq-shift">
            <div className="sq-shift-card from">
              <span className="sq-shift-lbl">过去 · 抽查</span>
              <p>抽样、滞后。等发现问题，往往已经发生了。</p>
            </div>
            <span className="sq-shift-arr" aria-hidden="true">→</span>
            <div className="sq-shift-card to">
              <span className="sq-shift-lbl">现在 · 全程在管</span>
              <p>覆盖全员全程，对着数据评判，问题躲不掉、能追溯、能整改。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 两个 Agent × 四个维度 · 暗场签名段 */}
      <section className="sq-core" id="system">
        <div className="sq-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="sq-eyebrow on-dark">两个 Agent 协作</span>
          <h2 className="sq-h2 on-dark">两个 Agent 管质量，一套考核来落地</h2>
          <p className="sq-sub on-dark">过程管控、智能调度、质量评估三个维度交给两个 Agent；再把工作量与质量结合成一套考核，把方案落到人员和供应商头上。</p>

          <div className="sq-agents">
            <Link className="sq-agent" href="/solutions/operations">
              <div className="sq-agent-h"><span className="sq-aicon"><IconOps /></span>运营管理 Agent</div>
              <div className="sq-dim">
                <span className="sq-dno grad">01</span>
                <div className="sq-dim-c"><span className="sq-dtag">过程管控</span><p>传感器无感式感知服务完成情况，确保有人来，服务有人做。</p></div>
              </div>
              <div className="sq-dim">
                <span className="sq-dno grad">02</span>
                <div className="sq-dim-c"><span className="sq-dtag">智能调度</span><p>AI 自动识别质量风险点位并整体调度，项目经理只做审核，不用自己盯着派。</p></div>
              </div>
              <span className="sq-alink">了解运营管理 Agent <Arrow s={13} /></span>
            </Link>

            <span className="sq-handoff" aria-hidden="true">→</span>

            <Link className="sq-agent" href="/solutions/assessment">
              <div className="sq-agent-h"><span className="sq-aicon"><IconQuality /></span>质量评估 Agent</div>
              <div className="sq-dim">
                <span className="sq-dno grad">03</span>
                <div className="sq-dim-c"><span className="sq-dtag">质量评估</span><p>主管按 AI 指引到风险点位，只需拍照，AI 自动识别问题；问题严重时，AI 自动调度人员整改。</p></div>
              </div>
              <span className="sq-alink">了解质量评估 Agent <Arrow s={13} /></span>
            </Link>

            <span className="sq-handoff" aria-hidden="true">→</span>

            <div className="sq-agent">
              <div className="sq-agent-h"><span className="sq-aicon"><IconAssess /></span>管理动作</div>
              <div className="sq-dim">
                <span className="sq-dno grad">04</span>
                <div className="sq-dim-c">
                  <span className="sq-dtag">自有员工考核</span><p>结合工作量与服务质量，对自有员工进行激励和扣罚。</p>
                  <span className="sq-dtag sq-dtag-2">外包服务考核</span><p>用同一套指标，对供应商进行激励和扣罚。</p>
                </div>
              </div>
            </div>
          </div>

          <p className="sq-verdict">从有没有人来，到干得好不好，再到该不该奖罚，<span className="grad">全程有据</span></p>
          <p className="sq-loop"><Link href="/agents">看四 Agent 闭环总览 <Arrow s={13} /></Link></p>
        </div>
      </section>

      {/* 落地前先说清楚:传感器 + 管理动作 + 考核 */}
      <section className="sq-band mist">
        <div className="wrap">
          <span className="sq-eyebrow">落地前先说清楚</span>
          <h2 className="sq-h2">它跟传感器绑在一起，也跟考核绑在一起</h2>
          <p className="sq-sub sq-sub-1">这套方案<b>与传感器紧密结合</b>，需要配套相关管理动作，并把<b>指标与考核挂钩</b>——三者都到位，服务质量才能全面提上来。</p>
          <div className="sq-reqs">
            {reqs.map((r) => {
              const inner = (
                <>
                  <span className="sq-req-k">{r.icon}</span>
                  <h3>{r.tag}</h3>
                  <p>{r.body}</p>
                  {r.href && <span className="sq-req-link">{r.linkText} <Arrow s={13} /></span>}
                </>
              );
              return r.href ? (
                <Link className="sq-req" href={r.href} key={r.tag}>{inner}</Link>
              ) : (
                <div className="sq-req" key={r.tag}>{inner}</div>
              );
            })}
          </div>
          <p className="sq-note">这是一套方法论：落地不止是上系统，还需要<b>优化组织的激励方式</b>；面向供应商时，更要对<b>原有合同做相应变更</b>。</p>
          <p className="sq-link">同一套质量数据，也支撑 <Link href="/solutions/subcontract">服务分包管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</p>
        </div>
      </section>

      <SeoFaq
        heading="服务质量管理,你可能想问"
        serviceName="服务质量管理"
        serviceDesc="把物业服务质量数据化,实现质价相符与 AI 质检。"
        items={[
          { q: "物业服务质量怎么量化考核?", a: "把“好”定义成可衡量的指标(巡检评分、服务达标率、到岗率、投诉率、响应时间),用 IoT 与智能软件实时采集并自动生成达成率报告,让质量可看、可对账。" },
          { q: "什么是 AI 质检?", a: "用 AI 对现场服务的过程数据与影像做自动核查,替代部分人工抽查,降低抽查成本、统一扣分标准,让质检更客观、更高频。" },
          { q: "“质价相符”对物业意味着什么?", a: "服务定价要与可衡量的服务质量挂钩。把质量数据化后,既能向业主说清楚钱花在哪,也能驱动服务商持续改进。" },
        ]}
      />

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的服务，<br />从在场到考核都管起来</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
