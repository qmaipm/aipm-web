import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import "./page.css";
import BuildingForm from "./BuildingForm";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "智能体园区伙伴 — 智能体园区招标的 AI 技术要求，怎么应？| 启盟科技",
  description:
    "智慧园区、智能体园区项目的招标文件里，开始出现智能体平台、大模型网关、AI 物理感知等技术要求。启盟科技面向建筑智能化工程、机电总包与设计咨询企业开放智能体园区伙伴合作：方案支持、标书技术应答、售前工程师随队、Demo 演示环境、联合品牌授权与商机协同。登记索取《智能体园区参考架构与招标技术要求指引》。",
  alternates: { canonical: "/partners/agent-park" },
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- 合作权益（页面主体）：给什么、什么时候给、给到什么程度 ---------- */
const rights = [
  {
    title: "项目方案支持",
    when: "拿到招标文件后即可发起",
    body: "针对你在跟的项目做整体方案：架构怎么设计、模块怎么划分、和你原有的智能化工程怎么衔接。我们在 3 个工作日内给出方案框架。",
  },
  {
    title: "标书技术应答",
    when: "投标阶段",
    body: "招标文件里的智能体平台、大模型、AI 感知要求，由我们的工程师提供对应的技术应答材料——逐条应，不含糊，直接可入标书。",
  },
  {
    title: "售前工程师支持",
    when: "技术交流与述标环节",
    body: "关键的客户技术交流、答疑与述标环节，售前工程师随队参加。你负责客户关系，技术问题我们来接。",
  },
  {
    title: "Demo 演示环境",
    when: "签约后开通，长期可用",
    body: "面向客户的智能体园区演示环境，随时可开。给客户看真实运行的平台，而不是 PPT 里的架构图。",
  },
  {
    title: "联合品牌与授权",
    when: "签约后颁发",
    body: "正式的合作伙伴授权，对客户时名正言顺。经审核的联合方案可使用双方品牌对外输出。",
  },
  {
    title: "商机协同",
    when: "合作期内持续",
    body: "双向报备商机：你报备的项目我们不越过你直接触达；我们侧的本地商机，优先协同你去做。客户始终是你的。",
  },
];

/* ---------- 伙伴发展路径 ---------- */
const steps = [
  { no: "1", title: "提交申请", body: "登记信息或直接联系我们，说明你的业务与在跟的项目" },
  { no: "2", title: "沟通评估", body: "3 个工作日内响应，对齐合作方向与首个项目" },
  { no: "3", title: "签署协议", body: "确定合作等级，同步对应政策与商务条款" },
  { no: "4", title: "培训赋能", body: "产品与售前培训，Demo 环境与资料库开通" },
  { no: "5", title: "首单联合作战", body: "第一个项目我们全程随队——方案、应标、交付一起完成" },
];

/* ---------- 赋能支持体系 ---------- */
const enables = [
  {
    title: "产品与售前培训",
    body: "面向你的技术与售前团队的体系化培训：平台能力、方案讲解、常见技术问题应对——让你的团队能独立讲清方案。",
  },
  {
    title: "方案与应标资料库",
    body: "标准方案模板、技术应答素材、参考架构文档持续更新，新项目来了不用从零开始写。",
  },
  {
    title: "联合交付",
    body: "中标后一起干：你负责熟悉的工程与集成部分，FMClaw™ 平台的部署、调试与智能体开发由我们承担。",
  },
  {
    title: "长期运营陪伴",
    body: "项目上线后持续提供运营支持与版本迭代——不是交完就走，你的客户满意度就是复购。",
  },
];

/* ---------- 架构对比：你熟悉的智能建筑 vs 招标要求的智能体园区 ---------- */
const oldArch = {
  tag: "过去二十年 · 你熟悉的智能建筑",
  layers: [
    { name: "集中监控 / 组态大屏", note: "人盯着看，人做决策" },
    { name: "IBMS 集成管理平台", note: "协议转换 + 预设联动规则" },
    { name: "弱电子系统", note: "BA 楼宇自控 · 安防监控 · 消防 · 一卡通 · 停车 · 能耗 · 综合布线" },
  ],
  foot: "系统是「连起来了」，但联动逻辑是预设的——异常靠人判断，处置靠人跑。",
};

