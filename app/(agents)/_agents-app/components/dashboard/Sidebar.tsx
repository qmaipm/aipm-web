'use client';

import { useState } from 'react';
import {
  Home,
  Inbox,
  Workflow,
  Users,
  Cloud,
  User,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  badge?: number;
  active?: boolean;
}

const topNavItems: NavItem[] = [
  { icon: Home, label: '首页', active: true },
  { icon: Inbox, label: '收件箱', badge: 3 },
  { icon: Workflow, label: '工作流' },
  { icon: Users, label: '团队' },
  { icon: Cloud, label: '云盘' },
];

const bottomNavItems: NavItem[] = [
  { icon: User, label: '我的' },
  { icon: HelpCircle, label: '帮助中心' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-50"
      style={{
        width: expanded ? 220 : 64,
        backgroundColor: '#1A1A2E',
        transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center px-4 h-14 shrink-0"
        style={{ gap: 10 }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #0070FF, #12B98A)',
          }}
        >
          <span className="text-white text-sm font-bold select-none">AI</span>
        </div>
        {expanded && (
          <span
            className="text-white text-sm font-semibold whitespace-nowrap overflow-hidden"
            style={{ opacity: expanded ? 1 : 0, transition: 'opacity 200ms' }}
          >
            FM Claw
          </span>
        )}
      </div>

      {/* Spacer */}
      <div className="h-6" />

      {/* Top nav */}
      <nav className="flex flex-col px-2 gap-1 flex-1">
        {topNavItems.map((item) => (
          <NavButton key={item.label} item={item} expanded={expanded} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div
        className="px-2 pb-3 flex flex-col gap-1"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 12,
        }}
      >
        {bottomNavItems.map((item) => (
          <NavButton key={item.label} item={item} expanded={expanded} />
        ))}

        {/* Expand/collapse toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center h-10 rounded-lg cursor-pointer"
          style={{
            color: '#E0E4F0',
            transition: 'background 150ms',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          title={expanded ? '收起侧边栏' : '展开侧边栏'}
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </aside>
  );
}

function NavButton({
  item,
  expanded,
}: {
  item: NavItem;
  expanded: boolean;
}) {
  const Icon = item.icon;

  return (
    <button
      className="relative flex items-center rounded-lg cursor-pointer"
      style={{
        height: 44,
        paddingLeft: expanded ? 12 : 0,
        justifyContent: expanded ? 'flex-start' : 'center',
        gap: 10,
        background: item.active ? 'rgba(255,255,255,0.08)' : 'transparent',
        transition: 'background 150ms',
      }}
      onMouseEnter={(e) => {
        if (!item.active)
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
      onMouseLeave={(e) => {
        if (!item.active) e.currentTarget.style.background = 'transparent';
      }}
      title={!expanded ? item.label : undefined}
    >
      {/* Active indicator */}
      {item.active && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r"
          style={{
            width: 3,
            height: 20,
            background: '#0070FF',
          }}
        />
      )}

      <Icon
        size={24}
        style={{
          color: item.active ? '#FFFFFF' : '#E0E4F0',
          flexShrink: 0,
        }}
      />

      {expanded && (
        <span
          className="text-sm whitespace-nowrap overflow-hidden"
          style={{
            fontWeight: 500,
            color: item.active ? '#FFFFFF' : '#E0E4F0',
          }}
        >
          {item.label}
        </span>
      )}

      {/* Badge */}
      {item.badge && item.badge > 0 && (
        <span
          className="absolute flex items-center justify-center"
          style={{
            top: expanded ? '50%' : 6,
            right: expanded ? 12 : 10,
            transform: expanded ? 'translateY(-50%)' : 'none',
            minWidth: 18,
            height: 18,
            borderRadius: 999,
            background: '#EF4444',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 600,
            padding: '0 5px',
            lineHeight: '18px',
          }}
        >
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )}
    </button>
  );
}
