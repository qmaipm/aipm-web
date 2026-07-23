import type { Metadata } from "next";
import Link from "next/link";
import "./home.css";
import MissionBackdrop from "./MissionBackdrop";
import MoatStats from "./MoatStats";
import HeroAgentShowcase from "./HeroAgentShowcase";
import { getArticle } from "./insights/articles";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";

// 标题/描述与根布局一致;单独声明是为了首页也有指向自身的 canonical 与 og:url
export const metadata = pageMetadata("/", {
  title: "启盟科技 · 物业与设施管理的 AI 操作系统｜FMClaw™",
  description:
    "物业与设施管理,正在被 AI 重写。FMClaw™ 把 AI 接入日常运营。带着你的一个真实业务,在 FMClaw™ 加速营里用 1–3 天把它跑通。",
  openGraph: {
    // 品牌分享图:源文件 scripts/og/og-home.html,用 Playwright 1200×630 截图生成
    images: [{ url: "/og/og-home.png", width: 1200, height: 630, alt: "启盟科技 Stalliance × FMClaw™ — 让智能，走进物理世界" }],
  },
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

// 首页展示的三篇行业研究(全部为已发布的真实文章页)
const RESEARCH_SLUGS = ["demo-vs-system", "what-is-fde", "ai-transformation-bottom-up"] as const;

export default function Home() {
  const research = RESEARCH_SLUGS.map((s) => getArticle(s));
  return (
    <main className="solhome">
      {/* ① HERO — 公司级开场:左文案 + 右「AI 正在处理真实工作」演示(改造自 Agentic 套件服务优化 Agent 动效) */}
      <section className="h-hero">
        <div className="h-grid" aria-hidden="true" />
        <div className="wrap h-hero-top">
          <div className="h-hero-cols">
            <div>
              <p className="h-kicker reveal">物业与设施管理的 AI 操作系统</p>
              <h1 className="reveal">让 AI，真正在<br />物业与设施管理里<span className="hl">干活</span></h1>
              <p className="h-note reveal">
                不是再加一个工具，而是把巡检、工单、客服、品质、结算等运营工作，一件件交给 AI。
              </p>
              <p className="h-note sub reveal">
                FMClaw™ 连接模型、数据、系统、IoT 和机器人，已经在真实物业与设施管理项目中部署运行。
              </p>
              <div className="cta-row reveal">
                <Link href="/#product" className="btn btn-primary">看 FMClaw™ 怎么干活 <ArrowD /></Link>
                <Link href="/workshop" className="btn btn-ghost">从一个真实问题开始 <ArrowR /></Link>
              </div>
              <p className="h-deployed reveal" aria-label="状态:已在生产环境部署">
                Not a demo. Not a pilot. <b>Deployed.</b>
              </p>
            </div>
            <div className="hw-wrap reveal">
              <HeroAgentShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS LOGO WALL */}
      <div className="h-clients">
        <div className="wrap">
          <p className="h-clients-title reveal">服务过的企业与项目</p>
          <div className="h-clients-wall reveal">
            <div className="cell"><img src="/images/clients/tesla.svg" alt="特斯拉 Tesla" loading="lazy" /></div>
            <div className="cell"><img src="/images/clients/siemens.svg" alt="西门子 Siemens" loading="lazy" /></div>
            <div className="cell"><img src="/images/clients/tencent.svg" alt="腾讯 Tencent" style={{ maxHeight: "42px" }} loading="lazy" /></div>
            <div className="cell"><img src="/images/clients/sf.svg" alt="顺丰速运 SF Express" loading="lazy" /></div>
          </div>
        </div>
      </div>

      {/* ② MISSION · 暗场 + 三支柱 */}
      <section className="h-mission mission-dark" id="mission">
        <MissionBackdrop />
        <div className="wrap">
          <p className="h-mission-en reveal">Make intelligence ambient in the physical world</p>
          <p className="h-mission-zh reveal">让智能，走进物理世界</p>
          <p className="h-mission-note reveal">
            物理世界里的智能，不只有一种形态。AI 参与管理与决策，机器人承担标准化劳动，IoT 让空间持续可感知。
            物业与设施管理无处不在，是三种智能最自然的交汇点，也是启盟科技选择的起点。
          </p>
          <div className="h-pillars">
            <div className="h-pillar reveal">
              <svg className="pl-ill" viewBox="0 0 120 56" aria-hidden="true">
                <rect x="4" y="18" width="30" height="20" rx="5" className="pl-node" />
                <rect x="45" y="8" width="30" height="20" rx="5" className="pl-node hi" />
                <rect x="45" y="30" width="30" height="20" rx="5" className="pl-node" />
                <rect x="86" y="18" width="30" height="20" rx="5" className="pl-node" />
                <path d="M34 28 L45 18 M34 28 L45 40 M75 18 L86 28 M75 40 L86 28" className="pl-link" />
                <circle cx="60" cy="18" r="2.4" className="pl-dot" />
              </svg>
              <div className="pl-n">01 管理</div>
              <h3>AI 智能体</h3>
              <p>巡检、工单、客服、品质、结算和运营分析，由 AI 参与执行与判断。</p>
              <Link className="pl-go" href="/products/fmclaw">FMClaw™ 智能体平台 <ArrowR /></Link>
            </div>
            <div className="h-pillar reveal">
              <svg className="pl-ill" viewBox="0 0 120 56" aria-hidden="true">
                <rect x="30" y="16" width="26" height="18" rx="6" className="pl-node hi" />
                <circle cx="38" cy="25" r="2.2" className="pl-dot" /><circle cx="48" cy="25" r="2.2" className="pl-dot" />
                <rect x="34" y="36" width="18" height="10" rx="3" className="pl-node" />
                <path d="M20 50 H100" className="pl-link" />
                <path d="M74 46 v-14 m0 0 l-6 8 m6-8 l6 8 M74 32 a5 5 0 1 1 .1 0" className="pl-link man" />
              </svg>
              <div className="pl-n">02 劳动</div>
              <h3>机器人与具身智能</h3>
              <p>清洁、巡逻、安防和巡检，由机器人与现场人员协同完成。</p>
              <Link className="pl-go" href="/products/robots">机器人与智能装备 <ArrowR /></Link>
            </div>
            <div className="h-pillar reveal">
              <svg className="pl-ill" viewBox="0 0 120 56" aria-hidden="true">
                <rect x="44" y="10" width="32" height="40" rx="4" className="pl-node" />
                <path d="M50 20h20M50 28h20M50 36h20" className="pl-link" />
                <circle cx="22" cy="16" r="3" className="pl-dot" /><circle cx="16" cy="38" r="3" className="pl-dot" />
                <circle cx="100" cy="14" r="3" className="pl-dot" /><circle cx="104" cy="42" r="3" className="pl-dot" />
                <path d="M25 18 L44 26 M19 37 L44 40 M97 16 L76 24 M101 41 L76 38" className="pl-link dash" />
              </svg>
              <div className="pl-n">03 感知</div>
              <h3>IoT 与物理 AI</h3>
              <p>设备、环境、能耗、人流和空间状态，被持续感知并转化为 AI 可以理解的数据。</p>
              <Link className="pl-go" href="/products/iot">IoT 物理世界感知 <ArrowR /></Link>
            </div>
          </div>
          <p className="h-mission-close reveal">物业与设施管理，不是智能的终点，而是智能进入物理世界的起点。</p>
        </div>
      </section>

      {/* ③ 访客分流 · 4 卡 */}
      <section className="h-band" id="tri">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">对号入座</span>
            <h2 className="h-h2 reveal">你来这里，想解决哪一件事？</h2>
          </div>
          <div className="h-tri">
            <Link href="/products/fmclaw" className="h-t reveal">
              <div className="accent" style={{ background: "var(--h-blue)" }} />
              <div className="h-cardimg"><img src="/home/audience-pm.webp" alt="大型综合体中庭，清洁机器人与一线人员在作业动线上工作" loading="lazy" width={900} height={600} /></div>
              <div className="who">物业公司 · 设施管理方</div>
              <h3>把 AI 接进现有运营</h3>
              <p>减少重复管理工作，让巡检、工单、结算里的判断与流转交给智能体。</p>
              <span className="go">FMClaw™ 平台 <ArrowR s={14} /></span>
            </Link>
            <Link href="/ai-service" className="h-t reveal">
              <div className="accent" style={{ background: "var(--h-green)" }} />
              <div className="h-cardimg"><img src="/home/audience-owner.webp" alt="清晨航拍：机场、码头与物流园区等重资产基础设施" loading="lazy" width={900} height={600} /></div>
              <div className="who">业主 · 资产管理方</div>
              <h3>让物业服务透明、主动、可量化</h3>
              <p>由 AI 接管的物业服务——指标写进合同，账目全程可追溯。</p>
              <span className="go">AI 物业服务 <ArrowR s={14} /></span>
            </Link>
            <Link href="/cobuild" className="h-t reveal">
              <div className="accent" style={{ background: "#0C8B82" }} />
              <div className="h-cardimg"><img src="/home/audience-gov.webp" alt="医院、学校与政府办公建筑组成的公共机构建筑群" loading="lazy" width={900} height={600} /></div>
              <div className="who">政府 · 地方国资</div>
              <h3>推动本地 AI 产业落地</h3>
              <p>从真实场景开始，让技术、团队和产业能力在本地持续运营。</p>
              <span className="go">人工智能产业共建 <ArrowR s={14} /></span>
            </Link>
            <Link href="/partners" className="h-t reveal">
              <div className="accent" style={{ background: "#18A5C9" }} />
              <div className="h-cardimg"><img src="/home/audience-integrator.webp" alt="楼宇设备层：密集的管线、风管与配电柜，工程师在巡检" loading="lazy" width={900} height={600} /></div>
              <div className="who">集成商 · 软件企业</div>
              <h3>给现有项目和产品加上智能体</h3>
              <p>在你的项目和产品上增加智能体能力，交付给你的客户。</p>
              <span className="go">生态伙伴计划 <ArrowR s={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ④ 一套 AI 能力 · 三种交付方式 */}
      <section className="h-band mist" id="delivery">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">公司级业务</span>
            <h2 className="h-h2 reveal">同一套 AI 能力，按你的目标交付</h2>
          </div>
          <div className="h-dlv">
            <Link href="/products/fmclaw" className="h-dc reveal">
              <div className="h-cardimg"><img src="/home/deliver-platform.webp" alt="傍晚的园区：清洁机器人与四足巡检机器人在无人广场上自主作业" loading="lazy" width={900} height={600} /></div>
              <div className="dc-num">Ⅰ</div>
              <h3>FMClaw™ 平台与智能体交付</h3>
              <p>客户保留自己的运营团队，启盟提供平台、FDE、数据治理和智能体生产落地。</p>
              <div className="dc-fit"><span>适合</span>物业公司 · 集团客户 · 业主自用</div>
              <span className="go">了解 FMClaw™ <ArrowR s={14} /></span>
            </Link>
            <Link href="/ai-service" className="h-dc reveal">
              <div className="h-cardimg"><img src="/home/deliver-managed.webp" alt="一位运营管理者通过多块屏幕同时管理多个物业项目" loading="lazy" width={900} height={600} /></div>
              <div className="dc-num">Ⅱ</div>
              <h3>爱物管 AI 物业运营托管</h3>
              <p>由爱物管作为履约主体，直接交付可量化、可追溯的物业服务结果。</p>
              <div className="dc-fit"><span>适合</span>园区 · 写字楼 · 商业综合体 · 政府办公</div>
              <span className="go">了解 AI 物业服务 <ArrowR s={14} /></span>
            </Link>
            <Link href="/cobuild" className="h-dc reveal">
              <div className="h-cardimg"><img src="/home/deliver-cobuild.webp" alt="城区航拍：住宅、产业园与河道交织的地方城市肂理" loading="lazy" width={900} height={600} /></div>
              <div className="dc-num">Ⅲ</div>
              <h3>人工智能产业共建</h3>
              <p>以地方国有物业和园区场景为起点，让技术、团队和产业能力在本地持续运营。</p>
              <div className="dc-fit"><span>适合</span>地方政府 · 国资平台 · 城投产投</div>
              <span className="go">了解产业共建 <ArrowR s={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ⑤ FMClaw™ 产品 · 暗场 */}
      <section className="h-core" id="product">
        <div className="h-grid dark" aria-hidden="true" />
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow on-dark reveal">FMClaw™ 平台</span>
            <h2 className="h-h2 on-dark reveal">不是回答一个问题，而是把一件事接着干完</h2>
            <p className="h-sub on-dark reveal">
              一条生产工作流，不只有模型。它还需要<b>数据、工具、权限、审批、异常处理和执行反馈</b>。
              FMClaw™ 把这些环节放在同一个平台里。
            </p>
          </div>
          <div className="h-prod reveal">
            <div className="h-pc"><div className="pc-k">100+</div><h4>行业工作流</h4>
              <p>覆盖物业与设施管理中的巡检、工单、客服、品质、结算和运营分析。</p></div>
            <div className="h-pc"><div className="pc-k">4</div><h4>专业 Agent 协同</h4>
              <p>从服务设计、运营执行、质量评估到持续优化，形成完整闭环。</p></div>
            <div className="h-pc"><div className="pc-k">1</div><h4>模型、数据和工具统一调度</h4>
              <p>底层模型可以持续升级，上层工作流和业务体验保持稳定。</p></div>
          </div>
          <div className="h-prodflow reveal" role="img" aria-label="FMClaw 工作流:异常发现、分析判断、人工审批、创建任务、执行跟踪、验收关闭">
            {["异常发现", "分析判断", "人工审批", "创建任务", "执行跟踪", "验收关闭"].map((s, i, a) => (
              <span key={s} className={`pf-step${s === "人工审批" ? " human" : ""}`}>
                {s}{i < a.length - 1 && <svg className="pf-ar" width="13" height="13" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
            ))}
          </div>
          <p className="h-prodnote reveal">支持多模型接入与场景路由。</p>
          <div className="h-ws-cta reveal">
            <Link href="/products/fmclaw" className="btn btn-light">了解 FMClaw™ <ArrowR /></Link>
          </div>
        </div>
      </section>

      {/* ⑥ FMClaw™ 加速营 · 四种方式 */}
      <section className="h-band" id="workshop">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">FMClaw™ 加速营</span>
            <h2 className="h-h2 reveal">从验证到生产，选择一种开始方式</h2>
            <p className="h-sub reveal">
              时间投入不同，目标就不同。四种方式可以单独选择，也可以组成一条从验证到生产的完整路径。
            </p>
          </div>
          <div className="h-ways">
            <Link href="/workshop/demo-day" className="h-way reveal">
              <div className="h-cardimg"><img src="/home/way-demo-day.webp" alt="Demo Day 现场：用真实数据验证 AI 工作流" loading="lazy" width={900} height={600} /></div>
              <div className="wy-time">半天 – 1 天</div>
              <h3>Demo Day</h3>
              <p>用一份真实数据，先判断这条路走不走得通。</p>
              <span className="go">了解 Demo Day <ArrowR s={14} /></span>
            </Link>
            <Link href="/workshop/bootcamp" className="h-way reveal">
              <div className="h-cardimg"><img src="/home/way-bootcamp.webp" alt="Bootcamp 现场：团队动手搭建并跑通 Agent" loading="lazy" width={900} height={600} /></div>
              <div className="wy-time">2 – 3 天</div>
              <h3>Bootcamp</h3>
              <p>团队带着真问题和脱敏数据，亲手搭出并跑通一个 Agent。</p>
              <span className="go">了解 Bootcamp <ArrowR s={14} /></span>
            </Link>
            <Link href="/workshop/competition" className="h-way reveal">
              <div className="h-cardimg"><img src="/home/way-competition.webp" alt="AI 应用创新大赛现场" loading="lazy" width={900} height={600} /></div>
              <div className="wy-time">2 – 4 周</div>
              <h3>AI 应用创新大赛</h3>
              <p>让一线员工从真实工作中找到 AI 课题，赛后继续落地。</p>
              <span className="go">了解创新大赛 <ArrowR s={14} /></span>
            </Link>
            <Link href="/workshop/fde" className="h-way reveal">
              <div className="h-cardimg"><img src="/home/way-fde.webp" alt="FDE 服务：数据治理与系统接入现场" loading="lazy" width={900} height={600} /></div>
              <div className="wy-time">按阶段交付</div>
              <h3>FDE 服务</h3>
              <p>完成数据治理、系统接入、生产上线和阶段验收。</p>
              <span className="go">了解 FDE 服务 <ArrowR s={14} /></span>
            </Link>
          </div>
          <div className="h-ws-cta reveal">
            <Link href="/workshop" className="btn btn-primary">查看四种加速营方式 <ArrowR /></Link>
          </div>
        </div>
      </section>

      {/* ⑦ 生产案例 · 暗场:旗舰 + 两个项目案例 */}
      <section className="h-core" id="cases">
        <div className="h-grid dark" aria-hidden="true" />
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow on-dark reveal">生产案例</span>
            <h2 className="h-h2 on-dark reveal">不是演示，是已经在运行的项目</h2>
          </div>

          {/* 旗舰:爱物管自营验证 */}
          <Link href="/company/aipm-validation" className="h-flag reveal">
            <div className="fl-head">
              <span className="fl-tag">旗舰案例 · 爱物管自营验证</span>
              <span className="cc-live"><i className="liv" />生产运行中</span>
            </div>
            <h3>我们先把 AI 用在了自己的物业公司里</h3>
            <div className="fl-stats">
              <div className="fl-s"><b>69 → 5</b><span>管理层人数</span></div>
              <div className="fl-s"><b>51 → 1</b><span>项目经理</span></div>
              <div className="fl-s"><b>3.4% → 14%</b><span>经营净利率</span></div>
              <div className="fl-s"><b>100 万+</b><span>AI 接管住户对话</span></div>
              <div className="fl-s"><b>约 7.5 万小时</b><span>累计节省管理工时</span></div>
            </div>
            <span className="go on-dark">看爱物管自己的这笔账 <ArrowR s={14} /></span>
          </Link>

          <div className="h-cases two">
            <Link href="/cases/south-china-mixed-use-6-to-1" className="h-cc reveal">
              <span className="cc-bar" style={{ background: "var(--h-blue)" }} />
              <div className="cc-head">
                <span className="cc-tag">综合体 · 华南 · <b>6 万㎡</b></span>
                <span className="cc-live"><i className="liv" />在线运行</span>
              </div>
              <h3 className="cc-result">管理岗从 6 人变成 1 人</h3>
              <p className="cc-desc">日常运营里的判断交给 Agent，现场只保留执行动作。</p>
              <span className="go on-dark">看这个项目 <ArrowR s={13} /></span>
            </Link>
            <Link href="/cases/30w-park-ai-property-manager-robot" className="h-cc reveal">
              <span className="cc-bar" style={{ background: "var(--h-green)" }} />
              <div className="cc-head">
                <span className="cc-tag">园区 · <b>30 万㎡</b></span>
                <span className="cc-live"><i className="liv" />在线运行</span>
              </div>
              <h3 className="cc-result">一位 AI 物业经理 + 23 人 + 16 台机器人</h3>
              <p className="cc-desc">AI 做管理与调度，人和机器人做执行。</p>
              <span className="go on-dark">看这个项目 <ArrowR s={13} /></span>
            </Link>
          </div>

          <p className="h-cases-disc reveal">
            案例数据来自具体项目和自营验证，不代表所有项目均能获得相同结果；实际效果取决于项目基础、业态、接入范围和实施方式。
          </p>
          <p className="h-cases-more reveal"><Link href="/cases">查看更多案例 <ArrowR s={13} /></Link></p>
        </div>
      </section>

      {/* ⑧ 为什么是启盟:四个证据 + 规模数据 + 投资资质 */}
      <section className="h-band" id="why">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">为什么是启盟</span>
            <h2 className="h-h2 reveal">模型可以买到，现场经验买不到</h2>
          </div>
          <div className="h-why">
            <div className="h-wc reveal"><div className="wc-y">2017</div><h4>自 2017 年持续深耕</h4>
              <p>长期聚焦物业与设施管理中的真实数据、流程和现场。</p></div>
            <div className="h-wc reveal"><div className="wc-y">2019</div><h4>2019 年创办爱物管</h4>
              <p>每一项能力先在自营物业项目里验证，再对外提供。</p></div>
            <div className="h-wc reveal"><div className="wc-y">人</div><h4>行业老兵 + AI 工程师</h4>
              <p>懂行业的人负责把问题问对，工程师负责把它做出来。</p></div>
            <div className="h-wc reveal"><div className="wc-y">路</div><h4>从验证到生产</h4>
              <p>从 Demo、工作流搭建、数据治理到系统接入和生产验收，形成完整路径。</p></div>
          </div>
          <MoatStats />
          {/* 数值沿用现有已确认数据,未新造;具体口径说明待业务方核验后补充(TODO 待业务方核验) */}
          <p className="h-moat-note reveal">数据为截至发布时的内部统计,持续更新。</p>
        </div>
      </section>

      {/* 投资与资质 · 信任背书(后置) */}
      <section className="h-cred">
        <div className="wrap">
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
          <div className="h-cred-block reveal">
            <div className="h-cred-blab">资质与认可</div>
            <p className="h-cred-intro">技术、生态与资金，三个维度的认可，逐项可查。</p>
            <div className="h-hcore">
              <div className="h-hcore-card">
                <div className="h-hcore-top">
                  <span className="h-hcore-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="h-hcore-tag">广州市工业和信息化局认可</span>
                </div>
                <h3>广州市人工智能百强</h3>
                <p>在广州全市人工智能企业中入选百强——官方对我们技术与落地能力的认定。</p>
              </div>
              <div className="h-hcore-card">
                <div className="h-hcore-top">
                  <span className="h-hcore-logo"><img src="/honors/nvidia.jpg" alt="NVIDIA Inception" loading="lazy" /></span>
                  <span className="h-hcore-tag">NVIDIA Inception 成员</span>
                </div>
                <h3>NVIDIA 全球 AI 加速营</h3>
                <p>加入英伟达面向全球 AI 公司的加速计划，与全球最前沿的 AI 生态同行。</p>
              </div>
              <div className="h-hcore-card">
                <div className="h-hcore-top">
                  <span className="h-hcore-ic" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M4 10 12 4l8 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                  </span>
                  <span className="h-hcore-tag">交付有资金保障</span>
                </div>
                <h3>首期 5 亿发展基金</h3>
                <p>国有物业人工智能发展基金，定向投入物业管理 AI 与具身智能——你的项目背后，有长线资金托底。</p>
              </div>
            </div>
            <div className="h-hmore">
              <div className="h-hmore-item">
                <span className="h-hmore-logo"><img src="/honors/gaoxin.png" alt="国家高新技术企业" loading="lazy" /></span>
                <div className="h-hmore-txt"><b>国家高新技术企业</b><span>国家级资质认证</span></div>
              </div>
              <div className="h-hmore-item">
                <span className="h-hmore-logo"><img src="/honors/zjtx.png" alt="专精特新企业" loading="lazy" /></span>
                <div className="h-hmore-txt"><b>专精特新企业</b><span>专业化、精细化中小企业</span></div>
              </div>
              <div className="h-hmore-item">
                <span className="h-hmore-logo"><img src="/honors/huangpu.png" alt="具身智能双链主" loading="lazy" /></span>
                <div className="h-hmore-txt"><b>具身智能双链主</b><span>黄埔区「算力+应用」双链主</span></div>
              </div>
              <div className="h-hmore-item">
                <span className="h-hmore-logo"><img src="/honors/patent.png" alt="近百项发明专利与软著" loading="lazy" /></span>
                <div className="h-hmore-txt"><b>近百项发明专利与软著</b><span>覆盖 AI 调度、IoT 感知等方向</span></div>
              </div>
              <div className="h-hmore-item">
                <span className="h-hmore-logo"><img src="/honors/iso.png" alt="ISO 9001 / 27001" loading="lazy" /></span>
                <div className="h-hmore-txt"><b>ISO 9001 / 27001</b><span>质量与信息安全国际认证</span></div>
              </div>
            </div>
            <p className="h-hmore-link"><Link href="/company#honors">查看全部资质与认可 <ArrowR s={13} /></Link></p>
          </div>
        </div>
      </section>

      {/* ⑨ 行业研究 */}
      <section className="h-band mist" id="research">
        <div className="wrap">
          <div className="h-sechead">
            <span className="h-eyebrow reveal">行业研究</span>
            <h2 className="h-h2 reveal">物业与 AI 怎么真正结合，我们研究得透一点</h2>
          </div>
          <div className="h-res">
            {research.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}`} className="h-rc reveal">
                <div className="rc-theme">{a.theme}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div className="rc-meta"><span>{a.date}</span><i />{a.read}</div>
              </Link>
            ))}
          </div>
          <p className="h-cases-more light reveal"><Link href="/insights">查看全部研究 <ArrowR s={13} /></Link></p>
        </div>
      </section>

      {/* ⑩ FAQ（决策导向，与 /company 页品牌 FAQ 错开角度，不重复） */}
      <SeoFaq
        heading="第一次了解启盟科技，你可能想问"
        items={[
          {
            q: "启盟科技和 FMClaw™ 是什么关系？",
            a: "FMClaw™ 是启盟科技自研的物业与设施管理 AI 智能体平台。启盟科技是公司主体，旗下还有自营物业公司爱物管——平台先在自己的项目上完整验证，再对外交付。",
          },
          {
            q: "物业公司引入 AI，从哪个业务开始最稳妙？",
            a: "从一个数据现成、痛点明确的单一业务开始，比如水电费审批、报修派单或供应商对账。先用一场 Demo Day 看可行性，跑通了再决定是否深入，不必一上来就做全盘规划。",
          },
          {
            q: "我们是业主方或园区，不是物业公司，也能合作吗？",
            a: "能。除了把平台授权给物业公司自用，还有两种方式面向业主方与政企园区：由爱物管端到端托管运营，或以产业基金共建的方式与地方国资合作。",
          },
          {
            q: "AI 物业不是概念吗，有实际跑起来的项目吗？",
            a: "有。目前 7 个已上线案例公开可查，覆盖 6 万㎡ 商业综合体到 30 万㎡ 产业园区，全部先在自营物业公司完整验证后才对外交付，每个案例都写明了做法与经过核实的结果。",
          },
        ]}
      />

      {/* ⑩ 最终 CTA → 加速营 */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带一个真实问题来，让它在你的数据上跑起来</h2>
          <p className="reveal">
            想先看一眼，选 Demo Day；想亲手做出来，选 Bootcamp；想发动整个组织，办一场 AI 应用创新大赛；已经准备进入生产，就从 FDE 开始。
          </p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">选择一种加速营方式 <ArrowR s={16} /></Link>
            <span className="alt">不确定怎么选？<Link href="/workshop#signup">先告诉我们你的问题</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
