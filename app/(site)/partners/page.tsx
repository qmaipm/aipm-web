import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import "./page.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "生态伙伴 — 智能体园区 · 智慧园区 AI 合作 | 启盟科技",
  description:
    "启盟科技生态伙伴计划：我们做产品和平台，伙伴赢市场。面向智能体园区与智慧园区工程企业、代理商与产业投资方，提供方案支持、标书技术应答、售前工程师、Demo 环境、联合品牌与商机协同——帮助伙伴赢下他们的客户。",
  alternates: { canonical: "/partners" },
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8.6 6.4 12 13 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- 三类伙伴：每类 = 画像 + 权益清单 + 入口 ---------- */
const partnerTypes = [
  {
    no: "01",
    tag: "Building Partner",
    title: "智能体园区伙伴",
    img: "/images/partners/building.png",
    alt: "智能体园区伙伴：智能楼宇与 AI 感知网络插画",
    who: "从事建筑智能化工程、机电总包、设计咨询的企业。招标文件里开始出现智能体平台、大模型、AI 感知的技术要求——带着 FMClaw™ 去应。",
    gets: [
      "项目方案支持 — 拿到招标文件后，方案架构与技术选型我们一起定",
      "标书技术应答 — 智能体平台、模型与算力部分的应答，由我们的工程师完成",
      "售前工程师支持 — 关键的技术交流与述标环节，售前工程师随队",
      "Demo 演示环境 — 面向客户的智能体园区演示环境，随时可开",
      "联合交付 — 平台部署、模型接入与智能体调试，交付一起扛",
    ],
    href: "/partners/building",
    cta: "看完整合作方式",
    live: true,
  },
  {
    no: "02",
    tag: "Channel Partner",
    title: "代理商合作",
    img: "/images/partners/regional.png",
    alt: "代理商合作：FMClaw 平台连接区域市场与本地客户网络插画",
    who: "建筑智能化工程企业、软件企业与拥有政企客户资源的机构。当前招募集中在经济发达地区。",
    gets: [
      "项目推荐 · 佣金模式 — 推荐客户促成签约，按项目结算佣金，无需备货",
      "区域代理 · 底价模式 — 授权区域 + 协议底价，对应年度最低采购承诺",
      "能力嵌入 · 集成模式 — 智能体能力嵌入自有系统，产品与品牌归属伙伴",
      "商机报备保护 — 已报备的客户与项目，保护期内我们不直接接触",
    ],
    href: "/partners/channel",
    cta: "了解三种合作模式",
    live: true,
  },
  {
    no: "03",
    tag: "Investment Partner",
    title: "产业投资伙伴",
    img: "/images/partners/investment.png",
    alt: "产业投资伙伴：存量园区智能化升级与增长插画",
    who: "城投、国有物业与产业资本——手里有园区、楼宇等存量资产，在找 AI 时代的运营答案。",
    gets: [
      "存量资产 AI 化方案 — 不必重资产投算力，用 AI 运营能力盘活存量园区与楼宇",
      "联合运营模式设计 — 从技术方案到运营分成，一起设计可持续的模式",
      "产业共建参与 — 可协助参与我们主导的人工智能产业共建项目",
      "决策层深度对接 — 由创始团队直接对接，不走销售流程",
    ],
    href: "/contact",
    cta: "约一次深度交流",
    live: false,
  },
];

/* ---------- 合作流程 ---------- */
const steps = [
  { no: "1", title: "提交申请", body: "通过合作入口或联系我们，说明你的业务与资源" },
  { no: "2", title: "沟通评估", body: "我们在 3 个工作日内响应，对齐合作方向" },
  { no: "3", title: "签署协议", body: "确定合作类型，同步合作等级与对应政策" },
  { no: "4", title: "培训赋能", body: "产品、方案与售前培训，Demo 环境开通" },
  { no: "5", title: "首单联合作战", body: "第一个项目我们全程随队，打法带出来" },
];

/* ---------- 为什么是现在（压缩版） ---------- */
const nowItems = [
  {
    title: "智能体进入政府采购",
    body: "2026 年 4 月，国务院明确将大模型、智能体服务纳入政府采购范围——智能体从概念变成了预算科目。",
  },
  {
    title: "「智能体园区」写进地方规划",
    body: "多地「十五五」规划提出打造智能工厂和智能体园区，园区与楼宇项目正把智能体平台写进技术要求。",
  },
  {
    title: "招标的技术口径变了",
    body: "新一代园区项目的招标文件里，出现了智能体平台、大模型网关、AI 物理感知这样的模块要求。",
  },
];

