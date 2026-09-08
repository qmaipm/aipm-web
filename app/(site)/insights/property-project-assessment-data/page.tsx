import Link from "next/link";
import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";
import { POLICY, PROJECT_PATH, PARTNER_PATH, EMPTY_ASSESSMENT, GRADES, scoreProject } from "@/lib/delegated-policy";

export const metadata = articleMetadata("property-project-assessment-data", {
  title: "物业项目怎么初评？委托管理五项资料准备指南 | 启盟科技",
  description: "按启盟白皮书 V2.0 准备区位、管理面积、当前收入、入住及收入保障、人员编制资料。说明未知项、预测收入、人员密度与 S 标签的处理，并用明确标注的教学示例解释预评级，不承诺项目准入或收益。",
});
const dimensions = scoreProject(EMPTY_ASSESSMENT).dimensions;
const materials = [
  "项目位置、交通与配套情况；战略属性的正式材料或可核验说明。",
  "实际管理边界和面积依据；拟打包项目是否能统一委托、统一运营。",
  "当前年度可确认物业收入及对应合同、台账口径，注明统计期间。",
  "同一统计时点的实际入住情况；空置收入保障的范围、书面约定及可执行性。",
  "实际在岗编制、自有与长期固定外包岗位，注明统计时点和排除项。",
];
// 教学假设，非客户案例；分数始终调用工具同源公式。
const sample = { location: 4, transport: 3, amenities: 2, strategy: 1, area: 50000, revenue: 3000000, occupancy: 50, guarantee: 0, staff: 30 };
const basic = scoreProject(sample);
const guaranteed = scoreProject({ ...sample, guarantee: 5 });

