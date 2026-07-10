import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import "../page.css";
import "../trade.css";
import "./page.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "AI 设施设备服务 · 人单合一的设施设备运维 — 启盟科技",
  description:
    "AI 设施设备服务用「人单合一」根治漏修漏检:人到达指定机房经 IoT 核验后才能开始巡检,系统按机房类型自动调出巡检表,仪表拍照 AI 识别读数准确率 99%+,异常即时上报、关键指标同比环比预警。预防性维护做实后,某枢纽机场维修工单下降 70%。由启盟科技旗下自营物业公司爱物管交付。",
  keywords: [
    "AI 设施设备服务",
    "设施设备管理外包",
    "机电维保外包",
    "设备巡检外包",
    "设备巡检漏检怎么解决",
    "假巡检",
    "只巡不检",
    "人单合一",
    "漏修漏检",
    "预防性维护",
    "机房巡检",
    "智能巡检系统",
    "爱物管",
    "启盟科技",
  ],
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 与传统设施设备服务的区别(GEO 可引用事实清单)
const compare: { k: string; old: string; now: React.ReactNode }[] = [
  {
    k: "合同承诺",
    old: "承诺派几个工程师",
    now: <><b>承诺巡什么、巡多少</b>——点位、频次、巡检内容逐项量化,写进合同</>,
  },
  {
    k: "巡没巡,谁知道",
    old: "填巡检本。漏签、补签、冒签,事后没法核实",
    now: <><b>IoT 在场核验</b>——人到达指定机房、位置核验通过,才能开始巡检。每一次巡检都真实发生,漏检自动预警</>,
  },
  {
    k: "该查什么",
    old: "靠老师傅经验,新人不知道该填什么",
    now: <>到达机房,系统按机房类型<b>自动调出巡检表</b>:该查哪些设备、哪些参数,一项项给出。巡检表可配置,标准不靠记</>,
  },
  {
    k: "数据准不准",
    old: "手抄仪表参数,抄错、编数难避免",
    now: <>仪表<b>拍照识别</b>,AI 自动读数填进记录,准确率 99%+——一线人员操作难度降下来,数据真实性提上去</>,
  },
  {
    k: "坏了才知道",
    old: "设备停机才报修,头痛医头",
    now: <>巡检中发现异常<b>立即上报派单</b>;电压、电流等关键指标做同比环比分析,趋势变差提前提示——把维修挡在故障前</>,
  },
  {
    k: "该配几个人",
    old: "说不清,人多人少全凭感觉",
    now: <>每次巡检的时长、频次系统都有记录,<b>工时账算得出来</b>——多配了多少人,数据会告诉你</>,
  },
  {
    k: "做不到怎么办",
    old: "口头承诺,出了问题再协商",
    now: <>签到率、达标率、响应时效写进合同,<b>按数据考核</b>,做不到按合同处理</>,
  },
];

// 人单合一:一次巡检的四道闸门——每一步通过,才解锁下一步
const gates = [
  {
    n: "01", h: "到场核验", gk: "IoT 位置核验",
    p: "巡检人员到达指定机房,IoT 核验当前位置。不在现场,巡检单根本打不开——从机制上杜绝漏签、补签、冒签。",
    lock: "位置核验通过,才解锁巡检单",
    ag: "设备巡检管理", href: "/solutions/inspection",
  },
  {
    n: "02", h: "智能巡检单", gk: "按机房类型自动调出",
    p: "系统按当前机房类型自动调出巡检表:该查哪些设备、记录哪些参数,一项项给出。巡检表可配置,新人到岗也知道该干什么。",
    lock: "逐项完成,才能提交",
    ag: "运营管理 Agent", href: "/solutions/operations",
  },
  {
    n: "03", h: "拍照识读", gk: "AI 读数 99%+",
    p: "对着仪表拍一张照,AI 自动识别读数、填进记录。不靠手抄,不靠经验判断,数据从源头就是真的。",
    lock: "读数入库,自动比对历史数据",
    ag: "质量评估 Agent", href: "/solutions/assessment",
  },
  {
    n: "04", h: "异常与趋势", gk: "同比环比预警",
    p: "现场异常当场上报、自动派单;电压、电流等关键指标做同比环比分析,趋势变差提前提示——维护走在故障前面。",
    lock: null,
    ag: "服务优化 Agent", href: "/solutions/optimization",
  },
];

