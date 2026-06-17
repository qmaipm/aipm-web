'use client';

/**
 * 质量评估 Agent 动画组件
 * 
 * 基于 ServiceDesignAnimation 复制创建
 * 
 * 功能特性：
 * 1. 四个图标布局 - 质量评估Agent、设备管理、多模态巡检、小智帮手
 * 2. 入场动画 + 轮播动画
 * 3. 手机界面展示质检流程
 * 
 * 图标顺序：
 * 1. 质量评估Agent（主图标）
 * 2. 设备管理系统
 * 3. 多模态巡检
 * 4. 小智帮手
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
// SVG 图标 - 质量评估相关
// ==========================================
const Icons = {
  // 质量评估Agent - 星星+勾选
  agentQuality: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 4l5.18 10.5L40 16.27l-8 7.8 1.89 11L24 30l-9.89 5.07L16 24.07l-8-7.8 10.82-1.77L24 4z"/>
      <path d="M17 24l4 4 8-8"/>
    </svg>
  ),
  // 设备管理系统
  device: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="6" width="32" height="36" rx="4"/>
      <circle cx="24" cy="34" r="3"/>
      <path d="M16 14h16M16 22h16"/>
    </svg>
  ),
  // 多模态巡检 - 眼睛+扫描
  inspect: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24s6-12 20-12 20 12 20 12-6 12-20 12S4 24 4 24z"/>
      <circle cx="24" cy="24" r="6"/>
      <path d="M24 6v4M24 38v4M6 24h4M38 24h4"/>
    </svg>
  ),
  // 小智帮手 - AI助手
  assistant: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="20" r="12"/>
      <path d="M16 18h2M30 18h2"/>
      <path d="M20 24c0 2.2 1.8 4 4 4s4-1.8 4-4"/>
      <path d="M12 32v8h24v-8"/>
      <path d="M18 40v4M30 40v4"/>
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

// ==========================================
// 质量评估首屏 - 质量数据总览面板（含微图表、环比同比）
// ==========================================

// 迷你环形进度图
function MiniRingChart({ value, max, color, size = 32 }: { value: number; max: number; color: string; size?: number }) {
  const percentage = (value / max) * 100;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);
  
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="3"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
}

// 迷你趋势条形图
function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '20px' }}>
      {data.map((value, i) => (
        <div
          key={i}
          style={{
            width: '4px',
            height: `${(value / max) * 100}%`,
            backgroundColor: i === data.length - 1 ? color : `${color}60`,
            borderRadius: '1px',
          }}
        />
      ))}
    </div>
  );
}

function QualityInspectionScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <StatusBar />
      
      {/* 顶部状态栏 - 紫粉渐变 */}
      <div style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        padding: '10px 14px 14px',
        borderRadius: '0 0 20px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* 背景装饰 */}
        <div style={{
          position: 'absolute',
          right: -20,
          top: -20,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>质量评估中心</div>
              <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)' }}>启盟广场 · 实时监控</div>
            </div>
          </div>
          <div style={{
            padding: '3px 8px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            fontSize: '8px',
            color: 'white',
            fontWeight: 500,
          }}>
            查看详情 →
          </div>
        </div>
        
        {/* 核心评分卡片 - 五分制 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          backgroundColor: 'rgba(255,255,255,0.15)', 
          borderRadius: '12px', 
          padding: '10px 12px',
          marginTop: '10px',
          backdropFilter: 'blur(8px)',
        }}>
          <div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)', marginBottom: '2px' }}>综合质量评分</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>4.8</span>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>/5.0</span>
            </div>
            {/* 五星评分 */}
            <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="10" height="10" viewBox="0 0 24 24" fill={star <= 4 ? '#FCD34D' : 'rgba(255,255,255,0.3)'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>环比上周</span>
              <span style={{ fontSize: '10px', color: '#4ade80', fontWeight: 600 }}>↑ 0.3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>同比上月</span>
              <span style={{ fontSize: '10px', color: '#4ade80', fontWeight: 600 }}>↑ 0.5</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 内容区 */}
      <div style={{ flex: 1, padding: '10px', overflow: 'auto', marginTop: '-6px' }}>
        {/* 本周/本月统计卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          marginBottom: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>质检完成情况</span>
            <span style={{ fontSize: '8px', color: '#8B5CF6', fontWeight: 500 }}>本周数据</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {/* 完成率 - 环形图 */}
            <div style={{
              padding: '8px',
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              borderRadius: '10px',
              border: '1px solid #bbf7d0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <MiniRingChart value={94} max={100} color="#10B981" size={36} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                    fontSize: '8px',
                    fontWeight: 700,
                    color: '#10B981',
                  }}>94%</div>
                </div>
                <div>
                  <div style={{ fontSize: '8px', color: '#64748b' }}>完成率</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>188/200</div>
                  <div style={{ fontSize: '7px', color: '#10B981' }}>↑ 3% vs 上周</div>
                </div>
              </div>
            </div>
            
            {/* 合格率 - 环形图 */}
            <div style={{
              padding: '8px',
              background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
              borderRadius: '10px',
              border: '1px solid #e9d5ff',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <MiniRingChart value={89} max={100} color="#8B5CF6" size={36} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(90deg)',
                    fontSize: '8px',
                    fontWeight: 700,
                    color: '#8B5CF6',
                  }}>89%</div>
                </div>
                <div>
                  <div style={{ fontSize: '8px', color: '#64748b' }}>合格率</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed' }}>167/188</div>
                  <div style={{ fontSize: '7px', color: '#8B5CF6' }}>↑ 2% vs 上周</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 趋势图卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          marginBottom: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>评分趋势</span>
            <span style={{ fontSize: '8px', color: '#64748b' }}>近7天</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <MiniBarChart data={[4.2, 4.5, 4.3, 4.6, 4.7, 4.5, 4.8]} color="#8B5CF6" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '7px', color: '#94a3b8' }}>周一</span>
                <span style={{ fontSize: '7px', color: '#94a3b8' }}>周日</span>
              </div>
            </div>
            <div style={{ marginLeft: '12px', textAlign: 'right' }}>
              <div style={{ fontSize: '8px', color: '#64748b' }}>本月平均</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#8B5CF6' }}>4.6</div>
              <div style={{ fontSize: '7px', color: '#10B981' }}>↑ 0.2 vs 上月</div>
            </div>
          </div>
        </div>
        
        {/* 今日异常 - 紧凑版 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#F59E0B',
                boxShadow: '0 0 6px #F59E0B',
              }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>待处理问题</span>
            </div>
            <span style={{ fontSize: '9px', color: '#F59E0B', fontWeight: 600 }}>3项</span>
          </div>
          
          {[
            { location: 'A栋3F男卫', issue: '镜面水渍', time: '10:23', score: '4.2' },
            { location: 'B栋1F大堂', issue: '地面污渍', time: '09:45', score: '3.8' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 8px',
              marginBottom: i === 0 ? '6px' : 0,
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              border: '1px solid #fde68a',
            }}>
              <div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: '#92400e' }}>{item.location}</div>
                <div style={{ fontSize: '8px', color: '#b45309' }}>{item.issue}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#D97706' }}>{item.score}</div>
                <div style={{ fontSize: '7px', color: '#94a3b8' }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 底部操作按钮 */}
      <div style={{ padding: '8px 14px 6px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9' }}>
        <div style={{
          padding: '10px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
          color: 'white',
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(139,92,246,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}>
          <span>📊</span>
          <span>查看完整质检报告</span>
        </div>
      </div>
      <SafeArea />
    </div>
  );
}

