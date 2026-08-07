import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/partners/embodied-ai-data", {
  title: "具身智能与物理 AI 数据合作 — 真实场景的第一视角数据与实训场 | 启盟科技",
  description:
    "面向具身智能公司、世界模型与多模态团队、具身数据平台的数据合作：3,000 万㎡ 全业态在管场景、数以万计一线服务人员，第一视角作业数据在真实工作中自然产生，FMClaw™ 工单让每段数据自带任务语义，IoT 传感器补齐环境语义。采集融入日常作业、无需布景与专职采集员，是成本结构完全不同的数据采集与训练合作方；真实楼宇与园区同时可作机器人实训场。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Hero：四项事实 ----------
   数字口径:3000万㎡/100+客户/10万+传感器 来自站内 MoatStats(已核验口径);
   「数以千计场景 / 数以万计一线服务人员」为业务方(用户)本轮直接给出的口径。
   TODO(待业务方定期复核):四项数值与口径说明。 */
const heroChips = [
  "3,000 万㎡ 全业态真实在管场景",
  "数以万计一线物业服务人员",
  "每段数据自带工单任务语义",
  "采集融入日常作业，边际成本低",
];

/* ---------- 三类伙伴:谁适合来聊 ----------
   买方图谱依据(2026 行业公开报道,代码注释留档,正文不点名):
   - 需求方=「前沿大模型团队、海内外具身智能大厂及初创公司」(觅蜂科技 CEO 公开访谈口径);
   - 世界模型平台(如 NVIDIA Cosmos 论文)明确使用专有真实世界视频数据集训练;
   - 头部数据服务商公开计划「联合超 1000 家场景方」,大厂计划采集千万小时级人类真实场景视频
     ——数据平台缺的不是钱,是场景方。
   TODO(待业务方复核):三类伙伴的话术与优先级。 */
const audiences = [
  {
    k: "具身智能与机器人公司",
    h: "要能教会机器人干活的数据",
    p: "第一视角作业数据、带任务语义的数据集、真实场景实训与上岗运营——从训练到验证到部署，四种合作都为你设计。",
  },
  {
    k: "世界模型与多模态团队",
    h: "要带环境语义的真实世界视频",
    p: "训练世界模型需要海量真实物理世界视频，且行业普遍反馈标注太浅——我们的每段视频自带任务语义，还能对齐同一时空的传感器环境状态。",
  },
  {
    k: "具身数据平台与数采服务商",
    h: "要规模化、可持续的场景方",
    p: "你们带采集设备、数据标准与下游客户，我们出真实场景与一线人员——不重建采集网络，直接在真实运营里铺开产能。",
  },
];

/* ---------- 行业困境:物理 AI 缺什么 ----------
   事实依据(2026 行业公开报道/报告,不点名个别公司):
   - 真机遥操数据贵且慢:专职采集员 8 小时约产出 2-3 小时有效数据,需布景与专用场地;
   - 仿真数据有 Sim-to-Real Gap(动力学层面难以复现);
   - 互联网视频没有任务语义与动作信号;
   - 行业公认最有价值的视频数据 = 第一视角(Egocentric)× 人类示范(Human-Centric)。 */
const pains = [
  {
    no: "01",
    h: "真机数据：准确，但贵且慢",
    p: "遥操作采集要布置场景、配专职采集员，一名熟练采集员一天 8 小时只能产出两三个小时的有效数据。硬件、场地、人工层层叠加，规模上不去。",
  },
  {
    no: "02",
    h: "仿真数据：规模大，但过不了现实这关",
    p: "虚拟环境里练一万次，到了真实的毛巾、水渍和反光地面前还是会出错——摩擦、形变、液体这些动力学细节，仿真难以完整复现。",
  },
  {
    no: "03",
    h: "互联网视频：量大，但没有任务语义",
    p: "看再多视频，模型也不知道这个人在执行什么任务、按什么标准、做没做完。缺了任务上下文，视频只能教认知，教不会干活。",
  },
];

/* ---------- 我们有什么:四项供给 ---------- */
const supplies = [
  {
    h: "场景",
    t: "3,000 万㎡ 全业态真实空间",
    p: "办公楼宇、园区、商业综合体、医院、学校——不是搭出来的训练场，是每天真实运转的空间。反光地面、玻璃幕墙、电梯轿厢、地下机房，长尾场景天然齐全。",
  },
  {
    h: "人",
    t: "数以万计的一线服务人员",
    p: "清洁、巡检、维修、安保，每天在真实场景里重复真实任务。穿戴式相机融入作业，产生的正是行业最想要的数据：第一视角 × 人类示范。",
  },
  {
    h: "任务语义",
    t: "FMClaw™ 工单就是天然标注",
    p: "每一段作业视频都对应一张工单：什么任务、在哪个空间、按什么标准、做没做完、质检结果如何。任务上下文由工作流引擎自动记录，不需要事后人工补标。",
  },
  {
    h: "装备与环境",
    t: "机器人在岗 + 10 万+ 传感器",
    p: "清洁机器人与四足巡检机器人已在项目上运行，真机数据持续产生；同一空间里 10 万+ 传感器记录温湿度、人流与设备状态，为视觉数据补上环境上下文。",
  },
];

