import type { Metadata } from "next";

// 页面级 metadata 助手:canonical 与 og:url 指向页面自身(相对路径,由根布局
// metadataBase 按当前环境解析为绝对地址),避免全站页面继承根布局后
// og:url 都指向首页、且没有 canonical 的问题。
// Next.js 对 metadata 的合并是同层整体替换而非深合并,因此 openGraph 里的
// siteName / locale 需在此一并声明,不能依赖根布局。
// 文章页不用这个:用 insights/articles.ts 的 articleMetadata(og:type=article,
// 并带 published_time / author / section / tag)。
export function pageMetadata(
  path: string,
  meta: Omit<Metadata, "title" | "description"> & { title: string; description: string }
): Metadata {
  const { title, description, ...rest } = meta;
  return {
    title,
    description,
    ...rest,
    alternates: { canonical: path, ...rest.alternates },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "启盟科技 FMClaw™",
      url: path,
      title,
      description,
      ...rest.openGraph,
    },
  };
}
