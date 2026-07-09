import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";

export const metadata: Metadata = {
  title: "IoT 物理世界感知 · 服务感知是头牌 — 启盟科技",
  description:
    "FMClaw 的物理世界感知分四类:服务感知、设备感知、环境感知、视觉感知。其中服务感知——感知一次服务到底有没有做、做了多久、做得到不到位——是启盟科技独有、别人做不到的能力。四类数据统一接进 FMClaw 平台数据集市。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="iotx">
      {/* ===== HERO ===== */}
      <section className="iot-hero">
        <div className="iot-grid" aria-hidden="true" />
        <div className="wrap iot-hero-top">
          <span className="iot-kicker">IoT 物理世界感知系统<i>/</i>越靠近物理世界越难</span>
          <h1 className="iot-h1">
            懂语言、懂数据<br /><span className="grad">更懂物理世界</span>
          </h1>
          <p className="iot-lead">
            通用 Agent（如 Genspark、Manus）擅长语言与数据；但物业与设施管理，发生在真实的物理世界。FMClaw 多了一层能力——把楼宇、设备、环境、人车都<b>看见</b>。
          </p>
          <p className="iot-note">越靠近物理世界越难做，而这正是行业级平台的护城河。</p>
          <div className="iot-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <Link href="/products/fmclaw" className="btn btn-ghost">看它怎么接进平台 <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* ===== 多的那层能力 · 暗场签名(对标通用 Agent) ===== */}
      <section className="iot-core">
        <div className="iot-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="iot-eyebrow on-dark">多的那一层</span>
          <h2 className="iot-h2 on-dark">通用 Agent 到此为止，我们再往前一步</h2>
          <div className="iot-contrast">
            <div className="iot-cpane gen">
              <span className="iot-clab">通用 Agent</span>
              <p className="iot-cline">懂语言 · 懂数据</p>
              <ul>
                <li>读写文本、理解意图、组织信息</li>
                <li>调用工具、处理结构化数据</li>
                <li>在数字世界里推理与协作</li>
              </ul>
            </div>
            <div className="iot-cmid" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div className="iot-cpane fm">
              <span className="iot-clab">FMClaw 多的一层</span>
              <p className="iot-cline grad">更懂物理世界</p>
              <ul>
                <li>感知服务有没有真的发生</li>
                <li>感知设备、环境、人车的实时状态</li>
                <li>把物理世界的事实，接进同一个平台</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 维度一 · 服务感知(头牌) ===== */}
      <section className="iot-band">
        <div className="wrap">
          <div className="iot-dimhead">
            <span className="iot-eyebrow">维度一 · 服务感知 <span className="iot-self">启盟科技独有</span></span>
            <h2 className="iot-h2">服务，到底有没有发生</h2>
            <p className="iot-perceive">感知<b>一次保洁、巡检、维修、安防服务到底有没有真的发生、发生了多久、做得到不到位</b>——由两类自研传感器构成。</p>
            <p className="iot-value">这是别人做不到、我们独有的一层：把「服务」这件原本看不见的事，变成可记录、可证、可追溯的数据。</p>
          </div>

          <div className="iot-scards">
            <div className="iot-scard">
              <span className="iot-stag">空间传感器 · Spatial</span>
              <h4>空间是否被服务到</h4>
              <p className="iot-role">感知空间是否被服务到、被使用的状态。</p>
              <div className="iot-sframe"><Image src="/images/sensor-spatial.png" alt="空间传感器" width={424} height={562} className="iot-sensor-img" /></div>
              <ul className="iot-spec">
                <li>约 39×15.5mm 紧凑设计</li>
                <li>30 秒内完成单个安装</li>
                <li>约 3 年超长续航</li>
                <li>蓝牙广播</li>
                <li>不收集其它数据</li>
              </ul>
            </div>

            <div className="iot-scard">
              <span className="iot-stag">行为传感器 · Behavior</span>
              <h4>服务行为与轨迹</h4>
              <p className="iot-role">轻量化佩戴，感知一线人员的服务行为与轨迹。</p>
              <div className="iot-sframe"><Image src="/images/sensor-behavior.png" alt="行为传感器" width={690} height={582} className="iot-sensor-img" /></div>
              <ul className="iot-spec">
                <li>约 12g 极轻佩戴</li>
                <li>约 50×20×8mm</li>
                <li>约 48h 续航</li>
                <li>蓝牙广播</li>
                <li>不收集其它数据</li>
              </ul>
            </div>
          </div>

          <h3 className="iot-deploy-h">部署流程</h3>
          <div className="iot-deploy">
            <div className="iot-dstep"><span className="iot-dn">STEP 1</span><p>便捷部署、无需布线。</p></div>
            <div className="iot-dstep"><span className="iot-dn">STEP 2</span><p>简单易用、无需培训。</p></div>
            <div className="iot-dstep"><span className="iot-dn">STEP 3</span><p>工作后充电，上传数据。</p></div>
            <div className="iot-dstep"><span className="iot-dn">STEP 4</span><p>汇入大数据计算，形成服务记录。</p></div>
          </div>
          <div className="iot-deploy-img">
            <Image src="/images/deploy-flow.png" alt="部署流程" width={1596} height={266} style={{ width: "100%", height: "auto", borderRadius: 12 }} />
          </div>
        </div>
      </section>

      {/* ===== 维度二 · 设备感知 ===== */}
      <section className="iot-band mist">
        <div className="wrap">
          <div className="iot-dimhead">
            <span className="iot-eyebrow">维度二 · 设备感知</span>
            <h2 className="iot-h2">设备本身，转得正不正常</h2>
            <p className="iot-perceive">感知<b>机电设备本身的运行状态</b>——它好不好、转得正不正常。</p>
          </div>
          <p className="iot-sub">可接入主流 BA（楼宇自控）系统，把以下设备的运行数据纳入感知：</p>
          <div className="iot-chips">
            <span>暖通 HVAC</span><span>照明</span><span>电梯（运行状态）</span><span>给排水</span><span>能耗仪表</span><span>消防联动</span>
          </div>
          <div className="iot-illus">
            <div className="iot-illus-card">
              <div className="iot-illus-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="9" cy="12" r="3" /><path d="M16 10.5v3M19 10.5v3" /></svg></div>
              <div className="iot-cap"><b>暖通 · 给排水机房</b><span>机房运行数据接入 BA 系统</span></div>
            </div>
            <div className="iot-illus-card">
              <div className="iot-illus-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M13 6.5l-3.5 6H12l-1 5 3.5-6H12l1-4.5Z" /></svg></div>
              <div className="iot-cap"><b>配电 · 能耗</b><span>电力与能耗实时采集计量</span></div>
            </div>
            <div className="iot-illus-card">
              <div className="iot-illus-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M12 3v18" /><path d="M7 9l1.5-2 1.5 2M14 15l1.5 2 1.5-2" /></svg></div>
              <div className="iot-cap"><b>电梯 · 消防联动</b><span>现场设备运行状态全程在线</span></div>
            </div>
          </div>
          <p className="iot-value">设备的异常，在停机或故障之前，就被看见。</p>
        </div>
      </section>

      {/* ===== 维度三 · 环境感知 ===== */}
      <section className="iot-band">
        <div className="wrap">
          <div className="iot-dimhead">
            <span className="iot-eyebrow">维度三 · 环境感知</span>
            <h2 className="iot-h2">此刻，这个空间是什么状况</h2>
            <p className="iot-perceive">感知<b>这个空间此刻是否舒适，以及人与车此刻在哪儿、怎么流动</b>。</p>
          </div>
          <div className="iot-env">
            <div className="iot-env-col">
              <div className="iot-env-lead">空间是否舒适</div>
              <p className="iot-env-note">温度、湿度、空气质量，让舒适从主观感受变成可读的数。</p>
              <div className="iot-env-row">
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0Z" /></svg></div>
                  <div className="iot-ei-name">温度</div>
                </div>
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5s5 5.2 5 8.7a5 5 0 0 1-10 0c0-3.5 5-8.7 5-8.7Z" /></svg></div>
                  <div className="iot-ei-name">湿度</div>
                </div>
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10.5A2.5 2.5 0 1 0 11 5.5" /><path d="M3 12h14a2.5 2.5 0 1 1-2.5 2.5" /><path d="M3 16h8" /></svg></div>
                  <div className="iot-ei-name">空气质量</div>
                </div>
              </div>
            </div>
            <div className="iot-env-col">
              <div className="iot-env-lead">人与车在哪儿、怎么流动</div>
              <p className="iot-env-note">对接停车场与门禁系统，感知人车此刻的分布与通行。</p>
              <div className="iot-env-row">
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9.5 16V8h3a2.5 2.5 0 0 1 0 5h-3" /></svg></div>
                  <div className="iot-ei-name">停车</div>
                </div>
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" /><path d="M3.5 21h17" /><circle cx="13" cy="12" r="1" /></svg></div>
                  <div className="iot-ei-name">门禁</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 维度四 · 视觉感知 ===== */}
      <section className="iot-band mist">
        <div className="wrap">
          <div className="iot-dimhead">
            <span className="iot-eyebrow">维度四 · 视觉感知</span>
            <h2 className="iot-h2">用视觉，补齐看不到的细节</h2>
            <p className="iot-perceive">用视觉<b>补齐前几类看不到的现场细节</b>——来源包括视频监控、机器人与无人机。</p>
          </div>
          <div className="iot-illus">
            <div className="iot-illus-card">
              <div className="iot-illus-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8l13-3 1.1 4-13 3z" /><path d="M5 11.5l-1.5 5.5" /><path d="M16.6 9.2l4 1.1" /><circle cx="8.5" cy="9" r="1" /></svg></div>
              <div className="iot-cap"><b>视频监控系统</b><span>把现场画面纳入感知</span></div>
            </div>
            <div className="iot-illus-card">
              <div className="iot-illus-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="8" width="14" height="11" rx="2.5" /><circle cx="9.5" cy="13" r="1.1" /><circle cx="14.5" cy="13" r="1.1" /><path d="M12 8V5.5" /><circle cx="12" cy="4.3" r="1" /><path d="M5 13H3.2M20.8 13H19" /></svg></div>
              <div className="iot-cap"><b>机器人</b><span>移动巡检、补盲采集</span></div>
            </div>
            <div className="iot-illus-card">
              <div className="iot-illus-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="7" r="2" /><circle cx="19" cy="7" r="2" /><path d="M7 8.5l2.5 2.5M17 8.5l-2.5 2.5" /><rect x="9.5" y="10.5" width="5" height="4.2" rx="1.2" /><path d="M10 18l2-3.3 2 3.3" /></svg></div>
              <div className="iot-cap"><b>无人机</b><span>高处、大面积巡查</span></div>
            </div>
          </div>
          <p className="iot-sub">这些视觉来源可用于巡检识别、异常发现，把现场看不到的细节也补进感知。</p>
        </div>
      </section>

      {/* ===== 怎么接入平台 ===== */}
      <section className="iot-band">
        <div className="wrap">
          <span className="iot-eyebrow">怎么接入平台</span>
          <h2 className="iot-h2">设备只管感知，怎么用交给平台</h2>
          <p className="iot-sub iot-ingest-lead">四类感知采到的数据，统一接进 <Link href="/products/fmclaw">FMClaw™ 平台</Link> 的数据集市，成为日常运营可查、可调的资产。</p>

          <div className="iot-pipe">
            {/* 源 · 物理感知 */}
            <div className="iot-pipe-stage src">
              <span className="iot-pipe-lab">物理感知 · IoT</span>
              <div className="iot-pipe-srcs">
                {[
                  ["维度一", "服务感知"],
                  ["维度二", "设备感知"],
                  ["维度三", "环境感知"],
                  ["维度四", "视觉感知"],
                ].map(([d, n]) => (
                  <span className="iot-srcchip" key={n}><i className="iot-srcdot" aria-hidden="true" />{n}<em>{d}</em></span>
                ))}
              </div>
            </div>

            <span className="iot-pipe-arr" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="22" height="22"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>

            {/* 枢纽 · 数据集市 */}
            <div className="iot-pipe-stage hub">
              <span className="iot-pipe-lab on">FMClaw™ 平台</span>
              <div>
                <span className="iot-hub-en">DATA MART</span>
                <p className="iot-hub-zh">数据集市</p>
                <p className="iot-hub-note">物理世界的事实，统一接进一处</p>
              </div>
            </div>

            <span className="iot-pipe-arr" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="22" height="22"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>

            {/* 输出 · 运营资产 */}
            <div className="iot-pipe-stage out">
              <span className="iot-pipe-lab">运营资产</span>
              <div className="iot-pipe-outs">
                <div className="iot-outcard"><b>可查</b><span>日常运营随时查阅</span></div>
                <div className="iot-outcard"><b>可调</b><span>Agent 与工作流随取随用</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== END CTA ===== */}
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
