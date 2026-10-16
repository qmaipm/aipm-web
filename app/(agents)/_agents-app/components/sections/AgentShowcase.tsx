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
        { name: '空间管理', href: '/products/fmclaw/ontology', icon: 'space' as const },
        { name: '服务配置', href: '/solutions/service-design', icon: 'serviceConfig' as const },
        { name: 'API平台', href: '/products/fmclaw/connectors', icon: 'api' as const },
        { name: '数据中心', href: '/products/fmclaw/ontology', icon: 'dashboard' as const },
      ],
    },
    isHero: true,
  },
  // 第二个模块：服务设计 Agent
  {
    id: 'service-design',
    name: '服务设计智能体群',
    icon: 'agentDesign',
    color: '#0070FF',
    headline: '物业项目预算，从每一个服务点位算起',
    description: '录入服务点位和服务等级，匹配服务标准与服务计划，用服务频次和人效数据算出人员编制与项目预算。降本从项目预算开始。',
    cta: '了解服务设计智能体群',
    ctaLink: '/solutions/service-design',
    relatedProducts: [
      { name: '空间管理系统', desc: '空间配置与标准生成', href: '/products/fmclaw/ontology' },
      { name: '服务配置系统', desc: '服务流程与标准设计', href: '/solutions/service-design' },
      { name: 'API 开放平台', desc: '标准数据接口', href: '/products/fmclaw/connectors' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: '空间管理系统', href: '/products/fmclaw/ontology', icon: 'space' as const },
        { name: '服务配置系统', href: '/solutions/service-design', icon: 'serviceConfig' as const },
        { name: 'API 开放平台', href: '/products/fmclaw/connectors', icon: 'api' as const },
      ],
    },
    isHero: false,
  },
  // 第三个模块：运营管理 Agent
  {
    id: 'operations',
    name: '运营管理智能体群',
    icon: 'agentOps',
    color: '#0A7A63',
    headline: 'IoT 感知现场，替代人盯人的运营调度',
    description: '用 IoT 传感器感知每一次服务是否真实发生，按服务标准智能审批、调度派单、超时升级，管理者只处理需要拍板的事。',
    cta: '了解运营管理智能体群',
    ctaLink: '/solutions/operations',
    relatedProducts: [
      { name: 'SSR 服务记录', desc: '无感记录服务全过程', href: '/solutions/operations' },
      { name: '工单调度系统', desc: '数据驱动的任务分配', href: '/solutions/operations' },
      { name: '人机协同引擎', desc: '人与机器人协同服务', href: '/products/fmclaw/connectors' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: 'SSR 服务记录', href: '/solutions/operations', icon: 'ssr' as const },
        { name: '工单调度系统', href: '/solutions/operations', icon: 'ticket' as const },
        { name: '人机协同引擎', href: '/products/fmclaw/connectors', icon: 'collaboration' as const },
      ],
    },
    isHero: false,
  },
  // 第四个模块：质量评估 Agent
  {
    id: 'quality',
    name: '质量评估智能体群',
    icon: 'agentQuality',
    color: '#0C8B82',
    headline: '看得见的画面，都能拿来做质检',
    description: '读取监控摄像头、手机、机器人、无人机拍到的画面，完成保洁质检、拍照抄表、安全隐患识别和设备巡检核验，发现问题直接开工单。',
    cta: '了解质量评估智能体群',
    ctaLink: '/solutions/assessment',
    relatedProducts: [
      { name: '设备管理系统', desc: '人单合一的拍照抄表', href: '/products/iot' },
      { name: '多模态巡检', desc: 'AI视觉 + IoT联合巡检', href: '/solutions/inspection' },
      { name: '小智帮手', desc: '一线移动端智能助手', href: '/products/fmclaw' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: '设备管理系统', href: '/products/iot', icon: 'device' as const },
        { name: '多模态巡检', href: '/solutions/inspection', icon: 'inspect' as const },
        { name: '小智帮手', href: '/products/fmclaw', icon: 'assistant' as const },
      ],
    },
    isHero: false,
  },
  // 第五个模块：服务优化 Agent
  {
    id: 'review',
    name: '服务优化智能体群',
    icon: 'agentReview',
    color: '#3451C7',
    headline: '报告、复盘、结算，用同一份运营数据',
    description: '自动生成日报、周报、月报，按数据给出优化与调整建议，核算供应商账单、员工薪资和团队 KPI。',
    cta: '了解服务优化智能体群',
    ctaLink: '/solutions/optimization',
    relatedProducts: [
      { name: '计薪系统', desc: '薪酬与KPI自动化核算', href: '/solutions/payroll' },
      { name: '数据大屏', desc: '展示卓越服务能力', href: '/products/fmclaw' },
      { name: 'API 开放平台', desc: '数据导出与第三方集成', href: '/products/fmclaw/connectors' },
    ],
    animationConfig: {
      relatedProducts: [
        { name: '计薪系统', href: '/solutions/payroll', icon: 'salary' as const },
        { name: '数据大屏', href: '/products/fmclaw', icon: 'dashboard' as const },
        { name: 'API 开放平台', href: '/products/fmclaw/connectors', icon: 'api' as const },
      ],
    },
    isHero: false,
  },
];

// ==========================================
// 主组件
// ==========================================
const inkOf = (c: string) => ({ '#0070FF': '#0058CC', '#0C8B82': '#096B73', '#0A7A63': '#0A7A63', '#3451C7': '#3451C7' } as Record<string, string>)[c] ?? c;

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
                <span className="module-icon" style={{ color: inkOf(module.color) }}>
                  {Icons[module.icon as keyof typeof Icons]}
                </span>
                <span className="module-name" style={{ color: inkOf(module.color) }}>{module.name}</span>
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
                <span className="module-icon" style={{ color: inkOf(module.color) }}>
                  {Icons[module.icon as keyof typeof Icons]}
                </span>
                <span className="module-name" style={{ color: inkOf(module.color) }}>{module.name}</span>
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
