'use client';

/**
 * 动画组件封装器
 * 
 * 提供统一的动画组件接口，支持：
 * 1. G-Line 网格对齐
 * 2. 响应式缩放
 * 3. 动画生命周期管理
 * 4. 移动端适配
 */

import React, { useEffect, useState, useCallback, useRef, CSSProperties, ReactNode } from 'react';
import { calculateGLines, GLinePositions, AnimationComponentProps } from './types';

// ==========================================
// 默认布局配置
// ==========================================

const DEFAULT_LAYOUT = {
  /** 设计稿宽度 */
  designWidth: 540,
  /** 设计稿高度 */
  designHeight: 600,
  /** 最小缩放比例 */
  minScale: 0.5,
  /** 最大缩放比例 */
  maxScale: 1,
  /** 布局最大宽度 */
  maxLayoutWidth: 1080,
};

// ==========================================
// AnimationWrapper Props
// ==========================================

interface AnimationWrapperProps extends AnimationComponentProps {
  /** 子组件（动画组件） */
  children: ReactNode;
  /** 设计稿宽度 */
  designWidth?: number;
  /** 设计稿高度 */
  designHeight?: number;
  /** 是否启用 G-Line 对齐 */
  enableGLineAlign?: boolean;
  /** G-Line 对齐目标 (G3, G4, G5) */
  alignTo?: 'G3' | 'G4' | 'G5';
  /** 是否启用响应式缩放 */
  enableScale?: boolean;
  /** 最小缩放比例 */
  minScale?: number;
  /** 最大缩放比例 */
  maxScale?: number;
  /** 容器类名 */
  containerClassName?: string;
  /** 容器样式 */
  containerStyle?: CSSProperties;
}

// ==========================================
// AnimationWrapper 组件
// ==========================================

export function AnimationWrapper({
  children,
  isActive = true,
  style,
  className,
  gLines: externalGLines,
  isMobile = false,
  onAnimationComplete,
  onIconChange,
  designWidth = DEFAULT_LAYOUT.designWidth,
  designHeight = DEFAULT_LAYOUT.designHeight,
  enableGLineAlign = false,
  alignTo = 'G3',
  enableScale = false,
  minScale = DEFAULT_LAYOUT.minScale,
  maxScale = DEFAULT_LAYOUT.maxScale,
  containerClassName,
  containerStyle,
}: AnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gLines, setGLines] = useState<GLinePositions | null>(externalGLines || null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(designWidth);

  /**
   * 更新 G-Line 位置
   */
  const updateGLines = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // 如果外部提供了 gLines，使用外部值
    if (externalGLines) {
      setGLines(externalGLines);
      return;
    }
    
    // 否则从 DOM 或计算获取
    const viewportWidth = window.innerWidth;
    const calculatedGLines = calculateGLines(viewportWidth, DEFAULT_LAYOUT.maxLayoutWidth);
    setGLines(calculatedGLines);
  }, [externalGLines]);

  /**
   * 更新容器尺寸和缩放
   */
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setContainerWidth(rect.width);
    
    if (enableScale) {
      const newScale = Math.max(minScale, Math.min(maxScale, rect.width / designWidth));
      setScale(newScale);
    }
  }, [enableScale, minScale, maxScale, designWidth]);

  /**
   * 初始化和监听变化
   */
  useEffect(() => {
    updateGLines();
    updateDimensions();
    
    const handleResize = () => {
      updateGLines();
      updateDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    
    // 使用 ResizeObserver 监听容器尺寸变化
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [updateGLines, updateDimensions]);

  /**
   * 计算容器样式
   */
  const wrapperStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'auto',
    ...containerStyle,
  };

  /**
   * 计算内容样式
   */
  const contentStyle: CSSProperties = {
    width: enableScale ? designWidth : '100%',
    height: enableScale ? designHeight : 'auto',
    transform: enableScale ? `scale(${scale})` : undefined,
    transformOrigin: 'top left',
    ...style,
  };

  /**
   * 克隆子组件并注入 props
   */
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<AnimationComponentProps>(child)) {
      const childProps = child.props as Record<string, unknown>;
      return React.cloneElement(child, {
        ...childProps,
        isActive,
        gLines: gLines || undefined,
        isMobile,
        onAnimationComplete,
        onIconChange,
        style: contentStyle,
      });
    }
    return child;
  });

  return (
    <div
      ref={containerRef}
      className={`animation-wrapper ${containerClassName || ''}`}
      style={wrapperStyle}
    >
      <div className={`animation-content ${className || ''}`}>
        {enhancedChildren}
      </div>
    </div>
  );
}

export default AnimationWrapper;
