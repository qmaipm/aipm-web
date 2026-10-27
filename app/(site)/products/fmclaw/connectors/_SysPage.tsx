// 工具箱 · 系统子页共用模板（2026-10-27）。5 个子页同一结构，改一处全部生效：
// 首屏 → 是什么（可整段引用）→ 常见问题 → 常用功能 → AI 多做的 → 对照 → 联动 → 界面/案例 → 怎么开通 → FAQ → 其他系统。
// 文案原则：用客户的叫法；只写已有能力；外部数据注明来源；数字只用 SEO-GEO-STRATEGY §4a 白名单。
import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { FmFoot } from "../_brain";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCompare, SolSteps, SolCols, SolTable, SolFigure, SolCases, SolMore, SolEnd,
} from "../../../solutions/_tpl/Sol";
import { HUB, SYSTEMS, sysHref, type SysSlug } from "./_systems";
import "./sys.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

type QA = { q: string; a: string };

export type SysProps = {
  slug: SysSlug;
  hero: { title: string[]; lead: ReactNode; proof: string[] };
  define: ReactNode;
  pains: { rows: ReactNode[][]; note?: ReactNode };
  base: string[];
  ai: { title: string; body: ReactNode }[];
  aiImg: { src: string; alt: string };
  /** AI 板块之后的补充内容（如停车日报样表、门禁适用场景） */
  extra?: { title: string; sub?: ReactNode; body: ReactNode };
  compare: { k: string; before: ReactNode; after: ReactNode }[];
  links: { title: string; body: ReactNode; href?: string; linkText?: string }[];
  ui?: { src: string; alt: string; caption: string; w: number; h: number };
  cases?: { scene: string; result: ReactNode; href: string }[];
  faq: QA[];
  /** 延伸阅读：对应的研究文章 */
  reads?: { href: string; title: string }[];
  serviceDesc: string;
  updated: string;
};

export function SysPage(p: SysProps) {
  const sys = SYSTEMS.find((s) => s.slug === p.slug)!;
  const path = sysHref(p.slug);
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "AI 物业经理 FMClaw™", item: `${SITE_URL}/products/fmclaw` },
      { "@type": "ListItem", position: 3, name: "工具箱 · AI 物业管理系统", item: `${SITE_URL}${HUB}` },
      { "@type": "ListItem", position: 4, name: sys.full, item: `${SITE_URL}${path}` },
    ],
  };
  const others = SYSTEMS.filter((s) => s.slug !== p.slug);

  return (
    <SolPage>
      <JsonLd data={breadcrumbLd} />

      <SolHero
        crumbRoot={{ href: HUB, label: "工具箱 · AI 物业管理系统" }}
        crumb={sys.name}
        title={p.hero.title}
        lead={p.hero.lead}
        cta={{ href: `/contact?intent=demo&from=${path}`, label: "预约演示" }}
        secondary={{ href: "#ai", label: "看 AI 多做了什么" }}
        proof={p.hero.proof}
        image={{ src: sys.img, alt: sys.alt }}
      />

      <SolDefine term={`${sys.full}是什么`}>{p.define}</SolDefine>

      <SolSection title="用传统系统，常遇到这些问题" tone="mist">
        <SolTable head={["问题", "具体表现"]} rows={p.pains.rows} />
        {p.pains.note && <p className="spt-note">{p.pains.note}</p>}
      </SolSection>

      <SolSection title="常用功能，都有" sub="同类系统常见的功能，这里都有，不用另买一套。">
        <ul className="sys-base">{p.base.map((x) => <li key={x}>{x}</li>)}</ul>
      </SolSection>

      <SolSection id="ai" title="加了 AI，多出来这几件事" tone="mist" split img={p.aiImg}>
        <SolSteps items={p.ai} />
      </SolSection>

      {p.extra && (
        <SolSection title={p.extra.title} sub={p.extra.sub}>
          {p.extra.body}
        </SolSection>
      )}

      <SolSection title="和传统做法比" tone={p.extra ? "mist" : undefined}>
        <SolCompare labels={["传统做法", "AI 物业管理系统"]} rows={p.compare} />
      </SolSection>

      <SolSection title="和其他系统连在一起" tone={p.extra ? undefined : "mist"}
        sub="几个系统用的是同一套数据，所以一件事能从头办到尾，不用人在系统之间来回抄。">
        <SolCols items={p.links} />
      </SolSection>

      {p.ui && (
        <SolSection title="真实界面">
          <SolFigure src={p.ui.src} alt={p.ui.alt} caption={p.ui.caption} ui w={p.ui.w} h={p.ui.h} />
        </SolSection>
      )}

      {p.cases && p.cases.length > 0 && (
        <SolSection title="在用的项目" tone="mist">
          <SolCases items={p.cases} />
        </SolSection>
      )}

      <SolSection title="已有系统怎么办，怎么开通">
        <SolCols items={[
          { title: "已有系统，原样接进来", body: "在用的系统和设备不用换，数据接进 FMClaw™，结果写回原系统；缺什么功能再补什么。" },
          { title: "从一个系统开始", body: "按模块开通，先开最急需的这一个，跑出效果再加别的，不用一次买齐。" },
          { title: "价格", body: <>个人版免费开始，项目团队版 19,800 元起。上线服务、数据接入和硬件按项目报价，详见 <Link href="/pricing">价格</Link>。</> },
        ]} />
      </SolSection>

      <SeoFaq
        heading={`关于${sys.full}，常被问到的问题`}
        serviceName={sys.full}
        serviceDesc={p.serviceDesc}
        items={p.faq}
      />

      <SolSection title="工具箱里的其他系统" tone="mist">
        <nav className="spt-groups sys-nav" aria-label="工具箱里的其他系统">
          <ol>
            <li><Link href={HUB}><span className="no">总览</span><span className="n">AI 物业管理系统</span><span className="t">全部系统与模块</span></Link></li>
            {others.map((s) => (
              <li key={s.slug}><Link href={sysHref(s.slug)}><span className="no">系统</span><span className="n">{s.name}</span><span className="t">{s.line}</span></Link></li>
            ))}
          </ol>
        </nav>
        {p.reads && p.reads.length > 0 && (
          <ul className="sys-reads" aria-label="延伸阅读">
            {p.reads.map((r) => <li key={r.href}><Link href={r.href}><small>延伸阅读</small>{r.title}</Link></li>)}
          </ul>
        )}
        <SolMore>系统之外，AI 如何把一个项目的日常管理接下来，见 <Link href="/products/fmclaw">AI 物业经理 FMClaw™</Link> 与 <Link href="/solutions">解决方案</Link>。</SolMore>
      </SolSection>

      <FmFoot updated={p.updated} />

      <SolEnd
        title={["先开这一个系统，", "用你的数据跑一遍"]}
        sub="不换现有系统，先看 AI 在你的项目上能多做什么。"
        cta={{ href: `/contact?intent=demo&from=${path}`, label: "预约演示" }}
        alt={<>继续了解：<Link href={HUB}>AI 物业管理系统总览</Link> · <Link href="/pricing">价格</Link> · <Link href="/cases">客户案例</Link></>}
      />
    </SolPage>
  );
}
