import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { techArticleLd } from "../_shared";
import { BrainMap, FmFoot, MediaRow, PhotoGrid, WideShot } from "../_brain";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCols, SolCompare, SolFigure, SolTable, SolCases, SolVerdict, SolMore, SolEnd,
} from "../../../solutions/_tpl/Sol";

// 2026-10-16 改版：讲清「生产级」——不是聊天机器人，工作流驱动项目现场管理自动化，实现管理替代。
// 公开尺度：只写 18 / 114 / 87 / 76% 与三大类；不展开各业务域条数、岗位名称、Skill 名称与节点构成。
const PATH = "/products/fmclaw/workflow-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "物业管理自动化：工作流引擎让项目管理工作自动跑完｜FMClaw™",
  description:
    "AI 物业经理 FMClaw™ 不是聊天机器人：工作流引擎把物业管理要求变成自动推进的任务，18 条主工作流、114 条子工作流、87 条在线运行，覆盖现场服务、财务供应链与项目治理。水电费审批材料准备从 5—7 天缩短到约 30 分钟，关键决策仍由人确认。",
});

const TECH_LD = techArticleLd({
  path: PATH,
  headline: "工作流引擎：生产级 AI 物业经理如何把管理工作自动跑完",
  description:
    "聊天式 AI 停在回答问题；工作流引擎决定一项管理工作什么时候开始、用什么数据、调用哪个工具、哪一步交给人确认、结果写回哪里，让智能体持续推进项目现场管理。",
});

