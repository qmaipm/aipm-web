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

          {/* 岗位 × 工作流 矩阵 */}
          <div className="fm-wf">
            <div className="fm-wfrow"><div className="fm-pos">财务 · 收费</div><div className="fm-chips">{["月度水电费核算", "账单核算", "业财一体化", "AI 对账"].map((c) => <span className="fm-tag" key={c}>{c}</span>)}</div></div>
            <div className="fm-wfrow"><div className="fm-pos">工程 · 设备</div><div className="fm-chips">{["异常归因", "能耗分析", "设备巡检"].map((c) => <span className="fm-tag" key={c}>{c}</span>)}</div></div>
            <div className="fm-wfrow"><div className="fm-pos">调度 · 客服</div><div className="fm-chips">{["派工规则", "报修智能客服", "管理层问询"].map((c) => <span className="fm-tag" key={c}>{c}</span>)}</div></div>
            <div className="fm-wfrow"><div className="fm-pos">品质 · 安防</div><div className="fm-chips">{["质量考评", "巡检质检"].map((c) => <span className="fm-tag" key={c}>{c}</span>)}</div></div>
          </div>
          <p className="fm-foot">这只是其中一部分。与通用平台最根本的区别就在这里：通用平台给你能力原料、要你自己拼；我们给你的是已经在行业里跑通的工作流。</p>
        </div>
      </section>

      {/* ===== 第二能力 · A2A ===== */}
      <section className="fm-band mist">
        <div className="wrap">
          <div className="fm-caphead">
            <span className="fm-capno">能力 02</span>
            <h2 className="fm-h2">四个专业 Agent，接力把一件事跑完</h2>
            <p className="fm-sub">不是一个万能助手包打天下，而是多个专业 Agent 分工协同：一件事从规划、执行、评估到优化，由不同 Agent 接力跑完，人只在关键节点拍板。</p>
          </div>
          <div className="fm-relay">
            {[
              ["服务设计", "把标准说清楚"],
              ["运营管理", "每天照着跑"],
              ["质量评估", "做得好不好"],
              ["服务优化", "下一轮更好"],
            ].map(([name, desc], i, arr) => (
              <div className="fm-relay-step" key={name}>
                <span className="fm-relay-i">A{i + 1}</span>
                <span className="fm-relay-n">{name}</span>
                <span className="fm-relay-d">{desc}</span>
                {i < arr.length - 1 && <span className="fm-relay-arr" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
          <p className="fm-foot"><Link href="/agents" className="fm-link">看四 Agent 闭环 <Arrow s={13} /></Link></p>
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
          <span className="fm-eyebrow on-dark">要不要自己做</span>
          <h2 className="fm-h2 on-dark">自己从零搭一套，你会撞上<span className="grad">三道墙</span></h2>
          <div className="fm-barriers">
            <div className="fm-barrier">
              <span className="fm-bn">01</span>
              <div className="fm-bc">
                <h3>框架好搭，工作流难攒</h3>
                <p>真正难的不是搭一套框架，而是把行业里每一件工作，拆成数据、能力与工具的特定组合——这只能在真实现场里一条条试出来，试错的成本由时间承担。</p>
              </div>
            </div>
            <div className="fm-barrier">
              <span className="fm-bn">02</span>
              <div className="fm-bc">
                <h3>通用平台，下沉不到这行</h3>
                <p>越靠近物业这行的细节、越靠近物理世界，通用平台越难覆盖；那不是它们的投入方向，也不是多招几个工程师就能补上的。</p>
              </div>
            </div>
            <div className="fm-barrier">
              <span className="fm-bn">03</span>
              <div className="fm-bc">
                <h3>物理世界，没有捷径</h3>
                <p>要先感知一次服务到底做没做、做得好不好，再据此在现实里动手——这一段经验，只能一线跑出来，绕不过去。</p>
              </div>
            </div>
          </div>
          <p className="fm-verdict">与其用几年时间和试错成本去填这三道墙，不如直接站在一个<span className="grad">已经跑了七八年的平台</span>上——把时间花在你的业务，而不是基础设施上。</p>
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
          </div>
        </div>
      </section>
    </main>
  );
}
