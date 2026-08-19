import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import "./page.css";
import ProgramForms from "./ProgramForms";
import {
  VERSION, UPDATED, heroFacts, paths, split, tiers, flowExample,
  fdeSteps, firstSteps, protections, supports, applySteps, faqs,
} from "./content";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

export const metadata: Metadata = {
  title: "行业智能体伙伴计划 · 销售、交付与产品集成 | 启盟科技",
  description:
    "面向系统集成商、建筑智能化企业、物业科技与软件公司。通过Refer、Sell、Deliver、Build四种路径参与FMClaw™行业智能体项目；免费申请，提供商机报备保护、首单联合交付和FMClaw™ FDE能力认证。",
  keywords:
    "AI智能体伙伴计划,行业智能体合作伙伴,AI智能体代理,智能体交付伙伴,FMClaw合作伙伴,FMClaw FDE,建筑智能化AI,物业AI合作,AI系统集成",
  alternates: { canonical: "/partners/program" },
  openGraph: {
    title: "行业智能体伙伴计划 · 销售、交付与产品集成 | 启盟科技",
    description:
      "通过Refer、Sell、Deliver、Build四种路径参与FMClaw™行业智能体项目；免费申请，提供商机报备保护、首单联合交付和FMClaw™ FDE能力认证。",
    url: `${SITE_URL}/partners/program`,
    type: "website",
  },
};

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- 结构化数据：WebPage + BreadcrumbList + FAQPage ---------- */
const WEBPAGE_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "启盟行业智能体伙伴计划",
  description:
    "面向系统集成商、建筑智能化企业、物业科技与软件公司的伙伴计划：Refer、Sell、Deliver、Build四种合作路径，公开伙伴等级、生产项目和FMClaw™ FDE基础标准。",
  url: `${SITE_URL}/partners/program`,
  inLanguage: "zh-CN",
  isPartOf: { "@type": "WebSite", name: "启盟科技", url: SITE_URL },
  about: {
    "@type": "Thing",
    name: "FMClaw™ 行业智能体伙伴合作",
  },
  dateModified: UPDATED,
};
const BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "生态伙伴", item: `${SITE_URL}/partners` },
    { "@type": "ListItem", position: 3, name: "行业智能体伙伴计划", item: `${SITE_URL}/partners/program` },
  ],
};
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <main className="solpg">
      <JsonLd data={[WEBPAGE_LD, BREADCRUMB_LD, FAQ_LD]} />

      {/* 模块1 · 首屏 */}
      <section className="pg-hero">
        <div className="pg-grid" aria-hidden="true" />
        <div className="wrap pg-hero-cols">
          <div className="pg-hero-txt">
            <span className="pg-kicker">
              <Link href="/">启盟科技</Link>
              <i>/</i>
              <Link href="/partners">生态伙伴</Link>
              <i>/</i>启盟行业智能体伙伴计划
            </span>
            <h1 className="pg-h1">与启盟共同构建、销售<br />和交付行业智能体</h1>
            <p className="pg-lead">
              面向系统集成商、建筑智能化企业、物业科技公司和行业软件企业。启盟提供<Link href="/products/fmclaw">FMClaw™ 平台</Link>、产品方法和技术支持；伙伴提供客户关系、行业经验、本地交付或产品研发能力。
            </p>
            <div className="pg-cta">
              <Link href="/contact?type=partner&source=partner-program" className="btn btn-primary">申请成为伙伴 <Arrow /></Link>
              <Link href="/contact?type=partner-guide&source=partner-program" className="btn btn-ghost">获取伙伴计划手册1.0 <Arrow /></Link>
            </div>
            <ul className="pg-facts">
              {heroFacts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="pg-hero-art">
            <Image
              src="/images/partners/program.png"
              alt="FMClaw 平台连接伙伴与行业客户的合作网络插画"
              width={600}
              height={448}
              priority
              sizes="(max-width: 960px) 92vw, 480px"
            />
          </div>
        </div>
      </section>

      {/* 模块2 · 合作路径 */}
      <section className="pg-band mist" id="paths">
        <div className="wrap">
          <span className="pg-eyebrow">合作路径</span>
          <h2 className="pg-h2">四种路径，按你的能力参与</h2>
          <p className="pg-sub">
            同一家企业可以申请一种或多种合作路径。合作路径说明伙伴参与什么；伙伴等级说明伙伴已经证明了什么。
          </p>
          <div className="pg-paths">
            {paths.map((p) => (
              <div className="pg-path" key={p.en}>
                <div className="pg-path-head">
                  <span className="pg-path-en">{p.en}</span>
                  <span className="pg-path-zh">{p.zh}</span>
                </div>
                <p className="pg-path-body">{p.body}</p>
                <dl className="pg-path-dl">
                  <div><dt>伙伴主要负责</dt><dd>{p.partner}</dd></div>
                  <div><dt>启盟主要负责</dt><dd>{p.qimeng}</dd></div>
                  <div><dt>收益来源</dt><dd>{p.income}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 模块3 · 合作边界 */}
      <section className="pg-band" id="split">
        <div className="wrap">
          <span className="pg-eyebrow">合作边界</span>
          <h2 className="pg-h2">平台能力由启盟提供，客户价值由双方共同完成</h2>
          <div className="pg-split">
            <div className="pg-split-col qm">
              <h3>{split.qimeng.title}</h3>
              <ul>
                {split.qimeng.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="pg-split-col">
              <h3>{split.partner.title}</h3>
              <ul>
                {split.partner.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="pg-note-box">
            具体项目责任在签约或启动前通过合同、工作说明书或责任边界表确认。首个项目由启盟联合支持；伙伴企业通过独立交付能力评审后，可以在经授权的标准范围内独立交付。
          </p>
        </div>
      </section>

      {/* 模块4 · 伙伴等级 */}
      <section className="pg-band mist" id="tiers">
        <div className="wrap">
          <span className="pg-eyebrow">伙伴等级</span>
          <h2 className="pg-h2">等级依据真实能力，而不是只看销售额</h2>
          <p className="pg-sub">
            伙伴等级依据有效认证人员、生产项目、生产客户和公开案例评定。推荐商机和销售贡献单独记录。
          </p>
          <div className="pg-table-scroll">
            <table className="pg-table">
              <thead>
                <tr>
                  <th scope="col">等级</th>
                  <th scope="col">认证人员</th>
                  <th scope="col">生产项目</th>
                  <th scope="col">生产客户</th>
                  <th scope="col">公开案例</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.en}>
                    <th scope="row">
                      <b>{t.en}</b>
                      <span>{t.zh}</span>
                    </th>
                    <td>{t.staff}</td>
                    <td>{t.projects}</td>
                    <td>{t.customers}</td>
                    <td>{t.cases}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pg-note-box">
            正式伙伴等级每半年评审一次。伙伴申请和Registered注册不受半年评审周期限制。
            <Link href="/contact?type=partner-guide&source=partner-program" className="pg-tlink">获取完整伙伴计划手册 <Arrow s={13} /></Link>
          </p>
        </div>
      </section>

      {/* 模块5 · 生产认定 */}
      <section className="pg-band" id="production">
        <div className="wrap">
          <span className="pg-eyebrow">生产认定</span>
          <h2 className="pg-h2">什么样的项目可以被认定为生产项目？</h2>
          <p className="pg-answer">
            生产项目必须面向真实客户和业务用户，至少包含2条完整的端到端工作流，并通过客户验收或连续稳定运行不少于60日。单纯知识库问答、内部Demo和概念验证不计为生产项目。
          </p>
          <div className="pg-flow" role="img" aria-label="生产项目端到端工作流示例：设备告警、智能体判断、生成工单、指派人员、维修反馈、验收关闭">
            {flowExample.map((f, i) => (
              <span className="pg-flow-node" key={f}>
                {f}
                {i < flowExample.length - 1 && <Arrow s={14} />}
              </span>
            ))}
          </div>
          <p className="pg-fine">同一客户、同一合同下的多条工作流，原则上计为一个生产项目。</p>
        </div>
      </section>

      {/* 模块6 · FMClaw™ FDE */}
      <section className="pg-band mist" id="fde">
        <div className="wrap">
          <span className="pg-eyebrow">交付能力</span>
          <h2 className="pg-h2">从个人FDE认证到企业独立交付</h2>
          <p className="pg-sub">
            FMClaw™ FDE（启盟现场部署工程师）是面向个人的交付能力认证，负责将客户业务需求转化为可以在生产环境中稳定运行的智能体工作流。
          </p>
          <div className="pg-fde-steps">
            {fdeSteps.map((s) => (
              <div className="pg-fde-step" key={s.no}>
                <span className="pg-step-no">{s.no}</span>
                <h3>{s.title}</h3>
              </div>
            ))}
          </div>
          <p className="pg-answer sm">
            FMClaw™ FDE不能只通过理论考试获得。个人完成培训、参与至少1个生产项目，并通过工作流实操和项目评审后，可以取得FMClaw™ FDE资格。该生产项目应至少包含2条完整的端到端工作流，并通过客户验收或连续稳定运行不少于60日。
          </p>
          <div className="pg-ent-qual">
            <h3 className="pg-h3">企业独立交付资格</h3>
            <p>
              FMClaw™ FDE是个人认证，企业独立交付资格需要单独评审。伙伴企业原则上应至少拥有2名有效技术认证人员，其中至少1名取得FMClaw™ FDE资格，并完成至少1个符合标准的生产项目。最终授权范围以启盟的企业级交付能力评审结果为准。
            </p>
          </div>
          <div className="pg-fde-states">
            <div className="pg-fde-state">
              <h3>未取得企业独立交付资格</h3>
              <p>伙伴可以与最终客户签署合同，但涉及FMClaw™的实施范围需要经过启盟评审，并采用联合交付方式。</p>
            </div>
            <div className="pg-fde-state ok">
              <h3>已取得企业独立交付资格</h3>
              <p>伙伴可以在经授权的标准范围内独立签署和交付FMClaw™项目，并对自身合同、实施、验收和服务范围负责。复杂项目、非标准定制和私有化项目仍需单独评审。</p>
            </div>
          </div>
          <div className="pg-tech-cta">
            <Link href="/insights/what-is-fde" className="btn btn-ghost">了解FMClaw™ FDE能力标准 <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 模块7 · 首单联合交付 */}
      <section className="pg-band" id="first">
        <div className="wrap">
          <span className="pg-eyebrow">首个项目</span>
          <h2 className="pg-h2">第一个项目，不要求伙伴独自完成</h2>
          <p className="pg-sub">
            对符合条件的首个生产项目，启盟提供需求判断、架构评审、实施答疑、上线检查和项目复盘。伙伴需要安排人员全过程参与，逐步建立自身交付能力。
          </p>
          <div className="pg-first-steps">
            {firstSteps.map((s, i) => (
              <div className="pg-first-step" key={s}>
                <span className="pg-step-no">{i + 1}</span>
                <h3>{s}</h3>
              </div>
            ))}
          </div>
          <p className="pg-note-box">
            首单支持不包含无限期免费驻场、第三方系统改造、现场施工或未经评估的定制开发。具体支持范围见《启盟行业智能体伙伴计划手册1.0》。
          </p>
        </div>
      </section>

      {/* 模块8 · 商机保护 */}
      <section className="pg-band mist" id="protection">
        <div className="wrap">
          <span className="pg-eyebrow">商机保护</span>
          <h2 className="pg-h2">保护真实推进的项目</h2>
          <p className="pg-sub">
            经确认的商机获得90日初始保护期。保护期内有客户会议、需求调研、方案提交或采购推进的，可以续期一次。经确认的报备商机，在保护期内由报备伙伴主导商务推进。
          </p>
          <div className="pg-protects">
            {protections.map((p, i) => (
              <div className="pg-protect" key={p.title}>
                <span className="pg-pno grad">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <p className="pg-note-box">
            因技术交流或交付需要，启盟可以在伙伴知情的情况下与客户沟通。除客户主动要求、伙伴违规或双方另有约定外，启盟不绕过有效报备伙伴单独推进相同项目的商业签约。
          </p>
        </div>
      </section>

      {/* 模块9 · 伙伴支持 */}
      <section className="pg-band" id="supports">
        <div className="wrap">
          <span className="pg-eyebrow">伙伴支持</span>
          <h2 className="pg-h2">从能力建设到生产交付</h2>
          <div className="pg-supports">
            {supports.map((s) => (
              <div className="pg-support" key={s.title}>
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="pg-note-box">
            区域或行业优先权只面向达到Preferred或以上等级，并满足约定业务和项目质量要求的伙伴。启盟默认采用非独家授权和商机报备保护。
          </p>
        </div>
      </section>

      {/* 模块10 · 加入计划 */}
      <section className="pg-band mist" id="join">
        <div className="wrap">
          <span className="pg-eyebrow">加入计划</span>
          <h2 className="pg-h2">从申请到第一个生产项目</h2>
          <ol className="pg-apply-steps">
            {applySteps.map((s) => (
              <li className="pg-apply-step" key={s.no}>
                <span className="pg-step-no">{s.no}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="pg-note-box">
            伙伴申请免费。Registered注册申请持续受理；Select、Preferred和Premier等级每半年评审一次。当前优先与长三角、珠三角、京津冀和成渝等区域的伙伴开展合作。其他地区具备真实客户、项目或交付能力的企业同样可以申请。
          </p>
        </div>
      </section>

      {/* 模块11 · 常见问题（details/summary：服务端输出全部问答文本） */}
      <section className="pg-band" id="faq">
        <div className="wrap">
          <span className="pg-eyebrow">常见问题</span>
          <h2 className="pg-h2">合作前需要了解的事项</h2>
          <div className="pg-faqs">
            {faqs.map((f) => (
              <details className="pg-faq" key={f.q}>
                <summary>
                  {f.q}
                  <svg className="pg-faq-ic" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 模块12 · 最终CTA + 表单 */}
      <section className="pg-band mist" id="final">
        <div className="wrap">
          <span className="pg-eyebrow">下一步</span>
          <h2 className="pg-h2">先判断是否适合，再决定是否加入</h2>
          <p className="pg-sub">
            你可以先获取伙伴计划手册，了解完整等级、交付和商机规则；如果已经具备团队或正在推进项目，也可以直接提交申请。已在真实项目中运行的能力，见<Link href="/cases">客户案例</Link>；也可以<Link href="/contact">直接联系我们</Link>。
          </p>
          <ProgramForms />
        </div>
      </section>

      {/* 版本信息 */}
      <section className="pg-meta">
        <div className="wrap">
          <p>伙伴计划版本：{VERSION} · 最近更新：{UPDATED}</p>
        </div>
      </section>
    </main>
  );
}
