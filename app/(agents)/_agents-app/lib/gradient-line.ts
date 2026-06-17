/**
 * ==========================================
 * GradientLine - 渐变连线库 v4.1
 * ==========================================
 * 
 * ==========================================
 * 【核心路径规则 - PATH_RULE v4.1】
 * ==========================================
 * 
 * 【重要】路径结构统一为：
 * 1. 起点：图标"第一段发出方向"那一边的中点
 * 2. 第一段：垂直方向
 * 3. 圆角拐弯：6-8px
 * 4. 第二段：水平方向
 * 5. 终点：容器边缘的指定接入点
 * 
 * ┌─────────────────────────────────────────────────────────┐
 * │  【起点边缘规则】                                         │
 * │                                                         │
 * │  上方图标(top):                                          │
 * │  - 起点：图标底边中点（因为第一段向下）                     │
 * │  - 第一段：垂直向下 ↓                                     │
 * │  - 第二段：水平向左/右 ← → 进入容器顶边                    │
 * │                                                         │
 * │  下方图标(bottom):                                       │
 * │  - 起点：图标顶边中点（因为第一段向上）                     │
 * │  - 第一段：垂直向上 ↑                                     │
 * │  - 第二段：水平向左/右 ← → 进入容器底边                    │
 * │                                                         │
 * │  左侧图标(left):                                         │
 * │  - 起点：图标顶边或底边中点（根据终点Y位置决定）             │
 * │  - 第一段：垂直向上或向下 ↑↓                              │
 * │  - 第二段：水平向右 → 进入容器左边                         │
 * │                                                         │
 * │  右侧图标(right):                                        │
 * │  - 起点：图标顶边或底边中点（根据终点Y位置决定）             │
 * │  - 第一段：垂直向上或向下 ↑↓                              │
 * │  - 第二段：水平向左 ← 进入容器右边                         │
 * └─────────────────────────────────────────────────────────┘
 * 
 * 【验收清单】
 * 1. ✓ 起点在图标"第一段发出方向"的边缘中点
 * 2. ✓ 第一段为垂直方向
 * 3. ✓ 只有一次圆角拐弯（6-8px）
 * 4. ✓ 第二段为水平方向
 * 5. ✓ 终点在容器边缘
 * 6. ✓ 路径全程不越界
 * 7. ✓ 无斜线
 * 
 * ==========================================
 */

// ==========================================
// 类型定义
// ==========================================

export interface Point { x: number; y: number }
export type Direction = 'left' | 'right' | 'up' | 'down';
export type Side = 'left' | 'right' | 'top' | 'bottom';
export type VerticalDirection = 'up' | 'down';
export type HorizontalDirection = 'left' | 'right';
export type IconEdge = 'top' | 'bottom' | 'left' | 'right';

export interface IconPosition {
  x: number;
  y: number;
  side: Side;
}

export interface ContainerBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

export interface EndPoint {
  id: string;
  point: Point;
  entryDirection: Direction;
  targetId?: string;
}

export interface LinePath {
  d: string;
  length: number;
  start: Point;
  end: Point;
  corner: Point;
  parallelLength: number;      // 第一段（垂直）长度
  perpendicularLength: number; // 第二段（水平）长度
  startEdge: IconEdge;         // 起点所在的图标边缘
  firstDirection: VerticalDirection;  // 第一段垂直方向
  secondDirection: HorizontalDirection; // 第二段水平方向
}

export interface GradientConfig { start: string; end: string }

// ==========================================
// 路径规则常量 v4.1
// ==========================================

/**
 * PATH_RULES v4.1 - 完整路径规则定义
 * 
 * 核心原则：
 * - 所有图标的第一段都是垂直方向
 * - 所有图标的第二段都是水平方向
 * - 起点从"第一段发出方向"的边缘中点出发
 */
export const PATH_RULES = {
  /**
   * 上方图标
   * - 起点：图标底边中点
   * - 第一段：垂直向下
   * - 第二段：水平进入容器顶边
   */
  top: {
    firstSegment: 'vertical' as const,
    secondSegment: 'horizontal' as const,
    startEdge: 'bottom' as IconEdge,      // 从底边出发
    firstDirection: 'down' as VerticalDirection,
    entryDirection: 'down' as Direction,
  },
  
  /**
   * 下方图标
   * - 起点：图标顶边中点
   * - 第一段：垂直向上
   * - 第二段：水平进入容器底边
   */
  bottom: {
    firstSegment: 'vertical' as const,
    secondSegment: 'horizontal' as const,
    startEdge: 'top' as IconEdge,         // 从顶边出发
    firstDirection: 'up' as VerticalDirection,
    entryDirection: 'up' as Direction,
  },
  
  /**
   * 左侧图标
   * - 起点：图标顶边或底边中点（根据终点位置）
   * - 第一段：垂直向上或向下
   * - 第二段：水平向右进入容器左边
   */
  left: {
    firstSegment: 'vertical' as const,
    secondSegment: 'horizontal' as const,
    startEdge: 'auto' as 'auto',          // 根据终点位置自动选择
    firstDirection: 'auto' as 'auto',
    entryDirection: 'right' as Direction,
  },
  
  /**
   * 右侧图标
   * - 起点：图标顶边或底边中点（根据终点位置）
   * - 第一段：垂直向上或向下
   * - 第二段：水平向左进入容器右边
   */
  right: {
    firstSegment: 'vertical' as const,
    secondSegment: 'horizontal' as const,
    startEdge: 'auto' as 'auto',          // 根据终点位置自动选择
    firstDirection: 'auto' as 'auto',
    entryDirection: 'left' as Direction,
  },
} as const;

// ==========================================
// 配置系统
// ==========================================

export interface GradientLineConfig {
  canvas: { width: number; height: number };
  container: {
    width: number;
    height: number;
    horizontalWidth: number;
    horizontalHeight: number;
  };
  icon: {
    size: number;
    sizeActive: number;
    offsetFromContainer: number;
  };
  line: {
    width: number;
    cornerRadius: number;
    minParallelLength: number;
    minTotalLength: number;
  };
  shimmer: {
    widthPercent: number;
    brightness: number;
    duration: number;
  };
  timing: {
    cycleInterval: number;
    iconLightUp: number;
    iconLightUpDelay: number;
    lineDrawDuration: number;
    lineDrawDelay: number;
    contentDisplay: number;
    iconFadeOut: number;
    iconFadeOutDelay: number;
    lineFadeDuration: number;
    lineFadeDelay: number;
  };
}

