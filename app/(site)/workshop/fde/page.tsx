import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import RelatedReading from "../_RelatedReading";
import "../page.css";
import "../sub.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "FDE 服务 · 前置部署工程师 — 按阶段交付的 AI 落地工程，不是驻场外包 | 启盟科技",
  description:
    "FDE（Forward Deployed Engineer，前置部署工程师）源自 Palantir，OpenAI、Anthropic 都在采用。启盟科技的 FDE 服务把这套打法带进中国的不动产与设施管理行业：数据治理、系统与接口接入，按阶段交付、按阶段验收——它不是驻场外包，交付的是结果，不是人头。",
  keywords: [
    "FDE",
    "前置部署工程师",
    "前沿部署工程师",
    "Forward Deployed Engineer",
    "FDE服务",
    "FDE中国",
    "Palantir FDE模式",
    "AI落地工程",
    "企业AI部署",
    "数据治理",
    "AI系统集成",
    "驻场外包区别",
  ],
};

const ArrowR = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "加速营", item: `${SITE_URL}/workshop` },
      { "@type": "ListItem", position: 3, name: "FDE 服务", item: `${SITE_URL}/workshop/fde` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FDE 前置部署工程师服务",
    serviceType: "Forward Deployed Engineering / AI 落地工程服务",
    description:
      "按阶段交付的 AI 落地工程服务：数据治理、系统与接口接入、试运行与验收扩面，把验证过的 AI 场景变成生产系统。源自 Palantir 的 FDE 模式，交付结果而非人头，不是驻场外包。按方案单独报价。",
    url: `${SITE_URL}/workshop/fde`,
    areaServed: "CN",
    provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
  {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: "FDE（Forward Deployed Engineer，前置部署工程师）",
    description:
      "源自 Palantir 的工程角色与交付模式：工程师深入客户业务现场，与业务专家协同完成数据治理、系统接入与场景落地，以结果交付而非人力外派计价。OpenAI、Anthropic、Google 等公司均已设立 FDE 团队。",
    url: `${SITE_URL}/workshop/fde`,
  },
];

/* ---------- FDE vs 驻场外包 ---------- */
const fdeIs = [
  <><b>按阶段交付</b>：每个阶段有明确目标、交付物与验收标准</>,
  <><b>为结果负责</b>：验收看的是「场景跑没跑起来」，不是工时表</>,
  <><b>带产品来</b>：工程围绕 FMClaw™ 底座展开，做完就能持续运行</>,
  <><b>做完会走</b>：能力沉淀在系统与你的团队里，不制造依赖</>,
];
const outsourceIs = [
  <><b>按人头计费</b>：卖的是工程师的时间，坐满就算数</>,
  <><b>为工时负责</b>：需求做没做成，和结算关系不大</>,
  <><b>从零开始写</b>：每个需求现写现改，走了以后没人敢动</>,
  <><b>越驻越久</b>：人走系统就停，依赖是商业模式的一部分</>,
];

/* ---------- 什么时候需要 / 不需要 ---------- */
const needList = [
  <>场景已经验证过——Demo Day 看过、加速营跑通过，或大赛里拿过奖，<b>现在要动真格</b></>,
  <>数据锁在多个系统里，<b>导不出来、对不上、没人说得清</b></>,
  <>要和现有系统打通：收费、工单、财务、IoT，<b>要做真正的接口</b></>,
  <>要的是生产系统：<b>有权限、有稳定性、天天有人用</b>，不是演示环境里的 demo</>,
];
const noNeedList = [
  <>还没验证过场景——先去 <b>Demo Day</b> 花半天眼见为实，别直接上工程</>,
  <>数据一张 Excel 就能导出来——<b>加速营</b>两三天就能跑通，用不着 FDE</>,
  <>只是想「了解一下 AI」——FDE 是重投入，<b>好奇心用免费的方式满足</b></>,
  <>指望常驻工程师随叫随到——那是驻场外包，<b>我们不做，也不建议你买</b></>,
];

