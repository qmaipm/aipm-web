import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, techArticleLd, Arrow, IC, LinkCards } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/workflow-engine", {
  title: "行业级智能体工作流引擎｜FMClaw™ AI 业务流程自动化",
  description:
    "FMClaw 行业级智能体工作流引擎:把物业管理流程变成由 AI 运行的工作流。100+ 预制行业工作流,自然语言生成,multi-agent 多岗位协同,节点级人工审批,一个项目跑通后复制到多项目——AI 业务流程自动化。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/workflow-engine",
  headline: "行业级智能体工作流引擎:把管理流程,交给智能体运行",
  description:
    "智能体工作流,是真实业务中管理流程的抽象:派单制度、对账流程、巡检标准,变成一条由 AI 按步骤执行、按节点审批、按记录追溯的运行流程。",
});

const FAQ = [
  {
    q: "什么是智能体工作流?",
    a: "智能体工作流,是真实业务中管理流程的抽象:一条由 AI 按步骤执行、按节点审批、按记录追溯的运行流程。派单制度、对账流程、巡检标准,都可以变成一条工作流。",
  },
  {
    q: "为什么一个 Demo 不能直接进入生产?",
    a: "Demo 展示一次成功;生产要求每天都以同样的口径运行。触发、取数、判断、审批、异常处理和留痕,是工作流引擎补上的部分。",
  },
  {
    q: "业务人员可以自己搭工作流吗?",
    a: "可以。用自然语言描述要求,引擎生成可检查、可调整的流程,经检查与试运行后进入日常使用。",
  },
  {
    q: "什么是 multi-agent 协同?",
    a: "一条流程里可以有多个岗位智能体分工协作,像一个班组:各管一段,交出一份成果。",
  },
  {
    q: "工作流如何触发?",
    a: "定时、事件、消息、人工均可触发。该跑的时候自己跑,不依赖有人记得。",
  },
  {
    q: "人在流程中扮演什么角色?",
    a: "每个节点都可以设人工确认。AI 准备事实与建议,人做最后一步。",
  },
];

/* 预制行业工作流(10 条高频管理流程,一句话陈述) */
const PREBUILT = [
  { n: "01", t: "服务报价", d: "按标准与面积测算,生成可复核的报价。" },
  { n: "02", t: "运营日报", d: "每天自动产出结构一致的日报。" },
  { n: "03", t: "投诉报事", d: "识别、成单、派发、跟踪。" },
  { n: "04", t: "智能派单", d: "按技能、位置与负载匹配工单。" },
  { n: "05", t: "现场巡检", d: "计划、执行、复核一条线。" },
  { n: "06", t: "员工绩效", d: "按统一口径归集与核算。" },
  { n: "07", t: "薪酬核算", d: "出勤、绩效与规则自动核算。" },
  { n: "08", t: "供应商账单", d: "合同、单据、金额逐项核对。" },
  { n: "09", t: "水电费核算", d: "抄表、分摊、账单、审批。" },
  { n: "10", t: "能耗分析", d: "逐项目比对,标出异常。" },
];

/* 引擎的四项能力(能力陈述,不含实现方式) */
const ENGINE = [
  { n: "01", t: "自然语言生成", d: "一句话描述要求,生成可检查的流程。" },
  { n: "02", t: "多种触发", d: "定时、事件、消息、人工。该跑的时候自己跑。" },
  { n: "03", t: "节点级配置", d: "每个节点可配置取数、判断、生成、执行。" },
  { n: "04", t: "Multi-agent 协同", d: "多个岗位智能体,一个班组,一份成果。" },
];

