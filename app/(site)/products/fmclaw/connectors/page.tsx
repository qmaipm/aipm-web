import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, techArticleLd, Arrow, IC, LinkCards, ScenarioCards } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/connectors", {
  title: "工具箱（ToolBox）｜FMClaw™ 工具调用与钉钉、飞书、企业微信接入",
  description:
    "工具箱（ToolBox）是 FMClaw 智能体所需软件能力的连接器：物业 ERP、收费、工单、财务人力、IoT、视频安防与机器人，经 API、MCP 等方式封装为工具（Tool），智能体在授权范围内调用。钉钉、飞书、企业微信经官方接口接入，不替换、不冲突。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/connectors",
  headline: "工具箱（ToolBox）：智能体所需软件能力的连接器",
  description:
    "工具箱是 FMClaw 智能体所需软件能力的连接器。每个软件接口封装为一个工具（Tool），智能体在授权范围内调用——发邮件、打电话、建工单、调收费。",
});

const FAQ = [
  {
    q: "工具箱（ToolBox）是什么?",
    a: "工具箱是 FMClaw 智能体所需软件能力的连接器。每个软件接口封装为一个工具（Tool），智能体在授权范围内调用——发邮件、打电话、建工单、调收费。",
  },
  {
    q: "工具箱和其他平台的插件、连接器是什么关系?",
    a: "同一类能力。其他智能体平台叫插件、工具或连接器;区别在于工具箱预置的是物业管理的行业软件——收费、工单、ERP、BA、机器人。",
  },
  {
    q: "工具箱和数据集市是什么关系?",
    a: "分工不同。统一口径的取数走数据集市，软件动作的执行走工具箱。一个管数据，一个管动作。",
  },
  {
    q: "接入需要替换现有系统吗?",
    a: "不需要。API、MCP、CLI、数据库、文件、消息接口和设备协议，已有系统原样接入。",
  },
  {
    q: "已经在用钉钉 AI 助理或飞书 aily，还需要 FMClaw 吗?",
    a: "看业务。平台的 AI 助理擅长组织协作——总结消息、写文档、查日程;工单、收费、设备、对账这些物业与设施管理的专业环节，需要行业数据和行业工具，这是 FMClaw 补上的那一段。两者经平台官方预留的接口协同，不冲突。",
  },
  {
    q: "会不会和协同平台重复建设?",
    a: "不会。沟通、审批、通知仍由平台负责，账号和组织架构沿用平台已有配置;FMClaw 只做专业业务那一段。停掉接入，平台照常运行。",
  },
  {
    q: "智能体会不会乱用工具?",
    a: "不会。谁能用哪个工具，接入时就定好;查信息可以直接做，发出去、扣到钱、动到设备的动作，先经人批准;每一次调用都有记录，可复核。",
  },
  {
    q: "机器人和 IoT 设备也能接吗?",
    a: "能。清洁机器人、巡检机器人、无人机，以及 BA、能源仪表、视频安防，都以工具形式接入。工作流发出任务，设备执行并回传结果。",
  },
];

/* 可调用的软件：六类目录 */
const SOFTWARE = [
  { n: "01", t: "物业 ERP", d: "收费、工单、租赁、合同、客户档案。" },
  { n: "02", t: "财务与人力", d: "总账、应收应付、考勤、排班、薪酬。" },
  { n: "03", t: "协同平台", d: "钉钉、飞书、企业微信的消息、审批与文档。" },
  { n: "04", t: "楼宇与 IoT", d: "BA、HVAC、电梯、给排水、能源仪表、消防。" },
  { n: "05", t: "视频与安防", d: "摄像头、门禁、巡更、告警。" },
  { n: "06", t: "机器人与装备", d: "清洁机器人、巡检机器人、无人机。" },
];

