import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import { pageMetadata } from "@/lib/pageMetadata";
import SeoFaq from "@/components/SeoFaq";

export const metadata: Metadata = pageMetadata("/solutions/vendor", {
  title: "供应商管理与自动对账 · 智能体解决方案 | 启盟科技",
  description:
    "对账周期长、口径不一、合同条款散落,甲方与物业公司都在这件事上耗人。我们让 Agent 按合同自动核量、对比历史与市场、圈出异常并生成账单草稿,付款这一步留给人。",
});

export default function VendorPage() {
  return (
    <main className="solx">
      {/* HERO */}
      <section className="sx-hero">
        <div className="sx-grid" aria-hidden="true" />
        <span className="sx-glow" aria-hidden="true" />
        <div className="wrap">
          <div className="sx-crumb reveal"><Link href="/agents">智能体解决方案</Link> / 供应商管理与自动对账</div>
          <span className="sx-eyebrow reveal">智能体解决方案</span>
          <h1 className="sx-h1 reveal">供应商对账，让 Agent 先核完，你只看结论</h1>
        </div>
      </section>

      {/* 正文 */}
      <section className="sx-band alt">
        <div className="wrap">
          <span className="sx-eyebrow reveal">供应商管理与自动对账</span>
          <p className="sx-lead reveal">合同、工作量、价格，过去要<span className="em">一笔笔翻、一笔笔核</span>。对账周期长、口径不一、条款散落，甲方与物业公司都在这件事上耗人。</p>

          <div className="sx-body reveal">
            <p>我们把对账拆成四件能各自核清、又能拼在一起的事——服务做得好不好、到底干了多少、是否合规、最后该付多少。Agent 把前面几步跑完，每一笔都附上算法和理由，人只需要确认或驳回。</p>
          </div>

          <div className="sx-grid3">
            <div className="sx-pt reveal">
              <div className="top"><span className="n">01 质量</span>
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.4 5 5.5.6-4.1 3.7 1.2 5.4L12 20.3 6.9 17.7l1.2-5.4L4 8.6 9.5 8 12 3Z" /></svg>
              </div>
              <div className="lab">质量考评</div>
              <p>服务做得好不好，按统一标准给出评价，作为该不该付的第一个依据，而不是凭印象。</p>
            </div>
            <div className="sx-pt reveal">
              <div className="top"><span className="n">02 工作量</span>
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5M4 19h16" /><rect x="7" y="11" width="3" height="5" /><rect x="12" y="8" width="3" height="8" /><rect x="17" y="13" width="3" height="3" /></svg>
              </div>
              <div className="lab">工作量考评</div>
              <p>到底干了多少，按记录与口径自动核出来，不靠人估，对比历史与市场圈出偏差。</p>
            </div>
            <div className="sx-pt reveal">
              <div className="top"><span className="n">03 合同</span>
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M9.5 13l1.6 1.6 3.4-3.6" /></svg>
              </div>
              <div className="lab">合同约束校验</div>
              <p>对照合同条款逐项校验，单价、范围、上限是否相符，异常一眼看清，付与不付都有据。</p>
            </div>
          </div>

          <p className="sx-emph reveal">把几天一版的对账，变成看一眼就能确认——核完之后直接生成账单草稿，每一笔都说得出理由，付款这一步仍然留给人</p>
          <p className="sx-link reveal">这套核量与考评，与 <Link href="/solutions/quality">服务质量管理</Link> 和 <Link href="/solutions/subcontract">服务分包管理</Link> 共用同一份记录。</p>
        </div>
      </section>

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

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的供应商对账，跑成一眼能确认的结论</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
