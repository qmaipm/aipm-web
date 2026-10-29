import Link from "next/link";
import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 「巡更系统哪个好 / 巡更系统品牌 / 一套多少钱 / 需要网络吗 / 怎么导出数据」（2026-10-28）。不点名品牌。
const SLUG = "how-to-choose-guard-tour-system";

export const metadata = articleMetadata(SLUG, {
  title: "巡更系统哪个好？巡更棒、手机扫码、智能工牌怎么选 · 行业研究 | 启盟科技",
  description:
    "巡更系统主要三种：巡更棒碰点、手机扫码或 NFC、智能工牌加点位传感器。前两种能证明保安到过，证明不了停了多久、看没看；漏巡也要导出数据才能发现。本文对比三种方式，给出选巡更系统时要问的五个问题。",
});

const WAYS = [
  { k: "巡更棒", how: "到点碰一下巡更点", ok: "到场证明可靠，设备耐用", no: "只有一个时间点；回通讯座才上传；看了什么无记录" },
  { k: "手机扫码 / NFC", how: "到点扫二维码或标签", ok: "可拍照、可实时上传", no: "二维码可被拍下补扫；停留多久无记录" },
  { k: "智能工牌 + 点位传感器", how: "走到点位自动记录", ok: "记录进入、离开、停留多久；漏巡自动列出；可多工种共用", no: "需要在巡更点装传感器" },
];

export default function Page() {
  return (
    <ArticleShell slug={SLUG}>
      <p className="lede">
        <b>选巡更系统，先想清楚要证明什么：保安“到过”，还是“认真看过”。</b>巡更棒和手机扫码都能证明到过；要证明在巡更点停留了、看过了，需要能记录停留时长的方式。另外要看漏巡是不是要人导出数据才能发现。
      </p>

      <h2>一、三种巡更方式</h2>
      <table className="isd-matrix">
        <caption>巡更系统三种方式对比</caption>
        <thead><tr><th scope="col">方式</th><th scope="col">保安怎么操作</th><th scope="col">好处</th><th scope="col">不足</th></tr></thead>
        <tbody>
          {WAYS.map((r) => (
            <tr key={r.k}><th scope="row">{r.k}</th><td data-label="操作">{r.how}</td><td data-label="好处">{r.ok}</td><td data-label="不足">{r.no}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        行业资料对巡更棒的描述很直接：只记录“某时某分到过某点”，检查了什么、发现了什么问题，系统无法承载；打卡得到的是一个个散点，难以还原完整行动。
      </p>

      <h2>二、选型时问这五个问题</h2>
      <p><b>1. 能不能证明停留了。</b>碰一下就走和认真检查，记录上能不能区分出来。</p>
      <p><b>2. 漏巡要不要导出才能看。</b>“巡更系统怎么导出数据”是常见搜索。好的系统应该每班自动列出漏巡、停留过短的点，而不是月底导表比对。</p>
      <p><b>3. 发现问题能不能派单。</b>保安看到消防通道堵了、灯坏了，能不能拍照直接生成工单，处理结果能不能回到记录里。</p>
      <p><b>4. 能不能和其他工种共用。</b>如果项目已经给保洁、工程装了点位，安保只加工牌就能用，比单独再买一套巡更系统省很多。</p>
      <p><b>5. 消防巡查能不能一起做。</b>很多项目由安保兼做防火巡查，最好同一张工牌、同一条路线，巡更和防火巡查记录一起出。</p>

      <Figure src="/scene/pt-garage.webp" alt="保安夜间在地下车库巡逻并打开消火栓箱检查" caption="夜间巡更最容易松，也最难抽查：停留时长比打卡时间更能说明问题。" width={1800} height={1207} />

      <h2>三、需要网络吗，多少钱</h2>
      <p>
        巡更棒和点位传感器都不需要在现场布网：巡更棒回通讯座上传，智能工牌下班充电时上传，第二天出报告；需要当天实时看的，可以用 4G 工牌或手机扫码。价格主要看点位数量和人数，软件之外的硬件和安装一般按项目报价。
      </p>

      <h2>四、已经有巡更棒怎么办</h2>
      <p>
        不用一次全换。可以保留原有巡更点，在夜班、地库、消防重点部位先加点位传感器，给保安配工牌，两种记录对比一个月，再决定。漏巡怎么查、怎么避免，见<Link href="/insights/guard-patrol-missed-checkpoints">保安巡更漏巡怎么办</Link>；系统见<Link href="/products/fmclaw/connectors/patrol">安保巡更系统</Link>。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据</h3>
        <p>三种方式的特点来自公开产品资料与行业文章的归纳，不针对任何品牌；百度搜索联想词，2026-10-28。</p>
      </aside>
    </ArticleShell>
  );
}
