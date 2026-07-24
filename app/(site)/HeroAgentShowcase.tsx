'use client';

/**
 * 首页 Hero · FMClaw 工作台演示
 *
 * 改造自 Agentic 套件「服务优化 Agent」动效模块
 * (app/(agents)/_agents-app/components/animations/ReviewAnimation.tsx)：
 * 动画机制、阶段与轮播顺序保持原样，仅做首页适配——
 * 1. 文案替换：主触发图标改为 FMClaw™ Agent，卡片日期口径更新
 * 2. 画布 540×660（压缩上下留白），由外层包装按容器宽度等比缩放
 * 3. SSR / 无 JS / prefers-reduced-motion：初始即渲染完成终态
 *    （数据大屏卡居中、射线点亮），不再渲染空 div
 * 3b. 首帧即完成态：水合后不重放入场动画（避免数秒空画布），
 *     轮播从与静态首帧一致的稳定点（IoT感知 pulse2）直接续跑
 * 4. 轮播 4 图标 × 4.5s = 18s 一轮，符合首页 12–18s 循环要求
 * 5. keyframe 依赖改为首页自带 hpulse（home.css）
 */

import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import Link from 'next/link';

// ==========================================
// 类型定义
// ==========================================

interface GLinePositions {
  G3: number;
  G4: number;
  G5: number;
}

interface ReviewAnimationProps {
  isActive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  /** 外部传入的G线位置（用于对齐首页参照线） */
  gLines?: GLinePositions;
}

type LineStart = 'left' | 'right';
type IconSide = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface IconConfig {
  id: string;
  icon: ReactNode;
  name: string;
  href: string;
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
  canvasHeight: 660,  // 首页 Hero 适配：压缩上下留白
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

// 卡片区域（暂时未使用）
// const cardsTop = LAYOUT.headerHeight + LAYOUT.cardTopGap;

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
  iconDuration: 4500,  // 首页 Hero：4 图标 × 4.5s = 18s 一轮
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
  cycleDuration: 6000,   // 增加停留时间
  slideDuration: 1200,   // 更慢的滑动，更优雅
};

// 首帧即完成态：水合后不重放入场动画，轮播直接从
// 「IoT感知 图标激活、数据大屏卡片在最前」的稳定点继续，
// 与 SSR 静态首帧完全一致，消除加载后的空画布窗口。
// 0.50 位于 pulse2 区间（0.38–0.55）：图标已激活、射线点亮、卡片滑动已完成。
const CAROUSEL_RESUME_PROGRESS = 0.50;
// IoT感知（图标索引 2）位于轮播序列 [3,0,1,2] 的第 4 位（carouselIndex=3）
const CAROUSEL_RESUME_OFFSET = ANIMATION_CONFIG.iconDuration * (3 + CAROUSEL_RESUME_PROGRESS);

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
// 卡片布局配置
// ==========================================

// 方案C：居中大卡片 + 左右露边预览
const CARD_LAYOUT = {
  // 主卡片尺寸（居中，几乎占满）
  cardWidth: 460,   // 主卡片宽度
  cardHeight: 390,  // 主卡片高度（留出顶部边距）
  // 预览边条宽度
  previewWidth: 28, // 左右露出的预览宽度
  // 间距
  gap: 8,           // 主卡片与预览之间的间距
  topPadding: 15,   // 顶部留白
  // 卡片圆角
  borderRadius: 12,
};

// ==========================================
// 微图表组件 - 折线图
// ==========================================

const MiniLineChart = ({ data, color, height = 32 }: { data: number[], color: string, height?: number }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const padding = 2;
  
  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`chart-gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* 填充区域 */}
      <polygon
        points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
        fill={`url(#chart-gradient-${color.replace('#', '')})`}
      />
      {/* 折线 */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 最后一个点 */}
      <circle
        cx={width - padding}
        cy={height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2)}
        r="2.5"
        fill={color}
      />
    </svg>
  );
};

// ==========================================
// 卡片1 - 数据大屏（业绩展示风格）
// ==========================================

