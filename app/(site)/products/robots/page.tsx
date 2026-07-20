import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";
import ProductCrumb from "../_crumb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/robots", {
  title: "机器人装备 · 室内清洁与四足巡检 — 启盟科技",
  description:
    "清洁、巡检这些日复一日的重复体力活,交给装备:室内清洁机器人(国内最小)室内公共场景全覆盖;四足巡检机器人适应台阶、斜坡、砂石路等复杂非结构化地形。人留出来,去做需要判断的事。",
});

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="robx">
      {/* ===== HERO ===== */}
      <section className="rob-hero">
        <div className="rob-grid" aria-hidden="true" />
        <div className="wrap rob-hero-top">
          <ProductCrumb name="机器人与智能装备" href="/products/robots" />
          <span className="rob-kicker">机器人装备<i>/</i>把重复的活交给装备</span>
          <h1 className="rob-h1">
            把重复的体力活<br /><span className="grad">交给装备</span>
          </h1>
          <p className="rob-lead">清洁、巡检这些日复一日的活，让装备接手。人留出来，去做那些需要判断的事。</p>
          <p className="rob-lead">机器人是 FMClaw 工具箱中的现场执行能力。业务工作流发出任务，机器人执行并回传结果。</p>
          <div className="rob-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#eq-1" className="btn btn-ghost">看两台装备 <Arrow /></a>
          </div>
        </div>
      </section>

      {/* ===== 装备一 · 室内清洁机器人 ===== */}
      <section className="rob-band mist" id="eq-1">
        <div className="wrap">
          <div className="rob-head">
            <span className="rob-eyebrow">装备一 · 室内清洁机器人</span>
            <h2 className="rob-h2">室内公共场景，全覆盖 <span className="rob-hl">国内最小机器人</span></h2>
          </div>
          <div className="rob-grid2">
            <figure className="rob-photo contain">
              <Image src="/images/robot-quadruped.jpg" alt="室内清洁机器人" width={1110} height={939} />
            </figure>
            <div className="rob-info">
              <p className="rob-rlead">室内公共 FM 场景全覆盖，小巧灵活、噪声低、作业无感知。</p>
              <p className="rob-rdesc">支持尘推、吸尘、湿拖、洗地四种模式；集充电、加排水、集尘、烘干于一体，全能基站与智能互联。</p>
              <div className="rob-feat">
                <div className="rob-fi"><div className="rob-ft">一机多能</div><p>尘推 / 吸尘 / 湿拖 / 洗地四模式灵活切换。</p></div>
                <div className="rob-fi"><div className="rob-ft">智能识别</div><p>智能避障、灵敏绕行、防跌落。</p></div>
                <div className="rob-fi"><div className="rob-ft">智能互联</div><p>智能乘坐电梯跨层作业、通过闸机无障碍通行。</p></div>
                <div className="rob-fi"><div className="rob-ft">全能基站</div><p>集充电 / 自动加排水 / 集尘 / 烘干于一体。</p></div>
              </div>
            </div>
          </div>
          <div className="rob-params">
            <div className="rob-pv"><div className="rob-n grad">17.5kg</div><div className="rob-l">整机重量</div></div>
            <div className="rob-pv"><div className="rob-n grad">300–700㎡/h</div><div className="rob-l">清洁效率</div></div>
            <div className="rob-pv"><div className="rob-n grad">4h</div><div className="rob-l">续航时长</div></div>
            <div className="rob-pv"><div className="rob-n grad">≤70dB</div><div className="rob-l">工作噪声（洗地模式）</div></div>
            <div className="rob-pv"><div className="rob-n grad">51×52×27.8cm</div><div className="rob-l">尺寸</div></div>
          </div>
        </div>
      </section>

      {/* ===== 装备二 · 四足巡检机器人 ===== */}
      <section className="rob-band">
        <div className="wrap">
          <div className="rob-head">
            <span className="rob-eyebrow">装备二 · 四足巡检机器人</span>
            <h2 className="rob-h2">复杂地形，一台搞定 <span className="rob-hl">特种作业</span></h2>
          </div>
          <div className="rob-grid2 rev">
            <figure className="rob-photo contain">
              <Image src="/images/robot-xj.png" alt="四足巡检机器人" width={880} height={772} />
            </figure>
            <div className="rob-info">
              <p className="rob-rlead">园区四足具身智能，集清洁、违停、消防、安保多功能于一体，适应复杂非结构化环境。</p>
              <p className="rob-rdesc">稳定穿越台阶、斜坡、砂石路等非结构化地形。</p>
              <div className="rob-feat">
                <div className="rob-fi"><div className="rob-ft">多模态自主导航</div><p>多传感融合，自主规划路径。</p></div>
                <div className="rob-fi"><div className="rob-ft">动态避绕障</div><p>识别移动障碍，实时绕行。</p></div>
                <div className="rob-fi"><div className="rob-ft">自主回充</div><p>电量不足自动返回充电。</p></div>
                <div className="rob-fi"><div className="rob-ft">核心器件自主可控</div><p>关键部件自主可控。</p></div>
                <div className="rob-fi"><div className="rob-ft">支持私有化部署</div><p>可部署在本地内网环境。</p></div>
              </div>
            </div>
          </div>
          <div className="rob-params">
            <div className="rob-pv"><div className="rob-n grad">40KG</div><div className="rob-l">持续负载</div></div>
            <div className="rob-pv"><div className="rob-n grad">&gt;6h</div><div className="rob-l">带载续航</div></div>
            <div className="rob-pv"><div className="rob-n grad">30°</div><div className="rob-l">爬坡角度</div></div>
            <div className="rob-pv"><div className="rob-n grad">IP66</div><div className="rob-l">防护等级</div></div>
            <div className="rob-pv"><div className="rob-n grad">90×53×60cm</div><div className="rob-l">尺寸</div></div>
          </div>
        </div>
      </section>

      {/* ===== END CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与设施管理的日常运营</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <p className="reveal" style={{ fontSize: 14 }}>
            <Link href="/products/fmclaw/connectors" style={{ color: "#3fd9b8", fontWeight: 600 }}>查看工具箱 →</Link>
            {" · "}
            <Link href="/products/fmclaw" style={{ color: "#3fd9b8", fontWeight: 600 }}>查看 FMClaw 产品总览 →</Link>
          </p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
