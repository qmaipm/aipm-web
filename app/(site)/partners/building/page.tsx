import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import BuildingForm from "./BuildingForm";

export const metadata: Metadata = {
  title: "智能建筑伙伴 — 智能体园区招标的 AI 技术要求，怎么应？| 启盟科技",
  description:
    "智慧园区、智能体园区项目的招标文件里，开始出现智能体平台、大模型网关、AI 物理感知等技术要求。启盟科技面向建筑智能化工程、机电总包与设计咨询企业开放智能建筑伙伴合作：带着 FMClaw™ 去应标，方案、技术应答与联合交付一起完成。登记索取《智能体园区参考架构与招标技术要求指引》。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const shifts = [
  {
    no: "01",
    title: "智能体服务进入政府采购",
    body: "2026 年 4 月，国务院明确将大模型、智能体服务纳入政府采购范围。这意味着园区与楼宇项目的采购口径正在改写——智能体不再是加分项，而是预算科目。",
  },
  {
    no: "02",
    title: "「智能体园区」写进地方规划",
    body: "多地「十五五」规划纲要明确提出打造智能工厂和智能体园区。规划里写了，接下来的项目就会立项、招标——这是看得见的项目管线。",
  },
  {
    no: "03",
    title: "招标文件的技术要求变了",
    body: "新一代园区项目的技术要求里，出现了智能体平台、大模型网关、智能问数、多智能体协同、AI 物理感知这样的字眼。用传统智能化的产品清单，应不了这样的标。",
  },
];

const modules = [
  {
    no: "01",
    title: "All-in-One 智能体平台",
    body: "一个平台承载园区全部 AI 能力，不是拼凑一堆工具。",
    caps: ["数据接入与治理", "工具网关", "工作流编排", "调度审批工作台", "智能问数", "数据大屏", "多智能体协同", "Skill 中台"],
  },
  {
    no: "02",
    title: "模型与算力中台",
    body: "统一管理模型与算力，业务侧只管用，不管接。",
    caps: ["大模型网关", "多模型智能路由", "Token 计费与管控"],
  },
  {
    no: "03",
    title: "园区运营管理系统",
    body: "把招商、物业、能耗、安防等运营子系统跑在智能体架构上。",
    caps: ["多子系统统一接入", "跨系统智能体协同", "运营数据沉淀"],
  },
  {
    no: "04",
    title: "AI 物理感知",
    body: "让 AI 看得见物理世界——视频、传感器与设备状态实时进入平台。",
    caps: ["IoT 传感网络", "视频 AI 分析", "设备状态感知"],
  },
  {
    no: "05",
    title: "机器人与具身智能",
    body: "清洁、巡检等机器人接入同一个平台，由智能体统一调度。",
    caps: ["室内清洁机器人", "四足巡检机器人", "统一调度"],
  },
  {
    no: "06",
    title: "运营与服务保障",
    body: "系统建成只是开始，持续运营才能让 AI 真正跑起来。",
    caps: ["驻场运营", "持续迭代", "服务 SLA"],
  },
];

const gives = [
  {
    title: "方案支持",
    body: "针对你在跟的项目，我们一起做整体方案：架构怎么设计、模块怎么划分、和你原有的智能化工程怎么衔接。",
  },
  {
    title: "标书技术应答",
    body: "招标文件里的智能体平台、大模型、AI 感知要求，由我们提供对应的技术应答材料——逐条应，不含糊。",
  },
  {
    title: "联合交付",
    body: "中标后一起干：你负责熟悉的工程与集成部分，FMClaw™ 平台的部署、调试与智能体开发由我们承担。",
  },
  {
    title: "培训与长期陪伴",
    body: "面向你的技术与售前团队做产品培训，项目上线后持续提供运营支持——不是交完就走。",
  },
];

export default function Page() {
  return (
    <main className="solbd">
      {/* HERO */}
      <section className="bd-hero">
        <div className="bd-grid" aria-hidden="true" />
        <div className="wrap bd-hero-top">
          <span className="bd-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>
            <Link href="/partners">生态伙伴</Link>
            <i>/</i>智能建筑伙伴
          </span>
          <h1 className="bd-h1">
            招标里的智能体要求，<br /><span className="grad">带着 FMClaw™ 去应</span>
          </h1>
          <p className="bd-lead">
            如果你从事建筑智能化工程、机电总包或设计咨询，最近大概率已经在招标文件里见到了<b>智能体平台、大模型、AI 感知</b>这样的技术要求。
            这一页回答一个问题：<b>这样的标，怎么投。</b>
          </p>
          <div className="bd-cta">
            <a href="#whitepaper" className="btn btn-primary">索取白皮书 <Arrow /></a>
            <a href="#arch" className="btn btn-ghost">看参考架构 <Arrow /></a>
          </div>
          <div className="bd-proof">
            <span>方案<b>一起做</b></span>
            <span className="sep" />
            <span>技术应答<b>逐条应</b></span>
            <span className="sep" />
            <span><b className="grad">客户是你的</b></span>
          </div>
        </div>
      </section>

      {/* 1 · 市场在变 */}
      <section className="bd-band mist">
        <div className="wrap">
          <span className="bd-eyebrow">市场在变</span>
          <h2 className="bd-h2">三件事，正在改写园区项目的招标口径</h2>
          <p className="bd-sub">不是趋势判断，是已经发生的事实。</p>
          <div className="bd-shift">
            {shifts.map((s) => (
              <div className="bd-shifti" key={s.no}>
                <span className="bd-shiftno grad">{s.no}</span>
                <div className="bd-shiftbody">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="bd-quote">你熟悉楼宇和客户，<span className="grad">缺的只是一个能应标的 AI 底座</span>。</p>
        </div>
      </section>

      {/* 2 · 参考架构六模块(暗场) */}
      <section className="bd-core" id="arch">
        <div className="bd-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="bd-eyebrow on-dark">智能体园区参考架构</span>
          <h2 className="bd-h2 on-dark">六个模块，对齐新一代园区的技术要求</h2>
          <p className="bd-sub on-dark">
            这是我们基于 FMClaw™ 平台沉淀的智能体园区参考架构。新项目的技术要求怎么变，都能在这六个模块里找到应答的位置。
          </p>
          <div className="bd-mods">
            {modules.map((m) => (
              <div className="bd-mod" key={m.no}>
                <span className="bd-modno grad">{m.no}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                <div className="caps">
                  {m.caps.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="bd-verdict">
            这六个模块不是概念图——<span className="grad">FMClaw™ 已在真实楼宇与园区中运行</span>，
            案例见<Link href="/cases" style={{ color: "#3fd9b8", textDecoration: "underline", textUnderlineOffset: "3px" }}>客户案例</Link>。
          </p>
        </div>
      </section>

      {/* 3 · 我们提供什么 */}
      <section className="bd-band">
        <div className="wrap">
          <span className="bd-eyebrow">合作方式</span>
          <h2 className="bd-h2">从方案到交付，我们和你一起完成</h2>
          <p className="bd-sub">合作的原则只有一条：<b>项目是你的，客户是你的</b>——我们提供平台与 AI 能力，帮你把标拿下来、把项目交出去。</p>
          <div className="bd-give">
            {gives.map((g) => (
              <div className="bd-gcard" key={g.title}>
                <span className="bd-gk" aria-hidden="true" />
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · 白皮书登记 */}
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
