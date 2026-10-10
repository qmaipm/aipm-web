import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import { SolPage, SolHero, SolSection, SolSteps, SolCols, SolLoop, SolFigure, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/operations", {
  title: "运营管理 · 智能体解决方案 | 启盟科技",
  description:
    "运营管理 Agent 把服务标准转成每天可执行的工作流，实时调度、自动响应异常；管理者只在交互界面里审批与确认。把每天的调度与派单，变成可追溯的实时运营。",
});

const feats = [
  { title: "实时调度", body: "巡检、保洁、维修、安防四类任务统一编排，按技能与负载实时派单。" },
  { title: "异常自动升级", body: "超时、漏检、投诉等异常被识别后自动升级，不靠人记着去催。" },
  { title: "指令可追溯", body: "每一条派单、每一次响应都有记录，谁去、为什么、结果如何，事后可查。" },
];

const flow = [
  { meta: "输入", title: "服务标准 + 实时信号", body: "来自服务设计的标准，叠加巡检、保洁、维修、安防的实时工单与 IoT 信号。" },
  { meta: "处理 · AI", title: "转成每日工作流并实时调度", body: "把标准拆成可执行可追踪的任务，按技能与负载派单，异常自动响应与升级。" },
  { meta: "输出 · 人做决定", title: "人机管理交互界面", body: "管理者审批 AI 建议、查看实时数据、发出权限内指令：决定权始终在人手里。" },
];

const mods = [
  { title: "SSR 服务记录", body: "每一次服务都有记录，运营有据可查。", href: "/products/fmclaw" },
  { title: "工单调度系统", body: "定位、定级、派单与升级的执行底座。", href: "/products/fmclaw" },
  { title: "人机协同引擎", body: "AI 给建议、人做决定的协同机制。", href: "/products/fmclaw" },
  { title: "小智帮手", body: "一线随手可用的对话式运营助手。", href: "/products/fmclaw" },
];

const loop = ["服务设计", "运营管理", "质量评估", "服务优化"];

export default function OperationsPage() {
  return (
    <SolPage>
      <SolHero
        crumb="运营管理"
        title={["把每天的调度与派单，", "变成可追溯的实时运营"]}
        lead={<>运营管理 Agent 把服务标准转成每天可执行的工作流，<b>实时调度、自动响应异常</b>；管理者只在交互界面里审批与确认。</>}
        secondary={{ href: "#flow", label: "看它怎么工作" }}
        proof={["实时调度", "异常自动升级", "指令可追溯"]}
        image={{ src: "/insights/management-efficiency-cover.jpg", alt: "项目运营中心，整面墙的数据看板实时显示各类工单（场景示意）" }}
      />

      <SolSection title="把散在很多人脑子里的运营判断，变成系统" tone="mist" split
        sub={<>调度、派单、异常响应每天大量发生，过去靠人盯、靠电话、靠经验，运营判断<b>散在很多人脑子里</b>：出了岔子，往往事后才知道。</>}>
        <SolSteps items={feats} />
      </SolSection>

      <SolSection id="flow" title="标准进来，工作流出去，人只做最后那个决定" split
        sub="对接 IoT 与工单系统，把服务标准转成每日可执行、可追踪的运营。">
        <SolSteps items={flow} />
        <SolVerdict>派单那一刻，谁去、为什么是他、超时怎么办，AI 都安排好了</SolVerdict>
      </SolSection>

      <SolSection title="管理者的人机交互界面" tone="mist">
        <SolFigure ui src="/images/agent-operations.png" alt="运营管理 Agent 界面" w={3338} h={1644}
          caption="把每天的调度、派单、异常响应，变成可审批、可追溯的实时运营。" />
      </SolSection>

      <SolSection title="背后是这些产品模块">
        <SolCols items={mods} />
      </SolSection>

      <SolSection title="执行设计的标准，交给评估去打分" tone="mist" split
        sub={<>运营管理执行服务设计输出的标准，又把过程里产生的工单、照片与数据，<b>交给质量评估</b>去独立打分。</>}>
        <SolLoop nodes={loop} current={1} tail="↻ 回灌服务设计" />
        <SolMore><Link href="/agents">查看四个行业智能体</Link></SolMore>
      </SolSection>

      <SeoFaq
        heading="关于运营管理 Agent，你可能想问"
        serviceName="运营管理 Agent"
        serviceDesc="把服务标准转成每天可执行的工作流，实时调度、自动响应异常。"
        items={[
          { q: "Agent 自动调度，管理者还能插手吗？", a: "能，而且必须。重要动作先经人审批确认，日常派单可以随时改派；管理者的角色从逐件安排，变成在交互界面里审批与确认。" },
          { q: "巡检、保洁、维修、安防能在一套里管吗？", a: "能。四类任务统一编排、同一张负载表派单，不再各自一套排班互不知道；人员跨任务类型的忙闲不均也能被看见。" },
          { q: "服务标准改了，工作流要重新开发吗？", a: "不用。服务标准是配置不是代码，频次、点位、时限调整后工作流自动按新标准执行，当天生效。" },
        ]}
      />

      <SolEnd
        title={["把一天的真实工单，跑一次实时运营"]}
        sub="带上你的运营场景来，看 Agent 怎么调度。"
        alt={<>运营调度只是其中一条，物业 AI 的六类应用见 <Link href="/insights/ai-applications-and-solutions-in-property-management">应用与解决方案全览</Link></>}
      />
    </SolPage>
  );
}