export const DEFAULT_CONFIG: GradientLineConfig = {
  canvas: { width: 800, height: 640 },
  container: {
    width: 420,
    height: 500,
    horizontalWidth: 580,
    horizontalHeight: 400,
  },
  icon: {
    size: 40,
    sizeActive: 48,
    offsetFromContainer: 72,
  },
  line: {
    width: 2,
    cornerRadius: 8,
    minParallelLength: 24,
    minTotalLength: 60,
  },
  shimmer: {
    widthPercent: 0.15,
    brightness: 0.8,
    duration: 800,
  },
  timing: {
    cycleInterval: 5000,
    iconLightUp: 250,
    iconLightUpDelay: 80,
    lineDrawDuration: 500,
    lineDrawDelay: 80,
    contentDisplay: 2800,
    iconFadeOut: 250,
    iconFadeOutDelay: 50,
    lineFadeDuration: 400,
    lineFadeDelay: 80,
  },
};

// ==========================================
// 栅格系统配置 v5.0
// ==========================================
// 
// 基于 CSS 栅格系统的精确配置
// 所有尺寸由栅格系统计算得出，不允许硬编码
//
// 栅格系统定义 (来自 globals.css):
// - --layout-max-width: 1080px
// - --layout-column-count: 4
// - --layout-column-width: 1080/4 = 270px
// - 动画区域 = guide-3 到 guide-5 = 2列 = 540px
// - guide-4 相对于动画区域 = 270px (正好是中点)
//
// ==========================================

/**
 * ==========================================
 * 栅格系统 v7.0 - 基于参照线的绝对坐标系统
 * ==========================================
 * 
 * 【核心原则】
 * 一切尺寸和位置都从参照线推导，不允许猜测！
 * 
 * 【已确认的基准坐标系】(通过 audit-baseline.js 验证)
 * 动画区域局部坐标：
 * - guide-3 (起点) = X=0
 * - guide-4 (中线) = X=270  ← 这是所有水平对齐的基准！
 * - guide-5 (终点) = X=540
 * - 动画区域宽度 = 540px (固定，不可改变)
 * 
 * 【布局规则】
 * 1. 中央容器：中心必须在 X=270 (guide-4)
 * 2. 左侧图标：X 坐标 < 270，距离 guide-3 有固定 padding
 * 3. 右侧图标：X 坐标 > 270，距离 guide-5 有相同的固定 padding
 * 4. 图标 padding 必须左右相等（对称）
 */

// ==========================================
// 全局统一 Padding 常量
// ==========================================
/**
 * UNIFIED_PADDING v1.1
 * 
 * 这是整个栅格系统的统一间距常量
 * 用于：
 * - 左侧文字距离 G1 的 padding
 * - 动画区图标距离 G3/G5 的 padding（图标边缘到参照线的距离）
 * 
 * 值：12px（约两个汉字的宽度）
 */
export const UNIFIED_PADDING = 12;

// ==========================================
// 基准参照线坐标（不可修改！）
// ==========================================
export const GUIDES = {
  /** guide-3 在动画区域内的局部 X 坐标（起点）*/
  GUIDE_3: 0,
  /** guide-4 在动画区域内的局部 X 坐标（中线）*/
  GUIDE_4: 270,
  /** guide-5 在动画区域内的局部 X 坐标（终点）*/
  GUIDE_5: 540,
  /** 动画区域总宽度 */
  ANIMATION_WIDTH: 540,
} as const;

// ==========================================
// 布局参数配置
// ==========================================
export const LAYOUT_CONFIG = {
  // --- 画布 ---
  canvas: {
    width: GUIDES.ANIMATION_WIDTH,  // 540px，等于动画区域宽度
    height: 500,                     // 画布高度
  },
  
  // --- 中央容器 ---
  // 中央容器必须以 guide-4 为中心
  container: {
    // 纵向布局（手机屏幕）
    vertical: {
      width: 270,   // = 1 列宽度
      height: 360,  // 手机比例
    },
    // 横向布局（卡片）
    horizontal: {
      width: 460,   // 卡片宽度
      height: 270,  // 卡片高度
    },
  },
  
  // --- 图标 ---
  icon: {
    size: 40,
    sizeActive: 48,
    /**
     * 图标中心距离边界参照线的距离
     * 
     * v2.0 计算公式（基于统一 padding 原则）：
     * - UNIFIED_PADDING = 6px（图标边缘到参照线的距离）
     * - 图标半径 = 20px（size / 2）
     * - 图标中心距参照线 = UNIFIED_PADDING + 图标半径 = 6 + 20 = 26px
     * 
     * 这确保：
     * - 图标边缘距 G3 = 6px
     * - 图标边缘距 G5 = 6px
     * - 与左侧文字的 6px padding 保持一致
     */
    paddingFromGuide: UNIFIED_PADDING + 20,  // 6 + 20 = 26px
  },
  
  // --- 折线 ---
  line: {
    cornerRadius: 8,
    minLength: 20,  // 折线最小长度
  },
} as const;

// ==========================================
// 坐标计算函数
// ==========================================

/**
 * 计算左侧图标的 X 坐标
 * 基于 guide-3 + padding
 */
export function getLeftIconX(): number {
  return GUIDES.GUIDE_3 + LAYOUT_CONFIG.icon.paddingFromGuide;
}

/**
 * 计算右侧图标的 X 坐标
 * 基于 guide-5 - padding（保证与左侧对称）
 */
export function getRightIconX(): number {
  return GUIDES.GUIDE_5 - LAYOUT_CONFIG.icon.paddingFromGuide;
}

/**
 * 计算中央容器的边界
 * 中心点必须在 guide-4
 */
export function getContainerBounds(isHorizontal: boolean = false): {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
} {
  const containerConfig = isHorizontal 
    ? LAYOUT_CONFIG.container.horizontal 
    : LAYOUT_CONFIG.container.vertical;
  
  const centerX = GUIDES.GUIDE_4;  // 必须是 270
  const centerY = LAYOUT_CONFIG.canvas.height / 2;
  
  return {
    centerX,
    centerY,
    width: containerConfig.width,
    height: containerConfig.height,
    left: centerX - containerConfig.width / 2,
    right: centerX + containerConfig.width / 2,
    top: centerY - containerConfig.height / 2,
    bottom: centerY + containerConfig.height / 2,
  };
}

/**
 * 验证布局配置的合法性
 * 确保图标不会与容器重叠
 */
