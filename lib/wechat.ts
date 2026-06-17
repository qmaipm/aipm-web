// 微信公众号「已发布文章」拉取(发布能力 freepublish/batchget)。
// 仅服务端使用。凭据来自环境变量(WECHAT_APPID / WECHAT_APPSECRET),切勿写进代码或提交。
// 前提:公众号已认证且有发布权限,且把部署服务器出口 IP 加入公众号 IP 白名单。
// 任何失败(未配置 / 网络不可达 / 接口报错)都返回空数组,由页面回退到静态内容。

const TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";
const LIST_URL = "https://api.weixin.qq.com/cgi-bin/freepublish/batchget";

export type WechatArticle = {
  title: string;
  url: string;
  digest: string;
  date: string; // 形如 "2026 · 04 · 18"
  cover?: string;
};

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

/**
 * 拉取公众号「全部」已发布文章,跳过已删除的,按发布时间倒序(最新在前)返回。
 * freepublish 的 offset=0 返回的是最早的文章,因此这里分页拉全后再排序。
 */
export async function getWechatArticles(): Promise<WechatArticle[]> {
  const appid = process.env.WECHAT_APPID;
  const secret = process.env.WECHAT_APPSECRET;
  if (!appid || !secret) return []; // 未配置 → 回退静态内容

  try {
    const token = await getAccessToken(appid, secret);
    if (!token) return [];

    const PAGE = 20; // 单次上限
    const HARD_CAP = 2000; // 防御性上限,避免接口异常时无限翻页
    const all: (WechatArticle & { ts: number })[] = [];

    for (let offset = 0; offset < HARD_CAP; offset += PAGE) {
      const res = await fetch(`${LIST_URL}?access_token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offset, count: PAGE, no_content: 1 }),
        next: { revalidate: 3600 }, // 缓存 1 小时,定期刷新
      });
      const data = await res.json();
      if (!Array.isArray(data?.item)) {
        if (offset === 0) {
          console.error("[wechat] 获取文章列表失败:", data);
          return [];
        }
        break;
      }
      for (const it of data.item) {
        const ts = Number(it.update_time || it.content?.update_time || 0);
        for (const n of it.content?.news_item ?? []) {
          if (n?.is_deleted) continue; // 已删除的文章不取
          if (!n?.url || !n?.title) continue;
          all.push({ title: n.title, url: n.url, digest: n.digest || "", date: fmtDate(ts), cover: n.thumb_url || undefined, ts });
        }
      }
      const total = Number(data.total_count) || 0;
      if (data.item.length === 0 || offset + PAGE >= total) break;
    }

    all.sort((a, b) => b.ts - a.ts); // 按发布时间,最新在前
    return all.map(({ ts: _ts, ...a }) => a);
  } catch (e) {
    console.error("[wechat] 拉取异常:", e);
    return [];
  }
}
