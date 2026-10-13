"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ARTICLES, THEMES, THEME_DESC, type Theme } from "./articles";

const Arrow = ({ s = 13 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tabs = ["全部", ...THEMES] as const;
// 列表按发布或实质更新日期倒序
const fresh = (a: (typeof ARTICLES)[number]) => a.updated || a.date;
const SORTED = [...ARTICLES].sort((a, b) => fresh(b).localeCompare(fresh(a)));
const count = (t: string) => (t === "全部" ? ARTICLES.length : ARTICLES.filter((a) => a.theme === t).length);

export default function PostList() {
  const [active, setActive] = useState<string>("全部");
  // 支持 /insights?topic=场景方案 直达某个主题（文章页面包屑 / 站内链接用）
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && (THEMES as string[]).includes(t)) setActive(t);
  }, []);
  const pick = (t: string) => {
    setActive(t);
    const u = new URL(window.location.href);
    if (t === "全部") u.searchParams.delete("topic"); else u.searchParams.set("topic", t);
    window.history.replaceState(null, "", u.toString());
  };
  const list = active === "全部" ? SORTED : SORTED.filter((a) => a.theme === active);

  return (
    <>
      <div className="is-listhead">
        <h2 className="is-h2">每一篇，都想写得值得读</h2>
        <div className="is-tabs" role="tablist" aria-label="按主题筛选">
          {tabs.map((t) => (
            <button
              type="button"
              role="tab"
              aria-selected={t === active}
              className={`is-tab${t === active ? " on" : ""}`}
              key={t}
              onClick={() => pick(t)}
            >
              {t}<span className="is-tab-n">{count(t)}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="is-tabdesc" aria-live="polite">
        {active === "全部" ? `${ARTICLES.length} 篇研究，按 ${THEMES.length} 个主题整理。` : THEME_DESC[active as Theme]}
      </p>

      <div className="is-postlist">
        {list.map((p) => (
          <Link className={`is-post${p.cover ? " has-thumb" : ""}`} href={`/insights/${p.slug}`} key={p.slug}>
            {p.cover ? (
              <div className="is-post-thumb" aria-hidden="true">
                <img src={p.cover} alt="" loading="lazy" />
              </div>
            ) : null}
            <div className="is-post-main">
              <span className="is-post-tag">{p.theme}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
            <div className="is-post-by">
              {p.by}<span className="dot" aria-hidden>·</span>{p.date}<span className="dot" aria-hidden>·</span>{p.read}
              <Arrow />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
