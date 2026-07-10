import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "./page.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "关于启盟科技 · 让智能走进物理世界 — 启盟科技",
  description:
    "启盟科技创立于 2017 年,广州市人工智能百强企业、NVIDIA Inception 全球 AI 加速营成员,首期 5 亿产业发展基金。核心产品 FMClaw™ AI 平台,自营物业公司爱物管。愿景:让智能走进物理世界,物业是最大、也最天然的入口。",
  keywords: [
    "启盟科技",
    "关于启盟科技",
    "让智能走进物理世界",
    "广州市人工智能百强",
    "NVIDIA Inception",
    "爱物管",
    "FMClaw",
    "物业管理AI公司",
    "具身智能",
    "物理AI",
    "物业人工智能产业基金",
  ],
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- 结构化数据:AboutPage + 面包屑(Organization 全站层已含 subOrganization) ---------- */
const ABOUT_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "关于启盟科技",
  url: `${SITE_URL}/company`,
  inLanguage: "zh-CN",
  mainEntity: {
    "@type": "Organization",
    name: "启盟科技",
    alternateName: ["Stalliance", "广州启盟科技"],
    url: SITE_URL,
    foundingDate: "2017",
    slogan: "让智能走进物理世界",
    description:
      "物业与设施管理(FM)的行业级 AI 公司。核心产品 FMClaw™ AI 平台;自营物业公司爱物管承担端到端履约交付;与地方政府以产业基金模式共建。",
    award: [
      "广州市人工智能百强企业(广州市工业和信息化局认可)",
      "NVIDIA Inception 全球 AI 加速营成员",
      "国家高新技术企业",
      "专精特新企业",
      "黄埔区具身智能「算力+应用」双链主单位",
    ],
    subOrganization: {
      "@type": "Organization",
      name: "爱物管",
      description: "启盟科技自营的物业公司,AI 物业服务的履约交付主体,全部项目由 FMClaw™ 平台接管运营。",
    },
  },
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "关于启盟科技", item: `${SITE_URL}/company` },
  ],
};

