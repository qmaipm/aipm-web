import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "../page.css";
import "../trade.css";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/ai-service/cleaning", {
  title: "AI 清洁服务 · 人机协同的写字楼/园区保洁服务 — 启盟科技",
  description:
    "AI 清洁服务把保洁从「数人头」换成「数服务」：服务频次、标准与达标线写进合同，每一次作业系统留痕，质量由 AI 多模态评分，人与清洁机器人协同作业。机器人批量进场不增加预算，综合服务成本年降约 15%。由启盟科技旗下自营物业公司爱物管交付。",
  keywords: [
    "AI 清洁服务",
    "智能清洁服务",
    "保洁外包",
    "写字楼保洁",
    "园区保洁公司",
    "清洁机器人服务",
    "人机协同保洁",
    "物业保洁考核",
    "爱物管",
    "启盟科技",
  ],
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 与传统清洁服务的区别(页面主菜,同时是 GEO 的可引用事实清单)
const compare: { k: string; old: string; now: React.ReactNode }[] = [
  {
    k: "合同承诺",
    old: "承诺派多少人",
    now: <><b>承诺做多少次服务</b>——点位、频次、标准逐项写进合同。不同项目每月从数千次到二十万次不等,写多少,做多少</>,
  },
  {
    k: "履约核验",
    old: "数人头、看在岗",
    now: <>每一次服务系统留痕。到岗率按约定线(通常 85%–90%)数字化考核——<b>来多少人,不等于干了多少活</b></>,
  },
  {
    k: "质量评判",
    old: "主管印象分,说不清哪里不好",
    now: <><b>AI 评分</b>——图像、视频、传感器多模态验收,双方看同一份数据,评分线写进合同(如不低于 4 分)</>,
  },
  {
    k: "做不到怎么办",
    old: "口头承诺,出了问题再协商",
    now: <>到岗率、评分低于约定,<b>按合同扣钱</b>。重大投诉、满意度调查等传统考核,只要可量化,一并写进去</>,
  },
  {
    k: "服务标准",
    old: "沿用旧清单,凭经验排班",
    now: <>基于累计超 2000 万㎡ 的服务数据生成:你的项目该在哪些位置、提供什么服务、什么频次</>,
  },
  {
    k: "作业方式",
    old: "纯人力,重复劳动靠人扛",
    now: <>人 + 机器人分工——机器人接管高频标准工序,人负责边角、突发与深度保洁</>,
  },
  {
    k: "预算",
    old: "人工涨,价就涨",
    now: <>机器人批量进场<b>不增加预算</b>,成本结构长期可控,已运行项目综合服务成本年降约 15%</>,
  },
];

// 四步闭环:四个 Agent 100% 跑通的工种
const steps = [
  {
    n: "01", h: "定标准",
    p: "进场前,基于同类项目的服务数据与头部客户的行政 / FM / PM 标准沉淀,给出你的项目完整的服务计划:哪些位置、什么服务、什么频次。",
    ag: "服务设计 Agent", href: "/solutions/service-design",
  },
  {
    n: "02", h: "管执行",
    p: "人和机器人排进同一张时间表。每一次作业系统留痕,异常自动派单,现场不靠人盯人。",
    ag: "运营管理 Agent", href: "/solutions/operations",
  },
  {
    n: "03", h: "评质量",
    p: "AI 多模态评分替代主管印象分:图像、视频、传感器数据自动验收,达标率按合同约定核验、结算。",
    ag: "质量评估 Agent", href: "/solutions/assessment",
  },
  {
    n: "04", h: "持续改",
    p: "按月复盘服务数据,调整点位、频次与人机配比。服务方案不是签约时定死的,是越跑越准的。",
    ag: "服务优化 Agent", href: "/solutions/optimization",
  },
];

