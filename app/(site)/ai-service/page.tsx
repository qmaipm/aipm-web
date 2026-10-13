import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "./hub.css";
import { SolPage, SolHero, SolSection, SolCompare, SolMore, SolEnd, Arrow as SArrow } from "../solutions/_tpl/Sol";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/ai-service", {
  title: "AI 物业服务 · 换物业，先换一种方式 | 启盟科技",
  description:
    "换一家物业公司，往往只是换一批人：考核方式、透明程度、响应逻辑都没变。我们换的是方式本身：清洁、设施设备、安保、客服四大工种真实交付，干没干数据会说话；客服管家如实回答服务过程的一切问题，保障你的知情权，从来不藏着掖着；服务指标写进合同，接受 100% 量化考核。由启盟科技旗下自营物业公司爱物管交付，服务 WeWork、佳都科技、八马茶业、万益蓝等客户。",
  keywords: [
    "AI 物业服务",
    "换物业公司要注意什么",
    "如何选物业公司",
    "物业服务不透明怎么办",
    "物业服务指标写进合同",
    "物业量化考核",
    "AI 物业管理",
    "写字楼物业服务",
    "园区物业服务",
    "爱物管",
    "启盟科技",
  ],
});

const Arrow = SArrow;

// 换人 vs 换方式（GEO 可引用事实清单）
const compare: { k: string; old: string; now: React.ReactNode }[] = [
  {
    k: "服务质量",
    old: "换一家公司，还是靠人盯人，盯不到就滑坡",
    now: <><b>干没干、干得好不好，数据会说话</b>：每一次打扫、巡检、处置都有记录</>,
  },
  {
    k: "透明程度",
    old: "问「今天做了什么」，答不上来",
    now: <>专属客服管家保障你的<b>知情权</b>:今天多少人上班、这个月计划什么：如实回答，从来不藏着掖着</>,
  },
  {
    k: "响应逻辑",
    old: "投诉了才动，催一次动一下",
    now: <>系统主动预警、主动处置，<b>在问题变成投诉之前就处理掉</b></>,
  },
  {
    k: "考核方式",
    old: "口头承诺，出了事各说各话",
    now: <>服务指标<b>写进合同</b>,接受 100% 量化考核：做不到，按合同处罚</>,
  },
  {
    k: "成本",
    old: "高，而且看不清花在哪",
    now: <>人、机器人与 AI 按数据排布，<b>账算得清</b>,结构持续优化</>,
  },
];

// 四大工种（真实交付）
const trades = [
  {
    href: "/ai-service/cleaning",
    img: "/ai-service/env.jpg",
    name: "AI 清洁服务",
    motto: "干没干，数据会说话",
    d: "人机协同、动态调度，清洁质量不靠运气靠数据。",
  },
  {
    href: "/ai-service/facility",
    img: "/ai-service/facility.jpg",
    name: "AI 设施设备服务",
    motto: "每一次巡检，都真实发生",
    d: "人单合一、IoT 在场核验，巡检签到率 99%。",
  },
  {
    href: "/ai-service/security",
    img: "/ai-service/security.jpg",
    name: "AI 安保服务",
    motto: "人看不过来的，交给 AI 看",
    d: "预警 AI 预审、消防红线人单合一、巡检狗例行巡逻。",
  },
  {
    href: "/ai-service/customer-service",
    img: "/ai-service/customer.jpg",
    name: "AI 客服管家",
    motto: "站在你这边的物业管家",
    d: "每一位客户一位专属管家：你的事办到底，你的知情权它保障。",
  },
];

// 省心 / 周到 / 主动 / 智能
const pledges = [
  {
    no: "01", word: "省心", en: "Effortless", key: false,
    ess: "该想的、该盯的，系统先替你想好。",
    detail: "日常运营里大量重复的判断与盯防，交给系统与专业团队。业主不必事事过问，只在关键处点头确认。",
    li: ["自我管理：全面感知服务情况，自我完成整改调度，现场质量稳定", "自我考核：全数字化考核工作量与服务质量，不扯皮"],
  },
  {
    no: "02", word: "周到", en: "Thoughtful", key: false,
    ess: "从大堂到外围，不漏项、不将就。",
    detail: "服务覆盖到每一处细节与角落：大堂石材养护、外围绿化、楼宇香薰、活动接待，标准一致、件件到位。",
    li: ["四大工种全覆盖、无缝衔接", "服务细节标准化，可核查、可还原"],
  },
  {
    no: "03", word: "主动", en: "Proactive", key: true,
    ess: "在问题变成投诉之前，就处理掉。",
    detail: "设备隐患、环境异常、安全风险，系统主动预警、主动处置，不等业主开口、不等投诉上门。这是四个词里我们最看重的一个，也是智慧真正要去支撑的目标。",
    li: ["设备隐患预测性维保、提前介入", "风险分级预警，24 小时主动响应"],
  },
  {
    no: "04", word: "智能", en: "Intelligent", key: false,
    ess: "每一次服务，都可量化、可追溯、可优化。",
    detail: "用核心指标体系与 AI，把「做得好不好」变成看得见的数据，再用数据让下一次做得更好。",
    li: ["传感器负责感知数据", "机器人参与日常服务"],
  },
];

