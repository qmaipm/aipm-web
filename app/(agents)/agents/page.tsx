import type { Metadata } from "next";
import Hero from "@hp/components/sections/Hero";
import Clients from "@hp/components/sections/Clients";
import AgentShowcase from "@hp/components/sections/AgentShowcase";
import Contact from "@hp/components/sections/Contact";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/agents", {
  title: "Agentic 产品套件 · 一体化物业管理 AI — 启盟科技",
  description:
    "部署专业分工、协同作业的 AI Agent 矩阵，实现从规划、执行、评估到优化的人机协同闭环，实现服务质量和成本的全链路优化。",
  keywords: "AI物业管理,智能物业,Agentic AI,物业管理系统,启盟科技",
});

export default function Page() {
  return (
    <main className="min-h-screen agents-app">
      <Hero />
      <Clients />
      <AgentShowcase />
      <Contact />
    </main>
  );
}
