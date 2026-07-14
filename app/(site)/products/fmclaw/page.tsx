import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "FMClaw™ · 物业与设施管理的行业级 AI 平台 — 启盟科技",
  description:
    "FMClaw 是面向物业与设施管理的行业级 AI 平台，把日常运营里大量重复、繁琐的活儿变成能直接跑的工作流——100+ 条工作流覆盖几十个岗位，多个专业 Agent 接力协同，模型 / 数据 / 工具灵活配置，并能感知现场、在物理世界里动手。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 四个专业 Agent(内容与格式对齐《AI 物业经理 FMClaw》Part 4),各配一种渐变色,卡片直接链到对应 Agent 页。
const AGENTS: {
  step: string;
  name: string;
  href: string;
  grad: string;
  desc: string;
  products: [string, string][];
}[] = [
  {
    step: "STEP 01",
    name: "服务设计 Agent",
    href: "/solutions/service-design",
    grad: "linear-gradient(135deg,#0070FF,#12B98A)",
    desc: "根据项目业态、面积、设备清单与业主需求，自动生成服务标准、人员配置方案与 SOP 体系。每个项目获得独立定制的管理基线。",
    products: [["空间管理系统", "空间配置"], ["服务配置系统", "流程与标准设计"], ["API 开放平台", "标准数据接口"]],
  },
  {
    step: "STEP 02",
    name: "运营管理 Agent",
    href: "/solutions/operations",
    grad: "linear-gradient(135deg,#12B98A,#F59E0B)",
    desc: "实时调度巡检、保洁、维修、安防等现场任务。对接 IoT 传感器与工单系统，把服务标准转化为每日可执行、可追踪的工作流。",
    products: [["SSR 服务记录", "无感记录全过程"], ["工单调度系统", "任务自动分配"], ["人机协同引擎", "多端协同效率高"]],
  },
  {
    step: "STEP 03",
    name: "质量评估 Agent",
    href: "/solutions/assessment",
    grad: "linear-gradient(135deg,#9333EA,#EC4899)",
    desc: "基于 IoT 数据、工单完成率、住户反馈与巡检记录，独立生成服务质量评估报告。评估标准由数据驱动，业主可直接获取。",
    products: [["设备管理系统", "智能抄表监测"], ["多模态巡检", "AI 视觉识别"], ["小智帮手", "一线移动端助手"]],
  },
  {
    step: "STEP 04",
    name: "服务优化 Agent",
    href: "/solutions/optimization",
    grad: "linear-gradient(135deg,#0070FF,#9333EA)",
    desc: "汇总质量评估数据与运营趋势，识别重复性问题与资源浪费，生成优化建议并反馈至服务设计 Agent——闭环由此成立。",
    products: [["计薪系统", "薪酬 KPI 自动化"], ["数据大屏", "展现卓越服务能力"], ["API 开放平台", "第三方集成接口"]],
  },
];

// 四个 Agent 的图标——沿用站内原有 Agent 套件(_agents-app/Products)的图标
const AGENT_ICONS = [
  // 服务设计
  <svg key="i1" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18" cy="6" r="3" fill="#10B981" /></svg>,
  // 运营管理
  <svg key="i2" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" fill="currentColor" /><path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  // 质量评估
  <svg key="i3" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.5 12L10.5 14L15.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // 服务优化
  <svg key="i4" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7" cy="14" r="1.5" fill="currentColor" /><circle cx="10" cy="11" r="1.5" fill="currentColor" /><circle cx="13" cy="14" r="1.5" fill="currentColor" /><circle cx="17" cy="10" r="1.5" fill="currentColor" /></svg>,
];

