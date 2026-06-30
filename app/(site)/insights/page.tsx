import Link from "next/link";
import "./page.css";
import PostList from "./_PostList";
import { getArticle } from "./articles";

export const metadata = {
  title: "行业研究 · 启盟科技看物业与 FM 行业 — 启盟科技",
  description:
    "从 OBC 合约模式到数字劳动力,从行业大模型到一线落地——启盟科技对物业与设施管理(FM)行业的长期研究。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  const featured = getArticle("ai-property-staff-optimization");

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
            从 <b>OBC 合约模式</b>到<b>数字劳动力</b>,从<b>行业大模型</b>到一线落地——这里是启盟科技把 <b>AI</b> 用进<b>物业与设施管理(FM)</b>的长期研究:不止于趋势判断,更要把每一件事在现场跑通。
          </p>
          <div className="is-proof">
            <span><b>OBC</b> 合约模式</span>
            <span className="sep" />
            <span><b>数字劳动力</b></span>
            <span className="sep" />
            <span><b className="grad">行业大模型</b></span>
          </div>
        </div>
      </section>

      {/* 头条 */}
      <section className="is-band" id="featured">
        <div className="wrap">
          <span className="is-eyebrow">头条</span>
          <h2 className="is-h2">这一篇,值得你先读</h2>
          <p className="is-sub">别问 AI 会取代哪些岗位,去看它能跑通哪些工作流——岗位只是工作流的容器。</p>

          <Link className="is-featured" href={`/insights/${featured.slug}`}>
            <div className="is-cover" aria-hidden="true">
              <img className="is-cover-img" src="/insights/ai-staff-optimization-cover.jpg" alt="" />
              <span className="is-ftag">{featured.theme}</span>
            </div>
            <div className="is-fbody">
              <div className="is-ftag-tx">FEATURED · {featured.theme}</div>
              <h3>{featured.title}</h3>
              <p>AI 不替代岗位,它逐条接管工作流。把抄表、对账、派单、巡检、质检这些工作流端到端跑通后,承载它们的岗位会自然腾空——在启盟科技自营物业爱物管的 0-1 验证里,管理层从 69 人降到 5 人、净利率从 3.4% 升到 14%,减员是结果,不是手段。</p>
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
