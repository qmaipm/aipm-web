'use client';

/**
 * 可复用的图标轮播动画组件
 * 
 * 特性：
 * 1. 支持竖向(portrait)和横向(landscape)两种布局
 * 2. 画布尺寸可配置（宽度/高度）
 * 3. 图标位置自动按比例计算
 * 4. 手机模拟器尺寸自动适应
 * 5. 所有动画参数独立配置
 * 
 * 竖向布局：图标在左右，射线水平发出后垂直连接
 * 横向布局：图标在上下，射线水平发出后垂直连接动画区
 */

import { useState, useEffect, useCallback, useMemo, useRef, ReactNode } from 'react';

// ==========================================
// 类型定义
// ==========================================

/** 布局方向 */
export type Orientation = 'portrait' | 'landscape';

/** 图标位置 - 竖向布局 */
export type PortraitSide = 'left' | 'right';

/** 图标位置 - 横向布局 */
export type LandscapeSide = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/** 射线起始方向 */
export type LineStart = 'top' | 'bottom' | 'left' | 'right';

/** 图标配置 - 竖向布局 */
export interface PortraitIconConfig {
  id: string;
  icon: ReactNode;
  name: string;
  /** 相对Y位置：0-1，基于画布高度的比例 */
  relativeY: number;
  /** 图标在左侧还是右侧 */
  side: PortraitSide;
  /** 射线起始方向（竖向时通常是 top/bottom） */
  lineStart: 'top' | 'bottom';
  /** 渐变起始色 */
  startColor: string;
  /** 渐变结束色 */
  endColor: string;
  /** 对应的屏幕组件 */
  screen: ReactNode;
}

/** 图标配置 - 横向布局 */
export interface LandscapeIconConfig {
  id: string;
  icon: ReactNode;
  name: string;
  /** 相对X位置：0-1，基于画布宽度的比例 */
  relativeX: number;
  /** 图标在上排还是下排，左侧还是右侧 */
  side: LandscapeSide;
  /** 射线起始方向（横向时通常是 left/right，水平发出后垂直连接） */
  lineStart: 'left' | 'right';
  /** 渐变起始色 */
  startColor: string;
  /** 渐变结束色 */
  endColor: string;
  /** 对应的屏幕组件 */
  screen: ReactNode;
}

/** 通用图标配置（兼容两种布局） */
export type IconConfig = PortraitIconConfig | LandscapeIconConfig;

/** 动画配置 */
export interface AnimationConfig {
  /** 每个图标的动画时长（毫秒） */
  iconDuration?: number;
  /** 入场动画各阶段时长 */
  entryDurations?: {
    iconsEnter?: number;
    lineToEdge?: number;
    borderTrace?: number;
    phoneAppear?: number;
    contentFadeIn?: number;
    displayTime?: number;
    lineFadeOut?: number;
  };
}

