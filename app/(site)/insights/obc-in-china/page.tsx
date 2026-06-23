import ArticleShell, { Figure } from "../_ArticleShell";

export const metadata = {
  title: "OBC 模式在中国的落地和实践 · 行业研究 — 启盟科技",
  description:
    "不“数人头”,要“看结果”。基于自研智能服务记录(SSR),OBC 模式在联合办公、快递物流、通信制造三个真实项目里的数智化考核与成效。",
};

export default function Page() {
  return (
    <ArticleShell slug="obc-in-china">
      <p className="lede">
        在现代物业服务管理体系中,如何提升服务质量和服务满意度,始终是企业关注的焦点。OBC(Outcome-Based Contracting)模式作为一种创新的管理理念,自新加坡 2017 年将其应用在保洁、保安服务起,迅速受到广泛关注并取得了显著成效——它聚焦实际的服务结果,把成果作为绩效评价的核心指标,为行业带来了新的发展契机。
      </p>
      <p>
        我们深耕服务管理领域多年,基于全自研的智能服务记录(SSR,Smart Service Record),能够采集大量的现场服务数据,帮助用户真正看到工时、效率、质量等数据,成为国内能够支持服务购买方通过 OBC 模式对服务供应商进行数智化考核的实用工具。
      </p>

      <h2>我们的 OBC 模式</h2>
      <p>
        基于自身的科研实力和服务上百个项目的经验,我们形成了特有的 OBC 服务结果指标体系。用户可以根据自身需求,灵活地选择、组合并使用这些指标,达到自己的管理目标,与供应商形成更健康、友好的合作关系。
      </p>

      <Figure
        src="/insights/obc-china-1-metrics.png"
        alt="OBC 服务结果指标体系:工时类、工作过程类、服务质量类、服务工单类结果"
        caption="OBC 服务结果指标体系:工时、过程、质量、工单四类结果,由 SaaS、AIOT 与 AI 采集和支撑。"
      />

      <h2>不“数人头”,要“看结果”</h2>
      <p>
        用户获得真实的数据后,便可以按照合同约定对服务供应商进行考核、对账。这种考核方式的核心在于“看结果”而非简单地“数人头”,强调结果的实际价值和影响力,从而更有效地驱动服务供应商提升服务水平,达到双赢的目的。
      </p>
      <p className="pull">把考核的锚点从“人在不在”换成“事成没成”,合作关系才真正健康。</p>

      <Figure
        src="/insights/obc-china-2-rules.png"
        alt="符合 OBC 模式的数智化合约考核匹配规则"
        caption="拿到真实数据后,按合同约定做数智化考核与对账。"
      />

      <h2>三个真实项目里的 OBC</h2>

      <div className="case-row">
        <figure className="case-media">
          <img src="/insights/obc-china-3-case1.jpg" alt="某联合办公用户的办公空间现场" loading="lazy" />
          <figcaption>某全球化联合办公用户的办公空间。</figcaption>
        </figure>
        <div className="case">
          <div className="case-k">案例 01 · 联合办公</div>
          <h3>节省了大量对账成本,丰富了供应商考核指标</h3>
          <p className="case-scale">全球化共享办公,1000 万平米办公空间。项目数 80+ · 人数 500+。</p>
          <ul>
            <li>全国近 90 个社区的保洁、保安、工程服务,10 多家供应商;</li>
            <li>对账成本高、质量差:每月手动收集考勤、统计审核,易掺人情分;</li>
            <li>供应商考核难:除了数人头,缺乏过程数据。</li>
          </ul>
          <ul className="statrow">
            <li><b>260</b><span>对账成本减少 人/天/月</span></li>
            <li><b>17%</b><span>管理成本节省</span></li>
          </ul>
        </div>
      </div>

      <div className="case-row">
        <figure className="case-media">
          <img src="/insights/obc-china-4-case2.jpg" alt="某世界级快递物流服务商的园区与机房场景" loading="lazy" />
          <figcaption>某世界级快递物流服务商的园区与机房。</figcaption>
        </figure>
        <div className="case">
          <div className="case-k">案例 02 · 快递物流</div>
          <h3>提升设备巡检到岗率,人单合一保生产</h3>
          <p className="case-scale">世界级物流快递货运企业。项目数 60+ · 人数 5000+。</p>
          <ul>
            <li>全国近 70 个写字楼、产业园、物流园及货运航空枢纽;</li>
            <li>重点机房、设备超 110,000+,电子巡单反而方便了作弊;</li>
            <li>总部卫生间、茶水间等重点区域,多次专项整改难见效。</li>
          </ul>
          <ul className="statrow">
            <li><b>42%</b><span>设备临时故障率减少</span></li>
            <li><b>9 个</b><span>质量巡检岗减少</span></li>
          </ul>
        </div>
      </div>

      <div className="case-row">
        <figure className="case-media">
          <img src="/insights/obc-china-5-case3.jpg" alt="某世界级通信设备制造商的重点服务区域" loading="lazy" />
          <figcaption>某世界级通信设备制造商的重点服务区域。</figcaption>
        </figure>
        <div className="case">
          <div className="case-k">案例 03 · 通信制造 / 互联网</div>
          <h3>提升重点区域的服务质量</h3>
          <p className="case-scale">服务点位 1700+,卫生间、茶水间等重点区域。</p>
          <ul>
            <li>全国近 1700 个卫生间、茶水间,投诉率高、整改效果差;</li>
            <li>问题始终无法定位,质量巡检抽查成本高、标准难统一;</li>
            <li>供应商考核难:除了数人头,缺乏过程数据。</li>
          </ul>
          <ul className="statrow">
            <li><b>+60%</b><span>巡检到岗率提升</span></li>
            <li><b>+41%</b><span>服务到岗率提升</span></li>
            <li><b>+57%</b><span>服务达标率提升</span></li>
          </ul>
        </div>
      </div>

      <p>
        三个项目的行业、规模、痛点各不相同,但走的是同一条路:先用 SSR 把现场的工时、到岗、达标这些“看不见”的过程数据采上来,再用 OBC 指标把考核和对账建立在结果之上。当“看结果”取代“数人头”,成本、质量和合作关系,才一起被理顺。
      </p>
    </ArticleShell>
  );
}
