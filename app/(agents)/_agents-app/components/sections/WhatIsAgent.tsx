// /agents 首屏下方「什么是物业智能体」核心说明区（2026-09-14，GEO 周报 0907-0913 行动清单 P0）
// 目的：承接「物业智能体 / 物业管理智能体 / 物业 AI 智能体」搜索词进入的人——
// 第一屏就回答四个问题：是什么、和传统软件的区别、哪些场景先用、要不要换现有系统。
// 写法：每段第一句是自包含定义句（G10–G15），可被搜索引擎与 AI 生成引擎直接摘录。
// 数字纪律：仅用 docs/SEO-GEO-STRATEGY.md §4a 白名单与已发布案例页数字。
import Link from "next/link";

const DIFF = [
  { k: "谁来推进", soft: "人看着系统，人来推进每一步", agent: "智能体推进流程，人在关键节点确认" },
  { k: "输入方式", soft: "人把现场情况录进表单", agent: "从 IoT、影像、群消息与业务系统里自己取数" },
  { k: "输出结果", soft: "一张报表，等人去解读、去派人", agent: "一个判断、一张工单或一份待确认材料" },
  { k: "处理异常", soft: "流程卡住，等人发现", agent: "识别异常、发起处理并跟到关闭" },
  { k: "与现有系统", soft: "再上一套系统，再录一遍数据", agent: "接在现有 ERP / 工单 / 钉钉飞书企微之上运行" },
];

const FIRST = [
  { name: "设备巡检核验", href: "/solutions/inspection", why: "巡没巡、巡得对不对，有影像与在场数据可核", proof: "达标率 35% → 98%", caseHref: "/cases/fmclaw-equipment-inspection" },
  { name: "卫生间品质追踪", href: "/ai-service/cleaning", why: "投诉集中、标准明确、结果能被视觉核验", proof: "2000+ 卫生间达标率稳定 95% 以上", caseHref: "/cases/restroom-quality" },
  { name: "群消息报事派单", href: "/solutions/customer", why: "诉求散在群里，读懂即可成单", proof: "从群消息到派单 < 1 分钟", caseHref: "/cases/property-group-chat-ai-service" },
  { name: "多项目运营报告", href: "/scenarios/exec-query", why: "数据都在系统里，只是没人每天汇总", proof: "500+ 项目每天自动送达", caseHref: "/cases/property-group-auto-operation-report" },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WhatIsAgent() {
  return (
    <section className="mx-section mx-white wa" id="what-is-property-agent">
      <div className="section-container">
        {/* 1. 定义 */}
        <div className="wa-define">
          <span className="section-eyebrow">什么是物业智能体</span>
          <h2 className="section-title">物业智能体，<span className="wa-nb">是能把一件物业工作接着干完的 AI</span></h2>
          <p className="wa-lede">
            <b>物业智能体（物业管理智能体）是运行在物业与设施管理业务里的 AI 程序：它读取项目、空间、设备、人员、工单与账单数据，按既定业务流程推进一项工作——发现异常、生成工单、核验结果、准备待确认材料——并在需要人负责的环节交给人确认。</b>
            它不是一个回答问题的聊天窗口，也不是又一套需要人去录数据的管理软件。判断一个产品是不是物业智能体，看三点：能不能自己取数、能不能推进流程、能不能留下可追溯的工作记录。
          </p>
          <p className="wa-note">
            启盟科技的物业智能体运行在 <Link href="/products/fmclaw" className="mx-inline-link">FMClaw™ 平台</Link>上，自 2017 年起在真实项目中验证，目前服务 100+ 企业客户、系统覆盖 3000 万㎡。
          </p>
        </div>

        {/* 2. 与传统物业管理软件的区别 */}
        <div className="wa-block">
          <h3 className="wa-h3">物业智能体和传统物业管理软件有什么区别</h3>
          <p className="wa-p">
            <b>传统物业管理软件是记录工具：人把现场情况录进去，系统生成报表，再由人去解读、派人、跟进。物业智能体是执行者：它从现场与系统里自己取数，按流程推进，把结果直接变成动作。</b>
            两者不是替代关系——智能体通常接在现有软件之上运行，用它们的数据，把它们里面的流程跑起来。
          </p>
          <div className="wa-table-wrap">
            <table className="wa-table">
              <thead>
                <tr><th scope="col">维度</th><th scope="col">传统物业管理软件</th><th scope="col">物业智能体</th></tr>
              </thead>
              <tbody>
                {DIFF.map((r) => (
                  <tr key={r.k}>
                    <th scope="row">{r.k}</th>
                    <td data-label="传统软件">{r.soft}</td>
                    <td data-label="物业智能体" className="wa-td-agent">{r.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. 哪些场景适合先用 */}
        <div className="wa-block">
          <h3 className="wa-h3">哪些场景适合先用智能体</h3>
          <p className="wa-p">
            <b>适合先上智能体的物业场景有三个共同点：流程重复、结果可以被数据核验、现在正靠人盯着。</b>
            按这个标准，下面四类工作是启盟客户最常选的起点，每一类都有已发布的案例与可核的结果。
          </p>
          <div className="wa-first">
            {FIRST.map((s) => (
              <div className="wa-first-card" key={s.name}>
                <Link href={s.href} className="wa-first-name">{s.name} <Arrow /></Link>
                <p className="wa-first-why">{s.why}</p>
                <Link href={s.caseHref} className="wa-first-proof">
                  <span className="wa-first-proof-n">{s.proof}</span>
                  <span className="wa-first-proof-l">查看案例</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 要不要替换现有系统 */}
        <div className="wa-block wa-block--last">
          <h3 className="wa-h3">上智能体，需不需要替换现有 ERP、工单、钉钉、飞书、企微</h3>
          <p className="wa-p">
            <b>不需要。物业智能体接在企业现有系统之上运行：ERP 与财务系统继续做账，工单系统继续流转，钉钉、飞书、企业微信继续做入口。</b>
            智能体通过官方接口读取这些系统里的数据，在 FMClaw 的<Link href="/products/fmclaw/ontology" className="mx-inline-link">行业数据本体</Link>里统一口径，按<Link href="/products/fmclaw/workflow-engine" className="mx-inline-link">工作流</Link>推进，再把结果——一张工单、一条通知、一次收费调整——通过<Link href="/products/fmclaw/connectors" className="mx-inline-link">工具箱</Link>写回原系统。员工不需要换软件，也不需要第二次录入。协同平台与行业智能体平台为什么不是二选一，见<Link href="/insights/general-platform-vs-industry-agent" className="mx-inline-link">这篇文章</Link>。
          </p>
          <div className="wa-cta">
            <Link href="/contact?intent=demo&from=agents" className="wa-btn-primary">
              预约演示，看智能体在真实数据上怎么干活 <Arrow />
            </Link>
            <Link href="/cases" className="wa-btn-ghost">先看已发布案例</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
