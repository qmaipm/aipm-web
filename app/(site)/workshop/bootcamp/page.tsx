import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import RelatedReading from "../_RelatedReading";
import "../page.css";
import "../sub.css";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/workshop/bootcamp", {
  title: "加速营 · Bootcamp — 2–3 天，把你的 AI 智能体亲手搭出来 | 启盟科技",
  description:
    "它不是培训。2–3 天闭门加速营，你的团队分成 2–4 组，每组带一个真实业务问题和它的数据，在 FMClaw™ 上亲手把 AI 智能体搭起来、跑通——跑通的东西留给你。不做任何接口，免费。",
  keywords: [
    "AI加速营",
    "AI Bootcamp",
    "AI训练营",
    "AI实战营",
    "智能体搭建",
    "AI智能体工作坊",
    "企业AI内训",
    "Agent搭建",
    "企业AI落地",
    "FMClaw",
    "物业管理AI",
  ],
});

const ArrowR = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "加速营", item: `${SITE_URL}/workshop` },
      { "@type": "ListItem", position: 3, name: "加速营 · Bootcamp", item: `${SITE_URL}/workshop/bootcamp` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FMClaw™ 加速营（AI Bootcamp）",
    serviceType: "AI 加速营 / Bootcamp",
    description:
      "2–3 天闭门工作坊：客户团队分成 2–4 组（每组 4–6 人），各带一个真实业务问题与数据，在 FMClaw™ 上亲手搭建并跑通 AI 智能体，成果留给客户。不做数据接口与软件接口。免费。",
    url: `${SITE_URL}/workshop/bootcamp`,
    areaServed: "CN",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
    provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
];

/* ---------- 它不是培训 ---------- */
const diffs = [
  {
    a: "培训教方法，结束时你带走一份笔记。",
    b: "加速营解决问题，结束时你带走一个还在运行的 Agent。",
  },
  {
    a: "培训用准备好的案例，讲别人的故事。",
    b: "加速营用你自己的数据，做你自己这个月正头疼的事。",
  },
  {
    a: "培训按课表走，人人进度一致。",
    b: "加速营按问题走，每组盯着自己的问题往前推。",
  },
];

/* ---------- 四步 ---------- */
const steps = [
  {
    no: "01",
    h: "把问题说清楚",
    p: "每组带来一件真实业务，我们一起把它说成一句话：谁、在什么场景、卡在哪。",
  },
  {
    no: "02",
    h: "把数据接进来",
    p: "各组把脱敏后的数据文件导入 FMClaw™。只用导出的数据，不动你的系统、不做接口。",
  },
  {
    no: "03",
    h: "亲手拼出 Agent",
    p: "在工程师的辅导下，每组自己动手把 Agent 搭起来——是你搭的，不是我们替你搭的。",
  },
  {
    no: "04",
    h: "跑通，并留给你",
    p: "用你真实的业务数据从头到尾跑一遍。跑通的东西留下来，回去接着用。",
  },
];

/* ---------- 分组机制 ---------- */
const groupSpec = [
  { dt: "分组", dd: <><b>2–4 组，每组 4–6 人</b>。像一场小型比赛：各组带各自的问题，同场推进，互相看得见进度。</> },
  { dt: "组内配置", dd: <>每组都要有<b>懂业务的、懂数据的</b>。会不会写代码不重要，懂不懂这件事很重要。</> },
  { dt: "数据量", dd: <>可以比 Demo Day 更大——多几张表、多一些历史数据都行。但仍然<b>只用导出的数据文件，不做任何接口</b>。</> },
  { dt: "时间", dd: <><b>2–3 天闭门</b>。这几天里，关键人不接别的会——准备越足，这几天越值。</> },
];

/* ---------- 带走什么 ---------- */
const takes = [
  { no: "01", h: "一个还在运行的 Agent", p: "不是演示录屏，不是方案 PPT。是一个跑在你数据上、结束后还能继续用的智能体。" },
  { no: "02", h: "一份能复用的工作流", p: "问题怎么拆、数据怎么理、Agent 怎么搭——这套方法留在你团队手里，下个问题照着做。" },
  { no: "03", h: "一批「亲手做过」的人", p: "2–4 组人从头到尾干过一遍。回到岗位上，他们就是你的 AI 转型种子。" },
];

