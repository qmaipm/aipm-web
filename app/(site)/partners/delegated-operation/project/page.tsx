import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { POLICY, PARTNER_PATH, PROJECT_PATH, BANDS } from "@/lib/delegated-policy";
import { intakeEnabled } from "@/lib/project-intake";
import ProjectTool from "./ProjectTool";
import "../page.css";
export const dynamic = "force-dynamic";
const SITE = process.env.SITE_URL || "https://www.aipm.cn";
export const metadata = pageMetadata(PROJECT_PATH, {
  title: "物业委托管理项目评估与报备 · 合作方向参考 | 启盟科技",
  description: "填写项目位置、管理面积、现有收入、入住及保障、人员情况，了解物业委托管理合作方向，可选查看伙伴收益情景并准备报备。依据白皮书 V2.1，结果仅供沟通参考，不代表准入、归属或收益承诺。",
});
const dimensions = [
  { t: "区位与战略属性", d: "城市区位 5 分、交通 4 分、周边配套 3 分、战略属性 3 分。同一事实不在基础评分中重复计分；S 标签额外奖励另行认定。" },
  { t: "实际管理面积", d: "以实际管理面积计算，面积不是一票否决条件。同一区域、同一业主统一委托且能够统一进场运营的项目，可以合并。", bands: BANDS.area, unit: "㎡" },
  { t: "当前可确认物业收入", d: "以当前年度物业服务、设施管理及经合同确认的其他稳定运营收入为依据，不将预测增收计入。", bands: BANDS.revenue, unit: "元／年" },
  { t: "入住率及收入保障", d: "入住率最高 10 分，收入保障最高 5 分。全部空置面积有明确、书面、可执行保障时，入住率得分最低按 8 分计算，不改变实际入住率。", bands: BANDS.occupancy, unit: "%" },
  { t: "现有人员编制", d: "人数最高 20 分，人员密度最高 5 分。计入自有人员及长期固定外包岗位，剔除临时施工与非项目常驻人员。每万㎡5人及以上密度得5分，其下按4、3、2、1分分档。", bands: BANDS.staff, unit: "人" },
];
export default function Page() {
 return <main className="dp">
  <JsonLd data={[
   { "@context":"https://schema.org", "@type":"WebPage", name:"物业委托管理项目评估与报备", url:`${SITE}${PROJECT_PATH}`, inLanguage:"zh-CN" },
   { "@context":"https://schema.org", "@type":"BreadcrumbList", itemListElement:[{ "@type":"ListItem",position:1,name:"生态伙伴",item:`${SITE}/partners` },{ "@type":"ListItem",position:2,name:"委托管理发展伙伴",item:`${SITE}${PARTNER_PATH}` },{ "@type":"ListItem",position:3,name:"项目评估与报备",item:`${SITE}${PROJECT_PATH}` }] },
  ]} />
  <header className="dp-tool-head"><div className="wrap">
   <nav className="dp-crumb" aria-label="面包屑"><Link href="/partners">生态伙伴</Link><span>/</span><Link href={PARTNER_PATH}>委托管理发展伙伴</Link><span>/</span><span>项目评估与报备</span></nav>
   <div className="dp-tool-intro"><div><h1>先了解项目<br /><span className="grad">再确认如何合作</span></h1><p className="dp-read">填写已知情况，了解适合的合作方向。业主可以沟通委托需求，推荐伙伴也可查看收益情景、准备报备。</p></div><aside className="dp-tool-info"><b>不清楚，也可以先聊</b><p>按实际情况填写即可。合作方向依据白皮书 V{POLICY.version} 形成，正式条件与权益需进一步核实。</p><a href="#scoring-rules">了解填写口径</a></aside></div>
  </div></header>
  <ProjectTool enabled={intakeEnabled()} analyticsEnabled={process.env.SITE_ENV === "production"} />
  <section className="dp-band" id="scoring-rules"><div className="wrap"><span className="dp-eyebrow">V{POLICY.version} / 资料口径</span><h2>按现有情况填写，不必预估收益</h2><p className="dp-read">填写实际管理范围、当前可确认收入、真实入住率与固定服务人员。未知项可以留空；预测降本、增收不能代替现有经营数据。</p><p className="dp-read">合作方向用于初步沟通，不评价物业品质。项目准入、伙伴角色、S 标签、归属与权益均需正式确认。</p>
   <details className="dp-disclosure dp-policy-reference"><summary>查看白皮书 V{POLICY.version} 评分依据</summary><p>以下为政策附件的原有规则，不是对物业品质的评价。80 分及以上为 A 级，70—79 分为 B 级，60—69 分为 C 级，其余为储备级。重大合规、产权、经营主体或回款风险仍可能导致暂缓或终止评估。</p>
   {dimensions.map((d,i)=><details className="dp-disclosure" key={d.t}><summary>{`0${i+1} · ${d.t}`}</summary><p>{d.d}</p>{d.bands&&<ul>{d.bands.map(([min,score],j)=><li key={min}>{min===0?`低于 ${d.bands![j-1][0].toLocaleString("zh-CN")} ${d.unit}`:j===0?`${min.toLocaleString("zh-CN")} ${d.unit}及以上`:`${min.toLocaleString("zh-CN")} 至低于 ${d.bands![j-1][0].toLocaleString("zh-CN")} ${d.unit}`}：{score} 分</li>)}</ul>}</details>)}
   </details>
   <p className="dp-inline"><Link href="/insights/property-project-assessment-data">五项资料怎么准备？查看初评指南</Link><a href={POLICY.whitepaper} download>下载白皮书及评分附件</a><Link href={`${PARTNER_PATH}#policy`}>查看完整奖励与分润政策</Link></p>
   <div id="data-notice"><h3>报备资料如何使用</h3><p>广州启盟科技有限公司为处理本次项目评估、查重、联系与合作确认，收集你主动提交的联系方式、项目资料和评分输入。资料保存在非公开受理台账，由有权限的受理人员处理；通知邮件仅包含受理编号，不发送经营资料。</p><p>请只提交你有权提供的必要信息。首轮不上传完整合同、身份证、客户财务附件或无关个人资料。资料保存以处理报备、履行合作及必要的合规义务为限，不公开展示或作为营销名单转售。</p><p>如需查阅、更正、删除或撤回同意，可联系 <a href="mailto:liuziwen@aipm.cn">liuziwen@aipm.cn</a> 或 <a href="tel:02089853580">020-8985 3580</a>，核验身份后按适用要求处理。撤回同意不影响此前合法处理及依法需保留的信息。</p></div>
  </div></section>
 </main>;
}
