import type { Metadata } from "next";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { SolPage, SolHero, SolSection, SolSteps, SolCols, SolAside, SolVerdict, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/procurement", {
  title: "采购管理 · 智能体解决方案 | 启盟科技",
  description:
    "FMClaw 智能采购：服务设计阶段对物料科学测算自动生成清单，库存低于阈值自动触发采购，对接 1688、京东企业购多平台 AI 比价匹配，审批通过自动下单推送供应商，全程有记录、实时追踪到货。",
});

const pains = [
  { title: "需求识别低效", body: "物料需求无法提前预判，常出现临时紧急采购。" },
  { title: "采购决策不科学", body: "缺乏系统化的供应商比价机制，全凭经验拍板。" },
  { title: "流程长、易出错", body: "纸质单据流转效率低、容易出错；采购记录分散，难以追溯和审计。" },
];

const feats = [
  { title: "服务设计阶段科学测算", body: "项目启动时，用服务设计 Agent 对物料需求做全维度科学测算，自动生成最优物料清单。" },
  { title: "智能采购流程自动化", body: "自动需求识别，当库存低于安全阈值时，自动触发采购需求。" },
  { title: "智能比价与供应商匹配", body: "自动对接 1688、京东企业购等主流平台，AI Agent 检索匹配物料规格，多平台比价，推荐性价比最优方案。" },
  { title: "自动化审批与执行", body: "审批通过后自动生成采购订单、推送至供应商系统，全程有记录，实时追踪订单到货状态。" },
];

const agents = [
  { title: "服务设计 Agent", body: "源头物料测算", href: "/solutions/service-design", linkText: "了解 服务设计 Agent" },
  { title: "运营管理 Agent", body: "实时库存监控、自动触发采购需求", href: "/solutions/operations", linkText: "了解 运营管理 Agent" },
  { title: "采购管理 Agent", body: "智能比价、供应商匹配" },
];

const challenges = [
  { title: "组织架构调整", body: "传统采购岗位的职能需要重新定义。" },
  { title: "人员接受度", body: "一线人员需要适应自动化的新流程。" },
];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="采购管理"
        title={["从测算到下单，", "采购自动跑完"]}
        lead={<>物料需求难预判、比价不科学、审批流转慢又易错。FMClaw 让采购<b>从源头测算一路跑到自动下单</b>。</>}
        secondary={{ href: "#caps", label: "看四个能力" }}
        proof={["源头科学测算", "多平台自动比价", "审批执行自动化"]}
        image={{ src: "/solutions/pro-hero.jpg", alt: "库管员在物业物料库房用平板核对库存（场景示意）" }}
      />

      <SolSection title="采购的三个老问题" tone="mist"
        sub="需求拍脑袋、比价凭经验、单据满天飞。这是物业采购最常见的三处卡点。">
        <SolCols items={pains} />
      </SolSection>

      <SolSection id="caps" title="从科学测算，到自动下单" split
        sub="从源头把需求算对，到自动比价、自动审批执行，整条采购链路连续跑通。">
        <SolSteps items={feats} />
        <SolVerdict>从源头测算到下单，全程有记录、实时可追踪</SolVerdict>
      </SolSection>

      <SolSection title="背后是三个 Agent 协作" tone="mist">
        <SolCols items={agents} />
        <SolAside
          title="数据集成"
          body="对接 1688、京东企业购等采购平台 API，AI 自动检索、比价、下单。"
          items={["1688", "京东企业购"]}
        />
      </SolSection>

      <SolSection title="它会动到采购岗和现有习惯" split
        sub="采购自动化不止是上系统，落地要面对两件事：把话放在前面。">
        <SolSteps items={challenges} />
      </SolSection>

      <SeoFaq
        heading="采购管理，你可能想问"
        serviceName="采购管理"
        serviceDesc="用智能体把物业采购的申请、比价、审批、台账串起来。"
        items={[
          { q: "物业采购管理的痛点是什么？", a: "需求分散、比价与审批链路长、台账不清。用智能体把申请、比价、审批、台账串起来，可提速并全程有记录。" },
          { q: "AI 能帮物业采购做什么？", a: "自动归集需求、辅助比价与合规校验、跟踪审批进度，并把采购数据沉淀为可分析的台账。" },
          { q: "采购能和成本优化联动吗？", a: "可以。采购数据与成本、供应商考核打通后，能从源头控制成本，而不只是事后报销审核。" },
        ]}
      />

      <SolEnd title={["把一次真实的采购，", "从测算跑到下单"]} sub="从你的一个真实业务开始。" />
    </SolPage>
  );
}
