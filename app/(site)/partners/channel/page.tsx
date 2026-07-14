import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import "./page.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "渠道伙伴 — FMClaw™ 智能体平台渠道合作 | 启盟科技",
  description:
    "启盟科技渠道合作计划：面向建筑智能化工程企业、软件企业与拥有政企客户资源的机构，提供三种合作模式——项目推荐（按项目支付佣金）、区域代理（协议底价与授权区域）、能力嵌入（将 FMClaw™ 智能体能力嵌入自有系统）。商机报备写入协议，提供培训与售前支持，当前招募集中在经济发达地区。",
  alternates: { canonical: "/partners/channel" },
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- 三种合作模式（页面主体） ---------- */
const modes = [
  {
    no: "01",
    tag: "按项目",
    title: "项目推荐 · 佣金模式",
    img: "/images/partners/mode-referral.png",
    alt: "项目推荐模式：客户建筑经由协议文件与 FMClaw 平台建立连接的示意插画",
    fit: "拥有政企、楼宇或物业客户关系，希望以较低投入开始合作的企业与团队。",
    how: "推荐客户并协助促成签约，我们按项目支付一次性佣金。不需要备货，不承担交付，不占用资金。",
    points: [
      "门槛最低 — 无采购承诺，不要求技术团队",
      "报备保护 — 已报备的客户与项目，保护期内我们不直接接触",
      "售前支持 — 技术交流、方案编制与述标由我们完成",
      "按项目结算 — 佣金规则写入协议，签约后一次性结算",
    ],
  },
  {
    no: "02",
    tag: "按区域",
    title: "区域代理 · 底价模式",
    img: "/images/partners/mode-distribution.png",
    alt: "区域代理模式：授权区域内中心节点向多个建筑辐射的示意插画",
    fit: "计划长期经营特定区域市场、具备销售团队与经营能力的企业。",
    how: "在授权区域内以协议底价采购、按市场价格销售，差价即为收益。相应地，需承诺区域年度最低采购量——权利与责任对等。",
    points: [
      "区域授权 — 授权区域内的市场由伙伴经营",
      "底价供货 — 协议底价与合作等级挂钩，签署协议后同步",
      "明确门槛 — 需承诺年度最低采购量，签约前逐项确认",
      "体系支持 — 产品培训、售前支撑、Demo 环境与联合品牌",
    ],
  },
  {
    no: "03",
    tag: "按产品",
    title: "能力嵌入 · 集成模式",
    img: "/images/partners/mode-embed.png",
    alt: "能力嵌入模式：FMClaw 能力模块嵌入伙伴软件系统界面的示意插画",
    fit: "具备研发能力的软件企业、SaaS 服务商与信息技术服务企业。",
    how: "将 FMClaw™ 的智能体能力嵌入自有系统，作为产品的 AI 底层。产品、品牌与客户关系均归属伙伴。",
    points: [
      "两种接入方式 — API 或私有化部署，按产品形态选择",
      "伙伴品牌在前 — 我们提供底层能力，不出现在最终客户面前",
      "工程对接 — 接入期由专人提供技术支持",
      "计费方式 — 按调用量或按项目，签约时确定",
    ],
  },
];

/* ---------- 市场背景 ---------- */
const worth = [
  {
    title: "需求由政策带动",
    body: "智能体服务已纳入政府采购范围，多地「十五五」规划提出建设智能体园区。政企客户正按这一口径立项，预算真实存在。",
  },
  {
    title: "行业级产品，价值可以讲清楚",
    body: "FMClaw™ 是面向楼宇、园区与物业场景的行业级智能体平台，而非通用工具的封装。对客户，价值可以讲清楚；对渠道，利润空间可以维持。",
  },
  {
    title: "已在真实项目中运行",
    body: "平台已在真实楼宇与园区中运行，有可供参观的案例与可演示的环境，产品表现可以实地验证。",
  },
];

/* ---------- 我们的承诺 ---------- */
const promises = [
  {
    title: "不与伙伴竞争客户",
    body: "商机报备制度写入协议：已报备的客户与项目，保护期内我们不直接接触。这一条对建筑伙伴有效，对渠道伙伴同样有效。",
  },
  {
    title: "售前与交付支持",
    body: "技术交流、方案编制、标书应答与平台部署，在伙伴团队成熟之前由我们承担。首个项目全程参与。",
  },
  {
    title: "政策透明",
    body: "佣金规则、区域底价与最低采购量全部写入协议，签约前逐条确认。我们不做口头承诺，官网也不会出现具体数字。",
  },
];

