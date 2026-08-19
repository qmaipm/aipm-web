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
  title: "AI 物业代运营 · 酒管式全权委托运营 | 启盟科技",
  description:
    "AI 物业代运营参照酒店管理公司的经典分工：业主方保留项目主体、账户与重大事项决定权，运营方投入 AI 系统、机器人与运营团队负责日常经营，业主方按月获得保底收益、再分享经营盈余。不属于物业服务分包——受托标的是人工智能服务解决方案项目。收入进业主方账户独立核算，盈余按运营方 80%、业主方 20% 分享，AI 投入由运营方自担。",
  keywords: [
    "AI 物业代运营",
    "物业代运营",
    "物业委托运营",
    "物业全权委托",
    "酒店管理模式 物业",
    "物业项目亏损怎么办",
    "物业费收缴率低",
    "物业公司撤场",
    "包干制 酬金制 区别",
    "物业服务模式",
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
  { h: "AI 质检得分", d: "AI 视觉核验清洁、巡检、安保的现场结果，影像留痕可回溯" },
  { h: "人员到岗率", d: "由 IoT 在场核验的班次签到达标率，不依赖人工考勤表" },
  { h: "工单即时响应率", d: "住户报修与投诉在约定时限内接单，处置过程全程可查" },
  { h: "客户满意度", d: "基于服务评价与客户记录的综合评分" },
];

// 适合 / 暂不适合
const fits = [
  { k: "业态", v: "产业园区 · 写字楼 · 商业综合体 · 工厂与物流园区" },
  { k: "面积", v: "在管面积 3 万㎡以上；面积不足但同城有多个项目的，可以打包成一个区域来谈" },
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

// FAQ（GEO 主武器：每条对应一类真实查询；口径对照 §9 G10–G12）
const faq = [
  {
    q: "AI 物业代运营是什么？",
    a: "AI 物业代运营参照酒店管理公司的经典分工：业主方保留项目主体、账户与重大事项决定权，运营方投入 AI 系统、机器人与运营团队负责日常经营，业主方按月获得保底收益、再分享经营盈余。就像酒店业主与希尔顿的关系——业主拥有酒店，管理公司负责经营。",
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
    a: "产业园区、写字楼、商业综合体、工厂与物流园区，在管面积 3 万㎡以上，项目产权与主体清晰，现有合同可依约调整。面积不足但同城有多个项目的，可以打包成一个区域来谈。产权有争议、收入结构无调整空间或只想采购软件的项目，暂不适合。",
  },
];

/* ============ 结构化数据 ============ */

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 物业代运营（酒管式全权委托运营）",
  serviceType: "AI 物业代运营 · 委托运营管理",
  description:
    "参照酒店管理公司的经典分工：业主方保留项目主体、账户与重大事项决定权，运营方投入 AI 系统、机器人与运营团队负责日常经营，业主方按月获得保底收益、再分享经营盈余。不属于物业服务分包。",
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
    { "@type": "ListItem", position: 3, name: "AI 物业代运营", item: `${SITE_URL}/ai-service/delegated-operation` },
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
            <i>/</i>AI 物业代运营
          </span>
          <h1 className="av-h1 reveal">您拥有物业，<span className="grad" style={{ whiteSpace: "nowrap" }}>我们负责经营</span></h1>
          <p className="av-lead reveal">
            酒管式全权委托：您保留物业产权与重大事项决定权，我们投入 AI 系统、机器人与运营团队，负责把项目经营好——
            <b>就像酒店业主与希尔顿之间的关系。</b>
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">带一个真实项目来，先算一遍账 <Arrow /></Link>
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
          <p className="av-sub reveal">
            产权、账户、重大事项决定权全部在您手上，日常经营的人和事交给我们。
            这套分工，酒店业已经运行了几十年——业主拥有酒店，管理公司负责经营，
            业主不派店长、不排班、不管采购，但每月拿到经营报告与收益分配。
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
          <div className="av-cta reveal" style={{ marginTop: 44 }}>
            <Link href="/contact" className="btn btn-primary">带一个真实项目来，先算一遍账 <Arrow /></Link>
          </div>
          <p className="avdo-refer reveal">
            认识适合这种模式的业主方？我们欢迎引荐，并为引荐人提供项目报备保护——
            <Link href="/contact?type=refer&source=delegated-operation" className="av-link">联系我们聊聊 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于 AI 物业代运营，问得最多的" items={faq} />
    </main>
  );
}
