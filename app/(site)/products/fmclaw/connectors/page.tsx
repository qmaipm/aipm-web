import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { techArticleLd } from "../_shared";
import { BrainMap, FmFoot, MediaRow } from "../_brain";
import {
  SolPage, SolHero, SolDefine, SolSection, SolCompare, SolSteps, SolCols, SolTable, SolGallery, SolVerdict, SolMore, SolEnd,
} from "../../../solutions/_tpl/Sol";
import { SYSTEMS, sysHref } from "./_systems";
import "./sys.css";

// 2026-10-27 改版：工具箱 = AI 物业管理系统总页（对齐稿 docs/PRODUCT-SYSTEMS.md）。
// 品类词用「AI 物业管理系统」（百度联想：有哪些 / 怎么样 / 怎么用）；不用「智慧物业」作自称
// （已被传统厂家与地方政府平台占住），只在 FAQ 里回答两者区别。
// 5 个核心系统各有子页（owner / billing / parking / access / building），其余模块在本页列表。
// 公开尺度：不列接入协议，不写具体价格（见 /pricing）；不写「智能体的工具」「Credit」等内部说法。
const PATH = "/products/fmclaw/connectors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "AI 物业管理系统：业主小程序、工单、收费、停车、门禁、楼宇自控全套内置｜FMClaw™ 工具箱",
  description:
    "AI 物业管理系统有哪些功能：FMClaw™ 工具箱内置业主小程序与工单、物业收费、停车场管理、门禁与访客、楼宇自控与设备能耗，以及品质巡查、考勤薪资、合同采购、报表大屏等模块。和传统智慧物业系统的区别：业主说一句话就能报修，工单自动建好、催办、超时升级；停车日报每天自动发给项目经理；门禁坏了系统先知道；设备异常直接变工单。系统之间数据是通的，按模块开通，已有系统原样接入。",
});

const TECH_LD = techArticleLd({
  path: PATH,
  headline: "AI 物业管理系统：FMClaw™ 工具箱",
  description:
    "FMClaw™ 工具箱内置物业管理要用的全部系统：业主小程序与工单、收费、停车、门禁与访客、楼宇自控与设备能耗等，系统之间数据互通，由 AI 主动推进日常工作；已有系统原样接入。",
});

const LIST_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI 物业管理系统包含的核心系统",
  itemListElement: SYSTEMS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.full,
    url: `${process.env.SITE_URL || "https://www.aipm.cn"}${sysHref(s.slug)}`,
  })),
};

/* 5 个核心系统之外的模块 */
const MODS = [
  { h: "品质与安全巡查", p: "服务做没做、做得好不好", items: ["品质核查与 AI 质检评分", "巡更与安全巡查", "隐患识别与自动派单", "拍照抄表，读数自动识别"] },
  { h: "人事考勤与薪资", p: "人算得明白", items: ["考勤排班", "薪资与 KPI 核算", "人员编制测算", "项目预算测算"] },
  { h: "合同、采购与供应商", p: "钱和物算得明白", items: ["合同管理", "物资与采购", "供应商账单核算", "供应商结算"] },
  { h: "空间与报表", p: "一个项目的底图", items: ["空间与服务点位清单", "服务标准与服务计划", "日报、周报、月报", "数据大屏"] },
];

/* 在用软件目录 */
const CATALOG = [
  ["物业 ERP", "收费、工单、租赁、合同、客户档案"],
  ["财务与人力", "总账、应收应付、考勤、排班、薪酬"],
  ["协同平台", "钉钉、飞书、企业微信的消息、审批与文档"],
  ["楼宇与 IoT", "楼宇自控、暖通、电梯、给排水、能源仪表、消防"],
  ["视频与门禁", "摄像头、门禁、闸机、巡更、告警"],
  ["停车", "道闸、车牌识别、停车收费系统"],
  ["机器人与装备", "清洁机器人、巡检机器人、无人机"],
];

