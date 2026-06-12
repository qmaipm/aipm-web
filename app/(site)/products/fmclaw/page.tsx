import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "FMClaw™ AI 平台 · 物业与设施管理的行业级 Agent 基座 — 启盟科技",
  description:
    "FMClaw 是面向物业与设施管理的行业级 Agent 平台。工作流是它的第一能力——100+ 条工作流覆盖几十个工作岗位，每一条都是 Skill、行业 Data 与行业 Tools 的组合。多智能体 A2A 协同、模型/数据/工具灵活配置，并具备物理世界感知。",
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <span className="eyebrow reveal">FMClaw™ AI 平台 · 物业与设施管理的行业级 Agent 基座</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>工作流,<br />是这个平台的第一能力。</h1>
          <p className="lead reveal">像 Genspark、Manus 之于通用任务,FMClaw 是物业与设施管理这件事的行业级底座。不同的是,它还能感知物理世界、并在物理世界里动手。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
            <a href="#workflow" className="btn btn-ghost">看工作流 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </div>
        </div>
      </section>

      {/* 定位:不是空架子 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">定位</span>
            <h2 className="reveal">一个为这件事准备好的底座,<br />不是一个空架子。</h2>
            <p className="sub reveal">通用 Agent 平台给你的是工具箱,要你自己从零组装。FMClaw 给你的,是已经在物业与设施管理里跑通的工作流本身——开箱即是行业能力。</p>
          </div>
        </div>
      </section>

      {/* 第一能力:工作流(主角) */}
      <section className="band alt" id="workflow">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">第一能力 · 工作流</span>
            <h2 className="reveal">100+ 条工作流,<br />覆盖几十个工作岗位。</h2>
            <p className="sub reveal">这是七八年在真实现场里一条条跑出来的积累,不是设想。每一条工作流,都不是一句提示词,而是 Skill、行业 Data 与行业 Tools 的组合——既宽(覆盖的岗位多),又深(每一条都打到行业细节)。</p>
          </div>

          <div className="wf reveal">
            <div className="wfrow">
              <div className="pos">财务 · 收费</div>
              <div className="chips"><span className="chip">月度水电费核算</span><span className="chip">账单核算</span><span className="chip">业财一体化</span><span className="chip">AI 对账</span></div>
            </div>
            <div className="wfrow">
              <div className="pos">工程 · 设备</div>
              <div className="chips"><span className="chip">异常归因</span><span className="chip">能耗分析</span><span className="chip">设备巡检</span></div>
            </div>
            <div className="wfrow">
              <div className="pos">调度 · 客服</div>
              <div className="chips"><span className="chip">派工规则</span><span className="chip">报修智能客服</span><span className="chip">管理层问询</span></div>
            </div>
            <div className="wfrow">
              <div className="pos">品质 · 安防</div>
              <div className="chips"><span className="chip">质量考评</span><span className="chip">巡检质检</span></div>
            </div>
          </div>
          <p className="wf-foot reveal">这只是其中一部分。与通用平台最根本的区别就在这里:通用平台给你能力原料,要你自己拼;我们给你的是已经在行业里跑通的工作流。</p>
        </div>
      </section>

      {/* 第二能力:A2A 多智能体协同 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">第二能力 · 多智能体协同(A2A)</span>
            <h2 className="reveal">四个专业 Agent,接力把一件事跑完。</h2>
            <p className="sub reveal">平台不是单个 Agent,而是多个专业 Agent 分工协同。一件事从规划、执行、评估到优化,由不同 Agent 接力闭环(A2A),人只在关键节点决策。</p>
          </div>
          <div className="relay reveal">
            <span className="ra">服务设计</span><span className="rar" aria-hidden="true">→</span>
            <span className="ra">运营管理</span><span className="rar" aria-hidden="true">→</span>
            <span className="ra">质量评估</span><span className="rar" aria-hidden="true">→</span>
            <span className="ra">服务优化</span>
          </div>
          <p className="wf-foot reveal"><Link href="/agents" style={{ color: "var(--accent)", fontWeight: 600 }}>看四 Agent 闭环 →</Link></p>
        </div>
      </section>

      {/* 第三能力:灵活配置 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">第三能力 · 灵活配置</span>
            <h2 className="reveal">模型、数据、工具都可配置,<br />用很低的成本把能力上限拉到行业级。</h2>
          </div>
          <div className="grid c3" style={{ marginTop: "48px" }}>
            <div className="card reveal hover"><div className="k" style={{ background: "var(--blue)" }} />
              <h3>配置模型</h3><p>一个入口接入多家顶级模型(GPT / Claude / Gemini / DeepSeek / Qwen),按场景智能路由。换模型,不换上层体验。</p></div>
            <div className="card reveal hover"><div className="k" style={{ background: "var(--green)" }} />
              <h3>配置数据</h3><p>数据 Agent 把散乱数据变成可用数据,进数据集市,所有 Agent 自助调用。</p></div>
            <div className="card reveal hover"><div className="k" style={{ background: "var(--gold)" }} />
              <h3>配置工具</h3><p>大量预制行业工具,标准 / 轻量 / 定制三档接入,按需取用。</p></div>
          </div>
          <div className="collabline reveal" style={{ marginTop: "40px" }}>
            <p>FMClaw 也可以与钉钉、飞书、企业微信 AI 协同,<b>不替换</b>客户现有平台——只补上行业业务那一段。</p>
            <Link href="/products/collaboration">看三种接入方式 →</Link>
          </div>
        </div>
      </section>

      {/* 为什么别人做不到 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">为什么别人做不到</span>
            <h2 className="reveal">壁垒是时间,不是工程能力。</h2>
          </div>
          <div className="why reveal">
            <p>自己从零搭一套,很快会撞墙。把行业里每一件工作拆成数据、Skill 与工具的特定组合,不是搭好一套框架就能完成的事——它要在真实现场里一条条试出来,试错的成本由时间承担。</p>
            <p>通用大厂也很难下沉到这里。越靠近一个具体行业的细节,越靠近物理世界,通用平台越难覆盖;那不是它们的投入方向,也不是堆工程就能补上的差距。</p>
            <p>而越靠近物理世界,这件事越难:先感知一次服务到底有没有做、做得好不好,再据此在现实里动手,中间没有捷径。</p>
            <p className="last">所以真正难复制的,不是模型,也不是某个产品,而是这些工作流背后七八年的行业积累。这部分,只能跑出来,买不到。</p>
          </div>
        </div>
      </section>

      {/* 收尾:呼应使命 */}
      <section className="band alt">
        <div className="wrap">
          <div className="mecho reveal">
            <p className="zh">让智能,走进物理世界。</p>
            <p>基座,是这件事的"怎么做"——要让智能走进物理世界,平台就得既能感知物理世界,又能在物理世界里动手。</p>
          </div>
        </div>
      </section>

      {/* END CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与<br />设施管理的日常运营。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
