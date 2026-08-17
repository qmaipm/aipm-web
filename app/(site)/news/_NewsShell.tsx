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

// 新闻 → 产品/方案页回链(把新闻页获得的引用权重导回产品页,与 _ArticleShell 的 TRADE_LINKS 同思路)
const PRODUCT_LINKS: Record<string, { href: string; label: string; note: string }[]> = {
  "taiwan-delegation-exchange": [
    { href: "/products/fmclaw", label: "FMClaw 物业智能体", note: "座谈里讨论的 AI 物业管理平台本体" },
    { href: "/cases", label: "客户案例", note: "国内已实际落地项目的公开数据" },
  ],
  "china-build-expo-2026": [
    { href: "/products/fmclaw", label: "AI 物业经理 FMClaw", note: "展会分享的物业智能体产品详情" },
    { href: "/solutions/cost", label: "成本控制智能体方案", note: "降本增效怎么算账、怎么落地" },
    { href: "/cases", label: "客户案例", note: "国内已实际落地项目的公开数据" },
  ],
  "beyond-expo-2026": [
    { href: "/products/fmclaw", label: "FMClaw 物业智能体", note: "展台演示的 AI 物业管理平台详情" },
    { href: "/products/robots", label: "机器人产品", note: "现场展出的机器人系列" },
  ],
  "agentic-ai-ceo-salon": [
    { href: "/products/fmclaw", label: "FMClaw 物业智能体", note: "分享会讨论的智能体产品详情" },
    { href: "/workshop", label: "FMClaw™ 加速营", note: "从认知到落地的实战路径" },
  ],
  "nvidia-startup-showcase-2025": [
    { href: "/products/fmclaw", label: "FMClaw 物业智能体", note: "获奖的现场管理智能体产品详情" },
    { href: "/products/iot", label: "IoT 数据接入平台", note: "支撑智能体的物理感知底座" },
  ],
  "admin-summit-2025": [
    { href: "/solutions/quality", label: "品质管理智能体方案", note: "峰会展示的智能品控方案详情" },
    { href: "/products/iot", label: "IoT 数据接入平台", note: "AIoT 感知与数据接入能力" },
  ],
};
const DEFAULT_PRODUCT_LINKS = [
  { href: "/products/fmclaw", label: "FMClaw 物业智能体", note: "新闻里提到的 AI 物业管理平台详情" },
  { href: "/cases", label: "客户案例", note: "国内已实际落地项目的公开数据" },
];

export default function NewsShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const n = getNews(slug);
  const more = getMoreNews(slug, 3);
  const products = PRODUCT_LINKS[slug] || DEFAULT_PRODUCT_LINKS;
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

      {/* 相关产品:新闻里提到的产品与方案的官方页面 */}
      <section className="nwd-prod">
        <div className="wrap">
          <span className="nwd-eyebrow">相关产品</span>
          <h2>新闻里提到的产品，看这里</h2>
          <div className="nwd-prod-cards">
            {products.map((p) => (
              <Link className="nwd-prod-card" href={p.href} key={p.href}>
                <h3>
                  {p.label} <Arrow s={14} />
                </h3>
                <p>{p.note}</p>
              </Link>
            ))}
          </div>
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
