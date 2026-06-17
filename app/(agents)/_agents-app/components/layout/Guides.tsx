'use client';

/**
 * Guides 参照线组件 v4.0 - 与 GuideLineOverlay 完全统一
 * 
 * 核心原则：
 * - 参照线位置从实际 DOM 元素获取，而非 CSS 变量计算
 * - 与 GuideLineOverlay 使用【完全相同】的计算逻辑
 * - 确保虚线永远与调试线对齐
 * 
 * 参照线位置（与 GuideLineOverlay 完全一致）：
 * - G1: 内容区左边界 (wrapper.left)
 * - G2: G1 和 G3 的中点 ((G1 + G3) / 2) ← 关键：必须与调试线一致
 * - G3: 动画区左边界 (rightColumn.left)
 * - G4: 动画区中心 / 容器中心 (centralContainer.center)
 * - G5: 内容区右边界 (wrapper.right)
 * 
 * v4.0 更新：修复 G2 计算逻辑，确保与调试线完全一致
 */

import { useEffect, useState, useCallback } from 'react';

interface GuidePositions {
  G1: number;
  G2: number;
  G3: number;
  G4: number;
  G5: number;
  layoutWidth: number;
  columnWidth: number;
  source: 'dom' | 'calculated';
}

interface GuidesProps {
  /** 是否强制显示（默认仅开发环境显示） */
  forceShow?: boolean;
  /** 是否显示列区域背景 */
  showColumns?: boolean;
  /** 是否显示布局信息面板 */
  showInfo?: boolean;
}

