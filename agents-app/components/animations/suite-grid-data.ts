/**
 * ==========================================
 * 套件网格动画数据定义 v6.1
 * ==========================================
 * 
 * 【里程碑】模块化AI解决方案动画数据 - 2024年完成
 * 
 * 【核心设计原则】
 * 1. 画布尺寸：540px × 540px（正方形画布）
 * 2. 6列网格，5个横向间隔，每个间隔8px
 * 3. 列中心坐标：41, 131, 221, 311, 401, 491
 * 4. 图标尺寸：82px × 82px（单元格）
 * 5. 图标内部：48px × 48px，strokeWidth 2px
 * 6. 每个图标具备 4 个出发边：top/bottom/left/right
 * 7. 每条连线使用不同的出发边，路径为无斜线的折线
 * 
 * 【v6.1 关键更新 - 三段式脉冲动画 + 精细图标】
 * 
 * 动画流程（每套件 4 秒）：
 * 1. Agent 激活 (0-8%)：上浮+白底+阴影
 * 2. 起点色线绘制 (8-20%)：从 Agent 向 Product 画出
 * 3. Product 点亮 (18-28%)：被线点亮后保持常亮
 * 4. 终点色脉冲 (28-40%)：终点色从 Agent 冲向 Product
 * 5. 起点色追终点色 (40-52%)：起点色追着终点色 + Agent 熄灭
 * 6. 线条熄灭 (52-68%)：从起点向终点消失（dashoffset）
 * 7. Product 熄灭 (70-90%)
 * 8. 过渡 (90-100%)
 * 
 * 【VI 反差渐变配色】
 * - 服务设计：蓝→绿 (#0070FF → #12B98A) gradient-blue-green
 * - 运营管理：绿→金 (#12B98A → #F59E0B) gradient-green-gold
 * - 质量评估：紫→粉 (#9333EA → #EC4899) gradient-purple-pink
 * - 复盘优化：蓝→紫 (#0070FF → #9333EA) gradient-blue-purple
 * 
 * 【图标视觉规格】
 * - 激活状态：白色背景 + 1px #e5e7eb 边框 + 上浮4px + 阴影
 * - 非激活状态：透明背景 + 1px #d1d5db 边框
 * - 产品名称：10px，黑色 #1f2937，激活时显示
 * - 内部图标：48x48 viewBox，2px strokeWidth
 * 
 * 【线条光泽效果】
 * - 光晕层：4px/6px（脉冲时），25% 透明度，3px 模糊
 * - 主线层：2px/2.5px（脉冲时），100% 透明度
 * 
 * 【路径规则 PATH_RULES v4.1】
 * - 若出发端为 top/bottom，第一段垂直、第二段水平
 * - 若出发端为 left/right，第一段水平、第二段垂直
 * - 圆角拐点：8px
 * - 绝不产生斜线！
 * 
 * 【4个套件及其连接】
 * - suite1 服务设计：A1 → P1_space, P2_config, P0_api
 * - suite2 运营管理：A2 → P3_ssr, P4_ticket, P5_collab
 * - suite3 质量评估：A3 → P7_inspect（仅1个）
 * - suite4 复盘优化：A4 → P9_salary, P10_dashboard, API
 * 
 * @version 6.1
 * @author AI Assistant
 */

import { GUIDES, UNIFIED_PADDING } from '@hp/lib/gradient-line';

// ==========================================
// 类型定义
// ==========================================

export type Side = 'top' | 'bottom' | 'left' | 'right';

export interface SuiteIconPosition {
  id: string;
  x: number;
  y: number;
  name: string;
  type: 'agent' | 'product' | 'api';
  icon?: string;
  color?: string;
}

export interface SuiteConnection {
  id: string;
  name: string;
  agentId: string;
  productIds: string[];
  color: { start: string; end: string };
}

/**
 * 连线路径定义
 * 指定每条连线的起点边和终点边
 */
export interface ConnectionRoute {
  from: string;      // 起点图标ID
  fromPort: Side;    // 起点边 (T/B/L/R)
  to: string;        // 终点图标ID
  toPort: Side;      // 终点边 (T/B/L/R)
}

// ==========================================
// 画布和精确网格配置 v4.0
// ==========================================

/**
 * 画布配置
 */
export const SUITE_CANVAS = {
  width: 540,   // 固定宽度 540px
  height: 540,  // 固定高度 540px（与宽度相同，正方形画布）
  padding: UNIFIED_PADDING, // 12px
} as const;

/**
 * 精确的6列网格系统 v6.0 - 用户确认版
 * 
 * 【用户确认的规则】
 * - 方块尺寸：82px
 * - 间距：8px  
 * - 总宽度：6 × 82 + 5 × 8 = 532px
 * - 画布宽度：540px
 * 
 * 【G3/G4/G5 对齐规则】
 * - 列0 左边缘 = 0 = G3
 * - 列3 左边缘 = 3 × (82 + 8) = 270 = G4 ✓
 * - 列5 右边缘 = 532，与 G5(540) 间距 = 8px ✓
 * 
 * 【列/行中心坐标】
 * - 列0: 41px,  列1: 131px, 列2: 221px
 * - 列3: 311px, 列4: 401px, 列5: 491px
 */
