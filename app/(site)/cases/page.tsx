import Link from "next/link";
import "./page.css";
import JsonLd from "@/components/JsonLd";
import { getCase, type Case } from "./cases";
import { pageMetadata } from "@/lib/pageMetadata";

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const metadata = pageMetadata("/cases", {
  title: "客户案例 · 谁在用，哪个项目在用 | 启盟科技",
  description:
    "这里列出的每一个，都不是演示，而是已经在真实项目里运行的部署——综合体、智慧园区、集团总部、医院、轨道交通、工厂、联合办公，把日常运营里的判断交给 FMClaw 物业智能体。",
});

// 板块通用问答(内容取自各案例的共性口径)
const BOARD_FAQ = [
  {
    q: "这些案例是真实项目，还是演示 demo？",
    a: "都是已经在真实项目里运行的部署——商业综合体、智慧园区、企业总部、医院、轨道交通、工厂、物业集团、联合办公，每个案例都写明项目规模、做法和结果，数字来自真实经营。在服务客户之前，这套方法还在启盟自营的物业公司完成了完整验证。",
  },
  {
    q: "案例里的效果，我的项目能复制吗？",
    a: "能，但要讲顺序。可复制的路径是先让现场可见（部署 AIoT 感知）、再让流程自动跑完（AI 巡查、派单、验收），最后才谈人机怎么分工。不同项目起点不同，建议从你最痛的一两个环节切入，跑通了再扩展。",
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
    what: "从一个场景开始——员工报事报修、设备巡检安全、卫生间品质、多供应商保洁管理。不动现有平台、不换团队，先把你最头疼的那件事跑通。",
    slugs: ["property-group-chat-ai-service", "fmclaw-equipment-inspection", "restroom-quality", "gigafactory-4-vendor-cleaning"],
  },
  {
    id: "for-safety",
    img: "/cases/guide-safety.jpg",
    imgAlt: "地下设备机房里，一位身穿反光背心的工程师拿着平板巡检设备柜",
    who: "如果你负责医院、轨道交通或危化区域这类高安全等级场景",
    what: "这里的共同难题是漏修漏检——看三类场景怎么把「每一次巡检都真实发生」变成可核验的事实：医疗级服务标准、地铁机房日修日检、危化区域双人双岗巡查。",
    slugs: ["intl-hospital-medical-grade-fm", "metro-3400-rooms-daily-inspection", "hazardous-area-dual-person-patrol"],
  },
  {
    id: "for-group",
    img: "/cases/guide-group.jpg",
    imgAlt: "物业集团办公室里，两位负责人望向窗外的城市商务区",
    who: "如果你在物业集团负责经营或数字化",
    what: "看规模化的经验——智能体在 500 个项目集团化落地、跨三方的服务对账，以及一个亏损项目的账是怎么重新算平的。",
    slugs: ["property-group-auto-operation-report", "coworking-supplier-reconciliation", "south-china-mixed-use-6-to-1"],
  },
  {
    id: "for-park",
    img: "/cases/guide-park.jpg",
    imgAlt: "现代智慧园区的步道上，一台室外清洁机器人正在作业",
    who: "如果你在规划园区或国有物业的智能化",
    what: "看标杆园区的完整样子——人、AI、机器人、传感器怎么融合成一个整体运营，以及智能化升级如何在原预算内启动。",
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
  return (
    <Link className="ca-card" href={`/cases/${c.slug}`}>
      <div className="ca-cover" style={{ backgroundImage: c.cover }}><span className="ca-bar" /></div>
      <div className="ca-body">
        <div className="ca-meta">{c.industry} · {c.scale} · {c.location}</div>
        <h3>{c.title}</h3>
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
          <p className="ca-lead">不是演示，而是<b>已经交付、正在运行</b>的部署——每个案例都写明项目规模、做法和结果。</p>
          <div className="ca-hero-cta">
            <a href="#cases-list" className="btn btn-primary">查看案例 <Arrow s={16} /></a>
            <Link href="/workshop" className="btn btn-ghost">预约 FMClaw™ 加速营</Link>
          </div>
          <div className="ca-proof">
            <span>覆盖<b>综合体、园区、医院、轨道交通、工厂、联合办公</b></span>
            <span className="sep" />
            <span>每个案例都有<b>规模、做法和结果</b></span>
            <span className="sep" />
            <span>先在<b className="grad">自营物业公司</b>完整验证</span>
          </div>
        </div>
      </section>

      {/* 三个分组:角色导览即分组头,案例直接跟在下面 */}
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

      {/* 板块问答 */}
      <section className="ca-band mist">
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
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
