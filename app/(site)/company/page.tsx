import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "关于启盟 · 使命与八年自营 — 启盟科技",
  description:
    "启盟科技创立于 2017 年,八年自营物业与设施管理,在真实运营中积累数据与工作流。我们的使命:让智能,走进物理世界。物业是这件事最大、也最现实的入口。",
};

export default function Page() {
  return (
    <main className="company">
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

      {/* MISSION · 公司使命(逐字使用,深色签名时刻) */}
      <section className="co-mission">
        <div className="co-mgrid" aria-hidden="true" />
        <span className="co-mglow" aria-hidden="true" />
        <div className="wrap">
          <p className="co-men reveal">Make intelligence ambient in the physical world</p>
          <p className="co-mzh reveal">让智能，走进物理世界</p>
          <p className="co-msub reveal">这是我们做每一件事的方向。物业,是它最大、也最现实的入口。</p>
        </div>
      </section>

      {/* 公司演进时间线 + 故事引导 */}
      <section className="co-band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">公司演进</span>
            <h2 className="co-h2 reveal">八年,做同一件事</h2>
          </div>
          <div className="story-lead reveal">
            <p>2017 年到今天,启盟只做了一件事:让智能走进物业与设施管理的真实运营。下面这条线,每一年只讲一件事——我们当年做了什么。</p>
          </div>
          <ol className="timeline reveal">
            <li className="t-row"><span className="t-year">2017</span><div className="t-body"><h3>认定方向,开始采集数据</h3><p>三个做技术的人,认定物业与设施管理是 AI 最天然的落地场景。公司成立,聚焦非住宅 FM。第一件事是数据采集——去感知一次服务到底有没有做、做了多久。</p></div></li>
            <li className="t-row"><span className="t-year">2019</span><div className="t-body"><h3>自己开物业公司,自己跑数据</h3><p>为了拿到真实数据,自己开了一家物业公司,自己接单、自己跑数据。</p></div></li>
            <li className="t-row"><span className="t-year">2021</span><div className="t-body"><h3>拿到机构投资</h3><p>还在埋头做数据采集这种又脏又累的活时,得到蓝驰创投、微光创投的投资。</p></div></li>
            <li className="t-row"><span className="t-year">2023</span><div className="t-body"><h3>构建第一代产品</h3><p>大模型出现,世界开始相信 AI。基于它,构建了第一代产品(当时名为 AI 物业经理)。</p></div></li>
            <li className="t-row"><span className="t-year">2025</span><div className="t-body"><h3>智能体走向成熟</h3><p>底层架构具备了让智能体在真实场景中独立干活的条件。</p></div></li>
            <li className="t-row now"><span className="t-year">2026</span><div className="t-body"><h3>FMClaw 让智能体真正干活</h3><p>基于智能体架构,FMClaw 让智能体真正能在物业场景里干活。</p></div></li>
          </ol>
          <p className="band-foot reveal">八年里每一步,都在验证同一个判断——让智能走进物理世界,物业是这件事最大、也最现实的入口。</p>
        </div>
      </section>

      {/* 我们凭什么 · 数据护城河叙事 */}
      <section className="co-band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">我们凭什么</span>
            <h2 className="co-h2 reveal">真正难复制的,不是模型</h2>
          </div>
          <div className="prose reveal" style={{ marginTop: 40 }}>
            <p>真正难复制的,不是模型,也不是某个产品;是比通用智能体架构更复杂的东西——在物业的每一件工作里,都藏着数据、Skill 与工具的特定组合。</p>
            <p>把这些一件件梳理成又宽又深的工作流,需要的是七八年在真实现场里一点点跑出来的积累。这部分,只能跑出来,买不到。</p>
          </div>
        </div>
      </section>

      {/* 资质与背书 · 分两层 */}
      <section className="co-band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">资质与背书</span>
            <h2 className="co-h2 reveal">把资质拆成两件事看</h2>
            <p className="sub reveal">不是一面奖牌墙,而是两层各自说明:技术是真的,以及它被官方认可。</p>
          </div>
          <div className="cred-2">
            <div className="card reveal"><div className="k" />
              <div className="lab">技术能力</div>
              <div className="big">技术是真的</div>
              <p>我们通过了 NVIDIA Inception 计划,积累了近百项发明专利与软件著作权,并取得 ISO 9001 与 ISO 27001 体系认证。它们指向同一件事:底层能力经得起检验,不是 PPT 上的一句描述。</p>
            </div>
            <div className="card reveal"><div className="k" />
              <div className="lab">政府与产业认可</div>
              <div className="big">它被官方认可</div>
              <p>我们是国家高新技术企业、专精特新企业,也是黄埔区科技领军企业与具身智能双链单位、广州市人工智能示范单位。这些认定来自政府与产业一侧,说明这条路不只是我们自己说好。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 我们相信什么 */}
      <section className="co-band alt belief">
        <div className="wrap">
          <div className="belief-head">
            <span className="eyebrow reveal">我们相信什么</span>
            <h2 className="co-h2 reveal">软件应当为人工作</h2>
            <p className="belief-intro reveal">好的系统让人少做、少记、少操心。如果用起来更累,那是工具的问题,不是人的问题。这是我们做每一件事的出发点,下面几条,都从这里长出来。</p>
          </div>
          <div className="belief-list reveal">
            <div className="b-item"><h3>能力要在真实业务里长出来</h3><p>我们不相信脱离场景的通用方案。AI 的价值,只有在一件真问题、一份真数据上跑通,才算数。</p></div>
            <div className="b-item"><h3>人和 AI 是接力,不是替代</h3><p>软件接住可以自动的部分,人接住需要判断的部分。两端都清楚自己在做什么。</p></div>
            <div className="b-item"><h3>交付的是成果,不是材料</h3><p>我们更愿意让你带走一个还在运行的东西,而不是一份讲得很好的方案。</p></div>
            <div className="b-item"><h3>时间会站在做事的人这边</h3><p>积累需要时间,理解需要时间。我们愿意把时间花在难而正确的地方。</p></div>
            <div className="b-item"><h3>物业是 AI 最该落地的地方</h3><p>这里有大量真实、连续、重复的工作。这正是软件最能帮上忙的地方,也是我们的愿景所在。</p></div>
          </div>
        </div>
      </section>

      {/* 一点背景 */}
      <section className="co-band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">一点背景</span>
            <h2 className="co-h2 reveal">几件可以提一下的事</h2>
          </div>
          <div className="bg-2">
            <div className="card reveal"><div className="k" />
              <div className="big">在地注册落地</div>
              <p>我们以「国有物业人工智能产业共建」的方式,与地方一起在本地注册公司、落地团队,把能力沉淀在当地,而不是只做一次性交付。</p></div>
            <div className="card reveal"><div className="k" />
              <div className="big">一支 AI + FM 方向的基金</div>
              <p>我们设立了国有物业人工智能发展基金,用于支持这个方向上长期、踏实的事。这里只作为一个事实陈述。</p></div>
            <div className="card reveal"><div className="k" />
              <div className="big">名字与那只龙虾</div>
              <p>FMClaw 里的 Claw,是我们产品的那只"龙虾爪"。FM 是 Facility Management,Claw 是它伸出去、替你把活儿接住的那只手。这个 IP 一直陪着我们,也提醒我们:工具是用来干活的。</p></div>
          </div>
          <div className="vision-card reveal">
            <span className="vision-lab">我们想去的地方</span>
            <p>物业,是我们开始的地方,不是终点。终局是让智能走进物理世界——让无数智能体与具身机器人,在真实世界里运转。我们不急,但方向很清楚。</p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与设施管理的日常运营</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