export const GRID = {
  cols: 6,
  rows: 6,
  gap: 8,              // 间距 8px
  cellSize: 82,        // 方块尺寸 82px
  
  // 基础计算值
  get colWidth(): number {
    return this.cellSize; // 82px
  },
  
  get rowHeight(): number {
    return this.cellSize; // 82px
  },
  
  get totalGapWidth(): number {
    return (this.cols - 1) * this.gap; // 5 × 8 = 40px
  },
  
  get totalGapHeight(): number {
    return (this.rows - 1) * this.gap; // 5 × 8 = 40px
  },
  
  get gridWidth(): number {
    return this.cols * this.cellSize + this.totalGapWidth; // 532px
  },
  
  get gridHeight(): number {
    return this.rows * this.cellSize + this.totalGapHeight; // 532px
  },
  
  /**
   * 获取列中心 X 坐标
   * @param col 列号（0-5）
   * @returns X 坐标
   * 
   * 计算：列左边缘 + 方块宽度/2
   * 列左边缘 = col × (82 + 8) = col × 90
   * 列中心 = col × 90 + 41
   */
  colCenter(col: number): number {
    return col * (this.cellSize + this.gap) + this.cellSize / 2;
  },
  
  /**
   * 获取行中心 Y 坐标
   * @param row 行号（0-5）
   * @returns Y 坐标
   */
  rowCenter(row: number): number {
    return row * (this.cellSize + this.gap) + this.cellSize / 2;
  },
  
  /**
   * 获取列左边缘 X 坐标
   */
  colLeft(col: number): number {
    return col * (this.cellSize + this.gap);
  },
  
  /**
   * 获取列右边缘 X 坐标
   */
  colRight(col: number): number {
    return this.colLeft(col) + this.cellSize;
  },
  
  /**
   * 获取行顶边缘 Y 坐标
   */
  rowTop(row: number): number {
    return row * (this.cellSize + this.gap);
  },
  
  /**
   * 获取行底边缘 Y 坐标
   */
  rowBottom(row: number): number {
    return this.rowTop(row) + this.cellSize;
  },
} as const;

// ==========================================
// 图标配置
// ==========================================

export const ANIMATION_CONFIG = {
  suiteDuration: 4000,  // 每个套件 4 秒（加快整体节奏）
  
  /**
   * 动画阶段时间点 v3.1 - 线路动画加快，图标动画保持
   * 
   * 完整流程：
   * 1. Agent 激活（保持原速度）
   * 2. 蓝色线绘制 - 加快
   * 3. Product 点亮（保持原速度）
   * 4. 绿色脉冲发出 - 加快
   * 5. 蓝色再次发出 - 加快，Agent 开始熄灭
   * 6. 线条熄灭 - 加快
   * 7. Product 熄灭（保持原速度）
   */
  phases: {
    agentActivate: { start: 0, end: 0.08 },        // Agent 激活（保持）
    linesDrawing: { start: 0.08, end: 0.20 },      // 蓝色线绘制（加快：12%）
    productsActivate: { start: 0.18, end: 0.28 },  // Product 点亮（保持）
    pulse1: { start: 0.28, end: 0.40 },            // 绿色脉冲（加快：12%）
    pulse2: { start: 0.40, end: 0.52 },            // 蓝色追绿色（加快：12%）
    linesFading: { start: 0.52, end: 0.68 },       // 线条熄灭（加快：16%）
    productsDeactivate: { start: 0.70, end: 0.90 }, // Product 熄灭（保持）
    transition: { start: 0.90, end: 1.0 },         // 过渡
  },
  
  // 图标尺寸 - 用户确认规范 v6.0
  // 方块尺寸：82px
  // 点亮前：48px 图标无名称
  // 点亮后：彩色图标 + 名称
  cellSize: 82,        // 方块尺寸 82px（与 GRID.cellSize 一致）
  iconSize: 48,        // 默认图标尺寸 48px（点亮前）
  iconSizeActive: 48,  // 激活图标尺寸 48px（保持一致）
  
  // 连线参数
  lineWidth: 2,
  cornerRadius: 8,
  
  // 连线最小延伸距离（避免连线太短）
  minExtension: 20,
} as const;

// ==========================================
// 图标位置定义 v6.0 - 用户确认版
// ==========================================

/**
 * 图标位置布局 v6.0 - 用户手动确认的精确布局
 * 
 * 【重要】此布局由用户人工排布并确认，禁止自动修改！
 * 
 * 【设计规范】
 * - 画布 540px × 540px，6列6行网格
 * - 列宽 ≈ 83.3px，间距 8px
 * - 图标尺寸 80px（激活时 82px）
 * - 共 15 个图标：1 API + 4 Agent + 10 Product
 * 
 * 【用户确认的布局坐标 (列, 行)】
 * - (1, 3) - API平台
 * - (2, 2) - A1 服务设计Agent
 * - (0, 2) - P1_space 空间管理系统  
 * - (3, 0) - P2_config 服务配置系统
 * - (3, 3) - A2 运营管理Agent
 * - (2, 1) - P3_ssr SSR服务记录系统
 * - (0, 4) - P4_ticket 工单调度系统
 * - (5, 5) - P5_collab 人机调度引擎
 * - (4, 2) - A3 质量评估Agent
 * - (4, 3) - P6_device 设备管理系统
 * - (5, 1) - P7_inspect 多模态质检系统
 * - (1, 1) - P8_assistant 小智帮手
 * - (2, 5) - A4 复盘优化Agent
 * - (2, 3) - P9_salary 计薪系统
 * - (4, 5) - P10_dashboard 数据大屏系统
 * 
 * 【网格坐标系】
 * - 列：0-5（左到右）
 * - 行：0-5（上到下）
 */
