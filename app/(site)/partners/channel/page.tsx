import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/partners/channel", {
  title: "渠道伙伴 — AI 产品代理 · FMClaw™ 智能体平台渠道合作 | 启盟科技",
  description:
    "启盟科技渠道伙伴招募：面向系统集成商、软件公司与有政企客户资源的团队，开放三种 AI 产品合作模式——项目推荐（按项目返佣）、区域代理（协议底价 + 授权区域）、能力嵌入（FMClaw™ 智能体能力嵌入你的系统）。商机报备保护，培训与售前支撑，当前招募集中在经济发达地区。",
});

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
    fit: "有政企、楼宇、物业客户关系，想低门槛开始的公司与团队。",
    how: "介绍客户、促成签约，我们按项目支付一次性佣金。不压货、不承担交付、不占用你的资金。",
    points: [
      "门槛最低 — 无采购承诺，无技术团队要求",
      "报备即保护 — 报备的客户与项目，保护期内我们不直接触达",
      "售前我们上 — 技术交流、方案、述标由我们的团队完成",
      "签约即结算 — 佣金按项目一次性结算，规则写进协议",
    ],
  },
  {
    no: "02",
    tag: "按区域",
    title: "区域代理 · 底价模式",
    fit: "想深耕一块市场、有销售团队与经营能力的公司。",
    how: "授权区域内以协议底价采购、按市场价销售，差价即收益。对应承诺区域年度最低销量——权利和责任对等。",
    points: [
      "区域授权 — 授权区域内的市场归你经营",
      "底价供货 — 协议底价与合作等级挂钩，签约后同步",
      "有门槛 — 需承诺年度最低采购量，签约前当面算清楚",
      "全套赋能 — 产品培训、售前支撑、Demo 环境、联合品牌",
    ],
  },
  {
    no: "03",
    tag: "按产品",
    title: "能力嵌入 · 集成模式",
    fit: "有研发能力的软件公司、SaaS 厂商与系统集成商。",
    how: "把 FMClaw™ 的智能体能力嵌入你自己的系统，作为你产品的 AI 底层——你的产品、你的品牌、你的客户。",
    points: [
      "API / 私有化两种接入 — 按你的产品形态选",
      "你的品牌在前 — 我们做底层，不出现在你的客户面前",
      "工程师对接工程师 — 接入期专人技术支持",
      "商务按调用或按项目 — 计费方式签约时对齐",
    ],
  },
];

/* ---------- 为什么值得卖 ---------- */
const worth = [
  {
    title: "需求是政策带出来的",
    body: "智能体服务已纳入政府采购范围，多地「十五五」规划提出建设智能体园区——政企客户在按这个口径立项，预算是真实存在的。",
  },
  {
    title: "行业产品，不打价格战",
    body: "FMClaw™ 是为楼宇、园区与物业场景而生的行业级智能体平台，不是通用工具套壳——对客户讲得清价值，对渠道留得住利润。",
  },
  {
    title: "已在真实项目里运行",
    body: "平台已在真实楼宇与园区中运行，有可以带客户看的案例与 Demo 环境——你卖的不是概念。",
  },
];

/* ---------- 我们的承诺 ---------- */
const promises = [
  {
    title: "不与伙伴抢客户",
    body: "商机报备制度写进协议：你报备的客户与项目，保护期内我们不直接触达。客户是你的，这句话我们对建筑伙伴说，对渠道伙伴同样算数。",
  },
  {
    title: "售前与交付兜底",
    body: "技术交流、方案输出、标书应答、平台部署——你的团队还没长出来之前，这些我们来。首个项目全程随队。",
  },
  {
    title: "政策透明",
    body: "佣金规则、区域底价、最低采购量，全部写进协议，签约前逐条当面对。我们不做口头承诺，也请你不要期待官网上出现数字。",
  },
];

/* ---------- 合作流程 ---------- */
const steps = [
  { no: "1", title: "提交申请", body: "说明你的公司、客户资源与想做的模式" },
  { no: "2", title: "沟通评估", body: "3 个工作日内响应，对齐模式与区域" },
  { no: "3", title: "签署协议", body: "佣金 / 底价 / 嵌入条款逐条确认" },
  { no: "4", title: "培训赋能", body: "产品与售前培训，Demo 环境开通" },
  { no: "5", title: "首单联合作战", body: "第一个项目我们全程随队" },
];

