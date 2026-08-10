import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import ProductCrumb from "../_crumb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/iot", {
  title: "IoT 物理世界感知 · 物理 AI(Physical AI)的落地形态 | 启盟科技",
  description:
    "FMClaw 的物理世界感知是物理 AI(Physical AI)在楼宇设施管理里的落地形态,分四类:服务感知、设备感知、环境感知、视觉感知。其中服务感知——感知一次服务到底有没有做、做了多久、做得到不到位——是启盟科技独有、别人做不到的能力。四类数据统一接进 FMClaw 行业数据本体与数据集市。",
});

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
          <ProductCrumb name="IoT 物理世界感知" href="/products/iot" />
          <span className="iot-kicker">IoT 物理世界感知系统<i>/</i>越靠近物理世界越难</span>
          <h1 className="iot-h1">
            懂语言、懂数据<br /><span className="grad">更懂物理世界</span>
          </h1>
          {/* 不点名任何第三方品牌做对比(2026-08-07 事故:这里曾写「如 Genspark、Manus」,
              指名道姓说别家不如自己是公关灾难)。对比只对「通用 Agent」这个类别说。 */}
          <p className="iot-lead">
            通用 Agent 擅长语言与数据；但物业与设施管理，发生在真实的物理世界。FMClaw 多了一层能力——把楼宇、设备、环境、人车都<b>看见</b>。
          </p>
          <p className="iot-note">
            这层能力有个行业名字——物理 AI(Physical AI):能感知、理解并作用于物理世界的
            AI(<Link href="/insights/what-is-physical-ai">什么是物理 AI,我们写了一篇完整的研究</Link>)。越靠近物理世界越难做，而这正是行业级平台的护城河。
          </p>
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
          <p className="iot-case-note">这两类传感器在真实项目里的规模：<Link href="/cases/intl-hospital-medical-grade-fm">上海一家三级综合国际医院</Link>用 4,198 个传感器支撑每月 215,821 次服务交付的逐次核验；<Link href="/cases/metro-3400-rooms-daily-inspection">国内一条地铁线</Link>把 3400 多个机房的日修日检全部纳入感知。</p>
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
          {/* BA 系统合成图(skill §3f「以读者为先」,2026-08-08):本页读者是物业决策者/甲方,
              纯线框图偏冷。采用分层做法——生成的机房场景照做视觉层(BA 现场层的物理世界),
              真文字的三层结构做认知层,一张图同时回答「BA 长什么样」和「BA 是什么结构」。
              文字全部是真文字(HTML 渲染),不在生成图像素里。 */}
          <figure className="iot-ba-card">
            <div className="iot-ba-photo">
              <Image src="/products/iot/iot-dim2.jpg" alt="给排水机房内部，水泵与管路成排，墙侧是一排配电控制柜——BA 现场层所在的物理世界" width={1800} height={1208} className="iot-ba-img" />
              <span className="iot-ba-tag">场景还原 · BA 的现场层就在这样的机房里</span>
            </div>
            <div
              className="iot-ba-struct"
              role="img"
              aria-label="传统 BA 楼宇自控系统的三层结构：现场层的传感器与执行器装在水泵、空调箱等设备上；自动化层的 DDC 控制器在各机房就近采集与调节；管理层的中央监控工作站汇总全楼。FMClaw 经连接器从管理层读取数据，不改动 BA 本身。"
            >
              <div className="iot-ba-tier">
                <span className="iot-ba-lab">管理层</span>
                <div className="iot-ba-node hl"><b>中央监控工作站 → FMClaw 从这里接入</b><span>经连接器读标准协议或厂商接口，只取数、不改动 BA</span></div>
              </div>
              <div className="iot-ba-flow"><i aria-hidden="true" />数据上行 · 指令下行<i aria-hidden="true" /></div>
              <div className="iot-ba-tier">
                <span className="iot-ba-lab">自动化层</span>
                <div className="iot-ba-node"><b>DDC 控制器</b><span>冷冻机房 · 空调新风 · 给排水 · 配电，就近采集与调节</span></div>
              </div>
              <div className="iot-ba-flow"><i aria-hidden="true" />数据上行 · 指令下行<i aria-hidden="true" /></div>
              <div className="iot-ba-tier">
                <span className="iot-ba-lab">现场层</span>
                <div className="iot-ba-node"><b>传感器 + 执行器</b><span>温度 · 压力 · 流量 · 电量 ｜ 阀门 · 变频器 · 设备启停</span></div>
              </div>
            </div>
            <figcaption className="iot-ba-cap">照片是 BA 的物理现场，旁边是它的三层结构——设备感知不推倒重来，从管理层把数据读出来即可。</figcaption>
          </figure>
          <p className="iot-value">设备的异常，在停机或故障之前，就被看见。</p>
          <p className="iot-case-note">设备感知加上在场核验，在<Link href="/cases/fmclaw-equipment-inspection">头部互联网大厂总部的巡检案例</Link>里，把 100 多个机房的巡检达标率从 35% 做到 98%。</p>
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
          {/* 园区俯瞰示意图:一张图看全环境感知的分布(停车场、门禁广场、遍布各处的感知点) */}
          <figure className="iot-scene">
            <Image src="/products/iot/iot-dim3.jpg" alt="傍晚俯瞰一个办公园区：几栋写字楼、停车场、人行门禁广场，青绿色光点标注遍布屋顶、步道、车位与出入口的各类感知点" width={1800} height={1208} className="iot-scene-img" />
            <figcaption>园区俯瞰示意：图中每一个亮起的青绿色光点，都是一个感知点——楼里的温湿度与空气质量传感器、车位与道闸、人行门禁，遍布整个园区。</figcaption>
          </figure>
          <div className="iot-env one">
            <div className="iot-env-col">
              <div className="iot-env-lead">这些感知点回答的是同一个问题：这个环境此刻到底是怎么回事</div>
              <p className="iot-env-note">单个传感器只是一个读数；把它们铺满整个园区，环境就从主观感受变成一张可读的实时图景。</p>
              <div className="iot-env-row">
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V5a2 2 0 1 0-4 0v9.76a4 4 0 1 0 4 0Z" /></svg></div>
                  <div className="iot-ei-name">温度</div>
                  <div className="iot-ei-ans">哪里热、哪里冷</div>
                </div>
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5s5 5.2 5 8.7a5 5 0 0 1-10 0c0-3.5 5-8.7 5-8.7Z" /></svg></div>
                  <div className="iot-ei-name">湿度</div>
                  <div className="iot-ei-ans">潮不潮、闷不闷</div>
                </div>
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10.5A2.5 2.5 0 1 0 11 5.5" /><path d="M3 12h14a2.5 2.5 0 1 1-2.5 2.5" /><path d="M3 16h8" /></svg></div>
                  <div className="iot-ei-name">空气质量</div>
                  <div className="iot-ei-ans">这口气好不好</div>
                </div>
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9.5 16V8h3a2.5 2.5 0 0 1 0 5h-3" /></svg></div>
                  <div className="iot-ei-name">停车</div>
                  <div className="iot-ei-ans">车在哪儿、满没满</div>
                </div>
                <div className="iot-env-item">
                  <div className="iot-ei-svg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" /><path d="M3.5 21h17" /><circle cx="13" cy="12" r="1" /></svg></div>
                  <div className="iot-ei-name">门禁</div>
                  <div className="iot-ei-ans">人怎么进出流动</div>
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
            <p className="iot-perceive">用视觉<b>补齐前几类看不到的现场细节</b>——从 CCTV、机器人、手机到无人机，多角度收集视觉数据。</p>
          </div>
          <figure className="iot-scene">
            <Image src="/products/iot/iot-dim4.jpg" alt="写字楼大堂走廊，天花板上的半球监控摄像头与地面上移动的白色巡逻机器人" width={1800} height={1208} className="iot-scene-img" />
            <figcaption>场景还原：大堂里的监控摄像头与巡逻机器人——固定视角与移动视角，在同一个现场互为补充。</figcaption>
          </figure>
          {/* 多角度采集示意(skill §3f 分层法):示意图做视觉层 + 真文字四来源做认知层 */}
          <figure className="iot-ba-card">
            <div className="iot-ba-photo">
              <Image src="/products/iot/iot-dim4-sources.jpg" alt="示意插画：楼宇周围的半球监控摄像头、巡逻机器人、手持手机的人员与空中的无人机，各自的青绿色视野锥汇聚到同一栋建筑上" width={1800} height={1208} className="iot-ba-img" />
              <span className="iot-ba-tag">多角度采集示意</span>
            </div>
            <div className="iot-ba-struct" role="img" aria-label="视觉数据的四类来源：CCTV 固定视角、机器人移动巡检、手机在场拍摄、无人机高处巡查，多角度画面汇入同一份视觉感知">
              <div className="iot-ba-tier">
                <span className="iot-ba-lab">固定视角</span>
                <div className="iot-ba-node"><b>CCTV 视频监控</b><span>大堂、通道、机房，7×24 盯着不动的地方</span></div>
              </div>
              <div className="iot-ba-tier" style={{ marginTop: 10 }}>
                <span className="iot-ba-lab">移动视角</span>
                <div className="iot-ba-node"><b>机器人巡检 · 手机在场拍摄</b><span>机器人按路线巡逻，人员在现场随手拍下证据</span></div>
              </div>
              <div className="iot-ba-tier" style={{ marginTop: 10 }}>
                <span className="iot-ba-lab">高处视角</span>
                <div className="iot-ba-node"><b>无人机巡查</b><span>屋顶、幕墙、高空管线，人不容易到的地方</span></div>
              </div>
              <div className="iot-ba-tier" style={{ marginTop: 14 }}>
                <span className="iot-ba-lab" aria-hidden="true"></span>
                <div className="iot-ba-node hl"><b>多角度画面，汇入同一份视觉感知</b><span>不同视角互为补充，拼出现场的完整样子</span></div>
              </div>
            </div>
            <figcaption className="iot-ba-cap">左：多角度采集示意（AI 生成示意图）。右：四类视觉来源——CCTV 管固定点位，机器人和手机管移动现场，无人机管高处，最终汇入同一份视觉感知。</figcaption>
          </figure>
          <p className="iot-sub">这些视觉来源可用于巡检识别、异常发现，把现场看不到的细节也补进感知。</p>
          <p className="iot-case-note">视觉感知在真实项目里的样子：<Link href="/cases/campus-cctv-photo-ai-review">华南一个园区</Link>把监控预警图片接进平台，识别完直接派单，一次电动车充电冒烟 3 分钟内有人到场。</p>
        </div>
      </section>

      {/* ===== 怎么接入平台 ===== */}
      <section className="iot-band">
        <div className="wrap">
          <span className="iot-eyebrow">怎么接入平台</span>
          <h2 className="iot-h2">设备只管感知，怎么用交给平台</h2>
          <p className="iot-sub iot-ingest-lead">四类感知采到的数据，统一接进 FMClaw™ 平台——平台内的<Link href="/products/fmclaw/ontology">行业数据本体</Link>把物理世界的事实映射为项目、空间、设备、服务和指标，以数据集市交付；工作流引擎把这些事实组织成具体的工作。</p>

          {/* 四层架构图:纯代码绘制(架构图全是文字,按 skill §3f 硬约束不进生成图像素)。
              口径对齐产品页(2026-08-08 用户纠正):
              ① 连接器属于本体的「连接与映射」环节,中间数据池是连接器读取的一种交接方式,
                 不是与本体并列的另一套东西;
              ② FMClaw 平台 ≠ 只有本体——平台内还有工作流引擎、工具箱、控制台;
              ③ 数据集市是本体治理后的交付形态(和本体是一码事),取数走集市、动作走工具箱。 */}
          <div className="iot-arch" role="img" aria-label="IoT 数据接入平台的四层架构：物理感知层的四个维度，经自研传感器直连、连接器直连已有系统、连接器读取中间数据池三条通道，进入 FMClaw 平台——平台内的行业数据本体完成连接映射与治理，以数据集市交付，平台内还有工作流引擎、工具箱与控制台；最终供智能体、工作流与日常运营使用">
            {/* 第一层 · 物理感知 */}
            <div className="iot-arch-layer">
              <span className="iot-arch-lab">物理感知</span>
              <div className="iot-arch-row c4">
                <div className="iot-arch-node"><b>服务感知</b><span>空间与行为传感器</span></div>
                <div className="iot-arch-node"><b>设备感知</b><span>BA 楼宇自控数据</span></div>
                <div className="iot-arch-node"><b>环境感知</b><span>温湿度 · 停车 · 门禁</span></div>
                <div className="iot-arch-node"><b>视觉感知</b><span>监控 · 机器人 · 无人机</span></div>
              </div>
            </div>

            <div className="iot-arch-flow" aria-hidden="true"><i /><i /><i /></div>

            {/* 第二层 · 接入通道 */}
            <div className="iot-arch-layer">
              <span className="iot-arch-lab">接入通道</span>
              <div className="iot-arch-row c3">
                <div className="iot-arch-node way">
                  <b>自研传感器直连</b>
                  <span>服务感知与温湿度数据，由 FMClaw 传感器采集后直接上传</span>
                </div>
                <div className="iot-arch-node way">
                  <b>连接器 · 直连已有系统</b>
                  <span>BA、停车、门禁等企业已有系统，经连接器接入，不替换、不重建</span>
                </div>
                <div className="iot-arch-node way">
                  <b>连接器 · 读中间数据池</b>
                  <span>不便直连的系统（如监控）把预警图片放进约定的数据池，连接器从池子里读——不接视频流</span>
                </div>
              </div>
            </div>

            <div className="iot-arch-flow" aria-hidden="true"><i /><i /><i /></div>

            {/* 第三层 · FMClaw 平台大框:本体(含连接映射,以数据集市交付) + 工作流引擎 + 工具箱 + 控制台 */}
            <div className="iot-arch-layer">
              <span className="iot-arch-lab">FMClaw™ 平台</span>
              <div className="iot-arch-plat">
                <div className="iot-plat-gate">
                  <b>连接与映射 —— 三条通道的数据，从这里进入本体</b>
                  <span>连接器就是行业数据本体的第一环：把接进来的原始数据，映射到业务对象上</span>
                </div>
                <div className="iot-plat-body">
                  <div className="iot-plat-onto">
                    <span className="iot-hub-en">INDUSTRY DATA ONTOLOGY</span>
                    <p className="iot-hub-zh">行业数据本体</p>
                    <p className="iot-hub-note">物理世界的事实，映射为项目、空间、设备、服务与指标，再统一口径、标准、规则与权限</p>
                    <div className="iot-plat-mart">
                      <b>数据集市</b>
                      <span>本体治理后的交付形态，人和智能体统一口径取数的唯一入口</span>
                    </div>
                  </div>
                  <div className="iot-plat-side">
                    <div className="iot-plat-mod">
                      <b>工作流引擎</b>
                      <span>把感知到的事实组织成工作：审批、质检、派单都在这里跑</span>
                    </div>
                    <div className="iot-plat-mod">
                      <b>工具箱</b>
                      <span>软件动作的执行入口：开工单、发通知、回写系统</span>
                    </div>
                    <div className="iot-plat-mod">
                      <b>控制台</b>
                      <span>权限、审计与运行记录，管住每一次读写</span>
                    </div>
                  </div>
                </div>
                <p className="iot-plat-note">分工一句话：统一口径的取数走数据集市，软件动作的执行走工具箱；本体提供业务事实，工作流引擎组织工作，控制台管权限和记录。</p>
              </div>
            </div>

            <div className="iot-arch-flow" aria-hidden="true"><i /><i /><i /></div>

            {/* 第四层 · 使用 */}
            <div className="iot-arch-layer">
              <span className="iot-arch-lab">谁在用</span>
              <div className="iot-arch-row c3">
                <div className="iot-arch-node use"><b>智能体</b><span>识别异常，直接开工单、派到岗位</span></div>
                <div className="iot-arch-node use"><b>工作流</b><span>水电费审批、AI 质检、报修派单</span></div>
                <div className="iot-arch-node use"><b>日常运营</b><span>随时查阅，人和智能体用同一份口径</span></div>
              </div>
            </div>
          </div>

          <p className="iot-arch-note">中间数据池这条通道在真实项目里怎么跑，<Link href="/cases/campus-cctv-photo-ai-review">园区监控预警预审案例</Link>记录了完整过程——从预警图片进池，到识别完直接派单。</p>
        </div>
      </section>

      {/* ===== 感知数据的另一个去处:具身智能(2026-08 用户要求:把这块也讲出来,并引向专页) ===== */}
      <section className="iot-band mist">
        <div className="wrap">
          <span className="iot-eyebrow">感知数据的另一个去处</span>
          <h2 className="iot-h2">今天驱动运营，明天训练具身智能</h2>
          <p className="iot-sub">
            四类感知数据首先服务于今天的日常运营；但它们还有另一层价值——真实场景里、带任务语义的物理世界数据，正是<b>具身智能训练最稀缺的原料</b>。机器人要从演示视频走向真实上岗，需要的不是摄影棚里摆拍的数据，而是真实楼宇里真实任务的过程记录——这正是物业与设施管理每天在大规模产生的东西。
          </p>
          <div className="iot-chips">
            <span>第一视角作业视频</span><span>工单自带任务语义</span><span>真实场景实训场</span><span>机器人上岗数据回流</span>
          </div>
          <p className="iot-case-note">
            已有具身智能与机器人公司在寻找这样的物理 AI 合作方。我们为此开放了专门的合作入口：<Link href="/partners/embodied-ai-data">具身智能数据合作</Link>——第一视角数据采集、带任务语义的数据集共建、真实场景实训场与机器人上岗联合运营。
          </p>
        </div>
      </section>

      <SeoFaq
        heading="关于 IoT 物理世界感知，你可能想问"
        items={[
          { q: "楼里已经有 BA、停车、门禁、监控这些系统了，接入时要推倒重建吗？", a: "不用。已有系统经连接器接入，不替换、不重建；不便直连的系统（比如监控）可以把预警图片放进约定的中间数据池，由连接器读取。真正新增的只有原来没有的感知能力——比如服务感知的自研传感器。" },
          { q: "什么是服务感知，和普通 IoT 监测有什么区别？", a: "普通 IoT 监测的是设备和环境状态；服务感知监测的是服务本身——一次保洁或巡检到底有没有做、做了多久、做得到不到位。前者看物，后者看事。" },
          { q: "数据采上来之后怎么用，会不会只是多一块大屏？", a: "不是看板，是进工作流。四类感知数据经行业数据本体映射和治理后，直接驱动水电费审批、AI 质检、报修派单这些具体业务——数据的去处是动作，不是展示。" },
          { q: "这些物理世界的感知数据，和具身智能（Embodied AI）有什么关系？", a: "具身智能要在真实环境里干活，就得先理解真实环境——而这正是物理 AI（Physical AI）长年积累的东西：楼宇里的空间结构、设备运行、人车流动、服务过程，都是经过业务校准的真实场景数据。这类数据可以供未来的具身智能训练和消费：机器人要在写字楼里巡检、在园区里配送，需要的正是这张对物理世界的实时理解。" },
          { q: "听说机器人公司在找物理 AI 公司合作，是真的吗？", a: "是行业里正在发生的事。具身智能公司、机器人公司缺的不是本体能力，而是真实场景里持续产生、带业务语义的环境数据——这正是物理 AI 公司在物业与设施场景里每天都在生产的。对业主方来说，今天接入的感知体系，除了驱动当下的运营，也在为未来机器人进场准备好「读得懂环境」的数据底座。启盟科技为此开放了具身智能数据合作入口，具体背景也可以读《什么是物理 AI》一文。" },
        ]}
      />

      {/* ===== END CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把 AI 接入物业与设施管理的日常运营</h2>
          <p className="reveal">从你的一个真实业务开始。<Link href="/products/fmclaw/workflow-engine" style={{ color: "#3fd9b8", fontWeight: 600 }}>了解物理数据如何进入业务工作流 →</Link></p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
