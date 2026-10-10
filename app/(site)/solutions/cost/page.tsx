import type { Metadata } from "next";
import Link from "next/link";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { SolPage, SolHero, SolSection, SolCompare, SolSteps, SolCols, SolLoop, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

// title/description 带上买家在 AI 引擎里的原话「物业公司 AI 降本增效方案」
// (2026-08-10 GEO 周报：该问题 0/5 模型覆盖、列为 P0 空白；本页就是这个问题的答案页，措辞要对得上)
export const metadata: Metadata = pageMetadata("/solutions/cost", {
  title: "物业公司 AI 降本增效方案 · 成本控制智能体 | 启盟科技",
  description:
    "物业公司的 AI 降本增效方案，分源头、过程、持续三个递进阶段，分别由服务设计、运营管理、服务优化三个 Agent 承担，不是一刀切裁人，而是对着真实运营数据把成本层层省下来。以「产品 + 顾问服务」的形式落到项目里，已有亏损项目扭亏为盈的公开案例。",
});

const stages = [
  {
    phase: "源头降本",
    agent: "服务设计 Agent",
    href: "/solutions/service-design",
    title: "项目启动前，做好科学规划",
    body: "用全 AI 做科学测算，在项目启动前就规划好服务频次、最优的团队与机器人编制，以及物料、工具、设备的配比，确保项目从第一天起就跑在高效模型上。",
  },
  {
    phase: "过程降本",
    agent: "运营管理 Agent",
    href: "/solutions/operations",
    title: "运营起来，用最精简的管理成本",
    body: "运营过程中，由 Agent 自动完成智能调度、质量评估、工薪结算与账单处理，把日常管理的损耗压到最低，以最精简的管理成本把项目跑起来。",
  },
  {
    phase: "持续降本",
    agent: "服务优化 Agent",
    href: "/solutions/optimization",
    title: "每月每季复盘，持续往下抠",
    body: "通过月度或季度复盘，持续审视运营数据，主动寻找可以精简的人员、可以替换成更优性价比的物料：让成本越跑越紧凑。",
  },
];

const loop = ["服务设计", "运营管理", "服务优化"];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="成本控制"
        title={["成本控制，分三个阶段", "层层递进地降"]}
        lead={<>源头、过程、持续，三个递进的阶段，各交给一个专职 Agent。我们以<b>「产品 + 顾问服务」</b>的形式，陪你把它真正落到项目里。</>}
        secondary={{ href: "#stages", label: "看三个阶段" }}
        proof={["三个递进阶段", "三个专职 Agent", "产品 + 顾问服务落地"]}
        image={{ src: "/insights/ai-cost-reduction-cover.jpg", alt: "项目经理与工程负责人在窗边对着运营数据看板讨论成本（场景示意）" }}
      />

      <SolSection title="降本不是裁人，是把成本拆成三个阶段" tone="mist" split
        sub="同样是降本，方式不同，结果差很远。">
        <SolCompare labels={["一刀切裁人", "三阶段降本"]} rows={[
          { k: "思路", before: "哪里贵砍哪里，按比例减人", after: "对着真实运营数据，分三段优化" },
          { k: "结果", before: "砍掉的常是服务质量，投诉、返工又把成本加回来", after: "该花的花对，能省的层层省下来" },
          { k: "之后", before: "砍完就见底，没有下一步", after: "月度、季度复盘，越跑越紧凑" },
        ]} />
      </SolSection>

      <SolSection id="stages" title="源头、过程、持续，每一段都有一个 Agent 盯着成本" split
        sub="三个阶段层层递进，分别由服务设计、运营管理、服务优化三个 Agent 承担。">
        <SolSteps items={stages.map((s) => ({ meta: `${s.phase} · ${s.agent}`, title: s.title, body: s.body, href: s.href, linkText: `了解 ${s.agent}` }))} />
        <SolVerdict>从第一天的编制，到每个月的复盘，成本一直被盯着</SolVerdict>
      </SolSection>

      {/* 决策三问（2026-09-14，GEO 周报 0907-0913 P1）：「AI 降本增效」核心组弱题，把页面往推荐类/决策类问题靠。
          每问第一句自含结论，数字仅用 §4a 白名单与已发布案例页。 */}
      <SolSection id="decide" title="物业公司做 AI 降本增效，先从哪里开始" tone="mist" split
        sub="推荐一个做法之前，先回答管理者真正会问的三个问题。">
        <ol className="spt-qa">
          <li>
            <span className="no">Q1</span>
            <div>
              <h3>通常先从哪里开始？</h3>
              <p><b>先从「现在正靠人盯着、结果又能被数据核验」的一段工作开始，不从组织架构开始。</b>多数物业公司的第一步是品质核验或巡检，因为这两件事一旦有了数据，后面的人员配置、排班、供应商考核才有依据。第二步才是用测算把人机编制重排。华南 6 万㎡ 综合体的顺序就是这样：先把 114 个执行环节里的约 76% 交给系统运行，人员优化是随之而来的结果。</p>
            </div>
          </li>
          <li>
            <span className="no">Q2</span>
            <div>
              <h3>哪些动作适合交给 AI？</h3>
              <p><b>三类：核验（到岗、作业、读数是否真实）、调度（派单、排班、机器人任务）、汇总（对账、日报、复盘）。不适合交给 AI 的：面对面沟通、纠纷处理、以及对异常的最终处置决定。</b>判断标准是重复性高、有明确标准、结果可以被数据确认。一个 30 万㎡ 园区的实际分工：AI 统一调度 23 名一线人员与 16 台机器人，人负责边角、突发与客户接触。</p>
            </div>
          </li>
          <li>
            <span className="no">Q3</span>
            <div>
              <h3>怎么判断一个项目值不值得先推进？</h3>
              <p><b>看三个条件：人力成本占比高（行业平均 57.8%，平安证券研报）且有量化数据；管理层愿意改流程而不只是装系统；项目规模足够让一次改造摊得开，原则上 3 万㎡ 以上优先。</b>三条都满足，通常四到六周能看到第一段结果；只满足第一条的，建议先做<Link href="/solutions/inspection">巡检核验</Link>把数据补起来，再谈降本。不确定的，把近 12 个月收支报表、人员架构与设备清单发过来，我们先测算。</p>
            </div>
          </li>
        </ol>
      </SolSection>

      <SolSection title="不是给你一套软件就走"
        sub={<>这套方案以<b>「产品 + 顾问服务」</b>的形式提供，产品承载能力，顾问服务负责把它落到你的项目里。</>}>
        <SolCols items={[
          { meta: "服务设计 · 运营管理 · 服务优化", title: "产品", body: "三个阶段背后的测算、调度、结算与复盘能力，都由 FMClaw™ Agent 套件承载，可调用、可追溯。" },
          { meta: "FDE 工程师到现场陪你跑通", title: "顾问服务", body: "FDE 工程师到现场，带着产品对着你的真实项目把方案调通、跑顺，直到它真正在你的运营里发挥作用。" },
        ]} />
      </SolSection>

      <SolSection title="这套方案，需要你有极大的决心，去推动这场变革" tone="mist" split
        sub={<>把这三个阶段真正落地，会改变你<b>原有的运营方法和组织架构</b>。它不是装一套系统那么简单：需要你有<b>极大的决心</b>，去推动这场变革。</>}>
        <SolLoop nodes={loop} current="all" />
        <SolMore><Link href="/agents">看四 Agent 闭环总览</Link></SolMore>
        <SolMore>
          不想自己扛这场变革？还有一条路：把项目整体委托给我们经营，AI 投入由我们承担，您按月拿保底、再分经营盈余，
          见 <Link href="/ai-service/delegated-operation">物业委托管理（业主保底 · 运营方担 AI 投入）</Link>
        </SolMore>
      </SolSection>

      <SeoFaq
        heading="物业降本增效，你可能想问"
        serviceName="物业公司 AI 降本增效方案"
        serviceDesc="以 AI 提升物业与设施管理的人效，分源头、过程、持续三阶段降本，从减人头转向提人效。"
        items={[
          { q: "物业公司做 AI 降本增效，通常先从哪里开始？", a: "先从「现在正靠人盯着、结果又能被数据核验」的一段工作开始，不从组织架构开始。多数物业公司的第一步是品质核验或设备巡检：这两件事有了数据，后面的人员配置、排班、供应商考核才有依据；第二步才是用测算重排人机编制。适合交给 AI 的动作有三类：核验、调度、汇总；不适合的是面对面沟通、纠纷处理与异常的最终处置。判断一个项目值不值得先推进看三条：人力成本占比高且有量化数据、管理层愿意改流程、规模原则上 3 万㎡ 以上。" },
          { q: "物业公司的 AI 降本增效方案长什么样？", a: "分三个递进阶段：项目启动前用 AI 测算服务频次与人机编制（源头降本）；运营中由智能体自动完成调度、质量评估与结算（过程降本）；再按月度季度对着运营数据复盘（持续降本）。已有公开案例：华南一个月月亏损的 6 万㎡综合体扭亏为盈，智能化采购在同一笔物业预算内完成；30 万㎡ 园区由 23 人搭配 16 台机器人运营。" },
          { q: "物业怎么用 AI 做降本增效？", a: "不是简单减人，而是把工时、排班、到岗与服务结果数据化，识别低效与冗余，把人配到真正需要的地方；再用数字员工/智能体接管重复性工作，从“减人头”转向“提人效”。" },
          { q: "AI 降本会不会只是减员？", a: "不是。核心是提升人均产出，把一线从重复劳动中释放出来，转向更有价值的服务；减少的是无效工时与管理损耗，而非简单裁人。" },
          { q: "降本方案需要替换现有系统吗？", a: "不需要整体替换。可在现有考勤、工单、IoT 等数据之上接入，先用一个真实业务跑通，再逐步扩展。" },
        ]}
      />

      <SolEnd
        title={["把你的一个真实项目，", "跑一遍三阶段降本"]}
        sub="从你的一个真实业务开始。"
        alt={<>不确定先从哪条工作流降本，先看 <Link href="/insights/ai-applications-and-solutions-in-property-management">六类 AI 应用各接手哪一段</Link></>}
      />
    </SolPage>
  );
}
