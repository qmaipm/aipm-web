import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import TrackedLink from "@/components/TrackedLink";
import { pageMetadata } from "@/lib/pageMetadata";
import { FMCLAW_URL } from "@/lib/nav";
import { FmFaq, FMCLAW_APP_LD } from "./_shared";
import { SolPage, SolSection, SolCols, SolVerdict, SolMore, SolNums, Arrow } from "../../solutions/_tpl/Sol";
import HeroStage, { PlayDemoLink } from "./_HeroStage";
import { DEMO_SRC } from "./_demo";
import "./fmv.css";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

/* 2026-10 主力页改版（规划书 v1，结构锁定）：
   首屏真实产品视频 → logo 墙 → ① 它主动 → ② 不一样在哪 → ③ 它懂现场 → ④ 它管得住 → ⑤ 案例结果 → ⑥ 怎么开始 → FAQ。
   口径：正文只用公司级数字（PPT 2026-09）；画面里的单项目实时数字只作为画面出现。验收见 docs/FMCLAW-PAGE-ACCEPTANCE.md。 */
export const metadata: Metadata = pageMetadata("/products/fmclaw", {
  title: "AI 物业经理 FMClaw™｜物业与设施管理的生产级 AI 智能体平台",
  description:
    "AI 物业经理 FMClaw™ 是面向物业与设施管理的生产级 AI 智能体平台与 AI 物业管理平台：项目大脑自动感知、总结、调度、迭代，114 条工作流、87 条在线运行，关键节点由人一键确认。个人版免费，项目团队版 19,800 元起。",
});

const DEFINITION =
  "AI 物业经理 FMClaw™ 是物业与设施管理的生产级 AI 智能体平台，用项目大脑自动感知、总结、调度和迭代项目管理工作。";

const WEBPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI 物业经理 FMClaw™ 产品总览",
  url: `${SITE_URL}/products/fmclaw`,
  inLanguage: "zh-CN",
  description: DEFINITION,
  dateModified: "2026-10-12",
};

const VIDEO_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "AI 物业经理 FMClaw™ 3 分钟演示",
  description:
    "7 个章节：项目的具象化、走进大脑、自动感知、自动总结、自动调度、自动迭代、从零开始。演示 AI 物业经理如何让项目的管理工作自己运转。",
  thumbnailUrl: [`${SITE_URL}/products/fmclaw/v2/demo-poster.webp`],
  uploadDate: "2026-10-12",
  duration: "PT2M49S",
  contentUrl: DEMO_SRC.startsWith("http") ? DEMO_SRC : `${SITE_URL}${DEMO_SRC}`,
  inLanguage: "zh-CN",
  publisher: { "@type": "Organization", name: "广州启盟科技有限公司", url: SITE_URL },
};

const CRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI 物业经理 FMClaw™", item: `${SITE_URL}/products/fmclaw` },
  ],
};

/* 首屏下方 logo 墙（PPT 第 17 页客户；站内已有授权 logo 文件） */
const LOGOS = [
  { f: "tencent", alt: "腾讯 Tencent", h: 23 },
  { f: "tesla", alt: "特斯拉 Tesla", h: 20 },
  { f: "bytedance", alt: "字节跳动 ByteDance", h: 22 },
  { f: "siemens", alt: "西门子 Siemens", h: 18 },
  { f: "sf", alt: "顺丰速运 SF Express", h: 28 },
  { f: "wework", alt: "WeWork", h: 19 },
];

/* ① 四个「自动」 */
const AUTOS = [
  { title: "自动感知", body: "IoT、业务系统、群消息和现场影像持续进入项目大脑。现场发生了什么，它先知道。" },
  { title: "自动总结", body: "把散落各处的数据整理成日报、周报和异常清单，口径统一，每个数字都能追到来源。" },
  { title: "自动调度", body: "发现问题就开单、通知、催办，把任务交给人、机器人或系统工具，跟到关闭为止。" },
  { title: "自动迭代", body: "每一次执行结果都回到工作流里，薄弱环节被找出来，下一轮做得更好。" },
];

/* ② 品类对照（不点名竞品） */
const DIFF = [
  { k: "谁先动", a: "人录入，人查看", b: "人提问，人发起", c: "它自己发起，按规则持续推进" },
  { k: "懂不懂物业", a: "记录字段，不理解业务", b: "通用能力，要自己教", c: "内置行业数据本体与 114 条工作流" },
  { k: "能不能干完", a: "出报表，执行靠人", b: "给建议，或完成一次任务", c: "调用工具执行，结果写回现有系统" },
  { k: "管不管得住", a: "按菜单分权限", b: "靠使用者自己把关", c: "项目隔离、授权执行、关键节点人确认" },
];

