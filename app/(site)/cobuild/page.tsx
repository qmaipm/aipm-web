import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import CobuildForm from "./CobuildForm";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/cobuild", {
  title: "人工智能产业共建 · 以投带产 — 启盟科技",
  description:
    "一套「以投带产」的人工智能产业共建方案：启盟科技带着资金、技术与运营团队在地方落地，以国有物业为切入，合作方零投入、零采购风险——产业、税收、就业与数据资产沉淀在本地。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const onepage = [
  {
    no: "01",
    title: "国家任务",
    body: "「十五五」末，国家为人工智能相关产业规模定下了远大目标。这份时代任务，需要在地方层面找到能落地的真实场景——地方人工智能产业落地，是承接的关键一步。",
  },
  {
    no: "02",
    title: "行业窗口",
    body: "2026 年两会，物业管理行业首次写入国务院政府工作报告；住建部随后采纳，将「物业管理」升级为「物业服务」。一个管理相对落后的劳动密集型行业，恰是 AI 增效管理与具身智能用武的天然主场景。",
  },
  {
    no: "03",
    title: "核心方法",
    body: "政府先行先试做制度性协同，以承接 AI 带来的管理范式变化；企业以「AI 接管重复性的管理协调、一线服务岗位原则上不动」的方法承接落地。制度在前，落地在后。",
  },
  {
    no: "04",
    title: "共建路径",
    body: "以地方国有物业为起点，先打样板、再做合资、后向区域推广；五年扎根，逐步培育出一个区域级的人工智能服务业产业集群。",
  },
  {
    no: "05",
    title: "双方角色",
    body: "地方主导路径设计，提供场景与政策协同；启盟科技投入资金、技术与运营团队，承担产业培育的主体责任——产业、税收、就业与数据资产沉淀本地。",
  },
];

const why = [
  {
    title: "无处不在的底盘",
    body: "办公园区、商业综合体、人才公寓、医院、学校、工业厂区——一个区域里几乎每一栋楼都在物业管理覆盖之内。这是政府用场景换产业最大的一块底盘。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="7" height="12" rx="1.4" stroke="currentColor" strokeWidth="1.6" /><rect x="13" y="4" width="8" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" /><path d="M6 13h1M6 16h1M16 8h2M16 12h2M16 16h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M3 21h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
  {
    title: "城市治理的最后一公里",
    body: "物业是城市治理触达居民、企业、园区的毛细血管。它已从「管理」升级为「服务」，纳入国家级民生议题。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" /><path d="M12 21c5-4.5 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 2 6.5 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
    ),
  },
  {
    title: "人力越重，AI 杠杆越长",
    body: "物业是典型的劳动密集行业，中基层每天在做大量高频、标准、可量化的管理动作；人力越重的地方，AI 能撬动的空间就越大。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><path d="M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M12 20V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M5 13l7-7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="5" cy="13" r="1.6" fill="currentColor" /><circle cx="19" cy="13" r="1.6" fill="currentColor" /></svg>
    ),
  },
  {
    title: "AI 机器人最大的商用场景",
    body: "商用清洁、安保、巡检乃至人形机器人，当前几乎都在物业场景里跑。这是 AI 在物理世界第一块真正跑通的商业版图。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="8" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.6" /><path d="M12 5V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="3" r="1.3" fill="currentColor" /><circle cx="9.5" cy="13" r="1.4" fill="currentColor" /><circle cx="14.5" cy="13" r="1.4" fill="currentColor" /><path d="M9.5 16.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M3 12v3M21 12v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    ),
  },
];

const dcards = [
  {
    title: "合作方零投入",
    body: "不采购设备、不投入固定资产、不承担技术风险。国企 / 园区按 FM 服务合同付费，且持平或低于现有物业支出。",
  },
  {
    title: "我们出资、出技术、出团队",
    body: "在本地注册子公司、本地纳税、本地招聘；运维与技术团队常驻，持续运营与迭代。",
  },
  {
    title: "产业留在本地",
    body: "产业、税收、就业与数据资产沉淀在本地；一个项目跑通，辖区内的楼宇与园区可快速复制。",
  },
];

const stages = [
  { ph: "Stage 01 · 起步", title: "先打样板", body: "在少量楼宇做出样板，跑通一套可复制的 AI 化运营。" },
  { ph: "Stage 02 · 规模化", title: "合资共建", body: "以合资方式扩大部署，把样板复制到更多业态与楼宇。" },
  { ph: "Stage 03 · 区域辐射", title: "产业辐射", body: "能力向区域外溢，逐步形成区域级的人工智能服务业集群。" },
];

const assets = [
  { title: "一家本地 AI 企业", body: "子公司注册在本地，工商税务、营收与税收归属本地，持续运营。" },
  { title: "机器人与具身智能载体", body: "区域领先的服务机器人与具身智能商用运营能力，沉淀在本地。" },
  { title: "多业态数据资产", body: "跨业态沉淀的结构化数据，成为本地数据要素的源头。" },
];

