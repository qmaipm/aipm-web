'use client';

/**
 * ==========================================
 * 套件网格动画组件 v6.1 - 生产版
 * ==========================================
 * 
 * 【里程碑】模块化AI解决方案动画 - 2024年完成
 * 
 * 【功能特性】
 * 1. 4个套件循环轮播动画（服务设计/运营管理/质量评估/复盘优化）
 * 2. 三段式脉冲效果：起点色线绘制 → 终点色脉冲 → 起点色追终点色 → 熄灭
 * 3. 图标点亮效果：上浮4px + 底部阴影 + 白色背景（无彩色边框）
 * 4. 线条光泽效果：光晕层(4px/6px) + 主线层(2px/2.5px)，模糊3px
 * 5. VI 手册反差渐变配色（蓝→绿、绿→金、紫→粉、蓝→紫）
 * 6. 精细图标：48x48 viewBox + 2px strokeWidth
 * 
 * 【动画时序 v3.2】每个套件 4 秒
 * - 0-8%:    Agent 激活（图标上浮+白底+阴影）
 * - 8-20%:   起点色线绘制（从Agent向Product）
 * - 18-28%:  Product 点亮（保持常亮直到线条熄灭）
 * - 28-40%:  终点色脉冲发出（覆盖起点色）
 * - 40-52%:  起点色追终点色 + Agent 熄灭
 * - 52-68%:  线条从起点向终点熄灭（dashoffset动画）
 * - 70-90%:  Product 熄灭
 * - 90-100%: 过渡到下一套件
 * 
 * 【视觉规格】
 * - 画布：540x540px
 * - 网格：6x6，单元格82px
 * - 图标：48px，激活时上浮4px
 * - 边框：激活1px #e5e7eb，非激活1px #d1d5db
 * - 背景：激活白色，非激活透明
 * - 文字：激活时显示，10px，黑色 #1f2937
 * 
 * 【使用方法】
 * ```tsx
 * import { SuiteGridAnimationV2 } from '@hp/components/animations/SuiteGridAnimationV2';
 * 
 * // 基本使用（放入首页）
 * <SuiteGridAnimationV2 />
 * 
 * // 自定义配置
 * <SuiteGridAnimationV2 
 *   autoPlay={true}      // 自动播放
 *   showLabels={true}    // 显示图标名称
 *   speed={1}            // 播放速度倍数
 *   className="my-class" // 自定义类名
 *   style={{ maxWidth: 540 }} // 自定义样式
 * />
 * ```
 * 
 * 【文件依赖】
 * - suite-grid-data.ts: 图标位置、套件连接、路径计算
 * 
 * @version 6.1
 * @author AI Assistant
 */

import { useState, useEffect, useCallback, useMemo, type ReactElement, type CSSProperties } from 'react';
import {
  SUITE_ICON_POSITIONS,
  SUITE_CONNECTIONS,
  SUITE_CANVAS,
  GRID,
  ANIMATION_CONFIG,
  CONNECTION_ROUTES,
  calculateRouteBasedPath,
  getRoutesForSuite,
  getPortPosition,
  type ConnectionRoute,
  type ConnectionPath,
  type Side,
} from './suite-grid-data';

// ==========================================
// 类型定义
// ==========================================

export interface SuiteGridAnimationProps {
  /** 是否自动播放 */
  autoPlay?: boolean;
  /** 是否显示图标名称 */
  showLabels?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 动画速度倍数（1 = 正常速度） */
  speed?: number;
}

// ==========================================
// SVG 图标定义
// ==========================================

