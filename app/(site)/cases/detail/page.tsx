import Link from "next/link";
import "./page.css";

export const metadata = {
  title: "综合体项目 · 一个项目跑成了自治运营 — 启盟科技",
  description:
    "一个华南综合体项目,把日常运营里的判断交给 Agent,现场只保留执行。这是一个已经在运行的项目,不是演示。",
};

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero dark">
        <div className="wrap">
          <div className="crumb">
            <Link href="/cases">客户案例</Link> / 综合体项目
          </div>
          <div className="montag">综合体 · 华南 · 约 6 万㎡</div>
          <h1 className="reveal">
            一个项目,
            <br />
            跑成了自治运营
          </h1>
          <p className="lead reveal">
            日常运营里反复出现的判断,交给 Agent 处理;现场团队只保留必须由人完成的执行。
          </p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">客户面临的问题</span>
            <h2 className="reveal">用项目方自己的话说。</h2>
          </div>
          <ul className="painlist reveal">
            <li>点位太多,一个项目几百个点,人走一圈就过去半天。</li>
            <li>频次又高,巡检、保洁、设备点检,天天都要重复盯。</li>
            <li>到头来全靠人盯,谁在班、谁漏了,只能现场看。</li>
            <li>判断散落在各人脑子里,这件事该怎么处理,问三个人三个答案。</li>
            <li>对账最慢,一个月的账要对好几天,前后对不上是常事。</li>
          </ul>
        </div>
      </section>

      {/* BEFORE */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">之前怎么运转</span>
            <h2 className="reveal">接入之前,是这样一摊事实。</h2>
          </div>
          <div className="deflist reveal" style={{ marginTop: "44px", maxWidth: "var(--measure)" }}>
            <div className="row"><div className="k">服务点位</div><div className="v">数百个点位,分布在多栋楼与公共区域。</div></div>
            <div className="row"><div className="k">日服务频次</div><div className="v">巡检、保洁、设备点检每日多轮,靠排班表与人工记录。</div></div>
            <div className="row"><div className="k">管理层级</div><div className="v">项目经理 → 主管 → 班组,逐级上报、逐级下达。</div></div>
            <div className="row"><div className="k">判断方式</div><div className="v">异常如何处理多依赖个人经验,缺乏统一口径。</div></div>
            <div className="row"><div className="k">对账周期</div><div className="v">月度对账需数天,跨表核对、口径不一时返工。</div></div>
          </div>
          <ul className="painlist reveal">
            <li>记录分散在纸单、群消息与多个表格里,事后难以还原。</li>
            <li>同类问题反复出现,但没有沉淀成可复用的处理方式。</li>
            <li>运营好坏高度依赖某几个熟手,人一动,口径就乱。</li>
          </ul>
        </div>
      </section>

      {/* AFTER */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">接入之后</span>
            <h2 className="reveal">把判断接进 Agent,把执行留给现场。</h2>
            <p className="sub reveal">
              项目接入了 FMClaw™ 的 Agent 与底层能力。日常运营中反复出现的判断由 Agent 统一处理,现场团队专注执行。
            </p>
          </div>
          <div className="grid c2 reveal" style={{ marginTop: "48px", maxWidth: "var(--measure)" }}>
            <div className="card"><div className="k" style={{ background: "var(--blue)" }}></div><h3>运营管理 Agent</h3><p>统一接管日常调度与异常判断,处理口径一致、可追溯。</p></div>
            <div className="card"><div className="k" style={{ background: "var(--green)" }}></div><h3>质量评估 Agent</h3><p>按统一标准核查服务结果,问题自动归集、自动派单。</p></div>
          </div>
          <div className="grid c3 reveal" style={{ marginTop: "18px", maxWidth: "var(--measure)" }}>
            <div className="card"><div className="meta">数据接入</div><p>巡检记录、设备数据、报修与考勤统一进入同一套数据底座。</p></div>
            <div className="card"><div className="meta">工具接入</div><p>打通现场已在用的钉钉 / 飞书 / 企微与工单系统。</p></div>
            <div className="card"><div className="meta">工作流</div><p>把判断与派发固化为可复用的工作流,跑一遍就沉淀一次。</p></div>
          </div>
          <p className="reveal" style={{ marginTop: "32px", fontSize: "15px", color: "var(--mut)" }}>
            同款 Agent 与能力详见{" "}
            <Link href="/solutions/operations" style={{ color: "var(--blue)", textDecoration: "underline", textUnderlineOffset: "3px" }}>运营管理 Agent</Link>。
          </p>
        </div>
      </section>

      {/* BEFORE vs AFTER */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">改造前 vs 改造后</span>
            <h2 className="reveal">同一套项目,两种运转。</h2>
          </div>
          <div className="compare reveal" style={{ marginTop: "44px", maxWidth: "var(--measure)" }}>
            <div className="head"><span></span><span>改造前</span><span>改造后</span></div>
            <div className="row"><div className="k">运营判断</div><div className="before">人工分散,各凭经验</div><div className="after">Agent 统一,口径一致</div></div>
            <div className="row"><div className="k">对账周期</div><div className="before">数天</div><div className="after">当天完成</div></div>
            <div className="row"><div className="k">缴费率</div><div className="before">波动,需反复催办</div><div className="after">提升至约 99%</div></div>
            <div className="row"><div className="k">响应时效</div><div className="before">逐级上报,等待派单</div><div className="after">自动派发,响应更快</div></div>
            <div className="row"><div className="k">账目可追溯</div><div className="before">分散难还原</div><div className="after">全程留痕、可回溯</div></div>
            <div className="row"><div className="k">人员配置</div><div className="before">34 人</div><div className="after">17 人</div></div>
            <div className="row"><div className="k">管理岗位</div><div className="before">6 个</div><div className="after">1 个</div></div>
          </div>
          <p className="reveal" style={{ marginTop: "18px", fontSize: "14.5px", color: "var(--mut)", maxWidth: "var(--measure)" }}>
            注:此处减少的是分散在多层的管理协调环节，一线服务岗位未削减——判断与调度由 Agent 统一接管后，原本逐级上报的协调层得以精简。
          </p>
        </div>
      </section>

      {/* CLIENT VOICE */}
      <section className="band dark">
        <div className="wrap">
          <span className="eyebrow reveal">客户原声</span>
          <p className="voice reveal" style={{ marginTop: "28px" }}>
            "以前心里没底的事,现在系统先想好了,我们到现场只做该做的那一步。"
          </p>
          <div className="voice-by reveal">— 该项目运营负责人(脱敏)</div>
        </div>
      </section>

      {/* REUSE PATH */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">复用路径</span>
            <h2 className="reveal">一个项目跑通,下一个就快很多。</h2>
            <p className="sub reveal">
              这个项目沉淀下来的工作流与判断口径,可以直接搬到结构相似的项目上。
            </p>
          </div>
          <div className="grid c3 reveal" style={{ marginTop: "48px" }}>
            <div className="card"><div className="k" style={{ background: "var(--blue)" }}></div><h3>先接一个真实业务</h3><p>从一项日常运营开始接入,而不是一次性全量上线。</p></div>
            <div className="card"><div className="k" style={{ background: "var(--green)" }}></div><h3>沉淀成可复用工作流</h3><p>跑通的判断与派发固化下来,成为可搬运的模板。</p></div>
            <div className="card"><div className="k" style={{ background: "var(--gold)" }}></div><h3>复制到相似项目</h3><p>同类综合体、写字楼按同一套基座接入,边界逐步扩大。</p></div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">相关案例</span></div>
          <div className="grid c2 reveal" style={{ marginTop: "40px" }}>
            <Link className="card hover" href="/cases"><div className="meta">写字楼 · 华南 · 约 7 万㎡</div><h3>缴费、对账、账单由 Agent 跑通</h3><p>一笔预算覆盖五年,账目全程可追溯。</p></Link>
            <Link className="card hover" href="/cases"><div className="meta">综合体 · 华南 · 约 6 万㎡</div><h3>一个项目跑成了自治运营</h3><p>日常运营里的判断交给 Agent,现场只保留执行。</p></Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">
            带你的难题来,
            <br />
            带一个 Agent 走。
          </h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
