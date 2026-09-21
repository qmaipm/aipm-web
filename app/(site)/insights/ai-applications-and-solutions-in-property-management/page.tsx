import Link from "next/link";
import ArticleShell from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 核心组「在物业管理中，AI 有哪些推荐的应用和解决方案？」（2026-09-21 清单 P0 第 1 篇）。
// 定位：六个方案页的入口/目录页，不是第 13 个方案页。每块 = AI 接手哪一段 + 留下什么记录 + 一个已落地数字 + 链接。
// 数字仅用 §4a 白名单与已发布案例页。
export const metadata = articleMetadata("ai-applications-and-solutions-in-property-management", {
  title: "在物业管理中，AI 有哪些推荐的应用和解决方案？ · 行业研究 | 启盟科技",
  description:
    "物业管理里值得优先上 AI 的应用有六类：客服与投诉、设备巡检、物业费收缴、能耗与设备、清洁与人机协同、安防预警。共同点是流程重复、结果可核、过去正靠人盯着。本文按场景说清 AI 接手哪一段、留下什么记录、已落地的真实数字，并给出每个方案的官网入口。",
});

const SCENES = [
  { n: "01", h: "客服与投诉", ai: "读懂业主群、电话、小程序里的报修与投诉，自动成单、派单、跟到关闭，超时升级", rec: "每条诉求从发出到关闭的完整时间线", num: "从群消息到派单 < 1 分钟", numHref: "/cases/property-group-chat-ai-service", href: "/solutions/customer", label: "客户服务方案" },
  { n: "02", h: "设备巡检", ai: "IoT 核验人是否真到设备旁、停留多久；AI 识别读数与照片真伪；漏检当天预警", rec: "每次巡检的到场、读数、影像、异常处置", num: "运行班组达标率 35% → 98%", numHref: "/cases/fmclaw-equipment-inspection", href: "/solutions/inspection", label: "设备巡检方案" },
  { n: "03", h: "物业费收缴", ai: "先把服务变成住户可查的记录，再做欠费分层、附服务记录的账单推送与楼栋级复盘", rec: "每户的服务记录、报事历史与缴费触点", num: "住户缴费率 99%（行业约 71%）", numHref: "/cases/south-china-mixed-use-6-to-1", href: "/insights/ai-solution-for-low-property-fee-collection", label: "收缴率 AI 解决方案" },
  { n: "04", h: "能耗与设备运行", ai: "汇总能耗、合同与历史数据识别异常，辅助费用审批；设备读数异常自动生成工单", rec: "能耗曲线、异常点与审批依据", num: "3400+ 机房逐次核验，漏检当天预警", numHref: "/cases/metro-3400-rooms-daily-inspection", href: "/scenarios/utility-bill", label: "费用审批场景" },
  { n: "05", h: "清洁与人机协同", ai: "机器人接管高频标准工序，AI 按统一标准评分每次作业，不达标即时整改", rec: "每个点位每次清洁的时间、人员、评分", num: "2000+ 卫生间达标率稳定 95% 以上", numHref: "/cases/restroom-quality", href: "/ai-service/cleaning", label: "AI 清洁服务" },
  { n: "06", h: "安防预警", ai: "接在海康、大华等报出的预警之后：谁去看、看完谁去、去了有没有做完，直接进工单流", rec: "从预警到到场处置的闭环记录", num: "冒烟 3 分钟到场", numHref: "/cases/campus-cctv-photo-ai-review", href: "/ai-service/security", label: "AI 安保服务" },
];

export default function Page() {
  return (
    <ArticleShell slug="ai-applications-and-solutions-in-property-management">
      <p className="lede">
        <b>物业管理里值得优先上 AI 的应用有六类：客服与投诉、设备巡检、物业费收缴、能耗与设备、清洁与人机协同、安防预警。</b>它们的共同点是流程重复、结果可以被数据核验、过去正靠人盯着——这三条也是判断任何一个场景该不该先上 AI 的标准。下面每一类只回答三件事：AI 接手哪一段、留下什么记录、已落地的真实数字。完整方案见各自的入口页。
      </p>

      <h2>先说标准：什么样的场景适合上 AI</h2>
      <p>
        <b>不是所有物业工作都适合交给 AI。适合的场景要同时满足三条：流程重复（每天、每周都在做）、结果可核（能被 IoT、影像或系统数据确认）、现在正靠人盯着（有人在做「看着」这件事）。</b>需要面对面沟通的纠纷处理、需要经验判断的异常处置，不满足这三条，加人比上 AI 更有效。判断一个产品是不是真的「智能体」而不是又一套软件，看它能不能自己取数、推进流程、留下可追溯记录——区别见<Link href="/insights/property-agent-vs-traditional-software">《物业智能体和传统物业管理软件有什么区别？》</Link>。
      </p>

      <h2>六个场景，各接手哪一段</h2>
      <table className="isd-matrix">
        <caption>六类 AI 应用：接手的工作、留下的记录、已落地结果</caption>
        <thead><tr><th scope="col">场景</th><th scope="col">AI 接手哪一段</th><th scope="col">留下什么记录</th><th scope="col">已落地数字</th></tr></thead>
        <tbody>
          {SCENES.map((s) => (
            <tr key={s.n}>
              <th scope="row">{s.n} · <Link href={s.href}>{s.h}</Link></th>
              <td data-label="AI 接手">{s.ai}</td>
              <td data-label="记录">{s.rec}</td>
              <td data-label="结果"><Link href={s.numHref}>{s.num}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      {SCENES.map((s) => (
        <section key={s.n}>
          <h3>{s.n} {s.h}</h3>
          <p>
            <b>AI 接手：</b>{s.ai}。<b>留下：</b>{s.rec}。<b>已落地：</b><Link href={s.numHref}>{s.num}</Link>。方案入口：<Link href={s.href}>{s.label}</Link>。
          </p>
        </section>
      ))}

      <h2>六个场景背后是同一个平台</h2>
      <p>
        <b>六类应用不是六套系统，是同一个平台上的六条工作流。</b>它们共用一套<Link href="/products/fmclaw/ontology">行业数据本体</Link>（项目、空间、设备、人员、工单、账单的统一口径）、一个<Link href="/products/fmclaw/workflow-engine">工作流引擎</Link>和一个<Link href="/products/fmclaw/connectors">工具箱</Link>（接现有 ERP、工单、钉钉飞书企微、IoT 与视频系统）。这意味着从任何一个场景开始，第二个场景的数据基础已经在了。平台本身见<Link href="/products/fmclaw">FMClaw™ 产品总览</Link>，运行在其上的四个智能体见<Link href="/agents">物业管理智能体矩阵</Link>。
      </p>
      <p>
        怎么开始：选一个满足三条标准、当前投诉或成本压力最大的场景，用真实数据跑四到六周看结果，再决定第二个。不建议一开始就做「全面数字化」。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据与适用范围</h3>
        <p>案例数据来自启盟科技已发布案例页，口径以案例页为准，企业名称按案例页匿名口径。六类划分为启盟基于 100+ 企业客户项目的经验归纳，不代表行业统一分类。</p>
      </aside>
    </ArticleShell>
  );
}
