import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { SolPage, SolHero, SolSection, SolLoop, SolMore, SolEnd, Arrow } from "./_tpl/Sol";
import "./solutions-index.css";

// 解决方案总览（2026-10-13）。菜单只放搜索与 AI 提问最多的 5 个方案 + 4 个智能体；
// 全部 14 个方案在这里按业务目标分四组列出，同时补上 /solutions 根路径（面包屑与 ItemList 结构化数据的落点）。
// 排序依据：百度下拉联想前缀命中（降本增效 / 品质 / 巡检 / 报修 / 投诉均 10/10）+ GEO 监测题（Q5、S2、S3）。
const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = pageMetadata("/solutions", {
  title: "物业 AI 解决方案 · 降本增效、服务品质、设备巡检、报修投诉与集团问数 | 启盟科技",
  description:
    "启盟科技 FMClaw™ 的 14 个物业 AI 解决方案，按业务目标分四组：经营与成本（降本增效、人员薪酬）、服务与品质（品质管理、设备巡检、报事报修与投诉）、供应链与分包（分包考核、采购、供应商对账）、集团数据（智能问数、数据治理）。每个方案都从一个真实业务开始，由四个行业智能体协同完成。",
});

type Sol = { href: string; title: string; body: string; tag?: string };
const GROUPS: { id: string; title: string; sub: string; items: Sol[] }[] = [
  {
    id: "cost",
    title: "经营与成本",
    sub: "人力占物业成本一半以上，先从这里开始算账。",
    items: [
      { href: "/solutions/cost", title: "降本增效与人员成本", body: "源头、过程、持续三阶段，对着真实运营数据把成本层层省下来，不是一刀切裁人。", tag: "最常被问" },
      { href: "/solutions/payroll", title: "人员薪酬管理", body: "考勤、工时、加班、补贴自动汇总，系统算出薪酬，主管只配工作模式。" },
    ],
  },
  {
    id: "service",
    title: "服务与品质",
    sub: "服务做没做、做得好不好，用记录说话，而不是靠抽查。",
    items: [
      { href: "/solutions/quality", title: "服务品质管理", body: "过程管理、智能调度、质量评估、考核机制四个维度，质量从事后打分变成全程在管。" },
      { href: "/solutions/inspection", title: "设备巡检管理", body: "IoT 核验到场、AI 识别读数、超阈值预警，解决巡检走过场。" },
      { href: "/solutions/customer", title: "报事报修与投诉", body: "住在群里的客服 Claw，7×24 接住报修与投诉，@ 一句话成单，进展主动反馈。" },
    ],
  },
  {
    id: "supply",
    title: "供应链与分包",
    sub: "外包、采购、对账，最耗人的往往是核对。",
    items: [
      { href: "/solutions/subcontract", title: "服务分包管理", body: "出勤、服务、质量多维度自动考核，按你的规则自动输出服务账单。" },
      { href: "/solutions/vendor", title: "供应商管理与自动对账", body: "按合同自动核量、对比历史与市场、圈出异常，付款这一步留给人。" },
      { href: "/solutions/procurement", title: "采购管理", body: "按服务设计测算物料，库存低于阈值自动触发采购，多平台比价、审批后下单。" },
    ],
  },
  {
    id: "data",
    title: "集团数据",
    sub: "几百个项目、十几个系统，集团要看到的是同一个数。",
    items: [
      { href: "/solutions/ask-data", title: "物业智能问数", body: "领导随口一问，答案带口径、来源与覆盖范围，问完能直接开单派人。", tag: "百强集团在用" },
      { href: "/solutions/data-governance", title: "物业数据治理", body: "不必先治理完：先接进来用起来，问题在使用中暴露，当场调整。" },
    ],
  },
];

const AGENTS: Sol[] = [
  { href: "/solutions/service-design", title: "服务设计智能体", body: "按业态、面积、设备自动建模，给出服务标准、编制与预算。" },
  { href: "/solutions/operations", title: "运营管理智能体", body: "把标准转成每天的工作流，实时调度、异常自动升级。" },
  { href: "/solutions/assessment", title: "质量评估智能体", body: "一线拍照，AI 识别问题、客观评分，严重问题自动整改。" },
  { href: "/solutions/optimization", title: "服务优化智能体", body: "聚类定位高频问题，给出改进建议，回灌服务设计。" },
];

const ALL = [...GROUPS.flatMap((g) => g.items), ...AGENTS];

const LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "启盟科技物业 AI 解决方案",
  numberOfItems: ALL.length,
  itemListElement: ALL.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.body,
    url: `${SITE_URL}${s.href}`,
  })),
};

