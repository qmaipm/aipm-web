import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TrackedLink from "@/components/TrackedLink";
import { pageMetadata } from "@/lib/pageMetadata";
import { FMCLAW_URL } from "@/lib/nav";
import { FmFaq } from "../products/fmclaw/_shared";
import { SolPage, Arrow } from "../solutions/_tpl/Sol";
import "./pricing.css";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

/* 价格页（2026-10 改版）：只放四张方案卡 + 计费说明 + 联系销售。
   公开：个人免费版、个人专业版 2,980、项目团队版 19,800 起；集团版与企业专属版统一「联系销售」。
   Credit 包、上线服务、接入服务、人天单价、硬件单价不在页面公开，按项目报价。 */
export const metadata: Metadata = pageMetadata("/pricing", {
  title: "价格｜AI 物业经理 FMClaw™：个人免费，项目团队版 19,800 元起",
  description:
    "AI 物业经理 FMClaw™ 价格：个人免费版每月 2,000 Credit；个人专业版 2,980 元；项目团队版 19,800 元起；集团版与企业专属版请联系销售。按项目与账号容量启用，按 Credit 实际用量付费，报告接收人不计账号。",
});

type Plan = {
  name: string;
  for: string;
  price: string;
  unit: string;
  note: string;
  lead?: string;
  items: string[];
  cta: { href: string; label: string; action: string };
  key?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "个人免费版",
    for: "个人试用与探索",
    price: "免费",
    unit: "",
    note: "每月 2,000 Credit，按月重置",
    items: ["1 人 · 1 个个人项目", "最多 3 条活跃工作流", "标准 Agent，手动触发为主", "Excel、PDF、图片手动上传"],
    cta: { href: FMCLAW_URL, label: "免费开始", action: "start-free" },
  },
  {
    name: "个人专业版",
    for: "个人深度使用",
    price: "2,980",
    unit: "元 / 人 · 一次性启用",
    note: "含 30,000 Credit，12 个月有效",
    lead: "包含免费版全部功能，另有：",
    items: ["最多 3 个个人项目", "最多 20 条活跃工作流", "定时任务与完整工作流编辑器", "高级模型与行业工作流"],
    cta: { href: FMCLAW_URL, label: "开始使用", action: "start-free" },
  },
  {
    name: "项目团队版",
    for: "一个或几个项目的团队",
    price: "19,800",
    unit: "元起 · 一次性启用",
    note: "按项目与账号容量启用",
    lead: "面向企业正式使用：",
    items: ["企业组织工作空间，数据归企业", "共享数据集市、Skill 与工作流", "自动定时与事件触发、业务系统写回", "工具调用审批、项目级权限、90 天审计"],
    cta: { href: "/contact?intent=demo&from=pricing", label: "预约演示", action: "book-demo" },
    key: true,
  },
  {
    name: "集团版 · 企业专属版",
    for: "多项目统一管理 / 专属部署",
    price: "联系销售",
    unit: "",
    note: "按集团规模与部署方式报价",
    lead: "包含团队版全部功能，另有：",
    items: ["总部—区域—项目三级组织", "跨项目数据汇总与集团模板下发", "SSO、集团级审计与运行监控", "专属实例、VPC 或私有化部署"],
    cta: { href: "/contact?intent=quote&from=pricing-group", label: "联系销售", action: "get-quote" },
  },
];

const INCLUDED = [
  { k: "看报告的人不计账号", v: "只通过邮件、钉钉、企业微信、飞书接收报告的人，不占账号。" },
  { k: "执行前预估，执行后可查", v: "每次运行先展示预计 Credit 消耗，实际消耗都有记录。" },
  { k: "平台故障不扣费", v: "因平台故障失败的任务不扣费，自动重试不重复收费。" },
  { k: "可自助上线", v: "用标准连接器自行配置，不收上线服务费；需要人帮再选上线服务。" },
];

const FAQ = [
  {
    q: "FMClaw 是按年订阅吗？",
    a: "个人专业版、项目团队版和集团版都是一次性启用费，不收软件订阅费；之后按 Credit 实际用量付费。企业专属版按年收取软件 License 及维护费。",
  },
  {
    q: "什么算一个操作账号？只看报告的人要付费吗？",
    a: "登录并使用问答、工作流、Skill、配置或管理功能的人计为操作账号。只通过邮件、钉钉、企业微信、飞书接收报告，或只查看导出报告的人，不计入账号。同一个人在同一企业内加入多个项目，只算一个账号。",
  },
  {
    q: "Credit 是什么？会不会被多扣？",
    a: "Credit 用于结算模型推理、数据处理、Skill 运行、工具调用和图片分析等 AI 任务。执行前系统展示预计消耗范围，执行后可以查看实际消耗记录；因平台故障失败的任务不扣费，自动重试不会对同一成功结果重复收费。额外购买的 Credit 有效期 12 个月。",
  },
  {
    q: "用自己的大模型账号，还要付 Credit 吗？",
    a: "使用客户自有模型账号、API Key 或本地模型时，模型 Token 费用由客户自行承担，FMClaw 不重复收取；工作流执行、工具调用、文件解析、报告生成等平台服务仍消耗 Credit。",
  },
  {
    q: "上线服务、数据接入和 IoT 硬件怎么收费？",
    a: "可以自助配置和上线，不收上线服务费。需要启盟科技做流程梳理、数据源配置、工作流搭建、培训和验收，或者需要业务系统接入、IoT 硬件时，按项目范围报价，请联系销售。",
  },
  {
    q: "项目多了怎么办？",
    a: "超过 3 个生产项目或 25 个操作账号，或者需要总部—区域—项目多级管理、跨项目汇总，建议使用集团版，之后按容量扩展，不重复收取集团启用费。具体容量组合请联系销售报价。",
  },
];