/* ---------- 为什么是物业:智能的三种形态 ---------- */
const entries = [
  {
    n: "01",
    tag: "管理",
    h: "AI 智能体",
    p: "排班、巡检、工单、品质、结算——管理中的决策与流转,由智能体接手。今天,已经在真实项目里运行。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="8" width="14" height="10" rx="3.2" stroke="currentColor" strokeWidth="1.6" /><path d="M12 4.6v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="4" r="1.2" fill="currentColor" /><circle cx="9.6" cy="13" r="1.15" fill="currentColor" /><circle cx="14.4" cy="13" r="1.15" fill="currentColor" /></svg>
    ),
  },
  {
    n: "02",
    tag: "劳动",
    h: "机器人与具身智能",
    p: "清洁、巡逻、安防,机器人与人组成同一个班组,由同一套系统调度。真实、连续、可容错的现场,是具身智能最好的成长环境。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="6.5" r="2.8" stroke="currentColor" strokeWidth="1.6" /><path d="M6.5 20.5a5.5 5.5 0 0 1 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M3.8 11.2h3M17.2 11.2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M12 9.3v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
  {
    n: "03",
    tag: "感知",
    h: "物理 AI",
    p: "楼宇里的大量传感器,让空间被持续读取:能耗、人流、环境、设备状态——物理世界,第一次成为 AI 的数据来源。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="1.8" fill="currentColor" /><path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M5.4 5.4a9.3 9.3 0 0 0 0 13.2M18.6 5.4a9.3 9.3 0 0 1 0 13.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
];

/* ---------- 八年大事记 ---------- */
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
    year: "2019", h: "创办爱物管,自营物业", s: "自建物业公司「爱物管」,亲历一线服务的交付全程。", kind: "biz",
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
    year: "2025", h: "智能体接管爱物管", s: "智能体可独立执行任务,逐步接管爱物管全部项目。", kind: "tech",
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

/* ---------- 三种商业模式(按同一套 AI 能力展开) ---------- */
const bizModes = [
  {
    k: "deliver",
    badge: "FMClaw™ 平台授权",
    h: "AI 智能体交付",
    p: "把 FMClaw™ 平台交付给业主与物业公司,客户自主完成 AI 转型的三步跃迁。",
    points: ["FMClaw™ 平台整体赋能", "FDE 驻场 · 数据治理与工作流打通", "端到端陪跑 · 从 IoT 接入到 Agent 上线"],
    fit: ["物业公司", "业主自用", "集团型物业"],
    href: "/products/fmclaw",
    cta: "了解 FMClaw™ 平台",
  },
  {
    k: "operate",
    badge: "端到端履约交付",
    h: "AI 物业运营托管",
    p: "启盟自营,由爱物管直接向业主交付 AI 物业服务,降本与提质在履约中同步兑现。",
    points: ["高效执行 · AI 以 51:1 的效率接管全部项目", "更低成本 · 管理层人力 −93%", "更稳定品质 · 净利率 3.4% → 14%"],
    fit: ["央国企园区", "政府办公", "商业综合体"],
    href: "/ai-service",
    cta: "了解 AI 物业服务",
  },
  {
    k: "fund",
    badge: "5 亿 · 长线资金",
    h: "产业基金共建",
    p: "与地方政府共建,降低物业管理数字化的投入产出比,同时培育本地 AI 产业。",
    points: ["首期 5 亿元 · 定向物业管理 AI 与具身智能", "与地方国资、城投产投共建", "项目 + 产业双落地 · 不做单纯财务投资"],
    fit: ["地方国资", "城投产投", "产业培育"],
    href: "/cobuild",
    cta: "了解产业共建",
  },
];

/* ---------- 荣誉与资质 ---------- */
const honorsCore = [
  {
    k: "top100",
    h: "广州市人工智能百强",
    s: "广州市工业和信息化局认可",
    p: "在广州全市人工智能企业中入选百强——官方对我们技术与落地能力的认定。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    ),
  },
  {
    k: "nvidia",
    h: "NVIDIA 全球 AI 加速营",
    s: "NVIDIA Inception 成员",
    p: "加入英伟达面向全球 AI 公司的加速计划,与全球最前沿的 AI 生态同行。",
    logo: "/honors/nvidia.jpg",
  },
  {
    k: "fund",
    h: "首期 5 亿发展基金",
    s: "交付有资金保障",
    p: "国有物业人工智能发展基金,定向投入物业管理 AI 与具身智能——你的项目背后,有长线资金托底。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 10 12 4l8 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
];

const honorsMore = [
  { h: "国家高新技术企业", s: "国家级资质认证", logo: "/honors/gaoxin.png" },
  { h: "专精特新企业", s: "专业化、精细化中小企业", logo: "/honors/zjtx.png" },
  { h: "具身智能双链主", s: "黄埔区「算力+应用」双链主", logo: "/honors/huangpu.png" },
  { h: "近百项发明专利与软著", s: "覆盖 AI 调度、IoT 感知等方向", img: "/honors/patent.png" },
  { h: "ISO 9001 / 27001", s: "质量与信息安全国际认证", img: "/honors/iso.png" },
];

/* ---------- FAQ(GEO:AI 生成引擎可直接引用的问答) ---------- */
const faqs = [
  {
    q: "启盟科技是一家什么公司?",
    a: "启盟科技(Stalliance)创立于 2017 年,总部在广州,是一家专注物业与设施管理(FM)的人工智能公司。核心产品是 FMClaw™ AI 平台,并通过自营物业公司「爱物管」提供端到端的 AI 物业服务。公司是广州市人工智能百强企业(广州市工信局认可)、NVIDIA Inception 全球 AI 加速营成员。",
  },
  {
    q: "为什么说物业是智能走进物理世界的入口?",
    a: "物业管理是数万亿规模的行业,并且同时容纳智能的三种形态:AI 智能体接管排班、巡检、工单等管理工作;机器人与具身智能承担一线劳动;楼宇里的大量传感器构成物理 AI,让空间被持续感知。三种形态都发生在真实世界,也都从真实世界获得数据——这是启盟科技从物业开始的原因。",
  },
  {
    q: "爱物管和启盟科技是什么关系?",
    a: "爱物管是启盟科技自营的物业公司,2019 年创办。它既是我们八年一线数据与工作流的来源,也是 AI 物业服务的履约交付主体——全部项目由 FMClaw™ 平台接管运营,管理效率达到 51:1,净利率从 3.4% 提升到 14%。",
  },
  {
    q: "与启盟科技合作,有哪几种方式?",
    a: "三种商业模式,同一套 AI 能力:一是 AI 智能体交付,把 FMClaw™ 平台授权给业主或物业公司自用;二是 AI 物业运营托管,由爱物管直接向业主端到端交付 AI 物业服务;三是产业基金共建,以首期 5 亿元的国有物业人工智能发展基金与地方国资、城投产投共建。三种方式可以选一种,也可以组合使用。",
  },
  {
    q: "启盟科技有哪些资质与荣誉?",
    a: "广州市人工智能百强企业(广州市工信局认可)、NVIDIA Inception 全球 AI 加速营成员、国家高新技术企业、专精特新企业、黄埔区具身智能「算力+应用」双链主单位;拥有近百项发明专利与软件著作权,通过 ISO 9001、ISO 27001 等国际认证,并有首期 5 亿元产业发展基金保障交付。",
  },
];

export default function Page() {
  return (
    <main className="solcm">
      <JsonLd data={[ABOUT_LD, BREADCRUMB_LD]} />

      {/* HERO · 实景暗场:公司愿景 */}
      <section className="cm-hero">
        <div className="cm-hero__bg" aria-hidden="true" />
        <div className="wrap cm-hero-top">
          <span className="cm-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>关于我们
          </span>
          <p className="cm-hero-en">Make intelligence ambient in the physical world</p>
          <h1 className="cm-h1">让智能,走进<br />物理世界</h1>
          <p className="cm-lead">
            智能正在走出屏幕,走进真实的楼宇、园区与街区。<b>物业管理,是这一步最天然的入口</b>——我们为此,已经准备了八年。
          </p>
          <div className="cm-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#evolution" className="btn btn-ghost">看八年大事记 <Arrow /></a>
          </div>
          <div className="cm-proof">
            <span>创立于 <b>2017</b></span>
            <span className="sep" />
            <span><b className="grad">八年</b>自营物业</span>
            <span className="sep" />
            <span>广州市<b>人工智能百强</b></span>
            <span className="sep" />
            <span>首期 <b>5 亿</b>发展基金</span>
          </div>
        </div>
      </section>

      {/* 为什么是物业 · 同一个现场的三层智能 */}
      <section className="cm-band">
        <div className="wrap">
          <span className="cm-eyebrow">为什么是物业</span>
          <h2 className="cm-h2">在这里,智能有三种形态</h2>
          <p className="cm-sub">
            物业管理是数万亿规模的行业,覆盖着最真实的空间与劳动。在这里,AI 接管管理,机器人承担劳动,传感器让空间被持续感知——三种形态都发生在真实世界,也都从真实世界获得数据。
          </p>
          <div className="cm-entry">
            {entries.map((e) => (
              <div className="cm-entry__card reveal" key={e.h}>
                <div className="cm-entry__head">
                  <span className="cm-entry__num">{e.n}</span>
                  <span className="cm-entry__tag">{e.tag}</span>
                </div>
                <span className="cm-entry__ic" aria-hidden="true">{e.icon}</span>
                <h3>{e.h}</h3>
                <p>{e.p}</p>
              </div>
            ))}
          </div>
          <p className="cm-foot">
            <span className="lead">三种形态,同一个现场——</span>
            这是智能走进物理世界<span className="grad">最天然的入口</span>
          </p>
        </div>
      </section>

      {/* 公司演进 · 八年大事记 */}
      <section className="cm-band mist" id="evolution">
        <div className="wrap">
          <span className="cm-eyebrow">公司演进 · 大事记</span>
          <h2 className="cm-h2">八年,做同一件事</h2>
          <p className="cm-sub">自 2017 年至今,启盟科技始终专注一件事:让智能走进物业与设施管理的真实运营。这条路分为两个阶段——先在一线积累数据与工作流,再让智能体真正承担工作。</p>

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
        </div>
      </section>

      {/* 爱物管 · 自营交付主体 */}
      <section className="cm-band" id="aiwuguan">
        <div className="wrap">
          <div className="cm-aw reveal">
            <div className="cm-aw__say">
              <span className="cm-eyebrow">大事记里反复出现的名字</span>
              <h2 className="cm-h2">爱物管,我们自己的物业公司</h2>
              <p>
                2019 年,我们没有先做软件,而是先创办了一家物业公司——爱物管。八年里,它让我们亲历每一次保洁、每一张工单、每一份分包结算,也让每一个智能体在上线给客户之前,先在自己的项目里跑通。
              </p>
              <p>
                今天,爱物管的全部项目由 FMClaw™ 平台接管运营,是 AI 物业服务的履约交付主体——<b>我们卖给你的每一项能力,自己都先用了很多年。</b>
              </p>
              <Link className="cm-aw__link" href="/ai-service">看爱物管交付的 AI 物业服务 <Arrow /></Link>
            </div>
            <aside className="cm-aw__facts" aria-label="爱物管运营数据">
              <span className="cm-aw__flab">爱物管 · 运营数据</span>
              <div className="cm-aw__fact">
                <b>51:1</b>
                <span>AI 接管后的管理效率,一名员工管理相当于过去 51 人的工作面</span>
              </div>
              <div className="cm-aw__fact">
                <b>−93%</b>
                <span>管理层人力成本,降本直接反映在报价里</span>
              </div>
              <div className="cm-aw__fact">
                <b>3.4% → 14%</b>
                <span>净利率变化,品质与经营同步改善</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 为什么敢承诺 · 现场跑出来的工作方式 */}
      <section className="cm-band mist">
        <div className="wrap">
          <span className="cm-eyebrow">为什么我们敢承诺效果</span>
          <h2 className="cm-h2">真正难的,不是模型</h2>
          <div className="cm-moat">
            <div className="cm-moat__say">
              <p>模型谁都能用上。但要让 AI 在你的项目里真正干活,靠的是另一层东西——物业的每一件工作里,都藏着数据、技能与工具的特定组合。</p>
              <p>巡检一台水泵先看哪个读数,结算一份分包账要对哪几张表——这些没写在任何手册里,只能在真实现场一件件跑通。我们在爱物管的项目里,跑了八年。</p>
              <p className="cm-moat__verdict">所以我们交付给你的不是「一个模型」,<span className="grad">是已经跑通的工作方式</span>。</p>
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
                  技能
                </span>
                <i>×</i>
                <span className="cm-chip" data-k="tool">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 6.5a3.8 3.8 0 0 0-5 5l-5 5a1.5 1.5 0 0 0 2.1 2.1l5-5a3.8 3.8 0 0 0 5-5l-2.4 2.4-2.1-2.1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  工具
                </span>
              </div>
              <div className="cm-moat__down" />
              <div className="cm-moat__result">又宽又深的工作流</div>
              <div className="cm-moat__foot">八年,在真实现场一件件跑通</div>
            </aside>
          </div>
        </div>
      </section>

      {/* 三种商业模式 */}
      <section className="cm-band" id="business">
        <div className="wrap">
          <span className="cm-eyebrow">我们能为你做什么</span>
          <h2 className="cm-h2">三种商业模式,同一套 AI 能力</h2>
          <p className="cm-sub">AI 智能体交付 · AI 物业运营托管 · 产业基金共建——按你的角色与目标,选最合适的一条路径。</p>
          <div className="cm-biz">
            {bizModes.map((b) => (
              <div className={`cm-biz__card is-${b.k} reveal`} key={b.k}>
                <span className="cm-biz__bar" aria-hidden="true" />
                <span className="cm-biz__badge">{b.badge}</span>
                <h3>{b.h}</h3>
                <p className="cm-biz__p">{b.p}</p>
                <ul className="cm-biz__list">
                  {b.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="cm-biz__fit">
                  <span className="cm-biz__fitlab">适合</span>
                  {b.fit.map((f) => (
                    <em key={f}>{f}</em>
                  ))}
                </div>
                <Link className="cm-biz__link" href={b.href}>{b.cta} <Arrow /></Link>
              </div>
            ))}
          </div>
          <p className="cm-biz__note">同一套 AI 能力,三种交付形态——可以按需选一种,也可以组合使用。</p>
        </div>
      </section>

      {/* 荣誉与资质 */}
      <section className="cm-band mist" id="honors">
        <div className="wrap">
          <span className="cm-eyebrow">资质与认可</span>
          <h2 className="cm-h2">把项目交给我们的底气</h2>
          <p className="cm-sub">技术、生态与资金,三个维度的认可,逐项可查。</p>

          <div className="cm-hcore">
            {honorsCore.map((h) => (
              <div className={`cm-hcore__card is-${h.k} reveal`} key={h.k}>
                <div className="cm-hcore__top">
                  {h.logo ? (
                    <span className="cm-hcore__logo"><img src={h.logo} alt={h.h} loading="lazy" /></span>
                  ) : (
                    <span className="cm-hcore__ic" aria-hidden="true">{h.icon}</span>
                  )}
                  <span className="cm-hcore__tag">{h.s}</span>
                </div>
                <h3>{h.h}</h3>
                <p>{h.p}</p>
              </div>
            ))}
          </div>

          <div className="cm-hmore">
            {honorsMore.map((h) => (
              <div className="cm-hmore__item" key={h.h}>
                <span className="cm-hmore__logo">
                  <img src={h.logo || h.img} alt={h.h} loading="lazy" />
                </span>
                <div className="cm-hmore__text">
                  <b>{h.h}</b>
                  <span>{h.s}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 一句话信念 + FMClaw 命名 */}
      <section className="cm-oneline">
        <div className="wrap">
          <p className="reveal">
            我们相信,<b>软件应当为人工作</b>。FMClaw 的名字也由此而来——FM 是设施管理,Claw 是一只替你「接住」工作的手。
          </p>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于启盟科技,你可能想问" items={faqs} />

      {/* 愿景收束 + CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">物业,是我们开始的地方<br />不是终点</h2>
          <p className="reveal">终局是让智能走进物理世界——让无数智能体与具身机器人,在真实世界里运转。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <Link href="/contact" className="btn btn-ghost">联系我们 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
