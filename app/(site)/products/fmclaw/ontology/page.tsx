import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { techArticleLd } from "../_shared";
import { BrainMap, LoopMedia, FmFoot, MediaRow, PhotoGrid, WideShot } from "../_brain";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCols, SolCompare, SolTable, SolMore, SolEnd,
} from "../../../solutions/_tpl/Sol";

// 2026-10-16 改版：「行业数据本体」页升级为「项目大脑」页（网址不变）。
// 定位：FMClaw™ 的大脑——懂物业业务；国内首个物业设施管理行业模型（用户裁定可对外）。
// 公开尺度：讲是什么、带来什么、规模多大；不讲建模方法、训练方法、内部组件。对比不点名对手。
// 资料：AI物业经理 FMClaw_202609、启盟的秘密蓝图_202609。验收见 docs/FMCLAW-SUBPAGES-ACCEPTANCE.md
const PATH = "/products/fmclaw/ontology";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "项目大脑与物业行业大模型：国内首个物业设施管理行业模型｜FMClaw™",
  description:
    "项目大脑是 AI 物业经理 FMClaw™ 的核心：以行业数据本体读懂项目里的人、空间、设备、服务、合同、费用和规则，由启盟自研的国内首个物业设施管理行业模型提供专业判断。10 万+ 在线感知设备、每天 6 亿条现场数据、20 万 GB 已标注行业数据，行业模型正在推进国家生成式人工智能服务备案。",
});

const TECH_LD = techArticleLd({
  path: PATH,
  headline: "项目大脑是什么：物业与设施管理的行业数据本体与行业模型",
  description:
    "项目大脑是 AI 物业经理 FMClaw™ 的核心。它以行业数据本体统一项目里的业务对象、指标口径、管理规则和权限边界，由自研的物业设施管理行业模型提供专业判断，再由工作流引擎驱动智能体完成管理工作。",
});

const MODEL_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FMClaw 物业设施管理行业模型",
  applicationCategory: "BusinessApplication",
  description:
    "启盟科技自研的国内首个物业设施管理行业模型，用真实项目任务持续训练，行业任务由自研模型处理，通用任务按需调用通用大模型；正在推进国家生成式人工智能服务备案。",
  creator: { "@type": "Organization", name: "广州启盟科技有限公司", url: "https://www.aipm.cn" },
  isPartOf: { "@type": "SoftwareApplication", name: "AI 物业经理 FMClaw™" },
};

/* 项目大脑读懂的七类业务事实（业务语言，不写技术词） */
const KNOWS = [
  { meta: "人", title: "组织与人员", body: "谁在哪个项目、什么岗位、排了什么班、这个月干了多少活。" },
  { meta: "空间", title: "空间与服务点位", body: "每一层、每一间、每一个服务点位，要按什么标准、多高频次去服务。" },
  { meta: "设备", title: "资产与设备", body: "电梯、空调、水泵、仪表的台账、运行状态、巡检与保养记录。" },
  { meta: "服务", title: "服务与作业", body: "保洁、安保、工程、客服每一次服务是否发生、做得好不好。" },
  { meta: "钱", title: "收入、支出与合同", body: "物业费、水电、供应商账单、薪资，以及背后的合同条款。" },
  { meta: "规则", title: "服务标准与管理规则", body: "企业自己的标准、考核办法和审批规矩，同一条规则在所有项目只有一种算法。" },
];

