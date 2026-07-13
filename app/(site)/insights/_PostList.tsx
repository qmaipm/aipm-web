"use client";
import Link from "next/link";
import { useState } from "react";
import { ARTICLES, THEMES } from "./articles";

const Arrow = ({ s = 13 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tabs = ["全部", ...THEMES] as const;

export default function PostList() {
  const [active, setActive] = useState<string>("全部");
  const list = active === "全部" ? ARTICLES : ARTICLES.filter((a) => a.theme === active);

  return (
    <>
      <div className="is-listhead">
        <h2 className="is-h2">每一篇,都想写得值得读</h2>
        <div className="is-tabs" role="tablist" aria-label="按主题筛选">
          {tabs.map((t) => (
            <button
              type="button"
              role="tab"
              aria-selected={t === active}
              className={`is-tab${t === active ? " on" : ""}`}
              key={t}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

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
