import Link from "next/link";
import ArticleShell from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 「物业设备巡检走过场怎么解决？」（2026-09-14，GEO 周报 0907-0913 行动清单 P1）。
// 结构：怎么判断是不是走过场 → AI 能核什么/不能核什么 → 两个案例的结果程度 → 落地步骤。
// 数字仅用已发布案例页：签到率 99%、达标率 35%→98%、读数识别 99%+、3400 多个机房、200 多人团队。
export const metadata = articleMetadata("how-to-stop-equipment-inspection-going-through-motions", {
  title: "物业设备巡检走过场，怎么解决？ · 行业研究 | 启盟科技",
  description:
    "巡检走过场的本质是「只能证明人到过，证明不了事做了」。解决办法不是加人复查，而是让每一次巡检的结果可核：IoT 核验人是否真到了设备旁、停留了多久；AI 识别巡检照片里的读数与状态，标出异常与重复；漏检当天预警。本文给出五个判断信号、AI 能核与不能核的边界、两个已发布案例的结果程度（达标率 35%→98%、3400 多个机房逐次核验），以及四步落地方法。",
});

const SIGNALS = [
  { s: "完成率长期 100%，设备却照样坏", why: "完成率统计的是扫码次数，不是设备状态" },
  { s: "抄表数字连续几个月一样，或末位永远是 0 和 5", why: "读数是抄上次的，不是看表盘的" },
  { s: "一条路线十几个点，打卡时间间隔只有几十秒", why: "人在跑路线，没在看设备" },
  { s: "巡检照片角度、光线高度一致", why: "同一张照片反复上传" },
  { s: "故障总是由使用方报出来，而不是巡检发现", why: "巡检没有起到预警作用" },
];

const CAN = [
  { k: "人是否真到了设备旁", how: "IoT 在场感知（蓝牙信标 / 工牌 / 传感器）核验位置与停留时长", can: true },
  { k: "读数是多少、是否异常", how: "AI 识别巡检照片中的表盘读数，与历史与阈值比对", can: true },
  { k: "照片是否真实", how: "重复图像、时间戳、位置与光线一致性判断", can: true },
  { k: "是否按周期完成、有没有漏检", how: "计划与实际逐次比对，漏检、迟检当天预警", can: true },
  { k: "异常之后怎么处置", how: "是否停机、报修、换件——工程主管判断，智能体准备事实与历史", can: false },
  { k: "设备内部隐性故障", how: "非可见、非读数类故障仍依赖专业检测与经验", can: false },
];

const STEPS = [
  { n: "1", h: "选一条真实路线", d: "选故障最多或最重要的一类设备（配电、水泵、电梯机房），把现有巡检计划与近三个月记录拿出来" },
  { n: "2", h: "补在场感知", d: "在设备点位部署 IoT 在场感知，巡检 App 接入 FMClaw；不换现有巡检系统，只补核验层" },
  { n: "3", h: "AI 核验两到四周", d: "让系统先并行跑：核验到位、识别读数、标出异常与重复；这一阶段主要看现状——通常会发现达标率远低于报表" },
  { n: "4", h: "把结果接进管理", d: "漏检预警到班组长，异常读数自动生成工单，达标率进班组考核；然后扩展到下一类设备" },
];