/* 一条流程怎么跑(人工节点高亮) */
const FLOW = [
  { n: "01", t: "触发", who: "引擎", d: "定时、事件、消息或人工发起。" },
  { n: "02", t: "取数与判断", who: "智能体", d: "按本体口径取数,按规则判断。" },
  { n: "03", t: "生成", who: "智能体", d: "产出报告、账单、工单或建议。" },
  { n: "04", t: "审批", who: "人", human: true, d: "人核对事实与建议,做出决定。" },
  { n: "05", t: "执行与留痕", who: "引擎", d: "决定生效,每一步有记录。" },
];

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8.5l3.2 3.2L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

      {/* ===== HERO ===== */}
      <header className="fmc-hero">
        <span className="fmc-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="fmc-hero-cols">
            <div>
              <p className="fmc-kicker">L2 · Agentic Workflow Engine</p>
              <h1>把管理流程,交给<span className="grad">智能体运行</span></h1>
              <p className="fmc-def">
                智能体工作流,是<b>管理流程</b>的技术表达。
                制度怎么写,流程就怎么跑。
              </p>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/workflow-engine-hero.png"
                alt="智能体工作流引擎插画:节点式流程板,包含人工审批节点与分支路径"
                width={1200}
                height={896}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===== 01 定义 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>什么是智能体工作流?</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              智能体工作流,是真实业务中管理流程的抽象。派单制度、对账流程、巡检标准——
              变成一条由 AI 按步骤执行、按节点审批、按记录追溯的运行流程。
            </p>
          </div>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            「工作流」是翻译过来的词。事情本身,是你管了很多年的管理流程。
          </p>
        </div>
      </section>

      {/* ===== 02 预制工作流 + 真实界面 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>高频管理流程,已经预制好</h2>
          <figure className="fmo-console">
            <div className="fmo-console-bar" aria-hidden="true">
              <span className="fmo-dot" /><span className="fmo-dot" /><span className="fmo-dot" />
              <span className="fmo-console-title">FMCLAW™ · WORKFLOW EDITOR</span>
            </div>
            <img
              src="/products/fmclaw-workflow.png"
              alt="FMClaw™ 工作流编辑器真实界面:节点式流程画布,包含触发、取数、判断与人工审批节点"
              width={2600}
              height={1284}
              loading="lazy"
            />
            <figcaption>FMClaw™ 工作流编辑器 · 真实产品界面</figcaption>
          </figure>
          <div className="fmo-caps">
            {PREBUILT.map((c) => (
              <div className="fmo-cap" key={c.n}>
                <span className="fmo-cap-no">{c.n}</span>
                <div>
                  <b>{c.t}</b>
                  <p>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fmo-verdict">
            100+ 条,都在真实项目里跑通过。
          </p>
        </div>
      </section>

      {/* ===== 03 引擎能力 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>从一句话,到一条流程</h2>
          <p className="fmc-p">
            业务人员用自然语言描述要求,引擎生成可检查、可调整的流程。
          </p>
          <figure className="fmc-art">
            <img
              src="/products/fmclaw/workflow-nl.webp"
              alt="自然语言生成工作流插画:一句话输入展开为节点式流程平台"
              width={1376}
              height={768}
              loading="lazy"
            />
            <figcaption>一句话描述要求,生成可检查的流程</figcaption>
          </figure>
          <div className="fmo-caps">
            {ENGINE.map((c) => (
              <div className="fmo-cap" key={c.n}>
                <span className="fmo-cap-no">{c.n}</span>
                <div>
                  <b>{c.t}</b>
                  <p>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
          <figure className="fmc-art">
            <img
              src="/products/fmclaw/workflow-agents.webp"
              alt="Multi-agent 协同插画:多个岗位智能体沿流程轨道分工协作,输出一份成果"
              width={1376}
              height={768}
              loading="lazy"
            />
            <figcaption>多个岗位智能体,一个班组,一份成果</figcaption>
          </figure>
        </div>
      </section>

      {/* ===== 04 人在回路 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>每个节点,都可以设人工确认</h2>
          <div className="fmo-howgrid">
            <div className="fmo-howside">
              <p className="fmo-howcase">
                审批、异常、高风险动作——AI 停在<b>待确认</b>,等人决定。
              </p>
              <p className="fmo-verdict">
                AI 做到待确认,人做最后一步。
              </p>
              <p className="fmo-hownote">
                人工节点的位置与规则,按企业制度配置。
              </p>
            </div>
            <div className="fmo-flow">
              {FLOW.map((s) => (
                <div className={`fmo-fstep${s.human ? " human" : ""}`} key={s.n}>
                  <span className="fmo-fno">{s.n}</span>
                  <div className="fmo-fbody">
                    <div className="fmo-fhead">
                      <h3>{s.t}</h3>
                      <span className="fmo-fwho">{s.who}</span>
                    </div>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 集团复制(暗场) ===== */}
      <section className="fmc-sec dark">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>一个项目跑通,复制到全集团</h2>
          <p className="fmc-p">
            项目间数据隔离,口径统一。
          </p>
          <figure className="fmc-art">
            <img
              src="/products/fmclaw/workflow-replicate.webp"
              alt="集团复制插画:中心的主工作流向多个项目平台辐射复制"
              width={1376}
              height={768}
              loading="lazy"
            />
          </figure>
          <ul className="fmo-checks">
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>多项目复制</b><span className="d">一条流程验证后,复制到更多项目,不重新搭建。</span></span>
            </li>
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>口径一致</b><span className="d">指标定义与管理要求全集团统一,一处修改,处处生效。</span></span>
            </li>
            <li>
              <span className="ck" aria-hidden="true"><Check /></span>
              <span><b>结果确定</b><span className="d">同样的输入,同样的口径,同样的结果。可复核。</span></span>
            </li>
          </ul>
          <p className="fmo-verdict">
            500 个项目的周报口径,和 1 个项目一样。
          </p>
        </div>
      </section>

      {/* ===== 06 场景 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">06</p>
          <h2>看这些流程实际怎么跑</h2>
          <LinkCards items={[
            { href: "/scenarios/reconciliation", lab: "场景", t: "供应商对账", d: "合同、单据、金额逐项核对,差异待人确认。", icon: IC.reconcile },
            { href: "/scenarios/utility-bill", lab: "场景", t: "水电费审批", d: "抄表到账单一条线,审批留在人的手里。", icon: IC.doc },
            { href: "/scenarios/repair-bot", lab: "场景", t: "投诉报事", d: "识别、成单、派发、跟踪,全程有记录。", icon: IC.chat },
            { href: "/scenarios/dispatch", lab: "场景", t: "智能派单", d: "按技能、位置与负载匹配,派得出也追得回。", icon: IC.flow },
          ]} />
        </div>
      </section>

      <FmFaq items={FAQ} />

      {/* ===== 继续了解 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">KEEP EXPLORING</p>
          <h2>流程之下,是连接与治理</h2>
          <p className="fmc-p">
            工作流引擎组织工作,连接层供给工具,运行层保证可控。
          </p>
          <LinkCards items={[
            { href: "/products/fmclaw/connectors", lab: "平台能力 · L3", t: "工具与系统连接", d: "工作流节点调用的系统、工具与数据,从这里接入。", icon: IC.grid },
            { href: "/products/fmclaw/agent-runtime", lab: "平台能力 · L4", t: "运行与治理", d: "运行记录、版本管理与权限控制,让流程长期可控。", icon: IC.shield },
          ]} />
          <p className="fmc-rel-back">
            <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
          </p>
        </div>
      </section>

      <div className="fmo-upd">
        <div className="wrap">
          <p className="fmc-updated">最后更新:2026-07-20</p>
        </div>
      </div>

      {/* ===== 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>把一条管理流程,交给 AI 跑一遍</h2>
          <p>从一条真实流程开始验证。</p>
          <div className="cta-row">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <p className="alt">或先看看<Link href="/cases">已经在生产中运行的案例</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
