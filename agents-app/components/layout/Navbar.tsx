'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// SVG 图标组件 - 内联 SVG，支持颜色继承
const Icons = {
  // 核心 Agent 图标
  agentDesign: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="6" r="3" fill="#10B981"/>
    </svg>
  ),
  agentOps: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  agentQuality: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8.5 12L10.5 14L15.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  agentReview: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14L10 11L13 14L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="14" r="1.5" fill="currentColor"/>
      <circle cx="17" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  ),
  // 产品图标
  salary: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 5V15M7 8H12C12.5 8 13 8.45 13 9C13 9.55 12.5 10 12 10H8C7.45 10 7 10.45 7 11C7 11.55 7.45 12 8 12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  team: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 16C4 13.24 6.24 11 9 11H11C13.76 11 16 13.24 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  ticket: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 8H14M6 11H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  inspect: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 6V9L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  record: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 6H13M7 10H13M7 14H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  device: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  visitor: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="7" cy="10" r="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M11 8H15M11 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  access: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="8" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8V5C7 3.34 8.34 2 10 2C11.66 2 13 3.34 13 5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="13" r="1.5" fill="currentColor"/>
    </svg>
  ),
  parking: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 14V6H11C12.66 6 14 7.34 14 9C14 10.66 12.66 12 11 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  payment: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 12H8M12 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  space: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="4" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="11" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="12" y="2" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="12" y="8" width="6" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  api: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 10L9 8L7 6M11 6H13M11 10H13M11 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  logistics: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="6" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8H16L18 10V14H12V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="6" cy="16" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  assistant: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 7H14M6 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 18L10 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 解决方案图标
  toilet: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="14" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V14" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  wrench: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M14.5 5.5L12 8L13.5 9.5L17 6C17.5 8 17 10 15.5 11.5C14 13 12 13.5 10 13L5 18L3 16L8 11C7.5 9 8 7 9.5 5.5C11 4 13 3.5 15 4L11.5 7.5L13 9L14.5 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  fire: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 18C14 18 17 15 17 11C17 7 14 4 10 2C10 6 8 8 6 10C4 12 4 14 6 16C7 17 8 18 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 18C8 18 6 16 6 14C6 12 8 11 10 12C12 13 12 15 10 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  elevator: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2V18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 7L7.5 5L9 7M6 13L7.5 15L9 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 7L12.5 5L14 7M11 13L12.5 15L14 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  building: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 6H9M11 6H13M7 10H9M11 10H13M7 14H9M11 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  government: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M2 18H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 8V18M7 8V18M13 8V18M17 8V18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 8L10 2L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  enterprise: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="6" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="10" y="2" width="8" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 10H8M4 14H8M12 6H16M12 10H16M12 14H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  park: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="8" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 8V4C6 3.44772 6.44772 3 7 3H13C13.5523 3 14 3.44772 14 4V8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 12H9M11 12H14M6 15H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  rocket: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M10 18V14M6 14L10 2L14 14H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 14L2 18M16 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  bolt: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M11 2L4 11H9L8 18L16 9H11L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  chart: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d="M2 18L7 13L11 15L18 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 2V6M16 4H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  cost: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 8L10 10L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  quality: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
};

// 核心 Agent 产品 - 左侧第一列
const coreAgents = [
  {
    id: 'service-design',
    name: '服务设计Agent',
    desc: '智能生成服务标准',
    icon: 'agentDesign' as keyof typeof Icons,
    color: '#0070FF',
    href: '#service-design',
  },
  {
    id: 'operations',
    name: '运营管理Agent',
    desc: '人机协同调度',
    icon: 'agentOps' as keyof typeof Icons,
    color: '#10B981',
    href: '#operations',
  },
  {
    id: 'quality',
    name: '质量评估Agent',
    desc: 'AI自动质检',
    icon: 'agentQuality' as keyof typeof Icons,
    color: '#8B5CF6',
    href: '#quality',
  },
  {
    id: 'review',
    name: '服务优化Agent',
    desc: '智能分析洞察',
    icon: 'agentReview' as keyof typeof Icons,
    color: '#F59E0B',
    href: '#review',
  },
];

