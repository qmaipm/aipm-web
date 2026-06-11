'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-gradient">
        <div className="cta-blob cta-blob-1"></div>
        <div className="cta-blob cta-blob-2"></div>
      </div>
      <div className="section-container">
        <div className="cta-content">
          <h2>准备好开始了吗？</h2>
          <p>立即体验启盟 AI，让您的物业管理迈入智能化时代</p>
          <div className="cta-actions">
            <Link href="#contact" className="btn-cta-primary">
              预约演示
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </Link>
            <Link href="#contact" className="btn-cta-secondary">
              联系销售
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
