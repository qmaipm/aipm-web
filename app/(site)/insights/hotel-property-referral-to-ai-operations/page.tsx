import Link from "next/link";
import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";
import { POLICY, PARTNER_PATH, PROJECT_PATH, ROLES, estimateReturns, money, percent } from "@/lib/delegated-policy";

export const metadata = articleMetadata("hotel-property-referral-to-ai-operations", {
  title: "做酒店开发的人，手上的业主资源还能做什么：给写字楼和园区推荐管理公司 | 启盟科技",
  description: "酒店开发、拓展与选址顾问：找物业、联系产权人、判断时机、安排业主与管理公司见面——这套能力可以直接用在写字楼、园区的物业委托管理项目上。首次沟通问什么，如何按启盟 V2.0 确认贡献角色、开业奖励与最长三年分润，报备保护怎么算。不是订房返佣，不是加盟，不是城市合伙人。",
});

const example = estimateReturns("A", "refer", false, 0, 0, 12);

export default function Page() {
  return (
    <ArticleShell slug="hotel-property-referral-to-ai-operations" variant="delegated">
      <p className="lede">如果你做酒店开发或拓展，你的工作是：找到合适物业，联系产权人，判断合作时机，再安排业主与管理公司见面。同一个业主手上，除了酒店，往往还有写字楼、园区或综合体——这些资产现在也可以像酒店一样交给管理公司经营，而你已经会做这件事的前四步。不同的是，需要重新判断业主想解决的经营问题。为什么这个机会现在才出现，见<Link href="/insights/hotel-management-contract-model-beyond-hotels">酒店委托管理模式运行了四十年，为什么一直没走出酒店行业</Link>。</p>

      <h2>推荐的是运营机会，不是订房客源</h2>
      <p><b>先分清你掌握的是哪一种资源。</b>客房销售面对住客、旅行社或企业差旅；物业项目拓展面对业主、资产管理方及有授权的项目决策人。能带来入住订单，不自动意味着能推进物业委托。</p>
      <p>可迁移的经验主要有三项：识别真实物业与管理范围，接触能作决定的人，判断什么时候适合谈合作。原服务合同到期、业主想改善品质或重新组织管理，都可以成为沟通线索，但不能替代对实际需求的核实。</p>
      <Figure src="/insights/hotel-property-referral-cover.jpg" width={1800} height={1005} alt="会议桌上的办公园区建筑模型，窗外可见园区楼宇与公共空间" caption="场景还原（AI 生成）：用物业范围展开项目沟通。画面为概念性场景，非真实客户现场，也不代表已签约项目。" />

      <h2>第一次沟通，先把四件事问清楚</h2>
      <p><b>比起先介绍技术，先确认项目能不能进入正式讨论。</b>不清楚的内容可以标注待补充，不必为了完成报备而猜一个数字。</p>
      <ol>
        <li><b>谁能决定。</b>产权人、资产管理方和现场物业经理可能不是同一个主体。问清联系人职务，以及谁有权讨论委托范围和合同调整。</li>
        <li><b>具体管哪里。</b>确认城市、业态、大致管理面积及是否能够统一委托。不要把同一业主名下、却无法共同运营的物业直接合并。</li>
        <li><b>为什么现在谈。</b>业主希望改善品质、减少管理投入，还是调整人员与供应商配置？现有合同何时到期，是否具备依法调整的条件？</li>
        <li><b>下一步如何见面。</b>是否获得介绍意愿，能否安排正式沟通，哪些经营资料可以由授权人员提供？第一次不需要转发完整合同和客户财务附件。</li>
      </ol>
      <p>如果对方只是想买一套系统，应引向产品选型；如果希望把约定范围内的日常经营交给运营方，才继续讨论代运营。可以把<Link href="/insights/property-software-outsourcing-or-delegated-operations">三种合作方式的区别</Link>先发给业主，避免双方谈的不是一件事。</p>

      <h2>按实际贡献选角色，不必一开始全包</h2>
      <p><b>启盟 V{POLICY.version} 将项目贡献分为三类。</b>角色系数反映承担的开发工作，不是交费购买的伙伴等级。实际贡献、项目角色及权益均需书面确认。</p>
      <table className="isd-matrix">
        <caption>发展伙伴角色与系数，依据公开白皮书 V{POLICY.version}</caption>
        <thead><tr><th scope="col">角色</th><th scope="col">系数</th><th scope="col">承担的工作</th></tr></thead>
        <tbody>{Object.values(ROLES).map(r => <tr key={r.label}><th scope="row">{r.label}</th><td data-label="系数">{percent(r.factor)}</td><td data-label="承担的工作">{r.work}</td></tr>)}</tbody>
      </table>
      <p>项目推荐人不需要把自己包装成技术交付团队。方案测算、系统部署与运营实施由启盟组织；伙伴按约定推进引荐或商务工作。不要提前替运营方承诺服务结果、报价或业主收益。</p>

      <h2>报酬看贡献和形成条件，不看口头承诺</h2>
      <p><b>伙伴报酬与物业项目总收入不是同一个口径。</b>白皮书区分一次性开业奖励、固定管理酬金分润和提效管理酬金分润，再结合项目等级与角色系数计算。</p>
      <p>例如，经确认的 A 级项目按项目推荐型参与，不计 S 标签时，标准开业奖励为 {money(example.opening)}。固定管理酬金分润比例为 {percent(example.fixedRate)}，提效管理酬金分润比例为 {percent(example.efficiencyRate)}。这只是政策计算，不是报备后的应付金额。</p>
      <p>开业奖励需满足合同生效、正式进场、运营启动及首笔固定管理酬金回款等条件。持续分润自正式运营起最长 {POLICY.maxMonths} 个月，按约定形成条件与实际回款执行。S 标签另行认定；不知道酬金金额时，先看比例，不推算一个预期总收入。</p>
      <p>详细分档、额外奖励与结算说明以<Link href={`${PARTNER_PATH}#policy`}>完整伙伴政策</Link>和正式文件为准。合作应如实披露利益关系，依法合规取得项目，不以隐瞒关系或不当利益换取推荐机会。</p>

      <h2>先报备查重，再确认归属和保护</h2>
      <p><b>提交回执只说明资料已保存，保护期从正式确认起算。</b>在启盟核验资料、查重并书面确认前，不应把某个项目说成自己已经独家拥有。</p>
      <p>V{POLICY.version} 初始保护期为 {POLICY.protectionDays} 天，续期通常为 {POLICY.renewalDays} 天，累计原则上不超过 {POLICY.maxProtectionMonths} 个月。续期需要真实推进依据；具体归属和起算时间以书面确认为准。</p>
      <p>预评会看区位、面积、当前可确认收入、入住及收入保障、现有人员编制。人员规模和密度较高有意获得更多分值，反映现有服务预算的优化空间；这不等于鼓励增加编制。未知项留空，正式等级仍需核验。</p>
      <p>下一步可以整理一个真实项目，在<Link href={PROJECT_PATH}>项目评估与报备页</Link>先了解合作方向。在线提交若尚未开放，页面会提供联系办法；任何联系渠道都不能跳过人工归属确认。</p>

      <aside className="isd-source" aria-label="资料依据">
        <h3>资料依据与适用范围</h3>
        <p>伙伴政策：<a href={POLICY.whitepaper}>《启盟科技 AI 物业代运营发展伙伴计划白皮书 V{POLICY.version}》</a>。本文用于解释参与方式，具体项目以正式确认文件为准。</p>
        <p>行业参考：<a href="https://development.wyndhamhotels.com/apac/" target="_blank" rel="noopener noreferrer">Wyndham 亚太酒店开发入口</a>区分现有酒店品牌转换与新建项目开发。该参考仅说明酒店物业开发的对象，不代表其参与启盟合作，也不用于推导推荐报酬。</p>
      </aside>
    </ArticleShell>
  );
}
