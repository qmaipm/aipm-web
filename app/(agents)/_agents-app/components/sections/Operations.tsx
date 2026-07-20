'use client';

import Link from 'next/link';

export default function Operations() {
  return (
    <section id="operations" className="feature-section alt">
      <div className="section-container">
        <div className="feature-layout reverse">
          <div className="feature-content">
            <div className="feature-badge green-gold">
              <span>👁️</span> 运营管理 Agent
            </div>
            <h2 className="feature-title">
              AI 驱动运营调度，<br/>实现人机协同闭环
            </h2>
            <p className="feature-desc">
              7×24 实时感知全域服务状态，确保执行与巡检到位，
              数据驱动管理决策，让团队专注更具价值的事务。
            </p>
            <ul className="feature-list">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <strong>SSR 智能服务记录系统</strong>
                  <span>无感记录服务全过程</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M13 2v4M7 2v4M3 9h14" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div>
                  <strong>智能工单调度系统</strong>
                  <span>数据驱动的任务分配</span>
                </div>
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="6" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="14" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8.5 12l3-4" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <div>
                  <strong>智能人机协同调度引擎</strong>
                  <span>人与机器人协同服务</span>
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
            <div className="visual-dashboard">
              <div className="dashboard-mini-header">
                <span>运营总览</span>
                <span className="live-indicator">
                  <span className="live-dot"></span>
                  实时
                </span>
              </div>
              <div className="dashboard-mini-content">
                <div className="mini-tasks">
                  <div className="mini-task completed">
                    <span className="mini-status"></span>
                    <span>A座大堂清洁</span>
                    <span className="mini-time">09:00</span>
                  </div>
                  <div className="mini-task completed">
                    <span className="mini-status"></span>
                    <span>停车场巡检</span>
                    <span className="mini-time">10:30</span>
                  </div>
                  <div className="mini-task active">
                    <span className="mini-status"></span>
                    <span>绿化养护作业</span>
                    <span className="mini-time">进行中</span>
                  </div>
                  <div className="mini-task pending">
                    <span className="mini-status"></span>
                    <span>设备维保检查</span>
                    <span className="mini-time">14:00</span>
                  </div>
                </div>
                <div className="mini-ring">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none"/>
                    <circle 
                      cx="50" cy="50" r="40" 
                      stroke="url(#ring-grad)" strokeWidth="8" fill="none" 
                      strokeDasharray="251.2" strokeDashoffset="50" strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <defs>
                      <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0070FF"/>
                        <stop offset="100%" stopColor="#12B98A"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="ring-text">
                    <span className="ring-value">80%</span>
                    <span className="ring-label">今日完成</span>
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
