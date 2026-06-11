'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟表单提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('感谢您的咨询！我们会尽快与您联系。');
    setFormData({ name: '', company: '', phone: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="contact-layout">
          <div className="contact-info">
            <h2>开启智能物业管理之旅</h2>
            <p>立即联系我们，了解启盟 AI 如何帮助您的企业实现物业管理的智能化升级</p>
            <ul className="contact-features">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                免费方案咨询
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                专属解决方案
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                产品演示体验
              </li>
            </ul>
          </div>
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">姓名 *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">公司名称 *</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  required 
                  placeholder="请输入公司名称"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">联系电话 *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  placeholder="请输入联系电话"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">电子邮箱</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="请输入电子邮箱"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">需求描述</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="请简要描述您的需求"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? '提交中...' : '提交咨询'}
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
