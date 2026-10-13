import Link from "next/link";
import { getArticle } from "../insights/articles";

/**
 * 加速营页面 → 行业研究文章的内链模块（SEO 内链闭环：服务页把读者引向研究文章）。
 * 数据取自 articles.ts，标题/摘要/封面与文章库自动同步。
 */
export default function RelatedReading({
  slugs,
  heading = "延伸阅读",
  sub = "这些研究，把这件事讲得更透。",
  plain = false,
}: {
  slugs: string[];
  heading?: string;
  sub?: string;
  /** true：用解决方案共用模板的线条样式（加速营总页 2026-10） */
  plain?: boolean;
}) {
  const arts = slugs.map((s) => getArticle(s)).filter(Boolean);
  if (arts.length === 0) return null;
  if (plain) {
    return (
      <section className="spt-band mist">
        <div className="wrap spt-band__grid">
          <header className="spt-band__head">
            <h2 className="spt-h2">{heading}</h2>
            <p className="spt-sub">{sub}</p>
          </header>
          <div className="spt-band__body">
            <ul className="wsh-reads">
              {arts.map((a) => (
                <li key={a.slug}>
                  <Link href={`/insights/${a.slug}`}>
                    {a.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.cover} alt="" loading="lazy" />
                    ) : null}
                    <span className="spt-meta">{a.theme}</span>
                    <h3>{a.title}</h3>
                    <p>{a.desc}</p>
                    <span className="spt-note">{a.date} · {a.read}阅读</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
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
