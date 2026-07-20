import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@hp/components/sections/Hero";
import Clients from "@hp/components/sections/Clients";
import AgentShowcase from "@hp/components/sections/AgentShowcase";
import Contact from "@hp/components/sections/Contact";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import "./matrix.css";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/agents", {
  title: "物业管理智能体矩阵｜FMClaw™ AI 物业经理与多智能体协同",
  description:
    "物业管理智能体矩阵是运行在 FMClaw 平台上的四个行业智能体:服务设计、运营管理、质量评估与服务优化。它们共享同一套行业数据本体、指标、业务工作流和组织权限,围绕同一业务闭环协作。",
  keywords: "物业管理智能体,物业智能体,AI 物业经理,多智能体协同,数字员工,物业管理 AI Agent",
});

const AGENTS = [
  { name: "服务设计智能体", desc: "根据项目定位与业务目标,生成服务标准与服务方案。" },
  { name: "运营管理智能体", desc: "驱动日常运营调度,让计划、执行与反馈形成闭环。" },
  { name: "质量评估智能体", desc: "按统一标准评估服务质量,发现问题并推动整改。" },
  { name: "服务优化智能体", desc: "基于运行数据核算业务结果,持续优化服务与成本。" },
];

const RELATIONS: [string, string, string, string][] = [
  ["数据来自", "行业数据本体与指标中心", "/products/fmclaw/ontology", "智能体读取的项目、空间、设备、工单等业务对象与统一指标,都来自这里。"],
  ["流程运行在", "行业级智能体工作流引擎", "/products/fmclaw/workflow-engine", "四个智能体的工作以业务工作流的方式组织、运行和跨项目复用。"],
  ["动作通过", "行业工具与系统连接", "/products/fmclaw/connectors", "查询、派单、通知、写回等动作,通过与现有系统的连接完成。"],
  ["运行受控于", "智能体运行与治理中心", "/products/fmclaw/agent-runtime", "每个智能体的身份、权限、运行状态和工作记录都在这里统一管理。"],
];

const FAQ = [
  {
    q: "什么是物业管理智能体矩阵?",
    a: "物业管理智能体矩阵是运行在 FMClaw 平台上的四个行业智能体:服务设计智能体、运营管理智能体、质量评估智能体和服务优化智能体。它们共享同一套行业数据本体、指标、业务工作流和组织权限,分别负责服务设计、运营管理、质量评估与服务优化。",
  },
  {
    q: "四个智能体是四个独立的聊天机器人吗?",
    a: "不是。四个智能体围绕同一业务闭环协作:服务设计给出标准,运营管理驱动执行,质量评估检验结果,服务优化改进下一轮。它们共享同一套数据、指标和权限,而不是各自独立对话。",
  },
  {
    q: "智能体矩阵与 FMClaw 平台是什么关系?",
    a: "智能体矩阵是运行在 FMClaw 平台上的行业应用。数据来自行业数据本体与指标中心,流程运行在行业级智能体工作流引擎,动作通过行业工具与系统连接完成,运行受控于智能体运行与治理中心。",
  },
  {
    q: "智能体的工作可以追溯吗?",
    a: "可以。每个智能体在明确的组织身份、项目范围和工具权限下工作,数据读取、流程运行、工具调用、人工确认和最终结果都会留下记录,可以在智能体运行与治理中心查看。",
  },
];

const ITEMLIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "物业管理智能体矩阵",
  itemListElement: AGENTS.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.name,
    description: a.desc,
  })),
};

const WEBPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "物业管理智能体矩阵",
  url: `${SITE_URL}/agents`,
  inLanguage: "zh-CN",
  description:
    "物业管理智能体矩阵是运行在 FMClaw 平台上的四个行业智能体。它们共享同一套行业数据本体、指标、业务工作流和组织权限,分别负责服务设计、运营管理、质量评估与服务优化。",
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "FMClaw™ 产品总览", item: `${SITE_URL}/products/fmclaw` },
    { "@type": "ListItem", position: 3, name: "物业管理智能体矩阵", item: `${SITE_URL}/agents` },
  ],
};

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <main className="min-h-screen agents-app">
      <JsonLd data={[WEBPAGE_LD, ITEMLIST_LD, BREADCRUMB_LD, FAQ_LD]} />
      <Hero />
      <Clients />

      {/* 定义 + 平台关系(服务端渲染纯 HTML) */}
      <section className="amx" id="matrix">
        <div className="amx-wrap">
          <p className="amx-kicker">PROPERTY AGENT MATRIX · ON FMCLAW</p>
          <h2>什么是物业管理智能体矩阵</h2>
          <p className="amx-def">
            物业管理智能体矩阵,是运行在 FMClaw 平台上的四个行业智能体。它们共享同一套行业数据本体、
            指标、业务工作流和组织权限,分别负责服务设计、运营管理、质量评估与服务优化,
            围绕同一业务闭环协作,而不是四个孤立的聊天机器人。
          </p>
          <div className="amx-agents">
            {AGENTS.map((a) => <span key={a.name}>{a.name}</span>)}
          </div>
          <p className="amx-note">
            服务设计给出标准,运营管理驱动执行,质量评估检验结果,服务优化改进下一轮——
            四个智能体接力完成从设计到优化的管理闭环。
          </p>

          <dl className="amx-map">
            {RELATIONS.map(([k, name, href, d]) => (
              <div key={href}>
                <dt>{k}</dt>
                <dd><Link href={href}>{name}</Link> —— {d}</dd>
              </div>
            ))}
          </dl>

          <div className="amx-faq">
            <h2>常见问题</h2>
            {FAQ.map((f) => (
              <details key={f.q} className="amx-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <p className="amx-back">
            <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
          </p>
          <p className="amx-updated">最后更新:2026-07-20</p>
        </div>
      </section>

      <AgentShowcase />
      <Contact />
    </main>
  );
}
