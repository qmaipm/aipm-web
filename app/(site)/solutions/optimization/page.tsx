import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function OptimizationPage() {
  return (
    <main>
      {/* A. HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal">
            <Link href="/agents">解决方案</Link> / <Link href="/agents">按 Agent 职能</Link> / 服务优化
          </div>
          <span className="eyebrow reveal">服务优化 Agent · 闭环第 04 段 · 回灌起点</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>
            找出反复出现的问题,<br />把改进写回服务标准。
          </h1>
          <p className="lead reveal">服务优化 Agent 汇总质检与运营数据，做聚类分析定位高频问题，给出改进建议，并回灌服务设计——这是闭环的收尾，也是下一轮的起点。</p>
        </div>
      </section>

      {/* B. 它解决什么 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它解决什么</span>
          </div>
          <p className="statement reveal">
            复盘过去多<span className="em">凭印象与个人经验</span>，反复出现的问题不易被系统性定位，改进也难沉淀成标准——现在基于数千条客观数据，复盘不再凭感觉。
          </p>
          <div className="facts reveal">
            <span>过去 · 凭印象复盘</span>
            <span>现在 · 基于<b>数千条客观数据</b></span>
            <span>优化自动变成<b>新的服务标准</b></span>
          </div>
        </div>
      </section>

      {/* C. 它怎么工作 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它怎么工作</span>
            <h2 className="reveal">全量数据进来，复盘与回灌出去。</h2>
            <p className="sub reveal">聚类分析把零散问题归并成可改进的几条。</p>
          </div>
          <div className="flowchart" style={{ marginTop: 48 }}>
            <div className="fc reveal">
              <div className="lane">输入</div>
              <h4>全量质检与评估数据</h4>
              <p>多模态质检照片 + AI 评估标签，来自质量评估的全量产出。</p>
              <svg className="conn" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="fc now reveal">
              <div className="lane">处理 · AI</div>
              <h4>AI 聚类分析</h4>
              <p>高频问题 Top5、问题环节定位、根因关联——把零散问题归并成可改进的几条。</p>
              <svg className="conn" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="fc last reveal">
              <div className="lane">输出</div>
              <h4>复盘报告 + 回灌</h4>
              <p>月度复盘报告与优化建议，回灌服务设计 Agent，形成自动进化闭环。</p>
            </div>
          </div>
          <div className="feedline reveal">
            <div className="lane">↻ 回灌服务设计</div>
            <h4>验证过的改进，写回标准</h4>
            <p>服务优化的结论不停在报告里——它会被写回服务设计的基线，让下一轮设计从更好的起点开始。系统自动把优化变成新的服务标准。</p>
          </div>
        </div>
      </section>

      {/* E. 关联产品能力 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它挂着哪些产品能力</span>
            <h2 className="reveal">背后是这些产品模块。</h2>
          </div>
          <div className="grid c3" style={{ marginTop: 48 }}>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <h3>计薪系统</h3>
              <p>把质量结论与人效挂钩，优化落到激励上。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <h3>数据大屏</h3>
              <p>高频问题与趋势集中呈现，复盘有据。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <h3>API 开放平台</h3>
              <p>优化建议可对接外部系统，回灌不被锁死。</p>
            </Link>
          </div>
        </div>
      </section>

      {/* F. 放进闭环 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">放进闭环</span>
          </div>
          <p className="statement reveal" style={{ fontSize: "clamp(20px,2.6vw,25px)" }}>
            服务优化是闭环的<span className="em">收尾，也是新一轮的起点</span>——它把验证过的改进回灌服务设计，标准就此持续进化。
          </p>
          <div className="miniloop reveal">
            <span className="ml"><span className="d"></span>服务设计</span><span className="ar">→</span>
            <span className="ml"><span className="d"></span>运营管理</span><span className="ar">→</span>
            <span className="ml"><span className="d"></span>质量评估</span><span className="ar">→</span>
            <span className="ml on"><span className="d"></span>服务优化</span>
            <span className="rt">↻ 回灌服务设计</span>
          </div>
          <p className="reveal" style={{ marginTop: 26 }}>
            <Link href="/agents" style={{ color: "var(--accent)", fontWeight: 600 }}>回到四 Agent 闭环总览 →</Link>
          </p>
        </div>
      </section>

      {/* Product screenshot */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">真实产品界面</span>
            <h2 className="reveal">月度复盘报告界面。</h2>
          </div>
          <figure className="reveal" style={{ margin: "40px 0 0" }}>
            <Image
              src="/images/agent-optimization.png"
              alt="服务优化 Agent 界面"
              width={3328}
              height={1638}
              style={{ width: "100%", height: "auto", borderRadius: 14, border: "1px solid var(--line)" }}
            />
            <figcaption className="sub" style={{ marginTop: 12 }}>
              汇总质检与运营数据，找出反复出现的问题，把改进写回服务标准。
            </figcaption>
          </figure>
        </div>
      </section>

      {/* G. CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">把一个月的真实数据,<br />跑一次服务优化。</h2>
          <p className="reveal">带上你的质检数据来，看 AI 怎么找出高频问题。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">
              预约 FMAI 工作坊 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
