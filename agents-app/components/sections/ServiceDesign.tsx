'use client';

import Link from 'next/link';

export default function ServiceDesign() {
  return (
    <section id="service-design" className="feature-section">
      <div className="section-container">
        <div className="feature-layout">
          <div className="feature-content">
            <div className="feature-badge blue-purple">
              <span>🎯</span> 服务设计 Agent
            </div>
            <h2 className="feature-title">
              智能生成服务标准，<br/>重构服务设计流程
            </h2>
            <p className="feature-desc">
              AI 智能生成服务标准、人员编制和预算方案，用远低于现在的成本，
              获得更加快速、精准的数字化服务设计能力。
            </p>
            <ul className="feature-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M2 7h16M7 17V7" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div>
                  <strong>智能物业空间管理系统</strong>
                  <span>空间配置与标准生成</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 2L2 7v6l8 5 8-5V7l-8-5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <div>
                  <strong>智能服务配置系统</strong>
                  <span>服务流程与标准设计</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M4 15V5M10 15V2M16 15v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <strong>API 开放平台</strong>
                  <span>标准数据接口</span>
                </div>
              </li>
            </ul>
            <Link href="#contact" className="btn-feature">
              联系我们
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </Link>
          </div>
          
          <div className="feature-visual">
            <div className="visual-window">
              <div className="window-header">
                <div className="window-dots">
                  <span></span><span></span><span></span>
                </div>
                <span className="window-title">空间配置系统</span>
              </div>
              <div className="window-content">
                <div className="config-row">
                  <span className="config-label">项目名称</span>
                  <span className="config-value">科技园区A座</span>
                </div>
                <div className="config-row">
                  <span className="config-label">建筑面积</span>
                  <span className="config-value">85,000 m²</span>
                </div>
                <div className="config-row">
                  <span className="config-label">服务等级</span>
                  <span className="config-badge">高端商务</span>
                </div>
                <div className="config-divider"></div>
                <div className="config-metrics">
                  <div className="config-metric">
                    <span className="metric-num">12</span>
                    <span className="metric-label">服务模块</span>
                  </div>
                  <div className="config-metric">
                    <span className="metric-num">48</span>
                    <span className="metric-label">人员编制</span>
                  </div>
                  <div className="config-metric">
                    <span className="metric-num">¥2.8M</span>
                    <span className="metric-label">年度预算</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