/* ---------- 结构化数据（SEO / GEO）---------- */
const PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "启盟科技生态伙伴计划",
  description:
    "面向智能体园区与智慧园区工程企业、代理商与产业投资方的生态合作计划。",
  url: `${SITE_URL}/partners`,
  hasPart: [
    {
      "@type": "WebPage",
      name: "智能体园区伙伴",
      url: `${SITE_URL}/partners/building`,
      description: "面向建筑智能化工程、机电总包与设计咨询企业：智能体园区项目的投标与交付支持。",
    },
    {
      "@type": "WebPage",
      name: "代理商合作",
      url: `${SITE_URL}/partners/channel`,
      description: "三种合作模式：项目推荐（按项目佣金）、区域代理（协议底价与授权区域）、能力嵌入（FMClaw™ 能力嵌入自有系统）。",
    },
  ],
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "生态伙伴", item: `${SITE_URL}/partners` },
  ],
};

export default function Page() {
  return (
    <main className="solpt">
      <JsonLd data={[PAGE_LD, BREADCRUMB_LD]} />
      {/* HERO：文字 + 插画 */}
      <section className="pt-hero">
        <div className="pt-grid" aria-hidden="true" />
        <div className="wrap pt-hero-cols">
          <div className="pt-hero-txt">
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
            <div className="pt-hero-cta">
              <Link href="/partners/building" className="btn btn-primary">智能体园区伙伴 <Arrow s={16} /></Link>
              <Link href="/contact" className="btn btn-ghost">申请成为伙伴 <Arrow s={16} /></Link>
            </div>
            <div className="pt-proof">
              <span>方案与技术应答<b>一起做</b></span>
              <span className="sep" />
              <span>交付<b>一起扛</b></span>
              <span className="sep" />
              <span><b className="grad">客户是你的</b></span>
            </div>
          </div>
          <div className="pt-hero-art">
            <Image
              src="/images/partners/hero.png"
              alt="FMClaw 智能体平台连接生态伙伴插画"
              width={688}
              height={384}
              priority
              sizes="(max-width: 960px) 92vw, 560px"
            />
          </div>
        </div>
      </section>

      {/* 三类伙伴：每类一屏，画像 + 权益清单 + 配图 */}
      <section className="pt-band mist">
        <div className="wrap">
          <span className="pt-eyebrow">合作方向</span>
          <h2 className="pt-h2">三种伙伴，每一类拿到什么</h2>
          <p className="pt-sub">找到说的是你的那一类。权益写清楚，什么时候给、给到什么程度，签约前都可以当面对。</p>
        </div>
        <div className="wrap pt-types">
          {partnerTypes.map((p, i) => (
            <article className={`pt-type${i % 2 === 1 ? " flip" : ""}`} key={p.title}>
              <div className="pt-type-art">
                <Image src={p.img} alt={p.alt} width={600} height={448} sizes="(max-width: 960px) 92vw, 470px" />
              </div>
              <div className="pt-type-txt">
                <div className="pt-type-head">
                  <span className="pt-type-no grad">{p.no}</span>
                  <span className="pt-card-tag">{p.tag}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="who">{p.who}</p>
                <ul className="pt-gets">
                  {p.gets.map((g) => {
                    const [head, rest] = g.split(" — ");
                    return (
                      <li key={head}>
                        <span className="tick"><Check /></span>
                        <span><b>{head}</b>{rest ? ` — ${rest}` : ""}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link className={`pt-card-cta${p.live ? "" : " soon"}`} href={p.href}>
                  {p.cta} <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 合作流程 */}
      <section className="pt-band">
        <div className="wrap">
          <span className="pt-eyebrow">合作流程</span>
          <h2 className="pt-h2">从申请到首单，五步走完</h2>
          <div className="pt-steps">
            {steps.map((s) => (
              <div className="pt-step" key={s.no}>
                <span className="pt-step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <p className="pt-policy">
            合作等级与对应政策（含商务条款），签署协议后同步。<Link href="/contact">先聊一次 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 为什么是现在（压缩） */}
      <section className="pt-band mist">
        <div className="wrap">
          <span className="pt-eyebrow">为什么是现在</span>
          <h2 className="pt-h2">市场的口径，已经先变了</h2>
          <div className="pt-now">
            {nowItems.map((n, i) => (
              <div className="pt-nowi" key={n.title}>
                <span className="pt-nowno grad">{String(i + 1).padStart(2, "0")}</span>
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
            <Link href="/partners/building" className="btn btn-primary">智能体园区伙伴 <Arrow s={16} /></Link>
            <Link href="/contact" className="btn btn-light">申请成为伙伴 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
