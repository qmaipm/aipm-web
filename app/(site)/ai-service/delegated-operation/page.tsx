import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "../page.css";
import "../trade.css";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/ai-service/delegated-operation", {
  // 定位（2026-09-08 改）：品类名用酒店业沿用四十年的成熟概念「委托管理」承接搜索，
  // 「AI 物业代运营」退为产品名。目标读者是酒管甲方、酒店投资人、园区/商业地产资产方与
  // 酒店拓展/选址渠道——他们搜的是「委托管理」「全权委托」「管理输出」「轻资产」，不是「代运营」。
  title: "物业委托管理：像酒店管理公司管酒店一样，把写字楼和园区交给运营方 | 启盟 AI 物业代运营",
  description:
    "酒店业沿用四十年的委托管理模式，现在可以用在写字楼、产业园区和商业综合体上。业主方保留产权、收款账户与重大事项决定权；运营方（启盟科技）输出 AI 运营体系、机器人与专业团队负责日常经营；业主按月获得保底收益，再分享经营盈余。费用结构对应酒管的基本管理费＋奖励管理费，AI 投入由运营方自担。不是电商代运营，不是房屋租赁托管，也不是物业分包。",
  keywords: [
    "物业委托管理",
    "物业全权委托管理",
    "委托管理模式 物业",
    "酒店委托管理模式 写字楼",
    "酒店管理公司模式 园区",
    "物业管理输出",
    "轻资产 委托运营 写字楼",
    "存量物业 盘活 委托运营",
    "业主 保底 分成 物业运营",
    "基本管理费 奖励管理费 物业",
    "AI 物业代运营",
    "物业委托运营",
    "物业项目亏损怎么办",
    "物业费收缴率低",
    "启盟科技",
    "爱物管",
  ],
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ============ 数据（口径全部对照 docs/SEO-GEO-STRATEGY.md §4a，逐字使用） ============ */

// 行业三件事（外部研报数，必须带来源）
const industry = [
  {
    n: "01 · 收缴率",
    v: "71%",
    t: "500 强物企平均物业费收缴率（2025）",
    d: "已连续四年下滑，中小物企普遍不足 65%。收不上来的钱，最先吃掉的是利润。",
    src: "来源：克而瑞物管 2025",
  },
  {
    n: "02 · 人工成本",
    v: "57.8%",
    t: "人力成本占物业企业总成本的比重",
    d: "刚性支出，且逐年上涨。项目要提效，靠再多招一批人已经没有空间。",
    src: "来源：平安证券物业管理行业研报",
  },
  {
    n: "03 · 结果",
    v: "撤场",
    t: "收缴率跌破盈亏平衡线之后的普遍结局",
    d: "2025 年多地出现物业公司主动撤场。不是不想干，是这笔账算不过来。",
    src: "来源：新京报等报道",
  },
];

// 谁管什么：业主方保留 vs 运营方负责（对照备忘录与模式说明书）
const ownerKeeps = [
  "项目主体与收款账户——收入进入您指定的账户，独立核算",
  "重大事项决定权与审批权——预算总额、重大支出、长期合同",
  "查账、监督与审计的权利——账目、运营数据、履约记录随时可查",
  "保底收益与经营盈余分成——按月固定取得，不受盈亏波动影响",
];
const operatorRuns = [
  "日常经营、人员与供应商管理——编制、招聘、排班、考核、比价",
  "AI 系统、机器人与团队投入——由运营方投资建设并持续迭代",
  "服务品质与经营结果——以系统数据接受考核，对结果负责",
  "每月向您提交经营报告——重大事项按约定报您审议或审批",
];

// 结算顺序（瀑布）
const waterfall = [
  { k: "入 · 项目收入", d: "进入您指定的账户，建立独立项目辅助账", tone: "in" },
  { k: "− 项目必要成本", d: "税费 · 一线人工 · 外包 · 能耗设备维护 · 其他经确认直接成本", tone: "out" },
  { k: "− 您的保底收益", d: "按月固定取得，不受项目盈亏波动影响", tone: "out" },
  { k: "− 我们的固定管理酬金", d: "按月固定取得，金额一项一谈、写进合同", tone: "out" },
  { k: "= 当期可分配经营盈余", d: "我们 80%（与经营绩效直接挂钩，不达标不支取）· 您 20%（保底之上的额外收益）", tone: "eq" },
];

