# syntax=docker/dockerfile:1
# 启盟科技官网 — Next.js (standalone) 多阶段构建
# 环境差异通过构建参数注入(测试/生产各构建一个镜像):
#   docker build --build-arg SITE_ENV=production --build-arg SITE_URL=https://www.aipm.cn      -t aipm-web:prod .
#   docker build --build-arg SITE_ENV=test       --build-arg SITE_URL=https://t1816-www.aipm.cn -t aipm-web:test .

FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 依赖层(利用缓存)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# 构建层
FROM base AS builder
# 这两个值会被 robots.ts / sitemap.ts / metadataBase 在构建时读取并写入产物
ARG SITE_ENV=production
ARG SITE_URL=https://www.aipm.cn
ENV SITE_ENV=${SITE_ENV}
ENV SITE_URL=${SITE_URL}
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
