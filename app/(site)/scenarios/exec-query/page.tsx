import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";

export const metadata = {
  title: "管理层 AI 问询 · 能耗归因秒级回答 — FMClaw™ 加速营场景",
  description:
    "领导在钉钉 @ 一句问题，底层由 FMClaw 调数据、模型与 Skill 做能耗归因，秒级给出带原因的回答与简报，不换对话框。",
};

export default function Page() {
  return (
    <main className="scenario-page scx">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / 管理层问询</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal">管理层问询</h1>
          <p className="lead reveal">领导在钉钉里 @ 一句"A 楼上月能耗为什么超标"，AI 做能耗归因，秒级给出带原因的回答与简报。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="小时级到天级"
        metricAfter="一句话拿结果"
        steps={[
          { name: "提问", before: "领导问一句，层层转交给下面的人。", after: "领导在钉钉直接 @ Bot，还是那个常用对话框。", tag: "不换工具" },
          { name: "取数分析", before: "助理找工程经理导 Excel、比对历史、写说明，慢且数据陈旧。", after: "底层 数据→模型→Skill 做能耗归因，用户无感。", tag: "秒级" },
          { name: "答复", before: "助理口头转述结论，可能失真、解读不一。", after: "带异常明细的回答 + 简报回到对话框，可继续追问。", tag: "有原因 · 可动作" },
        ]}
        gains={[
          { k: "无学习成本", b: "要学新系统、新报表", a: "继续用钉钉 / 飞书，对话框还是那个" },
          { k: "不只是查询", b: "拿到一张还要自己解读的表", a: "带原因的结论，还能直接发起动作" },
          { k: "权限沿用", b: "数据谁能看靠人把关", a: "按钉钉 / 飞书的组织架构与 IAM" },
        ]}
        note={`问询入口仍是钉钉对话框，用户不换工具；AI 在底层把能耗归因做完。人拿到的是带原因的结论与简报，省掉了中间翻数据、做分析那几天。`}
      />

      {/* 收口 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">想在你自己的数据上,跑通这个场景?</h2>
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link></div>
        </div>
      </section>
    </main>
  );
}
