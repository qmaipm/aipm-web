/**
 * 动画组件核心类型定义
 * 
 * 标准化接口设计原则：
 * 1. 所有动画组件使用统一的 Props 接口
 * 2. 支持 G-Line 网格系统坐标
 * 3. 支持响应式布局
 * 4. 支持动画生命周期控制
 */

import { CSSProperties, ReactNode } from 'react';

// ==========================================
// G-Line 网格系统
// ==========================================

/**
 * G-Line 网格位置
 * - G1: 内容区左边界
 * - G2: G1 和 G3 的中点
 * - G3: 动画区左边界
 * - G4: 动画区中心
 * - G5: 内容区右边界
 */
export interface GLinePositions {
  G1: number;
  G2: number;
  G3: number;
  G4: number;
  G5: number;
  layoutWidth: number;
  columnWidth: number;
}

/**
 * 默认 G-Line 计算函数
 * 基于视窗宽度计算 G-Line 位置
 */
export function calculateGLines(viewportWidth: number, maxWidth: number = 1080): GLinePositions {
  const layoutWidth = Math.min(maxWidth, viewportWidth - 32);
  const sideMargin = (viewportWidth - layoutWidth) / 2;
  const columnWidth = layoutWidth / 4;
  
  const G1 = sideMargin;
  const G3 = sideMargin + columnWidth * 2;
  const G2 = (G1 + G3) / 2;
  const G4 = sideMargin + columnWidth * 3;
  const G5 = sideMargin + layoutWidth;
  
  return { G1, G2, G3, G4, G5, layoutWidth, columnWidth };
}

// ==========================================
// 动画组件标准接口
// ==========================================

/**
 * 动画组件基础 Props
 */
export interface AnimationBaseProps {
  /** 是否激活动画 */
  isActive?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/**
 * 动画组件布局配置
 */
export interface AnimationLayoutConfig {
  /** 画布宽度 */
  canvasWidth: number;
  /** 画布高度 */
  canvasHeight: number;
  /** PC/手机界面宽度 */
  deviceWidth: number;
  /** PC/手机界面高度 */
  deviceHeight: number;
  /** 图标尺寸 */
  iconSize: number;
  /** 内部图标尺寸 */
  innerIconSize: number;
  /** 图标间距 */
  iconGap: number;
  /** 图标到设备的间距 */
  iconToDeviceGap: number;
}

/**
 * 动画时序配置
 */
export interface AnimationTimingConfig {
  /** 每个图标的动画周期（毫秒） */
  iconDuration: number;
  /** 轮播周期（毫秒） */
  cycleDuration?: number;
  /** 过渡动画时长（毫秒） */
  slideDuration?: number;
  /** 动画阶段配置 */
  phases: {
    [key: string]: { start: number; end: number };
  };
}

/**
 * 入场动画配置
 */
export interface EntryAnimationConfig {
  durations: {
    iconsEnter: number;
    lineToEdge: number;
    borderTrace: number;
    phoneAppear?: number;
    contentFadeIn: number;
    displayTime: number;
    lineFadeOut: number;
  };
}

// ==========================================
// 图标配置
// ==========================================

/**
 * 图标位置类型
 */
export type IconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right';

/**
 * 射线起始方向
 */
export type LineStartDirection = 'left' | 'right' | 'top' | 'bottom';

/**
 * 图标配置
 */
export interface IconConfig {
  /** 唯一标识 */
  id: string;
  /** 图标 SVG 元素 */
  icon: ReactNode;
  /** 图标名称 */
  name: string;
  /** 图标位置 */
  position: IconPosition;
  /** 射线起始方向 */
  lineStart: LineStartDirection;
  /** 渐变起始颜色 */
  startColor: string;
  /** 渐变结束颜色 */
  endColor: string;
}

// ==========================================
// VI 品牌渐变配置
// ==========================================

/**
 * VI v10.0 六大核心渐变
 */
export const VI_GRADIENTS = {
  'blue-green': { start: '#0070FF', end: '#12B98A' },
  'blue-gold': { start: '#0070FF', end: '#F59E0B' },
  'green-gold': { start: '#12B98A', end: '#F59E0B' },
  'blue-purple': { start: '#0070FF', end: '#9333EA' },
  'purple-pink': { start: '#9333EA', end: '#EC4899' },
  'pink-gold': { start: '#EC4899', end: '#F59E0B' },
} as const;

export type GradientType = keyof typeof VI_GRADIENTS;

/**
 * 获取 VI 渐变颜色
 */
export function getGradientColors(type: GradientType): { start: string; end: string } {
  return VI_GRADIENTS[type];
}

// ==========================================
// 动画状态
// ==========================================

/**
 * 入场动画阶段
 */
export type EntryPhase = 
  | 'idle'              // 等待触发
  | 'icons-enter'       // 图标入场
  | 'line-to-edge'      // 射线连接到边框位置
  | 'border-trace'      // 边框环绕
  | 'phone-appear'      // 设备边框出现
  | 'content-fade-in'   // 内容淡入
  | 'display'           // 停留展示
  | 'line-fade-out'     // 射线淡出
  | 'complete';         // 完成，进入正常轮播

/**
 * 轮播动画阶段
 */
export type CarouselPhase = 
  | 'icon-activating'   // 图标激活中
  | 'line-drawing'      // 射线绘制中
  | 'screen-activating' // 屏幕激活中
  | 'pulse1'            // 脉冲效果1
  | 'pulse2'            // 脉冲效果2
  | 'icon-deactivating' // 图标熄灭中
  | 'line-fading'       // 射线淡出中
  | 'transition';       // 过渡中

// ==========================================
// 动画组件注册
// ==========================================

/**
 * 动画组件元数据
 */
export interface AnimationComponentMeta {
  /** 组件 ID */
  id: string;
  /** 组件名称 */
  name: string;
  /** 组件描述 */
  description: string;
  /** 默认布局配置 */
  defaultLayout: AnimationLayoutConfig;
  /** 默认时序配置 */
  defaultTiming: AnimationTimingConfig;
  /** 支持的图标数量 */
  iconCount: number;
}

/**
 * 动画组件 Props 扩展
 */
export interface AnimationComponentProps extends AnimationBaseProps {
  /** G-Line 位置（可选，用于对齐） */
  gLines?: GLinePositions;
  /** 是否为移动端 */
  isMobile?: boolean;
  /** 动画完成回调 */
  onAnimationComplete?: () => void;
  /** 图标切换回调 */
  onIconChange?: (iconIndex: number) => void;
}
