import Link from "next/link";
import NewsShell from "../_NewsShell";
import { newsMetadata } from "../articles";

export const metadata = newsMetadata("nvidia-startup-showcase-2025");

export default function Page() {
  return (
    <NewsShell slug="nvidia-startup-showcase-2025">
      <p className="lede">
        8 月 12 日,启盟科技(品牌:爱物管)成功入围「2025 NVIDIA 创业企业展示·广州站」与「NVIDIA 初创加速计划」,并于现场获颁「优秀企业」证书。创始人 & CEO 滕一帆向与会投资人、行业专家及合作伙伴路演了深度赋能物业现场管理的 AI 现场管理智能体。
      </p>

      <h2>跻身顶尖生态</h2>
      <p>
        NVIDIA 创业企业展示自 2017 年启动以来已连续举办 9 年,累计支持上千家企业,在中国科技创业生态中具有重要影响力。本次活动聚焦 AI 智能体、物理 AI 和机器人、企业出海等方向,汇集了 NVIDIA、Google Cloud 的技术专家与投资机构代表。启盟科技展示了基于 NVIDIA 算力技术打造的智能体成果——用 AI 提升 FM 行业的数智化水平。
      </p>

      <h2>一人管多项目:上线三个月的真实业绩</h2>
      <p>
        路演环节,启盟科技展示了 AI 现场管理助理如何帮物管公司突破「一个管理团队高效管理多项目」的瓶颈。它通过多模态 AI、IoT 传感器与行业知识库,把「现场巡查—分析决策—派发工单—通知跟进—品质结果评估」整条链路自动化。以一个 20 万平方米的项目为例,上线三个月:
      </p>
      <ul className="statrow">
        <li><b>3672次</b><span>每日巡查——900+ 个重要点位每天巡 4 次</span></li>
        <li><b>117项</b><span>每天给出的管理建议,具体到位置与原因</span></li>
        <li><b>81个</b><span>每天发出的工单,一次点击完成发单</span></li>
        <li><b>99.2%</b><span>及时接单率(当日接单率 97.4%)</span></li>
      </ul>
      <p>而管理团队自己的时间账是这样的:</p>
      <ul>
        <li>每天服务巡查时间:<b>150 分钟 → 30 分钟</b>;</li>
        <li>项目经理每天工作规划时间:<b>120 分钟 → 10 分钟</b>;</li>
        <li>每天跟进督办结单时间:<b>60 分钟 → 0 分钟</b>。</li>
      </ul>
      <p className="pull">释放出来的时间,让同一支团队可以为更多项目提供优质服务。</p>
      <p>
        「一人管多项目」在真实项目里长什么样,可以看<Link href="/cases/30w-park-ai-property-manager-robot">这个 30 万㎡园区的案例</Link>;想了解这套智能体的产品形态,见 <Link href="/products/fmclaw">FMClaw™ 产品页</Link>。
      </p>
    </NewsShell>
  );
}
