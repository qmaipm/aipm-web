import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCompare, SolTable, SolCols, SolFigure, SolGallery,
  SolCases, SolVerdict, SolMore, SolEnd,
} from "../_tpl/Sol";

// 2026-10-14 改版：名称保留「服务优化」（外部媒体与百科一致），标题与副标题写「报告 · 复盘 · 结算」。
// 三件事：报告（日 / 周 / 月）、建议（优化 / 调整）、结算（供应商账单、员工薪资、团队 KPI）。
// 百强集团案例的「3 分钟」为系统耗时，不作为业务结果强调。验收见 docs/SOLUTIONS-AGENT-GROUPS-ACCEPTANCE.md
const PATH = "/solutions/optimization";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "物业日报周报月报、复盘与供应商结算 · 服务优化智能体群 | 启盟科技",
  description:
    "服务优化智能体群负责报告、复盘与结算：自动生成物业日报、周报、月报，按数据给出优化与调整建议，并核算供应商账单、员工薪资和团队 KPI。一家百强物业集团 500 多个项目的运营报告每天自动送达。",
});

const parts = [
  { meta: "报告", title: "日报、周报、月报自动生成", body: "出勤、服务计划执行、服务质量、工单响应等数据自动汇总，做同比环比和异常提示，按项目、区域、总部分层送达。" },
  { meta: "建议", title: "哪里该优化，哪里该调整", body: "找出反复出现的问题、执行偏差大的点位和频次，给出调整服务计划、人员配置或物料的建议，每条都附数据依据。" },
  { meta: "结算", title: "供应商账单、员工薪资、团队 KPI", body: "按服务执行和质检数据核算供应商账单，按考勤和工时核算薪资，按完成率和质量分核算团队 KPI。" },
];