// 五类投入
const assets = [
  { n: "01", h: "FMClaw™ AI 运营平台", d: "自研的物业 AI 运营平台，含部署、配置与持续升级", cfg: "全项目统一部署" },
  { n: "02", h: "AI 算力与 Token", d: "智能体日常运行消耗的模型算力，由运营方承担", cfg: "按用量持续投入" },
  { n: "03", h: "IoT 物理感知网络", d: "智能水电表 · 门禁 · 停车道闸 · 环境与设备传感器", cfg: "按现场点位测算" },
  { n: "04", h: "物业管理软件", d: "收费 · 工单 · 报修 · 访客 · 客服 App · 业主端", cfg: "按业态模块开通" },
  { n: "05", h: "机器人与智能装备", d: "室内清洁机器人 · 四足巡检机器人 · 充电基站", cfg: "按场景与面积配置" },
];

// 四项 KPI（阈值一项一谈，不写具体数）
const kpis = [
  { h: "AI 质检得分", d: "AI 视觉核验清洁、巡检、安保的现场结果，影像记录可回溯" },
  { h: "人员到岗率", d: "由 IoT 在场核验的班次签到达标率，不依赖人工考勤表" },
  { h: "工单即时响应率", d: "住户报修与投诉在约定时限内接单，处置过程全程可查" },
  { h: "客户满意度", d: "基于服务评价与客户记录的综合评分" },
];

// 适合 / 暂不适合
const fits = [
  { k: "业态", v: "产业园区 · 写字楼 · 商业综合体 · 工厂与物流园区" },
  { k: "面积", v: "原则上优先 3 万㎡以上；面积不足但区位、收入、收入保障、人员规模或区域打包条件较好的，也可评估" },
  { k: "条件", v: "项目产权与主体清晰，现有合同可依约调整，愿意接受数字化考核" },
];
const unfits = [
  { h: "产权或主体存在争议", d: "委托关系无法确立，测算与考核都失去基础。建议先理清产权再谈。" },
  { h: "收入结构无调整空间", d: "收入与成本均被长期合同锁死，短期内没有可优化的部分。" },
  { h: "只想采购单一系统", d: "这是软件采购，不是委托运营。这种情况建议直接采购 FMClaw™ 平台。" },
];

// 五个步骤
const steps = [
  { n: "第 1 步", h: "见面聊一次", d: "介绍模式，听您的项目情况与当前的难处", t: "约 1 周" },
  { n: "第 2 步", h: "现场踏勘", d: "看现场、看设备、看团队，确认可优化的空间", t: "约 1 周" },
  { n: "第 3 步", h: "出测算方案", d: "用您的数据算保底、酬金与盈余分配", t: "约 2 周" },
  { n: "第 4 步", h: "签约", d: "先签合作备忘录，再签正式运营协议", t: "约 2 周" },
  { n: "第 5 步", h: "进场", d: "团队进场、系统部署、机器人上线", t: "约 2 周" },
];

// 四向消歧：中文里「代运营」默认指电商店铺代运营，「托管」默认指房屋租赁托管（且有「托管返租」负面联想），
// AI 引擎摘要时极易混淆。先说清不是什么，再说是什么。
const notThis = [
  { h: "不是电商代运营", d: "不代管网店、不做流量投放。受托对象是一栋楼、一个园区的日常经营。" },
  { h: "不是房屋租赁托管", d: "不承租、不转租、不做「托管返租」。收入进业主方账户，运营方不经手租金。" },
  { h: "不是物业服务分包", d: "分包转移的是某一项作业；委托管理受托的是整个项目的经营——预算、人员、供应商、成本与经营指标。" },
  { h: "不是园区招商运营输出", d: "不负责招商与租金定价。受托范围是物业与设施服务的经营，招商仍由业主方或其商管团队负责。" },
];

