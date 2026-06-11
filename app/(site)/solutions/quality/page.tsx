import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function QualityPage() {
  return (
    <main>
      {/* A. HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal">
            <Link href="/agents">解决方案</Link> / <Link href="/agents">按 Agent 职能</Link> / 质量评估
          </div>
          <span className="eyebrow reveal">质量评估 Agent · 闭环第 03 段</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>
            按统一标准独立评估每一次服务,<br />留下可追溯的证据链。
          </h1>
          <p className="lead reveal">
            质量评估 Agent 用 AI 视觉 + IoT 数据，对每一次服务自动打分、打标，生成可追溯的评估报告，业主可以直接获取。
          </p>
        </div>
      </section>

      {/* B. 它解决什么 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它解决什么</span>
          </div>
          <p className="statement reveal">
            人工抽检覆盖有限、口径还<span className="em">因人而异</span>，很难对每一次服务都做一致、全量的评估——它不是替代人工抽检，而是做到人做不到的全量复杂标注。
          </p>
          <div className="facts reveal">
            <span>
              单项目可达 <b>1000+ 张/月</b>
            </span>
            <span>
              单次评估 <b>&gt;1000 字</b>
            </span>
            <span>
              结构化标签 <b>100% 全量</b>
            </span>
          </div>
        </div>
      </section>

      {/* C. 它怎么工作 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它怎么工作</span>
            <h2 className="reveal">照片视频进来，评估报告出去。</h2>
            <p className="sub reveal">采集、识别、评分、留痕，全程按同一套标准。</p>
          </div>
          <div className="flowchart" style={{ marginTop: 48 }}>
            <div className="fc reveal">
              <div className="lane">输入</div>
              <h4>工单照片 / 视频</h4>
              <p>来自运营过程的工单影像，由 CV 深度学习模型自动采集。</p>
              <svg className="conn" viewBox="0 0 24 24">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="fc now reveal">
              <div className="lane">处理 · AI</div>
              <h4>多维识别 + 自动评分</h4>
              <p>识别清洁、设备、违规等特征，自动评分并打上结构化标签。</p>
              <svg className="conn" viewBox="0 0 24 24">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="fc last reveal">
              <div className="lane">输出</div>
              <h4>可追溯的评估报告</h4>
              <p>结构化标签 + 评分汇成评估报告，证据链可回溯，业主可直接获取。</p>
            </div>
          </div>
          <p className="scenario-quote reveal">每一次服务都被同一把尺子量过，结论后面跟着可回看的证据。</p>
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
              <div className="k" style={{ background: "var(--blue)" }}></div>
              <h3>设备管理系统</h3>
              <p>设备状态与 IoT 数据，为评估提供客观信号。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/iot">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <h3>多模态巡检</h3>
              <p>照片、视频、传感器多源采集服务现场。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <h3>数据大屏</h3>
              <p>评估结果汇总呈现，质量一眼看清。</p>
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
            质量评估的结构化标签与评分，<span className="em">汇入服务优化</span>做聚类分析，定位反复出现的问题。
          </p>
          <div className="miniloop reveal">
            <span className="ml">
              <span className="d"></span>服务设计
            </span>
            <span className="ar">→</span>
            <span className="ml">
              <span className="d"></span>运营管理
            </span>
            <span className="ar">→</span>
            <span className="ml on">
              <span className="d"></span>质量评估
            </span>
            <span className="ar">→</span>
            <span className="ml">
              <span className="d"></span>服务优化
            </span>
            <span className="rt">↻ 回灌服务设计</span>
          </div>
          <p className="reveal" style={{ marginTop: 26 }}>
            <Link href="/agents" style={{ color: "var(--accent)", fontWeight: 600 }}>
              回到四 Agent 闭环总览 →
            </Link>
          </p>
        </div>
      </section>

      {/* D. 真实产品界面（重点截图位） */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">真实产品界面</span>
            <h2 className="reveal">详细评估报告界面。</h2>
            <p className="sub reveal">这是本 Agent 的重点界面：每一项评分背后，都挂着可回看的照片与标签。</p>
          </div>
          <figure className="reveal" style={{ margin: 0, textAlign: "center", marginTop: 40 }}>
            <Image
              src="/images/agent-quality.png"
              alt="质量评估 Agent 界面"
              width={1342}
              height={1636}
              style={{
                display: "block",
                maxHeight: 560,
                width: "auto",
                maxWidth: "100%",
                margin: "0 auto",
                borderRadius: 14,
                border: "1px solid var(--line)",
              }}
            />
            <figcaption className="sub" style={{ marginTop: 12 }}>
              用 AI 视觉 + IoT 数据，按统一标准独立评估每一次服务。
            </figcaption>
          </figure>
        </div>
      </section>

      {/* G. CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">
            把一批真实工单照片,<br />跑一次质量评估。
          </h2>
          <p className="reveal">带上你的现场影像来，看 AI 怎么打分留痕。</p>
          <div className="cta-row reveal">
            <Link href="/workshop" className="btn btn-primary">
              预约 FMClaw™ 加速营 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