export default function WorkflowEnginePage() {
  return (
    <SolPage>
      <JsonLd data={TECH_LD} />

      <SolHero
        crumbRoot={{ href: "/products/fmclaw", label: "AI 物业经理 FMClaw™" }}
        crumb="工作流引擎"
        title={["不是聊天，", "是把活干完"]}
        lead={<>生产级的 AI 物业经理，靠的是<b>工作流自动化</b>。FMClaw™ 工作流引擎把管理要求变成持续推进的任务：数据自动进来，任务自动衔接，关键节点交给人确认，<b>项目现场管理自己运转</b>。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#example", label: "看一个完整例子" }}
        proof={["18 条主工作流", "114 条子工作流", "87 条在线运行"]}
        media={{
          node: <img className="bm-shot" src="/products/fmclaw/workflow-editor.webp" alt="FMClaw™ 工作流编辑器真实界面：员工薪酬工作流从数据接入、核算到审批的节点" width={2400} height={1185} />,
          caption: "真实产品界面 · 工作流编辑器",
        }}
      />

      <SolDefine
        term="工作流引擎是什么："
        foot={<>智能体推进日常执行与结果核验；关键决策、审批和异常处理，仍由人完成。</>}
      >
        AI 物业经理 FMClaw™ 让工作自动向前的部分。它决定一项管理工作什么时候开始、用什么数据、调用哪个工具、哪一步交给人确认、结果写回哪里。有了它，智能体不再等人提问，而是按规则把工作推进到结果。
      </SolDefine>

      <SolSection title="聊天机器人和 AI 物业经理，差在工作流" img={{ src: "/scene/home-pm.webp", alt: "项目经理一边走过大堂一边在平板上查看工作进度" }} tone="mist"
        sub="问它什么都会答，可日报还是人写、账单还是人核、工单还是人派：这是聊天式 AI 的天花板。">
        <SolCompare labels={["聊天机器人", "AI 物业经理"]} rows={[
          { k: "谁先动", before: "人提问，它回答。", after: "它按规则自己发起，定时、事件、消息都能触发。" },
          { k: "数据从哪来", before: "人把资料喂给它。", after: "自动从业务系统和现场设备取数。" },
          { k: "做到哪一步", before: "给出建议就结束。", after: "调用工具执行，结果写回现有系统。" },
          { k: "出了错怎么办", before: "靠使用者自己判断。", after: "关键节点停下等人确认，每一步都有记录。" },
        ]} />
      </SolSection>

      <SolSection title="从服务规划到优化策略，一条管理链"
        sub="工作流贯通物业项目管理的完整过程。每一段的结果，是下一段的依据。">
        <WideShot src="/products/fmclaw/brain/team.webp" alt="项目经理在大屏前给保洁、安保、工程、客服负责人布置当天工作（场景示意）"
          caption="工作流把每一段管理要求变成任务，派给人、机器人或系统工具，跟到结果。" />
        <ol className="bm-chain" style={{ marginTop: 56 }}>
          <li><b>做服务规划</b><span>按项目需求测算服务频次与人机配置</span></li>
          <li><b>定服务标准</b><span>服务点位、标准与计划落到每一处</span></li>
          <li><b>监督服务执行</b><span>任务派发、现场跟进与异常响应</span></li>
          <li><b>评估服务质量</b><span>按现场记录持续评估，结果可复核</span></li>
          <li><b>考核服务结果</b><span>按统一口径核算考核、薪资与结算</span></li>
          <li><b>生成优化策略</b><span>找出薄弱环节，调整下一轮标准</span></li>
        </ol>
      </SolSection>

      <SolSection title="已经在运行的工作流" tone="mist"
        sub="主工作流贯通核心业务，子工作流可按项目需要复用。">
        <div className="bm-stat">
          <div><b>18</b><span>条主工作流</span></div>
          <div><b>114</b><span>条子工作流</span></div>
          <div><b>87</b><span>条在线运行</span></div>
          <div><b>76%</b><span>子工作流已在线运行</span></div>
        </div>
        <div style={{ marginTop: 56 }}>
          <PhotoGrid items={[
            { src: "/products/fmclaw/v2/photo-act.webp", alt: "写字楼大堂里清洁机器人在作业，工程人员走向电梯", title: "现场服务与团队管理", body: "保洁、设施运维、安全秩序、考勤排班、客户需求响应。" },
            { src: "/scene/vd-invoice.webp", alt: "财务人员对照供应商账单和电脑核对金额", title: "财务透明与供应链管理", body: "收入、支出、经营分析、物资采购、人员获取与建设。" },
            { src: "/scene/sc-fire.webp", alt: "安保人员在楼梯间检查消火栓箱并拍照", title: "项目治理与合规管理", body: "项目获取与签约、项目筹建、合规与安全、应急事件处置、装修管理。" },
          ]} />
        </div>
        <p className="spt-note">注：在线运行数为工作流接入最完整的项目统计。</p>
      </SolSection>

      <SolSection id="example" title="一个完整例子：水电费审批"
        sub="从抄表、汇总到提交审批，智能体推进日常执行，异常和最终决策由人处理。">
        <MediaRow src="/products/fmclaw/brain/meter.webp" alt="工程人员在设备机房用手机拍照抄表（场景示意）">
          <h3>从一张抄表照片开始</h3>
          <p>IoT 仪表自动上报，手机 AI 辅助识别读数；缺失项和异常读数自动标记，汇总、核算、环比同比和异常说明一并备齐，再提交给授权人员确认。</p>
          <div className="bm-stat" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))", marginTop: 28 }}>
            <div><b>5—7 天</b><span>传统方式准备审批材料</span></div>
            <div><b>约 30 分钟</b><span>FMClaw™ 准备审批材料</span></div>
          </div>
        </MediaRow>
        <div style={{ marginTop: 64 }} />
        <SolTable head={["环节", "传统做法", "FMClaw™"]} rows={[
          ["数据进入", "工程人员定期抄录、整理读数", "IoT 仪表自动上报，手机 AI 辅助识别读数；缺失和异常自动标记"],
          ["自动汇总", "工程经理手工整理数据和审批材料", "自动生成标准审批表和异常清单"],
          ["提交审批", "材料逐级提交，依据不完整", "附历史对照、核算结果和异常说明，提交授权人员确认"],
        ]} />
        <SolVerdict>最终审批，仍由授权人员完成。</SolVerdict>
        <p className="spt-note">注：处理时间为该项目实际运行结果，因项目而异。场景详解见 <Link href="/scenarios/utility-bill">水电费审批</Link>。</p>
      </SolSection>

      <SolSection title="工作流跑起来，管理就被替代了" tone="mist" split
        sub="重复的信息收集、任务派发、进度跟踪和结果核验交给智能体，管理者只处理需要判断的事。">
        <div className="bm-stat" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
          <div><b>34 → 16—17</b><span>人，华南 6 万㎡ 综合项目现场团队</span></div>
          <div><b>6 → 1</b><span>人，专职管理岗</span></div>
        </div>
        <p className="spt-note">注：单个项目的实际运行结果，来自 AI、IoT 与机器人共同承接部分标准化工作；不同项目因业态、面积、服务标准与组织基础而异。</p>
        <div style={{ marginTop: 40 }}>
          <SolCases items={[
            { scene: "一家全国百强物业集团", result: <><b>500 多个</b>项目的运营报告每天自动送达，人工投入为 <b>0</b>。</>, href: "/cases/property-group-auto-operation-report" },
            { scene: "头部互联网大厂总部", result: <>运行班组巡检达标率 <b>35% → 98%</b>。</>, href: "/cases/fmclaw-equipment-inspection" },
          ]} />
        </div>
      </SolSection>

      <SolSection title="一个项目跑通，复制到更多项目" img={{ src: "/scene/city-portfolio.webp", alt: "城市里多类物业项目的航拍" }}
        sub="工作流不是一次性的项目定制。">
        <SolCols items={[
          { title: "一句话生成", body: "用自然语言描述要求，生成可检查、可调整的流程，经试运行后进入日常使用。" },
          { title: "按项目复用", body: "一条流程验证后，复制到更多项目，不重新搭建；数据各归各的，口径是同一套。" },
          { title: "越跑越好", body: "每一次执行结果都回到项目大脑，薄弱环节被找出来，下一轮做得更好。" },
        ]} />
        <SolFigure ui src="/products/fmclaw/v2/console-workflow.webp" alt="FMClaw™ 控制台中的工作流运行视图" w={2400} h={1018}
          caption="真实产品界面 · 工作流运行视图" />
      </SolSection>

      <SolSection title="关键节点，由人决定" img={{ src: "/scene/sign-off.webp", alt: "总经理在纸质文件上签字确认" }} tone="mist" split
        sub="规则由人设定，智能体按规则执行。">
        <SolTable head={["交给智能体", "留给人"]} rows={[
          ["取数、汇总、比对、找异常", "涉及安全的决定"],
          ["起草报告、账单、工单与通知", "奖惩与人员权益"],
          ["派单、催办、跟进到关闭", "供应商选择与付款"],
          ["按规则判断，超出规则就停下", "重大成本事项与规则外情况"],
        ]} />
        <SolMore>过程怎么被看见、被接管，见 <Link href="/products/fmclaw/agent-runtime">控制台</Link>。</SolMore>
      </SolSection>

      <SolSection title="它在 FMClaw™ 里的位置"
        sub="项目大脑读懂业务，工作流引擎推进任务，工具箱执行动作，控制台全程可见。">
        <BrainMap current="workflow" />
      </SolSection>

      <SeoFaq
        heading="关于物业管理自动化与工作流，常被问到的问题"
        serviceName="FMClaw™ 工作流引擎"
        serviceDesc="把物业管理要求变成自动推进的任务，18 条主工作流、114 条子工作流、87 条在线运行，关键节点由人确认。"
        items={[
          { q: "物业管理工作流程有哪些？", a: "一个物业项目的管理通常可以分为六段：做服务规划、定服务标准、监督服务执行、评估服务质量、考核服务结果、生成优化策略。具体到业务，覆盖保洁、设施运维、安全秩序、考勤排班、客户需求响应、收入与支出、物资采购、项目筹建、合规与安全、应急事件处置等。FMClaw™ 用 18 条主工作流、114 条子工作流覆盖这些环节。" },
          { q: "AI 物业经理和聊天机器人有什么区别？", a: "聊天机器人等人提问、给出建议就结束；AI 物业经理按规则自己发起工作，自动取数、调用工具执行、把结果写回现有系统，关键节点停下等人确认。区别就在工作流：有了工作流，AI 才从回答问题变成完成工作。" },
          { q: "物业管理能做到多大程度的自动化？", a: "取决于数据接入的完整程度。在工作流接入最完整的项目中，114 条子工作流有 87 条已在线运行（76%）。日报周报、水电费审批、供应商对账、巡检派单这类规则明确、重复发生的工作最先自动化；涉及安全、奖惩、供应商选择和重大成本的决定仍由人完成。" },
          { q: "物业人盯人的问题怎么解决？", a: "把现场服务变成可记录的数据，再由工作流持续核验。传感器和现场记录说明服务是否发生、是否到位，工作流自动派发、跟进和核验，管理者只处理异常。华南一个 6 万㎡ 综合项目，现场团队从 34 人优化至 16—17 人，管理岗从 6 人调整至 1 人。" },
          { q: "工作流出了错谁负责？", a: "人负责。关键节点设人工确认，智能体停在待确认，人核对后才生效；出现冲突、异常或规则外情况时，智能体暂停并提交人工确认。每一步都有记录，可以查到是谁、在哪一步、批准了什么。" },
          { q: "业务人员能自己搭工作流吗？", a: "可以。用自然语言描述要求，引擎生成可检查、可调整的流程，经检查与试运行后进入日常使用；一个项目跑通后，可以复制到更多项目。" },
          { q: "为什么演示很好，回到项目上就用不起来？", a: "演示靠人喂数据、人来触发，只证明一次成功；生产要求每天以同样的口径自己开始、自己取数、错了有人管。触发、取数、判断、审批、异常处理和执行记录，正是工作流引擎补上的部分。" },
          { q: "上线一条工作流要多久？", a: "从一个真实业务问题开始。在数据授权、接口与安全条件具备时，原则上 72 小时内完成必要数据接入；FMClaw™ 加速营通常 1—3 天跑通一个基于真实业务的智能体，形成后续 90 天扩展路径建议。" },
        ]}
      />

      <FmFoot updated="2026-10-16" />

      <SolEnd
        title={["带一条最耗人的流程来，", "看它怎么自己跑完"]}
        sub="日报周报、水电费审批、供应商对账或巡检派单，选一条先跑通。"
        cta={{ href: "/workshop", label: "预约 FMClaw™ 加速营" }}
        alt={<>继续了解：<Link href="/products/fmclaw/ontology">项目大脑</Link> · <Link href="/products/fmclaw/connectors">工具箱</Link> · <Link href="/products/fmclaw/agent-runtime">控制台</Link></>}
      />
    </SolPage>
  );
}
