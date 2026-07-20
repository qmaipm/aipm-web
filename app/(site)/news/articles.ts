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
    title: "台湾企业参访团对话启盟科技：聚焦AI物业管理，共探物业智能体在台落地合作",
    desc: "7月11日下午，2026第28届中国建博会（广州）落幕之际，台湾保全商业同业公会参访团与广州启盟科技围绕物业智能体 FMClaw 展开了一场聚焦AI物业的专项交流座谈。",
    date: "2026-07-13",
    cover: "/news/taiwan-delegation-exchange-cover.jpg",
    place: "广州",
  },
  {
    slug: "china-build-expo-2026",
    category: "展会",
    title: "从“人管”到“智管”：启盟科技携AI物业经理FMClaw亮相2026第28届中国建博会",
    desc: "展会期间，“AI赋能全龄共生住宅峰会”同期举办，启盟科技创始人兼CEO滕一帆受邀发表主题分享，介绍公司自主研发的AI物业经理 FMClaw。",
    date: "2026-07-09",
    cover: "/news/china-build-expo-2026-cover.jpg",
    place: "广州 · 广交会展馆",
  },
  {
    slug: "beyond-expo-2026",
    category: "展会",
    title: "启盟科技携 FM Claw 亮相 BEYOND Expo 2026",
    desc: "5月27日至30日，亚洲规模最大的科技创新展会 BEYOND Expo 2026 在澳门举行，启盟科技作为 NVIDIA Inception 成员企业携 FM Claw 亮相展会。",
    date: "2026-06-05",
    cover: "/news/beyond-expo-2026-cover.jpg",
    place: "澳门 · 威尼斯人金光会展中心",
  },
  {
    slug: "agentic-ai-ceo-salon",
    category: "活动",
    title: "《智能体AI时代》闭门分享会：从认知觉醒到实战落地——与CEO们共赴智能体企业转型之路",
    desc: "4月11日，一场关于“智能体AI时代”的深度闭门分享会在广州成功举行，汇聚了物业管理、物流、互联网等十多个行业的数十位CEO和核心管理者。",
    date: "2026-04-11",
    cover: "/news/agentic-ai-ceo-salon-cover.jpg",
    place: "广州",
  },
  {
    slug: "nvidia-startup-showcase-2025",
    category: "荣誉",
    title: "启盟科技携AI物管-现场管理智能体，亮相2025NVIDIA创业企业展示-广州站",
    desc: "8月12日，启盟科技成功入围“2025 NVIDIA创业企业展示-广州站”和“NVIDIA 初创加速计划”，并于现场获颁“优秀企业”证书。",
    date: "2025-08-14",
    cover: "/news/nvidia-startup-showcase-2025-cover.jpg",
    place: "广州",
  },
  {
    slug: "admin-summit-2025",
    category: "展会",
    title: "启盟科技（爱物管）亮相第八届行政峰会，引领行政物管智能品控新趋势",
    desc: "5月24日，第八届企业行政峰会在深圳启幕。启盟科技携FM重点场景智能品控解决方案亮相，展示如何通过AIoT技术与AI赋能，实现服务品质与成本控制的双赢。",
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
