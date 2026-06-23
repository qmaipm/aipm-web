'use client';

/**
 * 服务设计 Agent 调试页面 - 完整版
 * 
 * 入场动画 + 四个图标轮播 + 手机界面切换
 * 
 * 入场动画序列：
 * 1. 图标入场 - 四个图标淡入/滑入
 * 2. 首个图标激活 - 服务设计Agent点亮，发射线
 * 3. 边框环绕 - 射线触达边框后上下分开，绕到右侧汇合
 * 4. 内容容器描边 - 手机内各卡片边框渐变描绘
 * 5. 淡出过渡 - 描边线淡出，进入正常轮播
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// ==========================================
// 布局常量
// ==========================================
const LAYOUT = {
  animationWidth: 540,
  animationHeight: 600,
  iconSize: 48,
  innerIconSize: 28,
  iconGap: 12,
  phoneWidth: 280,
  phoneHeight: 560,
};

// ==========================================
// 入场动画配置（可复用）
// ==========================================
type EntryPhase = 
  | 'idle'              // 等待触发
  | 'icons-enter'       // 图标入场
  | 'line-to-edge'      // 射线连接到边框位置
  | 'border-trace'      // 边框环绕（描绘手机边框）- 射线保持
  | 'phone-appear'      // 手机边框出现 - 射线保持
  | 'content-fade-in'   // 内容淡入 - 射线保持
  | 'display'           // 停留展示 - 射线保持
  | 'line-fade-out'     // 射线淡出（切换前）
  | 'complete';         // 完成，进入正常轮播

const ENTRY_ANIMATION_CONFIG = {
  // 各阶段持续时间（毫秒）
  // 顺序：图标入场 → 射线连接 → 边框描绘 → 手机出现 → 内容淡入 → 停留展示 → 射线淡出 → 进入轮播
  durations: {
    iconsEnter: 800,      // 图标入场
    lineToEdge: 600,      // 射线到边框位置
    borderTrace: 1000,    // 边框环绕描绘（射线保持）
    phoneAppear: 600,     // 手机边框出现（射线保持）
    contentFadeIn: 1400,  // 内容淡入（更慢更优雅）
    displayTime: 1000,    // 停留展示
    lineFadeOut: 500,     // 射线淡出（切换前才淡出）
  },
  // 颜色配置
  colors: {
    primary: { start: '#0070FF', end: '#12B98A' },
    secondary: { start: '#9333EA', end: '#EC4899' },
  },
};

// ==========================================
// 轮播动画配置
// ==========================================
const ANIMATION_CONFIG = {
  iconDuration: 6000, // 每个图标 6 秒
  phases: {
    // 阶段1：图标点亮 + 射线绘制
    iconActivate: { start: 0, end: 0.08 },      // 图标点亮 0-8%
    lineDrawing: { start: 0.06, end: 0.20 },    // 射线绘制 6%-20%
    screenActivate: { start: 0.18, end: 0.23 }, // 屏幕激活 18%-23%
    // 阶段2：脉冲效果（主要停留时间）
    pulse1: { start: 0.23, end: 0.40 },         // 脉冲1 23%-40%
    pulse2: { start: 0.38, end: 0.55 },         // 脉冲2 38%-55%
    // 阶段3：图标熄灭 + 射线淡出（射线淡出结束=周期结束，无缝衔接）
    iconDeactivate: { start: 0.53, end: 0.65 }, // 图标熄灭 53%-65%
    lineFading: { start: 0.63, end: 1.0 },      // 射线淡出 63%-100%（淡出到周期结束）
    // 无 transition 阶段：射线淡出完成时，下一个周期立即开始
    transition: { start: 1.0, end: 1.0 },       // 无过渡，直接切换
  },
};

type AnimationPhase = 'icon-activating' | 'line-drawing' | 'screen-activating' | 'pulse1' | 'pulse2' | 'icon-deactivating' | 'line-fading' | 'transition';

// ==========================================
// SVG 图标
// ==========================================
const Icons = {
  agentDesign: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 40h18M33 7a4.24 4.24 0 016 6L14 38l-8 2 2-8L33 7z"/>
    </svg>
  ),
  space: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="36" height="36" rx="4"/>
      <path d="M6 18h36M18 42V18"/>
    </svg>
  ),
  config: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12h8M24 12h16M8 24h16M32 24h8M8 36h8M24 36h16"/>
      <circle cx="20" cy="12" r="3"/>
      <circle cx="28" cy="24" r="3"/>
      <circle cx="20" cy="36" r="3"/>
    </svg>
  ),
  api: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8l-8 8 8 8M32 24l8 8-8 8"/>
      <path d="M28 8L20 40"/>
    </svg>
  ),
};

// ==========================================
// 动画工具函数
// ==========================================
function getPhaseProgress(progress: number, phase: { start: number; end: number }): number {
  if (progress < phase.start) return 0;
  if (progress > phase.end) return 1;
  return (progress - phase.start) / (phase.end - phase.start);
}

function getAnimationPhase(progress: number): AnimationPhase {
  const { phases } = ANIMATION_CONFIG;
  if (progress < phases.iconActivate.end) return 'icon-activating';
  if (progress < phases.lineDrawing.end) return 'line-drawing';
  if (progress < phases.screenActivate.end) return 'screen-activating';
  if (progress < phases.pulse1.end) return 'pulse1';
  if (progress < phases.pulse2.end) return 'pulse2';
  if (progress < phases.iconDeactivate.end) return 'icon-deactivating';
  if (progress < phases.lineFading.end) return 'line-fading';
  return 'transition';
}

function getGradientStops(
  progress: number,
  startColor: string,
  endColor: string
): { offset: number; color: string }[] {
  const phase = getAnimationPhase(progress);
  const { phases } = ANIMATION_CONFIG;
  
  if (['line-drawing', 'icon-activating', 'screen-activating'].includes(phase)) {
    return [{ offset: 0, color: startColor }, { offset: 100, color: startColor }];
  }
  
  if (phase === 'pulse1') {
    const p1 = getPhaseProgress(progress, phases.pulse1);
    if (p1 >= 1) return [{ offset: 0, color: endColor }, { offset: 100, color: endColor }];
    return [
      { offset: 0, color: endColor },
      { offset: p1 * 100, color: endColor },
      { offset: Math.min(100, p1 * 100 + 2), color: startColor },
      { offset: 100, color: startColor },
    ];
  }
  
  if (phase === 'pulse2') {
    const p2 = getPhaseProgress(progress, phases.pulse2);
    if (p2 >= 1) return [{ offset: 0, color: startColor }, { offset: 100, color: startColor }];
    return [
      { offset: 0, color: startColor },
      { offset: p2 * 100, color: startColor },
      { offset: Math.min(100, p2 * 100 + 2), color: endColor },
      { offset: 100, color: endColor },
    ];
  }
  
  return [{ offset: 0, color: startColor }, { offset: 100, color: startColor }];
}

function getLineState(progress: number, isCurrentIcon: boolean) {
  if (!isCurrentIcon) return { drawing: 0, opacity: 0, fadeProgress: -1 };
  
  const phase = getAnimationPhase(progress);
  const { phases } = ANIMATION_CONFIG;
  
  if (phase === 'line-drawing') {
    return { drawing: getPhaseProgress(progress, phases.lineDrawing), opacity: 1, fadeProgress: -1 };
  }
  if (['screen-activating', 'pulse1', 'pulse2', 'icon-deactivating'].includes(phase)) {
    return { drawing: 1, opacity: 1, fadeProgress: -1 };
  }
  if (phase === 'line-fading') {
    return { drawing: 1, opacity: 1, fadeProgress: getPhaseProgress(progress, phases.lineFading) };
  }
  return { drawing: 0, opacity: 0, fadeProgress: -1 };
}

function getIconActivation(progress: number, isCurrentIcon: boolean) {
  if (!isCurrentIcon) return { isActive: false, progress: 0 };
  
  const phase = getAnimationPhase(progress);
  const { phases } = ANIMATION_CONFIG;
  
  if (phase === 'icon-activating') {
    return { isActive: true, progress: getPhaseProgress(progress, phases.iconActivate) };
  }
  if (['line-drawing', 'screen-activating', 'pulse1', 'pulse2'].includes(phase)) {
    return { isActive: true, progress: 1 };
  }
  if (phase === 'icon-deactivating') {
    const p = getPhaseProgress(progress, phases.iconDeactivate);
    return { isActive: p < 1, progress: 1 - p };
  }
  return { isActive: false, progress: 0 };
}

// ==========================================
// 通用手机UI组件
// ==========================================

// 状态栏
function StatusBar() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 16px 4px',
      fontSize: '10px',
      fontWeight: 500,
      color: '#1e293b',
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
          <rect x="0" y="3" width="3" height="7" rx="0.5"/>
          <rect x="4" y="2" width="3" height="8" rx="0.5"/>
          <rect x="8" y="0" width="3" height="10" rx="0.5"/>
        </svg>
        <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
          <path d="M6 2C3.5 2 1.5 3.5 0 5.5C1.5 7.5 3.5 9 6 9C8.5 9 10.5 7.5 12 5.5C10.5 3.5 8.5 2 6 2Z"/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
          <div style={{ width: '18px', height: '8px', border: '1px solid currentColor', borderRadius: '2px', padding: '1px' }}>
            <div style={{ width: '70%', height: '100%', backgroundColor: 'currentColor', borderRadius: '1px' }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// 导航栏
function NavBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderBottom: '0.5px solid #f1f5f9',
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0070FF',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '9px', color: '#94a3b8' }}>{subtitle}</div>}
      </div>
      <div style={{
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748b',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="19" r="2"/>
        </svg>
      </div>
    </div>
  );
}

// 底部安全区
function SafeArea() {
  return <div style={{ height: '20px', flexShrink: 0 }} />;
}

// ==========================================
// 手机界面组件
// ==========================================

// 界面1: 空间管理 - 写实版项目/楼栋录入
function SpaceManagementScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <StatusBar />
      
      {/* Hero 区域 - 项目概览 */}
      <div style={{
        background: 'linear-gradient(135deg, #0070FF 0%, #00C2FF 100%)',
        padding: '14px 16px 18px',
        borderRadius: '0 0 20px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          right: -20,
          top: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <div style={{
          position: 'absolute',
          right: 30,
          bottom: -30,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', position: 'relative' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>启盟广场</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>商业综合体 · 深圳南山</div>
          </div>
          <div style={{
            marginLeft: 'auto',
            padding: '4px 8px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            fontSize: '9px',
            color: 'white',
          }}>
            编辑中
          </div>
        </div>
        
        {/* 楼栋选择 */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['A1栋', 'A2栋', 'A3栋', 'A4栋'].map((name, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '8px 4px',
              backgroundColor: i === 0 ? 'white' : 'rgba(255,255,255,0.15)',
              color: i === 0 ? '#0070FF' : 'rgba(255,255,255,0.9)',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: 600,
              boxShadow: i === 0 ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
            }}>
              {name}
            </div>
          ))}
        </div>
      </div>
      
      {/* 内容区 */}
      <div style={{ flex: 1, padding: '12px', overflow: 'auto', fontSize: '11px', marginTop: '-8px' }}>
        {/* A1栋配置卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>A1栋 · 楼层配置</div>
            <div style={{ 
              padding: '3px 8px', 
              backgroundColor: '#f0f9ff', 
              borderRadius: '6px',
              fontSize: '9px',
              color: '#0070FF',
              fontWeight: 500,
            }}>已配置</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div style={{ 
              padding: '12px', 
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
              borderRadius: '10px',
              border: '1px solid #bae6fd',
            }}>
              <div style={{ fontSize: '9px', color: '#0284c7', marginBottom: '4px' }}>总楼层</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0c4a6e' }}>
                17<span style={{ fontSize: '10px', fontWeight: 400, color: '#64748b' }}> 层</span>
              </div>
            </div>
            <div style={{ 
              padding: '12px', 
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
              borderRadius: '10px',
              border: '1px solid #bbf7d0',
            }}>
              <div style={{ fontSize: '9px', color: '#15803d', marginBottom: '4px' }}>单层面积</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#14532d' }}>
                1,500<span style={{ fontSize: '10px', fontWeight: 400, color: '#64748b' }}> ㎡</span>
              </div>
            </div>
          </div>
          
          {/* 楼层选择器 */}
          <div style={{ 
            fontSize: '10px', 
            color: '#64748b', 
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span>选择楼层</span>
            <span style={{ color: '#0070FF', fontWeight: 500 }}>8F</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {[...Array(17)].map((_, i) => (
              <div key={i} style={{
                width: '26px',
                height: '26px',
                background: i === 7 ? 'linear-gradient(135deg, #0070FF 0%, #00C2FF 100%)' : 'white',
                color: i === 7 ? 'white' : '#64748b',
                border: i === 7 ? 'none' : '1px solid #e2e8f0',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 600,
                boxShadow: i === 7 ? '0 2px 8px rgba(0,112,255,0.35)' : 'none',
              }}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        
        {/* 8楼详情卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          border: '1.5px solid #0070FF30',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ 
              padding: '4px 10px', 
              background: 'linear-gradient(135deg, #0070FF 0%, #00C2FF 100%)',
              color: 'white', 
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 600,
            }}>8F</div>
            <div style={{ fontSize: '11px', fontWeight: 500, color: '#1e293b' }}>当前编辑楼层</div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '11px', 
            padding: '10px 0', 
            borderBottom: '1px solid #f1f5f9' 
          }}>
            <span style={{ color: '#64748b' }}>楼层面积</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>1,500 ㎡</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '11px', 
            padding: '10px 0' 
          }}>
            <span style={{ color: '#64748b' }}>服务点位</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>48 个</span>
          </div>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div style={{ padding: '12px 16px 8px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9' }}>
        <div style={{
          padding: '14px',
          background: 'linear-gradient(135deg, #0070FF 0%, #00C2FF 100%)',
          color: 'white',
          borderRadius: '14px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,112,255,0.35)',
        }}>
          保存配置
        </div>
      </div>
      <SafeArea />
    </div>
  );
}

// 界面2: 服务配置 - 写实版清洁服务配置
function ServiceConfigScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <StatusBar />
      
      {/* Hero 区域 */}
      <div style={{
        background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
        padding: '12px 16px 16px',
        borderRadius: '0 0 20px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          left: -30,
          top: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          right: 20,
          bottom: -20,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        
        {/* 返回和标题 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', position: 'relative' }}>
          <div style={{
            width: '28px',
            height: '28px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>服务配置</div>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.8)' }}>A1栋 · 8F · 男卫生间</div>
          </div>
        </div>
        
        {/* 工种选择 */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { name: '清洁', icon: '🧹', active: true },
            { name: '安保', icon: '🛡️', active: false },
            { name: '工程', icon: '🔧', active: false },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '10px 6px',
              background: item.active ? 'white' : 'rgba(255,255,255,0.15)',
              color: item.active ? '#9333EA' : 'rgba(255,255,255,0.9)',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: item.active ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
            }}>
              <div style={{ fontSize: '16px', marginBottom: '2px' }}>{item.icon}</div>
              <div style={{ fontSize: '10px', fontWeight: 600 }}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 内容区 */}
      <div style={{ flex: 1, padding: '12px', overflow: 'auto', fontSize: '11px', marginTop: '-8px' }}>
        {/* 服务地点卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>服务点位</div>
            <div style={{ 
              padding: '3px 8px', 
              backgroundColor: '#faf5ff', 
              borderRadius: '6px',
              fontSize: '9px',
              color: '#9333EA',
              fontWeight: 500,
            }}>已选择</div>
          </div>
          
          {/* 位置路径 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}>
            <div style={{ 
              padding: '6px 10px', 
              background: 'linear-gradient(135deg, #0070FF 0%, #00C2FF 100%)',
              color: 'white', 
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 600,
            }}>A1栋</div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            <div style={{ 
              padding: '6px 10px', 
              background: 'linear-gradient(135deg, #12B98A 0%, #34D399 100%)',
              color: 'white', 
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 600,
            }}>8楼</div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            <div style={{ 
              padding: '6px 10px', 
              background: 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
              color: 'white', 
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 600,
            }}>男卫生间</div>
          </div>
          
          {/* 点位名称 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: '#9333EA15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333EA" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <span style={{ marginLeft: '10px', color: '#1e293b', fontSize: '12px', fontWeight: 500 }}>A1栋8楼男卫生间</span>
          </div>
        </div>
        
        {/* 服务详情卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '14px',
          marginBottom: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>服务详情</div>
          
          {/* 服务类型 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #f1f5f9',
          }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>服务类型</span>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              padding: '4px 10px',
              backgroundColor: '#f1f5f9',
              borderRadius: '6px',
            }}>
              <span style={{ fontSize: '11px', color: '#1e293b', fontWeight: 500 }}>日常清洁</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
          
          {/* 服务SOP */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #f1f5f9',
          }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>服务SOP</span>
            <div style={{ 
              padding: '5px 10px', 
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
              borderRadius: '8px',
              fontSize: '10px',
              color: '#15803d',
              fontWeight: 600,
              border: '1px solid #bbf7d0',
            }}>
              超甲级卫生间清洁
            </div>
          </div>
          
          {/* 服务频次 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
          }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>服务频次</span>
            <div style={{ 
              padding: '5px 14px', 
              background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
              borderRadius: '14px',
              fontSize: '12px',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(147,51,234,0.3)',
            }}>
              6次/天
            </div>
          </div>
        </div>
        
        {/* 服务时段卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '14px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ 
            fontSize: '11px', 
            fontWeight: 600, 
            color: '#1e293b', 
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>服务时段</span>
            <span style={{ fontSize: '10px', color: '#9333EA', fontWeight: 500 }}>共6次</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((time, i) => (
              <div key={i} style={{
                padding: '10px 8px',
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                borderRadius: '10px',
                fontSize: '11px',
                color: '#7c3aed',
                fontWeight: 600,
                textAlign: 'center',
                border: '1px solid #e9d5ff',
              }}>
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div style={{ padding: '12px 16px 8px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9' }}>
        <div style={{
          padding: '14px',
          background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
          color: 'white',
          borderRadius: '14px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(147,51,234,0.35)',
        }}>
          确认配置
        </div>
      </div>
      <SafeArea />
    </div>
  );
}

// 界面3: 服务设计Agent - 写实版数据总览与AI测算结果
function DataOverviewScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <StatusBar />
      
      {/* Hero 区域 - 更精致 */}
      <div style={{
        background: 'linear-gradient(135deg, #0070FF 0%, #12B98A 100%)',
        padding: '14px 16px 22px',
        borderRadius: '0 0 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          right: -30,
          top: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <div style={{
          position: 'absolute',
          left: 40,
          bottom: -40,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', position: 'relative' }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>启盟广场</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)' }}>服务方案总览</div>
          </div>
          <div style={{
            padding: '4px 10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            fontSize: '9px',
            color: 'white',
            fontWeight: 500,
          }}>
            AI 优化
          </div>
        </div>
        
        {/* 核心数据 - 2x2布局 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.18)', 
            borderRadius: '14px', 
            padding: '12px 10px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginBottom: '4px' }}>服务面积</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>133,270<span style={{ fontSize: '9px', fontWeight: 400, opacity: 0.8 }}> ㎡</span></div>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.18)', 
            borderRadius: '14px', 
            padding: '12px 10px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginBottom: '4px' }}>服务点位</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>817<span style={{ fontSize: '9px', fontWeight: 400, opacity: 0.8 }}> 个</span></div>
          </div>
        </div>
      </div>
      
      {/* 内容区 */}
      <div style={{ flex: 1, padding: '12px', overflow: 'auto', marginTop: '-10px' }}>
        {/* AI 资源测算卡片 - 核心内容 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            marginBottom: '14px',
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #0070FF 0%, #12B98A 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
            }}>✨</div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>AI 资源测算</span>
            <div style={{
              marginLeft: 'auto',
              padding: '2px 6px',
              background: 'linear-gradient(135deg, #0070FF 0%, #12B98A 100%)',
              borderRadius: '4px',
              fontSize: '8px',
              color: 'white',
              fontWeight: 500,
            }}>已优化</div>
          </div>
          
          {/* 人员 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '12px',
            marginBottom: '8px',
            border: '1px solid #bae6fd',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0070FF 0%, #0ea5e9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                boxShadow: '0 2px 8px rgba(0,112,255,0.3)',
              }}>👤</div>
              <div>
                <div style={{ fontSize: '10px', color: '#0284c7' }}>人员编制</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0c4a6e' }}>17 <span style={{ fontSize: '10px', fontWeight: 400 }}>人</span></div>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
          
          {/* 机器人 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '12px',
            marginBottom: '8px',
            border: '1px solid #bbf7d0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #12B98A 0%, #34D399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                boxShadow: '0 2px 8px rgba(18,185,138,0.3)',
              }}>🤖</div>
              <div>
                <div style={{ fontSize: '10px', color: '#15803d' }}>智能机器人</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#14532d' }}>9 <span style={{ fontSize: '10px', fontWeight: 400 }}>台</span></div>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
          
          {/* 预算 */}
          <div style={{
            padding: '14px',
            background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
            borderRadius: '12px',
            border: '1px solid #e9d5ff',
          }}>
            <div style={{ fontSize: '10px', color: '#7c3aed', marginBottom: '6px' }}>月度预算</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#9333EA' }}>¥</span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#7c3aed' }}>103,200</span>
                <span style={{ fontSize: '10px', color: '#a78bfa', marginLeft: '4px' }}>/月</span>
              </div>
              <div style={{
                padding: '4px 8px',
                backgroundColor: '#9333EA15',
                borderRadius: '6px',
                fontSize: '9px',
                color: '#9333EA',
                fontWeight: 500,
              }}>节省 12%</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div style={{ padding: '12px 16px 8px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9' }}>
        <div style={{
          padding: '14px',
          background: 'linear-gradient(135deg, #0070FF 0%, #12B98A 100%)',
          color: 'white',
          borderRadius: '14px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(0,112,255,0.35)',
        }}>
          生成方案报告
        </div>
      </div>
      <SafeArea />
    </div>
  );
}

// 界面4: API平台 - 写实版API接口与数据对接界面
function DesignResultScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <StatusBar />
      
      {/* Hero 区域 */}
      <div style={{
        background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
        padding: '14px 16px 20px',
        borderRadius: '0 0 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          right: -20,
          top: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        <div style={{
          position: 'absolute',
          left: 20,
          bottom: -30,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        
        {/* 标题区 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', position: 'relative' }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M16 8l-8 8 8 8M32 24l8 8-8 8"/>
              <path d="M10 4l4 16"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>开放平台</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)' }}>API & 数据服务</div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#4ade80',
              boxShadow: '0 0 6px #4ade80',
            }} />
            <span style={{ fontSize: '9px', color: 'white', fontWeight: 500 }}>运行中</span>
          </div>
        </div>
        
        {/* 状态指标 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.18)', 
            borderRadius: '12px', 
            padding: '10px 8px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>1,247</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>今日调用</div>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.18)', 
            borderRadius: '12px', 
            padding: '10px 8px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>23ms</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>响应时间</div>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.18)', 
            borderRadius: '12px', 
            padding: '10px 8px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>99.9%</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>可用率</div>
          </div>
        </div>
      </div>
      
      {/* 内容区 */}
      <div style={{ flex: 1, padding: '12px', overflow: 'auto', fontSize: '11px', marginTop: '-10px' }}>
        {/* API 列表卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
              }}>🔌</div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>数据接口</span>
            </div>
            <span style={{ fontSize: '10px', color: '#9333EA', fontWeight: 500 }}>4个活跃</span>
          </div>
          
          {[
            { name: '空间数据同步', method: 'POST', status: 'active', calls: '324', path: '/api/v1/space/sync' },
            { name: '服务计划查询', method: 'GET', status: 'active', calls: '512', path: '/api/v1/plans' },
            { name: '工单状态推送', method: 'POST', status: 'active', calls: '289', path: '/api/v1/orders/status' },
            { name: '设备状态上报', method: 'PUT', status: 'pending', calls: '122', path: '/api/v1/devices' },
          ].map((api, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              marginBottom: i < 3 ? '8px' : 0,
              backgroundColor: '#fafafa',
              borderRadius: '10px',
              border: '1px solid #f1f5f9',
            }}>
              <div style={{
                padding: '4px 8px',
                background: api.method === 'GET' 
                  ? 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' 
                  : api.method === 'POST' 
                    ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' 
                    : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                color: api.method === 'GET' ? '#1d4ed8' : api.method === 'POST' ? '#15803d' : '#a16207',
                borderRadius: '6px',
                fontSize: '9px',
                fontWeight: 700,
                marginRight: '10px',
              }}>{api.method}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', color: '#1e293b', fontWeight: 600 }}>{api.name}</div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontFamily: 'monospace' }}>{api.path}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#1e293b', fontWeight: 600 }}>{api.calls}</div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  justifyContent: 'flex-end',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: api.status === 'active' ? '#12B98A' : '#F59E0B',
                    boxShadow: api.status === 'active' ? '0 0 4px #12B98A' : 'none',
                  }} />
                  <span style={{ fontSize: '8px', color: '#94a3b8' }}>次</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 已对接系统卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
              }}>🔗</div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>已对接系统</span>
            </div>
            <span style={{ fontSize: '10px', color: '#12B98A', fontWeight: 500 }}>12个</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {[
              { name: 'ERP系统', icon: '📊', status: '同步中' },
              { name: 'IoT平台', icon: '📡', status: '已连接' },
              { name: '财务系统', icon: '💰', status: '已连接' },
              { name: 'HR系统', icon: '👥', status: '已连接' },
            ].map((sys, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}>{sys.icon}</div>
                <div>
                  <div style={{ fontSize: '10px', color: '#1e293b', fontWeight: 600 }}>{sys.name}</div>
                  <div style={{ fontSize: '8px', color: '#12B98A' }}>{sys.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 底部按钮 */}
      <div style={{ padding: '12px 16px 8px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9' }}>
        <div style={{
          padding: '14px',
          background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
          color: 'white',
          borderRadius: '14px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(147,51,234,0.35)',
        }}>
          查看API文档
        </div>
      </div>
      <SafeArea />
    </div>
  );
}

// ==========================================
// 服务设计动画组件 - 可复用版本
// 完整保留原始动画逻辑，仅移除调试页面外壳
// ==========================================

interface ServiceDesignAnimationProps {
  /** 是否当前激活（激活时从头播放，切走时停止） */
  isActive?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export default function ServiceDesignAnimation({
  isActive = true,
  style,
  className,
}: ServiceDesignAnimationProps) {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [prevIconIndex, setPrevIconIndex] = useState(3);
  const [progress, setProgress] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  
  // ========== 入场动画状态 ==========
  const [entryPhase, setEntryPhase] = useState<EntryPhase>('idle');
  const [entryProgress, setEntryProgress] = useState(0);
  const [borderTraceProgress, setBorderTraceProgress] = useState(0);
  const [entryLineProgress, setEntryLineProgress] = useState(0);
  const [phoneAppearProgress, setPhoneAppearProgress] = useState(0);
  const [contentFadeInProgress, setContentFadeInProgress] = useState(0);
  const [entryLineFadeOut, setEntryLineFadeOut] = useState(0);
  const entryStartTime = useRef<number | null>(null);
  
  // ========== isActive 变化时重置状态 ==========
  useEffect(() => {
    if (isActive) {
      // 激活：重置所有状态，从头开始入场动画
      setCurrentIconIndex(0);
      setPrevIconIndex(3);
      setProgress(0);
      setSlideOffset(0);
      setEntryPhase('icons-enter');
      setEntryProgress(0);
      setBorderTraceProgress(0);
      setEntryLineProgress(0);
      setPhoneAppearProgress(0);
      setContentFadeInProgress(0);
      setEntryLineFadeOut(0);
      entryStartTime.current = null;
    } else {
      // 切走：停止动画，重置到 idle
      setEntryPhase('idle');
      entryStartTime.current = null;
    }
  }, [isActive]);
  
  // ========== 布局计算（与调试页完全一致）==========
  const centerX = LAYOUT.animationWidth / 2;
  const phoneLeft = centerX - LAYOUT.phoneWidth / 2;
  const phoneTop = (LAYOUT.animationHeight - LAYOUT.phoneHeight) / 2;
  const phoneRight = phoneLeft + LAYOUT.phoneWidth;
  
  const leftX = LAYOUT.iconGap;
  const rightX = LAYOUT.animationWidth - LAYOUT.iconGap - LAYOUT.iconSize;

  // ========== 图标配置（与调试页完全一致）==========
  const icons = useMemo(() => [
    { 
      id: 'agent', 
      icon: Icons.agentDesign, 
      name: '服务设计', 
      x: leftX, 
      y: 140, 
      startColor: '#0070FF',
      endColor: '#12B98A',
      lineStart: 'bottom' as const,
      lineDirection: 'right' as const,
      screen: <DataOverviewScreen />,
    },
    { 
      id: 'space', 
      icon: Icons.space, 
      name: '空间管理', 
      x: leftX, 
      y: 340, 
      startColor: '#0070FF',
      endColor: '#12B98A',
      lineStart: 'bottom' as const,
      lineDirection: 'right' as const,
      screen: <SpaceManagementScreen />,
    },
    { 
      id: 'config', 
      icon: Icons.config, 
      name: '服务配置', 
      x: rightX, 
      y: 230, 
      startColor: '#9333EA',
      endColor: '#EC4899',
      lineStart: 'bottom' as const,
      lineDirection: 'left' as const,
      screen: <ServiceConfigScreen />,
    },
    { 
      id: 'api', 
      icon: Icons.api, 
      name: 'API平台', 
      x: rightX, 
      y: 430, 
      startColor: '#9333EA',
      endColor: '#EC4899',
      lineStart: 'top' as const,
      lineDirection: 'left' as const,
      screen: <DesignResultScreen />,
    },
  ], [leftX, rightX]);

  // ========== 入场动画循环 ==========
  useEffect(() => {
    // idle 或 complete 状态不运行入场动画
    if (!isActive || entryPhase === 'idle' || entryPhase === 'complete') return;
    
    let animationFrame: number;
    const durations = ENTRY_ANIMATION_CONFIG.durations;
    
    const animateEntry = (timestamp: number) => {
      if (!entryStartTime.current) entryStartTime.current = timestamp;
      const elapsed = timestamp - entryStartTime.current;
      
      const phase1End = durations.iconsEnter;
      const phase2End = phase1End + durations.lineToEdge;
      const phase3End = phase2End + durations.borderTrace;
      const phase4End = phase3End + durations.phoneAppear;
      const phase5End = phase4End + durations.contentFadeIn;
      const phase6End = phase5End + durations.displayTime;
      const phase7End = phase6End + durations.lineFadeOut;
      
      if (elapsed < phase1End) {
        setEntryPhase('icons-enter');
        setEntryProgress(elapsed / phase1End);
      } else if (elapsed < phase2End) {
        setEntryPhase('line-to-edge');
        setEntryProgress((elapsed - phase1End) / durations.lineToEdge);
        setEntryLineProgress((elapsed - phase1End) / durations.lineToEdge);
      } else if (elapsed < phase3End) {
        setEntryPhase('border-trace');
        setEntryProgress((elapsed - phase2End) / durations.borderTrace);
        setBorderTraceProgress((elapsed - phase2End) / durations.borderTrace);
        setEntryLineProgress(1);
      } else if (elapsed < phase4End) {
        setEntryPhase('phone-appear');
        setEntryProgress((elapsed - phase3End) / durations.phoneAppear);
        setPhoneAppearProgress((elapsed - phase3End) / durations.phoneAppear);
        setBorderTraceProgress(1);
      } else if (elapsed < phase5End) {
        setEntryPhase('content-fade-in');
        setEntryProgress((elapsed - phase4End) / durations.contentFadeIn);
        setContentFadeInProgress((elapsed - phase4End) / durations.contentFadeIn);
        setPhoneAppearProgress(1);
      } else if (elapsed < phase6End) {
        setEntryPhase('display');
        setContentFadeInProgress(1);
      } else if (elapsed < phase7End) {
        setEntryPhase('line-fade-out');
        setEntryLineFadeOut((elapsed - phase6End) / durations.lineFadeOut);
      } else {
        setEntryPhase('complete');
        setCurrentIconIndex(1);
        setPrevIconIndex(0);
        return;
      }
      
      animationFrame = requestAnimationFrame(animateEntry);
    };
    
    animationFrame = requestAnimationFrame(animateEntry);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, entryPhase]);

  // ========== 轮播动画循环 ==========
  useEffect(() => {
    // 只有激活且入场完成后才开始轮播
    if (!isActive || entryPhase !== 'complete') return;
    
    let animationFrame: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const totalDuration = ANIMATION_CONFIG.iconDuration * icons.length;
      const offsetTime = ANIMATION_CONFIG.iconDuration * 1;
      const totalProgress = ((elapsed + offsetTime) % totalDuration) / totalDuration;
      
      const iconIndex = Math.floor(totalProgress * icons.length) % icons.length;
      const iconProgress = (totalProgress * icons.length) % 1;
      
      setCurrentIconIndex(prev => {
        if (prev !== iconIndex) {
          setPrevIconIndex(prev);
        }
        return iconIndex;
      });
      setProgress(iconProgress);
      
      const lineDrawingEnd = ANIMATION_CONFIG.phases.lineDrawing.end;
      const slideInDuration = 0.08;
      
      if (iconProgress < lineDrawingEnd) {
        setSlideOffset(100);
      } else if (iconProgress < lineDrawingEnd + slideInDuration) {
        const slideProgress = (iconProgress - lineDrawingEnd) / slideInDuration;
        setSlideOffset((1 - slideProgress) * 100);
      } else {
        setSlideOffset(0);
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, icons.length, entryPhase]);

  // ========== 路径计算函数（与调试页完全一致）==========
  const getPhoneBorderPath = useCallback(() => {
    const r = 24;
    const x = phoneLeft + 4;
    const y = phoneTop + 4;
    const w = LAYOUT.phoneWidth - 8;
    const h = LAYOUT.phoneHeight - 8;
    const midY = y + h / 2;
    
    const topPath = `M ${x} ${midY} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${midY}`;
    const bottomPath = `M ${x} ${midY} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h} L ${x + w - r} ${y + h} Q ${x + w} ${y + h} ${x + w} ${y + h - r} L ${x + w} ${midY}`;
    
    return { topPath, bottomPath, midY };
  }, [phoneLeft, phoneTop]);

  const getLinePath = useCallback((icon: typeof icons[0]) => {
    const iconCenterX = icon.x + LAYOUT.iconSize / 2;
    const cornerRadius = 15;
    const verticalExtend = 60;
    
    let startX: number, startY: number;
    if (icon.lineStart === 'bottom') {
      startX = iconCenterX;
      startY = icon.y + LAYOUT.iconSize;
    } else {
      startX = iconCenterX;
      startY = icon.y;
    }
    
    let endX = icon.lineDirection === 'right' ? phoneLeft : phoneRight;
    let turnY = icon.lineStart === 'bottom' ? startY + verticalExtend : startY - verticalExtend;
    const endY = turnY;
    
    let d: string;
    if (icon.lineDirection === 'right') {
      d = icon.lineStart === 'bottom'
        ? `M ${startX} ${startY} L ${startX} ${turnY - cornerRadius} Q ${startX} ${turnY} ${startX + cornerRadius} ${turnY} L ${endX} ${endY}`
        : `M ${startX} ${startY} L ${startX} ${turnY + cornerRadius} Q ${startX} ${turnY} ${startX + cornerRadius} ${turnY} L ${endX} ${endY}`;
    } else {
      d = icon.lineStart === 'bottom'
        ? `M ${startX} ${startY} L ${startX} ${turnY - cornerRadius} Q ${startX} ${turnY} ${startX - cornerRadius} ${turnY} L ${endX} ${endY}`
        : `M ${startX} ${startY} L ${startX} ${turnY + cornerRadius} Q ${startX} ${turnY} ${startX - cornerRadius} ${turnY} L ${endX} ${endY}`;
    }
    
    return { d, startPoint: { x: startX, y: startY }, endPoint: { x: endX, y: endY } };
  }, [phoneLeft, phoneRight]);

  const phase = getAnimationPhase(progress);
  const currentIcon = icons[currentIconIndex];

  // ========== 渲染 ==========
  return (
    <div 
      className={className}
      style={{
        width: LAYOUT.animationWidth,
        height: LAYOUT.animationHeight,
        backgroundColor: 'transparent',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 入场动画 - 射线SVG层 */}
      {(entryPhase === 'line-to-edge' || entryPhase === 'border-trace' || entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display' || entryPhase === 'line-fade-out') && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15 }}>
          <defs>
            <linearGradient id="entry-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={ENTRY_ANIMATION_CONFIG.colors.primary.start} />
              <stop offset="100%" stopColor={ENTRY_ANIMATION_CONFIG.colors.primary.end} />
            </linearGradient>
          </defs>
          
          {(() => {
            const firstIcon = icons[0];
            const pathData = getLinePath(firstIcon);
            const lineLength = 300;
            
            let dashArray = '';
            let dashOffset = 0;
            
            if (entryPhase === 'line-fade-out') {
              // 入场射线淡出：从起点（图标端）向终点（手机端）消失
              const fadeProgress = entryLineFadeOut;
              dashArray = `${lineLength * (1 - fadeProgress)} ${lineLength}`;
              dashOffset = -lineLength * fadeProgress;
            } else {
              // 入场射线绘制：从图标向手机"发射"
              const dashLen = entryLineProgress * lineLength;
              dashArray = `${dashLen} ${lineLength}`;
            }
            
            return (
              <g>
                <path d={pathData.d} fill="none" stroke="url(#entry-gradient)" strokeWidth="6" strokeLinecap="round" pathLength={lineLength} strokeDasharray={dashArray} strokeDashoffset={dashOffset} style={{ opacity: 0.4, filter: 'blur(3px)' }} />
                <path d={pathData.d} fill="none" stroke="url(#entry-gradient)" strokeWidth="2.5" strokeLinecap="round" pathLength={lineLength} strokeDasharray={dashArray} strokeDashoffset={dashOffset} />
              </g>
            );
          })()}
        </svg>
      )}
      
      {/* 入场动画 - 边框描边SVG层 */}
      {(entryPhase === 'border-trace' || entryPhase === 'phone-appear') && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15 }}>
          <defs>
            <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={ENTRY_ANIMATION_CONFIG.colors.primary.start} />
              <stop offset="100%" stopColor={ENTRY_ANIMATION_CONFIG.colors.primary.end} />
            </linearGradient>
          </defs>
          
          {(() => {
            const { topPath, bottomPath } = getPhoneBorderPath();
            const borderLength = 500;
            const dashLen = borderTraceProgress * borderLength;
            const borderOpacity = entryPhase === 'phone-appear' ? 1 - phoneAppearProgress : 1;
            
            return (
              <g opacity={borderOpacity}>
                <path d={topPath} fill="none" stroke="url(#border-gradient)" strokeWidth="4" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} style={{ opacity: 0.4, filter: 'blur(3px)' }} />
                <path d={topPath} fill="none" stroke="url(#border-gradient)" strokeWidth="2" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} />
                <path d={bottomPath} fill="none" stroke="url(#border-gradient)" strokeWidth="4" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} style={{ opacity: 0.4, filter: 'blur(3px)' }} />
                <path d={bottomPath} fill="none" stroke="url(#border-gradient)" strokeWidth="2" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} />
              </g>
            );
          })()}
        </svg>
      )}

      {/* 轮播连线层 */}
      {entryPhase === 'complete' && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <defs>
            {icons.map((icon, index) => {
              if (index !== currentIconIndex) return null;
              const pathData = getLinePath(icon);
              const stops = getGradientStops(progress, icon.startColor, icon.endColor);
              return (
                <linearGradient key={`grad-${icon.id}`} id={`gradient-${icon.id}`} gradientUnits="userSpaceOnUse" x1={pathData.startPoint.x} y1={pathData.startPoint.y} x2={pathData.endPoint.x} y2={pathData.endPoint.y}>
                  {stops.map((s, i) => <stop key={i} offset={`${s.offset}%`} stopColor={s.color} />)}
                </linearGradient>
              );
            })}
          </defs>
          
          {icons.map((icon, index) => {
            const isCurrentIcon = index === currentIconIndex;
            const lineState = getLineState(progress, isCurrentIcon);
            if (lineState.drawing === 0 && lineState.opacity === 0) return null;
            
            const pathData = getLinePath(icon);
            const totalLength = 300;
            
            let dashArray = '';
            let dashOffset = 0;
            
            if (lineState.drawing < 1) {
              // 绘制阶段：线从图标向手机"发射"
              dashArray = `${totalLength * lineState.drawing} ${totalLength}`;
            } else if (lineState.fadeProgress >= 0 && lineState.fadeProgress < 1) {
              // 淡出阶段：线从起点（图标端）向终点（手机端）消失
              dashArray = `${totalLength * (1 - lineState.fadeProgress)} ${totalLength}`;
              dashOffset = -totalLength * lineState.fadeProgress;
            }
            
            const isPulsing = phase === 'pulse1' || phase === 'pulse2';
            
            return (
              <g key={`line-${icon.id}`} opacity={lineState.opacity}>
                <path d={pathData.d} fill="none" stroke={`url(#gradient-${icon.id})`} strokeWidth={isPulsing ? 6 : 4} strokeLinecap="round" pathLength={totalLength} strokeDasharray={dashArray || undefined} strokeDashoffset={dashOffset} style={{ opacity: 0.3, filter: 'blur(3px)' }} />
                <path d={pathData.d} fill="none" stroke={`url(#gradient-${icon.id})`} strokeWidth={isPulsing ? 2.5 : 2} strokeLinecap="round" pathLength={totalLength} strokeDasharray={dashArray || undefined} strokeDashoffset={dashOffset} />
              </g>
            );
          })}
        </svg>
      )}

      {/* 手机模拟器 */}
      {(entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display' || entryPhase === 'line-fade-out' || entryPhase === 'complete') && (
        <div style={{
          position: 'absolute',
          left: phoneLeft,
          top: phoneTop,
          width: LAYOUT.phoneWidth,
          height: LAYOUT.phoneHeight,
          background: 'linear-gradient(145deg, #e8e8e8 0%, #c0c0c0 50%, #a8a8a8 100%)',
          borderRadius: '28px',
          padding: '4px',
          zIndex: 5,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255,255,255,0.4)',
          opacity: entryPhase === 'phone-appear' ? phoneAppearProgress : 1,
          transform: entryPhase === 'phone-appear' ? `scale(${0.95 + 0.05 * phoneAppearProgress})` : 'scale(1)',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* 入场动画期间 */}
            {entryPhase !== 'complete' && (
              (() => {
                let contentOpacity = 0;
                let contentTransform = 'translateY(0) scale(1)';
                
                if (entryPhase === 'content-fade-in') {
                  const p = contentFadeInProgress;
                  contentOpacity = 1 - Math.pow(1 - p, 3);
                  const overshoot = 1.5;
                  const t = p - 1;
                  const easeOutBack = t * t * ((overshoot + 1) * t + overshoot) + 1;
                  const floatY = (1 - easeOutBack) * 12;
                  const scale = 0.96 + easeOutBack * 0.04;
                  contentTransform = `translateY(${floatY}px) scale(${scale})`;
                } else if (entryPhase === 'display' || entryPhase === 'line-fade-out') {
                  contentOpacity = 1;
                  contentTransform = 'translateY(0) scale(1)';
                }
                
                return (
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    opacity: contentOpacity,
                    transform: contentTransform,
                  }}>
                    {icons[0].screen}
                  </div>
                );
              })()
            )}
            
            {/* 轮播期间 - 上一个屏幕 */}
            {entryPhase === 'complete' && (
              <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                {icons[prevIconIndex].screen}
              </div>
            )}
            {/* 轮播期间 - 当前屏幕（滑入） */}
            {entryPhase === 'complete' && (
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transform: `translateX(${slideOffset}%)`,
                zIndex: 2,
              }}>
                {currentIcon.screen}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 四个图标 */}
      {icons.map((item, index) => {
        let iconOpacity = 1;
        let iconTransform = '';
        let isEntryActive = false;
        
        if (entryPhase === 'icons-enter') {
          iconOpacity = entryProgress;
          const isLeft = item.x < centerX;
          const slideX = (1 - entryProgress) * (isLeft ? -40 : 40);
          iconTransform = `translateX(${slideX}px)`;
        } else if (entryPhase === 'line-to-edge' || entryPhase === 'border-trace' || entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display' || entryPhase === 'line-fade-out') {
          if (index === 0) isEntryActive = true;
        }
        
        const activation = entryPhase === 'complete' 
          ? getIconActivation(progress, index === currentIconIndex)
          : { isActive: isEntryActive, progress: isEntryActive ? 1 : 0 };
        
        const floatY = activation.isActive ? -4 * activation.progress : 0;
        
        return (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: LAYOUT.iconSize,
              height: LAYOUT.iconSize,
              backgroundColor: activation.isActive ? 'white' : 'transparent',
              border: `1px solid ${activation.isActive ? '#e5e7eb' : '#d1d5db'}`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: activation.isActive ? '0 6px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.05)',
              transform: `translateY(${floatY}px) ${iconTransform}`,
              opacity: iconOpacity,
              transition: entryPhase === 'complete' ? 'all 0.3s ease-out' : 'none',
              zIndex: activation.isActive ? 20 : 10,
            }}
          >
            <div style={{
              width: LAYOUT.innerIconSize,
              height: LAYOUT.innerIconSize,
              color: activation.isActive ? item.startColor : '#9CA3AF',
              transition: 'color 0.3s',
            }}>
              {item.icon}
            </div>
          </div>
        );
      })}

      {/* 图标标签 */}
      {icons.map((item, index) => {
        const isLeft = item.x < centerX;
        
        let labelOpacity = 1;
        let isEntryActive = false;
        
        if (entryPhase === 'icons-enter') {
          labelOpacity = entryProgress;
        } else if (entryPhase === 'line-to-edge' || entryPhase === 'border-trace' || entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display' || entryPhase === 'line-fade-out') {
          if (index === 0) isEntryActive = true;
        }
        
        const activation = entryPhase === 'complete'
          ? getIconActivation(progress, index === currentIconIndex)
          : { isActive: isEntryActive, progress: isEntryActive ? 1 : 0 };
        
        return (
          <div
            key={`label-${item.id}`}
            style={{
              position: 'absolute',
              left: isLeft ? item.x + LAYOUT.iconSize + 8 : item.x - 8,
              top: item.y + LAYOUT.iconSize / 2,
              transform: isLeft ? 'translateY(-50%)' : 'translate(-100%, -50%)',
              fontSize: '12px',
              color: activation.isActive ? item.startColor : '#64748b',
              fontWeight: activation.isActive ? 600 : 400,
              whiteSpace: 'nowrap',
              opacity: labelOpacity,
              transition: entryPhase === 'complete' ? 'all 0.3s' : 'none',
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}

// 命名导出
export { ServiceDesignAnimation };
