import Link from "next/link";
import "../scenarios.css";

export const metadata = {
  title: "物业水电费 AI 审批 · 抄表核对自动化 — FMAI 工作坊场景",
  description:
    "水电费审批从 4 个岗位 5–7 天压到半小时：AI 自动核表、做环比同比、标出异常，给出该签 / 不该签的依据，人只做最后确认。",
};

export default function Page() {
  return (
    <main className="scenario-page sc-amber">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMAI 工作坊</Link> / 适用场景 / 水电费审批</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>水电费审批</h1>
          <p className="lead reveal">签字那一刻，AI 已核完表、做完环比同比、标好异常，并给出该签 / 不该签的依据。</p>
        </div>
      </section>

      {/* 流程图 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">这件事，AI 接了哪一步</span></div>
          <div className="flowchart" style={{ marginTop: "46px" }}>
            <div className="fc reveal"><div className="lane">人原来怎么做</div>
              <h4>4 个岗位、5–7 天</h4><p>抄表、核对、测算、审批在多个岗位之间流转，签字时多凭经验，前后口径常对不上。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>核表、比对、标异常、给依据</h4><p>AI 自动核表，做环比同比，标出异常，并给出该签 / 不该签的依据。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc last reveal"><div className="lane">人只需做最后那个决定</div>
              <h4>看依据，确认或驳回。</h4><p>签不签由人定，AI 只把判断需要的东西提前备齐。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 简短说明 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">谁接了哪一步</span></div>
          <p className="note reveal">AI 接了核表、环比同比、找异常这几步繁重的活；人保留了最后那个"签不签"的决定。它不替换原有审批流程，只把判断需要的依据提前备好，让一次签字从凭经验变成有据可依。</p>
        </div>
      </section>

      {/* 收口 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">想在你自己的数据上,<br />跑通这个场景?</h2>
          <p className="reveal">带上你的真实数据，来一次 FMAI 工作坊，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMAI 工作坊 →</Link></div>
        </div>
      </section>
    </main>
  );
}
