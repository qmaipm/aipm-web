import type { Metadata } from "next";
import Link from "next/link";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { SolPage, SolHero, SolSection, SolCompare, SolSteps, SolCols, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/quality", {
  title: "服务质量管理 · 智能体解决方案 | 启盟科技",
  description:
    "服务质量靠一套体系管出来：过程管控、智能调度、质量评估、考核机制四个维度，由运营管理 Agent 与质量评估 Agent 两大 Agent 协作，把质量从事后打分变成全程在管。",
});

// 四个维度：前三个由两个 Agent 承担，第四个是管理动作（考核）
const dims = [
  { meta: "运营管理 Agent", title: "过程管控", body: "传感器无感式感知服务完成情况，确保有人来，服务有人做。", href: "/solutions/operations", linkText: "了解运营管理 Agent" },
  { meta: "运营管理 Agent", title: "智能调度", body: "AI 自动识别质量风险点位并整体调度，项目经理只做审核，不用自己盯着派。" },
  { meta: "质量评估 Agent", title: "质量评估", body: "主管按 AI 指引到风险点位，只需拍照，AI 自动识别问题；问题严重时，AI 自动调度人员整改。", href: "/solutions/assessment", linkText: "了解质量评估 Agent" },
  { meta: "管理动作", title: "自有员工考核 · 外包服务考核", body: "结合工作量与服务质量，对自有员工进行激励和扣罚。用同一套指标，对供应商进行激励和扣罚。" },
];

const reqs = [
  { title: "传感器到位", body: "空间传感器 + 智能工牌，在场与服务执行情况自动采集，不靠人工填报。", href: "/products/iot", linkText: "查看 IoT 平台" },
  { title: "管理动作跟上", body: "主管按 AI 指引去现场检查、拍照，严重问题进整改闭环：动作要真的做。" },
  { title: "指标与考核挂钩", body: "工作量与工作质量都进考核，落到外包与员工头上，方案才推得动。" },
];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="服务质量管理"
        title={["服务质量，靠体系", "管出来"]}
        lead={<>质量不是靠事后抽查打分打出来的。我们用<b>过程管控、智能调度、质量评估、考核机制</b>四个维度，两个 Agent 协作，把它系统地管起来。</>}
        secondary={{ href: "#system", label: "看四个维度" }}
        proof={["四个维度", "两个 Agent 协作", "传感器 + 考核挂钩"]}
        image={{ src: "/cases/cover-restroom.png", alt: "保洁完成后的洗手台，在场与作业情况由传感器自动记录（场景示意）" }}
      />

      <SolSection title="质量不是抽查出来的，是管出来的" tone="mist" split
        sub={<>抽查只能发现问题，而且发现时往往已经发生。质量不该是事后打分，而该是一件<b>全程在管</b>的事。</>}>
        <SolCompare labels={["过去 · 抽查", "现在 · 全程在管"]} rows={[
          { before: "抽样、滞后。等发现问题，往往已经发生了。", after: "覆盖全员全程，对着数据评判，问题躲不掉、能追溯、能整改。" },
        ]} />
      </SolSection>

      <SolSection id="system" title="两个 Agent 管质量，一套考核来落地" split
        sub="过程管控、智能调度、质量评估三个维度交给两个 Agent；再把工作量与质量结合成一套考核，把方案落到人员和供应商头上。">
        <SolSteps items={dims} />
        <SolVerdict>从有没有人来，到干得好不好，再到该不该奖罚，全程有据</SolVerdict>
        <SolMore><Link href="/agents">看四 Agent 闭环总览</Link></SolMore>
      </SolSection>

      <SolSection title="它跟传感器绑在一起，也跟考核绑在一起" tone="mist"
        sub={<>这套方案<b>与传感器紧密结合</b>，需要配套相关管理动作，并把<b>指标与考核挂钩</b>：三者都到位，服务质量才能全面提上来。</>}>
        <SolCols items={reqs} />
        <SolMore>这是一套方法论：落地不止是上系统，还需要<b>优化组织的激励方式</b>；面向供应商时，更要对<b>原有合同做相应变更</b>。</SolMore>
        <SolMore>同一套质量数据，也支撑 <Link href="/solutions/subcontract">服务分包管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</SolMore>
      </SolSection>

      <SeoFaq
        heading="服务质量管理，你可能想问"
        serviceName="服务质量管理"
        serviceDesc="把物业服务质量数据化，实现质价相符与 AI 质检。"
        items={[
          { q: "物业服务质量怎么量化考核？", a: "把“好”定义成可衡量的指标（巡检评分、服务达标率、到岗率、投诉率、响应时间），用 IoT 与智能软件实时采集并自动生成达成率报告，让质量可看、可对账。" },
          { q: "什么是 AI 质检？", a: "用 AI 对现场服务的过程数据与影像做自动核查，替代部分人工抽查，降低抽查成本、统一扣分标准，让质检更客观、更高频。" },
          { q: "“质价相符”对物业意味着什么？", a: "服务定价要与可衡量的服务质量挂钩。把质量数据化后，既能向业主说清楚钱花在哪，也能驱动服务商持续改进。" },
        ]}
      />

      <SolEnd
        title={["把一次真实的服务，", "从在场到考核都管起来"]}
        sub="从你的一个真实业务开始。"
        alt={<>质检记录还能接进客服、巡检、收缴，见 <Link href="/insights/ai-applications-and-solutions-in-property-management">应用与解决方案全览</Link></>}
      />
    </SolPage>
  );
}