export function Guides({
  forceShow = false,
  showColumns = false,
  showInfo = true,
}: GuidesProps) {
  const [show, setShow] = useState(false);
  const [guides, setGuides] = useState<GuidePositions>({
    G1: 0, G2: 0, G3: 0, G4: 0, G5: 0,
    layoutWidth: 0,
    columnWidth: 0,
    source: 'calculated',
  });

  /**
   * 从 DOM 获取参照线位置 - 与 GuideLineOverlay 使用【完全相同】的逻辑
   * 关键修复：G2 = (G1 + G3) / 2，不再使用 G1 + columnWidth
   */
  const getGuidesFromDOM = useCallback(() => {
    const viewportWidth = window.innerWidth;
    
    // 尝试从关键 DOM 元素获取位置
    const wrapper = document.querySelector('.product-section-wrapper');
    const leftColumn = document.querySelector('.product-list-column');
    const rightColumn = document.querySelector('.product-visual-column');
    const centralContainer = document.querySelector('.stripe-central-container');
    const logoContainer = document.querySelector('.clients-container');
    
    // 优先从 product-section-wrapper 获取
    if (wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const G1 = wrapperRect.left;
      const G5 = wrapperRect.right;
      const layoutWidth = wrapperRect.width;
      const columnWidth = layoutWidth / 4;
      
      let G3 = G1 + layoutWidth / 2; // 默认：中点
      let G4 = G1 + layoutWidth * 0.75; // 默认：75% 位置
      
      // 如果有左右列，获取精确的 G3 和 G4
      if (leftColumn && rightColumn) {
        const rightRect = rightColumn.getBoundingClientRect();
        G3 = rightRect.left; // 动画区左边界
        G4 = (rightRect.left + rightRect.right) / 2; // 动画区中心
      }
      
      // 如果有中央容器，获取更精确的 G4
      if (centralContainer) {
        const containerRect = centralContainer.getBoundingClientRect();
        G4 = (containerRect.left + containerRect.right) / 2;
      }
      
      // 关键修复：G2 = G1 和 G3 的中点，与 GuideLineOverlay 完全一致
      const G2 = (G1 + G3) / 2;
      
      setGuides({
        G1, G2, G3, G4, G5,
        layoutWidth,
        columnWidth,
        source: 'dom',
      });
      return;
    }
    
    // 备选：从 Logo 容器获取
    if (logoContainer) {
      const logoRect = logoContainer.getBoundingClientRect();
      const G1 = logoRect.left;
      const G5 = logoRect.right;
      const layoutWidth = logoRect.width;
      const G3 = G1 + layoutWidth / 2;
      const G4 = G1 + layoutWidth * 0.75;
      // 关键修复：G2 = (G1 + G3) / 2
      const G2 = (G1 + G3) / 2;
      
      setGuides({
        G1, G2, G3, G4, G5,
        layoutWidth,
        columnWidth: layoutWidth / 4,
        source: 'dom',
      });
      return;
    }
    
    // 最后备选：计算值（与 GuideLineOverlay 保持一致的逻辑）
    const layoutMaxWidth = 1080;
    const layoutWidth = Math.min(layoutMaxWidth, viewportWidth - 32);
    const sideMargin = (viewportWidth - layoutWidth) / 2;
    const columnWidth = layoutWidth / 4;
    
    // G3 先算出来，然后 G2 = (G1 + G3) / 2
    const G1 = sideMargin;
    const G3 = sideMargin + columnWidth * 2;
    const G2 = (G1 + G3) / 2; // 关键：与调试线一致
    const G4 = sideMargin + columnWidth * 3;
    const G5 = sideMargin + layoutWidth;
    
    setGuides({
      G1, G2, G3, G4, G5,
      layoutWidth,
      columnWidth,
      source: 'calculated',
    });
  }, []);

  useEffect(() => {
    // 检查是否应该显示
    const isDev = process.env.NODE_ENV === 'development';
    const urlParams = new URLSearchParams(window.location.search);
    const urlForceShow = urlParams.get('guides') === 'true';
    setShow(forceShow || isDev || urlForceShow);

    // 初始获取
    getGuidesFromDOM();
    
    // 监听变化
    window.addEventListener('resize', getGuidesFromDOM);
    window.addEventListener('scroll', getGuidesFromDOM);
    
    // 监听 DOM 变化
    const observer = new MutationObserver(() => {
      getGuidesFromDOM();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('resize', getGuidesFromDOM);
      window.removeEventListener('scroll', getGuidesFromDOM);
      observer.disconnect();
    };
  }, [forceShow, getGuidesFromDOM]);

  if (!show) return null;

  // Stripe 风格参照线样式：淡色虚线
  const guideStyle = (x: number): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: x,
    width: '1px',
    background: 'repeating-linear-gradient(to bottom, rgba(0, 112, 255, 0.08) 0px, rgba(0, 112, 255, 0.08) 4px, transparent 4px, transparent 8px)',
    pointerEvents: 'none',
    zIndex: 1,
  });

  const columnStyle = (left: number, width: number): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left,
    width,
    backgroundColor: 'rgba(0, 112, 255, 0.02)',
    pointerEvents: 'none',
    zIndex: 0,
  });

  return (
    <>
      {/* 参照线容器 */}
      <div
        className="guides-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* 5条参照线 - 使用与 GuideLineOverlay 完全相同的位置 */}
        <div style={guideStyle(guides.G1)} data-guide="1" title="G1 - 内容区左边界" />
        <div style={guideStyle(guides.G2)} data-guide="2" title="G2 - G1与G3的中点" />
        <div style={guideStyle(guides.G3)} data-guide="3" title="G3 - 动画区左边界" />
        <div style={guideStyle(guides.G4)} data-guide="4" title="G4 - 动画区中心" />
        <div style={guideStyle(guides.G5)} data-guide="5" title="G5 - 内容区右边界" />

        {/* 可选：列区域背景 */}
        {showColumns && (
          <>
            <div style={columnStyle(guides.G1, guides.columnWidth)} />
            <div style={columnStyle(guides.G2, guides.columnWidth)} />
            <div style={columnStyle(guides.G3, guides.columnWidth)} />
            <div style={columnStyle(guides.G4, guides.columnWidth)} />
          </>
        )}
      </div>

      {/* 布局信息面板 */}
      {showInfo && process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            padding: '12px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            color: '#fff',
            fontSize: '11px',
            fontFamily: 'monospace',
            borderRadius: '8px',
            zIndex: 10000,
            pointerEvents: 'none',
            lineHeight: 1.5,
            maxWidth: '220px',
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#0070FF', fontSize: '12px' }}>
            📐 Stripe Layout v4.0
          </div>
          <div style={{ color: guides.source === 'dom' ? '#4ade80' : '#fbbf24' }}>
            来源: {guides.source === 'dom' ? '✅ DOM' : '⚠️ 计算'}
          </div>
          <div>视窗: {typeof window !== 'undefined' ? window.innerWidth : 0}px</div>
          <div>内容区: {Math.round(guides.layoutWidth)}px</div>
          <div>列宽: {Math.round(guides.columnWidth)}px</div>
          <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <span style={{ color: '#F59E0B' }}>Guide-4:</span> {Math.round(guides.G4)}px
          </div>
          <div style={{ marginTop: '4px', fontSize: '10px', color: '#888' }}>
            虚线与调试线完全同步
          </div>
        </div>
      )}
    </>
  );
}

export default Guides;
