import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">机器人装备</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>把重复的体力活,<br />交给装备</h1>
          <p className="lead reveal">清洁、巡检这些日复一日的活,让装备接手。人留出来,去做那些需要判断的事。</p>
        </div>
      </section>

      {/* ① 室内清洁机器人 */}
      <section className="band">
        <div className="wrap" style={{ "--mc": "var(--blue)" } as React.CSSProperties}>
          <div className="sec-head" style={{ marginBottom: "10px" }}>
            <span className="eyebrow reveal">装备一 · 室内清洁机器人</span>
            <h2 className="reveal" style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>室内公共场景,全覆盖。 <span className="hl reveal">国内最小机器人</span></h2>
          </div>
          <div className="rgrid">
            <figure className="rphoto reveal">
              <Image src="/images/robot-indoor.jpg" alt="室内清洁机器人" width={1086} height={1016} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </figure>
            <div>
              <p className="rlead reveal">室内公共 FM 场景全覆盖,小巧灵活、噪声低、作业无感知。</p>
              <p className="rdesc reveal">支持尘推、吸尘、湿拖、洗地四种模式;集充电、加排水、集尘、烘干于一体,全能基站与智能互联。</p>
              <div className="feat">
                <div className="fi reveal"><div className="ft">一机多能</div><p>尘推 / 吸尘 / 湿拖 / 洗地四模式灵活切换。</p></div>
                <div className="fi reveal"><div className="ft">智能识别</div><p>智能避障、灵敏绕行、防跌落。</p></div>
                <div className="fi reveal"><div className="ft">智能互联</div><p>智能乘坐电梯跨层作业、通过闸机无障碍通行。</p></div>
                <div className="fi reveal"><div className="ft">全能基站</div><p>集充电 / 自动加排水 / 集尘 / 烘干于一体。</p></div>
              </div>
            </div>
          </div>
          <div className="params reveal">
            <div className="pv"><div className="n">17.5kg</div><div className="l">整机重量</div></div>
            <div className="pv"><div className="n">300–700㎡/h</div><div className="l">清洁效率</div></div>
            <div className="pv"><div className="n">4h</div><div className="l">续航时长</div></div>
            <div className="pv"><div className="n">≤70dB</div><div className="l">工作噪声(洗地模式)</div></div>
            <div className="pv"><div className="n">51×52×27.8cm</div><div className="l">尺寸</div></div>
          </div>
        </div>
      </section>

      {/* ② 四足巡检机器人 */}
      <section className="band alt">
        <div className="wrap" style={{ "--mc": "var(--green)" } as React.CSSProperties}>
          <div className="sec-head" style={{ marginBottom: "10px" }}>
            <span className="eyebrow reveal">装备二 · 四足巡检机器人</span>
            <h2 className="reveal" style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>复杂地形,一台搞定。 <span className="hl reveal">特种作业</span></h2>
          </div>
          <div className="rgrid rev">
            <figure className="rphoto reveal">
              <Image src="/images/robot-quadruped.jpg" alt="四足巡检机器人" width={1110} height={939} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </figure>
            <div>
              <p className="rlead reveal">园区四足具身智能,集清洁、违停、消防、安保多功能于一体,适应复杂非结构化环境。</p>
              <p className="rdesc reveal">稳定穿越台阶、斜坡、砂石路等非结构化地形。</p>
              <div className="feat">
                <div className="fi reveal"><div className="ft">多模态自主导航</div><p>多传感融合,自主规划路径。</p></div>
                <div className="fi reveal"><div className="ft">动态避绕障</div><p>识别移动障碍,实时绕行。</p></div>
                <div className="fi reveal"><div className="ft">自主回充</div><p>电量不足自动返回充电。</p></div>
                <div className="fi reveal"><div className="ft">核心器件自主可控</div><p>关键部件自主可控。</p></div>
                <div className="fi reveal"><div className="ft">支持私有化部署</div><p>可部署在本地内网环境。</p></div>
              </div>
            </div>
          </div>
          <div className="params reveal">
            <div className="pv"><div className="n">40KG</div><div className="l">持续负载</div></div>
            <div className="pv"><div className="n">&gt;6h</div><div className="l">带载续航</div></div>
            <div className="pv"><div className="n">30°</div><div className="l">爬坡角度</div></div>
            <div className="pv"><div className="n">IP66</div><div className="l">防护等级</div></div>
            <div className="pv"><div className="n">约 900×530×600mm</div><div className="l">尺寸</div></div>
          </div>
        </div>
      </section>

      {/* END CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与<br />设施管理的日常运营。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMAI 工作坊 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