const faq = [
  {
    q: "AI 清洁服务和传统保洁外包有什么区别?",
    a: "核心区别有三个:一是合同从「承诺派多少人」变成「承诺做多少次服务」,点位、频次、标准逐项写进合同,按数字化考核履约;二是质量评判从主管印象分变成 AI 多模态评分(图像、视频、传感器数据自动验收),双方看同一份数据,不扯皮;三是作业方式从纯人力变成人机协同,清洁机器人接管高频标准工序,人负责边角与突发。这项服务由启盟科技旗下自营物业公司爱物管交付。",
  },
  {
    q: "怎么知道保洁到底干没干、干得好不好?",
    a: "AI 清洁服务的每一次作业都在系统里留痕:做没做、什么时候做的、做到什么程度,业主随时可查。质量由 AI 融合图像、视频与传感器数据做多模态评分,而不是靠主管的主观印象。在一个 30 万㎡ 园区的真实项目中,这套机制让清洁覆盖率从约 75% 提升到 95% 以上,卫生死角清洁频率提升约 3 倍。",
  },
  {
    q: "用了清洁机器人,费用会变贵吗?",
    a: "不会。正确的做法是「工序替代」:让机器人低成本、高频率地完成过去高成本、低频率才能做一次的专项工序(如洗地),而不是简单顶替人的工时。这套打法让机器人可以选得更小、更便宜,因此可以在不增加业主预算的前提下批量投放。已运行项目的数据是:综合服务成本每年降低约 15%,人力成本与管理成本同时下降。",
  },
  {
    q: "AI 清洁服务的收费和考核怎么约定?",
    a: "报价明码标价,包含人员、机器人、AI 系统与物料四个部分。考核全部量化并写进合同:每月服务次数、服务标准、到岗率(通常约定 85%–90%)、现场 AI 评分线(如不低于 4 分),以及重大投诉、满意度调查等传统条款。做不到约定,按合同扣钱——不需要争论,数据和合同都摆在那里。",
  },
  {
    q: "我们项目的清洁标准不清楚,能帮我们定吗?",
    a: "能,这正是服务的第一步。基于累计超 2000 万㎡ 的服务数据,以及众多头部客户的行政服务、FM、PM 标准沉淀,服务设计 Agent 会在进场前为你的项目生成完整的服务计划:哪些位置需要服务、提供什么服务、频次多少、人机怎么配。很多客户正是从这份计划开始了解这项服务的。",
  },
  {
    q: "机器人能承担多大比例的清洁工作?",
    a: "以一个 30 万㎡、1000 多个服务点位的园区为例:16 台清洁机器人承接夜间与非高峰时段的重复作业,一线清洁人力优化 43.9%,最终现场配置是 23 名一线人员加 16 台机器人,管住每天约 4 万次交付。机器人接管的是高频标准工序,边角、突发污染和深度保洁仍由人完成——人机协同,而不是机器换人。",
  },
];

// Service(provider=爱物管,parentOrganization=启盟科技) + Breadcrumb。
// FAQ 结构化数据由 SeoFaq 组件输出,这里不重复。
const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 清洁服务",
  serviceType: "AI 清洁服务(人机协同保洁)",
  description:
    "服务频次、标准与达标线写进合同,每一次作业系统留痕,质量由 AI 多模态评分,人与清洁机器人协同作业的清洁服务。",
  areaServed: "CN",
  url: `${SITE_URL}/ai-service/cleaning`,
  provider: {
    "@type": "Organization",
    name: "爱物管",
    alternateName: "AIPM",
    description: "启盟科技旗下自营物业公司,AI 物业服务的交付主体。",
    parentOrganization: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI 物业服务", item: `${SITE_URL}/ai-service` },
    { "@type": "ListItem", position: 3, name: "AI 清洁服务", item: `${SITE_URL}/ai-service/cleaning` },
  ],
};

