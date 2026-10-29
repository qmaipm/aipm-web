import Link from "next/link";
import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 「可视化大屏怎么做 / 用什么软件 / 怎么做出高级感 / 可视化大屏开发 / AI 生成大屏」（2026-10-29）。
// 口径（用户 2026-10-28）：一句话出初稿，可以改到满意；可以把公司现有看板丢进去照着做。不点名 BI 厂商。
const SLUG = "how-to-build-data-dashboard";

export const metadata = articleMetadata(SLUG, {
  title: "可视化大屏怎么做？物业数据大屏先定给谁看、看什么 · 行业研究 | 启盟科技",
  description:
    "可视化大屏怎么做：先定给谁看、看了要做什么决定，再选指标，最后才是配色和图表。物业大屏常见的问题是数据接不进来、指标没人看、改一次要等开发排期。本文给出做大屏的四步、三类常见做法（找开发、用 BI 工具、AI 生成）的对比，以及物业大屏该放哪些指标。",
});

const WAYS = [
  ["找外包开发", "效果可以做得很好看", "要提需求、排期、付开发费；数据口径一变就要再改"],
  ["用 BI 工具自己搭", "灵活，不用写代码", "要有人懂数据建模；数据要先接进来、整理好"],
  ["AI 生成", "说一句话出初稿，接着说就能改", "前提是数据已经接进来、口径统一"],
];

const KPIS = [
  ["服务", "服务计划完成率、保洁达标率、巡更完成率"],
  ["工单", "今日工单、超时单、及时完成率"],
  ["设备", "设备异常、待处理告警"],
  ["收费", "本月应收、实收、收缴率"],
  ["人员", "今日在岗、作业工时"],
];

export default function Page() {
  return (
    <ArticleShell slug={SLUG}>
      <p className="lede">
        <b>做可视化大屏，先定给谁看、看了要做什么决定，再选指标，最后才是配色和图表。</b>“高级感”来自少而准的指标，不是来自特效。物业大屏最常见的问题不是不好看，而是<b>数据接不进来、指标没人看、改一次要等开发排期</b>。
      </p>

      <h2>一、做大屏的四步</h2>
      <ol>
        <li><b>定给谁看。</b>集团领导看全局和排名，项目经理看今天要处理的事，展厅大屏给客户看服务成果，三块屏内容完全不同。</li>
        <li><b>定看什么。</b>每个指标都要回答一个问题，看了能做一个决定。回答不了问题的指标去掉。</li>
        <li><b>接数据、统一口径。</b>同一个指标在所有项目用同一个算法，数据从系统直接取，不靠人填。</li>
        <li><b>最后才是设计。</b>一屏的核心指标控制在一眼能看完的数量，颜色只用来标异常。</li>
      </ol>
      <p className="pull">大屏好不好，看有没有人因为它做了一个决定。</p>

      <h2>二、三种做法对比</h2>
      <table className="isd-matrix">
        <caption>可视化大屏的三种做法</caption>
        <thead><tr><th scope="col">做法</th><th scope="col">好处</th><th scope="col">要注意</th></tr></thead>
        <tbody>
          {WAYS.map((r) => (
            <tr key={r[0]}><th scope="row">{r[0]}</th><td data-label="好处">{r[1]}</td><td data-label="要注意">{r[2]}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        三种做法的共同前提都是数据接得进来。很多大屏项目卡住，不是卡在设计，而是卡在收费、工单、停车、考勤几套系统的数据拼不到一起。
      </p>

      <Figure src="/scene/exec-tablet.webp" alt="集团高管在办公室用平板查看经营数据" caption="领导看的是排名和异常，项目经理看的是今天要处理的事：同一份数据，做成两块屏。" width={1800} height={1208} />

      <h2>三、物业大屏放哪些指标</h2>
      <table className="isd-matrix">
        <caption>物业运营大屏常用指标</caption>
        <thead><tr><th scope="col">板块</th><th scope="col">指标</th></tr></thead>
        <tbody>
          {KPIS.map((r) => (
            <tr key={r[0]}><th scope="row">{r[0]}</th><td data-label="指标">{r[1]}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        再加一块“疑点”：数据之间对不上、需要人去看的事，比如签到率高但达标率低、设备读数连续为 0。这块往往比漂亮的曲线更有用。
      </p>

      <h2>四、不用开发的做法</h2>
      <p>
        系统做法是：收费、工单、停车、门禁、设备、考勤和服务点位的数据接进项目大脑，口径统一；用一句话描述想看什么，先出一版看板，不满意接着说，改到满意为止；也可以把公司现有的看板截图或报表规则直接给它照着做。日报、周报、月报也由工作流按时自动生成。详见<Link href="/products/fmclaw/connectors/reports">物业报表与数据大屏</Link>；临时想查一个数，见<Link href="/solutions/ask-data">集团智能问数</Link>。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据</h3>
        <p>大屏设计方法参考公开的数据可视化实践；物业指标为启盟科技项目中的常用口径；百度搜索联想词，2026-10-29。</p>
      </aside>
    </ArticleShell>
  );
}
