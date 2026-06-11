import Link from "next/link";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">人工智能产业共建</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>来本地投资兴业,<br />与贵区共建本地人工智能产业</h1>
          <p className="lead reveal">这不是一次试点采购。我们带着资金、技术与运营团队来本地落地,与贵区一起承接国家人工智能产业战略——产业、税收、就业与数据资产,沉淀在本地。</p>
        </div>
      </section>

      {/* 1 · 一页读懂 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">一页读懂</span>
            <h2 className="reveal">我们与贵区在谈的,是一件什么事。</h2>
          </div>
          <div className="onepage">
            <div className="opi reveal"><div className="no">01</div><div><h3>国家任务</h3><p>「十五五」末,国家为人工智能相关产业规模定下了远大目标。这份时代任务,需要在地方层面找到能落地的真实场景——地方人工智能产业落地,是承接的关键一步。</p></div></div>
            <div className="opi reveal"><div className="no">02</div><div><h3>行业窗口</h3><p>2026 年两会,物业管理行业首次写入国务院政府工作报告;住建部随后采纳,将「物业管理」升级为「物业服务」。一个管理相对落后的劳动密集型行业,恰是 AI 增效管理与具身智能用武的天然主场景。</p></div></div>
            <div className="opi reveal"><div className="no">03</div><div><h3>核心方法</h3><p>政府先行先试做制度性协同,以承接 AI 带来的管理范式变化;企业以「AI 接管重复性的管理协调、一线服务岗位原则上不动」的方法承接落地。制度在前,落地在后。</p></div></div>
            <div className="opi reveal"><div className="no">04</div><div><h3>共建路径</h3><p>以贵区国有物业为起点,先打样板、再做合资、后向区域推广;五年扎根,逐步培育出一个区域级的人工智能服务业产业集群。</p></div></div>
            <div className="opi reveal"><div className="no">05</div><div><h3>双方角色</h3><p>贵区主导路径设计,提供场景与政策协同;我方投入资金、技术与运营团队,承担产业培育的主体责任——产业、税收、就业与数据资产沉淀本地。</p></div></div>
          </div>
          <p className="scenario-quote reveal" style={{ marginTop: "46px" }}>这不是采购 AI 服务,是与贵区共建一个本地 AI 产业。</p>
        </div>
      </section>

      {/* 2 · 为什么是国有物业 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">为什么是国有物业</span>
            <h2 className="reveal">AI 落地最快的,正是国有物业。</h2>
            <p className="sub reveal">国有物业 AI 化,既是政府用场景换产业最大的一块底盘,也是当下 AI 与机器人最真实的商用战场。</p>
          </div>
          <div className="grid c2" style={{ marginTop: "48px" }}>
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }}></div><h3>无处不在的底盘</h3><p>办公园区、商业综合体、人才公寓、医院、学校、工业厂区——贵区几乎每一栋楼都在物业管理覆盖之内。这是政府用场景换产业最大的一块底盘。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }}></div><h3>城市治理的最后一公里</h3><p>物业是城市治理触达居民、企业、园区的毛细血管。它已从「管理」升级为「服务」,纳入国家级民生议题。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--gold)" }}></div><h3>人力越重,AI 杠杆越长</h3><p>物业是典型的劳动密集行业,中基层每天在做大量高频、标准、可量化的管理动作;人力越重的地方,AI 能撬动的空间就越大。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--purple)" }}></div><h3>AI 机器人最大的商用场景</h3><p>商用清洁、安保、巡检乃至人形机器人,当前几乎都在物业场景里跑。这是 AI 在物理世界第一块真正跑通的商业版图。</p></div>
          </div>
        </div>
      </section>

      {/* 3 · 以投带产(核心) */}
      <section className="band dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal" style={{ color: "var(--gold)" }}>以投带产 · 核心模式</span>
            <h2 className="reveal" style={{ color: "#fff" }}>不是卖给贵区一套系统,<br />是把一个产业投到本地。</h2>
          </div>
          <div className="dcards">
            <div className="dcard reveal"><div className="k" style={{ background: "var(--gold)" }}></div><h3>贵方零投入</h3><p>不采购设备、不投入固定资产、不承担技术风险。国企 / 园区按 FM 服务合同付费,且持平或低于现有物业支出。</p></div>
            <div className="dcard reveal"><div className="k" style={{ background: "var(--blue)" }}></div><h3>我们出资、出技术、出团队</h3><p>在本地注册子公司、本地纳税、本地招聘;运维与技术团队常驻,持续运营与迭代。</p></div>
            <div className="dcard reveal"><div className="k" style={{ background: "var(--green)" }}></div><h3>产业留在本地</h3><p>产业、税收、就业与数据资产沉淀在本地;一个项目跑通,辖区内的楼宇与园区可快速复制。</p></div>
          </div>

          <div className="cycle reveal">
            <div className="cyc">
              <div className="lab">我方投入</div>
              <h4>资金 · 技术 · 团队</h4>
              <p>把 AI 物业管理系统、IoT 传感器与服务机器人,投资部署到本地楼宇与园区。</p>
            </div>
            <div className="cyc-ar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div className="cyc">
              <div className="lab">本地落地</div>
              <h4>固定资产 · 本地企业</h4>
              <p>形成本地的固定资产,并在本地注册、运营起一家 AI 企业,工商税务全在贵辖区。</p>
            </div>
            <div className="cyc-ar"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            <div className="cyc">
              <div className="lab">本地沉淀</div>
              <h4>产业 · 税收 · 就业 · 数据</h4>
              <p>营收、税收、就业与多业态数据资产沉淀本地;样板跑通后,辖区可快速复制。</p>
            </div>
          </div>
          <span className="zerobadge reveal">贵方零投入 · 零采购风险</span>
          <p className="faint reveal">具体基金规模与结构,面议时详述。</p>
        </div>
      </section>

      {/* 4 · 五年会沉淀出什么 */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">五年沉淀</span>
            <h2 className="reveal">五年后,贵区会培育出一家什么样的 AI 公司。</h2>
            <p className="sub reveal">从单个样板起步,到规模化部署,再向区域辐射——这是一条由场景生长出产业的递进路径。</p>
          </div>
          <div className="stages">
            <div className="stage reveal"><div className="ph">Stage 01 · 起步</div><h3>先打样板</h3><p>在少量楼宇做出样板,跑通一套可复制的 AI 化运营。</p></div>
            <div className="stage reveal"><div className="ph">Stage 02 · 规模化</div><h3>合资共建</h3><p>以合资方式扩大部署,把样板复制到更多业态与楼宇。</p></div>
            <div className="stage reveal"><div className="ph">Stage 03 · 区域辐射</div><h3>产业辐射</h3><p>能力向区域外溢,逐步形成区域级的人工智能服务业集群。</p></div>
          </div>
          <div className="stagebar reveal"><i style={{ background: "var(--blue)" }}></i><i style={{ background: "var(--green)" }}></i><i style={{ background: "var(--gold)" }}></i></div>

          <div className="grid c3" style={{ marginTop: "54px" }}>
            <div className="card reveal"><div className="k" style={{ background: "var(--blue)" }}></div><h3>一家本地 AI 企业</h3><p>子公司注册在本地,工商税务、营收与税收归属本地,持续运营。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--green)" }}></div><h3>机器人与具身智能载体</h3><p>区域领先的服务机器人与具身智能商用运营能力,沉淀在本地。</p></div>
            <div className="card reveal"><div className="k" style={{ background: "var(--gold)" }}></div><h3>多业态数据资产</h3><p>跨业态沉淀的结构化数据,成为本地数据要素的源头。</p></div>
          </div>
        </div>
      </section>

      {/* 5 · 联系 */}
      <section className="band alt">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">联系</span>
            <h2 className="reveal">剩下的,见面详谈。</h2>
            <p className="sub reveal">欢迎地方招商局、商务局、国资委及国企平台联系。无论是政府 AI 招商、国有物业 AI 化运营,还是国企 AI 转型,留下联系方式,我们带方案当面来谈。</p>
          </div>
          <form className="form reveal" style={{ marginTop: "44px" }}>
            <div className="field-row">
              <div className="field"><label>单位<span className="req">*</span></label><input type="text" required /></div>
              <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>职务</label><input type="text" /></div>
              <div className="field"><label>电话<span className="req">*</span></label><input type="tel" required /></div>
            </div>
            <div className="field"><label>邮箱</label><input type="email" /></div>
            <div className="field"><label>留言</label><textarea placeholder="可简单说明来意,例如所在辖区与希望对接的方向。"></textarea></div>
            <button className="btn btn-primary" type="button" style={{ marginTop: "6px" }}>提交联系方式 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          </form>
        </div>
      </section>
    </main>
  );
}
