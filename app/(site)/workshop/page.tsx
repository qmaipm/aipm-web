import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "./page.css";
import WorkshopForm from "./WorkshopForm";
import RelatedReading from "./_RelatedReading";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/workshop", {
  title: "FMClaw™ 加速营 · 从 Demo Day 到 AI 应用创新大赛 | 启盟科技",
  description:
    "把 AI 落到你的现场，有四种方式：半天–1 天的 Demo Day、2–3 天的加速营 Bootcamp、2–4 周的 AI 应用创新大赛（承办/协办/技术底座），以及按阶段交付的 FDE 前置部署工程师服务。带真问题与真实数据来，跑通的东西留给你。",
  keywords: [
    "AI加速营",
    "AI Bootcamp",
    "Demo Day",
    "AI应用创新大赛",
    "人工智能大赛承办",
    "FDE",
    "前置部署工程师",
    "Forward Deployed Engineer",
    "企业AI落地",
    "智能体工作坊",
    "以赛促用",
    "物业管理AI",
  ],
});

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

/* ---------- 结构化数据：面包屑 + 四项服务 ---------- */
const LD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "加速营", item: `${SITE_URL}/workshop` },
    ],
  },
  ...[
    {
      name: "FMClaw™ Demo Day（AI 演示日）",
      url: `${SITE_URL}/workshop/demo-day`,
      description: "半天到一天，用客户的一份真实数据现场跑出可用的 AI demo，验证这条路走得通。",
    },
    {
      name: "FMClaw™ 加速营（AI Bootcamp）",
      url: `${SITE_URL}/workshop/bootcamp`,
      description: "2–3 天闭门工作坊，带真问题与真实数据来，现场搭出并跑通一个 AI 智能体，成果留给客户。",
    },
    {
      name: "AI 应用创新大赛（承办 / 协办 / 技术底座）",
      url: `${SITE_URL}/workshop/competition`,
      description: "面向央国企、政府与大型组织的 2–4 周 AI 应用创新大赛：赛题设计、评审辅导、决赛路演与赛后落地，可承办、协办或提供 FMClaw™ 技术底座。",
    },
    {
      name: "FDE 前置部署工程师服务",
      url: `${SITE_URL}/workshop/fde`,
      description: "按阶段交付的 AI 落地工程服务：数据治理、系统与接口接入，把验证过的场景变成生产系统。",
    },
  ].map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: s.url,
    areaServed: "CN",
    provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  })),
];

/* ---------- 四种方式 ---------- */
const modes = [
  {
    no: "01",
    href: "/workshop/demo-day",
    time: "半天 – 1 天",
    h: "Demo Day",
    line: "用你的一份真实数据，当场跑出一个能用的 demo。它不是交付，是眼见为实——让你亲眼确认，这条路在你的业务上走得通。",
    take: "一个跑在你数据上的 demo，和一个「走得通」的判断。",
    fit: "还在观望、想先亲眼看看的。",
    img: "/workshop/demo-day.jpg",
    alt: "Demo Day：工程师向管理层现场演示跑在真实数据上的 AI demo",
    go: "了解 Demo Day",
  },
  {
    no: "02",
    href: "/workshop/bootcamp",
    time: "2 – 3 天",
    h: "加速营 · Bootcamp",
    line: "带一个真问题和它的真实数据来，闭门两三天，当着你的面把 Agent 搭起来、在你的流程里跑通——跑通的东西，留给你。",
    take: "一个还在运行的 Agent，一份能复用的工作流。",
    fit: "有明确痛点、认真要落地的。",
    img: "/workshop/bootcamp.jpg",
    alt: "加速营：团队在工作坊现场共同搭建 AI 工作流",
    go: "了解加速营",
  },
  {
    no: "03",
    href: "/workshop/competition",
    time: "2 – 4 周",
    h: "AI 应用创新大赛",
    line: "一场比赛，让一线的人带着自己的业务痛点动起来。从报名、辅导到决赛路演，两到四周走完——赛完不散场，获奖课题接着落地。",
    take: "一批从一线长出来的课题，一条赛后落地的路径。我们承办、协办，或提供 FMClaw™ 技术底座。",
    fit: "央国企、地方政府、集团总部。",
    img: "/workshop/competition.jpg",
    alt: "AI 应用创新大赛：员工在决赛现场向评委路演自己的课题",
    go: "了解大赛",
  },
  {
    no: "04",
    href: "/workshop/fde",
    time: "按阶段",
    h: "FDE 服务",
    line: "前置部署工程师进到你的业务现场：数据治理、系统与接口接入，把验证过的场景变成生产系统。按阶段交付，按阶段验收——不是驻场外包。",
    take: "每个阶段有明确目标与验收标准的工程交付。",
    fit: "要接系统、接大数据量，动真格的。",
    img: "/workshop/fde.jpg",
    alt: "FDE 服务：前置部署工程师与设施负责人在现场核对数据管线",
    go: "了解 FDE 服务",
  },
];