function Row({ s }: { s: Sol }) {
  return (
    <li>
      <Link className="sx-row" href={s.href}>
        <span className="sx-row__t">
          {s.title}
          {s.tag && <em>{s.tag}</em>}
        </span>
        <span className="sx-row__b">{s.body}</span>
        <span className="sx-row__a" aria-hidden="true"><Arrow s={14} /></span>
      </Link>
    </li>
  );
}

export default function SolutionsIndex() {
  return (
    <SolPage>
      <JsonLd data={LD} />
      <SolHero
        crumb="全部解决方案"
        title={["从一个真实业务开始，", "让管理工作自己运转"]}
        lead={<>14 个物业 AI 解决方案，按你要解决的问题分成四组。每一个都跑在同一个 FMClaw™ 平台上，<b>由四个行业智能体协同完成</b>，数据、口径和权限只有一套。</>}
        secondary={{ href: "#groups", label: "按业务目标找方案" }}
        proof={["4 组业务目标", "14 个解决方案", "4 个行业智能体"]}
        image={{ src: "/solutions/solutions-hero.jpg", alt: "清晨的写字楼大堂，物业项目负责人走过，保洁与安保人员在岗（场景示意）" }}
      />

      <nav className="sx-jump" aria-label="方案分组">
        <div className="wrap">
          {GROUPS.map((g) => (
            <a key={g.id} href={`#${g.id}`}>{g.title}<i>{g.items.length}</i></a>
          ))}
          <a href="#agents">四个行业智能体<i>4</i></a>
        </div>
      </nav>

      <div id="groups">
        {GROUPS.map((g, i) => (
          <SolSection key={g.id} id={g.id} title={g.title} sub={g.sub} tone={i % 2 ? "mist" : undefined} split>
            <ul className="sx-list">{g.items.map((s) => <Row s={s} key={s.href} />)}</ul>
          </SolSection>
        ))}
      </div>

      <SolSection id="agents" title="背后是四个行业智能体，覆盖完整的管理过程" split
        sub={<>每个解决方案都是这四个智能体的一段协作：服务设计定标准，运营管理去执行，质量评估来打分，服务优化把问题回灌给下一轮设计。</>}>
        <SolLoop nodes={["服务设计", "运营管理", "质量评估", "服务优化"]} current="all" tail="↻ 回灌服务设计" />
        <ul className="sx-list sx-list--agents">{AGENTS.map((s) => <Row s={s} key={s.href} />)}</ul>
        <SolMore><Link href="/agents">看物业管理智能体矩阵</Link> · 已经在生产中运行的项目，见 <Link href="/cases">客户案例</Link></SolMore>
      </SolSection>

      <SeoFaq
        heading="关于物业 AI 解决方案，你可能想问"
        items={[
          { q: "物业 AI 解决方案应该从哪个开始？", a: "从流程重复、结果可核、现在正靠人盯着的那一件事开始。多数物业公司的起点是降本增效与人员成本（人力占成本一半以上），或设备巡检、服务品质这类每天都在发生、能用记录核对的工作。先跑通一件，再沿着同一套数据扩展。" },
          { q: "这些解决方案是 14 套不同的系统吗？", a: "不是。14 个解决方案跑在同一个 FMClaw™ 平台上，共用一套行业数据本体、指标口径与权限，由服务设计、运营管理、质量评估、服务优化四个行业智能体协同完成。上第二个方案时，数据和口径不用重做。" },
          { q: "AI 能直接提升物业费收缴率吗？", a: "我们不认为有方案能直接把收缴率提上去。收缴率是结果：服务做得更好、住户看得见服务真实发生、报修投诉有人接住并办完，缴费意愿才会上来。所以我们把力气放在服务品质、设备巡检和报事报修与投诉上。详见《物业费收缴率低，有什么 AI 解决方案？》。" },
          { q: "需要替换现有的物业系统吗？", a: "不需要。FMClaw™ 通过连接器接入已有的 ERP、收费、工单、门禁、停车与钉钉、飞书、企业微信，在其上运行；解决方案从一个真实业务开始验证，再决定扩展范围。" },
        ]}
      />

      <SolEnd
        title={["带上你最想先解决的那件事，", "我们一起把它跑通"]}
        sub="降本、品质、巡检、报修投诉或集团问数，从一个真实业务开始。"
        alt={<>物业 AI 的六类应用各接手哪一段，见 <Link href="/insights/ai-applications-and-solutions-in-property-management">应用与解决方案全览</Link> · 收缴率为什么不能靠催，见 <Link href="/insights/ai-solution-for-low-property-fee-collection">收缴率 AI 解决方案</Link></>}
      />
    </SolPage>
  );
}
