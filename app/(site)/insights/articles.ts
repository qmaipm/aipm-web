// 行业研究文章登记表 — 索引页列表、头条、文末"推荐阅读"与结构化数据(Article/FAQPage)共用一份数据。
// theme 用于分组与同主题优先的推荐排序;faq 用于正文末 FAQ 区块 + GEO 的 FAQPage 结构化数据。

export type Theme = "OBC 模式" | "数字劳动力" | "行业大模型";
export type Faq = { q: string; a: string };

export type Article = {
  slug: string;
  theme: Theme;
  title: string;
  // 列表/卡片上的一句话
  desc: string;
  by: string;
  date: string;
  read: string;
  faq?: Faq[];
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
    faq: [
      {
        q: "什么是“数人头”的物业合约模式?",
        a: "指合同只按现场配置的岗位/人数计价与考核,而不看实际服务结果。它容易滋生“偷人头”、带来审计风险,并让“降本”等同于“减人头”,与服务商利益直接冲突。",
      },
      {
        q: "物业行业为什么需要 OBC?",
        a: "因为“数人头”奖励的是“看起来有人在”,而不是“事情做好”。把合约的锚点从人头换成可衡量的成果(即 OBC),才能同时改善成本、服务质量与甲乙双方的合作关系。",
      },
    ],
  },
  {
    slug: "about-obc",
    theme: "OBC 模式",
    title: "关于 OBC 模式 · 以成果为导向的合同",
    desc: "把合同要求从“人头”换成“可衡量的成果”。从新加坡 2017 年的实践说起。",
    by: "AIPM",
    date: "2026.03.12",
    read: "8 分钟",
    faq: [
      {
        q: "OBC(Outcome-Based Contracting)是什么?",
        a: "OBC 即“以成果为导向的合同模式”:服务购买方以可衡量的绩效成果(而非人员编制数量)作为合同要求与付费依据。",
      },
      {
        q: "OBC 有哪些特点?",
        a: "三个特点——结果导向(合同规定期望达成的结果)、灵活性(供应商自主选择技术与人员配置)、创新激励(省下的成本可转化为利润)。",
      },
    ],
  },
  {
    slug: "obc-practice",
    theme: "OBC 模式",
    title: "OBC 模式保洁服务管理的落地做法",
    desc: "三步把成果导向落到地上:定结果、盯过程、按成果付费。",
    by: "AIPM",
    date: "2026.03.20",
    read: "8 分钟",
    faq: [
      {
        q: "OBC 模式怎么落地到保洁服务?",
        a: "三步:一、明确可量化的结果指标(如卫生评估分数、服务达成率、投诉率、响应时间);二、用智能 IoT 与管理软件做实时绩效监控与反馈;三、把服务商报酬与实际达成的成果挂钩。",
      },
    ],
  },
  {
    slug: "obc-impact",
    theme: "OBC 模式",
    title: "OBC 模式的影响力和应用进度",
    desc: "新加坡已有超 110 家机构采用,正向商业领域和海外扩散。",
    by: "AIPM",
    date: "2026.03.28",
    read: "7 分钟",
    faq: [
      {
        q: "OBC 模式目前应用到什么程度?",
        a: "据公开报道,新加坡已有超过 110 家机构采用 OBC 模式,并从政府与公共机构,逐步向商业物业以及中东等海外地区扩散。",
      },
    ],
  },
  {
    slug: "obc-in-china",
    theme: "OBC 模式",
    title: "OBC 模式在中国的落地和实践",
    desc: "不“数人头”,要“看结果”。三个真实项目里的数智化考核。",
    by: "AIPM",
    date: "2026.04.06",
    read: "12 分钟",
    faq: [
      {
        q: "OBC 在中国怎么落地考核?",
        a: "基于自研的智能服务记录(SSR,Smart Service Record)采集现场工时、到岗、达标等过程数据,再按 OBC 指标对服务供应商进行考核与对账——核心是“看结果”而非“数人头”。",
      },
      {
        q: "OBC 模式带来了哪些可量化成效?",
        a: "在公开案例中:某联合办公用户对账成本减少约 260 人/天/月、管理成本节省约 17%;某快递物流服务商设备临时故障率下降约 42%;某通信制造企业重点区域巡检到岗率提升约 60%。(数据来自项目案例,引用时以实际项目口径为准。)",
      },
    ],
  },
  {
    slug: "industry-llm",
    theme: "行业大模型",
    title: "行业大模型 · 物管大模型国内先发",
    desc: "数据 + 算法 + 场景三位一体,打造 AI 物管智能体集群。",
    by: "AIPM",
    date: "2026.04.18",
    read: "10 分钟",
    faq: [
      {
        q: "物管行业大模型和通用大模型有什么不同?",
        a: "行业大模型真正难复制的是“数据 + 算法 + 场景”的三位一体能力——有足够规模且干净的行业数据、沉淀多年的算法,以及源源不断的真实场景去训练和校正。通用模型很强,但不懂某个行业的具体活儿。",
      },
    ],
  },
  {
    slug: "digital-labor",
    theme: "数字劳动力",
    title: "关于数字劳动力 · 第四种用工模式",
    desc: "打破人与机器的边界,以数字化技术赋予“活力”的第四种用工模式。",
    by: "AIPM",
    date: "2026.05.02",
    read: "9 分钟",
    faq: [
      {
        q: "什么是数字劳动力 / 数字员工?",
        a: "数字劳动力(也称数字员工)是打破人与机器边界、以数字化技术赋予“活力”的第四种企业用工模式,与全职、外包、兼职员工互补,擅长 7×24 小时不间断地处理重复性工作。",
      },
    ],
  },
  {
    slug: "digital-labor-trends",
    theme: "数字劳动力",
    title: "数字劳动力的发展趋势",
    desc: "AI Agent 让“人机协同”成为新常态,个人与企业步入 AI 助理时代。",
    by: "AIPM",
    date: "2026.05.14",
    read: "10 分钟",
    faq: [
      {
        q: "数字劳动力的发展趋势是什么?",
        a: "AI Agent 让“人机协同”成为新常态。据埃森哲、IDC 等机构报告,多数企业高管认为 AI Agent 将在未来数年带来重大机遇,且相当比例的企业已在某项工作中试点或正在制定应用计划。",
      },
    ],
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