const PRICE_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI 物业经理 FMClaw™",
  brand: { "@type": "Brand", name: "FMClaw" },
  description: "面向物业与设施管理的生产级 AI 智能体平台。按项目与账号容量启用，按 Credit 实际用量付费。",
  url: `${SITE_URL}/pricing`,
  offers: [
    { "@type": "Offer", name: "个人免费版", price: "0", priceCurrency: "CNY", url: `${SITE_URL}/pricing` },
    { "@type": "Offer", name: "个人专业版", price: "2980", priceCurrency: "CNY", url: `${SITE_URL}/pricing` },
    {
      "@type": "Offer", name: "项目团队版", priceCurrency: "CNY", url: `${SITE_URL}/pricing`,
      priceSpecification: { "@type": "PriceSpecification", minPrice: "19800", priceCurrency: "CNY" },
    },
  ],
};

const CRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI 物业经理 FMClaw™", item: `${SITE_URL}/products/fmclaw` },
    { "@type": "ListItem", position: 3, name: "价格", item: `${SITE_URL}/pricing` },
  ],
};

export default function Page() {
  return (
    <SolPage>
      <div className="prc">
        <JsonLd data={[PRICE_LD, CRUMB_LD]} />

        <section className="prc-hero">
          <div className="wrap">
            <h1 className="prc-h1">价格</h1>
            <p className="prc-lead">个人免费开始。团队按项目与账号容量一次性启用，之后只为 AI 实际干的活付 Credit。</p>
          </div>
        </section>

        <section className="prc-plans-band" aria-label="版本与价格">
          <div className="wrap">
            <ul className="prc-cards">
              {PLANS.map((p) => (
                <li key={p.name} className={p.key ? "prc-card is-key" : "prc-card"}>
                  <div className="prc-card__top">
                    <h2>{p.name}</h2>
                    {p.key && <span className="prc-badge">推荐</span>}
                  </div>
                  <p className="prc-for">{p.for}</p>
                  <p className={p.unit ? "prc-price" : "prc-price is-word"}>
                    <b>{p.price}</b>
                    {p.unit && <span>{p.unit}</span>}
                  </p>
                  <p className="prc-note">{p.note}</p>
                  <TrackedLink
                    href={p.cta.href}
                    action={p.cta.action}
                    label="pricing-plans"
                    className={p.key ? "prc-btn is-solid" : "prc-btn"}
                  >
                    {p.cta.label}
                  </TrackedLink>
                  {p.lead && <p className="prc-inc">{p.lead}</p>}
                  <ul className="prc-checks">
                    {p.items.map((x) => (
                      <li key={x}>
                        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="prc-tax">所有价格均为人民币含税参考价。个人版适合试用与个人探索，不作为企业正式生产系统。</p>
          </div>
        </section>

        <section className="prc-incl" aria-labelledby="prc-incl-h">
          <div className="wrap">
            <h2 id="prc-incl-h" className="prc-h2">所有方案都这样计费</h2>
            <ul className="prc-incl__list">
              {INCLUDED.map((x) => (
                <li key={x.k}><h3>{x.k}</h3><p>{x.v}</p></li>
              ))}
            </ul>
            <div className="prc-svc">
              <p><b>上线服务、数据接入与 IoT 硬件</b>按项目范围报价。</p>
              <TrackedLink href="/contact?intent=quote&from=pricing-services" action="get-quote" label="pricing-services" className="prc-textlink">
                联系销售 <Arrow s={14} />
              </TrackedLink>
            </div>
          </div>
        </section>

        <FmFaq items={FAQ} heading="价格常见问题" />

        <section className="prc-end">
          <div className="wrap">
            <h2>不确定选哪一档？</h2>
            <p>告诉我们项目数、使用人数和想先跑的那条工作流，我们帮你算一笔账。</p>
            <div className="prc-end__btns">
              <TrackedLink href="/contact?intent=quote&from=pricing" action="get-quote" label="pricing-end" className="btn btn-primary">联系销售 <Arrow s={16} /></TrackedLink>
              <TrackedLink href={FMCLAW_URL} action="start-free" label="pricing-end" className="btn btn-ghost">免费试用</TrackedLink>
            </div>
            <p className="prc-upd">价格版本：2026-10 · 以订单与合同约定为准</p>
          </div>
        </section>
      </div>
    </SolPage>
  );
}