/* ---------- 合作流程 ---------- */
const steps = [
  { no: "1", title: "提交申请", body: "说明公司情况、客户资源与意向模式" },
  { no: "2", title: "沟通评估", body: "3 个工作日内响应，确认模式与区域" },
  { no: "3", title: "签署协议", body: "佣金、底价或嵌入条款逐条确认" },
  { no: "4", title: "培训赋能", body: "产品与售前培训，开通 Demo 环境" },
  { no: "5", title: "首个项目协同", body: "第一个项目由我们全程参与" },
];

/* ---------- FAQ（GEO 主力） ---------- */
const faqs = [
  {
    q: "代理 FMClaw™ 需要压货吗？",
    a: "佣金模式不需要。推荐客户、促成签约、结算佣金，不占用资金。区域代理模式包含年度最低采购承诺，这是获得区域授权与底价的对价，具体数量在签约前逐项确认。",
  },
  {
    q: "你们会绕过我直接联系我的客户吗？",
    a: "不会。商机报备制度写入协议：已报备的客户与项目，保护期内我们不直接接触。渠道合作的基础是信任，这一条以协议形式约定。",
  },
  {
    q: "我没有 AI 技术团队，能合作吗？",
    a: "可以。佣金模式与区域代理模式均不要求技术团队，售前、方案与交付由我们支撑，伙伴负责客户关系。只有能力嵌入模式需要具备研发能力。",
  },
  {
    q: "招募哪些地区的伙伴？",
    a: "当前招募集中在经济发达地区，长三角、珠三角、京津冀、成渝等区域优先。这些地区的政企与园区项目预算落地快、密度高。其他地区拥有优质客户资源的企业，同样欢迎联系。",
  },
  {
    q: "佣金比例和底价是多少？",
    a: "与合作等级挂钩，签署协议后同步。我们不在官网公布具体数字，也建议对任何在官网承诺具体回报的招商信息保持审慎——正规的渠道政策在签约时同步。",
  },
];

/* ---------- 结构化数据（SEO / GEO）---------- */
const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FMClaw™ 渠道合作计划",
  serviceType: "AI 智能体平台渠道合作（项目推荐 / 区域代理 / 能力嵌入）",
  description:
    "面向建筑智能化工程企业、软件企业与拥有政企客户资源的机构的渠道合作计划：项目推荐按项目支付佣金；区域代理以协议底价供货并授权区域；能力嵌入将 FMClaw™ 智能体能力嵌入伙伴自有系统。商机报备写入协议，提供培训与售前支持。",
  areaServed: "CN",
  url: `${SITE_URL}/partners/channel`,
  provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "渠道合作模式",
    itemListElement: modes.map((m) => ({
      "@type": "Offer",
      name: m.title,
      description: m.how,
    })),
  },
};
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "生态伙伴", item: `${SITE_URL}/partners` },
    { "@type": "ListItem", position: 3, name: "渠道伙伴", item: `${SITE_URL}/partners/channel` },
  ],
};

