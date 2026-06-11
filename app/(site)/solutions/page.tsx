import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "解决方案 · 按问题来,不按部门来 — 启盟科技",
  description:
    "解决方案是针对一个具体问题、把多种能力拼成的现成方案。按 Agent 职能,也按行业痛点,从一件真实业务开始。",
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">解决方案</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>按问题来,不按部门来</h1>
          <p className="lead reveal">解决方案是针对一个具体问题、把多种能力拼成的现成方案。</p>
        </div>
      </section>

      {/* BY AGENT FUNCTION */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">按 Agent 职能</span>
            <h2 className="reveal">从一项日常工作开始。</h2>
            <p className="sub reveal">每一个,都是把一类工作里的判断,交给对应的 Agent 替你想好。</p>
          </div>
          <div className="grid c2" style={{ marginTop: "48px" }}>
            <Link className="card lk hover reveal" href="/solutions/service-design">
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <h3>服务设计<svg className="ar" width="16" height="16" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></h3>
              <p>把一处楼宇或园区该有的服务，按真实需求一项项排好。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/operations">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <h3>运营管理<svg className="ar" width="16" height="16" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></h3>
              <p>把每天散在很多人脑子里的调度与判断，收拢成一处看得见的运营。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/quality">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <h3>质量评估<svg className="ar" width="16" height="16" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></h3>
              <p>把服务做得好不好这件事，用同一把尺子说清楚。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions/optimization">
              <div className="k" style={{ background: "var(--purple)" }}></div>
              <h3>服务优化<svg className="ar" width="16" height="16" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></h3>
              <p>把这一阵子发生过的事看一遍，找出下一步可以做得更好的地方。</p>
            </Link>
          </div>
          <p className="reveal" style={{ marginTop: "30px" }}><Link href="/agents" style={{ color: "var(--blue)", fontWeight: 600 }}>看四个 Agent 如何构成一个闭环 →</Link></p>
        </div>
      </section>

      {/* BY INDUSTRY PAIN */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">按行业痛点</span>
            <h2 className="reveal">从一件最耗人的事开始。</h2>
            <p className="sub reveal">痛点类方案处于 MVP 阶段，先搭好架子，再逐个补齐。</p>
          </div>
          <div className="grid c3" style={{ marginTop: "48px" }}>
            <Link className="card lk hover reveal" href="/solutions/vendor">
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <h3>AI 供应商管理与自动对账<svg className="ar" width="16" height="16" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></h3>
              <p>供应商对账这件事，可以不靠人一笔笔盯。</p>
            </Link>
            <Link className="card lk hover reveal" href="/solutions">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <h3>外包管理与质量考评</h3>
              <p>把外包队伍干得怎么样，用一套可对照的标准看清楚。</p>
              <span className="tagm"><i></i>示范建设中</span>
            </Link>
            <Link className="card lk hover reveal" href="/solutions">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <h3>AI 账单</h3>
              <p>把该收该付的每一笔，按口径自动算出来、说明白。</p>
              <span className="tagm"><i></i>示范建设中</span>
            </Link>
          </div>
          <p className="calmline reveal">不确定属于哪一类？<a href="/#tri">先看看你是业主、物业公司，还是开发者 →</a></p>
        </div>
      </section>

      {/* END CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把这件事,<br />用一次工作坊跑通。</h2>
          <p className="reveal">带上你的真实数据来。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
