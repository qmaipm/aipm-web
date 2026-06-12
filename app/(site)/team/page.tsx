import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";

export const metadata: Metadata = {
  title: "团队 · 创始人滕一帆与 FDE 工程师团队 — 启盟科技",
  description:
    "启盟科技由创始人 & CEO 滕一帆带领,到现场的是行业老兵与 AI 工程师组成的 FDE 前线部署工程师团队,不是来讲方案的销售;背后有蓝驰创投、微光创投支持。",
};

export default function Page() {
  return (
    <main>
      {/* HERO（基调保留） */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <span className="eyebrow reveal">团队</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>到现场的,是工程师,<br />不是 PPT 销售</h1>
          <p className="lead reveal">
            和你一起坐下来、打开数据、把 Agent 搭起来的人,自己写代码,也懂这个行业怎么运转。
          </p>
        </div>
      </section>

      {/* 创始人（仅实名滕一帆一人） */}
      <section className="band founders">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">创始人</span>
            <h2 className="reveal">把公司带到这里的人。</h2>
          </div>
          <div className="grid c2" style={{ marginTop: 48 }}>
            <div className="card reveal">
              <div className="avatar" style={{ background: "linear-gradient(135deg,var(--blue),var(--purple))" }}>滕</div>
              <h3>滕一帆</h3>
              <div className="role">创始人 &amp; CEO</div>
              <p>算法工程师出身,曾在中科院下属高科技企业从事算法研发。此后是一名连续创业者,也曾在一家 IT 500 强企业担任智慧城市解决方案的区域销售总监。算法、产品与一线市场,他都待过——这让他既清楚技术能做到哪,也清楚客户真正要的是什么。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 核心团队 / FDE（不具名群体叙事） */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">核心团队 · FDE</span>
            <h2 className="reveal">和你一起搭东西的那群人。</h2>
            <p className="sub reveal">FDE,Forward Deployed Engineer,前线部署工程师。</p>
          </div>
          <div className="prose reveal" style={{ marginTop: 36 }}>
            <p>在启盟,真正到工作坊现场的,是 FDE 团队。他们不是来讲方案的,而是带着自己的电脑,坐在你旁边,打开你的数据,一行一行把 Agent 搭起来的人。</p>
            <p>这支团队是两种人的组合:一边是行业老兵——在物业与设施管理里待了很多年,知道一张工单背后真实发生了什么;另一边是 AI 工程师——清楚模型能做什么、不能做什么,以及怎么把它接进一套真实流程。</p>
            <p>分量也藏在这群人里:技术一侧,有曾任大众点评 / 百姓网 CTO 的技术合伙人;交付一侧,有主导过 500+ 个项目落地、服务数十家大客户的核心成员;财务与治理一侧,则由具备四大会计师事务所与投资机构背景的负责人把关。我们更愿意用他们做过的事来介绍他们,而不是先把头衔和名字摆上去。</p>
            <p>两种人放在同一张桌子上,是有意为之。懂行业的人负责把问题问对,懂工程的人负责把它做出来。中间不隔着一层只会传话的销售。</p>
          </div>
          <p className="fde-note reveal">现场只有两件事:你的真问题,和能把它做出来的人。</p>
        </div>
      </section>

      {/* 投资方背书 */}
      <section className="band backers">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">投资方</span>
            <h2 className="reveal">站在我们身后的机构。</h2>
            <p className="sub reveal">只列公开可查的机构背景与代表案例,不做渲染。</p>
          </div>
          <div className="grid c2" style={{ marginTop: 48 }}>
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }} />
              <h3>蓝驰创投</h3>
              <div className="en">Lanchi Ventures</div>
              <div className="aum">管理资产逾 150 亿元</div>
              <p>代表 AI / 硬科技投资:理想汽车、高仙机器人、Genspark、月之暗面。</p>
            </div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }} />
              <h3>微光创投</h3>
              <div className="en">WeLight Capital</div>
              <div className="aum">管理资产逾 30 亿元 · 创始合伙人为腾讯前高管</div>
              <p>代表 AI / 智能硬件投资:小鹏汽车、奇朵智能、纬钛机器人、鉴智机器人。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 顾问委员会（保留克制处理） */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">顾问委员会</span>
            <h2 className="reveal">如有,稍后公布。</h2>
            <p className="sub reveal">我们更愿意在确定之后再说,而不是先把名字摆上去。</p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与<br />设施管理的日常运营。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary" style={{ padding: "16px 32px", fontSize: 16.5 }}>预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
