// 工具箱 · AI 物业管理系统：5 个核心系统（总页卡片、子页底部导航、导航菜单共用）。
export const HUB = "/products/fmclaw/connectors";

export const SYSTEMS = [
  { slug: "owner", ai: ["一句话或语音报修", "自动建单、超时升级", "工单与满意度看板"], name: "业主小程序与工单", full: "业主小程序与物业工单系统", line: "业主说一句话，工单自己建好、跟到办完", img: "/scene/ow-voice.webp", alt: "业主在家中厨房对着手机发语音报修漏水的水管" },
  { slug: "billing", ai: ["业务发生自动出账", "欠费分层提醒", "应收应付自动核对"], name: "物业收费系统", full: "物业收费系统", line: "修完直接出账，欠费和应收应付自动分析", img: "/scene/vd-invoice.webp", alt: "财务人员在办公桌前核对账单" },
  { slug: "parking", ai: ["日报每天主动送达", "违规抬杆自动列出", "长时间停放提醒"], name: "停车场管理系统", full: "停车场管理系统", line: "每天早上，停车日报自动发到项目经理手机上", img: "/scene/park-pm.webp", alt: "项目经理在地下车库道闸旁看手机上的停车日报" },
  { slug: "access", ai: ["一句话邀请访客", "访客车同步放行", "门禁故障自动派单"], name: "门禁与访客系统", full: "门禁与访客管理系统", line: "访客一句话邀请，哪个门禁点坏了系统先知道", img: "/scene/ac-visitor.webp", alt: "访客在写字楼大堂用手机扫码通过闸机" },
  { slug: "building", ai: ["数据接入不换设备", "同比环比自动分析", "异常直接变工单"], name: "楼宇自控与设备能耗", full: "楼宇自控与设备能耗系统", line: "设备数据接进来，漏水这类异常直接变工单", img: "/scene/iot-plant.webp", alt: "工程人员在水泵房检查设备" },
] as const;

export type SysSlug = (typeof SYSTEMS)[number]["slug"];
export const sysHref = (slug: string) => `${HUB}/${slug}`;
