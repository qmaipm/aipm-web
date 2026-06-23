import "./page.css";
import ContactForm from "./ContactForm";

export default function Page() {
  return (
    <main className="solct">
      {/* HERO — 蓝图网格冷调 */}
      <section className="ct-hero">
        <div className="ct-grid" aria-hidden="true" />
        <div className="wrap ct-hero-top">
          <h1 className="ct-h1">联系我们</h1>
          <p className="ct-lead">
            不论是想多了解一点，还是已经有具体的事要谈——<b>填表、打电话、发邮件</b>都行。我们会认真读、尽快回。
          </p>
        </div>
      </section>

      {/* CONTACT: form + info sidebar */}
      <section className="ct-band">
        <div className="wrap">
          <div className="ct-layout">
            {/* 左:表单 */}
            <div className="ct-form-col">
              <span className="ct-eyebrow">联系我们</span>
              <p className="ct-sub">带 <span className="req">*</span> 的为必填项，其余可留空。</p>
              <ContactForm />
            </div>

            {/* 右:联系信息侧栏 */}
            <aside className="ct-aside">
              <div className="ct-card">
                <div className="ct-card-h">联系方式</div>
                <dl className="ct-list">
                  <div><dt>总部地址</dt><dd>广州市黄埔区开泰大道30号之一801房</dd></div>
                  <div><dt>总部电话</dt><dd><a href="tel:02089853580">020-89853580</a></dd></div>
                  <div><dt>市场合作</dt><dd><a href="mailto:liuziwen@aipm.cn">liuziwen@aipm.cn</a></dd></div>
                  <div><dt>融资洽谈</dt><dd><a href="mailto:linbaona@aipm.cn">linbaona@aipm.cn</a></dd></div>
                  <div><dt>全国服务监督热线</dt><dd><a href="tel:4000066553">400-006-6553</a></dd></div>
                </dl>
              </div>

              <div className="ct-card ct-qr-card">
                <div className="ct-card-h">公众号</div>
                <div className="ct-qr"><img src="/images/wx.jpg" alt="启盟科技公众号二维码" width={148} height={148} /></div>
                <p className="ct-qr-cap">微信扫码关注启盟科技公众号。</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