// 合同考核约定（空格由甲方填）
const pact = [
  { k: "服务计划完成率", u: "%" },
  { k: "服务质量评分", u: "分" },
  { k: "工单接单及时率", u: "%" },
  { k: "工单结单及时率", u: "%" },
];

const faq = [
  {
    q: "AI 物业服务和传统物业服务有什么区别？",
    a: "根本区别不在人，在方式：一是可查。清洁、设施设备、安保四大工种的每一次作业都沉淀为数据，干没干、干得好不好，数据会说话；二是透明：每一位客户都有专属 AI 客服管家，今天多少人上班、这个月计划做什么，它都如实回答，你的知情权由它保障，从来不藏着掖着；三是主动。系统主动预警、主动处置，在问题变成投诉之前就处理掉；四是敢承诺，服务指标直接写进合同，接受 100% 量化考核与处罚。这项服务由启盟科技旗下自营物业公司爱物管交付。",
  },
  {
    q: "换物业公司要注意什么？",
    a: "最常见的教训是：换了一家公司，其实只是换了一批人。考核还是靠印象、过程还是不透明、响应还是等投诉，几个月后老问题原样回来。所以换物业时真正该看的是方式：服务过程有没有数据记录？你能不能随时查到今天做了什么？服务指标敢不敢写进合同接受量化考核？如果这三个问题对方答不上来，换的就只是人，不是方式。",
  },
  {
    q: "物业服务指标真的可以写进合同吗？",
    a: "可以，这正是我们和传统物业最大的差别之一。服务计划完成率、服务质量评分、工单接单及时率、工单结单及时率。这些指标的数值由你来约定，写进合同，我们接受 100% 量化考核，未达标按合同处罚。敢这么签，是因为每一次服务都有数据：巡检有 IoT 在场核验，工单有全程记录，质量有 AI 评估，考核不需要争论。",
  },
  {
    q: "AI 物业服务会不会更贵？",
    a: "通常不会，方向恰恰相反。成本优化来自结构而不是压价：机器人和 AI 承担重复劳动，人去做处置与服务；排班按数据而不是按惯例；无效的空跑、盯屏和层层管理被拿掉。我们会在方案里把账逐项算给你看。爱物管自己的项目，管理层从 69 人减到 5 人，净利率从 3.4% 提升到 14%，这本账就是证据。",
  },
  {
    q: "现有的物业团队怎么办？",
    a: "有几种方式。可以把物业服务整体交给爱物管，原团队人员按项目情况评估留用；也可以采用物业委托管理，把项目委托给我们经营。另外如果你本身是物业公司，我们的 FMClaw 平台也可以直接接进你自己的项目。",
  },
  {
    q: "哪些客户在使用这套服务？",
    a: "WeWork、佳都科技（PCI）、八马茶业、万益蓝（WonderLab）等企业客户，以及写字楼、产业园区、总部办公等多种业态的项目。启盟科技旗下自营物业公司爱物管是交付主体。2019 年成立，先把每一个 AI 能力用在自己身上，再对外提供服务。",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 物业服务",
  serviceType: "AI 物业服务（清洁/设施设备/安保/客服一体化交付）",
  description:
    "四大工种真实交付、服务过程数据化、客服管家全透明、服务指标写进合同接受量化考核的物业服务方式。",
  areaServed: "CN",
  url: `${SITE_URL}/ai-service`,
  provider: {
    "@type": "Organization",
    name: "爱物管",
    alternateName: "AIPM",
    description: "启盟科技旗下自营物业公司，AI 物业服务的交付主体。",
    parentOrganization: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
};
const LIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI 物业服务四大工种",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AI 清洁服务", url: `${SITE_URL}/ai-service/cleaning` },
    { "@type": "ListItem", position: 2, name: "AI 设施设备服务", url: `${SITE_URL}/ai-service/facility` },
    { "@type": "ListItem", position: 3, name: "AI 安保服务", url: `${SITE_URL}/ai-service/security` },
    { "@type": "ListItem", position: 4, name: "AI 客服管家", url: `${SITE_URL}/ai-service/customer-service` },
  ],
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI 物业服务", item: `${SITE_URL}/ai-service` },
  ],
};