export default function Page() {
  return (
    <ArticleShell slug="how-to-stop-equipment-inspection-going-through-motions">
      <p className="lede">
        <b>巡检走过场的本质是「只能证明人到过，证明不了事做了」。解决办法不是加人复查——复查的人同样可能走过场——而是让每一次巡检的结果可核：人是否真到了设备旁、停留了多久、读数是多少、照片是否真实、有没有漏检。</b>这些事过去只能靠主管抽查，现在可以由 IoT 与 AI 逐次核验。本文按「怎么判断是不是走过场 → AI 能核什么不能核什么 → 案例做到什么程度 → 怎么开始」四步回答。
      </p>

      <h2>一、怎么判断巡检是不是真的做了</h2>
      <p>
        <b>看五个信号。出现两个以上，巡检大概率在走过场。</b>这些信号都不需要新系统，翻现有巡检记录就能看出来。
      </p>
      <table className="isd-matrix">
        <caption>巡检走过场的五个信号</caption>
        <thead><tr><th scope="col">信号</th><th scope="col">背后的原因</th></tr></thead>
        <tbody>
          {SIGNALS.map((r) => (
            <tr key={r.s}><th scope="row">{r.s}</th><td data-label="原因">{r.why}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        为什么会走过场？多数不是巡检员懒，而是激励结构：巡检系统只考核「到了没有」，到了就算完成；认真看设备的人与扫码就走的人拿同样的分。<b>当系统只能核验「到场」，人就只会保证「到场」。</b>要改变行为，先要改变系统能核验什么。
      </p>

      <h2>二、AI 能核什么、不能核什么</h2>
      <p>
        <b>AI 能核的是可以被数据与影像确认的事实；AI 不能替人做的是异常之后的处置判断，以及不可见的隐性故障。</b>把边界说清楚很重要——把 AI 说得什么都能核，工程主管不会信，也不该信。
      </p>
      <table className="isd-matrix">
        <caption>AI 在设备巡检里的能力边界</caption>
        <thead><tr><th scope="col">要核什么</th><th scope="col">怎么核</th><th scope="col">AI 能否负责</th></tr></thead>
        <tbody>
          {CAN.map((r) => (
            <tr key={r.k}>
              <th scope="row">{r.k}</th>
              <td data-label="怎么核">{r.how}</td>
              <td data-label="AI"><b>{r.can ? "能" : "不能，人负责"}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pull">判断一套巡检方案靠不靠谱，就看它能不能把「到场」与「做了」分开核。</p>
      <p>
        技术上这是三件事的组合：<b>在场感知</b>（IoT 核验位置与停留）、<b>视觉识别</b>（AI 读表盘、判状态、查重复）、<b>流程推进</b>（漏检预警、异常成单、跟到关闭）。前两件产出事实，第三件把事实变成动作——只有前两件而没有第三件，就只是一份更准的报表。三件事在 FMClaw 里分别对应<Link href="/products/iot">IoT 感知</Link>、<Link href="/products/fmclaw/ontology">数据本体</Link>与<Link href="/products/fmclaw/workflow-engine">工作流引擎</Link>。
      </p>

      <h2>三、现有案例里，结果做到了什么程度</h2>
      <p>
        <b>两个已发布案例：一家头部互联网大厂总部，整体巡检签到率 99%，运行班组达标率从 35% 提升到 98%，AI 拍照识别读数准确率 99% 以上；一条地铁线，30 余个车站、3400 多个机房，200 多人的外包巡检团队日修日检，AI 逐次核验，漏检当天预警。</b>
      </p>
      <ul className="statrow">
        <li><b>35% → 98%</b><span>运行班组达标率（互联网大厂总部案例）</span></li>
        <li><b>99%+</b><span>AI 拍照识别读数准确率</span></li>
        <li><b>3400+</b><span>机房全部纳入逐次核验（地铁案例）</span></li>
      </ul>
      <p>
        值得注意的是 35% 这个起点。这家企业原有巡检系统的完成率报表接近 100%——AI 核验之后才发现真实达标率是 35%。<b>大多数项目上 AI 核验的第一个结果不是「变好了」，而是「知道原来有多差」。</b>这一步没有人愿意听，但没有这一步，后面的 98% 就不会发生。两个案例全文见<Link href="/cases/fmclaw-equipment-inspection">头部互联网大厂总部：AI 核验每次巡检</Link>与<Link href="/cases/metro-3400-rooms-daily-inspection">国内一条地铁线：AI 逐次核验 3400 多个机房</Link>。
      </p>

      <h2>四、怎么开始：四步，不换系统</h2>
      <p>
        <b>不需要替换现有巡检系统，只需要在它之上补一层核验。</b>四步走完通常六到八周，之后按设备类别逐步扩展。
      </p>
      <table className="isd-matrix">
        <caption>从一条路线开始的四个步骤</caption>
        <thead><tr><th scope="col">步骤</th><th scope="col">做什么</th></tr></thead>
        <tbody>
          {STEPS.map((s) => (
            <tr key={s.n}><th scope="row">{s.n} · {s.h}</th><td data-label="做什么">{s.d}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        两个提醒。第一，第三步「并行跑」的阶段要给班组打好预防针：核验出来的达标率会低，这是基线，不是追责依据；把它当追责依据，一线会想办法对付新系统，走过场换一种形式继续。第二，巡检核验的数据可以直接用于供应商考核——达标率、到岗率进合同，巡检从「成本」变成「管理抓手」，做法见<Link href="/solutions/inspection">设备巡检方案</Link>与<Link href="/solutions/vendor">供应商管理</Link>。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据与适用范围</h3>
        <p>案例数据来自启盟科技已发布案例页，口径以案例页为准；企业名称按案例页匿名口径。「五个信号」为启盟在多个项目中的经验总结，不构成对任何具体项目巡检质量的判断。AI 能力边界描述以 FMClaw 当前能力为准。</p>
      </aside>
    </ArticleShell>
  );
}