export const SUITE_ICON_POSITIONS: Record<string, SuiteIconPosition> = {
  // ===== API 平台 (1, 3) =====
  // API 属于 suite4，使用 suite4 的蓝色 #0070FF
  API: { 
    id: 'API', 
    x: GRID.colCenter(1),     // 列1
    y: GRID.rowCenter(3),     // 行3
    name: 'API平台', 
    type: 'api', 
    icon: 'api',
    color: '#0070FF',  // 蓝色 - 与 suite4 一致
  },
  
  // ========================================
  // Agent 1：服务设计套件
  // A1 (2, 2), P1_space (0, 2), P2_config (3, 0)
  // 路径: A1.R→P2.B, A1.L→P1.R
  // ========================================
  A1: { 
    id: 'A1', 
    x: GRID.colCenter(2),     // 列2
    y: GRID.rowCenter(2),     // 行2
    name: '服务设计Agent', 
    type: 'agent', 
    icon: 'agentDesign',
    color: '#0070FF',
  },
  P1_space: { 
    id: 'P1_space', 
    x: GRID.colCenter(0),     // 列0
    y: GRID.rowCenter(2),     // 行2
    name: '空间管理系统', 
    type: 'product', 
    icon: 'space',
  },
  P2_config: { 
    id: 'P2_config', 
    x: GRID.colCenter(3),     // 列3
    y: GRID.rowCenter(0),     // 行0
    name: '服务配置系统', 
    type: 'product', 
    icon: 'serviceConfig',
  },
  
  // ========================================
  // Agent 2：运营管理套件
  // A2 (3, 4), P3_ssr (2, 1), P4_ticket (0, 4), P5_collab (5, 5)
  // 路径: A2.T→P3.R, A2.L→P4.R, A2.R→P5.T
  // ========================================
  A2: { 
    id: 'A2', 
    x: GRID.colCenter(3),     // 列3
    y: GRID.rowCenter(4),     // 行4 (从行3移到行4)
    name: '运营管理Agent', 
    type: 'agent', 
    icon: 'agentOps',
    color: '#10B981',
  },
  P3_ssr: { 
    id: 'P3_ssr', 
    x: GRID.colCenter(2),     // 列2
    y: GRID.rowCenter(1),     // 行1
    name: 'SSR服务记录', 
    type: 'product', 
    icon: 'ssr',
  },
  P4_ticket: { 
    id: 'P4_ticket', 
    x: GRID.colCenter(0),     // 列0
    y: GRID.rowCenter(4),     // 行4
    name: '智能工单系统', 
    type: 'product', 
    icon: 'ticket',
  },
  P5_collab: { 
    id: 'P5_collab', 
    x: GRID.colCenter(5),     // 列5
    y: GRID.rowCenter(5),     // 行5
    name: '人机调度引擎', 
    type: 'product', 
    icon: 'collaboration',
  },
  
  // ========================================
  // Agent 3：质量评估套件
  // A3 (4, 3), P6_device (4, 0), P7_inspect (5, 1), P8_assistant (1, 1)
  // 路径: A3.T→P7.L (只连P7)
  // ========================================
  A3: { 
    id: 'A3', 
    x: GRID.colCenter(4),     // 列4
    y: GRID.rowCenter(3),     // 行3 (从行2移到行3)
    name: '质量评估Agent', 
    type: 'agent', 
    icon: 'agentQuality',
    color: '#8B5CF6',
  },
  P6_device: { 
    id: 'P6_device', 
    x: GRID.colCenter(4),     // 列4 (从列5移到列4)
    y: GRID.rowCenter(0),     // 行0 (从行3移到行0)
    name: '设备管理系统', 
    type: 'product', 
    icon: 'device',
  },
  P7_inspect: { 
    id: 'P7_inspect', 
    x: GRID.colCenter(5),     // 列5
    y: GRID.rowCenter(1),     // 行1
    name: '多模态质检系统', 
    type: 'product', 
    icon: 'inspect',
  },
  P8_assistant: { 
    id: 'P8_assistant', 
    x: GRID.colCenter(1),     // 列1
    y: GRID.rowCenter(1),     // 行1
    name: '小智帮手', 
    type: 'product', 
    icon: 'assistant',
  },
  
  // ========================================
  // Agent 4：复盘优化套件
  // A4 (2, 5), P9_salary (2, 3), P10_dashboard (4, 5)
  // 路径: A4.L→API.B, A4.T→P9.B, A4.R→P10.L
  // ========================================
  A4: { 
    id: 'A4', 
    x: GRID.colCenter(2),     // 列2
    y: GRID.rowCenter(5),     // 行5
    name: '复盘优化Agent', 
    type: 'agent', 
    icon: 'agentReview',
    color: '#F59E0B',
  },
  P9_salary: { 
    id: 'P9_salary', 
    x: GRID.colCenter(2),     // 列2
    y: GRID.rowCenter(3),     // 行3
    name: '计薪系统', 
    type: 'product', 
    icon: 'salary',
  },
  P10_dashboard: { 
    id: 'P10_dashboard', 
    x: GRID.colCenter(4),     // 列4
    y: GRID.rowCenter(5),     // 行5
    name: '数据大屏系统', 
    type: 'product', 
    icon: 'dashboard',
  },
};

// ==========================================
// 套件连接定义
// ==========================================

