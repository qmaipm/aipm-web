import Link from "next/link";
import Image from "next/image";
import { FOOTER_COLS } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div>
            <div className="brand"><Image src="/images/logo-white.webp" alt="启盟科技 Stalliance" width={384} height={113} /></div>
            <p className="tagline">物业与设施管理的 AI 操作系统。把 AI 接进每天的运营，从一个真实业务开始。</p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h5>{col.title}</h5>
              {col.links.map((l) => (
                <Link className="fl" href={l.href} key={l.label}>{l.label}</Link>
              ))}
            </div>
          ))}
          <div className="ft-qr">
            <h5>公众号</h5>
            <Image className="ft-qr-img" src="/images/wx.jpg" alt="启盟科技公众号二维码" width={108} height={108} />
            <p className="ft-qr-cap">微信扫码关注</p>
          </div>
        </div>
      </div>
      <div className="ft-bot">
        <span>© 2026 启盟科技 · FMClaw™</span>
        <span className="ft-legal">
          <Link href="/legal/privacy">隐私政策</Link>
          <Link href="/legal/terms">服务条款</Link>
          <Link href="/legal/cookies">Cookie 声明</Link>
        </span>
        <span className="ft-beian">
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer">粤公网安备44011202003241号</a>
          <span className="bsep">|</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" rel="noopener noreferrer">粤ICP备17131755号</a>
        </span>
      </div>
    </footer>
  );
}
