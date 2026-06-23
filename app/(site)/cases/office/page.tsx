import Link from "next/link";
import "../article.css";

export const metadata = {
  title: "写字楼项目 · 缴费、对账、账单由 Agent 跑通 — 启盟科技",
  description:
    "一个华南写字楼项目,把收费、对账、账单这条最耗人、最易错的财务链路交给 Agent 一条跑到底。一笔预算覆盖五年,缴费率约 99%,账目全程可追溯。",
};

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const problems = [
  { n: "01", h: "账期长、口径乱", p: "月度对账要好几天,水电费分摊、滞纳金、跨表核对,口径不一就返工,前后对不上是常事。" },
  { n: "02", h: "催缴全靠人盯", p: "缴费率靠人一遍遍催,催办记录散在各个群里,谁交了、谁漏了,只能翻聊天记录现场核。" },
  { n: "03", h: "账单事后说不清", p: "一笔费用怎么来的,事后翻不清;而五年合同里,任何一笔都要经得起回查。" },
];

const compare = [
  ["对账周期", "数天", "当天完成"],
  ["缴费率", "波动，需反复催办", "约 99%"],
  ["账单口径", "跨表分摊、易错", "统一核算、自动生成"],
  ["账目可追溯", "分散难还原", "每笔留痕、可回溯"],
  ["预算方式", "逐年测算、逐年谈", "一笔预算覆盖五年"],
  ["财务人力", "多人月结、反复对", "Agent 跑通，人只复核"],
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
            <i>/</i>写字楼项目
          </span>
          <div className="cf-montag">写字楼 · 华南 · 约 7 万㎡ · 5 年合同</div>
          <h1 className="cf-h1">缴费、对账、账单，由 Agent 跑通</h1>
          <p className="cf-lead">
            把收费、对账、账单这条最耗人、也最容易出错的<b>财务链路</b>，交给 Agent 一条跑到底。一笔预算覆盖五年，账目全程可追溯。
          </p>
          <div className="cf-proof">
            <span>约 <b>7 万㎡</b></span>
            <span className="sep" />
            <span><b>5 年</b> 合同</span>
            <span className="sep" />
            <span>缴费率 <b className="grad">约 99%</b></span>
          </div>
        </div>
      </section>

      {/* 问题 */}
      <section className="cf-band mist">
        <div className="wrap">
          <span className="cf-eyebrow">客户面临的问题</span>
          <h2 className="cf-h2">财务这条链路，最耗人也最怕错</h2>
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
          <h2 className="cf-h2">把财务链路接进 Agent，一条跑到底</h2>
          <p className="cf-sub">项目接入了 FMClaw™ 的财务收费 Agent 与底层能力。从核算、对账到出账单，由 Agent 一条链路跑通，人只在关键节点复核——每一条，都是 Skill、行业 Data 与行业 Tools 在收费场景里的特定组合。</p>

          <div className="cf-formula">
            <span className="cf-fx">Skill</span>
            <i className="cf-op">×</i>
            <span className="cf-fx">行业 Data</span>
            <i className="cf-op">×</i>
            <span className="cf-fx">行业 Tools</span>
            <i className="cf-eq">=</i>
            <span className="cf-fx res">一条跑通的工作流</span>
          </div>
          <p className="cf-formula-note">不是一句提示词。在这个项目里跑通的，是下面这些收费链路上的工作流。</p>

          <div className="cf-wf">
            <div className="cf-wfrow"><div className="cf-pos">财务 · 核算</div><div className="cf-chips">{["月度水电费核算", "费用分摊", "滞纳金计算"].map((c) => <span className="cf-tag" key={c}>{c}</span>)}</div></div>
            <div className="cf-wfrow"><div className="cf-pos">财务 · 对账</div><div className="cf-chips">{["AI 对账", "账单核算", "业财一体化"].map((c) => <span className="cf-tag" key={c}>{c}</span>)}</div></div>
            <div className="cf-wfrow"><div className="cf-pos">收费 · 催缴</div><div className="cf-chips">{["缴费提醒", "催办跟踪", "缴费率看板"].map((c) => <span className="cf-tag" key={c}>{c}</span>)}</div></div>
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
          <h2 className="cf-h2">同一条财务链路，两种跑法</h2>
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
          <p className="cf-note">注：缴费率约 99% 是该项目接入后的实际水平；一笔预算覆盖五年，指合同期内由 Agent 跑通收费链路、预算一次测算到底，而非每年重谈。</p>
        </div>
      </section>

      {/* 客户原声 · 暗场 */}
      <section className="cf-core">
        <div className="cf-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="cf-eyebrow on-dark">客户原声</span>
          <p className="cf-voice">“对账这件事，以前每个月都提心吊胆，现在 Agent 先跑一遍，我们只复核。”</p>
          <div className="cf-voice-by">— 该项目财务负责人（脱敏）</div>
        </div>
      </section>

      {/* 复用路径 */}
      <section className="cf-band">
        <div className="wrap">
          <span className="cf-eyebrow">复用路径</span>
          <h2 className="cf-h2">先接收费这一条，再往外扩</h2>
          <p className="cf-sub">收费链路是写字楼里最标准、也最容易跑通的一条。跑通之后，沉淀的工作流可以直接搬到结构相似的项目上。</p>
          <div className="cf-steps">
            <div className="cf-step"><span className="si">STEP 01</span><h3>先接收费这一条</h3><p>从核算、对账、出账单这条最标准的链路切入，而不是一次性全量上线。</p></div>
            <div className="cf-step"><span className="si">STEP 02</span><h3>沉淀成可复用工作流</h3><p>跑通的核算口径与对账规则固化下来，成为可搬运的模板。</p></div>
            <div className="cf-step"><span className="si">STEP 03</span><h3>复制到相似写字楼</h3><p>同类写字楼按同一套基座接入，再逐步扩到运营与品质。</p></div>
          </div>

          <div className="cf-related">
            <Link className="cf-rcard" href="/cases/detail">
              <div className="rmeta">综合体 · 华南 · 约 6 万㎡</div>
              <h3>一个项目，跑成了自治运营</h3>
              <p>日常运营里反复出现的判断交给 Agent，现场只保留执行。</p>
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
