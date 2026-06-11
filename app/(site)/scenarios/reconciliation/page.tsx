import Link from "next/link";
import "../scenarios.css";

export const metadata = {
  title: "物业 AI 对账 · 供应商自动核量对账 — FMAI 工作坊场景",
  description:
    "供应商对账：AI 按合同自动核量、对比历史与市场行情、圈出异常、生成账单草稿，人只做确认或驳回。",
};

export default function Page() {
  return (
    <main className="scenario-page sc-amber">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMAI 工作坊</Link> / 适用场景 / AI 对账</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>AI 对账</h1>
          <p className="lead reveal">按合同自动核量、对比历史与市场、圈出异常、生成账单草稿，人只需确认或驳回。</p>
        </div>
      </section>

      {/* 流程图 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">这件事，AI 接了哪一步</span></div>
          <div className="flowchart" style={{ marginTop: "46px" }}>
            <div className="fc reveal"><div className="lane">人原来怎么做</div>
              <h4>一笔笔核量、翻合同、比价</h4><p>月度对账要好几天，逐笔核量、翻合同、比价格，前后口径常对不上。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>核量、比对、圈异常、起草</h4><p>按合同自动核量，对比历史与市场，圈出异常，生成账单草稿。</p><svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc last reveal"><div className="lane">人只需做最后那个决定</div>
              <h4>对草稿，确认或驳回。</h4><p>账单最终拍板在人，AI 把草稿和异常都摆好。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 简短说明 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">谁接了哪一步</span></div>
          <p className="note reveal">AI 接了核量、比对、找异常、起草这几步；人保留对账单的最终确认。它不替换财务流程，只把一份能直接看的草稿和被圈出的异常提前备好。</p>
          <p className="reveal" style={{ marginTop: "22px" }}><Link href="/solutions/vendor" style={{ color: "var(--accent)", fontWeight: 600 }}>看完整解决方案 →</Link></p>
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
