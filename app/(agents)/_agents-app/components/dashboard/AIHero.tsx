'use client';

import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const quickCommands = [
  { label: '今日计划', color: '#F59E0B' },
  { label: '待审批', color: '#EF4444' },
  { label: '本周报告', color: '#0070FF' },
  { label: '考勤概况', color: '#12B98A' },
  { label: '质检汇总', color: '#9333EA' },
  { label: '库存预警', color: '#F59E0B' },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return '早上好';
  if (h < 18) return '下午好';
  return '晚上好';
}

export default function AIHero() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <motion.section
      className="flex flex-col items-center w-full"
      style={{ maxWidth: 640, margin: '0 auto', padding: '40px 16px 0' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Greeting */}
      <p
        style={{
          fontSize: 14,
          lineHeight: '22px',
          color: '#666666',
          marginBottom: 8,
        }}
      >
        {getGreeting()}，张经理
      </p>

      {/* Title */}
      <h1
        style={{
          fontSize: 28,
          fontWeight: 600,
          lineHeight: '36px',
          color: '#1A1A1A',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        有什么需要我帮您处理的？
      </h1>

      {/* Input box */}
      <div
        className="relative w-full"
        style={{
          height: 48,
          borderRadius: 16,
          border: focused
            ? '1px solid #0070FF'
            : '1px solid #E2E8F0',
          boxShadow: focused
            ? '0 0 0 3px rgba(0,112,255,0.15)'
            : 'none',
          background: '#FFFFFF',
          transition: 'border-color 200ms, box-shadow 200ms',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 10,
        }}
      >
        <Search size={18} style={{ color: '#94A3B8', flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="输入您的问题，或选择下方快捷指令..."
          className="flex-1 bg-transparent outline-none"
          style={{
            fontSize: 14,
            lineHeight: '22px',
            color: '#1A1A1A',
          }}
        />
        <button
          className="flex items-center justify-center shrink-0 cursor-pointer"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: query.trim() ? '#0070FF' : '#E2E8F0',
            transition: 'background 200ms',
          }}
          disabled={!query.trim()}
        >
          <Send
            size={16}
            style={{ color: query.trim() ? '#FFFFFF' : '#94A3B8' }}
          />
        </button>
      </div>

      {/* Quick command tags */}
      <div
        className="flex flex-wrap justify-center"
        style={{
          marginTop: 16,
          gap: 8,
        }}
      >
        {quickCommands.map((cmd) => (
          <motion.button
            key={cmd.label}
            className="cursor-pointer select-none"
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              background: `${cmd.color}10`,
              fontSize: 13,
              color: cmd.color,
              fontWeight: 500,
              border: 'none',
              transition: 'background 200ms',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `${cmd.color}20`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = `${cmd.color}10`)
            }
          >
            {cmd.label}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
