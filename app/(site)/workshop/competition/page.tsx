import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import RelatedReading from "../_RelatedReading";
import "../page.css";
import "../sub.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "AI 应用创新大赛 · 承办 / 协办 / 技术底座 — 2–4 周以赛促用 | FMClaw™ · 启盟科技",
  description:
    "面向央国企、政府与大型组织的企业内部 AI 应用创新大赛：2–4 周从组织发动、一线报名、评审辅导到决赛路演闭环。五维评分盯落地不盯表演，赛完不散场——获奖课题接着落地。我们承办、协办，或提供 FMClaw™ 统一技术底座。",
  keywords: [
    "AI应用创新大赛",
    "人工智能大赛承办",
    "企业内部AI大赛",
    "AI大赛组织方案",
    "以赛促用",
    "以赛促创",
    "央国企AI转型",
    "员工AI创新",
    "AI场景创新大赛",
    "FMClaw",
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
      { "@type": "ListItem", position: 3, name: "AI 应用创新大赛", item: `${SITE_URL}/workshop/competition` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI 应用创新大赛（承办 / 协办 / 技术底座）",
    serviceType: "企业内部 AI 应用创新大赛组织服务",
    description:
      "面向央国企、政府与大型组织的企业内部 AI 应用创新大赛：2–4 周从组织发动、一线报名、评审辅导到决赛路演闭环，赛后获奖课题接续落地。可承办、协办，或提供 FMClaw™ 统一技术底座。按方案单独报价。",
    url: `${SITE_URL}/workshop/competition`,
    areaServed: "CN",
    audience: { "@type": "Audience", audienceType: "央国企、地方政府、集团总部" },
    provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
];

/* ---------- 为什么办比赛 ---------- */
const whys = [
  {
    h: "自上而下推 AI，推不动的不是技术，是人",
    p: "文件发了、平台买了、培训办了——一线还是不用。因为课题是别人的，工具是发下来的，跟自己的活没关系。",
  },
  {
    h: "比赛把「要我用」变成「我要用」",
    p: "让一线员工带着自己天天头疼的活来参赛：报修、对账、巡检、库存……课题是自己的，赢了有名有奖，动力自然就有了。",
  },
  {
    h: "赛完留下的不只是名次",
    p: "一批被验证过的真实课题、一批亲手做过的种子选手、一套管理层看得见的评分依据——下一步落什么、谁来落，都有了答案。",
  },
];

/* ---------- 赛程五段 ---------- */
const phases = [
  { wk: "第 1 周", h: "组织发动", p: "定赛制、定评委、发通知。赛题不由上面出——让一线自己报。" },
  { wk: "第 1–2 周", h: "一线报名", p: "员工带着自己的业务痛点组队报题。报上来的每个课题，都是真的。" },
  { wk: "第 2–3 周", h: "评审与辅导", p: "课题技术评估筛一轮，工程师点对点辅导：可行的往前推，不可行的说清楚为什么。" },
  { wk: "第 3–4 周", h: "决赛路演", p: "入围队伍上台：路演加答辩，评委当场评分。是骡子是马，台上见。" },
  { wk: "赛后", h: "颁奖与落地", p: "一二三等奖当场颁出。赛完不散场——获奖课题进入落地通道，明年接着办。" },
];

/* ---------- 五维评分 ---------- */
const scores = [
  { lbl: "应用场景创新性", small: "题选得准不准、是不是真痛点", pt: 25, hot: false },
  { lbl: "方案可行性", small: "技术上走得通、数据拿得到", pt: 25, hot: true },
  { lbl: "预期效益", small: "省多少人、快多少天、算得出来", pt: 20, hot: true },
  { lbl: "团队协作执行", small: "不是一个人的独角戏", pt: 15, hot: false },
  { lbl: "展示答辩", small: "说得清楚，答得上来", pt: 10, hot: false },
];

/* ---------- 三档合作 ---------- */
const tiers = [
  {
    tk: "全程交给我们",
    h: "承办",
    p: "从赛制设计到颁奖典礼，整场比赛我们操盘，你出人出题出场地。",
    items: ["赛制与评分细则设计", "赛题征集与技术评估", "点对点课题辅导", "决赛路演组织与评审支持", "赛后落地路径规划"],
    main: true,
  },
  {
    tk: "你办我们帮",
    h: "协办 · 技术支持",
    p: "比赛由你的团队或第三方主办，我们提供关键环节的专业支撑。",
    items: ["课题可行性技术评估", "参赛队伍工程辅导", "评审专家与评分建议", "决赛技术答辩支持"],
    main: false,
  },
  {
    tk: "只用我们的平台",
    h: "FMClaw™ 技术底座",
    p: "全体参赛队用同一个底座搭作品——比的是场景与方案，不是谁家工具好。",
    items: ["参赛队统一 FMClaw™ 环境", "赛前平台使用培训", "赛中技术答疑", "获奖作品可直接续跑"],
    main: false,
  },
];

/* ---------- FAQ ---------- */
const faqs = [
  {
    q: "什么是企业内部 AI 应用创新大赛？",
    a: "在你的组织内部办一场比赛：一线员工带着自己的业务痛点组队报题，经过技术评估和点对点辅导后，在决赛上路演答辩，评委按五维标准评分，一二三等奖当场颁出。2–4 周走完全程，赛后获奖课题接续落地。",
  },
  {
    q: "为什么用比赛的方式推 AI 转型？",
    a: "自上而下推 AI，最常见的结局是平台买了没人用——因为课题不是一线自己的。比赛反过来：让员工拿自己天天头疼的活来参赛，课题是自己的、荣誉是自己的，「要我用」就变成了「我要用」。转型的动力，从一线长出来最结实。",
  },
  {
    q: "一线员工不懂技术，能参赛吗？",
    a: "能，而且他们才是主角。比赛比的是场景选得准不准、问题真不真，技术由统一的 FMClaw™ 底座和工程师辅导兜底。我们服务过的比赛里，报名的全部是一线团队——炒菜机器人、访客管理、库存管理这样的课题，都是从现场长出来的。",
  },
  {
    q: "大赛怎么评分？会不会变成表演赛？",
    a: "我们建议的五维评分里，方案可行性 25 分加预期效益 20 分，占了 45 分——将近一半的分数在问「这事落不落得了地、值不值」。展示答辩只占 10 分。它不是表演赛，是落地赛。",
  },
  {
    q: "2–4 周够吗？",
    a: "够，而且刻意不拖。组织发动、一线报名、评审辅导、决赛路演，标准一个月内闭环。战线拉长热度就凉了；短平快打完，趁着热度把获奖课题送进落地通道，才是这场比赛真正的目的。",
  },
  {
    q: "承办、协办和技术底座，怎么选？",
    a: "想省心，选承办——整场比赛我们操盘；已有主办力量，选协办——我们补技术评估、辅导和评审这几个关键环节；只想统一工具，用 FMClaw™ 技术底座——所有队伍同一个平台，比的是场景与方案。三档都按方案单独报价。",
  },
  {
    q: "有实际案例吗？",
    a: "有。我们为某大型物业公司的 AI 应用创新大赛提供服务，赛制覆盖从课题征集、技术评估、点对点辅导到决赛路演评分的完整流程，报名课题全部来自一线团队。出于保密约定，细节可在商务沟通中提供。",
  },
  {
    q: "赛完之后呢？",
    a: "这是我们最在意的一段：获奖课题不该停在领奖台上。可行性高的课题进入落地通道——轻的走加速营继续打磨，重的走 FDE 服务做成生产系统。比赛办得好的组织，通常第二年接着办。",
  },
];

export default function Page() {
  return (
    <main className="solws">
      <JsonLd data={LD} />

      {/* HERO */}
      <section className="ws-hero has-photo">
        <div className="ws-hero__bg" style={{ backgroundImage: "url(/workshop/competition-hero.jpg)" }} aria-hidden="true" />
        <div className="ws-grid" aria-hidden="true" />
        <div className="wrap ws-hero-top">
          <span className="ws-kicker">
            <Link href="/workshop">加速营</Link>
            <i>/</i>AI 应用创新大赛
          </span>
          <h1 className="ws-h1">
            让转型的动力，<span className="grad">从一线长出来</span>
          </h1>
          <p className="ws-lead">
            办一场比赛，让员工带着自己的业务痛点上台。从组织发动到决赛路演，2–4 周闭环——
            <b>赛完不散场，获奖课题接着落地。</b>
          </p>
          <div className="ws-cta">
            <Link href="/workshop?mode=competition#signup" className="btn btn-primary">聊聊办一场大赛 <ArrowR /></Link>
            <a href="#phases" className="btn btn-ghost">看赛程怎么走 <ArrowR /></a>
          </div>
          <div className="ws-proof">
            <span><b>2–4 周</b>闭环</span>
            <span className="sep" />
            <span>承办 · 协办 · <b>技术底座</b></span>
            <span className="sep" />
            <span><b className="grad">赛完接着落地</b></span>
          </div>
        </div>
      </section>

      {/* 为什么办比赛 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">为什么是比赛</span>
          <h2 className="ws-h2">自上而下推不动的事，比赛推得动</h2>
          <div className="ws-agenda">
            {whys.map((w, i) => (
              <div className="ws-arow" key={i}>
                <span className="ws-ano grad">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{w.h}</h4>
                  <p>{w.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 赛程 · 暗场时间线 */}
      <section className="ws-core" id="phases">
        <div className="ws-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ws-eyebrow on-dark">赛程</span>
          <h2 className="ws-h2 on-dark">2–4 周，标准一个月内闭环</h2>
          <p className="ws-sub on-dark-sub">刻意不拖。战线拉长热度就凉了——短平快打完，趁热落地。</p>
          <div className="ws-phases">
            {phases.map((p, i) => (
              <div className="ws-phase" key={p.h} data-end={i === phases.length - 1 ? "true" : undefined}>
                <span className="wk">{p.wk}</span>
                <h4>{p.h}</h4>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 评分 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">怎么评</span>
          <h2 className="ws-h2">不是表演赛，是落地赛</h2>
          <p className="ws-sub">
            这是我们建议的五维评分。注意分数长在哪：<b>可行性加效益占 45 分</b>——将近一半的分，在问「这事落不落得了地」。
          </p>
          <div className="ws-score">
            {scores.map((s) => (
              <div className="ws-srow" key={s.lbl} data-hot={s.hot ? "true" : undefined}>
                <span className="lbl">{s.lbl}<small>{s.small}</small></span>
                <span className="bar"><i style={{ width: `${s.pt * 4}%` }} /></span>
                <span className="pt">{s.pt}</span>
              </div>
            ))}
          </div>
          <p className="ws-anote">评分细则会按你的组织与赛题情况调整——但「落地压过表演」这条原则不变。</p>
        </div>
      </section>

      {/* 辅导机制 + 案例 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">课题从哪来</span>
          <h2 className="ws-h2">课题不由上面出，让一线自己报</h2>
          <div className="ws-duo">
            <div>
              <p className="ws-sub" style={{ marginTop: 0 }}>
                我们为某大型物业公司的 AI 应用创新大赛提供服务时，报名课题<b>全部来自一线团队</b>：
                炒菜机器人排产、访客管理、档案检索、油烟管道巡检、五金库存……没有一个是办公室里想出来的。
              </p>
              <p className="ws-sub">
                报上来的课题先过一轮<b>技术评估</b>——可行的往前推，暂时不可行的说清楚卡在哪，不让任何一个队白忙。
                入围课题由工程师<b>点对点辅导</b>，帮每个队把方案磨到能上台。
              </p>
              <p className="ws-anote">
                这也是评估里最常见的两个坎：数据质量与系统接口。赛场上绕得开，落地时绕不开——所以赛后通道里有 FDE。
              </p>
            </div>
            <div className="ws-mimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/workshop/competition-coach.jpg" alt="大赛点对点辅导现场：工程师与一线参赛团队一起打磨课题方案" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 三档合作 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">怎么合作</span>
          <h2 className="ws-h2">承办、协办，或提供技术底座</h2>
          <p className="ws-sub">你想投入多少组织精力，就有对应的合作方式。按方案单独报价。</p>
          <div className="ws-tiers">
            {tiers.map((t) => (
              <div className="ws-tier" key={t.h} data-main={t.main ? "true" : undefined}>
                <span className="tk">{t.tk}</span>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
                <ul>{t.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 赛后 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">赛完之后</span>
          <h2 className="ws-h2">领奖台不是终点，是落地的起点</h2>
          <div className="ws-next">
            <Link className="ws-ncard" href="/workshop/bootcamp">
              <span className="nif">轻的课题</span>
              <h4>进加速营继续打磨</h4>
              <p>数据现成、流程不复杂的获奖课题，让原班人马走一次 2–3 天加速营，把参赛作品磨成天天在用的 Agent。</p>
              <span className="ws-go">了解加速营 <ArrowR s={12} /></span>
            </Link>
            <Link className="ws-ncard" href="/workshop/fde">
              <span className="nif">重的课题</span>
              <h4>走 FDE 做成生产系统</h4>
              <p>要接系统、要治理大数据量的课题，交给前置部署工程师按阶段做成生产级——赛场上的掌声，变成报表上的数字。</p>
              <span className="ws-go">了解 FDE 服务 <ArrowR s={12} /></span>
            </Link>
          </div>
          <p className="ws-verdict light">
            比赛办得好的组织，通常第二年接着办——<span className="grad">因为转型这件事，终于不用推了。</span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      {/* 延伸阅读 → 行业研究 */}
      <RelatedReading
        heading="大赛背后的方法论"
        sub="为什么用大赛把一线的难题变成选题——这几篇研究是它的理论底座。"
        slugs={["how-to-run-ai-competition", "ai-transformation-bottom-up"]}
      />

      <SeoFaq heading="关于办一场 AI 大赛，你可能想问的" items={faqs} />

      {/* FINAL CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">给你的一线一个舞台，<br />给转型一个真正的起点</h2>
          <p className="reveal">2–4 周，从发动到颁奖，赛完接着落地。</p>
          <div className="cta-row reveal">
            <Link href="/workshop?mode=competition#signup" className="btn btn-primary">聊聊办一场大赛 <ArrowR s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