export default function OptimizationPage() {
  return (
    <SolPage>
      <SolHero
        crumb="服务优化智能体群"
        title={["报告、复盘、结算，", "用同一份运营数据"]}
        lead={<>服务优化智能体群负责每个周期的收尾工作：自动生成<b>日报、周报、月报</b>，按数据给出<b>优化和调整建议</b>，并核算<b>供应商账单、员工薪资和团队 KPI</b>。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#parts", label: "看它做哪三件事" }}
        proof={["运营报告", "复盘建议", "供应商结算", "薪资与 KPI"]}
        image={{ src: "/solutions/agent-review-hero.jpg", alt: "物业项目负责人在办公桌前翻看月度运营报告（场景示意）" }}
      />

      <SolDefine
        term="服务优化智能体群是什么："
        current={PATH}
        foot={<>它是 FMClaw™ 四个智能体群之一。它用的数据来自运营管理和质量评估智能体群，采纳的建议回到服务设计智能体群，更新下一轮的服务标准和编制。</>}
      >
        由多个岗位智能体组成，把一个周期的运营数据变成三样东西：一份报告、一组建议、一套结算结果。三者用同一份执行与质检数据，报告里的数、复盘用的数、结算用的数是同一个口径。
      </SolDefine>

      <SolSection title="报告难写，难在取数和对口径" img={{ src: "/scene/opt-review.webp", alt: "物业总监在月度服务复盘会上向客户汇报" }} tone="mist" split
        sub={<>数据散在门禁、停车、能耗、工单、考勤等多个系统里，每到周末、月底就要有人逐个导出再拼起来；结算时又要按另一套口径再算一遍，报告、考核和账单常常对不上。</>}>
        <SolCompare labels={["人工整理", "服务优化智能体群"]} rows={[
          { k: "报告", before: "逐个系统导数据，靠人拼表、写分析。", after: "按时自动生成，同比环比和异常提示一并给出。" },
          { k: "复盘", before: "凭印象和个人经验，反复出现的问题难以定位。", after: "按点位、班组、问题类型归并，找出反复出现的几项。" },
          { k: "结算", before: "供应商账单、薪资、KPI 各算各的。", after: "用同一份执行和质检数据核算，差异可以逐条追溯。" },
        ]} />
      </SolSection>

      <SolSection id="parts" title="它做三件事：报告、建议、结算" split
        sub="三件事按周期运行，也可以随时让它单独做一份。">
        <SolCols items={parts} />
      </SolSection>

      <SolSection title="一份自动生成的月度报告" tone="mist"
        sub="在对话框里说明要什么样的报告，系统取数、分析、排版。下图是保安部门的专项分析：在岗人数、计划执行率、平均质量分、工单响应率，以及出勤曲线里的异常天数。">
        <SolFigure ui src="/images/agent-optimization.png" alt="AI 报告界面：保安部门专项分析，含部门概况指标表与出勤分析折线图" w={3328} h={1638}
          caption="左侧是对话过程，右侧是报告预览。图中数据异常（打卡记录偏低但现场在岗时长连续）被单独标出，提示核实。" />
        <div style={{ marginTop: 48 }}>
          <SolGallery items={[
            { src: "/images/agents/rv-vendor-bill.webp", w: 2000, h: 1322, title: "供应商结算", caption: "按编制工时、实际出勤、加班和缺勤逐日核算账单，含税金额自动算出；调账和审核都有记录。", alt: "供应商费用结算表：账单金额、税费、编制人数、岗位工时单价与每日账单明细" },
            { src: "/images/agents/rv-payroll.webp", w: 2000, h: 987, title: "薪资与 KPI 核算", caption: "薪酬汇总按审批级次逐级确认，明细列出应发工资、缺勤与考勤扣款、在场扣款、绩效扣款、加班费等。", alt: "保洁薪酬汇总审批：五级审批级次与薪酬明细表" },
          ]} />
        </div>
      </SolSection>

      <SolSection title="三类报告，各自给谁看" split
        sub="同一套指标定义，按组织层级送达。">
        <SolTable
          head={["报告", "主要内容", "通常给谁"]}
          rows={[
            ["日报", "当日出勤、工单、异常事件、待处理事项", "项目经理、主管"],
            ["周报", "服务计划执行率、质量评分、工单响应、本周问题", "项目经理、区域负责人"],
            ["月报", "分部门专项分析、同比环比、反复出现的问题、优化建议", "区域、总部管理层与业主"],
          ]}
          caption="报告内容和格式可以按你的要求调整，例如按部门分板块、加趋势图、按 A4 版式输出。"
        />
        <SolVerdict>报告里的数、复盘用的数、结算用的数，出自同一份数据</SolVerdict>
      </SolSection>

      <SolSection title="已经发布的相关案例" tone="mist" split
        sub="报告和结算都建立在服务执行可以被记录、被核对的基础上。">
        <SolCases items={[
          { scene: "一家全国百强物业集团", result: <><b>500 多个</b>项目的运营报告每天早 8 点自动送达，人工投入为 <b>0</b>；同一指标全集团只有一种算法。</>, href: "/cases/property-group-auto-operation-report" },
          { scene: "一家全球化共享办公企业", result: <>全国<b>近 90 个</b>社区服务次数全部量化，<b>10 多家</b>供应商按同一份执行数据考核，并延伸到各供应商账单。</>, href: "/cases/coworking-supplier-reconciliation" },
          { scene: "上海某新能源汽车超级工厂", result: <>服务启动时 <b>600 多位</b>保洁人员来自 <b>4 家</b>供应商，在同一套标准下衡量交付表现。</>, href: "/cases/gigafactory-4-vendor-cleaning" },
        ]} />
      </SolSection>

      <SolSection title="哪些事仍然由人决定" img={{ src: "/scene/sign-off.webp", alt: "总经理在纸质文件上签字确认" }} split
        sub="系统负责核算和提出建议，采纳和付款由人确认。">
        <SolCols items={[
          { title: "建议采不采纳", body: "每条建议都能看到背后的数据；是否调整服务计划、人员或物料，由管理者决定。" },
          { title: "付款这一步留给人", body: "供应商账单和薪资核算完成后，经人审核确认再进入付款流程。" },
          { title: "考核规则由你定", body: "扣分项、权重、奖惩办法按你的制度配置，系统按规则计算。" },
        ]} />
        <SolMore>结算场景的完整做法见 <Link href="/solutions/vendor">供应商管理与自动对账</Link>、<Link href="/solutions/subcontract">服务分包管理</Link>、<Link href="/solutions/payroll">人员薪酬管理</Link>；集团层面随时查数见 <Link href="/solutions/ask-data">物业智能问数</Link>。</SolMore>
      </SolSection>

      <SeoFaq
        heading="关于物业报告、复盘和结算，常被问到的问题"
        serviceName="服务优化智能体群"
        serviceDesc="自动生成物业日报、周报、月报，给出复盘优化建议，核算供应商账单、员工薪资与团队 KPI。"
        items={[
          { q: "物业日报、周报、月报能自动生成吗？", a: "能。难点不在写，而在取数：数据散在门禁、停车、能耗、工单、考勤等多个系统里。服务优化智能体群把这些系统接进来后，自动汇总数据、做同比环比和异常提示并成稿，按项目、区域、总部分层送达。一家全国百强物业集团 500 多个项目的运营报告，每天早 8 点自动送达，人工投入为 0。" },
          { q: "物业月度复盘报告应该写什么？", a: "通常包括四部分：出勤与人员情况、服务计划执行情况、服务质量与工单响应、反复出现的问题和优化建议。比较有用的复盘会把问题落到具体点位、班组和问题类型，并说明数据依据，而不是只罗列指标。" },
          { q: "AI 给的优化建议靠谱吗？", a: "每条建议都附数据依据，例如哪类问题在哪些点位反复出现、哪些服务频次执行偏差大，可以点开看到背后的工单和照片。采不采纳、怎么改，由管理者决定；采纳的调整会回到服务设计智能体群，更新服务计划和编制。" },
          { q: "保洁、安保供应商怎么结算和考核？", a: "按真实的服务执行和质检结果结算，而不是只数人头。服务优化智能体群用运营管理记录的执行数据和质量评估的评分，按你的考核规则核算出各供应商的账单和扣分项，差异可以逐条追溯。一家共享办公企业在全国近 90 个社区，用同一份执行数据考核 10 多家供应商。" },
          { q: "物业 KPI 考核指标怎么定？能自动计算吗？", a: "常用的有服务计划执行率、质量评分、工单及时响应率和完成率、投诉数量等。指标和权重按你的制度配置后，系统按周期自动计算到项目、班组和个人。" },
          { q: "员工薪资可以自动核算吗？", a: "可以。考勤、工时、加班、补贴自动汇总，按你配置的薪酬规则算出结果，经人审核后进入发放流程。详细做法见人员薪酬管理方案。" },
          { q: "多个项目的指标口径不一致怎么办？", a: "把指标的定义和算法统一放在数据底座里，同一个指标在所有项目里只有一种算法。这样报告里的数、问数问出来的数、考核和结算用的数才对得上。" },
          { q: "没有积累过数据的项目能用吗？", a: "能，但建议先跑一段时间。报告第一天就可以生成；复盘和建议需要运营管理和质量评估积累一两个月的数据，结果才有参考价值。" },
        ]}
      />

      <SolEnd
        title={["拿上个月的数据来，", "看报告和账单怎么出来"]}
        sub="从一个项目、一类报告或一家供应商的结算开始。"
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        alt={<>其余三个智能体群：<Link href="/solutions/service-design">服务设计</Link> · <Link href="/solutions/operations">运营管理</Link> · <Link href="/solutions/assessment">质量评估</Link></>}
      />
    </SolPage>
  );
}