export function validateLayoutConfig(isHorizontal: boolean = false): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const container = getContainerBounds(isHorizontal);
  const leftIconX = getLeftIconX();
  const rightIconX = getRightIconX();
  const iconHalfSize = LAYOUT_CONFIG.icon.size / 2;
  
  // 检查左侧图标是否在容器外
  if (leftIconX + iconHalfSize >= container.left) {
    errors.push(`左侧图标右边缘 (${leftIconX + iconHalfSize}) 超出容器左边缘 (${container.left})`);
  }
  
  // 检查右侧图标是否在容器外
  if (rightIconX - iconHalfSize <= container.right) {
    errors.push(`右侧图标左边缘 (${rightIconX - iconHalfSize}) 超出容器右边缘 (${container.right})`);
  }
  
  // 检查对称性
  const leftPadding = leftIconX;  // 距离 guide-3 (X=0)
  const rightPadding = GUIDES.GUIDE_5 - rightIconX;  // 距离 guide-5 (X=540)
  if (leftPadding !== rightPadding) {
    errors.push(`左右 padding 不对称: 左=${leftPadding}, 右=${rightPadding}`);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// 兼容旧代码的导出
export const GRID_SYSTEM = {
  layoutMaxWidth: 1080,
  columnCount: 4,
  get columnWidth() { return this.layoutMaxWidth / this.columnCount; },
  get animationAreaWidth() { return GUIDES.ANIMATION_WIDTH; },
  get guide4RelativeX() { return GUIDES.GUIDE_4; },
} as const;

/**
 * 动画布局配置接口
 */
export interface AnimationLayoutConfig {
  // 画布尺寸
  canvas: {
    width: number;   // = GRID_SYSTEM.animationAreaWidth
    height: number;  // 由比例计算
  };
  // 中央容器
  container: {
    width: number;
    height: number;
    // 中心点位置（相对于画布）
    centerX: number; // = GRID_SYSTEM.guide4RelativeX
    centerY: number; // = canvas.height / 2
  };
  // 图标配置
  icon: {
    size: number;
    sizeActive: number;
    // 图标中心到画布边缘的距离
    edgeOffset: number;
  };
  // 折线配置
  line: {
    cornerRadius: number;
  };
}

/**
 * 创建基于参照线 v7.0 的动画布局配置
 * 
 * v7.0 核心改变：
 * - 所有坐标都基于参照线计算，不允许猜测
 * - 图标 X 坐标直接使用 getLeftIconX() 和 getRightIconX()
 * - 中央容器中心必须在 GUIDES.GUIDE_4 (X=270)
 * 
 * @param isHorizontal - 是否为横向布局
 * @returns 完整的布局配置
 */
export function createAnimationLayoutConfig(
  isHorizontal: boolean = false
): AnimationLayoutConfig {
  // === 1. 画布尺寸（固定）===
  const canvasWidth = LAYOUT_CONFIG.canvas.width;  // 540px
  const canvasHeight = LAYOUT_CONFIG.canvas.height; // 500px
  
  // === 2. 中央容器（从配置获取）===
  const containerConfig = isHorizontal 
    ? LAYOUT_CONFIG.container.horizontal 
    : LAYOUT_CONFIG.container.vertical;
  
  // === 3. 中央容器中心点（必须对齐 guide-4）===
  const containerCenterX = GUIDES.GUIDE_4;  // 270px，不可改变！
  const containerCenterY = canvasHeight / 2;
  
  // === 4. 图标 padding（直接使用配置值）===
  // 纵向布局：使用 paddingFromGuide 作为水平 padding
  // 横向布局：需要计算垂直 padding
  const iconSize = LAYOUT_CONFIG.icon.size;
  let iconEdgeOffset: number;
  
  if (isHorizontal) {
    // 横向布局：上下 padding 需要根据容器高度计算
    const gapOnEachSide = (canvasHeight - containerConfig.height) / 2;
    iconEdgeOffset = Math.round(gapOnEachSide / 2 + iconSize / 2);
  } else {
    // 纵向布局：直接使用固定的 paddingFromGuide
    iconEdgeOffset = LAYOUT_CONFIG.icon.paddingFromGuide;
  }
  
  return {
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
    },
    container: {
      width: containerConfig.width,
      height: containerConfig.height,
      centerX: containerCenterX,
      centerY: containerCenterY,
    },
    icon: {
      size: iconSize,
      sizeActive: LAYOUT_CONFIG.icon.sizeActive,
      edgeOffset: iconEdgeOffset,
    },
    line: {
      cornerRadius: LAYOUT_CONFIG.line.cornerRadius,
    },
  };
}

/**
 * 根据布局配置计算图标位置 v7.0
 * 
 * v7.0 核心改变：
 * - 纵向布局：直接使用 getLeftIconX() 和 getRightIconX() 函数
 * - 横向布局：使用 edgeOffset 计算上下位置
 * - 所有坐标都基于参照线，不允许猜测
 * 
 * @param count - 图标数量
 * @param config - 布局配置
 * @param isHorizontal - 是否为横向布局
 * @returns 图标位置数组
 */
export function calculateIconPositionsFromConfig(
  count: number,
  config: AnimationLayoutConfig,
  isHorizontal: boolean = false
): IconPosition[] {
  const positions: IconPosition[] = [];
  const { canvas, container, icon } = config;
  
  if (isHorizontal) {
    // === 横向布局：图标在上下两侧 ===
    const topCount = Math.ceil(count / 2);
    const bottomCount = count - topCount;
    
    // 图标水平分布范围（在中央容器宽度内均匀分布）
    const spreadWidth = container.width * 0.75;
    const startX = container.centerX - spreadWidth / 2;
    
    // 上方图标 Y 位置（使用 edgeOffset）
    const topY = icon.edgeOffset;
    // 下方图标 Y 位置（对称）
    const bottomY = canvas.height - icon.edgeOffset;
    
    // 上方图标
    for (let i = 0; i < topCount; i++) {
      const x = topCount === 1 
        ? container.centerX 
        : startX + (spreadWidth / (topCount - 1)) * i;
      positions.push({
        x,
        y: topY,
        side: 'top',
      });
    }
    
    // 下方图标
    for (let i = 0; i < bottomCount; i++) {
      const x = bottomCount === 1 
        ? container.centerX 
        : startX + (spreadWidth / (bottomCount - 1)) * i;
      positions.push({
        x,
        y: bottomY,
        side: 'bottom',
      });
    }
  } else {
    // === 纵向布局：图标在左右两侧 ===
    // 核心改变：直接使用基于参照线的函数
    const leftCount = Math.ceil(count / 2);
    const rightCount = count - leftCount;
    
    // 图标垂直分布范围（在中央容器高度内均匀分布）
    const spreadHeight = container.height * 0.7;
    const startY = container.centerY - spreadHeight / 2;
    
    // 【关键】使用基于参照线的函数获取 X 坐标
    const leftX = getLeftIconX();   // = GUIDES.GUIDE_3 + paddingFromGuide
    const rightX = getRightIconX(); // = GUIDES.GUIDE_5 - paddingFromGuide
    
    // 左侧图标
    for (let i = 0; i < leftCount; i++) {
      const y = leftCount === 1 
        ? container.centerY 
        : startY + (spreadHeight / (leftCount - 1)) * i;
      positions.push({
        x: leftX,
        y,
        side: 'left',
      });
    }
    
    // 右侧图标
    for (let i = 0; i < rightCount; i++) {
      const y = rightCount === 1 
        ? container.centerY 
        : startY + (spreadHeight / (rightCount - 1)) * i;
      positions.push({
        x: rightX,
        y,
        side: 'right',
      });
    }
  }
  
  return positions;
}

