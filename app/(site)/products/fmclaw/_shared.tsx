import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

/* ============================================================
   FMClaw 产品专栏共享组件:面包屑、FAQ、相关链接、页脚返回。
   四个核心能力页 + 总览页共用,保证结构与结构化数据一致。
   ============================================================ */

export type Crumb = { name: string; href: string };

/** 可见面包屑 + BreadcrumbList JSON-LD(item 为绝对地址) */
export function FmBreadcrumb({ trail }: { trail: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
      ...trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${SITE_URL}${c.href}`,
      })),
    ],
  };
  return (
    <>
      <JsonLd data={ld} />
      <nav className="fmc-crumb" aria-label="面包屑">
        <Link href="/products/fmclaw">产品</Link>
        {trail.slice(1).map((c) => (
          <span key={c.href}>
            <span className="fmc-crumb-sep" aria-hidden="true">/</span>
            <Link href={c.href}>{c.name}</Link>
          </span>
        ))}
      </nav>
    </>
  );
}

export type QA = { q: string; a: string };

/** 页面可见 FAQ + FAQPage JSON-LD(与可见内容完全一致) */
export function FmFaq({ items, heading = "常见问题" }: { items: QA[]; heading?: string }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="fmc-faq">
      <JsonLd data={ld} />
      <div className="wrap">
        <h2>{heading}</h2>
        <div className="fmc-faq-list">
          {items.map((f) => (
            <details key={f.q} className="fmc-faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export type RelLink = { label: string; href: string };

/** 相关链接 + 返回总览 + 最后更新时间(GEO 要求) */
export function FmRelated({ links, updated }: { links: RelLink[]; updated: string }) {
  return (
    <section className="fmc-rel">
      <div className="wrap">
        <h2>相关链接</h2>
        <ul className="fmc-rel-list">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label} <span aria-hidden="true">→</span></Link>
            </li>
          ))}
        </ul>
        <p className="fmc-rel-back">
          <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
        </p>
        <p className="fmc-updated">最后更新:{updated}</p>
      </div>
    </section>
  );
}

/** 能力页 TechArticle JSON-LD */
export function techArticleLd(opts: { path: string; headline: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    inLanguage: "zh-CN",
    isPartOf: { "@type": "WebPage", url: `${SITE_URL}/products/fmclaw`, name: "FMClaw™ 产品总览" },
    author: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
    publisher: { "@type": "Organization", name: "广州启盟科技有限公司", url: SITE_URL },
  };
}

/** 总览页 SoftwareApplication JSON-LD(字段按规格,不加虚构评分/价格) */
export const FMCLAW_APP_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FMClaw™",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/products/fmclaw`,
  description:
    "FMClaw™ 是面向物业与设施管理的生产级 AI 智能体平台。它以行业数据本体为底座,把企业数据、行业指标、业务工作流、系统工具和组织权限统一起来,让 AI 能够进入核心业务,并在多个项目中稳定、准确、可追溯地完成工作。",
  provider: { "@type": "Organization", name: "广州启盟科技有限公司", url: SITE_URL },
};
