import Link from "next/link";
import Image from "next/image";
import "./page.css";

export default function ServiceDesignPage() {
  return (
    <main>
      {/* A. HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <div className="crumb reveal">
            <Link href="/agents">解决方案</Link> /{" "}
            <Link href="/agents">按 Agent 职能</Link> / 服务设计
          </div>
          <span className="eyebrow reveal">服务设计 Agent · 闭环第 01 段</span>
          <h1 className="reveal" style={{ marginTop: 20 }}>
            录入项目信息,
            <br />
            输出一套可执行的服务方案。
          </h1>
          <p className="lead reveal">
            根据项目业态、面积、设备与需求，服务设计 Agent
            自动建模，给出服务标准、人员编制和预算——每一笔都标着数据来源。
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
            服务标准制定、人员编制、预算测算，过去高度依赖
            <span className="em">顾问经验</span>——一个项目要反复打磨很多天，做法还常常因人而异。
          </p>
          <div className="facts reveal">
            <span>过去 · 顾问经验驱动</span>
            <span>
              现在 · 基于<b>真实数据</b>建模
            </span>
            <span>
              约 <b>30 分钟</b>出方案
            </span>
          </div>
        </div>
      </section>

      {/* C. 它怎么工作 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">它怎么工作</span>
            <h2 className="reveal">输入项目信息，输出三份方案。</h2>
            <p className="sub reveal">中间这段建模，过去是顾问的几天，现在交给 Agent。</p>
          </div>
          <div className="flowchart" style={{ marginTop: 48 }}>
            <div className="fc reveal">
              <div className="lane">输入</div>
              <h4>项目基础信息</h4>
              <p>
                业态、管理面积与楼栋、关键服务空间、主要设备清单；可选填现有人员合同与服务周期。
              </p>
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
              <h4>约 30 分钟自动建模</h4>
              <p>调用行业知识与项目数据，完成服务标准制定、人员编制测算与预算拆解。</p>
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
              <h4>三份可执行方案</h4>
              <p>
                服务标准体系、人员编制方案、预算明细表——每笔支出标注数据来源，可直接进入运营。
              </p>
            </div>
          </div>
          <p className="scenario-quote reveal">
            过去依赖顾问经验的三件事，现在基于真实数据，半小时给出一版可讨论的底稿。
          </p>
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
              <h3>空间管理系统</h3>
              <p>承载业态、面积、楼栋与服务空间的结构化底数。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--green)" }}></div>
              <h3>服务配置系统</h3>
              <p>服务标准与流程在此沉淀、复用与下发。</p>
            </Link>
            <Link className="card lk hover reveal" href="/products/fmclaw">
              <div className="k" style={{ background: "var(--gold)" }}></div>
              <h3>API 开放平台</h3>
              <p>方案数据可对接外部系统，标准不被锁在一处。</p>
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
          <p
            className="statement reveal"
            style={{ fontSize: "clamp(20px,2.6vw,25px)" }}
          >
            服务设计是闭环的<span className="em">起点</span>
            ：它输出的标准会被运营管理每天执行，也会在末端被服务优化回灌改写。
          </p>
          <div className="miniloop reveal">
            <span className="ml on">
              <span className="d"></span>服务设计
            </span>
            <span className="ar">→</span>
            <span className="ml">
              <span className="d"></span>运营管理
            </span>
            <span className="ar">→</span>
            <span className="ml">
              <span className="d"></span>质量评估
            </span>
            <span className="ar">→</span>
            <span className="ml">
              <span className="d"></span>服务优化
            </span>
            <span className="rt">↻ 回灌服务设计</span>
          </div>
          <p className="reveal" style={{ marginTop: 26 }}>
            <Link
              href="/agents"
              style={{ color: "var(--accent)", fontWeight: 600 }}
            >
              回到四 Agent 闭环总览 →
            </Link>
          </p>
        </div>
      </section>

      {/* 真实产品界面截图 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">真实产品界面</span>
            <h2 className="reveal">方案生成界面。</h2>
          </div>
          <figure className="reveal" style={{ margin: "40px 0 0" }}>
            <Image
              src="/images/agent-service-design.png"
              alt="服务设计 Agent 界面"
              width={3334}
              height={1644}
              style={{ width: "100%", height: "auto", borderRadius: 14, border: "1px solid var(--line)" }}
            />
            <figcaption className="sub" style={{ marginTop: 12 }}>
              录入项目信息，自动生成一套可执行的服务方案。
            </figcaption>
          </figure>
        </div>
      </section>

      {/* G. CTA */}
      <section className="endcta">
        <div className="wrap">
          <h2 className="reveal">
            把一个真实项目,
            <br />
            跑一次服务设计。
          </h2>
          <p className="reveal">带上你的项目信息来，当场看它出方案。</p>
          <div className="cta-row reveal">
            <Link
              href="/workshop"
              className="btn btn-primary"

            >
              预约 FMClaw™ 加速营 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
