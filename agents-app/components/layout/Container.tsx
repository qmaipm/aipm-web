'use client';

import { ReactNode } from 'react';

/**
 * 统一布局容器组件
 * 
 * 自动对齐到 Stripe 风格栅格系统
 * - 最大宽度 1080px
 * - 居中显示
 * - 响应式边距
 */

interface ContainerProps {
  /** 子元素 */
  children: ReactNode;
  /** 额外的 CSS 类名 */
  className?: string;
  /** 是否使用栅格布局 */
  grid?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** HTML 标签类型 */
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

export function Container({ 
  children, 
  className = '',
  grid = false,
  style,
  as: Component = 'div',
}: ContainerProps) {
  const baseStyle: React.CSSProperties = {
    width: 'var(--layout-width)',
    marginLeft: 'var(--layout-side-margin)',
    marginRight: 'var(--layout-side-margin)',
    ...(grid && {
      display: 'grid',
      gridTemplateColumns: 'repeat(var(--layout-column-count), 1fr)',
    }),
    ...style,
  };
  
  return (
    <Component 
      className={`layout-container ${className}`.trim()}
      style={baseStyle}
    >
      {children}
    </Component>
  );
}

/**
 * 栅格列组件
 * 
 * 用于在 Container 内定义占用的列数
 */
interface GridColumnProps {
  /** 子元素 */
  children: ReactNode;
  /** 起始列（1-4） */
  start?: 1 | 2 | 3 | 4;
  /** 结束列（2-5） */
  end?: 2 | 3 | 4 | 5;
  /** 跨越列数 */
  span?: 1 | 2 | 3 | 4;
  /** 额外的 CSS 类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export function GridColumn({
  children,
  start,
  end,
  span,
  className = '',
  style,
}: GridColumnProps) {
  const columnStyle: React.CSSProperties = {
    ...(start && { gridColumnStart: start }),
    ...(end && { gridColumnEnd: end }),
    ...(span && { gridColumn: `span ${span}` }),
    ...style,
  };
  
  return (
    <div className={`grid-column ${className}`.trim()} style={columnStyle}>
      {children}
    </div>
  );
}

/**
 * 全宽容器组件
 * 
 * 用于需要全宽背景但内容对齐栅格的区域（如 Hero 渐变背景）
 */
interface FullWidthProps {
  /** 子元素 */
  children: ReactNode;
  /** 额外的 CSS 类名 */
  className?: string;
  /** 背景样式 */
  background?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export function FullWidth({
  children,
  className = '',
  background,
  style,
}: FullWidthProps) {
  return (
    <div 
      className={`full-width-container ${className}`.trim()}
      style={{
        width: '100%',
        background,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Container;
