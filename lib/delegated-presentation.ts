import type { Assessment, CHOICES, Grade } from "./delegated-policy";

// Public wording is separate from V2.0 policy. Keys retain the existing submission values.
type ChoiceCopy = {
  [K in keyof typeof CHOICES]: {
    question: string;
    hint: string;
    labels: Record<(typeof CHOICES)[K][number][0], string>;
  };
};
export const PROJECT_CHOICES = {
  location: {
    question: "项目在哪类区域？",
    hint: "首项含核心商务区、重点产业区、国家级或省级园区。不清楚可跳过。",
    labels: {
      5: "核心商务／重点产业区",
      4: "重点发展／成熟产业区",
      3: "一般城区，产业较稳定",
      2: "城市外围，集聚一般",
      1: "位置较偏，经营支撑弱",
    },
  },
  transport: {
    question: "到项目方便吗？",
    hint: "综合公共交通、主要道路等条件判断。",
    labels: { 4: "交通完善", 3: "比较方便", 2: "基本能满足", 1: "不太方便" },
  },
  amenities: {
    question: "周边生活配套怎么样？",
    hint: "主要看餐饮、购物、住宿、医疗等。",
    labels: { 3: "配套成熟", 2: "主要配套都有", 1: "只有少量配套", 0: "基本没有配套" },
  },
  strategy: {
    question: "项目有重点或示范价值吗？",
    hint: "重点项目需有政府、园区或业主的正式材料。其他选项按实际示范、展示或复制价值判断。",
    labels: { 3: "正式重点项目，有材料", 2: "行业代表／区域示范", 1: "有一定展示或复制价值", 0: "暂无重点或示范属性" },
  },
  guarantee: {
    question: "空置部分有收入保障吗？",
    hint: "“全部保障”需覆盖全部空置面积，且有书面、可执行安排。口头承诺不算。",
    labels: { 5: "全部空置面积都有保障", 3: "部分保障／保底／补贴", 0: "没有明确保障" },
  },
} as const satisfies ChoiceCopy;

// Names describe a provisional cooperation direction, not property quality or admission.
export const COOPERATION_DIRECTIONS = {
  A: { label: "甄选合作", description: "优先对接委托需求，进一步核实合作方案。" },
  B: { label: "优选合作", description: "围绕现有经营条件，推进标准合作方案沟通。" },
  C: { label: "精选合作", description: "从委托范围、现有服务预算与运营目标出发，进一步明确合作条件。" },
  reserve: { label: "合作探索", description: "先梳理实际需求，再探讨现阶段适合的合作方式。" },
} as const satisfies Record<Grade, { label: string; description: string }>;

export const PROJECT_SECTIONS = [
  { label: "位置与配套", keys: ["location", "transport", "amenities", "strategy"] },
  { label: "管理面积", keys: ["area"] },
  { label: "现有收入", keys: ["revenue"] },
  { label: "入住与保障", keys: ["occupancy", "guarantee"] },
  { label: "固定服务人员", keys: ["staff"] },
] as const satisfies readonly { label: string; keys: readonly (keyof Assessment)[] }[];

// Only the revenue input uses 万元. Internal calculations and submissions remain in 元.
export function assessmentInputValue(key: keyof Assessment, value: string): number | null {
  return value === "" ? null : Number(value) * (key === "revenue" ? 10000 : 1);
}
export function assessmentDisplayValue(key: keyof Assessment, value: number | null): number | "" {
  return value === null ? "" : value / (key === "revenue" ? 10000 : 1);
}
