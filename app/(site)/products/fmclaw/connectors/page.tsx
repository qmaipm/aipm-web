import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { techArticleLd } from "../_shared";
import { BrainMap, FmFoot, MediaRow, PhotoGrid } from "../_brain";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCols, SolTable, SolGallery, SolVerdict, SolMore, SolEnd,
} from "../../../solutions/_tpl/Sol";

// 2026-10-16 改版：工具箱 = 物业管理系统全套内置 + 在用系统原样接入。
// 用户裁定：保留 30+ 预制工具、六类目录、钉钉/飞书/企微三种协同；新增内置系统清单、两条路径、按模块开通 + 按用量计费。
// 公开尺度：不列接入协议（原 MCP/CLI/数据库/设备协议清单已撤），不写具体价格（价格见 /pricing）。
const PATH = "/products/fmclaw/connectors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "物业管理系统全套内置：收费、工单、设备巡检、品质、计薪一站开通｜FMClaw™ 工具箱",
  description:
    "没有物业管理系统，也不用先花钱买软件：FMClaw™ 工具箱内置收费、报事报修与工单、设备巡检与拍照抄表、品质核查、考勤排班与计薪、供应商结算、数据大屏等物业管理软件，30+ 预制工具持续增加，按模块开通、按用量付费；已有的 ERP、财务、BA、钉钉、飞书、企业微信原样接入。",
});

const TECH_LD = techArticleLd({
  path: PATH,
  headline: "FMClaw™ 工具箱：内置物业管理系统与在用软件接入",
  description:
    "工具箱是 AI 物业经理 FMClaw™ 的执行层：平台内置物业管理所需的全套软件，同时把企业在用的系统接为智能体可调用的工具，智能体在授权范围内使用它们完成工作。",
});

/* 内置物业管理系统：6 组（对标主流物业管理软件的功能模块） */
const MODS = [
  { h: "收费与财务", p: "钱收得上来，账对得清楚", items: ["物业费、水电费、停车费、租金收费", "欠费提醒与催缴", "收支对账与财务报表", "供应商账单核算与结算"] },
  { h: "客服与工单", p: "业主的事，件件有着落", items: ["报事报修、投诉建议", "工单派发、催办与回访", "业主群消息自动建单", "访客与客户服务"] },
  { h: "设备与能耗", p: "设备不带病运行", items: ["设备台账与二维码", "巡检、保养计划与记录", "拍照抄表，读数自动识别", "能耗统计与异常提示"] },
  { h: "品质与安全", p: "服务做没做、做得好不好", items: ["品质核查与 AI 质检评分", "巡更与安全巡查", "隐患识别与自动派单", "服务过程传感器核验"] },
  { h: "人员与经营", p: "人、钱、物算得明白", items: ["考勤排班", "薪资与 KPI 核算", "人员编制与项目预算测算", "合同、物资与采购"] },
  { h: "空间与数据", p: "一个项目的底图", items: ["空间与服务点位清单", "服务标准与服务计划配置", "日报、周报、月报与数据大屏", "开放接口与第三方集成"] },
];

/* 原有六类在用软件目录（保留） */
const CATALOG = [
  ["物业 ERP", "收费、工单、租赁、合同、客户档案"],
  ["财务与人力", "总账、应收应付、考勤、排班、薪酬"],
  ["协同平台", "钉钉、飞书、企业微信的消息、审批与文档"],
  ["楼宇与 IoT", "BA、暖通、电梯、给排水、能源仪表、消防"],
  ["视频与安防", "摄像头、门禁、巡更、告警"],
  ["机器人与装备", "清洁机器人、巡检机器人、无人机"],
];

