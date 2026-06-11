import Link from "next/link";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <span className="eyebrow reveal">FMClaw™ AI 平台 · 行业级 Agent 基座</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>模型、数据、工具,<br />在同一个基座里,且都可配置</h1>
          <p className="lead reveal">客户带来自己的数据与场景，其余交给平台。下面这张图，就是 FMClaw 的全貌——一眼看懂它怎么把一件业务跑下去。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
            <a href="#arch" className="btn btn-ghost">看总架构图 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </div>
        </div>
      </section>

      {/* 总架构一图看懂 */}
      <section className="band" id="arch">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">平台总架构</span>
            <h2 className="reveal">一张图看懂 FMClaw。</h2>
            <p className="sub reveal">数据从左边喂进来，大脑在中间想清楚，工具从右边把事做出去。底层的权限、安全、监控，平台已经封好，客户无需关心。</p>
          </div>
          <div className="arch reveal">
            <div className="bar top">人机协同入口 · 人在关键节点确认与干预</div>
            <div className="mid">
              <div className="col data">
                <div className="ctag">数据集市 · 左侧喂入</div>
                <ul><li>实时数据流</li><li>业务历史</li><li>知识库</li></ul>
              </div>
              <div className="flow-ar" aria-hidden="true">→</div>
              <div className="brainwrap">
                <div className="brain">
                  <div className="bt">Agent 大脑</div>
                  <div className="bgrid">
                    <span><b>Model</b> · 智能路由 / 多模型可切换</span>
                    <span><b>Memory</b> · 记忆与上下文</span>
                    <span><b>Planning</b> · 任务拆解与工作流编排</span>
                    <span><b>Reasoning</b> · 推理与异常归因</span>
                  </div>
                </div>
                <div className="skill">Skill · 行业 Know-how（大脑底座）</div>
              </div>
              <div className="flow-ar" aria-hidden="true">→</div>
              <div className="col tools">
                <div className="ctag">工具箱 · 右侧产出</div>
                <ul><li>工单</li><li>通知与控制</li><li>系统写入 · 30+ 工具</li></ul>
              </div>
            </div>
            <div className="bar infra">基础设施（已封装）· 权限 / 安全 / 监控 / 评估 / 协议 — 客户无需关心</div>
          </div>
          <p className="archcap reveal"><b>数据从左喂入</b> · <b>大脑在中间想清楚</b> · <b>工具从右产出</b></p>
        </div>
      </section>

      {/* All-in-One 与灵活配置 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">All-in-One 与灵活配置</span>
            <h2 className="reveal">五个动作，建起一个 Agent。</h2>
            <p className="sub reveal">模型、数据、工具在同一个基座里，且都可灵活配置。前三项「灵活配置」，就是 All-in-One 的具体证据。</p>
          </div>
          <div className="acts">
            <div className="act cfg reveal"><span className="badge">灵活配置</span><div className="n">01</div><h4>配置模型</h4><div className="met">分钟级生效<br />10+ 模型</div></div>
            <div className="act cfg reveal"><span className="badge">灵活配置</span><div className="n">02</div><h4>配置数据</h4><div className="met">72h 可调用</div></div>
            <div className="act cfg reveal"><span className="badge">灵活配置</span><div className="n">03</div><h4>配置工具</h4><div className="met">0–28 天<br />三档接入</div></div>
            <div className="act reveal"><div className="n">04</div><h4>训练 Skill</h4><div className="met">自然语言<br />&lt;3 分钟</div></div>
            <div className="act reveal"><div className="n">05</div><h4>部署 Agent</h4><div className="met">集群级<br />可回滚 · 可审计</div></div>
          </div>
        </div>
      </section>

      {/* 灵活配置具体能力 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">灵活配置，具体能力</span>
            <h2 className="reveal">配置模型、配置数据、配置工具。</h2>
          </div>
          <div className="grid c3" style={{ marginTop: "48px" }}>
            <div className="card reveal hover"><div className="k" style={{ background: "var(--blue)" }} />
              <h3>配置模型</h3><p>一个入口接全球顶级模型，按场景智能路由，统一 Credit 结算。换模型不换上层体验。</p></div>
            <div className="card reveal hover"><div className="k" style={{ background: "var(--green)" }} />
              <h3>配置数据</h3><p>数据 Agent 把散乱数据变成可消费数据，进数据集市，所有 Agent 自助调用。</p></div>
            <div className="card reveal hover"><div className="k" style={{ background: "var(--gold)" }} />
              <h3>配置工具</h3><p>六大类 30+ 预制工具，标准 / 轻量 / 定制三档接入，按需取用。</p></div>
          </div>
        </div>
      </section>

      {/* 与第三方平台协同（一句话带过） */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">与第三方平台协同</span></div>
          <div className="collabline reveal">
            <p>FMClaw 可以与钉钉、飞书、企业微信 AI 协同，<b>不替换</b>客户现有平台——只补上行业业务那一段。</p>
            <Link href="/products/collaboration">看三种接入方式 →</Link>
          </div>
        </div>
      </section>

      {/* 一个漂亮的场景：水电费 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">一个漂亮的场景</span>
            <h2 className="reveal">水电费审批：从 5–7 天，到半小时。</h2>
            <p className="sub reveal">AI 在关键决策点替人备好了依据，人只做最后那个决定。</p>
          </div>
          <div className="flowchart" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "48px" }}>
            <div className="fc reveal"><div className="lane">传统做法</div>
              <h4>4 个岗位串行，5–7 天</h4>
              <p>抄表、核对、测算、审批分散在多个岗位之间来回流转，签字时多凭经验，前后口径不一是常事。</p>
              <svg className="conn" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="fc now reveal"><div className="lane">FMClaw</div>
              <h4>半小时审批，依据已备好</h4>
              <p>签字那一刻，AI 已核完表、做完环比同比、标好异常，并给出该签 / 不该签的依据。人只需确认或驳回。</p>
            </div>
          </div>
          <div className="facts reveal">
            <span>结果<b>更轻松</b></span><span><b>更及时</b></span><span>质量<b>更高</b></span>
          </div>
        </div>
      </section>

      {/* 谁在用 */}
      <section className="band dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">谁在用</span>
            <h2 className="reveal">已经接进了真实的运营里。</h2>
          </div>
          <div className="wall reveal" style={{ marginTop: "48px" }}>
            <div className="case">
              <div className="accent" style={{ background: "var(--blue)" }} />
              <div className="ct">综合体 · 华南 · 约 <b>6 万㎡</b></div>
              <div className="metric">日常运营的判断<br />交给了 Agent。</div>
              <div className="desc">一个项目跑成了自治运营，现场只保留执行动作，判断与调度由平台统一接管。</div>
            </div>
            <div className="case">
              <div className="accent" style={{ background: "var(--green)" }} />
              <div className="ct">写字楼 · 华南 · 约 <b>7 万㎡</b> · 5 年合同</div>
              <div className="metric">缴费、对账、账单<br />由 Agent 跑通。</div>
              <div className="desc">一笔预算覆盖五年，账目全程可追溯，月度对账从数天压到当天。</div>
            </div>
            <div className="case">
              <div className="accent" style={{ background: "var(--gold)" }} />
              <div className="ct">区级国资平台 · 华东省会</div>
              <div className="metric">已在一座<br />省会城市落地。</div>
              <div className="desc">国有物业的 AI 化运营正在沉淀成本地的能力，逐步复制到同类项目。</div>
            </div>
          </div>
          <p className="moat reveal">真实运营数据持续回流，是 FMClaw 在物业场景里越用越准的护城河。 <Link href="/cases" style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: "3px" }}>看更多案例 →</Link></p>
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
