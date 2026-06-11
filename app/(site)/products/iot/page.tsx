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
          <span className="eyebrow reveal">IoT 物理世界感知系统</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>懂语言、懂数据,<br />更懂物理世界</h1>
          <p className="lead reveal">通用 Agent(如 Genspark、Manus)擅长语言与数据;但物业与设施管理,发生在真实的物理世界。FMClaw 多了一层能力——把楼宇、设备、环境、人车都"看见"。</p>
          <p className="reveal" style={{ marginTop: "18px", color: "var(--mut)", maxWidth: "var(--measure)" }}>越靠近物理世界越难做,而这正是行业级平台的护城河。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMAI 工作坊 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
            <Link href="/products/fmclaw" className="btn btn-ghost">看它怎么接进平台 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
          </div>
        </div>
      </section>

      {/* 多的那层能力 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">多的那一层</span>
            <h2 className="reveal">通用 Agent 到此为止,<br />我们再往前一步。</h2>
          </div>
          <div className="contrast reveal">
            <div className="cpane gen">
              <div className="lab">通用 Agent</div>
              <h3>懂语言 · 懂数据</h3>
              <ul>
                <li>读写文本、理解意图、组织信息</li>
                <li>调用工具、处理结构化数据</li>
                <li>在数字世界里推理与协作</li>
              </ul>
            </div>
            <div className="cmid"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div className="cpane fm">
              <div className="lab">FMClaw 多的一层</div>
              <h3>更懂物理世界</h3>
              <ul>
                <li>感知服务有没有真的发生</li>
                <li>感知设备、环境、人车的实时状态</li>
                <li>把物理世界的事实,接进同一个平台</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 四个维度 · 总览 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">物理世界感知 · 四个维度</span>
            <h2 className="reveal">从我们独有的,到最通用的。</h2>
            <p className="sub reveal">服务、设备、环境、视觉——四层叠起来,就是一栋楼、一座园区此刻真实的样子。</p>
          </div>
        </div>
      </section>

      {/* ① 服务感知 */}
      <section className="band">
        <div className="wrap">
          <div className="dim-head">
            <span className="eyebrow reveal dim-eye">维度一 · 服务感知 <span className="self-badge">启盟自研</span></span>
            <h2 className="reveal" style={{ marginTop: "14px" }}>服务,到底有没有发生。</h2>
            <p className="perceive reveal">感知<b>服务在现场到底有没有发生、是怎么发生的</b>——由两类自研传感器构成。</p>
          </div>

          <div className="scards">
            <div className="scard reveal">
              <div className="stag">空间传感器 · Spatial</div>
              <h4>空间是否被服务到</h4>
              <p className="role">感知空间是否被服务到、被使用的状态。</p>
              <div className="sframe"><Image src="/images/sensor-spatial.png" alt="空间传感器" width={424} height={562} className="sensor-img" /></div>
              <ul className="spec">
                <li>约 39×15.5mm 紧凑设计</li>
                <li>30 秒内完成单个安装</li>
                <li>约 3 年超长续航</li>
                <li>蓝牙广播</li>
                <li>不收集其它数据</li>
              </ul>
            </div>

            <div className="scard reveal">
              <div className="stag">行为传感器 · Behavior</div>
              <h4>服务行为与轨迹</h4>
              <p className="role">轻量化佩戴,感知一线人员的服务行为与轨迹。</p>
              <div className="sframe"><Image src="/images/sensor-behavior.png" alt="行为传感器" width={690} height={582} className="sensor-img" /></div>
              <ul className="spec">
                <li>约 12g 极轻佩戴</li>
                <li>约 50×20×8mm</li>
                <li>约 48h 续航</li>
                <li>蓝牙广播</li>
                <li>不收集其它数据</li>
              </ul>
            </div>
          </div>

          <h3 className="reveal" style={{ marginTop: "48px", fontSize: "19px", fontWeight: 600 }}>部署流程</h3>
          <div className="deploy reveal">
            <div className="dstep"><div className="dn">STEP 1</div><p>便捷部署、无需布线。</p></div>
            <div className="dstep"><div className="dn">STEP 2</div><p>简单易用、无需培训。</p></div>
            <div className="dstep"><div className="dn">STEP 3</div><p>工作后充电,上传数据。</p></div>
            <div className="dstep"><div className="dn">STEP 4</div><p>汇入大数据计算,形成服务记录。</p></div>
          </div>
          <div className="reveal" style={{ marginTop: "14px" }}>
            <Image src="/images/deploy-flow.png" alt="部署流程" width={1596} height={266} style={{ width: "100%", height: "auto", borderRadius: 12 }} />
          </div>
        </div>
      </section>

      {/* ② 设备感知 */}
      <section className="band alt">
        <div className="wrap">
          <div className="dim-head">
            <span className="eyebrow reveal">维度二 · 设备感知</span>
            <h2 className="reveal" style={{ marginTop: "14px" }}>设备本身,转得正不正常。</h2>
            <p className="perceive reveal">感知<b>机电设备本身的运行状态</b>——它好不好、转得正不正常。</p>
          </div>
          <p className="sub reveal" style={{ marginTop: "26px", maxWidth: "var(--measure)" }}>可接入主流 BA(楼宇自控)系统,把以下设备的运行数据纳入感知:</p>
          <div className="chips reveal">
            <span>暖通 HVAC</span><span>照明</span><span>电梯(运行状态)</span><span>给排水</span><span>能耗仪表</span><span>消防联动</span>
          </div>
          <div className="devshots reveal">
            <figure className="devshot">
              <div className="ph-img" style={{ backgroundImage: "linear-gradient(0deg,rgba(21,20,15,.28),rgba(21,20,15,.04)), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=70&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
              <figcaption className="cap"><b>暖通 · 给排水机房</b>机房运行数据接入 BA 系统</figcaption>
            </figure>
            <figure className="devshot">
              <div className="ph-img" style={{ backgroundImage: "linear-gradient(0deg,rgba(21,20,15,.28),rgba(21,20,15,.04)), url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=70&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
              <figcaption className="cap"><b>配电 · 能耗</b>电力与能耗实时采集计量</figcaption>
            </figure>
            <figure className="devshot">
              <div className="ph-img" style={{ backgroundImage: "linear-gradient(0deg,rgba(21,20,15,.28),rgba(21,20,15,.04)), url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=70&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
              <figcaption className="cap"><b>电梯 · 消防联动</b>现场设备运行状态全程在线</figcaption>
            </figure>
          </div>
          <p className="value-line reveal">设备的异常,在停机或故障之前,就被看见。</p>
        </div>
      </section>

      {/* ③ 环境感知 */}
      <section className="band">
        <div className="wrap">
          <div className="dim-head">
            <span className="eyebrow reveal">维度三 · 环境感知</span>
            <h2 className="reveal" style={{ marginTop: "14px" }}>此刻,这个空间是什么状况。</h2>
            <p className="perceive reveal">感知<b>这个空间此刻是什么状况,以及人与车此刻在哪儿、怎么流动</b>。</p>
          </div>
          <div className="subgroup reveal">
            <div className="gt">环境态势</div>
            <p>温度、湿度、空气质量、噪声等——空间是否舒适,变成可读的数。</p>
          </div>
          <div className="subgroup reveal">
            <div className="gt">人车态势</div>
            <p>通过对接门禁系统、停车场系统、电梯梯控系统,感知人与车的分布与实时状态(人流、车流、通行)。</p>
          </div>
          <div className="edge reveal">边界提示:这里的电梯梯控,用于感知<b>"人怎么流动"</b>;与「设备感知」里电梯<b>设备本身的运行状态</b>不同,两者分属不同维度。</div>
        </div>
      </section>

      {/* ④ 视觉感知 */}
      <section className="band alt">
        <div className="wrap">
          <div className="dim-head">
            <span className="eyebrow reveal">维度四 · 视觉感知</span>
            <h2 className="reveal" style={{ marginTop: "14px" }}>用视觉,补齐看不到的细节。</h2>
            <p className="perceive reveal">用视觉<b>补齐前几类看不到的现场细节</b>。</p>
          </div>
          <p className="sub reveal" style={{ marginTop: "26px", maxWidth: "var(--measure)" }}>接入视频监控、摄像头等,把现场画面纳入感知,可用于巡检识别、异常发现等。</p>
          <div className="chips reveal">
            <span>视频监控</span><span>摄像头</span><span>巡检识别</span><span>异常发现</span>
          </div>
        </div>
      </section>

      {/* 怎么接入平台 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">怎么接入平台</span>
            <h2 className="reveal">设备只管感知,<br />怎么用,交给平台。</h2>
          </div>
          <div className="ingest reveal">
            <span className="lab">物理感知 → 平台</span>
            <p>四类物理感知采到的数据,统一接进 <Link href="/products/fmclaw">FMClaw™ 平台</Link> 的数据集市,成为日常运营可查、可调的资产。</p>
            <span className="arrow">IoT <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg> FMClaw™</span>
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