/* ③ 三个入口 */
const SENSE = [
  {
    img: "/products/fmclaw/v2/photo-see.webp",
    alt: "设备机房里，一枚无线传感器安装在管道上，指示灯亮着",
    t: "看见现场",
    d: "服务、设备、环境、视觉四类感知接入同一平台，自研传感器 30 秒装好一个。",
    href: "/products/iot",
    link: "IoT 物理世界感知",
  },
  {
    img: "/products/fmclaw/v2/photo-understand.webp",
    alt: "傍晚的城市综合体：写字楼、住宅、商业裙楼与园林连成一片",
    t: "理解业务",
    d: (
      <>
        行业数据本体把项目、空间、设备、工单、合同统一成业务对象和指标口径。管理者一句话就能
        <Link href="/solutions/ask-data">智能问数</Link>，答案追得到来源。
      </>
    ),
    href: "/products/fmclaw/ontology",
    link: "行业数据本体",
  },
  {
    img: "/products/fmclaw/v2/photo-act.webp",
    alt: "明亮的写字楼大堂里，清洁机器人在作业，工程人员走向电梯",
    t: "调动工具",
    d: "工具箱把在用的 ERP、工单、钉钉、飞书、企业微信、IoT 平台与机器人，接成智能体可调用的工具。",
    href: "/products/fmclaw/connectors",
    link: "工具箱",
  },
];

/* ④ 三句边界 */
const BOUNDS = [
  { k: "数据本体管看什么", d: "项目之间相互隔离，数据按岗位授权，超出范围的数据读不到。", href: "/products/fmclaw/ontology" },
  { k: "工具箱管做什么", d: "只调用企业授权的系统，敏感动作先进审批，权限可以随时收回。", href: "/products/fmclaw/connectors" },
  { k: "控制台管怎么做", d: "每个智能体在做什么、到了哪一步、是否在等人确认，都看得到；可以暂停、驳回或接管。", href: "/products/fmclaw/agent-runtime" },
];

/* ⑤ 三个案例，各一个大数字（均为已发布案例口径） */
const CASES = [
  { v: "35% → 98%", l: "运行班组巡检达标率", who: "头部互联网大厂总部 · 设施设备巡检", href: "/cases/fmclaw-equipment-inspection" },
  { v: "500+", l: "个项目每天自动收到运营报告，每份约 3 分钟", who: "百强物业集团 · 运营报告", href: "/cases/property-group-auto-operation-report" },
  { v: "76%", l: "管理环节自动运转，项目扭亏为盈", who: "华南 6 万㎡ 商业综合体 · 全项目运营", href: "/cases/south-china-mixed-use-6-to-1" },
];

