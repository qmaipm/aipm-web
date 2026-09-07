# 部署说明(Docker)

本站为 Next.js 16(App Router)项目,采用 `output: "standalone"` 产出自包含运行包,用 Docker 部署。
**以当前 Dockerfile 与 docker-compose.yml 为准**：镜像不烤入环境差异，`SITE_ENV` / `SITE_URL` 在运行时注入。下方历史双环境命令仅供旧部署参考，当前部署使用 compose 的 `web` 服务。

| 环境 | 域名 | SITE_ENV | SITE_URL | 收录 |
|------|------|----------|----------|------|
| 测试 | t1816-www.aipm.cn | `test` | https://t1816-www.aipm.cn | 否(robots 整站 Disallow) |
| 生产 | www.aipm.cn | `production` | https://www.aipm.cn | 是 |

## 一、构建镜像

```bash
# 生产
docker build --build-arg SITE_ENV=production --build-arg SITE_URL=https://www.aipm.cn \
  -t aipm-web:prod .

# 测试
docker build --build-arg SITE_ENV=test --build-arg SITE_URL=https://t1816-www.aipm.cn \
  -t aipm-web:test .
```

## 二、运行容器

```bash
# 生产:宿主 3000 -> 容器 3000
docker run -d --name aipm-web-prod --restart unless-stopped -p 3000:3000 aipm-web:prod

# 测试:宿主 3001 -> 容器 3000
docker run -d --name aipm-web-test --restart unless-stopped -p 3001:3000 aipm-web:test
```

或用 compose:`docker compose build web-prod && docker compose up -d web-prod`(测试同理换 `web-test`)。

## 三、nginx 反向代理(域名 -> 容器端口)

```nginx
# 生产
server {
    listen 80;
    server_name www.aipm.cn;
    # 如启用 HTTPS,这里改 443 + ssl 证书,并把 80 做 301 跳转
    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
    }
}

# 测试
server {
    listen 80;
    server_name t1816-www.aipm.cn;
    location / {
        proxy_pass         http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

## 四、健康检查 / 验证

- 容器内监听 `0.0.0.0:3000`。
- 验证收录策略:`curl https://www.aipm.cn/robots.txt`(应 Allow) 与 `curl https://t1816-www.aipm.cn/robots.txt`(应 `Disallow: /`)。
- `备案号`已在页脚展示,无需额外配置。

## 备注

- `SITE_ENV` / `SITE_URL` 是**构建时**写入产物的(robots/sitemap/metadataBase 在 build 阶段定值),因此**测试与生产必须分别 build**,不要用同一镜像跑两个域名。
- 镜像不含 `docs/`、`file/`、`*.zip` 等非应用资产(见 `.dockerignore`)。
- ICP / 公网安备号已在 `components/Footer.tsx` 配好,跳转 https://beian.miit.gov.cn 。


## 代运营项目报备：启用前检查（2026-09-07）

功能默认关闭，不随页面发布自动启用。服务器需配置：

- `PROJECT_INTAKE_ENABLED=true`：业务与隐私审核后才开启。
- `PROJECT_INTAKE_DIR=/app/.project-intake`：compose 已映射命名持久卷，禁止放在 public 或构建目录。
- `SMTP_HOST/PORT/USER/PASS`、`MAIL_TO`（必要时 `MAIL_CC`）：沿用现有邮件通知配置。

**当前实现面向单实例站点受理**。不是多实例 CRM，不提供公开项目查询、钱包或自动分账。反向代理必须额外配置请求频率和请求体限制，服务端32KB上限及每联系方式限频只是补充。

```bash
# 在部署目录执行；终端权限即数据访问权限，不对外开放这些命令。
docker compose exec web node scripts/project-intake-ops.cjs list
docker compose exec web node scripts/project-intake-ops.cjs show DP-实际受理编号
# 备注必须写清具体项目和受益伙伴；审核者需核验身份、项目关系与撞单。
docker compose exec web node scripts/project-intake-ops.cjs review DP-实际受理编号 accepted 审核人 "具体项目、归属伙伴及核验依据"
# 其他状态：needs-info / duplicate / declined。命令只记录，不代替书面通知。
docker compose exec web node scripts/project-intake-ops.cjs notify
```

- 先原子保存、再通知，通知失败保留 pending 状态；运营需定期执行 list/notify 并检查受理积压。
- 报备通过前只有受理编号，没有保护期。人工通过时记录180天初始保护；重大资源投入前另签项目合作确认书。
- 续期、最终评级、项目角色和分润条款由正式文件确认；本工具不自动替代这些商务判断。
- 数据文件权限600、目录700，通知邮件不包含项目经营数据。review 记录单独追加，原始提交不覆盖。
- 持久卷须备份、限制运维访问、按业务和适用义务定期清理；备份与删除也需覆盖通知标记、事件记录及副本。
- 本地测试目录必须在工作区内，推荐 `tmp/`；`.project-intake`、`.data` 与 `tmp` 已从 Git、Docker 和输出追踪排除。
- `docker compose down -v` 会删除受理卷，不得用于有真实报备的环境。
- 正式启用前，确认隐私政策中原有占位部分已由业务/法务审核，确认真实 SMTP、备份恢复及伙伴书面反馈流程。
