import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import CobuildForm from "./CobuildForm";
import { FmFaq } from "../products/fmclaw/_shared";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/cobuild", {
  title: "政企共建人工智能产业｜启盟科技",
  description:
    "启盟科技设立亿元规模专项基金（2025 年 6 月），带着资金、技术与运营团队，与地方政府共同培育人工智能产业。五年、500 个项目、上千台设备在一线运行；投资规模、产业培育目标与兜底安排写进合作协议。物业，是这个产业落地的第一个场景。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowD = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- 01 · 政策坐标(产业线 / 场景线，双线交汇) ---------- */
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
    p: "安全、舒适、绿色、智慧——智慧被明确为服务能力的升级路径。",
    src: "住建部《关于提升住房品质的意见》 · 2026 年 1 月",
  },
];

/* ---------- 02 · 华东案例(四字段档案；项目级实账) ---------- */
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

/* ---------- 02 · 合作期内(账目披露，白描) ---------- */
const yields = [
  { side: "政府侧", k: "培育人工智能产业", v: "约 ¥2,300 万" },
  { side: "国企侧", k: "节省智能化采购预算", v: "约 ¥460 万" },
  { side: "国企侧", k: "降低园区运营服务成本", v: "约 ¥340 万" },
];

/* ---------- 02 · 为什么敢先投(技术 / 运营 / 资本) ---------- */
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

/* ---------- 03 · 兜底(投入分工) ---------- */
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

