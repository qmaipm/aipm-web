import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "关于启盟 · 七年自营、数据驱动的 FM 行业 AI — 启盟科技",
  description:
    "启盟科技创立于 2017 年,自营设施管理七年下场,在真实运营中采集数据、训练 FM 行业 AI 基座 FMClaw™。这里讲清我们从一张工单走到一套 AI 基座的过程,以及它为什么难以复制。",
};

export default function Page() {
  return (
    <main>
      {/* HERO（基调保留：让软件，为人工作。） */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <span className="eyebrow reveal">关于启盟</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>让软件,为人工作</h1>
          <p className="lead reveal">
            这些年我们一直在想一件事:工具应该替人省下力气,而不是让人花更多时间去伺候工具。我们做的所有事,都是为了这一句话。
          </p>
        </div>
      </section>

      {/* MISSION 公司使命(逐字使用,克制呈现) */}
      <section className="mission">
        <div className="wrap">
          <p className="mission-en reveal">Make intelligence ambient in the physical world.</p>
          <p className="mission-zh reveal">让智能，走进物理世界。</p>
        </div>
      </section>

      {/* 公司故事 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">公司故事</span>
            <h2 className="reveal">从一张工单,走到一套基座。</h2>
          </div>
          <div className="prose story reveal" style={{ marginTop: 40 }}>
            <p>启盟科技创立于 2017 年。最初的几年,我们做的是物业与设施管理的数字化——把巡检、报修、能耗、外包结算这些每天都在发生的事,一点点搬进系统。</p>
            <p>这件事并不性感。但正是在一个又一个项目里,我们慢慢看清了一件事:行业真正缺的,不是又一个更漂亮的后台,而是能在真实业务里替人做事的能力。表单填得再顺,人还是得自己想、自己判断、自己跟进。</p>
            <p>于是我们把方向往下落了一层。从应用,走到平台;从记录数据,走到让数据能被理解、被调用、被一个 Agent 接着往下做。我们开始搭自己的 AI 基座,把这些年攒下的行业理解,沉淀成软件能用的能力。</p>
            <p>到今天,我们做的事可以用一句话说清:让物业与设施管理里那些重复、琐碎、却又离不开人的工作,先交给软件;把人留给真正需要判断的地方。</p>
          </div>
        </div>
      </section>

      {/* 公司演进时间线 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">公司演进</span>
            <h2 className="reveal">一步一步,走到今天。</h2>
            <p className="sub reveal">不是一蹴而就,是七年里一层层往下落。</p>
          </div>
          <div className="deflist timeline reveal">
            <div className="row"><div className="k">2017</div><div className="v">公司成立,聚焦非住宅设施管理领域。</div></div>
            <div className="row"><div className="k">2019</div><div className="v">自营 FM 公司亲自下场,开始在真实运营中采集场景数据。</div></div>
            <div className="row"><div className="k">2023</div><div className="v">构建 AI 物业经理智能体 FMClaw™。</div></div>
            <div className="row"><div className="k">2025</div><div className="v">设立国有物业人工智能发展基金。</div></div>
          </div>
        </div>
      </section>

      {/* 我们凭什么 · 数据护城河叙事 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">我们凭什么</span>
            <h2 className="reveal">真正难复制的,不是模型。</h2>
          </div>
          <div className="prose reveal" style={{ marginTop: 40 }}>
            <p>我们能做这件事,靠的不是某个模型本身——模型大家都能调用。真正难复制的,是模型背后的东西。</p>
            <p>七年前,我们没有停在做软件,而是自己下场做自营的设施管理。一线的巡检、报修、能耗、对账,每天都在真实地发生;我们就在这些场景里,把它们一点点变成可以被理解、被标注、被训练的数据。到今天,这覆盖约 3000 万㎡ 的全业态真实场景、约 20 万 G 已标注训练数据、10 万+ 传感器实时在线,每天持续产生大量结构化数据。</p>
            <p>这些数据拿去训练 AI,AI 在真实运营里越用越准;用得越准,又带回更贴近现场的数据。这是一条自己转起来的循环,也是别人很难从外部买到、或在短时间内追上的部分。</p>
          </div>
        </div>
      </section>

      {/* 资质与背书 · 分两层 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">资质与背书</span>
            <h2 className="reveal">把资质拆成两件事看。</h2>
            <p className="sub reveal">不是一面奖牌墙,而是两层各自说明:技术是真的,以及它被官方认可。</p>
          </div>
          <div className="cred-2">
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }} />
              <div className="lab">技术能力</div>
              <div className="big">技术是真的</div>
              <p>我们通过了 NVIDIA Inception 计划,积累了近百项发明专利与软件著作权,并取得 ISO 9001 与 ISO 27001 体系认证。它们指向同一件事:底层能力经得起检验,不是 PPT 上的一句描述。</p>
            </div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }} />
              <div className="lab">政府与产业认可</div>
              <div className="big">它被官方认可</div>
              <p>我们是国家高新技术企业、专精特新企业,也是黄埔区科技领军企业与具身智能双链单位、广州市人工智能示范单位。这些认定来自政府与产业一侧,说明这条路不只是我们自己说好。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 我们相信什么 */}
      <section className="band belief">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">我们相信什么</span>
            <h2 className="reveal">几条朴素的信念。</h2>
            <p className="sub reveal">它们不新,但我们当真。</p>
          </div>
          <div className="grid c3" style={{ marginTop: 48 }}>
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }} />
              <div className="big">软件应当为人工作</div>
              <p>好的系统让人少做、少记、少操心。如果用起来更累,那是工具的问题,不是人的问题。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }} />
              <div className="big">能力要在真实业务里长出来</div>
              <p>我们不相信脱离场景的通用方案。AI 的价值,只有在一件真问题、一份真数据上跑通,才算数。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--gold)" }} />
              <div className="big">时间会站在做事的人这边</div>
              <p>积累需要时间,理解需要时间。我们愿意把时间花在难而正确的地方。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--purple)" }} />
              <div className="big">人和 AI 是接力,不是替代</div>
              <p>软件接住可以自动的部分,人接住需要判断的部分。两端都清楚自己在做什么。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--pink)" }} />
              <div className="big">交付的是成果,不是材料</div>
              <p>我们更愿意让你带走一个还在运行的东西,而不是一份讲得很好的方案。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--ink)" }} />
              <div className="big">物业是 AI 最该落地的地方</div>
              <p>这里有大量真实、连续、重复的工作。这正是软件最能帮上忙的地方,也是我们的愿景所在。</p></div>
          </div>
        </div>
      </section>

      {/* 一点背景 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">一点背景</span>
            <h2 className="reveal">几件可以提一下的事。</h2>
          </div>
          <div className="bg-2">
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }} />
              <div className="big">在地注册落地</div>
              <p>我们以「国有物业人工智能产业共建」的方式,与地方一起在本地注册公司、落地团队,把能力沉淀在当地,而不是只做一次性交付。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }} />
              <div className="big">一支 AI + FM 方向的基金</div>
              <p>我们设立了国有物业人工智能发展基金,用于支持这个方向上长期、踏实的事。这里只作为一个事实陈述。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--gold)" }} />
              <div className="big">名字与那只龙虾</div>
              <p>FMClaw 里的 Claw,是我们产品的那只"龙虾爪"。FM 是 Facility Management,Claw 是它伸出去、替你把活儿接住的那只手。这个 IP 一直陪着我们,也提醒我们:工具是用来干活的。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--purple)" }} />
              <div className="big">我们想去的地方</div>
              <p>让 AI 真正进入物业与设施管理的日常运营,成为这个行业理所当然的一部分。我们不急,但方向很清楚。</p></div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与<br />设施管理的日常运营。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 16.5 }}>预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
