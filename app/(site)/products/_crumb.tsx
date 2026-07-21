import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import "./crumb.css";

const SITE_URL = process.env.SITE_URL || "https://www.aipm.cn";

/**
 * 产品扩展页面包屑:产品 → FMClaw → 当前页
 * 可见面包屑 + BreadcrumbList JSON-LD。
 * tone="dark" 用于深色 Hero 背景。
 */
export default function ProductCrumb({
  name,
  href,
  tone = "light",
}: {
  name: string;
  href: string;
  tone?: "light" | "dark";
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "启盟科技", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FMClaw™ 产品总览", item: `${SITE_URL}/products/fmclaw` },
      { "@type": "ListItem", position: 3, name, item: `${SITE_URL}${href}` },
    ],
  };
  return (
    <>
      <JsonLd data={ld} />
      <nav className={`px-crumb ${tone === "dark" ? "px-crumb-dark" : ""}`} aria-label="面包屑">
        <Link href="/products/fmclaw">产品</Link>
        <span className="px-crumb-sep" aria-hidden="true">/</span>
        <Link href="/products/fmclaw">FMClaw</Link>
        <span className="px-crumb-sep" aria-hidden="true">/</span>
        <span>{name}</span>
      </nav>
    </>
  );
}