// 精细线条图标 - 使用 48x48 viewBox + 2px strokeWidth
// 渲染到 48px 时保持 2px 线宽
const SuiteIcons: Record<string, ReactElement> = {
  // 服务设计 Agent - 画笔/设计
  agentDesign: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 40h18M33 7a4.24 4.24 0 016 6L14 38l-8 2 2-8L33 7z"/>
    </svg>
  ),
  // 运营管理 Agent - 齿轮/设置
  agentOps: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="24" r="6"/>
      <path d="M24 4v4M24 40v4M8.44 8.44l2.84 2.84M36.72 36.72l2.84 2.84M4 24h4M40 24h4M8.44 39.56l2.84-2.84M36.72 11.28l2.84-2.84"/>
    </svg>
  ),
  // 质量评估 Agent - 星星/评价
  agentQuality: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 4l6.18 12.52L44 18.54l-10 9.74 2.36 13.76L24 35.54l-12.36 6.5L14 28.28 4 18.54l13.82-2.02L24 4z"/>
    </svg>
  ),
  // 复盘优化 Agent - 柱状图/数据
  agentReview: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="36" y1="40" x2="36" y2="20"/>
      <line x1="24" y1="40" x2="24" y2="8"/>
      <line x1="12" y1="40" x2="12" y2="28"/>
    </svg>
  ),
  // 空间管理系统
  space: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="6" width="36" height="36" rx="4"/>
      <path d="M6 18h36M18 42V18"/>
    </svg>
  ),
  // 服务配置系统 - 简化齿轮
  serviceConfig: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="24" r="6"/>
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11.76 11.76l4.24 4.24M32 32l4.24 4.24M11.76 36.24l4.24-4.24M32 16l4.24-4.24"/>
    </svg>
  ),
  // API 开放平台
  api: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 34l12-12-12-12M24 38h16"/>
    </svg>
  ),
  // SSR 服务记录系统 - 时钟
  ssr: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="24" r="20"/>
      <path d="M24 12v12l8 4"/>
    </svg>
  ),
  // 工单调度系统 - 文档
  ticket: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M29 4H12a4 4 0 00-4 4v32a4 4 0 004 4h24a4 4 0 004-4V15L29 4z"/>
      <path d="M28 4v12h12"/>
      <line x1="32" y1="26" x2="16" y2="26"/>
      <line x1="32" y1="34" x2="16" y2="34"/>
    </svg>
  ),
  // 人机协同引擎 - 用户组
  collaboration: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M34 42v-4a8 8 0 00-8-8H10a8 8 0 00-8 8v4"/>
      <circle cx="18" cy="14" r="8"/>
      <path d="M46 42v-4a8 8 0 00-6-7.74M32 6.26a8 8 0 010 15.5"/>
    </svg>
  ),
  // 设备管理系统 - 显示器
  device: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="6" width="40" height="28" rx="4"/>
      <line x1="16" y1="42" x2="32" y2="42"/>
      <line x1="24" y1="34" x2="24" y2="42"/>
    </svg>
  ),
  // 多模态巡检系统 - 放大镜+
  inspect: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="22" cy="22" r="16"/>
      <path d="M42 42l-8.7-8.7"/>
      <path d="M22 16v12M16 22h12"/>
    </svg>
  ),
  // 小智帮手 - 对话框
  assistant: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M42 30a4 4 0 01-4 4H14l-8 8V10a4 4 0 014-4h28a4 4 0 014 4z"/>
    </svg>
  ),
  // 计薪系统 - 美元符号
  salary: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="24" y1="2" x2="24" y2="46"/>
      <path d="M34 10H19a7 7 0 000 14h10a7 7 0 010 14H12"/>
    </svg>
  ),
  // 数据大屏 - 仪表盘/方块布局
  dashboard: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="6" width="14" height="18"/>
      <rect x="28" y="6" width="14" height="10"/>
      <rect x="28" y="24" width="14" height="18"/>
      <rect x="6" y="32" width="14" height="10"/>
    </svg>
  ),
};

// ==========================================
// 图标颜色映射
// ==========================================