export default function Page() {
  return (
    <ArticleShell slug="property-project-assessment-data" variant="delegated">
      <p className="lede">推荐一个项目，首先要判断是否值得约一次正式沟通，而不是立即承诺能省多少钱。初评的作用是把已知事实与待核实问题分开，让业主、推荐人和运营方知道下一步需要什么。</p>

      <h2>五项资料，要用同一个项目范围</h2>
      <p><b>面积、收入、入住率和人员应尽可能对应同一管理范围，并注明统计期间。</b>如果面积填整个园区、收入只填一栋楼、人员却来自物业公司的多个项目，分数再精确也不能代表这个项目。</p>
      <table className="isd-matrix">
        <caption>五项资料与评分权重，依据白皮书 V{POLICY.version}</caption>
        <thead><tr><th scope="col">维度</th><th scope="col">满分</th><th scope="col">先准备什么</th></tr></thead>
        <tbody>{dimensions.map((d, i) => <tr key={d.label}><th scope="row">{d.label}</th><td data-label="满分">{d.max} 分</td><td data-label="先准备什么">{materials[i]}</td></tr>)}</tbody>
      </table>
      <p>这五项是资料类别，不是要求首轮上传五份完整文件。可以先整理一份有来源说明的摘要；涉及完整合同、财务附件或他人个人信息时，应先确认授权与必要范围，再按约定方式提供。</p>
      <Figure src="/insights/property-assessment-cover.jpg" width={1800} height={1005} alt="从露台俯看办公园区楼宇、公共庭院和连接步道" caption="场景还原（AI 生成）：楼宇和共同服务区域需要对应清晰的管理范围。非真实客户现场，图片不能作为面积或经营数据的证明。" />

      <h2>收入与入住率，先分清事实和假设</h2>
      <p><b>预评级用当前可确认物业收入，不用预计降本或增收替代。</b>物业服务、设施管理以及经合同确认的其他稳定运营收入，应说明统计依据。不能把未来招商目标、伙伴佣金或运营方管理酬金当作项目现有收入。</p>
      <p>实际入住率与空置收入保障是两个输入。保障应说明谁承担、覆盖哪些空置面积、依据是什么，以及是否具备可执行条件。口头表示“以后会补贴”，不应直接填成全部空置面积已有保障。</p>
      <p>V{POLICY.version} 对符合条件的全额空置保障设置评分修正，但不会把真实入住率改写成更高的比例。保留原始数据，才能在核验时解释每一分从哪里来。</p>

      <h2>面积和人员，按现有服务预算判断</h2>
      <p><b>面积不是唯一门槛，人员规模和密度加分也没有写反。</b>这套政策有意关注现有人员较多、服务预算存在优化空间的项目，不能据此倒推“人数越少才越好”。</p>
      <p>人数计入自有人员和长期固定外包岗位，排除临时施工与非项目常驻人员。人员密度由人数和实际管理面积计算；不要为了提高分数，扩大人数口径或缩小面积口径。</p>
      <p>小体量项目仍可按实际情况评估。同一区域、同一业主的项目，只有具备统一委托和统一进场运营条件时，才讨论合并；不是把一张业主资产清单相加就能打包。</p>

      <h2>一个教学示例：保障改变评分，不改事实</h2>
      <p><b>下面只演示公式，不是客户案例或收益预测。</b>假设项目实际管理面积为 5 万㎡，当前年度可确认物业收入为 300 万元，实际入住率为 50%，在岗 30 人。</p>
      <p>区位分项假设为城市区位 4 分、交通 3 分、配套 2 分、战略属性 1 分。其余条件不变，比较无明确收入保障与符合全部空置面积书面可执行保障的两种情况。</p>
      <table className="isd-matrix">
        <caption>同一组教学数据，仅改变收入保障条件</caption>
        <thead><tr><th scope="col">条件</th><th scope="col">预评分</th><th scope="col">实际入住率</th></tr></thead>
        <tbody>
          <tr><th scope="row">无明确保障</th><td data-label="预评分">{basic.total} 分 · {GRADES[basic.grade!].label}</td><td data-label="实际入住率">{sample.occupancy}%</td></tr>
          <tr><th scope="row">全部空置面积具备书面可执行保障</th><td data-label="预评分">{guaranteed.total} 分 · {GRADES[guaranteed.grade!].label}</td><td data-label="实际入住率">{sample.occupancy}%</td></tr>
        </tbody>
      </table>
      <p>变化来自保障条件及其评分修正，不是更换经营事实。材料不支持后一种条件时，就不能按后一种填写。本文算例和<Link href={PROJECT_PATH}>项目工具</Link>使用同一套 V{POLICY.version} 公式。</p>

      <h2>预评级之后，仍有三件事要核验</h2>
      <ol>
        <li><b>资料是否可靠。</b>对不一致的统计期间、管理范围和数字来源，先补充解释，再核实现场。</li>
        <li><b>项目是否可推进。</b>产权、主体、委托关系、合同调整和回款风险，都可能影响最终是否合作，不能由总分替代。</li>
        <li><b>伙伴权益如何确认。</b>项目角色、归属和 S 标签需要分别认定。基础战略评分与 S 奖励是有意并存的激励，不互相抵扣。</li>
      </ol>
      <p>未知项留空，不等于自动按零分计入。资料完整后显示的暂定等级也不是准入承诺；提交回执更不代表项目已获保护。先看<Link href={`${PARTNER_PATH}#policy`}>完整伙伴政策</Link>，再带真实机会进入评估。</p>
      <aside className="isd-source" aria-label="资料依据与下一步">
        <h3>准备资料时，保留来源说明</h3>
        <p>每项至少注明管理范围、统计期间、资料提供方和待核实事项。评估阶段按授权提供必要信息，不在公开文章或社交群发布项目经营明细。</p>
        <p>政策依据：<a href={POLICY.whitepaper}>《启盟科技 AI 物业代运营发展伙伴计划白皮书 V{POLICY.version}》</a>。正式准备交接时，再对照<Link href="/insights/property-operations-handover-checklist">业主进场确认清单</Link>；预评级和进场准备是两个阶段。</p>
      </aside>
    </ArticleShell>
  );
}
