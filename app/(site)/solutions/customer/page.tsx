import type { Metadata } from "next";
import Link from "next/link";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { SolPage, SolHero, SolSection, SolCompare, SolCols, SolSteps, SolVerdict, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/customer", {
  title: "客户服务 · 智能体解决方案 | 启盟科技",
  description:
    "客服 Claw 住在群里，7×24 无间断、极速响应，记住每位业主的偏好，从省心、周到、主动、智能四个维度全面提升客户服务：自动汇总群聊舆情、@一句话发起工单、工单主动反馈、万事通问答。",
});

const dims = [
  { title: "省心", body: "群里 @ 一句话就发起工单，不用记流程、不用自己跑。" },
  { title: "周到", body: "记住每位业主的偏好，连情绪价值都照顾到。" },
  { title: "主动", body: "工单全程跟踪，进展主动同步，不用反复追问。" },
  { title: "智能", body: "多群聊天自动汇总、舆情分析，该上报的早一步发现。" },
];

const feats = [
  { meta: "智能", title: "群聊汇总 + 舆情分析", body: "自动汇总微信群、企微群、钉钉群、飞书群的聊天，做总结与舆情分析，该上报的早一步发现。" },
  { meta: "省心", title: "@ 一句话发起工单", body: "群里业主只需 @客服 Claw，用自然语言就能发起工单：不用记流程、不用填表。" },
  { meta: "主动", title: "工单主动反馈", body: "客服 Claw 全程跟踪工单执行，进展主动反馈给业主，不用反复追问。" },
  { meta: "周到", title: "万事通问答", body: "项目的管理制度、周边的服务，问客服 Claw 都能给出准确答案。" },
];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="客户服务"
        title={["客户的每一条诉求，", "都能即时接住"]}
        lead={<>我们在群里配一个<b>客服 Claw</b>：7×24 无间断、极速响应，记住每位业主的偏好，把一句话的诉求即时接住、落成动作。</>}
        secondary={{ href: "#claw", label: "看客服 Claw 能做什么" }}
        proof={["7×24 即时响应", "最懂业主的人", "省心 · 周到 · 主动 · 智能"]}
        image={{ src: "/ai-service/customer-hero.jpg", alt: "写字楼大堂里，服务人员一边看手机一边走向前台（场景示意）" }}
      />

      <SolSection title="把散在群里的诉求，接成即时接住的服务" tone="mist" split>
        <SolCompare labels={["过去", "客服 Claw"]} rows={[
          {
            before: <><b>诉求散在群里</b>：报修、账单疑问、催办散落在各个微信、企微、钉钉、飞书群里，容易遗漏、非标准化，服务质量没办法保障。</>,
            after: <><b>每一条都即时接住</b>：一个住在群里的助手，7×24 即时答复，把对话直接接成可追踪的动作，反馈沉淀成数据。</>,
          },
        ]} />
      </SolSection>

      <SolSection title="省心、周到、主动、智能，一起提上来"
        sub="不是只快一点，而是从这四个维度，把客户服务整体往上抬。">
        <SolCols items={dims} />
      </SolSection>

      <SolSection id="claw" title="最懂所有业主的人" tone="mist" split
        sub="7×24 无间断、极速响应，记住业主的所有偏好，还能提供情绪价值：一个真正住在群里的助手。">
        <SolSteps items={feats} />
        <SolVerdict>一个住在群里的助手，7×24 接住每一条诉求</SolVerdict>
      </SolSection>

      <SeoFaq
        heading="物业 AI 客服，你可能想问"
        serviceName="客户服务"
        serviceDesc="物业 AI 客服：7×24 处理高频咨询，释放人工坐席。"
        items={[
          { q: "物业费收缴率低，有什么 AI 解决方案？", a: "收缴率低多数不是缴费能力问题，而是缴费意愿问题，住户看不见服务真实发生，就不愿为它付钱。所以 AI 不应先做催缴，而是先接两段工作：把群里的报修与投诉自动成单、派单、跟到关闭（报事闭环，已发布案例从群消息到派单不到 1 分钟），把保洁、巡检每一次作业变成住户可查的记录（服务可见）；然后再做欠费分层提醒与附带服务记录的账单推送。已发布案例：华南某 6 万㎡ 综合体，约 76% 管理环节自动化后住户缴费率做到 99%（行业约 71%）。完整的五段分工、适合先做的项目特征见行业研究《物业费收缴率低，有什么 AI 解决方案？》。" },
          { q: "物业 AI 客服能处理哪些事？", a: "报修、咨询、投诉受理、缴费提醒等高频重复咨询可由 AI 客服 7×24 先行处理，复杂问题再转人工，缩短响应时间、释放客服坐席。" },
          { q: "AI 客服会取代人工客服吗？", a: "不会取代，而是分担。AI 接住重复咨询，人工转向需要判断力与情感链接的复杂场景与主动服务。" },
          { q: "接入 AI 客服需要多久？", a: "可从一个高频场景（如报修或缴费咨询）起步，在现有渠道（公众号 / 钉钉 / 飞书 / 企业微信）上接入，先跑通再扩展。" },
        ]}
      />

      <SolEnd
        title={["把你的一个真实群，", "接上客服 Claw"]}
        sub="从你的一个真实业务开始。"
        alt={<>想直接让爱物管来交付？看 <Link href="/ai-service/customer-service">AI 客服管家</Link> · 收缴率低怎么办？看 <Link href="/insights/ai-solution-for-low-property-fee-collection">AI 解决方案全文</Link> · 客服之外的五类应用，见 <Link href="/insights/ai-applications-and-solutions-in-property-management">应用与解决方案全览</Link></>}
      />
    </SolPage>
  );
}
