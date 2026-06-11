// 全站导航与路由配置(锁定结构 A9)。第二期未建页面暂指向最近的核心页。

export type DropItem = { label: string; href: string; small?: string };
export type DropGroup = { heading?: string; items: DropItem[] };
export type MenuItem = {
  label: string;
  href?: string;
  groups?: DropGroup[];
  minWidth?: number;
};

export const MENU: MenuItem[] = [
  {
    label: "产品",
    groups: [
      {
        items: [
          { label: "FMClaw™ AI 平台", href: "/products/fmclaw", small: "All-in-One · Agentic 架构 · 五大模块" },
          { label: "第三方平台 AI 协同", href: "/products/collaboration", small: "钉钉 / 飞书 / 企业微信 · 不替换，只接入" },
          { label: "IoT 物理世界感知系统", href: "/products/iot" },
          { label: "机器人装备", href: "/products/robots", small: "室内清洁 · 四足巡检" },
        ],
      },
    ],
  },
  {
    label: "解决方案",
    minWidth: 330,
    groups: [
      {
        heading: "按 Agent 职能",
        items: [
          { label: "四 Agent 闭环总览", href: "/agents", small: "服务设计 · 运营管理 · 质量评估 · 服务优化" },
          { label: "服务设计", href: "/solutions/service-design" },
          { label: "运营管理", href: "/solutions/operations" },
          { label: "质量评估", href: "/solutions/quality" },
          { label: "服务优化", href: "/solutions/optimization" },
        ],
      },
      {
        heading: "按行业痛点",
        items: [
          { label: "AI 供应商管理与自动对账", href: "/solutions/vendor" },
          { label: "外包管理与质量考评", href: "/solutions" },
          { label: "AI 账单", href: "/solutions" },
        ],
      },
      {
        heading: "For…",
        items: [{ label: "给业主 · 给物业公司 · 给开发者", href: "/#tri" }],
      },
    ],
  },
  { label: "客户案例", href: "/cases" },
  {
    label: "FMAI 工作坊",
    href: "/workshop",
    minWidth: 300,
    groups: [
      {
        items: [
          { label: "FMAI 工作坊(总览)", href: "/workshop", small: "把你自己的 AI，亲手搭出来" },
        ],
      },
      {
        heading: "适用场景",
        items: [
          { label: "水电费审批", href: "/scenarios/utility-bill" },
          { label: "报修智能客服", href: "/scenarios/repair-bot" },
          { label: "管理层问询", href: "/scenarios/exec-query" },
          { label: "AI 对账", href: "/scenarios/reconciliation" },
          { label: "AI 质检", href: "/scenarios/inspection" },
          { label: "智能派单", href: "/scenarios/dispatch" },
        ],
      },
    ],
  },
  { label: "人工智能产业共建", href: "/cobuild" },
  {
    label: "公司",
    groups: [
      {
        items: [
          { label: "关于启盟", href: "/company" },
          { label: "团队", href: "/team" },
          { label: "新闻动态", href: "/news" },
          { label: "行业研究", href: "/insights" },
        ],
      },
    ],
  },
];

export const FOOTER_COLS: { title: string; links: DropItem[] }[] = [
  {
    title: "产品",
    links: [
      { label: "FMClaw™ AI 平台", href: "/products/fmclaw" },
      { label: "第三方平台 AI 协同", href: "/products/collaboration" },
      { label: "IoT 物理感知", href: "/products/iot" },
      { label: "机器人装备", href: "/products/robots" },
    ],
  },
  {
    title: "解决方案",
    links: [
      { label: "服务设计 / 运营管理", href: "/solutions/service-design" },
      { label: "质量评估 / 服务优化", href: "/solutions/quality" },
      { label: "供应商管理与对账", href: "/solutions/vendor" },
      { label: "客户案例", href: "/cases" },
    ],
  },
  {
    title: "共建与公司",
    links: [
      { label: "FMAI 工作坊", href: "/workshop" },
      { label: "人工智能产业共建", href: "/cobuild" },
      { label: "关于启盟 / 团队", href: "/company" },
      { label: "行业研究", href: "/insights" },
    ],
  },
  {
    title: "联系",
    links: [
      { label: "商务合作", href: "/contact" },
      { label: "招商 / 国资对接", href: "/contact" },
      { label: "加入我们", href: "/contact" },
      { label: "公众号", href: "/contact" },
    ],
  },
];
