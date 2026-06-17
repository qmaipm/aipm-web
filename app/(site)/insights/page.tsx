import Link from "next/link";
import "./page.css";
import SubscribeForm from "../_components/SubscribeForm";

export const metadata = {
  title: "行业研究 · 给真正在做这件事的人 — 启盟科技",
  description:
    "写给物业总裁、政府决策者,和 AI 工程师。关于 Agent 架构、行业级平台、Skill 积累与物业 AI 落地的深度思考。",
};

export default function Page() {
  return (
    <main className="insights-page">
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
      <section className="band alt">
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

      {/* 文章列表 */}
      <section className="band">
        <div className="wrap">
          <div className="ins-head reveal">
            <h2>全部文章</h2>
            <div className="tabs">
              <span className="tab on">全部</span>
              <span className="tab">原理与架构</span>
              <span className="tab">行业政策</span>
              <span className="tab">案例深度</span>
              <span className="tab">技术工程</span>
            </div>
          </div>

          <div className="postlist reveal">
            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">原理与架构</span>
                <h3>Agent 的四层架构 · 模型 / 工具 / 记忆 / 规划</h3>
                <p>一个能干活的 Agent,从来不只是一个模型。它是四层叠起来的能力。</p>
              </div>
              <div className="post-by">潘晓良<span className="dot" aria-hidden>·</span>2026.05.12<span className="dot" aria-hidden>·</span>11 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">技术工程</span>
                <h3>自建 Agent 平台的四道墙</h3>
                <p>自己搭一个 Agent 平台,会先后撞上四堵墙:模型、工程、数据、时间。</p>
              </div>
              <div className="post-by">潘晓良<span className="dot" aria-hidden>·</span>2026.05.06<span className="dot" aria-hidden>·</span>12 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">原理与架构</span>
                <h3>行业级 Agent 平台的三层本质</h3>
                <p>通用平台和行业平台的差别,藏在很难看见、也很难复制的三层里。</p>
              </div>
              <div className="post-by">潘晓良<span className="dot" aria-hidden>·</span>2026.04.28<span className="dot" aria-hidden>·</span>13 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">原理与架构</span>
                <h3>Agent 生态 · 分层共生</h3>
                <p>基座、平台、应用,不是谁吃掉谁,而是各自在自己的层上活下来。</p>
              </div>
              <div className="post-by">龚世海<span className="dot" aria-hidden>·</span>2026.04.15<span className="dot" aria-hidden>·</span>9 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">技术工程</span>
                <h3>数据接入不是技术问题 · 是理解问题</h3>
                <p>把数据接进来很容易,难的是知道这条数据到底意味着什么。</p>
              </div>
              <div className="post-by">潘晓良<span className="dot" aria-hidden>·</span>2026.04.02<span className="dot" aria-hidden>·</span>10 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">技术工程</span>
                <h3>Skill 是能力的最小积累单位 · 而不是代码</h3>
                <p>真正会沉淀下来的,不是某段代码,而是一个个可被复用的 Skill。</p>
              </div>
              <div className="post-by">潘晓良<span className="dot" aria-hidden>·</span>2026.03.21<span className="dot" aria-hidden>·</span>11 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">原理与架构</span>
                <h3>Agent 时代的协作本质是数据接力</h3>
                <p>人和 Agent、Agent 和 Agent 之间的协作,本质是一次次数据的交接。</p>
              </div>
              <div className="post-by">龚世海<span className="dot" aria-hidden>·</span>2026.03.08<span className="dot" aria-hidden>·</span>9 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">行业政策</span>
                <h3>从 K 类到 I 类 · 物业 AI 的产业归属</h3>
                <p>物业 AI 到底算什么产业?这个归属问题,关系到政策怎么落、资源往哪走。</p>
              </div>
              <div className="post-by">龚世海<span className="dot" aria-hidden>·</span>2026.02.24<span className="dot" aria-hidden>·</span>10 分钟</div>
            </Link>

            <Link className="post" href="/insights/detail">
              <div className="post-main">
                <span className="post-tag">案例深度</span>
                <h3>为什么物业是 AI 落地的最佳场景</h3>
                <p>真实、连续、重复、离不开人——这正是 AI 最该来、也最帮得上的地方。</p>
              </div>
              <div className="post-by">龚世海<span className="dot" aria-hidden>·</span>2026.02.10<span className="dot" aria-hidden>·</span>12 分钟</div>
            </Link>
          </div>
        </div>
      </section>

      {/* 订阅 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">订阅</span>
            <h2 className="reveal">想读到下一篇</h2>
            <p className="sub reveal">我们写得不快,但每一篇都想写得值得读。新文章发布时,给你提个醒。</p>
          </div>
          <div className="sub-grid reveal">
            <div>
              <SubscribeForm label="订阅" arrow placeholder="你的邮箱" />
              <p className="sub-note">只发新文章,不发广告。随时可退订。</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="ins-qr">微信公众号<br />二维码<br />placeholder</div>
              <p className="qr-cap">或扫码关注公众号</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