export default function Page() {
  return (
    <main className="solcb">
      {/* HERO */}
      <section className="cb-hero">
        <div className="cb-grid" aria-hidden="true" />
        <div className="wrap cb-hero-top">
          <span className="cb-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>人工智能产业共建
          </span>
          <h1 className="cb-h1">
            一套「以投带产」的<br /><span className="grad">人工智能产业共建方案</span>
          </h1>
          <p className="cb-lead">
            启盟科技带着<b>资金、技术与运营团队</b>在地方落地，和政府与国资平台一起承接国家人工智能产业战略——产业、税收、就业与数据资产，沉淀在本地。
          </p>
          <div className="cb-cta">
            <a href="#core" className="btn btn-primary">看以投带产模式 <Arrow /></a>
            <a href="#contact" className="btn btn-ghost">了解如何落地 <Arrow /></a>
          </div>
          <div className="cb-proof">
            <span>合作方<b>零投入</b></span>
            <span className="sep" />
            <span>我方<b>出资 · 出技术 · 出团队</b></span>
            <span className="sep" />
            <span><b className="grad">产业留在本地</b></span>
          </div>
        </div>
      </section>

      {/* 1 · 一页读懂 */}
      <section className="cb-band mist">
        <div className="wrap">
          <span className="cb-eyebrow">一页读懂</span>
          <h2 className="cb-h2">产业共建方案的整体逻辑</h2>
          <p className="cb-sub">从国家任务到共建路径，五句话讲清楚这件事的来龙去脉。</p>
          <div className="cb-onepage">
            {onepage.map((o) => (
              <div className="cb-opi" key={o.no}>
                <span className="cb-opno grad">{o.no}</span>
                <div className="cb-opbody">
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="cb-quote">这不是采购 AI 服务，而是<span className="grad">共建一个本地 AI 产业</span></p>
        </div>
      </section>

      {/* 2 · 为什么是国有物业 */}
      <section className="cb-band">
        <div className="wrap">
          <span className="cb-eyebrow">为什么是国有物业</span>
          <h2 className="cb-h2">AI 落地最快的，正是国有物业</h2>
          <p className="cb-sub">国有物业 AI 化，既是政府用场景换产业最大的一块底盘，也是当下 AI 与机器人最真实的商用战场。</p>
          <div className="cb-grid-cards c2">
            {why.map((w) => (
              <div className="cb-card" key={w.title}>
                <span className="cb-ic">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · 以投带产(核心) · 深色签名时刻 */}
      <section className="cb-core" id="core">
        <div className="cb-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="cb-eyebrow on-dark">以投带产 · 核心模式</span>
          <h2 className="cb-h2 on-dark">不是卖给谁一套系统，而是把一个产业投到地方</h2>

          <div className="cb-dcards">
            {dcards.map((d, i) => (
              <div className="cb-dcard" key={d.title} data-end={i === dcards.length - 1}>
                <span className="cb-dno grad">0{i + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            ))}
          </div>

          <div className="cb-cycle">
            <div className="cb-cyc">
              <div className="cb-cyc-lab">我方投入</div>
              <h4>资金 · 技术 · 团队</h4>
              <p>把 AI 物业管理系统、IoT 传感器与服务机器人，投资部署到本地楼宇与园区。</p>
            </div>
            <span className="cb-cyc-ar" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="cb-cyc">
              <div className="cb-cyc-lab">本地落地</div>
              <h4>固定资产 · 本地企业</h4>
              <p>形成本地的固定资产，并在本地注册、运营起一家 AI 企业，工商税务全部落在本地。</p>
            </div>
            <span className="cb-cyc-ar" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="cb-cyc">
              <div className="cb-cyc-lab">本地沉淀</div>
              <h4>产业 · 税收 · 就业 · 数据</h4>
              <p>营收、税收、就业与多业态数据资产沉淀本地；样板跑通后，辖区可快速复制。</p>
            </div>
          </div>

          <p className="cb-verdict">合作方<span className="grad">零投入、零采购风险</span>，产业却扎根在本地。</p>
          <p className="cb-faint">具体基金规模与结构，面议时详述。</p>
        </div>
      </section>

      {/* 4 · 五年会沉淀出什么 */}
      <section className="cb-band mist">
        <div className="wrap">
          <span className="cb-eyebrow">五年沉淀</span>
          <h2 className="cb-h2">双方共建五年，沉淀出一家扎根本地的 AI 企业</h2>
          <p className="cb-sub">从单个样板起步，到规模化部署，再向区域辐射——这是一条由场景生长出产业的递进路径。</p>

          <div className="cb-stages">
            {stages.map((s, i) => (
              <div className="cb-stage" key={s.title}>
                <div className="cb-stage-ph">{s.ph}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i < stages.length - 1 && <span className="cb-stage-ar" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
          <div className="cb-stagebar"><i /><i /><i /></div>

          <div className="cb-grid-cards c3">
            {assets.map((a) => (
              <div className="cb-card" key={a.title}>
                <span className="cb-k" aria-hidden="true" />
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · 联系 */}
      <section className="cb-band" id="contact">
        <div className="wrap">
          <span className="cb-eyebrow">联系</span>
          <h2 className="cb-h2">想在你的地区，共建一个本地 AI 产业？</h2>
          <p className="cb-sub">无论你是地方政府、国资平台，还是国企 / 园区——政府 AI 招商、国有物业 AI 化运营、国企 AI 转型，都可以用这套方案对接。留下联系方式，我们把方案对到你的真实场景。</p>
          <CobuildForm />
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个 AI 产业，<br />共建到你的地区</h2>
          <p className="reveal">从一次深入沟通开始。</p>
          <div className="cta-row reveal">
            <a href="#contact" className="btn btn-primary">留下联系方式 <Arrow s={16} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