/* ---------- 四阶段 ---------- */
const stages = [
  {
    no: "01",
    h: "数据治理",
    p: "最重的一段，刻意放在最前。把散在各系统里的数据理出来：口径对齐、字段清洗、建好数据底座。这一段不做实，后面全是空中楼阁。",
  },
  {
    no: "02",
    h: "系统与接口接入",
    p: "和你的收费、工单、财务、IoT 系统做真正的接口。Demo Day 和加速营刻意不做的事，在这里认真做。",
  },
  {
    no: "03",
    h: "场景上线试运行",
    p: "验证过的场景搬进生产环境：权限、日志、异常处理、值守机制。业务团队开始真用，问题当场修。",
  },
  {
    no: "04",
    h: "验收与扩面",
    p: "按事先写好的标准验收这个阶段。跑稳了，再谈下一个场景、下一批项目——扩不扩、何时扩，决定权在你。",
  },
];

/* ---------- FAQ ---------- */
const faqs = [
  {
    q: "什么是 FDE（前置部署工程师）？",
    a: "FDE 是 Forward Deployed Engineer 的缩写，源自 Palantir 的工程角色与交付模式：工程师深入客户的业务现场，与业务专家协同完成数据治理、系统接入和场景落地，以结果交付计价。这套模式已被硅谷广泛采用——OpenAI、Anthropic、Google、Databricks 都设立了 FDE 团队。我们把这套打法带进中国的不动产与设施管理行业。",
  },
  {
    q: "FDE 和驻场外包有什么区别？",
    a: "这是最常见的误解——在国内，很多号称 FDE 的服务本质上是按人头计费的驻场外包。区别有三条：一，FDE 按阶段交付、按结果验收，驻场按工时结算；二，FDE 带着产品底座来做工程，驻场从零现写现改；三，FDE 做完会走，能力沉淀在系统和你的团队里，驻场越驻越久、人走系统停。简单说：FDE 卖的是结果，驻场卖的是人。",
  },
  {
    q: "FDE 和系统集成商（SI）有什么区别？",
    a: "系统集成商按需求文档实施，需求定错了照样交付；FDE 和你的业务专家一起先把问题定义对，再做工程——因为计价挂在结果上，定义错问题 FDE 自己要买单。另外，FDE 围绕产品底座（我们是 FMClaw™）做落地，不是纯项目制的一次性开发。",
  },
  {
    q: "什么时候需要 FDE，什么时候不需要？",
    a: "需要：场景已验证、要接真系统、数据锁在多个系统里导不出来、要的是天天有人用的生产系统。不需要：场景还没验证（先去 Demo Day）、数据一张表就能导出（加速营够了）、只是想了解 AI（用免费的方式）。FDE 是重投入，我们宁可你晚一点开始，也不希望你在错的时机开始。",
  },
  {
    q: "为什么第一阶段一定是数据治理？",
    a: "因为这是 AI 落地最大的坎。行业数据一再说明：绝大多数企业 AI 项目卡在 PoC 到生产之间，卡点不是模型，是数据——试验可以绕过数据问题，生产绕不过。我们在大赛课题评估里也反复看到同一件事：难的从来不是 AI，是数据质量和接口。所以我们把最重的一段放在最前面，不做实不往下走。",
  },
  {
    q: "FDE 服务怎么计价？",
    a: "按方案单独报价，按阶段付费：每个阶段开始前约定目标、交付物与验收标准，验收通过再进下一阶段。不按人头计费，不签开放式的驻场合同。",
  },
  {
    q: "工程师会进驻我们现场吗？",
    a: "会在需要的阶段深入你的现场——数据摸底、接口联调、上线陪跑都需要人在现场。但「在现场工作」和「驻场外包」是两回事：我们的人为阶段目标来，目标达成就进入下一阶段，不是常驻的人力外派。",
  },
  {
    q: "从哪一步开始比较稳妥？",
    a: "多数客户的路径是：先用半天 Demo Day 眼见为实，或在加速营里亲手跑通一个场景，验证了价值再启动 FDE。直接从 FDE 开始也可以——前提是你已经想清楚要落什么场景，并且数据和系统的复杂度确实需要工程投入。",
  },
];

