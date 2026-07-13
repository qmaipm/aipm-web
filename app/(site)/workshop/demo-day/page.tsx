import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "../page.css";
import "../sub.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "Demo Day · 半天到一天，眼见为实 — FMClaw™ 加速营 | 启盟科技",
  description:
    "带一份你自己的真实业务数据来，半天到一天，我们当场跑出一个能用的 AI demo。不做接口、不碰大数据量——它不是交付，是让你亲眼确认这条路走得通。免费。",
  keywords: [
    "Demo Day",
    "AI演示",
    "AI POC",
    "眼见为实",
    "企业AI验证",
    "FMClaw",
    "物业管理AI",
    "AI落地第一步",
  ],
};

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
      { "@type": "ListItem", position: 3, name: "Demo Day", item: `${SITE_URL}/workshop/demo-day` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FMClaw™ Demo Day（AI 演示日）",
    serviceType: "AI 演示日 / Demo Day",
    description:
      "半天到一天，用客户自己的一份真实业务数据现场跑出可用的 AI demo。不做数据接口与软件接口，不碰大数据量治理。免费。",
    url: `${SITE_URL}/workshop/demo-day`,
    areaServed: "CN",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
    provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
];

/* ---------- 流程 ---------- */
const agenda = [
  {
    no: "01",
    t: "开场 · 定目标",
    h: "先说清楚这个 demo 是干嘛的",
    p: "用半小时对齐一件事：我们今天要验证哪个问题、验证到什么程度算数。目标不清楚，看什么都像成功。",
  },
  {
    no: "02",
    t: "数据上手",
    h: "把你带来的数据接进来",
    p: "一张脱敏的真实数据表，加一份字段说明。我们当场读进 FMClaw™，你看着它一步步理解你的业务。",
  },
  {
    no: "03",
    t: "现场演示",
    h: "在你的数据上跑起来",
    p: "问答、核对、汇总、出结果——都用你自己的数据。不是我们准备好的标准演示，是你的业务在屏幕上。",
  },
  {
    no: "04",
    t: "随便问",
    h: "把最刁钻的问题留给这一段",
    p: "管理层现场提问，AI 现场作答。哪里答得好、哪里答不上来，当场看得一清二楚——这正是 Demo Day 的价值。",
  },
  {
    no: "05",
    t: "收尾 · 下判断",
    h: "一起回答「走不走得通」",
    p: "结束前，我们和你一起给出判断：这条路在你的业务上走得通吗？下一步是加速营，还是直接谈落地，还是先放一放。",
  },
];

/* ---------- 数据规格 ---------- */
const spec = [
  { dt: "范围", dd: <><b>单一项目、单一问题</b>——比如一个项目的水电费台账，不是全集团的数据仓库。</> },
  { dt: "数据量", dd: <><b>一张表或几张表，几万行以内</b>。一张 5 万行的 Excel，就能撑起一次很好的 Demo Day。</> },
  { dt: "形式", dd: <>Excel、CSV、PDF 都可以。<b>脱敏后</b>再带来，附一份简单的字段说明。</> },
  { dt: "导不出来？", dd: <>数据锁在系统里导不出来的，提前告诉我们——这种情况可能要走 <Link href="/workshop/fde">FDE 服务</Link> 的路。</> },
];

/* ---------- 边界 ---------- */
const doList = [
  <>在<b>你的真实数据</b>上现场跑出一个能用的 demo</>,
  <>问答、核对、汇总、出结果，<b>你亲眼看全过程</b></>,
  <>管理层现场提问，好与不好<b>当场见分晓</b></>,
  <>结束时给出一个<b>「走得通 / 走不通」</b>的明确判断</>,
];
const dontList = [
  <><b>不做任何接口</b>——数据接口、软件接口都不做，半天到一天没有这个时间</>,
  <><b>不碰大数据量治理</b>——几十万行、多系统的数据，不是一天能理清的</>,
  <><b>不打通你的现有系统</b>——demo 跑在我们的环境里，不动你的生产系统</>,
  <><b>演示不等于交付</b>——你带走的是判断，不是一个上线的系统</>,
];