/* ---------- 行前准备 ---------- */
const preps = [
  { no: "01", h: "一个说得清的问题", p: "一句话讲明白：谁、在什么场景、卡在哪。" },
  { no: "02", h: "拿得出手的数据", p: "脱敏后的真实数据，附一份字段说明。导不出来的，提前告诉我们。" },
  { no: "03", h: "对的人在场", p: "懂业务的、懂数据的。要拍板的事，请能拍板的人来。" },
  { no: "04", h: "一段不被打扰的时间", p: "这几天里，关键人不接别的会。" },
  { no: "05", h: "保密协议，如果需要", p: "开始前签好，数据的处理范围与去向写清楚。" },
];

/* ---------- FAQ ---------- */
const faqs = [
  {
    q: "四种方式怎么选？",
    a: "看你手里有什么。只有一份数据、想先眼见为实——Demo Day；有真问题和真实数据、要亲手把它跑通——加速营；想让整个组织的人都动起来——办一场 AI 应用创新大赛；已经验证过价值、要接系统接口和大数据量——FDE 服务。拿不准的话，从 Demo Day 开始。",
  },
  {
    q: "半天或一天，能做出什么？",
    a: "一个跑在你真实数据上的 demo：能问答、能出结果，让你看清这套产品的使用逻辑。但大数据量治理和系统接口接入不在半天里——那是 FDE 服务的事。",
  },
  {
    q: "我带一张几万行的 Excel 来，够吗？",
    a: "够撑起一次很好的 Demo Day。但加速营需要的不是更多行数，而是更多准备：字段说明、了解这件事的人，和一段不被打扰的时间。",
  },
  {
    q: "什么是 AI 应用创新大赛？",
    a: "面向央国企、政府和大型组织的另一种打开方式：2–4 周，从一线报名、评审辅导到决赛路演，让员工带着自己的业务痛点参赛。我们可以承办、协办，或为参赛队提供 FMClaw™ 统一技术底座。",
  },
  {
    q: "FDE 是什么？",
    a: "Forward Deployed Engineer，前置部署工程师。工程师深入你的业务现场做数据治理、系统与接口接入，按阶段交付、按阶段验收——不是驻场外包。",
  },
  {
    q: "费用怎么算？",
    a: "Demo Day 和加速营免费。大赛与 FDE 服务按方案单独报价。",
  },
  {
    q: "数据保密怎么保障？",
    a: "可在开始前签保密协议，数据的处理范围与去向都会写清楚。",
  },
];