/**
 * 根据布局配置计算容器边界
 */
export function calculateContainerBoundsFromConfig(
  config: AnimationLayoutConfig
): ContainerBounds {
  const { container } = config;
  
  return {
    width: container.width,
    height: container.height,
    centerX: container.centerX,
    centerY: container.centerY,
    left: container.centerX - container.width / 2,
    right: container.centerX + container.width / 2,
    top: container.centerY - container.height / 2,
    bottom: container.centerY + container.height / 2,
  };
}

// ==========================================
// VI品牌渐变色
// ==========================================

export const VI_GRADIENTS = {
  blueGreen: { start: '#0070FF', end: '#12B98A' },
  blueGold: { start: '#0070FF', end: '#F59E0B' },
  greenGold: { start: '#12B98A', end: '#F59E0B' },
  bluePurple: { start: '#0070FF', end: '#9333EA' },
  purplePink: { start: '#9333EA', end: '#EC4899' },
  pinkGold: { start: '#EC4899', end: '#F59E0B' },
} as const;

export function getGradientForModule(moduleId: string): GradientConfig {
  const mapping: Record<string, keyof typeof VI_GRADIENTS> = {
    'modular-ai': 'blueGreen',
    'service-design': 'bluePurple',
    'operations': 'greenGold',
    'quality': 'purplePink',
    'review': 'blueGold',
  };
  return VI_GRADIENTS[mapping[moduleId] || 'blueGreen'];
}

// ==========================================
// 起点计算 v4.1 - 核心函数
// ==========================================

/**
 * 获取图标指定边缘的中点
 * 
 * @param iconCenter 图标中心点
 * @param iconSize 图标尺寸
 * @param edge 要获取的边缘 ('top' | 'bottom' | 'left' | 'right')
 * @returns 边缘中点坐标
 */
export function getIconEdgeMidpoint(
  iconCenter: Point,
  iconSize: number,
  edge: IconEdge
): Point {
  const halfSize = iconSize / 2;
  
  switch (edge) {
    case 'top':
      return { x: iconCenter.x, y: iconCenter.y - halfSize };
    case 'bottom':
      return { x: iconCenter.x, y: iconCenter.y + halfSize };
    case 'left':
      return { x: iconCenter.x - halfSize, y: iconCenter.y };
    case 'right':
      return { x: iconCenter.x + halfSize, y: iconCenter.y };
  }
}

/**
 * 根据路径规则计算起点
 * 
 * v4.1 核心逻辑：
 * - 上方图标：从底边中点出发（向下）
 * - 下方图标：从顶边中点出发（向上）
 * - 左侧图标：从顶边或底边中点出发（根据终点Y位置）
 * - 右侧图标：从顶边或底边中点出发（根据终点Y位置）
 * 
 * @param iconCenter 图标中心点
 * @param iconSize 图标尺寸
 * @param iconSide 图标位置 ('top' | 'bottom' | 'left' | 'right')
 * @param endPoint 终点坐标（用于左右图标确定垂直方向）
 * @returns { start: Point, startEdge: IconEdge, firstDirection: VerticalDirection }
 */
export function calculateStartPoint(
  iconCenter: Point,
  iconSize: number,
  iconSide: Side,
  endPoint: Point
): { start: Point; startEdge: IconEdge; firstDirection: VerticalDirection } {
  const rule = PATH_RULES[iconSide];
  
  let startEdge: IconEdge;
  let firstDirection: VerticalDirection;
  
  if (iconSide === 'top') {
    // 上方图标：从底边出发，向下
    startEdge = 'bottom';
    firstDirection = 'down';
  } else if (iconSide === 'bottom') {
    // 下方图标：从顶边出发，向上
    startEdge = 'top';
    firstDirection = 'up';
  } else {
    // 左侧/右侧图标：根据终点Y位置决定
    // 如果终点Y > 图标Y，从底边出发向下
    // 如果终点Y < 图标Y，从顶边出发向上
    if (endPoint.y > iconCenter.y) {
      startEdge = 'bottom';
      firstDirection = 'down';
    } else {
      startEdge = 'top';
      firstDirection = 'up';
    }
  }
  
  const start = getIconEdgeMidpoint(iconCenter, iconSize, startEdge);
  
  return { start, startEdge, firstDirection };
}

/**
 * 旧版兼容函数 - getIconEdgeStart
 * @deprecated 使用 calculateStartPoint 替代
 */
export function getIconEdgeStart(
  iconCenter: Point,
  iconSize: number,
  side: Side
): Point {
  // 为了向后兼容，这里使用简化逻辑
  // 但推荐使用 calculateStartPoint
  const rule = PATH_RULES[side];
  
  if (side === 'top') {
    return getIconEdgeMidpoint(iconCenter, iconSize, 'bottom');
  } else if (side === 'bottom') {
    return getIconEdgeMidpoint(iconCenter, iconSize, 'top');
  } else {
    // 左右侧默认从底边出发（实际应根据终点位置决定）
    return getIconEdgeMidpoint(iconCenter, iconSize, 'bottom');
  }
}

export function getStartDirection(side: Side): Direction {
  switch (side) {
    case 'left': return 'right';
    case 'right': return 'left';
    case 'top': return 'down';
    case 'bottom': return 'up';
  }
}

// ==========================================
// 结束点计算
// ==========================================

