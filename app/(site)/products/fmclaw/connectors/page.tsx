import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, techArticleLd, Arrow, IC, LinkCards } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/connectors", {
  title: "工具箱(ToolBox)｜FMClaw™ 智能体工具调用与物业系统连接",
  description:
    "工具箱(ToolBox)是 FMClaw 智能体所需软件能力的连接器:物业 ERP、收费、工单、财务人力、协同平台、IoT、视频安防与机器人,经 API、MCP 等方式封装为工具(Tool),智能体在授权范围内调用。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/connectors",
  headline: "工具箱(ToolBox):智能体所需软件能力的连接器",
  description:
    "工具箱是 FMClaw 智能体所需软件能力的连接器。每个软件接口封装为一个工具(Tool),智能体在授权范围内调用——发邮件、打电话、建工单、调收费。",
});

const FAQ = [
  {
    q: "工具箱(ToolBox)是什么?",
    a: "工具箱是 FMClaw 智能体所需软件能力的连接器。每个软件接口封装为一个工具(Tool),智能体在授权范围内调用——发邮件、打电话、建工单、调收费。",
  },
  {
    q: "工具箱和其他平台的插件、连接器是什么关系?",
    a: "同一类能力。其他智能体平台叫插件、工具或连接器;区别在于工具箱预置的是物业管理的行业软件——收费、工单、ERP、BA、机器人。",
  },
  {
    q: "工具箱和数据集市是什么关系?",
    a: "分工不同。统一口径的取数走数据集市,软件动作的执行走工具箱。一个管数据,一个管动作。",
  },
  {
    q: "接入需要替换现有系统吗?",
    a: "不需要。API、MCP、CLI、数据库、文件、消息接口和设备协议,已有系统原样接入。",
  },
  {
    q: "机器人和 IoT 设备也能接吗?",
    a: "能。清洁机器人、巡检机器人、无人机,以及 BA、能源仪表、视频安防,都以工具形式接入。工作流发出任务,设备执行并回传结果。",
  },
];

/* 可调用的软件:六类目录 */
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
              <h1>智能体要用的软件,都接在<span className="grad">工具箱</span>里</h1>
              <p className="fmc-def">
                发邮件、打电话、建工单、调收费——智能体的每个动作,通过<b>工具</b>完成。
              </p>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/connectors-hero.png"
                alt="工具箱插画:中枢向外连接手机、IoT 传感器、业务系统、云端与机器人"
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
              工具箱,是智能体所需软件能力的连接器。每个软件接口封装为一个工具(Tool),
              智能体在授权范围内调用。
            </p>
          </div>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            相当于其他智能体平台的插件或连接器——区别是,预置的是物业管理的行业软件。
          </p>
          <p className="fmc-p">
            数据接口不在这里。统一口径的取数,在<Link className="fmc-ln" href="/products/fmclaw/ontology">数据集市</Link>;
            软件动作的执行,在工具箱。
          </p>
        </div>
      </section>

      {/* ===== 02 可调用的软件 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>物业管理要用的软件,基本都能接</h2>
          <div className="fmo-lrows">
            <div className="fmo-lrow">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/toolbox-dock.webp"
                  alt="工具箱插画:电话、邮件、工单、收费、机器人、摄像头、楼宇与消息等软件能力,以工具方块的形式接入中央工具箱"
                  width={1376}
                  height={768}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <h3>每个软件,是一个工具</h3>
                <p className="fmo-ldesc">
                  接入后,智能体像人一样使用这些软件:在收费系统建账单,
                  在工单系统派工,在协同平台通知人。
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
        </div>
      </section>

      {/* ===== 03 接入方式 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>已有系统,原样接入</h2>
          <div className="fmc-tags">
            {METHODS.map((m) => <span key={m}>{m}</span>)}
          </div>
          <p className="fmo-verdict">
            你在用的软件,接进来就能用。不替换。
          </p>
        </div>
      </section>

      {/* ===== 04 权限(暗场收口) ===== */}
      <section className="fmc-sec dark">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>每个工具的权限,决定谁能调用</h2>
          <ul className="fmo-checks">
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>范围明确</b><span className="d">每个工具有明确的使用范围,按组织授权。</span></span>
            </li>
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>流程门控</b><span className="d">调用发生在业务流程允许的节点,不越界。</span></span>
            </li>
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>调用留痕</b><span className="d">每一次调用都有记录,可审计、可复核。</span></span>
            </li>
          </ul>
          <LinkCards items={[
            { href: "/cases/property-group-chat-ai-service", lab: "客户案例", t: "业主群报事", d: "识别、建单、派工、通知——全程用的都是企业已有的系统。", icon: IC.chat },
          ]} />
        </div>
      </section>

      <FmFaq items={FAQ} />

      {/* ===== 继续了解 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">KEEP EXPLORING</p>
          <h2>工具之上,是流程与治理</h2>
          <p className="fmc-p">
            工作流引擎决定何时用哪个工具,运行层保证用得可控。
          </p>
          <LinkCards items={[
            { href: "/products/fmclaw/workflow-engine", lab: "平台能力 · L2", t: "工作流引擎", d: "把管理流程,交给智能体运行。", icon: IC.flow },
            { href: "/products/fmclaw/agent-runtime", lab: "平台能力 · L4", t: "运行与治理", d: "身份、权限、运行状态与审计记录的统一管理。", icon: IC.shield },
          ]} />
          <p className="fmc-rel-back">
            <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
          </p>
        </div>
      </section>

      <div className="fmo-upd">
        <div className="wrap">
          <p className="fmc-updated">最后更新:2026-07-20</p>
        </div>
      </div>

      {/* ===== 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>把你在用的软件,接给智能体</h2>
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