/* ---------- FAQ（GEO：对齐真实搜索问句） ---------- */
const faqs = [
  {
    q: "加速营和 AI 培训有什么区别？",
    a: "培训教方法、用准备好的案例，结束时你带走笔记；加速营解决问题、用你自己的真实数据，结束时你带走一个还在运行的 AI 智能体和一套能复用的工作流。我们不发课表，只盯着你的问题往前推。",
  },
  {
    q: "加速营和 Demo Day 有什么区别？",
    a: "Demo Day 是看：半天到一天，我们演示给你看，帮你确认这条路走得通；加速营是做：2–3 天，你的团队分组亲手把 Agent 搭出来。看完想动手的，来加速营。",
  },
  {
    q: "参加的人需要会写代码吗？",
    a: "不需要。FMClaw™ 上搭 Agent 靠的是把业务说清楚，不是写代码。每组需要的是懂业务的人和懂数据的人，工程问题由我们的工程师现场兜底。",
  },
  {
    q: "怎么分组？带几个问题来？",
    a: "2–4 组，每组 4–6 人，各带一个真实业务问题和它的数据。像一场小型比赛：同场推进、互相看得见进度，内部讨论也会更深入。",
  },
  {
    q: "数据量可以带多大？会做系统对接吗？",
    a: "数据量可以比 Demo Day 更大——多几张表、更长的历史周期都可以。但仍然只用脱敏导出的数据文件，不做任何数据接口和软件接口，也不动你的生产系统。接口与大数据量治理属于 FDE 服务。",
  },
  {
    q: "很多企业 AI 项目停在 PoC，加速营怎么避免？",
    a: "多数 PoC 死在两件事上：问题定义模糊，和做的人不是用的人。加速营从第一天就把问题压缩成一句话，并且让真正用它的业务团队亲手搭——搭完的 Agent 留在他们手里继续跑，而不是留在供应商的演示环境里。",
  },
  {
    q: "加速营收费吗？",
    a: "免费。我们要的是你带真问题、真实数据和对的人来。",
  },
  {
    q: "带来的业务数据怎么保密？",
    a: "带脱敏数据来；需要的话，开始前签保密协议，数据的处理范围与去向写清楚。",
  },
];