const newArch = {
  tag: "现在的招标 · 智能体园区",
  layers: [
    {
      name: "FMClaw™ 智能体平台",
      note: "多智能体协同 · 智能问数 · 工作流编排 · Skill 中台 · 调度审批工作台",
      hot: true,
      badge: "会思考、会执行",
    },
    {
      name: "模型与算力中台",
      note: "大模型网关 · 多模型智能路由 · Token 计费与管控",
      hot: true,
      badge: "新增层",
    },
    {
      name: "运营系统 + AI 物理感知 + 机器人",
      note: "园区运营管理 · 视频 AI 分析 · IoT 传感 · 清洁/巡检机器人统一调度",
    },
    {
      name: "你已有的弱电子系统",
      note: "BA · 安防 · 消防 · 一卡通 —— 接入，而不是推翻",
      keep: true,
    },
  ],
  foot: "底层还是你熟悉的工程。上面多了两层 AI——那两层，就是 FMClaw™ 提供的。",
};

const deltas = [
  {
    dim: "谁在做决策",
    old: "人盯大屏、人下指令，7×24 靠排班",
    now: "智能体主动预判、自主处置，人只做审批",
  },
  {
    dim: "联动逻辑怎么来",
    old: "预设规则写死在组态里，改一条要改一次工程",
    now: "自然语言定义工作流，智能体自己编排执行",
  },
  {
    dim: "甲方验收什么",
    old: "能不能集成、接了多少点位",
    now: "AI 能不能干活：问数出答案、工单自动流转、告警自动闭环",
  },
];