export default function Page() {
  return (
    <main className="solch">
      <JsonLd data={[SERVICE_LD, FAQ_LD, BREADCRUMB_LD]} />
      {/* HERO：左文右图 */}
      <section className="ch-hero">
        <div className="ch-grid" aria-hidden="true" />
        <div className="wrap ch-hero-cols">
          <div className="ch-hero-txt">
            <span className="ch-kicker">
              <Link href="/">启盟科技</Link>
              <i>/</i>
              <Link href="/partners">生态伙伴</Link>
              <i>/</i>渠道伙伴
            </span>
            <h1 className="ch-h1">
              FMClaw™ <br /><span className="grad">渠道合作计划</span>
            </h1>
            <p className="ch-lead">
              面向建筑智能化工程企业、软件企业与拥有政企客户资源的机构。三种合作模式——<b>按项目、按区域、按产品</b>——分别对应不同的资源与能力结构。
            </p>
            <div className="ch-hero-cta">
              <Link href="/contact" className="btn btn-primary">申请成为渠道伙伴 <Arrow s={16} /></Link>
              <a href="#modes" className="btn btn-ghost">了解三种合作模式 <Arrow s={16} /></a>
            </div>
            <div className="ch-proof">
              <span>商机报备<b>写入协议</b></span>
              <span className="sep" />
              <span>售前与交付<b>由我们承担</b></span>
              <span className="sep" />
              <span><b className="grad">客户关系归属伙伴</b></span>
            </div>
          </div>
          <div className="ch-hero-art">
            <Image
              src="/images/partners/regional.png"
              alt="渠道伙伴：FMClaw 平台连接区域市场与本地客户网络插画"
              width={600}
              height={448}
              priority
              sizes="(max-width: 960px) 92vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* 1 · 三种合作模式（页面主体） */}
      <section className="ch-band mist" id="modes">
        <div className="wrap">
          <span className="ch-eyebrow">合作模式</span>
          <h2 className="ch-h2">三种模式，对应三种资源</h2>
          <p className="ch-sub">
            有客户关系的适合<b>项目推荐</b>，有经营能力的适合<b>区域代理</b>，有研发能力的适合<b>能力嵌入</b>。三种模式的权责与收益结构不同，可在沟通中确定。
          </p>
          <div className="ch-modes">
            {modes.map((m, i) => (
              <article className={`ch-mode${i % 2 ? " flip" : ""}`} key={m.no}>
                <div className="ch-mode-art">
                  <Image src={m.img} alt={m.alt} width={560} height={418} sizes="(max-width: 900px) 88vw, 460px" />
                </div>
                <div className="ch-mode-body">
                  <div className="ch-mode-head">
                    <span className="ch-mode-no grad">{m.no}</span>
                    <span className="ch-mode-tag">{m.tag}</span>
                  </div>
                  <h3>{m.title}</h3>
                  <p className="fit"><b>适合：</b>{m.fit}</p>
                  <p className="how">{m.how}</p>
                  <ul className="ch-points">
                    {m.points.map((p) => {
                      const [head, rest] = p.split(" — ");
                      return (
                        <li key={head}>
                          <b>{head}</b>
                          {rest ? ` — ${rest}` : ""}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="ch-policy">
            佣金比例、区域底价与最低采购量，与合作等级挂钩，<b>签署协议后同步</b>。不确定哪种模式合适？<Link href="/contact">与我们沟通 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 2 · 市场背景 */}
      <section className="ch-band">
        <div className="wrap">
          <span className="ch-eyebrow">市场背景</span>
          <h2 className="ch-h2">需求来自政策与预算，而非概念</h2>
          <div className="ch-worth">
            {worth.map((w, i) => (
              <div className="ch-worthi" key={w.title}>
                <span className="ch-worthno grad">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="ch-quote">
            产品的实际表现，可以<Link href="/contact" className="grad" style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>预约一次 Demo</Link> 亲自判断。
          </p>
        </div>
      </section>

      {/* 3 · 我们的承诺（暗场） */}
      <section className="ch-core">
        <div className="ch-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ch-eyebrow on-dark">我们的承诺</span>
          <h2 className="ch-h2 on-dark">三项承诺，<br />均写入协议</h2>
          <div className="ch-promises">
            {promises.map((p) => (
              <div className="ch-promise" key={p.title}>
                <span className="ch-pk" aria-hidden="true" />
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · 招募地区 + 流程 */}
      <section className="ch-band">
        <div className="wrap">
          <span className="ch-eyebrow">招募地区与流程</span>
          <h2 className="ch-h2">当前招募集中在经济发达地区</h2>
          <p className="ch-sub">
            <b>长三角、珠三角、京津冀、成渝</b>等区域优先。这些地区的政企与园区项目预算落地快、密度高。其他地区拥有优质客户资源的企业，同样欢迎联系。
          </p>
          <div className="ch-steps">
            {steps.map((s) => (
              <div className="ch-step" key={s.no}>
                <span className="ch-step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · FAQ */}
      <section className="ch-band mist">
        <div className="wrap">
          <span className="ch-eyebrow">常见问题</span>
          <h2 className="ch-h2">合作前的常见问题</h2>
          <div className="ch-faqs">
            {faqs.map((f) => (
              <details className="ch-faq" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">一次沟通，<br />确定合适的合作模式</h2>
          <p className="reveal">说明你的客户资源与能力结构，我们据此确认合作模式与第一个项目的起点。</p>
          <div className="cta-row reveal">
            <Link href="/contact" className="btn btn-primary">申请成为渠道伙伴 <Arrow s={16} /></Link>
            <Link href="/partners" className="btn btn-light">了解其他合作方向 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
