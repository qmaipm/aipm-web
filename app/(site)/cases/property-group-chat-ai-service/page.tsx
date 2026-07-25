// app/(site)/cases/property-group-chat-ai-service/page.tsx
import CaseShell, { CaseFit, CaseWins, CaseSection, CaseFlow, CasePoints, CaseCompare, CaseQuote } from "../_CaseShell";
import { getCase } from "../cases";
import { pageMetadata } from "@/lib/pageMetadata";

const c = getCase("property-group-chat-ai-service");
export const metadata = pageMetadata("/cases/property-group-chat-ai-service", { title: `${c.seoTitle} | 启盟科技`, description: c.metaDescription });

export default function Page() {
  return (
    <CaseShell slug="property-group-chat-ai-service">
      <CaseSection eyebrow="成果概览" title="几十个员工群，一条报事报修都不漏">
        <CaseWins items={[
          "员工群 7×24 全程覆盖，报事自动抓取",
          "FMClaw™ 自动成单派单，全程不到 1 分钟",
          "图片类报事由 AI 语义识别，不必逐张判读",
          "带情绪的投诉自动感知并优先提示",
        ]} />
      </CaseSection>

      <CaseSection eyebrow="客户面临的问题" title="员工都在群里报事，消息总有盯不过来的时候" mist>
        <p>这家企业总部的难处，是信息量和人的精力对不上。员工早就习惯在协同平台里解决一切：会议室的屏坏了、茶水间漏水了、空调不冷了，随手在群里发一句话或拍一张照片，就算报了修。</p>
        <p>负责接单的同事要同时关注几十个群，而守群并不是他们唯一的工作。处理工单、对接现场，手上的事一样不少。几个群同时刷屏的时候，人不可能一直盯着屏幕。</p>
        <p>一旦漏看，代价往往不小。</p>
        <CasePoints items={[
          { k: "员工体验被磨损", d: "「会议室的灯坏了好几天了」没被及时回应，员工的第一反应是「报了也没用」。" },
          { k: "台账对不上", d: "人工把对话转成工单时，地点、时间、事件字段常常记不全，事后复盘对不上账。" },
        ]} />
      </CaseSection>

      <CaseSection eyebrow="AI 做了什么" title="平台 Bot 守群，FMClaw 读懂、成单、派单">
        <p>启盟没有让员工换个地方报修，而是让企业现有的协同平台和 FMClaw 各做擅长的事，拼成一条完整工作流。员工照常在熟悉的群里说话，不用学新工具。</p>
        <CaseFlow steps={[
          { k: "平台 Bot 守群抓取", d: "Bot 天然就在群里，7×24 守着，识别出哪条消息是报修报事并抓成记录，不会因为忙别的事而看漏。" },
          { k: "AI 读懂内容", d: "FMClaw 自动判断报事发生在哪里、谁报的、什么时间、什么类型，形成结构化台账；图片由 AI 语义识别读懂里面发生了什么。" },
          { k: "AI 感知情绪", d: "发现带着强烈不满、可能升级的投诉，自动标记并提示优先处理，不被淹没在刷屏里。" },
          { k: "自动成单派单", d: "依据派单规则派给对应工程师，同时通知报事员工，全程不到 1 分钟，权限沿用平台现成的组织架构。" },
        ]} />
        <p>人不必再盯着屏幕手工转单，被留在真正需要判断和沟通的地方。</p>
        <p>结构化台账还会沉淀成一份运营视图。行政和 IT 负责人不必翻看每一条群消息，打开就能看到今天哪个区域发生了什么事、有没有需要关注的升级投诉。</p>
      </CaseSection>

      <CaseQuote by="该企业报事报修工作流的现场负责人" scope="负责范围：集团总部几十个员工群的报事接单与工单派发">
        “我们最担心的，不是回复得好不好，是压根没看到。消息太多，人总有顾不上的时候，可报事的同事不会体谅这个，漏一条，可能就是一次不满。”
      </CaseQuote>

      <CaseSection eyebrow="结果" title="从「总有漏的」到「一条不漏」">
        <p>接入后，几十个员工群实现 7×24 全覆盖，报事报修自动抓取、识别、成单、派单，一条不漏。接单的同事从怕漏消息的紧张里解放出来，把精力放回真正需要人的沟通和协调上。</p>
        <CaseCompare
          label="一条报事的命运"
          rows={[
            { k: "有没有被看到", before: "刷屏时看漏", after: "Bot 全程兜底" },
            { k: "从消息到派单", before: "人工转单，看心情快慢", after: "不到 1 分钟" },
            { k: "台账字段", before: "常常记不全", after: "地点时间类型自动齐全" },
            { k: "带情绪的投诉", before: "淹没在群里", after: "优先提示" },
          ]}
        />
        <p>三处变化里最要紧的是第一条。有 Bot 兜底，「在群里说一声就有人管」第一次真正成立，很多本可能升级的矛盾在早期就被接住。</p>
      </CaseSection>
      <CaseFit
        fit={[
          "员工习惯在协同平台群里报事，群数量多到人盯不过来",
          "总部园区、多楼宇办公场景，接单的人还兼着别的活",
          "漏一条报事就是一次员工不满，而漏没漏取决于那一刻谁有空",
        ]}
        unfit={[
          "企业的协同平台不允许接入第三方 Bot，或群消息不可被程序读取",
          "报事量本来就不大、一个人盯得过来，那么先解决台账字段不全就够了",
          "派单规则还没定：谁负责哪类事、多久要响应，没有规则就无处可派",
        ]}
        cost={[
          { k: "不换平台", d: "企业现有的协同平台一个都不动，权限沿用现成的组织架构。" },
          { k: "员工不学新工具", d: "照常在熟悉的群里说话，使用习惯零改变。" },
          { k: "从一个群开始", d: "先接一个部门的群跑通，再铺到全部群。" },
        ]}
      />
    </CaseShell>
  );
}
