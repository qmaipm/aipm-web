import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, techArticleLd, Arrow, IC, LinkCards } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/ontology", {
  title: "行业数据本体与指标中心｜FMClaw™ 物业 AI 数据底座",
  description:
    "FMClaw 行业数据本体：不替换数据中台、不重建 IoT 中台。连接器接入企业已有系统，统一业务对象与关系、指标口径、服务标准、规则与数据权限，治理后的数据以数据集市形式交付——AI 原生架构中的语义层。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/ontology",
  headline: "行业数据本体：让 AI 理解物业与设施管理的业务世界",
  description:
    "行业数据本体，是对物业与设施管理中业务对象与关系、指标口径、服务标准、规则与逻辑和数据权限的统一描述。连接器接入企业已有的数据中台、IoT 中台和业务系统，治理后的数据以数据集市的形式交付使用。",
});

const FAQ = [
  {
    q: "什么是行业数据本体?",
    a: "行业数据本体，是对物业与设施管理中业务对象与关系、指标口径、服务标准、规则与逻辑和数据权限的统一描述。它让 AI 不只是读取数据，还能理解数据在业务中代表什么。",
  },
  {
    q: "行业数据本体与数据中台是什么关系?",
    a: "不替换，也不重建。企业已有的数据中台、IoT 中台和业务系统通过连接器接入，行业数据本体在其之上统一描述业务对象、关系、指标口径和权限，让 AI 能读懂这些系统里的数据。",
  },
  {
    q: "数据集市是什么?",
    a: "数据集市是治理后数据的呈现形式：一个可查找、可订阅、可调用的使用入口。业务人员和智能体在这里使用统一口径的数据，而不需要了解底层系统。",
  },
  {
    q: "为什么 AI 需要统一指标口径?",
    a: "同一个指标在不同项目、不同报表里常常有不同的统计范围和计算方式。指标中心统一定义、统计范围和项目口径，让 AI 产出的关键指标在多个项目之间可比、可复核。",
  },
  {
    q: "数据权限如何控制?",
    a: "按组织、角色和项目控制数据可见范围。不同智能体只能读取完成工作所需的数据，访问行为有记录、可追溯。",
  },
];

/* 从连接到集市：四步（能力陈述，不含实现方式） */
const FLOW = [
  { n: "01", t: "连接与映射", who: "接入", d: "通过连接器接入企业已有的数据中台、IoT 中台、业务系统和现场数据，完成到行业对象的映射。" },
  { n: "02", t: "业务对象与关系", who: "本体", d: "项目、空间、设备、人员、工单、合同等对象及其关系，获得跨系统的统一定义。" },
  { n: "03", t: "口径、标准、规则与权限", who: "治理", d: "指标口径、服务标准、规则与逻辑、数据权限，在这一层统一生效。" },
  { n: "04", t: "数据集市", who: "交付", human: true, d: "治理后的数据以集市形式交付：可查找、可订阅、可调用，人和智能体用的是同一份口径。" },
];

/* 八项能力（一句话能力陈述） */
const CAPS = [
  { n: "01", t: "数据连接与映射", d: "接入企业已有系统与现场数据，映射为统一的行业对象。" },
  { n: "02", t: "业务对象与关系", d: "项目、空间、设备、人员、工单、合同等对象及其关系的统一定义。" },
  { n: "03", t: "指标中心", d: "统一指标定义、统计范围与项目口径，结果跨项目可比、可复核。" },
  { n: "04", t: "服务标准", d: "把服务要求沉淀为结构化标准，供工作流与智能体引用。" },
  { n: "05", t: "规则与逻辑", d: "业务规则与计算逻辑统一管理，一处修改，处处生效。" },
  { n: "06", t: "数据治理", d: "数据质量与一致性随业务持续维护，而不是一次性项目。" },
  { n: "07", t: "数据权限", d: "按组织、角色和项目控制可见范围，访问留痕。" },
  { n: "08", t: "数据集市", d: "治理后数据的目录、检索、订阅与调用入口。" },
];

