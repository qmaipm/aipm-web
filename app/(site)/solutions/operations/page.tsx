import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function OperationsPage() {
  return (
    <main>
      {/* A. HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal">
            <Link href="/agents">解决方案</Link> / <Link href="/agents">按 Agent 职能</Link> / 运营管理
          </div>
          <span className="eyebrow reveal">运营管理 Agent · 闭环第 02 段</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>
            把每天的调度与派单,<br />变成可追溯的实时运营。
          </h1>
          <p className="lead reveal">运营管理 Agent 把服务标准转成每天可执行的工作流，实时调度、自动响应异常；管理者只在交互界面里审批与确认。</p>
        </div>
      </section>

      {/* B. 它解决什么 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它解决什么</span>
          </div>
          <p className="statement reveal">
            调度、派单、异常响应每天大量发生，过去靠人盯、靠电话、靠经验，运营判断<span className="em">散在很多人脑子里</span>——出了岔子，往往事后才知道。
          </p>
          <div className="facts reveal">
            <span>巡检 · 保洁 · 维修 · 安防 <b>实时调度</b></span>
            <span>异常<b>自动升级</b></span>
            <span>每条指令<b>可追溯</b></span>
          </div>
        </div>
      </section>

      {/* C. 它怎么工作 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它怎么工作</span>
            <h2 className="reveal">标准进来，工作流出去，人只做最后那个决定。</h2>
            <p className="sub reveal">对接 IoT 与工单系统，把服务标准转成每日可执行、可追踪的运营。</p>
          </div>
          <div className="flowchart" style={{ marginTop: 48 }}>
            <div className="fc reveal">
              <div className="lane">输入</div>
              <h4>服务标准 + 实时信号</h4>
              <p>来自服务设计的标准，叠加巡检、保洁、维修、安防的实时工单与 IoT 信号。</p>
              <svg className="conn" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="fc now reveal">
              <div className="lane">处理 · AI</div>
              <h4>转成每日工作流并实时调度</h4>
              <p>把标准拆成可执行可追踪的任务，按技能与负载派单，异常自动响应与升级。</p>
              <svg className="conn" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="fc last reveal">
              <div className="lane">输出</div>
              <h4>人机管理交互界面</h4>
              <p>管理者审批 AI 建议、查看实时数据、发出权限内指令——决定权始终在人手里。</p>
            </div>
          </div>
          <p className="scenario-quote reveal">派单那一刻，谁去、为什么是他、超时怎么办，AI 都安排好了。</p>
        </div>
      </section>

      {/* E. 关联产品能力 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它挂着哪些产品能力</span>
            <h2 className="reveal">背后是这些产品模块。</h2>
          </div>
          <div className="grid c4" style={{ marginTop: 48 }}>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <h3>SSR 服务记录</h3>
              <p>每一次服务都留痕，运营有据可查。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--accent)" }}></div>
              <h3>工单调度系统</h3>
              <p>定位、定级、派单与升级的执行底座。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--purple)" }}></div>
              <h3>人机协同引擎</h3>
              <p>AI 给建议、人做决定的协同机制。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <h3>小智帮手</h3>
              <p>一线随手可用的对话式运营助手。</p>
            </Link>
          </div>
        </div>
      </section>

      {/* F. 放进闭环 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">放进闭环</span>
          </div>
          <p className="statement reveal" style={{ fontSize: "clamp(20px,2.6vw,25px)" }}>
            运营管理执行服务设计输出的标准，又把过程里产生的工单、照片与数据，<span className="em">交给质量评估</span>去独立打分。
          </p>
          <div className="miniloop reveal">
            <span className="ml"><span className="d"></span>服务设计</span><span className="ar">→</span>
            <span className="ml on"><span className="d"></span>运营管理</span><span className="ar">→</span>
            <span className="ml"><span className="d"></span>质量评估</span><span className="ar">→</span>
            <span className="ml"><span className="d"></span>服务优化</span>
            <span className="rt">↻ 回灌服务设计</span>
          </div>
          <p className="reveal" style={{ marginTop: 26 }}>
            <Link href="/agents" style={{ color: "var(--accent)", fontWeight: 600 }}>回到四 Agent 闭环总览 →</Link>
          </p>
        </div>
      </section>

      {/* Product screenshot */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">真实产品界面</span>
            <h2 className="reveal">管理者的人机交互界面。</h2>
          </div>
          <figure className="reveal" style={{ margin: "40px 0 0" }}>
            <Image
              src="/images/agent-operations.png"
              alt="运营管理 Agent 界面"
              width={3338}
              height={1644}
              style={{ width: "100%", height: "auto", borderRadius: 14, border: "1px solid var(--line)" }}
            />
            <figcaption className="sub" style={{ marginTop: 12 }}>
              把每天的调度、派单、异常响应，变成可审批、可追溯的实时运营。
            </figcaption>
          </figure>
        </div>
      </section>

      {/* G. CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一天的真实工单,<br />跑一次实时运营。</h2>
          <p className="reveal">带上你的运营场景来，看 Agent 怎么调度。</p>
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
