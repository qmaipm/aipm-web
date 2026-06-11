'use client';

import Link from 'next/link';

// SVG 图标 - 与 Navbar/AgentShowcase 保持一致
const Icons = {
  agentDesign: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="6" r="3" fill="#10B981"/>
    </svg>
  ),
  agentOps: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  agentQuality: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8.5 12L10.5 14L15.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  agentReview: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
};

const products = [
  {
    icon: 'agentDesign',
    title: '服务设计 Agent',
    desc: '智能生成服务标准、人员编制和预算方案',
    href: '#agent-showcase',
    glowClass: 'blue-purple',
    color: '#0070FF',
  },
  {
    icon: 'agentOps',
    title: '运营管理 Agent',
    desc: '7×24实时感知全域服务状态，确保执行到位',
    href: '#agent-showcase',
    glowClass: 'green-gold',
    color: '#10B981',
  },
  {
    icon: 'agentQuality',
    title: '质量评估 Agent',
    desc: 'AI替代人工审图，客观评分消除评价分歧',
    href: '#agent-showcase',
    glowClass: 'blue-green',
    color: '#8B5CF6',
  },
  {
    icon: 'agentReview',
    title: '复盘优化 Agent',
    desc: '业务自动化核算，数据驱动持续优化',
    href: '#agent-showcase',
    glowClass: 'pink-gold',
    color: '#F59E0B',
  },
];

export default function Products() {
  return (
    <section id="products" className="products">
      <div className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">模块化 AI 解决方案</span>
          <h2 className="section-title">
            一体化物业管理<br/>
            <span className="gradient-text">AI 产品套件</span>
          </h2>
          <p className="section-desc">
            使用一个完全集成的 AI 驱动平台，降低成本、提升质量，更高效地运营你的物业服务。
            让 AI 物业经理处理从规划到执行到复盘的全流程，助力推出新的服务模式。
          </p>
        </div>
        
        <div className="products-grid">
          {products.map((product) => (
            <Link key={product.title} href={product.href} className="product-card">
              <div className={`card-glow ${product.glowClass}`}></div>
              <div className="card-icon" style={{ color: product.color }}>
                {Icons[product.icon as keyof typeof Icons]}
              </div>
              <h3>{product.title}</h3>
              <p>{product.desc}</p>
              <div className="card-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
