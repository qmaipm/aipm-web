// app/(site)/cases/_CaseShell.tsx
import Link from "next/link";
import "./article.css";
import JsonLd from "@/components/JsonLd";
import { getCase, getRelated } from "./cases";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function CaseWins({ items }: { items: string[] }) {
  return (
    <div className="cf-wins">
      {items.map((t) => <div className="cf-win" key={t}>{t}</div>)}
    </div>
  );
}

/* 可扫读要点:每条一句话,首段加粗为「要点」,其后为一句补充说明(可选) */
export function CasePoints({ items }: { items: { k: string; d?: string }[] }) {
  return (
    <ul className="cf-points">
      {items.map((it) => (
        <li className="cf-point" key={it.k}>
          <span className="cf-point-k">{it.k}</span>
          {it.d ? <span className="cf-point-d">{it.d}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/* 实现流程:真实有序的管道,用编号站点表达"一条报事走完的每一步" */
export function CaseFlow({ steps }: { steps: { k: string; d: string }[] }) {
  return (
    <ol className="cf-flow">
      {steps.map((s, i) => (
        <li className="cf-step" key={s.k}>
          <div className="cf-step-n" aria-hidden="true"><span>{String(i + 1).padStart(2, "0")}</span></div>
          <div className="cf-step-k">{s.k}</div>
          <p className="cf-step-d">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

/* 适用性判断 —— 每篇案例的最后一节,必须有(cases-lint 强制)。
   读者读完「结果」的下一秒,想的是「这个在我这儿成立吗」。这个疑问必须在
   案例页当场被回答,不能只放在列表页 FAQ 里。

   三条硬规矩:
   1. unfit 不可为空。敢写「什么情况下这条路径不成立」,可信度才高于一份战报;
      11 篇全胜、零摩擦的案例集,读者默认折价一半来读。
   2. unfit 写的必须是真实前置条件(口径没统一、外包合同没约定数据交付、
      团队不接受核验……),不是「规模太小不适合」这种敷衍。
   3. cost 是**投入侧的事实**,只写案例里确有其事的部分:不换平台、沿用团队、
      在原预算内启动、无需二次开发。降低读者的成本比抬高我们的成绩更能促成联系。
      没有事实就不写,绝不为了版式凑第三条。 */
export function CaseFit({
  fit,
  unfit,
  cost,
}: {
  fit: string[];
  unfit: string[];
  cost?: { k: string; d: string }[];
}) {
  // 固定 mist:它位于「结果」与「相关案例」之间,是斑马条纹的一环。
  // 因此 11 篇的「结果」一节必须走白底,不要再加 mist(否则两段 mist 相连)。
  return (
    <section className="cf-band mist">
      <div className="wrap cf-sec">
        <div className="cf-sec-head">
          <span className="cf-eyebrow">适用性</span>
          {/* 标题控制在 12 字内:.cf-h2 是 24ch 限宽,再长会把末尾两字甩到第二行成孤字。 */}
          <h2 className="cf-h2">适合谁，什么情况下不适合</h2>
        </div>
        <div className="cf-sec-body">
          <div className="cf-fit">
            <div className="cf-fit-col yes">
              <div className="cf-fit-h"><i aria-hidden="true" />可以照这条路径走</div>
              <ul>{fit.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="cf-fit-col no">
              <div className="cf-fit-h"><i aria-hidden="true" />这些情况先别急着上</div>
              <ul>{unfit.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
          {cost?.length ? (
            <div className="cf-cost-wrap">
              <div className="cf-cost-h">接入方式</div>
              <dl className="cf-cost">
                {cost.map((c) => (
                  <div className="cf-cost-item" key={c.k}>
                    <dt>{c.k}</dt>
                    <dd>{c.d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* 侧注:政策依据、合规声明、口径说明——从叙事里拿出来单独放,不再当插入语 */
export function CaseNote({ children }: { children: React.ReactNode }) {
  return <div className="cf-note">{children}</div>;
}

export function CaseSection({ eyebrow, title, mist, children }: { eyebrow?: string; title: string; mist?: boolean; children: React.ReactNode }) {
  return (
    <section className={`cf-band${mist ? " mist" : ""}`}>
      <div className="wrap cf-sec">
        <div className="cf-sec-head">
          {eyebrow ? <span className="cf-eyebrow">{eyebrow}</span> : null}
          <h2 className="cf-h2">{title}</h2>
        </div>
        <div className="cf-sec-body">{children}</div>
      </div>
    </section>
  );
}

/* 结果一览:接入前 / 接入后 两列。
   只在**两侧都有真实数字或真实事实**时使用;凑不出对照就不要为了版式造表。

   两种行会自动区分排版(2026-07-25 视觉复验发现的问题):
   - 数字行(如「24%」→「95%」):大号数字右对齐,一眼可比。
   - 文字行(如「写在文件里」→「系统里可核对的计划与次数」):正文号左对齐。
     短句用数字号右对齐时,窄屏会被挤成一字一行,完全读不了。 */
const isMetric = (s: string) => s.length <= 12 && /\d/.test(s);

export function CaseCompare({
  label = "关键指标",
  head = ["接入前", "接入后"],
  rows,
}: {
  label?: string;
  head?: [string, string];
  rows: { k: string; before: string; after: string }[];
}) {
  // 列宽必须整张表统一(含表头),否则数字行与文字行混排时列对不齐。
  // 只要有一行是文字,整张表就走文字列宽。
  const hasProse = rows.some((r) => !isMetric(r.before) || !isMetric(r.after));
  return (
    <div className={`cf-cmp${hasProse ? " has-prose" : ""}`} role="table"
         aria-label={`${head[0]}与${head[1]}对比`}>
      <div className="cf-cmp-row cf-cmp-head" role="row">
        <div className="cf-cmp-lab" role="columnheader">{label}</div>
        <div className="cf-cmp-trad" role="columnheader">{head[0]}</div>
        <div className="cf-cmp-aipm" role="columnheader">{head[1]}</div>
      </div>
      {rows.map((r) => {
        // 一行里只要有一侧是文字,整行就走文字排版,否则两列对不齐。
        const prose = !isMetric(r.before) || !isMetric(r.after);
        return (
          <div className={`cf-cmp-row${prose ? " cf-cmp-txt" : ""}`} role="row" key={r.k}>
            <div className="cf-cmp-lab" role="rowheader">{r.k}</div>
            {/* data-h:文字行在窄屏会竖排、列头被隐藏,靠它把「接入前 / 接入后」补回每一格 */}
            <div className="cf-cmp-trad" role="cell" data-h={head[0]}><b>{r.before}</b></div>
            <div className="cf-cmp-aipm" role="cell" data-h={head[1]}><b>{r.after}</b></div>
          </div>
        );
      })}
    </div>
  );
}

/* 客户原声。scope = 说话人的**可核验职责范围**(团队规模/覆盖范围/服务期),
   用来回答读者的「这个人和我处境一样吗」。不编造年限职级,没有事实就不写。 */
export function CaseQuote({ children, by, scope }: { children: React.ReactNode; by: string; scope?: string }) {
  return (
    <section className="cf-core">
      <div className="cf-grid dark" aria-hidden="true" />
      <div className="wrap">
        <span className="cf-eyebrow on-dark">客户原声</span>
        <p className="cf-voice">{children}</p>
        <div className="cf-voice-by">— {by}</div>
        {scope ? <div className="cf-voice-scope">{scope}</div> : null}
      </div>
    </section>
  );
}

// 案例 → AI 物业服务工种页回链(内链导流:案例页把读者引向对应服务页)
const TRADE_LINKS: Record<string, { href: string; label: string }[]> = {
  "south-china-mixed-use-6-to-1": [
    { href: "/ai-service/facility", label: "AI 设施设备服务" },
    { href: "/cobuild", label: "政企共建人工智能产业" },
  ],
  "30w-park-ai-property-manager-robot": [
    { href: "/ai-service/cleaning", label: "AI 清洁服务" },
    { href: "/cobuild", label: "政企共建人工智能产业" },
  ],
  "property-group-chat-ai-service": [
    { href: "/ai-service/customer-service", label: "AI 客服管家" },
    { href: "/products/fmclaw/connectors", label: "第三方平台连接器" },
  ],
  "property-group-auto-operation-report": [
    { href: "/products/fmclaw/ontology", label: "FM 数据本体" },
    { href: "/products/fmclaw/connectors", label: "第三方平台连接器" },
  ],
  "coworking-supplier-reconciliation": [{ href: "/ai-service/cleaning", label: "AI 清洁服务" }],
  "restroom-quality": [{ href: "/ai-service/cleaning", label: "AI 清洁服务" }],
  "fmclaw-equipment-inspection": [{ href: "/ai-service/facility", label: "AI 设施设备服务" }],
  "intl-hospital-medical-grade-fm": [
    { href: "/ai-service/facility", label: "AI 设施设备服务" },
    { href: "/ai-service/cleaning", label: "AI 清洁服务" },
  ],
  "metro-3400-rooms-daily-inspection": [{ href: "/ai-service/facility", label: "AI 设施设备服务" }],
  "hazardous-area-dual-person-patrol": [{ href: "/ai-service/security", label: "AI 安保服务" }],
  "gigafactory-4-vendor-cleaning": [{ href: "/ai-service/cleaning", label: "AI 清洁服务" }],
};

export default function CaseShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const c = getCase(slug);
  const related = getRelated(slug, 3);
  const trades = TRADE_LINKS[slug] || [];
  const pageUrl = `${SITE_URL}/cases/${c.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.seoTitle,
    description: c.metaDescription,
    inLanguage: "zh-CN",
    author: { "@type": "Organization", name: "启盟科技" },
    publisher: {
      "@type": "Organization",
      name: "广州启盟信息科技有限公司",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-stalliance-clean.png` },
    },
    mainEntityOfPage: pageUrl,
    articleSection: c.industry,
    datePublished: c.datePublished,
    dateModified: c.dateModified,
  };
  const faqLd = c.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main className="casefx">
      <JsonLd data={faqLd ? [articleLd, faqLd] : articleLd} />

      {/* HERO */}
      <section className="cf-hero">
        <div className="cf-grid" aria-hidden="true" />
        <div className="wrap cf-hero-top">
          <span className="cf-crumb">
            <Link href="/cases">客户案例</Link><i>/</i>{c.theme}
          </span>
          {/* 档案栏:行业 / 规模 / 地区 各自成 chip,读者可以按维度对号入座,
              而不是读一行灰色小字注释。 */}
          <dl className="cf-facts">
            {[
              { k: "行业", v: c.industry },
              { k: "规模", v: c.scale },
              { k: "地区", v: c.location },
            ].map((f) => (
              <div className="cf-fact" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <h1 className="cf-h1">{c.title}</h1>
          <p className="cf-lead">{c.summary ?? c.lead}</p>
          <div className="cf-metrics">
            {c.metrics.map((m) => (
              <div className="cf-metric" key={m.label}>
                <b>{m.value}</b><span>{m.label}</span>
              </div>
            ))}
          </div>
          <dl className="cf-facts cf-facts-2">
            <div className="cf-fact">
              <dt>采用产品</dt>
              <dd>{c.product}</dd>
            </div>
            <div className="cf-fact">
              <dt>发布 / 更新</dt>
              <dd>{c.datePublished} / {c.dateModified}</dd>
            </div>
          </dl>
        </div>
      </section>

      {children}

      {/* 相关案例 — 排在 FAQ 之前:读完结果的人下一步想看的是「还有谁这么干」,
          而不是补充问答。FAQPage schema 不受渲染顺序影响。
          底色接在「结果」(mist)之后,所以这里走白底,保持斑马条纹不断。 */}
      <section className="cf-band">
        <div className="wrap">
          <span className="cf-eyebrow">相关案例</span>
          <h2 className="cf-h2">再看几个在运行的项目</h2>
          <div className="cf-related">
            {related.map((r) => (
              <Link className="cf-rcard" href={`/cases/${r.slug}`} key={r.slug}>
                <div className="rmeta">{r.industry} · {r.scale} · {r.location}</div>
                <h3>{r.title}</h3>
                <p>{r.lead}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {c.faq?.length ? (
        <section className="cf-band mist">
          <div className="wrap cf-sec">
            <div className="cf-sec-head">
              <span className="cf-eyebrow">常见问题</span>
              <h2 className="cf-h2">关于这个案例，常被问到的</h2>
            </div>
            <div className="cf-faq-list cf-sec-body">
              {c.faq.map((f) => (
                <details className="cf-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p className="cf-faq-a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA — 两扇门,轻重分明。
          加速营是重承诺(要带真实业务、要投入时间),但读完一篇案例的人多数还在
          内部说服阶段,不想被销售跟进。只留一扇重门,等于把「有点想聊」的人挡在外面。
          所以并排给一个轻入口(直接留问题 / 电话 / 邮件),让意愿有落点。 */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带你的难题来，<br />带一个 Agent 走</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <div className="cta-btns">
              <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 <Arrow s={16} /></Link>
              <Link href="/contact" className="btn btn-ghost">先问一个问题</Link>
            </div>
            <span className="alt">
              还没到预约那一步？把你的场景写下来，我们会认真读、尽快回，也可以直接打{" "}
              <a href="tel:02089853580">020-89853580</a>。
            </span>
            {trades.length > 0 && (
              <span className="alt">
                或看对应的服务:
                {trades.map((t, i) => (
                  <span key={t.href}>
                    {i > 0 && " · "}
                    <Link href={t.href}>{t.label}</Link>
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
