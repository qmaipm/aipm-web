'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  type IconPosition,
  type ContainerBounds,
  type LinePath,
  type AnimationState,
  type AnimationPhase,
  type GradientConfig,
  type AnimationLayoutConfig,
  DEFAULT_CONFIG,
  GRID_SYSTEM,
  createAnimationLayoutConfig,
  calculateIconPositionsFromConfig,
  calculateContainerBoundsFromConfig,
  getGradientForModule,
  createEndPoints,
  generatePath,
  generatePathHorizontalFirst,
  calculateDrawProgress,
  calculateFadeProgress,
  getGradientDirection,
} from '@hp/lib/gradient-line';

// ==========================================
// 类型定义
// ==========================================

interface RelatedProduct {
  name: string;
  href: string;
  icon: keyof typeof ProductIcons;
}

interface StripeStyleAnimationProps {
  moduleId: string;
  accentColor: string;
  relatedProducts: RelatedProduct[];
  showLabels?: boolean;
  isFirstModule?: boolean;
  layoutMode?: 'auto' | 'vertical' | 'horizontal';
}

// ==========================================
// 配置 - 基于栅格系统 v5.0
// ==========================================
//
// 所有配置从 GRID_SYSTEM 和 createAnimationLayoutConfig 函数派生
// 不允许硬编码尺寸值
//
// 栅格系统核心（来自 gradient-line.ts）:
// - layoutMaxWidth: 1080px
// - columnCount: 4
// - columnWidth: 270px (1080/4)
// - animationAreaWidth: 540px (2列)
// - guide4RelativeX: 270px (动画区域中点)
//
// ==========================================

// ==========================================
// 图标组件库
// ==========================================

const ProductIcons = {
  space: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  ),
  serviceConfig: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 17l6-6-6-6M12 19h8"/>
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  ssr: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  collaboration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  device: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  inspect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
      <path d="M11 8v6M8 11h6"/>
    </svg>
  ),
  assistant: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  salary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="9"/>
      <rect x="14" y="3" width="7" height="5"/>
      <rect x="14" y="12" width="7" height="9"/>
      <rect x="3" y="16" width="7" height="5"/>
    </svg>
  ),
  agentDesign: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  agentOps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  agentQuality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  ),
  agentReview: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

// ==========================================
// 渐变线 SVG 组件（含闪光效果）
// ==========================================

interface GradientLineSVGProps {
  path: LinePath;
  gradient: GradientConfig;
  gradientId: string;
  lineProgress: number;      // 0-1 线路绘制进度
  fadeProgress: number;      // 0-1 消失进度
  shimmerProgress: number;   // 0-1 闪光进度
  isDrawing: boolean;
  isFading: boolean;
  isVisible: boolean;
}

function GradientLineSVG({
  path,
  gradient,
  gradientId,
  lineProgress,
  fadeProgress,
  shimmerProgress,
  isDrawing,
  isFading,
  isVisible,
}: GradientLineSVGProps) {
  if (!isVisible) return null;
  
  const pathLength = path.length;
  
  // 计算渐变方向
  const gradientDirection = getGradientDirection(path.start, path.end);
  const gradientCoords = gradientDirection === 'horizontal'
    ? { x1: '0%', y1: '50%', x2: '100%', y2: '50%' }
    : gradientDirection === 'vertical'
    ? { x1: '50%', y1: '0%', x2: '50%', y2: '100%' }
    : { x1: '0%', y1: '0%', x2: '100%', y2: '100%' };
  
  // 计算线条样式
  let strokeDasharray = `${pathLength}`;
  let strokeDashoffset = 0;
  let opacity = 1;
  
  if (isDrawing) {
    strokeDashoffset = calculateDrawProgress(lineProgress, pathLength);
  } else if (isFading) {
    const fade = calculateFadeProgress(fadeProgress, pathLength);
    strokeDasharray = fade.dashArray;
    strokeDashoffset = fade.dashOffset;
    opacity = 1 - fadeProgress * 0.2;
  }
  
  // 闪光效果 (简化：不使用闪光)
  const showShimmer = false;
  
  return (
    <g>
      {/* 渐变定义 */}
      <defs>
        {/* 主渐变 */}
        <linearGradient id={gradientId} {...gradientCoords}>
          <stop offset="0%" stopColor={gradient.start} stopOpacity="0.2"/>
          <stop offset="15%" stopColor={gradient.start} stopOpacity="1"/>
          <stop offset="85%" stopColor={gradient.end} stopOpacity="1"/>
          <stop offset="100%" stopColor={gradient.end} stopOpacity="0.3"/>
        </linearGradient>
        

      </defs>
      
      {/* 主渐变线 */}
      <path
        d={path.d}
        stroke={`url(#${gradientId})`}
        strokeWidth={DEFAULT_CONFIG.line.width}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
        style={{
          strokeDasharray,
          strokeDashoffset,
          transition: isDrawing 
            ? 'none'
            : isFading
            ? `opacity ${DEFAULT_CONFIG.timing.lineFadeDuration}ms ease-out`
            : 'none',
        }}
      />
    </g>
  );
}

