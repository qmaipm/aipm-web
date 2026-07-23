import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";

export const metadata = pageMetadata("/scenarios/reconciliation", {
  title: "物业 AI 对账 · 供应商自动核量对账｜FMClaw™ 加速营场景",
  description:
    "供应商对账：AI 按合同自动核量、对比历史与市场行情、圈出异常、生成账单草稿，人只做确认或驳回。",
});

export default function Page() {
  return (
    <main className="scenario-page scx">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / AI 对账</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal">AI 对账</h1>
          <p className="lead reveal">按合同自动核量、对比历史与市场、圈出异常、生成账单草稿，人只需确认或驳回。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="逐笔核对 · 好几天"
        metricAfter="当天对完 · 异常自动标"
        steps={[
          { name: "归集", before: "供应商、系统、台账各一份，口径不一。", after: "数据自动进数据集市，多源统一归集。", tag: "统一可查" },
          { name: "核量比价", before: "逐笔翻合同、比历史与市场，慢、易错。", after: "调账单核算 Skill 自动核量、比对历史与市场。", tag: "即时" },
          { name: "找异常", before: "靠人翻，月底汇总才发现，漏检。", after: "自动圈出异常并归因、生成账单草稿。", tag: "有据可依" },
        ]}
        gains={[
          { k: "更快", b: "月度对账要好几天", a: "数据归集即对，当天对完" },
          { k: "更准", b: "逐笔人工，口径常对不上", a: "同一份事实核对，圈出异常" },
          { k: "可追溯", b: "结论难还原依据", a: "草稿与异常都摆好，对账有据可依" },
        ]}
        note={`AI 接了核量、比对、找异常、起草这几步；人保留对账单的最终确认。它不替换财务流程，只把一份能直接看的草稿和被圈出的异常提前备好。`}
        solutionHref="/solutions/vendor"
      />

      <SeoFaq
        heading="关于 AI 对账，你可能想问"
        items={[
          { q: "AI 对账算错了谁负责？", a: "人负责。AI 只负责核量、比对、圈出异常和起草，账单的最终确认与付款审批始终由人完成；每一笔核算都能看到对应的合同条款与数据依据，可以逐笔复核。" },
          { q: "供应商那边的账和我们对不上怎么办？", a: "这正是它解决的问题。双方数据归集到同一份事实上核对，差异被自动圈出并标明原因，争议从「各说各话」变成「对着同一张异常清单逐条确认」。" },
          { q: "合同条款很复杂，AI 真能看懂吗？", a: "能处理常见的计量计价条款；特殊条款在接入时一次性梳理成核算规则，之后每月自动执行。规则本身可查可改，不是黑盒。" },
        ]}
      />

      {/* 收口 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">想在你自己的数据上,跑通这个场景?</h2>
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link><Link href="/agents" className="btn btn-ghost">物业管理智能体矩阵</Link></div>
        </div>
      </section>
    </main>
  );
}
