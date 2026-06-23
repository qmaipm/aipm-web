import Link from "next/link";
import "../article.css";

export const metadata = {
  title: "综合体项目 · 一个项目跑成了自治运营 — 启盟科技",
  description:
    "一个华南综合体项目,把日常运营里反复出现的判断交给 Agent,现场只保留必须由人完成的执行。这是一个已经在运行的项目,不是演示。",
};

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const problems = [
  { n: "01", h: "点位多、频次高,人盯不过来", p: "一个项目几百个点位,巡检、保洁、设备点检天天重复盯,人走一圈就过去半天。" },
  { n: "02", h: "判断散落在各人脑子里", p: "异常该怎么处理,问三个人三个答案;运营好坏高度依赖某几个熟手,人一动,口径就乱。" },
  { n: "03", h: "对账最慢,账目难还原", p: "一个月的账要对好几天,跨表核对、口径不一时返工;记录散在纸单、群消息与多个表格里。" },
];

const compare = [
  ["运营判断", "人工分散,各凭经验", "Agent 统一,口径一致"],
  ["对账周期", "数天", "当天完成"],
  ["缴费率", "波动,需反复催办", "提升至约 99%"],
  ["响应时效", "逐级上报,等待派单", "自动派发,响应更快"],
  ["账目可追溯", "分散难还原", "全程留痕、可回溯"],
  ["人员配置", "34 人", "17 人"],
  ["管理岗位", "6 个", "1 个"],
];

