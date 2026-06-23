/**
 * 动画组件核心模块导出
 * 
 * 使用示例：
 * 
 * ```tsx
 * import { AnimationSelector, MODULE_IDS } from '@hp/components/animations/core';
 * 
 * // 方式1: 使用 AnimationSelector
 * <AnimationSelector moduleId={MODULE_IDS.SERVICE_DESIGN} isActive={true} />
 * 
 * // 方式2: 使用便捷组件
 * <ServiceDesignAgentAnimation isActive={true} />
 * 
 * // 方式3: 使用 AnimationWrapper 包装自定义动画
 * <AnimationWrapper enableGLineAlign alignTo="G3">
 *   <CustomAnimation />
 * </AnimationWrapper>
 * ```
 */

// 类型定义
export * from './types';

// 工具函数
export * from './utils';

// 动画组件注册表
export { 
  AnimationRegistry, 
  getAnimationComponent,
  MODULE_IDS,
  ANIMATION_IDS,
  getAnimationIdForModule,
  type ModuleId,
  type AnimationId,
} from './registry';

// 动画组件封装器
export { AnimationWrapper } from './AnimationWrapper';

// 动画组件选择器
export { 
  AnimationSelector,
  ModularAIAnimation,
  ServiceDesignAgentAnimation,
  OperationsAgentAnimation,
  QualityAgentAnimation,
  ReviewAgentAnimation,
  type AnimationSelectorProps,
} from './AnimationSelector';
