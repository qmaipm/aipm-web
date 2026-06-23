// 行业研究文章登记表 — 索引页列表、头条与文末"推荐阅读"共用一份数据。
// theme 用于分组与同主题优先的推荐排序。

export type Theme = "OBC 模式" | "数字劳动力" | "行业大模型";

export type Article = {
  slug: string;
  theme: Theme;
  title: string;
  // 列表/卡片上的一句话
  desc: string;
  by: string;
  date: string;
  read: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "why-obc",
    theme: "OBC 模式",
    title: "为什么需要 OBC",
    desc: "“数人头”的合约模式,正是禁锢物业服务行业发展的最大顽疾。",
    by: "AIPM",
    date: "2026.03.04",
    read: "9 分钟",
  },
  {
    slug: "about-obc",
    theme: "OBC 模式",
    title: "关于 OBC 模式 · 以成果为导向的合同",
    desc: "把合同要求从“人头”换成“可衡量的成果”。从新加坡 2017 年的实践说起。",
    by: "AIPM",
    date: "2026.03.12",
    read: "8 分钟",
  },
  {
    slug: "obc-practice",
    theme: "OBC 模式",
    title: "OBC 模式保洁服务管理的落地做法",
    desc: "三步把成果导向落到地上:定结果、盯过程、按成果付费。",
    by: "AIPM",
    date: "2026.03.20",
    read: "8 分钟",
  },
  {
    slug: "obc-impact",
    theme: "OBC 模式",
    title: "OBC 模式的影响力和应用进度",
    desc: "新加坡已有超 110 家机构采用,正向商业领域和海外扩散。",
    by: "AIPM",
    date: "2026.03.28",
    read: "7 分钟",
  },
  {
    slug: "obc-in-china",
    theme: "OBC 模式",
    title: "OBC 模式在中国的落地和实践",
    desc: "不“数人头”,要“看结果”。三个真实项目里的数智化考核。",
    by: "AIPM",
    date: "2026.04.06",
    read: "12 分钟",
  },
  {
    slug: "industry-llm",
    theme: "行业大模型",
    title: "行业大模型 · 物管大模型国内先发",
    desc: "数据 + 算法 + 场景三位一体,打造 AI 物管智能体集群。",
    by: "AIPM",
    date: "2026.04.18",
    read: "10 分钟",
  },
  {
    slug: "digital-labor",
    theme: "数字劳动力",
    title: "关于数字劳动力 · 第四种用工模式",
    desc: "打破人与机器的边界,以数字化技术赋予“活力”的第四种用工模式。",
    by: "AIPM",
    date: "2026.05.02",
    read: "9 分钟",
  },
  {
    slug: "digital-labor-trends",
    theme: "数字劳动力",
    title: "数字劳动力的发展趋势",
    desc: "AI Agent 让“人机协同”成为新常态,个人与企业步入 AI 助理时代。",
    by: "AIPM",
    date: "2026.05.14",
    read: "10 分钟",
  },
];

export const THEMES: Theme[] = ["OBC 模式", "数字劳动力", "行业大模型"];

export function getArticle(slug: string): Article {
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) throw new Error(`未知文章: ${slug}`);
  return a;
}

// 同主题优先,补足到 n 篇
export function getRecommended(slug: string, n = 3): Article[] {
  const cur = getArticle(slug);
  const others = ARTICLES.filter((a) => a.slug !== slug);
  const sameTheme = others.filter((a) => a.theme === cur.theme);
  const rest = others.filter((a) => a.theme !== cur.theme);
  return [...sameTheme, ...rest].slice(0, n);
}
