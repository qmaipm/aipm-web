import Link from "next/link";

export type Step = { name: string; before: string; after: string; tag: string };
export type Gain = { k: string; b: string; a: string };

export default function BeforeAfter({
  metricBefore,
  metricAfter,
  steps,
  gains,
  note,
  solutionHref,
}: {
  metricBefore: string;
  metricAfter: string;
  steps: Step[];
  gains: Gain[];
  note?: string;
  solutionHref?: string;
}) {
  return (
    <section className="band alt">
      <div className="wrap">
        <div className="ba-eyebrow"><span className="eyebrow reveal">效率提升</span></div>

        <p className="ba-headline reveal">
          人工旧流程，经 <span className="new">AI</span> 改写成新流程
        </p>

        {/* 三栏对比：左=旧流程 · 中=AI 桥接 · 右=新流程 */}
        <div className="ba-grid reveal">
          {/* 列头 */}
          <div className="ba-head ba-head-old">
            <span className="ba-side-lbl">原来</span>
            <span className="ba-side-metric">{metricBefore}</span>
          </div>
          <div className="ba-head ba-head-mid" aria-hidden="true">
            <span className="ba-head-ai">AI</span>
          </div>
          <div className="ba-head ba-head-new">
            <span className="ba-side-lbl">现在</span>
            <span className="ba-side-metric grad">{metricAfter}</span>
          </div>

          {/* 步骤行 */}
          {steps.map((s, i) => (
            <div className="ba-row" key={i}>
              <div className="ba-cell ba-old">
                <span className="ba-step">
                  <span className="ba-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ba-name">{s.name}</span>
                </span>
                <p className="ba-txt">{s.before}</p>
              </div>

              <div className="ba-mid" aria-hidden="true">
                <span className="ba-node">AI</span>
                <span className="ba-arrow">→</span>
              </div>

              <div className="ba-cell ba-new">
                <span className="ba-step">
                  <span className="ba-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ba-name">{s.name}</span>
                </span>
                <p className="ba-txt">{s.after}</p>
                <em className="ba-tag">{s.tag}</em>
              </div>
            </div>
          ))}
        </div>

        <div className="ba-gains reveal">
          {gains.map((g) => (
            <div className="ba-g" key={g.k}>
              <div className="gk">{g.k}</div>
              <p>
                <span className="was">{g.b}</span>
                <span className="ar" aria-hidden="true">→</span>
                {g.a}
              </p>
            </div>
          ))}
        </div>

        {note && (
          <div className="ba-concl reveal">
            <span className="ba-concl-lbl">AI 替代了什么</span>
            <p className="ba-concl-txt">{note}</p>
            {solutionHref && (
              <Link href={solutionHref} className="note-link">看完整解决方案 <span className="ar" aria-hidden="true">→</span></Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
