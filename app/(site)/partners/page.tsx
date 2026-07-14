import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "生态伙伴 — 智能体园区 · 智慧园区 AI 合作 | 启盟科技",
  description:
    "启盟科技生态伙伴计划：我们做产品和平台，伙伴赢市场。面向智能建筑与智慧园区工程企业、区域合作伙伴与产业投资方，提供 FMClaw™ 智能体平台的方案支持、联合交付与长期陪伴——帮助伙伴赢下他们的客户。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const partnerTypes = [
  {
    tag: "Building Partner",
    title: "智能建筑伙伴",
    who: "从事建筑智能化工程、机电总包、设计咨询的企业——你们熟悉楼宇与园区，客户信任你们。",
    body: "招标文件里开始出现智能体平台、大模型、AI 感知的技术要求。带着 FMClaw™ 去应标，方案、技术应答与联合交付，我们和你一起完成。",
    href: "/partners/building",
    cta: "看怎么合作",
    live: true,
  },
  {
    tag: "Regional Partner",
    title: "区域伙伴",
    who: "在本地有政企、楼宇、物业资源，想把 AI 产品带给身边客户的公司与团队。",
    body: "你了解本地客户，我们提供产品、方案与交付支撑。区域合作的具体方式，欢迎先聊。",
    href: "/contact",
    cta: "先通过联系我们对接",
    live: false,
  },
  {
    tag: "Investment Partner",
    title: "产业投资伙伴",
    who: "城投、国有物业与产业资本——手里有园区、楼宇等存量资产，在找 AI 时代的运营答案。",
    body: "不必重资产投算力。用 AI 运营能力盘活存量园区与楼宇，也可以协助参与我们主导的人工智能产业共建。",
    href: "/contact",
    cta: "约一次深度交流",
    live: false,
  },
];

const nowItems = [
  {
    no: "01",
    title: "智能体进入政府采购",
    body: "2026 年 4 月，国务院明确将大模型、智能体服务纳入政府采购范围。智能体从技术概念变成了预算科目——采购方开始按这个口径立项、招标。",
  },
  {
    no: "02",
    title: "「智能体园区」写进地方规划",
    body: "多地「十五五」规划纲要提出打造智能工厂和智能体园区。地方政府的园区与楼宇项目，正在把智能体平台写进技术要求。",
  },
  {
    no: "03",
    title: "招标的技术口径变了",
    body: "新一代园区项目的招标文件里，出现了智能体平台、大模型网关、AI 物理感知这样的模块要求。熟悉传统智能化工程的企业，需要一个能应标的 AI 底座。",
  },
];

export default function Page() {
  return (
    <main className="solpt">
      {/* HERO */}
      <section className="pt-hero">
        <div className="pt-grid" aria-hidden="true" />
        <div className="wrap pt-hero-top">
          <span className="pt-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>生态伙伴
          </span>
          <h1 className="pt-h1">
            我们做产品和平台，<br /><span className="grad">伙伴赢市场</span>
          </h1>
          <p className="pt-lead">
            FMClaw™ 是为楼宇、园区与物业场景而生的行业级智能体平台。我们不做你的竞争对手——<b>我们帮你赢下你的客户</b>。
          </p>
          <div className="pt-proof">
            <span>方案与技术应答<b>一起做</b></span>
            <span className="sep" />
            <span>交付<b>一起扛</b></span>
            <span className="sep" />
            <span><b className="grad">客户是你的</b></span>
          </div>
        </div>
      </section>

      {/* 1 · 三类伙伴分流 */}
      <section className="pt-band mist">
        <div className="wrap">
          <span className="pt-eyebrow">合作方向</span>
          <h2 className="pt-h2">三种伙伴，三条路径</h2>
          <p className="pt-sub">找到说的是你的那一类，直接进去看细节。</p>
          <div className="pt-cards">
            {partnerTypes.map((p) => (
              <div className="pt-card" key={p.title}>
                <span className="pt-card-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <div className="who">{p.who}</div>
                <p>{p.body}</p>
                <Link className={`pt-card-cta${p.live ? "" : " soon"}`} href={p.href}>
                  {p.cta} <Arrow />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · 为什么是现在 */}
      <section className="pt-band">
        <div className="wrap">
          <span className="pt-eyebrow">为什么是现在</span>
          <h2 className="pt-h2">市场的口径，已经先变了</h2>
          <p className="pt-sub">三件正在发生的事，决定了这个合作窗口的时间点。</p>
          <div className="pt-now">
            {nowItems.map((n) => (
              <div className="pt-nowi" key={n.no}>
                <span className="pt-nowno grad">{n.no}</span>
                <div className="pt-nowbody">
                  <h3>{n.title}</h3>
                  <p>{n.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="pt-quote">下一个项目来的时候，<span className="grad">你手里要有答案</span>。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">一起把下一个项目拿下来</h2>
          <p className="reveal">从一次沟通开始。说清楚你的资源与场景，我们把合作方式对到实处。</p>
          <div className="cta-row reveal">
            <Link href="/partners/building" className="btn btn-primary">智能建筑伙伴 <Arrow s={16} /></Link>
            <Link href="/contact" className="btn btn-light">联系我们 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
