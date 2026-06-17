import Link from "next/link";
import "./page.css";
import { getWechatArticles } from "@/lib/wechat";

export const metadata = {
  title: "新闻动态 — 启盟科技",
  description: "启盟科技的融资、签约、媒体报道、获奖与发布会动态。",
};

// 每小时重新拉取一次公众号文章
export const revalidate = 3600;

type NewsItem = { date: string; tag: string; title: string; desc: string; href: string; external: boolean; cover?: string };

// 未配置公众号 API / 拉取失败时的回退内容
const FALLBACK: NewsItem[] = [
  { date: "2026 · 04 · 18", tag: "发布会", title: "FMClaw™ AI 平台 v2.0 正式发布", desc: "新版本围绕 Agentic 架构与五大模块重构,把更多日常运营环节交给可调用的 Agent。", href: "#", external: false },
  { date: "2026 · 02 · 25", tag: "融资", title: "启盟科技完成新一轮融资", desc: "本轮资金主要用于 AI 基座研发与 FDE 团队建设。具体细节将在合适的时候补充。", href: "#", external: false },
  { date: "2025 · 12 · 09", tag: "签约", title: "与某区域物业集团达成 AI 运营合作", desc: "双方将在外包管理与质量考评场景上,共同推进一批真实业务的 Agent 落地。", href: "#", external: false },
  { date: "2025 · 10 · 31", tag: "媒体报道", title: "媒体专访:物业为什么是 AI 落地的好场景", desc: "我们和媒体聊了聊,为什么真实、连续、重复的运营工作,正是 AI 最能帮上忙的地方。", href: "#", external: false },
  { date: "2025 · 08 · 14", tag: "获奖", title: "入选某年度智慧设施管理创新案例", desc: "一项基于真实业务跑通的 Agent 工作流,入选行业年度创新案例名录。", href: "#", external: false },
];

const Arrow = () => (
  <svg className="arr" width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default async function Page() {
  const wx = await getWechatArticles();
  const useWx = wx.length > 0;
  const items: NewsItem[] = useWx
    ? wx.map((a) => ({ date: a.date, tag: "", title: a.title, desc: a.digest, href: a.url, external: true, cover: a.cover }))
    : FALLBACK;

  return (
    <main className="news-page">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <h1 className="reveal" style={{ marginTop: "20px" }}>新闻动态</h1>
          <p className="lead reveal">了解启盟科技的最新动态与媒体报道</p>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className="band alt">
        <div className="wrap">
          {!useWx && (
            <div className="tabs reveal">
              <span className="tab on">全部</span>
              <span className="tab">融资</span>
              <span className="tab">签约</span>
              <span className="tab">媒体报道</span>
              <span className="tab">获奖</span>
              <span className="tab">发布会</span>
            </div>
          )}

          <div className="newslist reveal">
            {items.map((n, i) => (
              <a
                className={`news-item${n.cover ? " has-cover" : ""}`}
                href={n.href}
                key={i}
                {...(n.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="date">{n.date}</div>
                {n.cover && <img className="news-cover" src={n.cover} alt="" loading="lazy" referrerPolicy="no-referrer" />}
                <div>
                  {n.tag && <span className="tag">{n.tag}</span>}
                  <h3>{n.title}</h3>
                  {n.desc && <p>{n.desc}</p>}
                </div>
                <Arrow />
              </a>
            ))}
          </div>

          <p className="sub-line reveal" style={{ marginTop: "48px" }}>想及时收到这些动态,可关注我们的 <Link href="/contact">微信公众号</Link>。</p>
        </div>
      </section>
    </main>
  );
}
