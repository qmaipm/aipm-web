import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "自建 Agent 平台的四道墙 · 行业研究 — 启盟科技",
  description:
    "自己搭一个 Agent 平台,会先后撞上四堵墙:模型墙、工程墙、数据墙、时间墙。这篇文章把它们一一拆开。",
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/insights">行业研究</Link> / 原理与架构</div>
          <span className="eyebrow reveal">原理与架构</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>自建 Agent 平台的四道墙</h1>
          <div className="artmeta reveal">潘晓良 · 2026 · 05 · 06 · 12 分钟阅读 · 技术工程</div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="band">
        <div className="wrap">
          <article className="prose reveal">
            <p className="lede">几乎每一家在物业、设施或制造行业里认真做过事的公司,迟早都会冒出同一个念头:既然 Agent 这么有用,我们能不能自己搭一个平台?这个念头不坏。坏的是,大多数团队只看见了第一道墙,却没看见后面还有三道。</p>

            <p>我们自己也走过这条路。下面这四道墙,不是吓人的说法,而是一个团队在真正动手之后,会按顺序撞上的四件事。它们一道比一道高,也一道比一道难绕过去。</p>

            <h2>第一道墙:模型墙</h2>
            <p>这是最容易被看见、也最容易被高估的一道墙。很多人以为做 Agent 平台,核心就是选一个足够强的模型,把 API 接进来,剩下的就是调提示词。前几周,体验确实很好——demo 跑得很漂亮,什么都像能做。</p>
            <p>但模型墙的真相是:模型本身从来不是平台。它是一个会推理、会生成的部件,而不是一个会干活的系统。模型不知道你的业务规则,不记得上一次发生了什么,也不会主动去调用工具。它强,但它是裸的。当你试图让它稳定地完成一件真实任务时,你会发现单靠模型,永远差着一口气。</p>

            <h2>第二道墙:工程墙</h2>
            <p>翻过模型墙,你开始给模型配上工具、记忆和编排逻辑。这时第二道墙出现了:工程墙。Agent 不是一次调用,而是一连串调用——它要决定下一步做什么、调用哪个工具、如何处理失败、如何在中途纠错。这套调度、重试、状态管理、可观测性的工程,远比接一个 API 复杂。</p>
            <p>更麻烦的是,这些工程问题没有终点。模型一升级,行为就变;工具一增加,编排就要重写;并发一上来,稳定性就成问题。工程墙不是一堵砌好就完事的墙,它更像一面需要持续维护的堤坝。很多团队就是在这里,把原本投给业务的精力,慢慢耗在了基础设施上。</p>

            <h2>第三道墙:数据墙</h2>
            <p>假设你工程也扛住了,真正决定 Agent 有没有用的,是第三道墙:数据墙。Agent 要在你的行业里干活,就得理解你的数据——而你的数据,大概率是散的、脏的、口径不一的，藏在表格、PDF、IoT、聊天记录和一堆没人愿意碰的老系统里。</p>
            <p>这道墙之所以最容易被低估,是因为它看起来像个技术问题——"把数据接进来"。但接进来只是第一步。真正难的是理解:这一列叫"完成",到底是谁判定的完成?这条工单的"超时",对这个项目意味着什么?数据接入不是搬运,是翻译。而翻译,需要的是对业务的理解,不是更快的管道。</p>

            <blockquote>真正难复制的,从来不是模型,也不是工程,而是你对自己这门生意的理解,被一点点写进了系统里。</blockquote>

            <h2>第四道墙:时间墙</h2>
            <p>前三道墙,投入足够多的人和钱,理论上都能翻过去。第四道墙不行——它是时间墙。一个行业级 Agent 平台真正值钱的部分,是它在一个又一个真实项目里积累下来的东西:被验证过的工作流、可复用的 Skill、对各种边界情况的处理经验。这些东西,买不到，也突击不出来。它们只能跑出来。</p>
            <p>时间墙的意思是:就算你今天拿到了和别人一样的模型、一样的工程、一样的数据接口,你仍然落后于那个已经跑了两年的平台——因为它比你多积累了两年的真实场景。这不是谁更聪明的问题,而是谁更早开始、并且持续做下去的问题。时间，是这道墙唯一的入场费。</p>

            <h2>所以,自己搭还是不搭?</h2>
            <p>这篇文章不是劝你别自己搭。如果 Agent 平台本身就是你的主业,那这四道墙就是你该去翻的墙。但如果你的主业是把物业管好、把园区运营好、把设施服务做好,那更值得想清楚的问题是:你到底要拥有的是一个平台,还是一个能解决你真实问题的能力?</p>
            <p>这两者并不一样。前者意味着你要常年维护那面堤坝;后者意味着,你可以站在一个已经翻过四道墙的基座上,把时间花在你最该花的地方——你的业务本身。</p>
          </article>
        </div>
      </section>

      {/* 推荐阅读 */}
      <section className="band alt rec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">推荐阅读</span>
            <h2 className="reveal">接着读这几篇。</h2>
          </div>
          <div className="grid c3" style={{ marginTop: "44px" }}>
            <Link className="card hover reveal" href="/insights/detail">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <div className="tag">原理与架构</div>
              <h3>行业级 Agent 平台的三层本质</h3>
              <p>为什么时间是唯一入场费。</p>
            </Link>
            <Link className="card hover reveal" href="/insights/detail">
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <div className="tag">原理与架构</div>
              <h3>Agent 的四层架构 · 模型 / 工具 / 记忆 / 规划</h3>
              <p>一个能干活的 Agent,从来不只是一个模型。</p>
            </Link>
            <Link className="card hover reveal" href="/insights/detail">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <div className="tag">技术工程</div>
              <h3>Skill 是能力的最小积累单位</h3>
              <p>真正沉淀下来的,不是代码,而是 Skill。</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 文末 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">与其翻四道墙,<br />不如先跑通一件事。</h2>
          <p className="reveal">读完了,也可以来现场试试。从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <form className="subform">
              <input type="email" placeholder="留个邮箱,继续收到新文章" aria-label="邮箱" />
              <button className="btn btn-ghost" type="submit">订阅</button>
            </form>
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMAI 工作坊 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