export default function Page() {
  return (
    <main className="aisv avtrade">
      <JsonLd data={[SERVICE_LD, BREADCRUMB_LD]} />

      {/* HERO */}
      <section className="av-hero">
        <div className="av-hero__bg" style={{ backgroundImage: "url(/ai-service/cleaning-hero.jpg)" }} aria-hidden="true" />
        <div className="av-grid" aria-hidden="true" />
        <div className="wrap av-hero-top">
          <span className="av-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>
            <Link href="/ai-service">AI 物业服务</Link>
            <i>/</i>AI 清洁服务
          </span>
          <h1 className="av-h1 reveal">干没干，数据会说话</h1>
          <p className="av-lead reveal">
            清洁服务从「数人头」换成「数服务」——多少次、什么标准、达标多少，<b>写进合同</b>，系统记录，AI 评分。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">为我的项目出一份清洁服务方案 <Arrow /></Link>
            <a href="#evidence" className="btn btn-ghost">看真实项目 <Arrow /></a>
          </div>
          <div className="av-proof reveal">
            <span><b>人 + 机器人 + AI</b> 协同作业</span>
            <span className="sep" />
            <span>服务频次<b>写进合同</b></span>
            <span className="sep" />
            <span><b className="grad">AI 评分</b>，双方认账</span>
          </div>
        </div>
      </section>

      {/* 与传统清洁服务的区别 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">和传统清洁服务的区别</span>
          <h2 className="av-h2 reveal">换的不是保洁公司，是清洁服务的运行方式</h2>
          <p className="av-sub reveal">
            传统清洁合同里写的是「派多少人」。人来没来、活干没干、干得怎么样，业主只能靠感觉。我们把这三件事全部变成数据——每一行都写进合同。
          </p>
          <div className="avc-cmp reveal" role="table" aria-label="传统清洁服务与 AI 清洁服务对比">
            <div className="avc-row avc-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">传统模式</div>
              <div className="now" role="columnheader">AI 清洁服务</div>
            </div>
            {compare.map((r) => (
              <div className="avc-row" role="row" key={r.k}>
                <div className="avc-k" role="cell">{r.k}</div>
                <div className="avc-old" role="cell">{r.old}</div>
                <div className="avc-new" role="cell">{r.now}</div>
              </div>
            ))}
          </div>
          <div className="avc-stand reveal">
            <p>
              只要是可量化、可公开的考核，我们都接受——到岗率、评分、投诉、满意度，做不到就按合同扣钱。
            </p>
            <p>
              同样，遇到问题时，您也不会从我们这里听到「都做了呀」「这个说不清楚」。
              <b>哪里没做好，数据指得出来；该不该扣钱，合同写得清楚。</b>
            </p>
          </div>
        </div>
      </section>

      {/* 四步闭环 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">从设计到复盘的闭环</span>
          <h2 className="av-h2 reveal">一份清洁服务，从头到尾都在系统里</h2>
          <div className="avc-steps">
            {steps.map((s) => (
              <article className="avc-step reveal" key={s.n}>
                <span className="n">{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <Link className="ag" href={s.href}>{s.ag} <Arrow s={13} /></Link>
              </article>
            ))}
          </div>
          <p className="avc-note reveal">清洁，是这四个智能体第一个 <em>100% 跑通闭环</em>的工种。</p>
        </div>
      </section>

      {/* 人机协同 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">机器人为什么进得来</span>
          <h2 className="av-h2 reveal">机器人批量进场，预算不动</h2>
          <div className="avc-robot">
            <div className="avc-robot__body reveal">
              <p>
                清洁机器人早已不是新鲜事，买回来闲置吃灰的也不少。问题不在机器，在调度——哪些边角要人补、什么时候换水、突发脏污谁处理、十几台机器人怎么排路线才不打架。
              </p>
              <p>
                FMClaw 把人和机器人排在同一张时间表上：机器人接管夜间与非高峰时段的高频标准工序（典型是专项洗地），人从重复劳动里抽身，去做机器做不了的边角、突发与深度保洁。
              </p>
              <p>
                这套「工序替代」的打法，让机器人可以选得更小、更便宜——所以<b>机器人批量投放进清洁服务而不增加业主预算，这件事我们已经在多个真实项目里做到了</b>。
              </p>
            </div>
            <div className="avc-robot__media reveal">
              <img src="/ai-service/green.jpg" alt="人机协同清洁作业现场" loading="lazy" />
            </div>
          </div>
          <blockquote className="avc-quote reveal">
            <p>“我原来担心机器人是摆设，后来发现关键根本不是机器人，是背后那套调度——有它把人和机器排明白，机器人才真派上用场。”</p>
            <cite>—— 某 30 万㎡ 园区物业负责人</cite>
          </blockquote>
          <p style={{ marginTop: 26 }} className="reveal">
            <Link className="av-link" href="/insights/how-to-choose-cleaning-robot-roi">
              为什么我们不追求「一台顶三个人」的机器人 <Arrow s={13} />
            </Link>
          </p>
        </div>
      </section>

      {/* 证据 · 暗场 */}
      <section className="av-core" id="evidence">
        <div className="av-core__bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow on-dark reveal">已经在运行的项目</span>
          <h2 className="av-h2 on-dark reveal">不是演示，是每天 4 万次交付</h2>
          <div className="av-metrics reveal">
            <div className="av-metric"><div className="mv"><em>23 人 + 16 台</em></div><div className="ml">机器人协同，管住 30 万㎡ 园区</div></div>
            <div className="av-metric"><div className="mv">75% → <em>95%+</em></div><div className="ml">整体清洁覆盖率</div></div>
            <div className="av-metric"><div className="mv"><em>-80%</em></div><div className="ml">园区物业相关投诉</div></div>
            <div className="av-metric"><div className="mv"><em>≈15%</em></div><div className="ml">综合服务成本年降幅</div></div>
          </div>
          <div className="avc-cases">
            <Link className="avc-case reveal" href="/cases/30w-park-ai-property-manager-robot">
              <span className="tag">智慧园区 · 约 30 万㎡ · 1000+ 服务点位</span>
              <h3>23 人 + 16 台机器人，管住每天 4 万次交付</h3>
              <p>一线清洁人力优化 43.9%，卫生死角清洁频率提升约 3 倍，投诉下降超过 80%。</p>
              <span className="go">看这个项目 <Arrow s={13} /></span>
            </Link>
            <Link className="avc-case reveal" href="/cases/restroom-quality">
              <span className="tag">通信设备制造 · 13 城 21 园区</span>
              <h3>用 AI，管住 2000 个卫生间</h3>
              <p>各园区服务达标率稳定在 95% 以上，卫生间相关投诉下降约 30%，管理巡检人力投入下降约 60%。</p>
              <span className="go">看这个项目 <Arrow s={13} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 谁在为你服务 · 爱物管 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">谁在为你服务</span>
          <h2 className="av-h2 reveal">先用在自己身上，再对外提供</h2>
          <div className="avc-who reveal">
            <div className="avc-who__brand">
              <span className="nm">爱物管</span>
              <span className="en">AIPM</span>
              <span className="rel">启盟科技旗下<br />自营物业公司</span>
            </div>
            <div className="avc-who__body">
              <p>
                2019 年，为了把 AI 真正做进物业，我们自己开了一家物业公司：装传感器、跑工单、面对投诉，把每一个 AI 能力先用在自己身上，再对外提供服务。它自己的账本——<b>管理层 69 → 5 人，净利率 3.4% → 14%</b>——就是这套服务方式最直接的证据。
              </p>
              <div className="avc-who__links">
                <Link className="av-link" href="/cases/aipm-property-ai-transformation">看爱物管自己的故事 <Arrow s={13} /></Link>
                <Link className="av-link" href="/company">关于启盟科技 <Arrow s={13} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 三种合作方式 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">三种合作方式</span>
          <h2 className="av-h2 reveal">按你的情况，选一种开始</h2>
          <div className="avc-modes">
            <article className="avc-mode reveal">
              <span className="lab">方式一 · 全委服务</span>
              <h3>清洁整体交给爱物管</h3>
              <p>人、机器人、AI 系统、物料一体交付。频次、标准、考核写进合同，按数据结算。</p>
              <span className="who"><b>适合：</b>想彻底换一种清洁服务运行方式的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式二 · 顾问驻场</span>
              <h3>你的团队留下，换管理方式</h3>
              <p>我们派驻项目顾问，带全套 AI 产品进场，参与管理与考核。服务期至少一年。</p>
              <span className="who"><b>适合：</b>现有团队不想动、但想换掉管理方式的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式三 · 产品与平台</span>
              <h3>把这套能力接进你的交付</h3>
              <p>你是物业 / FM 公司？这一页里的调度、评分与考核能力，都可以接进你自己的项目。</p>
              <span className="who"><b>入口：</b><Link className="av-link" href="/products/fmclaw" style={{ fontSize: 13 }}>FMClaw™ AI 平台 <Arrow s={12} /></Link></span>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于 AI 清洁服务，问得最多的" items={faq} />

      {/* 尾部 CTA */}
      <section className="avc-end">
        <div className="avc-end__glow" aria-hidden="true" />
        <div className="wrap">
          <h2 className="reveal">让服务被看见</h2>
          <p className="reveal">
            用你的项目，让我们出一份带频次、带标准、带人机配比的清洁服务方案——从这份方案开始，你就能看到区别。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow /></Link>
            <span className="alt">或先看 <Link href="/solutions/service-design">服务设计 Agent 怎么出方案</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
