// 新闻中心登记表 — 列表页、正文页外壳与结构化数据(NewsArticle)共用一份数据。
// 与 insights/articles.ts 同模式;category 先做徽标展示,条目多了再加筛选。

import type { Metadata } from "next";

export type NewsCategory = "展会" | "活动" | "交流合作" | "荣誉";

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  title: string;
  // 列表卡片上的一句话
  desc: string;
  // ISO 日期(YYYY-MM-DD),列表按此倒序
  date: string;
  // 封面图(站内绝对路径):列表卡片与 og:image / NewsArticle JSON-LD 共用
  cover: string;
  // 地点(列表与正文元信息行展示,可选)
  place?: string;
};

export const NEWS: NewsItem[] = [
  {
    slug: "taiwan-delegation-exchange",
    category: "交流合作",
    title: "台湾企业参访团对话启盟科技:共探物业智能体在台落地",
    desc: "建博会峰会分享引来的一场深度对接:现场实操演示 FMClaw™ 真实运转,双方就 AI 物业在台湾的应用达成初步合作意向。",
    date: "2026-07-13",
    cover: "/news/taiwan-delegation-exchange-cover.jpg",
    place: "广州",
  },
  {
    slug: "china-build-expo-2026",
    category: "展会",
    title: "从「人管」到「智管」:启盟科技亮相 2026 中国建博会",
    desc: "在「AI 赋能全龄共生住宅峰会」上,创始人滕一帆分享了为什么物业是 AI 落地最快的场景,以及四个 AI Agent 如何形成管理闭环。",
    date: "2026-07-09",
    cover: "/news/china-build-expo-2026-cover.jpg",
    place: "广州 · 广交会展馆",
  },
  {
    slug: "beyond-expo-2026",
    category: "展会",
    title: "启盟科技携 FMClaw™ 亮相 BEYOND Expo 2026",
    desc: "亚洲规模最大的科技创新展会上,作为 NVIDIA Inception 成员企业参展——「AI 从数字走向物理世界」,正是我们在做的事。",
    date: "2026-06-05",
    cover: "/news/beyond-expo-2026-cover.jpg",
    place: "澳门 · 威尼斯人金光会展中心",
  },
  {
    slug: "agentic-ai-ceo-salon",
    category: "活动",
    title: "「智能体 AI 时代」闭门分享会:与数十位 CEO 共探智能体企业",
    desc: "蓝驰创投石建平与启盟科技滕一帆的双视角分享:趋势判断、智能体企业模型、物业行业实战数据,以及给 CEO 的行动框架。",
    date: "2026-04-11",
    cover: "/news/agentic-ai-ceo-salon-cover.jpg",
    place: "广州",
  },
  {
    slug: "nvidia-startup-showcase-2025",
    category: "荣誉",
    title: "启盟科技入围 NVIDIA 创业企业展示并获颁「优秀企业」",
    desc: "入围「2025 NVIDIA 创业企业展示·广州站」与 NVIDIA 初创加速计划,现场路演 AI 现场管理智能体的真实运营数据。",
    date: "2025-08-14",
    cover: "/news/nvidia-startup-showcase-2025-cover.jpg",
    place: "广州",
  },
  {
    slug: "admin-summit-2025",
    category: "展会",
    title: "启盟科技亮相第八届企业行政峰会:FM 智能品控三个真实案例",
    desc: "近两千名行政与设施管理从业者的峰会上,我们讲了三个客户故事:卫生间革命、设备零漏检、百区如一。",
    date: "2025-05-26",
    cover: "/news/admin-summit-2025-cover.jpg",
    place: "深圳 · 大中华喜来登",
  },
];

export function getNews(slug: string): NewsItem {
  const n = NEWS.find((x) => x.slug === slug);
  if (!n) throw new Error(`未知新闻: ${slug}`);
  return n;
}

// 最新在前(登记表本身按倒序维护,这里再排一次以防手误)
export function newsByDate(): NewsItem[] {
  return [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 除当前外的最近 n 条,供正文页"更多动态"
export function getMoreNews(slug: string, n = 3): NewsItem[] {
  return newsByDate().filter((x) => x.slug !== slug).slice(0, n);
}

// 新闻页共享 metadata:canonical 指向自身、og:type=article + 发布时间/栏目。
// 与 insights 的 articleMetadata 同模式;og:url、canonical 为相对路径,
// 由根布局 metadataBase 按当前环境解析成绝对地址。
export function newsMetadata(slug: string): Metadata {
  const n = getNews(slug);
  const url = `/news/${slug}`;
  const title = `${n.title} · 新闻动态 — 启盟科技`;
  return {
    title,
    description: n.desc,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "zh_CN",
      siteName: "启盟科技 FMClaw™",
      url,
      title,
      description: n.desc,
      publishedTime: n.date,
      modifiedTime: n.date,
      authors: ["启盟科技"],
      section: n.category,
      tags: [n.category, "启盟科技", "FMClaw"],
      images: [n.cover],
    },
  };
}
