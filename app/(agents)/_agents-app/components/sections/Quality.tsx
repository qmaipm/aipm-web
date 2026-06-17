'use client';

import Link from 'next/link';

export default function Quality() {
  return (
    <section id="quality" className="feature-section">
      <div className="section-container">
        <div className="feature-layout">
          <div className="feature-content">
            <div className="feature-badge blue-green">
              <span>✅</span> 质量评估 Agent
            </div>
            <h2 className="feature-title">
              AI 自动审图质检，<br/>让质量管理更轻松
            </h2>
            <p className="feature-desc">
              AI 替代人工审图，大幅降低审图成本，客观评分消除甲乙方质量评价分歧，
              留存数据标签助力复盘。
            </p>
            <ul className="feature-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M18 13l-5-5-9 9" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div>
                  <strong>智能设备管理系统</strong>
                  <span>人单合一的拍照抄表</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <div>
                  <strong>智能多模态巡检系统</strong>
                  <span>AI视觉 + IoT联合巡检</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M10 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <strong>小智帮手</strong>
                  <span>一线移动端智能助手</span>
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
            <div className="quality-demo">
              <div className="demo-phone">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  <div className="phone-header">AI 巡查助理</div>
                  <div className="phone-upload">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <rect x="4" y="4" width="32" height="32" rx="4" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
                      <path d="M20 14v12M14 20h12" stroke="#9CA3AF" strokeWidth="2"/>
                    </svg>
                    <span>现场拍照上传</span>
                  </div>
                </div>
              </div>
              <div className="demo-arrow">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%">
                      <stop offset="0%" stopColor="#0070FF"/>
                      <stop offset="100%" stopColor="#12B98A"/>
                    </linearGradient>
                  </defs>
                  <path d="M8 16h16M18 10l6 6-6 6" stroke="url(#arrow-grad)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="demo-result">
                <div className="result-header">AI 评分详情</div>
                <div className="result-body">
                  <div className="score-ring">
                    <svg viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="35" stroke="#E5E7EB" strokeWidth="6" fill="none"/>
                      <circle 
                        cx="40" cy="40" r="35" 
                        stroke="url(#score-grad)" strokeWidth="6" fill="none" 
                        strokeDasharray="220" strokeDashoffset="17.6" strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                      />
                      <defs>
                        <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0070FF"/>
                          <stop offset="100%" stopColor="#12B98A"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="score-num">92</span>
                  </div>
                  <div className="score-bars">
                    <div className="score-bar-item">
                      <span>整洁度</span>
                      <div className="score-bar"><div className="score-fill" style={{ width: '95%' }}></div></div>
                      <span>95</span>
                    </div>
                    <div className="score-bar-item">
                      <span>完整性</span>
                      <div className="score-bar"><div className="score-fill" style={{ width: '90%' }}></div></div>
                      <span>90</span>
                    </div>
                    <div className="score-bar-item">
                      <span>规范性</span>
                      <div className="score-bar"><div className="score-fill" style={{ width: '88%' }}></div></div>
                      <span>88</span>
                    </div>
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
