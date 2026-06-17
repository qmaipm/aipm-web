'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  AnimationSelector, 
  MODULE_IDS,
  type ModuleId,
} from '../animations/core';

// SVG 图标组件
const Icons = {
  // 核心 Agent 图标
  agentDesign: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="6" r="3" fill="#10B981"/>
    </svg>
  ),
  agentOps: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  agentQuality: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8.5 12L10.5 14L15.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  agentReview: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
  // 模块化AI图标
  modularAI: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
  // 箭头图标
  arrow: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// ==========================================
// 产品区数据 - 共5个模块（模块化AI + 4个Agent）
// ==========================================
const productModules = [
  // 第一个模块：模块化AI解决方案
  {
    id: 'modular-ai',
    name: '模块化 AI 解决方案',
    icon: 'modularAI',
    color: '#0070FF',
    headline: '一体化物业管理 AI 产品套件',
    description: '使用一个完全集成的 AI 驱动平台，降低成本，提升质量，更高效的运营你的物业服务。让 AI 物业经理处理从规划到执行到复盘的全流程，助力推出新的服务模式。',
    cta: null,
    ctaLink: null,
    relatedProducts: [],
    // Stripe风格动画配置：周边小图标是产品套件
    animationConfig: {
      relatedProducts: [
        { name: '空间管理', href: '/products/space', icon: 'space' as const },
        { name: '服务配置', href: '/products/service-config', icon: 'serviceConfig' as const },
        { name: 'API平台', href: '/products/api', icon: 'api' as const },
        { name: '数据中心', href: '/products/data', icon: 'dashboard' as const },
      ],
    },
    isHero: true,
  },
  // 第二个模块：服务设计 Agent
  {
    id: 'service-design',
    name: '服务设计 Agent',
    icon: 'agentDesign',
    color: '#0070FF',
    headline: '智能生成服务标准，重构服务设计流程',
    description: 'AI 智能生成服务标准、人员编制和预算方案，用远低于现在的成本，获得更加快速、精准的数字化服务设计能力。',
    cta: '开始使用服务设计 Agent',
    ctaLink: '/solutions/service-design',
    relatedProducts: [
      { name: '空间管理系统', desc: '空间配置与标准生成', href: '/products/space' },
      { name: '服务配置系统', desc: '服务流程与标准设计', href: '/products/service-config' },
      { name: 'API 开放平台', desc: '标准数据接口', href: '/products/api' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: '空间管理系统', href: '/products/space', icon: 'space' as const },
        { name: '服务配置系统', href: '/products/service-config', icon: 'serviceConfig' as const },
        { name: 'API 开放平台', href: '/products/api', icon: 'api' as const },
      ],
    },
    isHero: false,
  },
  // 第三个模块：运营管理 Agent
  {
    id: 'operations',
    name: '运营管理 Agent',
    icon: 'agentOps',
    color: '#10B981',
    headline: 'AI 驱动运营调度，实现人机协同闭环',
    description: '7×24 实时感知全域服务状态，确保执行与巡检到位，数据驱动管理决策，让团队专注更具价值的事务。',
    cta: '开始使用运营管理 Agent',
    ctaLink: '/solutions/operations',
    relatedProducts: [
      { name: 'SSR 服务记录', desc: '无感记录服务全过程', href: '/products/ssr' },
      { name: '工单调度系统', desc: '数据驱动的任务分配', href: '/products/ticket' },
      { name: '人机协同引擎', desc: '人与机器人协同服务', href: '/products/collaboration' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: 'SSR 服务记录', href: '/products/ssr', icon: 'ssr' as const },
        { name: '工单调度系统', href: '/products/ticket', icon: 'ticket' as const },
        { name: '人机协同引擎', href: '/products/collaboration', icon: 'collaboration' as const },
      ],
    },
    isHero: false,
  },
  // 第四个模块：质量评估 Agent
  {
    id: 'quality',
    name: '质量评估 Agent',
    icon: 'agentQuality',
    color: '#8B5CF6',
    headline: 'AI 自动审图质检，让质量管理更轻松',
    description: 'AI 替代人工审图，大幅降低审图成本，客观评分消除甲乙方质量评价分歧，留存数据标签助力复盘。',
    cta: '开始使用质量评估 Agent',
    ctaLink: '/solutions/quality',
    relatedProducts: [
      { name: '设备管理系统', desc: '人单合一的拍照抄表', href: '/products/device' },
      { name: '多模态巡检', desc: 'AI视觉 + IoT联合巡检', href: '/products/inspect' },
      { name: '小智帮手', desc: '一线移动端智能助手', href: '/products/assistant' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: '设备管理系统', href: '/products/device', icon: 'device' as const },
        { name: '多模态巡检', href: '/products/inspect', icon: 'inspect' as const },
        { name: '小智帮手', href: '/products/assistant', icon: 'assistant' as const },
      ],
    },
    isHero: false,
  },
  // 第五个模块：服务优化 Agent
  {
    id: 'review',
    name: '服务优化 Agent',
    icon: 'agentReview',
    color: '#F59E0B',
    headline: '业务自动化核算，数据驱动持续优化',
    description: 'AI 自动完成工资、KPI、账单核算，深度分析运营数据生成洞察报告，优化服务标准与成本，展示卓越能力。',
    cta: '开始使用服务优化 Agent',
    ctaLink: '/solutions/optimization',
    relatedProducts: [
      { name: '计薪系统', desc: '薪酬与KPI自动化核算', href: '/products/salary' },
      { name: '数据大屏', desc: '展示卓越服务能力', href: '/products/dashboard' },
      { name: 'API 开放平台', desc: '数据导出与第三方集成', href: '/products/api' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: '计薪系统', href: '/products/salary', icon: 'salary' as const },
        { name: '数据大屏', href: '/products/dashboard', icon: 'dashboard' as const },
        { name: 'API 开放平台', href: '/products/api', icon: 'api' as const },
      ],
    },
    isHero: false,
  },
];

