import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "./page.css";
import "./trade.css";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/ai-service", {
  title: "AI 物业服务 · 换物业，先换一种方式 | 启盟科技",
  description:
    "换一家物业公司,往往只是换一批人——考核方式、透明程度、响应逻辑都没变。我们换的是方式本身:清洁、设施设备、安保、客服四大工种真实交付,干没干数据会说话;客服管家如实回答服务过程的一切问题,保障你的知情权,从来不藏着掖着;服务指标写进合同,接受 100% 量化考核。由启盟科技旗下自营物业公司爱物管交付,服务 WeWork、佳都科技、八马茶业、万益蓝等客户。",
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

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 换人 vs 换方式(GEO 可引用事实清单)
const compare: { k: string; old: string; now: React.ReactNode }[] = [
  {
    k: "服务质量",
    old: "换一家公司,还是靠人盯人,盯不到就滑坡",
    now: <><b>干没干、干得好不好,数据会说话</b>——每一次打扫、巡检、处置都有记录</>,
  },
  {
    k: "透明程度",
    old: "问「今天做了什么」,答不上来",
    now: <>专属客服管家保障你的<b>知情权</b>:今天多少人上班、这个月计划什么——如实回答,从来不藏着掖着</>,
  },
  {
    k: "响应逻辑",
    old: "投诉了才动,催一次动一下",
    now: <>系统主动预警、主动处置,<b>在问题变成投诉之前就处理掉</b></>,
  },
  {
    k: "考核方式",
    old: "口头承诺,出了事各说各话",
    now: <>服务指标<b>写进合同</b>,接受 100% 量化考核——做不到,按合同处罚</>,
  },
  {
    k: "成本",
    old: "高,而且看不清花在哪",
    now: <>人、机器人与 AI 按数据排布,<b>账算得清</b>,结构持续优化</>,
  },
];

// 四大工种(真实交付)
const trades = [
  {
    href: "/ai-service/cleaning",
    img: "/ai-service/env.jpg",
    name: "AI 清洁服务",
    motto: "干没干，数据会说话",
    d: "人机协同、动态调度,清洁质量不靠运气靠数据。",
  },
  {
    href: "/ai-service/facility",
    img: "/ai-service/facility.jpg",
    name: "AI 设施设备服务",
    motto: "每一次巡检，都真实发生",
    d: "人单合一、IoT 在场核验,巡检签到率 99%。",
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
    d: "每一位客户一位专属管家:你的事办到底,你的知情权它保障。",
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
    detail: "服务覆盖到每一处细节与角落——大堂石材养护、外围绿化、楼宇香薰、活动接待，标准一致、件件到位。",
    li: ["四大工种全覆盖、无缝衔接", "服务细节标准化，可核查、可还原"],
  },
  {
    no: "03", word: "主动", en: "Proactive", key: true,
    ess: "在问题变成投诉之前，就处理掉。",
    detail: "设备隐患、环境异常、安全风险，系统主动预警、主动处置，不等业主开口、不等投诉上门。这是四个词里我们最看重的一个——也是智慧真正要去支撑的目标。",
    li: ["设备隐患预测性维保、提前介入", "风险分级预警，24 小时主动响应"],
  },
  {
    no: "04", word: "智能", en: "Intelligent", key: false,
    ess: "每一次服务，都可量化、可追溯、可优化。",
    detail: "用核心指标体系与 AI，把「做得好不好」变成看得见的数据，再用数据让下一次做得更好。",
    li: ["传感器负责感知数据", "机器人参与日常服务"],
  },
];

// 合同考核约定(空格由甲方填)
const pact = [
  { k: "服务计划完成率", u: "%" },
  { k: "服务质量评分", u: "分" },
  { k: "工单接单及时率", u: "%" },
  { k: "工单结单及时率", u: "%" },
];

