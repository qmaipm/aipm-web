// 微信公众号文章拉取。
// 数据来源:发布能力 freepublish/batchget + 草稿箱 draft/batchget 两个渠道合并。
//   - freepublish:通过「发布」发出去的图文(较早,链接为 /s/<id> 新形式)。
//   - draft(草稿箱):近年「草稿→群发」的图文留在这里(含最新「启盟科技」内容,链接为 /s?__biz=… 老形式)。
// 同一篇文章在两个渠道里 url 形式不同,因此按「标题」去重;只保留有公开 url 的(滤掉没发出去的纯草稿)。
// 老的 2020–2021「爱物管」永久图文素材(material)按需求不纳入。
//
// 仅服务端使用。凭据来自环境变量(WECHAT_APPID / WECHAT_APPSECRET),切勿写进代码或提交。
// 前提:公众号已认证且有相应权限,且把部署服务器出口 IP 加入公众号 IP 白名单。
// 任何失败(未配置 / 网络不可达 / 接口报错)都返回空数组,由页面回退到静态内容。

const TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";
const FREEPUBLISH_URL = "https://api.weixin.qq.com/cgi-bin/freepublish/batchget";
const DRAFT_URL = "https://api.weixin.qq.com/cgi-bin/draft/batchget";

export type WechatArticle = {
  title: string;
  url: string;
  digest: string;
  date: string; // 形如 "2026 · 04 · 18"
  cover?: string;
};

type RawArticle = WechatArticle & { ts: number };

// access_token 有效期约 2 小时、每日调用次数有限,这里做进程内缓存。
let tokenCache: { token: string; expires: number } | null = null;

