'use client';

/**
 * 动画组件选择器
 * 
 * 根据模块 ID 自动选择并渲染对应的动画组件
 * 提供统一的接口，简化首页集成
 */

import React, { lazy, Suspense, CSSProperties } from 'react';
import { AnimationComponentProps, GLinePositions } from './types';
import { MODULE_IDS, ModuleId } from './registry';

// ==========================================
// 动态导入动画组件
// ==========================================

// 使用 lazy 加载以优化首屏性能
const SuiteGridAnimationV2 = lazy(() => 
  import('../SuiteGridAnimationV2').then(m => ({ default: m.SuiteGridAnimationV2 }))
);
const ServiceDesignAnimation = lazy(() => import('../ServiceDesignAnimation'));
const OperationsAnimation = lazy(() => import('../OperationsAnimation'));
const QualityAnimation = lazy(() => import('../QualityAnimation'));
const ReviewAnimation = lazy(() => import('../ReviewAnimation'));

// ==========================================
// 加载占位组件
// ==========================================

function AnimationLoadingFallback({ width, height }: { width: number; height: number }) {
  return (
    <div 
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: '12px',
      }}
    >
      <div 
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid #E2E8F0',
          borderTopColor: '#0070FF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ==========================================
// AnimationSelector Props
// ==========================================

// 产品图标类型（与 StripeStyleAnimation 一致）
type ProductIconType = 'ssr' | 'ticket' | 'collaboration' | 'api' | 'agentDesign' | 'space' | 
  'serviceConfig' | 'agentOps' | 'agentQuality' | 'device' | 'inspect' | 'assistant' | 
  'agentReview' | 'salary' | 'dashboard' | 'data';

export interface AnimationSelectorProps extends AnimationComponentProps {
  /** 模块 ID */
  moduleId: ModuleId;
  /** 动画容器宽度 */
  width?: number;
  /** 动画容器高度 */
  height?: number;
  /** 强调色（用于 StripeStyleAnimation） */
  accentColor?: string;
  /** 相关产品配置（用于 StripeStyleAnimation） */
  relatedProducts?: Array<{
    name: string;
    href: string;
    icon: ProductIconType;
  }>;
  /** 是否显示标签 */
  showLabels?: boolean;
  /** 布局模式 */
  layoutMode?: 'vertical' | 'horizontal';
}

// ==========================================
// 默认配置
// ==========================================

const DEFAULT_DIMENSIONS = {
  width: 540,
  height: 600,
};

// ==========================================
// AnimationSelector 组件
// ==========================================

export function AnimationSelector({
  moduleId,
  isActive = true,
  style,
  className,
  gLines,
  isMobile = false,
  onAnimationComplete,
  onIconChange,
  width = DEFAULT_DIMENSIONS.width,
  height = DEFAULT_DIMENSIONS.height,
  accentColor = '#0070FF',
  relatedProducts = [],
  showLabels = false,
  layoutMode = 'vertical',
}: AnimationSelectorProps) {
  
  /**
   * 基础样式
   */
  const baseStyle: CSSProperties = {
    width: isMobile ? '100%' : width,
    height: isMobile ? 'auto' : height,
    margin: '0 auto',
    ...style,
  };

  /**
   * 根据模块 ID 渲染对应的动画组件
   */
  const renderAnimation = () => {
    switch (moduleId) {
      case MODULE_IDS.MODULAR_AI:
        return (
          <SuiteGridAnimationV2
            autoPlay={isActive}
            showLabels={showLabels}
            speed={1}
            style={{
              width: '100%',
              maxWidth: width,
              height: 'auto',
              aspectRatio: '1',
              margin: '0 auto',
            }}
          />
        );
      
      case MODULE_IDS.SERVICE_DESIGN:
        return (
          <ServiceDesignAnimation
            isActive={isActive}
            style={baseStyle}
            className={className}
          />
        );
      
      case MODULE_IDS.OPERATIONS:
        return (
          <OperationsAnimation
            isActive={isActive}
            style={baseStyle}
            className={className}
          />
        );
      
      case MODULE_IDS.QUALITY:
        return (
          <QualityAnimation
            isActive={isActive}
            style={baseStyle}
            className={className}
          />
        );
      
      case MODULE_IDS.REVIEW:
        return (
          <ReviewAnimation
            isActive={isActive}
            style={baseStyle}
            className={className}
            gLines={gLines ? { G3: gLines.G3, G4: gLines.G4, G5: gLines.G5 } : undefined}
          />
        );
      
      default:
        console.warn(`Unknown module ID: ${moduleId}`);
        return null;
    }
  };

  return (
    <Suspense fallback={<AnimationLoadingFallback width={width} height={height} />}>
      {renderAnimation()}
    </Suspense>
  );
}

// ==========================================
// 便捷组件导出
// ==========================================

/**
 * 模块化 AI 动画
 */
export function ModularAIAnimation(props: Omit<AnimationSelectorProps, 'moduleId'>) {
  return <AnimationSelector moduleId={MODULE_IDS.MODULAR_AI} {...props} />;
}

/**
 * 服务设计 Agent 动画
 */
export function ServiceDesignAgentAnimation(props: Omit<AnimationSelectorProps, 'moduleId'>) {
  return <AnimationSelector moduleId={MODULE_IDS.SERVICE_DESIGN} {...props} />;
}

/**
 * 运营管理 Agent 动画
 */
export function OperationsAgentAnimation(props: Omit<AnimationSelectorProps, 'moduleId'>) {
  return <AnimationSelector moduleId={MODULE_IDS.OPERATIONS} {...props} />;
}

/**
 * 质量评估 Agent 动画
 */
export function QualityAgentAnimation(props: Omit<AnimationSelectorProps, 'moduleId'>) {
  return <AnimationSelector moduleId={MODULE_IDS.QUALITY} {...props} />;
}

/**
 * 服务优化 Agent 动画
 */
export function ReviewAgentAnimation(props: Omit<AnimationSelectorProps, 'moduleId'>) {
  return <AnimationSelector moduleId={MODULE_IDS.REVIEW} {...props} />;
}

export default AnimationSelector;
