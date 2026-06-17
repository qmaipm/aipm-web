import Link from "next/link";
import MissionBackdrop from "./MissionBackdrop";
import HeroBackdrop from "./HeroBackdrop";
import MoatStats from "./MoatStats";

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
// 资质 / 投资 chip 图标(内联 SVG,蓝绿 currentColor)
const svgp = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IcTrend = () => (
  <svg className="ei" viewBox="0 0 24 24" width="15" height="15" {...svgp}>
    <path d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" />
  </svg>
);
const IcLandmark = () => (
  <svg className="ei" viewBox="0 0 24 24" width="15" height="15" {...svgp}>
    <path d="M3 21h18" /><path d="M6 21v-9M10 21v-9M14 21v-9M18 21v-9" /><path d="M12 3 20 8H4z" />
  </svg>
);
const IcAward = () => (
  <svg className="ei" viewBox="0 0 24 24" width="15" height="15" {...svgp}>
    <circle cx="12" cy="9" r="6" /><path d="M15.5 13 17 22l-5-3-5 3 1.5-9" />
  </svg>
);

export default function Home() {
  return (
    <main>
      {/* HERO (Part A) */}
      <section className="home-hero">
        <div className="hero-mesh" />
        <HeroBackdrop />
        <div className="wrap">
          <h1 className="reveal">一个人，<br />管起过去 <span className="hl">51</span> 个人都管不动的事</h1>
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
            <div className="cell"><img src="/images/clients/tencent.svg" alt="腾讯 Tencent" style={{ maxHeight: "42px" }} /></div>
            <div className="cell"><img src="/images/clients/sf.svg" alt="顺丰速运 SF Express" /></div>
          </div>
          <p className="clients-note reveal">在真实项目中运行 · Deployed in production</p>
        </div>
      </div>

      {/* MISSION 使命句 · 深色"时刻":点阵物理世界 + 智能光波扩散 */}
      <section className="mission mission-dark">
        <MissionBackdrop />
        <div className="wrap">
          <p className="mission-en reveal">Make intelligence ambient in the physical world</p>
          <p className="mission-zh reveal">让智能，走进物理世界</p>
        </div>
      </section>

      {/* AUDIENCE TRIAGE */}
      <section className="band" id="tri">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">对号入座</span>
            <h2 className="reveal">你从哪儿来,先看哪儿</h2>
            <p className="sub reveal">四类人来这儿想搞明白的事不一样。挑一个最像你的,往下走。</p>
          </div>
          <div className="tri">
            <Link href="/agents" className="t reveal">
              <div className="accent" style={{ background: "var(--vi-blue)" }} />
              <div className="who">业主 · 行政负责人</div>
              <h3>我管着一批楼宇或园区</h3>
              <p>把 AI 接入日常运营里的判断与对账,人只做最后那个决定。</p>
              <span className="go">设施管理解决方案 <ArrowR s={14} /></span>
            </Link>
            <Link href="/agents" className="t reveal">
              <div className="accent" style={{ background: "var(--vi-green)" }} />
              <div className="who">物业 · FM 公司</div>
              <h3>我经营一家物业 / FM 公司</h3>
              <p>越来越多的物业服务,正在由 Agent 完成。把它接进你的交付。</p>
              <span className="go">按职能看解决方案 <ArrowR s={14} /></span>
            </Link>
            <Link href="/cobuild" className="t reveal">
              <div className="accent" style={{ background: "var(--teal)" }} />
              <div className="who">地方政府 · 国企</div>
              <h3>我在为本地引入人工智能产业</h3>
              <p>我们带着资金、技术与运营,愿意来本地投资兴业。</p>
              <span className="go">人工智能产业共建 <ArrowR s={14} /></span>
            </Link>
            <Link href="/products/fmclaw" className="t reveal">
              <div className="accent" style={{ background: "#18A5C9" }} />
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
            <h2 className="reveal">用 1–3 天,把你自己的 AI 搭出来</h2>
            <p className="premise reveal">
              前提只有一个:<b>带着你的一个真问题,和这个问题的真实数据来。</b>
              没有这两样,就不是 FMClaw™ 加速营。
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
            <h2 className="reveal">AI 替你把判断想好了,你只做最后那个决定</h2>
            <p className="sub reveal">不是"自动跑完一个流程",而是 AI 替人想清楚了——人只需在最后点一下头</p>
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
              <h4>看一眼结论,签字</h4>
              <p>结论、异常、理由都摆在面前。你做的,只是最后那个决定。</p>
            </div>
          </div>
          <div className="scenario-quote reveal">
            老板签字那一刻,<b>AI 已经分析好</b>
            <span className="sq-detail">该签 / 不该签、异常在哪、为什么</span>
          </div>
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
            <h2 className="reveal">谁在用 · 哪个项目在用</h2>
            <p className="sub reveal">不是演示,是已经在运行的项目。</p>
          </div>
          <div className="cases-grid">
            <article className="ccard reveal">
              <span className="cc-bar" style={{ background: "var(--vi-blue)" }} />
              <div className="cc-head">
                <span className="cc-tag">综合体 · 华南 · 约 <b>6 万㎡</b></span>
                <span className="cc-live"><i className="liv" />自治运营中</span>
              </div>
              <div className="cc-body">
                <h3 className="cc-result">一个项目跑成了自治运营</h3>
                <p className="cc-desc">日常运营里的判断交给 Agent,现场只保留执行动作。</p>
              </div>
            </article>
            <article className="ccard reveal">
              <span className="cc-bar" style={{ background: "var(--vi-green)" }} />
              <div className="cc-head">
                <span className="cc-tag">写字楼 · 华南 · 约 <b>7 万㎡</b> · 5 年合同</span>
                <span className="cc-live"><i className="liv" />在线运行</span>
              </div>
              <div className="cc-body">
                <h3 className="cc-result">缴费、对账、账单由 Agent 跑通</h3>
                <p className="cc-desc">一笔预算覆盖五年,账目全程可追溯。</p>
              </div>
            </article>
            <article className="ccard reveal">
              <span className="cc-bar" style={{ background: "var(--teal)" }} />
              <div className="cc-head">
                <span className="cc-tag">区级国资平台 · 华东省会</span>
                <span className="cc-live"><i className="liv" />已落地</span>
              </div>
              <div className="cc-body">
                <h3 className="cc-result">已在一座省会城市落地</h3>
                <p className="cc-desc">国有物业的 AI 化运营,正在沉淀成本地的能力。</p>
              </div>
            </article>
          </div>
          <p className="cases-more reveal">已部署并在线运行的项目还在增加。<Link href="/cases">查看更多案例 <ArrowR s={13} /></Link></p>
        </div>
      </section>

      {/* DATA MOAT 数据护城河 · 叙述 + 大数字阵 */}
      <section className="moat">
        <div className="wrap">
          <div className="moat-head">
            <span className="eyebrow reveal">数据护城河</span>
            <h2 className="moat-lead reveal">七年自营下场,把真实场景一点点变成可训练的数据</h2>
            <p className="moat-foot reveal">别人能买到模型,买不到我们这七年的现场</p>
          </div>
          <MoatStats />
        </div>
      </section>

      {/* ENDORSEMENT · 投资与资质 / 已接入大模型 */}
      <section className="cred">
        <div className="wrap">
          <div className="cred-block reveal">
            <div className="cred-blab">投资与资质</div>
            <div className="cred-wall">
              <div className="cred-cell"><IcTrend /><span className="cred-name">蓝驰创投</span></div>
              <div className="cred-cell"><IcTrend /><span className="cred-name">微光创投</span></div>
              <div className="cred-cell"><IcLandmark /><span className="cred-name">国家高新技术企业</span></div>
              <div className="cred-cell"><IcAward /><span className="cred-name">专精特新</span></div>
              <div className="cred-cell"><img className="cred-logo" src="/images/endorse/nvidia.svg" alt="NVIDIA" /><span className="cred-name">NVIDIA Inception</span></div>
            </div>
          </div>

          <div className="cred-block reveal">
            <div className="cred-blab">已接入主流大模型</div>
            <div className="cred-wall">
              <div className="cred-cell"><img className="cred-logo" src="/images/endorse/chatgpt.svg" alt="ChatGPT" /><span className="cred-name">ChatGPT</span></div>
              <div className="cred-cell"><img className="cred-logo" src="/images/endorse/claude.svg" alt="Claude" /><span className="cred-name">Claude</span></div>
              <div className="cred-cell"><img className="cred-logo" src="/images/endorse/gemini.svg" alt="Gemini" /><span className="cred-name">Gemini</span></div>
              <div className="cred-cell"><img className="cred-logo" src="/images/endorse/deepseek.svg" alt="DeepSeek" /><span className="cred-name">DeepSeek</span></div>
              <div className="cred-cell"><img className="cred-logo" src="/images/endorse/qwen.svg" alt="Qwen" /><span className="cred-name">Qwen</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与设施管理的日常运营</h2>
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