export default function ConnectorsPage() {
  return (
    <SolPage>
      <JsonLd data={[TECH_LD, LIST_LD]} />

      <SolHero
        crumbRoot={{ href: "/products/fmclaw", label: "AI 物业经理 FMClaw™" }}
        crumb="工具箱 · AI 物业管理系统"
        title={["AI 物业管理系统，", "全套都在工具箱里"]}
        lead={<>业主小程序与工单、收费、停车、门禁与访客、楼宇自控：物业要用的系统都在，<b>系统之间数据是通的</b>。不同的是，活不再等人去点，<b>AI 主动把它推进完</b>。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#systems", label: "看有哪些系统" }}
        proof={["5 个核心系统 + 常用模块", "按模块开通", "已有系统原样接入", "30+ 预制工具，持续增加"]}
        media={{ node: <img className="bm-shot" src="/images/agents/op-workbench.webp" alt="FMClaw™ 工作台真实界面：待办事项、工单进度与智能体运行状态" width={2000} height={989} />, caption: "真实产品界面 · 工作台" }}
      />

      <SolDefine
        term="AI 物业管理系统是什么"
        foot={<>工具箱是这些系统在 FMClaw™ 平台里的名字：客户登录后看到的，就是工具箱。</>}
      >
        物业管理要用的收费、工单、停车、门禁、设备等系统，加上一个会干活的 AI。传统系统负责记录，人去录入、派单、催办、做报表；AI 物业管理系统里，这些事由 AI 自动推进，人负责确认和到场处理。
      </SolDefine>

      <SolSection title="和传统智慧物业系统，差在哪" tone="mist"
        sub="一句话：系统上了，活还是人在干。下面六件事，是差别所在。">
        <SolCompare labels={["传统智慧物业系统", "AI 物业管理系统"]} rows={[
          { k: "报修入口", before: "下载 App，找入口、填表", after: "在小程序或业主群里说一句话、发一段语音" },
          { k: "建单", before: "客服看消息、判断、手工录单", after: "自动识别诉求、自动生成工单，人确认即派" },
          { k: "跟进", before: "靠人催、靠人记", after: "自动催办，超时自动升级到对应负责人" },
          { k: "设备与门禁", before: "数据在系统里，要人自己去看", after: "哪个门禁点坏了、哪里漏水，系统先发现、直接派单" },
          { k: "报表", before: "人去导数、做表、写日报", after: "日报自动写好，每天发给项目经理" },
          { k: "系统之间", before: "收费、工单、门禁、停车各买各的，数据不通", after: "同一套数据：修完直接出收费单，访客车自动放行" },
        ]} />
      </SolSection>

      <SolSection id="systems" title="5 个核心系统"
        sub="同类产品有的常用功能都有。下面每行列出加了 AI 之后多做的三件事，点进去看详细。">
        <ul className="sys-list">
          {SYSTEMS.map((s, i) => (
            <li key={s.slug}>
              <Link href={sysHref(s.slug)}>
                <img src={s.img} alt={s.alt} loading="lazy" width={1800} height={1207} />
                <div className="t">
                  <span className="k">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.full}</h3>
                  <p className="l">{s.line}</p>
                  <ul>{s.ai.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <span className="go" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </SolSection>

      <SolSection title="其他常用模块" tone="mist"
        sub="品质、人事、采购、报表这些模块也都内置，按需要开通。">
        <div className="bm-mods">
          {MODS.map((m) => (
            <section key={m.h}>
              <h3>{m.h}</h3>
              <p>{m.p}</p>
              <ul>{m.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </section>
          ))}
        </div>
        <p className="spt-note">30+ 预制工具持续增加，模块清单以实际开通为准。</p>
      </SolSection>

      <SolSection title="数据通了，一件事能从头办到尾" split img={{ src: "/scene/home-pm.webp", alt: "项目经理在写字楼大堂看平板上的项目情况" }}
        sub="几个系统用同一套数据，不用人在系统之间来回抄。三个例子：">
        <SolSteps items={[
          { title: "语音报修 → 自动派单 → 修完出账", body: "业主发一段语音说厨房漏水，AI 认出房号、生成工单派给师傅；有偿维修办完，收费单直接推给业主。", href: sysHref("owner"), linkText: "业主小程序与工单" },
          { title: "邀请访客 → 门禁和道闸一起放行", body: "租户在小程序里邀请客人并登记车牌，访客到了扫码进门，车辆自动放行、按规则计费。", href: sysHref("access"), linkText: "门禁与访客系统" },
          { title: "夜间漏水 → 自动报单 → 写进日报", body: "用水数据异常，系统直接生成工单派给值班工程师；处理结果第二天自动写进项目日报。", href: sysHref("building"), linkText: "楼宇自控与设备能耗" },
        ]} />
      </SolSection>

      <SolSection title="真实界面" tone="mist"
        sub="平台内置模块的真实界面，数据已脱敏。点击可看大图。">
        <SolGallery items={[
          { src: "/images/agents/qa-hazard-order.webp", w: 2000, h: 990, title: "隐患识别与派单", caption: "现场照片识别出隐患后自动生成工单，派给对应负责人。", alt: "隐患识别派单界面：现场照片、隐患类型与工单信息" },
          { src: "/images/agents/rv-vendor-bill.webp", w: 2000, h: 1322, title: "供应商结算", caption: "按编制工时、实际出勤、加班和缺勤逐日核算账单，含税金额自动算出。", alt: "供应商费用结算界面：账单金额、税费、编制人数与每日账单明细" },
          { src: "/images/agents/rv-payroll.webp", w: 2000, h: 987, title: "薪资与 KPI 核算", caption: "薪酬汇总按审批级次逐级确认，明细列出应发、扣款与加班费。", alt: "保洁薪酬汇总审批界面：审批级次与薪酬明细表" },
          { src: "/images/agents/sd-points.webp", w: 2000, h: 989, title: "空间与服务点位", caption: "项目的每一个服务点位、服务标准和频次，都在一张清单里。", alt: "服务点位清单界面：楼层、区域、点位类型与服务频次" },
        ]} />
      </SolSection>

      <SolSection title="有没有系统，都能用"
        sub="没有系统的，不用先花一笔钱买软件；已经有系统的，不用推倒重来。">
        <MediaRow src="/products/fmclaw/brain/toolbox-hero.webp" alt="园区物业服务中心前台，物业人员和项目经理在电脑上处理工作（场景示意）" w={1600} h={1195}>
          <h3>两种情况，都从一个系统开始</h3>
          <ul>
            <li><b>还没有系统</b>直接开通需要的模块，从工单、收费、停车这类最常用的开始，用到再加。</li>
            <li><b>已经有系统</b>在用的物业 ERP、收费、停车、门禁、楼宇自控原样接入，不替换；缺什么补什么，结果写回现有系统。</li>
          </ul>
        </MediaRow>
      </SolSection>

      <SolSection title="在用的软件和设备，原样接进来" img={{ src: "/scene/park-lowvolt.webp", alt: "两位工程师在弱电机房对照系统图纸" }} tone="mist"
        sub="接进来之后，AI 像人一样使用这些系统：在收费系统出账单，在工单系统派工，在协同平台通知人。">
        <SolTable head={["类别", "常见软件与设备"]} rows={CATALOG} />
        <SolVerdict>你在用的系统和设备，原样接进来就能用，不替换。</SolVerdict>
      </SolSection>

      <SolSection title="已经在用钉钉、飞书、企业微信，正好" img={{ src: "/scene/im-chat.webp", alt: "物业主管在走廊里用手机查看工作群消息" }}
        sub="员工不换工具、不改习惯，账号与组织架构沿用现有体系。">
        <SolCols items={[
          { meta: "群机器人", title: "群里多一个助手", body: "业主在群里发一条报修，助手收进来、建单、派工，进度发回群里。" },
          { meta: "对话问数", title: "对话入口不变", body: "管理层还在原来的对话框里问「本月哪个项目能耗异常」，答案按统一口径算出来。" },
          { meta: "表格互通", title: "两边看到同一份数", body: "与多维表、智能表格双向同步，日报、周报、台账在两边是同一份数。" },
        ]} />
        <SolMore>为什么协同平台和行业系统谁也离不开谁，见 <Link href="/insights/general-platform-vs-industry-agent">这篇行业研究</Link>。</SolMore>
      </SolSection>

      <SolSection title="能做什么，有授权" img={{ src: "/scene/approve-phone.webp", alt: "区域经理在手机上确认一笔申请" }} tone="mist"
        sub="AI 拿到的不是整个系统，而是明确授权的几个动作。">
        <SolTable head={["动作类型", "怎么执行", "例子"]} rows={[
          ["查信息、算数据、写草稿", "AI 直接做", "查某户缴费记录，汇总本月工单，起草一条群通知"],
          ["发出去、扣到钱、动到设备", "先经人批准再执行", "向业主群发通知，给某户退费，远程开门或停一台设备"],
          ["收回授权", "立即生效", "该动作当场不可用，已有记录保留，可随时复核"],
        ]} />
      </SolSection>

      <SolSection title="怎么开通，怎么收费">
        <SolCols items={[
          { meta: "按模块开通", title: "从一个系统开始", body: "先开最急需的那一个，跑出效果再加别的，不用一次买齐。" },
          { meta: "按用量计费", title: "用多少，付多少", body: "团队版按项目与账号容量一次性启用，之后按实际用量付费；只接收报告的人不计账号。" },
          { meta: "价格", title: "个人版免费开始", body: <>项目团队版 19,800 元起；上线服务、数据接入与硬件按项目报价，见 <Link href="/pricing">价格</Link>。</> },
        ]} />
      </SolSection>

      <SolSection title="它在 FMClaw™ 里的位置" tone="mist"
        sub="项目大脑决定看什么，工作流引擎决定什么时候用哪个系统，控制台保证用得可控。">
        <BrainMap current="toolbox" />
      </SolSection>

      <SeoFaq
        heading="关于 AI 物业管理系统，常被问到的问题"
        serviceName="AI 物业管理系统 · FMClaw™ 工具箱"
        serviceDesc="内置业主小程序与工单、物业收费、停车场管理、门禁与访客、楼宇自控与设备能耗等系统，系统之间数据互通，由 AI 主动推进日常工作；按模块开通，已有系统原样接入。"
        items={[
          { q: "AI 物业管理系统有哪些功能？", a: "包括五个核心系统：业主小程序与工单（一句话报修，自动建单、催办、超时升级）、物业收费（业务发生自动出账，欠费自动分析）、停车场管理（停车日报每天自动发给项目经理）、门禁与访客（一句话邀请访客，门禁故障自动派单）、楼宇自控与设备能耗（异常直接变工单）。另有品质巡查、考勤薪资、合同采购、报表大屏等模块。" },
          { q: "AI 物业管理系统和智慧物业系统有什么区别？", a: "智慧物业系统把物业工作搬到线上，但录入、派单、催办、做报表仍然靠人；AI 物业管理系统把这些事交给 AI 自动推进：业主说一句话就能报修，工单自动生成、催办、超时升级；停车日报自动写好发给项目经理；门禁坏了、设备漏水，系统先发现并派单。另一个区别是数据互通：收费、工单、停车、门禁用同一套数据，一件事能从头办到尾。" },
          { q: "已经有物业管理系统了，还能用吗？", a: "能。在用的物业 ERP、收费、停车、门禁、楼宇自控和钉钉、飞书、企业微信原样接入，不替换；AI 读取现有数据推进工作，结果写回原系统，缺什么模块再补什么。" },
          { q: "没有任何系统，能直接用吗？", a: "能。直接开通需要的模块，不用先采购一套物业软件；建议从工单、收费、停车这类最常用的开始。" },
          { q: "业主要下载 App 吗？", a: "不用。业主可以用小程序，也可以直接在业主微信群里说话报修、查账单、查进度。" },
          { q: "门禁的人脸数据怎么处理？", a: "人脸只在本人同意后录入，用于本项目的通行；也可以用刷卡、NFC 或二维码。" },
          { q: "AI 会不会乱操作？", a: "不会。查信息、算数据可以直接做；发出去、扣到钱、动到设备的动作，先经人批准；每一次操作都有记录，收回授权立即生效。" },
          { q: "AI 物业管理系统多少钱？", a: "个人版免费开始；团队版按项目与账号容量一次性启用，之后按实际用量付费，项目团队版 19,800 元起；上线服务、数据接入与硬件按项目报价，详见价格页。" },
        ]}
      />

      <FmFoot updated="2026-10-27" />

      <SolEnd
        title={["从最急需的一个系统开始，", "用你的数据跑一遍"]}
        sub="工单、收费、停车、门禁或楼宇自控，选一个先跑起来。"
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        alt={<>继续了解：<Link href="/products/fmclaw/ontology">项目大脑</Link> · <Link href="/products/fmclaw/workflow-engine">工作流引擎</Link> · <Link href="/products/fmclaw/agent-runtime">控制台</Link> · <Link href="/pricing">价格</Link></>}
      />
    </SolPage>
  );
}