const SUITE_COLORS: Record<string, string> = {
  // Agent 颜色
  A1: '#0070FF',  // 服务设计 - 蓝色
  A2: '#12B98A',  // 运营管理 - 绿色
  A3: '#9333EA',  // 质量评估 - 紫色
  A4: '#0070FF',  // 复盘优化 - 蓝色
  // Product 颜色（与 Agent 对应）
  P1_space: '#0070FF',
  P2_config: '#0070FF',
  P3_ssr: '#12B98A',
  P4_ticket: '#12B98A',
  P5_collab: '#12B98A',
  P6_device: '#9333EA',
  P7_inspect: '#9333EA',
  P8_assistant: '#9333EA',
  P9_salary: '#0070FF',
  P10_dashboard: '#0070FF',
  API: '#0070FF',  // 复盘优化套件 - 蓝色（与A4同色）
};

// ==========================================
// 动画阶段类型
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

// ==========================================
// 辅助函数
// ==========================================

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

function getPhaseProgress(progress: number, phaseName: keyof typeof ANIMATION_CONFIG.phases): number {
  const phase = ANIMATION_CONFIG.phases[phaseName];
  if (progress < phase.start) return 0;
  if (progress > phase.end) return 1;
  return (progress - phase.start) / (phase.end - phase.start);
}

// ==========================================
// 主组件
// ==========================================

