export type Step = { name: string; before: string; after: string; tag: string };
export type Gain = { k: string; b: string; a: string };

export default function BeforeAfter({
  metricBefore,
  metricAfter,
  steps,
  gains,
}: {
  metricBefore: string;
  metricAfter: string;
  steps: Step[];
  gains: Gain[];
}) {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head"><span className="eyebrow reveal">效率提升</span></div>

        <p className="ba-headline reveal">
          原来 <span className="old">{metricBefore}</span>，现在 <span className="new">{metricAfter}</span>。
        </p>

        <div className="ba-steps2 reveal">
          {steps.map((s, i) => (
            <div className="ba-srow" key={i}>
              <div className="ba-sidx">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="name">{s.name}</span>
              </div>
              <div className="ba-scompare">
                <div className="ba-line was">
                  <span className="lbl">过去</span>
                  <span>{s.before}</span>
                </div>
                <div className="ba-line now">
                  <span className="lbl">现在</span>
                  <span>{s.after}<em className="tag">{s.tag}</em></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ba-gains2 reveal">
          {gains.map((g) => (
            <div className="ba-g2" key={g.k}>
              <div className="g2k">{g.k}</div>
              <p>
                <span className="was">{g.b}</span>
                <span className="ar" aria-hidden="true">→</span>
                {g.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