export default function ConnectorsPage() {
  return (
    <SolPage>
      <JsonLd data={TECH_LD} />

      <SolHero
        crumbRoot={{ href: "/products/fmclaw", label: "AI 物业经理 FMClaw™" }}
        crumb="工具箱"
        title={["物业要用的系统，", "平台里都有"]}
        lead={<>收费、工单、设备巡检、品质、计薪、结算：物业管理要用的软件，<b>FMClaw™ 工具箱全部内置</b>，按模块开通。已经在用的 ERP、财务系统和钉钉、飞书、企业微信，<b>原样接进来</b>。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#modules", label: "看内置了哪些系统" }}
        proof={["30+ 预制工具，持续增加", "按模块开通", "按用量付费", "在用系统不替换"]}
        media={{ node: <img className="bm-shot" src="/images/agents/qa-clean-batch.webp" alt="FMClaw™ 内置品质核查模块真实界面：保洁质检照片批量评分" width={2000} height={987} />, caption: "真实产品界面 · 内置品质核查模块" }}
      />

      <SolDefine
        term="工具箱是什么："
        foot={<>相当于其他智能体平台的插件或连接器；区别在于，工具箱里预置的是物业管理的行业软件。</>}
      >
        AI 物业经理 FMClaw™ 用来干活的软件和设备。智能体建账单、派工单、发通知、读仪表，都通过工具箱里的工具完成：平台内置的物业管理系统是工具，企业在用的软件和现场设备接进来也是工具。
      </SolDefine>

      <SolSection id="modules" title="内置的物业管理系统" tone="mist"
        sub="主流物业管理软件有的模块，工具箱里都有。它们不是一套要人去录入的软件，而是智能体每天在用的工具：数据自动进来，事情自动推进。">
        <PhotoGrid items={[
          { src: "/products/fmclaw/brain/meter.webp", alt: "工程人员在设备机房用手机拍照抄表（场景示意）", title: "拍一张照片，读数自动进系统", body: "抄表、巡检、隐患上报，现场拍照就完成记录，不用回办公室补录。" },
          { src: "/products/fmclaw/brain/butler.webp", alt: "物业管家在大堂查看手机上的工单，维修师傅走向电梯（场景示意）", title: "业主的报修，自动派到人", body: "群消息、电话、小程序进来的报修自动建单、派工、催办，跟到关闭。" },
          { src: "/products/fmclaw/v2/photo-act.webp", alt: "写字楼大堂里清洁机器人在作业，工程人员走向电梯", title: "人和机器人，用同一套工具", body: "清洁、巡检机器人和一线人员接收同一套任务，结果回到同一个系统。" },
        ]} />
        <div className="bm-mods" style={{ marginTop: 72 }}>
          {MODS.map((m) => (
            <section key={m.h}>
              <h3>{m.h}</h3>
              <p>{m.p}</p>
              <ul>{m.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </section>
          ))}
        </div>
        <p className="spt-note">30+ 预制工具持续增加，支持按企业需要扩展。模块清单以实际开通为准。</p>
      </SolSection>

      <SolSection title="真实界面，智能体每天在用的工具"
        sub="下面是平台内置模块的真实界面，数据经过脱敏。点击可看大图。">
        <SolGallery items={[
          { src: "/images/agents/rv-vendor-bill.webp", w: 2000, h: 1322, title: "供应商结算", caption: "按编制工时、实际出勤、加班和缺勤逐日核算账单，含税金额自动算出。", alt: "供应商费用结算界面：账单金额、税费、编制人数与每日账单明细" },
          { src: "/images/agents/rv-payroll.webp", w: 2000, h: 987, title: "薪资与 KPI 核算", caption: "薪酬汇总按审批级次逐级确认，明细列出应发、扣款与加班费。", alt: "保洁薪酬汇总审批界面：审批级次与薪酬明细表" },
          { src: "/images/agents/qa-hazard-order.webp", w: 2000, h: 990, title: "隐患识别与派单", caption: "现场照片识别出隐患后自动生成工单，派给对应负责人。", alt: "隐患识别派单界面：现场照片、隐患类型与工单信息" },
          { src: "/images/agents/sd-points.webp", w: 2000, h: 989, title: "空间与服务点位", caption: "项目的每一个服务点位、服务标准和频次，都在一张清单里。", alt: "服务点位清单界面：楼层、区域、点位类型与服务频次" },
        ]} />
      </SolSection>

      <SolSection title="有没有系统，都能用" tone="mist"
        sub="很多中小物业公司和园区自己的物业公司没有系统，上一套物业软件要先花一笔钱；已经有系统的企业，不想推倒重来。">
        <MediaRow src="/products/fmclaw/brain/toolbox-hero.webp" alt="园区物业服务中心前台，物业人员和项目经理在电脑上处理工作（场景示意）" w={1600} h={1195}>
          <h3>两条路，都从今天开始</h3>
          <ul>
            <li><b>还没有系统</b>直接开通需要的模块，不用先采购一套物业软件；从收费、工单、巡检这几个最常用的开始，用到再加。数据由 IoT、手机拍照和业务流程自动进入，少靠人填。</li>
            <li><b>已经有系统</b>在用的 ERP、财务、BA 原样接入，不替换、不重建；缺什么补什么，例如在已有 ERP 之外补上质检和结算。结果写回现有系统。</li>
          </ul>
        </MediaRow>
      </SolSection>

      <SolSection title="为什么比传统物业软件省钱"
        sub="传统物业软件按账号、按项目收订阅费，不管用多用少。">
        <SolCols items={[
          { meta: "按模块开通", title: "开通费远低于传统软件", body: "工具箱里的软件本质上是智能体的工具，按模块开通，开通和订阅费用远低于传统物业 SaaS。" },
          { meta: "按用量付费", title: "AI 干了多少活，付多少", body: "智能体调用工具时消耗平台积分（Credit），用量取决于开通了多少条工作流。" },
          { meta: "随时增减", title: "从一个模块开始", body: "先开最急需的几个模块，跑出效果再扩展，不用一次买齐。" },
        ]} />
        <SolMore>具体版本和价格见 <Link href="/pricing">价格</Link>：个人版免费开始，项目团队版按项目与账号容量启用。</SolMore>
      </SolSection>

      <SolSection title="在用的软件，原样接进来" img={{ src: "/scene/park-lowvolt.webp", alt: "两位工程师在弱电机房对照系统图纸" }} tone="mist"
        sub="接入后，智能体像人一样使用这些软件：在收费系统建账单，在工单系统派工，在协同平台通知人。">
        <SolTable head={["类别", "常见软件与设备"]} rows={CATALOG} />
        <SolVerdict>你在用的软件，原样接进来就能用。不替换。</SolVerdict>
      </SolSection>

      <SolSection title="已经在用钉钉、飞书、企业微信，正好" img={{ src: "/scene/im-chat.webp", alt: "物业主管在走廊里用手机查看工作群消息" }}
        sub="不用二选一。平台继续负责组织协作，FMClaw™ 补上物业与设施管理的专业业务；三家平台都在官方架构里预留了第三方接入的位置。">
        <SolCols items={[
          { meta: "方式 01 · 机器人消息", title: "群里多一个机器人", body: "业主在群里发一条报修，机器人收进来，FMClaw™ 识别、建单、派工，进度发回群里。" },
          { meta: "方式 02 · 技能调用", title: "对话入口不变", body: "管理层还在原来的对话框里问「本月哪个项目能耗异常」，答案用行业数据和统一口径算出来。" },
          { meta: "方式 03 · 表格互通", title: "两边看到同一份数", body: "与多维表、智能表格双向同步，日报、周报、台账在两边是同一份数。" },
        ]} />
        <SolMore>员工不换工具、不改习惯；账号与组织架构沿用现有体系；停掉接入，平台照常运行。为什么两者谁也离不开谁，见 <Link href="/insights/general-platform-vs-industry-agent">这篇行业研究</Link>。</SolMore>
      </SolSection>

      <SolSection title="能做什么，有授权" img={{ src: "/scene/approve-phone.webp", alt: "区域经理在手机上确认一笔申请" }} tone="mist"
        sub="谁能用哪个工具，接入时就定好。智能体拿到的不是整个系统，而是明确授权的几个动作。">
        <SolTable head={["动作类型", "怎么执行", "例子"]} rows={[
          ["查信息、算数据、写草稿", "智能体直接做", "查某户缴费记录，汇总本月工单，起草一条群通知"],
          ["发出去、扣到钱、动到设备", "先经人批准再执行", "向业主群发通知，给某户退费，远程停一台设备"],
          ["收回授权", "立即生效", "工具当场不可用，已有记录保留，可随时复核"],
        ]} />
      </SolSection>

      <SolSection title="它在 FMClaw™ 里的位置"
        sub="项目大脑决定看什么，工作流引擎决定什么时候用哪个工具，控制台保证用得可控。">
        <BrainMap current="toolbox" />
      </SolSection>

      <SeoFaq
        heading="关于物业管理系统与工具箱，常被问到的问题"
        serviceName="FMClaw™ 工具箱"
        serviceDesc="内置收费、工单、设备巡检、品质、计薪、结算等物业管理系统，按模块开通、按用量付费；在用系统原样接入。"
        items={[
          { q: "物业管理系统有哪些功能？", a: "常见的物业管理系统包括收费管理、客服与报事报修工单、设备台账与巡检保养、品质核查、考勤排班与薪资、合同与采购、数据报表等模块。FMClaw™ 工具箱内置了这些模块，并且由智能体直接使用：数据自动进入，工单自动推进，报告自动生成。" },
          { q: "物业管理系统多少钱一套？", a: "传统物业软件通常按账号或项目收年费，功能用不用都要付。FMClaw™ 的软件全部包含在平台内，按模块开通，开通和订阅费用远低于传统物业 SaaS；智能体调用工具时按实际用量消耗平台积分，用量取决于开通了多少条工作流。具体版本与价格见价格页，个人版可以免费开始。" },
          { q: "物业管理软件哪个好用？", a: "看你要解决的问题。只需要记账收费，传统收费软件就够用；如果希望减少人工录入、让工单和巡检自动推进、报告自动生成，就需要能让 AI 直接干活的平台。FMClaw™ 的区别在于软件和智能体是一体的：软件是工具，智能体用它们把事情做完。" },
          { q: "没有物业管理系统，能直接用 FMClaw 吗？", a: "能。很多中小物业公司和园区自己的物业公司没有系统，可以直接开通需要的模块，不用先采购一套物业软件；建议从收费、工单、巡检这几个最常用的模块开始，用到再加。" },
          { q: "已经有物业 ERP，还要换系统吗？", a: "不用。已有的物业 ERP、财务、人力、BA、视频安防和机器人原样接入，FMClaw™ 读取现有系统的数据，结果写回现有系统；缺什么模块再补什么。" },
          { q: "物业收费系统和工单系统能和钉钉、企业微信打通吗？", a: "能。钉钉、飞书、企业微信经官方预留的接口接入，支持群机器人建单、对话框问数和多维表双向同步，员工不换工具、不改习惯。" },
          { q: "智能体调用这些工具会不会乱操作？", a: "不会。谁能用哪个工具，接入时就定好；查信息、算数据可以直接做，发出去、扣到钱、动到设备的动作，先经人批准；每一次调用都有记录，收回授权立即生效。" },
          { q: "机器人和 IoT 设备也能接吗？", a: "能。清洁机器人、巡检机器人、无人机，以及 BA、能源仪表、视频安防，都以工具形式接入。工作流发出任务，设备执行并回传结果。" },
        ]}
      />

      <FmFoot updated="2026-10-16" />

      <SolEnd
        title={["从最急需的一个模块开始，", "看智能体怎么用它干活"]}
        sub="收费、工单、巡检或结算，选一个先跑起来。"
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        alt={<>继续了解：<Link href="/products/fmclaw/ontology">项目大脑</Link> · <Link href="/products/fmclaw/workflow-engine">工作流引擎</Link> · <Link href="/products/fmclaw/agent-runtime">控制台</Link> · <Link href="/pricing">价格</Link></>}
      />
    </SolPage>
  );
}