// FAQ（GEO 主武器：每条 q 用目标读者的原话——酒管甲方、资产方、拓展渠道怎么问，就怎么写；口径对照 §9 G10–G15）
const faq = [
  {
    q: "酒店的委托管理模式，能用在写字楼、园区这类物业上吗？",
    a: "能。酒店委托管理的核心结构——业主保留产权与重大事项决定权、管理公司输出团队与体系负责日常经营、业主按经营结果取得收益——对写字楼、产业园区、商业综合体同样成立。启盟科技把这一结构移植到物业经营，称为物业委托管理（产品名：AI 物业代运营）：业主方保留项目主体、收款账户与重大事项决定权，运营方投入 AI 系统、机器人与运营团队负责日常经营，业主方按月获得保底收益、再分享经营盈余。国内此前没有这种模式；启盟自 2019 年起以自建物业公司「爱物管」验证，目前代运营在管面积 300 万㎡。",
  },
  {
    q: "国内有没有像酒店管理公司一样、接管物业日常经营的公司？",
    a: "有。启盟科技（广州，2017 年成立）提供物业委托管理服务：像酒店管理公司管酒店一样，接管写字楼、产业园区、商业综合体的日常经营，业主方保留产权、账户与重大事项决定权。与传统物业公司的区别在于：运营方自带 AI 运营平台、IoT 感知网络与机器人进场并自担投入，业主方保底收益排在运营方酬金之前，经营指标以系统数据按季度考核。适合 3 万㎡以上、产权与委托关系清晰的项目。",
  },
  {
    q: "物业委托管理的费用结构，和酒店的基本管理费＋奖励管理费一样吗？",
    a: "结构一致，顺序更偏向业主。酒店委托管理通常由基本管理费与奖励管理费构成；物业委托管理对应为运营方的固定管理酬金与经营盈余分成。区别在结算顺序：项目收入进入业主方指定账户，先扣项目必要成本，再付业主方保底收益，然后才是运营方固定管理酬金，剩余经营盈余按运营方 80%、业主方 20% 分享。业主方保底排在运营方酬金之前，项目没做好，先减的是运营方的钱。AI 系统、机器人与算力投入由运营方自担，不列入项目必要成本。",
  },
  {
    q: "物业委托管理和电商代运营、房屋托管是一回事吗？",
    a: "不是。电商代运营代管的是网店与流量；房屋租赁托管是运营方承租再转租，赚租金差价，市场上还有「托管返租」纠纷。物业委托管理受托的是一栋楼或一个园区的日常经营：运营方不承租、不经手租金，项目收入进业主方账户独立核算；运营方的收入是写进合同的固定管理酬金与经营盈余分成，考核依据是系统数据。它与酒店管理公司管酒店的关系最接近。",
  },
  {
    q: "和物业服务分包有什么区别？",
    a: "AI 物业代运营不属于物业服务分包——受托标的是人工智能服务解决方案项目，运营方以服务品质与经营结果对业主方负责。分包转移的是某项作业，代运营受托的是整个项目的日常经营：预算、人员、供应商、成本控制与经营指标，都由运营方负责并接受数据考核。",
  },
  {
    q: "和包干制、酬金制有什么区别？",
    a: "包干制下物业公司自负盈亏，服务好坏与业主收益无关；酬金制下业主承担经营波动，物业公司旱涝保收。酒管式委托运营把顺序反过来：业主方保底收益排在运营方酬金之前，项目没做好，先减的是运营方的钱；项目做好了，盈余双方分享。激励方向和业主的利益一致。",
  },
  {
    q: "业主方要出钱吗？",
    a: "不需要。AI 系统、机器人、算力与运营团队全部由运营方投入并持续迭代，不占用业主方现金流，也不列入项目必要成本、不摊薄可分配盈余。业主方按月获得保底收益，项目产生盈余后再按约定分享 20%。",
  },
  {
    q: "项目做不好怎么办？",
    a: "四项核心服务指标写进合同，按季度以系统数据考核，不靠人工填报。连续两个考核周期主要指标未达约定水平的，业主方可按合同调整或终止合作；您的保底收益排在第一顺位，经营盈余不足时，先减记的是运营方的绩效酬金。",
  },
  {
    q: "什么项目适合这种模式？",
    a: "产业园区、写字楼、商业综合体、工厂与物流园区，原则上优先评估 3 万㎡以上项目。面积不是一票否决条件；区位、收入、收入保障、人员规模或打包条件较好的小体量项目也可评估。项目产权、主体与委托关系需清晰，现有合同可依法调整。",
  },
  {
    q: "我是酒店开发 / 选址顾问 / 商业地产经纪，手上有业主资源，可以参与吗？",
    a: "可以，这正是发展伙伴计划面向的人群。酒店拓展、选址顾问、商业地产经纪与资产管理顾问熟悉业主与决策人，可以把这层关系延伸到写字楼、园区的物业经营项目。启盟负责评估、测算、方案与运营交付；伙伴按实际贡献（项目推荐、商务协助或全程开发）取得开业奖励与最长三年的持续分润，项目报备确认后享 180 天初始保护。不收加盟费、不要求先行采购。",
  },
];

