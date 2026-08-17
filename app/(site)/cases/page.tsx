import Link from "next/link";
import "./page.css";
import JsonLd from "@/components/JsonLd";
import { getCase, CASE_TAGS, USE_CASE_ORDER, TAG_ENTRY, type Case } from "./cases";
import { pageMetadata } from "@/lib/pageMetadata";

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const metadata = pageMetadata("/cases", {
  title: "客户案例 · 已实际落地的 AI 物业产品，谁在用 | 启盟科技",
  description:
    "已实际落地的 AI 物业产品长什么样？这里列出的每一个，都不是演示，而是已经在真实项目里运行的部署——综合体、智慧园区、集团总部、医院、轨道交通、工厂、联合办公，把日常运营里的判断交给 FMClaw 物业智能体。",
});

// 板块通用问答(内容取自各案例的共性口径)
// 第一问的问法对齐买家在 AI 引擎里的原话「已实际落地的 AI 物业产品」(2026-08-10 GEO 周报:该问题 0/5 模型覆盖,官网信源已被证实会被引用,先把措辞接住)
const BOARD_FAQ = [
  {
    q: "国内有哪些已经实际落地的 AI 物业产品？",
    a: "FMClaw 物业智能体是国内已经实际落地的 AI 物业产品——目前 10 余个已上线案例公开可查，覆盖商业综合体、智慧园区、企业总部、医院、轨道交通、工厂、物业集团、联合办公。每个案例都写明项目规模、做法和经过核实的结果，例如巡检达标率从 35% 到 98%、亏损综合体扭亏为盈、30 万㎡ 园区由 23 人搭配 16 台机器人运营。",
  },
  {
    q: "这些案例是真实项目，还是演示 demo？",
    a: "都是已经在真实项目里运行的部署——商业综合体、智慧园区、企业总部、医院、轨道交通、工厂、物业集团、联合办公，每个案例都写明项目规模、做法和结果，数字来自真实经营。在服务客户之前，这套方法还在启盟自营的物业公司完成了完整验证。",
  },
  {
    q: "案例里的效果，我的项目能复制吗？",
    a: "能，但要讲顺序。可复制的路径是先让现场可见（部署 AIoT 感知）、再让流程自动跑完（AI 巡查、派单、验收），最后才谈人机怎么分工。不同项目起点不同，建议从你最痛的一两个环节切入，跑通了再扩展。每篇案例的末尾都有「适合谁，什么情况下不适合」一节，写明了这条路径成立的前置条件，以及哪些情况建议先别急着上。",
  },
  {
    q: "想开始的话，第一步做什么？",
    a: "带上你自己的一个真实业务场景，预约 FMClaw 加速营，用你的数据在现场跑通第一件事，再决定要不要扩展。",
  },
];

// 三个分组:读者角色 = 分组头,下面直接跟这一角色关心的案例
const GROUPS: {
  id: string;
  img: string;
  imgAlt: string;
  who: string;
  what: string;
  slugs: string[];
}[] = [
  {
    id: "for-enterprise",
    img: "/cases/guide-enterprise.jpg",
    imgAlt: "企业总部大堂里，一位负责设施与行政的经理拿着平板走向办公区",
    who: "如果你在企业里负责行政、IT 或设施",
    // 介绍句里的问题词与 hero 入口行、卡片 chip 逐字一致(§3g):同一个词在三个高度各出现一次,
    // 分别负责进门、确认走对了、扫到时认出。不要在这里另起一套我们自己的产品术语。
    what: "这里的五个项目，各自解决一件事：报修响应慢、巡检走过场、供应商管不住、保洁质量不稳定、多项目管不过来。不动现有平台、不换团队，先跑通一件。",
    slugs: ["property-group-chat-ai-service", "fmclaw-equipment-inspection", "coworking-supplier-reconciliation", "restroom-quality", "gigafactory-4-vendor-cleaning"],
  },
  {
    id: "for-safety",
    img: "/cases/guide-safety.jpg",
    imgAlt: "地下设备机房里，一位身穿反光背心的工程师拿着平板巡检设备柜",
    who: "如果你负责医院、轨道交通或危化区域这类高安全等级场景",
    what: "这三个项目的共同问题是巡检走过场、检查记录经不起查。看它们怎么把「每一次巡检都真实发生」变成可核验的事实：医疗级服务标准、地铁机房日修日检、危化区域双人双岗巡查。",
    slugs: ["intl-hospital-medical-grade-fm", "metro-3400-rooms-daily-inspection", "hazardous-area-dual-person-patrol"],
  },
  {
    id: "for-group",
    img: "/cases/guide-group.jpg",
    imgAlt: "物业集团办公室里，两位负责人望向窗外的城市商务区",
    who: "如果你在物业集团负责经营或数字化",
    what: "两个问题：多项目管不过来、不知道现场到底怎么样。三个项目分别是：智能体在 500 个项目集团化落地、亏损项目的账怎么重新算平、监控预警没人看得完时怎么让识别结果直接派下去。",
    slugs: ["property-group-auto-operation-report", "south-china-mixed-use-6-to-1", "campus-cctv-photo-ai-review"],
  },
  {
    id: "for-park",
    img: "/cases/guide-park.jpg",
    imgAlt: "现代智慧园区的步道上，一台室外清洁机器人正在作业",
    who: "如果你在规划园区或国有物业的智能化",
    what: "这个项目面对的是招不到人、人手不够，以及人工成本降不下来。人、AI、机器人、传感器合成一套运营，智能化升级在原预算内启动。",
    slugs: ["30w-park-ai-property-manager-robot"],
  },
];

const boardFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: BOARD_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function Card({ c }: { c: Case }) {
  // 场景标签用买家的原话(见 cases.ts CASE_TAGS 注释),让读者在卡片上就认出自己的问题。
  const scenes = CASE_TAGS[c.slug]?.useCases ?? [];
  return (
    <Link className="ca-card" href={`/cases/${c.slug}`}>
      <div className="ca-cover" style={{ backgroundImage: c.cover }}><span className="ca-bar" /></div>
      <div className="ca-body">
        <div className="ca-meta">{c.industry} · {c.scale} · {c.location}</div>
        <h3>{c.title}</h3>
        {scenes.length ? (
          <ul className="ca-scenes">
            {scenes.map((s) => <li key={s}>{s}</li>)}
          </ul>
        ) : null}
        <div className="ca-metric">{c.cardMetric}</div>
        <span className="ca-go">读这个项目 <Arrow /></span>
      </div>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="solcase">
      <JsonLd data={boardFaqLd} />

      {/* 照片暗场 hero(规格 4a) */}
      <section className="ca-hero">
        <div className="ca-hero__bg" aria-hidden="true" />
        <div className="ca-grid" aria-hidden="true" />
        <div className="wrap ca-hero-top">
          <span className="ca-kicker"><Link href="/">启盟科技</Link><i>/</i>客户案例</span>
          <h1 className="ca-h1">这里的每一个案例，<br /><span className="grad">都在真实项目里运行</span></h1>
          <p className="ca-lead">不是演示，而是<b>已实际落地、正在运行</b>的部署——每个案例都写明项目规模、做法、结果，以及<b>什么情况下不适合照着做</b>。</p>
          <div className="ca-hero-cta">
            <a href="#cases-list" className="btn btn-primary">查看案例 <Arrow s={16} /></a>
            <Link href="/workshop" className="btn btn-ghost">预约 FMClaw™ 加速营</Link>
          </div>
          {/* 痛点入口行 —— 带着问题来的人,第一屏就能找到自己的词。
              一行服务端渲染的 <a>,点一下直接进案例详情页。
              放在 hero 里而不是单开一个板块:痛点是多值维度(一篇挂 2~4 个),
              只能做入口层;分段轴留给单值的身份分组,一页只许有一个分段轴。 */}
          <div className="ca-entry">
            <span className="ca-entry-q">你在找哪个问题的答案？</span>
            <ul className="ca-entry-list">
              {USE_CASE_ORDER.map((u) => (
                <li key={u}>
                  <Link href={`/cases/${TAG_ENTRY[u]}`}>{u}<Arrow s={12} /></Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="ca-proof">
            <span>覆盖<b>综合体、园区、医院、轨道交通、工厂、联合办公</b></span>
            <span className="sep" />
            <span>每个案例都写明<b>适用与不适用的边界</b></span>
            <span className="sep" />
            <span>先在<b className="grad">自营物业公司</b>完整验证</span>
          </div>
        </div>
      </section>

      {/* 自营验证旗舰条(2026-08-17):原旗舰样板迁到 /company/aipm-validation 后,
          列表页一直没有它的入口。它不是客户案例,所以不进分组卡片,单列一条入口。
          标题用「省钱」框架不用「利润」框架(用户口径 2026-08-17:利润是给投资人看的,
          大众要听的是省了多少钱)。「少养 64 个管理岗」= 69-5,白名单数字的纯减法,零新增。 */}
      <section className="ca-band mist">
        <div className="wrap">
          <Link href="/company/aipm-validation" className="ca-flag">
            <div className="ca-flag-text">
              <span className="ca-flag-tag">自营验证 · 爱物管</span>
              <h2>同样的项目量，少养 64 个管理岗——省下来的全是人力成本</h2>
              <p>爱物管是启盟自营的物业公司。下面的客户案例开始之前，这套方法先在自己公司完整验证：日常管理动作交给 AI，省掉的是中间管理成本，一线服务一点没动。</p>
              <span className="ca-flag-go">看这笔账怎么算 <Arrow /></span>
            </div>
            <div className="ca-flag-stats">
              <div className="ca-flag-stat"><b>69 → 5</b><span>管理层人数</span></div>
              <div className="ca-flag-stat"><b>51 → 1</b><span>项目经理</span></div>
              <div className="ca-flag-stat"><b>3.4% → 14%</b><span>经营净利率</span></div>
            </div>
          </Link>
        </div>
      </section>

      {/* 身份分组 —— 全页唯一的分段轴。身份是单值的(一篇案例只属于一个分组,
          5+3+2+1=11 不重不漏),所以它能当分段轴;痛点是多值的,只做 hero 的入口行。
          原先「按问题找」的索引区已删:9 行目录说的和下面 11 张卡片是同一件事,
          目录站在内容前面,读者要先选两次才读到东西。详见 SKILL.md §3h。 */}
      {GROUPS.map((g, i) => (
        <section className={`ca-band${i % 2 ? " mist" : ""}`} id={g.id} key={g.id}>
          {i === 0 ? <span id="cases-list" className="ca-anchor" aria-hidden="true" /> : null}
          <div className="wrap">
            <div className={`ca-ghead${i % 2 ? " rev" : ""}`}>
              <div className="ca-ghead-media">
                <img src={g.img} alt={g.imgAlt} width={1024} height={768} loading={i === 0 ? "eager" : "lazy"} />
              </div>
              <div className="ca-ghead-text">
                <span className="ca-eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="ca-h2">{g.who}</h2>
                <p>{g.what}</p>
              </div>
            </div>
            {/* 孤儿卡片规则:4 张卡走 2×2,不许 3+1 */}
            <div className={`ca-list${g.slugs.length < 3 || g.slugs.length === 4 ? " two" : ""}`}>
              {g.slugs.map((s) => <Card key={s} c={getCase(s)} />)}
              {g.id === "for-park" ? (
                <Link className="ca-card ca-card-more" href="/cobuild">
                  <div className="ca-body">
                    <div className="ca-meta">政企共建</div>
                    <h3>在规划阶段就把智能化想清楚</h3>
                    <p className="ca-more-p">园区投资方与国有物业的共建路径——实证数字、三步走方法、以及智能化如何在原预算内启动。</p>
                    <span className="ca-go">了解政企共建 <Arrow /></span>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* 板块问答 — 白底:上一段(for-park,i=3)是雾底,斑马纹不许连续同底(§3 页面结构原则) */}
      <section className="ca-band">
        <div className="wrap">
          <div className="ca-faq-head">
            <h2 className="ca-h2">看完还有疑问？</h2>
            <p className="ca-faq-sub">关于这些案例，常被问到的几个问题。</p>
          </div>
          <div className="ca-faq">
            {BOARD_FAQ.map((f) => (
              <details className="ca-faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带你的难题来，<br />带一个 Agent 走</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          {/* 两扇门:重承诺的加速营 + 低承诺的直接提问。详见 _CaseShell.tsx 同段注释。 */}
          <div className="cta-row reveal">
            <div className="cta-btns">
              <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
              <Link href="/contact" className="btn btn-ghost">先问一个问题</Link>
            </div>
            <span className="alt">
              还没到预约那一步？把你的场景写下来，我们会认真读、尽快回，也可以直接打{" "}
              <a href="tel:02089853580">020-89853580</a>。
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
