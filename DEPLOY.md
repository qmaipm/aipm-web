# 部署说明(Docker)

本站为 Next.js 16(App Router)项目,采用 `output: "standalone"` 产出自包含运行包,用 Docker 部署。
**测试与生产各构建一个镜像**:环境差异(是否允许收录、对外绝对地址)在构建时由 `SITE_ENV` / `SITE_URL` 注入,写入 `robots.txt` / `sitemap.xml` / `metadataBase`。

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
