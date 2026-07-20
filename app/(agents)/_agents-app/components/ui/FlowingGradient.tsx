'use client';

import { useState, useEffect } from 'react';

/**
 * 启盟科技 VI 流动渐变组件 v16
 * 
 * VI v10.0 品牌色彩系统
 * 五色平衡体系：蓝30% + 绿25% + 金20% + 紫15% + 粉10%
 * 
 * 三层架构：
 * 1. 锚定色块 - 确保多色始终可见
 * 2. 流动色带 - 使用 VI 六大核心渐变
 * 3. 融合增强层 - screen 混合增强边缘混色
 */

interface FlowingGradientProps {
  speed?: number;
  blur?: number;
  saturate?: number;
  brightness?: number;
  className?: string;
}

// VI v10.0 品牌色彩系统
const VI_COLORS = {
  blue: '#0070FF',
  green: '#12B98A',
  gold: '#F59E0B',
  purple: '#9333EA',
  pink: '#EC4899',
  blueDark: '#0052CC',
  blueLight: '#3385FF',
  greenDark: '#0D8566',
  greenLight: '#1AB88A',
  goldDark: '#D97706',
  goldLight: '#FBBF24',
  purpleLight: '#A855F7',
  pinkLight: '#F472B6',
};

export default function FlowingGradient({
  speed = 3.0,
  blur = 60,
  saturate = 160,
  brightness = 105,
  className = '',
}: FlowingGradientProps) {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setTime(t => t + 0.016 * speed);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  // 锚定色块 - 按 VI 占比分布，确保多色共存
  const anchoredBlobs = [
    {
      id: 'anchor-blue',
      gradient: `radial-gradient(ellipse 100% 80% at 30% 40%, ${VI_COLORS.blueDark} 0%, ${VI_COLORS.blue}dd 35%, ${VI_COLORS.blueLight}88 70%, transparent 100%)`,
      baseX: -30, baseY: -35,
      driftX: 18, driftY: 14,
      speedX: 0.022, speedY: 0.018,
      phase: 0,
      width: 100, height: 130,
      blur: 65, opacity: 0.95,
    },
    {
      id: 'anchor-green',
      gradient: `radial-gradient(ellipse 90% 75% at 50% 45%, ${VI_COLORS.greenDark} 0%, ${VI_COLORS.green}dd 35%, ${VI_COLORS.greenLight}88 70%, transparent 100%)`,
      baseX: 10, baseY: -25,
      driftX: 16, driftY: 15,
      speedX: 0.025, speedY: 0.022,
      phase: 1.5,
      width: 90, height: 120,
      blur: 60, opacity: 0.9,
    },
    {
      id: 'anchor-gold',
      gradient: `radial-gradient(ellipse 85% 70% at 55% 50%, ${VI_COLORS.goldDark} 0%, ${VI_COLORS.gold}dd 35%, ${VI_COLORS.goldLight}88 70%, transparent 100%)`,
      baseX: 40, baseY: -20,
      driftX: 20, driftY: 16,
      speedX: 0.028, speedY: 0.025,
      phase: 3,
      width: 80, height: 105,
      blur: 55, opacity: 0.85,
    },
    {
      id: 'anchor-purple',
      gradient: `radial-gradient(ellipse 80% 65% at 45% 55%, ${VI_COLORS.purple} 0%, ${VI_COLORS.purpleLight}bb 40%, transparent 75%)`,
      baseX: -15, baseY: 5,
      driftX: 15, driftY: 18,
      speedX: 0.02, speedY: 0.026,
      phase: 4.5,
      width: 75, height: 100,
      blur: 52, opacity: 0.8,
    },
    {
      id: 'anchor-pink',
      gradient: `radial-gradient(ellipse 75% 60% at 50% 50%, ${VI_COLORS.pink} 0%, ${VI_COLORS.pinkLight}aa 40%, transparent 70%)`,
      baseX: 25, baseY: 0,
      driftX: 18, driftY: 14,
      speedX: 0.024, speedY: 0.028,
      phase: 2.5,
      width: 65, height: 85,
      blur: 48, opacity: 0.75,
    },
  ];

  // 流动色带 - 使用 VI 六大核心渐变
  const flowingBands = [
    {
      id: 'flow-blue-green',
      gradient: `linear-gradient(135deg, ${VI_COLORS.blueDark} 0%, ${VI_COLORS.blue} 25%, ${VI_COLORS.greenDark} 60%, ${VI_COLORS.green}cc 85%, ${VI_COLORS.greenLight}66 100%)`,
      baseX: -35, baseY: -45,
      flowX: 75, flowY: 55,
      speedX: 0.035, speedY: 0.028,
      phase: 0,
      width: 135, height: 185,
      rotation: -28, blur: 72, opacity: 0.88,
    },
    {
      id: 'flow-green-gold',
      gradient: `linear-gradient(140deg, ${VI_COLORS.green}ee 0%, ${VI_COLORS.greenLight} 30%, ${VI_COLORS.goldDark} 65%, ${VI_COLORS.gold}cc 85%, ${VI_COLORS.goldLight}88 100%)`,
      baseX: 25, baseY: -40,
      flowX: 70, flowY: 60,
      speedX: 0.04, speedY: 0.032,
      phase: 2.1,
      width: 125, height: 175,
      rotation: -35, blur: 68, opacity: 0.85,
    },
    {
      id: 'flow-blue-purple',
      gradient: `linear-gradient(145deg, ${VI_COLORS.blue}ee 0%, ${VI_COLORS.blueLight} 35%, ${VI_COLORS.purple}cc 70%, ${VI_COLORS.purpleLight}88 100%)`,
      baseX: -25, baseY: 0,
      flowX: 65, flowY: 50,
      speedX: 0.038, speedY: 0.04,
      phase: 4.2,
      width: 115, height: 155,
      rotation: -22, blur: 65, opacity: 0.8,
    },
    {
      id: 'flow-purple-pink',
      gradient: `linear-gradient(150deg, ${VI_COLORS.purple}dd 0%, ${VI_COLORS.purpleLight} 40%, ${VI_COLORS.pink}cc 75%, ${VI_COLORS.pinkLight}88 100%)`,
      baseX: 15, baseY: -15,
      flowX: 60, flowY: 65,
      speedX: 0.032, speedY: 0.038,
      phase: 5.5,
      width: 105, height: 145,
      rotation: -40, blur: 60, opacity: 0.75,
    },
  ];

  // 融合增强层
  const blendLayers = [
    {
      id: 'blend-blue-green',
      gradient: `radial-gradient(ellipse 70% 55% at 50% 50%, ${VI_COLORS.green}cc 0%, ${VI_COLORS.blue}66 50%, transparent 70%)`,
      baseX: -5, baseY: -20,
      driftX: 28, driftY: 22,
      speedX: 0.042, speedY: 0.035,
      phase: 0.8,
      width: 75, height: 95,
      blur: 48, opacity: 0.65,
    },
    {
      id: 'blend-green-gold',
      gradient: `radial-gradient(ellipse 65% 50% at 50% 50%, ${VI_COLORS.gold}cc 0%, ${VI_COLORS.green}55 50%, transparent 70%)`,
      baseX: 30, baseY: -10,
      driftX: 24, driftY: 26,
      speedX: 0.038, speedY: 0.042,
      phase: 2.8,
      width: 70, height: 90,
      blur: 45, opacity: 0.6,
    },
    {
      id: 'blend-blue-purple',
      gradient: `radial-gradient(ellipse 60% 48% at 50% 50%, ${VI_COLORS.purple}bb 0%, ${VI_COLORS.blue}55 50%, transparent 70%)`,
      baseX: -18, baseY: -5,
      driftX: 22, driftY: 24,
      speedX: 0.035, speedY: 0.04,
      phase: 4.5,
      width: 65, height: 85,
      blur: 42, opacity: 0.55,
    },
    {
      id: 'blend-pink-gold',
      gradient: `radial-gradient(ellipse 55% 45% at 50% 50%, ${VI_COLORS.pink}aa 0%, ${VI_COLORS.gold}44 50%, transparent 70%)`,
      baseX: 35, baseY: 5,
      driftX: 20, driftY: 20,
      speedX: 0.04, speedY: 0.038,
      phase: 3.5,
      width: 60, height: 78,
      blur: 40, opacity: 0.5,
    },
  ];

  // 计算锚定色块位置
  const getAnchorPosition = (blob: typeof anchoredBlobs[0]) => {
    const x = blob.baseX + Math.sin(time * blob.speedX + blob.phase) * blob.driftX;
    const y = blob.baseY + Math.cos(time * blob.speedY + blob.phase * 0.8) * blob.driftY;
    const scale = 1 + Math.sin(time * 0.04 + blob.phase) * 0.06;
    return { x, y, scale };
  };

  // 计算流动色带位置
  const getBandPosition = (band: typeof flowingBands[0]) => {
    const x = band.baseX + 
      Math.sin(time * band.speedX + band.phase) * band.flowX * 0.7 +
      Math.sin(time * band.speedX * 0.6 + band.phase * 1.3) * band.flowX * 0.3;
    
    const y = band.baseY + 
      Math.cos(time * band.speedY + band.phase * 0.8) * band.flowY * 0.65 +
      Math.cos(time * band.speedY * 0.5 + band.phase * 1.5) * band.flowY * 0.35;
    
    const rotation = band.rotation + Math.sin(time * 0.025 + band.phase) * 10;
    const scale = 1 + Math.sin(time * 0.04 + band.phase * 0.6) * 0.1;
    
    return { x, y, rotation, scale };
  };

  // 计算融合层位置
  const getBlendPosition = (layer: typeof blendLayers[0]) => {
    const x = layer.baseX + Math.sin(time * layer.speedX + layer.phase) * layer.driftX;
    const y = layer.baseY + Math.cos(time * layer.speedY + layer.phase * 0.9) * layer.driftY;
    const scale = 1 + Math.sin(time * 0.05 + layer.phase) * 0.15;
    return { x, y, scale };
  };

  return (
    <div 
      className={`flowing-gradient ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        filter: `saturate(${saturate}%) brightness(${brightness}%)`,
      }}
    >
      {/* 底层：防止露白的大背景 */}
      <div style={{
        position: 'absolute',
        left: '-50%',
        top: '-50%',
        width: '200%',
        height: '200%',
        background: `linear-gradient(135deg, ${VI_COLORS.blueDark}ee 0%, ${VI_COLORS.blue}dd 25%, ${VI_COLORS.green}cc 50%, ${VI_COLORS.greenLight}bb 75%, ${VI_COLORS.blue}aa 100%)`,
        filter: 'blur(100px)',
        opacity: 0.9,
      }} />
      
      {/* 第一层：锚定色块 */}
      {anchoredBlobs.map((blob) => {
        const pos = getAnchorPosition(blob);
        return (
          <div
            key={blob.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${blob.width}%`,
              height: `${blob.height}%`,
              background: blob.gradient,
              transform: `scale(${pos.scale})`,
              filter: `blur(${blob.blur}px)`,
              opacity: blob.opacity,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          />
        );
      })}
      
      {/* 第二层：流动色带 */}
      {flowingBands.map((band) => {
        const pos = getBandPosition(band);
        return (
          <div
            key={band.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${band.width}%`,
              height: `${band.height}%`,
              background: band.gradient,
              transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
              filter: `blur(${band.blur}px)`,
              opacity: band.opacity,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
          />
        );
      })}
      
      {/* 第三层：融合增强层 */}
      {blendLayers.map((layer) => {
        const pos = getBlendPosition(layer);
        return (
          <div
            key={layer.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${layer.width}%`,
              height: `${layer.height}%`,
              background: layer.gradient,
              transform: `scale(${pos.scale})`,
              filter: `blur(${layer.blur}px)`,
              opacity: layer.opacity,
              transformOrigin: 'center center',
              willChange: 'transform',
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </div>
  );
}
