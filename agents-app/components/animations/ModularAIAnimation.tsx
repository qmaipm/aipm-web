'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ==========================================
// 启盟动画系统 - 模块化AI解决方案动画
// 遵循动画规则手册 v1.0
// ==========================================

// 图标定义 - 所有产品和Agent的SVG图标
const ProductIcons = {
  // 4个Agent图标
  serviceDesign: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  operations: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 产品图标
  space: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  serviceConfig: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 4l-4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ssr: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 10h10M7 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  collaboration: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="15" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 18c0-3 3-5 6-5s6 2 6 5M15 13c3 0 6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  device: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  inspect: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  assistant: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2a7 7 0 017 7v3a7 7 0 11-14 0V9a7 7 0 017-7z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 9h.01M16 9h.01M9 13c.5 1 1.5 2 3 2s2.5-1 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  salary: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="12" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="16" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

// ==========================================
// 网格配置 - 4x4 布局
// ==========================================
interface GridItem {
  id: string;
  name: string;
  icon: keyof typeof ProductIcons;
  color: string;
  col: number;
  row: number;
  isAgent: boolean;
}

// 4x4网格布局 - 4个Agent在中间区域，产品围绕
const gridItems: GridItem[] = [
  // 第一行：产品
  { id: 'space', name: '空间管理', icon: 'space', color: '#0070FF', col: 0, row: 0, isAgent: false },
  { id: 'serviceConfig', name: '服务配置', icon: 'serviceConfig', color: '#0070FF', col: 1, row: 0, isAgent: false },
  { id: 'ssr', name: 'SSR记录', icon: 'ssr', color: '#10B981', col: 2, row: 0, isAgent: false },
  { id: 'ticket', name: '工单调度', icon: 'ticket', color: '#10B981', col: 3, row: 0, isAgent: false },
  
  // 第二行：产品 + Agent
  { id: 'api', name: 'API平台', icon: 'api', color: '#6B7280', col: 0, row: 1, isAgent: false },
  { id: 'serviceDesign', name: '服务设计', icon: 'serviceDesign', color: '#0070FF', col: 1, row: 1, isAgent: true },
  { id: 'operations', name: '运营管理', icon: 'operations', color: '#10B981', col: 2, row: 1, isAgent: true },
  { id: 'collaboration', name: '人机协同', icon: 'collaboration', color: '#10B981', col: 3, row: 1, isAgent: false },
  
  // 第三行：产品 + Agent  
  { id: 'assistant', name: '小智助手', icon: 'assistant', color: '#8B5CF6', col: 0, row: 2, isAgent: false },
  { id: 'quality', name: '质量评估', icon: 'quality', color: '#8B5CF6', col: 1, row: 2, isAgent: true },
  { id: 'review', name: '复盘优化', icon: 'review', color: '#F59E0B', col: 2, row: 2, isAgent: true },
  { id: 'salary', name: '计薪系统', icon: 'salary', color: '#F59E0B', col: 3, row: 2, isAgent: false },
  
  // 第四行：产品
  { id: 'device', name: '设备管理', icon: 'device', color: '#8B5CF6', col: 0, row: 3, isAgent: false },
  { id: 'inspect', name: '多模态巡检', icon: 'inspect', color: '#8B5CF6', col: 1, row: 3, isAgent: false },
  { id: 'dashboard', name: '数据大屏', icon: 'dashboard', color: '#F59E0B', col: 2, row: 3, isAgent: false },
];

// Agent连接配置
interface Connection {
  agentId: string;
  productId: string;
}

const connections: Connection[] = [
  // 服务设计Agent（蓝色）
  { agentId: 'serviceDesign', productId: 'space' },
  { agentId: 'serviceDesign', productId: 'serviceConfig' },
  // 运营管理Agent（绿色）
  { agentId: 'operations', productId: 'ssr' },
  { agentId: 'operations', productId: 'ticket' },
  { agentId: 'operations', productId: 'collaboration' },
  // 质量评估Agent（紫色）
  { agentId: 'quality', productId: 'device' },
  { agentId: 'quality', productId: 'inspect' },
  { agentId: 'quality', productId: 'assistant' },
  // 复盘优化Agent（橙色）
  { agentId: 'review', productId: 'salary' },
  { agentId: 'review', productId: 'dashboard' },
];

// Agent轮播顺序
const agentOrder = ['serviceDesign', 'operations', 'quality', 'review'];

// ==========================================
// 主组件
// ==========================================
export default function ModularAIAnimation() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [activeProducts, setActiveProducts] = useState<string[]>([]);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'connecting' | 'lit' | 'fading'>('idle');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lineProgress, setLineProgress] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const agentIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 监听容器尺寸变化
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    // 初始化后再次更新
    const timer = setTimeout(updateSize, 100);
    
    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
    };
  }, []);
  
  // 获取某个Agent的所有连接产品
  const getConnectedProducts = useCallback((agentId: string): string[] => {
    return connections
      .filter(c => c.agentId === agentId)
      .map(c => c.productId);
  }, []);
  
  // 按照规则手册的时序激活Agent
  const activateAgent = useCallback((agentId: string) => {
    // T0: Agent变彩色
    setActiveAgent(agentId);
    setAnimationPhase('connecting');
    setLineProgress(0);
    
    // T100ms: 线开始生长
    const growLine = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.05;
        setLineProgress(Math.min(progress, 1));
        if (progress >= 1) clearInterval(interval);
      }, 25);
    };
    setTimeout(growLine, 100);
    
    // T600ms: 第一个Product激活（线长至60%时）
    // T780ms, T960ms: 后续Product依次激活
    setTimeout(() => {
      const products = getConnectedProducts(agentId);
      setActiveProducts([products[0]].filter(Boolean));
    }, 600);
    
    setTimeout(() => {
      const products = getConnectedProducts(agentId);
      setActiveProducts(products.slice(0, 2));
    }, 780);
    
    setTimeout(() => {
      const products = getConnectedProducts(agentId);
      setActiveProducts(products);
      setAnimationPhase('lit');
    }, 960);
    
    // T3200ms: 开始熄灭 - Agent先熄灭
    setTimeout(() => {
      setAnimationPhase('fading');
    }, 3200);
    
    // T3280ms: 线开始收缩
    const shrinkLine = () => {
      let progress = 1;
      const interval = setInterval(() => {
        progress -= 0.05;
        setLineProgress(Math.max(progress, 0));
        if (progress <= 0) clearInterval(interval);
      }, 25);
    };
    setTimeout(shrinkLine, 3280);
    
    // T3680ms: Product熄灭
    setTimeout(() => {
      setActiveProducts([]);
    }, 3680);
    
    // T3980ms: 完全结束
    setTimeout(() => {
      setActiveAgent(null);
      setAnimationPhase('idle');
      setLineProgress(0);
    }, 3980);
  }, [getConnectedProducts]);
  
  // 自动轮播
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const runCycle = () => {
      const currentAgent = agentOrder[agentIndexRef.current];
      activateAgent(currentAgent);
      agentIndexRef.current = (agentIndexRef.current + 1) % agentOrder.length;
    };
    
    // 首次启动延迟
    const startDelay = setTimeout(() => {
      runCycle();
      // 每个周期约4秒 + 300ms间隔
      autoPlayRef.current = setInterval(runCycle, 4300);
    }, 500);
    
    return () => {
      clearTimeout(startDelay);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, activateAgent]);
  
  // 鼠标悬停处理
  const handleMouseEnter = (itemId: string) => {
    setHoveredItem(itemId);
    const item = gridItems.find(i => i.id === itemId);
    
    if (item?.isAgent) {
      // 暂停自动播放
      setIsAutoPlaying(false);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      activateAgent(itemId);
    }
  };
  
  const handleMouseLeave = () => {
    setHoveredItem(null);
    // 延迟恢复自动播放
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 4500);
  };
  
  // 判断item是否点亮
  const isItemLit = (itemId: string): boolean => {
    if (activeAgent === itemId) return true;
    if (activeProducts.includes(itemId)) return true;
    return false;
  };
  
  // 计算容器内的实际像素坐标
  const getItemCenter = useCallback((item: GridItem, containerWidth: number, containerHeight: number) => {
    const cellWidth = (containerWidth - 8 * 5) / 4; // 4列，5个间隙（含边距）
    const cellHeight = (containerHeight - 8 * 5) / 4;
    const gap = 8;
    
    return {
      x: 8 + item.col * (cellWidth + gap) + cellWidth / 2,
      y: 8 + item.row * (cellHeight + gap) + cellHeight / 2,
    };
  }, []);
  
  // 计算90度折线路径 - 像素坐标版本
  const calculatePath = useCallback((fromItem: GridItem, toItem: GridItem, width: number, height: number): string => {
    const from = getItemCenter(fromItem, width, height);
    const to = getItemCenter(toItem, width, height);
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    
    // 相同位置
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return '';
    
    // 水平或垂直直线
    if (Math.abs(dx) < 5) {
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
    if (Math.abs(dy) < 5) {
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
    
    // L型折线：先水平后垂直，圆角拐弯
    const r = 10; // 圆角半径
    const dirX = dx > 0 ? 1 : -1;
    const dirY = dy > 0 ? 1 : -1;
    
    const midX = to.x;
    const midY = from.y;
    
    // 确保圆角不超过距离
    const actualR = Math.min(r, Math.abs(dx) / 2, Math.abs(dy) / 2);
    
    return `M ${from.x} ${from.y} 
            L ${midX - actualR * dirX} ${midY} 
            Q ${midX} ${midY} ${midX} ${midY + actualR * dirY}
            L ${to.x} ${to.y}`;
  }, [getItemCenter]);
  
  // 获取当前连接线
  const activeConnections = activeAgent 
    ? connections.filter(c => c.agentId === activeAgent)
    : [];
  
  return (
    <div 
      ref={containerRef}
      className="modular-ai-animation"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '480px',
        padding: '12px',
        boxSizing: 'border-box',
      }}
    >
      {/* SVG连接线层 - 使用实际像素坐标 */}
      <svg 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'visible',
        }}
      >
        <defs>
          {/* 发光效果 */}
          <filter id="lineGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* 渐变定义 */}
          {activeConnections.map((conn, idx) => {
            const agent = gridItems.find(i => i.id === conn.agentId);
            if (!agent) return null;
            return (
              <linearGradient key={`grad-${idx}`} id={`gradient-${idx}`}>
                <stop offset="0%" stopColor={agent.color} stopOpacity="0.8"/>
                <stop offset="100%" stopColor={agent.color} stopOpacity="1"/>
              </linearGradient>
            );
          })}
        </defs>
        
        {containerSize.width > 0 && activeConnections.map((conn, idx) => {
          const agent = gridItems.find(i => i.id === conn.agentId);
          const product = gridItems.find(i => i.id === conn.productId);
          if (!agent || !product) return null;
          
          const pathD = calculatePath(agent, product, containerSize.width, containerSize.height);
          if (!pathD) return null;
          
          return (
            <g key={`line-${idx}`}>
              {/* 背景辉光 */}
              <path
                d={pathD}
                fill="none"
                stroke={agent.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.15 * lineProgress}
                style={{ transition: 'opacity 0.3s ease' }}
              />
              {/* 主连接线 */}
              <path
                d={pathD}
                fill="none"
                stroke={agent.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2000"
                strokeDashoffset={2000 - lineProgress * 2000}
                filter="url(#lineGlow)"
                style={{
                  transition: animationPhase === 'fading' ? 'stroke-dashoffset 0.5s ease-out' : 'none',
                }}
              />
              {/* 端点圆圈 - Agent端 */}
              {lineProgress > 0.1 && (
                <circle
                  cx={getItemCenter(agent, containerSize.width, containerSize.height).x}
                  cy={getItemCenter(agent, containerSize.width, containerSize.height).y}
                  r="4"
                  fill={agent.color}
                  opacity={lineProgress}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              )}
              {/* 端点圆圈 - Product端 */}
              {lineProgress > 0.8 && (
                <circle
                  cx={getItemCenter(product, containerSize.width, containerSize.height).x}
                  cy={getItemCenter(product, containerSize.width, containerSize.height).y}
                  r="4"
                  fill={agent.color}
                  opacity={Math.min(1, (lineProgress - 0.8) * 5)}
                  style={{ transition: 'opacity 0.3s ease' }}
                />
              )}
            </g>
          );
        })}
      </svg>
      
      {/* 网格容器 */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '8px',
        zIndex: 2,
      }}>
        {gridItems.map(item => {
          const lit = isItemLit(item.id);
          const isAgent = item.isAgent;
          const isHovered = hoveredItem === item.id;
          
          return (
            <div
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              style={{
                gridColumn: item.col + 1,
                gridRow: item.row + 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '8px 4px',
                borderRadius: '12px',
                border: `1.5px solid ${lit ? item.color : '#E5E7EB'}`,
                backgroundColor: isAgent && lit ? `${item.color}15` : 'white',
                cursor: isAgent ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                transform: lit ? 'translateY(-2px)' : 'none',
                boxShadow: lit 
                  ? `0 4px 12px ${item.color}30` 
                  : isHovered 
                    ? '0 2px 8px rgba(0,0,0,0.08)' 
                    : 'none',
              }}
            >
              {/* 图标 */}
              <div style={{
                width: '28px',
                height: '28px',
                color: lit ? item.color : '#9CA3AF',
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: lit ? 'scale(1.1)' : 'scale(1)',
              }}>
                {ProductIcons[item.icon]}
              </div>
              
              {/* 名称 - 始终显示但点亮时更明显 */}
              <span style={{
                fontSize: '11px',
                fontWeight: lit ? 600 : 400,
                color: lit ? item.color : '#9CA3AF',
                textAlign: 'center',
                lineHeight: 1.2,
                transition: 'all 0.3s ease',
                opacity: lit ? 1 : 0.7,
              }}>
                {item.name}
              </span>
              
              {/* Agent标识 */}
              {isAgent && (
                <div style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: lit ? item.color : '#D1D5DB',
                  transition: 'background-color 0.3s ease',
                }}/>
              )}
            </div>
          );
        })}
        
        {/* 空位占位 */}
        <div style={{
          gridColumn: 4,
          gridRow: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          border: '1.5px dashed #E5E7EB',
          backgroundColor: '#FAFAFA',
        }}>
          <span style={{ color: '#D1D5DB', fontSize: '10px' }}>...</span>
        </div>
      </div>
    </div>
  );
}