export default function Page() {
  return (
    <main className="fmx">
      {/* ===== HERO · 工作流矩阵(签名时刻) ===== */}
      <section className="fm-hero">
        <div className="fm-grid" aria-hidden="true" />
        <div className="wrap fm-hero-top">
          <span className="fm-kicker">FMClaw™ AI 平台<i>/</i>物业与设施管理 · 行业级 AI 平台</span>
          <h1 className="fm-h1">
            你每天要做的那些活儿，<br /><span className="grad">它已经一条条跑通了</span>
          </h1>
          <p className="fm-lead">
            FMClaw 把物业与设施管理里大量<b>重复、繁琐的活儿</b>，变成能直接跑的工作流——它懂这行的细节，还能<b>感知现场、在现场动手</b>。不用你从零搭，拿来就用。
          </p>
          <div className="fm-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#cap-1" className="btn btn-ghost">看工作流 <Arrow /></a>
          </div>
        </div>

        <div className="wrap">
          <div className="fm-proof">
            <span><b className="grad">100+</b> 条工作流</span>
            <span className="sep" />
            <span>覆盖<b>几十个</b>工作岗位</span>
            <span className="sep" />
            <span>七八年现场<b>一条条跑出来</b></span>
          </div>
        </div>
      </section>

      {/* ===== 定位 · 不是空架子(them vs us) ===== */}
      <section className="fm-band mist">
        <div className="wrap">
          <span className="fm-eyebrow">和通用 AI 平台有什么不同</span>
          <h2 className="fm-h2">拿来就能用，不用你自己从零搭</h2>
          <div className="fm-versus">
            <div className="fm-vs them">
              <span className="fm-vs-tag">通用 Agent 平台</span>
              <p className="fm-vs-line">给你一个工具箱</p>
              <p className="fm-vs-sub">能力原料齐全，但要你自己从零组装、自己撞墙试错。</p>
            </div>
            <div className="fm-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="fm-vs us">
              <span className="fm-vs-tag">FMClaw</span>
              <p className="fm-vs-line">给你跑通的工作流本身</p>
              <p className="fm-vs-sub">开箱即是行业能力——已经在物业与设施管理里跑通，拿来就用。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 第一能力 · 工作流 ===== */}
      <section className="fm-band" id="cap-1">
        <div className="wrap">
          <div className="fm-caphead">
            <span className="fm-capno">能力 01</span>
            <h2 className="fm-h2">100+ 条工作流，覆盖几十个工作岗位</h2>
            <p className="fm-sub">这是七八年在真实现场里一条条跑出来的积累，不是设想。既宽——覆盖的岗位多；又深——每一条都打到行业细节。</p>
          </div>

          {/* 真实工作流编辑器截图(眼见为实) */}
          <figure className="fm-shot">
            <img
              src="/products/fmclaw-workflow.png"
              alt="FMClaw 工作流编辑器:左侧物业 17 个业务分类,右侧一条「现场品质巡检」工作流——定时触发、拉取并分类风险点、审批、批量建工单"
              loading="lazy"
            />
          </figure>

          {/* Skill × Data × Tools = 工作流(核心洞察) */}
          <div className="fm-formula">
            <span className="fm-fx">Skill</span>
            <i className="fm-op">×</i>
            <span className="fm-fx">行业 Data</span>
            <i className="fm-op">×</i>
            <span className="fm-fx">行业 Tools</span>
            <i className="fm-eq">=</i>
            <span className="fm-fx res">一条工作流</span>
          </div>
          <p className="fm-formula-note">不是一句提示词。每一条工作流，都是这三样东西在行业里的特定组合。</p>
        </div>
      </section>

      {/* ===== 第二能力 · A2A ===== */}
      <section className="fm-band mist">
        <div className="wrap">
          <div className="fm-caphead">
            <span className="fm-capno">能力 02</span>
            <h2 className="fm-h2">四个专业 Agent，接力跑完一个闭环</h2>
            <p className="fm-sub">从标准制定到持续优化，四个 Agent 完成一个管理闭环：每一次服务执行都被记录、每一个异常都被识别、每一轮优化都基于数据而非经验。闭环自动运转，人只在关键节点决策。</p>
          </div>
          <div className="fm-agents">
            {AGENTS.map((a, i) => (
              <Link className="fm-agent" href={a.href} key={a.name}>
                <div className="fm-agent-head" style={{ background: a.grad }}>
                  <span className="fm-agent-ic" aria-hidden="true">{AGENT_ICONS[i]}</span>
                  <h3 className="fm-agent-name">{a.name}</h3>
                  <span className="fm-agent-step">{a.step}</span>
                </div>
                <div className="fm-agent-body">
                  <p className="fm-agent-desc">{a.desc}</p>
                  <ul className="fm-agent-prod">
                    {a.products.map(([n, d]) => (
                      <li key={n}><b>{n}</b> · {d}</li>
                    ))}
                  </ul>
                  <span className="fm-agent-link">进入{a.name.replace(" Agent", "")} <Arrow s={13} /></span>
                </div>
              </Link>
            ))}
          </div>
          <p className="fm-foot"><Link href="/agents" className="fm-link">看四 Agent 闭环总览 <Arrow s={13} /></Link></p>
        </div>
      </section>

      {/* ===== 第三能力 · 灵活配置 ===== */}
      <section className="fm-band">
        <div className="wrap">
          <div className="fm-caphead">
            <span className="fm-capno">能力 03</span>
            <h2 className="fm-h2">模型、数据、工具，三层都可换得更强</h2>
            <p className="fm-sub">三层都做成可替换、可扩展的配置项——上层的工作流与体验保持稳定，底层能力可以随时被换得更强。用很低的成本，把能力上限拉到行业级。</p>
          </div>
          <div className="fm-cfg">
            <div className="fm-cfgrow">
              <div className="fm-cfgk"><span className="fm-cfgn">01</span><h3>配置模型</h3></div>
              <p>一个入口接入多家顶级模型（GPT / Claude / Gemini / DeepSeek / Qwen），按场景智能路由。换模型，不换上层体验。</p>
            </div>
            <div className="fm-cfgrow">
              <div className="fm-cfgk"><span className="fm-cfgn">02</span><h3>配置数据</h3></div>
              <p>数据 Agent 把散乱数据变成可用数据，进数据集市，所有 Agent 自助调用——一处治理，处处可用。</p>
            </div>
            <div className="fm-cfgrow">
              <div className="fm-cfgk"><span className="fm-cfgn">03</span><h3>配置工具</h3></div>
              <p>大量预制行业工具，按标准 / 轻量 / 定制三档接入，按需取用，不必为每个场景从零造工具。</p>
            </div>
          </div>
          <div className="fm-collab">
            <p>FMClaw 也能与钉钉、飞书、企业微信 AI 协同，<b>不替换</b>客户现有平台——只补上行业业务那一段。</p>
            <Link href="/products/collaboration" className="fm-link">看三种接入方式 <Arrow s={13} /></Link>
          </div>
        </div>
      </section>

      {/* ===== 为什么别人做不到 · 壁垒是时间 ===== */}
      <section className="fm-core">
        <div className="fm-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="fm-eyebrow on-dark">为什么不自建</span>
          <h2 className="fm-h2 on-dark">企业自建 Agent 平台，会撞到<span className="grad">四道结构性的墙</span></h2>
          <p className="fm-coreintro">不是模型在变——模型、框架、记忆、协议、检索、评估同时在变，每六个月范式就重写一次。</p>
          <div className="fm-barriers">
            <div className="fm-barrier">
              <span className="fm-bn">01</span>
              <div className="fm-bc">
                <h3>模型墙 · 模型每周一个 SOTA</h3>
                <p>GPT-5、Claude、Gemini、Kimi、DeepSeek……最强模型几乎每周更迭一次。自建团队刚适配完一个，下一个 SOTA 就出来了——永远在追，永远不是最优。</p>
              </div>
            </div>
            <div className="fm-barrier">
              <span className="fm-bn">02</span>
              <div className="fm-bc">
                <h3>框架墙 · 范式每月一变</h3>
                <p>Claude Code、Cursor、LangGraph、AutoGen……编排、状态、工具调用、错误恢复，每条子赛道都有框架在打架；今天选定的，可能半年后就被淘汰。</p>
              </div>
            </div>
            <div className="fm-barrier">
              <span className="fm-bn">03</span>
              <div className="fm-bc">
                <h3>记忆与协议墙 · 6+ 条子栈同时演化</h3>
                <p>Mem0、Letta、MCP、Apps SDK、GraphRAG……记忆栈与协议栈同时在变，Mem0 还没定 Letta 就来了、MCP 还在草案——光工具调用协议本身就在打架。</p>
              </div>
            </div>
            <div className="fm-barrier">
              <span className="fm-bn">04</span>
              <div className="fm-bc">
                <h3>时间墙 · 客户只想「今天就用」</h3>
                <p>Gartner 预测，40%+ 的 Agentic AI 项目会在 2027 年前被取消。「6 个月 PoC + 12 个月上线 + 24 个月二开」的老节奏已经死了——客户的预算窗口，比技术演化窗口短得多。</p>
              </div>
            </div>
          </div>
          <p className="fm-verdict">四道墙都在变厚。自建团队要同时追 模型 · 框架 · 记忆 · 协议 · 检索 · 评估 六条子赛道——这不是工程能力问题，是<span className="grad">时间选择问题</span>。这些交给 FMClaw，你把时间花在自己的业务上。</p>
        </div>
      </section>

      {/* ===== 收尾 · 使命(浅色「时刻」,参考首页) ===== */}
      <section className="fm-mission-band">
        <div className="fm-grid" aria-hidden="true" />
        <span className="fm-mission-glow" aria-hidden="true" />
        <div className="wrap">
          <p className="fm-mission-en">Make intelligence ambient in the physical world</p>
          <p className="fm-mission-zh">让智能，走进物理世界</p>
          <p className="fm-mission-sub">基座，是这件事的「怎么做」——要让智能走进物理世界，平台就得既能感知物理世界，又能在物理世界里动手。</p>
        </div>
      </section>

      {/* ===== END CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与设施管理的日常运营</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <Link href="/partners/program" className="btn btn-light">行业智能体伙伴计划 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