/* ---------- 03 · 白纸黑字(写进协议的三项) ---------- */
const pacts = [
  {
    k: "投资承诺",
    p: "专项基金对辖区项目的投资规模，写入协议。",
  },
  {
    k: "产业培育承诺",
    p: "五年目标：一家亿元体量的本地人工智能企业——营收、税收、就业与数据资产归属本地。",
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

/* ---------- 05 · 五年之后(共建目标，产业辐射的终局) ---------- */
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

/* ---------- FAQ(自包含答案；招商干部原话措辞) ---------- */
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
    a: "物业支出归口 K 类「房地产业」。当服务由本地注册的人工智能企业以智能系统与机器人交付，对应营收计入 I 类「信息技术服务业」——企业注册、税收与就业均在本地统计。",
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
    <main className="solcb">
      {/* ===== HERO · 实景暗场 ===== */}
      <section className="cb-hero">
        <span className="cb-hero__bg" aria-hidden="true" />
        <div className="cb-grid dark" aria-hidden="true" />
        <div className="wrap cb-hero-top">
          <span className="cb-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>政企共建
          </span>
          <h1 className="cb-h1">
            与贵区共同培育<br /><span className="grad">人工智能产业</span>
          </h1>
          <p className="cb-lead">
            我们带着资金、技术与运营团队，到贵区投资兴业。<b>物业，是这个产业落地的第一个场景。</b>
          </p>
          <div className="cb-cta">
            <a href="#contact" className="btn btn-primary">预约实地考察 <Arrow /></a>
            <a href="#frame" className="btn btn-ghost">查看合作框架 <ArrowD /></a>
          </div>
          <div className="cb-proof">
            <span><b>五年</b></span>
            <span className="sep" />
            <span><b>500 个项目</b></span>
            <span className="sep" />
            <span><b>上千台设备</b>在一线运行</span>
            <span className="sep" />
            <span>亿元规模专项基金<b>（2025 年 6 月设立）</b></span>
          </div>
        </div>
      </section>

      {/* ===== 01 · 政策坐标(双线交汇) ===== */}
      <section className="cb-band">
        <div className="wrap">
          <span className="cb-eyebrow">01 · 政策坐标</span>
          <h2 className="cb-h2">两条国家议程，在同一个场景交汇</h2>

          <div className="cb-conv">
            <div className="cb-conv-col">
              <h3 className="cb-conv-h ind"><i />产业线</h3>
              {polIndustry.map((r) => (
                <div className="cb-conv-card" key={r.doc}>
                  <h4>{r.doc}</h4>
                  <p>{r.p}</p>
                  <span>{r.src}</span>
                </div>
              ))}
            </div>
            <div className="cb-conv-col">
              <h3 className="cb-conv-h scn"><i />场景线</h3>
              {polScene.map((r) => (
                <div className="cb-conv-card" key={r.doc}>
                  <h4>{r.doc}</h4>
                  <p>{r.p}</p>
                  <span>{r.src}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cb-conv-merge" aria-hidden="true">
            <svg viewBox="0 0 1096 96" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cbmv" gradientUnits="userSpaceOnUse" x1="548" y1="34" x2="548" y2="92">
                  <stop offset="0" stopColor="#0070FF" />
                  <stop offset="1" stopColor="#12B98A" />
                </linearGradient>
              </defs>
              <path d="M274 0 V34 M822 0 V34 M274 34 H822" fill="none" stroke="#C9D3CE" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d="M548 34 V92" fill="none" stroke="url(#cbmv)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <rect x="545" y="31" width="6" height="6" fill="#0B1714" />
            </svg>
          </div>

          <p className="cb-conv-sum">
            人工智能产业要场景，「好房子」要智慧——<br />
            <b>国有物业，正是两项国策的<span className="grad">交汇点</span>。</b>
          </p>

          <figure className="cb-photo">
            <Image src="/cobuild/district.jpg" alt="医院、学校与机场等公共建筑集群航拍" width={1800} height={1208} sizes="(max-width:1160px) 100vw, 1096px" />
            <figcaption>办公园区、医院、学校、场馆——公共建筑，是两项议程共同的落点。（图为场景示意）</figcaption>
          </figure>
        </div>
      </section>

      {/* ===== 02 · 已经在运行的项目 ===== */}
      <section className="cb-band mist">
        <div className="wrap">
          <span className="cb-eyebrow">02 · 已经在运行的项目</span>
          <h2 className="cb-h2">先看一个已经发生的项目</h2>
          <p className="cb-sub">客户信息脱敏；具体合作方与项目资料，可在保密框架内实地核验。</p>

          <div className="cb-case">
            <div className="cb-case-photo">
              <Image src="/cobuild/park.jpg" alt="现代科技园区办公楼与连廊" width={1800} height={1208} sizes="(max-width:900px) 100vw, 520px" />
            </div>
            <dl className="cb-case-fields">
              {caseFields.map((f) => (
                <div className="cb-case-row" key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="cb-yield">
            <div className="cb-yield-cap">合作期内</div>
            <div className="cb-yield-grid">
              {yields.map((y) => (
                <div className="cb-yield-item" key={y.k}>
                  <span className="cb-yield-side">{y.side}</span>
                  <p>{y.k}</p>
                  <strong className="grad">{y.v}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="cb-base">
            <h3>为什么敢先投</h3>
            <p>
              用 AI 工作流重构物业运营，实现提质增效——这是一门技术活。敢先投，是因为三样东西都在我们手里，缺一不可。
            </p>
            <div className="cb-bases">
              {bases.map((b) => (
                <div className="cb-base-col" key={b.k}>
                  <span className="cb-base-k grad">{b.k}</span>
                  <h4>{b.title}</h4>
                  <p>{b.p}</p>
                  {b.href && (
                    <Link className="cb-base-link" href={b.href}>{b.link} <Arrow s={13} /></Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 03 · 合作框架(兜底) ===== */}
      <section className="cb-band" id="frame">
        <div className="wrap">
          <span className="cb-eyebrow">03 · 合作框架</span>
          <h2 className="cb-h2">资金、技术、运营，我们兜底</h2>
          <p className="cb-sub">
            贵区负责指导方向、给予政策、导入本地资源——不需要财政投入，不新增采购预算。
          </p>

          <div className="cb-inputs">
            {inputs.map((it) => (
              <div className="cb-input" key={it.k}>
                <span className="cb-input-k grad">{it.k}</span>
                <div>
                  <h3>{it.title}</h3>
                  <p>{it.body}</p>
                </div>
              </div>
            ))}
            <div className="cb-input gov">
              <span className="cb-input-k">贵区</span>
              <div>
                <h3>指导方向 · 给予政策 · 导入本地资源</h3>
                <p>方向与节奏由贵区确定；投入与运营由我们承担。</p>
              </div>
            </div>
          </div>

          <div className="cb-pact">
            <h3>白纸黑字，写进合作协议</h3>
            <div className="cb-pact-grid">
              {pacts.map((p) => (
                <div className="cb-pact-item" key={p.k}>
                  <span>{p.k}</span>
                  <p>{p.p}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="cb-note">
            我们从中得到的，是长期运营收益和一个产业发展的机会——这也是我们愿意先投的原因。
          </p>
        </div>
      </section>

      {/* ===== 04 · 推进节奏 ===== */}
      <section className="cb-band mist" id="path">
        <div className="wrap">
          <span className="cb-eyebrow">04 · 推进节奏</span>
          <h2 className="cb-h2">三步走，每一步设评估点</h2>
          <p className="cb-sub">上一步走通，才有下一步；是否往下走，由贵区决定。</p>

          <div className="cb-steps">
            {steps.map((s, i) => (
              <div className="cb-step" key={s.title}>
                <div className="cb-step-ph"><span className="grad">{s.ph}</span></div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < steps.length - 1 && <span className="cb-step-ar" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>

          <div className="cb-dirs">
            <h3>第三步落成后，贵区同时接住三个政策方向</h3>
            <div className="cb-dirs-grid">
              {dirs.map((d) => (
                <div className="cb-dir" key={d.k}>
                  <h4>{d.k}</h4>
                  <p>{d.p}</p>
                  <span className="cb-dir-src">{d.src}</span>
                </div>
              ))}
            </div>
          </div>

          <figure className="cb-photo">
            <Image src="/cobuild/robots.jpg" alt="巡检机器狗、人形机器人与清洁机器人在公共建筑中庭协同作业" width={1800} height={1208} sizes="(max-width:1160px) 100vw, 1096px" />
            <figcaption>巡检、接待、清洁——多种形态的机器人在公共建筑内协同作业。（图为场景示意）</figcaption>
          </figure>

          <p className="cb-note">
            这条路径已在华东进入实施：与某省会城市区级国有资产平台的合作框架定稿，跨国资、招商、财务、审计的专项工作组组建完成，首期园区部署进入排期。
          </p>
        </div>
      </section>

      {/* ===== 05 · 共建目标 ===== */}
      <section className="cb-band">
        <div className="wrap">
          <span className="cb-eyebrow">05 · 共建目标</span>
          <h2 className="cb-h2">五年之后，贵区会有一家什么样的企业</h2>
          <p className="cb-sub">这是产业辐射的终局，也是写进协议的培育方向。</p>

          <div className="cb-goals">
            {goals.map((g, i) => (
              <div className="cb-goal" key={g.k}>
                <span className="cb-goal-n">{String(i + 1).padStart(2, "0")}</span>
                <strong className="grad">{g.v}</strong>
                <h3>{g.k}</h3>
                <p>{g.p}</p>
              </div>
            ))}
          </div>

          <p className="cb-goal-bar">
            覆盖面积 <b>500 万㎡</b>以上；我方投入 <b>1.5–2 亿元</b>；这家企业每年贡献的人工智能产业规模：<b>3–5 亿元</b>。
          </p>

          <figure className="cb-photo">
            <Image src="/cobuild/dawn.jpg" alt="黎明时分的现代城市新区天际线" width={1800} height={1208} sizes="(max-width:1160px) 100vw, 1096px" />
            <figcaption>从第一个样板项目，到一家扎根本地的人工智能企业。（图为场景示意）</figcaption>
          </figure>

          <p className="cb-more">
            延伸阅读：<Link href="/insights/property-management-second-half-ai-company">《物业行业的下半场》</Link>
            <span className="dot" />
            <Link href="/company">关于启盟科技</Link>
          </p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FmFaq items={faq} heading="常见问题" />

      {/* ===== 联系 ===== */}
      <section className="cb-band" id="contact">
        <div className="wrap">
          <span className="cb-eyebrow">联系</span>
          <h2 className="cb-h2">欢迎实地考察</h2>
          <p className="cb-sub">
            华东园区的项目正在运行。留下联系方式，我们安排实地考察，并按贵区实际情况出具合作框架与测算。
          </p>
          <CobuildForm />
        </div>
      </section>
    </main>
  );
}