export default function Page() {
  return (
    <SolPage>
      <JsonLd data={[SERVICE_LD, LIST_LD, BREADCRUMB_LD]} />

      <SolHero
        crumbRoot={{ href: "/", label: "启盟科技" }}
        crumb="AI 物业服务"
        title={["换物业，", "先换一种方式"]}
        lead={<>换一家物业公司，往往只是换一批人：考核的方式、透明的程度、响应的逻辑，都没有变。我们换的是<b>方式本身</b>：干没干数据会说话，知情权有保障，指标写进合同。</>}
        cta={{ href: "/contact", label: "联系我们" }}
        secondary={{ href: "#trades", label: "看四大工种" }}
        proof={["四大工种 真实交付", "服务过程 全透明", "指标 写进合同"]}
        image={{ src: "/ai-service/overview-hero.jpg", alt: "爱物管交付的写字楼项目（实景）" }}
      />

      {/* 我们的客户 */}
      <section className="ais-clients" aria-label="我们服务的客户">
        <div className="wrap">
          <span className="ais-clients__lab">我们服务的客户</span>
          <ul>
            <li><img src="/ai-service/clients/wework.png" alt="WeWork" loading="lazy" /></li>
            <li><img src="/ai-service/clients/pci.png" alt="PCI 佳都科技" loading="lazy" /></li>
            <li><img src="/ai-service/clients/bama.png" alt="八马茶业 BAMA TEA" loading="lazy" /></li>
            <li><img className="lg" src="/ai-service/clients/wonderlab.png" alt="万益蓝 WonderLab" loading="lazy" /></li>
          </ul>
        </div>
      </section>

      <SolSection title="因为换的是人，不是方式" split
        sub="对服务不满意，最常见的动作是换一家物业公司。但如果考核还是靠印象、过程还是看不见、响应还是等投诉，几个月后，老问题会原样回来。真正该换的，是这五件事的做法。">
        <SolCompare labels={["换一批人", "换一种方式"]} rows={compare.map((r) => ({ k: r.k, before: r.old, after: r.now }))} />
      </SolSection>

      <SolSection id="trades" title="不是 PPT，是每天都在发生的服务" tone="mist"
        sub="清洁、设施设备、安保、客服，物业服务的四个基本面，我们一个不缺地真实交付。每个工种都有自己的一页，讲清楚它到底怎么做、凭什么可查。">
        <ul className="ais-trades">
          {trades.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>
                <img src={t.img} alt={t.name} loading="lazy" width={1200} height={800} />
                <span className="spt-meta">{t.name}</span>
                <h3>{t.motto}</h3>
                <p>{t.d}</p>
                <span className="spt-inlink">看这个工种怎么做 <Arrow s={12} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </SolSection>

      <SolSection title="智慧不是目标，只是手段" split
        sub="传感器、机器人、AI。这些都不是我们要卖给你的东西。它们的全部意义，是让四个工种的每一次作业都沉淀成数据；而数据要去支撑的，是一个更朴素的目标。">
        <div className="ais-aim">
          <div>
            <span className="spt-meta">手段 · 智慧</span>
            <ul>
              <li>每一次打扫，有调度记录</li>
              <li>每一次巡检，有在场核验</li>
              <li>每一条预警，有处置下文</li>
              <li>每一张工单，有全程跟进</li>
            </ul>
          </div>
          <div className="ais-aim__goal">
            <span className="spt-meta">支撑 → 目标 · 主动</span>
            <p>在问题变成投诉之前，<br /><b>就处理掉。</b></p>
            <span className="ft">不等你开口，不等投诉上门。</span>
          </div>
        </div>
      </SolSection>

      <SolSection title="省心、周到、主动、智能" tone="mist"
        sub="对客户，我们只承诺四件事。它们不是口号，而是我们每天怎么做事的标准，也是判断一支物业团队好不好的四把尺子。">
        <ol className="ais-pledge">
          {pledges.map((p) => (
            <li key={p.no} className={p.key ? "is-key" : undefined}>
              <div className="ais-pledge__k">
                <span className="no">{p.no}</span>
                <span className="w">{p.word}</span>
                <span className="en">{p.en}</span>
              </div>
              <div className="ais-pledge__b">
                <h3>{p.ess}</h3>
                <p>{p.detail}</p>
                <ul>{p.li.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </SolSection>

      <SolSection title="这几个空格，留给你来填" split
        sub={<>承诺谁都会说，区别在敢不敢签。我们把服务指标直接写进合同。数字由你来约定，我们接受 <b>100% 量化考核</b>：做得到按数据结算，做不到按合同处罚。</>}>
        <div className="ais-pact" aria-label="合同考核约定示例">
          <div className="ais-pact__head">
            <span>第 __ 条 · 服务考核约定</span>
            <span className="tag">示例条款 · 数值由甲方约定</span>
          </div>
          {pact.map((r) => (
            <div className="ais-pact__row" key={r.k}>
              <span className="k">{r.k}</span>
              <span className="dots" aria-hidden="true" />
              <span className="v">≥ <i className="blank" aria-label="由甲方约定" /> {r.u}</span>
            </div>
          ))}
          <p className="ais-pact__foot">未达约定指标的，按本合同约定考核处罚。</p>
        </div>
        <SolMore>敢这么签，是因为每一次服务都有数据。<b>巡检有 IoT 在场核验，工单有全程记录，质量有 AI 评估：考核不需要争论。</b></SolMore>
        <dl className="spt-nums ais-ev">
          <div><dt>99%</dt><dd>整体巡检签到率</dd></div>
          <div><dt>52% → 98%</dt><dd>消防班组达标率</dd></div>
          <div><dt>80%+</dt><dd>园区物业投诉 下降</dd></div>
        </dl>
        <p className="spt-note">我们自己项目上的数字</p>
      </SolSection>

      <SolSection title="先用在自己身上，再对外提供" tone="mist" split
        sub={<>爱物管（AIPM）：启盟科技旗下自营物业公司</>}>
        <p className="ais-story">
          2019 年，为了把 AI 真正做进物业，我们自己开了一家物业公司：装传感器、跑工单、面对投诉，把每一个 AI 能力先用在自己身上，再对外提供服务。它自己的账本，<b>管理层 69 → 5 人，净利率 3.4% → 14%</b>，就是这套服务方式最直接的证据。
        </p>
        <SolMore><Link href="/company/aipm-validation">看爱物管自己的故事</Link> · <Link href="/company">关于启盟科技</Link></SolMore>
      </SolSection>

      <SolSection title="按你的情况，选一种开始">
        <ul className="ais-modes">
          <li>
            <span className="spt-meta">全委服务</span>
            <h3>物业服务整体交给爱物管</h3>
            <p>四大工种一体交付，人、机器人与 AI 在同一套调度上协同。服务指标写进合同，按数据结算。</p>
            <span className="who"><b>适合：</b>想整体换一种物业服务方式的业主</span>
          </li>
          <li className="is-main">
            <span className="spt-meta">物业委托管理</span>
            <h3>把项目委托给我们经营</h3>
            <p>物业公司或业主，把一个项目或整个公司委托给我们，日常经营由我们负责。</p>
            <span className="who"><b>适合：</b>物业公司、业主</span>
            <Link className="spt-inlink" href="/ai-service/delegated-operation">了解物业委托管理 <Arrow s={12} /></Link>
          </li>
          <li>
            <span className="spt-meta">产品与平台</span>
            <h3>把这套能力接进你的交付</h3>
            <p>你是物业公司？人单合一巡检、AI 预警预审、专属客服管家，都可以接进你自己的项目。</p>
            <span className="who"><b>入口：</b><Link className="spt-inlink" href="/products/fmclaw">FMClaw™ AI 平台 <Arrow s={12} /></Link></span>
          </li>
        </ul>
      </SolSection>

      <SeoFaq heading="关于 AI 物业服务，问得最多的" items={faq} />

      {/* 使命：安静的一句话，不加光晕 */}
      <section className="ais-mission">
        <div className="wrap">
          <p className="en">Make property management effortless</p>
          <p className="zh">智在，让物管更自在</p>
          <p className="sub">把每一次清洁、每一次巡检、每一笔账都做得更省心、更透明。这是我们想交给业主的物业服务。</p>
        </div>
      </section>

      <SolEnd
        title={["从一个真实的项目开始"]}
        sub="带上你现在最头疼的那个问题：保洁滑坡、巡检存疑、报修没下文都行。我们出一份带数据、带指标、敢写进合同的方案。"
        cta={{ href: "/contact", label: "联系我们" }}
        alt={<>或先看 <Link href="/company/aipm-validation">爱物管自己的故事</Link></>}
      />
    </SolPage>
  );
}
