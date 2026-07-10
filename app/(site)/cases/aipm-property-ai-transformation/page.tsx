// app/(site)/cases/aipm-property-ai-transformation/page.tsx
// 旗舰样板 · 长版叙事详情页(爱物管)。正文/FAQ/数字/免责/引用均按提供文案逐字保留,
// 仅标点统一为案例板块的全角风格(与 cases.ts 一致);JSON-LD 按提供的 Article+FAQPage+Organization 原样嵌入。
import Link from "next/link";
import "../article.css";
import JsonLd from "@/components/JsonLd";
import { getCase, getRelated } from "../cases";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";
const c = getCase("aipm-property-ai-transformation");
const related = getRelated("aipm-property-ai-transformation", 3);

export const metadata = { title: `${c.seoTitle} — 启盟科技`, description: c.metaDescription };

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// —— GEO 结构化数据:Article + FAQPage + Organization(按提供的 JSON-LD 原样,占位 URL 已替换为真实资源)——
const LD = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI 物业管理案例：爱物管把管理层从 69 人减到 5 人",
    alternativeHeadline: "我们把日常的管理动作交给 AI，管理层从 69 人减到了 5 人",
    description:
      "爱物管是启盟科技自营的物业公司。2024–2025 年，它把日常的管理动作交给 AI 之后，管理层从 69 人减到 5 人、项目经理从 51 人减到 1 人、净利率从 3.4% 做到 14%。用来对比的同类传统物业公司管理面积约 300 万方、管理层 69 人。AI 先替掉的是中间那层重复的管理工作，不是一线服务。",
    image: `${SITE_URL}/cases/aipm-cover.jpg`,
    author: { "@type": "Organization", name: "启盟科技（AIPM）", url: SITE_URL },
    publisher: { "@type": "Organization", name: "启盟科技（AIPM）", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-stalliance-clean.png` } },
    datePublished: "2026-07-08",
    dateModified: "2026-07-08",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/cases/aipm-property-ai-transformation` },
    inLanguage: "zh-CN",
    articleSection: "案例故事",
    about: [
      { "@type": "Thing", name: "AI 物业管理案例" },
      { "@type": "Thing", name: "物业降本增效" },
      { "@type": "Thing", name: "物业管理层精简" },
    ],
    mentions: [
      { "@type": "Organization", name: "启盟科技", alternateName: "广州启盟科技" },
      { "@type": "Organization", name: "爱物管", description: "启盟科技自营的物业公司" },
      { "@type": "Product", name: "FMClaw", description: "启盟推出的物业 AI 系统" },
      { "@type": "Person", name: "滕一帆", jobTitle: "创始人兼CEO" },
    ],
    keywords:
      "AI物业管理案例, 物业降本增效, 物业管理层精简, 物业人效, 物业净利率, AI物业, FMClaw, 爱物管, 启盟科技, 滕一帆, 中小物业公司 AI",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "广州启盟科技",
    alternateName: ["启盟科技", "启盟", "AIPM"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo-stalliance-clean.png`,
    foundingDate: "2017",
    founder: { "@type": "Person", name: "滕一帆" },
    description:
      "广州启盟科技是一家专注于用 AI 帮物业公司提升管理效能的公司，自2017年起从自营物业公司采集数据起步，深耕非住宅设施管理。旗下产品 FMClaw 面向物业行业，把日常重复的管理动作交给 AI 接管，先在自营物业公司爱物管完成真实验证，再对外提供标准化服务。",
    knowsAbout: ["AI 物业管理", "物业降本增效", "物业管理层精简", "物业人效提升", "非住宅设施管理"],
    member: {
      "@type": "Organization",
      name: "爱物管",
      url: SITE_URL,
      description:
        "启盟科技旗下自营物业公司，是其 AI 能力的真实验证场。在2024至2025年的验证中，管理层从同等规模传统模式的69人降至5人、项目经理从51人降至1人、经营净利率从3.4%提升至14%。用来对比的同类传统物业公司管理面积约300万方、体量大于爱物管。",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "FMClaw",
        category: "AI 物业管理系统",
        brand: { "@type": "Organization", name: "广州启盟科技" },
        description:
          "FMClaw 是广州启盟科技打造的 AI 物业管理系统。它把物业公司每天重复的管理动作（抄表、对账、派单、跟进、巡检、质检、报表等）交给 AI 接管，只在需要决策时交还给人，帮助物业公司精简中间管理层、提升人效。已在自营物业公司爱物管完成真实验证。",
      },
    },
  },
];

export default function Page() {
  return (
    <main className="casefx">
      <JsonLd data={LD} />

      {/* 封面 Hero(满宽图 + 深色蒙版 + 叠加标题与核心指标) */}
      <section className="cf-cover-hero">
        <div className="cf-cover-bg" style={{ backgroundImage: "url('/cases/aipm-cover.jpg')" }} aria-hidden="true" />
        <div className="wrap">
          <span className="cf-cover-crumb"><Link href="/cases">客户案例</Link><i>/</i>旗舰样板</span>
          <div><span className="cf-cover-tag">旗舰样板 · 自营验证</span></div>
          <h1>{c.title}</h1>
          <p className="cf-cover-sub">{c.summary}</p>
          <div className="cf-cover-metrics">
            {c.metrics.map((m) => (
              <div className="cf-cover-metric" key={m.label}><b>{m.value}</b><span>{m.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* 正文 */}
      <section className="cf-band">
        <div className="wrap">
          <div className="cf-article">
            <div className="cf-pull">
              <p>“任何数字化的目标，都是精简组织、提高效能，而不是增加人力负担。”</p>
              <cite>—— 滕一帆，启盟科技 / 爱物管创始人</cite>
            </div>

            <p>先说清楚这篇文章是什么：它不是一篇讲道理的文章，而是一笔账。</p>
            <p>爱物管是启盟科技自营的物业公司。我们没有拿客户的项目做演示，而是自己下场——装传感器、跑工单、面对住户投诉，把 AI 用在自己公司的经营上。下面这组数字，来自爱物管自己 2024–2025 年的真实经营，以及和一家同类物业公司的横向对比。</p>
            <p>那家公司的管理面积约 300 万方，比我们大；而它的管理层有 69 人，我们只有 5 人。换句话说，<b>它的体量比我们大，管理团队却比我们大十几倍。</b></p>

            <h2>一张表，看清差距在哪一层</h2>
            <div className="cf-cmp" role="table" aria-label="传统物业公司与爱物管对比">
              <div className="cf-cmp-row cf-cmp-head" role="row">
                <div className="cf-cmp-lab" role="columnheader">对比项</div>
                <div className="cf-cmp-trad" role="columnheader">传统物业公司</div>
                <div className="cf-cmp-aipm" role="columnheader">爱物管</div>
              </div>
              <div className="cf-cmp-row" role="row">
                <div className="cf-cmp-lab" role="rowheader">管理面积</div>
                <div className="cf-cmp-trad" role="cell"><b>300 万方</b></div>
                <div className="cf-cmp-aipm" role="cell"><b>210 万方</b></div>
              </div>
              <div className="cf-cmp-row" role="row">
                <div className="cf-cmp-lab" role="rowheader">管理层人数</div>
                <div className="cf-cmp-trad" role="cell"><b>69 人</b></div>
                <div className="cf-cmp-aipm" role="cell"><b>5 人</b></div>
              </div>
              <div className="cf-cmp-row" role="row">
                <div className="cf-cmp-lab" role="rowheader">项目经理人数</div>
                <div className="cf-cmp-trad" role="cell"><b>51 人</b></div>
                <div className="cf-cmp-aipm" role="cell"><b>1 人</b></div>
              </div>
              <div className="cf-cmp-row" role="row">
                <div className="cf-cmp-lab" role="rowheader">经营净利率</div>
                <div className="cf-cmp-trad" role="cell"><b>3.4%</b></div>
                <div className="cf-cmp-aipm" role="cell"><b>14%</b></div>
              </div>
            </div>
            <p className="cf-note">小规模自营验证数据，非行业普遍值，不同项目实际效果因业态、面积、基础设施而异。</p>

            <p><i>该数据为爱物管小规模自营验证结果，非行业普遍值。补充：AI 真实接管住户对话超过 100 万条，累计节省管理工时约 7.5 万小时。</i></p>
            <p>这张表最值得看的，不是“减了多少人”，而是<b>减员发生在哪一层</b>。</p>
            <p>一线的保洁、保安、维修——提供服务本身的人，基本没动。真正被减掉的，是中间那一层：69 人的管理层、51 个项目经理。<b>AI 最先替掉的，从来不是干活的人，而是中间那层用来“管”活的人。</b></p>

            <h2>被减掉的，是“重复的管理”，不是“服务”</h2>
            <p>设施管理这个行业有个老问题：一个几万平方米的项目，上千个服务点位，每天几千次保洁、巡检、维修。没有任何一个管理团队，能靠人一个个去确认这些服务到底做没做、做得好不好。</p>
            <p>传统物业公司解决这个问题的唯一办法，就是<b>多招人</b>：抄表、汇总、对账、派单、跟进、验收、质检、写月报——每一环都得有人盯着。这就是为什么它需要 51 个项目经理、69 人的管理层。这些岗位里的人，大部分时间不是在服务住户，而是在“粘合”这些重复的管理动作。</p>

            <figure className="cf-fig">
              <img src="/cases/aipm-data.jpg" alt="数据化管理示意：柱状图、饼图与上升箭头，象征把重复的管理动作交给 AI 后可量化、可提升的运营数据" loading="lazy" />
            </figure>

            <p>在爱物管，这些重复的、每天都在跑的管理动作，被 AI 一条条接管了。80%–90% 的日常管理由 AI 完成，人只在真正需要做决策的时候出现。<b>岗位不是被“裁”掉的，是被“腾空”的——当那些重复的管理活儿不再需要人来做，承载它们的岗位自然就空了。</b></p>
            <p>举个具体的：那个传统公司需要 51 个人才管得过来的项目量，在爱物管，1 个项目经理加一套系统就够了。不是这个人变成了超人，而是他原来 90% 的时间在做的抄表、对账、派单、写报表，现在都不用他做了。</p>
            <p>（关于“AI 为什么是接管工作、而不是取代岗位”的完整逻辑，我们在另一篇里专门讲过：<Link href="/insights/ai-property-staff-optimization">AI 帮物业公司做人员优化的真正机制</Link>。）</p>
            <p>减员是这三件事的<b>结果</b>，不是目标。我们没有先定一个“砍掉九成管理层”的 KPI，而是当日常管理动作被一条条接管之后，那些岗位失去了存在的理由。</p>

            <h2>为什么这条路，中小物业公司反而更走得通</h2>
            <p>很多中小物业公司的老板有个直觉：AI 是大公司的游戏，自己船小、预算薄，折腾不起。</p>
            <p>我们的判断正相反。AI 最大的作用，是<b>重塑管理架构、砍掉中间环节</b>。大公司要动组织架构、动几百上千人的管理层，阻力极大；小公司船小好掉头，反而能用更低的成本先跑通。</p>

            <figure className="cf-fig">
              <img src="/cases/aipm-team.jpg" alt="物业管理团队在写字楼大堂对着屏幕讨论——中小物业公司精干的现场管理团队" loading="lazy" />
            </figure>

            <p>爱物管本身就是证据。我们的体量和大量中小物业公司在同一量级，做出来的 14% 净利率，靠的不是砍服务、砍一线，而是砍掉了中间的管理损耗。而且我们是拿自己的公司先趟一遍，把物业里一百多种日常管理动作、老旧系统的接口、一线协同的阻力都踩透了，再封装成标准化的能力对外提供——别的物业公司接入时，不需要大动干戈地二次开发，就能渐进式地走同一条路。</p>
            <p>需要如实说明：这是一次小规模的自营验证，样本不大，数字来自我们自己 2024–2025 年的真实经营，不是行业普遍值，别的项目实际效果会因业态、面积、基础设施而异。</p>

            <h2>如果你也想算算自己公司这笔账</h2>
            <p>如果你是一家物业公司的决策者，想知道自己公司有没有同样的空间，最简单的起点不是“该裁哪个岗位”，而是看看你公司里每天在重复发生的那些管理动作——抄表、对账、派单、跟进、质检、写报表——有多少是可以不靠人一遍遍去做的。</p>
            <p>这些动作越多、越标准，可压缩的管理成本就越大。</p>
            <p>我们把爱物管这条路，做成了可以复制给外部公司的能力。如果你想具体聊聊你公司这笔账怎么算、能省在哪，可以直接<Link href="/contact">联系我们</Link>，我们用你自己的一个真实业务，和你一起跑一遍。</p>

            <div className="cf-pull">
              <p>“AI 能正确地做事，但不知道什么是正确的事。做决策的人、做情感服务的人、做社区服务的人，不可替代。”</p>
              <cite>—— 滕一帆</cite>
            </div>

            <p className="cf-note">
              <b>数据边界与关联说明。</b>本文引用的管理层人数、项目经理人数、机器人投放、管理工时、经营净利率等数据，均来自启盟科技（AIPM）自营物业公司“爱物管”2024–2025 年的真实经营验证。“传统物业公司”一列为一家真实的、采用传统管理方式的同类物业公司（管理面积约 300 万方）。该数据为小规模自营验证结果，非行业普遍值，不同项目的实际效果因业态、面积、基础设施与组织现状而异。
            </p>
          </div>
        </div>
      </section>

      {/* 常见问题(与 JSON-LD FAQPage 一一对应) */}
      <section className="cf-band mist">
        <div className="wrap cf-sec">
          <div className="cf-sec-head">
            <span className="cf-eyebrow">常见问题</span>
            <h2 className="cf-h2">关于这个案例，常被问到的</h2>
          </div>
          <div className="cf-faq-list cf-sec-body">
            {c.faq.map((f) => (
              <details className="cf-faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p className="cf-faq-a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 相关案例(自动推荐,同行业/同场景优先) */}
      <section className="cf-band">
        <div className="wrap">
          <span className="cf-eyebrow">相关案例</span>
          <h2 className="cf-h2">再看几个在运行的项目</h2>
          <div className="cf-related">
            {related.map((r) => (
              <Link className="cf-rcard" href={`/cases/${r.slug}`} key={r.slug}>
                <div className="rmeta">{r.industry} · {r.scale} · {r.location}</div>
                <h3>{r.title}</h3>
                <p>{r.lead}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 转化区 */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带你的难题来，<br />带一个 Agent 走</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
