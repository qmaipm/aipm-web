import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import "./page.css";
import BuildingForm from "./BuildingForm";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "智能体园区伙伴 — 智能体园区项目，和启盟一起做 | 启盟科技",
  description:
    "面向建筑智能化工程企业、弱电集成商、机电总包与设计咨询企业的伙伴合作：你熟悉客户、现场和既有系统，启盟提供 FMClaw™ 平台，以及智能体部分的方案、应标与联合交付。3 个工作日提供方案框架，AI 技术条款逐项应答，首个项目联合交付，报备商机进入保护机制。",
  alternates: { canonical: "/partners/agent-park" },
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Hero：四项事实 ---------- */
const heroChips = [
  "3 个工作日提供方案框架",
  "AI 技术条款逐项应答",
  "首个项目联合交付",
  "报备商机进入保护机制",
];

/* ---------- 四层架构（自下而上）---------- */
const stack = [
  {
    tier: "第四层",
    name: "运营场景",
    note: "巡检 · 告警 · 工单 · 问数 · 机器人调度。智能体识别异常并发起处置流程，关键操作由人工审批。",
    hot: true,
  },
  {
    tier: "第三层",
    name: "模型与智能体平台",
    note: "模型接入 · 工作流 · Skill · 权限与审计。通过自然语言配置工作流，并在权限、审批和审计机制下执行。",
    hot: true,
    badge: "FMClaw™ · 启盟提供",
  },
  {
    tier: "第二层",
    name: "数据与接口层",
    note: "协议接入 · 数据治理 · 系统接口",
    hot: true,
  },
  {
    tier: "第一层",
    name: "既有弱电子系统",
    note: "BA · 安防 · 消防 · 门禁 · 停车 · 能耗",
    keep: true,
    badge: "伙伴已有能力",
  },
];

/* ---------- 项目分工 ---------- */
const split = {
  partner: {
    title: "伙伴负责",
    items: ["客户关系与项目统筹", "弱电工程与设备接入", "既有系统协调", "本地实施与现场服务"],
  },
  qimeng: {
    title: "启盟负责",
    items: ["智能体方案与技术选型", "AI 技术条款应答", "FMClaw™ 部署与调试", "智能体场景配置", "首单售前与交付支持"],
  },
};

/* ---------- 可承接的项目内容 ---------- */
const opps = [
  { title: "弱电与机电工程", body: "原有工程业务不变，仍由伙伴承接与实施。" },
  { title: "AIoT 感知网络", body: "视频、传感与感知设备的部署与接入。" },
  { title: "系统接口与集成", body: "既有子系统的协议接入与接口开发。" },
  { title: "FMClaw™ 平台", body: "智能体平台部分，纳入项目整体报价。" },
  { title: "场景实施与定制", body: "巡检、告警、工单等场景的落地配置。" },
  { title: "运维、扩容与运营服务", body: "上线后的运维、点位扩容与运营服务。" },
];

/* ---------- 合作支持 ---------- */
const supports = [
  { title: "项目方案", body: "收到脱敏需求后，3 个工作日内提供方案框架。" },
  { title: "技术应答", body: "智能体、模型和 AI 感知条款逐项回应，可直接用于标书整理。" },
  { title: "售前支持", body: "关键技术交流和述标环节，由售前工程师共同参与。" },
  { title: "Demo 环境", body: "提供可运行的演示环境，用于客户沟通与场景验证。" },
  { title: "联合交付", body: "首个项目共同完成部署、调试和场景配置。" },
  { title: "商机协同", body: "伙伴报备的商机进入保护机制，具体规则在合作政策中明确。" },
];

/* ---------- 合作流程 ---------- */
const steps = [
  { no: "1", title: "提交项目", body: "提供一段脱敏招标要求，或说明正在跟进的项目。" },
  { no: "2", title: "共同评估", body: "3 个工作日内沟通需求，确认方案方向和合作方式。" },
  { no: "3", title: "联合推进", body: "共同完成方案、技术交流、应标和 Demo 演示。" },
  { no: "4", title: "交付复盘", body: "中标后按交付清单实施，并在首单完成后沉淀标准方案。" },
];

/* ---------- 技术与交付入口 ---------- */
const techs = [
  { title: "兼容与接入", body: "查看支持的系统接口、接入方式和部署条件。" },
  { title: "部署与安全", body: "了解本地化部署、权限、审批、审计和数据安全机制。" },
  { title: "交付边界", body: "了解双方在方案、接入、部署、联调和运维中的分工。" },
];

