import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, FmRelated, techArticleLd } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/connectors", {
  title: "行业工具与系统连接｜FMClaw™ MCP、API 与物业系统接入",
  description:
    "FMClaw 通过 ToolBox 连接物业 ERP、财务人力、协同平台、IoT、BA、视频安防和机器人，让智能体能够查询、写入与执行。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/connectors",
  headline: "行业工具与系统连接",
  description:
    "ToolBox 是 FMClaw 对业务系统、数据接口和现场设备能力的统一管理入口。Tool 是智能体在明确权限下可以调用的一项业务能力。",
});

const FAQ = [
  {
    q: "Agent 如何调用企业系统?",
    a: "通过 API、MCP、CLI、数据库、文件、消息接口和设备协议等方式接入。每项系统能力封装为 Tool——智能体在明确权限下可以调用的一项业务能力,可以读取数据,也可以在系统或现场执行动作。",
  },
  {
    q: "ToolBox 是什么?",
    a: "ToolBox 是 FMClaw 对业务系统、数据接口和现场设备能力的统一管理入口。它不是开发者工具市场,而是让智能体安全调用企业系统的管理层。",
  },
  {
    q: "接入 FMClaw 需要替换现有系统吗?",
    a: "不需要。FMClaw 不要求企业重建业务系统。现有系统继续作为业务记录与协作入口,FMClaw 负责连接数据、组织流程和执行动作。",
  },
  {
    q: "工具调用的权限如何控制?",
    a: "每项工具都有明确的使用范围。智能体只能在组织授权和业务流程允许的范围内调用,调用行为有记录、可审计。",
  },
  {
    q: "机器人和 IoT 设备也能接入吗?",
    a: "可以。清洁机器人、巡检机器人、无人机等现场执行设备,以及 BA、能源仪表、视频安防等 IoT 系统,都是六类行业连接的一部分。业务工作流发出任务,设备执行并回传结果。",
  },
];

const METHODS = ["API", "MCP", "CLI", "数据库", "文件", "消息接口", "设备协议"];

const CONNECTS: { name: string; en: string; items: string }[] = [
  { name: "物业 ERP", en: "PROPERTY ERP", items: "收费 · 工单 · 租赁 · 合同 · 客户档案" },
  { name: "财务与人力", en: "FINANCE & HR", items: "总账 · 应收应付 · 考勤 · 排班 · 绩效 · 薪酬" },
  { name: "协同平台", en: "COLLABORATION", items: "钉钉 · 飞书 · 企业微信 · 消息 · 审批 · 文档" },
  { name: "楼宇与 IoT", en: "BUILDING & IOT", items: "BA · HVAC · 电梯 · 给排水 · 能源仪表 · 消防联动" },
  { name: "视频与安防", en: "VIDEO & SECURITY", items: "摄像头 · 门禁 · 巡更 · 告警" },
  { name: "机器人与装备", en: "ROBOTICS", items: "清洁机器人 · 巡检机器人 · 无人机 · 其他现场执行设备" },
];

export default function Page() {
  return (
    <main className="fmc">
      <JsonLd data={TECH_LD} />
      <div className="wrap">
        <FmBreadcrumb
          trail={[
            { name: "FMClaw™ 产品总览", href: "/products/fmclaw" },
            { name: "行业工具与系统连接", href: "/products/fmclaw/connectors" },
          ]}
        />
      </div>

      <header className="fmc-hero">
        <span className="fmc-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="fmc-hero-cols">
            <div>
              <p className="fmc-kicker">Industry Tools &amp; System Connectivity</p>
              <h1>连接已有系统,让智能体<span className="grad">真正完成工作</span></h1>
              <p className="fmc-def">
                行业工具与系统连接是 FMClaw™ 的<b>执行层</b>。它通过 API、MCP、CLI 和现有系统接口,
                把物业 ERP、财务人力、协同平台、IoT 和机器人接入同一个运行体系,
                让智能体不只是回答问题,而是<b>查询、写入、通知、派单、控制和执行</b>。
              </p>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/connectors-hero.png"
                alt="行业工具与系统连接插画:中枢向外连接手机、IoT 传感器、业务系统、云端与机器人"
                width={1200}
                height={896}
              />
            </div>
          </div>
        </div>
      </header>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>ToolBox 是什么?</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>ToolBox 是 FMClaw 对业务系统、数据接口和现场设备能力的统一管理入口。</p>
          </div>
          <div className="fmc-defbox" style={{ marginTop: 12 }}>
            <p className="fmc-deflab">TOOL</p>
            <p>
              Tool 是智能体在明确权限下可以调用的一项业务能力。它可以读取数据,
              也可以在系统或现场执行动作。
            </p>
          </div>
        </div>
      </section>

      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>支持的连接方式</h2>
          <div className="fmc-tags">
            {METHODS.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>六类行业连接</h2>
          <div className="fmc-cols3">
            {CONNECTS.map((c) => (
              <div className="fmc-cell" key={c.name}>
                <span className="fmc-cell-en">{c.en}</span>
                <h3>{c.name}</h3>
                <p>{c.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>从连接到动作</h2>
          <p className="fmc-p">连接不是目的。智能体沿着完整的动作链完成一件事:</p>
          <div className="fmc-chain">
            <div className="fmc-chain-step"><b>查询</b><span>读取业务数据</span></div>
            <div className="fmc-chain-step"><b>判断</b><span>按业务口径处理</span></div>
            <div className="fmc-chain-step"><b>审批</b><span>人工节点确认</span></div>
            <div className="fmc-chain-step"><b>写入</b><span>回写业务系统</span></div>
            <div className="fmc-chain-step"><b>通知</b><span>推送相关的人</span></div>
            <div className="fmc-chain-step"><b>反馈</b><span>执行结果留痕</span></div>
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>权限:授权范围内调用</h2>
          <p className="fmc-p">
            每项工具都有明确的使用范围。智能体只能在组织授权和业务流程允许的范围内调用。
          </p>
          <div className="fmc-status">
            <span>SCOPED ACCESS</span>
            <span>FLOW GATED</span>
            <span>CALL LOGGED</span>
          </div>
        </div>
      </section>

      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">06</p>
          <h2>不替换现有系统</h2>
          <p className="fmc-p">
            FMClaw 不要求企业重建所有业务系统。现有系统继续作为业务记录与协作入口,
            FMClaw 负责连接数据、组织流程和执行动作。
          </p>
          <p className="fmc-p">
            一个真实的例子:业主在微信群里报修,智能体识别后在工单系统创建工单、按规则派单、
            通过企业微信通知维修工,完成后回传结果并通知业主——全程用的都是企业已有的系统。
            完整过程见<Link className="fmc-ln" href="/cases/property-group-chat-ai-service">业主群报事案例</Link>。
          </p>
        </div>
      </section>

      <FmFaq items={FAQ} />

      <FmRelated
        updated="2026-07-20"
        links={[
          { label: "查看第三方平台 AI 协同", href: "/products/collaboration" },
          { label: "查看 IoT 物理世界感知", href: "/products/iot" },
          { label: "查看机器人与智能装备", href: "/products/robots" },
          { label: "查看智能体运行与治理中心", href: "/products/fmclaw/agent-runtime" },
        ]}
      />
    </main>
  );
}
