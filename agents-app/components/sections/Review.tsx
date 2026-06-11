'use client';

import Link from 'next/link';

export default function Review() {
  return (
    <section id="review" className="feature-section alt">
      <div className="section-container">
        <div className="feature-layout reverse">
          <div className="feature-content">
            <div className="feature-badge pink-gold">
              <span>📊</span> 复盘优化 Agent
            </div>
            <h2 className="feature-title">
              业务自动化核算，<br/>数据驱动持续优化
            </h2>
            <p className="feature-desc">
              AI 自动完成工资、KPI、账单核算，深度分析运营数据生成洞察报告，
              优化服务标准与成本，展示卓越能力。
            </p>
            <ul className="feature-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 2v16M14 4H8a3 3 0 000 6h4a3 3 0 010 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <strong>智能计薪系统</strong>
                  <span>薪酬与 KPI 自动化核算</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M16 16V8M10 16V4M4 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <strong>数据大屏及报告生成</strong>
                  <span>展示卓越服务能力</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div>
                  <strong>API 开放平台</strong>
                  <span>数据导出与第三方集成</span>
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
            <div className="stats-visual">
              <div className="stats-grid">
                <div className="stat-card-mini">
                  <span className="stat-value-mini">-20%</span>
                  <span className="stat-label-mini">人力成本</span>
                </div>
                <div className="stat-card-mini">
                  <span className="stat-value-mini">100%</span>
                  <span className="stat-label-mini">核算准确率</span>
                </div>
                <div className="stat-card-mini">
                  <span className="stat-value-mini">3x</span>
                  <span className="stat-label-mini">管理效率</span>
                </div>
                <div className="stat-card-mini">
                  <span className="stat-value-mini">实时</span>
                  <span className="stat-label-mini">数据更新</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
