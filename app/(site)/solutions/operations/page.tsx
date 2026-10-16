import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCompare, SolSteps, SolCols, SolFigure,
  SolCases, SolVerdict, SolMore, SolEnd,
} from "../_tpl/Sol";

// 2026-10-14 改版：IoT 物理感知替代人盯人；前提是先有服务标准；智能审批、调度派单、现场管理。
// 验收见 docs/SOLUTIONS-AGENT-GROUPS-ACCEPTANCE.md
const PATH = "/solutions/operations";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "物业人盯人怎么解决：现场管理与智能调度 · 运营管理智能体群 | 启盟科技",
  description:
    "运营管理智能体群用 IoT 传感器感知服务是否真实发生，替代人盯人的现场管理；按服务标准自动审批、调度派单、超时升级。上海一家国际医院 4,198 个传感器，六周内工单及时接单率从 24% 到 95%。",
});

const parts = [
  { meta: "感知", title: "服务有没有做，传感器知道", body: "点位上的传感器记录谁、何时、在哪个点位停留了多久。员工无需额外操作，不接摄像头、不采集私密信息。" },
  { meta: "审批", title: "例行事项按标准自动过，例外交给人", body: "系统每天比对服务完成度、响应时效、巡检覆盖，把风险点位整理成审批单，附上依据，管理者批示即可。" },
  { meta: "调度", title: "按技能、位置和负载派单", body: "保洁、安保、工程、客服的任务统一派发；有机器人的项目，人和机器人一起排。超时、漏检、投诉自动升级。" },
  { meta: "现场管理", title: "管理者只去数据显示有问题的地方", body: "每个点位的执行情况实时可见，巡场从按路线逐个看，变成按问题清单去处理。" },
];

const flow = [
  { meta: "前提", title: "先有服务标准", body: "每个点位做什么、每天几次、多久响应，来自服务设计智能体群。没有标准，感知到的数据无从比对。" },
  { meta: "执行", title: "传感器记录每一次服务", body: "服务到位、停留时长、频次是否达标，按点位自动记录，和服务计划逐条比对。" },
  { meta: "处理", title: "偏差变成审批单和工单", body: "漏做、超时、频次不足自动生成工单或升级；需要拍板的事项整理成审批单，交给对应管理者。" },
  { meta: "交接", title: "过程数据交给评估和复盘", body: "执行记录交给质量评估智能体群做质检，交给服务优化智能体群做报告和结算。" },
];

