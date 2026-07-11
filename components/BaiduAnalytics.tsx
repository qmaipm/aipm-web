"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// 百度统计 ID。用环境变量便于测试站/生产站区分,缺省用生产站 ID。
const HM_ID =
  process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID || "9ca69d28b9f3e02d3b041ba5d5f3bf9a";

declare global {
  interface Window {
    _hmt?: unknown[][];
  }
}

// 全局注入百度统计:首屏 PV 由脚本自身上报;之后每次客户端软导航(App Router 路由切换)
// 手动补报一次 PV,否则内页访问量会被漏统计。
export default function BaiduAnalytics() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window._hmt = window._hmt || [];
    window._hmt.push(["_trackPageview", pathname]);
  }, [pathname]);

  if (!HM_ID) return null;

  return (
    <Script id="baidu-tongji" strategy="afterInteractive">
      {`
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?${HM_ID}";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      `}
    </Script>
  );
}
