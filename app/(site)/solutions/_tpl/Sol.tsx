// 解决方案页共用模板（2026-10）。12 个 /solutions/* 页统一用这一套板块，改一处全部生效。
// 版式原则（同公司页试点）：每页小标签 ≤ 3；不用图标方块、渐变字、左侧色条、"vs" 胶囊；
// 能写成列表的不做卡片墙；板块类型轮换（首屏图文 → 对照表 → 编号列表 → 实景图 → FAQ → 收尾）。
import Link from "next/link";
import type { ReactNode } from "react";
import "./sol.css";

export const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SolPage({ children }: { children: ReactNode }) {
  return <main className="spt">{children}</main>;
}

/** 首屏：左文右图。title 用数组控制断行（每段一个不可拆的短语）。 */
export function SolHero({
  crumb, crumbRoot = { href: "/agents", label: "智能体解决方案" }, title, lead, proof, image, cta = { href: "/workshop", label: "预约 FMClaw™ 加速营" }, secondary,
}: {
  crumb: string;
  crumbRoot?: { href: string; label: string };
  title: string[];
  lead: ReactNode;
  proof?: string[];
  image?: { src: string; alt: string; caption?: string };
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className={`spt-hero${image ? "" : " no-img"}`}>
      <div className="wrap spt-hero__grid">
        <div className="spt-hero__text">
          <nav className="spt-crumb" aria-label="面包屑">
            <Link href={crumbRoot.href}>{crumbRoot.label}</Link><i>/</i><span>{crumb}</span>
          </nav>
          <h1 className="spt-h1">
            {title.map((t, i) => (<span className="nb" key={i}>{t}</span>))}
          </h1>
          <p className="spt-lead">{lead}</p>
          <div className="spt-cta">
            <Link href={cta.href} className="btn btn-primary">{cta.label} <Arrow /></Link>
            {secondary && <a href={secondary.href} className="spt-textlink">{secondary.label} <Arrow s={13} /></a>}
          </div>
          {proof && proof.length > 0 && (
            <ul className="spt-proof">{proof.map((p) => <li key={p}>{p}</li>)}</ul>
          )}
        </div>
        {image && (
          <figure className="spt-hero__img">
            <img src={image.src} alt={image.alt} width={1200} height={800} />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}

/** 中文标题按全角逗号切成短语，每段整体换行，避免「月底拼 / 账」这类断行。 */
const phrases = (t: string) => t.split(/(?<=，)/);

/** 通用板块外壳：标题 + 可选导语。tone=mist 为浅灰底。 */
export function SolSection({
  id, title, sub, tone, children, split,
}: {
  id?: string;
  title: string;
  sub?: ReactNode;
  tone?: "mist";
  split?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`spt-band${tone ? " " + tone : ""}${split ? " is-split" : ""}`} id={id}>
      <div className="wrap spt-band__grid">
        <header className="spt-band__head">
          <h2 className="spt-h2">{phrases(title).map((t, i) => <span className="nb" key={i}>{t}</span>)}</h2>
          {sub && <p className="spt-sub">{sub}</p>}
        </header>
        <div className="spt-band__body">{children}</div>
      </div>
    </section>
  );
}

/** 过去 / 现在对照：表格，不用卡片与 vs。k 省略时为两栏；labels 可改表头（如「一刀切裁人 / 三阶段降本」）。 */
export function SolCompare({ rows, labels = ["过去", "现在"] }: {
  rows: { k?: string; before: ReactNode; after: ReactNode }[];
  labels?: [string, string];
}) {
  const two = rows.every((r) => !r.k);
  return (
    <div className={`spt-compare${two ? " is-2" : ""}`} role="table" aria-label={`${labels[0]}与${labels[1]}的对照`}>
      <div className="spt-compare__row is-head" role="row">
        {!two && <span role="columnheader" />}
        <span role="columnheader">{labels[0]}</span>
        <span role="columnheader">{labels[1]}</span>
      </div>
      {rows.map((r, i) => (
        <div className="spt-compare__row" role="row" key={r.k ?? i}>
          {!two && <span className="k" role="rowheader">{r.k}</span>}
          <span className="b" role="cell" data-l={labels[0]}>{r.before}</span>
          <span className="a" role="cell" data-l={labels[1]}>{r.after}</span>
        </div>
      ))}
    </div>
  );
}

type Item = { no?: string; meta?: string; title: string; body: ReactNode; href?: string; linkText?: string };

/** 编号列表：一行一项，编号小而灰，标题为视觉重心。meta 为标题上方的小灰字（阶段、输入/输出等）。 */
export function SolSteps({ items }: { items: Item[] }) {
  return (
    <ol className="spt-steps">
      {items.map((f, i) => (
        <li className="spt-step" key={f.title}>
          <span className="spt-step__no">{f.no ?? String(i + 1).padStart(2, "0")}</span>
          <div className="spt-step__c">
            {f.meta && <span className="spt-meta">{f.meta}</span>}
            <h3 className="spt-step__h">{f.title}</h3>
            <p className="spt-step__p">
              {f.body}
              {f.href && <> <Link className="spt-inlink" href={f.href}>{f.linkText} <Arrow s={12} /></Link></>}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** 并列栏：2–4 项横排，顶部一条细线，不做卡片。 */
export function SolCols({ items }: { items: Item[] }) {
  return (
    <ul className={`spt-cols n${Math.min(items.length, 4)}`}>
      {items.map((f) => (
        <li key={f.title}>
          {f.meta && <span className="spt-meta">{f.meta}</span>}
          <h3>{f.href && !f.linkText ? <Link href={f.href}>{f.title}</Link> : f.title}</h3>
          <p>{f.body}</p>
          {f.href && f.linkText && <Link className="spt-inlink" href={f.href}>{f.linkText} <Arrow s={12} /></Link>}
        </li>
      ))}
    </ul>
  );
}

/** 补充说明块：标题 + 一句话 + 渠道名（纯文字，不做胶囊）+ 可选链接。 */
export function SolAside({ meta, title, body, items, href, linkText }: {
  meta?: string; title: string; body: ReactNode; items?: string[]; href?: string; linkText?: string;
}) {
  return (
    <div className="spt-aside">
      <div>
        {meta && <span className="spt-meta">{meta}</span>}
        <h3>{title}</h3>
        <p>{body}</p>
        {href && <Link className="spt-inlink" href={href}>{linkText} <Arrow s={12} /></Link>}
      </div>
      {items && <ul className="spt-aside__items">{items.map((x) => <li key={x}>{x}</li>)}</ul>}
    </div>
  );
}

/** 四 Agent 闭环：一行文字节点，当前环节用强调色。 */
export function SolLoop({ nodes, current, tail }: { nodes: string[]; current?: number | "all"; tail?: string }) {
  return (
    <ol className="spt-loop" aria-label="智能体闭环">
      {nodes.map((n, i) => (
        <li key={n} className={current === "all" || current === i ? "is-on" : undefined} aria-current={current === i ? "step" : undefined}>{n}</li>
      ))}
      {tail && <li className="spt-loop__tail">{tail}</li>}
    </ol>
  );
}

/** 板块末尾的一行延伸链接 / 补充段落。 */
export function SolMore({ children }: { children: ReactNode }) {
  return <p className="spt-more">{children}</p>;
}

/** 一句结论（不加色条、不加渐变）。 */
export function SolVerdict({ children }: { children: ReactNode }) {
  return <p className="spt-verdict">{children}</p>;
}

/** 整宽实景图 + 图注。ui=true 时为产品界面截图：不裁切、加细边框。 */
export function SolFigure({ src, alt, caption, ui, w = 1600, h = 900 }: {
  src: string; alt: string; caption?: string; ui?: boolean; w?: number; h?: number;
}) {
  return (
    <figure className={`spt-figure${ui ? " is-ui" : ""}`}>
      <img src={src} alt={alt} loading="lazy" width={w} height={h} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** 两张界面图并排（手机端 + 系统图）。 */
export function SolShots({ items }: { items: { src: string; alt: string; caption?: string; w: number; h: number }[] }) {
  return (
    <div className="spt-shots">
      {items.map((x) => (
        <figure className="spt-figure is-ui" key={x.src}>
          <img src={x.src} alt={x.alt} loading="lazy" width={x.w} height={x.h} />
          {x.caption && <figcaption>{x.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/** 关键数字：一行 2–4 个，来自已发布案例。 */
export function SolNums({ items, note }: { items: { v: string; l: string }[]; note?: string }) {
  return (
    <>
      <dl className="spt-nums">
        {items.map((n) => (<div key={n.l}><dt>{n.v}</dt><dd>{n.l}</dd></div>))}
      </dl>
      {note && <p className="spt-note">{note}</p>}
    </>
  );
}

/** 收尾 CTA（沿用全站 .endcta）。 */
export function SolEnd({ title, sub, alt, cta = { href: "/workshop", label: "预约 FMClaw™ 加速营" } }: {
  title: string[];
  sub?: string;
  alt?: ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <section className="endcta">
      <div className="wrap">
        <h2 className="reveal">
          {title.map((t, i) => (<span key={i}>{i > 0 && <br />}<span className="nb">{t}</span></span>))}
        </h2>
        {sub && <p className="reveal">{sub}</p>}
        <div className="cta-row reveal">
          <Link href={cta.href} className="btn btn-primary">{cta.label} <Arrow s={16} /></Link>
        </div>
        {alt && <p className="alt reveal spt-endalt">{alt}</p>}
      </div>
    </section>
  );
}