// ==========================================
// 主组件
// ==========================================
export default function AgentShowcase() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false); // 动画区域是否可见（用于入场缩放）
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const productSectionRef = useRef<HTMLDivElement>(null);

  // 检测是否为移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 滚动监听 - 根据左侧产品位置切换右侧动画
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.5;
      
      // 检测第一个模块标题是否进入视口（用于触发动画区域入场）
      const firstSection = sectionRefs.current[0];
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        // 当模块标题进入视口下方 80% 位置时，触发动画区域显示
        if (rect.top < windowHeight * 0.8) {
          setIsAnimationVisible(true);
        }
      }
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - triggerPoint);
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      setActiveModuleIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // 移动端布局 - 每个模块独立，上下堆叠
  if (isMobile) {
    return (
      <section className="product-section-gray">
        {productModules.map((module) => (
          <div 
            key={module.id} 
            className="product-module-mobile" 
            id={module.id}
          >
            <div className="module-content">
              <div className="module-header">
                <span className="module-icon" style={{ color: module.color }}>
                  {Icons[module.icon as keyof typeof Icons]}
                </span>
                <span className="module-name" style={{ color: module.color }}>{module.name}</span>
              </div>
              <h2 className={`module-headline ${module.isHero ? 'module-headline-hero' : ''}`}>
                {module.headline}
              </h2>
              <p className={`module-description ${module.isHero ? 'module-description-hero' : ''}`}>
                {module.description}
              </p>
              {module.cta && module.ctaLink && (
                <Link href={module.ctaLink} className="module-cta" style={{ backgroundColor: module.color }}>
                  {module.cta}
                  {Icons.arrow}
                </Link>
              )}
              {module.relatedProducts.length > 0 && (
                <div className="module-related">
                  <span className="module-related-label">相关产品</span>
                  <div className="module-related-list">
                    {module.relatedProducts.map((product, idx) => (
                      <Link key={idx} href={product.href} className="related-product-link">
                        <span className="related-product-name" style={{ color: module.color }}>{product.name}</span>
                        <span className="related-product-desc">{product.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* 移动端动画 - 使用统一的 AnimationSelector */}
            <div className="module-visual">
              <AnimationSelector
                moduleId={module.id as ModuleId}
                isActive={true}
                isMobile={true}
                width={400}
                height={400}
                accentColor={module.color}
                relatedProducts={module.animationConfig?.relatedProducts}
                showLabels={module.id === 'modular-ai'}
                style={{
                  width: '100%',
                  maxWidth: module.id === 'modular-ai' ? '400px' : '540px',
                  height: 'auto',
                  margin: '0 auto',
                  transform: ['service-design', 'operations'].includes(module.id) ? 'scale(0.75)' : undefined,
                  transformOrigin: 'center center',
                }}
              />
            </div>
          </div>
        ))}
      </section>
    );
  }

  // ==========================================
  // PC端布局 - 产品区（灰色背景）
  // 5个模块：模块化AI + 4个Agent
  // 左侧滚动，右侧固定动画区切换
  // ==========================================
  return (
    <section className="product-section-gray" ref={productSectionRef}>
      <div className="product-section-wrapper">
        {/* 左侧：可滚动的产品列表（5个模块） */}
        <div className="product-list-column">
          {productModules.map((module, index) => (
            <div 
              key={module.id}
              ref={el => { sectionRefs.current[index] = el; }}
              className={`product-item ${activeModuleIndex === index ? 'active' : ''} ${module.isHero ? 'product-item-hero' : ''}`}
              id={module.id}
            >
              <div className="module-header">
                <span className="module-icon" style={{ color: module.color }}>
                  {Icons[module.icon as keyof typeof Icons]}
                </span>
                <span className="module-name" style={{ color: module.color }}>{module.name}</span>
              </div>
              <h2 className={`module-headline ${module.isHero ? 'module-headline-hero' : ''}`}>
                {module.headline}
              </h2>
              <p className={`module-description ${module.isHero ? 'module-description-hero' : ''}`}>
                {module.description}
              </p>
              {module.cta && module.ctaLink && (
                <Link href={module.ctaLink} className="module-cta" style={{ backgroundColor: module.color }}>
                  {module.cta}
                  {Icons.arrow}
                </Link>
              )}
              {module.relatedProducts.length > 0 && (
                <div className="module-related">
                  <span className="module-related-label">相关产品</span>
                  <div className="module-related-list">
                    {module.relatedProducts.map((product, idx) => (
                      <Link key={idx} href={product.href} className="related-product-link">
                        <span className="related-product-name" style={{ color: module.color }}>{product.name}</span>
                        <span className="related-product-desc">{product.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 右侧：固定的大动画容器，背景透明，统一大小 */}
        <div className="product-visual-column">
          <div 
            className="visual-sticky-container stripe-style"
            style={{
              transform: isAnimationVisible ? 'scale(1)' : 'scale(0.8)',
              opacity: isAnimationVisible ? 1 : 0,
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
            }}
          >
            {/* 动画面板 - 使用统一的 AnimationSelector */}
            <div className="stripe-visual-panels">
              {productModules.map((module, index) => (
                <div 
                  key={module.id}
                  className={`stripe-visual-panel ${activeModuleIndex === index ? 'active' : ''}`}
                >
                  <AnimationSelector
                    moduleId={module.id as ModuleId}
                    isActive={activeModuleIndex === index || module.id === 'modular-ai'}
                    isMobile={false}
                    width={540}
                    height={module.id === 'modular-ai' ? 540 : (module.id === 'review' ? 780 : (module.id === 'operations' ? 700 : 600))}
                    accentColor={module.color}
                    relatedProducts={module.animationConfig?.relatedProducts}
                    showLabels={module.id === 'modular-ai'}
                    layoutMode="vertical"
                    style={{
                      width: module.id === 'modular-ai' ? '100%' : '540px',
                      maxWidth: '540px',
                      height: module.id === 'modular-ai' ? 'auto' : (module.id === 'review' ? '780px' : (module.id === 'operations' ? '700px' : '600px')),
                      aspectRatio: module.id === 'modular-ai' ? '1' : undefined,
                      margin: '0 auto',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