/**
 * 套件连接定义 - 使用 VI 手册六大核心渐变（有色差的反差渐变）
 * 
 * VI 渐变规则：
 * - gradient-blue-green: 蓝色 #0070FF → 绿色 #12B98A
 * - gradient-blue-purple: 蓝色 #0070FF → 紫色 #9333EA
 * - gradient-purple-pink: 紫色 #9333EA → 粉色 #EC4899
 * - gradient-green-gold: 绿色 #12B98A → 金色 #F59E0B
 * - gradient-pink-gold: 粉色 #EC4899 → 金色 #F59E0B
 * - gradient-blue-gold: 蓝色 #0070FF → 金色 #F59E0B
 */
export const SUITE_CONNECTIONS: SuiteConnection[] = [
  {
    id: 'suite1',
    name: '服务设计套件',
    agentId: 'A1',
    productIds: ['P1_space', 'P2_config'],
    color: { start: '#0070FF', end: '#12B98A' },  // 蓝→绿 (blue-green)
  },
  {
    id: 'suite2',
    name: '运营管理套件',
    agentId: 'A2',
    productIds: ['P3_ssr', 'P4_ticket', 'P5_collab'],
    color: { start: '#12B98A', end: '#F59E0B' },  // 绿→金 (green-gold)
  },
  {
    id: 'suite3',
    name: '质量评估套件',
    agentId: 'A3',
    productIds: ['P7_inspect'],  // 只连接 P7，P6 和 P8 不连线
    color: { start: '#9333EA', end: '#EC4899' },  // 紫→粉 (purple-pink)
  },
  {
    id: 'suite4',
    name: '复盘优化套件',
    agentId: 'A4',
    productIds: ['P9_salary', 'P10_dashboard', 'API'],  // 包含 API 开放平台
    color: { start: '#0070FF', end: '#9333EA' },  // 蓝→紫 (blue-purple)
  },
];

// ==========================================
// 连线路径规则定义 v6.1 - 用户确认版
// ==========================================

/**
 * 所有连线的起点和终点规则
 * 
 * 【设计原则】
 * - 路径上完全没有任何遮挡
 * - 每条连线使用不同的出发边
 * - 避免路径交叉
 * 
 * 【命名规则】
 * - T = Top (顶部中点)
 * - B = Bottom (底部中点)
 * - L = Left (左侧中点)
 * - R = Right (右侧中点)
 */
export const CONNECTION_ROUTES: ConnectionRoute[] = [
  // === Suite 1: 服务设计套件 ===
  // A1 (2,2) → P2_config (3,0): A1.R → P2.B
  { from: 'A1', fromPort: 'right', to: 'P2_config', toPort: 'bottom' },
  // A1 (2,2) → P1_space (0,2): A1.L → P1.R
  { from: 'A1', fromPort: 'left', to: 'P1_space', toPort: 'right' },
  
  // === Suite 2: 运营管理套件 ===
  // A2 (3,4) → P3_ssr (2,1): A2.T → P3.R
  { from: 'A2', fromPort: 'top', to: 'P3_ssr', toPort: 'right' },
  // A2 (3,4) → P4_ticket (0,4): A2.L → P4.R
  { from: 'A2', fromPort: 'left', to: 'P4_ticket', toPort: 'right' },
  // A2 (3,4) → P5_collab (5,5): A2.R → P5.T
  { from: 'A2', fromPort: 'right', to: 'P5_collab', toPort: 'top' },
  
  // === Suite 3: 质量评估套件 ===
  // A3 (4,3) → P7_inspect (5,1): A3.T → P7.L (P7在A3右上方)
  { from: 'A3', fromPort: 'top', to: 'P7_inspect', toPort: 'left' },
  // 注意: P6_device 和 P8_assistant 不连线
  
  // === Suite 4: 复盘优化套件 ===
  // A4 (2,5) → API (1,3): A4.L → API.B
  { from: 'A4', fromPort: 'left', to: 'API', toPort: 'bottom' },
  // A4 (2,5) → P9_salary (2,3): A4.T → P9.B
  { from: 'A4', fromPort: 'top', to: 'P9_salary', toPort: 'bottom' },
  // A4 (2,5) → P10_dashboard (4,5): A4.R → P10.L
  { from: 'A4', fromPort: 'right', to: 'P10_dashboard', toPort: 'left' },
];

/**
 * 根据图标ID和边获取端点坐标
 */
export function getPortPosition(iconId: string, port: Side): { x: number; y: number } {
  const pos = SUITE_ICON_POSITIONS[iconId];
  if (!pos) {
    console.error(`Icon not found: ${iconId}`);
    return { x: 0, y: 0 };
  }
  
  const halfSize = GRID.cellSize / 2; // 41px
  
  switch (port) {
    case 'top':
      return { x: pos.x, y: pos.y - halfSize };
    case 'bottom':
      return { x: pos.x, y: pos.y + halfSize };
    case 'left':
      return { x: pos.x - halfSize, y: pos.y };
    case 'right':
      return { x: pos.x + halfSize, y: pos.y };
  }
}

/**
 * 根据连线路径规则获取指定套件的所有路径
 */
export function getRoutesForSuite(suiteId: string): ConnectionRoute[] {
  const suite = SUITE_CONNECTIONS.find(s => s.id === suiteId);
  if (!suite) return [];
  
  return CONNECTION_ROUTES.filter(route => route.from === suite.agentId);
}

// ==========================================
// 装饰图标位置
// ==========================================

/**
 * 装饰图标位置 v4.0
 * 
 * 放置在图标之间的空隙中，避免与 80px 大图标重叠
 * 使用 0.5 偏移放在列/行之间的间隙
 */
