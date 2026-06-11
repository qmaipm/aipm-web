import Link from "next/link";

export default function Placeholder({
  crumb,
  title,
  lead,
}: {
  crumb: string;
  title: React.ReactNode;
  lead: string;
}) {
  return (
    <main>
      <section className="phero">
        <div className="hero-mesh" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumb reveal">{crumb}</div>
          <h1 className="reveal">{title}</h1>
          <p className="lead reveal">{lead}</p>
          <div className="reveal"><span className="soon">本页正在开发中 · 稍后上线</span></div>
          <div className="cta-row reveal" style={{ marginTop: 40, display: "flex", gap: 14 }}>
            <Link href="/workshop" className="btn btn-primary">预约 FMAI 工作坊</Link>
            <Link href="/" className="btn btn-ghost">返回首页</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
