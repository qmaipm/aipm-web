import type { Metadata } from "next";
import Link from "next/link";
import "./cobuild.css";
import { SolPage, SolHero, SolSection, SolSteps, SolCols, SolMore } from "../solutions/_tpl/Sol";
import CobuildForm from "./CobuildForm";
import { FmFaq } from "../products/fmclaw/_shared";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/cobuild", {
  title: "政企共建人工智能产业｜启盟科技",
  description:
    "启盟科技设立亿元规模专项基金（2025 年 6 月），带着资金、技术与运营团队，与地方政府共同培育人工智能产业。五年、500 个项目、上千台设备在一线运行；投资规模、产业培育目标与兜底安排写进合作协议。物业，是这个产业落地的第一个场景。",
});

/* ---------- 01 · 政策坐标（产业线 / 场景线，双线交汇） ---------- */
const polIndustry = [
  {
    doc: "《关于深入实施「人工智能+」行动的意见》",
    p: "要求各地区各部门结合实际、因地制宜抓好贯彻落实。",
    src: "国务院 · 2025 年 8 月",
  },
  {
    doc: "人工智能相关产业规模目标 10 万亿元",
    p: "「十五五」末的全国目标。目标最终要靠一个个地方项目落成。",
    src: "国家发展改革委 · 2026 年全国两会",
  },
];
const polScene = [
  {
    doc: "「好房子」建设与物业服务质量提升行动",
    p: "两项行动并列写入政府工作报告，物业服务质量提升上升为国家层面行动。",
    src: "政府工作报告 · 2026 年 3 月",
  },
  {
    doc: "「智慧」是「好房子」的四个特征之一",
    p: "安全、舒适、绿色、智慧。其中智慧被明确为服务能力的升级路径。",
    src: "住建部《关于提升住房品质的意见》 · 2026 年 1 月",
  },
];

/* ---------- 02 · 华东案例（四字段档案；项目级实账） ---------- */
const caseFields = [
  { k: "合作方", v: "华东某经济发达城市。" },
  {
    k: "此前",
    v: "传统「园区物业管理服务」模式，月综合服务成本 ¥34.1 万。",
  },
  {
    k: "部署",
    v: "清洁与巡检机器人、FMClaw™ 数字化系统上线，驻场团队承接日常运营；智能化投入由启盟科技承担。",
  },
  {
    k: "现状",
    v: "「人工智能服务解决方案」模式，月综合服务成本 ¥23.8 万，稳定运行至今。",
  },
];

/* ---------- 02 · 合作期内（账目披露，白描） ---------- */
const yields = [
  { side: "政府侧", k: "培育人工智能产业", v: "约 ¥2,300 万" },
  { side: "国企侧", k: "节省智能化采购预算", v: "约 ¥460 万" },
  { side: "国企侧", k: "降低园区运营服务成本", v: "约 ¥340 万" },
];

/* ---------- 02 · 为什么敢先投（技术 / 运营 / 资本） ---------- */
const bases = [
  {
    k: "技术",
    title: "FMClaw™ 软硬件一体",
    p: "自研软硬件栈，500 个项目验证；上千台设备、数千套智能体系统、数十亿条一线数据。",
    href: "/products/fmclaw",
    link: "了解 FMClaw™",
  },
  {
    k: "运营",
    title: "五年一线运营",
    p: "驻场团队用 AI 工作流承接日常运营，效率与服务质量由我们自己保障。",
    href: "/ai-service",
    link: "查看 AI 物业服务",
  },
  {
    k: "资本",
    title: "亿元规模专项基金",
    p: "2025 年 6 月设立，设备与系统投入全额承担，形成本地固定资产。",
  },
];

/* ---------- 03 · 兜底（投入分工） ---------- */
const inputs = [
  {
    k: "资金",
    title: "亿元规模专项基金",
    body: "2025 年 6 月设立，全额承担 AI 系统、物联网传感器与服务机器人投入，形成贵辖区的本地固定资产。",
  },
  {
    k: "技术",
    title: "FMClaw™ 智能设施管理系统",
    body: "自研软硬件栈，已在 500 个项目运行；四个 AI 智能体承担日常调度、标准制定、质量评估与服务优化。",
  },
  {
    k: "运营",
    title: "一个常驻本地的团队",
    body: "子公司注册在本地，工商税务全在贵辖区；运维与技术团队常驻，服务人员本地招聘。",
  },
];

/* ---------- 03 · 白纸黑字（写进协议的三项） ---------- */
const pacts = [
  {
    k: "投资承诺",
    p: "专项基金对辖区项目的投资规模，写入协议。",
  },
  {
    k: "产业培育承诺",
    p: "五年目标：一家亿元体量的本地人工智能企业，营收、税收、就业与数据资产归属本地。",
  },
  {
    k: "兜底安排",
    p: "每一阶段设评估点，可中止；前期投入由我方承担。国有企业物业支出不高于现有水平，五年运营与采购资金节省以数千万元规模为协议目标。",
  },
];

