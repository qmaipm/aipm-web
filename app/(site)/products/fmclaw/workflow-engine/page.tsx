import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, FmRelated, techArticleLd } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/workflow-engine", {
  title: "行业级智能体工作流引擎｜FMClaw™ AI 业务流程自动化",
  description:
    "FMClaw 将数据、行业能力、业务工具、人工审批与执行反馈组织为可持续运行、可跨项目复用的物业管理智能体工作流。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/workflow-engine",
  headline: "行业级智能体工作流引擎",
  description:
    "智能体工作流是由数据、判断、工具、审批和执行反馈组成的业务过程。它既保留 AI 处理复杂情况的能力,也保持企业流程需要的稳定性。",
});

const FAQ = [
  {
    q: "什么是智能体工作流?",
    a: "智能体工作流是由数据、判断、工具、审批和执行反馈组成的业务过程。它既保留 AI 处理复杂情况的能力,也保持企业流程需要的稳定性。",
  },
  {
    q: "为什么一个 Demo 不能直接进入生产?",
    a: "Demo 面对的是一份挑选过的数据和一次成功的运行;生产系统面对不同项目、不同来源和持续变化的真实业务,需要触发、取数、判断、审批、异常处理和留痕的完整组织。这正是工作流引擎要解决的问题。",
  },
  {
    q: "业务人员可以自己搭工作流吗?",
    a: "业务人员可以用自然语言描述希望完成的工作,由 FMClaw 生成可检查、可调整的业务工作流。生成的流程需要经过检查和试运行,再进入日常使用。",
  },
  {
    q: "一条流程如何复制到多个项目?",
    a: "一条流程在一个项目跑通后,可以在更多项目中复用,并保留统一的管理口径。项目之间数据隔离,指标定义和管理要求保持一致。",
  },
  {
    q: "人在流程中扮演什么角色?",
    a: "人可以在审批、异常、高风险动作和最终确认等节点介入。智能体负责准备事实与建议,人保留决定权。",
  },
];

const PREBUILT = ["服务报价", "运营日报", "投诉报事", "智能派单", "现场巡检", "员工绩效", "薪酬核算", "供应商账单", "水电费核算", "能耗分析"];
const STABLE = ["定时触发", "事件触发", "批量运行", "异常处理", "人工接管", "版本管理", "运行记录"];

export default function Page() {
  return (
    <main className="fmc">
      <JsonLd data={TECH_LD} />
      <div className="wrap">
        <FmBreadcrumb
          trail={[
            { name: "FMClaw™ 产品总览", href: "/products/fmclaw" },
            { name: "行业级智能体工作流引擎", href: "/products/fmclaw/workflow-engine" },
          ]}
        />
      </div>

      <header className="fmc-hero">
        <div className="wrap">
          <p className="fmc-kicker">Agentic Workflow Engine</p>
          <h1>把物业管理流程,变成可持续运行的智能体工作流</h1>
          <p className="fmc-def">
            行业级智能体工作流引擎是 FMClaw™ 组织工作的方式。它把一项业务从触发、取数、
            判断、审批到执行组织成完整的业务工作流(Agentic Workflow),
            让同一件事可以在多个项目中稳定、可复核地反复运行。
          </p>
        </div>
      </header>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>什么是智能体工作流?</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              智能体工作流是由数据、判断、工具、审批和执行反馈组成的业务过程。
              它既保留 AI 处理复杂情况的能力,也保持企业流程需要的稳定性。
            </p>
          </div>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            这也是「为什么一个 Demo 不等于一个可运行的业务系统」的答案:Demo 展示一次成功,
            工作流保证每天都以同样的口径运行。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>从管理要求到可运行流程</h2>
          <div className="fmc-cols">
            <div className="fmc-cell">
              <span className="fmc-cell-en">INPUT</span>
              <h3>输入:管理怎么要求</h3>
              <p>业务目标 · 管理制度 · 服务标准 · 项目数据 · 审批要求</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">OUTPUT</span>
              <h3>输出:流程怎么运行</h3>
              <p>触发条件 · 数据调用 · 判断步骤 · 工具动作 · 人工节点 · 最终结果</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>预制行业工作流</h2>
          <p className="fmc-p">
            FMClaw 已将物业与设施管理中的高频工作组织为预制流程。
            从已经验证的行业业务工作流开始,不必从空白画布开始。
          </p>
          <div className="fmc-tags">
            {PREBUILT.map((w) => <span key={w}>{w}</span>)}
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>用自然语言生成工作流</h2>
          <p className="fmc-p">
            业务人员可以用自然语言描述希望完成的工作,由 FMClaw 生成可检查、可调整的业务工作流。
            生成的流程需要经过检查与试运行,再进入日常使用——这是对业务负责,不是对演示负责。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>跨项目复用</h2>
          <p className="fmc-p">
            一条流程在一个项目跑通后,可以在更多项目中复用,并保留统一的管理口径。
            对管理者来说,这意味着 500 个项目的周报口径,和 1 个项目一样。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">06</p>
          <h2>人工节点:人保留决定权</h2>
          <p className="fmc-p">
            人可以在审批、异常、高风险动作和最终确认等节点介入。
            智能体负责准备事实与建议,人保留决定权。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">07</p>
          <h2>稳定运行的机制</h2>
          <div className="fmc-tags">
            {STABLE.map((s) => <span key={s}>{s}</span>)}
          </div>
          <div className="fmc-status">
            <span>WORKFLOW CONTROLLED</span>
            <span>HUMAN IN THE LOOP</span>
            <span>VERSIONED</span>
            <span>LOGGED</span>
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">08</p>
          <h2>看这些流程实际怎么跑</h2>
          <ul className="fmc-rel-list" style={{ marginTop: 18 }}>
            <li><Link href="/scenarios/reconciliation">供应商对账 <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/scenarios/utility-bill">水电费审批 <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/scenarios/repair-bot">投诉报事 <span aria-hidden="true">→</span></Link></li>
            <li><Link href="/scenarios/dispatch">智能派单 <span aria-hidden="true">→</span></Link></li>
          </ul>
        </div>
      </section>

      <FmFaq items={FAQ} />

      <FmRelated
        updated="2026-07-20"
        links={[
          { label: "查看智能体运行与治理中心", href: "/products/fmclaw/agent-runtime" },
          { label: "查看行业工具与系统连接", href: "/products/fmclaw/connectors" },
          { label: "查看全部客户案例", href: "/cases" },
        ]}
      />
    </main>
  );
}
