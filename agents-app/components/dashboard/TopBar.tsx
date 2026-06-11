'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Plus, Search, X } from 'lucide-react';

interface ChatItem {
  id: string;
  title: string;
  time: string;
  group: string;
}

const mockChats: ChatItem[] = [
  { id: '1', title: '本周考勤异常分析', time: '10:32', group: '今天' },
  { id: '2', title: '3月采购审批汇总', time: '09:15', group: '今天' },
  { id: '3', title: '质检报告生成', time: '昨天', group: '最近7天' },
  { id: '4', title: '仓库库存预警处理', time: '3月22日', group: '最近7天' },
  { id: '5', title: '月度运营报告', time: '3月18日', group: '更早' },
];

export default function TopBar({ sidebarWidth }: { sidebarWidth: number }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setPanelOpen(false);
    }
    if (panelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [panelOpen]);

  return (
    <header
      className="fixed top-0 right-0 flex items-center z-40"
      style={{
        left: sidebarWidth,
        height: 48,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)',
        transition: 'left 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '0 16px',
      }}
    >
      {/* Logo icon */}
      <div
        className="flex items-center justify-center shrink-0 cursor-pointer"
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: 'linear-gradient(135deg, #0070FF, #12B98A)',
        }}
        title="回到首页"
      >
        <span className="text-white text-xs font-bold select-none">AI</span>
      </div>

      {/* Chat list button */}
      <div className="relative ml-3" ref={panelRef}>
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="flex items-center gap-2 px-3 h-8 rounded-md cursor-pointer"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#1A1A1A',
            background: panelOpen ? '#F5F7FA' : 'transparent',
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) => {
            if (!panelOpen) e.currentTarget.style.background = '#F5F7FA';
          }}
          onMouseLeave={(e) => {
            if (!panelOpen) e.currentTarget.style.background = 'transparent';
          }}
        >
          <MessageSquare size={20} />
          <span>对话列表</span>
        </button>

        {/* Chat list panel */}
        {panelOpen && (
          <div
            className="absolute top-full left-0 mt-1"
            style={{
              width: 320,
              maxHeight: 'calc(100vh - 64px)',
              borderRadius: '0 0 12px 12px',
              background: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              animation: 'chatPanelIn 200ms ease-out',
            }}
          >
            {/* New chat button */}
            <button
              className="flex items-center justify-center gap-2 w-full h-10 cursor-pointer"
              style={{
                background: '#0070FF',
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              <Plus size={16} />
              新建对话
            </button>

            {/* Search */}
            <div className="px-3 py-2">
              <div
                className="flex items-center gap-2 px-3 h-8 rounded-md"
                style={{
                  background: '#F5F7FA',
                  border: '1px solid #E2E8F0',
                }}
              >
                <Search size={14} style={{ color: '#94A3B8' }} />
                <input
                  type="text"
                  placeholder="搜索历史对话"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: '#1A1A1A' }}
                />
              </div>
            </div>

            {/* Chat list grouped */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: 'calc(100vh - 160px)' }}
            >
              {['今天', '最近7天', '更早'].map((group) => {
                const items = mockChats.filter((c) => c.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group}>
                    <div
                      className="px-4 py-1.5"
                      style={{ fontSize: 12, color: '#94A3B8' }}
                    >
                      {group}
                    </div>
                    {items.map((chat) => (
                      <button
                        key={chat.id}
                        className="flex items-center justify-between w-full px-4 cursor-pointer"
                        style={{
                          height: 52,
                          transition: 'background 150ms',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = '#F5F7FA')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = 'transparent')
                        }
                      >
                        <span
                          className="text-sm truncate"
                          style={{ color: '#1A1A1A', maxWidth: 220 }}
                        >
                          {chat.title}
                        </span>
                        <span style={{ fontSize: 12, color: '#94A3B8' }}>
                          {chat.time}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
