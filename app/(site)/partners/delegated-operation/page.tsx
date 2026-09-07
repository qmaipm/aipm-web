import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { POLICY, PARTNER_PATH, PROJECT_PATH, GRADES, ROLES, money, percent } from "@/lib/delegated-policy";
import { Arrow, ScenarioCards } from "../../products/fmclaw/_shared";
import "./page.css";
const SITE = process.env.SITE_URL || "https://www.aipm.cn";
export const metadata = pageMetadata(PARTNER_PATH, {
  title: "AI 物业代运营发展伙伴 · 项目推荐与持续分润 | 启盟科技",
  description: "你带来值得经营的物业项目，启盟负责评估、方案与运营。AI 物业代运营发展伙伴计划 V2.0：免费加入，项目报备确认后享180天初始保护，按项目等级与贡献获得开业奖励及最长三年持续分润。",
});
const portraits = [
  ["01", "你熟悉业主与资产", "酒店物业推荐人、加盟开发与选址顾问，商业地产经纪、资产管理顾问。把已有的业主关系延伸到物业日常运营。"],
  ["02", "你长期服务园区", "物业服务企业、产业园招商运营机构、园区顾问。发现项目的成本、品质及管理需求，协助建立合作。"],
  ["03", "你了解楼宇与设施", "建筑智能化、消防安防、机电、能源管理与机器人服务商。你了解现场，也能联系正在考虑运营升级的客户。"],
  ["04", "你有真实项目入口", "行业顾问、政企数字化服务商、协会商会及区域商务人士。无需自建 AI 团队，先从一个真实项目开始。"],
];
const faqs = [
  { q: "没有公司或 AI 技术团队，也能成为发展伙伴吗？", a: "可以。企业、机构和具有真实项目资源的专业人士均可申请。完成身份及合规审核后合作，启盟负责技术、经营测算和运营交付；不收加盟费，不要求先行采购。" },
  { q: "项目不足三万平方米，还可以推荐吗？", a: "可以。面积是评分维度，不是一票否决条件。区位、收入、收入保障、人员规模或区域打包条件较好的项目，仍可评估。" },
  { q: "分润是按物业费总收入计算吗？", a: "不是。按客户合同约定的固定管理酬金及经确认的提效管理酬金计提，按对应回款进度支付。业主收益、项目总体降本和增收金额、代收代付与采购款不纳入。" },
  { q: "项目签约就可以拿到全部奖励吗？", a: "不可以。开业奖励需满足合同生效、正式进场、运营启动及首笔固定管理酬金回款等条件。首笔约定款部分到账的，按该笔回款比例支付。" },
  { q: "伙伴等级越高，每个项目就一定拿得越多吗？", a: "不一定。伙伴等级决定长期合作权益，具体项目按项目等级和实际贡献认定角色。推荐型、商务协助型、全程开发型的系数分别为50%、75%、100%。" },
  { q: "S 标签是否会替代 ABC 等级？", a: "不会。S 标签独立认定，在原等级开业奖励基础上加奖，再乘项目角色系数。基础评分中的战略属性与 S 标签奖励分别适用，最终以书面确认为准。" },
  { q: "项目报备后，什么时候开始保护？", a: "有效报备通过并由启盟书面确认后，获得180天初始保护。实质性推进可每次续期90天，单项目原则上最长保护12个月，特殊决策周期另行确认。提交回执本身不代表归属确认。" },
  { q: "退出伙伴计划后，已落地项目还会分润吗？", a: "正常退出或不再续签合作协议的，已经书面确认且符合支付条件的项目权益，原则上继续按项目合作确认书执行。重大违约及违法行为按正式协议处理。" },
];
export default function Page() {
  return <main className="dp">
    <JsonLd data={[
      { "@context": "https://schema.org", "@type": "WebPage", name: "AI 物业代运营发展伙伴计划", url: `${SITE}${PARTNER_PATH}`, inLanguage: "zh-CN", description: metadata.description, about: { "@type": "Service", name: "AI 物业代运营", url: `${SITE}/ai-service/delegated-operation` } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "生态伙伴", item: `${SITE}/partners` }, { "@type": "ListItem", position: 2, name: "AI 物业代运营发展伙伴", item: `${SITE}${PARTNER_PATH}` }] },
    ]} />
    <section className="dp-hero">
      <Image className="dp-hero-image" src="/ai-service/skyline.jpg" alt="城市中的写字楼、商业楼宇与物业运营场景" fill priority sizes="100vw" />
      <div className="dp-hero-shade" /><div className="dp-grid" aria-hidden="true" />
      <div className="wrap dp-hero-content">
        <nav className="dp-crumb" aria-label="面包屑"><Link href="/partners">生态伙伴</Link><span>/</span><span>AI 物业代运营发展伙伴</span></nav>
        <h1>你带来物业项目<br /><span className="grad">我们负责把它做成</span></h1>
        <p className="dp-lead">你熟悉业主、园区或企业决策人，启盟提供 AI 运营体系与项目团队。<b>从项目引荐开始，按实际贡献分享项目落地与持续运营收益。</b></p>
        <div className="dp-actions"><a href="#cooperation" className="btn btn-primary">看看如何合作 <Arrow /></a><Link href={PROJECT_PATH} className="btn btn-ghost">评估并报备项目 <Arrow /></Link></div>
        <div className="dp-proof"><span><b>0 元</b>加入</span><span>有效报备初始保护 <b>{POLICY.protectionDays} 天</b></span><span>持续分润 <b className="grad">最长 3 年</b></span></div>
        <p className="dp-hero-note">公开招募版 V{POLICY.version} · {POLICY.published} · 具体权益以正式协议和项目合作确认书为准</p>
      </div>
    </section>
    <section className="dp-band" id="cooperation"><div className="wrap">
      <span className="dp-eyebrow">01 / 适合谁</span><h2>你的客户关系，可以从这里开始合作</h2>
      <p className="dp-read">我们寻找能够发现项目、引荐决策人并推动合作的伙伴。你不需要独立完成复杂的经营测算，也不需要承担未经约定的运营交付。</p>
      <div className="dp-portraits">{portraits.map(([n,t,d]) => <article key={n}><span className="dp-number">{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
      <p className="dp-inline"><Link href="/insights/hotel-property-referral-to-ai-operations">有酒店物业开发经验？先看项目推荐指南 <Arrow /></Link></p>
    </div></section>
    <section className="dp-band mist"><div className="wrap">
      <span className="dp-eyebrow">02 / 项目条件</span><h2>找有真实经营基础的物业项目</h2>
      <div className="dp-split"><div><p>产业园区、写字楼、商业综合体、工厂、企业总部及物流园区。人员规模较大的项目，是 AI 与机器人优化服务预算的重点评估对象。</p><ul className="dp-checks"><li>能接触实际决策人，产权及委托关系清晰</li><li>现有合同可依法调整或即将到期</li><li>愿意提供经营资料，接受数字化管理与考核</li><li>具备经营可行性及成本、效率或品质改善空间</li></ul></div><aside className="dp-note-panel"><h3>面积是维度，不是唯一门槛</h3><p>原则上优先评估 3 万㎡以上项目。面积不足但区位、收入、收入保障或人员规模较好的项目，仍可报备；符合条件的同区域项目可打包评估。</p><p>仅有客户名单、主体争议、合同无法调整或只采购单一设备的项目，不作为标准代运营项目推进。</p><Link href={PROJECT_PATH}>按五项标准预评项目 <Arrow /></Link></aside></div>
    </div></section>
    <section className="dp-band"><div className="wrap">
      <span className="dp-eyebrow">03 / 项目分工</span><h2>做到哪一步，按对应角色确认收益</h2>
      <p className="dp-read">同一个伙伴在不同项目可以承担不同角色。角色按实际贡献书面确认，不由伙伴等级直接决定。</p>
      <div className="dp-roles">{Object.entries(ROLES).map(([k,r]) => <article key={k}><span className="dp-role-factor">{percent(r.factor)}</span><h3>{r.label}</h3><p>{r.work}。</p><small>适用于奖励与标准分润比例</small></article>)}</div>
      <div className="dp-responsibility"><b>启盟负责</b><p>项目评估、现场踏勘、经营测算、合作方案、商务谈判、签约进场与持续运营。注册、认证、优选、战略伙伴等级，用于长期支持与区域合作权益。</p></div>
    </div></section>
    <section className="dp-band mist" id="policy"><div className="wrap">
      <span className="dp-eyebrow">04 / V{POLICY.version} 收益政策</span><h2>一次项目落地，三部分合作收益</h2>
      <p className="dp-read">以下为全程开发型标准。其他角色按系数执行。开业奖励由启盟承担，不因此向业主收取开办费或筹备费。</p>
      <div className="dp-table-scroll" tabIndex={0} role="region" aria-label="伙伴奖励及分润标准"><table className="dp-table"><caption>项目等级 × 标准政策 × 项目角色系数</caption><thead><tr><th>项目等级</th><th>评分</th><th>开业奖励</th><th>固定酬金分润</th><th>提效酬金分润</th></tr></thead><tbody>{Object.entries(GRADES).map(([key,g]) => <tr key={key}><th scope="row">{g.label}<small>{g.positioning}</small></th><td>{key === "A" ? "80 分及以上" : key === "B" ? "70—79 分" : key === "C" ? "60—69 分" : "60 分以下"}</td><td>{money(g.opening)}</td><td>{percent(g.fixed)}</td><td>{percent(g.efficiency)}</td></tr>)}</tbody></table></div>
      <div className="dp-policy-note"><strong>S 标签额外奖励 {money(POLICY.strategicBonus)}</strong><p>经认定的 A-S、B-S、C-S 项目，在对应等级开业奖励上加奖，再乘角色系数。S 标签不自动改变基础等级，材料及战略价值需专项确认。</p></div>
      <div className="dp-split dp-rules"><div><h3>怎么算，何时付</h3><p>固定酬金按有效合同金额计提；浮动提效酬金达到约定条件，并经客户确认后计提。对应款项部分到账，按回款比例支付。</p><p>不按物业总收入、业主收益、项目总体降本或增收金额计算。采购款、税费及代收代付款不纳入。</p></div><div><h3>期限与结算</h3><p>自正式运营起，持续分润最长连续 {POLICY.maxMonths} 个月。合同不足三年的按有效合同期限执行，未签续约不提前计入。</p><p>按季度核算，季后原则上 10 个工作日内对账，收到合法凭证后原则上 15 个工作日内支付。特殊事项以项目文件为准。</p></div></div>
      <div className="dp-actions"><Link className="btn btn-primary" href={PROJECT_PATH}>试算我的项目 <Arrow /></Link><a href={POLICY.whitepaper} className="btn btn-ghost" download>下载完整白皮书 V{POLICY.version} <Arrow /></a></div>
    </div></section>
    <section className="dp-band"><div className="wrap">
      <span className="dp-eyebrow">05 / 报备与保护</span><h2>先确认项目，再共同推进</h2>
      <ol className="dp-process"><li><b>提交真实项目</b><p>先提交基本信息，可以脱敏。资料不全时先补充，不要求一开始就提供整份合同。</p></li><li><b>查重与归属确认</b><p>完整信息原则上 3 个工作日内反馈。有效报备通过后确认项目编号、归属及保护期。</p></li><li><b>联合评估与推进</b><p>共同见业主、踏勘、测算与沟通方案。重大投入前书面明确暂定等级、角色与政策。</p></li><li><b>签约进场与结算</b><p>最终等级在签约或进场前确认。满足条件形成奖励，并按对应回款进度结算。</p></li></ol>
      <p className="dp-policy-note">初始保护 {POLICY.protectionDays} 天，实质性推进可每次续期 {POLICY.renewalDays} 天，原则上最长 {POLICY.maxProtectionMonths} 个月。同一业主的其他独立项目需重新报备。多人协作在项目标准总额内书面约定分配，不重复叠加。</p>
    </div></section>
    <section className="dp-band mist"><div className="wrap">
      <span className="dp-eyebrow">06 / 承接能力</span><h2>先看看我们如何经营真实场景</h2>
      <div className="dp-metrics"><div><b>100+</b><span>企业客户</span></div><div><b>3000 万㎡</b><span>系统覆盖面积</span></div><div><b>300 万㎡</b><span>代运营在管面积</span></div></div>
      <p className="dp-read">2019 年起自建物业公司验证 AI 运营方法。以下案例用于说明运营与技术能力，不代表每个项目均采用同一委托合同或获得相同收益。</p>
      <ScenarioCards items={[
        { href: "/cases/30w-park-ai-property-manager-robot", lab: "园区案例", t: "30 万㎡科技园的人机协作", d: "看人与机器人如何统一调度，服务如何被量化。", img: "/cases/cover-tech-park.png", alt: "科技园区案例的楼宇与运营场景封面" },
        { href: "/cases/south-china-mixed-use-6-to-1", lab: "综合体案例", t: "6 万㎡综合体的运营调整", d: "看工作流与管理方式如何调整，项目如何改善经营。", img: "/cases/cover-mixed-use.png", alt: "商业综合体案例的建筑与服务场景封面" },
      ]} />
      <p className="dp-inline"><Link href="/company/aipm-validation">阅读爱物管自营验证 <Arrow /></Link><Link href="/ai-service/delegated-operation">了解业主侧的委托运营模式 <Arrow /></Link></p>
    </div></section>
    <SeoFaq heading="合作前，先把这些问题说明白" items={faqs} />
    <section className="dp-band mist" id="contact"><div className="wrap">
      <span className="dp-eyebrow">07 / 从一个项目开始</span><h2>你认识的业主，正在考虑运营升级吗</h2><p className="dp-read">可以先预评，也可以直接报备。暂时没有具体项目，希望了解合作方式，也欢迎联系发展伙伴受理人。</p>
      <div className="dp-actions"><Link href={PROJECT_PATH} className="btn btn-primary">评估并报备项目 <Arrow /></Link><a className="btn btn-ghost" href="mailto:liuziwen@aipm.cn">联系发展伙伴受理人 <Arrow /></a></div>
      <p className="dp-inline"><a href="tel:02089853580">020-8985 3580</a><a href="mailto:liuziwen@aipm.cn">liuziwen@aipm.cn</a></p>
      <p className="dp-small">申请需通过身份、利益冲突及合规审核。不得擅自报价、承诺业主保底或私下收费。客户相关工作人员、采购评审人员等涉及利益冲突的情形需审查，披露身份不等于允许领取佣金。</p>
    </div></section>
  </main>;
}