export const DECORATION_POSITIONS: Array<{ 
  x: number; 
  y: number; 
  shape: 'circle' | 'square' | 'hexagon' | 'triangle';
  size?: number;
}> = [
  // 顶部装饰（第1行与第0行之间）
  { x: GRID.colCenter(1), y: GRID.rowCenter(0.5), shape: 'circle', size: 24 },
  { x: GRID.colCenter(4), y: GRID.rowCenter(0), shape: 'hexagon', size: 24 },
  
  // 中部装饰（列之间的空隙）
  { x: GRID.colCenter(1.5), y: GRID.rowCenter(1.5), shape: 'square', size: 20 },
  { x: GRID.colCenter(2.5), y: GRID.rowCenter(3), shape: 'triangle', size: 20 },
  
  // 底部装饰
  { x: GRID.colCenter(1.5), y: GRID.rowCenter(2.5), shape: 'circle', size: 18 },
  { x: GRID.colCenter(4.5), y: GRID.rowCenter(3.5), shape: 'hexagon', size: 20 },
  { x: GRID.colCenter(0.5), y: GRID.rowCenter(4.5), shape: 'square', size: 18 },
];

// ==========================================
// 连线路径数据结构
// ==========================================

export interface ConnectionPath {
  d: string;                              // SVG path d 属性
  length: number;                         // 路径总长度（用于动画）
  agentPort: Side;                        // Agent 出发边
  productPort: Side;                      // Product 进入边
  startPoint: { x: number; y: number };   // 起点坐标
  endPoint: { x: number; y: number };     // 终点坐标
  cornerPoint: { x: number; y: number };  // 拐点坐标
}

// ==========================================
// 核心函数：智能选择 Agent 出发边
// ==========================================

/**
 * 出发边选择策略 v5.0
 * 
 * 【设计原则】
 * 1. 每条连线使用不同的出发边（4边最多连3个产品）
 * 2. 根据产品相对位置选择最佳出发边
 * 3. 避免路径交叉和重叠
 * 4. 确保起点在边框中点
 * 
 * 【优先级规则】
 * - 产品在下方：bottom > right > left > top
 * - 产品在上方：top > right > left > bottom
 * - 产品在左方：left > bottom > top > right
 * - 产品在右方：right > bottom > top > left
 * - 产品在同列（纯垂直方向）：bottom/top > left > right
 * - 产品在同行（纯水平方向）：left/right > bottom > top
 */
export function selectAgentPort(
  agentPos: { x: number; y: number },
  productPos: { x: number; y: number },
  usedPorts: Set<Side>
): Side {
  const dx = productPos.x - agentPos.x;
  const dy = productPos.y - agentPos.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  
  // 生成优先级列表
  const priorities: Side[] = [];
  
  // 判断主要方向
  const isMainlyVertical = absDy > absDx * 1.5;   // 垂直方向为主
  const isMainlyHorizontal = absDx > absDy * 1.5; // 水平方向为主
  const isSameColumn = absDx < 10;                 // 几乎同列
  const isSameRow = absDy < 10;                    // 几乎同行
  
  if (isSameColumn) {
    // 同列：优先使用垂直方向
    if (dy > 0) {
      priorities.push('bottom', 'right', 'left', 'top');
    } else {
      priorities.push('top', 'right', 'left', 'bottom');
    }
  } else if (isSameRow) {
    // 同行：优先使用水平方向
    if (dx > 0) {
      priorities.push('right', 'bottom', 'top', 'left');
    } else {
      priorities.push('left', 'bottom', 'top', 'right');
    }
  } else if (isMainlyVertical) {
    // 垂直方向为主
    if (dy > 0) {
      priorities.push('bottom');
      if (dx > 0) priorities.push('right', 'left');
      else priorities.push('left', 'right');
      priorities.push('top');
    } else {
      priorities.push('top');
      if (dx > 0) priorities.push('right', 'left');
      else priorities.push('left', 'right');
      priorities.push('bottom');
    }
  } else if (isMainlyHorizontal) {
    // 水平方向为主
    if (dx > 0) {
      priorities.push('right');
      if (dy > 0) priorities.push('bottom', 'top');
      else priorities.push('top', 'bottom');
      priorities.push('left');
    } else {
      priorities.push('left');
      if (dy > 0) priorities.push('bottom', 'top');
      else priorities.push('top', 'bottom');
      priorities.push('right');
    }
  } else {
    // 斜向方向：根据象限选择最佳出发边
    if (dx > 0 && dy > 0) {
      // 右下方
      priorities.push('bottom', 'right', 'left', 'top');
    } else if (dx > 0 && dy < 0) {
      // 右上方
      priorities.push('top', 'right', 'left', 'bottom');
    } else if (dx < 0 && dy > 0) {
      // 左下方
      priorities.push('bottom', 'left', 'right', 'top');
    } else {
      // 左上方
      priorities.push('top', 'left', 'right', 'bottom');
    }
  }
  
  // 选择第一个未被使用的端口
  for (const port of priorities) {
    if (!usedPorts.has(port)) {
      return port;
    }
  }
  
  // 兜底：返回列表中的第一个（理论上不会发生，因为4边最多3个产品）
  console.warn('所有端口都被占用，使用默认端口');
  return priorities[0];
}

/**
 * 根据 Agent 出发边和产品相对位置，选择产品的接收边
 * 
 * 规则（遵循 PATH_RULES v4.1）：
 * - 从 top/bottom 出发：第一段垂直，第二段水平 → 产品从 left/right 进入
 * - 从 left/right 出发：第一段水平，第二段垂直 → 产品从 top/bottom 进入
 */
