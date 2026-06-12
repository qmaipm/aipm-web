import Link from "next/link";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">客户案例 · CASES</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>谁在用 · 哪个项目在用</h1>
          <p className="lead reveal">不是演示,是已经在运行的项目。</p>
        </div>
      </section>

      {/* CASE LIST */}
      <section className="band">
        <div className="wrap">
          <div className="tabs reveal">
            <span className="tab on">全部</span>
            <span className="tab">写字楼</span>
            <span className="tab">综合体</span>
          </div>

          <div className="casegrid cases-2">
            <Link className="case-card reveal" href="/cases/detail">
              <div className="cover" style={{ backgroundImage: "linear-gradient(180deg,rgba(21,20,15,.12),rgba(21,20,15,.34)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=70&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}><div className="bar" style={{ background: "var(--blue)" }}></div></div>
              <div className="body">
                <div className="tag">综合体 · 华南 · 约 6 万㎡</div>
                <div className="metric">一个项目跑成了自治运营</div>
                <p>日常运营里的判断交给 Agent,现场只保留执行。</p>
              </div>
            </Link>

            <Link className="case-card reveal" href="/cases/detail">
              <div className="cover" style={{ backgroundImage: "linear-gradient(180deg,rgba(21,20,15,.12),rgba(21,20,15,.34)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=70&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}><div className="bar" style={{ background: "var(--green)" }}></div></div>
              <div className="body">
                <div className="tag">写字楼 · 华南 · 约 7 万㎡ · 5 年合同</div>
                <div className="metric">缴费、对账、账单由 Agent 跑通</div>
                <p>一笔预算覆盖五年,账目全程可追溯。</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">带你的难题来,<br />带一个 Agent 走。</h2>
          <p className="reveal">从你的一个真实业务开始。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">预约 FMClaw™ 加速营 →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
