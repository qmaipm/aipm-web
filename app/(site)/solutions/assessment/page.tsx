import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import {
  SolPage, SolHero, SolDefine, SolSection, SolTable, SolSteps, SolCols, SolShots, SolGallery,
  SolCases, SolVerdict, SolMore, SolEnd,
} from "../_tpl/Sol";

// 2026-10-14 改版：数据源（监控、手机、机器人、无人机）× 能力（保洁质检、拍照抄表、隐患识别、设备巡检）。
// 无人机没有已发布案例，只写「可接入」。验收见 docs/SOLUTIONS-AGENT-GROUPS-ACCEPTANCE.md
const PATH = "/solutions/assessment";

export const metadata: Metadata = pageMetadata(PATH, {
  title: "物业 AI 质检、拍照抄表与隐患识别 · 质量评估智能体群 | 启盟科技",
  description:
    "质量评估智能体群读取监控摄像头、手机、机器人和无人机拍到的画面，完成保洁质检、拍照抄表、安全隐患识别和设备巡检核验，发现问题直接开工单。拍照识别读数准确率 99% 以上。",
});

const abilities = [
  { meta: "能力 01", title: "保洁质检", body: "按空间类型和服务标准给照片打分，指出问题位置和责任部门。同一套评分标准用在每个点位、每个人身上。" },
  { meta: "能力 02", title: "拍照抄表", body: "拍下水表、电表、压力表等仪表，自动识别读数并写入记录，读数异常时提醒。告别人工手抄和事后补填。" },
  { meta: "能力 03", title: "安全隐患识别", body: "识别消防通道占用、器材异位、电动车违规充电和冒烟、设备间渗漏、堆放遮挡等隐患。" },
  { meta: "能力 04", title: "设备巡检核验", body: "核对巡检照片和读数是否来自对应的设备与时间，配合现场感知确认人到场、检查做了。" },
];

const flow = [
  { meta: "采集", title: "画面从已有渠道进来", body: "一线手机拍照、监控系统的预警图片、机器人巡检拍摄的画面，按点位进入同一个数据池。不接视频流，不改造监控系统。" },
  { meta: "识别", title: "按点位和标准判断", body: "先判断照片是否清晰可用，再识别空间类型和服务等级，按对应标准评分或识别隐患、读出仪表数值。" },
  { meta: "处理", title: "有问题直接开工单", body: "滤掉没有问题的画面，把疑似问题定位到点位并说明疑点，直接开工单派到对应岗位。到场核实和处置由人完成。" },
  { meta: "沉淀", title: "结果进入复盘和考核", body: "评分、问题类型、读数都是结构化数据，按项目、班组、个人汇总，交给服务优化智能体群做报告和结算。" },
];

