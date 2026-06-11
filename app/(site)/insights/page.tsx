import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "行业研究 · 给真正在做这件事的人 — 启盟科技",
  description:
    "写给物业总裁、政府决策者,和 AI 工程师。关于 Agent 架构、行业级平台、Skill 积累与物业 AI 落地的深度思考。",
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">行业研究</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>给真正在做这件事的人</h1>
          <p className="lead reveal">写给物业总裁、政府决策者,和 AI 工程师。这里的文章会写得长一点、深一点——因为这件事本身就不浅。</p>
        </div>
      </section>

      {/* 头条 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: "36px" }}>
            <span className="eyebrow reveal">头条</span>
          </div>
          <Link className="featured reveal" href="/insights/detail">
            <div className="cover"><div className="mesh"></div><span className="ftag">原理与架构</span></div>
            <div className="body">
              <div className="tag">FEATURED · 原理与架构</div>
              <h2>行业级 Agent 平台的三层本质 · 为什么时间是唯一入场费</h2>
              <p>很多团队以为做一个行业 Agent 平台,是买算力、调模型、拼接口。但真正决定成败的,是三层很难被绕过的东西——而它们,都需要时间来长成。</p>
              <div className="meta">潘晓良 · 2026 · 05 · 20 · 14 分钟阅读</div>
            </div>
          </Link>
        </div>
      </section>

      {/* 文章网格 */}
      <section className="band alt">
        <div className="wrap">
          <div className="tabs reveal">
            <span className="tab on">全部</span>
            <span className="tab">原理与架构</span>
            <span className="tab">行业政策</span>
            <span className="tab">案例深度</span>
            <span className="tab">技术工程</span>
          </div>

          <div className="casegrid reveal">
            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--blue)" }}></div></div>
              <div className="body">
                <div className="tag">原理与架构</div>
                <div className="metric">Agent 的四层架构 · 模型 / 工具 / 记忆 / 规划</div>
                <p className="ex">一个能干活的 Agent,从来不只是一个模型。它是四层叠起来的能力。</p>
                <div className="amd">潘晓良 · 2026 · 05 · 12 · 11 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--green)" }}></div></div>
              <div className="body">
                <div className="tag">技术工程</div>
                <div className="metric">自建 Agent 平台的四道墙</div>
                <p className="ex">自己搭一个 Agent 平台,会先后撞上四堵墙:模型、工程、数据、时间。</p>
                <div className="amd">潘晓良 · 2026 · 05 · 06 · 12 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--gold)" }}></div></div>
              <div className="body">
                <div className="tag">原理与架构</div>
                <div className="metric">行业级 Agent 平台的三层本质</div>
                <p className="ex">通用平台和行业平台的差别,藏在很难看见、也很难复制的三层里。</p>
                <div className="amd">潘晓良 · 2026 · 04 · 28 · 13 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--purple)" }}></div></div>
              <div className="body">
                <div className="tag">原理与架构</div>
                <div className="metric">Agent 生态 · 分层共生</div>
                <p className="ex">基座、平台、应用,不是谁吃掉谁,而是各自在自己的层上活下来。</p>
                <div className="amd">龚世海 · 2026 · 04 · 15 · 9 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--pink)" }}></div></div>
              <div className="body">
                <div className="tag">技术工程</div>
                <div className="metric">数据接入不是技术问题 · 是理解问题</div>
                <p className="ex">把数据接进来很容易,难的是知道这条数据到底意味着什么。</p>
                <div className="amd">潘晓良 · 2026 · 04 · 02 · 10 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--blue)" }}></div></div>
              <div className="body">
                <div className="tag">技术工程</div>
                <div className="metric">Skill 是能力的最小积累单位 · 而不是代码</div>
                <p className="ex">真正会沉淀下来的,不是某段代码,而是一个个可被复用的 Skill。</p>
                <div className="amd">潘晓良 · 2026 · 03 · 21 · 11 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--green)" }}></div></div>
              <div className="body">
                <div className="tag">原理与架构</div>
                <div className="metric">Agent 时代的协作本质是数据接力</div>
                <p className="ex">人和 Agent、Agent 和 Agent 之间的协作,本质是一次次数据的交接。</p>
                <div className="amd">龚世海 · 2026 · 03 · 08 · 9 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--gold)" }}></div></div>
              <div className="body">
                <div className="tag">行业政策</div>
                <div className="metric">从 K 类到 I 类 · 物业 AI 的产业归属</div>
                <p className="ex">物业 AI 到底算什么产业?这个归属问题,关系到政策怎么落、资源往哪走。</p>
                <div className="amd">龚世海 · 2026 · 02 · 24 · 10 分钟</div>
              </div>
            </Link>

            <Link className="case-card hover" href="/insights/detail">
              <div className="cover"><div className="bar" style={{ background: "var(--purple)" }}></div></div>
              <div className="body">
                <div className="tag">案例深度</div>
                <div className="metric">为什么物业是 AI 落地的最佳场景</div>
                <p className="ex">真实、连续、重复、离不开人——这正是 AI 最该来、也最帮得上的地方。</p>
                <div className="amd">龚世海 · 2026 · 02 · 10 · 12 分钟</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 订阅 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">订阅</span>
            <h2 className="reveal">想读到下一篇。</h2>
            <p className="sub reveal">我们写得不快,但每一篇都想写得值得读。新文章发布时,给你提个醒。</p>
          </div>
          <div className="sub-grid reveal">
            <div>
              <form className="subform">
                <input type="email" placeholder="你的邮箱" aria-label="邮箱" />
                <button className="btn btn-primary" type="submit">订阅 <svg className="ar" width="14" height="14" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              </form>
              <p style={{ fontSize: "13px", color: "var(--mut)", marginTop: "14px" }}>只发新文章,不发广告。随时可退订。</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="ins-qr">微信公众号<br />二维码<br />placeholder</div>
              <p style={{ fontSize: "13px", color: "var(--mut)", marginTop: "12px" }}>或扫码关注公众号</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
