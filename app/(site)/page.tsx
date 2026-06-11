import Link from "next/link";

const ArrowR = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowD = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Conn = () => (
  <svg className="conn" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <main>
      {/* HERO (Part A) */}
      <section className="home-hero">
        <div className="hero-mesh" />
        <div className="wrap">
          <h1 className="reveal">一个人，<br />管起过去 51 个人都管不动的事</h1>
          <p className="attitude reveal">
            <span>Not a demo.</span>
            <span>Not a pilot.</span>
            <span className="on">Deployed.</span>
          </p>
          <p className="note reveal">这不是效率提升，是设施管理运行方式的重写。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <ArrowR /></Link>
            <Link href="/#scenario" className="btn btn-ghost">看它怎么干活 <ArrowD /></Link>
          </div>
        </div>
      </section>

      {/* CLIENTS LOGO WALL (Part A) */}
      <div className="clients">
        <div className="wrap">
          <div className="clients-wall reveal">
            <div className="cell"><img src="/images/clients/tesla.svg" alt="特斯拉 Tesla" /></div>
            <div className="cell"><img src="/images/clients/siemens.svg" alt="西门子 Siemens" /></div>
            <div className="cell"><img src="/images/clients/tencent.svg" alt="腾讯 Tencent" /></div>
            <div className="cell"><img src="/images/clients/sf.svg" alt="顺丰速运 SF Express" /></div>
          </div>
          <p className="clients-note reveal">在真实项目中运行 · Deployed in production</p>
        </div>
      </div>

      {/* MISSION 使命句(钩子背后的"为什么",克制呈现,不与 HERO 争第一视觉) */}
      <section className="mission">
        <div className="wrap">
          <p className="mission-en reveal">Make intelligence ambient in the physical world.</p>
          <p className="mission-zh reveal">让智能，走进物理世界。</p>
        </div>
      </section>

      {/* AUDIENCE TRIAGE */}
      <section className="band" id="tri">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">对号入座</span>
            <h2 className="reveal">你从哪儿来,先看哪儿。</h2>
            <p className="sub reveal">四类人来这儿想搞明白的事不一样。挑一个最像你的,往下走。</p>
          </div>
          <div className="tri">
            <Link href="/agents" className="t reveal">
              <div className="accent" style={{ background: "var(--blue)" }} />
              <div className="who">业主 · 行政负责人</div>
              <h3>我管着一批楼宇或园区</h3>
              <p>把 AI 接入日常运营里的判断与对账,人只做最后那个决定。</p>
              <span className="go">设施管理解决方案 <ArrowR s={14} /></span>
            </Link>
            <Link href="/agents" className="t reveal">
              <div className="accent" style={{ background: "var(--green)" }} />
              <div className="who">物业 · FM 公司</div>
              <h3>我经营一家物业 / FM 公司</h3>
              <p>越来越多的物业服务,正在由 Agent 完成。把它接进你的交付。</p>
              <span className="go">按职能看解决方案 <ArrowR s={14} /></span>
            </Link>
            <Link href="/cobuild" className="t reveal">
              <div className="accent" style={{ background: "var(--gold)" }} />
              <div className="who">地方政府 · 国企</div>
              <h3>我在为本地引入人工智能产业</h3>
              <p>我们带着资金、技术与运营,愿意来本地投资兴业。</p>
              <span className="go">人工智能产业共建 <ArrowR s={14} /></span>
            </Link>
            <Link href="/products/fmclaw" className="t reveal">
              <div className="accent" style={{ background: "var(--purple)" }} />
              <div className="who">开发者 · 集成商</div>
              <h3>我做智慧楼宇 / 园区集成</h3>
              <p>一套已经工具化的 AI 基座,配上去就能交付给你的甲方。</p>
              <span className="go">FMClaw™ AI 平台 <ArrowR s={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FMClaw™ Bootcamp */}
      <section className="band dark workshop" id="workshop">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">FMClaw™ 加速营 · FMClaw™ Bootcamp</span>
            <h2 className="reveal">用 1–3 天,把你自己的 AI 搭出来。</h2>
            <p className="premise reveal">
              前提只有一个:<b>带着你的一个真问题,和这个问题的真实数据来。</b>
              <br />没有这两样,就不是 FMClaw™ 加速营。
            </p>
          </div>
          <div className="flow dark reveal">
            <div className="step"><div className="n">01</div><h4>把问题说清楚</h4><p>你带来一个真实业务,我们一起把它说成一句话。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="step"><div className="n">02</div><h4>接上数据与工具</h4><p>把你的数据接进来,钉钉 / 飞书 / 企微 / ERP 一并打通。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="step"><div className="n">03</div><h4>现场拼出 Agent</h4><p>当着你的面,把能帮上这件事的 Agent 搭起来。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="step"><div className="n">04</div><h4>跑通,并留给你</h4><p>用你的真实流程跑一遍,跑通的东西留下来继续用。</p></div>
          </div>
          <div className="ws-cta reveal">
            <Link href="/workshop" className="btn btn-light">了解 FMClaw™ 加速营 <ArrowR /></Link>
            <Link href="/workshop" className="btn btn-outline-d">预约 →</Link>
          </div>
        </div>
      </section>

      {/* SCENARIO FLOWCHART */}
      <section className="band scenario" id="scenario">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">看它怎么干活</span>
            <h2 className="reveal">AI 替你把判断想好了,<br />你只做最后那个决定。</h2>
            <p className="sub reveal">不是"自动跑完一个流程",而是 AI 替人想清楚了——人只需在最后点一下头。</p>
          </div>
          <div className="tag reveal mono">场景 · <b>水电费审批</b></div>
          <div className="flowchart">
            <div className="fc reveal"><div className="lane">人原来怎么做</div>
              <h4>翻台账、核表、比往月</h4>
              <p>把每个表的读数对一遍,跟过去几个月比,算分摊、找异常,几天才签得下一笔。</p>
              <Conn />
            </div>
            <div className="fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>核完、比完、标出异常</h4>
              <p>自动核表、对比历史用量、圈出异常点位,并给出该签 / 不该签的理由。</p>
              <Conn />
            </div>
            <div className="fc last reveal"><div className="lane">人只需做</div>
              <h4>看一眼结论,签字。</h4>
              <p>结论、异常、理由都摆在面前。你做的,只是最后那个决定。</p>
            </div>
          </div>
          <p className="scenario-quote reveal">老板签字那一刻,AI 已经分析好——该签 / 不该签、异常在哪、为什么。</p>
          <p className="reveal" style={{ marginTop: 40 }}>
            <Link href="/workshop" style={{ color: "var(--blue)", fontWeight: 600 }}>查看全部适用场景 →</Link>
          </p>
        </div>
      </section>

      {/* CASE WALL */}
      <section className="band dark" id="cases">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">客户案例</span>
            <h2 className="reveal">谁在用 · 哪个项目在用。</h2>
            <p className="sub reveal">不是演示,是已经在运行的项目。</p>
          </div>
          <div className="wall">
            <div className="case reveal">
              <div className="accent" style={{ background: "var(--blue)" }} />
              <div className="ct">综合体 · 华南 · 约 <b>6 万㎡</b></div>
              <div className="metric">一个项目<br />跑成了自治运营</div>
              <div className="desc">日常运营里的判断交给 Agent,现场只保留执行动作。</div>
            </div>
            <div className="case reveal">
              <div className="accent" style={{ background: "var(--green)" }} />
              <div className="ct">写字楼 · 华南 · 约 <b>7 万㎡</b> · 5 年合同</div>
              <div className="metric">缴费、对账、账单<br />由 Agent 跑通</div>
              <div className="desc">一笔预算覆盖五年,账目全程可追溯。</div>
            </div>
            <div className="case reveal">
              <div className="accent" style={{ background: "var(--gold)" }} />
              <div className="ct">区级国资平台 · 华东省会</div>
              <div className="metric">已在一座<br />省会城市落地</div>
              <div className="desc">国有物业的 AI 化运营,正在沉淀成本地的能力。</div>
            </div>
          </div>
        </div>
      </section>

      {/* DATA MOAT 数据护城河事实带 (Part B · 置于 .endo 上方) */}
      <section className="moat">
        <div className="wrap">
          <span className="eyebrow reveal">数据护城河</span>
          <p className="moat-lead reveal">七年自营下场，把真实场景一点点变成可训练的数据。</p>
          <div className="moat-stats reveal">
            <span className="n">12 家头部客户</span><span className="sep">·</span>
            <span className="n">3000 万㎡ 全业态</span><span className="sep">·</span>
            <span className="n">10 万+ 传感器在线</span><span className="sep">·</span>
            <span className="n">数亿条数据 / 天</span>
          </div>
          <p className="moat-foot reveal">别人能买到模型，买不到我们这七年的现场。</p>
        </div>
      </section>

      {/* ENDORSEMENT */}
      <div className="endo">
        <div className="wrap">
          <div className="row">
            <span className="it">蓝驰创投</span><span className="dot" />
            <span className="it">微光创投</span><span className="dot" />
            <span className="it">国家高新技术企业</span><span className="dot" />
            <span className="it">专精特新</span><span className="dot" />
            <span className="it">NVIDIA Inception</span><span className="dot" />
            <span className="it">已接入 GPT-5 · Claude · Gemini · DeepSeek · Qwen</span>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与<br />设施管理的日常运营。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">
              预约 FMClaw™ 加速营 <ArrowR s={16} />
            </Link>
            <span className="alt">或直接联系 <Link href="/contact">商务合作</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
