import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/pageMetadata";
import { FmBreadcrumb, FmFaq, techArticleLd, Arrow, IC, LinkCards } from "../_shared";
import "../capability.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata("/products/fmclaw/agent-runtime", {
  title: "控制台(Console)｜FMClaw™ 智能体安全、权限与审计",
  description:
    "控制台(Console)是 FMClaw 管理智能体身份、权限、运行和记录的地方。智能体像员工一样有岗位和权限边界,高风险动作先经人批准,每一步都有记录——智能体治理、AI 权限管理与审计日志,在这里统一完成。",
});

const TECH_LD = techArticleLd({
  path: "/products/fmclaw/agent-runtime",
  headline: "控制台(Console):智能体身份、权限、运行和记录的管理",
  description:
    "控制台是 FMClaw 管理智能体身份、权限、运行和记录的地方。企业敢让智能体进核心业务,是因为运行是受控的:有身份、有边界、能接管、能查证。",
});

const FAQ = [
  {
    q: "智能体出了错,谁负责?",
    a: "人负责。每个智能体有明确的归属和上级;影响到人和钱的动作先经人批准才执行,批准人是谁有记录。责任始终落在具体的人身上。",
  },
  {
    q: "怎么防止智能体越权?",
    a: "智能体像员工一样管理:有身份、有岗位、有权限边界。权限按总部、区域、项目、岗位分层,它只能看到和做它岗位范围内的事。岗位变了,权限跟着变。",
  },
  {
    q: "出了问题,能查到是哪一步吗?",
    a: "能。每项任务从发起到结束都有记录:谁发起、读了什么数据、调了哪个工具、谁批准、结果如何。复核时逐步核对,定位到具体一步。",
  },
  {
    q: "项目之间的数据会串吗?",
    a: "不会。数据按项目隔离,跨项目访问需要明确授权。同一条工作流跑在多个项目,数据各归各的,口径是同一套。",
  },
  {
    q: "人可以随时叫停智能体吗?",
    a: "可以。管理者随时查看、暂停、驳回或接管任何任务;收回授权即刻生效,已有记录保留。",
  },
];