const faq = [
  {
    q: "AI 物业服务和传统物业服务有什么区别?",
    a: "根本区别不在人,在方式:一是可查——清洁、设施设备、安保四大工种的每一次作业都沉淀为数据,干没干、干得好不好,数据会说话;二是透明——每一位客户都有专属 AI 客服管家,今天多少人上班、这个月计划做什么,它都如实回答,你的知情权由它保障,从来不藏着掖着;三是主动——系统主动预警、主动处置,在问题变成投诉之前就处理掉;四是敢承诺——服务指标直接写进合同,接受 100% 量化考核与处罚。这项服务由启盟科技旗下自营物业公司爱物管交付。",
  },
  {
    q: "换物业公司要注意什么?",
    a: "最常见的教训是:换了一家公司,其实只是换了一批人——考核还是靠印象、过程还是不透明、响应还是等投诉,几个月后老问题原样回来。所以换物业时真正该看的是方式:服务过程有没有数据记录?你能不能随时查到今天做了什么?服务指标敢不敢写进合同接受量化考核?如果这三个问题对方答不上来,换的就只是人,不是方式。",
  },
  {
    q: "物业服务指标真的可以写进合同吗?",
    a: "可以,这正是我们和传统物业最大的差别之一。服务计划完成率、服务质量评分、工单接单及时率、工单结单及时率——这些指标的数值由你来约定,写进合同,我们接受 100% 量化考核,未达标按合同处罚。敢这么签,是因为每一次服务都有数据:巡检有 IoT 在场核验,工单有全程记录,质量有 AI 评估,考核不需要争论。",
  },
  {
    q: "AI 物业服务会不会更贵?",
    a: "通常不会,方向恰恰相反。成本优化来自结构而不是压价:机器人和 AI 承担重复劳动,人去做处置与服务;排班按数据而不是按惯例;无效的空跑、盯屏和层层管理被拿掉。我们会在方案里把账逐项算给你看——爱物管自己的项目,管理层从 69 人减到 5 人,净利率从 3.4% 提升到 14%,这本账就是证据。",
  },
  {
    q: "现有的物业团队怎么办?",
    a: "有两种方式。方式一是全委服务,由爱物管整体接管,原团队人员可以按项目情况评估留用;方式二是顾问驻场——你的团队留下,我们派驻项目顾问带全套 AI 产品进场,参与管理与考核,换的是方式而不是人。另外如果你本身是物业公司,我们的 FMClaw 平台也可以直接接进你自己的项目。",
  },
  {
    q: "哪些客户在使用这套服务?",
    a: "WeWork、佳都科技(PCI)、八马茶业、万益蓝(WonderLab)等企业客户,以及写字楼、产业园区、总部办公等多种业态的项目。启盟科技旗下自营物业公司爱物管是交付主体——2019 年成立,先把每一个 AI 能力用在自己身上,再对外提供服务。",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 物业服务",
  serviceType: "AI 物业服务(清洁/设施设备/安保/客服一体化交付)",
  description:
    "四大工种真实交付、服务过程数据化、客服管家全透明、服务指标写进合同接受量化考核的物业服务方式。",
  areaServed: "CN",
  url: `${SITE_URL}/ai-service`,
  provider: {
    "@type": "Organization",
    name: "爱物管",
    alternateName: "AIPM",
    description: "启盟科技旗下自营物业公司,AI 物业服务的交付主体。",
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
    <main className="aisv avtrade avhub">
      <JsonLd data={[SERVICE_LD, LIST_LD, BREADCRUMB_LD]} />

      {/* HERO */}
      <section className="av-hero">
        <div className="av-hero__bg is-overview" aria-hidden="true" />
        <div className="av-grid" aria-hidden="true" />
        <div className="wrap av-hero-top">
          <span className="av-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>AI 物业服务
          </span>
          <h1 className="av-h1 reveal">换物业，先换一种方式</h1>
          <p className="av-lead reveal">
            换一家物业公司，往往只是换一批人——考核的方式、透明的程度、响应的逻辑，都没有变。我们换的是<b>方式本身</b>：干没干数据会说话，知情权有保障，指标写进合同。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow /></Link>
            <a href="#trades" className="btn btn-ghost">看四大工种 <Arrow /></a>
          </div>
          <div className="av-proof reveal">
            <span><b className="grad">四大工种</b> 真实交付</span>
            <span className="sep" />
            <span>服务过程 <b>全透明</b></span>
            <span className="sep" />
            <span>指标 <b>写进合同</b></span>
          </div>
        </div>
      </section>

      {/* 我们的客户 */}
      <section className="av-clients">
        <div className="wrap">
          <span className="av-clients__lab">我们服务的客户</span>
          <div className="av-clients__row">
            <div className="av-cli"><img src="/ai-service/clients/wework.png" alt="WeWork" loading="lazy" /></div>
            <div className="av-cli"><img src="/ai-service/clients/pci.png" alt="PCI 佳都科技" loading="lazy" /></div>
            <div className="av-cli"><img src="/ai-service/clients/bama.png" alt="八马茶业 BAMA TEA" loading="lazy" /></div>
            <div className="av-cli"><img className="cli-lg" src="/ai-service/clients/wonderlab.png" alt="万益蓝 WonderLab" loading="lazy" /></div>
          </div>
        </div>
      </section>

      {/* 换人 vs 换方式 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">为什么换了物业，问题还在</span>
          <h2 className="av-h2 reveal">因为换的是人，不是方式</h2>
          <p className="av-sub reveal">
            对服务不满意，最常见的动作是换一家物业公司。但如果考核还是靠印象、过程还是看不见、响应还是等投诉——几个月后，老问题会原样回来。真正该换的，是这五件事的做法。
          </p>
          <div className="avc-cmp reveal" role="table" aria-label="换人与换方式的对比">
            <div className="avc-row avc-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">换一批人</div>
              <div className="now" role="columnheader">换一种方式</div>
            </div>
            {compare.map((r) => (
              <div className="avc-row" role="row" key={r.k}>
                <div className="avc-k" role="cell">{r.k}</div>
                <div className="avc-old" role="cell">{r.old}</div>
                <div className="avc-new" role="cell">{r.now}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 四大工种 · 实景卡 */}
      <section className="av-band mist" id="trades">
        <div className="wrap">
          <span className="av-eyebrow reveal">四大工种 · 真实交付</span>
          <h2 className="av-h2 reveal">不是 PPT，是每天都在发生的服务</h2>
          <p className="av-sub reveal">
            清洁、设施设备、安保、客服——物业服务的四个基本面，我们一个不缺地真实交付。每个工种都有自己的一页，讲清楚它到底怎么做、凭什么可查。
          </p>
          <div className="av-trades">
            {trades.map((t) => (
              <Link className="av-trade reveal" href={t.href} key={t.href}>
                <div className="av-trade__media">
                  <img src={t.img} alt={t.name} loading="lazy" />
                </div>
                <div className="av-trade__body">
                  <span className="nm">{t.name}</span>
                  <h3>{t.motto}</h3>
                  <p>{t.d}</p>
                  <span className="go">看这个工种怎么做 <Arrow s={13} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 智慧是手段，主动是目标 · 暗场 */}
      <section className="av-core">
        <div className="av-core__bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow on-dark reveal">我们怎么看「智慧物业」</span>
          <h2 className="av-h2 on-dark reveal">智慧不是目标，只是手段</h2>
          <p className="av-sub on-dark reveal" style={{ maxWidth: 640 }}>
            传感器、机器人、AI——这些都不是我们要卖给你的东西。它们的全部意义，是让四个工种的每一次作业都沉淀成数据；而数据要去支撑的，是一个更朴素的目标。
          </p>
          <div className="av-aim reveal">
            <div className="av-aim__means">
              <span className="lb">手段 · 智慧</span>
              <ul>
                <li>每一次打扫，有调度记录</li>
                <li>每一次巡检，有在场核验</li>
                <li>每一条预警，有处置下文</li>
                <li>每一张工单，有全程跟进</li>
              </ul>
            </div>
            <div className="av-aim__arrow" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>支撑</span>
            </div>
            <div className="av-aim__goal">
              <span className="lb">目标 · 主动</span>
              <p>在问题变成投诉之前，<br /><b>就处理掉。</b></p>
              <span className="ft">不等你开口，不等投诉上门。</span>
            </div>
          </div>
        </div>
      </section>

      {/* 对客户的承诺 · 省心/周到/主动/智能 */}
      <section className="av-band mist av-pledge-band">
        <div className="av-pledge-bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow reveal">对客户的承诺</span>
          <h2 className="av-h2 reveal">省心、周到、主动、智能</h2>
          <p className="av-sub reveal">对客户，我们只承诺四件事。它们不是口号，而是我们每天怎么做事的标准——也是判断一支物业团队好不好的四把尺子。</p>
          <div className="av-pledge">
            {pledges.map((p) => (
              <article className={"av-pcard reveal" + (p.key ? " is-key" : "")} key={p.no}>
                <div className="av-pcard__top">
                  <span className="av-pno">{p.no}</span>
                  <span className="av-pen">{p.en}</span>
                </div>
                <div className="av-pword">{p.word}</div>
                <p className="av-pess">{p.ess}</p>
                <p className="av-pdetail">{p.detail}</p>
                <ul className="av-ppoints">{p.li.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 指标写进合同 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">承诺的兜底</span>
          <h2 className="av-h2 reveal">这几个空格，留给你来填</h2>
          <p className="av-sub reveal">
            承诺谁都会说，区别在敢不敢签。我们把服务指标直接写进合同——数字由你来约定，我们接受 <b>100% 量化考核</b>：做得到按数据结算，做不到按合同处罚。
          </p>
          <div className="av-pact reveal" aria-label="合同考核约定示例">
            <div className="av-pact__head">
              <span className="cl">第 __ 条 · 服务考核约定</span>
              <span className="tag">示例条款 · 数值由甲方约定</span>
            </div>
            <div className="av-pact__rows">
              {pact.map((r) => (
                <div className="av-pact__row" key={r.k}>
                  <span className="k">{r.k}</span>
                  <span className="dots" aria-hidden="true" />
                  <span className="v">≥ <i className="blank" aria-label="由甲方约定" /> {r.u}</span>
                </div>
              ))}
            </div>
            <p className="av-pact__foot">未达约定指标的，按本合同约定考核处罚。</p>
          </div>
          <div className="avc-stand reveal">
            <p>
              敢这么签，是因为每一次服务都有数据。<b>巡检有 IoT 在场核验，工单有全程记录，质量有 AI 评估——考核不需要争论。</b>
            </p>
            <p className="av-pact__ev">
              我们自己项目上的数字：整体巡检签到率 <b>99%</b> · 消防班组达标率 <b>52% → 98%</b> · 园区物业投诉 <b>下降 80%+</b>
            </p>
          </div>
        </div>
      </section>

      {/* 谁在为你服务 · 爱物管 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">谁在为你服务</span>
          <h2 className="av-h2 reveal">先用在自己身上，再对外提供</h2>
          <div className="avc-who reveal">
            <div className="avc-who__brand">
              <span className="nm">爱物管</span>
              <span className="en">AIPM</span>
              <span className="rel">启盟科技旗下<br />自营物业公司</span>
            </div>
            <div className="avc-who__body">
              <p>
                2019 年，为了把 AI 真正做进物业，我们自己开了一家物业公司：装传感器、跑工单、面对投诉，把每一个 AI 能力先用在自己身上，再对外提供服务。它自己的账本——<b>管理层 69 → 5 人，净利率 3.4% → 14%</b>——就是这套服务方式最直接的证据。
              </p>
              <div className="avc-who__links">
                <Link className="av-link" href="/company/aipm-validation">看爱物管自己的故事 <Arrow s={13} /></Link>
                <Link className="av-link" href="/company">关于启盟科技 <Arrow s={13} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 三种合作方式 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">三种合作方式</span>
          <h2 className="av-h2 reveal">按你的情况，选一种开始</h2>
          <div className="avc-modes">
            <article className="avc-mode reveal">
              <span className="lab">方式一 · 全委服务</span>
              <h3>物业服务整体交给爱物管</h3>
              <p>四大工种一体交付，人、机器人与 AI 在同一套调度上协同。服务指标写进合同，按数据结算。</p>
              <span className="who"><b>适合：</b>想整体换一种物业服务方式的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式二 · 顾问驻场</span>
              <h3>你的团队留下，换管理方式</h3>
              <p>我们派驻项目顾问，带全套 AI 产品进场，参与管理与考核。服务期至少一年。</p>
              <span className="who"><b>适合：</b>现有团队不想动、但想把过程管透明的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式三 · 产品与平台</span>
              <h3>把这套能力接进你的交付</h3>
              <p>你是物业公司？人单合一巡检、AI 预警预审、专属客服管家，都可以接进你自己的项目。</p>
              <span className="who"><b>入口：</b><Link className="av-link" href="/products/fmclaw" style={{ fontSize: 13 }}>FMClaw™ AI 平台 <Arrow s={12} /></Link></span>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于 AI 物业服务，问得最多的" items={faq} />

      {/* 使命 */}
      <section className="av-mission">
        <span className="av-mission__glow" aria-hidden="true" />
        <div className="wrap">
          <p className="av-mission-en reveal">Make property management effortless</p>
          <p className="av-mission-zh reveal">智在，让物管更自在</p>
          <p className="av-mission-sub reveal">把每一次清洁、每一次巡检、每一笔账都做得更省心、更透明——这是我们想交给业主的物业服务。</p>
        </div>
      </section>

      {/* 尾部 CTA */}
      <section className="avc-end">
        <div className="avc-end__glow" aria-hidden="true" />
        <div className="wrap">
          <h2 className="reveal">从一个真实的项目开始</h2>
          <p className="reveal">
            带上你现在最头疼的那个问题——保洁滑坡、巡检存疑、报修没下文都行。我们出一份带数据、带指标、敢写进合同的方案。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow /></Link>
            <span className="alt">或先看 <Link href="/company/aipm-validation">爱物管自己的故事</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
