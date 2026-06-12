import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";

export const metadata = {
  title: "物业 AI 质检 · 视觉评分全量留痕 — FMClaw™ 加速营场景",
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
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / AI 质检</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>AI 质检</h1>
          <p className="lead reveal">工单照片 / 视频自动采集，AI 视觉按统一标准评分打标，全量留痕证据链，人只看异常。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="人工抽检 · 覆盖有限"
        metricAfter="全员全程 · 全量留痕"
        before={[
          { st: "抽检", h: "人工抽一部分", p: "靠人挑着看几单。", tag: "覆盖有限" },
          { st: "打分", h: "凭印象判", p: "口径因人而异。", tag: "不一致" },
          { st: "追溯", h: "事后难还原", p: "说不清当时是怎么判的。", tag: "没证据" },
        ]}
        after={[
          { st: "采集", h: "照片 / 视频自动采集", p: "每一次服务都进来。", tag: "全量" },
          { st: "评分", h: "AI 视觉按统一标准评分打标", p: "采样跟着现场数据智能调度。", tag: "一把尺子" },
          { st: "留痕", h: "结构化标签 + 评分成证据链", p: "每一分都挂着可回看的照片。", tag: "可回溯" },
        ]}
        gains={[
          { k: "全量", b: "抽样里碰运气", a: "覆盖全员、全程，每一次都看" },
          { k: "公平", b: "松紧因人而异", a: "同一把尺子，由事实决定抽查" },
          { k: "可追溯", b: "结论后面没有依据", a: "评分背后都挂着证据链" },
        ]}
      />

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
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMClaw™ 加速营 →</Link></div>
        </div>
      </section>
    </main>
  );
}
