import Link from "next/link";
import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 「漏巡怎么办 / 漏巡原因 / 漏巡情况说明 / 漏巡打点的检查怎么写 / 保安睡岗」（2026-10-28）。
// 口径：漏巡由系统列出、主管核实原因，不写"脱岗罚款""睡岗抓拍"类卖点。
const SLUG = "guard-patrol-missed-checkpoints";

export const metadata = articleMetadata(SLUG, {
  title: "保安巡更漏巡怎么办？漏巡怎么发现、怎么查、怎么避免 · 行业研究 | 启盟科技",
  description:
    "保安漏巡常见四种原因：路线和点位设计不合理、人手不够、夜班松懈、记录能补。发现漏巡不能靠月底导数据，要每班把计划和实际逐点比对，把漏巡和停留过短的点列出来，由主管当班核实原因。本文给出漏巡的四类原因、每班要看的清单、核查步骤和避免办法。",
});

const CAUSES = [
  { k: "路线设计不合理", how: "点位太多、路线太长，一班根本走不完", fix: "按实际走完一圈的时间重排路线和频次" },
  { k: "人手不够", how: "缺人时一个人顶两个岗，巡更顾不上", fix: "看在场工时，确认缺的是人还是时间安排" },
  { k: "夜班松懈", how: "后半夜最容易漏，主管也最难抽查", fix: "夜班点位单独统计，次日一早出报告" },
  { k: "记录能补", how: "二维码拍下来补扫、纸质记录事后补", fix: "用不需要人操作的记录方式，记录停留时长" },
];

export default function Page() {
  return (
    <ArticleShell slug={SLUG}>
      <p className="lede">
        <b>处理保安漏巡，第一步是“当班就知道漏了”，而不是月底导数据才发现。</b>把巡更计划和实际记录逐点比对，该到没到的是漏巡，到了但停留明显过短的也列出来，由主管当班核实原因。原因清楚了，再调路线、调人、调记录方式。
      </p>

      <h2>一、漏巡的四类原因</h2>
      <table className="isd-matrix">
        <caption>保安漏巡常见原因</caption>
        <thead><tr><th scope="col">原因</th><th scope="col">怎么发生</th><th scope="col">怎么改</th></tr></thead>
        <tbody>
          {CAUSES.map((r) => (
            <tr key={r.k}><th scope="row">{r.k}</th><td data-label="怎么发生">{r.how}</td><td data-label="怎么改">{r.fix}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        不是所有漏巡都是保安偷懒。路线一班走不完、缺人顶岗，记录上看都是漏巡，处理方式完全不同。所以漏巡清单要先核实原因，再谈考核。
      </p>

      <h2>二、每班要看的清单</h2>
      <p>每一班结束，看一张清单就够了：</p>
      <ul>
        <li>漏巡的点：时间段、点位、当班人员</li>
        <li>停留过短的点：比如消防点位只停了几秒</li>
        <li>没按顺序走的段：跳过一段又折回来</li>
        <li>和上周同一班次比，漏巡是变多还是变少</li>
      </ul>
      <p className="pull">漏巡清单的用处是让主管当班去问原因，而不是系统一报警就扣钱。</p>

      <Figure src="/scene/pt-garage.webp" alt="保安夜间在地下车库巡逻并打开消火栓箱检查" caption="地库、消防点位、后半夜，是漏巡最集中的地方。" width={1800} height={1207} />

      <h2>三、发现之后怎么查</h2>
      <p>
        <b>当班问：</b>主管找当班保安了解情况，是处理突发事件、被临时调走，还是没去。<b>看记录：</b>对照同一时段的监控、门禁记录，或者其他工种在附近点位的记录。<b>写说明：</b>漏巡情况说明写清时间、点位、原因和补救措施；如果是路线或人手问题，提出调整建议。
      </p>

      <h2>四、怎么避免</h2>
      <p>
        <b>路线按实际走一遍定。</b>按真实走完一圈的时间设频次，别让计划本身不可能完成。<b>重点点位单独看。</b>消防通道、地库、配电房这类点位单独统计停留时长。<b>记录不用人操作。</b>走到点位自动记录进入和离开，补扫、补填就没有空间。<b>发现的问题顺手派单。</b>巡逻时看到的隐患拍照生成工单，让巡更不只是走一圈。
      </p>
      <p>
        巡更系统怎么选，见<Link href="/insights/how-to-choose-guard-tour-system">巡更系统哪个好</Link>；系统怎么每班自动列出漏巡，见<Link href="/products/fmclaw/connectors/patrol">安保巡更系统</Link>。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据</h3>
        <p>漏巡原因与核查步骤为启盟科技项目经验整理；百度搜索联想词，2026-10-28。</p>
      </aside>
    </ArticleShell>
  );
}
