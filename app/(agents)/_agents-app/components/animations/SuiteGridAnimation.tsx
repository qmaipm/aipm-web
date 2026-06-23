'use client';

/**
 * ==========================================
 * 套件网格动画组件 v4.0
 * ==========================================
 * 
 * 设计原则：
 * 1. 6x6 网格布局，大图标 80px（激活时 82px）
 * 2. 函数化连线路径计算
 * 3. 每个 Agent 使用不同的出发边连接不同产品
 * 4. 遵循 PATH_RULES v4.1：第一段垂直，第二段水平
 * 5. 4 个套件循环轮播，每个 3 秒
 * 6. 三列对齐规则：G3/G4/G5 基线对齐
 */

import { useState, useEffect, useMemo, useCallback, type ReactElement } from 'react';
import {
  SUITE_ICON_POSITIONS,
  SUITE_CONNECTIONS,
  DECORATION_POSITIONS,
  ANIMATION_CONFIG,
  SUITE_CANVAS,
  generateSuiteConnectionPaths,
  type SuiteIconPosition,
  type SuiteConnection,
  type ConnectionPath,
} from './suite-grid-data';

// ==========================================
// 图标 SVG 组件
// ==========================================

const SuiteIcons: Record<string, ReactElement> = {
  // Agent 图标
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
  
  // 产品图标
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
};

// ==========================================
// 装饰图标形状
// ==========================================

const DecorationShapes: Record<string, ReactElement> = {
  circle: (
    <svg viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    </svg>
  ),
  square: (
    <svg viewBox="0 0 48 48">
      <rect x="8" y="8" width="32" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    </svg>
  ),
  hexagon: (
    <svg viewBox="0 0 48 48">
      <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    </svg>
  ),
  triangle: (
    <svg viewBox="0 0 48 48">
      <polygon points="24,6 42,42 6,42" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    </svg>
  ),
};

// ==========================================
// 渐变线组件
// ==========================================

interface GradientLineProps {
  path: ConnectionPath;
  gradient: { start: string; end: string };
  gradientId: string;
  progress: number;
  opacity: number;
  isVisible: boolean;
}

