# syntax=docker/dockerfile:1
# 启盟科技官网 — Next.js (standalone) 多阶段构建
# 镜像与环境无关:SITE_ENV / SITE_URL 在运行时由容器环境变量注入(见 docker-compose.yml),
# 一个镜像同时适配测试/生产。robots / sitemap / layout 已设为 force-dynamic,运行时读取这些值。

FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 依赖层(利用缓存)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# 构建层(不烤入环境差异;SITE_ENV / SITE_URL 在运行时注入)
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 运行层(仅含 standalone 产物,体积小)
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