export default function Page() {
  return (
    <main className="casefx">
      {/* HERO · 场景画像 */}
      <section className="cf-hero">
        <div className="cf-grid" aria-hidden="true" />
        <div className="wrap cf-hero-top">
          <span className="cf-crumb">
            <Link href="/cases">客户案例</Link>
            <i>/</i>综合体项目
          </span>
          <div className="cf-montag">综合体 · 华南 · 约 6 万㎡</div>
          <h1 className="cf-h1">一个项目，跑成了自治运营</h1>
          <p className="cf-lead">
            日常运营里反复出现的判断，交给 Agent 处理；现场团队只保留<b>必须由人完成的执行</b>。这是一个已经在运行的项目，不是演示。
          </p>
          <div className="cf-proof">
            <span>约 <b>6 万㎡</b></span>
            <span className="sep" />
            <span><b>数百</b> 个服务点位</span>
            <span className="sep" />
            <span>管理岗 <b className="grad">6 → 1</b></span>
          </div>
        </div>
      </section>

      {/* 问题 */}
      <section className="cf-band mist">
        <div className="wrap">
          <span className="cf-eyebrow">客户面临的问题</span>
          <h2 className="cf-h2">用项目方自己的话说</h2>
          <div className="cf-problems">
            {problems.map((p) => (
              <div className="cf-problem" key={p.n}>
                <span className="cf-pn">{p.n}</span>
                <div className="cf-pc">
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 接入之后 · 工作流 */}
      <section className="cf-band">
        <div className="wrap">
          <span className="cf-eyebrow">接入之后</span>
          <h2 className="cf-h2">把判断接进 Agent，把执行留给现场</h2>
          <p className="cf-sub">项目接入了 FMClaw™ 的 Agent 与底层能力。日常运营中反复出现的判断由 Agent 统一处理，现场团队专注执行——每一条判断，都是 Skill、行业 Data 与行业 Tools 在这个项目里的特定组合。</p>

          <div className="cf-formula">
            <span className="cf-fx">Skill</span>
            <i className="cf-op">×</i>
            <span className="cf-fx">行业 Data</span>
            <i className="cf-op">×</i>
            <span className="cf-fx">行业 Tools</span>
            <i className="cf-eq">=</i>
            <span className="cf-fx res">一条跑通的工作流</span>
          </div>
          <p className="cf-formula-note">不是一句提示词。在这个项目里跑通的，是下面这些岗位上的工作流。</p>

          <div className="cf-wf">
            <div className="cf-wfrow"><div className="cf-pos">运营 · 调度</div><div className="cf-chips">{["统一日常调度", "异常判断", "自动派单"].map((c) => <span className="cf-tag" key={c}>{c}</span>)}</div></div>
            <div className="cf-wfrow"><div className="cf-pos">品质 · 核查</div><div className="cf-chips">{["质量考评", "问题归集", "巡检质检"].map((c) => <span className="cf-tag" key={c}>{c}</span>)}</div></div>
            <div className="cf-wfrow"><div className="cf-pos">数据 · 工具</div><div className="cf-chips">{["统一数据底座", "钉钉 / 飞书 / 企微", "工单系统打通"].map((c) => <span className="cf-tag" key={c}>{c}</span>)}</div></div>
          </div>
          <p className="cf-foot">
            同款 Agent 与平台能力，详见{" "}
            <Link href="/products/fmclaw" className="cf-link">FMClaw™ AI 平台 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 改造前 vs 改造后 */}
      <section className="cf-band mist">
        <div className="wrap">
          <span className="cf-eyebrow">改造前 vs 改造后</span>
          <h2 className="cf-h2">同一套项目，两种运转</h2>
          <div className="cf-compare">
            <div className="cf-crow cf-chead">
              <div></div>
              <div className="cf-before">改造前</div>
              <div className="cf-after">改造后</div>
            </div>
            {compare.map(([k, b, a]) => (
              <div className="cf-crow" key={k}>
                <div className="cf-ck">{k}</div>
                <div className="cf-before">{b}</div>
                <div className="cf-after">{a}</div>
              </div>
            ))}
          </div>
          <p className="cf-note">注：此处减少的是分散在多层的管理协调环节，一线服务岗位未削减——判断与调度由 Agent 统一接管后，原本逐级上报的协调层得以精简。</p>
        </div>
      </section>

      {/* 客户原声 · 暗场 */}
      <section className="cf-core">
        <div className="cf-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="cf-eyebrow on-dark">客户原声</span>
          <p className="cf-voice">“以前心里没底的事，现在系统先想好了，我们到现场只做该做的那一步。”</p>
          <div className="cf-voice-by">— 该项目运营负责人（脱敏）</div>
        </div>
      </section>

      {/* 复用路径 */}
      <section className="cf-band">
        <div className="wrap">
          <span className="cf-eyebrow">复用路径</span>
          <h2 className="cf-h2">一个项目跑通，下一个就快很多</h2>
          <p className="cf-sub">这个项目沉淀下来的工作流与判断口径，可以直接搬到结构相似的项目上。</p>
          <div className="cf-steps">
            <div className="cf-step"><span className="si">STEP 01</span><h3>先接一个真实业务</h3><p>从一项日常运营开始接入，而不是一次性全量上线。</p></div>
            <div className="cf-step"><span className="si">STEP 02</span><h3>沉淀成可复用工作流</h3><p>跑通的判断与派发固化下来，成为可搬运的模板。</p></div>
            <div className="cf-step"><span className="si">STEP 03</span><h3>复制到相似项目</h3><p>同类综合体、写字楼按同一套基座接入，边界逐步扩大。</p></div>
          </div>

          <div className="cf-related">
            <Link className="cf-rcard" href="/cases/office">
              <div className="rmeta">写字楼 · 华南 · 约 7 万㎡ · 5 年合同</div>
              <h3>缴费、对账、账单，由 Agent 跑通</h3>
              <p>一笔预算覆盖五年，缴费率约 99%，账目全程可追溯。</p>
            </Link>
            <Link className="cf-rcard" href="/products/fmclaw">
              <div className="rmeta">平台 · FMClaw™</div>
              <h3>工作流，是这个平台的第一能力</h3>
              <p>100+ 条工作流覆盖几十个工作岗位，每一条都是行业里跑通的组合。</p>
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带你的难题来，<br />带一个 Agent 走</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
