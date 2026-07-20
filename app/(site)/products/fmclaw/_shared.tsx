import type { ReactNode } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

/* ============================================================
   FMClaw 产品专栏共享组件:面包屑、FAQ、相关链接、页脚返回。
   四个核心能力页 + 总览页共用,保证结构与结构化数据一致。
   ============================================================ */

export type Crumb = { name: string; href: string };

/** 可见面包屑 + BreadcrumbList JSON-LD(item 为绝对地址) */
export function FmBreadcrumb({ trail, onDark }: { trail: Crumb[]; onDark?: boolean }) {
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
      <nav className={`fmc-crumb${onDark ? " on-dark" : ""}`} aria-label="面包屑">
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

/** 内联箭头(链接卡/CTA 通用) */
export const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* 链接卡图标(1.5-stroke,与站内插画语言一致) */
const ic = (d: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
export const IC = {
  doc: ic(<><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4" /><path d="M10 12h6M10 16h6" /></>),
  reconcile: ic(<><rect x="3" y="5" width="8" height="14" rx="2" /><rect x="13" y="5" width="8" height="14" rx="2" /><path d="M5.3 12.2l1.4 1.4 2.4-2.9" /><path d="M15.3 12.2l1.4 1.4 2.4-2.9" /></>),
  vendor: ic(<><path d="M4 21V5a2 2 0 0 1 2-2h7v18" /><path d="M13 9h5a2 2 0 0 1 2 2v10" /><path d="M4 21h17" /><path d="M7.5 7h2M7.5 11h2M7.5 15h2M16.5 13h1M16.5 17h1" /></>),
  folder: ic(<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 13.5l2 2 4-4" /></>),
  shield: ic(<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 11.5l2 2 4-4" /></>),
  flow: ic(<><rect x="3" y="4" width="6" height="5" rx="1.5" /><rect x="15" y="4" width="6" height="5" rx="1.5" /><rect x="9" y="15" width="6" height="5" rx="1.5" /><path d="M6 9v3h12V9M12 12v3" /></>),
  grid: ic(<><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>),
  layers: ic(<><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13.5l9 5 9-5" /></>),
  chart: ic(<><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 16v-5M12 16V8M16 16v-8" /></>),
  chat: ic(<><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8M8 12h5" /></>),
};

export type LinkCardItem = { href: string; lab: string; t: string; d: string; icon: ReactNode };

/** 链接卡组(替代纯文字链接行,总览/能力页共用) */
export function LinkCards({ items }: { items: LinkCardItem[] }) {
  return (
    <div className={`fmo-linkcards${items.length === 1 ? " one" : items.length === 2 ? " two" : ""}`}>
      {items.map((it) => (
        <Link className="fmo-linkcard" key={it.href + it.t} href={it.href}>
          <span className="fmo-lc-icon" aria-hidden="true">{it.icon}</span>
          <span className="fmo-lc-body">
            <span className="fmo-lc-lab">{it.lab}</span>
            <b>{it.t}</b>
            <span className="fmo-lc-d">{it.d}</span>
          </span>
          <span className="fmo-lc-arrow" aria-hidden="true"><Arrow s={13} /></span>
        </Link>
      ))}
    </div>
  );
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
