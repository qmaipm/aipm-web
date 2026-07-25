import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";

export const metadata = pageMetadata("/scenarios/repair-bot", {
  title: "AI 报修客服 · 7×24 守群自动派单｜FMClaw™ 加速营场景",
  description:
    "报修消息进群，平台 Bot 7×24 守群不漏单，FMClaw 自动派单不到 1 分钟，下单人与接单人双向通知，闭环可追溯。",
});

export default function Page() {
  return (
    <main className="scenario-page scx">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / 报修智能客服</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal">报修智能客服</h1>
          <p className="lead reveal">平台 Bot 7×24 守群不漏单，FMClaw 自动派单不到 1 分钟，下单人与接单人双向通知闭环。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="几十个群 · 人工守候"
        metricAfter="派单 < 1 分钟"
        steps={[
          { name: "守群", before: "客服盯几十个钉钉 / 飞书 / 企微群，分身乏术、遗漏。", after: "平台 Bot 7×24 守群，自动识别报修意图写入多维表。", tag: "不遗漏" },
          { name: "记单", before: "手工把对话抄成工单，慢、错单、字段不齐。", after: "FMClaw 拉多维表，生成标准化工单 + 现场照片。", tag: "即时 · 准确" },
          { name: "派单跟踪", before: "打电话找工程，做完再人工通知，链路长、没反馈。", after: "Skill 派单规则匹配，工具给下单人与接单人双向回执。", tag: "派单 < 1 分钟" },
        ]}
        gains={[
          { k: "不遗漏", b: "客服守不住几十个群，漏单", a: "平台 Bot 7×24 守群，一条不漏" },
          { k: "不延迟", b: "记单、派单、跟踪，链路长", a: "派单 < 1 分钟，自动通知" },
          { k: "有反馈", b: "客户无反馈，投诉升级", a: "下单人 + 接单人双向通知，闭环" },
        ]}
        note={`对话还在你原来的钉钉 / 飞书群里，AI 接的是"守群—接单—派单—通知"这一段；人只在派错或异常时介入。原有协作平台不替换，FMClaw 只补上业务闭环那一截。`}
        solutionHref="/solutions/operations"
      />

      <SeoFaq
        heading="关于报修智能客服，你可能想问"
        items={[
          { q: "业主在群里随口一句，Bot 真能听懂是报修吗？", a: "能识别绝大多数口语化表达，听不准时会在群里追问确认，而不是猜着派单。识别后生成的标准化工单会带上原始对话与现场照片，接单人能看到完整上下文。" },
          { q: "需要业主换 App 或小程序吗？", a: "不需要。业主还在原来的钉钉／飞书／企微群里说话，报修体验没有任何变化，变化发生在物业这一侧——不再需要人盯群。" },
          { q: "夜里三点的报修也能处理吗？", a: "能。Bot 7×24 守群，接单与派单不分时段；夜间派单规则可以单独配置，比如紧急工单直接呼叫值班工程，非紧急工单排到次日早班。" },
        ]}
      />

      {/* 收口 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">想在你自己的数据上,跑通这个场景?</h2>
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link><Link href="/agents" className="btn btn-ghost">查看四个行业智能体</Link></div>
        </div>
      </section>
    </main>
  );
}
