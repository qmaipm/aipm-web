import Link from "next/link";
import "./article.css";
import { getArticle, getRecommended } from "./articles";

const Arrow = ({ s = 16 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* 转载配图:单图 */
export function Figure({
  src,
  alt,
  caption,
  portrait,
}: {
  src: string;
  alt: string;
  caption?: string;
  portrait?: boolean;
}) {
  return (
    <figure className={`fig${portrait ? " portrait" : ""}`}>
      <img src={src} alt={alt} loading="lazy" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/* 转载配图:多图一排(c2 / c3 / c4) */
export function FigRow({
  cols = 2,
  items,
}: {
  cols?: 2 | 3 | 4;
  items: { src: string; alt: string; caption?: string }[];
}) {
  return (
    <div className={`figrow c${cols}`}>
      {items.map((it) => (
        <figure className="fig" key={it.src}>
          <img src={it.src} alt={it.alt} loading="lazy" />
          {it.caption ? <figcaption>{it.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export default function ArticleShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const a = getArticle(slug);
  const recs = getRecommended(slug, 3);

  return (
    <main className="isd">
      {/* HERO */}
      <section className="isd-hero">
        <div className="isd-grid" aria-hidden="true" />
        <div className="wrap isd-hero-top">
          <div className="isd-crumb reveal">
            <Link href="/insights">行业研究</Link> / {a.theme}
          </div>
          <span className="isd-eyebrow reveal">{a.theme}</span>
          <h1 className="isd-h1 reveal">{a.title}</h1>
          <div className="isd-meta reveal">
            {a.by} · {a.date} · {a.read}阅读
          </div>
        </div>
      </section>

      {/* 正文 */}
      <section className="isd-body">
        <div className="wrap">
          <article className="prose reveal">
            <div className="isd-conclusion">
              <span className="k">结论</span>
              <p>{a.desc}</p>
            </div>
            {children}
          </article>
        </div>
      </section>

      {/* 推荐阅读 */}
      <section className="isd-rec">
        <div className="wrap">
          <span className="isd-eyebrow reveal">推荐阅读</span>
          <h2 className="reveal">接着读这几篇</h2>
          <div className="isd-cards">
            {recs.map((r) => (
              <Link className="isd-card reveal" href={`/insights/${r.slug}`} key={r.slug}>
                <span className="k" aria-hidden="true" />
                <div className="tag">{r.theme}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 文末 CTA */}
      <section className="isd-cta">
        <div className="wrap">
          <h2 className="reveal">研究是为了把一件事真正做成</h2>
          <p className="reveal">读完了,也欢迎带着你的真实场景,来现场跑通第一件事。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16.5px" }}>
              预约 FMClaw™ 加速营 <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
