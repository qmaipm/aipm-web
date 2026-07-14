// 全站导航与路由配置(锁定结构 A9)。第二期未建页面暂指向最近的核心页。

export type DropItem = { label: string; href: string; small?: string; links?: { label: string; href: string }[] };
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
    label: "智能体解决方案",
    href: "/agents",
    minWidth: 320,
    groups: [
      {
        heading: "产品套件",
        items: [
          {
            label: "Agentic 产品套件",
            href: "/agents",
            links: [
              { label: "服务设计", href: "/solutions/service-design" },
              { label: "运营管理", href: "/solutions/operations" },
              { label: "质量评估", href: "/solutions/assessment" },
              { label: "服务优化", href: "/solutions/optimization" },
            ],
          },
        ],
      },
      {
        heading: "解决方案",
        items: [
          { label: "人员成本优化", href: "/solutions/cost" },
          { label: "服务质量管理", href: "/solutions/quality" },
          { label: "客户服务", href: "/solutions/customer" },
          { label: "服务分包管理", href: "/solutions/subcontract" },
          { label: "设备巡检管理", href: "/solutions/inspection" },
          { label: "人员薪酬管理", href: "/solutions/payroll" },
          { label: "采购管理", href: "/solutions/procurement" },
        ],
      },
    ],
  },
  {
    label: "AI 物业服务",
    href: "/ai-service",
    minWidth: 300,
    groups: [
      {
        items: [
          { label: "AI 物业服务(总览)", href: "/ai-service", small: "换物业,先换一种方式" },
        ],
      },
      {
        heading: "四大工种",
        items: [
          { label: "AI 清洁服务", href: "/ai-service/cleaning", small: "干没干,数据会说话" },
          { label: "AI 设施设备服务", href: "/ai-service/facility", small: "每一次巡检,都真实发生" },
          { label: "AI 安保服务", href: "/ai-service/security", small: "人看不过来的,交给 AI 看" },
          { label: "AI 客服管家", href: "/ai-service/customer-service", small: "站在你这边的物业管家" },
        ],
      },
    ],
  },
  { label: "客户案例", href: "/cases" },
  {
    label: "FMClaw™ 加速营",
    href: "/workshop",
    minWidth: 300,
    groups: [
      {
        items: [
          { label: "FMClaw™ 加速营(总览)", href: "/workshop", small: "把你自己的 AI，亲手搭出来" },
        ],
      },
      {
        heading: "四种服务形式",
        items: [
          { label: "Demo Day", href: "/workshop/demo-day", small: "半天–1 天 · 眼见为实" },
          { label: "加速营 · Bootcamp", href: "/workshop/bootcamp", small: "2–3 天 · 亲手搭出来" },
          { label: "AI 应用创新大赛", href: "/workshop/competition", small: "2–4 周 · 以赛促用" },
          { label: "FDE 服务", href: "/workshop/fde", small: "按阶段交付 · 落地到系统" },
        ],
      },
    ],
  },
  { label: "人工智能产业共建", href: "/cobuild" },
  {
    label: "生态伙伴",
    href: "/partners",
    minWidth: 320,
    groups: [
      {
        items: [
          { label: "生态伙伴(总览)", href: "/partners", small: "我们做产品和平台，伙伴赢市场" },
        ],
      },
      {
        heading: "合作方向",
        items: [
          { label: "智能建筑伙伴", href: "/partners/building", small: "招标里的智能体要求，带着 FMClaw 去应" },
          { label: "渠道伙伴", href: "/partners/channel", small: "按项目 / 按区域 / 按产品，三种合作模式" },
        ],
      },
    ],
  },
  {
    label: "公司",
    groups: [
      {
        items: [
          { label: "关于启盟科技", href: "/company" },
          { label: "团队", href: "/team" },
          { label: "新闻动态", href: "/news" },
          { label: "行业研究", href: "/insights" },
          { label: "联系我们", href: "/contact" },
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
    title: "AI 物业服务",
    links: [
      { label: "AI 物业服务总览", href: "/ai-service" },
      { label: "AI 清洁服务", href: "/ai-service/cleaning" },
      { label: "AI 设施设备服务", href: "/ai-service/facility" },
      { label: "AI 安保服务", href: "/ai-service/security" },
      { label: "AI 客服管家", href: "/ai-service/customer-service" },
    ],
  },
  {
    title: "智能体解决方案",
    links: [
      { label: "Agentic 产品套件", href: "/agents" },
      { label: "人员成本优化", href: "/solutions/cost" },
      { label: "服务质量管理", href: "/solutions/quality" },
      { label: "服务分包管理", href: "/solutions/subcontract" },
      { label: "客户案例", href: "/cases" },
    ],
  },
  {
    title: "共建与公司",
    links: [
      { label: "FMClaw™ 加速营", href: "/workshop" },
      { label: "人工智能产业共建", href: "/cobuild" },
      { label: "生态伙伴", href: "/partners" },
      { label: "关于启盟科技 / 团队", href: "/company" },
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
