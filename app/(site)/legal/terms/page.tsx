import Link from "next/link";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/legal/terms", {
  title: "服务条款 — 启盟科技",
  description:
    "启盟科技 · FMClaw™ 服务条款。服务范围、使用约定、责任限制、知识产权与变更终止。本页为占位文本,最终以正式版本为准。",
});

export default function Page() {
  return (
    <main className="legalx">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal">
            <Link href="/">首页</Link> / 法务 / 服务条款
          </div>
          <span className="eyebrow reveal">法务</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>服务条款</h1>
          <p className="lead reveal">
            本服务条款(以下简称"本条款")由您与启盟科技及其关联方(以下简称"我们")就使用 FMClaw™ 平台及相关服务(以下简称"服务")达成。在使用服务前,请您完整阅读并理解本条款的全部内容。
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="band lg-body">
        <div className="wrap">
          <article className="prose reveal">
            <p className="lg-updated reveal">最近更新:本页为占位说明,以正式版本为准</p>

            <p>本页内容为占位文本,仅供原型展示,最终以正式发布的版本为准。</p>

            <h2>一、服务范围</h2>
            <p>我们向您提供的服务包括但不限于 FMClaw™ AI 平台、相关 IoT 与硬件设备、配套工具及技术支持。具体服务内容、功能模块与可用范围,以双方另行签署的协议或我们在平台内公布的说明为准。我们可能根据业务需要,对服务的形式与内容进行调整。</p>

            <h2>二、使用约定</h2>
            <p>您承诺在合法、合规的前提下使用服务,不得利用服务从事任何违反法律法规、损害他人合法权益或干扰服务正常运行的行为。您应妥善保管账号与凭证,并对账号下发生的活动负责。如发现任何未经授权的使用,请及时通知我们。</p>

            <h2>三、责任限制</h2>
            <p>在法律允许的范围内,服务按"现状"与"可用"基础提供。对于因不可抗力、第三方原因或您自身操作不当导致的损失,我们不承担责任。本条款不排除或限制依法不可排除或限制的责任。</p>

            <h2>四、知识产权</h2>
            <p>服务及其相关的软件、文档、商标、标识等知识产权,均归我们或相应权利人所有。未经书面许可,您不得擅自复制、修改、传播或用于商业目的。您在使用服务过程中产生的数据,其权属按双方另行约定处理。</p>

            <h2>五、变更与终止</h2>
            <p>我们可能不时更新本条款,更新后的条款将在平台内公布并自公布之日起生效。如您不同意变更内容,应停止使用服务。在符合法律法规及双方约定的情况下,任一方可依约终止服务。本页为占位说明,具体条款最终以正式版本为准。</p>

            <p style={{ marginTop: "44px", color: "var(--mut)" }}>
              如对本条款有任何疑问,欢迎通过<Link href="/contact">联系我们</Link>与我们沟通。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
