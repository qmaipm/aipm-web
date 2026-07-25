// app/(site)/cases/30w-park-ai-property-manager-robot/page.tsx
import Link from "next/link";
import CaseShell, { CaseFit, CaseWins, CaseSection, CaseFlow, CaseCompare, CaseNote, CaseQuote } from "../_CaseShell";
import { getCase } from "../cases";
import { pageMetadata } from "@/lib/pageMetadata";

const c = getCase("30w-park-ai-property-manager-robot");
export const metadata = pageMetadata("/cases/30w-park-ai-property-manager-robot", { title: `${c.seoTitle} | 启盟科技`, description: c.metaDescription });

export default function Page() {
  return (
    <CaseShell slug="30w-park-ai-property-manager-robot">
      <CaseSection eyebrow="成果概览" title="23 人加 16 台机器人，管住 30 万㎡">
        <CaseWins items={[
          "FMClaw™ 统一调度人、机器人与传感器",
          "管理效率提升 66.6%，自动化率超过 85%",
          "清洁覆盖率从约 75% 提升到 95% 以上",
          "园区物业相关投诉下降超过 80%",
        ]} />
      </CaseSection>

      <CaseSection eyebrow="客户面临的问题" title="设备买得到，融合买不到" mist>
        <p>很多园区的智慧化停在了采购清单上。机器人买了、传感器装了、大屏也亮了，可现场还是老样子，因为这些设备各干各的，没有被编进同一套运营里。</p>
        <p>这个约 30 万㎡的科技园区也面临同样的拉扯。1000 多个服务点位，光靠机器人各扫各的根本不成。哪些边角要人补、什么时候该换水、突发脏污谁处理、十几台机器人怎么排路线才不打架，全得有人统一编排。</p>
        <p>过去很多项目就卡在这里。设备买来了，却没有一个能把人和机器在时间、空间、工序上排明白的大脑。机器越多现场越乱，利用率反而越低。这也是清洁机器人一直难以规模化投放的行业症结。</p>
      </CaseSection>

      <CaseSection eyebrow="AI 做了什么" title="先有调度大脑，四个要素才融得起来">
        <p>这个园区把顺序摆对了：先有 FMClaw 这个调度大脑，再谈上机器人。</p>
        <CaseFlow steps={[
          { k: "统一机器人接口", d: "把清洁、巡检等机器人接进同一个系统统一调度，动态规划路径、排任务优先级、响应突发任务。" },
          { k: "人机同表对齐", d: "机器人接下夜间、清晨这些非高峰时段的高频重复清洁，人去补边角、处理突发污染、做深度保洁。" },
          { k: "AIoT 替代人眼巡场", d: "园区全域铺低成本传感网络做全天候巡场，纸质签到升级成自动的在岗与工时采集。" },
          { k: "AI 诊断并派单", d: "海量数据经智能诊断转成清晰的行动建议，管理者勾选批准后，工单下发、通知、督办由 AI 接管。" },
        ]} />
        <p>最终跑顺的现场配置是 23 名一线人员搭配 16 台清洁机器人。</p>
        <p>启盟做的不是一套软件拿来试。它自 2017 年起聚焦非住宅设施管理，2019 年起自己下场运营物业公司。自己装传感器、跑工单、面对住户投诉，在真实现场里把 AI 磨出来。</p>
      </CaseSection>

      <CaseQuote by="该园区物业负责人" scope="负责范围：约 30 万㎡科技园区，1000 多个服务点位、每天约 4 万次服务交付">
        “我原来担心机器人是摆设，后来发现关键根本不是机器人，是背后那套调度。有它把人和机器排明白，机器人才真派上用场。”
      </CaseQuote>

      <CaseSection eyebrow="结果" title="人少了，服务反而更全了">
        <p>上线后，管理效率提升 66.6%，管理自动化率超过 85%，一线清洁人力优化 43.9%。绕不开的问题是人少了服务会不会缩水，这个园区的数据给出了相反的答案。</p>
        <CaseCompare
          label="服务质量的变化"
          rows={[
            { k: "整体清洁覆盖率", before: "约 75%", after: "95% 以上" },
            { k: "卫生死角清洁频率", before: "基线", after: "约 3 倍" },
            { k: "园区物业相关投诉", before: "基线", after: "下降超过 80%" },
            { k: "问题发现到工单派发", before: "依赖人工上报", after: "2 分钟以内" },
          ]}
        />
        <p>原因是机器人能在无人时段接着干，填补过去的人工空白，AI 又持续盯着卫生死角这类传统难点，不会像人一样漏。</p>
        <p>服务质量的把关方式也变了。过去验收靠主管的主观印象，现在 AI 用多模态质量评估，融合图像、视频与传感器数据做自动验收。综合服务成本每年降低约 15%，人力成本与管理成本同时下降。</p>
        <p>对园区投资方与运营方，这个项目证明了智慧园区可以不是大屏和采购清单。它是人、AI、机器人、传感器被编成一个整体、每天真实运转的现场。园区与国有物业的升级路径，见启盟的<Link href="/cobuild">政企共建实践</Link>。</p>
        <CaseNote>
          口径说明：该园区约 30 万㎡，覆盖 1000 多个服务点位、每天约 4 万次服务交付。上述比率为上线后与上线前基线的对比值。
        </CaseNote>
      </CaseSection>
      <CaseFit
        fit={[
          "园区已经买了机器人、装了传感器，但现场还是老样子",
          "服务点位多，人和机器需要在时间、空间、工序上被统一编排",
          "正在规划智能化，希望先想清楚顺序再采购",
        ]}
        unfit={[
          "先把机器人买齐再找调度大脑：顺序倒过来，机器越多现场越乱",
          "场地条件不支持机器人作业，如地面高差多、动线狭窄、无自动补水位置",
          "只想要一块可视化大屏：大屏不改变现场，编排才改变现场",
        ]}
        cost={[
          { k: "先有大脑再上机器人", d: "调度先跑通，机器人按缺口分批投放。" },
          { k: "人机同表", d: "一线团队要适应和机器人共用一张任务表，这需要磨合时间。" },
        ]}
      />
    </CaseShell>
  );
}