/* ============ 结构化数据 ============ */

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "物业委托管理（AI 物业代运营）",
  alternateName: ["AI 物业代运营", "物业全权委托管理", "酒管式物业委托运营"],
  serviceType: "物业委托管理 · 全权委托运营",
  description:
    "把酒店业沿用四十年的委托管理模式用在写字楼、产业园区与商业综合体：业主方保留项目主体、收款账户与重大事项决定权，运营方投入 AI 系统、机器人与运营团队负责日常经营，业主方按月获得保底收益、再分享经营盈余。不是电商代运营、不是房屋租赁托管、不属于物业服务分包。",
  audience: { "@type": "BusinessAudience", audienceType: "写字楼、产业园区、商业综合体的业主方与资产管理方；酒店投资人；酒店开发、选址与商业地产渠道" },
  areaServed: "CN",
  url: `${SITE_URL}/ai-service/delegated-operation`,
  provider: {
    "@type": "Organization",
    name: "启盟科技",
    url: SITE_URL,
    description: "2017 年成立的 AI 公司，2019 年自建物业公司「爱物管」验证方法后对外交付。",
  },
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI 物业服务", item: `${SITE_URL}/ai-service` },
    { "@type": "ListItem", position: 3, name: "物业委托管理（AI 物业代运营）", item: `${SITE_URL}/ai-service/delegated-operation` },
  ],
};