/* ---------- 谁该来 ---------- */
const seats = [
  { role: "拍板的人", h: "分管领导", p: "看完要回答「做不做」的那个人。他/她不在场，Demo Day 的价值会打对折。" },
  { role: "懂业务的人", h: "业务骨干", p: "天天被这个问题折磨的人。AI 答得对不对，他/她一听就知道。" },
  { role: "懂数据的人", h: "管表的人", p: "知道这张表每个字段什么意思、哪里有坑的人。现场答疑，省一半时间。" },
];

/* ---------- FAQ ---------- */
const faqs = [
  {
    q: "半天和一天，怎么选？",
    a: "半天的实际工作时间约 2 小时，适合验证一个足够聚焦的问题；一天的实际工作时间约 4–6 小时，中间可以穿插更充分的讨论和高管问答。问题越聚焦，需要的时间越短。",
  },
  {
    q: "我该带多少数据来？",
    a: "单一项目、单一问题的数据：一张表或几张表，几万行以内，脱敏后附上字段说明。不需要更多——Demo Day 验证的是方向，不是容量。",
  },
  {
    q: "演示出来的东西，能直接拿去用吗？",
    a: "不能，也不该。demo 跑在演示环境里，没有做接口、没有做数据治理、没有做权限和稳定性——这些是 FDE 服务阶段的工程工作。Demo Day 给你的是一个可靠的判断，不是一个上线的系统。",
  },
  {
    q: "为什么不做接口？",
    a: "因为没有时间，也没有必要。半天到一天里做接口对接，只会做出一个不可靠的半成品。Demo Day 的任务是让你眼见为实；接口和大数据量，留给按阶段交付的 FDE 服务。",
  },
  {
    q: "Demo Day 收费吗？",
    a: "免费。我们要的是你带一个真问题和一份真实数据来。",
  },
  {
    q: "数据安全怎么保障？",
    a: "带脱敏数据来；需要的话，开始前签保密协议，数据的处理范围与去向写清楚。演示结束后，你的数据按约定处理。",
  },
];

