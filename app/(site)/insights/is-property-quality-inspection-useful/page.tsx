import Link from "next/link";
import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";

// 「物业品质巡查真的有用吗 / 品质巡查重点 / 保洁考核评分表 / 外包供应商考核标准」（2026-10-28）。
// 差异点：降低培训成本、提高巡查效率、标准统一、责任划分（用户口述 + 真实界面 qa-system.png）。
const SLUG = "is-property-quality-inspection-useful";

export const metadata = articleMetadata(SLUG, {
  title: "物业品质巡查真的有用吗？走过场的原因和改法 · 行业研究 | 启盟科技",
  description:
    "物业品质巡查本身有用，常走过场是因为四件事：打分项太多、巡检员难培训；逐项打分太费时，只能抽查一小部分；每个人标准不一样，分数不服众；发现的问题没人跟、责任说不清。本文拆解这四个原因，给出让巡查真正起作用的改法，以及外包供应商考核怎么用同一套标准。",
});

const WHY = [
  { k: "巡检员难培训", how: "打分项几十上百条，天地墙逐项打分，要记的标准太多", fix: "标准交给系统匹配，拍照的人不用记打分项" },
  { k: "打细了太费时", how: "每个点位逐项打分很慢，只能抽查一小部分", fix: "拍照即评分，覆盖面可以大很多" },
  { k: "标准不统一", how: "每个人对品质的要求不一样，同一处打出不同分", fix: "同一套标准按档次和空间类型自动套用" },
  { k: "问题没人跟", how: "发现问题记在表上，整改没人跟，责任说不清", fix: "问题自动划分责任，重要的直接派单" },
];

export default function Page() {
  return (
    <ArticleShell slug={SLUG}>
      <p className="lede">
        <b>品质巡查有用，常走过场是因为四件事：巡检员难培训、打细了太费时、标准不统一、问题没人跟。</b>前三件让巡查做不细、做不勤、分数不服众，第四件让巡查发现了问题也没用。改法是把“记标准、打分、分责任”交给系统，人只负责拍照和整改。
      </p>

      <h2>一、为什么会走过场</h2>
      <table className="isd-matrix">
        <caption>品质巡查走过场的四个原因</caption>
        <thead><tr><th scope="col">原因</th><th scope="col">现场表现</th><th scope="col">改法</th></tr></thead>
        <tbody>
          {WHY.map((r) => (
            <tr key={r.k}><th scope="row">{r.k}</th><td data-label="现场表现">{r.how}</td><td data-label="改法">{r.fix}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="pull">巡查的成本主要在人：培训人、派人去、人打分。把这三样降下来，巡查才能做得勤。</p>

      <h2>二、标准怎么统一</h2>
      <p>
        同样是地面有点灰，高档写字楼大堂和地库通道的要求不一样。统一标准的关键是先判断“这是什么档次、什么空间”，再套对应的标准。
      </p>
      <p>
        AI 评分就是这样做的：先判断环境档次（比如高档办公区）和空间类型（大堂、卫生间、楼梯间、茶水间），再按对应标准识别问题，列出责任部门、基础扣分和加重扣分。同一张照片，谁拿去评都是同一个分。
      </p>

      <Figure src="/images/qa-system.png" alt="AI 评分真实界面：茶水间通道保洁质量报告，含环境档次与空间类型判断、问题识别与责任归属" caption="真实界面：先判断档次和空间类型，再识别问题、划分责任和扣分。" width={1345} height={1640} />

      <h2>三、责任怎么分清</h2>
      <p>
        消防通道里发现装修垃圾，是保洁没清、秩序没管住，还是装修方乱放？这类问题最容易扯皮。把责任划分规则写清楚，系统按规则自动给出责任部门，现场就不用再争。
      </p>

      <h2>四、外包供应商考核怎么用同一套标准</h2>
      <p>
        外包供应商不服考核，多半是因为“你们打分全凭感觉”。把业主、物业公司和供应商都认可的标准放进系统，评分由同一套标准算出，问题和扣分都有照片，考核结果按合同规则进入供应商账单，由人确认后生效。三方看到的是同一份数据。
      </p>

      <h2>五、巡查次数怎么加</h2>
      <p>
        拍照的人不需要懂标准，所以现场任何人都可以拍。集团的飞行检查也可以用这种方式远程做，见<Link href="/insights/property-flying-inspection">物业飞行检查查什么</Link>。系统见<Link href="/products/fmclaw/connectors/quality">品质巡查与飞行检查系统</Link>。
      </p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据</h3>
        <p>走过场的原因与改法为启盟科技项目经验整理；AI 评分界面为 FMClaw™ 真实截图；百度搜索联想词，2026-10-28。</p>
      </aside>
    </ArticleShell>
  );
}
