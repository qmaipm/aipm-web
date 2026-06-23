import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "关于启盟 · 使命与八年自营 — 启盟科技",
  description:
    "启盟科技创立于 2017 年,八年自营物业与设施管理,在真实运营中积累数据与工作流。我们的使命:让智能,走进物理世界。物业是这件事最大、也最现实的入口。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const phases = [
  { tag: "2017 — 2021", label: "在真实运营中积累", kind: "biz" },
  { tag: "2023 — 至今", label: "让智能体真正干活", kind: "tech" },
];

const milestones = [
  {
    year: "2017", h: "确立方向,启动数据采集", s: "公司成立,聚焦非住宅 FM,从数据采集做起。", kind: "biz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" /><path d="M15.6 8.4l-2.2 5-5 2.2 2.2-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    ),
  },
  {
    year: "2019", h: "自营物业,跑通真实数据", s: "自建物业公司,亲历一线服务的交付全程。", kind: "biz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M5 21V6.5L12 3l7 3.5V21" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 21h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M9.5 21v-4h5v4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 9.5h1.5M13.5 9.5H15M9 12.5h1.5M13.5 12.5H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
  {
    year: "2021", h: "获得机构投资", s: "蓝驰创投、微光创投相继完成投资。", kind: "biz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 15l5-5 4 4 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 7h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    year: "2023", h: "构建第一代产品", s: "基于大模型,构建初代「AI 物业经理」。", kind: "tech",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8.5 4.5L12 12 3.5 7.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 12l8 4.3 8-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M4 16.5l8 4.3 8-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    ),
  },
  {
    year: "2025", h: "智能体走向成熟", s: "底层架构成熟,智能体可独立执行任务。", kind: "tech",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><rect x="7" y="7" width="10" height="10" rx="2.4" stroke="currentColor" strokeWidth="1.6" /><path d="M10 3.5v2.5M14 3.5v2.5M10 18v2.5M14 18v2.5M3.5 10H6M3.5 14H6M18 10h2.5M18 14h2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
  {
    year: "2026", h: "FMClaw 让智能体干活", s: "智能体在物业场景中承担实际工作。", kind: "tech", now: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="8" width="14" height="10" rx="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M12 4.6v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.2" fill="currentColor" /><circle cx="9.6" cy="13" r="1.15" fill="currentColor" /><circle cx="14.4" cy="13" r="1.15" fill="currentColor" /><path d="M2.9 12v2.6M21.1 12v2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
];

const certs = [
  { name: "国家高新技术企业", note: "国家级资质权威认证", logo: "/honors/gaoxin.png", bar: "bar-red", cls: "qm-certMini--hi" },
  { name: "专精特新企业", note: "专业化、精细化中小企业", logo: "/honors/zjtx.png", bar: "bar-amber", cls: "qm-certMini--sz" },
  { name: "双链单位认证", note: "黄埔区具身智能「算力+应用」双链主", logo: "/honors/huangpu.png", bar: "bar-sky", cls: "qm-certMini--sz" },
  { name: "NVIDIA Inception", note: "全球 AI 加速营成员", logo: "/honors/nvidia.jpg", bar: "bar-emerald", cls: "" },
];

const beliefs = [
  { h: "能力源于真实业务", p: "AI 的价值不在通用方案,而在具体场景中得到验证——一件真实的问题、一份真实的数据,跑通了才成立。" },
  { h: "人与 AI 是协作,而非替代", p: "软件承担可自动化的部分,人承担需要判断的部分,各司其职,边界清晰。" },
  { h: "交付成果,而非方案", p: "我们交付的是可持续运行的系统,而不是停留在纸面的设想。" },
  { h: "物业是 AI 最应落地之处", p: "这里有大量真实、连续、重复的工作,正是软件最能创造价值的场景,也是我们愿景的起点。" },
];

const backgrounds = [
  {
    big: "在地共建,而非一次性交付",
    body: "我们以「国有物业人工智能产业共建」模式,与地方共同在本地注册公司、组建团队,使能力沉淀于当地并持续运营,而非交付完成即撤场。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.6" fill="#fff" /></svg>
    ),
  },
  {
    big: "一支聚焦 AI + FM 的基金",
    body: "我们设立国有物业人工智能发展基金,持续投入这一方向,为愿意长期同行的伙伴提供资金层面的承诺。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 10 12 4l8 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
  {
    big: "关于 FMClaw 的命名",
    body: "FM 取自 Facility Management,Claw 是产品的标志形象——一只替你「接住」工作的手。这一形象贯穿我们的产品,也提醒我们:工具的意义在于完成工作。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M12 11 7 7M12 11l5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M7 7 4 9M17 7l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16" r="4" stroke="currentColor" strokeWidth="1.6" /></svg>
    ),
  },
];

export default function Page() {
  return (
    <main className="solcm">
      {/* HERO */}
      <section className="cm-hero">
        <div className="cm-grid" aria-hidden="true" />
        <div className="wrap cm-hero-top">
          <span className="cm-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>关于启盟
          </span>
          <h1 className="cm-h1">
            让软件,<span className="grad">为人工作</span>
          </h1>
          <p className="cm-lead">
            这些年我们一直在想一件事:工具应该替人省下力气,而不是让人花更多时间去伺候工具。我们做的所有事,都是为了<b>这一句话</b>。
          </p>
          <div className="cm-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#evolution" className="btn btn-ghost">看八年演进 <Arrow /></a>
          </div>
          <div className="cm-proof">
            <span>创立于 <b>2017</b></span>
            <span className="sep" />
            <span><b className="grad">八年</b>自营物业</span>
            <span className="sep" />
            <span>近<b>百项</b>专利与软著</span>
          </div>
        </div>
      </section>

      {/* MISSION · 深色签名 core 段 */}
      <section className="cm-core">
        <div className="cm-grid dark" aria-hidden="true" />
        <span className="cm-core-glow" aria-hidden="true" />
        <div className="wrap">
          <span className="cm-eyebrow on-dark">公司使命</span>
          <p className="cm-core-en">Make intelligence ambient in the physical world</p>
          <h2 className="cm-h2 on-dark cm-core-zh">让智能,走进物理世界</h2>
          <p className="cm-verdict">这是我们做每一件事的方向。<span className="grad">物业,是它最大、也最现实的入口。</span></p>
        </div>
      </section>

      {/* 公司演进 · 八年大事记 */}
      <section className="cm-band" id="evolution">
        <div className="wrap">
          <span className="cm-eyebrow">公司演进 · 大事记</span>
          <h2 className="cm-h2">八年,做同一件事</h2>
          <p className="cm-sub">自 2017 年至今,启盟始终专注一件事:让智能走进物业与设施管理的真实运营。这条路分为两个阶段——先在一线积累数据与工作流,再让智能体真正承担工作。</p>

          <div className="cm-rail">
            <div className="cm-rail__phases">
              {phases.map((p) => (
                <div className="cm-rail__phase" data-kind={p.kind} key={p.tag}>
                  <span className="cm-rail__tag">{p.tag}</span>
                  <b>{p.label}</b>
                </div>
              ))}
            </div>
            <div className="cm-rail__track">
              <span className="cm-rail__line" aria-hidden="true" />
              <span className="cm-rail__shift" aria-hidden="true">
                <em>大模型出现</em>
              </span>
              {milestones.map((m, i) => (
                <div
                  className={`cm-rail__node${m.now ? " is-now" : ""}`}
                  data-kind={m.kind}
                  data-side={i % 2 === 0 ? "down" : "up"}
                  key={m.year}
                >
                  <span className="cm-rail__icon" aria-hidden="true">{m.icon}</span>
                  <span className="cm-rail__dot" aria-hidden="true" />
                  <div className="cm-rail__card">
                    <div className="cm-rail__year">
                      {m.year}
                      {m.now && <em>现在</em>}
                    </div>
                    <h3 className="cm-rail__h">{m.h}</h3>
                    <p className="cm-rail__p">{m.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="cm-foot">
            <span className="lead">八年里的每一步,都在验证——</span>
            让智能走进<span className="grad">物业与设施管理的真实运营</span>
          </p>
        </div>
      </section>

      {/* 我们凭什么 · 数据护城河 */}
      <section className="cm-band mist">
        <div className="wrap">
          <span className="cm-eyebrow">我们凭什么</span>
          <h2 className="cm-h2">真正难复制的,不是模型</h2>
          <div className="cm-moat">
            <div className="cm-moat__say">
              <p>真正难复制的,不是模型,也不是某个产品;是比通用智能体架构更复杂的东西——在物业的每一件工作里,都藏着数据、Skill 与工具的特定组合。</p>
              <p>把这些一件件梳理成又宽又深的工作流,需要的是七八年在真实现场里一点点跑出来的积累。</p>
              <p className="cm-moat__verdict">这部分,<span className="grad">只能跑出来,买不到</span>。</p>
            </div>
            <aside className="cm-moat__panel" aria-hidden="true">
              <div className="cm-moat__head">每一件工作里的特定组合</div>
              <div className="cm-moat__mix">
                <span className="cm-chip" data-k="data">
                  <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.6" /><path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" stroke="currentColor" strokeWidth="1.6" /><path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" stroke="currentColor" strokeWidth="1.6" /></svg>
                  数据
                </span>
                <i>×</i>
                <span className="cm-chip" data-k="skill">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  Skill
                </span>
                <i>×</i>
                <span className="cm-chip" data-k="tool">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 6.5a3.8 3.8 0 0 0-5 5l-5 5a1.5 1.5 0 0 0 2.1 2.1l5-5a3.8 3.8 0 0 0 5-5l-2.4 2.4-2.1-2.1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  工具
                </span>
              </div>
              <div className="cm-moat__down" />
              <div className="cm-moat__result">又宽又深的工作流</div>
              <div className="cm-moat__foot">七八年,在真实现场一点点跑出来</div>
            </aside>
          </div>
        </div>
      </section>

      {/* 荣誉与资质 · 移植自 aipm.cn(真实证书图 + 扇形堆叠动效) */}
      <section className="cm-band qm-honor" id="honors">
        <div className="wrap">
          <span className="cm-eyebrow">资质与认可</span>
          <h2 className="cm-h2">荣誉与资质</h2>
          <p className="cm-sub">技术、资质与产业生态的认可,逐项可查——这是你把项目交给我们的底气。</p>

          <div className="qm-honor__layout">
            {/* 左:知识产权 · 专利证书扇形堆叠 */}
            <section className="qm-panel">
              <div className="qm-panel__head"><span>发明专利</span></div>
              <div className="qm-ip">
                <div className="qm-stack">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <img key={i} src="/honors/patent.png" alt="发明专利证书" loading="lazy" />
                  ))}
                </div>
                <div className="qm-badge">近百项发明专利与软著</div>
              </div>
            </section>

            {/* 右:认证体系 + ISO 堆叠 */}
            <section className="qm-panel">
              <div className="qm-panel__head"><span>认证体系</span></div>
              <div className="qm-certWrap">
                <div className="qm-certMiniGrid">
                  {certs.map((c) => (
                    <div className={`qm-certMini ${c.bar} ${c.cls}`} key={c.name}>
                      <span className="qm-certMini__bar" aria-hidden="true" />
                      <div className="qm-certMini__logo"><img src={c.logo} alt={c.name} loading="lazy" /></div>
                      <div className="qm-certMini__text">
                        <p className="qm-certMini__title">{c.name}</p>
                        <p className="qm-certMini__sub">{c.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="qm-certISO">
                  <span className="qm-certISO__bar" aria-hidden="true" />
                  <div className="qm-certISO__top"><p className="qm-certISO__title">ISO 质量体系</p></div>
                  <div className="qm-isoStage">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div className="qm-isoSheet" key={i}><img src="/honors/iso.png" alt="ISO 证书" loading="lazy" /></div>
                    ))}
                  </div>
                  <p className="qm-certISO__sub">ISO 9001 / 27001 多项国际认证</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* 我们相信什么 */}
      <section className="cm-band mist">
        <div className="wrap">
          <span className="cm-eyebrow">我们相信什么</span>
          <h2 className="cm-h2">软件应当为人工作</h2>
          <p className="cm-sub">好的系统让人少做、少记、少操心。如果用起来更累,那是工具的问题,不是人的问题。这是我们做每一件事的出发点。</p>
          <div className="cm-belief">
            {beliefs.map((b) => (
              <div className="cm-bitem" key={b.h}>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 一点背景 */}
      <section className="cm-band">
        <div className="wrap">
          <h2 className="cm-h2">我们能为你做什么</h2>
          <div className="cm-bg">
            {backgrounds.map((b) => (
              <div className="cm-card" key={b.big}>
                <span className="cm-bg-ic">{b.icon}</span>
                <div className="cm-big">{b.big}</div>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
          <div className="cm-vision">
            <span className="cm-vision-lab">我们想去的地方</span>
            <p>物业,是我们开始的地方,不是终点。终局是让智能走进物理世界——让无数智能体与具身机器人,在真实世界里运转。</p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与<br />设施管理的日常运营</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
