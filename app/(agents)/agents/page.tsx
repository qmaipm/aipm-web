import type { Metadata } from "next";
import Hero from "@hp/components/sections/Hero";
import Clients from "@hp/components/sections/Clients";
import AgentShowcase from "@hp/components/sections/AgentShowcase";
import MatrixSections, { FAQ } from "@hp/components/sections/MatrixSections";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import "./matrix.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/agents", {
  title: "物业管理智能体矩阵｜FMClaw™ Agentic AI 产品套件",
  description:
    "FMClaw 物业管理智能体矩阵是一套面向物业与设施管理的行业级 Agentic AI 产品套件,由服务设计、运营管理、质量评估与服务优化智能体组成,在统一的数据、工作流、权限与审计体系下协同运行。",
  keywords:
    "物业管理智能体,物业管理AI,Agentic AI产品套件,物业AI智能体,设施管理AI,AI物业经理,多智能体协同,企业级AI智能体,物业管理Agent,物业智能体平台",
  openGraph: {
    title: "物业管理智能体矩阵｜FMClaw™ Agentic AI 产品套件",
    description:
      "四个专业智能体——服务设计、运营管理、质量评估、服务优化——在 FMClaw 平台上协同完成物业管理闭环。",
  },
});

/* ---------- JSON-LD(不可见,与可见内容一致) ---------- */
const AGENT_ITEMS = [
  { name: "服务设计智能体", href: "/solutions/service-design" },
  { name: "运营管理智能体", href: "/solutions/operations" },
  { name: "质量评估智能体", href: "/solutions/assessment" },
  { name: "服务优化智能体", href: "/solutions/optimization" },
];

const WEBPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "物业管理智能体矩阵",
  url: `${SITE_URL}/agents`,
  inLanguage: "zh-CN",
  description:
    "物业管理智能体矩阵,是一套面向物业与设施管理的行业级 Agentic AI 系统,通过多个专业智能体协作,持续完成服务设计、运营执行、质量评估与管理优化。",
  isPartOf: { "@type": "WebSite", name: "启盟科技 FMClaw™", url: SITE_URL },
};

const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "智能体解决方案", item: `${SITE_URL}/agents` },
    { "@type": "ListItem", position: 3, name: "物业管理智能体矩阵", item: `${SITE_URL}/agents` },
  ],
};

const ITEMLIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "物业管理智能体矩阵",
  description: "面向物业与设施管理的行业级 Agentic AI 产品套件中的四个专业智能体。",
  itemListElement: AGENT_ITEMS.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: a.name,
    url: `${SITE_URL}${a.href}`,
  })),
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
      <JsonLd data={[WEBPAGE_LD, BREADCRUMB_LD, ITEMLIST_LD, FAQ_LD]} />
      <Hero />
      <Clients />
      <AgentShowcase />
      <MatrixSections />
    </main>
  );
}
