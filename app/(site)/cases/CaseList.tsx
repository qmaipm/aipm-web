"use client";
import { useState } from "react";
import Link from "next/link";
import { CARD_CASES, CASE_TAGS, getFacets, type Case } from "./cases";

const Arrow = ({ s = 14 }: { s?: number }) => (
  <svg className="ar" width={s} height={s} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FACETS = getFacets();

function FilterRow({ label, values, sel, onPick }: { label: string; values: string[]; sel: string; onPick: (v: string) => void }) {
  if (!values.length) return null;
  return (
    <div className="ca-frow">
      <span className="ca-flabel">{label}</span>
      <div className="ca-chips" role="group" aria-label={label}>
        {values.map((v) => (
          <button type="button" key={v} className={`ca-chip${sel === v ? " on" : ""}`} aria-pressed={sel === v} onClick={() => onPick(v)}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

function Card({ c }: { c: Case }) {
  return (
    <Link className="ca-card" href={`/cases/${c.slug}`}>
      <div className="ca-cover" style={{ backgroundImage: c.cover }}><span className="ca-bar" /></div>
      <div className="ca-body">
        <div className="ca-meta">{c.industry} · {c.scale} · {c.location}</div>
        <h3>{c.title}</h3>
        <div className="ca-metric">{c.cardMetric}</div>
        <span className="ca-go">读这个项目 <Arrow /></span>
      </div>
    </Link>
  );
}

export default function CaseList() {
  // 每个维度单选:空串表示"不限"
  const [ind, setInd] = useState("");
  const [use, setUse] = useState("");
  const [size, setSize] = useState("");

  // 再次点选中项 → 取消(回到不限)
  const pick = (cur: string, set: (v: string) => void, v: string) => set(cur === v ? "" : v);

  const list = CARD_CASES.filter((c) => {
    const t = CASE_TAGS[c.slug];
    if (!t) return false;
    if (ind && t.industryTag !== ind) return false;
    if (size && t.sizeTag !== size) return false;
    if (use && !t.useCases.includes(use)) return false;
    return true;
  });
  const active = (ind ? 1 : 0) + (use ? 1 : 0) + (size ? 1 : 0);
  const clear = () => { setInd(""); setUse(""); setSize(""); };

  return (
    <>
      <div className="ca-listhead">
        <h2 className="ca-h2">在运行的项目</h2>
        <div className="ca-count">
          {list.length} 个案例{active ? "（已筛选）" : ""}
          {active ? <button type="button" className="ca-clear" onClick={clear}>清除筛选</button> : null}
        </div>
      </div>

      <div className="ca-filters">
        <FilterRow label="行业" values={FACETS.industries} sel={ind} onPick={(v) => pick(ind, setInd, v)} />
        <FilterRow label="场景 / 用例" values={FACETS.useCases} sel={use} onPick={(v) => pick(use, setUse, v)} />
        <FilterRow label="客户规模" values={FACETS.sizes} sel={size} onPick={(v) => pick(size, setSize, v)} />
      </div>

      {list.length ? (
        <div className="ca-list">
          {list.map((c) => <Card key={c.slug} c={c} />)}
        </div>
      ) : (
        <p className="ca-empty">没有符合当前筛选的案例，试试减少筛选条件。</p>
      )}
    </>
  );
}
