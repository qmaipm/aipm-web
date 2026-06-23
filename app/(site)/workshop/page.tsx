import Link from "next/link";
import "./page.css";
import WorkshopForm from "./WorkshopForm";

const ArrowR = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowD = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const steps = [
  { no: "01", h: "把问题说清楚", p: "你带来一件真实业务，我们一起把它说成一句话。" },
  { no: "02", h: "接上数据与工具", p: "把你的数据接进来，钉钉 / 飞书 / 企微 / ERP 一并打通，约 72 小时内可调用。" },
  { no: "03", h: "现场拼出 Agent", p: "当着你的面，把能帮上这件事的 Agent 搭起来。" },
  { no: "04", h: "跑通，并留给你", p: "用你的真实流程跑一遍，跑通的东西留下来继续用。" },
];

const scenes = [
  {
    href: "/scenarios/utility-bill",
    h: "水电费审批",
    p: "签字那一刻，AI 已核完表、做完环比同比、标好异常，给出该签 / 不该签的依据。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M13 2L4 14h7l-1 8 9-12h-7z" strokeLinejoin="round" /></svg>
    ),
  },
  {
    href: "/scenarios/repair-bot",
    h: "报修智能客服",
    p: "平台 Bot 7×24 守群不漏单，FMClaw 自动派单不到 1 分钟，下单人与接单人双向通知闭环。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    href: "/scenarios/exec-query",
    h: "管理层问询",
    p: "领导在钉钉里 @ 一句“A 楼上月能耗为什么超标”，AI 秒级给出带原因的回答与简报。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 3a9 9 0 1 0 4 17l5 1-1.3-4.5A9 9 0 0 0 12 3z" strokeLinejoin="round" /><path d="M12 8a2.5 2.5 0 0 0-2.5 2.5c0 1.5 2.5 2 2.5 3.5" strokeLinecap="round" /><circle cx="12" cy="17" r=".6" fill="currentColor" /></svg>
    ),
  },
  {
    href: "/scenarios/reconciliation",
    h: "AI 对账",
    p: "按合同自动核量、对比历史与市场、圈出异常、生成账单草稿，人只需确认或驳回。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" /></svg>
    ),
  },
  {
    href: "/scenarios/inspection",
    h: "AI 质检",
    p: "工单照片 / 视频自动采集，AI 视觉按统一标准评分打标，全量留痕证据链，人只看异常。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M3 7h3l2-2h8l2 2h3v12H3z" strokeLinejoin="round" /><circle cx="12" cy="13" r="3.2" /></svg>
    ),
  },
  {
    href: "/scenarios/dispatch",
    h: "智能派单",
    p: "工单进来自动定位、定级，按技能与负载派给合适的人，超时自动升级，人只需确认或改派。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="12" cy="18" r="2.4" /><path d="M6 8.4v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3M12 13.4v2.2" strokeLinecap="round" /></svg>
    ),
  },
];

const takeaways = [
  { h: "一个还在运行的 Agent", p: "不是演示版，是接着你真实数据继续跑的那一个。" },
  { h: "一份能复用的工作流", p: "这次跑通的路径，下个项目可以照着搬。" },
  { h: "一套共同语言", p: "中高管与一线，对“AI 到底帮上了什么”对齐了说法。" },
];

const why = [
  { h: "带上真问题", p: "从你真正犯难的那件事开始，不从模板开始。" },
  { h: "用上真数据", p: "用你的数据跑，结果才是你的结果。" },
  { h: "当面搭出来", p: "Agent 在你眼前长出来，你看得见每一步。" },
  { h: "跑你的流程", p: "在你真实的业务流里跑通，不是沙盘演练。" },
  { h: "留下能用的东西", p: "结束时带走的是成果，不是一份 PPT。" },
  { h: "对齐一套语言", p: "决策层与执行层，从此说同一件事。" },
];

const who = [
  { role: "业主 · 行政", p: "管着一批楼宇或园区，想从一件真实业务开始用 AI。" },
  { role: "物业 · FM 公司", p: "想把一项服务接进 AI，看看交付能变成什么样。" },
  { role: "政府 · 国企平台", p: "在为本地引入人工智能产业，想先看它真的怎么落。" },
  { role: "开发者 · 集成商", p: "常年做智慧楼宇 / 园区，想拿到一套能直接交付的基座。" },
];

const faqs = [
  { q: "我的数据不干净、不齐整，还能来吗?", a: "能。真实数据本来就不干净。把它原样带来，整理是加速营的一部分。" },
  { q: "一定要带能拍板的人吗?", a: "最好。能拍板的人和真正在一线干活的人都在场，结论才落得下去。" },
  { q: "这跟看一场 PPT、听一次案例分享有什么不同?", a: "不一样。这里不讲产品参数，只用你的数据跑你的问题。离开时你带走的是一个还在运行的 Agent，不是一份材料。" },
  { q: "结束之后，搭出来的东西归谁?", a: "归你。跑通的工作流和你自己的数据都留在你这边。" },
  { q: "我需要提前准备什么?", a: "一个真问题、它的真实数据，以及一两位真正了解这件事的人。其余我们带来。" },
  { q: "数据保密怎么保障?", a: "可在开始前签保密协议，数据处理范围与去向都会写清楚。" },
  { q: "1–3 天真的够吗?", a: "够跑通一个真实问题。它不是把所有事做完，而是让你亲眼确认这条路走得通。" },
];