const METHODS = ["MCP", "API", "CLI", "数据库", "文件", "消息接口", "设备协议"];

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8.5l3.2 3.2L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="fmc">
      <JsonLd data={TECH_LD} />
      <div className="wrap">
        <FmBreadcrumb
          trail={[
            { name: "FMClaw™ 产品总览", href: "/products/fmclaw" },
            { name: "工具箱", href: "/products/fmclaw/connectors" },
          ]}
        />
      </div>

      {/* ===== HERO ===== */}
      <header className="fmc-hero">
        <span className="fmc-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="fmc-hero-cols">
            <div>
              <p className="fmc-kicker">L3 · ToolBox</p>
              <h1>智能体要用的软件，都接在<span className="grad">工具箱</span>里</h1>
              <p className="fmc-def">
                发邮件、打电话、建工单、调收费——智能体的每个动作，通过<b>工具</b>完成。
              </p>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/connectors-hero.png"
                alt="工具箱插画：中枢向外连接手机、IoT 传感器、业务系统、云端与机器人"
                width={1200}
                height={896}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===== 01 定义 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>工具箱是什么?</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              工具箱，是智能体所需软件能力的连接器。每个软件接口封装为一个工具（Tool），
              智能体在授权范围内调用。
            </p>
          </div>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            相当于其他智能体平台的插件或连接器——区别是，预置的是物业管理的行业软件。
          </p>
          <p className="fmc-p">
            数据接口不在这里。统一口径的取数，在<Link className="fmc-ln" href="/products/fmclaw/ontology">数据集市</Link>;
            软件动作的执行，在工具箱。
          </p>
        </div>
      </section>

      {/* ===== 02 可调用的软件 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>物业管理要用的软件，基本都能接</h2>
          <div className="fmo-lrows">
            <div className="fmo-lrow">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/toolbox-dock.webp"
                  alt="工具箱插画：电话、邮件、工单、收费、机器人、摄像头、楼宇与消息等软件能力，以工具方块的形式接入中央工具箱"
                  width={1376}
                  height={768}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <h3>每个软件，是一个工具</h3>
                <p className="fmo-ldesc">
                  接入后，智能体像人一样使用这些软件：在收费系统建账单，
                  在工单系统派工，在协同平台通知人。
                </p>
              </div>
            </div>
          </div>
          <div className="fmo-caps">
            {SOFTWARE.map((c) => (
              <div className="fmo-cap" key={c.n}>
                <span className="fmo-cap-no">{c.n}</span>
                <div>
                  <b>{c.t}</b>
                  <p>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="fmc-tags" aria-label="接入方式">
            {METHODS.map((m) => <span key={m}>{m}</span>)}
          </div>
          <p className="fmo-verdict">
            你在用的软件，原样接进来就能用。不替换。
          </p>
        </div>
      </section>

      {/* ===== 03 协同平台：钉钉、飞书、企业微信 ===== */}
      <section className="fmc-sec" id="platforms">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>已经在用钉钉、飞书、企业微信？正好</h2>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            这是被问得最多的一件事。答案是：不用二选一。
            很多企业已经在用这些平台，FMClaw 与它们产生协同——不是替代，是互补，
            客户因此多出更灵活的选择。
          </p>
          <div className="fmo-lrows" style={{ marginTop: 44 }}>
            <div className="fmo-lrow">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/ecosystem-band.webp"
                  alt="第三方协作平台接入插画：三个协作应用窗口的数据流汇入同一个平台底座"
                  width={1376}
                  height={1027}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <h3>协同的位置，平台官方已经留好了</h3>
                <p className="fmo-ldesc">
                  钉钉的机器人消息与企业技能、飞书的第三方工具调用与开放 API、企业微信的智能机器人与回调接口——
                  三家平台都在官方架构里预留了第三方接入的位置。FMClaw 从这些位置接进去：
                  平台继续负责组织协作，FMClaw 补上物业与设施管理的专业业务。
                </p>
              </div>
            </div>
          </div>
          <p className="fmc-p" style={{ marginTop: 44 }}>
            三种协同方式，按你现在的用法选。可以单独用，也可以叠加用。
          </p>
          <div className="fmo-capgrp" style={{ marginTop: 28 }}>
            <div className="fmo-cg">
              <div className="fmo-cg-head">
                <span className="fmo-cg-no">方式 01 · 机器人消息</span>
                <h3>群里多一个机器人</h3>
                <p className="fmo-cg-goal">走平台机器人的消息接口。</p>
              </div>
              <ul className="fmo-cg-list">
                <li>
                  <b>怎么用</b>
                  <p>业主在群里发一条报修，平台机器人收进来，FMClaw 识别、建单、派工，进度发回群里。对话始终在原来的群里。</p>
                </li>
                <li>
                  <b>常见于</b>
                  <p>报修、投诉、业主群报事。</p>
                </li>
              </ul>
            </div>
            <div className="fmo-cg">
              <div className="fmo-cg-head">
                <span className="fmo-cg-no">方式 02 · 技能调用</span>
                <h3>对话入口不变，底层接 FMClaw</h3>
                <p className="fmo-cg-goal">走平台开放的技能与工具调用接口。</p>
              </div>
              <ul className="fmo-cg-list">
                <li>
                  <b>怎么用</b>
                  <p>管理层还在原来的对话框里问「本月哪个项目能耗异常」，答案由 FMClaw 用行业数据和统一口径算出来，带来源。</p>
                </li>
                <li>
                  <b>常见于</b>
                  <p>管理层问业务、经营数据问询。</p>
                </li>
              </ul>
            </div>
            <div className="fmo-cg">
              <div className="fmo-cg-head">
                <span className="fmo-cg-no">方式 03 · 表格互通</span>
                <h3>两边看到同一份数</h3>
                <p className="fmo-cg-goal">走多维表、智能表格的开放 API，双向同步。</p>
              </div>
              <ul className="fmo-cg-list">
                <li>
                  <b>怎么用</b>
                  <p>FMClaw 数据集市与平台的多维表双向同步，日报、周报、台账在两边看到的是同一份数。</p>
                </li>
                <li>
                  <b>常见于</b>
                  <p>运营日报、周报、跨项目台账。</p>
                </li>
              </ul>
            </div>
          </div>
          <p className="fmc-p" style={{ marginTop: 52, fontWeight: 700, color: "var(--c-ink)" }}>
            担心冲突或重复建设？逐条核对：
          </p>
          <ul className="fmo-checks lt">
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>不替换现有平台</b><span className="d">钉钉、飞书、企业微信照常用，员工不换工具、不改习惯。</span></span>
            </li>
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>不重复平台已有能力</b><span className="d">沟通、审批、通知仍由平台负责;FMClaw 只补物业与设施管理的专业环节。</span></span>
            </li>
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>账号与权限沿用现有体系</b><span className="d">组织架构、身份认证复用平台已有配置，不另建一套。</span></span>
            </li>
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>随时可以停</b><span className="d">接入是加一段能力;停掉接入，平台照常运行。</span></span>
            </li>
          </ul>
          <ScenarioCards items={[
            { href: "/cases/property-group-chat-ai-service", lab: "客户案例", t: "业主群报事", d: "群消息识别、建单、派工、通知，对话始终在原来的群里。",
              img: "/products/fmclaw/case-chat-service.webp", alt: "业主群报事案例插图：群消息自动识别建单，派工与通知走企业已有系统" },
            { href: "/scenarios/exec-query", lab: "场景", t: "管理层问询", d: "对话框还是那个对话框，答案带口径和来源。",
              img: "/products/fmclaw/scenario-exec-query.webp", alt: "管理层问询场景插图：在对话中直接提问业务，智能体返回带口径和来源的答案" },
            { href: "/cases/property-group-auto-operation-report", lab: "客户案例", t: "运营日报自动生成", d: "500 多个项目的数据，在协同平台里每天准时看到。",
              img: "/products/fmclaw/case-auto-report.webp", alt: "运营日报自动生成案例插图：多项目数据汇聚为结构一致的日报" },
          ]} />
        </div>
      </section>

      {/* ===== 04 权限（暗场） ===== */}
      <section className="fmc-sec dark">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>该问人的动作，先问人</h2>
          <div className="fmo-howgrid">
            <div className="fmo-howside">
              <p className="fmo-howcase">
                谁能用哪个工具，接入时就定好。智能体拿到的不是整个系统，
                是<b>明确授权的几个动作</b>。
              </p>
              <p className="fmo-hownote">
                收回授权，工具立即不可用。已有记录保留，可随时复核。
              </p>
            </div>
            <div className="fmo-tiers">
              <div className="fmo-tier">
                <span className="fmo-tier-tag">直接执行</span>
                <p>查信息、算数据、写草稿——这类动作不产生外部影响，智能体<b>直接做</b>。</p>
                <span className="ex">例：查某户的缴费记录，汇总本月工单，起草一条群通知。</span>
              </div>
              <div className="fmo-tier human">
                <span className="fmo-tier-tag">先经人批准</span>
                <p>发出去、扣到钱、动到设备——这类动作影响到人和钱，<b>先经人批准再执行</b>。</p>
                <span className="ex">例：向业主群发通知，给某户退费，远程停一台设备。</span>
              </div>
              <div className="fmo-tier">
                <span className="fmo-tier-tag">全程有记录</span>
                <p>无论直接执行还是人批准后执行，<b>每一次调用都有记录</b>：谁发起、调了什么、结果如何。</p>
                <span className="ex">出了问题，能查到那一步;要复核，翻记录就行。</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FmFaq items={FAQ} />

      {/* ===== 继续了解 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">KEEP EXPLORING</p>
          <h2>工具之上，是流程与治理</h2>
          <p className="fmc-p">
            工作流引擎决定何时用哪个工具，运行层保证用得可控。
          </p>
          <LinkCards items={[
            { href: "/products/fmclaw/workflow-engine", lab: "平台能力 · L2", t: "工作流引擎", d: "把管理流程，交给智能体运行。", icon: IC.flow },
            { href: "/products/fmclaw/agent-runtime", lab: "平台能力 · L4", t: "控制台", d: "智能体的身份、权限、运行和记录，都在一个地方管理。", icon: IC.shield },
          ]} />
          <p className="fmc-rel-back">
            <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
          </p>
        </div>
      </section>

      <div className="fmo-upd">
        <div className="wrap">
          <p className="fmc-updated">最后更新：2026-07-21</p>
        </div>
      </div>

      {/* ===== 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>把你在用的软件，接给智能体</h2>
          <p>从一个真实动作开始验证。</p>
          <div className="cta-row">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <p className="alt">或先看看<Link href="/cases">已经在生产中运行的案例</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