const faq = [
  {
    q: "AI 设施设备服务和传统机电维保外包有什么区别?",
    a: "核心是「人单合一」:每一张巡检单都对应一次真实发生的巡检。人到达指定机房、IoT 位置核验通过后才能开始巡检;系统按机房类型自动调出巡检表;仪表读数由 AI 拍照识别(准确率 99%+);异常当场上报,关键指标做同比环比趋势预警。传统模式靠填巡检本,漏签、补签、冒签事后没法核实——漏修漏检就是这么发生的。这项服务由启盟科技旗下自营物业公司爱物管交付。",
  },
  {
    q: "怎么杜绝设备巡检的漏检、补签、冒签?",
    a: "靠机制,不靠自觉:巡检人员必须真实到达指定机房、通过 IoT 在场核验,才能解锁巡检单;每次巡检的时间、位置、时长系统全程留痕,漏检自动预警。在一个头部互联网大厂总部(100+ 机房)的项目里,这套机制把整体巡检签到率做到 99%,运行班组达标率从 35% 提升到 98%。",
  },
  {
    q: "巡检人员经验不足,数据会不会不准?",
    a: "这正是系统要解决的问题。到达机房后,系统按机房类型自动调出巡检表,该查什么、怎么判断,一项项给出,不依赖老师傅的记忆;仪表读数由 AI 拍照识别,准确率 99%+,不需要人工手抄和主观判断。一线人员的操作难度降下来,数据的真实性和准确性反而提上去。",
  },
  {
    q: "预防性维护真的能减少维修吗?",
    a: "能,而且幅度可观。逻辑很直接:每一次巡检都定时、定点、保质保量地真实发生,小问题在巡检里被发现、被处理,发展成故障的就少。再加上对电压、电流等关键指标的同比环比分析,趋势变差提前提示。在一个大型货运枢纽机场的项目里,这套机制运行后,维修工单下降了 70%。",
  },
  {
    q: "我们项目到底该配几个巡检人员?",
    a: "这笔账可以算出来,不用猜。每次巡检的实际时长系统都有记录——真实项目里单次巡检通常只要 3–4 分钟。假设每天需要 600 次巡检,总巡检时长约 1800 分钟,也就是 30 个小时;即便把路途时间翻倍计入,也远小于很多项目现场实际投入的人力工时。人配多了还是配少了,数据摆出来,双方都看得见。",
  },
  {
    q: "AI 设施设备服务的收费和考核怎么约定?",
    a: "报价明码标价,包含人员、AI 系统与物联硬件等部分。考核全部量化并写进合同:巡检点位与频次、签到率、达标率、异常响应时效等。做不到约定,按合同处理——不需要争论,数据和合同都摆在那里。",
  },
];

const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI 设施设备服务",
  serviceType: "AI 设施设备服务(人单合一的设施设备运维)",
  description:
    "以 IoT 在场核验、智能巡检单、AI 拍照识读与关键指标趋势预警实现「人单合一」,根治漏修漏检、做实预防性维护的设施设备运维服务。",
  areaServed: "CN",
  url: `${SITE_URL}/ai-service/facility`,
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
    { "@type": "ListItem", position: 3, name: "AI 设施设备服务", item: `${SITE_URL}/ai-service/facility` },
  ],
};

