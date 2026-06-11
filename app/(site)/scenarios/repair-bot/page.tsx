import Link from "next/link";
import "../scenarios.css";

export const metadata = {
  title: "AI 报修客服 · 7×24 守群自动派单 — FMAI 工作坊场景",
  description:
    "报修消息进群，平台 Bot 7×24 守群不漏单，FMClaw 自动派单不到 1 分钟，下单人与接单人双向通知，闭环可追溯。",
};

export default function Page() {
  return (
    <main className="scenario-page sc-blue">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMAI 工作坊</Link> / 适用场景 / 报修智能客服</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>报修智能客服</h1>
          <p className="lead reveal">平台 Bot 7×24 守群不漏单，FMClaw 自动派单不到 1 分钟，下单人与接单人双向通知闭环。</p>
        </div>
      </section>

      {/* 流程图 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">这件事，AI 接了哪一步</span></div>
          <div className="flowchart" style={{ marginTop: "46px" }}>
            <div className="fc reveal"><div className="lane">人原来怎么做</div>
              <h4>盯群、记录、打电话派人</h4><p>报修散在群里，靠人盯消息、手工记录，再一个个电话找人，容易漏单。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>守群采集、自动派单、双向通知</h4><p>平台 Bot 7×24 守群不漏单，FMClaw 自动定位与派单（不到 1 分钟），下单人与接单人双向通知。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc last reveal"><div className="lane">人只需做最后那个决定</div>
              <h4>异常时介入。</h4><p>平时只看闭环结果，派错或卡住时再出手。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 简短说明 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">谁接了哪一步</span></div>
          <p className="note reveal">对话还在你原来的钉钉 / 飞书群里，AI 接的是"守群—接单—派单—通知"这一段；人只在派错或异常时介入。原有协作平台不替换，FMClaw 只补上业务闭环那一截。</p>
          <p className="reveal" style={{ marginTop: "22px" }}><Link href="/solutions/operations" style={{ color: "var(--accent)", fontWeight: 600 }}>看完整解决方案 →</Link></p>
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