export default function Page() {
  return (
    <main className="solws">
      <JsonLd data={LD} />

      {/* HERO */}
      <section className="ws-hero has-photo">
        <div className="ws-hero__bg" style={{ backgroundImage: "url(/workshop/demo-day-hero.jpg)" }} aria-hidden="true" />
        <div className="ws-grid" aria-hidden="true" />
        <div className="wrap ws-hero-top">
          <span className="ws-kicker">
            <Link href="/workshop">加速营</Link>
            <i>/</i>Demo Day
          </span>
          <h1 className="ws-h1">
            半天时间，<span className="grad">眼见为实</span>
          </h1>
          <p className="ws-lead">
            带一份你自己的真实数据来。半天到一天，我们当场跑出一个能用的 demo——
            <b>它不是交付，是让你亲眼确认：这条路，在你的业务上走得通。</b>
          </p>
          <div className="ws-cta">
            <Link href="/workshop#signup" className="btn btn-primary">预约 Demo Day <ArrowR /></Link>
            <a href="#boundary" className="btn btn-ghost">先看边界 <ArrowR /></a>
          </div>
          <div className="ws-proof">
            <span>半天 ≈ <b>2 小时</b>实际工作</span>
            <span className="sep" />
            <span>一天 ≈ <b>4–6 小时</b></span>
            <span className="sep" />
            <span><b className="grad">免费</b></span>
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">这一天怎么过</span>
          <h2 className="ws-h2">五段，从定目标到下判断</h2>
          <p className="ws-sub">
            它是刻意轻量的：半天约 2 小时实际工作，一天约 4–6 小时，中间穿插讨论。<b>轻，是为了让你毫无负担地开始。</b>
          </p>
          <div className="ws-agenda">
            {agenda.map((a) => (
              <div className="ws-arow" key={a.no}>
                <span className="ws-ano grad">{a.no}</span>
                <div>
                  <h4>{a.h}<span className="t">{a.t}</span></h4>
                  <p>{a.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 带什么数据来 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">带什么来</span>
          <h2 className="ws-h2">一份数据，撑起一个下午</h2>
          <div className="ws-duo">
            <div>
              <dl className="ws-spec">
                {spec.map((s, i) => (
                  <div key={i}><dt>{s.dt}</dt><dd>{s.dd}</dd></div>
                ))}
              </dl>
              <p className="ws-anote">
                数据之外，再带一个说得清的问题：谁、在什么场景、卡在哪。一句话讲明白就够。
              </p>
            </div>
            <div className="ws-mimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/workshop/demo-day-screen.jpg" alt="Demo Day 现场：真实的水电费台账数据与 AI 分析结果并排呈现" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 边界 */}
      <section className="ws-band" id="boundary">
        <div className="wrap">
          <span className="ws-eyebrow">边界</span>
          <h2 className="ws-h2">做什么，不做什么，先说清楚</h2>
          <p className="ws-sub">半天到一天做不成的事，我们不会假装能做成。这条线画清楚，对双方都好。</p>
          <div className="ws-bound">
            <div className="ws-bcol">
              <div className="ws-bh">
                <span className="bic">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8.5l3.5 3.5 7-8" /></svg>
                </span>
                Demo Day 做的
              </div>
              <ul>{doList.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
            <div className="ws-bcol no">
              <div className="ws-bh">
                <span className="bic">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                </span>
                Demo Day 不做的
              </div>
              <ul>{dontList.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
          </div>
          <p className="ws-bnote">
            右边这一列不是做不了，是不属于这半天——接口接入、大数据量治理、生产系统交付，
            都在按阶段交付的 <Link href="/workshop/fde">FDE 服务</Link> 里。
          </p>
        </div>
      </section>

      {/* 谁该来 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">谁该来</span>
          <h2 className="ws-h2">4–6 个人，三种角色</h2>
          <p className="ws-sub">人不用多，但这三种人最好都在。</p>
          <div className="ws-seats">
            {seats.map((s) => (
              <div className="ws-seat" key={s.h}>
                <div className="role">{s.role}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 场景参考 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">拿什么问题来</span>
          <h2 className="ws-h2">两个常被带来的问题</h2>
          <p className="ws-sub">不知道带什么问题来？这两类问题在 Demo Day 上验证效果最好。</p>
          <div className="ws-next">
            <Link className="ws-ncard" href="/scenarios/utility-bill">
              <span className="nif">财务 · 核对类</span>
              <h4>水电费核对</h4>
              <p>一张几万行的水电费台账，AI 当场找出异常、算清分摊。数据规整、结果好验证，是 Demo Day 的经典开局。</p>
              <span className="ws-go">看这个场景 <ArrowR s={12} /></span>
            </Link>
            <Link className="ws-ncard" href="/scenarios/exec-query">
              <span className="nif">管理层 · 问答类</span>
              <h4>管理层问询</h4>
              <p>把经营数据交给 AI，管理层现场随便问。答得好不好，一场问答见真章——最适合「眼见为实」的一类。</p>
              <span className="ws-go">看这个场景 <ArrowR s={12} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 看完之后 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">看完之后</span>
          <h2 className="ws-h2">判断有了，下一步看你要什么</h2>
          <div className="ws-next">
            <Link className="ws-ncard" href="/workshop/bootcamp">
              <span className="nif">如果你想亲手把它搭出来</span>
              <h4>加速营 · Bootcamp</h4>
              <p>2–3 天闭门工作坊，带更充分的准备来，把 demo 变成一个你自己团队搭出来、还在运行的 Agent。同样免费。</p>
              <span className="ws-go">了解加速营 <ArrowR s={12} /></span>
            </Link>
            <Link className="ws-ncard" href="/workshop/fde">
              <span className="nif">如果你要接系统、动真格</span>
              <h4>FDE 服务</h4>
              <p>数据治理、系统与接口接入，把验证过的场景变成生产系统。按阶段交付，按阶段验收。</p>
              <span className="ws-go">了解 FDE 服务 <ArrowR s={12} /></span>
            </Link>
          </div>
          <p className="ws-verdict light">
            当然，也可能你的判断是「先放一放」——<span className="grad">这同样是 Demo Day 的正当收获。</span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于 Demo Day，你可能想问的" items={faqs} />

      {/* FINAL CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带一份数据来，<br />亲眼看它跑起来</h2>
          <p className="reveal">半天时间，换一个可靠的判断。免费。</p>
          <div className="cta-row reveal">
            <Link href="/workshop#signup" className="btn btn-primary">预约 Demo Day <ArrowR s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