export default function Page() {
  return (
    <main className="solws">
      {/* HERO */}
      <section className="ws-hero">
        <div className="ws-grid" aria-hidden="true" />
        <div className="wrap ws-hero-top">
          <span className="ws-kicker">
            <Link href="/products/fmclaw">FMClaw™ 平台</Link>
            <i>/</i>加速营 · Bootcamp
          </span>
          <h1 className="ws-h1">
            把你自己的 AI，<span className="grad">亲手搭出来</span>
          </h1>
          <p className="ws-lead">
            用 <b>1–3 天</b>，带着你的一个真问题来。我们一起把它跑通——<b>跑通的东西，留给你</b>。
          </p>
          <div className="ws-cta">
            <a href="#signup" className="btn btn-primary">预约 FMClaw™ 加速营 <ArrowR /></a>
            <a href="#how" className="btn btn-ghost">看四步怎么走 <ArrowD /></a>
          </div>
          <div className="ws-proof">
            <span><b>1–3 天</b>跑通</span>
            <span className="sep" />
            <span>带<b>真问题 + 真数据</b></span>
            <span className="sep" />
            <span><b className="grad">跑通的东西留给你</b></span>
          </div>
        </div>
      </section>

      {/* SOUL PREMISE */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">灵魂前提</span>
          <h2 className="ws-h2">前提只有一个</h2>
          <div className="ws-premise">
            <div className="ws-pcard">
              <span className="ws-pic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M9.2 9.2a2.8 2.8 0 0 1 5.4 1c0 1.8-2.6 2.4-2.6 3.6" /><circle cx="12" cy="17.4" r=".6" fill="currentColor" /></svg>
              </span>
              <div className="ws-pbig">一个你真正头疼的业务问题</div>
              <p>不是设想出来的题目，是这个月真的让你犯难的那件事。</p>
            </div>
            <div className="ws-pcard">
              <span className="ws-pic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" /><path d="M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" /></svg>
              </span>
              <div className="ws-pbig">这个问题的真实数据</div>
              <p>表格、PDF、IoT、聊天记录都行。有数据，AI 才有得想。</p>
            </div>
          </div>
          <p className="ws-verdict light">没有这两样，就不是 <span className="grad">FMClaw™ 加速营</span>。</p>
        </div>
      </section>

      {/* FOUR STEPS · 深色签名时刻 */}
      <section className="ws-core" id="how">
        <div className="ws-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ws-eyebrow on-dark">你会经历什么</span>
          <h2 className="ws-h2 on-dark">四步，从一个问题到一个能用的 Agent</h2>
          <div className="ws-steps">
            {steps.map((s, i) => (
              <div className="ws-step" key={s.no} data-end={s.no === "04"}>
                <div className="ws-sno grad">{s.no}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
                {i < steps.length - 1 && <span className="ws-sarr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 适用场景 */}
      <section className="ws-band" id="scenes">
        <div className="wrap">
          <span className="ws-eyebrow">适用场景</span>
          <h2 className="ws-h2">不知道带什么问题来？这些是大家最常带来的</h2>
          <p className="ws-sub">这些场景不是我们替你想象出来的——你带上自己的数据，我们当场把它跑通。</p>
          <div className="ws-scenes">
            {scenes.map((s) => (
              <Link className="ws-scene" href={s.href} key={s.href}>
                <span className="ws-scene-ic">{s.icon}</span>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
                <span className="ws-go">看这个场景 <ArrowR s={12} /></span>
              </Link>
            ))}
          </div>
          <p className="ws-verdict light">你的问题不在这几个里？正好，那更值得来跑一次。</p>
        </div>
      </section>

      {/* WHAT YOU TAKE AWAY */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">你会带走什么</span>
          <h2 className="ws-h2">离开时，东西在你手上</h2>
          <div className="ws-take">
            {takeaways.map((t, i) => (
              <div className="ws-tcard" key={t.h}>
                <span className="ws-tno grad">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">为什么有效</span>
          <h2 className="ws-h2">它不靠讲，靠做</h2>
          <div className="ws-why">
            {why.map((w) => (
              <div className="ws-w" key={w.h}>
                <h4>{w.h}</h4>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO SHOULD COME */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">谁适合来</span>
          <h2 className="ws-h2">带得动决定、也带得来数据的人</h2>
          <div className="ws-who">
            {who.map((w) => (
              <div className="ws-rcard" key={w.role}>
                <span className="ws-role">{w.role}</span>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNUP FORM */}
      <section className="ws-band" id="signup">
        <div className="wrap">
          <span className="ws-eyebrow">预约</span>
          <h2 className="ws-h2">把你的问题先告诉我们</h2>
          <p className="ws-sub">我们会先看一眼这个问题适不适合做加速营，再和你约时间。</p>
          <WorkshopForm />
        </div>
      </section>

      {/* TIME & FEE */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">关于时间与费用</span>
          <p className="ws-fee">加速营为期 1–3 天，费用提前收取。如果之后进入正式合作，这笔费用可按比例抵扣。我们更在意的是，这几天里你是否真的带走了能用的东西。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">常见疑问</span>
          <h2 className="ws-h2">来之前，你可能想问的</h2>
          <div className="ws-faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                </summary>
                <div className="ans">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带上一个真问题，<br />1–3 天把它跑通</h2>
          <p className="reveal">从你这个月最头疼的那件事开始。</p>
          <div className="cta-row reveal">
            <a href="#signup" className="btn btn-primary">预约 FMClaw™ 加速营 <ArrowR s={16} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