export default function AssessmentPage() {
  return (
    <SolPage>
      <SolHero
        crumb="质量评估智能体群"
        title={["摄像头、手机、机器人拍到的，", "都能拿来做质检"]}
        lead={<>质量评估智能体群读取各类设备拍到的画面，完成<b>保洁质检、拍照抄表、安全隐患识别、设备巡检核验</b>四件事；发现问题，直接开出工单派给对应岗位。</>}
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        secondary={{ href: "#abilities", label: "看四项能力" }}
        proof={["保洁质检", "拍照抄表", "隐患识别", "设备巡检"]}
        image={{ src: "/solutions/agent-qa-hero.jpg", alt: "设备机房里，工程人员用手机拍下压力表读数（场景示意）" }}
      />

      <SolDefine
        term="质量评估智能体群是什么："
        current={PATH}
        foot={<>它是 FMClaw™ 四个智能体群之一，和服务设计、运营管理、服务优化共用同一套点位、标准和工单数据。</>}
      >
        由多个岗位智能体组成，用视觉识别替代人工看图：同一套标准评估每一张照片，评分和问题都有依据可查。人工抽检常常覆盖不到一成，按点位全量评估之后，质检不再取决于检查的人去了哪里。
      </SolDefine>

      <SolSection id="abilities" title="四项能力，用在每天都在发生的检查上" img={{ src: "/scene/as-check.webp", alt: "质检主管蹲下检查走廊地面边角的清洁情况" }} tone="mist" split
        sub="这四类检查过去都靠人到现场看、拿纸笔记。现在一线只负责把画面拍下来，判断由系统完成。">
        <SolCols items={abilities} />
      </SolSection>

      <SolSection title="画面从哪里来" split
        sub="大多数项目已经有这些设备，质量评估接在它们后面使用，不需要重新采购。">
        <SolTable
          head={["数据源", "怎么接进来", "常用于"]}
          rows={[
            ["监控摄像头", "监控系统的预警图片放进约定的数据池，不接视频流、不改造监控系统", "隐患识别、消防点位、电动车充电区、设备间"],
            ["一线手机", "主管或员工按指引到点位拍照上传，不用填表", "保洁质检、拍照抄表、巡检核验"],
            ["机器人", "清洁或巡检机器人作业时拍摄的画面", "公共区域保洁复核、夜间巡视"],
            ["无人机", "可接入，画面按点位进入同一个数据池", "外立面、屋面、大面积室外区域"],
          ]}
          caption="图片范围由客户在数据池这一层自行限定。识别只针对场景状态，不做人脸识别、不做身份比对。"
        />
      </SolSection>

      <SolSection title="从拍到画面，到工单派出" img={{ src: "/scene/cl-office.webp", alt: "保洁员在办公区擦拭玻璃隔断" }} tone="mist" split
        sub="一线只做一件事：把画面拍下来。">
        <SolSteps items={flow} />
        <SolVerdict>交付的不是一条预警，是一张已经派到岗位的工单</SolVerdict>
      </SolSection>

      <SolSection title="界面截图" sub="左：一线手机端拍照打分。右：AI 评分详情，包含图片质量检测、空间类型判断、问题与责任归属。">
        <SolShots items={[
          { src: "/images/qa-app.jpg", alt: "一线手机端：到点位拍照，AI 即时打分", caption: "一线手机端：到点位拍照即可。", w: 1080, h: 2373 },
          { src: "/images/agent-quality.png", alt: "AI 评分详情：茶水间通道保洁质量报告，评分 4.8 分", caption: "AI 评分详情：按空间档次与服务标准评分，并列出问题与扣分依据。", w: 1342, h: 1636 },
        ]} />
        <div style={{ marginTop: 48 }}>
          <SolGallery items={[
            { src: "/images/agents/qa-clean-batch.webp", w: 2000, h: 987, title: "批量照片质检", caption: "把一批现场照片交给智能体群，逐张评分，结果同步到右侧，可勾选后生成质检报告。", alt: "清洁质检界面：办公区现场照片质检，7 张照片逐张给出评分" },
            { src: "/images/agents/qa-hazard-order.webp", w: 2000, h: 990, title: "风险点位直接派单", caption: "比对前一天的全量运营数据，列出存在质量风险的点位，勾选后直接创建检查工单，并显示每个工单的处理状态。", alt: "质量巡检审批单：审批摘要与按工种分组的风险点位清单，含风险值与工单状态" },
          ]} />
        </div>
      </SolSection>

      <SolSection title="已经发布的相关案例" tone="mist" split
        sub="四项能力都有对应的在运行项目。">
        <SolCases items={[
          { scene: "头部互联网企业总部 · 设备巡检", result: <>AI 拍照识别读数准确率 <b>99%+</b>，运行班组达标率从 <b>35% 到 98%</b>，整体签到率 <b>99%</b>。</>, href: "/cases/fmclaw-equipment-inspection" },
          { scene: "华南某园区 · 监控预警", result: <>识别完直接派单，一次电动车冒烟 <b>3 分钟</b>内有人到场；按重点点位接入日均<b>一两百张</b>，全量接入上千张。</>, href: "/cases/campus-cctv-photo-ai-review" },
          { scene: "华南 6 万㎡商业综合体 · 保洁质检", result: <>单项目每月评估超过 <b>1000 张</b>影像，结构化标签全量覆盖。</>, href: "/cases/south-china-mixed-use-6-to-1" },
          { scene: "通信设备龙头 · 13 城 21 园区卫生间", result: <><b>2000 多个</b>卫生间全量追踪，各园区服务达标率稳定在 <b>95% 以上</b>。</>, href: "/cases/restroom-quality" },
        ]} />
      </SolSection>

      <SolSection title="做不到的地方，先说清楚" split
        sub="视觉识别有明确的边界。">
        <SolCols items={[
          { title: "照片只反映那一刻", body: "看得到状态，看不到过程。拍照或进池的频率，决定了问题被发现的速度。" },
          { title: "光线和镜头会影响判断", body: "夜间、逆光、镜头脏污的点位，结果需要人复核。AI 评分可以被人改判，改判会记录下来。" },
          { title: "处置仍然靠人", body: "工单能自动开出来，到场核实、现场处置、要不要升级，都由人完成。" },
        ]} />
        <SolMore>巡检场景的完整做法见 <Link href="/solutions/inspection">设备巡检管理</Link>；保洁品质见 <Link href="/solutions/quality">服务品质管理</Link>。</SolMore>
      </SolSection>

      <SeoFaq
        heading="关于物业 AI 质检和拍照抄表，常被问到的问题"
        serviceName="质量评估智能体群"
        serviceDesc="读取监控、手机、机器人和无人机画面，完成保洁质检、拍照抄表、安全隐患识别和设备巡检核验。"
        items={[
          { q: "保洁质量检查可以用 AI 来做吗？", a: "可以。一线按指引到点位拍照上传，质量评估智能体群先判断照片是否清晰可用，再识别空间类型和服务等级，按对应的保洁标准评分，并列出问题位置和责任部门。同一套评分标准用在每个人身上，结果可以复核。华南一个 6 万㎡商业综合体，单项目每月评估超过 1000 张影像。" },
          { q: "物业拍照抄表有哪些方案？准确率怎么样？", a: "常见做法有两类：一是给仪表加装远传设备，二是人工拍照后由 AI 识别读数。后者不改造仪表，适合机房和设备数量多、仪表型号杂的项目。在一家头部互联网企业总部，AI 拍照识别读数准确率达到 99% 以上，读数直接写入巡检记录，不用人工手抄。" },
          { q: "AI 隐患识别能识别哪些问题？", a: "以已运行的园区为例，主要是四类：消防点位（通道占用、器材异位）、电动车充电区（违规充电、异常冒烟）、设备间（渗漏、堆放遮挡、仪表与指示灯状态）、重点区域的卫生与陈设。识别出问题后直接开工单派到对应岗位，一次电动车冒烟在 3 分钟内有人到场。" },
          { q: "监控室的预警太多看不过来，怎么办？", a: "预警多的问题，不在识别，而在识别之后没人跟。质量评估智能体群把监控系统的预警图片接入后，先滤掉没有问题的画面，把疑似问题定位到点位并说明疑点，然后直接开工单派人，跟进和验收都在原有工单流里。不接视频流，不改造监控系统，不换摄像头。" },
          { q: "设备巡检怎么防止走过场？", a: "两件事一起做：用现场感知确认巡检人员真的到了设备位置，用照片和读数确认检查真的做了。在一家头部互联网企业总部，运行班组达标率从 35% 提升到 98%，整体签到率 99%。" },
          { q: "可以接入机器人和无人机拍的画面吗？", a: "可以。清洁或巡检机器人作业时拍摄的画面，以及无人机拍摄的外立面、屋面等画面，都可以按点位接入同一个数据池，用同一套标准识别和评分。" },
          { q: "AI 评分和人工判断不一致时怎么办？", a: "以人工复核为准，并记录下来。AI 评分可以被人改判，改判记录会用于校准评分标准，让标准越来越贴近项目实际。" },
          { q: "图片里有人脸、车牌，会不会涉及隐私？", a: "识别只针对场景状态，不做人脸识别、不建人像库、不做身份比对。哪些点位、哪些图片可以进入数据池，由客户自己限定，不该出去的内容留在客户自己的系统里。" },
        ]}
      />

      <SolEnd
        title={["拿一批真实照片来，", "看 AI 怎么评、怎么派单"]}
        sub="保洁照片、仪表照片、监控预警图片都可以，从你的一个真实项目开始。"
        cta={{ href: `/contact?intent=demo&from=${PATH}`, label: "预约演示" }}
        alt={<>其余三个智能体群：<Link href="/solutions/service-design">服务设计</Link> · <Link href="/solutions/operations">运营管理</Link> · <Link href="/solutions/optimization">服务优化</Link></>}
      />
    </SolPage>
  );
}