const ArrowD = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Page() {
  return (
    <main className="fmc">
      <JsonLd data={TECH_LD} />

      {/* ===== HERO(真人摄影底图 · 暗场,规格同 workshop ws-hero) ===== */}
      <header className="fmc-phero">
        <span className="fmc-phero-bg" aria-hidden="true" />
        <div className="fmc-grid" aria-hidden="true" />
        <div className="wrap">
          <FmBreadcrumb
            onDark
            trail={[
              { name: "FMClaw™ 产品总览", href: "/products/fmclaw" },
              { name: "控制台", href: "/products/fmclaw/agent-runtime" },
            ]}
          />
          <h1>
            智能体在干活,<span className="grad">你看得见、管得住</span>
          </h1>
          <p className="fmc-plead">
            每个智能体是谁、在哪个项目、干了什么、谁批准的——都在控制台。
            <b>敢把业务交给智能体,是因为随时能接管。</b>
          </p>
          <div className="fmc-pcta">
            <a href="#govern" className="btn btn-primary">看怎么管住它 <ArrowD /></a>
            <Link href="/cases/coworking-supplier-reconciliation" className="btn btn-ghost">看真实案例 <Arrow /></Link>
          </div>
          <div className="fmc-proof">
            <span><b>有身份、有边界</b></span>
            <span className="sep" />
            <span>500 个项目<b>同一张面板</b></span>
            <span className="sep" />
            <span><b className="grad">每一步都有记录</b></span>
          </div>
        </div>
      </header>

      {/* ===== 01 定义 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">01</p>
          <h2>控制台是什么?</h2>
          <div className="fmc-defbox">
            <p className="fmc-deflab">DEFINITION</p>
            <p>
              控制台,是 FMClaw 管理智能体身份、权限、运行和记录的地方。
            </p>
          </div>
          <p className="fmc-p" style={{ marginTop: 18 }}>
            企业敢让智能体进核心业务,不是因为它足够聪明,而是因为运行是受控的:
            有身份、有边界、能接管、能查证。
          </p>
        </div>
      </section>

      {/* ===== 02 身份与权限(真人照片图文行) ===== */}
      <section className="fmc-sec mist" id="govern">
        <div className="wrap">
          <p className="fmc-num">02</p>
          <h2>智能体像员工一样管理</h2>
          <div className="fmo-lrows">
            <div className="fmo-lrow">
              <span className="fmo-limg">
                <img
                  src="/products/fmclaw/console-identity.jpg"
                  alt="管理者与工程师在屏幕前查看智能体的组织归属与权限结构"
                  width={1800}
                  height={1005}
                  loading="lazy"
                />
              </span>
              <div className="fmo-lbody">
                <h3>有身份、有岗位、有边界</h3>
                <p className="fmo-ldesc">
                  每个智能体归属明确的组织和岗位,不匿名。它只能看到和做岗位范围内的事——
                  权限按总部、区域、项目、岗位分层,岗位变了,权限跟着变。
                </p>
                <ul className="fmo-lsub">
                  <li><b>归属</b>属于哪个组织、哪个项目、向谁汇报。</li>
                  <li><b>可见范围</b>项目经理的智能体看自己的项目,区域的看区域。</li>
                  <li><b>可做的事</b>能用哪些工具、能执行哪些动作,接入时定好。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 03 运行状态 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">03</p>
          <h2>在跑什么、卡在哪,一眼看全</h2>
          <p className="fmc-p">
            哪些任务在跑、哪个项目异常、哪一步在等人确认——运行状态集中在一处,
            不用逐个项目去问。同一条工作流跑在 500 个项目,看到的是同一张面板、同一套口径。
          </p>
          <p className="fmo-verdict">
            规模上去了,管理的方式不变。
          </p>
        </div>
      </section>

      {/* ===== 04 暗场:出了事,三件事 ===== */}
      <section className="fmc-sec dark">
        <div className="wrap">
          <p className="fmc-num">04</p>
          <h2>出了事,你能做三件事</h2>
          <div className="fmo-howgrid">
            <div className="fmo-howside">
              <p className="fmo-howcase">
                智能体接手的是日常工作,<b>决定权留在人手里</b>。
                该问人的动作先问人;不该它做的,它做不了。
              </p>
              <p className="fmo-hownote">
                供应商付款就是这样运行的:智能体核量、比对、找异常、起草账单,
                付款决定由负责人作出——见<Link className="fmc-ln" href="/cases/coworking-supplier-reconciliation">供应商对账案例</Link>。
              </p>
            </div>
            <div className="fmo-tiers">
              <div className="fmo-tier human">
                <span className="fmo-tier-tag">随时接管</span>
                <p>任何任务,管理者随时<b>查看、暂停、驳回或接管</b>。不需要等它跑完。</p>
                <span className="ex">例:发现派工不对,暂停任务,人工改派后继续。</span>
              </div>
              <div className="fmo-tier">
                <span className="fmo-tier-tag">查到那一步</span>
                <p>每项任务从发起到结束都有记录:<b>谁发起、读了什么、调了哪个工具、谁批准、结果如何</b>。</p>
                <span className="ex">例:一笔退费有疑问,逐步核对,定位到具体哪一步。</span>
              </div>
              <div className="fmo-tier">
                <span className="fmo-tier-tag">立即收权</span>
                <p>收回授权<b>即刻生效</b>,智能体当场失去对应的工具和数据。已有记录保留。</p>
                <span className="ex">例:某项目更换服务团队,原有智能体权限当天收回。</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 三项基本保证 ===== */}
      <section className="fmc-sec mist">
        <div className="wrap">
          <p className="fmc-num">05</p>
          <h2>准确、一致、可追溯</h2>
          <p className="fmc-p">这是 FMClaw 对生产运行的三项基本保证。</p>
          <div className="fmc-cols3">
            <div className="fmc-cell">
              <span className="fmc-cell-en">ACCURATE</span>
              <h3>准确</h3>
              <p>关键指标和业务结果,可以复核。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">CONSISTENT</span>
              <h3>一致</h3>
              <p>跨项目、跨时间,同一套管理口径。</p>
            </div>
            <div className="fmc-cell">
              <span className="fmc-cell-en">TRACEABLE</span>
              <h3>可追溯</h3>
              <p>每一次读取、判断、执行和确认,都有记录。</p>
            </div>
          </div>
        </div>
      </section>

      <FmFaq items={FAQ} />

      {/* ===== 继续了解 ===== */}
      <section className="fmc-sec">
        <div className="wrap">
          <p className="fmc-num">KEEP EXPLORING</p>
          <h2>被管住的,是干活的能力</h2>
          <p className="fmc-p">
            工作流引擎组织工作,工具箱供给动作,控制台保证两者受控。
          </p>
          <LinkCards items={[
            { href: "/products/fmclaw/workflow-engine", lab: "平台能力 · L2", t: "工作流引擎", d: "把管理流程,交给智能体运行。", icon: IC.flow },
            { href: "/products/fmclaw/connectors", lab: "平台能力 · L3", t: "工具箱", d: "智能体要用的软件,都接在工具箱里。", icon: IC.grid },
          ]} />
          <p className="fmc-rel-back">
            <Link href="/products/fmclaw">← 返回 FMClaw™ 产品总览</Link>
          </p>
        </div>
      </section>

      <div className="fmo-upd">
        <div className="wrap">
          <p className="fmc-updated">最后更新:2026-07-20</p>
        </div>
      </div>

      {/* ===== 收束 CTA ===== */}
      <section className="endcta">
        <div className="wrap">
          <h2>让智能体进核心业务之前,先看看它怎么被管</h2>
          <p>从一个真实业务开始验证。</p>
          <div className="cta-row">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
            <p className="alt">或先看看<Link href="/cases">已经在生产中运行的案例</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}
