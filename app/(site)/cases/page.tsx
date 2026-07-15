import Link from "next/link";
import "./page.css";
import { getFlagship } from "./cases";
import CaseList from "./CaseList";
import { pageMetadata } from "@/lib/pageMetadata";

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const metadata = pageMetadata("/cases", {
  title: "客户案例 · 谁在用，哪个项目在用 — 启盟科技",
  description:
    "这里列出的每一个，都不是演示，而是已经在真实项目里运行的部署——综合体、智慧园区、集团总部、联合办公，把日常运营里的判断交给 FMClaw 物业智能体。",
});

// 板块通用问答(草稿:无专稿,内容取自各案例的共性口径,供审阅)
const BOARD_FAQ = [
  {
    q: "这些案例是真实项目，还是演示 demo？",
    a: "都是已经在真实项目里运行的部署——综合体、智慧园区、集团总部、联合办公，以及启盟自营的物业公司爱物管。案例里的数字来自真实经营，其中自营验证数据为小规模 0-1 结果，非行业普遍值。",
  },
  {
    q: "案例里的效果，我的项目能复制吗？",
    a: "能，但要讲顺序。可复制的路径是先让现场可见（部署 AIoT 感知）、再让流程自动闭环（AI 巡查、派单、验收），最后才谈人机怎么分工。不同项目起点不同，建议先做一次管理潜力诊断，从最痛的一两个环节切入。",
  },
  {
    q: "想开始的话，第一步做什么？",
    a: "带上你自己的一个真实业务场景，预约 FMClaw 加速营，用你的数据在现场跑通第一件事，再决定要不要扩展。",
  },
];

export default function Page() {
  const flagship = getFlagship();

  return (
    <main className="solcase">
      <section className="ca-hero">
        <div className="ca-grid" aria-hidden="true" />
        <div className="wrap ca-hero-top">
          <span className="ca-kicker"><Link href="/">启盟科技</Link><i>/</i>客户案例</span>
          <h1 className="ca-h1">一个人，<br /><span className="grad">管起过去 51 个人都管不动的事</span></h1>
          <p className="ca-lead">这里列出的每一个，都不是演示，而是<b>已经在真实项目里运行</b>的部署。</p>
          <div className="ca-hero-cta">
            <Link href="/cases/aipm-property-ai-transformation" className="btn btn-primary">查看案例 <Arrow s={16} /></Link>
          </div>
          <div className="ca-proof">
            <span>综合体 · 智慧园区 · 集团总部 · 联合办公</span>
            <span className="sep" />
            <span>覆盖 <b className="grad">全国多地</b></span>
          </div>
        </div>
      </section>

      {/* 旗舰样板专属区 */}
      {flagship ? (
        <section className="ca-band">
          <div className="wrap">
            <span className="ca-flag-eyebrow">旗舰样板 · 自营验证</span>
            <Link className="ca-flag" href={`/cases/${flagship.slug}`}>
              <div className="ca-flag-media" style={{ backgroundImage: `url('${flagship.coverImg}')` }} aria-hidden="true">
                <span className="ca-flag-bar" />
              </div>
              <div className="ca-flag-body">
                <div className="ca-flag-meta">{flagship.industry} · {flagship.location}</div>
                <h2 className="ca-flag-h">{flagship.listTitle ?? flagship.title}</h2>
                <p className="ca-flag-lead">{flagship.lead}</p>
                <div className="ca-flag-metrics">
                  {flagship.metrics.map((m) => (
                    <div className="ca-flag-metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>
                  ))}
                </div>
                <span className="ca-flag-go">查看完整范例 <Arrow /></span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="ca-band mist">
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
