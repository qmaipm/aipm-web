import type { Metadata } from "next";
import Link from "next/link";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { SolPage, SolHero, SolSection, SolCompare, SolSteps, SolVerdict, SolNums, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/inspection", {
  title: "设备巡检管理 · 智能体解决方案 | 启盟科技",
  description:
    "纸质表、扫码巡检无法保证人到现场，数据不准不全就失去价值。我们用 IOT 人单合一验证到场、巡检单电子化 + 拍照 AI 识别读数、读数超阈值预警与趋势异常分析，把巡检数据做真做全，支撑预防性维护。",
});

const feats = [
  { title: "确保人员到场", body: "通过 IOT 传感器实现“人单合一”验证，员工必须到现场才能填单，杜绝隔空补录。", href: "/products/iot", linkText: "IoT 物理世界感知系统" },
  { title: "保障数据完整性", body: "巡检单在线电子化，还能拍照让 AI 自动识别读数，保障数据准确、完整。" },
  { title: "读数超阈值预警", body: "为每个读数配置正常值范围，填写的读数一旦超阈值，立即预警。" },
  { title: "数据分析与预警", body: "基于完整数据做分析，识别趋势陡升陡降，提前发出故障预警。" },
];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="设备巡检管理"
        title={["巡检到场、数据为真，", "才能预防性维护"]}
        lead={<>纸质表、扫二维码，都没法保证人真的到现场检查；数据一旦<b>不准、不全</b>，就失去价值，更谈不上预防性维护。</>}
        secondary={{ href: "#caps", label: "看四个能力" }}
        proof={["人单合一到场", "数据完整准确", "超阈值 + 趋势预警"]}
        image={{ src: "/ai-service/facility-hero.jpg", alt: "工程人员在配电房用手机拍摄仪表读数，由 AI 识别（场景示意）" }}
      />

      <SolSection title="从“巡没巡看不准”，到“数据真、能预防”" tone="mist" split
        sub="过去靠纸质巡检表或扫二维码，现在由 IoT 验证到场、AI 识别读数。">
        <SolCompare rows={[
          { k: "人到没到", before: "纸质巡检表或扫二维码，没法保证每次巡检员工都在现场检查。", after: "IOT 验证人确实到场才能填单。" },
          { k: "数据准不准", before: "数据质量没保障，价值丧失。", after: "巡检单电子化，AI 识别读数。" },
          { k: "能否预防", before: "做不了预防性维护。", after: "超阈值与趋势异常自动预警。" },
        ]} />
      </SolSection>

      <SolSection id="caps" title="从确保到场，到提前预警" split
        sub="前两个把数据做真、做全，后两个把数据用起来：一步步走到预防性维护。">
        <SolSteps items={feats} />
        <SolVerdict>数据真、数据全，故障才能提前预警、预防性维护。</SolVerdict>
      </SolSection>

      <SolSection title="已经在运行的巡检线" tone="mist"
        sub={<>以下数字来自已发布案例。完整过程见 <Link className="spt-inlink" href="/cases">客户案例</Link></>}>
        <SolNums
          items={[
            { v: "99%", l: "头部互联网大厂总部，整体巡检签到率" },
            { v: "35% → 98%", l: "同一项目，运行班组达标率" },
            { v: "99%+", l: "AI 拍照识别读数准确率" },
            { v: "3400+", l: "一条地铁线逐次核验的机房数，漏检当天预警" },
          ]}
        />
      </SolSection>

      <SeoFaq
        heading="设备智能巡检，你可能想问"
        serviceName="设备巡检管理"
        serviceDesc="IoT + AI 的设备智能巡检，做到人单合一与异常预警。"
        items={[
          { q: "物业设备巡检走过场，怎么解决？", a: "巡检走过场的本质是「只能证明人到过，证明不了事做了」。解决办法不是加人复查，而是让每一次巡检的结果可核：IoT 在场感知核验人是否真的到了设备旁、停留了多久；巡检人员拍摄的设备读数与状态照片由 AI 自动识别比对，读数异常、照片重复或与历史不一致会被系统标出；漏检、迟检当天预警到管理者。已发布案例：一家头部互联网大厂总部，整体巡检签到率 99%，运行班组达标率从 35% 提升到 98%，AI 拍照识别读数准确率 99% 以上；一条地铁线的 3400 多个机房逐次核验，漏检当天预警。" },
          { q: "AI 能核什么、不能核什么？", a: "AI 能核的是可以被数据与影像确认的事实：人是否到位、停留是否足够、读数是多少、状态照片是否真实、是否按周期完成。AI 不能替人判断的：设备异常之后的处置方案、是否停机、要不要报修换件。这些仍由工程主管确认，智能体负责把事实、历史与建议准备好，并把处置跟到关闭。判断一套巡检方案是否靠谱，就看它能不能把「到场」与「做了」分开核。" },
          { q: "设备智能巡检和电子巡更有什么不同？", a: "电子巡更只证明“人到过点”，容易作弊；智能巡检结合 IoT 与 AI，采集真实在岗、巡检到岗率与设备状态，做到“人单合一”，并能预警设备异常。" },
          { q: "AI 巡检能解决重点区域反复投诉吗？", a: "能定位问题。把重点区域（如卫生间、机房）的到岗与达标数据化后，可精准发现薄弱点并持续跟踪改善，而非反复做无效专项整改。" },
          { q: "巡检数据能用于供应商考核吗？", a: "可以。巡检到岗率、服务达标率等可直接作为 OBC 考核指标，把巡检从“成本”变成“管理抓手”。" },
        ]}
      />

      <SolEnd
        title={["把一条真实的巡检线，", "跑出能预防的真数据"]}
        sub="从你的一个真实业务开始。"
        alt={<>巡检之外还有五类场景值得先上 AI，见 <Link href="/insights/ai-applications-and-solutions-in-property-management">应用与解决方案全览</Link> · 走过场怎么判断，看 <Link href="/insights/how-to-stop-equipment-inspection-going-through-motions">巡检走过场怎么解决</Link></>}
      />
    </SolPage>
  );
}
