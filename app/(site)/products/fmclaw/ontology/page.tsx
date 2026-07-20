import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, FmRelated, techArticleLd } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/ontology", {
  title: "行业数据本体与指标中心｜FMClaw™ 物业 AI 数据底座",
  description:
    "FMClaw 将项目、空间、设备、人员、工单、合同和现场数据映射为统一行业对象，并管理指标口径、数据关系和访问权限。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/ontology",
  headline: "行业数据本体与指标中心",
  description:
    "行业数据本体,是对物业与设施管理中的业务对象、对象关系、指标口径和访问权限的统一描述。它让 AI 不只是读取数据,还能理解数据在业务中代表什么。",
});

const FAQ = [
  {
    q: "什么是行业数据本体?",
    a: "行业数据本体是对项目、空间、设备、人员、工单、合同等业务对象,以及对象关系、指标和权限的统一描述。它让 AI 不只是读取数据,还能理解数据在业务中代表什么。",
  },
  {
    q: "为什么 AI 需要统一指标口径?",
    a: "同一个指标在不同项目、不同报表里常常有不同的统计范围和计算方式。指标中心统一定义、统计范围和项目口径,让 AI 产出的关键指标在多个项目之间可比、可复核。",
  },
  {
    q: "Data Agent 是做什么的?",
    a: "Data Agent 负责识别、归类、映射和持续整理数据,让 Excel、PDF、业务系统和 IoT 等不同来源的数据可以被业务工作流与智能体调用。",
  },
  {
    q: "数据集市和数据本体是什么关系?",
    a: "行业数据本体负责定义,Data Agent 负责整理,指标中心负责统一口径,数据集市负责查找和使用——它是治理后数据的目录、检索、订阅和调用入口。",
  },
  {
    q: "数据权限如何控制?",
    a: "按组织、角色和项目控制数据可见范围。不同智能体只能读取完成工作所需的数据,访问行为有记录、可追溯。",
  },
];

const SOURCES = ["Excel", "PDF", "物业 ERP", "工单系统", "财务系统", "IoT", "BA", "视频", "协同平台"];
const OBJECTS = ["项目", "楼栋", "空间", "设备", "人员", "岗位", "服务标准", "工单", "合同", "供应商", "账单", "能耗"];
const METRIC_CATS = ["服务到岗", "任务完成", "巡检达标", "设备状态", "能耗", "投诉", "工时", "成本", "供应商履约"];

export default function Page() {
  return (
    <main className="fmc">
      <JsonLd data={TECH_LD} />
      <div className="wrap">
        <FmBreadcrumb
          trail={[
            { name: "FMClaw™ 产品总览", href: "/products/fmclaw" },
            { name: "行业数据本体与指标中心", href: "/products/fmclaw/ontology" },
          ]}
        />
      </div>

      <header className="fmc-hero">
        <div className="wrap">
          <p className="fmc-kicker">Industry Ontology &amp; Metrics</p>
          <h1>让 AI 理解物业业务中的对象、关系与指标</h1>
          <p className="fmc-def">
            行业数据本体与指标中心是 FMClaw™ 的数据底座。它把散落在
            Excel、业务系统和现场设备里的数据,映射为统一的行业对象和指标,
            并按组织与项目管理访问权限——让 AI 读到的不是一堆字段,而是业务事实。
          </p>
        </div>
      </header>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>什么是行业数据本体?</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              行业数据本体,是对物业与设施管理中的业务对象、对象关系、指标口径和访问权限的统一描述。
            </p>
          </div>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            有了这层描述,「3 号楼 2 层的空调工单」不再只是一行记录,而是一台设备、一个空间、
            一份服务标准和一个责任人之间的明确关系。AI 据此判断,而不是猜测。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>从原始数据到业务对象</h2>
          <p>数据从哪里来:</p>
          <div className="fmc-tags">
            {SOURCES.map((s) => <span key={s}>{s}</span>)}
          </div>
          <p style={{ marginTop: 26 }}>映射为哪些行业对象:</p>
          <div className="fmc-tags">
            {OBJECTS.map((o) => <span key={o}>{o}</span>)}
          </div>
          <p className="fmc-p" style={{ marginTop: 20 }}>
            映射之后,来源不同、格式不同的数据指向同一套对象。一份合同、一台设备、一个岗位,
            在所有工作流和报告中都是同一个东西。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>Data Agent:让数据持续可用</h2>
          <p className="fmc-p">
            Data Agent 负责识别、归类、映射和持续整理数据,让不同来源的数据可以被业务工作流与智能体调用。
            数据治理不是一次性项目,而是随业务持续运行的工作。
          </p>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>指标中心:统一定义与口径</h2>
          <p className="fmc-p">
            指标中心沉淀经过真实物业项目验证的行业指标,统一定义、统计范围和项目口径。
            同一个指标,在 500 个项目里只有一种算法。
          </p>
          <p style={{ marginTop: 8 }}>指标类别包括:</p>
          <div className="fmc-tags">
            {METRIC_CATS.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>数据集市:治理后数据的使用入口</h2>
          <p className="fmc-p">数据集市是治理后数据的目录、检索、订阅和调用入口。四者的分工是:</p>
          <dl className="fmc-map">
            <div className="fmc-map-row"><dt>行业数据本体</dt><dd>负责定义业务对象、关系与权限</dd></div>
            <div className="fmc-map-row"><dt>Data Agent</dt><dd>负责识别、归类、映射与持续整理</dd></div>
            <div className="fmc-map-row"><dt>指标中心</dt><dd>负责统一指标定义、统计范围与项目口径</dd></div>
            <div className="fmc-map-row"><dt>数据集市</dt><dd>负责查找、订阅与调用治理后的数据</dd></div>
          </dl>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">06</p>
          <h2>数据权限:只读取完成工作所需的数据</h2>
          <p className="fmc-p">
            数据可见范围按组织、角色和项目控制。项目经理看到自己的项目,区域负责人看到自己的区域;
            不同智能体也一样——只能读取完成工作所需的数据,访问行为有记录。
          </p>
          <div className="fmc-status">
            <span>DATA SCOPED</span>
            <span>ROLE BASED</span>
            <span>PROJECT ISOLATED</span>
            <span>ACCESS LOGGED</span>
          </div>
        </div>
      </section>

      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">07</p>
          <h2>一个真实的使用场景</h2>
          <p className="fmc-p">
            管理层在群里问「华南区上月哪个项目能耗异常」。智能体从数据本体定位区域内的项目对象,
            用指标中心统一的能耗口径逐一比对,给出异常项目、偏差幅度和数据来源。
            答案可以复核,因为口径只有一个。
          </p>
          <p className="fmc-p">
            同样的数据底座,也支撑
            <Link className="fmc-ln" href="/scenarios/exec-query">管理层问询</Link>、
            <Link className="fmc-ln" href="/cases/property-group-auto-operation-report">运营日报</Link>、
            <Link className="fmc-ln" href="/scenarios/reconciliation">供应商对账</Link>、
            <Link className="fmc-ln" href="/solutions/payroll">员工绩效</Link>
            等日常业务。
          </p>
        </div>
      </section>

      <FmFaq items={FAQ} />

      <FmRelated
        updated="2026-07-20"
        links={[
          { label: "查看行业级智能体工作流引擎", href: "/products/fmclaw/workflow-engine" },
          { label: "查看 IoT 物理世界感知", href: "/products/iot" },
          { label: "查看管理层问询场景", href: "/scenarios/exec-query" },
        ]}
      />
    </main>
  );
}
