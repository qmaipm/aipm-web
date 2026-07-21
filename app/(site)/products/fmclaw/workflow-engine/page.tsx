import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, techArticleLd, Arrow, IC, LinkCards } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/workflow-engine", {
  title: "智能体工作流引擎｜FMClaw™ 让智能体从会聊天到会干活",
  description:
    "没有工作流引擎，智能体只是会聊天的顾问；接上它，才是会干活的员工。FMClaw 智能体工作流引擎：100+ 预制行业工作流覆盖日报周报、收费对账、巡检派单，自然语言生成，关键节点人工确认，一个项目跑通后复制到更多项目。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/workflow-engine",
  headline: "智能体工作流引擎：让智能体从会聊天到会干活",
  description:
    "聊天式 AI 停在建议上；工作流引擎决定一项工作什么时候开始、数据从哪取、哪一步要人确认、结果进入哪个系统。日报周报、收费对账、巡检派单，变成由 AI 按步骤运行的流程。",
});

const FAQ = [
  {
    q: "智能体和工作流有什么区别？为什么不能让大模型直接干？",
    a: "大模型能理解和生成，但它不会自己开始、不会自己取数，结果也不会自己进系统。工作流引擎把数据和工具绑定到具体的任务节点上，AI 才从回答问题变成完成工作。",
  },
  {
    q: "AI 工作流会不会出错？出了错谁负责？",
    a: "人负责。关键节点设人工确认，AI 停在待确认，人核对后才生效；每一步都有记录，可以随时查到是谁、在哪一步、批准了什么。",
  },
  {
    q: "日报周报这类流程，AI 能做到什么程度？",
    a: "从各业务系统自动取数、按统一口径汇总、生成结构一致的日报周报，人只看结果和异常。这是 100+ 预制工作流里使用最多的一类。",
  },
  {
    q: "为什么一个 Demo 不能直接进入生产？",
    a: "Demo 展示一次成功；生产要求每天都以同样的口径运行。触发、取数、判断、审批、异常处理和执行记录，是工作流引擎补上的部分。",
  },
  {
    q: "业务人员可以自己搭工作流吗？",
    a: "可以。用自然语言描述要求，引擎生成可检查、可调整的流程，经检查与试运行后进入日常使用。",
  },
  {
    q: "什么是 multi-agent 协同？",
    a: "一条流程里可以有多个岗位智能体分工协作，像一个班组：各管一段，交出一份成果。",
  },
];

/* 预制工作流按业务域归组（10 条，来自真实项目） */
const WF_GROUPS = [
  {
    no: "GROUP 01",
    t: "日常运营",
    goal: "每天都要出、最耗人的活，用得最多的一组。",
    items: [
      { b: "运营日报与周报", p: "各系统自动取数，产出结构一致的日报周报。" },
      { b: "现场巡检", p: "计划、执行、复核一条线。" },
      { b: "投诉报事", p: "识别、成单、派发、跟踪。" },
      { b: "智能派单", p: "按技能、位置与负载匹配工单。" },
    ],
  },
  {
    no: "GROUP 02",
    t: "收费与对账",
    goal: "钱的事，口径必须一致，差异必须有人确认。",
    items: [
      { b: "水电费核算", p: "抄表、分摊、账单、审批。" },
      { b: "供应商账单", p: "合同、单据、金额逐项核对。" },
      { b: "服务报价", p: "按标准与面积测算，生成可复核的报价。" },
    ],
  },
  {
    no: "GROUP 03",
    t: "人与经营",
    goal: "月度要看的数，按统一口径归集。",
    items: [
      { b: "员工绩效", p: "按统一口径归集与核算。" },
      { b: "薪酬核算", p: "出勤、绩效与规则自动核算。" },
      { b: "能耗分析", p: "逐项目比对，标出异常。" },
    ],
  },
];

/* 一条流程怎么跑（人工节点高亮） */
const FLOW = [
  { n: "01", t: "触发", who: "引擎", d: "定时、事件、消息或人工发起。" },
  { n: "02", t: "取数与判断", who: "智能体", d: "按本体口径取数，按规则判断。" },
  { n: "03", t: "生成", who: "智能体", d: "产出报告、账单、工单或建议。" },
  { n: "04", t: "审批", who: "人", human: true, d: "人核对事实与建议，做出决定。" },
  { n: "05", t: "执行与记录", who: "引擎", d: "决定生效，每一步有记录。" },
];

/* 顾问与员工：三个来自客户交流的现场 */
const PAINS = [
  {
    q: "问它什么都会答，可活还是人在干",
    t: "只会回答",
    d: "聊天式 AI 停在建议上：它说得都对，但日报还是人写，账单还是人核，工单还是人派。",
  },
  {
    q: "每天的日报周报，还是人在各个系统里扒数",
    t: "重复的活最耗人",
    d: "日报、周报、月度经营汇总——数据分散在多个系统里，每天人工汇总一遍，格式还不一致。",
  },
  {
    q: "演示的时候很惊艳，回到项目上没人用",
    t: "落不了地",
    d: "Demo 靠人喂数据、人来触发；生产要求它自己开始、自己取数、错了有人管。差的正是这一层。",
  },
];