/* ---------- 项目证明（数据均来自站内已发布案例）---------- */
const cases = [
  {
    tag: "智慧园区",
    scale: "约 30 万㎡",
    problem: "1000 多个点位、每天 4 万次服务交付，原有团队看不全、管不过来。",
    results: [
      { value: "+66.6%", label: "管理效率提升" },
      { value: "-80%+", label: "园区物业相关投诉下降" },
    ],
    href: "/cases/30w-park-ai-property-manager-robot",
  },
  {
    tag: "大型企业总部",
    scale: "设施设备巡检",
    problem: "巡检单填了，人到底去没去，事后难以核验。",
    results: [
      { value: "99%", label: "整体巡检签到率" },
      { value: "35% → 98%", label: "运行班组达标率" },
    ],
    href: "/cases/fmclaw-equipment-inspection",
  },
  {
    tag: "商业综合体",
    scale: "约 6 万㎡",
    problem: "34 人、6 层管理架构、6 个专职管理岗，项目持续亏损。",
    results: [
      { value: "6 → 1", label: "专职管理岗" },
      { value: "99%", label: "住户缴费率（行业约 71%）" },
    ],
    href: "/cases/south-china-mixed-use-6-to-1",
  },
];

/* ---------- 结构化数据（SEO / GEO）---------- */
const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "智能体园区伙伴合作计划",
  serviceType: "智能体园区 / 智慧园区项目投标与联合交付支持",
  description:
    "面向建筑智能化工程企业、弱电集成商、机电总包与设计咨询企业的合作计划：伙伴负责客户关系、弱电工程与本地实施，启盟提供 FMClaw™ 智能体平台，以及智能体部分的方案、AI 技术条款应答、售前支持、Demo 环境与首单联合交付。",
  areaServed: "CN",
  url: `${SITE_URL}/partners/agent-park`,
  provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "智能体园区伙伴合作支持",
    itemListElement: supports.map((r) => ({
      "@type": "Offer",
      name: r.title,
      description: r.body,
    })),
  },
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "生态伙伴", item: `${SITE_URL}/partners` },
    { "@type": "ListItem", position: 3, name: "智能体园区伙伴", item: `${SITE_URL}/partners/agent-park` },
  ],
};