export function selectProductPort(
  agentPort: Side,
  agentPos: { x: number; y: number },
  productPos: { x: number; y: number }
): Side {
  const dx = productPos.x - agentPos.x;
  const dy = productPos.y - agentPos.y;
  
  if (agentPort === 'top' || agentPort === 'bottom') {
    // 垂直出发 → 水平进入产品
    return dx >= 0 ? 'left' : 'right';
  } else {
    // 水平出发 → 垂直进入产品
    return dy >= 0 ? 'top' : 'bottom';
  }
}

// ==========================================
// 核心函数：计算连线路径
// ==========================================

/**
 * 计算从 Agent 到产品的连线路径
 * 
 * 路径规则（PATH_RULES v4.1）：
 * 1. 从 top/bottom 出发：
 *    - 第一段：垂直移动
 *    - 拐点：圆角转弯
 *    - 第二段：水平移动到产品
 * 
 * 2. 从 left/right 出发：
 *    - 第一段：水平移动
 *    - 拐点：圆角转弯
 *    - 第二段：垂直移动到产品
 * 
 * 注意：绝不产生斜线！
 */
export function calculateConnectionPath(
  agentPos: { x: number; y: number },
  productPos: { x: number; y: number },
  agentPort: Side,
  iconSize: number = ANIMATION_CONFIG.iconSize,
  cornerRadius: number = ANIMATION_CONFIG.cornerRadius
): ConnectionPath {
  const halfIcon = iconSize / 2;
  const r = cornerRadius;
  const minExt = ANIMATION_CONFIG.minExtension;
  
  // 1. 计算起点（Agent 边缘中点）
  let startPoint: { x: number; y: number };
  switch (agentPort) {
    case 'top':
      startPoint = { x: agentPos.x, y: agentPos.y - halfIcon };
      break;
    case 'bottom':
      startPoint = { x: agentPos.x, y: agentPos.y + halfIcon };
      break;
    case 'left':
      startPoint = { x: agentPos.x - halfIcon, y: agentPos.y };
      break;
    case 'right':
      startPoint = { x: agentPos.x + halfIcon, y: agentPos.y };
      break;
  }
  
  // 2. 确定产品接收边
  const productPort = selectProductPort(agentPort, agentPos, productPos);
  
  // 3. 计算终点（产品边缘中点）
  let endPoint: { x: number; y: number };
  switch (productPort) {
    case 'top':
      endPoint = { x: productPos.x, y: productPos.y - halfIcon };
      break;
    case 'bottom':
      endPoint = { x: productPos.x, y: productPos.y + halfIcon };
      break;
    case 'left':
      endPoint = { x: productPos.x - halfIcon, y: productPos.y };
      break;
    case 'right':
      endPoint = { x: productPos.x + halfIcon, y: productPos.y };
      break;
  }
  
  // 4. 计算拐点和路径
  let cornerPoint: { x: number; y: number };
  let d: string;
  let length: number;
  
  if (agentPort === 'top' || agentPort === 'bottom') {
    // 从 top/bottom 出发：第一段垂直，第二段水平
    cornerPoint = {
      x: startPoint.x,  // X 与起点相同
      y: endPoint.y,    // Y 与终点相同
    };
    
    const verticalLength = Math.abs(cornerPoint.y - startPoint.y);
    const horizontalLength = Math.abs(endPoint.x - cornerPoint.x);
    
    // 处理路径过短的情况
    if (verticalLength < 5 || horizontalLength < 5) {
      // 直接画直线
      d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
      length = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
    } else {
      const actualRadius = Math.min(r, verticalLength / 2, horizontalLength / 2, 8);
      // 关键：使用实际移动方向
      const movingDown = endPoint.y > startPoint.y;
      const movingRight = endPoint.x > startPoint.x;
      
      if (movingDown) {
        // 向下移动：拐点在终点上方
        const cornerY = cornerPoint.y - actualRadius;
        const afterCornerX = cornerPoint.x + (movingRight ? actualRadius : -actualRadius);
        
        d = `M ${startPoint.x} ${startPoint.y} ` +
            `L ${startPoint.x} ${cornerY} ` +
            `Q ${cornerPoint.x} ${cornerPoint.y} ${afterCornerX} ${cornerPoint.y} ` +
            `L ${endPoint.x} ${endPoint.y}`;
      } else {
        // 向上移动：拐点在终点下方
        const cornerY = cornerPoint.y + actualRadius;
        const afterCornerX = cornerPoint.x + (movingRight ? actualRadius : -actualRadius);
        
        d = `M ${startPoint.x} ${startPoint.y} ` +
            `L ${startPoint.x} ${cornerY} ` +
            `Q ${cornerPoint.x} ${cornerPoint.y} ${afterCornerX} ${cornerPoint.y} ` +
            `L ${endPoint.x} ${endPoint.y}`;
      }
      
      length = verticalLength + (Math.PI * actualRadius / 2) + horizontalLength;
    }
  } else {
    // 从 left/right 出发：第一段水平，第二段垂直
    cornerPoint = {
      x: endPoint.x,    // X 与终点相同
      y: startPoint.y,  // Y 与起点相同
    };
    
    const horizontalLength = Math.abs(cornerPoint.x - startPoint.x);
    const verticalLength = Math.abs(endPoint.y - cornerPoint.y);
    
    // 处理路径过短的情况
    if (horizontalLength < 5 || verticalLength < 5) {
      // 直接画直线
      d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
      length = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
    } else {
      const actualRadius = Math.min(r, horizontalLength / 2, verticalLength / 2, 8);
      // 关键修复：使用实际移动方向，而不是出发边
      const movingRight = endPoint.x > startPoint.x;
      const movingDown = endPoint.y > startPoint.y;
      
      // 根据实际移动方向计算圆角
      if (movingRight) {
        // 向右移动：拐点在终点左侧
        const cornerX = cornerPoint.x - actualRadius;
        const afterCornerY = cornerPoint.y + (movingDown ? actualRadius : -actualRadius);
        
        d = `M ${startPoint.x} ${startPoint.y} ` +
            `L ${cornerX} ${startPoint.y} ` +
            `Q ${cornerPoint.x} ${cornerPoint.y} ${cornerPoint.x} ${afterCornerY} ` +
            `L ${endPoint.x} ${endPoint.y}`;
      } else {
        // 向左移动：拐点在终点右侧
        const cornerX = cornerPoint.x + actualRadius;
        const afterCornerY = cornerPoint.y + (movingDown ? actualRadius : -actualRadius);
        
        d = `M ${startPoint.x} ${startPoint.y} ` +
            `L ${cornerX} ${startPoint.y} ` +
            `Q ${cornerPoint.x} ${cornerPoint.y} ${cornerPoint.x} ${afterCornerY} ` +
            `L ${endPoint.x} ${endPoint.y}`;
      }
      
      length = horizontalLength + (Math.PI * actualRadius / 2) + verticalLength;
    }
  }
  
  return {
    d,
    length,
    agentPort,
    productPort,
    startPoint,
    endPoint,
    cornerPoint,
  };
}

