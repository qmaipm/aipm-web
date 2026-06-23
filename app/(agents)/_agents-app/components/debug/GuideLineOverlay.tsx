'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * 基于真实 DOM 的参照线调试覆盖层 v2.0
 * 
 * 核心设计原则：
 * - 参照线位置直接从实际 DOM 元素获取，而非独立计算
 * - G1/G5 = 内容容器的左右边界
 * - G3 = 动画区的左边界（与左列的右边界对齐）
 * - G4 = 动画区中央容器的中心点
 * - 这样无论视口如何变化，参照线永远与实际内容对齐
 * 
 * 按 Ctrl+G 显示/隐藏参照线
 */

interface GuidePositions {
  G1: number;  // 内容区左边界
  G2: number;  // 第1列与第2列分界
  G3: number;  // 动画区左边界（第2列与第3列分界）
  G4: number;  // 动画区中心
  G5: number;  // 内容区右边界
  viewportWidth: number;
  layoutWidth: number;
  source: 'dom' | 'calculated';  // 标记数据来源
}

export default function GuideLineOverlay() {
  const [visible, setVisible] = useState(false);
  const [guides, setGuides] = useState<GuidePositions>({
    G1: 0, G2: 0, G3: 0, G4: 0, G5: 0,
    viewportWidth: 0,
    layoutWidth: 0,
    source: 'calculated',
  });

  /**
   * 从实际 DOM 元素获取参照线位置
   * 这是关键：不再独立计算，而是直接读取真实渲染的位置
   */
  const getGuidesFromDOM = useCallback(() => {
    const viewportWidth = window.innerWidth;
    
    // 尝试获取关键 DOM 元素
    const wrapper = document.querySelector('.product-section-wrapper');
    const leftColumn = document.querySelector('.product-list-column');
    const rightColumn = document.querySelector('.product-visual-column');
    const centralContainer = document.querySelector('.stripe-central-container');
    const logoContainer = document.querySelector('.clients-container');
    
    // 如果找到了主要容器元素，从 DOM 获取位置
    if (wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const G1 = wrapperRect.left;
      const G5 = wrapperRect.right;
      const layoutWidth = wrapperRect.width;
      
      let G3 = G1 + layoutWidth / 2; // 默认：中点
      let G4 = G1 + layoutWidth * 0.75; // 默认：75% 位置
      
      // 如果有左右列，获取精确的 G3
      if (leftColumn && rightColumn) {
        const leftRect = leftColumn.getBoundingClientRect();
        const rightRect = rightColumn.getBoundingClientRect();
        G3 = rightRect.left; // 动画区左边界
        G4 = (rightRect.left + rightRect.right) / 2; // 动画区中心
      }
      
      // 如果有中央容器，获取更精确的 G4
      if (centralContainer) {
        const containerRect = centralContainer.getBoundingClientRect();
        G4 = (containerRect.left + containerRect.right) / 2;
      }
      
      // G2 = G1 和 G3 的中点（第1列与第2列分界）
      const G2 = (G1 + G3) / 2;
      
      setGuides({
        G1,
        G2,
        G3,
        G4,
        G5,
        viewportWidth,
        layoutWidth,
        source: 'dom',
      });
      return;
    }
    
    // 备选：尝试从 Logo 容器获取
    if (logoContainer) {
      const logoRect = logoContainer.getBoundingClientRect();
      const G1 = logoRect.left;
      const G5 = logoRect.right;
      const layoutWidth = logoRect.width;
      const G3 = G1 + layoutWidth / 2;
      const G4 = G1 + layoutWidth * 0.75;
      const G2 = (G1 + G3) / 2;
      
      setGuides({
        G1,
        G2,
        G3,
        G4,
        G5,
        viewportWidth,
        layoutWidth,
        source: 'dom',
      });
      return;
    }
    
    // 最后备选：使用计算值（与 CSS 变量保持一致）
    const layoutMaxWidth = 1080;
    const layoutWidth = Math.min(layoutMaxWidth, viewportWidth - 32);
    const sideMargin = (viewportWidth - layoutWidth) / 2;
    const columnWidth = layoutWidth / 4;
    
    setGuides({
      G1: sideMargin,
      G2: sideMargin + columnWidth,
      G3: sideMargin + columnWidth * 2,
      G4: sideMargin + columnWidth * 3,
      G5: sideMargin + layoutWidth,
      viewportWidth,
      layoutWidth,
      source: 'calculated',
    });
  }, []);

  useEffect(() => {
    // 初始获取
    getGuidesFromDOM();
    
    // 监听窗口大小变化
    window.addEventListener('resize', getGuidesFromDOM);
    
    // 监听滚动（因为某些元素可能在滚动后才可见）
    window.addEventListener('scroll', getGuidesFromDOM);
    
    // 监听键盘快捷键 Ctrl+G
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        setVisible(v => {
          // 切换显示时重新获取位置
          if (!v) {
            setTimeout(getGuidesFromDOM, 50);
          }
          return !v;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver(() => {
      getGuidesFromDOM();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('resize', getGuidesFromDOM);
      window.removeEventListener('scroll', getGuidesFromDOM);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [getGuidesFromDOM]);

  if (!visible) return null;

  const guideLines = [
    { name: 'G1', x: guides.G1, color: '#0070FF', desc: '左边界', width: 1, opacity: 0.5 },
    { name: 'G2', x: guides.G2, color: '#00BFFF', desc: '第1列末', width: 1, opacity: 0.4 },
    { name: 'G3', x: guides.G3, color: '#00FF00', desc: '动画区起', width: 2, opacity: 0.7 },
    { name: 'G4', x: guides.G4, color: '#FF0000', desc: '中心线', width: 3, opacity: 0.9 },
    { name: 'G5', x: guides.G5, color: '#0070FF', desc: '右边界', width: 1, opacity: 0.5 },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    >
      {/* 参照线 */}
      {guideLines.map(({ name, x, color, desc, width, opacity }) => (
        <div key={name}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: x - (width / 2), // 居中线条
              width: `${width}px`,
              height: '100%',
              background: color,
              opacity: opacity,
              boxShadow: name === 'G4' ? `0 0 10px ${color}` : 'none', // G4 发光效果
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: name === 'G4' ? 50 : (name === 'G3' ? 30 : 10),
              left: x + 4,
              background: 'white',
              padding: '2px 6px',
              fontSize: '10px',
              fontWeight: 'bold',
              color: color,
              borderRadius: '2px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            {name} ({Math.round(x)}px) - {desc}
          </div>
        </div>
      ))}

      {/* 信息面板 */}
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '11px',
          fontFamily: 'monospace',
          lineHeight: 1.6,
          pointerEvents: 'auto',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#4ade80' }}>
          🔍 栅格调试 v2.0 (Ctrl+G 关闭)
        </div>
        <div style={{ color: guides.source === 'dom' ? '#4ade80' : '#fbbf24' }}>
          数据来源: {guides.source === 'dom' ? '✅ 真实 DOM' : '⚠️ 计算值'}
        </div>
        <div>视口宽度: {guides.viewportWidth}px</div>
        <div>布局宽度: {Math.round(guides.layoutWidth)}px</div>
        <div style={{ marginTop: '8px', borderTop: '1px solid #444', paddingTop: '8px' }}>
          <div style={{ color: '#60a5fa' }}>G1: {Math.round(guides.G1)}px (左边界)</div>
          <div style={{ color: '#00BFFF' }}>G2: {Math.round(guides.G2)}px (第1列末)</div>
          <div style={{ color: '#00FF88' }}>G3: {Math.round(guides.G3)}px (动画区起)</div>
          <div style={{ color: '#f87171', fontWeight: 'bold' }}>G4: {Math.round(guides.G4)}px (中心线)</div>
          <div style={{ color: '#60a5fa' }}>G5: {Math.round(guides.G5)}px (右边界)</div>
        </div>
        <div style={{ marginTop: '8px', borderTop: '1px solid #444', paddingTop: '8px', fontSize: '9px', color: '#888' }}>
          <div>G4 应穿过白色卡片中心</div>
          <div>G3 应在动画区左边缘</div>
        </div>
      </div>
    </div>
  );
}