// ==========================================
// 主组件
// ==========================================

export default function StripeStyleAnimation({ 
  moduleId, 
  accentColor, 
  relatedProducts,
  showLabels = true,
  layoutMode = 'auto',
}: StripeStyleAnimationProps) {
  // 动画状态
  const [animState, setAnimState] = useState<AnimationState>({
    phase: 'idle',
    activeIndex: 0,
    lineProgress: 0,
    fadeProgress: 0,
    shimmerProgress: 0,
    iconOpacity: 0,
  });
  
  const animFrameRef = useRef<number | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const isHorizontal = layoutMode === 'horizontal';
  
  // ==========================================
  // 使用栅格系统 v6.0 创建布局配置
  // ==========================================
  // 
  // v6.0 改进：
  // - 所有尺寸从 GRID_SYSTEM 派生，不再使用硬编码值
  // - 图标 padding 由 calculateSymmetricIconPadding 函数计算
  // - 保证左右/上下完全对称
  //
  const layoutConfig = useMemo(() => {
    return createAnimationLayoutConfig(isHorizontal);
  }, [isHorizontal]);
  
  // 从配置中获取画布边界
  const canvasBounds = useMemo(() => ({
    width: layoutConfig.canvas.width,
    height: layoutConfig.canvas.height,
    centerX: layoutConfig.container.centerX, // = GRID_SYSTEM.guide4RelativeX = 270px
    centerY: layoutConfig.container.centerY,
  }), [layoutConfig]);

  // 从配置中获取容器边界
  const containerBounds = useMemo(() => 
    calculateContainerBoundsFromConfig(layoutConfig),
  [layoutConfig]);

  // ==========================================
  // 计算布局数据 - v6.0 基于栅格系统函数
  // ==========================================
  const layoutData = useMemo(() => {
    // 使用栅格系统函数计算图标位置
    const iconPositions = calculateIconPositionsFromConfig(
      relatedProducts.length,
      layoutConfig,
      isHorizontal
    );
    
    // 创建结束点（折线的终点，在容器边缘）
    const endPoints = createEndPoints(containerBounds, iconPositions, 20);
    
    // 获取渐变色
    const gradient = getGradientForModule(moduleId);
    
    // 生成连线路径 - 根据布局方向选择不同规则
    const linePaths = iconPositions.map((icon, index) => {
      const endPoint = endPoints[index];
      
      if (isHorizontal) {
        // 横向动画折线规则：水平发出 → 拐弯 → 垂直连接终点
        return generatePathHorizontalFirst(
          { x: icon.x, y: icon.y },
          layoutConfig.icon.size,
          endPoint.point,
          icon.side,
          layoutConfig.line.cornerRadius
        );
      } else {
        // 纵向动画折线规则：垂直发出 → 拐弯 → 水平连接终点
        return generatePath(
          { x: icon.x, y: icon.y },
          layoutConfig.icon.size,
          endPoint.point,
          icon.side,
          layoutConfig.line.cornerRadius
        );
      }
    });

    return { iconPositions, endPoints, linePaths, gradient };
  }, [relatedProducts.length, isHorizontal, moduleId, layoutConfig, containerBounds]);

  // 清理函数
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  // 进度动画
  const animateProgress = useCallback((
    duration: number,
    onProgress: (progress: number) => void,
    onComplete: () => void
  ) => {
    const startTime = performance.now();
    
    function tick(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      onProgress(progress);
      
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    }
    
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  // 动画循环
  useEffect(() => {
    let currentIndex = 0;
    const t = DEFAULT_CONFIG.timing;
    
    function runCycle() {
      clearAllTimers();
      let elapsed = 0;
      
      // 1. 图标点亮
      setAnimState(s => ({ ...s, phase: 'icon-lighting', activeIndex: currentIndex, iconOpacity: 0 }));
      animateProgress(
        t.iconLightUp,
        (p) => setAnimState(s => ({ ...s, iconOpacity: p })),
        () => setAnimState(s => ({ ...s, phase: 'icon-lit', iconOpacity: 1 }))
      );
      
      elapsed += t.iconLightUp + t.iconLightUpDelay;
      
      // 2. 线路绘制
      timersRef.current.push(setTimeout(() => {
        setAnimState(s => ({ ...s, phase: 'line-drawing', lineProgress: 0, shimmerProgress: 0 }));
        animateProgress(
          t.lineDrawDuration,
          (p) => setAnimState(s => ({ ...s, lineProgress: p, shimmerProgress: p })),
          () => setAnimState(s => ({ ...s, phase: 'line-drawn', lineProgress: 1, shimmerProgress: 1 }))
        );
      }, elapsed));
      
      elapsed += t.lineDrawDuration + t.lineDrawDelay;
      
      // 3. 内容激活
      timersRef.current.push(setTimeout(() => {
        setAnimState(s => ({ ...s, phase: 'content-active' }));
      }, elapsed));
      
      elapsed += t.contentDisplay;
      
      // 4. 图标熄灭
      timersRef.current.push(setTimeout(() => {
        setAnimState(s => ({ ...s, phase: 'icon-fading' }));
        animateProgress(
          t.iconFadeOut,
          (p) => setAnimState(s => ({ ...s, iconOpacity: 1 - p })),
          () => setAnimState(s => ({ ...s, iconOpacity: 0 }))
        );
      }, elapsed));
      
      elapsed += t.iconFadeOut + t.iconFadeOutDelay;
      
      // 5. 线路消失
      timersRef.current.push(setTimeout(() => {
        setAnimState(s => ({ ...s, phase: 'line-fading', fadeProgress: 0 }));
        animateProgress(
          t.lineFadeDuration,
          (p) => setAnimState(s => ({ ...s, fadeProgress: p })),
          () => setAnimState(s => ({ ...s, phase: 'complete', fadeProgress: 1 }))
        );
      }, elapsed));
      
      elapsed += t.lineFadeDuration + t.lineFadeDelay;
      
      // 6. 切换下一个
      timersRef.current.push(setTimeout(() => {
        currentIndex = (currentIndex + 1) % relatedProducts.length;
        setAnimState({
          phase: 'idle',
          activeIndex: currentIndex,
          lineProgress: 0,
          fadeProgress: 0,
          shimmerProgress: 0,
          iconOpacity: 0,
        });
        runCycle();
      }, elapsed));
    }
    
    runCycle();
    
    return () => clearAllTimers();
  }, [relatedProducts.length, animateProgress, clearAllTimers]);

  const { iconPositions, linePaths, gradient } = layoutData;
  const { activeIndex, phase, lineProgress, fadeProgress, shimmerProgress, iconOpacity } = animState;

  const isDrawing = phase === 'line-drawing';
  const isFading = phase === 'line-fading';
  const showLine = isDrawing || phase === 'line-drawn' || phase === 'content-active' || phase === 'icon-fading' || isFading;

  return (
    <div 
      className="stripe-animation-wrapper"
      style={{
        '--canvas-width': `${canvasBounds.width}px`,
        '--canvas-height': `${canvasBounds.height}px`,
        '--container-width': `${containerBounds.width}px`,
        '--container-height': `${containerBounds.height}px`,
        '--accent-color': accentColor,
      } as React.CSSProperties}
    >
      {/* 中央主容器 */}
      <div 
        className="stripe-central-container"
        style={{ 
          width: `${containerBounds.width}px`,
          height: `${containerBounds.height}px`,
        }}
      >
        <div className="central-frame">
          <div className="frame-corner top-left"></div>
          <div className="frame-corner top-right"></div>
          <div className="frame-corner bottom-left"></div>
          <div className="frame-corner bottom-right"></div>
        </div>
        
        <div className="central-content-wrapper">
          {moduleId === 'modular-ai' && <ModularAIContent activeIndex={activeIndex} accentColor={accentColor} />}
          {moduleId === 'service-design' && <ServiceDesignContent activeIndex={activeIndex} accentColor={accentColor} />}
          {moduleId === 'operations' && <OperationsContent activeIndex={activeIndex} accentColor={accentColor} layoutMode={layoutMode} />}
          {moduleId === 'quality' && <QualityContent activeIndex={activeIndex} accentColor={accentColor} />}
          {moduleId === 'review' && <ReviewContent activeIndex={activeIndex} accentColor={accentColor} />}
        </div>
      </div>

      {/* SVG 连线层 */}
      <svg 
        className="stripe-lines-layer" 
        viewBox={`0 0 ${canvasBounds.width} ${canvasBounds.height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ 
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        {linePaths.map((path, index) => {
          const isActiveLine = activeIndex === index;
          
          return (
            <GradientLineSVG
              key={`line-${index}`}
              path={path}
              gradient={gradient}
              gradientId={`grad-${moduleId}-${index}`}
              lineProgress={isActiveLine ? lineProgress : 0}
              fadeProgress={isActiveLine ? fadeProgress : 0}
              shimmerProgress={isActiveLine ? shimmerProgress : 0}
              isDrawing={isDrawing && isActiveLine}
              isFading={isFading && isActiveLine}
              isVisible={showLine && isActiveLine}
            />
          );
        })}
      </svg>

      {/* 周边图标 */}
      <div className="stripe-icons-layer" style={{ 
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        pointerEvents: 'none',
      }}>
        {relatedProducts.map((product, index) => {
          const pos = iconPositions[index];
          const isActive = activeIndex === index;
          const xPercent = (pos.x / canvasBounds.width) * 100;
          const yPercent = (pos.y / canvasBounds.height) * 100;
          
          // 简化透明度：激活时完全显示，非激活时半透明
          const currentOpacity = isActive ? Math.max(iconOpacity, 0.6) : 0.5;
          
          return (
            <Link
              key={product.name}
              href={product.href}
              className={`stripe-peripheral-icon ${isActive ? 'active' : ''}`}
              style={{
                position: 'absolute',
                left: `${xPercent}%`,
                top: `${yPercent}%`,
                '--accent-color': accentColor,
                opacity: currentOpacity,
                pointerEvents: 'auto',
              } as React.CSSProperties}
              title={product.name}
            >
              <div className="icon-container">
                {ProductIcons[product.icon]}
              </div>
              {showLabels && isActive && iconOpacity > 0.7 && (
                <span className="icon-label">{product.name}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 内容组件
// ==========================================

function ModularAIContent({ activeIndex, accentColor }: { activeIndex: number; accentColor: string }) {
  const modules = [
    { id: 'design', name: '服务设计', color: '#0070FF', desc: '智能生成服务标准' },
    { id: 'ops', name: '运营管理', color: '#10B981', desc: '实时调度与协同' },
    { id: 'quality', name: '质量评估', color: '#8B5CF6', desc: 'AI审图与评分' },
    { id: 'review', name: '复盘优化', color: '#F59E0B', desc: '数据驱动决策' },
  ];

  return (
    <div className="content-modular-ai">
      <div className="content-header">
        <span className="content-badge" style={{ background: accentColor }}>AI 产品套件</span>
      </div>
      
      <div className="modular-grid-2x2">
        {modules.map((module, index) => (
          <div 
            key={module.id}
            className={`modular-card ${activeIndex % 4 === index ? 'highlighted' : ''}`}
            style={{ '--card-color': module.color } as React.CSSProperties}
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span className="card-name">{module.name}</span>
            <span className="card-desc">{module.desc}</span>
          </div>
        ))}
      </div>

      <div className="ai-center-hub">
        <span>AI</span>
      </div>
    </div>
  );
}

function ServiceDesignContent({ activeIndex, accentColor }: { activeIndex: number; accentColor: string }) {
  const steps = [
    { icon: 'input', title: '输入需求', desc: '建筑面积、等级' },
    { icon: 'ai', title: 'AI 分析', desc: '匹配最优方案' },
    { icon: 'output', title: '输出方案', desc: '标准、编制、预算' },
  ];

  const results = [
    { label: '服务模块', value: '12 个' },
    { label: '人员编制', value: '48 人' },
    { label: '年度预算', value: '¥2.8M' },
  ];

  return (
    <div className="content-service-design">
      <div className="content-header">
        <span className="content-badge" style={{ background: accentColor }}>AI 服务设计流程</span>
      </div>

      <div className="flow-steps-row">
        {steps.map((step, index) => (
          <div key={step.icon} className="flow-step-group">
            <div className={`flow-step-item ${activeIndex % 3 >= index ? 'active' : ''}`}>
              <div className="step-icon-box">
                {step.icon === 'input' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                )}
                {step.icon === 'ai' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor"/>
                    <path d="M9 14s1.5 2 3 2 3-2 3-2"/>
                  </svg>
                )}
                {step.icon === 'output' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                )}
              </div>
              <span className="step-title">{step.title}</span>
              <span className="step-desc">{step.desc}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flow-arrow ${activeIndex % 3 > index ? 'active' : ''}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flow-results">
        {results.map(item => (
          <div key={item.label} className="result-item">
            <span className="result-label">{item.label}</span>
            <span className="result-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationsContent({ activeIndex, accentColor, layoutMode }: { activeIndex: number; accentColor: string; layoutMode?: string }) {
  const tasks = [
    { name: 'A座大堂清洁', time: '09:00', status: 'done' },
    { name: '停车场巡检', time: '10:30', status: 'done' },
    { name: '绿化养护作业', time: '进行中', status: 'active' },
    { name: '设备维保检查', time: '14:00', status: 'pending' },
  ];
  
  const isHorizontal = layoutMode === 'horizontal';

  return (
    <div className={`content-operations ${isHorizontal ? 'horizontal' : ''}`}>
      <div className="content-header">
        <span className="content-badge" style={{ background: accentColor }}>实时运营调度</span>
        <span className="live-dot">● 实时</span>
      </div>

      <div className={`ops-main-layout ${isHorizontal ? 'horizontal' : ''}`}>
        <div className="ops-task-list">
          {tasks.map((task, index) => (
            <div 
              key={task.name} 
              className={`ops-task-item ${task.status} ${activeIndex % 4 === index ? 'highlight' : ''}`}
            >
              <div className="task-status-dot"></div>
              <span className="task-name">{task.name}</span>
              <span className="task-time">{task.time}</span>
            </div>
          ))}
        </div>

        <div className="ops-progress-ring">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="8"/>
            <circle 
              cx="50" cy="50" r="40" 
              fill="none" 
              stroke={accentColor} 
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset="50.24"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="ring-center">
            <span className="ring-value">80%</span>
            <span className="ring-label">今日完成</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QualityContent({ activeIndex, accentColor }: { activeIndex: number; accentColor: string }) {
  const metrics = [
    { name: '整洁度', value: 95 },
    { name: '完整性', value: 88 },
    { name: '规范性', value: 90 },
  ];

  return (
    <div className="content-quality">
      <div className="content-header">
        <span className="content-badge" style={{ background: accentColor }}>AI 质量评估</span>
      </div>

      <div className="quality-flow-row">
        <div className={`quality-stage ${activeIndex % 3 >= 0 ? 'active' : ''}`}>
          <div className="stage-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <span>拍照上传</span>
        </div>

        <div className={`quality-arrow ${activeIndex % 3 >= 1 ? 'active' : ''}`}>→</div>

        <div className={`quality-stage ${activeIndex % 3 >= 1 ? 'active' : ''}`}>
          <div className="stage-icon-box ai">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <span>AI 分析</span>
        </div>

        <div className={`quality-arrow ${activeIndex % 3 >= 2 ? 'active' : ''}`}>→</div>

        <div className={`quality-stage result ${activeIndex % 3 >= 2 ? 'active' : ''}`}>
          <div className="score-box">
            <span className="score-num">92</span>
            <span className="score-unit">分</span>
          </div>
        </div>
      </div>

      <div className="quality-metrics">
        {metrics.map((metric, index) => (
          <div key={metric.name} className={`metric-row ${activeIndex % 3 === index ? 'highlight' : ''}`}>
            <span className="metric-name">{metric.name}</span>
            <div className="metric-bar-bg">
              <div 
                className="metric-bar-fill" 
                style={{ width: `${metric.value}%`, background: accentColor }}
              ></div>
            </div>
            <span className="metric-value">{metric.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewContent({ activeIndex, accentColor }: { activeIndex: number; accentColor: string }) {
  const stats = [
    { label: '人力成本', value: '-20%', trend: 'down' },
    { label: '核算准确率', value: '100%', trend: 'up' },
    { label: '管理效率', value: '3x', trend: 'up' },
    { label: '数据更新', value: '实时', trend: 'neutral' },
  ];

  return (
    <div className="content-review">
      <div className="content-header">
        <span className="content-badge" style={{ background: accentColor }}>数据驱动优化</span>
      </div>

      <div className="review-stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`review-stat-card ${activeIndex % 4 === index ? 'highlight' : ''}`}
          >
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
            {stat.trend !== 'neutral' && (
              <span className={`stat-trend ${stat.trend}`}>
                {stat.trend === 'up' ? '↑' : '↓'}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="review-chart-placeholder">
        <div className="chart-bars">
          {[60, 75, 45, 90, 70, 85].map((height, i) => (
            <div 
              key={i} 
              className="chart-bar" 
              style={{ 
                height: `${height}%`, 
                background: activeIndex % 6 === i ? accentColor : '#E2E8F0',
                transition: 'all 0.8s ease'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 导出
// ==========================================

export { 
  createEndPoints,
  generatePath,
  getGradientForModule,
  calculateDrawProgress,
  calculateFadeProgress,
  calculateIconPositionsFromConfig,
  createAnimationLayoutConfig,
  GRID_SYSTEM,
};

export type {
  IconPosition,
  ContainerBounds,
  LinePath,
  GradientConfig,
  AnimationState,
  AnimationLayoutConfig,
};
