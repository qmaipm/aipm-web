import Link from "next/link";
import "../scenarios.css";

export const metadata = {
  title: "管理层 AI 问询 · 能耗归因秒级回答 — FMClaw™ 加速营场景",
  description:
    "领导在钉钉 @ 一句问题，底层由 FMClaw 调数据、模型与 Skill 做能耗归因，秒级给出带原因的回答与简报，不换对话框。",
};

export default function Page() {
  return (
    <main className="scenario-page sc-green">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / 管理层问询</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>管理层问询</h1>
          <p className="lead reveal">领导在钉钉里 @ 一句"A 楼上月能耗为什么超标"，AI 做能耗归因，秒级给出带原因的回答与简报。</p>
        </div>
      </section>

      {/* 流程图 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">这件事，AI 接了哪一步</span></div>
          <div className="flowchart" style={{ marginTop: "46px" }}>
            <div className="fc reveal"><div className="lane">人原来怎么做</div>
              <h4>翻台账、拉数据、做分析</h4><p>领导问一句，下面人翻台账、拉数据、做分析，几天后回一份报告。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>底层归因、秒级作答</h4><p>底层调数据 / 模型 / Skill 做能耗归因，秒级给出带原因的回答与简报。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc last reveal"><div className="lane">人只需做最后那个决定</div>
              <h4>看结论，定下一步。</h4><p>拿到的是带原因的答案，而不是又一张要自己解读的表。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 简短说明 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">谁接了哪一步</span></div>
          <p className="note reveal">问询入口仍是钉钉对话框，用户不换工具；AI 在底层把能耗归因做完。人拿到的是带原因的结论与简报，省掉了中间翻数据、做分析那几天。</p>
        </div>
      </section>

      {/* 收口 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">想在你自己的数据上,<br />跑通这个场景?</h2>
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMClaw™ 加速营 →</Link></div>
        </div>
      </section>
    </main>
  );
}
