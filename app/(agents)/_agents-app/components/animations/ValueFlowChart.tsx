'use client';

/**
 * ValueFlowChart 价值流程图组件
 * 
 * 独立封装的数据流动画组件，展示质量评估 Agent 的数据处理流程
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 功能特性：
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. 数据流动画：图片堆叠 → 01010数据流 → 量化标签
 * 2. 黑客帝国风格数据流（绿色 01010 瀑布效果）
 * 3. 收益方块与量化标签一体化设计
 * 4. G3-G5 网格对齐支持
 * 5. 响应式布局
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 布局对齐（G-Line 网格系统）：
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * - 组件宽度：G5 - G3 = 2个列宽 (约 540px @1080px 布局)
 * - 组件高度：600px (保持 9:10 比例)
 * - 水平居中于 G3-G5 区域
 * - 垂直居中于容器
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 使用方式：
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ```tsx
 * import { ValueFlowChart } from '@hp/components/animations/ValueFlowChart';
 * 
 * // 基础用法
 * <ValueFlowChart progress={0.5} />
 * 
 * // 自动播放
 * <ValueFlowChart autoPlay duration={16000} />
 * 
 * // 带 G-Line 对齐
 * <ValueFlowChart 
 *   autoPlay 
 *   gLines={{ G3: 540, G4: 810, G5: 1080, ... }}
 * />
 * ```
 */

import React, { useState, useEffect, useRef, CSSProperties } from 'react';

// ==========================================
// 类型定义
// ==========================================

export interface GLinePositions {
  G1: number;
  G2: number;
  G3: number;
  G4: number;
  G5: number;
  layoutWidth: number;
  columnWidth: number;
}

export interface ValueFlowChartProps {
  /** 动画进度 (0-1)，如果提供则不自动播放 */
  progress?: number;
  /** 是否自动播放 */
  autoPlay?: boolean;
  /** 自动播放时的动画时长（毫秒） */
  duration?: number;
  /** 是否循环播放 */
  loop?: boolean;
  /** G-Line 位置（用于网格对齐） */
  gLines?: GLinePositions;
  /** 是否为移动端 */
  isMobile?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 动画完成回调 */
  onComplete?: () => void;
}

// ==========================================
// 默认配置
// ==========================================

const DEFAULT_CONFIG = {
  /** 设计稿宽度 */
  designWidth: 540,
  /** 设计稿高度 */
  designHeight: 600,
  /** 默认动画时长 */
  duration: 16000,
};

// ==========================================
// ValueFlowChart 组件
// ==========================================