// 运营支撑产品
const operationsProducts = [
  { icon: 'salary' as keyof typeof Icons, name: '智能计薪系统', desc: '自动化薪酬核算', href: '#' },
  { icon: 'team' as keyof typeof Icons, name: '人员管理系统', desc: '优化人力配置', href: '#' },
  { icon: 'ticket' as keyof typeof Icons, name: '工单调度系统', desc: '任务智能分配', href: '#' },
];

// 质量管控产品
const qualityProducts = [
  { icon: 'inspect' as keyof typeof Icons, name: '多模态巡检', desc: '全域质量监控', href: '#' },
  { icon: 'record' as keyof typeof Icons, name: 'SSR服务记录', desc: '服务全程留痕', href: '#' },
  { icon: 'device' as keyof typeof Icons, name: '智能设备管理', desc: '设备全周期管理', href: '#' },
];

// 业主体验产品
const experienceProducts = [
  { icon: 'visitor' as keyof typeof Icons, name: '访客管理系统', desc: '无感通行体验', href: '#' },
  { icon: 'access' as keyof typeof Icons, name: '智能门禁', desc: '多种认证方式', href: '#' },
  { icon: 'parking' as keyof typeof Icons, name: '智能停车场', desc: '车辆管理自动化', href: '#' },
  { icon: 'payment' as keyof typeof Icons, name: '智能收费系统', desc: '在线缴费账单', href: '#' },
];

// 更多产品
const moreProducts = [
  { icon: 'space' as keyof typeof Icons, name: '空间管理系统', href: '#' },
  { icon: 'settings' as keyof typeof Icons, name: '服务配置系统', href: '#' },
  { icon: 'dashboard' as keyof typeof Icons, name: '数据大屏', href: '#' },
  { icon: 'api' as keyof typeof Icons, name: 'API开放平台', href: '#' },
  { icon: 'logistics' as keyof typeof Icons, name: '智能物流', href: '#' },
  { icon: 'assistant' as keyof typeof Icons, name: '小智帮手', href: '#' },
];

// 核心解决方案
const coreSolutions = [
  { 
    name: '成本解决方案', 
    desc: '降低10-20%人力成本，优化人员配置与排班', 
    highlight: '降本增效首选',
    color: 'blue',
    icon: 'cost' as keyof typeof Icons,
    href: '#' 
  },
  { 
    name: '质量解决方案', 
    desc: '投诉率下降60%，服务质量全链路管控', 
    highlight: '品质管理利器',
    color: 'green',
    icon: 'quality' as keyof typeof Icons,
    href: '#' 
  },
];

// 二线解决方案
const secondarySolutions = [
  { name: '卫生间品质提升', icon: 'toilet' as keyof typeof Icons, href: '#' },
  { name: '设备巡检方案', icon: 'wrench' as keyof typeof Icons, href: '#' },
  { name: '消防巡检方案', icon: 'fire' as keyof typeof Icons, href: '#' },
  { name: '电梯维保方案', icon: 'elevator' as keyof typeof Icons, href: '#' },
];

// 按行业
const industrySolutions = [
  { name: '物业管理 & FM', icon: 'building' as keyof typeof Icons, href: '#' },
  { name: '政府及国有园区', icon: 'government' as keyof typeof Icons, href: '#' },
  { name: '大企业行政', icon: 'enterprise' as keyof typeof Icons, href: '#' },
  { name: '产业园区', icon: 'park' as keyof typeof Icons, href: '#' },
];

