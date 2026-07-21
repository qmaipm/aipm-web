import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, techArticleLd, Arrow, IC, LinkCards } from "../_shared";
import "../capability.css";
import "./page.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/ontology", {
  title: "智能体上生产的数据治理｜FMClaw™ 行业数据本体与指标中心",
  description:
    "很多智能体项目停在演示环境，卡住它们的是数据治理：指标口径不一、数据来源说不清、权限没有边界。FMClaw 行业数据本体不替换数据中台，连接器接入企业已有系统，统一业务对象与关系、指标口径、服务标准与数据权限——同一个指标，在 500 个项目里只有一种算法。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/ontology",
  headline: "智能体上生产之前，数据要治理到什么程度？",
  description:
    "智能体从演示走向生产环境，最常见的障碍是数据治理：指标口径不一致、数据来源说不清、权限没有边界。行业数据本体统一描述物业与设施管理中的业务对象与关系、指标口径、服务标准与数据权限，治理后的数据以数据集市的形式交付使用。",
});

const FAQ = [
  {
    q: "上智能体之前，数据要治理到什么程度?",
    a: "至少做到三件事：关键业务对象与关系有统一定义，AI 读到的是业务事实而不是字段；核心指标口径统一，同一个指标在所有项目里只有一种算法；数据权限有边界，人和智能体都只能读取完成工作所需的数据。FMClaw 把这三件事做成平台能力，而不是一次性的治理项目。",
  },
  {
    q: "为什么智能体在演示环境表现很好，一到生产就不行?",
    a: "演示环境的数据经过人工挑选和整理；生产环境的数据分散在多个系统里，口径不一致、质量参差、权限复杂。没有统一的数据治理层，智能体给出的结果无法复核，也就无法承担真实业务。这是智能体项目从演示走向生产最常见的障碍。",
  },
  {
    q: "什么是行业数据本体?",
    a: "行业数据本体，是对物业与设施管理中业务对象与关系、指标口径、服务标准、规则与逻辑和数据权限的统一描述。它让 AI 不只是读取数据，还能理解数据在业务中代表什么。",
  },
  {
    q: "行业数据本体与数据中台是什么关系?",
    a: "不替换，也不重建。企业已有的数据中台、IoT 中台和业务系统通过连接器接入，行业数据本体在其之上统一描述业务对象、关系、指标口径和权限，让 AI 能读懂这些系统里的数据。",
  },
  {
    q: "与通用智能体平台的知识库有什么不同?",
    a: "知识库解决的是让 AI 读到资料；数据治理解决的是让 AI 读到的每一个数字都有统一口径、明确来源和权限边界。前者适合问答，后者是智能体进入生产环境、承担真实业务的前提。",
  },
  {
    q: "为什么 AI 需要统一指标口径?",
    a: "同一个指标在不同项目、不同报表里常常有不同的统计范围和计算方式。指标中心统一定义、统计范围和项目口径，让 AI 产出的关键指标在 500 个项目之间可比、可复核。",
  },
  {
    q: "数据权限如何控制?",
    a: "按组织、角色和项目控制数据可见范围。不同智能体只能读取完成工作所需的数据，访问行为有记录、可追溯。",
  },
];

/* 三个生产现场（来自与行业客户的真实交流） */
const PAINS = [
  {
    q: "同一个指标，两个报表两个数，AI 该信哪个?",
    t: "口径打架",
    d: "能耗、收缴率、工单及时率……同一个指标在不同系统、不同项目里有不同的算法。演示时可以人工对齐，生产环境里没人替 AI 对。",
  },
  {
    q: "这份数据在哪个系统、归谁管、能不能给 AI 用?",
    t: "数据说不清",
    d: "数据分散在数据中台、IoT 平台和一个个业务系统里，来源与责任不清。说不清来源的数据，AI 用了也没人敢信。",
  },
  {
    q: "智能体是不是什么数据都能看?",
    t: "权限没边界",
    d: "演示环境可以不在乎越权，生产环境必须在乎。没有按项目、按角色的数据边界，智能体过不了安全与合规这一关。",
  },
];

