'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import FlowingGradient from '@hp/components/ui/FlowingGradient';

// 数字递增动画 Hook
function useCountUp(end: number, duration: number = 2000, delay: number = 500) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * end);
      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);
    
    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, delay]);
  
  return count;
}

export default function Hero() {
  // 数据卡片动画数值
  const serviceScore = useCountUp(92, 2000); // 92分
  const arrivalRate = useCountUp(985, 2000); // 98.5%
  const costReduction = useCountUp(18, 2000); // -18%

  return (
    <section className="hero">
      {/* VI v16 流动渐变背景 - 速度3.0x 饱和度160% */}
      <div className="hero-gradient">
        <FlowingGradient 
          speed={3.0}
          blur={60}
          saturate={160}
          brightness={105}
        />
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          {/* 标题 - 简洁两行 */}
          <h1 className="hero-title-dark">
            用 <span className="text-highlight">Agentic AI</span><br/>重构物业管理价值链
          </h1>
          
          {/* 描述文字 - 深色简洁 */}
          <p className="hero-desc hero-desc-dark">
            部署专业分工、协同作业的 AI Agent 矩阵，实现从规划、执行到复盘的人机协同闭环，
            实现服务质量和成本的全链路优化。
          </p>
          
          <div className="hero-actions">
            {/* CTA 按钮：主按钮"现在开始"，次按钮"联系销售" */}
            <Link href="#contact" className="btn-hero-primary">
              <span className="btn-text">现在开始</span>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span className="btn-shine"></span>
            </Link>
            <Link href="#contact" className="btn-hero-secondary">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4h2v2h-2V6zm0 4h2v4h-2v-4z" fill="currentColor"/>
              </svg>
              联系销售
            </Link>
          </div>
        </div>
        
        {/* 右侧视觉区：手机日报 + PC Dashboard */}
        <div className="hero-visual hero-visual-dashboard">
          
          {/* 外层大卡片容器 - 项目经营分析 */}
          <div className="dashboard-wrapper">
            <div className="dashboard-outer">
              {/* Dashboard 头部 */}
              <div className="dashboard-header-bar">
                <div className="dashboard-title-row">
                  <span className="dashboard-icon">
                    {/* AI + 物业建筑 SVG 图标 */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* 建筑轮廓 */}
                      <path d="M3 21V8L12 3L21 8V21H15V15H9V21H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      {/* AI 芯片在建筑中心 */}
                      <rect x="9" y="9" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="rgba(0, 112, 255, 0.2)"/>
                      {/* 芯片节点 */}
                      <circle cx="10.5" cy="11" r="0.8" fill="currentColor"/>
                      <circle cx="13.5" cy="11" r="0.8" fill="currentColor"/>
                      {/* 信号波 */}
                      <path d="M7 6C9 5 10.5 4.5 12 4.5C13.5 4.5 15 5 17 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
                    </svg>
                  </span>
                  <span className="dashboard-title">AI 物业经理</span>
                </div>
                <div className="dashboard-status">
                  <span className="status-dot"></span>
                  <span>实时同步</span>
                </div>
              </div>
              
              {/* Dashboard 内容区 */}
              <div className="dashboard-content">
                
                {/* 左侧：手机模拟器 - 今日日报 */}
                <div className="phone-mockup phone-silver phone-large">
                  <div className="phone-frame">
                    <div className="phone-notch"></div>
                    
                    <div className="phone-screen">
                      {/* 顶部标题 */}
                      <div className="phone-header">
                        <span className="phone-title">今日服务概览</span>
                        <span className="phone-date">1月7日</span>
                      </div>
                      
                      {/* 今日服务评分 - 核心指标 */}
                      <div className="phone-card phone-card-main">
                        <div className="main-score">
                          <span className="main-score-value">{serviceScore}</span>
                          <span className="main-score-label">今日服务评分</span>
                        </div>
                        <div className="main-score-chart">
                          <svg viewBox="0 0 80 40" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="score-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#12B98A" stopOpacity="0.4"/>
                                <stop offset="100%" stopColor="#12B98A" stopOpacity="0"/>
                              </linearGradient>
                            </defs>
                            <path d="M0,35 Q20,30 40,25 T80,15" fill="none" stroke="#12B98A" strokeWidth="2.5"/>
                            <path d="M0,35 Q20,30 40,25 T80,15 L80,40 L0,40 Z" fill="url(#score-grad)"/>
                          </svg>
                        </div>
                        <div className="main-score-trend">
                          <span className="trend-up">↑ 较昨日 +3</span>
                        </div>
                      </div>
                      
                      {/* 今日数据网格 */}
                      <div className="phone-stats-grid">
                        <div className="phone-stat">
                          <span className="stat-value">98.5%</span>
                          <span className="stat-label">服务到岗</span>
                        </div>
                        <div className="phone-stat">
                          <span className="stat-value">96.2%</span>
                          <span className="stat-label">巡查完成</span>
                        </div>
                      </div>
                      
                      {/* 今日任务 */}
                      <div className="phone-card phone-card-tasks">
                        <div className="tasks-header">
                          <span>今日任务</span>
                          <span className="tasks-badge">80%</span>
                        </div>
                        <div className="tasks-list">
                          <div className="task-item done">
                            <span className="task-dot done"></span>
                            <span>A座大堂清洁</span>
                          </div>
                          <div className="task-item done">
                            <span className="task-dot done"></span>
                            <span>停车场巡检</span>
                          </div>
                          <div className="task-item warning">
                            <span className="task-dot warning"></span>
                            <span>B1栋8F男卫巡查</span>
                          </div>
                          <div className="task-item alert">
                            <span className="task-dot alert"></span>
                            <span>3#机房温度异常</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="phone-home-indicator"></div>
                  </div>
                </div>
                
                {/* 右侧：趋势面板 - 本月经营分析 */}
                <div className="trends-panel">
                  <div className="trends-header">
                    <span className="trends-title">本月经营趋势</span>
                  </div>
                  
                  {/* 服务质量趋势 */}
                  <div className="trend-card">
                    <div className="trend-info">
                      <span className="trend-label">服务质量</span>
                      <div className="trend-value-row">
                        <span className="trend-value">{serviceScore}</span>
                        <span className="trend-unit">分</span>
                        <span className="trend-arrow up">↑</span>
                      </div>
                    </div>
                    <div className="trend-chart">
                      <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="trend-green" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#12B98A" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#12B98A" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,30 C15,28 30,24 50,18 C70,12 85,8 100,5" fill="none" stroke="#12B98A" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M0,30 C15,28 30,24 50,18 C70,12 85,8 100,5 L100,36 L0,36 Z" fill="url(#trend-green)"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* 服务到岗率趋势 */}
                  <div className="trend-card">
                    <div className="trend-info">
                      <span className="trend-label">服务到岗率</span>
                      <div className="trend-value-row">
                        <span className="trend-value">{(arrivalRate / 10).toFixed(1)}</span>
                        <span className="trend-unit">%</span>
                        <span className="trend-arrow up">↑</span>
                      </div>
                    </div>
                    <div className="trend-chart">
                      <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="trend-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0070FF" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#0070FF" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,28 C20,25 40,20 60,14 C80,8 90,6 100,4" fill="none" stroke="#0070FF" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M0,28 C20,25 40,20 60,14 C80,8 90,6 100,4 L100,36 L0,36 Z" fill="url(#trend-blue)"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* 人力成本趋势 */}
                  <div className="trend-card">
                    <div className="trend-info">
                      <span className="trend-label">人力成本</span>
                      <div className="trend-value-row">
                        <span className="trend-value cost">-{costReduction}</span>
                        <span className="trend-unit">%</span>
                        <span className="trend-arrow down">↓</span>
                      </div>
                    </div>
                    <div className="trend-chart">
                      <svg viewBox="0 0 100 36" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="trend-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,6 C20,10 40,16 60,22 C80,28 90,30 100,32" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
                        <path d="M0,6 C20,10 40,16 60,22 C80,28 90,30 100,32 L100,36 L0,36 Z" fill="url(#trend-gold)"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* 累计节省 */}
                  <div className="trends-footer">
                    <span className="footer-label">本月累计节省</span>
                    <span className="footer-value">¥128,000</span>
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