// 按阶段
const stageSolutions = [
  { name: '项目启动期', icon: 'rocket' as keyof typeof Icons, href: '#' },
  { name: '稳定运营期', icon: 'bolt' as keyof typeof Icons, href: '#' },
  { name: '规模扩张期', icon: 'chart' as keyof typeof Icons, href: '#' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        {/* Logo - 未滚动时白色，滚动后彩色 */}
        <Link href="/" className="nav-logo">
          {/* 白色 Logo - 未滚动时显示 */}
          <Image 
            src="/logo-stalliance-white.png" 
            alt="启盟科技 Stalliance" 
            width={160}
            height={40}
            className={`logo-image logo-white ${isScrolled ? 'hidden' : ''}`}
            priority
          />
          {/* 彩色 Logo - 滚动后显示 */}
          <Image 
            src="/logo-stalliance-clean.png" 
            alt="启盟科技 Stalliance" 
            width={160}
            height={40}
            className={`logo-image logo-color ${isScrolled ? '' : 'hidden'}`}
            priority
          />
        </Link>
        
        {/* 主导航菜单 */}
        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* 首页 */}
          <Link href="/" className="nav-link">首页</Link>
          
          {/* 产品下拉菜单 - Stripe 风格 */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => { setActiveDropdown(null); setHoveredAgent(null); }}
          >
            <button className="nav-link">
              产品
              <span className="dropdown-arrow"></span>
            </button>
            <div className={`dropdown-panel dropdown-panel-products ${activeDropdown === 'products' ? 'active' : ''}`}>
              <div className="dropdown-content dropdown-stripe-layout">
                
                {/* 左侧：核心 Agent 产品 */}
                <div className="products-main">
                  <div className="products-section products-section-core">
                    <div className="products-section-label">核心产品</div>
                    
                    {coreAgents.map((agent) => (
                      <Link 
                        key={agent.id} 
                        href={agent.href} 
                        className={`product-primary-item ${hoveredAgent === agent.id ? 'hovered' : ''}`}
                        onMouseEnter={() => setHoveredAgent(agent.id)}
                        onMouseLeave={() => setHoveredAgent(null)}
                      >
                        <span className="product-primary-icon" style={{ color: agent.color }}>
                          {Icons[agent.icon]}
                        </span>
                        <div className="product-primary-info">
                          <span className="product-primary-name">
                            {agent.name}
                            <svg className="product-arrow" width="14" height="14" viewBox="0 0 14 14">
                              <path d="M4 7h6M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                            </svg>
                          </span>
                          <span className="product-primary-desc">{agent.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {/* 运营支撑 */}
                  <div className="products-section">
                    <div className="products-section-label">运营支撑</div>
                    {operationsProducts.map((item, idx) => (
                      <Link key={idx} href={item.href} className="product-simple-item">
                        <span className="product-simple-icon">{Icons[item.icon]}</span>
                        <span className="product-simple-name">{item.name}</span>
                        <span className="product-simple-desc">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* 中间：质量管控 + 业主体验 */}
                <div className="products-middle">
                  <div className="products-section">
                    <div className="products-section-label">质量管控</div>
                    {qualityProducts.map((item, idx) => (
                      <Link key={idx} href={item.href} className="product-simple-item">
                        <span className="product-simple-icon">{Icons[item.icon]}</span>
                        <span className="product-simple-name">{item.name}</span>
                        <span className="product-simple-desc">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="products-section">
                    <div className="products-section-label">业主体验</div>
                    {experienceProducts.map((item, idx) => (
                      <Link key={idx} href={item.href} className="product-simple-item">
                        <span className="product-simple-icon">{Icons[item.icon]}</span>
                        <span className="product-simple-name">{item.name}</span>
                        <span className="product-simple-desc">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* 右侧：更多产品 */}
                <div className="products-more">
                  <div className="products-section-label">更多</div>
                  {moreProducts.map((item, idx) => (
                    <Link key={idx} href={item.href} className="product-more-item">
                      <span className="product-more-icon">{Icons[item.icon]}</span>
                      <span className="product-more-name">{item.name}</span>
                    </Link>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
          
          {/* 解决方案下拉菜单 */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setActiveDropdown('solutions')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="nav-link">
              解决方案
              <span className="dropdown-arrow"></span>
            </button>
            <div className={`dropdown-panel dropdown-panel-solutions ${activeDropdown === 'solutions' ? 'active' : ''}`}>
              <div className="dropdown-content">
                {/* 核心解决方案 - 大卡片 */}
                <div className="solutions-core">
                  <div className="solutions-core-label">核心解决方案</div>
                  <div className="solutions-core-cards">
                    {coreSolutions.map((sol, idx) => (
                      <Link key={idx} href={sol.href} className={`solution-big-card solution-${sol.color}`}>
                        <span className="solution-big-icon">{Icons[sol.icon]}</span>
                        <div className="solution-big-content">
                          <span className="solution-big-name">{sol.name}</span>
                          <span className="solution-big-desc">{sol.desc}</span>
                          <span className="solution-big-highlight">{sol.highlight}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                {/* 二线解决方案 */}
                <div className="solutions-secondary-grid">
                  <div className="solutions-col">
                    <div className="solutions-col-label">场景方案</div>
                    <div className="solutions-list">
                      {secondarySolutions.map((item, idx) => (
                        <Link key={idx} href={item.href} className="solution-item-icon">
                          <span className="solution-icon">{Icons[item.icon]}</span>
                          <span className="solution-name">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="solutions-col">
                    <div className="solutions-col-label">按行业</div>
                    <div className="solutions-list">
                      {industrySolutions.map((item, idx) => (
                        <Link key={idx} href={item.href} className="solution-item-icon">
                          <span className="solution-icon">{Icons[item.icon]}</span>
                          <span className="solution-name">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="solutions-col">
                    <div className="solutions-col-label">按阶段</div>
                    <div className="solutions-list">
                      {stageSolutions.map((item, idx) => (
                        <Link key={idx} href={item.href} className="solution-item-icon">
                          <span className="solution-icon">{Icons[item.icon]}</span>
                          <span className="solution-name">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 技术实力 */}
          <Link href="#" className="nav-link">技术实力</Link>
          
          {/* 成为合伙人 */}
          <Link href="#" className="nav-link">成为合伙人</Link>
          
          {/* 价格 */}
          <Link href="#" className="nav-link">价格</Link>
          
          {/* 公司下拉菜单 */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => setActiveDropdown('company')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="nav-link">
              公司
              <span className="dropdown-arrow"></span>
            </button>
            <div className={`dropdown-panel dropdown-panel-company ${activeDropdown === 'company' ? 'active' : ''}`}>
              <div className="dropdown-content">
                <div className="dropdown-company-grid">
                  <div className="dropdown-col">
                    <div className="dropdown-col-label">关于启盟</div>
                    <Link href="#" className="dropdown-solution-item">
                      关于我们
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#" className="dropdown-solution-item">
                      新闻中心
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#" className="dropdown-solution-item">
                      发展历程
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#" className="dropdown-solution-item">
                      加入启盟
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#contact" className="dropdown-solution-item">
                      联系我们
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                  </div>
                  <div className="dropdown-col">
                    <div className="dropdown-col-label">资源中心</div>
                    <Link href="#" className="dropdown-solution-item">
                      客户案例
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#" className="dropdown-solution-item">
                      博客
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#" className="dropdown-solution-item">
                      白皮书
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#" className="dropdown-solution-item">
                      行业报告
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                    <Link href="#" className="dropdown-solution-item">
                      帮助中心
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧按钮组 */}
        <div className="nav-actions">
          <Link href="#" className="nav-link nav-link-login">登录</Link>
          <Link href="#contact" className="btn-cta">
            预约演示
            <span className="btn-arrow">→</span>
          </Link>
        </div>
        
        {/* 移动端菜单按钮 */}
        <button 
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          id="navToggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
