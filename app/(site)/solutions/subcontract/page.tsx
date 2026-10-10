import type { Metadata } from "next";
import Link from "next/link";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { SolPage, SolHero, SolSection, SolCompare, SolNums, SolAside, SolSteps, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/subcontract", {
  title: "服务分包管理 · 智能体解决方案 | 启盟科技",
  description:
    "出勤、服务、质量考核不再靠人一项项算。系统在多维度上自动考核，支持飞书、钉钉、企微与原有业务系统的自定义数据源，AI 结合所有数据按你的规则，通过 FMClaw 工作流自动输出服务账单。",
});

const metrics = [
  { l: "出勤工时", v: "182 h" },
  { l: "在场工时", v: "176 h" },
  { l: "服务签到率", v: "98.6%" },
  { l: "工单及时结单率", v: "95.2%" },
  { l: "及时接单率", v: "97.4%" },
  { l: "服务质量评分", v: "4.6 / 5" },
];
const sources = ["飞书", "钉钉", "企微", "原有业务系统"];

const flow = [
  { meta: "账单规则", title: "理清账单规则", body: "梳理现有合同的内容：合同总额、人数要求、工时要求、考核项、考核规则等，把账单规则说清楚。" },
  { meta: "数据", title: "汇总所有数据", body: "多维度考核指标，加上飞书、钉钉、企微与原有业务系统的自定义数据源，全部汇总到一处。" },
  { meta: "输出", title: "自动出账单", body: "AI 按规则结合所有数据计算，通过 FMClaw 的工作流自动输出对应的服务账单。" },
];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="服务分包管理"
        title={["考核规则说清楚，", "账单 AI 自动出"]}
        lead={<>出勤、服务、质量考核不再靠人一项项算，自动计算考核结果数据，通过 FMClaw 工作流<b>自动输出服务账单</b>。</>}
        secondary={{ href: "#flow", label: "看它怎么算" }}
        proof={["多维度考核", "自定义数据源", "账单自动输出"]}
        image={{ src: "/cases/cover-reconciliation.png", alt: "外包保洁人员在开放办公区作业，过程数据自动计入考核（场景示意）" }}
      />

      <SolSection title="考核与账单，从一堆人手算到系统自动出" tone="mist" split>
        <SolCompare labels={["过去", "现在 · 系统 + AI"]} rows={[
          {
            before: <><b>考核全靠人算</b>：出勤数据、服务数据、质量考核都要人来做，统计周期长、易出错，得 5–6 个岗位的人协同才干得下来。</>,
            after: <><b>系统算，AI 出账单</b>：系统在多维度上自动考核，AI 结合所有数据按你的规则计算，通过 FMClaw 工作流自动输出服务账单。</>,
          },
        ]} />
      </SolSection>

      <SolSection title="考核维度，系统自动算"
        sub="系统内置多维度考核指标，覆盖出勤、在场、签到、接单、结单到质量评分。">
        <SolNums items={metrics} />
        <SolAside
          title="嵌入自定义数据源"
          body="需要更多维度？接入自定义数据源补充考核内容，覆盖到这些渠道："
          items={sources}
          href="/products/fmclaw/connectors#platforms"
          linkText="钉钉、飞书、企业微信怎么接，了解更多"
        />
        <SolMore>同一套考核数据，也支撑 <Link href="/solutions/quality">服务质量管理</Link> 与 <Link href="/solutions/payroll">人员薪酬管理</Link>。</SolMore>
      </SolSection>

      <SolSection id="flow" title="描述好规则，账单 AI 来出" tone="mist" split
        sub="AI 结合所有数据与考核，通过 FMClaw 的工作流，高效自动化地输出服务账单。">
        <SolSteps items={flow} />
        <SolVerdict>你只需把考核规则说清楚，账单 AI 自动出</SolVerdict>
      </SolSection>

      <SeoFaq
        heading="供应商管理与 OBC，你可能想问"
        serviceName="服务分包管理"
        serviceDesc="用 OBC 成果导向合约与过程数据，管好外包供应商。"
        items={[
          { q: "怎么管好物业的外包供应商？", a: "关键是从“数人头”转向“看结果”：用智能服务记录采集到岗、工时、达标等过程数据，按可衡量的成果（OBC 指标）对供应商考核、对账。" },
          { q: "什么是 OBC 成果导向合约？", a: "OBC(Outcome-Based Contracting)以可衡量的绩效成果作为合同要求与付费依据，而非人员编制数量；它给供应商创新激励，也让甲方买到确定的结果。" },
          { q: "供应商对账成本高怎么办？", a: "用过程数据自动统计替代手工收集与人情分，可显著降低对账成本与误差（公开案例中某用户对账成本减少约 260 人/天/月）。" },
        ]}
      />

      <SolEnd title={["把一次真实的分包考核，", "交给 AI 出账单"]} sub="从你的一个真实业务开始。" />
    </SolPage>
  );
}
