// app/(site)/company/master-plan/page.tsx
// 启盟的秘密蓝图（The Secret Master Plan）。内容来源：《让智能，走进物理世界：启盟的秘密蓝图》202609 版 PDF
// 与品牌愿景片 v4。官网只做提炼，不搬运全文；数字与 PDF、全站口径一致（爱物管在管 300 万㎡）。
import type { Metadata } from "next";
import Link from "next/link";
import "../page.css";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";
import VisionFilm from "@/components/VisionFilm";
import LoopClip from "@/components/LoopClip";

export const metadata: Metadata = pageMetadata("/company/master-plan", {
  title: "启盟的秘密蓝图：让智能走进物理世界的六步 | 启盟科技",
  description:
    "模型和机器人都在快速变强，缺的是一个能长期上岗的真实现场。启盟科技自 2017 年起把这条路拆成六步：把现场变成数据、自己开物业公司、让智能体参与管理、训练行业模型、让项目大脑获得身体、进入更多一线服务岗位。前三步已经完成。",
  keywords: ["启盟的秘密蓝图", "让智能走进物理世界", "项目大脑", "具身智能", "物理AI", "四足机器人", "行业模型", "启盟科技"],
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const steps = [
  { n: "01", st: "done", stl: "已完成", h: "把物业现场每天发生的事，变成可验证的数据",
    p: "2017 年起自研空间传感器与行为传感器，让保洁、巡检、维修是否发生，第一次有了记录。今天在线感知设备 10 万台以上，每天新增数据 6 亿条。",
    href: "/products/iot", go: "物理世界感知" },
  { n: "02", st: "done", stl: "已完成", h: "自己开一家物业公司，在真实经营中验证",
    p: "2019 年创办爱物管，51 个项目、在管 300 万㎡。管理层 5 人，对比同类公司 69 人；净利率 14%，对比 3.4%。",
    href: "/company/aipm-validation", go: "爱物管自营验证" },
  { n: "03", st: "done", stl: "已完成", h: "让智能体进入工作流，参与项目管理",
    p: "18 条主工作流、114 条子工作流，87 条已在线运行。智能体推进日常执行与结果核验，关键决策仍由人完成。",
    href: "/products/fmclaw", go: "FMClaw™ 平台" },
  { n: "04", st: "doing", stl: "正在做", h: "用真实任务与评测反馈，训练行业模型",
    p: "每次运行完整记录任务输入、判断、调用与结果，经系统校验与人工审核，沉淀为更懂物业的行业模型。",
    href: "/insights/industry-llm", go: "行业大模型" },
  { n: "05", st: "started", stl: "已启动", h: "让项目大脑进入四足，获得第一个物理分身",
    p: "清洁机器人 2022 年起批量在岗，16 台加 23 人覆盖 30 万㎡ 园区。现在，项目大脑正随四足机器人走进现场：跟随、巡查、值守。",
    href: "/products/robots", go: "机器人与智能装备" },
  { n: "06", st: "future", stl: "未来", h: "随人形机器人成熟，进入更多一线服务岗位",
    p: "同一个项目大脑，进入更适合复杂操作的身体，与一线人员组成 AI 协同服务团队。",
    href: "/partners/embodied-ai-data", go: "具身智能数据合作" },
];

export default function Page() {
  return (
    <main className="solcm mp">
      {/* HERO · 愿景片 */}
      <section className="mp-hero">
        <div className="wrap">
          <span className="cm-kicker">
            <Link href="/">启盟科技</Link><i>/</i><Link href="/company">关于我们</Link><i>/</i>秘密蓝图
          </span>
          <p className="cm-hero-en">The Secret Master Plan</p>
          <h1 className="mp-h1">启盟的秘密蓝图</h1>
          <p className="mp-lead">让智能，走进物理世界。自 2017 年，做同一件事。</p>
          <VisionFilm className="mp-film" />
        </div>
      </section>

      {/* 为什么是物业 */}
      <section className="cm-band">
        <div className="wrap">
          <h2 className="cm-h2">智能，还没有真正走进物理世界</h2>
          <p className="cm-sub">
            模型越来越聪明，但大部分能力仍停留在屏幕之内；机器人越来越能干，但要长期上岗，还需要清晰、稳定、持续发生的工作任务。
            <b>能力正在成熟，缺的是一个能长期上岗的地方。</b>
          </p>
          <dl className="mp-why">
            <div><dt>2.8 万亿元+</dt><dd>2025 年中国物业行业规模，一线岗位 2,400 万人</dd></div>
            <div><dt>每天都在发生</dt><dd>巡检、抽查、算薪、调度：高频、重复、可衡量，适合智能体持续推进</dd></div>
            <div><dt>长期作业的现场</dt><dd>清洁、巡检、安防任务持续发生，为机器人提供长期运行的真实空间</dd></div>
          </dl>
          <p className="mp-thesis">物业，正在成为 AI 走进真实业务的自然入口。</p>
        </div>
      </section>

      {/* 六步 */}
      <section className="cm-band mist" id="steps">
        <div className="wrap">
          <h2 className="cm-h2">我们把它拆成六步</h2>
          <p className="cm-sub">每一步的产物，是下一步的原料。前三步已经完成。</p>
          <LoopClip className="mp-clip" src="/master-plan/loop-plan.mp4" poster="/master-plan/loop-plan.webp" label="愿景片片段：秘密蓝图六步清单逐条打勾" />
          <ol className="mp-steps">
            {steps.map((s) => (
              <li className="mp-step" data-st={s.st} key={s.n}>
                <div className="mp-step__no"><b>{s.n}</b><span>{s.stl}</span></div>
                <div className="mp-step__body">
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                  <Link className="mp-step__go" href={s.href}>{s.go} <Arrow s={13} /></Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 愿景 */}
      <section className="mp-vision">
        <div className="wrap">
          <p className="mp-vision__k">从数据到大脑，从大脑到身体。</p>
          <h2 className="mp-vision__h"><span className="nb">让智能走进物理世界，</span><span className="nb">从物业现场开始。</span></h2>
          <p className="mp-vision__p">这条路很长，我们不打算一家走完。</p>
          <div className="mp-vision__cta">
            <Link href="/partners" className="btn btn-primary">成为伙伴 <Arrow /></Link>
            <Link href="/contact" className="btn btn-ghost">联系我们 <Arrow /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