const FAQ = [
  {
    q: "AI 物业经理 FMClaw™ 是什么？",
    a: "AI 物业经理 FMClaw™ 是面向物业与设施管理的生产级 AI 智能体平台，也可以理解为一套智慧物业 AI 平台或 AI 物业操作系统。它的核心是项目大脑：自动感知现场、总结问题、调度人和工具，并从结果中持续迭代；关键决策仍由授权人员一键确认。",
  },
  {
    q: "它解决哪些物业管理问题？",
    a: "它解决的是「事情有没有真的做、做到什么程度」难以及时掌握，以及「管理动作要靠人一项项跟」这两类问题。具体落到五件事：设备巡检与品质评估、群消息报事与自动派单、供应商对账与结算、多项目运营报告、成本与人员配置测算。共同点是流程重复、结果可以用数据复核、过去主要靠人跟进。",
  },
  {
    q: "AI 物业经理和传统物业软件有什么区别？",
    a: "传统物业软件是记录工具：人把现场录进去，系统出报表，再由人解读、派人、跟进。AI 物业经理是执行者：它自己从 IoT、影像、群消息与业务系统取数，按工作流推进，直接输出工单、通知或待确认材料。它接在现有软件之上，把里面的流程跑起来，而不是再多一处录入。",
  },
  {
    q: "它和通用 AI 智能体平台有什么不同？",
    a: "通用平台提供模型、智能体和工具的通用能力，适合帮一个人完成一次任务。AI 物业经理在此之上提供物业与设施管理的行业数据本体、统一指标、114 条行业工作流、行业工具和项目级运行治理，目标是替一个组织把管理工作长期、稳定地干下去。",
  },
  {
    q: "能不能接现有系统？需要替换钉钉、飞书或企业微信吗？",
    a: "能接，而且这是默认方式，不需要替换。ERP 与财务系统继续做账，工单系统继续流转，钉钉、飞书、企业微信继续做员工入口；FMClaw 通过官方接口读取数据，在行业数据本体里统一口径，再通过工具箱把结果写回。海康、大华等视频安防、IoT 与机器人同样接在后面。员工不需要换软件，也不需要二次录入。",
  },
  {
    q: "什么是智能问数？",
    a: "智能问数是管理者用一句自然语言直接问业务数据，例如「上个月哪个项目的工单超时最多」。因为数据已经在行业数据本体里统一了对象和口径，回答会给出数字、出处和计算方式，而不是一段无法复核的文字。",
  },
  {
    q: "如何保证关键结果一致、可追溯？",
    a: "关键指标、计算结果、报告结构和管理口径使用同一套定义。在同一工作流和口径下，同一份数据重复运行，关键业务结果保持一致；每一次数据读取、工具调用、人工确认和最终结果都留有记录，可以复核。",
  },
  {
    q: "有哪些已经落地的案例？",
    a: "FMClaw 自 2017 年起在真实项目中运行，目前 100 多家企业在用，系统覆盖面积 3000 万㎡（含客户项目）。已发布案例包括：头部互联网大厂总部巡检达标率从 35% 到 98%；一家百强物业集团 500 多个项目每天自动收到运营报告；华南 6 万㎡ 商业综合体约 76% 管理环节自动运转后扭亏为盈。全部案例见官网「客户案例」。",
  },
  {
    q: "AI 物业经理怎么收费？",
    a: "个人免费版每月含 2,000 Credit，适合个人试用；个人专业版 2,980 元/人；项目团队版 19,800 元起；集团版和企业专属版请联系销售报价。只接收报告的人员不计账号。价格详见官网「价格」页。",
  },
  {
    q: "如何开始使用？",
    a: "个人可以先在 fmclaw.cn 免费试用。企业建议从一个真实业务问题和一份真实数据开始：通过 FMClaw™ 加速营在 1–3 天内跑通一条工作流，再进入系统接入和生产部署。",
  },
];