/* ---------- FAQ（GEO 主力） ---------- */
const faqs = [
  {
    q: "代理 FMClaw™ 需要压货吗？",
    a: "佣金模式不需要——介绍客户、促成签约、结算佣金，不占用你的资金。区域代理模式有年度最低采购承诺，这是拿到区域授权与底价的对价，具体数量签约前当面算清楚。",
  },
  {
    q: "你们会绕过我直接找我的客户吗？",
    a: "不会。商机报备制度写进协议：你报备的客户与项目，保护期内我们不直接触达。渠道生意的根基是信任，这条我们不含糊。",
  },
  {
    q: "我没有 AI 技术团队，能做吗？",
    a: "佣金模式和区域代理模式都不要求技术团队——售前、方案、交付由我们支撑，你负责客户。只有能力嵌入模式需要你有研发能力。",
  },
  {
    q: "招募哪些地区的伙伴？",
    a: "当前招募集中在经济发达地区：长三角、珠三角、京津冀、成渝等区域优先——这些地区的政企与园区预算落地快、项目密度高。其他地区有优质资源的，也欢迎先聊。",
  },
  {
    q: "佣金比例和底价是多少？",
    a: "与合作等级挂钩，签署协议后同步。我们不在官网写数字，也建议你警惕任何在官网承诺具体回报的招商——正规的渠道政策都是签约同步的。",
  },
];

export default function Page() {
  return (
    <main className="solch">
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
              把 FMClaw™ <br />卖进<span className="grad">你的市场</span>
            </h1>
            <p className="ch-lead">
              面向系统集成商、软件公司与有政企客户资源的团队。三种合作模式——<b>按项目、按区域、按产品</b>——总有一种对得上你手里的资源。
            </p>
            <div className="ch-hero-cta">
              <Link href="/contact" className="btn btn-primary">申请成为渠道伙伴 <Arrow s={16} /></Link>
              <a href="#modes" className="btn btn-ghost">看三种合作模式 <Arrow s={16} /></a>
            </div>
            <div className="ch-proof">
              <span>商机报备<b>写进协议</b></span>
              <span className="sep" />
              <span>售前交付<b>我们兜底</b></span>
              <span className="sep" />
              <span><b className="grad">客户是你的</b></span>
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
            有客户关系的做<b>项目推荐</b>，想经营市场的做<b>区域代理</b>，有研发能力的做<b>能力嵌入</b>。收益结构完全不同，选对模式比什么都重要。
          </p>
          <div className="ch-modes">
            {modes.map((m) => (
              <article className="ch-mode" key={m.no}>
                <div className="ch-mode-head">
                  <span className="ch-mode-no grad">{m.no}</span>
                  <span className="ch-mode-tag">{m.tag}</span>
                </div>
                <h3>{m.title}</h3>
                <p className="fit"><b>适合谁：</b>{m.fit}</p>
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
              </article>
            ))}
          </div>
          <p className="ch-policy">
            佣金比例、区域底价与最低采购量，与合作等级挂钩，<b>签署协议后同步</b>。拿不准选哪种？<Link href="/contact">带着你的资源来聊 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 2 · 为什么值得卖 */}
      <section className="ch-band">
        <div className="wrap">
          <span className="ch-eyebrow">卖什么 · 为什么好卖</span>
          <h2 className="ch-h2">你代理的不是一个工具，是一个正在放量的品类</h2>
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
            产品好不好卖，来<Link href="/contact" className="grad" style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>看一次 Demo</Link> 自己判断。
          </p>
        </div>
      </section>

      {/* 3 · 我们的承诺（暗场） */}
      <section className="ch-core">
        <div className="ch-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ch-eyebrow on-dark">我们的承诺</span>
          <h2 className="ch-h2 on-dark">渠道生意的根基是信任，<br />这三条写进协议</h2>
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
          <h2 className="ch-h2">当前重点招募：经济发达地区</h2>
          <p className="ch-sub">
            <b>长三角、珠三角、京津冀、成渝</b>等区域优先——政企与园区预算落地快、项目密度高，渠道的投入产出更确定。其他地区有优质客户资源的，也欢迎先聊。
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
          <h2 className="ch-h2">签约前，你大概率想问这几个</h2>
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
          <h2 className="reveal">带着你的资源来，<br />我们把模式对到实处</h2>
          <p className="reveal">一次沟通就能确定：哪种模式适合你、第一个项目从哪开始。</p>
          <div className="cta-row reveal">
            <Link href="/contact" className="btn btn-primary">申请成为渠道伙伴 <Arrow s={16} /></Link>
            <Link href="/partners" className="btn btn-light">看其他合作方向 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