export default function Page() {
  return (
    <main className="solws">
      <JsonLd data={LD} />

      {/* HERO */}
      <section className="ws-hero has-photo">
        <div className="ws-hero__bg" aria-hidden="true" />
        <div className="ws-grid" aria-hidden="true" />
        <div className="wrap ws-hero-top">
          <span className="ws-kicker">
            <Link href="/products/fmclaw">FMClaw™ 平台</Link>
            <i>/</i>加速营
          </span>
          <h1 className="ws-h1">
            把你自己的 AI，<span className="grad">亲手搭出来</span>
          </h1>
          <p className="ws-lead">
            半天看一个 demo，三天搭一个 Agent，一个月办一场全员参与的比赛，或按阶段把它变成生产系统。
            <b>四种方式，同一个目的：让 AI 在你的现场真正跑起来。</b>
          </p>
          <div className="ws-cta">
            <a href="#modes" className="btn btn-primary">看四种方式 <ArrowD /></a>
            <a href="#signup" className="btn btn-ghost">直接预约 <ArrowR /></a>
          </div>
          <div className="ws-proof">
            <span><b>4 种方式</b></span>
            <span className="sep" />
            <span>最快<b>半天</b>见到结果</span>
            <span className="sep" />
            <span><b className="grad">跑通的东西留给你</b></span>
          </div>
        </div>
      </section>

      {/* 四种方式 */}
      <section className="ws-band" id="modes">
        <div className="wrap">
          <span className="ws-eyebrow">四种方式</span>
          <h2 className="ws-h2">你有多少时间，就有对应的打开方式</h2>
          <p className="ws-sub">时间投入不同，目标就不同。先想清楚你要什么，再决定怎么开始。</p>
          <div className="ws-modes">
            {modes.map((m, i) => (
              <div className={`ws-mode${i % 2 === 1 ? " is-flip" : ""}`} key={m.no}>
                <Link className="ws-mimg" href={m.href} aria-hidden="true" tabIndex={-1}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.alt} loading="lazy" />
                </Link>
                <div className="ws-mbody">
                  <div className="ws-mhead">
                    <span className="ws-mno grad">{m.no}</span>
                    <span className="ws-mtime">{m.time}</span>
                  </div>
                  <h3>{m.h}</h3>
                  <p className="ws-mline">{m.line}</p>
                  <dl className="ws-mrows">
                    <div><dt>带走</dt><dd>{m.take}</dd></div>
                    <div><dt>适合</dt><dd>{m.fit}</dd></div>
                  </dl>
                  <Link className="ws-go" href={m.href}>{m.go} <ArrowR s={12} /></Link>
                </div>
              </div>
            ))}
          </div>
          <p className="ws-verdict light">
            一张 5 万行的 Excel，能撑起一次很好的 Demo Day——但撑不起一个加速营。<span className="grad">选对方式，比着急动手更重要。</span>
          </p>
        </div>
      </section>

      {/* SOUL PREMISE */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">灵魂前提</span>
          <h2 className="ws-h2">不管选哪种，前提只有一个</h2>
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
          <p className="ws-verdict light">没有这两样，<span className="grad">四种方式都帮不了你</span>。</p>
        </div>
      </section>

      {/* 行前准备 · 暗场签名段 */}
      <section className="ws-core" id="prep">
        <div className="ws-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ws-eyebrow on-dark">行前准备</span>
          <h2 className="ws-h2 on-dark">来之前，把这五样备齐</h2>
          <p className="ws-sub on-dark-sub">准备越充分，那几天就越值。这五样，每一样都不难。</p>
          <div className="ws-prep">
            {preps.map((p) => (
              <div className="ws-prow" key={p.no}>
                <span className="ws-pno grad">{p.no}</span>
                <div>
                  <h4>{p.h}</h4>
                  <p>{p.p}</p>
                </div>
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
          <p className="ws-sub">我们会先看一眼这个问题适合哪种方式，再和你约时间。</p>
          <WorkshopForm />
        </div>
      </section>

      {/* TIME & FEE */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">关于时间与费用</span>
          <p className="ws-fee">
            Demo Day 和加速营免费；大赛与 FDE 服务按方案单独报价。
            我们更在意的是——结束时，你手上是否留下了能用的东西。
          </p>
        </div>
      </section>

      {/* FAQ */}
      {/* 延伸阅读 → 行业研究 */}
      <RelatedReading
        heading="来之前,先读懂我们怎么想"
        sub="加速营背后的方法论,这几篇研究讲得最透。"
        slugs={["ai-transformation-bottom-up", "property-management-second-half-ai-company"]}
      />

      <SeoFaq heading="来之前，你可能想问的" items={faqs} />

      {/* FINAL CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带上一个真问题，<br />选一种方式把它跑通</h2>
          <p className="reveal">从你这个月最头疼的那件事开始。</p>
          <div className="cta-row reveal">
            <a href="#signup" className="btn btn-primary">预约加速营 <ArrowR s={16} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
