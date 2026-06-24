import type { Metadata } from "next";
import Link from "next/link";
import "./page.css";
import SeoFaq from "@/components/SeoFaq";

export const metadata: Metadata = {
  title: "采购管理 · 智能体解决方案 — 启盟科技",
  description:
    "FMClaw 智能采购:服务设计阶段对物料科学测算自动生成清单,库存低于阈值自动触发采购,对接 1688、京东企业购多平台 AI 比价匹配,审批通过自动下单推送供应商、全程留痕实时追踪到货。",
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const prIco = { fill: "none" as const, stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const IconCalc = () => (<svg viewBox="0 0 24 24" {...prIco}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v3" /></svg>);
const IconBell = () => (<svg viewBox="0 0 24 24" {...prIco}><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10.4 20a1.8 1.8 0 0 0 3.2 0" /></svg>);
const IconScale = () => (<svg viewBox="0 0 24 24" {...prIco}><path d="M12 4v16M6 21h12M7 8h10" /><path d="M7 8l-3 6a3 3 0 0 0 6 0L7 8zM17 8l-3 6a3 3 0 0 0 6 0l-3-6z" /></svg>);
const IconFileCheck = () => (<svg viewBox="0 0 24 24" {...prIco}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9.5 15l1.8 1.8 3.4-3.4" /></svg>);
const IconDesign = () => (<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" /><path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="18" cy="6" r="3" fill="#fff" /></svg>);
const IconOps = () => (<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" fill="currentColor" /><path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const IconCart = () => (<svg viewBox="0 0 24 24" {...prIco}><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /><path d="M3 4h2l2.2 11.2a1 1 0 0 0 1 .8h8.4a1 1 0 0 0 1-.8L20 8H6" /></svg>);

const pains = [
  { no: "01", title: "需求识别低效", body: "物料需求无法提前预判，常出现临时紧急采购。" },
  { no: "02", title: "采购决策不科学", body: "缺乏系统化的供应商比价机制，全凭经验拍板。" },
  { no: "03", title: "流程长、易出错", body: "纸质单据流转效率低、容易出错；采购记录分散，难以追溯和审计。" },
];

const feats = [
  { no: "01", title: "服务设计阶段科学测算", icon: <IconCalc />, body: "项目启动时，用服务设计 Agent 对物料需求做全维度科学测算，自动生成最优物料清单。" },
  { no: "02", title: "智能采购流程自动化", icon: <IconBell />, body: "自动需求识别，当库存低于安全阈值时，自动触发采购需求。" },
  { no: "03", title: "智能比价与供应商匹配", icon: <IconScale />, body: "自动对接 1688、京东企业购等主流平台，AI Agent 检索匹配物料规格，多平台比价，推荐性价比最优方案。" },
  { no: "04", title: "自动化审批与执行", icon: <IconFileCheck />, body: "审批通过后自动生成采购订单、推送至供应商系统，全程留痕，实时追踪订单到货状态。" },
];

const agents = [
  { name: "服务设计 Agent", role: "源头物料测算", icon: <IconDesign />, href: "/solutions/service-design" },
  { name: "运营管理 Agent", role: "实时库存监控、自动触发采购需求", icon: <IconOps />, href: "/solutions/operations" },
  { name: "采购管理 Agent", role: "智能比价、供应商匹配", icon: <IconCart />, href: undefined },
];

const challenges = [
  { title: "组织架构调整", body: "传统采购岗位的职能需要重新定义。" },
  { title: "人员接受度", body: "一线人员需要适应自动化的新流程。" },
];

export default function Page() {
  return (
    <main className="solpro">
      {/* HERO */}
      <section className="pr-hero">
        <div className="pr-grid" aria-hidden="true" />
        <div className="wrap pr-hero-top">
          <span className="pr-kicker">
            <Link href="/agents">智能体解决方案</Link>
            <i>/</i>采购管理
          </span>
          <h1 className="pr-h1">
            从测算到下单，<br /><span className="grad">采购自动跑完</span>
          </h1>
          <p className="pr-lead">
            物料需求难预判、比价不科学、审批流转慢又易错。FMClaw 让采购<b>从源头测算一路跑到自动下单</b>。
          </p>
          <div className="pr-cta">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow /></Link>
            <a href="#caps" className="btn btn-ghost">看四个能力 <Arrow /></a>
          </div>
          <div className="pr-proof">
            <span>源头<b>科学测算</b></span>
            <span className="sep" />
            <span>多平台<b>自动比价</b></span>
            <span className="sep" />
            <span>审批执行<b className="grad">自动化</b></span>
          </div>
        </div>
      </section>

      {/* 它解决什么:过去三个痛点 */}
      <section className="pr-band mist">
        <div className="wrap">
          <span className="pr-eyebrow">它解决什么</span>
          <h2 className="pr-h2">采购的三个老问题</h2>
          <p className="pr-sub">需求拍脑袋、比价凭经验、单据满天飞——这是物业采购最常见的三处卡点。</p>
          <div className="pr-pains">
            {pains.map((p) => (
              <div className="pr-pain" key={p.no}>
                <span className="pr-pain-x" aria-hidden="true">✕</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 四个能力 · 暗场签名段 */}
      <section className="pr-core" id="caps">
        <div className="pr-grid dark" aria-hidden="true" />
        <div className="wrap">
          <span className="pr-eyebrow on-dark">FMClaw 智能采购</span>
          <h2 className="pr-h2 on-dark">从科学测算，到自动下单</h2>
          <p className="pr-sub on-dark">从源头把需求算对，到自动比价、自动审批执行，整条采购链路连续跑通。</p>
          <div className="pr-feats">
            {feats.map((f) => (
              <div className="pr-feat" key={f.no} data-end={f.no === "04"}>
                <div className="pr-feat-h">
                  <span className="pr-fic">{f.icon}</span>
                  <span className="pr-fno grad">{f.no}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <p className="pr-verdict">从源头测算到下单，全程留痕、<span className="grad">实时可追踪</span></p>
        </div>
      </section>

      {/* 依赖产品 + 数据集成 */}
      <section className="pr-band">
        <div className="wrap">
          <span className="pr-eyebrow">依赖产品</span>
          <h2 className="pr-h2">背后是三个 Agent 协作</h2>
          <div className="pr-agents">
            {agents.map((a) => {
              const inner = (
                <>
                  <div className="pr-agent-h"><span className="pr-aic">{a.icon}</span>{a.name}</div>
                  <p>{a.role}</p>
                  {a.href && <span className="pr-agent-link">了解 {a.name} <Arrow s={13} /></span>}
                </>
              );
              return a.href ? (
                <Link className="pr-agent" href={a.href} key={a.name}>{inner}</Link>
              ) : (
                <div className="pr-agent" key={a.name}>{inner}</div>
              );
            })}
          </div>

          <div className="pr-srcnote">
            <div className="pr-srcnote-h">
              <h3>数据集成</h3>
              <p>对接 1688、京东企业购等采购平台 API，AI 自动检索、比价、下单。</p>
            </div>
            <div className="pr-src-chips">
              <span className="pr-src">1688</span>
              <span className="pr-src">京东企业购</span>
            </div>
          </div>
        </div>
      </section>

      {/* 落地挑战 */}
      <section className="pr-band mist">
        <div className="wrap">
          <span className="pr-eyebrow">落地前先说清楚</span>
          <h2 className="pr-h2">它会动到采购岗和现有习惯</h2>
          <p className="pr-sub">采购自动化不止是上系统，落地要面对两件事——把话放在前面。</p>
          <div className="pr-challenges">
            {challenges.map((c) => (
              <div className="pr-challenge" key={c.title}>
                <span className="pr-challenge-k" />
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoFaq
        heading="采购管理,你可能想问"
        serviceName="采购管理"
        serviceDesc="用智能体把物业采购的申请、比价、审批、台账串起来。"
        items={[
          { q: "物业采购管理的痛点是什么?", a: "需求分散、比价与审批链路长、台账不清。用智能体把申请、比价、审批、台账串起来,可提速并全程留痕。" },
          { q: "AI 能帮物业采购做什么?", a: "自动归集需求、辅助比价与合规校验、跟踪审批进度,并把采购数据沉淀为可分析的台账。" },
          { q: "采购能和成本优化联动吗?", a: "可以。采购数据与成本、供应商考核打通后,能从源头控制成本,而不只是事后报销审核。" },
        ]}
      />

      {/* CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一次真实的采购，<br />从测算跑到下单</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