/** 组件属性 */
export interface IconCarouselAnimationProps {
  /** 画布宽度 */
  canvasWidth: number;
  /** 画布高度 */
  canvasHeight: number;
  /** 布局方向：portrait(竖向) 或 landscape(横向) */
  orientation?: Orientation;
  /** 图标配置数组 */
  icons: IconConfig[];
  /** 动画配置 */
  animationConfig?: AnimationConfig;
  /** 手机模拟器宽高比（竖向默认0.5，横向默认1.78） */
  phoneAspectRatio?: number;
  /** 手机占画布主轴的比例（竖向是高度比例0.93，横向是宽度比例0.6） */
  phoneSizeRatio?: number;
  /** 图标尺寸（默认48） */
  iconSize?: number;
  /** 图标与边缘的间距（默认12） */
  iconGap?: number;
  /** 图标与动画区的距离（横向布局，默认60） */
  iconToPhoneGap?: number;
  /** 是否显示参照线 */
  showGuides?: boolean;
  /** 是否播放动画 */
  isAnimating?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

// ==========================================
// 默认配置
// ==========================================

const DEFAULT_ENTRY_DURATIONS = {
  iconsEnter: 800,
  lineToEdge: 600,
  borderTrace: 1000,
  phoneAppear: 600,
  contentFadeIn: 1400,
  displayTime: 1000,
  lineFadeOut: 500,
};

const DEFAULT_ANIMATION_CONFIG = {
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

const DEFAULT_COLORS = {
  primary: { start: '#0070FF', end: '#12B98A' },
  secondary: { start: '#9333EA', end: '#EC4899' },
};

// ==========================================
// 入场动画阶段
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
  const { phases } = DEFAULT_ANIMATION_CONFIG;
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
  const { phases } = DEFAULT_ANIMATION_CONFIG;

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
  const { phases } = DEFAULT_ANIMATION_CONFIG;

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
  const { phases } = DEFAULT_ANIMATION_CONFIG;

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
// 主组件
// ==========================================

export default function IconCarouselAnimation({
  canvasWidth,
  canvasHeight,
  orientation = 'portrait',
  icons: iconConfigs,
  animationConfig,
  phoneAspectRatio,
  phoneSizeRatio,
  iconSize = 48,
  iconGap = 12,
  iconToPhoneGap = 60,
  showGuides = false,
  isAnimating = true,
  style,
  className,
}: IconCarouselAnimationProps) {
  
  // ========== 根据布局方向计算默认值 ==========
  // 竖向：手机竖屏 (宽高比 0.5)，高度占画布 93%
  // 横向：手机横屏 (宽高比 1.78)，需要给上下图标留空间
  const defaultPhoneAspectRatio = orientation === 'portrait' ? 0.5 : 1.78;
  
  const actualPhoneAspectRatio = phoneAspectRatio ?? defaultPhoneAspectRatio;

  // ========== 计算布局参数 ==========
  const layout = useMemo(() => {
    let phoneWidth: number, phoneHeight: number;
    
    if (orientation === 'portrait') {
      // 竖向：手机高度基于画布高度的 93%
      const ratio = phoneSizeRatio ?? 0.93;
      phoneHeight = Math.round(canvasHeight * ratio);
      phoneWidth = Math.round(phoneHeight * actualPhoneAspectRatio);
    } else {
      // 横向：需要给上下图标留空间
      // 可用高度 = 画布高度 - 上下图标区域 (图标48 + 间距60 + 标签约20) × 2
      const iconAreaHeight = iconSize + iconToPhoneGap + 24; // 图标 + 间距 + 标签
      const availableHeight = canvasHeight - iconAreaHeight * 2;
      
      // 手机高度 = 可用高度的 90%（留点边距）
      phoneHeight = Math.round(availableHeight * 0.9);
      phoneWidth = Math.round(phoneHeight * actualPhoneAspectRatio);
      
      // 如果指定了 phoneSizeRatio，则按宽度比例计算
      if (phoneSizeRatio !== undefined) {
        phoneWidth = Math.round(canvasWidth * phoneSizeRatio);
        phoneHeight = Math.round(phoneWidth / actualPhoneAspectRatio);
      }
    }
    
    const innerIconSize = Math.round(iconSize * 0.58);
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const phoneLeft = (canvasWidth - phoneWidth) / 2;
    const phoneTop = (canvasHeight - phoneHeight) / 2;
    const phoneRight = phoneLeft + phoneWidth;
    const phoneBottom = phoneTop + phoneHeight;
    
    return {
      canvasWidth,
      canvasHeight,
      orientation,
      phoneWidth,
      phoneHeight,
      iconSize,
      innerIconSize,
      iconGap,
      iconToPhoneGap,
      centerX,
      centerY,
      phoneLeft,
      phoneTop,
      phoneRight,
      phoneBottom,
      // 竖向布局的图标X位置
      leftX: iconGap,
      rightX: canvasWidth - iconGap - iconSize,
      // 横向布局的图标Y位置
      topY: phoneTop - iconToPhoneGap - iconSize,
      bottomY: phoneBottom + iconToPhoneGap,
    };
  }, [canvasWidth, canvasHeight, orientation, actualPhoneAspectRatio, phoneSizeRatio, iconSize, iconGap, iconToPhoneGap]);

  // ========== 合并配置 ==========
  const entryDurations = useMemo(() => ({
    ...DEFAULT_ENTRY_DURATIONS,
    ...animationConfig?.entryDurations,
  }), [animationConfig]);

  const iconDuration = animationConfig?.iconDuration ?? DEFAULT_ANIMATION_CONFIG.iconDuration;

  // ========== 计算图标绝对位置 ==========
  const icons = useMemo(() => {
    return iconConfigs.map(config => {
      let x: number, y: number, lineDirection: 'left' | 'right' | 'up' | 'down';
      
      if (orientation === 'portrait') {
        // 竖向布局
        const pConfig = config as PortraitIconConfig;
        x = pConfig.side === 'left' ? layout.leftX : layout.rightX;
        y = Math.round(pConfig.relativeY * canvasHeight);
        lineDirection = pConfig.side === 'left' ? 'right' : 'left';
      } else {
        // 横向布局
        const lConfig = config as LandscapeIconConfig;
        const isTop = lConfig.side.startsWith('top');
        const isLeftSide = lConfig.side.endsWith('left');
        
        x = Math.round(lConfig.relativeX * canvasWidth) - iconSize / 2;
        y = isTop ? layout.topY : layout.bottomY;
        lineDirection = isTop ? 'down' : 'up';
      }
      
      return {
        ...config,
        x,
        y,
        lineDirection,
      };
    });
  }, [iconConfigs, layout, canvasWidth, canvasHeight, orientation, iconSize]);

  // ========== 状态 ==========
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [prevIconIndex, setPrevIconIndex] = useState(icons.length - 1);
  const [progress, setProgress] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);

  // 入场动画状态
  const [entryPhase, setEntryPhase] = useState<EntryPhase>('icons-enter');
  const [entryProgress, setEntryProgress] = useState(0);
  const [borderTraceProgress, setBorderTraceProgress] = useState(0);
  const [entryLineProgress, setEntryLineProgress] = useState(0);
  const [phoneAppearProgress, setPhoneAppearProgress] = useState(0);
  const [contentFadeInProgress, setContentFadeInProgress] = useState(0);
  const [entryLineFadeOut, setEntryLineFadeOut] = useState(0);
  const entryStartTime = useRef<number | null>(null);

  // ========== 路径计算函数 ==========
  const getPhoneBorderPath = useCallback(() => {
    const r = 24;
    const x = layout.phoneLeft + 4;
    const y = layout.phoneTop + 4;
    const w = layout.phoneWidth - 8;
    const h = layout.phoneHeight - 8;
    
    if (orientation === 'portrait') {
      // 竖向：从左侧中点开始
      const midY = y + h / 2;
      const topPath = `M ${x} ${midY} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${midY}`;
      const bottomPath = `M ${x} ${midY} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h} L ${x + w - r} ${y + h} Q ${x + w} ${y + h} ${x + w} ${y + h - r} L ${x + w} ${midY}`;
      return { topPath, bottomPath };
    } else {
      // 横向：从顶部中点开始
      const midX = x + w / 2;
      const topPath = `M ${midX} ${y} L ${x + r} ${y} Q ${x} ${y} ${x} ${y + r} L ${x} ${y + h - r} Q ${x} ${y + h} ${x + r} ${y + h} L ${midX} ${y + h}`;
      const bottomPath = `M ${midX} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${midX} ${y + h}`;
      return { topPath, bottomPath };
    }
  }, [layout, orientation]);

  const getLinePath = useCallback((icon: typeof icons[0]) => {
    const iconCenterX = icon.x + layout.iconSize / 2;
    const iconCenterY = icon.y + layout.iconSize / 2;
    const cornerRadius = 15;
    
    if (orientation === 'portrait') {
      // 竖向布局：水平发出，然后垂直连接
      const verticalExtend = 60;
      const lineStart = (icon as PortraitIconConfig).lineStart;
      
      let startX: number, startY: number;
      if (lineStart === 'bottom') {
        startX = iconCenterX;
        startY = icon.y + layout.iconSize;
      } else {
        startX = iconCenterX;
        startY = icon.y;
      }
      
      const endX = icon.lineDirection === 'right' ? layout.phoneLeft : layout.phoneRight;
      const turnY = lineStart === 'bottom' ? startY + verticalExtend : startY - verticalExtend;
      const endY = turnY;
      
      let d: string;
      if (icon.lineDirection === 'right') {
        d = lineStart === 'bottom'
          ? `M ${startX} ${startY} L ${startX} ${turnY - cornerRadius} Q ${startX} ${turnY} ${startX + cornerRadius} ${turnY} L ${endX} ${endY}`
          : `M ${startX} ${startY} L ${startX} ${turnY + cornerRadius} Q ${startX} ${turnY} ${startX + cornerRadius} ${turnY} L ${endX} ${endY}`;
      } else {
        d = lineStart === 'bottom'
          ? `M ${startX} ${startY} L ${startX} ${turnY - cornerRadius} Q ${startX} ${turnY} ${startX - cornerRadius} ${turnY} L ${endX} ${endY}`
          : `M ${startX} ${startY} L ${startX} ${turnY + cornerRadius} Q ${startX} ${turnY} ${startX - cornerRadius} ${turnY} L ${endX} ${endY}`;
      }
      
      return { d, startPoint: { x: startX, y: startY }, endPoint: { x: endX, y: endY } };
    } else {
      // 横向布局：水平发出，然后垂直连接动画区
      const lConfig = icon as unknown as LandscapeIconConfig;
      const isTop = lConfig.side.startsWith('top');
      const horizontalExtend = 40;
      
      let startX: number, startY: number;
      if (lConfig.lineStart === 'left') {
        startX = icon.x;
        startY = iconCenterY;
      } else {
        startX = icon.x + layout.iconSize;
        startY = iconCenterY;
      }
      
      const endY = isTop ? layout.phoneTop : layout.phoneBottom;
      const turnX = lConfig.lineStart === 'left' ? startX - horizontalExtend : startX + horizontalExtend;
      const endX = turnX;
      
      let d: string;
      if (isTop) {
        // 上排：水平发出后向下
        d = lConfig.lineStart === 'left'
          ? `M ${startX} ${startY} L ${turnX + cornerRadius} ${startY} Q ${turnX} ${startY} ${turnX} ${startY + cornerRadius} L ${endX} ${endY}`
          : `M ${startX} ${startY} L ${turnX - cornerRadius} ${startY} Q ${turnX} ${startY} ${turnX} ${startY + cornerRadius} L ${endX} ${endY}`;
      } else {
        // 下排：水平发出后向上
        d = lConfig.lineStart === 'left'
          ? `M ${startX} ${startY} L ${turnX + cornerRadius} ${startY} Q ${turnX} ${startY} ${turnX} ${startY - cornerRadius} L ${endX} ${endY}`
          : `M ${startX} ${startY} L ${turnX - cornerRadius} ${startY} Q ${turnX} ${startY} ${turnX} ${startY - cornerRadius} L ${endX} ${endY}`;
      }
      
      return { d, startPoint: { x: startX, y: startY }, endPoint: { x: endX, y: endY } };
    }
  }, [layout, orientation]);

  // ========== 入场动画循环 ==========
  useEffect(() => {
    if (entryPhase === 'complete' || !isAnimating) return;

    let animationFrame: number;

    const animateEntry = (timestamp: number) => {
      if (!entryStartTime.current) entryStartTime.current = timestamp;
      const elapsed = timestamp - entryStartTime.current;

      const phase1End = entryDurations.iconsEnter;
      const phase2End = phase1End + entryDurations.lineToEdge;
      const phase3End = phase2End + entryDurations.borderTrace;
      const phase4End = phase3End + entryDurations.phoneAppear;
      const phase5End = phase4End + entryDurations.contentFadeIn;
      const phase6End = phase5End + entryDurations.displayTime;
      const phase7End = phase6End + entryDurations.lineFadeOut;

      if (elapsed < phase1End) {
        setEntryPhase('icons-enter');
        setEntryProgress(elapsed / phase1End);
      } else if (elapsed < phase2End) {
        setEntryPhase('line-to-edge');
        setEntryProgress((elapsed - phase1End) / entryDurations.lineToEdge);
        setEntryLineProgress((elapsed - phase1End) / entryDurations.lineToEdge);
      } else if (elapsed < phase3End) {
        setEntryPhase('border-trace');
        setEntryProgress((elapsed - phase2End) / entryDurations.borderTrace);
        setBorderTraceProgress((elapsed - phase2End) / entryDurations.borderTrace);
        setEntryLineProgress(1);
      } else if (elapsed < phase4End) {
        setEntryPhase('phone-appear');
        setEntryProgress((elapsed - phase3End) / entryDurations.phoneAppear);
        setPhoneAppearProgress((elapsed - phase3End) / entryDurations.phoneAppear);
        setBorderTraceProgress(1);
      } else if (elapsed < phase5End) {
        setEntryPhase('content-fade-in');
        setEntryProgress((elapsed - phase4End) / entryDurations.contentFadeIn);
        setContentFadeInProgress((elapsed - phase4End) / entryDurations.contentFadeIn);
        setPhoneAppearProgress(1);
      } else if (elapsed < phase6End) {
        setEntryPhase('display');
        setContentFadeInProgress(1);
      } else if (elapsed < phase7End) {
        setEntryPhase('line-fade-out');
        setEntryLineFadeOut((elapsed - phase6End) / entryDurations.lineFadeOut);
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
  }, [entryPhase, entryDurations, isAnimating]);

  // ========== 轮播动画循环 ==========
  useEffect(() => {
    if (!isAnimating || entryPhase !== 'complete') return;

    let animationFrame: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const totalDuration = iconDuration * icons.length;
      const offsetTime = iconDuration * 1;
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

      const lineDrawingEnd = DEFAULT_ANIMATION_CONFIG.phases.lineDrawing.end;
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
  }, [isAnimating, icons.length, entryPhase, iconDuration]);

  const phase = getAnimationPhase(progress);
  const currentIcon = icons[currentIconIndex];
  const firstIcon = icons[0];

  // ========== 计算图标入场动画的滑入方向 ==========
  const getIconEntryTransform = (icon: typeof icons[0], entryProgress: number) => {
    if (orientation === 'portrait') {
      const isLeft = icon.x < layout.centerX;
      const slideX = (1 - entryProgress) * (isLeft ? -40 : 40);
      return `translateX(${slideX}px)`;
    } else {
      const lConfig = icon as unknown as LandscapeIconConfig;
      const isTop = lConfig.side.startsWith('top');
      const slideY = (1 - entryProgress) * (isTop ? -40 : 40);
      return `translateY(${slideY}px)`;
    }
  };

  return (
    <div
      className={className}
      style={{
        width: layout.canvasWidth,
        height: layout.canvasHeight,
        backgroundColor: '#fafafa',
        borderRadius: '16px',
        position: 'relative',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 参照线 */}
      {showGuides && (
        <>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(0,200,100,0.5)' }} />
          <div style={{ position: 'absolute', left: layout.centerX, top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,0,0,0.5)' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(0,200,100,0.5)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: 'rgba(0,200,100,0.5)' }} />
          <div style={{ position: 'absolute', top: layout.centerY, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,0,0,0.5)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: 'rgba(0,200,100,0.5)' }} />
          {/* 手机区域参照线 */}
          <div style={{ position: 'absolute', left: layout.phoneLeft, top: layout.phoneTop, width: layout.phoneWidth, height: layout.phoneHeight, border: '1px dashed rgba(0,100,255,0.3)', pointerEvents: 'none' }} />
        </>
      )}

      {/* 入场动画 - 射线SVG层 */}
      {(entryPhase === 'line-to-edge' || entryPhase === 'border-trace' || entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display' || entryPhase === 'line-fade-out') && (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15 }}>
          <defs>
            <linearGradient id="entry-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={firstIcon?.startColor ?? DEFAULT_COLORS.primary.start} />
              <stop offset="100%" stopColor={firstIcon?.endColor ?? DEFAULT_COLORS.primary.end} />
            </linearGradient>
          </defs>

          {firstIcon && (() => {
            const pathData = getLinePath(firstIcon);
            const lineLength = 300;

            let dashArray = '';
            let dashOffset = 0;

            if (entryPhase === 'line-fade-out') {
              const fadeProgress = entryLineFadeOut;
              dashArray = `${lineLength * (1 - fadeProgress)} ${lineLength}`;
              dashOffset = -lineLength * fadeProgress;
            } else {
              const dashLen = entryLineProgress * lineLength;
              dashArray = `${dashLen} ${lineLength}`;
            }

            return (
              <g>
                <path
                  d={pathData.d}
                  fill="none"
                  stroke="url(#entry-gradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength={lineLength}
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  style={{ opacity: 0.4, filter: 'blur(3px)' }}
                />
                <path
                  d={pathData.d}
                  fill="none"
                  stroke="url(#entry-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength={lineLength}
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                />
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
              <stop offset="0%" stopColor={firstIcon?.startColor ?? DEFAULT_COLORS.primary.start} />
              <stop offset="100%" stopColor={firstIcon?.endColor ?? DEFAULT_COLORS.primary.end} />
            </linearGradient>
          </defs>

          {(() => {
            const { topPath, bottomPath } = getPhoneBorderPath();
            const borderLength = 500;
            const dashLen = borderTraceProgress * borderLength;
            const borderOpacity = entryPhase === 'phone-appear' ? 1 - phoneAppearProgress : 1;

            return (
              <g opacity={borderOpacity}>
                <path
                  d={topPath}
                  fill="none"
                  stroke="url(#border-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength={borderLength}
                  strokeDasharray={`${dashLen} ${borderLength}`}
                  style={{ opacity: 0.4, filter: 'blur(3px)' }}
                />
                <path
                  d={topPath}
                  fill="none"
                  stroke="url(#border-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={borderLength}
                  strokeDasharray={`${dashLen} ${borderLength}`}
                />
                <path
                  d={bottomPath}
                  fill="none"
                  stroke="url(#border-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength={borderLength}
                  strokeDasharray={`${dashLen} ${borderLength}`}
                  style={{ opacity: 0.4, filter: 'blur(3px)' }}
                />
                <path
                  d={bottomPath}
                  fill="none"
                  stroke="url(#border-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={borderLength}
                  strokeDasharray={`${dashLen} ${borderLength}`}
                />
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
                <linearGradient
                  key={`grad-${icon.id}`}
                  id={`gradient-${icon.id}`}
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
              dashArray = `${totalLength * lineState.drawing} ${totalLength}`;
            } else if (lineState.fadeProgress >= 0 && lineState.fadeProgress < 1) {
              dashArray = `${totalLength * (1 - lineState.fadeProgress)} ${totalLength}`;
              dashOffset = -totalLength * lineState.fadeProgress;
            }

            const isPulsing = phase === 'pulse1' || phase === 'pulse2';

            return (
              <g key={`line-${icon.id}`} opacity={lineState.opacity}>
                <path
                  d={pathData.d}
                  fill="none"
                  stroke={`url(#gradient-${icon.id})`}
                  strokeWidth={isPulsing ? 6 : 4}
                  strokeLinecap="round"
                  pathLength={totalLength}
                  strokeDasharray={dashArray || undefined}
                  strokeDashoffset={dashOffset}
                  style={{ opacity: 0.3, filter: 'blur(3px)' }}
                />
                <path
                  d={pathData.d}
                  fill="none"
                  stroke={`url(#gradient-${icon.id})`}
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

      {/* 手机模拟器 */}
      {(entryPhase === 'phone-appear' || entryPhase === 'content-fade-in' || entryPhase === 'display' || entryPhase === 'line-fade-out' || entryPhase === 'complete') && (
        <div style={{
          position: 'absolute',
          left: layout.phoneLeft,
          top: layout.phoneTop,
          width: layout.phoneWidth,
          height: layout.phoneHeight,
          background: 'linear-gradient(145deg, #e8e8e8 0%, #c0c0c0 50%, #a8a8a8 100%)',
          borderRadius: orientation === 'portrait' ? '28px' : '16px',
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
            borderRadius: orientation === 'portrait' ? '24px' : '12px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* 入场动画期间 */}
            {entryPhase !== 'complete' && (() => {
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
                  {icons[0]?.screen}
                </div>
              );
            })()}

            {/* 轮播动画期间 */}
            {entryPhase === 'complete' && (
              <>
                <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                  {icons[prevIconIndex]?.screen}
                </div>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transform: `translateX(${slideOffset}%)`,
                  zIndex: 2,
                }}>
                  {currentIcon?.screen}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 图标 */}
      {icons.map((item, index) => {
        let iconOpacity = 1;
        let iconTransform = '';
        let isEntryActive = false;

        if (entryPhase === 'icons-enter') {
          iconOpacity = entryProgress;
          iconTransform = getIconEntryTransform(item, entryProgress);
        } else if (['line-to-edge', 'border-trace', 'phone-appear', 'content-fade-in', 'display', 'line-fade-out'].includes(entryPhase)) {
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
              width: layout.iconSize,
              height: layout.iconSize,
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
              width: layout.innerIconSize,
              height: layout.innerIconSize,
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
        let labelOpacity = 1;
        let isEntryActive = false;
        let labelPosition: React.CSSProperties = {};

        if (entryPhase === 'icons-enter') {
          labelOpacity = entryProgress;
        } else if (['line-to-edge', 'border-trace', 'phone-appear', 'content-fade-in', 'display', 'line-fade-out'].includes(entryPhase)) {
          if (index === 0) isEntryActive = true;
        }

        const activation = entryPhase === 'complete'
          ? getIconActivation(progress, index === currentIconIndex)
          : { isActive: isEntryActive, progress: isEntryActive ? 1 : 0 };

        if (orientation === 'portrait') {
          const isLeft = item.x < layout.centerX;
          labelPosition = {
            left: isLeft ? item.x + layout.iconSize + 8 : item.x - 8,
            top: item.y + layout.iconSize / 2,
            transform: isLeft ? 'translateY(-50%)' : 'translate(-100%, -50%)',
          };
        } else {
          const lConfig = item as unknown as LandscapeIconConfig;
          const isTop = lConfig.side.startsWith('top');
          labelPosition = {
            left: item.x + layout.iconSize / 2,
            top: isTop ? item.y - 8 : item.y + layout.iconSize + 8,
            transform: isTop ? 'translate(-50%, -100%)' : 'translateX(-50%)',
          };
        }

        return (
          <div
            key={`label-${item.id}`}
            style={{
              position: 'absolute',
              ...labelPosition,
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

// Types are already exported at their definitions above
