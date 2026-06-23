import JsonLd from "./JsonLd";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

type QA = { q: string; a: string };

// 通用 FAQ 区块:页面可见 Q&A + FAQPage(+ 可选 Service)结构化数据。
// 用独立类名(seo-faq__*),不依赖各页 CSS scope,可放进任意页面(建议置于文末 CTA 之前)。
export default function SeoFaq({
  heading = "常见问题",
  items,
  serviceName,
  serviceDesc,
}: {
  heading?: string;
  items: QA[];
  serviceName?: string;
  serviceDesc?: string;
}) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const blocks: object[] = [faqLd];
  if (serviceName) {
    blocks.unshift({
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      serviceType: serviceName,
      ...(serviceDesc ? { description: serviceDesc } : {}),
      areaServed: "CN",
      provider: { "@type": "Organization", name: "启盟科技", url: SITE_URL },
    });
  }

  return (
    <section className="seo-faq">
      <JsonLd data={blocks.length === 1 ? blocks[0] : blocks} />
      <div className="seo-faq__wrap reveal">
        <span className="seo-faq__eyebrow">FAQ</span>
        <h2 className="seo-faq__h">{heading}</h2>
        <dl className="seo-faq__list">
          {items.map((f) => (
            <div className="seo-faq__item" key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
