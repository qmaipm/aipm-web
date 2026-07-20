import ArticleShell, { Figure, FigRow } from "../_ArticleShell";
import { articleMetadata } from "../articles";

export const metadata = articleMetadata("obc-impact", {
  title: "OBC 模式的影响力和应用进度 · 行业研究 | 启盟科技",
  description:
    "OBC 提升行业标准、增强客户满意度、推动可持续发展。新加坡已有超 110 家机构采用,并向商业领域与海外地区扩散。",
});

export default function Page() {
  return (
    <ArticleShell slug="obc-impact">
      <p className="lede">
        OBC 不只是换一种付费方式,它正在重塑整个保洁与设施服务行业的运行逻辑:通过提升技术和管理水平、建立明确的质量评估体系、增强客户满意度,同时推动资源的优化配置,促进行业的可持续发展。
      </p>

      <Figure
        src="/insights/obc-impact-1-office.jpg"
        alt="现代办公与设施服务场景"
        caption="从政府到商业,OBC 正在越来越多真实场景里落地。"
      />

      <h2>OBC 的影响力,体现在三个方面</h2>
      <ul>
        <li><b>提升行业标准与质量：</b>它促使保洁供应商以结果为导向去运作,推动技术不断进步,并建立起量化、标准化的质量评估体系,让“服务好不好”第一次可以被客观衡量。</li>
        <li><b>增强客户满意度：</b>合同里明确规定了服务结果和标准,客户能更清楚地知道自己买到的是什么样的服务和质量;清晰的预期,反过来也促使服务商主动改进。</li>
        <li><b>推动行业可持续发展：</b>通过优化资源配置,有效降低了成本和浪费,让行业摆脱低水平的人力消耗,走向更健康的长期发展。</li>
      </ul>

      <FigRow
        cols={2}
        items={[
          {
            src: "/insights/obc-impact-2-assistant.png",
            alt: "智能管理助手界面",
            caption: "智能管理助手:让服务结果与达标情况可视、可追溯。",
          },
          {
            src: "/insights/obc-impact-3-calc.jpg",
            alt: "OBC 成本与成效测算",
            caption: "数据测算:把“按成果付费”落到可核算的成本与成效上。",
          },
        ]}
      />

      <h2>应用进度:从政府,到商业,到海外</h2>
      <p>目前,新加坡已有超过 110 家机构采用 OBC 模式。它的扩散路径,清晰地分成三层:</p>
      <ul>
        <li><b>政府与公共机构推动：</b>在公共设施的清洁服务采购中,明确规定清洁标准,以成果作为验收和付费依据,起到了示范和牵引作用。</li>
        <li><b>商业领域逐步扩大：</b>购物中心、写字楼等商业物业也开始采用这一模式,把成果导向引入更广泛的市场化场景。</li>
        <li><b>海外地区推广：</b>除新加坡外,中东等地区也在政府和教育系统中推广 OBC,显示出它作为一种管理范式的普适性。</li>
      </ul>
      <p className="pull">OBC 正在从一项地方实践,长成一种被越来越多市场接受的行业范式。</p>
    </ArticleShell>
  );
}
