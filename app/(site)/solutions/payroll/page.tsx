import type { Metadata } from "next";
import Link from "next/link";
import SeoFaq from "@/components/SeoFaq";
import { pageMetadata } from "@/lib/pageMetadata";
import { SolPage, SolHero, SolSection, SolCompare, SolSteps, SolAside, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/payroll", {
  title: "人员薪酬管理 · 智能体解决方案 | 启盟科技",
  description:
    "排班、考勤、算薪不再靠 HR、主管、项目多人协同。主管只配工作模式，人脸+蓝牙核验现场打卡，系统按小时算在场工时，FMClaw 自动拉取考勤、工时、加班、请假、补贴等数据算出薪酬；已有考勤系统可外接飞书、钉钉、企微数据源。",
});

const feats = [
  { title: "智能排班", body: "主管无需用系统排班，只需配置好员工的工作模式：月休 4 天、做 6 休 1、做 5 休 2。" },
  { title: "考勤打卡", body: "员工上班时选择自己的班次，人脸 + 蓝牙位置核验，确保在现场打卡。" },
  { title: "在场工时", body: "系统按小时维度输出每个员工的在场工时，确保员工持续在场。" },
  { title: "工薪结算", body: "在 FMClaw 配置薪酬计算流程，AI 自动拉取薪酬配置、考勤、在场工时、加班、请假、专项增减、节假日补贴等数据，自动算出每个人的薪酬。" },
];

export default function Page() {
  return (
    <SolPage>
      <SolHero
        crumb="人员薪酬管理"
        title={["排班、考勤、算薪，", "一条龙自动跑"]}
        lead={<>入职、排班、考勤统计、算薪，过去要 HR、主管、项目<b>多人协同</b>。现在配好规则，AI 把薪酬自动算出来。</>}
        secondary={{ href: "#caps", label: "看四个能力" }}
        proof={["智能排班", "在场工时核验", "FMClaw 自动算薪"]}
        image={{ src: "/solutions/pay-hero.jpg", alt: "保洁员在走廊的人脸识别考勤终端前完成现场打卡（场景示意）" }}
      />

      <SolSection title="从多人协同月底拼账，到 AI 自动算薪" tone="mist" split
        sub="过去多人协同、月底拼账，工作量巨大；现在配好规则，AI 算薪。">
        <SolCompare labels={["过去 · 多人协同", "现在 · 配规则 + AI"]} rows={[
          { k: "排班", before: <><b>排班难维护</b>：月头排好的班，员工各种特殊情况调班，多人多天反复调整，往往算薪时才定稿。</>, after: <><b>不用排班</b>：主管只配工作模式，系统自动排班、自动维护。</> },
          { k: "考勤", before: <><b>考勤难核验</b>：打卡只有签到、签退时间，打了卡，人真的在现场服务吗？</>, after: <><b>现场核验</b>：选班次 + 人脸 + 蓝牙位置核验，确保人在现场打卡。</> },
          { k: "算薪", before: <><b>算薪工作量大</b>：纸质考勤、排班还要重新录入，核验每个人、算每一笔，工作量巨大。</>, after: <><b>自动算薪</b>：按小时算在场工时，FMClaw 拉取所有数据，AI 自动算出薪酬。</> },
        ]} />
        <SolMore>它与 <Link href="/solutions/subcontract">服务分包管理</Link>，本就源自同一套记录。</SolMore>
      </SolSection>

      <SolSection id="caps" title="从排班到算薪，一条线跑下来" split
        sub="前三个让数据在过程中自然产生，第四个由 FMClaw 把它们自动算成薪酬。">
        <SolSteps items={feats} />
        <SolAside
          title="已有自己的考勤系统？"
          body="外接自定义数据源补充，照样自动算薪："
          items={["飞书", "钉钉", "企微"]}
          href="/products/fmclaw/connectors#platforms"
          linkText="钉钉、飞书、企业微信怎么接，了解更多"
        />
        <SolVerdict>你只需配好规则，薪酬 AI 自动算出来</SolVerdict>
      </SolSection>

      <SeoFaq
        heading="薪酬管理，你可能想问"
        serviceName="人员薪酬管理"
        serviceDesc="打通考勤工时与考核，自动核算物业薪酬。"
        items={[
          { q: "物业薪酬核算为什么容易出错？", a: "多项目、多班次、连班缺编、考勤口径不一，手工核算既慢又易错。把考勤与工时数据打通后可自动核算，减少误差与人情分。" },
          { q: "薪酬能和考勤、考核打通吗？", a: "可以。把到岗工时、服务达标等数据与薪酬规则联动，实现按真实出勤与结果核算，既公平又可追溯。" },
          { q: "上线薪酬自动化要换系统吗？", a: "不必。可在现有考勤 / 工时数据上接入核算逻辑，先跑通一个项目再推广。" },
        ]}
      />

      <SolEnd title={["把一个月的薪酬核算，", "跑成 AI 自动算的结果"]} sub="从你的一个真实业务开始。" />
    </SolPage>
  );
}