export function SuiteGridAnimationV2({
  autoPlay = true,
  showLabels = true,
  className = '',
  style = {},
  speed = 1,
}: SuiteGridAnimationProps) {
  
  // 动画状态
  const [state, setState] = useState({
    suiteIndex: 0,
    phase: 'agent-activating' as AnimationPhase,
    progress: 0,
  });

  // 动画循环
  useEffect(() => {
    if (!autoPlay) return;
    
    const startTime = Date.now();
    let animationFrame: number;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const adjustedDuration = ANIMATION_CONFIG.suiteDuration / speed;
      const totalDuration = adjustedDuration * SUITE_CONNECTIONS.length;
      const totalProgress = (elapsed % totalDuration) / totalDuration;
      
      const suiteIndex = Math.floor(totalProgress * SUITE_CONNECTIONS.length) % SUITE_CONNECTIONS.length;
      const suiteProgress = (totalProgress * SUITE_CONNECTIONS.length) % 1;
      const phase = getPhaseFromProgress(suiteProgress);
      
      setState({ suiteIndex, phase, progress: suiteProgress });
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoPlay, speed]);

  // 当前套件
  const currentSuite = SUITE_CONNECTIONS[state.suiteIndex];

  // 计算当前套件的连线路径
  const currentPaths = useMemo(() => {
    const routes = getRoutesForSuite(currentSuite.id);
    return routes.map(route => ({
      route,
      path: calculateRouteBasedPath(route),
    }));
  }, [currentSuite.id]);

  // 图标激活状态
  const getIconActivation = useCallback((iconId: string): { isActive: boolean; progress: number; color: string } => {
    const { progress, phase } = state;
    const suiteColor = SUITE_COLORS[iconId] || '#6B7280';
    
    // Agent 激活逻辑
    if (iconId === currentSuite.agentId) {
      if (phase === 'agent-activating') {
        return { isActive: true, progress: getPhaseProgress(progress, 'agentActivate'), color: suiteColor };
      }
      if (['lines-drawing', 'products-activating', 'pulse1'].includes(phase)) {
        return { isActive: true, progress: 1, color: suiteColor };
      }
      if (phase === 'pulse2') {
        const deactivateProgress = getPhaseProgress(progress, 'pulse2');
        return { isActive: deactivateProgress < 1, progress: 1 - deactivateProgress, color: suiteColor };
      }
      return { isActive: false, progress: 0, color: suiteColor };
    }
    
    // Product 激活逻辑
    const isCurrentProduct = currentSuite.productIds.includes(iconId);
    if (isCurrentProduct) {
      if (phase === 'products-activating') {
        return { isActive: true, progress: getPhaseProgress(progress, 'productsActivate'), color: suiteColor };
      }
      if (['pulse1', 'pulse2', 'lines-fading'].includes(phase)) {
        return { isActive: true, progress: 1, color: suiteColor };
      }
      if (phase === 'products-deactivating') {
        const deactivateProgress = getPhaseProgress(progress, 'productsDeactivate');
        return { isActive: deactivateProgress < 1, progress: 1 - deactivateProgress, color: suiteColor };
      }
      return { isActive: false, progress: 0, color: suiteColor };
    }
    
    return { isActive: false, progress: 0, color: suiteColor };
  }, [state, currentSuite]);

  // 连线状态
  const getLineState = useCallback(() => {
    const { progress, phase } = state;
    
    const result = {
      drawing: 0,
      opacity: 1,
      pulse1Progress: -1,
      pulse2Progress: -1,
      fadeProgress: -1,
    };
    
    if (phase === 'lines-drawing') {
      result.drawing = getPhaseProgress(progress, 'linesDrawing');
    } else if (phase === 'products-activating') {
      result.drawing = 1;
    } else if (phase === 'pulse1') {
      result.drawing = 1;
      result.pulse1Progress = getPhaseProgress(progress, 'pulse1');
    } else if (phase === 'pulse2') {
      result.drawing = 1;
      result.pulse1Progress = 1;
      result.pulse2Progress = getPhaseProgress(progress, 'pulse2');
    } else if (phase === 'lines-fading') {
      result.drawing = 1;
      result.fadeProgress = getPhaseProgress(progress, 'linesFading');
    } else if (['products-deactivating', 'transition'].includes(phase)) {
      result.drawing = 1;
      result.opacity = 0;
      result.fadeProgress = 1;
    }
    
    return result;
  }, [state]);

  const lineState = getLineState();
  const cellSize = GRID.cellSize;
  const iconSize = ANIMATION_CONFIG.iconSize;

  return (
    <div 
      className={className}
      style={{
        position: 'relative',
        width: SUITE_CANVAS.width,
        height: SUITE_CANVAS.height,
        backgroundColor: 'transparent',
        borderRadius: '16px',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* SVG 连线层 */}
      <svg 
        width={SUITE_CANVAS.width}
        height={SUITE_CANVAS.height}
        viewBox={`0 0 ${SUITE_CANVAS.width} ${SUITE_CANVAS.height}`}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <defs>
          {/* 动态渐变 */}
          {currentPaths.map(({ route, path }) => {
            if (!path.d || !path.startPoint || !path.endPoint) return null;
            
            const { pulse1Progress, pulse2Progress, fadeProgress } = lineState;
            const blueColor = currentSuite.color.start;
            const greenColor = currentSuite.color.end;
            
            const stops: { offset: number; color: string }[] = [];
            
            if (fadeProgress >= 0) {
              stops.push({ offset: 0, color: greenColor });
              stops.push({ offset: 100, color: greenColor });
            } else if (pulse2Progress >= 0) {
              const p2 = pulse2Progress;
              if (p2 <= 0) {
                stops.push({ offset: 0, color: greenColor });
                stops.push({ offset: 100, color: greenColor });
              } else if (p2 >= 1) {
                stops.push({ offset: 0, color: blueColor });
                stops.push({ offset: 100, color: blueColor });
              } else {
                stops.push({ offset: 0, color: blueColor });
                stops.push({ offset: p2 * 100, color: blueColor });
                stops.push({ offset: Math.min(100, p2 * 100 + 1), color: greenColor });
                stops.push({ offset: 100, color: greenColor });
              }
            } else if (pulse1Progress >= 0) {
              const p1 = pulse1Progress;
              if (p1 <= 0) {
                stops.push({ offset: 0, color: blueColor });
                stops.push({ offset: 100, color: blueColor });
              } else if (p1 >= 1) {
                stops.push({ offset: 0, color: greenColor });
                stops.push({ offset: 100, color: greenColor });
              } else {
                stops.push({ offset: 0, color: greenColor });
                stops.push({ offset: p1 * 100, color: greenColor });
                stops.push({ offset: Math.min(100, p1 * 100 + 1), color: blueColor });
                stops.push({ offset: 100, color: blueColor });
              }
            } else {
              stops.push({ offset: 0, color: blueColor });
              stops.push({ offset: 100, color: blueColor });
            }
            
            return (
              <linearGradient 
                key={`grad-${route.from}-${route.to}`}
                id={`gradient-${route.from}-${route.to}`} 
                gradientUnits="userSpaceOnUse"
                x1={path.startPoint.x} 
                y1={path.startPoint.y} 
                x2={path.endPoint.x} 
                y2={path.endPoint.y}
              >
                {stops.map((s, i) => (
                  <stop key={i} offset={`${s.offset}%`} stopColor={s.color} />
                ))}
              </linearGradient>
            );
          })}
        </defs>
        
        {/* 连线渲染 */}
        {currentPaths.map(({ route, path }) => {
          if (!path.d) return null;
          
          const totalLength = path.length > 0 ? path.length : 200;
          const { drawing, opacity, fadeProgress } = lineState;
          
          const hasGradient = path.startPoint && path.endPoint;
          const strokeStyle = hasGradient 
            ? `url(#gradient-${route.from}-${route.to})`
            : currentSuite.color.start;
          
          let dashArray = '';
          let dashOffset = 0;
          
          if (drawing < 1) {
            const drawnLength = totalLength * drawing;
            dashArray = `${drawnLength} ${totalLength}`;
            dashOffset = 0;
          } else if (fadeProgress >= 0 && fadeProgress < 1) {
            const remainingLength = totalLength * (1 - fadeProgress);
            dashArray = `${remainingLength} ${totalLength}`;
            dashOffset = -totalLength * fadeProgress;
          }
          
          const isPulsing = lineState.pulse1Progress >= 0 || lineState.pulse2Progress >= 0;
          
          return (
            <g key={`${route.from}-${route.to}`}>
              {/* 光晕层 */}
              <path
                d={path.d}
                fill="none"
                stroke={strokeStyle}
                strokeWidth={isPulsing ? "6" : "4"}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  ...(dashArray ? { 
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                  } : {}),
                  opacity: opacity * 0.25,
                  filter: 'blur(3px)',
                }}
              />
              
              {/* 主线 */}
              <path
                d={path.d}
                fill="none"
                stroke={strokeStyle}
                strokeWidth={isPulsing ? "2.5" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  ...(dashArray ? { 
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset,
                  } : {}),
                  opacity: opacity,
                }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* 图标层 */}
      {Object.entries(SUITE_ICON_POSITIONS).map(([id, pos]) => {
        const { isActive, progress, color } = getIconActivation(id);
        const icon = pos.icon ? SuiteIcons[pos.icon] : null;
        
        const boxX = pos.x - cellSize / 2;
        const boxY = pos.y - cellSize / 2;
        
        const iconColor = isActive ? color : '#9CA3AF';
        const floatY = isActive ? -4 * progress : 0;
        const showName = showLabels && isActive && progress > 0.3;
        
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              left: boxX,
              top: boxY,
              width: cellSize,
              height: cellSize,
              borderRadius: '12px',
              backgroundColor: isActive ? 'white' : 'transparent',
              border: isActive ? '1px solid #e5e7eb' : '1px solid #d1d5db',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: isActive ? 20 : 10,
              boxSizing: 'border-box',
              boxShadow: isActive 
                ? '0 6px 12px rgba(0,0,0,0.15)' 
                : '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease-out',
              transform: `translateY(${floatY}px)`,
            }}
          >
            {icon && (
              <div style={{ 
                width: iconSize, 
                height: iconSize,
                color: iconColor,
                transition: 'color 0.3s ease-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {icon}
              </div>
            )}
            
            {showName && (
              <div style={{ 
                fontSize: '10px', 
                marginTop: '4px', 
                textAlign: 'center',
                color: '#1f2937',
                fontWeight: 500,
                opacity: progress,
                transition: 'opacity 0.3s ease-out',
                maxWidth: cellSize - 4,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {pos.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SuiteGridAnimationV2;