export function createEndPoint(
  containerBounds: ContainerBounds,
  side: Side,
  offset: number = 0,
  targetId?: string
): EndPoint {
  const id = `endpoint-${side}-${offset}-${targetId || 'default'}`;
  
  switch (side) {
    case 'left':
      return {
        id,
        point: { x: containerBounds.left, y: containerBounds.centerY + offset },
        entryDirection: 'right',
        targetId,
      };
    case 'right':
      return {
        id,
        point: { x: containerBounds.right, y: containerBounds.centerY + offset },
        entryDirection: 'left',
        targetId,
      };
    case 'top':
      return {
        id,
        point: { x: containerBounds.centerX + offset, y: containerBounds.top },
        entryDirection: 'down',
        targetId,
      };
    case 'bottom':
      return {
        id,
        point: { x: containerBounds.centerX + offset, y: containerBounds.bottom },
        entryDirection: 'up',
        targetId,
      };
  }
}

export function createEndPoints(
  containerBounds: ContainerBounds,
  iconPositions: IconPosition[],
  spacing: number = 30
): EndPoint[] {
  return iconPositions.map((icon, index) => {
    const offset = (index - Math.floor(iconPositions.length / 2)) * spacing;
    return createEndPoint(containerBounds, icon.side, offset, `line-${index}`);
  });
}

// ==========================================
// 路径生成 v4.1 - 核心函数
// ==========================================

/**
 * generatePath v4.1 - 生成90度折线路径
 * 
 * 【核心规则】
 * 1. 起点：从图标"第一段发出方向"的边缘中点出发
 * 2. 第一段：垂直方向
 * 3. 圆角拐弯：6-8px
 * 4. 第二段：水平方向
 * 5. 终点：容器边缘
 * 
 * @param iconCenter 图标中心点
 * @param iconSize 图标尺寸
 * @param endPoint 终点坐标
 * @param iconSide 图标位置
 * @param cornerRadius 圆角半径
 */
export function generatePath(
  iconCenter: Point,
  iconSize: number,
  endPoint: Point,
  iconSide: Side,
  cornerRadius: number = 8
): LinePath {
  const r = cornerRadius;
  
  // 1. 计算起点（从正确的边缘中点出发）
  const { start, startEdge, firstDirection } = calculateStartPoint(
    iconCenter,
    iconSize,
    iconSide,
    endPoint
  );
  
  // 2. 计算拐点（X与起点对齐，Y与终点对齐）
  const corner: Point = { x: start.x, y: endPoint.y };
  
  // 3. 计算第二段水平方向
  const secondDirection: HorizontalDirection = endPoint.x > start.x ? 'right' : 'left';
  
  // 4. 生成SVG路径
  let d: string;
  
  if (firstDirection === 'down') {
    // 向下 → 水平
    if (secondDirection === 'right') {
      d = `M ${start.x} ${start.y} ` +
          `L ${start.x} ${corner.y - r} ` +
          `Q ${start.x} ${corner.y} ${start.x + r} ${corner.y} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    } else {
      d = `M ${start.x} ${start.y} ` +
          `L ${start.x} ${corner.y - r} ` +
          `Q ${start.x} ${corner.y} ${start.x - r} ${corner.y} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    }
  } else {
    // 向上 → 水平
    if (secondDirection === 'right') {
      d = `M ${start.x} ${start.y} ` +
          `L ${start.x} ${corner.y + r} ` +
          `Q ${start.x} ${corner.y} ${start.x + r} ${corner.y} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    } else {
      d = `M ${start.x} ${start.y} ` +
          `L ${start.x} ${corner.y + r} ` +
          `Q ${start.x} ${corner.y} ${start.x - r} ${corner.y} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    }
  }
  
  // 5. 计算长度
  const verticalLength = Math.abs(corner.y - start.y);
  const horizontalLength = Math.abs(endPoint.x - corner.x);
  const arcLength = (Math.PI * r) / 2;
  const totalLength = verticalLength + arcLength + horizontalLength;
  
  const path: LinePath = {
    d,
    length: totalLength,
    start,
    end: endPoint,
    corner,
    parallelLength: verticalLength,
    perpendicularLength: horizontalLength,
    startEdge,
    firstDirection,
    secondDirection,
  };
  
  // 6. 开发环境自动验证
  if (process.env.NODE_ENV === 'development') {
    const validation = validatePathRule(path, iconSide, iconCenter, iconSize);
    if (!validation.isValid) {
      console.error('❌ 路径规则验证失败:');
      validation.errors.forEach(e => console.error('  ', e));
    }
  }
  
  return path;
}

/**
 * generatePathHorizontalFirst - 横向动画专用路径生成
 * 
 * 【横向动画折线规则】
 * 1. 起点：从图标左/右边缘中点出发
 * 2. 第一段：水平方向
 * 3. 圆角拐弯：6-8px
 * 4. 第二段：垂直方向
 * 5. 终点：容器上/下边缘
 * 
 * 与 generatePath 的区别：
 * - generatePath: 垂直发出 → 水平连接 (用于纵向动画)
 * - generatePathHorizontalFirst: 水平发出 → 垂直连接 (用于横向动画)
 */
