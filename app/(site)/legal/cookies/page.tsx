import Link from "next/link";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("/legal/cookies", {
  title: "Cookie 声明 | 启盟科技",
  description:
    "启盟科技 · FMClaw™ Cookie 声明。我们如何使用 Cookie 及同类技术、用途与如何管理。本页为占位文本,最终以正式版本为准。",
});

export default function Page() {
  return (
    <main className="legalx">
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap">
          <div className="crumb reveal">
            <Link href="/">首页</Link> / 法务 / Cookie 声明
          </div>
          <span className="eyebrow reveal">法务</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>Cookie 声明</h1>
          <p className="lead reveal">
            本 Cookie 声明说明启盟科技及其关联方(以下简称"我们")在您访问本网站及使用 FMClaw™ 相关服务时,如何使用 Cookie 及同类技术。本页内容为占位文本,仅供原型展示,最终以正式发布的版本为准。
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="band lg-body">
        <div className="wrap">
          <article className="prose reveal">
            <p className="lg-updated reveal">最近更新:本页为占位说明,以正式版本为准</p>

            <h2>一、什么是 Cookie</h2>
            <p>Cookie 是网站在您访问时存储在您设备上的小型文本文件。它可以帮助网站记住您的偏好与状态,使您在再次访问时获得更连贯的体验。除 Cookie 外,我们可能使用本地存储等同类技术,本声明所称 Cookie 一并包括此类技术。</p>

            <h2>二、用途</h2>
            <p>我们使用 Cookie 主要用于:保障网站的基本运行与安全;记住您的浏览偏好与设置;以及在取得您同意的前提下,统计与分析网站访问情况,以改进内容与体验。我们不会使用 Cookie 收集与上述目的无关的信息。</p>

            <h2>三、如何管理</h2>
            <p>您可以通过浏览器设置管理或删除 Cookie,包括拒绝部分或全部 Cookie。请注意,禁用某些必要的 Cookie 可能影响网站的部分功能与体验。具体管理方式因浏览器而异,可参考您所使用浏览器的帮助说明。本页为占位说明,具体内容最终以正式版本为准。</p>

            <p style={{ marginTop: "44px", color: "var(--mut)" }}>
              如对本声明有任何疑问,欢迎通过<Link href="/contact">联系我们</Link>与我们沟通。
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
