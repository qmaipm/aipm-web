import Link from "next/link";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* HERO */}
      <section className="phero">
        <div className="hero-mesh"></div>
        <div className="wrap">
          <span className="eyebrow reveal">联系我们</span>
          <h1 className="reveal" style={{ marginTop: "20px" }}>联系我们</h1>
          <p className="lead reveal">不论是想多了解一点,还是已经有具体的事,都欢迎写信给我们。我们会认真读、尽快回。</p>
        </div>
      </section>

      {/* FORM */}
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow reveal">给我们写信</span>
            <h2 className="reveal">告诉我们你想聊什么。</h2>
          </div>
          <form className="form reveal" style={{ marginTop: "44px" }}>
            <div className="field"><label>咨询类型<span className="req">*</span></label>
              <select required>
                <option value="">请选择</option>
                <option>产品咨询</option>
                <option>商务合作</option>
                <option>媒体采访</option>
                <option>投资交流</option>
                <option>加入我们</option>
              </select></div>
            <div className="field-row">
              <div className="field"><label>公司 / 单位</label><input type="text" /></div>
              <div className="field"><label>姓名<span className="req">*</span></label><input type="text" required /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>邮箱<span className="req">*</span></label><input type="email" required /></div>
              <div className="field"><label>电话</label><input type="tel" /></div>
            </div>
            <div className="field"><label>留言</label><textarea placeholder="简单说说你的需求或问题。"></textarea></div>
            <button className="btn btn-primary" type="button" style={{ marginTop: "6px" }}>提交 <svg className="ar" width="15" height="15" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          </form>
        </div>
      </section>

      {/* INFO */}
      <section className="band alt">
        <div className="wrap">
          <div className="grid c2" style={{ alignItems: "start" }}>
            <div className="reveal">
              <div className="sec-head"><span className="eyebrow">联系方式</span></div>
              <div className="deflist" style={{ marginTop: "28px" }}>
                <div className="row"><div className="k">总部地址</div><div className="v">待补充</div></div>
                <div className="row"><div className="k">邮箱</div><div className="v">待补充</div></div>
                <div className="row"><div className="k">电话</div><div className="v">待补充</div></div>
              </div>
              <div className="social">
                <a href="#">知乎</a>
                <a href="#">微博</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
            <div className="reveal">
              <div className="sec-head"><span className="eyebrow">公众号</span></div>
              <div style={{ marginTop: "28px" }}>
                <div className="qr">二维码占位</div>
                <p className="qr-cap">微信扫码关注启盟科技公众号(占位)。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