// ==========================================
// 多模态巡检屏幕 - 质检详情界面（照片+评分+扣分原因+详细记录）
// ==========================================
function MultiModalInspectScreen() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <StatusBar />
      
      {/* 顶部导航 - 金红渐变 */}
      <div style={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
        padding: '8px 12px 10px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          right: -15,
          top: -15,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
        }} />
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>多模态巡检</div>
              <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.85)' }}>A栋3F · 男卫生间</div>
            </div>
          </div>
          <div style={{
            padding: '3px 8px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            fontSize: '8px',
            color: 'white',
            fontWeight: 500,
          }}>查看详情 →</div>
        </div>
      </div>
      
      {/* 内容区 */}
      <div style={{ flex: 1, padding: '8px', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* 照片卡片 - 适中尺寸 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>📷 质检拍照</span>
              <span style={{ fontSize: '8px', color: '#64748b' }}>洗手台区域</span>
            </div>
            <span style={{ fontSize: '8px', color: '#F59E0B', fontWeight: 500 }}>1/3</span>
          </div>
          
          {/* 照片 - 固定高度 */}
          <div style={{
            position: 'relative',
            height: '90px',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#1e293b',
          }}>
            <img 
              src="/washroom-sink.jpg" 
              alt="卫生间质检"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
              }}
            />
            {/* AI检测框 */}
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '25%',
              width: '50%',
              height: '55%',
              border: '1.5px solid #F59E0B',
              borderRadius: '6px',
              boxShadow: '0 0 8px rgba(245,158,11,0.5)',
            }} />
            {/* 状态标签 */}
            <div style={{
              position: 'absolute',
              bottom: '6px',
              left: '6px',
              right: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{
                padding: '2px 6px',
                backgroundColor: 'rgba(16,185,129,0.9)',
                borderRadius: '4px',
                fontSize: '7px',
                color: 'white',
                fontWeight: 500,
              }}>AI已识别</div>
              <span style={{ fontSize: '7px', color: 'rgba(255,255,255,0.9)' }}>置信度 96.8%</span>
            </div>
          </div>
        </div>
        
        {/* AI评分卡片 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '1px solid #fde68a',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '9px', color: '#92400e', marginBottom: '4px' }}>AI 智能评分</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= 4 ? '#F59E0B' : '#e2e8f0'}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '8px', color: '#b45309' }}>vs上次 ↑0.2</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#D97706' }}>4.2</div>
              <div style={{ fontSize: '8px', color: '#92400e' }}>/5.0</div>
            </div>
          </div>
        </div>
        
        {/* 扣分原因 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          border: '1px solid #fecaca',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#991b1b' }}>⚠️ 扣分原因</span>
            <span style={{ fontSize: '8px', color: '#dc2626' }}>-0.8分</span>
          </div>
          {[
            { item: '镜面水渍', deduct: '-0.5', desc: '洗手台镜面有明显水渍痕迹' },
            { item: '台面积水', deduct: '-0.3', desc: '洗手台台面有少量积水' },
          ].map((reason, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 8px',
              marginBottom: i === 0 ? '4px' : 0,
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderRadius: '6px',
            }}>
              <div>
                <div style={{ fontSize: '9px', fontWeight: 600, color: '#dc2626' }}>{reason.item}</div>
                <div style={{ fontSize: '7px', color: '#94a3b8' }}>{reason.desc}</div>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#dc2626' }}>{reason.deduct}</span>
            </div>
          ))}
        </div>
        
        {/* 详细记录 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#1e293b' }}>📋 检查清单</span>
            <span style={{ fontSize: '8px', color: '#10B981', fontWeight: 500 }}>3/4 通过</span>
          </div>
          {[
            { name: '地面清洁', status: '通过', ok: true, time: '10:23' },
            { name: '镜面状态', status: '轻微水渍', ok: false, time: '10:24' },
            { name: '设备完好', status: '通过', ok: true, time: '10:25' },
            { name: '耗材充足', status: '通过', ok: true, time: '10:26' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 8px',
              marginBottom: i < 3 ? '4px' : 0,
              backgroundColor: item.ok ? '#f0fdf4' : '#fef3c7',
              borderRadius: '6px',
              border: `1px solid ${item.ok ? '#bbf7d0' : '#fde68a'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  backgroundColor: item.ok ? '#dcfce7' : '#fef9c3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: item.ok ? '#16a34a' : '#ca8a04',
                  fontWeight: 600,
                }}>{item.ok ? '✓' : '!'}</div>
                <span style={{ fontSize: '9px', color: '#374151', fontWeight: 500 }}>{item.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '8px', color: item.ok ? '#16a34a' : '#ca8a04' }}>{item.status}</span>
                <span style={{ fontSize: '7px', color: '#94a3b8' }}>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 底部操作 */}
      <div style={{ padding: '8px 12px 6px', backgroundColor: 'white', borderTop: '1px solid #f1f5f9' }}>
        <div style={{
          padding: '10px',
          background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
          color: 'white',
          borderRadius: '10px',
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(245,158,11,0.35)',
        }}>提交质检报告</div>
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
// 价值流程图组件 V2 - 数据流动画版本
// 
// 动画流程：
// 【阶段一】节点构建 (0-55%)：
//   顶部卡片 → 数据来源 → 汇聚箭头 → 质检任务 → 箭头 → AI审图 → 箭头 → 质检完成 → 分散箭头 → 三个收益方块
// 
// 【阶段二】数据流动画 (50-95%)：
//   图片堆叠出现(质检任务节点) → 沿箭头移动到AI审图 → 变形为数据流 → 移动到质检完成 → 分裂成3个量化标签 → 飞入收益方块下方 → 一起闪光
// 
// 设计要点：
// 1. 直角矩形风格（无圆角）
// 2. 图片堆叠图标：3张图片错位+闪光星星
// 3. 数据流图标：流动粒子效果
// 4. 量化标签：节省99% / 评分4.2 / 留存千万/月
// 5. 收益方块+标签同步闪光呼吸效果
// ==========================================
function ValueFlowChart({ progress }: { progress: number }) {
  // 今天的日期
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;

  // ═══════════════════════════════════════════════════════════════════════
  // 【阶段一】节点构建动画 (0% - 55%)
  // ═══════════════════════════════════════════════════════════════════════
  
  // Step 1: 点阵画布背景 — 淡入 (0-5%)
  const canvasProgress = Math.max(0, Math.min(1, progress / 0.05));
  
  // Step 2: 顶部卡片 — 淡入 + 从上滑入 (3%-8%)
  const headerProgress = Math.max(0, Math.min(1, (progress - 0.03) / 0.05));
  
  // Step 3: 三个数据来源图标 — 依次淡入 (6%-14%)
  const source1Progress = Math.max(0, Math.min(1, (progress - 0.06) / 0.03));
  const source2Progress = Math.max(0, Math.min(1, (progress - 0.09) / 0.03));
  const source3Progress = Math.max(0, Math.min(1, (progress - 0.11) / 0.03));
  
  // Step 4: 汇聚箭头 — 从三个来源汇聚到中心 (12%-18%)
  const mergeArrowProgress = Math.max(0, Math.min(1, (progress - 0.12) / 0.06));
  
  // Step 5:「质检任务」节点 — 淡入 + 缩放弹出 (16%-20%)
  const taskNodeProgress = Math.max(0, Math.min(1, (progress - 0.16) / 0.04));
  
  // Step 6: 向下三角箭头组1 — 向下流动特效 (18%-26%)
  const arrow1Progress = Math.max(0, Math.min(1, (progress - 0.18) / 0.08));
  
  // Step 7:「AI智能审图」节点 — 淡入 + 缩放弹出 (24%-28%)
  const aiNodeProgress = Math.max(0, Math.min(1, (progress - 0.24) / 0.04));
  
  // Step 8: 向下三角箭头组2 — 向下流动特效 (26%-34%)
  const arrow2Progress = Math.max(0, Math.min(1, (progress - 0.26) / 0.08));
  
  // Step 9:「质检完成」节点 — 淡入 + 缩放弹出 (32%-36%)
  const completeNodeProgress = Math.max(0, Math.min(1, (progress - 0.32) / 0.04));
  
  // Step 10: 向下分散三箭头 — 向下流动特效 (34%-42%)
  const spreadArrowProgress = Math.max(0, Math.min(1, (progress - 0.34) / 0.08));
  
  // Step 11: 三个收益方块 — 依次淡入 (40%-52%)
  const result1Progress = Math.max(0, Math.min(1, (progress - 0.40) / 0.05));
  const result2Progress = Math.max(0, Math.min(1, (progress - 0.44) / 0.05));
  const result3Progress = Math.max(0, Math.min(1, (progress - 0.48) / 0.05));

  // ═══════════════════════════════════════════════════════════════════════
  // 【阶段二】数据流动画 (50% - 95%)
  // ═══════════════════════════════════════════════════════════════════════
  
  // Step 12: 图片堆叠图标出现 — 在「质检任务」节点上方 (50%-58%)
  const photoStackAppear = Math.max(0, Math.min(1, (progress - 0.50) / 0.08));
  
  // Step 13: 图片堆叠向下移动 — 沿箭头移动到「AI智能审图」节点 (56%-66%)
  const photoMoveProgress = Math.max(0, Math.min(1, (progress - 0.56) / 0.10));
  
  // Step 14: 图片→数据流变形 — 图片堆叠变成数据流图标 (64%-68%)
  const transformProgress = Math.max(0, Math.min(1, (progress - 0.64) / 0.04));
  
  // Step 15: 数据流向下移动 — 沿箭头移动到「质检完成」节点 (66%-76%)
  const dataMoveProgress = Math.max(0, Math.min(1, (progress - 0.66) / 0.10));
  
  // Step 16: 数据流→三标签分裂 — 数据流沿三条分叉分裂 (74%-78%)
  const splitProgress = Math.max(0, Math.min(1, (progress - 0.74) / 0.04));
  
  // Step 17: 三个量化标签飞入 — 飞入对应收益方块下方 (76%-88%)
  const label1FlyIn = Math.max(0, Math.min(1, (progress - 0.76) / 0.05));
  const label2FlyIn = Math.max(0, Math.min(1, (progress - 0.79) / 0.05));
  const label3FlyIn = Math.max(0, Math.min(1, (progress - 0.82) / 0.05));
  
  // Step 18: 收益方块+标签闪光 — 同步呼吸/光晕效果 (85%-100%)
  const glowProgress = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));
  
  // ═══════════════════════════════════════════════════════════════════════
  // 数据流图标位置计算
  // ═══════════════════════════════════════════════════════════════════════
  
  // 数据流当前阶段（用于决定显示哪种图标）
  // 0=不显示, 1=图片堆叠, 2=数据流, 3=分裂中, 4=完成
  const dataFlowStage = 
    progress < 0.50 ? 0 :
    progress < 0.64 ? 1 :
    progress < 0.74 ? 2 :
    progress < 0.78 ? 3 : 4;
  
  // 数据流垂直位置 (0=节点1位置, 0.5=节点2位置, 1=节点3位置)
  const dataFlowY = 
    progress < 0.56 ? 0 :
    progress < 0.66 ? photoMoveProgress * 0.5 :
    progress < 0.76 ? 0.5 + dataMoveProgress * 0.5 : 1;

  // ========== SVG 图标组件 ==========
  // 微信群图标
  const WechatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="#10B981"/>
      <path d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z" fill="#10B981"/>
      <path d="M12 2C6.48 2 2 5.58 2 10C2 12.03 2.94 13.87 4.5 15.21V19L8.34 16.81C9.51 17.05 10.74 17.18 12 17.18C17.52 17.18 22 13.6 22 9.18C22 5.58 17.52 2 12 2Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
  
  // 拍照图标
  const CameraIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="14" rx="2" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="13" r="4" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="13" r="2" fill="#3B82F6"/>
      <path d="M7 6V5C7 4.44772 7.44772 4 8 4H16C16.5523 4 17 4.44772 17 5V6" stroke="#3B82F6" strokeWidth="1.5"/>
      <circle cx="18" cy="9" r="1" fill="#3B82F6"/>
    </svg>
  );
  
  // 机器人图标
  const RobotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="12" rx="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="5" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
      <line x1="12" y1="7" x2="12" y2="8" stroke="#8B5CF6" strokeWidth="1.5"/>
      <circle cx="9" cy="13" r="1.5" fill="#8B5CF6"/>
      <circle cx="15" cy="13" r="1.5" fill="#8B5CF6"/>
      <path d="M9 17H15" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="4" y2="12" stroke="#8B5CF6" strokeWidth="1.5"/>
      <line x1="20" y1="12" x2="22" y2="12" stroke="#8B5CF6" strokeWidth="1.5"/>
    </svg>
  );

  // ========== 数据流图标组件 ==========
  // 图片堆叠图标（3张图片错位堆叠 + 闪光星星）
  const PhotoStackIcon = ({ sparkle = 0 }: { sparkle?: number }) => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* 第三张图片（最底层） */}
      <rect x="10" y="10" width="18" height="14" rx="1" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" transform="rotate(-5 18 18)"/>
      {/* 第二张图片（中层） */}
      <rect x="8" y="8" width="18" height="14" rx="1" fill="#FEF9C3" stroke="#EAB308" strokeWidth="1.5" transform="rotate(3 18 18)"/>
      {/* 第一张图片（最上层） */}
      <rect x="6" y="6" width="18" height="14" rx="1" fill="white" stroke="#F59E0B" strokeWidth="1.5"/>
      {/* 图片内的山水图案 */}
      <path d="M8 17l4-4 3 3 5-5 4 4v3H8v-1z" fill="#FCD34D" opacity="0.6"/>
      <circle cx="20" cy="10" r="2" fill="#FBBF24"/>
      {/* 闪光星星 */}
      <g opacity={sparkle} transform="translate(26, 2)">
        <path d="M4 0l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#F59E0B"/>
      </g>
      <g opacity={sparkle * 0.7} transform="translate(0, 24)">
        <path d="M3 0l0.7 2.1 2.3 0.7-2.3 0.7-0.7 2.1-0.7-2.1L0 2.8l2.3-0.7z" fill="#FBBF24"/>
      </g>
    </svg>
  );

  // 数据流图标（黑客帝国风格 01010）
  const DataFlowIcon = ({ flowOffset = 0 }: { flowOffset?: number }) => {
    // 生成随机的 0/1 字符矩阵
    const matrix = [
      ['1', '0', '1'],
      ['0', '1', '0'],
      ['1', '1', '0'],
      ['0', '0', '1'],
    ];
    
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="matrixGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FF41" stopOpacity="1"/>
            <stop offset="100%" stopColor="#00FF41" stopOpacity="0.3"/>
          </linearGradient>
          <filter id="matrixGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* 背景发光 */}
        <rect x="6" y="4" width="24" height="28" rx="2" fill="#001100" opacity="0.8"/>
        {/* 瀑布流 01010 字符 */}
        {matrix.map((row, rowIdx) => 
          row.map((char, colIdx) => {
            const phase = (flowOffset * 3 + rowIdx * 0.25 + colIdx * 0.1) % 1;
            const opacity = 0.3 + Math.sin(phase * Math.PI) * 0.7;
            const y = 10 + rowIdx * 7 + (phase * 4 - 2);
            return (
              <text
                key={`${rowIdx}-${colIdx}`}
                x={10 + colIdx * 8}
                y={y}
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#00FF41"
                opacity={opacity}
                filter="url(#matrixGlow)"
              >
                {char}
              </text>
            );
          })
        )}
        {/* 顶部高亮字符 */}
        <text x="10" y="8" fontSize="6" fontFamily="monospace" fill="#7FFF00" opacity={0.5 + Math.sin(flowOffset * Math.PI * 4) * 0.5}>{'>'}</text>
        <text x="26" y="8" fontSize="6" fontFamily="monospace" fill="#7FFF00" opacity={0.5 + Math.sin(flowOffset * Math.PI * 4 + 1) * 0.5}>{'<'}</text>
      </svg>
    );
  };

  // 向下箭头动画组件（6个竖排三角形，更美观的流动效果）
  const VerticalArrows = ({ progress: p, color, count = 6 }: { progress: number; color: string; count?: number }) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: count * 12 + 'px',
      }}>
        {[...Array(count)].map((_, i) => {
          // 波浪式流动：每个箭头有不同的延迟和速度
          const wavePhase = (p * 2.5 + i * 0.15) % 1;
          const opacity = Math.sin(wavePhase * Math.PI) * 0.6 + 0.4;
          const scale = 0.85 + Math.sin(wavePhase * Math.PI) * 0.15;
          const show = p > i * 0.1;
          
          return (
            <svg 
              key={i} 
              width="12" 
              height="7" 
              viewBox="0 0 12 7"
              style={{
                opacity: show ? opacity : 0,
                transform: `scale(${scale})`,
                transition: 'opacity 0.15s ease-out',
              }}
            >
              <path d="M6 7L0 0h12L6 7z" fill={color} />
            </svg>
          );
        })}
      </div>
    );
  };

  // 汇聚箭头组件（从三个数据来源汇聚到中心）
  const MergeArrows = ({ progress: p }: { progress: number }) => {
    const baseY = 0;
    const endY = 24;
    const centerX = 130;
    const leftX = 48;
    const rightX = 212;
    
    return (
      <svg width="260" height="28" viewBox="0 0 260 28" style={{ opacity: Math.min(1, p * 1.5) }}>
        <defs>
          <linearGradient id="mergeGradV3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* 左边线 */}
        <path 
          d={`M${leftX} ${baseY} Q${leftX + 25} ${endY * 0.6} ${centerX} ${endY * p}`}
          fill="none" 
          stroke="url(#mergeGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={70 * p}
          strokeDashoffset={0}
        />
        {/* 中间线 */}
        <path 
          d={`M${centerX} ${baseY} L${centerX} ${endY * p}`}
          stroke="url(#mergeGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        {/* 右边线 */}
        <path 
          d={`M${rightX} ${baseY} Q${rightX - 25} ${endY * 0.6} ${centerX} ${endY * p}`}
          fill="none" 
          stroke="url(#mergeGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={70 * p}
          strokeDashoffset={0}
        />
        {/* 汇聚点箭头 */}
        {p > 0.75 && (
          <polygon 
            points={`${centerX},${endY + 5} ${centerX - 5},${endY - 1} ${centerX + 5},${endY - 1}`} 
            fill="#64748b" 
            opacity={(p - 0.75) / 0.25}
          />
        )}
      </svg>
    );
  };

  // 分散箭头组件（从质检完成分散到三个结果）
  const SpreadArrows = ({ progress: p, color }: { progress: number; color: string }) => {
    const startY = 0;
    const endY = 28;
    const centerX = 130;
    const leftX = 52;
    const rightX = 208;
    
    return (
      <svg width="260" height="34" viewBox="0 0 260 34" style={{ opacity: Math.min(1, p * 1.5) }}>
        <defs>
          <linearGradient id="spreadGradV3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* 中心起点 */}
        <circle cx={centerX} cy={startY + 2} r="3" fill={color} opacity={p > 0.1 ? 1 : 0} />
        
        {/* 左边分支 */}
        <path 
          d={`M${centerX} ${startY + 4} Q${centerX - 25} ${endY * 0.45} ${leftX} ${startY + endY * p}`}
          fill="none" 
          stroke="url(#spreadGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={90}
          strokeDashoffset={90 - 90 * p}
        />
        {/* 中间分支 */}
        <path 
          d={`M${centerX} ${startY + 4} L${centerX} ${startY + endY * p}`}
          stroke="url(#spreadGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={35}
          strokeDashoffset={35 - 35 * p}
        />
        {/* 右边分支 */}
        <path 
          d={`M${centerX} ${startY + 4} Q${centerX + 25} ${endY * 0.45} ${rightX} ${startY + endY * p}`}
          fill="none" 
          stroke="url(#spreadGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={90}
          strokeDashoffset={90 - 90 * p}
        />
        
        {/* 三个箭头尖 */}
        {p > 0.7 && (
          <>
            <polygon 
              points={`${leftX},${endY + 5} ${leftX - 4},${endY - 1} ${leftX + 4},${endY - 1}`} 
              fill={color} 
              opacity={(p - 0.7) / 0.3}
            />
            <polygon 
              points={`${centerX},${endY + 5} ${centerX - 4},${endY - 1} ${centerX + 4},${endY - 1}`} 
              fill={color} 
              opacity={(p - 0.7) / 0.3}
            />
            <polygon 
              points={`${rightX},${endY + 5} ${rightX - 4},${endY - 1} ${rightX + 4},${endY - 1}`} 
              fill={color} 
              opacity={(p - 0.7) / 0.3}
            />
          </>
        )}
      </svg>
    );
  };

  // ========== 通用样式 ==========
  // 直角矩形节点样式
  const nodeStyle = (bgColor: string, nodeProgress: number, shadowColor: string) => ({
    padding: '8px 28px',
    backgroundColor: bgColor,
    borderRadius: '0px', // 直角矩形
    color: 'white',
    fontSize: '13px',
    fontWeight: 600 as const,
    opacity: nodeProgress,
    transform: `scale(${0.85 + nodeProgress * 0.15})`,
    boxShadow: nodeProgress > 0.5 ? `0 4px 16px ${shadowColor}` : 'none',
    border: '1px solid rgba(255,255,255,0.2)',
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: '6px',
      boxSizing: 'border-box',
    }}>
      {/* Step 1: 点阵画布背景 - 填满整个区域 */}
      <div style={{
        position: 'absolute',
        inset: '6px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0',
        opacity: canvasProgress,
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="dotPatternFlowV3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPatternFlowV3)" />
          {/* 中心虚线 */}
          <line x1="50%" y1="12%" x2="50%" y2="88%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 内容区域 - 使用绝对定位填满空间，全部居中对齐，上下 padding 对称 */}
      <div style={{
        position: 'absolute',
        inset: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 6px',
      }}>
        {/* Step 2: 顶部卡片 - 直角矩形 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0px',
          padding: '7px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          width: '85%',
          opacity: headerProgress,
          transform: `translateY(${(1 - headerProgress) * -10}px)`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>启盟广场</span>
              <span style={{ 
                fontSize: '8px', 
                color: '#64748b', 
                padding: '2px 5px', 
                backgroundColor: '#f1f5f9', 
                borderRadius: '0px',
                border: '1px solid #e2e8f0',
              }}>{dateStr}</span>
            </div>
            <div style={{ fontSize: '8px', color: '#10B981', fontWeight: 600 }}>单日质检 ✓</div>
          </div>
        </div>

        {/* Step 3: 三个数据来源图标（SVG图标，不用emoji） */}
        <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexShrink: 0 }}>
          {[
            { icon: <WechatIcon />, label: '微信群', progress: source1Progress, bgColor: '#dcfce7', borderColor: '#86efac' },
            { icon: <CameraIcon />, label: '拍照', progress: source2Progress, bgColor: '#dbeafe', borderColor: '#93c5fd' },
            { icon: <RobotIcon />, label: '机器人', progress: source3Progress, bgColor: '#ede9fe', borderColor: '#c4b5fd' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              opacity: item.progress,
              transform: `translateY(${(1 - item.progress) * -8}px) scale(${0.85 + item.progress * 0.15})`,
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '0px', // 直角矩形
                backgroundColor: item.bgColor,
                border: `1px solid ${item.borderColor}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>{item.icon}</div>
              <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Step 4: 汇聚箭头 */}
        <MergeArrows progress={mergeArrowProgress} />

        {/* Step 5: 质检任务节点 - 直角矩形 */}
        <div style={{ position: 'relative' }}>
          <div style={nodeStyle('#3B82F6', taskNodeProgress, 'rgba(59,130,246,0.4)')}>
            质检任务
          </div>
        </div>

        {/* Step 6: 箭头1（向下流动）+ 数据流图标位置1 */}
        <div style={{ margin: '3px 0', position: 'relative' }}>
          <VerticalArrows progress={arrow1Progress} color="#3B82F6" count={6} />
          
          {/* 数据流图标 - 阶段1: 图片堆叠在此区域移动 */}
          {dataFlowStage === 1 && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: `${dataFlowY < 0.5 ? dataFlowY * 2 * 100 : 100}%`,
              transform: 'translate(-50%, -50%)',
              opacity: photoStackAppear,
              filter: `drop-shadow(0 4px 12px rgba(245, 158, 11, 0.4))`,
              zIndex: 10,
            }}>
              <PhotoStackIcon sparkle={Math.sin(progress * Math.PI * 8) * 0.5 + 0.5} />
            </div>
          )}
        </div>

        {/* Step 7: AI审图节点 - 直角矩形（不再有标签） */}
        <div style={{ position: 'relative' }}>
          <div style={nodeStyle('#10B981', aiNodeProgress, 'rgba(16,185,129,0.4)')}>
            AI智能审图
          </div>
        </div>

        {/* Step 8: 箭头2（向下流动）+ 数据流图标位置2 */}
        <div style={{ margin: '3px 0', position: 'relative' }}>
          <VerticalArrows progress={arrow2Progress} color="#10B981" count={6} />
          
          {/* 数据流图标 - 阶段2: 数据流在此区域移动 */}
          {dataFlowStage === 2 && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: `${(dataFlowY - 0.5) * 2 * 100}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 1 - transformProgress * 0.3 + dataMoveProgress * 0.3,
              filter: `drop-shadow(0 4px 12px rgba(6, 182, 212, 0.4))`,
              zIndex: 10,
            }}>
              <DataFlowIcon flowOffset={progress * 3} />
            </div>
          )}
        </div>

        {/* Step 9: 质检完成节点 - 直角矩形（不再有标签） */}
        <div style={{ position: 'relative' }}>
          <div style={nodeStyle('#8B5CF6', completeNodeProgress, 'rgba(139,92,246,0.4)')}>
            质检完成
          </div>
        </div>

        {/* Step 10: 向下分散三箭头 + 数据流分裂动画 */}
        <div style={{ margin: '3px 0', position: 'relative' }}>
          <SpreadArrows progress={spreadArrowProgress} color="#8B5CF6" />
          
          {/* 数据流分裂效果 - 阶段3: 从中心分裂成3个 */}
          {dataFlowStage === 3 && (
            <>
              {/* 分裂粒子效果 */}
              {[0, 1, 2].map((i) => {
                const angle = (i - 1) * 45; // -45°, 0°, 45°
                const distance = splitProgress * 40;
                const x = Math.sin(angle * Math.PI / 180) * distance;
                const y = splitProgress * 20;
                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    transform: `translate(calc(-50% + ${x}px), ${y}px) scale(${0.8 + splitProgress * 0.2})`,
                    opacity: 1 - splitProgress * 0.5,
                    zIndex: 10,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="4" fill={['#10B981', '#3B82F6', '#8B5CF6'][i]} opacity="0.8"/>
                    </svg>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Step 11: 三个收益方块（标签集成在内） + Step 17: 量化标签飞入 + Step 18: 闪光效果 */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {[
            { 
              title: '零审图成本', 
              label: '节省 99%',
              color: '#10B981', 
              bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', 
              border: '#86efac',
              lightBg: '#ecfdf5',
              progress: result1Progress,
              labelProgress: label1FlyIn,
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="none"/>
                  <path d="M8 12l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            { 
              title: 'AI客观评分', 
              label: '评分: 4.2',
              color: '#3B82F6', 
              bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', 
              border: '#93c5fd',
              lightBg: '#eff6ff',
              progress: result2Progress,
              labelProgress: label2FlyIn,
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" stroke="#3B82F6" strokeWidth="1.5" fill="#3B82F6" fillOpacity="0.2"/>
                </svg>
              ),
            },
            { 
              title: '千万级复盘', 
              label: '留存: 千万/月',
              color: '#8B5CF6', 
              bg: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', 
              border: '#c4b5fd',
              lightBg: '#f5f3ff',
              progress: result3Progress,
              labelProgress: label3FlyIn,
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                </svg>
              ),
            },
          ].map((item, i) => {
            // 闪光效果（在 glowProgress > 0 时激活）
            const isGlowing = glowProgress > 0 && item.progress >= 1;
            const breathe = isGlowing ? Math.sin(glowProgress * Math.PI * 6 + i * 0.8) * 0.04 + 1 : 1;
            const glowIntensity = isGlowing ? 0.25 + Math.sin(glowProgress * Math.PI * 4 + i * 1.2) * 0.2 : 0;
            
            return (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                background: item.bg,
                borderRadius: '0px',
                border: `1.5px solid ${item.border}`,
                opacity: item.progress,
                transform: `translateY(${(1 - item.progress) * 10}px) scale(${(0.88 + item.progress * 0.12) * breathe})`,
                boxShadow: item.progress > 0.5 
                  ? `0 4px 12px rgba(0,0,0,0.1), 0 0 ${6 + glowIntensity * 16}px ${item.color}${Math.round(glowIntensity * 70).toString(16).padStart(2, '0')}`
                  : 'none',
                position: 'relative' as const,
                overflow: 'hidden',
                minWidth: '70px',
              }}>
                {/* 微光扫描效果 */}
                {isGlowing && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '60%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${item.color}30, transparent)`,
                    transform: `translateX(${((glowProgress * 2 + i * 0.3) % 1) * 350}%)`,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }} />
                )}
                {/* 上半部分：标题行 */}
                <div style={{
                  padding: '5px 8px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ 
                    fontSize: '8px', 
                    fontWeight: 600, 
                    color: item.color,
                    whiteSpace: 'nowrap',
                  }}>{item.title}</span>
                </div>
                {/* 下半部分：量化标签（飞入动画） */}
                <div style={{
                  padding: '3px 8px 5px',
                  backgroundColor: item.lightBg,
                  borderTop: `1px dashed ${item.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: item.labelProgress,
                  transform: `translateY(${(1 - item.labelProgress) * 8}px)`,
                }}>
                  <span style={{ 
                    fontSize: '9px', 
                    fontWeight: 700, 
                    color: item.color,
                    whiteSpace: 'nowrap',
                  }}>{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 质量评估Agent动画组件
// 基于 ServiceDesignAnimation 复制创建
// ==========================================

interface QualityAnimationProps {
  /** 是否当前激活（激活时从头播放，切走时停止） */
  isActive?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

export default function QualityAnimation({
  isActive = true,
  style,
  className,
}: QualityAnimationProps) {
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
  
  // 追踪是否是入场完成后的第一个轮播周期（在这里声明，因为需要在reset中使用）
  const isFirstCarouselCycleRef = useRef(true);
  
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
      isFirstCarouselCycleRef.current = true; // 重置第一周期标记
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

  // ========== 流程图进度状态 ==========
  const [flowChartProgress, setFlowChartProgress] = useState(0);
  // 轮播阶段：0=质量评估首屏(保持), 1=多模态巡检, 2=流程图
  const [carouselStage, setCarouselStage] = useState(0);
  // 射线动画状态
  const [lineDrawProgress, setLineDrawProgress] = useState(0);
  const [lineFadeProgress, setLineFadeProgress] = useState(0);
  // 当前激活射线的图标索引：0=质量评估Agent, 2=多模态巡检, -1=无
  const [activeLineIcon, setActiveLineIcon] = useState(0);
  // 脉冲状态（用于射线发光效果）
  const [isPulsing, setIsPulsing] = useState(false);

  // ========== 图标配置 - 4个图标显示，只有质量评估Agent发射线 ==========
  const icons = useMemo(() => [
    { 
      id: 'agent', 
      icon: Icons.agentQuality, 
      name: '质量评估', 
      x: leftX, 
      y: 140, 
      startColor: '#8B5CF6',
      endColor: '#EC4899',
      lineStart: 'bottom' as const,
      lineDirection: 'right' as const,
      screen: <QualityInspectionScreen />,
      hasLine: true,  // 只有这个图标发射线
    },
    { 
      id: 'device', 
      icon: Icons.device, 
      name: '设备管理', 
      x: leftX, 
      y: 340, 
      startColor: '#8B5CF6',
      endColor: '#EC4899',
      lineStart: 'bottom' as const,
      lineDirection: 'right' as const,
      screen: <SpaceManagementScreen />,
      hasLine: false,
    },
    { 
      id: 'inspect', 
      icon: Icons.inspect, 
      name: '多模态巡检', 
      x: rightX, 
      y: 230, 
      startColor: '#F59E0B',
      endColor: '#EF4444',
      lineStart: 'bottom' as const,
      lineDirection: 'left' as const,
      screen: <MultiModalInspectScreen />,
      hasLine: false,
    },
    { 
      id: 'assistant', 
      icon: Icons.assistant, 
      name: '小智帮手', 
      x: rightX, 
      y: 430, 
      startColor: '#10B981',
      endColor: '#0EA5E9',
      lineStart: 'top' as const,
      lineDirection: 'left' as const,
      screen: <DesignResultScreen />,
      hasLine: false,
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
      } else {
        // 入场完成后，射线保持连接（不淡出）
        setEntryPhase('complete');
        setCarouselStage(0); // 入场完成后保持在质量评估首屏
        setLineDrawProgress(1); // 射线保持绘制完成状态
        setLineFadeProgress(0);
        setActiveLineIcon(0); // 质量评估Agent射线激活
        return;
      }
      
      animationFrame = requestAnimationFrame(animateEntry);
    };
    
    animationFrame = requestAnimationFrame(animateEntry);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, entryPhase]);

  // ========== 脉冲渐变计算函数 ==========
  // 脉冲进度：用于渐变色流动效果
  const [pulseProgress, setPulseProgress] = useState(0);
  
  const getPulseGradientStops = useCallback((
    pulseP: number,
    startColor: string,
    endColor: string
  ): { offset: number; color: string }[] => {
    // pulseP: 0-1 表示脉冲进度
    // 颜色从startColor流动到endColor，再流回
    if (pulseP <= 0) {
      return [{ offset: 0, color: startColor }, { offset: 100, color: startColor }];
    }
    
    // 脉冲1：颜色从起点向终点流动 (0-0.5)
    if (pulseP < 0.5) {
      const p = pulseP * 2;
      if (p >= 1) return [{ offset: 0, color: endColor }, { offset: 100, color: endColor }];
      return [
        { offset: 0, color: endColor },
        { offset: p * 100, color: endColor },
        { offset: Math.min(100, p * 100 + 3), color: startColor },
        { offset: 100, color: startColor },
      ];
    }
    
    // 脉冲2：颜色从起点向终点流动回来 (0.5-1)
    const p = (pulseP - 0.5) * 2;
    if (p >= 1) return [{ offset: 0, color: startColor }, { offset: 100, color: startColor }];
    return [
      { offset: 0, color: startColor },
      { offset: p * 100, color: startColor },
      { offset: Math.min(100, p * 100 + 3), color: endColor },
      { offset: 100, color: endColor },
    ];
  }, []);

  // ========== 轮播动画循环 ==========
  // 轮播顺序：
  // 入场完成 → 质量评估首屏(射线保持+脉冲) → 多模态巡检(射线切换+脉冲) → 流程图(无射线) → 循环
  // carouselStage: 0=质量评估首屏, 1=多模态巡检, 2=流程图
  useEffect(() => {
    if (!isActive || entryPhase !== 'complete') return;
    
    let animationFrame: number;
    let startTime: number | null = null;
    
    // 各阶段时长
    const STAGE_DURATIONS = {
      0: 5000,  // 质量评估首屏（射线保持+脉冲）
      1: 5000,  // 多模态巡检（射线切换到inspect图标+脉冲）
      2: 16000, // 流程图（增加停留时间：10秒展开 + 6秒停留循环展示）
    };
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      const currentStageDuration = STAGE_DURATIONS[carouselStage as keyof typeof STAGE_DURATIONS];
      const stageProgress = Math.min(1, elapsed / currentStageDuration);
      
      setProgress(stageProgress);
      
      // 根据阶段设置不同的动画状态
      if (carouselStage === 0) {
        // 质量评估阶段 - 射线保持连接 + 渐变脉冲效果
        setActiveLineIcon(0);
        
        // 入场完成后的第一个周期：跳过射线绘制阶段，直接开始脉冲
        if (isFirstCarouselCycleRef.current) {
          // 第一个周期：0-60%脉冲，60-100%淡出
          setLineDrawProgress(1); // 射线已经绘制完成
          if (stageProgress < 0.60) {
            setLineFadeProgress(0);
            const pulseP = stageProgress / 0.60;
            setPulseProgress(pulseP);
            setIsPulsing(true);
          } else {
            setLineFadeProgress((stageProgress - 0.60) / 0.40);
            setPulseProgress(0);
            setIsPulsing(false);
          }
        } else {
          // 后续周期（从流程图切回来）：0-15%绘制，15-60%脉冲，60-100%淡出
          if (stageProgress < 0.15) {
            const drawP = stageProgress / 0.15;
            setLineDrawProgress(drawP);
            setLineFadeProgress(0);
            setPulseProgress(0);
            setIsPulsing(false);
          } else if (stageProgress < 0.60) {
            setLineDrawProgress(1);
            setLineFadeProgress(0);
            const pulseP = (stageProgress - 0.15) / 0.45;
            setPulseProgress(pulseP);
            setIsPulsing(true);
          } else {
            setLineDrawProgress(1);
            setLineFadeProgress((stageProgress - 0.60) / 0.40);
            setPulseProgress(0);
            setIsPulsing(false);
          }
        }
        setFlowChartProgress(0);
        setSlideOffset(0);
      } else if (carouselStage === 1) {
        // 多模态巡检阶段 - 切换到inspect图标的射线 + 渐变脉冲
        // 0-15%: 手机滑入 + inspect射线绘制
        // 15-60%: 脉冲效果（渐变流动）
        // 60-100%: 射线淡出
        setActiveLineIcon(2); // 多模态巡检图标(index=2)
        if (stageProgress < 0.15) {
          setSlideOffset((1 - stageProgress / 0.15) * 100);
          setLineDrawProgress(stageProgress / 0.15);
          setLineFadeProgress(0);
          setPulseProgress(0);
          setIsPulsing(false);
        } else if (stageProgress < 0.60) {
          setSlideOffset(0);
          setLineDrawProgress(1);
          setLineFadeProgress(0);
          const pulseP = (stageProgress - 0.15) / 0.45;
          setPulseProgress(pulseP);
          setIsPulsing(true);
        } else {
          setSlideOffset(0);
          setLineDrawProgress(1);
          setLineFadeProgress((stageProgress - 0.60) / 0.40);
          setPulseProgress(0);
          setIsPulsing(false);
        }
        setFlowChartProgress(0);
      } else if (carouselStage === 2) {
        // 流程图阶段 - 手机淡出，流程图展开，无射线
        setFlowChartProgress(stageProgress);
        setSlideOffset(0);
        setLineDrawProgress(0);
        setLineFadeProgress(0);
        setActiveLineIcon(-1); // 无射线
        setPulseProgress(0);
        setIsPulsing(false);
      }
      
      // 阶段切换
      if (elapsed >= currentStageDuration) {
        startTime = null;
        setCarouselStage(prev => {
          if (prev === 0) {
            // 质量评估 → 多模态：重置射线进度，标记不再是第一个周期
            isFirstCarouselCycleRef.current = false;
            setLineDrawProgress(0);
            setLineFadeProgress(0);
            setPulseProgress(0);
            return 1;
          }
          if (prev === 1) {
            // 多模态 → 流程图
            return 2;
          }
          // 流程图 → 质量评估：重新绘制质量评估射线
          setLineDrawProgress(0);
          setLineFadeProgress(0);
          setPulseProgress(0);
          setActiveLineIcon(0);
          return 0;
        });
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, entryPhase, carouselStage]);

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

      {/* 轮播连线层 - 根据activeLineIcon显示对应图标的射线，带渐变脉冲效果 */}
      {entryPhase === 'complete' && activeLineIcon >= 0 && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15 }}>
          <defs>
            {/* 动态渐变：根据脉冲进度生成渐变stops */}
            <linearGradient id="carousel-pulse-gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
              {(() => {
                const activeIcon = icons[activeLineIcon];
                if (!activeIcon) return null;
                const stops = isPulsing 
                  ? getPulseGradientStops(pulseProgress, activeIcon.startColor, activeIcon.endColor)
                  : [{ offset: 0, color: activeIcon.startColor }, { offset: 100, color: activeIcon.startColor }];
                return stops.map((stop, i) => (
                  <stop key={i} offset={`${stop.offset}%`} stopColor={stop.color} />
                ));
              })()}
            </linearGradient>
          </defs>
          
          {(() => {
            // 绘制当前激活图标的射线
            const activeIcon = icons[activeLineIcon];
            if (!activeIcon) return null;
            
            const pathData = getLinePath(activeIcon);
            const totalLength = 300;
            
            let dashArray = '';
            let dashOffset = 0;
            
            if (lineFadeProgress > 0) {
              // 淡出阶段：线从起点（图标端）向终点（手机端）消失
              dashArray = `${totalLength * (1 - lineFadeProgress)} ${totalLength}`;
              dashOffset = -totalLength * lineFadeProgress;
            } else if (lineDrawProgress < 1) {
              // 绘制阶段：线从图标向手机"发射"
              dashArray = `${totalLength * lineDrawProgress} ${totalLength}`;
            } else {
              // 保持阶段
              dashArray = `${totalLength} ${totalLength}`;
            }
            
            // 光晕效果：脉冲时稍微增强
            const glowWidth = isPulsing ? 8 : 6;
            const lineWidth = 2.5;
            const glowOpacity = isPulsing ? 0.45 : 0.35;
            
            return (
              <g>
                <path d={pathData.d} fill="none" stroke="url(#carousel-pulse-gradient)" strokeWidth={glowWidth} strokeLinecap="round" pathLength={totalLength} strokeDasharray={dashArray} strokeDashoffset={dashOffset} style={{ opacity: glowOpacity, filter: 'blur(4px)' }} />
                <path d={pathData.d} fill="none" stroke="url(#carousel-pulse-gradient)" strokeWidth={lineWidth} strokeLinecap="round" pathLength={totalLength} strokeDasharray={dashArray} strokeDashoffset={dashOffset} />
              </g>
            );
          })()}
        </svg>
      )}

      {/* 手机模拟器 - 流程图模式(carouselStage===2)时淡出 */}
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
          opacity: entryPhase === 'phone-appear' 
            ? phoneAppearProgress 
            : (carouselStage === 2 ? Math.max(0, 1 - flowChartProgress * 2) : 1),
          transform: entryPhase === 'phone-appear' 
            ? `scale(${0.95 + 0.05 * phoneAppearProgress})` 
            : (carouselStage === 2 ? `scale(${1 - flowChartProgress * 0.1})` : 'scale(1)'),
          transition: entryPhase === 'complete' ? 'opacity 0.4s ease-out, transform 0.4s ease-out' : 'none',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* 入场动画期间 - 显示质量评估首屏 */}
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
                    <QualityInspectionScreen />
                  </div>
                );
              })()
            )}
            
            {/* 轮播期间 - 根据 carouselStage 显示不同屏幕 */}
            {entryPhase === 'complete' && carouselStage !== 2 && (
              <>
                {/* 底层屏幕（用于滑动切换效果） */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                  {carouselStage === 0 ? <QualityInspectionScreen /> : <QualityInspectionScreen />}
                </div>
                {/* 当前屏幕（滑入） */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transform: `translateX(${slideOffset}%)`,
                  zIndex: 2,
                }}>
                  {carouselStage === 0 ? <QualityInspectionScreen /> : <MultiModalInspectScreen />}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 流程图 - carouselStage===2时在中央区域显示 */}
      {entryPhase === 'complete' && carouselStage === 2 && (
        <div style={{
          position: 'absolute',
          left: phoneLeft - 10,
          top: phoneTop - 20,
          width: LAYOUT.phoneWidth + 20,
          height: LAYOUT.phoneHeight + 40,
          zIndex: 6,
          pointerEvents: 'none',
        }}>
          <ValueFlowChart progress={flowChartProgress} />
        </div>
      )}

      {/* 四个图标 - 根据activeLineIcon激活对应图标 */}
      {icons.map((item, index) => {
        let iconOpacity = 1;
        let iconTransform = '';
        let isEntryActive = false;
        
        if (entryPhase === 'icons-enter') {
          iconOpacity = entryProgress;
          const isLeft = item.x < centerX;
          const slideX = (1 - entryProgress) * (isLeft ? -40 : 40);
          iconTransform = `translateX(${slideX}px)`;
        } else if (entryPhase === 'line-to-edge' || entryPhase === 'border-trace' || entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display') {
          if (index === 0) isEntryActive = true;
        }
        
        // 轮播期间：根据activeLineIcon激活对应图标
        const isCarouselActive = entryPhase === 'complete' && index === activeLineIcon;
        const activation = entryPhase === 'complete' 
          ? { isActive: isCarouselActive, progress: isCarouselActive ? 1 : 0 }
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
        } else if (entryPhase === 'line-to-edge' || entryPhase === 'border-trace' || entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display') {
          if (index === 0) isEntryActive = true;
        }
        
        // 轮播期间：根据activeLineIcon激活对应图标标签
        const isCarouselActive = entryPhase === 'complete' && index === activeLineIcon;
        const activation = entryPhase === 'complete'
          ? { isActive: isCarouselActive, progress: isCarouselActive ? 1 : 0 }
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
export { QualityAnimation };
