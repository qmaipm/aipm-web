import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "客户案例 · 谁在用，哪个项目在用 — 启盟科技",
  description:
    "这里列出的每一个，都不是演示，而是已经在真实项目里运行的部署。综合体与写字楼项目，把日常运营里的判断交给 Agent。",
};

export default function Page() {
  return (
    <main className="cases-page">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">客户案例</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>谁在用，哪个项目在用</h1>
          <p className="lead reveal">这里列出的每一个，都不是演示，而是已经在真实项目里运行的部署。</p>
          <div className="case-stats reveal">
            <span><b>2</b> 个在运行项目</span>
            <span className="sep" aria-hidden>·</span>
            <span><b>约 13 万㎡</b> 在管面积</span>
            <span className="sep" aria-hidden>·</span>
            <span>华南</span>
          </div>
        </div>
      </section>

      {/* CASE LIST */}
      <section className="band alt">
        <div className="wrap">
          <div className="caselist-head reveal">
            <h2>在运行的项目</h2>
            <div className="tabs">
              <span className="tab on">全部</span>
              <span className="tab">写字楼</span>
              <span className="tab">综合体</span>
            </div>
          </div>

          <div className="caselist reveal">
            <Link className="caserow" href="/cases/detail">
              <div className="cr-cover" style={{ backgroundImage: "linear-gradient(135deg,rgba(0,112,255,.22),rgba(18,185,138,.22)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=70&auto=format&fit=crop')" }}>
                <span className="cr-bar" />
              </div>
              <div className="cr-body">
                <div className="cr-meta">综合体 · 华南 · 约 6 万㎡</div>
                <h3>一个项目，跑成了自治运营</h3>
                <p>日常运营里反复出现的判断交给 Agent 处理，现场团队只保留必须由人完成的执行。</p>
                <span className="cr-go">读这个项目 <Arrow /></span>
              </div>
            </Link>

            <Link className="caserow" href="/cases/detail">
              <div className="cr-cover" style={{ backgroundImage: "linear-gradient(135deg,rgba(18,185,138,.22),rgba(0,112,255,.22)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=70&auto=format&fit=crop')" }}>
                <span className="cr-bar" />
              </div>
              <div className="cr-body">
                <div className="cr-meta">写字楼 · 华南 · 约 7 万㎡ · 5 年合同</div>
                <h3>缴费、对账、账单，由 Agent 跑通</h3>
                <p>一笔预算覆盖五年，缴费率提升到约 99%，账目全程可追溯。</p>
                <span className="cr-go">读这个项目 <Arrow /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带你的难题来，带一个 Agent 走</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