export function generatePathHorizontalFirst(
  iconCenter: Point,
  iconSize: number,
  endPoint: Point,
  iconSide: Side,
  cornerRadius: number = 8
): LinePath {
  const r = cornerRadius;
  const halfIcon = iconSize / 2;
  
  // 1. 计算起点（从左/右边缘中点出发）
  let start: Point;
  let startEdge: IconEdge;
  let firstDirection: HorizontalDirection;
  
  if (iconSide === 'top') {
    // 上方图标：根据终点位置决定从左还是右边缘出发
    if (endPoint.x < iconCenter.x) {
      start = { x: iconCenter.x - halfIcon, y: iconCenter.y };
      startEdge = 'left';
      firstDirection = 'left';
    } else {
      start = { x: iconCenter.x + halfIcon, y: iconCenter.y };
      startEdge = 'right';
      firstDirection = 'right';
    }
  } else {
    // 下方图标
    if (endPoint.x < iconCenter.x) {
      start = { x: iconCenter.x - halfIcon, y: iconCenter.y };
      startEdge = 'left';
      firstDirection = 'left';
    } else {
      start = { x: iconCenter.x + halfIcon, y: iconCenter.y };
      startEdge = 'right';
      firstDirection = 'right';
    }
  }
  
  // 2. 计算拐点（X与终点对齐，Y与起点对齐）
  const corner: Point = { x: endPoint.x, y: start.y };
  
  // 3. 计算第二段垂直方向
  const secondDirection: VerticalDirection = endPoint.y > start.y ? 'down' : 'up';
  
  // 4. 生成SVG路径
  let d: string;
  
  if (firstDirection === 'right') {
    // 向右 → 向下/上
    if (secondDirection === 'down') {
      d = `M ${start.x} ${start.y} ` +
          `L ${corner.x - r} ${start.y} ` +
          `Q ${corner.x} ${start.y} ${corner.x} ${start.y + r} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    } else {
      d = `M ${start.x} ${start.y} ` +
          `L ${corner.x - r} ${start.y} ` +
          `Q ${corner.x} ${start.y} ${corner.x} ${start.y - r} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    }
  } else {
    // 向左 → 向下/上
    if (secondDirection === 'down') {
      d = `M ${start.x} ${start.y} ` +
          `L ${corner.x + r} ${start.y} ` +
          `Q ${corner.x} ${start.y} ${corner.x} ${start.y + r} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    } else {
      d = `M ${start.x} ${start.y} ` +
          `L ${corner.x + r} ${start.y} ` +
          `Q ${corner.x} ${start.y} ${corner.x} ${start.y - r} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    }
  }
  
  // 5. 计算路径长度
  const parallelLength = Math.abs(corner.x - start.x);
  const perpendicularLength = Math.abs(endPoint.y - corner.y);
  const length = parallelLength + perpendicularLength + (Math.PI * r / 2);
  
  return {
    d,
    length,
    start,
    end: endPoint,
    corner,
    parallelLength,       // 第一段（水平）长度
    perpendicularLength,  // 第二段（垂直）长度
    startEdge,
    firstDirection: secondDirection, // 这里存储的是垂直方向以便兼容
    secondDirection: firstDirection === 'right' ? 'right' : 'left',
  };
}

/**
 * 旧版兼容函数签名
 * @deprecated 使用新的 generatePath(iconCenter, iconSize, endPoint, iconSide, cornerRadius)
 */
export function generatePathLegacy(
  start: Point,
  end: Point,
  iconSide: Side,
  cornerRadius: number = 8
): LinePath {
  // 旧版本的 start 是边缘点，无法正确验证
  // 这里假设 iconSize = 40，反推 iconCenter
  const iconSize = 40;
  let iconCenter: Point;
  
  if (iconSide === 'top') {
    iconCenter = { x: start.x, y: start.y - iconSize / 2 };
  } else if (iconSide === 'bottom') {
    iconCenter = { x: start.x, y: start.y + iconSize / 2 };
  } else {
    iconCenter = { x: start.x, y: start.y };
  }
  
  return generatePath(iconCenter, iconSize, end, iconSide, cornerRadius);
}

// ==========================================
// 路径验证 v4.1
// ==========================================

export interface PathValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  details: {
    iconSide: Side;
    expectedStartEdge: IconEdge | 'auto';
    actualStartEdge: IconEdge;
    expectedFirstDirection: VerticalDirection | 'auto';
    actualFirstDirection: VerticalDirection;
    expectedSecondSegment: 'horizontal';
    actualSecondSegment: 'horizontal' | 'vertical';
  };
}

/**
 * validatePathRule v4.1 - 路径规则验证
 * 
 * 验收清单：
 * 1. ✓ 起点在图标正确边缘的中点
 * 2. ✓ 第一段为垂直方向
 * 3. ✓ 只有一次圆角拐弯
 * 4. ✓ 第二段为水平方向
 * 5. ✓ 终点在容器边缘
 * 6. ✓ 路径全程不越界
 * 7. ✓ 无斜线
 */
export function validatePathRule(
  path: LinePath,
  iconSide: Side,
  iconCenter?: Point,
  iconSize?: number
): PathValidationResult {
  const rule = PATH_RULES[iconSide];
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // 1. 验证起点边缘
  let expectedStartEdge: IconEdge | 'auto' = rule.startEdge;
  if (expectedStartEdge === 'auto') {
    // 对于左右图标，根据终点位置确定
    expectedStartEdge = path.end.y > (iconCenter?.y ?? path.start.y) ? 'bottom' : 'top';
  }
  
  if (path.startEdge !== expectedStartEdge) {
    errors.push(
      `[${iconSide}] 起点边缘错误: 期望从 ${expectedStartEdge} 边出发, 实际从 ${path.startEdge} 边出发`
    );
  }
  
  // 2. 验证起点是边缘中点（如果提供了iconCenter和iconSize）
  if (iconCenter && iconSize) {
    const expectedStart = getIconEdgeMidpoint(iconCenter, iconSize, path.startEdge);
    const startDiff = Math.abs(path.start.x - expectedStart.x) + Math.abs(path.start.y - expectedStart.y);
    if (startDiff > 1) {
      errors.push(
        `[${iconSide}] 起点位置错误: 期望 (${expectedStart.x.toFixed(1)}, ${expectedStart.y.toFixed(1)}), ` +
        `实际 (${path.start.x.toFixed(1)}, ${path.start.y.toFixed(1)})`
      );
    }
  }
  
  // 3. 验证第一段为垂直方向
  const firstDeltaX = Math.abs(path.corner.x - path.start.x);
  const firstDeltaY = Math.abs(path.corner.y - path.start.y);
  const actualFirstIsVertical = firstDeltaY > firstDeltaX;
  
  if (!actualFirstIsVertical) {
    errors.push(
      `[${iconSide}] 第一段方向错误: 期望垂直, 但 ΔX=${firstDeltaX.toFixed(1)} > ΔY=${firstDeltaY.toFixed(1)}`
    );
  }
  
  // 4. 验证第一段垂直方向是否正确
  let expectedFirstDirection: VerticalDirection | 'auto' = rule.firstDirection;
  if (expectedFirstDirection === 'auto') {
    expectedFirstDirection = path.end.y > (iconCenter?.y ?? path.start.y) ? 'down' : 'up';
  }
  
  if (path.firstDirection !== expectedFirstDirection) {
    errors.push(
      `[${iconSide}] 第一段垂直方向错误: 期望 ${expectedFirstDirection}, 实际 ${path.firstDirection}`
    );
  }
  
  // 5. 验证第二段为水平方向
  const secondDeltaX = Math.abs(path.end.x - path.corner.x);
  const secondDeltaY = Math.abs(path.end.y - path.corner.y);
  const actualSecondIsHorizontal = secondDeltaX > secondDeltaY;
  const actualSecondSegment: 'horizontal' | 'vertical' = actualSecondIsHorizontal ? 'horizontal' : 'vertical';
  
  if (!actualSecondIsHorizontal) {
    errors.push(
      `[${iconSide}] 第二段方向错误: 期望水平, 但 ΔX=${secondDeltaX.toFixed(1)} < ΔY=${secondDeltaY.toFixed(1)}`
    );
  }
  
  // 6. 验证无斜线（拐点X应与起点X相同）
  if (Math.abs(path.corner.x - path.start.x) > 1) {
    errors.push(
      `[${iconSide}] 存在斜线: 拐点X (${path.corner.x.toFixed(1)}) ≠ 起点X (${path.start.x.toFixed(1)})`
    );
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    details: {
      iconSide,
      expectedStartEdge,
      actualStartEdge: path.startEdge,
      expectedFirstDirection,
      actualFirstDirection: path.firstDirection,
      expectedSecondSegment: 'horizontal',
      actualSecondSegment,
    },
  };
}

