import Link from "next/link";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal"><Link href="/products/fmclaw">产品</Link> / 第三方平台 AI 协同</div>
          <span className="eyebrow reveal">产品 · 第三方平台 AI 协同</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>钉钉、飞书、企业微信继续用,<br />FMClaw 接进去就好</h1>
          <p className="lead reveal">客户已有的协作平台不替换。通用平台是协作入口，FMClaw 是行业业务大脑——两者互相接入、互相成就。</p>
        </div>
      </section>

      {/* 核心定位：宽而全 × 深而专 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">核心定位</span>
            <h2 className="reveal">宽而全 × 深而专。</h2>
            <p className="sub reveal">&quot;已经有飞书 / 钉钉了，要不要换？&quot;——不用换。各自做各自擅长的事，接到一起。</p>
          </div>
          <div className="vs">
            <div className="pane plat reveal">
              <div className="tagm">通用协作平台 · 宽而全</div>
              <h3>协作入口</h3>
              <p>钉钉 / 飞书 / 企业微信，承载组织的沟通、审批、通知与日常协作，覆盖面宽，人人都在用。</p>
            </div>
            <div className="mid reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 9h12M4 9l4-4M4 9l4 4M20 15H8M20 15l-4-4M20 15l-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>互相接入</span>
              <span>互相成就</span>
            </div>
            <div className="pane fm reveal">
              <div className="tagm">FMClaw · 深而专</div>
              <h3>行业业务大脑</h3>
              <p>把物业与设施管理的行业 Know-how、数据与工具装进系统，负责协作入口背后那段专业业务闭环。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 三种接入方式 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">三种接入方式</span>
            <h2 className="reveal">接在它之后、住进它内部、接在它之前。</h2>
            <p className="sub reveal">三种方式按 FMClaw 与平台的相对位置区分，可单独用，也可叠加用。</p>
          </div>
          <div className="modes">
            {/* 之后 */}
            <div className="mode reveal" style={{ "--mc": "#0070FF" } as React.CSSProperties}>
              <div className="pos">① 在它之后接入</div>
              <h3>守群采集，下游闭环</h3>
              <div className="topo">
                <div className="box plat">平台 Bot<br />守群采集</div>
                <span className="ar">→</span>
                <div className="box fm">FMClaw<br />行业业务闭环</div>
              </div>
              <p className="desc">平台 Bot 守在群里采集消息，FMClaw 读取后完成行业业务闭环。对话还在原平台，专业处理在 FMClaw。</p>
              <div className="scene">代表场景 · <b>报修智能客服</b></div>
            </div>
            {/* 内部 */}
            <div className="mode reveal" style={{ "--mc": "#12B98A" } as React.CSSProperties}>
              <div className="pos">② 住进它内部</div>
              <h3>不换对话框，底层换大脑</h3>
              <div className="topo">
                <div className="nest">平台 Bot 对话入口
                  <div className="box fm">FMClaw 数据 · Skill · 工具</div>
                </div>
              </div>
              <p className="desc">对话入口仍是平台 Bot，底层由 FMClaw 完成数据调用、Skill 推理与工具调用。用户不换对话框，能力却换了一层。</p>
              <div className="scene">代表场景 · <b>管理层问询</b></div>
            </div>
            {/* 之前 */}
            <div className="mode reveal" style={{ "--mc": "#F59E0B" } as React.CSSProperties}>
              <div className="pos">③ 在它之前接入</div>
              <h3>双向数据桥接枢纽</h3>
              <div className="topo">
                <div className="box plat">多维表 /<br />智能表格</div>
                <span className="ar">⇄</span>
                <div className="box fm">FMClaw<br />数据集市</div>
              </div>
              <p className="desc">以多维表 / 智能表格 + FMClaw 数据集市构成双向数据桥接枢纽，数据在两侧双向流转。</p>
              <div className="scene">代表场景 · <b>数据桥接枢纽</b></div>
            </div>
          </div>
        </div>
      </section>

      {/* 差异化 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">为什么这样接</span>
            <h2 className="reveal">两个差异点。</h2>
          </div>
          <div className="diff">
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }} />
              <h3>不替换，只接入</h3>
              <p>客户原有平台继续运行，FMClaw 只承担行业业务那一段。不动现有协作习惯，决策门槛因此降下来。</p>
            </div>
            <div className="card reveal"><div className="k" style={{ background: "var(--gold)" }} />
              <h3>双向数据桥接</h3>
              <p>同一份数据，财务、运营、管理层各用各自的 AI 助手消费；两侧各写一个接口即可，复用平台现成的能力，不重复造轮子。</p>
              <div className="reuse">
                <span>权限 / IAM</span><span>通知</span><span>AI 助手</span><span>多维表</span>
              </div>
            </div>
          </div>
          <p className="scenario-quote reveal">三种方式可以单独用，也可以叠加用；原有平台不替换，FMClaw 只补上专业那一段。</p>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta"><div className="wrap"><h2 className="reveal">在你现在用的平台上,<br />接一段试试。</h2><p className="reveal">带上你的钉钉 / 飞书 / 企业微信场景来，一次工作坊里接通它。</p><div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link></div></div></section>
    </main>
  );
}