export default function Page() {
  return (
    <main className="aisv avtrade avfac">
      <JsonLd data={[SERVICE_LD, BREADCRUMB_LD]} />

      {/* HERO */}
      <section className="av-hero">
        <div className="av-hero__bg" style={{ backgroundImage: "url(/ai-service/facility-hero.jpg)" }} aria-hidden="true" />
        <div className="av-grid" aria-hidden="true" />
        <div className="wrap av-hero-top">
          <span className="av-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>
            <Link href="/ai-service">AI 物业服务</Link>
            <i>/</i>AI 设施设备服务
          </span>
          <h1 className="av-h1 reveal">每一次巡检，都真实发生</h1>
          <p className="av-lead reveal">
            设施设备服务最大的隐患是<b>漏修漏检</b>。我们用「人单合一」把它管住——人到没到，IoT 核验；该查什么，系统给单；读数准不准，拍照识别；坏没坏，数据先知道。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">为我的项目出一份设施设备方案 <Arrow /></Link>
            <a href="#evidence" className="btn btn-ghost">看真实项目 <Arrow /></a>
          </div>
          <div className="av-proof reveal">
            <span><b>IoT 在场核验</b>，杜绝冒签补签</span>
            <span className="sep" />
            <span>巡检频次<b>写进合同</b></span>
            <span className="sep" />
            <span><b className="grad">AI 拍照识读</b> 99%+</span>
          </div>
        </div>
      </section>

      {/* 与传统设施设备服务的区别 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">和传统设施设备服务的区别</span>
          <h2 className="av-h2 reveal">漏修漏检，是可以被机制消灭的</h2>
          <p className="av-sub reveal">
            设施设备出事，代价远大于地面没拖干净。而传统巡检的真相是：巡检本填满了，没人知道人到底去没去。一条地铁线 3,700 个机房、200 人的巡检团队，漏签、补签、冒签曾经防不胜防——这类场景，我们大量做过。
          </p>
          <div className="avc-cmp reveal" role="table" aria-label="传统设施设备服务与 AI 设施设备服务对比">
            <div className="avc-row avc-head" role="row">
              <div role="columnheader">维度</div>
              <div role="columnheader">传统模式</div>
              <div className="now" role="columnheader">AI 设施设备服务</div>
            </div>
            {compare.map((r) => (
              <div className="avc-row" role="row" key={r.k}>
                <div className="avc-k" role="cell">{r.k}</div>
                <div className="avc-old" role="cell">{r.old}</div>
                <div className="avc-new" role="cell">{r.now}</div>
              </div>
            ))}
          </div>
          <div className="avc-stand reveal">
            <p>
              设备巡检这件事，最怕的不是做得慢，是「做了」两个字背后没有证据。
            </p>
            <p>
              我们的每一张巡检单，都对应一次真实发生的巡检——<b>什么时候、在哪个机房、查了什么、读数多少，系统里全部有据可查。</b>
            </p>
          </div>
        </div>
      </section>

      {/* 人单合一:四道闸门,逐步解锁 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">什么是人单合一</span>
          <h2 className="av-h2 reveal">一次巡检，要过四道闸门</h2>
          <p className="av-sub reveal">
            每一步核验通过，才能解锁下一步——想跳过任何一步，系统都不给你机会。
          </p>
          <div className="fac-flow">
            {gates.map((g) => (
              <div key={g.n}>
                <div className="fac-gate reveal">
                  <div className="fac-gate__dot">{g.n}</div>
                  <div className="fac-gate__card">
                    <h3>{g.h} <span className="gk">{g.gk}</span></h3>
                    <p>{g.p}</p>
                    <Link className="ag" href={g.href}>{g.ag} <Arrow s={13} /></Link>
                  </div>
                </div>
                {g.lock && (
                  <div className="fac-lock reveal" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 16 16"><path d="M4 7V5a4 4 0 118 0v2m-9 0h10v7H3V7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    {g.lock}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="avc-note reveal">人与巡检单一一对应、单单可核——这就是<em>人单合一</em>。</p>
        </div>
      </section>

      {/* 预防性维护 */}
      <section className="av-band">
        <div className="wrap">
          <span className="av-eyebrow reveal">巡检做实之后</span>
          <h2 className="av-h2 reveal">巡检做实了，维修自然变少</h2>
          <div className="avc-robot">
            <div className="avc-robot__body reveal">
              <p>
                预防性维护不是一套新设备，是一个朴素的因果：每一次巡检都定时、定点、保质保量地真实发生，小问题就会在巡检里被发现、被处理，能发展成故障的就少了。
              </p>
              <p>
                再往前走一步：巡检里沉淀的电压、电流等关键指标，系统会做同比环比分析——趋势变差，提前提示。维护动作从「坏了修」，变成「变差就管」。
              </p>
              <p>
                在一个大型货运枢纽机场的项目里，这套机制运行后，<b>维修工单下降了 70%</b>。工单少了，停机少了，维修支出也跟着降——这是巡检做实之后的自然结果。
              </p>
            </div>
            <div className="avc-robot__media reveal">
              <img src="/ai-service/facility.jpg" alt="设施设备巡检作业现场" loading="lazy" />
            </div>
          </div>
          <blockquote className="avc-quote reveal">
            <p>“以前是月底翻巡检本，看着都签了字，心里还是没底。现在每天看系统提示就行——哪个机房没巡到、哪台设备指标在变差，它直接点出来。”</p>
            <cite>—— 某大型园区工程负责人</cite>
          </blockquote>
        </div>
      </section>

      {/* 工时账 · 算式卡 */}
      <section className="av-band mist">
        <div className="wrap">
          <span className="av-eyebrow reveal">一笔很多业主没算过的账</span>
          <h2 className="av-h2 reveal">该配几个人，可以算出来</h2>
          <p className="av-sub reveal">
            设施设备该配多少人，大多数项目从来没算过——反正一直是这么配的。系统记录给出了另一种算法：
          </p>
          <div className="fac-math reveal">
            <div className="fac-math__eq">
              <div className="row">
                <span className="item"><span className="big">3–4 分钟</span><span className="lb">单次机房巡检实测时长</span></span>
                <span className="op">×</span>
                <span className="item"><span className="big">600 次</span><span className="lb">每天巡检任务量(示例)</span></span>
              </div>
              <div className="res">
                <span className="big">≈ 30 小时 / 天</span>
                <span className="lb">总巡检工时——把路途时间翻倍计入，也远小于很多项目实际投入的人力工时</span>
              </div>
            </div>
            <div className="fac-math__note">
              <p>这不是估算——<b>每一次巡检的实际时长，系统里都有记录。</b></p>
              <p>我们不替你下结论。人配多了还是配少了，数据摆出来，这笔账双方一起算。</p>
              <p className="fine">巡检频次与任务量因项目而异，以上为真实项目的示例测算。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 证据 · 暗场 */}
      <section className="av-core" id="evidence">
        <div className="av-core__bg" aria-hidden="true" />
        <div className="wrap">
          <span className="av-eyebrow on-dark reveal">已经在运行的项目</span>
          <h2 className="av-h2 on-dark reveal">从大厂总部到枢纽机场</h2>
          <div className="av-metrics reveal">
            <div className="av-metric"><div className="mv"><em>99%</em></div><div className="ml">整体巡检签到率(头部互联网大厂总部)</div></div>
            <div className="av-metric"><div className="mv">35% → <em>98%</em></div><div className="ml">运行班组服务达标率</div></div>
            <div className="av-metric"><div className="mv"><em>99%+</em></div><div className="ml">AI 拍照识别读数准确率</div></div>
            <div className="av-metric"><div className="mv"><em>-70%</em></div><div className="ml">维修工单(某大型货运枢纽机场)</div></div>
          </div>
          <div className="avc-cases">
            <Link className="avc-case reveal" href="/cases/fmclaw-equipment-inspection">
              <span className="tag">头部互联网大厂总部 · 100+ 机房</span>
              <h3>设施设备巡检，交给一个 AI 物业智能体</h3>
              <p>整体签到率 99%，运行班组达标率从 35% 到 98%，AI 拍照识别读数准确率 99%+。</p>
              <span className="go">看这个项目 <Arrow s={13} /></span>
            </Link>
            <Link className="avc-case reveal" href="/cases/30w-park-ai-property-manager-robot">
              <span className="tag">智慧园区 · 约 30 万㎡</span>
              <h3>一位 AI 物业经理，管住全部日常运营</h3>
              <p>设施设备巡检与保养同样跑在这套系统上：自动化率 85%+，管理效率提升 66.6%。</p>
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
              <h3>设施设备整体交给爱物管</h3>
              <p>人、AI 系统、物联硬件一体交付。巡检频次、签到率、达标率写进合同，按数据结算。</p>
              <span className="who"><b>适合：</b>想彻底告别漏修漏检的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式二 · 顾问驻场</span>
              <h3>你的团队留下，换管理方式</h3>
              <p>我们派驻项目顾问，带全套 AI 产品进场，参与管理与考核。服务期至少一年。</p>
              <span className="who"><b>适合：</b>现有工程团队不想动、但想管住巡检真实性的业主</span>
            </article>
            <article className="avc-mode reveal">
              <span className="lab">方式三 · 产品与平台</span>
              <h3>把这套能力接进你的交付</h3>
              <p>你是物业 / FM 公司？在场核验、智能巡检单、AI 识读与预警，都可以接进你自己的项目。</p>
              <span className="who"><b>入口：</b><Link className="av-link" href="/products/fmclaw" style={{ fontSize: 13 }}>FMClaw™ AI 平台 <Arrow s={12} /></Link></span>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SeoFaq heading="关于 AI 设施设备服务，问得最多的" items={faq} />

      {/* 尾部 CTA */}
      <section className="avc-end">
        <div className="avc-end__glow" aria-hidden="true" />
        <div className="wrap">
          <h2 className="reveal">让每一次巡检都算数</h2>
          <p className="reveal">
            用你的项目，让我们出一份带巡检点位、频次与考核指标的设施设备方案——从这份方案开始，你就能看到区别。
          </p>
          <div className="av-cta reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow /></Link>
            <span className="alt">或先看 <Link href="/solutions/inspection">设备巡检管理怎么做</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