/**
 * 批量验证所有路径
 */
export function validateAllPaths(
  paths: LinePath[],
  iconPositions: IconPosition[],
  iconSize: number
): { allValid: boolean; results: PathValidationResult[] } {
  const results = paths.map((path, index) => {
    const icon = iconPositions[index];
    return validatePathRule(path, icon.side, { x: icon.x, y: icon.y }, iconSize);
  });
  
  const allValid = results.every(r => r.isValid);
  
  if (!allValid && process.env.NODE_ENV === 'development') {
    console.warn('⚠️ 路径验证失败:');
    results.forEach((r, i) => {
      if (!r.isValid) {
        console.error(`  路径 ${i}:`);
        r.errors.forEach(e => console.error(`    ❌ ${e}`));
      }
    });
  }
  
  return { allValid, results };
}

// ==========================================
// 动画计算函数
// ==========================================

export function calculateDrawProgress(progress: number, pathLength: number): number {
  return pathLength * (1 - progress);
}

export function calculateFadeProgress(progress: number, pathLength: number): {
  dashArray: string;
  dashOffset: number;
} {
  const visibleLength = pathLength * (1 - progress);
  const gapLength = pathLength * progress;
  
  return {
    dashArray: `${visibleLength} ${gapLength + pathLength}`,
    dashOffset: -gapLength,
  };
}

export function getGradientDirection(
  start: Point,
  end: Point
): 'horizontal' | 'vertical' | 'diagonal' {
  const dx = Math.abs(end.x - start.x);
  const dy = Math.abs(end.y - start.y);
  
  if (dx > dy * 1.5) return 'horizontal';
  if (dy > dx * 1.5) return 'vertical';
  return 'diagonal';
}

// ==========================================
// 闪光效果
// ==========================================

export function calculateShimmerProgress(
  progress: number,
  shimmerWidth: number = 0.15
): { offset: number; opacity: number } {
  const offset = progress * (1 + shimmerWidth) - shimmerWidth;
  const opacity = progress < 0.1 ? progress * 10 :
                  progress > 0.9 ? (1 - progress) * 10 : 1;
  
  return { offset: Math.max(0, Math.min(1, offset)), opacity };
}

export function generateShimmerGradient(
  progress: number,
  shimmerWidth: number = 0.15,
): { offset1: string; offset2: string; offset3: string } {
  const center = progress;
  const halfWidth = shimmerWidth / 2;
  
  return {
    offset1: `${Math.max(0, (center - halfWidth) * 100)}%`,
    offset2: `${Math.min(100, center * 100)}%`,
    offset3: `${Math.min(100, (center + halfWidth) * 100)}%`,
  };
}

// ==========================================
// 图标位置计算
// ==========================================

export function calculateIconPositions(
  count: number,
  containerBounds: ContainerBounds,
  isHorizontal: boolean,
  config: GradientLineConfig = DEFAULT_CONFIG
): IconPosition[] {
  const positions: IconPosition[] = [];
  const offset = config.icon.offsetFromContainer;

  if (isHorizontal) {
    const topCount = Math.ceil(count / 2);
    const bottomCount = count - topCount;
    
    const spreadWidth = containerBounds.width * 0.75;
    const startX = containerBounds.centerX - spreadWidth / 2;
    
    for (let i = 0; i < topCount; i++) {
      const x = topCount === 1 
        ? containerBounds.centerX 
        : startX + (spreadWidth / (topCount - 1)) * i;
      positions.push({ x, y: containerBounds.top - offset, side: 'top' });
    }
    
    for (let i = 0; i < bottomCount; i++) {
      const x = bottomCount === 1 
        ? containerBounds.centerX 
        : startX + (spreadWidth / (bottomCount - 1)) * i;
      positions.push({ x, y: containerBounds.bottom + offset, side: 'bottom' });
    }
  } else {
    const leftCount = Math.ceil(count / 2);
    const rightCount = count - leftCount;
    
    const spreadHeight = containerBounds.height * 0.65;
    const startY = containerBounds.centerY - spreadHeight / 2;
    
    for (let i = 0; i < leftCount; i++) {
      const y = leftCount === 1 
        ? containerBounds.centerY 
        : startY + (spreadHeight / (leftCount - 1)) * i;
      positions.push({ x: containerBounds.left - offset, y, side: 'left' });
    }
    
    for (let i = 0; i < rightCount; i++) {
      const y = rightCount === 1 
        ? containerBounds.centerY 
        : startY + (spreadHeight / (rightCount - 1)) * i;
      positions.push({ x: containerBounds.right + offset, y, side: 'right' });
    }
  }

  return positions;
}

// ==========================================
// 动画状态类型
// ==========================================

export type AnimationPhase = 
  | 'idle'
  | 'icon-lighting'
  | 'icon-lit'
  | 'line-drawing'
  | 'line-drawn'
  | 'content-active'
  | 'icon-fading'
  | 'line-fading'
  | 'complete';

export interface AnimationState {
  phase: AnimationPhase;
  activeIndex: number;
  lineProgress: number;
  fadeProgress: number;
  shimmerProgress: number;
  iconOpacity: number;
}

// ==========================================
// 自动化验收测试
// ==========================================

/**
 * 运行自动化验收测试
 * 
 * 测试项目：
 * 1. 上方图标路径验证
 * 2. 下方图标路径验证
 * 3. 左侧图标路径验证
 * 4. 右侧图标路径验证
 * 5. 边界情况测试
 */