export default function Page() {
  return (
    <main className="solws">
      <JsonLd data={LD} />

      {/* HERO */}
      <section className="ws-hero has-photo">
        <div className="ws-hero__bg" style={{ backgroundImage: "url(/workshop/bootcamp-hero.jpg)" }} aria-hidden="true" />
        <div className="ws-grid" aria-hidden="true" />
        <div className="wrap ws-hero-top">
          <span className="ws-kicker">
            <Link href="/workshop">加速营</Link>
            <i>/</i>Bootcamp
          </span>
          <h1 className="ws-h1">
            两三天，把它<span className="grad">亲手搭出来</span>
          </h1>
          <p className="ws-lead">
            你的团队分成几组，各带一个真问题和它的数据来。闭门两三天，在工程师的辅导下把 Agent 搭起来、跑通——
            <b>跑通的东西，留给你。</b>
          </p>
          <div className="ws-cta">
            <Link href="/workshop?mode=bootcamp#signup" className="btn btn-primary">预约加速营 <ArrowR /></Link>
            <a href="#steps" className="btn btn-ghost">看四步怎么走 <ArrowR /></a>
          </div>
          <div className="ws-proof">
            <span><b>2–3 天</b>闭门</span>
            <span className="sep" />
            <span><b>2–4 组</b> × 每组 4–6 人</span>
            <span className="sep" />
            <span><b className="grad">免费</b></span>
          </div>
        </div>
      </section>

      {/* 它不是培训 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">先说清楚</span>
          <h2 className="ws-h2">它不是培训</h2>
          <p className="ws-sub">
            市面上的 AI 训练营大多是课：讲原理、教工具、发证书。加速营不是——<b>它是一场围着你的问题转的攻坚。</b>
          </p>
          <div className="ws-agenda">
            {diffs.map((d, i) => (
              <div className="ws-arow" key={i}>
                <span className="ws-ano grad">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{d.b}</h4>
                  <p>{d.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 四步 */}
      <section className="ws-core" id="steps">
        <div className="ws-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ws-eyebrow on-dark">怎么走</span>
          <h2 className="ws-h2 on-dark">四步，从一个问题到一个能用的 Agent</h2>
          <p className="ws-sub on-dark-sub">每一组都走这四步。走完，Agent 是你们搭的，不是我们替你搭的。</p>
          <div className="ws-steps">
            {steps.map((s, i) => (
              <div className="ws-step" key={s.no} data-end={i === steps.length - 1 ? "true" : undefined}>
                <span className="ws-sno grad">{s.no}</span>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
                {i < steps.length - 1 && <span className="ws-sarr">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分组机制 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">怎么组队</span>
          <h2 className="ws-h2">像一场小型比赛</h2>
          <div className="ws-duo">
            <div>
              <dl className="ws-spec">
                {groupSpec.map((s, i) => (
                  <div key={i}><dt>{s.dt}</dt><dd>{s.dd}</dd></div>
                ))}
              </dl>
              <p className="ws-anote">
                几组人同场推进，是有意为之：进度互相看得见，讨论会更认真，回去以后的传播也从不止一个组开始。
              </p>
            </div>
            <div className="ws-mimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/workshop/bootcamp-present.jpg" alt="加速营现场：一组成员向其他组演示刚刚跑通的 AI 智能体" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 边界 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">边界</span>
          <h2 className="ws-h2">数据可以更大，接口仍然不做</h2>
          <p className="ws-sub">
            和 Demo Day 相比，加速营的数据量可以更大、讨论可以更深。但有一条线不变：
            <b>只用脱敏导出的数据文件，不做任何数据接口和软件接口，不动你的生产系统。</b>
          </p>
          <p className="ws-bnote">
            要接系统、要治理大数据量、要生产级交付——那是按阶段交付的 <Link href="/workshop/fde">FDE 服务</Link>，
            不该塞进两三天里草草做完。
          </p>
        </div>
      </section>

      {/* 带走什么 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">你会带走什么</span>
          <h2 className="ws-h2">三样东西，一样都不虚</h2>
          <div className="ws-take">
            {takes.map((t) => (
              <div className="ws-tcard" key={t.no}>
                <span className="ws-tno grad">{t.no}</span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
          <p className="ws-verdict light">
            第三样最值钱：<span className="grad">转型的动力，从亲手做过的人身上长出来。</span>
          </p>
        </div>
      </section>

      {/* 场景参考 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">拿什么问题来</span>
          <h2 className="ws-h2">两个适合分组攻坚的问题</h2>
          <p className="ws-sub">流程环节多、天天在发生、数据现成——这样的问题最适合在加速营里跑通。</p>
          <div className="ws-next">
            <Link className="ws-ncard" href="/scenarios/repair-bot">
              <span className="nif">客服 · 流程类</span>
              <h4>报修智能客服</h4>
              <p>从业主报修到派单回访，环节多、话术杂。一组人两三天把这条流程用 Agent 串起来，回去就能试运行。</p>
              <span className="ws-go">看这个场景 <ArrowR s={12} /></span>
            </Link>
            <Link className="ws-ncard" href="/scenarios/reconciliation">
              <span className="nif">财务 · 核对类</span>
              <h4>AI 对账</h4>
              <p>多个台账对不上是常态。带几张真实的账表来，搭一个自动核对的 Agent，误差当场现形。</p>
              <span className="ws-go">看这个场景 <ArrowR s={12} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 跑通之后 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">跑通之后</span>
          <h2 className="ws-h2">Agent 有了，下一步看你想走多远</h2>
          <div className="ws-next">
            <Link className="ws-ncard" href="/workshop/competition">
              <span className="nif">如果你想让全组织动起来</span>
              <h4>AI 应用创新大赛</h4>
              <p>把加速营的打法放大成一场 2–4 周的比赛，让一线员工带着自己的痛点参赛——转型动力从底下长出来。</p>
              <span className="ws-go">了解大赛 <ArrowR s={12} /></span>
            </Link>
            <Link className="ws-ncard" href="/workshop/fde">
              <span className="nif">如果你要把它变成生产系统</span>
              <h4>FDE 服务</h4>
              <p>数据治理、系统与接口接入，把加速营里跑通的场景做成生产级。按阶段交付，按阶段验收。</p>
              <span className="ws-go">了解 FDE 服务 <ArrowR s={12} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* 延伸阅读 → 行业研究 */}
      <RelatedReading
        heading="为什么让一线亲手搭智能体"
        sub="加速营的底层逻辑:AI 转型的动力为什么应该从一线长出来。"
        slugs={["ai-transformation-bottom-up", "ai-property-staff-optimization"]}
      />

      <SeoFaq heading="关于加速营，你可能想问的" items={faqs} />

      {/* FINAL CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带对的人和真的问题来，<br />剩下的交给这两三天</h2>
          <p className="reveal">结束时，跑通的东西留给你。免费。</p>
          <div className="cta-row reveal">
            <Link href="/workshop?mode=bootcamp#signup" className="btn btn-primary">预约加速营 <ArrowR s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
