import Link from "next/link";
import "./page.css";
import { getWechatArticles } from "@/lib/wechat";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/news", {
  title: "新闻动态 — 启盟科技",
  description: "启盟科技的融资、签约、媒体报道、获奖与发布会动态。",
});

// 每小时重新拉取一次公众号文章
export const revalidate = 3600;

const Arrow = () => (
  <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default async function Page() {
  const items = await getWechatArticles();

  return (
    <main className="solnw">
      {/* HERO — 蓝图网格冷调首屏 */}
      <section className="nw-hero">
        <div className="nw-grid" aria-hidden="true" />
        <div className="wrap nw-hero-top">
          <span className="nw-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>新闻动态
          </span>
          <h1 className="nw-h1">新闻动态</h1>
          <p className="nw-lead">了解启盟科技的最新动态与媒体报道</p>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className="nw-band mist">
        <div className="wrap">
          <div className="nw-list">
            {items.map((n, i) => (
              <a
                className={`nw-item${n.cover ? " has-cover" : ""}`}
                href={n.url}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="nw-date">{n.date}</div>
                {n.cover && <img className="nw-cover" src={n.cover} alt="" loading="lazy" referrerPolicy="no-referrer" />}
                <div className="nw-body">
                  <h3>{n.title}</h3>
                  {n.digest && <p>{n.digest}</p>}
                </div>
                <Arrow />
              </a>
            ))}
          </div>

          <p className="nw-subline">想及时收到这些动态,可关注我们的 <Link href="/contact">微信公众号</Link>。</p>
        </div>
      </section>
    </main>
  );
}
