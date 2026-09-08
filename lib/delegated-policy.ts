/** 公开白皮书 V2.1（2026-09，名称由「AI 物业代运营」统一为「物业委托管理」，政策条款与 V2.0 等效），第 12–27、41–48 页。
 * 唯一政策源：人员规模/密度单向加分；战略评分和 S 奖励有意并存。
 * 所有金额为人民币元，面积为平方米。预评级不是准入或权益确认。
 */
export const POLICY = {
  version: "2.1", published: "2026-09", protectionDays: 180, renewalDays: 90,
  maxProtectionMonths: 12, maxMonths: 36, strategicBonus: 20000,
  whitepaper: "/downloads/property-management-contract-partners-v2.1.pdf",
} as const;
export const PARTNER_PATH = "/partners/delegated-operation";
export const PROJECT_PATH = `${PARTNER_PATH}/project`;
export const GRADES = {
  A: { label: "A 级", min: 80, positioning: "核心开发项目", opening: 80000, fixed: 0.15, efficiency: 0.05 },
  B: { label: "B 级", min: 70, positioning: "标准开发项目", opening: 60000, fixed: 0.12, efficiency: 0.04 },
  C: { label: "C 级", min: 60, positioning: "谨慎开发项目", opening: 40000, fixed: 0.10, efficiency: 0.03 },
  reserve: { label: "储备级", min: 0, positioning: "暂不纳入标准分润", opening: 0, fixed: 0, efficiency: 0 },
} as const;
export type Grade = keyof typeof GRADES;
export const ROLES = {
  refer: { label: "项目推荐型", factor: 0.5, work: "真实信息、项目报备、决策人引荐及首次正式沟通" },
  assist: { label: "商务协助型", factor: 0.75, work: "关键客户关系、资料收集、踏勘、方案汇报及商务协调" },
  develop: { label: "全程开发型", factor: 1, work: "项目开发、资料与方案协调、商务谈判、签约及进场交接" },
} as const;
export type Role = keyof typeof ROLES;
export const CHOICES = {
  location: [
    [5, "核心商务区、重点产业区、国家级或省级园区"],
    [4, "城市重点发展区域或成熟产业集聚区"], [3, "一般城市功能区，产业基础较稳定"],
    [2, "城市外围，产业或商务集聚度一般"], [1, "区位较偏，经营支撑较弱"],
  ],
  transport: [[4, "轨道交通、高速、主干道或公共交通完善"], [3, "主要交通条件较好"], [2, "基本交通条件具备"], [1, "交通相对不便"]],
  amenities: [[3, "商业、餐饮、住宿、医疗等配套成熟"], [2, "具备主要配套"], [1, "配套有限"], [0, "缺乏基本配套"]],
  strategy: [[3, "有政府、园区或业主正式重点项目材料"], [2, "明确行业代表性或区域示范价值"], [1, "一定展示或复制价值"], [0, "无明确战略属性"]],
  guarantee: [[5, "全部空置面积有明确、书面、可执行的收入保障"], [3, "部分保障、最低收入保障或有效补贴"], [0, "无明确收入保障"]],
} as const;
export const BANDS = {
  area: [[100000, 20], [80000, 18], [50000, 15], [30000, 12], [10000, 8], [0, 5]],
  revenue: [[10000000, 25], [6000000, 22], [3000000, 18], [1500000, 14], [800000, 10], [0, 5]],
  occupancy: [[90, 10], [80, 8], [65, 6], [50, 4], [0, 2]],
  staff: [[50, 20], [40, 18], [30, 15], [20, 12], [10, 8], [0, 4]],
  density: [[5, 5], [4, 4], [3, 3], [2, 2], [0, 1]],
} as const;
export type Assessment = {
  location: number | null; transport: number | null; amenities: number | null;
  strategy: number | null; area: number | null; revenue: number | null;
  occupancy: number | null; guarantee: number | null; staff: number | null;
};
export const EMPTY_ASSESSMENT: Assessment = {
  location: null, transport: null, amenities: null, strategy: null,
  area: null, revenue: null, occupancy: null, guarantee: null, staff: null,
};
export function validateAssessment(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "项目评分资料格式不正确。";
  const v = value as Record<string, unknown>;
  for (const key of Object.keys(EMPTY_ASSESSMENT) as (keyof Assessment)[]) {
    const n = v[key];
    if (n === null) continue;
    if (typeof n !== "number" || !Number.isFinite(n) || n < 0) return "评分资料需填写有效的非负数字，未知项请留空。";
    if (key in CHOICES && !CHOICES[key as keyof typeof CHOICES].some(([score]) => score === n)) return "请从规定的评分选项中选择。";
    if (key === "area" && (n <= 0 || n > 1e9)) return "管理面积需大于零，且不超过十亿平方米。";
    if (key === "revenue" && n > 1e12) return "年度收入超出可评估范围。";
    if (key === "occupancy" && n > 100) return "入住率应在 0% 至 100% 之间。";
    if (key === "staff" && (!Number.isInteger(n) || n > 1e6)) return "在岗人数应为有效的非负整数。";
  }
  return null;
}
export function bandScore(value: number, bands: readonly (readonly [number, number])[]): number {
  return bands.find(([min]) => value >= min)?.[1] ?? 0;
}
export function gradeForScore(total: number): Grade {
  return total >= 80 ? "A" : total >= 70 ? "B" : total >= 60 ? "C" : "reserve";
}
export function scoreProject(a: Assessment) {
  const error = validateAssessment(a);
  if (error) throw new Error(error);
  const locationParts = [a.location, a.transport, a.amenities, a.strategy];
  const location = locationParts.every((n) => n !== null) ? locationParts.reduce<number>((sum, n) => sum + (n ?? 0), 0) : null;
  const occupancy = a.occupancy === null || a.guarantee === null ? null :
    Math.max(bandScore(a.occupancy, BANDS.occupancy), a.guarantee === 5 ? 8 : 0) + a.guarantee;
  const density = a.area === null || a.staff === null ? null : a.staff / (a.area / 10000);
  const dimensions = [
    { label: "区位与战略属性", max: 15, score: location },
    { label: "实际管理面积", max: 20, score: a.area === null ? null : bandScore(a.area, BANDS.area) },
    { label: "当前可确认物业收入", max: 25, score: a.revenue === null ? null : bandScore(a.revenue, BANDS.revenue) },
    { label: "入住率及收入保障", max: 15, score: occupancy },
    { label: "现有人员编制", max: 25, score: a.staff === null || density === null ? null : bandScore(a.staff, BANDS.staff) + bandScore(density, BANDS.density) },
  ];
  const complete = dimensions.every((d) => d.score !== null);
  const total = complete ? dimensions.reduce((sum, d) => sum + (d.score ?? 0), 0) : null;
  return { dimensions, total, grade: total === null ? null : gradeForScore(total), density };
}
export function estimateReturns(grade: Grade, role: Role, strategic: boolean, fixedAnnual: number, efficiencyAnnual: number, months: number) {
  if (!Object.hasOwn(GRADES, grade) || !Object.hasOwn(ROLES, role)) throw new Error("项目等级或角色无效。");
  if ([fixedAnnual, efficiencyAnnual].some((v) => !Number.isFinite(v) || v < 0 || v > 1e12)) throw new Error("酬金应为有效的非负金额。");
  if (!Number.isInteger(months) || months < 1 || months > POLICY.maxMonths) throw new Error("测算期限应为 1 至 36 个月。");
  const g = GRADES[grade];
  const factor = ROLES[role].factor;
  const cents = (v: number) => Math.round(v * 100) / 100;
  const opening = cents((g.opening + (strategic && grade !== "reserve" ? POLICY.strategicBonus : 0)) * factor);
  const fixed = cents(fixedAnnual * g.fixed * factor * months / 12);
  const efficiency = cents(efficiencyAnnual * g.efficiency * factor * months / 12);
  return { opening, fixed, efficiency, total: cents(opening + fixed + efficiency), fixedRate: g.fixed * factor, efficiencyRate: g.efficiency * factor };
}
export const money = (n: number) => new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 }).format(n);
export const percent = (n: number) => `${Number((n * 100).toFixed(2))}%`;

export const PROPERTY_TYPES = ["产业园区", "科技园区", "写字楼及企业总部", "商业综合体", "工厂及生产基地", "物流园区", "同区域打包项目", "其他待评估"] as const;
export const CONTACT_STAGES = ["已与决策人沟通，可安排会面", "已建立联系，正在协调会面", "已有明确项目，需补充决策人信息"] as const;