/* ---------- 04 · 三步走 ---------- */
const steps = [
  {
    ph: "第一步",
    title: "首批样板",
    body: "子公司在贵区落地，打造首批样板项目。",
  },
  {
    ph: "第二步",
    title: "合资共建",
    body: "与贵区指定的国资平台合资，共建产业主体。",
  },
  {
    ph: "第三步",
    title: "产业辐射",
    body: "以合资公司为主体进行推广，产业沉淀本地。",
  },
];

/* ---------- 04 · 第三步接住的三个政策方向 ---------- */
const dirs = [
  {
    k: "人工智能",
    p: "上千台设备与数千套智能体在真实公共场景常态运行，是人工智能应用落地的直接载体。",
    src: "国务院「人工智能+」行动 · 2025 年 8 月",
  },
  {
    k: "数据要素",
    p: "运行中沉淀的一线数据形成区内数据资产，对接数据流通的新机制。",
    src: "国家数据局 · 2026 年 4 月",
  },
  {
    k: "词元经济",
    p: "持续运行的智能体与机器人产生稳定的模型调用，词元可量化、可定价、可流通。",
    src: "人民日报「词元出海」报道 · 2026 年 7 月",
  },
];

/* ---------- 05 · 五年之后（共建目标，产业辐射的终局） ---------- */
const goals = [
  {
    v: ">1,500 台",
    k: "机器人 · 具身智能",
    p: "区域领先的商用运营载体。",
  },
  {
    v: "5,000–8,000 套",
    k: "AI 智能体",
    p: "区域领先的多业态部署载体，覆盖办公、园区、公寓等十余类业态。",
  },
  {
    v: "40–50 亿条 / 天",
    k: "数据要素 · 词元经济",
    p: "区域领先的流通源头。",
  },
];

/* ---------- FAQ（自包含答案；招商干部原话措辞） ---------- */
const faq = [
  {
    q: "企业方承担哪些投入？",
    a: "资金、技术与运营均由启盟科技承担：亿元规模专项基金（2025 年 6 月设立）负责设备与系统投入，FMClaw™ 系统与驻场运营团队由我方提供，子公司注册在本地。",
  },
  {
    q: "合作对地方财政有什么要求？",
    a: "不需要财政投入，不新增采购预算。贵区负责指导方向、给予政策、导入本地资源；投入与运营由启盟科技承担。",
  },
  {
    q: "这个合作对应哪些政策方向？",
    a: "国务院《关于深入实施「人工智能+」行动的意见》（2025 年 8 月）；2026 年政府工作报告的「好房子」建设与物业服务质量提升行动；以及国家数据局提出的词元交易等数据要素新机制（2026 年 4 月）。",
  },
  {
    q: "产业转化路径是什么？",
    a: "物业支出归口 K 类「房地产业」。当服务由本地注册的人工智能企业以智能系统与机器人交付，对应营收计入 I 类「信息技术服务业」，企业注册、税收与就业均在本地统计。",
  },
  {
    q: "首批项目不达预期怎么办？",
    a: "可以中止。三步走的每一步都设评估点，上一步走通才有下一步；前期投入由启盟科技承担，兜底安排写入合作协议。",
  },
  {
    q: "数据归谁？",
    a: "项目运营数据形成本地数据资产，权属与使用边界写入协议，可对接本地数据流通与词元交易机制。",
  },
];

