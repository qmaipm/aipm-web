import ArticleShell, { Figure, FigRow } from "../_ArticleShell";
import { articleMetadata } from "../articles";

export const metadata = articleMetadata("about-obc", {
  title: "关于 OBC 模式 · 以成果为导向的合同 — 启盟科技",
  description:
    "OBC(Outcome-Based Contracting)以可衡量的绩效成果作为合同要求,而非人员编制。结果导向、灵活性、创新激励三大特点,以及新加坡 2017 年起的实践。",
});

export default function Page() {
  return (
    <ArticleShell slug="about-obc">
      <p className="lede">
        OBC,全称 Outcome-Based Contracting,即“以成果为导向的合同模式”。它指的是:服务购买方以可衡量的绩效成果作为合同要求,而不是以现场配了多少人作为依据。在劳动力短缺、用工成本持续上升的背景下,这种合约方式比“数人头”更科学、也更合理。
      </p>

      <h2>它和“数人头”到底差在哪</h2>
      <p>
        “基于人员编制”的合同,买的是投入(派多少人);OBC 买的是产出(达成什么结果)。这一字之差,把选择权交还给了服务商——它可以自主决定用什么技术、配多少人、怎么排班,只要最终的成果达标。于是效率提升、技术创新第一次成了对服务商有利的事。
      </p>

      <h2>OBC 的三个特点</h2>
      <ul>
        <li><b>结果导向：</b>合同里规定的是期望达成的服务结果(例如清洁质量标准),而不是岗位数量。</li>
        <li><b>灵活性：</b>供应商在技术选择和人员配置上拥有自主权,可以用自己最擅长的方式去达成结果。</li>
        <li><b>创新激励：</b>因为省下来的成本能转化为自己的利润,供应商有了真实动力去采用新技术、提高效率、降低成本。</li>
      </ul>

      <h2>新加坡:从“按人数付费”到“按效果付费”</h2>
      <p>
        新加坡国家环境局(NEA)自 2017 年起,在保洁服务采购中推广 OBC,其核心就是:不再以现场保洁蓝领的人数作为支付标准,而是根据保洁服务的实际效果和效率来评估和支付费用。这一转变,把保洁从一个“用人数堆出来”的行业,推向了“用结果和技术说话”的方向。
      </p>

      <Figure
        src="/insights/about-obc-1-nea.png"
        alt="新加坡国家环境局(NEA)官网关于 OBC 保洁服务的页面"
        caption="新加坡国家环境局(NEA)官网关于 OBC 保洁服务的说明页面。"
      />

      <p>
        为了让买方有据可依,NEA 还配套发布了两份官方指南——一份是 OBC 合同的规范指南,明确怎样把“成果”写进合同;另一份是招标评标指南,指导采购方如何评估和选择以成果为导向的供应商。这两份指南,也成了后来许多机构落地 OBC 的参考蓝本。
      </p>

      <FigRow
        cols={2}
        items={[
          {
            src: "/insights/about-obc-2-spec.png",
            alt: "OBC 合同规范指南封面",
            caption: "OBC 合同规范指南:怎样把“成果”写进合同。",
          },
          {
            src: "/insights/about-obc-3-tender.png",
            alt: "OBC 招标评标指南封面",
            caption: "OBC 招标评标指南:如何评估并选择以成果为导向的供应商。",
          },
        ]}
      />
    </ArticleShell>
  );
}
