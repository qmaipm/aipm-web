import Link from "next/link";
import NewsShell from "../_NewsShell";
import { newsMetadata } from "../articles";

export const metadata = newsMetadata("taiwan-delegation-exchange");

export default function Page() {
  return (
    <NewsShell slug="taiwan-delegation-exchange">
      <p className="lede">
        7 月 11 日下午,2026 中国建博会(广州)落幕之际,台湾保全商业同业公会参访团与启盟科技坐到了一起——一场围绕物业智能体 FMClaw™ 的专项座谈,以现场实操演示收尾,以初步合作意向作结。
      </p>

      <h2>从峰会分享到深度对接</h2>
      <p>
        事情起于建博会期间的「AI 赋能全龄共生住宅峰会」:启盟科技创始人 & CEO 滕一帆在会上分享的 AI 物业管理实践,引起了这支台湾参访团的浓厚兴趣。为促成更深入的了解,主办方知刻传媒专门组织了此次座谈。
      </p>
      <p>
        座谈上,滕一帆完整讲了 FMClaw™ 的技术架构与落地逻辑:从全域 IoT 感知,到服务设计、运营管理、质量评估、服务优化四个 AI Agent 的协同分工,再到「机器处理流程、人处理情感」的人机协作理念。
      </p>

      <h2>不是介绍,是当场运转</h2>
      <p>
        区别于单向介绍,启盟团队在座谈现场做了系统实操演示:自主调度、工单派发、AI 视觉加 IoT 数据的独立质检评分、运营数据的可视化呈现——参访团看到的是这套物业智能体在真实数据下的运转过程。
      </p>
      <ul className="statrow">
        <li><b>80–90%</b><span>爱物管真实运营中,AI 已接管的日常管理动作占比</span></li>
        <li><b>100万+</b><span>全年真实处理的住户对话条数</span></li>
      </ul>
      <p className="pull">多位台湾企业家表示:这与他们此前对「智慧物业」的认知,不在一个量级。</p>

      <h2>达成初步合作意向</h2>
      <p>
        交流环节,台湾企业家们就系统对接、跨业态与跨地区适配、人机协作下的服务品质保障等问题与启盟团队充分探讨。滕一帆的回应是:FMClaw™ 已封装为标准化能力,接入无需大动干戈的二次开发,可以渐进式落地。
      </p>
      <p>
        座谈尾声,双方就 AI 物业与设施管理智能化领域的合作交换意见,达成初步合作意向,推动 AI 物业经理在台湾物业管理市场的应用——这也为 AI 物业能力走向更广阔的市场,打开了两岸产业协同的一个新接口。
      </p>
      <p>
        「好房子,是所有人的事。」滕一帆说,启盟愿意做那个共建者,也期待与更多两岸伙伴携手,把 AI 真正落到物理世界的每一栋楼里。想了解这套物业智能体本身,可以看 <Link href="/products/fmclaw">FMClaw™ 产品页</Link>。
      </p>
    </NewsShell>
  );
}
