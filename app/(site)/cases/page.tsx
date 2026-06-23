import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "客户案例 · 谁在用，哪个项目在用 — 启盟科技",
  description:
    "这里列出的每一个，都不是演示，而是已经在真实项目里运行的部署。综合体与写字楼项目，把日常运营里的判断交给 Agent。",
};

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const cases = [
  {
    href: "/cases/detail",
    cover: "linear-gradient(135deg,rgba(0,112,255,.22),rgba(18,185,138,.22)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=70&auto=format&fit=crop')",
    meta: "综合体 · 华南 · 约 6 万㎡",
    title: "一个项目，跑成了自治运营",
    body: "日常运营里反复出现的判断交给 Agent 处理，现场团队只保留必须由人完成的执行。",
  },
  {
    href: "/cases/office",
    cover: "linear-gradient(135deg,rgba(18,185,138,.22),rgba(0,112,255,.22)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=70&auto=format&fit=crop')",
    meta: "写字楼 · 华南 · 约 7 万㎡ · 5 年合同",
    title: "缴费、对账、账单，由 Agent 跑通",
    body: "一笔预算覆盖五年，缴费率提升到约 99%，账目全程可追溯。",
  },
];

export default function Page() {
  return (
    <main className="solcase">
      {/* HERO */}
      <section className="ca-hero">
        <div className="ca-grid" aria-hidden="true" />
        <div className="wrap ca-hero-top">
          <span className="ca-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>客户案例
          </span>
          <h1 className="ca-h1">
            谁在用，<br /><span className="grad">哪个项目在用</span>
          </h1>
          <p className="ca-lead">这里列出的每一个，都不是演示，而是<b>已经在真实项目里运行</b>的部署。</p>
          <div className="ca-proof">
            <span><b>2</b> 个在运行项目</span>
            <span className="sep" />
            <span><b className="grad">约 13 万㎡</b> 在管面积</span>
            <span className="sep" />
            <span>华南</span>
          </div>
        </div>
      </section>

      {/* CASE LIST */}
      <section className="ca-band mist">
        <div className="wrap">
          <div className="ca-listhead">
            <h2 className="ca-h2">在运行的项目</h2>
            <div className="ca-tabs">
              <span className="ca-tab on">全部</span>
              <span className="ca-tab">写字楼</span>
              <span className="ca-tab">综合体</span>
            </div>
          </div>

          <div className="ca-list">
            {cases.map((c) => (
              <Link className="ca-card" href={c.href} key={c.title}>
                <div className="ca-cover" style={{ backgroundImage: c.cover }}>
                  <span className="ca-bar" />
                </div>
                <div className="ca-body">
                  <div className="ca-meta">{c.meta}</div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  <span className="ca-go">读这个项目 <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
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