export default function Page() {
  return (
    <main className="solws">
      <JsonLd data={LD} />

      {/* HERO */}
      <section className="ws-hero has-photo">
        <div className="ws-hero__bg" style={{ backgroundImage: "url(/workshop/fde-hero.jpg)" }} aria-hidden="true" />
        <div className="ws-grid" aria-hidden="true" />
        <div className="wrap ws-hero-top">
          <span className="ws-kicker">
            <Link href="/workshop">加速营</Link>
            <i>/</i>FDE 服务
          </span>
          <h1 className="ws-h1">
            把验证过的场景，<span className="grad">做成生产系统</span>
          </h1>
          <p className="ws-lead">
            FDE——前置部署工程师，深入你的业务现场：数据治理、系统与接口接入，按阶段交付、按阶段验收。
            <b>它交付的是结果，不是人头。它不是驻场外包。</b>
          </p>
          <div className="ws-cta">
            <Link href="/workshop?mode=fde#signup" className="btn btn-primary">聊聊你的场景 <ArrowR /></Link>
            <a href="#not-outsourcing" className="btn btn-ghost">FDE ≠ 驻场 <ArrowR /></a>
          </div>
          <div className="ws-proof">
            <span><b>按阶段</b>交付</span>
            <span className="sep" />
            <span><b>数据治理</b>先行</span>
            <span className="sep" />
            <span><b className="grad">做完会走</b></span>
          </div>
        </div>
      </section>

      {/* 什么是 FDE */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">什么是 FDE</span>
          <h2 className="ws-h2">硅谷验证了十年的 AI 落地打法</h2>
          <p className="ws-sub">
            FDE（Forward Deployed Engineer，前置部署工程师）不是我们发明的词。它源自 <b>Palantir</b>——
            这家公司用「工程师深入客户现场、与业务专家协同交付结果」的模式做了十几年政府与巨头生意；
            这两年 <b>OpenAI、Anthropic、Google、Databricks</b> 相继组建自己的 FDE 团队，把它变成了 AI 落地的行业标准打法。
          </p>
          <p className="ws-sub">
            逻辑很简单：<b>企业 AI 落不了地，缺的从来不是模型，是把模型接进真实业务的工程。</b>
            这段工程没法远程做——数据在你的系统里，流程在你的现场里，坑在你的历史里。
            所以工程师必须「前置」到你那里去。我们把这套打法带进中国的不动产与设施管理行业。
          </p>
        </div>
      </section>

      {/* FDE ≠ 驻场外包 */}
      <section className="ws-band mist" id="not-outsourcing">
        <div className="wrap">
          <span className="ws-eyebrow">最大的误解</span>
          <h2 className="ws-h2">FDE 不是驻场外包</h2>
          <p className="ws-sub">
            在国内，很多号称 FDE 的服务，本质上是换了个洋气名字的人力外派。
            区别不在工程师坐在哪，<b>在为什么付钱、为什么负责。</b>
          </p>
          <div className="ws-bound">
            <div className="ws-bcol">
              <div className="ws-bh">
                <span className="bic">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8.5l3.5 3.5 7-8" /></svg>
                </span>
                FDE 服务
              </div>
              <ul>{fdeIs.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
            <div className="ws-bcol no">
              <div className="ws-bh">
                <span className="bic">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                </span>
                驻场外包
              </div>
              <ul>{outsourceIs.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
          </div>
          <p className="ws-verdict light">
            一句话分辨：<span className="grad">FDE 卖的是结果，驻场卖的是人。</span>
          </p>
        </div>
      </section>

      {/* 什么时候需要 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">时机</span>
          <h2 className="ws-h2">什么时候需要 FDE，什么时候不需要</h2>
          <p className="ws-sub">FDE 是四种方式里投入最重的。<b>时机对，它是最快的一条路；时机不对，它是最贵的弯路。</b></p>
          <div className="ws-bound">
            <div className="ws-bcol">
              <div className="ws-bh">
                <span className="bic">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8.5l3.5 3.5 7-8" /></svg>
                </span>
                这些信号说明你需要
              </div>
              <ul>{needList.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
            <div className="ws-bcol no">
              <div className="ws-bh">
                <span className="bic">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
                </span>
                这些情况先别急
              </div>
              <ul>{noNeedList.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
          </div>
          <p className="ws-bnote">
            拿不准的话，从免费的 <Link href="/workshop/demo-day">Demo Day</Link> 开始——
            我们宁可你晚一点启动 FDE，也不希望你在错的时机启动。
          </p>
        </div>
      </section>

      {/* 四阶段 */}
      <section className="ws-core" id="stages">
        <div className="ws-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ws-eyebrow on-dark">怎么交付</span>
          <h2 className="ws-h2 on-dark">按阶段交付，按阶段验收</h2>
          <p className="ws-sub on-dark-sub">
            每个阶段开始前，目标、交付物、验收标准写在纸上；验收通过，再进下一阶段。<b>不签开放式的驻场合同。</b>
          </p>
          <div className="ws-steps">
            {stages.map((s, i) => (
              <div className="ws-step" key={s.no} data-end={i === 0 ? "true" : undefined}>
                <span className="ws-sno grad">{s.no}</span>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
                {i < stages.length - 1 && <span className="ws-sarr">→</span>}
              </div>
            ))}
          </div>
          <p className="ws-anote" style={{ color: "#AEBAB5" }}>
            阶段划分会按你的场景与系统情况调整——但「数据治理最重、放在最前」这条不变。
          </p>
        </div>
      </section>

      {/* 数据治理第一 */}
      <section className="ws-band">
        <div className="wrap">
          <span className="ws-eyebrow">为什么数据治理第一</span>
          <h2 className="ws-h2">难的从来不是 AI，是数据</h2>
          <div className="ws-duo">
            <div>
              <p className="ws-sub" style={{ marginTop: 0 }}>
                行业数据一再说明同一件事：<b>绝大多数企业 AI 项目卡在 PoC 到生产之间，卡点不是模型，是数据</b>——
                试验可以绕过数据问题，生产绕不过。
              </p>
              <p className="ws-sub">
                我们在 <Link href="/workshop/competition">AI 应用创新大赛</Link>的课题技术评估里也反复看到：
                一线报上来的几十个课题，方案本身大多可行，<b>真正的坎几乎全在数据质量和系统接口上。</b>
              </p>
              <p className="ws-sub">
                所以 FDE 的第一阶段永远是数据治理：口径对齐、字段清洗、把散在各系统里的数据理成一个能用的底座。
                这一段最重、最不性感、最没法演示——<b>也最值钱。</b>
              </p>
            </div>
            <div className="ws-mimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/workshop/fde-data.jpg" alt="FDE 数据治理：工程师把散乱的多系统数据整理成结构化的数据底座" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* 从哪来 */}
      <section className="ws-band mist">
        <div className="wrap">
          <span className="ws-eyebrow">从哪走到这一步</span>
          <h2 className="ws-h2">三条路，终点都在这里</h2>
          <p className="ws-sub">FDE 是四种方式的收口：前面三种帮你验证「值不值得」，FDE 负责「做成真的」。</p>
          <div className="ws-seats">
            <Link className="ws-seat" href="/workshop/demo-day" style={{ textDecoration: "none" }}>
              <div className="role">路径一</div>
              <h4>Demo Day 看过了</h4>
              <p>半天眼见为实，判断是「走得通」——接下来把 demo 环境里的场景做成生产系统。</p>
            </Link>
            <Link className="ws-seat" href="/workshop/bootcamp" style={{ textDecoration: "none" }}>
              <div className="role">路径二</div>
              <h4>加速营跑通了</h4>
              <p>团队亲手搭的 Agent 天天在用，但数据要接系统了——工程的部分交给 FDE。</p>
            </Link>
            <Link className="ws-seat" href="/workshop/competition" style={{ textDecoration: "none" }}>
              <div className="role">路径三</div>
              <h4>大赛评出来了</h4>
              <p>获奖课题里最重的那几个：要接口、要治数据——趁着热度，走 FDE 落成真系统。</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 延伸阅读 → 行业研究 */}
      <RelatedReading
        heading="把 FDE 读透,再来聊"
        sub="FDE 从哪来、为什么有效、和驻场外包差在哪——这几篇研究讲得最透。"
        slugs={["what-is-fde", "demo-vs-system"]}
      />

      {/* FAQ */}
      <SeoFaq heading="关于 FDE，你可能想问的" items={faqs} />

      {/* FINAL CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">验证过的场景，<br />值得被认真做成系统</h2>
          <p className="reveal">按阶段交付，按阶段验收。做完会走。</p>
          <div className="cta-row reveal">
            <Link href="/workshop?mode=fde#signup" className="btn btn-primary">聊聊你的场景 <ArrowR s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