// ==========================================
// 微图表组件 - 环形进度图
// ==========================================
const MiniRingChart = ({ percent, color, size = 48, strokeWidth = 5 }: { percent: number, color: string, size?: number, strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percent / 100);
  
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#F1F5F9"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

// ==========================================
// 微图表组件 - 柱状对比图
// ==========================================
const MiniBarChart = ({ data, colors, height = 40 }: { data: { label: string, value: number }[], colors: string[], height?: number }) => {
  const max = Math.max(...data.map(d => d.value));
  const barWidth = 16;
  const gap = 8;
  const width = data.length * barWidth + (data.length - 1) * gap;
  
  return (
    <svg width={width} height={height + 12}>
      {data.map((d, i) => {
        const barHeight = (d.value / max) * height;
        const x = i * (barWidth + gap);
        return (
          <g key={i}>
            <rect
              x={x}
              y={height - barHeight}
              width={barWidth}
              height={barHeight}
              fill={colors[i % colors.length]}
              rx={3}
            />
            <text
              x={x + barWidth / 2}
              y={height + 10}
              fontSize="7"
              fill="#64748B"
              textAnchor="middle"
            >{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

// ==========================================
// 卡片1 - 数据大屏（图表可视化版）
// ==========================================
const DashboardCard = () => {
  // 模拟数据 - 近7日趋势
  const weeklyServiceData = [156, 189, 234, 278, 312, 298, 345];
  const weeklyScoreData = [4.1, 4.2, 4.3, 4.2, 4.4, 4.3, 4.5];
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid #E2E8F0',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
    }}>
      {/* 标题栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(16,185,129,0.25)',
          }}>
            <span style={{ fontSize: '12px' }}>📊</span>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>启盟服务大屏</div>
            <div style={{ fontSize: '8px', color: '#64748B' }}>启盟广场 · 本月运营态势</div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '8px',
          color: '#10B981',
          background: '#ECFDF5',
          padding: '3px 8px',
          borderRadius: '10px',
          border: '1px solid #D1FAE5',
        }}>
          <span style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#10B981',
            animation: 'hpulse 2s infinite',
          }} />
          实时
        </div>
      </div>
      
      {/* 第一行：核心KPI环形图 + 总量趋势 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {/* 完成率环形图 */}
        <div style={{
          width: '90px',
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          borderRadius: '10px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #A7F3D0',
        }}>
          <div style={{ position: 'relative' }}>
            <MiniRingChart percent={98.7} color="#10B981" size={52} strokeWidth={6} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#059669',
            }}>98.7%</div>
          </div>
          <div style={{ fontSize: '8px', color: '#065F46', marginTop: '4px', fontWeight: 600 }}>完成率</div>
        </div>
        
        {/* 服务总量 + 趋势线 */}
        <div style={{
          flex: 1,
          background: 'white',
          borderRadius: '10px',
          padding: '10px',
          border: '1px solid #F1F5F9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '8px', color: '#64748B' }}>本月服务总量</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#1E293B' }}>234,578</span>
                <span style={{ fontSize: '9px', color: '#64748B' }}>次</span>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: '#ECFDF5',
              padding: '2px 6px',
              borderRadius: '8px',
            }}>
              <span style={{ fontSize: '10px', color: '#10B981' }}>↗</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: '#10B981' }}>12.5%</span>
            </div>
          </div>
          <div style={{ marginTop: '4px' }}>
            <MiniLineChart data={weeklyServiceData} color="#10B981" height={32} />
            <div style={{ fontSize: '7px', color: '#94A3B8', textAlign: 'right', marginTop: '2px' }}>近7日趋势 ↗ 稳步上升</div>
          </div>
        </div>
      </div>
      
      {/* 第二行：三大指标状态灯 */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[
          { label: '蓝领签到', value: 94.2, color: '#10B981', status: '优秀' },
          { label: '服务评分', value: 91.8, color: '#3B82F6', status: '良好' },
          { label: '质检达标', value: 96.5, color: '#10B981', status: '优秀' },
        ].map((item, i) => (
          <div key={i} style={{
            flex: 1,
            background: 'white',
            borderRadius: '8px',
            padding: '8px',
            border: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            {/* 状态灯 */}
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: item.color,
              boxShadow: `0 0 6px ${item.color}80`,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '7px', color: '#64748B' }}>{item.label}</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>{item.value}%</div>
            </div>
            <div style={{
              fontSize: '7px',
              color: item.color,
              background: `${item.color}15`,
              padding: '2px 5px',
              borderRadius: '4px',
              fontWeight: 600,
            }}>{item.status}</div>
          </div>
        ))}
      </div>
      
      {/* 第三行：AI评分趋势 + 工时对比 */}
      <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
        {/* AI评分趋势 */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          borderRadius: '8px',
          padding: '10px',
          border: '1px solid #FDE68A',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ fontSize: '8px', color: '#92400E', fontWeight: 600 }}>⭐ AI服务评分</div>
            <div style={{ fontSize: '7px', color: '#B45309' }}>近7日</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#D97706' }}>4.5</div>
              <div style={{ fontSize: '7px', color: '#92400E' }}>平均分 · 稳定</div>
            </div>
            <MiniLineChart data={weeklyScoreData} color="#F59E0B" height={38} />
          </div>
        </div>
        
        {/* 工时对比柱状图 */}
        <div style={{
          flex: 1,
          background: 'white',
          borderRadius: '8px',
          padding: '10px',
          border: '1px solid #F1F5F9',
        }}>
          <div style={{ fontSize: '8px', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>📈 工时达成对比</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <MiniBarChart 
              data={[
                { label: '计划', value: 52480 },
                { label: '实际', value: 51236 },
              ]} 
              colors={['#94A3B8', '#10B981']}
              height={36}
            />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#10B981' }}>97.6%</div>
              <div style={{ fontSize: '7px', color: '#64748B' }}>达成率</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部状态栏 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        padding: '6px',
        background: '#F8FAFC',
        borderRadius: '6px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: '8px', color: '#64748B' }}>运营正常</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: '8px', color: '#64748B' }}>趋势向好</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: '8px', color: '#64748B' }}>AI监控中</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 卡片2 - 员工薪资表
// ==========================================

const PayrollCard = () => {
  // 员工数据
  const employees = [
    { name: '张三', role: '主管', hours: 198, kpi1: '96.2%', kpi2: '4.6', kpi3: '102%', salary: '12,850' },
    { name: '李明', role: '领班', hours: 204, kpi1: '94.5%', kpi2: '4.5', kpi3: '-', salary: '9,680' },
    { name: '王芳', role: '领班', hours: 196, kpi1: '93.8%', kpi2: '4.4', kpi3: '-', salary: '9,240' },
    { name: '刘伟', role: '员工', hours: 186, kpi1: '92.1%', kpi2: '4.3', kpi3: '-', salary: '7,890' },
    { name: '陈静', role: '员工', hours: 201, kpi1: '95.6%', kpi2: '4.5', kpi3: '-', salary: '8,520' },
    { name: '杨磊', role: '员工', hours: 192, kpi1: '91.2%', kpi2: '4.2', kpi3: '-', salary: '7,650' },
    { name: '赵敏', role: '员工', hours: 188, kpi1: '93.4%', kpi2: '4.4', kpi3: '-', salary: '7,980' },
    { name: '周涛', role: '员工', hours: 178, kpi1: '89.5%', kpi2: '4.1', kpi3: '-', salary: '7,120' },
    { name: '吴婷', role: '员工', hours: 195, kpi1: '94.8%', kpi2: '4.5', kpi3: '-', salary: '8,280' },
    { name: '郑浩', role: '员工', hours: 182, kpi1: '90.3%', kpi2: '4.2', kpi3: '-', salary: '7,340' },
    { name: '孙丽', role: '员工', hours: 199, kpi1: '95.1%', kpi2: '4.4', kpi3: '-', salary: '8,150' },
    { name: '马超', role: '员工', hours: 176, kpi1: '88.7%', kpi2: '4.0', kpi3: '-', salary: '6,980' },
    { name: '林娜', role: '员工', hours: 190, kpi1: '92.6%', kpi2: '4.3', kpi3: '-', salary: '7,760' },
    { name: '何强', role: '员工', hours: 184, kpi1: '91.8%', kpi2: '4.2', kpi3: '-', salary: '7,450' },
  ];
  
  const totalSalary = employees.reduce((sum, e) => sum + parseInt(e.salary.replace(',', '')), 0);
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      borderRadius: '12px',
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid #E2E8F0',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
    }}>
      {/* 标题栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            background: 'linear-gradient(135deg, #0070FF 0%, #3B82F6 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 10px rgba(0,112,255,0.25)',
          }}>
            <span style={{ fontSize: '14px' }}>💰</span>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>员工薪资表</div>
            <div style={{ fontSize: '9px', color: '#64748B' }}>2026年6月 · 启盟广场项目</div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '9px',
          color: '#0070FF',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          padding: '4px 10px',
          borderRadius: '12px',
          border: '1px solid #BFDBFE',
        }}>
          <span>🤖</span>
          <span style={{ fontWeight: 500 }}>AI核算</span>
        </div>
      </div>
      
      {/* 表格 */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* 表头 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 40px 45px 50px 40px 40px 55px',
          gap: '4px',
          padding: '6px 8px',
          background: '#F1F5F9',
          borderRadius: '6px',
          fontSize: '8px',
          fontWeight: 600,
          color: '#64748B',
          marginBottom: '4px',
        }}>
          <div>姓名</div>
          <div>岗位</div>
          <div>工时</div>
          <div>签到率</div>
          <div>AI分</div>
          <div>预算</div>
          <div style={{ textAlign: 'right' }}>薪资</div>
        </div>
        
        {/* 数据行 */}
        <div style={{ height: 'calc(100% - 30px)', overflowY: 'auto' }}>
          {employees.map((emp, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '60px 40px 45px 50px 40px 40px 55px',
              gap: '4px',
              padding: '5px 8px',
              fontSize: '8px',
              color: '#475569',
              borderBottom: '1px solid #F1F5F9',
              background: i % 2 === 0 ? 'transparent' : 'rgba(241,245,249,0.5)',
            }}>
              <div style={{ fontWeight: 500, color: '#1E293B' }}>{emp.name}</div>
              <div style={{
                color: emp.role === '主管' ? '#7C3AED' : emp.role === '领班' ? '#0070FF' : '#64748B',
                fontWeight: emp.role !== '员工' ? 500 : 400,
              }}>{emp.role}</div>
              <div>{emp.hours}h</div>
              <div style={{ color: parseFloat(emp.kpi1) >= 94 ? '#10B981' : parseFloat(emp.kpi1) >= 90 ? '#F59E0B' : '#EF4444' }}>
                {emp.kpi1}
              </div>
              <div style={{ color: parseFloat(emp.kpi2) >= 4.4 ? '#10B981' : '#64748B' }}>{emp.kpi2}</div>
              <div style={{ color: emp.kpi3 !== '-' ? '#10B981' : '#CBD5E1' }}>{emp.kpi3}</div>
              <div style={{ textAlign: 'right', fontWeight: 600, color: '#1E293B' }}>¥{emp.salary}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 合计 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px',
        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
        borderRadius: '6px',
        marginTop: '8px',
        border: '1px solid #C7D2FE',
      }}>
        <span style={{ fontSize: '10px', color: '#4F46E5', fontWeight: 600 }}>本月应发合计</span>
        <span style={{ fontSize: '16px', fontWeight: 800, color: '#4F46E5' }}>¥{totalSalary.toLocaleString()}</span>
      </div>
      
      {/* 签批栏 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
        padding: '10px 14px',
        background: 'linear-gradient(135deg, #FAFBFC 0%, #F1F5F9 100%)',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '8px', color: '#94A3B8' }}>制表：</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'linear-gradient(135deg, #0070FF 0%, #3B82F6 100%)',
              padding: '3px 8px',
              borderRadius: '10px',
            }}>
              <span style={{ fontSize: '10px' }}>🤖</span>
              <span style={{ fontSize: '8px', color: 'white', fontWeight: 600 }}>AI物业经理</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '8px', color: '#94A3B8' }}>审批：</span>
            <span style={{ 
              fontSize: '9px', 
              color: '#94A3B8', 
              borderBottom: '1px dashed #CBD5E1', 
              padding: '0 16px',
              minWidth: '50px',
            }}>待签</span>
          </div>
        </div>
        <div style={{
          fontSize: '9px',
          color: '#64748B',
          background: 'white',
          padding: '3px 8px',
          borderRadius: '6px',
          border: '1px solid #E2E8F0',
        }}>
          📅 2026-06-15
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 卡片3 - 服务优化报告（文字为主，图+结论模式）
// ==========================================

const ReviewReportCard = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)',
      borderRadius: '12px',
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid #E2E8F0',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
    }}>
      {/* 标题栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(245,158,11,0.2)',
          }}>
            <span style={{ fontSize: '12px' }}>📋</span>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>服务优化报告</div>
            <div style={{ fontSize: '8px', color: '#64748B' }}>2026年6月 · AI智能分析</div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '8px',
          color: '#F59E0B',
          background: '#FFFBEB',
          padding: '3px 8px',
          borderRadius: '10px',
          border: '1px solid #FEF3C7',
          fontWeight: 500,
        }}>
          <span>✨</span>
          <span>AI生成</span>
        </div>
      </div>
      
      {/* 核心结论摘要 */}
      <div style={{
        background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
        borderRadius: '10px',
        padding: '12px',
        border: '1px solid #FCD34D',
      }}>
        <div style={{ fontSize: '9px', color: '#92400E', fontWeight: 600, marginBottom: '6px' }}>📌 本月核心结论</div>
        <div style={{ fontSize: '11px', color: '#1E293B', lineHeight: 1.5, fontWeight: 500 }}>
          本月整体运营<span style={{ color: '#059669', fontWeight: 700 }}>稳中向好</span>，服务完成率98.7%创季度新高。
          <span style={{ color: '#DC2626', fontWeight: 700 }}>重点关注B栋1F大堂</span>，建议增派人手。
        </div>
      </div>
      
      {/* 问题分析 + 结论 */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '12px',
        border: '1px solid #F1F5F9',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          {/* 小环形图 */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <MiniRingChart percent={65} color="#EF4444" size={48} strokeWidth={5} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '9px',
              fontWeight: 700,
              color: '#EF4444',
            }}>65%</div>
          </div>
          {/* 文字结论 */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#1E293B', marginBottom: '4px' }}>问题集中度分析</div>
            <div style={{ fontSize: '9px', color: '#475569', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600, color: '#EF4444' }}>A栋3F男卫</span>问题最多（23次），占比35%。
              <span style={{ fontWeight: 600 }}>建议：增加该点位巡检频次，安排专人跟进地面清洁问题。</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI优化建议 - 文字段落 */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '12px',
        border: '1px solid #F1F5F9',
        flex: 1,
      }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>💡 AI优化建议</div>
        
        {/* 建议1 */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#10B981',
              color: 'white',
              fontSize: '9px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>1</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#059669' }}>减少 A栋5F 巡检频次</span>
          </div>
          <div style={{ fontSize: '9px', color: '#475569', lineHeight: 1.5, paddingLeft: '24px' }}>
            该区域签到率92%、AI评分4.6，表现优异。建议从每日3次调整为2次，<span style={{ fontWeight: 600 }}>预计每月节省工时40小时</span>。
          </div>
        </div>
        
        {/* 建议2 */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#EF4444',
              color: 'white',
              fontSize: '9px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>2</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#DC2626' }}>增加 B栋1F 人员配置</span>
          </div>
          <div style={{ fontSize: '9px', color: '#475569', lineHeight: 1.5, paddingLeft: '24px' }}>
            签到率仅78%，AI评分3.8低于平均。<span style={{ fontWeight: 600 }}>建议新增1名保洁员，重点覆盖早高峰时段</span>。
          </div>
        </div>
        
        {/* 建议3 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <span style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#F59E0B',
              color: 'white',
              fontSize: '9px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>3</span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#D97706' }}>员工激励建议</span>
          </div>
          <div style={{ fontSize: '9px', color: '#475569', lineHeight: 1.5, paddingLeft: '24px' }}>
            <span style={{ fontWeight: 600 }}>陈静</span>（签到率95.6%）、<span style={{ fontWeight: 600 }}>张三</span>（AI评分4.6）表现突出，建议纳入月度优秀员工表彰。
          </div>
        </div>
      </div>
      
      {/* 底部签批信息 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 10px',
        background: '#F8FAFC',
        borderRadius: '6px',
        fontSize: '8px',
        color: '#64748B',
      }}>
        <span>生成时间：2026-06-15 09:30</span>
        <span>AI物业经理</span>
        <span style={{ color: '#F59E0B' }}>待领导审阅</span>
      </div>
    </div>
  );
};

// ==========================================
// 卡片4: 机器人作业中心（模拟数据演示）
// ==========================================

const RobotCard = () => {
  // 模拟数据 - 机器人作业列表
  const robots = [
    { name: '清洁机器人 C-01', zone: '3F 连廊', status: '清扫中', progress: 78, color: '#9333EA' },
    { name: '四足巡检 Q-02', zone: '地库 B2', status: '巡检中', progress: 45, color: '#EC4899' },
    { name: '清洁机器人 C-02', zone: '1F 大堂', status: '清扫中', progress: 62, color: '#9333EA' },
    { name: '配送机器人 D-03', zone: '充电桩', status: '回充', progress: 100, color: '#94A3B8' },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8FC 100%)',
      borderRadius: '12px',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: '1px solid #E2E8F0',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
    }}>
      {/* 标题栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(147,51,234,0.25)',
          }}>
            <span style={{ fontSize: '12px' }}>🤖</span>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>机器人作业中心</div>
            <div style={{ fontSize: '8px', color: '#64748B' }}>启盟广场 · 今日调度看板</div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '8px',
          color: '#9333EA',
          background: '#FAF5FF',
          padding: '3px 8px',
          borderRadius: '10px',
          border: '1px solid #F3E8FF',
        }}>
          <span style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#9333EA',
            animation: 'hpulse 2s infinite',
          }} />
          6 台在线
        </div>
      </div>

      {/* 第一行：任务完成率环形图 + 今日作业概况 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{
          width: '90px',
          background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
          borderRadius: '10px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #E9D5FF',
        }}>
          <div style={{ position: 'relative' }}>
            <MiniRingChart percent={92} color="#9333EA" size={52} strokeWidth={6} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#7E22CE',
            }}>92%</div>
          </div>
          <div style={{ fontSize: '8px', color: '#6B21A8', marginTop: '4px', fontWeight: 600 }}>任务完成率</div>
        </div>

        <div style={{
          flex: 1,
          background: 'white',
          borderRadius: '10px',
          padding: '10px',
          border: '1px solid #F1F5F9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '8px', color: '#64748B' }}>今日清扫面积</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '22px', fontWeight: 800, color: '#1E293B' }}>12,400</span>
                <span style={{ fontSize: '9px', color: '#64748B' }}>㎡</span>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: '#FAF5FF',
              padding: '2px 6px',
              borderRadius: '8px',
            }}>
              <span style={{ fontSize: '10px', color: '#9333EA' }}>↗</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: '#9333EA' }}>8.3%</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', fontSize: '8px', color: '#64748B' }}>
            <span>巡检点位 <b style={{ color: '#1E293B' }}>86</b> 处</span>
            <span>异常上报 <b style={{ color: '#EC4899' }}>2</b> 条</span>
            <span>人工介入 <b style={{ color: '#1E293B' }}>0</b> 次</span>
          </div>
        </div>
      </div>

      {/* 第二行：机器人作业列表 */}
      <div style={{
        flex: 1,
        background: 'white',
        borderRadius: '10px',
        padding: '10px',
        border: '1px solid #F1F5F9',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <div style={{ fontSize: '9px', color: '#64748B', fontWeight: 600 }}>实时作业队列</div>
        {robots.map((r) => (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '108px', fontSize: '9px', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>{r.name}</div>
            <div style={{ width: '48px', fontSize: '8px', color: '#64748B', whiteSpace: 'nowrap' }}>{r.zone}</div>
            <div style={{ flex: 1, height: '6px', background: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                width: `${r.progress}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${r.color} 0%, ${r.color}CC 100%)`,
                borderRadius: '3px',
              }} />
            </div>
            <div style={{
              width: '44px',
              fontSize: '8px',
              fontWeight: 600,
              color: r.color,
              textAlign: 'right',
              whiteSpace: 'nowrap',
            }}>{r.status} {r.progress < 100 ? `${r.progress}%` : ''}</div>
          </div>
        ))}
      </div>

      {/* 底部信息栏 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 10px',
        background: '#F8FAFC',
        borderRadius: '6px',
        fontSize: '8px',
        color: '#64748B',
      }}>
        <span>调度模式：AI 自动排班</span>
        <span>下一班次 14:00</span>
        <span style={{ color: '#9333EA' }}>IoT 联动中</span>
      </div>
    </div>
  );
};

// ==========================================
// SVG 图标定义
// ==========================================

const IconsSVG = {
  // Agentic 套件 - 四宫格 Agent 矩阵
  review: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="2" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="2" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="2" />
      <circle cx="7.25" cy="7.25" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16.75" cy="16.75" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  // 数据集市 - 数据库圆柱
  payroll: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  ),
  // IoT 感知 - 传感波纹+点位
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" />
      <path d="M8.5 10.5a5 5 0 0 1 7 0" strokeLinecap="round" />
      <path d="M6 8a8.5 8.5 0 0 1 12 0" strokeLinecap="round" />
      <path d="M12 16v4" strokeLinecap="round" />
      <path d="M8 20h8" strokeLinecap="round" />
    </svg>
  ),
  // 机器人 - 四足机器人简形
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="8" width="14" height="7" rx="2.5" />
      <path d="M7 15l-1.5 4M11 15l-1 4M13 15l1 4M17 15l1.5 4" strokeLinecap="round" />
      <path d="M17 8V6.2A1.6 1.6 0 0 1 18.6 4.6" strokeLinecap="round" />
      <circle cx="19.4" cy="4.4" r="1" fill="currentColor" stroke="none" />
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

// 图标配置（首页适配：四个平台组成部分，均可点击进入对应产品页）
// 射线触发对应关系：
// - Agentic 套件（index=0）→ 触发服务优化报告卡片
// - 数据集市（index=1）→ 触发员工薪资卡片
// - IoT 感知（index=2）→ 触发数据大屏卡片
// - 机器人（index=3）→ 触发机器人作业中心卡片

const ICONS: IconConfig[] = [
  {
    id: 'review',
    icon: IconsSVG.review,
    name: 'Agentic 套件',
    href: '/agents',
    side: 'top-left',
    lineStart: 'right',
    // 主触发器 - 蓝绿渐变 (gradient-blue-green)
    startColor: '#0070FF',
    endColor: '#12B98A',
  },
  {
    id: 'payroll',
    icon: IconsSVG.payroll,
    name: '数据集市',
    href: '/products/fmclaw',
    side: 'top-right',
    lineStart: 'left',
    // 蓝金渐变 (gradient-blue-gold)
    startColor: '#0070FF',
    endColor: '#F59E0B',
  },
  {
    id: 'dashboard',
    icon: IconsSVG.dashboard,
    name: 'IoT 感知',
    href: '/products/iot',
    side: 'bottom-left',
    lineStart: 'right',
    // 绿金渐变 (gradient-green-gold)
    startColor: '#12B98A',
    endColor: '#F59E0B',
  },
  {
    id: 'api',
    icon: IconsSVG.api,
    name: '机器人',
    href: '/products/robots',
    side: 'bottom-right',
    lineStart: 'left',
    // 紫粉渐变 (gradient-purple-pink)
    startColor: '#9333EA',
    endColor: '#EC4899',
  },
];

// 卡片类型
type CardType = 'dashboard' | 'payroll' | 'report' | 'robot';

// 卡片配置：定义每张卡片的标题（用于堆叠时显示）
const CARDS_CONFIG: { id: CardType; title: string; color: string }[] = [
  { id: 'dashboard', title: '数据大屏', color: '#10B981' },
  { id: 'payroll', title: '员工薪资', color: '#0070FF' },
  { id: 'report', title: '复盘报告', color: '#F59E0B' },
  { id: 'robot', title: '机器人作业', color: '#9333EA' },
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
  
  // 终点：延伸到卡片边缘（不是PC区域边缘）
  // 卡片居中，计算卡片的实际顶部和底部位置
  const cardTop = pcTop + CARD_LAYOUT.topPadding;
  const cardBottom = cardTop + CARD_LAYOUT.cardHeight;
  const endY = isTop ? cardTop : cardBottom;
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

function ShowcaseCanvas({
  isActive = true,
  style,
  className,
  gLines,
}: ReviewAnimationProps) {
  // 使用外部传入的 gLines 或默认值
  const G3 = gLines?.G3 ?? LAYOUT.G3;
  const G4 = gLines?.G4 ?? LAYOUT.G4;
  const G5 = gLines?.G5 ?? LAYOUT.G5;
  
  // 动态计算画布宽度（基于 G3-G5 的距离）
  const canvasWidth = G5 - G3;
  const canvasHeight = LAYOUT.canvasHeight;
  const pcWidth = canvasWidth;
  const pcHeight = LAYOUT.pcHeight;
  
  // 动态计算PC界面位置
  const dynamicPcLeft = 0;
  const dynamicPcTop = (canvasHeight - pcHeight) / 2;
  const dynamicPcBottom = dynamicPcTop + pcHeight;
  
  // 动态计算图标位置（相对于画布，G3=0）
  const relativeG3 = 0;
  const relativeG4 = G4 - G3;
  const relativeG5 = G5 - G3;
  
  const dynamicTopLeftIconX = relativeG3 + LAYOUT.iconGap;
  const dynamicTopRightIconX = relativeG4 + LAYOUT.iconGap;
  const dynamicTopIconY = dynamicPcTop - LAYOUT.iconToPcGap - LAYOUT.iconSize;
  
  const dynamicBottomLeftIconX = relativeG4 - LAYOUT.iconGap - LAYOUT.iconSize;
  const dynamicBottomRightIconX = relativeG5 - LAYOUT.iconGap - LAYOUT.iconSize;
  const dynamicBottomIconY = dynamicPcBottom + LAYOUT.iconToPcGap;
  
  // 入场动画状态
  // 初始即终态：SSR / 无 JS / reduced-motion 下静态展示完成状态
  const [entryPhase, setEntryPhase] = useState<EntryPhase>('complete');
  const [entryProgress, setEntryProgress] = useState(0);
  const [borderTraceProgress, setBorderTraceProgress] = useState(0);
  const [lineDrawProgress, setLineDrawProgress] = useState(0);
  const [entryLineFadeOut, setEntryLineFadeOut] = useState(0);
  
  // 轮播状态（初始终态：数据大屏图标激活、射线完整点亮）
  const [currentIconIndex, setCurrentIconIndex] = useState(2);
  const [iconProgress, setIconProgress] = useState(CAROUSEL_RESUME_PROGRESS);

  // 动效是否运行（仅在客户端且未开启 reduced-motion 时为 true）
  const [motionOn, setMotionOn] = useState(false);
  
  // 卡片轮播状态（暂时保留用于图标轮播逻辑）
  const [carouselStep, setCarouselStep] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  // 动态获取图标位置
  const getDynamicIconPosition = useCallback((side: IconSide): { x: number; y: number } => {
    switch (side) {
      case 'top-left': return { x: dynamicTopLeftIconX, y: dynamicTopIconY };
      case 'top-right': return { x: dynamicTopRightIconX, y: dynamicTopIconY };
      case 'bottom-left': return { x: dynamicBottomLeftIconX, y: dynamicBottomIconY };
      case 'bottom-right': return { x: dynamicBottomRightIconX, y: dynamicBottomIconY };
    }
  }, [dynamicTopLeftIconX, dynamicTopRightIconX, dynamicTopIconY, dynamicBottomLeftIconX, dynamicBottomRightIconX, dynamicBottomIconY]);
  
  // 动态获取射线路径
  const getDynamicLinePath = useCallback((side: IconSide, lineStart: LineStart) => {
    const iconPos = getDynamicIconPosition(side);
    const iconCenterY = iconPos.y + LAYOUT.iconSize / 2;
    
    const isTop = side.startsWith('top');
    const horizontalLength = 60;
    const cornerRadius = 15;
    
    let startX = lineStart === 'right' ? iconPos.x + LAYOUT.iconSize : iconPos.x;
    const startY = iconCenterY;
    
    let horizontalEndX = lineStart === 'right' 
      ? startX + horizontalLength 
      : startX - horizontalLength;
    
    // 射线终点：卡片边缘
    const cardTop = dynamicPcTop + CARD_LAYOUT.topPadding;
    const cardBottom = cardTop + CARD_LAYOUT.cardHeight;
    const endY = isTop ? cardTop : cardBottom;
    const endX = horizontalEndX;
    
    let d: string;
    if (isTop) {
      if (lineStart === 'right') {
        d = `M ${startX} ${startY} L ${horizontalEndX - cornerRadius} ${startY} Q ${horizontalEndX} ${startY} ${horizontalEndX} ${startY + cornerRadius} L ${endX} ${endY}`;
      } else {
        d = `M ${startX} ${startY} L ${horizontalEndX + cornerRadius} ${startY} Q ${horizontalEndX} ${startY} ${horizontalEndX} ${startY + cornerRadius} L ${endX} ${endY}`;
      }
    } else {
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
  }, [getDynamicIconPosition, dynamicPcTop]);

  // 激活/停止控制
  // reduced-motion / 停用时：保持终态静态展示，不启动任何动画
  useEffect(() => {
    if (!isActive) {
      setMotionOn(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // 复位到终态静帧，避免停在入场/滑动的中间帧
      setEntryPhase('complete');
      setCurrentIconIndex(2);
      setIconProgress(CAROUSEL_RESUME_PROGRESS);
      setCarouselStep(0);
      setSlideProgress(0);
      startTimeRef.current = null;
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    // 首帧即完成态：不重放入场动画（会产生数秒空画布），
    // 保持终态并让轮播从与静态首帧一致的稳定点继续。
    setEntryPhase('complete');
    setCurrentIconIndex(2);
    setIconProgress(CAROUSEL_RESUME_PROGRESS);
    setCarouselStep(0);
    setSlideProgress(0);
    startTimeRef.current = null;
    setMotionOn(true);
  }, [isActive]);

  // 入场动画
  useEffect(() => {
    if (!motionOn || entryPhase === 'idle' || entryPhase === 'complete') return;

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
      } else if (elapsed < phase5End) {
        setEntryPhase('content-fade-in');
        // 暂时跳过卡片展开动画
      } else if (elapsed < phase6End) {
        setEntryPhase('display');
      } else if (elapsed < phase7End) {
        setEntryPhase('line-fade-out');
        setEntryLineFadeOut((elapsed - phase6End) / durations.lineFadeOut);
      } else {
        // 入场完成，轮播从机器人(index=3)开始（见轮播 effect 中 carouselIconIndices 的说明）
        setEntryPhase('complete');
        setCurrentIconIndex(3);  // 从机器人开始
        setCarouselStep(0);  // 数据大屏卡片在最前
        startTimeRef.current = null;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [motionOn, entryPhase]);

  // 轮播动画（图标+卡片）
  // 重要规则：
  // 1. 4 个图标全部参与轮播：Agentic套件(0) → 数据集市(1) → IoT感知(2) → 机器人(3) → 循环
  // 2. 射线触发对应关系：
  //    - Agentic套件 射线 → 服务优化报告卡片滑到最前
  //    - 数据集市 射线 → 员工薪资卡片滑到最前
  //    - IoT感知 射线 → 数据大屏卡片滑到最前
  //    - 机器人 射线 → 机器人作业中心卡片滑到最前
  // 3. 卡片顺序: dashboard(0) → payroll(1) → report(2) → robot(3)
  //    初始显示: dashboard在最前
  useEffect(() => {
    if (!motionOn || entryPhase !== 'complete') return;

    const { iconDuration } = ANIMATION_CONFIG;
    // 轮播图标：4 个全部参与。
    // 顺序从机器人(3)开始：入场结束时 dashboard 卡片在最前，
    // 而机器人的「上一张卡片」恰好是 dashboard（IoT感知→dashboard），
    // 这样首次轮播不会出现卡片瞬间跳变。
    const carouselIconIndices = [3, 0, 1, 2];  // 机器人, Agentic套件, 数据集市, IoT感知
    const carouselLength = carouselIconIndices.length;  // 4

    const animate = (timestamp: number) => {
      // 从终态稳定点继续（IoT感知 激活、数据大屏卡在最前），首帧与 SSR 静帧一致
      if (!startTimeRef.current) startTimeRef.current = timestamp - CAROUSEL_RESUME_OFFSET;
      const elapsed = timestamp - startTimeRef.current;

      // 图标轮播 - 4 个图标依次参与
      const totalIconTime = iconDuration * carouselLength;
      const iconTime = elapsed % totalIconTime;
      const carouselIndex = Math.floor(iconTime / iconDuration);  // 0, 1, 2, 3
      const newIconProgress = (iconTime % iconDuration) / iconDuration;
      
      // 映射到实际图标索引
      const newIconIndex = carouselIconIndices[carouselIndex];  // 3, 0, 1, 2

      setCurrentIconIndex(newIconIndex);
      setIconProgress(newIconProgress);

      // 卡片切换 - 由射线触发
      // 射线到达边框的时机是 lineDrawing 阶段结束（progress = 0.20）
      // 
      // 射线触发对应关系：
      // - carouselIndex=0 (Agentic套件) → 服务优化报告卡片(2)滑到最前
      // - carouselIndex=1 (数据集市) → 员工薪资卡片(1)滑到最前
      // - carouselIndex=2 (IoT感知) → 数据大屏卡片(0)滑到最前
      // - carouselIndex=3 (机器人) → 机器人作业中心卡片(3)滑到最前
      //
      // carouselStep 表示当前最前面的卡片索引：0=dashboard, 1=payroll, 2=report, 3=robot
      // 初始状态(入场后): carouselStep=0 (dashboard在最前)
      
      const lineDrawingEnd = ANIMATION_CONFIG.phases.lineDrawing.end;  // 0.20
      const slideDuration = CAROUSEL_CONFIG.slideDuration;  // 800ms
      const slideProgressDuration = slideDuration / iconDuration;  // ~0.13
      
      // 当前图标的射线是否已到达边框
      const lineReached = newIconProgress >= lineDrawingEnd;
      
      // 卡片目标状态：根据当前图标决定要显示哪张卡片（按图标索引映射）
      // icon 0(Agentic套件) → card 2(report)
      // icon 1(数据集市) → card 1(payroll)
      // icon 2(IoT感知) → card 0(dashboard)
      // icon 3(机器人) → card 3(robot)
      const iconToCardMap = [2, 1, 0, 3];  // 图标索引 → 卡片索引
      const targetCardIndex = iconToCardMap[newIconIndex];
      
      // 上一个图标对应的卡片（用于确定切换前的状态）
      const prevCarouselIndex = (carouselIndex + carouselLength - 1) % carouselLength;
      const prevCardIndex = iconToCardMap[carouselIconIndices[prevCarouselIndex]];
      
      let newCarouselStep = prevCardIndex;  // 切换前的状态
      let newSlideProgress = 0;
      
      if (lineReached) {
        // 射线已到达，开始卡片切换动画
        const timeSinceLineReached = newIconProgress - lineDrawingEnd;
        
        if (timeSinceLineReached < slideProgressDuration) {
          // 正在滑动中（0 < slideProgress < 1）
          newSlideProgress = timeSinceLineReached / slideProgressDuration;
          // carouselStep 保持切换前的值
        } else {
          // 滑动完成（slideProgress >= 1），进入目标状态
          newCarouselStep = targetCardIndex;
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
  }, [motionOn, entryPhase]);

  // 获取卡片边框路径（不是动画区边框）
  const getCardBorderPath = useCallback(() => {
    const r = CARD_LAYOUT.borderRadius;
    // 卡片位置：居中显示
    const cardLeft = (pcWidth - CARD_LAYOUT.cardWidth) / 2;
    const cardTop = CARD_LAYOUT.topPadding;
    const x = dynamicPcLeft + cardLeft + 2;
    const y = dynamicPcTop + cardTop + 2;
    const w = CARD_LAYOUT.cardWidth - 4;
    const h = CARD_LAYOUT.cardHeight - 4;
    
    const midX = x + w / 2;
    return {
      topPath: `M ${midX} ${y} L ${x + r} ${y} Q ${x} ${y} ${x} ${y + r} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h} L ${midX} ${y + h}`,
      bottomPath: `M ${midX} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${midX} ${y + h}`,
    };
  }, [dynamicPcLeft, dynamicPcTop, pcWidth]);

  // 卡片样式函数已移除 - 服务优化 Agent 暂时不使用卡片

  // 渲染
  const showPC = ['phone-appear', 'content-fade-in', 'display', 'line-fade-out', 'complete'].includes(entryPhase);
  const showLines = ['line-to-edge', 'border-trace', 'phone-appear', 'content-fade-in', 'display', 'line-fade-out'].includes(entryPhase) || entryPhase === 'complete';
  const showBorderTrace = ['border-trace', 'phone-appear'].includes(entryPhase);

  // 首页适配：不再渲染空 div —— 初始态即完成终态，SSR/无 JS 下直接可读

  return (
    <div
      className={className}
      style={{
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 背景聚焦：演示区内的白色柔光，把视线收向居中卡片、并在城市底图上垫出可读区；
          边缘渐隐，与城市底图自然融合 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 62% 55% at 50% 46%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0) 78%)',
        }}
      />

      {/* 四个图标 */}
      {ICONS.map((iconConfig, index) => {
        const pos = getDynamicIconPosition(iconConfig.side);
        
        // 轮播阶段：4 个图标全部参与
        // 入场阶段：只有 Agentic 套件（index=0）激活
        let isCurrentIcon: boolean;
        if (entryPhase === 'complete') {
          isCurrentIcon = index === currentIconIndex;
        } else {
          // 入场阶段：只有 index=0 参与
          isCurrentIcon = index === 0;
        }
        
        const activation = entryPhase === 'complete'
          ? getIconActivation(iconProgress, isCurrentIcon)
          : { isActive: isCurrentIcon && entryPhase !== 'idle', progress: entryProgress };

        // 标签对齐：左侧图标左对齐、右侧图标右对齐，避免长名称超出画布被裁切
        const isLeftSide = iconConfig.side.endsWith('left');
        const labelStyle: React.CSSProperties = isLeftSide
          ? { left: pos.x, textAlign: 'left' }
          : { left: pos.x + LAYOUT.iconSize, transform: 'translateX(-100%)', textAlign: 'right' };

        // 标签在上方，图标在下方；整体包成链接，可点击进入对应产品页
        return (
          <Link
            key={iconConfig.id}
            href={iconConfig.href}
            className="hsc-icon"
            aria-label={`${iconConfig.name}，查看详情`}
            style={{ ['--hsc-c' as string]: iconConfig.startColor }}
          >
            {/* 图标标签（在图标上方） */}
            <span
              className="hsc-label"
              style={{
                position: 'absolute',
                top: pos.y - 19,
                fontSize: '10px',
                fontWeight: activation.isActive ? 600 : 400,
                color: activation.isActive ? iconConfig.startColor : '#64748b',
                // 直接悬浮在城市底图上：白色柔光晕保证标签压在楼宇纹理上仍可读
                textShadow: '0 0 6px rgba(255,255,255,.9), 0 0 2px rgba(255,255,255,.9)',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s',
                opacity: entryPhase === 'icons-enter' ? entryProgress : 1,
                zIndex: 25,
                ...labelStyle,
              }}
            >
              {iconConfig.name}
              <svg className="hsc-go" width="9" height="9" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            {/* 图标（在标签下方） */}
            <span
              className="hsc-box"
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
              <span
                style={{
                  display: 'block',
                  width: LAYOUT.innerIconSize,
                  height: LAYOUT.innerIconSize,
                  color: activation.isActive ? iconConfig.startColor : '#9CA3AF',
                  transition: 'color 0.3s',
                }}
              >
                {iconConfig.icon}
              </span>
            </span>
          </Link>
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
              const pathData = getDynamicLinePath(icon.side, icon.lineStart);
              
              // 轮播阶段使用动态渐变（脉冲效果）
              if (entryPhase === 'complete' && icon.id === ICONS[currentIconIndex]?.id) {
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
            // 轮播阶段：4 个图标全部参与射线绘制
            // 入场阶段：只有 Agentic 套件（index=0）显示射线
            const isCurrentIcon = entryPhase === 'complete' ? index === currentIconIndex : index === 0;
            
            // 入场阶段只显示第一个图标的射线
            if (entryPhase !== 'complete' && index !== 0) return null;
            
            const lineState = entryPhase === 'complete'
              ? getLineState(iconProgress, isCurrentIcon)
              : { drawing: lineDrawProgress, opacity: 1, fadeProgress: -1 };

            if (lineState.drawing === 0 && lineState.opacity === 0) return null;

            const pathData = getDynamicLinePath(iconConfig.side, iconConfig.lineStart);
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
            {/* VI品牌渐变色：blue-gold */}
            <linearGradient id="card-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0070FF" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {(() => {
            const { topPath, bottomPath } = getCardBorderPath();
            const borderLength = 800;
            const dashLen = borderTraceProgress * borderLength;
            
            return (
              <g>
                <path d={topPath} fill="none" stroke="url(#card-border-gradient)" strokeWidth="2" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} />
                <path d={bottomPath} fill="none" stroke="url(#card-border-gradient)" strokeWidth="2" strokeLinecap="round" pathLength={borderLength} strokeDasharray={`${dashLen} ${borderLength}`} />
              </g>
            );
          })()}
        </svg>
      )}

      {/* 方案C：居中大卡片 + 左右露边预览 */}
      {showPC && (
        <div
          style={{
            position: 'absolute',
            left: dynamicPcLeft,
            top: dynamicPcTop,
            width: pcWidth,
            height: pcHeight,
            opacity: entryPhase === 'phone-appear' ? 0.5 : 1,
            transform: entryPhase === 'phone-appear' ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 0.3s ease-out',
            zIndex: 5,
            overflow: 'hidden',
            borderRadius: '12px',
            background: 'transparent',
          }}
        >
          {/* 卡片轮播容器 */}
          {(() => {
            const cardComponents = [
              <DashboardCard key="dashboard" />, 
              <PayrollCard key="payroll" />, 
              <ReviewReportCard key="report" />,
              <RobotCard key="robot" />
            ];
            
            const cardColors = ['#10B981', '#0070FF', '#F59E0B', '#9333EA'];
            const cardTitles = ['数据大屏', '员工薪资', '复盘报告', '机器人作业'];
            
            // 计算主卡片居中位置
            const mainCardLeft = (pcWidth - CARD_LAYOUT.cardWidth) / 2;
            
            // 计算滑动偏移
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
            const easedSlide = easeOut(slideProgress);
            
            // 当前显示的卡片索引和目标卡片索引
            const iconToCardMap = [2, 1, 0, 3];  // Agentic套件→报告, 数据集市→薪资, IoT感知→大屏, 机器人→机器人作业
            const targetCardIndex = slideProgress > 0 ? iconToCardMap[currentIconIndex] : carouselStep;
            
            // 计算每张卡片的位置（4 卡循环）
            // position: -2=左侧隐藏, -1=左预览, 0=居中, 1=右预览
            // 归一到 [-2, 1]：切换方向为「左预览→居中→右预览→滑出」，
            // 隐藏卡片停在 -2（透明），下一步淡入为左预览
            const normalizePosition = (diff: number): number => {
              const mod = ((diff % 4) + 4) % 4;  // 0..3
              return mod > 1 ? mod - 4 : mod;    // -2, -1, 0, 1
            };
            
            const getCardPosition = (cardIndex: number): number =>
              normalizePosition(cardIndex - carouselStep);
            
            const getTargetPosition = (cardIndex: number): number =>
              normalizePosition(cardIndex - targetCardIndex);
            
            // 渲染所有卡片
            return (
              <>
                {[0, 1, 2, 3].map((cardIndex) => {
                  const currentPos = getCardPosition(cardIndex);
                  const targetPos = getTargetPosition(cardIndex);
                  
                  // 计算动画中间位置
                  let pos = currentPos;
                  if (slideProgress > 0 && currentPos !== targetPos) {
                    // 处理循环切换（如从位置1跳到-1）
                    let fromPos = currentPos;
                    let toPos = targetPos;
                    
                    // 如果是跨边界切换，需要特殊处理
                    if (Math.abs(currentPos - targetPos) > 1) {
                      // 例如：从1到-1，应该是向右滑出然后从左边进来
                      if (currentPos > targetPos) {
                        // 向右滑出
                        toPos = 2;  // 滑出到右边
                      } else {
                        // 向左滑出
                        toPos = -2;  // 滑出到左边
                      }
                    }
                    pos = fromPos + (toPos - fromPos) * easedSlide;
                  }
                  
                  // 根据位置计算样式
                  const isCenter = Math.abs(pos) < 0.3;
                  const isLeft = pos < -0.3;
                  const isRight = pos > 0.3;
                  
                  // X坐标计算
                  let x: number;
                  if (pos === 0) {
                    x = mainCardLeft;
                  } else if (pos < 0) {
                    // 左侧预览
                    x = -CARD_LAYOUT.cardWidth + CARD_LAYOUT.previewWidth + Math.abs(pos) * (mainCardLeft + CARD_LAYOUT.cardWidth - CARD_LAYOUT.previewWidth);
                    if (pos >= -1) {
                      x = -CARD_LAYOUT.cardWidth + CARD_LAYOUT.previewWidth + (1 + pos) * (mainCardLeft + CARD_LAYOUT.cardWidth - CARD_LAYOUT.previewWidth);
                    }
                  } else {
                    // 右侧预览
                    x = LAYOUT.pcWidth - CARD_LAYOUT.previewWidth + (pos - 1) * (mainCardLeft + CARD_LAYOUT.cardWidth - CARD_LAYOUT.previewWidth);
                    if (pos <= 1) {
                      x = mainCardLeft + (pos) * (LAYOUT.pcWidth - CARD_LAYOUT.previewWidth - mainCardLeft);
                    }
                  }
                  
                  // 简化的X坐标计算
                  const leftPreviewX = -CARD_LAYOUT.cardWidth + CARD_LAYOUT.previewWidth;
                  const centerX = mainCardLeft;
                  const rightPreviewX = LAYOUT.pcWidth - CARD_LAYOUT.previewWidth;
                  
                  if (pos <= -1) {
                    x = leftPreviewX;
                  } else if (pos >= 1) {
                    x = rightPreviewX;
                  } else if (pos < 0) {
                    // -1 到 0 之间：从左预览滑到中间
                    x = leftPreviewX + (1 + pos) * (centerX - leftPreviewX);
                  } else {
                    // 0 到 1 之间：从中间滑到右预览
                    x = centerX + pos * (rightPreviewX - centerX);
                  }
                  
                  // 透明度和缩放 - 增强淡入淡出效果
                  const absPos = Math.abs(pos);
                  // 连续的透明度曲线：中心 1 → 预览位 0.6 → 隐藏位(|pos|=2) 0
                  const baseOpacity = absPos <= 1
                    ? 1 - absPos * 0.4
                    : Math.max(0, 0.6 * (2 - absPos));
                  // 淡入淡出效果：在切换过程中增加额外的透明度变化
                  const fadeEffect = slideProgress > 0 && slideProgress < 1 
                    ? Math.sin(slideProgress * Math.PI) * 0.1  // 正弦曲线，中间最亮
                    : 0;
                  const opacity = Math.max(0, Math.min(1, baseOpacity + (isCenter ? fadeEffect : -fadeEffect)));
                  const scale = 1 - absPos * 0.04;
                  const zIndex = 30 - Math.round(absPos * 10);
                  

                  return (
                    <div
                      key={cardIndex}
                      style={{
                        position: 'absolute',
                        left: x,
                        top: CARD_LAYOUT.topPadding,
                        width: CARD_LAYOUT.cardWidth,
                        height: CARD_LAYOUT.cardHeight,
                        borderRadius: CARD_LAYOUT.borderRadius,
                        overflow: 'hidden',
                        boxShadow: isCenter 
                          ? '0 25px 50px -12px rgba(0,0,0,0.25)' 
                          : '0 10px 30px -8px rgba(0,0,0,0.12)',
                        opacity,
                        transform: `scale(${scale})`,
                        transition: slideProgress > 0 ? 'none' : 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        zIndex,
                        // 非居中卡片显示色条边框
                        borderLeft: isLeft ? `4px solid ${cardColors[cardIndex]}` : 'none',
                        borderRight: isRight ? `4px solid ${cardColors[cardIndex]}` : 'none',
                      }}
                    >
                      {/* 卡片内容 */}
                      <div style={{ 
                        width: '100%', 
                        height: '100%',
                        filter: isCenter ? 'none' : 'brightness(0.92) saturate(0.9)',
                      }}>
                        {cardComponents[cardIndex]}
                      </div>
                      
                      {/* 左侧预览时显示标题标签 */}
                      {isLeft && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          right: 8,
                          transform: 'translateY(-50%) rotate(-90deg)',
                          transformOrigin: 'center',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: cardColors[cardIndex],
                          whiteSpace: 'nowrap',
                          letterSpacing: '1px',
                        }}>
                          {cardTitles[cardIndex]}
                        </div>
                      )}
                      
                      {/* 右侧预览时显示标题标签 */}
                      {isRight && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: 8,
                          transform: 'translateY(-50%) rotate(90deg)',
                          transformOrigin: 'center',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: cardColors[cardIndex],
                          whiteSpace: 'nowrap',
                          letterSpacing: '1px',
                        }}>
                          {cardTitles[cardIndex]}
                        </div>
                      )}
                    </div>
                  );
                })}
                

              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 首页包装：可视触发 + 响应式等比缩放
// ==========================================

/**
 * Hero 右栏演示组件（默认导出）
 *
 * - 固定 540 宽画布 → 按容器宽度 transform: scale 等比缩放
 * - IntersectionObserver：进入视口才启动动画（离开重置，回来重播）
 * - SSR/无 JS/reduced-motion：ShowcaseCanvas 初始态即完成终态，静态可读
 */
export default function HeroAgentShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // 初始 0.93 ≈ 505px 演示舞台内的实际比例：SSR/无 JS 静帧不裁切画布边缘，
  // 客户端水合后按容器实测宽度立即校正（桌面端结果与初始值几乎一致）
  const [scale, setScale] = useState(0.93);
  const [active, setActive] = useState(false);

  // 按容器宽度等比缩放固定画布
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(1, w / LAYOUT.canvasWidth));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 进入视口才播放
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setActive(entries[0].isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scaledHeight = Math.round(LAYOUT.canvasHeight * scale);

  return (
    <div
      ref={wrapRef}
      aria-label="FMClaw 工作台演示：Agent 自动生成数据大屏、员工薪资表与服务优化报告"
      role="img"
      style={{ width: '100%', height: scaledHeight, position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          width: LAYOUT.canvasWidth,
          height: LAYOUT.canvasHeight,
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        <ShowcaseCanvas isActive={active} />
      </div>
    </div>
  );
}