/* ---------- 结构化数据（SEO / GEO）---------- */
const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "智能体园区伙伴合作计划",
  serviceType: "智能体园区 / 智慧园区项目投标与交付支持",
  description:
    "面向建筑智能化工程、机电总包与设计咨询企业的合作计划：针对招标文件中的智能体平台、大模型网关、AI 物理感知等技术要求，提供项目方案支持、标书技术应答、售前工程师随队、Demo 演示环境、联合品牌授权与商机协同。",
  areaServed: "CN",
  url: `${SITE_URL}/partners/agent-park`,
  provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "智能体园区伙伴合作权益",
    itemListElement: rights.map((r) => ({
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
      {/* HERO：左文右图 */}
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
              招标里的智能体要求，<br /><span className="grad">带着 FMClaw™ 去应</span>
            </h1>
            <p className="bd-lead">
              面向建筑智能化工程、机电总包与设计咨询企业的合作计划。你熟悉楼宇和客户，我们提供<b>方案、技术应答与联合交付</b>——这一页写清楚：加入之后，你拿到什么。
            </p>
            <div className="bd-cta">
              <a href="#whitepaper" className="btn btn-primary">申请合作 / 索取白皮书 <Arrow /></a>
              <a href="#arch" className="btn btn-ghost">架构怎么变了 <Arrow /></a>
            </div>
            <div className="bd-proof">
              <span>方案<b>一起做</b></span>
              <span className="sep" />
              <span>技术应答<b>逐条应</b></span>
              <span className="sep" />
              <span><b className="grad">客户是你的</b></span>
            </div>
          </div>
          <div className="bd-hero-art">
            <Image
              src="/images/partners/agent-park.png"
              alt="智能建筑与 AI 感知网络插画"
              width={600}
              height={448}
              priority
              sizes="(max-width: 960px) 92vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* 1 · 合作权益（页面主体） */}
      <section className="bd-band mist" id="rights">
        <div className="wrap">
          <span className="bd-eyebrow">合作权益</span>
          <h2 className="bd-h2">成为伙伴后，你拿到这六项</h2>
          <p className="bd-sub">每一项都写清楚<b>什么时候给、给到什么程度</b>。签约前，逐条当面对。</p>
          <div className="bd-rights">
            {rights.map((r, i) => (
              <div className="bd-right" key={r.title}>
                <div className="bd-right-head">
                  <span className="bd-rno grad">{String(i + 1).padStart(2, "0")}</span>
                  <span className="bd-rwhen">{r.when}</span>
                </div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
          <p className="bd-policy">
            合作等级与对应政策（含商务条款），签署协议后同步。有在跟的项目？<Link href="/contact">直接带着项目来聊 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 2 · 伙伴发展路径 */}
      <section className="bd-band">
        <div className="wrap">
          <span className="bd-eyebrow">伙伴发展路径</span>
          <h2 className="bd-h2">从申请到首单，五步走完</h2>
          <div className="bd-steps">
            {steps.map((s) => (
              <div className="bd-step" key={s.no}>
                <span className="bd-step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · 赋能支持体系 */}
      <section className="bd-band mist">
        <div className="wrap">
          <span className="bd-eyebrow">赋能支持</span>
          <h2 className="bd-h2">不止签个协议，把你的团队带起来</h2>
          <div className="bd-give">
            {enables.map((g) => (
              <div className="bd-gcard" key={g.title}>
                <span className="bd-gk" aria-hidden="true" />
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · 架构对比（暗场签名段）：熟悉的智能建筑 vs 智能体园区 */}
      <section className="bd-core" id="arch">
        <div className="bd-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="bd-eyebrow on-dark">架构在变什么</span>
          <h2 className="bd-h2 on-dark">你熟悉的架构没有被推翻，<br />上面长出了两层 AI</h2>
          <p className="bd-sub on-dark">
            左边是你做了二十年的东西，右边是新招标要求的东西。<b>差的不是子系统，是顶层</b>——顶层，就是我们合作的位置。
          </p>

          <div className="bd-arch">
            {/* 旧架构 */}
            <div className="bd-arch-col old">
              <span className="bd-arch-tag">{oldArch.tag}</span>
              <div className="bd-arch-stack">
                {oldArch.layers.map((l) => (
                  <div className="bd-layer" key={l.name}>
                    <h3>{l.name}</h3>
                    <p>{l.note}</p>
                  </div>
                ))}
              </div>
              <p className="bd-arch-foot">{oldArch.foot}</p>
            </div>

            <div className="bd-arch-mid" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 34 34">
                <path d="M6 17h20M19 9l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 新架构 */}
            <div className="bd-arch-col new">
              <span className="bd-arch-tag hot">{newArch.tag}</span>
              <div className="bd-arch-stack">
                {newArch.layers.map((l) => (
                  <div className={`bd-layer${l.hot ? " hot" : ""}${l.keep ? " keep" : ""}`} key={l.name}>
                    {l.badge && <span className="bd-layer-badge">{l.badge}</span>}
                    <h3>{l.name}</h3>
                    <p>{l.note}</p>
                  </div>
                ))}
              </div>
              <p className="bd-arch-foot">{newArch.foot}</p>
            </div>
          </div>

          {/* 三个维度的变化 */}
          <div className="bd-deltas">
            {deltas.map((d) => (
              <div className="bd-delta" key={d.dim}>
                <h3>{d.dim}</h3>
                <p className="was"><span>过去</span>{d.old}</p>
                <p className="now"><span>现在</span>{d.now}</p>
              </div>
            ))}
          </div>

          <p className="bd-verdict">
            甲方最终验收的不再是「接了多少点位」，而是 <span className="grad">AI 能不能把活干了</span>——这套架构已在真实楼宇与园区中运行，案例见
            <Link href="/cases" style={{ color: "#3fd9b8", textDecoration: "underline", textUnderlineOffset: "3px" }}>客户案例</Link>。
          </p>
        </div>
      </section>

      {/* 5 · 为什么是现在（压成一行横条） */}
      <section className="bd-strip">
        <div className="wrap bd-strip-in">
          <span className="bd-strip-tag">为什么是现在</span>
          <p>
            智能体服务已纳入政府采购范围，多地「十五五」规划提出建设智能体园区——园区与楼宇项目的招标口径正在改写。
            <b>下一个项目来的时候，你手里要有答案。</b>
          </p>
        </div>
      </section>

      {/* 6 · 白皮书登记 + 合作申请 */}
      <section className="bd-band mist" id="whitepaper">
        <div className="wrap">
          <span className="bd-eyebrow">白皮书</span>
          <h2 className="bd-h2">《智能体园区参考架构与招标技术要求指引》</h2>
          <p className="bd-sub">留下信息即可索取。如果你手头正好有在跟的项目，写在留言里——会有熟悉招投标的同事直接联系你。</p>
          <div className="bd-wp">
            <div className="bd-wp-card">
              <span className="bd-wp-tag">Whitepaper</span>
              <h3>智能体园区参考架构<br />与招标技术要求指引</h3>
              <p>一份写给工程与咨询企业的实操文档，帮你在下一个项目里看懂、应对新的技术要求：</p>
              <ul className="bd-wp-list">
                <li>智能体园区的六模块参考架构与逐模块说明</li>
                <li>新一代招标文件里高频出现的 AI 技术要求解读</li>
                <li>传统智能化工程与智能体平台的衔接方式</li>
                <li>技术应答的组织思路与常见误区</li>
              </ul>
              <p className="bd-wp-faint">登记后我们会将白皮书发送给你，并同步后续的更新版本。</p>
            </div>
            <BuildingForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">下一次投标，<br />让标书里有完整的智能体应答</h2>
          <p className="reveal">从索取一份白皮书开始，或者直接带着项目来聊。</p>
          <div className="cta-row reveal">
            <a href="#whitepaper" className="btn btn-primary">登记索取白皮书 <Arrow s={16} /></a>
            <Link href="/contact" className="btn btn-light">带着项目来聊 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
