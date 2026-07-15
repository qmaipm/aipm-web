import Link from "next/link";
import "./page.css";
import { newsByDate } from "./articles";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/news", {
  title: "新闻动态 — 启盟科技",
  description: "启盟科技的展会、活动、荣誉与合作动态:建博会、BEYOND Expo、NVIDIA 创业企业展示、行业峰会与闭门分享。",
});

const Arrow = () => (
  <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function Page() {
  const [latest, ...rest] = newsByDate();

  return (
    <main className="solnw">
      {/* HERO — 蓝图网格冷调 */}
      <section className="nw-hero">
        <div className="nw-grid" aria-hidden="true" />
        <div className="wrap nw-hero-top">
          <span className="nw-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>新闻动态
          </span>
          <h1 className="nw-h1">新闻动态</h1>
          <p className="nw-lead">展会、活动、荣誉与合作——启盟科技把 AI 落进物理世界的沿途记录。</p>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className="nw-band mist">
        <div className="wrap">
          {/* 头条:最新一条 */}
          <Link className="nw-feat" href={`/news/${latest.slug}`}>
            <img className="nw-feat-cover" src={latest.cover} alt="" loading="eager" />
            <div className="nw-feat-body">
              <div className="nw-titlerow">
                <h2>{latest.title}</h2>
                <span className="nw-tag">{latest.category}</span>
              </div>
              <p>{latest.desc}</p>
              <div className="nw-feat-meta">
                {latest.date}
                {latest.place ? <> · {latest.place}</> : null}
                <Arrow />
              </div>
            </div>
          </Link>

          {/* 时间线列表 */}
          <div className="nw-list">
            {rest.map((n) => (
              <Link className="nw-item has-cover" href={`/news/${n.slug}`} key={n.slug}>
                <div className="nw-date">{n.date}</div>
                <img className="nw-cover" src={n.cover} alt="" loading="lazy" />
                <div className="nw-body">
                  <div className="nw-titlerow">
                    <h3>{n.title}</h3>
                    <span className="nw-tag">{n.category}</span>
                  </div>
                  <p>{n.desc}</p>
                </div>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
