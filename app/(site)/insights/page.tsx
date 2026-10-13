import Link from "next/link";
import "./page.css";
import PostList from "./_PostList";
import { ARTICLES, THEMES } from "./articles";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/insights", {
  title: "行业研究 · 物业与 FM 行业观察 | 启盟科技",
  description:
    "启盟科技对物业与设施管理（FM）行业的长期研究，按六个主题整理：AI 物业产品选型、场景方案（收缴率、巡检、投诉、降本）、AI 落地方法、物业委托管理、行业观察与 OBC 成果导向合同。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  // 最新发布：自动取最新发布日期的一批文章作为头条
  // 「最新」按发布或实质更新日期取（重写过的文章与新文章一起进首屏）；同一天时先发布的在前（核心清单页做头条）
  const fresh = (a: (typeof ARTICLES)[number]) => a.updated || a.date;
  const sorted = [...ARTICLES].sort((a, b) => fresh(b).localeCompare(fresh(a)) || a.date.localeCompare(b.date));
  const latestDate = fresh(sorted[0]);
  const latest = sorted.filter((a) => fresh(a) === latestDate);
  const [featured, ...more] = latest;

  return (
    <main className="solis">
      {/* HERO */}
      <section className="is-hero">
        <div className="is-grid" aria-hidden="true" />
        <div className="wrap is-hero-top">
          <span className="is-kicker">
            行业研究<i>/</i>Property × AI Research
          </span>
          <h1 className="is-h1">
            物业与 AI 怎么真正结合，<span className="grad">我们研究得透一点</span>
          </h1>
          <p className="is-lead">
            <b>AI 怎么落地</b>、<b>物业行业会变成什么样</b>、<b>商业模式怎么算账</b>：这里是启盟科技把 <b>AI</b> 用进<b>物业与设施管理（FM）</b>的长期研究，不止于趋势判断，更要把每一件事在现场跑通。
          </p>
          <div className="is-proof">
            {THEMES.map((t, i) => (
              <span key={t} style={{ display: "contents" }}>
                {i > 0 && <span className="sep" />}
                <a href={`?topic=${encodeURIComponent(t)}#all`}><b>{t}</b></a>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 最新发布 */}
      <section className="is-band" id="featured">
        <div className="wrap">
          <span className="is-eyebrow">最新发布</span>
          <h2 className="is-h2">这几篇，值得你先读</h2>
          <p className="is-sub">最新的研究都会放在这里 · 发布于 {latestDate}。</p>

          <Link className="is-featured" href={`/insights/${featured.slug}`}>
            <div className="is-cover" aria-hidden="true">
              {featured.cover ? <img className="is-cover-img" src={featured.cover} alt="" /> : <div className="is-cover-mesh" />}
              <span className="is-ftag">{featured.theme}</span>
            </div>
            <div className="is-fbody">
              <div className="is-ftag-tx">最新发布 · {featured.theme}</div>
              <h3>{featured.title}</h3>
              <p>{featured.desc}</p>
              <div className="is-fmeta">{featured.by} <span className="dot" aria-hidden>·</span> {featured.date} <span className="dot" aria-hidden>·</span> {featured.read}阅读 <Arrow s={14} /></div>
            </div>
          </Link>

          {more.length > 0 && (
            <div className="is-fmore">
              {more.map((a) => (
                <Link key={a.slug} className="is-fmore-item" href={`/insights/${a.slug}`}>
                  {a.cover ? (
                    <span className="is-fmore-thumb" aria-hidden="true"><img src={a.cover} alt="" loading="lazy" /></span>
                  ) : null}
                  <span className="is-fmore-body">
                    <span className="is-fmore-tag">最新发布 · {a.theme}</span>
                    <span className="is-fmore-title">{a.title}</span>
                    <span className="is-fmore-desc">{a.desc}</span>
                    <span className="is-fmore-meta">{a.by} · {a.date} · {a.read}阅读 <Arrow s={13} /></span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 文章列表（标签可筛选） */}
      <section className="is-band mist" id="all">
        <div className="wrap">
          <span className="is-eyebrow">全部文章</span>
          <PostList />
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你正在做的难题，<br />写成下一篇研究的开头</h2>
          <p className="reveal">如果你也在认真做这件事，我们想听听。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
