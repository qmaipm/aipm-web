import Link from "next/link";
import "./page.css";

export default function VendorPage() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal">
            <Link href="/agents">解决方案</Link> / AI 供应商管理与自动对账
          </div>
          <span className="eyebrow reveal">解决方案 · AI 供应商管理与自动对账</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>
            供应商对账,<br />这件事可以不靠人盯。
          </h1>
          <p className="lead reveal">合同、工作量、价格，本来要一笔笔翻一笔笔核。让 Agent 先核完，你只看结论。</p>
        </div>
      </section>

      {/* WHAT PROBLEM */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">这是什么问题</span>
          </div>
          <p className="statement reveal">对账周期长、口径不一、合同条款散落、容易出错——甲方与物业公司都在这件事上耗人。</p>
        </div>
      </section>

      {/* HOW WE SOLVE */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">我们怎么解</span>
            <h2 className="reveal">把每一笔该不该付,先说清楚。</h2>
            <p className="sub reveal">把几项能力拼在一起，让对账有据、出账有理。</p>
          </div>
          <div className="grid c3" style={{ marginTop: 48 }}>
            <div className="card reveal">
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <h3>质量考评</h3>
              <p>服务做得好不好，按统一标准给出评价，作为该不该付的依据之一。</p>
            </div>
            <div className="card reveal">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <h3>工作量考评</h3>
              <p>到底干了多少，按记录与口径自动核出来，不靠人估。</p>
            </div>
            <div className="card reveal">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <h3>自动出账单</h3>
              <p>核完之后直接生成账单草稿，每一笔都附上算法和理由。</p>
            </div>
            <div className="card reveal">
              <div className="k" style={{ background: "var(--purple)" }}></div>
              <h3>合同约束校验</h3>
              <p>对照合同条款逐项校验，单价、范围、上限是否相符，一眼看清。</p>
            </div>
          </div>

          <div className="tag mono reveal">
            场景 · <b>对账</b>
          </div>
          <div
            className="reveal"
            style={{
              border: "1px solid var(--line)",
              borderLeft: "3px solid var(--gold)",
              borderRadius: "0 14px 14px 0",
              background: "var(--paper)",
              padding: "22px 26px",
              maxWidth: "var(--measure)",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 22px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "15.5px", color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "44ch" }}>
              按合同自动核量、对比历史与市场、圈出异常、生成账单草稿，人只需确认或驳回。
            </p>
            <span style={{ display: "flex", gap: 18, flex: "none", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>
              <Link href="/workshop" style={{ color: "var(--gold)" }}>看完整场景 →</Link>
              <Link href="/workshop" style={{ color: "var(--ink)" }}>来工作坊跑通它 →</Link>
            </span>
          </div>
        </div>
      </section>

      {/* WHO SOLVED IT */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">谁用它解过</span>
            <h2 className="reveal">已经在运行的项目。</h2>
          </div>
          <div className="grid c2" style={{ marginTop: 48 }}>
            <Link className="card lk hover reveal" href="/cases">
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <div className="meta">甲方 · 多供应商</div>
              <h3>把几天一版的对账，变成看一眼就能确认</h3>
              <p>
                按合同自动核量、圈出异常、生成账单草稿，对账有了一致口径。
                <span style={{ color: "var(--blue)" }}> 看这个项目 →</span>
              </p>
            </Link>
            <Link className="card lk hover reveal" href="/cases">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <div className="meta">物业公司 · 结算</div>
              <h3>让每一笔该不该付，都说得出理由</h3>
              <p>
                合同校验接上结算流程，确认或驳回都有据可循。
                <span style={{ color: "var(--green)" }}> 看这个项目 →</span>
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* END CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">
            把这件事,<br />用一次工作坊跑通。
          </h2>
          <p className="reveal">带上你的真实数据来。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">
              预约 FMClaw™ 加速营 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