function GradientLine({
  path,
  gradient,
  gradientId,
  progress,
  opacity,
  isVisible,
}: GradientLineProps) {
  if (!isVisible || path.length <= 0) return null;
  
  const totalLength = Math.max(path.length, 1) * 1.2;
  const strokeDashoffset = totalLength * (1 - Math.min(1, Math.max(0, progress)));
  
  // 计算渐变方向（基于路径方向）
  const dx = path.endPoint.x - path.startPoint.x;
  const dy = path.endPoint.y - path.startPoint.y;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  return (
    <g>
      <defs>
        <linearGradient 
          id={gradientId} 
          x1="0%" 
          y1="0%" 
          x2="100%" 
          y2="0%"
          gradientTransform={`rotate(${angle})`}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={gradient.start} />
          <stop offset="100%" stopColor={gradient.end} />
        </linearGradient>
      </defs>
      <path
        d={path.d}
        stroke={`url(#${gradientId})`}
        strokeWidth={ANIMATION_CONFIG.lineWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray={totalLength}
        strokeDashoffset={strokeDashoffset}
        opacity={opacity}
        style={{ 
          transition: 'stroke-dashoffset 0.08s linear, opacity 0.15s ease',
        }}
      />
    </g>
  );
}

// ==========================================
// 图标组件
// ==========================================

interface IconNodeProps {
  position: SuiteIconPosition;
  isActive: boolean;
  activationProgress: number;
}

function IconNode({ position, isActive, activationProgress }: IconNodeProps) {
  const { iconSize, iconSizeActive } = ANIMATION_CONFIG;
  
  const currentSize = isActive 
    ? iconSize + (iconSizeActive - iconSize) * activationProgress 
    : iconSize;
  const offset = currentSize / 2;
  
  const icon = position.icon && SuiteIcons[position.icon];
  
  const iconColor = isActive 
    ? (position.color || (position.type === 'agent' ? '#0070FF' : '#374151'))
    : '#9CA3AF';
  
  return (
    <div
      className="suite-icon-node"
      style={{
        position: 'absolute',
        left: position.x - offset,
        top: position.y - offset,
        width: currentSize,
        height: currentSize,
        borderRadius: isActive ? '18px' : '14px',  // 更大的圆角适配 80px 图标
        backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.6)',
        border: isActive ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: isActive 
          ? '0 10px 32px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.1)' 
          : '0 2px 8px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: isActive ? 10 : 1,
        transform: isActive ? 'scale(1)' : 'scale(0.92)',
      }}
    >
      <div
        style={{
          width: currentSize * 0.45,
          height: currentSize * 0.45,
          color: iconColor,
          opacity: isActive ? 1 : 0.6,
          transition: 'color 0.3s ease, opacity 0.3s ease',
        }}
      >
        {icon}
      </div>
      
      {isActive && activationProgress > 0.5 && position.name && (
        <div
          style={{
            fontSize: '12px',  // 更大的字体适配 80px 图标
            fontWeight: 600,
            color: '#374151',
            marginTop: '4px',
            whiteSpace: 'nowrap',
            opacity: Math.min(1, (activationProgress - 0.5) * 2),
            transition: 'opacity 0.2s ease',
          }}
        >
          {position.name}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 装饰图标组件
// ==========================================

interface DecorationIconProps {
  x: number;
  y: number;
  shape: string;
  size?: number;
}

function DecorationIcon({ x, y, shape, size = 48 }: DecorationIconProps) {
  const offset = size / 2;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: x - offset,
        top: y - offset,
        width: size,
        height: size,
        color: '#D1D5DB',
        opacity: 0.5,
      }}
    >
      {DecorationShapes[shape] || DecorationShapes.circle}
    </div>
  );
}

// ==========================================
// 动画状态管理
// ==========================================

type AnimationPhase = 
  | 'agent-activating'
  | 'lines-drawing'
  | 'products-activating'
  | 'pulse1'
  | 'pulse2'
  | 'lines-fading'
  | 'products-deactivating'
  | 'transition';

interface AnimationState {
  suiteIndex: number;
  phase: AnimationPhase;
  progress: number;
}

function getPhaseFromProgress(progress: number): AnimationPhase {
  const { phases } = ANIMATION_CONFIG;
  
  if (progress < phases.agentActivate.end) return 'agent-activating';
  if (progress < phases.linesDrawing.end) return 'lines-drawing';
  if (progress < phases.productsActivate.end) return 'products-activating';
  if (progress < phases.pulse1.end) return 'pulse1';
  if (progress < phases.pulse2.end) return 'pulse2';
  if (progress < phases.linesFading.end) return 'lines-fading';
  if (progress < phases.productsDeactivate.end) return 'products-deactivating';
  return 'transition';
}

function getPhaseProgress(totalProgress: number, phaseKey: keyof typeof ANIMATION_CONFIG.phases): number {
  const phase = ANIMATION_CONFIG.phases[phaseKey];
  if (totalProgress < phase.start) return 0;
  if (totalProgress > phase.end) return 1;
  return (totalProgress - phase.start) / (phase.end - phase.start);
}

// ==========================================
// 主组件
// ==========================================

interface SuiteGridAnimationProps {
  isVisible?: boolean;
}

export default function SuiteGridAnimation({ isVisible = true }: SuiteGridAnimationProps) {
  const [state, setState] = useState<AnimationState>({
    suiteIndex: 0,
    phase: 'agent-activating',
    progress: 0,
  });
  
  // 动画循环
  useEffect(() => {
    if (!isVisible) return;
    
    const startTime = Date.now();
    let animationFrame: number;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const totalDuration = ANIMATION_CONFIG.suiteDuration * SUITE_CONNECTIONS.length;
      const totalProgress = (elapsed % totalDuration) / totalDuration;
      
      const suiteIndex = Math.floor(totalProgress * SUITE_CONNECTIONS.length) % SUITE_CONNECTIONS.length;
      const suiteProgress = (totalProgress * SUITE_CONNECTIONS.length) % 1;
      const phase = getPhaseFromProgress(suiteProgress);
      
      setState({
        suiteIndex,
        phase,
        progress: suiteProgress,
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible]);
  
  // 当前套件
  const currentSuite = SUITE_CONNECTIONS[state.suiteIndex];
  
  // 生成当前套件的连接路径（使用函数化方法）
  const connectionPaths = useMemo(() => {
    return generateSuiteConnectionPaths(currentSuite, SUITE_ICON_POSITIONS);
  }, [currentSuite]);
  
  // 计算图标激活状态
  const getIconActivation = useCallback((iconId: string): { isActive: boolean; progress: number } => {
    const { progress, phase } = state;
    
    if (iconId === currentSuite.agentId) {
      if (phase === 'agent-activating') {
        return { isActive: true, progress: getPhaseProgress(progress, 'agentActivate') };
      }
      if (phase === 'lines-fading' || phase === 'products-deactivating' || phase === 'transition') {
        return { isActive: false, progress: 1 - getPhaseProgress(progress, 'linesFading') };
      }
      if (phase === 'lines-drawing' || phase === 'products-activating' || phase === 'pulse1' || phase === 'pulse2') {
        return { isActive: true, progress: 1 };
      }
      return { isActive: false, progress: 0 };
    }
    
    if (currentSuite.productIds.includes(iconId)) {
      if (phase === 'products-activating') {
        return { isActive: true, progress: getPhaseProgress(progress, 'productsActivate') };
      }
      if (phase === 'products-deactivating' || phase === 'transition') {
        return { isActive: false, progress: 1 - getPhaseProgress(progress, 'productsDeactivate') };
      }
      if (phase === 'pulse1' || phase === 'pulse2' || phase === 'lines-fading') {
        return { isActive: true, progress: 1 };
      }
      return { isActive: false, progress: 0 };
    }
    
    return { isActive: false, progress: 0 };
  }, [state, currentSuite]);
  
  // 计算连线状态
  const getLineState = useCallback((productId: string): { progress: number; opacity: number; isVisible: boolean } => {
    const { progress, phase } = state;
    
    if (phase === 'lines-drawing') {
      return { 
        progress: getPhaseProgress(progress, 'linesDrawing'), 
        opacity: 1, 
        isVisible: true 
      };
    }
    if (phase === 'lines-fading') {
      return { 
        progress: 1, 
        opacity: 1 - getPhaseProgress(progress, 'linesFading'), 
        isVisible: true 
      };
    }
    if (phase === 'products-activating' || phase === 'pulse1' || phase === 'pulse2') {
      return { progress: 1, opacity: 1, isVisible: true };
    }
    
    return { progress: 0, opacity: 0, isVisible: false };
  }, [state]);
  
  return (
    <div
      className="suite-grid-animation"
      style={{
        position: 'relative',
        width: SUITE_CANVAS.width,
        height: SUITE_CANVAS.height,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)',
        borderRadius: '16px',
      }}
    >
      {/* 装饰图标层 */}
      {DECORATION_POSITIONS.map((deco, index) => (
        <DecorationIcon 
          key={`deco-${index}`} 
          x={deco.x} 
          y={deco.y} 
          shape={deco.shape}
          size={deco.size || 48}
        />
      ))}
      
      {/* 功能图标层 */}
      {Object.values(SUITE_ICON_POSITIONS).map(position => {
        const { isActive, progress } = getIconActivation(position.id);
        return (
          <IconNode
            key={position.id}
            position={position}
            isActive={isActive}
            activationProgress={progress}
          />
        );
      })}
      
      {/* 连线层 */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {connectionPaths.paths.map(({ productId, path }) => {
          const lineState = getLineState(productId);
          return (
            <GradientLine
              key={`line-${productId}`}
              path={path}
              gradient={currentSuite.color}
              gradientId={`gradient-${currentSuite.id}-${productId}`}
              progress={lineState.progress}
              opacity={lineState.opacity}
              isVisible={lineState.isVisible}
            />
          );
        })}
      </svg>
      
      {/* 调试信息（开发环境）*/}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            fontSize: '10px',
            color: '#9CA3AF',
            background: 'rgba(255,255,255,0.9)',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          套件: {currentSuite.name} | 阶段: {state.phase}
        </div>
      )}
    </div>
  );
}
