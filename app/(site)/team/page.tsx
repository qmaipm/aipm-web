import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata("/team", {
  title: "团队 · 创始人滕一帆与 FDE 工程师团队 | 启盟科技",
  description:
    "启盟科技由创始人 & CEO 滕一帆带领,到现场的是行业老兵与 AI 工程师组成的 FDE 前线部署工程师团队,不是来讲方案的销售;背后有蓝驰创投、微光创投支持。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="soltm">
      {/* HERO */}
      <section className="tm-hero">
        <div className="tm-grid" aria-hidden="true" />
        <div className="wrap tm-hero-top">
          <span className="tm-kicker">
            <Link href="/">启盟科技</Link>
            <i>/</i>团队
          </span>
          <h1 className="tm-h1">
            到现场的是工程师,<br /><span className="grad">不是 PPT 销售</span>
          </h1>
          <p className="tm-lead">
            和你一起坐下来、打开数据、把 Agent 搭起来的人,<b>自己写代码,也懂这个行业怎么运转</b>。
          </p>
          <div className="tm-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#founders" className="btn btn-ghost">认识这群人 <Arrow /></a>
          </div>
          <div className="tm-proof">
            <span>行业老兵 <b>×</b> AI 工程师</span>
            <span className="sep" />
            <span>主导 <b>500+</b> 项目落地</span>
            <span className="sep" />
            <span><b className="grad">蓝驰 · 微光</b> 创投支持</span>
          </div>
        </div>
      </section>

      {/* 创始人(仅实名滕一帆一人) */}
      <section className="tm-band" id="founders">
        <div className="wrap">
          <span className="tm-eyebrow">创始人</span>
          <h2 className="tm-h2">把公司带到这里的人</h2>
          <div className="tm-founder">
            <div className="tm-founder-id">
              <div className="tm-avatar" aria-hidden="true">滕</div>
              <h3>滕一帆</h3>
              <div className="tm-role">创始人 &amp; CEO</div>
            </div>
            <div className="tm-founder-bio">
              <p>我是爱物管的创始人滕一帆,非常欢迎您来到我们的官方网站。</p>
              <p>自 2017 年创立以来,我们一直致力于采集服务现场数据,始终坚持着“弄明白”服务过程的初心。</p>
              <p>2023 的大模型,2024 的人形机器人,这一系列的创新不仅证明了我们七年前对人机协同服务方向的准确判断,更是我们不断追求进步的见证。我希望我们的产品和坚持,能够在您的服务现场运营和管理中发挥重要作用,帮助您更好地评估合作伙伴,满足当前经济形势下降本增效管理要求。同时,我们也诚挚地邀请您相信,爱物管的用户将是第一批有机会实现人形机器人应用的企业之一!</p>
              <p>最后,作为一个在 IT、互联网行业摸爬滚打了 20 多年的老兵,我深知未来十年对于一个科技从业人员来说将是最幸福的十年。感恩能够在这个浪潮中参与其中,与您一同创造更美好的未来!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心团队 / FDE(不具名群体叙事) */}
      <section className="tm-band mist">
        <div className="wrap">
          <span className="tm-eyebrow">核心团队 · FDE</span>
          <h2 className="tm-h2">和你一起搭东西的那群人</h2>
          <p className="tm-sub">FDE,Forward Deployed Engineer,前线部署工程师。</p>
          <div className="tm-prose">
            <p>在启盟科技,真正到工作坊现场的,是 FDE 团队。他们不是来讲方案的,而是带着自己的电脑,坐在你旁边,打开你的数据,一行一行把 Agent 搭起来的人。</p>
            <p>这支团队是两种人的组合:一边是行业老兵——在物业与设施管理里待了很多年,知道一张工单背后真实发生了什么;另一边是 AI 工程师——清楚模型能做什么、不能做什么,以及怎么把它接进一套真实流程。</p>
            <p>技术侧,有曾任大众点评 / 百姓网 CTO 的技术合伙人;交付一侧,有主导过 500+ 个项目落地、服务数十家大客户的核心成员;财务与治理一侧,由具备四大会计师事务所与投资机构背景的负责人把关。</p>
            <p>两种人放在同一张桌子上,是有意为之。懂行业的人负责把问题问对,懂工程的人负责把它做出来。中间不隔着一层只会传话的销售。</p>
          </div>
          <p className="tm-note">现场只有两件事:你的真问题,和能把它做出来的人。</p>
        </div>
      </section>

      {/* 暗场签名段 */}
      <section className="tm-core">
        <div className="tm-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="tm-eyebrow on-dark">现场是怎样的</span>
          <h2 className="tm-h2 on-dark">同一张桌子,两种人</h2>
          <p className="tm-sub on-dark">懂行业的人负责把问题问对,懂工程的人负责把它做出来。</p>
          <div className="tm-twins">
            <div className="tm-twin">
              <span className="tm-twin-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V9l9-6 9 6v12" /><path d="M9 21v-6h6v6" /><path d="M3 13h18" /></svg>
              </span>
              <span className="tm-twin-tag">行业老兵</span>
              <h3>知道一张工单背后<br />真实发生了什么</h3>
              <p>在物业与设施管理里待了很多年,把问题问对,而不是把方案讲漂亮。</p>
            </div>
            <div className="tm-twin">
              <span className="tm-twin-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6l-5 6 5 6" /><path d="M16 6l5 6-5 6" /><path d="M13 4l-2 16" /></svg>
              </span>
              <span className="tm-twin-tag">AI 工程师</span>
              <h3>带着自己的电脑,<br />一行一行把它做出来</h3>
              <p>清楚模型能做什么、不能做什么,以及怎么把它接进一套真实流程。</p>
            </div>
          </div>
          <p className="tm-verdict">中间不隔着一层只会传话的销售,<span className="grad">现场只有真问题和做事的人</span></p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与设施管理的日常运营</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