const CMP_LABEL = { "--cmp-old-label": '"传统 IT 规划 · "' } as CSSProperties;

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
              <h1>让 AI 理解物业与设施管理的<span className="grad">业务世界</span></h1>
              <p className="fmc-def">
                行业数据本体是 FMClaw™ 的第一层。它<b>不是又一个中台</b>——在 AI 原生架构里，
                连接器接入企业已有的系统与平台，本体统一描述业务对象、关系、指标口径、服务标准、
                规则与数据权限，治理后的数据以<b>数据集市</b>的形式交付使用。
              </p>
            </div>
            <div className="fmc-hero-art">
              <img
                src="/products/fmclaw/ontology-hero.png"
                alt="行业数据本体插画：楼宇剖面中的设备与空间数据节点，连接成统一的知识图谱"
                width={1376}
                height={768}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===== 01 定义 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>什么是行业数据本体?</h2>
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
        </div>
      </section>

      {/* ===== 02 与数据中台、IoT 中台的关系 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>与数据中台、IoT 中台是什么关系?</h2>
          <p className="fmc-p">
            传统 IT 规划里，数据中台、IoT 中台各自立项、分别建设，口径分散在系统和报表里。
            AI 原生架构换了一种组织方式：以本体为中心。
          </p>
          <div className="fmo-cmp" role="table" aria-label="传统 IT 规划与 AI 原生架构的差异" style={CMP_LABEL}>
            <div className="fmo-cmp-row fmo-cmp-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">传统 IT 规划</div>
              <div role="columnheader" className="now">AI 原生架构（FMClaw）</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">建设方式</div>
              <div className="fmo-cmp-old" role="cell">数据中台、IoT 中台各自立项、分别建设</div>
              <div className="fmo-cmp-new" role="cell">连接器接入<b>存量系统</b>，一层本体统一描述</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">数据的组织</div>
              <div className="fmo-cmp-old" role="cell">按系统和表组织，口径分散</div>
              <div className="fmo-cmp-new" role="cell">按<b>业务对象、关系与指标口径</b>组织</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">AI 读到的</div>
              <div className="fmo-cmp-old" role="cell">一堆字段和接口</div>
              <div className="fmo-cmp-new" role="cell">有业务含义的事实（<b>语义层</b>）</div>
            </div>
            <div className="fmo-cmp-row" role="row">
              <div className="fmo-cmp-k" role="cell">使用方式</div>
              <div className="fmo-cmp-old" role="cell">找系统、找人、找报表</div>
              <div className="fmo-cmp-new" role="cell">在<b>数据集市</b>中查找、订阅、调用</div>
            </div>
          </div>
          <div className="fmo-lrows">
            <div className="fmo-lrow">
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
                  数据中台、IoT 中台和业务系统经连接器接入，本体在其之上统一描述。
                  治理后的数据以数据集市交付——人和智能体用的是同一份口径。
                </p>
              </div>
            </div>
          </div>
          <p className="fmo-verdict">
            不替换数据中台，不重建 IoT 中台——连接器接入存量系统，本体让 AI 读懂它们。
          </p>
        </div>
      </section>

      {/* ===== 03 从连接到集市 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
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

      {/* ===== 04 八项能力 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>这一层包含的八项能力</h2>
          <div className="fmo-caps">
            {CAPS.map((c) => (
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
            同一个指标，在 500 个项目里只有一种算法。
          </p>
        </div>
      </section>

      {/* ===== 05 数据权限（暗场） ===== */}
      <section className="fmc-sec dark">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>只读取完成工作所需的数据</h2>
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
              <span><b>访问留痕</b><span className="d">每一次数据读取都有记录，可追溯、可复核。</span></span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== 06 场景 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">06</p>
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
          <p className="fmc-updated">最后更新：2026-07-20</p>
        </div>
      </div>

      {/* ===== 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>让 AI 先读懂你的业务</h2>
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
