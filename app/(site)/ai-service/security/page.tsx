import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "../page.css";
import "../trade.css";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/ai-service/security", {
  title: "AI 安保服务 · 用计算升级人防的安保服务 — 启盟科技",
  description:
    "AI 安保服务不讲概念,只做三件具体的事:接入现有 CCTV,用 AI 预审每天上千条视频预警,让每一条都真正被看过;消防巡检按人单合一执行,IoT 在场核验,守住安全红线;巡检狗承担园区巡逻,顺带消防、卫生与车辆违停检查。配合无人值守停车与门禁联动,安保成本结构同步优化。由启盟科技旗下自营物业公司爱物管交付。",
  keywords: [
    "AI 安保服务",
    "安保外包",
    "保安服务公司",
    "视频监控预警太多看不过来",
    "CCTV AI 预警预审",
    "消防巡检外包",
    "消防设施巡检漏检",
    "巡检机器狗",
    "园区安保升级",
    "无人值守停车场",
    "技防替代人防",
    "爱物管",
    "启盟科技",
  ],
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 对照表:安保的三个具体升级点 + 通用考核(GEO 可引用事实清单)
const compare: { k: string; old: string; now: React.ReactNode }[] = [
  {
    k: "视频预警",
    old: "监控系统每天报上千条,保安在监控室里根本看不完",
    now: <><b>AI 先看一遍</b>——接入现有海康、大华等监控系统,预警先经 AI 预审,误报被滤掉,真正需要人处置的推给人</>,
  },
  {
    k: "消防巡检",
    old: "填巡检本。消火栓、水泵巡了没有,没人说得清",
    now: <>与设施设备同一套<b>人单合一</b>机制:IoT 在场核验、按点位调出巡检表、漏检自动预警——安全红线,不留空白</>,
  },
  {
    k: "巡逻方式",
    old: "人定时巡更,走到走不到全凭自觉",
    now: <>巡检狗承担园区例行巡逻,多模态感知<b>顺带做消防、卫生与车辆违停检查</b>;人处置异常,不再空跑</>,
  },
  {
    k: "出入口与值守",
    old: "门口一个岗、楼里一班巡,人力堆出来的安全感",
    now: <>无人值守停车、门禁道闸全封闭管理,岗位与巡更频次<b>按数据重排</b>——值守更少,但每一班更有质量</>,
  },
  {
    k: "做不到怎么办",
    old: "口头承诺,出了事再追责",
    now: <>预警处置率、消防巡检签到率与达标率写进合同,<b>按数据考核</b>,做不到按合同处理</>,
  },
];

const faq = [
  {
    q: "AI 安保服务和传统保安外包有什么区别?",
    a: "区别不在人,在三件具体的事:一是视频预警处置——接入现有 CCTV(海康、大华等),预警先经 AI 预审,把每天上千条里的误报滤掉,真正的异常才推给人处置,每一条预警都真正被看过;二是消防巡检按「人单合一」执行,IoT 在场核验、漏检自动预警,守住安全红线;三是巡检狗承担园区例行巡逻,顺带做消防、卫生与车辆违停检查。这项服务由启盟科技旗下自营物业公司爱物管交付。",
  },
  {
    q: "监控预警太多看不过来,有什么解决办法?",
    a: "这是几乎所有项目的共同困境:有客户的视频监控系统一天报 1,500 条预警,靠人一条条看完,从人性上就做不到。解决办法是让 AI 先看一遍:FMClaw 接入现有监控系统,对预警照片和视频做预审,滤掉误报,把真正需要处置的少数推给安保人员。不需要更换摄像头,接入现有系统即可。",
  },
  {
    q: "消防设施巡检怎么保证真的巡了?",
    a: "用和设施设备巡检同一套「人单合一」机制:巡检人员到达消火栓、水泵房等指定点位,IoT 在场核验通过后才能开始巡检;系统按点位自动调出巡检表,漏检自动预警。在一个头部互联网大厂总部的项目里,消防班组服务达标率从 52% 提升到 98%。消防是安全红线,这件事不能靠自觉。",
  },
  {
    q: "巡检狗能做什么?会取代保安吗?",
    a: "巡检狗承担的是园区例行巡逻这类重复劳动,而且因为是多模态感知,巡逻的同时可以顺带做消防通道占用、卫生异常、车辆违停等检查——一趟巡逻,多件事一起办。它不取代保安:异常的现场处置、访客沟通、突发响应仍然由人完成。人从空跑中解放出来,处置质量反而更高。",
  },
  {
    q: "AI 安保能降低多少成本?",
    a: "成本优化来自三个具体的杠杆:无人值守停车设备替代出入口人工岗;门禁与道闸的全封闭管理降低楼内巡更频次;AI 预审与巡检狗让值守班次更少、但每一班更有质量。具体幅度取决于项目的岗位结构,我们会在方案里逐岗测算,数据摆出来一起看。",
  },
  {
    q: "需要更换现有的监控和门禁系统吗?",
    a: "通常不需要。AI 预警预审直接对接海康、大华等主流监控系统的输出;门禁、道闸联动走标准接口。我们的原则是尽量利用你已有的设备投资,把钱花在计算与调度上,而不是重复采购硬件。",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 安保服务",
  serviceType: "AI 安保服务(计算升级人防)",
  description:
    "接入现有 CCTV 做 AI 预警预审、消防巡检人单合一、巡检狗例行巡逻,配合无人值守停车与门禁联动的安保服务。",
  areaServed: "CN",
  url: `${SITE_URL}/ai-service/security`,
  provider: {
    "@type": "Organization",
    name: "爱物管",
    alternateName: "AIPM",
    description: "启盟科技旗下自营物业公司,AI 物业服务的交付主体。",
    parentOrganization: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  },
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI 物业服务", item: `${SITE_URL}/ai-service` },
    { "@type": "ListItem", position: 3, name: "AI 安保服务", item: `${SITE_URL}/ai-service/security` },
  ],
};

