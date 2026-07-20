import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/scenarios/utility-bill", {
  title: "物业水电费 AI 审批 · 抄表核对自动化｜FMClaw™ 加速营场景",
  description:
    "水电费审批从 4 个岗位 5–7 天压到半小时：AI 自动核表、做环比同比、标出异常，给出该签 / 不该签的依据，人只做最后确认。",
});

export default function Page() {
  return (
    <main className="scenario-page scx">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / 水电费审批</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal">水电费审批</h1>
          <p className="lead reveal">签字那一刻，AI 已核完表、做完环比同比、标好异常，并给出该签 / 不该签的依据。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="4 个岗位 · 5–7 天"
        metricAfter="半小时审批"
        steps={[
          { name: "抄表", before: "工程人员拿本子、手机各自记，拖拉、漏抄、错抄。", after: "IoT 表自动上报，手机 AI 识别仪表读数。", tag: "即时 · 准确" },
          { name: "汇总", before: "工程经理手工拼成审批表，能力参差、格式不一。", after: "Agent 自动整理，模型识别空置户与异常读数。", tag: "即时 · 已标注" },
          { name: "审批", before: "项目→区域→总监逐级签，没依据、不知该签否。", after: "调「月度水电费核算」Skill，环比同比、标出异常。", tag: "有据可签" },
        ]}
        gains={[
          { k: "更轻松", b: "天天抄表、天天做表，领导对着空白表挠头", a: "抄表汇总全自动，只决定点不点发送" },
          { k: "更及时", b: "两三月一次汇总，租户欠费才发现", a: "IoT 即时上报，异常即时告警" },
          { k: "更高质量", b: "错签、漏签、被动签", a: "历史对照 + 异常标注，每个签字有依据" },
        ]}
        note={`AI 接了核表、环比同比、找异常这几步繁重的活；人保留了最后那个"签不签"的决定。它不替换原有审批流程，只把判断需要的依据提前备好，让一次签字从凭经验变成有据可依。`}
      />

      {/* 收口 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">想在你自己的数据上,跑通这个场景?</h2>
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link><Link href="/agents" className="btn btn-ghost">查看从设计到优化的智能体管理闭环</Link></div>
        </div>
      </section>
    </main>
  );
}