async function getAccessToken(appid: string, secret: string): Promise<string | null> {
  const now = Date.now();
  if (tokenCache && tokenCache.expires > now + 60_000) return tokenCache.token;
  const res = await fetch(
    `${TOKEN_URL}?grant_type=client_credential&appid=${encodeURIComponent(appid)}&secret=${encodeURIComponent(secret)}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!data?.access_token) {
    console.error("[wechat] 获取 access_token 失败:", data);
    return null;
  }
  tokenCache = { token: data.access_token, expires: now + (Number(data.expires_in) || 7200) * 1000 };
  return tokenCache.token;
}

function fmtDate(unixSec?: number): string {
  if (!unixSec) return "";
  const d = new Date(unixSec * 1000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()} · ${p(d.getMonth() + 1)} · ${p(d.getDate())}`;
}

// 标题黑名单:公司介绍/关于我们、联系我们、品牌简介、关于琥珀 等"网站页面"类条目,不当新闻展示。
const BLOCK_TITLES = ["关于我们", "关于爱物管", "公司介绍", "品牌简介", "联系我们", "关于琥珀"];
const isBlocked = (t: string) => BLOCK_TITLES.some((k) => t.includes(k));

// 分页拉取一个列表接口(freepublish 或 draft),展开图文里的每条子文章。
// 跳过:已删除的、缺 url 或标题的(没发出去的纯草稿 url 为空,会在此被滤掉)、以及黑名单页面。
async function fetchList(listUrl: string, token: string): Promise<RawArticle[]> {
  const PAGE = 20; // 单次上限
  const HARD_CAP = 2000; // 防御性上限,避免接口异常时无限翻页
  const out: RawArticle[] = [];

  for (let offset = 0; offset < HARD_CAP; offset += PAGE) {
    const res = await fetch(`${listUrl}?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offset, count: PAGE, no_content: 1 }),
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    if (!Array.isArray(data?.item)) {
      if (offset === 0) console.error("[wechat] 列表获取失败:", listUrl, data);
      break;
    }
    for (const it of data.item) {
      const ts = Number(it.update_time || it.content?.update_time || 0);
      for (const n of it.content?.news_item ?? []) {
        if (n?.is_deleted) continue; // 已删除的不取
        if (!n?.url || !n?.title) continue; // 没有公开链接(未发布草稿)或缺标题的不取
        if (isBlocked(n.title)) continue; // 公司介绍/联系我们/品牌简介等页面不当新闻
        out.push({ title: n.title, url: n.url, digest: n.digest || "", date: fmtDate(ts), cover: n.thumb_url || undefined, ts });
      }
    }
    const total = Number(data.total_count) || 0;
    if (data.item.length === 0 || offset + PAGE >= total) break;
  }
  return out;
}

// 手动补充:接口拉不到的文章(群发后草稿被删 / 转载等)。
// 封面用文章 og:image(新闻页以 referrerPolicy="no-referrer" 加载,可绕过微信图片防盗链)。
// 日期格式 "YYYY-MM-DD";会和接口结果按标题去重合并,不会重复。
const MANUAL: { title: string; url: string; date: string; cover?: string }[] = [
  {
    title: "《智能体AI时代》闭门分享会：从认知觉醒到实战落地——与CEO们共赴智能体企业转型之路",
    url: "https://mp.weixin.qq.com/s/EAN3ZMGZ6pj4WoUMYi3nZA",
    date: "2026-04-11",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/XRyicMjm4ePzibX5c7BWRTOUic1h5NHTWaGWdOhnqsFF40kiasmCEcjfndH13icIYkYNqt3IK5yrtjYSgd4Nax53VXWT19J8nKMkuwuJkOeIXOsY/0?wx_fmt=jpeg",
  },
  {
    title: "启盟科技创始人滕一帆受邀做客广东广播电视台科技节目，拆解AI智能体在物管领域的深度应用与价值",
    url: "https://mp.weixin.qq.com/s/bgG7sXtoM_lBbZBdjIuHOg",
    date: "2025-09-17",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/JQ8zY1kjTXs82oP7ErXOGpiaSPnCVanFviaD9KX9G1aZypEWicOpvzxbrm3du4WTC0PJgv4wZFSibA40T6a8uerGlw/0?wx_fmt=jpeg",
  },
  {
    title: "启盟科技（爱物管）亮相第八届行政峰会，引领行政物管智能品控新趋势",
    url: "https://mp.weixin.qq.com/s/X6Jx51BwDX0QfJl1R3mmzA",
    date: "2025-05-26",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/JQ8zY1kjTXv9gRLjTSHQ4V9vkicAXeS66rQvcJiceJRD8poRGYxzovqtUFIoQXR9lVrBuBSiaWb3wo4pxib52fxRRg/0?wx_fmt=jpeg",
  },
  {
    title: "爱物管荣获“行政后勤优秀服务商奖”，携智能服务记录解决方案亮相第七届企业行政峰会",
    url: "https://mp.weixin.qq.com/s/fulGccTI6dLdtKZilCqSuQ",
    date: "2024-05-18",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/JQ8zY1kjTXt8kNdv5VqrYg2AR3KWiaDTZtW5cSkc8nLR42JHVUWY4uXqOXNxeUicw6pSS20Qpw8ZUJepoJUOkz6A/0?wx_fmt=jpeg",
  },
  {
    title: "喜报 | 爱物管荣获第十二届中国创新创业大赛（广东·广州赛区）优胜奖",
    url: "https://mp.weixin.qq.com/s/zafV2Rj-43vPeoCt_m0AgQ",
    date: "2024-01-26",
    cover: "https://mmbiz.qpic.cn/sz_mmbiz_jpg/JQ8zY1kjTXv1v5CMPXLKzdJp8ECMT1LU5pVe4bz3icw2BiaFvV8AYibJohGDhyREEKNNLEKTCiaTUtl6uNBo6Vakmw/0?wx_fmt=jpeg",
  },
];

function manualArticles(): RawArticle[] {
  return MANUAL.map((m) => ({
    title: m.title,
    url: m.url,
    digest: "",
    date: m.date.replace(/-/g, " · "),
    cover: m.cover,
    ts: Math.floor(new Date(`${m.date}T12:00:00+08:00`).getTime() / 1000),
  }));
}

// 合并、按标题去重(同一篇在不同渠道 url 形式不同)、按时间倒序。
function dedupeSort(list: RawArticle[]): WechatArticle[] {
  const merged = [...list].sort((a, b) => b.ts - a.ts);
  const seen = new Set<string>();
  const out: RawArticle[] = [];
  for (const a of merged) {
    const key = a.title.replace(/\s+/g, "").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(a);
  }
  return out.map(({ ts: _ts, ...a }) => a);
}

/**
 * 拉取公众号文章:freepublish + 草稿箱 接口 + 手动补充清单,合并去重,按时间倒序(最新在前)。
 */
export async function getWechatArticles(): Promise<WechatArticle[]> {
  const manual = manualArticles();
  const appid = process.env.WECHAT_APPID;
  const secret = process.env.WECHAT_APPSECRET;
  if (!appid || !secret) return dedupeSort(manual); // 未配置:至少显示手动补充

  try {
    const token = await getAccessToken(appid, secret);
    if (!token) return dedupeSort(manual);

    const [fp, draft] = await Promise.all([fetchList(FREEPUBLISH_URL, token), fetchList(DRAFT_URL, token)]);
    const result = dedupeSort([...fp, ...draft, ...manual]);
    console.log(`[wechat] freepublish=${fp.length} | 草稿箱=${draft.length} | 手动=${manual.length} | 合并去重后=${result.length}`);
    return result;
  } catch (e) {
    console.error("[wechat] 拉取异常:", e);
    return dedupeSort(manual);
  }
}
