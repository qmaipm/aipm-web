/**
 * 动画组件通用工具函数
 */

import { CarouselPhase } from './types';

// ==========================================
// 动画阶段工具函数
// ==========================================

/**
 * 计算动画阶段进度
 * @param progress 当前进度 (0-1)
 * @param phase 阶段配置 { start, end }
 * @returns 阶段内进度 (0-1)
 */
export function getPhaseProgress(
  progress: number, 
  phase: { start: number; end: number }
): number {
  if (progress < phase.start) return 0;
  if (progress > phase.end) return 1;
  return (progress - phase.start) / (phase.end - phase.start);
}

/**
 * 获取当前动画阶段
 * @param progress 当前进度 (0-1)
 * @param phases 阶段配置
 * @returns 当前阶段
 */
export function getAnimationPhase(
  progress: number,
  phases: { [key: string]: { start: number; end: number } }
): CarouselPhase {
  if (progress < (phases.iconActivate?.end ?? 0.08)) return 'icon-activating';
  if (progress < (phases.lineDrawing?.end ?? 0.20)) return 'line-drawing';
  if (progress < (phases.screenActivate?.end ?? 0.23)) return 'screen-activating';
  if (progress < (phases.pulse1?.end ?? 0.40)) return 'pulse1';
  if (progress < (phases.pulse2?.end ?? 0.55)) return 'pulse2';
  if (progress < (phases.iconDeactivate?.end ?? 0.65)) return 'icon-deactivating';
  if (progress < (phases.lineFading?.end ?? 1.0)) return 'line-fading';
  return 'transition';
}

// ==========================================
// 渐变计算工具
// ==========================================

/**
 * 计算渐变色停止点
 * @param progress 当前进度 (0-1)
 * @param startColor 起始颜色
 * @param endColor 结束颜色
 * @param phases 阶段配置
 * @returns 渐变停止点数组
 */
export function getGradientStops(
  progress: number,
  startColor: string,
  endColor: string,
  phases: { [key: string]: { start: number; end: number } }
): { offset: number; color: string }[] {
  const phase = getAnimationPhase(progress, phases);
  
  // 绘制阶段：保持起始颜色
  if (['line-drawing', 'icon-activating', 'screen-activating'].includes(phase)) {
    return [{ offset: 0, color: startColor }, { offset: 100, color: startColor }];
  }
  
  // 脉冲1：从终点颜色流向起始颜色
  if (phase === 'pulse1') {
    const phaseProgress = getPhaseProgress(progress, phases.pulse1);
    return [
      { offset: 0, color: endColor },
      { offset: Math.min(100, phaseProgress * 150), color: startColor },
      { offset: 100, color: startColor },
    ];
  }
  
  // 脉冲2：从起始颜色流向终点颜色
  if (phase === 'pulse2') {
    const phaseProgress = getPhaseProgress(progress, phases.pulse2);
    return [
      { offset: 0, color: startColor },
      { offset: Math.min(100, phaseProgress * 150), color: endColor },
      { offset: 100, color: endColor },
    ];
  }
  
  // 其他阶段：完整渐变
  return [
    { offset: 0, color: startColor },
    { offset: 100, color: endColor },
  ];
}

// ==========================================
// 射线状态计算
// ==========================================

/**
 * 射线状态接口
 */
export interface LineState {
  opacity: number;
  drawProgress: number;
  fadeProgress: number;
}

/**
 * 获取射线状态
 * @param progress 当前进度 (0-1)
 * @param isCurrentIcon 是否为当前活动图标
 * @param phases 阶段配置
 * @returns 射线状态
 */