/* ---------- 四种合作方式 ---------- */
const offers = [
  {
    no: "01",
    h: "第一视角作业数据采集",
    p: "一线人员佩戴穿戴式相机，在日常清洁、巡检、维修中自然采集第一视角视频。任务由真实工单驱动，不布景、不摆拍。",
    tag: "Egocentric × Human-Centric",
  },
  {
    no: "02",
    h: "带任务语义的数据集共建",
    p: "按你的模型需要定义任务清单与采集规范，交付经脱敏、带工单语义标注的结构化数据集——任务、空间、标准、结果，字段对齐你的训练管线。",
    tag: "工单驱动标注",
  },
  {
    no: "03",
    h: "真实场景实训场",
    p: "把你的机器人放进真实运营中的楼宇与园区做实训与测试：真实人流、真实电梯、真实清洁标准。从受控测试到真实上岗，分阶段验证。",
    tag: "真实环境验证",
  },
  {
    no: "04",
    h: "机器人上岗联合运营",
    p: "通过我们的项目网络让你的机器人真正上岗干活，运行数据持续回流训练。机器人由 FMClaw™ 工作流派单调度，和人类班组在同一套系统里协作。",
    tag: "数据回流迭代",
  },
];

/* ---------- 成本结构对比 ---------- */
const costCompare = {
  factory: {
    title: "专职数采工厂",
    items: ["场地专门租建，场景靠人工布置", "采集员专职雇佣，只为采集而工作", "8 小时工作约产出 2–3 小时有效数据", "场景多样性受限于布景能力"],
  },
  ours: {
    title: "在真实工作中采集",
    items: ["场景是本来就在运营的楼宇与园区", "采集的人本来就在做这份工作", "数据是日常作业的副产品，随运营自然增长", "全业态项目网络，长尾场景天然覆盖"],
  },
};

/* ---------- 合作流程 ---------- */
const steps = [
  { no: "1", title: "对齐需求", body: "说明你的模型与数据需要：任务类型、视角、模态、规模与格式。" },
  { no: "2", title: "小批量试采", body: "选定试点项目与任务清单，先交付一个小批量样本集验证质量。" },
  { no: "3", title: "规模化采集", body: "确认规范后按项目网络铺开，数据按约定周期持续交付。" },
  { no: "4", title: "回流与迭代", body: "实训与上岗产生的数据持续回流，采集规范随模型迭代调整。" },
];

/* ---------- 结构化数据（SEO / GEO）---------- */
const SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "具身智能与物理 AI 数据合作",
  serviceType: "第一视角数据采集 / 带环境语义的真实世界视频 / 机器人真实场景实训",
  description:
    "面向具身智能公司、世界模型与多模态团队、具身数据平台：在 3,000 万㎡ 真实在管场景中，由数以万计一线物业服务人员在日常作业中采集第一视角数据，FMClaw™ 工单提供任务语义标注，IoT 传感器提供环境上下文；真实楼宇与园区可作机器人实训场与上岗运营环境。",
  areaServed: "CN",
  url: `${SITE_URL}/partners/embodied-ai-data`,
  provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "具身智能与物理 AI 数据合作方式",
    itemListElement: offers.map((o) => ({
      "@type": "Offer",
      name: o.h,
      description: o.p,
    })),
  },
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "生态伙伴", item: `${SITE_URL}/partners` },
    { "@type": "ListItem", position: 3, name: "具身智能与物理 AI 数据合作", item: `${SITE_URL}/partners/embodied-ai-data` },
  ],
};

