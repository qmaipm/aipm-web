import Link from "next/link";
import "./home.css";
import MissionBackdrop from "./MissionBackdrop";
import HeroBackdrop from "./HeroBackdrop";
import MoatStats from "./MoatStats";
import { pageMetadata } from "@/lib/pageMetadata";

// 标题/描述与根布局一致;单独声明是为了首页也有指向自身的 canonical 与 og:url
export const metadata = pageMetadata("/", {
  title: "启盟科技 · 物业与设施管理的 AI 操作系统 — FMClaw™",
  description:
    "物业与设施管理,正在被 AI 重写。FMClaw™ 把 AI 接入日常运营。带着你的一个真实业务,在 FMClaw™ 加速营里用 1–3 天把它跑通。",
});

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
    <main className="solhome">
      {/* HERO — 蓝图网格 + HeroBackdrop */}
      <section className="h-hero">
        <div className="h-grid" aria-hidden="true" />
        <HeroBackdrop />
        <div className="wrap h-hero-top">
          <h1 className="reveal">一个人，<br />管起过去 <span className="hl">51</span> 个人都管不动的事</h1>
          <p className="h-attitude reveal">
            <span>Not a demo.</span>
            <span>Not a pilot.</span>
            <span className="on">Deployed.</span>
          </p>
          <p className="h-note reveal">这不是效率提升，是设施管理运行方式的重写。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <ArrowR /></Link>
            <Link href="/#scenario" className="btn btn-ghost">看它怎么干活 <ArrowD /></Link>
          </div>
          <div className="h-proof reveal">
            <span>已在真实项目<b>部署运行</b></span>
            <span className="sep" />
            <span><b className="grad">一个人</b>管起一支团队的活</span>
            <span className="sep" />
            <span>七年<b>自营下场</b></span>
          </div>
        </div>
      </section>

      {/* CLIENTS LOGO WALL */}
      <div className="h-clients">
        <div className="wrap">
          <div className="h-clients-wall reveal">
            <div className="cell"><img src="/images/clients/tesla.svg" alt="特斯拉 Tesla" /></div>
            <div className="cell"><img src="/images/clients/siemens.svg" alt="西门子 Siemens" /></div>
            <div className="cell"><img src="/images/clients/tencent.svg" alt="腾讯 Tencent" style={{ maxHeight: "42px" }} /></div>
            <div className="cell"><img src="/images/clients/sf.svg" alt="顺丰速运 SF Express" /></div>
          </div>
          <p className="h-clients-note reveal">在真实项目中运行 · Deployed in production</p>
        </div>
      </div>

      {/* MISSION 使命句 · 暗场「时刻」:MissionBackdrop */}
      <section className="h-mission mission-dark">
        <MissionBackdrop />
        <div className="wrap">
          <p className="h-mission-en reveal">Make intelligence ambient in the physical world</p>
          <p className="h-mission-zh reveal">让智能，走进物理世界</p>
        </div>
      </section>

      {/* AUDIENCE TRIAGE · 对号入座 4 卡 */}
      <section className="h-band" id="tri">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">对号入座</span>
            <h2 className="h-h2 reveal">你来这儿，想解决什么</h2>
            <p className="h-sub reveal">四种来意，四条路。挑一个最像你的，往下走。</p>
          </div>
          <div className="h-tri">
            <Link href="/agents" className="h-t reveal">
              <div className="accent" style={{ background: "var(--vi-blue)" }} />
              <div className="who">业主 · 行政负责人</div>
              <h3>我想用 AI 管好我的楼宇和园区</h3>
              <p>巡检、对账、工单、报告——日常运营里的判断与流转，交给智能体。</p>
              <span className="go">智能体解决方案 <ArrowR s={14} /></span>
            </Link>
            <Link href="/ai-service" className="h-t reveal">
              <div className="accent" style={{ background: "var(--vi-green)" }} />
              <div className="who">上市公司 · 国企产业园</div>
              <h3>我想要更省心的物业服务</h3>
              <p>清洁、设施、安保、客服，由 AI 接管的物业服务——指标写进合同。</p>
              <span className="go">AI 物业服务 <ArrowR s={14} /></span>
            </Link>
            <Link href="/cobuild" className="h-t reveal">
              <div className="accent" style={{ background: "var(--teal)" }} />
              <div className="who">地方政府 · 国企</div>
              <h3>我在为本地引入人工智能产业</h3>
              <p>我们带着资金、技术与运营，愿意来本地投资兴业。</p>
              <span className="go">人工智能产业共建 <ArrowR s={14} /></span>
            </Link>
            <Link href="/products/fmclaw" className="h-t reveal">
              <div className="accent" style={{ background: "#18A5C9" }} />
              <div className="who">物业公司 · 集成商</div>
              <h3>我要给自己的交付装上 AI</h3>
              <p>同行也在用的 AI 基座——接上你的项目，交付给你的甲方。</p>
              <span className="go">FMClaw™ AI 平台 <ArrowR s={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FMClaw™ Bootcamp · 暗场 core 4 步 */}
      <section className="h-core" id="workshop">
        <div className="h-grid dark" aria-hidden="true" />
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow on-dark reveal">FMClaw™ 加速营 · FMClaw™ Bootcamp</span>
            <h2 className="h-h2 on-dark reveal">用 1–3 天，把你自己的 AI 搭出来</h2>
            <p className="h-premise reveal">
              前提只有一个：<b>带着你的一个真问题，和这个问题的真实数据来。</b>
              没有这两样，就不是 FMClaw™ 加速营。
            </p>
          </div>
          <div className="h-steps reveal">
            <div className="h-step"><div className="n">01</div><h4>把问题说清楚</h4><p>你带来一个真实业务，我们一起把它说成一句话。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="h-step"><div className="n">02</div><h4>接上数据与工具</h4><p>把你的数据接进来，钉钉 / 飞书 / 企微 / ERP 一并打通。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="h-step"><div className="n">03</div><h4>现场拼出 Agent</h4><p>当着你的面，把能帮上这件事的 Agent 搭起来。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="h-step"><div className="n">04</div><h4>跑通，并留给你</h4><p>用你的真实流程跑一遍，跑通的东西留下来继续用。</p></div>
          </div>
          <div className="h-ws-cta reveal">
            <Link href="/workshop" className="btn btn-light">了解 FMClaw™ 加速营 <ArrowR /></Link>
            <Link href="/workshop" className="btn btn-outline-d">预约 →</Link>
          </div>
        </div>
      </section>

      {/* SCENARIO FLOWCHART · 场景流程(mist) */}
      <section className="h-band mist" id="scenario">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">看它怎么干活</span>
            <h2 className="h-h2 reveal">AI 替你把判断想好了，你只做最后那个决定</h2>
            <p className="h-sub reveal">不是“自动跑完一个流程”，而是 AI 替人想清楚了——人只需在最后点一下头</p>
          </div>
          <div className="h-tag reveal">场景 · <b>水电费审批</b></div>
          <div className="h-flow">
            <div className="h-fc reveal"><div className="lane">人原来怎么做</div>
              <h4>翻台账、核表、比往月</h4>
              <p>把每个表的读数对一遍，跟过去几个月比，算分摊、找异常，几天才签得下一笔。</p>
              <Conn />
            </div>
            <div className="h-fc now reveal"><div className="lane">AI 现在帮你想好了什么</div>
              <h4>核完、比完、标出异常</h4>
              <p>自动核表、对比历史用量、圈出异常点位，并给出该签 / 不该签的理由。</p>
              <Conn />
            </div>
            <div className="h-fc last reveal"><div className="lane">人只需做</div>
              <h4>看一眼结论，签字</h4>
              <p>结论、异常、理由都摆在面前。你做的，只是最后那个决定。</p>
            </div>
          </div>
          <div className="h-quote reveal">
            老板签字那一刻，<b>AI 已经分析好</b>
            <span className="sq-detail">该签 / 不该签、异常在哪、为什么</span>
          </div>
          <p className="h-morelink reveal">
            <Link href="/workshop">查看全部适用场景 <ArrowR s={13} /></Link>
          </p>
        </div>
      </section>

      {/* CASE WALL · 案例墙暗场 core */}
      <section className="h-core" id="cases">
        <div className="h-grid dark" aria-hidden="true" />
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow on-dark reveal">客户案例</span>
            <h2 className="h-h2 on-dark reveal">谁在用 · 哪个项目在用</h2>
            <p className="h-sub on-dark reveal">不是演示，是已经在运行的项目。</p>
          </div>
          <div className="h-cases">
            <article className="h-cc reveal">
              <span className="cc-bar" style={{ background: "var(--vi-blue)" }} />
              <div className="cc-head">
                <span className="cc-tag">综合体 · 华南 · 约 <b>6 万㎡</b></span>
                <span className="cc-live"><i className="liv" />自治运营中</span>
              </div>
              <h3 className="cc-result">一个项目跑成了自治运营</h3>
              <p className="cc-desc">日常运营里的判断交给 Agent，现场只保留执行动作。</p>
            </article>
            <article className="h-cc reveal">
              <span className="cc-bar" style={{ background: "var(--vi-green)" }} />
              <div className="cc-head">
                <span className="cc-tag">写字楼 · 华南 · 约 <b>7 万㎡</b> · 5 年合同</span>
                <span className="cc-live"><i className="liv" />在线运行</span>
              </div>
              <h3 className="cc-result">缴费、对账、账单由 Agent 跑通</h3>
              <p className="cc-desc">一笔预算覆盖五年，账目全程可追溯。</p>
            </article>
            <article className="h-cc reveal">
              <span className="cc-bar" style={{ background: "var(--teal)" }} />
              <div className="cc-head">
                <span className="cc-tag">区级国资平台 · 华东省会</span>
                <span className="cc-live"><i className="liv" />已落地</span>
              </div>
              <h3 className="cc-result">已在一座省会城市落地</h3>
              <p className="cc-desc">国有物业的 AI 化运营，正在沉淀成本地的能力。</p>
            </article>
          </div>
          <p className="h-cases-more reveal">已部署并在线运行的项目还在增加。<Link href="/cases">查看更多案例 <ArrowR s={13} /></Link></p>
        </div>
      </section>

      {/* DATA MOAT 数据护城河 · MoatStats */}
      <section className="h-moat">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">数据护城河</span>
            <h2 className="h-moat-lead reveal">七年自营下场，把真实场景一点点变成可训练的数据</h2>
            <p className="h-moat-foot reveal">别人能买到模型，买不到我们这七年的现场</p>
          </div>
          <MoatStats />
        </div>
      </section>

      {/* ENDORSEMENT · 投资与资质 / 已接入大模型 */}
      <section className="h-cred">
        <div className="wrap">
          {/* 1 · 投资 */}
          <div className="h-cred-block reveal">
            <div className="h-cred-blab">投资</div>
            <p className="h-cred-intro">坚持「产业落地 + AI 技术演进 + 资本协同」,连续获得一线 AI 投资机构的认可与投资。</p>
            <div className="h-invest">
              <div className="h-invest-card">
                <div className="h-invest-name">蓝驰创投 <span>Lanchi Ventures</span></div>
                <div className="h-invest-meta">管理规模超 150 亿元</div>
                <div className="h-invest-port">
                  <span className="h-invest-plab">AI 布局</span>
                  <div className="h-invest-tags"><span>理想汽车</span><span>高仙机器人</span><span>Genspark</span><span>月之暗面</span></div>
                </div>
              </div>
              <div className="h-invest-card">
                <div className="h-invest-name">微光创投 <span>WeLight Capital</span></div>
                <div className="h-invest-meta">腾讯高管背景</div>
                <div className="h-invest-port">
                  <span className="h-invest-plab">AI / 智能硬件布局</span>
                  <div className="h-invest-tags"><span>小鹏汽车</span><span>奇朵智能</span><span>纬钛机器人</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 · 资质 */}
          <div className="h-cred-block reveal">
            <div className="h-cred-blab">资质</div>
            <div className="h-qual">
              <div className="h-qual-card">
                <div className="h-qual-img"><img src="/honors/gaoxin.png" alt="国家高新技术企业证书" /></div>
                <div className="h-qual-name">国家高新技术企业</div>
              </div>
              <div className="h-qual-card">
                <div className="h-qual-img"><img src="/honors/zjtx.png" alt="专精特新企业证书" /></div>
                <div className="h-qual-name">专精特新企业</div>
              </div>
              <div className="h-qual-card">
                <div className="h-qual-img"><img src="/honors/nvidia.jpg" alt="英伟达 AI 加速营成员" /></div>
                <div className="h-qual-name">英伟达 AI 加速营成员</div>
              </div>
            </div>
          </div>

          {/* 3 · 已接入主流模型 */}
          <div className="h-cred-block reveal">
            <div className="h-cred-blab">已接入主流模型</div>
            <div className="h-cred-wall h-models">
              <div className="h-cred-cell"><img className="cred-logo" src="/images/endorse/chatgpt.svg" alt="ChatGPT" /><span className="cred-name">ChatGPT</span></div>
              <div className="h-cred-cell"><img className="cred-logo" src="/images/endorse/claude.svg" alt="Claude" /><span className="cred-name">Claude</span></div>
              <div className="h-cred-cell"><img className="cred-logo" src="/images/endorse/gemini.svg" alt="Gemini" /><span className="cred-name">Gemini</span></div>
              <div className="h-cred-cell"><img className="cred-logo" src="/images/endorse/deepseek.svg" alt="DeepSeek" /><span className="cred-name">DeepSeek</span></div>
              <div className="h-cred-cell"><img className="cred-logo" src="/images/endorse/qwen.svg" alt="Qwen" /><span className="cred-name">Qwen</span></div>
              <div className="h-cred-cell"><img className="cred-logo" src="/images/endorse/glm.png" alt="智谱 GLM" /><span className="cred-name">智谱 GLM</span></div>
              <div className="h-cred-cell"><img className="cred-logo" src="/images/endorse/kimi.png" alt="Kimi" /><span className="cred-name">Kimi</span></div>
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