export function getLineState(
  progress: number,
  isCurrentIcon: boolean,
  phases: { [key: string]: { start: number; end: number } }
): LineState {
  if (!isCurrentIcon) {
    return { opacity: 0, drawProgress: 0, fadeProgress: 0 };
  }
  
  const phase = getAnimationPhase(progress, phases);
  
  // 绘制阶段
  if (phase === 'line-drawing') {
    const drawProgress = getPhaseProgress(progress, phases.lineDrawing);
    return { opacity: 1, drawProgress, fadeProgress: 0 };
  }
  
  // 保持显示阶段
  if (['icon-activating', 'screen-activating', 'pulse1', 'pulse2', 'icon-deactivating'].includes(phase)) {
    return { opacity: 1, drawProgress: 1, fadeProgress: 0 };
  }
  
  // 淡出阶段
  if (phase === 'line-fading') {
    const fadeProgress = getPhaseProgress(progress, phases.lineFading);
    return { opacity: 1 - fadeProgress, drawProgress: 1, fadeProgress };
  }
  
  return { opacity: 0, drawProgress: 0, fadeProgress: 0 };
}

// ==========================================
// 图标状态计算
// ==========================================

/**
 * 图标激活状态接口
 */
export interface IconActivation {
  isActive: boolean;
  activation: number;
}

/**
 * 获取图标激活状态
 * @param progress 当前进度 (0-1)
 * @param isCurrentIcon 是否为当前活动图标
 * @param phases 阶段配置
 * @returns 图标激活状态
 */
export function getIconActivation(
  progress: number,
  isCurrentIcon: boolean,
  phases: { [key: string]: { start: number; end: number } }
): IconActivation {
  if (!isCurrentIcon) {
    return { isActive: false, activation: 0 };
  }
  
  const phase = getAnimationPhase(progress, phases);
  
  if (phase === 'icon-activating') {
    const activation = getPhaseProgress(progress, phases.iconActivate);
    return { isActive: true, activation };
  }
  
  if (phase === 'icon-deactivating') {
    const deactivation = getPhaseProgress(progress, phases.iconDeactivate);
    return { isActive: true, activation: 1 - deactivation };
  }
  
  if (['line-drawing', 'screen-activating', 'pulse1', 'pulse2'].includes(phase)) {
    return { isActive: true, activation: 1 };
  }
  
  return { isActive: false, activation: 0 };
}

// ==========================================
// 缓动函数
// ==========================================

/**
 * ease-out 缓动函数
 * @param t 进度 (0-1)
 * @param power 指数 (默认 2.5)
 * @returns 缓动后的进度
 */
export function easeOut(t: number, power: number = 2.5): number {
  return 1 - Math.pow(1 - t, power);
}

/**
 * ease-in-out 缓动函数
 * @param t 进度 (0-1)
 * @returns 缓动后的进度
 */
export function easeInOut(t: number): number {
  return t < 0.5 
    ? 2 * t * t 
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// ==========================================
// 路径计算工具
// ==========================================

/**
 * 计算 L 形射线路径
 * @param start 起点坐标
 * @param end 终点坐标
 * @param direction 射线方向 ('horizontal-first' | 'vertical-first')
 * @returns SVG 路径字符串
 */
export function getLShapePath(
  start: { x: number; y: number },
  end: { x: number; y: number },
  direction: 'horizontal-first' | 'vertical-first' = 'horizontal-first'
): string {
  if (direction === 'horizontal-first') {
    // 先水平后垂直
    return `M ${start.x} ${start.y} L ${end.x} ${start.y} L ${end.x} ${end.y}`;
  } else {
    // 先垂直后水平
    return `M ${start.x} ${start.y} L ${start.x} ${end.y} L ${end.x} ${end.y}`;
  }
}

/**
 * 计算直线路径
 * @param start 起点坐标
 * @param end 终点坐标
 * @returns SVG 路径字符串
 */
export function getStraightPath(
  start: { x: number; y: number },
  end: { x: number; y: number }
): string {
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}

// ==========================================
// 响应式工具
// ==========================================

/**
 * 计算响应式缩放比例
 * @param containerWidth 容器宽度
 * @param designWidth 设计稿宽度
 * @param minScale 最小缩放比例
 * @param maxScale 最大缩放比例
 * @returns 缩放比例
 */
export function calculateScale(
  containerWidth: number,
  designWidth: number,
  minScale: number = 0.5,
  maxScale: number = 1
): number {
  const scale = containerWidth / designWidth;
  return Math.max(minScale, Math.min(maxScale, scale));
}