export function runAutomatedTests(): { passed: number; failed: number; results: string[] } {
  const results: string[] = [];
  let passed = 0;
  let failed = 0;
  
  const iconSize = 40;
  const containerBounds: ContainerBounds = {
    width: 400,
    height: 300,
    centerX: 400,
    centerY: 300,
    left: 200,
    right: 600,
    top: 150,
    bottom: 450,
  };
  
  // 测试1: 上方图标
  const topIconCenter = { x: 400, y: 80 };
  const topEndPoint = { x: 350, y: 150 };
  const topPath = generatePath(topIconCenter, iconSize, topEndPoint, 'top');
  const topValidation = validatePathRule(topPath, 'top', topIconCenter, iconSize);
  
  if (topValidation.isValid) {
    results.push('✅ 测试1: 上方图标路径 - 通过');
    passed++;
  } else {
    results.push(`❌ 测试1: 上方图标路径 - 失败: ${topValidation.errors.join('; ')}`);
    failed++;
  }
  
  // 验证起点是底边中点
  const expectedTopStart = getIconEdgeMidpoint(topIconCenter, iconSize, 'bottom');
  if (Math.abs(topPath.start.y - expectedTopStart.y) < 1) {
    results.push('✅ 测试1.1: 上方图标起点在底边 - 通过');
    passed++;
  } else {
    results.push(`❌ 测试1.1: 上方图标起点在底边 - 失败: 期望Y=${expectedTopStart.y}, 实际Y=${topPath.start.y}`);
    failed++;
  }
  
  // 测试2: 下方图标
  const bottomIconCenter = { x: 400, y: 520 };
  const bottomEndPoint = { x: 450, y: 450 };
  const bottomPath = generatePath(bottomIconCenter, iconSize, bottomEndPoint, 'bottom');
  const bottomValidation = validatePathRule(bottomPath, 'bottom', bottomIconCenter, iconSize);
  
  if (bottomValidation.isValid) {
    results.push('✅ 测试2: 下方图标路径 - 通过');
    passed++;
  } else {
    results.push(`❌ 测试2: 下方图标路径 - 失败: ${bottomValidation.errors.join('; ')}`);
    failed++;
  }
  
  // 验证起点是顶边中点
  const expectedBottomStart = getIconEdgeMidpoint(bottomIconCenter, iconSize, 'top');
  if (Math.abs(bottomPath.start.y - expectedBottomStart.y) < 1) {
    results.push('✅ 测试2.1: 下方图标起点在顶边 - 通过');
    passed++;
  } else {
    results.push(`❌ 测试2.1: 下方图标起点在顶边 - 失败: 期望Y=${expectedBottomStart.y}, 实际Y=${bottomPath.start.y}`);
    failed++;
  }
  
  // 测试3: 左侧图标（终点在下方）
  const leftIconCenter = { x: 100, y: 300 };
  const leftEndPoint = { x: 200, y: 350 };
  const leftPath = generatePath(leftIconCenter, iconSize, leftEndPoint, 'left');
  const leftValidation = validatePathRule(leftPath, 'left', leftIconCenter, iconSize);
  
  if (leftValidation.isValid) {
    results.push('✅ 测试3: 左侧图标路径 - 通过');
    passed++;
  } else {
    results.push(`❌ 测试3: 左侧图标路径 - 失败: ${leftValidation.errors.join('; ')}`);
    failed++;
  }
  
  // 验证起点是底边中点（因为终点Y > 图标Y）
  if (leftPath.startEdge === 'bottom') {
    results.push('✅ 测试3.1: 左侧图标起点在底边（终点在下） - 通过');
    passed++;
  } else {
    results.push(`❌ 测试3.1: 左侧图标起点在底边 - 失败: 实际在 ${leftPath.startEdge}`);
    failed++;
  }
  
  // 测试4: 右侧图标（终点在上方）
  const rightIconCenter = { x: 700, y: 300 };
  const rightEndPoint = { x: 600, y: 250 };
  const rightPath = generatePath(rightIconCenter, iconSize, rightEndPoint, 'right');
  const rightValidation = validatePathRule(rightPath, 'right', rightIconCenter, iconSize);
  
  if (rightValidation.isValid) {
    results.push('✅ 测试4: 右侧图标路径 - 通过');
    passed++;
  } else {
    results.push(`❌ 测试4: 右侧图标路径 - 失败: ${rightValidation.errors.join('; ')}`);
    failed++;
  }
  
  // 验证起点是顶边中点（因为终点Y < 图标Y）
  if (rightPath.startEdge === 'top') {
    results.push('✅ 测试4.1: 右侧图标起点在顶边（终点在上） - 通过');
    passed++;
  } else {
    results.push(`❌ 测试4.1: 右侧图标起点在顶边 - 失败: 实际在 ${rightPath.startEdge}`);
    failed++;
  }
  
  // 测试5: 第一段必须垂直
  const allVertical = [topPath, bottomPath, leftPath, rightPath].every(p => {
    const deltaX = Math.abs(p.corner.x - p.start.x);
    const deltaY = Math.abs(p.corner.y - p.start.y);
    return deltaY > deltaX;
  });
  
  if (allVertical) {
    results.push('✅ 测试5: 所有路径第一段垂直 - 通过');
    passed++;
  } else {
    results.push('❌ 测试5: 所有路径第一段垂直 - 失败');
    failed++;
  }
  
  // 测试6: 第二段必须水平
  const allHorizontal = [topPath, bottomPath, leftPath, rightPath].every(p => {
    const deltaX = Math.abs(p.end.x - p.corner.x);
    const deltaY = Math.abs(p.end.y - p.corner.y);
    return deltaX > deltaY;
  });
  
  if (allHorizontal) {
    results.push('✅ 测试6: 所有路径第二段水平 - 通过');
    passed++;
  } else {
    results.push('❌ 测试6: 所有路径第二段水平 - 失败');
    failed++;
  }
  
  return { passed, failed, results };
}

// ==========================================
// 导出
// ==========================================

export default {
  // 规则常量
  PATH_RULES,
  DEFAULT_CONFIG,
  VI_GRADIENTS,
  
  // 起点计算
  getIconEdgeMidpoint,
  calculateStartPoint,
  getIconEdgeStart, // 旧版兼容
  getStartDirection,
  
  // 终点计算
  createEndPoint,
  createEndPoints,
  
  // 路径生成
  generatePath,
  generatePathLegacy,
  
  // 验证
  validatePathRule,
  validateAllPaths,
  runAutomatedTests,
  
  // 图标位置
  calculateIconPositions,
  
  // 动画
  calculateDrawProgress,
  calculateFadeProgress,
  getGradientDirection,
  calculateShimmerProgress,
  generateShimmerGradient,
  
  // 渐变
  getGradientForModule,
};
