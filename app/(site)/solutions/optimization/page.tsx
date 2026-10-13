import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import { SolPage, SolHero, SolSection, SolCompare, SolSteps, SolAside, SolCols, SolLoop, SolFigure, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/optimization", {
  title: "服务优化 · 智能体解决方案 | 启盟科技",
  description:
    "服务优化 Agent 汇总质检与运营数据，做聚类分析定位高频问题，给出改进建议，并回灌服务设计。这是闭环的收尾，也是下一轮的起点。",
});

const flow = [
  { meta: "输入", title: "全量质检与评估数据", body: "多模态质检照片 + AI 评估标签，来自质量评估的全量产出。" },
  { meta: "处理 · AI", title: "AI 聚类分析", body: "高频问题 Top5、问题环节定位、根因关联，把零散问题归并成可改进的几条。" },
  { meta: "输出", title: "复盘报告 + 回灌", body: "月度复盘报告与优化建议，回灌服务设计 Agent，形成自动进化闭环。" },
];

const mods = [
  { title: "计薪系统", body: "把质量结论与人效挂钩，优化落到激励上。", href: "/products/fmclaw" },
  { title: "数据大屏", body: "高频问题与趋势集中呈现，复盘有据。", href: "/products/fmclaw" },
  { title: "API 开放平台", body: "优化建议可对接外部系统，回灌不被锁死。", href: "/products/fmclaw" },
];

const loop = ["服务设计", "运营管理", "质量评估", "服务优化"];

export default function OptimizationPage() {
  return (
    <SolPage>
      <SolHero
        crumb="服务优化"
        title={["找出反复出现的问题，", "把改进写回服务标准"]}
        lead={<>服务优化 Agent 汇总质检与运营数据，做聚类分析定位高频问题，给出改进建议，并<b>回灌服务设计</b>。这是闭环的收尾，也是下一轮的起点。</>}
        secondary={{ href: "#flow", label: "看它怎么工作" }}
        proof={["聚类复盘", "高频问题定位", "改进回灌标准"]}
        image={{ src: "/insights/digital-labor-cover.jpg", alt: "运营负责人在显示器前查看月度复盘数据（场景示意）" }}
      />

      <SolSection title="从凭印象复盘，到基于数据复盘" tone="mist" split
        sub={<>复盘过去多<b>凭印象与个人经验</b>，反复出现的问题不易被系统性定位，改进也难沉淀成标准，现在基于数千条客观数据，复盘不再凭感觉。</>}>
        <SolCompare rows={[
          {
            before: <><b>凭印象与经验</b>：凭印象与个人经验复盘，反复出现的问题难被系统定位，改进也难沉淀。</>,
            after: <><b>基于客观数据</b>：基于数千条客观数据聚类复盘，优化结论自动写成新的服务标准。</>,
          },
        ]} />
      </SolSection>

      <SolSection id="flow" title="全量数据进来，复盘与回灌出去" split
        sub="聚类分析把零散问题归并成可改进的几条。">
        <SolSteps items={flow} />
        <SolAside
          meta="↻ 回灌服务设计"
          title="验证过的改进，写回标准"
          body="服务优化的结论不停在报告里。它会被写回服务设计的基线，让下一轮设计从更好的起点开始。系统自动把优化变成新的服务标准。"
        />
      </SolSection>

      <SolSection title="月度复盘报告界面" tone="mist">
        <SolFigure ui src="/images/agent-optimization.png" alt="服务优化 Agent 界面" w={3328} h={1638}
          caption="汇总质检与运营数据，找出反复出现的问题，把改进写回服务标准。" />
      </SolSection>

      <SolSection title="背后是这些产品模块">
        <SolCols items={mods} />
      </SolSection>

      <SolSection title="服务优化是收尾，也是新一轮的起点" tone="mist" split
        sub="它把验证过的改进回灌服务设计，标准就此持续进化。">
        <SolLoop nodes={loop} current={3} tail="↻ 回灌服务设计" />
        <SolMore><Link href="/agents">了解 FMClaw 的 Agentic AI 产品套件</Link></SolMore>
      </SolSection>

      <SeoFaq
        heading="关于服务优化 Agent，你可能想问"
        serviceName="服务优化 Agent"
        serviceDesc="汇总质检与运营数据，聚类定位高频问题，把改进写回服务标准。"
        items={[
          { q: "没有积累过质检数据的项目能用吗？", a: "能，但要先跑一段。服务优化吃的是质量评估与运营管理产出的数据，一般先跑一到两个月积累数据，再做第一轮聚类分析。" },
          { q: "AI 给的改进建议靠谱吗，会不会是正确的废话？", a: "建议都带数据依据：高频问题 Top5、问题环节定位、根因关联，每一条都能点开看到背后的具体工单与照片；采不采纳、怎么改，由人决定。" },
          { q: "改进怎么回到服务标准里，靠人手工改吗？", a: "由人确认、系统落地。采纳的改进直接更新到服务设计的标准配置，下一轮工作流自动按新标准执行。这正是四个 Agent 环节相接的意义。" },
        ]}
      />

      <SolEnd
        title={["把一个月的真实数据，跑一次服务优化"]}
        sub="带上你的质检数据来，看 AI 怎么找出高频问题。"
        alt={<>复盘的数据从六类工作流里来，见 <Link href="/insights/ai-applications-and-solutions-in-property-management">应用与解决方案全览</Link></>}
      />
    </SolPage>
  );
}