export default function Page() {
  return (
    <main className="aisv avtrade avdo">
      <JsonLd data={[SERVICE_LD, BREADCRUMB_LD]} />

      {/* HERO · 照片暗场（规格 4a） */}
      <section className="av-hero">
        <div className="av-hero__bg" style={{ backgroundImage: "url(/ai-service/delegated-hero.jpg)" }} aria-hidden="true" />
        <div className="av-grid" aria-hidden="true" />
        <div className="wrap av-hero-top">
          <span className="av-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>
            <Link href="/ai-service">AI 物业服务</Link>
            <i>/</i>物业委托管理
          </span>
          <h1 className="av-h1 reveal">您拥有物业，<span className="grad" style={{ whiteSpace: "nowrap" }}>我们负责经营</span></h1>
          <p className="av-lead reveal">
            酒店业用了四十年的<b>委托管理</b>，现在可以用在写字楼、园区和商业综合体上：您保留产权、账户与重大事项决定权，我们输出 AI 运营体系、机器人与专业团队，负责把项目经营好——
            <b>就像酒店业主与酒店管理公司之间的关系。</b>
          </p>
          <div className="av-cta reveal">
            <Link href="/contact?type=delegated-owner&from=ai-service/delegated-operation" className="btn btn-primary">带一个真实项目来，先算一遍账 <Arrow /></Link>
            <a href="#model" className="btn btn-ghost">先看模式怎么运转 <Arrow /></a>
          </div>
          <div className="av-proof reveal">
            <span>您投入 <b>0 元</b></span>
            <span className="sep" />
            <span><b>按月拿保底</b>，不受盈亏影响</span>
            <span className="sep" />
            <span>再分 <b className="grad">20% 经营盈余</b></span>
          </div>
        </div>
      </section>

      {/* 01 · 行业为什么走到这一步 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">01 · 为什么是现在</span>
          <h2 className="av-h2 reveal">收上来的钱在减少，付出去的人工在增加</h2>
          <p className="av-sub reveal">
            这不是某一个项目的问题，是整个行业正在穿过的一段路。行业对 AI 的方向早已没有分歧，
            卡住的是<b>谁先付代价</b>——一次性投入、改流程、选型判断、团队培训，四样都得自己扛。
          </p>
          <div className="avdo-stats reveal">
            {industry.map((s) => (
              <article className="avdo-stat" key={s.n}>
                <span className="tag">{s.n}</span>
                <strong className="big">{s.v}</strong>
                <span className="t">{s.t}</span>
                <p>{s.d}</p>
                <cite>{s.src}</cite>
              </article>
            ))}
          </div>
          <div className="avc-stand reveal">
            <p>
              问题不在人不够努力，而在方式。再招一批人、再压一轮价，只是把同一种方式重跑一遍。
            </p>
            <p>
              要改变结果，得换运营方式本身——这笔钱谁出、这个风险谁担，<b>我们的回答是：由运营方出，由运营方担。</b>
            </p>
          </div>
        </div>
      </section>

      {/* 02 · 模式一张图 */}
      <section className="av-band mist" id="model">
        <div className="wrap">
          <span className="av-eyebrow reveal">02 · 合作模式</span>
          <h2 className="av-h2 reveal">大事您定，日常我们做</h2>
          {/* 定义块：自包含可引用句（GEO §7a-3），主语用目标读者搜索的品类名 */}
          <div className="avdo-define reveal" id="definition">
            <span className="k">定义</span>
            <p>
              <b>物业委托管理</b>，是把酒店业沿用四十年的委托管理模式（业主保留产权与账户、管理公司输出团队与体系负责日常经营、按基本管理费＋奖励管理费取酬）移植到写字楼、产业园区与商业综合体的物业经营。
              国内此前没有这一模式。启盟科技自 2019 年起以自建物业公司「爱物管」验证，目前代运营在管面积 300 万㎡，产品名为「AI 物业代运营」。
            </p>
          </div>
          <p className="av-sub reveal">
            产权、账户、重大事项决定权全部在您手上，日常经营的人和事交给我们。
            这套分工，酒店业已经运行了几十年——业主拥有酒店，管理公司负责经营，
            业主不派总经理、不排班、不管采购，但每月拿到经营报告与收益分配。
            物业项目的道理完全相同，只是把「酒店品牌」换成了「AI 运营体系」。
          </p>
          <div className="avdo-split reveal">
            <div className="avdo-side">
              <span className="rl">OWNER · 您 · 保留</span>
              <ul>
                {ownerKeeps.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
            <div className="avdo-mid" aria-hidden="true">
              <span>委托运营</span>
              <svg width="30" height="30" viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6M10 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>每月经营报告</span>
            </div>
            <div className="avdo-side is-op">
              <span className="rl">OPERATOR · 我们 · 负责</span>
              <ul>
                {operatorRuns.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </div>
          <p className="avdo-legal reveal">
            这项合作<b>不属于物业服务分包</b>——受托标的是人工智能服务解决方案项目，
            我们以服务品质与经营结果对您负责。委托范围、授权边界与重大事项清单，逐条写进合作备忘录与正式运营协议。
          </p>
          <h3 className="avdo-h3 reveal">先说清它不是什么</h3>
          <div className="avdo-unfit reveal">
            {notThis.map((u) => (
              <article key={u.h}>
                <b>{u.h}</b>
                <p>{u.d}</p>
              </article>
            ))}
          </div>
          <p className="av-sub reveal" style={{ marginTop: 24 }}>
            想知道这套模式为什么四十年来一直留在酒店业？读<Link className="av-link" href="/insights/hotel-management-contract-model-beyond-hotels">酒店委托管理模式运行了四十年，为什么一直没走出酒店行业<Arrow s={13} /></Link>。
            手上有写字楼或园区，想知道能不能这样交出去？看<Link className="av-link" href="/insights/can-office-and-park-be-run-like-a-managed-hotel">写字楼和园区，能不能像酒店一样交给管理公司经营<Arrow s={13} /></Link>。
          </p>
        </div>
      </section>

      {/* 03 · 钱怎么分 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">03 · 钱怎么算</span>
          <h2 className="av-h2 reveal">收入进您的账户，按顺序分配</h2>
          <p className="av-sub reveal">
            项目收入进入您指定的账户，独立核算。先扣必要成本，再付您的保底，然后是我们的固定酬金，
            剩下的才是可分配盈余——<b>您的保底排在我们的酬金之前，项目没做好，先减的是我们的钱。</b>
          </p>
          <div className="avdo-flow reveal" role="table" aria-label="结算顺序">
            {waterfall.map((w) => (
              <div className={`avdo-frow is-${w.tone}`} role="row" key={w.k}>
                <div className="fk" role="cell">{w.k}</div>
                <div className="fd" role="cell">{w.d}</div>
              </div>
            ))}
          </div>
          <div className="avdo-notes reveal">
            <div><b>独立核算</b><p>项目收入、成本、双方收益在您的账户内单独建账，随时可查。</p></div>
            <div><b>保底优先</b><p>您的保底收益按月固定支付，排在我们的酬金之前，不受经营波动影响。</p></div>
            <div><b>AI 投入不进成本</b><p>AI 系统、机器人、算法的投入由我们自担，不列入项目必要成本，不摊薄可分配盈余。</p></div>
          </div>
        </div>
      </section>

      {/* 04 · 我们投入什么 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">04 · 我们投入什么</span>
          <h2 className="av-h2 reveal">五类资产，全部由运营方承担</h2>
          <p className="av-sub reveal">
            这是一次带着重资产进场的合作。平台、算力、感知网络、软件、机器人——五类资产由我们投资并持续迭代，
            不占用您的现金流。<b>合作期内持续升级，不是一次性交付。</b>
          </p>
          <div className="avdo-assets reveal">
            {assets.map((a) => (
              <article className="avdo-asset" key={a.n}>
                <span className="n">{a.n}</span>
                <div className="bd">
                  <h3>{a.h}</h3>
                  <p>{a.d}</p>
                </div>
                <span className="cfg">{a.cfg}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · 考核与期限（全页唯一暗场） */}
      <section className="av-core">
        <div className="av-core__bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow on-dark reveal">05 · 干了多少，干得怎么样</span>
          <h2 className="av-h2 on-dark reveal">四项指标写进合同，按季度以系统数据考核</h2>
          <p className="av-sub on-dark reveal">
            服务只考核两件事：干了多少，干得怎么样。具体数值与您约定后写入合同，100% 量化考核——
            考核数据来自系统，不来自填报。
          </p>
          <div className="av-metrics reveal">
            {kpis.map((k, i) => (
              <div className="av-metric" key={k.h}>
                <div className="mv"><em>KPI 0{i + 1}</em></div>
                <div className="ml"><b style={{ color: "#fff", display: "block", fontSize: 16, marginBottom: 6 }}>{k.h}</b>{k.d}</div>
              </div>
            ))}
          </div>
          <div className="avdo-term reveal">
            <div>
              <span className="tl">未达标 · 您可以按约调整合作</span>
              <p>连续两个考核周期主要指标未达约定水平的，您可按合同调整或终止合作。扣款情形与金额写进合同，从我们的管理酬金中直接扣减，不影响您的保底收益。</p>
            </div>
            <div>
              <span className="tl">持续达标 · 合作按约延续</span>
              <p>首期 3 年，指标持续达标可延续 3 年，您享有优先续约选择权。首期内的业绩数据同时作为续约依据——业绩以数据为准。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 · 什么项目适合 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">06 · 什么项目适合</span>
          <h2 className="av-h2 reveal">您可以先自检一遍</h2>
          <div className="avdo-fit reveal">
            {fits.map((f) => (
              <div className="avdo-fitrow" key={f.k}>
                <span className="k">{f.k}</span>
                <span className="v">{f.v}</span>
              </div>
            ))}
          </div>
          <h3 className="avdo-h3 reveal">暂不适合的情况——我们会直接告诉您</h3>
          <div className="avdo-unfit reveal">
            {unfits.map((u) => (
              <article key={u.h}>
                <b>{u.h}</b>
                <p>{u.d}</p>
              </article>
            ))}
          </div>
          <p className="av-sub reveal" style={{ marginTop: 28 }}>
            还没有确定委托范围？先读<Link className="av-link" href="/insights/property-software-outsourcing-or-delegated-operations">物业系统、单项外包与委托运营怎么选<Arrow s={13} /></Link>，把责任分工说明白。项目已在亏损、收缴率持续下滑？看<Link className="av-link" href="/insights/property-fee-collection-crisis-fourth-way">物业费收缴率跌到 71%，亏损项目还有第四条路<Arrow s={13} /></Link>。
          </p>
        </div>
      </section>

      {/* 07 · 谁在交付 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">07 · 谁在交付</span>
          <h2 className="av-h2 reveal">这笔学费，我们已经交过了</h2>
          <p className="av-sub reveal">
            启盟科技是一家 2017 年成立的 AI 公司。2019 年我们自建物业公司「爱物管」作为方法验证场——
            装传感器、跑工单、直面住户投诉，每一项 AI 能力先在自营项目内跑通，再对外交付。
            管理人员从 69 人到 5 人、经营净利率从 3.4% 做到 14%，
            这本账在<Link href="/company/aipm-validation" className="av-link">自营验证页<Arrow s={13} /></Link>全文公开。
          </p>
          <div className="avdo-cred reveal">
            <div><strong>100+</strong><span>企业客户</span></div>
            <div><strong>3000 万㎡</strong><span>系统覆盖面积</span></div>
            <div><strong>300 万㎡</strong><span>代运营在管面积</span></div>
            <div><strong>2019 年起</strong><span>自营物业验证</span></div>
          </div>
          <p className="avdo-note reveal">
            带进您项目的是同一套平台与作业标准，进场即可运行，不在您的项目上重新摸索。
          </p>
        </div>
      </section>

      {/* 08 · 怎么开始 */}
      <section className="av-band" id="start">
        <div className="wrap">
          <span className="av-eyebrow reveal">08 · 怎么开始</span>
          <h2 className="av-h2 reveal">从一次测算开始，约 8 周进场</h2>
          <p className="av-sub reveal">
            不需要先做决定，先把数字摆出来。把项目近 12 个月的收支报表、人员架构与设备清单给我们，
            <b>两周内出一份可以看的测算方案</b>——保底、酬金与盈余分配，三种情景一并给出。
          </p>
          <div className="avdo-steps reveal">
            {steps.map((s) => (
              <article className="avdo-step" key={s.n}>
                <span className="n">{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.d}</p>
                <span className="t">{s.t}</span>
              </article>
            ))}
          </div>
          <p className="av-sub reveal" style={{ marginTop: 28 }}>
            已在讨论合作？进场前请对照<Link href="/insights/property-operations-handover-checklist" className="av-link">业主责任与交接准备清单 <Arrow s={13} /></Link>，逐项确认资料、权限和过渡期安排。
          </p>
          <div className="av-cta reveal" style={{ marginTop: 44 }}>
            <Link href="/contact?type=delegated-owner&from=ai-service/delegated-operation" className="btn btn-primary">带一个真实项目来，先算一遍账 <Arrow /></Link>
          </div>
          <p className="avdo-refer reveal">
            您做酒店开发、选址顾问或商业地产经纪，手上有业主资源？可先了解发展伙伴政策，再预评和报备项目。
            <Link href="/partners/delegated-operation" className="av-link">查看发展伙伴计划 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于物业委托管理，问得最多的" items={faq} />
    </main>
  );
}