export default function Page() {
  return (
    <main className="aisv avtrade avsec">
      <JsonLd data={[SERVICE_LD, BREADCRUMB_LD]} />

      {/* HERO */}
      <section className="av-hero">
        <div className="av-hero__bg" style={{ backgroundImage: "url(/ai-service/security-hero.jpg)" }} aria-hidden="true" />
        <div className="av-grid" aria-hidden="true" />
        <div className="wrap av-hero-top">
          <span className="av-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>
            <Link href="/ai-service">AI 物业服务</Link>
            <i>/</i>AI 安保服务
          </span>
          <h1 className="av-h1 reveal">人看不过来的，交给 AI 看</h1>
          <p className="av-lead reveal">
            我们不讲「智慧安保」的概念。安保的升级，是<b>三件具体的事</b>：每天上千条视频预警有 AI 预审、消防巡检真实发生、巡检狗替人跑例行巡逻——用计算升级人防，成本还更低。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">为我的项目出一份安保方案 <Arrow /></Link>
            <a href="#three" className="btn btn-ghost">看这三件事 <Arrow /></a>
          </div>
          <div className="av-proof reveal">
            <span>接入<b>现有监控系统</b>，无需换设备</span>
            <span className="sep" />
            <span>消防巡检<b>人单合一</b></span>
            <span className="sep" />
            <span><b className="grad">巡检狗</b> 例行巡逻</span>
          </div>
        </div>
      </section>

      {/* 对照表 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">和传统安保服务的区别</span>
          <h2 className="av-h2 reveal">安全感，不该是人力堆出来的</h2>
          <p className="av-sub reveal">
            传统安保靠人数撑场面：监控室有人坐着、门口有人站着、楼里有人巡着。但预警看没看完、消防巡没巡到、巡逻走没走到——这些真正决定安全的事，恰恰没人说得清。
          </p>
          <div className="avc-cmp reveal" role="table" aria-label="传统安保服务与 AI 安保服务对比">
            <div className="avc-row avc-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">传统模式</div>
              <div className="now" role="columnheader">AI 安保服务</div>
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

      {/* 第一件事:预警漏斗 */}
      <section className="av-band mist" id="three">
        <div className="wrap">
          <span className="av-eyebrow reveal">第一件事 · 视频预警</span>
          <div className="sec-no reveal">
            <span className="idx">01</span>
            <h2 className="av-h2">每一条预警，都真正被看过</h2>
          </div>
          <p className="av-sub reveal">
            海康、大华这些监控系统本身并不差，问题出在后面：预警报得太多，人看不过来。有客户的系统一天报 1,500 条——认真看完每一条，从人性上就是做不到的事。
          </p>
          <div className="sec-funnel reveal">
            <div className="sec-funnel__row">
              <div className="sec-funnel__stage">
                <span className="num">1,500 条 / 天</span>
                <span className="lb">现有监控系统的预警量（真实客户）——靠人逐条看完，不现实</span>
              </div>
              <div className="sec-funnel__arrow" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="sec-funnel__stage mid">
                <span className="num">AI 预审</span>
                <span className="lb">FMClaw 接入现有系统，对每条预警的照片与视频先审一遍，滤掉误报</span>
              </div>
              <div className="sec-funnel__arrow" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="sec-funnel__stage out">
                <span className="num">少数真异常</span>
                <span className="lb">推给安保人员处置——每一条都看得完、有下文</span>
              </div>
            </div>
            <p className="sec-funnel__foot">
              不需要更换摄像头。<b>接入你现有的监控系统即可</b>——把已经买了的设备，真正用起来。
            </p>
          </div>
        </div>
      </section>

      {/* 第二件事:消防红线 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">第二件事 · 消防巡检</span>
          <div className="sec-no reveal">
            <span className="idx">02</span>
            <h2 className="av-h2">消防是红线，不能靠自觉</h2>
          </div>
          <p className="av-sub reveal">
            在中国，消火栓、水泵这些消防巡检大多由安保承担。而它的执行现状，和设备巡检一模一样：巡检本填满了，巡没巡到没人说得清。区别在于，这里漏掉的不是维修成本，是安全责任。
          </p>
          <div className="sec-redline reveal">
            <div className="sec-redline__bar" aria-hidden="true" />
            <div className="sec-redline__body">
              <p>
                我们把<Link className="av-link" href="/ai-service/facility">设施设备的「人单合一」机制</Link>原样搬进消防巡检：到达消火栓、水泵房等指定点位，IoT 在场核验通过才能开始巡检；系统按点位调出巡检表；漏检自动预警。
              </p>
              <p><b>每一次消防巡检，都有据可查——安全红线上，不留一格空白。</b></p>
              <span className="metric"><span className="v">52% → 98%</span><span className="l">消防班组服务达标率（头部互联网大厂总部）</span></span>
              <span className="metric"><span className="v">99%</span><span className="l">整体巡检签到率</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* 第三件事:巡检狗 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">第三件事 · 例行巡逻</span>
          <div className="sec-no reveal">
            <span className="idx">03</span>
            <h2 className="av-h2">巡检狗跑腿，人管处置</h2>
          </div>
          <div className="sec-dog">
            <div className="sec-dog__media reveal">
              <img src="/ai-service/security-dog.jpg" alt="园区巡检狗例行巡逻" loading="lazy" />
            </div>
            <div className="sec-dog__body reveal">
              <p>
                园区例行巡逻是典型的重复劳动。巡检狗把它接过来，而且因为是多模态感知，<b>一趟巡逻能顺带办好几件事</b>：
              </p>
              <ul className="sec-dog__list">
                <li><b>安全巡逻</b>——按设定路线例行巡查，异常即时回传</li>
                <li><b>消防检查</b>——消防通道占用、器材异位，巡逻途中顺带识别</li>
                <li><b>卫生检查</b>——垃圾堆积、污渍异常，同一趟一起看</li>
                <li><b>车辆违停</b>——违停识别、记录、通知，不用人巡场</li>
                <li><b>门禁联动</b>——与门禁系统联动后，对楼内人员与访客形成通行感知</li>
              </ul>
              <p className="sec-dog__fine">
                通行感知基于门禁通行数据，不做人脸识别、不采集个人生物信息。异常处置、访客沟通与突发响应，始终由人完成——巡检狗替的是腿，不是判断。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 成本三杠杆 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">成本这本账</span>
          <h2 className="av-h2 reveal">安保成本，有三个具体的优化杠杆</h2>
          <p className="av-sub reveal">
            我们不承诺一个笼统的折扣。安保的成本优化来自岗位结构的重排，每一个杠杆都对应具体的岗位与班次，方案里逐岗测算。
          </p>
          <div className="sec-cost">
            <article className="reveal">
              <span className="from">杠杆一 · 出入口</span>
              <h3>无人值守停车</h3>
              <p>无人值守停车设备替代出入口人工岗——这套能力来自我们的 <Link className="av-link" href="/products/iot">IoT 物理世界感知系统</Link>。</p>
            </article>
            <article className="reveal">
              <span className="from">杠杆二 · 楼内巡更</span>
              <h3>全封闭管理</h3>
              <p>门禁与道闸形成全封闭管理，楼内巡更的次数与频率按数据重排，而不是按惯例排班。</p>
            </article>
            <article className="reveal">
              <span className="from">杠杆三 · 值守质量</span>
              <h3>更少的班，更高的质量</h3>
              <p>AI 预审与巡检狗把空跑和无效盯屏拿走，值守班次更少，但每一班都在处置真正的事。</p>
            </article>
          </div>
        </div>
      </section>

      {/* 证据 · 暗场 */}
      <section className="av-core" id="evidence">
        <div className="av-core__bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow on-dark reveal">一句实话</span>
          <h2 className="av-h2 on-dark reveal">我们不把「智慧安保」挂在嘴上</h2>
          <p className="av-sub on-dark reveal" style={{ maxWidth: 640 }}>
            这个词已经被讲了太多年。我们真正能为你做好的，就是这一页里三件具体的事——预警看得完、消防巡得实、巡逻跑得勤。每一件都可核验、可考核、写进合同。
          </p>
          <div className="av-metrics reveal">
            <div className="av-metric"><div className="mv"><em>1,500 条 / 天</em></div><div className="ml">真实客户的预警量，AI 预审后逐条有下文</div></div>
            <div className="av-metric"><div className="mv">52% → <em>98%</em></div><div className="ml">消防班组服务达标率</div></div>
            <div className="av-metric"><div className="mv"><em>99%</em></div><div className="ml">整体巡检签到率</div></div>
          </div>
          <div className="avc-cases">
            <Link className="avc-case reveal" href="/cases/fmclaw-equipment-inspection">
              <span className="tag">头部互联网大厂总部 · 100+ 机房</span>
              <h3>消防班组达标率，从 52% 到 98%</h3>
              <p>同一套人单合一机制:在场核验、电子巡检单、漏检预警——消防巡检不留空白。</p>
              <span className="go">看这个项目 <Arrow s={13} /></span>
            </Link>
            <Link className="avc-case reveal" href="/cases/30w-park-ai-property-manager-robot">
              <span className="tag">智慧园区 · 约 30 万㎡</span>
              <h3>安保与秩序，跑在同一套调度上</h3>
              <p>人、机器人与 AI 在一张时间表上协同,园区物业相关投诉下降超过 80%。</p>
              <span className="go">看这个项目 <Arrow s={13} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 谁在为你服务 · 爱物管 */}
      <section className="av-band">
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
                <Link className="av-link" href="/cases/aipm-property-ai-transformation">看爱物管自己的故事 <Arrow s={13} /></Link>
                <Link className="av-link" href="/company">关于启盟科技 <Arrow s={13} /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 三种合作方式 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">三种合作方式</span>
          <h2 className="av-h2 reveal">按你的情况，选一种开始</h2>
          <div className="avc-modes">
            <article className="avc-mode reveal">
              <span className="lab">方式一 · 全委服务</span>
              <h3>安保整体交给爱物管</h3>
              <p>人、AI 预审、巡检狗与物联设备一体交付。预警处置率、消防巡检达标率写进合同，按数据结算。</p>
              <span className="who"><b>适合：</b>想整体升级安保、优化岗位结构的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式二 · 顾问驻场</span>
              <h3>你的团队留下，换管理方式</h3>
              <p>我们派驻项目顾问，带全套 AI 产品进场，参与管理与考核。服务期至少一年。</p>
              <span className="who"><b>适合：</b>现有安保团队不想动、但想管住预警与消防巡检的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式三 · 产品与平台</span>
              <h3>把这套能力接进你的交付</h3>
              <p>你是物业 / 安保公司？AI 预警预审、人单合一巡检与物联感知，都可以接进你自己的项目。</p>
              <span className="who"><b>入口：</b><Link className="av-link" href="/products/fmclaw" style={{ fontSize: 13 }}>FMClaw™ AI 平台 <Arrow s={12} /></Link></span>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于 AI 安保服务，问得最多的" items={faq} />

      {/* 尾部 CTA */}
      <section className="avc-end">
        <div className="avc-end__glow" aria-hidden="true" />
        <div className="wrap">
          <h2 className="reveal">先从看得完每一条预警开始</h2>
          <p className="reveal">
            用你的项目，让我们出一份带预警处置、消防巡检与岗位测算的安保方案——三件具体的事，一件件核给你看。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow /></Link>
            <span className="alt">或先看 <Link href="/products/iot">IoT 物理世界感知系统</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
