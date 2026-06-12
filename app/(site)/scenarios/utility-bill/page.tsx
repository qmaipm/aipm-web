import Link from "next/link";
import BeforeAfter from "../BeforeAfter";
import "../scenarios.css";

export const metadata = {
  title: "物业水电费 AI 审批 · 抄表核对自动化 — FMClaw™ 加速营场景",
  description:
    "水电费审批从 4 个岗位 5–7 天压到半小时：AI 自动核表、做环比同比、标出异常，给出该签 / 不该签的依据，人只做最后确认。",
};

export default function Page() {
  return (
    <main className="scenario-page sc-amber">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal"><Link href="/workshop">FMClaw™ 加速营</Link> / 适用场景 / 水电费审批</div>
          <span className="eyebrow reveal">适用场景</span>
          <h1 className="reveal" style={{ marginTop: "18px" }}>水电费审批</h1>
          <p className="lead reveal">签字那一刻，AI 已核完表、做完环比同比、标好异常，并给出该签 / 不该签的依据。</p>
        </div>
      </section>

      {/* 使用前 / 使用后 */}
      <BeforeAfter
        metricBefore="4 个岗位 · 5–7 天"
        metricAfter="半小时审批"
        before={[
          { st: "抄表", h: "工程人员手工抄", p: "本子、手机、IoT 表各自记。", tag: "拖拉 · 漏抄 · 错抄" },
          { st: "汇总", h: "工程经理手工整理", p: "逐项拼成审批表。", tag: "能力参差 · 格式不一" },
          { st: "审批", h: "项目→区域→总监逐级签", p: "对着表凭经验签。", tag: "没依据 · 不知该签否" },
        ]}
        after={[
          { st: "抄表", h: "IoT 自动上报 + AI 识表", p: "手机 AI 识别仪表读数。", tag: "即时 · 准确" },
          { st: "汇总", h: "Agent 自动整理", p: "模型识别空置户与异常读数。", tag: "即时 · 已标注" },
          { st: "审批", h: "调「月度水电费核算」Skill", p: "环比同比、标异常，给出审批包。", tag: "有据可签" },
        ]}
        gains={[
          { k: "更轻松", b: "天天抄表、天天做表，领导对着空白表挠头", a: "抄表汇总全自动，只决定点不点发送" },
          { k: "更及时", b: "两三月一次汇总，租户欠费才发现", a: "IoT 即时上报，异常即时告警" },
          { k: "更高质量", b: "错签、漏签、被动签", a: "历史对照 + 异常标注，每个签字有依据" },
        ]}
      />

      {/* 简短说明 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">谁接了哪一步</span></div>
          <p className="note reveal">AI 接了核表、环比同比、找异常这几步繁重的活；人保留了最后那个"签不签"的决定。它不替换原有审批流程，只把判断需要的依据提前备好，让一次签字从凭经验变成有据可依。</p>
        </div>
      </section>

      {/* 收口 CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">想在你自己的数据上,<br />跑通这个场景?</h2>
          <p className="reveal">带上你的真实数据，来一次 FMClaw™ 加速营，当场把它跑通。</p>
          <div className="cta-row reveal"><Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>预约 FMClaw™ 加速营 →</Link></div>
        </div>
      </section>
    </main>
  );
}
