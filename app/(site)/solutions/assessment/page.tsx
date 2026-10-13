import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import { SolPage, SolHero, SolSection, SolSteps, SolCols, SolShots, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/assessment", {
  title: "质量评估 Agent · 智能体解决方案 | 启盟科技",
  description:
    "质量评估 Agent 用 AI 替代人工审图质检：一线只需拍照，AI 自动识别问题、客观评分，严重问题自动调度整改，评估结果留存为数据标签助力复盘。",
});

const feats = [
  { title: "AI 自动审图", body: "AI 替代人工审图，审图成本大幅下降，质检不再靠人海堆。" },
  { title: "客观评分", body: "统一标准客观打分，消除甲乙方在质量评价上的分歧。" },
  { title: "数据可复盘", body: "每次评估留下数据标签，问题可追溯、可复盘，沉淀成资产。" },
];

const flow = [
  { meta: "输入", title: "一线只需拍照", body: "主管按 AI 指引到风险点位，拍照上传：不用填表、不用判断。" },
  { meta: "处理 · AI", title: "识别问题并客观评分", body: "AI 自动识别问题、按统一标准客观评分；问题严重时，自动调度人员整改。" },
  { meta: "输出 · 存证", title: "结果回灌复盘", body: "评分与问题留存为数据标签，回灌质量复盘与考核，过程可追溯。" },
];

const mods = [
  { title: "设备管理系统", body: "人单合一的拍照抄表，现场数据随手就记下。", href: "/products/fmclaw" },
  { title: "多模态巡检", body: "AI 视觉 + IoT 联合巡检，风险点位自动识别。", href: "/products/fmclaw" },
  { title: "小智帮手", body: "一线移动端智能助手，拍照即评。", href: "/products/fmclaw" },
];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="质量评估 Agent"
        title={["质检这件事，", "交给 AI 来审"]}
        lead={<>质量评估 Agent 用 AI 替代人工审图：一线只需拍照，<b>AI 客观评分、自动整改</b>，把质检从人海战术变成可追溯的数据。</>}
        secondary={{ href: "#flow", label: "看它怎么工作" }}
        proof={["AI 自动审图", "客观评分", "数据可复盘"]}
        image={{ src: "/solutions/qa-hero.jpg", alt: "主管在洗手间入口用手机拍下洗手台，交给 AI 识别评分（场景示意）" }}
      />

      <SolSection title="让质检不再靠人海，也不再各执一词" tone="mist" split
        sub={<>人工审图慢、成本高，甲乙方还常常在评价上扯皮。质量评估 Agent 用 AI 替代人工审图，<b>客观评分、有据可复盘</b>，把质检做成一件标准、可信的事。</>}>
        <SolSteps items={feats} />
      </SolSection>

      <SolSection id="flow" title="拍张照进来，评分和整改出去" split
        sub="一线只管拍照，识别、评分、整改调度都由 AI 接手。">
        <SolSteps items={flow} />
        <SolVerdict>一线只管拍照，识别、评分、整改 AI 接手</SolVerdict>
      </SolSection>

      <SolSection title="质量评估 Agent 的系统图" tone="mist">
        <SolShots items={[
          { src: "/images/qa-app.jpg", alt: "AI 巡查助理 · 一线拍照打分", caption: "一线现场端：拍照即打分，巡检无压力。", w: 1080, h: 2373 },
          { src: "/images/qa-system.png", alt: "质量评估 Agent 系统图", caption: "从拍照采集到 AI 识别评分、自动整改与数据留存的完整链路。", w: 1345, h: 1640 },
        ]} />
      </SolSection>

      <SolSection title="背后是这些产品模块">
        <SolCols items={mods} />
        <SolMore><Link href="/agents">查看从设计到优化的智能体管理闭环</Link></SolMore>
      </SolSection>

      <SeoFaq
        heading="关于质量评估 Agent，你可能想问"
        serviceName="质量评估 Agent"
        serviceDesc="AI 自动审图识别问题、客观评分，严重问题自动调度整改。"
        items={[
          { q: "一线员工需要培训多久才会用？", a: "几乎不需要培训。一线只做一件事：按 AI 指引到点位拍照上传，不用填表、不用判断；识别、评分、调度整改都在后台自动完成。" },
          { q: "AI 评分和人工评分不一致时听谁的？", a: "听人的，但要留记录。AI 评分可以被人复核改判，改判本身会成为校准数据，让评分标准越用越贴合项目实际。" },
          { q: "评估结果能接到现有的考核体系里吗？", a: "能。评分与问题标签是结构化数据，可以按项目、班组、个人维度汇总导出，对接到你现有的考核表或 BI 报表。" },
        ]}
      />

      <SolEnd title={["把一次真实的质检，交给 AI 审一遍"]} sub="从你的一个真实业务开始。" />
    </SolPage>
  );
}
