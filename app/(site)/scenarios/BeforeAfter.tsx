import { Fragment } from "react";

export type Step = { st: string; h: string; p: string; tag: string };
export type Gain = { k: string; b: string; a: string };

function Row({ label, kind, steps }: { label: string; kind: "before" | "after"; steps: Step[] }) {
  return (
    <div className={`ba-row ${kind} reveal`}>
      <div className="ba-rowlab"><span className="dot" />{label}</div>
      <div className="ba-steps">
        {steps.map((s, i) => (
          <Fragment key={i}>
            {i > 0 && <div className="ba-ar" aria-hidden="true">→</div>}
            <div className="ba-step">
              <span className="st">{s.st}</span>
              <h5>{s.h}</h5>
              <p>{s.p}</p>
              <span className="tag">{s.tag}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default function BeforeAfter({
  metricBefore,
  metricAfter,
  before,
  after,
  gains,
}: {
  metricBefore: string;
  metricAfter: string;
  before: Step[];
  after: Step[];
  gains: Gain[];
}) {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head"><span className="eyebrow reveal">使用前 / 使用后</span></div>

        <div className="ba-metric reveal">
          <span className="b">{metricBefore}</span>
          <span className="ar" aria-hidden="true">→</span>
          <span className="a">{metricAfter}</span>
        </div>

        <div className="ba-flow">
          <Row label="使用前 · 传统做法" kind="before" steps={before} />
          <Row label="使用后 · FMClaw" kind="after" steps={after} />
        </div>

        <div className="ba-gains reveal">
          {gains.map((g) => (
            <div className="ba-gain" key={g.k}>
              <div className="gk">{g.k}</div>
              <div className="gb">使用前：{g.b}</div>
              <div className="ga">使用后：{g.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
