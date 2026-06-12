import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";

export const metadata = {
  title: "AI 报修客服 · 7×24 守群自动派单 — FMClaw™ 加速营场景",
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
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / 报修智能客服</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>报修智能客服</h1>
          <p className="lead reveal">平台 Bot 7×24 守群不漏单，FMClaw 自动派单不到 1 分钟，下单人与接单人双向通知闭环。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="几十个群 · 人工守候"
        metricAfter="派单 < 1 分钟"
        before={[
          { st: "守群", h: "客服盯几十个群", p: "报修散在钉钉 / 飞书 / 企微群。", tag: "分身乏术 · 遗漏" },
          { st: "记单", h: "手工整理对话录入", p: "把对话抄成工单。", tag: "慢 · 错单 · 字段不齐" },
          { st: "派单跟踪", h: "打电话找工程", p: "做完再人工通知业主。", tag: "链路长 · 没反馈 · 投诉" },
        ]}
        after={[
          { st: "守群", h: "平台 Bot 7×24 守群", p: "自动识别报修意图写入多维表。", tag: "不遗漏 · 不睡觉" },
          { st: "读表", h: "FMClaw 拉多维表", p: "生成标准化工单 + 现场照片。", tag: "即时 · 准确" },
          { st: "派单通知", h: "Skill 派单 + 工具双向通知", p: "派单规则匹配，下单接单双向回执。", tag: "派单 < 1 分钟 · 闭环" },
        ]}
        gains={[
          { k: "不遗漏", b: "客服守不住几十个群，漏单", a: "平台 Bot 7×24 守群，一条不漏" },
          { k: "不延迟", b: "记单、派单、跟踪，链路长", a: "派单 < 1 分钟，自动通知" },
          { k: "有反馈", b: "客户无反馈，投诉升级", a: "下单人 + 接单人双向通知，闭环" },
        ]}
      />

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
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMClaw™ 加速营 →</Link></div>
        </div>
      </section>
    </main>
  );
}
