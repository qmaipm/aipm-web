// 项目大脑结构图（2026-10-16）：四个产品子页共用，当前页高亮，其余节点可点击。
// 用 HTML 画而不是图片：文字可被搜索引擎与 AI 读取；只用一个强调色。
// 公开尺度：只画模块名称与作用，不画内部组件。验收见 docs/FMCLAW-SUBPAGES-ACCEPTANCE.md
import Link from "next/link";
import type { ReactNode } from "react";
import "./brain.css";

export const FM_PAGES = {
  brain: { href: "/products/fmclaw/ontology", name: "项目大脑", role: "懂业务", d: "行业数据本体 · 国内首个物业行业模型" },
  workflow: { href: "/products/fmclaw/workflow-engine", name: "工作流引擎", role: "会干活", d: "把管理要求变成自动推进的任务" },
  toolbox: { href: "/products/fmclaw/connectors", name: "工具箱", role: "有工具", d: "物业管理系统全套内置，在用系统原样接入" },
  console: { href: "/products/fmclaw/agent-runtime", name: "控制台", role: "可托付", d: "看状态、关键节点确认、随时接管、全程可追溯" },
} as const;

export type FmKey = keyof typeof FM_PAGES;

function Node({ k, current, children }: { k: FmKey; current: FmKey; children?: ReactNode }) {
  const p = FM_PAGES[k];
  const on = k === current;
  const inner = (
    <>
      <span className="bm-role">{p.role}</span>
      <span className="bm-name">{p.name}</span>
      <span className="bm-d">{p.d}</span>
      {children}
    </>
  );
  return on ? (
    <div className={`bm-node bm-${k} is-on`} aria-current="page">{inner}</div>
  ) : (
    <Link className={`bm-node bm-${k}`} href={p.href}>{inner}</Link>
  );
}

/** 项目大脑结构图：输入 → 项目大脑 → 工作流引擎 → 工具箱 → 结果；控制台横跨其下。 */
export function BrainMap({ current, caption }: { current: FmKey; caption?: ReactNode }) {
  return (
    <figure className="bm" aria-label="FMClaw™ 项目大脑结构图">
      <div className="bm-grid">
        <div className="bm-io bm-in">
          <span className="bm-io__k">接入</span>
          <ul><li>业务系统</li><li>现场感知</li><li>协同平台</li></ul>
        </div>
        <span className="bm-arrow" aria-hidden="true" />
        <Node k="brain" current={current} />
        <span className="bm-arrow" aria-hidden="true" />
        <Node k="workflow" current={current} />
        <span className="bm-arrow" aria-hidden="true" />
        <Node k="toolbox" current={current} />
        <span className="bm-arrow" aria-hidden="true" />
        <div className="bm-io bm-out">
          <span className="bm-io__k">结果</span>
          <ul><li>工单</li><li>通知</li><li>报告</li><li>待确认事项</li></ul>
        </div>
        <Node k="console" current={current} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** 首屏循环动效：静音、循环、无控件；尊重 prefers-reduced-motion（CSS 隐藏视频，只留静帧）。 */
export function LoopMedia({ poster, src, srcSmall, label, w, h }: { poster: string; src: string; srcSmall?: string; label: string; w: number; h: number }) {
  return (
    <div className="bm-loop">
      <video autoPlay muted loop playsInline preload="metadata" poster={poster} aria-label={label} width={w} height={h}>
        {srcSmall && <source src={srcSmall} type="video/mp4" media="(max-width: 760px)" />}
        <source src={src} type="video/mp4" />
      </video>
      <img src={poster} alt={label} width={w} height={h} />
    </div>
  );
}

/** 四页共用的「最后更新」与返回总览。 */
export function FmFoot({ updated }: { updated: string }) {
  return (
    <div className="wrap bm-foot">
      <Link href="/products/fmclaw">← 返回 AI 物业经理 FMClaw™</Link>
      <span>最后更新：{updated}</span>
    </div>
  );
}

/** 图文并排：一张大图 + 一段内容，reverse 时图在右。用于打破整页纯文字。 */
export function MediaRow({ src, alt, caption, reverse, ui, children, w = 1800, h = 1208 }: {
  src: string; alt: string; caption?: string; reverse?: boolean; ui?: boolean; children: ReactNode; w?: number; h?: number;
}) {
  return (
    <div className={`bm-media${reverse ? " is-rev" : ""}${ui ? " is-ui" : ""}`}>
      <figure>
        <img src={src} alt={alt} width={w} height={h} loading="lazy" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
      <div className="bm-media__c">{children}</div>
    </div>
  );
}

/** 图片卡组：3–4 张实景 + 标题 + 一句话。 */
export function PhotoGrid({ items }: { items: { src: string; alt: string; title: string; body: ReactNode }[] }) {
  return (
    <ul className={`bm-photos n${items.length}`}>
      {items.map((x) => (
        <li key={x.title}>
          <img src={x.src} alt={x.alt} width={1600} height={1200} loading="lazy" />
          <h3>{x.title}</h3>
          <p>{x.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** 整宽大图（实景），带图注。 */
export function WideShot({ src, alt, caption, w = 1800, h = 1208 }: { src: string; alt: string; caption?: string; w?: number; h?: number }) {
  return (
    <figure className="bm-wide">
      <img src={src} alt={alt} width={w} height={h} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