export default function OperationsPage() {
  return (
    <SolPage>
      <SolHero
        crumb="运营管理智能体群"
        title={["不靠人盯人，", "现场照样管得住"]}
        lead={<>运营管理智能体群用 <b>IoT 传感器</b>感知每一次服务是否真实发生，按服务标准自动<b>审批、调度派单、超时升级</b>。管理者不必到场逐个巡查，只处理需要拍板的事。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#parts", label: "看它管哪几件事" }}
        proof={["现场感知", "智能审批", "调度派单", "异常升级"]}
        image={{ src: "/solutions/agent-ops-hero.jpg", alt: "保洁员推着清洁车经过卫生间门口，门边墙上装有圆形传感器（场景示意）" }}
      />

      <SolDefine
        term="运营管理智能体群是什么："
        current={PATH}
        foot={<>它是 FMClaw™ 四个智能体群之一。标准来自服务设计智能体群，执行数据交给质量评估和服务优化智能体群。</>}
      >
        由多个岗位智能体组成，把服务标准变成每天的执行：用传感器感知服务是否到位，替代靠人巡场、打电话、翻记录的人盯人管理；偏差自动变成工单或审批单，交给对应的人处理。
      </SolDefine>

      <SolSection title="人盯人，管不过来也管不准" img={{ src: "/scene/op-brief.webp", alt: "项目经理在早班会上给保洁、安保和工程人员布置工作" }} tone="mist" split
        sub={<>一位管理者一天能巡两三个项目，看到的只是巡查那一刻；纸质签到和打卡能证明人来过，证明不了服务做了。编制一收缩，这种管理方式就跟不上了。</>}>
        <SolCompare labels={["人盯人", "传感器感知"]} rows={[
          { k: "覆盖", before: "巡到哪里看到哪里，抽查覆盖有限。", after: "每个点位、每一次服务都有记录。" },
          { k: "依据", before: "签到本、打卡、口头汇报，难以核实。", after: "到位、停留时长、频次，和服务计划逐条比对。" },
          { k: "发现问题", before: "多数在投诉或抽查之后。", after: "漏做、超时当天点出，自动派单或升级。" },
          { k: "管理者的时间", before: "花在路上和翻记录上。", after: "花在审批单和需要判断的问题上。" },
        ]} />
      </SolSection>

      <SolSection id="parts" title="它管四件事：感知、审批、调度、现场管理" split
        sub="四件事用同一套点位和服务标准，数据只有一份。">
        <SolCols items={parts} />
      </SolSection>

      <SolSection title="管理者每天打开的工作台" tone="mist"
        sub="待审批事项、当天各项工作的运行情况、今日完成与计划，放在同一个页面。左侧对话里，系统先把当天的审批事项梳理一遍，指出哪些需要优先处理；管理者在对话里说「通过」或「驳回」即可。">
        <SolFigure ui src="/images/agents/op-workbench.webp" alt="运营管理工作台：左侧为审批事项梳理对话，中间为待我审批清单（供应商结算、补卡、加班申请），右侧为当天各项工作的运行情况" w={2000} h={989}
          caption="工作台：左侧是对话梳理，中间是待我审批清单，右侧是当天各项工作的运行与完成情况。" />
        <div style={{ marginTop: 48 }}>
          <SolFigure ui src="/images/agents/op-sensor.webp" alt="点位日报：某栋 2 层走火通道的服务时长、到访人数、停留服务记录与每次进出时间" w={2000} h={990}
            caption="传感器核验记录（点位日报）：一个点位一天里谁来过、停留多久、每次进出时间，按分钟显示在场情况。" />
        </div>
      </SolSection>

      <SolSection title="标准进来，执行出去" split img={{ src: "/scene/robot-cleaner.webp", alt: "清洁机器人与保洁员在办公走廊里同时作业" }}
        sub="运营管理处在四个智能体群的中间：上接标准，下接评估与复盘。">
        <SolSteps items={flow} />
        <SolVerdict>先有标准，再有感知；感知到偏差，才知道该派谁去</SolVerdict>
      </SolSection>

      <SolSection title="已经发布的相关案例" tone="mist" split
        sub="从医院、地铁到工厂，都是靠人盯不过来的场景。">
        <SolCases items={[
          { scene: "上海一家三级综合国际医院", result: <>全院 <b>4,198 个</b>传感器支撑每月 215,821 次服务交付的逐次核验；六周内工单及时接单率从 <b>24% 到 95%</b>。</>, href: "/cases/intl-hospital-medical-grade-fm" },
          { scene: "国内一条地铁线", result: <>30 余个车站、<b>3400 多个</b>机房日修日检逐次核验，200 多人的外包团队漏检当天预警。</>, href: "/cases/metro-3400-rooms-daily-inspection" },
          { scene: "德国工业巨头上海合资工厂", result: <>危化区域<b>双人双岗</b>逐人核验，缺岗、漏巡当天预警，记录经得起每月外部核查。</>, href: "/cases/hazardous-area-dual-person-patrol" },
          { scene: "通信设备龙头 · 13 城 21 园区", result: <>卫生间从人盯人改为全量追踪，管理巡检人力投入下降约 <b>60%</b>。</>, href: "/cases/restroom-quality" },
        ]} />
      </SolSection>

      <SolSection title="哪些事仍然由人决定" img={{ src: "/scene/team-review.webp", alt: "三位物业管理人员围在桌边一起审阅电脑上的内容" }} split
        sub="系统负责发现和派发，决定权在人手里。">
        <SolCols items={[
          { title: "重要动作先审批", body: "专项检查、人员调整、预算外支出等事项，以审批单的形式交给管理者确认。" },
          { title: "派单可以随时改", body: "日常派单由系统按规则完成，管理者可以随时改派、加急或撤回。" },
          { title: "现场处置靠人", body: "到场核实、现场处置、对业主和客户的沟通，都由人完成。" },
        ]} />
        <SolMore>报事报修和投诉的处理见 <Link href="/solutions/customer">报事报修与投诉</Link>；巡检场景见 <Link href="/solutions/inspection">设备巡检管理</Link>。</SolMore>
      </SolSection>

      <SeoFaq
        heading="关于物业现场管理和人盯人，常被问到的问题"
        serviceName="运营管理智能体群"
        serviceDesc="用 IoT 传感器感知服务是否真实发生，按服务标准自动审批、调度派单与超时升级，替代人盯人的现场管理。"
        items={[
          { q: "物业人盯人的管理方式，有什么办法替代？", a: "关键是让服务过程自己留下可核对的记录。在每个服务点位部署传感器，记录谁、何时、在哪个点位停留了多久，再和服务计划逐条比对；管理者不必到场，就能看到每个点位的执行情况，只去数据显示有问题的地方。一家通信设备龙头企业在 13 城 21 园区的卫生间这样做之后，管理巡检人力投入下降约 60%。" },
          { q: "传感器怎么知道保洁、巡检真的做了？", a: "传感器确认的是人到了指定点位、停留了多长时间，以及频次是否符合服务计划。做得好不好，则由质量评估智能体群通过照片评分判断。两者合起来，既能证明人来了，也能证明服务做了。" },
          { q: "物业现场管理包括哪些方面？哪些能交给系统？", a: "通常包括服务执行、巡查巡检、工单响应、人员调度、异常处置和客户沟通。其中服务执行的记录、巡检到位的核验、工单的派发与超时升级，可以交给运营管理智能体群；异常处置和客户沟通仍需要人。" },
          { q: "物业智能调度系统能做什么？", a: "按服务标准把保洁、安保、工程、客服的任务统一派发，考虑人员技能、位置和当前负载；有机器人的项目，人和机器人一起排班。工单超时、漏检、投诉自动升级给对应管理者。上海一家国际医院上线六周，工单及时接单率从 24% 升到 95%。" },
          { q: "智能审批是什么意思？会不会替管理者做决定？", a: "不会。系统每天比对运营数据，把需要关注的事项整理成审批单，附上数据依据和建议，由管理者批示。例行事项按标准自动处理，重要动作仍然要人确认。" },
          { q: "为什么要先有服务标准，才能做运营管理？", a: "传感器记录的是人到了哪里、停了多久，如果没有每个点位应该做几次、多久响应的标准，这些数据就没有比对的依据，也就判断不了是否漏做。所以运营管理的标准来自服务设计智能体群。" },
          { q: "会不会侵犯员工隐私？", a: "现场感知只用于确认人员是否到达指定点位、停留了多久，不接摄像头、不采集私密信息，员工无需额外操作。它对认真干活的人反而是保护：做了就有记录。" },
          { q: "需要换掉现在的工单系统或钉钉、飞书、企业微信吗？", a: "不需要。运营管理智能体群接在已有系统上运行，派单和通知可以走现有的协同平台，权限沿用现有的组织架构。" },
        ]}
      />

      <SolEnd
        title={["选一个最难盯的项目，", "看它怎么管住现场"]}
        sub="从一类服务、一片区域开始，跑通之后再扩展。"
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        alt={<>其余三个智能体群：<Link href="/solutions/service-design">服务设计</Link> · <Link href="/solutions/assessment">质量评估</Link> · <Link href="/solutions/optimization">服务优化</Link></>}
      />
    </SolPage>
  );
}