const CMP_LABEL = { "--cmp-old-label": '"聊天式 AI · "' } as CSSProperties;

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
            { name: "智能体工作流引擎", href: "/products/fmclaw/workflow-engine" },
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
              <h1>智能体不该只会聊天，<span className="grad">它该去干活</span></h1>
              <p className="fmc-def">
                没有工作流引擎，智能体只是会聊天的顾问；
                接上它，才是<b>会干活的员工</b>。
              </p>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/workflow-engine-hero.webp"
                alt="智能体工作流引擎插画：左侧闲置的聊天窗口，经过流水线式工作流节点产出报告与账单，人在确认节点做决定"
                width={1200}
                height={896}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===== 01 问题：顾问不是员工 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>你现在的 AI，是顾问，不是员工</h2>
          <p className="fmc-p">
            这是我们在行业客户那里听得最多的三句话。
          </p>
          <div className="fmo-pain">
            {PAINS.map((p) => (
              <div className="fmo-painc" key={p.t}>
                <p className="fmo-pain-q"><span className="qm">「</span>{p.q}<span className="qm">」</span></p>
                <p className="fmo-pain-t">{p.t}</p>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
          <p className="fmo-verdict">
            差的不是模型，是把活组织起来的那一层。
          </p>
        </div>
      </section>

      {/* ===== 02 定义 + 对比 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>什么是智能体工作流引擎？</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              智能体工作流引擎，是让智能体把活干起来的运行层：它决定一项工作什么时候开始（触发）、
              数据从哪取（取数）、按什么规则判断、哪一步要人确认、结果进入哪个系统。
              派单制度、对账流程、巡检标准，都能变成一条这样运行的流程。
            </p>
          </div>
          <div className="fmo-cmp" role="table" aria-label="聊天式 AI 与工作流引擎的差别" style={CMP_LABEL}>
            <div className="fmo-cmp-row fmo-cmp-head" role="row">
              <div role="columnheader">同一件事</div>
              <div role="columnheader">聊天式 AI</div>
              <div className="now" role="columnheader">工作流引擎</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">谁来开始</div>
              <div className="fmo-cmp-old" role="cell">人想起来才去问</div>
              <div className="fmo-cmp-new" role="cell"><b>定时、事件、消息自动触发</b>，该跑的时候自己跑</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">数据从哪来</div>
              <div className="fmo-cmp-old" role="cell">人把数据贴进对话框</div>
              <div className="fmo-cmp-new" role="cell">按统一口径<b>从业务系统自动取数</b></div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">结果去哪</div>
              <div className="fmo-cmp-old" role="cell">停在聊天窗口里</div>
              <div className="fmo-cmp-new" role="cell">变成<b>报告、账单、工单</b>，进入业务系统</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">出了错</div>
              <div className="fmo-cmp-old" role="cell">没人知道，也没人负责</div>
              <div className="fmo-cmp-new" role="cell">关键节点<b>人来确认</b>，每一步有记录</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">明天还一样吗</div>
              <div className="fmo-cmp-old" role="cell">问法不同，答案就不同</div>
              <div className="fmo-cmp-new" role="cell">同一条流程、<b>同一个口径</b>，天天一样</div>
            </div>
          </div>
          <p className="fmo-verdict">
            把聊天变成流程，AI 才从顾问变成员工。
          </p>
        </div>
      </section>

      {/* ===== 03 预制工作流（按业务域归组）+ 真实界面 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>高频管理流程，已经预制好</h2>
          <p className="fmc-p">
            用得最多的是每天都要出的日报周报，其次是收费与对账。
            每一条都可以直接启用，也可以按你的制度调整。
          </p>
          <figure className="fmo-console">
            <div className="fmo-console-bar" aria-hidden="true">
              <span className="fmo-dot" /><span className="fmo-dot" /><span className="fmo-dot" />
              <span className="fmo-console-title">FMCLAW™ · WORKFLOW EDITOR</span>
            </div>
            <img
              src="/products/fmclaw-workflow.png"
              alt="FMClaw™ 工作流编辑器真实界面：节点式流程画布，包含触发、取数、判断与人工审批节点"
              width={2600}
              height={1284}
              loading="lazy"
            />
            <figcaption>FMClaw™ 工作流编辑器 · 真实产品界面</figcaption>
          </figure>
          <div className="fmo-capgrp">
            {WF_GROUPS.map((g) => (
              <div className="fmo-cg" key={g.no}>
                <div className="fmo-cg-head">
                  <span className="fmo-cg-no">{g.no}</span>
                  <h3>{g.t}</h3>
                  <p className="fmo-cg-goal">{g.goal}</p>
                </div>
                <ul className="fmo-cg-list">
                  {g.items.map((it) => (
                    <li key={it.b}>
                      <b>{it.b}</b>
                      <p>{it.p}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="fmo-verdict">
            100+ 条，都在真实项目里跑通过——不是模板库，是跑过的路。
          </p>
        </div>
      </section>

      {/* ===== 04 从一句话到一条流程 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>从一句话，到一条流程</h2>
          <p className="fmc-p">
            预制之外的流程，不用等 IT 排期。
          </p>
          <div className="fmo-lrows">
            <div className="fmo-lrow">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/workflow-nl.webp"
                  alt="自然语言生成工作流插画：一句话输入展开为节点式流程平台"
                  width={1376}
                  height={768}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <ul className="fmo-lsub">
                  <li>
                    <span className="fmo-cap-no">01</span>
                    <div><b>自然语言生成</b><p>一句话描述要求，生成可检查的流程。</p></div>
                  </li>
                  <li>
                    <span className="fmo-cap-no">02</span>
                    <div><b>多种触发</b><p>定时、事件、消息、人工。该跑的时候自己跑。</p></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="fmo-lrow flip">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/workflow-agents.webp"
                  alt="Multi-agent 协同插画：多个岗位智能体沿流程轨道分工协作，输出一份成果"
                  width={1376}
                  height={768}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <ul className="fmo-lsub">
                  <li>
                    <span className="fmo-cap-no">03</span>
                    <div><b>节点级配置</b><p>每个节点可配置取数、判断、生成、执行。</p></div>
                  </li>
                  <li>
                    <span className="fmo-cap-no">04</span>
                    <div><b>Multi-agent 协同</b><p>多个岗位智能体，一个班组，一份成果。</p></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 人在回路 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>每个节点，都可以设人工确认</h2>
          <div className="fmo-howgrid">
            <div className="fmo-howside">
              <p className="fmo-howcase">
                审批、异常、高风险动作——AI 停在<b>待确认</b>，等人决定。
              </p>
              <p className="fmo-verdict">
                AI 做到待确认，人做最后一步。
              </p>
              <p className="fmo-hownote">
                人工节点的位置与规则，按企业制度配置。
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

      {/* ===== 06 集团复制（暗场） ===== */}
      <section className="fmc-sec dark">
        <div className="wrap">
          <p className="fmc-num">06</p>
          <h2>一个项目跑通，复制到全集团</h2>
          <p className="fmc-p">
            项目间数据隔离，口径统一。
          </p>
          <div className="fmo-lrows">
            <div className="fmo-lrow">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/workflow-replicate.webp"
                  alt="集团复制插画：中心的主工作流向多个项目平台辐射复制"
                  width={1376}
                  height={768}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <ul className="fmo-checks" style={{ marginTop: 0 }}>
                  <li>
                    <span className="ck" aria-hidden="true"><Check /></span>
                    <span><b>多项目复制</b><span className="d">一条流程验证后，复制到更多项目，不重新搭建。</span></span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true"><Check /></span>
                    <span><b>口径一致</b><span className="d">指标定义与管理要求全集团统一，一处修改，处处生效。</span></span>
                  </li>
                  <li>
                    <span className="ck" aria-hidden="true"><Check /></span>
                    <span><b>结果确定</b><span className="d">同样的输入，同样的口径，同样的结果。可复核。</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="fmo-verdict">
            500 个项目的周报口径，和 1 个项目一样。
          </p>
        </div>
      </section>

      {/* ===== 07 场景 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">07</p>
          <h2>看这些流程实际怎么跑</h2>
          <LinkCards items={[
            { href: "/scenarios/reconciliation", lab: "场景", t: "供应商对账", d: "合同、单据、金额逐项核对，差异待人确认。", icon: IC.reconcile },
            { href: "/scenarios/utility-bill", lab: "场景", t: "水电费审批", d: "抄表到账单一条线，审批留在人的手里。", icon: IC.doc },
            { href: "/scenarios/repair-bot", lab: "场景", t: "投诉报事", d: "识别、成单、派发、跟踪，全程有记录。", icon: IC.chat },
            { href: "/scenarios/dispatch", lab: "场景", t: "智能派单", d: "按技能、位置与负载匹配，派得出也追得回。", icon: IC.flow },
          ]} />
        </div>
      </section>

      <FmFaq items={FAQ} />

      {/* ===== 继续了解 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">KEEP EXPLORING</p>
          <h2>流程之下，是连接与治理</h2>
          <p className="fmc-p">
            工作流引擎组织工作，连接层供给工具，运行层保证可控。
          </p>
          <LinkCards items={[
            { href: "/products/fmclaw/connectors", lab: "平台能力 · L3", t: "工具箱", d: "工作流节点要调用的软件工具，从这里接入。", icon: IC.grid },
            { href: "/products/fmclaw/agent-runtime", lab: "平台能力 · L4", t: "控制台", d: "流程跑得怎么样、谁批准过什么，随时可以查。", icon: IC.shield },
          ]} />
          <p className="fmc-rel-back">
            <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
          </p>
        </div>
      </section>

      <div className="fmo-upd">
        <div className="wrap">
          <p className="fmc-updated">最后更新：2026-07-21</p>
        </div>
      </div>

      {/* ===== 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>把一条管理流程，交给 AI 跑一遍</h2>
          <p>从一条真实的日报流程开始验证。</p>
          <div className="cta-row">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <p className="alt">或先看看<Link href="/cases">已经在生产中运行的案例</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
