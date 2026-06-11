'use client';

/**
 * 运营管理 Agent 动画组件
 * 
 * 特性：
 * 1. 横向布局 - 图标在上下两排
 * 2. PC界面模拟（540×420）
 * 3. 标准化接口：isActive 控制激活/停止
 * 4. 画布尺寸：540×700
 * 
 * 图标位置：
 * - 上排：左边缘对齐 G3+12px 和 G4+12px
 * - 下排：右边缘对齐 G4-12px 和 G5-12px
 * - 标签在图标上方，避免射线穿过
 * 
 * 图标顺序：
 * 1. 运营管理Agent（左上，触发主图标）
 * 2. SSR服务记录（右上）
 * 3. 工单调度（左下）
 * 4. 人机协同（右下）
 * 
 * PC界面内容：
 * - 页头：感知 → 决策 → 执行 业务流程（44px高）
 * - 主体：三张手机卡片（9:19比例，150×317）轮播
 *   1. 全域服务感知
 *   2. 服务质量风险识别
 *   3. 质量检查工单
 * 
 * 动画流程：
 * - 激活时：从头播放入场动画 → 轮播动画
 * - 停止时：重置状态，等待下次激活
 */

import { useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';
import Image from 'next/image';

// ==========================================
// 类型定义
// ==========================================

interface OperationsAnimationProps {
  isActive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

type LineStart = 'left' | 'right';
type IconSide = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface IconConfig {
  id: string;
  icon: ReactNode;
  name: string;
  side: IconSide;
  lineStart: LineStart;
  startColor: string;
  endColor: string;
}

// ==========================================
// 布局常量
// ==========================================

const LAYOUT = {
  canvasWidth: 540,
  canvasHeight: 700,
  pcWidth: 540,
  pcHeight: 420,
  iconSize: 48,
  innerIconSize: 28,
  iconGap: 12,
  iconToPcGap: 40,
  G3: 0,
  G4: 270,
  G5: 540,
  // 卡片布局（9:19比例，贴边G3/G5）
  // 3卡片布局：166*3 + 21*2 = 540 精确贴边
  cardWidth: 166,
  cardHeight: 355,  // 调整高度适配内容
  cardGap: 21,
  cardRadius: 12,
  headerHeight: 44,
  cardTopGap: 10,  // 增加顶部间距
};

// 计算PC界面位置
const pcLeft = 0;
const pcTop = (LAYOUT.canvasHeight - LAYOUT.pcHeight) / 2;
const pcRight = pcLeft + LAYOUT.pcWidth;
const pcBottom = pcTop + LAYOUT.pcHeight;

// 计算图标位置
const topLeftIconX = LAYOUT.G3 + LAYOUT.iconGap;
const topRightIconX = LAYOUT.G4 + LAYOUT.iconGap;
const topIconY = pcTop - LAYOUT.iconToPcGap - LAYOUT.iconSize;

const bottomLeftIconX = LAYOUT.G4 - LAYOUT.iconGap - LAYOUT.iconSize;
const bottomRightIconX = LAYOUT.G5 - LAYOUT.iconGap - LAYOUT.iconSize;
const bottomIconY = pcBottom + LAYOUT.iconToPcGap;

// 卡片区域
const cardsTop = LAYOUT.headerHeight + LAYOUT.cardTopGap;

// ==========================================
// 动画配置
// ==========================================

const ENTRY_ANIMATION_CONFIG = {
  durations: {
    iconsEnter: 800,
    lineToEdge: 600,
    borderTrace: 1000,
    phoneAppear: 600,
    contentFadeIn: 1400,
    displayTime: 1000,
    lineFadeOut: 500,
  },
};

const ANIMATION_CONFIG = {
  iconDuration: 6000,
  phases: {
    iconActivate: { start: 0, end: 0.08 },
    lineDrawing: { start: 0.06, end: 0.20 },
    screenActivate: { start: 0.18, end: 0.23 },
    pulse1: { start: 0.23, end: 0.40 },
    pulse2: { start: 0.38, end: 0.55 },
    iconDeactivate: { start: 0.53, end: 0.65 },
    lineFading: { start: 0.63, end: 1.0 },
    transition: { start: 1.0, end: 1.0 },
  },
};

const CAROUSEL_CONFIG = {
  cycleDuration: 4000,
  slideDuration: 800,  // 增加滑动时间，更优雅
};

// ==========================================
// 动画阶段类型
// ==========================================

type EntryPhase =
  | 'idle'
  | 'icons-enter'
  | 'line-to-edge'
  | 'border-trace'
  | 'phone-appear'
  | 'content-fade-in'
  | 'display'
  | 'line-fade-out'
  | 'complete';

type AnimationPhase =
  | 'icon-activating'
  | 'line-drawing'
  | 'screen-activating'
  | 'pulse1'
  | 'pulse2'
  | 'icon-deactivating'
  | 'line-fading'
  | 'transition';

// ==========================================
// 工具函数
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
// 手机UI卡片组件 - 精致写实风格
// ==========================================

// 卡片1 - 全域服务感知
const SensingCard = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #ffffff 0%, #F8FAFC 100%)',
    borderRadius: LAYOUT.cardRadius,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    border: '1px solid rgba(16,185,129,0.12)',
  }}>
    {/* 顶部状态栏 - 紧凑 */}
    <div style={{
      padding: '8px 10px 6px',
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 装饰光效 */}
      <div style={{
        position: 'absolute',
        top: '-15px',
        right: '-15px',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>全域服务感知</div>
          <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.85)', marginTop: '1px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span style={{ width: '4px', height: '4px', backgroundColor: '#34D399', borderRadius: '50%', boxShadow: '0 0 4px #34D399' }} />
            实时监控中
          </div>
        </div>
        <div style={{ 
          fontSize: '7px', 
          backgroundColor: 'rgba(255,255,255,0.2)', 
          padding: '2px 6px', 
          borderRadius: '8px',
          color: 'white',
        }}>917 在线</div>
      </div>
    </div>
    
    {/* 内容区 - 更紧凑 */}
    <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* 核心数据卡片 - 更紧凑 */}
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
        borderRadius: '8px',
        padding: '8px',
        border: '1px solid rgba(16,185,129,0.1)',
      }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669', lineHeight: 1 }}>872</div>
          <div style={{ fontSize: '7px', color: '#64748B', marginTop: '4px' }}>空间传感器</div>
          <div style={{ fontSize: '6px', color: '#10B981', marginTop: '1px' }}>↑ 12 今日新增</div>
        </div>
        <div style={{ width: '1px', background: 'linear-gradient(180deg, transparent, #D1FAE5, transparent)' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0EA5E9', lineHeight: 1 }}>45</div>
          <div style={{ fontSize: '7px', color: '#64748B', marginTop: '4px' }}>行为传感器</div>
          <div style={{ fontSize: '6px', color: '#0EA5E9', marginTop: '1px' }}>100% 在线率</div>
        </div>
      </div>
      
      {/* 服务状态 */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '7px', color: '#64748B', marginBottom: '6px', fontWeight: 600 }}>今日服务概览</div>
        {[
          { label: '进行中', value: '12', color: '#10B981', bgColor: '#D1FAE5', percent: 13 },
          { label: '已完成', value: '68', color: '#0EA5E9', bgColor: '#E0F2FE', percent: 72 },
          { label: '待服务', value: '14', color: '#F59E0B', bgColor: '#FEF3C7', percent: 15 },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ 
                  width: '5px', 
                  height: '5px', 
                  borderRadius: '1px', 
                  backgroundColor: item.color,
                }} />
                <span style={{ fontSize: '8px', color: '#475569' }}>{item.label}</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: item.color }}>{item.value}</span>
            </div>
            <div style={{ height: '4px', backgroundColor: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${item.percent}%`, 
                height: '100%', 
                background: `linear-gradient(90deg, ${item.color}, ${item.bgColor})`,
                borderRadius: '2px',
              }} />
            </div>
          </div>
        ))}
      </div>
      
      {/* 告警提示 - 更紧凑 */}
      <div style={{ 
        background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
        borderRadius: '6px', 
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid rgba(239,68,68,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '6px', 
            height: '6px', 
            backgroundColor: '#EF4444', 
            borderRadius: '50%',
            boxShadow: '0 0 6px #EF4444',
          }} />
          <span style={{ fontSize: '8px', color: '#DC2626', fontWeight: 600 }}>3 处异常待处理</span>
        </div>
        <span style={{ fontSize: '7px', color: '#F87171' }}>查看 →</span>
      </div>
    </div>
  </div>
);

// 卡片2 - AI风险识别
const RiskCard = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #ffffff 0%, #FAF5FF 100%)',
    borderRadius: LAYOUT.cardRadius,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    border: '1px solid rgba(139,92,246,0.12)',
  }}>
    {/* 顶部状态栏 - 紧凑 */}
    <div style={{
      padding: '8px 10px 6px',
      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>AI 风险识别</div>
          <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.85)', marginTop: '1px' }}>🤖 智能分析中</div>
        </div>
        <div style={{ 
          fontSize: '7px', 
          backgroundColor: 'rgba(239,68,68,0.9)', 
          padding: '2px 5px', 
          borderRadius: '6px',
          color: 'white',
          fontWeight: 600,
        }}>20 待处理</div>
      </div>
    </div>
    
    {/* 内容区 - 更紧凑 */}
    <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
      {/* 风险分级统计 - 更紧凑 */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {[
          { label: '高风险', count: 3, color: '#EF4444', bgColor: '#FEE2E2' },
          { label: '中风险', count: 5, color: '#F59E0B', bgColor: '#FEF3C7' },
          { label: '低风险', count: 12, color: '#6B7280', bgColor: '#F3F4F6' },
        ].map((item, i) => (
          <div key={i} style={{ 
            flex: 1, 
            textAlign: 'center',
            padding: '6px 2px',
            backgroundColor: item.bgColor,
            borderRadius: '5px',
          }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.count}</div>
            <div style={{ fontSize: '6px', color: '#64748B', marginTop: '2px' }}>{item.label}</div>
          </div>
        ))}
      </div>
      
      {/* AI洞察 - 更紧凑 */}
      <div style={{ 
        background: 'linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)',
        borderRadius: '5px',
        padding: '6px 8px',
      }}>
        <div style={{ fontSize: '7px', color: '#7C3AED', fontWeight: 600 }}>💡 A栋3F男卫超时23分钟</div>
      </div>
      
      {/* 待办列表 - 只保留2个 */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <div style={{ fontSize: '7px', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>紧急待办</div>
        {[
          { location: 'A栋3F男卫', issue: '保洁超时', color: '#EF4444' },
          { location: 'B栋1F大堂', issue: '客流异常', color: '#EF4444' },
        ].map((item, i) => (
          <div key={i} style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 6px',
            marginBottom: '3px',
            backgroundColor: '#FEF2F2',
            borderRadius: '5px',
          }}>
            <div style={{ 
              width: '2px', 
              height: '16px',
              backgroundColor: item.color,
              borderRadius: '1px',
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '8px', fontWeight: 600, color: '#1E293B' }}>{item.location}</div>
              <div style={{ fontSize: '6px', color: '#64748B' }}>{item.issue}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 派单按钮 - 更紧凑 */}
      <div style={{
        padding: '6px',
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        borderRadius: '5px',
        textAlign: 'center',
        fontSize: '8px',
        fontWeight: 600,
        color: 'white',
      }}>
        🤖 AI 智能派单
      </div>
    </div>
  </div>
);

// 卡片3 - 工单执行
const InspectionCard = () => (
  <div style={{
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #ffffff 0%, #F0F9FF 100%)',
    borderRadius: LAYOUT.cardRadius,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,112,255,0.12)',
  }}>
    {/* 顶部状态栏 - 紧凑 */}
    <div style={{
      padding: '8px 10px 6px',
      background: 'linear-gradient(135deg, #0070FF 0%, #0055CC 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* 装饰光效 */}
      <div style={{
        position: 'absolute',
        top: '-15px',
        right: '-15px',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'white' }}>工单执行</div>
          <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.85)', marginTop: '1px' }}>A栋3F · 男卫生间</div>
        </div>
        <div style={{ 
          fontSize: '7px', 
          background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
          padding: '2px 6px', 
          borderRadius: '8px',
          color: 'white',
          fontWeight: 600,
        }}>执行中</div>
      </div>
    </div>
    
    {/* 内容区 - 更紧凑 */}
    <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {/* 照片区 - 更小 */}
      <div style={{
        height: '70px',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F1F5F9',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <Image
          src="/washroom-sink.jpg"
          alt="质检照片"
          fill
          style={{ objectFit: 'cover' }}
        />
        {/* 照片遮罩 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }} />
        {/* 照片信息 */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: '8px',
          right: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '7px', color: 'white', fontWeight: 500 }}>📷 质检拍照</span>
          <span style={{ 
            fontSize: '7px', 
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '1px 4px',
            borderRadius: '3px',
          }}>1/3</span>
        </div>
      </div>
      
      {/* AI评分 - 更紧凑 */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 8px',
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
        borderRadius: '6px',
        border: '1px solid rgba(245,158,11,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '10px' }}>🤖</span>
          <span style={{ fontSize: '8px', color: '#92400E', fontWeight: 600 }}>AI评分</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', gap: '0px' }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} style={{ 
                fontSize: '8px', 
                color: i <= 4 ? '#F59E0B' : '#E5E7EB',
              }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#F59E0B' }}>4.8</span>
        </div>
      </div>
      
      {/* 检查项目 - 只保留3个 */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '7px', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>检查清单</div>
        {[
          { item: '地面清洁', status: '通过', color: '#10B981', icon: '✓' },
          { item: '镜面状态', status: '轻微水渍', color: '#F59E0B', icon: '!' },
          { item: '设备完好', status: '通过', color: '#10B981', icon: '✓' },
        ].map((check, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '4px 8px',
            marginBottom: '3px',
            backgroundColor: check.color === '#10B981' ? '#F0FDF4' : '#FFFBEB',
            borderRadius: '5px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ 
                width: '14px', 
                height: '14px', 
                borderRadius: '50%', 
                backgroundColor: check.color,
                color: 'white',
                fontSize: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>{check.icon}</span>
              <span style={{ fontSize: '8px', color: '#475569' }}>{check.item}</span>
            </div>
            <span style={{ fontSize: '7px', color: check.color, fontWeight: 600 }}>{check.status}</span>
          </div>
        ))}
      </div>
      
      {/* 提交按钮 - 更紧凑 */}
      <div style={{
        padding: '6px',
        background: 'linear-gradient(135deg, #0070FF 0%, #0055CC 100%)',
        borderRadius: '6px',
        textAlign: 'center',
        fontSize: '8px',
        fontWeight: 600,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
      }}>
        <span>📤</span> 提交质检报告
      </div>
    </div>
  </div>
);

// ==========================================
// PC页头组件（感知→决策→执行）
// ==========================================

const PCHeader = () => (
  <div style={{
    height: LAYOUT.headerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #E5E7EB',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  }}>
    {/* 左侧：窗口控制按钮 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)' }} />
      </div>
    </div>
    
    {/* 中间：业务流程 感知→决策→执行 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          boxShadow: '0 2px 4px rgba(16,185,129,0.4)',
        }} />
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>感知</span>
      </div>
      <span style={{ fontSize: '14px', color: '#D1D5DB', fontWeight: 300 }}>→</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
          boxShadow: '0 2px 4px rgba(139,92,246,0.4)',
        }} />
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#7C3AED' }}>决策</span>
      </div>
      <span style={{ fontSize: '14px', color: '#D1D5DB', fontWeight: 300 }}>→</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #0070FF 0%, #0055CC 100%)',
          boxShadow: '0 2px 4px rgba(0,112,255,0.4)',
        }} />
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0055CC' }}>执行</span>
      </div>
    </div>
    
    {/* 右侧：状态指示 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontSize: '10px', color: '#10B981', animation: 'pulse 2s infinite' }}>●</span>
      <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: 500 }}>在线</span>
    </div>
  </div>
);

// ==========================================
// SVG 图标定义
// ==========================================

const IconsSVG = {
  operations: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" strokeLinecap="round" />
    </svg>
  ),
  ssr: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" />
    </svg>
  ),
  collaboration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="4" />
      <circle cx="15" cy="15" r="4" />
      <path d="M12 5l3 3M12 19l-3-3" strokeLinecap="round" />
    </svg>
  ),
};

// ==========================================
// 图标配置
// ==========================================

// VI v10.0 品牌色彩系统 - 六大核心渐变
// gradient-blue-green: #0070FF → #12B98A (科技蓝→AI绿)
// gradient-blue-gold: #0070FF → #F59E0B (科技蓝→黄金)
// gradient-green-gold: #12B98A → #F59E0B (AI绿→黄金)
// gradient-blue-purple: #0070FF → #9333EA (科技蓝→紫罗兰)
// gradient-purple-pink: #9333EA → #EC4899 (紫罗兰→品红)
// gradient-pink-gold: #EC4899 → #F59E0B (品红→黄金)

const ICONS: IconConfig[] = [
  {
    id: 'operations',
    icon: IconsSVG.operations,
    name: '运营管理Agent',
    side: 'top-left',
    lineStart: 'right',
    // 主触发器 - 蓝绿渐变 (gradient-blue-green)
    startColor: '#0070FF',
    endColor: '#12B98A',
  },
  {
    id: 'ssr',
    icon: IconsSVG.ssr,
    name: 'SSR服务记录',
    side: 'top-right',
    lineStart: 'left',
    // 蓝金渐变 (gradient-blue-gold)
    startColor: '#0070FF',
    endColor: '#F59E0B',
  },
  {
    id: 'ticket',
    icon: IconsSVG.ticket,
    name: '工单调度',
    side: 'bottom-left',
    lineStart: 'right',
    // 绿金渐变 (gradient-green-gold)
    startColor: '#12B98A',
    endColor: '#F59E0B',
  },
  {
    id: 'collaboration',
    icon: IconsSVG.collaboration,
    name: '人机协同',
    side: 'bottom-right',
    lineStart: 'left',
    // 紫粉渐变 (gradient-purple-pink)
    startColor: '#9333EA',
    endColor: '#EC4899',
  },
];

// ==========================================
// 获取图标位置
// ==========================================

function getIconPosition(side: IconSide): { x: number; y: number } {
  switch (side) {
    case 'top-left': return { x: topLeftIconX, y: topIconY };
    case 'top-right': return { x: topRightIconX, y: topIconY };
    case 'bottom-left': return { x: bottomLeftIconX, y: bottomIconY };
    case 'bottom-right': return { x: bottomRightIconX, y: bottomIconY };
  }
}

// ==========================================
// 获取射线路径（L形）
// ==========================================

interface LinePathData {
  d: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
}

function getLinePath(
  side: IconSide,
  lineStart: LineStart
): LinePathData {
  const iconPos = getIconPosition(side);
  const iconCenterX = iconPos.x + LAYOUT.iconSize / 2;
  const iconCenterY = iconPos.y + LAYOUT.iconSize / 2;
  
  const isTop = side.startsWith('top');
  const horizontalLength = 60;
  const cornerRadius = 15;
  
  // 起点：图标边缘
  let startX: number;
  if (lineStart === 'right') {
    startX = iconPos.x + LAYOUT.iconSize;
  } else {
    startX = iconPos.x;
  }
  const startY = iconCenterY;
  
  // 水平段终点
  let horizontalEndX: number;
  if (lineStart === 'right') {
    horizontalEndX = startX + horizontalLength;
  } else {
    horizontalEndX = startX - horizontalLength;
  }
  
  // 终点：PC边缘
  const endY = isTop ? pcTop : pcBottom;
  const endX = horizontalEndX;
  
  // 构建L形路径（带圆角）
  let d: string;
  if (isTop) {
    // 向下拐
    if (lineStart === 'right') {
      d = `M ${startX} ${startY} L ${horizontalEndX - cornerRadius} ${startY} Q ${horizontalEndX} ${startY} ${horizontalEndX} ${startY + cornerRadius} L ${endX} ${endY}`;
    } else {
      d = `M ${startX} ${startY} L ${horizontalEndX + cornerRadius} ${startY} Q ${horizontalEndX} ${startY} ${horizontalEndX} ${startY + cornerRadius} L ${endX} ${endY}`;
    }
  } else {
    // 向上拐
    if (lineStart === 'right') {
      d = `M ${startX} ${startY} L ${horizontalEndX - cornerRadius} ${startY} Q ${horizontalEndX} ${startY} ${horizontalEndX} ${startY - cornerRadius} L ${endX} ${endY}`;
    } else {
      d = `M ${startX} ${startY} L ${horizontalEndX + cornerRadius} ${startY} Q ${horizontalEndX} ${startY} ${horizontalEndX} ${startY - cornerRadius} L ${endX} ${endY}`;
    }
  }
  
  return {
    d,
    startPoint: { x: startX, y: startY },
    endPoint: { x: endX, y: endY },
  };
}

// ==========================================
// 主组件
// ==========================================

export default function OperationsAnimation({
  isActive = true,
  style,
  className,
}: OperationsAnimationProps) {
  // 入场动画状态
  const [entryPhase, setEntryPhase] = useState<EntryPhase>('idle');
  const [entryProgress, setEntryProgress] = useState(0);
  const [borderTraceProgress, setBorderTraceProgress] = useState(0);
  const [lineDrawProgress, setLineDrawProgress] = useState(0);
  const [entryLineFadeOut, setEntryLineFadeOut] = useState(0);
  
  // 轮播状态
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [iconProgress, setIconProgress] = useState(0);
  
  // 卡片轮播状态
  const [carouselStep, setCarouselStep] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  
  // 入场卡片展开进度 (0-1)
  const [entryCardExpand, setEntryCardExpand] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // 卡片数据
  const cards = useMemo(() => [
    { id: 'sensing', component: <SensingCard /> },
    { id: 'risk', component: <RiskCard /> },
    { id: 'inspection', component: <InspectionCard /> },
  ], []);

  // 激活/停止控制
  useEffect(() => {
    if (isActive) {
      setEntryPhase('icons-enter');
      setEntryProgress(0);
      setBorderTraceProgress(0);
      setLineDrawProgress(0);
      setEntryLineFadeOut(0);
      setCurrentIconIndex(0);
      setIconProgress(0);
      setCarouselStep(0);
      setSlideProgress(0);
      setEntryCardExpand(0);
      startTimeRef.current = null;
    } else {
      setEntryPhase('idle');
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isActive]);

  // 入场动画
  useEffect(() => {
    if (!isActive || entryPhase === 'idle' || entryPhase === 'complete') return;

    const durations = ENTRY_ANIMATION_CONFIG.durations;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

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
        setLineDrawProgress((elapsed - phase1End) / durations.lineToEdge);
        setEntryProgress(1);
      } else if (elapsed < phase3End) {
        setEntryPhase('border-trace');
        setBorderTraceProgress((elapsed - phase2End) / durations.borderTrace);
        setLineDrawProgress(1);
      } else if (elapsed < phase4End) {
        setEntryPhase('phone-appear');
        setBorderTraceProgress(1);
        setEntryCardExpand(0);
      } else if (elapsed < phase5End) {
        setEntryPhase('content-fade-in');
        // 卡片从中心展开的进度
        setEntryCardExpand((elapsed - phase4End) / durations.contentFadeIn);
      } else if (elapsed < phase6End) {
        setEntryPhase('display');
        setEntryCardExpand(1);
      } else if (elapsed < phase7End) {
        setEntryPhase('line-fade-out');
        setEntryLineFadeOut((elapsed - phase6End) / durations.lineFadeOut);
      } else {
        // 入场完成，从第2个图标开始轮播（与服务设计Agent保持一致）
        setEntryPhase('complete');
        setCurrentIconIndex(1);  // 从第2个图标开始
        startTimeRef.current = null;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, entryPhase]);

  // 轮播动画（图标+卡片）
  // 重要规则：
  // 1. 运营管理Agent（index=0）只参与入场动画，不参与轮播
  // 2. 轮播只有后3个图标参与：SSR(1) → 工单(2) → 人机(3) → 循环
  // 3. 卡片切换由射线触发：射线到达边框（lineDrawing完成）时切换
  // 4. 同步关系：3张卡 → SSR射线触发 → 2张卡 → 工单射线触发 → 1张卡 → 人机射线触发 → 3张卡
  useEffect(() => {
    if (!isActive || entryPhase !== 'complete') return;

    const { iconDuration } = ANIMATION_CONFIG;
    // 轮播图标：只有后3个参与（index 1, 2, 3）
    const carouselIconIndices = [1, 2, 3];  // SSR, 工单, 人机
    const carouselLength = carouselIconIndices.length;  // 3

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      // 图标轮播 - 只有后3个图标参与
      const totalIconTime = iconDuration * carouselLength;
      const iconTime = elapsed % totalIconTime;
      const carouselIndex = Math.floor(iconTime / iconDuration);  // 0, 1, 2
      const newIconProgress = (iconTime % iconDuration) / iconDuration;
      
      // 映射到实际图标索引
      const newIconIndex = carouselIconIndices[carouselIndex];  // 1, 2, 3

      setCurrentIconIndex(newIconIndex);
      setIconProgress(newIconProgress);

      // 卡片切换 - 由射线触发
      // 射线到达边框的时机是 lineDrawing 阶段结束（progress = 0.20）
      // carouselIndex: 0=SSR, 1=工单, 2=人机
      // carouselStep: 0=3张卡, 1=2张卡, 2=1张卡
      //
      // 时序关系：
      // - SSR周期开始(carouselIndex=0)：显示3张卡(step=0)，射线到达后滑动变2张(step=1)
      // - 工单周期开始(carouselIndex=1)：显示2张卡(step=1)，射线到达后滑动变1张(step=2)
      // - 人机周期开始(carouselIndex=2)：显示1张卡(step=2)，射线到达后滑动变3张(step=0)
      
      const lineDrawingEnd = ANIMATION_CONFIG.phases.lineDrawing.end;  // 0.20
      const slideDuration = CAROUSEL_CONFIG.slideDuration;  // 600ms
      const slideProgressDuration = slideDuration / iconDuration;  // 0.1
      
      // 当前图标的射线是否已到达边框
      const lineReached = newIconProgress >= lineDrawingEnd;
      
      // 卡片状态计算
      // 初始状态与 carouselIndex 对应：SSR=0(3张), 工单=1(2张), 人机=2(1张)
      let newCarouselStep = carouselIndex;
      let newSlideProgress = 0;
      
      if (lineReached) {
        // 射线已到达，开始卡片切换动画
        const timeSinceLineReached = newIconProgress - lineDrawingEnd;
        
        if (timeSinceLineReached < slideProgressDuration) {
          // 正在滑动中（0 < slideProgress < 1）
          newSlideProgress = timeSinceLineReached / slideProgressDuration;
          // carouselStep 保持当前值，表示"正在从 step 滑出"
        } else {
          // 滑动完成（slideProgress >= 1），进入下一状态
          newCarouselStep = (carouselIndex + 1) % 3;
          newSlideProgress = 0;
        }
      }

      setCarouselStep(newCarouselStep);
      setSlideProgress(newSlideProgress);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isActive, entryPhase]);

  // 获取PC边框路径
  const getPcBorderPath = useCallback(() => {
    const r = 12;
    const x = pcLeft + 2;
    const y = pcTop + 2;
    const w = LAYOUT.pcWidth - 4;
    const h = LAYOUT.pcHeight - 4;
    
    const midX = x + w / 2;
    return {
      topPath: `M ${midX} ${y} L ${x + r} ${y} Q ${x} ${y} ${x} ${y + r} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h} L ${midX} ${y + h}`,
      bottomPath: `M ${midX} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${midX} ${y + h}`,
    };
  }, []);

  // 计算N张卡片居中时的起始X坐标
  const getCardsStartX = (count: number) => {
    const totalWidth = count * LAYOUT.cardWidth + (count - 1) * LAYOUT.cardGap;
    return (LAYOUT.pcWidth - totalWidth) / 2;
  };

  // 计算卡片样式（向中心聚合动画）
  // 动画设计理念 - 所有切换都是向中心合并：
  // - 3张→2张：右边卡片向中间滑入并淡出，左边两张向中心靠拢
  // - 2张→1张：两张卡片同时向中间滑动合并，左边淡出
  // - 1张→3张：中间卡片向中心滑入淡出，然后新的3张从中心向两边展开弹出
  //
  // 卡片固定身份：
  // - cards[0] = 全域服务感知 (绿色)
  // - cards[1] = AI风险识别 (紫色)  
  // - cards[2] = 工单执行 (蓝色)
  //
  // 状态对应：
  // - carouselStep=0: 显示3张 [0,1,2]
  // - carouselStep=1: 显示2张 [0,1]（右边的2消失）
  // - carouselStep=2: 显示1张 [0]（右边的1消失）
  // - 然后循环回 carouselStep=0
  
  const getCardStyle = (index: number): React.CSSProperties => {
    // 3张卡片居中时各卡片的X位置
    const threeCardStartX = getCardsStartX(3);
    const threeCardPositions = [
      threeCardStartX,
      threeCardStartX + LAYOUT.cardWidth + LAYOUT.cardGap,
      threeCardStartX + 2 * (LAYOUT.cardWidth + LAYOUT.cardGap),
    ];
    
    // 2张卡片居中时各卡片的X位置
    const twoCardStartX = getCardsStartX(2);
    const twoCardPositions = [
      twoCardStartX,
      twoCardStartX + LAYOUT.cardWidth + LAYOUT.cardGap,
    ];
    
    // 1张卡片居中时的X位置
    const oneCardStartX = getCardsStartX(1);
    
    // 中心点X坐标
    const centerX = LAYOUT.pcWidth / 2 - LAYOUT.cardWidth / 2;
    
    // 缓动函数：ease-out效果，更优雅
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.5);
    const easedProgress = easeOut(slideProgress);
    
    // ========================================
    // 统一的"1变3"动画函数
    // 中间卡片先淡入（慢，有呼吸感），
    // 左右卡片从中间位置平移滑出同时淡入（大小不变）
    // ========================================
    const getOneToThreeStyle = (cardIndex: number, progress: number): React.CSSProperties => {
      const easedP = easeOut(progress);
      
      if (cardIndex === 1) {
        // 中间卡片：先淡入，占用前60%的时间，更慢更有呼吸感
        const midProgress = Math.min(1, progress / 0.6);
        const easedMid = easeOut(midProgress);
        return {
          opacity: easedMid,
          transform: 'scale(1)',
          left: threeCardPositions[1],
        };
      } else {
        // 左右卡片：从中间位置平移滑出，同时淡入
        // 从40%开始，到100%完成
        const sideProgress = progress < 0.4 ? 0 : (progress - 0.4) / 0.6;
        const easedSide = easeOut(sideProgress);
        // 从中间位置滑动到最终位置
        const fromX = threeCardPositions[1]; // 从中间开始
        const toX = threeCardPositions[cardIndex]; // 滑到最终位置
        const currentX = fromX + (toX - fromX) * easedSide;
        return {
          opacity: easedSide,
          transform: 'scale(1)',
          left: currentX,
        };
      }
    };
    
    // ========================================
    // 入场动画：使用统一的1变3动画
    // ========================================
    if (entryPhase === 'content-fade-in') {
      return getOneToThreeStyle(index, entryCardExpand);
    }
    
    if (entryPhase === 'display') {
      return { opacity: 1, transform: 'scale(1)', left: threeCardPositions[index] };
    }
    
    if (entryPhase === 'complete') {
      // ========================================
      // 3张→2张（SSR射线触发）
      // 右边卡片(index=2)向中间滑入淡出
      // 左边两张(index=0,1)向中心靠拢居中
      // ========================================
      if (carouselStep === 0 && slideProgress > 0) {
        if (index === 2) {
          // 右边卡片：向中间滑入并淡出
          const fromX = threeCardPositions[2];
          const toX = threeCardPositions[1]; // 滑向中间位置
          const currentX = fromX + (toX - fromX) * easedProgress;
          return {
            opacity: 1 - easedProgress,
            transform: `scale(${1 - 0.15 * easedProgress})`,
            left: currentX,
            zIndex: 5,
          };
        } else {
          // 左边两张卡片：向中心靠拢到2张布局
          const fromX = threeCardPositions[index];
          const toX = twoCardPositions[index];
          const currentX = fromX + (toX - fromX) * easedProgress;
          return { opacity: 1, transform: 'scale(1)', left: currentX, zIndex: 10 };
        }
      }
      
      // ========================================
      // 2张→1张（工单射线触发）
      // 右边卡片(index=1)向中间滑入淡出
      // 左边卡片(index=0)向中心滑动
      // ========================================
      if (carouselStep === 1 && slideProgress > 0) {
        if (index === 2) {
          // 已经消失的卡片
          return { opacity: 0, left: centerX, transform: 'scale(0.85)' };
        }
        if (index === 1) {
          // 右边卡片：向中间滑入并淡出
          const fromX = twoCardPositions[1];
          const toX = centerX;
          const currentX = fromX + (toX - fromX) * easedProgress;
          return {
            opacity: 1 - easedProgress,
            transform: `scale(${1 - 0.15 * easedProgress})`,
            left: currentX,
            zIndex: 5,
          };
        }
        if (index === 0) {
          // 左边卡片：向中心滑动，变成唯一的一张
          const fromX = twoCardPositions[0];
          const toX = oneCardStartX;
          const currentX = fromX + (toX - fromX) * easedProgress;
          return { opacity: 1, transform: 'scale(1)', left: currentX, zIndex: 10 };
        }
      }
      
      // ========================================
      // 1张→3张（人机射线触发）
      // 使用统一的1变3动画函数
      // 前35%：当前卡片向中心滑入淡出
      // 后65%：使用 getOneToThreeStyle 展开3张卡片
      // ========================================
      if (carouselStep === 2 && slideProgress > 0) {
        const fadeOutEnd = 0.35; // 淡出占35%，更慢更有呼吸感
        const fadeOutProgress = slideProgress < fadeOutEnd 
          ? slideProgress / fadeOutEnd
          : 1;
        const fadeInProgress = slideProgress < fadeOutEnd 
          ? 0 
          : (slideProgress - fadeOutEnd) / (1 - fadeOutEnd);
        
        if (fadeInProgress === 0) {
          // 前半段：当前卡片(index=0)向中心滑入淡出
          const easedFadeOut = easeOut(fadeOutProgress);
          if (index === 0) {
            const fromX = oneCardStartX;
            const toX = threeCardPositions[1]; // 滑向中间位置
            const currentX = fromX + (toX - fromX) * easedFadeOut * 0.5;
            return {
              opacity: 1 - easedFadeOut,
              transform: `scale(${1 - 0.1 * easedFadeOut})`,
              left: currentX,
              zIndex: 5,
            };
          }
          // 其他卡片隐藏在中间位置
          return { opacity: 0, left: threeCardPositions[1], transform: 'scale(1)' };
        } else {
          // 后半段：使用统一的1变3动画
          return getOneToThreeStyle(index, fadeInProgress);
        }
      }
      
      // ========================================
      // 静止状态时的位置
      // ========================================
      if (carouselStep === 0) {
        // 3张卡片状态：[0,1,2] 全部显示
        return { opacity: 1, transform: 'scale(1)', left: threeCardPositions[index] };
      } else if (carouselStep === 1) {
        // 2张卡片状态：[0,1] 显示，[2] 隐藏
        if (index === 2) {
          return { opacity: 0, left: centerX, transform: 'scale(0.85)' };
        }
        return { opacity: 1, transform: 'scale(1)', left: twoCardPositions[index] };
      } else if (carouselStep === 2) {
        // 1张卡片状态：[0] 显示，[1,2] 隐藏
        if (index !== 0) {
          return { opacity: 0, left: centerX, transform: 'scale(0.85)' };
        }
        return { opacity: 1, transform: 'scale(1)', left: oneCardStartX };
      }
    }
    
    return { opacity: 0, left: 0 };
  };

  // 渲染
  const showPC = ['phone-appear', 'content-fade-in', 'display', 'line-fade-out', 'complete'].includes(entryPhase);
  const showLines = ['line-to-edge', 'border-trace', 'phone-appear', 'content-fade-in', 'display', 'line-fade-out'].includes(entryPhase) || entryPhase === 'complete';
  const showBorderTrace = ['border-trace', 'phone-appear'].includes(entryPhase);

  if (!isActive && entryPhase === 'idle') {
    return (
      <div
        className={className}
        style={{
          width: LAYOUT.canvasWidth,
          height: LAYOUT.canvasHeight,
          backgroundColor: 'transparent',
          position: 'relative',
          overflow: 'hidden',
          ...style,
        }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        width: LAYOUT.canvasWidth,
        height: LAYOUT.canvasHeight,
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 四个图标 */}
      {ICONS.map((iconConfig, index) => {
        const pos = getIconPosition(iconConfig.side);
        
        // 轮播阶段：运营管理Agent（index=0）不参与，永远不激活
        // 入场阶段：只有运营管理Agent（index=0）激活
        let isCurrentIcon: boolean;
        if (entryPhase === 'complete') {
          // 轮播阶段：index=0 不参与
          isCurrentIcon = index !== 0 && index === currentIconIndex;
        } else {
          // 入场阶段：只有 index=0 参与
          isCurrentIcon = index === 0;
        }
        
        const activation = entryPhase === 'complete'
          ? getIconActivation(iconProgress, isCurrentIcon)
          : { isActive: isCurrentIcon && entryPhase !== 'idle', progress: entryProgress };

        // 标签在上方，图标在下方
        return (
          <div key={iconConfig.id}>
            {/* 图标标签（在图标上方） */}
            <div
              style={{
                position: 'absolute',
                left: pos.x + LAYOUT.iconSize / 2,
                top: pos.y - 16,
                transform: 'translateX(-50%)',
                fontSize: '10px',
                fontWeight: activation.isActive ? 600 : 400,
                color: activation.isActive ? iconConfig.startColor : '#64748b',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                opacity: entryPhase === 'icons-enter' ? entryProgress : 1,
                zIndex: 25,
              }}
            >
              {iconConfig.name}
            </div>

            {/* 图标（在标签下方） */}
            <div
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: LAYOUT.iconSize,
                height: LAYOUT.iconSize,
                backgroundColor: activation.isActive ? 'white' : 'rgba(255,255,255,0.8)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: activation.isActive
                  ? `0 6px 16px ${iconConfig.startColor}40`
                  : '0 2px 8px rgba(0,0,0,0.05)',
                border: `1px solid ${activation.isActive ? iconConfig.startColor : '#e5e7eb'}`,
                transform: `translateY(${activation.isActive ? -2 : 0}px)`,
                transition: 'all 0.3s ease-out',
                zIndex: 20,
                opacity: entryPhase === 'icons-enter' ? entryProgress : 1,
              }}
            >
              <div
                style={{
                  width: LAYOUT.innerIconSize,
                  height: LAYOUT.innerIconSize,
                  color: activation.isActive ? iconConfig.startColor : '#9CA3AF',
                  transition: 'color 0.3s',
                }}
              >
                {iconConfig.icon}
              </div>
            </div>
          </div>
        );
      })}

      {/* 射线 */}
      {showLines && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 15,
          }}
        >
          <defs>
            {ICONS.map((icon) => {
              const pathData = getLinePath(icon.side, icon.lineStart);
              
              // 轮播阶段使用动态渐变（脉冲效果）
              if (entryPhase === 'complete' && icon.id === ICONS[currentIconIndex].id) {
                const stops = getGradientStops(iconProgress, icon.startColor, icon.endColor);
                return (
                  <linearGradient
                    key={`gradient-${icon.id}`}
                    id={`line-gradient-${icon.id}`}
                    gradientUnits="userSpaceOnUse"
                    x1={pathData.startPoint.x}
                    y1={pathData.startPoint.y}
                    x2={pathData.endPoint.x}
                    y2={pathData.endPoint.y}
                  >
                    {stops.map((s, i) => (
                      <stop key={i} offset={`${s.offset}%`} stopColor={s.color} />
                    ))}
                  </linearGradient>
                );
              }
              // 入场阶段和静态状态使用沿路径的渐变
              return (
                <linearGradient
                  key={`gradient-${icon.id}`}
                  id={`line-gradient-${icon.id}`}
                  gradientUnits="userSpaceOnUse"
                  x1={pathData.startPoint.x}
                  y1={pathData.startPoint.y}
                  x2={pathData.endPoint.x}
                  y2={pathData.endPoint.y}
                >
                  <stop offset="0%" stopColor={icon.startColor} />
                  <stop offset="100%" stopColor={icon.endColor} />
                </linearGradient>
              );
            })}
          </defs>

          {ICONS.map((iconConfig, index) => {
            // 轮播阶段：运营管理Agent（index=0）不参与，只有后3个图标参与
            // 入场阶段：只有运营管理Agent（index=0）显示射线
            const isCurrentIcon = entryPhase === 'complete' ? index === currentIconIndex : index === 0;
            
            // 入场阶段只显示第一个图标的射线
            if (entryPhase !== 'complete' && index !== 0) return null;
            
            // 轮播阶段：运营管理Agent（index=0）不显示射线
            if (entryPhase === 'complete' && index === 0) return null;
            
            const lineState = entryPhase === 'complete'
              ? getLineState(iconProgress, isCurrentIcon)
              : { drawing: lineDrawProgress, opacity: 1, fadeProgress: -1 };

            if (lineState.drawing === 0 && lineState.opacity === 0) return null;

            const pathData = getLinePath(iconConfig.side, iconConfig.lineStart);
            const totalLength = 200;
            
            // 计算射线的 dashArray 和 dashOffset
            let dashArray = '';
            let dashOffset = 0;
            
            // 入场阶段：射线淡出
            if (entryPhase === 'line-fade-out') {
              // 从图标端向手机端消失
              const fadeProgress = entryLineFadeOut;
              dashArray = `${totalLength * (1 - fadeProgress)} ${totalLength}`;
              dashOffset = -totalLength * fadeProgress;
            } else if (lineState.fadeProgress >= 0 && lineState.fadeProgress < 1) {
              // 轮播阶段：射线淡出（从图标端向手机端消失）
              dashArray = `${totalLength * (1 - lineState.fadeProgress)} ${totalLength}`;
              dashOffset = -totalLength * lineState.fadeProgress;
            } else if (lineState.drawing < 1) {
              // 射线绘制阶段
              dashArray = `${totalLength * lineState.drawing} ${totalLength}`;
            } else {
              // 射线完全显示
              dashArray = `${totalLength} ${totalLength}`;
            }
            
            // 脉冲效果
            const phase = getAnimationPhase(iconProgress);
            const isPulsing = phase === 'pulse1' || phase === 'pulse2';

            return (
              <g key={`line-${iconConfig.id}`} opacity={lineState.opacity}>
                {/* 发光效果 */}
                <path
                  d={pathData.d}
                  fill="none"
                  stroke={`url(#line-gradient-${iconConfig.id})`}
                  strokeWidth={isPulsing ? 6 : 4}
                  strokeLinecap="round"
                  pathLength={totalLength}
                  strokeDasharray={dashArray || undefined}
                  strokeDashoffset={dashOffset}
                  style={{ opacity: 0.3, filter: 'blur(3px)' }}
                />
                {/* 主线条 */}
                <path
                  d={pathData.d}
                  fill="none"
                  stroke={`url(#line-gradient-${iconConfig.id})`}
                  strokeWidth={isPulsing ? 2.5 : 2}
                  strokeLinecap="round"
                  pathLength={totalLength}
                  strokeDasharray={dashArray || undefined}
                  strokeDashoffset={dashOffset}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* 边框描边动画 */}
      {showBorderTrace && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 15,
          }}
        >
          <defs>
            <linearGradient id="ops-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {(() => {
            const { topPath, bottomPath } = getPcBorderPath();
            const borderLength = 800;
            const dashLen = borderTraceProgress * borderLength;
            
            return (
              <g>
                <path d={topPath} fill="none" stroke="url(#ops-border-gradient)" strokeWidth="2" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} />
                <path d={bottomPath} fill="none" stroke="url(#ops-border-gradient)" strokeWidth="2" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} />
              </g>
            );
          })()}
        </svg>
      )}

      {/* PC界面 */}
      {showPC && (
        <div
          style={{
            position: 'absolute',
            left: pcLeft,
            top: pcTop,
            width: LAYOUT.pcWidth,
            height: LAYOUT.pcHeight,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',  // 保持圆角裁剪
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.12)',
            border: '1px solid #E5E7EB',
            opacity: entryPhase === 'phone-appear' ? 0.5 : 1,
            transform: entryPhase === 'phone-appear' ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 0.3s ease-out',
            zIndex: 5,
          }}
        >
          {/* 页头：感知→决策→执行 */}
          <PCHeader />
          
          {/* 卡片容器 */}
          <div style={{
            position: 'absolute',
            top: cardsTop,
            left: 0,
            right: 0,
            height: LAYOUT.cardHeight,
            overflow: 'hidden',
          }}>
            {cards.map((card, index) => (
              <div
                key={card.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  width: LAYOUT.cardWidth,
                  height: LAYOUT.cardHeight,
                  transition: entryPhase === 'complete' ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...getCardStyle(index),
                }}
              >
                {card.component}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
