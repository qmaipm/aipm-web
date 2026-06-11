import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "新闻动态 — 启盟科技",
  description: "启盟科技的融资、签约、媒体报道、获奖与发布会动态。",
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">新闻动态</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>新闻动态</h1>
          <p className="lead reveal">公司层面值得记录的事,都放在这里。我们倾向于把它说成事实,而不是说成故事。</p>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className="band">
        <div className="wrap">
          <div className="tabs reveal">
            <span className="tab on">全部</span>
            <span className="tab">融资</span>
            <span className="tab">签约</span>
            <span className="tab">媒体报道</span>
            <span className="tab">获奖</span>
            <span className="tab">发布会</span>
          </div>

          <div className="newslist reveal">
            <a className="news-item" href="#">
              <div className="date">2026 · 04 · 18</div>
              <div>
                <span className="tag">发布会</span>
                <h3>FMClaw™ AI 平台 v2.0 正式发布</h3>
                <p>新版本围绕 Agentic 架构与五大模块重构,把更多日常运营环节交给可调用的 Agent。</p>
              </div>
              <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>

            <a className="news-item" href="#">
              <div className="date">2026 · 02 · 25</div>
              <div>
                <span className="tag">融资</span>
                <h3>启盟科技完成新一轮融资</h3>
                <p>本轮资金主要用于 AI 基座研发与 FDE 团队建设。具体细节将在合适的时候补充。</p>
              </div>
              <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>

            <a className="news-item" href="#">
              <div className="date">2025 · 12 · 09</div>
              <div>
                <span className="tag">签约</span>
                <h3>与某区域物业集团达成 AI 运营合作</h3>
                <p>双方将在外包管理与质量考评场景上,共同推进一批真实业务的 Agent 落地。</p>
              </div>
              <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>

            <a className="news-item" href="#">
              <div className="date">2025 · 10 · 31</div>
              <div>
                <span className="tag">媒体报道</span>
                <h3>媒体专访:物业为什么是 AI 落地的好场景</h3>
                <p>我们和媒体聊了聊,为什么真实、连续、重复的运营工作,正是 AI 最能帮上忙的地方。</p>
              </div>
              <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>

            <a className="news-item" href="#">
              <div className="date">2025 · 08 · 14</div>
              <div>
                <span className="tag">获奖</span>
                <h3>入选某年度智慧设施管理创新案例</h3>
                <p>一项基于真实业务跑通的 Agent 工作流,入选行业年度创新案例名录。</p>
              </div>
              <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>

          <p className="sub-line reveal" style={{ marginTop: "48px" }}>想及时收到这些动态,可关注我们的 <Link href="/contact">微信公众号</Link>。</p>
        </div>
      </section>
    </main>
  );
}