export default function Page() {
  return (
    <SolPage>
      <div className="fmv">
        <JsonLd data={[WEBPAGE_LD, FMCLAW_APP_LD, VIDEO_LD, CRUMB_LD]} />

        {/* ===== 首屏（全页唯一深色段）：真实产品首页视频 ===== */}
        <section className="fmv-hero">
          <div className="wrap">
            <div className="fmv-hero__text">
              <p className="fmv-kicker">AI 物业经理 · FMClaw™</p>
              <h1 className="fmv-h1">
                <span className="nb">让项目的管理工作，</span><span className="nb">自己运转</span>
              </h1>
              <p className="fmv-lead">
                项目大脑 7×24 小时感知现场、总结问题、调度人和工具，并从每一次结果里迭代。
                需要拍板的事，交给你一键确认。
              </p>
              <div className="fmv-cta">
                <TrackedLink href="/contact?intent=demo&from=products/fmclaw" action="book-demo" label="products/fmclaw-hero" className="btn btn-primary">
                  预约演示 <Arrow />
                </TrackedLink>
                <TrackedLink href={FMCLAW_URL} action="start-free" label="products/fmclaw-hero" className="btn btn-outline-d">
                  免费试用
                </TrackedLink>
                <PlayDemoLink />
              </div>
            </div>
            <HeroStage />
          </div>
        </section>

        {/* ===== logo 墙 + 背书 ===== */}
        <section className="fmv-logos" aria-label="客户与规模">
          <div className="wrap">
            <p className="fmv-logos__t"><b>100 多家企业</b>在用 · 系统覆盖 <b>3000 万㎡</b> · 办公、园区、医院、轨道交通等业态</p>
            <ul className="fmv-logos__wall">
              {LOGOS.map((l) => (
                <li key={l.f}><img src={`/images/clients/${l.f}.svg`} alt={l.alt} style={{ height: l.h }} loading="lazy" /></li>
              ))}
            </ul>
            <p className="fmv-def">{DEFINITION}</p>
          </div>
        </section>

        {/* ===== ① 它主动 ===== */}
        <SolSection
          id="proactive"
          tone="mist"
          title="它主动：不等你打开，工作已经在推进"
          sub="它每天自己发起工作：到点出日报，发现考勤异常就开单，把待审批的事整理好放到你面前。"
        >
          <figure className="fmv-shot">
            <picture>
              <source media="(max-width: 760px)" srcSet="/products/fmclaw/v2/console-workbench-m.webp" />
              <img
                src="/products/fmclaw/v2/console-workbench.webp"
                alt="FMClaw™ 工作台真实界面：待我审批中有一条由智能体发起的供应商结算单；右侧 38 个 Agent 当日运行记录，其中一条现场品质巡检标红失败"
                width={2080}
                height={1564}
                loading="lazy"
              />
            </picture>
            <figcaption>工作台真实界面：<b>智能体发起</b>的审批与 Agent 当日运行记录。人名已打码。</figcaption>
          </figure>
          <div className="fmv-gap" />
          <SolCols items={AUTOS} />
        </SolSection>

        {/* ===== ② 不一样在哪 ===== */}
        <SolSection
          id="difference"
          title="不一样在哪：它不是又一套软件"
          sub="同样叫「物业 AI」，背后是三类完全不同的东西。"
        >
          <div className="fmv-diff" role="table" aria-label="传统物业软件、通用智能体平台与 AI 物业经理的对照">
            <div className="fmv-diff__row is-head" role="row">
              <span role="columnheader" />
              <span role="columnheader">传统物业软件</span>
              <span role="columnheader">通用智能体平台</span>
              <span role="columnheader">AI 物业经理</span>
            </div>
            {DIFF.map((r) => (
              <div className="fmv-diff__row" role="row" key={r.k}>
                <span className="k" role="rowheader">{r.k}</span>
                <span className="a" role="cell" data-l="传统物业软件">{r.a}</span>
                <span className="b" role="cell" data-l="通用智能体平台">{r.b}</span>
                <span className="c" role="cell" data-l="AI 物业经理">{r.c}</span>
              </div>
            ))}
          </div>
          <SolVerdict>软件记录工作，通用平台帮人完成一次任务；AI 物业经理替组织把管理工作长期干下去。</SolVerdict>
          <SolMore>
            延伸阅读：<Link href="/insights/property-agent-vs-traditional-software">物业智能体与传统软件的区别</Link>、
            <Link href="/insights/general-platform-vs-industry-agent">通用平台与行业智能体怎么选</Link>、
            <Link href="/insights/ai-property-products-in-china">国内有哪些 AI 物业产品（2026 清单）</Link>、
            <Link href="/insights/ai-property-management-platforms">AI 物业管理平台推荐</Link>
          </SolMore>
        </SolSection>

        {/* ===== ③ 它懂现场 ===== */}
        <SolSection
          id="understands"
          tone="mist"
          title="它懂现场：看得见，懂业务，调得动"
          sub="通用 AI 不知道一台水泵、一张保洁合同在物业里意味着什么。它从这三处把现场接进来。"
        >
          <ul className="fmv-sense">
            {SENSE.map((s) => (
              <li key={s.t}>
                <Link href={s.href} className="fmv-sense__img" aria-label={s.link}>
                  <img src={s.img} alt={s.alt} width={1600} height={1073} loading="lazy" />
                </Link>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <Link className="spt-inlink" href={s.href}>{s.link} <Arrow s={12} /></Link>
              </li>
            ))}
          </ul>

          <figure className="fmv-shot fmv-shot--wf">
            <picture>
              <source media="(max-width: 760px)" srcSet="/products/fmclaw/v2/console-workflow-m.webp" />
              <img
                src="/products/fmclaw/v2/console-workflow.webp"
                alt="FMClaw™ 工作流真实界面：员工管理分类下的员工薪酬工作流，由触发节点、云端 agent 节点和两级审批节点组成"
                width={2400}
                height={1018}
                loading="lazy"
              />
            </picture>
            <figcaption>工作流真实界面：员工薪酬每月 9 号自动触发，两级审批由人确认。人名已打码。</figcaption>
          </figure>
          <SolNums
            items={[
              { v: "114", l: "条行业工作流" },
              { v: "87", l: "条在线运行" },
              { v: "10 万+", l: "台在线设备" },
              { v: "6 亿条", l: "每天新增数据" },
            ]}
            note="设备数量及数据量为启盟科技平台统计。"
          />
          <SolMore>
            以水电费审批为例：审批材料的准备从 5–7 天缩短到约 30 分钟，最终审批仍由授权人员完成。
            <Link href="/products/fmclaw/workflow-engine">了解工作流引擎 →</Link>
          </SolMore>
        </SolSection>

        {/* ===== ④ 它管得住 ===== */}
        <SolSection
          id="control"
          split
          title="它管得住：看什么有范围，做什么有授权"
          sub="规则由人设定，智能体按规则执行。全过程有记录，可以随时查看、暂停和接管。"
        >
          <figure className="fmv-photo">
            <img src="/products/fmclaw/v2/photo-confirm.webp" alt="项目负责人在窗边用手机确认一项待办" width={1600} height={1073} loading="lazy" />
          </figure>
          <ol className="fmv-bounds">
            {BOUNDS.map((b) => (
              <li key={b.k}>
                <h3><Link href={b.href}>{b.k}</Link></h3>
                <p>{b.d}</p>
              </li>
            ))}
          </ol>
          <SolVerdict>派出去，跟到底。需要拍板的事，交给你一键确认。</SolVerdict>
        </SolSection>

        {/* ===== ⑤ 案例结果 ===== */}
        <SolSection id="cases" tone="mist" title="案例结果：每天都在被业主考核的真实项目">
          <ul className="fmv-cases">
            {CASES.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>
                  <span className="fmv-cases__v">{c.v}</span>
                  <span className="fmv-cases__l">{c.l}</span>
                  <span className="fmv-cases__w">{c.who}</span>
                  <span className="spt-inlink">查看案例 <Arrow s={12} /></span>
                </Link>
              </li>
            ))}
          </ul>
          <SolMore><Link href="/cases">查看全部客户案例 →</Link></SolMore>
        </SolSection>

        {/* ===== ⑥ 怎么开始 ===== */}
        <SolSection id="start" title="怎么开始：从一个真实问题开始" sub="三条路，选一条最接近你现在的。">
          <ol className="fmv-paths">
            <li>
              <span className="spt-meta">个人</span>
              <h3>免费试用</h3>
              <p>每月 2,000 Credit，注册就能自己搭一条工作流。</p>
              <TrackedLink href={FMCLAW_URL} action="start-free" label="products/fmclaw-start" className="spt-inlink">进入 fmclaw.cn <Arrow s={12} /></TrackedLink>
            </li>
            <li>
              <span className="spt-meta">项目与团队</span>
              <h3>FMClaw™ 加速营</h3>
              <p>带一个真问题和真实数据，1–3 天现场跑通一条工作流，跑通的留给你。</p>
              <Link href="/workshop" className="spt-inlink">了解加速营 <Arrow s={12} /></Link>
            </li>
            <li>
              <span className="spt-meta">集团与企业</span>
              <h3>集团部署与私有化</h3>
              <p>多项目统一管理、跨项目汇总与专属部署。</p>
              <TrackedLink href="/contact?intent=demo&from=products/fmclaw-start" action="book-demo" label="products/fmclaw-start" className="spt-inlink">预约演示 <Arrow s={12} /></TrackedLink>
            </li>
          </ol>
          <div className="fmv-price">
            <p><span>价格</span><b>个人版免费</b><i>·</i><b>项目团队版 19,800 元起</b></p>
            <TrackedLink href="/pricing" action="view-pricing" label="products/fmclaw-start" className="spt-inlink">查看价格 <Arrow s={12} /></TrackedLink>
          </div>
          <SolMore>
            想把项目直接交给我们运营：<Link href="/ai-service">AI 物业服务</Link>。让智能体参与管理，是<Link href="/company/master-plan">启盟秘密蓝图</Link>的第三步，已经完成。
          </SolMore>
        </SolSection>

        {/* ===== FAQ ===== */}
        <FmFaq items={FAQ} heading="关于 AI 物业经理" />
        <div className="fmv-end">
          <div className="wrap">
            <div className="fmv-end__btns">
              <TrackedLink href="/contact?intent=demo&from=products/fmclaw" action="book-demo" label="products/fmclaw-end" className="btn btn-primary">
                预约演示 <Arrow s={16} />
              </TrackedLink>
              <TrackedLink href={FMCLAW_URL} action="start-free" label="products/fmclaw-end" className="btn btn-ghost">
                免费试用
              </TrackedLink>
            </div>
            <p className="fmv-upd">最后更新：2026-10-12</p>
          </div>
        </div>
      </div>
    </SolPage>
  );
}
