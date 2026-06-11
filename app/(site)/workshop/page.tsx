import Link from "next/link";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">FMClaw™ 加速营 · FMClaw™ Bootcamp</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>把你自己的 AI,<br />亲手搭出来</h1>
          <p className="lead reveal">用 1–3 天,带着你的一个真问题来。我们一起把它跑通——跑通的东西,留给你。</p>
          <div className="cta-row reveal">
            <a href="#signup" className="btn btn-primary">预约 FMClaw™ 加速营 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
            <a href="#how" className="btn btn-ghost">看四步怎么走 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </div>
        </div>
      </section>

      {/* SOUL PREMISE */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">灵魂前提</span>
            <h2 className="reveal">前提只有一个。</h2>
          </div>
          <div className="premise-2">
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }}></div>
              <div className="big">一个你真正头疼的业务问题</div>
              <p>不是设想出来的题目,是这个月真的让你犯难的那件事。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }}></div>
              <div className="big">这个问题的真实数据</div>
              <p>表格、PDF、IoT、聊天记录都行。有数据,AI 才有得想。</p></div>
          </div>
          <p className="reveal" style={{ marginTop: "30px", fontFamily: "'Noto Sans SC',serif", fontSize: "22px", color: "var(--ink)", fontStyle: "italic" }}>没有这两样,就不是 FMClaw™ 加速营。</p>
        </div>
      </section>

      {/* FOUR STEPS */}
      <section className="band" id="how">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">你会经历什么</span>
            <h2 className="reveal">四步,从一个问题到一个能用的 Agent。</h2>
          </div>
          <div className="flow reveal" style={{ marginTop: "56px" }}>
            <div className="step"><div className="n">01</div><h4>把问题说清楚</h4><p>你带来一件真实业务,我们一起把它说成一句话。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="step"><div className="n">02</div><h4>接上数据与工具</h4><p>把你的数据接进来,钉钉 / 飞书 / 企微 / ERP 一并打通,约 72 小时内可调用。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="step"><div className="n">03</div><h4>现场拼出 Agent</h4><p>当着你的面,把能帮上这件事的 Agent 搭起来。</p>
              <svg className="arr" viewBox="0 0 24 24"><path d="M8 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></div>
            <div className="step"><div className="n">04</div><h4>跑通,并留给你</h4><p>用你的真实流程跑一遍,跑通的东西留下来继续用。</p></div>
          </div>
        </div>
      </section>

      {/* 适用场景 */}
      <section className="band alt" id="scenes">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">适用场景</span>
            <h2 className="reveal">不知道带什么问题来?这些是大家最常带来的。</h2>
            <p className="sub reveal">这些场景不是我们替你想象出来的——你带上自己的数据，我们当场把它跑通。</p>
          </div>
          <div className="scenes">
            <Link className="scene-c reveal" href="/scenarios/utility-bill">
              <div className="ic" style={{ background: "var(--gold)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M13 2L4 14h7l-1 8 9-12h-7z" strokeLinejoin="round" /></svg></div>
              <h4>水电费审批</h4>
              <p>签字那一刻，AI 已核完表、做完环比同比、标好异常，给出该签 / 不该签的依据。</p>
              <span className="go">看这个场景 <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
            <Link className="scene-c reveal" href="/scenarios/repair-bot">
              <div className="ic" style={{ background: "var(--blue)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <h4>报修智能客服</h4>
              <p>平台 Bot 7×24 守群不漏单，FMClaw 自动派单不到 1 分钟，下单人与接单人双向通知闭环。</p>
              <span className="go">看这个场景 <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
            <Link className="scene-c reveal" href="/scenarios/exec-query">
              <div className="ic" style={{ background: "var(--green)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M12 3a9 9 0 1 0 4 17l5 1-1.3-4.5A9 9 0 0 0 12 3z" strokeLinejoin="round" /><path d="M12 8a2.5 2.5 0 0 0-2.5 2.5c0 1.5 2.5 2 2.5 3.5" strokeLinecap="round" /><circle cx="12" cy="17" r=".6" fill="currentColor" /></svg></div>
              <h4>管理层问询</h4>
              <p>领导在钉钉里 @ 一句"A 楼上月能耗为什么超标"，AI 秒级给出带原因的回答与简报。</p>
              <span className="go">看这个场景 <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
            <Link className="scene-c reveal" href="/scenarios/reconciliation">
              <div className="ic" style={{ background: "var(--gold)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" /></svg></div>
              <h4>AI 对账</h4>
              <p>按合同自动核量、对比历史与市场、圈出异常、生成账单草稿，人只需确认或驳回。</p>
              <span className="go">看这个场景 <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
            <Link className="scene-c reveal" href="/scenarios/inspection">
              <div className="ic" style={{ background: "var(--green)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M3 7h3l2-2h8l2 2h3v12H3z" strokeLinejoin="round" /><circle cx="12" cy="13" r="3.2" /></svg></div>
              <h4>AI 质检</h4>
              <p>工单照片 / 视频自动采集，AI 视觉按统一标准评分打标，全量留痕证据链，人只看异常。</p>
              <span className="go">看这个场景 <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
            <Link className="scene-c reveal" href="/scenarios/dispatch">
              <div className="ic" style={{ background: "var(--blue)" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="12" cy="18" r="2.4" /><path d="M6 8.4v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3M12 13.4v2.2" strokeLinecap="round" /></svg></div>
              <h4>智能派单</h4>
              <p>工单进来自动定位、定级，按技能与负载派给合适的人，超时自动升级，人只需确认或改派。</p>
              <span className="go">看这个场景 <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            </Link>
          </div>
          <p className="reveal" style={{ marginTop: "30px", fontFamily: "'Noto Sans SC',serif", fontSize: "20px", color: "var(--ink)", fontStyle: "italic" }}>你的问题不在这几个里？正好，那更值得来跑一次。</p>
        </div>
      </section>

      {/* WHAT YOU TAKE AWAY */}
      <section className="band alt takeaway">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">你会带走什么</span>
            <h2 className="reveal">离开时,东西在你手上。</h2>
          </div>
          <div className="grid c3" style={{ marginTop: "48px" }}>
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }}></div><h3>一个还在运行的 Agent</h3><p>不是演示版,是接着你真实数据继续跑的那一个。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }}></div><h3>一份能复用的工作流</h3><p>这次跑通的路径,下个项目可以照着搬。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--gold)" }}></div><h3>一套共同语言</h3><p>中高管与一线,对"AI 到底帮上了什么"对齐了说法。</p></div>
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">为什么有效</span>
            <h2 className="reveal">它不靠讲,靠做。</h2>
          </div>
          <div className="why-list reveal" style={{ marginTop: "48px" }}>
            <div className="w"><h4>带上真问题</h4><p>从你真正犯难的那件事开始,不从模板开始。</p></div>
            <div className="w"><h4>用上真数据</h4><p>用你的数据跑,结果才是你的结果。</p></div>
            <div className="w"><h4>当面搭出来</h4><p>Agent 在你眼前长出来,你看得见每一步。</p></div>
            <div className="w"><h4>跑你的流程</h4><p>在你真实的业务流里跑通,不是沙盘演练。</p></div>
            <div className="w"><h4>留下能用的东西</h4><p>结束时带走的是成果,不是一份 PPT。</p></div>
            <div className="w"><h4>对齐一套语言</h4><p>决策层与执行层,从此说同一件事。</p></div>
          </div>
        </div>
      </section>

      {/* WHO SHOULD COME */}
      <section className="band alt who4">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">谁适合来</span>
            <h2 className="reveal">带得动决定、也带得来数据的人。</h2>
          </div>
          <div className="grid c4" style={{ marginTop: "48px" }}>
            <div className="card reveal"><div className="role">业主 · 行政</div><p>管着一批楼宇或园区,想从一件真实业务开始用 AI。</p></div>
            <div className="card reveal"><div className="role">物业 · FM 公司</div><p>想把一项服务接进 AI,看看交付能变成什么样。</p></div>
            <div className="card reveal"><div className="role">政府 · 国企平台</div><p>在为本地引入人工智能产业,想先看它真的怎么落。</p></div>
            <div className="card reveal"><div className="role">开发者 · 集成商</div><p>常年做智慧楼宇 / 园区,想拿到一套能直接交付的基座。</p></div>
          </div>
        </div>
      </section>

      {/* SIGNUP FORM */}
      <section className="band" id="signup">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">预约</span>
            <h2 className="reveal">把你的问题先告诉我们。</h2>
            <p className="sub reveal">我们会先看一眼这个问题适不适合做加速营,再和你约时间。</p>
          </div>
          <form className="form reveal" style={{ marginTop: "44px" }}>
            <div className="field-row">
              <div className="field"><label>公司 / 单位<span className="req">*</span></label><input type="text" required /></div>
              <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>职务</label><input type="text" /></div>
              <div className="field"><label>手机<span className="req">*</span></label><input type="tel" required /></div>
            </div>
            <div className="field"><label>邮箱</label><input type="email" /></div>
            <div className="field"><label>你最头疼的一个业务问题<span className="req">*</span></label>
              <textarea required placeholder="说一件这个月真的让你犯难的事。"></textarea>
              <div className="hint">200 字以内即可。这一栏决定了我们能不能帮上忙。</div>
            </div>
            <div className="field-row">
              <div className="field"><label>期望时间</label><input type="text" placeholder="如:7 月上旬" /></div>
              <div className="field"><label>是否需要保密协议</label>
                <select><option>视情况而定</option><option>需要</option><option>不需要</option></select></div>
            </div>
            <button className="btn btn-primary" type="button" style={{ marginTop: "6px" }}>提交预约 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          </form>
        </div>
      </section>

      {/* TIME & FEE */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">关于时间与费用</span></div>
          <p className="fee reveal" style={{ marginTop: "24px" }}>加速营为期 1–3 天,费用提前收取。如果之后进入正式合作,这笔费用可按比例抵扣。我们更在意的是,这几天里你是否真的带走了能用的东西。</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow reveal">常见疑问</span><h2 className="reveal">来之前,你可能想问的。</h2></div>
          <div className="faq reveal" style={{ marginTop: "40px" }}>
            <details><summary>我的数据不干净、不齐整,还能来吗?<svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></summary><div className="ans">能。真实数据本来就不干净。把它原样带来,整理是加速营的一部分。</div></details>
            <details><summary>一定要带能拍板的人吗?<svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></summary><div className="ans">最好。能拍板的人和真正在一线干活的人都在场,结论才落得下去。</div></details>
            <details><summary>这跟看一场 PPT、听一次案例分享有什么不同?<svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></summary><div className="ans">不一样。这里不讲产品参数,只用你的数据跑你的问题。离开时你带走的是一个还在运行的 Agent,不是一份材料。</div></details>
            <details><summary>结束之后,搭出来的东西归谁?<svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></summary><div className="ans">归你。跑通的工作流和你自己的数据都留在你这边。</div></details>
            <details><summary>我需要提前准备什么?<svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></summary><div className="ans">一个真问题、它的真实数据,以及一两位真正了解这件事的人。其余我们带来。</div></details>
            <details><summary>数据保密怎么保障?<svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></summary><div className="ans">可在开始前签保密协议,数据处理范围与去向都会写清楚。</div></details>
            <details><summary>1–3 天真的够吗?<svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg></summary><div className="ans">够跑通一个真实问题。它不是把所有事做完,而是让你亲眼确认这条路走得通。</div></details>
          </div>
        </div>
      </section>
    </main>
  );
}