// ==========================================
// 核心函数：为一个套件生成所有连接路径
// ==========================================

export interface SuiteConnectionPaths {
  suiteId: string;
  paths: Array<{
    productId: string;
    path: ConnectionPath;
  }>;
}

/**
 * 为一个套件生成所有连接路径
 * 
 * 确保：
 * 1. 每条连线使用不同的 Agent 出发边
 * 2. 路径遵循折线规则（无斜线）
 * 3. 智能选择出发边和接收边
 */
export function generateSuiteConnectionPaths(
  suite: SuiteConnection,
  iconPositions: Record<string, SuiteIconPosition>
): SuiteConnectionPaths {
  const agentPos = iconPositions[suite.agentId];
  const usedPorts = new Set<Side>();
  
  const paths = suite.productIds.map(productId => {
    const productPos = iconPositions[productId];
    
    // 智能选择 Agent 出发端口
    const agentPort = selectAgentPort(agentPos, productPos, usedPorts);
    usedPorts.add(agentPort);
    
    // 计算路径
    const path = calculateConnectionPath(
      agentPos,
      productPos,
      agentPort
    );
    
    // 调试输出
    if (process.env.NODE_ENV === 'development') {
      console.log(`[路径] ${suite.agentId} → ${productId}:`, {
        agentPort: path.agentPort,
        productPort: path.productPort,
        start: path.startPoint,
        corner: path.cornerPoint,
        end: path.endPoint,
      });
    }
    
    return { productId, path };
  });
  
  return {
    suiteId: suite.id,
    paths,
  };
}

// ==========================================
// 辅助函数：验证网格布局
// ==========================================

/**
 * 输出当前网格配置（用于调试）
 */
export function debugGridLayout(): void {
  console.log('=== 网格布局配置 ===');
  console.log(`画布: ${SUITE_CANVAS.width}px × ${SUITE_CANVAS.height}px`);
  console.log(`列数: ${GRID.cols}, 行数: ${GRID.rows}`);
  console.log(`间距: ${GRID.gap}px`);
  console.log(`列宽: ${GRID.colWidth.toFixed(2)}px`);
  console.log(`行高: ${GRID.rowHeight.toFixed(2)}px`);
  
  console.log('\n=== 列中心坐标 ===');
  for (let col = 0; col < 6; col++) {
    console.log(`列${col + 1}: x = ${GRID.colCenter(col).toFixed(2)}px`);
  }
  
  console.log('\n=== 基线对齐 ===');
  console.log(`G3 (列1左边缘): x ≈ 0`);
  console.log(`G4 (列4中心): x = 270`);
  console.log(`G5 (列6右边缘): x = 540`);
  
  console.log('\n=== 图标位置 ===');
  Object.entries(SUITE_ICON_POSITIONS).forEach(([id, pos]) => {
    console.log(`${id}: (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}) - ${pos.name}`);
  });
}

// ==========================================
// 旧版兼容函数
// ==========================================

export function getConnectionSide(
  fromPos: { x: number; y: number },
  toPos: { x: number; y: number }
): { fromSide: Side; toSide: Side } {
  const usedPorts = new Set<Side>();
  const fromSide = selectAgentPort(fromPos, toPos, usedPorts);
  const toSide = selectProductPort(fromSide, fromPos, toPos);
  return { fromSide, toSide };
}

// ==========================================
// 核心函数：基于用户定义路径生成连线 v6.1
// ==========================================

/**
 * 基于用户定义的 CONNECTION_ROUTES 计算连线路径
 * 这个函数使用明确指定的起点边和终点边，而不是自动选择
 * 
 * 支持以下情况：
 * 1. 纯水平直线（同一行，left/right 对接）
 * 2. 纯垂直直线（同一列，top/bottom 对接）
 * 3. 带拐点的折线路径
 * 
 * @param route 连线路由规则
 * @returns 包含 SVG 路径的连接信息
 */
