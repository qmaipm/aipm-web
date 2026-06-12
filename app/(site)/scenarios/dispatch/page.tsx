import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";

export const metadata = {
  title: "物业智能派单 · 自动定级按负载派单 — FMClaw™ 加速营场景",
  description:
    "工单进来自动定位、定级，按技能与负载派给合适的人，超时自动升级，人只需确认或改派。",
};

export default function Page() {
  return (
    <main className="scenario-page sc-blue">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / 智能派单</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>智能派单</h1>
          <p className="lead reveal">工单进来自动定位、定级，按技能与负载派给合适的人，超时自动升级，人只需确认或改派。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="凭经验派 · 电话催"
        metricAfter="规则自动派 · 超时升级"
        before={[
          { st: "找人", h: "接单先找谁派", p: "在脑子里想派给谁。", tag: "凭经验" },
          { st: "派单", h: "打电话分活", p: "忙闲不均、容易漏派。", tag: "慢 · 漏派" },
          { st: "跟踪", h: "靠人催", p: "超时了才发现。", tag: "没反馈" },
        ]}
        after={[
          { st: "定位定级", h: "自动定位、定级", p: "工单进来即判等级与位置。", tag: "即时" },
          { st: "派单", h: "按技能与负载派", p: "派给合适的人。", tag: "均衡" },
          { st: "通知跟踪", h: "双向通知 + 超时升级", p: "派给谁、为什么、超时怎么办都摆好。", tag: "闭环" },
        ]}
        gains={[
          { k: "更快", b: "找人、打电话，慢", a: "工单进来即定级派出" },
          { k: "更均衡", b: "凭经验，忙闲不均", a: "按技能与负载分配" },
          { k: "闭环", b: "超时才发现，没反馈", a: "双向通知，超时自动升级" },
        ]}
      />

      {/* 简短说明 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">谁接了哪一步</span></div>
          <p className="note reveal">AI 接了派给谁、为什么是他、超时怎么办；人保留确认与改派的权力。它把散在各人脑子里的调度判断，收拢成一处看得见、可追溯的派单。</p>
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
