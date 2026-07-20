import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/solutions/payroll", {
  title: "人员薪酬管理 · 智能体解决方案 | 启盟科技",
  description:
    "排班、考勤、算薪不再靠 HR、主管、项目多人协同。主管只配工作模式,人脸+蓝牙核验现场打卡,系统按小时算在场工时,FMClaw 自动拉取考勤、工时、加班、请假、补贴等数据算出薪酬;已有考勤系统可外接飞书、钉钉、企微数据源。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const pIco = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconCalendar = () => (<svg viewBox="0 0 24 24" {...pIco}><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 3v3M16 3v3" /></svg>);
const IconScan = () => (<svg viewBox="0 0 24 24" {...pIco}><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" /><circle cx="12" cy="11" r="2" /><path d="M8.6 16c.6-1.4 1.9-2.1 3.4-2.1s2.8.7 3.4 2.1" /></svg>);
const IconClock = () => (<svg viewBox="0 0 24 24" {...pIco}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></svg>);
const IconReceipt = () => (<svg viewBox="0 0 24 24" {...pIco}><path d="M6 3h12v18l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3L6 21z" /><path d="M9.5 8.5h5M9.5 12h5" /></svg>);

const feats = [
  { no: "01", title: "智能排班", icon: <IconCalendar />, body: "主管无需用系统排班，只需配置好员工的工作模式：月休 4 天、做 6 休 1、做 5 休 2。" },
  { no: "02", title: "考勤打卡", icon: <IconScan />, body: "员工上班时选择自己的班次，人脸 + 蓝牙位置核验，确保在现场打卡。" },
  { no: "03", title: "在场工时", icon: <IconClock />, body: "系统按小时维度输出每个员工的在场工时，确保员工持续在场。" },
  { no: "04", title: "工薪结算", icon: <IconReceipt />, body: "在 FMClaw 配置薪酬计算流程，AI 自动拉取薪酬配置、考勤、在场工时、加班、请假、专项增减、节假日补贴等数据，自动算出每个人的薪酬。" },
];

export default function Page() {
  return (
    <main className="solpay">
      {/* HERO */}
      <section className="pay-hero">
        <div className="pay-grid" aria-hidden="true" />
        <div className="wrap pay-hero-top">
          <span className="pay-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>人员薪酬管理
          </span>
          <h1 className="pay-h1">
            排班、考勤、算薪，<br /><span className="grad">一条龙自动跑</span>
          </h1>
          <p className="pay-lead">
            入职、排班、考勤统计、算薪，过去要 HR、主管、项目<b>多人协同</b>。现在配好规则，AI 把薪酬自动算出来。
          </p>
          <div className="pay-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#caps" className="btn btn-ghost">看四个能力 <Arrow /></a>
          </div>
          <div className="pay-proof">
            <span>智能<b>排班</b></span>
            <span className="sep" />
            <span>在场工时<b>核验</b></span>
            <span className="sep" />
            <span>FMClaw <b className="grad">自动算薪</b></span>
          </div>
        </div>
      </section>

      {/* 它解决什么:过去 vs 现在 */}
      <section className="pay-band mist">
        <div className="wrap">
          <span className="pay-eyebrow">它解决什么</span>
          <h2 className="pay-h2">从多人协同月底拼账，到 AI 自动算薪</h2>
          <div className="pay-versus">
            <div className="pay-vs them">
              <span className="pay-vs-tag">过去 · 多人协同</span>
              <p className="pay-vs-line">月底拼账，工作量巨大</p>
              <ul className="pay-vs-list">
                <li><b>排班难维护</b>月头排好的班，员工各种特殊情况调班，多人多天反复调整，往往算薪时才定稿。</li>
                <li><b>考勤难核验</b>打卡只有签到、签退时间，打了卡，人真的在现场服务吗？</li>
                <li><b>算薪工作量大</b>纸质考勤、排班还要重新录入，核验每个人、算每一笔，工作量巨大。</li>
              </ul>
            </div>
            <div className="pay-vs-mid" aria-hidden="true"><span>vs</span></div>
            <div className="pay-vs us">
              <span className="pay-vs-tag">现在 · 配规则 + AI</span>
              <p className="pay-vs-line">配好规则，AI 算薪</p>
              <ul className="pay-vs-list">
                <li><b>不用排班</b>主管只配工作模式，系统自动排班、自动维护。</li>
                <li><b>现场核验</b>选班次 + 人脸 + 蓝牙位置核验，确保人在现场打卡。</li>
                <li><b>自动算薪</b>按小时算在场工时，FMClaw 拉取所有数据，AI 自动算出薪酬。</li>
              </ul>
            </div>
          </div>
          <p className="pay-link">它与 <Link href="/solutions/subcontract">服务分包管理</Link>，本就源自同一套记录。</p>
        </div>
      </section>

      {/* 四个能力 · 暗场签名段 */}
      <section className="pay-core" id="caps">
        <div className="pay-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="pay-eyebrow on-dark">四个能力</span>
          <h2 className="pay-h2 on-dark">从排班到算薪，一条线跑下来</h2>
          <p className="pay-sub on-dark">前三个让数据在过程中自然产生，第四个由 FMClaw 把它们自动算成薪酬。</p>
          <div className="pay-feats">
            {feats.map((f) => (
              <div className="pay-feat" key={f.no} data-end={f.no === "04"}>
                <div className="pay-feat-h">
                  <span className="pay-fic">{f.icon}</span>
                  <span className="pay-fno grad">{f.no}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>

          <Link className="pay-srcnote" href="/products/collaboration">
            <div className="pay-srcnote-h">
              <h3>已有自己的考勤系统？</h3>
              <p>外接自定义数据源补充，照样自动算薪：</p>
              <span className="pay-srclink">第三方平台 AI 协同，了解更多 <Arrow s={13} /></span>
            </div>
            <div className="pay-src-chips">
              <span className="pay-src">飞书</span>
              <span className="pay-src">钉钉</span>
              <span className="pay-src">企微</span>
            </div>
          </Link>

          <p className="pay-verdict on-dark">你只需配好规则，<span className="grad">薪酬 AI 自动算出来</span></p>
        </div>
      </section>

      <SeoFaq
        heading="薪酬管理,你可能想问"
        serviceName="人员薪酬管理"
        serviceDesc="打通考勤工时与考核,自动核算物业薪酬。"
        items={[
          { q: "物业薪酬核算为什么容易出错?", a: "多项目、多班次、连班缺编、考勤口径不一,手工核算既慢又易错。把考勤与工时数据打通后可自动核算,减少误差与人情分。" },
          { q: "薪酬能和考勤、考核打通吗?", a: "可以。把到岗工时、服务达标等数据与薪酬规则联动,实现按真实出勤与结果核算,既公平又可追溯。" },
          { q: "上线薪酬自动化要换系统吗?", a: "不必。可在现有考勤 / 工时数据上接入核算逻辑,先跑通一个项目再推广。" },
        ]}
      />

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个月的薪酬核算，<br />跑成 AI 自动算的结果</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
