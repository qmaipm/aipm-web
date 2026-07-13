import Link from "next/link";
import { getArticle } from "../insights/articles";

/**
 * 加速营页面 → 行业研究文章的内链模块(SEO 内链闭环:服务页把读者引向研究文章)。
 * 数据取自 articles.ts,标题/摘要/封面与文章库自动同步。
 */
export default function RelatedReading({
  slugs,
  heading = "延伸阅读",
  sub = "这些研究,把这件事讲得更透。",
}: {
  slugs: string[];
  heading?: string;
  sub?: string;
}) {
  const arts = slugs.map((s) => getArticle(s)).filter(Boolean);
  if (arts.length === 0) return null;
  return (
    <section className="ws-band mist">
      <div className="wrap">
        <span className="ws-eyebrow">延伸阅读</span>
        <h2 className="ws-h2">{heading}</h2>
        <p className="ws-sub">{sub}</p>
        <div className="ws-reads">
          {arts.map((a) => (
            <Link key={a.slug} className="ws-read" href={`/insights/${a.slug}`}>
              {a.cover ? (
                <span className="ws-read-thumb" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.cover} alt="" loading="lazy" />
                </span>
              ) : null}
              <span className="ws-read-body">
                <span className="ws-read-tag">{a.theme}</span>
                <span className="ws-read-title">{a.title}</span>
                <span className="ws-read-desc">{a.desc}</span>
                <span className="ws-read-meta">{a.date} · {a.read}阅读</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