export default function Page() {
  return (
    <main className="solbd">
      <JsonLd data={[SERVICE_LD, BREADCRUMB_LD]} />

      {/* 1 · HERO：左文右图 */}
      <section className="bd-hero">
        <div className="bd-grid" aria-hidden="true" />
        <div className="wrap bd-hero-cols">
          <div className="bd-hero-txt">
            <span className="bd-kicker">
              <Link href="/">启盟科技</Link>
              <i>/</i>
              <Link href="/partners">生态伙伴</Link>
              <i>/</i>智能体园区伙伴
            </span>
            <h1 className="bd-h1">
              智能体园区项目，<br /><span className="grad">和启盟一起做</span>
            </h1>
            <p className="bd-lead">
              你熟悉客户、现场和既有系统。<br />
              启盟提供 FMClaw™ 平台，以及智能体部分的<b>方案、应标与联合交付</b>。
            </p>
            <div className="bd-cta">
              <a href="#contact" className="btn btn-primary">带一个项目来聊 <Arrow /></a>
              <a href="#contact" className="btn btn-ghost">索取参考架构 <Arrow /></a>
            </div>
            <ul className="bd-chips">
              {heroChips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="bd-hero-art">
            <Image
              src="/images/partners/agent-park.png"
              alt="智能体园区与 AI 感知网络插画"
              width={600}
              height={448}
              priority
              sizes="(max-width: 960px) 92vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* 2 · 架构变化：四层架构（暗场） */}
      <section className="bd-core" id="arch">
        <div className="bd-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="bd-eyebrow on-dark">架构变化</span>
          <h2 className="bd-h2 on-dark">弱电系统不需要推翻，<br />项目上方多了一层 AI</h2>
          <p className="bd-sub on-dark">
            BA、安防、消防、门禁、停车和能耗系统仍是项目基础。<br />
            新的招标文件开始增加智能体平台、模型管理、AI 感知和流程闭环要求。<br />
            <b>启盟负责新增的 AI 部分，并与既有系统连接。</b>
          </p>

          <div className="bd-stack" role="img" aria-label="智能体园区四层架构：自下而上为既有弱电子系统、数据与接口层、模型与智能体平台、运营场景">
            {stack.map((l) => (
              <div className={`bd-layer${l.hot ? " hot" : ""}${l.keep ? " keep" : ""}`} key={l.name}>
                {l.badge && <span className="bd-layer-badge">{l.badge}</span>}
                <span className="bd-tier">{l.tier}</span>
                <div className="bd-layer-body">
                  <h3>{l.name}</h3>
                  <p>{l.note}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="bd-verdict">
            合作发生在新增的 AI 层，<span className="grad">不替代伙伴已有的工程能力</span>。除了系统接入和点位数量，部分项目开始关注 AI 是否真正参与运营闭环。
          </p>
        </div>
      </section>

      {/* 3 · 项目分工 */}
      <section className="bd-band" id="split">
        <div className="wrap">
          <span className="bd-eyebrow">项目分工</span>
          <h2 className="bd-h2">各自做擅长的部分</h2>
          <div className="bd-split">
            <div className="bd-split-col">
              <h3>{split.partner.title}</h3>
              <ul>
                {split.partner.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="bd-split-col qm">
              <h3>{split.qimeng.title}</h3>
              <ul>
                {split.qimeng.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="bd-policy">具体边界在项目启动前确认，并形成双方认可的交付清单。</p>
        </div>
      </section>

      {/* 4 · 可承接的项目内容 */}
      <section className="bd-band mist" id="opps">
        <div className="wrap">
          <span className="bd-eyebrow">项目内容</span>
          <h2 className="bd-h2">原有工程继续做，新增 AI 相关机会</h2>
          <div className="bd-opps">
            {opps.map((o) => (
              <div className="bd-ocard" key={o.title}>
                <span className="bd-gk" aria-hidden="true" />
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
          <p className="bd-policy">商务模式根据伙伴类型和项目情况确定，双方在签约前确认。</p>
        </div>
      </section>

      {/* 5 · 合作支持 */}
      <section className="bd-band" id="supports">
        <div className="wrap">
          <span className="bd-eyebrow">合作支持</span>
          <h2 className="bd-h2">从方案到交付，我们提供这些支持</h2>
          <div className="bd-rights">
            {supports.map((r, i) => (
              <div className="bd-right" key={r.title}>
                <span className="bd-rno grad">{String(i + 1).padStart(2, "0")}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
          <p className="bd-policy">
            伙伴报备的商机进入保护机制。未经伙伴同意，启盟不绕过伙伴单独推进。完成伙伴评估后，我们会提供对应的合作政策与商务方案，双方在签约前确认。
          </p>
        </div>
      </section>

      {/* 6 · 合作流程 */}
      <section className="bd-band mist" id="flow">
        <div className="wrap">
          <span className="bd-eyebrow">合作流程</span>
          <h2 className="bd-h2">先把一个项目做成</h2>
          <div className="bd-steps">
            {steps.map((s) => (
              <div className="bd-step" key={s.no}>
                <span className="bd-step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="bd-flow-foot">
            <p>不要求先做大范围承诺。可以从一个明确场景、一个项目开始。</p>
            <a href="#contact" className="btn btn-primary">带一个项目来聊 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* 7 · 技术与交付入口 */}
      <section className="bd-band" id="tech">
        <div className="wrap">
          <span className="bd-eyebrow">技术与交付</span>
          <h2 className="bd-h2">项目开始前，把关键问题说清楚</h2>
          <div className="bd-techs">
            {techs.map((t) => (
              <div className="bd-ocard" key={t.title}>
                <span className="bd-gk" aria-hidden="true" />
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
          <div className="bd-tech-cta">
            <a href="#contact" className="btn btn-ghost">索取技术说明 <Arrow /></a>
            <Link href="/contact" className="btn btn-ghost">与架构师沟通 <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 8 · 项目证明 */}
      <section className="bd-band mist" id="proof">
        <div className="wrap">
          <span className="bd-eyebrow">项目证明</span>
          <h2 className="bd-h2">已经运行的项目</h2>
          <div className="bd-cases">
            {cases.map((c) => (
              <Link className="bd-case" href={c.href} key={c.href}>
                <div className="bd-case-head">
                  <span className="bd-case-tag">{c.tag}</span>
                  <span className="bd-case-scale">{c.scale}</span>
                </div>
                <p className="bd-case-problem">{c.problem}</p>
                <div className="bd-case-metrics">
                  {c.results.map((m) => (
                    <div className="bd-case-metric" key={m.label}>
                      <b className="grad">{m.value}</b>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
                <span className="bd-case-link">查看案例 <Arrow s={13} /></span>
              </Link>
            ))}
          </div>
          <p className="bd-disclaim">
            数据来自具体项目，不代表所有项目都能获得相同结果。实际效果取决于现场基础、接入范围和实施方式。
          </p>
        </div>
      </section>

      {/* 9 · 最终 CTA 与表单 */}
      <section className="bd-band" id="contact">
        <div className="wrap">
          <span className="bd-eyebrow">下一步</span>
          <h2 className="bd-h2">有项目，可以从一段招标要求开始</h2>
          <p className="bd-sub">提供脱敏技术要求，我们会先判断：</p>
          <div className="bd-wp">
            <div className="bd-wp-card">
              <span className="bd-wp-tag">先判断，再合作</span>
              <h3>四个问题，先说清楚</h3>
              <ul className="bd-wp-list">
                <li>FMClaw™ 是否适合</li>
                <li>既有系统如何接入</li>
                <li>双方如何分工</li>
                <li>下一步需要准备什么</li>
              </ul>
              <p>也可以在留言中注明「索取参考架构」，我们会将《智能体园区参考架构》发送给你。</p>
              <p className="bd-wp-faint">提交信息后，3 个工作日内会有熟悉招投标的同事与你联系。</p>
            </div>
            <BuildingForm />
          </div>
        </div>
      </section>

      {/* 尾部 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">下一个智能体园区项目，<br />可以一起做</h2>
          <p className="reveal">从一段脱敏的招标要求开始，或直接与我们沟通。</p>
          <div className="cta-row reveal">
            <a href="#contact" className="btn btn-primary">带一个项目来聊 <Arrow s={16} /></a>
            <a href="#contact" className="btn btn-light">索取《智能体园区参考架构》 <Arrow s={16} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
