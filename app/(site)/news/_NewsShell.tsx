import Link from "next/link";
import "./article.css";
import JsonLd from "@/components/JsonLd";
import { getNews, getMoreNews } from "./articles";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

const Arrow = ({ s = 16 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function NewsShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const n = getNews(slug);
  const more = getMoreNews(slug, 3);
  const pageUrl = `${SITE_URL}/news/${n.slug}`;

  // 结构化数据:NewsArticle + 面包屑(供搜索引擎与 AI 生成引擎解析/引用)
  const newsLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
    description: n.desc,
    inLanguage: "zh-CN",
    datePublished: n.date,
    image: `${SITE_URL}${n.cover}`,
    author: { "@type": "Organization", name: "启盟科技" },
    publisher: {
      "@type": "Organization",
      name: "启盟科技",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-stalliance-clean.png` },
    },
    mainEntityOfPage: pageUrl,
    articleSection: n.category,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "新闻动态", item: `${SITE_URL}/news` },
      { "@type": "ListItem", position: 3, name: n.title, item: pageUrl },
    ],
  };

  return (
    <main className="nwd">
      <JsonLd data={[newsLd, breadcrumbLd]} />
      {/* HERO */}
      <section className="nwd-hero">
        <div className="nwd-grid" aria-hidden="true" />
        <div className="wrap nwd-hero-top">
          <div className="nwd-crumb">
            <Link href="/news">新闻动态</Link> / {n.category}
          </div>
          <span className="nwd-eyebrow">{n.category}</span>
          <h1 className="nwd-h1">{n.title}</h1>
          <div className="nwd-meta">
            启盟科技 · {n.date}
            {n.place ? <> · {n.place}</> : null}
          </div>
          <div className="nwd-coverwrap">
            <img className="nwd-cover" src={n.cover} alt={n.title} />
          </div>
        </div>
      </section>

      {/* 正文 */}
      <section className="nwd-body">
        <div className="wrap">
          <article className="prose">{children}</article>
        </div>
      </section>

      {/* 更多动态 */}
      <section className="nwd-rec">
        <div className="wrap">
          <span className="nwd-eyebrow">更多动态</span>
          <h2>接着看这几条</h2>
          <div className="nwd-cards">
            {more.map((m) => (
              <Link className="nwd-card" href={`/news/${m.slug}`} key={m.slug}>
                <span className="k" aria-hidden="true" />
                <div className="tag">{m.category}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="date">{m.date}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 文末 CTA */}
      <section className="nwd-cta">
        <div className="wrap">
          <h2>想看这些东西在你现场跑起来?</h2>
          <p>新闻里的每一个数字,都欢迎你带着真实业务来现场验证。</p>
          <div className="cta-row">
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>
              预约 FMClaw™ 加速营 <Arrow />
            </Link>
            <span className="nwd-cta-alt">
              或直接<Link href="/contact">联系我们</Link>聊聊你的场景
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