/* 从连接到集市：四步（能力陈述，不含实现方式） */
const FLOW = [
  { n: "01", t: "连接与映射", who: "接入", d: "通过连接器接入企业已有的数据中台、IoT 中台、业务系统和现场数据，完成到行业对象的映射。" },
  { n: "02", t: "业务对象与关系", who: "本体", d: "项目、空间、设备、人员、工单、合同等对象及其关系，获得跨系统的统一定义。" },
  { n: "03", t: "口径、标准、规则与权限", who: "治理", d: "指标口径、服务标准、规则与逻辑、数据权限，在这一层统一生效。" },
  { n: "04", t: "数据集市", who: "交付", human: true, d: "治理后的数据以集市形式交付：可查找、可订阅、可调用，人和智能体用的是同一份口径。" },
];

/* 治理三件事：八项能力按目标归组 */
const CAP_GROUPS = [
  {
    n: "01",
    t: "统一语义",
    goal: "让 AI 读懂业务，而不是猜字段。",
    items: [
      { t: "数据连接与映射", d: "接入企业已有系统与现场数据，映射为统一的行业对象。" },
      { t: "业务对象与关系", d: "项目、空间、设备、人员、工单、合同等对象及其关系的统一定义。" },
      { t: "服务标准", d: "把服务要求沉淀为结构化标准，供工作流与智能体引用。" },
    ],
  },
  {
    n: "02",
    t: "统一口径",
    goal: "让每一个数字可比、可复核。",
    items: [
      { t: "指标中心", d: "统一指标定义、统计范围与项目口径，结果跨项目可比、可复核。" },
      { t: "规则与逻辑", d: "业务规则与计算逻辑统一管理，一处修改，处处生效。" },
      { t: "数据治理", d: "数据质量与一致性随业务持续维护，而不是一次性项目。" },
    ],
  },
  {
    n: "03",
    t: "守住边界",
    goal: "让智能体过得了安全与合规这一关。",
    items: [
      { t: "数据权限", d: "按组织、角色和项目控制可见范围，访问有记录。" },
      { t: "数据集市", d: "治理后数据唯一的使用入口：目录、检索、订阅与调用。" },
    ],
  },
];