export default function Page() {
  return (
    <main className="eaid">
      <JsonLd data={[SERVICE_LD, BREADCRUMB_LD]} />

      {/* 1 · HERO：左文右图 */}
      <section className="ea-hero">
        <div className="ea-grid" aria-hidden="true" />
        <div className="wrap ea-hero-cols">
          <div className="ea-hero-txt">
            <span className="ea-kicker">
              <Link href="/">启盟科技</Link>
              <i>/</i>
              <Link href="/partners">生态伙伴</Link>
              <i>/</i>具身智能与物理 AI 数据合作
            </span>
            <h1 className="ea-h1">
              你的模型缺真实世界数据，<br /><span className="grad">我们的一线每天都在产生它</span>
            </h1>
            <p className="ea-lead">
              具身智能与物理 AI 最稀缺的，是真实场景里带任务语义的第一视角数据。物业与设施管理恰好是这样一个行业：<b>真实的空间、真实的任务、真实的人，每天都在大规模重复</b>。
            </p>
            <div className="ea-cta">
              <Link href="/contact" className="btn btn-primary">聊聊你的数据需求 <Arrow /></Link>
              <a href="#offers" className="btn btn-ghost">看四种合作方式 <Arrow /></a>
            </div>
            <ul className="ea-chips">
              {heroChips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="ea-hero-art">
            <Image
              src="/images/partners/embodied-ai-data.jpg"
              alt="写字楼里佩戴胸前第一视角相机的物业服务人员正在擦拭玻璃栏杆，身后是推着作业车的同事与巡逻机器人"
              width={900}
              height={604}
              priority
              sizes="(max-width: 960px) 92vw, 520px"
            />
            <span className="ea-art-cap">场景示意：第一视角采集融入日常作业——任务真实发生，数据随之产生。</span>
          </div>
        </div>
      </section>

      {/* 2 · 行业困境（暗场） */}
      <section className="ea-core">
        <div className="ea-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="ea-eyebrow on-dark">为什么是物业</span>
          <h2 className="ea-h2 on-dark">物理 AI 的数据，卡在哪儿</h2>
          <p className="ea-sub on-dark">
            大语言模型吃互联网数据长大，机器人和世界模型却没有现成的互联网可吃——它们需要的物理交互数据，必须在真实世界里一条一条生产出来。行业公认最有价值的，是<b>第一视角 × 人类示范</b>的真实任务数据；而它恰恰最难规模化。
          </p>
          <div className="ea-pains">
            {pains.map((p) => (
              <div className="ea-pain" key={p.no}>
                <span className="ea-pain-no grad">{p.no}</span>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
          <p className="ea-verdict">
            三条路各有短板，缺的是同一样东西：<span className="grad">真实场景里、带任务语义的、能规模化的数据来源</span>。
          </p>
          {/* 行业热度佐证。口径来源(公开报道,2026):量子位统计具身数据玩家近百家、
              一年融资 44.7 亿元;需求方「你有多少我就买多少」为觅蜂科技 CEO 公开访谈原话。
              TODO(待业务方定期复核):数字与表述时效。 */}
          <p className="ea-stat on-dark">
            这个缺口已经是一门被资本追着跑的生意：2026 年国内具身数据相关公司已近百家、一年融资超 44 亿元，需求方的状态被从业者描述为「你有多少我就买多少」。缺的从来不是买家——是真实场景里的供给。
          </p>
        </div>
      </section>

      {/* 3 · 三类伙伴 */}
      <section className="ea-band">
        <div className="wrap">
          <span className="ea-eyebrow">适合谁</span>
          <h2 className="ea-h2">三类伙伴，带着不同的需求来</h2>
          <p className="ea-sub">
            这类数据的买方不只是机器人公司。训练世界模型的团队在找带环境语义的真实世界视频，数据平台在找可规模化的场景方——<b>三类需求，我们都接得住</b>。
          </p>
          <div className="ea-aud">
            {audiences.map((a) => (
              <div className="ea-aud-i" key={a.k}>
                <span className="ea-aud-k">{a.k}</span>
                <h3>{a.h}</h3>
                <p>{a.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · 我们有什么 */}
      <section className="ea-band mist">
        <div className="wrap">
          <span className="ea-eyebrow">我们的供给</span>
          <h2 className="ea-h2">场景、人、任务语义、装备——四样都在一线</h2>
          <p className="ea-sub">
            启盟科技做的是<Link href="/insights/what-is-physical-ai">物理 AI</Link>：用 <Link href="/products/iot">IoT 感知</Link>、<Link href="/products/fmclaw">FMClaw™ 平台</Link>与<Link href="/products/robots">机器人装备</Link>接管物业与设施管理的日常运营。这套一线网络，正好就是具身智能需要的数据基础设施。
          </p>
          <div className="ea-supplies">
            {supplies.map((s) => (
              <div className="ea-supply" key={s.h}>
                <span className="ea-supply-k">{s.h}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="ea-align">
            <span className="ea-align-k">数采工厂给不出来的东西</span>
            <p>
              同一时空里，<b>第一视角作业视频 × 环境传感器状态 × 工单任务语义</b>，三重对齐。视频记录动作，传感器记录环境，工单记录任务——三份记录指向同一次真实作业，这正是行业反馈里「标注太浅、缺环境语义」的那个缺口。
            </p>
          </div>
        </div>
      </section>

      {/* 5 · 四种合作方式 */}
      <section className="ea-band" id="offers">
        <div className="wrap">
          <span className="ea-eyebrow">合作方式</span>
          <h2 className="ea-h2">从数据采集到机器人上岗，四种合作</h2>
          <div className="ea-offers">
            {offers.map((o) => (
              <div className="ea-offer" key={o.no}>
                <div className="ea-offer-head">
                  <span className="ea-offer-no grad">{o.no}</span>
                  <span className="ea-offer-tag">{o.tag}</span>
                </div>
                <h3>{o.h}</h3>
                <p>{o.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · 成本结构对比 */}
      <section className="ea-band mist">
        <div className="wrap">
          <span className="ea-eyebrow">成本结构</span>
          <h2 className="ea-h2">不是更便宜的采集员，<br />是完全不同的成本结构</h2>
          <p className="ea-sub">
            专职数采要为数据单独付出场地、布景和人工；而在我们这里，<b>工作本来就在发生，采集是作业的副产品</b>——这是「成本最低的数据合作方」这句话的真正含义。
          </p>
          <div className="ea-cost">
            <div className="ea-cost-col">
              <h3>{costCompare.factory.title}</h3>
              <ul>
                {costCompare.factory.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="ea-cost-col qm">
              <h3>{costCompare.ours.title}</h3>
              <ul>
                {costCompare.ours.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · 合规 */}
      <section className="ea-band">
        <div className="wrap">
          <span className="ea-eyebrow">合规与授权</span>
          <h2 className="ea-h2">数据合规，是合作的前提</h2>
          <div className="ea-comp">
            <div className="ea-comp-i"><b>知情与授权</b><p>采集经人员知情同意与项目方授权，采集范围与用途事先书面约定。</p></div>
            <div className="ea-comp-i"><b>脱敏处理</b><p>人脸、车牌等个人信息在交付前完成脱敏，敏感区域不纳入采集。</p></div>
            <div className="ea-comp-i"><b>权属与边界</b><p>数据权属、使用范围与转授权限制写进合作协议，边界清晰可审计。</p></div>
          </div>
        </div>
      </section>

      {/* 8 · 合作流程 */}
      <section className="ea-band mist">
        <div className="wrap">
          <span className="ea-eyebrow">合作流程</span>
          <h2 className="ea-h2">从对齐需求到数据回流，四步走</h2>
          <div className="ea-steps">
            {steps.map((s) => (
              <div className="ea-step" key={s.no}>
                <span className="ea-step-no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoFaq
        heading="关于具身智能与物理 AI 数据合作，你可能想问"
        items={[
          { q: "你们的数据和数采工厂的遥操数据有什么不同？", a: "遥操数据是为采集而生产的：布置场景、专人操控机器人。我们的数据在真实工作中自然产生：一线人员佩戴第一视角相机完成真实工单，场景、任务、人都是真的，且每段数据自带工单语义（任务、空间、标准、结果）。两类数据互补——遥操数据教动作控制，我们的数据教真实任务与真实环境。" },
          { q: "数据带什么标注？", a: "每段作业视频对应 FMClaw™ 平台的一张工单，自动关联任务类型、空间位置、执行标准、完成状态与质检结果；同一空间的传感器数据（温湿度、人流、设备状态）可作为环境上下文一并交付。字段结构可按你的训练管线对齐。" },
          { q: "可以把我们的机器人放进你们的场景测试吗？", a: "可以，这正是合作方式之三：真实场景实训场。你的机器人进入真实运营中的楼宇与园区，分阶段从受控测试走到真实上岗；上岗后由 FMClaw™ 工作流派单调度，运行数据持续回流用于训练。" },
          { q: "我们不造机器人，是世界模型团队或数据平台，也能合作吗？", a: "能，而且是我们明确欢迎的两类伙伴。世界模型与多模态团队可以拿到带任务语义与环境上下文的真实世界视频——第一视角视频、同一时空的传感器状态与工单语义三重对齐；数据平台与数采服务商可以把我们作为规模化场景方：你们带采集设备、数据标准与下游客户，我们出真实场景与一线人员。" },
          { q: "隐私和数据权属怎么处理？", a: "采集经人员知情同意与项目方授权；人脸、车牌等个人信息交付前脱敏，敏感区域不纳入采集；数据权属、使用范围与转授权限制在合作协议中书面约定。" },
        ]}
      />

      {/* ===== END CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带着你的数据需求来聊</h2>
          <p className="reveal">从一个小批量样本集开始验证。也欢迎先了解<Link href="/products/iot" style={{ color: "#3fd9b8", fontWeight: 600 }}>我们的物理世界感知体系 →</Link></p>
          <div className="cta-row reveal">
            <Link href="/contact" className="btn btn-primary">联系我们 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
