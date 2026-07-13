import Link from "next/link";
import "./page.css";
import PostList from "./_PostList";
import { getArticle } from "./articles";

export const metadata = {
  title: "行业研究 · 启盟科技看物业与 FM 行业 — 启盟科技",
  description:
    "从 AI 落地方法到物业 AI 化,再到 OBC 合约模式——启盟科技对物业与设施管理(FM)行业的长期研究:怎么落地、行业会变成什么样、商业模式怎么算账。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  const featured = getArticle("property-management-second-half-ai-company");

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
            物业与 AI 怎么真正结合,<span className="grad">我们研究得透一点</span>
          </h1>
          <p className="is-lead">
            <b>AI 怎么落地</b>、<b>物业行业会变成什么样</b>、<b>商业模式怎么算账</b>——这里是启盟科技把 <b>AI</b> 用进<b>物业与设施管理(FM)</b>的长期研究:不止于趋势判断,更要把每一件事在现场跑通。
          </p>
          <div className="is-proof">
            <span><b className="grad">AI 落地方法</b></span>
            <span className="sep" />
            <span><b>物业 AI 化</b></span>
            <span className="sep" />
            <span><b>OBC</b> 合约模式</span>
          </div>
        </div>
      </section>

      {/* 头条 */}
      <section className="is-band" id="featured">
        <div className="wrap">
          <span className="is-eyebrow">头条</span>
          <h2 className="is-h2">这一篇,值得你先读</h2>
          <p className="is-sub">下半场的真问题不是“物业公司该卖什么”,而是“物业公司该变成一家什么公司”。</p>

          <Link className="is-featured" href={`/insights/${featured.slug}`}>
            <div className="is-cover" aria-hidden="true">
              <img className="is-cover-img" src="/insights/second-half-ai-company-cover.jpg" alt="" />
              <span className="is-ftag">{featured.theme}</span>
            </div>
            <div className="is-fbody">
              <div className="is-ftag-tx">FEATURED · {featured.theme}</div>
              <h3>{featured.title}</h3>
              <p>主流答案都在讨论物业公司“该多卖什么、怎么定价”,却默认了同一个前提:它永远是一家物业公司。但当管理 80-90% 由智能体完成、执行层人机协同、空间遍布 IoT,把“物业”两个字拿掉,它本质上已经是一家人工智能公司。下半场的终局,不是更好的物业公司,而是一家 AI 公司。</p>
              <div className="is-fmeta">{featured.by} <span className="dot" aria-hidden>·</span> {featured.date} <span className="dot" aria-hidden>·</span> {featured.read}阅读 <Arrow s={14} /></div>
            </div>
          </Link>
        </div>
      </section>

      {/* 文章列表(标签可筛选) */}
      <section className="is-band mist">
        <div className="wrap">
          <span className="is-eyebrow">全部文章</span>
          <PostList />
        </div>
      </section>

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你正在做的难题,<br />写成下一篇研究的开头</h2>
          <p className="reveal">如果你也在认真做这件事,我们想听听。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