export function calculateRouteBasedPath(route: ConnectionRoute): ConnectionPath {
  const fromPos = SUITE_ICON_POSITIONS[route.from];
  const toPos = SUITE_ICON_POSITIONS[route.to];
  
  if (!fromPos || !toPos) {
    console.error(`Icon not found: ${route.from} or ${route.to}`);
    return {
      d: '',
      length: 0,
      agentPort: route.fromPort,
      productPort: route.toPort,
      startPoint: { x: 0, y: 0 },
      endPoint: { x: 0, y: 0 },
      cornerPoint: { x: 0, y: 0 },
    };
  }
  
  const r = ANIMATION_CONFIG.cornerRadius; // 8px
  
  // 1. 计算起点坐标
  const startPoint = getPortPosition(route.from, route.fromPort);
  
  // 2. 计算终点坐标
  const endPoint = getPortPosition(route.to, route.toPort);
  
  // 3. 计算路径
  const agentPort = route.fromPort;
  const productPort = route.toPort;
  
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  
  let cornerPoint: { x: number; y: number };
  let d: string;
  let length: number;
  
  // 情况1：纯水平直线（同一行，Y 坐标几乎相同）
  if (absDy < 5) {
    cornerPoint = { x: (startPoint.x + endPoint.x) / 2, y: startPoint.y };
    d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
    length = absDx;
  }
  // 情况2：纯垂直直线（同一列，X 坐标几乎相同）
  else if (absDx < 5) {
    cornerPoint = { x: startPoint.x, y: (startPoint.y + endPoint.y) / 2 };
    d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
    length = absDy;
  }
  // 情况3：带拐点的折线
  else if (agentPort === 'top' || agentPort === 'bottom') {
    // 从 top/bottom 出发：第一段垂直，第二段水平
    cornerPoint = {
      x: startPoint.x,  // X 与起点相同
      y: endPoint.y,    // Y 与终点相同
    };
    
    const verticalLength = Math.abs(cornerPoint.y - startPoint.y);
    const horizontalLength = Math.abs(endPoint.x - cornerPoint.x);
    const actualRadius = Math.min(r, verticalLength / 2, horizontalLength / 2, 8);
    
    const movingDown = dy > 0;
    const movingRight = dx > 0;
    
    if (movingDown) {
      const cornerY = cornerPoint.y - actualRadius;
      const afterCornerX = cornerPoint.x + (movingRight ? actualRadius : -actualRadius);
      
      d = `M ${startPoint.x} ${startPoint.y} ` +
          `L ${startPoint.x} ${cornerY} ` +
          `Q ${cornerPoint.x} ${cornerPoint.y} ${afterCornerX} ${cornerPoint.y} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    } else {
      const cornerY = cornerPoint.y + actualRadius;
      const afterCornerX = cornerPoint.x + (movingRight ? actualRadius : -actualRadius);
      
      d = `M ${startPoint.x} ${startPoint.y} ` +
          `L ${startPoint.x} ${cornerY} ` +
          `Q ${cornerPoint.x} ${cornerPoint.y} ${afterCornerX} ${cornerPoint.y} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    }
    
    length = verticalLength + (Math.PI * actualRadius / 2) + horizontalLength;
  } else {
    // 从 left/right 出发：第一段水平，第二段垂直
    cornerPoint = {
      x: endPoint.x,    // X 与终点相同
      y: startPoint.y,  // Y 与起点相同
    };
    
    const horizontalLength = Math.abs(cornerPoint.x - startPoint.x);
    const verticalLength = Math.abs(endPoint.y - cornerPoint.y);
    const actualRadius = Math.min(r, horizontalLength / 2, verticalLength / 2, 8);
    
    const movingRight = dx > 0;
    const movingDown = dy > 0;
    
    if (movingRight) {
      const cornerX = cornerPoint.x - actualRadius;
      const afterCornerY = cornerPoint.y + (movingDown ? actualRadius : -actualRadius);
      
      d = `M ${startPoint.x} ${startPoint.y} ` +
          `L ${cornerX} ${startPoint.y} ` +
          `Q ${cornerPoint.x} ${cornerPoint.y} ${cornerPoint.x} ${afterCornerY} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    } else {
      const cornerX = cornerPoint.x + actualRadius;
      const afterCornerY = cornerPoint.y + (movingDown ? actualRadius : -actualRadius);
      
      d = `M ${startPoint.x} ${startPoint.y} ` +
          `L ${cornerX} ${startPoint.y} ` +
          `Q ${cornerPoint.x} ${cornerPoint.y} ${cornerPoint.x} ${afterCornerY} ` +
          `L ${endPoint.x} ${endPoint.y}`;
    }
    
    length = horizontalLength + (Math.PI * actualRadius / 2) + verticalLength;
  }
  
  return {
    d,
    length,
    agentPort,
    productPort,
    startPoint,
    endPoint,
    cornerPoint,
  };
}

/**
 * 为一个套件生成所有连接路径（使用用户定义的路由规则）
 */
export function generateSuiteRoutePaths(suiteId: string): SuiteConnectionPaths {
  const routes = getRoutesForSuite(suiteId);
  
  const paths = routes.map(route => {
    const path = calculateRouteBasedPath(route);
    return {
      productId: route.to,
      path,
    };
  });
  
  return {
    suiteId,
    paths,
  };
}
