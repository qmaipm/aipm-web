import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/solutions/inspection", {
  title: "设备巡检管理 · 智能体解决方案 — 启盟科技",
  description:
    "纸质表、扫码巡检无法保证人到现场,数据不准不全就失去价值。我们用 IOT 人单合一验证到场、巡检单电子化 + 拍照 AI 识别读数、读数超阈值预警与趋势异常分析,把巡检数据做真做全,支撑预防性维护。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const iIco = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconPin = () => (<svg viewBox="0 0 24 24" {...iIco}><path d="M12 21s-6-5.4-6-10a6 6 0 0 1 12 0c0 4.6-6 10-6 10z" /><path d="M9.4 10.8l1.8 1.8 3.4-3.6" /></svg>);
const IconCamera = () => (<svg viewBox="0 0 24 24" {...iIco}><path d="M4 8h3l1.6-2h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13" r="3.2" /></svg>);
const IconGauge = () => (<svg viewBox="0 0 24 24" {...iIco}><path d="M4 18a8 8 0 1 1 16 0" /><path d="M12 18l3.5-4.5" /><circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none" /></svg>);
const IconTrend = () => (<svg viewBox="0 0 24 24" {...iIco}><path d="M3 16l5-5 4 4 8.5-9" /><path d="M16.5 6H21v4.5" /></svg>);

const feats = [
  { no: "01", title: "确保人员到场", icon: <IconPin />, body: "通过 IOT 传感器实现“人单合一”验证，员工必须到现场才能填单，杜绝隔空补录。", href: "/products/iot", linkText: "IoT 物理世界感知系统" },
  { no: "02", title: "保障数据完整性", icon: <IconCamera />, body: "巡检单在线电子化，还能拍照让 AI 自动识别读数，保障数据准确、完整。", href: undefined, linkText: undefined },
  { no: "03", title: "读数超阈值预警", icon: <IconGauge />, body: "为每个读数配置正常值范围，填写的读数一旦超阈值，立即预警。", href: undefined, linkText: undefined },
  { no: "04", title: "数据分析与预警", icon: <IconTrend />, body: "基于完整数据做分析，识别趋势陡升陡降，提前发出故障预警。", href: undefined, linkText: undefined },
];

export default function Page() {
  return (
    <main className="solin">
      {/* HERO */}
      <section className="in-hero">
        <div className="in-grid" aria-hidden="true" />
        <div className="wrap in-hero-top">
          <span className="in-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>设备巡检管理
          </span>
          <h1 className="in-h1">
            巡检到场、数据为真，<br /><span className="grad">才能预防性维护</span>
          </h1>
          <p className="in-lead">
            纸质表、扫二维码，都没法保证人真的到现场检查；数据一旦<b>不准、不全</b>，就失去价值，更谈不上预防性维护。
          </p>
          <div className="in-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#caps" className="btn btn-ghost">看四个能力 <Arrow /></a>
          </div>
          <div className="in-proof">
            <span>人单合一<b>到场</b></span>
            <span className="sep" />
            <span>数据<b>完整准确</b></span>
            <span className="sep" />
            <span>超阈值 + 趋势<b className="grad">预警</b></span>
          </div>
        </div>
      </section>

      {/* 它解决什么:过去 vs 现在 */}
      <section className="in-band mist">
        <div className="wrap">
          <span className="in-eyebrow">它解决什么</span>
          <h2 className="in-h2">从"巡没巡看不准"，到"数据真、能预防"</h2>
          <div className="in-versus">
            <div className="in-vs them">
              <span className="in-vs-tag">过去</span>
              <p className="in-vs-line">纸质表、扫码巡检</p>
              <p className="in-vs-sub">纸质巡检表或扫二维码，没法保证每次巡检员工都在现场检查；数据质量没保障，价值丧失，做不了预防性维护。</p>
            </div>
            <div className="in-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="in-vs us">
              <span className="in-vs-tag">现在 · IOT + AI</span>
              <p className="in-vs-line">到场验证，数据可预防</p>
              <p className="in-vs-sub">IOT 验证人确实到场才能填单，巡检单电子化、AI 识别读数，超阈值与趋势异常自动预警。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 四个能力 · 暗场签名段 */}
      <section className="in-core" id="caps">
        <div className="in-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="in-eyebrow on-dark">四个能力</span>
          <h2 className="in-h2 on-dark">从确保到场，到提前预警</h2>
          <p className="in-core-lead">前两个把数据做真、做全，后两个把数据用起来——一步步走到预防性维护。</p>
          <div className="in-feats">
            {feats.map((f) => {
              const inner = (
                <>
                  <div className="in-feat-h">
                    <span className="in-fic">{f.icon}</span>
                    <span className="in-fno grad">{f.no}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                  {f.href && <span className="in-feat-link">{f.linkText} <Arrow s={13} /></span>}
                </>
              );
              return f.href ? (
                <Link className="in-feat" href={f.href} key={f.no}>{inner}</Link>
              ) : (
                <div className="in-feat" key={f.no}>{inner}</div>
              );
            })}
          </div>
          <p className="in-verdict">数据真、数据全，故障才能<span className="grad">提前预警、预防性维护</span></p>
        </div>
      </section>

      <SeoFaq
        heading="设备智能巡检,你可能想问"
        serviceName="设备巡检管理"
        serviceDesc="IoT + AI 的设备智能巡检,做到人单合一与异常预警。"
        items={[
          { q: "设备智能巡检和电子巡更有什么不同?", a: "电子巡更只证明“人到过点”,容易作弊;智能巡检结合 IoT 与 AI,采集真实在岗、巡检到岗率与设备状态,做到“人单合一”,并能预警设备异常。" },
          { q: "AI 巡检能解决重点区域反复投诉吗?", a: "能定位问题。把重点区域(如卫生间、机房)的到岗与达标数据化后,可精准发现薄弱点并持续跟踪改善,而非反复做无效专项整改。" },
          { q: "巡检数据能用于供应商考核吗?", a: "可以。巡检到岗率、服务达标率等可直接作为 OBC 考核指标,把巡检从“成本”变成“管理抓手”。" },
        ]}
      />

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一条真实的巡检线，<br />跑出能预防的真数据</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
