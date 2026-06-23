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

// 分页拉取一个列表接口(freepublish 或 draft),展开图文里的每条子文章。
// 跳过:已删除的、缺 url 或标题的(没发出去的纯草稿 url 为空,会在此被滤掉)。
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
        out.push({ title: n.title, url: n.url, digest: n.digest || "", date: fmtDate(ts), cover: n.thumb_url || undefined, ts });
      }
    }
    const total = Number(data.total_count) || 0;
    if (data.item.length === 0 || offset + PAGE >= total) break;
  }
  return out;
}

/**
 * 拉取公众号文章:freepublish + 草稿箱 两个渠道合并,按标题去重,按时间倒序(最新在前)。
 */
export async function getWechatArticles(): Promise<WechatArticle[]> {
  const appid = process.env.WECHAT_APPID;
  const secret = process.env.WECHAT_APPSECRET;
  if (!appid || !secret) return []; // 未配置 → 回退静态内容

  try {
    const token = await getAccessToken(appid, secret);
    if (!token) return [];

    const [fp, draft] = await Promise.all([fetchList(FREEPUBLISH_URL, token), fetchList(DRAFT_URL, token)]);

    // 合并,最新在前;同一篇在两渠道 url 形式不同,按标题去重(保留排序后先出现的,即较新的那条)。
    const merged = [...fp, ...draft].sort((a, b) => b.ts - a.ts);
    const seen = new Set<string>();
    const result: RawArticle[] = [];
    for (const a of merged) {
      const key = a.title.replace(/\s+/g, "").trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      result.push(a);
    }

    console.log(`[wechat] freepublish=${fp.length} | 草稿箱=${draft.length} | 合并去重后=${result.length}`);

    return result.map(({ ts: _ts, ...a }) => a);
  } catch (e) {
    console.error("[wechat] 拉取异常:", e);
    return [];
  }
}