export default function OntologyPage() {
  return (
    <SolPage>
      <JsonLd data={[TECH_LD, MODEL_LD]} />

      <SolHero
        crumbRoot={{ href: "/products/fmclaw", label: "AI 物业经理 FMClaw™" }}
        crumb="项目大脑"
        title={["一个真正懂物业的", "项目大脑"]}
        lead={<>项目大脑是 FMClaw™ 的核心。它读懂项目里的<b>人、空间、设备、服务、钱和规则</b>，由启盟自研的<b>国内首个物业设施管理行业模型</b>提供专业判断，再交给工作流把管理工作做完。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#model", label: "了解行业模型" }}
        proof={["国内首个物业设施管理行业模型", "10 万+ 在线感知设备", "每天 6 亿条现场数据"]}
        media={{
          node: (
            <LoopMedia
              src="/products/fmclaw/brain/brain-1280.mp4"
              srcSmall="/products/fmclaw/brain/brain-800.mp4"
              poster="/products/fmclaw/brain/brain-poster.webp"
              w={1280} h={768}
              label="FMClaw™ 真实产品画面：项目大脑把财务、空间、组织与人员、资产与设备、服务与作业、感知终端连成一张业务关系网，外圈是接入的多个项目"
            />
          ),
          caption: "真实产品画面 · 项目大脑把多个项目的业务关系连成一张网",
        }}
      />

      <SolDefine
        term="项目大脑是什么："
        foot={<>它对应行业里常说的「行业数据本体」：不替换、不重建现有系统，在现有系统之上叠加一层能理解业务、能做判断的大脑。</>}
      >
        AI 物业经理 FMClaw™ 的核心。它把业务系统和现场设备里的数据，统一成项目里的业务事实和管理规则，让智能体知道「这个数字代表什么、这件事该怎么判断、谁有权看」，再由工作流引擎推动工作向前。
      </SolDefine>

      <SolSection title="项目大脑读懂的，是项目里的业务事实"
        sub="不是一堆字段和报表，而是一个项目每天真实发生的事。同一份事实，报告、考核、结算和问数都用它。">
        <WideShot src="/products/fmclaw/v2/photo-understand.webp" alt="傍晚的城市综合体：写字楼、住宅、商业裙楼与园林连成一片" w={1600} h={1073}
          caption="一个综合项目里，写字楼、住宅、商业和园区的人、空间、设备与服务，都在项目大脑里连成一张网。" />
        <div style={{ marginTop: 56 }}><SolCols items={KNOWS} /></div>
        <SolMore>管理者一句话就能问到答案，答案追得到来源：见 <Link href="/solutions/ask-data">物业智能问数</Link>；多个系统口径不一的问题，见 <Link href="/solutions/data-governance">物业数据治理</Link>。</SolMore>
      </SolSection>

      <SolSection title="它看得见现场：四类感知，一张视图" tone="mist"
        sub="业务系统之外，服务、设备、环境、视觉四类现场数据接入同一平台，项目大脑同时看见服务是否发生、设备是否正常、空间是否舒适、现场有没有异常。">
        <PhotoGrid items={[
          { src: "/products/fmclaw/v2/photo-see.webp", alt: "设备机房管道上安装的无线传感器", title: "服务感知", body: "自研空间与行为传感器，记录保洁、巡检、维修是否发生、是否到位。" },
          { src: "/products/iot/iot-dim2.jpg", alt: "楼宇设备机房里的配电柜与水泵", title: "设备感知", body: "读取既有 BA 系统：暖通、照明、电梯、给排水、能耗仪表、消防联动。" },
          { src: "/products/iot/iot-dim3.jpg", alt: "夜晚园区鸟瞰，道路与停车场亮起感知点位", title: "环境感知", body: "温湿度、空气质量、停车、门禁，空间是否舒适、人车如何流动。" },
          { src: "/products/iot/iot-dim4-sources.jpg", alt: "园区里的摄像头、巡检机器人与安保人员", title: "视觉感知", body: "CCTV、巡检机器人、手机与无人机，默认只读授权的预警图片。" },
        ]} />
        <div className="bm-stat" style={{ marginTop: 64 }}>
          <div><b>10 万+</b><span>台在线感知设备，在实际场景中持续记录</span></div>
          <div><b>6 亿条</b><span>平台每天新增的物业与设施管理数据</span></div>
          <div><b>3000 万㎡</b><span>系统覆盖面积（含客户项目）</span></div>
          <div><b>100+</b><span>家企业在真实项目中使用</span></div>
        </div>
        <p className="spt-note">注：设备数量与数据量为启盟科技平台统计。现场感知的完整介绍见 <Link href="/products/iot">IoT 物理世界感知</Link>。</p>
      </SolSection>

      <SolSection id="model" title="国内首个，物业设施管理行业模型"
        sub="通用大模型懂语言，不懂物业。项目大脑的专业判断，来自启盟自研、专为物业与设施管理训练的行业模型。">
        <WideShot src="/products/fmclaw/brain/model.webp" alt="启盟研发团队在大屏前讨论物业行业模型的业务关系网络（场景示意）" />
        <div className="bm-stat" style={{ marginTop: 56 }}>
          <div><b>国内首个</b><span>物业设施管理行业模型，拥有自主知识产权</span></div>
          <div><b>20 万 GB</b><span>已标注的物业与设施管理行业训练数据</span></div>
          <div><b>7 年</b><span>办公、园区、医院、轨道交通等多业态现场积累</span></div>
          <div><b>备案中</b><span>研发已完成，正在推进国家生成式人工智能服务备案</span></div>
        </div>
        <div style={{ marginTop: 56 }}>
          <SolCols items={[
            { title: "行业任务，自研模型处理", body: "服务标准怎么定、账单哪里不对、巡检结果算不算合格，这类物业专业判断由行业模型完成。" },
            { title: "通用任务，按需调用通用大模型", body: "写文案、做翻译这类通用能力，按需调用通用大模型。两者各司其职。" },
            { title: "每天的真实任务，让它越来越懂", body: "模型用真实项目中经过人工审核的任务结果持续训练，不靠演示数据。" },
          ]} />
        </div>
      </SolSection>

      <SolSection title="自研模型，和调用通用大模型不一样" tone="mist" split
        sub="市面上的物业 AI 产品，很多是在通用大模型上加一层提示词和知识库。差别会体现在能不能真正用于生产。">
        <SolCompare labels={["调用通用大模型", "自研行业模型的项目大脑"]} rows={[
          { k: "懂不懂行业", before: "靠提示词临时告诉它物业规则，换个问法就可能答偏。", after: "物业对象、标准和规则是模型本身的知识。" },
          { k: "判断准不准", before: "擅长写和说，专业判断难以复核。", after: "按企业的标准和口径判断，结果可以逐条追溯。" },
          { k: "能不能上生产", before: "适合问答和演示，进核心业务前要大量人工把关。", after: "接在工作流里每天运行，关键节点由人确认。" },
          { k: "数据沉淀在哪", before: "每次对话结束，经验不留下。", after: "每个项目的运行结果都让项目大脑更懂业务。" },
        ]} />
      </SolSection>

      <SolSection title="项目越做越多，大脑越来越懂"
        sub="项目大脑不是一次性建好就不动的知识库。">
        <MediaRow src="/scene/dg-analysts.webp" alt="两位数据人员对着屏幕逐项核对执行结果">
          <h3>每天的真实工作，就是它的训练场</h3>
          <ul>
            <li><b>接进来</b>现有系统和现场数据原样接入；条件具备时，原则上 72 小时内完成必要数据接入与可用性验证。</li>
            <li><b>跑起来</b>智能体按企业的规则推进日常工作，每一次执行都有完整记录。</li>
            <li><b>评得准</b>系统校验和人工审核共同判断每一次执行是否正确。</li>
            <li><b>更懂业务</b>经过验证的结果沉淀回项目大脑和行业模型，下一个项目上手更快。</li>
          </ul>
        </MediaRow>
      </SolSection>

      <SolSection title="看什么，有范围" img={{ src: "/scene/exec-tablet.webp", alt: "集团高管在办公室用平板查看经营数据" }} tone="mist" split
        sub="项目大脑决定智能体能看到什么。看得懂，也要看得对、看得有边界。">
        <SolTable head={["规则", "意思"]} rows={[
          ["项目之间相互隔离", "同一套规则跑在多个项目，数据各归各的。"],
          ["数据按岗位授权", "智能体只能读取所属项目、岗位和当前任务需要的数据。"],
          ["口径保持一致", "同一个指标在所有项目里只有一种算法，报告、考核、结算对得上。"],
          ["超出授权读不到", "没有授权的数据，智能体读取不到；访问行为有记录。"],
        ]} />
        <SolMore>智能体能做什么由 <Link href="/products/fmclaw/connectors">工具箱</Link> 限定，过程怎么被看见、被接管见 <Link href="/products/fmclaw/agent-runtime">控制台</Link>。</SolMore>
      </SolSection>

      <SolSection title="同一个项目大脑，未来会走进现场">
        <MediaRow reverse src="/products/fmclaw/brain/robot.webp" alt="写字楼大堂里，四足机器人跟随物业经理巡查，清洁机器人在作业（场景示意）">
          <h3>身体不断进化，行业能力持续复用</h3>
          <p>今天，项目大脑在系统里推进工作；<b>清洁机器人已经批量在岗</b>，四足机器人正在适配，未来还会进入人形机器人和更多一线服务岗位。</p>
          <p>先成为物业经理的物理分身，未来与一线人员组成 AI 协同服务团队。</p>
          <p className="spt-more" style={{ marginTop: 18 }}>完整路线见 <Link href="/company/master-plan">启盟的秘密蓝图</Link>；现场设备见 <Link href="/products/robots">机器人与智能装备</Link>。</p>
        </MediaRow>
      </SolSection>

      <SolSection title="它在 FMClaw™ 里的位置" tone="mist"
        sub="数据从现有系统和现场进入项目大脑，工作流引擎按规则推进，工具箱里的软件和设备去执行，结果写回现有系统；控制台让全过程看得见、管得住。">
        <BrainMap current="brain" caption="点击其余模块，查看工作流引擎、工具箱与控制台。" />
      </SolSection>

      <SeoFaq
        heading="关于项目大脑与物业行业模型，常被问到的问题"
        serviceName="FMClaw™ 项目大脑"
        serviceDesc="以行业数据本体读懂物业项目的业务事实，由国内首个物业设施管理行业模型提供专业判断。"
        items={[
          { q: "什么是项目大脑？", a: "项目大脑是 AI 物业经理 FMClaw™ 的核心。它把业务系统和现场设备里的数据统一成项目里的人、空间、设备、服务、合同、费用和管理规则，让智能体知道每个数字代表什么、每件事该怎么判断、谁有权看，再由工作流引擎推动工作完成。它对应行业里常说的行业数据本体。" },
          { q: "物业行业大模型有哪些？", a: "目前国内物业领域的 AI 产品，多数是在通用大模型之上加提示词、知识库或技能。启盟科技的 FMClaw 物业设施管理行业模型是国内首个专为物业与设施管理训练的行业模型，已完成研发、拥有自主知识产权，用真实项目任务持续训练，正在推进国家生成式人工智能服务备案。" },
          { q: "物业行业大模型是什么，和通用大模型有什么区别？", a: "通用大模型擅长语言、写作和通用问答，但不了解物业的服务标准、考核规则和业务口径。物业行业大模型用行业数据和真实任务训练，物业专业判断由它完成；FMClaw 的做法是行业任务由自研模型处理，通用任务按需调用通用大模型。" },
          { q: "行业数据本体和数据中台有什么不同？", a: "数据中台解决数据汇集和存储；行业数据本体解决数据在业务里代表什么。项目大脑不替换、不重建现有系统和数据中台，在它们之上统一业务对象、指标口径、管理规则和权限边界，让 AI 能读懂并据此行动。" },
          { q: "项目大脑和知识库有什么不同？", a: "知识库让 AI 读到资料，适合问答；项目大脑让 AI 读懂项目里的业务事实和规则，每一个数字都有统一口径、明确来源和权限边界，是智能体进入生产、承担真实业务的前提。" },
          { q: "上项目大脑要先把数据治理好吗？", a: "不必。现有系统和现场数据原样接入，在授权、接口与安全条件具备时，原则上 72 小时内完成必要数据接入与可用性验证。口径冲突和数据缺口在使用中暴露、当场调整；项目隔离和权限在第一天就定好。" },
          { q: "项目的数据安全吗，会被用来训练给别人用吗？", a: "项目之间相互隔离，数据按岗位授权，超出授权的数据读不到，访问有记录。项目数据的使用范围以合同约定为准。" },
          { q: "启盟的行业模型和万物云灵石等产品有什么不同？", a: "各家路线不同。头部物企自研的 AI 中枢主要服务自家在管项目；物业软件 + AI 多在已有软件上增加问答和识别能力。FMClaw 是面向所有物业与设施管理企业的 AI 物业经理，核心是自研的物业设施管理行业模型和项目大脑，并用工作流把管理工作做完。各类产品的公开信息对比，见《国内有哪些 AI 物业产品》。" },
        ]}
      />

      <FmFoot updated="2026-10-16" />

      <SolEnd
        title={["带一个真实项目来，", "看项目大脑怎么读懂它"]}
        sub="提交真实问题与数据准备情况，通常 1—3 天跑通一个基于真实业务的智能体。"
        cta={{ href: "/workshop", label: "预约 FMClaw™ 加速营" }}
        alt={<>继续了解：<Link href="/products/fmclaw/workflow-engine">工作流引擎</Link> · <Link href="/products/fmclaw/connectors">工具箱</Link> · <Link href="/products/fmclaw/agent-runtime">控制台</Link> · <Link href="/insights/ai-property-products-in-china">国内有哪些 AI 物业产品</Link></>}
      />
    </SolPage>
  );
}
