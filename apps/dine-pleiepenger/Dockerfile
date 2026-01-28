FROM node:22-bookworm-slim

RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/* \
    && addgroup --system --gid 1069 nodejs \
    && adduser --system --uid 1069 nextjs

WORKDIR /app

COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/next.config.ts .
COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/.next/standalone ./
COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/.next/static ./apps/dine-pleiepenger/.next/static
COPY --chown=nextjs:nodejs /apps/dine-pleiepenger/public ./public

USER nextjs

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "apps/dine-pleiepenger/server.js"]