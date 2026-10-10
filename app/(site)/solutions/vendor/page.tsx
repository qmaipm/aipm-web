import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";
import { SolPage, SolHero, SolSection, SolCols, SolVerdict, SolMore, SolEnd } from "../_tpl/Sol";

export const metadata: Metadata = pageMetadata("/solutions/vendor", {
  title: "供应商管理与自动对账 · 智能体解决方案 | 启盟科技",
  description:
    "对账周期长、口径不一、合同条款散落，甲方与物业公司都在这件事上耗人。我们让 Agent 按合同自动核量、对比历史与市场、圈出异常并生成账单草稿，付款这一步留给人。",
});

const pts = [
  { meta: "01 质量", title: "质量考评", body: "服务做得好不好，按统一标准给出评价，作为该不该付的第一个依据，而不是凭印象。" },
  { meta: "02 工作量", title: "工作量考评", body: "到底干了多少，按记录与口径自动核出来，不靠人估，对比历史与市场圈出偏差。" },
  { meta: "03 合同", title: "合同约束校验", body: "对照合同条款逐项校验，单价、范围、上限是否相符，异常一眼看清，付与不付都有据。" },
];

export default function VendorPage() {
  return (
    <SolPage>
      <SolHero
        crumb="供应商管理与自动对账"
        title={["供应商对账，", "让 Agent 先核完，", "你只看结论"]}
        lead={<>合同、工作量、价格，过去要<b>一笔笔翻、一笔笔核</b>。对账周期长、口径不一、条款散落，甲方与物业公司都在这件事上耗人。</>}
        image={{ src: "/insights/obc-impact-1-office.jpg", alt: "双方对着合同与账单逐项核对（场景示意）" }}
      />

      <SolSection title="供应商管理与自动对账" tone="mist"
        sub="我们把对账拆成四件能各自核清、又能拼在一起的事：服务做得好不好、到底干了多少、是否合规、最后该付多少。Agent 把前面几步跑完，每一笔都附上算法和理由，人只需要确认或驳回。">
        <SolCols items={pts} />
        <SolVerdict>把几天一版的对账，变成看一眼就能确认。核完之后直接生成账单草稿，每一笔都说得出理由，付款这一步仍然留给人</SolVerdict>
        <SolMore>这套核量与考评，与 <Link href="/solutions/quality">服务质量管理</Link> 和 <Link href="/solutions/subcontract">服务分包管理</Link> 共用同一份记录。</SolMore>
      </SolSection>

      <SeoFaq
        heading="关于供应商管理与自动对账，你可能想问"
        serviceName="供应商管理与自动对账"
        serviceDesc="Agent 按合同自动核量、对比历史与市场、圈出异常并生成账单草稿。"
        items={[
          { q: "自动对账会不会绕过财务审批？", a: "不会。Agent 只做到账单草稿与异常清单这一步，确认、审批、付款仍然走你现有的财务流程，一步都不少。" },
          { q: "甲方和物业公司都能用吗，站在谁的立场对？", a: "都能用。对账的本质是双方对着同一份事实，甲方用它验账单，物业公司用它提前自检；核算规则来自合同条款，不偏向任何一方。" },
          { q: "历史遗留的糊涂账能梳理吗？", a: "能，但要分步。先把合同条款梳成核算规则、把双方台账归集到一处，存量差异会被逐笔圈出来；历史账怎么了结是商务决定，系统负责把差异摆清楚。" },
        ]}
      />

      <SolEnd title={["把一次真实的供应商对账，", "跑成一眼能确认的结论"]} sub="从你的一个真实业务开始。" />
    </SolPage>
  );
}