export default function Page() {
  return (
    <SolPage>
      <div className="cbx">
      <SolHero
        crumbRoot={{ href: "/", label: "启盟科技" }}
        crumb="政企共建"
        title={["与贵区共同培育", "人工智能产业"]}
        lead={<>我们带着资金、技术与运营团队，到贵区投资兴业。<b>物业，是这个产业落地的第一个场景。</b></>}
        cta={{ href: "#contact", label: "预约实地考察" }}
        secondary={{ href: "#frame", label: "查看合作框架" }}
        proof={["五年", "500 个项目", "上千台设备在一线运行", "亿元规模专项基金（2025 年 6 月设立）"]}
        image={{ src: "/cobuild/hero.jpg", alt: "城市新区公共建筑群（场景示意）" }}
      />

      {/* 01 · 政策坐标 */}
      <SolSection title="两条国家议程，在同一个场景交汇">
        <div className="cbx-conv">
          {[{ h: "产业线", rows: polIndustry }, { h: "场景线", rows: polScene }].map((col) => (
            <div key={col.h}>
              <h3 className="cbx-conv__h">{col.h}</h3>
              <ul>
                {col.rows.map((r) => (
                  <li key={r.doc}>
                    <h4>{r.doc}</h4>
                    <p>{r.p}</p>
                    <span className="src">{r.src}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="cbx-sum">
          人工智能产业要场景，「好房子」要智慧。<br />
          <b>国有物业，正是两项国策的<span className="hl">交汇点</span>。</b>
        </p>
        <figure className="spt-figure">
          <img src="/cobuild/district.jpg" alt="医院、学校与机场等公共建筑集群航拍" loading="lazy" width={1800} height={1208} />
          <figcaption>办公园区、医院、学校、场馆：公共建筑，是两项议程共同的落点。（图为场景示意）</figcaption>
        </figure>
      </SolSection>

      {/* 02 · 已经在运行的项目 */}
      <SolSection title="先看一个已经发生的项目" tone="mist"
        sub="客户信息脱敏；具体合作方与项目资料，可在保密框架内实地核验。">
        <div className="cbx-case">
          <img src="/cobuild/park.jpg" alt="现代科技园区办公楼与连廊" loading="lazy" width={1800} height={1208} />
          <dl>
            {caseFields.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </div>
        <h3 className="cbx-h3">合作期内</h3>
        <dl className="spt-nums cbx-yield">
          {yields.map((y) => (
            <div key={y.k}><dt>{y.v}</dt><dd><span className="side">{y.side}</span>{y.k}</dd></div>
          ))}
        </dl>
        <h3 className="cbx-h3">为什么敢先投</h3>
        <p className="cbx-p">用 AI 工作流重构物业运营，实现提质增效，这是一门技术活。敢先投，是因为三样东西都在我们手里，缺一不可。</p>
        <SolCols items={bases.map((b) => ({ meta: b.k, title: b.title, body: b.p, href: b.href, linkText: b.link }))} />
      </SolSection>

      {/* 03 · 合作框架 */}
      <SolSection id="frame" title="资金、技术、运营，我们兜底" split
        sub="贵区负责指导方向、给予政策、导入本地资源，不需要财政投入，不新增采购预算。">
        <SolSteps items={[
          ...inputs.map((it) => ({ no: it.k, title: it.title, body: it.body })),
          { no: "贵区", title: "指导方向 · 给予政策 · 导入本地资源", body: "方向与节奏由贵区确定；投入与运营由我们承担。" },
        ]} />
        <h3 className="cbx-h3">白纸黑字，写进合作协议</h3>
        <dl className="cbx-pact">
          {pacts.map((p) => (<div key={p.k}><dt>{p.k}</dt><dd>{p.p}</dd></div>))}
        </dl>
        <SolMore>我们从中得到的，是长期运营收益和一个产业发展的机会，这也是我们愿意先投的原因。</SolMore>
      </SolSection>

      {/* 04 · 推进节奏 */}
      <SolSection id="path" title="三步走，每一步设评估点" tone="mist"
        sub="上一步走通，才有下一步；是否往下走，由贵区决定。">
        <SolCols items={steps.map((s) => ({ meta: s.ph, title: s.title, body: s.body }))} />
        <h3 className="cbx-h3">第三步落成后，贵区同时接住三个政策方向</h3>
        <ul className="cbx-dirs">
          {dirs.map((d) => (
            <li key={d.k}><h4>{d.k}</h4><p>{d.p}</p><span className="src">{d.src}</span></li>
          ))}
        </ul>
        <figure className="spt-figure cbx-gap">
          <img src="/cobuild/robots.jpg" alt="巡检机器狗、人形机器人与清洁机器人在公共建筑中庭协同作业" loading="lazy" width={1800} height={1208} />
          <figcaption>巡检、接待、清洁：多种形态的机器人在公共建筑内协同作业。（图为场景示意）</figcaption>
        </figure>
        <SolMore>这条路径已在华东进入实施：与某省会城市区级国有资产平台的合作框架定稿，跨国资、招商、财务、审计的专项工作组组建完成，首期园区部署进入排期。</SolMore>
      </SolSection>

      {/* 05 · 共建目标：本页唯一的深色收尾段 */}
      <section className="cbx-goal">
        <img className="cbx-goal__bg" src="/cobuild/dawn.jpg" alt="" aria-hidden="true" loading="lazy" />
        <div className="wrap">
          <h2 className="spt-h2">五年之后，贵区会有一家什么样的企业</h2>
          <p className="spt-sub">这是产业辐射的终局，也是写进协议的培育方向。</p>
          <dl className="cbx-goal__nums">
            {goals.map((g) => (
              <div key={g.k}><dt>{g.v}</dt><dd><b>{g.k}</b>{g.p}</dd></div>
            ))}
          </dl>
          <p className="cbx-goal__bar">
            覆盖面积 <b>500 万㎡</b>以上；我方投入 <b>1.5–2 亿元</b>；这家企业每年贡献的人工智能产业规模：<b>3–5 亿元</b>。
          </p>
          <p className="cbx-goal__cap">从第一个样板项目，到一家扎根本地的人工智能企业。（图为场景示意）</p>
          <p className="cbx-goal__more">延伸阅读：<Link href="/insights/property-management-second-half-ai-company">《物业行业的下半场》</Link> · <Link href="/company">关于启盟科技</Link></p>
        </div>
      </section>

      <FmFaq items={faq} heading="常见问题" />

      <SolSection id="contact" title="欢迎实地考察" split
        sub="华东园区的项目正在运行。留下联系方式，我们安排实地考察，并按贵区实际情况出具合作框架与测算。">
        <CobuildForm />
      </SolSection>
      </div>
    </SolPage>
  );
}
