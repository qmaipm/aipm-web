'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * 启盟科技 Footer 组件 v3.3
 * 
 * 设计规格：
 * ============================================
 * 梯形尺寸：
 * - 长边（右侧）：600px
 * - 短边（左侧）：360px  
 * - 差值：240px
 * - 斜边角度：arctan(240/1440) ≈ 9.5°
 * 
 * SVG装饰线：
 * - 两端各一条，中间留空（不连通）
 * - 线宽：24px
 * - 尖角设计（无圆角）
 * - 无毛玻璃效果（简洁清晰）
 * 
 * 按钮设计：
 * - 更小更精致
 * - 反光效果（顶部高光）
 * - 圆角6px
 * 
 * G线对齐（严格）：
 * - G1(0px)：内容区左边界
 * - G2(270px)：品牌区右边界
 * - G3(540px)："立即开始"按钮**左边界**对齐
 * - G4(810px)："联系销售"按钮**左边界**对齐
 * - G5(1080px)：内容区右边界
 * ============================================
 */

// 产品导航数据
const productLinks = [
  { name: '服务设计Agent', href: '#service-design' },
  { name: '运营管理Agent', href: '#operations' },
  { name: '质量评估Agent', href: '#quality' },
  { name: '服务优化Agent', href: '#review' },
  { name: '智能计薪系统', href: '#' },
  { name: '人员管理系统', href: '#' },
];

// 解决方案导航数据
const solutionLinks = [
  { name: '成本解决方案', href: '#' },
  { name: '质量解决方案', href: '#' },
  { name: '卫生间品质提升', href: '#' },
  { name: '设备巡检方案', href: '#' },
  { name: '消防巡检方案', href: '#' },
  { name: '电梯维保方案', href: '#' },
];

// 公司导航数据
const companyLinks = [
  { name: '关于我们', href: '#' },
  { name: '技术实力', href: '#' },
  { name: '成为合伙人', href: '#' },
  { name: '新闻中心', href: '#' },
  { name: '加入启盟', href: '#' },
  { name: '联系我们', href: '#contact' },
];

