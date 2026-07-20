/**
 * 动画组件注册系统
 * 
 * 提供动画组件的注册、查找和管理功能
 * 支持按 ID 或模块类型获取对应的动画组件
 */

import { ComponentType } from 'react';
import { AnimationComponentProps, AnimationComponentMeta } from './types';

/**
 * 动画组件注册项
 */
interface AnimationRegistryEntry {
  meta: AnimationComponentMeta;
  component: ComponentType<AnimationComponentProps>;
}

/**
 * 动画组件注册表
 */
class AnimationRegistryClass {
  private registry: Map<string, AnimationRegistryEntry> = new Map();

  /**
   * 注册动画组件
   * @param meta 组件元数据
   * @param component 组件类
   */
  register(
    meta: AnimationComponentMeta,
    component: ComponentType<AnimationComponentProps>
  ): void {
    this.registry.set(meta.id, { meta, component });
  }

  /**
   * 获取动画组件
   * @param id 组件 ID
   * @returns 组件类或 undefined
   */
  get(id: string): ComponentType<AnimationComponentProps> | undefined {
    return this.registry.get(id)?.component;
  }

  /**
   * 获取组件元数据
   * @param id 组件 ID
   * @returns 元数据或 undefined
   */
  getMeta(id: string): AnimationComponentMeta | undefined {
    return this.registry.get(id)?.meta;
  }

  /**
   * 获取所有注册的组件 ID
   * @returns 组件 ID 列表
   */
  getAll(): string[] {
    return Array.from(this.registry.keys());
  }

  /**
   * 检查组件是否已注册
   * @param id 组件 ID
   * @returns 是否已注册
   */
  has(id: string): boolean {
    return this.registry.has(id);
  }
}

// 导出单例
export const AnimationRegistry = new AnimationRegistryClass();

/**
 * 便捷函数：获取动画组件
 * @param id 组件 ID
 * @returns 组件类或 undefined
 */
export function getAnimationComponent(
  id: string
): ComponentType<AnimationComponentProps> | undefined {
  return AnimationRegistry.get(id);
}

// ==========================================
// 模块 ID 到动画组件的映射
// ==========================================

/**
 * 模块 ID 常量
 */
export const MODULE_IDS = {
  MODULAR_AI: 'modular-ai',
  SERVICE_DESIGN: 'service-design',
  OPERATIONS: 'operations',
  QUALITY: 'quality',
  REVIEW: 'review',
} as const;

export type ModuleId = typeof MODULE_IDS[keyof typeof MODULE_IDS];

/**
 * 动画组件 ID 常量
 */
export const ANIMATION_IDS = {
  SUITE_GRID: 'suite-grid',
  SERVICE_DESIGN: 'service-design',
  OPERATIONS: 'operations',
  STRIPE_STYLE: 'stripe-style',
} as const;

export type AnimationId = typeof ANIMATION_IDS[keyof typeof ANIMATION_IDS];

/**
 * 模块 ID 到动画组件 ID 的映射
 */
export const MODULE_TO_ANIMATION: Record<ModuleId, AnimationId> = {
  [MODULE_IDS.MODULAR_AI]: ANIMATION_IDS.SUITE_GRID,
  [MODULE_IDS.SERVICE_DESIGN]: ANIMATION_IDS.SERVICE_DESIGN,
  [MODULE_IDS.OPERATIONS]: ANIMATION_IDS.OPERATIONS,
  [MODULE_IDS.QUALITY]: ANIMATION_IDS.STRIPE_STYLE,
  [MODULE_IDS.REVIEW]: ANIMATION_IDS.STRIPE_STYLE,
};

/**
 * 获取模块对应的动画组件 ID
 * @param moduleId 模块 ID
 * @returns 动画组件 ID
 */
export function getAnimationIdForModule(moduleId: ModuleId): AnimationId {
  return MODULE_TO_ANIMATION[moduleId];
}