const CMP_LABEL = { "--cmp-old-label": '"通用平台 · "' } as CSSProperties;

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
            { name: "行业数据本体", href: "/products/fmclaw/ontology" },
          ]}
        />
      </div>

      {/* ===== HERO ===== */}
      <header className="fmc-hero">
        <span className="fmc-grid" aria-hidden="true" />
        <div className="wrap">
          <div className="fmc-hero-cols">
            <div>
              <p className="fmc-kicker">L1 · Industry Data Ontology</p>
              <h1>把数据治理到<span className="grad">智能体能上生产</span>的程度</h1>
              <p className="fmc-def">
                很多智能体项目停在演示环境，卡住它们的不是模型，而是数据。
                行业数据本体是 FMClaw™ 的第一层：连接器接入你已有的系统，
                统一<b>业务对象、指标口径、服务标准与数据权限</b>——
                让智能体带着治理好的数据进入生产环境。
              </p>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/ontology-hero.webp"
                alt="行业数据本体插画：楼宇剖面中的设备与空间数据节点，连接成统一的知识图谱"
                width={1200}
                height={896}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===== 01 问题：为什么停在演示环境 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>智能体项目，为什么停在演示环境?</h2>
          <p className="fmc-p">
            和很多准备把智能体接入真实业务的团队聊完，我们听到的是同样三件事。
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
            卡住智能体的不是模型，是数据治理。
          </p>
        </div>
      </section>

      {/* ===== 02 解法：行业数据本体 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>我们替你把数据治理这一层做完</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              行业数据本体，是对物业与设施管理中业务对象与关系、指标口径、服务标准、规则与逻辑和数据权限的统一描述。
              治理后的数据以数据集市的形式呈现——可查找、可订阅、可调用。
            </p>
          </div>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            有了这层描述，「3 号楼 2 层的空调工单」不再只是一行记录，而是一台设备、一个空间、
            一份服务标准和一个责任人之间的明确关系。AI 据此判断，而不是猜测。
          </p>
          <div className="fmo-lrows">
            <div className="fmo-lrow">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/ontology-bridge.webp"
                  alt="数据治理插画：散落的数据立方经过发光的治理平台层，被组织为相互连接的知识图谱，再接入右侧的楼宇与设施，进入生产运行"
                  width={1376}
                  height={1027}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <h3>从散落的数据，到能上生产的业务事实</h3>
                <p className="fmo-ldesc">
                  散落在各个系统里的数据，经过本体这一层被统一定义、统一口径、统一权限，
                  变成 AI 可以直接使用、人可以直接复核的业务事实——然后才谈得上生产环境。
                </p>
              </div>
            </div>
            <div className="fmo-lrow flip">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/ontology-marts.webp"
                  alt="AI 原生架构插画：企业已有的服务器、数据库、IoT 与业务系统通过连接器接入中央的行业数据本体，治理后的数据以数据集市的形式交付给使用者"
                  width={1376}
                  height={768}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <h3>存量系统，原样接入</h3>
                <p className="fmo-ldesc">
                  不替换数据中台，不重建 IoT 中台。已有系统经连接器接入，治理在其之上完成，
                  治理后的数据以数据集市交付——人和智能体用的是同一份口径。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 03 与通用平台的边界 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>通用平台解决「搭得快」，这一层解决「上得了生产」</h2>
          <p className="fmc-p">
            通用智能体平台擅长快速搭建智能体和知识问答，这没有问题。
            行业客户真正卡住的环节在数据治理层——这正是通用平台通常不承诺的部分。
          </p>
          <div className="fmo-cmp" role="table" aria-label="通用智能体平台与 FMClaw 行业数据治理的边界" style={CMP_LABEL}>
            <div className="fmo-cmp-row fmo-cmp-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">通用智能体平台</div>
              <div role="columnheader" className="now">FMClaw 行业数据治理</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">数据接入</div>
              <div className="fmo-cmp-old" role="cell">上传文档、搭建知识库</div>
              <div className="fmo-cmp-new" role="cell">连接器接入<b>数据中台、IoT 中台与业务系统</b></div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">业务语义</div>
              <div className="fmo-cmp-old" role="cell">通用对象，行业含义靠提示词补齐</div>
              <div className="fmo-cmp-new" role="cell"><b>行业本体</b>：项目、空间、设备、工单等对象与关系</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">指标口径</div>
              <div className="fmo-cmp-old" role="cell">通常不涉及跨系统指标口径</div>
              <div className="fmo-cmp-new" role="cell"><b>指标中心</b>统一定义与算法，跨项目可比</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">数据权限</div>
              <div className="fmo-cmp-old" role="cell">通常到应用一级</div>
              <div className="fmo-cmp-new" role="cell">按<b>项目隔离、角色可见</b>，访问有记录</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">结果复核</div>
              <div className="fmo-cmp-old" role="cell">依赖检索质量，口径无从复核</div>
              <div className="fmo-cmp-new" role="cell">答案带<b>口径与来源</b>，可复核</div>
            </div>
          </div>
          <p className="fmo-verdict">
            两者不冲突：通用平台让你搭得快，这一层让你上得了生产。
          </p>
        </div>
      </section>

      {/* ===== 04 从连接到集市 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>从连接到集市，数据只走四步</h2>
          <div className="fmo-howgrid">
            <div className="fmo-howside">
              <p className="fmo-howcase">
                数据从企业现有系统出发，经过四步，变成人和 AI 都能直接使用的<b>业务资产</b>。
              </p>
              <p className="fmo-verdict">
                AI 读到的不再是字段，而是业务事实。
              </p>
              <p className="fmo-hownote">
                接入哪些系统、如何完成映射，属于实施交付内容，按项目提供。
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

      {/* ===== 05 治理三件事 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>这一层做的，是三件事</h2>
          <p className="fmc-p">
            八项平台能力，服务于三个治理目标——每一项都对应智能体上生产前必须回答的问题。
          </p>
          <div className="fmo-capgrp">
            {CAP_GROUPS.map((g) => (
              <div className="fmo-cg" key={g.n}>
                <div className="fmo-cg-head">
                  <span className="fmo-cg-no">{g.n}</span>
                  <h3>{g.t}</h3>
                  <p className="fmo-cg-goal">{g.goal}</p>
                </div>
                <ul className="fmo-cg-list">
                  {g.items.map((i) => (
                    <li key={i.t}>
                      <b>{i.t}</b>
                      <p>{i.d}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="fmo-verdict">
            同一个指标，在 500 个项目里只有一种算法。
          </p>
        </div>
      </section>

      {/* ===== 06 数据权限（暗场） ===== */}
      <section className="fmc-sec dark">
        <div className="wrap">
          <p className="fmc-num">06</p>
          <h2>生产环境的底线：AI 不能什么都看</h2>
          <div className="fmo-darkgrid">
            <div>
              <p className="fmc-p">
                数据可见范围按组织、角色和项目控制。项目经理看到自己的项目，区域负责人看到自己的区域;
                不同智能体也一样——只能读取完成工作所需的数据。
              </p>
              <ul className="fmo-checks">
                <li>
                  <span className="ck" aria-hidden="true"><Check /></span>
                  <span><b>按项目隔离</b><span className="d">每个项目的数据独立可控，跨项目访问需要明确授权。</span></span>
                </li>
                <li>
                  <span className="ck" aria-hidden="true"><Check /></span>
                  <span><b>按角色可见</b><span className="d">人和智能体按组织角色获得可见范围，岗位变了，范围随之变。</span></span>
                </li>
                <li>
                  <span className="ck" aria-hidden="true"><Check /></span>
                  <span><b>访问有记录</b><span className="d">每一次数据读取都有记录，可追溯、可复核。</span></span>
                </li>
              </ul>
            </div>
            <span className="fmo-limg">
              <img
                src="/products/fmclaw/ontology-boundary.webp"
                alt="数据权限插画：暗色场景中多个相互隔离的玻璃数据隔间，一个智能体只有一条发光路径通向被授权的那一间，上方悬浮着盾形轮廓"
                width={1376}
                height={1027}
                loading="lazy"
              />
            </span>
          </div>
        </div>
      </section>

      {/* ===== 07 场景 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">07</p>
          <h2>一个真实的使用场景</h2>
          <p className="fmc-p">
            管理层在群里问「华南区上月哪个项目能耗异常」。智能体从数据本体定位区域内的项目对象，
            用指标中心统一的能耗口径逐一比对，给出异常项目、偏差幅度和数据来源。
            答案可以复核，因为口径只有一个。
          </p>
          <LinkCards items={[
            { href: "/scenarios/exec-query", lab: "场景", t: "管理层问询", d: "在群里直接问业务，答案带口径和来源。", icon: IC.chat },
            { href: "/cases/property-group-auto-operation-report", lab: "客户案例", t: "运营日报自动生成", d: "500 多个项目，每天自动产出结构一致的报告。", icon: IC.chart },
            { href: "/scenarios/reconciliation", lab: "场景", t: "供应商对账", d: "同一套合同对象和指标口径下的自动核对。", icon: IC.reconcile },
          ]} />
        </div>
      </section>

      <FmFaq items={FAQ} />

      {/* ===== 继续了解 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">KEEP EXPLORING</p>
          <h2>数据之上，是工作</h2>
          <p className="fmc-p">
            本体让 AI 读懂业务，工作流引擎让 AI 接手业务。
          </p>
          <LinkCards items={[
            { href: "/products/fmclaw/workflow-engine", lab: "平台能力 · L2", t: "工作流引擎", d: "把一项工作组织成可持续运行的业务流程。", icon: IC.flow },
            { href: "/products/iot", lab: "产品", t: "IoT 物理世界感知", d: "IoT、BA、视频和现场设备持续提供真实世界数据。", icon: IC.layers },
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
          <h2>看看你的数据，离智能体上生产还差多远</h2>
          <p>从一份真实数据开始验证。</p>
          <div className="cta-row">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <p className="alt">或先看看<Link href="/cases">已经在生产中运行的案例</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
