import Link from "next/link";
import "./page.css";
import JsonLd from "@/components/JsonLd";
import CaseList from "./CaseList";
import { pageMetadata } from "@/lib/pageMetadata";

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const metadata = pageMetadata("/cases", {
  title: "客户案例 · 谁在用，哪个项目在用 | 启盟科技",
  description:
    "这里列出的每一个，都不是演示，而是已经在真实项目里运行的部署——综合体、智慧园区、集团总部、联合办公，把日常运营里的判断交给 FMClaw 物业智能体。",
});

// 板块通用问答(内容取自各案例的共性口径)
const BOARD_FAQ = [
  {
    q: "这些案例是真实项目，还是演示 demo？",
    a: "都是已经在真实项目里运行的部署——商业综合体、智慧园区、企业总部、物业集团、联合办公，每个案例都写明项目规模、做法和结果，数字来自真实经营。在服务客户之前，这套方法还在启盟自营的物业公司完成了完整验证。",
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

// 三角色导览：不同读者关心的事不同，把入口摆在最前面
const READER_GUIDE = [
  {
    who: "如果你在企业里负责行政、IT 或设施",
    what: "看员工报事报修、设备巡检安全、卫生间品质这几个单点切入的案例——不动现有平台、不换团队，从一个场景开始。",
    href: "#cases-list",
  },
  {
    who: "如果你在物业集团负责经营或数字化",
    what: "看智能体集团化落地、供应商对账、扭亏为盈这几个案例——500 个项目的规模化经验，和一个项目的账怎么算平。",
    href: "#cases-list",
  },
  {
    who: "如果你在规划园区或国有物业的智能化",
    what: "看 30 万㎡标杆园区——人、AI、机器人、传感器融合运营长什么样，以及智能化升级如何在原预算内启动。",
    href: "/cobuild",
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

export default function Page() {
  return (
    <main className="solcase">
      <JsonLd data={boardFaqLd} />
      <section className="ca-hero">
        <div className="ca-grid" aria-hidden="true" />
        <div className="wrap ca-hero-top">
          <span className="ca-kicker"><Link href="/">启盟科技</Link><i>/</i>客户案例</span>
          <h1 className="ca-h1">这里的每一个案例，<br /><span className="grad">都在真实项目里运行</span></h1>
          <p className="ca-lead">不是演示，而是<b>已经交付、正在运行</b>的部署——每个案例都写明项目规模、做法和结果。</p>
          <div className="ca-hero-cta">
            <a href="#cases-list" className="btn btn-primary">查看案例 <Arrow s={16} /></a>
          </div>
          <div className="ca-proof">
            <span>综合体 · 智慧园区 · 集团总部 · 联合办公</span>
            <span className="sep" />
            <span>覆盖 <b className="grad">全国多地</b></span>
          </div>
        </div>
      </section>

      {/* 三角色导览 */}
      <section className="ca-band">
        <div className="wrap">
          <div className="ca-guide" role="navigation" aria-label="按读者角色导览">
            {READER_GUIDE.map((g) => (
              <Link className="ca-guide-item" href={g.href} key={g.who}>
                <h2>{g.who}</h2>
                <p>{g.what}</p>
                <span className="ca-guide-go">去看 <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ca-band mist" id="cases-list">
        <div className="wrap">
          <CaseList />
        </div>
      </section>

      {/* 板块问答 */}
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
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
