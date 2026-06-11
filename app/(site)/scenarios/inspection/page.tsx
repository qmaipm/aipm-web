import Link from "next/link";
import "../scenarios.css";

export const metadata = {
  title: "物业 AI 质检 · 视觉评分全量留痕 — FMAI 工作坊场景",
  description:
    "工单照片视频自动采集，AI 视觉按统一标准评分打标，结构化标签全量留痕证据链，人只看异常。",
};

export default function Page() {
  return (
    <main className="scenario-page sc-green">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMAI 工作坊</Link> / 适用场景 / AI 质检</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>AI 质检</h1>
          <p className="lead reveal">工单照片 / 视频自动采集，AI 视觉按统一标准评分打标，全量留痕证据链，人只看异常。</p>
        </div>
      </section>

      {/* 流程图 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">这件事，AI 接了哪一步</span></div>
          <div className="flowchart" style={{ marginTop: "46px" }}>
            <div className="fc reveal"><div className="lane">人原来怎么做</div>
              <h4>人工抽检、口径不一</h4><p>人工抽检覆盖有限、口径因人而异，事后难以还原是怎么判的。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>全量采集、统一评分打标</h4><p>自动采集照片 / 视频，按统一标准评分打标，结构化留痕，形成可回溯证据链。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc last reveal"><div className="lane">人只需做最后那个决定</div>
              <h4>只看被标出的异常。</h4><p>全量看一遍由 AI 做，人把精力放在异常上。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 简短说明 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">谁接了哪一步</span></div>
          <p className="note reveal">AI 接了"全量看一遍、按同一把尺子打分"这件人做不到的事；人把精力收到异常上。它不替代人工判断，而是补上覆盖面，让每一次服务都留下可回看的证据。</p>
          <p className="reveal" style={{ marginTop: "22px" }}><Link href="/solutions/quality" style={{ color: "var(--accent)", fontWeight: 600 }}>看完整解决方案 →</Link></p>
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
