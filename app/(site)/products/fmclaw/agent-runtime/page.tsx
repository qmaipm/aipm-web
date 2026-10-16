import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { techArticleLd } from "../_shared";
import { BrainMap, FmFoot, MediaRow } from "../_brain";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCols, SolSteps, SolFigure, SolEnd,
} from "../../../solutions/_tpl/Sol";

// 2026-10-16 改版：名称保持「控制台」（大厂通行叫法）。定位：让管理者敢把核心业务交给 AI。
// 资料：PPT 202609 第 13、14 页（三项原则、三条边界、四个动作）；原文的记录类禁用词改写为「全程有记录」。
const PATH = "/products/fmclaw/agent-runtime";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "控制台：智能体权限、运行监控、审计与人工接管｜FMClaw™",
  description:
    "FMClaw™ 控制台让智能体进入核心业务后始终看得见、管得住：查看每个智能体的运行状态，关键节点由授权人员确认，随时暂停、驳回或接管，全部操作可追溯。项目隔离、按岗位授权，服务品质优先、成本效率其次、考核公平可复核。",
});

const TECH_LD = techArticleLd({
  path: PATH,
  headline: "控制台：智能体的权限、运行、审计与人工接管",
  description:
    "控制台是 AI 物业经理 FMClaw™ 管理智能体如何工作的地方：每个智能体在执行什么任务、运行到哪一步、是否等待人工确认，都可查看；关键节点由授权人员确认，可以暂停、驳回或接管，全部操作可追溯。",
});

