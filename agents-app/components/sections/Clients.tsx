'use client';

import { useEffect, useState } from 'react';

// Logo 数据类型
interface LogoData {
  slot: number;
  url: string;
  name: string;
}

// Stripe 风格 Logo 墙配置
// 8 个 Logo，采用 4-4 两行布局，与 4 列栅格对齐
const LOGO_COUNT = 8;

export default function Clients() {
  const [logos, setLogos] = useState<LogoData[]>([]);
  
  // 从 localStorage 读取已上传的 Logo
  useEffect(() => {
    const savedLogos = localStorage.getItem('clientLogos');
    if (savedLogos) {
      try {
        setLogos(JSON.parse(savedLogos));
      } catch (e) {
        console.error('Error parsing saved logos:', e);
      }
    }
  }, []);
  
  // 获取指定槽位的 Logo
  const getLogoForSlot = (slot: number): LogoData | undefined => {
    return logos.find(logo => logo.slot === slot);
  };

  return (
    <section className="clients clients-stripe">
      <div className="clients-container">
        {/* Logo 墙：8 个 Logo，4-4 两行布局
            已删除"受到行业领先企业信赖"标语
            Logo 区域在 5 条参照线内居中
        */}
        <div className="clients-grid-stripe" id="clientLogos">
          {Array.from({ length: LOGO_COUNT }, (_, i) => {
            const slot = i + 1;
            const logoData = getLogoForSlot(slot);
            
            return (
              <div key={slot} className="client-logo-stripe" data-slot={slot}>
                {logoData?.url ? (
                  <img 
                    src={logoData.url} 
                    alt={logoData.name || `Logo ${slot}`}
                    className="client-logo-img-stripe"
                  />
                ) : (
                  <div className="client-logo-placeholder-stripe">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                    <span>Logo {slot}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
