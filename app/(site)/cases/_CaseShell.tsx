// app/(site)/cases/_CaseShell.tsx
import Link from "next/link";
import "./article.css";
import JsonLd from "@/components/JsonLd";
import { getCase, getRelated } from "./cases";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function CaseWins({ items }: { items: string[] }) {
  return (
    <div className="cf-wins">
      {items.map((t) => <div className="cf-win" key={t}>{t}</div>)}
    </div>
  );
}

/* 可扫读要点:每条一句话,首段加粗为「要点」,其后为一句补充说明(可选) */
export function CasePoints({ items }: { items: { k: string; d?: string }[] }) {
  return (
    <ul className="cf-points">
      {items.map((it) => (
        <li className="cf-point" key={it.k}>
          <span className="cf-point-k">{it.k}</span>
          {it.d ? <span className="cf-point-d">{it.d}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/* 实现流程:真实有序的管道,用编号站点表达"一条报事走完的每一步" */
export function CaseFlow({ steps }: { steps: { k: string; d: string }[] }) {
  return (
    <ol className="cf-flow">
      {steps.map((s, i) => (
        <li className="cf-step" key={s.k}>
          <div className="cf-step-n" aria-hidden="true"><span>{String(i + 1).padStart(2, "0")}</span></div>
          <div className="cf-step-k">{s.k}</div>
          <p className="cf-step-d">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function CaseSection({ eyebrow, title, mist, children }: { eyebrow?: string; title: string; mist?: boolean; children: React.ReactNode }) {
  return (
    <section className={`cf-band${mist ? " mist" : ""}`}>
      <div className="wrap cf-sec">
        <div className="cf-sec-head">
          {eyebrow ? <span className="cf-eyebrow">{eyebrow}</span> : null}
          <h2 className="cf-h2">{title}</h2>
        </div>
        <div className="cf-sec-body">{children}</div>
      </div>
    </section>
  );
}

export function CaseQuote({ children, by }: { children: React.ReactNode; by: string }) {
  return (
    <section className="cf-core">
      <div className="cf-grid dark" aria-hidden="true" />
      <div className="wrap">
        <span className="cf-eyebrow on-dark">客户原声</span>
        <p className="cf-voice">{children}</p>
        <div className="cf-voice-by">— {by}</div>
      </div>
    </section>
  );
}

// 案例 → AI 物业服务工种页回链(内链导流:案例页把读者引向对应服务页)
const TRADE_LINKS: Record<string, { href: string; label: string }[]> = {
  "south-china-mixed-use-6-to-1": [
    { href: "/ai-service/facility", label: "AI 设施设备服务" },
    { href: "/cobuild", label: "政企共建人工智能产业" },
  ],
  "30w-park-ai-property-manager-robot": [
    { href: "/ai-service/cleaning", label: "AI 清洁服务" },
    { href: "/cobuild", label: "政企共建人工智能产业" },
  ],
  "property-group-chat-ai-service": [
    { href: "/ai-service/customer-service", label: "AI 客服管家" },
    { href: "/products/fmclaw/connectors", label: "第三方平台连接器" },
  ],
  "property-group-auto-operation-report": [
    { href: "/products/fmclaw/ontology", label: "FM 数据本体" },
    { href: "/products/fmclaw/connectors", label: "第三方平台连接器" },
  ],
  "coworking-supplier-reconciliation": [{ href: "/ai-service/cleaning", label: "AI 清洁服务" }],
  "restroom-quality": [{ href: "/ai-service/cleaning", label: "AI 清洁服务" }],
  "fmclaw-equipment-inspection": [{ href: "/ai-service/facility", label: "AI 设施设备服务" }],
  "intl-hospital-medical-grade-fm": [
    { href: "/ai-service/facility", label: "AI 设施设备服务" },
    { href: "/ai-service/cleaning", label: "AI 清洁服务" },
  ],
  "metro-3400-rooms-daily-inspection": [{ href: "/ai-service/facility", label: "AI 设施设备服务" }],
  "hazardous-area-dual-person-patrol": [{ href: "/ai-service/security", label: "AI 安保服务" }],
  "gigafactory-4-vendor-cleaning": [{ href: "/ai-service/cleaning", label: "AI 清洁服务" }],
};

export default function CaseShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const c = getCase(slug);
  const related = getRelated(slug, 3);
  const trades = TRADE_LINKS[slug] || [];
  const pageUrl = `${SITE_URL}/cases/${c.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.seoTitle,
    description: c.metaDescription,
    inLanguage: "zh-CN",
    author: { "@type": "Organization", name: "启盟科技" },
    publisher: {
      "@type": "Organization",
      name: "广州启盟信息科技有限公司",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-stalliance-clean.png` },
    },
    mainEntityOfPage: pageUrl,
    articleSection: c.industry,
    datePublished: c.datePublished,
    dateModified: c.dateModified,
  };
  const faqLd = c.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main className="casefx">
      <JsonLd data={faqLd ? [articleLd, faqLd] : articleLd} />

      {/* HERO */}
      <section className="cf-hero">
        <div className="cf-grid" aria-hidden="true" />
        <div className="wrap cf-hero-top">
          <span className="cf-crumb">
            <Link href="/cases">客户案例</Link><i>/</i>{c.theme}
          </span>
          <div className="cf-montag">{c.industry} · {c.scale} · {c.location}</div>
          <h1 className="cf-h1">{c.title}</h1>
          <p className="cf-lead">{c.summary ?? c.lead}</p>
          <div className="cf-metrics">
            {c.metrics.map((m) => (
              <div className="cf-metric" key={m.label}>
                <b>{m.value}</b><span>{m.label}</span>
              </div>
            ))}
          </div>
          <div className="cf-montag" style={{ marginTop: 28 }}>采用产品：{c.product}</div>
          <div className="cf-montag" style={{ marginTop: 10 }}>发布于 {c.datePublished} · 更新于 {c.dateModified}</div>
        </div>
      </section>

      {children}

      {/* FAQ */}
      {c.faq?.length ? (
        <section className="cf-band mist">
          <div className="wrap cf-sec">
            <div className="cf-sec-head">
              <span className="cf-eyebrow">常见问题</span>
              <h2 className="cf-h2">关于这个案例，常被问到的</h2>
            </div>
            <div className="cf-faq-list cf-sec-body">
              {c.faq.map((f) => (
                <details className="cf-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p className="cf-faq-a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 相关案例 */}
      <section className="cf-band">
        <div className="wrap">
          <span className="cf-eyebrow">相关案例</span>
          <h2 className="cf-h2">再看几个在运行的项目</h2>
          <div className="cf-related">
            {related.map((r) => (
              <Link className="cf-rcard" href={`/cases/${r.slug}`} key={r.slug}>
                <div className="rmeta">{r.industry} · {r.scale} · {r.location}</div>
                <h3>{r.title}</h3>
                <p>{r.lead}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带你的难题来，<br />带一个 Agent 走</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            {trades.length > 0 && (
              <span className="alt">
                或看对应的服务:
                {trades.map((t, i) => (
                  <span key={t.href}>
                    {i > 0 && " · "}
                    <Link href={t.href}>{t.label}</Link>
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
