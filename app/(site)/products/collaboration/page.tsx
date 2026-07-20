import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";
import ProductCrumb from "../_crumb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/collaboration", {
  title: "第三方平台 AI 协同 · 钉钉飞书企业微信接进 FMClaw | 启盟科技",
  description:
    "客户已有的协作平台不替换。通用平台是协作入口，FMClaw 是行业业务大脑——两者互相接入、互相成就。三种接入方式按 FMClaw 与平台的相对位置区分：接在它之后、住进它内部、接在它之前。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="colx">
      {/* ===== HERO ===== */}
      <section className="col-hero">
        <div className="col-grid" aria-hidden="true" />
        <div className="wrap col-hero-top">
          <ProductCrumb name="第三方平台 AI 协同" href="/products/collaboration" />
          <span className="col-kicker">第三方平台 AI 协同<i>/</i>不替换，只接入</span>
          <h1 className="col-h1">
            钉钉、飞书、企业微信继续用<br /><span className="grad">FMClaw 接进去就好</span>
          </h1>
          <p className="col-lead">
            客户已有的协作平台不替换。通用平台是<b>协作入口</b>，FMClaw 是<b>行业业务大脑</b>——两者互相接入、互相成就。
          </p>
          <div className="col-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#modes" className="btn btn-ghost">看三种接入方式 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* ===== 定位 · 宽而全 × 深而专 ===== */}
      <section className="col-band mist">
        <div className="wrap">
          <span className="col-eyebrow">核心定位</span>
          <h2 className="col-h2">宽而全 × 深而专，各做各擅长的事</h2>
          <p className="col-sub">「已经有飞书 / 钉钉了，要不要换？」——不用换。各自做各自擅长的事，接到一起。</p>
          <div className="col-versus">
            <div className="col-vs plat">
              <span className="col-vs-tag">通用协作平台 · 宽而全</span>
              <p className="col-vs-line">协作入口</p>
              <p className="col-vs-sub">钉钉 / 飞书 / 企业微信，承载组织的沟通、审批、通知与日常协作，覆盖面宽，人人都在用。</p>
            </div>
            <div className="col-vs-mid" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 9h12M4 9l4-4M4 9l4 4M20 15H8M20 15l-4-4M20 15l-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>互相接入<br />互相成就</span>
            </div>
            <div className="col-vs us">
              <span className="col-vs-tag">FMClaw · 深而专</span>
              <p className="col-vs-line">行业业务大脑</p>
              <p className="col-vs-sub">把物业与设施管理的行业 Know-how、数据与工具装进系统，负责协作入口背后那段专业业务闭环。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 三种接入方式 ===== */}
      <section className="col-band" id="modes">
        <div className="wrap">
          <span className="col-eyebrow">三种接入方式</span>
          <h2 className="col-h2">接在它之后、住进它内部、接在它之前</h2>
          <p className="col-sub">三种方式按 FMClaw 与平台的相对位置区分，可单独用，也可叠加用。</p>
          <div className="col-modes">
            <div className="col-mode">
              <span className="col-mode-pos">接在它之后</span>
              <h3>守群采集，下游闭环</h3>
              <div className="col-topo">
                <div className="col-box plat">平台 Bot<br />守群采集</div>
                <span className="col-flow" aria-hidden="true">→</span>
                <div className="col-box fm">FMClaw<br />行业业务闭环</div>
              </div>
              <p className="col-mode-d">平台 Bot 守在群里采集消息，FMClaw 读取后完成行业业务闭环。对话还在原平台，专业处理在 FMClaw。</p>
              <div className="col-scene">代表场景 · <b>报修智能客服</b></div>
            </div>
            <div className="col-mode">
              <span className="col-mode-pos">住进它内部</span>
              <h3>不换对话框，底层换大脑</h3>
              <div className="col-topo">
                <div className="col-nest">平台 Bot 对话入口
                  <div className="col-box fm">FMClaw 数据 · Skill · 工具</div>
                </div>
              </div>
              <p className="col-mode-d">对话入口仍是平台 Bot，底层由 FMClaw 完成数据调用、Skill 推理与工具调用。用户不换对话框，能力却换了一层。</p>
              <div className="col-scene">代表场景 · <b>管理层问询</b></div>
            </div>
            <div className="col-mode">
              <span className="col-mode-pos">接在它之前</span>
              <h3>双向数据桥接枢纽</h3>
              <div className="col-topo">
                <div className="col-box plat">多维表 /<br />智能表格</div>
                <span className="col-flow" aria-hidden="true">⇄</span>
                <div className="col-box fm">FMClaw<br />数据集市</div>
              </div>
              <p className="col-mode-d">以多维表 / 智能表格 + FMClaw 数据集市构成双向数据桥接枢纽，数据在两侧双向流转。</p>
              <div className="col-scene">代表场景 · <b>数据桥接枢纽</b></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 两个差异点 · 暗场签名 ===== */}
      <section className="col-core">
        <div className="col-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="col-eyebrow on-dark">为什么这样接</span>
          <h2 className="col-h2 on-dark">两个差异点，把决策门槛降下来</h2>
          <div className="col-diff">
            <div className="col-diff-item">
              <span className="col-dn">01</span>
              <div className="col-dc">
                <h3>不替换，只接入</h3>
                <p>客户原有平台继续运行，FMClaw 只承担行业业务那一段。不动现有协作习惯，决策门槛因此降下来。</p>
              </div>
            </div>
            <div className="col-diff-item">
              <span className="col-dn">02</span>
              <div className="col-dc">
                <h3>双向数据桥接</h3>
                <p>同一份数据，财务、运营、管理层各用各自的 AI 助手消费；两侧各写一个接口即可，复用平台现成的能力，不重复造轮子。</p>
                <div className="col-reuse">
                  <span>权限 / IAM</span><span>通知</span><span>AI 助手</span><span>多维表</span>
                </div>
              </div>
            </div>
          </div>
          <p className="col-verdict">三种方式可以单独用，也可以叠加用；原有平台<span className="grad">不替换</span>，FMClaw 只补上专业那一段。</p>
          <p className="col-verdict">钉钉、飞书和企业微信负责协作入口；FMClaw 负责行业数据、业务工作流与系统动作。</p>
          <p className="col-verdict" style={{ fontSize: 14 }}>
            <Link href="/products/fmclaw" style={{ color: "#3fd9b8", fontWeight: 600 }}>了解 FMClaw 如何统一数据、工作流、工具和组织权限 →</Link>
            <br />
            <Link href="/products/fmclaw/connectors" style={{ color: "#3fd9b8", fontWeight: 600 }}>查看工具箱 →</Link>
          </p>
        </div>
      </section>

      {/* ===== END CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">在你现在用的平台上，接一段试试</h2>
          <p className="reveal">带上你的钉钉 / 飞书 / 企业微信场景来，一次工作坊里接通它。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