export default function AgentRuntimePage() {
  return (
    <SolPage>
      <JsonLd data={TECH_LD} />

      <SolHero
        crumbRoot={{ href: "/products/fmclaw", label: "AI 物业经理 FMClaw™" }}
        crumb="控制台"
        title={["每一步看得见，", "关键节点由人决定"]}
        lead={<>智能体进入核心业务，靠的不是它足够聪明，而是<b>运行始终看得见、管得住</b>。在控制台里，每个智能体在做什么、到了哪一步、是否在等人确认，一眼看全；<b>随时可以暂停、驳回或接管</b>。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#four", label: "看控制台做哪四件事" }}
        proof={["运行状态一处看全", "关键节点人确认", "随时暂停或接管", "全部操作可追溯"]}
        image={{ src: "/products/fmclaw/brain/console-hero.webp", alt: "项目经理在写字楼走廊里用平板查看并确认一项待审批事项（场景示意）" }}
      />

      <SolDefine
        term="控制台是什么："
        foot={<>名称沿用主流 AI 平台的叫法：智能体的权限、运行与审计，统一在控制台里管理。</>}
      >
        AI 物业经理 FMClaw™ 管理智能体如何工作的地方。智能体像员工一样有归属、有岗位、有权限边界；它们的运行状态、待确认事项和每一步记录，都集中在这里，由人查看、确认和接管。
      </SolDefine>

      <SolSection id="four" title="控制台做四件事" tone="mist"
        sub="同一条工作流跑在几百个项目，看到的是同一张面板、同一套口径。">
        <SolCols items={[
          { meta: "01", title: "查看运行状态", body: "哪些任务在跑、哪个项目异常、哪一步在等人：集中在一处，不用逐个项目去问。" },
          { meta: "02", title: "关键节点确认", body: "影响到人和钱的动作停在待确认，附数据、历史对照和异常说明，由授权人员一键确认。" },
          { meta: "03", title: "暂停、驳回或接管", body: "任何任务都可以随时叫停，不需要等它跑完。例：发现派工不对，暂停任务，人工改派后继续；更换服务团队时，原有权限当天收回。" },
          { meta: "04", title: "全部操作可追溯", body: "谁发起、读了什么、调了哪个工具、谁批准、结果如何，每一步都有记录。例：一笔退费有疑问，定位到具体哪一步。" },
        ]} />
        <div style={{ marginTop: 56 }}>
          <SolFigure ui src="/products/fmclaw/v2/console-workbench.webp" alt="FMClaw™ 控制台工作台真实界面：待办、运行中的任务与异常提醒" w={2080} h={1564}
            caption="真实产品界面 · 工作台：待办、运行中的任务与异常提醒集中在一处" />
        </div>
      </SolSection>

      <SolSection title="审批按你的规矩，逐级确认"
        sub="多级审批、确认人和确认时间都有记录。规矩由企业定，智能体按规矩把材料备齐。">
        <SolFigure ui src="/images/agents/op-workbench.webp" alt="控制台待我审批界面：左侧对话梳理当天审批事项，中间为待我审批清单（供应商结算、补卡、加班申请），右侧为当天各项工作的运行情况" w={2000} h={989}
          caption="真实产品界面 · 待我审批：系统先梳理当天事项、标出优先级，负责人在对话里说「通过」或「驳回」即可。" />
      </SolSection>

      <SolSection tone="mist" title="智能体推进工作，遵循三项原则" img={{ src: "/scene/team-review.webp", alt: "三位物业管理人员一起审阅电脑上的内容" }} split
        sub="三项原则写入规则与工作流，由智能体按授权执行，全程有记录。">
        <SolSteps items={[
          { no: "01", meta: "质量底线", title: "服务品质优先", body: "任何任务方案都不得以降低安全与服务质量为代价。出现冲突、异常或规则外情况时，智能体暂停推进并提交人工确认。" },
          { no: "02", meta: "成本可解释", title: "成本效率其次", body: "在满足安全与服务质量的前提下，比较不同方案的成本与效率，为管理人员提供可核验、可解释的决策依据。" },
          { no: "03", meta: "评估可复核", title: "考核公平可复核", body: "供应商与服务人员用统一的数据口径和规则评估，结果可追溯、可复核。" },
        ]} />
      </SolSection>

      <SolSection title="这些事，始终由人决定">
        <MediaRow src="/products/fmclaw/brain/decide.webp" alt="会议室里，总经理审阅材料并做出决定（场景示意）">
          <h3>智能体接手日常工作，决定权留在人手里</h3>
          <ul>
            <li><b>安全</b>涉及人身与设施安全的处置决定。</li>
            <li><b>奖惩与人员权益</b>考核结果的奖惩、准入和人员权益事项。</li>
            <li><b>供应商选择</b>选谁、换谁、付多少，由负责人决定。</li>
            <li><b>重大成本</b>超出规则或金额范围的支出与调整。</li>
          </ul>
          <p className="spt-more" style={{ marginTop: 18 }}>供应商付款就是这样运行的：智能体核量、比对、找异常、起草账单，付款决定由负责人作出，见 <Link href="/cases/coworking-supplier-reconciliation">供应商对账案例</Link>。</p>
        </MediaRow>
      </SolSection>

      <SolSection title="它在 FMClaw™ 里的位置"
        sub="三条边界各有归属：看什么由项目大脑限定，做什么由工具箱授权，过程由控制台看得见、管得住。">
        <BrainMap current="console" />
      </SolSection>

      <SeoFaq
        heading="关于智能体权限、接管与审计，常被问到的问题"
        serviceName="FMClaw™ 控制台"
        serviceDesc="查看智能体运行状态，关键节点由人确认，随时暂停、驳回或接管，全部操作可追溯。"
        items={[
          { q: "物业用 AI 安全吗？", a: "关键看三件事：AI 能看到什么、能做什么、过程能不能被看见和接管。FMClaw™ 的做法是项目隔离、按岗位授权，数据超出授权读不到；只调用企业授权的工具，敏感动作先经人批准；控制台里随时查看、暂停、驳回或接管，全部操作可追溯。" },
          { q: "智能体出了错，谁负责？", a: "人负责。每个智能体有明确的归属和上级；影响到人和钱的动作先经人批准才执行，批准人是谁有记录。责任始终落在具体的人身上。" },
          { q: "怎么防止智能体越权？", a: "智能体像员工一样管理：有身份、有岗位、有权限边界。权限按总部、区域、项目、岗位分层，它只能看到和做它岗位范围内的事；岗位变了，权限跟着变。" },
          { q: "出了问题，能查到是哪一步吗？", a: "能。每项任务从发起到结束都有记录：谁发起、读了什么数据、调了哪个工具、谁批准、结果如何。复核时逐步核对，定位到具体一步。" },
          { q: "人可以随时叫停智能体吗？", a: "可以。管理者随时查看、暂停、驳回或接管任何任务；收回授权即刻生效，已有记录保留。" },
          { q: "哪些事情 AI 不能自己决定？", a: "涉及安全、奖惩与人员权益、供应商选择和重大成本的事项，由授权人员作出最终决定。出现冲突、异常或规则外情况时，智能体暂停推进并提交人工确认。" },
          { q: "AI 操作审计日志包含哪些内容？", a: "每一次读取、判断、执行和确认：发起人、时间、读取的数据、调用的工具、批准人和执行结果。记录可以按项目、智能体和时间查询，用于复核和追责。" },
        ]}
      />

      <FmFoot updated="2026-10-16" />

      <SolEnd
        title={["让智能体进核心业务之前，", "先看看它怎么被管"]}
        sub="从一个真实业务开始验证。"
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        alt={<>继续了解：<Link href="/products/fmclaw/ontology">项目大脑</Link> · <Link href="/products/fmclaw/workflow-engine">工作流引擎</Link> · <Link href="/products/fmclaw/connectors">工具箱</Link></>}
      />
    </SolPage>
  );
}