// 资源导航数据
const resourceLinks = [
  { name: '客户案例', href: '#' },
  { name: '博客', href: '#' },
  { name: '白皮书', href: '#' },
  { name: '行业报告', href: '#' },
  { name: '帮助中心', href: '#' },
  { name: '价格', href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // ===== 梯形设计参数 =====
  const TRAPEZOID = {
    longEdge: 600,    // 长边（右侧）
    shortEdge: 360,   // 短边（左侧）
    width: 1440,      // 标准视口宽度
    lineWidth: 24,    // SVG装饰线宽度
    leftLineLen: 360, // 左侧装饰线长度
    rightLineLen: 360,// 右侧装饰线长度
  };
  
  // 斜边差值
  const slopeDiff = TRAPEZOID.longEdge - TRAPEZOID.shortEdge; // 240px
  
  // 计算斜边上的Y坐标（给定X坐标）
  const getYOnSlope = (x: number) => {
    return TRAPEZOID.shortEdge + (x / TRAPEZOID.width) * slopeDiff;
  };
  
  // 左侧装饰线终点X坐标
  const leftEndX = TRAPEZOID.leftLineLen;
  // 右侧装饰线起点X坐标  
  const rightStartX = TRAPEZOID.width - TRAPEZOID.rightLineLen;
  
  return (
    <footer className="new-footer" data-testid="footer">
      {/* ===== CTA 区域 - 直角梯形背景 ===== */}
      <div className="footer-cta-section" data-testid="footer-cta-section">
        {/* 梯形背景 SVG */}
        <svg 
          className="footer-trapezoid-bg" 
          viewBox={`0 0 ${TRAPEZOID.width} ${TRAPEZOID.longEdge}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            {/* 梯形背景渐变 - 淡蓝/淡灰 */}
            <linearGradient id="trapezoidBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EEF2FF" />
              <stop offset="40%" stopColor="#F0F9FF" />
              <stop offset="100%" stopColor="#F5F7FA" />
            </linearGradient>
            
            {/* 左侧装饰线渐变 - 蓝→绿 */}
            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0070FF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#00A3FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#12B98A" stopOpacity="0.6" />
            </linearGradient>
            
            {/* 右侧装饰线渐变 - 金→紫 */}
            <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#D946EF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          
          {/* 主梯形背景 - 左短右长 */}
          <path 
            d={`M0 0 
                L${TRAPEZOID.width} 0 
                L${TRAPEZOID.width} ${TRAPEZOID.longEdge} 
                L0 ${TRAPEZOID.shortEdge} 
                Z`}
            fill="url(#trapezoidBg)"
          />
          
          {/* 左侧装饰线 - 无毛玻璃效果 */}
          <path 
            d={`M0 ${TRAPEZOID.shortEdge}
                L${leftEndX} ${getYOnSlope(leftEndX)}
                L${leftEndX} ${getYOnSlope(leftEndX) - TRAPEZOID.lineWidth}
                L0 ${TRAPEZOID.shortEdge - TRAPEZOID.lineWidth}
                Z`}
            fill="url(#leftGradient)"
          />
          
          {/* 右侧装饰线 - 无毛玻璃效果 */}
          <path 
            d={`M${rightStartX} ${getYOnSlope(rightStartX)}
                L${TRAPEZOID.width} ${TRAPEZOID.longEdge}
                L${TRAPEZOID.width} ${TRAPEZOID.longEdge - TRAPEZOID.lineWidth}
                L${rightStartX} ${getYOnSlope(rightStartX) - TRAPEZOID.lineWidth}
                Z`}
            fill="url(#rightGradient)"
          />
        </svg>
        
        {/* CTA 内容 - 严格对齐 G线布局 */}
        <div className="footer-cta-content">
          <div className="footer-cta-container" data-testid="footer-cta-container">
            {/* 左侧内容区 - G1~G2 */}
            <div className="footer-cta-left" data-testid="footer-cta-left">
              <span className="footer-cta-badge">开启智能物业新时代</span>
              <h2 className="footer-cta-title">准备好开始了吗？</h2>
              <p className="footer-cta-desc">
                立即体验启盟 AI，让您的物业管理迈入智能化时代
              </p>
            </div>
            
            {/* 右侧按钮区 - 严格对齐G3、G4 */}
            <div className="footer-cta-right" data-testid="footer-cta-right">
              {/* 立即开始 - 左边界对齐G3(540px) */}
              <Link href="#contact" className="footer-btn-primary" data-testid="btn-primary">
                <span>立即开始</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path 
                    d="M2.5 7h9M8 3l4 4-4 4" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              {/* 联系销售 - 左边界对齐G4(810px) */}
              <Link href="#contact" className="footer-btn-secondary" data-testid="btn-secondary">
                联系销售
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* ===== 底部导航区域 - 白色背景 ===== */}
      <div className="footer-nav-section" data-testid="footer-nav-section">
        <div className="footer-nav-container">
          {/* Logo 和品牌信息 - G1~G2 */}
          <div className="footer-brand" data-testid="footer-brand">
            <Link href="/" className="footer-logo">
              <Image 
                src="/logo-stalliance-cropped.png" 
                alt="启盟科技" 
                width={140}
                height={35}
                className="footer-logo-image"
                priority
              />
            </Link>
            <p className="footer-tagline">
              用 Agentic AI 重构物业管理价值链
            </p>
            
            {/* 联系信息 */}
            <div className="footer-contact">
              <a href="tel:400-888-1234" className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 11.3V13.8C14 14.1 13.8 14.3 13.5 14.3C6.8 14.1 1.5 8.8 1.4 2.1C1.4 1.8 1.6 1.6 1.9 1.6H4.4C4.7 1.6 4.9 1.8 4.9 2.1C5 3.3 5.3 4.5 5.7 5.6C5.8 5.8 5.7 6.1 5.5 6.2L4 7.7C5.2 10 6.6 11.4 8.9 12.6L10.4 11.1C10.6 10.9 10.8 10.8 11 10.9C12.1 11.3 13.3 11.6 14.5 11.7C14.8 11.7 15 11.9 15 12.2V11.3H14Z" fill="currentColor"/>
                </svg>
                400-888-1234
              </a>
              <a href="mailto:contact@qimeng.ai" className="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 3H2C1.45 3 1 3.45 1 4V12C1 12.55 1.45 13 2 13H14C14.55 13 15 12.55 15 12V4C15 3.45 14.55 3 14 3ZM14 5L8 9L2 5V4L8 8L14 4V5Z" fill="currentColor"/>
                </svg>
                contact@qimeng.ai
              </a>
            </div>
          </div>
          
          {/* 导航栏目 - G3~G5，四列均分 */}
          <div className="footer-nav-grid" data-testid="footer-nav-grid">
            <div className="footer-nav-col">
              <h4>产品</h4>
              <ul>
                {productLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-nav-col">
              <h4>解决方案</h4>
              <ul>
                {solutionLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-nav-col">
              <h4>公司</h4>
              <ul>
                {companyLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-nav-col">
              <h4>资源</h4>
              <ul>
                {resourceLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* ===== 版权信息 ===== */}
      <div className="footer-bottom-section" data-testid="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © {currentYear} 深圳启盟科技有限公司. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="#">隐私政策</Link>
            <span>|</span>
            <Link href="#">用户协议</Link>
            <span>|</span>
            <span className="footer-icp">粤ICP备12345678号</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
