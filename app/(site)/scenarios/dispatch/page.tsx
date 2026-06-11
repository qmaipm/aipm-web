import Link from "next/link";
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

      {/* 流程图 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">这件事，AI 接了哪一步</span></div>
          <div className="flowchart" style={{ marginTop: "46px" }}>
            <div className="fc reveal"><div className="lane">人原来怎么做</div>
              <h4>找人、凭经验派、打电话催</h4><p>接到工单先找人，凭经验决定派给谁，再电话催，超时了才发现。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>定位、定级、按负载派单</h4><p>自动定位与定级，按技能和负载派给合适的人，超时自动升级。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc last reveal"><div className="lane">人只需做最后那个决定</div>
              <h4>确认，或改派。</h4><p>派给谁、为什么、超时怎么办都摆好了，人只做确认或改派。</p>
            </div>
          </div>
        </div>
      </section>

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
