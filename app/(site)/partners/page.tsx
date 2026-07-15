import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

// 用 pageMetadata 保证 canonical 与 og:url 指向页面自身（main 的 SEO 修复机制）；
// 文案沿用本分支较新的两板块口径（智能体园区伙伴 / 行业智能体伙伴计划）
export const metadata: Metadata = pageMetadata("/partners", {
  title: "生态伙伴 — 智能体园区 · 智慧园区 AI 合作 | 启盟科技",
  description:
    "启盟科技生态伙伴计划：我们做产品和平台，伙伴赢市场。面向智能体园区工程企业、系统集成商、物业科技与软件企业：智能体园区伙伴提供方案与应标支持，行业智能体伙伴计划提供 Refer、Sell、Deliver、Build 四种合作路径与 FMClaw™ FDE 能力认证。",
});

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
    img: "/images/partners/agent-park.png",
    alt: "智能体园区伙伴：智能楼宇与 AI 感知网络插画",
    who: "从事建筑智能化工程、机电总包、设计咨询的企业。招标文件里开始出现智能体平台、大模型、AI 感知的技术要求——带着 FMClaw™ 去应。",
    gets: [
      "项目方案支持 — 拿到招标文件后，方案架构与技术选型我们一起定",
      "标书技术应答 — 智能体平台、模型与算力部分的应答，由我们的工程师完成",
      "售前工程师支持 — 关键的技术交流与述标环节，售前工程师随队",
      "Demo 演示环境 — 面向客户的智能体园区演示环境，随时可开",
      "联合交付 — 平台部署、模型接入与智能体调试，交付一起扛",
    ],
    href: "/partners/agent-park",
    cta: "看完整合作方式",
    live: true,
  },
  {
    no: "02",
    tag: "Partner Program",
    title: "行业智能体伙伴计划",
    img: "/images/partners/program.png",
    alt: "行业智能体伙伴计划：FMClaw 平台连接伙伴与行业客户的合作网络插画",
    who: "系统集成商、建筑智能化企业、物业科技公司和行业软件企业。免费申请，按自身能力选择参与方式。",
    gets: [
      "四种合作路径 — Refer 推荐 · Sell 销售 · Deliver 交付 · Build 构建，可多选",
      "公开的伙伴等级 — 依据认证人员、生产项目和公开案例评定，不只看销售额",
      "FMClaw™ FDE能力认证 — 面向个人的交付能力认证；企业独立交付资格单独评审",
      "商机报备保护 — 经确认的商机获得 90 日初始保护期，可续期一次",
    ],
    href: "/partners/program",
    cta: "了解完整伙伴计划",
    live: true,
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
    "面向智能体园区工程企业、系统集成商、物业科技与软件企业的生态合作计划。",
  url: `${SITE_URL}/partners`,
  hasPart: [
    {
      "@type": "WebPage",
      name: "智能体园区伙伴",
      url: `${SITE_URL}/partners/agent-park`,
      description: "面向建筑智能化工程、机电总包与设计咨询企业：智能体园区项目的投标与交付支持。",
    },
    {
      "@type": "WebPage",
      name: "行业智能体伙伴计划",
      url: `${SITE_URL}/partners/program`,
      description: "Refer、Sell、Deliver、Build四种合作路径；公开伙伴等级、生产项目和FMClaw™ FDE基础标准；免费申请，提供商机报备保护和首单联合交付。",
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
              <Link href="/partners/agent-park" className="btn btn-primary">智能体园区伙伴 <Arrow s={16} /></Link>
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
          <h2 className="pt-h2">两类伙伴，每一类拿到什么</h2>
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
            <Link href="/partners/agent-park" className="btn btn-primary">智能体园区伙伴 <Arrow s={16} /></Link>
            <Link href="/contact" className="btn btn-light">申请成为伙伴 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
