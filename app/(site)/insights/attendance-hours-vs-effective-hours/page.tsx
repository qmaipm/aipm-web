import Link from "next/link";
import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 「考勤工时和有效工时区别 / 有效工时是什么意思 / 工时利用率怎么计算 / 越高越好吗 / 作业工时 / 物业人效比」（2026-10-28）。
// 四层（用户定义）：合同工时 → 考勤工时 → 在场工时 → 作业工时。不写缺编扣款；不点名劳动力管理厂商；不放具体比例。
const SLUG = "attendance-hours-vs-effective-hours";

export const metadata = articleMetadata(SLUG, {
  title: "考勤工时和有效工时有什么区别？物业工时利用率怎么算 · 行业研究 | 启盟科技",
  description:
    "考勤工时是打卡上班到下班的时间，有效工时是真正在干活的时间，两者之间还隔着一层在场工时。物业可以把工时分四层看：合同工时、考勤工时、在场工时、作业工时，每两层之间的落差对应一个管理问题。本文解释四层的含义、工时利用率怎么算、为什么不是越高越好，以及人效和编制怎么从这四层算出来。",
});

const LAYERS = [
  { k: "合同工时", q: "约定了多少", src: "和客户约定的人数和工时" },
  { k: "考勤工时", q: "来了多少", src: "打卡上班到下班的时间" },
  { k: "在场工时", q: "在不在现场", src: "真正在项目现场的时间（智能工牌记录）" },
  { k: "作业工时", q: "干了多少", src: "在服务点位上消耗的时间，也就是常说的有效工时" },
];

const GAPS = [
  ["合同 → 考勤", "约定的人数，实际有多少人来上班", "人员到岗、招聘补员"],
  ["考勤 → 在场", "打了卡，人不在现场", "在岗管理、代打卡"],
  ["在场 → 作业", "人在现场，但没在服务点位上", "排班、路线和任务分配"],
  ["作业 → 计划", "该做的点位、频次没做够", "服务标准执行"],
];

export default function Page() {
  return (
    <ArticleShell slug={SLUG}>
      <p className="lede">
        <b>考勤工时是打卡上班到下班的时间；有效工时是真正在干活的时间。</b>两者之间还隔着一层：打了卡，人在不在现场。物业可以把工时分成四层看：合同工时、考勤工时、在场工时、作业工时。考勤只能说明来没来，作业工时才说明干了多少。
      </p>

      <h2>一、工时的四层</h2>
      <table className="isd-matrix">
        <caption>物业工时四层</caption>
        <thead><tr><th scope="col">层</th><th scope="col">回答的问题</th><th scope="col">怎么来</th></tr></thead>
        <tbody>
          {LAYERS.map((r) => (
            <tr key={r.k}><th scope="row">{r.k}</th><td data-label="问题">{r.q}</td><td data-label="来源">{r.src}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        普通考勤系统只有第二层。要看到第三、第四层，需要知道员工在不在现场、在哪个服务点位停留了多久，这就要点位传感器和智能工牌的记录。
      </p>

      <h2>二、每两层之间的落差，对应一个问题</h2>
      <table className="isd-matrix">
        <caption>四层工时之间的落差</caption>
        <thead><tr><th scope="col">落差</th><th scope="col">说明什么</th><th scope="col">要管的事</th></tr></thead>
        <tbody>
          {GAPS.map((r) => (
            <tr key={r[0]}><th scope="row">{r[0]}</th><td data-label="说明">{r[1]}</td><td data-label="要管的事">{r[2]}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="pull">只看考勤，四个问题里只能看到第一个。</p>

      <h2>三、工时利用率怎么算</h2>
      <p>
        常见算法是有效工时除以可用工时。放到物业场景，可以分两段看：
      </p>
      <ul>
        <li><b>作业工时 ÷ 在场工时</b>：人在现场时，有多少时间在服务点位上干活</li>
        <li><b>在场工时 ÷ 考勤工时</b>：打了卡的人，有多少时间真的在现场</li>
      </ul>
      <p>
        利用率不是越高越好。保洁要推车走动、取用工具、补充耗材，保安要在岗位之间移动，人也需要休息。合理的范围要按工种和项目定，先看趋势和项目之间的差别，比直接定一个目标值更有用。
      </p>

      <Figure src="/scene/wf-shift.webp" alt="保洁员推着清洁车从后勤通道走向大堂，主管在旁边" caption="走动、取用工具、补充耗材都算在场，不算作业：利用率要按工种定。" width={1800} height={1207} />

      <h2>四、人效和编制怎么从四层算</h2>
      <p>
        <b>人效</b>：每个人、每个班组每天的作业工时和完成的服务次数，比“一个人管多少平方米”更能说明问题。
      </p>
      <p>
        <b>编制</b>：从服务点位和频次倒推。每个点位每月要服务多少次、每次需要多少作业工时，加总后按人均可用工时折算成人数。再用实际作业工时校准，比按经验配人准确。
      </p>
      <p>
        <b>排班</b>：哪个时段作业工时最集中，就在哪个时段多排人；哪个时段在场多、作业少，就调整任务或班次。
      </p>

      <h2>五、怎么开始</h2>
      <p>
        先把考勤和工时打通：无感考勤（人脸经本人同意录入）解决“来没来”，智能工牌和点位传感器解决“在不在、干了多少”。系统做法见<Link href="/products/fmclaw/connectors/workforce">工时管理与考勤排班系统</Link>；点位记录见<Link href="/products/fmclaw/connectors/sensing">服务感知系统</Link>。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据</h3>
        <p>有效工时利用率的通用定义参考公开资料；四层工时为启盟科技在物业项目中的工时口径；百度搜索联想词，2026-10-28。</p>
      </aside>
    </ArticleShell>
  );
}