export function ValueFlowChart({
  progress: externalProgress,
  autoPlay = false,
  duration = DEFAULT_CONFIG.duration,
  loop = true,
  gLines,
  isMobile = false,
  style,
  className,
  onComplete,
}: ValueFlowChartProps) {
  // 内部进度状态（自动播放时使用）
  const [internalProgress, setInternalProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // 使用外部进度或内部进度
  const progress = externalProgress !== undefined ? externalProgress : internalProgress;

  // 自动播放逻辑
  useEffect(() => {
    if (!autoPlay || externalProgress !== undefined) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(1, elapsed / duration);
      
      setInternalProgress(newProgress);

      if (newProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        if (loop) {
          startTimeRef.current = null;
          setInternalProgress(0);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          onComplete?.();
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoPlay, duration, loop, externalProgress, onComplete]);

  // 今天的日期
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;

  // ═══════════════════════════════════════════════════════════════════════
  // 【阶段一】节点构建动画 (0% - 55%)
  // ═══════════════════════════════════════════════════════════════════════
  
  // Step 1: 点阵画布背景 — 淡入 (0-5%)
  const canvasProgress = Math.max(0, Math.min(1, progress / 0.05));
  
  // Step 2: 顶部卡片 — 淡入 + 从上滑入 (3%-8%)
  const headerProgress = Math.max(0, Math.min(1, (progress - 0.03) / 0.05));
  
  // Step 3: 三个数据来源图标 — 依次淡入 (6%-14%)
  const source1Progress = Math.max(0, Math.min(1, (progress - 0.06) / 0.03));
  const source2Progress = Math.max(0, Math.min(1, (progress - 0.09) / 0.03));
  const source3Progress = Math.max(0, Math.min(1, (progress - 0.11) / 0.03));
  
  // Step 4: 汇聚箭头 — 从三个来源汇聚到中心 (12%-18%)
  const mergeArrowProgress = Math.max(0, Math.min(1, (progress - 0.12) / 0.06));
  
  // Step 5:「质检任务」节点 — 淡入 + 缩放弹出 (16%-20%)
  const taskNodeProgress = Math.max(0, Math.min(1, (progress - 0.16) / 0.04));
  
  // Step 6: 向下三角箭头组1 — 向下流动特效 (18%-26%)
  const arrow1Progress = Math.max(0, Math.min(1, (progress - 0.18) / 0.08));
  
  // Step 7:「AI智能审图」节点 — 淡入 + 缩放弹出 (24%-28%)
  const aiNodeProgress = Math.max(0, Math.min(1, (progress - 0.24) / 0.04));
  
  // Step 8: 向下三角箭头组2 — 向下流动特效 (26%-34%)
  const arrow2Progress = Math.max(0, Math.min(1, (progress - 0.26) / 0.08));
  
  // Step 9:「质检完成」节点 — 淡入 + 缩放弹出 (32%-36%)
  const completeNodeProgress = Math.max(0, Math.min(1, (progress - 0.32) / 0.04));
  
  // Step 10: 向下分散三箭头 — 向下流动特效 (34%-42%)
  const spreadArrowProgress = Math.max(0, Math.min(1, (progress - 0.34) / 0.08));
  
  // Step 11: 三个收益方块 — 依次淡入 (40%-52%)
  const result1Progress = Math.max(0, Math.min(1, (progress - 0.40) / 0.05));
  const result2Progress = Math.max(0, Math.min(1, (progress - 0.44) / 0.05));
  const result3Progress = Math.max(0, Math.min(1, (progress - 0.48) / 0.05));

  // ═══════════════════════════════════════════════════════════════════════
  // 【阶段二】数据流动画 (50% - 95%)
  // ═══════════════════════════════════════════════════════════════════════
  
  // Step 12: 图片堆叠图标出现 — 在「质检任务」节点上方 (50%-58%)
  const photoStackAppear = Math.max(0, Math.min(1, (progress - 0.50) / 0.08));
  
  // Step 13: 图片堆叠向下移动 — 沿箭头移动到「AI智能审图」节点 (56%-66%)
  const photoMoveProgress = Math.max(0, Math.min(1, (progress - 0.56) / 0.10));
  
  // Step 14: 图片→数据流变形 — 图片堆叠变成数据流图标 (64%-68%)
  const transformProgress = Math.max(0, Math.min(1, (progress - 0.64) / 0.04));
  
  // Step 15: 数据流向下移动 — 沿箭头移动到「质检完成」节点 (66%-76%)
  const dataMoveProgress = Math.max(0, Math.min(1, (progress - 0.66) / 0.10));
  
  // Step 16: 数据流→三标签分裂 — 数据流沿三条分叉分裂 (74%-78%)
  const splitProgress = Math.max(0, Math.min(1, (progress - 0.74) / 0.04));
  
  // Step 17: 三个量化标签飞入 — 飞入对应收益方块下方 (76%-88%)
  const label1FlyIn = Math.max(0, Math.min(1, (progress - 0.76) / 0.05));
  const label2FlyIn = Math.max(0, Math.min(1, (progress - 0.79) / 0.05));
  const label3FlyIn = Math.max(0, Math.min(1, (progress - 0.82) / 0.05));
  
  // Step 18: 收益方块+标签闪光 — 同步呼吸/光晕效果 (85%-100%)
  const glowProgress = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));
  
  // ═══════════════════════════════════════════════════════════════════════
  // 数据流图标位置计算
  // ═══════════════════════════════════════════════════════════════════════
  
  // 数据流当前阶段（用于决定显示哪种图标）
  // 0=不显示, 1=图片堆叠, 2=数据流, 3=分裂中, 4=完成
  const dataFlowStage = 
    progress < 0.50 ? 0 :
    progress < 0.64 ? 1 :
    progress < 0.74 ? 2 :
    progress < 0.78 ? 3 : 4;
  
  // 数据流垂直位置 (0=节点1位置, 0.5=节点2位置, 1=节点3位置)
  const dataFlowY = 
    progress < 0.56 ? 0 :
    progress < 0.66 ? photoMoveProgress * 0.5 :
    progress < 0.76 ? 0.5 + dataMoveProgress * 0.5 : 1;

  // ========== SVG 图标组件 ==========
  // 微信群图标
  const WechatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="#10B981"/>
      <path d="M14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5C13 10.3284 13.6716 11 14.5 11Z" fill="#10B981"/>
      <path d="M12 2C6.48 2 2 5.58 2 10C2 12.03 2.94 13.87 4.5 15.21V19L8.34 16.81C9.51 17.05 10.74 17.18 12 17.18C17.52 17.18 22 13.6 22 9.18C22 5.58 17.52 2 12 2Z" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
  
  // 拍照图标
  const CameraIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="14" rx="2" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="13" r="4" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="13" r="2" fill="#3B82F6"/>
      <path d="M7 6V5C7 4.44772 7.44772 4 8 4H16C16.5523 4 17 4.44772 17 5V6" stroke="#3B82F6" strokeWidth="1.5"/>
      <circle cx="18" cy="9" r="1" fill="#3B82F6"/>
    </svg>
  );
  
  // 机器人图标
  const RobotIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="12" rx="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="5" r="2" stroke="#8B5CF6" strokeWidth="1.5" fill="none"/>
      <line x1="12" y1="7" x2="12" y2="8" stroke="#8B5CF6" strokeWidth="1.5"/>
      <circle cx="9" cy="13" r="1.5" fill="#8B5CF6"/>
      <circle cx="15" cy="13" r="1.5" fill="#8B5CF6"/>
      <path d="M9 17H15" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="2" y1="12" x2="4" y2="12" stroke="#8B5CF6" strokeWidth="1.5"/>
      <line x1="20" y1="12" x2="22" y2="12" stroke="#8B5CF6" strokeWidth="1.5"/>
    </svg>
  );

  // ========== 数据流图标组件 ==========
  // 图片堆叠图标（3张图片错位堆叠 + 闪光星星）
  const PhotoStackIcon = ({ sparkle = 0 }: { sparkle?: number }) => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* 第三张图片（最底层） */}
      <rect x="10" y="10" width="18" height="14" rx="1" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" transform="rotate(-5 18 18)"/>
      {/* 第二张图片（中层） */}
      <rect x="8" y="8" width="18" height="14" rx="1" fill="#FEF9C3" stroke="#EAB308" strokeWidth="1.5" transform="rotate(3 18 18)"/>
      {/* 第一张图片（最上层） */}
      <rect x="6" y="6" width="18" height="14" rx="1" fill="white" stroke="#F59E0B" strokeWidth="1.5"/>
      {/* 图片内的山水图案 */}
      <path d="M8 17l4-4 3 3 5-5 4 4v3H8v-1z" fill="#FCD34D" opacity="0.6"/>
      <circle cx="20" cy="10" r="2" fill="#FBBF24"/>
      {/* 闪光星星 */}
      <g opacity={sparkle} transform="translate(26, 2)">
        <path d="M4 0l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#F59E0B"/>
      </g>
      <g opacity={sparkle * 0.7} transform="translate(0, 24)">
        <path d="M3 0l0.7 2.1 2.3 0.7-2.3 0.7-0.7 2.1-0.7-2.1L0 2.8l2.3-0.7z" fill="#FBBF24"/>
      </g>
    </svg>
  );

  // 数据流图标（黑客帝国风格 01010）
  const DataFlowIcon = ({ flowOffset = 0 }: { flowOffset?: number }) => {
    // 生成随机的 0/1 字符矩阵
    const matrix = [
      ['1', '0', '1'],
      ['0', '1', '0'],
      ['1', '1', '0'],
      ['0', '0', '1'],
    ];
    
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="matrixGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FF41" stopOpacity="1"/>
            <stop offset="100%" stopColor="#00FF41" stopOpacity="0.3"/>
          </linearGradient>
          <filter id="matrixGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* 背景发光 */}
        <rect x="6" y="4" width="24" height="28" rx="2" fill="#001100" opacity="0.8"/>
        {/* 瀑布流 01010 字符 */}
        {matrix.map((row, rowIdx) => 
          row.map((char, colIdx) => {
            const phase = (flowOffset * 3 + rowIdx * 0.25 + colIdx * 0.1) % 1;
            const opacity = 0.3 + Math.sin(phase * Math.PI) * 0.7;
            const y = 10 + rowIdx * 7 + (phase * 4 - 2);
            return (
              <text
                key={`${rowIdx}-${colIdx}`}
                x={10 + colIdx * 8}
                y={y}
                fontSize="7"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#00FF41"
                opacity={opacity}
                filter="url(#matrixGlow)"
              >
                {char}
              </text>
            );
          })
        )}
        {/* 顶部高亮字符 */}
        <text x="10" y="8" fontSize="6" fontFamily="monospace" fill="#7FFF00" opacity={0.5 + Math.sin(flowOffset * Math.PI * 4) * 0.5}>{'>'}</text>
        <text x="26" y="8" fontSize="6" fontFamily="monospace" fill="#7FFF00" opacity={0.5 + Math.sin(flowOffset * Math.PI * 4 + 1) * 0.5}>{'<'}</text>
      </svg>
    );
  };

  // 向下箭头动画组件（6个竖排三角形，更美观的流动效果）
  const VerticalArrows = ({ progress: p, color, count = 6 }: { progress: number; color: string; count?: number }) => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: count * 12 + 'px',
      }}>
        {[...Array(count)].map((_, i) => {
          // 波浪式流动：每个箭头有不同的延迟和速度
          const wavePhase = (p * 2.5 + i * 0.15) % 1;
          const opacity = Math.sin(wavePhase * Math.PI) * 0.6 + 0.4;
          const scale = 0.85 + Math.sin(wavePhase * Math.PI) * 0.15;
          const show = p > i * 0.1;
          
          return (
            <svg 
              key={i} 
              width="12" 
              height="7" 
              viewBox="0 0 12 7"
              style={{
                opacity: show ? opacity : 0,
                transform: `scale(${scale})`,
                transition: 'opacity 0.15s ease-out',
              }}
            >
              <path d="M6 7L0 0h12L6 7z" fill={color} />
            </svg>
          );
        })}
      </div>
    );
  };

  // 汇聚箭头组件（从三个数据来源汇聚到中心）
  const MergeArrows = ({ progress: p }: { progress: number }) => {
    const baseY = 0;
    const endY = 24;
    const centerX = 130;
    const leftX = 48;
    const rightX = 212;
    
    return (
      <svg width="260" height="28" viewBox="0 0 260 28" style={{ opacity: Math.min(1, p * 1.5) }}>
        <defs>
          <linearGradient id="mergeGradV3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* 左边线 */}
        <path 
          d={`M${leftX} ${baseY} Q${leftX + 25} ${endY * 0.6} ${centerX} ${endY * p}`}
          fill="none" 
          stroke="url(#mergeGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={70 * p}
          strokeDashoffset={0}
        />
        {/* 中间线 */}
        <path 
          d={`M${centerX} ${baseY} L${centerX} ${endY * p}`}
          stroke="url(#mergeGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        {/* 右边线 */}
        <path 
          d={`M${rightX} ${baseY} Q${rightX - 25} ${endY * 0.6} ${centerX} ${endY * p}`}
          fill="none" 
          stroke="url(#mergeGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={70 * p}
          strokeDashoffset={0}
        />
        {/* 汇聚点箭头 */}
        {p > 0.75 && (
          <polygon 
            points={`${centerX},${endY + 5} ${centerX - 5},${endY - 1} ${centerX + 5},${endY - 1}`} 
            fill="#64748b" 
            opacity={(p - 0.75) / 0.25}
          />
        )}
      </svg>
    );
  };

  // 分散箭头组件（从质检完成分散到三个结果）
  const SpreadArrows = ({ progress: p, color }: { progress: number; color: string }) => {
    const startY = 0;
    const endY = 28;
    const centerX = 130;
    const leftX = 52;
    const rightX = 208;
    
    return (
      <svg width="260" height="34" viewBox="0 0 260 34" style={{ opacity: Math.min(1, p * 1.5) }}>
        <defs>
          <linearGradient id="spreadGradV3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* 中心起点 */}
        <circle cx={centerX} cy={startY + 2} r="3" fill={color} opacity={p > 0.1 ? 1 : 0} />
        
        {/* 左边分支 */}
        <path 
          d={`M${centerX} ${startY + 4} Q${centerX - 25} ${endY * 0.45} ${leftX} ${startY + endY * p}`}
          fill="none" 
          stroke="url(#spreadGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={90}
          strokeDashoffset={90 - 90 * p}
        />
        {/* 中间分支 */}
        <path 
          d={`M${centerX} ${startY + 4} L${centerX} ${startY + endY * p}`}
          stroke="url(#spreadGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={35}
          strokeDashoffset={35 - 35 * p}
        />
        {/* 右边分支 */}
        <path 
          d={`M${centerX} ${startY + 4} Q${centerX + 25} ${endY * 0.45} ${rightX} ${startY + endY * p}`}
          fill="none" 
          stroke="url(#spreadGradV3)" 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeDasharray={90}
          strokeDashoffset={90 - 90 * p}
        />
        
        {/* 三个箭头尖 */}
        {p > 0.7 && (
          <>
            <polygon 
              points={`${leftX},${endY + 5} ${leftX - 4},${endY - 1} ${leftX + 4},${endY - 1}`} 
              fill={color} 
              opacity={(p - 0.7) / 0.3}
            />
            <polygon 
              points={`${centerX},${endY + 5} ${centerX - 4},${endY - 1} ${centerX + 4},${endY - 1}`} 
              fill={color} 
              opacity={(p - 0.7) / 0.3}
            />
            <polygon 
              points={`${rightX},${endY + 5} ${rightX - 4},${endY - 1} ${rightX + 4},${endY - 1}`} 
              fill={color} 
              opacity={(p - 0.7) / 0.3}
            />
          </>
        )}
      </svg>
    );
  };

  // ========== 通用样式 ==========
  // 直角矩形节点样式
  const nodeStyle = (bgColor: string, nodeProgress: number, shadowColor: string) => ({
    padding: '8px 28px',
    backgroundColor: bgColor,
    borderRadius: '0px', // 直角矩形
    color: 'white',
    fontSize: '13px',
    fontWeight: 600 as const,
    opacity: nodeProgress,
    transform: `scale(${0.85 + nodeProgress * 0.15})`,
    boxShadow: nodeProgress > 0.5 ? `0 4px 16px ${shadowColor}` : 'none',
    border: '1px solid rgba(255,255,255,0.2)',
  });

  // ========== 计算容器尺寸 ==========
  const containerWidth = gLines ? gLines.G5 - gLines.G3 : DEFAULT_CONFIG.designWidth;
  const containerHeight = DEFAULT_CONFIG.designHeight;

  return (
    <div 
      className={className}
      style={{
        width: isMobile ? '100%' : containerWidth,
        height: isMobile ? 'auto' : containerHeight,
        aspectRatio: isMobile ? '9 / 10' : undefined,
        position: 'relative',
        padding: '6px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Step 1: 点阵画布背景 - 填满整个区域 */}
      <div style={{
        position: 'absolute',
        inset: '6px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #e2e8f0',
        opacity: canvasProgress,
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="dotPatternFlowV3" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.6" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPatternFlowV3)" />
          {/* 中心虚线 */}
          <line x1="50%" y1="12%" x2="50%" y2="88%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 内容区域 - 使用绝对定位填满空间，全部居中对齐，上下 padding 对称 */}
      <div style={{
        position: 'absolute',
        inset: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 6px',
      }}>
        {/* Step 2: 顶部卡片 - 直角矩形 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0px',
          padding: '7px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
          width: '85%',
          opacity: headerProgress,
          transform: `translateY(${(1 - headerProgress) * -10}px)`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>启盟广场</span>
              <span style={{ 
                fontSize: '8px', 
                color: '#64748b', 
                padding: '2px 5px', 
                backgroundColor: '#f1f5f9', 
                borderRadius: '0px',
                border: '1px solid #e2e8f0',
              }}>{dateStr}</span>
            </div>
            <div style={{ fontSize: '8px', color: '#10B981', fontWeight: 600 }}>单日质检 ✓</div>
          </div>
        </div>

        {/* Step 3: 三个数据来源图标（SVG图标，不用emoji） */}
        <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexShrink: 0 }}>
          {[
            { icon: <WechatIcon />, label: '微信群', progress: source1Progress, bgColor: '#dcfce7', borderColor: '#86efac' },
            { icon: <CameraIcon />, label: '拍照', progress: source2Progress, bgColor: '#dbeafe', borderColor: '#93c5fd' },
            { icon: <RobotIcon />, label: '机器人', progress: source3Progress, bgColor: '#ede9fe', borderColor: '#c4b5fd' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              opacity: item.progress,
              transform: `translateY(${(1 - item.progress) * -8}px) scale(${0.85 + item.progress * 0.15})`,
            }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '0px', // 直角矩形
                backgroundColor: item.bgColor,
                border: `1px solid ${item.borderColor}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>{item.icon}</div>
              <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Step 4: 汇聚箭头 */}
        <MergeArrows progress={mergeArrowProgress} />

        {/* Step 5: 质检任务节点 - 直角矩形 */}
        <div style={{ position: 'relative' }}>
          <div style={nodeStyle('#3B82F6', taskNodeProgress, 'rgba(59,130,246,0.4)')}>
            质检任务
          </div>
        </div>

        {/* Step 6: 箭头1（向下流动）+ 数据流图标位置1 */}
        <div style={{ margin: '3px 0', position: 'relative' }}>
          <VerticalArrows progress={arrow1Progress} color="#3B82F6" count={6} />
          
          {/* 数据流图标 - 阶段1: 图片堆叠在此区域移动 */}
          {dataFlowStage === 1 && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: `${dataFlowY < 0.5 ? dataFlowY * 2 * 100 : 100}%`,
              transform: 'translate(-50%, -50%)',
              opacity: photoStackAppear,
              filter: `drop-shadow(0 4px 12px rgba(245, 158, 11, 0.4))`,
              zIndex: 10,
            }}>
              <PhotoStackIcon sparkle={Math.sin(progress * Math.PI * 8) * 0.5 + 0.5} />
            </div>
          )}
        </div>

        {/* Step 7: AI审图节点 - 直角矩形（不再有标签） */}
        <div style={{ position: 'relative' }}>
          <div style={nodeStyle('#10B981', aiNodeProgress, 'rgba(16,185,129,0.4)')}>
            AI智能审图
          </div>
        </div>

        {/* Step 8: 箭头2（向下流动）+ 数据流图标位置2 */}
        <div style={{ margin: '3px 0', position: 'relative' }}>
          <VerticalArrows progress={arrow2Progress} color="#10B981" count={6} />
          
          {/* 数据流图标 - 阶段2: 数据流在此区域移动 */}
          {dataFlowStage === 2 && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: `${(dataFlowY - 0.5) * 2 * 100}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 1 - transformProgress * 0.3 + dataMoveProgress * 0.3,
              filter: `drop-shadow(0 4px 12px rgba(6, 182, 212, 0.4))`,
              zIndex: 10,
            }}>
              <DataFlowIcon flowOffset={progress * 3} />
            </div>
          )}
        </div>

        {/* Step 9: 质检完成节点 - 直角矩形（不再有标签） */}
        <div style={{ position: 'relative' }}>
          <div style={nodeStyle('#8B5CF6', completeNodeProgress, 'rgba(139,92,246,0.4)')}>
            质检完成
          </div>
        </div>

        {/* Step 10: 向下分散三箭头 + 数据流分裂动画 */}
        <div style={{ margin: '3px 0', position: 'relative' }}>
          <SpreadArrows progress={spreadArrowProgress} color="#8B5CF6" />
          
          {/* 数据流分裂效果 - 阶段3: 从中心分裂成3个 */}
          {dataFlowStage === 3 && (
            <>
              {/* 分裂粒子效果 */}
              {[0, 1, 2].map((i) => {
                const angle = (i - 1) * 45; // -45°, 0°, 45°
                const distance = splitProgress * 40;
                const x = Math.sin(angle * Math.PI / 180) * distance;
                const y = splitProgress * 20;
                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: '50%',
                    top: '0',
                    transform: `translate(calc(-50% + ${x}px), ${y}px) scale(${0.8 + splitProgress * 0.2})`,
                    opacity: 1 - splitProgress * 0.5,
                    zIndex: 10,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <circle cx="6" cy="6" r="4" fill={['#10B981', '#3B82F6', '#8B5CF6'][i]} opacity="0.8"/>
                    </svg>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Step 11: 三个收益方块（标签集成在内） + Step 17: 量化标签飞入 + Step 18: 闪光效果 */}
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          {[
            { 
              title: '零审图成本', 
              label: '节省 99%',
              color: '#10B981', 
              bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', 
              border: '#86efac',
              lightBg: '#ecfdf5',
              progress: result1Progress,
              labelProgress: label1FlyIn,
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="none"/>
                  <path d="M8 12l3 3 5-6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
            { 
              title: 'AI客观评分', 
              label: '评分: 4.2',
              color: '#3B82F6', 
              bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', 
              border: '#93c5fd',
              lightBg: '#eff6ff',
              progress: result2Progress,
              labelProgress: label2FlyIn,
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" stroke="#3B82F6" strokeWidth="1.5" fill="#3B82F6" fillOpacity="0.2"/>
                </svg>
              ),
            },
            { 
              title: '千万级复盘', 
              label: '留存: 千万/月',
              color: '#8B5CF6', 
              bg: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', 
              border: '#c4b5fd',
              lightBg: '#f5f3ff',
              progress: result3Progress,
              labelProgress: label3FlyIn,
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="#8B5CF6" strokeWidth="1.5" fill="#8B5CF6" fillOpacity="0.2"/>
                </svg>
              ),
            },
          ].map((item, i) => {
            // 闪光效果（在 glowProgress > 0 时激活）
            const isGlowing = glowProgress > 0 && item.progress >= 1;
            const breathe = isGlowing ? Math.sin(glowProgress * Math.PI * 6 + i * 0.8) * 0.04 + 1 : 1;
            const glowIntensity = isGlowing ? 0.25 + Math.sin(glowProgress * Math.PI * 4 + i * 1.2) * 0.2 : 0;
            
            return (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                background: item.bg,
                borderRadius: '0px',
                border: `1.5px solid ${item.border}`,
                opacity: item.progress,
                transform: `translateY(${(1 - item.progress) * 10}px) scale(${(0.88 + item.progress * 0.12) * breathe})`,
                boxShadow: item.progress > 0.5 
                  ? `0 4px 12px rgba(0,0,0,0.1), 0 0 ${6 + glowIntensity * 16}px ${item.color}${Math.round(glowIntensity * 70).toString(16).padStart(2, '0')}`
                  : 'none',
                position: 'relative' as const,
                overflow: 'hidden',
                minWidth: '70px',
              }}>
                {/* 微光扫描效果 */}
                {isGlowing && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '60%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${item.color}30, transparent)`,
                    transform: `translateX(${((glowProgress * 2 + i * 0.3) % 1) * 350}%)`,
                    pointerEvents: 'none',
                    zIndex: 1,
                  }} />
                )}
                {/* 上半部分：标题行 */}
                <div style={{
                  padding: '5px 8px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ 
                    fontSize: '8px', 
                    fontWeight: 600, 
                    color: item.color,
                    whiteSpace: 'nowrap',
                  }}>{item.title}</span>
                </div>
                {/* 下半部分：量化标签（飞入动画） */}
                <div style={{
                  padding: '3px 8px 5px',
                  backgroundColor: item.lightBg,
                  borderTop: `1px dashed ${item.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: item.labelProgress,
                  transform: `translateY(${(1 - item.labelProgress) * 8}px)`,
                }}>
                  <span style={{ 
                    fontSize: '9px', 
                    fontWeight: 700, 
                    color: item.color,
                    whiteSpace: 'nowrap',
                  }}>{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ValueFlowChart;
