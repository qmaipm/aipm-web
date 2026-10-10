import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import { SolPage, SolHero, SolSection, SolCompare, SolSteps, SolCols, SolLoop, SolFigure, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/service-design", {
  title: "服务设计 · 智能体解决方案 | 启盟科技",
  description:
    "根据项目业态、面积、设备与需求，服务设计 Agent 自动建模，给出服务标准、人员编制和预算：每一笔都标着数据来源。约 30 分钟给出一版可讨论的方案底稿。",
});

const flow = [
  { meta: "输入", title: "项目基础信息", body: "业态、管理面积与楼栋、关键服务空间、主要设备清单；可选填现有人员合同与服务周期。" },
  { meta: "处理 · AI", title: "约 30 分钟自动建模", body: "调用行业知识与项目数据，完成服务标准制定、人员编制测算与预算拆解。" },
  { meta: "输出", title: "三份可执行方案", body: "服务标准体系、人员编制方案、预算明细表，每笔支出标注数据来源，可直接进入运营。" },
];

const mods = [
  { title: "空间管理系统", body: "承载业态、面积、楼栋与服务空间的结构化底数。", href: "/products/fmclaw" },
  { title: "服务配置系统", body: "服务标准与流程在此沉淀、复用与下发。", href: "/products/fmclaw" },
  { title: "API 开放平台", body: "方案数据可对接外部系统，标准不被锁在一处。", href: "/products/fmclaw" },
];

const loop = ["服务设计", "运营管理", "质量评估", "服务优化"];

export default function ServiceDesignPage() {
  return (
    <SolPage>
      <SolHero
        crumb="服务设计"
        title={["录入项目信息，", "输出一套可执行的", "服务方案"]}
        lead={<>根据项目业态、面积、设备与需求，服务设计 Agent 自动建模，给出<b>服务标准、人员编制和预算</b>：每一笔都标着数据来源。</>}
        secondary={{ href: "#flow", label: "看它怎么工作" }}
        proof={["服务标准", "人员编制", "预算明细", "约 30 分钟出底稿"]}
        image={{ src: "/insights/property-assessment-cover.jpg", alt: "从高处俯瞰一个办公园区的楼栋与中庭，服务方案从项目底数开始（场景示意）" }}
      />

      <SolSection title="从顾问的几天，缩到自动建模的半小时" tone="mist" split
        sub={<>服务标准制定、人员编制、预算测算，过去高度依赖<b>顾问经验</b>：一个项目要反复打磨很多天，做法还常常因人而异。</>}>
        <SolCompare rows={[
          {
            before: <><b>顾问经验驱动</b>：一个项目反复打磨很多天，结论还常因人而异。</>,
            after: <><b>真实数据建模</b>：基于真实数据建模，约 30 分钟给出一版可讨论的方案底稿。</>,
          },
        ]} />
      </SolSection>

      <SolSection id="flow" title="输入项目信息，输出三份方案" split
        sub="中间这段建模，过去是顾问的几天，现在交给 Agent。">
        <SolSteps items={flow} />
        <SolVerdict>过去依赖顾问经验的三件事，现在基于真实数据，半小时给出一版可讨论的底稿</SolVerdict>
      </SolSection>

      <SolSection title="方案生成界面" tone="mist">
        <SolFigure ui src="/images/agent-service-design.png" alt="服务设计 Agent 界面" w={3334} h={1644}
          caption="录入项目信息，自动生成一套可执行的服务方案。" />
      </SolSection>

      <SolSection title="背后是这些产品模块">
        <SolCols items={mods} />
      </SolSection>

      <SolSection title="服务设计是闭环的起点" tone="mist" split
        sub="它输出的标准会被运营管理每天执行，也会在末端被服务优化回灌改写。">
        <SolLoop nodes={loop} current={0} tail="↻ 回灌服务设计" />
        <SolMore><Link href="/agents">回到物业管理智能体矩阵</Link></SolMore>
      </SolSection>

      <SeoFaq
        heading="关于服务设计 Agent，你可能想问"
        serviceName="服务设计 Agent"
        serviceDesc="根据项目业态与需求自动建模，给出服务标准、人员编制和预算。"
        items={[
          { q: "30 分钟出的方案，能直接拿去投标吗？", a: "不建议直接投。它是一版可讨论的方案底稿，把从零开始的几天压成从底稿开始的几小时；经验判断与项目特殊性的调整，仍然由人完成。" },
          { q: "人员编制和预算的数据从哪来，可信吗？", a: "每一笔都标着数据来源。测算基于业态、面积、设备清单与行业基准数据，不是模型编造；觉得哪项不合理，可以逆着来源逐项核。" },
          { q: "我们自己的历史项目经验能喂进去吗？", a: "能。历史项目的编制、成本与服务标准可以作为企业自有基准接入，新方案优先参照你自己的数据，行业基准只做补位。" },
        ]}
      />

      <SolEnd title={["把一个真实项目，跑一次服务设计"]} sub="带上你的项目信息来，当场看它出方案。" />
    </SolPage>
  );
}
