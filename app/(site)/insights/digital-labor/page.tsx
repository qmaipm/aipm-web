import ArticleShell, { Figure } from "../_ArticleShell";
import { articleMetadata } from "../articles";

export const metadata = articleMetadata("digital-labor", {
  title: "关于数字劳动力 · 第四种用工模式 | 启盟科技",
  description:
    "数字化劳动力,也称数字员工,是打破人机边界、以数字化技术赋予“活力”的第四种企业用工模式。八大优势与到 2030 年 1.73 万亿元的市场前景。",
});

export default function Page() {
  return (
    <ArticleShell slug="digital-labor">
      <p className="lede">
        数字化劳动力,也称为数字员工,是打破人与机器边界、以数字化技术赋予“活力”的第四种企业用工模式。它和全职员工、外包员工、兼职员工相互补充,正在悄悄改变企业“用谁来干活”这件事。
      </p>

      <h2>为什么是现在</h2>
      <p>
        纵观当下中国,人口红利正在逐渐消失,但数字化浪潮一路高歌猛进。面对人力短缺、成本上升以及人效不足等诸多挑战,企业正积极寻求创新——利用数字化技术,打破人机边界,推动用工模式的深刻转型。
      </p>

      <Figure
        src="/insights/digital-labor-1-decline.png"
        alt="中国劳动力绝对数量“五连降”"
        caption="中国劳动力绝对数量呈“五连降”——这是“数字员工”登场的背景。"
      />

      <p>
        数字化劳动力通过“人机耦合”的方式,融合大模型、RPA、大数据、自然语言处理等技术,把原本只能靠人堆的重复劳动,交给可以 7×24 小时运转的数字员工,从而充分激活整体的劳动力潜能。
      </p>

      <h2>数字员工的八大优势</h2>
      <ul>
        <li>高效自动化完成重复性工作;</li>
        <li>提供 24/7 不间断服务;</li>
        <li>降低运营成本;</li>
        <li>保持稳定、准确,几乎没有人为错误;</li>
        <li>具备学习进化能力;</li>
        <li>支持数据驱动决策;</li>
        <li>确保数据的安全性和保密性;</li>
        <li>易于复制和扩展。</li>
      </ul>

      <Figure
        src="/insights/digital-labor-2-types.png"
        alt="数字员工的分类"
        caption="数字员工的分类:从流程自动化到具备认知能力的智能体,层层递进。"
      />

      <h2>一个万亿级的市场</h2>
      <p>
        当劳动力的绝对数量持续下降,数字员工的价值就被快速放大。据预测,到 2030 年,数字化劳动力将形成价值 1.73 万亿元的市场,未来 8 年带来约 1.6 万亿元的经济增值空间。
      </p>

      <Figure
        src="/insights/digital-labor-3-forecast.png"
        alt="数字员工的市场前景"
        caption="数字员工的市场前景:到 2030 年形成 1.73 万亿元市场规模。"
        portrait
      />

      <p className="pull">作为第四种用工模式,数字劳动力不会取代人,而是和人一起,构建“智能员工队伍”。</p>
      <ul className="statrow">
        <li><b>1.73 万亿</b><span>2030 年数字劳动力市场规模(元)</span></li>
        <li><b>1.6 万亿</b><span>未来 8 年经济增值空间(元)</span></li>
        <li><b>第 4 种</b><span>继全职、外包、兼职后的用工模式</span></li>
      </ul>
    </ArticleShell>
  );
}
