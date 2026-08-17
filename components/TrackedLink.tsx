"use client";
import Link from "next/link";

/* 带百度统计事件埋点的站内链接。周报 6.2 要求「案例页 CTA 可统计」——
   没有事件埋点,CTA 点没点、点了多少,后台只能靠猜。
   _trackEvent(category, action, label):category 固定 "cta",
   action 是动作名(book-demo / book-workshop / contact),label 记来源页,
   这样百度统计「事件分析」里能直接回答「哪个页面的哪个按钮带来了咨询」。
   埋点失败不许影响跳转:try/catch 吞掉,统计是旁路,不是主路。 */
export default function TrackedLink({
  href,
  action,
  label,
  className,
  children,
}: {
  href: string;
  action: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = () => {
    try {
      const w = window as { _hmt?: unknown[][] };
      w._hmt = w._hmt || [];
      w._hmt.push(["_trackEvent", "cta", action, label]);
    } catch {
      /* 统计不可用时静默,不阻断导航 */
    }
  };
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
