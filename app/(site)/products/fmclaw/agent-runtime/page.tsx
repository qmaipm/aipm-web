import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, FmRelated, techArticleLd } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/agent-runtime", {
  title: "智能体运行与治理中心｜FMClaw™ Agent Runtime、权限与审计",
  description:
    "FMClaw 统一管理智能体的运行、组织身份、项目权限、人工介入、工作日志、监控与审计，让 AI 可以安全进入企业核心业务。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/agent-runtime",
  headline: "智能体运行与治理中心",
  description:
    "智能体运行与治理中心,是 FMClaw 管理智能体身份、权限、任务、运行状态、人工介入和审计记录的统一控制层。",
});

const FAQ = [
  {
    q: "智能体如何管理权限?",
    a: "每个智能体都归属于明确的组织、岗位、项目或业务流程,不以匿名身份访问企业数据。按总部、区域、项目、部门、岗位和个人分层控制,不同角色看到不同的数据,能够调用的工具和执行的动作也不同。",
  },
  {
    q: "智能体的工作如何审计?",
    a: "任务发起者、智能体身份、数据来源、工作流版本、工具调用、人工审批、结果写回和异常记录均有留痕。每一次读取、判断、执行和确认都可以追溯。",
  },
  {
    q: "人可以随时介入智能体的工作吗?",
    a: "可以。管理者可以查看、暂停、确认、驳回或接管任务。决定权可以根据业务风险保留在人手中。",
  },
  {
    q: "同一条工作流可以在多个项目运行吗?",
    a: "可以。同一业务工作流可以在多个项目中持续运行,并保持统一的指标定义和管理要求;项目之间数据隔离。",
  },
  {
    q: "企业为什么敢让智能体进入核心业务?",
    a: "因为运行是受控的:智能体有组织身份、有项目权限边界、有人工介入节点,工作过程有日志、结果可复核。准确、一致、可追溯,是 FMClaw 对生产运行的三项基本保证。",
  },
];

const SCOPES = ["总部", "区域", "项目", "部门", "岗位", "个人"];
const DISPATCH = ["任务队列", "优先级", "运行状态", "异常任务", "人工介入", "资源使用"];
const AUDIT = ["任务发起者", "智能体身份", "数据来源", "工作流版本", "工具调用", "人工审批", "结果写回", "异常记录"];

export default function Page() {
  return (
    <main className="fmc">
      <JsonLd data={TECH_LD} />
      <div className="wrap">
        <FmBreadcrumb
          trail={[
            { name: "FMClaw™ 产品总览", href: "/products/fmclaw" },
            { name: "智能体运行与治理中心", href: "/products/fmclaw/agent-runtime" },
          ]}
        />
      </div>

      <header className="fmc-hero">
        <div className="wrap">
          <p className="fmc-kicker">Agent Runtime &amp; Governance</p>
          <h1>让每个智能体都可运行、可管理、可追溯</h1>
          <p className="fmc-def">
            智能体运行与治理中心是 FMClaw™ 的控制层。它统一管理智能体的组织身份、
            项目权限、任务调度、人工介入、工作日志与审计记录——回答的是同一个问题:
            企业为什么敢让智能体进入核心业务。
          </p>
        </div>
      </header>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>什么是智能体运行与治理中心?</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              智能体运行与治理中心,是 FMClaw 管理智能体身份、权限、任务、运行状态、
              人工介入和审计记录的统一控制层。
            </p>
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>组织身份:智能体不是匿名的</h2>
          <p className="fmc-p">
            每个智能体都归属于明确的组织、岗位、项目或业务流程,不以匿名身份访问企业数据。
            它像一名员工一样,有自己的身份、职责范围和上级。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>项目与角色权限</h2>
          <p className="fmc-p">
            不同角色看到不同的数据,能够调用的工具和执行的动作也不同。权限按层级划分:
          </p>
          <div className="fmc-tags">
            {SCOPES.map((s) => <span key={s}>{s}</span>)}
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>多项目运行</h2>
          <p className="fmc-p">
            同一业务工作流可以在多个项目中持续运行,并保持统一的指标定义和管理要求。
            规模不改变口径——这是集团型客户最关心的一点。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>业务调度</h2>
          <div className="fmc-tags">
            {DISPATCH.map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">06</p>
          <h2>工作日志</h2>
          <p className="fmc-p">
            可以查看每个智能体在什么时间接收了什么任务、读取了哪些业务数据、调用了哪些工具、
            经过哪些人工确认,以及最终产生什么结果。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">07</p>
          <h2>审计与追溯</h2>
          <p className="fmc-p">以下要素全部留痕:</p>
          <div className="fmc-tags">
            {AUDIT.map((a) => <span key={a}>{a}</span>)}
          </div>
          <div className="fmc-status">
            <span>IDENTITY BOUND</span>
            <span>FULLY LOGGED</span>
            <span>AUDIT READY</span>
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">08</p>
          <h2>人工介入:决定权在人手中</h2>
          <p className="fmc-p">
            管理者可以查看、暂停、确认、驳回或接管任务。决定权可以根据业务风险保留在人手中。
            例如供应商付款:智能体核量、比对、找异常、起草账单,最终付款决定由负责人作出——
            见<Link className="fmc-ln" href="/cases/coworking-supplier-reconciliation">供应商对账真实案例</Link>。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">09</p>
          <h2>准确、一致、可追溯</h2>
          <div className="fmc-cols3">
            <div className="fmc-cell">
              <span className="fmc-cell-en">ACCURATE</span>
              <h3>准确</h3>
              <p>关键指标和业务结果可以复核。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">CONSISTENT</span>
              <h3>一致</h3>
              <p>跨项目、跨时间按照同一管理口径运行。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">TRACEABLE</span>
              <h3>可追溯</h3>
              <p>每一次读取、判断、执行和确认都有记录。</p>
            </div>
          </div>
        </div>
      </section>

      <FmFaq items={FAQ} />

      <FmRelated
        updated="2026-07-20"
        links={[
          { label: "查看行业级智能体工作流引擎", href: "/products/fmclaw/workflow-engine" },
          { label: "查看物业管理智能体矩阵", href: "/agents" },
          { label: "阅读 Demo 与生产系统的区别", href: "/insights/demo-vs-system" },
        ]}
      />
    </main>
  );
}
