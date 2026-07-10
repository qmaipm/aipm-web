import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import SeoFaq from "@/components/SeoFaq";

export const metadata: Metadata = {
  title: "客户服务 · 智能体解决方案 — 启盟科技",
  description:
    "客服 Claw 住在群里,7×24 无间断、极速响应,记住每位业主的偏好,从省心、周到、主动、智能四个维度全面提升客户服务:自动汇总群聊舆情、@一句话发起工单、工单主动反馈、万事通问答。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const dims = [
  { t: "省心", d: "群里 @ 一句话就发起工单，不用记流程、不用自己跑。" },
  { t: "周到", d: "记住每位业主的偏好，连情绪价值都照顾到。" },
  { t: "主动", d: "工单全程跟踪，进展主动同步，不用反复追问。" },
  { t: "智能", d: "多群聊天自动汇总、舆情分析，该上报的早一步发现。" },
];

const feats = [
  { no: "01", tag: "智能", title: "群聊汇总 + 舆情分析", body: "自动汇总微信群、企微群、钉钉群、飞书群的聊天，做总结与舆情分析，该上报的早一步发现。" },
  { no: "02", tag: "省心", title: "@ 一句话发起工单", body: "群里业主只需 @客服 Claw，用自然语言就能发起工单——不用记流程、不用填表。" },
  { no: "03", tag: "主动", title: "工单主动反馈", body: "客服 Claw 全程跟踪工单执行，进展主动反馈给业主，不用反复追问。" },
  { no: "04", tag: "周到", title: "万事通问答", body: "项目的管理制度、周边的服务，问客服 Claw 都能给出准确答案。" },
];

export default function Page() {
  return (
    <main className="solcu">
      {/* HERO */}
      <section className="cu-hero">
        <div className="cu-grid" aria-hidden="true" />
        <div className="wrap cu-hero-top">
          <span className="cu-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>客户服务
          </span>
          <h1 className="cu-h1">
            客户的每一条诉求，<br /><span className="grad">都能即时接住</span>
          </h1>
          <p className="cu-lead">
            我们在群里配一个<b>客服 Claw</b>：7×24 无间断、极速响应，记住每位业主的偏好，把一句话的诉求即时接住、落成动作。
          </p>
          <div className="cu-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#claw" className="btn btn-ghost">看客服 Claw 能做什么 <Arrow /></a>
          </div>
          <div className="cu-proof">
            <span>7×24 <b>即时响应</b></span>
            <span className="sep" />
            <span><b className="grad">最懂业主</b>的人</span>
            <span className="sep" />
            <span>省心 · 周到 · 主动 · 智能</span>
          </div>
        </div>
      </section>

      {/* 它解决什么:过去 vs 现在 */}
      <section className="cu-band mist">
        <div className="wrap">
          <span className="cu-eyebrow">它解决什么</span>
          <h2 className="cu-h2">把散在群里的诉求，接成即时接住的服务</h2>
          <div className="cu-versus">
            <div className="cu-vs them">
              <span className="cu-vs-tag">过去</span>
              <p className="cu-vs-line">诉求散在群里</p>
              <p className="cu-vs-sub">报修、账单疑问、催办散落在各个微信、企微、钉钉、飞书群里，容易遗漏、非标准化，服务质量没办法保障。</p>
            </div>
            <div className="cu-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="cu-vs us">
              <span className="cu-vs-tag">客服 Claw</span>
              <p className="cu-vs-line">每一条都即时接住</p>
              <p className="cu-vs-sub">一个住在群里的助手，7×24 即时答复，把对话直接接成可追踪的动作，反馈沉淀成数据。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 四个维度 */}
      <section className="cu-band">
        <div className="wrap">
          <span className="cu-eyebrow">四个维度</span>
          <h2 className="cu-h2">省心、周到、主动、智能，一起提上来</h2>
          <p className="cu-sub">不是只快一点，而是从这四个维度，把客户服务整体往上抬。</p>
          <div className="cu-dims">
            {dims.map((d) => (
              <div className="cu-dim" key={d.t}>
                <span className="cu-dim-k" />
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客服 Claw · 暗场签名段 */}
      <section className="cu-core" id="claw">
        <div className="cu-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="cu-eyebrow on-dark">客服 Claw</span>
          <h2 className="cu-h2 on-dark">最懂所有业主的人</h2>
          <p className="cu-sub on-dark">7×24 无间断、极速响应，记住业主的所有偏好，还能提供情绪价值——一个真正住在群里的助手。</p>
          <div className="cu-feats">
            {feats.map((f) => (
              <div className="cu-feat" key={f.no}>
                <div className="cu-feat-k">
                  <span className="cu-fno grad">{f.no}</span>
                  <span className="cu-ftag">{f.tag}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <p className="cu-verdict on-dark">一个住在群里的助手，<span className="grad">7×24 接住每一条诉求</span></p>
        </div>
      </section>

      <SeoFaq
        heading="物业 AI 客服,你可能想问"
        serviceName="客户服务"
        serviceDesc="物业 AI 客服:7×24 处理高频咨询,释放人工坐席。"
        items={[
          { q: "物业 AI 客服能处理哪些事?", a: "报修、咨询、投诉受理、缴费提醒等高频重复咨询可由 AI 客服 7×24 先行处理,复杂问题再转人工,缩短响应时间、释放客服坐席。" },
          { q: "AI 客服会取代人工客服吗?", a: "不会取代,而是分担。AI 接住重复咨询,人工转向需要判断力与情感链接的复杂场景与主动服务。" },
          { q: "接入 AI 客服需要多久?", a: "可从一个高频场景(如报修或缴费咨询)起步,在现有渠道(公众号 / 钉钉 / 飞书 / 企业微信)上接入,先跑通再扩展。" },
        ]}
      />

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把你的一个真实群，<br />接上客服 Claw</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <span className="alt">想直接让爱物管来交付? 看 <Link href="/ai-service/customer-service">AI 客服管家</Link></span>
          </div>
        </div>
      </section>
    </main>
  );
}
